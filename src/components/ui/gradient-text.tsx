import React from "react";
import { motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

export interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex items-center align-baseline rounded-md px-1.5 py-0.5 mx-0.5 bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 shadow-sm select-text",
        className,
      )}
      {...props}
    >
      <span className="font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-1)))] bg-[length:300%_100%] animate-[gradient-text-shift_6s_linear_infinite]">
        {children}
      </span>
    </MotionComponent>
  );
}

export { GradientText };
