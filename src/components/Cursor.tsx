import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type Mode = "default" | "hover" | "label" | "hidden";

/**
 * A trailing ring that complements (never replaces) the native cursor.
 * Desktop + fine pointer only; disabled with prefers-reduced-motion.
 * Add data-cursor="Label" on any element to show a label on hover.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      const interactive = el?.closest("a, button, [role=button], [role=radio], label");
      // Stretched card links (data-stretched) count as the card itself, not as a button.
      const isOwnButton = interactive && !interactive.hasAttribute("data-stretched");
      if (el?.closest("input, textarea, select, [contenteditable=true]")) setMode("hidden");
      else if (isOwnButton) setMode("hover");
      else if (labelled) {
        setLabel(labelled.dataset.cursor ?? "");
        setMode("label");
      } else if (interactive) setMode("hover");
      else setMode("default");
    };
    const onLeave = () => setMode("hidden");
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "hover" ? 48 : mode === "label" ? 84 : 28;
  return (
    <m.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[75]" style={{ x: sx, y: sy }}>
      <m.div
        className={
          mode === "label"
            ? "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-fg"
            : "-translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/50 mix-blend-difference"
        }
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          scale: down ? 0.85 : 1,
          backgroundColor: mode === "hover" ? "rgba(255,255,255,0.12)" : undefined,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {mode === "label" && (
            <m.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-wider"
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
