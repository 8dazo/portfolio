import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BenchScene from "@/components/scene/BenchScene";
import Timeline from "@/components/Timeline";
import Manifesto from "@/components/Manifesto";

export const metadata: Metadata = {
  title: "Story — Devansh Mahant",
  description:
    "From intern to senior engineer, with competitive programming and midnight side projects along the way.",
};

const achievements = [
  {
    title: "ACM ICPC 2023",
    detail: "Regional Finalist — top competitive programmers nationwide",
  },
  {
    title: "LeetCode Guardian",
    detail: "Top 0.3% worldwide, peak rating 2,380",
  },
  { title: "Codeforces Expert", detail: "Peak rating 1,653" },
  { title: "CodeChef 4★", detail: "Peak rating 1,911" },
  {
    title: "B.Tech, Computer Engineering",
    detail: "IIIT Dharwad, class of 2024",
  },
  {
    title: "Vercel CEO shout-out",
    detail: "Public recognition for Baelys' technical execution",
  },
];

export default function StoryPage() {
  return (
    <PageShell>
      <header className="px-5 pb-10 pt-20 sm:px-10 sm:pt-28">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          the story
        </p>
        <h1 className="mt-4 font-sans text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-8xl">
          Still figuring
          <br />
          <span className="font-serif normal-case italic text-accent">
            things out
          </span>
        </h1>
        <div className="mt-10">
          <BenchScene />
        </div>
      </header>

      <Timeline />

      <section
        className="sec-frame band-plain px-5 py-24 sm:px-10"
        data-badge="receipts"
      >
        <h2 className="font-sans text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Proof I wasn&apos;t{" "}
          <span className="font-serif normal-case italic text-accent">
            just vibing
          </span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="border border-line bg-background p-6 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-sans text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Manifesto />
    </PageShell>
  );
}
