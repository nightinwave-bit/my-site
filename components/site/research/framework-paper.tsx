"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

const FALSIFIED: [L, L, L][] = [
  [D("독점 이미지", "The monolith"), D("무너짐 01", "Falsified 01"), D("질문의 69%가 시장 고유. 브랜딩할 하나의 세계-한국은 없고, 각기 지역 프레임으로 보이는 일곱 개의 부분적 한국이 있다.", "69% of questions are market-specific. No global Korea to brand — seven partial Koreas, each seen through a local frame.")],
  [D("인상 지표", "The impression"), D("무너짐 02", "Falsified 02"), D("주목은 사상 최고이나 최대 질문은 여전히 ‘왜 둘인가’다. 도달은 이해가 되지 못했다.", "Attention is at record highs, yet the largest question is still “why are there two Koreas.” Reach did not become comprehension.")],
  [D("일방 방송", "The broadcast"), D("무너짐 03", "Falsified 03"), D("실제 이미지는 공동 생산된다 — 질문자, 디아스포라, 민간 산업이 함께. 국가는 수신기가 없다.", "The real image is co-produced — by questioners, diaspora, private industry. The state has no receiver.")],
];

type FW = { no: string; cat: L; name: L; defn: L; structural: L; larger: L; framework: L; institution: { name: L; body: L }; evidence: L };

