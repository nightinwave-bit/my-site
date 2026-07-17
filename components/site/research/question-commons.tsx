"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Accented, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

/* ── data strip ── */
const DATA_STRIP: { value: string; label: L }[] = [
  { value: "1,540", label: D("수집된 질문", "questions collected") },
  { value: "7", label: D("언어", "languages") },
  { value: "8", label: D("주제 영역", "topic areas") },
  { value: "0", label: D("체계적 응답 시스템", "systematic answer systems") },
];

/* ── two models ── */
interface ModelStep { label: L; sub: L }
const GOV_MODEL: ModelStep[] = [
  { label: D("국가", "State"), sub: D("메시지를 설계한다", "designs a message") },
  { label: D("매체", "Media"), sub: D("메시지를 전달한다", "delivers the message") },
  { label: D("대중", "Public"), sub: D("수신한다", "receives it") },
];
const COMMONS_MODEL: ModelStep[] = [
  { label: D("질문", "Question"), sub: D("세계가 묻는다", "the world asks") },
  { label: D("참여", "Participation"), sub: D("시민·디아스포라·AI가 답한다", "citizens, diaspora, AI answer") },
  { label: D("축적", "Accumulation"), sub: D("답변이 공동지식이 된다", "answers become shared knowledge") },
  { label: D("재생", "Regeneration"), sub: D("지식이 새 질문을 낳는다", "knowledge generates new questions") },
];

/* ── principles ── */
interface Principle { n: string; title: L; description: L }
const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: D("질문은 공공재다", "Questions are public goods"),
    description: D(
      "질문은 묻는 순간 개인의 것이지만, 같은 질문을 수천 명이 공유한다면 그것은 사회적 자산이다. 커먼즈는 이 공유된 질문을 관리하고 축적하는 구조를 만든다.",
      "A question belongs to the individual at the moment of asking — but when thousands share the same question, it becomes a social asset. The commons creates a structure to steward and accumulate these shared questions.",
    ),
  },
  {
    n: "02",
    title: D("답변은 순환한다", "Answers circulate"),
    description: D(
      "답변은 한 번 전달되고 끝나는 메시지가 아니다. 답변은 해석되고, 논쟁되고, 번역되고, 재해석되면서 더 풍부한 지식이 된다. 커먼즈에서 답변은 축적의 단위다.",
      "An answer is not a message delivered once and done. It is interpreted, contested, translated, and reinterpreted — becoming richer knowledge. In the commons, answers are units of accumulation.",
    ),
  },
  {
    n: "03",
    title: D("참여가 권위를 대체한다", "Participation replaces authority"),
    description: D(
      "누가 '정확한 답'을 소유하는가라는 질문 자체가 잘못되었다. 커먼즈에서 신뢰는 단일 권위가 아니라 다양한 관점의 축적과 논쟁에서 나온다.",
      "The question 'who owns the correct answer' is itself wrong. In the commons, trust comes not from a single authority but from the accumulation and contestation of diverse perspectives.",
    ),
  },
  {
    n: "04",
    title: D("생태계는 자기강화한다", "The ecosystem is self-reinforcing"),
    description: D(
      "좋은 답변은 새로운 질문을 낳고, 새로운 질문은 더 많은 참여자를 끌어들인다. 이 순환이 반복될수록 커먼즈는 더 깊어지고 넓어진다.",
      "Good answers generate new questions, and new questions attract more participants. The more this cycle repeats, the deeper and wider the commons becomes.",
    ),
  },
];

