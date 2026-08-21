"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const words = ["think", "feel", "move", "work"];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 350);
          return 100;
        }
        const step = c < 60 ? 3 : c < 85 ? 2 : 1;
        return Math.min(c + step, 100);
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-baseline gap-3 font-sans text-2xl sm:text-4xl">
            <span className="text-muted">making machines</span>
            <span className="relative inline-block w-[4ch] text-left">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block font-serif italic text-accent"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <motion.span className="absolute bottom-10 right-10 font-mono text-6xl text-foreground/70 sm:text-8xl">
            {count}%
          </motion.span>
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-amber"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
