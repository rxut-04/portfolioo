import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { AGENT_ID } from '../lib/elevenlabs';

export const MAX_CREDITS = 1000;
const STORAGE_KEY = 'portfolio_voice_credits_used';
const RESET_TIMESTAMP_KEY = 'portfolio_voice_credits_last_reset';

export const RATE_LIMIT_TONES = [
  {
    id: 'polite',
    toneName: 'Polite & Warm',
    message: "Sorry to say, but you have reached the 1,000 credit demo limit for this session. Feel free to explore Om's portfolio and reach out directly!",
    shortText: "Limit reached (1k credits)",
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'playful',
    toneName: 'Playful & Witty',
    message: "Whoops! Looks like we've hit our 1,000 credit demo ceiling for now. Time to explore Om's projects and connect with him directly!",
    shortText: "1k demo ceiling reached!",
    pitch: 1.15,
    rate: 1.05,
  },
  {
    id: 'professional',
    toneName: 'Professional & Polished',
    message: "Apologies, but the 1,000 credit quota for this interactive demo has been fulfilled. Please feel free to inspect Om's case studies or contact him directly.",
    shortText: "Quota fulfilled (1,000 credits)",
    pitch: 0.92,
    rate: 0.95,
  },
  {
    id: 'casual',
    toneName: 'Casual & Chill',
    message: "And that's a wrap on our 1,000 credit voice demo! Feel free to look around the rest of Om's portfolio and say hi directly.",
    shortText: "That's a wrap! (1k used)",
    pitch: 1.02,
    rate: 0.98,
  },
  {
    id: 'architect',
    toneName: 'System / Architect',
    message: "System update: 1,000 credit threshold reached for this session. Voice pipeline on standby. Check out Om's system blueprints and drop him a message!",
    shortText: "Threshold reached (1k units)",
    pitch: 0.95,
    rate: 1.05,
  },
  {
    id: 'enthusiastic',
    toneName: 'Upbeat & Enthusiastic',
    message: "You've reached the 1,000 credit limit! Thanks for chatting—be sure to explore Om's featured work and reach out directly to connect!",
    shortText: "Thanks for chatting! (1k reached)",
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

export function speakRateLimitNotice(customTone) {
  const tone = customTone || getNextRateLimitTone();

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(tone.message);
      utterance.pitch = tone.pitch;
      utterance.rate = tone.rate;

      // Select among available browser English voices for dynamic inflection
      const voices = window.speechSynthesis.getVoices().filter((v) => v.lang?.startsWith("en"));
      if (voices.length > 0) {
        const voiceIndex =
          Math.abs(tone.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % voices.length;
        utterance.voice = voices[voiceIndex];
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis notice warning:", e);
    }
  }

  return tone;
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
  const [currentToneNotice, setCurrentToneNotice] = useState(() =>
    getStoredCredits() >= MAX_CREDITS ? "Limit reached (1k credits)" : null
  );
  const pendingCutoffRef = useRef(false);

  const resetCredits = useCallback(() => {
    saveStoredCredits(0);
    setUsedCredits(0);
    setIsRateLimited(false);
    setErrorMessage(null);
    setCurrentToneNotice(null);
    pendingCutoffRef.current = false;
  }, []);

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

  // When rate limit is triggered during a live conversation:
  // Allow the AI to finish speaking its current sentence, then gracefully terminate session & speak parting notice in a unique tone
  useEffect(() => {
    if (pendingCutoffRef.current && !conversation.isSpeaking && conversation.status === "connected") {
      pendingCutoffRef.current = false;
      (async () => {
        try {
          await conversation.endSession();
        } catch (_) {}
        setIsActivated(false);
        const tone = speakRateLimitNotice();
        setCurrentToneNotice(tone.shortText);
        setErrorMessage(tone.shortText);
      })();
    }
  }, [conversation.isSpeaking, conversation.status, conversation]);

  const startSession = useCallback(async () => {
    const current = getStoredCredits();
    if (current >= MAX_CREDITS) {
      setIsRateLimited(true);
      // Play in a different tone each time clicked!
      const tone = speakRateLimitNotice();
      setCurrentToneNotice(tone.shortText);
      setErrorMessage(tone.shortText);
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
  }, [conversation]);

  const stopSession = useCallback(async () => {
    pendingCutoffRef.current = false;
    try {
      await conversation.endSession();
    } catch (_) {}
    setIsActivated(false);
  }, [conversation]);

  // Derive dynamic state for the LiquidGlassOrb
  const currentState =
    conversation.status === "connecting"
      ? "searching"
      : conversation.isSpeaking
      ? "speaking"
      : conversation.status === "connected"
      ? "listening"
      : "listening";

  const stateLabel =
    conversation.status === "connecting"
      ? "Connecting..."
      : conversation.isSpeaking
      ? "Speaking..."
      : conversation.status === "connected"
      ? "Listening..."
      : "Listening...";

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
      isSpeaking: conversation.isSpeaking,
      status: conversation.status,
      usedCredits,
      remainingCredits: Math.max(0, MAX_CREDITS - usedCredits),
      maxCredits: MAX_CREDITS,
      isRateLimited,
      currentToneNotice,
      resetCredits,
      speakRateLimitNotice,
    }),
    [
      isActivated,
      conversation,
      startSession,
      stopSession,
      currentState,
      stateLabel,
      errorMessage,
      usedCredits,
      isRateLimited,
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
