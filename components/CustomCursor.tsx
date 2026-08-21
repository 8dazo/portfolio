"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      setHovering(!!target);
      setLabel(target?.getAttribute("data-cursor") ?? "");
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Instant dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] size-2 rounded-full bg-foreground"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Trailing ring / label bubble */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] flex items-center justify-center rounded-full border border-accent/70 font-mono text-[10px] uppercase tracking-widest text-foreground"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 88 : hovering ? 56 : 32,
          height: label ? 88 : hovering ? 56 : 32,
          backgroundColor: label ? "var(--amber)" : "rgba(243,180,74,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label}
      </motion.div>
    </>
  );
}
