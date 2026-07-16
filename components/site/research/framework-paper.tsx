"use client";

import * as React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

// The three things we take for granted — and why the questions break each one.
const FALSIFIED: [L, L, L][] = [
  [D("하나의 이미지", "One image for everyone"), D("착각 01", "Myth 01"), D("질문의 69%는 그 나라에만 있다. 온 세계에 통하는 ‘하나의 한국’은 없고, 나라마다 다르게 보는 일곱 개의 한국이 있다.", "69% of the questions appear in only one country. There is no single “world Korea” to brand — there are seven partial Koreas, each seen through a local lens.")],
  [D("관심 = 성공", "Attention means success"), D("착각 02", "Myth 02"), D("관심은 역대 최고인데, 가장 많이 나오는 질문은 여전히 ‘왜 둘로 나뉘었나’다. 사람들은 한국을 많이 본다. 하지만 많이 안다고 보긴 어렵다.", "Attention is at record highs, yet the most-asked question is still “why is Korea split in two.” People see a lot of Korea — but that isn’t the same as knowing it.")],
  [D("국가가 이미지를 만든다", "The state makes the image"), D("착각 03", "Myth 03"), D("실제 이미지는 함께 만들어진다 — 질문하는 사람, 해외 동포, 민간 기업이 같이. 그런데 국가에는 그 목소리를 ‘듣는 장치’가 없다.", "The real image is made together — by the people asking, the diaspora, private companies. But the state has no device for listening.")],
];

type FW = { no: string; cat: L; name: L; defn: L; structural: L; larger: L; framework: L; institution: { name: L; body: L }; evidence: L };

