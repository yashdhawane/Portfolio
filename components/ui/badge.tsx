import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline-solid px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
