"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, X, ChevronRight, ChevronDown, Globe, Database, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getNode, PROVENANCE } from "@/lib/ontology";
import { TOPICS, getTopic } from "@/lib/topics";
import { MARKETS, marketName } from "@/lib/markets";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import { ForceGraph } from "./force-graph";
import allTopicQuestions from "@/lib/topic-questions.generated.json";
import translationData from "@/lib/translations.generated.json";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

const COUNTRY_FLAG: Record<string, string> = {
  US: "\u{1F1FA}\u{1F1F8}", DE: "\u{1F1E9}\u{1F1EA}", IN: "\u{1F1EE}\u{1F1F3}", ID: "\u{1F1EE}\u{1F1E9}",
  JP: "\u{1F1EF}\u{1F1F5}", BR: "\u{1F1E7}\u{1F1F7}", AE: "\u{1F1E6}\u{1F1EA}", KR: "\u{1F1F0}\u{1F1F7}",
};

const LANG_LABEL: Record<string, L> = {
  de: { ko: "독일어", en: "German" },
  en: { ko: "영어", en: "English" },
  pt: { ko: "포르투갈어", en: "Portuguese" },
  ar: { ko: "아랍어", en: "Arabic" },
  id: { ko: "인도네시아어", en: "Indonesian" },
  ko: { ko: "한국어", en: "Korean" },
  ja: { ko: "일본어", en: "Japanese" },
};

const COUNTRY_PROFILES: Record<string, {
  interests: L[];
  summary: L;
}> = {
  JP: {
    interests: [D("사회", "Society"), D("언어", "Language"), D("생활문화", "Daily culture")],
    summary: D(
      "일본은 한국을 소비하는 문화보다 관찰하는 사회로 접근한다.",
      "Japan approaches Korea as a society to observe rather than a culture to consume."
    ),
  },
  ID: {
    interests: [D("K-pop", "K-pop"), D("뷰티", "Beauty"), D("드라마", "Drama")],
    summary: D(
      "인도네시아는 한류를 통해 처음 한국에 진입한다.",
      "Indonesia first enters Korea through Hallyu."
    ),
  },
  BR: {
    interests: [D("분단", "Division"), D("북한", "North Korea"), D("한국전쟁", "Korean War")],
    summary: D(
      "브라질은 지정학적 호기심으로 한국에 접근한다.",
      "Brazil approaches Korea through geopolitical curiosity."
    ),
  },
  DE: {
    interests: [D("언어", "Language"), D("발음", "Pronunciation"), D("학습", "Learning")],
    summary: D(
      "독일은 한국어 자체를 통해 한국에 진입한다.",
      "Germany enters Korea through the Korean language itself."
    ),
  },
  "US+IN": {
    interests: [D("사람", "People"), D("여행", "Travel"), D("분단", "Division"), D("언어", "Language")],
    summary: D(
      "영어권은 넓게 그러나 얕게 한국을 질문한다.",
      "The English-speaking world asks about Korea widely but shallowly."
    ),
  },
  AE: {
    interests: [D("스킨케어", "Skincare"), D("생활", "Lifestyle"), D("관광", "Tourism")],
    summary: D(
      "아랍권은 라이프스타일을 통해 한국에 접근한다.",
      "The Arab world approaches Korea through lifestyle."
    ),
  },
  KR: {
    interests: [D("사람", "People"), D("문화유산", "Heritage"), D("사회", "Society")],
    summary: D(
      "한국은 외국인의 시선으로 자신을 질문한다.",
      "Korea asks about itself through foreign eyes."
    ),
  },
};

function getCountryProfile(code: string) {
  if (code === "US" || code === "IN") return COUNTRY_PROFILES["US+IN"];
  return COUNTRY_PROFILES[code] ?? null;
}

interface TopicQuestion {
  id: string;
  text: string;
  countries: string[];
  language: string;
  frequency: number;
  conceptId: string;
}

interface TopicData {
  count: number;
  questions: TopicQuestion[];
  concepts: Record<string, TopicQuestion[]>;
}

const translations = translationData as Record<string, L>;

function getTranslation(qId: string, locale: "ko" | "en"): string | null {
  const t = translations[qId];
  return t ? t[locale] : null;
}

const ALL_QUESTIONS: TopicQuestion[] = (() => {
  const data = allTopicQuestions as unknown as Record<string, TopicData>;
  const all: TopicQuestion[] = [];
  for (const topic of Object.keys(data)) {
    for (const q of data[topic].questions) all.push(q);
  }
  all.sort((a, b) => (b.frequency ?? 0) - (a.frequency ?? 0));
  return all;
})();

