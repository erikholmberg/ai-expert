/**
 * Progressive exposure ladder — timelines vary by org risk appetite.
 */
export function RolloutLadderFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg viewBox="0 0 480 318" className="mx-auto h-auto w-full max-w-xl text-foreground" role="img" aria-labelledby="roll-title">
        <title id="roll-title">Rollout stages from shadow traffic to full release with rollback path</title>
        <defs>
          <marker id="rl-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect x="40" y="28" width="400" height="48" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.14} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="240" y="44" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Shadow / offline eval</text>
        <text x="240" y="58" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">No user-visible change —</tspan>
          <tspan x="240" dy="10">compare to baseline</tspan>
        </text>

        <line x1="240" y1="76" x2="240" y2="102" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#rl-arr)" />

        <rect x="40" y="102" width="400" height="48" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.14} stroke="var(--dashboard-amber)" strokeWidth={2} />
        <text x="240" y="118" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Canary (small %)</text>
        <text x="240" y="132" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Live traffic slice — guardrails</tspan>
          <tspan x="240" dy="10">+ dashboards hot</tspan>
        </text>

        <line x1="240" y1="150" x2="240" y2="176" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#rl-arr)" />

        <rect x="40" y="176" width="400" height="48" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.14} stroke="var(--dashboard-purple)" strokeWidth={2} />
        <text x="240" y="192" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">A/B or feature flag cohort</text>
        <text x="240" y="206" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Causal read on product metrics</tspan>
          <tspan x="240" dy="10">+ eval drift</tspan>
        </text>

        <line x1="240" y1="224" x2="240" y2="250" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#rl-arr)" />

        <rect x="40" y="250" width="400" height="48" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.14} stroke="var(--dashboard-emerald)" strokeWidth={2} />
        <text x="240" y="266" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Default-on + rollback playbook</text>
        <text x="240" y="280" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Feature-flag kill switch</tspan>
          <tspan x="240" dy="10">+ comms template</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Skip stages only when blast radius is tiny — AI regressions show up in cohorts, not localhost.
      </figcaption>
    </figure>
  );
}
