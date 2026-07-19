"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Database, ChevronDown, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getNode, PROVENANCE } from "@/lib/ontology";
import { type Topic, type TopicSlug } from "@/lib/topics";
import { MARKETS } from "@/lib/markets";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import allTopicQuestions from "@/lib/topic-questions.generated.json";
import translationData from "@/lib/translations.generated.json";

const translations = translationData as Record<string, { ko: string; en: string }>;

function getTranslation(qId: string, locale: "ko" | "en"): string | null {
  const t = translations[qId];
  return t ? t[locale] : null;
}

function QuestionTranslation({ qId, language, locale }: { qId: string; language: string; locale: "ko" | "en" }) {
  const needsTranslation = (locale === "ko" && language !== "ko") || (locale === "en" && language !== "en");
  if (!needsTranslation) return null;
  const tr = getTranslation(qId, locale);
  if (!tr) return null;
  return (
    <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
      {tr}
    </div>
  );
}

const LANG_LABEL: Record<string, { ko: string; en: string }> = {
  de: { ko: "독일어", en: "German" },
  en: { ko: "영어", en: "English" },
  pt: { ko: "포르투갈어", en: "Portuguese" },
  ar: { ko: "아랍어", en: "Arabic" },
  id: { ko: "인도네시아어", en: "Indonesian" },
  ko: { ko: "한국어", en: "Korean" },
  ja: { ko: "일본어", en: "Japanese" },
};

const TOPIC_INTRO: Record<TopicSlug, { ko: string; en: string }> = {
  hallyu: {
    ko: "한류는 세계가 한국에 접근하는 가장 강력한 입구다. 그러나 질문은 K-pop에서 끝나지 않는다. 음식, 언어, 역사, 사회로 확장된다. 한류는 문화 현상이 아니라 국가 이해의 출발점이다.",
    en: "Hallyu is the world's most powerful gateway to Korea. But the questions don't stop at K-pop — they expand into food, language, history, and society. Hallyu is not a cultural phenomenon; it's the starting point of understanding a country.",
  },
  diplomacy: {
    ko: "세계에게 한국은 아직 분단 국가다. 소프트파워가 아무리 강해도, 안보 프레임은 대체되지 않았다. 외교 질문은 한국 이미지의 또 다른 기저를 보여준다.",
    en: "To the world, Korea is still a divided nation. No matter how strong its soft power, the security frame has not been displaced. Diplomatic questions reveal another foundation of Korea's image.",
  },
  society: {
    ko: "관심이 깊어질수록 질문은 콘텐츠에서 사회로 이동한다. '한국인은 어떤 사람들인가'는 문화 소비의 다음 단계다.",
    en: "As interest deepens, questions move from content to society. 'What are Koreans like?' is the next stage beyond cultural consumption.",
  },
  language: {
    ko: "한국어에 대한 첫 번째 프레임은 '어려움'이다. 관심은 학습보다 빠르게 자라고 있고, 장벽은 어려운 언어가 아니라 부족한 입구다.",
    en: "The first frame for Korean is 'difficulty.' Interest is outrunning access — the barrier is not a hard language but the missing on-ramps.",
  },
  history: {
    ko: "가까운 국가는 현재보다 유산을 질문한다. 역사는 과거가 아니라 한국을 이해하는 또 하나의 입구다.",
    en: "Close countries ask about heritage over the present. History is not the past — it's another doorway into understanding Korea.",
  },
  tourism: {
    ko: "한국 여행은 콘텐츠 소비의 물리적 확장이다. 디지털에서 시작된 관심이 실제 공간으로 이동하는 순간이다.",
    en: "Visiting Korea is the physical extension of content consumption — the moment digital interest moves into real space.",
  },
  technology: {
    ko: "기술 강국 이미지는 질문보다 인식에 가깝다. 사람들은 삼성을 알지만, 한국의 기술 생태계를 질문하지는 않는다.",
    en: "Korea's tech reputation exists more as perception than as curiosity. People know Samsung, but they don't question Korea's tech ecosystem.",
  },
  economy: {
    ko: "경제 질문은 적지만, 경제 인식은 모든 주제에 스며들어 있다. 경제는 독립된 관심사가 아니라 다른 주제의 배경이다.",
    en: "Economic questions are few, but economic perception pervades every topic. Economy is not a standalone interest — it's the backdrop of other themes.",
  },
};

type L = { ko: string; en: string };
type ExpansionData = {
  title: L; intro: L; entry: L;
  steps: { label: L; note: L; desc: L }[];
};

