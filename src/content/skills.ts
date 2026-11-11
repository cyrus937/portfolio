import type { T } from "@/lib/i18n";

export type Skill = { name: string; level?: 1 | 2 | 3 | 4 | 5 };
export type SkillGroup = {
  id: string;
  title: T;
  years: string;
  blurb: T;
  skills: Skill[];
  span?: "wide";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: { en: "Languages", fr: "Langages" },
    years: "5+",
    blurb: { en: "The tools I think in.", fr: "Les outils avec lesquels je pense." },
    skills: [
      { name: "Python", level: 5 },
      { name: "Java", level: 4 },
      { name: "JavaScript / TS", level: 3 },
      { name: "Rust", level: 2 },
      { name: "Shell", level: 2 },
    ],
  },
  {
    id: "backend",
    title: { en: "Backend & APIs", fr: "Backend & API" },
    years: "4+",
    blurb: {
      en: "REST services, microservices, auth and the plumbing in between.",
      fr: "Services REST, microservices, authentification et toute la tuyauterie entre les deux.",
    },
    skills: [
      { name: "FastAPI", level: 4 },
      { name: "Spring Boot", level: 4 },
      { name: "Django REST", level: 4 },
      { name: "Flask", level: 3 },
      { name: "OAuth2 / OIDC / JWT", level: 3 },
      { name: "Celery", level: 2 },
    ],
    span: "wide",
  },
  {
    id: "ml",
    title: { en: "Data, ML & MLOps", fr: "Data, IA & MLOps" },
    years: "4+",
    blurb: {
      en: "Taking models from notebook to a tested, monitored service.",
      fr: "Faire passer les modèles du notebook à un service testé et supervisé.",
    },
    skills: [
      { name: "Pandas / NumPy", level: 4 },
      { name: "PyTorch / TensorFlow", level: 4 },
      { name: "NLP — BERT, spaCy, Transformers", level: 3 },
      { name: "scikit-learn", level: 3 },
      { name: "Model productionization", level: 4 },
      { name: "Federated Learning", level: 3 },
      { name: "Pytest", level: 4 },
    ],
    span: "wide",
  },
  {
    id: "cloud",
    title: { en: "Cloud & DevOps", fr: "Cloud & DevOps" },
    years: "3+",
    blurb: { en: "Containers, pipelines and clusters.", fr: "Conteneurs, pipelines et clusters." },
    skills: [
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 3 },
      { name: "AWS", level: 3 },
      { name: "CI/CD — GitLab, Bitbucket", level: 3 },
      { name: "Keycloak", level: 3 },
      { name: "GCP", level: 2 },
      { name: "Linux", level: 4 },
    ],
  },
  {
    id: "data",
    title: { en: "Databases", fr: "Bases de données" },
    years: "4+",
    blurb: { en: "Modeling, tuning, replication.", fr: "Modélisation, optimisation, réplication." },
    skills: [
      { name: "PostgreSQL / PostGIS", level: 4 },
      { name: "MySQL", level: 4 },
      { name: "MongoDB", level: 2 },
      { name: "Redis", level: 3 },
    ],
  },
  {
    id: "frontend",
    title: { en: "Frontend & Mobile", fr: "Frontend & Mobile" },
    years: "3+",
    blurb: { en: "Enough to ship the whole product.", fr: "Assez pour livrer le produit de bout en bout." },
    skills: [
      { name: "React", level: 3 },
      { name: "Angular", level: 3 },
      { name: "React Native", level: 3 },
      { name: "Flutter", level: 2 },
    ],
  },
  {
    id: "practices",
    title: { en: "Practices", fr: "Pratiques" },
    years: "5+",
    blurb: { en: "How I like teams to work.", fr: "Comment j'aime que les équipes travaillent." },
    skills: [
      { name: "TDD / Pytest / JUnit" },
      { name: "Code review" },
      { name: "Microservices" },
      { name: "Scrum · Kanban" },
      { name: "Docs-as-code" },
      { name: "API security" },
    ],
  },
];

/** Logos for the marquee (react-icons/si names resolved in the component). */
export const marquee = [
  "Python", "Java", "Rust", "TypeScript", "FastAPI", "Spring", "Django", "Flask",
  "PyTorch", "TensorFlow", "Pandas", "Kubernetes", "Docker", "AWS", "PostgreSQL",
  "Redis", "Keycloak", "React", "Angular", "Linux", "GitLab", "Flutter",
] as const;
