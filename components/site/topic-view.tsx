"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Network, Search, Database } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getPathway, getNode, PROVENANCE, type Evidence } from "@/lib/ontology";
import { topicLead, type Topic, type TopicSlug } from "@/lib/topics";
import { insightFor } from "@/lib/interpretation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

const CHAIN_LABEL = ["type.question", "type.concept", "type.theme", "type.narrative", "type.perception", "layer.insight"];

const TOPIC_INTRO: Record<TopicSlug, { ko: string; en: string }> = {
  hallyu: {
    ko: "333개의 질문은 K-pop, 드라마, 영화, 뷰티, 음식으로 이어지는 하나의 관심 지도를 보여준다.",
    en: "333 questions reveal a single map of curiosity — from K-pop, drama, film, beauty, to food.",
  },
  diplomacy: {
    ko: "309개의 질문은 분단, 안보, 그리고 이웃 나라와의 관계가 여전히 한국 이해의 중심축임을 보여준다.",
    en: "309 questions show that division, security, and regional relations remain the central axis of understanding Korea.",
  },
  society: {
    ko: "234개의 질문은 사람들이 한국인의 일상과 관계 문화를 얼마나 궁금해하는지 보여준다.",
    en: "234 questions show how much people want to know about Korean daily life and social norms.",
  },
  language: {
    ko: "191개의 질문은 한국어 배우기가 문화 관심의 실질적 전환점임을 보여준다.",
    en: "191 questions show that learning Korean is where cultural interest becomes practical commitment.",
  },
  history: {
    ko: "166개의 질문은 과거와 전통이 오늘의 한국을 설명하는 또 하나의 축임을 보여준다.",
    en: "166 questions show that history and tradition form another axis for understanding today's Korea.",
  },
  tourism: {
    ko: "161개의 질문은 한국 여행이 콘텐츠 소비의 물리적 확장임을 보여준다.",
    en: "161 questions show that visiting Korea is the physical extension of consuming its content.",
  },
  technology: {
    ko: "62개의 질문은 기술 강국 이미지가 질문보다 인식에 가까운 것임을 보여준다.",
    en: "62 questions show that Korea's tech reputation exists more as perception than as curiosity.",
  },
  economy: {
    ko: "52개의 질문은 경제 질문이 적지만 경제 인식은 모든 주제에 스며들어 있음을 보여준다.",
    en: "52 questions show that while economic questions are few, economic perception pervades every topic.",
  },
};

const CONCEPT_BLURB: Record<string, { ko: string; en: string }> = {
  c_kpop: { ko: "세계가 가장 먼저 만나는 한국", en: "The world's first encounter with Korea" },
  c_drama: { ko: "감정과 서사를 통해 이해하는 한국", en: "Understanding Korea through emotion and story" },
  c_beauty: { ko: "일상과 라이프스타일의 접점", en: "Where daily life meets lifestyle" },
  c_food: { ko: "맛을 통해 경험하는 문화", en: "Culture experienced through taste" },
  c_division: { ko: "가장 오래된 질문, 아직 답해지지 않은 질문", en: "The oldest question, still unanswered" },
  c_compare: { ko: "이웃과의 관계를 통해 이해하는 한국", en: "Korea understood through its neighbors" },
  c_people: { ko: "한국인이라는 사람들에 대한 궁금증", en: "Curiosity about Korean people themselves" },
  c_etiquette: { ko: "일상의 규칙과 예의", en: "Rules and manners of daily life" },
  c_society: { ko: "제도와 시스템 안의 한국", en: "Korea inside its institutions and systems" },
  c_basics: { ko: "한국에 대한 가장 기본적인 질문", en: "The most basic questions about Korea" },
  c_language: { ko: "문화 관심이 실질적 행동으로 바뀌는 순간", en: "When cultural interest turns practical" },
  c_education: { ko: "배움과 성장에 대한 관심", en: "Interest in learning and growth" },
  c_travel: { ko: "콘텐츠 소비의 물리적 확장", en: "The physical extension of content consumption" },
  c_place: { ko: "장소와 도시에 대한 궁금증", en: "Curiosity about places and cities" },
  c_history: { ko: "오늘의 한국을 만든 과거", en: "The past that shaped today's Korea" },
  c_culture: { ko: "살아 있는 전통과 유산", en: "Living traditions and heritage" },
  c_economy: { ko: "물가, 돈, 경제적 위치", en: "Cost, money, and economic standing" },
  c_tech: { ko: "브랜드와 기술 뒤의 나라", en: "The country behind the brands and tech" },
};

