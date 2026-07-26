"use client";

import { useEffect, useState } from "react";
import { IntroExperience } from "./IntroExperience";
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
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    document.body.style.overflow = introActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introActive]);

  return (
    <>
      {introActive && <IntroExperience onComplete={() => setIntroActive(false)} />}
      <main id="top" className="relative">
        <Nav />
        <Hero introDone={!introActive} />
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
