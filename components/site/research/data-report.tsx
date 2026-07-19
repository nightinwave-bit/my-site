"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, Accented, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

/* ─── Section 1: stat strip ─── */
const STATS: { value: string; label: L }[] = [
  { value: "1,540", label: D("질문", "Questions") },
  { value: "7", label: D("언어", "Languages") },
  { value: "8", label: D("국가", "Countries") },
];

/* ─── Section 3: country cards ─── */
interface CountryProfile {
  flag: string;
  code: string;
  name: L;
  topics: L;
  reading: L;
}

const COUNTRIES: CountryProfile[] = [
  {
    flag: "\u{1F1E9}\u{1F1EA}",
    code: "DE",
    name: D("독일", "Germany"),
    topics: D("기술 · 역사 · 언어", "Technology · History · Language"),
    reading: D("산업국가로 질문", "Asked as an industrial nation"),
  },
  {
    flag: "\u{1F1E7}\u{1F1F7}",
    code: "BR",
    name: D("브라질", "Brazil"),
    topics: D("음식 · 한류 · 뷰티", "Food · Hallyu · Beauty"),
    reading: D("문화국가로 질문", "Asked as a cultural nation"),
  },
  {
    flag: "\u{1F1EF}\u{1F1F5}",
    code: "JP",
    name: D("일본", "Japan"),
    topics: D("예절 · 사회 · 문화", "Etiquette · Society · Culture"),
    reading: D("생활세계로 질문", "Asked as a lived world"),
  },
  {
    flag: "\u{1F1EE}\u{1F1E9}",
    code: "ID",
    name: D("인도네시아", "Indonesia"),
    topics: D("분단 · 국가 기본 · 뷰티", "Division · Nation basics · Beauty"),
    reading: D("알고 싶은 나라로 질문", "Asked as a country to discover"),
  },
  {
    flag: "\u{1F1E6}\u{1F1EA}",
    code: "AE",
    name: D("아랍권", "Arab world"),
    topics: D("분단 · 음식 · 드라마", "Division · Food · Drama"),
    reading: D("지정학과 콘텐츠의 이중상", "Duality of geopolitics and content"),
  },
  {
    flag: "\u{1F1FA}\u{1F1F8}",
    code: "US+IN",
    name: D("영어권", "English-speaking"),
    topics: D("사람 · 여행 · 분단 · 언어", "People · Travel · Division · Language"),
    reading: D("넓게 그러나 얕게", "Wide but shallow"),
  },
  {
    flag: "\u{1F1F0}\u{1F1F7}",
    code: "KR",
    name: D("한국", "Korea"),
    topics: D("사람 · 문화유산 · 사회", "People · Heritage · Society"),
    reading: D("외국인의 시선으로 자신을 질문", "Asking about itself through foreign eyes"),
  },
];

