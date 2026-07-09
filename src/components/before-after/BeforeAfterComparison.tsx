import { useEffect, useState } from "react";

// Cian del acento, reactivo al tema vía la variable CSS --accent-cyan (definida
// en global.css). Se usa en el SVG donde no llegan las utilidades de Tailwind.
const CYAN = "rgb(var(--accent-cyan))";
const cyanA = (a: number) => `rgb(var(--accent-cyan) / ${a})`;

type Row = { k: string; v: string; tone?: "danger" | "warn" };

interface Scene {
  id: string;
  event: string;
  antes: { title: string; rows: Row[]; footer: string };
  ahora: {
    reasoning: string[];
    recommendation: string;
    impact: { label: string; value: string };
    confidence: number;
    actions: [string, string];
  };
}

interface Content {
  label: string;
  heading: string;
  pickScenario: string;
  eventLabel: string;
  memoLabel: string;
  printed: string;
  from: string;
  to: string;
  stampTop: string;
  stampBottom: string;
  signature: string;
  topology: string;
  proposedAction: string;
  aiLabel: string;
  svgEvent: string;
  svgDecision: string;
  steps: [string, string][];
  closingPre: string;
  closingPost: string;
  scenes: Scene[];
}

const CONTENT: Record<"es" | "en", Content> = {
  es: {
    label: "antes vs. ahora",
    heading: "Mismo evento. Dos especies distintas de software.",
    pickScenario: "elige un escenario real",
    eventLabel: "evento",
    memoLabel: "memorando interno · nº",
    printed: "impreso 14:03",
    from: "de: sistema",
    to: "a: gerencia",
    stampTop: "pendiente",
    stampBottom: "decisión humana",
    signature: "firma responsable",
    topology: "topología de decisión",
    proposedAction: "acción propuesta",
    aiLabel: "IA",
    svgEvent: "evento",
    svgDecision: "decisión",
    steps: [
      ["lee", "el software entiende el evento, no solo lo grafica."],
      ["razona", "correlaciona señales del negocio y del contexto."],
      ["propone", "una acción con impacto estimado y confianza."],
    ],
    closingPre: "Software",
    closingPost: "IA. Esa multiplicación es la diferencia.",
    scenes: [
      {
        id: "pagos",
        event: "412 pagos rechazados en la última hora, mismo emisor.",
        antes: {
          title: "Reporte de transacciones",
          rows: [
            { k: "pagos rechazados", v: "412", tone: "danger" },
            { k: "monto en riesgo", v: "$38.4 M", tone: "warn" },
            { k: "causa", v: "sin determinar" },
            { k: "acción sugerida", v: "ninguna" },
          ],
          footer: "Ver anexo. Requiere análisis del equipo de operaciones.",
        },
        ahora: {
          reasoning: [
            "mismo emisor en el 94% de los rechazos",
            "patrón: caída temporal del banco",
            "ruta de pago alterna disponible",
          ],
          recommendation:
            "Reintentar los 412 pagos por la ruta alterna en 8 minutos.",
          impact: { label: "recuperado est.", value: "$38.4 M" },
          confidence: 92,
          actions: ["reintentar ahora", "programar"],
        },
      },
      {
        id: "facturas",
        event: "1.284 facturas de proveedores recibidas hoy.",
        antes: {
          title: "Bandeja de facturación",
          rows: [
            { k: "facturas recibidas", v: "1.284" },
            { k: "sin validar", v: "1.284", tone: "warn" },
            { k: "tiempo estimado", v: "~46 h", tone: "warn" },
            { k: "responsable", v: "manual" },
          ],
          footer: "Distribuir entre el equipo contable para revisión.",
        },
        ahora: {
          reasoning: [
            "1.201 coinciden con su orden de compra",
            "83 con diferencias de monto",
            "0 facturas duplicadas detectadas",
          ],
          recommendation:
            "Aprobar 1.201 automáticamente y escalar 83 a revisión.",
          impact: { label: "horas ahorradas", value: "46 h" },
          confidence: 97,
          actions: ["aprobar lote", "ver excepciones"],
        },
      },
      {
        id: "fraude",
        event: "Pico inusual de intentos de pago en el flujo transaccional.",
        antes: {
          title: "Monitor de transacciones",
          rows: [
            { k: "transacciones/min", v: "+320%", tone: "danger" },
            { k: "alertas", v: "17", tone: "danger" },
            { k: "clasificación", v: "pendiente", tone: "warn" },
            { k: "bloqueos", v: "0" },
          ],
          footer: "Escalar a seguridad. Confirmar antes de bloquear.",
        },
        ahora: {
          reasoning: [
            "17 tarjetas con geolocalización imposible",
            "un mismo dispositivo, 17 identidades",
            "coincide con un patrón de fraude conocido",
          ],
          recommendation: "Bloquear los 17 intentos y marcar el dispositivo.",
          impact: { label: "riesgo evitado", value: "$12.9 M" },
          confidence: 99,
          actions: ["bloquear ahora", "revisar"],
        },
      },
    ],
  },
  en: {
    label: "before vs. now",
    heading: "Same event. Two different species of software.",
    pickScenario: "pick a real scenario",
    eventLabel: "event",
    memoLabel: "internal memo · no.",
    printed: "printed 14:03",
    from: "from: system",
    to: "to: management",
    stampTop: "pending",
    stampBottom: "human decision",
    signature: "authorized signature",
    topology: "decision topology",
    proposedAction: "proposed action",
    aiLabel: "AI",
    svgEvent: "event",
    svgDecision: "decision",
    steps: [
      ["reads", "the software understands the event, not just charts it."],
      ["reasons", "it correlates business and context signals."],
      ["proposes", "an action with estimated impact and confidence."],
    ],
    closingPre: "Software",
    closingPost: "AI. That multiplication is the difference.",
    scenes: [
      {
        id: "payments",
        event: "412 payments declined in the last hour, same issuer.",
        antes: {
          title: "Transactions report",
          rows: [
            { k: "declined payments", v: "412", tone: "danger" },
            { k: "amount at risk", v: "$38.4 M", tone: "warn" },
            { k: "cause", v: "undetermined" },
            { k: "suggested action", v: "none" },
          ],
          footer: "See appendix. Requires review by the operations team.",
        },
        ahora: {
          reasoning: [
            "same issuer in 94% of the declines",
            "pattern: temporary bank outage",
            "alternate payment route available",
          ],
          recommendation:
            "Retry all 412 payments via the alternate route in 8 minutes.",
          impact: { label: "est. recovered", value: "$38.4 M" },
          confidence: 92,
          actions: ["retry now", "schedule"],
        },
      },
      {
        id: "invoices",
        event: "1,284 supplier invoices received today.",
        antes: {
          title: "Billing inbox",
          rows: [
            { k: "invoices received", v: "1,284" },
            { k: "unvalidated", v: "1,284", tone: "warn" },
            { k: "estimated time", v: "~46 h", tone: "warn" },
            { k: "owner", v: "manual" },
          ],
          footer: "Distribute among the accounting team for review.",
        },
        ahora: {
          reasoning: [
            "1,201 match their purchase order",
            "83 with amount discrepancies",
            "0 duplicate invoices detected",
          ],
          recommendation:
            "Approve 1,201 automatically and escalate 83 for review.",
          impact: { label: "hours saved", value: "46 h" },
          confidence: 97,
          actions: ["approve batch", "view exceptions"],
        },
      },
      {
        id: "fraud",
        event: "Unusual spike of payment attempts in the transaction flow.",
        antes: {
          title: "Transaction monitor",
          rows: [
            { k: "transactions/min", v: "+320%", tone: "danger" },
            { k: "alerts", v: "17", tone: "danger" },
            { k: "classification", v: "pending", tone: "warn" },
            { k: "blocks", v: "0" },
          ],
          footer: "Escalate to security. Confirm before blocking.",
        },
        ahora: {
          reasoning: [
            "17 cards with impossible geolocation",
            "a single device, 17 identities",
            "matches a known fraud pattern",
          ],
          recommendation: "Block the 17 attempts and flag the device.",
          impact: { label: "risk avoided", value: "$12.9 M" },
          confidence: 99,
          actions: ["block now", "review"],
        },
      },
    ],
  },
};

