import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { AGENT_ID } from '../lib/elevenlabs';

export const MAX_CREDITS = 1000;
const STORAGE_KEY = 'portfolio_voice_credits_used';
const RESET_TIMESTAMP_KEY = 'portfolio_voice_credits_last_reset';

export const RATE_LIMIT_TONES = [
  {
    id: 'polite',
    toneName: 'Polite & Warm',
    message:
      "Sorry to say, but you have reached the 1,000 credit demo limit for this session. Feel free to explore Om's portfolio and reach out directly!",
    shortText: "Limit reached (1k credits)",
    audioUrl: "/audio/rate-limit-polite.mp3",
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'playful',
    toneName: 'Playful & Witty',
    message:
      "Whoops! Looks like we've hit our 1,000 credit demo ceiling for now. Time to explore Om's projects and connect with him directly!",
    shortText: "1k demo ceiling reached!",
    audioUrl: "/audio/rate-limit-playful.mp3",
    pitch: 1.15,
    rate: 1.05,
  },
  {
    id: 'professional',
    toneName: 'Professional & Polished',
    message:
      "Apologies, but the 1,000 credit quota for this interactive demo has been fulfilled. Please feel free to inspect Om's case studies or contact him directly.",
    shortText: "Quota fulfilled (1,000 credits)",
    audioUrl: "/audio/rate-limit-professional.mp3",
    pitch: 0.92,
    rate: 0.95,
  },
  {
    id: 'casual',
    toneName: 'Casual & Chill',
    message:
      "And that's a wrap on our 1,000 credit voice demo! Feel free to look around the rest of Om's portfolio and say hi directly.",
    shortText: "That's a wrap! (1k used)",
    audioUrl: "/audio/rate-limit-casual.mp3",
    pitch: 1.02,
    rate: 0.98,
  },
  {
    id: 'architect',
    toneName: 'System / Architect',
    message:
      "System update: 1,000 credit threshold reached for this session. Voice pipeline on standby. Check out Om's system blueprints and drop him a message!",
    shortText: "Threshold reached (1k units)",
    audioUrl: "/audio/rate-limit-architect.mp3",
    pitch: 0.95,
    rate: 1.05,
  },
  {
    id: 'enthusiastic',
    toneName: 'Upbeat & Enthusiastic',
    message:
      "You've reached the 1,000 credit limit! Thanks for chatting—be sure to explore Om's featured work and reach out directly to connect!",
    shortText: "Thanks for chatting! (1k reached)",
    audioUrl: "/audio/rate-limit-enthusiastic.mp3",
    pitch: 1.18,
    rate: 1.08,
  },
];

let lastToneIndex = -1;

export function getNextRateLimitTone() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * RATE_LIMIT_TONES.length);
  } while (nextIndex === lastToneIndex && RATE_LIMIT_TONES.length > 1);
  lastToneIndex = nextIndex;
  return RATE_LIMIT_TONES[nextIndex];
}

function getStoredCredits() {
  if (typeof window === "undefined") return 0;
  try {
    const lastReset = parseInt(localStorage.getItem(RESET_TIMESTAMP_KEY) || '0', 10);
    const now = Date.now();
    // Daily rolling reset (24 hours) so genuine returning users can chat again tomorrow
    if (!lastReset || now - lastReset > 24 * 60 * 60 * 1000) {
      localStorage.setItem(STORAGE_KEY, '0');
      localStorage.setItem(RESET_TIMESTAMP_KEY, now.toString());
      return 0;
    }
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function saveStoredCredits(credits) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, Math.round(credits).toString());
  } catch {}
}

const VoiceAgentContext = createContext(null);

