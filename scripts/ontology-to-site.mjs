// Ontology transform — production data → site data model
// ------------------------------------------------------------------
// Converts the generated ontology + its bilingual labels into a TypeScript
// module that matches the site's ontology read model (lib/ontology.ts):
//
//   collect/output/ontology/ontology_layer.json    (structure + weights)
// + collect/output/ontology/ontology_labels.json   (ko/en labels + blurbs)
//   ────────────────────────────────────────────────────────────────
//   → lib/ontology.generated.ts   (NODES, GRAPH_LABEL, GRAPH_EDGES,
//                                   PATHWAYS, TOTAL_QUESTIONS, PLATFORM_COUNT)
//
// The generated module is TYPE-CHECKED by `next build` (proving it is
// compatible with the site's types) but is NOT imported anywhere yet — so the
// live site keeps rendering the sample ontology until the final swap. This
// script performs NO data replacement.
//
// Usage (from repo root):  node scripts/ontology-to-site.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const LAYER = JSON.parse(readFileSync("collect/output/ontology/ontology_layer.json", "utf8"));
const LABELS = JSON.parse(readFileSync("collect/output/ontology/ontology_labels.json", "utf8"));
const CANON = JSON.parse(readFileSync("collect/output/canonical_questions.json", "utf8"));
const OUT = "lib/ontology.generated.ts";

// ── Dataset provenance ──────────────────────────────────────────────────────
// Derived from the collected data where possible. rawQueries is the pre-dedup
// total from the recovered collection run (2026-07-15); it is not present in
// this script's JSON inputs (raw_questions.json on disk is a stale partial),
// so it is recorded here as a constant from that run's report.
const RAW_QUERIES = 2193;
const canonSrc = CANON.questions || CANON;
const distinctLanguages = new Set(canonSrc.map((q) => q.language)).size;
const PROVENANCE = {
  rawQueries: RAW_QUERIES,
  canonicalQuestions: LAYER.meta.totalQuestions,
  languages: distinctLanguages,
  markets: LAYER.meta.sourceMeta?.locales?.length ?? 0,
  method: "Google Autocomplete",
  lastUpdated: LAYER.meta.sourceMeta?.date ?? null,
};

// ── index labels by id ─────────────────────────────────────────────────────
const L = {};
for (const kind of ["concepts", "themes", "narratives", "perceptions", "questions"])
  for (const n of LABELS[kind]) L[n.id] = n;

// ── relationship verbs per layer transition (Localized) ────────────────────
const VERB = {
  qc: { ko: "~로 설명됩니다", en: "explained by" },
  ct: { ko: "~의 일부입니다", en: "part of" },
  tn: { ko: "~라는 서사를 만듭니다", en: "builds the narrative of" },
  np: { ko: "~라는 인식이 됩니다", en: "becomes the perception" },
};

// ── flagship pathways: 5 curated chains, one per perception ────────────────
// Each is data-verified below (every edge must exist in ontology_layer.json).
const PATHWAY_CHAINS = [
  { id: "cultural-force", q: "q_kpop", c: "c_kpop", t: "t_hallyu", n: "n_softpower", p: "p_cultural" },
  { id: "aspiration", q: "q_beauty", c: "c_beauty", t: "t_hallyu", n: "n_aspiration", p: "p_aspirational" },
  { id: "division", q: "q_division", c: "c_division", t: "t_geopolitics", n: "n_division", p: "p_divided" },
  { id: "tech-success", q: "q_tech", c: "c_tech", t: "t_power", n: "n_model", p: "p_advanced" },
  { id: "enigma", q: "q_language", c: "c_language", t: "t_language", n: "n_enigma", p: "p_enigmatic" },
];

// ── validate structural integrity (fail loud) ──────────────────────────────
const errs = [];
const conceptToTheme = new Set(LAYER.edges.conceptToTheme.map(([c, t]) => `${c}->${t}`));
const themeToNarr = new Set(LAYER.edges.themeToNarrative.map(([t, n]) => `${t}->${n}`));
const narrToPerc = new Set(LAYER.edges.narrativeToPerception.map(([n, p]) => `${n}->${p}`));
const qByConcept = Object.fromEntries(LABELS.questions.map((q) => [q.conceptId, q]));

