import { cn } from "@/lib/utils";

export function GuideShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 py-8", className)}>
      {children}
    </div>
  );
}
