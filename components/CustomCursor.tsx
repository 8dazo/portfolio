"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [suppressed, setSuppressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("custom-cursor-active");

    let pointerX = -100;
    let pointerY = -100;

    const updateTarget = (target: Element | null) => {
      const interactive = target?.closest(
        "a, button, [data-cursor]"
      );
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor") ?? "");
      setSuppressed(interactive?.hasAttribute("data-cursor-hide") ?? false);
    };

    const onMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      x.set(pointerX);
      y.set(pointerY);
      updateTarget(e.target as Element);
    };

    const refreshTarget = () => {
      updateTarget(document.elementFromPoint(pointerX, pointerY));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("custom-cursor:refresh", refreshTarget);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("custom-cursor:refresh", refreshTarget);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  return (
    <>
      {/* Instant dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[99] size-2 rounded-full bg-foreground"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: suppressed ? 0 : 1 }}
      />
      {/* Trailing ring / label bubble */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[98] flex items-center justify-center rounded-full border border-accent/70 font-mono text-[10px] uppercase tracking-widest text-foreground"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 88 : hovering ? 56 : 32,
          height: label ? 88 : hovering ? 56 : 32,
          backgroundColor: label ? "var(--amber)" : "rgba(243,180,74,0)",
          opacity: suppressed ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {suppressed ? "" : label}
      </motion.div>
    </>
  );
}