export function TopicView({ topic }: { topic: Topic }) {
  const { t, locale } = useLanguage();

  const lead = topicLead(topic.slug);
  const pathway = lead ? getPathway(lead.pathway) : undefined;
  const nodes = pathway ? pathway.steps.map((s) => getNode(s.nodeId)) : [];
  const perception = nodes[nodes.length - 1];
  const insight = perception ? insightFor(perception.id) : undefined;

  const questionCount = topic.concepts.reduce(
    (sum, cid) => sum + (getNode(cid).count ?? 0),
    0,
  );

  const chain: { label: string; value: string; accent?: boolean }[] = [
    { label: CHAIN_LABEL[0], value: lead?.question[locale] ?? "" },
    ...nodes.slice(1).map((n, i) => ({ label: CHAIN_LABEL[i + 1], value: n.label[locale] })),
    ...(insight ? [{ label: CHAIN_LABEL[5], value: insight[locale], accent: true }] : []),
  ];

  const realQuestions: string[] = [];
  const seenQ = new Set<string>();
  for (const cid of topic.concepts) {
    const ev = (getNode(cid).evidence ?? []) as Evidence[];
    for (const e of ev) {
      const q = e.q[locale];
      if (q && !seenQ.has(q)) { seenQ.add(q); realQuestions.push(q); }
      if (realQuestions.length >= 6) break;
    }
    if (realQuestions.length >= 6) break;
  }

  const intro = TOPIC_INTRO[topic.slug as TopicSlug];

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative py-[120px]">
            <Link href="/topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" />
              {t("topic.back")}
            </Link>
            <Reveal>
              <h1
                className="mt-8 text-[3.5rem] font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[4.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {topic.title[locale]}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p
                className="mt-6 max-w-[760px] text-[20px] leading-relaxed text-secondary sm:text-[22px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {lead?.question[locale]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-mono text-[4.5rem] font-bold tabular-nums leading-none text-navy">
                  {questionCount.toLocaleString()}
                </span>
                <span className="text-[1.5rem] font-medium text-muted-foreground">
                  {locale === "ko" ? "개 질문" : "questions"}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-secondary"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {intro?.[locale] ?? topic.tagline[locale]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 대표 질문 (검색 UI) ── */}
        {realQuestions.length > 0 && (
          <section className="border-b border-border bg-white">
            <div className="container max-w-[1280px] py-[120px]">
              <Reveal>
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t("topic.realQuestions")}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2
                  className="mt-4 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]"
                  style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko" ? "세계가 실제로 검색한 질문" : "Questions the world actually searched"}
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {realQuestions.map((q, i) => (
                  <Reveal key={q} delay={(i % 2) * 0.05}>
                    <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-[#F7F9FD] px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      <Search className="mt-0.5 h-4.5 w-4.5 shrink-0 text-muted-foreground/60" />
                      <span className="text-[15.5px] font-medium leading-snug text-navy">{q}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 질문→인식 흐름 (가로 타임라인) ── */}
        {perception && (
          <section className="border-b border-border bg-[#F7F9FD]">
            <div className="container max-w-[1280px] py-[120px]">
              <Reveal>
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t("topic.pathLabel")}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2
                  className="mt-4 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]"
                  style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko" ? "하나의 질문이 인식이 되기까지" : "From a single question to a perception"}
                </h2>
              </Reveal>

              <div className="mt-12 hidden overflow-x-auto lg:block">
                <div className="flex min-w-[700px] items-stretch gap-0">
                  {chain.map((step, i) => (
                    <React.Fragment key={i}>
                      <Reveal delay={i * 0.06} className="flex-1">
                        <div
                          className={
                            "flex h-full flex-col rounded-3xl border px-5 py-5 " +
                            (step.accent
                              ? "border-brand bg-brand/5"
                              : i === chain.length - 2
                                ? "border-navy bg-navy"
                                : "border-border bg-white")
                          }
                        >
                          <div
                            className={
                              "text-[10px] font-semibold uppercase tracking-[0.14em] " +
                              (step.accent
                                ? "text-brand"
                                : i === chain.length - 2
                                  ? "text-brand-hi"
                                  : "text-muted-foreground")
                            }
                          >
                            {t(step.label)}
                          </div>
                          <div
                            className={
                              "mt-2 text-[14.5px] font-medium leading-snug " +
                              (i === chain.length - 2 ? "text-white" : "text-navy")
                            }
                          >
                            {step.value}
                          </div>
                        </div>
                      </Reveal>
                      {i < chain.length - 1 && (
                        <div className="flex shrink-0 items-center px-1.5 text-muted-foreground" aria-hidden>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* mobile: vertical */}
              <div className="mt-12 space-y-2 lg:hidden">
                {chain.map((step, i) => (
                  <Reveal key={`m-${i}`} delay={i * 0.04}>
                    <div
                      className={
                        "rounded-2xl border px-5 py-4 " +
                        (step.accent
                          ? "border-brand bg-brand/5"
                          : i === chain.length - 2
                            ? "border-navy bg-navy"
                            : "border-border bg-white")
                      }
                    >
                      <div
                        className={
                          "text-[10px] font-semibold uppercase tracking-[0.14em] " +
                          (step.accent
                            ? "text-brand"
                            : i === chain.length - 2
                              ? "text-brand-hi"
                              : "text-muted-foreground")
                        }
                      >
                        {t(step.label)}
                      </div>
                      <div className={"mt-1 text-[15px] font-medium leading-snug " + (i === chain.length - 2 ? "text-white" : "text-navy")}>
                        {step.value}
                      </div>
                    </div>
                    {i < chain.length - 1 && (
                      <div className="py-0.5 pl-5 text-muted-foreground" aria-hidden>↓</div>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 주요 개념 ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-[120px]">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("topic.keyConcepts")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "이 주제를 구성하는 개념들"
                  : "The concepts that form this topic"}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {topic.concepts.map((cid, i) => {
                const c = getNode(cid);
                const blurb = CONCEPT_BLURB[cid];
                return (
                  <Reveal key={cid} delay={(i % 2) * 0.06} className="h-full">
                    <div className="flex h-full min-h-[180px] flex-col rounded-3xl border border-border bg-[#F4F8FF] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                        {locale === "ko" ? "주요 개념" : "Key concept"}
                      </div>
                      <h3 className="mt-2 text-xl font-bold leading-snug text-navy">{c.label[locale]}</h3>
                      {typeof c.count === "number" && (
                        <span className="mt-2.5 inline-flex w-fit items-center rounded-full bg-[#EEF4FF] px-3 py-1 text-[12px] font-semibold tabular-nums text-brand">
                          {c.count.toLocaleString()}{locale === "ko" ? "개 질문" : " questions"}
                        </span>
                      )}
                      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-secondary">
                        {blurb?.[locale] ?? c.blurb[locale]}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 발견 (Insight) ── */}
        {insight && (
          <section className="border-b border-border bg-[#F7F9FD]">
            <div className="container max-w-[1280px] py-[120px]">
              <div className="max-w-[720px]">
                <Reveal>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {t("layer.insight")}
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <p
                    className="mt-5 text-[1.7rem] font-semibold leading-[1.45] text-navy sm:text-[2rem]"
                    style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {insight[locale]}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <Link
                    href="/explore"
                    className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
                  >
                    <Network className="h-4 w-4" />
                    {t("topic.explore.cta")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ── 데이터 신뢰성 ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-[120px]">
            <Reveal>
              <div className="rounded-3xl border border-border bg-[#F7F9FD] p-8 sm:p-10">
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-brand" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {locale === "ko" ? "데이터 출처" : "Data source"}
                  </span>
                </div>
                <p
                  className="mt-4 max-w-[720px] text-[17px] leading-relaxed text-navy"
                  style={{ wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko"
                    ? `이 주제는 ${questionCount.toLocaleString()}개의 실제 질문을 바탕으로 구성되었습니다.`
                    : `This topic is built from ${questionCount.toLocaleString()} real questions.`}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "질문 출처" : "Source"}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-navy">{PROVENANCE.method}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "언어" : "Languages"}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-navy">
                      {PROVENANCE.languages}{locale === "ko" ? "개 언어" : " languages"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "국가" : "Markets"}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-navy">
                      {PROVENANCE.markets}{locale === "ko" ? "개 국가" : " markets"}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
