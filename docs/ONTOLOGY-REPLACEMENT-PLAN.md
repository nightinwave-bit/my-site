# Ontology Replacement Plan — Sample → Production

_Design document. Replaces the hand-authored sample ontology in Explore /
Pathways with the data-derived ontology built from the 1,540-question recovered
dataset (`collect/output/ontology/ontology_layer.json`)._

> **This is a design, not an implementation.** No website file is modified by
> this document. It specifies exactly what would change, so the migration can be
> approved (or amended) before any code is touched. Methodology is unchanged and
> no new data is collected — this maps the ontology we already generated onto the
> site we already have.

---

## 0. The one decision that drives everything

The current site has **four** node types and treats the last one as a fused
"Narrative · Perception":

- `lib/ontology.ts` → `type NodeType = "question" | "concept" | "theme" | "narrative"`
- `lib/i18n.tsx:39` → `"type.narrative": { ko: "서사 · 인식", en: "Narrative · Perception" }`
- `components/site/force-graph.tsx` → 4 columns, narrative is the terminal navy node
- `components/site/evidence-panel.tsx:23` → `RELATED_ORDER = ["question","concept","theme","narrative"]`

The generated ontology has **five distinct layers** (5 narratives **and** 5
perceptions as separate nodes). `lib/schema.ts` already declares the fifth type
(`"perception"`), so the data model anticipates this; only the live ontology and
the graph component don't render it yet.

**Recommended: Option A — promote perception to a real 5th layer/column.** It
matches the generated data, matches `schema.ts`, and is the honest expression of
the Question→Concept→Theme→Narrative→Perception thesis the Method page already
teaches. Cost: bounded edits to 4 files (§4).

_Fallback: Option B — keep 4 columns, keep perception as the narrative's terminal
label._ Cheaper (no component change) but re-fuses two layers the data separates,
and wastes the analysis. This plan specifies **Option A**; Option B is noted where
it would differ.

---

## 1. How the new ontology maps into the existing site structure

