/**
 * Where autonomy stops — illustrative governance lane, not legal advice.
 */
export function AgentBoundariesFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 520 308"
        className="mx-auto h-auto w-full max-w-2xl text-foreground"
        role="img"
        aria-labelledby="ab-title"
      >
        <title id="ab-title">Agent action lanes from auto to human approval to blocked</title>

        <text x="260" y="28" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Tool call lands — routing by risk tier
        </text>

        <rect x="40" y="48" width="140" height="200" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.1} stroke="var(--dashboard-emerald)" strokeWidth={1.5} />
        <text x="110" y="72" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Auto</text>
        <text x="110" y="92" textAnchor="middle" className="fill-muted-foreground text-[10px]">Read-only</text>
        <text x="110" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="110" dy="0">Draft text,</tspan>
          <tspan x="110" dy="11">search internal wiki</tspan>
        </text>

        <rect x="190" y="48" width="140" height="200" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.12} stroke="var(--dashboard-amber)" strokeWidth={1.5} />
        <text x="260" y="72" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Approval</text>
        <text x="260" y="92" textAnchor="middle" className="fill-muted-foreground text-[10px]">Side-effect</text>
        <text x="260" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Send email, charge card,</tspan>
          <tspan x="260" dy="11">file ticket</tspan>
        </text>

        <rect x="340" y="48" width="140" height="200" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.12} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="410" y="72" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Blocked</text>
        <text x="410" y="92" textAnchor="middle" className="fill-muted-foreground text-[10px]">Policy</text>
        <text x="410" y="158" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="410" dy="0">PII export, prod deploy,</tspan>
          <tspan x="410" dy="11">legal commit</tspan>
        </text>

        <line x1="110" y1="248" x2="260" y2="248" className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" />
        <line x1="260" y1="248" x2="410" y2="248" className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" />
        <text x="260" y="278" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Escalation paths + audit logs beat</tspan>
          <tspan x="260" dy="11">“prompt-only” safety for agents</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Map tools into tiers before choosing models — governance surfaces often ship inside policy engines, not the LLM weights.
      </figcaption>
    </figure>
  );
}
