"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, type L } from "./parts";

// ── helpers ─────────────────────────────────────────────────────────────────
const D = (ko: string, en: string): L => ({ ko, en });

// ── data: 5 layers ──────────────────────────────────────────────────────────

interface LayerStep {
  n: string;
  ko: string;
  en: string;
  desc: L;
}

const LAYERS: LayerStep[] = [
  {
    n: "1",
    ko: "질문",
    en: "Question",
    desc: D(
      "세계가 던지는 원초적 궁금증",
      "The primal curiosities the world asks",
    ),
  },
  {
    n: "2",
    ko: "개념",
    en: "Concept",
    desc: D(
      "질문이 가리키는 구체적 대상 (K-pop, 김치, 병역)",
      "Specific objects questions point to (K-pop, kimchi, military service)",
    ),
  },
  {
    n: "3",
    ko: "주제",
    en: "Theme",
    desc: D(
      "개념들이 모여 형성하는 관심 영역 (한류, 언어, 관광)",
      "Interest areas formed as concepts cluster (Hallyu, language, tourism)",
    ),
  },
  {
    n: "4",
    ko: "서사",
    en: "Narrative",
    desc: D(
      "주제가 반복되며 만들어지는 이야기 구조 ('문화 강국', '기술 선진국')",
      "Story structures that emerge as themes recur ('cultural powerhouse', 'tech leader')",
    ),
  },
  {
    n: "5",
    ko: "인식",
    en: "Perception",
    desc: D(
      "서사가 축적되어 형성되는 최종 이해",
      "The final understanding formed as narratives accumulate",
    ),
  },
];

// ── data: example flow ──────────────────────────────────────────────────────

interface FlowStep {
  ko: string;
  en: string;
}

const EXAMPLE_FLOW: FlowStep[] = [
  { ko: "Why is K-pop popular?", en: "Why is K-pop popular?" },
  { ko: "아이돌 문화", en: "Idol culture" },
  { ko: "한류", en: "Hallyu" },
  { ko: "문화 강국", en: "Cultural powerhouse" },
  { ko: "문화 강국 한국", en: "Korea as cultural power" },
];

// ── sub-components ──────────────────────────────────────────────────────────

function FlowChips({
  steps,
  locale,
}: {
  steps: { ko: string; en: string }[];
  locale: "ko" | "en";
}) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div
            className="rounded-lg border px-4 py-2.5 text-center text-[14px] font-bold text-navy"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 50%, transparent)",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            {step[locale]}
          </div>
          {i < steps.length - 1 && (
            <ChevronDown className="mx-2 h-4 w-4 rotate-[-90deg] text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function LayerCard({
  layer,
  locale,
}: {
  layer: LayerStep;
  locale: "ko" | "en";
}) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-6"
      style={{
        borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        background: "color-mix(in srgb, var(--accent) 4%, transparent)",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="flex-shrink-0 font-mono text-2xl font-bold"
          style={{ color: "var(--accent)" }}
        >
          {layer.n}
        </span>
        <div>
          <h3 className="text-[18px] font-bold text-navy">
            {locale === "ko" ? layer.ko : layer.en}
            <span className="ml-2 text-[14px] font-normal text-muted-foreground">
              {locale === "ko" ? layer.en : layer.ko}
            </span>
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
            {layer.desc[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────

export function UnderstandingModel() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── Section 1: 왜 질문을 연결해서 읽는가 ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "읽기 방식" : "Reading method"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문 하나는 아무것도 말해주지 않는다"
            : "A single question tells you nothing"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "\"Why is K-pop popular?\"라는 질문 하나는 그저 호기심이다. 그러나 수백 개의 질문이 같은 영역을 가리킬 때, 거기에는 구조가 나타난다. 우리는 그 구조를 읽었다."
            : "A single question like \"Why is K-pop popular?\" is just curiosity. But when hundreds of questions point to the same area, a structure appears. We read that structure."}
        </Lead>
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "개별 질문은 잡음이다. 연결된 질문은 패턴을 드러낸다. 이 페이지는 우리가 질문을 어떻게 연결했는지를 설명한다."
              : "Individual questions are noise. Connected questions reveal patterns. This page explains how we connected them."}
          </p>
        </div>
      </DocSection>

      {/* ── Section 2: 다섯 층위 ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "분석 구조" : "Analysis structure"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문에서 인식까지, 다섯 층위"
            : "From question to perception, five layers"}
        </H2>

        {/* flow visualization */}
        <div className="mt-8">
          <FlowChips
            steps={LAYERS.map((l) => ({ ko: l.ko, en: l.en }))}
            locale={locale}
          />
        </div>

        {/* layer cards */}
        <div className="mt-8 grid gap-4">
          {LAYERS.map((layer) => (
            <LayerCard key={layer.en} layer={layer} locale={locale} />
          ))}
        </div>
      </DocSection>

      {/* ── Section 3: 하나의 질문이 이해가 되기까지 ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "적용" : "Application"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "Why is K-pop popular? → 문화 강국 한국"
            : "Why is K-pop popular? → Korea as cultural power"}
        </H2>

        {/* vertical stepped flow */}
        <div className="mt-8 space-y-3">
          {EXAMPLE_FLOW.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className="rounded-xl border-l-4 px-5 py-4"
                style={{
                  borderColor: "var(--accent)",
                  background: "color-mix(in srgb, var(--accent) 4%, transparent)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 font-mono text-[13px] font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[16px] font-semibold text-navy">
                    {step[locale]}
                  </span>
                </div>
              </div>
              {i < EXAMPLE_FLOW.length - 1 && (
                <div className="flex justify-center">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-secondary">
          {locale === "ko"
            ? "이것은 이론이 아니다. 실제로 반복되는 질문들이 축적되어 한 나라에 대한 이해를 형성하는 과정이다."
            : "This is not theory. This is how actual repeated questions accumulate into an understanding of a country."}
        </p>
      </DocSection>

      {/* ── Section 4: 질문은 계속 변화한다 ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "관찰" : "Observation"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "새로운 질문은 새로운 이해를 만든다"
            : "New questions create new understanding"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "우리는 고정된 국가 이미지를 측정하지 않는다. 이미지가 형성되기 이전의 질문을 관찰한다."
              : "We do not measure a fixed national image. We observe questions before an image forms."}
          </p>
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "질문은 변화한다. 새로운 사건은 새로운 질문을 만들고, 새로운 질문은 새로운 개념, 새로운 주제, 새로운 서사를 만든다."
              : "Questions change. New events produce new questions. New questions create new concepts, new themes, new narratives."}
          </p>
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "이 연구는 2024-2025년의 스냅샷이다. 세계의 호기심이 이동하면, 이 구조도 함께 이동할 것이다."
              : "This research is a snapshot of 2024-2025. The structure will shift as the world's curiosity shifts."}
          </p>
        </div>
      </DocSection>

      {/* ── Section 5: Conclusion ── */}
      <DocSection>
        <div className="py-4">
          <p
            className="max-w-2xl text-2xl font-bold leading-snug"
            style={{ color: "var(--accent)" }}
          >
            {locale === "ko"
              ? "이 연구는 질문을 분류한 것이 아니라, 질문이 연결되어 이해가 형성되는 구조를 읽은 것이다."
              : "This research did not classify questions — it read the structure through which connected questions form understanding."}
          </p>
        </div>
      </DocSection>
    </>
  );
}
