"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { PROVENANCE } from "@/lib/ontology";
import { MARKETS } from "@/lib/markets";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

const WHY: { q: L; a: L }[] = [
  {
    q: D("왜 Google인가?", "Why Google?"),
    a: D(
      "사람들은 공식 설문조사보다 검색창에 더 솔직하다. 자동완성은 실제로 입력되는 질문의 실시간 신호다.",
      "People are more honest with a search box than with a survey. Autocomplete is a live signal of what is actually typed.",
    ),
  },
  {
    q: D("왜 8개 국가인가?", "Why eight countries?"),
    a: D(
      "‘세계 평균’은 존재하지 않는다. 문화적으로 다른 8개 시장을 나누어 보아야 서로 다른 한국이 드러난다.",
      "There is no “global average.” Only by separating eight distinct markets do the different Koreas appear.",
    ),
  },
  {
    q: D("왜 질문 데이터인가?", "Why questions?"),
    a: D(
      "답이 아니라 질문이 이해의 공백을 드러낸다. 무엇을 묻는지가 곧 아직 무엇을 이해하지 못했는지다.",
      "It is the question, not the answer, that exposes a gap in understanding. What is asked is what is not yet understood.",
    ),
  },
];

export function DatasetSection() {
  const { locale } = useLanguage();

  const stats: { value: string; label: L }[] = [
    { value: PROVENANCE.rawQueries.toLocaleString(), label: D("수집된 원본 쿼리", "raw queries collected") },
    { value: PROVENANCE.canonicalQuestions.toLocaleString(), label: D("정규화 질문", "normalized questions") },
    { value: String(PROVENANCE.markets), label: D("시장", "markets") },
    { value: String(PROVENANCE.languages), label: D("언어", "languages") },
  ];

  return (
    <section id="dataset" className="scroll-mt-20 border-b border-border bg-navy text-white">
      <div className="container py-28 sm:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-hi">
              {locale === "ko" ? "데이터셋" : "The dataset"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 whitespace-pre-line text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-white sm:text-[2.4rem]">
              {locale === "ko"
                ? "질문이 무엇을 뜻하는지 읽기 전에,\n우리는 먼저 질문을 수집했습니다."
                : "Before reading what the questions mean,\nwe first collected them."}
            </h2>
          </Reveal>
        </div>

        {/* big stat row */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.06}>
              <div>
                <div className="font-mono text-[3rem] font-semibold tabular-nums leading-none text-white sm:text-[4.2rem]">
                  {s.value}
                </div>
                <div className="mt-3 text-[13px] font-medium uppercase tracking-[0.1em] text-white/55">
                  {s.label[locale]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/60">
            <span className="font-semibold uppercase tracking-[0.1em] text-white/45">
              {locale === "ko" ? "수집 기반" : "Source"}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-white/85">Google Autocomplete</span>
            <span className="text-white/25">·</span>
            {MARKETS.map((m, i) => (
              <span key={m.code} className="inline-flex items-center gap-2">
                {m.name[locale]}
                {i < MARKETS.length - 1 && <span className="text-white/25" aria-hidden>·</span>}
              </span>
            ))}
          </div>
        </Reveal>

        {/* three why blocks */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.q.en} delay={0.1 + i * 0.06} className="h-full">
              <div className="flex h-full flex-col bg-navy p-7">
                <h3 className="text-[15px] font-semibold text-brand-hi">{w.q[locale]}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{w.a[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/method"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hi transition-colors hover:text-white"
          >
            {locale === "ko" ? "수집 방법과 한계 자세히 보기" : "How it was collected, and its limits"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
