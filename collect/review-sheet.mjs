// Renders a human-readable bilingual review sheet from ontology_labels.json.
// Convenience only; the canonical deliverable is ontology_labels.json.
import { readFileSync, writeFileSync } from "node:fs";
const d = JSON.parse(readFileSync("./output/ontology/ontology_labels.json", "utf8"));
const esc = (s) => s.replace(/\|/g, "\\|");
const bt = (s) => "`" + s + "`";
let m = "# Bilingual Ontology Labels — Review Sheet\n\n";
m += `_Phase 0 content deliverable. ${d.meta.counts.concepts} concepts · ${d.meta.counts.themes} themes · ${d.meta.counts.narratives} narratives · ${d.meta.counts.perceptions} perceptions · ${d.meta.counts.flagshipQuestions} flagship questions = 52 nodes. Source: ontology_layer.json (${d.meta.totalQuestionsInCorpus} questions). No website change._\n\n`;
function tbl(title, arr, withStats) {
  m += `## ${title}\n\n`;
  m += `| id | 한국어 (label) | English (label) | 한국어 blurb${withStats ? " | n · top" : ""} |\n`;
  m += `|---|---|---|---${withStats ? " | ---" : ""} |\n`;
  for (const n of arr) {
    m += `| ${bt(n.id)} | ${esc(n.label.ko)} | ${esc(n.label.en)} | ${esc(n.blurb.ko)}`;
    if (withStats) m += ` | ${n.count} · ${n.topMarket}`;
    m += " |\n";
  }
  m += "\n";
}
tbl("Concepts (18)", d.concepts, true);
tbl("Themes (6)", d.themes, false);
tbl("Narratives (5)", d.narratives, false);
tbl("Perceptions (5)", d.perceptions, false);
m += "## Flagship questions (18 — one real collected exemplar per concept)\n\n";
m += "| id | → concept | 한국어 | English | source exemplar |\n|---|---|---|---|---|\n";
for (const q of d.questions)
  m += `| ${bt(q.id)} | ${bt(q.conceptId)} | ${esc(q.label.ko)} | ${esc(q.label.en)} | ${bt(esc(q.sourceExemplar))} |\n`;
m += "\n_Short (chip) labels and en/ko blurbs for every node live in `ontology_labels.json`._\n";
writeFileSync("./output/ontology/ontology_labels_REVIEW.md", m);
console.log("wrote ontology_labels_REVIEW.md");
