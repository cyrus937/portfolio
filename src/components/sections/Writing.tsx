import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { Link, pathFor } from "@/lib/router";
import { posts } from "@/content/posts";
import { ui } from "@/content/ui";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/pages/Blog";

export function Writing() {
  const { t, locale } = useLocale();
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);
  return (
    <section id="writing" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">{t(ui.blog.eyebrow)}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{t(ui.blog.latest)}</h2>
          </div>
          <Link to={pathFor(locale, { name: "blog" })} className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            {t(ui.blog.all)}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {latest.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
