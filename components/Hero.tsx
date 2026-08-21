"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { info } from "@/lib/data";

const REVEAL_DELAY = 2.6; // wait for preloader to leave

function StaggerName({ text, delay }: { text: string; delay: number }) {
  return (
    <span aria-label={text} className="block overflow-hidden pb-[0.08em]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            delay: delay + i * 0.045,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % info.roles.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={info.roles[index]}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="inline-block whitespace-nowrap font-serif italic text-accent"
        >
          {info.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseX, [0, 1], ["-10%", "60%"]), {
    stiffness: 50,
    damping: 20,
  });
  const glowY = useSpring(useTransform(mouseY, [0, 1], ["-20%", "50%"]), {
    stiffness: 50,
    damping: 20,
  });

  const { scrollYProgress } = useScroll();
  const nameY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] flex-col justify-between overflow-hidden px-5 pb-4 pt-28 sm:px-10"
      onMouseMove={(e) => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }}
    >
      {/* Cursor-following amber wash */}
      <motion.div
        className="pointer-events-none absolute size-[60vmax] rounded-full opacity-[0.13] blur-[120px]"
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle, var(--amber) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: REVEAL_DELAY + 0.8, duration: 1 }}
        className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted"
      >
        <span>{info.location}</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          open to interesting problems
        </span>
      </motion.div>

      <motion.div style={{ y: nameY, opacity: fade }} className="relative">
        <h1 className="font-sans text-[15vw] font-bold uppercase leading-[0.85] tracking-tight sm:text-[13vw]">
          <StaggerName text="Devansh" delay={REVEAL_DELAY} />
          <span className="text-stroke">
            <StaggerName text="Mahant" delay={REVEAL_DELAY + 0.35} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: REVEAL_DELAY + 1, duration: 0.8 }}
          className="mt-7 max-w-xl text-xl leading-relaxed text-ink-2 sm:text-2xl"
        >
          I make machines <em className="font-serif italic">think</em> and
          interfaces <em className="font-serif italic">feel</em>.
          <br />
          Currently: <RoleRotator /> — depends on the hour.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: REVEAL_DELAY + 1.3, duration: 0.8 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#work"
            className="rounded-md bg-amber px-6 py-3.5 font-sans text-[15px] font-medium text-foreground transition-transform hover:-translate-y-0.5"
          >
            View selected work <span aria-hidden>↗</span>
          </a>
          <a
            href="#story"
            className="rounded-md border border-line bg-background px-6 py-3.5 font-sans text-[15px] font-medium transition-transform hover:-translate-y-0.5"
          >
            About me <span aria-hidden>↗</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: REVEAL_DELAY + 1.6, duration: 1 }}
        className="relative flex items-end justify-between pt-10"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
          <p>senior swe @ stride.ai</p>
          <p>icpc regionalist / top 0.3% leetcode</p>
        </div>
        <div className="flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-8 w-px bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
