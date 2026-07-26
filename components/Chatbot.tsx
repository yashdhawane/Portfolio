"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { profile } from "@/lib/data";

type Message = { role: "bot" | "user"; text: string };

const CANNED: Record<string, string> = {
  default:
    "I'm a lightweight assistant trained on this portfolio — ask me about stack, availability, or experience.",
  stack: "React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, AWS, and a growing AI-tooling practice.",
  availability: `Currently ${profile.location.includes("Remote") ? "open" : "selectively open"} to new engagements — best reached at ${profile.email}.`,
  experience: "About eight years across fintech, developer tooling, and early-stage startups.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("stack") || q.includes("tech")) return CANNED.stack;
  if (q.includes("avail") || q.includes("hire") || q.includes("contact")) return CANNED.availability;
  if (q.includes("experience") || q.includes("year")) return CANNED.experience;
  return CANNED.default;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hey — I'm ${profile.name}'s portfolio assistant. Ask about stack, availability, or experience.` },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const userMsg: Message = { role: "user", text: value };
    const botMsg: Message = { role: "bot", text: reply(value) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setValue("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-xl border border-hairline-solid bg-[#0d0e13] shadow-2xl sm:w-[360px]"
          >
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  portfolio-bot
                </span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-ink-faint hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-signal text-canvas"
                      : "border border-hairline-solid bg-surface text-ink-muted"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-hairline p-3">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask about stack, availability…"
                className="flex-1 rounded-md border border-hairline-solid bg-canvas px-3 py-2 font-body text-sm text-ink outline-none focus:border-signal"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-signal text-canvas hover:bg-signal-soft"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-canvas shadow-[0_10px_40px_-10px_#E3A63D88]"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
