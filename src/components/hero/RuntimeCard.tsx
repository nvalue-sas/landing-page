import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  op: string;
  intel: string;
  decision: string;
  metric: {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  };
  confidence: number;
  ms: number;
}

const SCENARIOS: Scenario[] = [
  {
    op: "412 pagos fallidos · mismo emisor",
    intel: "ruteo alterno + reintento",
    decision: "reintentar en 8 min → recuperar",
    metric: {
      label: "recuperado est.",
      value: 38.4,
      prefix: "$",
      suffix: " M",
      decimals: 1,
    },
    confidence: 92,
    ms: 340,
  },
  {
    op: "1.284 facturas escaneadas hoy",
    intel: "visión + validación cruzada",
    decision: "aprobar 1.201 · revisar 83",
    metric: { label: "horas ahorradas", value: 46, suffix: " h" },
    confidence: 97,
    ms: 210,
  },
  {
    op: "9.812 tickets de soporte abiertos",
    intel: "clasificación por intención",
    decision: "responder 6.404 sin humano",
    metric: { label: "SLA recuperado", value: 65, suffix: " %" },
    confidence: 88,
    ms: 190,
  },
  {
    op: "flujo transaccional en vivo",
    intel: "detección de anomalías",
    decision: "bloquear 17 intentos de fraude",
    metric: {
      label: "riesgo evitado",
      value: 12.9,
      prefix: "$",
      suffix: " M",
      decimals: 1,
    },
    confidence: 99,
    ms: 120,
  },
  {
    op: "12.400 formularios diligenciados",
    intel: "extracción + normalización",
    decision: "liquidar 11.980 sin intervención",
    metric: { label: "backlog eliminado", value: 96, suffix: " %" },
    confidence: 94,
    ms: 260,
  },
];

function useTypewriter(text: string, speedMs = 18) {
  const [out, setOut] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speedMs);
    return () => window.clearInterval(id);
  }, [text, speedMs]);

  return out;
}

function useCountUp(target: number, decimals = 0, durationMs = 900) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return Number(n.toFixed(decimals));
}

type Phase = "read" | "think" | "decide";

