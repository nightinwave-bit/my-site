# Ask About Korea — Production Ontology Proposal

_Generated from the recovered multilingual dataset · `collect/output/canonical_questions.json`_
_Run: `stage-500/0.3.0-utf8fix`, mode `live`, 2026-07-15 · generator: `collect/ontology.mjs`_

> **Status:** analysis artifact. This proposal is written to be a drop-in
> replacement for the current sample ontology in the website's Explore mode,
> **but no website file has been changed.** Replacement is a separate,
> explicitly-approved step (see §10).

---

## 1. Executive summary

This is the **first ontology built entirely from real collected data**, and the
first built from a **fully multilingual** corpus. The previous draft was
generated before the encoding fix, when Korean and Arabic had collapsed to ~13
canonical questions each; those two markets are now fully represented.

- **1,540 canonical questions** across **7 language-markets**.
- **18 emergent concepts** cover **97.9%** of the corpus (33 questions / 2.1%
  unclustered — down from ~29% in the pre-recovery draft).
- Concepts roll up into **6 themes → 5 narratives → 5 perceptions**.
- The world's questions about Korea resolve to five stable perceptions:
  a **cultural powerhouse**, an **aspirational modern lifestyle**, a
  **divided nation living with security risk**, a **technological/developed
  success story**, and a country that is **fascinating and hard to fully grasp**.

The headline structural finding: **division and language-difficulty are the two
single largest concepts** (15.7% and 10.6%) — bigger than any single Hallyu
concept — but when concepts are grouped, **the Korean Wave is the largest theme**
(~459 questions). The world asks about K-culture in many specific ways, and about
the two Koreas in one big way.

---

## 2. Dataset provenance

| Property | Value |
|---|---|
| Canonical questions | 1,540 |
| Raw collected | 2,193 |
| Quarantined | 14 (0.6%) |
| Mode | live (Google Autocomplete; PAA skipped — no API key) |
| Language-markets | 7 |

**Language distribution (independent signal):**

| Lang | Market | Questions |
|---|---|---|
| en | US + IN | 449 |
| ko | KR | 210 |
| ja | JP | 200 |
| de | DE | 187 |
| id | ID | 179 |
| pt | BR | 172 |
| ar | AE | 143 |

> **Methodological caveat used throughout this document.** The US and IN locales
> share one English seed set, so every English canonical is served to *both*
> markets and their raw country tallies are structurally identical. The honest
> unit of independent evidence is therefore the **language-market** (7 of them,
> with English = "US+IN"), **not** the 8 countries. All specificity analysis in
> §9 is computed on language-markets; raw country tallies are retained in the
> JSON as `countryTally` but flagged, not used as independent evidence.

---

## 3. Method — how the concepts emerged

Concepts were **discovered**, not imposed:

1. **Tokenized** every canonical question per language, stripped stopwords, and
   ranked content tokens by frequency across all 7 languages.
2. Recurring tokens that **translated across markets** became concept candidates
   (e.g. `food / essen / makanan / 음식 / 料理 / comida / الطعام` → one Cuisine
   concept). Tokens that appeared in only one market became candidate
   market-signatures (§9).
3. Each concept is defined by a **transparent, multilingual anchor list**
   (substring match, priority-ordered) — no black-box embeddings, so every
   assignment is auditable. See `collect/ontology.mjs`.
4. Iterated anchors until unclustered fell below ~3%. Two candidate concepts
   (learning-materials/access; sports/football) were **folded**, not kept: each
   held only ~10 questions and was cross-cutting (see §5 note).

The theme / narrative / perception layers above the concepts are **interpretive**
— they are the editorial argument about what the questions *mean*, and are the
part a human reviewer should scrutinise most.

---

## 4. Concepts (18) — the empirical layer

