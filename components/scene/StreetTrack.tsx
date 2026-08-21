"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { streetSvg } from "./street-svg";
import { projects } from "@/lib/data";

// Parallax speeds in viewBox units/s; loop periods match the <use> clone offsets.
const LAYERS = [
  { selector: ".far", speed: 40, period: 5700 },
  { selector: ".mid", speed: 110, period: 4600 },
  { selector: ".near", speed: 180, period: 3100 },
];

function ReadLine() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % projects.length),
      4000
    );
    return () => clearInterval(id);
  }, []);
  const project = projects[index];

  return (
    <div className="mx-auto mb-2 flex w-full max-w-[1524px] items-baseline justify-between px-2 sm:px-4">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex items-baseline gap-3"
        >
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent">
            {project.index}
          </span>
          <span className="text-[17px] font-medium text-foreground">
            {project.name}
          </span>
          <span className="hidden text-[15px] text-muted sm:inline">
            {project.tagline}
          </span>
        </motion.div>
      </AnimatePresence>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
        next projects
      </span>
    </div>
  );
}

export default function StreetTrack() {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = viewRef.current?.querySelector("svg");
    if (!svg) return;
    const layers = LAYERS.map((layer) => ({
      ...layer,
      el: svg.querySelector<SVGGElement>(`:scope > g${layer.selector}`),
    }));

    let raf: number;
    let last = performance.now();
    const offsets = layers.map(() => 0);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      layers.forEach((layer, i) => {
        if (!layer.el) return;
        offsets[i] = (offsets[i] + layer.speed * dt) % layer.period;
        layer.el.style.transform = `translateX(${-offsets[i]}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="sv-street sv-street--line w-full overflow-hidden">
      <ReadLine />
      <div
        ref={viewRef}
        className="sv-street-view mx-auto w-full max-w-[1524px]"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        }}
        dangerouslySetInnerHTML={{ __html: streetSvg }}
      />
    </div>
  );
}
