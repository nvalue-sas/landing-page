import { CYAN } from "@/components/before-after/colors";

export function DecisionGraph({
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
        className="h-60 w-full"
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