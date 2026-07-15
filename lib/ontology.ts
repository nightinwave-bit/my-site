import type { Locale } from "@/lib/i18n";

export type Localized = { ko: string; en: string };

export function loc(v: Localized, locale: Locale): string {
  return v[locale];
}

export type NodeType = "question" | "concept" | "theme" | "narrative";
export type Platform = "google" | "paa" | "autocomplete" | "reddit";

export interface Evidence {
  q: Localized;
  platform: Platform;
}

export interface OntologyNode {
  id: string;
  type: NodeType;
  label: Localized;
  blurb: Localized;
  evidence?: Evidence[];
}

/** A step within a pathway: a node, plus the relationship verb linking it to
 *  the previous node (undefined for the first node). */
export interface Step {
  nodeId: string;
  verb?: Localized;
}

export interface Pathway {
  id: string;
  /** The originating question, used as the pathway's title. */
  title: Localized;
  themeLabel: Localized;
  steps: Step[];
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  google: "Google Search",
  paa: "People Also Ask",
  autocomplete: "Autocomplete",
  reddit: "Reddit",
};

// ── Verb lexicon (relationship types) ─────────────────────────────────────
const V = {
  explainedBy: { ko: "~로 설명됩니다", en: "explained by" },
  practicedAs: { ko: "~로 실천됩니다", en: "practiced as" },
  recognizedBy: { ko: "~에 의해 인정됩니다", en: "recognized by" },
  expresses: { ko: "~를 표현합니다", en: "expresses" },
  caused: { ko: "~를 초래했습니다", en: "caused" },
  materializedAs: { ko: "~로 구체화됩니다", en: "materialized as" },
  situatedIn: { ko: "~ 속에 위치합니다", en: "situated in" },
  openQuestion: { ko: "미해결 과제로 남습니다", en: "remains an open question" },
  driverOf: { ko: "~의 동력이 됩니다", en: "driver of" },
  gatewayTo: { ko: "~로 가는 관문입니다", en: "gateway to" },
  instrumentOf: { ko: "~의 수단이 됩니다", en: "instrument of" },
  produces: { ko: "~를 만들어냅니다", en: "produces" },
  designedAs: { ko: "~로 설계되었습니다", en: "designed as" },
  enables: { ko: "~를 가능하게 합니다", en: "enables" },
  builtOn: { ko: "~ 위에 세워집니다", en: "built on" },
  drivenBy: { ko: "~에 의해 추동됩니다", en: "driven by" },
  reinforces: { ko: "~를 강화합니다", en: "reinforces" },
  shapedInto: { ko: "~라는 인식이 됩니다", en: "becomes the perception" },
} satisfies Record<string, Localized>;

