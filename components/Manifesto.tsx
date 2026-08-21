"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const statement =
  "I am an engineer at heart. I obsess over clean systems, but I love it even more when the code actually makes people feel something and get things done.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = statement.split(" ");

  return (
    <section
      className="sec-frame band-plain px-5 py-32 sm:px-10 sm:py-44"
      data-badge="01 · code with a purpose"
    >
      <div ref={ref} className="mx-auto w-full max-w-4xl">
        <p className="font-sans text-3xl font-medium leading-snug sm:text-5xl sm:leading-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mt-12 font-serif text-2xl italic text-accent sm:text-3xl"
        >
          beautiful systems that actually ship.
        </motion.p>
      </div>
    </section>
  );
}
