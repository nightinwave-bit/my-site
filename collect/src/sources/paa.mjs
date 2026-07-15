// Google People Also Ask source.
//  - live:    SerpApi (engine=google, related_questions). Requires SERPAPI_KEY.
//  - offline: reads fixtures/paa.json (illustrative sample).
// Emits normalized raw records (schema: RawQuestion in ../lib/schema.ts).

import { SETTINGS } from "../../config.mjs";

const SERPAPI = "https://serpapi.com/search.json";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Live fetch of PAA for one seed in one locale. Returns {q,url}[]. */
async function fetchLive(seed, locale, apiKey) {
  const url =
    `${SERPAPI}?engine=google&q=${encodeURIComponent(seed)}` +
    `&gl=${encodeURIComponent(locale.gl)}&hl=${encodeURIComponent(locale.hl)}` +
    `&api_key=${encodeURIComponent(apiKey)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SETTINGS.requestTimeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return [];
    const data = await res.json();
    const rq = Array.isArray(data?.related_questions) ? data.related_questions : [];
    return rq
      .map((r) => ({ q: r.question, url: r.link }))
      .filter((r) => r.q);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function fetchFixture(fixtures, seed, locale) {
  const entry = fixtures?.seeds?.[seed];
  if (!entry) return [];
  const base = entry.base ?? [];
  const extra = entry.byLocale?.[locale.region] ?? [];
  return [...base, ...extra];
}

/**
 * @returns {Promise<{records: object[], attempted: number, skippedNoKey: boolean}>}
 */
export async function collectPAA({ locales, seedsFor, mode, fixtures, apiKey, log }) {
  const records = [];
  let attempted = 0;
  let skippedNoKey = false;

  if (mode === "live" && !apiKey) {
    skippedNoKey = true; // PAA needs a key; autocomplete can still run live.
    return { records, attempted, skippedNoKey };
  }

  for (const locale of locales) {
    const seeds = seedsFor(locale, "paa");
    for (const seed of seeds) {
      attempted++;
      let items;
      if (mode === "live") {
        items = await fetchLive(seed.text, locale, apiKey);
        await sleep(SETTINGS.paaPoliteDelayMs);
      } else {
        items = fetchFixture(fixtures, seed.text, locale);
      }
      items.forEach((it, rank) => {
        records.push({
          questionText: it.q,
          sourcePlatform: "paa",
          countryRegion: locale.region,
          language: locale.language,
          rank,
          frequencyIndicator: rankToScore(rank, items.length),
          collectionMethod:
            `paa:seed='${seed.text}':gl=${locale.gl}:hl=${locale.hl}`,
          provenance: {
            seed: seed.text,
            family: seed.family,
            gl: locale.gl,
            hl: locale.hl,
            sourceUrl: it.url ?? null,
          },
        });
      });
      log?.(`  paa ${locale.region} "${seed.text}" → ${items.length}`);
    }
  }
  return { records, attempted, skippedNoKey };
}

function rankToScore(rank, total) {
  if (!total) return 0;
  return Math.round(((total - rank) / total) * 100) / 100;
}
