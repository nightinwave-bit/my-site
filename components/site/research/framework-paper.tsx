"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

// The three things we take for granted — and why the questions break each one.
const FALSIFIED: [L, L, L][] = [
  [D("하나의 이미지", "One image for everyone"), D("착각 01", "Myth 01"), D("질문의 69%가 그 나라에만 있다. 온 세계에 통하는 ‘하나의 한국’은 없고, 나라마다 다르게 보는 일곱 개의 한국이 있다.", "69% of the questions appear in only one country. There is no single “world Korea” to brand — there are seven partial Koreas, each seen through a local lens.")],
  [D("관심 = 성공", "Attention means success"), D("착각 02", "Myth 02"), D("관심은 역대 최고인데, 가장 많이 나오는 질문은 여전히 ‘왜 둘로 나뉘었나’다. 사람들은 한국을 많이 본다. 하지만 많이 안다고 보긴 어렵다.", "Attention is at record highs, yet the most-asked question is still “why is Korea split in two.” People see a lot of Korea — but that isn’t the same as knowing it.")],
  [D("국가가 이미지를 만든다", "The state makes the image"), D("착각 03", "Myth 03"), D("실제 이미지는 함께 만들어진다 — 질문하는 사람, 해외 동포, 민간 기업이 같이. 그런데 국가에는 그 목소리를 ‘듣는 장치’가 없다.", "The real image is made together — by the people asking, the diaspora, private companies. But the state has no device for listening.")],
];

// Each framework is an argument, not a label. It runs:
//   observation → problem → interpretation → implication → institution.
// The institution is named only at the end, once the reasoning has made it
// feel inevitable. The concept names are kept intact.
type FW = {
  no: string;
  cat: L;
  observation: L; // the concrete thing we see (the heading)
  problem: L;     // what breaks because of it
  interpretation: L; // why it happens / what it really is
  implication: L; // therefore, what is needed
  institution: { name: L; body: L }; // the inevitable answer
  evidence: L;
};

