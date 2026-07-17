"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

// ── types & helpers ──────────────────────────────────────────────────────────
interface FindingData {
  n: string;
  title: L;
  data: L;
  interpretation: L;
  implication: L;
}

// ── findings (4-layer: 데이터→해석→함의) ─────────────────────────────────────
const FINDINGS: FindingData[] = [
  {
    n: "01",
    title: {
      ko: "문화는 가장 강력한 진입점이다",
      en: "Culture is the most powerful entry point",
    },
    data: {
      ko: "한류는 전체 질문 중 가장 높은 비중을 차지했다. K-pop, 드라마, 영화, 음식 관련 질문이 지속적으로 등장했다.",
      en: "The Korean Wave accounted for the largest share of all questions. K-pop, drama, film, and food questions appeared consistently across markets.",
    },
    interpretation: {
      ko: "세계는 한국을 정치나 경제보다 콘텐츠를 통해 먼저 만난다. 문화는 관심 분야가 아니라 한국이라는 국가에 접근하는 입구 역할을 한다.",
      en: "The world first meets Korea through content, not politics or economics. Culture is not a topic of interest — it's the doorway to the country itself.",
    },
    implication: {
      ko: "문화 정책의 목표는 콘텐츠 소비 확대가 아니다. 문화를 통해 형성된 관심을 역사, 사회, 기술, 외교 이해로 연결하는 구조가 필요하다.",
      en: "The goal of cultural policy shouldn't be wider content consumption. What's needed is a structure that connects culture-driven attention into understanding of history, society, technology, and diplomacy.",
    },
  },
  {
    n: "02",
    title: {
      ko: "가장 많이 묻는 단일 질문은 여전히 '두 개의 한국'이다",
      en: "The single most-asked question is still 'the two Koreas'",
    },
    data: {
      ko: "분단 관련 질문이 242개(전체의 15.7%)로 어떤 한류 개념보다 큰 단일 개념이었다. '왜 한국은 둘로 나뉘었나'가 가장 많은 시장에서 반복되었다.",
      en: "Division-related questions totaled 242 (15.7% of all) — the single largest concept, bigger than any Hallyu topic. 'Why is Korea divided?' recurred across the most markets.",
    },
    interpretation: {
      ko: "한류가 전체 주제로는 1위이지만, 사람들이 한국에 대해 던지는 가장 무거운 단일 질문은 문화가 아니라 분단이다. 소프트파워는 안보 프레임을 대체하지 못했다.",
      en: "Hallyu leads as a theme, but the single heaviest question people ask about Korea is not about culture — it's about division. Soft power has not displaced the security frame.",
    },
    implication: {
      ko: "분단은 과거의 유산이 아니라 현재의 프레임이다. 한국을 설명하는 전략은 이 질문에서 시작해야 한다.",
      en: "Division is not a legacy of the past — it's the present frame. Any strategy for explaining Korea must start from this question.",
    },
  },
  {
    n: "03",
    title: {
      ko: "언어에 대한 첫 번째 프레임은 '어려움'이다",
      en: "The first frame for language is 'difficulty'",
    },
    data: {
      ko: "언어와 난이도 관련 질문이 163개(10.6%)로 두 번째로 큰 개념이었다. '한국어는 어렵나요?', '한국어는 일본어보다 어렵나요?'가 반복되었다.",
      en: "Language and difficulty questions totaled 163 (10.6%) — the second-largest concept. 'Is Korean hard?' and 'Is Korean harder than Japanese?' recurred across markets.",
    },
    interpretation: {
      ko: "대부분의 사람들은 '한국어를 배우고 싶다'가 아니라 '한국어가 얼마나 어려운가'로 한국어를 처음 만난다. 관심은 학습이 아니라 어려움으로 프레임된다.",
      en: "Most people first encounter Korean not through 'I want to learn it' but through 'how hard is it?' Interest is framed as difficulty, not as learning.",
    },
    implication: {
      ko: "관심이 진입로보다 빠르게 자라고 있다. 장벽은 어려운 언어가 아니라 부족한 입구다.",
      en: "Interest is outrunning access. The barrier is not a hard language — it's the missing on-ramps.",
    },
  },
  {
    n: "04",
    title: {
      ko: "음식과 '한국인은 어떤 사람들인가'는 거의 보편적이다",
      en: "Food and 'what are Koreans like' are near-universal",
    },
    data: {
      ko: "음식(140)과 국민성(143)이 3–4위에 올랐다. 이 두 개념은 거의 모든 시장에 등장하는 유일한 개념이었다.",
      en: "Cuisine (140) and national character (143) ranked 3rd–4th. These two concepts were the only ones that appeared in nearly every market.",
    },
    interpretation: {
      ko: "음식과 사람은 가장 마찰이 적은 진입점이다. 언어도 역사도 모르는 상태에서도 사람들은 '무엇을 먹는가'와 '어떤 사람들인가'를 질문한다.",
      en: "Food and people are the lowest-friction entry points. Even when people know nothing about the language or history, they ask 'what do they eat?' and 'what are they like?'",
    },
    implication: {
      ko: "보편적 진입점은 한국을 처음 설명할 때의 출발 지점이다. 음식과 사람에서 시작해 더 깊은 이해로 연결하는 경로가 필요하다.",
      en: "Universal entry points are the starting position for first explanations. Pathways are needed from food and people into deeper understanding.",
    },
  },
  {
    n: "05",
    title: {
      ko: "지정학이 전체 호기심의 23%를 차지한다",
      en: "Geopolitics accounts for 23% of all curiosity",
    },
    data: {
      ko: "분단·역사·지정학 주제가 348개로 한류(459)에 이어 2위였다. '한국은 안전한가', '전쟁이 일어날 수 있나', '왜 핵을 가지나'가 반복되었다.",
      en: "Division, history, and geopolitics totaled 348 questions — second only to Hallyu (459). 'Is Korea safe?', 'Could there be a war?', 'Why do they have nukes?' recurred across markets.",
    },
    interpretation: {
      ko: "한류와 안보는 세계가 한국을 이해하는 두 개의 축이다. 문화적 매력과 지정학적 불안이 동시에 존재한다.",
      en: "Hallyu and security are the two axes through which the world understands Korea. Cultural appeal and geopolitical anxiety coexist.",
    },
    implication: {
      ko: "문화만으로 한국을 설명하는 전략은 절반만 설명하는 것이다. 안보 프레임에 대한 응답이 함께 설계되어야 한다.",
      en: "A strategy that explains Korea only through culture is explaining only half. A response to the security frame must be designed alongside it.",
    },
  },
  {
    n: "06",
    title: {
      ko: "시장을 넘나드는 질문은 31%에 불과하다",
      en: "Only 31% of questions cross markets",
    },
    data: {
      ko: "1,540개 중 477개만 둘 이상의 시장에 등장했다. 나머지 69%는 시장 고유의 질문이었다.",
      en: "Only 477 of 1,540 appeared in more than one market. The remaining 69% were market-specific questions.",
    },
    interpretation: {
      ko: "세계는 '하나의 한국'을 질문하지 않는다. 국가마다 다른 한국을 질문하고, 다른 이미지를 형성한다.",
      en: "The world does not question 'one Korea.' Each country asks about a different Korea and forms a different image.",
    },
    implication: {
      ko: "하나의 메시지로 하나의 한국을 설명하는 전략은 작동하지 않는다. 시장별로 다른 시작점에서 출발하는 설명이 필요하다.",
      en: "A strategy that explains one Korea with one message won't work. Explanations must start from different starting points in each market.",
    },
  },
  {
    n: "07",
    title: {
      ko: "일부 국가는 한국을 문화보다 분단 국가로 먼저 만난다",
      en: "Some countries meet Korea through division before culture",
    },
    data: {
      ko: "브라질, 아랍권, 인도네시아에서는 북한, 분단, 전쟁 관련 질문 비중이 높게 나타났다.",
      en: "In Brazil, the Arab market, and Indonesia, questions about North Korea, division, and war appeared at notably high rates.",
    },
    interpretation: {
      ko: "모든 국가가 한국을 K-pop으로 만나는 것은 아니다. 일부 국가에게 한국은 문화 강국이기 전에 분단 국가, 안보 국가, 지정학적 행위자이다.",
      en: "Not every country meets Korea through K-pop. For some, Korea is a divided nation, a security actor, a geopolitical player — before it is a cultural power.",
    },
    implication: {
      ko: "하나의 한국 이미지를 전제로 한 공공외교는 한계를 가진다. 국가마다 다른 출발점에서 한국을 설명해야 한다.",
      en: "Public diplomacy premised on a single Korean image has limits. Korea must be explained from each country's starting point.",
    },
  },
  {
    n: "08",
    title: {
      ko: "가까운 국가는 현재보다 유산을 질문한다",
      en: "Close countries ask about heritage over the present",
    },
    data: {
      ko: "한국과 일본은 한글, 전통문화, 역사, 문화유산 질문 비중이 높았다.",
      en: "Korea and Japan showed high proportions of questions about Hangeul, traditional culture, history, and cultural heritage.",
    },
    interpretation: {
      ko: "가까운 국가는 한국을 낯선 문화로 소비하지 않는다. 오히려 어떤 역사와 기억이 지금의 한국을 만들었는가를 질문한다.",
      en: "Close countries don't consume Korea as an exotic culture. Instead, they ask what history and memory made today's Korea.",
    },
    implication: {
      ko: "문화유산은 과거가 아니다. 한국을 이해하는 또 하나의 입구다.",
      en: "Cultural heritage is not the past. It's another doorway into understanding Korea.",
    },
  },
  {
    n: "09",
    title: {
      ko: "가까운 국가는 문화를 넘어 사회를 질문한다",
      en: "Close countries ask beyond culture into society",
    },
    data: {
      ko: "일본은 K-pop, 아이돌뿐 아니라 예절, 사회 규범, 인간관계 관련 질문도 높게 나타났다.",
      en: "Japan showed high rates not only for K-pop and idols but also for manners, social norms, and interpersonal relationships.",
    },
    interpretation: {
      ko: "관심이 깊어질수록 질문은 콘텐츠에서 사회로 이동한다.",
      en: "As interest deepens, questions migrate from content to society.",
    },
    implication: {
      ko: "공공외교의 목표는 문화 소비가 아니라 사회 이해로 이어져야 한다.",
      en: "Public diplomacy should lead not to cultural consumption but to social understanding.",
    },
  },
  {
    n: "10",
    title: {
      ko: "새로운 청중은 한국 자체를 먼저 질문한다",
      en: "New audiences question Korea itself first",
    },
    data: {
      ko: "인도네시아에서는 '한국은 무엇으로 유명한가', '한국은 어떤 나라인가'와 같은 입문형 질문이 많았다.",
      en: "In Indonesia, introductory questions like 'What is Korea famous for?' and 'What kind of country is Korea?' appeared at high rates.",
    },
    interpretation: {
      ko: "정보가 많은 사회는 세부 질문을 남긴다. 정보가 적은 사회는 국가 자체를 이해하려고 한다. 질문의 수준은 관심의 수준이 아니라 접촉의 단계일 수 있다.",
      en: "Information-rich societies leave detailed questions. Information-sparse societies try to understand the country itself. The level of a question may reflect the stage of contact, not the level of interest.",
    },
    implication: {
      ko: "새로운 시장에서는 깊은 설명보다 첫 번째 이해가 중요하다.",
      en: "In new markets, the first understanding matters more than deep explanation.",
    },
  },
];

