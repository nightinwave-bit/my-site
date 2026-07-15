"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import {
  buildGraph,
  graphLabel,
  getNode,
  type NodeType,
  type OntologyNode,
} from "@/lib/ontology";
import { EvidencePanel } from "./evidence-panel";
import { cn } from "@/lib/utils";
import { Search, RotateCcw } from "lucide-react";

// Coordinate space; container keeps this aspect ratio so % node positions
// align with the SVG edge layer.
const W = 1160;
const H = 860;

const TARGET_X: Record<NodeType, number> = {
  question: 0.08,
  concept: 0.37,
  theme: 0.66,
  narrative: 0.9,
};

// concept column is dense → split into two staggered sub-columns
const CONCEPT_SUBCOL = [0.31, 0.43];

type Pt = { x: number; y: number; vx: number; vy: number; tx: number };

/** Deterministic force layout: type-based horizontal flow bias + link springs
 *  + charge repulsion + box collision. No randomness, so it settles identically
 *  every render (stable for SSR, screenshots, and live lectures). */
function computeLayout(
  nodes: OntologyNode[],
  edges: { from: string; to: string }[]
): Record<string, Pt> {
  const pos: Record<string, Pt> = {};
  const byType: Record<string, string[]> = {
    question: [],
    concept: [],
    theme: [],
    narrative: [],
  };
  nodes.forEach((n) => byType[n.type].push(n.id));

  const targetXOf = (n: OntologyNode) => {
    if (n.type === "concept") {
      const idx = byType.concept.indexOf(n.id);
      return CONCEPT_SUBCOL[idx % 2] * W;
    }
    return TARGET_X[n.type] * W;
  };

  nodes.forEach((n, i) => {
    const arr = byType[n.type];
    const idx = arr.indexOf(n.id);
    const cnt = arr.length;
    const jitter = Math.sin(i * 12.9898) * 18;
    pos[n.id] = {
      x: targetXOf(n) + jitter,
      y: 70 + ((idx + 0.5) / cnt) * (H - 140),
      vx: 0,
      vy: 0,
      tx: targetXOf(n),
    };
  });

  const IDEAL = 96;
  const CHARGE = 9000;
  const LINK = 0.04;
  const LAYERX = 0.1;
  const MINX = 132;
  const MINY = 44;
  let alpha = 0.9;

  for (let it = 0; it < 720; it++) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const pa = pos[nodes[a].id];
        const pb = pos[nodes[b].id];
        let dx = pa.x - pb.x;
        let dy = pa.y - pb.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) d2 = 1;
        const d = Math.sqrt(d2);
        const f = (CHARGE / d2) * alpha;
        pa.vx += (dx / d) * f;
        pa.vy += (dy / d) * f;
        pb.vx -= (dx / d) * f;
        pb.vy -= (dy / d) * f;
      }
    }
    for (const e of edges) {
      const pa = pos[e.from];
      const pb = pos[e.to];
      let dx = pb.x - pa.x;
      let dy = pb.y - pa.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const diff = ((d - IDEAL) / d) * LINK * alpha;
      pa.vx += dx * diff;
      pa.vy += dy * diff;
      pb.vx -= dx * diff;
      pb.vy -= dy * diff;
    }
    nodes.forEach((n) => {
      const p = pos[n.id];
      p.vx += (p.tx - p.x) * LAYERX * alpha;
      p.vy += (H / 2 - p.y) * 0.003 * alpha;
      p.x += Math.max(-14, Math.min(14, p.vx));
      p.y += Math.max(-14, Math.min(14, p.vy));
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x = Math.max(90, Math.min(W - 96, p.x));
      p.y = Math.max(42, Math.min(H - 42, p.y));
    });
    // box collision — guarantees chips don't overlap
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const pa = pos[nodes[a].id];
        const pb = pos[nodes[b].id];
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const ox = MINX - Math.abs(dx);
        const oy = MINY - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (oy <= ox) {
            const s = ((dy < 0 ? -1 : 1) * oy) / 2;
            pa.y += s;
            pb.y -= s;
          } else {
            const s = ((dx < 0 ? -1 : 1) * ox) / 2;
            pa.x += s;
            pb.x -= s;
          }
        }
      }
    }
    alpha *= 0.993;
  }
  return pos;
}

const COLUMNS: { type: NodeType; key: string }[] = [
  { type: "question", key: "type.question" },
  { type: "concept", key: "type.concept" },
  { type: "theme", key: "type.theme" },
  { type: "narrative", key: "type.narrative" },
];

