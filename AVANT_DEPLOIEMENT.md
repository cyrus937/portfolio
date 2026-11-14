# À vérifier avant de déployer

Checklist de relecture du portfolio refait (branche `redesign`). Coche au fur et à mesure.
Les cases marquées **[bloquant]** doivent être faites avant la mise en ligne. Les autres peuvent attendre.

---

## 1. Contenu rédigé à ta place : relire mot à mot

Ces textes ont été écrits à partir de ton CV et de tes README. Ils sont crédibles, mais c'est ta signature : corrige tout ce qui ne sonne pas comme toi ou qui n'est pas exact.

- [ ] **[bloquant]** Article « Du notebook à la production » : `src/posts/notebook-to-production.{fr,en}.mdx`
  - Les exemples de code (`predict`, `test_predict_keeps_row_count`, `python -m scoring.predict`) sont **illustratifs**. Ils ne viennent pas de ton code client. Vérifie qu'ils ne laissent rien supposer de confidentiel sur la mission MDS.
  - Vérifie que tu peux parler publiquement de la stack de la mission (AWS, Kubernetes, Keycloak, Bitbucket) : clause de confidentialité ?
- [ ] **[bloquant]** Article « Simulation FL reproductible » : `src/posts/reproducible-fl-simulation.{fr,en}.mdx`
  - La boucle `heapq` est une version simplifiée. Vérifie qu'elle correspond bien au principe d'`async_fl_bench`.
  - « Neuf stratégies » et « six jeux de données » : à vérifier dans le dépôt.
  - Le tableau threads/DES et l'affirmation sur le GIL viennent du README. Vérifie que c'est toujours vrai.
- [ ] Les deux articles sont datés du **2026-11-10** (`src/content/posts.ts`). Mets la vraie date de publication.
- [ ] **[bloquant]** Études de cas (`src/content/projects.ts`, champ `caseStudy`), pour les 4 projets (testforge, async-fl-bench, currency-api, icare) :
  - [ ] **TestForge** : 5 langages, pipeline en 3 étapes, HNSW + Tantivy. L'état d'avancement est-il exact ? (CLI, API et extension VS Code sont « à venir » dans la section « En ce moment »).
  - [ ] **async-fl-bench** : 9 stratégies dont 2 originales, 6 jeux de données (MNIST, CIFAR-10/100, FEMNIST, CelebA, synthétique).
  - [ ] **Currency API** : « 150+ devises », « 10+ endpoints », « MIT ». Vérifie la licence du dépôt et ces chiffres.
  - [ ] **iCare** : « 1er prix ENSPY », « 7 développeurs », modèle KNN. Le rôle est formulé « Team lead at GiTech ». Vérifie que c'est exact.
  - [ ] Les sections **Learnings / Ce que j'en retiens** sont rédigées à la première personne : ce sont celles qui demandent le plus d'attention.
  - [ ] Les schémas d'architecture (`architecture`) et les extraits de code (`code`) : sont-ils fidèles aux projets ?

## 2. Informations personnelles et chiffres

- [ ] **[bloquant]** `src/content/profile.ts`
  - [ ] Le **numéro de téléphone** (`+33 7 58 38 78 50`) est publié en clair sur le site et dans le terminal. Est-ce voulu ? Sinon, retire-le.
  - [ ] Email, LinkedIn et Twitter : les liens sont à jour ? (le compte Twitter `CyrilleKenfack` existe toujours ?)
  - [ ] Chiffres affichés dans le hero : **5+ ans**, **−40 %**, **90 %+**, **7 développeurs**. Ils doivent correspondre exactement au CV.
  - [ ] Disponibilité : « Ouvert aux opportunités · Mobile géographiquement ». C'est délicat si ton employeur actuel consulte le site.
- [ ] `src/content/experience.ts` : dates et intitulés de poste.
  - MDS : juin 2026 → aujourd'hui
  - INRIA : sept. 2023 → mai 2026
  - moobifun, Connect Technology, ENSPY AI Lab
- [ ] La formulation du contexte MDS (« leader international du diagnostic in vitro ») ne doit pas permettre d'identifier le client si c'est confidentiel.
- [ ] `src/content/now.ts` : section « En ce moment ». Mets à jour `updated` à chaque modification, sinon elle paraîtra vite datée.
- [ ] `src/content/education.ts` : diplômes, certifications, années.
- [ ] `src/content/skills.ts` : niveaux de compétence affichés. Tu dois pouvoir les défendre en entretien.
- [ ] `src/content/github.ts` : descriptions bilingues des dépôts mis en avant.

## 3. Fichiers et médias

- [ ] **[bloquant]** `public/cv/Cyrille_Kenfack_CV_EN.pdf` et `public/cv/Cyrille_Kenfack_CV_FR.pdf` : ce sont bien les **dernières versions** ? Elles sont téléchargeables publiquement, téléphone compris.
- [ ] `src/assets/portrait.webp` : photo correcte et à jour ?
- [ ] `public/og.png` : image d'aperçu pour LinkedIn, Slack, etc. Vérifie le rendu après le déploiement avec un outil d'aperçu de partage, par exemple l'[inspecteur LinkedIn](https://www.linkedin.com/post-inspector/).
- [ ] `public/favicon.svg` : le monogramme « ck » te convient ?

