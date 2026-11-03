import { useEffect, useRef } from "react";
import "./CursorBox.css";

export default function CursorBox() {
  const wrapRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let started = false;
    let frameId;

    const setPosition = (clientX, clientY) => {
      target.x = clientX;
      target.y = clientY;

      if (!started) {
        current.x = clientX;
        current.y = clientY;
        started = true;
        if (boxRef.current) {
          boxRef.current.classList.add("visible");
        }
      }
    };

    const onMouseMove = (e) => {
      setPosition(e.clientX, e.clientY);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        setPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        setPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onOver = (e) => {
      if (!boxRef.current) return;
      const hit = e.target?.closest?.("a, button, [data-cursor='grow'], input, select, textarea, [role='button'], label");
      boxRef.current.classList.toggle("grow", Boolean(hit));
    };

    const onLeave = () => {
      if (boxRef.current) {
        boxRef.current.classList.remove("visible");
      }
    };

    const onEnter = () => {
      if (started && boxRef.current) {
        boxRef.current.classList.add("visible");
      }
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
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
