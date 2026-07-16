#!/usr/bin/env node
// =============================================================================
// pipeline/run-monthly.mjs — the Monthly Research Pipeline (orchestrator)
// =============================================================================
//
// Chains the EXISTING tools — it redesigns none of them — into one automated
// monthly run:
//
//   collect (Google Autocomplete)  →  merge into the accumulated dataset
//   →  regenerate ontology_layer.json  →  (self-gating) refresh the site
//   →  run the reasoning engine + research generator  →  detect change vs the
//   previous month  →  draft the four research outputs  →  snapshot everything
//   to versioned history.
//
// Every newly collected question therefore passes through the approved Kwon
// Soyoung reasoning process (Question → Concept → Theme → Narrative →
// Perception → Meaning → Participation → System → New Questions). The engine
// fills findings; all significance stays human-owned (§12).
//
// Configuration (env):
//   AAK_DATE            YYYY-MM-DD for this run          (default: today)
//   AAK_COLLECT_MODE    auto | offline | live | skip     (default: auto)
//                       skip = no collection (baseline / backfill of real data)
//   AAK_APPLY_SITE      1 | 0  regenerate lib/ontology.generated.ts (default 1,
//                       self-gates: only when every node has a human label)
//   AAK_HISTORY_DIR     history location                 (default: pipeline/history)
//   SERPAPI_KEY         optional — enables live People-Also-Ask in collection
//
// Offline; analysis-only; does not run `next build`.
// =============================================================================

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { interpret } from "../reasoning/engine.mjs";
import { generateResearch } from "../reasoning/generate.mjs";
import { detectChanges } from "./change-detection.mjs";
import * as V from "./versioning.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const COLLECT = join(ROOT, "collect");
const P = {
  canonical: join(COLLECT, "output/canonical_questions.json"),
  raw: join(COLLECT, "output/raw_questions.json"),
  ontology: join(COLLECT, "output/ontology/ontology_layer.json"),
  labels: join(COLLECT, "output/ontology/ontology_labels.json"),
  generatedTs: join(ROOT, "lib/ontology.generated.ts"),
  reasoningInterp: join(ROOT, "reasoning/output/interpretation.json"),
  reasoningManifest: join(ROOT, "reasoning/output/research-manifest.json"),
};

const cfg = {
  date: process.env.AAK_DATE || new Date().toISOString().slice(0, 10),
  mode: process.env.AAK_COLLECT_MODE || "auto",
  applySite: process.env.AAK_APPLY_SITE !== "0",
};
const month = V.monthKey(cfg.date);

const log = (m) => console.log(m);
const readJSON = (p) => JSON.parse(readFileSync(p, "utf8"));

function run(cmd, args, cwd, extraEnv = {}) {
  const r = spawnSync(cmd, args, { cwd, env: { ...process.env, ...extraEnv }, encoding: "utf8" });
  if (r.status !== 0) {
    return { ok: false, out: (r.stdout || "") + (r.stderr || "") };
  }
  return { ok: true, out: r.stdout || "" };
}

// ---- 1. Collection + merge into the accumulated dataset ---------------------
function collectAndMerge() {
  const baseContainer = existsSync(P.canonical)
    ? readJSON(P.canonical)
    : { meta: {}, count: 0, questions: [] };
  const baseAccumulated = baseContainer.questions ?? [];

  if (cfg.mode === "skip") {
    log(`  collection: skipped (baseline/backfill) — accumulated ${baseAccumulated.length} questions`);
    return { container: baseContainer, accumulated: baseAccumulated, fresh: baseAccumulated };
  }

  log(`  collection: mode=${cfg.mode} …`);
  const res = run("node", ["run.mjs", "--mode", cfg.mode], COLLECT, { AAK_DATE: cfg.date });
  if (!res.ok) {
    log("  ⚠ collection failed; continuing with existing accumulated dataset:\n" + res.out.split("\n").slice(-4).join("\n"));
    return { container: baseContainer, accumulated: baseAccumulated, fresh: [] };
  }
  const freshContainer = readJSON(P.canonical); // collect just overwrote canonical with THIS month's set
  const fresh = freshContainer.questions ?? [];
  const merged = mergeDatasets(baseAccumulated, fresh, month);

  const container = { ...baseContainer, meta: { ...baseContainer.meta, date: cfg.date }, count: merged.length, questions: merged };
  writeFileSync(P.canonical, JSON.stringify(container, null, 2)); // accumulated becomes the working dataset
  log(`  collection: fresh ${fresh.length} · accumulated ${merged.length} (was ${baseAccumulated.length})`);
  return { container, accumulated: merged, fresh };
}

