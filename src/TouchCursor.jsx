import { useEffect, useRef, useState } from "react";
import "./TouchCursor.css";

const SENSITIVITY = 1.4; // how far the box moves per finger movement
const TAP_MAX_MOVE = 10; // px: more than this = drag, not tap
const TAP_MAX_TIME = 250; // ms: longer than this = not a tap

const checkIsTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
};

export default function TouchCursor() {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    if (enabled) {
      document.documentElement.classList.add("touch-cursor-active");
      document.body.classList.add("touch-cursor-active");
    } else {
      document.documentElement.classList.remove("touch-cursor-active");
      document.body.classList.remove("touch-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("touch-cursor-active");
      document.body.classList.remove("touch-cursor-active");
    };
  }, [enabled]);

  useEffect(() => {
    setIsTouch(checkIsTouchDevice());
  }, []);

  useEffect(() => {
    if (!isTouch) return;

    const el = ref.current;
    const boxEl = boxRef.current;
    if (!el) return;

    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    let last = null; // last single-finger position
    let start = null; // where the touch began
    let startTime = 0;
    let moved = false;
    let multi = false; // true once a second finger touches
    let lastMid = null; // last midpoint of two fingers (for scroll)

    const render = () => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      // Grow box when hovering over interactive elements
      if (boxEl) {
        const target = document.elementFromPoint(pos.x, pos.y);
        const hit = target?.closest?.("a, button, [data-cursor='grow'], input, textarea, select, [role='button']");
        boxEl.classList.toggle("grow", Boolean(hit));
      }
    };
    render();

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

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
      if (!enabledRef.current) return;
      if (e.target?.closest?.(".cursor-mode-toggle")) return;

      e.preventDefault(); // stops the browser's own tap/click under the finger
      if (e.touches.length === 1) {
        const t = e.touches[0];
        last = { x: t.clientX, y: t.clientY };
        start = { ...last };
        startTime = Date.now();
        moved = false;
        multi = false;
      } else {
        multi = true;
        lastMid = midpoint(e.touches);
      }
    };

    const onMove = (e) => {
      if (!enabledRef.current) return;
      if (e.target?.closest?.(".cursor-mode-toggle")) return;

      e.preventDefault();

      // Two fingers = scroll the page
      if (e.touches.length >= 2) {
        const mid = midpoint(e.touches);
        if (lastMid) {
          window.scrollBy(0, lastMid.y - mid.y);
        }
        lastMid = mid;
        multi = true;
        return;
      }

      if (multi || !last) return;

      // One finger = move the cursor by the finger's delta (not its absolute position)
      const t = e.touches[0];
      const dx = (t.clientX - last.x) * SENSITIVITY;
      const dy = (t.clientY - last.y) * SENSITIVITY;
      last = { x: t.clientX, y: t.clientY };

      if (Math.hypot(t.clientX - start.x, t.clientY - start.y) > TAP_MAX_MOVE) {
        moved = true;
      }

      pos.x = clamp(pos.x + dx, 0, window.innerWidth);
      pos.y = clamp(pos.y + dy, 0, window.innerHeight);
      render();
    };

    const onEnd = (e) => {
      if (!enabledRef.current) return;
      if (e.target?.closest?.(".cursor-mode-toggle")) return;

      e.preventDefault();
      if (e.touches.length === 0) {
        const isTap = !moved && !multi && Date.now() - startTime < TAP_MAX_TIME;
        if (isTap) {
          clickAtCursor();
        }
        last = null;
        lastMid = null;
        multi = false;
      }
    };

    // passive: false is REQUIRED so preventDefault is respected
    const opts = { passive: false };
    window.addEventListener("touchstart", onStart, opts);
    window.addEventListener("touchmove", onMove, opts);
    window.addEventListener("touchend", onEnd, opts);
    window.addEventListener("touchcancel", onEnd, opts);

    return () => {
      window.removeEventListener("touchstart", onStart, opts);
      window.removeEventListener("touchmove", onMove, opts);
      window.removeEventListener("touchend", onEnd, opts);
      window.removeEventListener("touchcancel", onEnd, opts);
    };
  }, [isTouch]);

  if (!isTouch) return null;

  return (
    <>
      {enabled && (
        <div ref={ref} className="touch-cursor" aria-hidden="true">
          <div ref={boxRef} className="touch-box" />
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
      )}

      {/* Floating Mode Toggle for touch users with quick 2-finger scroll reminder */}
      <button
        type="button"
        onClick={() => setEnabled((prev) => !prev)}
        className={`cursor-mode-toggle ${enabled ? "active" : "inactive"}`}
        aria-label="Toggle Trackpad Cursor Mode"
      >
        <span>{enabled ? "🖱️ Trackpad Cursor: ON" : "👆 Standard Touch: ON"}</span>
      </button>
    </>
  );
}
