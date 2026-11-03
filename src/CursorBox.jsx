import { useEffect, useRef } from "react";
import "./CursorBox.css";

export default function CursorBox() {
  const wrapRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let started = false;
    let frameId;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // On first move, jump to the cursor so it doesn't glide in from off-screen
      if (!started) {
        current.x = e.clientX;
        current.y = e.clientY;
        started = true;
        boxRef.current?.classList.add("visible");
      }
    };

    const onLeave = () => {
      boxRef.current?.classList.remove("visible");
    };

    const onEnter = () => {
      if (started) boxRef.current?.classList.add("visible");
    };

    const animate = () => {
      current.x += (mouse.x - current.x) * 0.15;
      current.y += (mouse.y - current.y) * 0.15;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor-wrap" aria-hidden="true">
      <div ref={boxRef} className="cursor-box" />
    </div>
  );
}