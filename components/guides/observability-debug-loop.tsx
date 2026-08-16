/**
 * Closed loop for production AI incidents — durations illustrative.
 */
export function ObservabilityDebugLoop() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg viewBox="0 0 400 400" className="mx-auto h-auto w-full max-w-md text-foreground" role="img" aria-labelledby="obs-loop-title">
        <title id="obs-loop-title">Observe triage reproduce fix deploy loop for AI features</title>
        <defs>
          <marker id="obs-ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <ellipse cx="200" cy="200" rx="170" ry="170" className="fill-none stroke-border" strokeWidth={1.5} strokeDasharray="6 5" />

        <circle cx="200" cy="48" r="36" fill="var(--dashboard-blue)" fillOpacity={0.18} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="200" y="44" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Observe</text>
        <text x="200" y="58" textAnchor="middle" className="fill-muted-foreground text-[9px]">metrics + traces</text>

        <circle cx="332" cy="140" r="36" fill="var(--dashboard-amber)" fillOpacity={0.18} stroke="var(--dashboard-amber)" strokeWidth={2} />
        <text x="332" y="134" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Triage</text>
        <text x="332" y="150" textAnchor="middle" className="fill-muted-foreground text-[9px]">severity + blast</text>

        <circle cx="332" cy="268" r="36" fill="var(--dashboard-purple)" fillOpacity={0.18} stroke="var(--dashboard-purple)" strokeWidth={2} />
        <text x="332" y="262" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Reproduce</text>
        <text x="332" y="278" textAnchor="middle" className="fill-muted-foreground text-[9px]">replay request</text>

        <circle cx="200" cy="352" r="36" fill="var(--dashboard-emerald)" fillOpacity={0.18} stroke="var(--dashboard-emerald)" strokeWidth={2} />
        <text x="200" y="346" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Fix + ship</text>
        <text x="200" y="362" textAnchor="middle" className="fill-muted-foreground text-[9px]">prompt/tool/model</text>

        <circle cx="68" cy="268" r="36" className="fill-muted/50 stroke-border" strokeWidth={2} />
        <text x="68" y="268" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Document</text>

        <circle cx="68" cy="140" r="36" className="fill-muted/50 stroke-border" strokeWidth={2} />
        <text x="68" y="140" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Alert</text>

        <path d="M 232 62 Q 300 80 310 110" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />
        <path d="M 355 176 Q 370 200 355 232" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />
        <path d="M 308 292 Q 260 340 232 338" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />
        <path d="M 168 338 Q 100 320 88 292" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />
        <path d="M 52 232 Q 40 200 52 168" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />
        <path d="M 88 112 Q 120 70 168 62" className="fill-none stroke-muted-foreground" strokeWidth={1.5} markerEnd="url(#obs-ar)" />

        <text x="200" y="192" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="200" dy="0">Tie each step to owners —</tspan>
          <tspan x="200" dy="11">AI incidents stall without replay data.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Ask engineering for request IDs, trace IDs, and frozen prompts whenever CS escalates a bad answer.
      </figcaption>
    </figure>
  );
}
