// Generate lib/research-raw-content.json — the pure-text source for the
// AI-readable /research/<slug>/raw documents.
//
// Source of truth: the actual server-rendered HTML of each research page, so
// the raw documents can never drift from what the site renders. Regenerate by
// pointing SRC at either the built HTML files or a running `next start`.
//
//   node scripts/gen-raw-content.mjs            # from saved HTML files
//   BASE=http://127.0.0.1:4994 node scripts/gen-raw-content.mjs   # from server
import { readFileSync, writeFileSync } from "node:fs";

const SLUGS = ["data-report", "understanding-model"];
const BASE = process.env.BASE || "";
const SAVED = "/tmp/claude-0/-home-user-my-site/b4f07048-5245-525c-b1d1-b49f315b32fc/scratchpad";

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

async function getHtml(slug) {
  if (BASE) return await (await fetch(`${BASE}/research/${slug}`)).text();
  return readFileSync(`${SAVED}/r-${slug}.html`, "utf8");
}

function extract(html) {
  // Work inside <main> … </main>, dropping scripts/styles/svgs.
  let main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [, html])[1];
  main = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "");

  const blocks = [];
  const re = /<(h1|h2|h3|h4|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(main))) {
    const tag = m[1].toLowerCase();
    const text = decode(m[2]);
    if (!text) continue;
    // Skip pure separators and the tiny "·" / arrow glyphs.
    if (/^[·↓→\-\s]+$/.test(text)) continue;
    const prev = blocks[blocks.length - 1];
    if (prev && prev.tag === tag && prev.text === text) continue; // dedupe adjacent
    blocks.push({ tag, text });
  }
  return blocks;
}

const out = {};
for (const slug of SLUGS) {
  const html = await getHtml(slug);
  const blocks = extract(html);
  const title = (blocks.find((b) => b.tag === "h1") || { text: slug }).text;
  out[slug] = { title, blocks };
  console.log(`${slug}: title="${title}" · ${blocks.length} blocks`);
}

writeFileSync(
  new URL("../lib/research-raw-content.json", import.meta.url),
  JSON.stringify(out, null, 2) + "\n",
);
console.log("wrote lib/research-raw-content.json");
