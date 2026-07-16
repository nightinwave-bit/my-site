// =============================================================================
// pipeline/change-detection.mjs — framework-guided month-over-month change
// =============================================================================
//
// This is NOT a generic trend detector. It compares the current month against
// the previous month and produces a structured change report that is read
// through the Kwon Soyoung reasoning architecture:
//
//   AI detects the deltas (findings) — new/removed questions, concept growth
//   and decline, theme/narrative/perception shifts, frame-competition shifts.
//
//   Humans own the significance — for every material change the report carries
//   the four framework questions as EMPTY, human-owned fields (§12):
//     • what the change reveals            (meaning,           §5·L2)
//     • what perception gap it exposes     (gap,               §5·L3 / §7)
//     • what participation opportunity     (participation,     §8)
//     • what missing system it implies     (question→system,   §6)
//
// The report thus applies the Five-Layer Model, the Escalation Ladder, the
// Question-to-System principle, the Frame Competition principle, the
// Participation principle, and the Human–AI boundary to change itself.
// =============================================================================

import { aiField, humanField, assertEngineBoundary } from "../reasoning/boundary.mjs";

const GROWTH_SHARE_PP = 0.5;   // flag a concept move at ≥ 0.5 percentage points
const GROWTH_COUNT = 10;       // …or ≥ 10 absolute questions
const FRAME_SHIFT_PP = 1.0;    // flag a frame move at ≥ 1.0 percentage points

// ---- helpers ----------------------------------------------------------------
const questionsOf = (canon) => (Array.isArray(canon) ? canon : canon?.questions ?? []);
const qKey = (q) => `${q.language ?? "?"}::${(q.canonicalText ?? "").toLowerCase().trim()}`;
const byId = (arr) => new Map((arr ?? []).map((x) => [x.id, x]));
const round = (n) => Number((n ?? 0).toFixed(2));

/** The four framework interpretation prompts — always human-owned (§12). */
function significanceBlock(scopeLabel) {
  return {
    reveals: humanField(`What does this change reveal? — ${scopeLabel}`, "§5·L2"),
    perceptionGap: humanField(`What perception gap does it expose? — ${scopeLabel}`, "§7"),
    participationOpportunity: humanField(`What participation opportunity emerges? — ${scopeLabel}`, "§8"),
    missingSystem: humanField(`What missing system might it imply? — ${scopeLabel}`, "§6"),
  };
}

// ---- question-level: new / removed (fresh month vs previous fresh) -----------
function questionDelta(currentFresh, previousFresh) {
  const cur = new Map(questionsOf(currentFresh).map((q) => [qKey(q), q]));
  const prev = new Map(questionsOf(previousFresh).map((q) => [qKey(q), q]));
  const added = [], removed = [];
  for (const [k, q] of cur) if (!prev.has(k)) added.push({ text: q.canonicalText, language: q.language });
  for (const [k, q] of prev) if (!cur.has(k)) removed.push({ text: q.canonicalText, language: q.language });
  return {
    newQuestions: aiField(added, "Questions surfacing this month that were absent last month."),
    removedQuestions: aiField(removed, "Questions present last month that did not surface this month."),
    counts: aiField({ added: added.length, removed: removed.length, current: cur.size, previous: prev.size }),
  };
}

// ---- concept growth / decline -----------------------------------------------
function conceptDelta(curOnt, prevOnt) {
  const cur = byId(curOnt.concepts), prev = byId(prevOnt?.concepts ?? []);
  const moved = [], appeared = [], disappeared = [];
  for (const [id, c] of cur) {
    const p = prev.get(id);
    if (!p) { appeared.push({ id, label: c.label, count: c.count, sharePct: c.sharePct }); continue; }
    const dCount = (c.count ?? 0) - (p.count ?? 0);
    const dShare = round((c.sharePct ?? 0) - (p.sharePct ?? 0));
    if (Math.abs(dShare) >= GROWTH_SHARE_PP || Math.abs(dCount) >= GROWTH_COUNT) {
      moved.push({ id, label: c.label, dCount, dShare, direction: dShare >= 0 ? "growth" : "decline",
        from: { count: p.count, sharePct: p.sharePct }, to: { count: c.count, sharePct: c.sharePct } });
    }
  }
  for (const [id, p] of prev) if (!cur.has(id)) disappeared.push({ id, label: p.label, count: p.count });
  moved.sort((a, b) => Math.abs(b.dShare) - Math.abs(a.dShare));
  return {
    growth: aiField(moved.filter((m) => m.direction === "growth")),
    decline: aiField(moved.filter((m) => m.direction === "decline")),
    appeared: aiField(appeared, "New concepts — may require human bilingual labels before the site refreshes."),
    disappeared: aiField(disappeared),
  };
}

