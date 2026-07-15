// Spam / off-topic / non-Korea filtering. Items are QUARANTINED (kept with a
// reason), never deleted, so decisions stay auditable.

import { normalizeText, detectLanguage } from "./normalize.mjs";

const COMMERCIAL = [
  "buy", "cheap", "discount", "coupon", "promo", "for sale", "price of",
  "download", "torrent", "free shipping", "best deal", "order now",
];

const KOREA_TOKENS = [
  "korea", "korean", "koreans", "seoul", "hangul", "kimchi", "kpop", "k pop",
  "kdrama", "k drama",
  // Korean-script tokens, incl. North / inter-Korea and common topics
  "한국", "케이팝", "서울", "한국어", "북한", "남북", "한반도", "아이돌", "김치",
];

/** Returns { ok: true } or { ok: false, reason }. */
export function classify(text) {
  const norm = normalizeText(text);
  if (norm.length < 3) return { ok: false, reason: "too_short" };

  const lang = detectLanguage(text);
  // gibberish: latin text with no vowels and no Hangul
  if (lang === "en" && !/[aeiou]/.test(norm)) {
    return { ok: false, reason: "gibberish" };
  }

  for (const term of COMMERCIAL) {
    if (norm.includes(term)) return { ok: false, reason: "commercial" };
  }

  const hasKorea = KOREA_TOKENS.some((t) => norm.includes(t));
  if (!hasKorea) return { ok: false, reason: "off_topic" };

  return { ok: true };
}
