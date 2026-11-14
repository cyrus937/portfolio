import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLocale } from "@/lib/i18n";
import { featuredRepos, github, langColors } from "@/content/github";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { m } from "motion/react";

function ago(iso: string, locale: "en" | "fr", now: number) {
  const days = Math.max(0, Math.round((now - new Date(iso).getTime()) / 86_400_000));
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (days < 31) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
}

export function OpenSource() {
  const { t, locale } = useLocale();
  // Use the snapshot date (not "now") so server and client render identically.
  const now = new Date(github.fetchedAt).getTime();

  const repos = featuredRepos
    .map((f) => {
      const r = github.repos.find((x) => x.name === f.name);
      return r ? { ...r, desc: f.description ? t(f.description) : r.description } : null;
    })
    .filter((r): r is NonNullable<typeof r> => !!r);

  // Primary language per repo
  const counts = new Map<string, number>();
  for (const r of github.repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const langs = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const total = langs.reduce((n, [, c]) => n + c, 0);
  const top = langs.slice(0, 6);
  const other = total - top.reduce((n, [, c]) => n + c, 0);

  return (
    <div className="mt-24">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <SiGithub className="size-3.5" /> {t(ui.github.eyebrow)}
          </p>
          <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {t(ui.github.title)} <span className="font-display text-accent-ink">{t(ui.github.titleEm)}</span>
          </h3>
        </div>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          github.com/cyrus937
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      {/* Stats + language bar */}
      <Reveal className="card mb-5 grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-7">
        <dl className="flex gap-8">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t(ui.github.repos)}</dt>
            <dd className="text-3xl font-semibold tracking-tight">{github.user.publicRepos}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t(ui.github.since)}</dt>
            <dd className="text-3xl font-semibold tracking-tight">{github.user.since}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t(ui.github.langs)}</dt>
            <dd className="text-3xl font-semibold tracking-tight">{langs.length}</dd>
          </div>
        </dl>
        <div>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-2">
            {top.map(([name, c], i) => (
              <m.span
                key={name}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full origin-left"
                style={{ width: `${(c / total) * 100}%`, background: langColors[name] ?? "var(--fg-subtle)" }}
                title={`${name} · ${c}`}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
            {top.map(([name, c]) => (
              <li key={name} className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: langColors[name] ?? "var(--fg-subtle)" }} />
                {name} <span className="text-subtle">{Math.round((c / total) * 100)}%</span>
              </li>
            ))}
            {other > 0 && (
              <li className="text-subtle">
                {t(ui.github.other)} {Math.round((other / total) * 100)}%
              </li>
            )}
          </ul>
          <p className="mt-2 font-mono text-[10px] text-subtle">{t(ui.github.note)}</p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.06}>
            <SpotlightCard className="h-full">
              <a href={r.url} target="_blank" rel="noreferrer" className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex min-w-0 items-center gap-2 font-mono text-sm font-medium">
                    <GitFork className="size-3.5 shrink-0 text-subtle" />
                    <span className="truncate">{r.name}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-accent-ink" />
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{r.desc}</p>
                <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-[11px] text-subtle">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ background: langColors[r.language] ?? "var(--fg-subtle)" }} />
                      {r.language}
                    </span>
                  )}
                  {r.stars > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3" /> {r.stars}
                    </span>
                  )}
                  <span className="ml-auto">{ago(r.pushedAt, locale, now)}</span>
                </div>
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
