/**
 * Common B2B AI SaaS isolation pattern — simplify for stakeholder decks.
 */
export function MultiTenantArchitectureSketch() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg viewBox="0 0 520 280" className="mx-auto h-auto w-full max-w-2xl text-foreground" role="img" aria-labelledby="mt-title">
        <title id="mt-title">Tenant isolation for prompts retrieval and optional dedicated capacity</title>

        <rect x="40" y="40" width="110" height="72" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="95" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Tenant A</text>
        <text x="95" y="88" textAnchor="middle" className="fill-muted-foreground text-[9px]">partition key</text>

        <rect x="190" y="40" width="110" height="72" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.12} stroke="var(--dashboard-amber)" strokeWidth={2} />
        <text x="245" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Tenant B</text>
        <text x="245" y="88" textAnchor="middle" className="fill-muted-foreground text-[9px]">partition key</text>

        <rect x="340" y="40" width="140" height="72" rx="8" className="fill-muted/40 stroke-border" strokeWidth={2} />
        <text x="410" y="72" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Shared inference</text>
        <text x="410" y="90" textAnchor="middle" className="fill-muted-foreground text-[9px]">requests scoped</text>

        <line x1="95" y1="112" x2="245" y2="132" className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" />
        <line x1="245" y1="112" x2="360" y2="120" className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" />

        <rect x="80" y="140" width="360" height="66" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.1} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="260" y="162" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          <tspan x="260" dy="0">Retrieval stores — row-level security +</tspan>
          <tspan x="260" dy="13">embedding namespaces per tenant</tspan>
        </text>
        <text x="260" y="189" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Cross-tenant leakage is usually a filter bug,</tspan>
          <tspan x="260" dy="11">not “the model forgot.”</tspan>
        </text>

        <text x="260" y="248" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Dedicated stacks (VPC, keys) layer on for regulated</tspan>
          <tspan x="260" dy="12">tiers — price and sell separately.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        PM acceptance criteria should name tenant IDs in every retrieval query — not “trust the vector DB.”
      </figcaption>
    </figure>
  );
}
