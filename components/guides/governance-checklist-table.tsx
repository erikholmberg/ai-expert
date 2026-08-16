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
    topic: "Data categories in prompts",
    pmArtifact: "Matrix: user content, account metadata, third-party docs, derived embeddings",
    buyerAsk: "What leaves our VPC? What is ephemeral vs stored?",
  },
  {
    topic: "Retention & deletion",
    pmArtifact: "TTL defaults per surface (logs, traces, vector rows) + customer-initiated delete",
    buyerAsk: "Right-to-erasure latency; backup carve-outs",
  },
  {
    topic: "Subprocessors & regions",
    pmArtifact: "Architecture diagram with inference, logging, storage regions labeled",
    buyerAsk: "Data residency; failover geography; cross-border transfers",
  },
  {
    topic: "Human review & training",
    pmArtifact: "Opt-in language; whether prompts improve vendor models; enterprise zero-retain SKUs",
    buyerAsk: "Model improvement clauses; audit rights on vendor change notices",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function GovernanceChecklistTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Topic</TableHead>
            <TableHead className="min-w-[12rem] whitespace-normal">PM-ready artifact</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Typical buyer question</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow
              key={row.topic}
              className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}
            >
              <TableCell className="font-medium whitespace-normal">{row.topic}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.pmArtifact}</TableCell>
              <TableCell className="whitespace-normal">{row.buyerAsk}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