const FRAMEWORKS: FW[] = [
  {
    no: "01", cat: D("무엇을 성공으로 볼 것인가 · 측정", "What counts as success · Measurement"),
    observation: D("한국은 조회수, 방문자 수, 콘텐츠 소비량을 잰다. 그런데 ‘사람들이 한국을 더 정확히 이해하게 됐는지’는 재지 않는다.", "Korea measures views, visitors, and content consumed. It does not measure whether anyone came to understand Korea more accurately."),
    problem: D("그래서 이상한 일이 벌어진다. 모든 관심 지표에서 최고 기록을 세우는 동안에도, 세계가 가장 많이 던지는 질문은 15년째 ‘왜 둘로 나뉘었나’에 머물러 있다. 관심은 사상 최고인데 이해는 제자리다 — 그리고 지금의 어떤 지표도 이 사실을 잡아내지 못한다.", "This produces a strange result. While every attention metric hits records, the world's most-asked question has stayed “why is it split in two” for fifteen years. Attention is at an all-time high while understanding stands still — and no current metric catches this."),
    interpretation: D("이유는 단순하다. 우리가 쓰는 지표가 ‘관심의 양’만 재고 ‘이해의 변화’는 재지 않기 때문이다. 인식 순위표는 특정 시점의 스냅숏을 매길 뿐, 한 나라가 안고 있는 ‘아직 안 풀린 질문’이 늘고 있는지 줄고 있는지는 아무도 추적하지 않는다. 잘못 재는 것은 관리할 수 없다.", "The reason is simple: our metrics count how much attention, not how much understanding changed. Perception indices score a snapshot; no one tracks whether a country's stock of unanswered questions is rising or falling. What you measure wrong, you cannot manage."),
    implication: D("그렇다면 필요한 것은 분명하다. ‘관심’이 아니라 ‘이해’를 재는 지표, 그것도 한 시점의 점수가 아니라 ‘질문이 풀렸는가, 새로 생겼는가’라는 변화를 추적하는 지표다. 질문 하나하나를 ‘아직 갚지 않은 빚’으로 보는 순간, 이해는 처음으로 장부에 기록할 수 있는 것이 된다.", "So what's needed is clear: a metric for understanding, not attention — and one that tracks change (was a question resolved, or a new one opened?), not a single score. The moment you treat each question as an unpaid debt, understanding becomes something you can, for the first time, keep books on."),
    institution: { name: D("복식 이해 회계 — 국가 이해 계정", "Double-entry comprehension accounting — a National Comprehension Account"), body: D("반복되는 질문은 부채로, 지속적으로 해소된 질문은 자산으로 기록한다. 나라 예산처럼 공개하고 감사받는 시장별 원장을 두고, 모든 사업을 ‘순(純)으로 얼마나 많은 부채를 갚았는가’로 평가한다. 브랜드 자본은 도달이 아니라 ‘시장별 순 해소 이해’다.", "Recurring questions are booked as liabilities, durably resolved ones as assets. A public, audited, per-market ledger — kept like the national accounts — scores every program on how much net debt it retired. Brand equity is net resolved comprehension per market, not reach.") },
    evidence: D("1,540개의 질문이 그 개시 잔액이고, 한류 붐 내내 사라지지 않은 분단 질문이 오래 상각되지 않은 부채의 표식이다.", "The 1,540 questions are the opening balance; the division question, unpaid all through the Hallyu boom, is the marker of a long-overdue debt."),
  },
  {
    no: "02", cat: D("예산을 어떻게 정할 것인가 · 공공외교", "How to set the budget · Public diplomacy"),
    observation: D("한국은 무엇을 보여 줄지 먼저 정하고, 그다음 세계에 내보낸다. 세계가 무엇을 궁금해하는지는 거의 묻지 않는다.", "Korea decides what to show, then broadcasts it. It rarely asks what the world is curious about first."),
    problem: D("그 결과 문화 예산은 ‘체면’과 ‘공급’으로 배분된다 — 센터를 짓고 축제를 연다. 정작 8개 시장의 수요 지도를 보면, 사람들이 가장 많이 묻는 역사·전통과 언어 입문은 오히려 덜 채워져 있다. 돈이 흐르는 방향이 청중을 못 보고 있다.", "As a result, cultural budgets are handed out by prestige and supply — build a center, run a festival. Yet the 8-market demand map shows the most-asked areas, history/heritage and beginner language, are the under-served ones. The money is flowing without seeing the audience."),
    interpretation: D("이건 의지의 문제가 아니라 기관의 문제다. 한국은 콘텐츠를 만드는 힘은 세계 최고 수준인데, ‘무엇이 필요한지 알아듣는 귀’에 해당하는 기관이 아예 없다. 만드는 입은 거대하고, 듣는 귀는 없다.", "This is not a failure of will but of institutions. Korea's capacity to make content is world-class; it has no organ that functions as an ear for what people actually need. The mouth is enormous, the ear absent."),
    implication: D("그렇다면 순서를 뒤집어야 한다. 세계가 실제로 던지는 질문이 문화정책의 의제와 예산을 정하는 ‘입력’이 되어야 한다. 이 데이터셋 자체가, 국가에 없던 바로 그 ‘귀’의 시제품이다 — 이제 그것을 일회성 연구가 아니라 상설 기관으로 만들면 된다.", "So the order has to flip: the questions the world actually asks must become the input that sets the agenda and the budget. This dataset is a prototype of exactly the ear the state has lacked — the task is to make it permanent, not a one-off study."),
    institution: { name: D("경청하는 국가 — 국가 질문 관측소", "The Listening State — a National Question Observatory"), body: D("이 수집 파이프라인을 상시로 돌리는 영구 감지 기관, 그리고 문화 예산의 일부를 시장별 ‘호기심 지수’에 묶는 규칙. 지출은 가장 크게 안 풀린 수요로 흐르고, 신호 없는 위세 사업에서 회수된다. 이미지 부처는 ‘생산자’에서 ‘듣고 배분하는 자’로 재정립된다.", "A permanent sensing body that runs this collection continuously, plus a rule tying part of the cultural budget to a per-market Curiosity Index. Spend flows to the largest unresolved demand and is withdrawn from prestige projects with no signal. The image ministry is refounded from producer to listener-and-allocator.") },
    evidence: D("8개 시장 수요 지도가 이미 오배분을 드러낸다 — 수요가 큰 역사·전통·언어 입문이 측정된 수요 대비 덜 채워져 있다.", "The 8-market demand map already exposes the mis-spend — history, heritage, and beginner-language on-ramps are under-served relative to measured demand."),
  },
  {
    no: "03", cat: D("누가 결정할 것인가 · 운영", "Who decides · Governance"),
    observation: D("일본은 한국에 대해 예절과 K-팝을 묻고, 독일은 언어가 얼마나 어려운지를 묻고, 브라질과 아랍은 ‘왜 둘로 나뉘었나’를 묻는다. 나라마다 1위 질문이 다르다.", "Japan asks Korea about manners and K-pop, Germany asks how hard the language is, Brazil and the Arab world ask “why is it split in two.” Each country's #1 question is different."),
    problem: D("그런데 질문의 69%는 그 나라에만 있고, 여러 나라에 공통으로 나타나는 건 31%뿐이다. 하나의 ‘세계 캠페인’은 서로 안 맞는 질문들을 평균 내 버려서, 결국 모든 시장을 어중간하게 만족시키는 유일한 형식이 된다.", "But 69% of the questions are local; only 31% are shared. A single “global campaign” averages across questions that don't fit together — the one format that ends up half-serving every market at once."),
    interpretation: D("이건 메시지를 잘 만들면 풀리는 문제가 아니라 구조의 문제다. ‘한 나라 = 하나의 이미지’라는 생각은 온 세계가 같은 광장에서 같은 이야기를 본다는 전제 위에 있는데, 알고리즘과 다국어 환경이 그 광장을 이미 여러 개로 쪼개 놨다. 브랜딩 이론이 현실을 못 따라잡은 것이다.", "This isn't fixed by a better message; it's structural. The “one nation, one image” idea assumes a single global public square, and the algorithmic, multilingual internet has already split that square into many. The theory never caught up to the reality."),
    implication: D("그렇다면 브랜드도 여러 판이어야 한다. 모두가 물려받는 아주 얇은 공통 코어 하나 — ‘여기는 남한, 민주적이고 안전하며 북한과 다르다’ — 를 두고, 그 위의 모든 것은 시장마다 그 시장의 가장 걸린 질문을 풀도록 다시 짠다. 하나의 코어, 여러 에디션.", "So the brand itself must come in editions. Keep one very thin shared core everyone inherits — “this is South Korea: democratic, safe, distinct from the North” — and rebuild everything above it market by market, each edition built to resolve that market's load-bearing question. One core, many editions."),
    institution: { name: D("연합형 국가 브랜딩 — 시장 프레임 협의체", "Federated Nation Branding — Market Frame Councils"), body: D("한국 기관 + 현지 매개자 + 해외 동포를 한 팀으로 묶어 각 시장의 ‘한국 에디션’을 위임 권한으로 관장하는 분산 거버넌스. 브랜딩이 중앙 방송이 아니라 여러 곳이 나눠 맡는 다중심 운영이 된다.", "Devolved councils that pair Korean institutions with local intermediaries and diaspora, each holding delegated authority over its market's edition of Korea. Branding stops being a central broadcast and becomes polycentric governance.") },
    evidence: D("시장마다 1위 개념이 다르고(사람·언어·분단·유산), 공유 참조점은 31%뿐 — 사실상 이미 ‘여러 판’인데, 구조만 아직 하나로 묶여 있다.", "Divergent per-market #1 concepts (people, language, division, heritage) with only 31% shared — it is already many editions in fact, waiting for a structure that admits it."),
  },
  {
    no: "04", cat: D("누가 답할 것인가 · 시민 참여", "Who answers · Civic participation"),
    observation: D("1,540개의 질문에는 답할 사람이 필요하다. 그런데 지금 그 질문에 공식적으로 답하는 통로는 어디에도 없다.", "The 1,540 questions need someone to answer them. Right now there is no official channel that does."),
    problem: D("정작 답할 지식은 이미 존재한다 — 5,100만 한국인과 약 700만 해외 동포 안에. 게다가 그 동포는 시각이 가장 크게 갈리는 바로 그 시장들(브라질·인도네시아·독일·일본·미국)에 이미 살고 있다. 지식도, 사람도 있는데 아무도 동원되지 않았다.", "The knowledge to answer them already exists — in 51 million Koreans and about 7 million diaspora. And those diaspora already live in exactly the markets whose views diverge most (Brazil, Indonesia, Germany, Japan, the US). The knowledge and the people are there; no one has been mobilized."),
    interpretation: D("이유는 공공외교가 구조적으로 소수의 일이기 때문이다 — 부처, 기관, 유명인. 보통 사람이 세계 속에서 한국을 함께 설명할 인프라가 없다. 한국이 ‘외국인이 보는 한국인’을 검색한다는 사실은, 갈 곳 없는 참여 에너지가 이미 존재한다는 뜻이다.", "The reason is that public diplomacy is structurally the work of a few — ministries, institutions, celebrities. There is no infrastructure for ordinary people to help explain Korea to the world. Korea googling “how foreigners see Koreans” is proof that participation energy already exists with nowhere to go."),
    implication: D("그렇다면 답하기를 ‘부처가 제공하는 서비스’에서 ‘시민이 하는 행위’로 바꿔야 한다. 관측소가 모은 열린 질문을 시민과 동포에게 나눠 주면, 각자 하나를 맡아 자기 언어로 답한다. 서로 검증하고 출처를 남겨 믿을 수 있게 만들면, 5,800만의 나라가 흩어진 외교단이 된다.", "So answering has to shift from a service a ministry delivers into an act citizens perform. Hand the Observatory's open questions to citizens and diaspora; each adopts one and answers it in their own language. Peer-checked and sourced so it can be trusted, a nation of 58 million becomes a distributed diplomatic corps."),
    institution: { name: D("응답의 커먼즈 — 외교 시민권", "The Answering Commons — diplomatic citizenship"), body: D("출처가 추적되는 다언어 시민 플랫폼(‘한국 질문의 위키’)과 가벼운 인정 지위(‘한국 답변자’). 민간에 흩어진 문화 지식을 공공의 외교 재화로 전환한다.", "A provenance-tracked, multilingual citizen platform (a “Wikipedia of Korea questions”) plus a light recognized status (“Korea Answerer”). It converts private cultural knowledge into a public diplomatic good.") },
    evidence: D("한국의 1위 질문이 자기 이미지이고, 동포는 프레임이 갈라지는 바로 그 시장들에 이미 있다.", "Korea's own #1 question is its self-image, and the diaspora already sit in exactly the markets whose frames diverge."),
  },
  {
    no: "05", cat: D("누가 비용을 낼 것인가 · 재원", "Who pays · Financing"),
    observation: D("한국의 가장 강력한 이미지 원천 — K-뷰티·K-팝·K-푸드 — 은 전부 민간 소유다. 그리고 이 산업들이 가장 강한 시장(인도네시아·브라질·아랍)이, 공교롭게도 ‘남북 구분’이 가장 안 된 시장과 정확히 겹친다.", "Korea's strongest image-makers — K-beauty, K-pop, K-food — are all privately owned. And the markets where those industries are strongest (Indonesia, Brazil, the Arab world) are exactly the ones where the two Koreas are least told apart."),
    problem: D("즉 산업이 가장 크게 이득 보는 곳에서, 정작 그 이득이 딛고 선 공공 토대 — 안전하다는 인식, 언어에 대한 관심, ‘한국’ 프리미엄 — 는 가장 약하다. 기업은 국가 이미지에 무임승차하지만, 그 토대에는 아무도 값을 내지 않는다.", "So where the industries gain most, the public foundations that gain rests on — the sense of safety, the interest in the language, the “Korea” premium — are weakest. Firms free-ride on the national image, and no one pays into the foundation."),
    interpretation: D("이건 도덕의 문제가 아니라 회계의 공백이다. 민간 문화가 만들어 내는 국가-이미지 이득(외부효과)을 잡아내고 되돌리는 틀이 없어서, 브랜드가 딛고 선 바닥이 구조적으로 저재원 상태로 남는다.", "This isn't a moral failing but an accounting gap. There is no mechanism to capture and return the national-image value private culture throws off, so the ground the brand stands on stays structurally under-funded."),
    implication: D("그렇다면 그 외부효과를 ‘내부화’해야 한다. 이름값으로 가장 크게 버는 산업이 조금씩 기여해(법으로든 자율로든), 자신들이 기대는 공공재 — 남북 구분, 언어 입문, 역사 깊이 — 에만 쓰도록 봉인한 기금을 만든다. 성과는 앞의 이해 계정으로 잰다.", "So the externality has to be internalized. Have the industries that profit most contribute a small amount (statutory or voluntary) into a fund ring-fenced to the public goods they depend on — telling the two Koreas apart, language on-ramps, historical depth — with performance measured by the Comprehension Account."),
    institution: { name: D("국가 이미지 기금", "The National Image Endowment"), body: D("산업·정부·시민사회가 공동 지배하는 공-사 신탁. 지출은 캠페인이 아니라 ‘해소한 부채’로 측정된다. 소프트파워가 공짜로 새는 외부효과가 아니라, 관리하고 재투자하는 자산이 된다.", "A public-private trust governed jointly by industry, state, and civil society. Spending is measured in liabilities retired, not campaigns run. Soft power stops being an externality that leaks away for free and becomes a managed, reinvested asset.") },
    evidence: D("K-뷰티의 시장 신호(인도네시아·브라질·아랍)가 분단 구분 결핍과 정확히 겹친다 — 토대가 가장 약한 곳에서 산업이 가장 강하다.", "K-beauty's market signature (Indonesia, Brazil, the Arab world) maps exactly onto the disambiguation deficit — the industry is strongest where the foundation is weakest."),
  },
  {
    no: "06", cat: D("얼마나 오래 볼 것인가 · 장기", "The long horizon · Time"),
    observation: D("한국의 ‘전쟁 틀’은 70년이 넘었는데도 여전히 세계의 1위 질문이다. 15년의 한류로도 첫 질문은 바뀌지 않았다.", "Korea's “war frame” is over 70 years old and is still the world's #1 question. Fifteen years of Hallyu did not change the first thing people ask."),
    problem: D("리브랜딩은 보통 ‘한 번 하는 홍보’로 다뤄진다. 하지만 국가 이미지는 심한 경로 의존성을 갖는다 — 처음 각인된 틀이 버팀목처럼 굳어져 현실과 무관하게 세대를 넘어 지속된다. 그런데 한 나라를 옛 틀에서 지금의 틀로 ‘옮겨’ 줄 정책 도구는 아예 없다.", "Rebranding is usually treated as a one-off promotion. But national images have severe path dependency — the frame a country is first imprinted with hardens into a support beam and persists across generations regardless of reality. And there is no policy tool for moving a country from its inherited frame to its current one."),
    interpretation: D("핵심은, 버팀목이 된 틀은 지울 수 없다는 것이다. 국가 이미지는 시대의 틀을 하나씩 통과한다 — 전쟁 → 발전 → 문화 → 그다음. 각 이행은 한 번의 캠페인이 아니라 한 세대짜리 인프라이며, 옛 틀을 부정하는 게 아니라 그로부터 다리를 놓아야 가능하다.", "The key point is that a load-bearing frame cannot be deleted. A national image passes through eras one at a time — war → development → culture → next. Each transition is generational infrastructure, not a campaign, and it works only by building a bridge from the old frame rather than denying it."),
    implication: D("그렇다면 이행 자체를 ‘관리’해야 한다. ‘분단국이었지만 민주적 기술·문화 강국이 된 나라’처럼, 옛 틀의 무게를 새 틀로 실어 나르는 다리를 놓는다. 이 이행은 앞의 이해 계정에서 진단하고, 수십 년에 걸쳐 시장별로 순서를 짠다.", "So the transition itself has to be managed. Build a bridge that carries the weight of the old frame into the new one — “a divided country that became a democratic tech-and-culture power.” The move is diagnosed from the Comprehension Account and sequenced over decades, market by market."),
    institution: { name: D("관리된 프레임 이행 — 상설 프레임 전략 기구", "Managed Frame Migration — a standing Frame Strategy authority"), body: D("선거 주기에서 절연된 소규모 범부처 장기 조직(국가 이미지의 ‘중앙은행’). 시장마다 버팀목이 된 틀을 진단하고 수십 년짜리 이행을 배열한다. 틀은 정권보다 오래 사니, 관리도 그래야 한다.", "A small, cross-ministry, long-horizon body insulated from the election cycle — a central bank for the national image. It diagnoses each market's load-bearing frame and sequences a decades-long migration. Frames outlive governments, so their management should too.") },
    evidence: D("발전→문화 이행은 진행 중으로 보이지만(기술·경제·한류 질문 동반 상승), 전쟁→다음 이행은 틀이 갱신되지 않은 글로벌 사우스에서 정체돼 있다.", "The development→culture migration looks underway (tech, economy, and Hallyu questions rose together), but the war→next migration is stalled in the Global South, where the frame never updated."),
  },
];

