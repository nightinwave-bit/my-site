// Production ontology generator — Ask About Korea
// ------------------------------------------------------------------
// Builds a data-driven ontology from the RECOVERED multilingual canonical
// dataset (collect/output/canonical_questions.json). Concepts are discovered
// empirically from observed token frequencies across all 7 languages; the
// theme / narrative / perception layers are the interpretive rollup that turns
// raw curiosity into a "how the world perceives Korea" structure.
//
// Layered model (many-to-many upward):
//   Question -> Concept -> Theme -> Narrative -> Perception
//
// Usage:  node ontology.mjs [path-to-canonical_questions.json]
// Output: output/ontology/ontology_layer.json  (machine-readable layer)
//         console summary (human audit)
//
// This does NOT touch the website. It produces an analysis artifact only.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const INPUT = process.argv[2] || "./output/canonical_questions.json";
const OUT = "./output/ontology/ontology_layer.json";

// ---------------------------------------------------------------------------
// 1. CONCEPTS — emergent, each with multilingual anchors (substring, ordered).
//    Order matters: the first matching concept wins, so more specific /
//    higher-signal concepts are listed before broad ones.
// ---------------------------------------------------------------------------
const CONCEPTS = [
  ["c_division", "North–South Division & Two Koreas", [
    "north kor", "south kor", "nordkorea", "südkorea", " selatan", " utara",
    " norte", " sul", "북한", "남북", "분단", "南北", "北朝鮮", "الشمالية",
    "الجنوبية", " war ", "korean war", "전쟁", "reunif", "통일", "分断",
    "division", "divided", "geteilt", "dividida", "terpisah", "terpecah",
    "korea is south", "korea is north", "korea republic is", "militer",
    "military service", "conscription", "징병", "兵役", "dmz", "why is korea divided",
  ]],
  ["c_language", "Korean Language & Its Difficulty", [
    "learn korean", "korean language", "korean so hard", "korean hard",
    "korean harder", "is korean hard", "how is korean written", "koreanische sprache",
    "koreanisch lern", "koreanisch schwer", "bahasa korea", "belajar korea",
    "한국어", "韓国語", "idioma corean", "aprender core", "difícil de aprender",
    "اللغة الكورية", "بالانجليزي", "difícil", "koreanisch", "schwer", "صعب",
    " learn", "hangul", "한글", "in korean",
  ]],
  ["c_food", "Korean Cuisine", [
    "korean food", "koreanisches essen", "makanan korea", "음식", "料理",
    "comida corean", "الطعام", "kimchi", "كيمتشي", "キムチ", "김치", "레시피",
    "recipe", "soju", "소주", "tteok", "떡", "ramyeon", "ramen", "bbq", "barbecue",
    "fried chicken", "bulgogi", "bibimbap", "비빔밥", "noodle", "매운", "spicy",
    "辛い", "술",
  ]],
  ["c_drama", "K-Drama & Screen Stories", [
    "drama", "dorama", "ドラマ", "드라마", "الدراما", "demon hunter", "데몬",
    "헌터", "あらすじ", "netflix", "series", "映画", "movie", "squid game",
    "오징어", "webtoon", "웹툰",
  ]],
  ["c_kpop", "K-Pop & Idols", [
    "kpop", "k-pop", "k pop", "케이팝", "كيبوب", "كي بوب", "aidol", "아이돌",
    "idol", "bts", "blackpink", "ケーポップ", "걸그룹", "boy group", "girl group",
  ]],
  ["c_beauty", "K-Beauty, Skincare & Fashion", [
    "skincare", "skin care", "beleza", "kecantikan", "beauty", "العناية بالبشرة",
    "بشرة", "뷰티", "화장품", "cantik", "cosmetic", "glass skin", "fashion",
    "mode korea", "패션", "plastic surgery", "성형", "makeup",
  ]],
  ["c_travel", "Travel & Safety", [
    "travel", "reise", "viajar", "여행", "旅行", "السفر", " visit", "aman",
    "sicher", " safe", "치안", "治安", "امنه", "امن", "visa", "touris", "korean air",
    "airline", "secur", "daylight saving", "timezone", "time zone", "trip",
  ]],
  ["c_etiquette", "Etiquette & Social Norms", [
    "etiquette", "manner", "예절", "マナー", "respect", "bow", "honorif",
    "존댓말", "culture shock", "tipp", "do's and don", "dos and don", "taboo", "금기",
  ]],
  ["c_culture", "Culture, Tradition & Heritage", [
    "culture", "kultur", "budaya", "문화", "文化", "cultura", "الثقافة", "hanbok",
    "한복", "韓服", "문화유산", "heritage", "tradition", "hallyu", "한류", "韓流",
    "korean wave", "chuseok", "seollal", "명절", "temple", "palace", "궁",
  ]],
  ["c_history", "History", [
    "history", "geschichte", "sejarah", "역사", "歴史", "história", "تاريخ",
    "dynasty", "joseon", "조선", "colonial", "일제", "임진", "how did korea",
    "wie ist korea entstanden", "why is korea called korea",
  ]],
  ["c_economy", "Economy, Money & Cost", [
    "economy", "경제", "経済", "wirtschaft", "expensive", "teuer", "mahal",
    "vale a pena", "worth", "gdp", "salary", "비싸", "cost of living", "won so weak",
    "won drop", "korean won", " money", "currency", "عملة", "developed country",
    "developed nation", "선진국", "first world", "chaebol", "재벌",
  ]],
  ["c_tech", "Technology & Brands", [
    "samsung", "삼성", "サムスン", "سامسونج", "technology", "teknologi", "hyundai",
    "현대", " lg ", "semiconductor", "반도체", "robot", "internet speed", " kia ",
    "naver", "kakao", "5g",
  ]],
  ["c_people", "Korean People & National Character", [
    "koreans", "koreaner", "orang korea", "한국인", "韓国人", "특징",
    "characteristic", "korean names", " names", "이름", " age ", "나이", "marriage",
    "결혼", "男性", "women", "men ", "외국인이 보는", "friendly", "nice", "tall",
    "beautiful", "dating", "연애", "barba", "beard",
  ]],
  ["c_compare", "Regional Comparison (Japan / China)", [
    "japan", "japanese", "jepang", "日本", "일본", "japão", " china", "중국",
    "中国", " vs ", "との違い", "versus", "compared", "vergleich", "asean",
    "southeast asia", "south asia", "vietnam", "베트남",
  ]],
  ["c_place", "Seoul, Places & Climate", [
    "seoul", "서울", "ソウル", "seul", "سيول", "busan", "부산", "jeju", "제주",
    "gangnam", "강남", "mountainous", "humid", "weather", "climate", "날씨",
    "foggy", "earthquake", "지진", " hot ", "so hot", "so cold",
  ]],
  ["c_education", "Education & Study", [
    "education", "교육", "教育", "pendidikan", "university", "universität",
    "exam", "수능", "hagwon", "학원", " study ", "school", "대학", "college",
  ]],
  ["c_society", "Society, Religion & Daily Life", [
    "religion", "christian", "기독교", "종교", "宗教", "buddhis", "불교", "church",
    "muslim", "islam", "wedding", "weddings", "dual citizenship", "citizenship",
    "chopstick", "젓가락", "箸", "toilet", "apple pay", "uber", "amazon", "so clean",
    "why is korea so", "한국은 왜", "韓国 なぜ", "warum ist korea", "kenapa korea",
    "por que a coreia", "لماذا",
  ]],
  // NOTE: two further facets are present but too small (~10 q each) and too
  // cross-cutting to be top-level concepts in this corpus:
  //   · Learning materials / access (pdf, مترجمة, 번역, subtitle) — folds into
  //     Language / Culture where each question already lands.
  //   · Sports / football rivalry (copa, korea vs japan football) — folds into
  //     Regional Comparison / Division.
  // They are tracked as candidate concepts for promotion as the corpus grows.
  ["c_basics", "Country Basics & Identity", [
    "what is korea", "o que é a coreia", "ما هي كوريا", "known for", "famous for",
    "corea es", "was ist korea", "apa itu korea", "capital of korea", "population",
    "면적", "인구", "how is korea", "what is korea known",
  ]],
  ["c_unclustered", "Unclustered", []],
];

