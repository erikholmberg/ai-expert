import { Check, X } from "lucide-react";

const HELPS = [
  "Real data is scarce or heavily imbalanced (rare classes, edge cases)",
  "Real data is too sensitive to use directly (PII, health, financial records)",
  "You need adversarial or edge-case examples for stress-testing safety",
  "You need scale to bootstrap an eval set before real usage data exists",
] as const;

const HURTS = [
  "Substituting for real-world messiness in the final production eval",
  "Training successive model generations only on prior synthetic output",
  "Skipping a privacy audit because the data is “synthetic”",
  "Using it to hide a real data-collection gap instead of closing it",
] as const;

export function SyntheticDataFitGrid() {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-muted/20 p-4 shadow-sm sm:grid-cols-2">
      <div className="rounded-lg border border-emerald-600/20 bg-emerald-50 p-4 dark:border-emerald-400/20 dark:bg-emerald-950/40">
        <p className="mb-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Where it helps</p>
        <ul className="space-y-2.5">
          {HELPS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-red-600/20 bg-red-50 p-4 dark:border-red-400/20 dark:bg-red-950/40">
        <p className="mb-3 text-sm font-semibold text-red-700 dark:text-red-400">Where it&apos;s risky</p>
        <ul className="space-y-2.5">
          {HURTS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
