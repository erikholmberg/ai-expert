/**
 * Request lifecycle for streamed assistant UX — durations illustrative only.
 */
export function StreamingLatencyTimeline() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 560 200"
        className="mx-auto h-auto w-full max-w-3xl text-foreground"
        role="img"
        aria-labelledby="tl-title"
      >
        <title id="tl-title">
          Timeline from user send to first token and streamed completion
        </title>

        <line x1="40" y1="100" x2="520" y2="100" className="stroke-border" strokeWidth={2} />

        <circle cx="60" cy="100" r="8" fill="var(--dashboard-blue)" />
        <text x="60" y="82" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Send
        </text>

        <rect x="95" y="76" width="120" height="48" rx="6" fill="var(--dashboard-amber)" fillOpacity={0.2} stroke="var(--dashboard-amber)" strokeWidth={1.5} />
        <text x="155" y="94" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          <tspan x="155" dy="0">Queue + prompt</tspan>
          <tspan x="155" dy="12">assembly</tspan>
        </text>
        <text x="155" y="118" textAnchor="middle" className="fill-muted-foreground text-[8px]">
          cache fill, routing
        </text>

        <rect x="235" y="74" width="100" height="52" rx="6" fill="var(--dashboard-purple)" fillOpacity={0.22} stroke="var(--dashboard-purple)" strokeWidth={2} />
        <text x="285" y="96" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          TTFT
        </text>
        <text x="285" y="114" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          perceived stall
        </text>

        <rect x="355" y="78" width="145" height="44" rx="6" fill="var(--dashboard-emerald)" fillOpacity={0.18} stroke="var(--dashboard-emerald)" strokeWidth={1.5} />
        <text x="427" y="98" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          Token stream
        </text>
        <text x="427" y="114" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          sustained tps
        </text>

        <polygon
          points="510,100 520,95 520,105"
          className="fill-muted-foreground"
        />
        <text x="530" y="104" className="fill-foreground text-[10px] font-medium">
          Done
        </text>

        <text x="280" y="165" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          UX focuses on shrinking TTFT + keeping stream smooth — not only total wall time.
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Annotate with your real p50/p95 TTFT from logs — this diagram earns credibility when labeled.
      </figcaption>
    </figure>
  );
}
