/**
 * Instruction stacking — product framing, not a vendor API map.
 */
export function PromptPolicyLayersFlow() {
  return (
    <figure className="rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <svg
        viewBox="0 0 560 320"
        className="mx-auto h-auto w-full max-w-2xl text-foreground"
        role="img"
        aria-labelledby="ppl-title"
      >
        <title id="ppl-title">
          Layers from immutable policy through user message to validated output
        </title>

        <text x="280" y="26" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Prompt stack (outer wins on conflict)
        </text>

        <rect
          x="48"
          y="44"
          width="464"
          height="44"
          rx="8"
          fill="var(--dashboard-purple)"
          fillOpacity={0.12}
          stroke="var(--dashboard-purple)"
          strokeWidth={1.5}
        />
        <text x="280" y="62" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Platform policy & safety classifiers
        </text>
        <text x="280" y="78" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Non-negotiables — injection resistance, blocked intents
        </text>

        <rect
          x="64"
          y="96"
          width="432"
          height="44"
          rx="8"
          fill="var(--dashboard-blue)"
          fillOpacity={0.12}
          stroke="var(--dashboard-blue)"
          strokeWidth={1.5}
        />
        <text x="280" y="114" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Developer / product system instructions
        </text>
        <text x="280" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Tone, tools allowed, cite-when-unsure rules
        </text>

        <rect
          x="80"
          y="148"
          width="400"
          height="44"
          rx="8"
          fill="var(--dashboard-amber)"
          fillOpacity={0.12}
          stroke="var(--dashboard-amber)"
          strokeWidth={1.5}
        />
        <text x="280" y="166" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Retrieved & injected context (RAG, memory snippets)
        </text>
        <text x="280" y="182" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Label sources — avoid blending with user-authored instructions
        </text>

        <rect
          x="96"
          y="200"
          width="368"
          height="44"
          rx="8"
          fill="var(--dashboard-emerald)"
          fillOpacity={0.12}
          stroke="var(--dashboard-emerald)"
          strokeWidth={1.5}
        />
        <text x="280" y="218" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          End-user message & attachments
        </text>
        <text x="280" y="234" textAnchor="middle" className="fill-muted-foreground text-[9px]">
          Highest manipulation risk — policy layers above must hold
        </text>

        <polygon
          points="280,258 260,288 300,288"
          fill="var(--muted-foreground)"
          fillOpacity={0.35}
          stroke="var(--border)"
          strokeWidth={1}
        />
        <rect
          x="200"
          y="292"
          width="160"
          height="22"
          rx="6"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth={1}
        />
        <text x="280" y="307" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          Parser / schema validator
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Ship explicit precedence: when UX adds “modes,” encode them as separate system branches —
        not buried edits users can mimic.
      </figcaption>
    </figure>
  );
}
