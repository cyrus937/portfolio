import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { useScrollTo } from "@/lib/scroll";
import { Link, pathFor, useRouter } from "@/lib/router";
import { useActiveSection } from "@/lib/useActiveSection";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { ThemeSwitch } from "./ThemeSwitch";

export const sections = ["about", "experience", "projects", "skills", "contact"] as const;

function LangToggle() {
  const { locale, toggleLocale, t } = useLocale();
  return (
    <button
      onClick={toggleLocale}
      aria-label={t(ui.a11y.lang)}
      className="flex h-10 items-center rounded-full border border-line bg-surface/70 px-1 font-mono text-[11px] backdrop-blur"
    >
      {(["en", "fr"] as const).map((l) => (
        <span
          key={l}
          className={cn(
            "rounded-full px-2 py-1.5 uppercase transition-colors",
            locale === l ? "bg-surface-2 text-fg" : "text-subtle",
          )}
        >
          {l}
        </span>
      ))}
    </button>
  );
}

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { t, home } = useLocale();
  const scrollTo = useScrollTo();
  const { route, locale } = useRouter();
  const onBlog = route.name === "blog" || route.name === "post";
  const activeSection = useActiveSection(sections as unknown as string[]);
  const active = route.name === "home" ? activeSection : "";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <div className="container-page">
          <nav
            className={cn(
              "flex h-14 items-center justify-between gap-3 rounded-full border px-2 pl-4 transition-[background-color,border-color,box-shadow] duration-500",
              scrolled || open
                ? "border-line bg-bg/70 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <a
              href={home}
              onClick={(e) => {
                e.preventDefault();
                go("top");
              }}
              className="group flex items-center gap-2.5"
            >
              <span className="relative grid size-8 place-items-center rounded-lg bg-fg font-mono text-[13px] font-bold text-bg transition-transform duration-500 group-hover:rotate-[-8deg]">
                ck
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" />
              </span>
              <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
            </a>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur md:flex">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`${home}#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(id);
                    }}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                      active === id ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active === id && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line-strong"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t(ui.nav[id])}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={pathFor(locale, { name: "blog" })}
                  className={cn(
                    "relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                    onBlog ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {onBlog && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line-strong"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t(ui.blog.nav)}</span>
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPalette}
                aria-label={t(ui.a11y.palette)}
                className="hidden h-10 items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 font-mono text-[11px] text-muted backdrop-blur transition-colors hover:text-fg lg:flex"
              >
                <Command className="size-3.5" />K
              </button>
              <div className="hidden sm:block">
                <LangToggle />
              </div>
              <ThemeSwitch className="hidden sm:flex" />
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={t(open ? ui.a11y.close : ui.a11y.menu)}
                aria-expanded={open}
                className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 md:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex h-full flex-col pt-28 pb-10">
              <ul className="flex flex-col gap-1">
                {sections.map((id, i) => (
                  <m.li
                    key={id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`${home}#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(id);
                      }}
                      className="flex items-baseline gap-4 border-b border-line py-4 text-4xl font-semibold tracking-tight"
                    >
                      <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                      {t(ui.nav[id])}
                    </a>
                  </m.li>
                ))}
                <m.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + sections.length * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={pathFor(locale, { name: "blog" })}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-4xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent-ink">0{sections.length + 1}</span>
                    {t(ui.blog.nav)}
                  </Link>
                </m.li>
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <ThemeSwitch showLabels className="w-full" />
                <div className="flex justify-between">
                  <LangToggle />
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
