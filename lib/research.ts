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
    kicker: { ko: "2부 · 발견과 분석", en: "Part 2 · Findings & Analysis" },
    title: { ko: "세계는 어떤 한국을 질문하는가", en: "What Korea Does the World Question?" },
    question: { ko: "무엇이 발견되었고, 어떻게 읽었는가?", en: "What was found, and how did we read it?" },
    pagerTitle: { ko: "발견과 분석 모델", en: "Findings & Analysis Model" },
    oneLine: {
      ko: "1,540개의 질문에서 발견한 패턴과, 그 패턴을 읽기 위해 설계한 질문→개념→주제→서사→인식 분석 구조를 설명한다.",
      en: "Patterns discovered from 1,540 questions and the question→concept→theme→narrative→perception analysis structure designed to read them.",
    },
    audience: { ko: "분석가 · 연구자 · 전략가", en: "Analysts, researchers, strategists" },
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
