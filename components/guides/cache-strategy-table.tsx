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
    tactic: "Semantic cache",
    wins: "Support bots, repeated policy questions, stable corpora",
    watch: "Wrong answer persistence — pair TTL with eval alerts",
  },
  {
    tactic: "Prompt / prefix cache",
    wins: "Shared system prompts + large doc prefixes across tenants (where allowed)",
    watch: "Privacy boundaries — never cross-tenant bleed keys",
  },
  {
    tactic: "Deduped fan-out",
    wins: "Burst traffic to same answer — collapse in-flight requests",
    watch: "Thundering herd on cold miss — add jitter and backoff",
  },
  {
    tactic: "Batch & offline queues",
    wins: "Summaries, indexing, low-interactive workloads",
    watch: "User expectation mismatch if UI promises realtime",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
] as const;

export function CacheStrategyTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Tactic</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Best COGS / latency wins</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">What breaks trust</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow
              key={row.tactic}
              className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}
            >
              <TableCell className="font-medium whitespace-normal">{row.tactic}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.wins}</TableCell>
              <TableCell className="whitespace-normal">{row.watch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
