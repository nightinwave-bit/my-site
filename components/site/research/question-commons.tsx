"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Accented, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

/* ── observation categories ── */
interface ObservationCategory {
  title: L;
  description: L;
}

const OBSERVATION_CATEGORIES: ObservationCategory[] = [
  {
    title: D("지금 막 나타난 질문", "Emerging questions"),
    description: D(
      "새로운 기술이나 사건이 만든 질문",
      "Questions created by new technologies or events",
    ),
  },
  {
    title: D("최근 증가한 질문", "Rising questions"),
    description: D(
      "빈도가 급격히 증가한 질문 패턴",
      "Question patterns with rapidly increasing frequency",
    ),
  },
  {
    title: D("국가별 신규 질문", "Country-specific new questions"),
    description: D(
      "특정 국가에서만 나타나는 질문",
      "Questions that appear only in specific countries",
    ),
  },
  {
    title: D("새로운 한국 이미지", "New Korea images"),
    description: D(
      "기존 서사에 포함되지 않는 새로운 인식",
      "New perceptions not captured by existing narratives",
    ),
  },
  {
    title: D("사라지는 질문", "Fading questions"),
    description: D(
      "더 이상 묻지 않는 것도 변화의 신호다",
      "What people stop asking is also a signal of change",
    ),
  },
];

/* ── why questions change: drivers ── */
interface ChangeDriver {
  title: L;
  description: L;
}

const CHANGE_DRIVERS: ChangeDriver[] = [
  {
    title: D("기술 변화", "Technological change"),
    description: D(
      "AI, 검색, 소셜미디어가 질문 방식을 바꾼다",
      "AI, search, and social media are changing how people ask questions",
    ),
  },
  {
    title: D("사건", "Events"),
    description: D(
      "정치적 사건, 문화 현상, 경제 변동이 새로운 질문을 만든다",
      "Political events, cultural phenomena, and economic shifts create new questions",
    ),
  },
  {
    title: D("세대", "Generations"),
    description: D(
      "새로운 세대는 다른 한국을 궁금해한다",
      "New generations are curious about a different Korea",
    ),
  },
];

/* ── observation methodology ── */
interface MethodStep {
  title: L;
  description: L;
}

const METHOD_STEPS: MethodStep[] = [
  {
    title: D("주기적 질문 수집", "Periodic question collection"),
    description: D(
      "정기적으로 새로운 검색 질문을 수집한다",
      "New search questions are collected on a regular basis",
    ),
  },
  {
    title: D("변화 감지", "Change detection"),
    description: D(
      "이전 데이터와 비교하여 변화 패턴을 식별한다",
      "Change patterns are identified by comparing against previous data",
    ),
  },
  {
    title: D("구조적 해석", "Structural interpretation"),
    description: D(
      "변화가 한국 이해 모델의 어떤 층위에서 일어나는지 분석한다",
      "Analysis of which layer of the Korea-understanding model the change occurs at",
    ),
  },
];

/* ── why it matters ── */
interface ImplicationItem {
  kicker: L;
  title: L;
  body: L;
}

const IMPLICATIONS: ImplicationItem[] = [
  {
    kicker: D("정책적 함의", "Policy implications"),
    title: D("시의성 확보", "Ensuring timeliness"),
    body: D(
      "과거 질문에 기반한 정책은 현재의 관심과 어긋날 수 있다. 관측소는 정책의 시의성을 확보한다.",
      "Policies based on past questions can fall out of step with current interests. The observatory ensures policy timeliness.",
    ),
  },
  {
    kicker: D("사회적 함의", "Social implications"),
    title: D("인식 격차 해소", "Closing the perception gap"),
    body: D(
      "세계가 한국에 대해 궁금해하는 것은 끊임없이 변한다. 이 변화를 읽지 못하면 한국과 세계의 인식 격차는 벌어진다.",
      "What the world is curious about regarding Korea changes constantly. Failing to read this change widens the perception gap between Korea and the world.",
    ),
  },
  {
    kicker: D("공공외교 함의", "Public diplomacy implications"),
    title: D("선제적 커뮤니케이션", "Proactive communication"),
    body: D(
      "질문의 변화를 추적하면, 사후 대응이 아닌 선제적 커뮤니케이션이 가능해진다.",
      "By tracking how questions change, proactive communication becomes possible instead of reactive responses.",
    ),
  },
];

/* ── main ── */

