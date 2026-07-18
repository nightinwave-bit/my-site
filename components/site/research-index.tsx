"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS } from "@/lib/research";
import { PROVENANCE } from "@/lib/ontology";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

const PHASE_LABELS = [
  { ko: "발견", en: "Discovery" },
  { ko: "해석", en: "Interpretation" },
  { ko: "모델", en: "Model" },
  { ko: "관찰", en: "Observation" },
];

export function ResearchIndex() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero — journey framing ── */}
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
                  ? "질문에서 국가 이해까지"
                  : "From Questions to National Understanding"}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-4 max-w-2xl text-[16px] leading-relaxed text-secondary sm:text-[17px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "1,540개의 질문은 데이터로 끝나지 않는다. 우리는 질문을 발견하고, 그 의미를 해석하고, 이해 구조를 설계하고, 미래의 질문을 관찰한다."
                  : "1,540 questions do not end as data. We discover questions, interpret their meaning, design understanding structures, and observe future questions."}
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

        {/* ── Journey Flow — visual pipeline ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[900px] py-12 sm:py-14">
            <Reveal>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                {PHASE_LABELS.map((p, i) => (
                  <React.Fragment key={p.en}>
                    <div className="rounded-lg border border-border bg-[#F7F9FD] px-5 py-2.5 text-center">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-0.5 text-[15px] font-bold text-navy">
                        {p[locale]}
                      </div>
                    </div>
                    {i < PHASE_LABELS.length - 1 && (
                      <>
                        <ArrowDown className="h-3.5 w-3.5 text-brand/40 sm:hidden" />
                        <ArrowRight className="hidden h-3.5 w-3.5 text-brand/40 sm:block" />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Four Research Documents ── */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1100px] py-12 sm:py-14">
            <div className="space-y-0">
              {RESEARCH_DOCS.map((doc, i) => (
                <Reveal key={doc.slug} delay={i * 0.06}>
                  <div className="relative">
                    {i < RESEARCH_DOCS.length - 1 && (
                      <div className="absolute bottom-0 left-6 top-full z-0 w-px bg-border sm:left-8" style={{ height: "24px" }} />
                    )}

                    <Link
                      href={`/research/${doc.slug}`}
                      className="group relative z-10 mb-6 block rounded-2xl border border-border bg-white p-6 transition-all hover:border-[color:var(--accent)]/30 hover:shadow-md sm:p-8"
                      style={{ ["--accent" as string]: doc.accent } as React.CSSProperties}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-[13px] font-bold text-white sm:h-11 sm:w-11" style={{ backgroundColor: doc.accent }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: doc.accent }}>
                            {PHASE_LABELS[i][locale]}
                          </div>
                          <h3
                            className="mt-0.5 text-xl font-bold leading-snug text-navy sm:text-2xl"
                            style={{ wordBreak: "keep-all" } as React.CSSProperties}
                          >
                            {doc.title[locale]}
                          </h3>
                        </div>
                        <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" style={{ color: doc.accent }} />
                      </div>

                      <p
                        className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary"
                        style={{ wordBreak: "keep-all" } as React.CSSProperties}
                      >
                        {doc.oneLine[locale]}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-[12px]">
                        <span className="text-muted-foreground">
                          {doc.audience[locale]}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5" style={{ color: doc.accent }}>
                          {locale === "ko" ? "읽기" : "Read"} <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why This Research ── */}
        <section className="border-b border-border bg-white">
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
                  <div className="rounded-xl border border-border bg-[#F3F6FB] p-5">
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
        <section className="border-b border-border bg-[#F3F6FB]">
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
