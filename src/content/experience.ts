import type { T } from "@/lib/i18n";

export type Experience = {
  id: string;
  role: T;
  company: string;
  context?: T;
  location: T;
  start: T;
  end: T;
  current?: boolean;
  highlights: T[];
  stack: string[];
};

const rennes = { en: "Rennes, France", fr: "Rennes, France" };
const yaounde = { en: "Yaoundé, Cameroon", fr: "Yaoundé, Cameroun" };

export const experiences: Experience[] = [
  {
    id: "mds",
    role: { en: "Software Engineer — Python, Data & MLOps", fr: "Ingénieur Études & Développement Python — Data / MLOps" },
    company: "Max Digital Services",
    context: {
      en: "Consultant for a global leader in in-vitro diagnostics",
      fr: "Mission chez un leader international du diagnostic in vitro",
    },
    location: rennes,
    start: { en: "Jun 2026", fr: "Juin 2026" },
    end: { en: "Present", fr: "Aujourd'hui" },
    current: true,
    highlights: [
      {
        en: "Build Python data-analysis services (FastAPI, Pandas, NumPy) for a cloud SaaS genomics & bioinformatics platform on AWS.",
        fr: "Développement de services d'analyse de données en Python (FastAPI, Pandas, NumPy) pour une plateforme SaaS de génomique et bio-informatique sur AWS.",
      },
      {
        en: "Productionize ML, deep-learning and text-mining algorithms — from data-science prototype to tested, containerized service.",
        fr: "Industrialisation d'algorithmes de ML, Deep Learning et Text Mining — du prototype data science au service conteneurisé et testé.",
      },
      {
        en: "Ship services built for load: Docker Compose locally, Kubernetes on AWS in production, auth delegated to Keycloak (OAuth2/OIDC).",
        fr: "Mise en production de services taillés pour la charge : Docker Compose en local, Kubernetes sur AWS, authentification déléguée à Keycloak (OAuth2/OIDC).",
      },
      {
        en: "Tooling for data-science teams to go from experiment to production faster (Poetry templates, argparse / python-fire CLIs).",
        fr: "Outillage des équipes data science pour passer plus vite de l'expérimentation à la production (gabarits Poetry, CLI argparse / python-fire).",
      },
      {
        en: "Keep the Python ecosystem state-of-the-art: version upgrades, Pytest, pylint / yapf / isort, Bitbucket CI.",
        fr: "Maintien de l'écosystème Python à l'état de l'art : montées de version, Pytest, pylint / yapf / isort, CI Bitbucket.",
      },
    ],
    stack: ["Python", "FastAPI", "Pandas", "NumPy", "Poetry", "Pytest", "Kubernetes", "AWS", "Keycloak", "Docker"],
  },
  {
    id: "inria",
    role: { en: "R&D Software Engineer", fr: "Ingénieur R&D" },
    company: "INRIA",
    context: {
      en: "French national research institute for digital science",
      fr: "Institut national de recherche en sciences du numérique",
    },
    location: rennes,
    start: { en: "Sep 2023", fr: "Sept. 2023" },
    end: { en: "May 2026", fr: "Mai 2026" },
    highlights: [
      {
        en: "Built and maintained a testing framework for decentralized ML algorithms across cluster, production and hybrid environments.",
        fr: "Conception et maintenance d'un framework de test pour algorithmes d'apprentissage décentralisés en environnements cluster, production et hybrides.",
      },
      {
        en: "Automated test pipelines that cut validation & deployment time by 40%, with 90%+ coverage.",
        fr: "Pipelines de test automatisés réduisant de 40 % le temps de validation et de déploiement, avec plus de 90 % de couverture.",
      },
      {
        en: "Designed high-performance Rust prototypes for federated-learning algorithms.",
        fr: "Prototypes Rust haute performance pour des algorithmes d'apprentissage fédéré.",
      },
      {
        en: "Designed a discrete-event simulation environment to test distributed ML algorithms at scale.",
        fr: "Conception d'un environnement de simulation à événements discrets pour tester des algorithmes de ML distribués à grande échelle.",
      },
      {
        en: "Collaborated with international research teams on distributed-systems architecture.",
        fr: "Collaboration avec des équipes de recherche internationales sur l'architecture de systèmes distribués.",
      },
    ],
    stack: ["Python", "Rust", "PyTorch", "TensorFlow", "Linux", "Distributed Systems"],
  },
  {
    id: "moobifun",
    role: { en: "Backend Developer", fr: "Développeur Backend" },
    company: "moobifun",
    location: yaounde,
    start: { en: "Apr 2023", fr: "Avr. 2023" },
    end: { en: "Aug 2023", fr: "Août 2023" },
    highlights: [
      {
        en: "Architected scalable Spring Boot microservices with JPA, inter-service calls via OpenFeign.",
        fr: "Architecture de microservices Spring Boot évolutifs avec JPA, communication inter-services via OpenFeign.",
      },
      {
        en: "Secured APIs with Spring Security, OAuth2 and JWT.",
        fr: "Sécurisation des API avec Spring Security, OAuth2 et JWT.",
      },
      {
        en: "Reached 85% coverage with JUnit; set up MySQL replication for high availability.",
        fr: "85 % de couverture avec JUnit ; mise en place de la réplication MySQL pour la haute disponibilité.",
      },
    ],
    stack: ["Java", "Spring Boot", "Spring Security", "OpenFeign", "MySQL", "Angular", "Docker"],
  },
  {
    id: "connect",
    role: { en: "Full-Stack Developer & IT Consultant", fr: "Développeur Full-Stack & Consultant IT" },
    company: "Connect Technology",
    location: yaounde,
    start: { en: "Oct 2022", fr: "Oct. 2022" },
    end: { en: "Mar 2023", fr: "Mars 2023" },
    highlights: [
      {
        en: "Built secure microservices for financial-transaction management with Spring Boot.",
        fr: "Microservices sécurisés de gestion de transactions financières avec Spring Boot.",
      },
      {
        en: "Designed a user-affiliation API with role-based access control.",
        fr: "API de gestion d'affiliation utilisateur avec contrôle d'accès par rôles.",
      },
      {
        en: "Shipped a real-time monitoring web app and MySQL replication for disaster recovery.",
        fr: "Application web de supervision temps réel et réplication MySQL pour la reprise après sinistre.",
      },
    ],
    stack: ["Java", "Spring Boot", "Spring Data", "MySQL", "Angular"],
  },
  {
    id: "enspy-lab",
    role: { en: "Software Engineer — AI Lab", fr: "Ingénieur Logiciel — Laboratoire IA" },
    company: "ENSPY AI Laboratory",
    location: yaounde,
    start: { en: "Feb 2022", fr: "Févr. 2022" },
    end: { en: "Jul 2022", fr: "Juil. 2022" },
    highlights: [
      {
        en: "Built an NLP dialogue system for doctor–patient interaction in a 3D environment.",
        fr: "Système de dialogue NLP pour l'interaction médecin–patient dans un environnement 3D.",
      },
      {
        en: "Integrated TensorFlow and BERT models; trained ML models for diagnostic learning.",
        fr: "Intégration de modèles TensorFlow et BERT ; modèles de ML pour l'apprentissage diagnostique.",
      },
    ],
    stack: ["TensorFlow", "BERT", "spaCy", "PyAgrum", "Django REST", "React Native"],
  },
];
