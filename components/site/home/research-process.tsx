"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { RESEARCH_DOCS } from "@/lib/research";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

const STAGE_SUB: Record<string, L> = {
  "data-report": D("무엇이 보이는가", "What is there"),
  "diplomacy-brief": D("그것은 무엇을 의미하는가", "What it means"),
  "understanding-model": D("어떻게 이해가 만들어지는가", "How understanding forms"),
  "question-observatory": D("앞으로 무엇이 바뀌는가", "What changes next"),
};

export function ResearchProcess() {
  const { locale } = useLanguage();
  const docs = [...RESEARCH_DOCS].sort((a, b) => a.rung - b.rung);

  return (
    <section id="research" className="scroll-mt-20 border-b border-border bg-white">
      <div className="container py-28 sm:py-36">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "리서치" : "Research"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy [text-wrap:balance] sm:text-[2.4rem]">
                {locale === "ko"
                  ? "질문을 데이터로 끝내지 않았습니다."
                  : "We did not stop at the data."}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {locale === "ko"
                  ? "같은 1,540개의 질문을 네 단계로 읽습니다 — 발견에서 해석으로, 해석에서 모델로, 그리고 미래의 질문을 관찰하는 것으로."
                  : "The same 1,540 questions, read through four stages — from discovery to interpretation, from interpretation to model, and on to observing future questions."}
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
          <div
            className="pointer-events-none absolute left-0 right-0 top-[19px] hidden h-[2px] bg-brand lg:block"
            aria-hidden
          />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {docs.map((doc, i) => (
              <Reveal key={doc.slug} delay={i * 0.08}>
                <Link href={`/research/${doc.slug}`} className="group block h-full">
                  <div className="relative flex items-center gap-3 lg:block">
                    <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand bg-white font-mono text-[14px] font-bold tabular-nums text-brand">
                      {String(doc.rung).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 flex h-[calc(100%-3.5rem)] flex-col rounded-xl border border-border bg-[#f7f9fc] p-5 transition-all duration-200 group-hover:translate-y-[-2px] group-hover:shadow-md">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {STAGE_SUB[doc.slug]?.[locale]}
                    </div>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-navy">
                      {doc.title[locale]}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">
                      {doc.oneLine[locale]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      {locale === "ko" ? "읽기" : "Read"}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