The site consumes ontology data through a **stable read model**, by design
(`lib/schema.ts` header: "the site consumes ONLY that read model, real data can
replace the current sample data without changing any component"). The migration
therefore swaps *data*, not *plumbing*:

```
collect/output/ontology/ontology_layer.json   ← generated (source of truth)
        │  (build-time transform, new: scripts/ontology-to-site.mjs)
        ▼
lib/ontology.ts                                ← NODES, GRAPH_EDGES, PATHWAYS
   ├── buildGraph()      →  components/site/force-graph.tsx     (Explore graph)
   ├── graphNeighbors()  →  components/site/evidence-panel.tsx  (drawer)
   └── PATHWAYS[]        →  components/site/pathway-diagram.tsx  (Lines of Inquiry)
                            components/site/featured-pathways.tsx (home)
```

**Layer-by-layer mapping:**

| Generated layer (`ontology_layer.json`) | Site representation (`lib/ontology.ts`) | Renders as |
|---|---|---|
| `concepts[]` (18) | `NODES` of `type:"concept"` | concept column |
| `themes[]` (6) | `NODES` of `type:"theme"` | theme column |
| `narratives[]` (5) | `NODES` of `type:"narrative"` | narrative column |
| `perceptions[]` (5) | `NODES` of `type:"perception"` **(new)** | perception column **(new)** |
| `edges.conceptToTheme` etc. | `GRAPH_EDGES` | graph links |
| concept `exemplars[]` | node `evidence[]` + flagship question NODES | drawer + question column |
| concept `count` / `salience` / `market` | new optional node fields (§4) | node weight, drawer stats |

Questions are **not** all promoted to nodes (1,540 is far too many). Instead:
a curated set of **~11 flagship question nodes** (one per major concept, §3) seeds
the leftmost column, and every concept's remaining real questions live in its
`evidence[]` for the drawer. This is exactly the current pattern (7 flagship
questions today), scaled to the new concepts.

---

## 2. Which sample nodes will be replaced

The current sample has **7 questions, ~18 concepts, 8 themes, 6 narratives, 0
perceptions**, organized as 6 flagship pathways. Disposition of every sample
group:

### Kept & re-backed by real data (structure survives, evidence becomes real)
| Sample pathway / nodes | Fate | Backed by (new) |
|---|---|---|
| **Division & security** — `q_two_koreas, c_korean_war, c_division, c_dmz, t_cold_war, n_divided` | **KEEP** — now the single largest concept (242 q) | `c_division`, `c_history` → `t_geopolitics` → `n_division` → `p_divided` |
| **Cultural influence** — `q_kpop, c_soft_power, c_globalization, t_cultural_influence, n_superpower` | **KEEP**, restructured | `c_kpop`, `c_drama` → `t_hallyu` → `n_softpower` → `p_cultural` |
| **Technology** — `q_internet, c_infrastructure, c_semiconductors, t_digital_society, n_frontier` | **KEEP**, narrower | `c_tech` → `t_power` → `n_model` → `p_advanced` |

### Retired — not supported by observed questions (interpretive, not searched)
| Sample node(s) | Why retired |
|---|---|
| `c_confucianism`, `c_globalization`, `c_innovation_policy` | Analyst abstractions; ~nobody searches these terms. The *observed* concepts are `c_etiquette`, `c_tech` (brand/product-led), etc. |
| `c_fermentation`, `c_kimjang`, `c_unesco` | Real food questions are `korean bbq`, `kimchi jjigae`, `recipe` — consumption/curiosity, not heritage-inscription. Fold into `c_food`. |
| `c_hangul_system`, `c_script_design` + `n_inventor` ("inventor of an ideal script") | The collected language questions are **difficulty-framed** ("is korean harder than japanese"), not invention-pride. Retire the invention narrative; language now feeds `n_enigma` + `n_model`. |
| `n_tradition` ("preserver of tradition") | Food/culture in real data reads as *cultural export & aspiration*, not tradition-preservation. Replaced by `n_softpower` / `n_aspiration`. |
| `c_suneung, c_hagwon, c_meritocracy` + `n_meritocracy` | Education is a **minor** real concept (28 q). Demote from flagship pathway to a single `c_education` node under `t_language`. |

### Promoted / moved layer
| Change | Rationale |
|---|---|
| **Soft Power: concept → narrative.** Sample `c_soft_power` becomes `n_softpower`. | In the data, "soft power" is the *interpretation* of K-pop/drama/beauty questions, not a thing people search. It belongs one layer up. |
| **Korean language: sub-concept → top concept + theme.** Sample `c_korean_language` (under cultural influence) becomes `c_language` (163 q, 2nd largest) + its own `t_language` theme. | It is far too large in real data to sit under Hallyu. |

### New — no sample equivalent (must be authored)
`c_beauty` (K-Beauty, 81 q — a **major** miss in the sample), `c_people`,
`c_travel`, `c_compare`, `c_place`, `c_economy`, `c_basics`, `c_society`,
`c_etiquette` (replaces `c_confucianism` as the *observed* form).

---

## 3. Nodes that will appear in Ontology Explorer

Total graph nodes: **~11 questions + 18 concepts + 6 themes + 5 narratives + 5
perceptions ≈ 45** (vs ~30 today). The concept column already splits into two
staggered sub-columns (`force-graph.tsx:29 CONCEPT_SUBCOL`), so 18 concepts fit.

### Concepts (18) — from `ontology_layer.json.concepts`
`c_division` · `c_language` · `c_people` · `c_food` · `c_culture` · `c_travel` ·
`c_beauty` · `c_drama` · `c_compare` · `c_tech` · `c_place` · `c_economy` ·
`c_history` · `c_society` · `c_kpop` · `c_etiquette` · `c_education` · `c_basics`

> ⚠ **ID collision to resolve:** the sample already uses `c_division` (label
> "분단/Division") and the new set also uses `c_division` — same meaning, safe to
> reuse. All other new concept IDs differ from sample IDs, so no accidental
> overwrite. Namespacing recommendation: keep the generator IDs verbatim.

### Themes (6)
`t_hallyu` (The Korean Wave) · `t_language` (Learning & Understanding Korea) ·
`t_geopolitics` (Division, History & Geopolitics) · `t_society` (People, Society &
Everyday Life) · `t_visiting` (Visiting & Living in Korea) · `t_power` (Economy,
Technology & Global Standing)

### Narratives (5)
`n_softpower` · `n_aspiration` · `n_division` · `n_model` · `n_enigma`

### Perceptions (5) — **new column**
`p_cultural` (cultural powerhouse) · `p_aspirational` (aspirational modern
lifestyle) · `p_divided` (defined by division & security) · `p_advanced`
(technologically advanced / developed) · `p_enigmatic` (fascinating & hard to
grasp)

### Flagship question nodes (~11, leftmost column) — real canonicals
| Node | Question (from real exemplars) | → concept |
|---|---|---|
| `q_two_koreas` (reuse) | "korea is south or north" | `c_division` |
| `q_kor_hard` | "is korean harder than japanese" | `c_language` |
| `q_beautiful` | "why are koreans so beautiful" | `c_people` |
| `q_bbq` | "korean bbq" | `c_food` |
| `q_hanbok` | "hanbok / korean wave" | `c_culture` |
| `q_safe` | "is korea safe" | `c_travel` |
| `q_skincare` | "korean skincare" | `c_beauty` |
| `q_demon_hunters` | "why is kpop demon hunters so popular" | `c_drama` |
| `q_kpop` (reuse) | "why is kpop so popular" | `c_kpop` |
| `q_samsung` | "samsung galaxy" | `c_tech` |
| `q_expensive` | "is korea expensive" | `c_economy` |

### Shared / bridging node (preserve the graph's whole point)
`c_compare` (Regional Comparison — Japan/China) links **both** `t_geopolitics`
and `t_power`, so "korea vs japan" bridges the *divided-nation* and *tech-success*
narratives — the same cross-question mechanic `c_soft_power` provides today.

### Edges
Straight from `ontology_layer.json.edges` (`conceptToTheme`, `themeToNarrative`,
`narrativeToPerception`) + question→concept for the 11 flagships. All already in
the directed shape `GRAPH_EDGES` expects.

---

## 4. Schema changes required

Small, additive, and mostly typed already. Five files:

**1. `lib/ontology.ts` — add the 5th type + optional weight fields**
```ts
export type NodeType = "question" | "concept" | "theme" | "narrative" | "perception";

export interface OntologyNode {
  id: string;
  type: NodeType;
  label: Localized;
  blurb: Localized;
  evidence?: Evidence[];
  // NEW (optional, back-compat): real weights from ontology_layer.json
  count?: number;         // canonical questions in this concept
  salience?: number;      // summed relative salience
  markets?: Record<string, number>; // language-market distribution
}
```
Also: `TOTAL_QUESTIONS = 10930 → 1540`; `PLATFORM_COUNT = 4 → 1` (autocomplete
only; `→ 2` if a PAA run is added). Consumed by `hero.tsx:124,128`.

**2. `lib/i18n.tsx` — split the fused label**
```ts
"type.narrative": { ko: "서사", en: "Narrative" },        // was "서사 · 인식 / Narrative · Perception"
"type.perception": { ko: "인식", en: "Perception" },       // NEW
```

**3. `components/site/force-graph.tsx` — 5 columns instead of 4**
- `TARGET_X`: rebalance to 5, add `perception` (e.g. question .06, concept .30,
  theme .54, narrative .76, perception .95).
- `COLUMNS`: append `{ type: "perception", key: "type.perception" }`.
- `byType` init (`force-graph.tsx:42`): add `perception: []`.
- Per-type node styling (`:320-338`, `:359-362` legend): add a `perception`
  variant. Recommended visual: **perception** becomes the terminal filled navy
  node; **narrative** softens to an intermediate (navy outline on white). Node
  width branch (`:309`) extend to perception.

**4. `components/site/evidence-panel.tsx` — order 5 types**
- `TYPE_TAG` (`:17-20`): add `perception: "type.perception"`.
- `RELATED_ORDER` (`:23`): `[...,"narrative","perception"]`.
- Terminal-styling check (`:158 r.type === "narrative"`): include `"perception"`.

**5. `lib/schema.ts` — no change.** Already declares `"perception"` and the
`google_autocomplete`/`google_paa` platforms; the read-model types
(`GraphReadModel`/`PathwayReadModel`) already match. This file was built for this.

> **Option B delta:** if perception stays fused into narrative, files 3 & 4 are
> untouched and file 2 is unchanged; only `lib/ontology.ts` data changes. The five
> perceptions would then be encoded as the terminal narrative nodes' labels. Not
> recommended — it discards the perception layer the data supports.

**Bilingual gate:** every new concept/theme/narrative/perception label in
`ontology_layer.json` is **English-only**. Korean labels (`Localized.ko`) are
**required** before this ships — the site is Korean-default. This is a content
task, not a code task, and it blocks the migration (see §5, Phase 0).

---

## 5. Migration plan (phased, reversible)

A transform-based migration keeps the generator as the source of truth and makes
the swap auditable and revertible.

**Phase 0 — Content prerequisite (blocking).** Author Korean labels + one-line
`blurb.ko/en` for all 18 concepts, 6 themes, 5 narratives, 5 perceptions, and 11
flagship questions. Output: a reviewed `ontology_labels.json` (ko/en). Nothing
ships until this is signed off.

**Phase 1 — Transform script (no site change yet).**
`scripts/ontology-to-site.mjs` reads `ontology_layer.json` + `ontology_labels.json`
and emits a generated `lib/ontology.generated.ts` matching the current exports
(`NODES`, `GRAPH_EDGES`, `PATHWAYS`, `GRAPH_LABEL`, `buildGraph`, `graphNeighbors`,
stats). Attach top-6 `evidence[]` per concept from real exemplars. Deterministic;
re-runnable when new data lands. Diff-review the generated file against the plan.

**Phase 2 — Schema edits (§4, files 1–4).** Land the 5th type + column behind the
existing components. With sample data still in place, verify the perception column
renders empty-but-valid (no runtime breaks).

**Phase 3 — Data swap.** Point `lib/ontology.ts` at the generated data (or replace
its literals). Rebuild `PATHWAYS` as the new flagship lines of inquiry:
`n_softpower` (K-pop→…→cultural powerhouse), `n_aspiration` (skincare→…→
aspirational lifestyle), `n_division`, `n_model`, `n_enigma` — 5 pathways, each
now ending at a **perception** node.

**Phase 4 — Verify (no methodology/data change).**
- `next build` compiles clean.
- Explore graph: 5 columns, ~45 nodes, hover-dim + click-drawer work; the
  `c_compare` bridge visibly connects two themes.
- Drawer groups related nodes across all 5 types; evidence shows **real**
  questions.
- Home "Lines of Inquiry" and `/pathway/[id]` render the 5 new pathways.
- Method page prose still matches the (now 5-layer) visualization.
- Sample-notice / stat counts reflect 1,540 & real source count.
- Bilingual spot-check: KO default renders Korean labels, no English leakage.

**Phase 5 — Ship.** Single commit on `claude/ask-about-korea-site-llsd5u`.
Update `docs/ARCHITECTURE.md` to note the ontology is now data-derived.

**Rollback.** The sample ontology is preserved in git history (and can be kept as
`lib/ontology.sample.ts`); reverting is a one-file switch. The transform script
means a future re-run (e.g. after a PAA collection) regenerates the site data
without hand-editing.

---

## 6. Summary of what changes vs. what's preserved

| Preserved | Changed |
|---|---|
| Read-model contract (`buildGraph`/`graphNeighbors`/`PATHWAYS`) | Every node's identity & evidence becomes real |
| Force-graph interaction model (hover-dim, drawer) | +1 column (perception); 4→5 types |
| Shared-bridge mechanic | Bridge is now `c_compare`, not `c_soft_power` |
| 5–6 flagship pathways on home | Pathways end at explicit **perceptions** |
| Light-only, navy/blue research aesthetic | — |
| Method page thesis (Q→C→T→N→P) | Now literally rendered end-to-end |

**Net:** the site's *shape* is unchanged; its *content* goes from illustrative to
evidentiary, and the perception layer the Method page describes becomes visible
for the first time.

---

_Awaiting approval. On go-ahead, Phase 0 (Korean labels) starts first — it is the
only blocking prerequisite, and it is content, not code._
