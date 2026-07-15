"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

const STAGES: { n: string; name: L; sub: L; who: L; role: L; value: L; ai: L; loop: L }[] = [
  { n: "01", name: D("질문", "Question"), sub: D("원자", "the atom"), who: D("누구든, 어디서든 — 세계, 그리고 자신에 대한 한국", "Anyone, anywhere — the world, and Korea about itself"), role: D("이해의 실제 공백이 입력된 질문으로 떠오른다 — 시스템이 움직이는 불가분의 단위.", "A real gap surfaces as a typed question — the indivisible unit the system moves."), value: D("원(原)신호: 이해하려는 진정한 미충족 욕구.", "Raw signal: an authentic, unmet need to understand."), ai: D("AI가 흔히 첫 응답자다 — 질문자가 받는 답이 점점 AI 형태다. 그렇기에 질문은 인간 커먼즈로 들어와야 한다.", "AI is now often the first responder — which is exactly why the question must enter a human commons."), loop: D("다른 모든 단계가 새 질문을 여기로 방출한다.", "Every other stage emits new questions back here.") },
  { n: "02", name: D("발견", "Discovery"), sub: D("표면화", "surfacing"), who: D("연구자 · 시민 · 교육자 · 디아스포라 · 도처의 센서", "Researchers · citizens · educators · diaspora · sensors everywhere"), role: D("소음에서 실제 질문을 수확해 보이고 공유되게 한다 — 주기적 연구가 아니라 상시 흐름.", "Harvesting the real question from noise, making it visible and shared — an ambient stream, not a periodic study."), value: D("사적 호기심이 커먼즈의 공적·공유 객체가 된다.", "A private curiosity becomes a public, shared object."), ai: D("AI가 실시간으로 군집·중복제거·번역하고 신흥 질문을 감지해 발견 비용을 0에 가깝게 낮춘다 — 누구나 발견자가 된다.", "AI clusters, dedupes, translates and detects emergent questions in real time — everyone can be a discoverer."), loop: D("사용이 기여를 끌어온다: 쓸수록 더 많은 질문이 유입된다.", "Usage attracts contribution: the more it's used, the more flows in.") },
  { n: "03", name: D("해석", "Interpretation"), sub: D("의미", "meaning"), who: D("연구자 · 디아스포라 · 교육자 · 커뮤니티", "Researchers · diaspora · educators · communities"), role: D("질문에 맥락을 준다 — 왜, 어떤 프레임으로, 정직하고 논쟁적인 답은 무엇인지. 단일 권위가 아닌 다원.", "Giving the question context — why, through what frame, what the honest and contested answers are. A plurality, not one authority."), value: D("의미: 질문이 해석 층을 얻는다(개념→주제→인식).", "Meaning: the question gains an interpretive layer."), ai: D("AI가 1차 해석 초안을 쓰고 7개 언어로 번역하며, 인간 — 특히 디아스포라 — 이 검증·교정한다. AI가 제안하고 커뮤니티가 결정한다.", "AI drafts first-pass interpretations and translates; humans — especially diaspora — validate. AI proposes, the community disposes."), loop: D("해석이 평가·논쟁되어 나은 것이 부상, 해석 커먼즈가 형성된다.", "Interpretations are rated and contested; better ones rise.") },
  { n: "04", name: D("콘텐츠", "Content"), sub: D("창작", "creation"), who: D("창작자 · 학생 · 교육자 · 기업", "Creators · students · educators · companies"), role: D("해석된 질문을 소비 가능한 것으로 — 영상·에세이·스레드·제품·수업 — 만들어 전파한다.", "Turning the interpreted question into something consumable that travels."), value: D("도달과 공명: 의미가 청중을 찾는다.", "Reach and resonance: meaning finds an audience."), ai: D("공동 창작자·번역가로서 제작 비용을 무너뜨려, 스튜디오뿐 아니라 학생·소규모 창작자가 만들고, 콘텐츠가 각 질문자에 맞춰진다.", "As co-creator and translator it collapses production cost — students and small creators produce, and content personalizes."), loop: D("공명하는 것이 발견으로 가는 수요 신호이며, 댓글이 새 질문을 낳는다.", "What resonates is a demand signal to Discovery; comments spawn new questions.") },
  { n: "05", name: D("교육", "Education"), sub: D("학습", "learning"), who: D("교육자 · 학생 · 기관 · AI 튜터", "Educators · students · institutions · AI tutors"), role: D("호기심을 역량으로 전환한다 — ‘한국어 어렵나’ 질문이 학습 경로가 된다.", "Converting curiosity into competence — “is Korean hard” becomes a learning pathway."), value: D("지속되는 역량 — 언어·문화 리터러시: 시스템 최고 잔존 성과.", "Durable capability — the highest-retention outcome."), ai: D("AI 튜터가 학습자의 언어·수준에 맞춰 1:1로 개인화하고, 커리큘럼이 고정 강의계획이 아니라 학습자의 실제 질문에서 시작한다.", "AI tutors personalize 1:1, and the curriculum starts from the learner's real question, not a fixed syllabus."), loop: D("학습자가 어려워하고 다음에 묻는 것이 새 질문으로 재유입되고, 학습자가 다음 창작자가 된다.", "What learners ask next re-enters as new questions; learners become the next creators.") },
  { n: "06", name: D("커뮤니티", "Community"), sub: D("토론", "discussion"), who: D("커뮤니티 · 디아스포라 · 시민 · 학생", "Communities · diaspora · citizens · students"), role: D("의미를 논쟁·지역화·검증한다 — 신뢰와 뉘앙스가 사회적으로 협상되는 곳.", "Contesting, localizing and stress-testing meaning — where trust and nuance are negotiated."), value: D("정당성: 의미가 발부되지 않고 논쟁되었기에 신뢰된다.", "Legitimacy: meaning becomes credible because it was argued, not issued."), ai: D("실시간 번역이 브라질인·인도네시아인·한국인이 같은 질문을 언어를 넘어 토론하게 한다 — 진정한 초국가적 호기심 공중.", "Real-time translation lets people discuss the same question across languages — genuinely transnational publics of curiosity."), loop: D("이견이 공백을 드러내 새 질문과 더 나은 해석 수요를 낳는다.", "Disagreement surfaces gaps, feeding new questions and better interpretation.") },
  { n: "07", name: D("시민 참여", "Civic participation"), sub: D("목소리와 행동", "voice & action"), who: D("시민 · 디아스포라 · 커뮤니티 · 공공기관", "Citizens · diaspora · communities · public institutions"), role: D("이해를 기여로 전환한다 — 답하고, 지식을 더하고, 정책을 형성한다. 모든 참여자가 미시 외교관.", "Turning understanding into contribution — answering, adding knowledge, shaping policy. Every participant a micro-diplomat."), value: D("공공재와 주체성: 국가 이미지가 참여적이 된다.", "Public good and agency: national image becomes participatory."), ai: D("AI가 장벽을 낮춘다 — 초안·번역·답할 수 있는 질문 매칭 — 참여가 활동가에서 누구에게로 확장된다.", "AI lowers the barrier — draft, translate, match to a question you can answer — so participation scales to anyone."), loop: D("기여가 소속감과 정체성을 키우고, 그것이 더 많은 기여를 낳는다.", "Contributing builds belonging, which produces more contribution.") },
  { n: "08", name: D("새 지식", "New knowledge"), sub: D("종합", "synthesis"), who: D("연구자 · 기관 · AI · 모두", "Researchers · institutions · AI · everyone"), role: D("축적된 답·토론·콘텐츠를 새 지식으로 종합한다 — 더 나은 온톨로지, 무엇이 이해됐는지의 지도.", "Synthesizing accumulated answers, discussions and content into new knowledge — better ontologies, a map of what's understood."), value: D("복리로 쌓이는 공공 지식 — 생태계가 자신을 학습한다.", "Compounding public knowledge — the ecosystem learns about itself."), ai: D("AI가 수백만 상호작용을 메타 지식으로 종합하고 해소–열림 질문을 추적한다 — 살아 있는 점수판.", "AI synthesizes across millions of interactions and tracks resolved-vs-open — the living scoreboard."), loop: D("종합이 무엇이 안착됐고 무엇이 새로 열렸는지를 드러낸다.", "Synthesis reveals what is settled and what is newly open.") },
  { n: "09", name: D("새 질문", "New questions"), sub: D("재생", "regeneration"), who: D("모든 단계가 동시에 방출", "Emitted by every stage at once"), role: D("학습·토론·콘텐츠·지식이 각기 새 질문을 낳아 커먼즈를 재파종한다 — 나선이 돈다.", "Learning, discussion, content and knowledge each generate fresh questions that re-seed the commons — the spiral turns."), value: D("재생: 커먼즈가 시작보다 풍요롭게 각 순환을 마친다.", "Regeneration: the commons ends each loop richer than it began."), ai: D("AI가 흐름 어디서든 신흥 질문이 나타나는 순간 감지해 루프를 즉시 닫는다.", "AI detects the emergent question the moment it appears, closing the loop instantly."), loop: D("→ 한 바퀴 더 깊이, 1단계로 돌아간다.", "→ returns to Stage 01, one turn deeper.") },
];