/* ── roles ── */
interface RoleData {
  role: L;
  who: L;
  contribution: L;
  uniqueValue: L;
}
const ROLES: RoleData[] = [
  {
    role: D("시민", "Citizens"),
    who: D("한국에 관심 있는 모든 사람 — 한국인과 비한국인 모두", "Anyone with interest in Korea — Korean and non-Korean alike"),
    contribution: D(
      "경험에서 나온 답변을 제공한다. 전문가가 아니어도 된다. '한국은 안전한가'에 한국에서 3년 산 외국인이 쓴 답변은 외교부 보도자료보다 더 많은 사람에게 닿을 수 있다.",
      "They provide answers born from experience. No expertise required. An expat's answer to 'is Korea safe' can reach more people than a ministry press release.",
    ),
    uniqueValue: D("진정성 — 삶에서 나온 답변은 설계된 메시지보다 신뢰된다", "Authenticity — answers from lived experience are trusted more than designed messages"),
  },
  {
    role: D("디아스포라", "Diaspora"),
    who: D("두 개의 문화적 프레임 안에서 동시에 사는 사람들", "People living inside two cultural frames at once"),
    contribution: D(
      "질문하는 세계와 답변하는 한국 사이의 번역자 역할을 한다. 왜 이 질문이 나오는지를 한국에 설명하고, 한국의 맥락을 질문자에게 전달할 수 있는 유일한 위치에 있다.",
      "They serve as translators between the asking world and answering Korea. They are uniquely positioned to explain why a question arises to Korea, and to convey Korean context to the questioner.",
    ),
    uniqueValue: D("가교 — 질문의 맥락과 답변의 맥락을 동시에 이해한다", "Bridging — they understand both the context of the question and the context of the answer"),
  },
  {
    role: D("AI", "AI"),
    who: D("대규모 언어 모델과 번역·요약·매칭 시스템", "Large language models and translation, summarization, matching systems"),
    contribution: D(
      "결합 조직이지 권위가 아니다. 질문을 분류하고, 번역하고, 유사 질문을 연결하고, 초안 답변을 제안한다. 그러나 최종 답변의 신뢰성은 인간 참여자의 검증에서 나온다.",
      "Connective tissue, not authority. It classifies questions, translates, connects similar questions, and drafts answers. But the credibility of final answers comes from human participants' validation.",
    ),
    uniqueValue: D("규모 — 비용을 0에 가깝게 낮춰 누구나 어떤 역할이든 할 수 있게 한다", "Scale — it collapses costs toward zero so anyone can perform any role"),
  },
  {
    role: D("기관", "Institutions"),
    who: D("정부·대학·재단·국제기구", "Government, universities, foundations, international organizations"),
    contribution: D(
      "커먼즈의 주인이 아니라 촉진자다. 인프라를 제공하고, 참여 규칙을 설계하고, 품질을 보증하되, 답변을 통제하지 않는다. 정부가 '한국은 이런 나라다'라고 선언하는 것이 아니라 '이 질문에 대한 다양한 답변이 있다'는 것을 보여주는 것이다.",
      "Facilitators, not owners. They provide infrastructure, design participation rules, and assure quality — but do not control answers. Government shows 'here are diverse answers to this question,' not 'this is what Korea is.'",
    ),
    uniqueValue: D("정당성과 지속성 — 커먼즈가 개인 프로젝트가 아닌 공적 인프라가 되게 한다", "Legitimacy and sustainability — they make the commons public infrastructure, not a personal project"),
  },
];

