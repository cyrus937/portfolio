import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { about, profile, stats } from "@/content/profile";
import { ui } from "@/content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import portrait from "@/assets/portrait.webp";

export function About() {
  const { t } = useLocale();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading index="01" eyebrow={t(ui.about.eyebrow)} title={t(ui.about.title)} titleEm={t(ui.about.titleEm)} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <div ref={imgRef} className="group relative">
              <div className="card relative aspect-[4/5] overflow-hidden !rounded-3xl">
                <m.img
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  width={960}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  style={{ y: imgY, scale: 1.18 }}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <div>
                    <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
                    <p className="text-sm text-white/70">{t(profile.role)}</p>
                  </div>
                  <p className="font-mono text-[10px] leading-tight text-white/60">
                    48.11°N
                    <br />
                    1.68°W
                  </p>
                </div>
              </div>
              {/* Rotating badge */}
              <div className="absolute -top-5 right-2 grid size-24 sm:-right-3 place-items-center rounded-full bg-accent text-accent-fg shadow-xl sm:-right-6">
                <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_16s_linear_infinite]" aria-hidden>
                  <defs>
                    <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.18em]">
                    <textPath href="#circle">python · java · data · ml · cloud ·</textPath>
                  </text>
                </svg>
                <span className="font-display text-3xl">5+</span>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="lg:col-span-7">
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {about.summary.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "text-fg" : undefined}>{t(p)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid gap-x-8 border-t border-line sm:grid-cols-2">
                {about.facts.map((f) => (
                  <div key={f.k.en} className="flex flex-col gap-1 border-b border-line py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{t(f.k)}</dt>
                    <dd className="text-sm font-medium">{t(f.v)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-bg p-6 sm:p-8">
              <p className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                {s.prefix && <span className="text-accent-ink">{s.prefix}</span>}
                <Counter to={s.value} />
                <span className="text-accent-ink">{s.suffix}</span>
              </p>
              <p className="mt-3 max-w-[22ch] text-sm leading-snug text-muted">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
