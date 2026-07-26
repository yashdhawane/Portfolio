"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { Volume2, VolumeX, Play } from "lucide-react";
import { GlitchText } from "./GlitchText";
import { BrutalLine } from "./BrutalLine";
import { TrailerAudioEngine } from "@/lib/audioEngine";
import { useSpeech } from "@/lib/useSpeech";
import { profile } from "@/lib/data";

type Stage = "gate" | "playing" | "exiting" | "done";

const PHASES = [
  {
    id: "hook",
    duration: 3000,
    spoken: "To every tech recruiter, hiring manager, and engineering lead seeing this right now.",
  },
  {
    id: "identity",
    duration: 2400,
    spoken: `I am ${profile.name}.`,
  },
  {
    id: "soft",
    duration: 2800,
    spoken:
      "I build robust backends, scalable APIs, and distributed systems designed to handle real-world traffic, reliably.",
  },
  {
    id: "credits",
    duration: 3400,
    spoken: "Clean architecture. Scalable systems. Production-grade code.",
  },
  {
    id: "reveal",
    duration: 3000,
    spoken: "Your search ends here.",
  },
  {
    id: "cta",
    duration: 4200,
    spoken: "Let's build something great, together.",
  },
] as const;

const TOTAL_MS = PHASES.reduce((s, p) => s + p.duration, 0);

const CAPABILITIES = [
  "REST & GraphQL APIs",
  "Distributed Systems Design",
  "Database Architecture & Optimization",
  "Cloud Infrastructure — AWS",
  "CI/CD & DevOps Automation",
  "System Design at Scale",
  "Clean, Testable Code",
];

const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.12 } }, exit: {} };
const gentle = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const fromTop = {
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.25 } },
};