for (const ch of PATHWAY_CHAINS) {
  if (!L[ch.q]) errs.push(`pathway ${ch.id}: no question ${ch.q}`);
  if (!conceptToTheme.has(`${ch.c}->${ch.t}`)) errs.push(`pathway ${ch.id}: edge ${ch.c}->${ch.t} missing`);
  if (!themeToNarr.has(`${ch.t}->${ch.n}`)) errs.push(`pathway ${ch.id}: edge ${ch.t}->${ch.n} missing`);
  if (!narrToPerc.has(`${ch.n}->${ch.p}`)) errs.push(`pathway ${ch.id}: edge ${ch.n}->${ch.p} missing`);
  if (qByConcept[ch.c]?.id !== ch.q) errs.push(`pathway ${ch.id}: flagship ${ch.q} != concept ${ch.c}'s question`);
}
// every layer node must have a label
for (const kind of [["concepts", LAYER.concepts], ["themes", LAYER.themes], ["narratives", LAYER.narratives], ["perceptions", LAYER.perceptions]])
  for (const n of kind[1]) if (!L[n.id]) errs.push(`missing label: ${n.id}`);
if (errs.length) {
  console.error("Transform aborted — structural errors:");
  errs.forEach((e) => console.error("  " + e));
  process.exit(1);
}

// ── helpers ────────────────────────────────────────────────────────────────
const j = (v) => JSON.stringify(v);
const locOf = (id) => ({ ko: L[id].label.ko, en: L[id].label.en });
const shortOf = (id) =>
  L[id].short ? { ko: L[id].short.ko, en: L[id].short.en } : undefined;
const blurbOf = (id) => ({ ko: L[id].blurb.ko, en: L[id].blurb.en });

// evidence: real collected exemplars (kept verbatim in their own language, which
// is the honest signal — these are the world's actual questions). Rendered in
// both locales as-is so they always display.
function conceptEvidence(layerConcept) {
  return (layerConcept.exemplars || []).slice(0, 6).map((e) => ({
    q: { ko: e.text, en: e.text },
    platform: "autocomplete",
  }));
}

// ── build NODES ─────────────────────────────────────────────────────────────
const nodeEntries = [];

// questions (18 flagship)
for (const q of LABELS.questions) {
  nodeEntries.push([q.id, {
    id: q.id, type: "question",
    label: locOf(q.id), short: shortOf(q.id) ?? undefined, blurb: blurbOf(q.id),
    sourceExemplar: q.sourceExemplar,
    evidence: [{ q: { ko: q.sourceExemplar, en: q.sourceExemplar }, platform: "autocomplete" }],
  }]);
}
// concepts (18) — carry weights + real evidence
for (const c of LAYER.concepts) {
  nodeEntries.push([c.id, {
    id: c.id, type: "concept",
    label: locOf(c.id), short: shortOf(c.id), blurb: blurbOf(c.id),
    count: c.count, salience: c.salience,
    topMarket: L[c.id].topMarket ?? null, markets: L[c.id].markets ?? {},
    evidence: conceptEvidence(c),
  }]);
}
// themes (6)
for (const t of LAYER.themes)
  nodeEntries.push([t.id, { id: t.id, type: "theme", label: locOf(t.id), short: shortOf(t.id), blurb: blurbOf(t.id) }]);
// narratives (5)
for (const n of LAYER.narratives)
  nodeEntries.push([n.id, { id: n.id, type: "narrative", label: locOf(n.id), short: shortOf(n.id), blurb: blurbOf(n.id) }]);
// perceptions (5) — the fifth layer
for (const p of LAYER.perceptions)
  nodeEntries.push([p.id, { id: p.id, type: "perception", label: locOf(p.id), short: shortOf(p.id), blurb: blurbOf(p.id) }]);

// ── build GRAPH_EDGES (full graph) ──────────────────────────────────────────
const graphEdges = [];
for (const q of LABELS.questions) graphEdges.push({ from: q.id, to: q.conceptId }); // question → concept
for (const [c, t] of LAYER.edges.conceptToTheme) graphEdges.push({ from: c, to: t });
for (const [t, n] of LAYER.edges.themeToNarrative) graphEdges.push({ from: t, to: n });
for (const [n, p] of LAYER.edges.narrativeToPerception) graphEdges.push({ from: n, to: p });

