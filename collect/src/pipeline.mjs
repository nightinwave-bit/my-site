// Orchestrates the Stage 100 pipeline:
//   seed expansion → collection → spam filter → raw output
//   → normalization + dedup → canonical output → report.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { LOCALES, SETTINGS, seedsForLocale } from "../config.mjs";
import { collectAutocomplete } from "./sources/autocomplete.mjs";
import { collectPAA } from "./sources/paa.mjs";
import { classify } from "./spam.mjs";
import { toCanonical } from "./dedup.mjs";
import { buildReport } from "./report.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

async function loadJSON(p) {
  return JSON.parse(await readFile(p, "utf8"));
}

export async function runPipeline({ mode, date, log = () => {} }) {
  const outDir = join(ROOT, "output");
  await mkdir(outDir, { recursive: true });

  const acFixtures = await loadJSON(join(ROOT, "fixtures", "autocomplete.json"));
  const paaFixtures = await loadJSON(join(ROOT, "fixtures", "paa.json"));
  const apiKey = process.env.SERPAPI_KEY || null;

  // ── Collect ──
  log("Collecting Google Autocomplete…");
  const ac = await collectAutocomplete({
    locales: LOCALES,
    seedsFor: seedsForLocale,
    mode,
    fixtures: acFixtures,
    log,
  });

  log("Collecting Google People Also Ask…");
  const paa = await collectPAA({
    locales: LOCALES,
    seedsFor: seedsForLocale,
    mode,
    fixtures: paaFixtures,
    apiKey,
    log,
  });

  // ── Assign stable ids + spam classification ──
  const rawAll = [...ac.records, ...paa.records].map((r, i) => {
    const id = `raw_${String(i + 1).padStart(4, "0")}`;
    const verdict = classify(r.questionText);
    return {
      id,
      ...r,
      collectionDate: date,
      status: verdict.ok ? "raw" : "quarantined",
      ...(verdict.ok ? {} : { quarantineReason: verdict.reason }),
      concept: null,
      theme: null,
      narrative: null,
      perception: null,
    };
  });

  const inScope = rawAll.filter((r) => r.status !== "quarantined");
  const quarantined = rawAll.filter((r) => r.status === "quarantined");

  // ── Normalize + dedup → canonical ──
  log("Normalizing and deduplicating…");
  const canonicals = toCanonical(inScope);

  // ── Write outputs ──
  const meta = {
    version: SETTINGS.version,
    mode,
    modeNote:
      mode === "offline"
        ? "fixtures used (live Google/SERP endpoints not reachable in this environment)"
        : ac.records.length === 0
          ? "live requested but no suggestions returned"
          : "",
    date,
    locales: LOCALES.map((l) => l.region),
    autocompleteAttempts: ac.attempted,
    paaAttempts: paa.attempted,
    paaSkippedNoKey: paa.skippedNoKey,
  };

  await writeFile(
    join(outDir, "raw_questions.json"),
    JSON.stringify({ meta, count: rawAll.length, questions: rawAll }, null, 2)
  );
  await writeFile(
    join(outDir, "canonical_questions.json"),
    JSON.stringify(
      { meta, count: canonicals.length, questions: canonicals },
      null,
      2
    )
  );
  await writeFile(
    join(outDir, "collection_report.md"),
    buildReport({ meta, rawAll, inScope, quarantined, canonicals })
  );

  return {
    raw: rawAll.length,
    inScope: inScope.length,
    quarantined: quarantined.length,
    canonical: canonicals.length,
    outDir,
  };
}
