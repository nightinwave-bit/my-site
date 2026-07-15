// Ask About Korea — collection configuration (Stage 500)
// Launch locales. `gl` = Google country code, `hl` = interface language.
// The country signal is the question surface served to each locale — not
// per-person geodata (see docs/MVP-COLLECTION-SYSTEM.md §2).

export const LOCALES = [
  { region: "US", gl: "us", hl: "en", language: "en" },
  { region: "UK", gl: "gb", hl: "en", language: "en" },
  { region: "IN", gl: "in", hl: "en", language: "en" },
  { region: "SG", gl: "sg", hl: "en", language: "en" },
  { region: "JP", gl: "jp", hl: "ja", language: "ja" },
  { region: "BR", gl: "br", hl: "pt", language: "pt" },
  { region: "AE", gl: "ae", hl: "ar", language: "ar" },
  { region: "KR", gl: "kr", hl: "ko", language: "ko" },
];

export const SETTINGS = {
  autocompletePoliteDelayMs: 400,
  paaPoliteDelayMs: 700,
  paaRecursion: 0, // Stage 500: still no recursion (kept simple)
  nearDupJaccard: 0.8,
  requestTimeoutMs: 10000,
  targetCanonical: 750,
  version: "stage-500/0.2.0",
};

// ── Seeds ──────────────────────────────────────────────────────────────────
// Seeds are question stems and topic anchors — never predefined categories.
// Families: q=question-word · t=topic · c=comparative · a=attribute · p=practical
const s = (text, family) => ({ text, family });

const SEEDS_EN = [
  // question-word stems
  s("why is korea", "q"), s("why do koreans", "q"), s("why are koreans", "q"),
  s("what is korea", "q"), s("how do koreans", "q"), s("how is korea", "q"),
  s("is korea", "q"), s("is korean", "q"), s("are koreans", "q"),
  s("do koreans", "q"), s("does korea", "q"),
  // question + topic
  s("is korea safe", "q"), s("is korea expensive", "q"), s("is korean hard", "q"),
  s("why is korean food", "q"), s("why is kpop", "q"), s("how to learn korean", "p"),
  s("is korea worth visiting", "p"), s("do you need a visa for korea", "p"),
  // topic anchors
  s("korean food", "t"), s("korean culture", "t"), s("korean language", "t"),
  s("korean history", "t"), s("korean drama", "t"), s("k-pop", "t"),
  s("korean skincare", "t"), s("korean beauty", "t"), s("korean fashion", "t"),
  s("korean etiquette", "t"), s("korean age", "t"), s("korean war", "t"),
  s("north korea", "t"), s("south korea", "t"), s("seoul", "t"),
  s("korean education", "t"), s("korean technology", "t"), s("korean economy", "t"),
  s("samsung", "t"), s("hanbok", "t"), s("kimchi", "t"), s("korean wave", "t"),
  s("korean names", "t"), s("korean weddings", "t"),
  // comparative + attribute
  s("korea vs japan", "c"), s("korea vs china", "c"),
  s("north korea vs south korea", "c"), s("korean vs japanese", "c"),
  s("koreans are", "a"), s("korea is so", "a"), s("why is korea so", "a"),
  s("korean people are", "a"),
];

const SEEDS_KO = [
  s("한국은 왜", "q"), s("한국인은 왜", "q"), s("한국은 어떻게", "q"),
  s("외국인이 보는 한국", "q"), s("한국인은", "a"),
  s("한국 문화", "t"), s("한국 음식", "t"), s("한국어", "t"), s("케이팝", "t"),
  s("한국 역사", "t"), s("한국 드라마", "t"), s("북한", "t"), s("서울", "t"),
  s("한국 교육", "t"), s("한국 경제", "t"), s("삼성", "t"), s("김치", "t"),
  s("한복", "t"), s("한류", "t"), s("한국 나이", "t"), s("한국 예절", "t"),
  s("한국 결혼", "t"), s("한국 여행", "p"), s("한국 vs 일본", "c"),
];

const SEEDS_JA = [
  s("韓国 なぜ", "q"), s("韓国は なぜ", "q"), s("韓国人は なぜ", "q"),
  s("なぜ韓国", "q"), s("韓国 文化", "t"), s("韓国 料理", "t"), s("韓国語", "t"),
  s("韓国 ドラマ", "t"), s("ケーポップ", "t"), s("韓国 歴史", "t"),
  s("北朝鮮", "t"), s("ソウル", "t"), s("韓国 教育", "t"), s("韓国 経済", "t"),
  s("サムスン", "t"), s("キムチ", "t"), s("韓服", "t"), s("韓流", "t"),
  s("韓国 治安", "p"), s("韓国 旅行", "p"), s("韓国 vs 日本", "c"),
  s("韓国 マナー", "t"),
];

