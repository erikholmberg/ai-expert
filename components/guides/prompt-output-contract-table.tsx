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
    mode: "Free-form prose",
    when: "Exploration, creative drafts, low structured downstream use",
    tradeoff: "Cheap to prompt-test — expensive to parse reliably in apps",
  },
  {
    mode: "JSON / schema mode",
    when: "UI rendering, tools, billing codes, strict pipelines",
    tradeoff: "Repair loops & validation UX — budget retries in latency",
  },
  {
    mode: "Few-shot exemplars",
    when: "Niche formats legal/clinical teams insist on seeing",
    tradeoff: "Token bloat; staleness when examples drift from prod data",
  },
  {
    mode: "Hard refusal templates",
    when: "Regulated domains; zero tolerance for invented facts",
    tradeoff: "Support load — pair with escalation paths, not silent fails",
  },
] as const;

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function PromptOutputContractTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="whitespace-normal">Output posture</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Typical fit</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Product tradeoff</TableHead>
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
              <TableCell className="whitespace-normal">{row.tradeoff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
