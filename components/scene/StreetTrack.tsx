"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { streetSvg } from "./street-svg";
import { projects } from "@/lib/data";

// Front-facing pose (own drawing, reuses the walker palette classes).
// Hidden by default; cross-faded in when the walker stops to say hi.
const FRONT_POSE = `<g class="pose-front">
  <rect class="trews" x="-3.6" y="-15" width="4.4" height="14.2" rx="1.6"/>
  <rect class="trews" x="3.2" y="-15" width="4.4" height="14.2" rx="1.6"/>
  <ellipse class="shoe" cx="-1.4" cy="-0.4" rx="3.4" ry="1.7"/>
  <ellipse class="shoe" cx="5.4" cy="-0.4" rx="3.4" ry="1.7"/>
  <rect class="coat" x="-6.5" y="-33" width="17" height="19.6" rx="3.4"/>
  <rect class="shirt" x="0.4" y="-32.2" width="3.2" height="17.6"/>
  <rect class="coat-d" x="-6.5" y="-17.4" width="17" height="1.6"/>
  <g class="arm-rest">
    <rect class="coat-f" x="-10" y="-31.4" width="3.6" height="13.6" rx="1.8"/>
    <circle class="hand" cx="-8.2" cy="-16.4" r="1.9"/>
  </g>
  <g class="arm-wave">
    <rect class="coat-f" x="10.4" y="-43.6" width="3.6" height="13.8" rx="1.8"/>
    <circle class="hand" cx="12.2" cy="-45.2" r="2.1"/>
  </g>
  <rect class="skin" x="0.4" y="-36.4" width="3.2" height="3.4"/>
  <circle class="ear" cx="-3.9" cy="-40" r="1.4"/>
  <circle class="ear" cx="7.9" cy="-40" r="1.4"/>
  <circle class="skin" cx="2" cy="-40.2" r="5.9"/>
  <path class="hair" d="M-3.9 -41.4a5.9 5.9 0 0 1 11.8 0l-0.4 1a6.1 6.1 0 0 0-11 0z"/>
  <circle class="pupil" cx="-0.3" cy="-40" r="0.8"/>
  <circle class="pupil" cx="4.3" cy="-40" r="0.8"/>
  <path d="M0.3 -37.1q1.7 1.6 3.4 0" fill="none" stroke="#8a6b52" stroke-width="0.7" stroke-linecap="round"/>
</g>`;

// Parallax speeds in viewBox units/s; loop periods match the duplicated copies.
const LAYERS = [
  { selector: ".far", speed: 40, period: 5700 },
  { selector: ".mid", speed: 110, period: 4600 },
  { selector: ".near", speed: 180, period: 3100 },
];

function ReadLine({ stopped }: { stopped: boolean }) {
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
          key={stopped ? "hi" : project.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex items-baseline gap-3"
        >
          {stopped ? (
            <span className="text-[17px] font-medium text-accent">
              oh hey! didn&apos;t see you there.
            </span>
          ) : (
            <>
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent">
                {project.index}
              </span>
              <span className="text-[17px] font-medium text-foreground">
                {project.name}
              </span>
              <span className="hidden text-[15px] text-muted sm:inline">
                {project.tagline}
              </span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
        {stopped ? "click to keep walking" : "click me · next projects"}
      </span>
    </div>
  );
}

export default function StreetTrack() {
  const viewRef = useRef<HTMLDivElement>(null);
  const stoppedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const svg = viewRef.current?.querySelector("svg");
    if (!svg) return;

    const jump = svg.querySelector(".walker .jump");
    if (jump && !jump.querySelector(".pose-front")) {
      jump.insertAdjacentHTML("beforeend", FRONT_POSE);
    }

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
      if (!stoppedRef.current) {
        layers.forEach((layer, i) => {
          if (!layer.el) return;
          offsets[i] = (offsets[i] + layer.speed * dt) % layer.period;
          layer.el.style.transform = `translateX(${-offsets[i]}px)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const next = !stoppedRef.current;
    stoppedRef.current = next;
    setStopped(next);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (next) {
      // Walk on again after a polite wave
      resumeTimer.current = setTimeout(() => {
        stoppedRef.current = false;
        setStopped(false);
      }, 3200);
    }
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div
      className={`sv-street sv-street--line w-full overflow-hidden ${
        stopped ? "is-stop is-hi" : ""
      }`}
    >
      <ReadLine stopped={stopped} />
      <div
        className="relative mx-auto w-full max-w-[1524px] cursor-pointer"
        data-cursor={stopped ? "walk on" : "say hi"}
        onClick={toggle}
      >
        <AnimatePresence>
          {stopped && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              className="hi-bubble left-[11%] top-[2%]"
            >
              hi there!
            </motion.span>
          )}
        </AnimatePresence>
        <div
          ref={viewRef}
          className="sv-street-view w-full"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          }}
          dangerouslySetInnerHTML={{ __html: streetSvg }}
        />
      </div>
    </div>
  );
}
