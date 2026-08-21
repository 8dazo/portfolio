"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { timeline } from "@/lib/data";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.75"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section
      id="story"
      className="sec-frame band-dots px-5 py-32 sm:px-10 sm:py-44"
      data-badge="02 · still figuring things out"
    >
      <h2 className="mb-20 max-w-3xl font-sans text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
        I&apos;m an open book.{" "}
        <span className="font-serif normal-case italic text-accent">
          here&apos;s the unfiltered timeline.
        </span>
      </h2>

      <div ref={ref} className="relative ml-2 sm:ml-6">
        {/* Track + animated progress line */}
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-accent"
          style={{ scaleY: lineScale, height: "100%" }}
        />

        <div className="flex flex-col gap-24 py-4">
          {timeline.map((entry) => (
            <motion.article
              key={entry.year}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 sm:pl-16"
            >
              <span className="absolute -left-[5px] top-3 size-[11px] rounded-full border-2 border-accent bg-background" />
              <p className="font-mono text-7xl font-bold text-foreground/10 sm:text-9xl">
                {entry.year}
              </p>
              <div className="band-plain -mt-4 inline-block max-w-xl border border-line px-6 py-5 sm:-mt-8 sm:px-8 sm:py-6">
                <h3 className="font-sans text-2xl font-bold sm:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{entry.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
