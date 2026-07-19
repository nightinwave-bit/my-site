"use client";

import React from "react";
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
  { code: "US+IN", name: D("영어권", "English"), values: [56, 33, 61, 34, 67, 105, 26, 13] },
  { code: "DE", name: D("독일", "Germany"), values: [15, 71, 9, 10, 34, 17, 0, 10] },
  { code: "ID", name: D("인도네시아", "Indonesia"), values: [51, 11, 4, 20, 56, 15, 0, 6] },
  { code: "BR", name: D("브라질", "Brazil"), values: [46, 15, 1, 21, 62, 1, 2, 4] },
  { code: "AE", name: D("아랍권", "Arab"), values: [26, 11, 3, 6, 47, 4, 1, 10] },
  { code: "KR", name: D("한국", "Korea"), values: [20, 10, 10, 28, 19, 49, 13, 9] },
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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-[1.85] text-secondary sm:text-[16px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
      {children}
    </div>
  );
}

function QuestionExamples({ questions, locale }: { questions: L[]; locale: "ko" | "en" }) {
  return (
    <div className="mt-5 space-y-1.5">
      {questions.map((q, i) => (
        <div key={i} className="rounded-lg border border-border bg-white px-4 py-2.5">
          <span className="text-[14px] font-medium text-navy">{q[locale]}</span>
        </div>
      ))}
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

export function DataReport() {
  const { locale } = useLanguage();

  const heatmapMax = Math.max(...HEATMAP_DATA.flatMap((r) => r.values));

  return (
    <>
      {/* ── Finding 1 ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "발견 1" : "Finding 1"}</Kicker>
        <H2>
          {locale === "ko"
            ? "한류는 가장 큰 주제지만 가장 강한 인식은 아니다"
            : "Hallyu is the biggest topic, but not the strongest perception"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>한류는 전체 질문에서 가장 큰 비중을 차지한다.</p>
              <p>K-pop. 드라마. 뷰티. 음식. 문화.</p>
              <p>개별로 보면 가장 많은 질문이 모여 있다.</p>
              <p>하지만 흥미로운 점은 따로 있다.</p>
              <p>가장 큰 주제는 한류인데, 가장 큰 단일 개념은 여전히 분단이다.</p>
              <p>사람들은 K-pop을 묻고, 드라마를 묻고, 김치를 묻는다. 그런데 한국을 설명해야 하는 순간이 오면 북한. 분단. 전쟁. 통일. 로 돌아간다.</p>
              <p>이 차이는 중요하다. 사람들이 가장 많이 소비하는 한국과 사람들이 가장 먼저 설명하는 한국이 다르기 때문이다.</p>
              <p>1,540개 질문은 한류가 한국에 대한 관심을 넓혔지만, 한국을 규정하는 가장 강한 인식까지 바꾸지는 못했다는 사실을 보여준다.</p>
            </>
          ) : (
            <>
              <p>Hallyu commands the largest share of all questions.</p>
              <p>K-pop. Drama. Beauty. Food. Culture.</p>
              <p>Individually, they gather the most questions of any cluster.</p>
              <p>But the interesting point lies elsewhere.</p>
              <p>The biggest topic is Hallyu, yet the biggest single concept is still Division.</p>
              <p>People ask about K-pop, ask about dramas, ask about kimchi. But when the moment comes to explain Korea, they return to North Korea. Division. War. Reunification.</p>
              <p>This gap matters — because the Korea people consume most and the Korea people explain first are not the same.</p>
              <p>1,540 questions show that Hallyu has broadened interest in Korea, but has not yet displaced the strongest perception that defines it.</p>
            </>
          )}
        </Prose>

        {/* Visualization: Culture vs Division comparison */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              {locale === "ko" ? "문화 질문 (한류 전체)" : "Culture questions (all Hallyu)"}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[2.5rem] font-bold tabular-nums text-navy">332</span>
              <span className="text-[13px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
            </div>
            <div className="mt-2 text-[12px] text-muted-foreground">
              K-pop 34 + K-drama 77 + K-beauty 81 + {locale === "ko" ? "음식" : "Food"} 140
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-border/30">
              <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)" }} />
            </div>
          </div>
          <div className="rounded-xl border-2 border-navy/20 bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              {locale === "ko" ? "분단 (단일 개념)" : "Division (single concept)"}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[2.5rem] font-bold tabular-nums text-navy">242</span>
              <span className="text-[13px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
            </div>
            <div className="mt-2 text-[12px] text-muted-foreground">
              {locale === "ko" ? "하나의 개념으로 가장 큰 규모" : "Largest single concept"}
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-border/30">
              <div className="h-full rounded-full bg-navy/70" style={{ width: "73%" }} />
            </div>
          </div>
        </div>

        <KeyMessage>
          {locale === "ko"
            ? "가장 큰 주제 ≠ 가장 강한 인식"
            : "Biggest topic ≠ strongest perception"}
        </KeyMessage>
      </DocSection>

      {/* ── Finding 2 ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "발견 2" : "Finding 2"}</Kicker>
        <H2>
          {locale === "ko"
            ? "세계가 묻는 한국은 생각보다 정치적이다"
            : "The world’s Korea is more political than expected"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>한국을 처음 떠올리면 K-pop, 드라마, 뷰티를 예상하기 쉽다.</p>
              <p>그러나 질문 데이터는 다른 결과를 보여준다.</p>
              <p>분단. 북한. 전쟁. 통일. 관련 질문은 모든 시장에서 반복적으로 등장한다.</p>
              <p>특히 브라질, 아랍권, 인도네시아에서 강하게 나타난다.</p>
              <p>흥미로운 점은 일본이나 독일보다 오히려 한국과 거리가 먼 국가들에서 더 강하다는 점이다.</p>
              <p>이 국가들은 한국을 일상적으로 경험하지 않는다. 대신 국제 뉴스와 세계 정치 속에서 한국을 먼저 만난다.</p>
              <p>그래서 한국은 문화 국가 이전에 분단 국가로 인식되는 경우가 많다.</p>
              <p>1,540개 질문은 한류가 한국에 대한 관심을 만들었다는 사실과 한국이 여전히 지정학적 국가로 읽힌다는 사실이 동시에 존재함을 보여준다.</p>
            </>
          ) : (
            <>
              <p>When you first think of Korea, you might expect K-pop, drama, beauty.</p>
              <p>But the question data tells a different story.</p>
              <p>Division. North Korea. War. Reunification. These questions appear repeatedly across every market.</p>
              <p>They are especially strong in Brazil, the Arab world, and Indonesia.</p>
              <p>What makes this interesting is that they are stronger in countries far from Korea than in Japan or Germany.</p>
              <p>These countries do not experience Korea in daily life. Instead, they first encounter Korea through international news and world politics.</p>
              <p>So Korea is often perceived as a divided nation before a cultural one.</p>
              <p>1,540 questions show that two facts coexist: Hallyu has created interest in Korea, and Korea is still read as a geopolitical state.</p>
            </>
          )}
        </Prose>

        {/* Heatmap with division column highlighted */}
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
      </DocSection>

      {/* ── Finding 3 ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "발견 3" : "Finding 3"}</Kicker>
        <H2>
          {locale === "ko"
            ? "일본은 한국 문화를 묻지 않는다. 한국 사회를 묻는다"
            : "Japan doesn&apos;t ask about Korean culture. It asks about Korean society"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>일본 질문은 한류에 집중되지 않는다.</p>
              <p>음식. 예절. 언어. 생활문화. 역사. 관광.</p>
              <p>질문이 여러 영역으로 퍼져 있다.</p>
              <p>이것은 다른 시장과 비교하면 더욱 분명하다. 독일은 언어에 집중되고, 인도네시아는 한류에 집중되며, 브라질은 분단에 집중된다. 반면 일본은 특정 주제가 두드러지지 않는다.</p>
              <p>실제 질문을 보면 한국은 왜 매운가. 한국 예절은 무엇인가. 한국어 높임말은 왜 복잡한가. 같은 질문이 반복된다.</p>
              <p>일본이 궁금해하는 것은 특정 콘텐츠가 아니다. 한국 사회가 어떻게 작동하는가다.</p>
              <p>질문 범위가 넓다는 것은 이미 어느 정도 알고 있는 대상이라는 뜻이기도 하다.</p>
              <p>일본은 한국을 새로운 문화로 보기보다 비교 가능한 사회로 이해하려는 경향이 강하게 나타난다.</p>
            </>
          ) : (
            <>
              <p>Japan&apos;s questions do not concentrate on Hallyu.</p>
              <p>Food. Etiquette. Language. Daily culture. History. Tourism.</p>
              <p>Questions spread across many domains.</p>
              <p>This becomes clearer when compared with other markets. Germany concentrates on language, Indonesia on Hallyu, Brazil on division. Japan has no single dominant topic.</p>
              <p>Looking at the actual questions: Why is Korean food spicy? What is Korean etiquette? Why is Korean honorific speech so complex? These kinds of questions repeat.</p>
              <p>What Japan is curious about is not specific content. It&apos;s how Korean society works.</p>
              <p>A wide question range also means this is a subject they already know to some degree.</p>
              <p>Japan shows a strong tendency to understand Korea not as a novel culture, but as a comparable society.</p>
            </>
          )}
        </Prose>

        <QuestionExamples
          locale={locale}
          questions={[
            D("한국은 왜 매운 음식을 먹는가?", "Why do Koreans eat spicy food?"),
            D("한국 예절은 무엇인가?", "What is Korean etiquette?"),
            D("한국어 높임말은 왜 복잡한가?", "Why is Korean honorific speech complex?"),
            D("한국인은 왜 나이를 묻는가?", "Why do Koreans ask about age?"),
            D("한국의 교육 시스템은 왜 치열한가?", "Why is Korea's education system so intense?"),
          ]}
        />

        {/* Japan topic distribution mini-chart */}
        <div className="mt-6 rounded-xl border border-border bg-white p-5">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {locale === "ko" ? "일본 질문 분포" : "Japan question distribution"}
          </div>
          <div className="space-y-2">
            {[
              { topic: D("한류", "Hallyu"), w: 45, max: 45 },
              { topic: D("역사", "History"), w: 35, max: 45 },
              { topic: D("관광", "Tourism"), w: 21, max: 45 },
              { topic: D("사회", "Society"), w: 21, max: 45 },
              { topic: D("언어", "Language"), w: 12, max: 45 },
              { topic: D("외교", "Diplomacy"), w: 12, max: 45 },
              { topic: D("경제", "Economy"), w: 10, max: 45 },
              { topic: D("기술", "Tech"), w: 10, max: 45 },
            ].map((d) => (
              <div key={d.topic.en} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-right text-[12px] text-secondary">{d.topic[locale]}</span>
                <div className="h-5 flex-1 overflow-hidden rounded bg-border/20">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${Math.round((d.w / d.max) * 100)}%`,
                      backgroundColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{d.w}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground">
            {locale === "ko" ? "특정 주제가 지배하지 않는 균등한 분포" : "Evenly spread — no single topic dominates"}
          </div>
        </div>
      </DocSection>

      {/* ── Finding 4 ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "발견 4" : "Finding 4"}</Kicker>
        <H2>
          {locale === "ko"
            ? "독일은 한국을 배우기 전에 한국어를 이해하려 한다"
            : "Germany tries to understand Korean before learning about Korea"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>독일은 언어 난이도가 가장 큰 개념인 유일한 시장이다.</p>
              <p>중요한 것은 숫자가 아니다. 질문의 내용이다.</p>
              <p>한국어는 왜 어려운가. 한글은 왜 만들어졌는가. 한국어 문법은 어떻게 다른가.</p>
              <p>질문은 단순한 학습 방법보다 언어 자체를 이해하려는 방향으로 이어진다.</p>
              <p>다른 국가들이 한국은 무엇으로 유명한가, 왜 K-pop이 인기 있는가를 묻는 동안, 독일은 한국어가 어떤 언어인지를 묻는다.</p>
              <p>즉 한국을 설명받기보다 한국을 이해하는 방법부터 찾는다.</p>
              <p>1,540개 질문은 독일이 한국을 문화보다 구조를 통해 접근하는 경향을 보여준다.</p>
            </>
          ) : (
            <>
              <p>Germany is the only market where language difficulty is the largest concept.</p>
              <p>What matters is not the number. It&apos;s the content of the questions.</p>
              <p>Why is Korean hard? Why was Hangul created? How is Korean grammar different?</p>
              <p>Questions lead toward understanding the language itself, not just learning methods.</p>
              <p>While other countries ask what Korea is famous for or why K-pop is popular, Germany asks what kind of language Korean is.</p>
              <p>In other words, it seeks the method of understanding Korea before being told about Korea.</p>
              <p>1,540 questions show that Germany tends to approach Korea through structure rather than culture.</p>
            </>
          )}
        </Prose>

        <QuestionExamples
          locale={locale}
          questions={[
            D("한국어는 왜 어려운가?", "Why is Korean hard?"),
            D("한글은 왜 만들어졌는가?", "Why was Hangul created?"),
            D("한국어 문법은 어떻게 다른가?", "How is Korean grammar different?"),
            D("한국어 발음이 독일어와 비슷한가?", "Is Korean pronunciation similar to German?"),
            D("한국어를 배우는 가장 좋은 방법은?", "What is the best way to learn Korean?"),
          ]}
        />

        {/* Germany: language dominance comparison */}
        <div className="mt-6 rounded-xl border border-border bg-white p-5">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {locale === "ko" ? "독일 상위 3개 개념" : "Germany’s top 3 concepts"}
          </div>
          <div className="space-y-3">
            {[
              { label: D("언어", "Language"), val: 71, accent: true },
              { label: D("외교", "Diplomacy"), val: 34, accent: false },
              { label: D("사회", "Society"), val: 17, accent: false },
            ].map((d) => (
              <div key={d.label.en} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-right text-[13px] font-medium text-navy">{d.label[locale]}</span>
                <div className="h-6 flex-1 overflow-hidden rounded bg-border/20">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${Math.round((d.val / 71) * 100)}%`,
                      backgroundColor: d.accent
                        ? "color-mix(in srgb, var(--accent) 75%, transparent)"
                        : "color-mix(in srgb, var(--accent) 35%, transparent)",
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[12px] tabular-nums font-medium text-navy">{d.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground">
            {locale === "ko" ? "언어가 2위의 두 배 이상 — 다른 어떤 시장에도 없는 패턴" : "Language is more than double the second — a pattern unique to Germany"}
          </div>
        </div>
      </DocSection>

      {/* ── Finding 5 ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "발견 5" : "Finding 5"}</Kicker>
        <H2>
          {locale === "ko"
            ? "인도네시아는 한국 자체를 이해하려 한다"
            : "Indonesia wants to understand Korea itself"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>인도네시아는 한류 질문 비중이 높다.</p>
              <p>하지만 질문을 자세히 보면 팬덤 질문보다 입문 질문이 많다.</p>
              <p>한국은 무엇으로 유명한가. 왜 K-pop이 인기 있는가. 한국 문화는 어떤 특징이 있는가.</p>
              <p>질문은 특정 가수나 특정 작품보다 한국이라는 나라 자체로 향한다.</p>
              <p>일본이 한국 사회를 묻고, 독일이 한국어를 묻는다면, 인도네시아는 한국 그 자체를 묻는다.</p>
              <p>1,540개 질문은 한류가 끝이 아니라 한국을 이해하기 위한 출발점으로 작동하고 있음을 보여준다.</p>
            </>
          ) : (
            <>
              <p>Indonesia has a high share of Hallyu questions.</p>
              <p>But look closer and introductory questions outnumber fandom questions.</p>
              <p>What is Korea famous for? Why is K-pop popular? What are the characteristics of Korean culture?</p>
              <p>Questions point not toward specific artists or specific works, but toward Korea as a country.</p>
              <p>If Japan asks about Korean society and Germany asks about Korean language, Indonesia asks about Korea itself.</p>
              <p>1,540 questions show that Hallyu is not the end — it is functioning as a starting point for understanding Korea.</p>
            </>
          )}
        </Prose>

        <QuestionExamples
          locale={locale}
          questions={[
            D("한국은 무엇으로 유명한가?", "What is Korea known for?"),
            D("왜 K-pop이 인기 있는가?", "Why is K-pop popular?"),
            D("한국 문화는 어떤 특징이 있는가?", "What are the characteristics of Korean culture?"),
            D("한국은 어떤 나라인가?", "What kind of country is Korea?"),
          ]}
        />
      </DocSection>

      {/* ── Finding 6 ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "발견 6" : "Finding 6"}</Kicker>
        <H2>
          {locale === "ko"
            ? "브라질은 K-pop과 북한을 동시에 본다"
            : "Brazil sees K-pop and North Korea at the same time"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>브라질 질문에는 두 개의 흐름이 존재한다.</p>
              <p>하나는 한류다. K-pop. 드라마. 음식.</p>
              <p>다른 하나는 분단이다. 북한. 전쟁. 통일.</p>
              <p>대부분 시장은 하나의 흐름에 집중된다. 그러나 브라질은 두 흐름이 동시에 강하게 나타난다.</p>
              <p>한국을 묻다가 북한으로 이동하고, 드라마를 묻다가 분단으로 이동한다.</p>
              <p>브라질에서 한국은 문화 국가이면서 동시에 지정학적 국가다.</p>
              <p>1,540개 질문은 국가 이미지가 하나의 이야기로 만들어지지 않는다는 사실을 보여준다.</p>
            </>
          ) : (
            <>
              <p>In Brazil&apos;s questions, two currents exist.</p>
              <p>One is Hallyu. K-pop. Drama. Food.</p>
              <p>The other is Division. North Korea. War. Reunification.</p>
              <p>Most markets concentrate on one current. But in Brazil, both currents appear strongly at the same time.</p>
              <p>Questions about Korea shift to North Korea; questions about drama shift to division.</p>
              <p>In Brazil, Korea is simultaneously a cultural nation and a geopolitical one.</p>
              <p>1,540 questions show that a country&apos;s image is not built from a single story.</p>
            </>
          )}
        </Prose>

        {/* Brazil dual-flow visualization */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              {locale === "ko" ? "흐름 1: 한류" : "Current 1: Hallyu"}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[2rem] font-bold tabular-nums text-navy">46</span>
              <span className="text-[12px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">K-pop · {locale === "ko" ? "드라마" : "Drama"} · {locale === "ko" ? "뷰티" : "Beauty"} · {locale === "ko" ? "음식" : "Food"}</div>
          </div>
          <div className="rounded-xl border-2 border-navy/20 bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-navy">
              {locale === "ko" ? "흐름 2: 분단" : "Current 2: Division"}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[2rem] font-bold tabular-nums text-navy">62</span>
              <span className="text-[12px] text-secondary">{locale === "ko" ? "개 질문" : "questions"}</span>
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">{locale === "ko" ? "북한 · 전쟁 · 통일 · 분단" : "North Korea · War · Reunification · Division"}</div>
          </div>
        </div>
      </DocSection>

      {/* ── Finding 7 ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "발견 7" : "Finding 7"}</Kicker>
        <H2>
          {locale === "ko"
            ? "한국인은 한국보다 한국의 이미지를 검색한다"
            : "Koreans search for Korea&apos;s image more than Korea itself"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>한국 시장에서 가장 많이 등장한 질문은 국민성과 이미지다.</p>
              <p>외국인은 한국인을 어떻게 보는가. 한국인의 특징은 무엇인가. 한국은 어떤 이미지인가.</p>
              <p>이 질문들은 다른 시장에서는 거의 나타나지 않는다.</p>
              <p>흥미로운 점은 한국인은 한국을 설명하기보다 한국이 어떻게 보이는지를 궁금해한다는 점이다.</p>
              <p>다른 나라가 한국을 이해하려 한다면, 한국은 자신이 어떻게 이해되고 있는지를 확인하려 한다.</p>
              <p>1,540개 질문은 한국 시장이 가장 자의식적인 시장임을 보여준다.</p>
            </>
          ) : (
            <>
              <p>The most frequent questions from the Korean market are about national character and image.</p>
              <p>How do foreigners see Koreans? What are Korean characteristics? What image does Korea have?</p>
              <p>These questions barely appear in other markets.</p>
              <p>What is interesting is that Koreans are curious not about explaining Korea, but about how Korea is perceived.</p>
              <p>While other countries try to understand Korea, Korea tries to verify how it is being understood.</p>
              <p>1,540 questions show that the Korean market is the most self-conscious market of all.</p>
            </>
          )}
        </Prose>

        {/* Korea self-image vs others */}
        <div className="mt-6 rounded-xl border border-border bg-white p-5">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {locale === "ko" ? "한국 시장 상위 개념" : "Korean market top concepts"}
          </div>
          <div className="space-y-2">
            {[
              { label: D("사회·종교·일상", "Society & Daily Life"), val: 49 },
              { label: D("한국인과 국민성", "People & Character"), val: 34 },
              { label: D("문화·전통·유산", "Culture & Heritage"), val: 28 },
              { label: D("한국 음식", "Korean Cuisine"), val: 22 },
              { label: D("한류", "Hallyu"), val: 20 },
              { label: D("분단", "Division"), val: 19 },
            ].map((d) => (
              <div key={d.label.en} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-[12px] text-secondary sm:w-36">{d.label[locale]}</span>
                <div className="h-5 flex-1 overflow-hidden rounded bg-border/20">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${Math.round((d.val / 49) * 100)}%`,
                      backgroundColor: d.label.en === "People & Character"
                        ? "var(--color-navy, #1e293b)"
                        : "color-mix(in srgb, var(--accent) 50%, transparent)",
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">{d.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground">
            {locale === "ko"
              ? "\"한국인과 국민성\" — 다른 시장에서는 이 개념이 1위가 되는 경우가 없다"
              : "\"People & Character\" — no other market has this concept at #1"}
          </div>
        </div>
      </DocSection>

      {/* ── Finding 8 ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "발견 8" : "Finding 8"}</Kicker>
        <H2>
          {locale === "ko"
            ? "질문은 한국을 설명하는 데이터가 아니다"
            : "Questions are not data that explains Korea"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>처음에는 한국을 분석하려 했다.</p>
              <p>하지만 질문을 읽을수록 다른 사실이 보인다.</p>
              <p>일본 질문에는 일본이 보인다. 독일 질문에는 독일이 보인다. 브라질 질문에는 브라질이 보인다. 인도네시아 질문에는 인도네시아가 보인다.</p>
              <p>사람들은 한국에 대해 질문한다. 하지만 실제로는 자신이 중요하게 생각하는 문제를 통해 한국을 이해한다.</p>
              <p>어떤 국가는 언어를 통해 접근하고, 어떤 국가는 사회를 통해 접근하며, 어떤 국가는 한류를 통해 접근한다.</p>
              <p>1,540개의 질문은 한국에 대한 데이터이면서 동시에 세상이 무엇을 중요하게 생각하는지 보여주는 데이터다.</p>
            </>
          ) : (
            <>
              <p>At first, we tried to analyze Korea.</p>
              <p>But the more we read the questions, the more a different fact emerged.</p>
              <p>In Japan&apos;s questions, you see Japan. In Germany&apos;s questions, you see Germany. In Brazil&apos;s questions, you see Brazil. In Indonesia&apos;s questions, you see Indonesia.</p>
              <p>People ask questions about Korea. But in reality, they understand Korea through whatever they consider important.</p>
              <p>Some countries approach through language, some through society, some through Hallyu.</p>
              <p>1,540 questions are data about Korea and, at the same time, data about what the world considers important.</p>
            </>
          )}
        </Prose>
      </DocSection>

      {/* ── Conclusion ── */}
      <DocSection>
        <div className="py-4 sm:py-8">
          <Accented label={locale === "ko" ? "결론" : "Conclusion"}>
            <p className="text-[19px] font-bold leading-[1.7] sm:text-[22px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
              {locale === "ko"
                ? "우리는 한국을 분석한 것이 아니다. 세상이 한국을 이해하는 방식을 관찰했다."
                : "We did not analyze Korea. We observed how the world understands Korea."}
            </p>
          </Accented>
        </div>
      </DocSection>
    </>
  );
}
