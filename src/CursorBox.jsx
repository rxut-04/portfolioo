import { useEffect, useRef } from "react";
import "./CursorBox.css";

export default function CursorBox() {
  const wrapRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let started = false;
    let frame;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // On first move, jump to the cursor so the box doesn't fly in from the corner
      if (!started) {
        current.x = e.clientX;
        current.y = e.clientY;
        started = true;
        if (boxRef.current) {
          boxRef.current.classList.add("visible");
        }
      }
    };

    const onOver = (e) => {
      if (!boxRef.current) return;
      const hit = e.target.closest?.("a, button, [data-cursor='grow']");
      boxRef.current.classList.toggle("grow", Boolean(hit));
    };

    const onLeave = () => {
      if (boxRef.current) boxRef.current.classList.remove("visible");
    };

    const onEnter = () => {
      if (started && boxRef.current) boxRef.current.classList.add("visible");
    };

    const animate = () => {
      current.x += (mouse.x - current.x) * 0.105;
      current.y += (mouse.y - current.y) * 0.105;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${current.x}px, ${current.y}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor-wrap">
      <div ref={boxRef} className="cursor-box" />
    </div>
  );
}
