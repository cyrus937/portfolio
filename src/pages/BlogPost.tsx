import { m, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type RefObject } from "react";
import { useLocale } from "@/lib/i18n";
import { Link, pathFor } from "@/lib/router";
import { getPost, postLoaders } from "@/content/posts";
import { getProject } from "@/content/projects";
import { ui } from "@/content/ui";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "./Blog";

// One stable lazy component per (slug, locale) so React can resume it during hydration.
const bodies = new Map<string, ComponentType>();
function bodyFor(slug: string, locale: "en" | "fr") {
  const key = `${slug}:${locale}`;
  if (!bodies.has(key)) bodies.set(key, lazy(postLoaders[slug][locale]) as unknown as ComponentType);
  return bodies.get(key)!;
}

function Toc({ root }: { root: RefObject<HTMLDivElement | null> }) {
  const { t } = useLocale();
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const read = () => {
      const hs = [...el.querySelectorAll("h2[id]")] as HTMLElement[];
      setItems(hs.map((h) => ({ id: h.id, text: h.textContent ?? "" })));
      const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-20% 0px -70% 0px" });
      hs.forEach((h) => io.observe(h));
      return io;
    };
    let io = read();
    // The MDX body may mount after this effect (lazy): re-read once it appears.
    const mo = new MutationObserver(() => {
      io.disconnect();
      io = read();
    });
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [root]);
  if (!items.length) return null;
  return (
    <nav aria-label={t(ui.blog.toc)} className="sticky top-28">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{t(ui.blog.toc)}</p>
      <ul className="space-y-2 border-l border-line text-sm">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`-ml-px block border-l py-0.5 pl-4 transition-colors ${active === it.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"}`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPost({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const post = getPost(slug)!;
  const Body = useMemo(() => bodyFor(slug, locale), [slug, locale]);
  const project = post.project ? getProject(post.project) : undefined;
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start 30%", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  return (
    <article className="pb-16 pt-28 sm:pt-32">
      <m.div aria-hidden style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[71] h-[3px] origin-left bg-accent" />
      <div className="container-page">
        <Link to={pathFor(locale, { name: "blog" })} className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          {t(ui.blog.back)}
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="font-mono text-xs text-subtle">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {post.readingTime} {t(ui.blog.read)}
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">{t(post.title)}</h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted sm:text-xl">{t(post.summary)}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_220px]">
          <div ref={bodyRef} className="prose min-w-0 max-w-[70ch]">
            <Suspense fallback={<div className="h-[60vh]" />}>
              <Body />
            </Suspense>
          </div>
          <aside className="hidden lg:block">
            <Toc root={bodyRef} />
          </aside>
        </div>

        {project && (
          <Link
            to={pathFor(locale, { name: "project", id: project.id })}
            className="group card mt-16 flex max-w-3xl items-center justify-between gap-6 p-6 sm:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t(ui.blog.related)}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-ink">{t(project.title)}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-accent-ink transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}
