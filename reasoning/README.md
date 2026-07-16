# Ask About Korea — Interpretation Engine

The **operational interpretation layer** of Ask About Korea: the executable
form of the approved reasoning architecture.

This layer does not restate the framework and does not redesign it. It turns
the *approved Reasoning Architecture* into code that any future dataset can be
passed through. Two things are kept strictly separate:

| Layer | Status | Location |
|---|---|---|
| **Constitution** | source of authority — never executed, never edited for convenience | [`docs/Kwon-Soyoung-Framework-v1.5.md`](../docs/Kwon-Soyoung-Framework-v1.5.md) |
| **Reasoning Architecture** | the approved four-layer thinking model | encoded in `architecture.mjs` |
| **Interpretation Engine** | the executable layer (this directory) | `reasoning/*.mjs` |

Every field the engine produces cites the section (`§`) of the constitution it
implements. The constitution governs the architecture; the architecture governs
the engine. Nothing flows the other way.

---

## 1. Implementation architecture

The engine mirrors the four stacked layers of the approved architecture, plus
the two cross-cutting forces (the Human–AI cut and the return arrow).

```
CONSTITUTION  docs/Kwon-Soyoung-Framework-v1.5.md      (authority, not code)
      │  reverse-engineered into ↓
ARCHITECTURE  architecture.mjs                          (approved, encoded as data)
      │  executed by ↓
┌─────────────────────────────────────────────────────────────────────┐
│  ENGINE                                                              │
│                                                                     │
│  L1 UNIT       ingest ontology; the subject is curiosity      §2    │
│      ↓                                                              │
│  L2 LENSES     five reading rules — engine fills `detect`     §4    │
│      ↓         only; `judge` stays human-owned                      │
│  L3 ESCALATE   ladder scaffold (L1 detected, L2–L5 empty);    §5    │
│      ↓         persistence → Question-to-System;              §6    │
│                frame competition across the dataset           §7    │
│  L4 GENERATE   three-output gate (empty); research manifest;  §13   │
│      ↓         circulation candidates                         §9    │
│  ↻ RETURN      new-question prompts re-enter L1               §14   │
│                                                                     │
│  ⟂ HUMAN–AI BOUNDARY enforced at every field                  §12   │
└─────────────────────────────────────────────────────────────────────┘
      │  writes ↓
ARTIFACTS  reasoning/output/{interpretation.json,
           research-manifest.json, human-worksheet.md}
```

### Files

| File | Role | Implements |
|---|---|---|
| `architecture.mjs` | Executable spec of the approved architecture — layers, lenses, ladder, gates, rung map. The engine's single source of truth. | the whole architecture |
| `boundary.mjs` | Human–AI boundary primitives: `aiField` / `humanField`, and `assertEngineBoundary` which throws on any AI-authored significance. | §12 |
| `engine.mjs` | The reasoning engine. `interpret(ontology)` → interpretation records. Detection only. | L1–L4 |
| `generate.mjs` | Research output generation. `generateResearch(run)` → per-rung manifest. | §13, §14 |
| `run.mjs` | CLI. Loads a dataset, runs the engine, asserts the boundary, writes artifacts. | dataset pass-through |
| `output/` | Generated artifacts. A snapshot is committed for reference; fully reproducible via `npm run reason`. | — |

This layer is **offline and analysis-only**, exactly like `collect/`. It never
imports from or is imported by the website; it does not touch the Next.js build.

---

## 2. The reasoning engine

`interpret(ontology)` produces one **interpretation record** per subject
(currently: each empirical concept in the ontology). A record is a tree of
*fields*, and every field is tagged with its rightful author:

- **AI-owned fields** (`author: "ai"`) are filled by the engine. They are
  detection: volume, salience, market spread, the observed pattern, the
  concept→theme→narrative→perception relationship map, persistence, and the
  literal exemplar question. These map exactly to the AI competencies the
  constitution names in §12 (clustering, pattern detection, summarization,
  visualization).
- **Human-owned fields** (`author: "human"`) are emitted **empty**, each
  carrying the prompt a person must answer. They are significance: the `judge`
  half of every lens, escalation levels L2–L5, the missing system, the three
  outputs, and the new questions.

