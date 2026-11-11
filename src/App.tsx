import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { useLocale } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { applyHead, headFor } from "@/lib/head";
import { ui } from "@/content/ui";
import { track } from "@/lib/analytics";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

// Secondary pages and the palette are code-split; the home page stays in the main chunk.
const loadProject = () => import("@/pages/ProjectPage");
const ProjectPage = lazy(() => loadProject().then((m) => ({ default: m.ProjectPage })));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const CommandPalette = lazy(() => import("@/components/CommandPalette"));
// Motion's animation engine is fetched after first paint; `m.*` components render immediately.
const motionFeatures = () => import("@/lib/motion-features").then((r) => r.default);

export default function App() {
  const { t } = useLocale();
  const { route, locale } = useRouter();
  const [palette, setPalette] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  const openPalette = () => {
    track("palette_open");
    setPaletteLoaded(true);
    setPalette(true);
  };

  useEffect(() => {
    applyHead(headFor(locale, route));
    document.documentElement.lang = locale;
  }, [locale, route]);

  // Signal for tests / tooling that the page is interactive.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteLoaded(true);
        setPalette((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warm up likely-next chunks once the browser is idle.
  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2500));
    idle(() => {
      void loadProject();
      void import("@/components/CommandPalette");
    });
  }, []);

  // Page key ignores locale so switching language doesn't replay the page transition.
  const pageKey =
    route.name === "project" ? `project-${route.id}` : route.name === "post" ? `post-${route.slug}` : route.name;

  return (
    <LazyMotion features={motionFeatures} strict>
    {/* Brand icons are decorative: their meaning is always given by adjacent text or an aria-label. */}
    <IconContext.Provider value={{ attr: { "aria-hidden": "true", focusable: "false" } }}>
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          {t(ui.a11y.skip)}
        </a>
        <ScrollProgress />
        <Cursor />
        <Nav onOpenPalette={openPalette} />
        {paletteLoaded && (
          <Suspense fallback={null}>
            <CommandPalette open={palette} setOpen={setPalette} />
          </Suspense>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <m.main
            id="main"
            key={pageKey}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<div className="min-h-screen" />}>
              {route.name === "home" && <Home onOpenPalette={openPalette} />}
              {route.name === "project" && <ProjectPage id={route.id} />}
              {route.name === "blog" && <Blog />}
              {route.name === "post" && <BlogPost slug={route.slug} />}
              {route.name === "notfound" && <NotFound />}
            </Suspense>
          </m.main>
        </AnimatePresence>
        <Footer />
      </div>
    </MotionConfig>
    </IconContext.Provider>
    </LazyMotion>
  );
}
