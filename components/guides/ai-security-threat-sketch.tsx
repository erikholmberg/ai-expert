/**
 * Simplified threat sketch — align product controls with security reviews.
 */
export function AiSecurityThreatSketch() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 520 300"
        className="mx-auto h-auto w-full max-w-2xl text-foreground"
        role="img"
        aria-labelledby="sec-title"
      >
        <title id="sec-title">User input, model, tools, and data paths with common abuse arrows</title>
        <defs>
          <marker id="sec-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect x="40" y="40" width="100" height="56" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={2} />
        <text x="90" y="68" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">User / client</text>
        <text x="90" y="84" textAnchor="middle" className="fill-muted-foreground text-[9px]">prompt + context</text>

        <line x1="140" y1="68" x2="195" y2="68" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={2} markerEnd="url(#sec-arr)" />
        <text x="168" y="52" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 text-[9px]">injection</text>

        <rect x="200" y="44" width="120" height="72" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.14} stroke="var(--dashboard-purple)" strokeWidth={2} />
        <text x="260" y="72" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Model</text>
        <text x="260" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px]">plan + text</text>

        <line x1="320" y1="68" x2="375" y2="68" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#sec-arr)" />

        <rect x="380" y="48" width="100" height="64" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.14} stroke="var(--dashboard-emerald)" strokeWidth={2} />
        <text x="430" y="76" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Tools / APIs</text>
        <text x="430" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">side effects</text>

        <line x1="430" y1="112" x2="430" y2="155" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#sec-arr)" />
        <text x="438" y="132" textAnchor="start" className="fill-amber-600 dark:fill-amber-400 text-[9px]">misuse</text>

        <rect x="360" y="160" width="140" height="52" rx="8" className="fill-card stroke-border" strokeWidth={1.5} />
        <text x="430" y="184" textAnchor="middle" className="fill-foreground text-[11px] font-medium">Data stores</text>
        <text x="430" y="200" textAnchor="middle" className="fill-muted-foreground text-[9px]">PII / secrets</text>

        <path d="M 260 116 Q 260 200 360 200" className="fill-none stroke-muted-foreground" strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#sec-arr)" />
        <text x="285" y="228" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="285" dy="0">training / logging risk</tspan>
        </text>

        <rect x="40" y="236" width="440" height="54" rx="6" className="fill-muted/30 stroke-border" strokeWidth={1} />
        <text x="260" y="256" textAnchor="middle" className="fill-foreground text-[9px] font-medium">
          <tspan x="260" dy="0">Product controls: allowlists, schema validation,</tspan>
          <tspan x="260" dy="12">egress policies, secrets vaults, audit logs</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        PMs don&apos;t pen-test — they make sure features ship with ownership for each arrow above.
      </figcaption>
    </figure>
  );
}
