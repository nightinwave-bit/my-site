"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });
const tx = (v: L, l: Locale) => v[l];

/* ── section shell ── */
function Section({
  children,
  tint,
}: {
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section className={tint ? "border-b border-border bg-tint" : "border-b border-border"}>
      <div className="container py-14 sm:py-16">{children}</div>
    </section>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[24ch] text-balance text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-pretty text-[17px] leading-relaxed text-secondary">
      {children}
    </p>
  );
}

/* ── data ── */

interface AnalysisLayer {
  n: string;
  name: L;
  definition: L;
  whyNeeded: L;
}
const LAYERS: AnalysisLayer[] = [
  {
    n: "01",
    name: D("질문", "Question"),
    definition: D("사람들이 남긴 개별 흔적", "Individual traces people leave behind"),
    whyNeeded: D(
      "국가 이해는 질문에서 시작되기 때문이다. 질문은 사람들이 무엇을 모르는지, 무엇을 알고 싶은지를 보여주는 가장 솔직한 신호다.",
      "Because understanding a nation begins with questions. Questions are the most honest signal of what people don't know and want to know.",
    ),
  },
  {
    n: "02",
    name: D("개념", "Concept"),
    definition: D("반복되는 질문 속 공통 의미", "Common meaning across repeated questions"),
    whyNeeded: D(
      "질문 하나로는 패턴을 볼 수 없기 때문이다. '한국어 어렵나', '한국어 배우기 쉬운가', '한국어 문법이 복잡한가'는 각각 다른 질문이지만 하나의 개념 — 언어 접근성 — 을 공유한다.",
      "Because a single question cannot reveal patterns. 'Is Korean hard,' 'Is Korean easy to learn,' and 'Is Korean grammar complex' are different questions sharing one concept — language accessibility.",
    ),
  },
  {
    n: "03",
    name: D("주제", "Theme"),
    definition: D("관련 개념의 집합", "A cluster of related concepts"),
    whyNeeded: D(
      "사람들의 관심 영역을 파악하기 위해서다. 개별 개념은 흩어져 있지만, 주제로 묶이면 '한국 언어'라는 관심 영역이 보인다.",
      "To identify areas of interest. Individual concepts scatter, but when grouped into themes, an interest area like 'Korean language' becomes visible.",
    ),
  },
  {
    n: "04",
    name: D("서사", "Narrative"),
    definition: D("주제가 연결된 이야기", "The story themes form together"),
    whyNeeded: D(
      "국가는 사실이 아니라 이야기로 기억되기 때문이다. '한국어는 어렵지만 K-팝 덕분에 배우는 사람이 많다'는 서사는 개별 사실보다 강력하게 인식을 형성한다.",
      "Because nations are remembered through stories, not facts. The narrative 'Korean is hard but many learn it because of K-pop' shapes perception more powerfully than individual facts.",
    ),
  },
  {
    n: "05",
    name: D("인식", "Perception"),
    definition: D("최종적으로 형성된 국가 이미지", "The national image ultimately formed"),
    whyNeeded: D(
      "질문의 사회적 결과를 이해하기 위해서다. 인식은 질문이 만드는 최종 산물이며, 국가 이미지의 실체다. '한국은 문화 강국이다'라는 인식은 수천 개의 질문이 축적되어 형성된 것이다.",
      "To understand the social consequences of questions. Perception is the final product questions create — the substance of national image. 'Korea is a cultural powerhouse' is a perception formed by thousands of accumulated questions.",
    ),
  },
];

interface PathwayStep { label: L; sub: L }
const EXAMPLE_PATHWAY: PathwayStep[] = [
  { label: D("Why is K-pop so popular?", "Why is K-pop so popular?"), sub: D("질문", "Question") },
  { label: D("K-pop", "K-pop"), sub: D("개념", "Concept") },
  { label: D("한류", "Hallyu"), sub: D("주제", "Theme") },
  { label: D("문화 강국", "Cultural powerhouse"), sub: D("서사", "Narrative") },
  { label: D("한국은 문화 강국이다", "Korea is a cultural powerhouse"), sub: D("인식", "Perception") },
];

