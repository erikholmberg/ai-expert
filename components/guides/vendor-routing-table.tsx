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
    driver: "Outage / regional unavailable",
    approach: "Automatic failover to mirror SKU or degraded mode message",
    tradeoff: "Must reconcile eval parity across vendors",
  },
  {
    driver: "Cost vs quality tiers",
    approach: "Route simple intents to small model; escalate on confidence",
    tradeoff: "Needs intent router eval — misroutes annoy power users",
  },
  {
    driver: "Capability gap (e.g. vision)",
    approach: "Secondary provider only for multimodal paths",
    tradeoff: "Two billing relationships + latency variance",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
] as const;

export function VendorRoutingTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Why route</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Pattern</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">Tradeoff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.driver} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.driver}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.approach}</TableCell>
              <TableCell className="whitespace-normal">{row.tradeoff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
