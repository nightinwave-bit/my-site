"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { TopicsGrid } from "./topics-grid";
import { ProvenanceStrip } from "./provenance-strip";
import { Reveal } from "./reveal";

export function TopicsIndex() {
  const { locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border">
          <div className="container pb-14 pt-28 sm:pt-32">
            <div className="max-w-2xl">
              <Reveal>
                <div className="mb-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  <span className="h-px w-6 bg-brand/50" />
                  {locale === "ko" ? "주제로 둘러보기" : "Browse by topic"}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-[2.75rem]"
                  style={{ textWrap: "balance", wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko"
                    ? "세계는 한국의 무엇을 궁금해할까?"
                    : "What does the world ask about Korea?"}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p
                  className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary sm:text-lg"
                  style={{ wordBreak: "keep-all" } as React.CSSProperties}
                >
                  {locale === "ko"
                    ? "1,540개의 실제 질문을 분석한 결과, 세계는 한국을 8개의 주요 주제를 통해 이해하고 있었습니다."
                    : "Analyzing 1,540 real questions, we found the world understands Korea through eight major topics."}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="container py-14 sm:py-20">
            <TopicsGrid />
            <ProvenanceStrip className="mt-14" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
