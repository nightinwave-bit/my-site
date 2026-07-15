// Spam / off-topic / non-Korea filtering. Items are QUARANTINED (kept with a
// reason), never deleted, so decisions stay auditable.

import { normalizeText, detectLanguage } from "./normalize.mjs";

const COMMERCIAL = [
  "buy", "cheap", "discount", "coupon", "promo", "for sale", "price of",
  "download", "torrent", "free shipping", "best deal", "order now",
];

const KOREA_TOKENS = [
  // English
  "korea", "korean", "koreans", "seoul", "hangul", "kimchi", "kpop", "k pop",
  "kdrama", "k drama", "hanbok", "hallyu", "samsung", "soju",
  // Korean (incl. North / inter-Korea and common topics)
  "한국", "케이팝", "서울", "한국어", "북한", "남북", "한반도", "아이돌", "김치",
  "한복", "한류", "삼성",
  // Japanese
  "韓国", "韓国人", "韓流", "ケーポップ", "キムチ", "ソウル", "北朝鮮", "韓服", "サムスン",
  // Portuguese
  "coreia", "coreano", "coreana", "coreanos", "seul", "seul", "kimchi",
  // Arabic
  "كوريا", "كوري", "كورية", "كوريون", "سيول", "كيمتشي", "بوب", "سامسونج", "هانبوك",
];

/**
 * Returns { ok: true } or { ok: false, reason }.
 * `seedText` is the Korea-centric seed a suggestion came from. Because every
 * query is Korea-seeded, relevance is inherited from the seed context: a
 * follow-up like "Will reunification be realized?" is on-topic even though it
 * names neither Korea nor the North. Off-topic therefore only fires on genuine
 * drift (a suggestion with no Korea token AND a seed with none).
 */
export function classify(text, { seedText = "" } = {}) {
  const norm = normalizeText(text);
  if (norm.length < 3) return { ok: false, reason: "too_short" };

  const lang = detectLanguage(text);
  // gibberish: latin text with no vowels and no non-latin script
  if (lang === "en" && !/[aeiou]/.test(norm)) {
    return { ok: false, reason: "gibberish" };
  }

  for (const term of COMMERCIAL) {
    if (norm.includes(term)) return { ok: false, reason: "commercial" };
  }

  const seedNorm = normalizeText(seedText);
  const hasKorea =
    KOREA_TOKENS.some((t) => norm.includes(t)) ||
    KOREA_TOKENS.some((t) => seedNorm.includes(t));
  if (!hasKorea) return { ok: false, reason: "off_topic" };

  return { ok: true };
}
