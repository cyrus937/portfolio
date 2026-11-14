import { AnimatePresence, m } from "motion/react";
import {
  ArrowRight, BookOpen, Briefcase, PenLine, TerminalSquare, Code2, CornerDownLeft, Download, FolderGit2, GraduationCap, Home, Languages,
  Mail, Monitor, Moon, Search, Sun, User,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { useLocale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useScrollTo } from "@/lib/scroll";
import { pathFor, useRouter } from "@/lib/router";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

type Item = { id: string; group: string; label: string; Icon: ComponentType<{ className?: string }>; run: () => void; hint?: string };

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { t, toggleLocale, locale } = useLocale();
  const { setPref, pref } = useTheme();
  const scrollTo = useScrollTo();
  const { navigate } = useRouter();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const items: Item[] = useMemo(() => {
    const nav = t(ui.palette.navigate);
    const act = t(ui.palette.actions);
    const lnk = t(ui.palette.links);
    const cs = t(ui.palette.caseStudies);
    const go = (id: string) => () => scrollTo(id);
    return [
      { id: "home", group: nav, label: t(ui.palette.home), Icon: Home, run: go("top") },
      { id: "about", group: nav, label: t(ui.nav.about), Icon: User, run: go("about") },
      { id: "experience", group: nav, label: t(ui.nav.experience), Icon: Briefcase, run: go("experience") },
      { id: "projects", group: nav, label: t(ui.nav.projects), Icon: FolderGit2, run: go("projects") },
      { id: "skills", group: nav, label: t(ui.nav.skills), Icon: Code2, run: go("skills") },
      { id: "education", group: nav, label: t(ui.palette.education), Icon: GraduationCap, run: go("education") },
      { id: "contact", group: nav, label: t(ui.nav.contact), Icon: Mail, run: go("contact") },
      { id: "blog", group: nav, label: t(ui.blog.nav), Icon: PenLine, run: () => navigate(pathFor(locale, { name: "blog" })) },
      ...projects
        .filter((p) => p.caseStudy)
        .map((p) => ({
          id: `cs-${p.id}`,
          group: cs,
          label: t(p.title),
          Icon: BookOpen,
          hint: t(p.kind),
          run: () => navigate(pathFor(locale, { name: "project", id: p.id })),
        })),
      { id: "terminal", group: act, label: t(ui.palette.terminal), Icon: TerminalSquare, run: () => { scrollTo("top"); setTimeout(() => (document.querySelector('[aria-label="Terminal command"], [aria-label="Commande du terminal"]') as HTMLInputElement | null)?.focus(), 900); } },
      { id: "copy", group: act, label: t(ui.palette.copyEmail), Icon: Mail, run: () => navigator.clipboard?.writeText(profile.email), hint: profile.email },
      { id: "cv", group: act, label: t(ui.palette.downloadCv), Icon: Download, run: () => window.open(profile.cv[locale], "_blank") },
      { id: "dark", group: act, label: t(ui.palette.themeDark), Icon: Moon, run: () => setPref("dark"), hint: pref === "dark" ? "✓" : undefined },
      { id: "light", group: act, label: t(ui.palette.themeLight), Icon: Sun, run: () => setPref("light"), hint: pref === "light" ? "✓" : undefined },
      { id: "system", group: act, label: t(ui.palette.themeSystem), Icon: Monitor, run: () => setPref("system"), hint: pref === "system" ? "✓" : undefined },
      { id: "lang", group: act, label: t(ui.palette.switchLang), Icon: Languages, run: toggleLocale, hint: locale === "en" ? "FR" : "EN" },
      { id: "gh", group: lnk, label: "GitHub", Icon: SiGithub, run: () => window.open(profile.links.github, "_blank"), hint: "cyrus937" },
      { id: "li", group: lnk, label: "LinkedIn", Icon: FaLinkedinIn, run: () => window.open(profile.links.linkedin, "_blank") },
    ];
  }, [t, scrollTo, locale, pref, setPref, toggleLocale, navigate]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => setIdx(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${idx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const run = (item?: Item) => {
    if (!item) return;
    setOpen(false);
    // let the modal close before scrolling
    setTimeout(item.run, 60);
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-bg/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="card relative w-full max-w-xl overflow-hidden !rounded-2xl bg-bg-elev"
            data-lenis-prevent
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-subtle" />
              <input
                ref={inputRef}
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIdx((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIdx((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    run(filtered[idx]);
                  }
                }}
                placeholder={t(ui.palette.placeholder)}
                className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle focus-visible:outline-none"
                aria-activedescendant={filtered[idx] ? `cmd-${filtered[idx].id}` : undefined}
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">ESC</kbd>
            </div>
            <ul ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-subtle">{t(ui.palette.empty)}</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.id} role="none">
                    {header && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{item.group}</p>}
                    <button
                      id={`cmd-${item.id}`}
                      role="option"
                      aria-selected={i === idx}
                      data-idx={i}
                      onMouseMove={() => setIdx(i)}
                      onClick={() => run(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        i === idx ? "bg-surface-2 text-fg" : "text-muted",
                      )}
                    >
                      <item.Icon className={cn("size-4", i === idx && "text-accent-ink")} />
                      {item.label}
                      <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-subtle">
                        {item.hint}
                        {i === idx && (item.group === t(ui.palette.navigate) ? <ArrowRight className="size-3.5" /> : <CornerDownLeft className="size-3.5" />)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
