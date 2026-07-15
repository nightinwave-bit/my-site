// Google Autocomplete source.
//  - live:    unofficial suggestions endpoint (localizable via gl/hl), free.
//  - offline: reads fixtures/autocomplete.json (illustrative sample).
// Emits normalized raw records (schema: RawQuestion in ../lib/schema.ts).

import { SETTINGS } from "../../config.mjs";

const ENDPOINT = "https://suggestqueries.google.com/complete/search";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Encoding-safe JSON read. The Google suggest endpoint can return Latin-1 /
 * Windows-1252 bytes; `res.json()` force-decodes as UTF-8, which corrupts
 * accents (é→�) and mangles Korean/Arabic into gibberish that then gets
 * quarantined. We read the raw bytes, decode as UTF-8, and fall back to
 * Windows-1252 if replacement characters appear.
 */
export async function readSuggestJson(res) {
  const buf = new Uint8Array(await res.arrayBuffer());
  let text = new TextDecoder("utf-8").decode(buf);
  if (text.includes("�")) {
    try {
      text = new TextDecoder("windows-1252").decode(buf);
    } catch {
      /* keep utf-8 attempt */
    }
  }
  return JSON.parse(text);
}

/** Live fetch of suggestions for one seed in one locale. Returns string[]. */
async function fetchLive(seed, locale) {
  const url =
    `${ENDPOINT}?client=firefox&ie=UTF-8&oe=UTF-8` +
    `&hl=${encodeURIComponent(locale.hl)}` +
    `&gl=${encodeURIComponent(locale.gl)}&q=${encodeURIComponent(seed)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SETTINGS.requestTimeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "AskAboutKorea-Research/0.1 (collection pilot)" },
    });
    if (!res.ok) return [];
    const data = await readSuggestJson(res); // [query, [suggestions...], ...]
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/** Offline: expand fixture base + locale-specific extras. */
function fetchFixture(fixtures, seed, locale) {
  const entry = fixtures?.seeds?.[seed];
  if (!entry) return [];
  const base = entry.base ?? [];
  const extra = entry.byLocale?.[locale.region] ?? [];
  return [...base, ...extra];
}

/**
 * @returns {Promise<{records: object[], attempted: number}>}
 */
export async function collectAutocomplete({ locales, seedsFor, mode, fixtures, log }) {
  const records = [];
  let attempted = 0;
  for (const locale of locales) {
    const seeds = seedsFor(locale, "autocomplete");
    for (const seed of seeds) {
      attempted++;
      let suggestions;
      if (mode === "live") {
        suggestions = await fetchLive(seed.text, locale);
        await sleep(SETTINGS.autocompletePoliteDelayMs);
      } else {
        suggestions = fetchFixture(fixtures, seed.text, locale);
      }
      suggestions.forEach((text, rank) => {
        records.push({
          questionText: text,
          sourcePlatform: "autocomplete",
          countryRegion: locale.region,
          language: locale.language,
          rank,
          frequencyIndicator: rankToScore(rank, suggestions.length),
          collectionMethod:
            `autocomplete:seed='${seed.text}':gl=${locale.gl}:hl=${locale.hl}`,
          provenance: {
            seed: seed.text,
            family: seed.family,
            gl: locale.gl,
            hl: locale.hl,
          },
        });
      });
      log?.(`  autocomplete ${locale.region} "${seed.text}" → ${suggestions.length}`);
    }
  }
  return { records, attempted };
}

// Higher position (lower rank index) → higher relative indicator.
function rankToScore(rank, total) {
  if (!total) return 0;
  return Math.round(((total - rank) / total) * 100) / 100;
}

export { fetchLive as _fetchLiveAutocomplete };
