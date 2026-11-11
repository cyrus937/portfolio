import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";
const base =
  "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-medium tracking-tight transition-[transform,background-color,border-color,color] duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:shadow-[0_0_0_6px_var(--accent-soft)]",
  ghost: "border border-line-strong bg-surface/50 text-fg backdrop-blur hover:border-fg/40 hover:bg-surface",
};

/** Label slides up on hover and is replaced by a copy from below. */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: ReactNode }) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <Label>{children}</Label>
      {icon}
    </a>
  );
}

export function Button({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; icon?: ReactNode }) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Label>{children}</Label>
      {icon}
    </button>
  );
}
