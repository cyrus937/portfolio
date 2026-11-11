import { getProject } from "@/content/projects";
import { getPost } from "@/content/posts";
import { pathFor, type Locale, type Route } from "./router";

export const SITE_URL = "https://cyrus-k.vercel.app";

export type Head = {
  title: string;
  description: string;
  path: string;
  alternates: Record<Locale, string>;
  locale: Locale;
};

export function headFor(locale: Locale, route: Route): Head {
  const alternates = { en: pathFor("en", route), fr: pathFor("fr", route) };
  const path = pathFor(locale, route);
  if (route.name === "project") {
    const p = getProject(route.id)!;
    return {
      title: `${p.title[locale]} — ${locale === "fr" ? "Étude de cas" : "Case study"} · Cyrille Kenfack`,
      description: p.summary[locale],
      path,
      alternates,
      locale,
    };
  }
  if (route.name === "blog") {
    return {
      title: locale === "fr" ? "Blog · Cyrille Kenfack" : "Blog · Cyrille Kenfack",
      description:
        locale === "fr"
          ? "Articles concrets sur les backends, le MLOps et les systèmes distribués, par Cyrille Kenfack."
          : "Practical write-ups on backends, MLOps and distributed systems by Cyrille Kenfack.",
      path,
      alternates,
      locale,
    };
  }
  if (route.name === "post") {
    const p = getPost(route.slug)!;
    return { title: `${p.title[locale]} · Cyrille Kenfack`, description: p.summary[locale], path, alternates, locale };
  }
  if (route.name === "notfound") {
    return {
      title: locale === "fr" ? "Page introuvable · Cyrille Kenfack" : "Page not found · Cyrille Kenfack",
      description: "404",
      path,
      alternates,
      locale,
    };
  }
  return locale === "fr"
    ? {
        title: "Cyrille Kenfack — Ingénieur Logiciel · Python, Java, Data/IA & Cloud",
        description:
          "Cyrille Kenfack — Ingénieur logiciel à Rennes. 5 ans de backends, d'API REST et de plateformes data/IA en production, en Python et Java, sur AWS et Kubernetes.",
        path,
        alternates,
        locale,
      }
    : {
        title: "Cyrille Kenfack — Software Engineer · Python, Java, Data/ML & Cloud",
        description:
          "Cyrille Kenfack — Software Engineer in Rennes, France. 5 years building production backends, REST APIs and data/ML platforms in Python & Java on AWS and Kubernetes.",
        path,
        alternates,
        locale,
      };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Head tags for the pre-rendered HTML. */
export function renderHead(h: Head): string {
  const url = SITE_URL + h.path;
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL + h.alternates.en}" />`,
    `<link rel="alternate" hreflang="fr" href="${SITE_URL + h.alternates.fr}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL + h.alternates.en}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.png" />`,
    `<meta property="og:locale" content="${h.locale === "fr" ? "fr_FR" : "en_US"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="alternate" type="application/rss+xml" title="Cyrille Kenfack — Blog" href="${SITE_URL}${h.locale === "fr" ? "/fr" : ""}/rss.xml" />`,
  ].join("\n    ");
}

/** Keep <head> in sync on client-side navigation. */
export function applyHead(h: Head) {
  document.title = h.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", h.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE_URL + h.path);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", h.title);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", SITE_URL + h.path);
}
