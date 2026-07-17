"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Network, Search, Database, ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getPathway, getNode, PROVENANCE, type Evidence } from "@/lib/ontology";
import { topicLead, type Topic, type TopicSlug } from "@/lib/topics";
import { insightFor } from "@/lib/interpretation";
import { MARKETS } from "@/lib/markets";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import allTopicQuestions from "@/lib/topic-questions.generated.json";

const CHAIN_LABEL = ["type.question", "type.concept", "type.theme", "type.narrative", "type.perception", "layer.insight"];

const TOPIC_INTRO: Record<TopicSlug, { ko: string; en: string }> = {
  hallyu: {
    ko: "세계는 K-pop만 궁금했던 것이 아니다. 332개의 실제 질문으로 읽는 세계의 한국 인식.",
    en: "The world wasn't only curious about K-pop. 332 real questions reveal how the world perceives Korea.",
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

const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸", DE: "🇩🇪", IN: "🇮🇳", ID: "🇮🇩",
  JP: "🇯🇵", BR: "🇧🇷", AE: "🇦🇪", KR: "🇰🇷",
};

interface ConceptQuestion {
  id: string;
  text: string;
  countries: string[];
  language: string;
  frequency: number;
}

interface TopicQuestion extends ConceptQuestion {
  conceptId: string;
}

interface TopicData {
  count: number;
  questions: TopicQuestion[];
  concepts: Record<string, ConceptQuestion[]>;
}

const PAGE_SIZE = 30;

export function TopicView({ topic }: { topic: Topic }) {
  const { t, locale } = useLanguage();

  const lead = topicLead(topic.slug);
  const pathway = lead ? getPathway(lead.pathway) : undefined;
  const nodes = pathway ? pathway.steps.map((s) => getNode(s.nodeId)) : [];
  const perception = nodes[nodes.length - 1];
  const insight = perception ? insightFor(perception.id) : undefined;

  const topicData = (allTopicQuestions as unknown as Record<string, TopicData>)[topic.slug];
  const allQuestions = useMemo(() => topicData?.questions ?? [], [topicData]);
  const conceptCounts = topicData?.concepts ?? {};

  const questionCount = allQuestions.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);

  const countriesInTopic = useMemo(() => {
    const set = new Set<string>();
    for (const q of allQuestions) for (const c of q.countries) set.add(c);
    return MARKETS.filter((m) => set.has(m.code)).map((m) => m.code);
  }, [allQuestions]);

  const filtered = useMemo(() => {
    let qs = allQuestions;
    if (selectedConcept) qs = qs.filter((q) => q.conceptId === selectedConcept);
    if (selectedCountry) qs = qs.filter((q) => q.countries.includes(selectedCountry));
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      qs = qs.filter((q) => q.text.toLowerCase().includes(lower));
    }
    return qs;
  }, [allQuestions, selectedConcept, selectedCountry, searchQuery]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const chain: { label: string; value: string; accent?: boolean }[] = [
    { label: CHAIN_LABEL[0], value: lead?.question[locale] ?? "" },
    ...nodes.slice(1).map((n, i) => ({ label: CHAIN_LABEL[i + 1], value: n.label[locale] })),
    ...(insight ? [{ label: CHAIN_LABEL[5], value: insight[locale], accent: true }] : []),
  ];

  const intro = TOPIC_INTRO[topic.slug as TopicSlug];

  const conceptDistribution = topic.concepts.map((cid) => ({
    id: cid,
    label: getNode(cid).label[locale],
    count: (conceptCounts[cid] ?? []).length,
  })).sort((a, b) => b.count - a.count);

  const maxConceptCount = conceptDistribution[0]?.count ?? 1;

  const clearFilters = () => {
    setSelectedConcept(null);
    setSelectedCountry(null);
    setSearchQuery("");
    setShowCount(PAGE_SIZE);
  };

  const hasActiveFilter = selectedConcept || selectedCountry || searchQuery.trim();

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-14 pt-24 sm:pb-16 sm:pt-28">
            <Link href="/topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" />
              {t("topic.back")}
            </Link>
            <Reveal>
              <h1
                className="mt-6 text-[2.8rem] font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[3.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {topic.title[locale]}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p
                className="mt-4 max-w-[760px] text-[18px] leading-relaxed text-secondary sm:text-[20px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {lead?.question[locale]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[2rem] font-bold text-navy sm:text-[2.5rem]">
                {questionCount.toLocaleString()}
                <span className="text-[1.1rem] font-semibold text-muted-foreground sm:text-[1.25rem]">
                  {locale === "ko" ? "개 실제 질문" : " real questions"}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-secondary sm:text-[16px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {intro?.[locale] ?? topic.tagline[locale]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Concept Distribution ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-16 sm:py-20">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "개념 분포" : "Concept distribution"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[1.6rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? `${questionCount.toLocaleString()}개 질문의 구성`
                  : `Breakdown of ${questionCount.toLocaleString()} questions`}
              </h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {conceptDistribution.map((cd, i) => (
                <Reveal key={cd.id} delay={i * 0.03}>
                  <button
                    onClick={() => {
                      setSelectedConcept(selectedConcept === cd.id ? null : cd.id);
                      setShowCount(PAGE_SIZE);
                    }}
                    className="group flex w-full items-center gap-4 text-left transition-opacity hover:opacity-80"
                  >
                    <div className="w-24 shrink-0 text-right text-[13px] font-medium text-secondary sm:w-32">
                      {cd.label}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 overflow-hidden rounded-lg bg-border/30">
                        <div
                          className={`flex h-full items-center rounded-lg px-3 transition-all duration-500 ${
                            selectedConcept === cd.id ? "bg-brand" : "bg-brand/60 group-hover:bg-brand/80"
                          }`}
                          style={{ width: `${Math.max(8, Math.round((cd.count / maxConceptCount) * 100))}%` }}
                        >
                          <span className="text-[12px] font-bold tabular-nums text-white">
                            {cd.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Question Archive ── */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-16 sm:py-20">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "질문 아카이브" : "Question archive"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[1.6rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "세계는 실제로 무엇을 검색했을까?"
                  : "What did the world actually search?"}
              </h2>
            </Reveal>

            {/* Search + Filters */}
            <div className="mt-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowCount(PAGE_SIZE); }}
                  placeholder={locale === "ko" ? "질문 검색..." : "Search questions..."}
                  className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-[15px] text-navy outline-none transition-shadow placeholder:text-muted-foreground/50 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-navy">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Concept filter pills */}
                <button
                  onClick={() => { setSelectedConcept(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    !selectedConcept ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "전체" : "All"}
                </button>
                {topic.concepts.map((cid) => {
                  const node = getNode(cid);
                  const count = (conceptCounts[cid] ?? []).length;
                  return (
                    <button
                      key={cid}
                      onClick={() => { setSelectedConcept(selectedConcept === cid ? null : cid); setShowCount(PAGE_SIZE); }}
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                        selectedConcept === cid ? "bg-brand text-white" : "bg-white text-secondary hover:bg-brand/5"
                      }`}
                    >
                      {node.label[locale]} <span className="ml-0.5 opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Country filter */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCountry(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    !selectedCountry ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 국가" : "All countries"}
                </button>
                {countriesInTopic.map((code) => {
                  const market = MARKETS.find((m) => m.code === code);
                  return (
                    <button
                      key={code}
                      onClick={() => { setSelectedCountry(selectedCountry === code ? null : code); setShowCount(PAGE_SIZE); }}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                        selectedCountry === code ? "bg-brand text-white" : "bg-white text-secondary hover:bg-navy/5"
                      }`}
                    >
                      {COUNTRY_FLAG[code]} {market?.name[locale] ?? code}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilter && (
                <div className="flex items-center gap-2 text-[13px] text-secondary">
                  <span>
                    {locale === "ko"
                      ? `${filtered.length.toLocaleString()}개 결과`
                      : `${filtered.length.toLocaleString()} results`}
                  </span>
                  <button onClick={clearFilters} className="text-brand hover:underline">
                    {locale === "ko" ? "초기화" : "Clear filters"}
                  </button>
                </div>
              )}
            </div>

            {/* Question List */}
            <div className="mt-6 space-y-2">
              {visible.map((q, i) => {
                const conceptNode = getNode(q.conceptId);
                return (
                  <div
                    key={q.id}
                    className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-white px-5 py-3.5 transition-all duration-200 hover:shadow-sm"
                  >
                    <Search className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[15px] font-medium leading-snug text-navy">{q.text}</span>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="rounded bg-brand/8 px-1.5 py-0.5 text-[11px] font-medium text-brand">
                          {conceptNode.label[locale]}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          {q.countries.map((c) => COUNTRY_FLAG[c] ?? c).join(" ")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {visible.length === 0 && (
                <div className="py-16 text-center text-[15px] text-muted-foreground">
                  {locale === "ko" ? "검색 결과가 없습니다" : "No questions found"}
                </div>
              )}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-[14px] font-semibold text-navy transition-all hover:shadow-md"
                >
                  <ChevronDown className="h-4 w-4" />
                  {locale === "ko"
                    ? `더 보기 (${Math.min(PAGE_SIZE, filtered.length - showCount)}개 더)`
                    : `Show more (${Math.min(PAGE_SIZE, filtered.length - showCount)} more)`}
                </button>
                <div className="mt-2 text-[12px] text-muted-foreground">
                  {locale === "ko"
                    ? `${visible.length}/${filtered.length}개 표시`
                    : `Showing ${visible.length} of ${filtered.length}`}
                </div>
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="mt-6 text-center text-[12px] text-muted-foreground">
                {locale === "ko"
                  ? `${filtered.length.toLocaleString()}개 질문 전체 표시`
                  : `Showing all ${filtered.length.toLocaleString()} questions`}
              </div>
            )}
          </div>
        </section>

        {/* ── 질문→인식 흐름 (가로 타임라인) ── */}
        {perception && (
          <section className="border-b border-border bg-white">
            <div className="container max-w-[1280px] py-16 sm:py-20">
              <Reveal>
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {t("topic.pathLabel")}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2
                  className="mt-4 text-[1.6rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2rem]"
                  style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko" ? "하나의 질문이 인식이 되기까지" : "From a single question to a perception"}
                </h2>
              </Reveal>

              <div className="mt-10 hidden overflow-x-auto lg:block">
                <div className="flex min-w-[700px] items-stretch gap-0">
                  {chain.map((step, i) => (
                    <React.Fragment key={i}>
                      <Reveal delay={i * 0.06} className="flex-1">
                        <div
                          className={
                            "flex h-full flex-col rounded-2xl border px-5 py-5 " +
                            (step.accent
                              ? "border-brand bg-brand/5"
                              : i === chain.length - 2
                                ? "border-navy bg-navy"
                                : "border-border bg-[#F7F9FD]")
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
              <div className="mt-10 space-y-2 lg:hidden">
                {chain.map((step, i) => (
                  <Reveal key={`m-${i}`} delay={i * 0.04}>
                    <div
                      className={
                        "rounded-xl border px-5 py-4 " +
                        (step.accent
                          ? "border-brand bg-brand/5"
                          : i === chain.length - 2
                            ? "border-navy bg-navy"
                            : "border-border bg-[#F7F9FD]")
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

        {/* ── 데이터 신뢰성 (50% height reduction) ── */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-10 sm:py-14">
            <Reveal>
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-brand" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {locale === "ko" ? "데이터 출처" : "Data source"}
                  </span>
                </div>
                <p
                  className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-navy"
                  style={{ wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko"
                    ? `이 주제는 ${questionCount.toLocaleString()}개의 실제 질문을 바탕으로 구성되었습니다.`
                    : `This topic is built from ${questionCount.toLocaleString()} real questions.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "질문 출처" : "Source"}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold text-navy">{PROVENANCE.method}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "언어" : "Languages"}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold text-navy">
                      {PROVENANCE.languages}{locale === "ko" ? "개 언어" : " languages"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "국가" : "Markets"}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold text-navy">
                      {PROVENANCE.markets}{locale === "ko" ? "개 국가" : " markets"}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Explore CTA ── */}
        {insight && (
          <section className="border-b border-border bg-white">
            <div className="container max-w-[1280px] py-14 sm:py-16">
              <div className="max-w-[720px]">
                <Reveal>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {t("layer.insight")}
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <p
                    className="mt-4 text-[1.5rem] font-semibold leading-[1.45] text-navy sm:text-[1.75rem]"
                    style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {insight[locale]}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <Link
                    href="/explore"
                    className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
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
      </main>
      <Footer />
    </>
  );
}