Because the ladder's floor is Level 4 (§5) and levels 2–5 are human-owned,
**every record the engine emits is deliberately "below the floor."** The engine
cannot complete an analysis; it can only prepare one. Lifting a record above
Level 4 is a human act, by design.

Dataset-level detections the engine also computes:

- **Frame competition (§7):** ranks perceptions by share of attention and
  reports which frame currently leads — the "which frame is winning?" question,
  answered at the level of measurement. The *interpretation* of that contest is
  left human.
- **Circulation candidates (§9/§14):** surfaces unclustered questions and
  thin-coverage concepts as gap signals. Authoring the new questions is human.

---

## 3. How a future dataset passes through

```bash
# default input: collect/output/ontology/ontology_layer.json
node reasoning/run.mjs

# or any ontology_layer.json produced by the collection pipeline
node reasoning/run.mjs path/to/ontology_layer.json
```

The runner:

1. **loads** the ontology dataset (the output of `collect/` → `scripts/`),
2. **passes** it through `interpret()` — detection + human scaffolds,
3. **asserts** the Human–AI boundary on every record (a violation throws),
4. **generates** the research manifest, and
5. **writes** three artifacts to `reasoning/output/`.

Any dataset in the ontology-layer shape (concepts / themes / narratives /
perceptions / edges) can be passed through unchanged. New collection runs flow
in without touching the engine — the architecture is fixed, the data is not.

### Artifacts

| Artifact | What it is |
|---|---|
| `interpretation.json` | The full record set: every AI detection + every empty human prompt, with authorship and significance debt. |
| `research-manifest.json` | Per-rung readiness. Rung 1 ships a body; Rungs 2–4 report exactly how much human significance they still owe. |
| `human-worksheet.md` | The operational handoff — a checklist of every significance field a human must fill, grouped by subject, with the AI detection shown for context. |

---

## 4. How research outputs are generated

The escalation ladder maps onto the four **existing** research rungs
(`lib/research.ts`) — no new research architecture is invented (§13):

| Rung | Research doc | Ladder / gate source | Machine-ready? |
|---|---|---|---|
| 1 · Description — *What is there?* | `data-report` | L1 observation + provenance + frame ranking | **Yes** — built from AI detection |
| 2 · Interpretation — *So what?* | `diplomacy-brief` | L2 meaning + L3 gap + lens judgments | No — awaits human significance |
| 3 · Institutions — *Now what?* | `framework-paper` | L4 strategic + L5 system + system output | No — awaits human design |
| 4 · Ecosystem — *What if?* | `question-commons` | participation output + circulation | No — awaits human design |

`generateResearch(run)` assembles Rung 1 in full and reports, for each higher
rung, the number of human fields still outstanding. This is how the reasoning
layer *feeds* the research layer: description is generated; interpretation and
design are prepared, then written by people. "Analysis without design remains
incomplete" (§13) is encoded as a readiness gate, not a slogan.

---

## 5. How the Human–AI boundary is preserved

The boundary (§12) is not a convention here — it is an enforced invariant.

- **Construction.** Every value is a typed field. `aiField()` produces filled
  detection; `humanField()` produces an empty, prompted significance slot. The
  engine has no code path that writes a value into a human field.
- **Assertion.** `assertEngineBoundary(record)` walks the whole record tree and
  throws if *any* human-owned field is filled, or if any AI-owned field was left
  empty. The engine calls it on every record it emits, so a boundary breach
  fails the run instead of shipping silently.
- **Accounting.** `significanceDebt(record)` reports how many human fields remain
  unanswered, so "how much of this is still the machine's opinion vs. a human's
  judgment?" is always a number, per record and per rung.
- **Merge-back.** When a person answers the worksheet, `humanAnswer()` marks the
  field filled and records who filled it — so provenance survives into the
  research outputs.

The engine can say *what changed*. Only a human can say *why it matters*. This
layer makes that line executable.

---

*Constitution: `docs/Kwon-Soyoung-Framework-v1.5.md` · Architecture version: 1.0*
