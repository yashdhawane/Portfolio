"use client";

import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import { BlogCard } from "./BlogCard";
import { blogPosts } from "@/lib/data";

// NOTE: `blogPosts` is placeholder data shaped to match what the Hashnode
// Public API (`/posts` via GraphQL) returns — swap `lib/data.ts` for a
// fetch against Hashnode and this component needs no changes.

const PREVIEW_COUNT = 3;

export function Blog() {
  return (
    <section id="writing" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel index="05" label="Writing" />
            <h2 className="max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Notes from the terminal.
            </h2>
          </div>
          <Link
            href="/writing"
            className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-signal"
          >
            All posts →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, PREVIEW_COUNT).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