const FRAMEWORKS: FW[] = [
  {
    no: "01", cat: D("국가브랜딩 아키텍처 · 측정", "Nation-branding architecture · Measurement"),
    name: D("국가 이해 계정", "The National Comprehension Account"),
    defn: D("인상을 국가 이미지의 단위에서 폐기하라. 복식 이해 회계를 도입한다 — 반복되는 질문은 부채, 지속적으로 해소된 질문은 자산. 브랜드 자본은 도달이 아니라 시장별 순(純) 해소 이해다.", "Retire the impression as the unit of national image. Adopt double-entry comprehension accounting — each recurring question a liability, each durably resolved one an asset. Brand equity is net resolved comprehension per market, not reach."),
    structural: D("잘못 측정한 것은 관리할 수 없다. 소프트파워는 인상으로 표기되며, 그것은 누군가의 한국 모델이 더 정확해졌는지와 구조적으로 분리돼 있다. 모든 주목 지표를 이기면서도 이해 재고는 70년 된 프레임에 잠겨 있을 수 있다.", "You cannot manage what you mis-measure. Soft power is denominated in impressions — decoupled by construction from whether anyone's model of Korea became more accurate."),
    larger: D("국가 이해에 대한 회계 기준이 없다. 인식 지수는 스냅숏을 매길 뿐, 어느 나라가 진 미해결 질문의 재고나 그 변화를 추적하지 않는다.", "There is no accounting standard for national comprehension. Perception indices rank snapshots; none track the stock of unresolved questions or its change."),
    framework: D("세계의 질문이 개시 시산표다. ‘왜 둘인가 / 안전한가’는 글로벌 사우스 계정의 크고 상각되지 않은 부채다. 외교는 캠페인이 아니라 ‘해소한 부채 − 새로 연 부채’로 채점된다.", "The world's questions are the opening trial balance. Diplomacy is scored on liabilities retired minus liabilities opened — a flow, not a poll."),
    institution: { name: D("국가 이해 계정", "A National Comprehension Account"), body: D("재정 계정처럼 공표되는, 감사받는 공개적 시장별 열림/해소 질문 원장. 모든 프로그램이 해소한 부채로 평가된다.", "Published like fiscal accounts — an audited, public, per-market ledger of open vs. resolved questions. Every program is evaluated against liabilities retired.") },
    evidence: D("1,540개 코퍼스가 개시 잔액이며, 한류 붐 내내 지속된 분단이 상각되지 않은 부채의 표식이다.", "The 1,540-question corpus is a working opening balance; division's persistence through the Hallyu boom is an unpriced liability."),
  },
  {
    no: "02", cat: D("공공외교 모델", "Public diplomacy model"),
    name: D("경청하는 국가", "The Listening State"),
    defn: D("의제 설정을 뒤집어라. 세계의 집합적 질문이 문화정책 의제와 예산을 정하는 입력이 된다 — 수신기 없는 방송을 대체하는 수요-지수 외교.", "Invert agenda-setting. The world's aggregated questions become the input that sets the cultural-policy agenda and budget — demand-indexed diplomacy replacing a broadcast with no receiver."),
    structural: D("한국은 방대한 콘텐츠 생산 역량과 거의 없는 수요 감지 기관을 가진다. 이 데이터셋 자체가 국가가 결여한 수신기의 시제품이다.", "Korea has vast content capacity and almost no demand-sensing organ. This dataset is a prototype of the receiver the state lacks."),
    larger: D("문화 예산은 위세와 공급으로 배분된다 — 센터를 짓고 축제를 연다 — 증거된 수요가 아니라. 자원 흐름이 청중에 구조적으로 눈멀어 있다.", "Cultural budgets are allocated by prestige and supply, never by evidenced demand. Resource flows are structurally blind to the audience."),
    framework: D("시장별 ‘호기심 지수’가 수요-지수 배분을 이끈다: 지출은 최대 미해결 수요에 비례해 흐르고, 수요 신호가 없는 위세 프로젝트에서 회수된다.", "A per-market Curiosity Index drives demand-indexed allocation: spend flows to the largest unresolved demand, withdrawn from prestige projects with no signal."),
    institution: { name: D("국가 질문 관측소", "A National Question Observatory"), body: D("이 수집 파이프라인을 상시화한 영구 감지 기관, 그리고 문화 예산의 일부를 호기심 지수에 묶는 법정 규칙. 이미지 부처는 생산자에서 감지·배분자로 재정립된다.", "The permanent, productionized version of this pipeline, plus a statutory rule binding a share of budget to the Curiosity Index. The image ministry is refounded as sensor-and-allocator.") },
    evidence: D("8개 시장 수요 지도가 이미 오배분을 드러낸다 — 유산과 언어 진입로가 측정된 수요 대비 미충족.", "The 8-market demand map already exposes mis-allocation — heritage and language on-ramps under-served relative to demand."),
  },
  {
    no: "03", cat: D("국가브랜딩 아키텍처 · 거버넌스", "Nation-branding architecture · Governance"),
    name: D("연합형 국가 브랜딩", "Federated Nation Branding"),
    defn: D("독점적 세계 브랜드를 연합으로 대체하라 — 얇은 비협상 공통 코어 + 두꺼운 자율적 시장 에디션, 각각 그 시장의 지지 프레임을 해결하도록 설계된다.", "Replace the monolithic global brand with a federation — a thin, non-negotiable shared core plus thick, autonomous market editions, each engineered to resolve its market's load-bearing frame."),
    structural: D("균일하게 밀린 단일 브랜드는 양립 불가한 프레임을 평균 내며 모든 시장을 과소 서비스한다. 호기심의 69%가 지역적일 때 ‘세계 캠페인’은 누구에게도 맞지 않는 유일한 형식이다.", "A single brand pushed uniformly under-serves every market by averaging across incompatible frames. When 69% is local, the global campaign fits no one."),
    larger: D("‘하나의 국가 / 하나의 이미지’ 교리는 알고리즘·다언어 정보 환경이 해체한 통합된 세계 공론장을 가정한다. 브랜딩 이론이 연합적 현실을 따라잡지 못했다.", "The one-nation/one-image doctrine assumes a unified global public sphere the algorithmic, multilingual environment has dissolved."),
    framework: D("연합 아이덴티티 시스템처럼: 하나의 ‘신뢰 루트’(이것은 남한 — 민주적·안전·주권적·구별됨)를 모든 시장이 상속하고, 그 위의 모든 것을 지역화하는 로컬 인스턴스. 하나의 코어, 여러 에디션.", "Model it on federated identity: one root of trust — “this is South Korea: democratic, safe, sovereign, distinct” — inherited everywhere, with local instances localizing everything above it."),
    institution: { name: D("시장 프레임 협의체", "Market Frame Councils"), body: D("한국 기관 + 현지 매개자 + 디아스포라를 짝지어 각 시장의 한국 에디션을 위임 권한으로 관장하는 분산 거버넌스. 브랜딩은 중앙 방송이 아니라 다중심 거버넌스가 된다.", "Devolved bodies pairing Korean institutions with local intermediaries and diaspora, holding delegated authority over their market's edition. Branding becomes polycentric governance, not broadcast.") },
    evidence: D("시장별 상이한 1위 개념(사람·언어·분단·유산)에 공유 참조점은 31%뿐 — 사실상의 연합이 구조로서의 연합을 기다린다.", "Divergent per-market #1 concepts with only 31% shared reference — a federation in fact, awaiting a federation in structure."),
  },
  {
    no: "04", cat: D("시민 참여 모델", "Civic participation model"),
    name: D("응답의 커먼즈", "The Answering Commons"),
    defn: D("공공외교를 부처가 제공하는 서비스가 아니라 시민이 생산하는 커먼즈로 재구성하라. 열린 질문이 시민·디아스포라에게 배정되고, 동료 검증된 답변이 살아 있는 한국 지식 기반으로 축적된다.", "Reframe public diplomacy as a commons produced by citizens, not a service delivered by a ministry. Open questions are routed to citizens and diaspora; peer-validated answers accrete into a living knowledge base of Korea."),
    structural: D("1,540개 질문에 답할 시민 채널이 없다 — 답할 지식은 5,100만 한국인과 약 700만 디아스포라에 있으나 아무도 동원되지 않는다.", "1,540 questions have no civic channel — the knowledge lives in 51M Koreans and ~7M diaspora, none mobilized."),
    larger: D("공공외교는 구조적으로 엘리트적이다 — 부처·기관·유명인. 세계 속 참여적 국가성을 위한 인프라가 없다. 한국이 자기 상을 검색하는 것은 갈 곳 없는 잠재 시민 에너지를 드러낸다.", "Public diplomacy is structurally elite. There is no infrastructure for participatory nationhood-in-the-world; Korea googling its own image reveals latent civic energy with nowhere to go."),
    framework: D("‘외교 시민권’. 관측소의 열린 질문이 시민·디아스포라에게 배포되고, 각자 하나를 ‘입양’해 자기 언어로 답한다. 동료 검증과 출처가 커먼즈를 신뢰 가능하게 만든다. 5,800만의 나라가 분산된 외교단이 된다.", "Diplomatic citizenship. The Observatory's open questions are distributed to citizens and diaspora who adopt one and answer it in their language; peer validation and provenance make it credible. A 58M-person nation becomes a distributed corps."),
    institution: { name: D("응답의 커먼즈", "The Answering Commons"), body: D("출처가 추적되는 다언어 시민 플랫폼(한국 질문의 위키)과 가벼운 인정 지위(‘한국 답변자’). 민간 문화 지식을 공공 외교 재화로 전환한다.", "A provenance-tracked, multilingual platform (a Wikipedia-of-Korea-questions) plus a light status (“Korea Answerer”). It converts private cultural knowledge into a public diplomatic good.") },
    evidence: D("한국의 1위 질문은 자기 이미지이며, 디아스포라는 프레임이 갈라지는 바로 그 시장(BR·ID·DE·JP·US)에 이미 있다.", "Korea's top query is its self-image; the diaspora already sits in the markets (BR, ID, DE, JP, US) whose frames diverge."),
  },
  {
    no: "05", cat: D("정책 프레임워크 · 재원 아키텍처", "Policy framework · Financing"),
    name: D("국가 이미지 기금", "The National Image Endowment"),
    defn: D("국가 브랜드를 외부효과가 있는 커먼즈로 다루고 그것을 내부화하라. ‘한국’ 프리미엄을 수확하는 민간 산업이 자신이 무임승차하는 공공재를 기금으로 조달한다.", "Treat the national brand as a commons with externalities and internalize them. The industries that harvest the “Korea” premium fund the public goods they free-ride on — through a ring-fenced trust."),
    structural: D("한국의 가장 강력한 이미지 벡터 — K-뷰티·K-팝·K-푸드 — 는 민간 소유다. 기업은 막대한 국가-이미지 외부효과를 낳으면서도 안전 인식·언어 관심·‘한국’ 프리미엄 같은 공공재에 무임승차한다.", "Korea's most potent image-vectors are privately owned. Firms generate vast national-image externalities while free-riding on public goods no one funds."),
    larger: D("국가-이미지 외부효과에 대한 프레임워크가 없다. 민간 문화가 파생한 긍정적 브랜드 가치가 미포착·미재투자되어, 브랜드가 딛고 선 토대가 구조적으로 저재원 상태다.", "There is no framework for national-image externalities. The value private culture spins off is uncaptured and un-reinvested, so the brand's foundations are structurally under-funded."),
    framework: D("국가 브랜드에서 가장 큰 이득을 보는 산업의 법정 또는 자발적 기여로 조성되어, 그들이 의존하는 공공재 — 신흥시장 구분, 언어 진입로, 유산 깊이 — 에 사용처를 봉인한 공-사 신탁. 성과 지표는 이해 계정이다.", "A public-private trust funded by a modest contribution from the industries that benefit most, ring-fenced to the public goods they depend on — disambiguation, language on-ramps, heritage depth. Its metric is the Comprehension Account."),
    institution: { name: D("국가 이미지 기금", "The National Image Endowment"), body: D("산업·국가·시민사회가 공동 지배하고, 지출은 캠페인이 아니라 해소한 부채로 측정된다. 소프트파워는 미가격 외부효과가 아니라 관리·재투자되는 자산이 된다.", "Governed jointly by industry, state and civil society; spending measured in liabilities retired. Soft power stops being an unpriced externality and becomes a managed asset.") },
    evidence: D("K-뷰티의 시장 신호(인도네시아·브라질·아랍)가 분단 구분 결핍과 정확히 겹친다 — 공공 토대가 가장 약한 곳에서 산업이 가장 강하다.", "K-beauty's signature (Indonesia, Brazil, the Arab world) maps precisely onto the disambiguation deficit — the industries are strongest where the foundations are weakest."),
  },
  {
    no: "06", cat: D("정책 프레임워크 · 장기", "Policy framework · Long-horizon"),
    name: D("관리된 프레임 이행", "Managed Frame Migration"),
    defn: D("국가 이미지를 프레임-시대를 통과하는 것으로 다루라 — 전쟁-프레임 → 발전-프레임 → 문화-프레임 → 다음 — 각 이행은 캠페인이 아니라 세대적 인프라이며, 옛 프레임의 부정이 아니라 그로부터의 다리를 요한다.", "Treat a national image as passing through frame-eras — War → Development → Culture → next — where each transition is generational infrastructure, not a campaign, requiring a bridge from the old frame rather than its denial."),
    structural: D("국가 이미지는 심각한 경로 의존성을 가진다: 한 나라가 세계 의식에 진입한 프레임이 지지대가 되어 현실과 무관하게 세대를 넘어 지속된다. 한국의 전쟁-프레임은 70년이 넘었고 여전히 1위다.", "National images have severe path dependency: the frame a country enters global consciousness through becomes load-bearing and persists for generations. Korea's War-frame is 70+ years old and still ranks first."),
    larger: D("리브랜딩은 일회적 커뮤니케이션으로 다뤄지지만, 프레임은 구조적·상속적이다. 한 나라를 상속된 프레임에서 현재의 프레임으로 ‘이행’시키는 정책 이론이나 도구가 없다.", "Rebranding is treated as episodic communication, but frames are structural and inherited. There is no policy instrument for migrating a nation from an inherited frame to a current one."),
    framework: D("지지 프레임은 삭제할 수 없고, 그것을 출발점으로 삼는 다리를 놓아야 한다 — ‘민주적 기술·문화 강국이 된 분단국’은 옛 프레임의 무게를 새 프레임으로 실어 나른다. 이행은 이해 계정에서 진단해 수십 년에 걸쳐, 시장별로 배열된다.", "You cannot delete a load-bearing frame; you build a bridge that uses it as launch point. Migration is sequenced over decades, market by market, diagnosed from the Comprehension Account."),
    institution: { name: D("상설 프레임 전략 기구", "A standing Frame Strategy authority"), body: D("선거 주기에서 절연된 소규모 범부처 장기 조직(국가 이미지의 중앙은행)으로, 시장별 지지 프레임을 진단하고 수십 년 이행을 배열한다. 프레임은 정권보다 오래 살기에 그 관리도 그래야 한다.", "A small, cross-ministry, long-horizon unit insulated from electoral cycles (a central bank for national image), diagnosing each market's load-bearing frame and sequencing multi-decade migration.") },
    evidence: D("발전→문화 이행은 진행 중으로 보이나(기술·경제·한류 질문 동반 상승), 전쟁→ 이행은 프레임이 갱신되지 않은 글로벌 사우스에서 정체돼 있다.", "The Development→Culture migration is visible mid-flight; the War→ migration is stalled in the Global South, where the frame never updated."),
  },
];

