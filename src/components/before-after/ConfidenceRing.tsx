export function ConfidenceRing({ value }: { value: number }) {
  const r = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="-rotate-90 text-emerald-600 dark:text-emerald-400"
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
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms ease" }}
        />
      </svg>
      <span className="font-mono text-[11px] tabular-nums text-emerald-600 dark:text-emerald-400">
        {value}%
      </span>
    </span>
  );
}