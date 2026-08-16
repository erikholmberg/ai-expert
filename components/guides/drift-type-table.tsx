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
    type: "Data drift",
    changes: "Input feature distribution shifts (new user segment, seasonality)",
    signal: "Feature distributions diverge from the training baseline",
  },
  {
    type: "Concept drift",
    changes: "The relationship between inputs and the correct output changes",
    signal: "Accuracy drops on fresh labeled samples even though inputs look normal",
  },
  {
    type: "Feedback-loop drift",
    changes: "The model's own predictions shape the data it's later trained on",
    signal: "Metrics look great short-term, but diversity or coverage collapses over time",
  },
  {
    type: "Upstream schema drift",
    changes: "An upstream system changes a field, format, or logging behavior",
    signal: "Silent nulls, type mismatches, or a feature suddenly going flat",
  },
] as const;

export function DriftTypeTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="min-w-[9rem] whitespace-normal">Drift type</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">What changes</TableHead>
            <TableHead className="min-w-[11rem] whitespace-normal">Typical signal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, i) => (
            <TableRow key={row.type} className={cn(ROW_LEFT_ACCENT[i]!, i % 2 === 1 && "bg-muted/20")}>
              <TableCell className="font-medium whitespace-normal">{row.type}</TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">{row.changes}</TableCell>
              <TableCell className="whitespace-normal">{row.signal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
