import type { T } from "@/lib/i18n";
import data from "./github.json";

export type Repo = (typeof data.repos)[number];
export const github = data;

/** Repos to feature, in order, with my own descriptions where GitHub has none. */
export const featuredRepos: { name: string; description?: T }[] = [
  {
    name: "testforge",
    description: {
      en: "AI-powered semantic code search & context-aware test generation. Rust core, Python AI layer.",
      fr: "Recherche sémantique de code et génération de tests contextuelle par IA. Cœur Rust, couche IA Python.",
    },
  },
  {
    name: "async_fl_bench",
    description: {
      en: "Discrete-event simulator to benchmark asynchronous decentralised federated learning.",
      fr: "Simulateur à événements discrets pour évaluer l'apprentissage fédéré décentralisé asynchrone.",
    },
  },
  {
    name: "flask-currency-converter",
    description: {
      en: "Production-ready Flask API: real-time currency conversion, JWT auth, Redis caching.",
      fr: "API Flask prête pour la production : conversion de devises temps réel, auth JWT, cache Redis.",
    },
  },
  {
    name: "libp2p-node",
    description: {
      en: "Peer-to-peer node in Rust on libp2p — peer discovery and messaging, exposed to Python via PyO3.",
      fr: "Nœud pair-à-pair en Rust sur libp2p — découverte de pairs et messagerie, exposé à Python via PyO3.",
    },
  },
  {
    name: "pyo3_example",
    description: { en: "Calling Rust from Python with PyO3 and maturin.", fr: "Appeler du Rust depuis Python avec PyO3 et maturin." },
  },
  {
    name: "backend-gestion-projet",
    description: { en: "Project-management backend in Java.", fr: "Backend de gestion de projets en Java." },
  },
];

export const langColors: Record<string, string> = {
  Python: "#3572A5",
  Rust: "#dea584",
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  Dart: "#00B4AB",
  "C++": "#f34b7d",
  Shell: "#89e051",
  MATLAB: "#e16737",
  CMake: "#DA3434",
};
