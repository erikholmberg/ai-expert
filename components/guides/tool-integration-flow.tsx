/**
 * Tool path resilience — illustrative lifecycle for LLM-facing integrations.
 */
export function ToolIntegrationFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 580 200"
        className="mx-auto h-auto w-full max-w-3xl text-foreground"
        role="img"
        aria-labelledby="tif-title"
      >
        <title id="tif-title">Stages from model tool call to normalized response for the model</title>

        <text x="290" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Happy path + failure normalization
        </text>

        <defs>
          <marker id="tif-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted-foreground)" fillOpacity={0.6} />
          </marker>
        </defs>

        <rect x="24" y="44" width="100" height="56" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={1.5} />
        <text x="74" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Call JSON</text>
        <text x="74" y="86" textAnchor="middle" className="fill-muted-foreground text-[9px]">Schema check</text>

        <line x1="124" y1="72" x2="148" y2="72" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#tif-arrow)" />

        <rect x="148" y="44" width="100" height="56" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.12} stroke="var(--dashboard-emerald)" strokeWidth={1.5} />
        <text x="198" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Execute</text>
        <text x="198" y="86" textAnchor="middle" className="fill-muted-foreground text-[9px]">Timeout / quota</text>

        <line x1="248" y1="72" x2="272" y2="72" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#tif-arrow)" />

        <rect x="272" y="44" width="110" height="56" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.12} stroke="var(--dashboard-amber)" strokeWidth={1.5} />
        <text x="327" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Normalize</text>
        <text x="327" y="86" textAnchor="middle" className="fill-muted-foreground text-[9px]">Stable errors</text>

        <line x1="382" y1="72" x2="406" y2="72" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#tif-arrow)" />

        <rect x="406" y="44" width="110" height="56" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.12} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="461" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Model summary</text>
        <text x="461" y="86" textAnchor="middle" className="fill-muted-foreground text-[9px]">Truncate / redact</text>

        <path d="M 74 118 L 74 132 Q 74 142 84 142 L 496 142 Q 506 142 506 132 L 506 118" fill="none" className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" markerEnd="url(#tif-arrow)" />
        <text x="290" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="290" dy="0">Retries &amp; idempotency keys live inside Execute —</tspan>
          <tspan x="290" dy="11">models should never see raw vendor HTML stacks</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Treat tool outputs like APIs: consistent shapes beat clever prompting when agents loop.
      </figcaption>
    </figure>
  );
}
