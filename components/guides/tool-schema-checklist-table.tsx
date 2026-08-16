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
    lever: "Narrow tool surface",
    detail: "Fewer functions with crisp names beat giant generic “doAnything” RPC",
    pmSignal: "Support tickets cite wrong tool picked — widen docs before widening surface",
  },
  {
    lever: "Deterministic args",
    detail: "Enums, bounded strings, max lengths — reject early with actionable messages",
    pmSignal: "Silent truncation causes wrong writes — surface validation to the model path",
  },
  {
    lever: "Idempotency tokens",
    detail: "Safe replays on timeouts — critical for payments, tickets, emails",
    pmSignal: "Duplicate side-effects after retries — missing idempotency story",
  },
  {
    lever: "Timeout budget",
    detail: "Fail fast; return partial progress markers the model can narrate",
    pmSignal: "Hung threads & angry users — align SLAs with streaming UX guide",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
] as const;

export function ToolSchemaChecklistTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Design lever</TableHead>
            <TableHead className="min-w-[12rem] whitespace-normal">What good looks like</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">PM smell</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow
              key={row.lever}
              className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}
            >
              <TableCell className="font-medium whitespace-normal">{row.lever}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.detail}</TableCell>
              <TableCell className="whitespace-normal">{row.pmSignal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
