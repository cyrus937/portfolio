import type { T } from "@/lib/i18n";

export const profile = {
  name: "Cyrille Kenfack",
  firstName: "Cyrille",
  email: "cyrillekenfack4@gmail.com",
  phone: "+33 7 58 38 78 50",
  location: "Rennes, France",
  timezone: "Europe/Paris",
  links: {
    github: "https://github.com/cyrus937",
    linkedin: "https://www.linkedin.com/in/cyrille-kenfack-347b64195",
    twitter: "https://twitter.com/CyrilleKenfack",
  },
  cv: {
    en: "/cv/Cyrille_Kenfack_CV_EN.pdf",
    fr: "/cv/Cyrille_Kenfack_CV_FR.pdf",
  },
  role: {
    en: "Software Engineer",
    fr: "Ingénieur Logiciel",
  } satisfies T,
  headline: {
    en: "Python & Java · Backend, Data/ML & Cloud",
    fr: "Python & Java · Backend, Data/IA & Cloud",
  } satisfies T,
  availability: {
    en: "Open to new opportunities · Open to relocate",
    fr: "Ouvert aux opportunités · Mobile géographiquement",
  } satisfies T,
};

export type Stat = { value: number; prefix?: string; suffix: string; label: T };

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: { en: "years shipping production software", fr: "ans de logiciels en production" } },
  { value: 40, prefix: "−", suffix: "%", label: { en: "validation time on the FL test framework", fr: "de temps de validation sur le framework de tests FL" } },
  { value: 90, suffix: "%+", label: { en: "test coverage on critical systems", fr: "de couverture de tests sur les systèmes critiques" } },
  { value: 7, suffix: "", label: { en: "developers led as co-founder of GiTech", fr: "développeurs encadrés en tant que co-fondateur de GiTech" } },
];

export const about: { summary: T[]; facts: { k: T; v: T }[] } = {
  summary: [
    {
      en: "I'm a software engineer with five years of experience building production-grade backend services, REST APIs and data/ML platforms in Python and Java.",
      fr: "Ingénieur logiciel avec cinq ans d'expérience dans la conception de services back-end, d'API REST et de plateformes data/IA de production en Python et Java.",
    },
    {
      en: "Today I'm a consultant at Max Digital Services, taking machine-learning, deep-learning and text-mining algorithms from notebook to production on a cloud genomics platform — AWS, Kubernetes, FastAPI, Keycloak.",
      fr: "Aujourd'hui consultant chez Max Digital Services, j'industrialise des algorithmes de Machine Learning, Deep Learning et Text Mining sur une plateforme cloud de génomique — AWS, Kubernetes, FastAPI, Keycloak.",
    },
    {
      en: "Before that, at INRIA, I built a distributed testing framework for federated learning that cut validation time by 40% with 90%+ coverage. I care about systems that are boring in the best way: observable, tested, and fast.",
      fr: "Auparavant à l'INRIA, j'ai conçu un framework de tests distribués pour l'apprentissage fédéré qui a réduit le temps de validation de 40 % avec plus de 90 % de couverture. J'aime les systèmes « ennuyeux » dans le bon sens : observables, testés et rapides.",
    },
  ],
  facts: [
    { k: { en: "Based in", fr: "Basé à" }, v: { en: "Rennes, France", fr: "Rennes, France" } },
    { k: { en: "Focus", fr: "Spécialité" }, v: { en: "Backend · Data/ML · Cloud", fr: "Backend · Data/IA · Cloud" } },
    { k: { en: "Languages", fr: "Langues" }, v: { en: "French (native) · English (fluent)", fr: "Français (natif) · Anglais (courant)" } },
    { k: { en: "Education", fr: "Formation" }, v: { en: "MEng Computer Engineering, ENSPY", fr: "Diplôme d'ingénieur informatique, ENSPY" } },
  ],
};