function classify(text) {
  const t = (text || "").toLowerCase();
  for (const [id, , anchors] of CONCEPTS) {
    for (const a of anchors) if (t.includes(a)) return id;
  }
  return "c_unclustered";
}

// ---------------------------------------------------------------------------
// 2. THEMES — group concepts (many-to-many).
// ---------------------------------------------------------------------------
const THEMES = [
  ["t_hallyu", "The Korean Wave (Hallyu)",
    ["c_kpop", "c_drama", "c_beauty", "c_food", "c_culture"]],
  ["t_language", "Learning & Understanding Korea",
    ["c_language", "c_education"]],
  ["t_geopolitics", "Division, History & Geopolitics",
    ["c_division", "c_history", "c_compare"]],
  ["t_society", "People, Society & Everyday Life",
    ["c_people", "c_etiquette", "c_society", "c_basics"]],
  ["t_visiting", "Visiting & Living in Korea",
    ["c_travel", "c_place", "c_economy"]],
  ["t_power", "Economy, Technology & Global Standing",
    ["c_tech", "c_economy", "c_compare"]],
];

// ---------------------------------------------------------------------------
// 3. NARRATIVES — interpretive stories the questions collectively tell.
// ---------------------------------------------------------------------------
const NARRATIVES = [
  ["n_softpower", "Korea as a global cultural force",
    ["t_hallyu", "t_power"]],
  ["n_aspiration", "Korea as an aspirational lifestyle & beauty model",
    ["t_hallyu", "t_visiting", "t_society"]],
  ["n_division", "Korea as a divided nation living with risk",
    ["t_geopolitics"]],
  ["n_model", "Korea as a development & technology success story",
    ["t_power", "t_language", "t_geopolitics"]],
  ["n_enigma", "Korea as distinctive and intriguing",
    ["t_language", "t_society", "t_visiting"]],
];

