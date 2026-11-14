import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

/** In dev there is no pre-render step: fill the placeholders with sane defaults. */
const devHtml = (): Plugin => ({
  name: "dev-html-placeholders",
  apply: "serve",
  transformIndexHtml: (html) =>
    html.replace("%LANG%", "en").replace("<!--app-head-->", "<title>Cyrille Kenfack — dev</title>"),
});

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          // Highlighting happens at build time: zero runtime JS, both themes via CSS variables.
          [rehypePrettyCode, { theme: { dark: "github-dark-dimmed", light: "github-light-high-contrast" }, keepBackground: false }],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
    devHtml(),
  ],
  build: { chunkSizeWarningLimit: 600 },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
});
