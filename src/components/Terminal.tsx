import { m, useSpring } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n";
import { useTheme, type ThemePref } from "@/lib/theme";
import { useScrollTo } from "@/lib/scroll";
import { pathFor, useRouter } from "@/lib/router";
import { profile } from "@/content/profile";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { track } from "@/lib/analytics";
import { introDelay } from "@/lib/intro";

const K = ({ children }: { children: ReactNode }) => <span className="text-accent-ink">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-fg">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-subtle">{children}</span>;

type Entry = { cmd: string; out: ReactNode };

const SECTIONS = ["about", "experience", "projects", "skills", "education", "contact"];
const COMMANDS = [
  "help", "whoami", "about", "experience", "projects", "open", "stack", "goto", "contact",
  "cv", "github", "theme", "lang", "palette", "date", "echo", "clear", "sudo",
] as const;

/* ───────────── Intro script (auto-typed) ───────────── */
function useIntro(fr: boolean): Entry[] {
  return [
    { cmd: "whoami", out: <><S>cyrille.kenfack</S> <C>— {fr ? "ingénieur logiciel" : "software engineer"}</C></> },
    {
      cmd: "cat stack.yml",
      out: (
        <div className="grid grid-cols-[auto_1fr] gap-x-3">
          <K>lang:</K> <S>python, java, rust, ts</S>
          <K>api:</K> <S>fastapi, spring boot, django</S>
          <K>ml:</K> <S>pytorch, tensorflow, bert</S>
          <K>infra:</K> <S>aws, k8s, docker, keycloak</S>
        </div>
      ),
    },
    {
      cmd: "status",
      out: (
        <span className="inline-flex items-center gap-2">
          <span className="relative size-2 rounded-full bg-accent dot-ping" />
          <S>{fr ? "disponible — ouvert aux opportunités" : "available — open to opportunities"}</S>
        </span>
      ),
    },
  ];
}

