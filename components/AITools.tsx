"use client";

import { motion } from "motion/react";

const tools = [
  { name: "Claude", mark: "claude", tone: "#d97745" },
  { name: "Codex", mark: "codex", tone: "#16140e" },
  { name: "Cursor", mark: "cursor", tone: "#16140e" },
  { name: "Vercel", mark: "vercel", tone: "#16140e" },
  { name: "Grok", mark: "grok", tone: "#16140e" },
  { name: "GitHub", mark: "github", tone: "#16140e" },
  { name: "Ollama", mark: "ollama", tone: "#16140e" },
  { name: "DeepSeek", mark: "deepseek", tone: "#3f72d8" },
  { name: "Tailwind", mark: "tailwind", tone: "#38bdf8" },
  { name: "OpenRouter", mark: "openrouter", tone: "#6f55d9" },
] as const;

function BrandMark({ mark }: { mark: (typeof tools)[number]["mark"] }) {
  if (mark === "claude") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
          <path d="M24 5v38M5 24h38M10.5 10.5l27 27M37.5 10.5l-27 27" />
          <path d="m16.5 6 15 36M42 16.5 6 31.5M31.5 6l-15 36M42 31.5 6 16.5" />
        </g>
      </svg>
    );
  }

  if (mark === "codex") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
          <path d="M24 5 35 11.5v13L24 31 13 24.5v-13Z" />
          <path d="m13 11.5 11 6.4 11-6.4M24 17.9V31" />
          <path d="m13 24.5-7 4.1v8.1L13 41l7-4.3v-8.1M35 24.5l7 4.1v8.1L35 41l-7-4.3v-8.1" />
        </g>
      </svg>
    );
  }

  if (mark === "cursor") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="7" width="34" height="34" rx="3" fill="currentColor" />
        <path d="m17 14 16 15-9 .8-3.8 7.2Z" fill="var(--background)" />
      </svg>
    );
  }

  if (mark === "vercel") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8 44 40H4Z" fill="currentColor" />
      </svg>
    );
  }

  if (mark === "grok") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 9h13.5c10.8 0 17 5.6 17 15s-6.2 15-17 15H9l10-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="m11 37 26-26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (mark === "github") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5.5A18.5 18.5 0 0 0 18.2 41c.9.2 1.3-.4 1.3-.9v-3.5c-5.2 1.1-6.3-2.2-6.3-2.2-.8-2.2-2.1-2.8-2.1-2.8-1.7-1.2.1-1.2.1-1.2 1.9.1 2.9 2 2.9 2 1.7 3 4.4 2.1 5.5 1.6.2-1.3.7-2.1 1.2-2.6-4.2-.5-8.6-2.1-8.6-9.4 0-2.1.7-3.8 2-5.1-.2-.5-.9-2.4.2-5 0 0 1.6-.5 5.1 2a17.7 17.7 0 0 1 9.3 0c3.5-2.5 5.1-2 5.1-2 1 2.6.4 4.5.2 5 1.2 1.3 2 3 2 5.1 0 7.3-4.4 8.9-8.6 9.4.7.6 1.3 1.8 1.3 3.7v5.5c0 .5.3 1.1 1.3.9A18.5 18.5 0 0 0 24 5.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (mark === "ollama") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 40V18l4-5V7l5 5 5-5v6l4 5v22M15 23h18M20 28v3m8-3v3M20 36c2.5 1.7 5.5 1.7 8 0" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (mark === "deepseek") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 28c7 1 9-9 18-9 6 0 8 4 13 4 3 0 5-1 7-3-1 12-8 20-20 20C13 40 7 35 5 28Z" fill="currentColor" />
        <path d="M30 20c1-5 4-8 9-9-1 5-4 8-9 9ZM14 27c4 0 7 2 10 5" fill="none" stroke="var(--background)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (mark === "tailwind") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 21c4-8 9-12 16-12 10 0 11 8 16 8-4 8-9 12-16 12-10 0-11-8-16-8Zm0 14c4-8 9-12 16-12 10 0 11 8 16 8-4 8-9 12-16 12-10 0-11-8-16-8Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M4 24h29M26 16l8 8-8 8M44 12H15M22 4l-8 8 8 8M15 36h29" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="24" r="3" fill="currentColor" />
      <circle cx="40" cy="36" r="3" fill="currentColor" />
    </svg>
  );
}

export default function AITools() {
  return (
    <section
      id="tools"
      className="ai-tools sec-frame band-plain px-5 py-28 sm:px-10 sm:py-40"
      data-badge="AI tools"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="max-w-4xl">
          <h2 className="font-sans text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl">
            AI is part of how I{" "}
            <span className="font-serif normal-case italic text-accent">
              design &amp; build
            </span>
            ,
            <br /> every day.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Not a novelty — a daily practice. These are the tools I reach for
            to move from a rough idea to a shipped, working product.
          </p>
        </div>

        <div className="ai-tools-grid mt-14 sm:mt-20">
          {tools.map((tool, index) => (
            <motion.div
              className="ai-tool-card"
              key={tool.name}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.48,
                delay: index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="ai-tool-mark" style={{ color: tool.tone }}>
                <BrandMark mark={tool.mark} />
              </span>
              <span className="ai-tool-name">{tool.name}</span>
              <span className="ai-tool-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
