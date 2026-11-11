import type { VisualKind } from "@/content/projects";
import { useEffect, useState } from "react";

/**
 * Hand-built, theme-aware illustrations for each project.
 * Pure SVG/CSS so they stay crisp, light and in the site's palette.
 */
export function ProjectVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "api":
      return <ApiVisual />;
    case "health":
      return <HealthVisual />;
    case "auction":
      return <AuctionVisual />;
    case "gis":
      return <GisVisual />;
    case "wallet":
      return <WalletVisual />;
    case "fish":
      return <FishVisual />;
    case "search":
      return <SearchVisual />;
    case "gossip":
      return <GossipVisual />;
  }
}

const frame = "relative h-full w-full overflow-hidden";

/* ── Currency API: request + live-ticking response ── */
function ApiVisual() {
  const base = [
    { pair: "EUR → USD", v: 1.0842 },
    { pair: "EUR → XAF", v: 655.957 },
    { pair: "BTC → EUR", v: 61234.5 },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`${frame} bg-dots p-5 font-mono text-[11px] leading-relaxed sm:text-xs`}>
      <div className="rounded-lg border border-line bg-bg/70 p-3 backdrop-blur">
        <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-fg">POST</span>{" "}
        <span className="text-fg">/api/conversions/convert</span>
        <div className="mt-2 text-subtle">
          Authorization: <span className="text-muted">Bearer eyJhbGciOi…</span>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-line bg-bg/70 p-3 backdrop-blur">
        <div className="mb-2 flex items-center gap-2 text-subtle">
          <span className="size-1.5 rounded-full bg-emerald-500" /> 200 OK · <span className="text-accent-ink">cache: HIT</span> · 4ms
        </div>
        {base.map((r, i) => {
          const jitter = Math.sin(tick * 1.7 + i * 2.1) * (r.v * 0.0009);
          const up = Math.sin(tick * 1.7 + i * 2.1) >= 0;
          return (
            <div key={r.pair} className="flex justify-between gap-4">
              <span className="text-muted">{r.pair}</span>
              <span className="tabular-nums text-fg">
                {(r.v + jitter).toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 2 })}{" "}
                <span className={up ? "text-emerald-500" : "text-rose-500"}>{up ? "▲" : "▼"}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── iCare: ECG line + KNN clusters ── */
function HealthVisual() {
  const pts = [
    [60, 150, 0], [80, 170, 0], [95, 140, 0], [70, 185, 0], [110, 165, 0],
    [230, 80, 1], [250, 60, 1], [270, 95, 1], [240, 105, 1], [285, 70, 1],
    [300, 170, 2], [325, 150, 2], [340, 185, 2], [315, 195, 2],
  ];
  const fills = ["var(--fg-subtle)", "var(--accent)", "rgb(56 189 248)"];
  return (
    <div className={`${frame} bg-grid`}>
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <path
          d="M0 60 H90 l12 -28 l14 56 l12 -70 l14 82 l10 -40 H400"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="600"
          style={{ animation: "ecg 2.6s linear infinite" }}
        />
        <circle cx="200" cy="140" r="58" fill="none" stroke="var(--line-strong)" strokeDasharray="4 6" />
        {pts.map(([x, y, c], i) => (
          <g key={i}>
            <line x1="200" y1="140" x2={x} y2={y} stroke="var(--line)" />
            <circle cx={x} cy={y} r="5" fill={fills[c]} />
          </g>
        ))}
        <circle cx="200" cy="140" r="7" fill="var(--fg)" />
        <circle cx="200" cy="140" r="14" fill="none" stroke="var(--fg)" opacity=".3">
          <animate attributeName="r" values="8;22;8" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".5;0;.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x="214" y="132" className="fill-current font-mono text-[10px]" style={{ fill: "var(--fg-muted)" }}>
          k=5
        </text>
      </svg>
    </div>
  );
}

/* ── Auction: live bid feed ── */
function AuctionVisual() {
  const names = ["Awa", "Jean", "Mbarga", "Fatou", "Paul", "Ngono"];
  const [bids, setBids] = useState([
    { who: "Awa", v: 182000 },
    { who: "Jean", v: 175000 },
    { who: "Fatou", v: 168500 },
  ]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setBids((b) => [{ who: names[Math.floor(Math.random() * names.length)], v: b[0].v + 500 * (1 + Math.floor(Math.random() * 8)) }, ...b].slice(0, 3));
    }, 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`${frame} bg-dots flex flex-col justify-center gap-2 p-5 font-mono text-xs`}>
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest text-subtle">
        <span>Cacao · lot #42</span>
        <span className="inline-flex items-center gap-1.5 text-rose-500">
          <span className="relative size-1.5 rounded-full bg-rose-500 dot-ping" /> live
        </span>
      </div>
      {bids.map((b, i) => (
        <div
          key={`${b.v}`}
          className="flex items-center justify-between rounded-lg border border-line bg-bg/70 px-3 py-2 backdrop-blur transition-all duration-500"
          style={{ opacity: 1 - i * 0.28, transform: `scale(${1 - i * 0.03})`, animation: i === 0 ? "rise-in .5s cubic-bezier(.16,1,.3,1)" : undefined }}
        >
          <span className="text-muted">{b.who}</span>
          <span className={i === 0 ? "text-accent-ink" : "text-fg"}>{b.v.toLocaleString("fr-FR")} XAF</span>
        </div>
      ))}
      <style>{`@keyframes rise-in{from{opacity:0;transform:translateY(-10px)}}`}</style>
    </div>
  );
}

/* ── GIS: land parcels ── */
function GisVisual() {
  const parcels = [
    "M30 40 L140 30 L150 110 L40 120 Z",
    "M140 30 L250 45 L245 120 L150 110 Z",
    "M250 45 L370 35 L380 115 L245 120 Z",
    "M40 120 L150 110 L160 210 L35 220 Z",
    "M150 110 L245 120 L255 215 L160 210 Z",
    "M245 120 L380 115 L370 225 L255 215 Z",
  ];
  return (
    <div className={`${frame} bg-grid`}>
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {parcels.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={i === 4 ? "var(--accent-soft)" : "transparent"}
            stroke={i === 4 ? "var(--accent)" : "var(--line-strong)"}
            strokeWidth={i === 4 ? 2 : 1}
            strokeDasharray="500"
            strokeDashoffset="500"
            style={{ animation: `dash 2s ${i * 0.15}s cubic-bezier(.16,1,.3,1) forwards` }}
          />
        ))}
        {[[150, 110], [245, 120], [255, 215], [160, 210]].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 4} width="8" height="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
        ))}
        <g className="font-mono" style={{ fill: "var(--fg-muted)", fontSize: 10 }}>
          <text x="172" y="168">P-0417</text>
          <text x="172" y="182" style={{ fill: "var(--fg-subtle)" }}>1 284 m²</text>
        </g>
      </svg>
    </div>
  );
}

