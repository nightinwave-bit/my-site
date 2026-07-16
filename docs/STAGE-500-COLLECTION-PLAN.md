# Ask About Korea — Stage 500 Live Collection Plan

**Status:** Ready to run (live) · **Version:** 0.3.0 · **Workspace:** [`../collect/`](../collect/)
**Builds on:** Stage 100 (validated), [`MVP-COLLECTION-SYSTEM.md`](./MVP-COLLECTION-SYSTEM.md),
[`../lib/schema.ts`](../lib/schema.ts)

Stage 100 validated the collect → normalize → deduplicate → canonicalize pipeline
on realistic data. Stage 500 scales it to the **first real dataset**: 500–1,000+
canonical Korea questions across eight markets in seven languages. The website is
not touched; all work is in the standalone `collect/` workspace.

The country signal is the *question surface served to each locale*, set via
`gl`/`hl` — never per-person geodata. Age and gender remain out of scope by design.

---

## Representative region set

The launch set prioritizes **global information-environment representation over
language balancing or comparability**: one information-active market per world
region, with East Asia doubled because Korea is the subject.

| Region | Market | `gl` / `hl` | Language | Rationale |
|---|---|---|---|---|
| North America | **US** | us / en | en | largest Anglophone information market |
| Europe | **DE** | de / de | **de** | largest EU market; continental, non-English curiosity |
| South Asia | **IN** | in / en | en | large, information-active, rising Hallyu (Hindi a later add) |
| Southeast Asia | **ID** | id / id | **id** | largest SEA population; exceptional Hallyu engagement |
| East Asia | **JP** | jp / ja | ja | Korea's most information-engaged neighbour; distinct curiosity |
| East Asia | **KR** | kr / ko | ko | domestic self-perception baseline |
| Latin America | **BR** | br / pt | pt | largest LatAm market; very high K-content engagement |
| Middle East | **AE** | ae / ar | ar | Arabic-language hub for the region |

**Deliberate trade-offs of this set** (chosen consciously):

- Only **US ↔ IN** share a language (English), so direct *question-level*
  cross-market comparison is limited to that pair; all other comparison is
  cross-language, at the concept level after clustering (§4). This is the accepted
  cost of representation over comparability.
- Six single-language markets add tokenization/translation debt to be paid down at
  the clustering stage.
- **Known blind spots:** China is unreachable via Google (Baidu-dominant);
  Spanish-speaking Latin America (Mexico) and Sub-Saharan Africa are not yet
  covered — natural Stage-1000 additions.

---

## 1. Recommended seed list

Seeds are question stems and topic anchors — categories are never assumed; they
emerge from clustering. The full set is in [`../collect/config.mjs`](../collect/config.mjs).

| Language (markets) | Autocomplete seeds | PAA seeds |
|---|---|---|
| English (US, IN) | 51 | 20 |
| German (DE) | 22 | 10 |
| Indonesian (ID) | 22 | 10 |
| Japanese (JP) | 22 | 10 |
| Portuguese (BR) | 22 | 10 |
| Arabic (AE) | 20 | 8 |
| Korean (KR) | 24 | 10 |

### English seed families (representative)

- **Question-word:** `why is korea`, `why do koreans`, `why are koreans`,
  `what is korea`, `how do koreans`, `is korea`, `is korean`, `are koreans`,
  `do koreans`, `does korea`
- **Question + topic:** `is korea safe`, `is korea expensive`, `is korean hard`,
  `why is korean food`, `why is kpop`, `how to learn korean`,
  `is korea worth visiting`, `do you need a visa for korea`
- **Topic anchors:** `korean food`, `korean culture`, `korean language`,
  `korean history`, `korean drama`, `k-pop`, `korean skincare`, `korean beauty`,
  `korean etiquette`, `korean age`, `korean war`, `north korea`, `south korea`,
  `seoul`, `korean education`, `samsung`, `hanbok`, `kimchi`, `korean wave` …
- **Comparative / attribute:** `korea vs japan`, `korea vs china`,
  `north korea vs south korea`, `koreans are`, `why is korea so`

### Other languages (samples — full lists in config)

- **German:** `warum ist korea`, `warum sind koreaner`, `koreanische kultur`,
  `koreanisches essen`, `warum ist k-pop so beliebt`, `nordkorea`, `südkorea`,
  `hanbok`, `korea vs japan` …
- **Indonesian:** `kenapa korea`, `kenapa orang korea`, `budaya korea`,
  `makanan korea`, `kenapa k-pop populer`, `korea utara`, `skincare korea`,
  `korea vs jepang` …
- **Japanese:** `韓国 なぜ`, `韓国 文化`, `ケーポップ`, `北朝鮮`, `韓流`, `韓国 vs 日本` …
- **Portuguese:** `por que a coreia`, `cultura coreana`, `por que k-pop faz sucesso`,
  `coreia do norte`, `hallyu` …
- **Arabic:** `لماذا كوريا`, `الثقافة الكورية`, `كي بوب`, `كوريا الشمالية`,
  `هل كوريا آمنة` …

Non-English seeds are a **starting point to refine per market** after the first run
reveals each market's real phrasings.

---

## 2. Collection volume estimates

Seed-queries actually issued (seeds × the locales that run each language):

| Source | Seed-queries |
|---|---|
| Autocomplete | **234** (2×51 EN + 22 DE + 22 ID + 22 JA + 22 PT + 20 AR + 24 KO) |
| People Also Ask | **98** (2×20 EN + 10 DE + 10 ID + 10 JA + 10 PT + 8 AR + 10 KO) |

Expected raw records (assumptions stated so they can be checked against the run):

