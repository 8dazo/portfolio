import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RigScene from "@/components/scene/RigScene";
import RpsGame from "@/components/RpsGame";
import BoardTrack from "@/components/scene/BoardTrack";

export const metadata: Metadata = {
  title: "Fun — Devansh Mahant",
  description:
    "The playground: a robot at work, rock-paper-scissors, and other things that serve no business purpose.",
};

export default function FunPage() {
  return (
    <PageShell>
      <header className="px-5 pb-16 pt-20 text-center sm:px-10 sm:pt-28">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          the playground
        </p>
        <h1 className="mt-4 font-sans text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-8xl">
          Zero business
          <br />
          <span className="font-serif normal-case italic text-accent">
            value here
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-2">
          This page exists purely because it was fun to build. Stay a while.
        </p>
      </header>

      <section
        className="sec-frame band-plain px-5 py-20 sm:px-10"
        data-badge="exhibit a · robot at work"
      >
        <RigScene />
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          the robot that ships my side projects while I sleep
        </p>
      </section>

      <section
        className="sec-frame band-dots px-5 py-24 sm:px-10"
        data-badge="exhibit b · the game"
      >
        <RpsGame />
      </section>

      <section
        className="sec-frame px-5 py-16 sm:px-10"
        data-badge="exhibit c · say hi"
      >
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          click the robot. it stops, turns around, and waves. try it.
        </p>
        <BoardTrack />
      </section>
    </PageShell>
  );
}
