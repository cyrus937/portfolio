import { WordReveal, Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  titleEm,
  lead,
  as: Heading = "h2",
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  lead?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent-ink">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </Reveal>
        <Heading className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          <WordReveal text={title} />{" "}
          <WordReveal text={titleEm} className="font-display text-accent-ink" delay={0.15} />
        </Heading>
      </div>
      {lead && (
        <Reveal delay={0.2} className="text-pretty text-base leading-relaxed text-muted md:col-span-5 md:pb-2 md:text-lg">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