Ordered by size. "Market skew" names the language-market most over-represented
in that concept relative to its size (the concept's _signature_).

| # | Concept | n | % | Present in | Market skew |
|---|---|---|---|---|---|
| 1 | **North–South Division & Two Koreas** | 242 | 15.7 | 7/7 | BR, AE, ID |
| 2 | **Korean Language & Its Difficulty** | 163 | 10.6 | 7/7 | **DE (strong)** |
| 3 | **Korean People & National Character** | 143 | 9.3 | 6/7 | US+IN, KR |
| 4 | **Korean Cuisine** | 140 | 9.1 | 7/7 | broad |
| 5 | **Culture, Tradition & Heritage** | 127 | 8.2 | 7/7 | KR, JP |
| 6 | **Travel & Safety** | 100 | 6.5 | 7/7 | US+IN, JP |
| 7 | **K-Beauty, Skincare & Fashion** | 81 | 5.3 | 5/7 | ID, BR, AE |
| 8 | **K-Drama & Screen Stories** | 77 | 5.0 | 7/7 | broad |
| 9 | **Regional Comparison (Japan/China)** | 67 | 4.4 | 6/7 | US+IN, JP |
| 10 | **Technology & Brands** | 62 | 4.0 | 7/7 | broad |
| 11 | **Seoul, Places & Climate** | 61 | 4.0 | 7/7 | broad |
| 12 | **Economy, Money & Cost** | 52 | 3.4 | 6/7 | US+IN, KR |
| 13 | **History** | 39 | 2.5 | 7/7 | KR, JP |
| 14 | **Society, Religion & Daily Life** | 38 | 2.5 | 6/7 | US+IN |
| 15 | **K-Pop & Idols** | 34 | 2.2 | 5/7 | **JP** |
| 16 | **Etiquette & Social Norms** | 31 | 2.0 | 3/7 | US+IN, KR, JP |
| 17 | **Education & Study** | 28 | 1.8 | 3/7 | US+IN, JP, KR |
| 18 | **Country Basics & Identity** | 22 | 1.4 | 5/7 | **ID** |
| — | _(unclustered)_ | 33 | 2.1 | — | — |

**Representative questions (multilingual) per top concept:**

- **Division & Two Koreas** — `korea is south or north` (en) · `por que a coreia
  foi dividida` (pt) · `한국은 왜 분단되었나` (ko) · `north korea vs south korea
  football` (en). North Korea's absence from the World Cup and inter-Korea
  comparison both live here.
- **Language & Difficulty** — `is korean harder than japanese` (en) ·
  `هل اللغة الكورية صعبة` (ar, "is Korean hard") · `koreanisch schwer` (de) ·
  `한국어 배우기` (ko). The defining frame is *difficulty*, not just learning.
- **Korean People & National Character** — `are koreans tall` · `why are koreans
  so beautiful` · `외국인이 보는 한국인 특징` (ko, "traits of Koreans as foreigners
  see them") · `why do koreans use metal chopsticks`.
- **Cuisine** — `kimchi jjigae` (de) · `한국 음식 추천` (ko) · `الطعام الكوري`
  (ar) · `korean bbq`.
- **Culture & Heritage** — `hanbok rental seoul` (de) · `한복` (ko) · `韓服` (ja)
  · `korean wave`. Korea's own market (KR) and Japan lead this concept.
- **K-Beauty** — `korean skincare` · `منتجات العناية بالبشرة الكورية` (ar) ·
  `skincare korea` (id) · `beleza coreana` (pt). Note the absence of DE/JP/KR.
- **K-Pop & Idols** — `why is kpop so popular` · `케이팝` (ko) · Japan leads.
- **K-Drama** — `k-pop demon hunters` and `why is kpop demon hunters so popular`
  (the 2025 animated film) surface strongly alongside `korean drama 2026`.

Full exemplars, per-language counts, and market distributions are in
`ontology_layer.json`.

---

## 5. Themes (6) — grouping concepts

Themes are many-to-many over concepts (a concept may inform more than one theme;
`c_compare` feeds both Geopolitics and Global-Standing).

| Theme | ~n | Concepts |
|---|---|---|
| **The Korean Wave (Hallyu)** | ~459 | K-Pop, K-Drama, K-Beauty, Cuisine, Culture |
| **Division, History & Geopolitics** | ~348 | Division, History, Regional Comparison |
| **People, Society & Everyday Life** | ~234 | People, Etiquette, Society/Religion, Basics |
| **Visiting & Living in Korea** | ~213 | Travel & Safety, Places/Climate, Economy |
| **Learning & Understanding Korea** | ~191 | Language, Education |
| **Economy, Technology & Global Standing** | ~181 | Technology, Economy, Regional Comparison |

> **Note on the two folded facets.** _Learning-materials/access_ (`pdf`, `مترجمة`,
> `번역`, subtitles — ~10 q, heavily Arabic/Korean) and _Sports/football rivalry_
> (`copa`, `korea vs japan football` — ~11 q, heavily Portuguese) are real but too
> small and too cross-cutting to be top-level concepts here. Their questions
> already resolve into Language/Culture and Comparison/Division respectively.
> Both are **candidate concepts for promotion** once the corpus grows (Stage
> 1000+), particularly access-materials for the Arabic market.

---

## 6. Narratives (5) — what the questions collectively say

| Narrative | Built from themes |
|---|---|
| **Korea as a global cultural force** | Hallyu + Global-Standing |
| **Korea as an aspirational lifestyle & beauty model** | Hallyu + Visiting + Society |
| **Korea as a divided nation living with risk** | Geopolitics |
| **Korea as a development & technology success story** | Global-Standing + Learning + Geopolitics |
| **Korea as distinctive and intriguing** | Learning + Society + Visiting |

The fifth narrative ("distinctive and intriguing") is the **curiosity residue** —
the "why is Korea so ___" questions, language-difficulty, metal chopsticks,
etiquette. It is the affective engine behind much of the rest.

---

## 7. Perceptions (5) — the distilled positions

| Perception | From narrative |
|---|---|
| **Korea as a cultural powerhouse** | global cultural force |
| **Korea as an aspirational, modern lifestyle** | aspirational lifestyle & beauty |
| **Korea as a nation defined by division & security** | divided nation |
| **Korea as a technologically advanced, developed nation** | development success story |
| **Korea as fascinating and hard to fully grasp** | distinctive & intriguing |

---

## 8. Full structure — Question → Concept → Theme → Narrative → Perception

Three worked pathways (each starts from a real canonical question):

**Pathway A — Soft power**
```
"why is kpop so popular" (en, KR-JP-US)
  → K-Pop & Idols
    → The Korean Wave (Hallyu)
      → Korea as a global cultural force
        → Korea as a cultural powerhouse
```

**Pathway B — Aspiration**
```
"منتجات العناية بالبشرة الكورية" / "korean skincare" (ar, id, pt, en)
  → K-Beauty, Skincare & Fashion
    → The Korean Wave (Hallyu)
      → Korea as an aspirational lifestyle & beauty model
        → Korea as an aspirational, modern lifestyle
```

**Pathway C — Division**
```
"por que a coreia foi dividida" / "korea is south or north" (pt, en, ar, id …)
  → North–South Division & Two Koreas
    → Division, History & Geopolitics
      → Korea as a divided nation living with risk
        → Korea as a nation defined by division & security
```

**Shared-node structure** (the property Explore mode visualises): the
**Regional Comparison (Japan/China)** concept is deliberately shared between the
Geopolitics theme and the Global-Standing theme, so "korea vs japan" bridges the
*divided-nation* and *tech-success* narratives — exactly the cross-question
relationship the graph is meant to reveal. Edge lists (`conceptToTheme`,
`themeToNarrative`, `narrativeToPerception`) are in `ontology_layer.json`.

---

## 9. Country-specific vs cross-country concepts

Computed on the 7 independent language-markets (§2 caveat).

**Cross-market (the shared global core — present in ≥5 of 7 markets, no single
market dominant):** Division, Cuisine, Culture, Technology, Places, History,
K-Drama, and (broadly) Travel. **Every market asks about the two Koreas and about
Korean food.** These are the concepts an Explore graph should render as the dense,
central, universally-connected core.

**Market signatures (real skews worth surfacing in the UI):**

| Signature | Market(s) | Reading |
|---|---|---|
| **Language *difficulty*** | **DE** (71 of 163) | German-market curiosity fixates on "is Korean hard" more than any other market. |
| **The two Koreas** | **BR, AE, ID** (58/47/46) | Global-South markets drive division questions hardest — geopolitics as the entry point to Korea. |
| **K-Beauty** | **ID, BR, AE** (absent in DE/JP) | K-beauty is an *export-market* curiosity; neighbours and Europe barely ask. |
| **Culture / Heritage** | **KR, JP** (28/27) | Koreans themselves and their nearest neighbour ask most about tradition & heritage. |
| **K-Pop** | **JP** (top market) | Japan over-indexes on idols relative to concept size. |
| **Foundational "what is Korea"** | **ID** | Indonesia asks the most first-contact, identity-level questions — a newer-to-Korea audience. |

> No concept is *exclusive* to one market — the algorithm found zero
> "market-specific" concepts under conservative thresholds, which is the honest
> result. The signal is **skew**, not exclusivity, and the table above reports
> skew.

---

## 10. Relationship to the current sample ontology (replacement plan)

The website's Explore mode currently ships a **hand-authored sample ontology**
(`lib/ontology.ts`) built around 6 flagship pathways and a Soft-Power shared node.
This proposal keeps that *shape* but replaces the *content* with data-derived
nodes.

**What maps cleanly (keep):**
- Soft-Power / cultural-powerhouse pathway → now backed by real K-Pop, K-Drama,
  Cuisine, Culture concepts and the Hallyu theme.
- A division/security pathway → now the single largest concept, well-evidenced.
- The shared-node mechanic → preserved via the Regional-Comparison bridge (§8).

**What is new / changed:**
- **K-Beauty** becomes a first-class concept (was implicit) — it is 5.3% of all
  questions and has the clearest market signature.
- **Language difficulty** becomes a first-class concept and narrative input — a
  major, previously-underweighted driver.
- Perceptions expand from the sample's implied set to **five explicit
  perceptions**, adding "aspirational modern lifestyle" and "fascinating & hard to
  grasp."
- Every node can now carry **real counts, salience, and market distribution** —
  the Explore evidence drawer can show *actual* questions per node instead of
  illustrative samples.

**Proposed replacement steps (deferred until you approve):**
1. Add a data-mapping layer that reads `ontology_layer.json` into the site's
   `Node`/`Edge` types in `lib/ontology.ts` (concept→theme→narrative→perception
   edges already match the site's typed model).
2. Attach real exemplar questions to each node for the evidence drawer.
3. Add bilingual (ko/en) labels — English concept labels here need Korean
   counterparts before they ship.
4. Re-verify `next build` and Explore-mode interactions unchanged.

---

## 11. Limitations & next steps

- **Autocomplete-only.** PAA was skipped (no API key). Adding PAA will deepen
  long-tail concepts (Education, Society) and may promote the folded facets.
- **Lexical clustering.** Anchors are transparent but literal; a production
  embedding pass would catch paraphrases the substring anchors miss (part of the
  2.1% unclustered).
- **English = two markets.** Until US and IN get distinct seed sets, they cannot
  be separated. Independent India-specific seeds are the highest-value next
  collection change.
- **Korean labels pending.** All concept/theme/narrative/perception labels are
  English here; bilingual labels are required before any website replacement.
- **Salience is relative.** Frequency indicators rank within this corpus; they
  are not true search volume.

**Recommended next action:** review this proposal. If the concept/theme/narrative/
perception structure is right, the next step is the mapping layer in §10 step 1 —
which _is_ a website change and will only begin on your explicit go-ahead.

---

_Machine-readable ontology: `collect/output/ontology/ontology_layer.json`_
_Generator (auditable anchors): `collect/ontology.mjs`_
