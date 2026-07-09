import type { Content, Scene } from "@/components/before-after/types";

interface BeforeMemoProps {
  scene: Scene;
  c: Content;
  idx: number;
  beforeDimmed: boolean;
}

export function BeforeMemo({ scene, c, idx, beforeDimmed }: BeforeMemoProps) {
  return (
    <div className="flex flex-col">
      <div
        className={
          "mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-700 " +
          (beforeDimmed
            ? "text-secondary-400 dark:text-secondary-500"
            : "text-cyan-600 dark:text-cyan-400")
        }
      >
        <span
          className={
            "h-1.5 w-1.5 rounded-full transition-colors duration-700 " +
            (beforeDimmed
              ? "bg-secondary-400/40"
              : "animate-pulse bg-cyan-500 dark:bg-cyan-400")
          }
        />
        {c.beforeLabel}
      </div>
      <article
        className="relative flex-1 overflow-hidden rounded-sm shadow-[0_20px_40px_-25px_rgba(0,0,0,0.8)] saturate-[0.75] transition-opacity duration-[1800ms] ease-out"
        style={{
          background: "#f2ecdd",
          color: "#1a1a1a",
          opacity: beforeDimmed ? 0.5 : 1,
        }}
      >
      {/* grano del papel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden
      />
      {/* margen perforado */}
      <div
        className="pointer-events-none absolute top-0 left-4 h-full border-l border-dashed"
        style={{ borderColor: "rgba(0,0,0,0.28)" }}
        aria-hidden
      />
      {/* esquina doblada */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-10 w-10"
        style={{
          background:
            "linear-gradient(225deg, rgba(0,0,0,0.15) 0 50%, #dcd3bd 50%)",
        }}
        aria-hidden
      />

      <div className="relative px-8 pt-6 pb-10">
        <div
          className="flex items-start justify-between border-b pb-3"
          style={{ borderColor: "rgba(0,0,0,0.4)" }}
        >
          <div>
            <div
              className="font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              {c.memoLabel} 04{idx + 12}
            </div>
            <div
              className="mt-1 text-[17px] font-semibold"
              style={{ color: "#111" }}
            >
              {scene.antes.title}
            </div>
          </div>
          <div
            className="text-right font-mono text-[10px] leading-relaxed"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            <div>{c.printed}</div>
            <div>{c.from}</div>
            <div>{c.to}</div>
          </div>
        </div>

        <div className="mt-5 space-y-2 font-mono text-[13px]">
          {scene.antes.rows.map((r) => (
            <div
              key={r.k}
              className="flex items-baseline justify-between gap-4 border-b border-dotted pb-1.5"
              style={{ borderColor: "rgba(0,0,0,0.25)" }}
            >
              <span style={{ color: "rgba(0,0,0,0.65)" }}>{r.k}</span>
              <span
                className="font-semibold tabular-nums"
                style={{
                  color:
                    r.tone === "danger"
                      ? "#a11a1a"
                      : r.tone === "warn"
                        ? "#a35c00"
                        : "#111",
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>

        <p
          className="mt-6 text-[13px] italic"
          style={{ color: "rgba(0,0,0,0.6)" }}
        >
          {scene.antes.footer}
        </p>

        <div className="mt-10">
          <div
            className="h-px w-44"
            style={{ background: "rgba(0,0,0,0.55)" }}
          />
          <div
            className="mt-1 font-mono text-[9px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            {c.signature}
          </div>
        </div>

        {/* sello */}
        <div
          className="pointer-events-none absolute top-24 right-8 rotate-[-14deg] border-[3px] px-4 py-2 font-bold tracking-widest uppercase select-none"
          style={{
            borderColor: "rgba(161,26,26,0.7)",
            color: "rgba(161,26,26,0.75)",
            boxShadow: "inset 0 0 0 1px rgba(161,26,26,0.15)",
          }}
        >
          <div className="text-[18px] leading-none">{c.stampTop}</div>
          <div className="mt-1 text-[8px] tracking-[0.32em]">
            {c.stampBottom}
          </div>
        </div>
      </div>
      </article>
    </div>
  );
}