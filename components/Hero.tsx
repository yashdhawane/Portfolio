"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Magnetic } from "./Magnetic";
import { GlitchText } from "./GlitchText";
import { StickerField } from "./StickerField";
import { profile } from "@/lib/data";

const fromTop = {
  hidden: { y: -50, opacity: 0, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fromBottom = {
  hidden: { y: 120, opacity: 0, scale: 0.94 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * `introDone` gates the entrance animation: Hero mounts underneath the
 * IntroExperience overlay immediately, but only plays its reveal once the
 * overlay is gone (either the trailer finished, or it was skipped for a
 * repeat visit) so the "pop up" moment is actually seen.
 */
export function Hero({ introDone = true }: { introDone?: boolean }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden border-b border-hairline px-6 pt-24 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-blueprint bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-grain" />

      {/* ambient aura behind the character */}
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-signal/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-10 rounded-full bg-mint/15 blur-[100px]"
        />
      </div>

      <motion.div
        variants={fromTop}
        custom={0}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="relative z-20 mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
        </span>
        available for select engagements — {profile.location}
      </motion.div>

      {/* giant glitch headline — sits behind the character */}
      <motion.h1
        variants={fromTop}
        custom={1}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="relative z-0 select-none text-center font-display text-[15vw] font-bold leading-[0.88] tracking-tight sm:text-[11vw] md:text-[8vw]"
      >
        <span className="block">
          <GlitchText text="FULL STACK" />
        </span>
        <span className="block text-ink-faint">
          <GlitchText text="ENGINEER." />
        </span>
      </motion.h1>

      <motion.p
        variants={fromTop}
        custom={2}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="relative z-20 mt-6 max-w-xl text-balance text-center font-body text-base text-ink-muted md:text-lg"
      >
        {profile.tagline} I'm {profile.name} — I design, build, and ship the
        whole stack, from schema to pixel.
      </motion.p>

      <motion.div
        variants={fromTop}
        custom={3}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Magnetic>
          <Button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Magnetic>
        <Magnetic strength={0.25}>
          <Button
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Terminal className="h-4 w-4" /> Contact Me
          </Button>
        </Magnetic>
      </motion.div>

      {/* character — rises up in front of the glitch headline */}
      <motion.div
        variants={fromBottom}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="pointer-events-none relative z-10 mt-4 h-[34vh] w-[min(90vw,460px)] shrink-0 sm:h-[40vh] md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:h-[48vh] md:-translate-x-1/2"
        style={{
          backgroundImage: "url(/images/character.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-6 z-20 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint md:left-12 md:flex md:items-center md:gap-2"
      >
        <span className="h-px w-6 bg-hairline-solid" /> scroll
      </motion.div>

      <StickerField active={introDone} />
    </section>
  );
}