export function ForceGraph({
  interactive = true,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const { nodes, edges } = React.useMemo(buildGraph, []);
  const base = React.useMemo(() => computeLayout(nodes, edges), [nodes, edges]);

  const [override, setOverride] = React.useState<Record<string, { x: number; y: number }>>({});
  const [hover, setHover] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<OntologyNode | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{
    id: string;
    moved: boolean;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    scaleX: number;
    scaleY: number;
  } | null>(null);

  const pos = React.useCallback(
    (id: string) => override[id] ?? base[id],
    [override, base]
  );

  const active = hover ?? selected?.id ?? null;
  const neighbors = React.useMemo(() => {
    if (!active) return null;
    const s = new Set<string>([active]);
    edges.forEach((e) => {
      if (e.from === active) s.add(e.to);
      if (e.to === active) s.add(e.from);
    });
    return s;
  }, [active, edges]);

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    if (!interactive) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const p = pos(id);
    drag.current = {
      id,
      moved: false,
      sx: e.clientX,
      sy: e.clientY,
      ox: p.x,
      oy: p.y,
      scaleX: W / rect.width,
      scaleY: H / rect.height,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) * d.scaleX;
    const dy = (e.clientY - d.sy) * d.scaleY;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    setOverride((o) => ({
      ...o,
      [d.id]: {
        x: Math.max(96, Math.min(W - 104, d.ox + dx)),
        y: Math.max(40, Math.min(H - 40, d.oy + dy)),
      },
    }));
  };
  const onPointerUp = (node: OntologyNode) => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) setSelected(node);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* column headers — the perception flow */}
      <div className="relative mb-2 hidden h-6 sm:block" aria-hidden>
        {COLUMNS.map((c, i) => (
          <React.Fragment key={c.type}>
            <span
              className="absolute -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              style={{ left: `${TARGET_X[c.type] * 100}%` }}
            >
              {t(c.key)}
            </span>
            {i < COLUMNS.length - 1 && (
              <span
                className="absolute top-1 -translate-x-1/2 text-border-strong"
                style={{
                  left: `${((TARGET_X[c.type] + TARGET_X[COLUMNS[i + 1].type]) / 2) * 100}%`,
                }}
              >
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative w-full touch-none select-none"
        style={{ aspectRatio: `${W} / ${H}` }}
        onPointerMove={onPointerMove}
        onMouseLeave={() => setHover(null)}
      >
        {/* edges */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {edges.map((e, i) => {
            const a = pos(e.from);
            const b = pos(e.to);
            if (!a || !b) return null;
            const on = neighbors != null && (e.from === active || e.to === active);
            const dim = neighbors != null && !on;
            const mx = (a.x + b.x) / 2;
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`}
                fill="none"
                stroke={on ? "hsl(224 76% 48%)" : "hsl(213 27% 84%)"}
                strokeWidth={on ? 2 : 1}
                opacity={dim ? 0.18 : 1}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((node) => {
          const p = pos(node.id);
          const dim = neighbors != null && !neighbors.has(node.id);
          const isActive = active === node.id;
          const label = graphLabel(node.id)[locale];
          return (
            <div
              key={node.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200",
                dim ? "opacity-25" : "opacity-100"
              )}
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
                width: node.type === "narrative" ? "158px" : "132px",
                maxWidth: "40%",
              }}
              onPointerDown={(e) => onPointerDown(e, node.id)}
              onPointerUp={() => onPointerUp(node)}
              onMouseEnter={() => !drag.current && setHover(node.id)}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-center shadow-card transition-shadow",
                  interactive && "cursor-pointer hover:shadow-panel",
                  node.type === "question" && "border-brand bg-white",
                  node.type === "concept" &&
                    "border-[hsl(224_70%_88%)] bg-concept-bg",
                  node.type === "theme" && "border-border bg-theme-bg",
                  node.type === "narrative" && "border-navy bg-navy",
                  isActive && node.type !== "narrative" && "ring-2 ring-brand",
                  isActive && node.type === "narrative" && "ring-2 ring-brand-hi"
                )}
              >
                {node.type === "question" && (
                  <Search className="h-3 w-3 shrink-0 text-brand" />
                )}
                <span
                  className={cn(
                    "block w-full text-[11.5px] font-medium leading-tight",
                    node.type === "question" && "text-brand",
                    node.type === "concept" && "text-navy",
                    node.type === "theme" && "text-secondary",
                    node.type === "narrative" && "text-white"
                  )}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* legend + controls */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("explore.legend")}
        </span>
        {COLUMNS.map((l) => (
          <span key={l.type} className="inline-flex items-center gap-2 text-[13px] text-secondary">
            <span
              className={cn(
                "inline-block h-3 w-3 rounded-[3px] border",
                l.type === "question" && "border-brand bg-white",
                l.type === "concept" && "border-[hsl(224_70%_88%)] bg-concept-bg",
                l.type === "theme" && "border-border bg-theme-bg",
                l.type === "narrative" && "border-navy bg-navy"
              )}
            />
            {t(l.key)}
          </span>
        ))}
        {interactive && (
          <button
            type="button"
            onClick={() => setOverride({})}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-secondary transition-colors hover:border-border-strong hover:text-navy"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {locale === "ko" ? "배치 초기화" : "Reset layout"}
          </button>
        )}
      </div>

      {interactive && (
        <EvidencePanel
          node={selected}
          onClose={() => setSelected(null)}
          onSelect={(n) => setSelected(n)}
        />
      )}
    </div>
  );
}
