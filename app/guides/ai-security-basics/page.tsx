import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { AiSecurityThreatSketch } from "@/components/guides/ai-security-threat-sketch";
import { AiSecurityControlsTable } from "@/components/guides/ai-security-controls-table";

export const metadata: Metadata = {
  title: "Security basics for AI PMs — AI Expert",
  description:
    "Threat sketch for prompts, tools, and data — plus product controls and ownership aligned with AppSec.",
};

export default function AiSecurityBasicsPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link
            href="/guides"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>AI security basics</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Security basics for AI PMs
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          You won&apos;t replace AppSec — you{" "}
          <strong className="font-semibold text-foreground">
            translate abuse scenarios into acceptance criteria
          </strong>
          : what inputs cross trust boundaries, which tools mutate state, where customer
          data may leak into prompts or logs. Clarity here prevents “prompt firewall”
          theater without owners.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Threat sketch</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Bring this diagram to joint reviews — annotate with your actual connectors
          (CRM, ticketing, vector DB regions).
        </p>
        <AiSecurityThreatSketch />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Controls &amp; alignment (starter set)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Rows are lenses, not exhaustive CWE lists — expand with your security
          partner during design review.
        </p>
        <AiSecurityControlsTable />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">PM habits</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Document data classification per surface — what may enter prompts vs must
            stay server-side only.
          </li>
          <li>
            Pair every tool with blast-radius tiering — reuse your agent governance
            lanes where possible.
          </li>
          <li>
            Require replay bundles for escalations — redacted prompts + trace IDs +
            policy outcome.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
