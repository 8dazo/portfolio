"use client";

import { motion } from "motion/react";

const ROWS = [
  {
    num: "01",
    tag: "orchestration",
    title: "LLM Agents & Tools",
    text: "Multi-step agent workflows with tool calling, wired into real product surfaces — not notebook demos.",
  },
  {
    num: "02",
    tag: "guardrails",
    title: "Runtime Control",
    text: "Budget reservations, tool allowlists, execution policy. The keys stay inside the app, always.",
  },
  {
    num: "03",
    tag: "evals",
    title: "Traces & Scoring",
    text: "Span-first tracing, violation capture, weighted rubrics — regressions caught before users find them.",
  },
  {
    num: "04",
    tag: "models",
    title: "LoRA & RAG",
    text: "20+ style-transfer LoRAs running in production, retrieval only where it actually earns its keep.",
  },
  {
    num: "05",
    tag: "daily kit",
    title: "Claude · Cursor · GPT",
    text: "Pair programming with agents, PR review loops, MCP servers sharing context in one loop.",
  },
];

export default function AiStack() {
  return (
    <section
      className="sec-frame px-5 py-24 sm:px-10 sm:py-32"
      data-badge="ai workflow"
      id="ai"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-end">
          <h2 className="font-sans text-4xl font-medium tracking-tight sm:text-5xl">
            AI does not ship.
            <br />
            <span className="text-muted">It does the other 80%</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-ink-2">
            Using AI across the daily workflow for faster execution, better
            decisions, and shipping real-world products.
          </p>
        </div>

        <div className="band-plain mt-14 border border-line">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-line px-6 py-7 last:border-b-0 sm:grid-cols-[3rem_8rem_1fr_1.2fr] sm:items-baseline sm:gap-x-8 sm:px-8"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                {row.num}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                {row.tag}
              </span>
              <h3 className="col-span-2 font-sans text-xl font-bold sm:col-span-1 sm:text-2xl">
                {row.title}
              </h3>
              <p className="col-span-2 text-[14.5px] leading-relaxed text-ink-2 sm:col-span-1">
                {row.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
