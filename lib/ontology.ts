import type { Locale } from "@/lib/i18n";
// Production ontology data, generated from the 1,540-question collected dataset.
// See scripts/ontology-to-site.mjs (transform) and
// collect/output/ontology/{ontology_layer.json, ontology_labels.json} (source).
// This file now owns the types + helpers; the DATA is the generated ontology.
import {
  NODES as GENERATED_NODES,
  GRAPH_LABEL as GENERATED_GRAPH_LABEL,
  GRAPH_EDGES as GENERATED_GRAPH_EDGES,
  PATHWAYS as GENERATED_PATHWAYS,
  TOTAL_QUESTIONS as GENERATED_TOTAL_QUESTIONS,
  PLATFORM_COUNT as GENERATED_PLATFORM_COUNT,
  PROVENANCE as GENERATED_PROVENANCE,
} from "./ontology.generated";
export type { Provenance } from "./ontology.generated";

export type Localized = { ko: string; en: string };

export function loc(v: Localized, locale: Locale): string {
  return v[locale];
}

export type NodeType =
  | "question"
  | "concept"
  | "theme"
  | "narrative"
  | "perception";
export type Platform = "google" | "paa" | "autocomplete" | "reddit";

export interface Evidence {
  q: Localized;
  platform: Platform;
}

export interface OntologyNode {
  id: string;
  type: NodeType;
  label: Localized;
  blurb: Localized;
  evidence?: Evidence[];
  // Optional fields populated by the production ontology (transform output).
  short?: Localized;
  count?: number;
  salience?: number;
  topMarket?: string | null;
  markets?: Record<string, number>;
  sourceExemplar?: string;
}

/** A step within a pathway: a node, plus the relationship verb linking it to
 *  the previous node (undefined for the first node). */
export interface Step {
  nodeId: string;
  verb?: Localized;
}

export interface Pathway {
  id: string;
  /** The originating question, used as the pathway's title. */
  title: Localized;
  themeLabel: Localized;
  steps: Step[];
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  google: "Google Search",
  paa: "People Also Ask",
  autocomplete: "Autocomplete",
  reddit: "Reddit",
};

/** Deduplicated directed edges across all pathways. */
export interface OntologyEdge {
  from: string;
  to: string;
  verb: Localized;
}

export interface GraphEdge {
  from: string;
  to: string;
}

// ══════════════════════════════════════════════════════════════════════════
// DATA — the production ontology (Question → Concept → Theme → Narrative →
// Perception). 52 nodes / 55 edges / 5 pathways, derived from real collected
// questions. To regenerate: `node scripts/ontology-to-site.mjs`.
// ══════════════════════════════════════════════════════════════════════════
export const NODES: Record<string, OntologyNode> = GENERATED_NODES;
export const GRAPH_LABEL: Record<string, Localized> = GENERATED_GRAPH_LABEL;
export const GRAPH_EDGES: GraphEdge[] = GENERATED_GRAPH_EDGES;
export const PATHWAYS: Pathway[] = GENERATED_PATHWAYS;
export const TOTAL_QUESTIONS = GENERATED_TOTAL_QUESTIONS;
export const PLATFORM_COUNT = GENERATED_PLATFORM_COUNT;
export const PROVENANCE = GENERATED_PROVENANCE;

export function getPathway(id: string): Pathway | undefined {
  return PATHWAYS.find((p) => p.id === id);
}

export function getNode(id: string): OntologyNode {
  return NODES[id];
}

export function buildEdges(): OntologyEdge[] {
  const seen = new Set<string>();
  const edges: OntologyEdge[] = [];
  for (const p of PATHWAYS) {
    for (let i = 1; i < p.steps.length; i++) {
      const from = p.steps[i - 1].nodeId;
      const to = p.steps[i].nodeId;
      const key = `${from}->${to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from, to, verb: p.steps[i].verb ?? { ko: "", en: "" } });
    }
  }
  return edges;
}

export function graphLabel(id: string): Localized {
  return GRAPH_LABEL[id] ?? NODES[id].label;
}

export function buildGraph(): { nodes: OntologyNode[]; edges: GraphEdge[] } {
  const ids = new Set<string>();
  GRAPH_EDGES.forEach((e) => {
    ids.add(e.from);
    ids.add(e.to);
  });
  return { nodes: Array.from(ids).map(getNode), edges: GRAPH_EDGES };
}

/** Neighbours of a node in the graph, split by their type — powers the
 *  evidence drawer's "connected questions / concepts / themes / narratives /
 *  perceptions". */
export function graphNeighbors(id: string): OntologyNode[] {
  const set = new Set<string>();
  GRAPH_EDGES.forEach((e) => {
    if (e.from === id) set.add(e.to);
    if (e.to === id) set.add(e.from);
  });
  return Array.from(set).map(getNode);
}
