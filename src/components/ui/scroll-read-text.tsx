import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { GradientText } from "./text-gradient";

export type GradientPhraseConfig =
  | string
  | {
      phrase: string;
      variant?: string;
    };

export interface ScrollReadArticleContextValue {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  totalArticleWords: number;
  highlightColor: string;
  isAtEnd: boolean;
}

const ScrollReadArticleContext =
  createContext<ScrollReadArticleContextValue | null>(null);

export interface ScrollReadArticleProps {
  children: React.ReactNode;
  className?: string;
  totalWords?: number;
  offset?: [string, string];
  highlightColor?: string;
}

/**
 * Utility to calculate cumulative word offsets across an array of paragraphs.
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
 * read strictly sequentially from top to bottom.
 *
 * Automatically detects when the user reaches near the bottom of the page/container,
 * and smoothly reveals all remaining text without requiring extra scroll effort.
 */
export function ScrollReadArticle({
  children,
  className = "",
  totalWords = 100,
  offset = ["start 85%", "end 85%"],
  highlightColor = "#3b82f6",
}: ScrollReadArticleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Monitor scroll position to detect when page or article is at the end
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAtEnd = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. User reached within 220px of the bottom of the document
      const nearPageBottom = scrollY + windowHeight >= docHeight - 220;

      // 2. Or the article container has scrolled near its bottom
      let nearArticleBottom = false;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        nearArticleBottom = rect.bottom <= windowHeight * 0.88;
      }

      if (nearPageBottom || nearArticleBottom) {
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    };

    window.addEventListener("scroll", checkAtEnd, { passive: true });
    window.addEventListener("resize", checkAtEnd, { passive: true });
    checkAtEnd();

    return () => {
      window.removeEventListener("scroll", checkAtEnd);
      window.removeEventListener("resize", checkAtEnd);
    };
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
        isAtEnd,
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
  globalStartWord?: number;
  totalArticleWords?: number;
  highlightColor?: string;
}

interface TextItem {
  id: string;
  text: string;
  isGradient: boolean;
  variant?: string;
  globalIndex: number;
  wordCount: number;
}

const Word = React.memo(function Word({
  item,
  totalWords,
  progress,
  reducedMotion,
  highlightColor,
  isAtEnd,
}: {
  item: TextItem;
  totalWords: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  highlightColor: string;
  isAtEnd: boolean;
}) {
  const step = 1 / Math.max(1, totalWords);
  const start = item.globalIndex * step;
  const end = (item.globalIndex + item.wordCount) * step;

  // Opacity: starts at 0.2 (20%) and transitions to 1.0 (100%)
  const dynamicOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.003), end],
    [0.2, 1.0]
  );

  // Subtle highlight when active
  const dynamicColor = useTransform(
    progress,
    [
      Math.max(0, start - 0.002),
      (start + end) / 2,
      Math.min(1, end + 0.002),
    ],
    ["inherit", highlightColor, "inherit"]
  );

  if (reducedMotion) {
    return (
      <span className="inline-block mr-[0.28em] opacity-100">
        {item.isGradient ? (
          <GradientText>{item.text}</GradientText>
        ) : (
          item.text
        )}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        opacity: isAtEnd ? 1.0 : dynamicOpacity,
        color: isAtEnd ? "inherit" : dynamicColor,
      }}
      className="inline-block mr-[0.28em] select-text"
    >
      {item.isGradient ? (
        <GradientText>{item.text}</GradientText>
      ) : (
        item.text
      )}
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

  const { scrollYProgress: fallbackProgress } = useScroll({
    target: fallbackRef,
    offset: ["start 60%", "end 85%"] as any,
  });

  const progress = articleContext ? articleContext.progress : fallbackProgress;
  const reducedMotion = articleContext ? articleContext.reducedMotion : false;
  const isAtEnd = articleContext ? articleContext.isAtEnd : false;
  const highlightColor =
    propHighlightColor || articleContext?.highlightColor || "#3b82f6";

  // Parse text into exact phrase segments and normal words
  const items = useMemo<TextItem[]>(() => {
    if (!text) return [];

    // Sort phrases by character length descending to prevent substring collisions
    const sortedPhrases = gradientPhrases
      .map((item) => {
        const phrase = typeof item === "string" ? item : item.phrase;
        const variant: string =
          typeof item === "string" ? "rainbow" : item.variant || "rainbow";
        return { phrase, variant };
      })
      .sort((a, b) => b.phrase.length - a.phrase.length);

    // Find all exact occurrences of gradient phrases in this paragraph
    const matches: {
      start: number;
      end: number;
      text: string;
      variant: string;
    }[] = [];

    for (const { phrase, variant } of sortedPhrases) {
      const cleanP = phrase.replace(/[.,!?:;]/g, "").trim();
      if (!cleanP) continue;

      // Regex matching exact phrase boundary
      const escaped = cleanP.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}[.,!?:;]?`, "gi");
      let m;
      while ((m = regex.exec(text)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        const overlaps = matches.some(
          (prev) => !(end <= prev.start || start >= prev.end)
        );
        if (!overlaps) {
          matches.push({ start, end, text: m[0], variant });
        }
      }
    }

    matches.sort((a, b) => a.start - b.start);

    // Segment text into chunks
    interface Chunk {
      text: string;
      isGradient: boolean;
      variant: string;
    }
    const chunks: Chunk[] = [];
    let lastIdx = 0;
    for (const m of matches) {
      if (m.start > lastIdx) {
        chunks.push({
          text: text.slice(lastIdx, m.start),
          isGradient: false,
          variant: "rainbow",
        });
      }
      chunks.push({
        text: text.slice(m.start, m.end),
        isGradient: true,
        variant: m.variant,
      });
      lastIdx = m.end;
    }
    if (lastIdx < text.length) {
      chunks.push({
        text: text.slice(lastIdx),
        isGradient: false,
        variant: "rainbow",
      });
    }

    // Build sequential TextItem tokens
    const result: TextItem[] = [];
    let runningWordOffset = globalStartWord;

    for (let cIdx = 0; cIdx < chunks.length; cIdx++) {
      const chunk = chunks[cIdx];
      if (chunk.isGradient) {
        const wCount = chunk.text.trim().split(/\s+/).length;
        result.push({
          id: `grad-${cIdx}-${runningWordOffset}`,
          text: chunk.text.trim(),
          isGradient: true,
          variant: chunk.variant,
          globalIndex: runningWordOffset,
          wordCount: wCount,
        });
        runningWordOffset += wCount;
      } else {
        const words = chunk.text.trim().split(/\s+/).filter(Boolean);
        for (let wIdx = 0; wIdx < words.length; wIdx++) {
          result.push({
            id: `word-${cIdx}-${wIdx}-${runningWordOffset}`,
            text: words[wIdx],
            isGradient: false,
            variant: "rainbow",
            globalIndex: runningWordOffset,
            wordCount: 1,
          });
          runningWordOffset += 1;
        }
      }
    }

    return result;
  }, [text, gradientPhrases, globalStartWord]);

  const totalWords = propTotalWords || articleContext?.totalArticleWords || 100;

  return (
    <Component
      ref={fallbackRef}
      className={`break-words select-text ${className}`}
    >
      {items.map((item) => (
        <Word
          key={item.id}
          item={item}
          totalWords={totalWords}
          progress={progress}
          reducedMotion={reducedMotion}
          highlightColor={highlightColor}
          isAtEnd={isAtEnd}
        />
      ))}
    </Component>
  );
}

export const ScrollReadText = ScrollReadParagraph;
export default ScrollReadText;
