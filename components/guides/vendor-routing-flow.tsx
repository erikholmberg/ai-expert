/**
 * When to add multi-provider routing — cost, resilience, or capability gaps.
 */
export function VendorRoutingFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg viewBox="0 0 480 352" className="mx-auto h-auto w-full max-w-lg text-foreground" role="img" aria-labelledby="vr-title">
        <title id="vr-title">Deciding single vendor versus multi-provider routing</title>
        <defs>
          <marker id="vr-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect x="120" y="16" width="240" height="40" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="240" y="42" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Need resilience / failover?</text>

        <line x1="180" y1="56" x2="120" y2="96" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#vr-arr)" />
        <text x="148" y="70" textAnchor="middle" className="fill-muted-foreground text-[10px]">Yes</text>
        <line x1="300" y1="56" x2="360" y2="96" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#vr-arr)" />
        <text x="332" y="70" textAnchor="middle" className="fill-muted-foreground text-[10px]">No</text>

        <rect x="40" y="96" width="160" height="56" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.14} stroke="var(--dashboard-emerald)" strokeWidth={2} />
        <text x="120" y="122" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Multi-provider router</text>
        <text x="120" y="142" textAnchor="middle" className="fill-muted-foreground text-[9px]">health checks + backoff</text>

        <rect x="280" y="96" width="160" height="48" rx="8" className="fill-muted/60 stroke-border" strokeWidth={2} />
        <text x="360" y="124" textAnchor="middle" className="fill-foreground text-[11px] font-medium">Still need price arbitrage?</text>

        <line x1="360" y1="144" x2="360" y2="176" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#vr-arr)" />

        <rect x="270" y="176" width="170" height="52" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.14} stroke="var(--dashboard-amber)" strokeWidth={2} />
        <text x="355" y="200" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Tiered routing</text>
        <text x="355" y="218" textAnchor="middle" className="fill-muted-foreground text-[9px]">cheap model ↔ escalation SKU</text>

        <rect x="60" y="238" width="360" height="68" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.1} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="240" y="260" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          <tspan x="240" dy="0">Contracting: latency SLOs, data residency,</tspan>
          <tspan x="240" dy="13">identical API surface — ops burden explodes</tspan>
          <tspan x="240" dy="13">without glue-layer ownership.</tspan>
        </text>

        <text x="240" y="324" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Single vendor works until outages or SKU gaps</tspan>
          <tspan x="240" dy="12">hurt revenue — then invest in observability-first routing.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Treat the router as a product — versioning prompts per backend matters as much as picking models.
      </figcaption>
    </figure>
  );
}
