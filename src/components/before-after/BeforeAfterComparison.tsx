import { useState } from "react";
import { CONTENT } from "@/components/before-after/content";
import { useDecisionSequence } from "@/components/before-after/useDecisionSequence";
import { BeforeMemo } from "@/components/before-after/BeforeMemo";
import { DecisionPanel } from "@/components/before-after/DecisionPanel";

export function BeforeAfterComparison({ lang }: { lang?: string }) {
  const c = CONTENT[lang === "en" ? "en" : "es"];
  const SCENES = c.scenes;

  const [idx, setIdx] = useState(0);
  const scene = SCENES[idx];
  const signalsCount = scene.ahora.reasoning.length;
  const { rootRef, step, beforeDimmed } = useDecisionSequence(
    signalsCount,
    idx,
  );
  const allShown = step > signalsCount;

  return (
    <div ref={rootRef} className="animate-fade-in animate-duration-500">
      {/* Section label */}
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-cyan-600 uppercase dark:text-cyan-400">
        <span>02</span>
        <span className="h-px w-8 bg-cyan-500/50 dark:bg-cyan-400/50" />
        <span>{c.label}</span>
      </div>

      <h2 className="mt-6 max-w-3xl text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight font-semibold tracking-tight text-balance text-secondary-900 dark:text-secondary-100">
        {c.heading}
      </h2>
      <p className="mt-4 max-w-2xl font-mono text-[12px] tracking-[0.22em] text-secondary-500 uppercase dark:text-secondary-400">
        {c.pickScenario}
      </p>

      {/* scenario picker */}
      <div className="mt-6 flex flex-wrap gap-2">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIdx(i)}
            aria-pressed={i === idx}
            className={
              "group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition " +
              (i === idx
                ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-600 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-400"
                : "border-secondary-300/70 text-secondary-500 hover:border-cyan-500/40 hover:text-secondary-900 dark:border-white/10 dark:text-secondary-400 dark:hover:border-cyan-400/40 dark:hover:text-secondary-100")
            }
          >
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (i === idx
                  ? "animate-pulse bg-cyan-500 dark:bg-cyan-400"
                  : "bg-secondary-400/50")
              }
            />
            {s.event.split(" ").slice(0, 3).join(" ")}…
          </button>
        ))}
      </div>

      {/* the event bar */}
      <div className="mt-8 flex items-center gap-3 rounded-lg border border-secondary-200/50 bg-secondary-50/50 px-4 py-3 dark:border-white/10 dark:bg-white/3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-secondary-500 uppercase dark:text-secondary-400">
          {c.eventLabel}
        </span>
        <span className="h-4 w-px bg-secondary-300/70 dark:bg-white/10" />
        <span
          key={scene.id}
          className="font-mono text-[13px] text-secondary-900 dark:text-secondary-100"
        >
          {scene.event}
        </span>
      </div>

      {/* split comparison */}
      <div className="relative mt-6 grid gap-6 md:grid-cols-2">
        <BeforeMemo scene={scene} c={c} idx={idx} beforeDimmed={beforeDimmed} />
        <DecisionPanel scene={scene} c={c} step={step} allShown={allShown} />
      </div>

      {/* explicación al pie */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {c.steps.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline gap-3 border-t border-secondary-300/60 pt-4 dark:border-white/10"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-600 uppercase dark:text-cyan-400">
              {k}
            </span>
            <span className="text-[13px] text-secondary-500 dark:text-secondary-400">
              {v}
            </span>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-xl leading-snug text-secondary-900 sm:text-2xl dark:text-secondary-100">
        {c.closingPre}{" "}
        <span className="text-cyan-600 [text-shadow:0_0_30px_rgba(6,182,212,0.5)] dark:text-cyan-400">
          ×
        </span>{" "}
        {c.closingPost}
      </p>
    </div>
  );
}