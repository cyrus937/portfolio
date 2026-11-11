import { useLocale } from "@/lib/i18n";
import { now } from "@/content/now";
import { ui } from "@/content/ui";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/pages/Blog";

export function Now() {
  const { t, locale } = useLocale();
  return (
    <section aria-labelledby="now-title" className="relative pb-8">
      <div className="container-page">
        <Reveal className="card relative overflow-hidden p-6 sm:p-10">
          <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full opacity-60 blur-[90px]" style={{ background: "var(--glow)" }} />
          <div className="relative flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="now-title" className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight">
              <span className="relative size-2.5 rounded-full bg-accent dot-ping" />
              {t(ui.now.eyebrow)}
            </h2>
            <p className="font-mono text-xs text-subtle">
              {t(ui.now.updated)} <time dateTime={now.updated}>{formatDate(now.updated, locale)}</time>
            </p>
          </div>
          <dl className="relative mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {now.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.06} className="border-t border-line pt-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">{t(it.k)}</dt>
                <dd className="mt-2 text-pretty leading-relaxed">{t(it.v)}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
