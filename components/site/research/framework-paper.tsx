"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

// ── types ────────────────────────────────────────────────────────────────────
const D = (ko: string, en: string): L => ({ ko, en });

// ── framework layers ─────────────────────────────────────────────────────────
interface FrameworkLayer {
  n: string;
  name: L;
  definition: L;
  description: L;
}

const LAYERS: FrameworkLayer[] = [
  {
    n: "01",
    name: D("질문", "Question"),
    definition: D("사람들이 국가를 이해하기 위해 남긴 흔적", "The trace people leave when trying to understand a country"),
    description: D(
      "검색창에 입력된 질문은 단순한 정보 요청이 아니다. 그것은 이해의 실제 공백이 표면화된 것이다. 질문은 국가 이미지가 형성되기 전의 가장 원초적인 단위다.",
      "A question typed into a search bar is not a simple information request. It is a real gap in understanding surfacing. The question is the most elemental unit, before any national image has formed.",
    ),
  },
  {
    n: "02",
    name: D("개념", "Concept"),
    definition: D("반복되는 질문 속에서 나타나는 공통 의미", "The shared meaning that emerges from repeated questions"),
    description: D(
      "'왜 K-pop이 인기인가', '한국 아이돌은 어떻게 만들어지나', 'K-pop 팬이 되려면' — 서로 다른 질문이 하나의 공통 의미를 향해 수렴한다. 이것이 개념이다.",
      "'Why is K-pop popular,' 'How are Korean idols made,' 'How do I become a K-pop fan' — different questions converge toward a shared meaning. That is a concept.",
    ),
  },
  {
    n: "03",
    name: D("주제", "Theme"),
    definition: D("관련 개념이 형성하는 관심 영역", "The area of interest that related concepts form"),
    description: D(
      "K-pop, 드라마, 음식, 뷰티 — 개별 개념들이 모여 '한류'라는 하나의 관심 영역을 형성한다. 주제는 세계가 한국에 대해 가지는 관심의 구조를 보여준다.",
      "K-pop, drama, food, beauty — individual concepts gather into a single area of interest called 'the Korean Wave.' Themes reveal the structure of the world's interest in Korea.",
    ),
  },
  {
    n: "04",
    name: D("서사", "Narrative"),
    definition: D("주제들이 연결되며 만들어지는 이야기", "The story that forms as themes connect"),
    description: D(
      "한류라는 주제가 충분히 축적되면, '한국은 세계적 문화 강국이다'라는 서사가 형성된다. 서사는 개별 사실의 합이 아니라, 사실들이 연결되며 만드는 줄거리다.",
      "When the Korean Wave theme accumulates enough, it forms the narrative 'Korea is a global cultural power.' A narrative is not the sum of individual facts — it is the plot the facts create when connected.",
    ),
  },
  {
    n: "05",
    name: D("인식", "Perception"),
    definition: D("세계가 기억하는 국가 이미지", "The national image the world remembers"),
    description: D(
      "서사가 반복되고 강화되면, 그것은 인식이 된다. '한국은 문화 강국이다', '한국은 분단 국가다', '한국은 기술 선진국이다' — 이것이 세계가 한국에 대해 기억하는 이미지다.",
      "When narratives repeat and reinforce, they become perceptions. 'Korea is a cultural power,' 'Korea is a divided nation,' 'Korea is technologically advanced' — these are the images the world remembers about Korea.",
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
              ? "기존 국가브랜드 연구는 '국가가 무엇을 말했는가'에 집중했다."
              : "Existing national brand research focused on 'what the state said.'"}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그러나 디지털 환경에서 사람들은 먼저 질문한다. 검색한다. AI에게 묻는다."
              : "But in the digital environment, people ask first. They search. They ask AI."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "따라서 중요한 것은 국가가 무엇을 말했는가가 아니라 사람들이 무엇을 묻고 있는가이다."
              : "What matters is therefore not what the state said, but what people are asking."}
          </p>
        </div>
      </DocSection>

      {/* ── limitations of message-centered approach ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "기존 접근의 한계"
            : "Limitations of the existing approach"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "메시지 중심 접근의 한계"
            : "The limits of message-centered thinking"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="mb-4 text-[15px] text-secondary">
            {locale === "ko"
              ? "전통적인 국가브랜드 모델은 다음 구조를 가정한다."
              : "The traditional national brand model assumes this structure:"}
          </p>
          <ModelFlow steps={OLD_MODEL} locale={locale} />

          <p className="mt-6 mb-4 text-[15px] text-secondary">
            {locale === "ko"
              ? "그러나 디지털 환경에서는 다른 구조가 먼저 작동한다."
              : "But in the digital environment, a different structure operates first:"}
          </p>
          <ModelFlow steps={NEW_MODEL} locale={locale} accent />

          <p className="mt-6 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "국가는 더 이상 이미지를 일방적으로 전달할 수 없다."
              : "A country can no longer deliver its image unilaterally."}
          </p>
        </div>
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
          {locale === "ko" ? "왜 질문인가" : "Why questions?"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 국가 이미지가 형성되는 과정의 시작점이다"
            : "Questions are the starting point of how national image forms"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "국가 이미지는 갑자기 형성되지 않는다."
              : "A national image does not form suddenly."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들은 질문한다. 검색한다. 답변을 읽는다."
              : "People ask. They search. They read answers."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문이 반복될수록 개념이 형성된다. 개념은 주제가 되고, 주제는 서사가 되고, 서사는 국가 이미지가 된다."
              : "As questions repeat, concepts form. Concepts become themes. Themes become narratives. Narratives become a national image."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문은 이 과정의 시작점이다."
              : "The question is the starting point of this process."}
          </p>
        </div>
      </DocSection>

      {/* ── the framework ── */}
      <DocSection>
        <Kicker>
          {locale === "ko"
            ? "새로운 프레임워크"
            : "The new framework"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 어떻게 국가 이미지가 되는가"
            : "How a question becomes a national image"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문에서 인식까지, 다섯 단계를 거쳐 국가 이미지가 형성된다."
            : "From question to perception, national image forms through five stages."}
        </Lead>
        <div className="mt-8 grid gap-4">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.n}>
              <div className="rounded-2xl border border-border bg-white shadow-card">
                <div className="border-b border-border px-6 py-4 sm:px-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold text-[color:var(--accent)]">
                      {layer.n}
                    </span>
                    <h3 className="text-lg font-semibold text-navy sm:text-xl">
                      {layer.name[locale]}
                    </h3>
                  </div>
                  <p className="mt-1 text-[14px] font-medium text-[color:var(--accent)]">
                    {layer.definition[locale]}
                  </p>
                </div>
                <div className="px-6 py-5 sm:px-7">
                  <p className="text-[15px] leading-relaxed text-secondary">
                    {layer.description[locale]}
                  </p>
                </div>
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown className="h-5 w-5 text-[color:var(--accent)]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </DocSection>

      {/* ── AI era ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "AI 시대 확장"
            : "Extension to the AI era"}
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
      <DocSection>
        <Kicker>
          {locale === "ko" ? "재정의" : "Redefinitions"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "이 프레임워크가 요구하는 재정의"
            : "The redefinitions this framework demands"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문을 출발점으로 보는 순간, 국가 브랜드, 공공외교, 시민, 플랫폼의 역할이 모두 바뀐다."
            : "The moment you see questions as the starting point, the roles of national brand, public diplomacy, citizens, and platforms all change."}
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
      <DocSection tint>
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