// ── unexpected questions ─────────────────────────────────────────────────────
interface UnexpectedQ {
  question: L;
  meaning: L;
}

const UNEXPECTED: UnexpectedQ[] = [
  {
    question: {
      ko: "한국인은 왜 영어를 배우나요?",
      en: "Why do Koreans learn English?",
    },
    meaning: {
      ko: "영어 능력에 대한 관심이 아니라 한국 사회의 경쟁 구조를 이해하려는 질문이다.",
      en: "Not a question about English ability — it's a question trying to understand Korea's competitive social structure.",
    },
  },
  {
    question: {
      ko: "한국은 왜 분단되었나요?",
      en: "Why was Korea divided?",
    },
    meaning: {
      ko: "역사 질문이 아니라 현재 한국을 이해하려는 질문이다.",
      en: "Not a history question — it's a question to understand Korea as it is now.",
    },
  },
  {
    question: {
      ko: "한국인은 왜 금속 젓가락을 쓰나요?",
      en: "Why do Koreans use metal chopsticks?",
    },
    meaning: {
      ko: "식기 질문이 아니라 '왜 다른가'를 통해 한국의 일상을 이해하려는 질문이다.",
      en: "Not about utensils — it's trying to understand Korean daily life through 'why is it different?'",
    },
  },
  {
    question: {
      ko: "왜 한국 남성은 수염이 없나요?",
      en: "Why don't Korean men have beards?",
    },
    meaning: {
      ko: "외모 질문이 아니라 한국의 미적 기준과 사회 규범을 이해하려는 질문이다.",
      en: "Not about appearance — it's trying to understand Korea's beauty standards and social norms.",
    },
  },
  {
    question: {
      ko: "원화는 왜 이렇게 약한가요?",
      en: "Why is the Korean won so weak?",
    },
    meaning: {
      ko: "환율 질문이 아니라 한국의 경제적 위상에 대한 불확실성을 드러내는 질문이다.",
      en: "Not a currency question — it reveals uncertainty about Korea's economic standing.",
    },
  },
];