const DYN: [L, L, L][] = [
  [D("참여", "Participation"), D("모두가, 어디서든, 다른 역할로", "Everyone, everywhere, in different roles"), D("아홉 행위자 유형이 모든 단계에 존재하고 역할만 회전한다. 참여는 정체성이 아니라 흐름 속 위치로 배정된다.", "The nine actor-types are present at every stage; only the role rotates. Participation is assigned by position in the flow, not identity.")],
  [D("가치", "Value"), D("추출이 아니라 순환", "Circulation, not extraction"), D("각 인계가 층을 더하고 — 신호·의미·도달·역량·정당성·주체성·지식 — 포착이 아니라 커먼즈로 되돌린다.", "Each handoff adds a layer and returns it to the commons rather than capturing it.")],
  [D("AI", "AI"), D("답이 아니라 결합 조직", "Connective tissue, not the answer"), D("AI가 발견·번역·해석·창작·튜터링·종합 비용을 0으로 무너뜨려 누구나 어떤 역할도 할 수 있게 한다. 위험은 단일 목소리가 되는 것 — 커먼즈가 인간을 루프 안에 둔다.", "AI collapses the cost of every role toward zero so anyone can perform any role. Its danger is becoming the single voice; the commons keeps humans in the loop.")],
  [D("가교", "Bridges"), D("디아스포라가 최고 가치 노드", "Diaspora are the highest-value node"), D("디아스포라는 두 프레임 안에 동시에 살기에 묻는 시장과 한국을 잇는 자연스러운 번역자다 — 결합하는 인간, 순환할수록 기여가 커진다.", "Living inside two frames at once, diaspora are the natural translators between the asking market and Korea — their contribution rises with every loop.")],
];