export function DataReport() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Section 1: Overview stat strip */}
      <DocSection>
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label.en}
              className="rounded-xl border border-border bg-white px-4 py-5 text-center"
            >
              <div className="text-3xl font-bold tabular-nums text-navy sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] text-secondary">
                {s.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section 2: Most frequent topics */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "주제 분포" : "Topic distribution"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "문화가 가장 강력한 진입점이다"
            : "Culture is the strongest entry point"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "1,540개 질문 중 가장 큰 비중을 차지하는 주제는 한류·K-pop·음식·드라마로 구성된 문화 클러스터다."
            : "Among 1,540 questions, the largest share belongs to the culture cluster: Hallyu, K-pop, food, and drama."}
        </Lead>
        <div className="mt-8 space-y-4">
          <Finding
            n="01"
            head={locale === "ko" ? "한류 · K-pop · 드라마" : "Hallyu · K-pop · Drama"}
            body={locale === "ko"
              ? "전체 질문의 약 28%가 한국 대중문화에 집중된다. 음악, 드라마, 아이돌에 대한 질문이 모든 국가에서 반복된다."
              : "About 28% of all questions focus on Korean pop culture. Questions about music, drama, and idols repeat across every country."}
          />
          <Finding
            n="02"
            head={locale === "ko" ? "음식 · 뷰티 · 라이프스타일" : "Food · Beauty · Lifestyle"}
            body={locale === "ko"
              ? "약 19%가 일상 문화에 해당한다. 김치, 스킨케어, 한국식 식사 예절이 빈출 질문이다."
              : "About 19% concern daily culture. Kimchi, skincare, and Korean dining etiquette are frequent questions."}
          />
          <Finding
            n="03"
            head={locale === "ko" ? "분단 · 지정학" : "Division · Geopolitics"}
            body={locale === "ko"
              ? "약 16%가 남북 분단과 군사적 긴장을 다룬다. 문화 다음으로 가장 큰 단일 주제군이다."
              : "About 16% deal with North-South division and military tension. The largest single topic cluster after culture."}
          />
          <Finding
            n="04"
            head={locale === "ko" ? "언어 · 문자" : "Language · Script"}
            body={locale === "ko"
              ? "약 11%가 한국어 난이도, 한글, 언어 학습에 관한 질문이다."
              : "About 11% are questions about Korean language difficulty, Hangul, and language learning."}
          />
        </div>
      </DocSection>

      {/* Section 3: Country differences */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "국가별 차이" : "Country differences"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "같은 나라, 다른 질문"
            : "Same country, different questions"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "각 국가는 서로 다른 한국을 질문한다."
            : "Each country asks about a different Korea."}
        </Lead>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COUNTRIES.map((c) => (
            <div
              key={c.code}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{c.flag}</span>
                <span className="text-[15px] font-semibold text-navy">
                  {c.name[locale]}
                </span>
                <span className="ml-auto text-[11px] font-mono text-muted-foreground">
                  {c.code}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-secondary">
                {c.topics[locale]}
              </p>
              <p className="mt-2 text-[13px] font-medium text-navy">
                {c.reading[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section 4: Questions that repeat globally */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "공통 질문" : "Shared questions"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "시장을 넘나드는 질문은 31%에 불과하다"
            : "Only 31% of questions cross markets"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "69%의 질문은 특정 국가에서만 나타난다. 나머지 31%만이 복수의 시장에서 반복된다."
            : "69% of questions appear only in specific countries. Only the remaining 31% repeat across multiple markets."}
        </Lead>
        <div className="mt-8 space-y-4">
          <Finding
            n="01"
            head={locale === "ko" ? "두 개의 한국" : "The two Koreas"}
            body={locale === "ko"
              ? "\"왜 한국은 둘로 나뉘었는가\"는 거의 모든 언어권에서 반복된다. 분단은 가장 보편적인 공통 질문이다."
              : "\"Why is Korea divided?\" repeats in nearly every language. Division is the most universal shared question."}
          />
          <Finding
            n="02"
            head={locale === "ko" ? "한국어는 어렵다" : "Korean is hard"}
            body={locale === "ko"
              ? "\"한국어는 배우기 어려운가\"가 7개 언어권 중 6개에서 등장한다. 언어 난이도는 두 번째 공통 프레임이다."
              : "\"Is Korean hard to learn?\" appears in 6 of 7 language markets. Language difficulty is the second shared frame."}
          />
          <Finding
            n="03"
            head={locale === "ko" ? "K-pop은 왜 인기 있는가" : "Why is K-pop popular?"}
            body={locale === "ko"
              ? "K-pop의 인기에 대한 '왜' 질문이 5개 시장에서 공통 출현한다. 현상 자체보다 원인을 묻는다."
              : "The 'why' question about K-pop's popularity appears across 5 markets. People ask about causes, not just the phenomenon."}
          />
        </div>
      </DocSection>

      {/* Section 5: Country-specific questions */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "고유 질문" : "Unique questions"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "가까운 국가는 사회를, 먼 국가는 문화를 질문한다"
            : "Proximate countries ask about society; distant ones about culture"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "지리적·문화적 거리가 질문의 깊이를 결정한다."
            : "Geographic and cultural distance determines the depth of inquiry."}
        </Lead>
        <div className="mt-8 space-y-4">
          <Finding
            n="01"
            head={locale === "ko" ? "일본: 예절과 일상" : "Japan: etiquette and daily life"}
            body={locale === "ko"
              ? "일본은 한국의 사회 규범, 식사 예절, 직장 문화를 질문한다. 가장 구체적이고 생활 밀착형 질문군이다."
              : "Japan asks about Korean social norms, dining etiquette, and workplace culture. The most specific and life-oriented question cluster."}
          />
          <Finding
            n="02"
            head={locale === "ko" ? "인도네시아·브라질: 한국이란 무엇인가" : "Indonesia & Brazil: What is Korea?"}
            body={locale === "ko"
              ? "먼 국가들은 입문형 질문을 던진다. \"한국은 어디에 있는가\", \"한국인은 무엇을 먹는가\"와 같은 기초 정보 질문이 두드러진다."
              : "Distant countries ask introductory questions. Basic information questions like \"Where is Korea?\" and \"What do Koreans eat?\" are prominent."}
          />
          <Finding
            n="03"
            head={locale === "ko" ? "독일: 산업과 기술" : "Germany: industry and technology"}
            body={locale === "ko"
              ? "독일은 삼성, 현대, 반도체와 같은 산업 키워드를 통해 한국을 질문한다. 문화보다 경제적 렌즈가 우세하다."
              : "Germany asks about Korea through industrial keywords like Samsung, Hyundai, and semiconductors. The economic lens dominates over culture."}
          />
        </div>
      </DocSection>

      {/* Section 6: Patterns questions form */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "패턴" : "Patterns"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "단일 최대 질문은 '두 개의 한국'이다"
            : "The single largest question is 'the two Koreas'"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "세계는 한국을 문화로 진입하지만, 분단으로 정의한다."
            : "The world enters Korea through culture, but defines it through division."}
        </Lead>
        <div className="mt-8 space-y-4">
          <Finding
            n="01"
            head={locale === "ko" ? "분단: 242개 질문 (15.7%)" : "Division: 242 questions (15.7%)"}
            body={locale === "ko"
              ? "어떤 단일 한류 개념보다 큰 비중이다. 분단은 개별 주제로서 가장 큰 질문군을 형성한다."
              : "Larger than any single Hallyu concept. Division forms the largest question cluster as an individual topic."}
          />
          <Finding
            n="02"
            head={locale === "ko" ? "언어 난이도: 163개 질문 (10.6%)" : "Language difficulty: 163 questions (10.6%)"}
            body={locale === "ko"
              ? "한국어에 대한 질문은 대부분 '어렵다'라는 프레임을 통과한다. 학습 의지보다 난이도 판단이 선행된다."
              : "Most questions about Korean pass through the frame of 'difficulty.' Judgment of difficulty precedes willingness to learn."}
          />
          <Finding
            n="03"
            head={locale === "ko" ? "문화는 진입점, 분단은 정의 프레임" : "Culture is the entry point; division is the defining frame"}
            body={locale === "ko"
              ? "K-pop·음식·드라마가 한국을 처음 검색하게 만들지만, 질문이 깊어지면 분단과 지정학이 한국을 규정하는 축이 된다."
              : "K-pop, food, and drama make people first search for Korea, but as questions deepen, division and geopolitics become the axis that defines Korea."}
          />
        </div>
      </DocSection>

      {/* Section 7: Conclusion — accented bold statement */}
      <DocSection tint>
        <div className="py-4 sm:py-8">
          <Accented label={locale === "ko" ? "결론" : "Conclusion"}>
            <p className="text-[19px] font-bold leading-[1.7] sm:text-[22px]">
              {locale === "ko"
                ? "세계는 하나의 한국을 질문하지 않는다. 각 나라는 자신의 언어, 거리, 관심에 따라 서로 다른 한국을 구성한다."
                : "The world does not ask about one Korea. Each country constructs a different Korea according to its own language, distance, and interest."}
            </p>
          </Accented>
        </div>
      </DocSection>
    </>
  );
}