export function QuestionObservatory() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── 1. opening ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "질문 관측소" : "Question Observatory"}</Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 끝나지 않는다"
            : "Questions never end"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "국가 이미지는 완성품이 아니다. 새로운 기술, 새로운 사건, 새로운 세대가 한국을 만난다. 그때마다 질문은 달라진다."
            : "National image is not a finished product. New technologies, new events, new generations encounter Korea. Each time, the questions change."}
        </Lead>
        <Lead>
          {locale === "ko"
            ? "질문 관측소는 세계가 한국을 바라보는 시선의 변화를 기록하는 공간이다."
            : "The Question Observatory is a space that records how the world's gaze upon Korea shifts over time."}
        </Lead>
      </DocSection>

      {/* ── 2. what we observe ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "관측 대상" : "What we observe"}</Kicker>
        <H2>
          {locale === "ko"
            ? "다섯 가지 관측 범주"
            : "Five observation categories"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문의 변화를 포착하기 위해 다섯 가지 범주를 관측한다. 각 범주는 세계가 한국을 이해하는 방식의 서로 다른 측면을 드러낸다."
            : "We observe five categories to capture how questions change. Each category reveals a different facet of how the world comes to understand Korea."}
        </Lead>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBSERVATION_CATEGORIES.map((cat) => (
            <div
              key={cat.title.en}
              className="flex flex-col rounded-xl border border-border bg-white p-5 sm:p-6"
            >
              <h3 className="text-[17px] font-semibold text-navy">
                {cat.title[locale]}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-secondary">
                {cat.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── 3. why questions change ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "질문이 바뀌는 이유" : "Why questions change"}</Kicker>
        <H2>
          {locale === "ko"
            ? "세 가지 변화 동인"
            : "Three drivers of change"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문은 저절로 바뀌지 않는다. 기술, 사건, 세대라는 세 가지 힘이 질문의 방향을 바꾼다."
            : "Questions do not change by themselves. Three forces shift the direction of questions: technology, events, and generations."}
        </Lead>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {CHANGE_DRIVERS.map((driver) => (
            <div
              key={driver.title.en}
              className="rounded-xl border border-border bg-white p-5 sm:p-6"
            >
              <h3 className="text-[17px] font-semibold text-navy">
                {driver.title[locale]}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-secondary">
                {driver.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── 4. core declaration ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "핵심 선언" : "Core declaration"}</Kicker>
        <p className="max-w-[44ch] text-[26px] font-bold leading-snug tracking-tight text-[color:var(--accent)] sm:text-[32px]">
          {locale === "ko"
            ? "국가 이미지는 관리하는 것이 아니라 관찰하는 것이다."
            : "National image is not something to manage — it is something to observe."}
        </p>
        <Lead>
          {locale === "ko"
            ? "관리는 메시지를 통제하려는 시도다. 관찰은 변화를 읽고 그 의미를 해석하는 행위다. 질문 관측소는 관리가 아닌 관찰의 입장에 선다."
            : "Management is an attempt to control the message. Observation is the act of reading change and interpreting its meaning. The Question Observatory stands on the side of observation, not management."}
        </Lead>
      </DocSection>

      {/* ── 5. how observation works ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "관측 방법론" : "How observation works"}</Kicker>
        <H2>
          {locale === "ko"
            ? "관측의 세 단계"
            : "Three steps of observation"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문의 변화를 체계적으로 포착하기 위해 세 단계의 관측 방법론을 따른다."
            : "To systematically capture how questions change, we follow a three-step observation methodology."}
        </Lead>
        <div className="mt-7 grid gap-3">
          {METHOD_STEPS.map((step, i) => (
            <div
              key={step.title.en}
              className="grid grid-cols-[40px_1fr] gap-x-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-[52px_1fr] sm:p-6"
            >
              <div className="pt-0.5 font-mono text-sm font-bold text-[color:var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold leading-snug text-navy">
                  {step.title[locale]}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                  {step.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── 6. why it matters ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "왜 중요한가" : "Why it matters"}</Kicker>
        <H2>
          {locale === "ko"
            ? "관측이 만드는 세 가지 가능성"
            : "Three possibilities observation creates"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문의 변화를 관측하는 것은 단순한 기록이 아니다. 정책, 사회, 공공외교 세 차원에서 실질적인 함의를 갖는다."
            : "Observing how questions change is more than mere record-keeping. It carries practical implications across three dimensions: policy, society, and public diplomacy."}
        </Lead>
        <div className="mt-7 grid gap-4">
          {IMPLICATIONS.map((item) => (
            <div
              key={item.kicker.en}
              className="rounded-xl border border-border bg-white p-5 sm:p-6"
            >
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                {item.kicker[locale]}
              </div>
              <h3 className="text-[17px] font-semibold leading-snug text-navy">
                {item.title[locale]}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                {item.body[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── 7. conclusion ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "결론" : "Conclusion"}</Kicker>
        <H2>
          {locale === "ko"
            ? "설명이 아니라 관찰이다"
            : "Not explanation, but observation"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문은 끝나지 않는다. 새로운 기술이 등장하고, 새로운 사건이 일어나고, 새로운 세대가 등장할 때마다 질문은 바뀐다. 이 변화를 기록하고 해석하는 것이 질문 관측소의 역할이다."
            : "Questions never end. Every time new technologies emerge, new events unfold, and new generations appear, questions change. Recording and interpreting this change is the role of the Question Observatory."}
        </Lead>
        <Accented label={locale === "ko" ? "핵심 메시지" : "Core message"}>
          {locale === "ko"
            ? "우리는 한국을 설명하는 것이 아니라 세상이 한국을 이해하는 과정을 관찰한다."
            : "We don't explain Korea — we observe how the world comes to understand it."}
        </Accented>
      </DocSection>
    </>
  );
}