const FORMS: [L, L, L][] = [
  [D("학습", "Learning"), D("질문 기반 커리큘럼", "Question-native curricula"), D("실제 질문을 입양해 답하며 한국을 배운다 — 수요 주도, 전 지구적으로 조달되고 개인화된. 강의계획이 아니라 내가 실제로 가진 질문에서 시작하는 언어 학습.", "You learn Korea by adopting a real question and answering it — demand-driven, globally sourced, personalized. Language study that begins from the question you actually have.")],
  [D("커뮤니티", "Community-building"), D("호기심의 공동체", "Communities of curiosity"), D("사람들이 공유된 지리가 아니라 공유된 질문을 중심으로 모인다 — 브라질·인도네시아·한국·독일에 걸친 ‘질문 서클’.", "People gather around a shared question rather than a shared geography — a “question circle” spanning Brazil, Indonesia, Korea and Germany.")],
  [D("공공외교", "Public diplomacy"), D("공동 저술된 국가 이미지", "Co-authored national image"), D("한국의 이미지가 방송이 아니라 지속적으로 편집되는 공공 작업이 되고, 인간이 AI가 한국을 어떻게 말하게 되는지의 루프 안에 남는 곳.", "Korea's image becomes a continuously edited public work, not a broadcast — and where humans stay in the loop of what AI learns to say about Korea.")],
  [D("디아스포라 참여", "Diaspora engagement"), D("가교를 통한 소속", "Belonging through bridging"), D("디아스포라가 정의된 고가치 역할을 얻는다 — 두 세계를 잇는 가교-해석자 — 정체성을 기여로, 기여를 소속으로 바꾼다.", "The diaspora gain a defined, high-value role — bridge-interpreters between their two worlds — turning identity into contribution and contribution into belonging.")],
  [D("지식 생산", "Knowledge production"), D("살아 있는 다원적 사회과학", "A living, plural social science"), D("세계가 한 나라를 어떻게 인식하는지에 대한 열린 누적 지식 기반이 학자만이 아니라 참여자에 의해 생산되고, 다른 나라가 포크할 수 있다.", "An open, cumulative knowledge base of how the world perceives a nation, produced by participants rather than only scholars — forkable by any other nation.")],
  [D("시민 참여", "Civic participation"), D("외교 시민권", "Diplomatic citizenship"), D("답하기가 누구에게나 — 관심 있는 비한국인 포함 — 열린 시민 행위가 되어, 커먼즈가 이해를 형성하는 것이 참여의 한 형태인 공적 공간이 된다.", "Answering becomes a civic act open to everyone — including non-Koreans who care — making the commons a public space where shaping understanding is a form of participation.")],
];

