export const info = {
  name: "Devansh Mahant",
  alias: "daz",
  email: "devansh21y@gmail.com",
  location: "Bangalore, India",
  github: "https://github.com/8dazo",
  linkedin: "https://linkedin.com/in/devansh-m12",
  roles: ["AI Engineer", "Full-Stack Dev", "Agent Builder", "CP Guardian"],
};

export const timeline = [
  {
    year: "2023",
    title: "Intern at Cloudbloom",
    text: "Started shipping React components and squashing 30+ defects before anyone trusted me with prod. ACM ICPC Regional Finalist the same year — sleep was optional.",
  },
  {
    year: "2024",
    title: "Promoted. Graduated. Repeated.",
    text: "B.Tech from IIIT Dharwad. Promoted to Software Developer after leading frontend delivery. Built an LMS serving 1,000+ concurrent users. Also taught DSA to 100+ students weekly at GeeksforGeeks.",
  },
  {
    year: "2025",
    title: "Senior Engineer at Stride.AI",
    text: "Now I design LLM-agent workflows end to end — orchestration, tools, product surface. 20+ features owned, API layer scaled to 10K+ requests/day, founders on speed dial.",
  },
  {
    year: "now",
    title: "Building at midnight",
    text: "Captar, Baelys, PhoneClaw, a vector DB from scratch in Elixir, a terminal browser in Go. Some people doomscroll. I ship side projects.",
  },
];

export const projects = [
  {
    index: "01",
    name: "Captar",
    tagline: "Runtime control for LLM applications",
    description:
      "A guardrail layer that wraps the OpenAI client — per-session budget reservations, tool allowlists, execution policy. No proxy, keys never leave the host app. Span-first tracing with violation capture and eval-ready dataset export.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "OpenAI API"],
    link: "https://captar.aurat.ai",
    accent: true,
  },
  {
    index: "02",
    name: "Baelys",
    tagline: "Multi-model AI image editor",
    description:
      "20+ LoRA style-transfer models, AI background removal, and a canvas-based multi-layer editor. Launched on Product Hunt, monetized with tiered subscriptions, and publicly praised by Vercel's CEO.",
    tags: ["Next.js", "Node.js", "LoRA", "Canvas"],
    link: "https://baelys.aurat.ai",
    accent: false,
  },
  {
    index: "03",
    name: "PhoneClaw",
    tagline: "Phone automation, fully local",
    description:
      "End-to-end Android automation inspired by OpenClaw — an agent that drives your phone, running entirely on-device. No cloud, no leaks, just a phone doing what you tell it.",
    tags: ["TypeScript", "Android", "Agents"],
    link: "https://github.com/8dazo/phoneclaw",
    accent: false,
  },
  {
    index: "04",
    name: "elix-db",
    tagline: "A vector database from scratch",
    description:
      "Custom vector DB built in Elixir to explore indexing architectures — HNSW, IVFFlat — from first principles. Because the best way to understand a database is to build one.",
    tags: ["Elixir", "HNSW", "IVFFlat"],
    link: "https://github.com/8dazo/elix-db",
    accent: false,
  },
  {
    index: "05",
    name: "Drowser",
    tagline: "A browser that lives in your terminal",
    description:
      "Terminal-based browser engineered in Go, driving Brave in headless mode. The web, rendered where developers actually live.",
    tags: ["Go", "Headless", "CLI"],
    link: "https://github.com/8dazo/drowser",
    accent: false,
  },
];

export const skills = [
  "LLM Orchestration",
  "Agents",
  "RAG",
  "LoRA Fine-Tuning",
  "TypeScript",
  "Python",
  "Rust",
  "C++",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Solidity",
  "Eval Pipelines",
];
