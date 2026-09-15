export const profile = {
  name: "Yash Dhawane",
  role: "Full Stack Engineer",
  location: "Mumbai, India · Remote",
  tagline: "Building scalable web applications and digital products.",
  bio: `I'm a Full Stack Engineer (Backend Focus) with 2+ years of experience building APIs, microservices, and AI-powered applications,who spends most of my time in the space between
  product and infrastructure — shipping interfaces people actually enjoy using,
  backed by systems that don't fall over at 3am.`,
  focus:
    "Building production-ready AI platforms while learning distributed systems, platform engineering, and agentic development using structured context, reusable skills, and Harness workflows.",
  philosophy:
    "Every engineering decision is a trade-off. I prefer solutions that prioritize simplicity, reliability, and long-term maintainability while remaining flexible enough to evolve with changing requirements.",
  email: "yashdhawane17@gmail.com",
  socials: {
    github: "https://github.com/yashdhawane",
    linkedin: "https://linkedin.com/in/yashdhawane",
    twitter: "https://x.com/dev_X_100",
  },
};

export type TechNode = {
  id: string;
  name: string;
  category: "frontend" | "backend" | "data" | "infra" | "ai";
  detail: string;
  years: string;
};

export const techStack: TechNode[] = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    detail: "Component architecture, RSC, performance profiling, and state modeling for large surfaces.",
    years: "2 yrs",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    detail: "App Router, streaming SSR, edge middleware, and incremental static regeneration at scale.",
    years: "3 yrs",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    detail: "Strict-mode codebases, discriminated unions, and type-safe API contracts end to end.",
    years: "3 yrs",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    detail: "Service architecture, MVC, queue-based workers, and API design for systems under real load.",
    years: "3 yrs",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data",
    detail: "Schema design, query planning, partitioning, and replication for multi-tenant systems.",
    years: "3 yrs",
  },
  {
    id: "docker",
    name: "Docker",
    category: "infra",
    detail: "Multi-stage builds, container orchestration, and reproducible dev-to-prod environments.",
    years: "3 yrs",
  },
  {
    id: "aws",
    name: "AWS",
    category: "infra",
    detail: "ECS, Lambda, RDS, and S2 — infrastructure-as-code with Terraform and bicep.",
    years: "2 yrs",
  },
  {
    id: "ai",
    name: "AI Tooling",
    category: "ai",
    detail: "LLM orchestration, AI-Agent , RAG pipelines, and agent tool-use design for production workflows.",
    years: "2 yrs",
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  metric?: string;
  github: string;
  demo?: string;
  accent: string;
  /** Optional real screenshot/cover for the visual area. When omitted, the
   *  card falls back to the abstract schematic + project number treatment. */
  image?: string;
};

export const projects: Project[] = [
  {
    id: "ai-data-agent",
    title: "AI Data Agent",
    tagline: "AI-Powered Business Intelligence & Data Analysis",
    description:
      "AI Data Agent is an AI-powered data intelligence platform that understands your company's data, investigates complex business questions, discovers insights, and turns analysis into decision-ready intelligence",
    stack: ["Next.js", "AI/ML", "TypeScript", "API Integration"],
    year: "2026",
    image:"/images/projects/ai-data-agent.png",
    metric: "Data Intelligence",
    github: "https://github.com/yashdhawane/AI-Data-Agent",
    demo: "https://ai-data-agent-web.vercel.app/",
    accent: "#7C3AED",
  },
  {
    id: "Zcrum",
    title: "Zcrum - Project anagement tool",
    tagline: "A JIRA-inspired project management platform for Agile teams.",
    description:
      "JIRA-inspired project management platform built to manage projects, sprints, and workflows through Kanban boards, secure authentication, and PostgreSQL-backed data persistence. Focused on scalable architecture, clean UI, and developer experience.",
    stack: ["Next.js", "PostgreSQL", "Node.js", "AWS", "Clerk"],
    year: "2024",
    metric: "Multi-tenant Workspaces",
    image:"/images/projects/zcrum.png",
    github: "https://github.com/yashdhawane/zcrum-jira",
    demo: "https://zcrum-jira.vercel.app/",
    accent: "#E3A63D",
  },
  {
    id: "bookmyscreen",
    title: "BookMyScreen",
    tagline: "Movie Booking Platform like BookMyShow",
    description:
      "Built a scalable movie booking platform with a real-time 2-phase locking mechanism, distributed seat locks, and ACID transactions to prevent double bookings in high-concurrency systems.",
    stack: ["React.js", "Nodejs", "Docker", "Redis", "MongoDB","Socket.IO"],
    year: "2026",
    metric: "handle concurrency",
    image:"/images/projects/bookmyscreen.png",
    github: "https://github.com/yashdhawane/Bookmyscreen",
    // demo: "https://promptdeck.yashdhawane.dev",
    accent: "#4FA3AE",
  },
  {
    id: "RAG",
    title: "Enterprise-Grade RAG Pipeline",
    tagline: "Secure Enterprise RAG System",
    description:
      "A production-ready RAG platform that enables secure, context-aware knowledge retrieval through semantic search, document ingestion, and role-based access control.",
    stack: ["LangChain", "Gemini", "FAISS", "Streamlit"],
    year: "2026",
    image:"/images/projects/RAG.png",
    metric: "Multi-format doc support",
    github: "https://github.com/yashdhawane/RAG-Pipeline",
    demo: "https://rag-pipeline-7ja3k7vj9m8zmxdjaxs5qx.streamlit.app/",
    accent: "#C97A3D",
  },
  {
    id: "Deep Research Agent",
    title: "Deep Research Agent ",
    tagline: "Multi-Agent Research system ",
    description:
      "Engineered a 4-agent research system for autonomous planning, web search, synthesis, andreport generation, featuring intelligent credibility scoring, source validation, section-level quality checks, and a 7-day caching system that cut API calls.",
    stack: ["Python", "Langraph", "Redis", "StreamLit"],
    year: "2026",
    image:"/images/projects/research_agent.png",
    metric: "33% lower P99",
    github: "https://github.com/yashdhawane/deep-research-assistant-",
    // demo: "https://routecast.yashdhawane.dev",
    accent: "#6E8A94",
  },
  {
    id: "airbnb-clone",
    title: "Airbnb Design Clone",
    tagline: "AI-assisted coding to accelerate frontend development",
    description:
      "A visually accurate Airbnb frontend clone built to explore AI-assisted frontend development. I used AI coding tools to rapidly build, iterate, and refine reusable responsive components while focusing heavily on visual fidelity, layout, spacing, typography, and overall UI consistency.",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    year: "2026",
    image:"/images/projects/airbnb-clone.png",
    metric: "Visual Fidelity",
    github: "https://github.com/yashdhawane/airbnbclone",
    demo: "https://airbnb-clone-umber-two.vercel.app/",
    accent: "#FF385C",
  },
  {
    id: "Klimate",
    title: "Klimate",
    tagline: "Weather App",
    description:
      "A Weather forecasting tool with search funationality and showing historical data and also, Dark and Light theme supported",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
    year: "2024",
    image:"/images/projects/klimate.png",
    metric: "Third party API",
    github: "https://github.com/yashdhawane/klimate-weatherApp",
    demo: "https://klimate.onrender.com/",
    accent: "#9C8B73",
  },
];

