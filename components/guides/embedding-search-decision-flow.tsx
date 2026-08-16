/**
 * Lexical vs semantic vs hybrid — conceptual routing, not a search engine spec.
 */
export function EmbeddingSearchDecisionFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 480 360"
        className="mx-auto h-auto w-full max-w-lg text-foreground"
        role="img"
        aria-labelledby="es-title"
      >
        <title id="es-title">
          When to favor keyword, dense vectors, or hybrid retrieval
        </title>
        <defs>
          <marker
            id="es-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect
          x="150"
          y="12"
          width="180"
          height="40"
          rx="8"
          fill="var(--dashboard-blue)"
          fillOpacity={0.12}
          stroke="var(--dashboard-blue)"
          strokeWidth={2}
        />
        <text x="240" y="38" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          User / query pattern?
        </text>

        <line
          x1="240"
          y1="52"
          x2="240"
          y2="78"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#es-arrow)"
        />

        <rect
          x="120"
          y="78"
          width="240"
          height="36"
          rx="8"
          className="fill-muted/60 stroke-border"
          strokeWidth={2}
        />
        <text x="240" y="100" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          SKUs, codes, exact titles matter?
        </text>

        <line x1="180" y1="114" x2="100" y2="152" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#es-arrow)" />
        <text x="98" y="118" textAnchor="middle" className="fill-muted-foreground text-[10px]">Yes</text>
        <line x1="300" y1="114" x2="380" y2="152" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#es-arrow)" />
        <text x="382" y="118" textAnchor="middle" className="fill-muted-foreground text-[10px]">No</text>

        <rect
          x="20"
          y="152"
          width="150"
          height="48"
          rx="8"
          fill="var(--dashboard-amber)"
          fillOpacity={0.15}
          stroke="var(--dashboard-amber)"
          strokeWidth={2}
        />
        <text x="95" y="175" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Keyword / BM25</text>
        <text x="95" y="192" textAnchor="middle" className="fill-muted-foreground text-[10px]">Lexical match</text>

        <rect
          x="300"
          y="152"
          width="160"
          height="40"
          rx="8"
          className="fill-muted/60 stroke-border"
          strokeWidth={2}
        />
        <text x="380" y="176" textAnchor="middle" className="fill-foreground text-[11px] font-medium">Paraphrase-heavy?</text>

        <line x1="380" y1="192" x2="380" y2="220" className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#es-arrow)" />

        <rect
          x="300"
          y="220"
          width="160"
          height="48"
          rx="8"
          fill="var(--dashboard-purple)"
          fillOpacity={0.15}
          stroke="var(--dashboard-purple)"
          strokeWidth={2}
        />
        <text x="380" y="243" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Dense embeddings</text>
        <text x="380" y="260" textAnchor="middle" className="fill-muted-foreground text-[10px]">Semantic neighbors</text>

        <line x1="200" y1="176" x2="240" y2="240" className="stroke-muted-foreground" strokeWidth={2} strokeDasharray="4 3" />
        <line x1="300" y1="244" x2="200" y2="280" className="stroke-muted-foreground" strokeWidth={2} strokeDasharray="4 3" />
        <text x="248" y="262" textAnchor="middle" className="fill-muted-foreground text-[10px]">Still missing recall?</text>

        <rect
          x="80"
          y="288"
          width="320"
          height="52"
          rx="8"
          fill="var(--dashboard-emerald)"
          fillOpacity={0.12}
          stroke="var(--dashboard-emerald)"
          strokeWidth={2}
        />
        <text x="240" y="310" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Hybrid + rerank</text>
        <text x="240" y="328" textAnchor="middle" className="fill-muted-foreground text-[10px]">Fuse sparse + dense, then rerank top-K</text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Production systems often end hybrid — this flow explains when to add each leg.
      </figcaption>
    </figure>
  );
}
