/**
 * Conceptual 2-axis map — not performance data for any specific API.
 */
export function LatencyCapabilityQuadrant() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 400 320"
        className="h-auto w-full max-w-xl mx-auto text-foreground"
        aria-labelledby="quadrant-title"
        role="img"
      >
        <title id="quadrant-title">
          Conceptual map: faster latency versus stronger reasoning capability
        </title>
        {/* Quadrant tints — dashboard accent palette */}
        <rect
          x="60"
          y="40"
          width="150"
          height="120"
          fill="var(--dashboard-blue)"
          fillOpacity={0.07}
          rx="4"
        />
        <rect
          x="210"
          y="40"
          width="150"
          height="120"
          fill="var(--dashboard-purple)"
          fillOpacity={0.07}
          rx="4"
        />
        <rect
          x="60"
          y="160"
          width="150"
          height="100"
          fill="var(--dashboard-amber)"
          fillOpacity={0.07}
          rx="4"
        />
        <rect
          x="210"
          y="160"
          width="150"
          height="100"
          fill="var(--dashboard-emerald)"
          fillOpacity={0.07}
          rx="4"
        />
        {/* Axes */}
        <line
          x1="60"
          y1="260"
          x2="360"
          y2="260"
          className="stroke-border"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="260"
          x2="60"
          y2="40"
          className="stroke-border"
          strokeWidth="2"
        />
        <text
          x="210"
          y="300"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          Latency → slower
        </text>
        <text
          x="18"
          y="155"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
          transform="rotate(-90 18 155)"
        >
          Capability → stronger
        </text>
        {/* Quadrant labels — centered in each cell; tspans where copy is wider than the tile */}
        <text x="135" y="96" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          Fast + capable
        </text>
        <text x="135" y="114" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Premium tier
        </text>
        <text x="285" y="88" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          <tspan x="285" dy="0">Slower +</tspan>
          <tspan x="285" dy="13">capable</tspan>
        </text>
        <text x="285" y="118" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Complex jobs OK
        </text>
        <text x="135" y="200" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          Fast + lighter
        </text>
        <text x="135" y="218" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Routing / UX
        </text>
        <text x="285" y="200" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          Batch / cheap
        </text>
        <text x="285" y="218" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Throughput focus
        </text>
        {/* Divider lines */}
        <line
          x1="210"
          y1="60"
          x2="210"
          y2="260"
          className="stroke-border/60"
          strokeDasharray="4 4"
        />
        <line
          x1="60"
          y1="160"
          x2="360"
          y2="160"
          className="stroke-border/60"
          strokeDasharray="4 4"
        />
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Use this as a mental map: product choices slide you toward different
        corners — rarely does one model win every dimension.
      </figcaption>
    </figure>
  );
}
