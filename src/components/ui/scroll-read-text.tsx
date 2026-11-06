import React, { useRef, useMemo, useState, useEffect, createContext, useContext } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { GradientText, GradientVariant } from "./gradient-text";

export type GradientPhraseConfig =
  | string
  | {
      phrase: string;
      variant?: GradientVariant;
    };

export interface ScrollReadArticleContextValue {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  totalArticleWords: number;
  highlightColor: string;
}

const ScrollReadArticleContext = createContext<ScrollReadArticleContextValue | null>(null);

export interface ScrollReadArticleProps {
  children: React.ReactNode;
  className?: string;
  totalWords?: number;
  offset?: [string, string];
  highlightColor?: string;
}

/**
 * Utility to calculate cumulative word offsets across a collection of paragraph strings.
 * Guarantees 100% sequential progression with zero parallel loading across paragraphs.
 */
export function computeWordOffsets(texts: string[]) {
  let cum = 0;
  const offsets = texts.map((t) => {
    const count = t.trim().split(/\s+/).length;
    const start = cum;
    cum += count;
    return { start, count };
  });
  return { totalWords: cum, offsets };
}

/**
 * Article-level scroll coordinator.
 * Measures scroll progress over the entire article container so that all paragraphs
 * read strictly sequentially from top to bottom — never in parallel.
 */
export function ScrollReadArticle({
  children,
  className = "",
  totalWords = 100,
  offset = ["start 28%", "end 45%"],
  highlightColor = "#3b82f6",
}: ScrollReadArticleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  return (
    <ScrollReadArticleContext.Provider
      value={{
        progress: scrollYProgress,
        reducedMotion,
        totalArticleWords: totalWords,
        highlightColor,
      }}
    >
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </ScrollReadArticleContext.Provider>
  );
}

export interface ScrollReadParagraphProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  gradientPhrases?: GradientPhraseConfig[];
  /** Global starting word index of this paragraph within the whole article */
  globalStartWord?: number;
  /** Total words in the entire article (defaults to context total) */
  totalArticleWords?: number;
  highlightColor?: string;
}

interface ParsedToken {
  word: string;
  isGradient: boolean;
  variant: GradientVariant;
  phrasePosition: "single" | "first" | "middle" | "last";
  id: string;
}

const FALLBACK_VARIANTS: GradientVariant[] = [
  "cyan",
  "rose",
  "violet",
  "amber",
  "emerald",
  "fuchsia",
];

const Word = React.memo(function Word({
  word,
  isGradient,
  variant,
  phrasePosition,
  globalIndex,
  totalWords,
  progress,
  reducedMotion,
  highlightColor,
}: {
  word: string;
  isGradient: boolean;
  variant: GradientVariant;
  phrasePosition: "single" | "first" | "middle" | "last";
  globalIndex: number;
  totalWords: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  highlightColor: string;
}) {
  const step = 1 / Math.max(1, totalWords);
  const start = globalIndex * step;
  const end = (globalIndex + 1) * step;

  // Opacity: starts at 0.2 (20%) and transitions to 1.0 (100%) smoothly
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.002), end],
    [0.2, 1.0]
  );

  // Subtle highlight when the word is active (within its scroll window)
  const color = useTransform(
    progress,
    [
      Math.max(0, start - 0.001),
      (start + end) / 2,
      Math.min(1, end + 0.001),
    ],
    ["inherit", highlightColor, "inherit"]
  );

  let badgeShape = "rounded-md px-1.5 mx-0.5";
  let spacingClass = "mr-[0.28em]";
  const addSpaceAfter = phrasePosition === "first" || phrasePosition === "middle";

  if (isGradient) {
    if (phrasePosition === "first") {
      badgeShape = "rounded-l-md rounded-r-none pl-1.5 pr-0.5 ml-0.5 mr-0 border-r-0";
      spacingClass = "mr-0";
    } else if (phrasePosition === "middle") {
      badgeShape = "rounded-none px-0.5 mx-0 border-x-0";
      spacingClass = "mr-0";
    } else if (phrasePosition === "last") {
      badgeShape = "rounded-r-md rounded-l-none pr-1.5 pl-0.5 mr-0.5 ml-0 border-l-0";
      spacingClass = "mr-[0.28em]";
    }
  }

  const renderedContent = isGradient ? (
    <GradientText variant={variant} className={badgeShape}>
      {word}
      {addSpaceAfter ? "\u00A0" : ""}
    </GradientText>
  ) : (
    word
  );

  if (reducedMotion) {
    return (
      <span className={`inline-block ${spacingClass} opacity-100`}>
        {renderedContent}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, color, willChange: "opacity" }}
      className={`inline-block ${spacingClass} select-text`}
    >
      {renderedContent}
    </motion.span>
  );
});

