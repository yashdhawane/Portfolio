"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const slam = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.83, 0, 0.17, 1] as const },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function BrutalLine({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag variants={slam} className={cn("brutal-text", className)}>
      {children}
    </MotionTag>
  );
}
