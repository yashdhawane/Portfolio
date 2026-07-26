"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Sticker = {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
  hideOnMobile?: boolean;
};

// Positions are percentages of the Hero section, loosely ringing the
// headline/tagline block without covering the CTA row or the character.
const STICKERS: Sticker[] = [
  { src: "/images/stickers/react.png", alt: "React", top: "13%", left: "85%", size: 100, rotate: -8, duration: 6.4, delay: 0.15 },
  { src: "/images/stickers/kubernetes.png", alt: "Kubernetes", top: "10%", left: "9%", size: 85, rotate: 9, duration: 5.6, delay: 0.4 },
  { src: "/images/stickers/vscode.png", alt: "VS Code", top: "47%", left: "91%", size: 78, rotate: -6, duration: 7.1, delay: 0.25, hideOnMobile: true },
  { src: "/images/stickers/mongodb.png", alt: "MongoDB", top: "5%", left: "37%", size: 97, rotate: 5, duration: 6.0, delay: 0.6, hideOnMobile: true },
  { src: "/images/stickers/aws.png", alt: "AWS", top: "7%", left: "63%", size: 88, rotate: -5, duration: 5.8, delay: 0.35, hideOnMobile: true },
  { src: "/images/stickers/nextjs-meme.png", alt: "Next.js", top: "41%", left: "4%", size: 102, rotate: 7, duration: 6.9, delay: 0.5, hideOnMobile: true },
  { src: "/images/stickers/nestjs.png", alt: "NestJS", top: "64%", left: "12%", size: 95, rotate: -9, duration: 6.2, delay: 0.7, hideOnMobile: true },
  { src: "/images/stickers/generic.png", alt: "Developer tooling", top: "64%", left: "80%", size: 90, rotate: 7, duration: 5.7, delay: 0.8, hideOnMobile: true },
];

/**
 * `active` gates the entrance + float loop the same way Hero's other
 * elements are gated by `introDone` — stickers only start drifting once
 * the intro trailer has handed off to the page.
 */
export function StickerField({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {STICKERS.map((s, i) => (
        <motion.div
          key={s.alt + i}
          className={cn("absolute", s.hideOnMobile && "hidden sm:block")}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          initial={{ opacity: 0, scale: 0.4, y: 26, rotate: s.rotate - 12 }}
          animate={
            active
              ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -14, 0],
                  rotate: [s.rotate - 4, s.rotate + 4, s.rotate - 4],
                }
              : { opacity: 0, scale: 0.4, y: 26 }
          }
          transition={
            active
              ? {
                  opacity: { duration: 0.7, delay: s.delay },
                  scale: { duration: 0.7, delay: s.delay, ease: [0.34, 1.56, 0.64, 1] },
                  y: { duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay + 0.7 },
                  rotate: { duration: s.duration * 1.15, repeat: Infinity, ease: "easeInOut", delay: s.delay + 0.7 },
                }
              : { duration: 0.3 }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.alt}
            draggable={false}
            className="h-full w-full select-none object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