const TOPIC_EXPANSION: Record<TopicSlug, ExpansionData> = {
  hallyu: {
    title: { ko: "한류가 연결하는 한국", en: "Korea through Hallyu" },
    intro: {
      ko: "한류 질문은 하나의 콘텐츠에서 끝나지 않는다.\n\n사람들은 K-pop과 드라마를 계기로 한국을 만나지만, 관심은 음식과 생활문화로 확장되고, 언어와 사회에 대한 이해로 이어진다.\n\n아래 구조는 332개의 한류 질문을 분석해 정리한 대표적인 관심 확장 구조다.",
      en: "Hallyu questions don’t end with a single piece of content.\n\nPeople first encounter Korea through K-pop and dramas, but their interest expands into food and daily culture, then deepens into language and society.\n\nThe structure below maps the representative expansion of interest, organized from 332 Hallyu questions.",
    },
    entry: { ko: "Why is K-pop popular?", en: "Why is K-pop popular?" },
    steps: [
      { label: { ko: "K-pop · 아이돌", en: "K-pop · Idols" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "세계가 한국을 처음 만나는 가장 강력한 진입점. 아티스트, 음악, 팬덤, 공연 관련 질문이 집중된다.", en: "The world’s most powerful entry point to Korea. Questions concentrate on artists, music, fandoms, and performances." } },
      { label: { ko: "드라마 · 영상 콘텐츠", en: "Drama · Visual content" }, note: { ko: "문화 이해", en: "Cultural understanding" }, desc: { ko: "관심은 음악을 넘어 이야기와 캐릭터로 확장된다. 드라마, 영화, 예능 관련 질문이 등장한다.", en: "Interest expands beyond music into stories and characters. Questions about dramas, films, and variety shows emerge." } },
      { label: { ko: "음식 · 생활문화", en: "Food · Daily culture" }, note: { ko: "일상 관심", en: "Daily life" }, desc: { ko: "콘텐츠 속에서 본 음식과 일상이 궁금해진다. 김치, 한식, 식사 문화, 생활 습관 질문이 증가한다.", en: "Curiosity grows about the food and daily life seen in content. Questions about kimchi, Korean cuisine, dining culture, and lifestyle habits increase." } },
      { label: { ko: "한국어", en: "Korean language" }, note: { ko: "직접 이해", en: "Direct understanding" }, desc: { ko: "콘텐츠를 더 깊게 이해하기 위해 언어 자체에 대한 관심이 시작된다.", en: "Interest in the language itself begins, driven by the desire to understand content more deeply." } },
      { label: { ko: "한국 사회", en: "Korean society" }, note: { ko: "사회 이해", en: "Social understanding" }, desc: { ko: "관심은 결국 사람과 사회로 이동한다. 교육, 예절, 관계 문화, 한국인의 생활 방식에 대한 질문으로 확장된다.", en: "Interest ultimately moves to people and society. Questions expand into education, etiquette, relationship culture, and Korean lifestyles." } },
    ],
  },
  language: {
    title: { ko: "언어가 연결하는 한국", en: "Korea through Language" },
    intro: {
      ko: "한국어에 대한 관심은 문자와 발음에서 시작되지만 거기서 끝나지 않는다.\n\n문법과 표현을 익히면서 한국의 역사와 정체성에 닿고, 결국 한국 사회 자체를 이해하는 방향으로 확장된다.",
      en: "Interest in Korean starts with its alphabet and pronunciation, but doesn’t end there.\n\nAs learners explore grammar and expressions, they touch on Korea’s history and identity, ultimately expanding toward understanding Korean society itself.",
    },
    entry: { ko: "Is Korean hard?", en: "Is Korean hard?" },
    steps: [
      { label: { ko: "발음 · 문자", en: "Pronunciation · Script" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "한글의 구조와 발음 체계가 첫 번째 관심사다. 배우기 쉬운가, 어떻게 읽는가에서 시작된다.", en: "Hangul’s structure and phonetic system are the first objects of curiosity. It starts with: is it easy to learn, how do you read it?" } },
      { label: { ko: "문법 · 표현", en: "Grammar · Expressions" }, note: { ko: "체계 이해", en: "Systematic understanding" }, desc: { ko: "문자를 넘어 문장 구조와 표현 방식으로 관심이 이동한다. 존댓말, 어순, 조사 등이 핵심 질문이다.", en: "Interest moves beyond script into sentence structure and expression. Honorifics, word order, and particles become key questions." } },
      { label: { ko: "역사", en: "History" }, note: { ko: "배경 이해", en: "Background" }, desc: { ko: "한글이 왜 만들어졌는가, 한국어는 어디서 왔는가. 언어의 기원이 역사적 맥락으로 확장된다.", en: "Why was Hangul created? Where does Korean come from? The origin of the language expands into historical context." } },
      { label: { ko: "정체성", en: "Identity" }, note: { ko: "깊은 이해", en: "Deeper understanding" }, desc: { ko: "언어가 한국인의 사고방식과 문화적 정체성에 어떤 영향을 미치는지 질문이 깊어진다.", en: "Questions deepen into how the language shapes Korean ways of thinking and cultural identity." } },
      { label: { ko: "한국 사회", en: "Korean society" }, note: { ko: "사회 이해", en: "Social understanding" }, desc: { ko: "언어를 통해 한국의 관계 문화, 위계, 소통 방식을 이해하게 된다.", en: "Through language, one comes to understand Korea’s relationship culture, hierarchy, and communication norms." } },
    ],
  },
  tourism: {
    title: { ko: "관광이 연결하는 한국", en: "Korea through Tourism" },
    intro: {
      ko: "한국 여행에 대한 질문은 관광지에서 시작되지만, 도시와 안전, 생활환경으로 확장된다.\n\n디지털에서 시작된 관심이 실제 공간으로 이동하는 과정이다.",
      en: "Questions about visiting Korea start with destinations, but expand into cities, safety, and living conditions.\n\nIt’s the process of digital interest moving into physical space.",
    },
    entry: { ko: "Is Korea safe?", en: "Is Korea safe?" },
    steps: [
      { label: { ko: "여행지", en: "Destinations" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "어디를 가야 하는가, 무엇을 봐야 하는가. 관광의 출발점은 구체적인 장소다.", en: "Where to go, what to see. Tourism starts with specific places." } },
      { label: { ko: "도시", en: "Cities" }, note: { ko: "공간 이해", en: "Spatial understanding" }, desc: { ko: "서울을 넘어 부산, 제주 등 도시 단위의 관심으로 확장된다.", en: "Interest expands beyond Seoul into city-level curiosity about Busan, Jeju, and more." } },
      { label: { ko: "안전", en: "Safety" }, note: { ko: "생활 관심", en: "Practical concern" }, desc: { ko: "실제로 방문하기 전에 안전과 치안에 대한 질문이 나타난다.", en: "Questions about safety and security appear before an actual visit." } },
      { label: { ko: "생활환경", en: "Living environment" }, note: { ko: "일상 이해", en: "Daily life" }, desc: { ko: "여행을 넘어 한국에서의 생활 자체에 대한 관심으로 이동한다.", en: "Interest moves beyond tourism into what it’s like to actually live in Korea." } },
      { label: { ko: "한국 사회", en: "Korean society" }, note: { ko: "사회 이해", en: "Social understanding" }, desc: { ko: "공간에서 시작된 관심이 결국 한국 사람과 사회에 대한 이해로 이어진다.", en: "Curiosity that started with space ultimately leads to understanding Korean people and society." } },
    ],
  },
  history: {
    title: { ko: "역사가 연결하는 한국", en: "Korea through History" },
    intro: {
      ko: "역사에 대한 질문은 특정 사건에서 시작되지만, 인물과 기억을 거쳐 한국의 정체성과 현재로 이어진다.\n\n역사는 과거가 아니라 한국을 이해하는 또 하나의 경로다.",
      en: "Questions about history start with specific events, but lead through figures and memory to Korea’s identity and present.\n\nHistory is not the past — it’s another pathway to understanding Korea.",
    },
    entry: { ko: "What is hanbok?", en: "What is hanbok?" },
    steps: [
      { label: { ko: "사건", en: "Events" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "한국전쟁, 일제강점기, 민주화 운동 등 구체적 사건이 첫 번째 질문이다.", en: "The Korean War, Japanese occupation, democratization — specific events are the first questions." } },
      { label: { ko: "인물", en: "Figures" }, note: { ko: "인물 이해", en: "People" }, desc: { ko: "사건 속 인물로 관심이 이동한다. 역사적 지도자, 문화적 인물에 대한 질문이 나타난다.", en: "Interest moves to figures within events. Questions emerge about historical leaders and cultural figures." } },
      { label: { ko: "기억", en: "Memory" }, note: { ko: "시간 이해", en: "Temporal understanding" }, desc: { ko: "과거의 사건이 현재 한국인에게 어떤 의미인지 질문이 깊어진다.", en: "Questions deepen into what past events mean to present-day Koreans." } },
      { label: { ko: "정체성", en: "Identity" }, note: { ko: "깊은 이해", en: "Deeper understanding" }, desc: { ko: "역사적 경험이 한국의 국가 정체성과 자기 인식에 어떻게 작용하는지 묻는다.", en: "Questions ask how historical experience shapes Korea’s national identity and self-perception." } },
      { label: { ko: "현대 한국", en: "Modern Korea" }, note: { ko: "현재 이해", en: "Present understanding" }, desc: { ko: "역사는 결국 오늘의 한국을 이해하는 배경이 된다.", en: "History ultimately becomes the backdrop for understanding today’s Korea." } },
    ],
  },
  diplomacy: {
    title: { ko: "외교가 연결하는 한국", en: "Korea through Diplomacy" },
    intro: {
      ko: "외교 질문은 국제관계에서 시작되지만, 분단과 안보를 거쳐 한국의 국가 이미지와 역할로 이어진다.\n\n소프트파워 너머에 있는 한국의 또 다른 인식 구조다.",
      en: "Diplomatic questions start with international relations, but lead through division and security to Korea’s national image and role.\n\nIt’s the perception structure that lies beyond soft power.",
    },
    entry: { ko: "Why is Korea divided?", en: "Why is Korea divided?" },
    steps: [
      { label: { ko: "국제관계", en: "International relations" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "한국과 주변국의 관계, 동맹 구조가 첫 번째 질문이다.", en: "Relations between Korea and its neighbors, alliance structures — these are the first questions." } },
      { label: { ko: "분단", en: "Division" }, note: { ko: "구조 이해", en: "Structural understanding" }, desc: { ko: "왜 나뉘었는가, 통일은 가능한가. 분단 자체가 핵심 질문이 된다.", en: "Why was it divided? Is reunification possible? Division itself becomes the central question." } },
      { label: { ko: "안보", en: "Security" }, note: { ko: "안보 이해", en: "Security understanding" }, desc: { ko: "북한의 핵, 군사적 긴장, 징병제 등 안보 관련 질문으로 확장된다.", en: "Questions expand into North Korean nuclear issues, military tensions, and conscription." } },
      { label: { ko: "국가 이미지", en: "National image" }, note: { ko: "인식 이해", en: "Perception" }, desc: { ko: "한국은 분단 국가인가, 문화 강국인가. 국가 이미지에 대한 질문이 등장한다.", en: "Is Korea a divided nation or a cultural powerhouse? Questions about national image emerge." } },
      { label: { ko: "한국의 역할", en: "Korea’s role" }, note: { ko: "역할 이해", en: "Role understanding" }, desc: { ko: "동아시아와 세계에서 한국이 어떤 위치에 있는지 묻는다.", en: "Questions ask about Korea’s position in East Asia and the world." } },
    ],
  },
  society: {
    title: { ko: "사회가 연결하는 한국", en: "Korea through Society" },
    intro: {
      ko: "사회에 대한 질문은 예절과 관계에서 시작되지만, 가족과 교육을 거쳐 한국 사회의 구조 자체로 이어진다.\n\n콘텐츠 소비의 다음 단계에서 나타나는 질문들이다.",
      en: "Questions about society start with etiquette and relationships, but lead through family and education to the structure of Korean society itself.\n\nThese are the questions that emerge in the stage beyond content consumption.",
    },
    entry: { ko: "Why do Koreans care about age?", en: "Why do Koreans care about age?" },
    steps: [
      { label: { ko: "예절", en: "Etiquette" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "인사법, 식사 예절, 나이 문화 등 가장 눈에 띄는 사회적 규범이 첫 질문이다.", en: "Greetings, dining manners, age culture — the most visible social norms are the first questions." } },
      { label: { ko: "관계", en: "Relationships" }, note: { ko: "관계 이해", en: "Relational understanding" }, desc: { ko: "선후배, 존댓말, 위계 등 한국 특유의 관계 구조에 대한 질문이 나타난다.", en: "Questions appear about Korea’s distinctive relationship structures: seniority, honorifics, hierarchy." } },
      { label: { ko: "가족", en: "Family" }, note: { ko: "가족 이해", en: "Family understanding" }, desc: { ko: "가족 관계, 결혼 문화, 세대 차이 등 사적 영역으로 관심이 확장된다.", en: "Interest expands into the private sphere: family relationships, marriage culture, generational gaps." } },
      { label: { ko: "교육", en: "Education" }, note: { ko: "제도 이해", en: "Institutional understanding" }, desc: { ko: "한국의 교육열, 입시 문화, 학업 스트레스에 대한 질문이 등장한다.", en: "Questions emerge about Korea’s educational fervor, exam culture, and academic stress." } },
      { label: { ko: "한국 사회 구조", en: "Korean social structure" }, note: { ko: "구조 이해", en: "Structural understanding" }, desc: { ko: "개별 현상을 넘어 한국 사회가 왜 이렇게 작동하는지 묻는다.", en: "Beyond individual phenomena, questions ask why Korean society operates the way it does." } },
    ],
  },
  economy: {
    title: { ko: "경제가 연결하는 한국", en: "Korea through Economy" },
    intro: {
      ko: "경제에 대한 질문은 기업과 브랜드에서 시작되지만, 산업 구조와 성장 모델을 거쳐 한국 경제 전체의 구조로 이어진다.\n\n경제는 독립된 관심사가 아니라 다른 주제의 배경이기도 하다.",
      en: "Questions about the economy start with companies and brands, but lead through industrial structure and growth models to the structure of Korea’s economy as a whole.\n\nEconomy is not a standalone interest — it’s also the backdrop of other themes.",
    },
    entry: { ko: "How big is Samsung?", en: "How big is Samsung?" },
    steps: [
      { label: { ko: "기업", en: "Companies" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "삼성, 현대, LG 등 글로벌 기업이 한국 경제의 첫 번째 진입점이다.", en: "Samsung, Hyundai, LG — global corporations are the first entry point to Korea’s economy." } },
      { label: { ko: "산업", en: "Industry" }, note: { ko: "산업 이해", en: "Industrial understanding" }, desc: { ko: "개별 기업을 넘어 반도체, 자동차, 조선 등 산업 단위로 관심이 확장된다.", en: "Interest expands beyond individual companies into industries: semiconductors, automotive, shipbuilding." } },
      { label: { ko: "성장", en: "Growth" }, note: { ko: "성장 이해", en: "Growth understanding" }, desc: { ko: "한강의 기적, 압축 성장 등 한국의 경제 발전 과정에 대한 질문이 나타난다.", en: "Questions emerge about Korea’s economic development: the Miracle on the Han River, compressed growth." } },
      { label: { ko: "일자리", en: "Employment" }, note: { ko: "생활 관심", en: "Livelihood" }, desc: { ko: "청년 실업, 근무 환경, 워라밸 등 경제의 일상적 측면으로 이동한다.", en: "Interest moves to the everyday side: youth unemployment, working conditions, work-life balance." } },
      { label: { ko: "한국 경제 구조", en: "Korean economic structure" }, note: { ko: "구조 이해", en: "Structural understanding" }, desc: { ko: "재벌 체제, 수출 의존, 내수 시장 등 한국 경제의 구조적 특성을 묻는다.", en: "Questions address structural characteristics: chaebol system, export dependence, domestic market." } },
    ],
  },
  technology: {
    title: { ko: "기술이 연결하는 한국", en: "Korea through Technology" },
    intro: {
      ko: "기술에 대한 질문은 브랜드와 제품에서 시작되지만, 혁신과 산업을 거쳐 한국의 발전 모델 자체로 이어진다.\n\n기술 강국이라는 인식이 어떤 층위로 구성되어 있는지 보여준다.",
      en: "Questions about technology start with brands and products, but lead through innovation and industry to Korea’s development model itself.\n\nIt reveals the layers that compose the perception of Korea as a tech powerhouse.",
    },
    entry: { ko: "Why is Korean internet fast?", en: "Why is Korean internet fast?" },
    steps: [
      { label: { ko: "브랜드", en: "Brands" }, note: { ko: "첫 관심", en: "First interest" }, desc: { ko: "삼성, LG 등 글로벌 브랜드가 한국 기술의 첫 번째 인식이다.", en: "Samsung, LG — global brands are the first perception of Korean technology." } },
      { label: { ko: "혁신", en: "Innovation" }, note: { ko: "혁신 이해", en: "Innovation understanding" }, desc: { ko: "초고속 인터넷, 디지털 인프라, 스마트 시티 등 혁신 사례로 관심이 확장된다.", en: "Interest expands into innovation cases: ultra-fast internet, digital infrastructure, smart cities." } },
      { label: { ko: "산업", en: "Industry" }, note: { ko: "산업 이해", en: "Industrial understanding" }, desc: { ko: "반도체, 디스플레이, 배터리 등 기술 산업의 구조로 질문이 깊어진다.", en: "Questions deepen into tech industry structure: semiconductors, displays, batteries." } },
      { label: { ko: "국가 경쟁력", en: "National competitiveness" }, note: { ko: "경쟁 이해", en: "Competitive understanding" }, desc: { ko: "한국이 기술 분야에서 어떤 위치에 있는지, 어떻게 경쟁하는지 묻는다.", en: "Questions ask where Korea stands in the tech landscape and how it competes." } },
      { label: { ko: "한국의 발전 모델", en: "Korea’s development model" }, note: { ko: "모델 이해", en: "Model understanding" }, desc: { ko: "기술 발전이 한국의 국가 발전과 어떻게 연결되는지 묻는 질문으로 확장된다.", en: "Questions expand into how technological advancement connects to Korea’s national development." } },
    ],
  },
};

