import type { Localized } from "@/lib/ontology";

// =============================================================================
// The interpretation layer (V2)
// =============================================================================
//
// The ontology (lib/ontology.generated.ts) stays pure STRUCTURE:
// Question → Concept → Theme → Narrative → Perception. This file is the
// INTERPRETATION that sits on top of it — what the structure reveals.
//
// Per the Kwon Soyoung Human–AI boundary (§12), this is significance, so it is
// authored content (not machine-generated). Two authored sets:
//
//   DISCOVERY_BY_PERCEPTION — one insight per perception (the 6th, reading-only
//     layer; rendered in the Evidence Drawer and at pathway ends). It is NOT a
//     graph column — the graph remains five layers.
//
//   MEANING_BY_PATHWAY — each pathway's What happened → Why → Why it matters,
//     in plain interpretation language (Observation → Why → So what).
//
// Voice: direct, plain, non-academic. No "reach did not become comprehension" —
// instead "people see a lot of Korea, but that isn't the same as knowing it."
// =============================================================================

/** One-line discovery per perception — "what does this reveal?" */
export const DISCOVERY_BY_PERCEPTION: Record<string, Localized> = {
  p_cultural: {
    ko: "K-팝은 이제 음악에 대한 관심을 넘어, 한국 자체로 들어가는 입구가 되고 있습니다.",
    en: "K-pop is no longer just about the music — it has become the door people walk through to reach Korea itself.",
  },
  p_aspirational: {
    ko: "‘한국적’이라는 말이 손에 닿는 현대적 삶의 대명사가 되어가고 있습니다. 뷰티는 목적지가 아니라 그 삶으로 들어가는 입구입니다.",
    en: "“Korean” is becoming shorthand for an attainable modern life. Beauty isn’t the destination — it’s the on-ramp.",
  },
  p_divided: {
    ko: "관심은 그 어느 때보다 크지만, 가장 많이 묻는 질문은 여전히 ‘왜 둘로 나뉘었나’입니다. 많이 보는 것과 이해하는 것은 다릅니다.",
    en: "Attention is at an all-time high, yet the most-asked question is still “why are there two Koreas.” Being seen a lot is not the same as being understood.",
  },
  p_advanced: {
    ko: "사람들은 삼성 같은 익숙한 브랜드에서 출발해 한국 경제 전체로 들어갑니다. 제품이 나라로 가는 통로가 됩니다.",
    en: "People start from a familiar brand like Samsung and back into the whole economy. The product is the gateway to the country.",
  },
  p_enigmatic: {
    ko: "한국에 대한 관심이, 실제로 한국을 이해할 수 있는 통로보다 빠르게 자라고 있습니다. 어려움은 언어의 성질이 아니라 진입로의 부족입니다.",
    en: "Interest in Korea is growing faster than the ways to actually access it. The difficulty is a missing on-ramp, not a hard language.",
  },
};

export interface PathwayMeaning {
  whatHappened: Localized; // Observation
  why: Localized; // Why is it happening
  whyItMatters: Localized; // So what
}

/** What happened → Why → Why it matters, per pathway id. */
export const MEANING_BY_PATHWAY: Record<string, PathwayMeaning> = {
  "cultural-force": {
    whatHappened: {
      ko: "K-팝에 대한 질문이 여러 시장에서 계속 늘고 있습니다.",
      en: "Questions about K-pop keep rising across markets.",
    },
    why: {
      ko: "호기심이 음악에서 시작해 그 주변의 문화 전체로 번져 나갔습니다.",
      en: "Curiosity spread out from the music into the whole culture around it.",
    },
    whyItMatters: {
      ko: "K-팝은 사람들이 한국으로 들어올 때 통과하는 문이 되었습니다.",
      en: "K-pop has become the door people walk through to reach Korea itself.",
    },
  },
  aspiration: {
    whatHappened: {
      ko: "스킨케어와 뷰티 질문이 빠르게 성장하는 시장에 몰려 있습니다.",
      en: "Skincare and beauty questions cluster in fast-growing markets.",
    },
    why: {
      ko: "사람들은 한국이 보여주는 현대적인 삶에 어떻게 다가갈 수 있는지를 묻고 있습니다.",
      en: "People are asking how to reach the modern life Korea seems to model.",
    },
    whyItMatters: {
      ko: "‘한국적’이라는 말은 이제 손에 닿는 삶의 방식을 뜻합니다. 뷰티는 목적지가 아니라 입구입니다.",
      en: "“Korean” now signals an attainable lifestyle. Beauty is the on-ramp, not the destination.",
    },
  },
  division: {
    whatHappened: {
      ko: "‘한국은 한 나라인가 두 나라인가?’는 여전히 가장 많이 묻는 질문 중 하나입니다.",
      en: "“Is Korea one country or two?” is still one of the most-asked questions.",
    },
    why: {
      ko: "대부분의 사람들은 분단에서 출발해 한국을 이해하기 시작합니다.",
      en: "Most people begin trying to make sense of Korea from the division.",
    },
    whyItMatters: {
      ko: "관심은 크지만 이 기본적인 질문은 아직 풀리지 않았습니다. 많이 보이는 것이 곧 이해된 것은 아닙니다.",
      en: "Attention is high, but this basic question is still unanswered. Being seen is not yet being understood.",
    },
  },
  "tech-success": {
    whatHappened: {
      ko: "사람들은 삼성이 얼마나 큰지 묻고, 이어서 한국 경제 전체로 질문을 넓혀 갑니다.",
      en: "People ask how big Samsung is, then keep going into the wider economy.",
    },
    why: {
      ko: "익숙한 브랜드는 낯선 나라의 산업으로 들어가는 가장 쉬운 통로입니다.",
      en: "A familiar brand is the easiest way into an unfamiliar country’s industry.",
    },
    whyItMatters: {
      ko: "제품이 통로입니다. 브랜드에 대한 질문은 사실 나라에 대한 질문입니다.",
      en: "Products are the gateway. A brand question is really a question about the nation.",
    },
  },
  enigma: {
    whatHappened: {
      ko: "‘한국어가 일본어보다 어렵나요?’가 학습 관련 질문의 물결을 이끕니다.",
      en: "“Is Korean harder than Japanese?” leads a wave of learning questions.",
    },
    why: {
      ko: "대부분의 사람들은 ‘어렵다’는 프레임을 통해 한국어를 처음 만납니다.",
      en: "Most people first meet Korean through the frame of difficulty.",
    },
    whyItMatters: {
      ko: "관심이 진입로보다 빠르게 자라고 있습니다. 장벽은 어려운 언어가 아니라 부족한 입구입니다.",
      en: "Interest is outrunning access. The barrier is missing on-ramps, not a hard language.",
    },
  },
};

export function discoveryFor(perceptionId: string): Localized | undefined {
  return DISCOVERY_BY_PERCEPTION[perceptionId];
}

export function meaningFor(pathwayId: string): PathwayMeaning | undefined {
  return MEANING_BY_PATHWAY[pathwayId];
}
