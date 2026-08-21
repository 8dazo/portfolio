"use client";

import { motion } from "motion/react";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6">{item}</span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`flex overflow-hidden border-y border-line py-4 ${className}`}
    >
      <motion.div
        className="flex"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}
