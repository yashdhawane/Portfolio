"use client";

import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { TechStack } from "./TechStack";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Blog } from "./Blog";
import { Github } from "./Github";
import { Contact } from "./Contact";
import { Chatbot } from "./Chatbot";

export function PortfolioShell() {
  return (
    <>
      <main id="top" className="relative">
        <Nav />
        <Hero introDone={true} />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Blog />
        <Github />
        <Contact />
        <Chatbot />
      </main>
    </>
  );
}
