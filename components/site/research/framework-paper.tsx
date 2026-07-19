"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, type L } from "./parts";

// ── helpers ─────────────────────────────────────────────────────────────────
const D = (ko: string, en: string): L => ({ ko, en });

// ── PART 1 data: findings ───────────────────────────────────────────────────

interface FindingItem {
  n: string;
  head: L;
  body: L;
}

const KEY_FINDINGS: FindingItem[] = [
  {
    n: "01",
    head: D(
      "문화는 가장 강력한 진입점이다",
      "Culture is the strongest entry point",
    ),
    body: D(
      "한류·K-pop·음식·드라마는 모든 시장에서 가장 큰 비중을 차지한다. 한국을 처음 질문하는 사람의 대다수는 문화를 통해 들어온다.",
      "Hallyu, K-pop, food, and drama hold the largest share across all markets. The majority who first ask about Korea enter through culture.",
    ),
  },
  {
    n: "02",
    head: D(
      "단일 최대 질문은 '두 개의 한국'이다",
      "The single largest question is 'the two Koreas'",
    ),
    body: D(
      "242개 질문(15.7%)이 분단에 관한 것이다. 이는 단일 한류 개념보다 크다. 세계는 한국을 문화로 진입하되, 분단으로 정의한다.",
      "242 questions (15.7%) concern division — larger than any single Hallyu concept. The world enters Korea through culture but defines it through division.",
    ),
  },
  {
    n: "03",
    head: D(
      "시장을 넘나드는 질문은 31%에 불과하다",
      "Only 31% of questions cross markets",
    ),
    body: D(
      "69%의 질문은 특정 시장에서만 나타난다. 각 나라는 서로 다른 한국을 질문하고 있다.",
      "69% of questions appear in only one market. Each country is asking about a different Korea.",
    ),
  },
  {
    n: "04",
    head: D(
      "가까운 국가는 사회를, 먼 국가는 문화를 질문한다",
      "Proximate countries ask about society; distant ones ask about culture",
    ),
    body: D(
      "일본은 예절·규범·사회를 질문한다. 인도네시아와 브라질은 '한국이란 무엇인가'라는 입문적 질문을 던진다. 거리가 질문의 깊이를 결정한다.",
      "Japan asks about etiquette, norms, and society. Indonesia and Brazil ask introductory 'What is Korea?' questions. Distance determines the depth of inquiry.",
    ),
  },
  {
    n: "05",
    head: D(
      "언어에 대한 첫 프레임은 '어려움'이다",
      "The first frame for language is 'difficulty'",
    ),
    body: D(
      "163개 질문(10.6%)이 한국어를 '어려움'으로 프레이밍한다. 학습 욕구가 아니라 장벽 인식이 언어 질문의 출발점이다.",
      "163 questions (10.6%) frame Korean through difficulty. The starting point of language questions is barrier perception, not learning desire.",
    ),
  },
];

// ── country profiles ────────────────────────────────────────────────────────

interface CountryProfile {
  flag: string;
  code: string;
  name: L;
  topics: L;
  reading: L;
}

const COUNTRIES: CountryProfile[] = [
  {
    flag: "🇩🇪",
    code: "DE",
    name: D("독일", "Germany"),
    topics: D("기술 · 역사 · 언어", "Technology · History · Language"),
    reading: D("산업국가로 이해", "Understood as an industrial nation"),
  },
  {
    flag: "🇧🇷",
    code: "BR",
    name: D("브라질", "Brazil"),
    topics: D("음식 · 한류 · 뷰티", "Food · Hallyu · Beauty"),
    reading: D("문화국가로 이해", "Understood as a cultural nation"),
  },
  {
    flag: "🇯🇵",
    code: "JP",
    name: D("일본", "Japan"),
    topics: D("예절 · 사회 · 문화", "Etiquette · Society · Culture"),
    reading: D("생활세계로 이해", "Understood as a lived world"),
  },
  {
    flag: "🇮🇩",
    code: "ID",
    name: D("인도네시아", "Indonesia"),
    topics: D("분단 · 국가 기본 · 뷰티", "Division · National basics · Beauty"),
    reading: D("알고 싶은 나라로 이해", "Understood as a country to discover"),
  },
  {
    flag: "🇦🇪",
    code: "AE",
    name: D("아랍권", "Arab world"),
    topics: D("분단 · 음식 · 드라마", "Division · Food · Drama"),
    reading: D("지정학과 콘텐츠의 이중상", "A dual image of geopolitics and content"),
  },
  {
    flag: "🇺🇸",
    code: "US+IN",
    name: D("영어권", "English-speaking"),
    topics: D("사람 · 여행 · 분단 · 언어", "People · Travel · Division · Language"),
    reading: D("넓게 그러나 얕게 이해", "Understood broadly but shallowly"),
  },
  {
    flag: "🇰🇷",
    code: "KR",
    name: D("한국", "Korea"),
    topics: D("사람 · 문화유산 · 사회", "People · Heritage · Society"),
    reading: D("외국인의 시선으로 자신을 질문", "Questioning itself through foreign eyes"),
  },
];

