import type { T } from "@/lib/i18n";

export type VisualKind = "api" | "health" | "auction" | "gis" | "wallet" | "fish" | "search" | "gossip";

/** Layered architecture diagram: each layer flows into the next. */
export type Diagram = {
  layer: T;
  nodes: { name: string; note?: T }[];
  /** Optional label on the connector *below* this layer. */
  via?: string;
}[];

export type CaseStudy = {
  role: T;
  status: T;
  problem: T;
  approach: { title: T; body: T }[];
  architecture: Diagram;
  code?: { file: string; lang: string; snippet: string };
  results: { value: string; label: T }[];
  learnings: T[];
};

export type Project = {
  id: string;
  title: T;
  year: string;
  kind: T;
  summary: T;
  points: T[];
  stack: string[];
  visual: VisualKind;
  badge?: T;
  live?: string;
  repo?: string;
  /** Bento sizing on large screens. */
  span?: "wide" | "tall" | "normal";
  caseStudy?: CaseStudy;
};

const GH = "https://github.com/cyrus937";

export const projects: Project[] = [
  /* ───────────────────────── TestForge ───────────────────────── */
  {
    id: "testforge",
    title: { en: "TestForge", fr: "TestForge" },
    year: "2026",
    kind: { en: "Dev tool · AI", fr: "Outil dev · IA" },
    summary: {
      en: "Semantic code search and context-aware test generation: index the whole codebase first, then write tests that understand it.",
      fr: "Recherche sémantique de code et génération de tests contextuelle : indexer toute la base de code d'abord, puis écrire des tests qui la comprennent.",
    },
    points: [
      { en: "Rust core: tree-sitter parsing, dependency graph, parallel indexing", fr: "Cœur Rust : parsing tree-sitter, graphe de dépendances, indexation parallèle" },
      { en: "Hybrid search — HNSW vectors + Tantivy full-text", fr: "Recherche hybride — vecteurs HNSW + plein texte Tantivy" },
      { en: "Python AI layer over PyO3: embeddings & LLM test generation", fr: "Couche IA Python via PyO3 : embeddings et génération de tests par LLM" },
    ],
    stack: ["Rust", "Python", "PyO3", "tree-sitter", "Tantivy", "LLM"],
    visual: "search",
    badge: { en: "Open source", fr: "Open source" },
    repo: `${GH}/testforge`,
    span: "wide",
    caseStudy: {
      role: { en: "Author — design & implementation", fr: "Auteur — conception et développement" },
      status: { en: "Active · core engine & AI layer built, CLI / API / VS Code in progress", fr: "Actif · moteur et couche IA réalisés, CLI / API / VS Code en cours" },
      problem: {
        en: "Most AI test generators work function by function: they see a signature, guess what it does and produce shallow tests with wrong mocks and missing edge cases. They have no idea how the code fits into the rest of the system.",
        fr: "La plupart des générateurs de tests IA travaillent fonction par fonction : ils voient une signature, devinent son rôle et produisent des tests superficiels, avec de mauvais mocks et sans cas limites. Ils ignorent comment le code s'insère dans le reste du système.",
      },
      approach: [
        {
          title: { en: "Index before you generate", fr: "Indexer avant de générer" },
          body: {
            en: "A Rust engine walks the project (.gitignore-aware), parses every file into an AST with tree-sitter, extracts symbols and builds a dependency graph of who calls what. Content hashing makes re-indexing incremental and rayon parallelises it.",
            fr: "Un moteur Rust parcourt le projet (en respectant .gitignore), transforme chaque fichier en AST avec tree-sitter, extrait les symboles et construit un graphe de dépendances. Un hachage du contenu rend la réindexation incrémentale, et rayon la parallélise.",
          },
        },
        {
          title: { en: "Search by meaning, not by name", fr: "Chercher par le sens, pas par le nom" },
          body: {
            en: "Queries like “where do we handle JWT refresh?” are embedded and matched with HNSW vector search, then re-ranked together with Tantivy full-text results — so code is found even when no identifier contains the keyword.",
            fr: "Une question comme « où gère-t-on le refresh JWT ? » est vectorisée puis recherchée via HNSW, et re-classée avec les résultats plein texte de Tantivy — le code est trouvé même si aucun identifiant ne contient le mot-clé.",
          },
        },
        {
          title: { en: "Give the LLM real context", fr: "Donner un vrai contexte au LLM" },
          body: {
            en: "For a target symbol, TestForge gathers its body, docstring, callers and callees, similar functions and the project's existing tests as a style reference. That enriched prompt goes to Claude, GPT or a local model; output is validated and formatted.",
            fr: "Pour un symbole cible, TestForge rassemble son code, sa docstring, ses appelants et appelés, des fonctions similaires et les tests existants comme référence de style. Ce prompt enrichi part vers Claude, GPT ou un modèle local ; la sortie est validée et formatée.",
          },
        },
        {
          title: { en: "Each language where it's strongest", fr: "Chaque langage là où il excelle" },
          body: {
            en: "Rust handles everything performance-sensitive; Python handles the ML ecosystem. PyO3 exposes index_project() and parse_source() to Python with no serialisation layer in between.",
            fr: "Rust gère tout ce qui est sensible aux performances ; Python, l'écosystème ML. PyO3 expose index_project() et parse_source() à Python sans couche de sérialisation intermédiaire.",
          },
        },
      ],
      architecture: [
        {
          layer: { en: "Interfaces", fr: "Interfaces" },
          nodes: [
            { name: "CLI · Clap", note: { en: "planned", fr: "prévu" } },
            { name: "REST · Axum", note: { en: "planned", fr: "prévu" } },
            { name: "VS Code", note: { en: "planned", fr: "prévu" } },
          ],
        },
        {
          layer: { en: "Core engine · Rust", fr: "Moteur · Rust" },
          nodes: [{ name: "Indexer · tree-sitter" }, { name: "Search · HNSW + Tantivy" }, { name: "Watcher · notify" }],
        },
        {
          layer: { en: "Storage", fr: "Stockage" },
          nodes: [{ name: "Vector store" }, { name: "SQLite" }, { name: "Dependency graph" }],
          via: "PyO3 bridge",
        },
        {
          layer: { en: "AI layer · Python", fr: "Couche IA · Python" },
          nodes: [{ name: "Embeddings · sentence-transformers" }, { name: "Test generator · Claude / GPT / Ollama" }, { name: "Prompt engine" }],
        },
      ],
      code: {
        file: "terminal",
        lang: "bash",
        snippet: `testforge init --languages python,rust,typescript
testforge index .                  # AST → symbols → graph → embeddings
testforge search "authentication logic"
testforge gen-tests src/auth/login.py`,
      },
      results: [
        { value: "5", label: { en: "languages parsed — Python, Rust, JS, TS, Java", fr: "langages analysés — Python, Rust, JS, TS, Java" } },
        { value: "3", label: { en: "stage pipeline: index → search → generate", fr: "étapes : indexer → chercher → générer" } },
        { value: "2", label: { en: "search engines fused: vector + full-text", fr: "moteurs de recherche fusionnés : vectoriel + plein texte" } },
      ],
      learnings: [
        {
          en: "Context beats model size: the quality of generated tests depends far more on what you feed the LLM than on which LLM you use.",
          fr: "Le contexte compte plus que la taille du modèle : la qualité des tests dépend bien plus de ce qu'on donne au LLM que du LLM choisi.",
        },
        {
          en: "Designing a clean Rust ↔ Python boundary early (PyO3 + maturin) keeps both sides independently testable.",
          fr: "Définir tôt une frontière Rust ↔ Python propre (PyO3 + maturin) permet de tester chaque côté indépendamment.",
        },
      ],
    },
  },

  /* ───────────────────────── async_fl_bench ───────────────────────── */
  {
    id: "async-fl-bench",
    title: { en: "Async FL Bench", fr: "Async FL Bench" },
    year: "2026",
    kind: { en: "Research tooling · Distributed ML", fr: "Outil de recherche · ML distribué" },
    summary: {
      en: "A deterministic discrete-event simulator to benchmark asynchronous, decentralised federated learning at scale.",
      fr: "Un simulateur déterministe à événements discrets pour évaluer l'apprentissage fédéré décentralisé et asynchrone à grande échelle.",
    },
    points: [
      { en: "9 aggregation strategies, 2 of them original", fr: "9 stratégies d'agrégation, dont 2 originales" },
      { en: "IID & Dirichlet non-IID partitioning on 6 datasets", fr: "Partitionnement IID et Dirichlet non-IID sur 6 jeux de données" },
      { en: "Reproducible at fixed seed — unlike thread-based runs", fr: "Reproductible à seed fixée — contrairement aux exécutions multi-threads" },
    ],
    stack: ["Python", "PyTorch", "heapq", "YAML", "NumPy"],
    visual: "gossip",
    badge: { en: "Research", fr: "Recherche" },
    repo: `${GH}/async_fl_bench`,
    span: "tall",
    caseStudy: {
      role: { en: "Author — R&D Software Engineer context", fr: "Auteur — dans le cadre de la R&D" },
      status: { en: "Used for experiments · 2026", fr: "Utilisé pour les expériences · 2026" },
      problem: {
        en: "A previous version ran one OS thread per node. Asynchrony came implicitly from the OS scheduler, so results were not reproducible, and the GIL capped CPU performance. Comparing aggregation strategies fairly was impossible.",
        fr: "Une version précédente lançait un thread système par nœud. L'asynchronisme venait implicitement de l'ordonnanceur de l'OS : résultats non reproductibles, performances CPU bridées par le GIL. Comparer équitablement les stratégies d'agrégation était impossible.",
      },
      approach: [
        {
          title: { en: "Make time explicit", fr: "Rendre le temps explicite" },
          body: {
            en: "A discrete-event simulation keeps a heap of (time, node, action) events. The earliest event runs, then the node schedules its next one. Heterogeneity is modelled with per-node speeds: a speed-5 node acts five times as often as a speed-1 node.",
            fr: "Une simulation à événements discrets maintient un tas d'événements (temps, nœud, action). Le plus proche est traité, puis le nœud planifie le suivant. L'hétérogénéité est modélisée par une vitesse par nœud : un nœud de vitesse 5 agit cinq fois plus souvent qu'un nœud de vitesse 1.",
          },
        },
        {
          title: { en: "Keep the asynchrony that matters", fr: "Garder l'asynchronisme qui compte" },
          body: {
            en: "Each node's GossipSampler runs in a background thread and refreshes its peer view in wall-clock time. That is the only source of true asynchrony: when a node picks a peer, its view may have changed since its last event.",
            fr: "Le GossipSampler de chaque nœud tourne dans un thread en arrière-plan et met à jour sa vue des pairs en temps réel. C'est la seule source d'asynchronisme véritable : quand un nœud choisit un pair, sa vue peut avoir changé depuis son dernier événement.",
          },
        },
        {
          title: { en: "Strategies as plug-ins", fr: "Des stratégies interchangeables" },
          body: {
            en: "Nine aggregation methods share one interface — from FedAvg-style averaging, D-PSGD gossip, AD-PSGD and D² to staleness-aware decay functions, plus two original methods: Progressive (online mean) and SPGA (size-polynomial gossip aggregation).",
            fr: "Neuf méthodes d'agrégation partagent une même interface — de la moyenne façon FedAvg, D-PSGD, AD-PSGD et D² aux fonctions de décroissance selon l'obsolescence, plus deux méthodes originales : Progressive (moyenne en ligne) et SPGA (agrégation gossip polynomiale en taille).",
          },
        },
        {
          title: { en: "Config-driven experiments", fr: "Des expériences pilotées par la config" },
          body: {
            en: "Everything is a YAML default overridable from the CLI, so a full sweep — all strategies, IID vs non-IID, several datasets — is one command, and two experiments can run as independent processes.",
            fr: "Tout part d'un YAML surchargeable en ligne de commande : un balayage complet — toutes les stratégies, IID vs non-IID, plusieurs jeux de données — tient en une commande, et deux expériences peuvent tourner en processus indépendants.",
          },
        },
      ],
      architecture: [
        { layer: { en: "Entry", fr: "Entrée" }, nodes: [{ name: "run.py · CLI" }, { name: "configs/*.yaml" }, { name: "--set key=value" }] },
        {
          layer: { en: "Simulation · DES", fr: "Simulation · DES" },
          nodes: [{ name: "Event heap · heapq" }, { name: "Node state" }, { name: "GossipSampler · bg thread" }],
        },
        {
          layer: { en: "Learning", fr: "Apprentissage" },
          nodes: [
            { name: "9 aggregation strategies" },
            { name: "MLP · CNN · ResNet-8 · MobileLite" },
            { name: "IID / Dirichlet partitioning" },
          ],
        },
        { layer: { en: "Output", fr: "Sortie" }, nodes: [{ name: "Metrics tracker" }, { name: "results/…" }] },
      ],
      code: {
        file: "terminal",
        lang: "bash",
        snippet: `# one experiment, overriding the default config
python run.py --config configs/default.yaml \\
    --set data.name=cifar10 \\
    --set simulation.n_rounds=100 \\
    --set aggregation.strategy=spga

# benchmark every strategy
python run.py --all-strategies`,
      },
      results: [
        { value: "9", label: { en: "aggregation strategies, incl. 2 original methods", fr: "stratégies d'agrégation, dont 2 méthodes originales" } },
        { value: "6", label: { en: "datasets — MNIST, CIFAR-10/100, FEMNIST, CelebA, synthetic", fr: "jeux de données — MNIST, CIFAR-10/100, FEMNIST, CelebA, synthétique" } },
        { value: "1", label: { en: "thread for the simulation loop — deterministic at fixed seed", fr: "thread pour la boucle de simulation — déterministe à seed fixée" } },
      ],
      learnings: [
        {
          en: "Reproducibility is a feature you design for: moving from implicit OS scheduling to explicit simulated time made every result explainable.",
          fr: "La reproductibilité se conçoit : passer d'un ordonnancement implicite à un temps simulé explicite a rendu chaque résultat explicable.",
        },
        {
          en: "Isolating the one truly asynchronous component (gossip) kept realism without sacrificing determinism elsewhere.",
          fr: "Isoler le seul composant réellement asynchrone (le gossip) a préservé le réalisme sans sacrifier le déterminisme ailleurs.",
        },
      ],
    },
  },

  /* ───────────────────────── Currency API ───────────────────────── */
  {
    id: "currency-api",
    title: { en: "Currency Converter API", fr: "API de conversion de devises" },
    year: "2025",
    kind: { en: "Open-source API", fr: "API open source" },
    summary: {
      en: "A free, production-ready Flask API for real-time conversion across 150+ fiat and crypto currencies.",
      fr: "Une API Flask gratuite et prête pour la production : conversion temps réel sur plus de 150 devises fiat et crypto.",
    },
    points: [
      { en: "JWT auth with refresh rotation & revocation list", fr: "Auth JWT avec rotation des refresh tokens et liste de révocation" },
      { en: "Redis caching + Celery workers for async jobs", fr: "Cache Redis + workers Celery pour les tâches asynchrones" },
      { en: "Multi-stage Docker builds, Gunicorn, Swagger docs", fr: "Builds Docker multi-étapes, Gunicorn, docs Swagger" },
    ],
    stack: ["Flask", "PostgreSQL", "Redis", "Celery", "Docker"],
    visual: "api",
    badge: { en: "Live", fr: "En ligne" },
    live: "https://api-currency-converter.my-finapp.com/docs",
    repo: `${GH}/flask-currency-converter`,
    span: "wide",
    caseStudy: {
      role: { en: "Author — backend, infra, docs", fr: "Auteur — backend, infra, documentation" },
      status: { en: "In production", fr: "En production" },
      problem: {
        en: "Fintech side projects need currency conversion, but most rate APIs are rate-limited, paid, or lack auth and history. I wanted a free API that behaves like a production service: authenticated, cached, observable and documented.",
        fr: "Les projets fintech ont besoin de conversion de devises, mais la plupart des API de taux sont limitées, payantes, ou sans authentification ni historique. Je voulais une API gratuite qui se comporte comme un vrai service de production : authentifiée, mise en cache, observable et documentée.",
      },
      approach: [
        {
          title: { en: "Security first", fr: "La sécurité d'abord" },
          body: {
            en: "Registration and login with bcrypt-hashed passwords, JWT access tokens with automatic refresh-token rotation, a revoked-token blacklist, per-user API keys, Marshmallow validation and rate limiting.",
            fr: "Inscription et connexion avec mots de passe hachés (bcrypt), jetons JWT avec rotation automatique des refresh tokens, liste noire des jetons révoqués, clés API par utilisateur, validation Marshmallow et limitation de débit.",
          },
        },
        {
          title: { en: "Fast by default", fr: "Rapide par défaut" },
          body: {
            en: "Rates are cached in Redis so most conversions never leave the box. Rate providers sit behind a fallback chain, and Celery workers handle background refreshes and batch jobs.",
            fr: "Les taux sont mis en cache dans Redis : la plupart des conversions ne sortent jamais du serveur. Les fournisseurs de taux sont derrière une chaîne de repli, et des workers Celery gèrent les rafraîchissements et traitements par lot.",
          },
        },
        {
          title: { en: "Ship it like production", fr: "Livrer comme en production" },
          body: {
            en: "Multi-stage Docker images, Gunicorn workers for horizontal scaling, docker-compose for the full stack, a Pytest suite with coverage reports, and OpenAPI 3 docs with a getting-started guide.",
            fr: "Images Docker multi-étapes, workers Gunicorn pour la montée en charge horizontale, docker-compose pour toute la stack, suite Pytest avec rapports de couverture, et documentation OpenAPI 3 avec guide de démarrage.",
          },
        },
      ],
      architecture: [
        { layer: { en: "Clients", fr: "Clients" }, nodes: [{ name: "Apps · curl" }, { name: "Swagger UI" }, { name: "Web dashboard" }], via: "HTTPS · JWT / X-API-Key" },
        {
          layer: { en: "API · Flask + Gunicorn", fr: "API · Flask + Gunicorn" },
          nodes: [{ name: "/api/auth" }, { name: "/api/conversions" }, { name: "/api/currencies" }, { name: "/api/keys" }],
        },
        { layer: { en: "Async & cache", fr: "Asynchrone & cache" }, nodes: [{ name: "Redis cache" }, { name: "Celery workers" }, { name: "Rate providers · fallback" }] },
        { layer: { en: "Data", fr: "Données" }, nodes: [{ name: "PostgreSQL · SQLAlchemy" }, { name: "History · favourites" }] },
      ],
      code: {
        file: "terminal",
        lang: "bash",
        snippet: `curl -X POST https://api-currency-converter.my-finapp.com/api/conversions/convert \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"from": "EUR", "to": "XAF", "amount": 100}'`,
      },
      results: [
        { value: "150+", label: { en: "fiat & crypto currencies", fr: "devises fiat et crypto" } },
        { value: "10+", label: { en: "documented OpenAPI endpoints", fr: "endpoints OpenAPI documentés" } },
        { value: "0 €", label: { en: "free and open source (MIT)", fr: "gratuite et open source (MIT)" } },
      ],
      learnings: [
        {
          en: "Caching is a product decision: deciding how stale a rate may be shapes both cost and user trust.",
          fr: "La mise en cache est une décision produit : choisir l'âge acceptable d'un taux influe à la fois sur les coûts et sur la confiance.",
        },
        {
          en: "Good docs are part of the API. The getting-started flow in Swagger answered most questions before they were asked.",
          fr: "Une bonne documentation fait partie de l'API. Le guide de démarrage dans Swagger répond à la plupart des questions avant qu'elles ne soient posées.",
        },
      ],
    },
  },

  /* ───────────────────────── iCare ───────────────────────── */
  {
    id: "icare",
    title: { en: "iCare", fr: "iCare" },
    year: "2021",
    kind: { en: "Mobile · Health", fr: "Mobile · Santé" },
    summary: {
      en: "Healthcare companion app: find nearby facilities and get a symptom-based pre-diagnosis.",
      fr: "Application santé : trouver les établissements proches et obtenir un pré-diagnostic à partir des symptômes.",
    },
    points: [
      { en: "KNN model for symptom → disease prediction", fr: "Modèle KNN pour la prédiction symptômes → maladie" },
      { en: "Geolocated pharmacies & hospitals", fr: "Pharmacies et hôpitaux géolocalisés" },
    ],
    stack: ["React Native", "Django REST", "PostgreSQL", "scikit-learn"],
    visual: "health",
    badge: { en: "1st prize · ENSPY", fr: "1er prix · ENSPY" },
    caseStudy: {
      role: { en: "Team lead at GiTech", fr: "Team lead chez GiTech" },
      status: { en: "1st prize, ENSPY science competition", fr: "1er prix du concours scientifique de l'ENSPY" },
      problem: {
        en: "Information about healthcare facilities — which pharmacy or hospital is nearby, what it offers — was hard to find, and there was no simple way to get a first opinion on symptoms remotely.",
        fr: "Les informations sur les établissements de santé — quelle pharmacie ou quel hôpital est proche, quels services il propose — étaient difficiles à trouver, et il n'existait pas de moyen simple d'obtenir un premier avis à distance sur ses symptômes.",
      },
      approach: [
        {
          title: { en: "One app, two jobs", fr: "Une application, deux missions" },
          body: {
            en: "A React Native client with a facility directory (pharmacies, hospitals, services) ranked by distance using the phone's location, and a guided symptom checker.",
            fr: "Un client React Native avec un annuaire d'établissements (pharmacies, hôpitaux, services) classés par distance grâce à la géolocalisation, et un questionnaire de symptômes guidé.",
          },
        },
        {
          title: { en: "A simple, explainable model", fr: "Un modèle simple et explicable" },
          body: {
            en: "A k-nearest-neighbours classifier (scikit-learn) maps the reported symptoms to likely conditions. It is fast, needs little data, and its neighbours can be shown to explain a result — always framed as a pre-diagnosis, not a medical opinion.",
            fr: "Un classifieur des k plus proches voisins (scikit-learn) associe les symptômes déclarés à des pathologies probables. Rapide, peu gourmand en données, ses voisins peuvent être montrés pour expliquer un résultat — toujours présenté comme un pré-diagnostic, pas un avis médical.",
          },
        },
        {
          title: { en: "A clean API in the middle", fr: "Une API propre au milieu" },
          body: {
            en: "Django REST Framework exposes facilities, geosearch and prediction endpoints over PostgreSQL, so the model can be retrained and redeployed without shipping a new app.",
            fr: "Django REST Framework expose les établissements, la recherche géographique et la prédiction sur PostgreSQL : le modèle peut être ré-entraîné et redéployé sans publier une nouvelle version de l'application.",
          },
        },
      ],
      architecture: [
        { layer: { en: "Mobile", fr: "Mobile" }, nodes: [{ name: "React Native" }, { name: "Geolocation" }, { name: "Symptom checker" }], via: "REST" },
        { layer: { en: "API · Django REST", fr: "API · Django REST" }, nodes: [{ name: "Facilities" }, { name: "Geo search" }, { name: "Prediction" }] },
        { layer: { en: "Data & model", fr: "Données & modèle" }, nodes: [{ name: "PostgreSQL" }, { name: "KNN · scikit-learn" }] },
      ],
      results: [
        { value: "1st", label: { en: "prize at ENSPY's science competition", fr: "prix au concours scientifique de l'ENSPY" } },
        { value: "7", label: { en: "developers in the GiTech team I led", fr: "développeurs dans l'équipe GiTech que je dirigeais" } },
        { value: "KNN", label: { en: "explainable model, retrainable server-side", fr: "modèle explicable, ré-entraînable côté serveur" } },
      ],
      learnings: [
        {
          en: "For health, explainability and careful wording matter as much as accuracy.",
          fr: "En santé, l'explicabilité et la formulation comptent autant que la précision.",
        },
        {
          en: "Leading the team taught me to cut scope early and demo often.",
          fr: "Diriger l'équipe m'a appris à réduire le périmètre tôt et à faire des démos souvent.",
        },
      ],
    },
  },

  /* ───────────────────────── Smaller projects ───────────────────────── */
  {
    id: "auction",
    title: { en: "Agricultural Auction Platform", fr: "Plateforme d'enchères agricoles" },
    year: "2022",
    kind: { en: "Real-time web", fr: "Web temps réel" },
    summary: {
      en: "Online auctions for agricultural products, built to keep markets running during COVID-19.",
      fr: "Enchères en ligne de produits agricoles, pour maintenir les marchés actifs pendant la COVID-19.",
    },
    points: [
      { en: "Live bidding over WebSockets", fr: "Enchères en direct via WebSockets" },
      { en: "Favorites, notifications, user management", fr: "Favoris, notifications, gestion des utilisateurs" },
    ],
    stack: ["Node.js", "Express", "MongoDB", "React", "WebSocket"],
    visual: "auction",
  },
  {
    id: "gis",
    title: { en: "Land Digitization System", fr: "Système de digitalisation foncière" },
    year: "2021",
    kind: { en: "GIS", fr: "SIG" },
    summary: {
      en: "GIS application to manage, edit and visualize land parcels at scale.",
      fr: "Application SIG pour gérer, éditer et visualiser des parcelles foncières à grande échelle.",
    },
    points: [
      { en: "Polygon editing on spatial data", fr: "Édition de polygones sur données spatiales" },
      { en: "PostGIS tuned for high-volume geodata", fr: "PostGIS optimisé pour de gros volumes géospatiaux" },
    ],
    stack: ["Django REST", "PostGIS", "GDAL", "React Native"],
    visual: "gis",
  },
  {
    id: "wallet",
    title: { en: "Wallet Manager", fr: "Gestion de portefeuille" },
    year: "2022",
    kind: { en: "Fintech web app", fr: "Application fintech" },
    summary: {
      en: "Track every cash inflow and outflow with budgets and clear reporting.",
      fr: "Suivez chaque entrée et sortie d'argent avec budgets et rapports clairs.",
    },
    points: [{ en: "Spring Boot REST API, Angular Material UI", fr: "API REST Spring Boot, UI Angular Material" }],
    stack: ["Spring Boot", "Angular", "MySQL"],
    visual: "wallet",
  },
  {
    id: "gofish",
    title: { en: "GoFish", fr: "GoFish" },
    year: "2022",
    kind: { en: "Mobile app", fr: "Application mobile" },
    summary: {
      en: "Explore fish by family, species and type — a mobile field guide.",
      fr: "Explorez les poissons par famille, espèce et type — un guide de terrain mobile.",
    },
    points: [{ en: "Flutter client over a Django REST API", fr: "Client Flutter sur une API Django REST" }],
    stack: ["Flutter", "Django REST", "PostgreSQL"],
    visual: "fish",
    span: "wide",
  },
];

export const caseStudyIds = projects.filter((p) => p.caseStudy).map((p) => p.id);
export const getProject = (id: string) => projects.find((p) => p.id === id);
