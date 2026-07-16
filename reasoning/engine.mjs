// =============================================================================
// The Reasoning Engine
// =============================================================================
//
// interpret(ontology) runs a dataset through the approved reasoning
// architecture and returns one interpretation record per subject (concept).
//
// The engine executes ONLY the AI side of the Human–AI boundary (§12): it
// performs L1 observation and the `detect` half of every lens, measures
// persistence and frame competition, and then SCAFFOLDS the human-owned
// escalation rungs (L2–L5) and the three-output gate as empty prompts. It
// never writes significance. Every record it returns is intentionally left
// "below the floor" (§5) — lifting it above Level 4 is a human act.
//
// Detection maps to the constitution's declared AI competencies: clustering,
// pattern detection, summarization, visualization, mapping relationships.
// =============================================================================

import {
  LENSES, LADDER, ESCALATION_FLOOR, QUESTION_TO_SYSTEM, FRAME_COMPETITION, OUTPUT_GATE, CIRCULATION,
} from "./architecture.mjs";
import { aiField, humanField, assertEngineBoundary, significanceDebt } from "./boundary.mjs";

// ---- L1 · relationship mapping (§4·P4) --------------------------------------
// Build lookup maps so a concept can be walked to its perception (systemic view).
function buildGraph(ontology) {
  const themeOf = new Map();     // concept id  -> [theme ids]
  const narrOf = new Map();      // theme id    -> [narrative ids]
  const percOf = new Map();      // narrative id-> [perception ids]
  for (const [c, t] of ontology.edges.conceptToTheme) push(themeOf, c, t);
  for (const [t, n] of ontology.edges.themeToNarrative) push(narrOf, t, n);
  for (const [n, p] of ontology.edges.narrativeToPerception) push(percOf, n, p);
  const label = new Map();
  for (const kind of ["concepts", "themes", "narratives", "perceptions"])
    for (const node of ontology[kind]) label.set(node.id, node.label);
  return { themeOf, narrOf, percOf, label };
}
function push(map, k, v) { if (!map.has(k)) map.set(k, []); map.get(k).push(v); }

/** Trace a concept → theme → narrative → perception path (the systemic map, §4·P4). */
function relationshipPath(conceptId, g) {
  const themes = g.themeOf.get(conceptId) ?? [];
  const narratives = [...new Set(themes.flatMap((t) => g.narrOf.get(t) ?? []))];
  const perceptions = [...new Set(narratives.flatMap((n) => g.percOf.get(n) ?? []))];
  const name = (ids) => ids.map((id) => g.label.get(id) ?? id);
  return {
    theme: name(themes), narrative: name(narratives), perception: name(perceptions),
    chain: [g.label.get(conceptId), name(themes)[0], name(narratives)[0], name(perceptions)[0]]
      .filter(Boolean).join(" → "),
  };
}

// ---- L3 · persistence detection for Question→System (§6) --------------------
function persistence(concept) {
  const m = concept.market ?? {};
  const spread = m.distinctMarkets ?? 0;
  const total = m.totalMarkets ?? spread ?? 1;
  // Persistence = broad cross-market recurrence at meaningful volume.
  const crossMarket = m.classification === "cross-market" || spread / Math.max(total, 1) >= 0.6;
  const isPersistent = crossMarket && (concept.count ?? 0) >= 30;
  return {
    persistenceScore: Number((((spread / Math.max(total, 1)) * (concept.sharePct ?? 0))).toFixed(2)),
    distinctMarkets: spread, classification: m.classification ?? "unknown",
    isPersistent,
  };
}

