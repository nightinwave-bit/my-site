// Ask About Korea — collection configuration (Stage 100)
// Launch locales. `gl` = Google country code, `hl` = interface language.
// The country signal is the question surface served to each locale — not
// per-person geodata (see docs/MVP-COLLECTION-SYSTEM.md §2).

export const LOCALES = [
  { region: "US", gl: "us", hl: "en", language: "en" },
  { region: "UK", gl: "gb", hl: "en", language: "en" },
  { region: "CA", gl: "ca", hl: "en", language: "en" },
  { region: "AU", gl: "au", hl: "en", language: "en" },
  { region: "IN", gl: "in", hl: "en", language: "en" },
  { region: "SG", gl: "sg", hl: "en", language: "en" },
  { region: "KR", gl: "kr", hl: "ko", language: "ko" },
];

export const SETTINGS = {
  // Politeness for the unofficial autocomplete endpoint (live mode only).
  autocompletePoliteDelayMs: 400,
  paaPoliteDelayMs: 600,
  // Stage 100: no PAA recursion (kept simple; recursion is a later stage).
  paaRecursion: 0,
  // Near-duplicate merge threshold (content-token Jaccard). Higher = stricter.
  nearDupJaccard: 0.8,
  requestTimeoutMs: 10000,
  // Stage 100 is a validation run, not a scale run.
  targetCanonical: 100,
  version: "stage-100/0.1.0",
};

// Seeds are question stems and topic anchors — never predefined categories.
// English seeds run in the six English locales; Korean seeds run in KR.
// (Only seeds with fixtures produce output in offline mode.)
export const SEEDS_EN = [
  { text: "why is korea", family: "question_word" },
  { text: "why do koreans", family: "question_word" },
  { text: "is korea safe", family: "question_word" },
  { text: "is korean hard", family: "question_word" },
  { text: "why is korea so", family: "attribute" },
  { text: "koreans are", family: "attribute" },
  { text: "korean food", family: "topic" },
  { text: "korean culture", family: "topic" },
  { text: "korean language", family: "topic" },
  { text: "k-pop", family: "topic" },
  { text: "korea vs", family: "comparative" },
];

export const SEEDS_KO = [
  { text: "한국은 왜", family: "question_word" },
  { text: "한국인은 왜", family: "question_word" },
  { text: "케이팝은 왜", family: "topic" },
];

// PAA seeds (full queries whose related_questions we read).
export const PAA_SEEDS_EN = [
  { text: "why is korea divided", family: "question_word" },
  { text: "is korea safe", family: "question_word" },
  { text: "why is kpop popular", family: "topic" },
  { text: "is korean hard to learn", family: "question_word" },
  { text: "what is kimchi", family: "topic" },
  { text: "korean food", family: "topic" },
  { text: "why is korea's birth rate so low", family: "question_word" },
  { text: "korean culture", family: "topic" },
];

export const PAA_SEEDS_KO = [
  { text: "한국은 왜 분단되었나", family: "question_word" },
  { text: "케이팝 인기 이유", family: "topic" },
];

export function seedsForLocale(locale, kind = "autocomplete") {
  if (kind === "paa") {
    return locale.language === "ko" ? PAA_SEEDS_KO : PAA_SEEDS_EN;
  }
  return locale.language === "ko" ? SEEDS_KO : SEEDS_EN;
}
