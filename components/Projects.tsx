"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/data";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="visit"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -4,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 4,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative block"
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`sheet-panel relative overflow-hidden p-8 transition-transform duration-500 sm:p-12 ${
          project.accent ? "sheet-panel--amber" : ""
        }`}
      >
        {/* Giant ghost index */}
        <span className="pointer-events-none absolute -right-4 -top-10 font-mono text-[10rem] font-bold leading-none text-foreground/[0.04] transition-transform duration-700 group-hover:-translate-y-3 group-hover:text-foreground/[0.07]">
          {project.index}
        </span>

        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {project.index} — {project.tagline}
          </p>
          <h3 className="mt-3 font-sans text-4xl font-bold uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
            {project.name}
            <span className="ml-3 inline-block text-accent opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              ↗
            </span>
          </h3>
          <p className="mt-5 max-w-lg leading-relaxed text-muted">
            {project.description}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-12%"]);

  return (
    <section
      id="work"
      className="sec-frame band-paper py-32 sm:py-44"
      data-badge="03 · insomniac work"
    >
      <div ref={headRef} className="overflow-hidden pt-6">
        <motion.h2
          style={{ x }}
          className="whitespace-nowrap font-sans text-[13vw] font-bold uppercase leading-none tracking-tight"
        >
          Selected <span className="text-stroke">Projects</span>{" "}
          <span className="font-serif normal-case italic text-accent">
            worth a look
          </span>
        </motion.h2>
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-5xl flex-col gap-6 px-5 sm:px-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>

      <p className="mt-12 px-5 text-center font-mono text-xs text-muted sm:px-10">
        more experiments rotting in public on{" "}
        <a
          href="https://github.com/8dazo"
          target="_blank"
          rel="noopener noreferrer"
          className="link-sweep text-foreground"
        >
          github
        </a>
      </p>
    </section>
  );
}
