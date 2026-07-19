"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, X, ChevronRight, Globe, Database, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getNode, PROVENANCE } from "@/lib/ontology";
import { GRAPH_EDGES } from "@/lib/ontology.generated";
import { TOPICS, getTopic } from "@/lib/topics";
import { MARKETS, marketName } from "@/lib/markets";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";
import { ForceGraph } from "./force-graph";
import allTopicQuestions from "@/lib/topic-questions.generated.json";
import translationData from "@/lib/translations.generated.json";

type L = { ko: string; en: string };

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

function buildOntologyPath(conceptId: string): string[] {
  const path: string[] = [conceptId];
  const themes = GRAPH_EDGES.filter((e) => e.from === conceptId && e.to.startsWith("t_")).map((e) => e.to);
  if (themes.length === 0) return path;
  const themeId = themes[0];
  path.push(themeId);
  const narratives = GRAPH_EDGES.filter((e) => e.from === themeId && e.to.startsWith("n_")).map((e) => e.to);
  if (narratives.length === 0) return path;
  const narrativeId = narratives[0];
  path.push(narrativeId);
  const perceptions = GRAPH_EDGES.filter((e) => e.from === narrativeId && e.to.startsWith("p_")).map((e) => e.to);
  if (perceptions.length === 0) return path;
  path.push(perceptions[0]);
  return path;
}

const PAGE_SIZE = 10;

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

