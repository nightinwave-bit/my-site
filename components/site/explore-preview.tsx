"use client";

import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ForceGraph } from "./force-graph";

export function ExplorePreview() {
  const { locale } = useLanguage();

  return (
    <section id="explore" className="scroll-mt-20 border-b border-border bg-[#F3F7FF]">
      <div className="container py-28 sm:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
              {locale === "ko" ? "질문 지도" : "The question map"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 whitespace-pre-line text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
              {locale === "ko" ? "서로 다른 질문은\n어디서 만날까?" : "Where do different\nquestions meet?"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-[17px] leading-relaxed text-secondary">
              {locale === "ko"
                ? "질문은 개념을 만들고, 개념은 주제를 만들고, 주제는 서사를 만들고, 서사는 국가 인식을 만듭니다. 흩어진 질문들이 하나의 한국 이미지로 수렴하는 구조를 직접 탐색하세요."
                : "Questions form concepts, concepts form themes, themes form narratives, and narratives form a national perception. Explore how scattered questions converge into a single image of Korea."}
            </p>
          </Reveal>
        </div>

        {/* the map — the site's central asset, given real room */}
        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-2xl">
            <div className="overflow-x-auto px-4 py-8 sm:px-10 sm:py-12">
              <div className="mx-auto min-w-[760px] max-w-5xl">
                <ForceGraph interactive={false} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Link
              href="/explore"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hi"
            >
              <Network className="h-4 w-4" />
              {locale === "ko" ? "질문 지도 탐색하기" : "Explore the question map"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
