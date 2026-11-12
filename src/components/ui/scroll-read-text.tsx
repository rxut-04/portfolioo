import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "motion/react";
import { GradientText } from "./text-gradient";
import { Highlighter, type AnnotationAction } from "./highlighter";

export type { AnnotationAction };

export interface PhraseConfig {
  phrase: string;
  variant?: string;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
}

export type GradientPhraseConfig = string | PhraseConfig;

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
  highlightPhrases?: GradientPhraseConfig[];
  globalStartWord?: number;
  totalArticleWords?: number;
  highlightColor?: string;
}

interface TextItem {
  id: string;
  text: string;
  isAnnotated: boolean;
  isGradient: boolean;
  variant?: string;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  globalIndex: number;
  wordCount: number;
}

const VARIANT_HIGHLIGHT_MAP: Record<
  string,
  { action: AnnotationAction; color: string }
> = {
  cyan: { action: "underline", color: "#38bdf8" },
  rose: { action: "crossed-off", color: "#f43f5e" },
  violet: { action: "box", color: "#a855f7" },
  amber: { action: "highlight", color: "rgba(251, 191, 36, 0.35)" },
  emerald: { action: "highlight", color: "rgba(52, 211, 153, 0.35)" },
  fuchsia: { action: "circle", color: "#e879f9" },
  blue: { action: "bracket", color: "#60a5fa" },
};

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

  const [isActive, setIsActive] = useState(() => {
    try {
      return (progress?.get() || 0) >= Math.max(0, start - 0.005);
    } catch {
      return false;
    }
  });

  useMotionValueEvent(progress, "change", (latest) => {
    if (!isActive && latest >= Math.max(0, start - 0.005)) {
      setIsActive(true);
    }
  });

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

  const shouldAnnotate = isAtEnd || isActive || reducedMotion;

  const innerContent = item.isGradient ? (
    <GradientText variant={item.variant as any} loop={false}>
      {item.text}
    </GradientText>
  ) : (
    item.text
  );

  const content = item.isAnnotated ? (
    <Highlighter
      action={item.action || "highlight"}
      color={item.color || "#ffd1dc"}
      strokeWidth={item.strokeWidth ?? 1.8}
      animationDuration={item.animationDuration ?? 600}
      iterations={item.iterations ?? 2}
      padding={item.padding ?? 3}
      multiline={item.multiline ?? true}
      active={shouldAnnotate}
    >
      {innerContent}
    </Highlighter>
  ) : (
    innerContent
  );

  if (reducedMotion) {
    return (
      <span className="inline-block mr-[0.28em] opacity-100 select-text">
        {content}
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
      {content}
    </motion.span>
  );
});

export function ScrollReadParagraph({
  text,
  className = "",
  as: Component = "p",
  gradientPhrases = [],
  highlightPhrases,
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

  const activePhrasesConfig = highlightPhrases || gradientPhrases;

  // Parse text into exact phrase segments and normal words
  const items = useMemo<TextItem[]>(() => {
    if (!text) return [];

    // Normalise phrases configuration
    const sortedPhrases = activePhrasesConfig
      .map((item) => {
        if (typeof item === "string") {
          return {
            phrase: item,
            variant: "rainbow",
            action: undefined as AnnotationAction | undefined,
            color: undefined as string | undefined,
            strokeWidth: undefined as number | undefined,
            animationDuration: undefined as number | undefined,
            iterations: undefined as number | undefined,
            padding: undefined as number | undefined,
            multiline: true,
          };
        }
        return {
          phrase: item.phrase,
          variant: item.variant || "rainbow",
          action: item.action,
          color: item.color,
          strokeWidth: item.strokeWidth,
          animationDuration: item.animationDuration,
          iterations: item.iterations,
          padding: item.padding,
          multiline: item.multiline ?? true,
        };
      })
      .sort((a, b) => b.phrase.length - a.phrase.length);

    // Find all exact occurrences of phrases in this paragraph
    interface MatchedPhrase {
      start: number;
      end: number;
      text: string;
      variant?: string;
      action?: AnnotationAction;
      color?: string;
      strokeWidth?: number;
      animationDuration?: number;
      iterations?: number;
      padding?: number;
      multiline?: boolean;
    }

    const matches: MatchedPhrase[] = [];

    for (const pConfig of sortedPhrases) {
      const cleanP = pConfig.phrase.replace(/[.,!?:;]/g, "").trim();
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
          matches.push({
            start,
            end,
            text: m[0],
            variant: pConfig.variant,
            action: pConfig.action,
            color: pConfig.color,
            strokeWidth: pConfig.strokeWidth,
            animationDuration: pConfig.animationDuration,
            iterations: pConfig.iterations,
            padding: pConfig.padding,
            multiline: pConfig.multiline,
          });
        }
      }
    }

    matches.sort((a, b) => a.start - b.start);

    // Segment text into chunks
    interface Chunk {
      text: string;
      isAnnotated: boolean;
      isGradient: boolean;
      variant?: string;
      action?: AnnotationAction;
      color?: string;
      strokeWidth?: number;
      animationDuration?: number;
      iterations?: number;
      padding?: number;
      multiline?: boolean;
    }

    const chunks: Chunk[] = [];
    let lastIdx = 0;
    for (const m of matches) {
      if (m.start > lastIdx) {
        chunks.push({
          text: text.slice(lastIdx, m.start),
          isAnnotated: false,
          isGradient: false,
        });
      }

      // Check whether this match qualifies as an annotated highlight or gradient
      const mappedDefaults = m.variant ? VARIANT_HIGHLIGHT_MAP[m.variant] : null;
      const effectiveAction = m.action || mappedDefaults?.action || "highlight";
      const effectiveColor = m.color || mappedDefaults?.color || "#ffd1dc";

      chunks.push({
        text: text.slice(m.start, m.end),
        isAnnotated: true,
        isGradient: Boolean(m.variant && !m.action),
        variant: m.variant,
        action: effectiveAction,
        color: effectiveColor,
        strokeWidth: m.strokeWidth,
        animationDuration: m.animationDuration,
        iterations: m.iterations,
        padding: m.padding,
        multiline: m.multiline,
      });
      lastIdx = m.end;
    }
    if (lastIdx < text.length) {
      chunks.push({
        text: text.slice(lastIdx),
        isAnnotated: false,
        isGradient: false,
      });
    }

    // Build sequential TextItem tokens
    const result: TextItem[] = [];
    let runningWordOffset = globalStartWord;

    for (let cIdx = 0; cIdx < chunks.length; cIdx++) {
      const chunk = chunks[cIdx];
      if (chunk.isAnnotated) {
        const wCount = chunk.text.trim().split(/\s+/).length;
        result.push({
          id: `annot-${cIdx}-${runningWordOffset}`,
          text: chunk.text.trim(),
          isAnnotated: true,
          isGradient: chunk.isGradient,
          variant: chunk.variant,
          action: chunk.action,
          color: chunk.color,
          strokeWidth: chunk.strokeWidth,
          animationDuration: chunk.animationDuration,
          iterations: chunk.iterations,
          padding: chunk.padding,
          multiline: chunk.multiline,
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
            isAnnotated: false,
            isGradient: false,
            globalIndex: runningWordOffset,
            wordCount: 1,
          });
          runningWordOffset += 1;
        }
      }
    }

    return result;
  }, [text, activePhrasesConfig, globalStartWord]);

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
