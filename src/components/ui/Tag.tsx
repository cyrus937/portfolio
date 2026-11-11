import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
