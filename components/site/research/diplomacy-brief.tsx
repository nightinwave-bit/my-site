"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, Accented, type L } from "./parts";

type Dossier = {
  no: string;
  name: L;
  salience: L;
  misread: L;
  why: L;
  assumption: L;
  gap: L;
  impl: [L, L][]; // [domain, text]
  move: L;
};

const D = (ko: string, en: string): L => ({ ko, en });

const DOSSIERS: Dossier[] = [
  {
    no: "01",
    name: D("두 개의 한국", "The Two Koreas"),
    salience: D("최대 개념 · 242개 · 브라질·아랍·인도네시아가 주도", "Largest concept · 242 · led by Brazil, the Arab world, Indonesia"),
    misread: D("동아시아 밖 대부분에게 ‘한국’은 여전히 모호하고 어쩌면 위험한 지명이며, 한류는 이를 구분해 주지 못했다.", "To most of the world outside East Asia, “Korea” is still an ambiguous, possibly-dangerous place-name — and Hallyu has not disambiguated it."),
    why: D("긴밀한 양자 관계가 없는 시장에서 한국은 BTS보다 먼저 냉전 지리(전쟁·DMZ·핵)로 각인됐다. 대중문화가 관심을 키웠지만 첫 질문은 물려받은 프레임으로 돌아간다 — 어느 한국이며, 안전한가?", "For markets without deep ties, Korea entered global consciousness as Cold-War geography long before BTS. Curiosity spikes, but the first question defaults to the inherited frame: which Korea is this, and is it safe?"),
    assumption: D("세계는 남한이 북한과 구별되는 정상적·주권적·안전한 나라인지 확신하지 못한다. 애정이 미해결의 정체성 위에 쌓이고 있다.", "The world is not sure South Korea is a normal, sovereign, safe country distinct from the North. Affection is being built on an unresolved identity."),
    gap: D("남한은 스스로를 안착한 OECD 민주주의로 경험한다. 세계는 여전히 ‘하나인가 둘인가’를 묻는다.", "South Korea experiences itself as a settled OECD democracy; much of the world still has to ask whether it is one country or two."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("홍보가 아니라 ‘구분’이 기초 과제다.", "Disambiguation, not promotion, is the foundational job.")],
      [D("관광", "Tourism"), D("‘한국은 안전한가’가 전환을 막는다.", "“Is Korea safe” is a conversion-killer.")],
      [D("교육", "Education"), D("기초 한국 리터러시 수요가 실재한다.", "Real demand exists for foundational Korea-literacy.")],
      [D("문화정책", "Cultural policy"), D("DMZ·전쟁 이국주의는 프레임을 강화한다.", "DMZ/war exoticism reinforces the frame.")],
      [D("국가브랜딩", "Nation branding"), D("‘한국’은 통제 불가한 평판 외부효과를 진다.", "“Korea” carries reputational externalities it can't control.")],
    ],
    move: D("‘이것은 남한이다 — 안전하고 민주적이며 구별된다’를 신흥시장 외교의 기초 층위로 삼되, 이미 관심을 얻은 K-콘텐츠 채널을 통해 전달하라. 한류가 이 일을 해줬다고 가정하지 말라.", "Make “This is South Korea — safe, democratic, distinct” the base layer of emerging-market diplomacy, delivered through the K-content channels already capturing attention. Don't assume Hallyu has done this work."),
  },
  {
    no: "02",
    name: D("언어, 그리고 그 어려움", "The Language, and its Difficulty"),
    salience: D("2위 · 163개 · 44%가 독일에 집중", "2nd largest · 163 · 44% concentrated in Germany"),
    misread: D("세계는 한국어가 ‘어렵다’고 단정했고, 한국이 가진 가장 깊은 소프트파워의 문턱에서 스스로를 잃고 있다.", "The world has decided Korean is hard — and is losing itself at the doorway to the deepest soft power Korea has."),
    why: D("‘한국어 어렵나요’는 이미 배울지도 모른다고 결정한 사람이 던지는 선별 질문이다. 독일의 집중은 관심이 지적·헌신적인 시장을 드러낸다 — 문턱에서 확신을 기다리는 가장 진지한 잠재 옹호자들.", "“Is Korean hard” is a triage question from people who've already decided they might learn. Germany's concentration reveals an intellectualized, commitment-oriented market — Korea's most serious prospective advocates, pausing for reassurance."),
    assumption: D("한국어가 장벽이며 문자와 언어가 똑같이 어렵다는 가정. 사실 한글은 한 시간이면 읽고, 어려운 건 문법이다. 한국은 이 오해를 바로잡은 적이 없다.", "That Korean is a barrier, and that script and language are equally hard. Hangul reads in an hour; grammar is the hill. Korea has never corrected the conflation."),
    gap: D("한국인은 한글을 세계에서 가장 합리적인 문자로 자랑한다. 세계의 기본값은 ‘내겐 너무 어렵다’이다.", "Koreans take pride in Hangul as the world's most rational alphabet; the world's default is “too hard for me.”"),
    impl: [
      [D("공공외교", "Public diplomacy"), D("언어 학습자는 평생 옹호자 — 최고 잔존 외교.", "Learners are lifelong advocates — the highest-retention diplomacy.")],
      [D("관광", "Tourism"), D("언어 불안이 독립 여행을 억제한다.", "Language anxiety suppresses independent travel.")],
      [D("교육", "Education"), D("세종학당 규모를 넘어서는 잠재 초급 수요.", "Latent beginner demand beyond current capacity.")],
      [D("문화정책", "Cultural policy"), D("자막 의존이 팬을 언어에서 한 발 떼어 놓는다.", "Subtitle dependency keeps fans one step from the language.")],
      [D("국가브랜딩", "Nation branding"), D("‘과학적 문자를 설계한 나라’는 미사용 자산.", "“The engineered scientific alphabet” is an unused asset.")],
    ],
    move: D("문턱에서 난이도를 재구성하라. 모든 학습 접점을 ‘오늘 한글을 읽을 수 있다’로 시작하고 문자와 유창성을 분리하라. 언어는 한국이 만들 수 있는 가장 깊은 유대이며, 문장 하나를 바꾸지 못해 문 앞에서 새고 있다.", "Reframe difficulty at the threshold. Lead every learner touchpoint with “you can read Hangul today,” separate script from fluency. Language is the deepest affinity Korea can create, and it leaks at the front door for want of one reframed sentence."),
  },
  {
    no: "03",
    name: D("한국인은 누구인가", "Who Koreans Are"),
    salience: D("3위 · 143개 · 그리고 자신의 상을 검색하는 한국", "3rd largest · 143 · and Korea googling its own reflection"),
    misread: D("세계는 사회를 이해하기보다 미학을 사랑하기 시작했고, 한국은 자신이 관찰당하는 것을 불안하게 지켜본다.", "The world is coming to love an aesthetic rather than understand a society; and Korea anxiously watches itself be watched."),
    why: D("문화가 부상하면 청중은 ‘무엇을 만드나’에서 ‘누구인가’로 옮겨간다. 그러나 ‘왜 이렇게 아름다운가’, ‘왜 금속 젓가락인가’ 같은 질문은 사람들을 이국적 유형으로 평면화한다. 한국의 1위 질문은 ‘외국인이 보는 한국인’ — 세계의 거울을 확인하는 나라.", "Curiosity moves from “what do they make” to “who are they” — but essentializes a people into a type. Tellingly, Korea's own top question is “how foreigners see Koreans”: a nation checking its reflection."),
    assumption: D("밖에서는 한국인이 균일하고 아름답고 다소 알 수 없는 원형이라는 가정. 안에서는 한국의 위상이 취약해 외부 인정이 필요하다는 가정 — 둘 다 불안의 가정이다.", "Abroad: Koreans are a uniform, beautiful, slightly unknowable archetype. At home: Korea's standing is fragile and needs validation — both assumptions of insecurity."),
    gap: D("세계의 호기심은 치켜세우되 평면화하고, 한국은 현대적·다원적·개별적으로 보이길 원한다.", "The world's curiosity flatters but flattens; Korea wants to be seen as modern, plural, individual."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("사회로 존중받지 못하고 미학으로 사랑받을 위험.", "Risk of being loved as an aesthetic, not respected as a society.")],
      [D("관광", "Tourism"), D("‘아름다운 사람 구경’이라는 얕은 동기.", "A shallow “see the beautiful people” motivation.")],
      [D("교육", "Education"), D("사회·일상 콘텐츠 수요가 채워지지 않았다.", "Unmet demand for society-and-daily-life content.")],
      [D("문화정책", "Cultural policy"), D("아이돌·뷰티 복합체가 본질화 시선을 키운다.", "The idol/beauty complex feeds the essentializing gaze.")],
      [D("국가브랜딩", "Nation branding"), D("‘아름다운 사람들’은 취약하고 전유 가능하다.", "“Beautiful people” is fragile and appropriable.")],
    ],
    move: D("초상을 의도적으로 인간화·다양화하라 — 아이돌만이 아니라 평범하고 다원적이며 개별적인 한국인의 삶. 미적 매혹을 사회적 이해로 전환하는 것이 장기 애정을 지탱한다. 그리고 검증을 구하지 말고 자신감을 투사하라 — 그것이 더 강한 브랜드다.", "Deliberately humanize and diversify the portrait — ordinary, plural, individual Korean lives, not only idols — converting fascination into understanding. And project confidence rather than seek validation; that is the stronger brand."),
  },
  {
    no: "04",
    name: D("음식, 보편의 문", "Food, the Universal Door"),
    salience: D("140개 · 모든 시장에 강하게 존재하는 유일한 개념", "140 · the one concept present strongly in every market"),
    misread: D("한식은 세계에서 가장 믿을 만하고 덜 정치적인 대사인데, 한국은 그것을 세 가지 요리로 안다.", "Korean cuisine is the world's most reliable, least-political ambassador — and Korea knows it as three dishes."),
    why: D("음식은 언어도 정치도 없이 즉시 소비되는 최저 마찰의 진입점이다. 모든 시장이 공유하는 유일한 개념이지만 어휘는 좁고(김치·고기구이·매움), ‘건강한가’는 한국이 아직 주장하지 않은 웰니스 렌즈를 드러낸다.", "Food is the lowest-friction entry — no language, no politics. It's the one concept every market shares, but the vocabulary is narrow (kimchi, BBQ, “spicy”), and “is it healthy” reveals an unclaimed wellness lens."),
    assumption: D("한식이 몇 개의 수출 히트작이며 그 정체성이 매움이라는 가정. 방대하고 지역적인 발효 요리가 이국적 별미로 수용된다.", "That Korean food equals a handful of export hits defined by heat. A vast, regional, fermentation-based cuisine received as a spicy novelty."),
    gap: D("국민 요리의 깊이와 세 개 요리만 아는 세계 사이의 폭의 격차.", "Between the depth of a national cuisine and a world that knows three of its dishes."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("모든 시장이 이미 지나는 보편의 진입로.", "The universal on-ramp every market already walks through.")],
      [D("관광", "Tourism"), D("미식 관광은 고부가 세그먼트 — 수요 미충족.", "Culinary tourism is high-value and under-served.")],
      [D("교육", "Education"), D("음식 호기심은 문화·언어로 가는 가장 싼 관문.", "Food curiosity is the cheapest gateway to culture and language.")],
      [D("문화정책", "Cultural policy"), D("한식 세계화는 밀어내기, 수요는 ‘지식’이다.", "Hansik globalization is push; the demand is knowledge.")],
      [D("국가브랜딩", "Nation branding"), D("‘건강·발효·균형’은 웰니스 흐름과 맞는 위치.", "“Healthy, fermented, balanced” fits the wellness turn.")],
    ],
    move: D("음식을 의도적 정문으로 삼고 그 호기심을 더 깊이 연결하라 — ‘이국적·매운’에서 ‘건강·발효·균형’으로 재구성해 실제 수요에 맞춰라. 일곱 시장이 만나는 곳에서 시작해 바깥으로 뻗어가라.", "Make food the deliberate front door and route the curiosity deeper — reframe from exotic-and-spicy to healthy-fermented-balanced to meet demand where it is. Start where all seven markets converge, and branch outward."),
  },
  {
    no: "05",
    name: D("유산과 깊이", "Heritage & Depth"),
    salience: D("127개 · 한국인 자신과 일본에 집중", "127 · concentrated among Koreans and Japan"),
    misread: D("세계는 한국이 곧 대중문화라 — 약 15년 깊이의 나라라 — 믿고, 그 아래 문명이 있음은 이웃만이 안다.", "The world believes Korea is its pop culture — a country ~15 years deep — and only its neighbours know a civilization lies beneath."),
    why: D("유산 호기심은 근접성이 진정성 층에 대한 관심을 낳는 곳에 몰린다 — 한국과 일본이 한복·명절·전통을 묻는다. 먼 시장은 대중-한국을, 가까운 시장은 깊은-한국을 묻는다. 서구의 한국은 플레이리스트로 도착해 얇다.", "Heritage curiosity concentrates where proximity breeds interest in the authentic layer. Distant markets ask about pop-Korea; near markets about deep-Korea. The West's Korea arrived through a playlist, so it's thin."),
    assumption: D("한국 = K-팝이며 깊기보다 유행이라는 가정. 일본·중국에는 결코 하지 않을 방식으로 세계가 한국의 역사적 깊이를 과소평가한다.", "That Korea = K-pop, trendy rather than deep. The world under-attributes historical depth in a way it never would to Japan or China."),
    gap: D("수천 년 깊이의 문명과 약 15년 깊이의 세계적 이미지 사이의 격차.", "Between a civilization millennia deep and a global image about fifteen years deep."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("깊이는 내구성 — 대중-only 이미지는 취약하다.", "Depth is durability; a pop-only image is fragile.")],
      [D("관광", "Tourism"), D("유산 관광이 대중문화 청중에 덜 알려져 있다.", "Heritage tourism is under-marketed to the pop audience.")],
      [D("교육", "Education"), D("세계의 한국 리터러시는 대중-깊이, 역사-얕음.", "Global Korea-literacy is pop-deep, history-shallow.")],
      [D("문화정책", "Cultural policy"), D("투자가 대중 수출에 치우쳐 유산이 저활용.", "Investment skews to pop export; heritage under-leveraged.")],
      [D("국가브랜딩", "Nation branding"), D("‘고대 문명 + 초현대’는 가장 방어 가능한 브랜드.", "“Ancient civilization + hyper-modern” is the most defensible brand.")],
    ],
    move: D("대중의 부상을 문명적 깊이에 정박하라 — K-팝 세대에게 ‘이 뒤에는 이천 년이 있다’는 이야기를 주라. 깊이가 유행을 지속 가능한 국가 브랜드로 바꾸고 한류 피로에 대비한다.", "Anchor the pop surge to civilizational depth — give the K-pop generation the “there are two thousand years behind this” story. Depth converts a trend into a durable brand and hedges against Hallyu fatigue."),
  },
  {
    no: "06",
    name: D("동경으로서의 K-뷰티", "K-Beauty as Aspiration"),
    salience: D("81개 · 인도네시아·브라질·아랍에 강함 — 독일·일본·한국엔 없음", "81 · strong in Indonesia, Brazil, the Arab world — absent in Germany, Japan, Korea"),
    misread: D("한국은 K-뷰티를 수출 카테고리로 다루지만, 부상하는 글로벌 사우스에게 그것은 정체성 실천이자 가장 친밀한 소프트파워이며, 지금 외교관이 아니라 화장품 회사가 운영한다.", "Korea treats K-beauty as an export category. For the rising Global South it is an identity practice — the most intimate soft power Korea has, run by cosmetics firms, not diplomats."),
    why: D("K-뷰티는 부상하는 중산층이 현대성을 수행하는 곳에 몰리고, 자신감 있는(독일·일본) 혹은 원천인(한국) 시장에선 사라진다. 도달 가능한 자기개선과 지위 이동을 파는 ‘동경 기술’이다 — 팬덤이 아니라 개인적·일상적 벡터.", "K-beauty concentrates where a rising middle class performs modernity, and vanishes in confident (Germany, Japan) or source (Korea) markets. It sells attainable self-improvement — an aspiration technology, personal and daily, not celebrity fandom."),
    assumption: D("신흥세계에서 ‘한국산’은 도달 가능한 현대적 아름다움·자기최적화의 동의어가 됐다. 한국 = 실제로 닿을 수 있는 동경의 삶.", "In the emerging world, “Korean” has become a synonym for achievable modern beauty and self-optimization. Korea = the aspirational lifestyle you can reach."),
    gap: D("한국은 산업을 보고, 이 시장은 정체성을 산다 — 한국은 그 유대의 깊이를 과소평가한다.", "Korea sees an industry; these markets live an identity — Korea under-recognizes the depth of that bond."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("가장 친밀한 일상 소프트파워가 상업에만 맡겨져 있다.", "The most intimate daily soft power is left entirely to commerce.")],
      [D("관광", "Tourism"), D("의료·뷰티 관광 수요가 바로 이 시장에 집중.", "Medical/beauty tourism demand is concentrated in these markets.")],
      [D("교육", "Education"), D("뷰티 관심이 언어·여행으로 가는 관문.", "Beauty interest is the gateway to language and travel.")],
      [D("문화정책", "Cultural policy"), D("무역으로 분류돼 정체성 형성력을 놓친다.", "Filed under trade, missing its identity-formation power.")],
      [D("국가브랜딩", "Nation branding"), D("‘도달 가능한 현대적 삶’이라는 시장별 브랜드.", "“The attainable modern lifestyle” — a market-specific brand.")],
    ],
    move: D("K-뷰티를 최고 성장 시장의 전략적 외교 자산으로 인식하고 ‘뷰티 → 언어 → 여행 → 애정’ 퍼널을 의도적으로 구축하라. 한국의 이미지가 지금 가장 중요한 시장에서 형성되고 있으며, 현재 국가적 위임을 가진 누구도 이를 저술하지 않는다.", "Recognize K-beauty as strategic diplomacy in the highest-growth markets and build the deliberate beauty → language → travel → affinity funnel. Korea's image is being formed right now in the markets that matter most — authored by no one with a national mandate."),
  },
];

