import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { VendorRoutingFlow } from "@/components/guides/vendor-routing-flow";
import { VendorRoutingTable } from "@/components/guides/vendor-routing-table";
import { VendorRoutingEffortChart } from "@/components/guides/vendor-routing-effort-chart";

export const metadata: Metadata = {
  title: "Vendor & routing strategy — AI Expert",
  description:
    "When to add multi-provider routing, failover, and tiered models — with effort tradeoffs.",
};

export default function VendorRoutingPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Vendor & routing</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Vendor & routing strategy</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          One provider is simplest until{" "}
          <strong className="font-semibold text-foreground">outages</strong>,{" "}
          <strong className="font-semibold text-foreground">SKU gaps</strong>, or{" "}
          <strong className="font-semibold text-foreground">unit economics</strong> force a router layer.
          Treat routing as a maintained product: parity evals, backoff logic, and contract SLAs per backend.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Decision flow</h2>
        <VendorRoutingFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Common drivers</h2>
        <VendorRoutingTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Cost of sophistication</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Relative burdens — size against your on-call rotation and ML platform maturity.
        </p>
        <VendorRoutingEffortChart />
      </section>
    </GuideShell>
  );
}
