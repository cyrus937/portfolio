import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { pathFor, useRouter } from "./router";

const LenisContext = createContext<Lenis | null>(null);

function scrollToEl(lenis: Lenis | null, id: string, immediate = false) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.4, immediate });
    else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4, immediate });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp: 0.1 });
    setLenis(instance);
    const loop = (time: number) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <ScrollManager lenis={lenis} />
      {children}
    </LenisContext.Provider>
  );
}

/** Reacts to navigations: jump to top on page change, or to a #hash section. */
function ScrollManager({ lenis }: { lenis: Lenis | null }) {
  const { intent } = useRouter();
  useEffect(() => {
    if (intent.key === 0) return;
    if (intent.hash) {
      // The target may only exist once the page transition has finished: poll briefly.
      let tries = 0;
      const id = setInterval(() => {
        const el = document.getElementById(intent.hash!);
        if (el || ++tries > 30) {
          clearInterval(id);
          if (el) scrollToEl(lenis, intent.hash!, tries > 2);
        }
      }, 60);
      return () => clearInterval(id);
    }
    if (!intent.keepScroll) scrollToEl(lenis, "top", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent.key]);
  return null;
}

/** Scroll to a home section id (or "top"); navigates home first when needed. */
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  const { route, locale, navigate } = useRouter();
  return useCallback(
    (id: string) => {
      if (route.name !== "home") {
        navigate(pathFor(locale, { name: "home" }), { hash: id === "top" ? undefined : id });
        return;
      }
      scrollToEl(lenis, id);
      if (id !== "top") history.replaceState(null, "", `#${id}`);
    },
    [lenis, route.name, locale, navigate],
  );
}
