"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Finding, type L } from "./parts";

// ── data (descriptive layer — the canonical home for findings) ──────────────
const CONCEPTS: [L, number][] = [
  [{ ko: "분단과 두 한국", en: "Division & Two Koreas" }, 242],
  [{ ko: "언어와 난이도", en: "Language & Difficulty" }, 163],
  [{ ko: "사람과 특성", en: "People & Character" }, 143],
  [{ ko: "음식", en: "Cuisine" }, 140],
  [{ ko: "문화와 유산", en: "Culture & Heritage" }, 127],
  [{ ko: "여행과 안전", en: "Travel & Safety" }, 100],
  [{ ko: "K-뷰티", en: "K-Beauty" }, 81],
  [{ ko: "K-드라마", en: "K-Drama" }, 77],
  [{ ko: "일본·중국 비교", en: "Japan/China Compare" }, 67],
  [{ ko: "기술과 브랜드", en: "Tech & Brands" }, 62],
  [{ ko: "장소와 기후", en: "Places & Climate" }, 61],
  [{ ko: "경제와 물가", en: "Economy & Cost" }, 52],
  [{ ko: "역사", en: "History" }, 39],
  [{ ko: "사회와 일상", en: "Society & Daily Life" }, 38],
  [{ ko: "K-팝", en: "K-Pop" }, 34],
  [{ ko: "예절", en: "Etiquette" }, 31],
  [{ ko: "교육", en: "Education" }, 28],
  [{ ko: "기본 정보", en: "Country Basics" }, 22],
];
const THEMES: [L, number][] = [
  [{ ko: "한류", en: "The Korean Wave" }, 459],
  [{ ko: "분단·역사·지정학", en: "Division, History & Geopolitics" }, 348],
  [{ ko: "사람·사회·일상", en: "People, Society & Everyday Life" }, 234],
  [{ ko: "방문과 거주", en: "Visiting & Living" }, 213],
  [{ ko: "이해하기", en: "Learning & Understanding" }, 191],
  [{ ko: "경제·기술·위상", en: "Economy, Tech & Standing" }, 181],
];
const LANGS: [L, number][] = [
  [{ ko: "영어 (US+IN)", en: "English (US+IN)" }, 449],
  [{ ko: "한국어", en: "Korean" }, 210],
  [{ ko: "일본어", en: "Japanese" }, 200],
  [{ ko: "독일어", en: "German" }, 187],
  [{ ko: "인도네시아어", en: "Indonesian" }, 179],
  [{ ko: "포르투갈어", en: "Portuguese" }, 172],
  [{ ko: "아랍어", en: "Arabic" }, 143],
];
const BEAUTY: [string, number][] = [
  ["US+IN", 29], ["ID", 22], ["BR", 20], ["AE", 8], ["DE", 2], ["JP", 0], ["KR", 0],
];
const NARR: [L, L, number][] = [
  [{ ko: "세계적 문화 강국으로서의 한국", en: "Korea as a global cultural force" }, { ko: "문화 강국", en: "A cultural powerhouse" }, 459],
  [{ ko: "동경의 라이프스타일·뷰티 모델", en: "An aspirational lifestyle & beauty model" }, { ko: "동경받는 현대적 삶", en: "An aspirational, modern lifestyle" }, 459],
  [{ ko: "위험과 함께 살아가는 분단국", en: "A divided nation living with risk" }, { ko: "분단으로 규정되는 나라", en: "Defined by division & security" }, 348],
  [{ ko: "발전과 기술의 성공 사례", en: "A development & technology success story" }, { ko: "기술 선진국", en: "Technologically advanced" }, 181],
  [{ ko: "독특하고 흥미로운 나라", en: "Distinctive and intriguing" }, { ko: "알기 어려운 매력", en: "Fascinating, hard to grasp" }, 234],
];
const MARKET_TOP: [string, L, number][] = [
  ["US+IN", { ko: "사람과 특성", en: "Korean People & National Character" }, 76],
  ["DE", { ko: "언어와 난이도", en: "Korean Language & Its Difficulty" }, 71],
  ["ID", { ko: "분단과 두 한국", en: "North–South Division & Two Koreas" }, 46],
  ["JP", { ko: "문화와 유산", en: "Culture, Tradition & Heritage" }, 27],
  ["BR", { ko: "분단과 두 한국", en: "North–South Division & Two Koreas" }, 58],
  ["AE", { ko: "분단과 두 한국", en: "North–South Division & Two Koreas" }, 47],
  ["KR", { ko: "사람과 특성", en: "Korean People & National Character" }, 34],
];
const MARKETS = ["US+IN", "DE", "ID", "JP", "BR", "AE", "KR"];
const HEAT: [L, Record<string, number>][] = [
  [{ ko: "분단과 두 한국", en: "Division & Two Koreas" }, { "US+IN": 43, DE: 25, ID: 46, JP: 12, BR: 58, AE: 47, KR: 11 }],
  [{ ko: "언어와 난이도", en: "Language & Difficulty" }, { "US+IN": 33, DE: 71, ID: 11, JP: 12, BR: 15, AE: 11, KR: 10 }],
  [{ ko: "사람과 특성", en: "People & Character" }, { "US+IN": 76, DE: 15, ID: 14, JP: 3, BR: 1, AE: 0, KR: 34 }],
  [{ ko: "음식", en: "Cuisine" }, { "US+IN": 28, DE: 12, ID: 19, JP: 22, BR: 17, AE: 20, KR: 22 }],
  [{ ko: "문화와 유산", en: "Culture & Heritage" }, { "US+IN": 24, DE: 9, ID: 14, JP: 27, BR: 19, AE: 6, KR: 28 }],
  [{ ko: "여행과 안전", en: "Travel & Safety" }, { "US+IN": 48, DE: 9, ID: 8, JP: 21, BR: 1, AE: 3, KR: 10 }],
  [{ ko: "K-뷰티", en: "K-Beauty" }, { "US+IN": 29, DE: 2, ID: 22, JP: 0, BR: 20, AE: 8, KR: 0 }],
  [{ ko: "K-드라마", en: "K-Drama" }, { "US+IN": 19, DE: 1, ID: 10, JP: 12, BR: 9, AE: 12, KR: 14 }],
  [{ ko: "기술과 브랜드", en: "Tech & Brands" }, { "US+IN": 13, DE: 10, ID: 6, JP: 10, BR: 4, AE: 10, KR: 9 }],
  [{ ko: "K-팝", en: "K-Pop" }, { "US+IN": 9, DE: 2, ID: 0, JP: 11, BR: 0, AE: 6, KR: 6 }],
];
const SURPRISE: [string, L][] = [
  ["why do koreans use metal chopsticks", { ko: "왜 금속 젓가락을 쓰나요?", en: "US+IN" }],
  ["why don't Korean men have beards", { ko: "왜 한국 남성은 수염이 없나요?", en: "BR" }],
  ["why is korea so christian", { ko: "왜 한국은 기독교인이 많나요?", en: "US+IN" }],
  ["why is the korean won so weak", { ko: "원화는 왜 이렇게 약한가요?", en: "US+IN" }],
  ["why must Koreans do military service", { ko: "왜 군 복무가 의무인가요?", en: "ID" }],
  ["why does Korea fear Vietnam's development", { ko: "왜 베트남의 발전을 두려워하나요?", en: "KR" }],
];

