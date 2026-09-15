"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type TrackId = "agents" | "fullstack" | "models" | "systems";
type LogKind = "cmd" | "note" | "ok" | "error";

type Track = {
  id: TrackId;
  name: string;
  meta: string;
  prompt: string;
  finding: string;
  decision: string;
  tags: string[];
  stages: [string, string, string];
  sticky: string;
};

type LogEntry = {
  kind: LogKind;
  text: string;
};

const TRACKS: Track[] = [
  {
    id: "agents",
    name: "Agent Infrastructure",
    meta: "Tools · Guardrails · Evals",
    prompt: "the agent needs freedom without surprises",
    finding: "Trace every decision",
    decision: "Reserve budget before tools run",
    tags: ["orchestration", "policy", "evals"],
    stages: ["Prompt", "Control", "Trace"],
    sticky: "Useful agents need boundaries, not babysitting.",
  },
  {
    id: "fullstack",
    name: "Full-stack Products",
    meta: "Next.js · Node · Postgres",
    prompt: "one product, one typed path from data to interface",
    finding: "Own the whole loop",
    decision: "Schema first, polish throughout",
    tags: ["product", "api", "ship"],
    stages: ["Model", "Build", "Ship"],
    sticky: "The interface and the system behind it are one product.",
  },
  {
    id: "models",
    name: "Model Systems",
    meta: "LoRA · RAG · Vision",
    prompt: "use a model only where it earns its latency",
    finding: "20+ LoRAs in production",
    decision: "Evaluate before scaling",
    tags: ["models", "retrieval", "quality"],
    stages: ["Data", "Adapt", "Score"],
    sticky: "A model demo becomes a product when quality is measurable.",
  },
  {
    id: "systems",
    name: "Systems Engineering",
    meta: "Rust · Go · Elixir",
    prompt: "build the primitive to understand the abstraction",
    finding: "Vector DB from scratch",
    decision: "Simple parts, explicit failure",
    tags: ["runtime", "storage", "performance"],
    stages: ["Inspect", "Design", "Stress"],
    sticky: "First principles make better product decisions upstream.",
  },
];

const INITIAL_LOGS: LogEntry[] = [
  { kind: "note", text: "about.devansh — type `help`, or choose a mode" },
  { kind: "cmd", text: "open agents" },
  { kind: "ok", text: "agent infrastructure ready — tools, policy, traces" },
];

const TRACK_ALIASES: Record<string, TrackId> = {
  agent: "agents",
  agents: "agents",
  ai: "agents",
  fullstack: "fullstack",
  "full stack": "fullstack",
  product: "fullstack",
  models: "models",
  model: "models",
  rag: "models",
  systems: "systems",
  system: "systems",
  runtime: "systems",
};

