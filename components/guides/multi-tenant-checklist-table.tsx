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
    concern: "Prompt & completion logs",
    pattern: "Tenant-scoped storage + TTL; redact PII per contract",
    pmCheck: "Export / delete story matches sales promises",
  },
  {
    concern: "Retrieval corpus",
    pattern: "Logical isolation (prefix, collection, ACL on chunks)",
    pmCheck: "Demo “wrong tenant doc” regression test in QA",
  },
  {
    concern: "API keys & models",
    pattern: "BYOK pool vs shared pool — billing attribution per tenant",
    pmCheck: "Invoice line items reconcile with usage dashboards",
  },
  {
    concern: "Eval & analytics events",
    pattern: "Stable tenant ID on every event — joins to traces",
    pmCheck: "CS can filter incidents without engineering SQL",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function MultiTenantChecklistTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Isolation concern</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Engineering pattern</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">PM acceptance hook</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.concern} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.concern}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.pattern}</TableCell>
              <TableCell className="whitespace-normal">{row.pmCheck}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
