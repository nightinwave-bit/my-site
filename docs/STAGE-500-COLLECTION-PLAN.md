# Ask About Korea — Stage 500 Live Collection Plan

**Status:** Ready to run (live) · **Version:** 0.2.0 · **Workspace:** [`../collect/`](../collect/)
**Builds on:** Stage 100 (validated), [`MVP-COLLECTION-SYSTEM.md`](./MVP-COLLECTION-SYSTEM.md),
[`../lib/schema.ts`](../lib/schema.ts)

Stage 100 validated the collect → normalize → deduplicate → canonicalize pipeline
on realistic data. Stage 500 scales it to the **first real dataset**: 500–1,000
canonical Korea questions across eight markets, in five languages. The website is
not touched; all work is in the standalone `collect/` workspace.

The eight launch markets are **US, UK, IN, SG (English), JP (Japanese), BR
(Portuguese), AE (Arabic), KR (Korean)**, set via `gl`/`hl`. The country signal is
the *question surface served to each locale* — never per-person geodata. Age and
gender remain out of scope by design.

---

## 1. Recommended seed list

Seeds are question stems and topic anchors — categories are never assumed; they
emerge later from clustering. The full set is encoded in
[`../collect/config.mjs`](../collect/config.mjs). Counts:

| Language (markets) | Autocomplete seeds | PAA seeds |
|---|---|---|
| English (US, UK, IN, SG) | 51 | 20 |
| Korean (KR) | 24 | 10 |
| Japanese (JP) | 22 | 10 |
| Portuguese (BR) | 22 | 10 |
| Arabic (AE) | 20 | 8 |

### English seed families (representative)

- **Question-word stems:** `why is korea`, `why do koreans`, `why are koreans`,
  `what is korea`, `how do koreans`, `how is korea`, `is korea`, `is korean`,
  `are koreans`, `do koreans`, `does korea`
- **Question + topic:** `is korea safe`, `is korea expensive`, `is korean hard`,
  `why is korean food`, `why is kpop`, `how to learn korean`,
  `is korea worth visiting`, `do you need a visa for korea`
- **Topic anchors:** `korean food`, `korean culture`, `korean language`,
  `korean history`, `korean drama`, `k-pop`, `korean skincare`, `korean beauty`,
  `korean fashion`, `korean etiquette`, `korean age`, `korean war`, `north korea`,
  `south korea`, `seoul`, `korean education`, `korean technology`,
  `korean economy`, `samsung`, `hanbok`, `kimchi`, `korean wave`, `korean names`,
  `korean weddings`
- **Comparative:** `korea vs japan`, `korea vs china`,
  `north korea vs south korea`, `korean vs japanese`
- **Attribute:** `koreans are`, `korea is so`, `why is korea so`,
  `korean people are`

### Other languages (samples — full lists in config)

- **Korean:** `한국은 왜`, `한국인은 왜`, `외국인이 보는 한국`, `한국 문화`, `한국 음식`,
  `케이팝`, `한국 역사`, `북한`, `한류`, `한국 나이`, `한국 예절`, `한국 vs 일본` …
- **Japanese:** `韓国 なぜ`, `韓国人は なぜ`, `韓国 文化`, `韓国 料理`, `ケーポップ`,
  `北朝鮮`, `韓国 治安`, `韓流`, `韓国 vs 日本` …
- **Portuguese:** `por que a coreia`, `cultura coreana`, `comida coreana`,
  `coreano é difícil`, `por que k-pop faz sucesso`, `coreia do norte`, `hallyu`,
  `coreia vs japão` …
- **Arabic:** `لماذا كوريا`, `الثقافة الكورية`, `الطعام الكوري`, `هل الكورية صعبة`,
  `كي بوب`, `كوريا الشمالية`, `هل كوريا آمنة`, `كوريا مقابل اليابان` …

The non-English seeds are a **starting point to refine per market** after the first
run, once autocomplete reveals each market's real phrasings.

---

## 2. Collection volume estimates

Seed-queries actually issued (seeds × the locales that run each language):

| Source | Seed-queries |
|---|---|
| Autocomplete | **292** (4×51 EN + 22 JA + 22 PT + 20 AR + 24 KO) |
| People Also Ask | **118** (4×20 EN + 10 JA + 10 PT + 8 AR + 10 KO) |

Expected raw records (assumptions stated so they can be checked against the run):

| Source | Yield / query | Raw records (est.) |
|---|---|---|
| Autocomplete | ~6–10 suggestions | ~2,000–2,900 |
| People Also Ask | ~3–4 questions | ~350–470 |
| **Total raw** | | **~2,400–3,400** |

These are estimates; the run's `collection_report.md` reports the actual funnel.

---

## 3. Expected canonical reduction

Two dynamics set the ratio:

- **English (4 markets, one language)** collapses heavily — the same suggestion
  surfaces in US/UK/IN/SG and merges into one canonical that **records all four
  markets** (the coverage signal). Expected ~4–5 : 1.
- **Non-English (one market each)** only de-duplicates within its own market, so
  the ratio is milder (~1.3–1.5 : 1). Different languages never merge lexically, so
  each adds distinct canonicals.

