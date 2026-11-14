import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { experiences, type Experience as Exp } from "@/content/experience";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

const VISIBLE = 3;

function Item({ exp, index }: { exp: Exp; index: number }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const shown = exp.highlights.slice(0, VISIBLE);
  const extra = exp.highlights.slice(VISIBLE);

  return (
    <li className="relative grid gap-4 pl-10 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0">
      {/* Dot */}
      <span
        aria-hidden
        className={cn(
          "absolute left-[3px] top-2 z-10 size-[11px] rounded-full border-2 border-bg md:left-[195px]",
          exp.current ? "bg-accent shadow-[0_0_0_6px_var(--accent-soft)]" : "bg-line-strong",
        )}
      />

      <Reveal delay={0.05} className="md:pr-8 md:pt-0.5 md:text-right">
        <p className="font-mono text-xs tracking-wide text-muted">
          {t(exp.start)} — {t(exp.end)}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-subtle">
          <MapPin className="size-3" />
          {t(exp.location)}
        </p>
      </Reveal>

      <Reveal delay={0.1 + index * 0.02} className="md:pl-12">
        <SpotlightCard className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{t(exp.role)}</h3>
              <p className="mt-1 text-base">
                <span className="font-medium text-accent-ink">{exp.company}</span>
                {exp.context && <span className="text-muted"> · {t(exp.context)}</span>}
              </p>
            </div>
            {exp.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-fg">
                <span className="relative size-1.5 rounded-full bg-accent-fg dot-ping" />
                {t(ui.experience.now)}
              </span>
            )}
          </div>

          <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
            {shown.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-ink" />
                {t(h)}
              </li>
            ))}
          </ul>
          <AnimatePresence initial={false}>
            {open && extra.length > 0 && (
              <m.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2.5 overflow-hidden text-[15px] leading-relaxed text-muted"
              >
                {extra.map((h, i) => (
                  <li key={i} className="flex gap-3 first:pt-2.5">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-ink" />
                    {t(h)}
                  </li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>

          {extra.length > 0 && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fg/80 transition-colors hover:text-accent-ink"
            >
              {t(open ? ui.experience.less : ui.experience.more)}
              <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
            </button>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {exp.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </SpotlightCard>
      </Reveal>
    </li>
  );
}

export function Experience() {
  const { t } = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow={t(ui.experience.eyebrow)}
          title={t(ui.experience.title)}
          titleEm={t(ui.experience.titleEm)}
          lead={t(ui.experience.lead)}
        />

        <ol ref={listRef} className="relative space-y-10 md:space-y-14">
          {/* Rail */}
          <span aria-hidden className="absolute bottom-0 left-2 top-2 w-px bg-line md:left-[200px]" />
          <m.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-2 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0 md:left-[200px]"
          />
          {experiences.map((e, i) => (
            <Item key={e.id} exp={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
