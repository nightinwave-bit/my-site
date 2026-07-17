"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

// ── types ────────────────────────────────────────────────────────────────────
interface InsightData {
  n: string;
  title: L;
  finding: L;
  meaning: L;
  strategy: L;
}

// ── data strip ───────────────────────────────────────────────────────────────
const DATA_STRIP: { value: string; label: L }[] = [
  { value: "1,540", label: { ko: "개 질문", en: "Questions" } },
  { value: "8", label: { ko: "개 국가", en: "Countries" } },
  { value: "7", label: { ko: "개 언어", en: "Languages" } },
  { value: "8", label: { ko: "개 주제", en: "Topics" } },
];

// ── core insights (발견→의미→전략) ────────────────────────────────────────────
const INSIGHTS: InsightData[] = [
  {
    n: "01",
    title: {
      ko: "문화는 가장 강력한 진입점이다",
      en: "Culture is the most powerful entry point",
    },
    finding: {
      ko: "한류는 전체 질문 중 가장 큰 비중을 차지했다. K-pop, 드라마, 영화, 음식 관련 질문이 가장 많이 나타났다.",
      en: "The Korean Wave accounted for the largest share of all questions. K-pop, drama, film, and food questions appeared most frequently.",
    },
    meaning: {
      ko: "세계는 한국을 정치보다 문화로 먼저 만난다. 문화는 관심 분야가 아니라 한국이라는 국가로 진입하는 입구이다.",
      en: "The world meets Korea through culture before politics. Culture is not a topic of interest — it's the doorway to the country itself.",
    },
    strategy: {
      ko: "문화 콘텐츠 자체를 홍보하는 데서 멈추지 않는다. 문화를 통해 형성된 관심을 역사, 사회, 기술, 외교 이해로 연결하는 구조가 필요하다.",
      en: "Don't stop at promoting cultural content itself. What's needed is a structure that connects culture-driven attention into understanding of history, society, technology, and diplomacy.",
    },
  },
  {
    n: "02",
    title: {
      ko: "모든 국가는 같은 한국을 질문하지 않는다",
      en: "Not every country asks about the same Korea",
    },
    finding: {
      ko: "브라질은 음식과 한류, 독일은 기술과 역사, 일본은 예절과 사회, 인도네시아는 국가 이해 관련 질문 비중이 높았다.",
      en: "Brazil led with food and Hallyu, Germany with technology and history, Japan with etiquette and society, Indonesia with foundational understanding of the country.",
    },
    meaning: {
      ko: "한국은 단일한 국가 이미지로 소비되지 않는다. 국가마다 다른 입구를 통해 한국에 접근한다.",
      en: "Korea is not consumed through a single national image. Each country approaches Korea through a different door.",
    },
    strategy: {
      ko: "하나의 메시지를 모든 국가에 반복하는 방식에서 벗어나야 한다. 공공외교는 국가별 질문 구조에서 출발해야 한다.",
      en: "Move away from repeating one message to every country. Public diplomacy must start from each market's question structure.",
    },
  },
  {
    n: "03",
    title: {
      ko: "일부 국가는 한국을 문화보다 분단 국가로 먼저 만난다",
      en: "Some countries meet Korea through division before culture",
    },
    finding: {
      ko: "브라질, 아랍권, 인도네시아에서는 북한, 분단, 안보 관련 질문 비중이 높게 나타났다.",
      en: "In Brazil, the Arab market, and Indonesia, questions about North Korea, division, and security appeared at notably high rates.",
    },
    meaning: {
      ko: "모든 국가가 한국을 K-pop으로 이해하는 것은 아니다. 어떤 국가에게 한국은 문화 강국이기 전에 분단 국가, 안보 국가, 지정학적 행위자이다.",
      en: "Not every country understands Korea through K-pop. For some, Korea is a divided nation, a security state, a geopolitical actor — before it is a cultural power.",
    },
    strategy: {
      ko: "공공외교는 한국의 강점을 반복하는 것이 아니라 상대가 먼저 가진 질문에 응답해야 한다.",
      en: "Public diplomacy should not repeat Korea's strengths — it must respond to the questions the other side already carries.",
    },
  },
  {
    n: "04",
    title: {
      ko: "가까운 국가는 문화를 넘어 사회를 질문한다",
      en: "Close countries ask beyond culture into society",
    },
    finding: {
      ko: "일본은 K-pop, 아이돌뿐 아니라 예절, 사회 규범, 인간관계 관련 질문도 높게 나타났다.",
      en: "Japan showed high rates not only for K-pop and idols but also for manners, social norms, and interpersonal relationships.",
    },
    meaning: {
      ko: "관심이 깊어질수록 질문은 콘텐츠에서 사회로 이동한다. 문화 소비는 시작점이다. 사회 이해는 다음 단계다.",
      en: "As interest deepens, questions migrate from content to society. Cultural consumption is the start. Social understanding is the next stage.",
    },
    strategy: {
      ko: "공공외교의 목표를 콘텐츠 노출에서 사회 이해로 확장해야 한다.",
      en: "The goal of public diplomacy must expand from content exposure to social understanding.",
    },
  },
  {
    n: "05",
    title: {
      ko: "새로운 청중은 한국 자체를 먼저 질문한다",
      en: "New audiences question Korea itself first",
    },
    finding: {
      ko: "인도네시아에서는 '한국은 무엇으로 유명한가', '한국은 어떤 나라인가'와 같은 입문형 질문 비중이 높았다.",
      en: "In Indonesia, introductory questions like 'What is Korea famous for?' and 'What kind of country is Korea?' appeared at high rates.",
    },
    meaning: {
      ko: "정보가 많은 사회는 세부 질문을 남긴다. 정보가 적은 사회는 국가 자체를 이해하려고 한다. 질문의 수준은 관심의 수준이 아니라 접촉의 단계일 수 있다.",
      en: "Information-rich societies leave detailed questions. Information-sparse societies try to understand the country itself. The level of a question may reflect the stage of contact, not the level of interest.",
    },
    strategy: {
      ko: "새로운 시장에서는 깊은 설명보다 첫 번째 이해를 제공하는 콘텐츠가 중요하다.",
      en: "In new markets, content that provides a first understanding matters more than deep explanation.",
    },
  },
];

