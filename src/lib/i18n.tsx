import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { pathFor, rememberLocale, useRouter, type Locale } from "./router";

export type { Locale };
/** A string available in both languages. */
export type T = { en: string; fr: string };

type Ctx = {
  locale: Locale;
  toggleLocale: () => void;
  t: (v: T) => string;
  /** Prefix a route path with the current locale. */
  home: string;
};

const LocaleContext = createContext<Ctx | null>(null);

/** The locale comes from the URL (/fr/...), so it is identical on server and client. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale, route, navigate } = useRouter();

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "en" ? "fr" : "en";
    rememberLocale(next);
    navigate(pathFor(next, route), { keepScroll: true });
  }, [locale, route, navigate]);

  const t = useCallback((v: T) => v[locale], [locale]);
  const home = pathFor(locale, { name: "home" });

  const value = useMemo(() => ({ locale, toggleLocale, t, home }), [locale, toggleLocale, t, home]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
