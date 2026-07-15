# Research Section — Implementation Blueprint

_Final. The four-page architecture is fixed: **Data Report · Diplomacy Brief ·
Framework Paper · Question Commons.** This document defines how it is built —
pages, hierarchy, navigation, the Explore→Research bridge, per-page content, and
the deduplication rules — nothing is redesigned or added._

---

## 0. The governing principle: the ladder is the dedup engine

The four pages are not four takes on the same material. They are **four rungs of
one ascending ladder**, each answering a different question at a higher altitude
than the last. A page is **forbidden the altitude below it** — and that rule is
what prevents duplication structurally.

| Rung | Page | Question | Altitude | May NOT do |
|---|---|---|---|---|
| — | **Explore** (existing) | *what is the structure?* | raw ontology, interactive | — |
| 1 | **Data Report** | *what is there?* | description / findings | interpret, prescribe |
| 2 | **Diplomacy Brief** | *so what?* | interpretation / meaning | re-describe patterns |
| 3 | **Framework Paper** | *now what?* | institutional models | re-interpret |
| 4 | **Question Commons** | *what if?* | ecosystem design | re-argue frameworks |

Reading order = ladder order. Explore is the on-ramp; the four Research pages are
the climb.

---

## 1. Page definitions

| Page | Route | One-line | Primary audience |
|---|---|---|---|
| **Research (index)** | `/research` | The hub: what the research is, the ladder, and the dataset it stands on. | Any arriving reader |
| **Data Report** | `/research/data-report` | Twenty findings from 1,540 questions — the descriptive layer, with charts and the market-signature heatmap. | Analysts, journalists, the curious |
| **Diplomacy Brief** | `/research/diplomacy-brief` | What the patterns *mean* for Korea's image — six concept dossiers read through a public-diplomacy lens. | Policy / diplomacy readers |
| **Framework Paper** | `/research/framework-paper` | Six new institutional architectures the evidence demands, and the composed system. | Strategists, institution-builders |
| **Question Commons** | `/research/question-commons` | One question-centered ecosystem: how a question circulates through society. | Ecosystem / civic designers |

---

## 2. Page hierarchy

```
/research  (index — hub)
├── /research/data-report        (rung 1 · description)
├── /research/diplomacy-brief    (rung 2 · interpretation)
├── /research/framework-paper    (rung 3 · institutions)
└── /research/question-commons   (rung 4 · ecosystem)
```

- **Depth:** exactly two levels — index + four leaves. No sub-pages, no tabs.
- **Order is canonical** everywhere (nav, index cards, prev/next): Report →
  Brief → Framework → Commons. It encodes the abstraction ladder, so it never
  re-sorts.
- The index is a **hub, not a wrapper**: it does not contain the pages, it routes
  to them and carries the shared framing (§7 dedup).

---

## 3. Route & file map (Next.js App Router)

```
app/research/page.tsx                     → <ResearchIndex/>
app/research/data-report/page.tsx         → <ResearchDoc doc="data-report"/>
app/research/diplomacy-brief/page.tsx     → <ResearchDoc doc="diplomacy-brief"/>
app/research/framework-paper/page.tsx     → <ResearchDoc doc="framework-paper"/>
app/research/question-commons/page.tsx    → <ResearchDoc doc="question-commons"/>

components/site/research-index.tsx        → hub view
components/site/research-doc.tsx          → shared doc shell (chrome, breadcrumb, prev/next, byline)
components/site/research/                  → one content component per page
  data-report.tsx  ·  diplomacy-brief.tsx  ·  framework-paper.tsx  ·  question-commons.tsx
lib/research.ts                           → ordered manifest (id, route, titles ko/en, altitude, question, accent)
```

Each page ports its artifact's **content** into a bilingual React component that
renders inside the shared `Navbar` / `Footer` and the `ResearchDoc` shell. The
artifacts' distinct visual identities are preserved as a **single per-page accent
token** (see §8), on the site's shared light ground and Pretendard typography —
this is integration, not redesign.

