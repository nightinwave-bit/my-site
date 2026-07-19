"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PROVENANCE } from "@/lib/ontology";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

export function ResearchIndex() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-14 pt-24 sm:pb-16 sm:pt-28">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "연구" : "Research"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="mt-4 max-w-3xl text-[2.2rem] font-bold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[2.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "질문에서 국��� 이해까���"
                  : "From Questions to National Understanding"}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-4 max-w-2xl text-[16px] leading-relaxed text-secondary sm:text-[17px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "Ask About Korea는 질문을 수집하기 전에 데이터를 검증했고, 검증된 데이터에서 국가별 한국 이�� 패턴을 발견했다."
                  : "Ask About Korea validated its data before collecting questions, then discovered how each country understands Korea from the validated dataset."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[13px] tabular-nums text-secondary">
                <span><strong className="text-navy">{PROVENANCE.canonicalQuestions.toLocaleString()}</strong> {locale === "ko" ? "질문" : "questions"}</span>
                <span><strong className="text-navy">{PROVENANCE.markets}</strong> {locale === "ko" ? "국가" : "markets"}</span>
                <span><strong className="text-navy">{PROVENANCE.languages}</strong> {locale === "ko" ? "언어" : "languages"}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Two Tracks ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1100px] py-12 sm:py-16">

            {/* Mini infographic — pipeline overview */}
            <Reveal>
              <div className="mb-10 flex items-center justify-center gap-2 text-[12px] font-medium text-muted-foreground sm:gap-3 sm:text-[13px]">
                <span className="rounded-md border border-border bg-[#F7F9FD] px-3 py-1.5 text-navy">Google Autocomplete</span>
                <span className="text-brand/40">&rarr;</span>
                <span className="rounded-md border border-border bg-[#F7F9FD] px-3 py-1.5 text-navy">1,540 {locale === "ko" ? "질문" : "Questions"}</span>
                <span className="text-brand/40">&rarr;</span>
                <span className="rounded-md border border-border bg-[#F7F9FD] px-3 py-1.5 text-navy">{locale === "ko" ? "국가 이해" : "National Understanding"}</span>
              </div>
            </Reveal>

            {/* Track cards — side by side on desktop, stacked on mobile */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Track A: 데이터 검증 */}
              <Reveal delay={0.05}>
                <Link
                  href="/method"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-[#F7F9FD] p-6 transition-all hover:border-brand/30 hover:shadow-md sm:p-8"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                    Track A
                  </div>
                  <h2
                    className="mt-3 text-[1.3rem] font-bold leading-snug text-navy sm:text-[1.5rem]"
                    style={{ wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {locale === "ko" ? "데이터 검증" : "Data Validation"}
                  </h2>
                  <p className="mt-2 text-[14px] font-medium text-navy/80" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
                    {locale === "ko"
                      ? "우리는 무엇을 데이터로 사용할 수 있는가?"
                      : "What can we use as data?"}
                  </p>
                  <p
                    className="mt-3 flex-1 text-[14px] leading-relaxed text-secondary"
                    style={{ wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {locale === "ko"
                      ? "Google Autocomplete를 선택한 이유, 국가 선정 기준, 수집 과정, 한계와 보완 방법을 공개한다."
                      : "Why we chose Google Autocomplete, country selection criteria, collection process, limitations and how we addressed them."}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-brand transition-transform group-hover:translate-x-1">
                    {locale === "ko" ? "Method 읽기" : "Read Method"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>

              {/* Track B: 발견과 분석 */}
              <Reveal delay={0.1}>
                <Link
                  href="/research/data-report"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-[#F7F9FD] p-6 transition-all hover:border-[#a9781a]/30 hover:shadow-md sm:p-8"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#a9781a]">
                    Track B
                  </div>
                  <h2
                    className="mt-3 text-[1.3rem] font-bold leading-snug text-navy sm:text-[1.5rem]"
                    style={{ wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {locale === "ko" ? "발견과 분석" : "Findings & Analysis"}
                  </h2>
                  <p className="mt-2 text-[14px] font-medium text-navy/80" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
                    {locale === "ko"
                      ? "세계는 어떤 한국을 질문하는가?"
                      : "What Korea does the world question?"}
                  </p>
                  <p
                    className="mt-3 flex-1 text-[14px] leading-relaxed text-secondary"
                    style={{ wordBreak: "keep-all" } as React.CSSProperties}
                  >
                    {locale === "ko"
                      ? "1,540개의 질문에서 발견한 국가별 한국 이해 방식, 질문 이동 경로, 주제 구조, 인식 패턴을 분석한다."
                      : "Analyzing how each country understands Korea, question migration paths, topic structures, and perception patterns from 1,540 questions."}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#a9781a] transition-transform group-hover:translate-x-1">
                    {locale === "ko" ? "Data Report 읽기" : "Read Data Report"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Why This Research ── */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1100px] py-12 sm:py-14">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("research.why.eyebrow")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p
                className="mt-4 max-w-3xl text-[1.2rem] font-semibold leading-snug text-navy sm:text-[1.4rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {t("research.why.lede")}
              </p>
            </Reveal>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { q: "research.why.autocomplete.q", a: "research.why.autocomplete.a" },
                { q: "research.why.markets.q", a: "research.why.markets.a" },
                { q: "research.why.found.q", a: "research.why.found.a" },
              ].map((it) => (
                <Reveal key={it.q} delay={0.08}>
                  <div className="rounded-xl border border-border bg-white p-5">
                    <h3 className="text-[13px] font-semibold text-brand">{t(it.q)}</h3>
                    <p
                      className="mt-2 text-[14px] font-medium leading-relaxed text-navy"
                      style={{ wordBreak: "keep-all" } as React.CSSProperties}
                    >
                      {t(it.a)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bridge → Explore ── */}
        <section className="border-b border-border bg-white">
          <div className="container flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center sm:py-12">
            <div className="max-w-xl">
              <p
                className="text-[1.1rem] font-semibold leading-snug text-navy sm:text-[1.2rem]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "질문 데이터를 직접 탐색하고 싶다면"
                  : "Want to explore the question data yourself?"}
              </p>
              <p className="mt-1 text-[13px] text-secondary">
                {locale === "ko"
                  ? "1,540개 질문의 구조를 인터랙티브 지도에서 확인하세요."
                  : "See the structure of 1,540 questions on the interactive map."}
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-[13px] font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              {t("explore.cta")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
