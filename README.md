# Cyrille Kenfack — Portfolio

Personal portfolio of **Cyrille Kenfack**, Software Engineer (Python & Java · Backend, Data/ML & Cloud) — [cyrus-k.vercel.app](https://cyrus-k.vercel.app).

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens as CSS variables, light / dark / auto themes)
- **Motion** for animations, **Lenis** for smooth scrolling
- **EmailJS** for the contact form (lazy-loaded)
- Self-hosted fonts: Geist, JetBrains Mono, Instrument Serif

## Features

- **Pre-rendered** static HTML for every route (`/`, `/fr`, `/projects/:id`, `/fr/projects/:id`) with per-page title, description, canonical, `hreflang` and a generated `sitemap.xml` — then hydrated by React
- **Case studies** for featured projects (problem, approach, architecture diagram, code, outcomes)
- **GitHub section** generated at build time from the public API (`scripts/fetch-github.mjs`, committed snapshot in `src/content/github.json` as offline fallback; set `GITHUB_TOKEN` to raise the rate limit)
- **Blog** in MDX (EN + FR), syntax highlighting at build time (Shiki, zero runtime JS), table of contents, reading progress, RSS feeds (`/rss.xml`, `/fr/rss.xml`)
- **Now** section (`src/content/now.ts`) and **testimonials** (`src/content/testimonials.ts` — hidden until you add real quotes)
- **Performance**: secondary pages, articles and the ⌘K palette are code-split; Motion's engine loads after first paint (`LazyMotion`)
- **Polish**: first-visit intro (pure CSS, once per session), circular theme reveal from the clicked control, a subtle trailing cursor on desktop
- **Analytics**: Vercel Web Analytics (cookie-less), only on the deployed site — enable it in the Vercel dashboard. Custom events (`cv_download`, `contact_sent`, `email_copy`, `terminal_command`, `palette_open`) need a plan that supports them
- **Interactive terminal** in the hero — try `help`, `projects`, `open testforge`, `theme light`, `sudo hire-me`

- Bilingual **EN / FR** (auto-detected from the browser, toggle in the nav)
- Theme switch **light / dark / auto** (follows the OS live, no flash on load)
- **⌘K / Ctrl+K** command palette (navigate, copy email, download CV, switch theme / language)
- Animated hero terminal, scroll-linked timeline, spotlight cards, hand-built SVG project visuals
- Respects `prefers-reduced-motion`; keyboard accessible; SEO meta + JSON-LD + Open Graph image

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # fetch GitHub data → type-check → client build → SSR build → pre-render
npm run github    # refresh src/content/github.json only
npm test          # Playwright end-to-end tests against dist/ (run after build)
                  # locally with an installed Chrome: CHROME_PATH=/usr/bin/google-chrome npm test
npm run lighthouse # Lighthouse CI on the build (perf / a11y / SEO budgets in lighthouserc.json)
npm run preview   # serve the build
```

## CI

`.github/workflows/ci.yml` builds, runs the Playwright suite (desktop + mobile, fails on any console error or hydration mismatch) and Lighthouse CI on every push / PR.

## Writing an article

1. Add `src/posts/<slug>.en.mdx` and `src/posts/<slug>.fr.mdx`.
2. Register it in `src/content/posts.ts` (metadata + loaders). It is pre-rendered, added to the sitemap and to both RSS feeds automatically.

## Editing content

All copy lives in `src/content/` — every string is `{ en, fr }`:

| File | What |
| --- | --- |
| `profile.ts` | name, links, CV paths, about text, stats |
| `experience.ts` | jobs (timeline) |
| `projects.ts` | projects, visuals and case studies (a project with `caseStudy` gets its own page) |
| `github.ts` | which repos to feature, with descriptions |
| `skills.ts` | skill groups, levels (1–5), marquee logos |
| `education.ts` | degrees, certifications, leadership |
| `now.ts` | the "Now" snapshot |
| `testimonials.ts` | real recommendations (section hidden while empty) |
| `posts.ts` | blog metadata |
| `ui.ts` | section titles, buttons, form labels |

CV PDFs are served from `public/cv/`. EmailJS keys can be overridden with `VITE_EMAILJS_*` env vars (see `.env.example`).

## Deploy

Vercel detects Vite automatically (build: `npm run build`, output: `dist`). `vercel.json` enables clean URLs and long-term caching for hashed assets; `dist/404.html` is served for unknown paths.
