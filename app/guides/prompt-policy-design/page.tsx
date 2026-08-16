import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { PromptPolicyLayersFlow } from "@/components/guides/prompt-policy-layers-flow";
import { PromptOutputContractTable } from "@/components/guides/prompt-output-contract-table";
import { PromptRigidityChart } from "@/components/guides/prompt-rigidity-chart";

export const metadata: Metadata = {
  title: "Prompt & policy design — AI Expert",
  description:
    "Instruction layers, output contracts, and when strict schemas beat prose for product AI.",
};

export default function PromptPolicyDesignPage() {
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
          <span>Prompt & policy design</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Prompt & policy design for products
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Users do not experience “the model” — they experience{" "}
          <strong className="font-semibold text-foreground">stacked instructions</strong>,{" "}
          <strong className="font-semibold text-foreground">injected context</strong>, and{" "}
          <strong className="font-semibold text-foreground">validated outputs</strong>. Product
          teams win when precedence is explicit and downstream parsers match what marketing demos
          imply.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Instruction precedence</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Align with legal and safety partners on what belongs in immutable policy versus editable
          product copy — this diagram is a collaboration aide, not legal advice.
        </p>
        <PromptPolicyLayersFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Output contracts</h2>
        <PromptOutputContractTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Rigidity vs reliability</h2>
        <PromptRigidityChart />
      </section>
    </GuideShell>
  );
}
