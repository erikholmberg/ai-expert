/**
 * Request path shortcuts — conceptual stack, not vendor feature names.
 */
export function CacheStackDiagram() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 480 330"
        className="mx-auto h-auto w-full max-w-xl text-foreground"
        role="img"
        aria-labelledby="csd-title"
      >
        <title id="csd-title">Layers from client session cache down to model invocation</title>

        <text x="240" y="26" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Latency & COGS shortcuts (hit closest first)
        </text>

        <rect x="80" y="44" width="320" height="40" rx="8" fill="var(--dashboard-emerald)" fillOpacity={0.14} stroke="var(--dashboard-emerald)" strokeWidth={1.5} />
        <text x="240" y="62" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Session / UI memo — identical follow-up taps
        </text>
        <text x="240" y="76" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Instant replay without network — invalidate on task change
        </text>

        <rect x="96" y="92" width="288" height="40" rx="8" fill="var(--dashboard-blue)" fillOpacity={0.12} stroke="var(--dashboard-blue)" strokeWidth={1.5} />
        <text x="240" y="110" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Semantic / embedding cache — near-duplicate queries
        </text>
        <text x="240" y="124" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Watch staleness — TTL + content-version keys
        </text>

        <rect x="96" y="140" width="288" height="60" rx="8" fill="var(--dashboard-amber)" fillOpacity={0.12} stroke="var(--dashboard-amber)" strokeWidth={1.5} />
        <text x="240" y="156" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          <tspan x="240" dy="0">Prompt prefix / provider cache</tspan>
          <tspan x="240" dy="12">— repeated system + docs</tspan>
        </text>
        <text x="240" y="180" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Biggest bill wins when doc bundles</tspan>
          <tspan x="240" dy="10">repeat across users</tspan>
        </text>

        <rect x="96" y="208" width="288" height="64" rx="8" fill="var(--dashboard-purple)" fillOpacity={0.12} stroke="var(--dashboard-purple)" strokeWidth={1.5} />
        <text x="240" y="224" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          <tspan x="240" dy="0">Request shaping — batch, trim</tspan>
          <tspan x="240" dy="12">context, route to smaller model</tspan>
        </text>
        <text x="240" y="248" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Cheaper than caching wrong answers —</tspan>
          <tspan x="240" dy="10">measure before stacking caches</tspan>
        </text>

        <text x="240" y="298" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          <tspan x="240" dy="0">Misses fall through to live generation —</tspan>
          <tspan x="240" dy="11">observability tags should label cache tier</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Instrument hit rate by tier; a blind cache hides regressions until finance notices COGS.
      </figcaption>
    </figure>
  );
}
