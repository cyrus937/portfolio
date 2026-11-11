import { Monitor, Moon, Sun } from "lucide-react";
import { m } from "motion/react";
import { useId } from "react";
import { useLocale } from "@/lib/i18n";
import { useTheme, type ThemePref } from "@/lib/theme";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

const options: { value: ThemePref; Icon: typeof Sun; label: keyof typeof ui.a11y }[] = [
  { value: "light", Icon: Sun, label: "themeLight" },
  { value: "dark", Icon: Moon, label: "themeDark" },
  { value: "system", Icon: Monitor, label: "themeSystem" },
];

/** Segmented control: light / dark / auto. */
export function ThemeSwitch({ className, showLabels = false }: { className?: string; showLabels?: boolean }) {
  const { pref, setPref } = useTheme();
  const { t } = useLocale();
  const id = useId();

  return (
    <div
      role="radiogroup"
      aria-label={t(ui.a11y.theme)}
      className={cn("relative flex items-center rounded-full border border-line bg-surface/70 p-1 backdrop-blur", className)}
    >
      {options.map(({ value, Icon, label }) => {
        const selected = pref === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={selected}
            title={t(ui.a11y[label])}
            onClick={(e) => setPref(value, e.clientX || e.clientY ? { x: e.clientX, y: e.clientY } : undefined)}
            className={cn(
              "relative flex h-8 items-center justify-center gap-1.5 rounded-full text-xs transition-colors",
              showLabels ? "flex-1 px-3" : "w-8",
              selected ? "text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {selected && (
              <m.span
                layoutId={`theme-pill-${id}`}
                className="absolute inset-0 rounded-full border border-line-strong bg-surface-2"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon className="relative size-3.5" strokeWidth={2} />
            {showLabels ? <span className="relative">{t(ui.a11y[label])}</span> : <span className="sr-only">{t(ui.a11y[label])}</span>}
          </button>
        );
      })}
    </div>
  );
}
