// Generate public/ai.html — a single, static, JS-free HTML document that
// contains the full text of the home page, every topic page, and all four
// research documents, so AI (ChatGPT/Claude/Perplexity/Common Crawl) can read
// the entire site from one URL: /ai.html
//
// Content is scraped from the site's own server-rendered HTML so it can never
// drift. Run against a local `next start`:
//   BASE=http://127.0.0.1:4996 node scripts/gen-ai-html.mjs
import { writeFileSync } from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:4996";

// section title → path
const SECTIONS = [
  ["홈페이지", "/"],
  ["한류", "/topics/hallyu"],
  ["언어", "/topics/language"],
  ["관광", "/topics/tourism"],
  ["역사·전통", "/topics/history"],
  ["외교", "/topics/diplomacy"],
  ["사회", "/topics/society"],
  ["경제", "/topics/economy"],
  ["기술", "/topics/technology"],
  ["데이터 리포트", "/research/data-report"],
  ["공공외교 브리프", "/research/diplomacy-brief"],
  ["한국 이해 모델", "/research/understanding-model"],
  ["질문 관측소", "/research/question-observatory"],
];

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;|&#39;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&middot;/g, "·")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/\s+/g, " ")
    .trim();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function blocksFrom(html) {
  let main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [, html])[1];
  main = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "");
  const out = [];
  const re = /<(h1|h2|h3|h4|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(main))) {
    const tag = m[1].toLowerCase();
    const text = decode(m[2]);
    if (!text) continue;
    if (/^[·↓→\-–—\s]+$/.test(text)) continue;
    const prev = out[out.length - 1];
    if (prev && prev.text === text) continue;
    out.push({ tag, text });
  }
  return out;
}

// Demote a page's own headings so the document outline stays h1(site) → h2(section) → h3/h4.
const demote = { h1: "h3", h2: "h3", h3: "h4", h4: "h4", p: "p", li: "li" };

const parts = [];
parts.push("<!doctype html>");
parts.push('<html lang="ko">');
parts.push("<head>");
parts.push('<meta charset="utf-8">');
parts.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
parts.push('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">');
parts.push("<title>Ask About Korea — 전체 텍스트 (AI 읽기 전용 · ai.html)</title>");
parts.push(
  '<meta name="description" content="세계가 한국을 어떻게 이해하는지에 대한 온톨로지 리서치 플랫폼의 전체 텍스트 — 홈, 여덟 개 주제, 네 편의 리서치 문서를 하나의 정적 HTML로.">',
);
parts.push('<link rel="canonical" href="https://velvety-hotteok-370c8c.netlify.app/ai.html">');
parts.push("</head>");
parts.push("<body>");
parts.push("<h1>Ask About Korea</h1>");
parts.push(
  "<p>세계가 한국을 어떻게 이해하는지를 탐험하는 온톨로지 기반 리서치 플랫폼의 전체 텍스트입니다. 이 문서는 JavaScript 없이 순수 HTML로만 작성되어, AI와 크롤러가 전문을 그대로 읽을 수 있습니다.</p>",
);

let liOpen = false;
const flushLi = () => {
  if (liOpen) {
    parts.push("</ul>");
    liOpen = false;
  }
};

for (const [title, path] of SECTIONS) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  const blocks = blocksFrom(html);
  flushLi();
  parts.push(`<h2>${esc(title)}</h2>`);
  for (const b of blocks) {
    if (b.tag === "li") {
      if (!liOpen) {
        parts.push("<ul>");
        liOpen = true;
      }
      parts.push(`<li>${esc(b.text)}</li>`);
      continue;
    }
    flushLi();
    const tag = demote[b.tag] || "p";
    parts.push(`<${tag}>${esc(b.text)}</${tag}>`);
  }
  console.log(`${title.padEnd(14)} ${path.padEnd(28)} ${blocks.length} blocks`);
}
flushLi();
parts.push("</body>");
parts.push("</html>");

writeFileSync(new URL("../public/ai.html", import.meta.url), parts.join("\n") + "\n");
console.log("\nwrote public/ai.html");
