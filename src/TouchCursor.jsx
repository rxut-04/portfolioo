import { useEffect, useRef } from "react";
import "./TouchCursor.css";

const TAP_MAX_MOVE = 10; // px: more than this = drag, not tap
const TAP_MAX_TIME = 250; // ms: longer than this = not a tap

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0);

export default function TouchCursor() {
  const ref = useRef(null);
  const touch = isTouchDevice();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let start = null; // where the touch began
    let startTime = 0;
    let moved = false;
    let multi = false; // true once a second finger touches
    let lastMid = null; // last midpoint of two fingers (for scroll)

    const render = () => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      const box = el.querySelector(".touch-box");
      if (box) {
        const target = document.elementFromPoint(pos.x, pos.y);
        const hit = target?.closest?.("a, button, [data-cursor='grow'], input, textarea, select, [role='button']");
        box.classList.toggle("grow", Boolean(hit));
      }
    };
    render();

    const midpoint = (touches) => ({
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    });

    const clickAtCursor = () => {
      const target = document.elementFromPoint(pos.x, pos.y);
      if (!target) return;
      const clickable = target.closest?.("a, button, [role='button'], input, textarea, select, label");
      if (clickable) {
        clickable.focus?.();
        clickable.click();
      } else {
        target.focus?.();
        target.click();
      }
    };

    const onStart = (e) => {
      e.preventDefault(); // stops the browser's own tap/click under the finger
      if (e.touches.length === 1) {
        const t = e.touches[0];
        pos.x = t.clientX;
        pos.y = t.clientY;
        start = { x: t.clientX, y: t.clientY };
        startTime = Date.now();
        moved = false;
        multi = false;
        render();
      } else {
        multi = true;
        lastMid = midpoint(e.touches);
      }
    };

    const onMove = (e) => {
      e.preventDefault();

      // Two fingers = scroll the page
      if (e.touches.length >= 2) {
        const mid = midpoint(e.touches);
        if (lastMid) window.scrollBy(0, lastMid.y - mid.y);
        lastMid = mid;
        multi = true;
        return;
      }

      if (multi) return;

      // Box directly follows the cursor / finger position
      const t = e.touches[0];
      pos.x = t.clientX;
      pos.y = t.clientY;

      if (start && Math.hypot(t.clientX - start.x, t.clientY - start.y) > TAP_MAX_MOVE) {
        moved = true;
      }

      render();
    };

    const onEnd = (e) => {
      e.preventDefault();
      if (e.touches.length === 0) {
        const isTap = !moved && !multi && Date.now() - startTime < TAP_MAX_TIME;
        if (isTap) clickAtCursor();
        start = null;
        lastMid = null;
        multi = false;
      }
    };

    // Also follow mouse on devices with both touch and mouse (or laptop browser mobile view)
    const onMouseMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      render();
    };

    const opts = { passive: false };
    window.addEventListener("touchstart", onStart, opts);
    window.addEventListener("touchmove", onMove, opts);
    window.addEventListener("touchend", onEnd, opts);
    window.addEventListener("touchcancel", onEnd, opts);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onStart, opts);
      window.removeEventListener("touchmove", onMove, opts);
      window.removeEventListener("touchend", onEnd, opts);
      window.removeEventListener("touchcancel", onEnd, opts);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!touch) return null;

  return (
    <div ref={ref} className="touch-cursor" aria-hidden="true">
      <div className="touch-box" />
      <svg className="touch-arrow" width="18" height="20" viewBox="0 0 18 20">
        <path
          d="M1 1 L1 16 L5 12.5 L8 19 L10.5 18 L7.5 11.5 L13 11.5 Z"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
