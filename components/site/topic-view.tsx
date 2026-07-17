"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Database, ChevronDown, ChevronRight, X, Sparkles, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getNode, PROVENANCE } from "@/lib/ontology";
import { type Topic, type TopicSlug } from "@/lib/topics";
import { MARKETS } from "@/lib/markets";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import allTopicQuestions from "@/lib/topic-questions.generated.json";
import translationData from "@/lib/translations.generated.json";

const translations = translationData as Record<string, { ko: string; en: string }>;

function getTranslation(qId: string, locale: "ko" | "en"): string | null {
  const t = translations[qId];
  return t ? t[locale] : null;
}

function QuestionTranslation({ qId, language, locale }: { qId: string; language: string; locale: "ko" | "en" }) {
  const needsTranslation = (locale === "ko" && language !== "ko") || (locale === "en" && language !== "en");
  if (!needsTranslation) return null;
  const tr = getTranslation(qId, locale);
  if (!tr) return null;
  return (
    <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
      {tr}
    </div>
  );
}

const LANG_LABEL: Record<string, { ko: string; en: string }> = {
  de: { ko: "독일어", en: "German" },
  en: { ko: "영어", en: "English" },
  pt: { ko: "포르투갈어", en: "Portuguese" },
  ar: { ko: "아랍어", en: "Arabic" },
  id: { ko: "인도네시아어", en: "Indonesian" },
  ko: { ko: "한국어", en: "Korean" },
  ja: { ko: "일본어", en: "Japanese" },
};

