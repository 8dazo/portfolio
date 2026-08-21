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
const PERIOD = 9100; // matches the duplicated copy offset

function ReadLine({ stopped }: { stopped: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % KIT.length), 3500);
    return () => clearInterval(id);
  }, []);
  const item = KIT[index];

  return (
    <div className="mb-2 flex items-baseline justify-center gap-3">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={stopped ? "hi" : item.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex items-baseline gap-3"
        >
          {stopped ? (
            <span className="text-[17px] font-medium text-accent">
              beep boop. hello, human.
            </span>
          ) : (
            <>
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent">
                {item.index}
              </span>
              <span className="text-[17px] font-medium text-foreground">
                {item.name}
              </span>
              <span className="text-[15px] text-muted">{item.note}</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function BoardTrack() {
  const viewRef = useRef<HTMLDivElement>(null);
  const stoppedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stopped, setStopped] = useState(false);

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
      if (!stoppedRef.current) {
        offset = (offset + SPEED * dt) % PERIOD;
        layers.forEach((el) => {
          el.style.transform = `translateX(${-offset}px)`;
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
      className={`sv-board-walk w-full overflow-hidden ${
        stopped ? "is-met" : ""
      }`}
    >
      <ReadLine stopped={stopped} />
      <div
        ref={viewRef}
        className="sv-board-view mx-auto w-full max-w-[1524px] cursor-pointer"
        data-cursor={stopped ? "walk on" : "say hi"}
        onClick={toggle}
        dangerouslySetInnerHTML={{ __html: boardSvg }}
      />
    </div>
  );
}
