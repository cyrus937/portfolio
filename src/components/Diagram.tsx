import { m } from "motion/react";
import { Fragment } from "react";
import { useLocale } from "@/lib/i18n";
import type { Diagram as D } from "@/content/projects";

/** Layered architecture diagram with animated data flowing between layers. */
export function Diagram({ data }: { data: D }) {
  const { t } = useLocale();
  return (
    <div className="card relative overflow-hidden p-4 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-60" />
      <div className="relative flex flex-col">
        {data.map((layer, i) => (
          <Fragment key={i}>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-3 rounded-2xl border border-line bg-bg/70 p-4 backdrop-blur sm:grid-cols-[160px_1fr] sm:items-center sm:gap-6 sm:p-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">{t(layer.layer)}</p>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((n) => (
                  <li
                    key={n.name}
                    className={
                      n.note
                        ? "rounded-lg border border-dashed border-line-strong px-3 py-2 text-sm text-muted"
                        : "rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm"
                    }
                  >
                    {n.name}
                    {n.note && <span className="ml-1.5 font-mono text-[10px] text-subtle">({t(n.note)})</span>}
                  </li>
                ))}
              </ul>
            </m.div>
            {i < data.length - 1 && (
              <div className="relative mx-auto flex h-12 w-full items-center justify-center sm:ml-[90px] sm:w-auto sm:justify-start">
                <span className="relative h-full w-px overflow-hidden bg-line-strong">
                  <span className="absolute left-0 top-0 h-3 w-px bg-accent" style={{ animation: `flow 1.6s ${i * 0.3}s linear infinite` }} />
                </span>
                {layer.via && (
                  <span className="absolute left-1/2 ml-3 whitespace-nowrap rounded-full border border-line bg-bg px-2 py-0.5 font-mono text-[10px] text-subtle sm:left-0">
                    {layer.via}
                  </span>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