export function Terminal({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { locale, t, toggleLocale } = useLocale();
  const fr = locale === "fr";
  const L = (en: string, frs: string) => (fr ? frs : en);
  const { setPref } = useTheme();
  const scrollTo = useScrollTo();
  const { navigate } = useRouter();

  const intro = useIntro(fr);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [log, setLog] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const ready = step >= intro.length;
  const [INTRO_DELAY] = useState(introDelay);

  const box = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 20 });
  const ry = useSpring(0, { stiffness: 150, damping: 20 });

  // Restart the intro when the language changes.
  useEffect(() => {
    setStep(0);
    setTyped("");
    setLog([]);
  }, [locale]);

  // Auto-type intro
  useEffect(() => {
    if (ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(intro.length);
      return;
    }
    const cmd = intro[step].cmd;
    if (typed.length < cmd.length) {
      // Wait for the card to appear (and the intro overlay, if any) before the first keystroke.
      const first = step === 0 && typed === "" ? 900 + INTRO_DELAY * 1000 : 0;
      const id = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), first + 38 + Math.random() * 50);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped("");
    }, 380);
    return () => clearTimeout(id);
  }, [typed, step, intro, ready]);

  // Keep the newest line visible
  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, step, typed]);

  /* ───────────── Commands ───────────── */
  function run(raw: string): ReactNode | null {
    const [name, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (name) {
      case "":
        return null;
      case "help":
        return (
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            {[
              ["whoami", L("who I am", "qui je suis")],
              ["experience", L("where I've worked", "mon parcours")],
              ["projects", L("list case studies", "lister les études de cas")],
              ["open <id>", L("open a case study", "ouvrir une étude de cas")],
              ["stack", L("what I work with", "mes outils")],
              ["goto <section>", SECTIONS.join(" · ")],
              ["contact", L("how to reach me", "me contacter")],
              ["cv", L("download my CV", "télécharger mon CV")],
              ["theme <dark|light|auto>", L("change theme", "changer de thème")],
              ["lang <en|fr>", L("change language", "changer de langue")],
              ["github · palette · date · clear", ""],
            ].map(([c, d]) => (
              <div key={c} className="contents">
                <K>{c}</K>
                <C>{d}</C>
              </div>
            ))}
            <span className="col-span-2 mt-1 text-subtle">{L("Tab completes · ↑↓ history", "Tab complète · ↑↓ historique")}</span>
          </div>
        );
      case "whoami":
      case "about":
        return (
          <span>
            <S>{profile.name}</S> — {t(profile.role)}, {profile.location}. {t(profile.headline)}.
          </span>
        );
      case "experience":
        return (
          <div className="flex flex-col">
            {experiences.map((e) => (
              <span key={e.id}>
                <C>{t(e.start)}</C> <S>{t(e.role).split(" — ")[0]}</S> <K>@ {e.company}</K>
              </span>
            ))}
          </div>
        );
      case "projects":
      case "ls":
        return (
          <div className="flex flex-col">
            {projects.map((p) => (
              <span key={p.id}>
                {p.caseStudy ? <K>{p.id.padEnd(15, " ")}</K> : <C>{p.id.padEnd(15, " ")}</C>}
                <S>{t(p.title)}</S>
              </span>
            ))}
            <C>{L("→ open <id> for a case study", "→ open <id> pour une étude de cas")}</C>
          </div>
        );
      case "open":
      case "cd": {
        const p = projects.find((x) => x.id === arg && x.caseStudy);
        if (!p) return <span className="text-rose-500">{L(`no case study: ${arg || "?"}`, `pas d'étude de cas : ${arg || "?"}`)}</span>;
        setTimeout(() => navigate(pathFor(locale, { name: "project", id: p.id })), 350);
        return <C>{L(`opening ${p.id}…`, `ouverture de ${p.id}…`)}</C>;
      }
      case "stack":
      case "skills":
        return (
          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            {skillGroups
              .filter((g) => g.skills.some((s) => s.level))
              .map((g) => (
                <div key={g.id} className="contents">
                  <K>{g.id}:</K>
                  <S>{g.skills.map((s) => s.name.toLowerCase()).join(", ")}</S>
                </div>
              ))}
          </div>
        );
      case "goto": {
        if (!SECTIONS.includes(arg)) return <span className="text-rose-500">goto: {SECTIONS.join(" | ")}</span>;
        setTimeout(() => scrollTo(arg), 200);
        return <C>→ #{arg}</C>;
      }
      case "contact":
        return (
          <div className="flex flex-col">
            <span><K>email</K>    <a className="text-fg underline decoration-line-strong underline-offset-2 hover:decoration-accent" href={`mailto:${profile.email}`}>{profile.email}</a></span>
            <span><K>linkedin</K> <a className="text-fg underline decoration-line-strong underline-offset-2 hover:decoration-accent" href={profile.links.linkedin} target="_blank" rel="noreferrer">cyrille-kenfack</a></span>
            <span><K>github</K>   <a className="text-fg underline decoration-line-strong underline-offset-2 hover:decoration-accent" href={profile.links.github} target="_blank" rel="noreferrer">cyrus937</a></span>
          </div>
        );
      case "cv":
        window.open(profile.cv[locale], "_blank");
        return <C>{L("downloading CV…", "téléchargement du CV…")}</C>;
      case "github":
        window.open(profile.links.github, "_blank");
        return <C>→ github.com/cyrus937</C>;
      case "theme": {
        const v = arg === "auto" ? "system" : arg;
        if (!["dark", "light", "system"].includes(v)) return <span className="text-rose-500">theme: dark | light | auto</span>;
        setPref(v as ThemePref);
        return <C>theme → {arg}</C>;
      }
      case "lang":
        if (arg !== "en" && arg !== "fr") return <span className="text-rose-500">lang: en | fr</span>;
        if (arg !== locale) setTimeout(toggleLocale, 250);
        return <C>lang → {arg}</C>;
      case "palette":
        setTimeout(onOpenPalette, 100);
        return <C>⌘K</C>;
      case "date":
        return <S>{new Date().toLocaleString(fr ? "fr-FR" : "en-GB", { timeZone: profile.timezone, dateStyle: "full", timeStyle: "short" })} (Rennes)</S>;
      case "echo":
        return <S>{arg}</S>;
      case "sudo":
        if (arg.includes("hire")) {
          setTimeout(() => scrollTo("contact"), 900);
          return <K>{L("[sudo] access granted ✓ — taking you to the contact form…", "[sudo] accès accordé ✓ — direction le formulaire de contact…")}</K>;
        }
        return <span>{L("Nice try. Maybe ", "Bien essayé. Essayez plutôt ")}<K>sudo hire-me</K>?</span>;
      case "rm":
        return <span>{L("Let's not. This portfolio has 0 backups and 100% feelings.", "Évitons. Ce portfolio a 0 sauvegarde et 100 % de sentiments.")}</span>;
      case "exit":
        return <C>{L("There is no escape. Try ", "On ne s'échappe pas. Essayez ")}<K>goto contact</K>.</C>;
      default:
        return (
          <span>
            <span className="text-rose-500">{L("command not found", "commande introuvable")}: {name}</span>
            <C> — {L("try", "essayez")} </C>
            <K>help</K>
          </span>
        );
    }
  }

  function submit() {
    const cmd = input;
    setInput("");
    setHIdx(-1);
    if (cmd.trim()) setHist((h) => [cmd, ...h].slice(0, 50));
    if (cmd.trim() === "clear") {
      setLog([]);
      setStep(intro.length);
      return;
    }
    track("terminal_command", { command: cmd.trim().split(/\s+/)[0].slice(0, 20) });
    const out = run(cmd);
    setLog((l) => [...l, { cmd, out }]);
  }

  function complete() {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      const hits = COMMANDS.filter((c) => c.startsWith(parts[0]));
      if (hits.length === 1) setInput(hits[0] + " ");
      else if (hits.length > 1) setLog((l) => [...l, { cmd: input, out: <C>{hits.join("  ")}</C> }]);
      return;
    }
    const pool =
      parts[0] === "open" ? projects.filter((p) => p.caseStudy).map((p) => p.id)
      : parts[0] === "goto" ? SECTIONS
      : parts[0] === "theme" ? ["dark", "light", "auto"]
      : parts[0] === "lang" ? ["en", "fr"]
      : [];
    const hits = pool.filter((x) => x.startsWith(parts[1] ?? ""));
    if (hits.length === 1) setInput(`${parts[0]} ${hits[0]}`);
    else if (hits.length > 1) setLog((l) => [...l, { cmd: input, out: <C>{hits.join("  ")}</C> }]);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
    else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, hist.length - 1);
      if (hist[i] !== undefined) {
        setHIdx(i);
        setInput(hist[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setInput(i >= 0 ? hist[i] : "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    }
  }

  const prompt = <span className="text-accent-ink">❯</span>;

  return (
    <m.div
      ref={box}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: INTRO_DELAY + 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !box.current || focused) return;
        const r = box.current.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      onClick={() => ready && inputRef.current?.focus({ preventScroll: true })}
      className={`card relative w-full cursor-text overflow-hidden !rounded-2xl bg-bg-elev/80 backdrop-blur-xl transition-shadow duration-500 ${focused ? "shadow-[0_0_0_1px_var(--accent),0_30px_80px_-30px_var(--glow)]" : ""}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-subtle">~/cyrille — zsh</span>
        <span className="ml-auto hidden font-mono text-[10px] text-subtle sm:block">{L("interactive", "interactif")}</span>
      </div>
      <div
        ref={body}
        data-lenis-prevent
        className="h-[320px] space-y-3 overflow-y-auto p-5 font-mono text-[12.5px] leading-relaxed text-muted [scrollbar-width:thin] sm:h-[340px] sm:text-[13px]"
      >
        {intro.slice(0, step).map((l, i) => (
          <div key={`i-${locale}-${i}`}>
            <div>{prompt} <S>{l.cmd}</S></div>
            <m.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-1 pl-4">
              {l.out}
            </m.div>
          </div>
        ))}
        {log.map((l, i) => (
          <div key={`l-${i}`}>
            <div>{prompt} <S>{l.cmd}</S></div>
            {l.out && <div className="mt-1 pl-4">{l.out}</div>}
          </div>
        ))}

        {!ready ? (
          <div>
            {prompt} <S>{typed}</S>
            <span className="caret ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-accent" />
          </div>
        ) : (
          <label className="flex items-center gap-2">
            {prompt}
            <span className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                onFocus={() => {
                  setFocused(true);
                  rx.set(0);
                  ry.set(0);
                }}
                onBlur={() => setFocused(false)}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label={L("Terminal command", "Commande du terminal")}
                className="w-full bg-transparent text-fg caret-transparent outline-none focus-visible:outline-none"
              />
              {/* Fake block caret placed after the text */}
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-transparent">
                {input}
                <span className={`inline-block h-[1.05em] w-[0.55em] bg-accent ${focused ? "caret" : "opacity-40"}`} />
              </span>
              {!input && !focused && (
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-subtle">
                  {L("type “help” to explore", "tapez « help » pour explorer")}
                </span>
              )}
            </span>
          </label>
        )}
      </div>
    </m.div>
  );
}
