"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../reveal";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });

// The single most important homepage section: what the questions revealed,
// stated as findings — a 2×2 research matrix, not marketing cards.
const FINDINGS: { n: string; claim: L; note: L }[] = [
  {
    n: "01",
    claim: D(
      "1,540개의 질문은 하나의 한국이 아니라 여러 개의 한국을 보여준다.",
      "1,540 questions reveal not one Korea, but several.",
    ),
    note: D(
      "질문의 69%는 특정 시장에만 나타났다. 세계 공통의 단일 이미지는 존재하지 않았다.",
      "69% of questions appeared in only one market. No single global image exists.",
    ),
  },
  {
    n: "02",
    claim: D(
      "문화는 가장 큰 입구였지만, 가장 큰 질문은 문화가 아니었다.",
      "Culture was the widest entrance — but not the biggest question.",
    ),
    note: D(
      "최대 주제는 한류였으나, 최대 단일 개념은 지금도 분단이다. 언어·사회·경제가 그 뒤를 이었다.",
      "Hallyu is the largest theme, yet the largest single concept is still division — followed by language, society, and economy.",
    ),
  },
  {
    n: "03",
    claim: D(
      "국가마다 질문이 달랐다.",
      "Each country asked differently.",
    ),
    note: D(
      "독일은 언어의 난이도를, 브라질·인도네시아는 분단을, 일본은 유산을 물었다. 같은 한국을 보지 않았다.",
      "Germany asked about language difficulty; Brazil and Indonesia about division; Japan about heritage. They did not see the same Korea.",
    ),
  },
  {
    n: "04",
    claim: D(
      "질문은 검색에서 끝나지 않는다.",
      "A question does not end at the search box.",
    ),
    note: D(
      "AI 답변으로, 콘텐츠로, 그리고 사람들이 한국을 이해하는 방식 — 인식 — 으로 이어진다.",
      "It flows into AI answers, into content, and into how people come to perceive Korea.",
    ),
  },
];

export function KeyFindings() {
  const { locale } = useLanguage();
  return (
    <section id="findings" className="scroll-mt-20 border-b border-border">
      <div className="container py-24 sm:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
              {locale === "ko" ? "핵심 발견" : "Key findings"}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.18] tracking-tight text-navy sm:text-[2.6rem]">
              {locale === "ko"
                ? "한국에 대한 답을 찾기 전에, 세계가 어떤 질문을 하는지부터 조사했습니다."
                : "Before answering questions about Korea, we studied which questions the world is asking."}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-2">
          {FINDINGS.map((f, i) => (
            <Reveal key={f.n} delay={(i % 2) * 0.08}>
              <div
                className={
                  "flex h-full flex-col border-b border-border px-1 py-9 sm:px-8 " +
                  (i % 2 === 0 ? "sm:border-r" : "")
                }
              >
                <div className="font-mono text-sm font-bold tabular-nums text-brand">{f.n}</div>
                <h3 className="mt-4 text-pretty text-[22px] font-semibold leading-[1.32] text-navy sm:text-[26px]">
                  {f.claim[locale]}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-secondary">
                  {f.note[locale]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
