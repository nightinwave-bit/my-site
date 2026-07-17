"use client";

import * as React from "react";

export type Locale = "ko" | "en";

const STORAGE_KEY = "aak-locale";

type Dict = Record<string, { ko: string; en: string }>;

export const dict: Dict = {
  "nav.brand": { ko: "Ask About Korea", en: "Ask About Korea" },
  "nav.pathways": { ko: "대표 질문", en: "Key Questions" },
  "nav.topics": { ko: "주제", en: "Topics" },
  "nav.explore": { ko: "질문 지도", en: "Question Map" },
  "nav.research": { ko: "리서치", en: "Research" },
  "nav.method": { ko: "데이터와 분석", en: "Data & Analysis" },

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
  "research.teaser.eyebrow": { ko: "질문에서 해석으로", en: "From questions to interpretation" },
  "research.teaser.title": {
    ko: "질문이 무엇을 뜻하는지 읽습니다",
    en: "We read what the questions mean",
  },
  "research.teaser.subtitle": {
    ko: "같은 1,540개 질문을 네 단계로 해석합니다 — 무엇이 있는가, 그것이 뜻하는 것, 무엇을 해야 하는가, 무엇이 가능한가.",
    en: "We interpret the same 1,540 questions across four steps — what is there, what it means, what to do, and what becomes possible.",
  },
  "research.teaser.rung": { ko: "단계", en: "Rung" },
  "research.teaser.all": { ko: "리서치 전체 보기", en: "See all research" },
  "research.why.eyebrow": { ko: "왜 이 연구인가", en: "Why this research" },
  "research.why.lede": {
    ko: "우리는 한국에 대한 답을 찾기 전에, 세계가 어떤 질문을 하는지부터 조사했다.",
    en: "Before looking for answers about Korea, we studied what questions the world is asking.",
  },
  "research.why.autocomplete.q": { ko: "왜 Google 자동완성인가?", en: "Why Google Autocomplete?" },
  "research.why.autocomplete.a": {
    ko: "사람들은 공식 설문조사보다 검색창에 더 솔직한 질문을 남긴다.",
    en: "People leave more honest questions in a search box than in any official survey.",
  },
  "research.why.markets.q": { ko: "왜 8개 국가인가?", en: "Why eight markets?" },
  "research.why.markets.a": {
    ko: "‘세계 평균’은 존재하지 않는다. 나라마다 질문하는 방식이 다르다.",
    en: "There is no “global average.” Each country asks in its own way.",
  },
  "research.why.found.q": { ko: "우리는 무엇을 발견했는가?", en: "What did we find?" },
  "research.why.found.a": {
    ko: "문화 질문은 많았다. 하지만 그것이 문화에만 관심 있다는 뜻은 아니었다. 문화는 세계가 한국을 처음 만나는 입구였다.",
    en: "There were many culture questions. But that did not mean interest in culture alone — culture was the entrance where the world first meets Korea.",
  },
  "evidence.research.perception": { ko: "해석 읽기", en: "Read the interpretation" },
  "evidence.research.concept": { ko: "관련 발견 보기", en: "See the finding" },
  "nav.sources": { ko: "데이터 출처", en: "Sources" },

  "hero.eyebrow": {
    ko: "세계의 질문으로 읽는 한국",
    en: "Reading Korea through the world's questions",
  },
  "hero.title": {
    ko: "세계는 한국을 어떻게\n이해하고 있을까?",
    en: "How does the world\nunderstand Korea?",
  },
  "hero.subtitle": {
    ko: "세계는 한국을 콘텐츠로만 만나지 않습니다. 검색하고, 질문하고, AI에게 묻습니다. Ask About Korea는 8개 시장·7개 언어에서 수집한 1,540개의 실제 질문으로, 세계가 한국을 어떻게 이해하는지를 연구합니다.",
    en: "The world doesn't meet Korea through content alone. It searches, it asks, it queries AI. Ask About Korea studies how the world understands Korea through 1,540 real questions collected across 8 markets and 7 languages.",
  },
  "hero.spine.label": { ko: "질문에서 의미까지", en: "From question to meaning" },
  // The homepage thesis — short, memorable, human-readable.
  "hero.flow.q": { ko: "질문", en: "Question" },
  "hero.flow.p": { ko: "인식", en: "Perception" },
  "hero.flow.s": { ko: "구조", en: "Structure" },
  "hero.flow.m": { ko: "의미", en: "Meaning" },
  "hero.cta.ontology": { ko: "주제로 시작하기", en: "Start with a topic" },
  "hero.cta.pathways": { ko: "질문 지도 보기", en: "See the question map" },
  "hero.pathway.label": { ko: "질문 경로", en: "Pathway" },
  "hero.pause": { ko: "일시정지", en: "Pause" },
  "hero.play": { ko: "재생", en: "Play" },

  "type.question": { ko: "질문", en: "Question" },
  "type.concept": { ko: "개념", en: "Concept" },
  "type.theme": { ko: "주제", en: "Theme" },
  // Narrative and Perception are now distinct columns (production ontology).
  "type.narrative": { ko: "서사", en: "Narrative" },
  "type.perception": { ko: "인식", en: "Perception" },

  // Human-readable phrasing of each ontology layer. The interface leads with
  // these plain questions; the short academic term (above) is kept only as a
  // small caption. The internal ontology is unchanged.
  "layer.question": { ko: "사람들이 실제로 묻는 것", en: "What people actually ask" },
  "layer.concept": { ko: "이건 사실 무엇에 관한 걸까?", en: "What is this really about?" },
  "layer.theme": { ko: "어떤 더 큰 주제에 속할까?", en: "What larger topic does it belong to?" },
  "layer.narrative": { ko: "어떤 이야기를 강화할까?", en: "What story does it reinforce?" },
  "layer.perception": { ko: "한국의 어떤 이미지를 만들까?", en: "What image of Korea does it create?" },
  "layer.discovery": { ko: "이것이 무엇을 드러낼까?", en: "What does this reveal?" },
  "layer.insight": { ko: "발견 · 전략적 함의", en: "Insight · strategic implication" },
  "evidence.formed.narrative": { ko: "이 서사는 다음 질문들로부터 형성됩니다", en: "This narrative is formed from these questions" },
  "evidence.formed.perception": { ko: "이 인식은 다음 질문들로부터 형성됩니다", en: "This perception is formed from these questions" },
  "evidence.formed.generic": { ko: "이 층위는 다음 질문들로부터 형성됩니다", en: "This layer is formed from these questions" },
  // Short human-readable chips (for compact flow strips).
  "layer.short.question": { ko: "질문", en: "The question" },
  "layer.short.concept": { ko: "무엇에 관한가", en: "What it's about" },
  "layer.short.theme": { ko: "더 큰 주제", en: "The larger topic" },
  "layer.short.narrative": { ko: "강화되는 이야기", en: "The story it reinforces" },
  "layer.short.perception": { ko: "한국의 이미지", en: "The image of Korea" },
  "layer.short.discovery": { ko: "드러나는 것", en: "What it reveals" },

  "model.eyebrow": { ko: "질문을 읽는 법", en: "How we read a question" },
  "model.title": {
    ko: "질문 하나가 인식이 되기까지",
    en: "How one question becomes a perception",
  },
  "model.subtitle": {
    ko: "하나의 실제 질문을 따라가면, 각 단계가 어떻게 쌓여 한 나라의 이미지를 만드는지 보입니다.",
    en: "Follow one real question and you can see how each step stacks up into an image of a country.",
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
    ko: "서사가 남기는 한 문장의 인식. 질문이 도달하는 지점입니다.",
    en: "The one-line perception the narrative leaves behind. Where the question arrives.",
  },

  "pathways.eyebrow": { ko: "질문 경로", en: "Pathways" },
  "pathways.title": {
    ko: "여덟 개의 질문, 여덟 개의 한국",
    en: "Eight questions, eight Koreas",
  },
  "pathways.subtitle": {
    ko: "세계가 한국에 대해 던지는 질문은 서로 다른 한국을 만들어냅니다. 각 질문은 개념 → 주제 → 서사 → 인식 → 발견으로 이어집니다.",
    en: "The questions the world asks about Korea produce different Koreas. Each one leads through concept → theme → narrative → perception → insight.",
  },
  "pathways.view": { ko: "경로 보기", en: "View pathway" },
  "pathways.leadsTo": { ko: "이 질문이 만드는 인식", en: "The perception this question forms" },
  "pathway.meaning.eyebrow": { ko: "이 경로가 말해주는 것", en: "What this path tells us" },
  "pathway.meaning.what": { ko: "무슨 일이 일어났나", en: "What happened" },
  "pathway.meaning.why": { ko: "왜 그럴까?", en: "Why?" },
  "pathway.meaning.matters": { ko: "왜 중요한가", en: "So what?" },
  "pathway.structure.eyebrow": { ko: "질문에서 인식까지, 단계별로", en: "From question to perception, step by step" },
  "pathway.browseAll": { ko: "모든 주제 둘러보기", en: "Browse all topics" },
  "pathway.discovery.eyebrow": { ko: "그래서, 이것이 뜻하는 것", en: "So — what this means" },

  "topics.eyebrow": { ko: "주제로 둘러보기", en: "Browse by topic" },
  "topics.title": { ko: "세계는 한국의 무엇을 궁금해할까?", en: "What does the world ask about Korea?" },
  "topics.subtitle": {
    ko: "여덟 개의 주제로 들어가 보세요. 각 주제는 실제 질문들이 모여 만든 개념으로 이루어져 있습니다.",
    en: "Enter through eight topics. Each is built from the concepts that real questions cluster into.",
  },
  "topics.home.eyebrow": { ko: "여기서 시작하세요", en: "Start here" },
  "topics.home.title": { ko: "관심 있는 주제부터", en: "Begin with a topic" },
  "topics.home.subtitle": {
    ko: "세계가 한국에 대해 묻는 질문을 여덟 개의 주제로 나눴습니다.",
    en: "The world's questions about Korea, grouped into eight topics.",
  },
  "topics.all": { ko: "모든 주제 보기", en: "See all topics" },
  "topic.back": { ko: "모든 주제", en: "All topics" },
  "topic.subtopics": { ko: "이 주제 안의 개념", en: "Concepts in this topic" },
  "topic.perceptionLabel": { ko: "대표 인식", en: "The perception this forms" },
  "topic.pathLabel": { ko: "질문에서 발견까지", en: "From question to insight" },
  "topic.keyConcepts": { ko: "이 인식을 형성한 주요 개념", en: "The concepts that form this perception" },
  "topic.realQuestions": { ko: "대표 질문", en: "Representative questions" },
  "topic.conceptCount": { ko: "개 개념", en: "concepts" },
  "topic.questions": { ko: "질문", en: "questions" },
  "topic.explore.cta": { ko: "지도에서 보기", en: "See it on the map" },
  "topic.paths": { ko: "관련 질문의 길", en: "Related question paths" },
  "sitemap.eyebrow": { ko: "여기서 무엇을 할 수 있나", en: "What you can do here" },
  "sitemap.title": { ko: "이 사이트를 둘러보는 법", en: "Ways to explore this site" },
  "sitemap.paths.title": { ko: "대표 질문", en: "Key Questions" },
  "sitemap.paths.body": { ko: "하나의 질문이 어떻게 인식이 되는지 따라가 보세요.", en: "Follow how one question becomes a perception." },
  "sitemap.topics.title": { ko: "주제", en: "Topics" },
  "sitemap.topics.body": { ko: "관심 주제에서 시작해 관련 질문을 살펴보세요.", en: "Start from a topic and explore its questions." },
  "sitemap.explore.title": { ko: "질문 지도", en: "Question Map" },
  "sitemap.explore.body": { ko: "서로 다른 질문이 어디서 만나는지 한눈에 살펴보세요.", en: "See at a glance where different questions meet." },
  "sitemap.research.title": { ko: "리서치", en: "Research" },
  "sitemap.research.body": { ko: "이 패턴이 무엇을 뜻하는지 해석을 읽어보세요.", en: "Read what the patterns mean." },
  "sitemap.data.title": { ko: "데이터와 분석", en: "Data & Analysis" },
  "sitemap.data.body": { ko: "어떤 데이터를, 어떻게 모았는지 확인하세요.", en: "See what data we collected, and how." },

  "explore.eyebrow": { ko: "질문 지도", en: "The question map" },
  "explore.title": {
    ko: "서로 다른 질문은 어디서 만날까?",
    en: "Where do different questions meet?",
  },
  "explore.subtitle": {
    ko: "한 질문을 따라가면 다른 질문과 만나는 지점이 보입니다. ‘K-팝’과 ‘한국어’는 서로 다른 질문이지만, 결국 같은 인식으로 이어집니다. 이 지도는 그렇게 흩어진 질문들이 어떻게 하나의 한국 이미지를 만드는지 보여줍니다.",
    en: "Follow one question and you can see where it meets another. “K-pop” and “Korean language” are different questions, yet they arrive at the same perception. This map shows how scattered questions add up to a single image of Korea.",
  },
  "explore.cta": { ko: "질문 지도 열기", en: "Open the question map" },
  "explore.preview.badge": {
    ko: "인터랙티브 지도 · 노드를 클릭해 실제 질문을 확인하세요",
    en: "Interactive map · click a node to see the real questions",
  },
  "explore.back": { ko: "경로로 돌아가기", en: "Back to pathways" },
  "explore.legend": { ko: "노드 유형", en: "Node types" },
  "explore.hint": {
    ko: "노드에 커서를 올리면 연결된 경로 전체가 강조되고, 클릭하면 실제 질문이 열립니다. 노드를 드래그해 재배치할 수 있습니다.",
    en: "Hover a node to highlight the whole connected path, click to open the real questions, and drag to rearrange.",
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
    ko: "실제 수집 데이터로 생성된 질문 지도",
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
  "prov.marketList": { ko: "수집 시장", en: "Markets collected" },
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
