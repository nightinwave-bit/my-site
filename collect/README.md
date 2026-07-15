# `collect/` — Ask About Korea Question Collection Workspace (Stage 100)

A **standalone** workspace for collecting real Korea-related questions from Google
Autocomplete and Google People Also Ask. It is completely separate from the
website: plain Node ESM, **zero runtime dependencies**, nothing here is imported by
the Next.js app, and running it never touches the site.

It implements Stage 100 of [`../docs/MVP-COLLECTION-SYSTEM.md`](../docs/MVP-COLLECTION-SYSTEM.md):
seed expansion → collection → normalization → deduplication → canonical questions.

## Run

```bash
cd collect
node run.mjs                 # auto: try live, fall back to offline fixtures
node run.mjs --mode offline  # deterministic; uses fixtures/ (no network)
node run.mjs --mode live      # live Autocomplete (+ PAA if SERPAPI_KEY set)
SERPAPI_KEY=xxxx node run.mjs --mode live   # enable live People Also Ask
```

Requires Node ≥ 18 (uses built-in `fetch`). Outputs are written to `output/`.

## Live vs offline

| Mode | Autocomplete | People Also Ask | Determinism |
|---|---|---|---|
| **live** | unofficial Google suggestions endpoint (free) | SERP API — needs `SERPAPI_KEY` | depends on live results |
| **offline** | `fixtures/autocomplete.json` | `fixtures/paa.json` | fully deterministic |

> **The committed `output/` was produced in _offline_ mode.** The sandbox used to
> author this project routes outbound traffic through a policy proxy that blocks
> `google.com` and `serpapi.com`, so live collection is not possible there. On any
> ordinary network the same command runs live and writes real results in the same
> format. The fixtures are **illustrative sample data**, not live captures, and are
> labeled as such in each file.

## Sources / locales

- **Sources:** Google Autocomplete, Google People Also Ask (Reddit is deferred to a
  later stage per the MVP plan).
- **Locales (Stage 500):** one information-active market per world region —
  US (en), DE (de), IN (en), ID (id), JP (ja), BR (pt), AE (ar), KR (ko) — set via
  `gl`/`hl`. The country signal is the *question surface served to each locale*, not
  per-person geodata. Age/gender are out of scope by design. See
  [`../docs/STAGE-500-COLLECTION-PLAN.md`](../docs/STAGE-500-COLLECTION-PLAN.md).

## Outputs

| File | Contents |
|---|---|
| `output/raw_questions.json` | every collected record, with source, region, language, rank, method, provenance, and `status` (`raw` or `quarantined`) |
| `output/canonical_questions.json` | deduplicated canonical questions, each with variants, market/source coverage, and relative salience |
| `output/collection_report.md` | funnel, distribution, top questions, cross-market examples, quarantine audit, reproducibility notes |

## Layout

```
collect/
  run.mjs               CLI entry
  config.mjs            locales, seeds, thresholds
  fixtures/             illustrative sample responses (offline mode)
  src/
    seeds are in config.mjs
    sources/autocomplete.mjs   live + offline
    sources/paa.mjs            live + offline
    normalize.mjs        text normalization + intent signatures
    spam.mjs             quarantine rules
    dedup.mjs            exact + near-duplicate merge → canonical
    report.mjs           collection_report.md generator
    pipeline.mjs         orchestration
  output/               generated artifacts (committed)
```

## Design notes

- **Transparency:** every canonical question lists the `variantIds` it merged, so
  each decision is traceable. Near-duplicate merging is lexical (content-token
  signature + Jaccard) rather than a black-box model; production may swap in
  embeddings without changing the interfaces.
- **Reproducibility:** offline mode is deterministic. Set `AAK_DATE=YYYY-MM-DD` to
  pin the collection date.
- **Schema fit:** records mirror `RawQuestion` / `Question` in
  [`../lib/schema.ts`](../lib/schema.ts); canonical output maps onto the
  `question` layer of the ontology. Concept/theme/narrative/perception fields are
  present but null — clustering is the next stage.
