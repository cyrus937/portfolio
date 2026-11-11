import type { T } from "@/lib/i18n";

export const education: { school: string; degree: T; period: string; location: T; coursework: T }[] = [
  {
    school: "École Nationale Supérieure Polytechnique de Yaoundé",
    degree: { en: "Master's in Computer Engineering", fr: "Diplôme d'ingénieur en génie informatique" },
    period: "2017 — 2022",
    location: { en: "Yaoundé, Cameroon", fr: "Yaoundé, Cameroun" },
    coursework: {
      en: "Data structures, software methodology, databases, data mining, AI, statistics, OOP",
      fr: "Structures de données, méthodologie logicielle, bases de données, data mining, IA, statistiques, POO",
    },
  },
  {
    school: "Université de Yaoundé I",
    degree: { en: "Bachelor's year 1 — Mathematics", fr: "Licence 1 — Mathématiques" },
    period: "2016 — 2017",
    location: { en: "Yaoundé, Cameroon", fr: "Yaoundé, Cameroun" },
    coursework: {
      en: "Calculus, linear algebra, probability, statistics, numerical analysis",
      fr: "Analyse, algèbre linéaire, probabilités, statistiques, analyse numérique",
    },
  },
];

export const certifications: { group: T; items: { name: string; issuer: string }[] }[] = [
  {
    group: { en: "Cloud & DevOps", fr: "Cloud & DevOps" },
    items: [
      { name: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google Cloud" },
      { name: "Big Data and Machine Learning Fundamentals", issuer: "Google Cloud" },
      { name: "Docker Certified Associate Specialization", issuer: "LearnKarts" },
    ],
  },
  {
    group: { en: "Machine Learning", fr: "Machine Learning" },
    items: [
      { name: "Machine Learning", issuer: "Stanford University" },
      { name: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI" },
    ],
  },
  {
    group: { en: "Programming", fr: "Programmation" },
    items: [
      { name: "Python Development Professional Certificate", issuer: "Microsoft" },
      { name: "Python for Everybody Specialization", issuer: "University of Michigan" },
      { name: "Object-Oriented Programming in Java", issuer: "EPFL" },
      { name: "Initiation to Programming in Java", issuer: "EPFL" },
      { name: "Introduction to HTML5", issuer: "University of Michigan" },
    ],
  },
  {
    group: { en: "Databases", fr: "Bases de données" },
    items: [
      { name: "Database Design and Basic SQL in PostgreSQL", issuer: "University of Michigan" },
      { name: "Introduction to NoSQL Databases", issuer: "IBM" },
    ],
  },
];

export const leadership = {
  title: { en: "Team Lead & Co-founder", fr: "Team Lead & Co-fondateur" },
  org: "GiTech",
  period: "2020 — 2022",
  points: [
    { en: "Led a team of 7 developers across multiple client projects.", fr: "Direction d'une équipe de 7 développeurs sur plusieurs projets clients." },
    { en: "Set up agile rituals and code-review standards.", fr: "Mise en place des rituels agiles et des standards de revue de code." },
    { en: "Mentored junior developers on modern frameworks and practices.", fr: "Mentorat de développeurs juniors sur les frameworks et pratiques modernes." },
    { en: "Won 1st place at ENSPY's science competition with iCare.", fr: "1er prix du concours scientifique de l'ENSPY avec iCare." },
  ] satisfies T[],
};
