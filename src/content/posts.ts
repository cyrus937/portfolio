import type { T } from "@/lib/i18n";
import type { ComponentType } from "react";

export type PostMeta = {
  slug: string;
  date: string; // ISO
  readingTime: number; // minutes
  tags: string[];
  title: T;
  summary: T;
  /** Related case study, if any. */
  project?: string;
};

export const posts: PostMeta[] = [
  {
    slug: "reproducible-fl-simulation",
    date: "2026-11-10",
    readingTime: 6,
    tags: ["Federated learning", "Simulation", "Python"],
    project: "async-fl-bench",
    title: {
      en: "From threads to simulated time: making decentralised learning experiments reproducible",
      fr: "Des threads au temps simulé : rendre reproductibles les expériences d'apprentissage décentralisé",
    },
    summary: {
      en: "Why I replaced one-thread-per-node with a discrete-event simulator — and kept exactly one source of real asynchrony.",
      fr: "Pourquoi j'ai remplacé « un thread par nœud » par un simulateur à événements discrets — en gardant une seule source d'asynchronisme réel.",
    },
  },
  {
    slug: "notebook-to-production",
    date: "2026-11-10",
    readingTime: 7,
    tags: ["MLOps", "Python", "Kubernetes"],
    title: {
      en: "From notebook to Kubernetes: my checklist before an ML model ships",
      fr: "Du notebook à Kubernetes : ma checklist avant qu'un modèle ML parte en production",
    },
    summary: {
      en: "Packaging, CLIs, tests, containers, auth: the boring steps that turn a promising experiment into a service people can rely on.",
      fr: "Packaging, CLI, tests, conteneurs, authentification : les étapes « ennuyeuses » qui transforment une expérience prometteuse en service fiable.",
    },
  },
];

export const postSlugs = posts.map((p) => p.slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

type Loader = () => Promise<{ default: ComponentType }>;

/** MDX bodies are code-split: one chunk per post and language. */
export const postLoaders: Record<string, Record<"en" | "fr", Loader>> = {
  "reproducible-fl-simulation": {
    en: () => import("@/posts/reproducible-fl-simulation.en.mdx"),
    fr: () => import("@/posts/reproducible-fl-simulation.fr.mdx"),
  },
  "notebook-to-production": {
    en: () => import("@/posts/notebook-to-production.en.mdx"),
    fr: () => import("@/posts/notebook-to-production.fr.mdx"),
  },
};
