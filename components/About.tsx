"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { profile } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function About() {
  return (
    <section id="about" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel index="01" label="About" />
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-3xl font-medium leading-tight text-ink md:text-4xl"
          >
            Product-minded engineer,
            <br />
            infrastructure-literate.
          </motion.h2>
        </div>

        <div className="space-y-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-balance font-body text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            {profile.bio}
          </motion.p>

          <div className="grid gap-8 border-t border-hairline pt-10 sm:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
                Current focus
              </p>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                {profile.focus}
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Engineering philosophy
              </p>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                {profile.philosophy}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
