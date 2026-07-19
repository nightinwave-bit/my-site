import type { Localized } from "@/lib/ontology";

// Research section manifest — two stages of inquiry:
// 검증 → 분석
// Validation → Analysis

export type ResearchSlug =
  | "data-report"
  | "understanding-model";

export interface ResearchDocMeta {
  slug: ResearchSlug;
  rung: number;
  /** Per-page signature accent (hex), applied on the shared light ground. */
  accent: string;
  kicker: Localized;
  title: Localized;
  question: Localized;
  /** Pager card title — what the reader will see in prev/next navigation. */
  pagerTitle: Localized;
  oneLine: Localized;
  audience: Localized;
}

export const RESEARCH_DOCS: ResearchDocMeta[] = [
  {
    slug: "data-report",
    rung: 1,
    accent: "#1f5fd6",
    kicker: { ko: "1부 · 발견과 분석", en: "Part 1 · Findings & Analysis" },
    title: { ko: "1,540개의 질문에서 발견한 15가지 신호", en: "15 Signals Found in 1,540 Questions" },
    question: { ko: "왜 이 데이터를 선택했는가?", en: "Why did we choose this data?" },
    pagerTitle: { ko: "발견과 분석 리포트", en: "Findings & Analysis Report" },
    oneLine: {
      ko: "1,540개의 질문에서 국가별 한국 이해 방식과 그 차이를 발견하다.",
      en: "Discovering how each country understands Korea — and how those understandings differ — from 1,540 questions.",
    },
    audience: { ko: "연구자 · 검증을 원하는 독자", en: "Researchers, readers who want verification" },
  },
  {
    slug: "understanding-model",
    rung: 2,
    accent: "#a9781a",
    kicker: { ko: "2부 · 활용과 설계", en: "Part 2 · Application & Design" },
    title: { ko: "질문에서 전략까지", en: "From Questions to Strategy" },
    question: { ko: "질문 데이터를 어떻게 활용할 수 있는가?", en: "How can question data be put to use?" },
    pagerTitle: { ko: "활용과 설계", en: "Application & Design" },
    oneLine: {
      ko: "질문은 발견으로 끝나지 않는다. 국가별 질문 패턴을 바탕으로 정부, 시민사회, 재외동포, AI가 어떤 역할을 해야 하는지 제안한다.",
      en: "Questions do not end at discovery. Based on country-level question patterns, we propose roles for government, civil society, diaspora, and AI.",
    },
    audience: { ko: "정책가 · 전략가 · 시민사회", en: "Policymakers, strategists, civil society" },
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
