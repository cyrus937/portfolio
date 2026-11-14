import { Braces, Cloud, Database, Layers, Brain, Smartphone, Workflow } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { skillGroups, type Skill } from "@/content/skills";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { cn } from "@/lib/cn";
import { m } from "motion/react";

const icons: Record<string, typeof Braces> = {
  languages: Braces,
  backend: Layers,
  ml: Brain,
  cloud: Cloud,
  data: Database,
  frontend: Smartphone,
  practices: Workflow,
};

function Level({ level }: { level: number }) {
  return (
    <span className="flex gap-1" role="img" aria-label={`${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <m.span
          key={n}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + n * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-1.5 w-4 origin-left rounded-full", n <= level ? "bg-accent" : "bg-line-strong")}
        />
      ))}
    </span>
  );
}

function SkillRow({ s }: { s: Skill }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="text-sm">{s.name}</span>
      {s.level && <Level level={s.level} />}
    </li>
  );
}

export function Skills() {
  const { t } = useLocale();
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow={t(ui.skills.eyebrow)}
          title={t(ui.skills.title)}
          titleEm={t(ui.skills.titleEm)}
          lead={t(ui.skills.lead)}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.id] ?? Braces;
            const wide = g.span === "wide";
            return (
              <Reveal key={g.id} delay={(i % 3) * 0.08} className={cn(wide && "lg:col-span-2")}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent-ink">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-xs text-subtle">
                      <span className="text-2xl font-semibold tracking-tight text-fg">{g.years}</span> {t(ui.skills.years)}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{t(g.title)}</h3>
                  <p className="mt-1 text-sm text-muted">{t(g.blurb)}</p>
                  {g.skills.every((s) => !s.level) ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {g.skills.map((s) => (
                        <li key={s.name} className="rounded-full border border-line px-3 py-1.5 text-sm">
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className={cn("mt-5", wide && "sm:grid sm:grid-cols-2 sm:gap-x-8")}>
                      {g.skills.map((s) => (
                        <SkillRow key={s.name} s={s} />
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
