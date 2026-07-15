"use client";

import * as React from "react";

export type Locale = "ko" | "en";

const STORAGE_KEY = "aak-locale";

type Dict = Record<string, { ko: string; en: string }>;

export const dict: Dict = {
  "nav.brand": { ko: "Ask About Korea", en: "Ask About Korea" },
  "nav.pathways": { ko: "질문 경로", en: "Pathways" },
  "nav.explore": { ko: "전체 지도", en: "Explore" },
  "nav.method": { ko: "방법론", en: "Method" },
  "nav.sources": { ko: "데이터 출처", en: "Sources" },

  "hero.eyebrow": {
    ko: "AI 시대의 질문 온톨로지",
    en: "A question ontology for the AI era",
  },
  "hero.title": {
    ko: "질문은 어떻게\n인식이 되는가",
    en: "How a question\nbecomes a perception",
  },
  "hero.subtitle": {
    ko: "세계가 한국에 대해 던지는 실제 질문을 수집해, 질문 → 개념 → 주제 → 서사로 이어지는 경로로 시각화합니다. 이 사이트는 한국을 소개하지 않습니다. 세계가 한국을 어떻게 이해하는지를 보여줍니다.",
    en: "We collect the real questions the world asks about Korea and map how each one travels: question → concept → theme → narrative. This site does not introduce Korea. It shows how the world comes to understand it.",
  },
  "hero.cta.explore": { ko: "경로 탐색하기", en: "Explore the pathways" },
  "hero.cta.map": { ko: "전체 온톨로지 지도", en: "See the full map" },
  "hero.pathway.label": { ko: "질문 경로", en: "Pathway" },
  "hero.pause": { ko: "일시정지", en: "Pause" },
  "hero.play": { ko: "재생", en: "Play" },

  "type.question": { ko: "질문", en: "Question" },
  "type.concept": { ko: "개념", en: "Concept" },
  "type.theme": { ko: "주제", en: "Theme" },
  "type.narrative": { ko: "서사 · 인식", en: "Narrative · Perception" },

  "model.eyebrow": { ko: "읽는 법", en: "How to read this" },
  "model.title": {
    ko: "질문 하나가 인식이 되기까지",
    en: "How a single question becomes a perception",
  },
  "model.subtitle": {
    ko: "개별 검색어는 흩어진 호기심처럼 보이지만, 서로 연결되면 한 나라에 대한 서사를 만듭니다.",
    en: "Individual searches look like scattered curiosity — connected, they compose a narrative about a nation.",
  },
  "model.step1.title": { ko: "질문", en: "Question" },
  "model.step1.body": {
    ko: "Google과 Reddit에서 수집한 실제 질문. “왜 김치가 유명한가요?”",
    en: "A real question collected from Google and Reddit. “Why is kimchi famous?”",
  },
  "model.step2.title": { ko: "개념 · 주제", en: "Concept · Theme" },
  "model.step2.body": {
    ko: "질문이 가리키는 개념과 주제. 발효 · 김장 · 유네스코 · 공동체 문화.",
    en: "The concepts and themes the question points to. Fermentation · Kimjang · UNESCO · community.",
  },
  "model.step3.title": { ko: "서사 · 인식", en: "Narrative · Perception" },
  "model.step3.body": {
    ko: "개념들이 모여 만드는 한 문장의 인식. “전통을 지켜온 나라, 한국.”",
    en: "The one-sentence perception the concepts compose. “Korea, a preserver of tradition.”",
  },

  "pathways.eyebrow": { ko: "질문 경로", en: "Pathways" },
  "pathways.title": {
    ko: "여섯 개의 질문, 여섯 개의 인식",
    en: "Six questions, six perceptions",
  },
  "pathways.subtitle": {
    ko: "각 경로는 하나의 실제 질문에서 출발해 하나의 인식으로 이어집니다. 경로를 따라가 보세요.",
    en: "Each pathway starts from one real question and arrives at one perception. Follow a pathway.",
  },
  "pathways.view": { ko: "경로 보기", en: "View pathway" },

  "explore.eyebrow": { ko: "전체 온톨로지", en: "Full ontology" },
  "explore.title": {
    ko: "질문들은 하나의 지도를 이룹니다",
    en: "The questions form a single map",
  },
  "explore.subtitle": {
    ko: "개별 경로들이 교차하며 개념의 네트워크를 만듭니다. 아래는 전체 온톨로지의 미리보기입니다.",
    en: "Individual pathways cross to form a network of concepts. Below is a preview of the full ontology.",
  },
  "explore.cta": { ko: "지도 미리보기", en: "Preview the map" },
  "explore.preview.badge": {
    ko: "미리보기 · 인터랙티브 탐색은 준비 중입니다",
    en: "Preview · interactive exploration coming soon",
  },
  "explore.back": { ko: "경로로 돌아가기", en: "Back to pathways" },
  "explore.legend": { ko: "노드 유형", en: "Node types" },

  "method.eyebrow": { ko: "데이터와 방법론", en: "Data & method" },
  "method.title": {
    ko: "질문은 공개된 플랫폼에서 수집됩니다",
    en: "Questions are collected from public platforms",
  },
  "method.subtitle": {
    ko: "누구나 접근할 수 있는 검색·토론 데이터에서 세계의 궁금증을 읽어냅니다.",
    en: "We read global curiosity from search and discussion data that anyone can access.",
  },
  "method.step.collect": { ko: "수집", en: "Collection" },
  "method.step.collect.desc": {
    ko: "Google과 Reddit에서 한국 관련 질문을 수집합니다.",
    en: "Gather Korea-related questions from Google and Reddit.",
  },
  "method.step.map": { ko: "온톨로지 매핑", en: "Ontology mapping" },
  "method.step.map.desc": {
    ko: "질문을 개념·주제·서사로 연결합니다.",
    en: "Link each question to concepts, themes, and narratives.",
  },
  "method.step.pathway": { ko: "경로 구성", en: "Pathway construction" },
  "method.step.pathway.desc": {
    ko: "질문에서 인식까지의 경로를 구성해 시각화합니다.",
    en: "Assemble and visualize the path from question to perception.",
  },
  "method.sources.title": { ko: "데이터 출처", en: "Data sources" },
  "method.google.desc": {
    ko: "사람들이 한국에 대해 검색하는 핵심 질의어",
    en: "The core queries people search about Korea",
  },
  "method.paa.desc": {
    ko: "검색 결과가 확장하며 드러내는 연관 질문",
    en: "Related questions that search results surface",
  },
  "method.autocomplete.desc": {
    ko: "입력하는 순간 드러나는 실시간 관심사",
    en: "Real-time interest revealed as people type",
  },
  "method.reddit.desc": {
    ko: "전 세계 커뮤니티의 자발적 토론과 질문",
    en: "Spontaneous questions from global communities",
  },

  "evidence.title": { ko: "연결된 실제 질문", en: "Connected questions" },
  "evidence.subtitle": {
    ko: "이 노드에 매핑된 실제 질문 (샘플)",
    en: "Real questions mapped to this node (sample)",
  },
  "evidence.connected": { ko: "연결된 개념", en: "Connected nodes" },
  "evidence.close": { ko: "닫기", en: "Close" },
  "evidence.empty": {
    ko: "이 노드의 예시 질문은 준비 중입니다.",
    en: "Sample questions for this node are being prepared.",
  },

  "sample.badge": { ko: "샘플 데이터", en: "Sample data" },
  "sample.notice.title": {
    ko: "모든 데이터는 시연용 샘플입니다",
    en: "All data shown is sample data for demonstration",
  },
  "sample.notice.body": {
    ko: "이 사이트의 모든 질문, 개념, 경로, 서사, 출처는 시연 목적의 예시 데이터입니다. 실제 콘텐츠는 Google과 Reddit에서 수집한 질문 데이터를 기반으로 생성됩니다.",
    en: "All questions, concepts, pathways, narratives, and sources on this site are sample data used for demonstration. Actual content will be generated from question data collected via Google and Reddit.",
  },

  "stat.questions": { ko: "수집된 질문", en: "Questions collected" },
  "stat.pathways": { ko: "질문 경로", en: "Pathways" },
  "stat.sources": { ko: "데이터 출처", en: "Data sources" },

  "footer.tagline": {
    ko: "실제 질문, 신뢰할 수 있는 답변",
    en: "Real Questions. Reliable Answers.",
  },
  "footer.desc": {
    ko: "세계가 한국을 어떻게 질문하는지 연구하는 공개 플랫폼.",
    en: "A public platform studying how the world questions Korea.",
  },
  "footer.rights": { ko: "시연용 리서치 프로젝트입니다.", en: "A demonstration research project." },

  "toggle.lang": { ko: "언어 전환", en: "Toggle language" },
  "a11y.pathwayReads": { ko: "질문 경로", en: "Question pathway" },
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
    if (stored === "ko" || stored === "en") setLocaleState(stored);
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
      return entry ? entry[locale] : key;
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
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