const FINDINGS: { g: L; items: [string, L, L][] }[] = [
  {
    g: { ko: "지배적 개념", en: "Dominant concepts" },
    items: [
      ["01", { ko: "세계가 가장 많이 던지는 단일 질문은 여전히 ‘두 개의 한국’", en: "The two Koreas is the single biggest question the world asks" }, { ko: "분단 관련 질문이 242개(15.7%)로 어떤 한류 개념보다 큽니다. 한국에 대한 호기심은 여전히 분단에서 시작됩니다.", en: "242 questions (15.7%) — larger than any Hallyu concept. Curiosity about Korea still begins with the split." }],
      ["02", { ko: "‘한국어는 어렵나요’가 두 번째로 큰 개념", en: "“Is Korean hard?” is the second-largest concept" }, { ko: "언어와 난이도가 163개(10.6%). 틀은 ‘학습’이 아니라 ‘어려움’입니다.", en: "163 questions (10.6%). The framing is difficulty, not just learning." }],
      ["03", { ko: "한류는 주제로는 1위지만, 단일 질문으로는 아님", en: "Hallyu wins as a theme, not as any single question" }, { ko: "K-팝·드라마·뷰티·음식·문화를 합치면 459개(약 30%)로 최대 주제이지만, 개별 개념으로는 어느 것도 분단을 넘지 못합니다.", en: "K-pop, drama, beauty, food and culture together form the largest theme (459, ~30%), yet none individually tops division." }],
      ["04", { ko: "음식과 ‘한국인은 어떤 사람들인가’는 거의 보편적", en: "Food and “what are Koreans like” are near-universal" }, { ko: "음식(140)과 국민성(143)이 3–4위이며 거의 모든 시장에 등장하는 저마찰 진입점입니다.", en: "Cuisine (140) and national character (143) rank 3rd–4th, appearing across nearly every market — the broad entry points." }],
    ],
  },
  {
    g: { ko: "지배적 서사", en: "Dominant narratives" },
    items: [
      ["05", { ko: "지정학이 전체 호기심의 23%", en: "Geopolitics is 23% of all curiosity" }, { ko: "분단·역사·지정학 주제가 348개로 한류에 이어 2위이며, 그 핵심 개념은 가장 많이 입증된 서사입니다.", en: "The Division–History–Geopolitics theme (348) trails only Hallyu; its core concept is the most-evidenced narrative." }],
      ["06", { ko: "‘한국을 배우고 이해하기’는 그 자체로 하나의 주제", en: "“Learning & understanding Korea” is a theme in its own right" }, { ko: "언어와 교육을 합쳐 191개 — 소비가 아니라 이해하려는 호기심입니다.", en: "Language plus education (191) — curiosity that wants to understand, not just consume." }],
      ["07", { ko: "다섯 번째 서사는 순수한 호기심", en: "The fifth narrative is pure curiosity" }, { ko: "‘독특하고 흥미로운 나라’ — ‘한국은 왜 그럴까’의 잔여물이 나머지를 움직이는 정서적 동력입니다.", en: "“Korea as distinctive & intriguing” — the why-is-Korea-so residue is the affective engine beneath the rest." }],
    ],
  },
  {
    g: { ko: "국가별 차이", en: "Country differences" },
    items: [
      ["08", { ko: "글로벌 사우스가 ‘두 개의 한국’ 질문을 이끈다", en: "The Global South drives the “two Koreas” question" }, { ko: "브라질(58)·아랍(47)·인도네시아(46)가 분단 질문을 주도 — 이들에게 지정학은 문화보다 앞선 진입점입니다.", en: "Brazil (58), the Arab market (47) and Indonesia (46) lead — for them geopolitics is the entry point, ahead of culture." }],
      ["09", { ko: "한국의 이웃은 유산을 묻는다", en: "Korea's neighbours ask about heritage" }, { ko: "문화·유산은 KR(28)·JP(27)가 주도 — 한국인 자신과 이웃 일본이 전통을 가장 많이 묻습니다.", en: "Culture & tradition is led by KR (28) and JP (27) — Koreans themselves and Japan ask most about heritage." }],
      ["10", { ko: "일본은 K-팝과 예절에 과대 집중", en: "Japan over-indexes on K-pop and on manners" }, { ko: "일본은 아이돌과 예절 모두에서 최상위 시장 — 팬덤과 사회 규범을 함께 묻는 근접성입니다.", en: "Japan is top market for both K-pop idols and etiquette — a proximity that asks about fandom and social norms." }],
      ["11", { ko: "인도네시아는 가장 근본적인 질문을 한다", en: "Indonesia asks the most foundational questions" }, { ko: "‘한국이란 무엇인가 / 무엇으로 유명한가’를 ID가 주도 — 첫 접점에 있는 새로운 청중입니다.", en: "“What is Korea / what is it known for” is led by ID — a newer-to-Korea audience at first contact." }],
    ],
  },
  {
    g: { ko: "언어별 차이", en: "Language differences" },
    items: [
      ["12", { ko: "독일은 ‘한국어가 어려운가’에 집착한다", en: "Germans are fixated on whether Korean is hard" }, { ko: "독일은 1위 개념이 언어 난이도인 유일한 시장 — 71개, 그 개념 전체의 44%입니다.", en: "German is the only market whose #1 concept is language difficulty — 71 questions, 44% of that entire concept." }],
      ["13", { ko: "한국의 검색은 자의식적이다", en: "Korea's own searches are self-conscious" }, { ko: "한국 시장의 1위 개념은 국민성 — ‘외국인이 보는 한국인 특징’이 이끕니다. 자신의 이미지를 검색하는 나라입니다.", en: "The Korean market's top concept is national character — led by “how foreigners see Koreans.” A nation Googling its own image." }],
      ["14", { ko: "영어는 넓고, 나머지는 뾰족하다", en: "English is broad; everyone else is pointed" }, { ko: "영어는 사람·여행·분단·언어에 고루 퍼지고, 비영어 6개 시장은 각기 한두 개념에 집중합니다.", en: "English spreads evenly; the six non-English markets each concentrate on one or two concepts." }],
      ["15", { ko: "시장을 넘나드는 질문은 31%뿐", en: "Only 31% of questions cross markets" }, { ko: "1,540개 중 477개만 둘 이상의 시장에 등장 — 나머지 69%는 시장 고유입니다.", en: "477 of 1,540 appear in more than one market; the other 69% are market-specific." }],
    ],
  },
  {
    g: { ko: "의외의 발견", en: "Surprising findings" },
    items: [
      ["16", { ko: "호기심은 구체적이고 신체적이다", en: "Curiosity is granular and physical" }, { ko: "‘왜 금속 젓가락을 쓰나’, ‘왜 수염이 없나’(브라질), ‘왜 기독교인이 많나’ — 추상이 아니라 구체적 호기심입니다.", en: "“Why metal chopsticks,” “why no beards” (Brazil), “why so Christian” — concrete, embodied curiosity, not abstractions." }],
      ["17", { ko: "2025년 작품이 이미 드라마 개념을 바꾸고 있다", en: "A 2025 film is already reshaping the drama concept" }, { ko: "<케이팝 데몬 헌터스>가 드라마 클러스터에 강하게 등장 — 온톨로지가 살아 있는 문화 순간을 포착함을 보여줍니다.", en: "KPop Demon Hunters surfaces strongly — evidence the ontology tracks live cultural moments, not a static canon." }],
      ["18", { ko: "데이터 사이로 불안이 새어 나온다", en: "Anxiety leaks through the data" }, { ko: "‘원화는 왜 약한가’, ‘한국은 선진국인가’, 그리고 한국 스스로 ‘왜 베트남의 발전을 두려워하나’ — 경제·지위 불안이 드러납니다.", en: "“Why is the won so weak,” “is Korea first-world,” and — from Korea itself — “why fear Vietnam's development.”" }],
    ],
  },
];