/* ── policy implications ── */
interface PolicyMove { n: string; title: L; description: L }
const POLICIES: PolicyMove[] = [
  {
    n: "01",
    title: D("질문 인프라 구축", "Build question infrastructure"),
    description: D(
      "질문을 수집하고, 분류하고, 번역하고, 연결하는 공공 인프라가 필요하다. 이것은 Q&A 플랫폼이 아니라 질문의 흐름을 관리하는 시스템이다.",
      "Public infrastructure is needed to collect, classify, translate, and connect questions. This is not a Q&A platform but a system that manages the flow of questions.",
    ),
  },
  {
    n: "02",
    title: D("답변 생태계 설계", "Design the answer ecosystem"),
    description: D(
      "누가, 어떻게, 어떤 인센티브로 답변에 참여하는가를 설계해야 한다. 답변은 정부의 의무가 아니라 시민의 기회가 되어야 한다.",
      "Who answers, how, and with what incentives must be designed. Answering should be a citizen's opportunity, not a government's obligation.",
    ),
  },
  {
    n: "03",
    title: D("디아스포라를 가교 역할로 공식화", "Formalize diaspora as bridge agents"),
    description: D(
      "디아스포라의 이중 문화적 위치를 공공외교 자산으로 인정하고, 가교-해석자로서의 역할을 제도적으로 지원해야 한다.",
      "Recognize the diaspora's bicultural position as a public diplomacy asset and institutionally support their role as bridge-interpreters.",
    ),
  },
  {
    n: "04",
    title: D("AI 협업 프로토콜 수립", "Establish AI collaboration protocols"),
    description: D(
      "AI가 한국을 어떻게 설명하는지는 이미 국가 이미지에 영향을 주고 있다. AI의 답변 품질을 높이려면 커먼즈에 축적된 인간의 답변이 AI의 학습 데이터가 되는 순환 구조가 필요하다.",
      "How AI explains Korea already affects national image. To improve AI answer quality, a circular structure is needed where human answers accumulated in the commons become AI training data.",
    ),
  },
  {
    n: "05",
    title: D("성과 지표 전환", "Transform performance metrics"),
    description: D(
      "공공외교의 성과를 '전달한 메시지 수'가 아니라 '답변된 질문 수', '참여한 시민 수', '축적된 공동지식의 깊이'로 측정해야 한다.",
      "Measure public diplomacy outcomes not by 'messages delivered' but by 'questions answered,' 'citizens participating,' and 'depth of accumulated shared knowledge.'",
    ),
  },
];

/* ── components ── */

function DataStrip({ locale }: { locale: "ko" | "en" }) {
  return (
    <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3">
      {DATA_STRIP.map((d) => (
        <div key={d.value} className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold text-[color:var(--accent)]">{d.value}</span>
          <span className="text-sm text-muted-foreground">{d.label[locale]}</span>
        </div>
      ))}
    </div>
  );
}

function ModelFlow({ steps, locale }: { steps: ModelStep[]; locale: "ko" | "en" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center rounded-xl border border-border bg-white px-5 py-3 text-center">
            <span className="text-[15px] font-semibold text-navy">{s.label[locale]}</span>
            <span className="mt-0.5 text-[12px] text-muted-foreground">{s.sub[locale]}</span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--accent)]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── main ── */

