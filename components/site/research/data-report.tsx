"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, Accented, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

/* ─── Stat strip data ─── */
const STATS: { value: string; label: L }[] = [
  { value: "1,540", label: D("질문", "Questions") },
  { value: "7", label: D("언어", "Languages") },
  { value: "8", label: D("국가", "Countries") },
];

/* ─── Heatmap data (country x topic) ─── */
const HEATMAP_TOPICS = ["Hallyu", "Lang", "Tourism", "History", "Diplomacy", "Society", "Economy", "Tech"] as const;
const HEATMAP_TOPIC_LABELS: Record<string, L> = {
  Hallyu: D("한류", "Hallyu"),
  Lang: D("언어", "Language"),
  Tourism: D("관광", "Tourism"),
  History: D("역사", "History"),
  Diplomacy: D("외교", "Diplomacy"),
  Society: D("사회", "Society"),
  Economy: D("경제", "Economy"),
  Tech: D("기술", "Tech"),
};

interface HeatmapRow {
  code: string;
  name: L;
  values: number[];
}

const HEATMAP_DATA: HeatmapRow[] = [
  { code: "JP", name: D("일본", "Japan"), values: [45, 12, 21, 35, 12, 21, 10, 10] },
  { code: "US+IN", name: D("영어권", "English"), values: [56, 33, 61, 34, 67, 105, 26, 13] },
  { code: "DE", name: D("독일", "Germany"), values: [15, 71, 9, 10, 34, 17, 0, 10] },
  { code: "ID", name: D("인도네시아", "Indonesia"), values: [51, 11, 4, 20, 56, 15, 0, 6] },
  { code: "BR", name: D("브라질", "Brazil"), values: [46, 15, 1, 21, 62, 1, 2, 4] },
  { code: "AE", name: D("아랍권", "Arab"), values: [26, 11, 3, 6, 47, 4, 1, 10] },
  { code: "KR", name: D("한국", "Korea"), values: [20, 10, 10, 28, 19, 49, 13, 9] },
];

/* ─── Country entry paths ─── */
interface EntryPath {
  code: string;
  name: L;
  entries: { topic: L; width: number }[];
}

const ENTRY_PATHS: EntryPath[] = [
  {
    code: "JP",
    name: D("일본", "Japan"),
    entries: [
      { topic: D("사회", "Society"), width: 80 },
      { topic: D("한류", "Hallyu"), width: 65 },
      { topic: D("역사", "History"), width: 55 },
    ],
  },
  {
    code: "DE",
    name: D("독일", "Germany"),
    entries: [
      { topic: D("언어", "Language"), width: 95 },
      { topic: D("외교", "Diplomacy"), width: 45 },
      { topic: D("사회", "Society"), width: 25 },
    ],
  },
  {
    code: "ID",
    name: D("인도네시아", "Indonesia"),
    entries: [
      { topic: D("외교", "Diplomacy"), width: 75 },
      { topic: D("한류", "Hallyu"), width: 70 },
      { topic: D("역사", "History"), width: 30 },
    ],
  },
  {
    code: "BR",
    name: D("브라질", "Brazil"),
    entries: [
      { topic: D("외교", "Diplomacy"), width: 85 },
      { topic: D("한류", "Hallyu"), width: 60 },
      { topic: D("역사", "History"), width: 30 },
    ],
  },
  {
    code: "AE",
    name: D("아랍권", "Arab"),
    entries: [
      { topic: D("외교", "Diplomacy"), width: 80 },
      { topic: D("한류", "Hallyu"), width: 45 },
      { topic: D("언어", "Language"), width: 20 },
    ],
  },
];

/* ─── Question flow paths ─── */
interface FlowPath {
  label: L;
  steps: L[];
}

