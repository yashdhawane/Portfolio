"use client";

import { cn } from "@/lib/utils";

/**
 * Red RGB-split glitch text — the treatment from the "DIGITAL CULTIVATOR"
 * reference. `burst` plays a short, punchier glitch (used on phase-in),
 * otherwise it idles with a subtle periodic flicker so it stays "alive"
 * without being distracting.
 */
export function GlitchText({
  text,
  className,
  burst = false,
  white = false,
}: {
  text: string;
  className?: string;
  burst?: boolean;
  white?: boolean;
}) {
  return (
    <span
      data-text={text}
      className={cn("glitch-text", burst && "glitch-burst", white && "glitch-white", className)}
    >
      {text}
    </span>
  );
}
