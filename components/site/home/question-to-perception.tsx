"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

const STEPS: { label: L; desc: L; terminal?: boolean }[] = [
  {
    label: D("질문", "Question"),
    desc: D("사람들이 검색창에 남긴 실제 궁금증", "The real curiosity people type into a search box"),
  },
  {
    label: D("개념", "Concept"),
    desc: D("질문들이 반복되며 형성된 공통 관심사", "A shared interest formed as questions repeat"),
  },
  {
    label: D("주제", "Theme"),
    desc: D("유사 개념이 모여 형성된 탐색 영역", "A field of exploration where similar concepts gather"),
  },
  {
    label: D("서사", "Narrative"),
    desc: D("주제들이 연결되며 만들어지는 이야기", "The story that emerges as themes connect"),
  },
  {
    label: D("인식", "Perception"),
    desc: D("반복된 서사가 남기는 국가 이미지", "The national image a repeated narrative leaves behind"),
    terminal: true,
  },
];

export function QuestionToPerception() {
  const { locale } = useLanguage();
  return (
    <section className="border-b border-border">
      <div className="container py-28 sm:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">
              {locale === "ko" ? "질문은 어떻게 인식이 되는가" : "How a question becomes a perception"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 whitespace-pre-line text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
              {locale === "ko"
                ? "하나의 질문은 다섯 단계를 지나\n국가 이미지가 됩니다."
                : "A single question travels five steps\nto become a national image."}
            </h2>
          </Reveal>
        </div>

        {/* horizontal flow: 5 nodes with arrows, 1-line description each */}
        <div className="mt-20 grid grid-cols-1 gap-y-4 md:grid-cols-9 md:items-start md:gap-y-0">
          {STEPS.map((s, i) => (
            <Reveal
              key={i}
              delay={i * 0.07}
              className={i < STEPS.length - 1 ? "md:col-span-2" : "md:col-span-1"}
            >
              <div className="md:flex md:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 md:block">
                    <span
                      className={
                        "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold " +
                        (s.terminal ? "bg-navy text-white" : "border border-border-strong bg-white text-navy")
                      }
                    >
                      <span className="mr-2 font-mono text-[11px] tabular-nums opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label[locale]}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[16rem] text-[14px] leading-relaxed text-secondary">
                    {s.desc[locale]}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="my-2 ml-1 hidden select-none text-2xl font-light text-border-strong md:mt-1 md:block"
                    aria-hidden
                  >
                    →
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
