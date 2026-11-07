"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type GradientVariant =
  | "rainbow"
  | "cyan"
  | "rose"
  | "amber"
  | "emerald"
  | "violet"
  | "fuchsia";

export const GRADIENT_VARIANTS: Record<GradientVariant, string> = {
  rainbow:
    "linear-gradient(90deg, currentColor 50%, #2563EB 50%, #EA580C, #DB2777, #9333EA)",
  cyan:
    "linear-gradient(90deg, currentColor 50%, #06B6D4 50%, #3B82F6, #0284C7, #14B8A6)",
  rose:
    "linear-gradient(90deg, currentColor 50%, #F43F5E 50%, #E11D48, #F97316, #FB7185)",
  amber:
    "linear-gradient(90deg, currentColor 50%, #F59E0B 50%, #EA580C, #D97706, #EAB308)",
  emerald:
    "linear-gradient(90deg, currentColor 50%, #10B981 50%, #059669, #0D9488, #34D399)",
  violet:
    "linear-gradient(90deg, currentColor 50%, #8B5CF6 50%, #7C3AED, #6366F1, #9333EA)",
  fuchsia:
    "linear-gradient(90deg, currentColor 50%, #D946EF 50%, #C026D3, #DB2777, #8B5CF6)",
};

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** Sweep duration in seconds */
  duration?: number;
  /** Delay before the first sweep, in seconds */
  delay?: number;
  /** If true, sweeps back and forth forever. If false, plays once. Defaults to false. */
  loop?: boolean;
  /** Pause between loop cycles, in seconds */
  repeatDelay?: number;
  className?: string;
  variant?: GradientVariant;
  customGradient?: string;
}

export function GradientText({
  children,
  duration = 0.9,
  delay = 0.05,
  loop = false,
  repeatDelay = 1,
  className,
  variant = "rainbow",
  customGradient,
  ...props
}: GradientTextProps) {
  const gradient =
    customGradient || GRADIENT_VARIANTS[variant] || GRADIENT_VARIANTS.rainbow;

  return (
    <span
      className={cn(
        "relative inline-block text-black dark:text-white",
        className
      )}
      {...props}
    >
      <motion.span
        className="inline-block bg-clip-text pb-1"
        style={{
          WebkitTextFillColor: "transparent",
          backgroundImage: gradient,
          backgroundSize: "250% 100%",
        }}
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 0%" }}
        transition={{
          duration,
          ease: "easeOut",
          delay,
          ...(loop && {
            repeat: Infinity,
            repeatType: "reverse" as const,
            repeatDelay,
          }),
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default GradientText;