interface OldNewPair { before: L; after: L }
const SHIFTS: OldNewPair[] = [
  {
    before: D("질문을 키워드로 분해한다", "Decompose questions into keywords"),
    after: D("질문의 구조를 읽는다", "Read the structure of questions"),
  },
  {
    before: D("빈도를 센다", "Count frequencies"),
    after: D("패턴을 발견한다", "Discover patterns"),
  },
  {
    before: D("답변을 설계한다", "Design answers"),
    after: D("답변 생태계를 설계한다", "Design an answer ecosystem"),
  },
  {
    before: D("국가가 메시지를 만든다", "The state creates messages"),
    after: D("질문이 지식을 만든다", "Questions create knowledge"),
  },
];

interface PlatformLayer { name: L; role: L }
const PLATFORM_LAYERS: PlatformLayer[] = [
  { name: D("질문 수집", "Question collection"), role: D("세계가 무엇을 묻는지 실시간으로 감지한다", "Detect what the world asks in real time") },
  { name: D("구조 분석", "Structure analysis"), role: D("질문이 어떤 인식을 만드는지 읽는다", "Read what perceptions questions create") },
  { name: D("답변 연결", "Answer connection"), role: D("질문과 답변을 연결하는 생태계를 운영한다", "Operate the ecosystem connecting questions to answers") },
  { name: D("인식 추적", "Perception tracking"), role: D("국가 이미지가 어떻게 변하는지 관찰한다", "Observe how national image changes") },
];

/* ── components ── */

