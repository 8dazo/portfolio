import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StreetTrack from "@/components/scene/StreetTrack";
import AITools from "@/components/AITools";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Selected Work — Devansh Mahant",
  description:
    "Case studies: LLM guardrails, AI image platforms, on-device agents, and databases built from scratch.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <header className="px-5 pb-16 pt-20 sm:px-10 sm:pt-28">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          selected work
        </p>
        <h1 className="mt-4 font-sans text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-8xl">
          Things I{" "}
          <span className="font-serif normal-case italic text-accent">
            actually
          </span>
          <br />
          shipped
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          Five projects, zero tutorials followed. Each one taught me something
          the hard way.
        </p>
      </header>

      <div className="sec-frame band-paper flex flex-col gap-10 px-5 py-20 sm:px-10" data-badge="case studies">
        {projects.map((project) => (
          <article
            key={project.name}
            className={`sheet-panel p-8 sm:p-12 ${
              project.accent ? "sheet-panel--amber" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                  {project.index} — {project.tagline}
                </p>
                <h2 className="mt-3 font-sans text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                  {project.name}
                </h2>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="rounded-md bg-amber px-5 py-2.5 font-sans text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                Visit <span aria-hidden>↗</span>
              </a>
            </div>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-2">
              {project.description}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <AITools />

      <div className="py-10">
        <StreetTrack />
      </div>
    </PageShell>
  );
}