// ── Nodes ─────────────────────────────────────────────────────────────────
// Shared node ids are reused across pathways to form a real network in Explore.
export const NODES: Record<string, OntologyNode> = {
  // P1 — Food heritage
  q_kimchi: {
    id: "q_kimchi",
    type: "question",
    label: { ko: "왜 김치가 유명한가요?", en: "Why is kimchi famous?" },
    blurb: {
      ko: "음식은 세계가 한국을 가장 먼저 검색하는 관문입니다.",
      en: "Food is the gateway through which the world first searches for Korea.",
    },
    evidence: [
      { q: { ko: "김치는 왜 발효시키나요?", en: "Why is kimchi fermented?" }, platform: "paa" },
      { q: { ko: "김치는 건강에 좋나요?", en: "Is kimchi healthy?" }, platform: "google" },
      { q: { ko: "김치 종류는 몇 가지인가요?", en: "How many kinds of kimchi are there?" }, platform: "autocomplete" },
    ],
  },
  c_fermentation: {
    id: "c_fermentation",
    type: "concept",
    label: { ko: "발효", en: "Fermentation" },
    blurb: {
      ko: "유산균이 채소를 보존하고 특유의 감칠맛을 만들어내는 과정.",
      en: "The process by which lactic acid bacteria preserve vegetables and create umami.",
    },
    evidence: [
      { q: { ko: "발효 음식은 몸에 좋나요?", en: "Are fermented foods good for you?" }, platform: "reddit" },
      { q: { ko: "김치는 얼마나 오래 발효되나요?", en: "How long does kimchi ferment?" }, platform: "autocomplete" },
    ],
  },
  c_kimjang: {
    id: "c_kimjang",
    type: "concept",
    label: { ko: "김장", en: "Kimjang" },
    blurb: {
      ko: "겨울을 앞두고 가족과 이웃이 함께 김치를 담그는 공동 노동.",
      en: "The communal making of kimchi before winter, shared among family and neighbors.",
    },
    evidence: [
      { q: { ko: "김장은 무엇인가요?", en: "What is kimjang?" }, platform: "paa" },
    ],
  },
  c_unesco: {
    id: "c_unesco",
    type: "concept",
    label: { ko: "유네스코 인류무형문화유산", en: "UNESCO Heritage" },
    blurb: {
      ko: "김장 문화는 2013년 유네스코 인류무형문화유산으로 등재되었습니다.",
      en: "Kimjang culture was inscribed on the UNESCO list of intangible heritage in 2013.",
    },
  },
  t_community: {
    id: "t_community",
    type: "theme",
    label: { ko: "공동체 문화", en: "Community Culture" },
    blurb: {
      ko: "나눔과 협동이라는 가치가 음식을 매개로 이어져 온 흐름.",
      en: "A current of sharing and cooperation carried through food.",
    },
  },
  n_tradition: {
    id: "n_tradition",
    type: "narrative",
    label: {
      ko: "전통을 지켜온 나라, 한국",
      en: "Korea, a preserver of tradition",
    },
    blurb: {
      ko: "‘음식은 왜’라는 단순한 질문이, 전통을 지켜온 공동체라는 인식으로 이어집니다.",
      en: "A simple ‘why’ about food resolves into a perception of a community that safeguards tradition.",
    },
  },

  // P2 — Division & security
  q_two_koreas: {
    id: "q_two_koreas",
    type: "question",
    label: { ko: "왜 한국은 둘로 나뉘었나요?", en: "Why are there two Koreas?" },
    blurb: {
      ko: "분단은 세계가 한반도를 이해하려 할 때 가장 먼저 던지는 질문입니다.",
      en: "Division is the first question the world asks in trying to understand the peninsula.",
    },
    evidence: [
      { q: { ko: "남북한은 왜 분단되었나요?", en: "Why are North and South Korea divided?" }, platform: "paa" },
      { q: { ko: "한국전쟁은 언제 일어났나요?", en: "When did the Korean War happen?" }, platform: "google" },
      { q: { ko: "DMZ는 안전한가요?", en: "Is the DMZ safe to visit?" }, platform: "reddit" },
    ],
  },
  c_korean_war: {
    id: "c_korean_war",
    type: "concept",
    label: { ko: "한국전쟁", en: "Korean War" },
    blurb: {
      ko: "1950–1953년, 냉전이 한반도에서 열전으로 폭발한 전쟁.",
      en: "1950–1953, the war in which the Cold War erupted into open conflict on the peninsula.",
    },
    evidence: [
      { q: { ko: "한국전쟁은 왜 끝나지 않았나요?", en: "Why did the Korean War never officially end?" }, platform: "paa" },
    ],
  },
  c_division: {
    id: "c_division",
    type: "concept",
    label: { ko: "분단", en: "Division" },
    blurb: {
      ko: "38선을 경계로 두 개의 국가와 체제가 굳어진 상태.",
      en: "The hardening of two states and systems along the 38th parallel.",
    },
  },
  c_dmz: {
    id: "c_dmz",
    type: "concept",
    label: { ko: "DMZ", en: "DMZ" },
    blurb: {
      ko: "가장 무장된 경계이자, 역설적으로 생태가 보존된 완충 지대.",
      en: "The most militarized border, and paradoxically a preserved ecological buffer.",
    },
    evidence: [
      { q: { ko: "DMZ 투어는 어떻게 하나요?", en: "How do DMZ tours work?" }, platform: "autocomplete" },
    ],
  },
  t_cold_war: {
    id: "t_cold_war",
    type: "theme",
    label: { ko: "냉전 질서", en: "Cold War Order" },
    blurb: {
      ko: "한반도의 분단은 20세기 지구적 냉전 구조의 축소판입니다.",
      en: "Korea’s division is a microcosm of the twentieth-century global Cold War.",
    },
  },
  n_divided: {
    id: "n_divided",
    type: "narrative",
    label: {
      ko: "평화를 모색하는 분단국, 한국",
      en: "Korea, a divided nation seeking peace",
    },
    blurb: {
      ko: "분단의 질문은 통일이라는 미완의 과제, 그리고 평화를 모색하는 나라라는 인식으로 이어집니다.",
      en: "The question of division leads to reunification as unfinished business — and a perception of a nation seeking peace.",
    },
  },

  // P3 — Cultural influence
  q_kpop: {
    id: "q_kpop",
    type: "question",
    label: { ko: "왜 K-팝은 전 세계적으로 인기가 많나요?", en: "Why is K-pop so popular worldwide?" },
    blurb: {
      ko: "대중문화는 오늘날 세계가 한국을 처음 만나는 접점입니다.",
      en: "Pop culture is where much of the world first encounters Korea today.",
    },
    evidence: [
      { q: { ko: "K-팝 아이돌은 어떻게 데뷔하나요?", en: "How do K-pop idols debut?" }, platform: "paa" },
      { q: { ko: "K-팝은 왜 이렇게 인기가 많나요?", en: "Why is K-pop so popular?" }, platform: "google" },
      { q: { ko: "K-팝 때문에 한국어를 배우는 사람이 많나요?", en: "Do people learn Korean because of K-pop?" }, platform: "reddit" },
    ],
  },
  c_globalization: {
    id: "c_globalization",
    type: "concept",
    label: { ko: "세계화", en: "Globalization" },
    blurb: {
      ko: "디지털 플랫폼을 타고 문화가 국경 없이 확산되는 조건.",
      en: "The condition in which culture spreads across borders through digital platforms.",
    },
  },
  c_korean_language: {
    id: "c_korean_language",
    type: "concept",
    label: { ko: "한국어", en: "Korean Language" },
    blurb: {
      ko: "콘텐츠에 대한 관심이 언어 학습 수요로 전환되는 통로.",
      en: "The channel through which interest in content converts into demand for language learning.",
    },
    evidence: [
      { q: { ko: "한국어는 배우기 어렵나요?", en: "Is Korean hard to learn?" }, platform: "google" },
    ],
  },
  c_soft_power: {
    id: "c_soft_power",
    type: "concept",
    label: { ko: "소프트파워", en: "Soft Power" },
    blurb: {
      ko: "군사·경제력이 아닌 문화와 이미지로 얻는 영향력.",
      en: "Influence gained through culture and image rather than military or economic force.",
    },
    evidence: [
      { q: { ko: "소프트파워란 무엇인가요?", en: "What is soft power?" }, platform: "paa" },
    ],
  },
  t_cultural_influence: {
    id: "t_cultural_influence",
    type: "theme",
    label: { ko: "문화적 영향력", en: "Cultural Influence" },
    blurb: {
      ko: "취향과 언어, 소비를 함께 움직이는 문화의 파급력.",
      en: "The reach of culture that moves taste, language, and consumption together.",
    },
  },
  n_superpower: {
    id: "n_superpower",
    type: "narrative",
    label: {
      ko: "문화 강국, 한국",
      en: "Korea, a cultural superpower",
    },
    blurb: {
      ko: "‘왜 인기가 많나’라는 질문은, 문화로 세계에 영향력을 행사하는 나라라는 인식이 됩니다.",
      en: "‘Why so popular?’ becomes a perception of a nation that projects influence through culture.",
    },
  },

  // P4 — Language & script
  q_hangul: {
    id: "q_hangul",
    type: "question",
    label: { ko: "한글은 배우기 쉬운가요?", en: "Is Hangul easy to learn?" },
    blurb: {
      ko: "문자에 대한 호기심은 곧 그 문자를 만든 사고방식에 대한 관심으로 이어집니다.",
      en: "Curiosity about the script leads to interest in the thinking that designed it.",
    },
    evidence: [
      { q: { ko: "한글은 누가 만들었나요?", en: "Who created Hangul?" }, platform: "paa" },
      { q: { ko: "한글은 배우기 쉬운가요?", en: "Is Hangul easy to learn?" }, platform: "google" },
      { q: { ko: "한글은 얼마나 빨리 읽을 수 있나요?", en: "How fast can you learn to read Hangul?" }, platform: "autocomplete" },
    ],
  },
  c_hangul_system: {
    id: "c_hangul_system",
    type: "concept",
    label: { ko: "한글", en: "Hangul" },
    blurb: {
      ko: "소리와 글자가 규칙적으로 대응하도록 15세기에 창제된 문자.",
      en: "A 15th-century script designed so letters map systematically to sounds.",
    },
  },
  c_script_design: {
    id: "c_script_design",
    type: "concept",
    label: { ko: "문자 설계", en: "Script Design" },
    blurb: {
      ko: "발음 기관의 모양을 본떠 만든, 의도적으로 설계된 표음 체계.",
      en: "A deliberately engineered phonetic system modeled on the shape of speech organs.",
    },
  },
  t_national_pride: {
    id: "t_national_pride",
    type: "theme",
    label: { ko: "국가적 자긍심", en: "National Pride" },
    blurb: {
      ko: "합리적으로 설계된 문자는 한국인의 자긍심의 원천으로 여겨집니다.",
      en: "A rationally designed script is held as a source of national pride.",
    },
  },
  n_inventor: {
    id: "n_inventor",
    type: "narrative",
    label: {
      ko: "이상적인 문자를 발명한 나라, 한국",
      en: "Korea, inventor of an ideal script",
    },
    blurb: {
      ko: "‘쉬운가요?’라는 질문은, 합리적 문자를 발명한 나라라는 인식으로 이어집니다.",
      en: "‘Is it easy?’ resolves into a perception of a nation that invented a rational script.",
    },
  },

  // P5 — Technology
  q_internet: {
    id: "q_internet",
    type: "question",
    label: { ko: "왜 한국은 인터넷이 빠른가요?", en: "Why is Korea’s internet so fast?" },
    blurb: {
      ko: "일상의 기술 경험에 대한 질문은 산업과 정책에 대한 질문으로 확장됩니다.",
      en: "Questions about everyday tech expand into questions about industry and policy.",
    },
    evidence: [
      { q: { ko: "한국은 왜 인터넷이 빠른가요?", en: "Why is Korea’s internet so fast?" }, platform: "google" },
      { q: { ko: "삼성은 한국에서 얼마나 큰가요?", en: "How big is Samsung in Korea?" }, platform: "paa" },
      { q: { ko: "한국은 현금 없이 살 수 있나요?", en: "Can you live cashless in Korea?" }, platform: "reddit" },
    ],
  },
  c_infrastructure: {
    id: "c_infrastructure",
    type: "concept",
    label: { ko: "디지털 인프라", en: "Digital Infrastructure" },
    blurb: {
      ko: "이른 광케이블 투자와 높은 인구 밀도가 만든 초고속 연결망.",
      en: "Ultra-fast connectivity built on early fiber investment and dense population.",
    },
  },
  c_semiconductors: {
    id: "c_semiconductors",
    type: "concept",
    label: { ko: "반도체", en: "Semiconductors" },
    blurb: {
      ko: "수출과 기술 경쟁력의 핵심을 이루는 전략 산업.",
      en: "The strategic industry at the core of exports and technological competitiveness.",
    },
  },
  c_innovation_policy: {
    id: "c_innovation_policy",
    type: "concept",
    label: { ko: "혁신 정책", en: "Innovation Policy" },
    blurb: {
      ko: "국가 주도의 장기 투자와 산업 육성 전략.",
      en: "State-led long-term investment and industrial strategy.",
    },
  },
  t_digital_society: {
    id: "t_digital_society",
    type: "theme",
    label: { ko: "기술 사회", en: "Technology Society" },
    blurb: {
      ko: "결제부터 행정까지 일상 전반이 디지털로 매개되는 사회.",
      en: "A society where daily life — from payments to public services — is digitally mediated.",
    },
  },
  n_frontier: {
    id: "n_frontier",
    type: "narrative",
    label: {
      ko: "디지털 선진 사회, 한국",
      en: "Korea, a digitally advanced society",
    },
    blurb: {
      ko: "‘왜 빠른가’라는 질문은, 기술로 일상을 앞서 구현하는 사회라는 인식이 됩니다.",
      en: "‘Why so fast?’ becomes a perception of a society that lives the digital future first.",
    },
  },

  // P6 — Education & society
  q_study: {
    id: "q_study",
    type: "question",
    label: { ko: "왜 한국 학생들은 공부를 많이 하나요?", en: "Why do Korean students study so much?" },
    blurb: {
      ko: "교육에 대한 질문은 곧 한 사회의 작동 방식에 대한 질문입니다.",
      en: "Questions about education are questions about how a society works.",
    },
    evidence: [
      { q: { ko: "수능은 얼마나 중요한가요?", en: "How important is the Suneung exam?" }, platform: "paa" },
      { q: { ko: "학원은 무엇인가요?", en: "What is a hagwon?" }, platform: "google" },
      { q: { ko: "한국 학생들은 몇 시간 공부하나요?", en: "How many hours do Korean students study?" }, platform: "reddit" },
    ],
  },
  c_suneung: {
    id: "c_suneung",
    type: "concept",
    label: { ko: "수능", en: "Suneung Exam" },
    blurb: {
      ko: "대학 입시를 좌우하는, 사회적 무게가 큰 전국 단위 시험.",
      en: "A high-stakes national exam that weighs heavily on university admissions.",
    },
  },
  c_hagwon: {
    id: "c_hagwon",
    type: "concept",
    label: { ko: "학원", en: "Hagwon" },
    blurb: {
      ko: "방과 후 학습과 입시 준비를 담당하는 사설 교육 시장.",
      en: "The private after-school market for supplementary learning and exam prep.",
    },
  },
  c_meritocracy: {
    id: "c_meritocracy",
    type: "concept",
    label: { ko: "능력주의", en: "Meritocracy" },
    blurb: {
      ko: "시험 성취가 기회와 지위를 배분하는 원리로 작동하는 구조.",
      en: "A structure in which exam achievement allocates opportunity and status.",
    },
  },
  t_social_mobility: {
    id: "t_social_mobility",
    type: "theme",
    label: { ko: "사회 이동", en: "Social Mobility" },
    blurb: {
      ko: "교육을 통해 계층을 이동하려는 열망과 그 압력.",
      en: "The aspiration to move between classes through education — and its pressures.",
    },
  },
  n_meritocracy: {
    id: "n_meritocracy",
    type: "narrative",
    label: {
      ko: "고강도 능력주의 사회, 한국",
      en: "Korea, a high-pressure meritocracy",
    },
    blurb: {
      ko: "‘왜 그렇게 공부하나’라는 질문은, 교육으로 지위를 겨루는 사회라는 인식이 됩니다.",
      en: "‘Why study so hard?’ becomes a perception of a society that competes for status through education.",
    },
  },

  // Shared / bridging nodes (used by the ontology graph)
  q_bow: {
    id: "q_bow",
    type: "question",
    label: { ko: "왜 한국인은 절을 하나요?", en: "Why do Koreans bow?" },
    blurb: {
      ko: "일상의 예절에 대한 질문은 그 아래 놓인 가치 체계로 이어집니다.",
      en: "A question about everyday etiquette leads to the value system beneath it.",
    },
    evidence: [
      { q: { ko: "한국에서 인사는 어떻게 하나요?", en: "How do you greet someone in Korea?" }, platform: "google" },
      { q: { ko: "절은 언제 하나요?", en: "When do Koreans bow?" }, platform: "paa" },
      { q: { ko: "나이에 따라 예절이 달라지나요?", en: "Does etiquette change with age in Korea?" }, platform: "reddit" },
    ],
  },
  c_confucianism: {
    id: "c_confucianism",
    type: "concept",
    label: { ko: "유교", en: "Confucianism" },
    blurb: {
      ko: "위계·연장자 존중·교육을 중시하는 가치 체계로, 예절과 학업 문화의 뿌리가 됩니다.",
      en: "A value system emphasizing hierarchy, respect for elders, and education — the root of etiquette and study culture.",
    },
    evidence: [
      { q: { ko: "한국은 유교 국가인가요?", en: "Is Korea a Confucian country?" }, platform: "paa" },
      { q: { ko: "유교는 한국에 어떤 영향을 주었나요?", en: "How did Confucianism shape Korea?" }, platform: "reddit" },
    ],
  },
  t_national_identity: {
    id: "t_national_identity",
    type: "theme",
    label: { ko: "국가 정체성", en: "National Identity" },
    blurb: {
      ko: "언어·전통·성취를 통해 형성되는 ‘한국다움’에 대한 감각.",
      en: "A sense of ‘Koreanness’ formed through language, tradition, and achievement.",
    },
  },
  t_historical_memory: {
    id: "t_historical_memory",
    type: "theme",
    label: { ko: "역사적 기억", en: "Historical Memory" },
    blurb: {
      ko: "전쟁과 분단의 경험이 오늘의 정체성과 세계관에 남긴 흔적.",
      en: "The imprint of war and division on today’s identity and worldview.",
    },
  },
};