function PathwayTrace({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {EXAMPLE_PATHWAY.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center rounded-xl border border-border bg-white px-4 py-3 text-center">
            <span className="text-[12px] font-mono text-muted-foreground">{tx(s.sub, locale)}</span>
            <span className="mt-0.5 text-[14px] font-semibold text-navy">{tx(s.label, locale)}</span>
          </div>
          {i < EXAMPLE_PATHWAY.length - 1 && (
            <ChevronRight className="h-4 w-4 shrink-0 text-brand" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── main ── */

export function MethodView() {
  const { locale } = useLanguage();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <Navbar />
      <main>
        {/* ── hero ── */}
        <section className="border-b border-border">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container relative pb-16 pt-28 sm:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                {locale === "ko" ? "연구 방법" : "Method"}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-navy sm:text-5xl md:text-6xl"
            >
              {locale === "ko" ? "질문은 어떻게 지식이 되는가" : "How Questions Become Knowledge"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-secondary sm:text-xl"
            >
              {locale === "ko"
                ? "질문은 개별적으로 존재하지 않는다. 반복되고, 연결되고, 축적되며 하나의 인식 구조를 만든다. Method는 질문이 국가 이미지로 전환되는 과정을 설명한다."
                : "Questions do not exist in isolation. They repeat, connect, and accumulate to form a structure of perception. Method explains the process by which questions transform into national image."}
            </motion.p>
          </div>
        </section>

        {/* ── 1. problem ── */}
        <Section>
          <Kicker>{locale === "ko" ? "문제 제기" : "The problem"}</Kicker>
          <H2>{locale === "ko" ? "질문은 왜 분석되어야 하는가" : "Why questions must be analyzed"}</H2>
          <Lead>
            {locale === "ko"
              ? "대부분의 질문은 개별적인 호기심으로 보인다. 그러나 수천 개의 질문을 함께 보면 패턴이 나타난다. 그 패턴은 사람들이 국가를 이해하는 방식을 보여준다."
              : "Most questions look like individual curiosities. But when thousands of questions are viewed together, patterns emerge. Those patterns reveal how people understand a nation."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "우리는 질문을 답변하기 전에 먼저 읽어야 한다. 질문의 내용뿐 아니라 질문이 모여 만드는 구조를 읽어야 한다. 어떤 질문이 반복되는가, 어떤 질문이 빠져 있는가, 어떤 질문이 특정 국가에서만 나오는가 — 이것이 국가 이미지의 실제 지형이다."
              : "We must read questions before answering them. Not just their content, but the structure they form together. Which questions repeat, which are absent, which appear only in certain countries — this is the actual terrain of national image."}
          </Lead>
        </Section>

        {/* ── 2. limitations ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "기존 방식의 한계" : "Limits of existing approaches"}</Kicker>
          <H2>{locale === "ko" ? "질문은 검색어가 아니다" : "Questions are not search terms"}</H2>
          <Lead>
            {locale === "ko"
              ? "전통적인 데이터 분석은 질문을 키워드로 분해한다. 그러나 질문은 단어의 집합이 아니다. 질문은 관심의 방향이며 이해의 출발점이다."
              : "Traditional data analysis decomposes questions into keywords. But a question is not a collection of words. It is a direction of interest and a starting point for understanding."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "질문을 단순 빈도 분석으로 환원하면 질문의 의미를 잃게 된다. '한국은 안전한가'를 '한국', '안전'이라는 키워드로 분해하는 순간, 이 질문이 드러내는 불안과 관심은 사라진다."
              : "Reducing questions to frequency analysis loses their meaning. The moment you decompose 'Is Korea safe' into the keywords 'Korea' and 'safe,' the anxiety and interest this question reveals disappears."}
          </Lead>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {SHIFTS.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5">
                <div className="text-[14px] text-muted-foreground line-through decoration-muted-foreground/40">{tx(s.before, locale)}</div>
                <div className="mt-1.5 text-[15px] font-semibold text-navy">{tx(s.after, locale)}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. core declaration ── */}
        <Section>
          <Kicker>{locale === "ko" ? "핵심 선언" : "Core declaration"}</Kicker>
          <p className="max-w-[40ch] text-[26px] font-bold leading-snug tracking-tight text-brand sm:text-[32px]">
            {locale === "ko"
              ? "우리는 질문을 수집하지 않는다. 질문이 만드는 구조를 읽는다."
              : "We do not collect questions. We read the structures they create."}
          </p>
          <Lead>
            {locale === "ko"
              ? "1,540개의 질문에서 중요한 것은 숫자가 아니다. 중요한 것은 서로 다른 국가와 언어권에서 어떤 질문이 반복되는가이다. 우리는 질문의 규모보다 질문의 구조를 읽는다."
              : "What matters in 1,540 questions is not the number. What matters is which questions repeat across different countries and languages. We read the structure of questions, not their scale."}
          </Lead>
        </Section>

        {/* ── 4. five layers ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "분석 구조" : "Analytical structure"}</Kicker>
          <H2>{locale === "ko" ? "질문에서 인식까지, 다섯 단계" : "Five layers, from question to perception"}</H2>
          <Lead>
            {locale === "ko"
              ? "각 단계는 분석 절차가 아니라 질문이 지식으로 전환되는 구조의 층위다. 중요한 것은 각 단계가 무엇을 하는가가 아니라 왜 존재하는가다."
              : "Each layer is not an analytical procedure but a stratum in the structure by which questions become knowledge. What matters is not what each layer does, but why it exists."}
          </Lead>
          <div className="mt-7 grid gap-3">
            {LAYERS.map((l) => (
              <div key={l.n} className="rounded-xl border border-border bg-white p-5 sm:p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-bold text-brand">{l.n}</span>
                  <h3 className="text-[19px] font-semibold text-navy">{tx(l.name, locale)}</h3>
                </div>
                <p className="mt-1 text-[13.5px] text-muted-foreground">{tx(l.definition, locale)}</p>
                <div
                  className="mt-3 rounded-lg border p-4"
                  style={{
                    borderColor: "color-mix(in srgb, var(--brand, #1f5fd6) 25%, transparent)",
                    background: "color-mix(in srgb, var(--brand, #1f5fd6) 6%, transparent)",
                  }}
                >
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">
                    {locale === "ko" ? "왜 필요한가" : "Why this layer exists"}
                  </div>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy">{tx(l.whyNeeded, locale)}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. example trace ── */}
        <Section>
          <Kicker>{locale === "ko" ? "실제 사례" : "Example trace"}</Kicker>
          <H2>{locale === "ko" ? "하나의 질문이 인식이 되기까지" : "How one question becomes perception"}</H2>
          <Lead>
            {locale === "ko"
              ? "'Why is K-pop so popular?'라는 질문이 어디까지 가는지 따라가 보면, 질문이 단순한 호기심이 아니라 국가 이미지의 출발점이라는 것을 알 수 있다."
              : "Follow the question 'Why is K-pop so popular?' to its end, and you see that a question is not mere curiosity but the starting point of national image."}
          </Lead>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white p-5 sm:p-6">
            <PathwayTrace locale={locale} />
          </div>
          <p className="mt-4 text-[14px] text-muted-foreground">
            {locale === "ko"
              ? "이 경로는 하나의 예시다. 1,540개의 질문 각각이 유사한 경로를 따라 인식을 형성한다. 그 경로들이 모여 하나의 국가 이미지 지형을 만든다."
              : "This is one example. Each of the 1,540 questions follows a similar path to form perception. Together, these paths create the terrain of national image."}
          </p>
        </Section>

        {/* ── 6. ontology ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "온톨로지" : "Ontology"}</Kicker>
          <H2>{locale === "ko" ? "온톨로지는 분류 체계가 아니다" : "Ontology is not a classification system"}</H2>
          <Lead>
            {locale === "ko"
              ? "우리는 질문을 정리하기 위해 온톨로지를 사용하는 것이 아니다. 질문이 어떻게 연결되는지 보기 위해 사용한다."
              : "We do not use ontology to organize questions. We use it to see how questions connect."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "온톨로지는 질문 사이의 관계를 설명한다. '한국어 어렵나'와 '한국에서 일할 수 있나'는 표면적으로 다른 질문이지만, 둘 다 '한국 접근성'이라는 더 깊은 관심에 연결된다. 온톨로지는 이 보이지 않는 연결을 드러내는 도구다."
              : "Ontology describes the relationships between questions. 'Is Korean hard' and 'Can I work in Korea' are superficially different, but both connect to the deeper interest of 'Korean accessibility.' Ontology is the tool that reveals these invisible connections."}
          </Lead>
        </Section>

        {/* ── 7. why diverse countries ── */}
        <Section>
          <Kicker>{locale === "ko" ? "데이터 수집" : "Data collection"}</Kicker>
          <H2>{locale === "ko" ? "왜 다양한 국가의 질문을 수집했는가" : "Why we collected questions from many countries"}</H2>
          <Lead>
            {locale === "ko"
              ? "국가 이미지는 하나의 시선으로 형성되지 않는다. 각 국가는 서로 다른 한국을 질문한다. 미국이 묻는 한국과 인도네시아가 묻는 한국은 다르다. 일본이 묻는 한국과 브라질이 묻는 한국은 다르다."
              : "National image is not formed through a single gaze. Each country questions a different Korea. The Korea that America asks about is not the Korea that Indonesia asks about. The Korea Japan questions is not the Korea Brazil questions."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "따라서 질문 수집의 목적은 더 많은 데이터를 얻는 것이 아니라 더 다양한 관점을 이해하는 것이다. 7개 언어, 8개 국가에서 수집된 질문은 '한국'이라는 하나의 대상에 대한 서로 다른 이미지들을 보여준다."
              : "The purpose of collection is not to gather more data but to understand more diverse perspectives. Questions collected from 7 languages and 8 countries reveal different images of the single subject called 'Korea.'"}
          </Lead>
        </Section>

        {/* ── 8. AI era ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "AI 시대의 방법론" : "Method in the AI era"}</Kicker>
          <H2>{locale === "ko" ? "AI 시대에는 질문이 더 중요해진다" : "In the AI era, questions matter more"}</H2>
          <Lead>
            {locale === "ko"
              ? "검색 시대에는 '무엇을 찾는가'가 중요했다. AI 시대에는 '무엇을 묻는가'가 중요해진다. 검색은 정보를 나열했지만, AI는 질문에 직접 답한다. 질문의 형태가 곧 답변의 형태를 결정한다."
              : "In the search era, 'what you look for' mattered. In the AI era, 'what you ask' matters. Search listed information; AI answers questions directly. The form of the question determines the form of the answer."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "이것은 질문이 단순 입력값이 아니라 인식 형성의 시작점이 된다는 뜻이다. AI가 한국을 어떻게 설명하는가는 사람들이 어떤 질문을 했는가에 달려 있다. 질문을 이해하지 못하면 AI 시대의 국가 이미지를 관리할 수 없다."
              : "This means questions are not mere inputs but starting points of perception formation. How AI explains Korea depends on what questions people ask. Without understanding questions, you cannot manage national image in the AI era."}
          </Lead>
        </Section>

        {/* ── 9. platform ── */}
        <Section>
          <Kicker>{locale === "ko" ? "플랫폼 함의" : "Platform implications"}</Kicker>
          <H2>{locale === "ko" ? "방법론은 플랫폼이 된다" : "Method becomes platform"}</H2>
          <Lead>
            {locale === "ko"
              ? "이 방법론은 연구를 위한 도구가 아니다. 질문, 답변, 지식, 인식을 연결하는 플랫폼 설계 원리다. 질문을 수집하고, 구조를 분석하고, 답변을 연결하고, 인식을 추적하는 일은 한 번의 연구가 아니라 지속적인 시스템이 되어야 한다."
              : "This method is not a research tool. It is a platform design principle that connects questions, answers, knowledge, and perception. Collecting questions, analyzing structures, connecting answers, and tracking perception must become a continuous system, not a one-time study."}
          </Lead>
          <div className="mt-7 grid gap-3">
            {PLATFORM_LAYERS.map((p, i) => (
              <div key={p.name.en} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-mono text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-navy">{tx(p.name, locale)}</h3>
                  <p className="mt-1 text-[14.5px] text-secondary">{tx(p.role, locale)}</p>
                </div>
              </div>
            ))}
          </div>
          <Lead>
            {locale === "ko"
              ? "이 네 개의 층이 작동할 때, 방법론은 논문에서 끝나지 않고 질문과 인식을 연결하는 살아 있는 인프라가 된다."
              : "When these four layers operate, method does not end in a paper — it becomes living infrastructure connecting questions to perception."}
          </Lead>
        </Section>

        {/* ── 10. conclusion ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "결론" : "Conclusion"}</Kicker>
          <H2>{locale === "ko" ? "질문에서 인식으로" : "From questions to perception"}</H2>
          <Lead>
            {locale === "ko"
              ? "질문은 개인의 호기심으로 시작된다. 그러나 질문이 반복되면 개념이 된다. 개념은 주제가 되고, 주제는 서사가 되고, 서사는 국가 이미지를 만든다."
              : "Questions begin as individual curiosity. But when questions repeat, they become concepts. Concepts become themes, themes become narratives, and narratives create national image."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "Method는 그 과정을 읽기 위한 틀이다. 우리가 제안하는 것은 분석 기법이 아니라 관점의 전환이다 — 질문을 데이터로 보는 것에서, 질문을 국가 이미지의 출발점으로 보는 것으로."
              : "Method is the framework for reading that process. What we propose is not an analytical technique but a shift in perspective — from seeing questions as data to seeing them as the starting point of national image."}
          </Lead>
          <p className="mt-8 max-w-[48ch] text-[22px] font-semibold leading-snug tracking-tight text-navy">
            {locale === "ko"
              ? "질문을 이해하는 것이 국가 이미지를 이해하는 것이다. Method는 그 이해의 구조다."
              : "To understand questions is to understand national image. Method is the structure of that understanding."}
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
