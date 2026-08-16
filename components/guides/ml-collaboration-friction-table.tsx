import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

const ROWS = [
  {
    friction: "Success metric defined after the model is built",
    why: "ML optimizes a proxy metric with no product input up front",
    fix: "Define the eval rubric and business metric together before training starts",
  },
  {
    friction: "Model updates treated like feature releases",
    why: "Model iteration is empirical and unpredictable, not fixed scope",
    fix: "Plan in confidence intervals and experiment budgets, not committed dates",
  },
  {
    friction: "No shared vocabulary for “good enough”",
    why: "ML thinks in offline metrics (F1, perplexity); PM thinks in user outcomes",
    fix: "Translate offline metrics into a shared, product-level acceptance threshold",
  },
  {
    friction: "Monitoring ownership unclear post-launch",
    why: "Data science moves to the next model; nobody owns drift",
    fix: "Assign an explicit monitoring owner as part of the launch checklist",
  },
] as const;

export function MlCollaborationFrictionTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[11rem] whitespace-normal">Friction point</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Why it happens</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Fix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.friction} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.friction}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.why}</TableCell>
              <TableCell className="whitespace-normal">{row.fix}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
