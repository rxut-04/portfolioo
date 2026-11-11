import { createContext, useContext, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { synthesizeSpeech, playTtsAudio } from '../lib/ttsai';
import { askPortfolioAI } from '../lib/openrouter';

const VoiceAgentContext = createContext(null);

export function VoiceAgentProvider({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [currentState, setCurrentState] = useState('listening'); // 'listening' | 'thinking' | 'speaking' | 'searching'
  const [stateLabel, setStateLabel] = useState('Listening...');
  const [errorMessage, setErrorMessage] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0.42);
  const [showTextInput, setShowTextInput] = useState(false);

  const recognitionRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const isActivatedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const hasNetworkErrorRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  // Clean stop of all audio & recognition
  const stopSession = useCallback(() => {
    isActivatedRef.current = false;
    isSpeakingRef.current = false;
    isProcessingRef.current = false;
    hasNetworkErrorRef.current = false;

    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.stop();
      } catch (_) {}
      audioPlayerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
      recognitionRef.current = null;
    }

    setIsActivated(false);
    setCurrentState('listening');
    setStateLabel('Listening...');
    setAudioLevel(0);
    setErrorMessage(null);
    setShowTextInput(false);
  }, []);

  // Process user speech with OpenRouter -> TTS.ai -> playback
  const handleUserSpeech = useCallback(async (transcript) => {
    if (!isActivatedRef.current || isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      // 1. Thinking phase
      setCurrentState('thinking');
      setStateLabel('Thinking...');
      setAudioLevel(0.3);
      setErrorMessage(null);

      // 2. Query LLM via OpenRouter
      const replyText = await askPortfolioAI(transcript);

      if (!isActivatedRef.current) return;

      // 3. Synthesize speech via TTS.ai
      setCurrentState('searching');
      setStateLabel('Synthesizing...');
      const audioUrl = await synthesizeSpeech(replyText);

      if (!isActivatedRef.current) return;

      // 4. Play speech with real-time audio analysis
      setCurrentState('speaking');
      setStateLabel('Speaking...');
      isSpeakingRef.current = true;

      audioPlayerRef.current = playTtsAudio(audioUrl, {
        onAudioLevel: (level) => {
          setAudioLevel(Math.max(0.4, level * 1.2));
        },
        onEnded: () => {
          isSpeakingRef.current = false;
          isProcessingRef.current = false;
          if (isActivatedRef.current) {
            setCurrentState('listening');
            setStateLabel('Listening...');
            setAudioLevel(0.42);
            // Resume listening if speech recognition is available
            if (!hasNetworkErrorRef.current) {
              startListening();
            }
          }
        },
        onError: (err) => {
          console.warn('TTS.ai audio playback note:', err);
          isSpeakingRef.current = false;
          isProcessingRef.current = false;
          if (isActivatedRef.current) {
            setCurrentState('listening');
            setStateLabel('Listening...');
            if (!hasNetworkErrorRef.current) {
              startListening();
            }
          }
        },
      });
    } catch (err) {
      console.error('Voice conversation error:', err);
      isProcessingRef.current = false;
      isSpeakingRef.current = false;
      if (isActivatedRef.current) {
        setErrorMessage('Try again');
        setTimeout(() => {
          if (isActivatedRef.current) {
            setErrorMessage(null);
            setCurrentState('listening');
            setStateLabel('Listening...');
            if (!hasNetworkErrorRef.current) {
              startListening();
            }
          }
        }, 2500);
      }
    }
  }, []);

  // Setup / start speech recognition
  const startListening = useCallback(() => {
    if (!isActivatedRef.current || isSpeakingRef.current || hasNetworkErrorRef.current) return;

    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setShowTextInput(true);
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript && transcript.trim()) {
        handleUserSpeech(transcript.trim());
      }
    };

    recognition.onerror = (e) => {
      if (e.error === 'network' || e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        hasNetworkErrorRef.current = true;
        setShowTextInput(true);
      } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
        console.warn('Speech recognition warning:', e.error);
      }
    };

    recognition.onend = () => {
      // Only restart if active, not speaking, not processing, and no network fatal error
      if (
        isActivatedRef.current &&
        !isSpeakingRef.current &&
        !isProcessingRef.current &&
        !hasNetworkErrorRef.current
      ) {
        try {
          recognition.start();
        } catch (_) {}
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (_) {
      hasNetworkErrorRef.current = true;
      setShowTextInput(true);
    }
  }, [handleUserSpeech]);

  // Ask a question directly via text or quick-chips
  const askQuestion = useCallback((text) => {
    if (text && text.trim()) {
      handleUserSpeech(text.trim());
    }
  }, [handleUserSpeech]);

  // Start the voice session
  const startSession = useCallback(async () => {
    setIsActivated(true);
    isActivatedRef.current = true;
    hasNetworkErrorRef.current = false;
    setErrorMessage(null);
    setCurrentState('listening');
    setStateLabel('Listening...');
    setAudioLevel(0.42);

    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (_) {}

    startListening();
  }, [startListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  const value = useMemo(
    () => ({
      isActivated,
      setIsActivated,
      startSession,
      stopSession,
      askQuestion,
      showTextInput,
      setShowTextInput,
      currentState,
      stateLabel,
      errorMessage,
      isSpeaking: currentState === 'speaking',
      audioLevel,
    }),
    [
      isActivated,
      startSession,
      stopSession,
      askQuestion,
      showTextInput,
      currentState,
      stateLabel,
      errorMessage,
      audioLevel,
    ]
  );

  return (
    <VoiceAgentContext.Provider value={value}>
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgent() {
  const context = useContext(VoiceAgentContext);
  if (!context) {
    throw new Error('useVoiceAgent must be used within a VoiceAgentProvider');
  }
  return context;
}
