/**
 * Conceptual decision flow — not exhaustive (product nuance always applies).
 */
export function RagFinetunePromptFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 528 432"
        className="mx-auto h-auto w-full max-w-2xl text-foreground"
        role="img"
        aria-labelledby="flow-title flow-desc"
      >
        <title id="flow-title">
          Decision flow for prompt-only versus RAG versus fine-tuning
        </title>
        <desc id="flow-desc">
          Start from behavior gap, then branches on factual grounding,
          data availability, and latency to suggested approach.
        </desc>

        {/* Boxes: x, y, w, h, rx */}
        <defs>
          <marker
            id="arrowhead"
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
          x="190"
          y="16"
          width="140"
          height="44"
          rx="8"
          fill="var(--dashboard-blue)"
          fillOpacity={0.12}
          stroke="var(--dashboard-blue)"
          strokeWidth={2}
        />
        <text
          x="260"
          y="44"
          textAnchor="middle"
          className="fill-foreground text-[13px] font-semibold"
        >
          Behavior gap?
        </text>

        <line
          x1="260"
          y1="60"
          x2="260"
          y2="88"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />

        <rect
          x="146"
          y="88"
          width="228"
          height="50"
          rx="8"
          className="fill-muted/60 stroke-border"
          strokeWidth={2}
        />
        <text
          x="260"
          y="108"
          textAnchor="middle"
          className="fill-foreground text-[10px] font-medium"
        >
          <tspan x="260" dy="0">Need fresh / private facts</tspan>
          <tspan x="260" dy="12">in answers?</tspan>
        </text>

        {/* Branch left: Yes RAG */}
        <line
          x1="200"
          y1="138"
          x2="120"
          y2="168"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
        <text x="122" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Yes
        </text>

        <rect
          x="40"
          y="168"
          width="160"
          height="54"
          rx="8"
          fill="var(--dashboard-amber)"
          fillOpacity={0.15}
          stroke="var(--dashboard-amber)"
          strokeWidth={2}
        />
        <text
          x="120"
          y="192"
          textAnchor="middle"
          className="fill-foreground text-[12px] font-semibold"
        >
          RAG (+ prompts)
        </text>
        <text
          x="120"
          y="212"
          textAnchor="middle"
          className="fill-muted-foreground text-[9px]"
        >
          Retrieve → cite → generate
        </text>

        {/* Branch right: No */}
        <line
          x1="320"
          y1="138"
          x2="400"
          y2="168"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
        <text x="386" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          No
        </text>

        <rect
          x="304"
          y="168"
          width="192"
          height="46"
          rx="8"
          className="fill-muted/60 stroke-border"
          strokeWidth={2}
        />
        <text
          x="400"
          y="190"
          textAnchor="middle"
          className="fill-foreground text-[10px] font-medium"
        >
          <tspan x="400" dy="0">Domain style / tone</tspan>
          <tspan x="400" dy="12">still wrong?</tspan>
        </text>

        <line
          x1="400"
          y1="214"
          x2="400"
          y2="244"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />

        <rect
          x="304"
          y="244"
          width="192"
          height="46"
          rx="8"
          className="fill-muted/60 stroke-border"
          strokeWidth={2}
        />
        <text
          x="400"
          y="264"
          textAnchor="middle"
          className="fill-foreground text-[10px] font-medium"
        >
          <tspan x="400" dy="0">Have governed pairs</tspan>
          <tspan x="400" dy="12">(prompt→ideal)?</tspan>
        </text>

        {/* Fine-tune yes */}
        <line
          x1="360"
          y1="290"
          x2="280"
          y2="322"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
        <text x="274" y="296" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Yes
        </text>

        <rect
          x="168"
          y="322"
          width="160"
          height="54"
          rx="8"
          fill="var(--dashboard-purple)"
          fillOpacity={0.15}
          stroke="var(--dashboard-purple)"
          strokeWidth={2}
        />
        <text
          x="248"
          y="344"
          textAnchor="middle"
          className="fill-foreground text-[12px] font-semibold"
        >
          Fine-tuning (+ prompts)
        </text>
        <text
          x="248"
          y="364"
          textAnchor="middle"
          className="fill-muted-foreground text-[9px]"
        >
          Teach preferred behavior
        </text>

        {/* Prompt-only */}
        <line
          x1="440"
          y1="290"
          x2="460"
          y2="322"
          className="stroke-muted-foreground"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
        <text x="514" y="296" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          No
        </text>

        <rect
          x="368"
          y="322"
          width="132"
          height="54"
          rx="8"
          fill="var(--dashboard-emerald)"
          fillOpacity={0.12}
          stroke="var(--dashboard-emerald)"
          strokeWidth={2}
        />
        <text
          x="434"
          y="344"
          textAnchor="middle"
          className="fill-foreground text-[12px] font-semibold"
        >
          Prompt-only
        </text>
        <text
          x="434"
          y="364"
          textAnchor="middle"
          className="fill-muted-foreground text-[9px]"
        >
          Iterate instructions
        </text>

        {/* Merge note */}
        <rect
          x="56"
          y="388"
          width="408"
          height="34"
          rx="6"
          className="fill-muted/30"
          stroke="var(--dashboard-amber)"
          strokeOpacity={0.45}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <text
          x="260"
          y="402"
          textAnchor="middle"
          className="fill-muted-foreground text-[9px]"
        >
          <tspan x="260" dy="0">Often combine: RAG for facts + FT for voice —</tspan>
          <tspan x="260" dy="12">prompts tune each stage.</tspan>
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Use as a conversation starter with engineering — real products mix all
        three.
      </figcaption>
    </figure>
  );
}
