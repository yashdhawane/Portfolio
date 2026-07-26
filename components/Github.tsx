"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

// Deterministic pseudo-random contribution data so the heatmap looks real
// without relying on a live API call at build/render time. Replace with a
// GitHub GraphQL `contributionsCollection` fetch when wiring up the API.
function generateContributions(weeks: number) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => Math.floor(rand() * 5))
  );
}

const LEVEL_COLOR = ["#171512", "#3A2C16", "#6B4B1E", "#A87828", "#E3A63D"];

const DEFAULT_STATS = [
  { label: "Public repos", value: "63" },
  { label: "Contributions (past year)", value: "1,842" },
  { label: "Longest streak", value: "47 days" },
  { label: "Top language", value: "TypeScript" },
];

type GitHubData = {
  stats: {
    publicRepos: string;
    totalContributions: string;
    longestStreak: string;
    topLanguage: string;
  };
  contributions: number[][];
};

export function Github() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const fallbackWeeks = useMemo(() => generateContributions(44), []);
  const [hovered, setHovered] = useState<{ w: number; d: number } | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setGithubData(data);
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub data:", err))
      .finally(() => setLoading(false));
  }, []);

  const weeks = githubData?.contributions || fallbackWeeks;
  const stats = githubData
    ? [
        { label: "Public repos", value: githubData.stats.publicRepos },
        { label: "Contributions (past year)", value: githubData.stats.totalContributions },
        { label: "Longest streak", value: githubData.stats.longestStreak },
        { label: "Top language", value: githubData.stats.topLanguage },
      ]
    : DEFAULT_STATS;

  return (
    <section id="github" className="border-b border-hairline px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="06" label="Activity" />
        <h2 className="mb-14 max-w-xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
          Committed, literally.
        </h2>

        <div className="grid gap-10 md:grid-cols-[1fr_260px]">
          <div className="overflow-x-auto rounded-xl border border-hairline p-6">
            {loading ? (
              <div className="flex h-48 items-center justify-center text-ink-faint">
                Loading GitHub stats...
              </div>
            ) : (
              <>
                <div className="flex gap-1">
                  {weeks.map((week, w) => (
                    <div key={w} className="flex flex-col gap-1">
                      {week.map((level, d) => (
                        <motion.div
                          key={d}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (w * 7 + d) * 0.003 }}
                          onMouseEnter={() => setHovered({ w, d })}
                          onMouseLeave={() => setHovered(null)}
                          className="h-3 w-3 rounded-[3px] transition-transform hover:scale-125"
                          style={{ backgroundColor: LEVEL_COLOR[level] }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-ink-faint">
                  <span>{hovered ? `week ${hovered.w + 1} · ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][hovered.d]}` : `${weeks.length} weeks of commits`}</span>
                  <span className="flex items-center gap-1">
                    less
                    {LEVEL_COLOR.map((c) => (
                      <span key={c} className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: c }} />
                    ))}
                    more
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-hairline p-5">
                <p className="mb-1 font-display text-2xl font-medium text-ink">{s.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
