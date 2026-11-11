import { prerender } from "react-dom/static";
import { Root } from "./Root";
import { allPaths, parsePath } from "@/lib/router";
import { headFor, renderHead, SITE_URL } from "@/lib/head";
import { posts } from "@/content/posts";

export { allPaths, SITE_URL, posts };

/** Waits for every lazy chunk / Suspense boundary, so the HTML is complete. */
export async function render(url: string) {
  const { locale, route } = parsePath(url);
  const { prelude } = await prerender(<Root url={url} />);
  const html = await new Response(prelude).text();
  return { html, head: renderHead(headFor(locale, route)), locale };
}
