import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { caseStudyIds } from "@/content/projects";
import { postSlugs } from "@/content/posts";

export type Locale = "en" | "fr";
export type Route =
  | { name: "home" }
  | { name: "project"; id: string }
  | { name: "blog" }
  | { name: "post"; slug: string }
  | { name: "notfound" };

/** Navigation intent consumed by the scroll manager after a route change. */
export type NavIntent = { key: number; hash?: string; keepScroll?: boolean };

export function parsePath(pathname: string): { locale: Locale; route: Route } {
  // Accept "/x/", "/x/index.html" and "/x.html" as "/x" (static hosts may expose any of them).
  const clean = pathname.replace(/\/index\.html$/, "").replace(/\.html$/, "").replace(/\/+$/, "");
  const segs = clean.split("/").filter(Boolean);
  let locale: Locale = "en";
  if (segs[0] === "fr") {
    locale = "fr";
    segs.shift();
  }
  if (segs.length === 0) return { locale, route: { name: "home" } };
  if (segs.length === 2 && segs[0] === "projects" && caseStudyIds.includes(segs[1])) {
    return { locale, route: { name: "project", id: segs[1] } };
  }
  if (segs.length === 1 && segs[0] === "blog") return { locale, route: { name: "blog" } };
  if (segs.length === 2 && segs[0] === "blog" && postSlugs.includes(segs[1])) {
    return { locale, route: { name: "post", slug: segs[1] } };
  }
  return { locale, route: { name: "notfound" } };
}

export function pathFor(locale: Locale, route: Route): string {
  const prefix = locale === "fr" ? "/fr" : "";
  if (route.name === "project") return `${prefix}/projects/${route.id}`;
  if (route.name === "blog") return `${prefix}/blog`;
  if (route.name === "post") return `${prefix}/blog/${route.slug}`;
  return prefix || "/";
}

/** Every URL that should be pre-rendered. */
export function allPaths(): string[] {
  const out: string[] = [];
  for (const l of ["en", "fr"] as const) {
    out.push(pathFor(l, { name: "home" }));
    for (const id of caseStudyIds) out.push(pathFor(l, { name: "project", id }));
    out.push(pathFor(l, { name: "blog" }));
    for (const slug of postSlugs) out.push(pathFor(l, { name: "post", slug }));
  }
  return out;
}

type Ctx = {
  pathname: string;
  locale: Locale;
  route: Route;
  intent: NavIntent;
  navigate: (to: string, opts?: { replace?: boolean; hash?: string; keepScroll?: boolean }) => void;
};

const RouterContext = createContext<Ctx | null>(null);
const LOCALE_KEY = "ck-locale";

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [pathname, setPathname] = useState(initialPath);
  const [intent, setIntent] = useState<NavIntent>({ key: 0 });
  const { locale, route } = useMemo(() => parsePath(pathname), [pathname]);

  const navigate = useCallback<Ctx["navigate"]>((to, opts = {}) => {
    const url = opts.hash ? `${to}#${opts.hash}` : to;
    if (opts.replace) history.replaceState(null, "", url);
    else history.pushState(null, "", url);
    setPathname(to);
    setIntent((i) => ({ key: i.key + 1, hash: opts.hash, keepScroll: opts.keepScroll }));
  }, []);

  useEffect(() => {
    const onPop = () => {
      setPathname(location.pathname);
      setIntent((i) => ({ key: i.key + 1, hash: location.hash.slice(1) || undefined }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // First visit on "/" from a French browser → offer the French version.
  useEffect(() => {
    if (pathname !== "/") return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LOCALE_KEY);
    } catch {
      /* ignore */
    }
    const wantsFr = saved ? saved === "fr" : navigator.language?.toLowerCase().startsWith("fr");
    if (wantsFr) navigate("/fr", { replace: true, keepScroll: true, hash: location.hash.slice(1) || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial hash on page load (e.g. /#contact)
  useEffect(() => {
    if (location.hash) setIntent((i) => ({ key: i.key + 1, hash: location.hash.slice(1) }));
  }, []);

  const value = useMemo(() => ({ pathname, locale, route, intent, navigate }), [pathname, locale, route, intent, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside <RouterProvider>");
  return ctx;
}

export function rememberLocale(l: Locale) {
  try {
    localStorage.setItem(LOCALE_KEY, l);
  } catch {
    /* ignore */
  }
}

/** Client-side link that falls back to a normal anchor for modified clicks. */
export function Link({ to, hash, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string }) {
  const { navigate } = useRouter();
  const href = hash ? `${to}#${hash}` : to;
  return (
    <a
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, { hash });
      }}
      {...rest}
    />
  );
}
