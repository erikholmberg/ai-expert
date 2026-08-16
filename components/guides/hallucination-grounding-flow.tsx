/**
 * Response posture by stakes — product shorthand, not clinical taxonomy.
 */
export function HallucinationGroundingFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 520 380"
        className="mx-auto h-auto w-full max-w-2xl text-foreground"
        role="img"
        aria-labelledby="hg-title"
      >
        <title id="hg-title">
          Choosing citations, hedging, abstention, or escalation by question stakes
        </title>
        <defs>
          <marker id="hg-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect x="135" y="8" width="250" height="48" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="260" y="30" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          <tspan x="260" dy="0">Answer could harm</tspan>
          <tspan x="260" dy="14">if wrong?</tspan>
        </text>

        <line x1="260" y1="56" x2="260" y2="78" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#hg-arr)" />

        <rect x="155" y="78" width="210" height="40" rx="8" className="fill-muted/60 stroke-border" strokeWidth={2} />
        <text x="260" y="98" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          <tspan x="260" dy="0">Verifiable from</tspan>
          <tspan x="260" dy="13">trusted corpus?</tspan>
        </text>

        <line x1="200" y1="118" x2="110" y2="158" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#hg-arr)" />
        <text x="72" y="142" textAnchor="middle" className="fill-muted-foreground text-[10px]">Yes</text>
        <line x1="320" y1="118" x2="410" y2="158" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#hg-arr)" />
        <text x="448" y="142" textAnchor="middle" className="fill-muted-foreground text-[10px]">No / partial</text>

        <rect x="35" y="158" width="150" height="56" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.14} stroke="var(--dashboard-emerald)" strokeWidth={2} />
        <text x="110" y="182" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Retrieve + cite</text>
        <text x="110" y="200" textAnchor="middle" className="fill-muted-foreground text-[9px]">Show sources in UX</text>

        <rect x="335" y="158" width="150" height="52" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.14} stroke="var(--dashboard-amber)" strokeWidth={2} />
        <text x="410" y="182" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Hedge / abstain</text>
        <text x="410" y="198" textAnchor="middle" className="fill-muted-foreground text-[9px]">Offer escalation path</text>

        <line x1="260" y1="128" x2="260" y2="228" className="stroke-muted-foreground" strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#hg-arr)" />
        <text x="278" y="182" className="fill-muted-foreground text-[10px]" textAnchor="start">Low stakes</text>

        <rect x="175" y="232" width="170" height="48" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.14} stroke="var(--dashboard-purple)" strokeWidth={2} />
        <text x="260" y="252" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          <tspan x="260" dy="0">Brainstorm /</tspan>
          <tspan x="260" dy="13">draft mode</tspan>
        </text>
        <text x="260" y="272" textAnchor="middle" className="fill-muted-foreground text-[9px]">Disclaim; skip fake citations</text>

        <rect x="50" y="292" width="420" height="72" rx="8" className="fill-muted/30 stroke-border" strokeWidth={1} strokeDasharray="4 4" />
        <text x="260" y="314" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          <tspan x="260" dy="0">Policy triggers (regulated domains) →</tspan>
          <tspan x="260" dy="14">forced human review regardless of UI path</tspan>
        </text>
        <text x="260" y="348" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="260" dy="0">Tie grounding to eval suites — spot-check</tspan>
          <tspan x="260" dy="12">abstention rates like toxicity checks.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Engineers implement retrieval + citation plumbing; PMs own when abstention is preferable to fluent-but-wrong answers.
      </figcaption>
    </figure>
  );
}
