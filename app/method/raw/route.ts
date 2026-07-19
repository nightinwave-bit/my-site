export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-site-sable-alpha.vercel.app"
).replace(/\/+$/, "");

const escHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const BLOCKS: { tag: string; text: string }[] = [
  { tag: "h1", text: "방법론 — 왜 이런 방식으로 연구했는가" },

  { tag: "h2", text: "왜 질문을 연구 대상으로 선택했는가" },
  { tag: "p", text: "국가 인식을 관찰할 수 있는 데이터 후보는 여러 가지다. 뉴스, SNS, 여론조사, 검색 데이터. 이 중에서 우리는 질문을 선택했다." },
  { tag: "p", text: "뉴스는 언론이 선택한 의제를 보여준다. SNS는 이미 형성된 의견을 보여준다. 여론조사는 이미 만들어진 이미지를 측정한다. 질문은 다르다. 질문은 이해가 형성되기 직전의 순간을 포착한다." },
  { tag: "p", text: "질문은 이해의 출력물이 아니라 입력물이다. 질문을 관찰한다는 것은 인식이 만들어지는 과정의 시작점을 관찰한다는 뜻이다." },

  { tag: "h2", text: "왜 Google Autocomplete인가 — 6개 소스 비교" },
  { tag: "li", text: "SNS — 관찰 가능: 형성된 의견 / 한계: 인식이 이미 형성된 이후 데이터 → 제외" },
  { tag: "li", text: "뉴스 — 관찰 가능: 언론이 선택한 의제 / 한계: 대중의 질문이 아닌 언론의 관심 → 제외" },
  { tag: "li", text: "Google Trends — 관찰 가능: 관심 규모 / 한계: 왜 검색했는지 알 수 없음 → 제외" },
  { tag: "li", text: "Reddit — 관찰 가능: 질문 이후의 토론 / 한계: 최초 질문 시점 확인 불가 → 보조 참고" },
  { tag: "li", text: "People Also Ask — 관찰 가능: 질문 확장 구조 / 한계: 질문 출발점 확인 불가 → 보조 참고" },
  { tag: "li", text: "Google Autocomplete — 관찰 가능: 실제 사용자의 질문 / 한계: 검색량 미제공 → 핵심 데이터" },
  { tag: "p", text: "Google Autocomplete는 질문이 생성되는 바로 그 순간을 포착한다. 플랫폼이 편집하거나 커뮤니티가 해석하기 이전의 원래 질문을 보여준다." },

  { tag: "h2", text: "왜 이 8개 국가인가" },
  { tag: "p", text: "목표는 모든 국가를 포괄하는 것이 아니라, 언어권·정보환경·문화적 거리를 교차시킨 구조적 비교를 설계하는 것이었다." },
  { tag: "li", text: "미국(US) — 세계 최대 영어권 검색 시장 → 기준점" },
  { tag: "li", text: "일본(JP) — 한국 인접, 동일 문자권 아닌 동아시아 → 근접 비교" },
  { tag: "li", text: "독일(DE) — 유럽 대표, 라틴 문자권 산업 국가 → 원거리 산업국 비교" },
  { tag: "li", text: "인도(IN) — 영어권이면서 글로벌 사우스 → 영어+발전도상국 교차" },
  { tag: "li", text: "인도네시아(ID) — 동남아 최대, 무슬림 다수 → 문화권+종교+거리 교차" },
  { tag: "li", text: "브라질(BR) — 남미 대표, 포르투갈어 → 언어+대륙+문화 최대 거리" },
  { tag: "li", text: "UAE(AE) — 중동 관문, 아랍어 → 정보환경+언어+지정학 교차" },
  { tag: "li", text: "대한민국(KR) — 자기 인식 비교 기준 → 내부 시선 vs 외부 시선" },

  { tag: "h2", text: "왜 7개 언어인가" },
  { tag: "p", text: "한국에 대한 동일한 궁금증이라도, 사용 언어에 따라 구조적으로 다른 질문이 된다. 질문의 형태를 결정하는 것은 국적이 아니라 언어다." },
  { tag: "li", text: "영어(EN)" },
  { tag: "li", text: "한국어(KO)" },
  { tag: "li", text: "일본어(JA)" },
  { tag: "li", text: "독일어(DE)" },
  { tag: "li", text: "인도네시아어(ID)" },
  { tag: "li", text: "포르투갈어(PT)" },
  { tag: "li", text: "아랍어(AR)" },

  { tag: "h2", text: "데이터 처리 구조" },
  { tag: "p", text: "개별 질문은 너무 세밀하여 패턴을 드러내지 못한다. 질문에서 곧바로 '국가 이미지'로 뛰어넘으면 중간 구조를 놓친다. 다섯 층위를 통해 미시적 호기심이 거시적 인식으로 응집되는 과정을 추적할 수 있다." },
  { tag: "li", text: "질문(Question) → 개념(Concept) → 주제(Theme) → 서사(Narrative) → 인식(Perception)" },

  { tag: "h2", text: "한계" },
  { tag: "li", text: "검색량 미제공 — 어떤 질문이 더 자주 발생하는지 알 수 없다" },
  { tag: "li", text: "알고리즘 영향 — 플랫폼 변화에 따라 결과가 달라질 수 있다" },
  { tag: "li", text: "비검색 인구 — 검색하지 않는 사람들의 궁금증은 포착하지 못한다" },

  { tag: "h2", text: "보완" },
  { tag: "li", text: "People Also Ask — 질문 확장 구조를 보완" },
  { tag: "li", text: "Ontology 구조화 — 질문 간 관계를 체계화" },
  { tag: "li", text: "Pathway 분석 — 질문이 연결되는 경로를 추적" },

  { tag: "p", text: "이 연구는 한국에 대한 답을 제시하지 않는다. 세계가 한국을 이해하기 위해 어떤 질문을 던지는지, 그 질문을 어떻게 관찰할 수 있는지를 설계한 기록이다." },
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
    `<meta name="description" content="Ask About Korea 방법론 전문. 왜 질문인가, 왜 Autocomplete인가, 왜 이 국가들인가, 왜 이 언어들인가, 데이터 처리, 한계와 보완.">`,
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
