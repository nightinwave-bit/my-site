"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

const STEPS: { label: L; desc: L; terminal?: boolean }[] = [
  {
    label: D("질문", "Question"),
    desc: D("실제 검색 질문", "Real search queries"),
  },
  {
    label: D("개념", "Concept"),
    desc: D("반복되는 관심사", "Recurring interests"),
  },
  {
    label: D("주제", "Theme"),
    desc: D("탐색 영역", "Fields of exploration"),
  },
  {
    label: D("서사", "Narrative"),
    desc: D("연결된 이야기", "Connected stories"),
  },
  {
    label: D("인식", "Perception"),
    desc: D("국가 이미지", "National image"),
    terminal: true,
  },
];

export function QuestionToPerception() {
  const { locale } = useLanguage();
  return (
    <section className="bg-white">
      <div className="container py-28 sm:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">
              {locale === "ko"
                ? "질문은 어떻게 인식이 되는가"
                : "How a question becomes a perception"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-6 text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]"
              style={{ textWrap: "balance" }}
            >
              {locale === "ko"
                ? "하나의 질문은 다섯 단계를 지나 국가 이미지가 됩니다"
                : "A single question travels five steps to become a national image."}
            </h2>
          </Reveal>
        </div>

        {/* ── Flow diagram ── */}

        {/* Desktop: horizontal node + connector flow */}
        <div className="mt-16 hidden md:block">
          <div className="flex items-start">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 0.07} className="contents">
                {/* Node */}
                <div className="flex flex-col items-center" style={{ width: 0, flex: "1 1 0%" }}>
                  <div
                    className={
                      "flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold tabular-nums " +
                      (s.terminal
                        ? "bg-navy text-white"
                        : "border-2 border-navy/20 bg-white text-navy")
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="mt-3 text-[15px] font-semibold text-navy">
                    {s.label[locale]}
                  </span>
                  <span className="mt-1 text-[13px] text-secondary">
                    {s.desc[locale]}
                  </span>
                </div>

                {/* Connector line between nodes */}
                {i < STEPS.length - 1 && (
                  <div className="relative mt-7 flex flex-1 items-center" style={{ minWidth: 24 }}>
                    <div className="h-px w-full bg-navy/20" />
                    <svg
                      className="absolute -right-[5px] top-1/2 -translate-y-1/2 text-navy/20"
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 0 L8 5 L0 10 Z" />
                    </svg>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical node + connector flow */}
        <div className="mt-12 md:hidden">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="flex items-start gap-4">
                {/* Left rail: circle + vertical line */}
                <div className="flex flex-col items-center">
                  <div
                    className={
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums " +
                      (s.terminal
                        ? "bg-navy text-white"
                        : "border-2 border-navy/20 bg-white text-navy")
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="h-6 w-px bg-navy/20" />
                  )}
                </div>

                {/* Right: label + description */}
                <div className="pt-2">
                  <span className="text-[15px] font-semibold leading-none text-navy">
                    {s.label[locale]}
                  </span>
                  <span className="ml-2 text-[13px] text-secondary">
                    {s.desc[locale]}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
