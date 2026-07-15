import type { Locale } from "@/lib/i18n";

export type Localized = { ko: string; en: string };

export function loc(v: Localized, locale: Locale): string {
  return v[locale];
}

export interface Source {
  label: string;
  platform: "google" | "reddit" | "wiki" | "news";
}

export interface RepQuestion {
  id: string;
  question: Localized;
  answer: Localized;
  sources: Source[];
  video: Localized;
}

export interface Category {
  slug: string;
  name: Localized;
  /** lucide-react icon name resolved in the UI */
  icon: string;
  /** sample question count */
  count: number;
  /** sample share of total, in percent */
  share: number;
  /** hue used for the accent color of this category */
  hue: number;
  tagline: Localized;
  intro: Localized;
  questions: RepQuestion[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "food",
    name: { ko: "음식", en: "Food" },
    icon: "UtensilsCrossed",
    count: 2140,
    share: 18.4,
    hue: 14,
    tagline: {
      ko: "세계가 가장 먼저 맛보는 한국",
      en: "The first taste of Korea for the world",
    },
    intro: {
      ko: "김치와 비빔밥에서 시작해 K-바비큐와 편의점 음식까지, 음식은 세계가 한국을 가장 자주 검색하는 관문입니다. 맛, 재료, 그리고 ‘어디서 먹을 수 있는가’에 대한 궁금증이 이어집니다.",
      en: "From kimchi and bibimbap to K-barbecue and convenience-store snacks, food is the gateway through which the world most often searches for Korea. Curiosity runs from flavor to ingredients to ‘where can I try it.’",
    },
    questions: [
      {
        id: "food-1",
        question: {
          ko: "김치는 왜 발효시키나요?",
          en: "Why is kimchi fermented?",
        },
        answer: {
          ko: "발효는 유산균을 만들어 김치를 오래 보관할 수 있게 하고, 특유의 깊은 신맛과 감칠맛을 냅니다. 전통적으로는 겨울을 나기 위한 저장 방법이었습니다.",
          en: "Fermentation produces lactic acid bacteria that preserve the vegetables and create kimchi’s signature tang and umami. Traditionally, it was a way to store vegetables through the winter.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "r/KoreanFood", platform: "reddit" },
        ],
        video: {
          ko: "김치 발효의 과학 (샘플)",
          en: "The science of kimchi fermentation (sample)",
        },
      },
      {
        id: "food-2",
        question: {
          ko: "한국식 치킨은 무엇이 다른가요?",
          en: "What makes Korean fried chicken different?",
        },
        answer: {
          ko: "두 번 튀기는 방식으로 껍질이 매우 바삭하고 기름기가 적습니다. 간장, 마늘, 매콤달콤한 양념 등 다양한 소스로 마무리하는 것도 특징입니다.",
          en: "It is double-fried for an extra-crispy, less greasy crust, then finished in a range of sauces — soy-garlic, sweet-and-spicy, and more.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "r/FoodPorn", platform: "reddit" },
        ],
        video: {
          ko: "K-치킨 완벽 가이드 (샘플)",
          en: "The ultimate K-chicken guide (sample)",
        },
      },
      {
        id: "food-3",
        question: {
          ko: "비빔밥은 어떻게 먹나요?",
          en: "How do you eat bibimbap?",
        },
        answer: {
          ko: "밥 위의 나물, 고기, 계란, 고추장을 숟가락으로 골고루 비벼서 먹습니다. 돌솥에 담기면 바닥에 바삭한 누룽지가 생깁니다.",
          en: "Mix the rice with the vegetables, meat, egg, and gochujang thoroughly with a spoon before eating. Served in a hot stone bowl, it forms a crispy crust at the bottom.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "비빔밥 제대로 비비는 법 (샘플)",
          en: "How to mix bibimbap properly (sample)",
        },
      },
    ],
  },
  {
    slug: "culture",
    name: { ko: "문화", en: "Culture" },
    icon: "Music",
    count: 1980,
    share: 17.0,
    hue: 280,
    tagline: {
      ko: "K-팝을 넘어선 문화의 결",
      en: "The texture of culture beyond K-pop",
    },
    intro: {
      ko: "K-팝과 K-드라마가 관심의 문을 열었지만, 질문은 곧 전통, 예절, 팬 문화, 일상의 미감으로 확장됩니다. 세계는 한국 문화의 ‘왜’를 궁금해합니다.",
      en: "K-pop and K-dramas opened the door, but the questions quickly expand into tradition, etiquette, fandom, and everyday aesthetics. The world wants to understand the ‘why’ of Korean culture.",
    },
    questions: [
      {
        id: "culture-1",
        question: {
          ko: "K-팝 아이돌은 어떻게 데뷔하나요?",
          en: "How do K-pop idols debut?",
        },
        answer: {
          ko: "대부분 기획사의 오디션을 거쳐 연습생이 되고, 수년간 노래·춤·외국어 훈련을 받은 뒤 그룹으로 데뷔합니다. 이 과정을 ‘연습생 시스템’이라고 부릅니다.",
          en: "Most pass an agency audition to become trainees, then train for years in singing, dancing, and languages before debuting in a group — a process known as the trainee system.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "r/kpop", platform: "reddit" },
        ],
        video: {
          ko: "연습생에서 데뷔까지 (샘플)",
          en: "From trainee to debut (sample)",
        },
      },
      {
        id: "culture-2",
        question: {
          ko: "한국의 나이 계산법은 왜 다른가요?",
          en: "Why is Korean age counted differently?",
        },
        answer: {
          ko: "전통적으로 태어나면 한 살로 세고 새해마다 한 살을 더하는 ‘세는 나이’가 쓰였습니다. 2023년부터는 공식 문서에서 국제 만 나이로 통일되었습니다.",
          en: "Traditionally, a person was one year old at birth and gained a year each New Year (‘Korean age’). Since 2023, official documents use the international system.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "한국 나이 완전 정리 (샘플)",
          en: "Korean age, explained (sample)",
        },
      },
      {
        id: "culture-3",
        question: {
          ko: "한복은 언제 입나요?",
          en: "When do people wear hanbok?",
        },
        answer: {
          ko: "설날·추석 같은 명절, 결혼식, 돌잔치 등 특별한 날에 주로 입습니다. 최근에는 고궁에서 대여해 입는 관광객도 많습니다.",
          en: "Mainly on holidays like Seollal and Chuseok, weddings, and first-birthday celebrations. Today many tourists also rent hanbok to wear around the old palaces.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "한복의 어제와 오늘 (샘플)",
          en: "Hanbok, past and present (sample)",
        },
      },
    ],
  },
  {
    slug: "language",
    name: { ko: "언어", en: "Language" },
    icon: "Languages",
    count: 1460,
    share: 12.5,
    hue: 210,
    tagline: {
      ko: "한글, 세계가 배우고 싶은 문자",
      en: "Hangul, a script the world wants to learn",
    },
    intro: {
      ko: "한글의 과학적 설계부터 존댓말, 발음, 학습 방법까지. 한국어는 배우기 어렵다는 인식과 배우고 싶다는 열망이 함께 검색되는 영역입니다.",
      en: "From the scientific design of Hangul to honorifics, pronunciation, and study methods. Korean is searched with both a reputation for difficulty and a strong desire to learn.",
    },
    questions: [
      {
        id: "language-1",
        question: {
          ko: "한글은 배우기 쉽나요?",
          en: "Is Hangul easy to learn?",
        },
        answer: {
          ko: "한글은 소리와 글자가 규칙적으로 대응하도록 설계되어 문자 자체는 며칠 만에 익힐 수 있습니다. 다만 문법과 존댓말은 별도의 학습이 필요합니다.",
          en: "Hangul was designed so letters map to sounds systematically, so the alphabet itself can be learned in days. Grammar and honorifics, however, take further study.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "r/Korean", platform: "reddit" },
        ],
        video: {
          ko: "90분 만에 한글 읽기 (샘플)",
          en: "Read Hangul in 90 minutes (sample)",
        },
      },
      {
        id: "language-2",
        question: {
          ko: "존댓말은 어떻게 쓰나요?",
          en: "How do Korean honorifics work?",
        },
        answer: {
          ko: "상대의 나이·지위·친밀도에 따라 문장의 어미와 어휘가 달라집니다. 처음에는 ‘-요’로 끝나는 정중한 말투를 익히는 것이 안전합니다.",
          en: "Sentence endings and vocabulary change with the listener’s age, status, and closeness. Beginners are safest learning the polite ‘-yo’ speech level first.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "r/Korean", platform: "reddit" },
        ],
        video: {
          ko: "존댓말 vs 반말 (샘플)",
          en: "Formal vs casual speech (sample)",
        },
      },
      {
        id: "language-3",
        question: {
          ko: "한국어를 독학할 수 있나요?",
          en: "Can I learn Korean on my own?",
        },
        answer: {
          ko: "한글 익히기 → 기초 문법 → 드라마·노래로 듣기 훈련 순서가 흔한 독학 경로입니다. 꾸준한 노출과 반복이 핵심입니다.",
          en: "A common self-study path is Hangul → basic grammar → listening practice through dramas and songs. Consistent exposure and repetition are key.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "r/languagelearning", platform: "reddit" },
        ],
        video: {
          ko: "한국어 독학 로드맵 (샘플)",
          en: "A self-study roadmap for Korean (sample)",
        },
      },
    ],
  },
  {
    slug: "history",
    name: { ko: "역사", en: "History" },
    icon: "Landmark",
    count: 1220,
    share: 10.5,
    hue: 32,
    tagline: {
      ko: "오늘의 한국을 만든 시간",
      en: "The past that shaped today’s Korea",
    },
    intro: {
      ko: "삼국시대와 조선, 분단과 전쟁, 그리고 압축 성장까지. 세계는 한국의 극적인 역사를 통해 현재의 문화와 사회를 이해하려 합니다.",
      en: "The Three Kingdoms and Joseon, division and war, then rapid growth. The world tries to understand Korea’s present culture and society through its dramatic history.",
    },
    questions: [
      {
        id: "history-1",
        question: {
          ko: "남북한은 왜 분단되었나요?",
          en: "Why are North and South Korea divided?",
        },
        answer: {
          ko: "1945년 광복 후 미국과 소련이 한반도를 38선으로 분할 점령했고, 냉전과 한국전쟁을 거치며 분단이 고착되었습니다.",
          en: "After liberation in 1945, the US and USSR divided the peninsula at the 38th parallel; the Cold War and the Korean War then entrenched the division.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "분단의 역사 5분 정리 (샘플)",
          en: "Division in five minutes (sample)",
        },
      },
      {
        id: "history-2",
        question: {
          ko: "조선왕조는 얼마나 오래 지속되었나요?",
          en: "How long did the Joseon dynasty last?",
        },
        answer: {
          ko: "1392년부터 1897년까지 약 500년간 이어졌으며, 이후 대한제국으로 전환되었습니다. 한글 창제와 유교 문화가 이 시기의 유산입니다.",
          en: "It lasted roughly 500 years, from 1392 to 1897, before becoming the Korean Empire. The creation of Hangul and Confucian culture are its legacies.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "조선 500년 한눈에 (샘플)",
          en: "500 years of Joseon at a glance (sample)",
        },
      },
      {
        id: "history-3",
        question: {
          ko: "한강의 기적은 무엇인가요?",
          en: "What is the ‘Miracle on the Han River’?",
        },
        answer: {
          ko: "전쟁으로 폐허가 된 한국이 1960~90년대에 급속한 산업화로 세계적 경제국으로 성장한 과정을 가리키는 표현입니다.",
          en: "It refers to South Korea’s rapid industrialization from the 1960s to the 1990s, transforming a war-torn country into a major economy.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "한강의 기적 다시 보기 (샘플)",
          en: "Revisiting the Han River miracle (sample)",
        },
      },
    ],
  },
  {
    slug: "society",
    name: { ko: "사회", en: "Society" },
    icon: "Users",
    count: 1150,
    share: 9.9,
    hue: 160,
    tagline: {
      ko: "빠르게 변하는 일상의 규칙",
      en: "The fast-changing rules of daily life",
    },
    intro: {
      ko: "치안, 예절, 일과 삶의 균형, 세대 차이까지. 한국 사회의 작동 방식은 방문·거주를 고민하는 사람들에게 특히 자주 검색됩니다.",
      en: "Safety, etiquette, work-life balance, generational gaps. How Korean society works is searched especially often by those thinking of visiting or living there.",
    },
    questions: [
      {
        id: "society-1",
        question: {
          ko: "한국은 안전한가요?",
          en: "Is Korea safe?",
        },
        answer: {
          ko: "한국은 야간 통행과 대중교통 이용이 비교적 안전한 편으로 알려져 있습니다. 다만 어느 곳이든 기본적인 주의는 필요합니다.",
          en: "Korea is widely regarded as relatively safe for walking at night and using public transit, though basic caution is always sensible anywhere.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "밤거리 안전 체험 (샘플)",
          en: "Walking Korea at night (sample)",
        },
      },
      {
        id: "society-2",
        question: {
          ko: "한국의 회식 문화는 어떤가요?",
          en: "What is Korea’s after-work dinner culture?",
        },
        answer: {
          ko: "동료와 함께 식사하고 술을 나누는 ‘회식’은 관계를 다지는 자리로 여겨져 왔습니다. 최근에는 참여가 자율적으로 바뀌는 추세입니다.",
          en: "‘Hoesik,’ a shared meal and drinks with colleagues, has traditionally been a bonding ritual. Increasingly, attendance is becoming voluntary.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "회식 문화 변화 (샘플)",
          en: "How hoesik is changing (sample)",
        },
      },
      {
        id: "society-3",
        question: {
          ko: "한국의 배달 문화는 왜 발달했나요?",
          en: "Why is Korea’s delivery culture so developed?",
        },
        answer: {
          ko: "높은 인구 밀도, 발달한 앱 생태계, 빠른 서비스에 대한 기대가 맞물려 거의 모든 것을 빠르게 배달받을 수 있는 문화가 자리 잡았습니다.",
          en: "High population density, a mature app ecosystem, and expectations of speed combined to make near-instant delivery of almost anything the norm.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "세계 최고 배달 시스템 (샘플)",
          en: "The world’s fastest delivery (sample)",
        },
      },
    ],
  },
  {
    slug: "tourism",
    name: { ko: "관광", en: "Tourism" },
    icon: "MapPin",
    count: 980,
    share: 8.4,
    hue: 190,
    tagline: {
      ko: "가고 싶은 이유를 검색하다",
      en: "Searching for a reason to visit",
    },
    intro: {
      ko: "언제 가야 할지, 어디를 봐야 할지, 무엇을 준비해야 할지. 실제 여행을 계획하는 사람들의 구체적이고 실용적인 질문이 모입니다.",
      en: "When to go, what to see, what to prepare. This is where the concrete, practical questions of people actually planning a trip gather.",
    },
    questions: [
      {
        id: "tourism-1",
        question: {
          ko: "한국은 언제 방문하기 가장 좋나요?",
          en: "When is the best time to visit Korea?",
        },
        answer: {
          ko: "선선하고 단풍이 아름다운 가을(9~11월)과 벚꽃이 피는 봄(4~5월)이 가장 인기 있습니다. 여름은 덥고 습하며 겨울은 춥습니다.",
          en: "Autumn (Sep–Nov) with cool weather and foliage, and spring (Apr–May) with cherry blossoms, are most popular. Summers are hot and humid; winters are cold.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "r/travel", platform: "reddit" },
        ],
        video: {
          ko: "계절별 한국 여행 (샘플)",
          en: "Korea through the seasons (sample)",
        },
      },
      {
        id: "tourism-2",
        question: {
          ko: "서울에서 꼭 봐야 할 곳은?",
          en: "What are the must-see places in Seoul?",
        },
        answer: {
          ko: "경복궁과 북촌 한옥마을, 명동과 홍대, 남산타워, 그리고 한강이 대표적입니다. 전통과 현대가 가까이 붙어 있는 것이 매력입니다.",
          en: "Gyeongbokgung and Bukchon, Myeongdong and Hongdae, Namsan Tower, and the Han River. The charm is how closely tradition and modernity sit together.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "서울 하루 완벽 코스 (샘플)",
          en: "The perfect day in Seoul (sample)",
        },
      },
      {
        id: "tourism-3",
        question: {
          ko: "한국 여행에 비자가 필요한가요?",
          en: "Do I need a visa to visit Korea?",
        },
        answer: {
          ko: "많은 국가의 여행자는 무비자 또는 전자여행허가(K-ETA)로 단기 방문이 가능합니다. 국적에 따라 요건이 다르니 사전 확인이 필요합니다.",
          en: "Travelers from many countries can make short visits visa-free or with a K-ETA. Requirements vary by nationality, so check in advance.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "K-ETA 신청 가이드 (샘플)",
          en: "How to apply for K-ETA (sample)",
        },
      },
    ],
  },
  {
    slug: "technology",
    name: { ko: "기술", en: "Technology" },
    icon: "Cpu",
    count: 720,
    share: 6.2,
    hue: 250,
    tagline: {
      ko: "가장 먼저 미래를 시험하는 곳",
      en: "Where the future is tested first",
    },
    intro: {
      ko: "반도체와 스마트폰, 초고속 인터넷과 로봇까지. 한국이 어떻게 기술 강국이 되었는지, 그리고 일상이 얼마나 디지털화되어 있는지를 궁금해합니다.",
      en: "Semiconductors and smartphones, ultra-fast internet and robots. People wonder how Korea became a tech powerhouse — and how digital everyday life has become.",
    },
    questions: [
      {
        id: "technology-1",
        question: {
          ko: "한국은 왜 인터넷이 빠른가요?",
          en: "Why is Korea’s internet so fast?",
        },
        answer: {
          ko: "높은 인구 밀도, 이른 광케이블 투자, 강한 통신 경쟁이 맞물려 세계 최고 수준의 초고속·저지연 인터넷이 보편화되었습니다.",
          en: "Dense population, early fiber investment, and fierce telecom competition together made world-leading high-speed, low-latency internet the norm.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "세계 1위 인터넷의 비밀 (샘플)",
          en: "The secret of #1 internet (sample)",
        },
      },
      {
        id: "technology-2",
        question: {
          ko: "삼성은 한국에서 얼마나 큰가요?",
          en: "How big is Samsung in Korea?",
        },
        answer: {
          ko: "삼성은 전자·반도체를 중심으로 여러 산업에 걸친 대기업 집단으로, 한국 경제와 수출에서 매우 큰 비중을 차지합니다.",
          en: "Samsung is a conglomerate spanning electronics, semiconductors, and more, accounting for a very large share of Korea’s economy and exports.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "삼성 제국 해부 (샘플)",
          en: "Inside the Samsung empire (sample)",
        },
      },
      {
        id: "technology-3",
        question: {
          ko: "한국의 결제는 얼마나 디지털화되었나요?",
          en: "How cashless is Korea?",
        },
        answer: {
          ko: "교통카드, 간편결제, QR결제가 널리 쓰여 현금 없이도 거의 모든 일상이 가능합니다. 소액 결제까지 디지털화된 것이 특징입니다.",
          en: "Transit cards, mobile pay, and QR payments are ubiquitous, so daily life is possible with almost no cash — even small purchases are digital.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "현금 없는 하루 (샘플)",
          en: "A day without cash (sample)",
        },
      },
    ],
  },
  {
    slug: "education",
    name: { ko: "교육", en: "Education" },
    icon: "GraduationCap",
    count: 640,
    share: 5.5,
    hue: 120,
    tagline: {
      ko: "치열함의 이유를 묻다",
      en: "Asking why it’s so intense",
    },
    intro: {
      ko: "수능, 학원, 입시 경쟁으로 대표되는 한국 교육. 세계는 그 높은 성취와 함께 그 이면의 압박까지 함께 궁금해합니다.",
      en: "Korean education is known for the Suneung exam, private academies, and fierce competition. The world is curious about its high achievement — and the pressure behind it.",
    },
    questions: [
      {
        id: "education-1",
        question: {
          ko: "수능은 얼마나 중요한가요?",
          en: "How important is the Suneung exam?",
        },
        answer: {
          ko: "대학 입시에서 매우 큰 비중을 차지하는 전국 단위 시험으로, 시험 당일에는 항공기 이착륙까지 조정될 만큼 사회적 무게가 큽니다.",
          en: "It is a national exam that weighs heavily in university admissions — so significant that even flight schedules are adjusted on exam day.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "수능 하루 밀착 (샘플)",
          en: "A day inside Suneung (sample)",
        },
      },
      {
        id: "education-2",
        question: {
          ko: "학원은 무엇인가요?",
          en: "What is a hagwon?",
        },
        answer: {
          ko: "정규 학교 외에 다니는 사설 교육기관으로, 방과 후 보충 학습과 입시 준비의 핵심입니다. 다양한 과목과 예체능을 다룹니다.",
          en: "A private after-school academy central to supplementary learning and exam prep, covering everything from academics to arts and sports.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "학원가의 밤 (샘플)",
          en: "Night in the academy district (sample)",
        },
      },
      {
        id: "education-3",
        question: {
          ko: "한국 학생들은 얼마나 오래 공부하나요?",
          en: "How long do Korean students study?",
        },
        answer: {
          ko: "고등학생의 경우 정규 수업 후 학원과 자율학습으로 밤 늦게까지 이어지는 경우가 많습니다. 학업 시간이 긴 것으로 알려져 있습니다.",
          en: "High schoolers often study late into the night through academies and self-study after regular classes — study hours are known to be long.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "r/korea", platform: "reddit" },
        ],
        video: {
          ko: "고3의 하루 (샘플)",
          en: "A day of a senior (sample)",
        },
      },
    ],
  },
  {
    slug: "economy",
    name: { ko: "경제", en: "Economy" },
    icon: "TrendingUp",
    count: 380,
    share: 3.3,
    hue: 45,
    tagline: {
      ko: "작은 나라, 큰 산업",
      en: "A small country, big industries",
    },
    intro: {
      ko: "반도체, 자동차, 조선, 그리고 문화 콘텐츠 수출까지. 자원이 부족한 나라가 어떻게 수출 강국이 되었는지에 대한 관심이 이어집니다.",
      en: "Semiconductors, cars, shipbuilding, and cultural exports. Interest continues in how a resource-poor country became an export powerhouse.",
    },
    questions: [
      {
        id: "economy-1",
        question: {
          ko: "한국 경제는 무엇으로 성장했나요?",
          en: "What drives Korea’s economy?",
        },
        answer: {
          ko: "수출 중심의 제조업, 특히 반도체·자동차·전자가 성장의 축이었고, 최근에는 K-콘텐츠 같은 문화 산업의 비중도 커지고 있습니다.",
          en: "Export-led manufacturing — especially semiconductors, cars, and electronics — drove growth; more recently, cultural industries like K-content are rising.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "수출 강국의 지도 (샘플)",
          en: "Map of an export power (sample)",
        },
      },
      {
        id: "economy-2",
        question: {
          ko: "재벌은 무엇인가요?",
          en: "What is a chaebol?",
        },
        answer: {
          ko: "가족이 지배하는 대규모 기업집단을 뜻합니다. 여러 산업에 걸쳐 있으며 한국 경제에서 큰 영향력을 가집니다.",
          en: "A large, family-controlled business conglomerate spanning many industries and holding significant influence over Korea’s economy.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "재벌 구조 이해하기 (샘플)",
          en: "Understanding the chaebol (sample)",
        },
      },
      {
        id: "economy-3",
        question: {
          ko: "K-콘텐츠는 경제에 얼마나 기여하나요?",
          en: "How much does K-content add to the economy?",
        },
        answer: {
          ko: "음악·드라마·영화 등 문화 콘텐츠 수출이 늘면서 관광·소비재까지 파급 효과를 내는 새로운 성장 동력으로 주목받고 있습니다.",
          en: "Rising exports of music, drama, and film ripple into tourism and consumer goods, making culture a new engine of growth.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "K-콘텐츠 경제학 (샘플)",
          en: "The economics of K-content (sample)",
        },
      },
    ],
  },
  {
    slug: "diplomacy",
    name: { ko: "외교", en: "Diplomacy" },
    icon: "Globe2",
    count: 260,
    share: 2.3,
    hue: 340,
    tagline: {
      ko: "지도 위의 한국을 읽다",
      en: "Reading Korea on the map",
    },
    intro: {
      ko: "남북 관계, 주변국과의 외교, 그리고 문화로 확장되는 소프트파워까지. 세계는 한국의 지정학적 위치와 역할을 궁금해합니다.",
      en: "Inter-Korean relations, diplomacy with neighbors, and soft power through culture. The world is curious about Korea’s geopolitical position and role.",
    },
    questions: [
      {
        id: "diplomacy-1",
        question: {
          ko: "남북 관계는 지금 어떤가요?",
          en: "What are inter-Korean relations like now?",
        },
        answer: {
          ko: "긴장과 대화가 시기에 따라 반복되어 왔습니다. 공식적으로는 여전히 정전 상태이며, 상황에 따라 관계가 변동합니다.",
          en: "Periods of tension and dialogue have alternated over time. The two Koreas remain technically in an armistice, and relations shift with circumstances.",
        },
        sources: [
          { label: "Google People Also Ask", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "DMZ에서 본 한반도 (샘플)",
          en: "The peninsula from the DMZ (sample)",
        },
      },
      {
        id: "diplomacy-2",
        question: {
          ko: "소프트파워란 무엇인가요?",
          en: "What is soft power in Korea’s case?",
        },
        answer: {
          ko: "군사·경제력이 아닌 문화·이미지로 얻는 영향력을 뜻합니다. K-팝과 영화, 음식이 한국의 대표적 소프트파워로 꼽힙니다.",
          en: "Influence gained through culture and image rather than military or economic force. K-pop, film, and food are Korea’s signature soft-power assets.",
        },
        sources: [
          { label: "Google Search", platform: "google" },
          { label: "Wikipedia", platform: "wiki" },
        ],
        video: {
          ko: "문화로 넓히는 영향력 (샘플)",
          en: "Influence through culture (sample)",
        },
      },
      {
        id: "diplomacy-3",
        question: {
          ko: "한국은 어떤 나라들과 가까운가요?",
          en: "Which countries is Korea close to?",
        },
        answer: {
          ko: "안보·경제적으로 여러 국가와 긴밀히 협력하며, 지역 정세에 따라 관계의 무게가 달라집니다. 무역 파트너도 폭넓게 분포합니다.",
          en: "Korea cooperates closely with several countries on security and trade, with emphasis shifting by regional dynamics and a broad base of trade partners.",
        },
        sources: [
          { label: "Google Autocomplete", platform: "google" },
          { label: "News", platform: "news" },
        ],
        video: {
          ko: "한국의 외교 지형 (샘플)",
          en: "Korea’s diplomatic landscape (sample)",
        },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = CATEGORIES.reduce((s, c) => s + c.count, 0);

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const DATA_SOURCES = [
  {
    key: "google",
    name: "Google Search",
    icon: "Search",
    descKey: "sources.google.desc",
    hue: 210,
  },
  {
    key: "paa",
    name: "People Also Ask",
    icon: "MessagesSquare",
    descKey: "sources.paa.desc",
    hue: 145,
  },
  {
    key: "autocomplete",
    name: "Autocomplete",
    icon: "TextCursorInput",
    descKey: "sources.autocomplete.desc",
    hue: 40,
  },
  {
    key: "reddit",
    name: "Reddit",
    icon: "MessageCircle",
    descKey: "sources.reddit.desc",
    hue: 14,
  },
] as const;
