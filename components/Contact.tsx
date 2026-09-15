"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { info } from "@/lib/data";

const mailto = `mailto:${info.email}?subject=${encodeURIComponent(
  "You're hired. (Almost.)"
)}&body=${encodeURIComponent(
  "Hey Devansh,\n\nCame to check a portfolio.\nLeft with a mild urge to hire you.\n\nLet's talk before someone else does."
)}`;

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={mailto}
      data-cursor="say hi"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setOffset({
          x: (e.clientX - rect.left - rect.width / 2) * 0.3,
          y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="group relative mt-14 inline-flex items-center gap-4 overflow-hidden rounded-full border border-foreground px-10 py-5 font-mono text-sm uppercase tracking-widest"
    >
      <span className="absolute inset-0 -translate-y-full rounded-full bg-amber transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
      <span className="relative">say hi before overthinking it</span>
      <span className="relative text-accent transition-transform duration-500 group-hover:rotate-45">
        →
      </span>
    </motion.a>
  );
}

export default function Contact({
  badge = "04 · make a move",
}: {
  badge?: string;
}) {
  return (
    <section
      id="contact"
      data-badge={badge}
      className="sec-frame band-plain relative flex flex-col items-center justify-center overflow-hidden px-5 py-32 text-center sm:px-10 sm:py-44"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(ellipse at bottom, var(--amber) 0%, transparent 60%)",
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 w-full max-w-3xl font-sans text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
      >
        Let&apos;s build
        <br />
        <span className="font-serif normal-case italic text-accent">
          something weird
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 max-w-md leading-relaxed text-ink-2"
      >
        Ready to make a move? Drop an email to discuss roles, collaborations,
        agent infrastructure — or just to say hi. Response within 24 hours.
      </motion.p>

      <MagneticButton />
    </section>
  );
}
