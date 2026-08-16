/**
 * Data journey for AI features — governance conversation starter, not legal advice.
 */
export function GovernanceLifecycleFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 560 220"
        className="mx-auto h-auto w-full max-w-3xl text-foreground"
        role="img"
        aria-labelledby="glf-title"
      >
        <title id="glf-title">Stages from collection through retention and audit for AI workloads</title>

        <text x="280" y="24" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Data lifecycle checkpoints
        </text>

        <defs>
          <marker id="glf-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted-foreground)" fillOpacity={0.6} />
          </marker>
        </defs>

        <rect x="32" y="48" width="92" height="72" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={1.5} />
        <text x="78" y="72" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Collect</text>
        <text x="78" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="78" dy="0">Notice &amp;</tspan>
          <tspan x="78" dy="11">lawful basis</tspan>
        </text>

        <line x1="124" y1="84" x2="148" y2="84" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#glf-arrow)" />

        <rect x="148" y="48" width="92" height="72" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.12} stroke="var(--dashboard-emerald)" strokeWidth={1.5} />
        <text x="194" y="72" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Minimize</text>
        <text x="194" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="194" dy="0">Redact /</tspan>
          <tspan x="194" dy="11">truncate</tspan>
        </text>

        <line x1="240" y1="84" x2="264" y2="84" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#glf-arrow)" />

        <rect x="264" y="48" width="92" height="72" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.12} stroke="var(--dashboard-amber)" strokeWidth={1.5} />
        <text x="310" y="72" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Route</text>
        <text x="310" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="310" dy="0">Region /</tspan>
          <tspan x="310" dy="11">processor</tspan>
        </text>

        <line x1="356" y1="84" x2="380" y2="84" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#glf-arrow)" />

        <rect x="380" y="48" width="92" height="72" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.12} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="426" y="72" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Process</text>
        <text x="426" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="426" dy="0">Logs &amp;</tspan>
          <tspan x="426" dy="11">training flags</tspan>
        </text>

        <line x1="472" y1="84" x2="496" y2="84" className="stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#glf-arrow)" />

        <rect x="496" y="48" width="52" height="72" rx="8" fill="var(--muted)" fillOpacity={0.35} stroke="var(--border)" strokeWidth={1.5} />
        <text x="522" y="78" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          <tspan x="522" dy="0">Retain</tspan>
          <tspan x="522" dy="12">&amp; audit</tspan>
        </text>

        <text x="280" y="168" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="280" dy="0">Procurement maps subprocessors &amp; DPAs to each box —</tspan>
          <tspan x="280" dy="11">PMs supply flows + data categories, legal stamps approval</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Review with counsel — labels here align cross-functional conversations, not statutes.
      </figcaption>
    </figure>
  );
}
