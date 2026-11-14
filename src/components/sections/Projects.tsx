import { ArrowRight, ArrowUpRight, Award, FlaskConical, Radio, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLocale } from "@/lib/i18n";
import { Link, pathFor } from "@/lib/router";
import { projects, type Project } from "@/content/projects";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { Tag } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { OpenSource } from "./OpenSource";
import { cn } from "@/lib/cn";

function BadgeIcon({ p }: { p: Project }) {
  if (p.live) return <Radio className="size-3 text-emerald-500" />;
  if (p.visual === "gossip") return <FlaskConical className="size-3 text-accent-ink" />;
  if (p.repo) return <Sparkles className="size-3 text-accent-ink" />;
  return <Award className="size-3 text-accent-ink" />;
}

const iconBtn =
  "relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-line-strong bg-surface transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { t, locale } = useLocale();
  const tall = p.span === "tall";
  const href = p.caseStudy ? pathFor(locale, { name: "project", id: p.id }) : undefined;

  return (
    <Reveal delay={(i % 3) * 0.08} className={cn(p.span === "wide" && "lg:col-span-2", tall && "lg:row-span-2", "min-w-0")}>
      <SpotlightCard className={cn("flex h-full flex-col", href && "cursor-pointer")} data-cursor={href ? t(ui.caseStudy.cursor) : undefined}>
        <div
          className={cn(
            "relative overflow-hidden border-b border-line bg-bg-elev/60",
            tall ? "h-64 lg:h-auto lg:min-h-64 lg:flex-1" : "h-56",
          )}
        >
          <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover/spot:scale-[1.03]">
            <ProjectVisual kind={p.visual} />
          </div>
          {p.badge && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg backdrop-blur">
              <BadgeIcon p={p} />
              {t(p.badge)}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {t(p.kind)} · {p.year}
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {href ? (
                // Stretched link: the whole card opens the case study.
                <Link to={href} data-stretched className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                  {t(p.title)}
                </Link>
              ) : (
                t(p.title)
              )}
            </h3>
            <div className="flex gap-2">
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`GitHub — ${t(p.title)}`} className={iconBtn}>
                  <SiGithub className="size-4" />
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${t(ui.projects.live)} — ${t(p.title)}`} className={cn(iconBtn, "hover:rotate-45")}>
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted">{t(p.summary)}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {p.points.map((pt, k) => (
              <li key={k} className="flex gap-2.5">
                <span aria-hidden className="text-accent-ink">↳</span>
                {t(pt)}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            {href && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                {t(ui.caseStudy.read)}
                <ArrowRight className="size-4 text-accent-ink transition-transform duration-300 group-hover/spot:translate-x-1" />
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export function Projects() {
  const { t } = useLocale();
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow={t(ui.projects.eyebrow)}
          title={t(ui.projects.title)}
          titleEm={t(ui.projects.titleEm)}
          lead={t(ui.projects.lead)}
        />
        <div className="grid grid-flow-dense gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <OpenSource />
      </div>
    </section>
  );
}
