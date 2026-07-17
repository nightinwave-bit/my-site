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
    salience: D("가장 큰 질문 · 242개 · 브라질·아랍·인도네시아에서 특히 많다", "The biggest question · 242 · especially in Brazil, the Arab world, Indonesia"),
    misread: D("동아시아 밖에서는 아직도 ‘한국’이라고 하면 어느 쪽 한국인지, 위험하지는 않은지부터 헷갈려한다. 한류도 이 헷갈림을 풀어 주지 못했다.", "Outside East Asia, “Korea” still makes people unsure which Korea it is and whether it's dangerous. Hallyu never cleared that up."),
    why: D("한국과 오래 교류하지 않은 나라에서는, BTS보다 먼저 ‘전쟁·DMZ·핵’으로 한국을 알았다. 대중문화가 관심을 키워도, 첫 질문은 예전에 배운 이미지로 돌아간다 — 어느 한국이지? 안전한가?", "In countries without long ties to Korea, people knew it as “war, the DMZ, nukes” long before BTS. Pop culture raises the interest, but the first question falls back to the older image — which Korea is this, and is it safe?"),
    assumption: D("사람들은 남한이 북한과 분명히 다른, 정상적이고 안전한 나라인지 아직 확신하지 못한다. 좋아하는 마음이, 아직 정리되지 않은 ‘이 나라가 뭐지?’ 위에 쌓이고 있는 것이다.", "People aren't yet sure South Korea is a normal, safe country clearly separate from the North. The affection is piling up on top of an unsettled “what is this country?”"),
    gap: D("한국은 스스로를 이미 자리 잡은 선진 민주국가로 느낀다. 그런데 세계의 상당수는 여전히 ‘한국은 한 나라야, 두 나라야?’부터 묻는다.", "Korea feels like a settled, advanced democracy. Much of the world still starts from “is Korea one country or two?”"),
    impl: [
      [D("공공외교", "Public diplomacy"), D("먼저 할 일은 ‘알리기’가 아니라 ‘남한과 북한을 구분해 주기’다.", "The first job isn't promotion — it's helping people tell the two Koreas apart.")],
      [D("관광", "Tourism"), D("‘한국은 안전한가’라는 의심이 실제 방문을 막는다.", "The doubt “is Korea safe” blocks actual visits.")],
      [D("교육", "Education"), D("한국을 기초부터 알려 주는 콘텐츠 수요가 분명히 있다.", "There's clear demand for content that explains Korea from scratch.")],
      [D("문화정책", "Cultural policy"), D("DMZ·전쟁을 구경거리로 파는 건 이 오해를 더 굳힌다.", "Selling the DMZ and the war as spectacle only hardens the misunderstanding.")],
      [D("국가브랜딩", "Nation branding"), D("‘한국’이라는 이름은 통제할 수 없는 평판까지 함께 짊어진다.", "The name “Korea” carries a reputation it can't control.")],
    ],
    move: D("‘여기는 남한이다 — 안전하고, 민주적이고, 북한과 다르다’를 신흥 시장 외교의 가장 기본 메시지로 삼되, 이미 사람들이 보고 있는 K-콘텐츠를 통해 전하라. 한류가 이 일을 대신 해 줬다고 넘겨짚지 말라.", "Make “this is South Korea — safe, democratic, and different from the North” the base message of emerging-market diplomacy, delivered through the K-content people already watch. Don't assume Hallyu has done this job for you."),
  },
  {
    no: "02",
    name: D("언어, 그리고 그 어려움", "The Language, and its Difficulty"),
    salience: D("두 번째로 큰 질문 · 163개 · 그중 44%가 독일에서 나온다", "2nd biggest · 163 · 44% of it from Germany"),
    misread: D("세계는 ‘한국어는 어렵다’고 이미 결론 내렸다. 그래서 한국이 가진 가장 강력한 소프트파워의 입구에서 사람들을 놓치고 있다.", "The world has already decided “Korean is hard” — and so it loses people right at the doorway to Korea's strongest soft power."),
    why: D("‘한국어 어렵나요?’는 이미 ‘한번 배워 볼까’ 생각한 사람이 던지는 질문이다. 독일에 이 질문이 몰린다는 건, 진지하게 배우려는 사람이 많은 시장이라는 뜻이다 — 문 앞에서 ‘해볼 만할까?’ 확인하며 망설이는, 가장 열성적인 잠재 팬들.", "“Is Korean hard?” is asked by someone who's already thinking of learning it. Germany's concentration of it signals a market full of serious would-be learners — the most committed prospective fans, pausing at the door to check “is this doable?”"),
    assumption: D("‘한국어는 장벽’이고 ‘글자도 말도 똑같이 어렵다’는 생각. 사실 한글은 한 시간이면 읽을 수 있고, 어려운 건 문법이다. 한국은 이 오해를 한 번도 제대로 바로잡지 않았다.", "The belief that “Korean is a wall” and that the script and the language are equally hard. In fact you can read Hangul in an hour; the grammar is the hard part. Korea has never really corrected the mix-up."),
    gap: D("한국인은 한글을 ‘세계에서 가장 과학적인 문자’라고 자랑한다. 그런데 세계 사람들의 기본 생각은 ‘나한텐 너무 어려워’다.", "Koreans boast that Hangul is “the world's most scientific alphabet.” The world's default thought is “too hard for me.”"),
    impl: [
      [D("공공외교", "Public diplomacy"), D("언어를 배운 사람은 평생 한국 편이 된다 — 가장 오래 남는 외교.", "Someone who learns the language becomes a lifelong friend of Korea — the longest-lasting diplomacy there is.")],
      [D("관광", "Tourism"), D("언어에 대한 두려움이 자유여행을 막는다.", "Fear of the language holds back independent travel.")],
      [D("교육", "Education"), D("세종학당이 감당하는 규모보다 훨씬 많은 초급 수요가 잠자고 있다.", "Far more beginner demand is sleeping than King Sejong Institutes can currently handle.")],
      [D("문화정책", "Cultural policy"), D("자막에 의존하게 두면 팬은 언어에서 한 걸음 떨어진 채 머문다.", "Leave fans on subtitles and they stay one step away from the language.")],
      [D("국가브랜딩", "Nation branding"), D("‘가장 과학적인 문자를 직접 만든 나라’라는 이야기는 아직 안 쓰고 있는 자산이다.", "“The country that engineered the most scientific alphabet” is a story Korea isn't using yet.")],
    ],
    move: D("입구에서 ‘어렵다’는 인상부터 바꿔라. 모든 학습 첫 화면을 ‘한글, 오늘 바로 읽을 수 있어요’로 시작하고, ‘글자’와 ‘유창함’을 분리해 설명하라. 언어는 한국이 만들 수 있는 가장 깊은 유대인데, 문장 하나를 못 바꿔서 문 앞에서 사람을 흘려보내고 있다.", "Change the “it's hard” impression right at the door. Start every learning entry with “Hangul — you can read it today,” and separate the script from fluency. Language is the deepest bond Korea can make, and it's leaking people at the entrance for want of one changed sentence."),
  },
  {
    no: "03",
    name: D("한국인은 누구인가", "Who Koreans Are"),
    salience: D("세 번째로 큰 질문 · 143개 · 그리고 자기 모습을 검색하는 한국", "3rd biggest · 143 · and Korea searching its own reflection"),
    misread: D("세계는 한국 ‘사회’를 이해하기보다 한국의 ‘보기 좋은 겉모습’을 먼저 좋아하기 시작했다. 그리고 한국은 그런 시선을 불안하게 지켜본다.", "The world has started loving Korea's good-looking surface faster than it understands Korean society. And Korea anxiously watches itself being watched."),
    why: D("문화가 뜨면 사람들의 관심은 ‘무엇을 만드나’에서 ‘어떤 사람들인가’로 옮겨간다. 그런데 ‘왜 이렇게 예쁘지?’, ‘왜 금속 젓가락을 쓰지?’ 같은 질문은 한국인을 하나의 ‘신기한 유형’으로 납작하게 만든다. 정작 한국의 1위 질문은 ‘외국인이 보는 한국인’ — 세계가 비추는 거울을 확인하는 나라다.", "When a culture rises, attention shifts from “what do they make” to “who are they.” But questions like “why are they so pretty” or “why metal chopsticks” flatten Koreans into a single exotic type. Tellingly, Korea's own #1 question is “how foreigners see Koreans” — a nation checking the mirror the world holds up."),
    assumption: D("밖에서는 ‘한국인은 다 비슷하게 예쁘고, 어딘가 알 수 없는 사람들’이라고 본다. 안에서는 ‘우리 위상이 아직 약해서 남의 인정이 필요하다’고 느낀다 — 둘 다 불안에서 나온 생각이다.", "From outside: “Koreans are all similarly pretty, and a bit unknowable.” From inside: “our standing is still shaky, so we need others' approval.” Both come from insecurity."),
    gap: D("세계의 호기심은 한국인을 띄워 주지만 동시에 납작하게 만든다. 한국은 ‘현대적이고, 다양하고, 저마다 다른 사람들’로 보이고 싶어 한다.", "The world's curiosity flatters Koreans but flattens them. Korea wants to be seen as modern, varied, and individual."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("‘사회’로 존중받지 못하고 ‘예쁜 볼거리’로만 사랑받을 위험.", "The risk of being loved as a pretty spectacle rather than respected as a society.")],
      [D("관광", "Tourism"), D("‘예쁜 사람 구경’이라는 얕은 방문 동기.", "A shallow reason to visit: “see the beautiful people.”")],
      [D("교육", "Education"), D("한국의 사회·일상을 보여 주는 콘텐츠 수요가 안 채워졌다.", "Unmet demand for content about ordinary Korean society and daily life.")],
      [D("문화정책", "Cultural policy"), D("아이돌·뷰티 위주 콘텐츠가 ‘납작한 시선’을 키운다.", "Idol- and beauty-heavy content feeds the flattening gaze.")],
      [D("국가브랜딩", "Nation branding"), D("‘예쁜 사람들’이라는 이미지는 약하고, 누구나 흉내 낼 수 있다.", "“Beautiful people” is a weak image — anyone can copy it.")],
    ],
    move: D("한국인의 모습을 일부러 더 입체적으로, 다양하게 보여 줘라 — 아이돌만이 아니라 평범하고 저마다 다른 한국인의 삶. 겉모습에 대한 매력을 사회에 대한 이해로 바꿔야 애정이 오래간다. 그리고 남의 인정을 구하지 말고 자신감을 보여 줘라 — 그게 더 강한 브랜드다.", "Deliberately show Koreans as fuller and more varied — not just idols, but ordinary, individual Korean lives. Turning attraction to the surface into understanding of the society is what makes affection last. And project confidence instead of seeking approval — that's the stronger brand."),
  },
  {
    no: "04",
    name: D("음식, 보편의 문", "Food, the Universal Door"),
    salience: D("140개 · 모든 시장에 고르게 나타나는 유일한 질문", "140 · the one question that shows up evenly in every market"),
    misread: D("한식은 세계에서 가장 부담 없고 정치색 없는 ‘한국 대사’인데, 정작 한국은 그걸 몇 가지 요리로만 안다고 생각한다.", "Korean food is the world's most low-pressure, least-political ambassador for Korea — and Korea knows it as just a few dishes."),
    why: D("음식은 언어도 정치도 필요 없이 바로 즐길 수 있는, 가장 문턱 낮은 입구다. 모든 시장이 공통으로 묻는 유일한 주제지만, 아는 단어는 좁다(김치·고기구이·맵다). ‘건강에 좋나요?’라는 질문은, 한국이 아직 내세우지 않은 ‘웰빙’이라는 관점을 보여 준다.", "Food is the lowest doorway — no language, no politics, enjoy it immediately. It's the one topic every market shares, but the vocabulary is narrow (kimchi, barbecue, “spicy”). The question “is it healthy?” points to a wellness angle Korea hasn't claimed."),
    assumption: D("‘한식 = 수출 히트작 몇 개’이고 ‘핵심은 매운맛’이라는 생각. 사실은 지역마다 다른 방대한 발효 음식 문화인데, 세계는 그걸 ‘이국적인 별미’ 정도로 받아들인다.", "The belief that “Korean food = a few export hits” and “the point is the heat.” It's actually a vast, regional, fermentation-based cuisine that the world receives as an exotic novelty."),
    gap: D("국민 음식의 깊이와, 그 음식을 딱 세 가지만 아는 세계 사이의 간격.", "The gap between a national cuisine's depth and a world that knows three of its dishes."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("모든 시장이 이미 지나가는 공통의 입구.", "The shared doorway every market already walks through.")],
      [D("관광", "Tourism"), D("미식 여행은 돈을 많이 쓰는 분야인데, 수요를 못 채우고 있다.", "Food tourism spends big and is under-served.")],
      [D("교육", "Education"), D("음식에 대한 호기심은 문화·언어로 가는 가장 값싼 통로.", "Curiosity about food is the cheapest path into culture and language.")],
      [D("문화정책", "Cultural policy"), D("‘한식 세계화’는 밀어붙이기인데, 실제 수요는 ‘제대로 아는 것’이다.", "“Globalizing Korean food” is a push; the real demand is to actually understand it.")],
      [D("국가브랜딩", "Nation branding"), D("‘건강하고, 발효되고, 균형 잡힌’이라는 이미지는 요즘 웰빙 흐름과 잘 맞는다.", "“Healthy, fermented, balanced” fits neatly with today's wellness trend.")],
    ],
    move: D("음식을 일부러 ‘정문’으로 삼고, 그 호기심을 더 깊은 데로 이어라 — ‘이국적이고 맵다’에서 ‘건강하고 발효된 균형 잡힌 음식’으로 이야기를 바꿔 실제 수요에 맞춰라. 일곱 시장이 다 만나는 지점에서 시작해 바깥으로 넓혀 가라.", "Make food the deliberate front door and lead that curiosity deeper — shift the story from “exotic and spicy” to “healthy, fermented, balanced” to meet demand where it is. Start where all seven markets meet, and widen out."),
  },
  {
    no: "05",
    name: D("유산과 깊이", "Heritage & Depth"),
    salience: D("127개 · 한국인 자신과 일본에 몰려 있다", "127 · concentrated among Koreans themselves and Japan"),
    misread: D("세계는 ‘한국 = 요즘 대중문화’라고, 즉 ‘한 15년쯤 된 나라’라고 여긴다. 그 아래 오래된 문명이 있다는 걸 아는 건 가까운 이웃뿐이다.", "The world treats “Korea = today's pop culture” — a country about fifteen years deep. Only its close neighbours know there's an old civilization underneath."),
    why: D("역사·전통에 대한 호기심은 ‘가까워서 더 깊이 궁금해지는’ 곳에 몰린다 — 한국과 일본이 한복·명절·전통을 묻는다. 먼 나라는 ‘대중문화 한국’을, 가까운 나라는 ‘깊은 한국’을 묻는다. 서구에는 한국이 ‘플레이리스트’로 도착했기 때문에 얕다.", "Curiosity about history and tradition clusters where proximity breeds deeper interest — Korea and Japan ask about hanbok, holidays, tradition. Distant markets ask about pop-Korea; near ones about deep-Korea. In the West, Korea arrived as a playlist, so it's thin."),
    assumption: D("‘한국은 K-팝이고, 깊다기보다 유행’이라는 생각. 일본·중국에는 절대 하지 않을 방식으로, 세계는 한국의 역사적 깊이를 낮춰 본다.", "The belief that “Korea is K-pop — trendy more than deep.” The world underrates Korea's historical depth in a way it never would with Japan or China."),
    gap: D("수천 년 된 문명과, ‘한 15년쯤 된’ 세계 이미지 사이의 간격.", "The gap between a civilization thousands of years old and a global image about fifteen years old."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("깊이는 곧 오래 감 — 대중문화만으로 만든 이미지는 약하다.", "Depth means durability — an image built on pop culture alone is fragile.")],
      [D("관광", "Tourism"), D("역사·유산 관광이 대중문화 팬들에게 덜 알려져 있다.", "Heritage tourism is under-marketed to the pop-culture audience.")],
      [D("교육", "Education"), D("세계의 한국 이해는 ‘대중문화는 깊고, 역사는 얕다’.", "Global understanding of Korea is pop-deep and history-shallow.")],
      [D("문화정책", "Cultural policy"), D("투자가 대중문화 수출에 쏠려 유산이 덜 쓰인다.", "Investment tilts to pop-culture export, so heritage is under-used.")],
      [D("국가브랜딩", "Nation branding"), D("‘오래된 문명 + 최첨단’은 가장 흉내 내기 어려운 브랜드.", "“Ancient civilization + cutting-edge” is the hardest brand to imitate.")],
    ],
    move: D("지금의 대중문화 붐을 오래된 문명의 깊이에 붙들어 매라 — K-팝 세대에게 ‘이 뒤에는 이천 년이 있다’는 이야기를 줘라. 깊이가 유행을 오래가는 국가 브랜드로 바꾸고, 언젠가 올 ‘한류 피로’에도 대비하게 한다.", "Anchor today's pop boom to civilizational depth — give the K-pop generation the story “there are two thousand years behind this.” Depth turns a trend into a lasting national brand and hedges against the “Hallyu fatigue” that will eventually come."),
  },
  {
    no: "06",
    name: D("동경으로서의 K-뷰티", "K-Beauty as Aspiration"),
    salience: D("81개 · 인도네시아·브라질·아랍에서 강하고 — 독일·일본·한국에는 거의 없다", "81 · strong in Indonesia, Brazil, the Arab world — nearly absent in Germany, Japan, Korea"),
    misread: D("한국은 K-뷰티를 ‘수출 품목’으로 다룬다. 하지만 떠오르는 신흥국 사람들에게 그건 ‘나를 가꾸는 정체성’이자 가장 친밀한 소프트파워다. 그런데 지금 그걸 운영하는 건 외교관이 아니라 화장품 회사다.", "Korea treats K-beauty as an export product. For people in the rising emerging world it's an identity — a way of caring for oneself — and Korea's most intimate soft power. Yet the ones running it are cosmetics firms, not diplomats."),
    why: D("K-뷰티는 ‘이제 막 중산층이 되어 현대적인 삶을 보여 주고 싶은’ 곳에서 강하고, 이미 자신 있는 나라(독일·일본)나 원산지(한국)에서는 사라진다. ‘노력하면 나도 닿을 수 있는 더 나은 나’를 파는 셈이다 — 스타를 좋아하는 팬심이 아니라, 매일의 개인적인 습관.", "K-beauty is strong where a new middle class wants to perform a modern life, and it vanishes in confident markets (Germany, Japan) or at the source (Korea). It sells “a better me you can actually reach” — not celebrity fandom, but a personal daily habit."),
    assumption: D("신흥국에서 ‘한국산’은 ‘노력하면 닿을 수 있는 현대적인 아름다움·자기관리’와 같은 말이 됐다. 한국 = 실제로 손에 닿는 ‘동경하는 삶’.", "In emerging markets, “made in Korea” has become shorthand for “modern beauty and self-care you can actually reach.” Korea = an aspirational life within arm's reach."),
    gap: D("한국은 ‘산업’을 보는데, 이 시장 사람들은 ‘정체성’을 산다 — 한국은 그 유대가 얼마나 깊은지 과소평가한다.", "Korea sees an industry; these markets buy an identity — and Korea underrates how deep that bond runs."),
    impl: [
      [D("공공외교", "Public diplomacy"), D("가장 친밀한 일상 소프트파워를 통째로 기업에만 맡겨 두고 있다.", "The most intimate everyday soft power is left entirely to companies.")],
      [D("관광", "Tourism"), D("의료·뷰티 관광 수요가 바로 이 시장에 몰려 있다.", "Medical and beauty tourism demand is concentrated in exactly these markets.")],
      [D("교육", "Education"), D("뷰티에 대한 관심은 언어·여행으로 가는 통로.", "Interest in beauty is a gateway to language and travel.")],
      [D("문화정책", "Cultural policy"), D("‘무역’으로만 분류해서, 정체성을 만드는 힘을 놓치고 있다.", "Filed only under “trade,” it misses its power to shape identity.")],
      [D("국가브랜딩", "Nation branding"), D("‘노력하면 닿는 현대적인 삶’이라는, 시장마다 다른 브랜드.", "“The modern life you can reach” — a brand that differs by market.")],
    ],
    move: D("K-뷰티를 ‘가장 빠르게 크는 시장의 전략적 외교 자산’으로 보고, ‘뷰티 → 언어 → 여행 → 애정’으로 이어지는 길을 일부러 설계하라. 한국의 이미지가 지금 가장 중요한 시장에서 만들어지고 있는데, 정작 국가를 대표해 그걸 이끄는 사람은 아무도 없다.", "See K-beauty as a strategic diplomatic asset in the fastest-growing markets, and deliberately design the path “beauty → language → travel → affection.” Korea's image is being made right now in the markets that matter most — and no one with a national mandate is leading it."),
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
        <Kicker>{locale === "ko" ? "출발점 · 왜 질문에서 시작하는가" : "Starting point · Why we begin with questions"}</Kicker>
        <H2>{locale === "ko" ? "세계가 한국을 이해하기 시작하는 지점이 바뀌었다" : "Where the world begins to understand Korea has shifted"}</H2>
        <Lead>
          {locale === "ko"
            ? "AI가 정보의 첫 관문이 되면서, 세계가 한국을 이해하기 시작하는 지점은 우리가 내보낸 콘텐츠가 아니라 사람들이 검색창과 AI에 직접 던지는 질문으로 옮겨갔고, 그래서 한국의 이미지를 진단하려면 우리가 무엇을 보여주었는지가 아니라 세계가 무엇을 묻는지에서 출발해야 한다. 이 브리프는 그렇게 모은 질문들을 개념과 주제로 구조화하고, 그 구조가 드러내는 인식을 읽은 뒤, 그 인식이 공공외교에 대해 무엇을 함의하는지까지 따라간 결과다."
            : "As AI became the first gate to information, the place where the world begins to understand a country shifted from the content we broadcast to the questions people put directly to search engines and AI — so to diagnose Korea's image you have to start not from what Korea showed, but from what the world asks. This brief takes those collected questions, structures them into concepts and themes, reads the perceptions that structure reveals, and follows those perceptions to what they imply for public diplomacy."}
        </Lead>
      </DocSection>

      <DocSection>
        <Kicker>{locale === "ko" ? "핵심 주장" : "The main point"}</Kicker>
        <H2>{locale === "ko" ? "사람들은 한국을 많이 본다. 하지만 많이 안다고 보긴 어렵다." : "People see a lot of Korea. But that isn’t the same as knowing it."}</H2>
        <Lead>
          {locale === "ko"
            ? "한국은 20년 동안 세계에 한국을 ‘보여주는’ 데 집중했다. 콘텐츠를 만들고, 문화원을 열고, 축제를 후원했다. 그런데 사람들이 실제로 검색하는 질문을 보면, 그들이 알고 싶어 하는 것과 한국이 보여주는 것이 어긋나 있다. 세계는 한국을 보고 있지만, 여전히 오래된 눈으로 본다 — 전쟁으로 나뉜 위험한 곳, 배우기 벅찬 언어, 예쁘지만 잘 모르겠는 사람들."
            : "For twenty years Korea has focused on showing itself to the world — making content, opening cultural centers, sponsoring festivals. But look at what people actually search for, and what they want to know doesn't match what Korea is showing. The world is watching Korea, but still through old eyes: a dangerous place split by war, a language too hard to learn, beautiful people it can't quite read."}
        </Lead>
        <div className="mt-6 border-l-[3px] border-[color:var(--accent)] pl-5 text-xl font-medium leading-snug text-navy max-w-[52ch]">
          {locale === "ko"
            ? "세계가 가장 많이 던지는 질문은 지금도 ‘한국은 왜 둘로 나뉘었나’다 — K-팝·드라마·뷰티에 대한 어떤 질문보다도 많다. 15년의 한류는 관심의 크기는 키웠지만, 사람들이 던지는 첫 질문은 바꾸지 못했다."
            : "The single most common thing the world asks is still “why is Korea split in two” — more than any question about K-pop, drama, or beauty. Fifteen years of Hallyu made the interest louder, but it did not change the first question people ask."}
        </div>
        <Lead>
          {locale === "ko"
            ? "게다가 한꺼번에 대답할 ‘하나의 세계’도 없다. 질문의 31%만 여러 나라에 공통으로 나타나고, 나머지 69%는 그 나라에만 있다. 하나의 한국 이미지가 아니라, 나라마다 다른 조각의 한국이 있는 것이다."
            : "And there is no single “world” to answer all at once. Only 31% of the questions show up in more than one country; the other 69% are local. There isn't one image of Korea — each country sees a different piece of it."}
        </Lead>
      </DocSection>

      {DOSSIERS.map((d, i) => (
        <DocSection key={d.no} tint={i % 2 === 0}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-sm font-bold text-[color:var(--accent)]">{d.no}</span>
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-[28px]">{d.name[locale]}</h2>
          </div>
          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{d.salience[locale]}</div>
          {/* 관찰 → 세계의 가정 → 두 인식의 간극. 독자가 사고를 먼저 따라간다. */}
          <div className="mt-6 grid gap-5">
            <Q label={locale === "ko" ? "왜 이런 질문이 나올까" : "Why people ask this"}>{d.why[locale]}</Q>
            <Q label={locale === "ko" ? "이 질문 속에 숨은 생각" : "The belief hidden inside it"}>{d.assumption[locale]}</Q>
            <Q label={locale === "ko" ? "한국 생각과 세계 생각의 차이" : "Where Korea and the world disagree"}>{d.gap[locale]}</Q>
          </div>
          {/* 여기까지 따라오면, 오해는 저자가 규정하지 않아도 독자가 스스로 도달한다. */}
          <p className="mt-6 max-w-[62ch] border-l-[3px] border-[color:var(--accent)] pl-5 text-[19px] font-medium leading-snug text-navy">
            {d.misread[locale]}
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white">
            <div className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {locale === "ko" ? "이것이 뜻하는 것" : "What this means"}
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
            <Accented label={locale === "ko" ? "그래서 한국은" : "So here's what Korea should do"}>{d.move[locale]}</Accented>
          </div>
        </DocSection>
      ))}

      <DocSection>
        <Kicker>{locale === "ko" ? "종합" : "Putting it together"}</Kicker>
        <H2>{locale === "ko" ? "하나의 한국을 방송하지 말고, 일곱 개의 질문에 답하라" : "Stop broadcasting one Korea; answer seven different questions"}</H2>
        <Lead>
          {locale === "ko"
            ? "여섯 개 주제를 관통하는 하나의 사실이 있다: 관심은 이해보다 빨리 자랐다. 신흥국에게 한국은 ‘지정학적 사실이자 동경하는 삶’, 서구에게는 ‘어려운 언어 뒤의 멋진 문화 상품’, 이웃에게는 ‘오래된 문명’이다. 한 나라인데, 사람들이 보는 한국은 여러 개다 — 그래서 어떤 하나의 캠페인도 이들 모두에게 통할 수 없다. 다음 단계는 ‘더 크게 알리기’가 아니라, 시장마다 다르게 드러나는 그 격차를 하나씩 좁히는 것이다."
            : "One fact runs through all six: interest grew faster than understanding. To the emerging world Korea is a geopolitical fact and an aspirational life; to the West, a cool cultural product behind a hard language; to its neighbours, an old civilization. One country, but people see several Koreas — so no single campaign can reach all of them. The next step isn't louder promotion; it's closing, one at a time, the specific gap each market reveals."}
        </Lead>
      </DocSection>
    </>
  );
}
