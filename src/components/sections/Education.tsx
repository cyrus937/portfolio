import { BadgeCheck, GraduationCap, Users } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { certifications, education, leadership } from "@/content/education";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";

export function Education() {
  const { t } = useLocale();
  const total = certifications.reduce((n, g) => n + g.items.length, 0);
  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading index="05" eyebrow={t(ui.education.eyebrow)} title={t(ui.education.title)} titleEm={t(ui.education.titleEm)} />

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.08}>
                <SpotlightCard className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <GraduationCap className="size-5 text-accent-ink" strokeWidth={1.75} />
                    <span className="font-mono text-xs text-subtle">{e.period}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{t(e.degree)}</h3>
                  <p className="text-sm text-muted">
                    {e.school} · {t(e.location)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-subtle">{t(e.coursework)}</p>
                </SpotlightCard>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <SpotlightCard className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                    <Users className="size-4 text-accent-ink" /> {t(ui.education.leadership)}
                  </span>
                  <span className="font-mono text-xs text-subtle">{leadership.period}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {t(leadership.title)} · <span className="text-accent-ink">{leadership.org}</span>
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {leadership.points.map((p, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span aria-hidden className="text-accent-ink">↳</span>
                      {t(p)}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <SpotlightCard className="h-full p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  <BadgeCheck className="size-4 text-accent-ink" /> {t(ui.education.certs)}
                </span>
                <span className="font-display text-4xl text-accent-ink">{total}</span>
              </div>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {certifications.map((g) => (
                  <div key={g.group.en}>
                    <h4 className="mb-3 text-sm font-semibold">{t(g.group)}</h4>
                    <ul className="space-y-3">
                      {g.items.map((c) => (
                        <li key={c.name} className="group/c">
                          <p className="text-sm leading-snug transition-colors group-hover/c:text-accent-ink">{c.name}</p>
                          <p className="font-mono text-[11px] text-subtle">{c.issuer}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