const FLOW_PATHS: FlowPath[] = [
  {
    label: D("한류 경로", "Hallyu path"),
    steps: [
      D("K-pop", "K-pop"),
      D("문화", "Culture"),
      D("사회", "Society"),
      D("국가", "Nation"),
    ],
  },
  {
    label: D("음식 경로", "Food path"),
    steps: [
      D("김치", "Kimchi"),
      D("음식", "Food"),
      D("생활문화", "Lifestyle"),
      D("한국인", "Korean people"),
      D("한국", "Korea"),
    ],
  },
  {
    label: D("분단 경로", "Division path"),
    steps: [
      D("북한", "North Korea"),
      D("분단", "Division"),
      D("지정학", "Geopolitics"),
      D("국가 정체성", "National identity"),
    ],
  },
];

/* ─── Common vs Unique questions ─── */
interface QuestionExample {
  text: L;
  countries?: string;
}

const COMMON_QUESTIONS: QuestionExample[] = [
  { text: D("왜 한국은 둘로 나뉘었는가?", "Why is Korea divided?"), countries: "7" },
  { text: D("한국어는 배우기 어려운가?", "Is Korean hard to learn?"), countries: "6" },
  { text: D("왜 K-pop이 인기 있는가?", "Why is K-pop popular?"), countries: "5" },
  { text: D("한국인은 왜 김치를 먹는가?", "Why do Koreans eat kimchi?"), countries: "5" },
  { text: D("한국의 교육 시스템은 왜 힘든가?", "Why is Korean education so intense?"), countries: "4" },
  { text: D("한국은 안전한가?", "Is Korea safe?"), countries: "4" },
];

const UNIQUE_QUESTIONS: QuestionExample[] = [
  { text: D("한국의 높임말은 왜 어려운가?", "Why is Korean honorific speech hard?"), countries: "JP" },
  { text: D("한국어 발음이 독일어와 비슷한가?", "Is Korean pronunciation similar to German?"), countries: "DE" },
  { text: D("한국 드라마의 삼각관계는 왜 반복되는가?", "Why do love triangles repeat in K-dramas?"), countries: "ID" },
  { text: D("한국은 왜 징병제를 유지하는가?", "Why does Korea maintain conscription?"), countries: "BR" },
  { text: D("한국 스킨케어 루틴은 왜 10단계인가?", "Why is Korean skincare 10 steps?"), countries: "AE" },
  { text: D("외국인이 한국에서 놀라는 것은?", "What surprises foreigners in Korea?"), countries: "KR" },
];

/* ─── Network layers ─── */
const NETWORK_LAYERS: { count: string; label: L }[] = [
  { count: "1,540", label: D("질문", "Questions") },
  { count: "18", label: D("개념", "Concepts") },
  { count: "6", label: D("주제", "Themes") },
  { count: "5", label: D("서사", "Narratives") },
  { count: "5", label: D("인식", "Perceptions") },
];

/* ─── Helper: heatmap cell opacity ─── */
function cellOpacity(value: number, max: number): number {
  if (value === 0) return 0.04;
  const ratio = value / max;
  if (ratio < 0.1) return 0.1;
  if (ratio < 0.2) return 0.2;
  if (ratio < 0.4) return 0.4;
  if (ratio < 0.6) return 0.6;
  if (ratio < 0.8) return 0.8;
  return 1;
}