const COUNTRY_FLAG: Record<string, string> = {
  US: "\u{1f1fa}\u{1f1f8}", DE: "\u{1f1e9}\u{1f1ea}", IN: "\u{1f1ee}\u{1f1f3}", ID: "\u{1f1ee}\u{1f1e9}",
  JP: "\u{1f1ef}\u{1f1f5}", BR: "\u{1f1e7}\u{1f1f7}", AE: "\u{1f1e6}\u{1f1ea}", KR: "\u{1f1f0}\u{1f1f7}",
};

interface ConceptQuestion {
  id: string;
  text: string;
  countries: string[];
  language: string;
  frequency: number;
}

interface TopicQuestion extends ConceptQuestion {
  conceptId: string;
}

interface TopicData {
  count: number;
  questions: TopicQuestion[];
  concepts: Record<string, ConceptQuestion[]>;
}

const PAGE_SIZE = 30;

export function TopicView({ topic }: { topic: Topic }) {
  const { t, locale } = useLanguage();

  const topicData = (allTopicQuestions as unknown as Record<string, TopicData>)[topic.slug];
  const allQuestions = useMemo(() => topicData?.questions ?? [], [topicData]);
  const conceptCounts = topicData?.concepts ?? {};

  const questionCount = allQuestions.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const countriesInTopic = useMemo(() => {
    const set = new Set<string>();
    for (const q of allQuestions) for (const c of q.countries) set.add(c);
    return MARKETS.filter((m) => set.has(m.code)).map((m) => m.code);
  }, [allQuestions]);

  const filtered = useMemo(() => {
    let qs = allQuestions;
    if (selectedConcept) qs = qs.filter((q) => q.conceptId === selectedConcept);
    if (selectedCountry) qs = qs.filter((q) => q.countries.includes(selectedCountry));
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      qs = qs.filter((q) => {
        if (q.text.toLowerCase().includes(lower)) return true;
        const tr = getTranslation(q.id, locale);
        return tr ? tr.toLowerCase().includes(lower) : false;
      });
    }
    return qs;
  }, [allQuestions, selectedConcept, selectedCountry, searchQuery]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const intro = TOPIC_INTRO[topic.slug as TopicSlug];

  const conceptDistribution = topic.concepts.map((cid) => ({
    id: cid,
    label: getNode(cid).label[locale],
    count: (conceptCounts[cid] ?? []).length,
  })).sort((a, b) => b.count - a.count);

  const maxConceptCount = conceptDistribution[0]?.count ?? 1;

  // Country profile: when a country is selected, compute its stats
  const countryProfile = useMemo(() => {
    if (!selectedCountry) return null;
    const qs = allQuestions.filter((q) => q.countries.includes(selectedCountry));
    const conceptMap: Record<string, number> = {};
    for (const q of qs) {
      conceptMap[q.conceptId] = (conceptMap[q.conceptId] ?? 0) + 1;
    }
    const distribution = Object.entries(conceptMap)
      .map(([cid, count]) => ({ id: cid, label: getNode(cid).label[locale], count }))
      .sort((a, b) => b.count - a.count);
    const total = qs.length;
    const topQuestions = qs.slice(0, 5);
    const uniqueQuestions = qs.filter((q) => q.countries.length === 1);
    return { total, distribution, topQuestions, uniqueQuestions };
  }, [selectedCountry, allQuestions, locale]);

  // Representative questions: top 5 most frequent questions in this topic
  const representativeQuestions = useMemo(() => {
    return [...allQuestions]
      .sort((a, b) => b.frequency - a.frequency || b.countries.length - a.countries.length)
      .slice(0, 5);
  }, [allQuestions]);

  // Related questions for expanded question
  const relatedQuestions = useMemo(() => {
    if (!expandedQuestion) return [];
    const q = allQuestions.find((x) => x.id === expandedQuestion);
    if (!q) return [];
    return allQuestions
      .filter((x) => x.id !== q.id && x.conceptId === q.conceptId)
      .slice(0, 8);
  }, [expandedQuestion, allQuestions]);

  const clearFilters = () => {
    setSelectedConcept(null);
    setSelectedCountry(null);
    setSearchQuery("");
    setShowCount(PAGE_SIZE);
  };

  const hasActiveFilter = selectedConcept || selectedCountry || searchQuery.trim();

  const market = selectedCountry ? MARKETS.find((m) => m.code === selectedCountry) : null;

  const expansion = TOPIC_EXPANSION[topic.slug as TopicSlug];

  return (
    <>
      <Navbar />
      <main>
        {/* -- Hero -- */}
        <section className="relative border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-14 pt-24 sm:pb-16 sm:pt-28">
            <Link href="/topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" />
              {t("topic.back")}
            </Link>
            <Reveal>
              <h1
                className="mt-6 text-[2.8rem] font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[3.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {topic.title[locale]}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p
                className="mt-4 max-w-[760px] text-[18px] leading-relaxed text-secondary sm:text-[20px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {topic.tagline[locale]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[2rem] font-bold text-navy sm:text-[2.5rem]">
                {questionCount.toLocaleString()}
                <span className="text-[1.1rem] font-semibold text-muted-foreground sm:text-[1.25rem]">
                  {locale === "ko" ? "개 실제 질문" : " real questions"}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-secondary sm:text-[16px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {intro?.[locale] ?? topic.tagline[locale]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* -- Topic Expansion Structure -- */}
        {expansion && (
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "확장" : "Expansion"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {expansion.title[locale]}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-4 max-w-[640px]">
                {expansion.intro[locale].split("\n\n").map((para, i) => (
                  <p key={i} className="mt-3 text-[15px] leading-relaxed text-secondary first:mt-0" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
            <div className="mx-auto mt-10 max-w-[520px]">
              <Reveal delay={0.12}>
                <div className="flex flex-col items-center">
                  <div className="rounded-xl border border-dashed border-brand/40 bg-brand/[0.03] px-5 py-3 text-center">
                    <span className="text-[14px] font-medium italic text-brand">{expansion.entry[locale]}</span>
                  </div>
                  <div className="flex h-7 items-center justify-center">
                    <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                </div>
              </Reveal>
              {expansion.steps.map((step, i) => (
                <Reveal key={i} delay={0.14 + i * 0.04}>
                  <div className="flex flex-col items-center">
                    <div className="w-full rounded-xl border border-border bg-white px-5 py-3.5 shadow-sm" style={{ borderLeft: "3px solid var(--color-brand, #3B5BDB)" }}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                          {i + 1}
                        </span>
                        <span className="text-[14px] font-medium leading-snug text-navy">
                          {step.label[locale]}
                        </span>
                        <span className="text-[11px] text-muted-foreground">({step.note[locale]})</span>
                      </div>
                      <p className="mt-1.5 pl-9 text-[13px] leading-relaxed text-secondary" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
                        {step.desc[locale]}
                      </p>
                    </div>
                    {i < expansion.steps.length - 1 && (
                      <div className="flex h-7 items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* -- Concept Distribution -- */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "질문 분포" : "Question distribution"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? `${questionCount.toLocaleString()}개의 질문은 무엇에 집중되었을까?`
                  : `What do ${questionCount.toLocaleString()} questions focus on?`}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {conceptDistribution.map((cd, i) => {
                const pct = Math.round((cd.count / questionCount) * 100);
                return (
                  <Reveal key={cd.id} delay={i * 0.03}>
                    <button
                      onClick={() => {
                        setSelectedConcept(selectedConcept === cd.id ? null : cd.id);
                        setShowCount(PAGE_SIZE);
                      }}
                      className="group flex w-full items-center gap-4 text-left transition-opacity hover:opacity-80"
                    >
                      <div className="w-20 shrink-0 text-right sm:w-28">
                        <div className="text-[13px] font-semibold text-navy">{cd.label}</div>
                        <div className="text-[11px] tabular-nums text-muted-foreground">{cd.count}{locale === "ko" ? "개" : ""} · {pct}%</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-7 overflow-hidden rounded-lg bg-border/30">
                          <div
                            className={`flex h-full items-center rounded-lg px-3 transition-all duration-500 ${
                              selectedConcept === cd.id ? "bg-brand" : "bg-brand/55 group-hover:bg-brand/75"
                            }`}
                            style={{ width: `${Math.max(8, Math.round((cd.count / maxConceptCount) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* -- Representative Questions -- */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "대표 질문" : "Representative questions"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "이 주제에서 가장 자주 등장한 질문"
                  : "Most frequently asked in this topic"}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {representativeQuestions.map((q, i) => {
                const conceptNode = getNode(q.conceptId);
                return (
                  <Reveal key={q.id} delay={i * 0.04}>
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-4">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-[14px] font-medium leading-snug text-navy">{q.text}</span>
                        <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        <div className="mt-1.5 flex items-center gap-2.5">
                          <span className="rounded bg-brand/8 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                            {conceptNode.label[locale]}
                          </span>
                          <span className="text-[10px] tabular-nums text-muted-foreground">
                            {q.countries.length}{locale === "ko" ? "개국" : " countries"}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {q.countries.map((c) => COUNTRY_FLAG[c] ?? c).join(" ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* -- Question Archive -- */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "질문 아카이브" : "Question archive"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "세계는 실제로 무엇을 검색했을까?"
                  : "What did the world actually search?"}
              </h2>
            </Reveal>

            {/* Search + Filters */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowCount(PAGE_SIZE); }}
                  placeholder={locale === "ko" ? "질문 검색..." : "Search questions..."}
                  className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-[14px] text-navy outline-none transition-shadow placeholder:text-muted-foreground/50 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-navy">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedConcept(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    !selectedConcept ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "전체" : "All"}
                </button>
                {topic.concepts.map((cid) => {
                  const node = getNode(cid);
                  const count = (conceptCounts[cid] ?? []).length;
                  return (
                    <button
                      key={cid}
                      onClick={() => { setSelectedConcept(selectedConcept === cid ? null : cid); setShowCount(PAGE_SIZE); }}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                        selectedConcept === cid ? "bg-brand text-white" : "bg-white text-secondary hover:bg-brand/5"
                      }`}
                    >
                      {node.label[locale]} {count}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCountry(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedCountry ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 국가" : "All countries"}
                </button>
                {countriesInTopic.map((code) => {
                  const m = MARKETS.find((x) => x.code === code);
                  return (
                    <button
                      key={code}
                      onClick={() => { setSelectedCountry(selectedCountry === code ? null : code); setShowCount(PAGE_SIZE); }}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        selectedCountry === code ? "bg-brand text-white" : "bg-white text-secondary hover:bg-navy/5"
                      }`}
                    >
                      {COUNTRY_FLAG[code]} {m?.name[locale] ?? code}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilter && (
                <div className="flex items-center gap-2 text-[12px] text-secondary">
                  <span>
                    {locale === "ko"
                      ? `${filtered.length.toLocaleString()}개 결과`
                      : `${filtered.length.toLocaleString()} results`}
                  </span>
                  <button onClick={clearFilters} className="text-brand hover:underline">
                    {locale === "ko" ? "초기화" : "Clear"}
                  </button>
                </div>
              )}
            </div>

            {/* -- Country Profile Card -- */}
            {selectedCountry && countryProfile && (
              <div className="mt-5 rounded-2xl border border-brand/20 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{COUNTRY_FLAG[selectedCountry]}</span>
                  <div>
                    <div className="text-[1.1rem] font-bold text-navy">{market?.name[locale] ?? selectedCountry}</div>
                    <div className="text-[12px] text-muted-foreground">
                      {locale === "ko"
                        ? `${countryProfile.total}개 질문 · 이 나라만의 질문 ${countryProfile.uniqueQuestions.length}개`
                        : `${countryProfile.total} questions · ${countryProfile.uniqueQuestions.length} unique to this country`}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "주요 관심사" : "Top interests"}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {countryProfile.distribution.slice(0, 4).map((d) => {
                        const pct = Math.round((d.count / countryProfile.total) * 100);
                        return (
                          <div key={d.id} className="flex items-center gap-2">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border/40">
                              <div className="h-full rounded-full bg-brand/60" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-20 shrink-0 text-[11px] font-medium text-navy">{d.label}</span>
                            <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "대표 질문" : "Top questions"}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {countryProfile.topQuestions.map((q) => (
                        <div key={q.id}>
                          <div className="text-[13px] font-medium text-navy">{q.text}</div>
                          <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question List */}
            <div className="mt-5 space-y-1.5">
              {visible.map((q) => {
                const conceptNode = getNode(q.conceptId);
                const isExpanded = expandedQuestion === q.id;
                const related = isExpanded ? relatedQuestions : [];

                return (
                  <div key={q.id}>
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                        isExpanded
                          ? "border-brand/30 bg-white shadow-sm"
                          : "border-border/60 bg-white hover:border-border hover:shadow-sm"
                      }`}
                    >
                      <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      <div className="min-w-0 flex-1">
                        <div className="min-w-0 flex-1">
                          <span className="text-[14px] font-medium leading-snug text-navy">{q.text}</span>
                          <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        </div>
                        <div className="mt-1 flex items-center gap-2.5">
                          <span className="rounded bg-brand/8 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                            {conceptNode.label[locale]}
                          </span>
                          {q.language !== locale && LANG_LABEL[q.language] && (
                            <span className="rounded bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {LANG_LABEL[q.language][locale]}
                            </span>
                          )}
                          <span className="text-[10px] tabular-nums text-muted-foreground">
                            {q.countries.length}{locale === "ko" ? "개국" : " countries"}
                          </span>
                          <span className="text-[9px] text-muted-foreground/60">
                            {q.countries.map((c) => COUNTRY_FLAG[c] ?? c).join(" ")}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* -- Expanded: related questions -- */}
                    {isExpanded && related.length > 0 && (
                      <div className="ml-6 mt-1.5 rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {locale === "ko" ? "관련 질문" : "Related questions"}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {related.map((rq) => (
                            <button
                              key={rq.id}
                              onClick={() => setExpandedQuestion(rq.id)}
                              className="rounded-lg border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-secondary transition-colors hover:border-brand/30 hover:text-navy"
                            >
                              {rq.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {visible.length === 0 && (
                <div className="py-12 text-center text-[14px] text-muted-foreground">
                  {locale === "ko" ? "검색 결과가 없습니다" : "No questions found"}
                </div>
              )}
            </div>

            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-[13px] font-semibold text-navy transition-all hover:shadow-md"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  {locale === "ko"
                    ? `더 보기 (${Math.min(PAGE_SIZE, filtered.length - showCount)}개 더)`
                    : `Show more (${Math.min(PAGE_SIZE, filtered.length - showCount)} more)`}
                </button>
                <div className="mt-1.5 text-[11px] text-muted-foreground">
                  {locale === "ko"
                    ? `${visible.length}/${filtered.length}개 표시`
                    : `Showing ${visible.length} of ${filtered.length}`}
                </div>
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="mt-5 text-center text-[11px] text-muted-foreground">
                {locale === "ko"
                  ? `${filtered.length.toLocaleString()}개 질문 전체 표시`
                  : `Showing all ${filtered.length.toLocaleString()} questions`}
              </div>
            )}
          </div>
        </section>


        {/* -- Data Source -- */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1280px] py-10 sm:py-12">
            <Reveal>
              <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-brand" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {locale === "ko" ? "데이터 출처" : "Data source"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "질문" : "Questions"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{questionCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "언어" : "Languages"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{PROVENANCE.languages}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "국가" : "Markets"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{PROVENANCE.markets}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "출처" : "Source"}</div>
                    <div className="text-[15px] font-bold text-navy">{PROVENANCE.method}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