// ── respondent list ──────────────────────────────────────────────────────────
const RESPONDENTS: L[] = [
  { ko: "교사", en: "Teachers" },
  { ko: "학생", en: "Students" },
  { ko: "연구자", en: "Researchers" },
  { ko: "재외동포", en: "Diaspora communities" },
  { ko: "시민", en: "Citizens" },
  { ko: "콘텐츠 생산자", en: "Content creators" },
  { ko: "기업", en: "Businesses" },
  { ko: "지역사회", en: "Local communities" },
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

function InsightCard({
  insight,
  locale,
}: {
  insight: InsightData;
  locale: "ko" | "en";
}) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-card">
      <div className="border-b border-border px-6 py-5 sm:px-7">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-bold text-[color:var(--accent)]">
            {insight.n}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-navy sm:text-xl">
            {insight.title[locale]}
          </h3>
        </div>
      </div>

      <div className="grid gap-0 divide-y divide-border">
        <div className="px-6 py-5 sm:px-7">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {locale === "ko" ? "발견" : "Finding"}
          </div>
          <p className="text-[15px] leading-relaxed text-secondary">
            {insight.finding[locale]}
          </p>
        </div>

        <div className="px-6 py-5 sm:px-7">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "의미" : "Meaning"}
          </div>
          <p className="text-[15.5px] leading-relaxed text-navy">
            {insight.meaning[locale]}
          </p>
        </div>

        <div
          className="rounded-b-2xl px-6 py-5 sm:px-7"
          style={{
            background:
              "color-mix(in srgb, var(--accent) 5%, transparent)",
          }}
        >
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "전략" : "Strategy"}
          </div>
          <p className="text-[15px] leading-relaxed text-navy">
            {insight.strategy[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────────────────────

export function DiplomacyBrief() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── data strip ── */}
      <DocSection>
        <DataStrip locale={locale} />
      </DocSection>

      {/* ── paradigm shift ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "핵심 전환" : "The core shift"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "우리는 한국을 설명해왔다. 이제는 질문에 응답해야 한다."
            : "We've been explaining Korea. Now we must respond to questions."}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "전통적인 공공외교는 '무엇을 알릴 것인가'를 중심으로 설계되었다."
              : "Traditional public diplomacy was designed around 'what shall we announce?'"}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그러나 질문 데이터는 다른 출발점을 보여준다. 사람들은 이미 한국을 질문하고 있다. 중요한 것은 메시지를 더 많이 생산하는 것이 아니라 그 질문에 어떻게 응답할 것인가이다."
              : "But the question data points to a different starting point. People are already asking about Korea. What matters is not producing more messages, but how to respond to those questions."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교는 정보 전달이 아니라 질문 응답 체계가 되어야 한다."
              : "Public diplomacy must become a question-response system, not an information-delivery system."}
          </p>
        </div>
      </DocSection>

      {/* ── insights ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "핵심 발견" : "Key findings"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문 데이터가 공공외교에 요구하는 것"
            : "What the question data demands of public diplomacy"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "각 발견은 데이터에서 출발해 그것이 의미하는 바를 해석하고, 공공외교가 취해야 할 전략적 방향을 제안한다."
            : "Each finding starts from data, interprets what it means, and proposes a strategic direction for public diplomacy."}
        </Lead>
        <div className="mt-8 grid gap-6">
          {INSIGHTS.map((ins) => (
            <InsightCard key={ins.n} insight={ins} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── role redefinition ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "공공외교의 역할 재정의"
            : "Redefining the role of public diplomacy"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "공공외교는 설명이 아니라 연결이다"
            : "Public diplomacy is connection, not explanation"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "공공외교는 '한국을 알리는 활동'으로 이해되어 왔다."
              : "Public diplomacy has been understood as 'the activity of promoting Korea.'"}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교는 국가가 스스로를 설명하는 활동이 아니다. 외부의 질문과 내부의 답변을 연결하는 사회적 시스템이다."
              : "Public diplomacy is not a country explaining itself. It is a social system that connects external questions to internal answers."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문은 관심의 신호다. 공공외교는 그 관심이 더 깊은 이해로 이어지도록 돕는 과정이다."
              : "Questions are signals of interest. Public diplomacy is the process of helping that interest deepen into understanding."}
          </p>
        </div>
      </DocSection>

      {/* ── who answers ── */}
      <DocSection>
        <Kicker>
          {locale === "ko"
            ? "누가 답할 것인가"
            : "Who answers?"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "답변자는 정부만이 아니다"
            : "The respondent is not government alone"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문은 정부만 답하는 것이 아니다."
              : "Questions aren't answered by government alone."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {RESPONDENTS.map((r) => (
              <span
                key={r.en}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-[14px] font-medium text-navy"
              >
                {r[locale]}
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "정부는 공공외교의 주체가 아니다. 답변 생태계의 한 구성원일 뿐이다."
              : "Government is not the subject of public diplomacy. It is one participant in a response ecosystem."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "공공외교는 홍보 활동이 아니라 사회 전체가 참여하는 설명 과정이다."
              : "Public diplomacy is not a promotional campaign — it is an explanation process in which all of society participates."}
          </p>
        </div>
      </DocSection>

      {/* ── national brand ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "국가 브랜드 재정의"
            : "Redefining the national brand"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "국가 브랜드는 메시지가 아니라 응답이다"
            : "A national brand is not a message — it is a response"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "브랜드는 슬로건으로 만들어지지 않는다."
              : "A brand is not built by a slogan."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들이 던진 질문에 어떤 답변이 축적되는가에 따라 국가 이미지는 형성된다."
              : "A national image is shaped by what answers accumulate in response to people's questions."}
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "브랜드는 전달하는 것이 아니라 함께 만들어지는 것이다."
              : "A brand is not delivered — it is co-created."}
          </p>
        </div>
      </DocSection>

      {/* ── AI era ── */}
      <DocSection>
        <Kicker>
          {locale === "ko"
            ? "AI 시대 공공외교"
            : "Public diplomacy in the AI era"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "AI는 새로운 외교 현장이다"
            : "AI is the new diplomatic arena"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들은 더 이상 검색 결과만 읽지 않는다. AI에게 질문한다. 그리고 AI의 답변을 통해 국가를 이해한다."
              : "People no longer just read search results. They ask AI. And they understand countries through AI's answers."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "따라서 AI가 어떤 답변을 제공하는가는 새로운 국가 이미지 형성 과정이 된다."
              : "What answers AI provides therefore becomes a new process of national-image formation."}
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문 데이터는 AI 시대 국가 인식 관리의 출발점이다."
              : "Question data is the starting point for managing national perception in the AI era."}
          </p>
        </div>
      </DocSection>

      {/* ── policy implications ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko"
            ? "정책적 함의"
            : "Policy implications"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문 기반 공공외교로의 전환"
            : "The shift to question-based public diplomacy"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문은 단순한 데이터가 아니다."
              : "Questions are not mere data."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들이 무엇을 궁금해하는지, 어디에서 오해가 발생하는지, 어떤 설명이 필요한지 보여준다."
              : "They show what people are curious about, where misunderstandings arise, and what explanations are needed."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교는 '무엇을 말할 것인가' 중심에서 '무엇을 묻고 있는가' 중심으로 이동해야 한다."
              : "Public diplomacy must shift from 'what shall we say?' to 'what are people asking?'"}
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
            ? "공공외교는 질문에서 시작되어야 한다"
            : "Public diplomacy must begin with questions"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들은 국가를 직접 경험하기 전에 검색한다. 질문한다. 비교한다."
              : "Before experiencing a country firsthand, people search. They ask. They compare."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그 질문이 반복될수록 개념이 되고, 주제가 되고, 서사가 되고, 국가 이미지가 된다."
              : "As those questions repeat, they become concepts, then themes, then narratives, then a national image."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-navy">
            {locale === "ko"
              ? "따라서 공공외교의 출발점은 메시지가 아니다. 질문이다."
              : "The starting point of public diplomacy is therefore not a message. It is a question."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문을 이해하는 국가만이 스스로를 더 정확하게 설명할 수 있다."
              : "Only a country that understands the questions can explain itself more accurately."}
          </p>
        </div>
      </DocSection>

      {/* ── bridge to next rung ── */}
      <DocSection tint>
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 제도" : "Next rung · Institutions"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 '질문이 공공외교에 무엇을 요구하는가'입니다. 이 요구에 응답할 수 있는 제도적 아키텍처는 프레임워크 페이퍼에서 다룹니다."
              : "This is 'what questions demand of public diplomacy.' The institutional architecture that can answer this demand is the work of the Framework Paper."}
          </p>
          <Link
            href="/research/framework-paper"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "프레임워크 페이퍼 읽기" : "Read the Framework Paper"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