// Each framework reads: the problem → why it matters → what's missing → the idea
// → what to build → the evidence. Named plainly; the mechanism is explained, not
// announced.
const FRAMEWORKS: FW[] = [
  {
    no: "01", cat: D("무엇을 성공으로 볼 것인가 · 측정", "What counts as success · Measurement"),
    name: D("이해를 재는 장부", "An understanding ledger"),
    defn: D("지금 한국은 조회수, 방문자 수, 콘텐츠 소비량 — 즉 ‘관심’을 잰다. 하지만 ‘사람들이 한국을 얼마나 이해하게 됐는가’는 거의 재지 않는다. 이해가 중요하다면, 이해를 재는 방법이 있어야 한다.", "Right now Korea measures views, visitors, and content consumption — attention. It almost never measures how much people actually came to understand Korea. If understanding matters, we need a way to measure it."),
    structural: D("잘못 재면 잘 관리할 수 없다. ‘소프트파워’는 관심의 크기로 표시되는데, 그건 사람들이 한국을 더 정확히 알게 됐는지와는 상관이 없다. 모든 관심 지표에서 1등을 해도, 정작 ‘70년 된 오해’는 그대로 남아 있을 수 있다.", "You can't manage what you measure wrong. “Soft power” is counted in attention — which has nothing to do with whether anyone understands Korea more accurately. You can top every attention chart while a 70-year-old misunderstanding stays exactly where it was."),
    larger: D("국가에 대한 ‘이해’를 재는 공식 기준이 없다. 인식 순위표는 그때그때의 스냅숏만 매길 뿐, 어느 나라가 ‘아직 안 풀린 질문’을 얼마나 안고 있는지, 그게 줄고 있는지 늘고 있는지는 아무도 추적하지 않는다.", "There is no standard for measuring how well a country is understood. Perception rankings score snapshots; nobody tracks how many unanswered questions a country is carrying, or whether that number is going up or down."),
    framework: D("세계의 질문을 ‘아직 갚지 않은 빚’ 목록으로 보자. ‘왜 둘로 나뉘었나 / 안전한가’는 신흥국에서 크게 쌓인 빚이다. 외교의 성적은 ‘이번에 몇 개의 질문을 풀었고, 몇 개의 새 질문이 생겼는가’로 매긴다.", "Treat the world's questions as a list of unpaid debts. “Why is it split / is it safe” is a large debt in the emerging world. Diplomacy is scored on how many questions it resolved this year minus how many new ones it opened."),
    institution: { name: D("이해 장부", "The Understanding Ledger"), body: D("나라 살림 예산처럼 공개하고 감사받는, 시장별 ‘풀린 질문 / 안 풀린 질문’ 장부. 모든 사업은 ‘질문을 얼마나 풀었나’로 평가한다.", "A public, audited, per-market ledger of resolved vs. unresolved questions — published like the national budget. Every program is judged on how many questions it closed.") },
    evidence: D("1,540개의 질문이 그 ‘시작 잔액’이고, 한류가 뜨는 내내 사라지지 않은 분단 질문이 ‘오래 안 갚힌 빚’의 표시다.", "The 1,540 questions are the opening balance; the division question, still unpaid all through the Hallyu boom, is the marker of a long-overdue debt."),
  },
  {
    no: "02", cat: D("예산을 어떻게 정할 것인가 · 공공외교", "How to set the budget · Public diplomacy"),
    name: D("먼저 듣는 국가", "A country that listens first"),
    defn: D("지금은 한국이 ‘무엇을 보여 줄지’ 먼저 정하고 세계에 내보낸다. 순서를 뒤집자. 세계가 실제로 묻는 질문이, 문화정책이 무엇을 하고 어디에 돈을 쓸지 정하는 출발점이 되게 하자.", "Today Korea decides what to show, then broadcasts it. Flip the order. Let the questions the world actually asks be the starting point for what cultural policy does and where the money goes."),
    structural: D("한국은 콘텐츠를 만드는 힘은 엄청난데, ‘무엇이 필요한지 알아듣는 귀’는 거의 없다. 이 데이터셋 자체가, 국가에 없던 그 ‘귀’의 시제품이다.", "Korea's power to make content is enormous; its ability to hear what people actually need is almost nonexistent. This dataset is a prototype of the ear the state never had."),
    larger: D("문화 예산은 대개 ‘체면’과 ‘공급’으로 나뉜다 — 센터를 짓고 축제를 연다 — 실제 수요가 아니라. 돈이 흐르는 방향이 정작 청중을 못 보고 있다.", "Cultural budgets are usually split by prestige and supply — build a center, run a festival — not by real demand. The money flows without ever seeing the audience."),
    framework: D("시장마다 ‘무엇을 가장 궁금해하는지’를 보여 주는 지표를 만들고, 그에 맞춰 예산을 배분하자. 돈은 ‘가장 크게 안 풀린 궁금증’으로 흐르고, 아무도 안 묻는 체면치레 사업에서는 빠진다.", "Build an index of what each market is most curious about, and allocate the budget to it. Money flows to the biggest unanswered curiosity and is pulled back from prestige projects no one is asking for."),
    institution: { name: D("질문을 듣는 상설 기구", "A standing office that listens"), body: D("이 수집 작업을 상시로 돌리는 ‘듣는 기관’, 그리고 문화 예산의 일부를 이 궁금증 지표에 묶는 규칙. 이미지 담당 부처는 ‘만드는 곳’에서 ‘듣고 배분하는 곳’으로 바뀐다.", "A permanent office that runs this collection continuously, plus a rule tying part of the cultural budget to the curiosity index. The image ministry stops being a producer and becomes a listener-and-allocator.") },
    evidence: D("8개 시장의 수요 지도는 이미 예산이 잘못 쓰이고 있음을 보여 준다 — 정작 수요가 큰 ‘역사·전통’과 ‘언어 입문’이 덜 채워져 있다.", "The 8-market demand map already shows the mis-spend — history, heritage, and beginner-language on-ramps are under-served relative to how much they're actually asked about."),
  },
  {
    no: "03", cat: D("누가 결정할 것인가 · 운영", "Who decides · Governance"),
    name: D("시장마다 다른 한국", "A different Korea for each market"),
    defn: D("하나의 세계 브랜드를 억지로 미는 대신, ‘나라마다 다른 판’을 인정하자. 모두가 공유하는 아주 얇은 공통 메시지 하나 + 시장마다 두껍게 다른 버전, 각 버전은 그 시장이 가장 걸려 있는 질문을 풀도록 만든다.", "Instead of forcing one global brand, accept that each market needs its own version: one very thin shared message everyone agrees on, plus a thick, different edition per market — each built to answer the question that market is stuck on."),
    structural: D("똑같은 브랜드를 모두에게 밀면, 서로 안 맞는 질문들을 평균 내 버려서 모든 시장을 어중간하게 만족시킨다. 궁금증의 69%가 그 나라에만 있는데, ‘세계 캠페인’은 결국 아무에게도 안 맞는 형식이다.", "Push the same brand to everyone and you average across questions that don't fit together, leaving every market half-served. When 69% of the curiosity is local, the “global campaign” is the one format that fits no one."),
    larger: D("‘한 나라 = 하나의 이미지’라는 생각은, 온 세계가 같은 광장에서 같은 이야기를 본다는 전제 위에 있다. 그런데 알고리즘과 다국어 환경이 그 광장을 이미 쪼개 놨다.", "The “one nation, one image” idea assumes the whole world watches the same story in the same square. Algorithms and a multilingual internet have already broken that square into pieces."),
    framework: D("예: 모두가 물려받는 ‘기본 사실’ 하나 — ‘여기는 남한 — 민주적이고, 안전하고, 북한과 다르다’ — 을 두고, 그 위의 나머지는 시장마다 현지에 맞게 다시 짠다. 뿌리는 하나, 버전은 여럿.", "One inherited base fact — “this is South Korea: democratic, safe, distinct from the North” — shared everywhere, with everything above it rebuilt locally for each market. One root, many versions."),
    institution: { name: D("시장별 협의체", "Market councils"), body: D("한국 기관 + 현지 파트너 + 해외 동포가 한 팀이 되어, 각 시장의 ‘한국 버전’을 실제 권한을 갖고 맡는다. 브랜딩이 ‘중앙 방송’이 아니라 ‘여러 곳이 나눠 맡는 운영’이 된다.", "Korean institutions + local partners + diaspora, each team holding real authority over its market's edition of Korea. Branding stops being a central broadcast and becomes something many places run together.") },
    evidence: D("시장마다 1위 궁금증이 다르고(사람·언어·분단·유산), 공통점은 31%뿐 — 이미 사실상 ‘여러 판’인데, 구조만 아직 하나로 묶여 있다.", "Each market's #1 curiosity is different (people, language, division, heritage), with only 31% shared — it's already many editions in practice, waiting for a structure that admits it."),
  },
  {
    no: "04", cat: D("누가 답할 것인가 · 시민 참여", "Who answers · Civic participation"),
    name: D("시민이 함께 답하는 곳", "Where citizens answer together"),
    defn: D("공공외교를 ‘부처가 제공하는 서비스’가 아니라 ‘시민이 함께 만드는 것’으로 바꾸자. 아직 안 풀린 질문을 시민과 해외 동포에게 나눠 주고, 서로 검증한 답이 살아 있는 ‘한국 지식 창고’로 쌓이게 하자.", "Turn public diplomacy from a service a ministry delivers into something citizens make together. Hand the open questions to citizens and diaspora, and let peer-checked answers pile up into a living store of knowledge about Korea."),
    structural: D("1,540개의 질문에 답할 ‘시민 창구’가 없다 — 답할 지식은 5,100만 한국인과 약 700만 해외 동포에게 있는데, 아무도 부르지 않았다.", "There's no civic channel to answer the 1,540 questions — the knowledge lives in 51 million Koreans and about 7 million diaspora, and none of them have been asked."),
    larger: D("공공외교는 구조적으로 소수만의 일이었다 — 부처, 기관, 유명인. 보통 사람이 세계 속에서 한국을 함께 설명할 통로가 없다. 한국이 ‘외국인이 보는 한국인’을 검색한다는 건, 갈 곳 없는 참여 에너지가 있다는 뜻이다.", "Public diplomacy has structurally belonged to a few — ministries, institutions, celebrities. Ordinary people have no way to help explain Korea to the world. Korea googling “how foreigners see Koreans” is participation energy with nowhere to go."),
    framework: D("‘답하는 시민’ 개념. 듣는 기관이 모은 열린 질문을 시민·동포에게 나눠 주면, 각자 하나를 맡아 자기 언어로 답한다. 서로 검증하고 출처를 남겨서 믿을 수 있게 만든다. 5,800만의 나라가 흩어진 외교단이 된다.", "The “answering citizen.” The listening office hands its open questions to citizens and diaspora; each adopts one and answers it in their own language. Peer-checking and sources make it trustworthy. A nation of 58 million becomes a distributed diplomatic corps."),
    institution: { name: D("함께 답하는 플랫폼", "A shared answering platform"), body: D("출처가 남는 다국어 시민 플랫폼(‘한국 질문 위키’)과 가벼운 인정(‘한국 답변자’) 배지. 민간에 흩어진 문화 지식을 공공의 외교 자산으로 바꾼다.", "A multilingual, source-tracked citizen platform (a “Wikipedia of Korea questions”) plus a light badge (“Korea Answerer”). It turns private cultural knowledge into a public diplomatic asset.") },
    evidence: D("한국의 1위 질문이 ‘자기 이미지’이고, 해외 동포는 이미 시각이 갈리는 바로 그 시장들(브라질·인도네시아·독일·일본·미국)에 살고 있다.", "Korea's own #1 question is its self-image, and the diaspora already live in exactly the markets whose views diverge (Brazil, Indonesia, Germany, Japan, the US)."),
  },
  {
    no: "05", cat: D("누가 비용을 낼 것인가 · 재원", "Who pays · Financing"),
    name: D("이미지 값을 나눠 내는 기금", "A fund the winners pay into"),
    defn: D("‘한국’이라는 이름값으로 가장 많이 버는 민간 산업이, 자신들이 공짜로 올라타 있는 공공 토대에 값을 나눠 내게 하자.", "Have the private industries that profit most from the “Korea” premium pay into the public foundations they've been riding for free."),
    structural: D("한국의 가장 강력한 이미지 원천 — K-뷰티·K-팝·K-푸드 — 은 민간 소유다. 이 기업들은 국가 이미지에 엄청난 덕을 보면서도, ‘안전하다는 인식’, ‘언어에 대한 관심’, ‘한국 프리미엄’ 같은 공공 토대에는 값을 안 낸다.", "Korea's strongest image-makers — K-beauty, K-pop, K-food — are privately owned. These firms benefit enormously from the national image while paying nothing into the public foundations they lean on: the sense of safety, the interest in the language, the “Korea” premium itself."),
    larger: D("민간 문화가 만들어 내는 국가 이미지 이득을 다루는 틀이 없다. 그 가치가 잡히지도, 다시 투자되지도 않아서, 브랜드가 딛고 선 토대가 만성적으로 돈이 부족하다.", "There's no framework for the national-image value private culture throws off. It's neither captured nor reinvested, so the foundations the brand stands on are chronically underfunded."),
    framework: D("이름값으로 가장 이득 보는 산업이 조금씩 내서(법으로든 자율로든) 모은 공동 기금을, 그들이 기대고 있는 공공재 — 남북 구분, 언어 입문, 역사 깊이 — 에만 쓰도록 묶는다. 성과는 위의 ‘이해 장부’로 잰다.", "A shared fund — a small contribution (statutory or voluntary) from the industries that gain most — ring-fenced to the public goods they depend on: telling the two Koreas apart, language on-ramps, historical depth. Its scorecard is the Understanding Ledger."),
    institution: { name: D("국가 이미지 기금", "A national image fund"), body: D("산업·정부·시민사회가 함께 운영하고, 지출은 ‘질문을 얼마나 풀었나’로 잰다. 소프트파워가 ‘공짜로 새어 나가는 이득’이 아니라 ‘관리하고 재투자하는 자산’이 된다.", "Run jointly by industry, government, and civil society, with spending measured in questions resolved. Soft power stops being a benefit that leaks out for free and becomes an asset that is managed and reinvested.") },
    evidence: D("K-뷰티가 강한 시장(인도네시아·브라질·아랍)이 바로 ‘남북 구분이 안 된’ 시장과 정확히 겹친다 — 토대가 가장 약한 곳에서 산업이 가장 강하다.", "The markets where K-beauty is strongest (Indonesia, Brazil, the Arab world) are exactly the ones where the two Koreas aren't yet told apart — the industry is strongest where the foundation is weakest."),
  },
  {
    no: "06", cat: D("얼마나 오래 볼 것인가 · 장기", "The long horizon · Time"),
    name: D("오래된 이미지에서 새 이미지로", "From the old image to a new one"),
    defn: D("국가 이미지는 ‘시대의 틀’을 하나씩 지나간다 — 전쟁의 틀 → 발전의 틀 → 문화의 틀 → 그다음. 이 옮겨 감은 한 번의 캠페인이 아니라 한 세대짜리 일이고, 옛 틀을 부정하는 게 아니라 그 위에 다리를 놓아야 한다.", "A country's image passes through eras, one frame at a time — the war frame → the development frame → the culture frame → whatever's next. Moving between them is a generation-long job, not a campaign, and it needs a bridge from the old frame, not a denial of it."),
    structural: D("국가 이미지는 ‘처음 각인된 대로’ 오래간다. 한 나라가 세계에 처음 알려진 틀이 버팀목처럼 굳어져서, 현실이 바뀌어도 몇 세대씩 이어진다. 한국의 ‘전쟁 틀’은 70년이 넘었는데 아직도 1위다.", "A national image lasts the way it was first imprinted. The frame a country enters the world through hardens into a support beam and persists for generations even after reality changes. Korea's “war frame” is over 70 years old and still ranks first."),
    larger: D("리브랜딩은 보통 ‘한 번 하는 홍보’로 다뤄지지만, 틀은 구조적이고 대물림된다. 한 나라를 ‘물려받은 옛 틀’에서 ‘지금의 틀’로 옮겨 줄 정책 도구가 아예 없다.", "Rebranding is usually treated as a one-off promotion, but frames are structural and inherited. There is simply no policy tool for moving a country from the old frame it inherited to the one it's actually in now."),
    framework: D("버팀목이 된 옛 틀은 지울 수 없다. 그걸 출발점 삼아 다리를 놓아야 한다 — ‘분단국이었지만 민주적 기술·문화 강국이 된 나라’는 옛 틀의 무게를 새 틀로 실어 나른다. 이 옮겨 감은 위의 ‘이해 장부’로 진단하고, 수십 년에 걸쳐 시장별로 순서를 짠다.", "You can't erase a load-bearing frame; you build a bridge that starts from it. “A divided country that became a democratic tech-and-culture power” carries the weight of the old frame into the new one. The move is diagnosed from the Understanding Ledger and sequenced over decades, market by market."),
    institution: { name: D("장기 이미지 전략 기구", "A long-term image strategy office"), body: D("선거 주기에서 떨어진, 작지만 여러 부처를 아우르는 장기 조직(국가 이미지의 ‘한국은행’ 같은 곳). 시장마다 버팀목이 된 틀을 진단하고 수십 년짜리 이행 순서를 짠다. 틀은 정권보다 오래 사니, 관리도 그래야 한다.", "A small, cross-ministry, long-horizon office kept out of the election cycle — a kind of “central bank” for the national image. It diagnoses each market's load-bearing frame and sequences a decades-long transition. Frames outlive governments, so their management should too.") },
    evidence: D("‘발전 → 문화’로의 이행은 진행 중으로 보이지만(기술·경제·한류 질문이 함께 늘었다), ‘전쟁 → 다음’으로의 이행은 틀이 안 바뀐 신흥국에서 멈춰 있다.", "The “development → culture” move looks underway (tech, economy, and Hallyu questions rose together), but the “war → next” move is stalled in the emerging markets where the frame never updated."),
  },
];