// ── country profiles ─────────────────────────────────────────────────────────
interface CountryProfile {
  flag: string;
  code: string;
  name: L;
  topics: L;
  reading: L;
}

const COUNTRY_PROFILES: CountryProfile[] = [
  {
    flag: "🇩🇪",
    code: "DE",
    name: { ko: "독일", en: "Germany" },
    topics: { ko: "기술 · 역사 · 언어", en: "Technology · History · Language" },
    reading: { ko: "한국을 산업국가로 이해", en: "Understands Korea as an industrial nation" },
  },
  {
    flag: "🇧🇷",
    code: "BR",
    name: { ko: "브라질", en: "Brazil" },
    topics: { ko: "음식 · 한류 · 뷰티", en: "Food · Hallyu · Beauty" },
    reading: { ko: "한국을 문화국가로 이해", en: "Understands Korea as a cultural nation" },
  },
  {
    flag: "🇯🇵",
    code: "JP",
    name: { ko: "일본", en: "Japan" },
    topics: { ko: "예절 · 사회 · 문화", en: "Etiquette · Society · Culture" },
    reading: { ko: "한국을 생활세계로 이해", en: "Understands Korea as a lived world" },
  },
  {
    flag: "🇮🇩",
    code: "ID",
    name: { ko: "인도네시아", en: "Indonesia" },
    topics: { ko: "분단 · 국가 기본 · 뷰티", en: "Division · Country basics · Beauty" },
    reading: { ko: "한국을 알고 싶은 나라로 이해", en: "Understands Korea as a country to discover" },
  },
  {
    flag: "🇦🇪",
    code: "AE",
    name: { ko: "아랍권", en: "Arab Market" },
    topics: { ko: "분단 · 음식 · 드라마", en: "Division · Food · Drama" },
    reading: { ko: "한국을 지정학과 콘텐츠의 이중상으로 이해", en: "Understands Korea as a dual image of geopolitics and content" },
  },
  {
    flag: "🇺🇸",
    code: "US+IN",
    name: { ko: "영어권 (미국+인도)", en: "English (US+India)" },
    topics: { ko: "사람 · 여행 · 분단 · 언어", en: "People · Travel · Division · Language" },
    reading: { ko: "한국을 넓게 그러나 얕게 이해", en: "Understands Korea broadly but shallowly" },
  },
  {
    flag: "🇰🇷",
    code: "KR",
    name: { ko: "한국", en: "Korea" },
    topics: { ko: "사람 · 문화유산 · 사회", en: "People · Heritage · Society" },
    reading: { ko: "외국인의 시선으로 자신을 질문", en: "Questions itself through foreign eyes" },
  },
];

