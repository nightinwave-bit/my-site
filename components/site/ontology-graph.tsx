"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { PATHWAYS, getNode, buildEdges, type NodeType } from "@/lib/ontology";
import { cn } from "@/lib/utils";

// Fixed coordinate space; the container keeps this aspect ratio so HTML nodes
// (positioned in %) align with the SVG edge layer (viewBox, non-uniform scale).
const W = 1200;
const H = 640;
const PAD_X = 96;
const NODE_W = 176;
const Y_TOP = 60;
const Y_BOT = 580;

type Placed = {
  id: string;
  type: NodeType;
  x: number; // center
  y: number; // center
  depth: number;
};

function computeLayout() {
  // depth = earliest index at which the node appears in any pathway
  const depth = new Map<string, number>();
  const order = new Map<string, number>();
  PATHWAYS.forEach((p) => {
    p.steps.forEach((s, i) => {
      if (!depth.has(s.nodeId) || i < (depth.get(s.nodeId) as number)) {
        depth.set(s.nodeId, i);
      }
      if (!order.has(s.nodeId)) order.set(s.nodeId, PATHWAYS.indexOf(p));
    });
  });

  const maxDepth = Math.max(...Array.from(depth.values()));
  const columns: string[][] = Array.from({ length: maxDepth + 1 }, () => []);
  Array.from(depth.entries()).forEach(([id, d]) => columns[d].push(id));
  columns.forEach((col) =>
    col.sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0))
  );

  const placed: Record<string, Placed> = {};
  const colGap = (W - 2 * PAD_X) / maxDepth;
  columns.forEach((col, d) => {
    const x = PAD_X + d * colGap;
    const span = Y_BOT - Y_TOP;
    col.forEach((id, i) => {
      const y = Y_TOP + ((i + 0.5) * span) / col.length;
      placed[id] = { id, type: getNode(id).type, x, y, depth: d };
    });
  });
  return placed;
}

const LEGEND: { type: NodeType; key: string }[] = [
  { type: "question", key: "type.question" },
  { type: "concept", key: "type.concept" },
  { type: "theme", key: "type.theme" },
  { type: "narrative", key: "type.narrative" },
];

export function OntologyGraph({
  interactive = true,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const placed = React.useMemo(computeLayout, []);
  const edges = React.useMemo(buildEdges, []);
  const [hover, setHover] = React.useState<string | null>(null);

  const neighbors = React.useMemo(() => {
    if (!hover) return null;
    const set = new Set<string>([hover]);
    edges.forEach((e) => {
      if (e.from === hover) set.add(e.to);
      if (e.to === hover) set.add(e.from);
    });
    return set;
  }, [hover, edges]);

  const isDim = (id: string) => neighbors != null && !neighbors.has(id);
  const edgeActive = (from: string, to: string) =>
    hover != null && (from === hover || to === hover);

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
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
            const a = placed[e.from];
            const b = placed[e.to];
            if (!a || !b) return null;
            const x1 = a.x + NODE_W / 2;
            const x2 = b.x - NODE_W / 2;
            const mx = (x1 + x2) / 2;
            const active = edgeActive(e.from, e.to);
            const dim = neighbors != null && !active;
            return (
              <path
                key={i}
                d={`M ${x1} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${x2} ${b.y}`}
                fill="none"
                stroke={active ? "hsl(224 76% 48%)" : "hsl(213 27% 84%)"}
                strokeWidth={active ? 2 : 1}
                opacity={dim ? 0.25 : 1}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* nodes */}
        {Object.values(placed).map((p) => {
          const node = getNode(p.id);
          const dim = isDim(p.id);
          const left = ((p.x - NODE_W / 2) / W) * 100;
          const top = (p.y / H) * 100;
          const width = (NODE_W / W) * 100;
          return (
            <div
              key={p.id}
              className={cn(
                "absolute -translate-y-1/2 transition-opacity duration-200",
                dim ? "opacity-30" : "opacity-100"
              )}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}
              onMouseEnter={interactive ? () => setHover(p.id) : undefined}
            >
              <div
                className={cn(
                  "flex min-h-[38px] items-center justify-center rounded-md border px-2 py-1.5 text-center text-[11px] font-medium leading-tight shadow-card sm:text-[12px]",
                  p.type === "question" &&
                    "border-brand bg-white text-brand",
                  p.type === "concept" &&
                    "border-[hsl(224_70%_88%)] bg-concept-bg text-navy",
                  p.type === "theme" &&
                    "border-border bg-theme-bg text-secondary",
                  p.type === "narrative" &&
                    "border-navy bg-navy text-white"
                )}
              >
                <span className="line-clamp-2">{node.label[locale]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("explore.legend")}
        </span>
        {LEGEND.map((l) => (
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
      </div>
    </div>
  );
}