// ── small charts (accent-driven) ────────────────────────────────────────────
function Bars({ rows, locale }: { rows: [L, number][]; locale: "ko" | "en" }) {
  const max = rows[0][1];
  return (
    <div className="grid gap-1.5">
      {rows.map(([lab, n]) => (
        <div key={lab.en} className="grid grid-cols-[128px_1fr_40px] items-center gap-3 text-[13px] sm:grid-cols-[168px_1fr_44px]">
          <span className="truncate text-right text-secondary" title={lab[locale]}>{lab[locale]}</span>
          <span className="h-[19px] overflow-hidden rounded-[5px]" style={{ background: "color-mix(in srgb, var(--border) 55%, var(--surface, #fff))" }}>
            <span className="block h-full rounded-[5px]" style={{ width: `${Math.max(2, (n / max) * 100)}%`, background: "linear-gradient(90deg, color-mix(in srgb, var(--accent) 78%, #000 8%), var(--accent))" }} />
          </span>
          <span className="text-right font-semibold tabular-nums text-navy">{n}</span>
        </div>
      ))}
    </div>
  );
}

function Heat({ locale }: { locale: "ko" | "en" }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-separate" style={{ borderSpacing: "3px", minWidth: 620 }}>
        <thead>
          <tr>
            <th />
            {MARKETS.map((m) => (
              <th key={m} className="px-1.5 py-1 text-center text-[11px] font-semibold text-muted-foreground">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HEAT.map(([lab, row]) => {
            const total = MARKETS.reduce((s, m) => s + (row[m] || 0), 0) || 1;
            return (
              <tr key={lab.en}>
                <th className="whitespace-nowrap pr-2 text-right text-[12px] font-medium text-secondary">{lab[locale]}</th>
                {MARKETS.map((m) => {
                  const v = row[m] || 0;
                  const share = v / total;
                  const light = share > 0.3;
                  return (
                    <td
                      key={m}
                      title={`${lab[locale]} · ${m}: ${v} (${Math.round(share * 100)}%)`}
                      className="h-[34px] w-[58px] rounded-md text-center text-[12px] font-bold tabular-nums"
                      style={{
                        background: v === 0 ? "var(--surface-2, #f4f6f9)" : `color-mix(in srgb, var(--accent) ${Math.min(100, 12 + share * 125)}%, #fff)`,
                        color: light ? "#fff" : "var(--navy, #0d1b31)",
                      }}
                    >
                      {v || ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-7">{children}</div>;
}

export function DataReport() {
  const { t, locale } = useLanguage();
  return (
    <>
      <DocSection>
        <Kicker>{locale === "ko" ? "요약" : "Executive summary"}</Kicker>
        <H2>{locale === "ko" ? "세계는 다섯 개의 문을 통해 하나의 한국을 만난다" : "The world meets one Korea through five doors"}</H2>
        <Lead>
          {locale === "ko"
            ? "한류는 최대 주제(전체의 약 30%)이지만, 최대 단일 개념은 여전히 남북 분단입니다. 소프트파워는 안보 프레임을 대체하지 못했습니다. 1,540개 질문은 다섯 가지 인식으로 수렴합니다."
            : "The Korean Wave is the largest theme (~30%), yet the largest single concept is still the North–South division: soft power has not displaced the security frame. The 1,540 questions collapse into five perceptions."}
        </Lead>
        <div className="mt-7">
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "질문 → 개념 → 주제 → 서사 → 인식" : "Question → Concept → Theme → Narrative → Perception"}</div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border-strong text-left text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                    <th className="pb-2.5 pr-3 font-semibold">{locale === "ko" ? "서사" : "Narrative"}</th>
                    <th className="pb-2.5 pr-3 font-semibold">{locale === "ko" ? "인식" : "Perception"}</th>
                    <th className="pb-2.5 text-right font-semibold">{locale === "ko" ? "주제 규모" : "Theme weight"}</th>
                  </tr>
                </thead>
                <tbody>
                  {NARR.map(([nar, per, w]) => (
                    <tr key={per.en} className="border-b border-border">
                      <td className="py-2.5 pr-3 font-medium text-navy">{nar[locale]}</td>
                      <td className="py-2.5 pr-3 text-secondary">{per[locale]}</td>
                      <td className="py-2.5 text-right font-semibold tabular-nums text-navy">{w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{FINDINGS[0].g[locale]}</Kicker>
        <H2>{locale === "ko" ? "분단과 언어 난이도가 모든 K-문화 주제를 앞선다" : "Division and language difficulty outrank every K-culture topic"}</H2>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "18개 개념, 정규화 질문 수" : "The 18 concepts, by canonical questions"}</div>
            <div className="mt-4"><Bars rows={CONCEPTS} locale={locale} /></div>
          </Card>
          <div className="grid gap-3">
            {FINDINGS[0].items.map(([n, h, b]) => (
              <Finding key={n} n={n} head={h[locale]} body={b[locale]} />
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection>
        <Kicker>{FINDINGS[1].g[locale]}</Kicker>
        <H2>{locale === "ko" ? "여섯 개의 주제, 그리고 여전히 앞서는 안보 프레임" : "Six themes, and the security frame still leads"}</H2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "주제별 질문 규모" : "Themes by question weight"}</div>
            <div className="mt-4"><Bars rows={THEMES} locale={locale} /></div>
          </Card>
          <div className="grid gap-3">
            {FINDINGS[1].items.map(([n, h, b]) => (
              <Finding key={n} n={n} head={h[locale]} body={b[locale]} />
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{FINDINGS[2].g[locale]}</Kicker>
        <H2>{locale === "ko" ? "모든 시장이 서로 다른 문으로 들어온다" : "Every market walks in through a different door"}</H2>
        <Lead>
          {locale === "ko"
            ? "각 개념을 7개 독립 언어-시장으로 읽으면 뚜렷한 신호가 드러납니다. 진할수록 그 시장이 해당 개념을 더 많이 이끕니다. (US·IN은 영어 질문 표면을 공유합니다.)"
            : "Reading each concept across the seven independent language-markets reveals sharp signatures; darker means that market drives more of it. (US and IN share the English surface.)"}
        </Lead>
        <div className="mt-6"><Card><Heat locale={locale} /></Card></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FINDINGS[2].items.map(([n, h, b]) => (
            <Finding key={n} n={n} head={h[locale]} body={b[locale]} />
          ))}
        </div>
      </DocSection>

      <DocSection>
        <Kicker>{FINDINGS[3].g[locale]}</Kicker>
        <H2>{locale === "ko" ? "검색하는 언어가 무엇을 묻는지 예측한다" : "The language you search in predicts what you ask"}</H2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "언어별 질문 수" : "Questions by language"}</div>
            <div className="mt-4"><Bars rows={LANGS} locale={locale} /></div>
          </Card>
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "각 시장의 1위 개념" : "Each market's #1 concept"}</div>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {MARKET_TOP.map(([m, c, n]) => (
                  <tr key={m} className="border-b border-border last:border-0">
                    <td className="w-14 py-2.5 font-mono text-[12px] font-bold text-[color:var(--accent)]">{m}</td>
                    <td className="py-2.5 font-medium text-navy">{c[locale]}</td>
                    <td className="w-10 py-2.5 text-right font-semibold tabular-nums text-secondary">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FINDINGS[3].items.map(([n, h, b]) => (
            <Finding key={n} n={n} head={h[locale]} body={b[locale]} />
          ))}
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{FINDINGS[4].g[locale]}</Kicker>
        <H2>{locale === "ko" ? "롱테일에 숨은 단서들" : "The tells hiding in the long tail"}</H2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "K-뷰티는 수출시장 현상" : "K-beauty is an export-market phenomenon"}</div>
            <div className="mt-1 text-[12.5px] text-muted-foreground">{locale === "ko" ? "시장별 스킨케어·패션 질문 — 독일·일본·한국에는 사실상 없음." : "Skincare & fashion by market — absent in Germany, Japan, Korea."}</div>
            <div className="mt-4"><Bars rows={BEAUTY.map(([m, n]) => [{ ko: m, en: m }, n]) as [L, number][]} locale={locale} /></div>
          </Card>
          <Card>
            <div className="text-[13px] font-semibold text-navy">{locale === "ko" ? "프레임을 드러내는 실제 질문" : "Real questions that reveal the frame"}</div>
            <ul className="mt-3 space-y-2.5">
              {SURPRISE.map(([q, meta]) => (
                <li key={q} className="rounded-lg border border-border bg-tint px-4 py-2.5">
                  <p className="text-[14.5px] font-medium text-navy">{locale === "ko" ? meta.ko : `“${q}”`}</p>
                  <span className="font-mono text-[11px] text-[color:var(--accent)]">{meta.en}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FINDINGS[4].items.map(([n, h, b]) => (
            <Finding key={n} n={n} head={h[locale]} body={b[locale]} />
          ))}
        </div>
      </DocSection>

      {/* rung boundary — hand off interpretation to the Brief (no own implications) */}
      <DocSection>
        <div className="rounded-2xl border border-border bg-tint p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {locale === "ko" ? "다음 단계 · 해석" : "Next rung · Interpretation"}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-navy">
            {locale === "ko"
              ? "여기까지가 ‘무엇이 있는가’입니다. 이 패턴이 무엇을 의미하는지는 공공외교 브리프에서 다룹니다."
              : "That is what is there. What these patterns mean is the work of the Diplomacy Brief."}
          </p>
          <Link href="/research/diplomacy-brief" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80">
            {locale === "ko" ? "공공외교 브리프 읽기" : "Read the Diplomacy Brief"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
