import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-site-sable-alpha.vercel.app"
).replace(/\/+$/, "");

const escHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const BLOCKS: { tag: string; text: string }[] = [
  { tag: "h1", text: "방법론" },
  { tag: "h2", text: "이 연구의 질문" },
  { tag: "p", text: "사람들은 한국을 어떻게 이해하는가? 이 연구는 그 이해의 구조를 데이터로 관찰한다." },
  { tag: "h2", text: "연구 대상" },
  { tag: "p", text: "Google Autocomplete에서 수집한 1,540개의 질문. 7개 언어, 8개 국가." },
  { tag: "h2", text: "왜 Autocomplete인가" },
  { tag: "p", text: "Autocomplete는 사용자가 검색창에 질문을 입력하는 순간의 데이터를 보존한다. 여론조사나 뉴스와 달리, 인식이 형성되기 이전의 질문 구조를 직접 관찰할 수 있다." },
  { tag: "h2", text: "수집 방법" },
  { tag: "li", text: "Google Autocomplete API를 통해 \"Korea\", \"Korean\", \"South Korea\" + 의문사(Why, How, What, Is, Do, Can) 조합으로 질문 수집" },
  { tag: "li", text: "7개 언어(영어, 한국어, 일본어, 독일어, 인도네시아어, 포르투갈어, 아랍어)로 동일 쿼리 반복" },
  { tag: "li", text: "8개 국가(미국, 일본, 독일, 인도, 인도네시아, 브라질, UAE, 한국) 지역 설정 적용" },
  { tag: "li", text: "중복 제거 후 1,540개 고유 질문 확정" },
  { tag: "h2", text: "분석 프레임워크: 5층위 모델" },
  { tag: "p", text: "수집된 질문은 5단계 분석 구조를 통해 해석된다:" },
  { tag: "li", text: "질문(Question) — 세계가 던지는 원초적 궁금증" },
  { tag: "li", text: "개념(Concept) — 질문이 가리키는 구체적 대상 (K-pop, 김치, 병역)" },
  { tag: "li", text: "주제(Theme) — 개념들이 모여 형성하는 관심 영역 (한류, 언어, 관광)" },
  { tag: "li", text: "서사(Narrative) — 주제가 반복되며 만들어지는 이야기 구조 ('문화 강국', '기술 선진국')" },
  { tag: "li", text: "인식(Perception) — 서사가 축적되어 형성되는 국가 이미지" },
  { tag: "h2", text: "온톨로지 구조화" },
  { tag: "p", text: "1,540개 질문은 수작업으로 개념 태그를 부여받고, 주제로 그룹화되며, 경로(Pathway) 형태로 연결된다. 이 구조는 사이트의 인터랙티브 지식 그래프(Explore)에서 시각화된다." },
  { tag: "h2", text: "국가 선정 기준" },
  { tag: "li", text: "대륙별 대표성 (북미, 동아시아, 유럽, 남아시아, 동남아, 남미, 중동)" },
  { tag: "li", text: "한국과의 문화적 거리 다양성 (인접국 일본 vs 원거리 브라질)" },
  { tag: "li", text: "검색 시장 규모 및 Google 점유율" },
  { tag: "li", text: "자기 인식 비교를 위한 한국 포함" },
  { tag: "h2", text: "한계" },
  { tag: "li", text: "Autocomplete는 검색량 자체를 보여주지 않는다" },
  { tag: "li", text: "플랫폼 알고리즘 변화에 영향받을 수 있다" },
  { tag: "li", text: "검색하지 않는 인구의 궁금증은 포착하지 못한다" },
  { tag: "h2", text: "보완" },
  { tag: "p", text: "People Also Ask 데이터로 질문 확장 구조를 보완하고, 온톨로지 구조화와 경로 분석을 통해 단일 데이터 소스의 한계를 극복한다." },
  { tag: "h2", text: "이 연구가 하지 않는 것" },
  { tag: "li", text: "한국에 대한 긍정·부정 평가를 하지 않는다" },
  { tag: "li", text: "정책 제언을 하지 않는다" },
  { tag: "li", text: "국가 브랜딩 전략을 제시하지 않는다" },
  { tag: "p", text: "이 연구는 세계가 한국을 이해하는 과정의 구조를 관찰하고 기록한다." },
];

function buildMethodRaw(): string {
  const out: string[] = [];
  out.push("<!doctype html>");
  out.push('<html lang="ko">');
  out.push("<head>");
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  out.push(
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
  );
  out.push(
    `<title>방법론 — Ask About Korea (AI 읽기 전용 · raw)</title>`,
  );
  out.push(
    `<meta name="description" content="Ask About Korea 연구 방법론 전문. Google Autocomplete 1,540개 질문 수집·분석 방법, 5층위 모델, 국가 선정 기준, 한계와 보완.">`,
  );
  out.push(`<link rel="canonical" href="${SITE_URL}/method">`);
  out.push("</head>");
  out.push("<body>");

  let liBuf: string[] = [];
  const flushLi = () => {
    if (!liBuf.length) return;
    out.push("<ul>");
    for (const t of liBuf) out.push(`<li>${escHtml(t)}</li>`);
    out.push("</ul>");
    liBuf = [];
  };

  for (const b of BLOCKS) {
    if (b.tag === "li") {
      liBuf.push(b.text);
      continue;
    }
    flushLi();
    const tag = ["h1", "h2", "h3", "h4", "p"].includes(b.tag) ? b.tag : "p";
    out.push(`<${tag}>${escHtml(b.text)}</${tag}>`);
  }
  flushLi();

  out.push("<hr>");
  out.push(
    `<p><a href="/method">전체 인터랙티브 버전 · Full interactive version</a></p>`,
  );
  out.push("</body>");
  out.push("</html>");
  return out.join("\n");
}

export function GET() {
  return new Response(buildMethodRaw(), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "index, follow",
    },
  });
}
