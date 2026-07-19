"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/i18n";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

type L = { ko: string; en: string };
const D = (ko: string, en: string): L => ({ ko, en });
const tx = (v: L, l: Locale) => v[l];

/* ── local layout primitives ── */

function Section({
  children,
  tint,
}: {
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      className={tint ? "border-b border-border bg-tint" : "border-b border-border"}
    >
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

/* ── data: source comparison ── */

interface SourceCard {
  name: L;
  data: L;
  observable: L;
  limitation: L;
  verdict: "excluded" | "supplementary" | "core";
}

const SOURCES: SourceCard[] = [
  {
    name: D("SNS", "SNS"),
    data: D("게시물, 댓글, 좋아요, 공유", "Posts, comments, likes, shares"),
    observable: D("사람들이 한국에 대해 어떻게 평가하는가", "How people evaluate Korea"),
    limitation: D("이미 의견이 형성된 이후의 반응 데이터", "Reaction data after opinions are already formed"),
    verdict: "excluded",
  },
  {
    name: D("뉴스", "News"),
    data: D("언론 기사, 보도량, 기사 주제", "News articles, coverage volume, article topics"),
    observable: D("언론이 한국을 어떤 이슈로 다루는가", "What issues the media covers Korea with"),
    limitation: D("대중의 관심이 아니라 언론사의 편집 결과", "Editorial result of media outlets, not public interest"),
    verdict: "excluded",
  },
  {
    name: D("Google Trends", "Google Trends"),
    data: D("검색량 변화", "Search volume changes"),
    observable: D("무엇에 관심이 증가하거나 감소하는가", "What interest is rising or falling"),
    limitation: D("왜 검색했는지 알 수 없음", "Cannot know why people searched"),
    verdict: "excluded",
  },
  {
    name: D("Reddit", "Reddit"),
    data: D("게시글, 댓글, 토론", "Posts, comments, discussions"),
    observable: D("질문 이후 사람들이 어떤 답변을 주고받는가", "What answers people exchange after questions"),
    limitation: D("최초 질문이 어디서 시작되었는지는 확인 불가", "Cannot confirm where the initial question started"),
    verdict: "supplementary",
  },
  {
    name: D("People Also Ask", "People Also Ask"),
    data: D("연관 질문 묶음", "Related question clusters"),
    observable: D("질문이 어떤 질문으로 확장되는가", "How questions expand into other questions"),
    limitation: D("실제 질문 빈도와 규모는 확인 불가", "Actual question frequency and scale cannot be confirmed"),
    verdict: "supplementary",
  },
  {
    name: D("Google Autocomplete", "Google Autocomplete"),
    data: D("실제 검색창에 반복적으로 입력된 질문", "Questions repeatedly typed into the actual search bar"),
    observable: D("사람들이 한국에 대해 실제로 무엇을 궁금해하는가", "What people actually wonder about Korea"),
    limitation: D("검색량 규모는 제공하지 않음", "Does not provide search volume scale"),
    verdict: "core",
  },
];

/* ── data: countries ── */

interface CountryCard {
  flag: string;
  code: string;
  name: L;
  rationale: L;
  role: L;
}

const COUNTRIES: CountryCard[] = [
  {
    flag: "\u{1F1FA}\u{1F1F8}",
    code: "US",
    name: D("미국", "United States"),
    rationale: D("세계 최대 영어권 검색 시장", "World's largest English-language search market"),
    role: D("기준점", "Baseline"),
  },
  {
    flag: "\u{1F1EF}\u{1F1F5}",
    code: "JP",
    name: D("일본", "Japan"),
    rationale: D("한국 인접, 동일 문자권 아닌 동아시아", "Adjacent to Korea, East Asia without shared script"),
    role: D("근접 비교", "Proximity comparison"),
  },
  {
    flag: "\u{1F1E9}\u{1F1EA}",
    code: "DE",
    name: D("독일", "Germany"),
    rationale: D("유럽 대표, 라틴 문자권 산업 국가", "European representative, Latin-script industrial nation"),
    role: D("원거리 산업국 비교", "Distant industrial comparison"),
  },
  {
    flag: "\u{1F1EE}\u{1F1F3}",
    code: "IN",
    name: D("인도", "India"),
    rationale: D("영어권이면서 글로벌 사우스", "English-speaking yet Global South"),
    role: D("영어+발전도상국 교차", "English + developing nation intersection"),
  },
  {
    flag: "\u{1F1EE}\u{1F1E9}",
    code: "ID",
    name: D("인도네시아", "Indonesia"),
    rationale: D("동남아 최대, 무슬림 다수", "Largest in Southeast Asia, Muslim majority"),
    role: D("문화권+종교+거리 교차", "Cultural sphere + religion + distance intersection"),
  },
  {
    flag: "\u{1F1E7}\u{1F1F7}",
    code: "BR",
    name: D("브라질", "Brazil"),
    rationale: D("남미 대표, 포르투갈어", "South American representative, Portuguese-speaking"),
    role: D("언어+대륙+문화 최대 거리", "Maximum distance in language + continent + culture"),
  },
  {
    flag: "\u{1F1E6}\u{1F1EA}",
    code: "AE",
    name: D("UAE", "UAE"),
    rationale: D("중동 관문, 아랍어", "Middle Eastern gateway, Arabic-speaking"),
    role: D("정보환경+언어+지정학 교차", "Information environment + language + geopolitics intersection"),
  },
  {
    flag: "\u{1F1F0}\u{1F1F7}",
    code: "KR",
    name: D("대한민국", "South Korea"),
    rationale: D("자기 인식 비교 기준", "Self-perception baseline"),
    role: D("내부 시선 vs 외부 시선", "Internal gaze vs. external gaze"),
  },
];

/* ── data: languages ── */

interface LangItem {
  name: L;
  code: string;
}

const LANGUAGES: LangItem[] = [
  { name: D("영어", "English"), code: "EN" },
  { name: D("한국어", "Korean"), code: "KO" },
  { name: D("일본어", "Japanese"), code: "JA" },
  { name: D("독일어", "German"), code: "DE" },
  { name: D("인도네시아어", "Indonesian"), code: "ID" },
  { name: D("포르투갈어", "Portuguese"), code: "PT" },
  { name: D("아랍어", "Arabic"), code: "AR" },
];

/* ── data: processing flow ── */

const FLOW_STEPS: L[] = [
  D("질문", "Question"),
  D("개념", "Concept"),
  D("주제", "Theme"),
  D("서사", "Narrative"),
  D("인식", "Perception"),
];

/* ── data: limitations & compensations ── */

interface Finding {
  title: L;
  desc: L;
}

const LIMITATIONS: Finding[] = [
  {
    title: D("검색량 미제공", "No search volume"),
    desc: D(
      "어떤 질문이 더 자주 발생하는지 알 수 없다",
      "Cannot determine which questions occur more frequently",
    ),
  },
  {
    title: D("알고리즘 영향", "Algorithm influence"),
    desc: D(
      "플랫폼 변화에 따라 결과가 달라질 수 있다",
      "Results may vary with platform changes",
    ),
  },
  {
    title: D("비검색 인구", "Non-searching population"),
    desc: D(
      "검색하지 않는 사람들의 궁금증은 포착하지 못한다",
      "Cannot capture the curiosity of those who do not search",
    ),
  },
];

const COMPENSATIONS: Finding[] = [
  {
    title: D("People Also Ask", "People Also Ask"),
    desc: D("질문 확장 구조를 보완", "Supplements question expansion structure"),
  },
  {
    title: D("Ontology 구조화", "Ontology structuring"),
    desc: D("질문 간 관계를 체계화", "Systematizes relationships between questions"),
  },
  {
    title: D("Pathway 분석", "Pathway analysis"),
    desc: D("질문이 연결되는 경로를 추적", "Traces paths through which questions connect"),
  },
];

/* ── verdict badge ── */

function VerdictBadge({
  verdict,
  locale,
}: {
  verdict: "excluded" | "supplementary" | "core";
  locale: Locale;
}) {
  const labels: Record<string, L> = {
    excluded: D("제외", "Excluded"),
    supplementary: D("보조 참고", "Supplementary"),
    core: D("핵심 데이터", "Core data"),
  };
  const styles: Record<string, string> = {
    excluded: "bg-gray-100 text-gray-600",
    supplementary: "bg-amber-50 text-amber-700",
    core: "bg-brand/10 text-brand",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[verdict]}`}
    >
      {tx(labels[verdict], locale)}
    </span>
  );
}

/* ── finding row ── */

function FindingRow({
  index,
  title,
  desc,
  accent,
}: {
  index: number;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4 rounded-xl border border-border bg-white p-5">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
          accent
            ? "bg-brand/10 text-brand"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h4 className="text-[15px] font-semibold text-navy">{title}</h4>
        <p className="mt-1 text-[14px] text-secondary">{desc}</p>
      </div>
    </div>
  );
}

/* ── main ── */

export function MethodView() {
  const { locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* ── hero ── */}
        <section
          className="border-b border-border"
          style={{
            background: "linear-gradient(180deg, #F8FAFF, #F2F6FF)",
          }}
        >
          <div className="container pb-16 pt-28 sm:pt-36">
            <Kicker>{locale === "ko" ? "방법론" : "Methodology"}</Kicker>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-navy sm:text-5xl md:text-6xl">
              {locale === "ko"
                ? "왜 이런 방식으로 연구했는가"
                : "Why We Researched This Way"}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-secondary sm:text-xl">
              {locale === "ko"
                ? "이 페이지는 연구 설계의 결정을 설명한다 — 데이터 선정, 국가 선정, 언어 선정, 처리 구조."
                : "This page explains research design decisions — data selection, country selection, language selection, and processing structure."}
            </p>
          </div>
        </section>

        {/* ── 1. why questions ── */}
        <Section>
          <Kicker>{locale === "ko" ? "연구 대상" : "Research subject"}</Kicker>
          <H2>
            {locale === "ko"
              ? "왜 질문을 연구 대상으로 선택했는가"
              : "Why we chose questions as the research subject"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "국가 인식을 관찰할 수 있는 데이터 후보는 여러 가지다. 뉴스, SNS, 여론조사, 검색 데이터. 이 중에서 우리는 질문을 선택했다."
              : "There are many candidate data sources for observing national perception: news, SNS, surveys, search data. Among these, we chose questions."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "뉴스는 언론이 선택한 의제를 보여준다. SNS는 이미 형성된 의견을 보여준다. 여론조사는 이미 만들어진 이미지를 측정한다. 질문은 다르다. 질문은 이해가 형성되기 직전의 순간을 포착한다 — 누군가가 무언가를 이해하려고 능동적으로 시도하는 바로 그 순간."
              : "News shows agendas the media chose. SNS shows opinions already formed. Surveys measure images already built. Questions are different. Questions capture the moment just before understanding forms — the moment someone is actively trying to make sense of something."}
          </Lead>
          <Lead>
            {locale === "ko"
              ? "질문은 이해의 출력물이 아니라 입력물이다. 질문을 관찰한다는 것은 인식이 만들어지는 과정의 시작점을 관찰한다는 뜻이다."
              : "Questions are the input to understanding, not the output. Observing questions means observing the starting point of the process by which perceptions are formed."}
          </Lead>
        </Section>

        {/* ── 2. why autocomplete ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "데이터 선정" : "Data selection"}</Kicker>
          <H2>
            {locale === "ko"
              ? "여섯 개의 소스를 검토하고, 하나를 선택했다"
              : "We reviewed six sources and chose one"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "질문을 관찰할 수 있는 데이터 소스를 여섯 가지 검토했다. 각 소스가 무엇을 관찰할 수 있는지, 그리고 어떤 한계가 있는지를 비교했다."
              : "We reviewed six data sources through which questions can be observed. We compared what each source can observe and what limitations it carries."}
          </Lead>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOURCES.map((s) => (
              <div
                key={s.name.en}
                className="flex flex-col rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-navy">
                    {tx(s.name, locale)}
                  </h3>
                  <VerdictBadge verdict={s.verdict} locale={locale} />
                </div>
                <p className="mt-3 text-[13px] text-secondary">
                  <span className="font-medium text-navy">
                    {locale === "ko" ? "수집 데이터: " : "Data collected: "}
                  </span>
                  {tx(s.data, locale)}
                </p>
                <p className="mt-1.5 text-[13px] text-secondary">
                  <span className="font-medium text-navy">
                    {locale === "ko" ? "확인 가능한 것: " : "Observable: "}
                  </span>
                  {tx(s.observable, locale)}
                </p>
                <p className="mt-1.5 text-[13px] text-secondary">
                  <span className="font-medium text-navy">
                    {locale === "ko" ? "한계: " : "Limitation: "}
                  </span>
                  {tx(s.limitation, locale)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-secondary" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
            <p>
              {locale === "ko"
                ? "Google Autocomplete는 실제 사용자가 검색창에 입력한 질문 데이터를 제공한다."
                : "Google Autocomplete provides question data that actual users typed into the search bar."}
            </p>
            <p>
              {locale === "ko"
                ? "Ask About Korea는 한국 관련 질문의 원천 데이터를 확보하기 위해 Google Autocomplete를 핵심 데이터로 선택했다."
                : "Ask About Korea chose Google Autocomplete as its core data to secure the source data of Korea-related questions."}
            </p>
            <p>
              {locale === "ko"
                ? "해당 데이터를 통해 8개 국가, 7개 언어에서 수집한 1,540개 질문을 직접 분류·구조화하여 질문의 규모, 주제별 분포, 국가별 관심사 차이를 비교할 수 있는 분석 데이터셋을 구축했다."
                : "Using this data, we directly classified and structured 1,540 questions collected from 8 countries in 7 languages, building an analytical dataset that enables comparison of question scale, topic distribution, and cross-country interest differences."}
            </p>
          </div>
        </Section>

        {/* ── 3. why these countries ── */}
        <Section>
          <Kicker>{locale === "ko" ? "국가 선정" : "Country selection"}</Kicker>
          <H2>
            {locale === "ko"
              ? "비교 가능한 차이를 설계했다"
              : "We designed comparable differences"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "목표는 모든 국가를 포괄하는 것이 아니라, 언어권, 정보환경, 문화적 거리를 교차시킨 구조적 비교를 설계하는 것이었다."
              : "The goal was not coverage of all countries, but structured comparison across language spheres, information environments, and cultural distances."}
          </Lead>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COUNTRIES.map((c) => (
              <div
                key={c.code}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {c.code}
                    </span>
                    <h3 className="text-[15px] font-semibold text-navy">
                      {tx(c.name, locale)}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-secondary">
                  {tx(c.rationale, locale)}
                </p>
                <p className="mt-2 text-[12px] font-semibold text-brand">
                  {tx(c.role, locale)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. why 7 languages ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "언어 선정" : "Language selection"}</Kicker>
          <H2>
            {locale === "ko"
              ? "언어는 질문의 구조를 결정한다"
              : "Language determines question structure"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "한국에 대한 동일한 궁금증이라도, 사용 언어에 따라 구조적으로 다른 질문이 된다. 같은 호기심이 언어의 문법과 관용에 의해 서로 다른 형태로 표현되며, 그 형태의 차이가 인식의 차이를 만든다."
              : "Even the same curiosity about Korea takes structurally different forms depending on the language used. The same curiosity is expressed in different forms by the grammar and idioms of each language, and those differences in form create differences in perception."}
          </Lead>
          <div className="mt-8 flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="rounded-lg border border-border bg-white px-4 py-2.5"
              >
                <span className="text-[11px] font-medium text-muted-foreground">
                  {lang.code}
                </span>
                <span className="ml-2 text-[14px] font-semibold text-navy">
                  {tx(lang.name, locale)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "우리가 국가별이 아니라 언어별로 분석하는 이유는, 동일한 궁금증이 언어에 따라 구조적으로 다른 질문을 생산하기 때문이다. 질문의 형태를 결정하는 것은 국적이 아니라 언어다."
              : "We analyze by language rather than by country because the same curiosity produces structurally different questions depending on the language. What determines the form of a question is not nationality but language."}
          </p>
        </Section>

        {/* ── 5. data processing ── */}
        <Section>
          <Kicker>{locale === "ko" ? "처리 구조" : "Processing structure"}</Kicker>
          <H2>
            {locale === "ko"
              ? "왜 질문을 다섯 층위로 읽었는가"
              : "Why we read questions through five layers"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "개별 질문은 너무 세밀하여 패턴을 드러내지 못한다. 반대로 질문에서 곧바로 '국가 이미지'로 뛰어넘으면 중간 구조를 놓친다. 다섯 층위는 세밀한 호기심이 거시적 인식으로 응집되는 과정을 추적할 수 있게 한다."
              : "Individual questions are too granular to reveal patterns. Conversely, jumping directly from a question to 'national image' skips intermediate structures. The five layers allow us to track how granular curiosity aggregates into macro-level understanding."}
          </Lead>

          {/* flow chips */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {FLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.en}>
                <div
                  className="rounded-lg border px-4 py-2.5 text-[14px] font-bold text-navy"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--brand, #1f5fd6) 30%, transparent)",
                    background:
                      "color-mix(in srgb, var(--brand, #1f5fd6) 6%, transparent)",
                  }}
                >
                  {tx(step, locale)}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-brand" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-secondary">
            <p>
              {locale === "ko"
                ? "이 구조는 분석 모델 자체를 설명하는 것이 아니라, 왜 이런 분석적 선택을 했는지를 정당화한다."
                : "This structure does not explain the analytical model itself, but justifies why we made this analytical choice."}
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                {locale === "ko"
                  ? "개별 질문은 너무 세밀하여 그 자체로 패턴을 보여주지 않는다"
                  : "Individual questions are too granular to reveal patterns on their own"}
              </li>
              <li>
                {locale === "ko"
                  ? "질문에서 '국가 이미지'로 직접 뛰어넘으면 중간의 응집 구조를 생략하게 된다"
                  : "Jumping directly from question to 'national image' skips intermediate aggregation structures"}
              </li>
              <li>
                {locale === "ko"
                  ? "다섯 층위를 통해 미시적 호기심이 거시적 인식으로 응집되는 과정을 추적할 수 있다"
                  : "Five layers allow tracking how micro-level curiosity aggregates into macro-level perception"}
              </li>
            </ul>
          </div>
        </Section>

        {/* ── 6. limitations & compensation ── */}
        <Section tint>
          <Kicker>{locale === "ko" ? "한계" : "Limitations"}</Kicker>
          <H2>
            {locale === "ko"
              ? "Autocomplete만으로 충분하지 않다"
              : "Autocomplete alone is not enough"}
          </H2>
          <Lead>
            {locale === "ko"
              ? "핵심 데이터로 선택한 Google Autocomplete에도 명확한 한계가 있다. 이 한계를 인식하고 보완 방법을 설계했다."
              : "Google Autocomplete, chosen as our core data, has clear limitations. We recognized these limits and designed compensation methods."}
          </Lead>

          <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {locale === "ko" ? "한계" : "Limitations"}
          </h3>
          <div className="mt-3 grid gap-3">
            {LIMITATIONS.map((item, i) => (
              <FindingRow
                key={i}
                index={i}
                title={tx(item.title, locale)}
                desc={tx(item.desc, locale)}
              />
            ))}
          </div>

          <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {locale === "ko" ? "보완" : "Compensation"}
          </h3>
          <div className="mt-3 grid gap-3">
            {COMPENSATIONS.map((item, i) => (
              <FindingRow
                key={i}
                index={i}
                title={tx(item.title, locale)}
                desc={tx(item.desc, locale)}
                accent
              />
            ))}
          </div>
        </Section>

        {/* ── final statement ── */}
        <section className="border-b border-border">
          <div className="container py-14 sm:py-16">
            <p className="max-w-[52ch] text-[20px] font-bold leading-snug tracking-tight text-brand sm:text-[24px]">
              {locale === "ko"
                ? "이 연구는 한국에 대한 답을 제시하지 않는다. 세계가 한국을 이해하기 위해 어떤 질문을 던지는지, 그 질문을 어떻게 관찰할 수 있는지를 설계한 기록이다."
                : "This research does not provide answers about Korea. It is a record of designing how to observe what questions the world asks to understand Korea."}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
