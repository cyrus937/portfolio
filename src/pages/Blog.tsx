import { ArrowUpRight, Rss } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { Link, pathFor } from "@/lib/router";
import { posts, type PostMeta } from "@/content/posts";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { Tag } from "@/components/ui/Tag";

export function formatDate(iso: string, locale: "en" | "fr") {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostCard({ p, i }: { p: PostMeta; i: number }) {
  const { t, locale } = useLocale();
  return (
    <Reveal delay={i * 0.08}>
      <SpotlightCard className="h-full" data-cursor={t(ui.blog.cursor)}>
        <div className="flex h-full flex-col p-6 sm:p-8">
          <p className="font-mono text-xs text-subtle">
            <time dateTime={p.date}>{formatDate(p.date, locale)}</time> · {p.readingTime} {t(ui.blog.read)}
          </p>
          <h3 className="mt-3 text-balance text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            <Link to={pathFor(locale, { name: "post", slug: p.slug })} data-stretched className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {t(p.title)}
            </Link>
          </h3>
          <p className="mt-3 text-pretty leading-relaxed text-muted">{t(p.summary)}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-subtle transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-accent-ink" />
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Blog() {
  const { t, locale } = useLocale();
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-page">
        <SectionHeading as="h1" index="✎" eyebrow={t(ui.blog.eyebrow)} title={t(ui.blog.title)} titleEm={t(ui.blog.titleEm)} lead={t(ui.blog.lead)} />
        <div className="grid gap-5 md:grid-cols-2">
          {sorted.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>
        <Reveal className="mt-10">
          <a href={locale === "fr" ? "/fr/rss.xml" : "/rss.xml"} className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <Rss className="size-4 text-accent-ink" /> {t(ui.blog.rss)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
