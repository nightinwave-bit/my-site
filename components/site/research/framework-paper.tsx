"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, type L } from "./parts";

// ── types ────────────────────────────────────────────────────────────────────
const D = (ko: string, en: string): L => ({ ko, en });

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

// ── role redefinitions ───────────────────────────────────────────────────────
interface Redefinition {
  before: L;
  after: L;
}

const REDEFINITIONS: { title: L; defs: Redefinition[] }[] = [
  {
    title: D("국가 브랜드", "National brand"),
    defs: [
      { before: D("전달된 메시지의 결과", "The result of delivered messages"), after: D("질문과 답변이 축적되며 형성되는 사회적 인식", "Social perception formed as questions and answers accumulate") },
      { before: D("생산되는 것", "Something produced"), after: D("축적되는 것", "Something accumulated") },
    ],
  },
  {
    title: D("공공외교", "Public diplomacy"),
    defs: [
      { before: D("국가를 설명하는 활동", "The activity of explaining a country"), after: D("질문과 답변을 연결하는 과정", "A process of connecting questions to answers") },
    ],
  },
  {
    title: D("시민", "Citizens"),
    defs: [
      { before: D("메시지의 수용자", "Receivers of messages"), after: D("국가 이미지의 공동 설계자", "Co-designers of national image") },
    ],
  },
  {
    title: D("플랫폼", "Platforms"),
    defs: [
      { before: D("콘텐츠 게시 도구", "Content publishing tools"), after: D("질문과 답변을 연결하고 지식을 축적하는 인프라", "Infrastructure that connects questions to answers and accumulates knowledge") },
    ],
  },
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

// ── main component ───────────────────────────────────────────────────────────

export function FrameworkPaper() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── problem statement ── */}
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

      {/* ── why existing theory fails ── */}
      <DocSection tint>
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

      {/* ── core declaration ── */}
      <DocSection>
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

      {/* ── why questions ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "왜 질문인가" : "Why questions"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 국가 이미지의 최소 단위다"
            : "The question is the minimal unit of national image"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-8">
          <div>
            <h3 className="text-[15px] font-bold text-navy">
              {locale === "ko" ? "최소 단위로서의 질문" : "The question as minimal unit"}
            </h3>
            <p className="mt-2 text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "질문은 누군가 어떤 것을 아직 이해하지 못했다는 사실을 스스로 인정하는 행위다. 사실, 이미지, 여론, 콘텐츠 — 국가에 대해 존재하는 모든 산출물은 누군가 먼저 질문했기 때문에 생겨났다. 질문보다 먼저 존재하는 국가 이미지는 없다."
                : "A question is the act of admitting, to oneself, that something is not yet understood. Every fact, image, opinion, and piece of content that exists about a country exists because someone asked a question first. No national image predates a question."}
            </p>
            <p className="mt-2 text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "이런 의미에서 질문은 국가 이미지가 형성되는 과정의 원자 — 더 이상 쪼갤 수 없는 최소 단위다. 개념, 주제, 서사, 인식은 모두 질문이 반복되고 쌓인 결과물이지, 그 자체로 출발점이 될 수 없다."
                : "In this sense, the question is the atom of national image formation — the smallest unit that cannot be broken down further. Concepts, themes, narratives, and perceptions are all downstream results of accumulated questions; none of them can themselves be the starting point."}
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-navy">
              {locale === "ko" ? "질문은 데이터가 아니다" : "A question is not data"}
            </h3>
            <p className="mt-2 text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "질문을 검색량, 로그, 트래픽 같은 '데이터'로 축소하면 질문이 가진 본질을 놓친다. 데이터는 이미 일어난 일의 기록이다. 그러나 질문은 아직 일어나지 않은 이해를 향한 지향이다."
                : "Reducing a question to 'data' — search volume, logs, traffic — loses what makes it a question. Data is a record of something that already happened. A question is an orientation toward an understanding that has not happened yet."}
            </p>
            <p className="mt-2 text-[17px] leading-[1.8] text-secondary">
              {locale === "ko"
                ? "질문에는 방향이 있다. 무엇을 알고 싶은가, 어떤 불확실성을 해소하고 싶은가. 데이터는 과거를 기록하지만 질문은 인식이 향할 방향을 예고한다. 따라서 질문은 분석해야 할 신호가 아니라 이해해야 할 의도다."
                : "A question has direction — what it wants to know, what uncertainty it wants resolved. Data records the past; a question signals where perception is heading next. A question, then, is not a signal to be analyzed but an intent to be understood."}
            </p>
          </div>
          <p className="text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문을 이해하지 못하면 국가 이미지가 어디로 향하는지 알 수 없다."
              : "Without understanding questions, there is no way to know where a national image is heading."}
          </p>
        </div>
      </DocSection>

      {/* ── why search / AI changes everything ── */}
      <DocSection>
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

      {/* ── what this means: old vs new model ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "이것이 의미하는 것" : "What this means"}
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

      {/* ── AI era ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "AI 시대 확장" : "Extension to the AI era"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "AI는 질문의 중요성을 더욱 확대한다"
            : "AI amplifies the importance of questions"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "검색 시대에는 사람들이 정보를 찾았다."
              : "In the search era, people looked for information."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "AI 시대에는 사람들이 질문 자체를 입력한다."
              : "In the AI era, people input questions themselves."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문의 중요성은 줄어든 것이 아니라 더 커졌다. AI는 질문을 기반으로 답변을 생성한다."
              : "The importance of questions has not diminished — it has grown. AI generates answers based on questions."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "따라서 질문을 이해하는 것은 AI 시대 국가 이미지를 이해하는 일이다."
              : "Understanding questions is therefore understanding national image in the AI era."}
          </p>
        </div>
      </DocSection>

      {/* ── redefinitions ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "이론적 함의" : "Theoretical implications"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "이 이론이 요구하는 재정의"
            : "The redefinitions this theory demands"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문을 출발점으로 보는 이 이론은 국가 브랜드, 공공외교, 시민, 플랫폼이라는 개념이 애초에 무엇을 의미하는지를 다시 묻는다. 아래는 실행 지침이 아니라 개념 자체의 재구성이다."
            : "A theory that places the question at the origin re-asks what national brand, public diplomacy, citizens, and platforms even mean as concepts. What follows is not a set of action items — it is a reconstruction of the concepts themselves."}
        </Lead>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {REDEFINITIONS.map((rd) => (
            <div
              key={rd.title.en}
              className="rounded-xl border border-border bg-white p-5 sm:p-6"
            >
              <h3 className="text-[16px] font-bold text-navy">
                {rd.title[locale]}
              </h3>
              {rd.defs.map((def, i) => (
                <div key={i} className="mt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <span className="inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {locale === "ko" ? "기존" : "Before"}
                      </span>
                    </div>
                    <p className="text-[14px] text-muted-foreground line-through decoration-muted-foreground/40">
                      {def.before[locale]}
                    </p>
                  </div>
                  <div className="mt-2 flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <span
                        className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold"
                        style={{
                          background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        {locale === "ko" ? "전환" : "Now"}
                      </span>
                    </div>
                    <p className="text-[14.5px] font-medium text-navy">
                      {def.after[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── final declaration ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "결론" : "Conclusion"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문에서 시작되는 국가 이미지"
            : "National image that begins with questions"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "국가 이미지는 광고로 만들어지지 않는다. 슬로건으로 만들어지지 않는다."
              : "A national image is not built by advertising. Not by slogans."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들이 던진 질문과 그 질문에 대한 답변이 오랜 시간 축적되며 형성된다."
              : "It forms as the questions people ask and the answers to those questions accumulate over time."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "이것은 방법론의 문제가 아니라 이해의 문제다. 국가 이미지를 다루는 새로운 실무가 필요한 것이 아니라, 국가 이미지가 무엇인지에 대한 새로운 이론이 필요하다."
              : "This is not a question of method — it is a question of understanding. What is needed is not a new set of practices for managing national image, but a new theory of what national image is."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "우리는 국가 이미지를 메시지가 아니라 질문에서 시작되는 과정으로 이해해야 한다."
              : "We must understand national image as a process that begins with questions, not messages."}
          </p>
        </div>
      </DocSection>

      {/* ── bridge to next rung ── */}
      <DocSection>
        <div className="rounded-2xl border border-border bg-tint p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 생태계" : "Next rung · Ecosystem"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 '왜 질문인가'입니다. 이 질문들이 사회에서 어떻게 순환하며 집단적 이해를 만드는가는 질문 커먼즈에서 다룹니다."
              : "This is 'why questions.' How these questions circulate through society and build collective understanding is the work of the Question Commons."}
          </p>
          <Link
            href="/research/question-commons"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "질문 커먼즈 읽기" : "Read the Question Commons"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