const ARCH: [L, { fw: string; name: L; core?: boolean }[]][] = [
  [D("듣기", "Listen"), [{ fw: "02", name: D("국가 질문 관측소", "National Question Observatory") }]],
  [D("재기", "Measure"), [{ fw: "01", name: D("국가 이해 계정", "National Comprehension Account"), core: true }]],
  [D("만들기", "Make"), [{ fw: "04", name: D("응답의 커먼즈", "The Answering Commons") }, { fw: "03", name: D("연합형 국가 브랜딩", "Federated Nation Branding") }]],
  [D("비용과 시간", "Pay & persist"), [{ fw: "05", name: D("국가 이미지 기금", "National Image Endowment") }, { fw: "06", name: D("관리된 프레임 이행", "Managed Frame Migration") }]],
];

function Block({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-5">
      <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{k}</div>
      <p className="max-w-[66ch] text-[15px] leading-relaxed text-secondary">{children}</p>
    </div>
  );
}

export function FrameworkPaper() {
  const { locale } = useLanguage();
  return (
    <>
      <DocSection>
        <Kicker>{locale === "ko" ? "출발점" : "Where we start"}</Kicker>
        <H2>{locale === "ko" ? "우리는 세계가 같은 한국을 본다고 생각한다. 하지만 질문은 다르게 나타난다 — 나라마다 다른 한국을 보고 있다." : "We assume the world sees the same Korea. But the questions say otherwise — each country is looking at a different Korea."}</H2>
        <Lead>
          {locale === "ko"
            ? "국가 이미지를 다루는 모든 기관은 세 가지를 당연하게 여긴다: 하나의 이미지를 온 세계에 밀어붙일 수 있다는 것, 관심을 많이 받으면 성공이라는 것, 그리고 이미지는 국가가 만든다는 것. 그런데 1,540개의 질문은 이 세 가지를 한꺼번에 무너뜨린다. 그리고 무너진 자리마다, 그 자리를 메울 제도가 하나씩 필연적으로 드러난다."
            : "Every institution that handles a country's image takes three things for granted: that you can push one image to the whole world, that lots of attention means success, and that the state is the one making the image. The 1,540 questions break all three at once — and where each one breaks, an institution to fill the gap follows almost inevitably."}
        </Lead>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {FALSIFIED.map(([name, tag, body]) => (
            <div key={tag.en} className="rounded-xl border border-border border-t-[3px] bg-white p-5" style={{ borderTopColor: "var(--accent)" }}>
              <div className="font-mono text-[11px] font-semibold text-[color:var(--accent)]">{tag[locale]}</div>
              <h4 className="mt-2 text-base font-bold text-navy">{name[locale]}</h4>
              <p className="mt-1.5 text-[14px] text-secondary">{body[locale]}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[64ch] text-[17px] text-navy">
          {locale === "ko"
            ? "아래 여섯 개는 미리 정해 둔 답이 아니다. 각각은 하나의 관찰에서 출발해, 문제와 그 원인을 따라가다 보면 마지막에 어떤 제도가 반드시 있어야 함을 깨닫게 되는 순서로 쓰였다."
            : "The six below are not answers decided in advance. Each starts from one observation and follows the problem to its cause until, at the end, a particular institution turns out to be the thing that has to exist."}
        </p>
      </DocSection>

      {FRAMEWORKS.map((f, i) => (
        <DocSection key={f.no} tint={i % 2 === 0}>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">{f.no} · {f.cat[locale]}</div>
          <h2 className="mt-3 max-w-[30ch] text-2xl font-bold leading-[1.25] tracking-tight text-navy sm:text-[30px]">{f.observation[locale]}</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
            <Block k={locale === "ko" ? "여기서 문제가 생긴다" : "Here's the problem"}>{f.problem[locale]}</Block>
            <Block k={locale === "ko" ? "왜 그런가" : "Why this happens"}>{f.interpretation[locale]}</Block>
            <Block k={locale === "ko" ? "그렇다면 무엇이 필요한가" : "So what's needed"}>{f.implication[locale]}</Block>
            <div className="p-5" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}>
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">{locale === "ko" ? "그래서 필요한 제도" : "The institution this calls for"}</div>
              <p className="max-w-[66ch] text-[15px] leading-relaxed text-navy"><span className="font-bold">{f.institution.name[locale]}</span> — {f.institution.body[locale]}</p>
            </div>
            <div className="bg-tint p-5">
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "근거" : "The evidence"}</div>
              <p className="max-w-[66ch] text-[14px] leading-relaxed text-muted-foreground">{f.evidence[locale]}</p>
            </div>
          </div>
        </DocSection>
      ))}

      <DocSection>
        <Kicker>{locale === "ko" ? "여섯 개를 합치면" : "Putting the six together"}</Kicker>
        <H2>{locale === "ko" ? "여섯 모델, 하나의 운영체제" : "Six models, one operating system"}</H2>
        <Lead>{locale === "ko" ? "골라 쓰는 메뉴가 아니다. 여섯 제도가 순서대로 맞물려, ‘일방적으로 방송하던 국가’를 대신하는 하나의 시스템이 된다 — 먼저 듣고, 이해를 재고, 시장마다 다르게 답하고, 시민이 함께 만들고, 스스로 비용을 대고, 시대의 틀을 옮기는 국가." : "Not a menu to pick from. The six institutions lock together in order into a single system that replaces the broadcast state — a Korea that listens first, measures understanding, answers each market differently, builds its image with its citizens, pays its own way, and moves itself between the frames of each era."}</Lead>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          {ARCH.map(([layer, nodes], i) => (
            <React.Fragment key={layer.en}>
              <div className="grid grid-cols-[84px_1fr] items-center gap-4 sm:grid-cols-[104px_1fr]">
                <div className="text-right font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{layer[locale]}</div>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((n) => (
                    <div key={n.fw} className={"rounded-lg border px-3 py-2 text-[13.5px] font-semibold text-navy"} style={n.core ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" } : { borderColor: "var(--border)", background: "var(--tint, #f6f8fb)" }}>
                      <span className="mb-0.5 block font-mono text-[11px] font-semibold text-[color:var(--accent)]">{f0(n.fw)}</span>
                      {n.name[locale]}
                    </div>
                  ))}
                </div>
              </div>
              {i < ARCH.length - 1 && <div className="py-2 text-center text-[13px] text-muted-foreground">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </DocSection>

      <DocSection tint>
        <Kicker>{locale === "ko" ? "결론" : "In the end"}</Kicker>
        <Lead>
          {locale === "ko"
            ? "이 데이터셋은 ‘세계가 무엇을 묻는가’를 알아보려고 만들었다. 그런데 더 크게 드러난 건, 한국이 답하는 데 쓰는 도구 자체가 잘못된 모양이라는 사실이다 — 있지도 않은 ‘하나의 세계 청중’을 향한 방송 장치, 엉뚱한 걸 재는 지표, 정작 자국민과 산업은 빠진 채 만들어지는 이미지."
            : "This dataset was built to find out what the world asks. What it revealed is bigger: the tools Korea uses to answer are the wrong shape — a broadcast aimed at a single global audience that doesn't exist, a scoreboard that measures the wrong thing, and an image made without the very people and industries who create it."}
        </Lead>
        <div className="mt-5 border-l-[3px] border-[color:var(--accent)] pl-5 text-[21px] font-semibold leading-snug text-navy max-w-[54ch]">
          {locale === "ko"
            ? "질문은 처음부터 ‘한국이 무엇을 말할 것인가’가 아니었다. ‘세계가 아직 이해하지 못한 것을 이제 잴 수 있게 됐는데, 그렇다면 한국은 제도적으로 무엇이 될 것인가’였다."
            : "The question was never “what should Korea say.” It is “now that we can finally measure what the world doesn't yet understand, what should Korea become — institutionally?”"}
        </div>
      </DocSection>
    </>
  );

  function f0(no: string) {
    return locale === "ko" ? `제도 ${no}` : `Institution ${no}`;
  }
}
