"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Plus, Minus } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { projects, type Project } from "@/lib/data";

const INITIAL_COUNT = 3;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-hairline bg-surface/40 transition-colors duration-300 hover:border-hairline-solid"
    >
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* visual area — real cover image when provided, otherwise an
            abstract schematic with the project number */}
        <div
          className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-b border-hairline md:border-b-0 md:border-r"
          style={
            project.image
              ? undefined
              : { backgroundImage: `radial-gradient(circle at 30% 20%, ${project.accent}22, transparent 60%)` }
          }
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-blueprint bg-grid opacity-30 [background-size:28px_28px]" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative font-display text-6xl font-medium tracking-tight md:text-7xl"
                style={{ color: `${project.accent}33` }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
            </>
          )}
          <span
            className="absolute right-6 top-6 z-10 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur-sm"
            style={{
              borderColor: `${project.accent}55`,
              color: project.image ? "#F4F5F7" : project.accent,
              backgroundColor: project.image ? "#0A0B0E88" : undefined,
            }}
          >
            {project.metric}
          </span>
        </div>

        {/* content */}
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                {project.year}
              </span>
            </div>
            <h3 className="mb-2 font-display text-2xl font-medium text-ink md:text-3xl">
              {project.title}
            </h3>
            <p className="mb-4 font-body text-sm text-ink-muted">{project.tagline}</p>
            <p className="mb-6 font-body text-sm leading-relaxed text-ink-muted/90">
              {project.description}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-hairline-solid px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 border-t border-hairline pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" /> Source
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal transition-colors hover:text-signal-soft"
              >
                Live demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section id="work" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" label="Featured Work" />
        <h2 className="mb-14 max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
          Products, not assignments.
        </h2>

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-2 rounded-md border border-hairline-solid px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:border-signal hover:text-signal"
            >
              {expanded ? (
                <>
                  <Minus className="h-3.5 w-3.5" /> Show Fewer
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" /> View More Projects ({projects.length - INITIAL_COUNT})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
