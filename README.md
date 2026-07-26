# Devfolio

A premium, dark, developer-branded portfolio built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/` — one component per section (`Hero`, `About`, `TechStack`, `Projects`, `Experience`, `Blog`, `Github`, `Chatbot`, `Contact`), plus `Nav`, `Magnetic`, `SectionLabel`, and `ui/` primitives
- `lib/data.ts` — all placeholder content (profile, tech stack, projects, experience, blog posts). Replace with real data or wire `Blog.tsx` up to the Hashnode Public API.
- `lib/utils.ts` — `cn()` class-merging helper

## Design system

- **Canvas** `#0A0B0E` near-black graphite with a faint blueprint grid + grain texture
- **Palette** — inspired by *Dark* (Netflix): amber/lamp-yellow `#E3A63D` as the primary signal accent (CTAs, active states, glitch base), rust `#C97A3D` and cold fog-teal `#4FA3AE` as secondary accents. No purple, no red — all recolored from the previous version via `tailwind.config.ts`.
- **Type**: Space Grotesk (display) + Inter (body) + JetBrains Mono (labels, code, terminal UI)
- Signature elements: an interactive "wired system" diagram (ambient in the hero, literal in the Tech Ecosystem section), and a floating sticker field around the hero headline (`components/StickerField.tsx`) — your uploaded dev-tool stickers, background-keyed to transparent, gently bobbing like decals in zero-g.

## Intro trailer

`components/IntroExperience.tsx` is a click-to-enter cinematic sequence, ~18s, that plays before the portfolio — gated behind a "click to enter" screen (needed so the browser allows audio to play; nothing with sound can autoplay without a gesture). The character portrait now only appears during the "identity" phase (the big esports-style reveal) and is gone again for the rest of the sequence.

**6 phases, each syncing text + a score beat + narration:**
1. **Hook** — pitch black, silence, a deep hum builds under a brutalist slab-reveal line addressed to recruiters/hiring managers.
2. **Identity** — esports-style hard cut: your name in giant glitch type, character portrait slams in huge and centered, three quick noise "stabs" + a screen flash + a camera-shake land on the beat.
3. **Soft** — deliberately calm: a warm synth pad fades in, text eases in gently instead of glitching, matching "soft and relax" so the message actually lands.
4. **Credits** — a vertical auto-scrolling capability list (REST/GraphQL, distributed systems, cloud infra, etc.) like end credits, with a plucked rhythmic run underneath.
5. **Reveal** — "YOUR SEARCH ENDS HERE" in huge glitch type, one big low-end impact hit + flash + shake.
6. **CTA** — score resolves to a warm closing chord, "Let's build something great together," Enter Portfolio button.

**Audio — fully generated, not sourced:**
- `lib/audioEngine.ts` is a small Web Audio API synth (oscillators + filtered noise) that produces the hum, glitch stabs, pad, credits pulse, impact hit, and closing chord live in the browser. Nothing is a recording, so there's nothing to license — and because it's triggered from the exact same phase timer that drives the text, the beats land in sync with what's on screen.
- `lib/useSpeech.ts` narrates each phase's line with the browser's native `speechSynthesis` (Web Speech API) — a real (if browser-dependent) voice reading the trailer copy, again with no external API/keys/licensing involved. Voice quality varies by device/browser; it's a nice-to-have layer, not broadcast-grade VO.
- We deliberately did **not** extract the audio from your reference reel — that's commercial/trending audio, and pulling a track from a video to reuse elsewhere isn't something licensing generally allows, regardless of how it's repurposed. See `public/audio/README.txt` if you want to layer a properly licensed track in on top later.

**Typography:** `components/BrutalLine.tsx` is the brutalist treatment (oversized bold type, hard offset shadow, sharp clip-path slam-in — no blur/soft-fade) used for the recruiter hook line; `components/GlitchText.tsx` (RGB-split glitch) is used for the name and the "your search ends here" beats.

Skip button (top right) + `Esc`, mute toggle (top left, mutes both the score and narration), a progress bar tied to real phase durations, `prefers-reduced-motion` support, and a once-per-session play (`sessionStorage`) so repeat visits aren't forced through it again. On completion it scrolls to top and hands off directly into the Nav + Hero.

## Projects & Writing pages

- `components/Projects.tsx` shows the first 3 projects on the homepage with a **View More Projects** button that expands the rest in place (it only appears if `lib/data.ts` has more than 3 — add project #6+ and it shows up automatically). Each card's left visual area shows `project.image` if you set one; otherwise it falls back to the accent-colored gradient + project number, so you can add real screenshots incrementally without touching any component code.
- `app/writing/page.tsx` is a full article index at `/writing` with a left-hand tag filter sidebar (multi-select, OR-matched against each post's `tags` array in `lib/data.ts`) and a live result count. The homepage's "All posts →" link now points here instead of an external URL.

## Notes

- `components/Blog.tsx` is shaped to match the Hashnode Public API response — swap the `blogPosts` array in `lib/data.ts` for a live GraphQL fetch.
- `components/Github.tsx` uses deterministic placeholder contribution data; swap in a GitHub GraphQL `contributionsCollection` query for live data.
- Respects `prefers-reduced-motion`.
