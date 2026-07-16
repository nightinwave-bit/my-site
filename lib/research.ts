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
    title: { ko: "데이터 리포트", en: "Data Report" },
    question: { ko: "무엇이 있는가?", en: "What is there?" },
    oneLine: {
      ko: "1,540개 질문에서 도출한 20가지 발견 — 차트와 시장별 신호 히트맵으로 보는 서술의 층위.",
      en: "Twenty findings from 1,540 questions — the descriptive layer, with charts and the market-signature heatmap.",
    },
    audience: { ko: "분석가 · 기자 · 궁금한 독자", en: "Analysts, journalists, the curious" },
  },
  {
    slug: "diplomacy-brief",
    rung: 2,
    accent: "#2f6f62",
    kicker: { ko: "2단계 · 해석", en: "Rung 2 · Interpretation" },
    title: { ko: "공공외교 브리프", en: "Diplomacy Brief" },
    question: { ko: "그래서 무엇을 의미하는가?", en: "So what?" },
    oneLine: {
      ko: "패턴이 한국의 이미지에 대해 무엇을 의미하는가 — 공공외교의 관점으로 읽는 여섯 개의 개념 도시에.",
      en: "What the patterns mean for Korea's image — six concept dossiers read through a public-diplomacy lens.",
    },
    audience: { ko: "정책 · 외교 독자", en: "Policy / diplomacy readers" },
  },
  {
    slug: "framework-paper",
    rung: 3,
    accent: "#a9781a",
    kicker: { ko: "3단계 · 제도", en: "Rung 3 · Institutions" },
    title: { ko: "프레임워크 페이퍼", en: "Framework Paper" },
    question: { ko: "이제 무엇을 만들 것인가?", en: "Now what?" },
    oneLine: {
      ko: "증거가 요구하는 여섯 개의 새로운 제도적 아키텍처, 그리고 그것이 이루는 하나의 시스템.",
      en: "Six new institutional architectures the evidence demands, and the composed system.",
    },
    audience: { ko: "전략가 · 제도 설계자", en: "Strategists, institution-builders" },
  },
  {
    slug: "question-commons",
    rung: 4,
    accent: "#12886a",
    kicker: { ko: "4단계 · 생태계", en: "Rung 4 · Ecosystem" },
    title: { ko: "질문 커먼즈", en: "Question Commons" },
    question: { ko: "그렇다면 무엇이 가능한가?", en: "What if?" },
    oneLine: {
      ko: "질문 하나를 중심에 둔 단일 생태계 — 질문이 사회를 어떻게 순환하는가.",
      en: "One question-centered ecosystem: how a question circulates through society.",
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
