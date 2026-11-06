import React from "react";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type GradientVariant =
  | "cyan"
  | "rose"
  | "emerald"
  | "violet"
  | "amber"
  | "fuchsia"
  | "rainbow";

export interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: GradientVariant;
}

const VARIANT_GRADIENTS: Record<GradientVariant, string> = {
  cyan: "from-cyan-400 via-teal-300 to-sky-400 dark:from-cyan-300 dark:via-teal-200 dark:to-sky-300",
  rose: "from-rose-500 via-pink-400 to-red-400 dark:from-rose-400 dark:via-pink-300 dark:to-red-300",
  emerald: "from-emerald-400 via-teal-300 to-cyan-300 dark:from-emerald-300 dark:via-teal-200 dark:to-cyan-200",
  violet: "from-violet-400 via-purple-300 to-indigo-400 dark:from-violet-300 dark:via-purple-200 dark:to-indigo-300",
  amber: "from-amber-400 via-yellow-300 to-orange-400 dark:from-amber-300 dark:via-yellow-200 dark:to-orange-300",
  fuchsia: "from-fuchsia-400 via-pink-400 to-rose-400 dark:from-fuchsia-300 dark:via-pink-300 dark:to-rose-300",
  rainbow: "from-rose-400 via-amber-300 via-emerald-400 to-cyan-400 dark:from-rose-300 dark:via-amber-200 dark:via-emerald-300 dark:to-cyan-300",
};

const VARIANT_BORDERS: Record<GradientVariant, string> = {
  cyan: "border-cyan-800/40",
  rose: "border-rose-800/40",
  emerald: "border-emerald-800/40",
  violet: "border-violet-800/40",
  amber: "border-amber-800/40",
  fuchsia: "border-fuchsia-800/40",
  rainbow: "border-zinc-800/60",
};

export function GradientText({
  className,
  children,
  as: Component = "span",
  variant = "cyan",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex items-center align-baseline overflow-hidden rounded-md px-1.5 py-0.5 mx-0.5 bg-zinc-950 dark:bg-zinc-900 border shadow-xs select-text",
        VARIANT_BORDERS[variant] || VARIANT_BORDERS.cyan,
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r bg-[length:200%_auto] animate-[gradient-shimmer_10s_ease-in-out_infinite]",
          VARIANT_GRADIENTS[variant] || VARIANT_GRADIENTS.cyan
        )}
      >
        {children}
      </span>
    </MotionComponent>
  );
}

export default GradientText;
