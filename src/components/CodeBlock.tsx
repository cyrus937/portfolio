import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

/** Minimal shell highlighting: comments, flags, strings, first command word. */
function highlight(line: string): ReactNode {
  if (line.trimStart().startsWith("#")) return <span className="text-subtle">{line}</span>;
  const parts = line.split(/(\s+)/);
  let first = true;
  return parts.map((p, i) => {
    if (/^\s+$/.test(p) || p === "") return p;
    if (first) {
      first = false;
      return <span key={i} className="text-accent-ink">{p}</span>;
    }
    if (p.startsWith("-")) return <span key={i} className="text-sky-700 dark:text-sky-400">{p}</span>;
    if (/^["'$]/.test(p)) return <span key={i} className="text-amber-700 dark:text-amber-400">{p}</span>;
    if (p === "\\") return <span key={i} className="text-subtle">{p}</span>;
    return <span key={i}>{p}</span>;
  });
}

export function CodeBlock({ code, title, copyLabel, copiedLabel }: { code: string; title: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card overflow-hidden !rounded-2xl bg-bg-elev">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-subtle">{title}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* ignore */
            }
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-subtle transition-colors hover:bg-surface-2 hover:text-fg"
        >
          {copied ? <Check className="size-3.5 text-accent-ink" /> : <Copy className="size-3.5" />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed" data-lenis-prevent>
        <code>
          {code.split("\n").map((l, i) => (
            <div key={i}>
              <span className="mr-4 inline-block w-4 select-none text-right text-subtle/60">{i + 1}</span>
              {highlight(l)}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