// ---- layer size shifts (themes / narratives / perceptions) ------------------
function layerSize(ont) {
  const cCount = byId(ont.concepts);
  const themeSize = new Map();
  for (const t of ont.themes ?? []) themeSize.set(t.id, {
    label: t.label, size: (t.concepts ?? []).reduce((s, cid) => s + (cCount.get(cid)?.count ?? 0), 0),
    members: t.concepts ?? [] });
  const narrSize = new Map();
  for (const n of ont.narratives ?? []) narrSize.set(n.id, {
    label: n.label, size: (n.themes ?? []).reduce((s, tid) => s + (themeSize.get(tid)?.size ?? 0), 0),
    members: n.themes ?? [] });
  const percSize = new Map();
  for (const p of ont.perceptions ?? []) percSize.set(p.id, {
    label: p.label, size: (p.narratives ?? []).reduce((s, nid) => s + (narrSize.get(nid)?.size ?? 0), 0),
    members: p.narratives ?? [] });
  return { themeSize, narrSize, percSize };
}

function layerShift(curMap, prevMap) {
  const total = [...curMap.values()].reduce((s, v) => s + v.size, 0) || 1;
  const prevTotal = [...(prevMap?.values() ?? [])].reduce((s, v) => s + v.size, 0) || 1;
  const out = [];
  for (const [id, cur] of curMap) {
    const p = prevMap?.get(id);
    const curShare = round((cur.size / total) * 100);
    const prevShare = p ? round((p.size / prevTotal) * 100) : null;
    const dShare = p ? round(curShare - prevShare) : null;
    const membershipChanged = p ? JSON.stringify(p.members) !== JSON.stringify(cur.members) : true;
    if (dShare === null || Math.abs(dShare) >= GROWTH_SHARE_PP || membershipChanged) {
      out.push({ id, label: cur.label, curShare, prevShare, dShare, membershipChanged, isNew: !p });
    }
  }
  return out.sort((a, b) => Math.abs(b.dShare ?? 99) - Math.abs(a.dShare ?? 99));
}

// ---- frame competition shift (§7) -------------------------------------------
// Uses the engine's own frameCompetition ranking (AI detection of which frame
// leads by attention share).
function frameShift(curInterp, prevInterp) {
  const cur = curInterp?.frameCompetition?.ranking ?? [];
  const prev = new Map((prevInterp?.frameCompetition?.ranking ?? []).map((f, i) => [f.id, { ...f, rank: i + 1 }]));
  const rows = cur.map((f, i) => {
    const p = prev.get(f.id);
    return {
      id: f.id, label: f.label, rank: i + 1, prevRank: p?.rank ?? null,
      share: f.share, prevShare: p?.share ?? null,
      dShare: p ? round(f.share - p.share) : null,
      dRank: p ? p.rank - (i + 1) : null, // positive = climbed
    };
  });
  const leadCur = cur[0]?.id ?? null;
  const leadPrev = prevInterp?.frameCompetition?.ranking?.[0]?.id ?? null;
  const material = rows.filter((r) => r.dShare === null || Math.abs(r.dShare) >= FRAME_SHIFT_PP || (r.dRank ?? 0) !== 0);
  return {
    leadChanged: !!prevInterp && leadCur !== leadPrev,
    leaderNow: aiField(cur[0] ? `${cur[0].label} (${cur[0].share}%)` : "—"),
    leaderBefore: aiField(leadPrev ? prevInterp.frameCompetition.ranking[0].label : "— (no previous month)"),
    ranking: aiField(rows),
    materialShifts: aiField(material),
  };
}

/**
 * Detect and interpret change between two months.
 * @param {{month:string, prevMonth:?string, current:object, previous:?object}} args
 *   current/previous: { canonicalFresh, ontology, interpretation }
 * @returns {{ report:object, markdown:string }}
 */
export function detectChanges({ month, prevMonth, current, previous }) {
  const isBaseline = !previous;
  const size = layerSize(current.ontology);
  const prevSize = previous ? layerSize(previous.ontology) : null;

  const report = {
    schema: "aak.change-report/1.0",
    framework: "Kwon-Soyoung v1.5",
    month,
    previousMonth: prevMonth ?? null,
    baseline: isBaseline,
    boundaryNote: "AI fields = detected findings. Human fields = significance, left empty (§12).",

    detected: {
      questions: questionDelta(current.canonicalFresh, previous?.canonicalFresh),
      concepts: conceptDelta(current.ontology, previous?.ontology),
      themeShifts: aiField(layerShift(size.themeSize, prevSize?.themeSize)),
      narrativeShifts: aiField(layerShift(size.narrSize, prevSize?.narrSize)),
      perceptionShifts: aiField(layerShift(size.percSize, prevSize?.percSize)),
      frameCompetition: frameShift(current.interpretation, previous?.interpretation),
    },

    // §4.5 — the report's significance is human-owned. These prompts are the
    // interpretation the pipeline must NOT fabricate.
    interpretation: {
      overall: significanceBlock("the month as a whole"),
      frame: significanceBlock("the frame-competition shift (§7)"),
      // top movers get their own significance slots so escalation stays per-signal
      topMovers: [], // filled below
    },
  };

  // attach per-mover significance for the largest concept shifts (bounded)
  const movers = [...report.detected.concepts.growth.value, ...report.detected.concepts.decline.value]
    .sort((a, b) => Math.abs(b.dShare) - Math.abs(a.dShare)).slice(0, 5);
  report.interpretation.topMovers = movers.map((m) => ({
    id: m.id, label: m.label, direction: m.direction, dShare: m.dShare,
    ...significanceBlock(`“${m.label}” ${m.direction} (${m.dShare >= 0 ? "+" : ""}${m.dShare}pp)`),
  }));

  assertEngineBoundary(report); // proves: findings filled, significance empty
  return { report, markdown: renderMarkdown(report) };
}