function Q({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <p className="max-w-[64ch] text-[15.5px] leading-relaxed text-secondary">{children}</p>
    </div>
  );
}

export function DiplomacyBrief() {
  const { locale } = useLanguage();
  return (
    <>
      <DocSection>
        <Kicker>{locale === "ko" ? "핵심 주장" : "The central argument"}</Kicker>
        <H2>{locale === "ko" ? "소프트파워는 한국의 인지도를 높였지만 의미는 해결하지 못했다" : "Soft power raised Korea's salience without resolving its meaning"}</H2>
        <Lead>
          {locale === "ko"
            ? "한국의 외교는 20년간 공급 측이었다 — 콘텐츠를 밀고 기관을 열고 축제를 후원한다. 질문은 수요 측을 드러내며, 그것은 일치하지 않는다. 세계는 주목하지만 콘텐츠 붐이 해체하지 못한 옛 프레임으로 한국을 처리한다: 분단된 전쟁-장소, 벅찬 언어, 아름답지만 알 수 없는 사람들."
            : "Korea's diplomacy has been supply-side for two decades — push content, open institutes, sponsor festivals. The questions reveal the demand-side, and it doesn't match. The world is attending, but through older frames the content boom never dismantled: a divided war-place, a forbidding language, a beautiful but unknowable people."}
        </Lead>
        <div className="mt-6 border-l-[3px] border-[color:var(--accent)] pl-5 text-xl font-medium leading-snug text-navy max-w-[52ch]">
          {locale === "ko"
            ? "세계가 던지는 가장 큰 단일 질문은 여전히 ‘왜 한국은 둘인가’다 — 어떤 K-팝·드라마·뷰티 주제보다 크다. 15년의 한류가 볼륨을 키웠지만 첫 질문은 바꾸지 못했다."
            : "The largest single thing the world asks is still “why are there two Koreas” — bigger than any K-pop, drama, or beauty topic. Fifteen years of Hallyu raised the volume; it did not change the first question."}
        </div>
        <Lead>
          {locale === "ko"
            ? "그리고 응답할 단일한 세계 청중이 없다. 질문의 31%만 시장을 넘나든다 — 나머지 69%는 지역적이다. 하나의 한국-브랜드가 아니라 일곱 개의 부분적 한국이 있고, 각 시장이 자기 프레임으로 다른 조각을 본다."
            : "And there is no single global audience to address. Only 31% of questions cross markets; the other 69% are local. There are not one Korea-brand but seven partial Koreas, each market seeing a different slice through its own frame."}
        </Lead>
      </DocSection>

      {DOSSIERS.map((d, i) => (
        <DocSection key={d.no} tint={i % 2 === 0}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-sm font-bold text-[color:var(--accent)]">{d.no}</span>
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-[28px]">{d.name[locale]}</h2>
          </div>
          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{d.salience[locale]}</div>
          <p className="mt-5 max-w-[60ch] text-[19px] leading-snug text-navy">
            <span className="font-semibold text-[color:var(--accent)]">{locale === "ko" ? "오독: " : "The misread: "}</span>
            {d.misread[locale]}
          </p>
          <div className="mt-6 grid gap-5">
            <Q label={locale === "ko" ? "왜 존재하는가" : "Why this exists"}>{d.why[locale]}</Q>
            <Q label={locale === "ko" ? "드러나는 가정" : "The assumption it reveals"}>{d.assumption[locale]}</Q>
            <Q label={locale === "ko" ? "인식의 격차" : "The perception gap"}>{d.gap[locale]}</Q>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white">
            <div className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {locale === "ko" ? "무엇을 함의하는가" : "What it implies"}
            </div>
            <dl className="divide-y divide-border">
              {d.impl.map(([dom, txt]) => (
                <div key={dom.en} className="grid grid-cols-[110px_1fr] gap-4 px-5 py-2.5 sm:grid-cols-[150px_1fr]">
                  <dt className="text-[12.5px] font-bold uppercase tracking-[0.03em] text-[color:var(--accent)]">{dom[locale]}</dt>
                  <dd className="text-[15px] text-secondary">{txt[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-5">
            <Accented label={locale === "ko" ? "이것이 사실이라면, 한국은" : "If this is true, Korea should"}>{d.move[locale]}</Accented>
          </div>
        </DocSection>
      ))}

      <DocSection>
        <Kicker>{locale === "ko" ? "종합" : "Synthesis"}</Kicker>
        <H2>{locale === "ko" ? "하나의 한국을 방송하지 말고, 일곱을 해결하라" : "Stop broadcasting one Korea; start resolving seven"}</H2>
        <Lead>
          {locale === "ko"
            ? "모든 개념을 관통하는 선은 같다: 주목이 이해를 앞질렀다. 글로벌 사우스에게 한국은 지정학적 사실이자 동경의 삶, 서구에겐 어려운 언어 뒤의 멋진 문화 상품, 이웃에겐 유산 문명이다. 하나의 나라, 세 개의 한국 — 어떤 단일 캠페인도 셋 모두에게 말할 수 없다. 다음 단계는 더 크게가 아니라, 각 시장이 드러내는 특정 격차의 표적 해결이다."
            : "The through-line is the same across every concept: attention has outrun understanding. To the Global South, Korea is a geopolitical fact and an aspirational lifestyle; to the West, a cool cultural product behind a hard language; to its neighbours, a heritage civilization. One country, three Koreas — no single campaign can speak to all three. The next phase is not louder but targeted resolution of the specific gap each market exposes."}
        </Lead>
      </DocSection>
    </>
  );
}
