import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { AGENT_ID } from '../lib/elevenlabs';

export const MAX_CREDITS = 1000;
const STORAGE_KEY = 'portfolio_voice_credits_used';
const RESET_TIMESTAMP_KEY = 'portfolio_voice_credits_last_reset';

export const RATE_LIMIT_MESSAGE =
  "Sorry to say, but you have reached the 1,000 credit demo limit for this session. Feel free to explore Om's portfolio and reach out directly!";

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

export function speakRateLimitNotice() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(RATE_LIMIT_MESSAGE);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis notice warning:", e);
    }
  }
}

const VoiceAgentContext = createContext(null);

function VoiceAgentProviderInner({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usedCredits, setUsedCredits] = useState(getStoredCredits);
  const [isRateLimited, setIsRateLimited] = useState(() => getStoredCredits() >= MAX_CREDITS);
  const pendingCutoffRef = useRef(false);

  const resetCredits = useCallback(() => {
    saveStoredCredits(0);
    setUsedCredits(0);
    setIsRateLimited(false);
    setErrorMessage(null);
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
  // Allow the AI to finish speaking its current sentence, then gracefully terminate session & speak parting notice
  useEffect(() => {
    if (pendingCutoffRef.current && !conversation.isSpeaking && conversation.status === "connected") {
      pendingCutoffRef.current = false;
      (async () => {
        try {
          await conversation.endSession();
        } catch (_) {}
        setIsActivated(false);
        setErrorMessage("Limit reached (1k credits)");
        speakRateLimitNotice();
      })();
    }
  }, [conversation.isSpeaking, conversation.status, conversation]);

  const startSession = useCallback(async () => {
    const current = getStoredCredits();
    if (current >= MAX_CREDITS) {
      setIsRateLimited(true);
      setErrorMessage("Limit reached (1,000 credits used)");
      speakRateLimitNotice();
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
      usedCredits,
      isRateLimited,
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