export function QuestionCommons() {
  const { locale } = useLanguage();
  return (
    <>
      {/* ── problem statement ── */}
      <DocSection>
        <DataStrip locale={locale} />
        <Kicker>{locale === "ko" ? "문제" : "The problem"}</Kicker>
        <H2>{locale === "ko" ? "1,540개의 질문은 존재한다. 답변 생태계는 없다." : "1,540 questions exist. No answer ecosystem does."}</H2>
        <Lead>
          {locale === "ko"
            ? "세계는 한국에 대해 끊임없이 묻고 있다. 그러나 이 질문들에 체계적으로 답변하는 구조는 존재하지 않는다. 정부는 메시지를 설계하고, 관광 기관은 홍보물을 만들고, 문화원은 행사를 개최한다. 그 어느 것도 '사람들이 실제로 무엇을 묻고 있는가'에서 시작하지 않는다."
            : "The world keeps asking about Korea. But no structure systematically answers these questions. Government designs messages, tourism agencies produce brochures, cultural centers host events. None of them start from 'what are people actually asking.'"}
        </Lead>
        <Lead>
          {locale === "ko"
            ? "이것은 정보 부족의 문제가 아니다. 한국에 대한 정보는 넘쳐난다. 문제는 질문과 답변이 연결되지 않는다는 것이다. 질문은 검색창에서 사라지고, 답변은 보도자료에서 시작된다. 이 둘 사이의 간극이 국가 이미지의 가장 큰 구조적 결함이다."
            : "This is not a problem of insufficient information. Information about Korea overflows. The problem is that questions and answers are not connected. Questions vanish in search bars; answers begin in press releases. The gap between the two is the biggest structural flaw in national image formation."}
        </Lead>
      </DocSection>

      {/* ── core declaration ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "핵심 선언" : "Core declaration"}</Kicker>
        <p className="max-w-[44ch] text-[26px] font-bold leading-snug tracking-tight text-[color:var(--accent)] sm:text-[32px]">
          {locale === "ko"
            ? "질문은 데이터가 아니다. 질문은 참여의 초대장이다."
            : "Questions are not data. They are invitations to participate."}
        </p>
        <Lead>
          {locale === "ko"
            ? "질문은 개인의 것이지만 답변은 공동의 자산이 될 수 있다. 이 전환 — 사적 호기심에서 공적 지식으로 — 이 Question Commons의 핵심이다."
            : "Questions belong to individuals, but answers can become shared assets. This transformation — from private curiosity to public knowledge — is the core of the Question Commons."}
        </Lead>
      </DocSection>

      {/* ── two models compared ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "두 개의 모델" : "Two models"}</Kicker>
        <H2>{locale === "ko" ? "메시지 전달에서 지식 순환으로" : "From message delivery to knowledge circulation"}</H2>
        <Lead>
          {locale === "ko"
            ? "기존 모델은 국가가 메시지를 설계하고 대중에게 전달하는 일방향 구조다. 커먼즈 모델은 질문에서 시작하여 다양한 참여자의 답변이 축적되고, 그 지식이 다시 새로운 질문을 낳는 순환 구조다."
            : "The existing model is one-directional: the state designs a message and delivers it to the public. The commons model is circular: it starts from questions, accumulates answers from diverse participants, and that knowledge generates new questions."}
        </Lead>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {locale === "ko" ? "기존: 전달 모델" : "Current: delivery model"}
            </div>
            <ModelFlow steps={GOV_MODEL} locale={locale} />
            <p className="mt-3 text-[13.5px] text-muted-foreground">
              {locale === "ko"
                ? "선형. 일방향. 질문자의 맥락과 무관하게 작동한다."
                : "Linear. One-directional. Operates regardless of the questioner's context."}
            </p>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
              {locale === "ko" ? "전환: 순환 모델" : "Shift: circulation model"}
            </div>
            <ModelFlow steps={COMMONS_MODEL} locale={locale} />
            <p className="mt-3 text-[13.5px] text-muted-foreground">
              {locale === "ko"
                ? "순환. 다방향. 매 순환이 커먼즈를 더 깊고 넓게 만든다."
                : "Circular. Multi-directional. Each cycle makes the commons deeper and wider."}
            </p>
          </div>
        </div>
      </DocSection>

      {/* ── what makes a commons ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "커먼즈의 원리" : "Principles of a commons"}</Kicker>
        <H2>{locale === "ko" ? "질문이 공공재가 되려면" : "For questions to become public goods"}</H2>
        <div className="mt-7 grid gap-3">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="grid grid-cols-[40px_1fr] gap-x-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-[52px_1fr] sm:p-6">
              <div className="pt-0.5 font-mono text-sm font-bold text-[color:var(--accent)]">{p.n}</div>
              <div>
                <h3 className="text-[17px] font-semibold leading-snug text-navy">{p.title[locale]}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{p.description[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── who answers ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "누가 답하는가" : "Who answers"}</Kicker>
        <H2>{locale === "ko" ? "정부가 아니라 생태계가 답한다" : "The ecosystem answers, not the government"}</H2>
        <Lead>
          {locale === "ko"
            ? "커먼즈에서 답변은 하나의 권위가 발행하는 것이 아니다. 서로 다른 위치에서 서로 다른 깊이로, 서로 다른 언어로 답변이 축적된다. 이 다원성이 신뢰를 만든다."
            : "In the commons, answers are not issued by a single authority. They accumulate from different positions, at different depths, in different languages. This plurality creates trust."}
        </Lead>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {ROLES.map((r) => (
            <div key={r.role.en} className="flex flex-col rounded-xl border border-border bg-white p-5 sm:p-6">
              <h3 className="text-[19px] font-semibold text-navy">{r.role[locale]}</h3>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{r.who[locale]}</p>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-secondary">{r.contribution[locale]}</p>
              <div
                className="mt-4 rounded-lg border p-3"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)",
                  background: "color-mix(in srgb, var(--accent) 6%, transparent)",
                }}
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                  {locale === "ko" ? "고유 가치" : "Unique value"}
                </div>
                <p className="mt-1 text-[13.5px] leading-snug text-navy">{r.uniqueValue[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── why "commons" ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "왜 '커먼즈'인가" : "Why 'Commons'"}</Kicker>
        <H2>{locale === "ko" ? "플랫폼이 아니라 공유지다" : "A commons, not a platform"}</H2>
        <Lead>
          {locale === "ko"
            ? "Question Commons는 질문 게시판이 아니다. Q&A 사이트가 아니다. FAQ 데이터베이스가 아니다. '커먼즈'라는 단어를 쓰는 이유는 이것이 소유되지 않고 공유되는 자원이기 때문이다."
            : "The Question Commons is not a question board. Not a Q&A site. Not an FAQ database. We use the word 'commons' because this is a resource that is shared, not owned."}
        </Lead>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {([
            [
              D("플랫폼", "Platform"),
              D("사용자가 콘텐츠를 생산하고 플랫폼이 가치를 추출한다", "Users produce content; the platform extracts value"),
            ],
            [
              D("아카이브", "Archive"),
              D("지식을 보존하지만 순환시키지 않는다", "Preserves knowledge but does not circulate it"),
            ],
            [
              D("커먼즈", "Commons"),
              D("모두가 기여하고 모두가 사용하며, 사용할수록 풍요로워진다", "Everyone contributes, everyone uses, and use makes it richer"),
            ],
          ] as [L, L][]).map(([name, desc], i) => (
            <div
              key={name.en}
              className={"bg-white p-5 sm:p-6" + (i === 2 ? " border-l-2 border-l-[color:var(--accent)]" : "")}
            >
              <h4 className={"text-[16px] font-bold" + (i === 2 ? " text-[color:var(--accent)]" : " text-navy")}>{name[locale]}</h4>
              <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">{desc[locale]}</p>
            </div>
          ))}
        </div>
        <Lead>
          {locale === "ko"
            ? "질문은 경합재가 아니다 — 한 사람이 질문을 써도 다른 사람의 질문이 줄어들지 않는다. 오히려 질문이 공유될수록 답변의 가능성이 넓어진다. 이것이 커먼즈의 경제학이다."
            : "Questions are non-rivalrous — one person asking doesn't diminish another's question. On the contrary, the more questions are shared, the wider the space for answers becomes. This is the economics of the commons."}
        </Lead>
      </DocSection>

      {/* ── AI era ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "AI 시대" : "The AI era"}</Kicker>
        <H2>{locale === "ko" ? "AI가 답하는 시대에 인간의 답변이 더 중요해진다" : "In an era when AI answers, human answers matter more"}</H2>
        <Lead>
          {locale === "ko"
            ? "AI는 이미 한국에 대한 질문의 첫 번째 응답자가 되고 있다. 검색 엔진 대신 ChatGPT에 '한국은 안전한가'를 묻는 사용자가 늘어나고 있다. AI의 답변 품질은 학습 데이터에 의존한다. 그런데 그 학습 데이터는 누가 만드는가?"
            : "AI is already becoming the first responder to questions about Korea. More users ask ChatGPT 'is Korea safe' instead of a search engine. AI answer quality depends on training data. But who creates that training data?"}
        </Lead>
        <Lead>
          {locale === "ko"
            ? "커먼즈에 축적된 다원적이고 맥락 풍부한 인간의 답변이 AI의 학습 데이터가 될 때, AI는 더 정확하고 균형 잡힌 한국 이미지를 전달할 수 있다. 인간이 답하지 않으면, AI는 기존의 편향된 데이터로 한국을 설명할 수밖에 없다."
            : "When plural, context-rich human answers accumulated in the commons become AI training data, AI can deliver a more accurate and balanced image of Korea. If humans do not answer, AI has no choice but to explain Korea from existing biased data."}
        </Lead>
        <Accented label={locale === "ko" ? "순환 구조" : "Circular structure"}>
          {locale === "ko"
            ? "인간이 질문에 답한다 → 답변이 커먼즈에 축적된다 → AI가 더 나은 답변을 학습한다 → AI의 답변이 새로운 질문을 유발한다 → 인간이 다시 답한다. 이 순환에서 인간과 AI는 경쟁하지 않는다. 서로를 강화한다."
            : "Humans answer questions → Answers accumulate in the commons → AI learns better answers → AI answers provoke new questions → Humans answer again. In this cycle, humans and AI do not compete. They reinforce each other."}
        </Accented>
      </DocSection>

      {/* ── policy implications ── */}
      <DocSection tint>
        <Kicker>{locale === "ko" ? "정책 함의" : "Policy implications"}</Kicker>
        <H2>{locale === "ko" ? "커먼즈를 만들기 위해" : "To build a commons"}</H2>
        <Lead>
          {locale === "ko"
            ? "Question Commons는 저절로 만들어지지 않는다. 의도적인 설계와 제도적 지원이 필요하다. 다만 정부가 소유하거나 통제하는 것이 아니라 촉진하고 지원하는 방식이어야 한다."
            : "A Question Commons does not emerge by itself. It requires intentional design and institutional support — but in a mode of facilitation and support, not ownership and control."}
        </Lead>
        <div className="mt-7 grid gap-3">
          {POLICIES.map((p) => (
            <div key={p.n} className="grid grid-cols-[40px_1fr] gap-x-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-[52px_1fr] sm:p-6">
              <div className="pt-0.5 font-mono text-sm font-bold text-[color:var(--accent)]">{p.n}</div>
              <div>
                <h3 className="text-[17px] font-semibold leading-snug text-navy">{p.title[locale]}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">{p.description[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── conclusion ── */}
      <DocSection>
        <Kicker>{locale === "ko" ? "결론" : "Conclusion"}</Kicker>
        <H2>{locale === "ko" ? "질문에서 공동지식으로" : "From questions to shared knowledge"}</H2>
        <Lead>
          {locale === "ko"
            ? "이 연구는 네 단계의 사다리를 따랐다. 먼저 세계가 한국에 대해 무엇을 묻는지 발견했다. 그 질문이 공공외교에 무엇을 요구하는지 해석했다. 질문을 국가 이미지의 출발점으로 보는 새로운 프레임워크를 제안했다. 그리고 마지막으로, 질문을 공동지식으로 전환하는 실행 모델을 설계했다."
            : "This research followed a four-rung ladder. First, we discovered what the world asks about Korea. Then we interpreted what those questions demand of public diplomacy. We proposed a new framework that sees questions as the starting point of national image. And finally, we designed an implementation model that transforms questions into shared knowledge."}
        </Lead>
        <Lead>
          {locale === "ko"
            ? "발견에서 해석으로, 해석에서 이론으로, 이론에서 실행 모델로. 이 사다리의 끝에서 우리가 제안하는 것은 단순하다: 질문을 무시하지 말라. 질문에 답하라. 그리고 그 답변을 모두의 자산으로 만들라."
            : "From discovery to interpretation, from interpretation to theory, from theory to implementation. What we propose at the end of this ladder is simple: do not ignore the questions. Answer them. And make those answers everyone's asset."}
        </Lead>
        <p className="mt-8 max-w-[48ch] text-[22px] font-semibold leading-snug tracking-tight text-navy">
          {locale === "ko"
            ? "국가 이미지는 국가가 만드는 것이 아니다. 질문하는 사람과 답변하는 사람이 함께 만든다. 그 만남의 장소가 커먼즈다."
            : "National image is not made by the state. It is made together by those who ask and those who answer. The commons is where they meet."}
        </p>
      </DocSection>
    </>
  );
}
