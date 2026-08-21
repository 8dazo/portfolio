"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("en-IN")
  );

  useEffect(() => {
    if (inView) raw.set(value);
  }, [inView, raw, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      className="sec-frame band-plain px-5 pb-24 pt-16 sm:px-10"
      data-badge="by the numbers"
    >
      <div className="sheet-panel mx-auto grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="group border-line p-8 transition-colors duration-500 hover:bg-foreground/[0.03] sm:p-10 lg:border-r lg:last:border-r-0 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0"
        >
          <p className="font-sans text-5xl font-bold text-accent sm:text-6xl">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">
            {stat.label}
          </p>
        </motion.div>
      ))}
      </div>
    </section>
  );
}
