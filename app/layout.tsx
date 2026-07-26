import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Dhawane — Full Stack Engineer",
  description:
    "Full stack engineer building scalable web applications and digital products. React, Next.js, TypeScript, Node.js, PostgreSQL, AWS.",
  metadataBase: new URL("https://yashdhawane.dev"),
  openGraph: {
    title: "Yash Dhawane — Full Stack Engineer",
    description: "Building scalable web applications and digital products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Runs before hydration/paint so a refresh never flashes the old
            scroll position — this page always opens at the top. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history){history.scrollRestoration='manual'};window.scrollTo(0,0);}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
