import Link from "next/link";
import PageShell from "@/components/PageShell";
import NotFoundScene from "@/components/scene/NotFoundScene";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 py-24 text-center sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          error 404
        </p>
        <h1 className="mt-4 font-sans text-5xl font-bold uppercase tracking-tight sm:text-7xl">
          Page wandered
          <br />
          <span className="font-serif normal-case italic text-accent">
            off the track
          </span>
        </h1>
        <div className="mt-10 w-full">
          <NotFoundScene />
        </div>
        <p className="mt-6 max-w-sm text-ink-2">
          Even the robot couldn&apos;t find it. Click him for a consolation
          wave, or head back home.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-amber px-6 py-3.5 font-sans text-[15px] font-medium text-foreground transition-transform hover:-translate-y-0.5"
        >
          Walk back home
        </Link>
      </div>
    </PageShell>
  );
}