export default function AboutConsole() {
  const [selectedId, setSelectedId] = useState<TrackId>("agents");
  const [opened, setOpened] = useState<Set<TrackId>>(
    () => new Set<TrackId>(["agents"]),
  );
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [command, setCommand] = useState("");

  const selected = useMemo(
    () => TRACKS.find((track) => track.id === selectedId) ?? TRACKS[0],
    [selectedId],
  );

  const appendLogs = (...entries: LogEntry[]) => {
    setLogs((current) => [...current, ...entries].slice(-12));
  };

  const openTrack = (id: TrackId, recordCommand = true) => {
    const track = TRACKS.find((item) => item.id === id);
    if (!track) return;

    setSelectedId(id);
    setOpened((current) => new Set([...current, id]));
    appendLogs(
      ...(recordCommand
        ? ([{ kind: "cmd", text: `open ${id}` }] as LogEntry[])
        : []),
      { kind: "note", text: `opening ${track.name.toLowerCase()}` },
      { kind: "ok", text: `${track.meta} — ready` },
    );
  };

  const openNext = () => {
    const index = TRACKS.findIndex((track) => track.id === selectedId);
    openTrack(TRACKS[(index + 1) % TRACKS.length].id);
  };

  const showHelp = () => {
    appendLogs(
      { kind: "cmd", text: "help" },
      {
        kind: "note",
        text: "try: open agents · open fullstack · open models · open systems",
      },
    );
  };

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    setCommand("");
    if (!value) return;

    if (value === "help") {
      showHelp();
      return;
    }
    if (value === "next") {
      openNext();
      return;
    }
    if (value === "clear") {
      setLogs([]);
      return;
    }

    const target = value.replace(/^open\s+/, "");
    const id = TRACK_ALIASES[target];
    if (id) {
      openTrack(id);
      return;
    }

    appendLogs(
      { kind: "cmd", text: value },
      { kind: "error", text: "unknown mode — type `help`" },
    );
  };

  return (
    <section className="about-console" aria-label="Devansh's engineering workspace">
      <div className="sv-console">
        <div className="sv-cn-bar">
          <span className="sq" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="path">portfolio / about / engineering-modes</span>
          <span className="state">Ready</span>
        </div>

        <div className="sv-cn-body">
          <aside className="sv-cn-side" aria-label="Engineering modes">
            <div className="hd">How I work</div>
            {TRACKS.map((track) => (
              <button
                type="button"
                key={track.id}
                className={`item ${selectedId === track.id ? "is-sel" : ""} ${
                  opened.has(track.id) ? "is-built" : ""
                }`}
                aria-pressed={selectedId === track.id}
                onClick={() => openTrack(track.id)}
              >
                <i className="dot" aria-hidden="true" />
                <span className="nm">{track.name}</span>
                <span className="gp">{track.meta}</span>
              </button>
            ))}
            <div className="stat">
              <span>{opened.size} / 4 explored</span>
              <span className="fill" aria-hidden="true">
                <i style={{ width: `${opened.size * 25}%` }} />
              </span>
            </div>
          </aside>

          <div className="sv-cn-main">
            <div className="sv-cn-canvas">
              <span className="canvas-grid" aria-hidden="true" />
              <div className="stageline">
                <span>{selected.name}</span>
                <span>{selected.meta}</span>
              </div>

              <div className="frame">
                <div className="sv-cn-stage">
                  <div
                    key={selected.id}
                    className="sv-cn-bench is-prod"
                    aria-hidden="true"
                  >
                    <article className="pane chat">
                      <span className="k">Problem</span>
                      <p className="me">
                        <i>{selected.prompt}</i>
                      </p>
                      <div className="ai">
                        <span className="av" />
                        <p className="r1">{selected.finding}</p>
                        <p className="r2">{selected.decision}</p>
                      </div>
                    </article>

                    <article className="pane wire">
                      <span className="k">System</span>
                      <div className="art">
                        <span className="wf b1" />
                        <span className="wf b2" />
                        <span className="wf b3" />
                        <span className="wf b4" />
                      </div>
                      <span className="lbl2">iterate · inspect · simplify</span>
                    </article>

                    <article className="pane ui">
                      <span className="k">Outcome</span>
                      <div className="art">
                        <span className="bar" />
                        <span className="row r-1" />
                        <span className="row r-2" />
                        <span className="row r-3" />
                        <span className="cta" />
                      </div>
                      <span className="save">Shipped</span>
                    </article>

                    <svg
                      className="flow"
                      viewBox="0 0 100 60"
                      preserveAspectRatio="none"
                    >
                      <path className="wire cw1" d="M34 47.4 H41" />
                      <path className="wire cw2" d="M58 47.4 H65" />
                    </svg>
                    <span className="node cv-a">{selected.stages[0]}</span>
                    <span className="node cv-b">{selected.stages[1]}</span>
                    <span className="node cv-c">{selected.stages[2]}</span>
                    <article className="sticky k-1">
                      <p>{selected.sticky}</p>
                    </article>
                    <article className="sticky k-2">
                      <p>Ship, measure, repeat.</p>
                    </article>
                    <span className="ptr">
                      <svg viewBox="0 0 12 17">
                        <path d="M0 0 0 13 3.2 9.8 5.6 15 8 14 5.6 9 10 8.6Z" />
                      </svg>
                      <i className="tag">daz</i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="vars">
                {selected.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
                <span className="tok">building · measuring · learning</span>
              </div>
            </div>

            <div className="sv-cn-log" aria-live="polite">
              {logs.length === 0 ? (
                <div className="ln k-note">
                  <b>·</b>log cleared — type `help`
                </div>
              ) : (
                logs.map((entry, index) => (
                  <div
                    className={`ln k-${entry.kind}`}
                    key={`${index}-${entry.text}`}
                  >
                    <b>{entry.kind === "cmd" ? "❯" : entry.kind === "ok" ? "✓" : "·"}</b>
                    {entry.text}
                  </div>
                ))
              )}
            </div>

            <form className="sv-cn-prompt" onSubmit={runCommand}>
              <span className="chev" aria-hidden="true">
                ❯
              </span>
              <input
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="try: open models"
                spellCheck={false}
                aria-label="About console command"
              />
              <span className="keys">
                <button type="button" onClick={openNext}>
                  next
                </button>
                <button type="button" onClick={showHelp}>
                  help
                </button>
                <button type="button" onClick={() => setLogs([])}>
                  clear
                </button>
              </span>
            </form>
          </div>
        </div>

        <div className="sv-cn-foot">
          <span>FIG. 001 — Four modes, one engineer</span>
          <span>Agents, products, models, systems — explore one above</span>
        </div>
      </div>
    </section>
  );
}
