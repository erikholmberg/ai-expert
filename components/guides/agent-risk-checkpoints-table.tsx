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
    tier: "Low",
    examples: "Summaries, suggestions, read APIs",
    checkpoint: "Automated metrics + spot checks",
  },
  {
    tier: "Medium",
    examples: "Customer-visible drafts, internal writes",
    checkpoint: "Human review queue or dual-control on odd hours",
  },
  {
    tier: "High",
    examples: "Money movement, HIPAA/FINRA paths, deletes",
    checkpoint: "Hard approval, break-glass, immutable logs",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
] as const;

export function AgentRiskCheckpointsTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Risk tier</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Example surfaces</TableHead>
            <TableHead className="min-w-[12rem] whitespace-normal">Human-in-the-loop pattern</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.tier} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium">{row.tier}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.examples}</TableCell>
              <TableCell className="whitespace-normal">{row.checkpoint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
