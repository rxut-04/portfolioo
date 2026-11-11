import { useState } from "react";
import { LiquidGlassOrb } from "./liquid-glass-orb";

export default function ExploreProjectsButton({
  className = "",
  children = "Ask me",
}) {
  const [phase, setPhase] = useState("idle"); // idle | listening | thinking | speaking | searching
  const states = ["listening", "thinking", "speaking", "searching"];

  const handleClick = () => {
    if (phase === "idle") {
      setPhase("listening");
    } else {
      const nextIndex = (states.indexOf(phase) + 1) % states.length;
      setPhase(states[nextIndex]);
    }
  };

  const showOrb = phase !== "idle";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={children}
      className={`explore-btn ${className}`}
    >
      <span>{children}</span>
      <span className="explore-slot" aria-hidden="true">
        <span className={`explore-arrow ${showOrb ? "is-hidden" : ""}`}>→</span>
        {showOrb && (
          <span className="explore-orb">
            <span className="explore-orb-inner">
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
                state={phase}
                thinkingAnimation={"ripples"}
                searchingAnimation={"lens"}
                preserveWhites={true}
                animateEntrance={true}
                size={250}
                audioLevel={0.55}
              />
            </span>
          </span>
        )}
      </span>
    </button>
  );
}
