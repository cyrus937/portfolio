import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { Link } from "@/lib/router";
import { ui } from "@/content/ui";

export function NotFound() {
  const { t, home } = useLocale();
  return (
    <section className="relative isolate flex min-h-[80svh] items-center pt-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000,transparent)]" />
      <div className="container-page">
        <p className="font-mono text-sm text-accent-ink">$ curl -I {"<this page>"}</p>
        <p className="mt-2 font-mono text-sm text-muted">HTTP/2 404</p>
        <h1 className="mt-6 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
          404<span className="font-display text-accent-ink">.</span>
        </h1>
        <p className="mt-6 text-2xl font-semibold tracking-tight">{t(ui.notFound.title)}</p>
        <p className="mt-2 text-muted">{t(ui.notFound.body)}</p>
        <Link
          to={home}
          className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          {t(ui.notFound.home)}
        </Link>
      </div>
    </section>
  );
}
