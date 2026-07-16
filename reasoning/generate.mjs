// =============================================================================
// Research Output Generation (§13, §14)
// =============================================================================
//
// The escalation ladder maps onto the four existing research rungs
// (lib/research.ts). This module assembles an interpretation run into a
// per-rung research manifest so that outputs are GENERATED from the reasoning
// layer rather than authored ad hoc.
//
// Faithful to the Human–AI boundary (§12): only Rung 1 (Description) is
// machine-ready, because it is built entirely from AI-detected observation.
// Rungs 2–4 require human significance; the generator attaches the exact
// scaffolds and reports readiness, but never fabricates the interpretation.
//
// "Analysis without design remains incomplete." (§13)
// =============================================================================

import { RUNG_MAP } from "./architecture.mjs";
import { significanceDebt } from "./boundary.mjs";

/** Pull a dotted path out of a record ("ladder.L2_meaning.value"). */
function pick(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

/** Is every human field backing this rung filled across all records? */
function rungReadiness(run, rung) {
  if (rung.machineReady) return { ready: true, owed: 0, answered: run.records.length };
  let owed = 0, answered = 0;
  for (const rec of run.records) {
    for (const src of rung.sources) {
      if (src.includes("*") || !src.startsWith("ladder") && !src.startsWith("outputs")) continue;
      const f = pick(rec, src)?.value ?? pick(rec, src);
      if (f && f.author === "human") (f.filled ? answered++ : owed++);
    }
  }
  return { ready: owed === 0, owed, answered };
}

/** Build the Rung 1 (Data Report) body — the one rung the engine may complete. */
function dataReportBody(run) {
  return {
    frame: run.frameCompetition.detected.value,
    frameRanking: run.frameCompetition.ranking,
    observations: run.records.map((r) => ({
      subject: r.subject.label,
      observation: r.ladder.L1_observation.value.value,
      count: r.provenance.count.value,
      sharePct: r.provenance.sharePct.value,
      persistent: r.questionToSystem.isPersistent,
      relationship: r.lenses.systemic.detected.value,
    })),
    gaps: { unclustered: run.circulation.unclustered.value, thinCoverage: run.circulation.thinCoverage.value },
  };
}

/**
 * Generate the research manifest from an interpretation run.
 * @returns {{ rungs: Array, totals: object }}
 */
export function generateResearch(run) {
  const rungs = RUNG_MAP.map((rung) => {
    const readiness = rungReadiness(run, rung);
    return {
      rung: rung.rung,
      slug: rung.slug,
      question: rung.question,
      section: rung.section,
      sources: rung.sources,
      machineReady: rung.machineReady,
      readiness,
      note: rung.note,
      // Rung 1 ships a body; higher rungs ship the scaffold + the debt to fill.
      body: rung.rung === 1 ? dataReportBody(run) : null,
      awaiting: rung.machineReady ? null : `${readiness.owed} human field(s) across ${run.records.length} subjects`,
    };
  });

  const debt = run.records.reduce((acc, r) => {
    const d = significanceDebt(r);
    return { owed: acc.owed + d.owed, answered: acc.answered + d.answered };
  }, { owed: 0, answered: 0 });

  return {
    totals: {
      subjects: run.records.length,
      significanceOwed: debt.owed,
      significanceAnswered: debt.answered,
      machineReadyRungs: rungs.filter((r) => r.machineReady).length,
      humanBlockedRungs: rungs.filter((r) => !r.machineReady).length,
    },
    rungs,
  };
}
