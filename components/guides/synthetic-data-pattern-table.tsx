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
    pattern: "Data augmentation",
    idea: "Transform or perturb existing real examples (paraphrase, noise, rotation)",
    pros: "Cheap, preserves the real distribution",
    cons: "Doesn't add genuinely new signal",
  },
  {
    pattern: "LLM-generated examples",
    idea: "Prompt an LLM to generate labeled training or eval examples",
    pros: "Fast to bootstrap eval sets and rare classes",
    cons: "Can encode the generating model's own biases and blind spots",
  },
  {
    pattern: "Simulation / programmatic generation",
    idea: "Rule-based or simulated environments generate data and labels",
    pros: "Full control over edge cases and ground truth",
    cons: "Sim-to-real gap; can miss real-world messiness",
  },
  {
    pattern: "Privacy-preserving synthetic replicas",
    idea: "A generative model trained on real data produces a synthetic replica dataset",
    pros: "Enables sharing and testing without exposing PII",
    cons: "Can still leak signal about real records if not audited",
  },
] as const;

export function SyntheticDataPatternTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[9rem] whitespace-normal">Pattern</TableHead>
            <TableHead className="min-w-[10rem] whitespace-normal">Core idea</TableHead>
            <TableHead className="min-w-[9rem] whitespace-normal">Upside</TableHead>
            <TableHead className="min-w-[9rem] whitespace-normal">Watch-outs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.pattern} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.pattern}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.idea}</TableCell>
              <TableCell className="whitespace-normal">{row.pros}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.cons}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
