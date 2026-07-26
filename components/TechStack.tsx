"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { techStack, type TechNode } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORY_COLOR: Record<TechNode["category"], string> = {
  frontend: "#E3A63D",
  backend: "#C97A3D",
  data: "#4FA3AE",
  infra: "#6E8A94",
  ai: "#9C8B73",
};

const CATEGORY_LABEL: Record<TechNode["category"], string> = {
  frontend: "Interface",
  backend: "Services",
  data: "Data",
  infra: "Infra",
  ai: "AI",
};

// Fixed positions (percent) so the layout reads as a deliberate system
// diagram rather than a randomly scattered cloud.
const POSITIONS: Record<string, { x: number; y: number }> = {
  react: { x: 18, y: 24 },
  nextjs: { x: 38, y: 12 },
  typescript: { x: 58, y: 22 },
  nodejs: { x: 30, y: 52 },
  postgresql: { x: 54, y: 60 },
  docker: { x: 75, y: 46 },
  aws: { x: 82, y: 74 },
  ai: { x: 14, y: 76 },
};

export function TechStack() {
  const [active, setActive] = useState<TechNode>(techStack[0]);

  return (
    <section id="stack" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" label="Tech Ecosystem" />
        <h2 className="mb-14 max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
          One stack, wired end to end.
        </h2>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          {/* diagram */}
          <div className="relative h-[420px] rounded-lg border border-hairline bg-surface/40 md:h-[480px]">
            <div className="absolute inset-0 bg-blueprint bg-grid opacity-40 [background-size:32px_32px]" />
            <svg className="absolute inset-0 h-full w-full">
              {techStack.map((t) => {
                const p = POSITIONS[t.id];
                const center = { x: 50, y: 50 };
                return (
                  <line
                    key={t.id}
                    x1={`${center.x}%`} y1={`${center.y}%`}
                    x2={`${p.x}%`} y2={`${p.y}%`}
                    stroke={active.id === t.id ? CATEGORY_COLOR[t.category] : "#262933"}
                    strokeWidth={active.id === t.id ? 1.5 : 1}
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                );
              })}
            </svg>

            {/* center node = "the stack" */}
            <div
              className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal/50 bg-canvas font-mono text-[10px] uppercase tracking-wider text-signal"
              style={{ left: "50%", top: "50%" }}
            >
              you
            </div>

            {techStack.map((t) => {
              const p = POSITIONS[t.id];
              const isActive = active.id === t.id;
              return (
                <button
                  key={t.id}
                  onMouseEnter={() => setActive(t)}
                  onFocus={() => setActive(t)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={t.name}
                >
                  <motion.span
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm transition-colors",
                      isActive
                        ? "border-transparent text-canvas"
                        : "border-hairline-solid bg-canvas/80 text-ink-muted hover:text-ink"
                    )}
                    style={{ backgroundColor: isActive ? CATEGORY_COLOR[t.category] : undefined }}
                  >
                    {t.name}
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="flex flex-col justify-between rounded-lg border border-hairline p-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLOR[active.category] }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                  {CATEGORY_LABEL[active.category]}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-3 font-display text-2xl font-medium text-ink">{active.name}</h3>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{active.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-hairline pt-6">
              <span className="font-mono text-xs text-ink-faint">hands-on experience</span>
              <span className="font-mono text-sm text-signal">{active.years}</span>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-ink-faint">
          hover or focus a node to inspect it — every wire runs back to one system.
        </p>
      </div>
    </section>
  );
}
