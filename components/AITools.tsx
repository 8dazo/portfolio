"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LOGO_DEV_TOKEN = "pk_B1VUNMm5Sn2YMS55trXKEw";

const tools = [
  { name: "Claude", company: "Anthropic" },
  { name: "Codex", company: "OpenAI" },
  { name: "Cursor", company: "Cursor" },
  { name: "Vercel", company: "Vercel" },
  { name: "Grok", company: "xAI" },
  { name: "GitHub", company: "GitHub" },
  { name: "Ollama", company: "Ollama" },
  { name: "DeepSeek", company: "DeepSeek" },
  { name: "Tailwind", company: "Tailwind CSS" },
  { name: "OpenRouter", company: "OpenRouter" },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function logoUrl(company: string) {
  return `https://img.logo.dev/name/${encodeURIComponent(company)}?token=${LOGO_DEV_TOKEN}&size=128&format=png&theme=light&retina=true`;
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

        <motion.div
          className="ai-tools-grid mt-14 sm:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.075 } },
          }}
        >
          {tools.map((tool, index) => (
            <motion.div
              className="ai-tool-card"
              key={tool.name}
              variants={cardVariants}
              whileHover={{
                y: -7,
                scale: 1.025,
                transition: { type: "spring", stiffness: 380, damping: 24 },
              }}
            >
              <span className="ai-tool-mark">
                <Image
                  className="ai-tool-logo"
                  src={logoUrl(tool.company)}
                  alt={`${tool.name} logo`}
                  width={64}
                  height={64}
                  sizes="64px"
                />
              </span>
              <span className="ai-tool-name">{tool.name}</span>
              <span className="ai-tool-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