/** Union two canonical sets by content key; accumulate coverage + seen-history. */
function mergeDatasets(base, fresh, m) {
  const key = (q) => `${q.language ?? "?"}::${(q.canonicalText ?? "").toLowerCase().trim()}`;
  const map = new Map();
  for (const q of base) map.set(key(q), { ...q, firstSeenMonth: q.firstSeenMonth ?? m, lastSeenMonth: q.lastSeenMonth ?? m, monthsSeen: q.monthsSeen ?? 1 });
  for (const q of fresh) {
    const k = key(q);
    const prev = map.get(k);
    if (!prev) {
      map.set(k, { ...q, firstSeenMonth: m, lastSeenMonth: m, monthsSeen: 1 });
    } else {
      const uni = (a = [], b = []) => [...new Set([...a, ...b])];
      map.set(k, {
        ...prev,
        variantTexts: uni(prev.variantTexts, q.variantTexts),
        variantIds: uni(prev.variantIds, q.variantIds),
        countries: uni(prev.countries, q.countries),
        sources: uni(prev.sources, q.sources),
        languages: uni(prev.languages, q.languages),
        lastSeenMonth: m,
        monthsSeen: (prev.monthsSeen ?? 1) + (prev.lastSeenMonth === m ? 0 : 1),
      });
    }
  }
  return [...map.values()];
}

// ---- 2. Ontology regeneration -----------------------------------------------
function regenerateOntology() {
  const res = run("node", ["ontology.mjs"], COLLECT);
  if (!res.ok) throw new Error("ontology regeneration failed:\n" + res.out);
  const ont = readJSON(P.ontology);
  log(`  ontology: ${ont.concepts.length} concepts · ${ont.themes.length} themes · ${ont.narratives.length} narratives · ${ont.perceptions.length} perceptions`);
  return ont;
}

// ---- 2b. Site refresh (self-gating on human labels) -------------------------
function refreshSite() {
  if (!cfg.applySite) return { applied: false, reason: "AAK_APPLY_SITE=0" };
  const labels = run("node", ["labels.mjs"], COLLECT);
  if (!labels.ok) {
    return { applied: false, reason: "new nodes lack human bilingual labels — Explore/Research left on last approved ontology" };
  }
  const site = run("node", ["scripts/ontology-to-site.mjs"], ROOT);
  if (!site.ok) return { applied: false, reason: "site transform failed:\n" + site.out.split("\n").slice(-3).join("\n") };
  return { applied: true, reason: "labels complete — lib/ontology.generated.ts refreshed" };
}

// ---- 3. Reasoning (engine + research generator) -----------------------------
function runReasoning(ontology) {
  const runOut = interpret(ontology);              // asserts Human–AI boundary per record
  const manifest = generateResearch(runOut);
  writeFileSync(P.reasoningInterp, JSON.stringify(runOut, null, 2));
  writeFileSync(P.reasoningManifest, JSON.stringify(manifest, null, 2));
  log(`  reasoning: ${runOut.records.length} records · frame “${runOut.frameCompetition.ranking[0]?.label}” · significance owed ${manifest.totals.significanceOwed}`);
  return { runOut, manifest };
}

// ---- 5. Research drafts (findings filled; significance human-owned) ---------
function draftResearch({ runOut, manifest }, change) {
  const drafts = {};
  const head = (title, rung, question) =>
    `# ${title} — DRAFT (${month})\n\n> Rung ${rung} · “${question}” · Kwon Soyoung Framework v1.5.\n` +
    `> **Findings are AI-generated. Significance is human-owned (§12) — do not fabricate it.**\n`;

  // Data Report — the one machine-ready rung (description).
  const r1 = manifest.rungs.find((r) => r.rung === 1);
  const dr = [head("Data Report", 1, r1.question), ""];
  dr.push(`**Leading frame:** ${runOut.frameCompetition.detected.value}`, "");
  dr.push("| Concept | count | share % | persistent? |", "|---|---|---|---|");
  for (const o of r1.body.observations) dr.push(`| ${o.subject} | ${o.count} | ${o.sharePct} | ${o.persistent ? "yes" : "—"} |`);
  dr.push("", `**Gaps:** ${r1.body.gaps.unclustered} unclustered · thin coverage: ${(r1.body.gaps.thinCoverage || []).map((c) => c.label).join(", ") || "—"}`);
  dr.push("", "**Change this month:** see change-report.md (findings). Significance below is human-owned.");
  drafts["data-report.md"] = dr.join("\n");

  // Diplomacy Brief / Framework Implications / Question Commons — scaffolds.
  const scaffold = (title, rung, question, note) => {
    const r = manifest.rungs.find((x) => x.rung === rung);
    const L = [head(title, rung, question), "", `_${note}_`, "", `**Human significance still owed:** ${r.readiness.owed} field(s) across ${manifest.totals.subjects} subjects.`, ""];
    L.push("Fill these from the reasoning worksheet (reasoning/output/human-worksheet.md) and the change report:");
    L.push("- [ ] What does this month reveal? (§5·L2)");
    L.push("- [ ] What perception gap does it expose? (§7)");
    if (rung >= 3) L.push("- [ ] What missing system does it imply? (§6)");
    if (rung >= 3) L.push("- [ ] What should change? (strategic output, §13)");
    if (rung === 4) L.push("- [ ] Who should participate, and how? (§8, §10)");
    if (rung === 4) L.push("- [ ] What new questions re-enter the cycle? (§9)");
    return L.join("\n");
  };
  drafts["diplomacy-brief.md"] = scaffold("Diplomacy Brief", 2, "So what?", "Interpretation layer — meaning + perception gaps. Awaits human significance.");
  drafts["framework-implications.md"] = scaffold("Framework Implications", 3, "Now what?", "Institutional layer — the missing systems the evidence implies. Awaits human design.");
  drafts["question-commons-implications.md"] = scaffold("Question Commons Implications", 4, "What if?", "Ecosystem layer — participation + circulation. Awaits human design.");

  return drafts;
}