const characterVariants = {
  hidden: { y: 160, opacity: 0, scale: 0.8 },
  big: { y: 0, opacity: 1, scale: 1.3, transition: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] as const } },
  settled: { y: 0, opacity: 1, scale: 0.92, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

export function IntroExperience({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<Stage>("gate");
  const [phase, setPhase] = useState(0);
  const [muted, setMuted] = useState(false);
  const [reduced, setReduced] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const engine = useRef<TrailerAudioEngine | null>(null);
  const { speak, stop: stopSpeech, setMuted: setSpeechMuted } = useSpeech();

  if (!engine.current) engine.current = new TrailerAudioEngine();

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    engine.current?.stopAll();
    stopSpeech();
    setStage("exiting");
    setTimeout(() => {
      try {
        sessionStorage.setItem("intro-played", "1");
      } catch {}
      setStage("done");
      window.scrollTo(0, 0);
      onComplete();
    }, 700);
  }, [onComplete, stopSpeech]);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem("intro-played") === "1";
    } catch {}
    if (prefersReduced) setReduced(true);
    if (prefersReduced || alreadyPlayed) {
      window.scrollTo(0, 0);
      setStage("done");
      onComplete();
    }
  }, [onComplete]);

  function triggerFlash(color: string) {
    const el = flashRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.set(el, { backgroundColor: color, opacity: 0.85 });
    gsap.to(el, { opacity: 0, duration: 0.35, ease: "power2.out" });
  }

  function shake() {
    const el = stageRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { x: 0 },
      { x: 7, duration: 0.055, yoyo: true, repeat: 5, ease: "power1.inOut", onComplete: () => gsap.set(el, { x: 0 }) }
    );
  }

  const triggerPhase = useCallback(
    (i: number) => {
      const p = PHASES[i];
      speak(p.spoken);
      const eng = engine.current;
      if (!eng) return;
      switch (p.id) {
        case "hook":
          eng.startHum();
          break;
        case "identity":
          eng.stab(0);
          eng.stab(0.18);
          eng.stab(0.34);
          triggerFlash("#E3A63D");
          shake();
          break;
        case "soft":
          eng.softPad();
          break;
        case "credits":
          eng.stopPad(0.4);
          eng.startCreditsPulse(p.duration);
          break;
        case "reveal":
          eng.bigHit();
          triggerFlash("#f4f5f7");
          shake();
          break;
        case "cta":
          eng.stopCreditsPulse();
          eng.resolveChord();
          break;
      }
    },
    [speak]
  );

  useEffect(() => {
    if (stage !== "playing") return;
    let cumulative = 0;
    PHASES.forEach((p, i) => {
      timers.current.push(
        setTimeout(() => {
          setPhase(i);
          triggerPhase(i);
        }, cumulative)
      );
      cumulative += p.duration;
    });
    timers.current.push(setTimeout(finish, cumulative));
    return () => timers.current.forEach(clearTimeout);
  }, [stage, finish, triggerPhase]);

  useEffect(() => {
    if (stage !== "playing") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, finish]);

  function enter() {
    engine.current?.init();
    setStage("playing");
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    engine.current?.setMuted(next);
    setSpeechMuted(next);
  }

  if (stage === "done") return null;

  const current = PHASES[phase];
  const progressPct = (PHASES.slice(0, phase).reduce((s, p) => s + p.duration, 0) / TOTAL_MS) * 100;
  const nextProgressPct = (PHASES.slice(0, phase + 1).reduce((s, p) => s + p.duration, 0) / TOTAL_MS) * 100;
  const showAmbience = stage === "playing" && phase >= 1;
  const characterState = phase === 1 ? "big" : "hidden";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-canvas" role="dialog" aria-label="Intro">
      <div ref={flashRef} className="pointer-events-none absolute inset-0 z-30 opacity-0" />

      <motion.div
        animate={{ opacity: showAmbience ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-blueprint bg-grid [background-size:36px_36px]"
      />
      <motion.div
        animate={{ opacity: showAmbience ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-grain"
      />
      <motion.div animate={{ opacity: showAmbience ? 1 : 0 }} transition={{ duration: 1.2 }} className="scanlines" />

      <AnimatePresence>
        {stage === "gate" && (
          <motion.button
            key="gate"
            onClick={enter}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint"
            >
              {profile.name} · Portfolio
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-hairline-solid text-ink transition-colors duration-300 group-hover:border-signal group-hover:text-signal"
            >
              <Play className="h-6 w-6 translate-x-0.5" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display text-sm uppercase tracking-[0.2em] text-ink-muted"
            >
              Click to enter — with sound
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {(stage === "playing" || stage === "exiting") && (
        <motion.div
          ref={stageRef}
          animate={stage === "exiting" ? { opacity: 0, scale: 1.04, filter: "blur(10px)" } : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-full w-full flex-col items-center justify-center px-6"
        >
          {/* ambient aura behind the character — off during the pitch-black hook */}
          {showAmbience && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-signal/25 blur-[90px]"
              />
              <motion.div
                animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute inset-8 rounded-full bg-mint/20 blur-[90px]"
              />
            </div>
          )}

          {/* text layer — sits behind the character */}
          <div className="relative z-0 flex max-w-4xl flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={staggerParent}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex flex-col items-center"
              >
                {current.id === "hook" && (
                  <BrutalLine
                    as="h2"
                    className="max-w-3xl px-2 text-3xl leading-[1.1] text-ink sm:text-5xl md:text-6xl"
                  >
                    TO EVERY TECH RECRUITER, HIRING MANAGER &amp; ENGINEERING LEAD SEEING THIS RIGHT NOW
                  </BrutalLine>
                )}

                {current.id === "identity" && (
                  <motion.div variants={fromTop} className="flex flex-col items-center">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-signal text-white">
                      Identity
                    </p>
                    <GlitchText
                      text={`${profile.name.toUpperCase()}`}
                      burst
                      className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
                    />
                  </motion.div>
                )}

                {current.id === "soft" && (
                  <motion.p
                    variants={gentle}
                    className="max-w-lg text-balance font-body text-base leading-relaxed text-ink-muted md:text-xl"
                  >
                    {current.spoken}
                  </motion.p>
                )}

                {current.id === "credits" && (
                  <motion.div variants={fromTop} className="flex w-full flex-col items-center">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-ink-faint">
                      Core Capabilities
                    </p>
                    <div className="credits-mask h-56 w-full max-w-md overflow-hidden md:h-64">
                      <motion.ul
                        initial={{ y: 0 }}
                        animate={{ y: "-50%" }}
                        transition={{ duration: (PHASES[3].duration / 1000) * 0.92, ease: "linear" }}
                        className="flex flex-col gap-5"
                      >
                        {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
                          <li
                            key={i}
                            className="text-center font-mono text-lg uppercase tracking-wide text-ink md:text-2xl"
                          >
                            {c}
                          </li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}

                {current.id === "reveal" && (
                  <motion.div variants={fromTop} className="flex flex-col items-center">
                    <GlitchText
                      text="YOUR SEARCH"
                      burst
                      className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
                    />
                    <GlitchText
                      text="ENDS HERE."
                      burst
                      className="text-5xl font-bold leading-[0.95] tracking-tight text-ink-faint sm:text-7xl md:text-8xl"
                    />
                  </motion.div>
                )}

                {current.id === "cta" && (
                  <motion.div variants={gentle} className="flex flex-col items-center">
                    <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-5xl md:text-6xl">
                      LET&apos;S BUILD SOMETHING
                      <br />
                      <span className="text-signal">GREAT TOGETHER.</span>
                    </h2>
                    <button
                      onClick={finish}
                      className="mt-9 rounded-md border border-signal bg-signal/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-signal transition-colors hover:bg-signal hover:text-canvas"
                    >
                      Enter Portfolio →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* character — esports-style huge center reveal, then settles for the rest of the sequence */}
          <motion.div
            variants={characterVariants}
            initial="hidden"
            animate={characterState}
            className="pointer-events-none absolute bottom-0 z-10 opacity-0"
            style={{
              backgroundImage: "url(/images/character.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom center",
              width: "min(88vw, 560px)",
              height: "56vh",
            }}
            aria-hidden
          />

          {showAmbience && <div className="vignette" />}
        </motion.div>
      )}

      {stage === "playing" && !reduced && (
        <>
          <button
            onClick={finish}
            className="absolute right-6 top-6 z-40 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint transition-colors hover:text-ink md:right-10 md:top-8"
          >
            Skip ⎋
          </button>

          <button
            onClick={toggleMute}
            className="absolute left-6 top-6 z-40 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint transition-colors hover:text-ink md:left-10 md:top-8"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <div className="absolute inset-x-0 bottom-0 z-40 h-[2px] bg-hairline-solid">
            <div
              className="h-full bg-signal transition-[width] ease-linear"
              style={{ width: `${nextProgressPct}%`, transitionDuration: `${current.duration}ms` }}
            />
          </div>
          <div className="absolute bottom-3 left-6 z-40 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:left-10">
            {String(phase + 1).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")} — {Math.round(progressPct)}%
          </div>
        </>
      )}
    </div>
  );
}