// ── PART 2 data: analytical model ───────────────────────────────────────────

interface LayerStep {
  n: string;
  ko: string;
  en: string;
  desc: L;
}

const LAYERS: LayerStep[] = [
  {
    n: "1",
    ko: "질문",
    en: "Question",
    desc: D(
      "세계가 던지는 원초적 궁금증",
      "The primal curiosities the world asks",
    ),
  },
  {
    n: "2",
    ko: "개념",
    en: "Concept",
    desc: D(
      "질문이 가리키는 구체적 대상 (K-pop, 김치, 병역)",
      "Specific objects questions point to (K-pop, kimchi, military service)",
    ),
  },
  {
    n: "3",
    ko: "주제",
    en: "Theme",
    desc: D(
      "개념들이 모여 형성하는 관심 영역 (한류, 언어, 관광)",
      "Interest areas formed as concepts cluster (Hallyu, language, tourism)",
    ),
  },
  {
    n: "4",
    ko: "서사",
    en: "Narrative",
    desc: D(
      "주제가 반복되며 만들어지는 이야기 구조 ('문화 강국', '기술 선진국')",
      "Story structures that emerge as themes recur ('cultural powerhouse', 'tech leader')",
    ),
  },
  {
    n: "5",
    ko: "인식",
    en: "Perception",
    desc: D(
      "서사가 축적되어 형성되는 국가 이미지",
      "National image formed as narratives accumulate",
    ),
  },
];

// ── example flow ────────────────────────────────────────────────────────────

interface FlowStep {
  ko: string;
  en: string;
}

const EXAMPLE_FLOW: FlowStep[] = [
  { ko: "Why is K-pop popular?", en: "Why is K-pop popular?" },
  { ko: "아이돌 문화", en: "Idol culture" },
  { ko: "한류", en: "Hallyu" },
  { ko: "문화 강국", en: "Cultural powerhouse" },
  { ko: "문화 강국 한국", en: "Korea as cultural power" },
];

// ── analytical capabilities ─────────────────────────────────────────────────

interface Capability {
  head: L;
  body: L;
}

const CAPABILITIES: Capability[] = [
  {
    head: D("진입점 식별", "Entry point identification"),
    body: D(
      "어떤 질문이 어떤 개념으로 연결되는지 추적할 수 있다.",
      "Track which questions connect to which concepts.",
    ),
  },
  {
    head: D("서사 형성 감지", "Narrative formation detection"),
    body: D(
      "주제가 반복될 때 서사가 형성되는 시점을 포착할 수 있다.",
      "Detect when recurring themes begin to form narratives.",
    ),
  },
  {
    head: D("국가별 경로 비교", "Cross-country path comparison"),
    body: D(
      "같은 질문이 국가마다 다른 인식으로 이어지는 이유를 분석할 수 있다.",
      "Analyze why the same questions lead to different perceptions in each country.",
    ),
  },
];

// ── sub-components ──────────────────────────────────────────────────────────

