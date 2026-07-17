"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { TOPICS } from "@/lib/topics";
import { getNode } from "@/lib/ontology";
import { Reveal } from "../reveal";

// Topics as a demand ranking: the number of real questions comes first.
export function WorldCuriosity() {
  const { locale } = useLanguage();

  const ranked = TOPICS.map((topic) => ({
    topic,
    count: topic.concepts.reduce((sum, cid) => sum + (getNode(cid).count ?? 0), 0),
  })).sort((a, b) => b.count - a.count);

  const max = ranked[0].count;

  // Subtle differentiation within a single blue / navy / grey family — no rainbow.
  const BAR: Record<string, string> = {
    hallyu: "bg-brand",
    diplomacy: "bg-navy",
    society: "bg-muted-foreground/50",
    language: "bg-brand/45",
    tourism: "bg-brand/70",
    history: "bg-navy/55",
    economy: "bg-muted-foreground/35",
    technology: "bg-brand/55",
  };

  return (
    <section id="topics" className="scroll-mt-20 border-b border-border">
      <div className="container py-28 sm:py-36">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">
                {locale === "ko" ? "세계는 무엇을 궁금해하는가" : "What the world is curious about"}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 whitespace-pre-line text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
                {locale === "ko" ? "세계는 한국의 무엇을\n궁금해할까?" : "What does the world\nwant to know about Korea?"}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {locale === "ko"
                  ? "세계가 한국에 대해 묻는 질문을 여덟 개의 주제로 나눴습니다. 질문이 많은 순서입니다."
                  : "The questions the world asks about Korea, grouped into eight topics — ordered by how much each is asked."}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/topics"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {locale === "ko" ? "모든 주제 보기" : "All topics"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-border">
          {ranked.map(({ topic, count }, i) => (
            <Reveal key={topic.slug} delay={(i % 8) * 0.04}>
              <Link
                href={`/topics/${topic.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-b border-border py-6 transition-colors hover:bg-tint sm:gap-x-8"
              >
                <div className="w-[5.5rem] sm:w-36">
                  <div className="font-mono text-[2.5rem] font-semibold tabular-nums leading-[0.95] text-navy sm:text-[3.4rem]">
                    {count.toLocaleString()}
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {locale === "ko" ? "질문" : "questions"}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold text-navy sm:text-[1.35rem]">{topic.title[locale]}</h3>
                  </div>
                  <p className="mt-1.5 truncate text-[14px] text-secondary">{topic.tagline[locale]}</p>
                  {/* thin demand bar — same family, shade differs by topic */}
                  <div className="mt-3.5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-border/70">
                    <div
                      className={"h-full rounded-full " + (BAR[topic.slug] ?? "bg-brand/70")}
                      style={{ width: `${Math.round((count / max) * 100)}%` }}
                    />
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