export function BeforeAfterComparison({ lang }: { lang?: string }) {
  const c = CONTENT[lang === "en" ? "en" : "es"];
  const SCENES = c.scenes;

  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0); // 0=idle, 1..N=señales, N+1=decisión
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    setStep(0);
    const total = SCENES[idx].ahora.reasoning.length + 1;
    if (reduced) {
      setStep(total);
      return;
    }
    const timers = Array.from({ length: total }, (_, k) =>
      window.setTimeout(() => setStep(k + 1), 450 + k * 620),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [idx, reduced, SCENES]);

  const scene = SCENES[idx];
  const signalsCount = scene.ahora.reasoning.length;
  const allShown = step > signalsCount;

  return (
    <div className="animate-fade-in animate-duration-500">
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
      <div className="mt-8 flex items-center gap-3 rounded-lg border border-secondary-300/60 bg-secondary-100/40 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
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
        {/* ANTES — memorando en papel */}
        <article
          className="relative overflow-hidden rounded-sm shadow-[0_20px_40px_-25px_rgba(0,0,0,0.8)]"
          style={{ background: "#f2ecdd", color: "#1a1a1a" }}
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

        {/* multiplicador central */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-1">
            <div
              className="relative h-14 w-14 rounded-full border border-cyan-500/50 bg-white/80 dark:border-cyan-400/50 dark:bg-black/80"
              style={{ boxShadow: `0 0 40px -5px ${cyanA(0.6)}` }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-2xl text-cyan-600 [text-shadow:0_0_20px_rgba(6,182,212,0.6)] dark:text-cyan-400">
                ×
              </span>
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-600/80 uppercase dark:text-cyan-400/80">
              {c.aiLabel}
            </span>
          </div>
        </div>

        {/* AHORA — topología de decisión */}
        <article
          className="relative overflow-hidden rounded-xl border border-cyan-500/40 bg-white/60 dark:border-cyan-400/40 dark:bg-white/[0.03]"
          style={{ boxShadow: `0 30px 80px -40px ${cyanA(0.5)}` }}
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
          <header className="relative flex items-center justify-between border-b border-cyan-500/30 bg-white/40 px-5 py-3 dark:border-cyan-400/30 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-cyan-600 uppercase dark:text-cyan-400">
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
                "mt-5 rounded-lg border border-cyan-500/40 bg-secondary-100/50 p-4 transition-all duration-500 dark:border-cyan-400/40 dark:bg-white/[0.04] " +
                (allShown
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0")
              }
            >
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                <span className="text-cyan-600/80 dark:text-cyan-400/80">
                  {c.proposedAction}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-secondary-500 dark:text-secondary-400">
                    {scene.ahora.impact.label}:{" "}
                    <span className="tabular-nums text-cyan-600 dark:text-cyan-400">
                      {scene.ahora.impact.value}
                    </span>
                  </span>
                  <ConfidenceRing value={scene.ahora.confidence} />
                </div>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-secondary-900 dark:text-secondary-100">
                {scene.ahora.recommendation}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-md bg-cyan-500 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] text-white uppercase transition hover:brightness-110 dark:bg-cyan-400 dark:text-black"
                >
                  {scene.ahora.actions[0]}
                </button>
                <button
                  type="button"
                  className="rounded-md border border-cyan-500/40 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] text-cyan-600 uppercase transition hover:bg-cyan-500/10 dark:border-cyan-400/40 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                >
                  {scene.ahora.actions[1]}
                </button>
              </div>
            </div>
          </div>
        </article>
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

function ConfidenceRing({ value }: { value: number }) {
  const r = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2.5"
          className="text-secondary-400"
        />
        <circle
          cx="12"
          cy="12"
          r={r}
          fill="none"
          stroke={CYAN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms ease" }}
        />
      </svg>
      <span className="font-mono text-[11px] tabular-nums text-cyan-600 dark:text-cyan-400">
        {value}%
      </span>
    </span>
  );
}

function DecisionGraph({
  signals,
  step,
  allShown,
  svgEvent,
  svgDecision,
}: {
  signals: string[];
  step: number;
  allShown: boolean;
  svgEvent: string;
  svgDecision: string;
}) {
  const W = 440;
  const H = 240;
  const eventX = 34;
  const sigX = 190;
  const decX = 388;
  const centerY = H / 2;
  const gap = 68;
  const startY = centerY - ((signals.length - 1) * gap) / 2;
  const idle = "oklch(0.55 0.03 240)";

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[240px] w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id="edge-live" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.15" />
            <stop offset="100%" stopColor={CYAN} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* evento -> señales */}
        {signals.map((_, i) => {
          const y = startY + i * gap;
          const active = step > i;
          return (
            <path
              key={`e1-${i}`}
              d={`M ${eventX + 14} ${centerY} C ${eventX + 90} ${centerY}, ${sigX - 80} ${y}, ${sigX - 12} ${y}`}
              fill="none"
              strokeWidth={active ? 1.4 : 1}
              stroke={active ? "url(#edge-live)" : idle}
              strokeDasharray={active ? "0" : "3 5"}
              opacity={active ? 0.95 : 0.4}
              style={{ transition: "opacity 400ms, stroke-width 400ms" }}
            />
          );
        })}

        {/* señales -> decisión */}
        {signals.map((_, i) => {
          const y = startY + i * gap;
          const active = step > i;
          return (
            <path
              key={`e2-${i}`}
              d={`M ${sigX + 12} ${y} C ${sigX + 90} ${y}, ${decX - 90} ${centerY}, ${decX - 16} ${centerY}`}
              fill="none"
              strokeWidth={active ? 1.4 : 1}
              stroke={active ? CYAN : idle}
              strokeDasharray={active ? "0" : "3 5"}
              opacity={active ? 0.7 : 0.3}
              style={{ transition: "opacity 500ms" }}
            />
          );
        })}

        {/* nodo evento */}
        <g>
          <circle
            cx={eventX}
            cy={centerY}
            r="16"
            fill="var(--card)"
            stroke={CYAN}
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          <circle
            cx={eventX}
            cy={centerY}
            r="5"
            fill={CYAN}
            filter="url(#node-glow)"
          />
          <circle cx={eventX} cy={centerY} r="3" fill={CYAN} />
          <text
            x={eventX}
            y={centerY + 32}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--muted-foreground)"
            style={{
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {svgEvent}
          </text>
        </g>

        {/* nodos de señal */}
        {signals.map((s, i) => {
          const y = startY + i * gap;
          const active = step > i;
          const current = step === i + 1 && !allShown;
          return (
            <g
              key={`n-${i}`}
              opacity={active ? 1 : 0.35}
              style={{ transition: "opacity 400ms" }}
            >
              {current && (
                <circle
                  cx={sigX}
                  cy={y}
                  r="6"
                  fill="none"
                  stroke={CYAN}
                  strokeOpacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="6"
                    to="18"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    from="0.5"
                    to="0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={sigX}
                cy={y}
                r="6"
                fill={active ? CYAN : idle}
                stroke={active ? CYAN : "transparent"}
                strokeOpacity="0.3"
                strokeWidth="6"
                paintOrder="stroke"
              />
              <foreignObject x={sigX + 14} y={y - 20} width="180" height="40">
                <div
                  className={
                    "font-mono text-[10.5px] leading-snug " +
                    (active
                      ? "text-secondary-900 dark:text-secondary-100"
                      : "text-secondary-500/60 dark:text-secondary-400/60")
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {s}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* nodo decisión */}
        <g opacity={allShown ? 1 : 0.3} style={{ transition: "opacity 500ms" }}>
          {allShown && (
            <circle
              cx={decX}
              cy={centerY}
              r="16"
              fill="none"
              stroke={CYAN}
              strokeOpacity="0.35"
            >
              <animate
                attributeName="r"
                from="14"
                to="26"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                from="0.5"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          <circle
            cx={decX}
            cy={centerY}
            r="18"
            fill={CYAN}
            fillOpacity={allShown ? 0.18 : 0.05}
          />
          <circle
            cx={decX}
            cy={centerY}
            r="12"
            fill="var(--card)"
            stroke={CYAN}
            strokeWidth="1.4"
          />
          <path
            d={`M ${decX - 5} ${centerY} l 3.5 3.8 l 7 -7.5`}
            fill="none"
            stroke={CYAN}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={decX}
            y={centerY + 32}
            textAnchor="middle"
            fontSize="8.5"
            fill={CYAN}
            style={{
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {svgDecision}
          </text>
        </g>
      </svg>
    </div>
  );
}