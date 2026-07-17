"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { TOPICS, type TopicSlug } from "@/lib/topics";
import { getNode } from "@/lib/ontology";
import { Reveal } from "./reveal";

const TOPIC_BG: Record<TopicSlug, string> = {
  hallyu: "bg-[#F7F9FF]",
  diplomacy: "bg-[#F3F7FC]",
  society: "bg-[#FAFAFA]",
  language: "bg-[#F8FAFD]",
  tourism: "bg-[#F7FBFF]",
  technology: "bg-[#F4F8FF]",
  economy: "bg-[#FAF9F6]",
  history: "bg-[#F8F8FA]",
};

const TOPIC_ICON: Record<TopicSlug, string> = {
  hallyu: "✦",
  diplomacy: "◎",
  society: "◇",
  language: "文",
  tourism: "◉",
  technology: "△",
  economy: "□",
  history: "◌",
};

export function TopicsGrid() {
  const { locale } = useLanguage();

  const ranked = TOPICS.map((topic) => ({
    topic,
    count: topic.concepts.reduce((sum, cid) => sum + (getNode(cid).count ?? 0), 0),
  })).sort((a, b) => b.count - a.count);

  const max = ranked[0].count;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ranked.map(({ topic, count }, i) => (
        <Reveal key={topic.slug} delay={(i % 3) * 0.06} className="h-full">
          <Link
            href={`/topics/${topic.slug}`}
            className={`group flex h-full flex-col rounded-2xl border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] ${TOPIC_BG[topic.slug] ?? "bg-white"}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-lg text-muted-foreground/70">{TOPIC_ICON[topic.slug]}</span>
                <h3 className="text-[1.35rem] font-bold leading-snug text-navy">
                  {topic.title[locale]}
                </h3>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-mono text-[3rem] font-bold tabular-nums leading-none text-navy">
                {count.toLocaleString()}
              </span>
              <span className="text-[15px] font-medium text-muted-foreground">
                {locale === "ko" ? "개 질문" : "questions"}
              </span>
            </div>

            <p
              className="mt-4 flex-1 text-[14.5px] leading-relaxed text-secondary"
              style={{ wordBreak: "keep-all" } as React.CSSProperties}
            >
              {topic.tagline[locale]}
            </p>

            <div className="mt-6">
              <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                {locale === "ko" ? "질문 비중" : "Share of questions"}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-border/40">
                <div
                  className="h-full rounded-full bg-brand/60 transition-all duration-500"
                  style={{ width: `${Math.round((count / max) * 100)}%` }}
                />
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
