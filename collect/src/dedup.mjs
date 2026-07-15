// Exact + near-duplicate merging → canonical questions.
// Two-level reduction, matching the methodology:
//   1. exact merge   — identical normalized text (collapses cross-locale copies)
//   2. near-dup merge — same content-token signature OR Jaccard ≥ threshold
// Every merge is auditable: a canonical lists its variant records.

import {
  normalizeText,
  contentTokens,
  intentSignature,
  isQuestionForm,
  detectLanguage,
  jaccard,
} from "./normalize.mjs";
import { SETTINGS } from "../config.mjs";

// Union-Find
function makeUF(n) {
  const p = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) p[ra] = rb;
  };
  return { find, union };
}

/** @param {object[]} records in-scope raw records (already spam-filtered) */
export function toCanonical(records) {
  // ── Level 1: exact merge by normalized text ──
  const exactGroups = new Map(); // normText -> {rows, tokens, lang, sig}
  for (const r of records) {
    const key = normalizeText(r.questionText);
    if (!exactGroups.has(key)) {
      const lang = detectLanguage(r.questionText);
      exactGroups.set(key, {
        norm: key,
        rows: [],
        lang,
        tokens: contentTokens(r.questionText, lang),
        sig: intentSignature(r.questionText, lang),
      });
    }
    exactGroups.get(key).rows.push(r);
  }
  const groups = Array.from(exactGroups.values());

  // ── Level 2: near-dup merge (signature equality OR high Jaccard) ──
  const uf = makeUF(groups.length);
  const bySig = new Map();
  groups.forEach((g, i) => {
    if (g.sig) {
      if (bySig.has(g.sig)) uf.union(i, bySig.get(g.sig));
      else bySig.set(g.sig, i);
    }
  });
  // Jaccard pass (same language only) — O(n^2) is fine at Stage 100 scale.
  for (let i = 0; i < groups.length; i++) {
    for (let j = i + 1; j < groups.length; j++) {
      if (groups[i].lang !== groups[j].lang) continue;
      if (uf.find(i) === uf.find(j)) continue;
      if (jaccard(groups[i].tokens, groups[j].tokens) >= SETTINGS.nearDupJaccard) {
        uf.union(i, j);
      }
    }
  }

  // ── Assemble canonical clusters ──
  const clusters = new Map(); // root -> group[]
  groups.forEach((g, i) => {
    const root = uf.find(i);
    if (!clusters.has(root)) clusters.set(root, []);
    clusters.get(root).push(g);
  });

  const canonicals = [];
  let n = 0;
  for (const groupList of clusters.values()) {
    const rows = groupList.flatMap((g) => g.rows);
    const variantTexts = Array.from(new Set(rows.map((r) => r.questionText)));
    const countries = Array.from(new Set(rows.map((r) => r.countryRegion))).sort();
    const sources = Array.from(new Set(rows.map((r) => r.sourcePlatform))).sort();
    const languages = Array.from(new Set(rows.map((r) => r.language))).sort();
    const canonicalText = pickCanonical(variantTexts);

    canonicals.push({
      id: `canon_${String(++n).padStart(4, "0")}`,
      canonicalText,
      language: detectLanguage(canonicalText),
      variantTexts,
      variantIds: rows.map((r) => r.id),
      countries,
      sources,
      languages,
      coverage: {
        countries: countries.length,
        sources: sources.length,
        variants: variantTexts.length,
        records: rows.length,
      },
      frequencyIndicator: salience({ countries, sources, variantTexts, rows }),
      status: "canonical",
    });
  }

  // Highest salience first.
  canonicals.sort((a, b) => b.frequencyIndicator - a.frequencyIndicator);
  return canonicals;
}

/** Prefer a question-form, then a shorter, representative phrasing. */
function pickCanonical(variants) {
  const scored = variants.map((v) => ({
    v,
    q: isQuestionForm(v) ? 1 : 0,
    len: v.length,
  }));
  scored.sort((a, b) => b.q - a.q || a.len - b.len);
  return scored[0].v;
}

/**
 * Composite relative salience (0–1). Transparent, documented weighting:
 *   40% market breadth · 30% source breadth · 20% variants · 10% best rank.
 * Never an absolute volume.
 */
function salience({ countries, sources, variantTexts, rows }) {
  const bestScore = Math.max(0, ...rows.map((r) => r.frequencyIndicator ?? 0));
  const s =
    0.4 * (countries.length / 7) +
    0.3 * (sources.length / 2) +
    0.2 * Math.min(1, variantTexts.length / 5) +
    0.1 * bestScore;
  return Math.round(s * 1000) / 1000;
}