const SEEDS_PT = [
  s("por que a coreia", "q"), s("por que os coreanos", "q"),
  s("o que é a coreia", "q"), s("como é a coreia", "q"),
  s("cultura coreana", "t"), s("comida coreana", "t"), s("idioma coreano", "t"),
  s("coreano é difícil", "q"), s("por que k-pop faz sucesso", "q"),
  s("história da coreia", "t"), s("dorama coreano", "t"),
  s("coreia do norte", "t"), s("coreia do sul", "t"), s("seul", "t"),
  s("é seguro viajar para a coreia", "p"), s("coreia vale a pena", "p"),
  s("samsung", "t"), s("kimchi", "t"), s("beleza coreana", "t"),
  s("skincare coreano", "t"), s("coreia vs japão", "c"), s("hallyu", "t"),
];

const SEEDS_AR = [
  s("لماذا كوريا", "q"), s("لماذا الكوريون", "q"), s("ما هي كوريا", "q"),
  s("الثقافة الكورية", "t"), s("الطعام الكوري", "t"), s("اللغة الكورية", "t"),
  s("هل الكورية صعبة", "q"), s("كي بوب", "t"), s("تاريخ كوريا", "t"),
  s("الدراما الكورية", "t"), s("كوريا الشمالية", "t"), s("كوريا الجنوبية", "t"),
  s("سيول", "t"), s("هل كوريا آمنة", "p"), s("لماذا كي بوب مشهور", "q"),
  s("السفر إلى كوريا", "p"), s("سامسونج", "t"), s("كيمتشي", "t"),
  s("كوريا مقابل اليابان", "c"), s("العناية بالبشرة الكورية", "t"),
];

const SEEDS_BY_LANG = {
  en: SEEDS_EN, ko: SEEDS_KO, ja: SEEDS_JA, pt: SEEDS_PT, ar: SEEDS_AR,
};

// ── PAA seeds (full queries whose related_questions we read) ────────────────
const PAA_EN = [
  s("why is korea divided", "q"), s("is korea safe", "q"),
  s("why is kpop popular", "t"), s("is korean hard to learn", "q"),
  s("what is kimchi", "t"), s("korean food", "t"),
  s("why is korea's birth rate so low", "q"), s("korean culture", "t"),
  s("why do koreans bow", "q"), s("is korea expensive", "q"),
  s("what is hanbok", "t"), s("why is north korea so isolated", "q"),
  s("what is korean age", "t"), s("best time to visit korea", "p"),
  s("do you need a visa for south korea", "p"), s("what is hallyu", "t"),
  s("why is samsung so big", "q"), s("what is a korean comeback", "t"),
  s("are koreans polite", "q"), s("what is korean beauty standard", "t"),
];

const PAA_KO = [
  s("한국은 왜 분단되었나", "q"), s("케이팝 인기 이유", "t"),
  s("김치란 무엇인가", "t"), s("한복이란", "t"), s("수능이란", "t"),
  s("한국 나이 계산법", "t"), s("북한은 왜 고립되었나", "q"),
  s("한류란", "t"), s("한국 여행 준비물", "p"), s("한국 문화 특징", "t"),
];

const PAA_JA = [
  s("韓国はなぜ分断", "q"), s("キムチとは", "t"), s("ケーポップ 人気 理由", "t"),
  s("韓国語 難しい", "q"), s("韓国旅行 ビザ", "p"), s("韓服とは", "t"),
  s("北朝鮮 なぜ 孤立", "q"), s("韓国 治安", "p"), s("韓流とは", "t"),
  s("サムスン なぜ 大きい", "q"),
];

const PAA_PT = [
  s("por que a coreia é dividida", "q"), s("o que é kimchi", "t"),
  s("por que o k-pop faz sucesso", "q"), s("coreano é difícil de aprender", "q"),
  s("visto para coreia do sul", "p"), s("o que é hanbok", "t"),
  s("por que a coreia do norte é isolada", "q"),
  s("é seguro viajar para a coreia", "p"), s("o que é hallyu", "t"),
  s("por que samsung é tão grande", "q"),
];

const PAA_AR = [
  s("لماذا كوريا مقسمة", "q"), s("ما هو الكيمتشي", "t"),
  s("لماذا كي بوب مشهور", "q"), s("هل اللغة الكورية صعبة", "q"),
  s("تأشيرة كوريا الجنوبية", "p"), s("ما هو الهانبوك", "t"),
  s("لماذا كوريا الشمالية معزولة", "q"), s("هل السفر إلى كوريا آمن", "p"),
];

const PAA_BY_LANG = {
  en: PAA_EN, ko: PAA_KO, ja: PAA_JA, pt: PAA_PT, ar: PAA_AR,
};

export function seedsForLocale(locale, kind = "autocomplete") {
  const table = kind === "paa" ? PAA_BY_LANG : SEEDS_BY_LANG;
  return table[locale.language] ?? [];
}

// Exposed for the plan/report.
export const SEED_COUNTS = Object.fromEntries(
  Object.entries(SEEDS_BY_LANG).map(([k, v]) => [k, v.length])
);
export const PAA_SEED_COUNTS = Object.fromEntries(
  Object.entries(PAA_BY_LANG).map(([k, v]) => [k, v.length])
);
