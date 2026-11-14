/**
 * Privacy-friendly analytics (Vercel Web Analytics: no cookies, no personal data).
 * Only active on the deployed site; a no-op locally and during pre-rendering.
 * Page views (including client-side navigations) are tracked automatically.
 * Custom events require a Vercel plan that supports them; otherwise they are ignored.
 */
type Props = Record<string, string | number | boolean | null>;

let trackFn: ((name: string, props?: Props) => void) | null = null;

// Vercel Analytics only works on Vercel: skip local previews and the GitHub Pages mirror.
const isProdHost = () =>
  typeof window !== "undefined" &&
  import.meta.env.PROD &&
  !["localhost", "127.0.0.1"].includes(location.hostname) &&
  !location.hostname.endsWith(".github.io");

export async function initAnalytics() {
  if (!isProdHost()) return;
  const { inject, track } = await import("@vercel/analytics");
  inject({ mode: "production" });
  trackFn = track;
}

export function track(name: string, props?: Props) {
  trackFn?.(name, props);
}
