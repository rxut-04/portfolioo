import { useVoiceAgent } from "../context/VoiceAgentContext";
import { LiquidGlassOrb } from "./liquid-glass-orb";
import { ShiningText } from "./ui/shining-text";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function ExploreProjectsButton({
  className = "",
  children = "Ask me",
}) {
  const {
    isActivated,
    startSession,
    stopSession,
    currentState,
    stateLabel,
    errorMessage,
    isSpeaking,
    audioLevel,
  } = useVoiceAgent();

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

  // Activated State: Button disappears, ONLY the Orb + State Name appears
  return (
    <div className="inline-flex items-center gap-3.5 select-none transition-all duration-300 animate-in fade-in zoom-in-95">
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
  );
}