function OntologyPathDisplay({ conceptId, locale }: { conceptId: string; locale: "ko" | "en" }) {
  const path = useMemo(() => buildOntologyPath(conceptId), [conceptId]);
  return (
    <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
      {path.map((nodeId, i) => {
        const node = getNode(nodeId);
        if (!node) return null;
        return (
          <React.Fragment key={nodeId}>
            {i > 0 && <span className="text-brand/40">&rarr;</span>}
            <span className={i === 0 ? "font-medium text-brand" : ""}>
              {node.label[locale]}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function ExploreView() {
  const { t, locale } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const hasActiveFilter = selectedTopic || selectedCountry || selectedLanguage || searchQuery.trim();

  const clearFilters = () => {
    setSelectedTopic(null);
    setSelectedCountry(null);
    setSelectedLanguage(null);
    setSearchQuery("");
    setCurrentPage(1);
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

  const countryQuestionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of ALL_QUESTIONS) {
      for (const c of q.countries) {
        counts[c] = (counts[c] ?? 0) + 1;
      }
    }
    return counts;
  }, []);

  const countryTopTopics = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    for (const q of ALL_QUESTIONS) {
      const topicSlug = topicConceptMap[q.conceptId];
      if (!topicSlug) continue;
      for (const c of q.countries) {
        if (!map[c]) map[c] = {};
        map[c][topicSlug] = (map[c][topicSlug] ?? 0) + 1;
      }
    }
    const result: Record<string, string[]> = {};
    for (const [code, topics] of Object.entries(map)) {
      result[code] = Object.entries(topics)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([slug]) => slug);
    }
    return result;
  }, [topicConceptMap]);

  const countryProfileData = useMemo(() => {
    if (!selectedCountry) return null;
    const qs = ALL_QUESTIONS.filter((q) => q.countries.includes(selectedCountry));
    const uniqueQs = qs.filter((q) => q.countries.length === 1);
    const topQuestions = qs.slice(0, 5);
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
                  ? "질문으로 한국을 탐색하다"
                  : "Explore Korea through questions"}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary sm:text-[16px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "1,540개의 질문을 직접 탐색하는 공간. 국가, 언어, 주제별로 필터링하고, 각 질문의 출처와 연결 구조를 확인하세요."
                  : "A space to explore 1,540 questions directly. Filter by country, language, or topic, and see each question's origin and connections."}
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
                      ? "국가를 선택해 질문을 탐색하세요"
                      : "Select a country to explore its questions"}
                  </h2>
                </Reveal>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {MARKETS.map((m) => {
                    const qCount = countryQuestionCounts[m.code] ?? 0;
                    const topTopics = countryTopTopics[m.code] ?? [];
                    return (
                      <Reveal key={m.code} delay={0.02}>
                        <button
                          onClick={() => { setSelectedCountry(m.code); setCurrentPage(1); }}
                          className="flex w-full flex-col items-start rounded-xl border border-border bg-[#F8FAFF] p-4 text-left transition-all hover:border-brand/30 hover:shadow-md"
                        >
                          <span className="text-[2rem]">{COUNTRY_FLAG[m.code]}</span>
                          <span className="mt-2 text-[14px] font-semibold text-navy">{m.name[locale]}</span>
                          <span className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                            {qCount}{locale === "ko" ? "개 질문" : " questions"}
                          </span>
                          {topTopics.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {topTopics.map((slug) => {
                                const tp = getTopic(slug);
                                if (!tp) return null;
                                return (
                                  <span
                                    key={slug}
                                    className="rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-medium text-brand"
                                  >
                                    {tp.title[locale]}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => { setSelectedCountry(null); setCurrentPage(1); }}
                  className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand hover:underline"
                >
                  <ChevronRight className="h-3 w-3 rotate-180" />
                  {locale === "ko" ? "모든 국가 보기" : "All countries"}
                </button>
                <div className="rounded-2xl border border-brand/20 bg-[#F8FAFF] p-5 sm:p-7">
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

                  {/* Top topics for this country */}
                  {(() => {
                    const topTopics = countryTopTopics[selectedCountry] ?? [];
                    if (topTopics.length === 0) return null;
                    return (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {topTopics.map((slug) => {
                          const tp = getTopic(slug);
                          if (!tp) return null;
                          return (
                            <span
                              key={slug}
                              className="rounded-full border border-brand/15 bg-white px-3 py-1 text-[12px] font-medium text-brand"
                            >
                              {tp.title[locale]}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Representative questions */}
                  {countryProfileData && countryProfileData.topQuestions.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {locale === "ko" ? "대표 질문" : "Top questions"}
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
                  ? "전체 질문 목록"
                  : "Full question list"}
              </h2>
            </Reveal>

            {/* Search */}
            <div className="mt-5 space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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
                  onClick={() => { setSelectedTopic(null); setCurrentPage(1); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedTopic ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "전체 주제" : "All topics"}
                </button>
                {TOPICS.map((tp) => (
                  <button
                    key={tp.slug}
                    onClick={() => { setSelectedTopic(selectedTopic === tp.slug ? null : tp.slug); setCurrentPage(1); }}
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
                  onClick={() => { setSelectedCountry(null); setCurrentPage(1); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedCountry ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 국가" : "All countries"}
                </button>
                {countriesInData.map((code) => (
                  <button
                    key={code}
                    onClick={() => { setSelectedCountry(selectedCountry === code ? null : code); setCurrentPage(1); }}
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
                  onClick={() => { setSelectedLanguage(null); setCurrentPage(1); }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    !selectedLanguage ? "bg-navy text-white" : "bg-white text-secondary hover:bg-navy/5"
                  }`}
                >
                  {locale === "ko" ? "모든 언어" : "All languages"}
                </button>
                {languagesInData.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLanguage(selectedLanguage === lang ? null : lang); setCurrentPage(1); }}
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
                          <span className="inline-flex items-center gap-0.5 text-[9px] tabular-nums text-muted-foreground">
                            <Globe className="h-2.5 w-2.5" />
                            {q.countries.length}{locale === "ko" ? "개국" : " countries"}
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
                        {/* Ontology path */}
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                            {locale === "ko" ? "온톨로지 경로" : "Ontology path"}
                          </div>
                          <div className="mt-1.5">
                            <OntologyPathDisplay conceptId={expandedData.q.conceptId} locale={locale} />
                          </div>
                        </div>

                        {/* Country distribution */}
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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
                              {locale === "ko" ? `같은 개념의 질문 (${expandedData.relatedQuestions.length}개)` : `Same concept (${expandedData.relatedQuestions.length})`}
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
                            {locale === "ko" ? `${expandedData.topic.title.ko} 주제 페이지` : `${expandedData.topic.title.en} topic page`}
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

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); setExpandedQuestion(null); }}
                    disabled={safePage <= 1}
                    className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-[12px] font-medium text-secondary transition-colors hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-white"
                  >
                    {locale === "ko" ? "이전" : "Prev"}
                  </button>
                  {(() => {
                    const pages: (number | "...")[] = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      if (safePage > 3) pages.push("...");
                      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
                      if (safePage < totalPages - 2) pages.push("...");
                      pages.push(totalPages);
                    }
                    return pages.map((p, i) =>
                      p === "..." ? (
                        <span key={`dot-${i}`} className="px-1 text-[12px] text-muted-foreground">...</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setCurrentPage(p); setExpandedQuestion(null); }}
                          className={`min-w-[32px] rounded-lg px-2 py-1.5 text-[12px] font-medium transition-colors ${
                            p === safePage
                              ? "bg-brand text-white"
                              : "border border-border bg-white text-secondary hover:bg-navy/5"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    );
                  })()}
                  <button
                    onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); setExpandedQuestion(null); }}
                    disabled={safePage >= totalPages}
                    className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-[12px] font-medium text-secondary transition-colors hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-white"
                  >
                    {locale === "ko" ? "다음" : "Next"}
                  </button>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} / {filtered.length.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* -- Force Graph (always visible) -- */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1280px] py-8 sm:py-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {locale === "ko" ? "질문 연결 구조" : "Question connection structure"}
            </div>
            <h2 className="mt-1 text-[1.1rem] font-semibold text-navy sm:text-[1.2rem]">
              {locale === "ko" ? "질문은 어떻게 연결되는가" : "How questions connect"}
            </h2>
            <p className="mt-1 text-[12px] text-muted-foreground" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
              {locale === "ko"
                ? "각 질문은 개념 → 주제 → 서사 → 인식의 경로를 따라 연결됩니다."
                : "Each question connects along a path: Concept → Theme → Narrative → Perception."}
            </p>

            {/* Visual flow example */}
            <div className="mt-4 rounded-xl border border-border bg-[#F8FAFF] p-4 sm:p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {locale === "ko" ? "연결 예시" : "Example path"}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
                <span className="rounded-md border border-brand/20 bg-white px-2.5 py-1 font-medium text-navy">
                  {locale === "ko" ? "K-팝은 왜 인기가 많을까?" : "Why is K-pop so popular?"}
                </span>
                <span className="text-brand/50">&rarr;</span>
                <span className="rounded-md bg-brand/8 px-2 py-0.5 font-medium text-brand">
                  {locale === "ko" ? "K-팝과 아이돌" : "K-Pop & Idols"}
                </span>
                <span className="text-brand/50">&rarr;</span>
                <span className="rounded-md bg-brand/5 px-2 py-0.5 text-secondary">
                  {locale === "ko" ? "한류" : "Hallyu"}
                </span>
                <span className="text-brand/50">&rarr;</span>
                <span className="rounded-md bg-brand/5 px-2 py-0.5 text-secondary">
                  {locale === "ko" ? "문화 강국" : "Global cultural force"}
                </span>
                <span className="text-brand/50">&rarr;</span>
                <span className="rounded-md bg-navy/5 px-2 py-0.5 font-medium text-navy">
                  {locale === "ko" ? "문화 강국, 한국" : "Korea as cultural powerhouse"}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
                <span>{locale === "ko" ? "질문" : "Question"}</span>
                <span>&rarr; {locale === "ko" ? "개념" : "Concept"}</span>
                <span>&rarr; {locale === "ko" ? "주제" : "Theme"}</span>
                <span>&rarr; {locale === "ko" ? "서사" : "Narrative"}</span>
                <span>&rarr; {locale === "ko" ? "인식" : "Perception"}</span>
              </div>
            </div>

            <div className="mt-5">
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
                ? "이 질문들이 무엇을 보여주는지 궁금하다면"
                : "Curious what these questions reveal?"}
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