// ---- human-readable change report -------------------------------------------
function renderMarkdown(r) {
  const L = [];
  const d = r.detected;
  L.push(`# Change Report — ${r.month}${r.baseline ? " (baseline)" : ` vs ${r.previousMonth}`}`);
  L.push("");
  L.push("> Read through the Kwon Soyoung Framework v1.5. **Findings are AI-detected.**");
  L.push("> **Significance is human-owned** — every prompt below is a field a person must fill (§12).");
  L.push("");
  if (r.baseline) {
    L.push("_First month in history — no previous month to compare. This snapshot becomes the baseline._");
    L.push("");
  }

  // findings
  L.push("## Findings (AI · detection)");
  const qc = d.questions.counts.value;
  L.push(`- **Questions:** +${qc.added} new · −${qc.removed} removed · ${qc.current} in this month's collection`);
  L.push(`- **Concepts:** ${d.concepts.growth.value.length} growing · ${d.concepts.decline.value.length} declining · ${d.concepts.appeared.value.length} new · ${d.concepts.disappeared.value.length} gone`);
  if (d.concepts.appeared.value.length)
    L.push(`  - ⚠ new concepts need human labels before the site refreshes: ${d.concepts.appeared.value.map((c) => c.label).join(", ")}`);
  L.push("");

  const moverRows = [...d.concepts.growth.value, ...d.concepts.decline.value]
    .sort((a, b) => Math.abs(b.dShare) - Math.abs(a.dShare)).slice(0, 8);
  if (moverRows.length) {
    L.push("### Concept movement");
    L.push("| Concept | Δ share (pp) | Δ count | direction |");
    L.push("|---|---|---|---|");
    for (const m of moverRows) L.push(`| ${m.label} | ${m.dShare >= 0 ? "+" : ""}${m.dShare} | ${m.dCount >= 0 ? "+" : ""}${m.dCount} | ${m.direction} |`);
    L.push("");
  }

  L.push("### Frame competition (§7)");
  L.push(`- Leading frame now: **${d.frameCompetition.leaderNow.value ?? "—"}**`);
  if (!r.baseline) L.push(`- Leading frame before: ${d.frameCompetition.leaderBefore.value ?? "—"}${d.frameCompetition.leadChanged ? "  ← **lead changed**" : ""}`);
  const fr = d.frameCompetition.ranking.value;
  if (fr.length) {
    L.push("");
    L.push("| Frame (perception) | share | Δ share (pp) | Δ rank |");
    L.push("|---|---|---|---|");
    for (const f of fr) L.push(`| ${f.label} | ${f.share}% | ${f.dShare === null ? "—" : (f.dShare >= 0 ? "+" : "") + f.dShare} | ${f.dRank === null ? "—" : (f.dRank > 0 ? "▲" + f.dRank : f.dRank < 0 ? "▼" + Math.abs(f.dRank) : "–")} |`);
  }
  L.push("");
  const layer = (title, arr) => {
    if (!arr.length) return;
    L.push(`### ${title}`);
    for (const s of arr) L.push(`- ${s.label}: ${s.isNew ? "new" : `${s.prevShare}% → ${s.curShare}% (${s.dShare >= 0 ? "+" : ""}${s.dShare}pp)`}${s.membershipChanged && !s.isNew ? " · membership changed" : ""}`);
    L.push("");
  };
  layer("Theme shifts", d.themeShifts.value);
  layer("Narrative shifts", d.narrativeShifts.value);
  layer("Perception shifts", d.perceptionShifts.value);

  // significance (human-owned)
  L.push("---");
  L.push("");
  L.push("## Interpretation (Human · significance required)");
  L.push("");
  const block = (title, b) => {
    L.push(`### ${title}`);
    L.push(`- [ ] **Reveals (§5·L2):** ${b.reveals.prompt}`);
    L.push(`- [ ] **Perception gap (§7):** ${b.perceptionGap.prompt}`);
    L.push(`- [ ] **Participation (§8):** ${b.participationOpportunity.prompt}`);
    L.push(`- [ ] **Missing system (§6):** ${b.missingSystem.prompt}`);
    L.push("");
  };
  block("The month as a whole", r.interpretation.overall);
  block("Frame competition", r.interpretation.frame);
  for (const m of r.interpretation.topMovers) block(`${m.label} — ${m.direction} (${m.dShare >= 0 ? "+" : ""}${m.dShare}pp)`, m);

  return L.join("\n");
}
