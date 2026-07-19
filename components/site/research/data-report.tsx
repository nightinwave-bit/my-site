"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const DATA_STRIP: { value: string; label: L }[] = [
  { value: "1,540", label: { ko: "질문", en: "Questions" } },
  { value: "7", label: { ko: "언어", en: "Languages" } },
  { value: "8", label: { ko: "국가", en: "Countries" } },
  { value: "5", label: { ko: "단계 분석 모델", en: "-step analysis model" } },
];

interface SourceCard {
  name: L;
  observable: L;
  limitation: L;
  verdict: L;
  status: "excluded" | "supplementary" | "core";
}

const SOURCES: SourceCard[] = [
  {
    name: { ko: "SNS", en: "SNS" },
    observable: { ko: "형성된 의견", en: "Formed opinions" },
    limitation: { ko: "이미 인식이 형성된 이후 데이터", en: "Data after perception is already formed" },
    verdict: { ko: "제외", en: "Excluded" },
    status: "excluded",
  },
  {
    name: { ko: "뉴스", en: "News" },
    observable: { ko: "언론이 선택한 의제", en: "Agenda chosen by media" },
    limitation: { ko: "대중의 질문이 아닌 언론의 관심", en: "Media interest, not public questions" },
    verdict: { ko: "제외", en: "Excluded" },
    status: "excluded",
  },
  {
    name: { ko: "Google Trends", en: "Google Trends" },
    observable: { ko: "관심 규모", en: "Scale of interest" },
    limitation: { ko: "왜 검색했는지는 알 수 없음", en: "Cannot know why people searched" },
    verdict: { ko: "제외", en: "Excluded" },
    status: "excluded",
  },
  {
    name: { ko: "Reddit", en: "Reddit" },
    observable: { ko: "질문 이후의 토론", en: "Discussion after questions" },
    limitation: { ko: "최초 질문 확인 불가", en: "Cannot verify the original question" },
    verdict: { ko: "보조 참고", en: "Supplementary" },
    status: "supplementary",
  },
  {
    name: { ko: "People Also Ask", en: "People Also Ask" },
    observable: { ko: "질문 확장 구조", en: "Question expansion structure" },
    limitation: { ko: "질문의 출발점 확인 불가", en: "Cannot verify question origin" },
    verdict: { ko: "보조 참고", en: "Supplementary" },
    status: "supplementary",
  },
  {
    name: { ko: "Google Autocomplete", en: "Google Autocomplete" },
    observable: { ko: "실제 사용자의 질문", en: "Actual user questions" },
    limitation: { ko: "질문 생성 단계 직접 관찰 가능", en: "Directly observable at question generation stage" },
    verdict: { ko: "핵심 데이터", en: "Core data" },
    status: "core",
  },
];

interface CountryCard {
  flag: string;
  name: L;
  desc: L;
}

const COUNTRIES: CountryCard[] = [
  { flag: "\u{1F1FA}\u{1F1F8}", name: { ko: "미국", en: "United States" }, desc: { ko: "세계 최대 영어권 검색 시장", en: "Largest English-language search market" } },
  { flag: "\u{1F1EF}\u{1F1F5}", name: { ko: "일본", en: "Japan" }, desc: { ko: "가장 인접한 문화 비교 대상", en: "Closest cultural comparison" } },
  { flag: "\u{1F1E9}\u{1F1EA}", name: { ko: "독일", en: "Germany" }, desc: { ko: "유럽 대표 산업 국가", en: "Europe's leading industrial nation" } },
  { flag: "\u{1F1EE}\u{1F1F3}", name: { ko: "인도", en: "India" }, desc: { ko: "급성장 중인 글로벌 사우스", en: "Rapidly growing Global South" } },
  { flag: "\u{1F1EE}\u{1F1E9}", name: { ko: "인도네시아", en: "Indonesia" }, desc: { ko: "동남아 최대 무슬림 국가", en: "Southeast Asia's largest Muslim nation" } },
  { flag: "\u{1F1E7}\u{1F1F7}", name: { ko: "브라질", en: "Brazil" }, desc: { ko: "남미 대표 국가", en: "South America's leading nation" } },
  { flag: "\u{1F1E6}\u{1F1EA}", name: { ko: "아랍에미리트", en: "UAE" }, desc: { ko: "중동 관문 국가", en: "Middle East gateway nation" } },
  { flag: "\u{1F1F0}\u{1F1F7}", name: { ko: "대한민국", en: "Korea" }, desc: { ko: "자기 인식 비교 기준", en: "Self-perception baseline" } },
];

interface RoleCard {
  source: string;
  role: L;
}

const ROLES: RoleCard[] = [
  { source: "Autocomplete", role: { ko: "질문 생성", en: "Question generation" } },
  { source: "People Also Ask", role: { ko: "질문 확장", en: "Question expansion" } },
  { source: "Ontology", role: { ko: "질문 구조화", en: "Question structuring" } },
  { source: "Research Layer", role: { ko: "질문 해석", en: "Question interpretation" } },
  { source: "Pathway", role: { ko: "인식 형성 과정 시각화", en: "Perception formation visualization" } },
];