const TOPIC_INTRO: Record<TopicSlug, { ko: string; en: string }> = {
  hallyu: {
    ko: "한류는 세계가 한국에 접근하는 가장 강력한 입구다. 그러나 질문은 K-pop에서 끝나지 않는다. 음식, 언어, 역사, 사회로 확장된다. 한류는 문화 현상이 아니라 국가 이해의 출발점이다.",
    en: "Hallyu is the world's most powerful gateway to Korea. But the questions don't stop at K-pop — they expand into food, language, history, and society. Hallyu is not a cultural phenomenon; it's the starting point of understanding a country.",
  },
  diplomacy: {
    ko: "세계에게 한국은 아직 분단 국가다. 소프트파워가 아무리 강해도, 안보 프레임은 대체되지 않았다. 외교 질문은 한국 이미지의 또 다른 기저를 보여준다.",
    en: "To the world, Korea is still a divided nation. No matter how strong its soft power, the security frame has not been displaced. Diplomatic questions reveal another foundation of Korea's image.",
  },
  society: {
    ko: "관심이 깊어질수록 질문은 콘텐츠에서 사회로 이동한다. '한국인은 어떤 사람들인가'는 문화 소비의 다음 단계다.",
    en: "As interest deepens, questions move from content to society. 'What are Koreans like?' is the next stage beyond cultural consumption.",
  },
  language: {
    ko: "한국어에 대한 첫 번째 프레임은 '어려움'이다. 관심은 학습보다 빠르게 자라고 있고, 장벽은 어려운 언어가 아니라 부족한 입구다.",
    en: "The first frame for Korean is 'difficulty.' Interest is outrunning access — the barrier is not a hard language but the missing on-ramps.",
  },
  history: {
    ko: "가까운 국가는 현재보다 유산을 질문한다. 역사는 과거가 아니라 한국을 이해하는 또 하나의 입구다.",
    en: "Close countries ask about heritage over the present. History is not the past — it's another doorway into understanding Korea.",
  },
  tourism: {
    ko: "한국 여행은 콘텐츠 소비의 물리적 확장이다. 디지털에서 시작된 관심이 실제 공간으로 이동하는 순간이다.",
    en: "Visiting Korea is the physical extension of content consumption — the moment digital interest moves into real space.",
  },
  technology: {
    ko: "기술 강국 이미지는 질문보다 인식에 가깝다. 사람들은 삼성을 알지만, 한국의 기술 생태계를 질문하지는 않는다.",
    en: "Korea's tech reputation exists more as perception than as curiosity. People know Samsung, but they don't question Korea's tech ecosystem.",
  },
  economy: {
    ko: "경제 질문은 적지만, 경제 인식은 모든 주제에 스며들어 있다. 경제는 독립된 관심사가 아니라 다른 주제의 배경이다.",
    en: "Economic questions are few, but economic perception pervades every topic. Economy is not a standalone interest — it's the backdrop of other themes.",
  },
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

  const topicData = (allTopicQuestions as unknown as Record<string, TopicData>)[topic.slug];
  const allQuestions = useMemo(() => topicData?.questions ?? [], [topicData]);
  const conceptCounts = topicData?.concepts ?? {};

  const questionCount = allQuestions.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

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
      qs = qs.filter((q) => {
        if (q.text.toLowerCase().includes(lower)) return true;
        const tr = getTranslation(q.id, locale);
        return tr ? tr.toLowerCase().includes(lower) : false;
      });
    }
    return qs;
  }, [allQuestions, selectedConcept, selectedCountry, searchQuery]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const intro = TOPIC_INTRO[topic.slug as TopicSlug];

  const conceptDistribution = topic.concepts.map((cid) => ({
    id: cid,
    label: getNode(cid).label[locale],
    count: (conceptCounts[cid] ?? []).length,
  })).sort((a, b) => b.count - a.count);

  const maxConceptCount = conceptDistribution[0]?.count ?? 1;

  // Country profile: when a country is selected, compute its stats
  const countryProfile = useMemo(() => {
    if (!selectedCountry) return null;
    const qs = allQuestions.filter((q) => q.countries.includes(selectedCountry));
    const conceptMap: Record<string, number> = {};
    for (const q of qs) {
      conceptMap[q.conceptId] = (conceptMap[q.conceptId] ?? 0) + 1;
    }
    const distribution = Object.entries(conceptMap)
      .map(([cid, count]) => ({ id: cid, label: getNode(cid).label[locale], count }))
      .sort((a, b) => b.count - a.count);
    const total = qs.length;
    const topQuestions = qs.slice(0, 5);
    const uniqueQuestions = qs.filter((q) => q.countries.length === 1);
    return { total, distribution, topQuestions, uniqueQuestions };
  }, [selectedCountry, allQuestions, locale]);

  // Unexpected questions: single-country questions + widest coverage
  const discoveries = useMemo(() => {
    const wide = [...allQuestions]
      .sort((a, b) => b.countries.length - a.countries.length)
      .slice(0, 5);
    const uniqueByCountry: Record<string, TopicQuestion[]> = {};
    for (const q of allQuestions) {
      if (q.countries.length === 1) {
        const c = q.countries[0];
        if (!uniqueByCountry[c]) uniqueByCountry[c] = [];
        uniqueByCountry[c].push(q);
      }
    }
    const surprises: TopicQuestion[] = [];
    for (const code of Object.keys(uniqueByCountry)) {
      const qs = uniqueByCountry[code];
      if (qs.length > 0) surprises.push(qs[0]);
      if (surprises.length >= 5) break;
    }
    return { wide, surprises };
  }, [allQuestions]);

  // Related questions for expanded question
  const relatedQuestions = useMemo(() => {
    if (!expandedQuestion) return [];
    const q = allQuestions.find((x) => x.id === expandedQuestion);
    if (!q) return [];
    return allQuestions
      .filter((x) => x.id !== q.id && x.conceptId === q.conceptId)
      .slice(0, 8);
  }, [expandedQuestion, allQuestions]);

  const clearFilters = () => {
    setSelectedConcept(null);
    setSelectedCountry(null);
    setSearchQuery("");
    setShowCount(PAGE_SIZE);
  };

  const hasActiveFilter = selectedConcept || selectedCountry || searchQuery.trim();

  const market = selectedCountry ? MARKETS.find((m) => m.code === selectedCountry) : null;

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
                {topic.tagline[locale]}
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
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "질문 분포" : "Question distribution"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? `${questionCount.toLocaleString()}개의 질문은 무엇에 집중되었을까?`
                  : `What do ${questionCount.toLocaleString()} questions focus on?`}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {conceptDistribution.map((cd, i) => {
                const pct = Math.round((cd.count / questionCount) * 100);
                return (
                  <Reveal key={cd.id} delay={i * 0.03}>
                    <button
                      onClick={() => {
                        setSelectedConcept(selectedConcept === cd.id ? null : cd.id);
                        setShowCount(PAGE_SIZE);
                      }}
                      className="group flex w-full items-center gap-4 text-left transition-opacity hover:opacity-80"
                    >
                      <div className="w-20 shrink-0 text-right sm:w-28">
                        <div className="text-[13px] font-semibold text-navy">{cd.label}</div>
                        <div className="text-[11px] tabular-nums text-muted-foreground">{cd.count}{locale === "ko" ? "개" : ""} · {pct}%</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-7 overflow-hidden rounded-lg bg-border/30">
                          <div
                            className={`flex h-full items-center rounded-lg px-3 transition-all duration-500 ${
                              selectedConcept === cd.id ? "bg-brand" : "bg-brand/55 group-hover:bg-brand/75"
                            }`}
                            style={{ width: `${Math.max(8, Math.round((cd.count / maxConceptCount) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Discoveries: unexpected questions ── */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Sparkles className="h-3.5 w-3.5" />
                {locale === "ko" ? "발견" : "Discoveries"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko" ? "예상 밖의 질문들" : "Unexpected questions"}
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Widest coverage */}
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {locale === "ko" ? "가장 많은 나라가 물은 질문" : "Asked in the most countries"}
                  </div>
                  <div className="mt-4 space-y-3">
                    {discoveries.wide.map((q) => (
                      <div key={q.id} className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <span className="text-[14px] font-medium text-navy">{q.text}</span>
                          <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        </div>
                        <span className="shrink-0 text-[12px] text-muted-foreground">
                          {q.countries.map((c) => COUNTRY_FLAG[c] ?? c).join(" ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Country-unique */}
              <Reveal delay={0.12}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {locale === "ko" ? "한 나라만 물은 질문" : "Only one country asked"}
                  </div>
                  <div className="mt-4 space-y-3">
                    {discoveries.surprises.map((q) => (
                      <div key={q.id} className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <span className="text-[14px] font-medium text-navy">{q.text}</span>
                          <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        </div>
                        <span className="shrink-0 rounded-full bg-brand/8 px-2 py-0.5 text-[11px] font-semibold text-brand">
                          {COUNTRY_FLAG[q.countries[0]]} {MARKETS.find((m) => m.code === q.countries[0])?.name[locale] ?? q.countries[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Question Archive ── */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-14 sm:py-16">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "질문 아카이브" : "Question archive"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[1.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "세계는 실제로 무엇을 검색했을까?"
                  : "What did the world actually search?"}
              </h2>
            </Reveal>

            {/* Search + Filters */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowCount(PAGE_SIZE); }}
                  placeholder={locale === "ko" ? "질문 검색..." : "Search questions..."}
                  className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-[14px] text-navy outline-none transition-shadow placeholder:text-muted-foreground/50 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-navy">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedConcept(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
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
                      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                        selectedConcept === cid ? "bg-brand text-white" : "bg-white text-secondary hover:bg-brand/5"
                      }`}
                    >
                      {node.label[locale]} {count}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCountry(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedCountry ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 국가" : "All countries"}
                </button>
                {countriesInTopic.map((code) => {
                  const m = MARKETS.find((x) => x.code === code);
                  return (
                    <button
                      key={code}
                      onClick={() => { setSelectedCountry(selectedCountry === code ? null : code); setShowCount(PAGE_SIZE); }}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        selectedCountry === code ? "bg-brand text-white" : "bg-white text-secondary hover:bg-navy/5"
                      }`}
                    >
                      {COUNTRY_FLAG[code]} {m?.name[locale] ?? code}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilter && (
                <div className="flex items-center gap-2 text-[12px] text-secondary">
                  <span>
                    {locale === "ko"
                      ? `${filtered.length.toLocaleString()}개 결과`
                      : `${filtered.length.toLocaleString()} results`}
                  </span>
                  <button onClick={clearFilters} className="text-brand hover:underline">
                    {locale === "ko" ? "초기화" : "Clear"}
                  </button>
                </div>
              )}
            </div>

            {/* ── Country Profile Card ── */}
            {selectedCountry && countryProfile && (
              <div className="mt-5 rounded-2xl border border-brand/20 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{COUNTRY_FLAG[selectedCountry]}</span>
                  <div>
                    <div className="text-[1.1rem] font-bold text-navy">{market?.name[locale] ?? selectedCountry}</div>
                    <div className="text-[12px] text-muted-foreground">
                      {locale === "ko"
                        ? `${countryProfile.total}개 질문 · 이 나라만의 질문 ${countryProfile.uniqueQuestions.length}개`
                        : `${countryProfile.total} questions · ${countryProfile.uniqueQuestions.length} unique to this country`}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "주요 관심사" : "Top interests"}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {countryProfile.distribution.slice(0, 4).map((d) => {
                        const pct = Math.round((d.count / countryProfile.total) * 100);
                        return (
                          <div key={d.id} className="flex items-center gap-2">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border/40">
                              <div className="h-full rounded-full bg-brand/60" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-20 shrink-0 text-[11px] font-medium text-navy">{d.label}</span>
                            <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {locale === "ko" ? "대표 질문" : "Top questions"}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {countryProfile.topQuestions.map((q) => (
                        <div key={q.id}>
                          <div className="text-[13px] font-medium text-navy">{q.text}</div>
                          <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question List */}
            <div className="mt-5 space-y-1.5">
              {visible.map((q) => {
                const conceptNode = getNode(q.conceptId);
                const isExpanded = expandedQuestion === q.id;
                const related = isExpanded ? relatedQuestions : [];

                return (
                  <div key={q.id}>
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                        isExpanded
                          ? "border-brand/30 bg-white shadow-sm"
                          : "border-border/60 bg-white hover:border-border hover:shadow-sm"
                      }`}
                    >
                      <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[14px] font-medium leading-snug text-navy">{q.text}</span>
                            <QuestionTranslation qId={q.id} language={q.language} locale={locale} />
                          </div>
                          <span className="mt-0.5 flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                            {q.countries.map((c) => COUNTRY_FLAG[c] ?? c).join(" ")}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2.5">
                          <span className="rounded bg-brand/8 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                            {conceptNode.label[locale]}
                          </span>
                          {q.language !== locale && LANG_LABEL[q.language] && (
                            <span className="rounded bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {LANG_LABEL[q.language][locale]}
                            </span>
                          )}
                          <span className="text-[10px] tabular-nums text-muted-foreground">
                            {q.countries.length}{locale === "ko" ? "개국" : " countries"}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* ── Expanded: related questions ── */}
                    {isExpanded && related.length > 0 && (
                      <div className="ml-6 mt-1.5 rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {locale === "ko" ? "관련 질문" : "Related questions"}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {related.map((rq) => (
                            <button
                              key={rq.id}
                              onClick={() => setExpandedQuestion(rq.id)}
                              className="rounded-lg border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-secondary transition-colors hover:border-brand/30 hover:text-navy"
                            >
                              {rq.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {visible.length === 0 && (
                <div className="py-12 text-center text-[14px] text-muted-foreground">
                  {locale === "ko" ? "검색 결과가 없습니다" : "No questions found"}
                </div>
              )}
            </div>

            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-[13px] font-semibold text-navy transition-all hover:shadow-md"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  {locale === "ko"
                    ? `더 보기 (${Math.min(PAGE_SIZE, filtered.length - showCount)}개 더)`
                    : `Show more (${Math.min(PAGE_SIZE, filtered.length - showCount)} more)`}
                </button>
                <div className="mt-1.5 text-[11px] text-muted-foreground">
                  {locale === "ko"
                    ? `${visible.length}/${filtered.length}개 표시`
                    : `Showing ${visible.length} of ${filtered.length}`}
                </div>
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="mt-5 text-center text-[11px] text-muted-foreground">
                {locale === "ko"
                  ? `${filtered.length.toLocaleString()}개 질문 전체 표시`
                  : `Showing all ${filtered.length.toLocaleString()} questions`}
              </div>
            )}
          </div>
        </section>


        {/* ── 데이터 출처 ── */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1280px] py-10 sm:py-12">
            <Reveal>
              <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-brand" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {locale === "ko" ? "데이터 출처" : "Data source"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "질문" : "Questions"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{questionCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "언어" : "Languages"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{PROVENANCE.languages}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "국가" : "Markets"}</div>
                    <div className="text-[15px] font-bold tabular-nums text-navy">{PROVENANCE.markets}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "출처" : "Source"}</div>
                    <div className="text-[15px] font-bold text-navy">{PROVENANCE.method}</div>
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
