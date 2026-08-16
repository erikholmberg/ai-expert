import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ROWS = [
  {
    stage: "Shadow",
    signals: "Offline parity, golden-set diff vs prod baseline",
    exit: "No severe regressions on safety + quality suites",
  },
  {
    stage: "Canary",
    signals: "Latency p95, error budget, CS ticket themes",
    exit: "Stable week over week vs control — define numeric gates",
  },
  {
    stage: "A/B",
    signals: "North-star + guardrail metrics + human spot checks",
    exit: "Stat sig lift or strategic bet documented + exec sign-off",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
] as const;

export function RolloutStageTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Stage</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Watch signals</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Typical exit criteria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.stage} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium">{row.stage}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.signals}</TableCell>
              <TableCell className="whitespace-normal">{row.exit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