/* ── Wallet: in/out bars ── */
function WalletVisual() {
  const bars = [40, 65, 30, 80, 55, 90, 45, 70, 60, 85];
  return (
    <div className={`${frame} bg-dots flex items-end gap-2 px-6 pb-6 pt-14`}>
      <div className="absolute left-6 top-5 font-mono text-xs">
        <p className="text-subtle">balance</p>
        <p className="text-lg text-fg">
          +2 480,00 <span className="text-accent-ink">€</span>
        </p>
      </div>
      {bars.map((h, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end gap-1">
          <div
            className="origin-bottom rounded-sm"
            style={{
              height: `${h}%`,
              background: i % 3 === 1 ? "var(--line-strong)" : "var(--accent)",
              opacity: i % 3 === 1 ? 1 : 0.35 + (h / 100) * 0.65,
              animation: `rise ${3 + (i % 4) * 0.6}s ${i * 0.1}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── GoFish: taxonomy tree + waves ── */
function FishVisual() {
  return (
    <div className={`${frame} bg-grid`}>
      <svg viewBox="0 0 600 240" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M-40 ${190 + i * 18} Q 60 ${170 + i * 18} 160 ${190 + i * 18} T 360 ${190 + i * 18} T 560 ${190 + i * 18} T 760 ${190 + i * 18}`}
            fill="none"
            stroke={i === 0 ? "rgb(56 189 248 / .6)" : "var(--line-strong)"}
            strokeWidth="1.5"
            style={{ animation: `drift ${5 + i}s ease-in-out infinite` }}
          />
        ))}
        <g fill="none" stroke="var(--line-strong)">
          <path d="M300 50 V80 M300 80 H170 V110 M300 80 H430 V110 M300 80 V110 M170 140 H110 V160 M170 140 H230 V160" />
        </g>
        {[
          [300, 40, "Actinopterygii", true],
          [170, 125, "Cichlidae", false],
          [300, 125, "Clupeidae", false],
          [430, 125, "Siluridae", false],
          [110, 170, "Tilapia", false],
          [230, 170, "Oreochromis", false],
        ].map(([x, y, label, root]) => (
          <g key={label as string}>
            <rect
              x={(x as number) - 52}
              y={(y as number) - 12}
              width="104"
              height="24"
              rx="12"
              fill={root ? "var(--accent)" : "var(--bg)"}
              stroke={root ? "none" : "var(--line-strong)"}
            />
            <text
              x={x as number}
              y={(y as number) + 4}
              textAnchor="middle"
              className="font-mono"
              style={{ fontSize: 10, fill: root ? "var(--accent-fg)" : "var(--fg-muted)" }}
            >
              {label}
            </text>
          </g>
        ))}
        <path
          d="M470 175 q 25 -18 50 0 q -25 18 -50 0 z M520 175 l 14 -10 v 20 z"
          fill="rgb(56 189 248 / .7)"
          style={{ animation: "drift 4s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

/* ── TestForge: semantic query → ranked symbols ── */
function SearchVisual() {
  const queries = ["where do we handle JWT refresh?", "authentication logic", "retry on network failure"];
  const results = [
    [
      ["auth/tokens.py", "rotate_refresh_token", 0.94],
      ["auth/middleware.rs", "verify_access", 0.81],
      ["api/session.ts", "renewSession", 0.72],
    ],
    [
      ["auth/login.py", "authenticate_user", 0.92],
      ["auth/middleware.rs", "verify_access", 0.86],
      ["core/Security.java", "checkCredentials", 0.7],
    ],
    [
      ["http/client.rs", "with_backoff", 0.9],
      ["sync/worker.py", "retry_job", 0.83],
      ["api/fetch.ts", "fetchWithRetry", 0.77],
    ],
  ] as const;
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(queries[0].length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = queries[qi];
    if (typed < q.length) {
      const id = setTimeout(() => setTyped((n) => n + 1), 45);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setQi((i) => (i + 1) % queries.length);
      setTyped(0);
    }, 3200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, qi]);
  const done = typed >= queries[qi].length;
  return (
    <div className={`${frame} bg-dots flex flex-col justify-center gap-2.5 p-5 font-mono text-[11px] sm:text-xs`}>
      <div className="flex items-center gap-2 rounded-lg border border-line-strong bg-bg/80 px-3 py-2 backdrop-blur">
        <span className="text-accent-ink">⌕</span>
        <span className="truncate text-fg">{queries[qi].slice(0, typed)}</span>
        <span className="caret -ml-1 inline-block h-3.5 w-[2px] bg-accent" />
        <span className="ml-auto shrink-0 rounded border border-line px-1.5 text-[10px] text-subtle">hnsw + bm25</span>
      </div>
      {results[qi].map(([file, sym, score], i) => (
        <div
          key={`${qi}-${i}`}
          className="flex items-center gap-3 rounded-lg border border-line bg-bg/60 px-3 py-2 backdrop-blur transition-all duration-500"
          style={{ opacity: done ? 1 : 0.25, transform: done ? "none" : "translateY(4px)", transitionDelay: `${i * 90}ms` }}
        >
          <span className="w-4 text-subtle">{i + 1}</span>
          <span className="min-w-0 flex-1 truncate">
            <span className="text-fg">{sym}</span> <span className="text-subtle">· {file}</span>
          </span>
          <span className="hidden h-1 w-16 overflow-hidden rounded-full bg-surface-2 sm:block">
            <span className="block h-full bg-accent transition-[width] duration-700" style={{ width: done ? `${score * 100}%` : "0%" }} />
          </span>
          <span className="tabular-nums text-accent-ink">{score.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Async FL: gossip between heterogeneous nodes ── */
function GossipVisual() {
  const n = 9;
  const cx = 200, cy = 170, R = 120;
  const nodes = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), speed: [5, 1, 3, 2, 5, 1, 4, 2, 3][i] };
  });
  const edges = [[0, 2], [0, 5], [1, 4], [2, 7], [3, 6], [4, 8], [5, 7], [6, 1], [8, 3], [2, 4], [7, 0]];
  return (
    <div className={`${frame} bg-grid`}>
      <svg viewBox="0 0 400 340" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line)" strokeDasharray="3 6" />
        {edges.map(([a, b], i) => {
          const A = nodes[a], B = nodes[b];
          const d = `M${A.x} ${A.y} L${B.x} ${B.y}`;
          return (
            <g key={i}>
              <path d={d} stroke="var(--line-strong)" />
              <circle r="3" fill="var(--accent)">
                <animateMotion dur={`${2.2 + (i % 4) * 0.7}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={i % 2 ? `M${B.x} ${B.y} L${A.x} ${A.y}` : d} />
              </circle>
            </g>
          );
        })}
        {nodes.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7 + p.speed * 1.6} fill="var(--bg)" stroke={p.speed >= 4 ? "var(--accent)" : "var(--line-strong)"} strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r={7 + p.speed * 1.6} fill="none" stroke="var(--accent)" opacity="0">
              <animate attributeName="opacity" values="0;.6;0" dur={`${6 / p.speed}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${7 + p.speed * 1.6};${14 + p.speed * 2};${7 + p.speed * 1.6}`} dur={`${6 / p.speed}s`} repeatCount="indefinite" />
            </circle>
            <text x={p.x} y={p.y + 3.5} textAnchor="middle" className="font-mono" style={{ fontSize: 9, fill: "var(--fg-muted)" }}>
              ×{p.speed}
            </text>
          </g>
        ))}
        <g className="font-mono" style={{ fontSize: 10 }}>
          <text x={cx} y={cy - 4} textAnchor="middle" style={{ fill: "var(--fg)" }}>event heap</text>
          <text x={cx} y={cy + 12} textAnchor="middle" style={{ fill: "var(--fg-subtle)" }}>t = 1 284.6</text>
        </g>
      </svg>
    </div>
  );
}
