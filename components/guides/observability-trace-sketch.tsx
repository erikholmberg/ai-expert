/**
 * Stylized trace — align spans with vendor tracing UI vocabulary.
 */
export function ObservabilityTraceSketch() {
  const spans = [
    { label: "Auth + policy", w: 60, color: "var(--dashboard-blue)" },
    { label: "Retrieval", w: 86, color: "var(--dashboard-amber)" },
    { label: "LLM", w: 124, color: "var(--dashboard-purple)" },
    { label: "Tool: CRM", w: 84, color: "var(--dashboard-emerald)" },
    { label: "Format", w: 46, color: "var(--dashboard-blue)" },
  ];

  let cursor = 40;
  const placed = spans.map((s) => {
    const start = cursor;
    cursor += s.w + 6;
    return { ...s, start };
  });

  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg viewBox="0 0 520 128" className="mx-auto h-auto w-full max-w-3xl text-foreground" role="img" aria-labelledby="tr-title">
        <title id="tr-title">Example trace spans for one assistant turn</title>
        <text x="40" y="22" className="fill-muted-foreground text-[10px]">
          Request timeline (one user message)
        </text>
        {placed.map((s) => (
          <g key={s.label}>
            <rect
              x={s.start}
              y="38"
              width={s.w}
              height="36"
              rx="6"
              fill={s.color}
              fillOpacity={0.22}
              stroke={s.color}
              strokeWidth={1.5}
            />
            <text
              x={s.start + s.w / 2}
              y="58"
              textAnchor="middle"
              className="fill-foreground text-[9px] font-medium leading-tight"
            >
              {s.label}
            </text>
          </g>
        ))}
        <line x1="40" y1="92" x2="480" y2="92" className="stroke-border" strokeWidth={1} />
        <text x="260" y="118" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Correlate slow TTFT with retrieval vs model spans —</tspan>
          <tspan x="260" dy="11">don&apos;t blame the LLM by default.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Ask for span attributes (model SKU, chunk IDs, tool args digest) in PRDs so incidents become searchable.
      </figcaption>
    </figure>
  );
}