// ── pathway example steps ────────────────────────────────────────────────────
interface PathwayStep {
  label: L;
  level: L;
}

const PATHWAY_EXAMPLE: PathwayStep[] = [
  { label: { ko: "Why is K-pop so popular?", en: "Why is K-pop so popular?" }, level: { ko: "질문", en: "Question" } },
  { label: { ko: "K-팝", en: "K-Pop" }, level: { ko: "개념", en: "Concept" } },
  { label: { ko: "한류", en: "The Korean Wave" }, level: { ko: "주제", en: "Theme" } },
  { label: { ko: "세계적 문화 강국", en: "Global cultural force" }, level: { ko: "서사", en: "Narrative" } },
  { label: { ko: "한국은 세계적 문화국가", en: "Korea as a world cultural power" }, level: { ko: "인식", en: "Perception" } },
];

// ── data strip ───────────────────────────────────────────────────────────────
const DATA_STRIP: { value: string; label: L }[] = [
  { value: "1,540", label: { ko: "개 질문", en: "Questions" } },
  { value: "8", label: { ko: "개 주제", en: "Topics" } },
  { value: "8", label: { ko: "개 국가", en: "Countries" } },
  { value: "7", label: { ko: "개 언어", en: "Languages" } },
];

// ── sub-components ───────────────────────────────────────────────────────────

