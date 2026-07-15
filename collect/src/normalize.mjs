// Text normalization + intent signatures.
// Transparent and dependency-free: production may swap the near-duplicate step
// for embeddings (see docs/QUESTION-COLLECTION-FRAMEWORK.md §3); this Stage 100
// build uses lexical + content-token-set signatures so every merge is auditable.

const STOPWORDS = new Set([
  "the", "a", "an", "of", "to", "in", "on", "for", "and", "or", "so", "that",
  "it", "you", "i", "about", "as", "with", "at", "by", "from", "into", "your",
  "my", "our", "their", "this", "these", "those", "there", "here", "s",
]);

// Question words are removed from the *content* signature (they mark form, not
// topic), which is what lets "why is X …", "is X …", "how X …" converge.
const QUESTION_WORDS = new Set([
  "why", "how", "what", "is", "are", "do", "does", "did", "can", "could",
  "should", "would", "which", "who", "whom", "where", "when", "will", "vs",
  "was", "were", "has", "have", "had", "am",
]);

const HANGUL = /[가-힣]/;
const ARABIC = /[؀-ۿ]/;
const KANA = /[぀-ヿ]/;
const CJK = /[一-鿿]/;
// Korean particles/markers to strip from content tokens (lightweight).
const KO_STOP = new Set(["왜", "은", "는", "이", "가", "을", "를", "의", "에", "나요", "인가", "가요"]);

/** Script-based detection. Portuguese shares the Latin script with English and
 *  is not distinguished here; callers that need the true language use the
 *  locale-assigned language instead (dedup does this). */
export function detectLanguage(text) {
  if (HANGUL.test(text)) return "ko";
  if (ARABIC.test(text)) return "ar";
  if (KANA.test(text) || CJK.test(text)) return "ja";
  return "en";
}

/** Lowercased, unicode-normalized, punctuation-stripped form (keeps Hangul). */
export function normalizeText(text) {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[?!.,;:"'()\[\]{}<>/\\|]+/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(norm, lang) {
  const toks = norm.split(" ").filter(Boolean);
  if (lang === "ko") {
    // Strip trailing Korean particles from each token (very light stemming).
    return toks
      .map((t) => t.replace(/(은|는|이|가|을|를|의|에|나요|인가요|인가|가요)$/u, ""))
      .filter((t) => t && !KO_STOP.has(t));
  }
  return toks;
}

/** Content tokens: topic-bearing words only (no stopwords, no question words). */
export function contentTokens(text, lang = detectLanguage(text)) {
  const norm = normalizeText(text);
  return tokenize(norm, lang).filter(
    (t) => !STOPWORDS.has(t) && !QUESTION_WORDS.has(t) && !KO_STOP.has(t)
  );
}

/** Stable signature used as the primary near-duplicate key. */
export function intentSignature(text, lang = detectLanguage(text)) {
  return Array.from(new Set(contentTokens(text, lang))).sort().join("|");
}

export function isQuestionForm(text) {
  const t = text.trim();
  if (t.endsWith("?")) return true;
  const first = normalizeText(t).split(" ")[0] || "";
  return QUESTION_WORDS.has(first) || /[까요|나요|인가]/.test(t);
}

/** Jaccard similarity over two content-token sets. */
export function jaccard(aTokens, bTokens) {
  const a = new Set(aTokens);
  const b = new Set(bTokens);
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}
