import { cyanA } from "@/components/before-after/colors";
import type { Content, Scene } from "@/components/before-after/types";
import { ConfidenceRing } from "@/components/before-after/ConfidenceRing";
import { DecisionGraph } from "@/components/before-after/DecisionGraph";

interface DecisionPanelProps {
  scene: Scene;
  c: Content;
  step: number;
  allShown: boolean;
}

export function DecisionPanel({ scene, c, step, allShown }: DecisionPanelProps) {
  return (
    <div className="flex flex-col">
      <div
        className={
          "mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-700 " +
          (step > 0
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-secondary-400 dark:text-secondary-500")
        }
      >
        <span
          className={
            "h-1.5 w-1.5 rounded-full transition-colors duration-700 " +
            (step > 0
              ? "animate-pulse bg-cyan-500 dark:bg-cyan-400"
              : "bg-secondary-400/40")
          }
        />
        {c.afterLabel}
      </div>
      <article
        className="relative flex-1 overflow-hidden rounded-2xl border border-secondary-300/60 bg-white/60 shadow-2xl shadow-cyan-500/10 backdrop-blur-md dark:border-white/10 dark:bg-white/3 dark:shadow-black/40"
      >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(${cyanA(0.07)} 1px, transparent 1px), linear-gradient(90deg, ${cyanA(0.07)} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
        aria-hidden
      />
      <header className="relative flex items-center justify-between border-b border-secondary-300/40 bg-white/40 px-5 py-3 dark:border-white/10 dark:bg-white/2">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-secondary-500 uppercase dark:text-secondary-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
          {c.topology}
        </div>
        <span className="font-mono text-[10px] text-secondary-500/80 dark:text-secondary-400/80">
          nvalue.decide
        </span>
      </header>

      <div className="relative p-5 sm:p-6">
        <DecisionGraph
          signals={scene.ahora.reasoning}
          step={step}
          allShown={allShown}
          svgEvent={c.svgEvent}
          svgDecision={c.svgDecision}
        />

        {/* tarjeta de recomendación */}
        <div
          className={
            "mt-5 rounded-lg border border-emerald-500/40 bg-transparent p-4 transition-all duration-500 dark:border-emerald-400/40" +
            (allShown
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0")
          }
        >
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
            <span className="text-emerald-600 dark:text-emerald-400">
              {c.proposedAction}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-secondary-500 dark:text-secondary-400">
                {scene.ahora.impact.label}:{" "}
                <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
                  {scene.ahora.impact.value}
                </span>
              </span>
              <ConfidenceRing value={scene.ahora.confidence} />
            </div>
          </div>
          <p className="mt-2 text-[15px] leading-snug text-secondary-900 dark:text-secondary-100">
            {scene.ahora.recommendation}
          </p>
        </div>
      </div>
      </article>
    </div>
  );
}