// ---------------------------------------------------------------------------
// 4. PERCEPTIONS — distilled top-level positions.
// ---------------------------------------------------------------------------
const PERCEPTIONS = [
  ["p_cultural", "Korea as a cultural powerhouse", ["n_softpower"]],
  ["p_aspirational", "Korea as an aspirational, modern lifestyle", ["n_aspiration"]],
  ["p_divided", "Korea as a nation defined by division & security", ["n_division"]],
  ["p_advanced", "Korea as a technologically advanced, developed nation", ["n_model"]],
  ["p_enigmatic", "Korea as fascinating and hard to fully grasp", ["n_enigma"]],
];

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
const raw = JSON.parse(readFileSync(INPUT, "utf8"));
const A = raw.questions || raw;
const TOTAL = A.length;

const conceptStats = new Map();
for (const [id, label] of CONCEPTS.map((c) => [c[0], c[1]])) {
  conceptStats.set(id, {
    id, label, count: 0, salience: 0,
    countries: {}, languages: {}, questions: [],
  });
}
for (const q of A) {
  const c = classify(q.canonicalText);
  const s = conceptStats.get(c);
  s.count++;
  s.salience += q.frequencyIndicator || 0;
  for (const co of q.countries || []) s.countries[co] = (s.countries[co] || 0) + 1;
  s.languages[q.language] = (s.languages[q.language] || 0) + 1;
  s.questions.push({
    id: q.id, text: q.canonicalText, language: q.language,
    countries: q.countries, salience: q.frequencyIndicator,
    coverage: q.coverage,
  });
}

// Market-specificity is computed on the 7 INDEPENDENT language-markets, not on
// raw country counts. US and IN share one English seed set, so every English
// canonical appears in both — their country tallies are structurally identical
// and must not be double-counted as evidence. The language of a canonical maps
// 1:1 to the seed-market that surfaced it:
//   en → US+IN · de → DE · id → ID · ja → JP · pt → BR · ar → AE · ko → KR
const LANG_MARKET = {
  en: "US+IN", de: "DE", id: "ID", ja: "JP", pt: "BR", ar: "AE", ko: "KR",
};
const N_MARKETS = 7;

function marketSpecificity(languages) {
  const entries = Object.entries(languages)
    .map(([lang, n]) => [LANG_MARKET[lang] || lang, n])
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((n, [, v]) => n + v, 0) || 1;
  const distinct = entries.length;
  const topShare = entries.length ? entries[0][1] / total : 0;
  return {
    distinctMarkets: distinct,
    totalMarkets: N_MARKETS,
    topMarket: entries[0]?.[0] || null,
    topShare: Math.round(topShare * 100) / 100,
    // cross-market: present in >=5 of 7 markets with no single market dominant.
    // market-specific: concentrated in <=2 markets, or one market holds >55%.
    classification:
      distinct >= 5 && topShare < 0.45 ? "cross-market"
        : distinct <= 2 || topShare > 0.55 ? "market-specific"
          : "mixed",
    distribution: Object.fromEntries(entries),
  };
}

const concepts = [];
for (const [id] of CONCEPTS.map((c) => [c[0]])) {
  const s = conceptStats.get(id);
  if (id === "c_unclustered") continue;
  const spec = marketSpecificity(s.languages);
  const top = s.questions
    .slice()
    .sort((a, b) => (b.salience || 0) - (a.salience || 0))
    .slice(0, 6);
  concepts.push({
    id, label: s.label,
    count: s.count,
    sharePct: Math.round((s.count / TOTAL) * 1000) / 10,
    salience: Math.round(s.salience * 100) / 100,
    languages: s.languages,
    market: spec,
    countryTally: s.countries, // raw, uncorrected — shown with US+IN caveat
    exemplars: top.map((q) => ({ text: q.text, language: q.language, countries: q.countries })),
  });
}
concepts.sort((a, b) => b.count - a.count);

