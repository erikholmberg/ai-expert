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
    mode: "Keyword (sparse)",
    when: "IDs, policy numbers, product codes, known titles",
    pros: "Fast, cheap, exact token overlap",
    cons: "Paraphrase & typos break recall",
  },
  {
    mode: "Dense (embeddings)",
    when: "“Similar ideas” not exact words; long unstructured blobs",
    pros: "Semantic similarity; tolerant wording",
    cons: "Cold-start corpus tuning; can blur distinct entities",
  },
  {
    mode: "Hybrid",
    when: "Must recover both literal SKUs and fuzzy descriptions",
    pros: "Best recall breadth on messy enterprise corpora",
    cons: "Fusion weights + infra — tune with labeled misses",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function SearchModeComparisonTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[8rem] whitespace-normal">Mode</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">Reach for it when…</TableHead>
            <TableHead className="whitespace-normal">Strength</TableHead>
            <TableHead className="whitespace-normal">Watch-outs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow
              key={row.mode}
              className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}
            >
              <TableCell className="font-medium whitespace-normal">{row.mode}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.when}</TableCell>
              <TableCell className="whitespace-normal">{row.pros}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.cons}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