function Ring({ locale }: { locale: "ko" | "en" }) {
  const C = 310, R = 212, N = STAGES.length;
  const pt = (a: number, r: number) => [C + r * Math.cos(a), C + r * Math.sin(a)];
  return (
    <svg viewBox="-98 0 816 620" className="mx-auto w-full" style={{ maxWidth: 720 }} role="img" aria-label={locale === "ko" ? "질문 순환 생태계 다이어그램" : "Question-circulation ecosystem diagram"}>
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-2, #c9d2e0)" strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
      {[0, 1, 2, 3].map((a) => {
        const ang = -Math.PI / 2 + a * (Math.PI / 2) + 0.2;
        const [x, y] = pt(ang, R);
        const tang = ang + Math.PI / 2, s = 6.5;
        const p = (o: number) => `${x + s * Math.cos(tang + o)} ${y + s * Math.sin(tang + o)}`;
        return <path key={a} d={`M ${p(0)} L ${p(2.5)} L ${p(-2.5)} Z`} fill="var(--accent)" opacity={0.7} />;
      })}
      <circle cx={C} cy={C} r={66} fill="color-mix(in srgb, var(--accent) 12%, #fff)" stroke="var(--accent)" strokeWidth={2} />
      <text x={C} y={C - 4} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--accent)">AI</text>
      <text x={C} y={C + 15} textAnchor="middle" fontSize={10.5} fill="var(--accent)" fontFamily="monospace">{locale === "ko" ? "결합 조직" : "connective"}</text>
      {STAGES.map((s, i) => {
        const ang = -Math.PI / 2 + i * (2 * Math.PI / N);
        const [nx, ny] = pt(ang, R);
        const [hx, hy] = pt(ang, 72);
        const [lx, ly] = pt(ang, R + 40);
        const cosA = Math.cos(ang);
        const anchor = Math.abs(cosA) < 0.34 ? "middle" : cosA > 0 ? "start" : "end";
        return (
          <g key={s.n}>
            <line x1={hx} y1={hy} x2={nx} y2={ny} stroke="var(--accent)" strokeWidth={1} strokeDasharray="1 6" opacity={0.5} />
            <circle cx={nx} cy={ny} r={21} fill="#fff" stroke="var(--accent)" strokeWidth={2} />
            <text x={nx} y={ny + 5} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={15} fill="var(--accent)">{i + 1}</text>
            <text x={lx} y={ly} textAnchor={anchor} fontSize={15} fontWeight={650} fill="var(--navy, #0d1b31)">{s.name[locale]}</text>
            <text x={lx} y={ly + 16} textAnchor={anchor} fontSize={12} fill="var(--muted-foreground, #6b7890)">{s.sub[locale]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function QuestionCommons() {
  const { locale } = useLanguage();
  return (
    <>
      <DocSection>
        <Kicker>{locale === "ko" ? "재구성" : "The reframe"}</Kicker>
        <H2>{locale === "ko" ? "질문은 모든 행위자가 쥘 수 있는 유일한 객체다" : "A question is the one object every actor can hold"}</H2>
        <Lead>
          {locale === "ko"
            ? "제도는 사람을 역할로 나눈다. 질문은 그러지 않는다. 같은 질문 — ‘한국은 안전한가’, ‘한국어는 어렵나’ — 을 연구자가 발견하고, 디아스포라가 해석하고, 창작자가 영상으로 만들고, 교육자가 가르치고, 커뮤니티가 논쟁하고, 시민이 답하고, 새 질문을 낳는 지식으로 종합할 수 있다. 질문은 경계 객체다 — 누구의 것도 아니면서 모두를 잇는다."
            : "Institutions divide people by role. A question doesn't. The same question — “is Korea safe,” “is Korean hard” — can be discovered by a researcher, interpreted by a diaspora member, made into a video by a creator, taught by an educator, argued in a community, answered by a citizen, and synthesized into knowledge that raises new questions. The question is a boundary object: it belongs to no one and connects everyone."}
        </Lead>
        <Lead>
          {locale === "ko"
            ? "그래서 설계 단위는 조직이 아니라 흐름이며, 가치는 체인의 끝에서 추출되지 않고 매 인계마다 더해져 커먼즈로 돌아간다. 밸류체인은 제품으로 끝나고, 순환은 더 풍요로운 커먼즈와 새 질문으로 끝난다."
            : "So the design unit is the flow, not the organization — and value is not extracted at the end of a chain but added at every handoff and returned to the commons. A value chain ends in a product; a circulation ends in a richer commons and a new question."}
        </Lead>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-secondary">
          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-[color:var(--accent)]" />{locale === "ko" ? "인간 참여 — 흐르는 질문, 더해지는 가치" : "Human participation — the question flowing, value added"}</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ background: "#6b62c6" }} />{locale === "ko" ? "AI — 모든 단계에 엮인 결합 조직" : "AI — the connective tissue woven through every stage"}</span>
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{locale === "ko" ? "순환" : "The circulation"}</Kicker>
        <H2>{locale === "ko" ? "질문은 사회를 어떻게 순환하며, 어떻게 더 커져 돌아오는가" : "How a question travels through society — and comes back larger"}</H2>
        <Lead>{locale === "ko" ? "선이 아니라 나선이다: 매 순환이 커먼즈를 더 깊게, 참여를 더 넓게, 이해를 더 낫게 한다. AI는 중심에 있다 — 답이 아니라 어떤 행위자든 어떤 단계에 닿게 하는 조직으로서." : "Not a line but a spiral: each pass leaves the commons deeper, participation wider, understanding better. AI sits at the centre — not as the answer, but as the tissue that lets any actor reach any stage."}</Lead>
        <div className="mt-6 rounded-2xl border border-border bg-white p-4 sm:p-6"><Ring locale={locale} /></div>
      </DocSection>

      <DocSection>
        <Kicker>{locale === "ko" ? "단계" : "The stages"}</Kicker>
        <H2>{locale === "ko" ? "아홉 단계 · 모든 행위자 존재 · 역할 회전" : "Nine stages · every actor present · roles rotate"}</H2>
        <div className="mt-7 grid gap-3">
          {STAGES.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-[15px] font-bold text-[color:var(--accent)]">{s.n}</span>
                <h3 className="text-[19px] font-semibold text-navy">{s.name[locale]} <span className="text-sm font-normal text-muted-foreground">· {s.sub[locale]}</span></h3>
              </div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">{locale === "ko" ? "주도: " : "Who leads: "}{s.who[locale]}</div>
              <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {([["역할", "Role", s.role], ["더해지는 가치", "Value added", s.value], ["AI가 바꾸는 것", "How AI changes it", s.ai], ["피드백 루프", "Feedback loop", s.loop]] as [string, string, L][]).map(([ko, en, v], j) => (
                  <div key={en}>
                    <div className={"mb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] " + (j === 2 ? "text-[#6b62c6]" : j === 3 ? "text-[color:var(--accent)]" : "text-muted-foreground")}>{locale === "ko" ? ko : en}</div>
                    <p className="text-[14.5px] leading-relaxed text-secondary">{v[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{locale === "ko" ? "역학" : "The dynamics"}</Kicker>
        <H2>{locale === "ko" ? "순환을 붙드는 것" : "What holds the circulation together"}</H2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {DYN.map(([tag, h, b]) => (
            <div key={tag.en} className="rounded-xl border border-border bg-white p-5">
              <span className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent)]">{tag[locale]}</span>
              <h4 className="text-[16.5px] font-bold text-navy">{h[locale]}</h4>
              <p className="mt-1.5 text-[15px] text-secondary">{b[locale]}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection>
        <Kicker>{locale === "ko" ? "전환" : "The shift"}</Kicker>
        <H2>{locale === "ko" ? "1,540개 질문이 데이터셋이 아니라 커먼즈라면" : "If the 1,540 questions are a commons, not a dataset"}</H2>
        <Lead>{locale === "ko" ? "연구 산출물은 읽히고 소유된다. 커먼즈는 그 위에 지어진다 — 열리고, 포크되고, 귀속되고, 기여된다. 질문들을 한 나라의 첫 재배 ‘질문 게놈’으로 다루면, 어떤 제도도 발주할 수 없었던 새 형태가 가능해진다:" : "A research output is read and owned. A commons is built on — open, forkable, attributable, contributable. Treat the questions as the world's first cultivated “question-genome” for a nation, and new forms become possible that no institution could have commissioned:"}</Lead>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {FORMS.map(([dom, sub, txt]) => (
            <div key={dom.en} className="grid gap-2 bg-white p-5 sm:grid-cols-[190px_1fr] sm:gap-5 sm:p-6">
              <div><div className="text-[16px] font-bold text-navy">{dom[locale]}</div><div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.05em] text-[color:var(--accent)]">{sub[locale]}</div></div>
              <p className="text-[15.5px] leading-relaxed text-secondary">{txt[locale]}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{locale === "ko" ? "나선" : "The spiral"}</Kicker>
        <p className="max-w-[66ch] text-[18px] leading-relaxed text-secondary">
          {locale === "ko"
            ? "생태계의 산출물은 답이 아니다. 그것은 자신의 호기심을 대사(代謝)하는 법을 배운 사회다 — 세계 어디서 입력되든 한국에 대한 질문이 갈 곳이 있고, 만날 사람이 있으며, 지식과 더 나은 질문으로 돌아올 길이 있는 곳."
            : "The ecosystem's product is not answers. It is a society that has learned to metabolize its own curiosity — where a question about Korea, wherever it is typed, has somewhere to go, someone to meet, and a way to come back as knowledge and a better question."}
        </p>
        <div className="mt-5 text-[22px] font-semibold leading-snug text-navy max-w-[54ch]">
          {locale === "ko"
            ? "데이터셋은 한국이 세계에 대해 아는 것에서, 세계가 한국과 함께 짓는 것으로 바뀐다 — 한 번에 한 질문씩, 영원히 재생하면서."
            : "The dataset stops being something Korea knows about the world, and becomes something the world builds with Korea — one question at a time, forever regenerating."}
        </div>
      </DocSection>
    </>
  );
}