export function DataReport() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Section 1: Data Strip */}
      <DocSection>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {DATA_STRIP.map((d) => (
            <div
              key={d.label.en}
              className="rounded-xl border border-border bg-white px-4 py-4 text-center"
            >
              <div className="text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                {d.value}
              </div>
              <div className="mt-1 text-[13px] text-secondary">
                {d.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section 2: Why Google Autocomplete */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "데이터 선정" : "Data selection"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "우리는 검색량보다 질문을 선택했다"
            : "We chose questions over search volume"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "이 연구의 목표는 긍정·부정 반응을 측정하거나 콘텐츠 인기도를 집계하는 것이 아니다. 사람들이 한국을 이해하기 위해 사용하는 질문 구조를 식별하는 것이다."
            : "The goal of this study is not to measure positive or negative reactions or to tally content popularity. It is to identify the question structures people use to understand Korea."}
        </Lead>
        <div className="mt-6 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "데이터 선정의 기준은 노출량, 반응량, 감성 분석이 아니었다. 우리가 관찰할 수 있는 것은 질문 생성 과정 자체, 그리고 질문 간의 구조였다."
              : "The criteria for data selection were not exposure, reactions, or sentiment analysis. What we could observe was the question generation process itself, and the structure between questions."}
          </p>
        </div>
      </DocSection>

      {/* Section 3: Data Source Comparison */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "데이터 소스 비교" : "Data source comparison"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "여섯 개의 소스를 검토하고, 하나를 선택했다"
            : "We reviewed six sources and chose one"}
        </H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOURCES.map((s) => (
            <div
              key={s.name.en}
              className={`rounded-xl border p-5 ${
                s.status === "core"
                  ? "border-[color:var(--accent)] bg-white ring-1 ring-[color:var(--accent)]"
                  : "border-border bg-white"
              }`}
              style={
                s.status === "core"
                  ? { background: "color-mix(in srgb, var(--accent) 4%, white)" }
                  : undefined
              }
            >
              <div className="text-[15px] font-semibold text-navy">
                {s.name[locale]}
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ko" ? "관찰 가능" : "Observable"}
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                  {s.observable[locale]}
                </p>
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ko" ? "한계" : "Limitation"}
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-secondary">
                  {s.limitation[locale]}
                </p>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${
                    s.status === "excluded"
                      ? "bg-gray-100 text-gray-500"
                      : s.status === "supplementary"
                        ? "bg-amber-50 text-amber-700"
                        : "text-white"
                  }`}
                  style={
                    s.status === "core"
                      ? { background: "var(--accent)" }
                      : undefined
                  }
                >
                  {s.verdict[locale]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section 4: Why Autocomplete is suitable */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "핵심 데이터" : "Core data"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "Autocomplete는 질문이 만들어지는 순간을 보여준다"
            : "Autocomplete shows the moment questions are formed"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "Autocomplete는 플랫폼 편집, 언론 선택, 커뮤니티 해석이 개입하기 이전의 데이터를 제공한다. 사용자가 검색창에 질문을 입력하는 그 순간의 데이터다."
              : "Autocomplete provides data before platform editing, media selection, or community interpretation intervene. It is data from the very moment a user types a question into the search bar."}
          </p>
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {locale === "ko" ? "비교 예시" : "Comparison example"}
            </div>
            <p className="text-[14px] leading-relaxed text-secondary">
              {locale === "ko"
                ? "Google Trends는 \"Korea\", \"K-pop\", \"Kimchi\"의 검색량을 보여주지만 왜/무엇/어떤 질문인지는 보여주지 않는다. Autocomplete는 \"Why is Korea...\", \"How does Korea...\", \"Why do Koreans...\"와 같은 질문 구조를 그대로 보존한다."
                : "Google Trends shows search volumes for \"Korea\", \"K-pop\", \"Kimchi\" but does NOT show the why/what/which gap. Autocomplete preserves question structures like \"Why is Korea...\", \"How does Korea...\", \"Why do Koreans...\"."}
            </p>
          </div>
          <p className="text-[15px] font-medium leading-relaxed text-navy">
            {locale === "ko"
              ? "우리는 검색량이 아니라 질문 구조를 분석하기 위해 Autocomplete를 선택했다."
              : "We chose Autocomplete to analyze question structure, not search volume."}
          </p>
        </div>
      </DocSection>

      {/* Section 5: Why these countries */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "국가 선정" : "Country selection"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "우리는 국가 수보다 비교 가능성을 우선했다"
            : "We prioritized comparability over country count"}
        </H2>
        <Lead>
          {locale === "ko"
            ? "선정 기준은 인구나 GDP가 아니라, 한국에 대한 서로 다른 시각을 비교할 수 있는가였다."
            : "The criteria was not population or GDP, but whether we can compare different perspectives on Korea."}
        </Lead>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES.map((c) => (
            <div
              key={c.name.en}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{c.flag}</span>
                <span className="text-[15px] font-semibold text-navy">
                  {c.name[locale]}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-secondary">
                {c.desc[locale]}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Section 6: Why language-based analysis */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "언어 선정" : "Language selection"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "국가는 달라도 언어는 질문을 남긴다"
            : "Countries differ, but language leaves questions"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "같은 국가 안에서도 언어에 따라 질문 구조가 달라질 수 있다. 이 연구는 7개 언어를 기준으로 분석했다."
              : "Even within the same country, question structures can differ by language. This study analyzed based on 7 languages."}
          </p>
          <div className="flex flex-wrap gap-2">
            {(locale === "ko"
              ? ["영어", "한국어", "일본어", "독일어", "인도네시아어", "포르투갈어", "아랍어"]
              : ["English", "Korean", "Japanese", "German", "Indonesian", "Portuguese", "Arabic"]
            ).map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="text-[15px] font-medium leading-relaxed text-navy">
            {locale === "ko"
              ? "우리는 국가보다 언어가 만들어내는 질문 구조를 먼저 관찰했다."
              : "We observed question structures created by language before country."}
          </p>
        </div>
      </DocSection>

      {/* Section 7: Data role division */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "분석 구조" : "Analysis structure"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "하나의 데이터만으로 국가 이미지를 설명할 수는 없다"
            : "No single data source can explain national image"}
        </H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ROLES.map((r) => (
            <div
              key={r.source}
              className="rounded-xl border border-border bg-white p-5 text-center"
            >
              <div className="text-[13px] font-semibold text-[color:var(--accent)]">
                {r.source}
              </div>
              <div className="mx-auto my-2 h-px w-8 bg-border" />
              <div className="text-[14px] font-medium text-navy">
                {r.role[locale]}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "Ask About Korea는 단일 데이터 소스에 의존하지 않는다. 각 데이터는 서로 다른 역할을 수행한다."
              : "Ask About Korea does not rely on a single data source. Each data plays a different role."}
          </p>
        </div>
      </DocSection>

      {/* Section 8: Limitations */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "한계" : "Limitations"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "우리는 한국에 대한 모든 질문을 수집하지 않았다"
            : "We did not collect every question about Korea"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "Autocomplete는 강력하지만 완전하지 않다."
              : "Autocomplete is powerful but not complete."}
          </p>
          <div className="space-y-3">
            {(locale === "ko"
              ? [
                  "검색량 자체를 보여주지 않는다",
                  "검색자의 의도 전체를 설명하지 못한다",
                  "플랫폼 알고리즘 변화 영향을 받을 수 있다",
                ]
              : [
                  "Does not show search volume itself",
                  "Cannot explain the full intent of searchers",
                  "Can be affected by platform algorithm changes",
                ]
            ).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-white px-4 py-3"
              >
                <span className="mt-0.5 font-mono text-[12px] font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] leading-relaxed text-secondary">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "따라서 AAK는 People Also Ask, 주제 분석, 온톨로지 구조화, 질문 경로 분석을 함께 사용하여 이를 보완한다."
              : "Therefore AAK uses People Also Ask, topic analysis, ontology structuring, and question path analysis together to compensate."}
          </p>
        </div>
      </DocSection>

      {/* Section 9: Conclusion */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "결론" : "Conclusion"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "중요한 것은 검색량이 아니라 질문이다"
            : "What matters is not search volume but questions"}
        </H2>
        <div className="mt-6 max-w-2xl space-y-3">
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "국가 이미지는 뉴스에서 시작되지 않는다. 사람들이 반복적으로 던지는 질문 속에서 형성된다."
              : "National image does not start from news. It is formed within the questions people repeatedly ask."}
          </p>
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "Ask About Korea는 한국에 대한 답을 찾기 전에 세계가 어떤 질문을 하고 있는지부터 조사했다."
              : "Ask About Korea investigated what questions the world is asking before seeking answers about Korea."}
          </p>
          <p className="text-[17px] leading-[1.8] text-secondary">
            {locale === "ko"
              ? "그리고 그 질문들이 어떻게 연결되어 하나의 국가 이해로 발전하는지 추적했다."
              : "And we traced how those questions connect and develop into an understanding of a nation."}
          </p>
          <p className="mt-4 text-lg font-bold leading-relaxed text-navy">
            {locale === "ko"
              ? "이 연구는 한국에 대한 평가가 아니라 한국을 이해하는 과정 자체를 연구한 기록이다."
              : "This study is not an evaluation of Korea, but a record of researching the very process of understanding Korea."}
          </p>
        </div>
      </DocSection>

      {/* Section 10: Bridge to next page */}
      <DocSection tint>
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <p className="max-w-2xl text-[15px] leading-relaxed text-secondary">
            {locale === "ko"
              ? "데이터 검증은 여기까지입니다. 이 데이터에서 무엇이 발견되었고, 그것을 어떻게 분석했는지는 다음 문서에서 다룹니다."
              : "Data validation ends here. What was found in this data and how it was analyzed is covered in the next document."}
          </p>
          <Link
            href="/research/understanding-model"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {locale === "ko" ? "발견과 분석 읽기" : "Read findings & analysis"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>
    </>
  );
}