## 4. Recommandations (section masquée)

- [ ] `src/content/testimonials.ts` est **vide**. La section n'apparaît donc pas : rien n'a été inventé.
- [ ] Pour l'activer, colle de **vraies** recommandations LinkedIn en suivant le modèle commenté dans le fichier, avec l'accord de leurs auteurs.

## 5. Configuration du déploiement (Vercel)

- [ ] **[bloquant]** **Domaine** : `SITE_URL` vaut `https://cyrus-k.vercel.app` dans `src/lib/head.ts`. Il est utilisé pour les URL canoniques, hreflang, le sitemap, les flux RSS et Open Graph.
  - Si ton domaine est différent, modifie-le ici **et** dans le bloc JSON-LD de `index.html`.
  - Pense aussi à la ligne `Sitemap:` de `public/robots.txt`.
- [ ] **[bloquant]** Paramètres du projet Vercel :
  - Framework preset : **Vite**
  - Build command : `npm run build`
  - Output directory : `dist`
  - Version de Node : **20+**
- [ ] **[bloquant]** Variables d'environnement Vercel (EmailJS, voir `.env.example`) : `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
  - Sans ces variables, les valeurs par défaut de l'ancien site sont utilisées. Vérifie que ce service et ce template EmailJS existent toujours.
  - Dans EmailJS, restreins les domaines autorisés à ton domaine.
- [ ] `GITHUB_TOKEN` (facultatif) dans Vercel : il évite la limite de 60 requêtes par heure de l'API GitHub au build. Sans lui, la build reprend l'instantané `src/content/github.json`.
- [ ] **Analytics** : active « Web Analytics » dans le tableau de bord Vercel du projet. Les événements personnalisés (CV téléchargé, message envoyé, commandes du terminal) demandent un **forfait payant**. Sur le forfait gratuit, ils sont simplement ignorés.
- [ ] Si l'ancien site utilisait un domaine personnalisé (un `CNAME` a été supprimé dans l'historique), reconfigure-le dans Vercel.

## 6. CI GitHub Actions

- [ ] `.github/workflows/ci.yml` se déclenche sur `main` **et** `redesign`. Retire `redesign` après la fusion.
- [ ] `lighthouserc.json` publie les rapports Lighthouse sur un **stockage public temporaire** (liens non listés, mais publics). Pour les garder privés :
  - remplace `"target": "temporary-public-storage"` par `"filesystem"` ;
  - ou retire l'étape Lighthouse du workflow.
- [ ] `LHCI_GITHUB_APP_TOKEN` (facultatif) : seulement si tu veux le statut Lighthouse directement sur les PR.

## 7. Tests manuels avant la mise en ligne

Lance `npm run build`, puis `npm run preview`, ou utilise l'URL de prévisualisation Vercel.

- [ ] Tests automatiques : `CHROME_PATH=/usr/bin/google-chrome npm test`. Les 21 doivent passer.
- [ ] **Formulaire de contact** : envoie un vrai message depuis la préversion et vérifie qu'il arrive dans ta boîte. Les tests simulent EmailJS : ils ne prouvent pas que l'envoi réel fonctionne.
- [ ] Téléchargement des deux CV (FR et EN).
- [ ] Bascule FR/EN sur chaque page :
  - accueil
  - étude de cas
  - blog
  - article
  - 404
- [ ] Thème sombre, clair et auto, sur Chrome, Firefox et Safari. Safari n'a pas toutes les transitions : la bascule doit rester instantanée et propre.
- [ ] Sur un vrai téléphone : menu, défilement, absence de scroll horizontal, formulaire.
- [ ] Liens externes :
  - GitHub, LinkedIn, Twitter
  - l'API en ligne `https://api-currency-converter.my-finapp.com/docs` (elle répond toujours ?)
  - les dépôts cités
- [ ] Terminal : `help`, `whoami`, `projects`, `open testforge`, `cv`, `contact`. Les réponses sont exactes ?
- [ ] Palette ⌘K / Ctrl+K.
- [ ] `https://<ton-domaine>/sitemap.xml` et `/rss.xml` s'ouvrent après le déploiement.

## 8. Après le déploiement

- [ ] Soumets le sitemap dans **Google Search Console**.
- [ ] Mets à jour le lien du portfolio sur LinkedIn, GitHub et dans tes CV.
- [ ] Lance un PageSpeed Insights sur l'URL de production. Scores locaux : 97 à 100.

## 9. Git

- [ ] Rien n'est encore commité. Relis le diff (`git status`, `git diff --stat`) : l'ancien site CRA est entièrement supprimé (`src/`, `public/`, `package-lock.json`).
- [ ] Commite sur `redesign`, ouvre une PR vers `main` et vérifie que la CI passe, puis fusionne.
- [ ] Vérifie que `package-lock.json` est bien régénéré et commité : `npm ci` en dépend, en CI comme sur Vercel.