export type ExperienceItem = {
  id: string;
  type: "work" | "Internship" | "oss" | "learning";
  title: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    type: "work",
    title: "Full Stack Engineer",
    org: "StartupWind INC",
    period: "Dec 2025 — Feb 2026",
    description:
      "Built AI-Agent and Own architecture decisions across the API, Databases, and deployment layers.",
  },
  {
    id: "exp-2",
    type: "work",
    title: "Full Stack Engineer",
    org: "Jio Platform Limited",
    period: "Jan 2024 — Dec 2025",
    description:
      "Work with QA,Frontend,Backend team and Also, played a vital role in Business Ops and GIS.",
  },
  {
    id: "exp-3",
    type: "Internship",
    title: "Frontend Developer",
    org: "Thorat Tech:Digital Marketing Agency",
    period: "Jun 2019 — Aug 2019",
    description:
      "Shipped Responsive Interface web apps for Edtech and real-estate client.",
  }
];

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  coverColor: string;
  url: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "What I learned rebuilding a ledger with event sourcing",
    category: "Systems Design",
    tags: ["Systems Design", "Backend", "PostgreSQL"],
    readTime: "9 min read",
    date: "Jun 14, 2026",
    coverColor: "#E3A63D",
    url: "https://blog.yashdhawane.dev/event-sourced-ledger",
  },
  {
    id: "post-2",
    title: "Type-safe API contracts without the ceremony",
    category: "TypeScript",
    tags: ["TypeScript", "API Design", "Frontend"],
    readTime: "6 min read",
    date: "Apr 02, 2026",
    coverColor: "#C97A3D",
    url: "https://blog.yashdhawane.dev/type-safe-contracts",
  },
  {
    id: "post-3",
    title: "Agent tool-use is just distributed systems with worse logs",
    category: "AI Engineering",
    tags: ["AI Engineering", "Systems Design", "Backend"],
    readTime: "11 min read",
    date: "Feb 20, 2026",
    coverColor: "#4FA3AE",
    url: "https://blog.yashdhawane.dev/agent-tool-use",
  },
  {
    id: "post-4",
    title: "Indexing strategy for a table that outgrew its schema",
    category: "Databases",
    tags: ["Databases", "PostgreSQL", "Backend"],
    readTime: "8 min read",
    date: "Dec 11, 2025",
    coverColor: "#6E8A94",
    url: "https://blog.yashdhawane.dev/indexing-strategy",
  },
  {
    id: "post-5",
    title: "What actually breaks when you containerize a monolith",
    category: "Infrastructure",
    tags: ["Infrastructure", "Docker", "Backend"],
    readTime: "7 min read",
    date: "Oct 03, 2025",
    coverColor: "#9C8B73",
    url: "https://blog.yashdhawane.dev/containerize-a-monolith",
  },
  {
    id: "post-6",
    title: "A career-change post: eight years, three stacks, one lesson",
    category: "Career",
    tags: ["Career", "Reflection"],
    readTime: "5 min read",
    date: "Jul 19, 2025",
    coverColor: "#E3A63D",
    url: "https://blog.yashdhawane.dev/eight-years-three-stacks",
  },
];
