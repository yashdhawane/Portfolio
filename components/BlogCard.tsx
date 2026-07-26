"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface/40 transition-colors hover:border-hairline-solid"
    >
      <div
        className="relative flex h-40 items-end overflow-hidden p-5"
        style={{ backgroundImage: `linear-gradient(135deg, ${post.coverColor}26, #0A0B0E)` }}
      >
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30 [background-size:24px_24px]" />
        <span
          className="relative rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
          style={{ borderColor: `${post.coverColor}55`, color: post.coverColor }}
        >
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <h3 className="mb-4 font-display text-lg font-medium leading-snug text-ink group-hover:text-signal-soft">
          {post.title}
        </h3>

        <div className="flex items-center justify-between border-t border-hairline pt-4">
          <span className="font-mono text-[11px] text-ink-faint">
            {post.date} · {post.readTime}
          </span>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
        </div>
      </div>
    </motion.a>
  );
}
