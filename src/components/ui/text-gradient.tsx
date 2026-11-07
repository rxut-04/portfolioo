"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** Sweep duration in seconds */
  duration?: number;
  /** Delay before the first sweep, in seconds */
  delay?: number;
  /** If true, sweeps back and forth forever. If false, plays once. */
  loop?: boolean;
  /** Pause between loop cycles, in seconds */
  repeatDelay?: number;
  className?: string;
}

export function GradientText({
  children,
  duration = 0.8,
  delay = 0.1,
  loop = true,
  repeatDelay = 1,
  className,
  ...props
}: GradientTextProps) {
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
          backgroundImage:
            "linear-gradient(90deg, currentColor 50%, #2563EB 50%, #EA580C, #DB2777, #9333EA)",
          backgroundSize: "250% 100%",
        }}
        initial={{ backgroundPosition: "100% 0%" }}
        animate={{ backgroundPosition: "0% 0%" }}
        transition={{
          duration,
          ease: "easeInOut",
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