export function ScrollReadParagraph({
  text,
  className = "",
  as: Component = "p",
  gradientPhrases = [],
  globalStartWord = 0,
  totalArticleWords: propTotalWords,
  highlightColor: propHighlightColor,
}: ScrollReadParagraphProps) {
  const articleContext = useContext(ScrollReadArticleContext);
  const fallbackRef = useRef<HTMLElement>(null);

  // If outside ScrollReadArticle, fallback to local scroll progress
  const { scrollYProgress: fallbackProgress } = useScroll({
    target: fallbackRef,
    offset: ["start 30%", "end 50%"] as any,
  });

  const progress = articleContext ? articleContext.progress : fallbackProgress;
  const reducedMotion = articleContext ? articleContext.reducedMotion : false;
  const highlightColor =
    propHighlightColor || articleContext?.highlightColor || "#3b82f6";

  const words = useMemo(() => {
    if (!text) return [];
    return text.trim().split(/\s+/);
  }, [text]);

  const totalWords =
    propTotalWords || articleContext?.totalArticleWords || words.length;

  const tokens = useMemo<ParsedToken[]>(() => {
    if (words.length === 0) return [];

    const cleanWords = words.map((w) =>
      w.toLowerCase().replace(/["“”'’.,!?:;]/g, "")
    );

    // Normalize gradient phrases with their variants, longest phrases first
    const normalizedPhrases = gradientPhrases
      .map((item, idx) => {
        const phraseStr = typeof item === "string" ? item : item.phrase;
        const variant =
          typeof item === "string"
            ? FALLBACK_VARIANTS[idx % FALLBACK_VARIANTS.length]
            : item.variant || FALLBACK_VARIANTS[idx % FALLBACK_VARIANTS.length];

        const pTokens = phraseStr
          .toLowerCase()
          .replace(/["“”'’]/g, "")
          .split(/\s+/)
          .filter(Boolean);

        return { pTokens, variant };
      })
      .sort((a, b) => b.pTokens.length - a.pTokens.length);

    const matches: {
      isGradient: boolean;
      variant: GradientVariant;
      phrasePosition: "single" | "first" | "middle" | "last";
    }[] = cleanWords.map(() => ({
      isGradient: false,
      variant: "cyan",
      phrasePosition: "single",
    }));

    for (const { pTokens, variant } of normalizedPhrases) {
      const pLen = pTokens.length;
      for (let i = 0; i <= cleanWords.length - pLen; i++) {
        let alreadyMatched = false;
        for (let j = 0; j < pLen; j++) {
          if (matches[i + j].isGradient) {
            alreadyMatched = true;
            break;
          }
        }
        if (alreadyMatched) continue;

        let allMatch = true;
        for (let j = 0; j < pLen; j++) {
          if (cleanWords[i + j] !== pTokens[j]) {
            allMatch = false;
            break;
          }
        }

        if (allMatch) {
          for (let j = 0; j < pLen; j++) {
            let pos: "single" | "first" | "middle" | "last" = "single";
            if (pLen > 1) {
              if (j === 0) pos = "first";
              else if (j === pLen - 1) pos = "last";
              else pos = "middle";
            }
            matches[i + j] = {
              isGradient: true,
              variant,
              phrasePosition: pos,
            };
          }
          i += pLen - 1;
        }
      }
    }

    return words.map((word, idx) => ({
      word,
      isGradient: matches[idx].isGradient,
      variant: matches[idx].variant,
      phrasePosition: matches[idx].phrasePosition,
      id: `${cleanWords[idx]}-${idx}`,
    }));
  }, [words, gradientPhrases]);

  return (
    <Component
      ref={fallbackRef}
      className={`break-words select-text ${className}`}
    >
      {tokens.map((token, index) => (
        <Word
          key={token.id}
          word={token.word}
          isGradient={token.isGradient}
          variant={token.variant}
          phrasePosition={token.phrasePosition}
          globalIndex={globalStartWord + index}
          totalWords={totalWords}
          progress={progress}
          reducedMotion={reducedMotion}
          highlightColor={highlightColor}
        />
      ))}
    </Component>
  );
}

/**
 * Backward compatibility alias: ScrollReadText can be used anywhere.
 */
export const ScrollReadText = ScrollReadParagraph;
export default ScrollReadText;
