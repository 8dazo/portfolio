"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { streetSvg } from "./street-svg";
import { projects } from "@/lib/data";

// A front view of the same walker: identical height, palette, clothes, bag,
// hair, and facial details. It mirrors the robot's side/front pose system.
const FRONT_POSE = `<g class="front" aria-hidden="true">
  <g class="front-legs">
    <path class="trews" d="M-7 -31h7l-.7 26.8h-6.6z"/>
    <path class="trews" d="M3 -31h7L9.3 -4.2H2.7z"/>
    <path class="shoe-d" d="M-8.2 -5.2h8.4l1 4.2H-10z"/>
    <path class="shoe" d="M-9.8 -2.5Q-9.4-5-6.5-5h5.8Q.5-5 .8-1v2H-9.8z"/>
    <path class="sneak" d="M-9.4-.7H.5v1.4h-9.9z"/>
    <path class="shoe-d" d="M2.2 -5.2h8.4l1.7 4.2H1z"/>
    <path class="shoe" d="M1.2-2.5Q1.6-5 4.5-5h5.8q1.2 0 1.5 4v2H1.2z"/>
    <path class="sneak" d="M1.6-.7h9.9v1.4H1.6z"/>
  </g>
  <path class="bag" d="M-15.7-50.5q-2 2.2-1.7 8.2l.5 8.7q.2 3.2 3.2 3.4h5.1l.7-19.1q-2.2-3.8-7.8-1.2z"/>
  <path class="bag-d" d="M-17.2-41.8h8.8l-.3 8.5h-5.4q-2.5-.1-2.7-2.6z"/>
  <path class="bag-d" d="M-13.9-52.3q2.7-6.2 8.4-7.1l.6 2.1q-4.8 1.1-6.7 6.2z"/>
  <g class="arm-rest">
    <path class="coat-f" d="M-8.2-56.2q-4.3-.8-5.4 3.1l-2.2 17.5 5.1.5 3.6-16.7z"/>
    <path class="skin-2" d="M-16-35.9q-.6 3.8 2.1 5.1 3.3-.2 3.3-4.6z"/>
    <path class="hand-2" d="M-15.3-32.7q2.1.9 3.9-.5" fill="none" stroke-width=".55" stroke-linecap="round"/>
  </g>
  <path class="coat" d="M-8.3-56.8Q-4.5-60 1.5-60t9.8 3.2l-1.2 27Q2-27.5-8.9-30z"/>
  <path class="coat-n" d="M-7.2-55.6Q-3.5-58.4 1-58.7L-1-31.2l-7.1-.3z"/>
  <path class="shirt" d="M-.9-58.9h4.8l1.3 28.5h-7.5z"/>
  <path class="coat-d" d="M-8.8-33.4q9.8 1.8 18.8 0l-.1 3.6Q2-27.8-8.9-30z"/>
  <path class="coat-d" d="M4.1-54.8 8-56l-3.2 8.2-3-4.1z"/>
  <path class="coat-f" d="M-1.1-58.4-5-55l3 7.3 3.2-4.2z"/>
  <path class="coat-d" d="M5.8-40.5h3.3v1H5.8z"/>
  <g class="arm-wave">
    <path class="coat-f" d="M9.2-56.1q3.8-.9 5.1 2.6l2.1 12.7-5.2 1-3.6-12.3z"/>
    <path class="coat-n" d="m11.2-41.2 5.2-1 1.3-13.6-5-.8z"/>
    <path class="skin" d="M12.5-57.1q.2-3.3 2.8-4.1 3 .5 2.5 4.6l-.4 2z"/>
    <path class="skin" d="M13.1-61.1q-.2-4.8.9-6.6.5-.6 1 .1l.1 3.8.7-4.9q.2-.8.9-.1l-.1 4.7 1-4q.3-.8.9 0l-.6 4.8 1.1-2.9q.4-.7.8.1l-1.5 5.7q-2.9 2.2-5.2-.7z"/>
    <path class="hand-2" d="M14.2-61.6q2.1 1.4 4.1.4" fill="none" stroke-width=".55" stroke-linecap="round"/>
  </g>
  <path class="skin" d="M-.8-61.8h5.8v6.8H-.8z"/>
  <circle class="ear" cx="-4.7" cy="-65" r="1.7"/>
  <circle class="ear" cx="8.7" cy="-65" r="1.7"/>
  <ellipse class="skin" cx="2" cy="-65" rx="6.9" ry="7.1"/>
  <path class="face-line" d="M-4.6-65q-1-.8-1.3.5.3 1.2 1.3.3M8.6-65q1-.8 1.3.5-.3 1.2-1.3.3" fill="none" stroke-width=".45" stroke-linecap="round"/>
  <path class="hair" d="M-4.8-66.3q.2-7 6.9-7 6.6 0 6.8 7.1l-1.2-1.1-1.1-2.8-1.2 1.5-1.6-2-1.8 1.8-2-1.3-1.2 2.7z"/>
  <path class="hair-d" d="M-4.5-67.6q1.8-5.5 6.6-5.5 4.2 0 6.2 4.8-3.1-3.3-6.7-2.3-2.7-.8-6.1 3z"/>
  <path class="brow" d="M-2-66.6q1.8-1.1 3.6-.1l-.2.65q-1.7-.55-3.3.15z"/>
  <path class="brow" d="M2.8-66.7q1.8-1 3.6.1l-.1.65q-1.7-.7-3.4-.05z"/>
  <ellipse class="eye-white" cx="-.15" cy="-64.7" rx="1.25" ry="1.05"/>
  <ellipse class="eye-white" cx="4.45" cy="-64.7" rx="1.25" ry="1.05"/>
  <ellipse class="pupil" cx=".1" cy="-64.65" rx=".58" ry=".72"/>
  <ellipse class="pupil" cx="4.7" cy="-64.65" rx=".58" ry=".72"/>
  <circle class="eye-white" cx=".28" cy="-64.9" r=".18"/>
  <circle class="eye-white" cx="4.88" cy="-64.9" r=".18"/>
  <circle class="skin-2" cx="-1.9" cy="-62.3" r=".7" opacity=".38"/>
  <circle class="skin-2" cx="6" cy="-62.3" r=".7" opacity=".38"/>
  <path class="face-line" d="M2.25-64 1.65-61.8q.6.5 1.45.05" fill="none" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="smile" d="M-.2-60.8q2.4 2.4 4.9 0-.45 2.25-2.45 2.3-2 0-2.45-2.3z"/>
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
    <div
      aria-live="polite"
      className="mx-auto mb-2 flex w-full max-w-[1524px] items-baseline justify-between px-2 sm:px-4"
    >
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

    // Add headroom above the original scene while keeping the ground at y=151.
    svg.setAttribute("viewBox", "0 -10 2320 161");

    // Give the character more visual weight without enlarging the full street.
    svg
      .querySelector<SVGGElement>(".walker")
      ?.setAttribute("transform", "translate(300 136) scale(1.9)");

    const jump = svg.querySelector(".walker .jump");
    if (jump && !jump.querySelector(".front")) {
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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("custom-cursor:refresh"));
    });
    return () => cancelAnimationFrame(frame);
  }, [stopped]);

  return (
    <div
      className={`sv-street sv-street--line w-full overflow-hidden ${
        stopped ? "is-stop" : ""
      }`}
    >
      <ReadLine stopped={stopped} />
      <button
        type="button"
        aria-label={
          stopped
            ? "Continue the walking animation"
            : "Stop the walker and say hi"
        }
        aria-pressed={stopped}
        className="relative mx-auto block w-full max-w-[1524px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        data-cursor={stopped ? "walk on" : "say hi"}
        data-cursor-hide={stopped ? "true" : undefined}
        onClick={toggle}
      >
        <AnimatePresence>
          {stopped && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
              aria-hidden="true"
              className="hi-bubble"
            >
              <span className="hi-bubble-cloud">hi there!</span>
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
        <span className="sv-human-wave-sprite" aria-hidden="true">
          {[1, 2, 3].map((frame) => (
            <span
              className={`sv-human-wave-frame sv-human-wave-frame--${frame}`}
              key={frame}
            >
              <Image
                src="/threewave.png"
                alt=""
                width={1942}
                height={809}
                loading="eager"
                unoptimized
              />
            </span>
          ))}
        </span>
      </button>
    </div>
  );
}
