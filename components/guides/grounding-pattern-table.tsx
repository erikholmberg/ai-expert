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
    pattern: "Citation-backed answer",
    ux: "Inline sources, “jump to doc” links",
    backend: "RAG with chunk attribution; freshness SLAs",
  },
  {
    pattern: "Calibrated hedge",
    ux: "“Based on limited info…” + what would verify",
    backend: "Confidence routing; optional second-pass retrieval",
  },
  {
    pattern: "Hard abstain",
    ux: "Refuse + suggest human / ticket",
    backend: "Classifier or policy gate before generate",
  },
  {
    pattern: "Creative draft",
    ux: "Mode badge; no fabricated citations",
    backend: "Separate prompt path; disable retrieval hooks",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
] as const;

export function GroundingPatternTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Pattern</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">UX surface</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Typical backend hooks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.pattern} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.pattern}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.ux}</TableCell>
              <TableCell className="whitespace-normal">{row.backend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
