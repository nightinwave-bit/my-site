import type { Localized } from "@/lib/ontology";

// Research section manifest — four stages of inquiry:
// 발견 → 해석 → 모델 → 관찰
// Discovery → Interpretation → Model → Observation

export type ResearchSlug =
  | "data-report"
  | "diplomacy-brief"
  | "understanding-model"
  | "question-observatory";

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
    kicker: { ko: "1단계 · 발견", en: "Step 1 · Discovery" },
    title: { ko: "세계는 어떤 한국을 질문하는가", en: "What Korea Does the World Question?" },
    question: { ko: "무엇이 보이는가?", en: "What is there?" },
    pagerTitle: { ko: "질문의 패턴 발견하기", en: "Discovering question patterns" },
    oneLine: {
      ko: "1,540개의 질문은 하나의 한국이 아니라 여러 개의 한국을 보여준다. 이 보고서는 질문이 드러내는 국가 이미지의 구조를 읽는다.",
      en: "1,540 questions reveal not one Korea but many. This report reads the structure of national image they reveal.",
    },
    audience: { ko: "분석가 · 기자 · 궁금한 독자", en: "Analysts, journalists, the curious" },
  },
  {
    slug: "diplomacy-brief",
    rung: 2,
    accent: "#2f6f62",
    kicker: { ko: "2단계 · 해석", en: "Step 2 · Interpretation" },
    title: { ko: "질문은 공공외교의 출발점이다", en: "Questions Are Where Public Diplomacy Begins" },
    question: { ko: "그것은 무엇을 의미하는가?", en: "What does it mean?" },
    pagerTitle: { ko: "질문의 의미 읽기", en: "Reading what questions mean" },
    oneLine: {
      ko: "공공외교는 무엇을 알릴 것인가에서 시작되지 않는다. 사람들이 무엇을 묻고 있는가에서 시작된다. 이 브리프는 질문 데이터를 바탕으로 공공외교의 새로운 출발점을 제안한다.",
      en: "Public diplomacy doesn't start with what to announce — it starts with what people are asking. This brief proposes a new starting point for public diplomacy, grounded in question data.",
    },
    audience: { ko: "정책 · 외교 독자", en: "Policy / diplomacy readers" },
  },
  {
    slug: "understanding-model",
    rung: 3,
    accent: "#a9781a",
    kicker: { ko: "3단계 · 모델", en: "Step 3 · Model" },
    title: { ko: "한국 이해 모델", en: "Korea Understanding Model" },
    question: { ko: "어떻게 이해가 만들어지는가?", en: "How is understanding formed?" },
    pagerTitle: { ko: "한국 이해 모델", en: "Korea Understanding Model" },
    oneLine: {
      ko: "질문에서 개념으로, 개념에서 주제로, 주제에서 서사로, 서사에서 인식으로. 세계가 한국을 이해하는 과정을 모델로 재구성했다.",
      en: "From questions to concepts, concepts to themes, themes to narratives, narratives to perception. We reconstructed the process by which the world understands Korea as a model.",
    },
    audience: { ko: "연구자 · 전략가", en: "Researchers, strategists" },
  },
  {
    slug: "question-observatory",
    rung: 4,
    accent: "#12886a",
    kicker: { ko: "4단계 · 관찰", en: "Step 4 · Observation" },
    title: { ko: "질문은 끝나지 않는다", en: "Questions Never End" },
    question: { ko: "앞으로 무엇이 바뀌는가?", en: "What changes next?" },
    pagerTitle: { ko: "질문으로 미래 읽기", en: "Reading the future through questions" },
    oneLine: {
      ko: "국가 이미지는 완성된 결과물이 아니다. 새로운 기술, 새로운 사건, 새로운 세대가 한국을 만날 때마다 질문은 바뀐다. 질문 관측소는 세계의 시선 변화를 기록하는 공간이다.",
      en: "National image is never a finished product. Questions change whenever new technologies, new events, and new generations encounter Korea. The Question Observatory records how the world's gaze shifts.",
    },
    audience: { ko: "미래학자 · 정책설계자 · 연구자", en: "Futurists, policy designers, researchers" },
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
