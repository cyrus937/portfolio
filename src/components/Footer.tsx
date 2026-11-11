import { ArrowUp } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useScrollTo } from "@/lib/scroll";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";

export function Footer() {
  const { t } = useLocale();
  const scrollTo = useScrollTo();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-14">
      <div className="container-page flex flex-col gap-6 pb-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} · {t(ui.footer.built)}
          <span className="text-subtle"> — Vite · React · Tailwind · Motion</span>
        </p>
        <button onClick={() => scrollTo("top")} className="group inline-flex items-center gap-2 self-start transition-colors hover:text-fg sm:self-auto">
          {t(ui.footer.top)}
          <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-hover:-translate-y-1">
            <ArrowUp className="size-3.5" />
          </span>
        </button>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center text-[13.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: "1px var(--line-strong)", marginBottom: "-2.4vw" }}
      >
        {profile.name}
      </p>
    </footer>
  );
}