const PAGE_SIZE = 40;

function QuestionTranslation({ qId, text, language, locale }: { qId: string; text: string; language: string; locale: "ko" | "en" }) {
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

export function ExploreView() {
  const { t, locale } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const topicConceptMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const tp of TOPICS) {
      for (const c of tp.concepts) map[c] = tp.slug;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    let qs = ALL_QUESTIONS;
    if (selectedTopic) qs = qs.filter((q) => topicConceptMap[q.conceptId] === selectedTopic);
    if (selectedCountry) qs = qs.filter((q) => q.countries.includes(selectedCountry));
    if (selectedLanguage) qs = qs.filter((q) => q.language === selectedLanguage);
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      qs = qs.filter((q) => {
        if (q.text.toLowerCase().includes(lower)) return true;
        const tr = translations[q.id];
        if (tr && (tr.ko.toLowerCase().includes(lower) || tr.en.toLowerCase().includes(lower))) return true;
        return false;
      });
    }
    return qs;
  }, [selectedTopic, selectedCountry, selectedLanguage, searchQuery, topicConceptMap]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const hasActiveFilter = selectedTopic || selectedCountry || selectedLanguage || searchQuery.trim();

  const clearFilters = () => {
    setSelectedTopic(null);
    setSelectedCountry(null);
    setSelectedLanguage(null);
    setSearchQuery("");
    setShowCount(PAGE_SIZE);
  };

  const languagesInData = useMemo(() => {
    const set = new Set<string>();
    for (const q of ALL_QUESTIONS) set.add(q.language);
    return Array.from(set).sort();
  }, []);

  const countriesInData = useMemo(() => {
    const set = new Set<string>();
    for (const q of ALL_QUESTIONS) for (const c of q.countries) set.add(c);
    return MARKETS.filter((m) => set.has(m.code)).map((m) => m.code);
  }, []);

  // Country question counts for grid
  const countryQuestionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of ALL_QUESTIONS) {
      for (const c of q.countries) {
        counts[c] = (counts[c] ?? 0) + 1;
      }
    }
    return counts;
  }, []);

  // Country profile data (when a country is selected)
  const countryProfileData = useMemo(() => {
    if (!selectedCountry) return null;
    const qs = ALL_QUESTIONS.filter((q) => q.countries.includes(selectedCountry));
    const uniqueQs = qs.filter((q) => q.countries.length === 1);
    const topQuestions = qs.slice(0, 5); // already sorted by frequency
    return { total: qs.length, uniqueCount: uniqueQs.length, topQuestions };
  }, [selectedCountry]);

  const expandedData = useMemo(() => {
    if (!expandedQuestion) return null;
    const q = ALL_QUESTIONS.find((x) => x.id === expandedQuestion);
    if (!q) return null;

    const sameConceptQs = ALL_QUESTIONS.filter((x) => x.conceptId === q.conceptId && x.id !== q.id);

    const topicSlug = topicConceptMap[q.conceptId];
    const topic = topicSlug ? getTopic(topicSlug) : undefined;

    const relatedQuestions = sameConceptQs.slice(0, 10);

    return { q, topic, relatedQuestions };
  }, [expandedQuestion, topicConceptMap]);

  return (
    <>
      <Navbar />
      <main>
        {/* -- Hero -- */}
        <section className="border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #EFF3FB)" }}>
          <div className="container relative pb-10 pt-24 sm:pb-12 sm:pt-28">
            <Reveal>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Database className="h-3.5 w-3.5" />
                {locale === "ko" ? "질문 데이터베이스" : "Question database"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="mt-4 text-[2.2rem] font-bold leading-[1.1] tracking-[-0.03em] text-navy sm:text-[2.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "1,540개의 질문을 직접 탐색하세요"
                  : "Explore 1,540 questions yourself"}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary sm:text-[16px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "8개 국가, 7개 언어로 수집된 실제 검색 질문. 각 질문의 출처, 분포, 관련 질문을 확인할 수 있습니다."
                  : "Real search questions collected across 8 countries and 7 languages. See each question's origin, distribution, and related questions."}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:gap-6">
                {[
                  { v: PROVENANCE.canonicalQuestions.toLocaleString(), l: locale === "ko" ? "질문" : "questions" },
                  { v: String(PROVENANCE.markets), l: locale === "ko" ? "국가" : "countries" },
                  { v: String(PROVENANCE.languages), l: locale === "ko" ? "언어" : "languages" },
                  { v: String(TOPICS.length), l: locale === "ko" ? "주제" : "topics" },
                ].map((s) => (
                  <div key={s.l} className="flex items-baseline gap-1.5">
                    <span className="text-[1.4rem] font-bold tabular-nums text-navy sm:text-[1.6rem]">{s.v}</span>
                    <span className="text-[12px] text-muted-foreground">{s.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -- Country Grid (default) OR Country Profile Card (selected) -- */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-10 sm:py-12">
            {!selectedCountry ? (
              /* -- Country Grid: 8 cards -- */
              <div>
                <Reveal>
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                    <Globe className="h-3.5 w-3.5" />
                    {locale === "ko" ? "국가별 탐색" : "Explore by country"}
                  </div>
                  <h2
                    className="mt-2 text-[1.3rem] font-semibold leading-[1.3] text-navy sm:text-[1.5rem]"
                    style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {locale === "ko"
                      ? "특정 국가는 한국을 어떻게 바라보는가?"
                      : "How does a specific country view Korea?"}
                  </h2>
                </Reveal>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {MARKETS.map((m) => {
                    const profile = getCountryProfile(m.code);
                    const topInterest = profile?.interests[0];
                    const qCount = countryQuestionCounts[m.code] ?? 0;
                    return (
                      <Reveal key={m.code} delay={0.02}>
                        <button
                          onClick={() => { setSelectedCountry(m.code); setShowCount(PAGE_SIZE); }}
                          className="flex w-full flex-col items-start rounded-xl border border-border bg-[#F8FAFF] p-4 text-left transition-all hover:border-brand/30 hover:shadow-md"
                        >
                          <span className="text-[2rem]">{COUNTRY_FLAG[m.code]}</span>
                          <span className="mt-2 text-[14px] font-semibold text-navy">{m.name[locale]}</span>
                          <span className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                            {qCount}{locale === "ko" ? "개 질문" : " questions"}
                          </span>
                          {topInterest && (
                            <span className="mt-2 inline-block rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-medium text-brand">
                              {topInterest[locale]}
                            </span>
                          )}
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* -- Country Profile Card (prominent) -- */
              <div>
                <button
                  onClick={() => { setSelectedCountry(null); setShowCount(PAGE_SIZE); }}
                  className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand hover:underline"
                >
                  <ChevronRight className="h-3 w-3 rotate-180" />
                  {locale === "ko" ? "모든 국가 보기" : "All countries"}
                </button>
                <div className="rounded-2xl border border-brand/20 bg-[#F8FAFF] p-5 sm:p-7">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-[2.5rem]">{COUNTRY_FLAG[selectedCountry]}</span>
                    <div>
                      <h2 className="text-[1.3rem] font-bold text-navy sm:text-[1.5rem]">
                        {marketName(selectedCountry)[locale]}
                      </h2>
                      <div className="mt-0.5 flex items-center gap-3 text-[12px] text-muted-foreground">
                        <span>{countryProfileData?.total ?? 0}{locale === "ko" ? "개 질문" : " questions"}</span>
                        <span>{countryProfileData?.uniqueCount ?? 0}{locale === "ko" ? "개 고유 질문" : " unique"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {(() => {
                    const profile = getCountryProfile(selectedCountry);
                    if (!profile) return null;
                    return (
                      <p className="mt-4 text-[14px] leading-relaxed text-secondary" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
                        {profile.summary[locale]}
                      </p>
                    );
                  })()}

                  {/* Interest chips */}
                  {(() => {
                    const profile = getCountryProfile(selectedCountry);
                    if (!profile) return null;
                    return (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {profile.interests.map((interest, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-brand/15 bg-white px-3 py-1 text-[12px] font-medium text-brand"
                          >
                            {interest[locale]}
                          </span>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Representative questions (top 5 by frequency) */}
                  {countryProfileData && countryProfileData.topQuestions.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {locale === "ko" ? "대표 질문" : "Representative questions"}
                      </div>
                      <div className="mt-2 space-y-2">
                        {countryProfileData.topQuestions.map((q) => (
                          <button
                            key={q.id}
                            onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                            className="block w-full text-left"
                          >
                            <div className="text-[13px] font-medium leading-snug text-navy hover:text-brand">{q.text}</div>
                            <QuestionTranslation qId={q.id} text={q.text} language={q.language} locale={locale} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* -- Question Archive -- */}
        <section className="border-b border-border bg-[#F7F9FD]">
          <div className="container max-w-[1280px] py-10 sm:py-12">
            <Reveal>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                <BarChart3 className="h-3.5 w-3.5" />
                {locale === "ko" ? "질문 아카이브" : "Question archive"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-2 text-[1.3rem] font-semibold leading-[1.3] text-navy sm:text-[1.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "세계는 실제로 무엇을 검색했을까?"
                  : "What did the world actually search?"}
              </h2>
            </Reveal>

            {/* Search */}
            <div className="mt-5 space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowCount(PAGE_SIZE); }}
                  placeholder={locale === "ko" ? "질문 검색 (한국어·영어·원문 모두 검색 가능)..." : "Search questions (Korean, English, or original text)..."}
                  className="h-10 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-[13px] text-navy outline-none transition-shadow placeholder:text-muted-foreground/50 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-navy">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Topic filters */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedTopic(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedTopic ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "전체 주제" : "All topics"}
                </button>
                {TOPICS.map((tp) => (
                  <button
                    key={tp.slug}
                    onClick={() => { setSelectedTopic(selectedTopic === tp.slug ? null : tp.slug); setShowCount(PAGE_SIZE); }}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedTopic === tp.slug ? "bg-brand text-white" : "bg-white text-secondary hover:bg-brand/5"
                    }`}
                  >
                    {tp.title[locale]}
                  </button>
                ))}
              </div>

              {/* Country filters */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCountry(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedCountry ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 국가" : "All countries"}
                </button>
                {countriesInData.map((code) => (
                  <button
                    key={code}
                    onClick={() => { setSelectedCountry(selectedCountry === code ? null : code); setShowCount(PAGE_SIZE); }}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedCountry === code ? "bg-brand text-white" : "bg-white text-secondary hover:bg-navy/5"
                    }`}
                  >
                    {COUNTRY_FLAG[code]} {marketName(code)[locale]}
                  </button>
                ))}
              </div>

              {/* Language filters */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedLanguage(null); setShowCount(PAGE_SIZE); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedLanguage ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 언어" : "All languages"}
                </button>
                {languagesInData.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLanguage(selectedLanguage === lang ? null : lang); setShowCount(PAGE_SIZE); }}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedLanguage === lang ? "bg-brand text-white" : "bg-white text-secondary hover:bg-navy/5"
                    }`}
                  >
                    {LANG_LABEL[lang]?.[locale] ?? lang}
                  </button>
                ))}
              </div>

              {hasActiveFilter && (
                <div className="flex items-center gap-2 text-[11px] text-secondary">
                  <span>{filtered.length.toLocaleString()}{locale === "ko" ? "개 결과" : " results"}</span>
                  <button onClick={clearFilters} className="text-brand hover:underline">
                    {locale === "ko" ? "초기화" : "Clear all"}
                  </button>
                </div>
              )}
            </div>

            {/* -- Question List -- */}
            <div className="mt-4 space-y-1">
              {visible.map((q) => {
                const conceptNode = getNode(q.conceptId);
                const isExpanded = expandedQuestion === q.id;
                const topicSlug = topicConceptMap[q.conceptId];
                const topic = topicSlug ? getTopic(topicSlug) : undefined;
                const relatedCount = ALL_QUESTIONS.filter((x) => x.conceptId === q.conceptId && x.id !== q.id).length;

                return (
                  <div key={q.id}>
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                      className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all ${
                        isExpanded
                          ? "border-brand/30 bg-white shadow-sm"
                          : "border-border/60 bg-white hover:border-border hover:shadow-sm"
                      }`}
                    >
                      <ChevronRight className={`mt-1 h-3 w-3 shrink-0 text-muted-foreground/50 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium leading-snug text-navy">{q.text}</div>
                        <QuestionTranslation qId={q.id} text={q.text} language={q.language} locale={locale} />
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="rounded bg-brand/8 px-1.5 py-0.5 text-[9px] font-medium text-brand">
                            {conceptNode?.label[locale]}
                          </span>
                          {topic && (
                            <span className="text-[9px] text-muted-foreground">{topic.title[locale]}</span>
                          )}
                          <span className="text-[9px] tabular-nums text-muted-foreground">
                            {q.countries.length}{locale === "ko" ? "개국" : " countries"}
                          </span>
                          <span className="text-[9px] tabular-nums text-muted-foreground">
                            {locale === "ko" ? `관련 ${relatedCount}개` : `${relatedCount} related`}
                          </span>
                          <span className="text-[9px] text-muted-foreground">
                            {q.countries.map((c) => COUNTRY_FLAG[c]).join(" ")}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* -- Expanded Detail Panel -- */}
                    {isExpanded && expandedData && (
                      <div className="ml-5 mt-1 space-y-3 rounded-xl border border-brand/15 bg-brand/[0.02] px-4 py-4">
                        {/* Country distribution */}
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                            {locale === "ko" ? "질문 발생 국가" : "Countries asking this"}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {expandedData.q.countries.map((code) => (
                              <div key={code} className="flex items-center gap-1 rounded-md border border-border bg-white px-2 py-1">
                                <span className="text-[13px]">{COUNTRY_FLAG[code]}</span>
                                <span className="text-[11px] font-medium text-navy">{marketName(code)[locale]}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Language info */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            {locale === "ko" ? "원문 언어" : "Original language"}
                          </span>
                          <span className="rounded bg-border/40 px-1.5 py-0.5 text-[10px] font-medium text-navy">
                            {LANG_LABEL[expandedData.q.language]?.[locale] ?? expandedData.q.language}
                          </span>
                        </div>

                        {/* Related questions */}
                        {expandedData.relatedQuestions.length > 0 && (
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {locale === "ko" ? `관련 질문 (${expandedData.relatedQuestions.length}개)` : `Related questions (${expandedData.relatedQuestions.length})`}
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {expandedData.relatedQuestions.map((rq) => (
                                <button
                                  key={rq.id}
                                  onClick={() => setExpandedQuestion(rq.id)}
                                  className="rounded-md border border-border bg-white px-2 py-1 text-left transition-colors hover:border-brand/30"
                                >
                                  <div className="text-[11px] font-medium text-navy">{rq.text}</div>
                                  <QuestionTranslation qId={rq.id} text={rq.text} language={rq.language} locale={locale} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Link to topic */}
                        {expandedData.topic && (
                          <Link
                            href={`/topics/${expandedData.topic.slug}`}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand hover:underline"
                          >
                            {locale === "ko" ? `${expandedData.topic.title.ko} 주제 페이지로` : `Go to ${expandedData.topic.title.en} topic`}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {visible.length === 0 && (
                <div className="py-10 text-center text-[13px] text-muted-foreground">
                  {locale === "ko" ? "검색 결과가 없습니다" : "No questions found"}
                </div>
              )}
            </div>

            {hasMore && (
              <div className="mt-5 text-center">
                <button
                  onClick={() => setShowCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-[12px] font-semibold text-navy transition-all hover:shadow-md"
                >
                  <ChevronDown className="h-3 w-3" />
                  {locale === "ko"
                    ? `더 보기 (${Math.min(PAGE_SIZE, filtered.length - showCount)}개 더)`
                    : `Show more (${Math.min(PAGE_SIZE, filtered.length - showCount)} more)`}
                </button>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {visible.length}/{filtered.length.toLocaleString()}
                </div>
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="mt-4 text-center text-[10px] text-muted-foreground">
                {filtered.length.toLocaleString()}{locale === "ko" ? "개 질문 전체 표시" : " questions shown"}
              </div>
            )}
          </div>
        </section>

        {/* -- Force Graph (always visible) -- */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-8 sm:py-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {locale === "ko" ? "질문 연결 구조" : "How questions connect"}
            </div>
            <h2 className="mt-1 text-[1.1rem] font-semibold text-navy sm:text-[1.2rem]">
              {locale === "ko" ? "질문들이 어떻게 연결되는가" : "How questions connect"}
            </h2>
            <div className="mt-4">
              <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                <div className="overflow-x-auto px-4 py-6 sm:px-8 sm:py-8">
                  <div className="min-w-[720px]">
                    <ForceGraph interactive />
                  </div>
                </div>
              </figure>
              <p className="mt-2 text-[11px] text-muted-foreground">{t("explore.hint")}</p>
            </div>
          </div>
        </section>

        {/* -- Bridge -> Research -- */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
            <p
              className="max-w-xl text-[1.05rem] font-semibold leading-snug text-navy sm:text-[1.15rem]"
              style={{ wordBreak: "keep-all" } as React.CSSProperties}
            >
              {locale === "ko"
                ? "데이터를 탐색했다면, 이제 그것이 무엇을 의미하는지 읽어보세요."
                : "You've explored the data. Now read what it means."}
            </p>
            <Link
              href="/research"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-[13px] font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              {t("research.explore.cta.link")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
