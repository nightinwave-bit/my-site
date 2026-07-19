"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Accented, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

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
  { code: "US", name: D("미국", "United States"), values: [56, 33, 61, 34, 67, 105, 26, 13] },
  { code: "IN", name: D("인도", "India"), values: [56, 33, 61, 34, 67, 105, 26, 13] },
  { code: "DE", name: D("독일", "Germany"), values: [15, 71, 9, 10, 34, 17, 0, 10] },
  { code: "ID", name: D("인도네시아", "Indonesia"), values: [51, 11, 4, 20, 56, 15, 0, 6] },
  { code: "BR", name: D("브라질", "Brazil"), values: [46, 15, 1, 21, 62, 1, 2, 4] },
  { code: "AE", name: D("아랍권", "Arab"), values: [26, 11, 3, 6, 47, 4, 1, 10] },
  { code: "KR", name: D("한국", "Korea"), values: [20, 10, 10, 28, 19, 49, 13, 9] },
];

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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-[1.85] text-secondary sm:text-[16px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
      {children}
    </div>
  );
}

function KeyMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-border bg-white px-5 py-4">
      <div className="text-[15px] font-semibold leading-relaxed text-navy" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function FlowStep({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-[12px] font-medium ${accent ? "border border-brand/20 bg-brand/8 text-brand" : "bg-border/30 text-secondary"}`}>
      {label}
    </span>
  );
}

function FlowArrow() {
  return <span className="text-[14px] text-brand/40">&darr;</span>;
}

function ProfileCard({ code, label, type, locale }: { code: string; label: L; type: L; locale: "ko" | "en" }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="text-[13px] font-bold text-navy">{code}</div>
      <div className="mt-0.5 text-[12px] text-secondary">{label[locale]}</div>
      <div className="mt-2 rounded-full bg-brand/8 px-2.5 py-0.5 text-center text-[11px] font-semibold text-brand">
        {type[locale]}
      </div>
    </div>
  );
}

/* ─── Finding Card (collapsed summary) ─── */
function FindingCard({
  n,
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  n: number;
  title: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-white transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="shrink-0 pt-0.5 font-mono text-[13px] font-bold text-[color:var(--accent)]">
          {String(n).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold leading-snug text-navy sm:text-[16px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
            {title}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-[14px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
            {summary}
          </p>
        </div>
        <span className="shrink-0 pt-1 text-[18px] text-muted-foreground transition-transform" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          &#9662;
        </span>
      </button>
      <div className={`border-t border-border px-5 pb-6 pt-4 sm:px-6 ${open ? "" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Group Header ─── */
function GroupHeader({ label, title, count, locale }: { label: string; title: L; count: number; locale: "ko" | "en" }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="rounded-full bg-navy/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
        {label}
      </span>
      <span className="text-[15px] font-semibold text-navy sm:text-[17px]">{title[locale]}</span>
      <span className="text-[12px] text-muted-foreground">{count}</span>
    </div>
  );
}

export function DataReport() {
  const { locale } = useLanguage();
  const [openFindings, setOpenFindings] = useState<Set<number>>(new Set());

  const toggle = (n: number) => {
    setOpenFindings((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const isOpen = (n: number) => openFindings.has(n);

  const heatmapMax = Math.max(...HEATMAP_DATA.flatMap((r) => r.values));

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          GROUP A: 전체 구조 발견
      ══════════════════════════════════════════════════════════════ */}
      <DocSection>
        <GroupHeader label="A" title={D("전체 구조 발견", "Structural Patterns")} count={6} locale={locale} />
        <div className="space-y-3">

          {/* ── Finding 1 ── */}
          <FindingCard
            n={1}
            title={locale === "ko"
              ? "한류는 가장 큰 주제지만 가장 강한 인식은 아니다"
              : "Hallyu is the biggest topic, but not the strongest perception"}
            summary={locale === "ko"
              ? "한류는 가장 큰 관심사지만, 분단은 여전히 가장 강한 규정력을 가진다."
              : "Hallyu draws the most interest, but division still holds defining power."}
            open={isOpen(1)}
            onToggle={() => toggle(1)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>한류는 전체 질문에서 가장 큰 비중을 차지한다. K-pop, 드라마, 뷰티, 음식을 합치면 332개. 단일 주제로는 압도적이다.</p>
                  <p>그런데 개별 개념 단위로 보면 다른 사실이 나타난다. 분단, 북한, 전쟁, 통일을 묻는 외교 질문은 309개다. 한류 전체와 거의 같은 규모가 하나의 개념에 집중되어 있다.</p>
                  <p>사람들은 K-pop을 검색하고, 드라마를 검색하고, 김치를 검색한다. 그러나 한국을 설명해야 하는 순간이 오면 분단으로 돌아간다. 한류는 접근을 만들었지만 규정력은 분단에 있다.</p>
                </>
              ) : (
                <>
                  <p>Hallyu commands the largest share of all questions. K-pop, drama, beauty, and food together total 332 &mdash; dominant as a category.</p>
                  <p>But at the individual concept level, a different fact emerges. Diplomacy questions &mdash; division, North Korea, war, reunification &mdash; total 309. Nearly the same scale, concentrated in a single concept.</p>
                  <p>People search for K-pop, dramas, kimchi. But when they need to explain Korea, they return to division. Hallyu created access; division still holds the defining power.</p>
                </>
              )}
            </Prose>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                  {locale === "ko" ? "문화 질문 (한류 전체)" : "Culture questions (all Hallyu)"}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[2.5rem] font-bold tabular-nums text-navy">332</span>
                  <span className="text-[13px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-border/30">
                  <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)" }} />
                </div>
              </div>
              <div className="rounded-xl border-2 border-navy/20 bg-white p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                  {locale === "ko" ? "외교 질문 (분단 중심)" : "Diplomacy questions (division-centered)"}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[2.5rem] font-bold tabular-nums text-navy">309</span>
                  <span className="text-[13px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-border/30">
                  <div className="h-full rounded-full bg-navy/70" style={{ width: "93%" }} />
                </div>
              </div>
            </div>

            <KeyMessage>
              {locale === "ko"
                ? "가장 큰 주제 ≠ 가장 강한 인식. 한류는 접근을 만들고, 분단은 규정력을 유지한다."
                : "Biggest topic ≠ strongest perception. Hallyu creates access; division retains defining power."}
            </KeyMessage>
          </FindingCard>

          {/* ── Finding 2 ── */}
          <FindingCard
            n={2}
            title={locale === "ko"
              ? "세계가 묻는 한국은 생각보다 정치적이다"
              : "The world asks about a Korea more political than expected"}
            summary={locale === "ko"
              ? "8개 시장 중 6개에서 외교가 한류보다 크거나 같다."
              : "In 6 of 8 markets, diplomacy matches or exceeds Hallyu."}
            open={isOpen(2)}
            onToggle={() => toggle(2)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>8개 시장 중 6개에서 외교가 한류보다 크거나 같다. 독일(외교 34, 한류 17), 브라질(62 vs 49), 인도네시아(56 vs 53), 아랍권(47 vs 46), 미국(67 vs 56), 인도(67 vs 56).</p>
                  <p>한류가 우세한 시장은 일본과 한국뿐이다. 이 두 시장은 한국을 일상적으로 경험하는 국가다.</p>
                  <p>나머지 6개 시장에게 한국은 문화 국가 이전에 분단 국가다. 한류가 관심을 만들었다는 사실과 한국이 여전히 지정학적 국가로 읽힌다는 사실이 동시에 존재한다.</p>
                </>
              ) : (
                <>
                  <p>In 6 of 8 markets, diplomacy matches or exceeds Hallyu. Germany (34 vs 17), Brazil (62 vs 49), Indonesia (56 vs 53), Arab world (47 vs 46), US (67 vs 56), India (67 vs 56).</p>
                  <p>Only Japan and Korea show Hallyu dominance. These are countries that experience Korea daily.</p>
                  <p>For the remaining 6 markets, Korea is a divided nation before a cultural one. Hallyu created interest, but division still holds the defining frame.</p>
                </>
              )}
            </Prose>

            {/* Heatmap */}
            <div className="mt-10 overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                  {locale === "ko" ? "국가 × 주제 히트맵" : "Country × Topic Heatmap"}
                </div>
                <div className="grid gap-px" style={{ gridTemplateColumns: "100px repeat(8, 1fr)" }}>
                  <div className="p-2" />
                  {HEATMAP_TOPICS.map((t) => (
                    <div
                      key={t}
                      className={`p-2 text-center text-[11px] font-medium ${t === "Diplomacy" ? "font-bold text-navy" : "text-secondary"}`}
                    >
                      {HEATMAP_TOPIC_LABELS[t][locale]}
                    </div>
                  ))}
                </div>
                {HEATMAP_DATA.map((row) => (
                  <div
                    key={row.code}
                    className="grid gap-px"
                    style={{ gridTemplateColumns: "100px repeat(8, 1fr)" }}
                  >
                    <div className="flex items-center p-2 text-[13px] font-medium text-navy">
                      {row.name[locale]}
                    </div>
                    {row.values.map((val, i) => {
                      const isDiplomacy = i === 4;
                      return (
                        <div key={i} className="flex items-center justify-center p-1.5">
                          <div
                            className="flex h-9 w-full items-center justify-center rounded text-[11px] font-mono"
                            style={{
                              backgroundColor: isDiplomacy
                                ? `rgba(30, 41, 59, ${Math.max(0.08, cellOpacity(val, heatmapMax))})`
                                : `color-mix(in srgb, var(--accent) ${Math.round(cellOpacity(val, heatmapMax) * 100)}%, transparent)`,
                              color: cellOpacity(val, heatmapMax) > 0.5 ? "white" : "var(--color-navy)",
                            }}
                          >
                            {val > 0 ? val : ""}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 3: Same Hallyu different meaning ── */}
          <FindingCard
            n={3}
            title={locale === "ko"
              ? "같은 한류 질문도 국가마다 다르다"
              : "Same Hallyu questions, different meanings by country"}
            summary={locale === "ko"
              ? "한류는 각 국가에서 서로 다른 문을 통해 한국에 들어가는 입구다."
              : "Hallyu is a different door to Korea in each country."}
            open={isOpen(3)}
            onToggle={() => toggle(3)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>한류는 모든 시장에 존재한다. 그러나 같은 &ldquo;한류&rdquo;가 국가마다 다른 역할을 한다.</p>
                  <p>일본의 한류 질문은 음식과 요리 중심이다. 콘텐츠 소비가 아니라 일상 문화 비교다.</p>
                  <p>브라질의 한류 질문은 K-pop과 드라마에 집중되지만, 바로 옆에 분단 질문이 62개 있다. 한류는 단독으로 존재하지 않는다.</p>
                  <p>미국·인도의 한류 질문은 가장 다양하다. 음식, 뷰티, 드라마, K-pop이 고르게 분포한다.</p>
                  <p>아랍권의 한류 질문은 스킨케어와 뷰티 비중이 높다. 실용적 관심이 두드러진다.</p>
                </>
              ) : (
                <>
                  <p>Hallyu exists in every market. But the same &ldquo;Hallyu&rdquo; plays a different role in each country.</p>
                  <p>Japan&apos;s Hallyu questions center on food and cooking. Not content consumption &mdash; daily culture comparison.</p>
                  <p>Brazil&apos;s Hallyu questions focus on K-pop and drama, but 62 division questions sit right beside them. Hallyu never stands alone.</p>
                  <p>US and India Hallyu questions are the most diverse. Food, beauty, drama, K-pop distribute evenly.</p>
                  <p>Arab Hallyu questions lean toward skincare and beauty. Practical interest stands out.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "국가별 한류의 역할" : "Role of Hallyu by country"}
              </div>
              <div className="space-y-2">
                {[
                  { market: D("일본", "Japan"), role: D("일상 문화 비교", "Daily culture comparison") },
                  { market: D("브라질", "Brazil"), role: D("분단과 공존", "Coexists with division") },
                  { market: D("미국", "US"), role: D("콘텐츠 전반 소비", "Broad content consumption") },
                  { market: D("인도", "India"), role: D("콘텐츠 전반 소비", "Broad content consumption") },
                  { market: D("아랍권", "Arab"), role: D("뷰티 실용 관심", "Practical beauty interest") },
                ].map((d) => (
                  <div key={d.market.en} className="flex items-center gap-4 rounded-lg bg-[#F8FAFF] px-4 py-3">
                    <span className="w-16 shrink-0 text-[12px] font-semibold text-navy">{d.market[locale]}</span>
                    <span className="rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-semibold text-brand">{d.role[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 4: Same language different focus ── */}
          <FindingCard
            n={4}
            title={locale === "ko"
              ? "같은 언어 질문도 국가마다 다르다"
              : "Same language questions, different focus by country"}
            summary={locale === "ko"
              ? "같은 '한국어'를 놓고 구조, 사용, 도구, 평가, 비교라는 다른 관심이 작동한다."
              : "The same subject 'Korean language' activates entirely different interests."}
            open={isOpen(4)}
            onToggle={() => toggle(4)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>모든 시장에서 한국어 관련 질문이 등장한다. 그러나 묻는 방식이 완전히 다르다.</p>
                  <p>일본은 실제로 사용하려 한다. 인도네시아는 번역 도구로 접근한다. 브라질은 학습 가능성을 평가한다. 미국·인도는 자신의 언어를 기준으로 비교한다. 아랍권은 난이도를 인식한다.</p>
                </>
              ) : (
                <>
                  <p>Korean language questions appear in every market. But the approach is completely different.</p>
                  <p>Japan seeks practical use. Indonesia uses translation tools. Brazil evaluates learnability. The US and India compare against their own language. The Arab world perceives difficulty.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "한국어 질문 — 8개 시장, 8개 관점" : "Korean language questions — 8 markets, 8 perspectives"}
              </div>
              <div className="space-y-2">
                {[
                  { market: "DE", approach: D("구조 이해", "Structure"), q: D("왜 어려운가? 왜 만들어졌는가?", "Why hard? Why created?") },
                  { market: "JP", approach: D("실제 사용", "Usage"), q: D("韓国語翻訳", "Korean translation") },
                  { market: "ID", approach: D("도구 접근", "Tool access"), q: D("bahasa korea translate", "bahasa korea translate") },
                  { market: "BR", approach: D("학습 평가", "Learnability"), q: D("coreano e dificil", "Is Korean hard") },
                  { market: "US", approach: D("자국어 비교", "L1 comparison"), q: D("hard for English speakers?", "hard for English speakers?") },
                  { market: "IN", approach: D("자국어 비교", "L1 comparison"), q: D("hard for English speakers?", "hard for English speakers?") },
                  { market: "AE", approach: D("난이도 인식", "Difficulty"), q: D("هل اللغة الكورية صعبة", "Is Korean difficult?") },
                  { market: "KR", approach: D("제도·시험", "Institutional"), q: D("한국어능력시험", "TOPIK") },
                ].map((d) => (
                  <div key={d.market} className="flex items-center gap-3 rounded-lg bg-[#F8FAFF] px-4 py-2.5">
                    <span className="w-8 shrink-0 text-[12px] font-bold text-navy">{d.market}</span>
                    <span className="shrink-0 rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-semibold text-brand">{d.approach[locale]}</span>
                    <span className="text-[12px] text-secondary">{d.q[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 5: 69% exclusive ── */}
          <FindingCard
            n={5}
            title={locale === "ko"
              ? "69%의 질문은 시장 고유 질문이다"
              : "69% of questions are market-exclusive"}
            summary={locale === "ko"
              ? "각 시장은 같은 한국을 보고 있지만 같은 것을 묻지 않는다."
              : "Each market looks at the same Korea but does not ask the same things."}
            open={isOpen(5)}
            onToggle={() => toggle(5)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>1,507개 고유 질문 중 1,039개(69%)는 하나의 시장에서만 등장한다. 468개(31%)만 시장 간에 공유된다.</p>
                  <p>공유 질문의 구조를 보면 더 흥미롭다. 468개 중 436개(93%)는 미국-인도 쌍이다. 같은 영어 검색어를 사용하기 때문에 질문이 100% 동일하다.</p>
                  <p>미국-인도를 제외하면 시장 간 진정한 공유 질문은 32개. 전체의 2%다. 그 32개는 kimchi, samsung, seoul 같은 고유명사들이다.</p>
                  <p>독일의 71개 언어 질문은 독일에서만 존재한다. 일본의 197개 질문은 전부 일본 고유다. 각 시장은 자기만의 한국을 묻고 있다.</p>
                </>
              ) : (
                <>
                  <p>Of 1,507 unique questions, 1,039 (69%) appear in only one market. Just 468 (31%) are shared across markets.</p>
                  <p>Of those 468, 436 (93%) are the US-India pair &mdash; same English search terms, 100% identical questions.</p>
                  <p>Exclude the US-India pair and genuine cross-market sharing drops to 32 questions &mdash; just 2%. Those 32 are proper nouns: kimchi, Samsung, Seoul.</p>
                  <p>Germany&apos;s 71 language questions exist only in Germany. Japan&apos;s 197 questions are all Japan-exclusive. Each market asks its own Korea.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-white p-5 text-center">
                <div className="text-[2.5rem] font-bold tabular-nums text-navy">69%</div>
                <div className="mt-1 text-[12px] text-secondary">{locale === "ko" ? "시장 고유 질문" : "Market-exclusive"}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">1,039 / 1,507</div>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 text-center">
                <div className="text-[2.5rem] font-bold tabular-nums text-navy">2%</div>
                <div className="mt-1 text-[12px] text-secondary">{locale === "ko" ? "진정한 공유 질문" : "Truly shared"}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{locale === "ko" ? "미국-인도 제외 시" : "Excluding US-India pair"}</div>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 text-center">
                <div className="text-[2.5rem] font-bold tabular-nums text-navy">32</div>
                <div className="mt-1 text-[12px] text-secondary">{locale === "ko" ? "공유 질문" : "Shared questions"}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">kimchi, samsung, seoul...</div>
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 6: Expansion paths ── */}
          <FindingCard
            n={6}
            title={locale === "ko"
              ? "질문이 사회로 확장되는 속도가 국가마다 다르다"
              : "How fast questions expand toward society differs by country"}
            summary={locale === "ko"
              ? "일본은 1단계, 미국·인도는 즉시, 인도네시아는 3단계, 아랍권은 미도달."
              : "Japan: 1 step. US & India: immediate. Indonesia: 3 steps. Arab world: not reached."}
            open={isOpen(6)}
            onToggle={() => toggle(6)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>대부분의 국가에서 한국에 대한 질문은 한류나 관광에서 시작해 사회로 확장된다. 그러나 확장 속도와 경로가 다르다.</p>
                  <p>일본은 음식에서 예절로, 예절에서 사회로. 한 단계면 도달한다.</p>
                  <p>인도네시아는 한류에서 문화로, 문화에서 한국으로, 한국에서 사회로. 세 단계가 필요하다.</p>
                  <p>독일은 언어에서 문법 구조를 거치고, 구조에서 교육으로, 교육에서 사회로 간다. 우회 경로다.</p>
                  <p>미국·인도는 시작부터 사회다. 한류를 건너뛰고 곧바로 묻는다.</p>
                  <p>아랍권은 사회에 아직 도달하지 않는다. 외교와 한류에서 멈춘다.</p>
                </>
              ) : (
                <>
                  <p>In most countries, questions start with Hallyu or tourism and expand toward society. But the speed and path differ.</p>
                  <p>Japan: food to etiquette to society. One step.</p>
                  <p>Indonesia: Hallyu to culture to Korea to society. Three steps needed.</p>
                  <p>Germany detours through language structure to education to society.</p>
                  <p>The US and India start at society directly, skipping Hallyu.</p>
                  <p>The Arab world has not yet reached society. Questions stop at diplomacy and Hallyu.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "사회 도달 경로 비교" : "Path to society by country"}
              </div>
              <div className="space-y-3">
                {[
                  { market: D("일본", "Japan"), path: ["Food", "Etiquette", "Society"], speed: D("1단계", "1 step"), ko_path: ["음식", "예절", "사회"] },
                  { market: D("미국", "US"), path: ["Society (direct)"], speed: D("즉시", "Immediate"), ko_path: ["사회 (직접)"] },
                  { market: D("인도", "India"), path: ["Society (direct)"], speed: D("즉시", "Immediate"), ko_path: ["사회 (직접)"] },
                  { market: D("독일", "Germany"), path: ["Language", "Grammar", "Education", "Society"], speed: D("우회", "Detour"), ko_path: ["언어", "문법", "교육", "사회"] },
                  { market: D("인도네시아", "Indonesia"), path: ["Hallyu", "Culture", "Korea", "Society"], speed: D("3단계", "3 steps"), ko_path: ["한류", "문화", "한국", "사회"] },
                  { market: D("아랍권", "Arab"), path: ["Diplomacy", "Hallyu", "—"], speed: D("미도달", "Not reached"), ko_path: ["외교", "한류", "—"] },
                ].map((d) => (
                  <div key={d.market.en} className="flex flex-col gap-1 rounded-lg bg-[#F8FAFF] px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
                    <span className="w-20 shrink-0 text-[12px] font-semibold text-navy">{d.market[locale]}</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {(locale === "ko" ? d.ko_path : d.path).map((step, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span className="text-[11px] text-brand/40">&rarr;</span>}
                          <span className="text-[11px] text-secondary">{step}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-semibold text-brand">{d.speed[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

        </div>
      </DocSection>

      {/* ══════════════════════════════════════════════════════════════
          GROUP B: 국가별 한국 이해 방식
      ══════════════════════════════════════════════════════════════ */}
      <DocSection tint>
        <GroupHeader label="B" title={D("국가별 한국 이해 방식", "How Each Country Understands Korea")} count={7} locale={locale} />
        <div className="space-y-3">


          {/* ── Finding 7: US & India broad ── */}
          <FindingCard
            n={7}
            title={locale === "ko"
              ? "미국과 인도는 한국을 가장 넓게 소비한다"
              : "The US and India consume Korea most broadly"}
            summary={locale === "ko"
              ? "8개 주제가 모두 의미 있는 비중을 가진 유일한 시장."
              : "The only markets where all 8 topics carry meaningful weight."}
            open={isOpen(7)}
            onToggle={() => toggle(7)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>미국과 인도는 각각 466개 질문으로 가장 큰 시장이다. 두 시장은 같은 영어 검색어를 사용하므로 질문이 100% 동일하다.</p>
                  <p>사회 24%, 한류 20%, 외교 15%, 관광 14%, 언어 9%, 역사 9%, 경제 6%, 기술 4%. 8개 주제가 모두 의미 있는 비중을 가진다. 1위 사회(111)와 8위 기술(19) 사이에 6배 차이밖에 나지 않는다.</p>
                  <p>다른 시장과 비교하면 이례적이다. 독일은 1위(언어 71)와 3위(사회 17) 사이에 4배 차이. 아랍권은 하위 6개 주제가 전체의 34%에 불과하다.</p>
                  <p>영어는 특정 국가의 언어가 아니라 글로벌 정보 접근 언어다. 영어로 한국을 검색하는 사람은 한국에 대한 모든 종류의 관심사를 가지고 들어온다.</p>
                </>
              ) : (
                <>
                  <p>The US and India are each the largest market at 466 questions. They use the same English search terms, so their question sets are 100% identical.</p>
                  <p>Society 24%, Hallyu 20%, Diplomacy 15%, Tourism 14%, Language 9%, History 9%, Economy 6%, Tech 4%. All 8 topics carry meaningful weight. The gap between #1 Society (111) and #8 Tech (19) is only 6x.</p>
                  <p>This is unusual. Germany&apos;s gap between #1 (Language, 71) and #3 (Society, 17) is 4x. The Arab world&apos;s bottom 6 topics account for just 34%.</p>
                  <p>English is not a single country&apos;s language &mdash; it is a global information-access language. People searching Korea in English bring every kind of interest.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "미국·인도 주제 분포 — 균등한 확산" : "US & India topic distribution — even spread"}
              </div>
              <div className="space-y-2">
                {[
                  { label: D("사회", "Society"), val: 111, pct: "24%" },
                  { label: D("한류", "Hallyu"), val: 91, pct: "20%" },
                  { label: D("외교", "Diplomacy"), val: 69, pct: "15%" },
                  { label: D("관광", "Tourism"), val: 66, pct: "14%" },
                  { label: D("언어", "Language"), val: 43, pct: "9%" },
                  { label: D("역사", "History"), val: 41, pct: "9%" },
                  { label: D("경제", "Economy"), val: 26, pct: "6%" },
                  { label: D("기술", "Tech"), val: 19, pct: "4%" },
                ].map((d) => (
                  <div key={d.label.en} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-right text-[12px] text-secondary">{d.label[locale]}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded bg-border/20">
                      <div className="h-full rounded" style={{ width: `${Math.round((d.val / 111) * 100)}%`, backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)" }} />
                    </div>
                    <span className="w-12 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{d.val} ({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>


          {/* ── Finding 8 (was 3): Japan ── */}
          <FindingCard
            n={8}
            title={locale === "ko"
              ? "일본은 한국 문화를 묻지 않는다. 한국 사회를 묻는다"
              : "Japan does not ask about Korean culture. It asks about Korean society"}
            summary={locale === "ko"
              ? "한국을 새로운 문화로 보기보다 비교 가능한 이웃 사회로 이해하려 한다."
              : "Japan approaches Korea not as a novel culture but as a comparable society."}
            open={isOpen(8)}
            onToggle={() => toggle(8)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>일본 질문은 한류에 집중되지 않는다. 음식, 예절, 언어, 생활문화, 역사, 관광이 고르게 퍼져 있다.</p>
                  <p>실제 질문을 보면 패턴이 분명하다. 한국은 왜 매운 음식을 먹는가. 한국 예절은 무엇인가. 한국어 높임말은 왜 복잡한가. 한국인은 왜 나이를 묻는가.</p>
                  <p>이 질문들은 K-pop이나 드라마를 향하지 않는다. 한국 사회가 어떻게 작동하는가를 향한다.</p>
                  <p>질문 범위가 넓다는 것은 이미 한국을 어느 정도 알고 있다는 뜻이기도 하다. 인도네시아가 &ldquo;한국은 무엇으로 유명한가&rdquo;를 묻는 동안, 일본은 &ldquo;한국의 교육 시스템은 왜 치열한가&rdquo;를 묻는다.</p>
                </>
              ) : (
                <>
                  <p>Japan&apos;s questions do not concentrate on Hallyu. Food, etiquette, language, daily culture, history, and tourism spread evenly.</p>
                  <p>The actual questions: Why is Korean food spicy? What is Korean etiquette? Why is honorific speech complex? Why do Koreans ask about age?</p>
                  <p>These point toward how Korean society works, not toward K-pop or drama.</p>
                  <p>A wide question range also means prior knowledge. While Indonesia asks &ldquo;What is Korea famous for?,&rdquo; Japan asks &ldquo;Why is Korea&apos;s education system so intense?&rdquo;</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "일본 질문 이동 경로" : "Japan question flow"}
              </div>
              <div className="flex flex-col items-start gap-2">
                <FlowStep label={locale === "ko" ? "음식: 한국은 왜 매운가" : "Food: Why is Korean food spicy"} accent />
                <FlowArrow />
                <FlowStep label={locale === "ko" ? "예절: 한국 예절은 무엇인가" : "Etiquette: What is Korean etiquette"} />
                <FlowArrow />
                <FlowStep label={locale === "ko" ? "사회: 한국인은 왜 나이를 묻는가" : "Society: Why do Koreans ask about age"} />
                <FlowArrow />
                <FlowStep label={locale === "ko" ? "교육: 교육 시스템은 왜 치열한가" : "Education: Why is the system so intense"} />
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 9 (was 4): Germany ── */}
          <FindingCard
            n={9}
            title={locale === "ko"
              ? "독일은 한국을 배우기 전에 한국어를 이해하려 한다"
              : "Germany tries to understand Korean before learning about Korea"}
            summary={locale === "ko"
              ? "8개 시장 중 유일하게 언어가 1위. 학습법이 아니라 구조를 묻는다."
              : "The only market where language ranks first. Asking about structure, not study methods."}
            open={isOpen(9)}
            onToggle={() => toggle(9)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>독일은 8개 시장 중 유일하게 언어가 1위인 시장이다. 71개 질문으로, 2위 외교(34)의 두 배를 넘는다.</p>
                  <p>한국어는 왜 어려운가. 한글은 왜 만들어졌는가. 한국어 문법은 어떻게 다른가. 한국어 발음이 독일어와 비슷한가.</p>
                  <p>이 질문들은 한국어를 배우는 방법을 묻지 않는다. 한국어가 왜 그런 구조를 가졌는지를 묻는다.</p>
                  <p>독일은 한국을 설명받기보다 한국을 이해하는 방법부터 찾는다. 한국어라는 구조를 통해 한국에 접근한다.</p>
                </>
              ) : (
                <>
                  <p>Germany is the only market where language ranks first. 71 questions &mdash; more than double the second topic (diplomacy, 34).</p>
                  <p>Why is Korean hard? Why was Hangul created? How is Korean grammar different? Is Korean pronunciation similar to German?</p>
                  <p>These questions do not ask how to learn Korean. They ask why Korean has the structure it does.</p>
                  <p>Germany seeks the method of understanding Korea before being told about Korea. It approaches Korea through the structure of the Korean language.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "독일 언어 질문 클러스터" : "Germany language question cluster"}
              </div>
              <div className="space-y-2">
                {[
                  { q: D("왜 어려운가?", "Why is it hard?"), type: D("난이도 인식", "Difficulty perception") },
                  { q: D("왜 만들어졌는가?", "Why was it created?"), type: D("역사적 기원", "Historical origin") },
                  { q: D("어떻게 다른가?", "How is it different?"), type: D("구조 비교", "Structural comparison") },
                  { q: D("독일어와 비슷한가?", "Similar to German?"), type: D("자국어 대조", "Native language contrast") },
                ].map((d) => (
                  <div key={d.q.en} className="flex items-center gap-3 rounded-lg border border-border bg-[#F8FAFF] px-4 py-2.5">
                    <span className="text-[13px] font-medium text-navy">{d.q[locale]}</span>
                    <span className="ml-auto shrink-0 rounded-full bg-brand/8 px-2 py-0.5 text-[10px] font-medium text-brand">{d.type[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 10 (was 5): Indonesia ── */}
          <FindingCard
            n={10}
            title={locale === "ko"
              ? "인도네시아는 한국 자체를 이해하려 한다"
              : "Indonesia wants to understand Korea itself"}
            summary={locale === "ko"
              ? "한류는 끝이 아니라 한국을 이해하기 위한 출발점으로 작동한다."
              : "Hallyu functions not as the destination but as the starting point."}
            open={isOpen(10)}
            onToggle={() => toggle(10)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>인도네시아는 한류 질문 비중이 높다(53개, 28%). 그런데 질문을 자세히 보면 팬덤 질문이 아니라 입문 질문이 많다.</p>
                  <p>한국은 무엇으로 유명한가. 왜 K-pop이 인기 있는가. 한국 문화는 어떤 특징이 있는가. 한국은 어떤 나라인가.</p>
                  <p>동시에 외교 질문도 56개로 한류(53)와 거의 같다. 한국을 처음 알아가면서 동시에 지정학적 한국도 함께 인식하고 있다.</p>
                  <p>인도네시아에서 한류는 끝이 아니라 한국을 이해하기 위한 출발점으로 작동한다.</p>
                </>
              ) : (
                <>
                  <p>Indonesia has a high Hallyu share &mdash; 53 questions, 28% of total. But these are introductory questions, not fandom questions.</p>
                  <p>What is Korea famous for? Why is K-pop popular? What are the characteristics of Korean culture? What kind of country is Korea?</p>
                  <p>At the same time, diplomacy questions total 56 &mdash; nearly matching Hallyu. Indonesia is discovering Korea while simultaneously absorbing its geopolitical identity.</p>
                  <p>In Indonesia, Hallyu functions not as the destination but as the starting point for understanding Korea.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "인도네시아 입문형 질문" : "Indonesia introductory questions"}
              </div>
              <div className="space-y-1.5">
                {[
                  D("한국은 무엇으로 유명한가?", "What is Korea famous for?"),
                  D("왜 K-pop이 인기 있는가?", "Why is K-pop popular?"),
                  D("한국 문화는 어떤 특징이 있는가?", "What are the characteristics of Korean culture?"),
                  D("한국은 어떤 나라인가?", "What kind of country is Korea?"),
                ].map((q, i) => (
                  <div key={i} className="rounded-lg bg-brand/5 px-4 py-2.5">
                    <span className="text-[13px] font-medium text-navy">{q[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 11 (was 6): Brazil ── */}
          <FindingCard
            n={11}
            title={locale === "ko"
              ? "브라질은 K-pop과 북한을 동시에 본다"
              : "Brazil sees K-pop and North Korea at the same time"}
            summary={locale === "ko"
              ? "문화 국가와 지정학적 국가가 동시에 작동하는 유일한 시장."
              : "The only market where cultural Korea and geopolitical Korea operate simultaneously."}
            open={isOpen(11)}
            onToggle={() => toggle(11)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>브라질 질문에는 두 개의 흐름이 존재한다. 하나는 한류(49개). 다른 하나는 분단(62개).</p>
                  <p>대부분의 시장은 하나의 흐름이 지배한다. 그러나 브라질은 두 흐름이 동시에 강하게 나타나는 유일한 시장이다.</p>
                  <p>한류를 통해 한국을 알게 된 사람이 분단을 검색하고, 국제 뉴스에서 북한을 본 사람이 K-pop을 검색한다. 두 경로가 서로를 소환한다.</p>
                  <p>브라질에서 한국은 문화 국가이면서 동시에 지정학적 국가다. 이 두 이미지는 경쟁하지 않는다. 공존한다.</p>
                </>
              ) : (
                <>
                  <p>Two currents run through Brazil&apos;s questions. One is Hallyu (49). The other is division (62).</p>
                  <p>Most markets are dominated by one current. But Brazil is the only market where both currents appear strongly at once.</p>
                  <p>Someone who discovered Korea through Hallyu searches for division. Someone who saw North Korea in the news searches for K-pop. The two pathways summon each other.</p>
                  <p>In Brazil, Korea is simultaneously a cultural nation and a geopolitical one. These two images do not compete. They coexist.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "브라질 이중 흐름 구조" : "Brazil dual-flow structure"}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col items-center gap-2 rounded-lg bg-brand/5 p-4">
                  <FlowStep label="K-pop" accent />
                  <FlowArrow />
                  <FlowStep label={locale === "ko" ? "드라마" : "Drama"} />
                  <FlowArrow />
                  <FlowStep label={locale === "ko" ? "한국 문화" : "Korean culture"} />
                  <FlowArrow />
                  <span className="rounded-md border-2 border-brand/30 bg-white px-3 py-1.5 text-[12px] font-bold text-navy">
                    {locale === "ko" ? "한국" : "Korea"}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg bg-navy/5 p-4">
                  <FlowStep label={locale === "ko" ? "북한" : "North Korea"} />
                  <FlowArrow />
                  <FlowStep label={locale === "ko" ? "전쟁" : "War"} />
                  <FlowArrow />
                  <FlowStep label={locale === "ko" ? "분단" : "Division"} />
                  <FlowArrow />
                  <span className="rounded-md border-2 border-navy/30 bg-white px-3 py-1.5 text-[12px] font-bold text-navy">
                    {locale === "ko" ? "한국" : "Korea"}
                  </span>
                </div>
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 12: Arab ── */}
          <FindingCard
            n={12}
            title={locale === "ko"
              ? "아랍권은 한국을 문화보다 국가로 먼저 본다"
              : "The Arab world sees Korea as a state before a culture"}
            summary={locale === "ko"
              ? "외교와 한류가 전체의 66%. 사회·관광·경제는 거의 공백."
              : "Diplomacy and Hallyu account for 66%. Society, tourism, economy are near-blank."}
            open={isOpen(12)}
            onToggle={() => toggle(12)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>아랍권은 8개 시장 중 가장 집중도가 높은 시장이다. 전체 141개 질문 중 외교(47)와 한류(46)가 전체의 66%를 차지한다.</p>
                  <p>외교가 한류를 1개 차이로 앞선다. 그러나 질문의 성격이 다르다. 아랍권의 외교 질문은 북한, 국가 체제, 안보에 집중된다.</p>
                  <p>사회(6개), 관광(3개), 경제(1개)는 거의 공백이다. 한국의 일상, 여행, 경제에 대한 관심이 아직 형성되지 않았다.</p>
                  <p>한국은 아직 알아가야 할 국가이지, 경험할 수 있는 사회가 아니다.</p>
                </>
              ) : (
                <>
                  <p>The Arab world is the most concentrated market of all 8. Of 141 total questions, diplomacy (47) and Hallyu (46) account for 66%.</p>
                  <p>Diplomacy edges Hallyu by just 1. Arab diplomacy questions concentrate on North Korea, state systems, and security.</p>
                  <p>Society (6), tourism (3), and economy (1) are near-blank. Interest in Korea&apos;s daily life, travel, and economy has not yet formed.</p>
                  <p>Korea is still a state to be understood, not a society to be experienced.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "아랍권 주제 분포" : "Arab market topic distribution"}
              </div>
              <div className="space-y-2">
                {[
                  { label: D("외교", "Diplomacy"), val: 47, dark: true },
                  { label: D("한류", "Hallyu"), val: 46, dark: false },
                  { label: D("관광", "Tourism"), val: 12, dark: false },
                  { label: D("언어", "Language"), val: 11, dark: false },
                  { label: D("기술", "Tech"), val: 10, dark: false },
                  { label: D("역사", "History"), val: 8, dark: false },
                  { label: D("사회", "Society"), val: 6, dark: false },
                  { label: D("경제", "Economy"), val: 1, dark: false },
                ].map((d) => (
                  <div key={d.label.en} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-right text-[12px] text-secondary">{d.label[locale]}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded bg-border/20">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${Math.round((d.val / 47) * 100)}%`,
                          backgroundColor: d.dark ? "var(--color-navy, #1e293b)" : "color-mix(in srgb, var(--accent) 50%, transparent)",
                        }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FindingCard>

          {/* ── Finding 13: Korea self-conscious ── */}
          <FindingCard
            n={13}
            title={locale === "ko"
              ? "한국인은 한국보다 한국의 이미지를 검색한다"
              : "Koreans search for how Korea looks more than what Korea is"}
            summary={locale === "ko"
              ? "8개 시장 중 한국만 '한국이 어떻게 보이는지'를 묻는다."
              : "The only market that asks how Korea looks rather than what Korea is."}
            open={isOpen(13)}
            onToggle={() => toggle(13)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>한국 시장의 1위 주제는 사회(49개)다. 미국·인도(각 사회 111개)와 비슷해 보인다.</p>
                  <p>그러나 질문 내용이 완전히 다르다. 미국·인도의 사회 질문은 &ldquo;한국인은 왜 성형을 하는가&rdquo; &ldquo;한국의 자살률은 왜 높은가&rdquo;처럼 현상을 묻는다. 한국 시장의 사회 질문은 &ldquo;외국인은 한국인을 어떻게 보는가&rdquo; &ldquo;한국인의 특징은 무엇인가&rdquo;처럼 이미지를 묻는다.</p>
                  <p>다른 나라는 한국을 이해하려 한다. 한국은 자신이 어떻게 이해되고 있는지를 확인하려 한다.</p>
                  <p>이 차이는 8개 시장 중 한국에서만 나타난다.</p>
                </>
              ) : (
                <>
                  <p>Korea&apos;s top topic is society (49 questions). At first glance, similar to the US and India (111 each).</p>
                  <p>But the content is entirely different. US and India society questions ask about phenomena: &ldquo;Why plastic surgery?&rdquo; &ldquo;Why high suicide rate?&rdquo; Korean society questions ask about image: &ldquo;How do foreigners see Koreans?&rdquo; &ldquo;What are Korean characteristics?&rdquo;</p>
                  <p>Other countries try to understand Korea. Korea tries to verify how it is being understood.</p>
                  <p>This difference appears only in Korea among all 8 markets.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {locale === "ko" ? "같은 \"사회\" 주제, 다른 질문" : "Same topic \"Society,\" different questions"}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-brand/5 p-4">
                  <div className="text-[11px] font-semibold text-brand">{locale === "ko" ? "미국·인도" : "US & India"}</div>
                  <div className="mt-2 space-y-1 text-[12px] text-secondary">
                    <p>{locale === "ko" ? "한국인은 왜 성형을 하는가" : "Why do Koreans get plastic surgery"}</p>
                    <p>{locale === "ko" ? "한국의 자살률은 왜 높은가" : "Why is the suicide rate high in Korea"}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-medium text-brand">{locale === "ko" ? "→ 현상을 묻는다" : "→ Asks about phenomena"}</div>
                </div>
                <div className="rounded-lg bg-navy/5 p-4">
                  <div className="text-[11px] font-semibold text-navy">{locale === "ko" ? "한국" : "Korea"}</div>
                  <div className="mt-2 space-y-1 text-[12px] text-secondary">
                    <p>{locale === "ko" ? "외국인은 한국인을 어떻게 보는가" : "How do foreigners see Koreans"}</p>
                    <p>{locale === "ko" ? "한국인의 특징은 무엇인가" : "What are Korean characteristics"}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-medium text-navy">{locale === "ko" ? "→ 이미지를 묻는다" : "→ Asks about image"}</div>
                </div>
              </div>
            </div>
          </FindingCard>

        </div>
      </DocSection>

      {/* ══════════════════════════════════════════════════════════════
          GROUP C: 종합 결론
      ══════════════════════════════════════════════════════════════ */}
      <DocSection>
        <GroupHeader label="C" title={D("종합 결론", "Synthesis")} count={2} locale={locale} />
        <div className="space-y-3">

          {/* ── Finding 14 (was 14): Market profiles ── */}
          <FindingCard
            n={14}
            title={locale === "ko"
              ? "8개 시장은 8개의 서로 다른 한국을 묻고 있다"
              : "8 markets ask about 8 different Koreas"}
            summary={locale === "ko"
              ? "사회형, 구조형, 입문형, 이중서사형, 국가형, 광역형, 자의식형."
              : "Society, Structure, Intro, Dual-narrative, State, Broad, Self-conscious types."}
            open={isOpen(14)}
            onToggle={() => toggle(14)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>지금까지의 발견을 종합하면, 각 시장이 묻는 한국은 하나의 유형으로 분류될 수 있다.</p>
                  <p>일본은 사회형이다. 한국을 비교 가능한 이웃 사회로 보고, 작동 방식을 묻는다.</p>
                  <p>독일은 구조형이다. 한국어라는 구조를 통해 한국에 접근한다.</p>
                  <p>인도네시아는 입문형이다. 한국 자체가 무엇인지를 묻고, 한류를 출발점으로 사용한다.</p>
                  <p>브라질은 이중서사형이다. 문화 국가와 지정학적 국가가 동시에 작동한다.</p>
                  <p>아랍권은 국가형이다. 한국을 문화보다 국가 체제로 먼저 이해한다.</p>
                  <p>미국은 광역형이다. 가장 넓은 질문 분포를 가지지만 깊이 들어가지 않는다.</p>
                  <p>인도는 광역형이다. 미국과 동일한 영어 검색어를 사용하며, 같은 균등 분포를 보인다.</p>
                  <p>한국은 자의식형이다. 한국 자체보다 한국이 어떻게 보이는지를 묻는 유일한 시장이다.</p>
                </>
              ) : (
                <>
                  <p>Synthesizing the findings, each market&apos;s Korea can be classified into a type.</p>
                  <p>Japan is the society type. It sees Korea as a comparable neighboring society.</p>
                  <p>Germany is the structure type. It approaches Korea through language structure.</p>
                  <p>Indonesia is the introductory type. It asks what Korea itself is.</p>
                  <p>Brazil is the dual-narrative type. Cultural and geopolitical Korea operate simultaneously.</p>
                  <p>The Arab world is the state type. It understands Korea as a state system first.</p>
                  <p>The US is the broad type. Widest distribution, no deep single-direction exploration.</p>
                  <p>India is the broad type. Same English search terms as the US, same even distribution.</p>
                  <p>Korea is the self-conscious type. The only market that asks how Korea looks.</p>
                </>
              )}
            </Prose>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
              <ProfileCard code="JP" label={D("일본", "Japan")} type={D("사회형", "Society")} locale={locale} />
              <ProfileCard code="DE" label={D("독일", "Germany")} type={D("구조형", "Structure")} locale={locale} />
              <ProfileCard code="ID" label={D("인도네시아", "Indonesia")} type={D("입문형", "Intro")} locale={locale} />
              <ProfileCard code="BR" label={D("브라질", "Brazil")} type={D("이중서사", "Dual")} locale={locale} />
              <ProfileCard code="AE" label={D("아랍권", "Arab")} type={D("국가형", "State")} locale={locale} />
              <ProfileCard code="US" label={D("미국", "US")} type={D("광역형", "Broad")} locale={locale} />
              <ProfileCard code="IN" label={D("인도", "India")} type={D("광역형", "Broad")} locale={locale} />
              <ProfileCard code="KR" label={D("한국", "Korea")} type={D("자의식형", "Self-aware")} locale={locale} />
            </div>
          </FindingCard>

          {/* ── Finding 15 (was 15): Questions reveal questioner ── */}
          <FindingCard
            n={15}
            title={locale === "ko"
              ? "질문은 한국을 설명하지 않는다. 질문하는 사람을 보여준다"
              : "Questions do not explain Korea. They reveal the questioner"}
            summary={locale === "ko"
              ? "1,540개의 질문은 한국에 대한 데이터이면서, 세상이 무엇을 중요하게 생각하는지 보여주는 데이터다."
              : "1,540 questions are data about Korea — and data about what the world considers important."}
            open={isOpen(15)}
            onToggle={() => toggle(15)}
          >
            <Prose>
              {locale === "ko" ? (
                <>
                  <p>처음에는 한국을 분석하려 했다. 1,540개의 질문을 읽으면 세계가 한국을 어떻게 이해하는지 알 수 있을 것이라 생각했다.</p>
                  <p>그러나 질문을 읽을수록 다른 사실이 나타났다.</p>
                  <p>일본의 질문에는 일본이 보인다. 이웃 사회를 비교하는 습관. 독일의 질문에는 독일이 보인다. 대상을 먼저 구조적으로 이해하려는 접근. 브라질의 질문에는 브라질이 보인다. 문화적 열정과 지정학적 관심이 분리되지 않는 세계관.</p>
                  <p>한국의 질문에는 한국이 보인다. 자신이 어떻게 보이는지를 끊임없이 확인하려는 자의식.</p>
                  <p>사람들은 한국에 대해 질문한다. 그러나 실제로는 자신이 중요하게 생각하는 것을 통해 한국을 이해한다. 질문은 대상을 설명하는 도구가 아니라 질문하는 사람을 비추는 거울이다.</p>
                </>
              ) : (
                <>
                  <p>We started by trying to analyze Korea. We thought 1,540 questions would reveal how the world understands Korea.</p>
                  <p>But the more we read, a different fact emerged.</p>
                  <p>In Japan&apos;s questions, you see Japan &mdash; the habit of comparing neighboring societies. In Germany&apos;s questions, you see Germany &mdash; understanding structurally first. In Brazil&apos;s questions, you see Brazil &mdash; cultural passion and geopolitical awareness unseparated.</p>
                  <p>In Korea&apos;s questions, you see Korea &mdash; a self-consciousness that constantly checks how it appears to others.</p>
                  <p>People ask about Korea. But in reality, they understand Korea through whatever they consider important. Questions are not tools that explain the subject &mdash; they are mirrors that reflect the questioner.</p>
                </>
              )}
            </Prose>
          </FindingCard>

        </div>

        {/* Final statement */}
        <div className="mt-8">
          <Accented label={locale === "ko" ? "결론" : "Conclusion"}>
            <p className="text-[19px] font-bold leading-[1.7] sm:text-[22px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
              {locale === "ko"
                ? "1,540개의 질문은 한국에 대한 데이터이면서 동시에 세상이 무엇을 중요하게 생각하는지 보여주는 데이터다."
                : "1,540 questions are data about Korea — and at the same time, data about what the world considers important."}
            </p>
          </Accented>
        </div>
      </DocSection>
    </>
  );
}
