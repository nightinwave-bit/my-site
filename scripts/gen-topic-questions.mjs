// Build-time: classify ALL 1,540 canonical questions by concept → topic
// Output: lib/topic-questions.generated.json
//
// Usage: node scripts/gen-topic-questions.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const INPUT = resolve(ROOT, "collect/output/canonical_questions.json");
const OUTPUT = resolve(ROOT, "lib/topic-questions.generated.json");

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
  ["c_basics", "Country Basics & Identity", [
    "what is korea", "o que é a coreia", "ما هي كوريا", "known for", "famous for",
    "corea es", "was ist korea", "apa itu korea", "capital of korea", "population",
    "면적", "인구", "how is korea", "what is korea known",
  ]],
  ["c_unclustered", "Unclustered", []],
];

const TOPIC_CONCEPTS = {
  hallyu: ["c_kpop", "c_drama", "c_beauty", "c_food"],
  language: ["c_language", "c_education"],
  tourism: ["c_travel", "c_place"],
  history: ["c_history", "c_culture"],
  diplomacy: ["c_division", "c_compare"],
  society: ["c_people", "c_etiquette", "c_society", "c_basics"],
  economy: ["c_economy"],
  technology: ["c_tech"],
};

const CONCEPT_TO_TOPIC = {};
for (const [topic, cids] of Object.entries(TOPIC_CONCEPTS)) {
  for (const cid of cids) CONCEPT_TO_TOPIC[cid] = topic;
}

function classify(text) {
  const t = (text || "").toLowerCase();
  for (const [id, , anchors] of CONCEPTS) {
    for (const a of anchors) if (t.includes(a)) return id;
  }
  return "c_unclustered";
}

const raw = JSON.parse(readFileSync(INPUT, "utf8"));
const questions = raw.questions;

const result = {};
for (const topic of Object.keys(TOPIC_CONCEPTS)) {
  result[topic] = { concepts: {}, questions: [] };
  for (const cid of TOPIC_CONCEPTS[topic]) {
    result[topic].concepts[cid] = [];
  }
}

let classified = 0;
let unclustered = 0;

for (const q of questions) {
  const conceptId = classify(q.canonicalText);
  const topicSlug = CONCEPT_TO_TOPIC[conceptId];

  if (!topicSlug) {
    unclustered++;
    continue;
  }

  classified++;
  const entry = {
    id: q.id,
    text: q.canonicalText,
    countries: q.countries,
    language: q.language,
    frequency: q.frequencyIndicator,
  };

  result[topicSlug].concepts[conceptId].push(entry);
  result[topicSlug].questions.push({ ...entry, conceptId });
}

for (const topic of Object.keys(result)) {
  result[topic].questions.sort((a, b) => (b.frequency ?? 0) - (a.frequency ?? 0));
  result[topic].count = result[topic].questions.length;
}

writeFileSync(OUTPUT, JSON.stringify(result, null, 0));

console.log(`Classified: ${classified}, Unclustered: ${unclustered}`);
for (const [topic, data] of Object.entries(result)) {
  console.log(`  ${topic}: ${data.count} questions`);
}
console.log(`Output: ${OUTPUT}`);