export function RuntimeCard() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("read");
  const [scanning, setScanning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [tick, setTick] = useState(0);

  // Phase machine: read the raw signal, "think" about it, emit a decision,
  // let it rest on screen, then run a scan sweep that hands off to the next
  // scenario — so the animation lives in the transition, not on a loose loop.
  // When the sweep finishes, `revealed` lights up the "N × Value" tagline.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setPhase("decide");
      setRevealed(true);
      return;
    }
    setPhase("read");
    setScanning(false);
    setRevealed(false);
    const t1 = window.setTimeout(() => setPhase("think"), 900);
    const t2 = window.setTimeout(() => setPhase("decide"), 1900);
    const t3 = window.setTimeout(() => setScanning(true), 3400);
    // El scanner corre 1.5s (3400 → 4900); el reveal cae justo al terminar.
    const t4 = window.setTimeout(() => setRevealed(true), 4900);
    // Se sostiene el reveal ~1s antes de pasar al siguiente escenario.
    const t5 = window.setTimeout(
      () => setI((n) => (n + 1) % SCENARIOS.length),
      6500,
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, [i]);

  // Forces a re-render every second so the header clock stays live.
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const scenario = SCENARIOS[i % SCENARIOS.length];
  const op = useTypewriter(scenario.op, 14);
  const intel = useTypewriter(phase !== "read" ? scenario.intel : "", 14);
  const decision = useTypewriter(
    phase === "decide" ? scenario.decision : "",
    12,
  );
  const metricValue = useCountUp(
    phase === "decide" ? scenario.metric.value : 0,
    scenario.metric.decimals ?? 0,
  );
  const confidence = useCountUp(phase === "decide" ? scenario.confidence : 0);

  void tick;

  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative overflow-hidden rounded-2xl border border-secondary-300/60 bg-white/60 shadow-2xl shadow-cyan-500/10 backdrop-blur-md dark:border-white/10 dark:bg-white/3 dark:shadow-black/40"
        aria-live="polite"
      >
        {/* Vertical scan sweep: a soft cyan glow band led by a crisp,
            leading edge line, reading the card top to bottom like an AI
            vision pass. Rendered only during the scenario hand-off so the
            sweep runs once per scenario. Horizontally masked so it fades
            out before the rounded corners instead of hitting them. */}
        {scanning && (
        <span
          aria-hidden="true"
          className="animate-runtime-scan pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          }}
        >
          {/* Trailing glow that follows the leading edge downward: a faint
              cyan haze that stays in harmony with the dark background. */}
          <span
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.03) 65%, rgba(34,211,238,0.1) 100%)",
            }}
          />
          {/* Leading edge: a translucent cyan line with a very faint,
              diffuse cyan bloom — no white core. */}
          <span
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              backgroundColor: "rgba(34,211,238,0.32)",
              boxShadow: "0 0 10px 0 rgba(34,211,238,0.15)",
            }}
          />
        </span>
        )}

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-secondary-300/40 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-secondary-500 uppercase dark:text-secondary-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
            nValue &middot; Runtime
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-secondary-500/80 dark:text-secondary-400/80">
            <span className="tabular-nums" suppressHydrationWarning>
              {timestamp}
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden tabular-nums sm:inline">
              {scenario.ms} ms
            </span>
          </div>
        </div>

        <div className="relative p-5 sm:p-6">
          <EqRow
            label="operación"
            value={op}
            active
            done={phase !== "read"}
          />
          <EqRow
            label="× inteligencia"
            value={intel}
            active={phase !== "read"}
            done={phase === "decide"}
            tone="cyan"
          />

          {/* Processing bar */}
          <div className="mt-3 mb-4 ml-9 sm:ml-10">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-secondary-500 uppercase dark:text-secondary-400">
              <span>
                {phase === "read" && "leyendo entrada…"}
                {phase === "think" && "correlacionando señales…"}
                {phase === "decide" && "decisión emitida"}
              </span>
              <span className="tabular-nums text-cyan-600 dark:text-cyan-400">
                {confidence}%
              </span>
            </div>
            <div className="mt-1.5 h-0.75 w-full overflow-hidden rounded-full bg-secondary-300/30 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-500/40 via-cyan-500 to-cyan-500/40 transition-[width] duration-700 ease-out dark:from-cyan-400/40 dark:via-cyan-400 dark:to-cyan-400/40"
                style={{
                  width:
                    phase === "read"
                      ? "18%"
                      : phase === "think"
                        ? "62%"
                        : "100%",
                }}
              />
            </div>
          </div>

          <EqRow
            label="= decisión"
            value={decision}
            active={phase === "decide"}
            done={phase === "decide"}
            tone="strong"
            cursor={phase === "decide"}
          />

          {/* Value chip */}
          <div className="mt-5 ml-9 flex flex-wrap items-end justify-between gap-3 border-t border-secondary-300/40 pt-4 sm:ml-10 dark:border-white/10">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-secondary-500 uppercase dark:text-secondary-400">
                {scenario.metric.label}
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums sm:text-3xl">
                <span className="text-cyan-500 [text-shadow:0_0_30px_rgba(6,182,212,0.5)] dark:text-cyan-400">
                  {scenario.metric.prefix ?? ""}
                  {metricValue.toLocaleString("es-CO", {
                    minimumFractionDigits: scenario.metric.decimals ?? 0,
                    maximumFractionDigits: scenario.metric.decimals ?? 0,
                  })}
                  {scenario.metric.suffix ?? ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {SCENARIOS.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`escenario ${k + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    k === i % SCENARIOS.length
                      ? "w-6 bg-cyan-500 dark:bg-cyan-400"
                      : "w-1.5 bg-secondary-300 hover:bg-cyan-500/50 dark:bg-white/15 dark:hover:bg-cyan-400/50",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p
        className={cn(
          "flex items-center justify-center gap-2 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-700",
          revealed
            ? "animate-zoom-in text-cyan-600 dark:text-cyan-400"
            : "text-secondary-400 dark:text-secondary-500",
        )}
      >
        <span>N &times; Value = Valor multiplicado</span>
        {revealed && (
          <Sparkles className="h-3.5 w-3.5 shrink-0 filter-[drop-shadow(0_0_6px_rgba(34,211,238,0.6))]" />
        )}
      </p>
    </div>
  );
}

function EqRow({
  label,
  value,
  active,
  done,
  tone = "ink",
  cursor = false,
}: {
  label: string;
  value: string;
  active: boolean;
  done: boolean;
  tone?: "ink" | "cyan" | "strong";
  cursor?: boolean;
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-600 dark:text-cyan-400"
      : tone === "strong"
        ? "text-secondary-900 [text-shadow:0_0_20px_rgba(6,182,212,0.35)] dark:text-secondary-50"
        : "text-secondary-800 dark:text-secondary-200";

  return (
    <div className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-4 py-1.5">
      <div className="relative flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-all",
            done
              ? "bg-cyan-500/20 ring-1 ring-cyan-500 dark:bg-cyan-400/20 dark:ring-cyan-400"
              : active
                ? "animate-pulse bg-cyan-500/10 ring-1 ring-cyan-500/60 dark:bg-cyan-400/10 dark:ring-cyan-400/60"
                : "bg-secondary-300/30 ring-1 ring-secondary-300/60 dark:bg-white/5 dark:ring-white/15",
          )}
        />
        <span
          className={cn(
            "relative h-1.5 w-1.5 rounded-full",
            done
              ? "bg-cyan-500 dark:bg-cyan-400"
              : active
                ? "bg-cyan-500/70 dark:bg-cyan-400/70"
                : "bg-secondary-400/50 dark:bg-secondary-500/50",
          )}
        />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[10px] tracking-widest text-secondary-500 uppercase dark:text-secondary-400">
          {label}
        </div>
        <div
          className={cn(
            "text-[clamp(1rem,2vw,1.35rem)] leading-snug font-medium",
            color,
          )}
        >
          <span>{value || " "}</span>
          {cursor && (
            <span className="animate-runtime-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.75 bg-cyan-500 align-baseline dark:bg-cyan-400" />
          )}
        </div>
      </div>
    </div>
  );
}
