"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ForceGraph } from "./force-graph";

export function ExplorePreview() {
  const { locale } = useLanguage();

  return (
    <section id="explore" className="scroll-mt-20 border-b border-border bg-[#eef3fb]">
      <div className="container py-28 sm:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">
              {locale === "ko" ? "질문 지도" : "The question map"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-6 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {locale === "ko"
                ? "서로 다른 질문은 어디서 만날까?"
                : "Where do different questions meet?"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-secondary">
              {locale === "ko"
                ? "흩어진 질문이 하나의 한국 이미지로 수렴하는 구조를 직접 탐색하세요."
                : "Explore how scattered questions converge into a single image of Korea."}
            </p>
          </Reveal>
        </div>

        {/* the map — visualization is the hero */}
        <Reveal delay={0.1} className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto py-4 sm:py-8">
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
