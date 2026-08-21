"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* Isometric drawing helpers (2:1 projection) */
const ISO_X = 0.866;
const ISO_Y = 0.5;

function isoPoint(x: number, y: number, z: number) {
  return [
    (x - y) * ISO_X,
    (x + y) * ISO_Y - z,
  ] as const;
}

function poly(points: [number, number][]) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

/** A box drawn at iso coords: origin (x,y), footprint w×d, height h */
function Box({
  x,
  y,
  w,
  d,
  h,
  top = "#FBF7E6",
  left = "#EFE9D2",
  right = "#E5DECB",
  stroke = "#8B8577",
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
  stroke?: string;
}) {
  const p = (px: number, py: number, pz: number) => {
    const [ix, iy] = isoPoint(px, py, pz);
    return [ix, iy] as [number, number];
  };
  return (
    <g strokeWidth="1" stroke={stroke} strokeLinejoin="round">
      <polygon
        points={poly([p(x, y, h), p(x + w, y, h), p(x + w, y + d, h), p(x, y + d, h)])}
        fill={top}
      />
      <polygon
        points={poly([p(x, y + d, h), p(x + w, y + d, h), p(x + w, y + d, 0), p(x, y + d, 0)])}
        fill={left}
      />
      <polygon
        points={poly([p(x + w, y, h), p(x + w, y + d, h), p(x + w, y + d, 0), p(x + w, y, 0)])}
        fill={right}
      />
    </g>
  );
}

function IsoPlate({
  cubes,
  label,
  sublabel,
}: {
  cubes: { x: number; y: number; w: number; d: number; h: number; amber?: boolean }[];
  label: string;
  sublabel: string;
}) {
  return (
    <svg viewBox="-160 -60 320 220" className="w-full max-w-xs">
      <g transform="translate(0,60)">
        {/* Base plate: gentle breathing */}
        <motion.g
          animate={{ y: [0, 2.5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box x={-70} y={-70} w={140} d={140} h={10} />
          {[-45, -15, 15, 45].map((gx) =>
            [-45, -15, 15, 45].map((gy) => {
              const [dx, dy] = isoPoint(gx, gy, 10);
              return (
                <circle key={`${gx}-${gy}`} cx={dx} cy={dy} r="1" fill="#B4AC98" />
              );
            })
          )}
        </motion.g>
        {/* Cubes: drop onto the plate, then float with staggered bobs */}
        {cubes.map((cube, i) => (
          <motion.g
            key={i}
            initial={{ y: -46, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 17,
              delay: 0.15 + i * 0.14,
            }}
          >
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.45,
              }}
            >
              <Box
                {...cube}
                top={cube.amber ? "#F3B44A" : "#FBF7E6"}
                left={cube.amber ? "#DB9A2E" : "#EFE9D2"}
                right={cube.amber ? "#C77E0A" : "#E5DECB"}
                stroke={cube.amber ? "#8a5c10" : "#8B8577"}
              />
            </motion.g>
          </motion.g>
        ))}
        {/* Dimension line draws itself in, labels fade after */}
        <motion.line
          x1={-121}
          y1={45}
          x2={-38}
          y2={93}
          stroke="#B4AC98"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        />
        <motion.text
          x={-118}
          y={90}
          fill="#8B8577"
          fontSize="9"
          letterSpacing="1.5"
          fontFamily="var(--font-geist-mono), monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.55, 1] }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          {sublabel}
        </motion.text>
        <motion.text
          x={78}
          y={-38}
          fill="#8B8577"
          fontSize="9"
          letterSpacing="1.5"
          fontFamily="var(--font-geist-mono), monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.55, 1] }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          {label}
        </motion.text>
      </g>
    </svg>
  );
}

const TRACKS = [
  {
    name: "AI Engineering",
    years: "2+ years",
    text: "Agents, guardrails, evals — LLM systems that behave in production instead of demos.",
    label: "AGENTS",
    sublabel: "20+ TOOLS",
    cubes: [
      { x: -50, y: -50, w: 60, d: 60, h: 34, amber: true },
      { x: 20, y: -40, w: 34, d: 34, h: 20 },
      { x: -20, y: 18, w: 30, d: 30, h: 14 },
    ],
  },
  {
    name: "Full-Stack Product",
    years: "3+ years",
    text: "Next.js, Node, Postgres — owning the whole thing from schema to shipped interface.",
    label: "10K REQ/DAY",
    sublabel: "END TO END",
    cubes: [
      { x: -55, y: -30, w: 36, d: 36, h: 16 },
      { x: -8, y: -45, w: 36, d: 36, h: 26 },
      { x: 12, y: 10, w: 44, d: 44, h: 38, amber: true },
    ],
  },
  {
    name: "Competitive Programming",
    years: "top 0.3%",
    text: "2,380 LeetCode peak, ICPC regionals. Old habits die hard — and fix hard bugs.",
    label: "2380 ELO",
    sublabel: "ICPC FINALS",
    cubes: [
      { x: -50, y: -50, w: 28, d: 28, h: 12 },
      { x: -12, y: -32, w: 28, d: 28, h: 24 },
      { x: 22, y: -10, w: 28, d: 28, h: 40, amber: true },
    ],
  },
];

export default function Tracks() {
  const [index, setIndex] = useState(0);
  const track = TRACKS[index];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + TRACKS.length) % TRACKS.length);

  return (
    <section className="sec-frame px-5 py-24 sm:px-10 sm:py-32" data-badge="tracks">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-center font-sans text-4xl font-medium tracking-tight sm:text-5xl">
          Primarily <span className="text-muted">focused on</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-ink-2">
          A few years of shipping, settled into three tracks that sharpen each
          other every day.
        </p>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={track.name + "-art"}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <IsoPlate
                cubes={track.cubes}
                label={track.label}
                sublabel={track.sublabel}
              />
            </motion.div>
          </AnimatePresence>

          <div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={track.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-sans text-2xl font-bold sm:text-3xl">
                  {track.name}
                </h3>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                  {track.years}
                </p>
                <p className="mt-5 max-w-sm leading-relaxed text-ink-2">
                  {track.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="previous track"
                className="flex size-10 items-center justify-center border border-line bg-background font-sans text-lg transition-colors hover:border-foreground hover:bg-amber"
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                aria-label="next track"
                className="flex size-10 items-center justify-center border border-line bg-background font-sans text-lg transition-colors hover:border-foreground hover:bg-amber"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