function FlowChips({
  steps,
  locale,
}: {
  steps: { ko: string; en: string }[];
  locale: "ko" | "en";
}) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div
            className="rounded-lg border px-4 py-2.5 text-center text-[14px] font-bold text-navy"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 50%, transparent)",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            {step[locale]}
          </div>
          {i < steps.length - 1 && (
            <ChevronDown className="mx-2 h-4 w-4 rotate-[-90deg] text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function LayerCard({
  layer,
  locale,
}: {
  layer: LayerStep;
  locale: "ko" | "en";
}) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-6"
      style={{
        borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        background: "color-mix(in srgb, var(--accent) 4%, transparent)",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="flex-shrink-0 font-mono text-2xl font-bold"
          style={{ color: "var(--accent)" }}
        >
          {layer.n}
        </span>
        <div>
          <h3 className="text-[18px] font-bold text-navy">
            {locale === "ko" ? layer.ko : layer.en}
            <span className="ml-2 text-[14px] font-normal text-muted-foreground">
              {locale === "ko" ? layer.en : layer.ko}
            </span>
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
            {layer.desc[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}

function CountryCard({
  country,
  locale,
}: {
  country: CountryProfile;
  locale: "ko" | "en";
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{country.flag}</span>
        <span className="text-[15px] font-bold text-navy">
          {country.name[locale]}
        </span>
        <span className="text-[12px] text-muted-foreground">{country.code}</span>
      </div>
      <p className="mt-2.5 text-[14px] leading-relaxed text-secondary">
        {country.topics[locale]}
      </p>
      <p
        className="mt-2 text-[13px] font-semibold"
        style={{ color: "var(--accent)" }}
      >
        {country.reading[locale]}
      </p>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────

export function UnderstandingModel() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          PART 1: 세계는 어떤 한국을 질문하는가 — What was found
      ════════════════════════════════════════════════════════════════════ */}

      {/* ── 1a. Key Findings ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "발견" : "Findings"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "1,540개의 질문이 보여준 것"
            : "What 1,540 questions revealed"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "7개국에서 수집한 1,540개의 자동완성 질문은 일관된 패턴을 보여주었다. 아래는 데이터가 드러낸 핵심 사실이다."
            : "1,540 autocomplete questions collected from seven countries showed consistent patterns. Below are the core facts the data revealed."}
        </Lead>
        <div className="mt-8 grid gap-4">
          {KEY_FINDINGS.map((f) => (
            <Finding
              key={f.n}
              n={f.n}
              head={f.head[locale]}
              body={f.body[locale]}
            />
          ))}
        </div>
      </DocSection>

      {/* ── 1b. Country Differences ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "국가별 차이" : "Country differences"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "같은 나라, 다른 이미지"
            : "Same country, different images"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "각 나라는 자신의 맥락에서 한국을 구성한다. 같은 대상을 질문하되 서로 다른 한국을 만들어낸다."
            : "Each country constructs Korea from its own context. They ask about the same subject but produce different Koreas."}
        </Lead>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c) => (
            <CountryCard key={c.code} country={c} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ════════════════════════════════════════════════════════════════════
          PART 2: 질문은 어떻게 국가 이해가 되는가 — How we read it
      ════════════════════════════════════════════════════════════════════ */}

      {/* ── 2a. The 5-Layer Model ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "분석 구조" : "Analysis structure"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문에서 인식까지, 다섯 층위로 읽었다"
            : "From question to perception, read through five layers"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문을 단순히 분류하지 않았다. 이해가 형성되는 경로 자체를 재구성했다."
            : "We did not simply classify questions. We reconstructed the path through which understanding forms."}
        </Lead>

        {/* flow visualization */}
        <div className="mt-8">
          <FlowChips
            steps={LAYERS.map((l) => ({ ko: l.ko, en: l.en }))}
            locale={locale}
          />
        </div>

        {/* layer cards */}
        <div className="mt-8 grid gap-4">
          {LAYERS.map((layer) => (
            <LayerCard key={layer.en} layer={layer} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── 2b. Example ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "적용 사례" : "Application"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "하나의 질문이 인식이 되기까지"
            : "From a single question to perception"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "이론적 도식이 아니라, 실제 질문이 축적을 통해 국가 이미지를 형성하는 과정이다."
            : "This is not a theory diagram — it is how actual question accumulation produces a reading of Korea."}
        </Lead>

        {/* vertical stepped flow */}
        <div className="mt-8 space-y-3">
          {EXAMPLE_FLOW.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className="rounded-xl border-l-4 px-5 py-4"
                style={{
                  borderColor: "var(--accent)",
                  background: "color-mix(in srgb, var(--accent) 4%, transparent)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 font-mono text-[13px] font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[16px] font-semibold text-navy">
                    {step[locale]}
                  </span>
                </div>
              </div>
              {i < EXAMPLE_FLOW.length - 1 && (
                <div className="flex justify-center">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-secondary">
          {locale === "ko"
            ? "하나의 질문은 하나의 답으로 끝나지 않는다. 유사한 질문이 반복될 때 개념이 되고, 개념이 묶일 때 주제가 되고, 주제가 서사를 형성할 때 비로소 국가 이미지가 된다."
            : "A single question does not end with a single answer. When similar questions recur they become concepts, when concepts cluster they become themes, and when themes form narratives they finally become national image."}
        </p>
      </DocSection>

      {/* ── 2c. What the model enables ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "분석적 가치" : "Analytical value"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "이 구조가 가능하게 하는 것"
            : "What this structure enables"}
        </H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 sm:p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                background: "color-mix(in srgb, var(--accent) 4%, transparent)",
              }}
            >
              <h3 className="text-[17px] font-bold text-navy">
                {cap.head[locale]}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                {cap.body[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── 2d. Conclusion ── */}
      <DocSection tint>
        <div className="py-4">
          <p
            className="max-w-2xl text-2xl font-bold leading-snug"
            style={{ color: "var(--accent)" }}
          >
            {locale === "ko"
              ? "이 연구는 한국에 대한 평가가 아니라, 한국을 이해하는 과정 자체를 분석한 기록이다."
              : "This research is not an evaluation of Korea, but a record of analyzing the process of understanding Korea itself."}
          </p>
        </div>
      </DocSection>
    </>
  );
}