| Source | Yield / query | Raw records (est.) |
|---|---|---|
| Autocomplete | ~6–10 suggestions | ~1,400–2,300 |
| People Also Ask | ~3–4 questions | ~290–390 |
| **Total raw** | | **~1,700–2,700** |

The run's `collection_report.md` reports the actual funnel.

---

## 3. Expected canonical reduction

- **English (US + IN, 2 markets)** collapses across those two markets and across
  overlapping seeds (~2.5–3 : 1). A shared canonical records both markets — the
  coverage signal.
- **Each single-language market** de-duplicates only within itself (~1.3–1.5 : 1).
  Different languages never merge lexically, so each adds distinct canonicals.

| Language | Raw (est.) | Ratio | Canonical (est.) |
|---|---|---|---|
| English (US, IN) | ~800–1,000 | ~2.7 : 1 | ~250–370 |
| German (DE) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Indonesian (ID) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Japanese (JP) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Portuguese (BR) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Arabic (AE) | ~150–200 | ~1.4 : 1 | ~110–140 |
| Korean (KR) | ~190–250 | ~1.4 : 1 | ~135–180 |
| **Total** | ~1,700–2,700 | **~2 : 1 blended** | **~900–1,200** |

This lands the first real dataset comfortably in — and likely above — the target
**500–1,000 canonical** range. For a smaller first cut, run English + two languages
first (~500–650 canonical), then add the rest.

> Fewer shared-language markets than the earlier draft (2 English vs 4) lowers the
> blended ratio: less cross-market collapse, more distinct global coverage — the
> point of this region set.

---

## 4. Country comparison strategy

### 4.1 Within-language, cross-market (immediate)

Only **US ↔ IN** share a language, so direct question-level cross-market comparison
covers that pair: coverage matrix, salience-rank differences, and shared-core vs.
India-specific tail. Produced directly from the output; no extra tooling.

### 4.2 Cross-language (the primary mode for this set)

Because the set is optimized for global representation, most comparison is
cross-language. German, Indonesian, Japanese, Portuguese, Arabic, and Korean
questions do not share tokens with each other or with English, so they do **not**
merge in the lexical pipeline. Stage 500 therefore delivers, per market, a
**distinct question inventory** — qualitatively revealing on its own (each market
foregrounds different curiosity). Direct cross-language comparison happens at the
**concept level after clustering**, with a pivot-English translation:

```
per-market question inventories → pivot translation / clustering
   → shared concepts → per-market concept distribution (the comparison)
```

The strategy is therefore: **compare US↔IN at the question level now; compare all
eight markets at the concept level after clustering.** Every record is tagged with
`country_region`, so nothing is lost in the interim. All comparisons are
relative/ordinal — no source provides true volume.

### 4.3 Reporting

The run report already includes per-region and per-language distribution and a
cross-market table.

---

## 5. Collection execution instructions

The sandbox that authored this repo blocks `google.com` and `serpapi.com`, so **the
live run must be executed on an ordinary network**. The committed `collect/output/`
is the offline validation; the commands below produce the real dataset in the
identical format.

### Prerequisites

- Node ≥ 18 (built-in `fetch`); no install step — zero dependencies.
- Optional **SerpApi** key for People Also Ask. The free tier (250 searches/mo)
  covers all **98** PAA seed-queries, so **Stage 500 costs ≈ $0**. Without a key,
  autocomplete still runs (free) and PAA is skipped.

### Run

```bash
cd collect

# Autocomplete only (free, no key):
node run.mjs --mode live

# Full run incl. People Also Ask:
SERPAPI_KEY=your_key node run.mjs --mode live

# Auto: probe live, fall back to offline fixtures if unreachable:
node run.mjs
```

### What to expect

- **Runtime:** ~234 autocomplete queries (400 ms delay) ≈ 2–3 min; ~98 PAA queries
  ≈ 3–5 min with API latency. Under ~10 minutes total.
- **Politeness:** built-in delays; the unofficial autocomplete endpoint is
  unsupported — do not remove the throttle or loop aggressively.
- **Staged option:** trim `LOCALES` in `config.mjs` to `US` only, run, confirm live
  access, then restore all eight.

### Inspect the outputs (`collect/output/`)

- `collection_report.md` — funnel, per-source / per-region / per-language
  distribution, top canonical questions, cross-market table, quarantine audit.
- `raw_questions.json` — every record with source, region, language, rank, method,
  provenance, status.
- `canonical_questions.json` — canonical questions with variants, coverage,
  salience; each lists `variantIds` for full traceability.

Sanity checks after a live run: quarantine near-zero (mostly commercial/gibberish);
every region has records; US and IN show cross-market canonicals; the six
single-language markets show distinct inventories.

### Reproducibility

- Pin the collection date with `AAK_DATE=YYYY-MM-DD`.
- Offline mode is deterministic; live results vary with the live surfaces.
- Every merge is auditable via `variantIds`.

---

## Notes carried from validation

- Two false-positive quarantines were caught and fixed during bring-up (a Korean
  and a Japanese inter-Korea question with no explicit "Korea" token). The
  classifier now inherits topical relevance from the Korea-centric **seed context**,
  so contextually-Korean follow-ups are retained while genuine drift is still
  quarantined. German and Indonesian are covered by the same `korea`-substring token
  and seed-context rule.
- Non-Latin and Latin non-English tokenization is lightweight (space-splitting) —
  sufficient for collection and exact/near-duplicate merging, but cross-language
  comparison is deferred to concept-level clustering with pivot translation.
- The offline validation of this set produced 0 quarantines and canonical questions
  across all seven languages, with German and Indonesian cross-source merges
  confirmed.
