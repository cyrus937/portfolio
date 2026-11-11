import type { ReactNode } from "react";
import { m } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLocale } from "@/lib/i18n";
import { Link, pathFor } from "@/lib/router";
import { caseStudyIds, getProject } from "@/content/projects";
import { ui } from "@/content/ui";
import { Reveal, WordReveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Diagram } from "@/components/Diagram";
import { CodeBlock } from "@/components/CodeBlock";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 sm:py-20 lg:grid-cols-12 lg:gap-10">
      <Reveal className="lg:col-span-4">
        <p className="font-mono text-xs text-accent-ink">{n}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </section>
  );
}

export function ProjectPage({ id }: { id: string }) {
  const { t, locale, home } = useLocale();
  const p = getProject(id)!;
  const cs = p.caseStudy!;
  const nextId = caseStudyIds[(caseStudyIds.indexOf(id) + 1) % caseStudyIds.length];
  const next = getProject(nextId)!;
  const c = ui.caseStudy;

  return (
    <article className="pb-10 pt-28 sm:pt-32">
      <div className="container-page">
        {/* Header */}
        <m.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to={home} hash="projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t(c.back)}
          </Link>
        </m.div>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
            >
              {t(p.kind)} · {p.year}
            </m.p>
            <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              <WordReveal key={locale} text={t(p.title)} immediate delay={0.1} />
            </h1>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
            >
              {t(p.summary)}
            </m.p>
          </div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end"
          >
            {p.repo && (
              <Magnetic>
                <ButtonLink variant="ghost" href={p.repo} target="_blank" rel="noreferrer" icon={<SiGithub className="size-4" />}>
                  {t(c.source)}
                </ButtonLink>
              </Magnetic>
            )}
            {p.live && (
              <Magnetic>
                <ButtonLink href={p.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight className="size-4" />}>
                  {t(c.live)}
                </ButtonLink>
              </Magnetic>
            )}
          </m.div>
        </header>

        {/* Meta */}
        <m.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
        >
          {[
            [t(c.role), t(cs.role)],
            [t(c.status), t(cs.status)],
            [t(c.year), p.year],
          ].map(([k, v], i) => (
            <div key={k} className={i === 0 ? "col-span-2 bg-bg p-5 lg:col-span-1" : "bg-bg p-5"}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{k}</dt>
              <dd className="mt-1.5 text-sm">{v}</dd>
            </div>
          ))}
          <div className="col-span-2 bg-bg p-5 lg:col-span-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t(c.stack)}</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </dd>
          </div>
        </m.dl>

        {/* Hero visual */}
        <m.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card mt-6 h-[300px] overflow-hidden !rounded-3xl sm:h-[420px]"
        >
          <ProjectVisual kind={p.visual} />
        </m.div>

        <div className="mt-10">
          <Block n="01" title={t(c.problem)}>
            <Reveal>
              <p className="text-pretty text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{t(cs.problem)}</p>
            </Reveal>
          </Block>

          <Block n="02" title={t(c.approach)}>
            <ol className="grid gap-4 sm:grid-cols-2">
              {cs.approach.map((a, i) => (
                <Reveal as="li" key={i} delay={(i % 2) * 0.08} className="card p-6">
                  <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{t(a.title)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(a.body)}</p>
                </Reveal>
              ))}
            </ol>
          </Block>

          <Block n="03" title={t(c.architecture)}>
            <Diagram data={cs.architecture} />
          </Block>

          {cs.code && (
            <Block n="04" title={t(c.inAction)}>
              <Reveal>
                <CodeBlock code={cs.code.snippet} title={cs.code.file} copyLabel={t(c.copy)} copiedLabel={t(c.copied)} />
              </Reveal>
            </Block>
          )}

          <Block n={cs.code ? "05" : "04"} title={t(c.results)}>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {cs.results.map((r, i) => (
                <Reveal key={i} delay={i * 0.08} className="bg-bg p-6">
                  <p className="text-5xl font-semibold tracking-[-0.05em] text-accent-ink">{r.value}</p>
                  <p className="mt-3 text-sm leading-snug text-muted">{t(r.label)}</p>
                </Reveal>
              ))}
            </div>
          </Block>

          <Block n={cs.code ? "06" : "05"} title={t(c.learnings)}>
            <ul className="space-y-5">
              {cs.learnings.map((l, i) => (
                <Reveal as="li" key={i} delay={i * 0.08} className="flex gap-4 text-lg leading-relaxed">
                  <span aria-hidden className="font-display text-2xl leading-none text-accent-ink">“</span>
                  {t(l)}
                </Reveal>
              ))}
            </ul>
          </Block>
        </div>

        {/* Next */}
        <Reveal>
          <Link
            to={pathFor(locale, { name: "project", id: nextId })}
            className="group card relative mt-6 flex items-center justify-between gap-6 overflow-hidden p-8 sm:p-12"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t(c.next)}</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-accent-ink sm:text-5xl">
                {t(next.title)}
              </p>
              <p className="mt-2 text-muted">{t(next.kind)}</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45 sm:size-20">
              <ArrowRight className="size-6" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