---

## 4. Navigation flow

**Global nav** — add one entry to `components/site/navbar.tsx::LINKS`, keeping the
ladder position (Explore → Research → Method):

```
Pathways · Explore · Research · Method
```
New i18n key: `"nav.research": { ko: "리서치", en: "Research" }` → `/research`.

**Within Research:**
- **Index → page:** four cards in ladder order; each card shows rung number,
  the page's *question* (§0), one-line, accent, and “Read →”.
- **Page → page:** every doc has a persistent footer pager —
  `← Previous rung · [name]` and `Next rung · [name] →` — walking the ladder;
  ends at Commons (no next) and Report (no previous).
- **Breadcrumb:** `Research / [page title]` at the top of every doc, the crumb
  linking to `/research`.
- **Return:** doc breadcrumb + index are the only ways back up; no deep cross-links
  between sibling docs except the pager (keeps the ladder legible).

---

## 5. Explore → Research bridge

Explore is the **map** (structure you manipulate); Research is the **territory's
explanation** (prose you read). Three one-directional hooks connect them, plus one
return path:

1. **End-of-Explore hand-off band.** At the bottom of `/explore`, after the graph,
   a single CTA band: *“You've seen how the questions connect. Read what it means →
   Research.”* → `/research`. This is the primary bridge.
2. **Evidence-drawer deep link.** In `evidence-panel.tsx`, add one contextual link
   per node type, routing to the rung that owns that node's meaning:
   - **perception / narrative** node → **Diplomacy Brief** (the interpretation)
   - **concept** node → **Data Report** (the finding) — anchored to that concept
   - Label: *“Read the interpretation →” / “See the finding →”.*
3. **Provenance strip micro-link.** The `ProvenanceStrip` (already atop `/explore`)
   gains a trailing *“Full analysis → Research”* link.

**Return path (Research → Explore):** each doc's intro carries one link — *“Open
the interactive map →”* → `/explore` — so a reader can drop from prose back into
structure. No other back-links, to avoid a link maze.

---

## 6. Content per page (final, post-dedup)

Sections listed are what each page **keeps**. Struck items are removed and
re-homed per §7.

**`/research` — Index**
- Hero: what the Research is + the four-rung ladder (visual list of the four
  questions).
- **The one canonical `ProvenanceStrip`** (dataset stats live here for the whole
  section).
- Four doc cards in ladder order.
- One line: *“How we collected this → Method.”*
- The Explore↔Research relationship sentence.

**1 · Data Report** — _description only_
- Masthead + ~~provenance line~~ (→ index).
- Executive summary + the Narrative→Perception table _(the one place the model is
  tabulated)._
- Dominant concepts — bar chart + findings 01–04.
- Dominant narratives — theme bars + findings 05–07.
- Country differences — market-signature heatmap + findings 08–11.
- Language differences — language bars + market-top table + findings 12–15.
- Surprising findings — K-beauty bars + verbatim table + findings 16–18.
- ~~Implications 19–20~~ → **replaced by a one-line bridge** to the Diplomacy
  Brief (implications are rung 2). Report ends at description.
- ~~Method & limits footer~~ (→ Method link).

**2 · Diplomacy Brief** — _interpretation only_
- Masthead (attention-vs-comprehension thesis — **owned here**).
- Central argument.
- Six concept dossiers: misread → why → assumption → perception gap → implications
  (5 domains) → the move.
- Synthesis (“seven partial Koreas”).
- ~~provenance / method note~~ (→ index / Method). Findings are **cited, not
  re-described** (one clause each, no re-tabulation).

**3 · Framework Paper** — _institutions only_
- Masthead.
- Premise (three falsified assumptions) — the “attention outran comprehension”
  claim is **cited from the Brief in one line**, not re-argued.
- Six framework spec-cards (structural problem · larger problem · framework ·
  institution · evidence). Evidence cells **cite** Data Report numbers.