// ---- One interpretation record per subject ----------------------------------
function interpretConcept(concept, g) {
  const path = relationshipPath(concept.id, g);
  const topExemplar = concept.exemplars?.[0]?.text ?? null;
  const rec = persistence(concept);

  const record = {
    id: `interp_${concept.id}`,
    subject: { type: "concept", id: concept.id, label: concept.label },

    // AI detection evidence (provenance) — clustering + counting only.
    provenance: {
      count: aiField(concept.count),
      sharePct: aiField(concept.sharePct),
      salience: aiField(concept.salience),
      distinctMarkets: aiField(concept.market?.distinctMarkets ?? null),
      topMarket: aiField(concept.market?.topMarket ?? null),
    },

    // L2 · the five lenses. Engine fills `detect`; `judge` stays human-owned.
    lenses: Object.fromEntries(LENSES.map((lens) => {
      let detect;
      switch (lens.key) {
        case "attentionVsUnderstanding":
          detect = `Attention proxy — salience ${concept.salience}, ${concept.count} questions (${concept.sharePct}% of dataset).`; break;
        case "demandVsSupply":
          detect = `Demand signal — asked across ${rec.distinctMarkets} markets; leading market ${concept.market?.topMarket ?? "?"}.`; break;
        case "structureVsPattern":
          detect = `Observed pattern — questions cluster on “${concept.label}.”`; break;
        case "systemic":
          detect = `Relationship map — ${path.chain || concept.label}.`; break;
        case "institutional":
          detect = topExemplar ? `Literal question — “${topExemplar}.”` : `Literal question — (no exemplar).`; break;
        default: detect = null;
      }
      return [lens.key, {
        section: lens.section, rule: lens.rule,
        detected: aiField(detect),
        judgment: humanField(lens.keyQuestion, lens.section),
      }];
    })),

    // L3 · Question→System (§6): detect persistence, hand the naming to a human.
    questionToSystem: {
      section: QUESTION_TO_SYSTEM.section,
      detected: aiField(
        `Persistence ${rec.persistenceScore} (${rec.classification}, ${rec.distinctMarkets} markets). ` +
        (rec.isPersistent ? "PERSISTENT — a missing system is implied." : "not persistent by the current threshold.")
      ),
      isPersistent: rec.isPersistent,
      missingSystem: humanField(
        rec.isPersistent
          ? "Name the missing system this persistent question diagnoses (never 'people are ignorant')."
          : "If you judge this persistent, name the missing system it implies.",
        QUESTION_TO_SYSTEM.section),
    },

    // L3 · Escalation ladder (§5). L1 detected; L2–L5 empty, floor at Level 4.
    ladder: Object.fromEntries(LADDER.map((r) => {
      if (r.author === "ai" && r.key === "L1_observation") {
        return [r.key, {
          level: r.level, title: r.title,
          value: aiField(`People ask about “${concept.label}” — ${concept.count} questions across ${rec.distinctMarkets} markets.`),
        }];
      }
      return [r.key, { level: r.level, title: r.title, value: humanField(r.prompt, "§5") }];
    })),
    floor: ESCALATION_FLOOR,

    // L4 · three-output gate (§13) — all human-authored.
    outputs: Object.fromEntries(OUTPUT_GATE.map((o) => [o.key, {
      section: o.section, value: humanField(o.question, o.section),
    }])),

    // Status is computed after boundary assertion.
    status: "detected",
  };

  assertEngineBoundary(record);            // self-proof: no fabricated significance
  const debt = significanceDebt(record);
  record.status = "below-floor";           // §5: engine output always starts below Level 4
  record.significanceDebt = debt;
  return record;
}

// ---- Dataset-level frame competition (§7) -----------------------------------
function frameCompetition(ontology, g) {
  // Attention per perception = summed salience of the concepts that reach it.
  const reach = new Map(); // perception id -> attention
  for (const c of ontology.concepts) {
    const themes = g.themeOf.get(c.id) ?? [];
    const percs = [...new Set(themes.flatMap((t) => g.narrOf.get(t) ?? []).flatMap((n) => g.percOf.get(n) ?? []))];
    for (const p of percs) reach.set(p, (reach.get(p) ?? 0) + (c.salience ?? 0));
  }
  const total = [...reach.values()].reduce((a, b) => a + b, 0) || 1;
  const ranked = [...reach.entries()]
    .map(([id, att]) => ({ id, label: g.label.get(id) ?? id, attention: Number(att.toFixed(1)), share: Number(((att / total) * 100).toFixed(1)) }))
    .sort((a, b) => b.attention - a.attention);
  return {
    section: FRAME_COMPETITION.section,
    keyQuestion: FRAME_COMPETITION.keyQuestion,
    detected: aiField(ranked.length ? `Leading frame by attention share: “${ranked[0].label}” (${ranked[0].share}%).` : null),
    ranking: ranked,                      // AI detection: which frame currently leads
    interpretation: humanField("Interpret the competition — which frame is displacing which, and whether that should change.", FRAME_COMPETITION.section),
  };
}

// ---- Circulation candidates (§9/§14) — surface gaps, do not author questions -
function circulationCandidates(ontology) {
  const thin = ontology.concepts
    .filter((c) => (c.market?.distinctMarkets ?? 0) <= 2 || (c.sharePct ?? 0) < 3)
    .map((c) => ({ id: c.id, label: c.label, sharePct: c.sharePct, distinctMarkets: c.market?.distinctMarkets ?? 0 }));
  return {
    section: CIRCULATION.section,
    unclustered: aiField(ontology.meta?.unclusteredCount ?? null,
      "Questions no concept absorbed — the clearest gap signal."),
    thinCoverage: aiField(thin, "Concepts with narrow market or low share — candidate under-served curiosity."),
    newQuestions: humanField("Author the new questions these gaps should seed back into the cycle.", CIRCULATION.section),
  };
}

/**
 * Run the full engine over an ontology dataset.
 * @returns {{ meta, records, frameCompetition, circulation }}
 */
export function interpret(ontology) {
  const g = buildGraph(ontology);
  const records = ontology.concepts.map((c) => interpretConcept(c, g));
  return {
    meta: {
      generatedFrom: ontology.meta?.generatedFrom ?? null,
      totalQuestions: ontology.meta?.totalQuestions ?? null,
      subjects: records.length,
      floor: ESCALATION_FLOOR,
      boundary: "AI filled detection only; all significance fields are empty and human-owned (§12).",
    },
    records,
    frameCompetition: frameCompetition(ontology, g),
    circulation: circulationCandidates(ontology),
  };
}
