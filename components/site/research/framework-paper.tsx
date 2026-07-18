"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, type L } from "./parts";

// ── types ────────────────────────────────────────────────────────────────────
const D = (ko: string, en: string): L => ({ ko, en });

// ── 5-layer model ───────────────────────────────────────────────────────────
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
      "질문이 가리키는 구체적 대상 — K-pop, 김치, 병역 같은 것들",
      "The specific objects questions point to — K-pop, kimchi, military service",
    ),
  },
  {
    n: "3",
    ko: "주제",
    en: "Theme",
    desc: D(
      "개념들이 모여 형성하는 관심 영역 — 한류, 언어, 관광 같은 것들",
      "The interest areas that form as concepts cluster — Hallyu, language, tourism",
    ),
  },
  {
    n: "4",
    ko: "서사",
    en: "Narrative",
    desc: D(
      "주제가 반복되며 만들어지는 이야기 구조 — '문화 강국', '기술 선진국' 같은 것들",
      "The story structures that emerge as themes recur — 'cultural powerhouse', 'tech leader'",
    ),
  },
  {
    n: "5",
    ko: "인식",
    en: "Perception",
    desc: D(
      "서사가 축적되어 형성되는 국가 이미지",
      "The national image that forms as narratives accumulate",
    ),
  },
];

// ── why existing theory fails ────────────────────────────────────────────────
interface TheoryGap {
  n: string;
  head: L;
  body: L;
}

const THEORY_GAPS: TheoryGap[] = [
  {
    n: "01",
    head: D("메시지 중심 접근", "The message-centered approach"),
    body: D(
      "기존 국가브랜드 이론은 오랫동안 '국가가 무엇을 전달하는가'를 분석의 단위로 삼아 왔다. 발신자가 메시지를 설계하고 수신자에게 전달하면 이미지가 형성된다고 가정한다. 그러나 이 모델은 수신자가 스스로 질문하고, 답을 찾고, 그 답을 다른 사람과 공유하는 과정을 설명할 언어를 갖고 있지 않다.",
      "National brand theory has long treated 'what the state communicates' as its unit of analysis, assuming a sender designs a message and an image forms once it reaches a receiver. But this model has no vocabulary for the receiver who asks their own question, searches for an answer, and shares it onward.",
    ),
  },
  {
    n: "02",
    head: D("여론조사 기반 이미지 측정", "Polling-based image measurement"),
    body: D(
      "국가 이미지를 측정하는 대표적 방법은 설문이다. '한국에 대해 어떻게 생각하십니까'라는 질문에 응답을 요청한다. 그러나 설문은 이미지가 이미 형성된 이후의 결과만을 포착한다. 사람들이 무엇을 궁금해했고, 어떤 답을 얻었고, 그 답을 어떻게 받아들였는가 — 이미지가 만들어지는 과정 자체는 설문에 담기지 않는다.",
      "The standard way to measure national image is a survey — asking respondents what they think of a country. But a survey captures only the outcome, after an image has already formed. What people were curious about, what answers they found, how they made sense of those answers — the process by which the image was built — never appears in the poll.",
    ),
  },
  {
    n: "03",
    head: D("정부 중심 모델", "The government-centric model"),
    body: D(
      "기존 이론은 정부를 국가 이미지 형성의 유일한 행위자로 취급한다. 그러나 실제로 이미지를 형성하는 것은 검색엔진, AI, 여행자, 유학생, 디아스포라, 콘텐츠 창작자처럼 정부가 통제할 수 없는 무수한 행위자들이다. 정부 중심 모델은 이들을 예외 취급하거나 아예 시야 밖에 둔다.",
      "Existing theory treats the state as the sole actor in national image formation. In practice, the image is built by search engines, AI systems, travelers, international students, diaspora communities, and content creators — actors no government controls. A government-centric model either treats them as exceptions or never sees them at all.",
    ),
  },
];

// ── old vs new model ─────────────────────────────────────────────────────────
interface ModelStep {
  label: L;
}

const OLD_MODEL: ModelStep[] = [
  { label: D("국가", "State") },
  { label: D("메시지", "Message") },
  { label: D("대중", "Public") },
];

const NEW_MODEL: ModelStep[] = [
  { label: D("질문", "Question") },
  { label: D("검색 / AI", "Search / AI") },
  { label: D("답변", "Answers") },
  { label: D("인식", "Perception") },
];