const ARCH: [L, { fw: string; name: L; core?: boolean }[]][] = [
  [D("감지", "Sense"), [{ fw: "FW-02", name: D("국가 질문 관측소", "National Question Observatory") }]],
  [D("채점", "Score"), [{ fw: "FW-01", name: D("국가 이해 계정", "National Comprehension Account"), core: true }]],
  [D("생산", "Produce"), [{ fw: "FW-04", name: D("응답 커먼즈 · 시민", "Answering Commons · citizens") }, { fw: "FW-03", name: D("연합 에디션 · 시장", "Federated editions · markets") }]],
  [D("재원 / 시간", "Fund / Time"), [{ fw: "FW-05", name: D("국가 이미지 기금", "National Image Endowment") }, { fw: "FW-06", name: D("관리된 프레임 이행", "Managed Frame Migration") }]],
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
        <Kicker>{locale === "ko" ? "전제" : "Premise"}</Kicker>
        <H2>{locale === "ko" ? "국가 브랜딩은 데이터가 반증하는 세 가정 위에 서 있다" : "Nation branding rests on three assumptions the data falsifies"}</H2>
        <Lead>
          {locale === "ko"
            ? "모든 이미지-부처는 같은 상속 교리로 돈다: 국가가 하나의 이미지를 세계 공중에 밀 수 있고, 주목이 성공의 척도이며, 국가가 이미지를 생산한다는 것. 코퍼스는 셋을 동시에 깨뜨리고, 각 균열은 다른 아키텍처를 연다."
            : "Every ministry-of-image runs on the same inherited doctrine: a state can push one image to a global public, attention is the measure, and the state produces the image. The corpus breaks all three at once — and each break opens a different architecture."}
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
            ? "이어지는 것은 역(逆) 가정 위에 세운 여섯 아키텍처다: 독점이 아니라 연합, 도달이 아니라 이해로 회계, 방송이 아니라 경청 시스템이 생산."
            : "What follows are six architectures on the inverse assumptions: federated not monolithic; accounted by comprehension not reach; produced by a listening system, not a broadcast."}
        </p>
      </DocSection>

      {FRAMEWORKS.map((f, i) => (
        <DocSection key={f.no} tint={i % 2 === 0}>
          <div className="font-mono text-sm font-semibold text-[color:var(--accent)]">{locale === "ko" ? `프레임워크 ${f.no}` : `Framework ${f.no}`}</div>
          <div className="mt-3">
            <span className="inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:var(--accent)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 34%, transparent)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>{f.cat[locale]}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-[30px]">{f.name[locale]}</h2>
          <p className="mt-4 max-w-[62ch] text-[18px] leading-relaxed text-secondary">{f.defn[locale]}</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
            <Block k={locale === "ko" ? "왜 구조적으로 중요한가" : "Why it matters structurally"}>{f.structural[locale]}</Block>
            <Block k={locale === "ko" ? "드러나는 더 큰 문제" : "The larger problem it reveals"}>{f.larger[locale]}</Block>
            <Block k={locale === "ko" ? "프레임워크" : "The framework"}>{f.framework[locale]}</Block>
            <div className="p-5" style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">{locale === "ko" ? "존재해야 할 제도" : "The institution that should exist"}</div>
              <p className="max-w-[66ch] text-[15px] leading-relaxed text-navy"><span className="font-bold">{f.institution.name[locale]}</span> — {f.institution.body[locale]}</p>
            </div>
            <div className="bg-tint p-5">
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{locale === "ko" ? "증거" : "Evidence"}</div>
              <p className="max-w-[66ch] text-[14px] leading-relaxed text-muted-foreground">{f.evidence[locale]}</p>
            </div>
          </div>
        </DocSection>
      ))}

      <DocSection>
        <Kicker>{locale === "ko" ? "결합된 아키텍처" : "The composed architecture"}</Kicker>
        <H2>{locale === "ko" ? "여섯 모델, 하나의 운영체제" : "Six models, one operating system"}</H2>
        <Lead>{locale === "ko" ? "메뉴가 아니다. 방송 국가를 대체하는 하나의 시스템으로 맞물린다 — 경청하고, 회계하고, 연합하고, 시민이 생산하고, 스스로 조달하며, 프레임을 아는 국가 이미지 기계." : "Not a menu. They interlock into a single replacement for the broadcast state — a listening, accounting, federated, citizen-produced, self-funding, frame-aware machine for national image."}</Lead>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          {ARCH.map(([layer, nodes], i) => (
            <React.Fragment key={layer.en}>
              <div className="grid grid-cols-[84px_1fr] items-center gap-4 sm:grid-cols-[104px_1fr]">
                <div className="text-right font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{layer[locale]}</div>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((n) => (
                    <div key={n.fw} className={"rounded-lg border px-3 py-2 text-[13.5px] font-semibold text-navy"} style={n.core ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" } : { borderColor: "var(--border)", background: "var(--tint, #f6f8fb)" }}>
                      <span className="mb-0.5 block font-mono text-[11px] font-semibold text-[color:var(--accent)]">{n.fw}</span>
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
        <Kicker>{locale === "ko" ? "결론" : "Conclusion"}</Kicker>
        <Lead>
          {locale === "ko"
            ? "데이터셋은 세계가 무엇을 묻는지 드러내기 위해 만들어졌다. 그것이 드러낸 더 큰 것은, 한국이 답하는 데 쓰는 도구가 잘못된 모양이라는 것이다 — 존재하지 않는 세계 청중을 겨눈 방송 장치, 엉뚱한 것을 재는 지표, 자국민과 산업이 배제된 채 만들어지는 이미지."
            : "The dataset was commissioned to reveal what the world asks. It revealed something larger: the instruments Korea uses to answer are the wrong shape — a broadcast apparatus aimed at a global audience that does not exist, scored by a metric that measures the wrong thing, producing an image its own people and industries are excluded from making."}
        </Lead>
        <div className="mt-5 border-l-[3px] border-[color:var(--accent)] pl-5 text-[21px] font-semibold leading-snug text-navy max-w-[54ch]">
          {locale === "ko"
            ? "질문은 결코 ‘한국이 무엇을 말할 것인가’가 아니었다. ‘세계가 아직 이해하지 못한 것을 측정할 수 있게 된 지금, 한국이 제도적으로 무엇이 될 것인가’이다."
            : "The question was never “what should Korea say.” It is “what should Korea become — institutionally — now that we can measure what the world does not yet understand.”"}
        </div>
      </DocSection>
    </>
  );
}
