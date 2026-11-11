import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { testimonials } from "@/content/testimonials";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";

/** Renders nothing until real recommendations are added in content/testimonials.ts. */
export function Testimonials() {
  const { t } = useLocale();
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading index="★" eyebrow={t(ui.testimonials.eyebrow)} title={t(ui.testimonials.title)} titleEm={t(ui.testimonials.titleEm)} />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((q, i) => (
            <Reveal key={q.name} delay={(i % 2) * 0.08}>
              <SpotlightCard className="h-full p-7 sm:p-9">
                <figure className="flex h-full flex-col">
                  <span aria-hidden className="font-display text-6xl leading-none text-accent-ink">“</span>
                  <blockquote className="mt-2 text-pretty text-lg leading-relaxed">{t(q.quote)}</blockquote>
                  <figcaption className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <div>
                      <p className="font-semibold">{q.name}</p>
                      <p className="text-sm text-muted">{t(q.role)}</p>
                    </div>
                    {q.url && (
                      <a href={q.url} target="_blank" rel="noreferrer" aria-label="Source" className="text-subtle hover:text-fg">
                        <ArrowUpRight className="size-5" />
                      </a>
                    )}
                  </figcaption>
                </figure>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