| Language | Raw (est.) | Ratio | Canonical (est.) |
|---|---|---|---|
| English (US/UK/IN/SG) | ~1,700–2,300 | ~4.5 : 1 | ~350–500 |
| Japanese (JP) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Portuguese (BR) | ~180–230 | ~1.4 : 1 | ~130–165 |
| Arabic (AE) | ~150–200 | ~1.4 : 1 | ~110–140 |
| Korean (KR) | ~190–250 | ~1.4 : 1 | ~135–180 |
| **Total** | ~2,400–3,400 | **~3 : 1 blended** | **~850–1,050** |

This lands the first real dataset in the **500–1,000 canonical** range (upper end
near 1,000). If a smaller first cut is preferred, run the English markets alone
(~350–500 canonical) before adding the other languages.

> The Stage 100 offline validation showed a higher 5.6 : 1 ratio only because its
> fixtures were identical across locales; live per-market variation lowers it.

---

## 4. Country comparison strategy

Comparison operates at two levels, and Stage 500 is explicit about what each
supports.

### 4.1 Within-language, cross-market (immediate, robust)

For the four English markets (US, UK, IN, SG), questions share a language, so
comparison is **direct at the question level**:

- **Coverage matrix** — which canonical questions appear in which markets
  (each canonical already stores its `countries`).
- **Emphasis** — a question's salience rank within each market.
- **Shared core vs. local tail** — questions common to all four vs. unique to one
  (e.g. India-specific "…in India", Singapore-specific comparisons).

This is produced directly from the Stage 500 output, no extra tooling.

### 4.2 Cross-language (qualitative now, aligned later)

Japanese, Portuguese, Arabic, and Korean questions do not share tokens with
English, so they do **not** merge in the lexical pipeline. Stage 500 therefore
delivers, per non-English market, a **distinct question inventory** that is
qualitatively revealing on its own — different markets foreground different
curiosity. Direct cross-language *question-level* comparison requires a pivot
step (translate to English) or **concept-level alignment**, which is the job of
the next (clustering) stage:

```
per-market questions → pivot translation / clustering → shared concepts
                     → per-market concept distribution (cross-language comparison)
```

So the strategy is: **compare English markets at the question level now; compare
all markets at the concept level after clustering.** Both are recorded against the
same `country_region` tag, so no data is lost in the interim.

### 4.3 Reporting

The run's report already includes per-region and per-language distribution and a
cross-market table. All comparisons are **relative/ordinal** — no source provides
true volume, and the country signal is the locale-served surface, not individuals.

---

## 5. Collection execution instructions

Because the sandbox that authored this repo blocks `google.com` and `serpapi.com`,
**the live run must be executed on an ordinary network** (e.g. a local machine).
The committed `collect/output/` is the offline validation; the commands below
produce the real dataset in the identical format.

### Prerequisites

- Node ≥ 18 (built-in `fetch`); no install step — the workspace has zero
  dependencies.
- Optional: a **SerpApi** key for People Also Ask. The free tier (250 searches/mo)
  covers all **118** PAA seed-queries, so **Stage 500 costs ≈ $0**. Without a key,
  autocomplete still runs (also free) and PAA is skipped.

### Run

```bash
cd collect

# Autocomplete only (free, no key needed):
node run.mjs --mode live

# Full run incl. People Also Ask:
SERPAPI_KEY=your_key node run.mjs --mode live

# Auto: probe live, fall back to offline fixtures if unreachable:
node run.mjs
```

### What to expect

- **Runtime:** ~292 autocomplete queries (400 ms politeness delay) ≈ 2–3 min;
  ~118 PAA queries ≈ 3–6 min with API latency. Total under ~10 minutes.
- **Politeness:** built-in delays; the unofficial autocomplete endpoint is
  unsupported — do not remove the throttle or loop aggressively.
- **Staged option:** to validate live access cheaply first, trim `LOCALES` in
  `config.mjs` to `US` only, run, confirm results, then restore all eight.

### Inspect the outputs (`collect/output/`)

- `collection_report.md` — funnel, per-source / per-region / per-language
  distribution, top canonical questions, cross-market table, quarantine audit.
- `raw_questions.json` — every record with source, region, language, rank, method,
  provenance, status.
- `canonical_questions.json` — canonical questions with variants, coverage,
  salience; each lists `variantIds` for full traceability.

Sanity checks after a live run: quarantine should be near-zero (mostly commercial/
gibberish); every region should have records; the English markets should show many
cross-market canonicals; non-English markets should show distinct inventories.

### Reproducibility

- Pin the collection date with `AAK_DATE=YYYY-MM-DD`.
- Offline mode is deterministic; live results vary with the live surfaces.
- Every merge is auditable via `variantIds`.

---

## Notes carried from validation

Two false-positive quarantines were caught and fixed during Stage 100/500 bring-up
(a Korean and a Japanese inter-Korea question with no explicit "Korea" token). The
classifier now inherits topical relevance from the Korea-centric **seed context**,
so contextually-Korean follow-ups are retained while genuine drift is still
quarantined. This is exactly the kind of correction a staged, transparent pipeline
is meant to surface before scaling.

Known limitation to revisit at the clustering stage: Japanese, Portuguese, and
Arabic tokenization is lightweight (space-splitting), sufficient for collection and
exact/near-duplicate merging but not for cross-language alignment — which is why
cross-language comparison is deferred to concept-level clustering with a pivot
translation.
