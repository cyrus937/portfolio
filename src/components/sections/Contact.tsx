import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Check, CheckCircle2, Copy, Loader2, Send, TriangleAlert } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { Reveal, WordReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_khmqegl",
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_by16uvt",
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "y6u2PP8mXXFv-KkBY",
};

function useClock(tz: string) {
  // null on the server / first render so hydration matches; ticks on the client.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return "--:--:--";
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: tz }).format(now);
}

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      track("email_copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return { copied, copy };
}

type Status = "idle" | "sending" | "sent" | "error";
type Fields = "username" | "email" | "subject" | "message";

function Field({
  name,
  label,
  placeholder,
  error,
  textarea,
  type = "text",
  autoComplete,
}: {
  name: Fields;
  label: string;
  placeholder: string;
  error?: string;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const cls = cn(
    "peer w-full rounded-xl border bg-bg/60 px-4 py-3 text-[15px] text-fg outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-subtle/70",
    "focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]",
    error ? "border-rose-500/70" : "border-line-strong",
  );
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        {label}
        {error && <span className="normal-case tracking-normal text-rose-500">{error}</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={5} placeholder={placeholder} className={cn(cls, "resize-none")} aria-invalid={!!error} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} className={cls} aria-invalid={!!error} />
      )}
    </label>
  );
}

export function Contact() {
  const { t } = useLocale();
  const time = useClock(profile.timezone);
  const { copied, copy } = useCopyEmail();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const f = ui.contact.form;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: Fields) => String(data.get(k) ?? "").trim();
    const next: Partial<Record<Fields, string>> = {};
    (["username", "email", "subject", "message"] as Fields[]).forEach((k) => {
      if (!v(k)) next[k] = t(f.required);
    });
    if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) next.email = t(f.invalidEmail);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current!, { publicKey: EMAILJS.key });
      setStatus("sent");
      track("contact_sent");
      form.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    { href: profile.links.github, label: "GitHub", Icon: SiGithub, handle: "@cyrus937" },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: FaLinkedinIn, handle: "cyrille-kenfack" },
    { href: profile.links.twitter, label: "X", Icon: SiX, handle: "@CyrilleKenfack" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-24 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-60 blur-[140px]"
        style={{ background: "var(--glow)" }}
      />

      <div className="container-page">
        <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent-ink">06</span>
          <span className="h-px w-8 bg-line-strong" />
          {t(ui.contact.eyebrow)}
        </Reveal>
        <h2 className="max-w-5xl text-balance text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
          <WordReveal text={t(ui.contact.title)} />{" "}
          <WordReveal text={t(ui.contact.titleEm)} className="font-display text-accent-ink" delay={0.2} />
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-muted">{t(ui.contact.lead)}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="group flex items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="relative min-w-0 truncate text-xl font-medium tracking-tight sm:text-2xl"
                >
                  {profile.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </a>
                <button
                  onClick={copy}
                  aria-label={t(ui.contact.copy)}
                  className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <m.span
                      key={copied ? "y" : "n"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? <Check className="size-4 text-accent-ink" /> : <Copy className="size-4" />}
                    </m.span>
                  </AnimatePresence>
                  <AnimatePresence>
                    {copied && (
                      <m.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: -2 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-[11px] text-bg"
                      >
                        {t(ui.contact.copied)}
                      </m.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-2 font-mono text-sm text-subtle">{profile.phone}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="divide-y divide-line border-y border-line">
                {socials.map(({ href, label, Icon, handle }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                      <Icon className="size-4 text-muted transition-colors group-hover:text-accent-ink" />
                      <span className="text-sm font-medium">{label}</span>
                      <span className="ml-auto font-mono text-xs text-subtle">{handle}</span>
                      <ArrowUpRight className="size-4 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16} className="flex items-center gap-3 text-sm text-muted">
              <span className="relative size-2 rounded-full bg-accent dot-ping" />
              {t(ui.contact.localTime)} · <span className="font-mono tabular-nums text-fg">{time}</span>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form ref={form} onSubmit={onSubmit} noValidate className="card relative flex flex-col gap-5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field name="username" label={t(f.name)} placeholder={t(f.namePh)} error={errors.username} autoComplete="name" />
                <Field name="email" type="email" label={t(f.email)} placeholder={t(f.emailPh)} error={errors.email} autoComplete="email" />
              </div>
              <Field name="subject" label={t(f.subject)} placeholder={t(f.subjectPh)} error={errors.subject} />
              <Field name="message" textarea label={t(f.message)} placeholder={t(f.messagePh)} error={errors.message} />

              <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <AnimatePresence mode="wait">
                  {status === "sent" && (
                    <m.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-500" role="status">
                      <CheckCircle2 className="size-4 shrink-0" /> {t(f.sent)}
                    </m.p>
                  )}
                  {status === "error" && (
                    <m.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-rose-500" role="alert">
                      <TriangleAlert className="size-4 shrink-0" /> {t(f.error)}
                    </m.p>
                  )}
                </AnimatePresence>
                <Magnetic className="sm:ml-auto">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    icon={status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  >
                    {t(status === "sending" ? f.sending : f.send)}
                  </Button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
