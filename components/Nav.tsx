"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-hairline bg-canvas/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="/#top" className="font-mono text-sm tracking-tight text-ink">
          {profile.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
          <span className="text-signal">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://drive.google.com/file/d/1v-2dwsItHLCQS3NwoT5mVA8_2kEDp78a/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline-solid px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal"
        >
          Resume
        </a>
      </div>
    </motion.header>
  );
}
