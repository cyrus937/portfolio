import type { T } from "@/lib/i18n";

/** "Now" page-style snapshot. Update the date when you edit it. */
export const now: { updated: string; items: { k: T; v: T }[] } = {
  updated: "2026-11-10",
  items: [
    {
      k: { en: "Working on", fr: "Je travaille sur" },
      v: {
        en: "Productionizing ML, deep-learning and text-mining algorithms on a cloud genomics platform, as a Python / MLOps consultant at Max Digital Services.",
        fr: "L'industrialisation d'algorithmes de ML, Deep Learning et Text Mining sur une plateforme cloud de génomique, en tant que consultant Python / MLOps chez Max Digital Services.",
      },
    },
    {
      k: { en: "Building", fr: "Je construis" },
      v: {
        en: "TestForge — semantic code search and context-aware test generation. Next up: the CLI, REST API and VS Code extension.",
        fr: "TestForge — recherche sémantique de code et génération de tests contextuelle. Prochaines étapes : la CLI, l'API REST et l'extension VS Code.",
      },
    },
    {
      k: { en: "Exploring", fr: "J'explore" },
      v: {
        en: "Rust ↔ Python interop with PyO3: keeping the hot path in Rust and the ML ecosystem in Python.",
        fr: "L'interopérabilité Rust ↔ Python avec PyO3 : le chemin critique en Rust, l'écosystème ML en Python.",
      },
    },
    {
      k: { en: "Looking for", fr: "Je recherche" },
      v: {
        en: "Software engineering roles in backend, data/ML or platform teams — in France or abroad.",
        fr: "Des postes d'ingénieur logiciel en équipe backend, data/IA ou plateforme — en France ou à l'étranger.",
      },
    },
  ],
};
