# Ask About Korea — Monthly Research Pipeline

The operational automation layer. Once a month it collects new questions,
regrows the ontology, runs the Kwon Soyoung reasoning engine, detects and
**interprets** change through the framework, drafts the four research outputs,
and preserves every artifact as a versioned snapshot.

It **orchestrates existing tools** — it redesigns none of them:

```
collect/run.mjs        collect new Google Autocomplete questions
      │                merge into the accumulated dataset
      ▼
collect/ontology.mjs   regenerate ontology_layer.json
      │                (self-gating) refresh the site: labels.mjs → scripts/ontology-to-site.mjs
      ▼
reasoning/engine.mjs   interpret(ontology) — findings only, significance human-owned
reasoning/generate.mjs research manifest (4 rungs)
      │
      ▼
pipeline/change-detection.mjs   month-over-month change, read through the framework
pipeline/versioning.mjs         snapshot everything to pipeline/history/<YYYY-MM>/
```

The constitution (`docs/Kwon-Soyoung-Framework-v1.5.md`), the architecture
(`reasoning/architecture.mjs`) and the engine (`reasoning/engine.mjs`) are the
authoritative interpretation system. The pipeline never bypasses them and never
produces a generic trend report: every dataset passes through
Question → Concept → Theme → Narrative → Perception → Meaning → Participation →
System → New Questions.

---

## Files

| File | Role |
|---|---|
| `run-monthly.mjs` | Orchestrator. Runs the full monthly sequence end to end. |
| `change-detection.mjs` | Framework-guided change: AI detects deltas; the four interpretation questions stay human-owned (§12). |
| `versioning.mjs` | Historical versioning — per-month snapshots + a registry for longitudinal comparison. |
| `history/` | Versioned output. One immutable directory per month, plus `index.json`. |

## Run it

```bash
# real monthly run (tries live collection, falls back to offline fixtures)
node pipeline/run-monthly.mjs

# deterministic offline run
AAK_COLLECT_MODE=offline node pipeline/run-monthly.mjs

# baseline / backfill of the existing dataset with no new collection
AAK_DATE=2026-07-15 AAK_COLLECT_MODE=skip node pipeline/run-monthly.mjs
```

### Configuration (env)

| Var | Default | Meaning |
|---|---|---|
| `AAK_DATE` | today | `YYYY-MM-DD`; its month is the run's version key |
| `AAK_COLLECT_MODE` | `auto` | `auto` \| `offline` \| `live` \| `skip` (skip = no collection) |
| `AAK_APPLY_SITE` | `1` | Regenerate `lib/ontology.generated.ts`. Self-gates: only when every node has a human bilingual label |
| `AAK_HISTORY_DIR` | `pipeline/history` | Where snapshots are written |
| `SERPAPI_KEY` | — | Optional; enables live People-Also-Ask in collection |

---

## What each monthly run produces

`pipeline/history/<YYYY-MM>/`

| Artifact | Contents |
|---|---|
| `meta.json` | Version metadata: date, previous month, counts, leading frame, significance owed |
| `fresh/raw_questions.json` | This month's raw collection snapshot |
| `fresh/canonical_questions.json` | This month's fresh canonical set (drives new/removed detection) |
| `dataset/canonical_accumulated.json` | The merged all-time working dataset (drives the ontology) |
| `ontology/ontology_layer.json` | Ontology regenerated this month |
| `reasoning/interpretation.json` | Engine output — findings + empty human significance fields |
| `reasoning/research-manifest.json` | Per-rung research readiness |
| `change-report.json` / `.md` | Change vs the previous month, read through the framework |
| `research-drafts/*.md` | Four drafts: Data Report, Diplomacy Brief, Framework Implications, Question Commons Implications |

`pipeline/history/index.json` is the registry: one row per month with headline
metrics (accumulated questions, concepts, leading frame, significance owed), so
month-to-month and longitudinal comparison need no re-computation.

### Two clocks, by design

- **Question-level new/removed** compares this month's *fresh collection* to last
  month's fresh collection — what the world started and stopped asking.
- **Concept / theme / narrative / perception / frame shifts** compare this
  month's *accumulated* ontology to last month's — how the structure of
  perception moves as curiosity accumulates. Decline shows up as **share**
  decline even when raw counts only ever grow.

---

## Framework-guided interpretation (§4.5)

Change detection is not a trend report. Every material change carries the four
framework questions as **empty, human-owned fields**:

- **What does it reveal?** — meaning (§5·L2)
- **What perception gap does it expose?** — (§7)
- **What participation opportunity emerges?** — (§8)
- **What missing system does it imply?** — (§6)

The pipeline applies the Five-Layer Model, the Escalation Ladder, the
Question-to-System principle, the Frame Competition principle, the Participation
principle, the Question Circulation principle, and the Human–AI boundary to
every future dataset.

## The Human–AI boundary (§12) — preserved end to end

The pipeline **may** collect, cluster, summarize, detect patterns, detect
change, and generate findings. It **may not** assign significance, meaning,
implications, policy recommendations, civic priorities, or system priorities.

This is enforced, not promised: `change-detection.mjs` and `engine.mjs` build
every value as an authored field and call `assertEngineBoundary()`, which throws
if any human-owned field was filled by the machine. A boundary breach fails the
run. Research drafts ship findings filled and significance as `[ ]` prompts. The
site refresh self-gates on human-authored bilingual labels: new concepts never
reach the public site until a person has labeled them.

## Automatic execution

`.github/workflows/monthly-research.yml` runs the pipeline on the 1st of each
month (and on demand), then commits the new snapshot when artifacts change.
Collection falls back to offline fixtures if live endpoints are unreachable, so
the scheduled run stays green.

---

*Offline and analysis-only, like `collect/`. It does not run `next build` and
changes the public site only through the self-gating, label-guarded refresh.*
