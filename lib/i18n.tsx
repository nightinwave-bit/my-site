"use client";

import * as React from "react";

export type Locale = "ko" | "en";

const STORAGE_KEY = "aak-locale";

type Dict = Record<string, { ko: string; en: string }>;

export const dict: Dict = {
  "nav.brand": { ko: "Ask About Korea", en: "Ask About Korea" },
  "nav.pathways": { ko: "질문 경로", en: "Pathways" },
  "nav.explore": { ko: "전체 지도", en: "Explore" },
  "nav.research": { ko: "리서치", en: "Research" },
  "nav.method": { ko: "방법론", en: "Method" },

  // Research section — structural chrome (content prose lives in components)
  "research.eyebrow": { ko: "리서치", en: "Research" },
  "research.title": {
    ko: "1,540개의 질문이 말하는 것",
    en: "What 1,540 questions reveal",
  },
  "research.lede": {
    ko: "세계가 한국에 대해 던진 실제 질문을 네 단계로 읽습니다 — 서술에서 해석으로, 제도로, 그리고 생태계로. 각 페이지는 아래 단계 위에 세워집니다.",
    en: "One dataset read across four rungs — from description to interpretation to institutions to ecosystem. Each page builds on the rung below it.",
  },
  "research.ladder": { ko: "네 단계", en: "The four rungs" },
  "research.read": { ko: "읽기", en: "Read" },
  "research.rung": { ko: "단계", en: "Rung" },
  "research.audience": { ko: "대상", en: "For" },
  "research.crumb": { ko: "리서치", en: "Research" },
  "research.prev": { ko: "이전 단계", en: "Previous rung" },
  "research.next": { ko: "다음 단계", en: "Next rung" },
  "research.map": { ko: "인터랙티브 지도 열기", en: "Open the interactive map" },
  "research.method": { ko: "수집 방법과 한계", en: "Method & limits" },
  "research.byline": {
    ko: "1,540개 정규화 질문 · 8개 시장 · 7개 언어 · Google 자동완성",
    en: "1,540 canonical questions · 8 markets · 7 languages · Google Autocomplete",
  },
  "research.explore.cta.title": {
    ko: "질문들이 어떻게 연결되는지 보셨습니다. 이제 그것이 무엇을 의미하는지 읽어보세요.",
    en: "You've seen how the questions connect. Now read what it means.",
  },
  "research.explore.cta.link": { ko: "리서치 읽기", en: "Read the Research" },
  "research.teaser.eyebrow": { ko: "온톨로지 위에서", en: "Built on the ontology" },
  "research.teaser.title": {
    ko: "구조가 만들어지면, 해석이 시작됩니다",
    en: "Once the structure exists, interpretation begins",
  },
  "research.teaser.subtitle": {
    ko: "리서치는 온톨로지를 토대로 삼습니다. 같은 1,540개 질문을 서술에서 해석, 제도, 생태계로 이어지는 네 단계로 읽어냅니다.",
    en: "The research rests on the ontology. It reads the same 1,540 questions across four rungs — from description to interpretation, institutions, and ecosystem.",
  },
  "research.teaser.rung": { ko: "단계", en: "Rung" },
  "research.teaser.all": { ko: "리서치 전체 보기", en: "See all research" },
  "evidence.research.perception": { ko: "해석 읽기", en: "Read the interpretation" },
  "evidence.research.concept": { ko: "관련 발견 보기", en: "See the finding" },
  "nav.sources": { ko: "데이터 출처", en: "Sources" },

  "hero.eyebrow": {
    ko: "AI 시대의 질문 온톨로지",
    en: "A question ontology for the AI era",
  },
  "hero.title": {
    ko: "우리는 질문을\n구조로 만듭니다",
    en: "We structure\nthe world's questions",
  },
  "hero.subtitle": {
    ko: "세계가 한국에 대해 던지는 실제 질문을 수집해 하나의 온톨로지로 구조화합니다 — 질문 → 개념 → 주제 → 서사 → 인식. 리서치는 그 위에서 이 구조가 무엇을 의미하는지 해석합니다.",
    en: "We collect the real questions the world asks about Korea and structure them into a single ontology — question → concept → theme → narrative → perception. Our research sits on top of that structure to interpret what it means.",
  },
  "hero.spine.label": { ko: "핵심 구조", en: "The core structure" },
  "hero.cta.ontology": { ko: "온톨로지 탐색하기", en: "Explore the ontology" },
  "hero.cta.pathways": { ko: "질문 경로 보기", en: "See the pathways" },
  "hero.pathway.label": { ko: "질문 경로", en: "Pathway" },
  "hero.pause": { ko: "일시정지", en: "Pause" },
  "hero.play": { ko: "재생", en: "Play" },

  "type.question": { ko: "질문", en: "Question" },
  "type.concept": { ko: "개념", en: "Concept" },
  "type.theme": { ko: "주제", en: "Theme" },
  // Narrative and Perception are now distinct columns (production ontology).
  "type.narrative": { ko: "서사", en: "Narrative" },
  "type.perception": { ko: "인식", en: "Perception" },

  "model.eyebrow": { ko: "온톨로지 읽는 법", en: "Reading the ontology" },
  "model.title": {
    ko: "온톨로지의 다섯 층위",
    en: "The five layers of the ontology",
  },
  "model.subtitle": {
    ko: "위 네트워크는 다섯 종류의 노드로 이루어집니다. 하나의 실제 질문을 예로 각 층위가 어떻게 쌓이는지 보여드립니다.",
    en: "The network above is built from five kinds of node. Here is how the layers stack, traced through one real question.",
  },
  "model.step1.title": { ko: "왜 K-팝은 인기가 많을까?", en: "Why is K-pop so popular?" },
  "model.step1.body": {
    ko: "Google 자동완성에서 수집한 실제 질문 하나.",
    en: "One real question, collected from Google Autocomplete.",
  },
  "model.step2.title": { ko: "K-팝 아이돌", en: "K-pop idols" },
  "model.step2.body": {
    ko: "질문이 가리키는 개념. 비슷한 질문들이 같은 개념에 모입니다.",
    en: "The concept the question points to. Similar questions cluster onto it.",
  },
  "model.step3.title": { ko: "한류", en: "The Korean Wave" },
  "model.step3.body": {
    ko: "개념들이 모여 이루는 주제. 음악·드라마·언어가 하나로 묶입니다.",
    en: "The theme the concepts compose. Music, drama, and language join up.",
  },
  "model.step4.title": { ko: "한국은 문화를 수출한다", en: "Korea exports its culture" },
  "model.step4.body": {
    ko: "주제들이 만들어내는 서사 — 세계가 반복해서 들려주는 이야기.",
    en: "The narrative the themes produce — a story the world tells repeatedly.",
  },
  "model.step5.title": { ko: "문화 강국, 한국", en: "Korea, a cultural power" },
  "model.step5.body": {
    ko: "서사가 남기는 한 문장의 인식. 온톨로지가 도달하는 지점입니다.",
    en: "The one-line perception the narrative leaves behind. Where the ontology arrives.",
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
    ko: "개별 경로들이 교차하며 개념의 네트워크를 만듭니다. 아래는 수집된 질문에서 생성된 전체 온톨로지입니다.",
    en: "Individual pathways cross to form a network of concepts. Below is the full ontology generated from the collected questions.",
  },
  "explore.cta": { ko: "지도 탐색하기", en: "Explore the map" },
  "explore.preview.badge": {
    ko: "인터랙티브 온톨로지 · 노드를 클릭해 근거를 확인하세요",
    en: "Interactive ontology · click a node to see its evidence",
  },
  "explore.back": { ko: "경로로 돌아가기", en: "Back to pathways" },
  "explore.legend": { ko: "노드 유형", en: "Node types" },
  "explore.hint": {
    ko: "노드에 커서를 올리면 연결이 강조되고, 클릭하면 근거가 열립니다. 노드를 드래그해 재배치할 수 있습니다.",
    en: "Hover a node to highlight its connections, click to open its evidence, and drag to rearrange.",
  },
  "explore.flow.eyebrow": { ko: "인식은 어떻게 형성되는가", en: "How perception forms" },
  "explore.flow.statement": {
    ko: "질문이 개념을 만들고, 개념이 주제를, 주제가 서사를, 서사가 한 나라에 대한 인식을 만듭니다.",
    en: "Questions create concepts. Concepts create themes. Themes create narratives. Narratives create a nation’s perception.",
  },
  "explore.flow.q": { ko: "질문", en: "Questions" },
  "explore.flow.c": { ko: "개념", en: "Concepts" },
  "explore.flow.t": { ko: "주제", en: "Themes" },
  "explore.flow.n": { ko: "서사", en: "Narratives" },
  "explore.flow.p": { ko: "인식", en: "Perception" },
  "explore.shared.title": { ko: "관계가 드러나는 지점", en: "Where relationships surface" },
  "explore.shared.body": {
    ko: "서로 다른 질문이 같은 개념·주제·서사에서 만납니다. 예를 들어 ‘K-팝’과 ‘한국어’ 질문은 모두 소프트파워를 거쳐 ‘문화 강국’이라는 인식으로 수렴합니다.",
    en: "Different questions meet at shared concepts, themes, and narratives. ‘K-pop’ and ‘Korean language,’ for instance, both pass through Soft Power and converge on the perception of a ‘Cultural Power.’",
  },

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
    ko: "8개 시장에서 Google 자동완성으로 한국 관련 질문을 수집합니다.",
    en: "Gather Korea-related questions via Google Autocomplete across 8 markets.",
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

  // ── Method page ─────────────────────────────────────────────────────────
  "mp.eyebrow": { ko: "연구 프레임워크", en: "Research framework" },
  "mp.title": {
    ko: "질문은 어떻게 국가 인식이 되는가",
    en: "How Questions Shape National Perception",
  },
  "mp.subtitle": {
    ko: "이 사이트는 세계가 한국에 대해 던지는 실제 질문이 AI 정보 환경 속에서 어떻게 국가 인식으로 이어지는지를 탐구합니다.",
    en: "Ask About Korea is a research project exploring how real public questions become perceptions of Korea through the AI information environment.",
  },

  "mp.s1.kicker": { ko: "국가 브랜딩의 전환", en: "The shift in national branding" },
  "mp.s1.title": { ko: "홍보에서 질문으로", en: "From Promotion to Questions" },
  "mp.s1.body": {
    ko: "지난 수십 년간 국가 브랜딩은 메시지를 ‘전달’하는 데 초점을 맞췄습니다. 그러나 오늘날 사람들은 검색 엔진, 추천 시스템, 그리고 생성형 AI를 통해 국가를 만납니다. 그 결과, 대중의 질문이 국가 인식으로 들어서는 핵심 관문이 되었습니다.",
    en: "For decades, national branding focused on delivering messages. Today, people increasingly encounter countries through search engines, recommendation systems, and generative AI. As a result, public questions have become a primary gateway to national perception.",
  },
  "mp.s1.old": { ko: "이전 모델", en: "Previous model" },
  "mp.s1.new": { ko: "새로운 모델", en: "Emerging model" },

  "mp.s2.kicker": { ko: "AI 정보 환경의 작동 방식", en: "How AI information environments work" },
  "mp.s2.title": { ko: "오늘날 한국은 어떻게 발견되는가", en: "How Korea Is Encountered Today" },
  "mp.s2.body": {
    ko: "초점은 AI 모델 자체가 아닙니다. 사람들이 실제로 접하게 되는 ‘정보’입니다.",
    en: "The focus is not the AI model itself. The focus is the information people receive.",
  },
  "mp.s2.search": { ko: "사람들이 검색합니다", en: "People search" },
  "mp.s2.emerge": { ko: "질문이 형성됩니다", en: "Questions emerge" },
  "mp.s2.answer": { ko: "AI 시스템이 답합니다", en: "AI systems answer" },
  "mp.s2.perceive": { ko: "인식이 형성됩니다", en: "Perceptions form" },

  "mp.s3.kicker": { ko: "Ask About Korea 프레임워크", en: "The Ask About Korea framework" },
  "mp.s3.title": {
    ko: "질문 → 개념 → 주제 → 서사 → 인식",
    en: "Question → Concept → Theme → Narrative → Perception",
  },
  "mp.s3.body": {
    ko: "이것은 사실의 연쇄가 아닙니다. 인식이 형성되는 경로입니다. 여러 질문이 같은 개념으로 수렴하고, 여러 개념이 같은 서사에 기여할 수 있습니다.",
    en: "This is not a factual chain. It is a perception pathway. Multiple questions may converge into the same concept, and multiple concepts may contribute to the same narrative.",
  },
  "mp.s3.caption": { ko: "예시 경로 (샘플)", en: "Example pathway (sample)" },

  "mp.s4.kicker": { ko: "연구 과정", en: "Research process" },
  "mp.s4.title": { ko: "질문은 어떻게 수집되는가", en: "How We Study Questions" },
  "mp.s4.1.title": { ko: "질문 수집", en: "Question Collection" },
  "mp.s4.1.desc": {
    ko: "Google 자동완성으로 8개 시장·7개 언어에서 실제 질문을 수집합니다. (People Also Ask 등은 향후 도입 예정)",
    en: "Collect real questions via Google Autocomplete across 8 markets and 7 languages. (People Also Ask and others are planned.)",
  },
  "mp.s4.2.title": { ko: "질문 매핑", en: "Question Mapping" },
  "mp.s4.2.desc": {
    ko: "질문을 개념·주제·서사로 연결해 온톨로지를 구축합니다.",
    en: "Link questions into concepts, themes, and narratives — an ontology.",
  },
  "mp.s4.3.title": { ko: "AI 응답 관찰", en: "AI Answer Observation" },
  "mp.s4.3.desc": {
    ko: "AI 시스템이 해당 주제를 어떻게 설명하는지 관찰합니다.",
    en: "Observe how AI systems explain the topic.",
  },
  "mp.s4.4.title": { ko: "콘텐츠 제작", en: "Content Creation" },
  "mp.s4.4.desc": {
    ko: "출처에 근거한 자료를 제작합니다.",
    en: "Create evidence-based resources.",
  },
  "mp.s4.5.title": { ko: "SEO · AEO · AIO", en: "SEO · AEO · AIO" },
  "mp.s4.5.desc": {
    ko: "발견 가능성을 높이도록 콘텐츠를 설계합니다.",
    en: "Design content for discoverability.",
  },
  "mp.s4.6.title": { ko: "정보 환경 기여", en: "Information Environment Impact" },
  "mp.s4.6.desc": {
    ko: "더 풍부한 정보 생태계에 기여합니다.",
    en: "Contribute to a richer information ecosystem.",
  },

  "mp.s5.kicker": { ko: "왜 중요한가", en: "Why this matters" },
  "mp.s5.title": { ko: "질문은 단순한 질문이 아니다", en: "Questions Are Not Just Questions" },
  "mp.s5.l1": { ko: "반복되는 질문은 정보 수요를 드러냅니다.", en: "Repeated questions reveal information demand." },
  "mp.s5.l2": { ko: "반복되는 답변은 인식에 영향을 줍니다.", en: "Repeated answers influence perception." },
  "mp.s5.l3": { ko: "인식은 국가 이미지를 형성합니다.", en: "Perception influences national image." },
  "mp.s5.l4": {
    ko: "따라서 질문을 이해하는 것은 AI 시대의 국가 브랜딩을 이해하는 일입니다.",
    en: "Therefore understanding questions is part of understanding national branding in the AI era.",
  },

  "mp.s6.title": { ko: "데이터 출처", en: "Data Sources" },
  "mp.s6.note": {
    ko: "이 온톨로지는 8개 시장에서 Google 자동완성으로 수집한 실제 질문 1,540개에서 생성되었습니다. 향후 버전에서는 People Also Ask 등 추가 출처를 도입할 예정입니다.",
    en: "This ontology is generated from 1,540 real questions collected via Google Autocomplete across 8 markets. Future versions will add sources such as People Also Ask.",
  },

  "mp.closing": {
    ko: "Ask About Korea는 한국을 정의하려 하지 않습니다. 질문과 정보, 그리고 AI 시스템이 한국에 대한 대중의 이해를 어떻게 형성하는지를 탐구합니다.",
    en: "Ask About Korea does not attempt to define Korea. It explores how questions, information, and AI systems shape public understanding of Korea.",
  },

  "evidence.title": { ko: "연결된 실제 질문", en: "Connected questions" },
  "evidence.subtitle": {
    ko: "이 노드에 매핑된 실제 수집 질문",
    en: "Real collected questions mapped to this node",
  },
  "evidence.connected": { ko: "연결된 개념", en: "Connected nodes" },
  "evidence.close": { ko: "닫기", en: "Close" },
  "evidence.empty": {
    ko: "이 노드에 직접 연결된 예시 질문은 없습니다.",
    en: "No example questions are linked directly to this node.",
  },

  "sample.badge": { ko: "실제 수집 데이터", en: "Live dataset" },
  "sample.notice.title": {
    ko: "실제 수집 데이터로 생성된 온톨로지",
    en: "Generated from a real collected dataset",
  },
  "sample.notice.body": {
    ko: "이 사이트의 질문·개념·경로·서사·인식은 8개 시장에서 Google 자동완성으로 수집한 실제 질문 1,540개(원본 2,193건)에서 생성되었습니다. 상대적 노출 빈도는 참고 지표이며, 절대 검색량이 아닙니다.",
    en: "The questions, concepts, pathways, narratives, and perceptions on this site are generated from 1,540 real questions (from 2,193 raw queries) collected via Google Autocomplete across 8 markets. Relative salience is an indicative signal, not true search volume.",
  },

  "stat.questions": { ko: "수집된 질문", en: "Questions collected" },
  "stat.pathways": { ko: "질문 경로", en: "Pathways" },
  "stat.sources": { ko: "데이터 출처", en: "Data sources" },

  // Dataset provenance strip
  "prov.title": { ko: "데이터셋", en: "Dataset" },
  "prov.raw": { ko: "수집된 원본 쿼리", en: "Collected queries" },
  "prov.canonical": { ko: "정규화 질문", en: "Canonical questions" },
  "prov.languages": { ko: "언어", en: "Languages" },
  "prov.markets": { ko: "시장", en: "Markets" },
  "prov.method": { ko: "수집 방법", en: "Collection method" },
  "prov.updated": { ko: "최종 업데이트", en: "Last updated" },
  "footer.source.note": {
    ko: "시장별 현지화 (gl/hl)",
    en: "Localized per market (gl/hl)",
  },
  "source.active": { ko: "사용 중", en: "Active" },
  "source.planned": { ko: "예정", en: "Planned" },

  "footer.tagline": {
    ko: "실제 질문, 신뢰할 수 있는 답변",
    en: "Real Questions. Reliable Answers.",
  },
  "footer.desc": {
    ko: "세계가 한국을 어떻게 질문하는지 연구하는 공개 플랫폼.",
    en: "A public platform studying how the world questions Korea.",
  },
  "footer.rights": {
    ko: "세계가 한국을 어떻게 질문하는지 연구하는 공개 리서치 프로젝트입니다.",
    en: "An open research project on how the world questions Korea.",
  },

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
