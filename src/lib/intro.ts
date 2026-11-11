const INTRO_END = 1.35; // seconds after navigation start when the overlay is gone

/** Remaining time (s) the first-visit intro overlay covers the page; 0 otherwise. */
export function introDelay() {
  if (typeof document === "undefined" || !document.documentElement.classList.contains("has-intro")) return 0;
  return Math.max(0, INTRO_END - performance.now() / 1000);
}
