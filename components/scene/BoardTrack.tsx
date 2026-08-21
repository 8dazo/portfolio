"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { boardSvg } from "./board-svg";

const KIT = [
  { index: "01", name: "Claude", note: "daily kit" },
  { index: "02", name: "Cursor", note: "daily kit" },
  { index: "03", name: "OpenAI API", note: "daily kit" },
  { index: "04", name: "Next.js", note: "daily kit" },
  { index: "05", name: "PostgreSQL", note: "daily kit" },
];

const SPEED = 130; // viewBox units/s
const PERIOD = 9100; // matches <use> clone offset

function ReadLine() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % KIT.length), 3500);
    return () => clearInterval(id);
  }, []);
  const item = KIT[index];

  return (
    <div className="mb-2 flex items-baseline justify-center gap-3">
      <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent">
        {item.index}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={item.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-[17px] font-medium text-foreground"
        >
          {item.name}
        </motion.span>
      </AnimatePresence>
      <span className="text-[15px] text-muted">{item.note}</span>
    </div>
  );
}

export default function BoardTrack() {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = viewRef.current?.querySelector("svg");
    if (!svg) return;
    const layers = ["g.world", "g.pads"]
      .map((sel) => svg.querySelector<SVGGElement>(sel))
      .filter(Boolean) as SVGGElement[];

    let raf: number;
    let last = performance.now();
    let offset = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      offset = (offset + SPEED * dt) % PERIOD;
      layers.forEach((el) => {
        el.style.transform = `translateX(${-offset}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="sv-board-walk w-full overflow-hidden">
      <ReadLine />
      <div
        ref={viewRef}
        className="sv-board-view mx-auto w-full max-w-[1524px]"
        dangerouslySetInnerHTML={{ __html: boardSvg }}
      />
    </div>
  );
}
