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
    pattern: "Naive vector",
    idea: "Embed chunks; nearest neighbors to query",
    pros: "Fast to ship; few moving parts",
    cons: "Lexical mismatch; duplicate chunks hurt recall",
  },
  {
    pattern: "Hybrid (sparse + dense)",
    idea: "BM25-style + vectors fused or reranked",
    pros: "Better recall on keywords & SKUs",
    cons: "More infra; tuning fusion weights",
  },
  {
    pattern: "+ Cross-encoder rerank",
    idea: "Retrieve wide, rerank top-K with heavier model",
    pros: "Precision jump on ambiguous queries",
    cons: "Latency & cost at query time",
  },
  {
    pattern: "Agentic retrieval",
    idea: "Model plans sub-queries, tools, iterative fetch",
    pros: "Handles multi-hop reasoning",
    cons: "Fragile loops; hardest to eval",
  },
] as const;

export function RetrievalPatternTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[8rem] whitespace-normal">
              Pattern
            </TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">
              Core idea
            </TableHead>
            <TableHead className="min-w-[9rem] whitespace-normal">
              Upside
            </TableHead>
            <TableHead className="min-w-[9rem] whitespace-normal">
              Watch-outs
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow
              key={row.pattern}
              className={cn(
                ROW_LEFT_ACCENT[i]!,
                i % 2 === 1 && "bg-muted/20"
              )}
            >
              <TableCell className="font-medium whitespace-normal">
                {row.pattern}
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">
                {row.idea}
              </TableCell>
              <TableCell className="whitespace-normal">{row.pros}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">
                {row.cons}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
