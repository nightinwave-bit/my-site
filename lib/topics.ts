import type { Localized } from "@/lib/ontology";

// =============================================================================
// Topic architecture (V2) — the primary user entry points
// =============================================================================
//
// Topics are the human-facing doorway into the ontology. Each topic maps to a
// set of the ontology's empirical concepts (its backend structure). Every one
// of the 18 concepts is covered exactly once, so no topic is empty and no data
// is orphaned (decision: option (b) — 8 topics, data-supported only).
//
// Topics are presentation. The ontology remains the backend structure.
// =============================================================================

export type TopicSlug =
  | "hallyu"
  | "language"
  | "tourism"
  | "history"
  | "diplomacy"
  | "society"
  | "economy"
  | "technology";

export interface Topic {
  slug: TopicSlug;
  title: Localized;
  tagline: Localized;
  /** Ontology concept ids this topic surfaces (its subtopics). */
  concepts: string[];
}

export const TOPICS: Topic[] = [
  {
    slug: "hallyu",
    title: { ko: "한류", en: "Hallyu" },
    tagline: { ko: "K-팝, 드라마, 뷰티, 음식 — 세계가 처음 한국을 만나는 곳.", en: "K-pop, drama, beauty, food — where the world first meets Korea." },
    concepts: ["c_kpop", "c_drama", "c_beauty", "c_food", "c_culture"],
  },
  {
    slug: "language",
    title: { ko: "언어", en: "Language" },
    tagline: { ko: "한국어를 배우는 일 — 그리고 그 어려움이 실제로 뜻하는 것.", en: "Learning Korean — and what its “difficulty” really means." },
    concepts: ["c_language", "c_education"],
  },
  {
    slug: "tourism",
    title: { ko: "여행", en: "Tourism" },
    tagline: { ko: "한국을 방문하고 살아가는 일 — 안전, 도시, 비용.", en: "Visiting and living in Korea — safety, cities, cost." },
    concepts: ["c_travel", "c_place"],
  },
  {
    slug: "history",
    title: { ko: "역사", en: "History" },
    tagline: { ko: "오늘의 한국을 만든 과거.", en: "The past that shaped today’s Korea." },
    concepts: ["c_history"],
  },
  {
    slug: "diplomacy",
    title: { ko: "외교·지정학", en: "Diplomacy" },
    tagline: { ko: "분단, 두 개의 한국, 그리고 이웃 사이에서의 위치.", en: "Division, the two Koreas, and Korea’s place among its neighbours." },
    concepts: ["c_division", "c_compare"],
  },
  {
    slug: "society",
    title: { ko: "사회", en: "Society" },
    tagline: { ko: "사람, 예절, 일상 — 실제 한국의 삶.", en: "People, etiquette, daily life — Korea as it is actually lived." },
    concepts: ["c_people", "c_etiquette", "c_society", "c_basics"],
  },
  {
    slug: "economy",
    title: { ko: "경제", en: "Economy" },
    tagline: { ko: "물가, 돈, 그리고 한국의 경제적 위치.", en: "Cost, money, and Korea’s economic standing." },
    concepts: ["c_economy"],
  },
  {
    slug: "technology",
    title: { ko: "기술", en: "Technology" },
    tagline: { ko: "삼성, 반도체, 브랜드 — 그리고 그 뒤의 나라.", en: "Samsung, semiconductors, brands — and the country behind them." },
    concepts: ["c_tech"],
  },
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** Topics that actually have at least one present concept (defensive: no empties). */
export function topicsWithData(presentConceptIds: Set<string>): Topic[] {
  return TOPICS.map((t) => ({ ...t, concepts: t.concepts.filter((c) => presentConceptIds.has(c)) }))
    .filter((t) => t.concepts.length > 0);
}
