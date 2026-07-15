#!/usr/bin/env node
// First real ontology generation from collected canonical questions.
//
//   Question → Concept → Theme → Narrative → Perception
//
// Concepts are discovered from the data by transparent keyword clustering
// (anchors chosen from the observed top content tokens across languages).
// Themes / narratives / perceptions are the interpretive layers (human-led),
// encoded below. Every concept records the real questions and markets that
// produced it. Lexical clustering is the MVP method; embeddings are the future
// upgrade (see docs/QUESTION-COLLECTION-FRAMEWORK.md).
//
// Usage: node ontology.mjs <path-to-canonical_questions.json>
// Writes: output/ontology/ontology_layer.json + ONTOLOGY-PROPOSAL.md

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeText } from "./src/normalize.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

// ── Concepts (data-driven anchors, multilingual) ───────────────────────────
// Priority order: first matching concept wins (most specific first).
const CONCEPTS = [
  { id: "c_beauty", label: "K-Beauty & Appearance", anchors: ["skincare", "beauty", "beleza", "kecantikan", "schönheit", "makeup", "cosmetic", "glass skin", "serum", "sunscreen", "plastic surgery", "tall", "beautiful", "height", "looks", "handsome"] },
  { id: "c_drama", label: "K-Drama", anchors: ["drama", "dorama"] },
  { id: "c_kpop", label: "K-pop & Hallyu", anchors: ["kpop", "k pop", "k-pop", "hallyu", "wave", "idol", "bts", "blackpink", "demon hunter", "stray kids", "concert"] },
  { id: "c_fashion", label: "Korean Fashion", anchors: ["fashion", "mode", "moda", "style", "streetwear", "outfit"] },
  { id: "c_food", label: "Korean Food", anchors: ["kimchi", "jjigae", "tteokbokki", "bibimbap", "ramyeon", "ramen", "bbq", "barbecue", "food", "comida", "makanan", "essen", "corn dog", "fried chicken", "gimbap", "soju", "banchan", "noodle", "chopstick", "americano", "coffee", "eat dog", "lactose"] },
  { id: "c_samsung", label: "Samsung & Technology", anchors: ["samsung", "galaxy", "s26", "smartphone", "electronics", "hyundai", "lg ", "technology", "teknologi", "tech "] },
  { id: "c_places", label: "Seoul & Places", anchors: ["seoul", "seul", "busan", "jeju", "incheon", "tower", "forest", "gyeongbokgung", "myeongdong", "hongdae", "gangnam", "palace", "map"] },
  { id: "c_travel", label: "Travel & Visiting", anchors: ["safe", "safety", "expensive", "cost", "visa", "worth", "visiting", "visit", "trip", "itinerary", "weather", "flight", "tourist", "holiday", "aman", "vale a pena", "morar", "airline", "korean air"] },
  { id: "c_language", label: "Korean Language", anchors: ["language", "idioma", "sprache", "learn", "bahasa", "hangul", "alphabet", "hard", "difficult", "sulit", "speak", "grammar", "duolingo"] },
  { id: "c_division", label: "Division & Two Koreas", anchors: ["north korea", "north", "utara", "nordkorea", "norte", "divided", "division", "reunification", "dmz", "war", "geteilt", "terbagi", "demilitarized", "militer", "military service", "conscription"] },
  { id: "c_neighbors", label: "Neighbours & Comparison", anchors: ["japan", "jepang", "china", "chinese", " vs ", "versus", "compared"] },
  { id: "c_tradition", label: "Tradition & Heritage", anchors: ["hanbok", "tradition", "temple", "confucian", "joseon", "dynasty", "festival", "chuseok", "seollal"] },
  { id: "c_culture", label: "Culture (general)", anchors: ["culture", "cultura", "budaya", "kultur", "known for", "wedding", "weddings", "custom", "norms"] },
  { id: "c_religion", label: "Religion & Belief", anchors: ["christian", "christianity", "religion", "religi", "buddhis", "church", "agama", "belief"] },
  { id: "c_society", label: "Society & People", anchors: ["age", "names", "bow", "etiquette", "marriage", "study", "education", "suneung", "birth rate", "manners", "school", "friendly", "polite"] },
  { id: "c_history", label: "History", anchors: ["history", "geschichte", "sejarah", "colonial", "occupation", "independence"] },
  { id: "c_geography", label: "Geography & Basics", anchors: ["southeast asia", "continent", "mountainous", "where is korea", "population", "capital", "flag", "time zone", "known as"] },
  { id: "c_economy", label: "Economy & Development", anchors: ["economy", "ekonomi", "gdp", "rich", "developed", "wealthy", "chaebol", "currency", "won ", "money", "salary"] },
];

