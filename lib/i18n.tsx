"use client";

import * as React from "react";

export type Locale = "ko" | "en";

const STORAGE_KEY = "aak-locale";

type Dict = Record<string, { ko: string; en: string }>;

// UI copy. Content-level copy (categories, questions) lives in lib/data.ts.
export const dict: Dict = {
  "nav.brand": { ko: "Ask About Korea", en: "Ask About Korea" },
  "nav.explore": { ko: "질문 탐색", en: "Explore" },
  "nav.about": { ko: "프로젝트 소개", en: "About" },
  "nav.sources": { ko: "데이터 출처", en: "Sources" },
  "nav.map": { ko: "질문 지도", en: "Question Map" },

  "hero.eyebrow": {
    ko: "AI 시대의 글로벌 질문 지도",
    en: "A living map of global curiosity",
  },
  "hero.title": {
    ko: "세계는 한국에 대해\n무엇을 궁금해할까요?",
    en: "What does the world\nwant to know about Korea?",
  },
  "hero.subtitle": {
    ko: "실제 질문 데이터를 기반으로 한국에 대한 글로벌 관심사를 탐색합니다.",
    en: "Explore global curiosity about Korea, grounded in real question data.",
  },
  "hero.cta": { ko: "질문 탐색하기", en: "Explore the questions" },
  "hero.cta.secondary": { ko: "프로젝트 소개", en: "About the project" },
  "hero.stat.questions": { ko: "수집된 질문", en: "Questions collected" },
  "hero.stat.categories": { ko: "질문 카테고리", en: "Categories" },
  "hero.stat.sources": { ko: "데이터 출처", en: "Data sources" },
  "hero.hint": {
    ko: "노드를 움직여 보세요",
    en: "Drag a node to explore",
  },

  "about.eyebrow": { ko: "프로젝트 소개", en: "About the project" },
  "about.title": {
    ko: "우리가 하고 싶은 말이 아니라,\n세계가 던지는 질문에서 시작합니다.",
    en: "We start not with what we want to say,\nbut with what the world actually asks.",
  },
  "about.p1": {
    ko: "이 웹사이트는 한국을 소개하는 사이트가 아닙니다. 관광 안내도, 정부 포털도, 백과사전도 아닙니다.",
    en: "This is not a site that introduces Korea. Not a tourism guide, not a government portal, not an encyclopedia.",
  },
  "about.p2": {
    ko: "과거의 공공외교는 ‘우리가 알리고 싶은 것’에서 출발했습니다. 오늘날 사람들은 검색과 생성형 AI를 통해 한국을 만납니다. 사람들이 질문하고, AI가 답합니다. 그리고 그 질문들이 한국을 이해하는 방식을 만들어 갑니다.",
    en: "Public diplomacy once began with what we wanted to tell the world. Today people meet Korea through search and generative AI. People ask, AI answers — and those questions increasingly shape how Korea is understood.",
  },
  "about.p3": {
    ko: "그래서 이 프로젝트는 홍보 메시지가 아니라, 실제 질문에서 출발합니다.",
    en: "So this project starts from real questions — not from promotional messaging.",
  },
  "about.point1.title": { ko: "질문 우선", en: "Question-first" },
  "about.point1.body": {
    ko: "말하기보다 듣기. 세계가 실제로 무엇을 묻는지에서 출발합니다.",
    en: "Listening before telling. We begin with what people genuinely ask.",
  },
  "about.point2.title": { ko: "AI 네이티브", en: "AI-native" },
  "about.point2.body": {
    ko: "검색과 생성형 AI가 인식을 형성하는 시대에 맞춘 접근입니다.",
    en: "An approach built for an era where search and AI shape perception.",
  },
  "about.point3.title": { ko: "데이터 기반", en: "Data-driven" },
  "about.point3.body": {
    ko: "공개된 검색·토론 플랫폼의 실제 질문을 수집하고 구조화합니다.",
    en: "Real questions from public search and discussion platforms, structured.",
  },

  "sources.eyebrow": { ko: "데이터 출처", en: "Data sources" },
  "sources.title": {
    ko: "질문은 공개된 검색·토론 플랫폼에서 수집됩니다.",
    en: "Questions are gathered from public search and discussion platforms.",
  },
  "sources.subtitle": {
    ko: "누구나 접근할 수 있는 데이터에서 세계의 궁금증을 읽어냅니다.",
    en: "We read global curiosity from data anyone can access.",
  },
  "sources.google.desc": {
    ko: "사람들이 한국에 대해 검색하는 핵심 질의어",
    en: "The core queries people search about Korea",
  },
  "sources.paa.desc": {
    ko: "검색 결과에 따라 확장되는 연관 질문",
    en: "Related questions that expand from search results",
  },
  "sources.autocomplete.desc": {
    ko: "입력하는 순간 드러나는 실시간 관심사",
    en: "Real-time interest revealed as people type",
  },
  "sources.reddit.desc": {
    ko: "전 세계 커뮤니티의 자발적 토론과 질문",
    en: "Spontaneous discussion and questions from global communities",
  },

  "map.eyebrow": { ko: "한국 질문 지도", en: "Korea Question Map" },
  "map.title": {
    ko: "세계는 한국을 이렇게 탐색합니다.",
    en: "This is how the world explores Korea.",
  },
  "map.subtitle": {
    ko: "영역의 크기는 질문의 비중을 나타냅니다. 카테고리를 눌러 들어가 보세요.",
    en: "Each area’s size reflects its share of questions. Tap a category to enter.",
  },
  "map.questions": { ko: "질문", en: "questions" },

  "cards.eyebrow": { ko: "카테고리", en: "Categories" },
  "cards.title": {
    ko: "한국의 여러 차원으로 들어가는 관문",
    en: "Gateways into the many dimensions of Korea",
  },
  "cards.subtitle": {
    ko: "각 카드는 세계가 궁금해하는 서로 다른 세계로 이어집니다.",
    en: "Each card opens into a different world of what people wonder about.",
  },
  "cards.enter": { ko: "탐색하기", en: "Explore" },
  "cards.count": { ko: "개 질문", en: "questions" },

  "category.back": { ko: "전체 카테고리로", en: "All categories" },
  "category.share": { ko: "전체 질문 중 비중", en: "Share of all questions" },
  "category.count": { ko: "수집된 질문", en: "Questions collected" },
  "category.intro": { ko: "카테고리 소개", en: "Introduction" },
  "category.questions.title": {
    ko: "대표 질문",
    en: "Representative questions",
  },
  "category.questions.subtitle": {
    ko: "세계가 가장 자주 던지는 질문들",
    en: "The questions people ask most often",
  },
  "category.answer": { ko: "답변", en: "Answer" },
  "category.sources": { ko: "출처", en: "Sources" },
  "category.video": { ko: "관련 영상", en: "Related video" },
  "category.explore.more": { ko: "다른 카테고리 탐색", en: "Explore more categories" },

  "sample.badge": { ko: "샘플 데이터", en: "Sample data" },
  "sample.notice.title": {
    ko: "모든 데이터는 시연용 샘플입니다",
    en: "All data shown is sample data for demonstration",
  },
  "sample.notice.body": {
    ko: "이 사이트의 모든 카테고리명, 질문 수, 분포, 대표 질문, 답변, 출처, 영상은 시연 목적의 예시 데이터입니다. 실제 콘텐츠는 Google과 Reddit에서 수집한 질문 데이터를 기반으로 생성됩니다.",
    en: "All category names, question counts, distributions, representative questions, answers, sources, and videos on this site are sample data used for demonstration. Actual content will be generated from question data collected via Google and Reddit.",
  },

  "flow.eyebrow": { ko: "데이터 흐름", en: "Data flow" },
  "flow.title": {
    ko: "질문에서 지도까지",
    en: "From questions to a map",
  },
  "flow.subtitle": {
    ko: "향후 구현될 파이프라인 — 현재 단계에서는 샘플 데이터를 사용합니다.",
    en: "The pipeline planned for future implementation — for now, sample data is used.",
  },
  "flow.step1": { ko: "질문 수집", en: "Collection" },
  "flow.step1.desc": {
    ko: "Google · Reddit에서 실제 질문 수집",
    en: "Gather real questions from Google & Reddit",
  },
  "flow.step2": { ko: "AI 분류", en: "AI categorization" },
  "flow.step2.desc": {
    ko: "질문을 의미 단위로 자동 분류",
    en: "Automatically sort questions by meaning",
  },
  "flow.step3": { ko: "중복 제거", en: "Deduplication" },
  "flow.step3.desc": {
    ko: "유사·중복 질문 정리",
    en: "Merge similar and duplicate questions",
  },
  "flow.step4": { ko: "카테고리 생성", en: "Category generation" },
  "flow.step4.desc": {
    ko: "데이터 기반으로 카테고리 도출",
    en: "Derive categories from the data",
  },
  "flow.step5": { ko: "분포 시각화", en: "Visualization" },
  "flow.step5.desc": {
    ko: "질문 분포를 지도로 시각화",
    en: "Visualize the distribution as a map",
  },

  "footer.tagline": {
    ko: "실제 질문, 신뢰할 수 있는 답변",
    en: "Real Questions. Reliable Answers.",
  },
  "footer.desc": {
    ko: "AI 시대에 한국을 이해하고 소통하는 새로운 방식.",
    en: "A new way to understand and communicate Korea in the AI era.",
  },
  "footer.rights": {
    ko: "시연용 프로젝트입니다.",
    en: "A demonstration project.",
  },

  "toggle.theme": { ko: "테마 전환", en: "Toggle theme" },
  "toggle.lang": { ko: "언어 전환", en: "Toggle language" },
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: (key: keyof typeof dict | string) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("ko");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "ko" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === "ko" ? "en" : "ko");
  }, [locale, setLocale]);

  const t = React.useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return entry[locale];
    },
    [locale]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
