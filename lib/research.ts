import type { Localized } from "@/lib/ontology";

// Research section manifest — the four-rung ladder (see
// docs/RESEARCH-SECTION-BLUEPRINT.md). Order is canonical everywhere: nav,
// index cards, and the ladder pager all read from this array.

export type ResearchSlug =
  | "data-report"
  | "diplomacy-brief"
  | "framework-paper"
  | "question-commons";

export interface ResearchDocMeta {
  slug: ResearchSlug;
  rung: number;
  /** Per-page signature accent (hex), applied on the shared light ground. */
  accent: string;
  kicker: Localized; // "Rung 1 · Description"
  title: Localized;
  question: Localized; // the rung's guiding question
  oneLine: Localized;
  audience: Localized;
}

export const RESEARCH_DOCS: ResearchDocMeta[] = [
  {
    slug: "data-report",
    rung: 1,
    accent: "#1f5fd6",
    kicker: { ko: "1단계 · 서술", en: "Rung 1 · Description" },
    title: { ko: "세계는 어떤 한국을 질문하는가", en: "What Korea Does the World Question?" },
    question: { ko: "무엇이 있는가?", en: "What is there?" },
    oneLine: {
      ko: "1,540개의 질문은 하나의 한국이 아니라 여러 개의 한국을 보여준다. 이 보고서는 질문 수를 정리하는 것이 아니라 질문이 드러내는 국가 이미지의 구조를 읽는다.",
      en: "1,540 questions reveal not one Korea but many. This report doesn't tally questions — it reads the structure of national image they reveal.",
    },
    audience: { ko: "분석가 · 기자 · 궁금한 독자", en: "Analysts, journalists, the curious" },
  },
  {
    slug: "diplomacy-brief",
    rung: 2,
    accent: "#2f6f62",
    kicker: { ko: "2단계 · 해석", en: "Rung 2 · Interpretation" },
    title: { ko: "질문은 공공외교의 출발점이다", en: "Questions Are Where Public Diplomacy Begins" },
    question: { ko: "그래서 무엇을 의미하는가?", en: "So what?" },
    oneLine: {
      ko: "공공외교는 무엇을 알릴 것인가에서 시작되지 않는다. 사람들이 무엇을 묻고 있는가에서 시작된다. 이 브리프는 질문 데이터를 바탕으로 공공외교의 새로운 출발점을 제안한다.",
      en: "Public diplomacy doesn't start with what to announce — it starts with what people are asking. This brief proposes a new starting point for public diplomacy, grounded in question data.",
    },
    audience: { ko: "정책 · 외교 독자", en: "Policy / diplomacy readers" },
  },
  {
    slug: "framework-paper",
    rung: 3,
    accent: "#a9781a",
    kicker: { ko: "3단계 · 제도", en: "Rung 3 · Institutions" },
    title: { ko: "국가 이미지는 질문에서 시작된다", en: "National Image Begins with Questions" },
    question: { ko: "이제 무엇을 만들 것인가?", en: "Now what?" },
    oneLine: {
      ko: "국가 이미지는 메시지를 통해 형성되는 것이 아니라 질문이 반복되고 답변이 축적되는 과정에서 형성된다. 이 프레임워크는 질문을 국가 이미지 형성의 출발점으로 바라본다.",
      en: "National image is not shaped through messages — it forms as questions repeat and answers accumulate. This framework sees questions as the starting point of national image formation.",
    },
    audience: { ko: "전략가 · 제도 설계자", en: "Strategists, institution-builders" },
  },
  {
    slug: "question-commons",
    rung: 4,
    accent: "#12886a",
    kicker: { ko: "4단계 · 실행 모델", en: "Rung 4 · Implementation" },
    title: { ko: "질문에서 공동지식으로", en: "From Questions to Shared Knowledge" },
    question: { ko: "그렇다면 무엇이 가능한가?", en: "What if?" },
    oneLine: {
      ko: "질문은 개인의 것이지만 답변은 공동의 자산이 될 수 있다. 이 모델은 질문을 집단지식으로 전환하는 구조를 제안한다.",
      en: "Questions belong to individuals, but answers can become shared assets. This model proposes a structure that transforms questions into collective knowledge.",
    },
    audience: { ko: "생태계 · 시민 설계자", en: "Ecosystem / civic designers" },
  },
];

export function getDoc(slug: string): ResearchDocMeta | undefined {
  return RESEARCH_DOCS.find((d) => d.slug === slug);
}

/** Ladder pager — previous and next rung for a given doc. */
export function docNeighbors(slug: string): {
  prev?: ResearchDocMeta;
  next?: ResearchDocMeta;
} {
  const i = RESEARCH_DOCS.findIndex((d) => d.slug === slug);
  return {
    prev: i > 0 ? RESEARCH_DOCS[i - 1] : undefined,
    next: i < RESEARCH_DOCS.length - 1 ? RESEARCH_DOCS[i + 1] : undefined,
  };
}