// ── Interpretive layers (human-led) ────────────────────────────────────────
const THEMES = [
  { id: "t_hallyu", label: "Popular Culture (Hallyu)", concepts: ["c_kpop", "c_drama", "c_beauty", "c_fashion"] },
  { id: "t_food_tradition", label: "Food, Tradition & Heritage", concepts: ["c_food", "c_tradition"] },
  { id: "t_travel", label: "Places & Travel", concepts: ["c_places", "c_travel", "c_geography"] },
  { id: "t_tech_econ", label: "Technology & Economy", concepts: ["c_samsung", "c_economy"] },
  { id: "t_division_history", label: "Division, History & Geopolitics", concepts: ["c_division", "c_history", "c_neighbors"] },
  { id: "t_language_society", label: "Language, Society & Beliefs", concepts: ["c_language", "c_society", "c_culture", "c_religion"] },
];

const NARRATIVES = [
  { id: "n_cultural_force", label: "Korea as a global cultural force", themes: ["t_hallyu", "t_food_tradition"] },
  { id: "n_destination", label: "Korea as a place to experience", themes: ["t_travel"] },
  { id: "n_advanced", label: "Korea as an advanced technology & economy", themes: ["t_tech_econ"] },
  { id: "n_divided", label: "Korea as a nation shaped by division & history", themes: ["t_division_history"] },
  { id: "n_society", label: "Korea as a distinct society to understand", themes: ["t_language_society"] },
];

const PERCEPTIONS = [
  { id: "p_cultural_power", label: "Korea as a cultural powerhouse", narratives: ["n_cultural_force", "n_destination"] },
  { id: "p_modern", label: "Korea as an advanced modern nation", narratives: ["n_advanced"] },
  { id: "p_divided", label: "Korea as a divided nation", narratives: ["n_divided"] },
  { id: "p_distinct", label: "Korea as a distinct society", narratives: ["n_society"] },
];

// ── Load ───────────────────────────────────────────────────────────────────
const inputPath = process.argv[2] || join(HERE, "output", "canonical_questions.json");
const data = JSON.parse(readFileSync(inputPath, "utf8"));
const Q = data.questions;

function classify(text) {
  const norm = ` ${normalizeText(text)} `;
  for (const c of CONCEPTS) {
    if (c.anchors.some((a) => norm.includes(a))) return c.id;
  }
  return "c_other";
}

// ── Assign + aggregate ─────────────────────────────────────────────────────
const conceptStat = new Map();
const ensure = (id, label) => {
  if (!conceptStat.has(id))
    conceptStat.set(id, { id, label, count: 0, markets: {}, langs: {}, examples: [], corrupt: 0 });
  return conceptStat.get(id);
};
CONCEPTS.forEach((c) => ensure(c.id, c.label));
ensure("c_other", "Unclustered / general");

for (const q of Q) {
  const cid = classify(q.canonicalText);
  const s = ensure(cid);
  s.count++;
  const corrupt = /�/.test(q.canonicalText);
  if (corrupt) s.corrupt++;
  (q.countries || []).forEach((m) => (s.markets[m] = (s.markets[m] || 0) + 1));
  s.langs[q.language] = (s.langs[q.language] || 0) + 1;
  if (!corrupt) s.examples.push({ t: q.canonicalText, sal: q.frequencyIndicator, m: q.countries });
}

for (const s of conceptStat.values()) {
  s.examples.sort((a, b) => b.sal - a.sal);
  s.exampleTop = s.examples.slice(0, 8).map((e) => e.t);
  s.marketList = Object.entries(s.markets).sort((a, b) => b[1] - a[1]).map(([m, n]) => `${m}:${n}`);
  delete s.examples;
}

