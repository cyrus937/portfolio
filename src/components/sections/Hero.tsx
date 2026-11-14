import { m, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { Terminal } from "@/components/Terminal";
import { track } from "@/lib/analytics";
import { introDelay } from "@/lib/intro";
import { useLocale } from "@/lib/i18n";
import { useScrollTo } from "@/lib/scroll";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WordReveal } from "@/components/ui/Reveal";

/* ───────────── Hero ───────────── */

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { t, locale } = useLocale();
  const scrollTo = useScrollTo();
  const [D] = useState(introDelay);
  const ref = useRef<HTMLElement>(null);

  // Cursor spotlight over the grid
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mx}px ${my}px, var(--glow), transparent 70%)`;

  // Parallax out on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)]" />
        <m.div className="absolute inset-0" style={{ background: spotlight }} />
        <div
          className="absolute -top-40 left-[10%] h-[520px] w-[520px] rounded-full opacity-50 blur-[120px]"
          style={{ background: "var(--glow)", animation: "float-a 18s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 right-[5%] h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgb(56 189 248 / 0.18), transparent 70%)", animation: "float-b 22s ease-in-out infinite" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <m.div style={{ y, opacity }} className="container-page grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: D, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-xs text-muted backdrop-blur"
          >
            <span className="relative grid size-5 place-items-center rounded-full bg-accent-soft">
              <span className="relative size-1.5 rounded-full bg-accent dot-ping" />
            </span>
            {t(profile.availability)}
          </m.div>

          <p className="mb-4 font-mono text-sm text-muted">
            <WordReveal key={locale + "h"} text={t(ui.hero.hello)} immediate delay={D + 0.1} stagger={0.04} />
          </p>

          <h1 className="text-balance text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            <WordReveal key={locale + "1"} text={t(ui.hero.line1)} immediate delay={D + 0.2} />{" "}
            <WordReveal key={locale + "2"} text={t(ui.hero.line2a)} immediate delay={D + 0.4} />{" "}
            <WordReveal key={locale + "3"} text={t(ui.hero.line2b)} immediate delay={D + 0.6} className="font-display text-accent-ink" />
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: D + 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {t(ui.hero.sub)}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: D + 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("projects");
                }}
                icon={<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
              >
                {t(ui.hero.ctaWork)}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                variant="ghost"
                href={profile.cv[locale]}
                download
                onClick={() => track("cv_download", { from: "hero" })}
                icon={<Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />}
              >
                {t(ui.hero.ctaCv)}
              </ButtonLink>
            </Magnetic>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
          </m.div>
        </div>

        <div className="lg:col-span-5">
          <Terminal onOpenPalette={onOpenPalette} />
        </div>
      </m.div>

      <m.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.6 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-subtle transition-colors hover:text-fg sm:flex"
      >
        {t(ui.hero.scroll)}
        <m.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-3.5" />
        </m.span>
      </m.button>
    </section>
  );
}