// ── Pathways ───────────────────────────────────────────────────────────────
export const PATHWAYS: Pathway[] = [
  {
    id: "food-heritage",
    title: NODES.q_kimchi.label,
    themeLabel: { ko: "음식 유산", en: "Food Heritage" },
    steps: [
      { nodeId: "q_kimchi" },
      { nodeId: "c_fermentation", verb: V.explainedBy },
      { nodeId: "c_kimjang", verb: V.practicedAs },
      { nodeId: "c_unesco", verb: V.recognizedBy },
      { nodeId: "t_community", verb: V.expresses },
      { nodeId: "n_tradition", verb: V.shapedInto },
    ],
  },
  {
    id: "division-security",
    title: NODES.q_two_koreas.label,
    themeLabel: { ko: "분단과 안보", en: "Division & Security" },
    steps: [
      { nodeId: "q_two_koreas" },
      { nodeId: "c_korean_war", verb: V.explainedBy },
      { nodeId: "c_division", verb: V.caused },
      { nodeId: "c_dmz", verb: V.materializedAs },
      { nodeId: "t_cold_war", verb: V.situatedIn },
      { nodeId: "n_divided", verb: V.shapedInto },
    ],
  },
  {
    id: "cultural-influence",
    title: NODES.q_kpop.label,
    themeLabel: { ko: "문화적 영향력", en: "Cultural Influence" },
    steps: [
      { nodeId: "q_kpop" },
      { nodeId: "c_globalization", verb: V.drivenBy },
      { nodeId: "c_korean_language", verb: V.gatewayTo },
      { nodeId: "c_soft_power", verb: V.instrumentOf },
      { nodeId: "t_cultural_influence", verb: V.produces },
      { nodeId: "n_superpower", verb: V.shapedInto },
    ],
  },
  {
    id: "language-script",
    title: NODES.q_hangul.label,
    themeLabel: { ko: "언어와 문자", en: "Language & Script" },
    steps: [
      { nodeId: "q_hangul" },
      { nodeId: "c_hangul_system", verb: V.explainedBy },
      { nodeId: "c_script_design", verb: V.designedAs },
      { nodeId: "c_soft_power", verb: V.instrumentOf },
      { nodeId: "t_national_pride", verb: V.reinforces },
      { nodeId: "n_inventor", verb: V.shapedInto },
    ],
  },
  {
    id: "technology-frontier",
    title: NODES.q_internet.label,
    themeLabel: { ko: "기술", en: "Technology" },
    steps: [
      { nodeId: "q_internet" },
      { nodeId: "c_infrastructure", verb: V.explainedBy },
      { nodeId: "c_semiconductors", verb: V.builtOn },
      { nodeId: "c_innovation_policy", verb: V.drivenBy },
      { nodeId: "t_digital_society", verb: V.produces },
      { nodeId: "n_frontier", verb: V.shapedInto },
    ],
  },
  {
    id: "education-society",
    title: NODES.q_study.label,
    themeLabel: { ko: "교육과 사회", en: "Education & Society" },
    steps: [
      { nodeId: "q_study" },
      { nodeId: "c_suneung", verb: V.explainedBy },
      { nodeId: "c_hagwon", verb: V.enables },
      { nodeId: "c_meritocracy", verb: V.reinforces },
      { nodeId: "t_social_mobility", verb: V.expresses },
      { nodeId: "n_meritocracy", verb: V.shapedInto },
    ],
  },
];