function DataStrip({ locale }: { locale: "ko" | "en" }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {DATA_STRIP.map((d) => (
        <div
          key={d.label.en}
          className="rounded-xl border border-border bg-white px-4 py-4 text-center"
        >
          <div className="text-2xl font-bold tabular-nums text-navy sm:text-3xl">
            {d.value}
          </div>
          <div className="mt-1 text-[13px] text-secondary">
            {d.label[locale]}
          </div>
        </div>
      ))}
    </div>
  );
}

function FindingCard({
  finding,
  locale,
}: {
  finding: FindingData;
  locale: "ko" | "en";
}) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-card">
      {/* title bar */}
      <div className="border-b border-border px-6 py-5 sm:px-7">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-bold text-[color:var(--accent)]">
            {finding.n}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-navy sm:text-xl">
            {finding.title[locale]}
          </h3>
        </div>
      </div>

      <div className="grid gap-0 divide-y divide-border">
        {/* data */}
        <div className="px-6 py-5 sm:px-7">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {locale === "ko" ? "데이터" : "Data"}
          </div>
          <p className="text-[15px] leading-relaxed text-secondary">
            {finding.data[locale]}
          </p>
        </div>

        {/* interpretation */}
        <div className="px-6 py-5 sm:px-7">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "해석" : "Interpretation"}
          </div>
          <p className="text-[15.5px] leading-relaxed text-navy">
            {finding.interpretation[locale]}
          </p>
        </div>

        {/* implication */}
        <div
          className="rounded-b-2xl px-6 py-5 sm:px-7"
          style={{
            background:
              "color-mix(in srgb, var(--accent) 5%, transparent)",
          }}
        >
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "함의" : "Implication"}
          </div>
          <p className="text-[15px] leading-relaxed text-navy">
            {finding.implication[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}

function PathwayTrace({ locale }: { locale: "ko" | "en" }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {PATHWAY_EXAMPLE.map((step, i) => (
        <React.Fragment key={step.level.en}>
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {step.level[locale]}
            </span>
            <span
              className="rounded-lg border px-3 py-2 text-center text-[13px] font-medium leading-tight text-navy"
              style={{
                borderColor:
                  i === 0
                    ? "var(--border-strong)"
                    : "color-mix(in srgb, var(--accent) 40%, transparent)",
                background:
                  i === PATHWAY_EXAMPLE.length - 1
                    ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                    : "white",
              }}
            >
              {step.label[locale]}
            </span>
          </div>
          {i < PATHWAY_EXAMPLE.length - 1 && (
            <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── main component ───────────────────────────────────────────────────────────

export function DataReport() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── data strip ── */}
      <DocSection>
        <DataStrip locale={locale} />
      </DocSection>

      {/* ── section: entry points (findings 01-04) ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "진입점" : "Entry points"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "세계는 어떤 문을 통해 한국으로 들어오는가"
            : "Which doors does the world use to enter Korea?"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "문화, 분단, 언어, 음식, 사람 — 다섯 개의 진입점이 세계의 한국 이해를 형성한다."
            : "Culture, division, language, food, people — five entry points shape how the world understands Korea."}
        </Lead>
        <div className="mt-8 grid gap-6">
          {FINDINGS.slice(0, 4).map((f) => (
            <FindingCard key={f.n} finding={f} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── section: structural patterns (findings 05-06) ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "구조적 패턴" : "Structural patterns"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "하나의 한국이 아니라 여러 개의 한국이 질문된다"
            : "Not one Korea but many are questioned"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "세계는 한국에 대해 같은 질문을 하지 않는다. 시장마다 다른 한국을 질문하고, 다른 이미지를 만든다."
            : "The world doesn't ask the same questions about Korea. Each market questions a different Korea and builds a different image."}
        </Lead>
        <div className="mt-8 grid gap-6">
          {FINDINGS.slice(4, 6).map((f) => (
            <FindingCard key={f.n} finding={f} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── section: country differences (findings 07-10) ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "국가별 차이" : "Country differences"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "국가마다 다른 한국을 만난다"
            : "Each country meets a different Korea"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "브라질에게 한국은 분단 국가이고, 일본에게 한국은 이웃의 생활세계이며, 인도네시아에게 한국은 아직 알아가는 중인 나라다."
            : "To Brazil, Korea is a divided nation. To Japan, a neighbor's lived world. To Indonesia, a country still being discovered."}
        </Lead>
        <div className="mt-8 grid gap-6">
          {FINDINGS.slice(6, 10).map((f) => (
            <FindingCard key={f.n} finding={f} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── section: country comparison ── */}
      <DocSection>
        <Kicker>
          {locale === "ko"
            ? "국가는 서로 다른 한국을 질문했다"
            : "Each country questioned a different Korea"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "같은 나라, 다른 이미지"
            : "Same country, different images"}
        </H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRY_PROFILES.map((cp) => (
            <div
              key={cp.code}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{cp.flag}</span>
                <span className="text-[15px] font-semibold text-navy">
                  {cp.name[locale]}
                </span>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {cp.code}
                </span>
              </div>
              <div className="mt-3 text-[13px] font-medium text-secondary">
                {cp.topics[locale]}
              </div>
              <div
                className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-navy"
                style={{
                  background:
                    "color-mix(in srgb, var(--accent) 8%, transparent)",
                }}
              >
                <ArrowRight className="h-3.5 w-3.5 text-[color:var(--accent)]" />
                {cp.reading[locale]}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── section: question → perception pathway ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "질문은 어떻게 국가 이미지가 되는가"
            : "How a question becomes a national image"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문에서 인식으로"
            : "From question to perception"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "하나의 질문이 반복되면 개념이 되고, 개념이 모이면 주제가 되고, 주제가 쌓이면 서사가 되고, 서사는 국가 이미지가 된다."
            : "A question repeated becomes a concept. Concepts cluster into themes. Themes build narratives. Narratives become a national image."}
        </Lead>
        <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="mb-4 text-[13px] font-semibold text-navy">
            {locale === "ko" ? "실제 질문 경로" : "A real question's path"}
          </div>
          <PathwayTrace locale={locale} />
          <p className="mt-5 text-[14px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "\"왜 K-pop이 인기인가요?\"라는 하나의 질문은, K-팝 개념에 합류하고, 한류라는 주제 안에서 다른 질문들과 만나고, 문화 강국이라는 서사를 강화하고, 결국 '한국은 세계적 문화국가'라는 인식을 만든다."
              : "A single question — 'Why is K-pop so popular?' — joins the K-Pop concept, meets other questions inside the Korean Wave theme, reinforces the cultural-force narrative, and ultimately shapes the perception: 'Korea is a world cultural power.'"}
          </p>
        </div>
      </DocSection>

      {/* ── section: unexpected questions ── */}
      <DocSection>
        <Kicker>
          {locale === "ko"
            ? "우리가 예상하지 못했던 질문들"
            : "Questions we didn't expect"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "표면 아래의 질문들"
            : "Questions beneath the surface"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "어떤 질문은 겉으로 보이는 것과 다른 것을 묻고 있다."
            : "Some questions ask something different from what they appear to."}
        </Lead>
        <div className="mt-8 grid gap-4">
          {UNEXPECTED.map((u) => (
            <div
              key={u.question.en}
              className="grid gap-3 rounded-xl border border-border bg-white p-5 sm:grid-cols-[1fr_1fr] sm:gap-6 sm:p-6"
            >
              <div>
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ko" ? "질문" : "Question"}
                </div>
                <p className="text-[16px] font-semibold leading-snug text-navy">
                  {u.question[locale]}
                </p>
              </div>
              <div>
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                  {locale === "ko" ? "실제 의미" : "What it really asks"}
                </div>
                <p className="text-[15px] leading-relaxed text-secondary">
                  {u.meaning[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── section: policy implications ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "정책적 함의"
            : "Policy implications"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 공공외교의 출발점이다"
            : "Questions are where public diplomacy begins"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-navy">
            {locale === "ko"
              ? "질문은 단순한 호기심이 아니다."
              : "Questions are not mere curiosity."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들은 질문을 통해 국가를 이해한다. 따라서 공공외교는 '무엇을 말할 것인가'보다 '사람들이 무엇을 묻고 있는가'에서 시작해야 한다."
              : "People understand a country through questions. Public diplomacy must begin not with 'what shall we say?' but with 'what are people asking?'"}
          </p>
          <p className="mt-3 text-[17px] font-medium leading-[1.8] text-navy">
            {locale === "ko"
              ? "한국을 설명하는 전략보다 질문에 응답하는 전략이 필요하다."
              : "What's needed is not a strategy for explaining Korea, but a strategy for answering questions."}
          </p>
        </div>
      </DocSection>

      {/* ── conclusion ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "결론" : "Conclusion"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 국가 이미지를 만든다"
            : "Questions build a national image"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들은 한국을 방문하기 전에 검색한다. 질문한다. 비교한다."
              : "Before visiting Korea, people search. They ask. They compare."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그 질문이 반복될수록 개념이 되고, 주제가 되고, 서사가 되고, 국가 이미지가 된다."
              : "As those questions repeat, they become concepts, then themes, then narratives, then a national image."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "이 보고서는 1,540개의 질문을 통해 세계가 한국을 어떻게 이해하고 있는지 읽은 결과다."
              : "This report is the result of reading how the world understands Korea through 1,540 questions."}
          </p>
        </div>
      </DocSection>

      {/* ── bridge to next rung ── */}
      <DocSection tint>
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 해석" : "Next rung · Interpretation"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 '세계가 무엇을 질문하는가'입니다. 이 질문들이 한국의 이미지에 대해 무엇을 의미하는지는 공공외교 브리프에서 다룹니다."
              : "This is 'what the world asks.' What these questions mean for Korea's image is the work of the Diplomacy Brief."}
          </p>
          <Link
            href="/research/diplomacy-brief"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "공공외교 브리프 읽기" : "Read the Diplomacy Brief"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