// ---- Orchestration ----------------------------------------------------------
function main() {
  log(`\n▶ Monthly Research Pipeline — ${month} (date ${cfg.date}, mode ${cfg.mode})\n`);
  const prevMonth = V.previousVersion(month);
  const paths = V.monthPaths(month);

  // 1. collect + merge
  const { accumulated, fresh } = collectAndMerge();
  V.writeJSON(paths.freshCanonical, { month, count: fresh.length, questions: fresh });
  if (existsSync(P.raw)) V.snapshotFile(month, P.raw, "fresh/raw_questions.json");
  V.writeJSON(paths.accumulated, { month, count: accumulated.length, questions: accumulated });

  // 2. ontology regeneration (+ optional self-gating site refresh)
  const ontology = regenerateOntology();
  V.snapshotFile(month, P.ontology, "ontology/ontology_layer.json");
  const site = refreshSite();
  log(`  site: ${site.applied ? "refreshed" : "not refreshed"} — ${site.reason}`);

  // 3/4. reasoning
  const reasoning = runReasoning(ontology);
  V.writeJSON(paths.interpretation, reasoning.runOut);
  V.writeJSON(paths.manifest, reasoning.manifest);

  // 4.5 + 3. change detection vs previous month (framework-guided)
  const previous = prevMonth
    ? {
        canonicalFresh: V.loadSnapshot(prevMonth, "fresh/canonical_questions.json"),
        ontology: V.loadSnapshot(prevMonth, "ontology/ontology_layer.json"),
        interpretation: V.loadSnapshot(prevMonth, "reasoning/interpretation.json"),
      }
    : null;
  const { report, markdown } = detectChanges({
    month, prevMonth,
    current: { canonicalFresh: { questions: fresh }, ontology, interpretation: reasoning.runOut },
    previous,
  });
  V.writeJSON(paths.changeJson, report);
  V.writeText(paths.changeMd, markdown);
  log(`  change: ${report.baseline ? "baseline" : `vs ${prevMonth}`} · +${report.detected.questions.counts.value.added}/−${report.detected.questions.counts.value.removed} questions · frame ${report.detected.frameCompetition.leadChanged ? "LEAD CHANGED" : "stable"}`);

  // 5. research drafts
  const drafts = draftResearch(reasoning, report);
  for (const [name, text] of Object.entries(drafts)) V.writeText(join(paths.draftsDir, name), text);
  log(`  drafts: ${Object.keys(drafts).length} (data-report machine-ready; others await human significance)`);

  // 7. versioning: meta + registry
  const meta = {
    month, date: cfg.date, previousMonth: prevMonth,
    collectMode: cfg.mode, siteRefreshed: site.applied, siteReason: site.reason,
    framework: "Kwon-Soyoung v1.5",
    counts: {
      freshQuestions: fresh.length, accumulatedQuestions: accumulated.length,
      concepts: ontology.concepts.length, themes: ontology.themes.length,
      narratives: ontology.narratives.length, perceptions: ontology.perceptions.length,
    },
    leadingFrame: reasoning.runOut.frameCompetition.ranking[0]?.label ?? null,
    significanceOwed: reasoning.manifest.totals.significanceOwed,
    boundary: "AI produced findings only; all significance fields human-owned (§12).",
  };
  V.writeJSON(paths.meta, meta);
  V.updateIndex(month, {
    date: cfg.date, accumulatedQuestions: accumulated.length, freshQuestions: fresh.length,
    concepts: ontology.concepts.length, leadingFrame: meta.leadingFrame,
    significanceOwed: meta.significanceOwed, siteRefreshed: site.applied,
  });

  log("\n── Monthly run complete ────────────────────");
  log(`  month     : ${month}${prevMonth ? `  (prev ${prevMonth})` : "  (baseline)"}`);
  log(`  history   : pipeline/history/${month}/`);
  log(`  boundary  : findings AI · significance human-owned (§12) — preserved`);
  log("────────────────────────────────────────────\n");
}

main();
