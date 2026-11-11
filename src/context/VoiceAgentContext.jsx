import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { AGENT_ID } from '../lib/elevenlabs';

const VoiceAgentContext = createContext(null);

function VoiceAgentProviderInner({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const conversation = useConversation({
    onConnect: () => {
      setErrorMessage(null);
    },
    onDisconnect: () => {},
    onError: (err) => {
      console.warn("ElevenLabs conversation warning/error:", err);
    },
  });

  const startSession = useCallback(async () => {
    setIsActivated(true);
    setErrorMessage(null);
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      await conversation.startSession({
        agentId: AGENT_ID,
      });
    } catch (err) {
      console.warn("Microphone or session initialization:", err);
    }
  }, [conversation]);

  const stopSession = useCallback(async () => {
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
    }),
    [
      isActivated,
      conversation,
      startSession,
      stopSession,
      currentState,
      stateLabel,
      errorMessage,
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
