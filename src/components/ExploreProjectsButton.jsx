import { useEffect, useRef, useState } from "react";
import { LiquidGlassOrb } from "./liquid-glass-orb";

export default function ExploreProjectsButton({
  targetId = "projects",
  className = "",
  children = "Explore Projects",
}) {
  const [phase, setPhase] = useState("idle"); // idle | searching | success | leaving
  const timers = useRef([]);
  const observer = useRef(null);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    observer.current?.disconnect();
    observer.current = null;
  };
  useEffect(() => clearAll, []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const finish = () => {
    clearAll(); // stops the observer and the fallback timer so this runs once
    setPhase("success");
    later(() => setPhase("leaving"), 800);
    later(() => setPhase("idle"), 1050);
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    const target = document.getElementById(targetId);
    if (!target) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.scrollIntoView();
      return;
    }

    setPhase("searching");
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    observer.current = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && finish(),
      { threshold: 0.3 }
    );
    observer.current.observe(target);

    later(finish, 3000); // fallback so the sequence always completes
  };

  const showOrb = phase !== "idle";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Explore projects"
      className={`explore-btn ${className}`}
    >
      <span>{children}</span>
      <span className="explore-slot" aria-hidden="true">
        <span className={`explore-arrow ${showOrb ? "is-hidden" : ""}`}>→</span>
        {showOrb && (
          <span className={`explore-orb ${phase === "leaving" ? "is-leaving" : ""}`}>
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
                state={phase === "leaving" ? "success" : phase}
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