- Composed-architecture schematic.
- Conclusion.
- ~~provenance / limits~~ (→ index / Method).

**4 · Question Commons** — _ecosystem only_
- Masthead + reframe (boundary object).
- Circulation diagram (9 stages, AI hub).
- Nine stage cards.
- Four dynamics + feedback loops.
- Commons → six new forms.
- Close (the spiral).
- ~~provenance / limits~~ (→ index / Method).

---

## 7. Deduplication matrix

Every element that recurs across pages has **one canonical home**; everywhere else
references it. This is the concrete removal list.

| Shared element | Canonical home | Everywhere else does |
|---|---|---|
| Dataset stats (2,193 / 1,540 / 7 / 8 / Autocomplete / date) | **`/research` index** `ProvenanceStrip` (also home + `/explore`) | slim one-line byline linking to index — **no repeated strip** |
| Collection method & limits (salience-relative, US+IN shared) | **`/method`** | single *“Method & limits →”* link — **no restated footer** |
| Q → C → T → N → P model | **`/method` + `/explore`** | assumed; **Data Report** tabulates the N→P row once |
| The five perceptions (labels + definitions) | **Data Report** (+ `/explore` graph) | referenced **by name** only |
| Concept sizes & the 20 findings | **Data Report** | cited as evidence, **never re-charted/re-listed** |
| “Attention outran comprehension” thesis | **Diplomacy Brief** | one-line citation |
| Six institutional models | **Framework Paper** | — |
| The circulation ecosystem | **Question Commons** | — |
| Global chrome (nav, footer, language switch, provenance component) | **shared site components** | imported, never re-implemented per page |

**Governance:** the altitude rule (§0) is the standing dedup policy — if a page
finds itself describing (rung 1), interpreting (rung 2), or institutionalizing
(rung 3) below its own rung, that content moves down to its canonical page and is
replaced by a citation.

---

## 8. Shared components & integration rules

- **Chrome:** every research route renders `Navbar` + `Footer` + `LanguageSwitch`;
  none re-implements them.
- **Provenance:** reuse the existing `ProvenanceStrip`; it appears **once**, on the
  index.
- **Per-page identity (not a redesign):** each page keeps a single **accent token**
  as its signature, applied on the site's shared light ground + Pretendard type:
  Data Report → institutional blue (site default) · Diplomacy Brief → celadon ·
  Framework Paper → ochre/gold · Question Commons → jade-green. Stored in
  `lib/research.ts` and set as a CSS variable on the doc root.
- **Charts/diagrams:** the Report's charts, the Framework schematic, and the
  Commons circulation ring port as self-contained components (SVG/CSS), inheriting
  the page accent.
- **i18n / bilingual (prerequisite gate):** the four documents are currently
  English-only. Korean is **required before launch** (the site is Korean-default),
  authored the same way as the ontology's Phase 0 — a content task that **blocks**
  the section going live.
- **SEO/meta:** each route sets `generateMetadata` with the bilingual title +
  one-line; the index lists the four in JSON-LD as an article series.

---

## 9. Build sequence

1. **Manifest + routes** — `lib/research.ts`, the five `app/research/**` routes,
   and the `ResearchDoc` shell (breadcrumb, pager, byline).
2. **Nav** — add `nav.research` and the navbar link.
3. **Index** — hub with the ladder, the single `ProvenanceStrip`, four cards.
4. **Port content** — four content components from the artifacts, applying the §6
   section lists and §7 removals (this is where dedup is enforced).
5. **Explore bridge** — the end-of-Explore band, evidence-drawer deep links, and
   the return link (§5).
6. **Korean content pass** — bilingual authoring (the blocking gate).
7. **Verify** — `next build`; nav reaches all five; ladder pager walks correctly;
   no dataset strip or method/limits block appears on any leaf page; Explore→Brief
   / Explore→Report deep links resolve; ko/en both render.

---

_This blueprint changes no code; it specifies the section to be built. The
architecture (four pages, one ladder) is treated as final._
