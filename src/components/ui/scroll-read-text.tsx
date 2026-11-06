import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { GradientText } from "./gradient-text";

export interface ScrollReadTextProps {
  /** The text content to split and scroll-read */
  text: string;
  /** Custom wrapper CSS class */
  className?: string;
  /** HTML element type, default 'p' */
  as?: React.ElementType;
  /** Optional phrases that should render with iridescent GradientText */
  gradientPhrases?: string[];
  /** Custom scroll trigger offsets, default: ['start 0.9', 'end 0.4'] */
  offset?: [string, string];
  /** Custom highlight color for the active reading word */
  highlightColor?: string;
}

interface WordToken {
  word: string;
  isGradient: boolean;
  id: string;
}

interface WordProps {
  token: WordToken;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  highlightColor: string;
}

function Word({
  token,
  index,
  total,
  progress,
  reducedMotion,
  highlightColor,
}: WordProps) {
  // Distribute progress across all words in paragraph
  const step = 1 / Math.max(1, total);
  const start = index * step;
  const end = (index + 1) * step;

  // Opacity: starts at 0.2 (20%) and transitions to 1.0 (100%)
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.03), end],
    [0.2, 1.0]
  );

  // Subtle highlight when the word is active (within its scroll window)
  const color = useTransform(
    progress,
    [
      Math.max(0, start - 0.02),
      (start + end) / 2,
      Math.min(1, end + 0.02),
    ],
    [
      "inherit",
      highlightColor,
      "inherit",
    ]
  );

  if (reducedMotion) {
    return (
      <span className="inline-block mr-[0.28em] opacity-100">
        {token.isGradient ? (
          <GradientText className="rounded-md px-1.5 py-0.5 mx-0.5 font-semibold">
            {token.word}
          </GradientText>
        ) : (
          token.word
        )}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-transform duration-100"
    >
      {token.isGradient ? (
        <GradientText className="rounded-md px-1.5 py-0.5 mx-0.5 font-semibold">
          {token.word}
        </GradientText>
      ) : (
        token.word
      )}
    </motion.span>
  );
}

export function ScrollReadText({
  text,
  className = "",
  as: Component = "p",
  gradientPhrases = [],
  offset = ["start 0.9", "end 0.4"],
  highlightColor = "#3b82f6",
}: ScrollReadTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Track scroll progress of this paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  // Tokenize text into words while flagging gradient phrases
  const tokens = useMemo<WordToken[]>(() => {
    if (!text) return [];
    const words = text.trim().split(/\s+/);

    // Normalize gradient phrases into lowercase tokens for phrase matching
    const phraseTokenLists = gradientPhrases.map((phrase) =>
      phrase
        .toLowerCase()
        .replace(/["“”'’]/g, "")
        .split(/\s+/)
    );

    return words.map((word, idx) => {
      const cleanWord = word.toLowerCase().replace(/["“”'’.,!?:;]/g, "");
      
      // Check if current word is part of any gradient phrase
      const isGradient = phraseTokenLists.some((pTokens) =>
        pTokens.includes(cleanWord)
      );

      return {
        word,
        isGradient,
        id: `${cleanWord}-${idx}`,
      };
    });
  }, [text, gradientPhrases]);

  return (
    <Component
      ref={containerRef}
      className={`break-words select-text ${className}`}
    >
      {tokens.map((token, index) => (
        <Word
          key={token.id}
          token={token}
          index={index}
          total={tokens.length}
          progress={scrollYProgress}
          reducedMotion={reducedMotion}
          highlightColor={highlightColor}
        />
      ))}
    </Component>
  );
}

export default ScrollReadText;
