import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { WritingExplorer } from "@/components/WritingExplorer";

export const metadata: Metadata = {
  title: "Writing — Yash Dhawane",
  description: "Notes on systems design, backend engineering, and building production software.",
};

export default function WritingPage() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <WritingExplorer />
    </main>
  );
}
