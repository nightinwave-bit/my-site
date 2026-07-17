"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS, type ResearchDocMeta } from "@/lib/research";
import { PROVENANCE, getNode } from "@/lib/ontology";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal } from "./reveal";

const FINDINGS: { ko: string; en: string }[] = [
  { ko: "문화는 가장 큰 입구였다.", en: "Culture was the biggest gateway." },
  { ko: "언어는 가장 지속적인 관심사였다.", en: "Language was the most persistent interest." },
  { ko: "국가마다 다른 한국을 질문했다.", en: "Each country questioned a different Korea." },
  { ko: "관심은 많지만, 이해는 아직 부족했다.", en: "Attention is high, but understanding is still shallow." },
];

const PROCESS_META: Record<string, {
  step: { ko: string; en: string };
  insight: { ko: string; en: string };
  preview: React.FC<{ locale: "ko" | "en" }>;
}> = {
  "data-report": {
    step: { ko: "무엇이 보이는가", en: "What is there?" },
    insight: {
      ko: "1,540개 질문은 하나의 한국이 아니라 여러 개의 한국을 보여준다.",
      en: "1,540 questions reveal not one Korea, but many.",
    },
    preview: ({ locale }) => (
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {locale === "ko" ? "최다 주제" : "Top topic"}
          </span>
          <span className="text-[13px] font-bold tabular-nums text-navy">332</span>
        </div>
        <div className="text-[15px] font-semibold text-navy">
          {locale === "ko" ? "한류" : "Hallyu"}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border/40">
          <div className="h-full rounded-full bg-[#1f5fd6]/60" style={{ width: "72%" }} />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{locale === "ko" ? "질문" : "questions"}</span>
          <span>332 / 1,540</span>
        </div>
      </div>
    ),
  },
  "diplomacy-brief": {
    step: { ko: "그것은 무엇을 의미하는가", en: "So what does it mean?" },
    insight: {
      ko: "국가마다 전혀 다른 한국을 질문한다.",
      en: "Each country asks about a completely different Korea.",
    },
    preview: ({ locale }) => (
      <div className="space-y-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {locale === "ko" ? "독일의 관심사" : "Germany's focus"}
        </div>
        {[
          { label: locale === "ko" ? "언어" : "Language", pct: 34 },
          { label: locale === "ko" ? "기술" : "Technology", pct: 22 },
          { label: locale === "ko" ? "역사" : "History", pct: 18 },
        ].map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-10 shrink-0 text-right text-[11px] font-medium text-navy">{d.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/40">
              <div className="h-full rounded-full bg-[#2f6f62]/60" style={{ width: `${d.pct}%` }} />
            </div>
            <span className="w-7 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground">{d.pct}%</span>
          </div>
        ))}
      </div>
    ),
  },
  "framework-paper": {
    step: { ko: "그래서 무엇을 바꿔야 하는가", en: "What needs to change?" },
    insight: {
      ko: "질문은 검색을 넘어 국가 이미지를 만든다.",
      en: "Questions go beyond search — they shape national image.",
    },
    preview: ({ locale }) => {
      const steps = locale === "ko"
        ? ["질문", "개념", "주제", "서사", "인식"]
        : ["Question", "Concept", "Theme", "Narrative", "Perception"];
      return (
        <div className="flex items-center justify-between gap-1">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                i === steps.length - 1 ? "bg-navy text-white" : "bg-border/50 text-navy"
              }`}>{s}</span>
              {i < steps.length - 1 && <ArrowRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/50" />}
            </React.Fragment>
          ))}
        </div>
      );
    },
  },
  "question-commons": {
    step: { ko: "누가 답할 것인가", en: "Who answers?" },
    insight: {
      ko: "답변자는 정부가 아니라 시민일 수 있다.",
      en: "The answerer might be citizens, not governments.",
    },
    preview: ({ locale }) => {
      const steps = locale === "ko"
        ? ["질문", "시민", "답변", "지식 커먼즈"]
        : ["Question", "Citizen", "Answer", "Knowledge Commons"];
      return (
        <div className="flex flex-col gap-1">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                i === steps.length - 1 ? "bg-[#12886a]/10 text-[#12886a]" : "text-navy"
              }`}>{s}</span>
              {i < steps.length - 1 && (
                <span className="pl-2 text-[10px] text-muted-foreground/50">↓</span>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    },
  },
};

const PHASE_LABELS = [
  { ko: "발견", en: "Discovery" },
  { ko: "전략", en: "Strategy" },
  { ko: "이론", en: "Theory" },
  { ko: "실행 모델", en: "Implementation" },
];