// ── build GRAPH_LABEL (short chip labels) ──────────────────────────────────
const graphLabels = {};
for (const id of Object.keys(L)) if (L[id].short) graphLabels[id] = shortOf(id);

// ── build PATHWAYS (5 flagship, q→c→t→n→p) ─────────────────────────────────
const pathways = PATHWAY_CHAINS.map((ch) => ({
  id: ch.id,
  title: locOf(ch.q),
  themeLabel: shortOf(ch.t),
  steps: [
    { nodeId: ch.q },
    { nodeId: ch.c, verb: VERB.qc },
    { nodeId: ch.t, verb: VERB.ct },
    { nodeId: ch.n, verb: VERB.tn },
    { nodeId: ch.p, verb: VERB.np },
  ],
}));

// ── emit TypeScript ─────────────────────────────────────────────────────────
const nodesObj =
  "{\n" +
  nodeEntries.map(([id, n]) => `  ${JSON.stringify(id)}: ${j(n)},`).join("\n") +
  "\n}";
const labelObj =
  "{\n" +
  Object.entries(graphLabels).map(([id, v]) => `  ${JSON.stringify(id)}: ${j(v)},`).join("\n") +
  "\n}";

const ts = `// AUTO-GENERATED by scripts/ontology-to-site.mjs — DO NOT EDIT BY HAND.
// Source: collect/output/ontology/{ontology_layer.json, ontology_labels.json}
// Corpus: ${LAYER.meta.totalQuestions} canonical questions (${LAYER.meta.sourceMeta?.mode ?? "live"}).
//
// This module is the production ontology in the site's read-model shape. It is
// type-checked by the build but NOT yet imported by the live site — the sample
// ontology in lib/ontology.ts remains active until the approved data swap.

import type {
  Localized,
  OntologyNode,
  GraphEdge,
  Pathway,
} from "@/lib/ontology";

/** ${nodeEntries.length} nodes: ${LAYER.concepts.length} concepts, ${LAYER.themes.length} themes, ${LAYER.narratives.length} narratives, ${LAYER.perceptions.length} perceptions, ${LABELS.questions.length} flagship questions. */
export const NODES: Record<string, OntologyNode> = ${nodesObj};

/** Compact chip labels for the graph. */
export const GRAPH_LABEL: Record<string, Localized> = ${labelObj};

/** Full directed graph: question→concept→theme→narrative→perception. */
export const GRAPH_EDGES: GraphEdge[] = ${j(graphEdges)};

/** 5 flagship pathways, each ending at a perception node. */
export const PATHWAYS: Pathway[] = ${j(pathways)};

/** Real corpus stats (replaces the sample placeholders on swap). */
export const TOTAL_QUESTIONS = ${LAYER.meta.totalQuestions};
export const PLATFORM_COUNT = ${LAYER.meta.sourceMeta?.paaSkippedNoKey === false ? 2 : 1};

/** Dataset provenance for the Provenance strip. */
export interface Provenance {
  rawQueries: number;
  canonicalQuestions: number;
  languages: number;
  markets: number;
  method: string;
  lastUpdated: string | null;
}
export const PROVENANCE: Provenance = ${j(PROVENANCE)};
`;

mkdirSync("lib", { recursive: true });
writeFileSync(OUT, ts);

// ── summary ─────────────────────────────────────────────────────────────────
const byType = {};
for (const [, n] of nodeEntries) byType[n.type] = (byType[n.type] || 0) + 1;
console.log("Ontology transform complete (no data swap).");
console.log(`  wrote ${OUT}`);
console.log(`  nodes  ${nodeEntries.length}  (${Object.entries(byType).map(([k, v]) => `${k}:${v}`).join(", ")})`);
console.log(`  edges  ${graphEdges.length}`);
console.log(`  pathways ${pathways.length}  → ${pathways.map((p) => p.id).join(", ")}`);
console.log(`  TOTAL_QUESTIONS ${LAYER.meta.totalQuestions}   PLATFORM_COUNT ${LAYER.meta.sourceMeta?.paaSkippedNoKey === false ? 2 : 1}`);
console.log(`  PROVENANCE  raw ${PROVENANCE.rawQueries} · canonical ${PROVENANCE.canonicalQuestions} · ${PROVENANCE.languages} langs · ${PROVENANCE.markets} markets · ${PROVENANCE.method} · ${PROVENANCE.lastUpdated}`);
