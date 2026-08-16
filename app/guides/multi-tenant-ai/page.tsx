import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { MultiTenantArchitectureSketch } from "@/components/guides/multi-tenant-architecture-sketch";
import { MultiTenantChecklistTable } from "@/components/guides/multi-tenant-checklist-table";

export const metadata: Metadata = {
  title: "Multi-tenant AI SaaS — AI Expert",
  description:
    "Tenant isolation for prompts, retrieval, billing, and analytics — patterns B2B AI PMs ship.",
};

export default function MultiTenantAiPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Multi-tenant AI SaaS</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Multi-tenant AI SaaS</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Buyers assume isolation — prove it with{" "}
          <strong className="font-semibold text-foreground">partition keys</strong> in retrieval,
          <strong className="font-semibold text-foreground"> tenant-scoped telemetry</strong>, and{" "}
          <strong className="font-semibold text-foreground">contract-aligned exports</strong>.
          The model stack can be shared; the customer data path cannot blur.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Reference sketch</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Adapt boxes to your architecture — goal is a single slide sales + security can annotate together.
        </p>
        <MultiTenantArchitectureSketch />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Checklist lens</h2>
        <MultiTenantChecklistTable />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Deal hooks</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>Document BYOK / VPC options as SKUs — don&apos;t retrofit pricing after enterprise pilots.</li>
          <li>Align DPA language with where embeddings and logs physically land.</li>
          <li>Run quarterly “tenant bleed” drills — synthetic queries must never return neighbor chunks.</li>
        </ul>
      </section>
    </GuideShell>
  );
}