export function ResearchIndex() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="border-b border-border" style={{ background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-12 pt-24 sm:pb-14 sm:pt-28">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {t("research.eyebrow")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="mt-4 max-w-3xl text-[2.2rem] font-bold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[2.8rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "질문 데이터를 연구로 바꾸는 과정"
                  : "Turning question data into research"}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-4 max-w-2xl text-[16px] leading-relaxed text-secondary sm:text-[17px]"
                style={{ wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "1,540개의 실제 질문을 수집하고, 해석하고, 프레임워크를 만들고, 시민 참여로 연결합니다."
                  : "We collected 1,540 real questions, interpreted them, built frameworks, and connected them to civic participation."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[13px] tabular-nums text-secondary">
                <span><strong className="text-navy">{PROVENANCE.canonicalQuestions.toLocaleString()}</strong> {locale === "ko" ? "질문" : "questions"}</span>
                <span><strong className="text-navy">{PROVENANCE.markets}</strong> {locale === "ko" ? "국가" : "markets"}</span>
                <span><strong className="text-navy">{PROVENANCE.languages}</strong> {locale === "ko" ? "언어" : "languages"}</span>
                <span className="text-muted-foreground">{PROVENANCE.method}</span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/method"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-secondary transition-colors hover:text-navy"
              >
                {t("research.method")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Research Pipeline ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1100px] py-12 sm:py-14">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "연구 파이프라인" : "Research pipeline"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.3rem] font-semibold leading-[1.3] text-navy sm:text-[1.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "하나의 질문이 연구가 되기까지"
                  : "From a single question to published research"}
              </h2>
            </Reveal>

            {/* Pipeline flow — real example */}
            <div className="mt-8">
              <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
                {[
                  { label: locale === "ko" ? "실제 질문" : "Real question", value: "Why is K-pop so popular?", accent: false },
                  { label: locale === "ko" ? "개념" : "Concept", value: locale === "ko" ? "K-팝과 아이돌" : "K-Pop & Idols", accent: false },
                  { label: locale === "ko" ? "주제" : "Theme", value: locale === "ko" ? "한류" : "Hallyu", accent: false },
                  { label: locale === "ko" ? "서사" : "Narrative", value: locale === "ko" ? "문화 강국" : "Cultural force", accent: false },
                  { label: locale === "ko" ? "인식" : "Perception", value: locale === "ko" ? "문화 강국, 한국" : "Cultural powerhouse", accent: true },
                ].map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <Reveal delay={i * 0.06} className="flex-1">
                      <div className={`flex h-full flex-col rounded-xl border px-3 py-3 ${
                        step.accent ? "border-navy bg-navy" : "border-border bg-[#F7F9FD]"
                      }`}>
                        <div className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${
                          step.accent ? "text-brand-hi" : "text-muted-foreground"
                        }`}>{step.label}</div>
                        <div className={`mt-1 text-[12px] font-medium leading-snug ${
                          step.accent ? "text-white" : "text-navy"
                        }`}>{step.value}</div>
                      </div>
                    </Reveal>
                    {i < arr.length - 1 && (
                      <div className="flex shrink-0 items-center justify-center py-1 sm:px-1 sm:py-0" aria-hidden>
                        <ArrowDown className="h-3 w-3 text-muted-foreground/50 sm:hidden" />
                        <ArrowRight className="hidden h-3 w-3 text-muted-foreground/50 sm:block" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <Reveal delay={0.35}>
                <div className="mt-3 text-center text-[11px] text-muted-foreground">
                  {locale === "ko"
                    ? "이 과정이 1,540개의 질문 전체에 적용됩니다"
                    : "This process is applied to all 1,540 questions"}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Key Findings ── */}
        <section className="border-b border-border bg-[#F3F6FB]">
          <div className="container max-w-[1100px] py-12 sm:py-14">
            <Reveal>
              <h2
                className="text-[1.3rem] font-semibold leading-[1.3] text-navy sm:text-[1.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko" ? "우리는 무엇을 발견했는가?" : "What did we find?"}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FINDINGS.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-white px-5 py-4">
                    <span className="mt-0.5 font-mono text-[1.4rem] font-bold leading-none text-brand/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-[15px] font-semibold leading-snug text-navy"
                      style={{ wordBreak: "keep-all" } as React.CSSProperties}
                    >
                      {f[locale]}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Research Process: 4 Steps ── */}
        <section className="border-b border-border bg-white">
          <div className="container max-w-[1100px] py-12 sm:py-14">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "연구 과정" : "Research process"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-3 text-[1.3rem] font-semibold leading-[1.3] text-navy sm:text-[1.5rem]"
                style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
              >
                {locale === "ko"
                  ? "질문을 읽는 네 단계"
                  : "Four steps of reading questions"}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-0">
              {RESEARCH_DOCS.map((doc, i) => {
                const meta = PROCESS_META[doc.slug];
                const PreviewComponent = meta?.preview;
                return (
                  <Reveal key={doc.slug} delay={i * 0.06}>
                    <div className="relative">
                      {/* Connector line */}
                      {i < RESEARCH_DOCS.length - 1 && (
                        <div className="absolute bottom-0 left-6 top-full z-0 w-px bg-border sm:left-8" style={{ height: "24px" }} />
                      )}

                      <Link
                        href={`/research/${doc.slug}`}
                        className="group relative z-10 mb-6 grid gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-[color:var(--accent)]/30 hover:shadow-md sm:grid-cols-[1fr_200px] sm:p-6"
                        style={{ ["--accent" as string]: doc.accent } as React.CSSProperties}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[13px] font-bold text-white sm:h-9 sm:w-9" style={{ backgroundColor: doc.accent }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <div className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: doc.accent }}>
                                {PHASE_LABELS[i][locale]}
                              </div>
                              <h3 className="text-[1.1rem] font-semibold text-navy sm:text-[1.2rem]">
                                {doc.title[locale]}
                              </h3>
                            </div>
                          </div>

                          <p className="mt-2 text-[12px] font-medium text-muted-foreground">
                            {meta?.step[locale]}
                          </p>

                          <p
                            className="mt-3 text-[15px] font-semibold leading-snug text-navy"
                            style={{ wordBreak: "keep-all" } as React.CSSProperties}
                          >
                            {meta?.insight[locale]}
                          </p>

                          <div className="mt-3 flex items-center gap-4 text-[12px]">
                            <span className="text-muted-foreground">
                              {t("research.audience")}: {doc.audience[locale]}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5" style={{ color: doc.accent }}>
                              {t("research.read")} <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>

                        {/* Data preview */}
                        {PreviewComponent && (
                          <div className="rounded-xl border border-border/60 bg-[#F8FAFF] p-4">
                            <PreviewComponent locale={locale} />
                          </div>
                        )}
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
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
