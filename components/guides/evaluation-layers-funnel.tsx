/**
 * Conceptual maturity stack — wider bands = more engineering surface area.
 * Band colors follow dashboard accents (emerald → purple → amber → blue, top to bottom).
 */
export function EvaluationLayersFunnel() {
  const layers = [
    {
      lines: ["Online live /", "experiments"],
      x: 92,
      w: 176,
      y: 24,
      fill: "var(--dashboard-emerald)",
    },
    {
      lines: ["Online shadow &", "guardrails"],
      x: 72,
      w: 216,
      y: 84,
      fill: "var(--dashboard-purple)",
    },
    {
      lines: ["Offline batch &", "regression sets"],
      x: 52,
      w: 256,
      y: 144,
      fill: "var(--dashboard-amber)",
    },
    {
      lines: ["Unit checks & smoke prompts"],
      x: 32,
      w: 296,
      y: 204,
      fill: "var(--dashboard-blue)",
    },
  ] as const;

  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 360 280"
        className="mx-auto h-auto w-full max-w-md text-foreground"
        role="img"
        aria-labelledby="funnel-title"
      >
        <title id="funnel-title">
          Evaluation layers from fast unit checks to live experimentation
        </title>
        {layers.map((layer) => (
          <g key={layer.lines.join("|")}>
            <rect
              x={layer.x}
              y={layer.y}
              width={layer.w}
              height={46}
              rx="8"
              fill={layer.fill}
              fillOpacity={0.18}
              className="stroke-border"
              strokeWidth={1.5}
            />
            <text
              x={layer.x + layer.w / 2}
              y={layer.y + (layer.lines.length > 1 ? 18 : 29)}
              textAnchor="middle"
              className="fill-foreground text-[10px] font-medium leading-tight"
            >
              {layer.lines.map((line, i) => (
                <tspan
                  key={line}
                  x={layer.x + layer.w / 2}
                  dy={i === 0 ? 0 : 13}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        <text
          x="180"
          y="268"
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          Faster feedback at bottom — closer to users at top
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Ship bottom layers early; add shadow and live slices as traffic and risk
        grow.
      </figcaption>
    </figure>
  );
}
