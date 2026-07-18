// AI-readable raw research documents.
//
// These power /research/<slug>/raw — pure, dependency-free HTML documents with
// no CSS, no client JS, and no interaction, meant to be ingested verbatim by
// LLMs (ChatGPT, Claude, Gemini, Perplexity), search engines, and crawlers
// (Common Crawl). The body text is generated from the site's own rendered HTML
// (see scripts/gen-raw-content.mjs) so it can never drift from the live pages.

import rawContent from "./research-raw-content.json";
import { getDoc } from "./research";

type Block = { tag: string; text: string };
type DocContent = { title: string; blocks: Block[] };
const CONTENT = rawContent as Record<string, DocContent>;

export const RAW_SLUGS = [
  "data-report",
  "diplomacy-brief",
  "understanding-model",
  "question-observatory",
] as const;
export type RawSlug = (typeof RAW_SLUGS)[number];

// Canonical public origin. The independent dev site is the default; override in
// any environment via NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://velvety-hotteok-370c8c.netlify.app"
).replace(/\/+$/, "");

const escHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Article schema (schema.org) for a research doc, including the full body. */
export function articleJsonLd(slug: RawSlug) {
  const doc = getDoc(slug);
  const content = CONTENT[slug];
  const body = content.blocks.map((b) => b.text).join("\n");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc ? doc.title.ko : content.title,
    alternativeHeadline: doc?.title.en,
    description: doc?.oneLine.ko,
    inLanguage: "ko",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: "Ask About Korea" },
    publisher: { "@type": "Organization", name: "Ask About Korea" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/research/${slug}`,
    },
    articleBody: body,
  };
}

/** A complete, standalone, CSS-free HTML document for a research doc. */
export function buildRawDocument(slug: RawSlug): string {
  const doc = getDoc(slug);
  const content = CONTENT[slug];
  const ld = JSON.stringify(articleJsonLd(slug));

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
    `<title>${escHtml(content.title)} — Ask About Korea (AI 읽기 전용 · raw)</title>`,
  );
  if (doc) out.push(`<meta name="description" content="${escHtml(doc.oneLine.ko)}">`);
  out.push(`<link rel="canonical" href="${SITE_URL}/research/${slug}">`);
  out.push(`<script type="application/ld+json">${ld}</script>`);
  out.push("</head>");
  out.push("<body>");

  out.push(`<h1>${escHtml(content.title)}</h1>`);
  if (doc) {
    out.push(`<p>${escHtml(doc.title.en)}</p>`);
    out.push(`<p>${escHtml(doc.oneLine.ko)}</p>`);
  }

  // Emit blocks in order; group consecutive <li> into a single <ul>.
  let liBuf: string[] = [];
  const flushLi = () => {
    if (!liBuf.length) return;
    out.push("<ul>");
    for (const t of liBuf) out.push(`<li>${escHtml(t)}</li>`);
    out.push("</ul>");
    liBuf = [];
  };
  for (const b of content.blocks) {
    if (b.tag === "h1") continue; // already emitted as the document title
    if (b.tag === "li") {
      liBuf.push(b.text);
      continue;
    }
    flushLi();
    const tag = ["h2", "h3", "h4", "p"].includes(b.tag) ? b.tag : "p";
    out.push(`<${tag}>${escHtml(b.text)}</${tag}>`);
  }
  flushLi();

  out.push("<hr>");
  out.push(
    `<p><a href="/research/${slug}">전체 인터랙티브 버전 · Full interactive version</a></p>`,
  );
  out.push("</body>");
  out.push("</html>");
  return out.join("\n");
}
