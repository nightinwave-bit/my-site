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
  strategy: L;
}

// ── strategic directions (전략만, 발견/데이터 레이어 없음) ──────────────────────
const INSIGHTS: InsightData[] = [
  {
    n: "01",
    title: {
      ko: "문화 접점을 사회 이해로 확장하는 콘텐츠 구조를 설계한다",
      en: "Design content architecture that extends cultural entry points into social understanding",
    },
    strategy: {
      ko: "문화 콘텐츠 자체의 노출을 늘리는 데서 멈추지 않는다. 관심이 형성된 지점에서 역사, 사회, 기술, 외교로 이어지는 다음 단계의 콘텐츠와 경로를 함께 설계해야 한다.",
      en: "Don't stop at increasing exposure to cultural content itself. At the point where interest forms, design the next-stage content and pathways that lead toward history, society, technology, and diplomacy.",
    },
  },
  {
    n: "02",
    title: {
      ko: "국가별 질문 구조에 맞춰 메시지를 분화한다",
      en: "Differentiate messaging by each market's question structure",
    },
    strategy: {
      ko: "하나의 메시지를 모든 국가에 반복하는 방식에서 벗어나야 한다. 공공외교는 국가별로 다른 질문 구조를 먼저 파악하고, 그 구조에 맞는 응답 전략과 채널을 개별적으로 설계해야 한다.",
      en: "Move away from repeating a single message across every market. Public diplomacy must first identify each country's distinct question structure, then design a separate response strategy and channel for it.",
    },
  },
  {
    n: "03",
    title: {
      ko: "강점을 반복하기 전에 상대가 먼저 가진 질문에 응답한다",
      en: "Answer the questions the other side already carries, before repeating one's own strengths",
    },
    strategy: {
      ko: "공공외교는 한국이 알리고 싶은 강점을 앞세우는 데서 시작해서는 안 된다. 안보, 분단처럼 상대가 먼저 갖고 있는 질문에 정직하게 응답할 수 있는 콘텐츠와 대응 역량을 갖춰야 한다.",
      en: "Public diplomacy must not begin by foregrounding the strengths Korea wants to promote. It needs content and response capacity that can honestly answer the questions the other side already holds — including security and division.",
    },
  },
  {
    n: "04",
    title: {
      ko: "관심이 깊어지는 시장에는 사회 이해로 이어지는 경로를 제공한다",
      en: "Provide markets with deepening interest a path into social understanding",
    },
    strategy: {
      ko: "콘텐츠 소비에 머무는 청중과 사회를 이해하려는 청중을 같은 방식으로 다뤄서는 안 된다. 관심이 깊어지는 시장에는 예절, 규범, 관계처럼 사회를 이해할 수 있는 콘텐츠와 접점을 별도로 마련해야 한다.",
      en: "Audiences who stay at content consumption and audiences who want to understand society should not be treated the same way. Markets with deepening interest need dedicated content and touchpoints — on manners, norms, relationships — that build social understanding.",
    },
  },
  {
    n: "05",
    title: {
      ko: "새로운 시장에는 첫 이해를 위한 입문 콘텐츠를 별도로 설계한다",
      en: "Design dedicated introductory content for a first understanding in new markets",
    },
    strategy: {
      ko: "모든 시장에 같은 수준의 콘텐츠를 제공해서는 안 된다. 접촉 초기 단계의 시장에는 깊은 설명보다 국가 자체를 이해할 수 있는 입문형 콘텐츠를 우선적으로 배치해야 한다.",
      en: "Not every market should receive content pitched at the same level. In markets at an early stage of contact, introductory content that builds a first understanding of the country should be prioritized over deep explanation.",
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

      <div
        className="rounded-b-2xl px-6 py-5 sm:px-7"
        style={{
          background: "color-mix(in srgb, var(--accent) 5%, transparent)",
        }}
      >
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
          {locale === "ko" ? "전략" : "Strategy"}
        </div>
        <p className="text-[15.5px] leading-relaxed text-navy">
          {insight.strategy[locale]}
        </p>
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────────────────────

export function DiplomacyBrief() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── paradigm shift ── */}
      <DocSection>
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
              ? "전통적인 공공외교는 '무엇을 알릴 것인가'를 중심으로 설계되어 왔다."
              : "Traditional public diplomacy has been designed around 'what shall we announce?'"}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "이 질문을 뒤집어야 한다. 무엇을 더 많이 알릴 것인가가 아니라, 이미 던져진 질문에 어떻게 응답할 것인가를 설계의 출발점으로 삼아야 한다."
              : "That question must be inverted. The starting point for design should not be how much more to announce, but how to respond to the questions already being asked."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교는 정보 전달이 아니라 질문 응답 체계가 되어야 한다."
              : "Public diplomacy must become a question-response system, not an information-delivery system."}
          </p>
        </div>
      </DocSection>

      {/* ── strategic directions ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "전략적 방향" : "Strategic directions"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "공공외교가 지금 실행해야 할 다섯 가지 방향"
            : "Five directions public diplomacy must act on now"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "각 방향은 지금 실행에 옮길 수 있는 전략이다."
            : "Each direction is a strategy that can be acted on now."}
        </Lead>
        <div className="mt-8 grid gap-6">
          {INSIGHTS.map((ins) => (
            <InsightCard key={ins.n} insight={ins} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── role redefinition ── */}
      <DocSection>
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
              ? "공공외교를 '한국을 알리는 활동'으로 좁게 정의해서는 안 된다."
              : "Public diplomacy must not be narrowly defined as 'the activity of promoting Korea.'"}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교는 국가가 스스로를 설명하는 활동이 아니라, 외부의 질문과 내부의 답변을 연결하는 사회적 시스템으로 재설계되어야 한다."
              : "Public diplomacy must be redesigned not as a country explaining itself, but as a social system that connects external questions to internal answers."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문을 관심의 신호로 다루고, 그 관심이 더 깊은 이해로 이어지도록 연결하는 것이 공공외교의 역할이다."
              : "Public diplomacy's role is to treat questions as signals of interest and to connect that interest toward deeper understanding."}
          </p>
        </div>
      </DocSection>

      {/* ── who answers ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "누가 답할 것인가" : "Who answers?"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "답변자는 정부만이 아니다"
            : "The respondent is not government alone"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "질문에 대한 응답을 정부가 독점해서는 안 된다."
              : "Government must not monopolize the response to these questions."}
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
              ? "정부는 공공외교의 주체가 아니라 답변 생태계의 한 구성원으로 스스로를 재배치해야 한다."
              : "Government must reposition itself not as the subject of public diplomacy but as one participant in a response ecosystem."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "공공외교는 홍보 캠페인이 아니라 사회 전체가 참여하는 설명 체계로 운영되어야 한다."
              : "Public diplomacy must be operated not as a promotional campaign but as an explanation system in which all of society participates."}
          </p>
        </div>
      </DocSection>

      {/* ── national brand ── */}
      <DocSection>
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
              ? "국가 브랜드를 슬로건으로 설계하려는 시도를 멈춰야 한다."
              : "Stop trying to design the national brand as a slogan."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들의 질문에 어떤 답변이 축적되는가를 관리하는 것이 국가 이미지를 관리하는 것이다."
              : "Managing the national image means managing what answers accumulate in response to people's questions."}
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "브랜드는 전달하는 것이 아니라 함께 만들어가는 것으로 설계되어야 한다."
              : "The brand must be designed to be co-created, not delivered."}
          </p>
        </div>
      </DocSection>

      {/* ── AI era ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "AI 시대 공공외교" : "Public diplomacy in the AI era"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "AI는 새로운 외교 현장이다"
            : "AI is the new diplomatic arena"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "AI에게 던져지는 질문과 그에 대한 답변을 새로운 외교 현장으로 다뤄야 한다."
              : "Questions asked to AI, and the answers it gives, must be treated as a new diplomatic arena."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "AI가 한국에 대해 어떤 답을 내놓는가를 관리하는 것을 국가 인식 관리 전략의 핵심 과제로 삼아야 한다."
              : "Managing the answers AI gives about Korea must become a core task of national-perception strategy."}
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문에 응답하는 체계를 설계하는 일은 이제 AI가 답하는 방식을 설계하는 일까지 포함해야 한다."
              : "Designing a question-response system must now also include designing how AI answers."}
          </p>
        </div>
      </DocSection>

      {/* ── policy implications ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "정책적 함의" : "Policy implications"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문 기반 공공외교로의 전환"
            : "The shift to question-based public diplomacy"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "정책은 '무엇을 말할 것인가'를 기준으로 설계되어서는 안 된다."
              : "Policy must not be designed around 'what shall we say?'"}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "예산과 조직, 평가 지표를 '무엇을 묻고 있는가'를 중심으로 재편해야 한다."
              : "Budgets, organizational structures, and evaluation metrics must be reorganized around 'what are people asking?'"}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "공공외교 정책의 출발점을 메시지 기획에서 질문 응답 체계 설계로 전환해야 한다."
              : "The starting point of public diplomacy policy must shift from message planning to designing a question-response system."}
          </p>
        </div>
      </DocSection>

      {/* ── conclusion ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "결론" : "Conclusion"}</Kicker>
        <H2>
          {locale === "ko"
            ? "공공외교는 질문에서 시작되어야 한다"
            : "Public diplomacy must begin with questions"}
        </H2>
        <div className="mt-6 max-w-2xl">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "사람들이 국가를 직접 경험하기 전에 던지는 질문을 공공외교 설계의 기본 단위로 삼아야 한다."
              : "The questions people ask before experiencing a country firsthand must become the basic unit of public diplomacy design."}
          </p>
          <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "메시지를 준비하는 것이 아니라 질문에 응답할 수 있는 체계를 준비해야 한다."
              : "The task is not to prepare messages, but to prepare a system capable of responding to questions."}
          </p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-navy">
            {locale === "ko"
              ? "질문을 이해하는 국가만이 스스로를 더 정확하게 설명할 수 있다."
              : "Only a country that understands the questions can explain itself more accurately."}
          </p>
        </div>
      </DocSection>

      {/* ── why it matters ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "왜 중요한가" : "Why it matters"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "해석이 남기는 질문"
            : "Questions the interpretation leaves behind"}
        </H2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {locale === "ko" ? "정책적 함의" : "Policy implications"}
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy">
              {locale === "ko"
                ? "세계의 관심은 문화에 집중되지만, 한국은 이를 기술·산업·외교 이해로 연결할 필요가 있다."
                : "The world's interest concentrates on culture, but Korea needs to connect this to understanding of its technology, industry, and diplomacy."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {locale === "ko" ? "사회적 함의" : "Social implications"}
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy">
              {locale === "ko"
                ? "한국인이 익숙한 한국과 세계가 궁금해하는 한국 사이에는 차이가 존재한다."
                : "There is a gap between the Korea Koreans are familiar with and the Korea the world is curious about."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {locale === "ko" ? "공공외교 함의" : "Public diplomacy implications"}
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy">
              {locale === "ko"
                ? "설명 중심 홍보보다 질문에 답하는 방식의 국가 커뮤니케이션이 필요하다."
                : "National communication that answers questions is more effective than explanation-centered promotion."}
            </p>
          </div>
        </div>
      </DocSection>

      {/* ── bridge to next rung ── */}
      <DocSection>
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 제도" : "Next rung · Institutions"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 해석입니다. 세계가 한국을 이해하는 구조 자체를 모델로 재구성한 것은 한국 이해 모델에서 다룹니다."
              : "This is the interpretation. How the structure of understanding Korea is reconstructed as a model is covered in the Korea Understanding Model."}
          </p>
          <Link
            href="/research/understanding-model"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "한국 이해 모델 읽기" : "Read the Korea Understanding Model"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
