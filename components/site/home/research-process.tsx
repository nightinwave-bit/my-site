"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS } from "@/lib/research";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

// One research process, four stages — not four cards.
const STAGE_SUB: Record<string, L> = {
  "data-report": D("무엇이 보이는가", "What is there"),
  "diplomacy-brief": D("그것은 무엇을 의미하는가", "What it means"),
  "framework-paper": D("그래서 무엇을 바꿔야 하는가", "What must change"),
  "question-commons": D("누가 답할 것인가", "Who answers"),
};

export function ResearchProcess() {
  const { locale } = useLanguage();
  const docs = [...RESEARCH_DOCS].sort((a, b) => a.rung - b.rung);

  return (
    <section id="research" className="scroll-mt-20 border-b border-border bg-[#FAFAFA]">
      <div className="container py-28 sm:py-36">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "리서치" : "Research"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 whitespace-pre-line text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
                {locale === "ko"
                  ? "질문을 데이터로\n끝내지 않았습니다."
                  : "We did not stop\nat the data."}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {locale === "ko"
                  ? "같은 1,540개의 질문을 네 단계로 읽습니다 — 관찰에서 해석으로, 해석에서 제도로, 그리고 누가 답할 것인가로."
                  : "The same 1,540 questions, read through four stages — from observation to interpretation, from interpretation to institutions, and finally to who answers."}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/research"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {locale === "ko" ? "리서치 전체 보기" : "All research"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* connected 4-stage process */}
        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-[2px] bg-border-strong lg:block" aria-hidden />
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {docs.map((doc, i) => (
              <Reveal key={doc.slug} delay={i * 0.08}>
                <Link href={`/research/${doc.slug}`} className="group block">
                  <div className="relative flex items-center gap-3 lg:block">
                    <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand bg-white font-mono text-[13px] font-bold tabular-nums text-brand">
                      {String(doc.rung).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4 lg:pr-4">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {STAGE_SUB[doc.slug]?.[locale]}
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug text-navy group-hover:text-brand">
                      {doc.title[locale]}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                      {doc.oneLine[locale]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
                      {locale === "ko" ? "읽기" : "Read"}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
