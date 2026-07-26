"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { profile } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const HELP = [
  "available commands:",
  "  whoami         — who you're talking to",
  "  contact --email  — get my email",
  "  socials        — list social links",
  "  clear          — clear the terminal",
];

export function Contact() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `${profile.name.toLowerCase().replace(" ", "-")}@portfolio:~$ type 'help' to get started` },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [lines]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ type: "input", text: raw }];

    if (!cmd) return setLines((l) => [...l, ...out]);

    if (cmd === "help") out.push({ type: "output", text: HELP.join("\n") });
    else if (cmd === "whoami")
      out.push({ type: "output", text: `${profile.name} — ${profile.role}, ${profile.location}` });
    else if (cmd === "contact --email" || cmd === "email")
      out.push({ type: "output", text: profile.email });
    else if (cmd === "socials")
      out.push({
        type: "output",
        text: `github    ${profile.socials.github}\nlinkedin  ${profile.socials.linkedin}\ntwitter   ${profile.socials.twitter}`,
      });
    else if (cmd === "clear") {
      setLines([]);
      return;
    } else out.push({ type: "output", text: `command not found: ${raw} — try 'help'` });

    setLines((l) => [...l, ...out]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    runCommand(value);
    setValue("");
  }

  return (
    <section id="contact" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionLabel index="07" label="Contact" />
        <h2 className="mb-4 max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
          Let's build something that stays up.
        </h2>
        <p className="mb-12 max-w-lg font-body text-ink-muted">
          Skip the contact form. Talk to the terminal, or reach out directly.
        </p>

        <div className="overflow-hidden rounded-xl border border-hairline-solid bg-[#0d0e13] shadow-[0_0_0_1px_#00000080,0_30px_80px_-30px_#E3A63D22]">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-ink-faint">contact.sh</span>
          </div>

          <div className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm">
            {lines.map((l, i) => (
              <div key={i} className="mb-1 whitespace-pre-wrap">
                {l.type === "input" ? (
                  <span className="text-signal">
                    ${" "}
                    <span className="text-ink">{l.text}</span>
                  </span>
                ) : (
                  <span className="text-ink-muted">{l.text}</span>
                )}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-signal">$</span>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="type a command…"
                className="flex-1 border-0 bg-transparent text-ink outline-none ring-0 placeholder:text-ink-faint focus:border-0 focus:outline-none focus:ring-0 [caret-color:#E3A63D]"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="h-4 w-2 animate-pulse bg-signal" />
            </form>
            <div ref={endRef} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 font-mono text-sm text-ink-muted hover:text-signal"
          >
            {profile.email} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <div className="flex items-center gap-4">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-ink-faint hover:text-ink">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-ink-faint hover:text-ink">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="text-ink-faint hover:text-ink">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
