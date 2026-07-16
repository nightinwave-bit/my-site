# Ontology Migration Report — Sample → Production

_Production migration executed. The website's Explore graph and Pathways now run
on the real ontology derived from the 1,540-question collected dataset._

---

## 1. What changed

The live site no longer uses the hand-authored sample ontology. It is now driven
by `lib/ontology.generated.ts`, produced by `scripts/ontology-to-site.mjs` from
`collect/output/ontology/{ontology_layer.json, ontology_labels.json}`.

`lib/ontology.ts` keeps all the types + helpers (`buildGraph`, `graphNeighbors`,
`getNode`, `getPathway`, `PLATFORM_LABEL`) and now sources its DATA (`NODES`,
`GRAPH_EDGES`, `PATHWAYS`, `GRAPH_LABEL`, `TOTAL_QUESTIONS`, `PLATFORM_COUNT`)
from the generated module. No consumer imports changed.

### Files changed in the swap
| File | Change |
|---|---|
| `lib/ontology.ts` | Data now re-exported from `ontology.generated.ts`; sample literals + verb lexicon removed; types/helpers kept |
| `lib/i18n.tsx` | `type.narrative` split from the fused "Narrative · Perception" to just "Narrative"; `type.perception` active |
| `components/site/pathway-view.tsx` | Terminal card labelled by the node's actual type (now Perception), not hardcoded Narrative |
| `components/site/method-view.tsx` | Example pathway repointed from the retired `food-heritage` to `cultural-force` |

Rendering support for the 5th layer (force-graph columns, node-chip, evidence
panel) was already in place from the previous step.

---

## 2. Final ontology structure

| Metric | Value |
|---|---|
| Total nodes | **52** — 18 questions · 18 concepts · 6 themes · 5 narratives · 5 perceptions |
| Total edges | **55** — q→c 18, c→t 20, t→n 12, n→p 5 |
| Total pathways | **5** — `cultural-force`, `aspiration`, `division`, `tech-success`, `enigma` |
| Corpus | 1,540 canonical questions (7 language-markets) |

**Narrative → Perception (1:1):**

| Narrative | Perception |
|---|---|
| 세계적 문화 강국으로서의 한국 / Korea as a global cultural force | 문화 강국, 한국 / Cultural powerhouse |
| 동경의 라이프스타일·뷰티 모델로서의 한국 / …aspirational lifestyle & beauty | 동경받는 현대적 라이프스타일 / Aspirational, modern lifestyle |
| 위험과 함께 살아가는 분단국으로서의 한국 / …divided nation living with risk | 분단과 안보로 규정되는 나라 / Defined by division & security |
| 발전과 기술의 성공 사례로서의 한국 / …development & technology success story | 기술 선진국, 한국 / Technologically advanced, developed |
| 독특하고 흥미로운 나라로서의 한국 / …distinctive and intriguing | 매혹적이지만 온전히 알기 어려운 나라 / Fascinating & hard to grasp |

---

## 3. Verification results

Built (`next build` → compiled successfully, 5 pathway routes prerendered) and
inspected in a headless browser against the production server.

| Check | Result | Evidence |
|---|---|---|
| **Graph rendering** | ✓ 5 columns (Question→Concept→Theme→Narrative→Perception), 52 nodes, hover-dim + edges | `docs/screenshots/explore-graph-ko.png` |
| **Perception layer** | ✓ Fifth column active; perceptions render as filled institutional-blue apex nodes, distinct from navy narratives; legend shows all 5 types | `explore-graph-ko.png` |
| **Bilingual labels** | ✓ Korean (default) and English both render every node via the language switch | `explore-graph-en.png` |
| **Pathway pages** | ✓ 5 routes; terminal card correctly tagged **인식 / Perception** (was mislabelled Narrative — fixed); full q→c→t→n→p chain | `pathway-division-ko.png` |
| **Node interactions** | ✓ Click opens the evidence drawer; connected nodes grouped by type incl. a **인식 / Perception** group; blue perception chip | `evidence-drawer-ko.png` |

### Bug found & fixed during verification
`pathway-view.tsx` hardcoded the terminal card as "Narrative". With pathways now
ending at a Perception node, it mislabelled the perception. Fixed to derive the
tag from the node's actual type. Confirmed in `pathway-division-ko.png` (reads
인식 / Perception).

---

## 4. Design preserved

Light-mode-only, navy/institutional-blue research aesthetic, Pretendard Korean
typography, force-graph interaction model, and pathway layout are all unchanged.
The only new visual element is the Perception column/nodes, styled to match the
existing system (filled blue apex vs. navy narrative).

---

## 5. Open follow-up (needs your decision — NOT changed here)

The site still displays **"sample data" disclaimers** that are now inaccurate:

- The "샘플 데이터 / Sample data" badges (Explore, Pathways, footer).
- The Sample Notice: _"모든 데이터는 시연용 샘플입니다 … Google과 Reddit에서 수집한…"_.
- The footer **Data Sources** list includes **Reddit**, which was not used — the
  live collection was **Google Autocomplete only**.
- The graph caption _"Preview · interactive exploration coming soon"_ though the
  graph is already interactive.

These are **copy/labelling**, not ontology or design. I left them untouched
because reframing the data's status (still a "preview/demonstration" vs. a
"production research dataset") is an editorial call for you. Recommended change:
drop the "sample" wording, correct the source list to "Google Autocomplete" (add
"People Also Ask" only when a PAA run is added), and update the notice to state
the data is a real 1,540-question collection.

---

## 6. Rollback

The sample ontology remains in git history; reverting is a one-file change to
`lib/ontology.ts`. The transform is re-runnable (`node scripts/ontology-to-site.mjs`)
so a future re-collection regenerates the site data without hand-editing.
