import { m, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

/** Fades + lifts its children into view once. Use as="li" inside lists. */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...rest }: Props) {
  const C = (as === "li" ? m.li : m.div) as typeof m.div;
  return (
    <C
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </C>
  );
}

/** Splits text into words that rise from a mask, staggered. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const anim = { y: "0%", opacity: 1 };
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <m.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            {...(immediate ? { animate: anim } : { whileInView: anim, viewport: { once: true } })}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}
