import type { T } from "@/lib/i18n";

export type Testimonial = {
  quote: T;
  name: string;
  role: T; // e.g. "Research Director, INRIA"
  /** Link to the source (e.g. the LinkedIn recommendation). */
  url?: string;
};

/**
 * Paste real recommendations here (e.g. from LinkedIn). The section stays
 * hidden while this list is empty — never put placeholder quotes in it.
 *
 * {
 *   quote: { en: "…", fr: "…" },
 *   name: "Firstname Lastname",
 *   role: { en: "Team lead, INRIA", fr: "Responsable d'équipe, INRIA" },
 *   url: "https://www.linkedin.com/in/…/details/recommendations/",
 * },
 */
export const testimonials: Testimonial[] = [];