export function DataReport() {
  const { locale } = useLanguage();

  // Find max value in heatmap for normalization
  const heatmapMax = Math.max(...HEATMAP_DATA.flatMap((r) => r.values));

  return (
    <>
      {/* Section 1: Overview stat strip */}
      <DocSection>
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label.en}
              className="rounded-xl border border-border bg-white px-4 py-5 text-center"
            >
              <div className="text-3xl font-bold tabular-nums text-navy sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] text-secondary">
                {s.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Finding 1: Culture is the entry point, not the destination */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "발견 1" : "Finding 1"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "문화는 진입점이다, 목적지가 아니다"
            : "Culture is the entry point, not the destination"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "1,540개 질문 중 문화 관련 질문이 약 69%를 차지한다. 그러나 문화 질문을 추적하면, 그것은 언어에서 역사로, 사회에서 정치로 확장된다."
            : "About 69% of 1,540 questions relate to culture. But when you trace cultural questions, they expand from language to history, from society to politics."}
        </Lead>
        <div className="mt-8 space-y-4">
          <Finding
            n="69%"
            head={locale === "ko" ? "문화 관련 질문" : "Culture-related questions"}
            body={locale === "ko"
              ? "한류, 음식, 언어, 관광, 생활문화를 포함하는 넓은 의미의 문화 질문이 전체의 약 69%를 구성한다."
              : "Broadly defined cultural questions including Hallyu, food, language, tourism, and lifestyle make up about 69% of the total."}
          />
          <Finding
            n="31%"
            head={locale === "ko" ? "사회 · 정치 · 경제 질문" : "Society, politics, and economy questions"}
            body={locale === "ko"
              ? "분단, 외교, 경제, 사회 구조에 관한 질문은 31%에 불과하지만, 문화 질문의 종착점이기도 하다."
              : "Questions about division, diplomacy, economy, and social structure make up only 31%, yet they are also where cultural questions ultimately lead."}
          />
          <Finding
            n="-->"
            head={locale === "ko" ? "확장의 증거" : "Evidence of expansion"}
            body={locale === "ko"
              ? "K-pop에서 시작한 질문은 아이돌 군대→징병제→분단으로, 김치에서 시작한 질문은 음식→생활→한국인→한국 사회로 확장된다. 문화는 시작이지 끝이 아니다."
              : "Questions starting from K-pop expand through idol military service to conscription to division. Questions from kimchi expand through food to lifestyle to Korean people to Korean society. Culture is the beginning, not the end."}
          />
        </div>
      </DocSection>

      {/* Finding 2: The world does not ask about one Korea — with Heatmap */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "발견 2" : "Finding 2"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "같은 한국을 묻지 않는다"
            : "The world does not ask about one Korea"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "각 국가는 자신의 맥락에서 서로 다른 한국을 구성한다. 일본은 사회를, 독일은 언어를, 인도네시아는 한류를, 브라질은 분단을 묻는다."
            : "Each country constructs a different Korea from its own context. Japan asks about society, Germany about language, Indonesia about Hallyu, Brazil about division."}
        </Lead>

        {/* Visualization 1: Country x Topic Heatmap */}
        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">
              {locale === "ko" ? "국가 x 주제 히트맵" : "Country x Topic Heatmap"}
            </div>
            {/* Header row */}
            <div className="grid gap-px" style={{ gridTemplateColumns: "100px repeat(8, 1fr)" }}>
              <div className="p-2" />
              {HEATMAP_TOPICS.map((t) => (
                <div
                  key={t}
                  className="p-2 text-center text-[11px] font-medium text-secondary"
                >
                  {HEATMAP_TOPIC_LABELS[t][locale]}
                </div>
              ))}
            </div>
            {/* Data rows */}
            {HEATMAP_DATA.map((row) => (
              <div
                key={row.code}
                className="grid gap-px"
                style={{ gridTemplateColumns: "100px repeat(8, 1fr)" }}
              >
                <div className="flex items-center p-2 text-[13px] font-medium text-navy">
                  {row.name[locale]}
                </div>
                {row.values.map((val, i) => (
                  <div key={i} className="flex items-center justify-center p-1.5">
                    <div
                      className="flex h-9 w-full items-center justify-center rounded text-[11px] font-mono text-white"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--accent) ${Math.round(cellOpacity(val, heatmapMax) * 100)}%, transparent)`,
                        color: cellOpacity(val, heatmapMax) > 0.5 ? "white" : "var(--color-navy)",
                      }}
                    >
                      {val > 0 ? val : ""}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Finding
            n="01"
            head={locale === "ko" ? "각 나라가 보는 한국은 다르다" : "Each country sees a different Korea"}
            body={locale === "ko"
              ? "일본은 한류와 역사를, 독일은 언어를, 인도네시아와 브라질은 외교(분단)를, 영어권은 사회를 가장 많이 질문한다. 하나의 한국은 존재하지 않는다."
              : "Japan asks most about Hallyu and history, Germany about language, Indonesia and Brazil about diplomacy (division), English speakers about society. There is no single Korea."}
          />
        </div>
      </DocSection>

      {/* Finding 3: Question maturity differs by country — with Entry Path Comparison */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "발견 3" : "Finding 3"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문의 성숙도는 국가마다 다르다"
            : "Question maturity differs by country"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "'가까운 나라=사회, 먼 나라=문화'라는 단순 공식이 아니다. 각 국가는 자신만의 깊이와 초점으로 질문한다."
            : "It is not a simple formula of 'close country = society, far country = culture.' Each country asks with its own depth and focus."}
        </Lead>

        <div className="mt-8 space-y-4">
          <Finding
            n="JP"
            head={locale === "ko" ? "깊고 구체적 (사회 밀착형)" : "Deep and specific (life-oriented)"}
            body={locale === "ko"
              ? "\"한국은 왜 매운가\" / \"한국의 예절은 무엇인가\" / \"한국어 높임말은 왜 어려운가\" — 이미 알고 있는 전제 위에서 구체적으로 묻는다."
              : "\"Why is Korean food spicy?\" / \"What is Korean etiquette?\" / \"Why is Korean honorific speech difficult?\" — asking specifically atop existing knowledge."}
          />
          <Finding
            n="DE"
            head={locale === "ko" ? "학습 중심 (언어 집중형)" : "Learning-focused (language-centered)"}
            body={locale === "ko"
              ? "\"한국어는 왜 어려운가\" / \"한국어 문법\" / \"한국어 발음\" — 한국어를 배우는 과정에서 발생하는 실용적 질문이 지배적이다."
              : "\"Why is Korean hard?\" / \"Korean grammar\" / \"Korean pronunciation\" — practical questions arising from the process of learning Korean dominate."}
          />
          <Finding
            n="ID"
            head={locale === "ko" ? "입문형 (소개 질문)" : "Introductory (overview questions)"}
            body={locale === "ko"
              ? "\"한국은 무엇으로 유명한가\" / \"왜 K-pop이 인기인가\" — 한국을 처음 알아가는 단계의 넓고 기초적인 질문이다."
              : "\"What is Korea famous for?\" / \"Why is K-pop popular?\" — broad, foundational questions from the stage of first discovering Korea."}
          />
        </div>

        {/* Visualization 2: Country Entry Path Comparison */}
        <div className="mt-10">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {locale === "ko" ? "국가별 상위 진입 주제" : "Top entry topics by country"}
          </div>
          <div className="space-y-5">
            {ENTRY_PATHS.map((country) => (
              <div key={country.code}>
                <div className="mb-2 text-[13px] font-semibold text-navy">
                  {country.name[locale]}
                </div>
                <div className="space-y-1.5">
                  {country.entries.map((entry, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-right text-[12px] text-secondary">
                        {entry.topic[locale]}
                      </span>
                      <div className="relative h-6 flex-1">
                        <div
                          className="absolute inset-y-0 left-0 rounded"
                          style={{
                            width: `${entry.width}%`,
                            backgroundColor: `color-mix(in srgb, var(--accent) ${70 - i * 20}%, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      {/* Finding 4: Each country has a different entry gate — with Flow Diagram */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "발견 4" : "Finding 4"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 국가마다 다른 입구를 가진다"
            : "Each country has a different entry gate"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "같은 한국이지만 들어가는 문이 다르다. 그리고 그 문은 각 나라의 맥락이 결정한다."
            : "It is the same Korea, but the door of entry differs. And that door is determined by each country's context."}
        </Lead>

        {/* Entry gate summary */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { country: D("일본", "Japan"), gate: D("사회", "Society") },
            { country: D("독일", "Germany"), gate: D("언어", "Language") },
            { country: D("인도네시아", "Indonesia"), gate: D("한류", "Hallyu") },
            { country: D("브라질", "Brazil"), gate: D("분단", "Division") },
          ].map((item) => (
            <div
              key={item.country.en}
              className="rounded-xl border border-border bg-white p-4 text-center"
            >
              <div className="text-[13px] text-secondary">{item.country[locale]}</div>
              <div className="mt-1 text-[17px] font-bold text-navy">{item.gate[locale]}</div>
            </div>
          ))}
        </div>

        {/* Visualization 3: Question Flow Diagram */}
        <div className="mt-10">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {locale === "ko" ? "질문 흐름도" : "Question flow diagram"}
          </div>
          <div className="space-y-6">
            {FLOW_PATHS.map((path, pathIdx) => (
              <div key={pathIdx}>
                <div className="mb-2 text-[12px] font-medium text-secondary">
                  {path.label[locale]}
                </div>
                <div className="flex items-center gap-0 overflow-x-auto">
                  {path.steps.map((step, stepIdx) => (
                    <React.Fragment key={stepIdx}>
                      <div
                        className="shrink-0 rounded-lg border border-border bg-white px-3 py-2 text-[13px] font-medium text-navy"
                        style={{
                          borderColor: stepIdx === 0
                            ? "color-mix(in srgb, var(--accent) 60%, transparent)"
                            : undefined,
                          backgroundColor: stepIdx === 0
                            ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                            : undefined,
                        }}
                      >
                        {step[locale]}
                      </div>
                      {stepIdx < path.steps.length - 1 && (
                        <div
                          className="shrink-0 h-px w-6"
                          style={{ backgroundColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Finding
            n="-->"
            head={locale === "ko" ? "입구가 다르면 경로가 다르다" : "Different entry, different path"}
            body={locale === "ko"
              ? "K-pop으로 진입한 인도네시아는 문화→사회→국가로, 분단으로 진입한 브라질은 지정학→역사→국가 정체성으로 이동한다. 입구가 도착지를 결정한다."
              : "Indonesia, entering through K-pop, moves from culture to society to nation. Brazil, entering through division, moves from geopolitics to history to national identity. The entry determines the destination."}
          />
        </div>
      </DocSection>

      {/* Finding 5: Questions are connected — with Common vs Unique */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "발견 5" : "Finding 5"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 연결된다"
            : "Questions are connected"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "개별 질문 분석이 아니라 네트워크 분석이다. 어떤 질문은 세계 공통이고, 어떤 질문은 한 국가에서만 나타난다."
            : "This is not individual question analysis but network analysis. Some questions are universal; others appear only in one country."}
        </Lead>

        {/* Visualization 4: Common vs Unique Questions */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Common questions */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--accent) 80%, transparent)" }}
              />
              <span className="text-[13px] font-semibold text-navy">
                {locale === "ko" ? "세계 공통 질문" : "Universal questions"}
              </span>
              <span className="text-[11px] text-secondary">
                {locale === "ko" ? "(4개국 이상)" : "(4+ countries)"}
              </span>
            </div>
            <div className="space-y-2">
              {COMMON_QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-white p-3"
                >
                  <span
                    className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {q.countries}
                  </span>
                  <span className="text-[13px] leading-snug text-navy">
                    {q.text[locale]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Unique questions */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full border-2"
                style={{ borderColor: "color-mix(in srgb, var(--accent) 60%, transparent)" }}
              />
              <span className="text-[13px] font-semibold text-navy">
                {locale === "ko" ? "국가 고유 질문" : "Country-unique questions"}
              </span>
              <span className="text-[11px] text-secondary">
                {locale === "ko" ? "(1개국만)" : "(1 country only)"}
              </span>
            </div>
            <div className="space-y-2">
              {UNIQUE_QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-white p-3"
                >
                  <span className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                    {q.countries}
                  </span>
                  <span className="text-[13px] leading-snug text-navy">
                    {q.text[locale]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Finding
            n="01"
            head={locale === "ko" ? "공통 질문은 프레임이다" : "Shared questions are frames"}
            body={locale === "ko"
              ? "분단, 언어 난이도, K-pop 인기 — 세계 공통 질문은 '사실'이 아니라 '프레임'이다. 한국을 바라보는 기본 렌즈가 된다."
              : "Division, language difficulty, K-pop popularity — universal questions are not 'facts' but 'frames.' They become the default lens for viewing Korea."}
          />
          <div className="mt-4">
            <Finding
              n="02"
              head={locale === "ko" ? "고유 질문은 맥락이다" : "Unique questions are context"}
              body={locale === "ko"
                ? "일본만의 높임말 질문, 독일만의 발음 비교, 인도네시아만의 드라마 구조 질문 — 고유 질문은 그 나라의 고유한 관계를 드러낸다."
                : "Japan's honorific questions, Germany's pronunciation comparisons, Indonesia's drama structure questions — unique questions reveal each country's distinct relationship with Korea."}
            />
          </div>
        </div>
      </DocSection>

      {/* Visualization 5: Question Network */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "구조" : "Structure"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "1,540개의 질문은 하나의 네트워크다"
            : "1,540 questions form a single network"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "질문은 개념으로, 개념은 주제로, 주제는 서사로, 서사는 인식으로 수렴한다."
            : "Questions converge into concepts, concepts into themes, themes into narratives, narratives into perceptions."}
        </Lead>

        {/* Network flow visualization */}
        <div className="mt-10 overflow-x-auto">
          <div className="flex min-w-[500px] items-center justify-between gap-0">
            {NETWORK_LAYERS.map((layer, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full text-[15px] font-bold"
                    style={{
                      width: `${64 - idx * 8}px`,
                      height: `${64 - idx * 8}px`,
                      backgroundColor: `color-mix(in srgb, var(--accent) ${90 - idx * 15}%, transparent)`,
                      color: idx < 2 ? "white" : "var(--color-navy)",
                    }}
                  >
                    {layer.count}
                  </div>
                  <div className="mt-2 text-center text-[12px] font-medium text-secondary">
                    {layer.label[locale]}
                  </div>
                </div>
                {idx < NETWORK_LAYERS.length - 1 && (
                  <div className="flex flex-1 items-center justify-center px-1">
                    <div
                      className="h-px w-full"
                      style={{ backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                    />
                    <div
                      className="ml-[-6px] h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
                      style={{ borderLeftColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Finding
            n="-->"
            head={locale === "ko" ? "수렴의 구조" : "Structure of convergence"}
            body={locale === "ko"
              ? "1,540개의 질문이 18개 개념으로 압축되고, 6개 주제로 묶이며, 5개의 서사를 거쳐 5개의 인식 프레임으로 수렴한다. 이것이 이해 모델의 기초다."
              : "1,540 questions compress into 18 concepts, group into 6 themes, pass through 5 narratives, and converge into 5 perception frames. This is the foundation of the understanding model."}
          />
        </div>
      </DocSection>

      {/* Conclusion */}
      <DocSection>
        <div className="py-4 sm:py-8">
          <Accented label={locale === "ko" ? "결론" : "Conclusion"}>
            <p className="text-[19px] font-bold leading-[1.7] sm:text-[22px]">
              {locale === "ko"
                ? "세계는 한국을 문화로 시작하지만, 거기서 멈추지 않는다. 각 국가는 자신의 맥락에서, 자신의 깊이로, 자신만의 한국을 구성한다. 1,540개의 질문은 하나의 답이 아니라 하나의 네트워크를 형성한다."
                : "The world begins with Korea through culture, but does not stop there. Each country constructs its own Korea, from its own context, at its own depth. 1,540 questions form not a single answer, but a single network."}
            </p>
          </Accented>
        </div>
      </DocSection>
    </>
  );
}
