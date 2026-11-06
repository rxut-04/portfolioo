"use client";
import React from "react";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type GradientVariant =
  | "rainbow"
  | "cyan"
  | "rose"
  | "amber"
  | "emerald"
  | "violet";

export interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: GradientVariant;
}

const COLOR_VARIANTS: Record<
  GradientVariant,
  [string, string, string, string]
> = {
  rainbow: [
    "hsl(var(--color-1))",
    "hsl(var(--color-2))",
    "hsl(var(--color-3))",
    "hsl(var(--color-4))",
  ],
  cyan: [
    "hsl(var(--color-3))",
    "hsl(var(--color-2))",
    "hsl(200 100% 50%)",
    "hsl(160 100% 50%)",
  ],
  rose: [
    "hsl(var(--color-1))",
    "hsl(var(--color-5))",
    "hsl(350 100% 60%)",
    "hsl(var(--color-1))",
  ],
  amber: [
    "hsl(var(--color-4))",
    "hsl(var(--brand))",
    "hsl(35 100% 55%)",
    "hsl(var(--color-4))",
  ],
  emerald: [
    "hsl(var(--color-2))",
    "hsl(170 100% 45%)",
    "hsl(130 100% 50%)",
    "hsl(var(--color-2))",
  ],
  violet: [
    "hsl(var(--color-5))",
    "hsl(270 100% 65%)",
    "hsl(var(--color-3))",
    "hsl(var(--color-1))",
  ],
};

const BORDER_VARIANTS: Record<GradientVariant, string> = {
  rainbow: "border-zinc-800",
  cyan: "border-cyan-800/60",
  rose: "border-rose-800/60",
  amber: "border-amber-800/60",
  emerald: "border-emerald-800/60",
  violet: "border-violet-800/60",
};

function GradientText({
  className,
  children,
  as: Component = "span",
  variant = "rainbow",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);
  const [c1, c2, c3, c4] = COLOR_VARIANTS[variant] || COLOR_VARIANTS.rainbow;

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex items-center align-baseline overflow-hidden rounded-md px-1.5 py-0.5 mx-0.5 bg-zinc-950 dark:bg-black text-white font-bold border shadow-xs select-text",
        BORDER_VARIANTS[variant] || BORDER_VARIANTS.rainbow,
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        <span
          style={{ backgroundColor: c1 }}
          className="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] animate-[gradient-border_16s_ease-in-out_infinite,gradient-1_24s_ease-in-out_infinite_alternate] mix-blend-overlay blur-[1rem]"
        />
        <span
          style={{ backgroundColor: c2 }}
          className="pointer-events-none absolute right-0 top-0 h-[30vw] w-[30vw] animate-[gradient-border_16s_ease-in-out_infinite,gradient-2_26s_ease-in-out_infinite_alternate] mix-blend-overlay blur-[1rem]"
        />
        <span
          style={{ backgroundColor: c3 }}
          className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[gradient-border_16s_ease-in-out_infinite,gradient-3_28s_ease-in-out_infinite_alternate] mix-blend-overlay blur-[1rem]"
        />
        <span
          style={{ backgroundColor: c4 }}
          className="pointer-events-none absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] animate-[gradient-border_16s_ease-in-out_infinite,gradient-4_30s_ease-in-out_infinite_alternate] mix-blend-overlay blur-[1rem]"
        />
      </span>
    </MotionComponent>
  );
}

export { GradientText };
export default GradientText;
