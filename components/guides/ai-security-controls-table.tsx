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
    risk: "Prompt injection steers tools",
    lever: "Tool allowlists, argument schemas, human gates on writes",
    ownerHint: "Product + AppSec define tiers",
  },
  {
    risk: "Sensitive data in prompts / logs",
    lever: "Redaction, retention TTLs, regional residency, customer-managed keys",
    ownerHint: "Legal + Infra + PM acceptance criteria",
  },
  {
    risk: "Cross-tenant leakage via retrieval",
    lever: "Row-level security in vector DB; partition keys in retrieval filters",
    ownerHint: "Backend ownership — PM validates tenant stories",
  },
  {
    risk: "Untrusted content rendered to users",
    lever: "Output encoding, markdown sanitization, download policies",
    ownerHint: "Frontend + security review on rich render paths",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function AiSecurityControlsTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Risk lens</TableHead>
            <TableHead className="min-w-[12rem] whitespace-normal">Product-facing controls</TableHead>
            <TableHead className="min-w-[9rem] whitespace-normal">Who aligns</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.risk} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.risk}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.lever}</TableCell>
              <TableCell className="whitespace-normal">{row.ownerHint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
