"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { info } from "@/lib/data";

const links = [
  { label: "work", href: "#work" },
  { label: "story", href: "#story" },
];

export default function Nav() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md"
    >
      <nav className="flex items-center justify-between px-5 py-3 sm:px-10">
        <a href="#top" className="font-sans text-lg font-bold lowercase">
          {info.alias}<span className="text-accent">.</span>
        </a>
        <div className="hidden font-mono text-xs text-muted sm:block">
          BLR, IN — {time || "--:--:--"}
        </div>
        <div className="flex items-center gap-5 sm:gap-8">
          <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest sm:gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="link-sweep">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-md bg-amber px-4 py-2 font-sans text-sm font-medium text-foreground shadow-[0_1px_0_var(--line)] transition-transform hover:-translate-y-0.5"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