// ── sub-components ───────────────────────────────────────────────────────────

function ModelFlow({
  steps,
  locale,
  accent,
}: {
  steps: ModelStep[];
  locale: "ko" | "en";
  accent?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, i) => (
        <React.Fragment key={step.label.en}>
          <div
            className="rounded-lg border px-4 py-2.5 text-center text-[14px] font-semibold text-navy"
            style={{
              borderColor: accent
                ? "color-mix(in srgb, var(--accent) 50%, transparent)"
                : "var(--border)",
              background: accent
                ? "color-mix(in srgb, var(--accent) 6%, transparent)"
                : "white",
            }}
          >
            {step.label[locale]}
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

// ── main component ───────────────────────────────────────────────────────────

export function UnderstandingModel() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── 1. problem statement ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "문제 제기" : "The problem"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "우리는 국가 이미지를 잘못 이해해 왔다"
            : "We have misunderstood national image"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "지난 수십 년간 국가브랜드는 국가가 세계에 '무엇을 말하는가'의 문제로 다뤄져 왔다. 슬로건을 만들고, 로고를 디자인하고, 캠페인을 집행하는 것 — 이것이 국가 이미지를 관리하는 방법이라고 여겨졌다."
              : "For decades, national branding has been treated as a question of what a state says to the world. Crafting slogans, designing logos, running campaigns — this was assumed to be how national image gets managed."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그러나 이 전제는 처음부터 잘못되었다. 국가 이미지는 국가가 만들어 전달하는 것이 아니라, 세계가 질문하고 답을 찾는 과정에서 형성되는 것이다. 정부가 아무 말도 하지 않아도, 사람들은 검색하고 묻는다. 그 순간부터 이미지는 이미 형성되기 시작한다."
              : "But that premise was wrong from the start. National image is not something a state manufactures and delivers — it forms as the world asks questions and searches for answers. Even if a government says nothing at all, people still search, still ask. The image begins forming the moment they do."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "문제는 방법론이 아니라 전제였다. 우리는 '무엇을 전달할 것인가'를 물어 왔다. 정작 물었어야 할 질문은 '사람들은 무엇을 궁금해하는가'였다."
              : "The flaw was never in the methodology — it was in the premise. We kept asking what to communicate. The question we should have asked was what people are curious about."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "중요한 것은 국가가 무엇을 말했는가가 아니라 사람들이 무엇을 묻고 있는가이다."
              : "What matters is not what the state said, but what people are asking."}
          </p>
        </div>
      </DocSection>

      {/* ── 2. the 5-layer model ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "한국 이해 모델" : "Korea Understanding Model"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "이해는 다섯 층위로 형성된다"
            : "Understanding forms through five layers"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "세계가 한국을 이해하는 과정은 단일한 사건이 아니라, 다섯 개의 층위를 거치며 축적되는 구조다. 질문에서 출발하여 인식에 이르기까지, 각 층위는 이전 층위 위에 쌓인다."
            : "How the world comes to understand Korea is not a single event but a structure that accumulates through five layers. From question to perception, each layer builds on the one before it."}
        </Lead>

        {/* flow visualization */}
        <div className="mt-8 flex flex-wrap items-center gap-y-2">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.en}>
              <div
                className="rounded-lg border px-4 py-2.5 text-center text-[14px] font-bold text-navy"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 50%, transparent)",
                  background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                }}
              >
                {locale === "ko" ? layer.ko : layer.en}
              </div>
              {i < LAYERS.length - 1 && (
                <ChevronDown className="mx-2 h-4 w-4 rotate-[-90deg] text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* layer cards */}
        <div className="mt-8 grid gap-4">
          {LAYERS.map((layer) => (
            <LayerCard key={layer.en} layer={layer} locale={locale} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-[17px] leading-[1.8] text-secondary">
          {locale === "ko"
            ? "이 다섯 층위는 계단이 아니라 퇴적이다. 질문이 반복되면 개념이 되고, 개념이 반복되면 주제가 되고, 주제가 반복되면 서사가 되고, 서사가 반복되면 인식이 된다. 어느 층위에서든 구조에 개입할 수 있지만, 출발점은 언제나 질문이다."
            : "These five layers are not stairs but sediment. When questions recur, they become concepts; when concepts recur, they become themes; when themes recur, they become narratives; when narratives recur, they become perception. One can intervene at any layer, but the starting point is always the question."}
        </p>
      </DocSection>

      {/* ── 3. why existing theory fails ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "이론적 공백" : "The theoretical gap"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "기존 국가브랜드 이론으로는 부족하다"
            : "Existing national brand theory is not enough"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "이 부족함은 하나의 결함이 아니라 세 방향에서 동시에 드러난다."
            : "This insufficiency shows up in three places at once, not one."}
        </Lead>
        <div className="mt-8 grid gap-4">
          {THEORY_GAPS.map((gap) => (
            <Finding key={gap.n} n={gap.n} head={gap.head[locale]} body={gap.body[locale]} />
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-navy">
          {locale === "ko"
            ? "세 가지 한계는 하나의 결함을 가리킨다. 기존 이론은 국가 이미지를 결과로 다룰 뿐, 과정으로 다루지 않는다."
            : "All three limits point to a single flaw: existing theory treats national image as an outcome, never as a process."}
        </p>
      </DocSection>

      {/* ── 4. core declaration ── */}
      <DocSection tint>
        <div className="py-6">
          <p
            className="max-w-2xl text-2xl font-bold leading-snug text-navy sm:text-3xl"
            style={{ color: "var(--accent)" }}
          >
            {locale === "ko"
              ? "질문은 관심의 흔적이 아니다. 질문은 국가 이미지의 출발점이다."
              : "A question is not a trace of curiosity. A question is the starting point of national image."}
          </p>
        </div>
      </DocSection>

      {/* ── 5. old vs new model ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "모델 전환" : "Model shift"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "메시지 모델에서 질문 모델로"
            : "From the message model to the question model"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="mb-4 text-[15px] text-secondary">
            {locale === "ko"
              ? "전통적인 국가브랜드 모델은 다음 구조를 가정해 왔다."
              : "The traditional national brand model has assumed this structure:"}
          </p>
          <ModelFlow steps={OLD_MODEL} locale={locale} />

          <p className="mt-6 mb-4 text-[15px] text-secondary">
            {locale === "ko"
              ? "이 이론이 옳다면, 실제로 먼저 작동하는 구조는 다르게 그려져야 한다."
              : "If this theory holds, the structure that actually operates first must be redrawn:"}
          </p>
          <ModelFlow steps={NEW_MODEL} locale={locale} accent />

          <p className="mt-6 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "국가는 더 이상 이미지를 일방적으로 전달할 수 없다. 국가는 질문이 축적되는 구조에 참여할 수 있을 뿐이다."
              : "A country can no longer deliver its image unilaterally. It can only participate in the structure where questions accumulate."}
          </p>
        </div>
      </DocSection>

      {/* ── 6. search / AI ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "매체가 구조를 바꾼다" : "The medium reshapes the structure"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "검색과 AI는 국가 인식이 형성되는 구조 자체를 바꾼다"
            : "Search and AI change the very structure through which national perception forms"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "디지털 이전, 질문과 답은 언론·외교·교육이라는 기관을 거쳐 연결되었다. 한 사람의 궁금증이 답에 이르기까지는 여러 매개와 지연, 여과가 있었다. 검색과 AI는 이 구조를 무너뜨렸다. 이제 묻는 자리와 답을 받는 자리는 하나의 인터페이스, 하나의 순간이다."
              : "Before the digital era, questions and answers were connected through institutions — journalism, diplomacy, education. A person's curiosity passed through layers of mediation, delay, and filtering before reaching an answer. Search and AI collapsed that structure. Now the place where someone asks and the place where they receive an answer are the same interface, the same moment."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "이것은 속도의 변화가 아니라 구조의 변화다. 묻는 자리와 답 받는 자리가 같아지는 순간, '대중'과 '메시지'를 나누던 경계는 사라진다. 국가가 관리할 수 있는 통제된 채널은 더 이상 없다. 남는 것은 질문과 답변의 축적뿐이다."
              : "This is not merely a change in speed — it is a change in structure. Once the place of asking and the place of answering become one, the boundary between 'the public' and 'the message' disappears. There is no longer a controlled channel a state can manage. What remains is only the accumulation of questions and answers."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "게다가 AI는 기관이 미리 준비해 둔 메시지를 그대로 꺼내 주지 않는다. 질문이 던져지는 그 순간, 질문의 패턴으로부터 답을 즉석에서 생성한다. 그래서 국가가 어떻게 설명되는가는 국가가 사전에 설계한 메시지가 아니라, 그 순간 어떻게 질문이 던져졌는가에 달려 있다."
              : "Moreover, AI does not simply retrieve a message some institution prepared in advance. At the moment a question is asked, it generates an answer live, from the pattern of that question. So how a nation gets described depends not on any message the state pre-authored, but on how the question was framed in that instant."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "매체가 질문과 답변을 하나의 순간으로 묶는 순간, 국가 이미지는 관리의 대상이 아니라 구조의 산물이 된다."
              : "Once the medium binds question and answer into a single moment, national image stops being something to manage — it becomes the product of a structure."}
          </p>
        </div>
      </DocSection>

      {/* ── 7. why it matters ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "왜 중요한가" : "Why it matters"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "이 모델이 바꾸는 것"
            : "What this model changes"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문에서 인식까지의 구조를 이해하면, 국가 브랜드·공공외교·시민·플랫폼이라는 개념 자체를 다시 정의해야 한다. 이것은 실행 지침이 아니라 관점의 전환이다."
            : "Once the structure from question to perception is understood, the very concepts of national brand, public diplomacy, citizens, and platforms must be redefined. This is not a set of action items — it is a shift in perspective."}
        </Lead>
        <div className="mt-8 grid gap-6 sm:grid-cols-1">
          {/* policy implications */}
          <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
            <div
              className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--accent)" }}
            >
              {locale === "ko" ? "정책적 함의" : "Policy implications"}
            </div>
            <p className="text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "기존 국가브랜드 전략은 메시지 설계에서 시작한다. 이 모델은 질문 분석에서 시작해야 한다고 제안한다. 국가 브랜드는 더 이상 '전달된 메시지의 결과'가 아니라 '질문과 답변이 축적되며 형성되는 사회적 인식'이다. 생산되는 것이 아니라 축적되는 것이다."
                : "Existing national brand strategy begins with message design. This model proposes that it must begin with question analysis. National brand is no longer 'the result of delivered messages' but 'social perception formed as questions and answers accumulate.' It is not something produced — it is something that accumulates."}
            </p>
          </div>
          {/* social implications */}
          <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
            <div
              className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--accent)" }}
            >
              {locale === "ko" ? "사회적 함의" : "Social implications"}
            </div>
            <p className="text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "한국인이 익숙한 한국과 세계가 궁금해하는 한국 사이에는 구조적 차이가 존재한다. 이 모델은 그 차이를 가시화한다. 시민은 메시지의 수용자가 아니라 국가 이미지의 공동 설계자이며, 플랫폼은 콘텐츠 게시 도구가 아니라 질문과 답변을 연결하고 지식을 축적하는 인프라다."
                : "A structural gap exists between the Korea that Koreans know and the Korea the world is curious about. This model makes that gap visible. Citizens are not receivers of messages but co-designers of national image, and platforms are not content publishing tools but infrastructure that connects questions to answers and accumulates knowledge."}
            </p>
          </div>
          {/* public diplomacy implications */}
          <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
            <div
              className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--accent)" }}
            >
              {locale === "ko" ? "공공외교 함의" : "Public diplomacy implications"}
            </div>
            <p className="text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "질문에서 인식까지의 경로를 이해하면, 어디에 개입해야 하는지가 보인다. 공공외교는 국가를 설명하는 활동이 아니라 질문과 답변을 연결하는 과정이다. 다섯 층위 중 어느 지점에서 서사가 형성되고 있는지를 파악하면, 개입의 시점과 방식이 달라진다."
                : "Understanding the path from question to perception reveals where to intervene. Public diplomacy is not the activity of explaining a country but a process of connecting questions to answers. Identifying at which of the five layers a narrative is forming changes both the timing and the method of engagement."}
            </p>
          </div>
        </div>
      </DocSection>

      {/* ── 8. bridge to question observatory ── */}
      <DocSection>
        <div className="rounded-2xl border border-border bg-tint p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 질문 관측소" : "Next rung · Question Observatory"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 구조입니다. 이 구조가 시간에 따라 어떻게 변화하는가는 질문 관측소에서 다룹니다."
              : "This is the structure. How it changes over time is covered in the Question Observatory."}
          </p>
          <Link
            href="/research/question-observatory"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "질문 관측소 읽기" : "Read the Question Observatory"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