// ── Build node/edge structure ──────────────────────────────────────────────
const total = Q.length;
const conceptsOut = [...CONCEPTS.map((c) => c.id), "c_other"].map((id) => {
  const s = conceptStat.get(id);
  return {
    id,
    type: "concept",
    label: s.label,
    questionCount: s.count,
    share: Math.round((s.count / total) * 1000) / 10,
    markets: s.marketList,
    languages: s.langs,
    corruptedMembers: s.corrupt,
    sampleQuestions: s.exampleTop,
  };
});

const edges = [];
THEMES.forEach((t) => t.concepts.forEach((c) => edges.push({ from: c, to: t.id, rel: "part_of" })));
NARRATIVES.forEach((n) => n.themes.forEach((t) => edges.push({ from: t, to: n.id, rel: "composes" })));
PERCEPTIONS.forEach((p) => p.narratives.forEach((n) => n && edges.push({ from: n, to: p.id, rel: "converges_on" })));

// theme/narrative/perception question counts = sum of member concepts
const conceptCount = Object.fromEntries(conceptsOut.map((c) => [c.id, c.questionCount]));
const themesOut = THEMES.map((t) => ({
  id: t.id, type: "theme", label: t.label, concepts: t.concepts,
  questionCount: t.concepts.reduce((s, c) => s + (conceptCount[c] || 0), 0),
}));
const themeCount = Object.fromEntries(themesOut.map((t) => [t.id, t.questionCount]));
const narrativesOut = NARRATIVES.map((n) => ({
  id: n.id, type: "narrative", label: n.label, themes: n.themes,
  questionCount: n.themes.reduce((s, t) => s + (themeCount[t] || 0), 0),
}));
const narrCount = Object.fromEntries(narrativesOut.map((n) => [n.id, n.questionCount]));
const perceptionsOut = PERCEPTIONS.map((p) => ({
  id: p.id, type: "perception", label: p.label, narratives: p.narratives.filter(Boolean),
  questionCount: p.narratives.filter(Boolean).reduce((s, n) => s + (narrCount[n] || 0), 0),
}));

const outDir = join(HERE, "output", "ontology");
mkdirSync(outDir, { recursive: true });

const ontology = {
  meta: {
    generatedFrom: "collect/output/canonical_questions.json",
    sourceMeta: data.meta,
    totalQuestions: total,
    corruptedQuestions: Q.filter((q) => /�/.test(q.canonicalText)).length,
    method: "lexical keyword clustering (anchors from observed top tokens); interpretive theme/narrative/perception layers",
    version: "ontology/0.1.0",
  },
  concepts: conceptsOut.sort((a, b) => b.questionCount - a.questionCount),
  themes: themesOut.sort((a, b) => b.questionCount - a.questionCount),
  narratives: narrativesOut.sort((a, b) => b.questionCount - a.questionCount),
  perceptions: perceptionsOut.sort((a, b) => b.questionCount - a.questionCount),
  edges,
};
writeFileSync(join(outDir, "ontology_layer.json"), JSON.stringify(ontology, null, 2));

// ── Console summary ─────────────────────────────────────────────────────────
console.log(`\nOntology generated from ${total} canonical questions (${ontology.meta.corruptedQuestions} corrupted).\n`);
console.log("CONCEPTS (by question count):");
for (const c of ontology.concepts) {
  console.log(`  ${String(c.questionCount).padStart(4)} (${String(c.share).padStart(4)}%)  ${c.label.padEnd(26)}  markets:${c.markets.slice(0,5).join(" ")}`);
  console.log(`        e.g. ${c.sampleQuestions.slice(0,4).join(" · ") || "(none clean)"}`);
}
console.log("\nTHEMES:");
themesOut.forEach((t) => console.log(`  ${String(t.questionCount).padStart(4)}  ${t.label}  ← ${t.concepts.join(", ")}`));
console.log("\nNARRATIVES:");
narrativesOut.forEach((n) => console.log(`  ${String(n.questionCount).padStart(4)}  ${n.label}  ← ${n.themes.join(", ")}`));
console.log("\nPERCEPTIONS:");
perceptionsOut.forEach((p) => console.log(`  ${String(p.questionCount).padStart(4)}  ${p.label}  ← ${p.narratives.join(", ")}`));
console.log(`\nWrote ${join(outDir, "ontology_layer.json")}`);