export function getPathway(id: string): Pathway | undefined {
  return PATHWAYS.find((p) => p.id === id);
}

export function getNode(id: string): OntologyNode {
  return NODES[id];
}

export const TOTAL_QUESTIONS = 10930;
export const PLATFORM_COUNT = 4;

/** Deduplicated directed edges across all pathways, for the Explore graph. */
export interface OntologyEdge {
  from: string;
  to: string;
  verb: Localized;
}

export function buildEdges(): OntologyEdge[] {
  const seen = new Set<string>();
  const edges: OntologyEdge[] = [];
  for (const p of PATHWAYS) {
    for (let i = 1; i < p.steps.length; i++) {
      const from = p.steps[i - 1].nodeId;
      const to = p.steps[i].nodeId;
      const key = `${from}->${to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from, to, verb: p.steps[i].verb ?? { ko: "", en: "" } });
    }
  }
  return edges;
}

// ══════════════════════════════════════════════════════════════════════════
// ONTOLOGY GRAPH (Explore v2)
//
// The graph is a normalized, many-to-many structure — deliberately separate
// from the linear PATHWAYS above. This is the shape real data will populate:
//   • GRAPH_NODES  ← question clusters + extracted concepts/themes/narratives
//   • GRAPH_EDGES  ← AI-extracted relations (question→concept→theme→narrative)
//   • evidence[]   ← real queries grouped by platform (Google/PAA/Autocomplete/
//                    Reddit)
// Swapping the sample arrays below for API-derived data requires no change to
// the visualization: it consumes buildGraph() and graphNeighbors() only.
// ══════════════════════════════════════════════════════════════════════════

/** Compact labels used inside graph node chips (falls back to full label). */
export const GRAPH_LABEL: Record<string, Localized> = {
  q_kimchi: { ko: "김치의 유명세", en: "Kimchi’s fame" },
  q_bow: { ko: "절하는 문화", en: "Bowing" },
  q_kpop: { ko: "K-팝의 인기", en: "K-pop’s reach" },
  q_two_koreas: { ko: "두 개의 한국", en: "Two Koreas" },
  q_hangul: { ko: "한국어 학습", en: "Learning Korean" },
  q_internet: { ko: "빠른 인터넷", en: "Fast internet" },
  q_study: { ko: "높은 교육열", en: "Study culture" },

  c_fermentation: { ko: "발효", en: "Fermentation" },
  c_kimjang: { ko: "김장", en: "Kimjang" },
  c_unesco: { ko: "유네스코", en: "UNESCO" },
  c_confucianism: { ko: "유교", en: "Confucianism" },
  c_soft_power: { ko: "소프트파워", en: "Soft Power" },
  c_globalization: { ko: "세계화", en: "Globalization" },
  c_korean_language: { ko: "한국어", en: "Korean Language" },
  c_hangul_system: { ko: "한글", en: "Hangul" },
  c_script_design: { ko: "문자 설계", en: "Script Design" },
  c_korean_war: { ko: "한국전쟁", en: "Korean War" },
  c_division: { ko: "분단", en: "Division" },
  c_dmz: { ko: "DMZ", en: "DMZ" },
  c_infrastructure: { ko: "디지털 인프라", en: "Digital Infrastructure" },
  c_semiconductors: { ko: "반도체", en: "Semiconductors" },
  c_suneung: { ko: "수능", en: "Suneung" },

  t_community: { ko: "공동체 문화", en: "Community Culture" },
  t_national_identity: { ko: "국가 정체성", en: "National Identity" },
  t_cultural_influence: { ko: "문화적 영향력", en: "Cultural Influence" },
  t_historical_memory: { ko: "역사적 기억", en: "Historical Memory" },
  t_digital_society: { ko: "기술 사회", en: "Technology Society" },

  n_tradition: { ko: "전통을 지켜온 나라", en: "Preserver of Tradition" },
  n_superpower: { ko: "문화 강국", en: "Cultural Power" },
  n_divided: { ko: "분단이 만든 나라", en: "Shaped by Division" },
  n_frontier: { ko: "디지털 선진국", en: "Digitally Advanced" },
};

export function graphLabel(id: string): Localized {
  return GRAPH_LABEL[id] ?? NODES[id].label;
}

export interface GraphEdge {
  from: string;
  to: string;
}

/** Many-to-many relations. Shared targets (soft_power, confucianism,
 *  national_identity, cultural_influence, the narratives) are what make the
 *  graph reveal relationships across questions rather than classify them. */
export const GRAPH_EDGES: GraphEdge[] = [
  // question → concept
  { from: "q_kimchi", to: "c_fermentation" },
  { from: "q_kimchi", to: "c_kimjang" },
  { from: "q_kimchi", to: "c_unesco" },
  { from: "q_bow", to: "c_confucianism" },
  { from: "q_kpop", to: "c_soft_power" },
  { from: "q_kpop", to: "c_globalization" },
  { from: "q_kpop", to: "c_korean_language" },
  { from: "q_two_koreas", to: "c_korean_war" },
  { from: "q_two_koreas", to: "c_division" },
  { from: "q_two_koreas", to: "c_dmz" },
  { from: "q_hangul", to: "c_hangul_system" },
  { from: "q_hangul", to: "c_script_design" },
  { from: "q_hangul", to: "c_soft_power" },
  { from: "q_internet", to: "c_infrastructure" },
  { from: "q_internet", to: "c_semiconductors" },
  { from: "q_study", to: "c_suneung" },
  { from: "q_study", to: "c_confucianism" },
  // concept → theme
  { from: "c_fermentation", to: "t_community" },
  { from: "c_kimjang", to: "t_community" },
  { from: "c_unesco", to: "t_community" },
  { from: "c_unesco", to: "t_national_identity" },
  { from: "c_confucianism", to: "t_national_identity" },
  { from: "c_confucianism", to: "t_community" },
  { from: "c_soft_power", to: "t_cultural_influence" },
  { from: "c_globalization", to: "t_cultural_influence" },
  { from: "c_korean_language", to: "t_cultural_influence" },
  { from: "c_hangul_system", to: "t_national_identity" },
  { from: "c_script_design", to: "t_national_identity" },
  { from: "c_korean_war", to: "t_historical_memory" },
  { from: "c_division", to: "t_historical_memory" },
  { from: "c_dmz", to: "t_historical_memory" },
  { from: "c_infrastructure", to: "t_digital_society" },
  { from: "c_semiconductors", to: "t_digital_society" },
  { from: "c_suneung", to: "t_national_identity" },
  // theme → narrative
  { from: "t_community", to: "n_tradition" },
  { from: "t_national_identity", to: "n_tradition" },
  { from: "t_national_identity", to: "n_superpower" },
  { from: "t_cultural_influence", to: "n_superpower" },
  { from: "t_historical_memory", to: "n_divided" },
  { from: "t_digital_society", to: "n_frontier" },
];

export function buildGraph(): { nodes: OntologyNode[]; edges: GraphEdge[] } {
  const ids = new Set<string>();
  GRAPH_EDGES.forEach((e) => {
    ids.add(e.from);
    ids.add(e.to);
  });
  return { nodes: Array.from(ids).map(getNode), edges: GRAPH_EDGES };
}

/** Neighbours of a node in the graph, split by their type — powers the
 *  evidence drawer's "connected questions / concepts / themes / narratives". */
export function graphNeighbors(id: string): OntologyNode[] {
  const set = new Set<string>();
  GRAPH_EDGES.forEach((e) => {
    if (e.from === id) set.add(e.to);
    if (e.to === id) set.add(e.from);
  });
  return Array.from(set).map(getNode);
}