const ARCH: [L, { fw: string; name: L; core?: boolean }[]][] = [
  [D("듣기", "Listen"), [{ fw: "02", name: D("질문을 듣는 기구", "The listening office") }]],
  [D("재기", "Measure"), [{ fw: "01", name: D("이해 장부", "The Understanding Ledger"), core: true }]],
  [D("만들기", "Make"), [{ fw: "04", name: D("시민이 함께 답하기", "Citizens answering") }, { fw: "03", name: D("시장별 버전", "Per-market editions") }]],
  [D("비용과 시간", "Pay & persist"), [{ fw: "05", name: D("이미지 기금", "The image fund") }, { fw: "06", name: D("틀 옮기기", "Moving the frame") }]],
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
            ? "국가 이미지를 다루는 모든 기관은 세 가지를 당연하게 여긴다: 하나의 이미지를 온 세계에 밀어붙일 수 있다는 것, 관심을 많이 받으면 성공이라는 것, 그리고 이미지는 국가가 만든다는 것. 그런데 1,540개의 질문은 이 세 가지를 한꺼번에 무너뜨린다. 그리고 무너진 자리마다, 다르게 해야 할 이유가 하나씩 드러난다."
            : "Every institution that handles a country's image takes three things for granted: that you can push one image to the whole world, that lots of attention means success, and that the state is the one making the image. The 1,540 questions break all three at once — and where each one breaks, it shows a reason to do things differently."}
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
            ? "그래서 반대로 뒤집은 여섯 가지 방식을 제안합니다: 혼자 독점하기보다 함께, 얼마나 알려졌나보다 얼마나 이해됐나, 일방적으로 알리기보다 먼저 듣기."
            : "So we propose six ways that flip those beliefs: together rather than alone; measured by how well people understand, not how widely they’ve heard; listening first, not broadcasting."}
        </p>
      </DocSection>

      {FRAMEWORKS.map((f, i) => (
        <DocSection key={f.no} tint={i % 2 === 0}>
          <div className="font-mono text-sm font-semibold text-[color:var(--accent)]">{locale === "ko" ? `아이디어 ${f.no}` : `Idea ${f.no}`}</div>
          <div className="mt-3">
            <span className="inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[color:var(--accent)]" style={{ borderColor: "color-mix(in srgb, var(--accent) 34%, transparent)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>{f.cat[locale]}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-[30px]">{f.name[locale]}</h2>
          <p className="mt-4 max-w-[62ch] text-[18px] leading-relaxed text-secondary">{f.defn[locale]}</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
            <Block k={locale === "ko" ? "무엇이 빠져 있나" : "What's missing today"}>{f.larger[locale]}</Block>
            <Block k={locale === "ko" ? "왜 지금 중요한가" : "Why this matters now"}>{f.structural[locale]}</Block>
            <Block k={locale === "ko" ? "그래서 이렇게 하자" : "So here's the idea"}>{f.framework[locale]}</Block>
            <div className="p-5" style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">{locale === "ko" ? "만들어야 할 것" : "What to build"}</div>
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
        <H2>{locale === "ko" ? "여섯 개는 따로가 아니라 하나로 맞물린다" : "The six aren't separate — they lock into one system"}</H2>
        <Lead>{locale === "ko" ? "골라 쓰는 메뉴가 아니다. 여섯 개가 맞물려, ‘일방적으로 방송하던 국가’를 대신하는 하나의 시스템이 된다 — 먼저 듣고, 이해를 재고, 시장마다 다르게 답하고, 시민이 함께 만들고, 스스로 비용을 대고, 시대의 틀을 아는 국가." : "Not a menu to pick from. The six lock together into one system that replaces the broadcast state — a Korea that listens first, measures understanding, answers each market differently, builds its image with its citizens, pays its own way, and knows which era's frame it's in."}</Lead>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          {ARCH.map(([layer, nodes], i) => (
            <React.Fragment key={layer.en}>
              <div className="grid grid-cols-[84px_1fr] items-center gap-4 sm:grid-cols-[104px_1fr]">
                <div className="text-right font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{layer[locale]}</div>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((n) => (
                    <div key={n.fw} className={"rounded-lg border px-3 py-2 text-[13.5px] font-semibold text-navy"} style={n.core ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" } : { borderColor: "var(--border)", background: "var(--tint, #f6f8fb)" }}>
                      <span className="mb-0.5 block font-mono text-[11px] font-semibold text-[color:var(--accent)]">{locale === "ko" ? `아이디어 ${n.fw}` : `Idea ${n.fw}`}</span>
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
            ? "질문은 처음부터 ‘한국이 무엇을 말할 것인가’가 아니었다. ‘세계가 아직 이해하지 못한 것을 이제 잴 수 있게 됐는데, 그렇다면 한국은 어떤 나라가 될 것인가’였다."
            : "The question was never “what should Korea say.” It is “now that we can finally measure what the world doesn't yet understand, what should Korea become?”"}
        </div>
      </DocSection>
    </>
  );
}
