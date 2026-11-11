import { useState } from "react";
import { LiquidGlassOrb } from "./liquid-glass-orb";

const STATES = ["listening", "thinking", "speaking", "searching"];

const STATE_LABELS = {
  listening: "Listening...",
  thinking: "Thinking...",
  speaking: "Speaking...",
  searching: "Searching...",
};

const STATE_DOT_COLORS = {
  listening: "bg-emerald-500",
  thinking: "bg-sky-500",
  speaking: "bg-violet-500",
  searching: "bg-amber-500",
};

export default function ExploreProjectsButton({
  className = "",
  children = "Ask me",
}) {
  const [isActivated, setIsActivated] = useState(false);
  const [stateIndex, setStateIndex] = useState(0);

  const currentState = STATES[stateIndex];

  const cycleState = () => {
    setStateIndex((prev) => (prev + 1) % STATES.length);
  };

  // Initial State: Clean "Ask me" button
  if (!isActivated) {
    return (
      <button
        type="button"
        onClick={() => setIsActivated(true)}
        aria-label={children}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-900 bg-zinc-900 px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md focus:outline-none focus-visible:ring-3 focus-visible:ring-zinc-400 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer ${className}`}
      >
        <span>{children}</span>
        <span aria-hidden="true">→</span>
      </button>
    );
  }

  // Activated State: Button disappears, ONLY the Orb + State Name appears
  return (
    <div className="inline-flex items-center gap-3.5 select-none transition-all duration-300 animate-in fade-in zoom-in-95">
      {/* Liquid Glass Orb Container (shrunk with CSS transform, size={250} intact) */}
      <div
        role="button"
        tabIndex={0}
        onClick={cycleState}
        title="Click to cycle AI state"
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
            animateEntrance={true}
            size={250}
            audioLevel={0.55}
          />
        </div>
      </div>

      {/* State Name Pill */}
      <div
        role="button"
        tabIndex={0}
        onClick={cycleState}
        title="Click to switch state"
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-200/90 bg-zinc-50/90 dark:border-zinc-800/90 dark:bg-zinc-900/90 backdrop-blur-md cursor-pointer shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
      >
        <span
          className={`size-2 rounded-full animate-pulse ${
            STATE_DOT_COLORS[currentState] || "bg-emerald-500"
          }`}
        />
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">
          {STATE_LABELS[currentState] || currentState}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsActivated(false);
          }}
          className="ml-1 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 text-xs px-1 py-0.5 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 rounded transition-colors"
          title="Back to button"
          aria-label="Back to Ask me"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
