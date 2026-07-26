"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { blogPosts } from "@/lib/data";

export function WritingExplorer() {
  const [selected, setSelected] = useState<string[]>([]);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    if (selected.length === 0) return blogPosts;
    return blogPosts.filter((post) => post.tags.some((t) => selected.includes(t)));
  }, [selected]);

  function toggleTag(tag: string) {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:px-12">
      <div className="mb-14 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
        <span className="text-signal">Writing</span>
        <span className="h-px w-8 bg-hairline-solid" />
        <span>{blogPosts.length} articles</span>
      </div>

      <h1 className="mb-4 max-w-2xl font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
        Notes from the terminal.
      </h1>
      <p className="mb-14 max-w-xl font-body text-ink-muted">
        Everything I've written on systems design, backend engineering, and the occasional career reflection.
      </p>

      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-12">
        {/* filter sidebar */}
        <aside className="md:sticky md:top-28 md:h-fit">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Filter by tag</p>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-signal hover:text-signal-soft"
              >
                Clear <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 md:flex-col md:flex-nowrap md:gap-1.5">
            {tagCounts.map(([tag, count]) => {
              const active = selected.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center justify-between gap-3 rounded-full border px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-wider transition-colors md:rounded-md ${
                    active
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-hairline-solid text-ink-muted hover:border-ink-faint hover:text-ink"
                  }`}
                >
                  <span>{tag}</span>
                  <span className="text-ink-faint">{count}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* results */}
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {selected.length > 0 ? ` — filtered by ${selected.join(", ")}` : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-hairline p-12 text-center">
              <p className="font-body text-ink-muted">No posts match those tags yet.</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
