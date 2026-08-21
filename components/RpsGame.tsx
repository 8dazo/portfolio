"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

const BEATS: Record<Move, Move> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const WIN_LINES = [
  "ok that was luck.",
  "recalibrating…",
  "you win. this round.",
];
const LOSE_LINES = [
  "beep boop. too easy.",
  "my circuits saw that coming.",
  "humans are so predictable.",
];
const DRAW_LINES = ["great minds.", "again!", "stalemate detected."];

const GLYPH: Record<Move, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌",
};

export default function RpsGame() {
  const [phase, setPhase] = useState<"idle" | "thinking" | "reveal">("idle");
  const [you, setYou] = useState<Move | null>(null);
  const [bot, setBot] = useState<Move | null>(null);
  const [message, setMessage] = useState("pick a hand. the robot is waiting.");
  const [score, setScore] = useState({ you: 0, bot: 0 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = (move: Move) => {
    if (phase === "thinking") return;
    if (timer.current) clearTimeout(timer.current);
    setYou(move);
    setBot(null);
    setPhase("thinking");
    setMessage("robot is thinking…");

    timer.current = setTimeout(() => {
      const pick = MOVES[Math.floor(Math.random() * 3)];
      setBot(pick);
      setPhase("reveal");
      if (pick === move) {
        setMessage(DRAW_LINES[Math.floor(Math.random() * DRAW_LINES.length)]);
      } else if (BEATS[move] === pick) {
        setScore((s) => ({ ...s, you: s.you + 1 }));
        setMessage(WIN_LINES[Math.floor(Math.random() * WIN_LINES.length)]);
      } else {
        setScore((s) => ({ ...s, bot: s.bot + 1 }));
        setMessage(LOSE_LINES[Math.floor(Math.random() * LOSE_LINES.length)]);
      }
    }, 900);
  };

  return (
    <div className="sheet-panel mx-auto max-w-3xl p-8 text-center sm:p-12">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
        rock · paper · scissors
      </p>
      <h3 className="mt-3 font-sans text-3xl font-bold sm:text-4xl">
        Beat the robot
      </h3>

      {/* Arena */}
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
            you
          </span>
          <div className="flex size-24 items-center justify-center border border-foreground bg-background text-5xl sm:size-28">
            {you ? GLYPH[you] : "?"}
          </div>
        </div>
        <span className="font-serif text-2xl italic text-accent">vs</span>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
            robot
          </span>
          <div className="flex size-24 items-center justify-center border border-foreground bg-background text-5xl sm:size-28">
            <AnimatePresence mode="popLayout">
              {phase === "thinking" ? (
                <motion.span
                  key="think"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="font-mono text-2xl"
                >
                  …
                </motion.span>
              ) : (
                <motion.span
                  key={bot ?? "idle"}
                  initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {bot ? GLYPH[bot] : "?"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-8 min-h-6 font-serif text-xl italic text-ink-2"
        >
          {message}
        </motion.p>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {MOVES.map((move) => (
          <button
            key={move}
            onClick={() => play(move)}
            disabled={phase === "thinking"}
            className="rounded-md border border-foreground bg-background px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:bg-amber disabled:opacity-40"
          >
            {GLYPH[move]} {move}
          </button>
        ))}
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        you {score.you} — {score.bot} robot
      </p>
    </div>
  );
}
