import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import grainImage from "@/assets/images/grain.jpg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { getAllPosts } from "@/lib/api";
import { getStrapiMedia } from "@/lib/api";
import React from "react";

const portfolioProjects = [
  {
    company: "Acme Corp",
    year: "2022",
    title: "Dark Saas Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/4k7IdSLxh6w",
    image: darkSaasLandingPage,
  },
  {
    company: "Innovative Co",
    year: "2021",
    title: "Light Saas Landing Page",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://youtu.be/7hi5zwO75yc",
    image: lightSaasLandingPage,
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/Z7I5uSRHMHg",
    image: aiStartupLandingPage,
  },
];

export default async function ProjectsSection ()  {
  const projects = await getAllPosts();
  return(
    <section className="pb-16 lg:py-24" id="projects">
      <div className="container">
        <SectionHeader eyebrow="Featured Projects" title="Real-world Results" description="See how I transformed concepts into engaging digital experiences."/>
        
        <div className="flex flex-col mt-10 md:mt-20 gap-20">
        {/* {portfolioProjects.map((project, projectIndex) => (
            <div
              key={project.title}
              className="bg-gray-800 rounded-3xl z-0 after:z-10 overflow-hidden after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 after:pointer-events-none sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}
            >
               <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                  backgroundImage: `url(${grainImage.src})`,
                }}
              ></div>
               <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm bg-clip-text text-transparent">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-5">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.length > 0 ? (
                      project.results.map((result) => (
                        <li
                          key={result.title}
                          className="flex gap-2 text-sm md:text-base text-white/50 items-center max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="overflow-hidden text-ellipsis">
                            {result.title}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-white/50 text-sm md:text-base">
                        Project not yet completed
                      </li>
                    )}
                  </ul>
                  <a href={project.link} target="_blank">
                    <button className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 md:w-auto px-6">
                      Visit Live Site
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
          </div>
          </div>  
          ))
          } */}

{projects.map((project: any, projectIndex: number) => {
  const { id, Title, Company, Year, photo, projectlist } = project;
  const imageUrl = photo?.formats?.medium?.url || photo?.url; // Get medium image if available
  const pic = getStrapiMedia(imageUrl) as string; // Ensure absolute URL

  return (
    <div
      key={id}
      className="bg-gray-800 rounded-3xl z-0 after:z-10 overflow-hidden after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 after:pointer-events-none sticky"
      style={{
        top: `calc(64px + ${projectIndex * 40}px)`,
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="lg:pb-16">
          <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm bg-clip-text text-transparent">
            <span>{Company}</span>
            <span>&bull;</span>
            <span>{Year}</span>
          </div>

          <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-5">
            {Title}
          </h3>
          <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

          {/* Project Points */}
          <ul className="flex flex-col gap-4 mt-4 md:mt-5">
          {projectlist?.length > 0 ? (
  projectlist.map((item: any, index: number) => (
    <React.Fragment key={index}>
      {item.point1 && (
        <li className="flex gap-2 text-sm md:text-base text-white/50 items-center">
          <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
          <span>{item.point1}</span>
        </li>
      )}
      {item.point2 && (
        <li className="flex gap-2 text-sm md:text-base text-white/50 items-center">
          <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
          <span>{item.point2}</span>
        </li>
      )}
      {item.point3 && (
        <li className="flex gap-2 text-sm md:text-base text-white/50 items-center">
          <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
          <span>{item.point3}</span>
        </li>
      )}
    </React.Fragment>
  ))
) : (
              <li className="text-white/50 text-sm md:text-base">
                Project details not available
              </li>
            )}
          </ul>

          <a href="#" target="_blank">
            <button className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 md:w-auto px-6">
              Visit Live Site
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </a>
        </div>

        {/* Project Image */}
        <div className="relative">
          {pic && (
            <Image
              src={pic}
              alt={Title}
              width={600}
              height={400}
              className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
            />
          )}
        </div>
      </div>
    </div>
  );
})}


          
          </div>
</div>
</section>
  )
};
