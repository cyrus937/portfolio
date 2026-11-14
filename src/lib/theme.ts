import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";

export type ThemePref = "dark" | "light" | "system";
export type Theme = "dark" | "light";
const KEY = "ck-theme";
const MQ = "(prefers-color-scheme: dark)";

/* ── Tiny external store so server and client agree during hydration ── */
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function readPref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "dark" || v === "light" || v === "system") return v;
  } catch {
    /* storage unavailable */
  }
  return "system";
}
function writePref(p: ThemePref) {
  try {
    localStorage.setItem(KEY, p);
  } catch {
    /* ignore */
  }
  emit();
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}
const systemDark = () => window.matchMedia(MQ).matches;

function resolve(pref: ThemePref): Theme {
  if (pref !== "system") return pref;
  return systemDark() ? "dark" : "light";
}

/** Where the last theme change was triggered from (for the circular reveal). */
let origin: { x: number; y: number } | null = null;
/** Only animate changes the user asked for; OS-level switches apply instantly. */
let userInitiated = false;

function apply(theme: Theme) {
  const root = document.documentElement;
  const animate = userInitiated;
  userInitiated = false;
  if (root.dataset.theme === theme) return;
  const run = () => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  };
  type VT = { ready: Promise<void> };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => VT };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce || !animate) {
    origin = null;
    run();
    return;
  }
  // Circular reveal from the clicked control (or from the top-right corner, e.g. from the palette).
  const { x, y } = origin ?? { x: window.innerWidth - 40, y: 40 };
  origin = null;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.classList.add("vt-circle");
  const vt = doc.startViewTransition(run);
  vt.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
      ).finished,
    )
    .catch(() => {})
    .finally(() => root.classList.remove("vt-circle"));
}

/**
 * Three-state theme: dark / light / system ("auto").
 * The initial value is applied by an inline script in index.html to avoid a flash.
 */
function useThemeState() {
  const pref = useSyncExternalStore<ThemePref>(subscribe, readPref, () => "system");
  const theme = useSyncExternalStore<Theme>(subscribe, () => resolve(readPref()), () => "dark");

  // The inline script in index.html already applied the right theme before paint.
  // Skip the first run: during hydration `theme` is the server snapshot ("dark").
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    apply(theme);
  }, [theme]);

  const setPref = useCallback((p: ThemePref, from?: { x: number; y: number }) => {
    origin = from ?? null;
    userInitiated = true;
    writePref(p);
  }, []);
  /** Cycle dark → light → system. */
  const cycle = useCallback(() => {
    const p = readPref();
    userInitiated = true;
    writePref(p === "dark" ? "light" : p === "light" ? "system" : "dark");
  }, []);

  return useMemo(() => ({ pref, theme, setPref, cycle }), [pref, theme, setPref, cycle]);
}

type ThemeCtx = ReturnType<typeof useThemeState>;
const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useThemeState();
  return createElement(Ctx.Provider, { value }, children);
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
