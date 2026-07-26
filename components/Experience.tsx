"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { experience, type ExperienceItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<ExperienceItem["type"], string> = {
  work: "Work",
  Internship: "Internship",
  oss: "Open Source",
  learning: "Learning",
};

const TYPE_COLOR: Record<ExperienceItem["type"], string> = {
  work: "#E3A63D",
  Internship: "#C97A3D",
  oss: "#4FA3AE",
  learning: "#6E8A94",
};

export function Experience() {
  return (
    <section id="experience" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionLabel index="04" label="Trajectory" />
        <h2 className="mb-16 max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
          A decade, roughly chronological.
        </h2>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-hairline-solid md:left-[9px]" />

          <ol className="space-y-12">
            {experience.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10 md:pl-12"
              >
                <span
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 md:h-[19px] md:w-[19px]"
                  style={{ borderColor: TYPE_COLOR[item.type], backgroundColor: "#0A0B0E" }}
                />

                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <span
                    className={cn("font-mono text-[11px] uppercase tracking-[0.15em]")}
                    style={{ color: TYPE_COLOR[item.type] }}
                  >
                    {TYPE_LABEL[item.type]}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">{item.period}</span>
                </div>

                <h3 className="mb-1 font-display text-xl font-medium text-ink">
                  {item.title} <span className="text-ink-faint">— {item.org}</span>
                </h3>
                <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
