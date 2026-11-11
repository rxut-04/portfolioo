import { useState } from "react";
import { useVoiceAgent } from "../context/VoiceAgentContext";
import { LiquidGlassOrb } from "./liquid-glass-orb";
import { ShiningText } from "./ui/shining-text";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function ExploreProjectsButton({
  className = "",
  children = "Ask me",
}) {
  const [customInput, setCustomInput] = useState("");
  const {
    isActivated,
    startSession,
    stopSession,
    askQuestion,
    showTextInput,
    currentState,
    stateLabel,
    errorMessage,
    isSpeaking,
    audioLevel,
  } = useVoiceAgent();

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      askQuestion(customInput.trim());
      setCustomInput("");
    }
  };

  const handleChipClick = (question) => {
    askQuestion(question);
  };

  // Initial State: Liquid Glass "Ask me" button
  if (!isActivated) {
    return (
      <LiquidButton
        type="button"
        onClick={startSession}
        aria-label={children}
        className={className}
      >
        <span>{children}</span>
      </LiquidButton>
    );
  }

  // Activated State: Button disappears, Orb + State Name + Quick interactive chips appear
  return (
    <div className="flex flex-col gap-2.5 transition-all duration-300 animate-in fade-in zoom-in-95">
      <div className="inline-flex items-center gap-3.5 select-none">
        {/* Liquid Glass Orb Container (shrunk with CSS transform, size={250} intact) */}
        <div
          role="button"
          tabIndex={0}
          onClick={stopSession}
          title={isSpeaking ? "AI is speaking (Click to end)" : "Listening to your voice (Click to end)"}
          className="relative size-12 sm:size-14 rounded-full overflow-hidden shrink-0 shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 ring-1 ring-zinc-300 dark:ring-zinc-700/80 bg-zinc-100 dark:bg-zinc-900"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none scale-[0.208] sm:scale-[0.23] origin-center">
            <LiquidGlassOrb
              baseColor={"#ffffff"}
              colorA={"#000000"}
              colorB={"#4d4d4d"}
              colorC={"#a9a9a9"}
              seed={145}
              startTime={18}
              speed={1.5}
              distortion={0.8}
              clusterCount={7.2}
              clusterIntensity={3}
              clusterSize={22.5}
              scale={0.23}
              spotSize={1.15}
              rotation={0}
              softness={0.31}
              relief={2.94}
              refraction={0.65}
              roughness={0}
              reflection={1.3}
              caustics={0}
              dispersion={1}
              colorDistribution={0}
              grain={0.3}
              grainSize={1}
              paused={false}
              animateDistortion={true}
              grainMode={"fine"}
              flowType={"drift"}
              state={currentState}
              thinkingAnimation={"ripples"}
              searchingAnimation={"lens"}
              preserveWhites={true}
              animateEntrance={false}
              size={250}
              audioLevel={audioLevel || (isSpeaking ? 0.78 : 0.42)}
            />
          </div>
        </div>

        {/* State Name Text with shining animation */}
        <div className="flex items-center gap-2">
          <ShiningText text={errorMessage || stateLabel} />
          <button
            type="button"
            onClick={stopSession}
            className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 text-xs px-1 py-0.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer"
            title="End conversation"
            aria-label="Back to Ask me"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Quick interactive questions & input (always available when active or if speech recognition has network issues) */}
      <div className="flex flex-col gap-2 mt-1 max-w-sm">
        <form onSubmit={handleInputSubmit} className="flex items-center gap-1.5">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type a question for TTS.ai..."
            disabled={currentState === "thinking" || currentState === "speaking"}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-500 shadow-sm transition-all"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || currentState === "thinking" || currentState === "speaking"}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
          >
            Ask
          </button>
        </form>

        <div className="flex flex-wrap gap-1.5">
          {["Who is Om?", "What projects did you build?", "What's your tech stack?"].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              disabled={currentState === "thinking" || currentState === "speaking"}
              className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer disabled:opacity-40"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