const unclustered = conceptStats.get("c_unclustered");
const unclusteredPct = Math.round((unclustered.count / TOTAL) * 1000) / 10;

const conceptToTheme = [];
for (const [tid, , cids] of THEMES) for (const cid of cids) conceptToTheme.push([cid, tid]);

const layer = {
  meta: {
    generatedFrom: resolve(INPUT),
    sourceMeta: raw.meta || null,
    totalQuestions: TOTAL,
    unclusteredCount: unclustered.count,
    unclusteredPct,
    conceptCount: concepts.length,
    themeCount: THEMES.length,
    narrativeCount: NARRATIVES.length,
    perceptionCount: PERCEPTIONS.length,
    note: "Data-driven ontology. Concepts are empirical (token-frequency clusters); theme/narrative/perception layers are interpretive rollups. Analysis artifact only — does not modify the website.",
  },
  concepts,
  themes: THEMES.map(([id, label, members]) => ({ id, label, concepts: members })),
  narratives: NARRATIVES.map(([id, label, members]) => ({ id, label, themes: members })),
  perceptions: PERCEPTIONS.map(([id, label, members]) => ({ id, label, narratives: members })),
  edges: {
    conceptToTheme,
    themeToNarrative: NARRATIVES.flatMap(([nid, , tids]) => tids.map((t) => [t, nid])),
    narrativeToPerception: PERCEPTIONS.flatMap(([pid, , nids]) => nids.map((n) => [n, pid])),
  },
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(layer, null, 2));

// ---------------------------------------------------------------------------
// Console summary
// ---------------------------------------------------------------------------
console.log(`\n=== ASK ABOUT KOREA · PRODUCTION ONTOLOGY ===`);
console.log(`source: ${INPUT}  (${TOTAL} canonical questions, mode=${raw.meta?.mode})`);
console.log(`concepts: ${concepts.length}   unclustered: ${unclustered.count} (${unclusteredPct}%)`);
console.log(`\n--- CONCEPTS (by size) ---`);
console.log(`   n    %   class            top     concept`);
for (const c of concepts) {
  console.log(
    `${String(c.count).padStart(4)} ${String(c.sharePct).padStart(4)}  ` +
    `${c.market.classification.padEnd(15)} ${(c.market.topMarket || "-").padEnd(6)} ${c.label}`
  );
}
console.log(`\n--- THEMES ---`);
for (const t of layer.themes) {
  const size = t.concepts.reduce((n, cid) => {
    const c = concepts.find((x) => x.id === cid); return n + (c ? c.count : 0);
  }, 0);
  console.log(`  ${t.label}  (~${size} q)  <- ${t.concepts.join(", ")}`);
}
console.log(`\n--- NARRATIVES ---`);
for (const n of layer.narratives) console.log(`  ${n.label}  <- ${n.themes.join(", ")}`);
console.log(`\n--- PERCEPTIONS ---`);
for (const p of layer.perceptions) console.log(`  ${p.label}  <- ${p.narratives.join(", ")}`);

console.log(`\n--- MARKET-SPECIFIC CONCEPTS (skew to 1–2 language-markets) ---`);
const mspec = concepts.filter((c) => c.market.classification === "market-specific");
if (!mspecLen(mspec)) console.log("  (none)");
for (const c of mspec)
  console.log(`  ${c.label}: top ${c.market.topMarket} ${Math.round(c.market.topShare * 100)}%  ${JSON.stringify(c.market.distribution)}`);
console.log(`\n--- MIXED (moderate skew) ---`);
for (const c of concepts.filter((c) => c.market.classification === "mixed"))
  console.log(`  ${c.label}: top ${c.market.topMarket} ${Math.round(c.market.topShare * 100)}%  ${JSON.stringify(c.market.distribution)}`);
console.log(`\n--- CROSS-MARKET CONCEPTS (present in >=5 of 7 markets) ---`);
for (const c of concepts.filter((c) => c.market.classification === "cross-market"))
  console.log(`  ${c.label}: ${c.market.distinctMarkets}/7 markets  ${JSON.stringify(c.market.distribution)}`);
function mspecLen(a) { return a.length; }

console.log(`\nwrote ${OUT}\n`);
