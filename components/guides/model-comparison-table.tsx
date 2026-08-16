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
] as const;

/** Illustrative tiers only — vendor SKUs and prices change frequently. */
export const MODEL_ARCHETYPE_ROWS = [
  {
    archetype: "Edge / fast class",
    context: "~128K–200K",
    latency: "~0.4–0.9s TTFT",
    throughput: "~80–120 tps",
    inputPerM: "$0.15–$1",
    outputPerM: "$0.60–$4",
    notes: "Low-latency chat, classification, routing",
  },
  {
    archetype: "Balanced flagship",
    context: "~200K",
    latency: "~0.6–1.2s TTFT",
    throughput: "~45–95 tps",
    inputPerM: "$3–$8",
    outputPerM: "$15–$25",
    notes: "General assistants, drafting, multi-step tools",
  },
  {
    archetype: "Frontier reasoning",
    context: "~200K–1M",
    latency: "~0.8–2s TTFT",
    throughput: "~40–95 tps",
    inputPerM: "$5–$15",
    outputPerM: "$25–$75",
    notes: "Hard analysis, long chains, vision + tools",
  },
] as const;

export function ModelComparisonTable() {
  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[10rem] whitespace-normal">
              Archetype
            </TableHead>
            <TableHead className="whitespace-normal">Context</TableHead>
            <TableHead className="whitespace-normal">Latency (indicative)</TableHead>
            <TableHead className="whitespace-normal">Throughput</TableHead>
            <TableHead className="whitespace-normal">Input ($/M tok)</TableHead>
            <TableHead className="whitespace-normal">Output ($/M tok)</TableHead>
            <TableHead className="min-w-[12rem] whitespace-normal">
              Typical fit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MODEL_ARCHETYPE_ROWS.map((row, i) => (
            <TableRow
              key={row.archetype}
              className={cn(
                ROW_LEFT_ACCENT[i] ?? ROW_LEFT_ACCENT[0],
                i % 2 === 1 && "bg-muted/20"
              )}
            >
              <TableCell className="font-medium whitespace-normal">
                {row.archetype}
              </TableCell>
              <TableCell className="whitespace-normal">{row.context}</TableCell>
              <TableCell className="whitespace-normal">{row.latency}</TableCell>
              <TableCell className="whitespace-normal">{row.throughput}</TableCell>
              <TableCell className="whitespace-normal">{row.inputPerM}</TableCell>
              <TableCell className="whitespace-normal">{row.outputPerM}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">
                {row.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