function VoiceAgentProviderInner({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usedCredits, setUsedCredits] = useState(getStoredCredits);
  const [isRateLimited, setIsRateLimited] = useState(() => getStoredCredits() >= MAX_CREDITS);
  const [currentToneNotice, setCurrentToneNotice] = useState(null);

  // Local limit mode state (when 1,000 credits reached, user can talk freely with zero API consumption)
  const [isLocalLimitMode, setIsLocalLimitMode] = useState(false);
  const [localIsSpeaking, setLocalIsSpeaking] = useState(false);
  const [localAudioLevel, setLocalAudioLevel] = useState(0.42);

  const pendingCutoffRef = useRef(false);
  const activeAudioRef = useRef(null);
  const micStreamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const vadIntervalRef = useRef(null);
  const isLocalSpeakingRef = useRef(false);

  const stopActiveAudio = useCallback(() => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) {}
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const cleanupLocalAudio = useCallback(() => {
    stopActiveAudio();
    if (vadIntervalRef.current) {
      clearInterval(vadIntervalRef.current);
      vadIntervalRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    isLocalSpeakingRef.current = false;
    setLocalIsSpeaking(false);
    setIsLocalLimitMode(false);
  }, [stopActiveAudio]);

  const resetCredits = useCallback(() => {
    cleanupLocalAudio();
    saveStoredCredits(0);
    setUsedCredits(0);
    setIsRateLimited(false);
    setErrorMessage(null);
    setCurrentToneNotice(null);
    pendingCutoffRef.current = false;
  }, [cleanupLocalAudio]);

  // Starts the interactive zero-credit assistant loop with Voice Activity Detection (VAD)
  // using pre-rendered studio ElevenLabs voice audio clips
  const startLocalAssistantLoop = useCallback(async (initialTone) => {
    cleanupLocalAudio();
    setIsLocalLimitMode(true);
    setIsActivated(true);

    const toneToSpeak = initialTone || getNextRateLimitTone();
    setCurrentToneNotice(toneToSpeak.shortText);
    setErrorMessage(toneToSpeak.shortText);

    // Fallback if browser audio fails to load
    const fallbackSpeak = (tone) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setLocalIsSpeaking(false);
        isLocalSpeakingRef.current = false;
        return;
      }
      const utterance = new SpeechSynthesisUtterance(tone.message);
      utterance.pitch = tone.pitch;
      utterance.rate = tone.rate;
      utterance.onend = () => {
        setLocalIsSpeaking(false);
        isLocalSpeakingRef.current = false;
        setLocalAudioLevel(0.42);
      };
      utterance.onerror = () => {
        setLocalIsSpeaking(false);
        isLocalSpeakingRef.current = false;
        setLocalAudioLevel(0.42);
      };
      window.speechSynthesis.speak(utterance);
    };

    // Plays the EXACT ElevenLabs studio voice clip for this tone
    const triggerToneResponse = (specificTone) => {
      stopActiveAudio();
      const tone = specificTone || getNextRateLimitTone();
      setCurrentToneNotice(tone.shortText);
      setErrorMessage(tone.shortText);

      setLocalIsSpeaking(true);
      isLocalSpeakingRef.current = true;

      try {
        const audio = new Audio(tone.audioUrl);
        activeAudioRef.current = audio;

        audio.onended = () => {
          setLocalIsSpeaking(false);
          isLocalSpeakingRef.current = false;
          setLocalAudioLevel(0.42);
          activeAudioRef.current = null;
        };

        audio.onerror = (e) => {
          console.warn("Studio voice audio load warning, falling back:", e);
          fallbackSpeak(tone);
        };

        audio.play().catch((err) => {
          console.warn("Auto-play error, falling back:", err);
          fallbackSpeak(tone);
        });
      } catch (err) {
        fallbackSpeak(tone);
      }
    };

    // Speak initial message with ElevenLabs voice
    triggerToneResponse(toneToSpeak);

    // Setup local microphone VAD so user can talk freely without consuming any ElevenLabs API credits
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let hasSpoken = false;
      let silenceStart = 0;

      vadIntervalRef.current = setInterval(() => {
        // While assistant is speaking, keep orb reactive and pause user listening
        if (isLocalSpeakingRef.current) {
          setLocalAudioLevel(0.72 + Math.random() * 0.18);
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;

        // Animate orb fluidly with user's live voice volume
        const normalizedVol = Math.min(1, Math.max(0.38, avg / 55));
        setLocalAudioLevel(normalizedVol);

        // Detect user speech vs silence
        if (avg > 18) {
          hasSpoken = true;
          silenceStart = 0;
        } else if (hasSpoken) {
          if (silenceStart === 0) {
            silenceStart = Date.now();
          } else if (Date.now() - silenceStart > 1100) {
            // User finished speaking! Respond with the exact ElevenLabs voice in a new tone
            hasSpoken = false;
            silenceStart = 0;
            triggerToneResponse();
          }
        }
      }, 50);
    } catch (err) {
      console.warn("Local mic VAD setup warning:", err);
    }
  }, [cleanupLocalAudio, stopActiveAudio]);

  const conversation = useConversation({
    onConnect: () => {
      setErrorMessage(null);
    },
    onDisconnect: () => {},
    onMessage: (payload) => {
      // In ElevenLabs Conversational AI, 1 character of AI speech ~= 1 credit
      const isAi = payload?.source === 'ai' || payload?.role === 'agent';
      if (isAi && payload?.message) {
        const charCount = payload.message.length;
        setUsedCredits((prev) => {
          const updated = prev + charCount;
          saveStoredCredits(updated);
          if (updated >= MAX_CREDITS) {
            setIsRateLimited(true);
            pendingCutoffRef.current = true;
          }
          return updated;
        });
      }
    },
    onError: (err) => {
      console.warn("ElevenLabs conversation warning/error:", err);
    },
  });

  // Seamless transition: when 1k credits is reached during active ElevenLabs call,
  // disconnect ElevenLabs (0 further API credits) and switch to the zero-credit local ElevenLabs voice loop!
  useEffect(() => {
    if (pendingCutoffRef.current && !conversation.isSpeaking && conversation.status === "connected") {
      pendingCutoffRef.current = false;
      (async () => {
        try {
          await conversation.endSession();
        } catch (_) {}
        // Switch seamlessly to the interactive ElevenLabs voice loop
        startLocalAssistantLoop();
      })();
    }
  }, [conversation.isSpeaking, conversation.status, conversation, startLocalAssistantLoop]);

  const startSession = useCallback(async () => {
    const current = getStoredCredits();
    if (current >= MAX_CREDITS) {
      setIsRateLimited(true);
      // Directly start the local zero-credit assistant loop with the exact ElevenLabs voice!
      startLocalAssistantLoop();
      return;
    }

    setIsActivated(true);
    setErrorMessage(null);
    pendingCutoffRef.current = false;
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      await conversation.startSession({
        agentId: AGENT_ID,
      });
    } catch (err) {
      console.warn("Microphone or session initialization:", err);
      setIsActivated(false);
    }
  }, [conversation, startLocalAssistantLoop]);

  const stopSession = useCallback(async () => {
    pendingCutoffRef.current = false;
    cleanupLocalAudio();
    try {
      await conversation.endSession();
    } catch (_) {}
    setIsActivated(false);
  }, [conversation, cleanupLocalAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupLocalAudio();
    };
  }, [cleanupLocalAudio]);

  // Derived state across ElevenLabs and zero-credit Local modes
  const effectiveIsSpeaking = isLocalLimitMode ? localIsSpeaking : conversation.isSpeaking;

  const currentState = isLocalLimitMode
    ? localIsSpeaking
      ? "speaking"
      : "listening"
    : conversation.status === "connecting"
    ? "searching"
    : conversation.isSpeaking
    ? "speaking"
    : "listening";

  const stateLabel = isLocalLimitMode
    ? localIsSpeaking
      ? "Speaking..."
      : "Listening..."
    : conversation.status === "connecting"
    ? "Connecting..."
    : conversation.isSpeaking
    ? "Speaking..."
    : "Listening...";

  const audioLevel = isLocalLimitMode
    ? localAudioLevel
    : conversation.isSpeaking
    ? 0.78
    : 0.42;

  const value = useMemo(
    () => ({
      isActivated,
      setIsActivated,
      conversation,
      startSession,
      stopSession,
      currentState,
      stateLabel,
      errorMessage,
      isSpeaking: effectiveIsSpeaking,
      audioLevel,
      status: conversation.status,
      usedCredits,
      remainingCredits: Math.max(0, MAX_CREDITS - usedCredits),
      maxCredits: MAX_CREDITS,
      isRateLimited,
      isLocalLimitMode,
      currentToneNotice,
      resetCredits,
    }),
    [
      isActivated,
      conversation,
      startSession,
      stopSession,
      currentState,
      stateLabel,
      errorMessage,
      effectiveIsSpeaking,
      audioLevel,
      usedCredits,
      isRateLimited,
      isLocalLimitMode,
      currentToneNotice,
      resetCredits,
    ]
  );

  return (
    <VoiceAgentContext.Provider value={value}>
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function VoiceAgentProvider({ children }) {
  return (
    <ConversationProvider>
      <VoiceAgentProviderInner>{children}</VoiceAgentProviderInner>
    </ConversationProvider>
  );
}

export function useVoiceAgent() {
  const context = useContext(VoiceAgentContext);
  if (!context) {
    throw new Error("useVoiceAgent must be used within a VoiceAgentProvider");
  }
  return context;
}
