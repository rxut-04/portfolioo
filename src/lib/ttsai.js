export const TTSAI_API_KEY =
  import.meta.env.VITE_TTSAI_API_KEY || "";

export const DEFAULT_TTS_MODEL = "kokoro";
export const DEFAULT_TTS_VOICE = "af_bella"; // Clear, friendly natural voice

/**
 * Generate speech audio from text using TTS.ai API
 * @param {string} text
 * @param {Object} options
 * @returns {Promise<string>} result audio URL
 */
export async function synthesizeSpeech(text, options = {}) {
  const apiKey = options.apiKey || TTSAI_API_KEY;
  const model = options.model || DEFAULT_TTS_MODEL;
  const voice = options.voice || DEFAULT_TTS_VOICE;
  const format = options.format || "mp3";

  if (!apiKey) {
    throw new Error("Missing TTS.ai API key. Please add VITE_TTSAI_API_KEY in .env.local");
  }

  const response = await fetch("https://api.tts.ai/v1/tts/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model,
      voice,
      format,
      speed: options.speed ?? 1.0,
      language: options.language ?? "en",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `TTS.ai request failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data?.result_url) {
    throw new Error("TTS.ai returned response without result_url");
  }

  return data.result_url;
}

/**
 * Play synthesized audio with audio analysis for driving orb ripple/speech effects.
 * @param {string} audioUrl
 * @param {Object} callbacks
 * @returns {{ stop: () => void }}
 */
export function playTtsAudio(audioUrl, { onEnded, onError, onAudioLevel }) {
  const audio = new Audio();
  audio.crossOrigin = "anonymous";
  audio.src = audioUrl;

  let audioCtx = null;
  let analyser = null;
  let source = null;
  let animFrameId = null;
  let isStopped = false;

  const cleanup = () => {
    isStopped = true;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (_) {}
    if (audioCtx && audioCtx.state !== "closed") {
      try {
        audioCtx.close();
      } catch (_) {}
    }
  };

  const setupAudioContext = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        if (isStopped) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(1, avg / 128); // 0 to 1
        onAudioLevel?.(normalized);
        animFrameId = requestAnimationFrame(tick);
      };

      tick();
    } catch (e) {
      console.warn("AudioContext analyzer setup note:", e);
      // Fallback: simulate audio level pulse during playback
      const tickFallback = () => {
        if (isStopped) return;
        const simulated = 0.5 + Math.sin(Date.now() / 150) * 0.35;
        onAudioLevel?.(simulated);
        animFrameId = requestAnimationFrame(tickFallback);
      };
      tickFallback();
    }
  };

  audio.onplay = () => {
    setupAudioContext();
  };

  audio.onended = () => {
    cleanup();
    onEnded?.();
  };

  audio.onerror = (e) => {
    cleanup();
    onError?.(e);
  };

  audio.play().catch((err) => {
    cleanup();
    onError?.(err);
  });

  return {
    stop: cleanup,
  };
}
