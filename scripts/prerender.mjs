// Pre-renders every route to static HTML after `vite build` + `vite build --ssr`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, allPaths, SITE_URL, posts } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const write = (rel, html) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const page = async (url) => {
  const { html, head, locale } = await render(url);
  return template.replace("%LANG%", locale).replace("<!--app-head-->", head).replace("<!--app-html-->", html);
};

const urls = allPaths();
for (const url of urls) {
  write(url === "/" ? "index.html" : `${url.slice(1)}/index.html`, await page(url));
  console.log("  ✓", url);
}
write("404.html", await page("/404"));
console.log("  ✓ /404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((u) => {
    const en = u.replace(/^\/fr(?=\/|$)/, "") || "/";
    const fr = en === "/" ? "/fr" : `/fr${en}`;
    return `  <url>
    <loc>${SITE_URL}${u}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${en}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}${fr}"/>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);
// RSS feeds (one per language)
const esc = (x) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
for (const lang of ["en", "fr"]) {
  const prefix = lang === "fr" ? "/fr" : "";
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (p) => `    <item>
      <title>${esc(p.title[lang])}</title>
      <link>${SITE_URL}${prefix}/blog/${p.slug}</link>
      <guid>${SITE_URL}${prefix}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.summary[lang])}</description>
    </item>`,
    )
    .join("\n");
  write(
    `${prefix.slice(1) ? prefix.slice(1) + "/" : ""}rss.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cyrille Kenfack — Blog</title>
    <link>${SITE_URL}${prefix}/blog</link>
    <atom:link href="${SITE_URL}${prefix}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${lang === "fr" ? "Backends, MLOps et systèmes distribués." : "Backends, MLOps and distributed systems."}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`,
  );
}
console.log("  ✓ rss.xml, fr/rss.xml");

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${urls.length + 1} pages + sitemap.xml`);
