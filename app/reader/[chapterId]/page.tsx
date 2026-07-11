"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { getBookChapterByRouteId } from "../../../src/data/books";
import type { BookContentBlock } from "../../../src/data/books";

// İnce parşömen dokusu: harici dosya gerektirmeyen, kendi kendine yeten SVG gren katmanı.
const paperNoise =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.30 0 0 0 0 0.12 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E";

function StarSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2c.6 4.8 2.4 7.4 10 10-7.6 2.6-9.4 5.2-10 10-.6-4.8-2.4-7.4-10-10 7.6-2.6 9.4-5.2 10-10Z" />
    </svg>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 60 V20 Q4 4 20 4 H60" />
      <path d="M13 60 V24 Q13 13 24 13 H60" opacity="0.45" />
      <path d="M22 22 l5 -5 5 5 -5 5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TitleCartouche({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center gap-2.5 sm:gap-3">
      <StarSpark className="h-3 w-3 shrink-0 text-amber-500/70" />
      <div className="relative max-w-[82%] rounded-full border border-amber-500/60 bg-[#fffdf4] px-5 py-1.5 shadow-[0_0_0_3px_#fffdf4,0_0_0_4px_rgba(202,138,4,0.4),0_6px_14px_-8px_rgba(146,95,25,0.5)] sm:px-7 sm:py-2">
        <StarSpark className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 text-amber-500" />
        <p className="truncate text-center text-base font-black text-amber-800 sm:text-lg">
          {children}
        </p>
      </div>
      <StarSpark className="h-3 w-3 shrink-0 text-amber-500/70" />
    </div>
  );
}

function BackdropScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src="/reader-arkaplan.png"
        alt=""
        className="h-full w-full object-cover object-bottom"
      />
    </div>
  );
}

type GlossaryKey = "köle" | "servet" | "Ahad" | "Bilal" | "Ebû Bekir";

type ReadingSection = {
  title: string;
  paragraphs: string[];
};

type DecisionOption = {
  id: "a" | "b" | "c";
  text: string;
};

type ChapterData = {
  id: string;
  bookKey?: "adem" | "nuh" | "ebubekir";
  bookName?: string;
  chapterNumber?: number;
  totalChapters?: number;
  eyebrow: string;
  title: string;
  audioTitle: string;
  decisionTitle: string;
  badgeName: string;
  returnMessage: string;
  contentBlocks?: BookContentBlock[];
  beforeDecision: ReadingSection[];
  decision?: {
    question: string;
    options: DecisionOption[];
    correctOption?: DecisionOption["id"];
    correctFeedback?: string;
  };
  afterDecision: ReadingSection[];
  learned: string[];
  buguneTasi?: string;
  mapNote?: string;
};

function adaptDataChapter(routeId: string): ChapterData | null {
  const result = getBookChapterByRouteId(routeId);

  if (!result) return null;

  const { book, chapter } = result;

  return {
    id: routeId,
    bookKey: book.routePrefix as ChapterData["bookKey"],
    bookName: book.title,
    chapterNumber: Number(chapter.id),
    totalChapters: book.chapters.length,
    eyebrow: book.eyebrow,
    title: `${chapter.id}. Bölüm - ${chapter.title}`,
    audioTitle: chapter.audioUrl
      ? `${book.title} sesli anlatım`
      : `${book.title} Bölüm ${chapter.id} Sesli Anlatım`,
    decisionTitle: chapter.question?.title ?? chapter.title,
    badgeName: chapter.badgeName,
    returnMessage: `${chapter.badgeName} haritana işleniyor...`,
    contentBlocks: chapter.paragraphs,
    beforeDecision: [],
    decision:
      chapter.has_question && chapter.question
        ? {
            question: chapter.question.prompt,
            options: chapter.question.options,
            correctOption: chapter.question.correctOption,
            correctFeedback: chapter.question.feedback,
          }
        : undefined,
    afterDecision: [],
    learned: chapter.learned,
    buguneTasi: chapter.buguneTasi,
  };
}

const glossary: Record<GlossaryKey, { label: string; meaning: string }> = {
  köle: {
    label: "Köle",
    meaning:
      "O dönemde özgürlüğü elinden alınmış, başkası tarafından alınıp satılan insan. Bu büyük bir haksızlıktı.",
  },
  servet: {
    label: "Servet",
    meaning:
      "Bir kişinin sahip olduğu büyük para, mal ve değerli şeylerin tamamı.",
  },
  Ahad: {
    label: "Ahad",
    meaning:
      '"Bir, tek" demektir. Bilal bu sözle Allah birdir diyordu.',
  },
  Bilal: {
    label: "Bilal",
    meaning:
      "İnancını bırakmayan, Ebû Bekir tarafından özgürlüğüne kavuşturulan güzel sesli sahabe.",
  },
  "Ebû Bekir": {
    label: "Ebû Bekir",
    meaning:
      "Peygamberimizin en yakın dostu; cömertliğiyle Bilal'i ve başka insanları özgürlüğüne kavuşturan sahabe.",
  },
};

function createMockChapter({
  id,
  title,
  badgeName,
  theme,
}: {
  id: string;
  title: string;
  badgeName: string;
  theme: string;
}): ChapterData {
  return {
    id,
    bookKey: "ebubekir",
    bookName: "Hz. Ebû Bekir",
    chapterNumber: Number(id) - 3,
    totalChapters: 10,
    eyebrow: "Hz. Ebû Bekir - Çocuklar İçin",
    title: `${id}. Bölüm - ${title}`,
    audioTitle: `Bölüm ${id} Sesli Anlatım`,
    decisionTitle: title,
    badgeName,
    returnMessage: `${badgeName} haritana işleniyor...`,
    beforeDecision: [
      {
        title: `${title} Durağı`,
        paragraphs: [
          `Macera günlüğünün bu sayfasında seni kısa bir ${theme} durağı bekliyor. Patika boyunca yürürken rüzgar yapraklara fısıldıyor, uzaklardan kuş sesleri geliyor. Attığın her adım, haritandaki yeni bir işaretin kilidini açmaya seni biraz daha yaklaştırıyor. Heybende cesaretin, kalbinde merakın var; bu yolculukta başka bir şeye ihtiyacın yok.`,
          `Gerçek bölüm metni eklendiğinde bu sayfalarda upuzun ve sıcacık bir hikaye akacak. Kahramanlar konuşacak, zor kararlar verilecek ve sen de her sayfada onlarla birlikte düşüneceksin. Kimi zaman bir çölün ortasında, kimi zaman kalabalık bir çarşıda bulacaksın kendini; ama her seferinde kalbine iyi gelen bir değerle döneceksin.`,
          `Şimdilik bu durağı tamamlayarak haritadaki kilit zincirini deneyebilirsin. Unutma küçük kaşif: her tamamlanan durak, bir sonraki kapının anahtarıdır. Haydi, sayfayı çevir ve rozetini kazanmaya bir adım daha yaklaş!`,
        ],
      },
    ],
    afterDecision: [],
    learned: [
      "Her bölüm, yolculuk haritasında yeni bir adım demektir.",
      "Bir durağı bitirmek, bir sonraki kapının açılmasını sağlar.",
    ],
    buguneTasi:
      "Bugün öğrendiğin bir değeri küçük bir davranışla hayatına taşı.",
  };
}

function createDemoBookChapter({
  bookKey,
  bookName,
  id,
  title,
  badgeName,
  value,
  decision,
}: {
  bookKey: "adem" | "nuh";
  bookName: string;
  id: string;
  title: string;
  badgeName: string;
  value: string;
  decision?: ChapterData["decision"];
}): ChapterData {
  return {
    id: `${bookKey}-${id}`,
    bookKey,
    bookName,
    chapterNumber: Number(id),
    totalChapters: 5,
    eyebrow: `${bookName} - Demo Kitap`,
    title: `${id}. Bölüm - ${title}`,
    audioTitle: `${bookName} Bölüm ${id} Sesli Anlatım`,
    decisionTitle: title,
    badgeName,
    returnMessage: `${badgeName} haritana işleniyor...`,
    beforeDecision: [
      {
        title: `${title} Durağı`,
        paragraphs: [
          `Güneşin altın ışıkları yeryüzünü yavaş yavaş ısıtırken, ${bookName} yolculuğunun bu bölümünde bizi sıcacık bir hikaye bekliyor. Eski zamanların birinde, insanlar günlük telaşlarıyla uğraşırken, içlerinden bazıları kalplerinde güzel bir soru taşıyordu: "İyi bir insan olmak için bugün ne yapabilirim?" İşte bu bölümde o sorunun izini birlikte süreceğiz ve ${value} değerinin bir kalbi nasıl aydınlattığını göreceğiz.`,
          "Hikayemizin kahramanı, çevresindeki insanlara hep güler yüzle yaklaşır, küçük büyük demeden herkesin derdini dinlerdi. Bir gün karşısına hiç beklemediği bir durum çıktı. Kolay olan yolu seçmek mümkündü; kimse onu kınamazdı. Ama kalbinin derinliklerinden gelen o tanıdık ses, ona doğru olanı fısıldıyordu. Durdu, derin bir nefes aldı ve düşündü.",
          "Çevresindekiler merakla onu izliyordu. Çünkü herkes bilirdi ki zor anlarda verilen kararlar, bir insanın kalbinin aynasıdır. O gün verilen güzel karar, yalnızca bir kişiyi değil, onu gören herkesi derinden etkiledi. Küçük bir iyilik, bir taş gibi suya düştü ve halkaları gittikçe büyüdü, büyüdü...",
          `Akşam olup gökyüzü turuncuya boyandığında, herkes evine dağılırken kalplerde tatlı bir huzur vardı. Çünkü o gün hep birlikte çok kıymetli bir şey öğrenmişlerdi: ${value}, konuşarak değil, yaşayarak öğretilirdi. Şimdi sıra sende küçük kaşif! Sayfayı çevir ve bu değerin senin hayatında nasıl parlayacağını keşfet.`,
        ],
      },
    ],
    decision,
    afterDecision: decision
      ? [
          {
            title: "Kararın Ardından",
            paragraphs: [
              "Güzel bir seçim yaptın! Kalbinin sesini dinledin ve doğru olanı buldun. Hikayelerdeki en önemli şey yalnızca ne olduğunu bilmek değil, o değeri bugün nasıl yaşayacağını düşünmektir. Senin gibi düşünen kalpler çoğaldıkça, dünya da güzelleşir.",
              `Bu bölüm sana ${value} değerini hatırlattı. Belki okulda, belki evde, belki bir arkadaşının yanında... Şimdi bu değeri kendi hayatında küçük ama gerçek bir davranışa dönüştürme zamanı. Unutma: en büyük yolculuklar bile tek bir küçük adımla başlar.`,
            ],
          },
        ]
      : [],
    learned: [
      `${value} küçük bir davranışla bile gösterilebilir.`,
      "Bir bölümü tamamlamak, haritada yeni bir durağın açılmasını sağlar.",
      "Okuduklarımızı düşünmek, kalbimizdeki iyi kararları güçlendirir.",
    ],
    buguneTasi: `Bugün ${value} değerini gösteren küçük bir davranış seç ve onu sessizce uygula.`,
  };
}

const ademDemoChapters = [
  createDemoBookChapter({
    bookKey: "adem",
    bookName: "Hz. Adem",
    id: "1",
    title: "İlk İnsan, İlk Öğrenme",
    badgeName: "İlk Adım Rozeti",
    value: "öğrenmeye açık olma",
    decision: {
      question:
        "Yeni ve zor bir şey öğrenirken hata yaptığını fark ediyorsun. Ne yaparsın?",
      correctOption: "b",
      correctFeedback:
        "Harika bir karar! Öğrenen kalp hata yapınca pes etmez, yeniden dener.",
      options: [
        { id: "a", text: "Hemen bırakır, bir daha denemezdim." },
        { id: "b", text: "Sakin kalır, hatamı anlayıp yeniden denerdim." },
        { id: "c", text: "Kimse görmesin diye konuyu kapatırdım." },
      ],
    },
  }),
  createDemoBookChapter({
    bookKey: "adem",
    bookName: "Hz. Adem",
    id: "2",
    title: "İsimlerin Sırrı",
    badgeName: "Bilgi Rozeti",
    value: "bilgiyi güzel kullanma",
  }),
  createDemoBookChapter({
    bookKey: "adem",
    bookName: "Hz. Adem",
    id: "3",
    title: "Unutmak ve Hatırlamak",
    badgeName: "Tövbe Rozeti",
    value: "yanlıştan dönme",
    decision: {
      question:
        "Bir arkadaşını kırdığını anladın. Kalbin de bunun doğru olmadığını söylüyor. Ne yaparsın?",
      correctOption: "a",
      correctFeedback:
        "Çok güzel! Yanlışı fark edip özür dilemek güçlü ve temiz bir kalbin işidir.",
      options: [
        { id: "a", text: "Özür diler, hatamı düzeltmeye çalışırdım." },
        { id: "b", text: "Hiçbir şey olmamış gibi davranırdım." },
        { id: "c", text: "Suçu başka birine atmaya çalışırdım." },
      ],
    },
  }),
  createDemoBookChapter({
    bookKey: "adem",
    bookName: "Hz. Adem",
    id: "4",
    title: "Yeryüzünde İlk Sabah",
    badgeName: "Sorumluluk Rozeti",
    value: "sorumluluk alma",
  }),
  createDemoBookChapter({
    bookKey: "adem",
    bookName: "Hz. Adem",
    id: "5",
    title: "İlk Aile, İlk İyilik",
    badgeName: "Aile ve Merhamet Rozeti",
    value: "merhamet ve aile sevgisi",
    decision: {
      question:
        "Evde biri yorulmuş ve yardıma ihtiyaç duyuyor. Sen oyun oynamak istiyorsun. Ne yaparsın?",
      correctOption: "c",
      correctFeedback:
        "Harika! Merhamet, sevdiğimiz insanlara ihtiyaç anında destek olmaktır.",
      options: [
        { id: "a", text: "Görmezden gelir, oyunuma devam ederdim." },
        { id: "b", text: "Başka biri yardım etsin diye beklerdim." },
        { id: "c", text: "Önce yardım eder, sonra oyunuma dönerdim." },
      ],
    },
  }),
];

const nuhDemoChapters = [
  createDemoBookChapter({
    bookKey: "nuh",
    bookName: "Hz. Nuh",
    id: "1",
    title: "Sabırlı Bir Davet",
    badgeName: "Sabır Başlangıç Rozeti",
    value: "sabır",
    decision: {
      question:
        "Doğru bildiğin bir şeyi güzelce anlattın ama arkadaşın seni hemen dinlemedi. Ne yaparsın?",
      correctOption: "b",
      correctFeedback:
        "Çok iyi! Sabır, doğruyu kırmadan ve incitmeden anlatmaya devam etmektir.",
      options: [
        { id: "a", text: "Kızar ve bağırırdım." },
        { id: "b", text: "Sakin kalır, uygun zamanda tekrar güzelce anlatırdım." },
        { id: "c", text: "Bir daha kimseye iyi bir şey söylemezdim." },
      ],
    },
  }),
  createDemoBookChapter({
    bookKey: "nuh",
    bookName: "Hz. Nuh",
    id: "2",
    title: "Geminin Hazırlığı",
    badgeName: "Emek Rozeti",
    value: "emek verme",
  }),
  createDemoBookChapter({
    bookKey: "nuh",
    bookName: "Hz. Nuh",
    id: "3",
    title: "Yağmur Başlayınca",
    badgeName: "Güven Rozeti",
    value: "Allah'a güven",
    decision: {
      question:
        "Zor bir gün başladı ve biraz kaygılandın. Kalbini sakinleştirmek için ne yaparsın?",
      correctOption: "a",
      correctFeedback:
        "Harika! Çalışıp tedbir almak ve Allah'a güvenmek kalbe huzur verir.",
      options: [
        { id: "a", text: "Tedbir alır, dua eder ve sakin kalmaya çalışırdım." },
        { id: "b", text: "Panik yapar, kimseyi dinlemezdim." },
        { id: "c", text: "Hiçbir şey yapmadan beklerdim." },
      ],
    },
  }),
  createDemoBookChapter({
    bookKey: "nuh",
    bookName: "Hz. Nuh",
    id: "4",
    title: "Güvenle Yolculuk",
    badgeName: "Tevekkül Rozeti",
    value: "tevekkül",
  }),
  createDemoBookChapter({
    bookKey: "nuh",
    bookName: "Hz. Nuh",
    id: "5",
    title: "Yeni Bir Başlangıç",
    badgeName: "Yeni Başlangıç Rozeti",
    value: "yeniden başlama cesareti",
    decision: {
      question:
        "Zor bir dönem bitti ve önünde yepyeni bir başlangıç var. İlk adımın ne olur?",
      correctOption: "c",
      correctFeedback:
        "Çok güzel! Yeni başlangıçlar şükür, umut ve iyi niyetle daha da güzelleşir.",
      options: [
        { id: "a", text: "Eski zorlukları düşünüp hiçbir şey yapmazdım." },
        { id: "b", text: "Sadece kendimi düşünürdüm." },
        { id: "c", text: "Şükreder, iyi bir plan yapar ve umutla başlardım." },
      ],
    },
  }),
];

const chapters: Record<string, ChapterData> = {
  ...Object.fromEntries(ademDemoChapters.map((chapter) => [chapter.id, chapter])),
  ...Object.fromEntries(nuhDemoChapters.map((chapter) => [chapter.id, chapter])),
  "4": {
  id: "4",
  bookKey: "ebubekir",
  bookName: "Hz. Ebû Bekir",
  chapterNumber: 1,
  totalChapters: 10,
  eyebrow: "Hz. Ebû Bekir - Çocuklar İçin",
  title: "4. Bölüm - Özgürlüğe Kavuşanlar",
  audioTitle: "Bölüm 4 Sesli Anlatım",
  decisionTitle: "Çarşıda Bir Karar",
  badgeName: "Mekke Çarşısı Rozeti",
  returnMessage: "Mekke Çarşısı Rozeti haritana işleniyor...",
  beforeDecision: [
    {
      title: "Zor Günler Başlıyor",
      paragraphs: [
        "Zaman geçtikçe Müslümanların sayısı yavaş yavaş artıyordu. Artık haber Mekke'de duyulmuştu: Muhammed, insanları putları bırakıp bir olan Allah'a inanmaya çağırıyordu.",
        "Mekke'nin ileri gelenleri buna çok kızdılar. Çünkü düzenleri bozuluyordu. Ama güçlü ailelerden gelen Müslümanlara kolay kolay dokunamıyorlardı.",
        'Bu yüzden öfkelerini en çok kimsesizlerden çıkardılar: kölelerden. O dönemde "köle" denen insanlar vardı. Bu insanlar çarşıda alınıp satılıyordu ve neredeyse hiçbir hakları yoktu.',
        "İslam, işte bu haksızlığa karşı çıktı. Ve bir insanı özgürlüğüne kavuşturmayı en büyük iyiliklerden saydı.",
      ],
    },
    {
      title: '"Bir! Bir!"',
      paragraphs: [
        "O köle insanlardan biri de Bilâl'di. Habeşistanlı, uzun boylu, gür sesli bir gençti. Bilâl, Müslüman olmuştu ve bunu saklamıyordu.",
        "Sahibi bunu öğrenince küplere bindi. Bilâl'e çölün kızgın kumlarında eziyet etmeye başladı; şöyle diyordu:",
        "— İnancından vazgeç!",
        "Ama Bilâl'in dudaklarından tek bir söz dökülüyordu. Fısıltıyla ama hiç durmadan aynı kelimeyi tekrarlıyordu:",
        "— Ahad!.. Ahad!..",
        'Yani: "Bir!.. Bir!.." Allah birdir, demek istiyordu. Bedeni onların elindeydi ama kalbine kimse dokunamıyordu.',
        "Dur ve düşün: Bilâl'in elinden her şeyi almışlardı. Ama bir şeyi asla alamadılar: inancını. Demek ki insanın en değerli hazinesi, kalbinde taşıdığıdır.",
      ],
    },
    {
      title: "Çarşıda Bir Karar",
      paragraphs: [
        "Bilâl'in çektikleri, Ebû Bekir'in kulağına gitti. Yüreği sızladı. Hemen çarşının yolunu tuttu.",
        "Bilâl'in sahibini buldu. Adam, Bilâl'den kurtulmak istiyordu ama karşısında Mekke'nin zengin tüccarını görünce fiyatı yükseltti. Hem de çok yükseltti.",
        "Ebû Bekir bir an durdu. İstenen para, büyük bir servetti.",
      ],
    },
  ] satisfies ReadingSection[],
  decision: {
    question:
      "Biriktirdiğin büyük bir paran var. Bu parayla bir insanı özgürlüğüne kavuşturabilirsin — ama adam senden çok fazla para istiyor. Ne yaparsın?",
    options: [
      {
        id: "a",
        text: "İstediği parayı öder, onu hemen özgür bırakırdım.",
      },
      {
        id: "b",
        text: "Pazarlık eder, fiyatı düşürmeye çalışırdım.",
      },
      {
        id: "c",
        text: "Önce eve gidip ailemle konuşur, sonra karar verirdim.",
      },
    ] satisfies DecisionOption[],
  },
  afterDecision: [
    {
      title: '"Daha Fazlasını İsteseydin Yine Öderdim"',
      paragraphs: [
        "Ebû Bekir bir saniye bile pazarlık yapmadı. İstenen parayı olduğu gibi saydı, verdi.",
        "Adam şaşırdı. Alaycı bir sesle güldü:",
        "— Sen ne yaptın? Ben onu çok daha ucuza da satardım!",
        "Ebû Bekir'in cevabı tarihe geçti:",
        "— Sen bunun on katını isteseydin, ben yine öderdim.",
        "Sonra Bilâl'e döndü. Gülümsedi ve o güzel cümleyi söyledi:",
        "— Artık özgürsün, ey Bilâl!",
        'Bilâl önce inanamadı. Sonra gözlerinden sevinç yaşları boşandı. Az önce bir "mal" gibi görülen insan, şimdi başı dik, hür bir insandı.',
        "Ebû Bekir için o paranın hiçbir önemi yoktu. Çünkü o gün parayla satın alınamayacak bir şey kazanmıştı: Bir insanın özgürlüğü ve Allah'ın rızası.",
      ],
    },
    {
      title: "Babasının Sorusu",
      paragraphs: [
        "Ebû Bekir bununla da kalmadı. Nerede eziyet gören bir Müslüman köle duysa, koşup onu satın alıyor ve anında özgür bırakıyordu.",
        "Ebû Bekir'in yaşlı babası, oğlunun servetinin eridiğini görüyordu. Bir gün dayanamayıp sordu:",
        "— Oğlum, madem köleleri özgür bırakıyorsun, bari güçlü kuvvetli olanları seç.",
        "Ebû Bekir'in cevabı, niyetinin aynasıydı:",
        "— Babacığım, ben onları kendim için özgür bırakmıyorum ki. Ben bunu Allah için yapıyorum.",
        "Bir iyiliği karşılığında ne alacağım diye değil, sadece iyilik olduğu için yapmak... İşte gerçek cömertlik bu.",
      ],
    },
    {
      title: "Susmayan Ses",
      paragraphs: [
        "Yıllar sonra neler olacağını Bilâl o gün bilmiyordu elbette.",
        'Ama gel, ben sana küçük bir sır vereyim: Çölde "Bir! Bir!" diye fısıldayan o ses, bir gün Medine\'de yükselecek ve bütün şehre ezan okuyacaktı.',
        "Şimdilik Mekke'de günler gittikçe zorlaşıyordu. Müslümanları çok çetin bir sabır sınavı bekliyordu...",
      ],
    },
  ] satisfies ReadingSection[],
  learned: [
    "İnsanın en değerli hazinesi kalbindekidir. Bilâl'in her şeyini aldılar ama inancını alamadılar.",
    'İyilik pazarlık kabul etmez. Ebû Bekir, "on katını isteseydin yine öderdim" dedi.',
    "Gerçek cömertlik, Allah için olandır. Ebû Bekir köleleri kendine destek olsun diye değil, Allah rızası için özgür bıraktı.",
    "Para biriktirilir, harcanır, biter; ama iyilik sonsuza kadar yaşar.",
  ],
  buguneTasi:
    "Bu hafta bir iyilik yap ama kimseye söyleme. Sadece doğru ve güzel olduğu için yap.",
  },
  "5": {
    id: "5",
    bookKey: "ebubekir",
    bookName: "Hz. Ebû Bekir",
    chapterNumber: 2,
    totalChapters: 10,
    eyebrow: "Hz. Ebû Bekir - Çocuklar İçin",
    title: "5. Bölüm - Sabır Yılları",
    audioTitle: "Bölüm 5 Sesli Anlatım",
    decisionTitle: "Sabır Yılları",
    badgeName: "Habeşistan Yolu Çıkartması",
    returnMessage: "Habeşistan Yolu Çıkartması haritana işleniyor...",
    beforeDecision: [
      {
        title: "Gizlilik Sona Eriyor",
        paragraphs: [
          "Aradan üç yıl geçmişti. Müslümanlar artık bir avuç değil, küçük bir topluluktu. Ve Allah'tan yeni emir gelmişti: Davet artık açıktan yapılacaktı.",
          "Peygamberimiz, Mekkelileri açıkça bir olan Allah'a inanmaya çağırdı. Şehir çalkalandı. Putlara tapan Mekke'nin ileri gelenleri öfkeden köpürdüler. İnananlara hayatı zorlaştırmak için ellerinden geleni yaptılar.",
          "Artık Müslüman olmak, cesaret istiyordu.",
        ],
      },
      {
        title: "Kâbe'nin Önünde Bir Ses",
        paragraphs: [
          "Bir gün Ebû Bekir, Peygamberimize bir istekle geldi:",
          "— Ey Allah'ın Elçisi! İzin ver, ben de Kâbe'nin önünde insanlara açıkça sesleneyim!",
          "Ve o gün, Kâbe'nin önünde toplanan kalabalığın karşısına çıktı. Yüksek sesle insanları putları bırakmaya, bir olan Allah'a inanmaya çağırdı.",
          "Peygamberimizden sonra insanları açıkça İslam'a çağıran ilk insan o oldu.",
          "Ama kalabalık bu sözlere tahammül edemedi. Öfkeyle üzerine yürüdüler ve ona saldırdılar. Ebû Bekir ağır yaralandı. Akrabaları onu güçlükle kurtarıp evine taşıdılar.",
        ],
      },
      {
        title: '"Peygamberim Nasıl?"',
        paragraphs: [
          "Ebû Bekir saatlerce kendine gelemedi. Annesi başucunda gözyaşları içinde bekledi.",
          "Nihayet akşama doğru gözlerini araladı.",
          'Ağzından çıkan ilk cümle ne oldu biliyor musun? "Neredeyim?" değil. "Bana ne oldu?" değil. "Canım yanıyor" hiç değil.',
          "İlk sözü şu oldu:",
          "— Peygamberim nasıl? Ona bir şey oldu mu?",
          "Annesi şaşırdı:",
          "— Oğlum, önce bir şeyler ye, iç. Kendine gel!",
          "— Olmaz anneciğim. Onun iyi olduğunu gözlerimle görmeden ne yerim ne içerim.",
          "O gece, yaralı haliyle, annesinin koluna girerek Peygamberimizin yanına götürüldü. Onu sağ salim görünce yüzü aydınlandı. İşte o zaman rahatladı, o zaman yemek yedi.",
          "Bir düşün: Ebû Bekir kendi canı yanarken bile önce arkadaşını düşündü. Gerçek sevgi, insana önce kendini değil, sevdiğini sordurur.",
        ],
      },
      {
        title: "Uzak Bir Ülkeye Yolculuk",
        paragraphs: [
          "Günler geçtikçe baskılar arttı. Özellikle kimsesiz ve güçsüz Müslümanlar çok eziyet çekiyordu.",
          "Bunun üzerine Peygamberimiz onlara bir kapı gösterdi:",
          "— Habeşistan'a gidin. Orada adil bir kral var. Onun ülkesinde kimseye haksızlık yapılmaz.",
          "Ve bir gece, bir grup Müslüman sessizce Mekke'den ayrıldı. Deniz kıyısına ulaştılar, gemilere bindiler ve Habeşistan'a doğru yola çıktılar.",
          "Bu, Müslümanların ilk hicretiydi. Yurdundan ayrılmak çok zordu; ama inançlarını özgürce yaşayabilecekleri bir yere gitmek, onlara umut veriyordu.",
          "Evini, sokağını, arkadaşlarını bırakıp hiç bilmediğin bir ülkeye gitmek... Sence bu ne kadar zordur? İşte inananlar, inançları için bu zorluğu göze aldılar.",
        ],
      },
      {
        title: "Geride Kalanlar",
        paragraphs: [
          "Peki herkes gitti mi? Hayır. Peygamberimiz Mekke'de kaldı. Ebû Bekir de.",
          "Ebû Bekir, Peygamberimizin yanından ayrılmaya gönlü el vermeyenlerdendi. Mekke'de kaldı ve elinden gelen her şeyi yaptı:",
          "Eziyet gören köleleri satın alıp özgür bırakmaya devam etti. Yoksullara yardım etti. Kimsesizlerin elinden tuttu. Serveti gün geçtikçe eriyordu ama o hiç aldırmıyordu.",
          "Bu zor yıllar, Müslümanları bir vücut gibi kenetledi. Biri üzülse hepsi üzülüyor, birinin sevinci hepsinin sevinci oluyordu.",
          "Yıllar böyle geçti. Sabırla, dayanışmayla, umutla...",
        ],
      },
      {
        title: "Şaşırtan Haber",
        paragraphs: [
          "Derken bir sabah, Mekke'de dilden dile bir haber yayıldı. Öyle bir haberdi ki bu, duyan herkes şaşkına döndü.",
          'Putlara tapanlar kahkahalarla gülüyor, "Buna kim inanır?" diyorlardı.',
          "Haber, Peygamberimizle ilgiliydi. Bir gece yolculuğuyla ilgiliydi.",
          "Ve bu haber, Ebû Bekir'e hayatının en güzel lakabını kazandıracaktı.",
          "Merak ettin, değil mi? Sayfayı çevir ve 6. bölüme geç!",
        ],
      },
      {
        title: "Tanık Sayfası — Esmâ'nın Günlüğünden",
        paragraphs: [
          "Bugün komşularımızı uğurladık. İçim hâlâ buruk.",
          "Gece yarısı sessizce yola çıktılar. Uzak bir ülkeye gidiyorlar: Habeşistan'a. Orada adil bir kral varmış, kimseye inancından dolayı kötülük yapılmazmış.",
          'Aralarında arkadaşım da vardı. Sarılırken ikimiz de ağladık. "Yine görüşecek miyiz?" diye sordu. "Elbette," dedim. "Allah büyüktür."',
          "Babam onlara yol için yiyecek ve para hazırlamıştı. Kimseye belli etmeden, sessizce. Babam hep böyle yapıyor: İyilik yapıyor ama hiç anlatmıyor.",
          'Bu gece uyumadan önce hep onları düşündüm. Gemide, kocaman denizin ortasında... Korkuyorlardır belki. Ama inançları yanlarında. Babam diyor ki: "İnancı yanında olanın, yurdu her yerdir."',
          "Allah'ım, onları koru.",
          "— Esmâ",
        ],
      },
    ],
    afterDecision: [],
    learned: [
      "Cesaret, doğruyu açıkça söyleyebilmektir. Ebû Bekir, Kâbe'nin önünde ilk açık çağrıyı yapan insan oldu.",
      'Gerçek sevgi, önce sevdiğini düşündürür. Ebû Bekir yaralıyken bile ilk sorusu "Peygamberim nasıl?" oldu.',
      "Bazen sabretmek de bir mücadeledir. Müslümanlar yıllarca sabırla, dayanışmayla ayakta kaldılar.",
      "Zorluklar, insanları birbirine kenetler. Zor yıllarda Müslümanlar tek vücut oldular.",
    ],
    buguneTasi:
      "Bu hafta sana zor gelen bir işi yarıda bırakmadan sabırla bitir — sabır yıllarındaki Müslümanlar gibi.",
    mapNote:
      "Bu bölümü bitirdin! Habeşistan Yolu çıkartmanı Yolculuk Haritası'ndaki 5. durağa yapıştırmayı unutma!",
  },
  "6": {
    id: "6",
    bookKey: "ebubekir",
    bookName: "Hz. Ebû Bekir",
    chapterNumber: 3,
    totalChapters: 10,
    eyebrow: "Hz. Ebû Bekir - Çocuklar İçin",
    title: "6. Bölüm - O Söylüyorsa Doğrudur",
    audioTitle: "Bölüm 6 Sesli Anlatım",
    decisionTitle: "Yeni Macera",
    badgeName: "Doğruluk Rozeti",
    returnMessage: "Doğruluk Rozeti haritana işleniyor...",
    beforeDecision: [
      {
        title: "Bu Bölüm Açıldı",
        paragraphs: [
          "Sabır Yılları bölümünü tamamladın ve yeni durağın kilidi açıldı.",
          "Bu bölümün gerçek metni eklendiğinde yolculuk buradan devam edecek.",
        ],
      },
    ],
    afterDecision: [],
    learned: [
      "Bir kitabın yolculuğu adım adım ilerler.",
      "Önceki bölümü bitirmek, yeni bir kapıyı açar.",
    ],
    buguneTasi:
      "Bugün öğrendiğin bir doğruyu güzel bir cümleyle bir arkadaşınla paylaş.",
  },
  "7": createMockChapter({
    id: "7",
    title: "Mağara Arkadaşı",
    badgeName: "Tevekkül Rozeti",
    theme: "güven",
  }),
  "8": createMockChapter({
    id: "8",
    title: "Medine'de Yeni Sabah",
    badgeName: "Kardeşlik Rozeti",
    theme: "kardeşlik",
  }),
  "9": createMockChapter({
    id: "9",
    title: "Birlikte Güçlüyüz",
    badgeName: "Dayanışma Rozeti",
    theme: "dayanışma",
  }),
  "10": createMockChapter({
    id: "10",
    title: "Zor Günde Sakinlik",
    badgeName: "Teselli Rozeti",
    theme: "sakinlik",
  }),
  "11": createMockChapter({
    id: "11",
    title: "Emaneti Taşıyan",
    badgeName: "Sorumluluk Rozeti",
    theme: "sorumluluk",
  }),
  "12": createMockChapter({
    id: "12",
    title: "Kararlılık Zamanı",
    badgeName: "Kararlılık Rozeti",
    theme: "kararlılık",
  }),
  "13": createMockChapter({
    id: "13",
    title: "En Kutsal Görev",
    badgeName: "Vefa Rozeti",
    theme: "vefa",
  }),
};

const confettiPieces = [
  { left: "8%", delay: 0, color: "bg-rose-400", rotate: -20 },
  { left: "18%", delay: 0.08, color: "bg-sky-400", rotate: 34 },
  { left: "30%", delay: 0.03, color: "bg-emerald-400", rotate: 12 },
  { left: "44%", delay: 0.12, color: "bg-amber-400", rotate: -48 },
  { left: "58%", delay: 0.05, color: "bg-teal-400", rotate: 24 },
  { left: "72%", delay: 0.1, color: "bg-orange-400", rotate: -10 },
  { left: "84%", delay: 0.02, color: "bg-fuchsia-400", rotate: 52 },
  { left: "92%", delay: 0.16, color: "bg-lime-400", rotate: -36 },
];

function resolveTerm(value: string): GlossaryKey | null {
  const normalized = value.toLocaleLowerCase("tr-TR");

  if (normalized.startsWith("ebû bekir")) return "Ebû Bekir";
  if (normalized.startsWith("bilâl") || normalized.startsWith("bilal")) {
    return "Bilal";
  }
  if (normalized.startsWith("ahad")) return "Ahad";
  if (normalized.startsWith("köle")) return "köle";
  if (normalized.startsWith("servet")) return "servet";

  return null;
}

function capitalizeSentence(value: string) {
  const trimmed = value.trimStart();
  if (!trimmed) return value;
  return trimmed.charAt(0).toLocaleUpperCase("tr-TR") + trimmed.slice(1);
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function normalizeBookName(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
}

type ProgressSyncResult = {
  ok: boolean;
  message?: string;
};

function getBookKeywords(bookKey: ChapterData["bookKey"]) {
  if (bookKey === "adem") return ["adem"];
  if (bookKey === "nuh") return ["nuh"];
  return ["ebu bekir", "ebubekir"];
}

async function syncChapterProgress(chapter: ChapterData): Promise<ProgressSyncResult> {
  const profileId = window.localStorage.getItem("selected_child_profile_id");
  const bookKey = chapter.bookKey ?? "ebubekir";
  const chapterNumber =
    chapter.chapterNumber ?? Math.max(1, Number(chapter.id) - 3 || 1);
  const totalChapters = chapter.totalChapters ?? 10;

  if (!profileId) {
    return {
      ok: false,
      message: "Aktif çocuk profili bulunamadı. Lütfen tekrar giriş yap.",
    };
  }

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (booksError) {
    return {
      ok: false,
      message: "Kitap bilgisi Supabase'den okunamadı. Lütfen tekrar dene.",
    };
  }

  const matchedBook = books?.find((book) => {
    const normalizedName = normalizeBookName(book.isim ?? "");
    return getBookKeywords(bookKey).some((keyword) =>
      normalizedName.includes(keyword),
    );
  });

  if (!matchedBook) {
    return {
      ok: false,
      message:
        "Bu kitabın Supabase books tablosunda kaydı yok. Lütfen schema.sql içindeki kitap seed satırlarını SQL Editor'da çalıştır.",
    };
  }

  const { data: currentProgress, error: currentProgressError } = await supabase
    .from("user_progress")
    .select("tamamlanan_bolum_sayisi")
    .eq("profile_id", profileId)
    .eq("book_id", matchedBook.id)
    .maybeSingle();

  if (currentProgressError) {
    return {
      ok: false,
      message:
        "Mevcut ilerleme Supabase'den okunamadı. RLS izinlerini ve user_progress tablosunu kontrol et.",
    };
  }

  const completedCount = Math.min(
    totalChapters,
    Math.max(0, currentProgress?.tamamlanan_bolum_sayisi ?? 0, chapterNumber),
  );
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  const progressPayload = {
    profile_id: profileId,
    book_id: matchedBook.id,
    chapter_id: String(chapterNumber),
    tamamlanan_bolum_sayisi: completedCount,
    yuzde: progressPercent,
    bitti_mi: false,
    updated_at: new Date().toISOString(),
  };
  const { error: progressError } = await supabase.from("user_progress").upsert(
    progressPayload,
    { onConflict: "profile_id,book_id" },
  );

  if (!progressError) return { ok: true };
  if (!progressError.message.toLocaleLowerCase("tr-TR").includes("chapter_id")) {
    return {
      ok: false,
      message: `İlerleme Supabase'e yazılamadı: ${progressError.message}`,
    };
  }

  const { error: fallbackError } = await supabase.from("user_progress").upsert(
    {
      profile_id: profileId,
      book_id: matchedBook.id,
      tamamlanan_bolum_sayisi: completedCount,
      yuzde: progressPercent,
      bitti_mi: false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "profile_id,book_id" },
  );

  if (fallbackError) {
    return {
      ok: false,
      message: `İlerleme Supabase'e yazılamadı: ${fallbackError.message}`,
    };
  }

  return { ok: true };
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8 5.4v13.2c0 .9 1 1.4 1.7.9l9.2-6.6c.6-.4.6-1.4 0-1.8L9.7 4.5C9 4 8 4.5 8 5.4Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7.5 5h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3H7.5c-.8 0-1.3-.5-1.3-1.3V6.3C6.2 5.5 6.7 5 7.5 5Zm6.8 0h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3h-2.2c-.8 0-1.3-.5-1.3-1.3V6.3c0-.8.5-1.3 1.3-1.3Z" />
    </svg>
  );
}

function GlossaryText({
  text,
  activeGlossary,
  setActiveGlossary,
}: {
  text: string;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  const parts = useMemo(() => {
    const termRegex =
      /(Ebû Bekir(?:['’][\p{L}]+)?|Bilâl(?:['’][\p{L}]+)?|Bilal(?:['’][\p{L}]+)?|Ahad(?:['’][\p{L}]+)?|köle[\p{L}'’]*|servet[\p{L}'’]*)/giu;

    return text.split(termRegex).filter(Boolean);
  }, [text]);

  return (
    <>
      {parts.map((part, index) => {
        const term = resolveTerm(part);
        const glossaryId = `${term}-${index}-${part}`;
        const isActive = activeGlossary === glossaryId;

        if (!term) return <span key={`${part}-${index}`}>{part}</span>;

        return (
          <span
            key={glossaryId}
            className="relative inline-block"
            data-glossary-root
          >
            <button
              type="button"
              className="rounded-md px-0.5 font-bold text-amber-900 underline decoration-amber-600/60 decoration-wavy decoration-[1.5px] underline-offset-4 transition hover:bg-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onClick={() => setActiveGlossary(isActive ? null : glossaryId)}
            >
              {part}
            </button>

            <AnimatePresence>
              {isActive ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 6 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="absolute left-1/2 top-full z-30 mt-3 block w-72 max-w-[calc(100vw-3rem)] origin-top -translate-x-1/2 rounded-2xl border-2 border-amber-700/25 bg-gradient-to-b from-[#fdf6e0] to-[#f5e6c2] px-5 py-4 text-left shadow-[0_18px_36px_-12px_rgba(90,55,15,0.45),inset_0_1px_0_rgba(255,255,255,0.85)]"
                  role="tooltip"
                >
                  <span className="mb-1.5 flex items-center gap-2 text-base font-black leading-6 text-amber-900">
                    <span aria-hidden="true">📖</span>
                    {glossary[term].label}
                  </span>
                  <span className="block font-story text-sm font-semibold leading-6 text-stone-700">
                    {glossary[term].meaning}
                  </span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
        );
      })}
    </>
  );
}

type ReaderBookPage =
  | { key: string; type: "cover" }
  | {
      key: string;
      type: "section";
      title: string;
      paragraph: string;
      pageLabel: string;
    }
  | { key: string; type: "content"; block: BookContentBlock; index: number }
  | { key: string; type: "decision" }
  | { key: string; type: "learned" }
  | { key: string; type: "today" }
  | { key: string; type: "finish" };

const optionToneStyles: Record<DecisionOption["id"], string> = {
  a: "border-rose-300/80 bg-gradient-to-b from-rose-50 to-rose-100 text-rose-950 shadow-[0_4px_0_rgba(190,18,60,0.25)] hover:border-rose-400 hover:shadow-[0_4px_0_rgba(190,18,60,0.3),0_0_28px_rgba(251,113,133,0.45)]",
  b: "border-sky-300/80 bg-gradient-to-b from-sky-50 to-sky-100 text-sky-950 shadow-[0_4px_0_rgba(3,105,161,0.25)] hover:border-sky-400 hover:shadow-[0_4px_0_rgba(3,105,161,0.3),0_0_28px_rgba(56,189,248,0.45)]",
  c: "border-emerald-300/80 bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-950 shadow-[0_4px_0_rgba(4,120,87,0.25)] hover:border-emerald-400 hover:shadow-[0_4px_0_rgba(4,120,87,0.3),0_0_28px_rgba(52,211,153,0.45)]",
};

const optionLetterStyles: Record<DecisionOption["id"], string> = {
  a: "bg-gradient-to-b from-rose-400 to-rose-600 text-white ring-2 ring-white/80",
  b: "bg-gradient-to-b from-sky-400 to-sky-600 text-white ring-2 ring-white/80",
  c: "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white ring-2 ring-white/80",
};

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path
        d="M15.4 5.4 8.8 12l6.6 6.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path
        d="m8.6 5.4 6.6 6.6-6.6 6.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function AudioPlayer({
  audioTitle,
  currentPage,
  totalPages,
}: {
  audioTitle: string;
  currentPage: number;
  totalPages: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 380;
  const currentSeconds = Math.round((duration * progress) / 100);
  const routeProgress =
    totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 100;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.9));
    }, 650);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-full border border-amber-300/70 bg-[#fffdf6]/95 py-2 pl-2 pr-4 shadow-[0_12px_26px_-14px_rgba(146,95,25,0.45)] backdrop-blur sm:gap-4 sm:py-2.5 sm:pl-2.5 sm:pr-6">
        <button
          type="button"
          aria-label={isPlaying ? "Sesli anlatımı duraklat" : "Sesli anlatımı oynat"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((value) => !value)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#f6c14e] to-[#d9891b] text-white shadow-[0_3px_0_#a96b12,0_8px_14px_-6px_rgba(169,107,18,0.5)] transition hover:brightness-105 active:translate-y-[2px] active:shadow-[0_1px_0_#a96b12] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#fffdf6] sm:h-12 sm:w-12"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="mb-1.5 truncate text-xs font-black text-amber-950 sm:text-sm">
            {audioTitle}
          </p>

          <div className="relative h-2 overflow-hidden rounded-full bg-amber-900/10 shadow-[inset_0_1px_2px_rgba(146,95,25,0.25)]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#f6c14e] to-[#e79a22]"
              animate={{ width: `${routeProgress}%` }}
              transition={{ duration: 0.24 }}
            />
            <motion.span
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#d9891b] shadow-sm"
              animate={{ left: `${routeProgress}%` }}
              transition={{ duration: 0.24 }}
            />
          </div>

          <div className="mt-1 h-1 overflow-hidden rounded-full bg-amber-900/5">
            <motion.div
              className="h-full rounded-full bg-amber-500/70"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-0.5 border-l border-amber-200/90 pl-3 text-[11px] font-black text-amber-800/90 sm:pl-4 sm:text-xs">
          <span className="tabular-nums">
            {currentPage + 1} / {totalPages}
          </span>
          <span className="tabular-nums">
            {formatTime(currentSeconds)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReaderSlide({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-full w-full shrink-0 snap-start snap-always items-center justify-center px-3 py-3 sm:px-5 sm:py-5">
      {children}
    </section>
  );
}

function PageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative h-full max-h-full w-full max-w-5xl">
      {/* Koyu kahve cilt */}
      <div
        aria-hidden="true"
        className="absolute -inset-2.5 rounded-[26px] bg-gradient-to-b from-[#6d4529] to-[#3f2413] shadow-[0_30px_60px_-28px_rgba(120,84,45,0.35)] sm:-inset-3 sm:rounded-[30px]"
      />
      {/* Sol ve sağ sayfa yığını: ciltten taşan ince yaprak kenarları */}
      <div
        aria-hidden="true"
        className="absolute inset-y-1 -left-1 w-2 rounded-l-[14px] bg-[#f2e6c8] shadow-[-3px_0_0_#e9dab4,-6px_0_0_#dfcda1] sm:-left-1.5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-1 -right-1 w-2 rounded-r-[14px] bg-[#f2e6c8] shadow-[3px_0_0_#e9dab4,6px_0_0_#dfcda1] sm:-right-1.5"
      />

      {/* Parşömen sayfa: iki yandan içe bükülme gölgeleri */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px] bg-[radial-gradient(ellipse_at_center,#fffbee_0%,#fbf2d8_60%,#f3e4c0_100%)] shadow-[inset_22px_0_32px_-24px_rgba(146,95,25,0.38),inset_-22px_0_32px_-24px_rgba(146,95,25,0.38),inset_0_-16px_24px_-18px_rgba(146,95,25,0.3)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply"
          style={{ backgroundImage: `url("${paperNoise}")` }}
        />
        {/* İnce altın çerçeve ve köşe süsleri */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[12px] border border-amber-600/30 sm:inset-5"
        />
        <CornerOrnament className="pointer-events-none absolute left-4 top-4 h-6 w-6 text-amber-600/45 sm:left-6 sm:top-6 sm:h-9 sm:w-9" />
        <CornerOrnament className="pointer-events-none absolute right-4 top-4 h-6 w-6 rotate-90 text-amber-600/45 sm:right-6 sm:top-6 sm:h-9 sm:w-9" />
        <CornerOrnament className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rotate-180 text-amber-600/45 sm:bottom-6 sm:right-6 sm:h-9 sm:w-9" />
        <CornerOrnament className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 -rotate-90 text-amber-600/45 sm:bottom-6 sm:left-6 sm:h-9 sm:w-9" />
        {/* Sağ alt sayfa kıvrımı */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 rounded-tl-[16px] bg-[linear-gradient(315deg,#e6d2a8_0%,#f9efd8_46%,rgba(0,0,0,0)_47%)] shadow-[-2px_-2px_6px_-2px_rgba(146,95,25,0.25)] sm:h-14 sm:w-14"
        />

        <div
          className={[
            "relative flex min-h-0 flex-1 flex-col p-6 sm:p-10",
            className,
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CoverPage({ chapter }: { chapter: ChapterData }) {
  return (
    <PageFrame className="items-center justify-center gap-5 text-center sm:gap-7">
      <p className="rounded-full border border-amber-700/25 bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-800 sm:text-sm">
        {chapter.eyebrow}
      </p>

      <h1 className="max-w-2xl text-4xl font-black leading-tight text-amber-950 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] sm:text-5xl">
        {chapter.title}
      </h1>

      <div
        aria-hidden="true"
        className="flex items-center gap-3 text-amber-700/70"
      >
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-amber-700/50 sm:w-24" />
        <span className="text-lg">✦</span>
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-amber-700/50 sm:w-24" />
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
        className="flex flex-col items-center gap-3"
      >
        <img
          src="/rozet.png"
          alt=""
          aria-hidden="true"
          className="h-32 w-auto drop-shadow-[0_10px_16px_rgba(120,72,20,0.3)] sm:h-40"
        />
        <span className="max-w-xs rounded-full border border-amber-700/25 bg-amber-100/90 px-5 py-1.5 text-base font-black leading-6 text-amber-900 sm:text-lg">
          {chapter.badgeName}
        </span>
      </motion.div>

      <p className="font-story text-sm font-semibold italic leading-6 text-amber-800/90 sm:text-base">
        Bu bölümü bitirdiğinde bu rozet senin olacak. Aşağıdaki düğmeye bas ve
        maceraya başla!
      </p>
    </PageFrame>
  );
}

function StoryPage({
  title,
  paragraph,
  pageLabel,
  activeGlossary,
  setActiveGlossary,
}: {
  title: string;
  paragraph: string;
  pageLabel: string;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  const isDialogue = paragraph.trim().startsWith("—");

  return (
    <PageFrame className="items-center text-center">
      <div className="w-full">
        <TitleCartouche>{title}</TitleCartouche>
        <div
          aria-hidden="true"
          className="mt-2.5 flex items-center justify-center gap-2 text-amber-500/80"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60 sm:w-20" />
          <span className="text-xs leading-none">☾</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60 sm:w-20" />
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <p
          className={[
            "max-w-2xl font-story text-lg font-semibold leading-8 md:text-xl md:leading-9",
            isDialogue
              ? "font-semibold italic text-amber-900"
              : "text-stone-800",
          ].join(" ")}
        >
          <GlossaryText
            text={paragraph}
            activeGlossary={activeGlossary}
            setActiveGlossary={setActiveGlossary}
          />
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div
          aria-hidden="true"
          className="flex items-center gap-2 text-amber-500/80"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/60 sm:w-14" />
          <StarSpark className="h-3 w-3" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/60 sm:w-14" />
        </div>
        <span className="font-story text-xs font-semibold italic tracking-[0.3em] text-amber-800/70 sm:text-sm">
          {pageLabel}
        </span>
      </div>
    </PageFrame>
  );
}

function ContentBlockView({
  block,
  index,
  activeGlossary,
  setActiveGlossary,
}: {
  block: BookContentBlock;
  index: number;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  if (block.type === "image") {
    return (
      <figure className="flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden">
        <img
          src={block.src}
          alt={block.alt}
          className="mx-auto max-h-[44vh] w-full -rotate-1 rounded-xl border-[6px] border-white object-contain shadow-[0_16px_32px_-12px_rgba(90,55,15,0.45)] sm:max-h-[52vh]"
        />
        {block.caption ? (
          <figcaption className="mx-auto mt-5 max-w-2xl text-center font-story text-sm font-semibold italic leading-6 text-amber-900 md:text-base md:leading-7">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "interactive_word") {
    const glossaryId = `data-word-${index}-${block.word}`;
    const isActive = activeGlossary === glossaryId;

    return (
      <p className="max-w-2xl text-center font-story text-lg font-semibold leading-8 text-stone-800 md:text-xl md:leading-9">
        {block.before ? <span>{block.before}</span> : null}
        <span className="relative inline-block" data-glossary-root>
          <button
            type="button"
            className="rounded-md px-0.5 font-bold text-emerald-800 underline decoration-emerald-600/60 decoration-wavy decoration-[1.5px] underline-offset-4 transition hover:bg-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onClick={() => setActiveGlossary(isActive ? null : glossaryId)}
          >
            {block.word}
          </button>

          <AnimatePresence>
            {isActive ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 6 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="absolute left-1/2 top-full z-30 mt-3 block w-72 max-w-[calc(100vw-3rem)] origin-top -translate-x-1/2 rounded-2xl border-2 border-emerald-700/25 bg-gradient-to-b from-[#f2fbef] to-[#e2f3d9] px-5 py-4 text-left shadow-[0_18px_36px_-12px_rgba(6,78,59,0.35),inset_0_1px_0_rgba(255,255,255,0.85)]"
                role="tooltip"
              >
                <span className="mb-1.5 flex items-center gap-2 text-base font-black leading-6 text-emerald-900">
                  <span aria-hidden="true">📖</span>
                  {block.word}
                </span>
                <span className="block font-story text-sm font-semibold leading-6 text-emerald-950/80">
                  {block.meaning}
                </span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </span>
        {block.after ? <span>{block.after}</span> : null}
      </p>
    );
  }

  return (
    <p className="max-w-2xl text-center font-story text-lg font-semibold leading-8 text-stone-800 md:text-xl md:leading-9">
      <GlossaryText
        text={block.text}
        activeGlossary={activeGlossary}
        setActiveGlossary={setActiveGlossary}
      />
    </p>
  );
}

function ContentPage({
  block,
  index,
  activeGlossary,
  setActiveGlossary,
}: {
  block: BookContentBlock;
  index: number;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  return (
    <PageFrame>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <ContentBlockView
          block={block}
          index={index}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      </div>
    </PageFrame>
  );
}

function DecisionPage({
  chapter,
  activeGlossary,
  setActiveGlossary,
  selectedOption,
  setSelectedOption,
  hasCorrectAnswer,
  isCorrectSelection,
  selectedWrongOption,
}: {
  chapter: ChapterData;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
  selectedOption: DecisionOption["id"] | null;
  setSelectedOption: (value: DecisionOption["id"]) => void;
  hasCorrectAnswer: boolean;
  isCorrectSelection: boolean;
  selectedWrongOption: boolean;
}) {
  if (!chapter.decision) return null;

  return (
    <PageFrame>
      <AnimatePresence>
        {selectedOption ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiPieces.map((piece) => (
              <motion.span
                key={`${piece.left}-${piece.delay}`}
                initial={{ y: -18, opacity: 0, rotate: 0 }}
                animate={{
                  y: 128,
                  opacity: [0, 1, 1, 0],
                  rotate: piece.rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.15,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
                style={{ left: piece.left }}
                className={`absolute top-0 h-3 w-2 rounded-sm ${piece.color}`}
              />
            ))}
          </div>
        ) : null}
      </AnimatePresence>

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 text-center sm:gap-5">
        <p className="rounded-full border border-emerald-700/25 bg-emerald-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 sm:text-sm">
          🎯 Sen Olsaydın?
        </p>
        <h2 className="text-2xl font-black text-amber-950 md:text-3xl">
          {chapter.decisionTitle}
        </h2>
        <p className="max-w-2xl font-story text-lg font-semibold leading-relaxed text-stone-800 md:text-xl md:leading-8">
          <GlossaryText
            text={chapter.decision.question}
            activeGlossary={activeGlossary}
            setActiveGlossary={setActiveGlossary}
          />
        </p>

        <div className="grid w-full max-w-2xl gap-3 sm:gap-3.5">
          {chapter.decision.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = chapter.decision?.correctOption === option.id;
            const isWrongSelected =
              hasCorrectAnswer && isSelected && !isCorrectOption;
            const isDimmed =
              selectedOption !== null && isCorrectSelection && !isSelected;
            const isAnsweredCorrectly =
              selectedOption !== null && isCorrectSelection;

            return (
              <motion.button
                key={option.id}
                type="button"
                disabled={isAnsweredCorrectly}
                onClick={() => setSelectedOption(option.id)}
                whileHover={isAnsweredCorrectly ? undefined : { scale: 1.03 }}
                whileTap={isAnsweredCorrectly ? undefined : { scale: 0.97 }}
                className={[
                  "grid grid-cols-[3rem_1fr] items-center gap-3 rounded-3xl border-2 px-4 py-3.5 text-left text-base font-black leading-6 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#f9eecb] disabled:cursor-default md:grid-cols-[3.25rem_1fr] md:px-5 md:py-4 md:text-lg md:leading-7",
                  isSelected && isCorrectSelection
                    ? "border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-950 shadow-[0_4px_0_rgba(4,120,87,0.35),0_0_32px_rgba(52,211,153,0.5)]"
                    : isWrongSelected
                      ? "border-amber-500 bg-gradient-to-b from-amber-100 to-amber-200 text-amber-950 shadow-[0_4px_0_rgba(180,83,9,0.3)]"
                      : optionToneStyles[option.id],
                  isDimmed ? "opacity-50" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-10 w-10 place-items-center rounded-full text-lg font-black uppercase shadow-md md:h-11 md:w-11",
                    optionLetterStyles[option.id],
                  ].join(" ")}
                >
                  {option.id}
                </span>
                <span>{option.text}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedWrongOption ? (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.24 }}
              className="w-full max-w-2xl rounded-2xl border-2 border-amber-600/30 bg-gradient-to-b from-amber-50 to-amber-100 px-5 py-3.5 shadow-[0_10px_20px_-10px_rgba(180,83,9,0.35)]"
              aria-live="polite"
            >
              <p className="text-sm font-bold leading-6 text-amber-950 md:text-base">
                💭 Güzel düşündün. Bir kez daha dene: kahramanımızın kalbine en
                çok hangisi yakışırdı?
              </p>
            </motion.div>
          ) : null}

          {selectedOption && isCorrectSelection ? (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.24 }}
              className="w-full max-w-2xl rounded-2xl border-2 border-emerald-600/30 bg-gradient-to-b from-emerald-50 to-emerald-100 px-5 py-3.5 shadow-[0_10px_20px_-10px_rgba(4,120,87,0.35)]"
              aria-live="polite"
            >
              <p className="text-sm font-bold leading-6 text-emerald-950 md:text-base">
                🌟{" "}
                {chapter.decision.correctFeedback ??
                  "Harika bir karar! Aşağıdaki düğmeyle sayfayı çevir ve sonucunu gör."}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PageFrame>
  );
}

function LearnedPage({
  chapter,
  activeGlossary,
  setActiveGlossary,
}: {
  chapter: ChapterData;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  return (
    <PageFrame className="items-center justify-center gap-6 sm:gap-8">
      <h2 className="text-center text-3xl font-black text-amber-950 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] md:text-4xl">
        Ne Öğrendik?
      </h2>
      <ul className="grid w-full max-w-2xl gap-4 sm:gap-5">
        {chapter.learned.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.35 }}
            className="flex items-center gap-3.5 font-story text-base font-semibold leading-7 text-stone-800 md:text-lg md:leading-8"
          >
            <img
              src="/ne-ogrendik-icon.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 shrink-0 md:h-9 md:w-9"
            />
            <span className="text-left">
              <GlossaryText
                text={capitalizeSentence(item)}
                activeGlossary={activeGlossary}
                setActiveGlossary={setActiveGlossary}
              />
            </span>
          </motion.li>
        ))}
      </ul>
    </PageFrame>
  );
}

function TodayPage({
  chapter,
  activeGlossary,
  setActiveGlossary,
}: {
  chapter: ChapterData;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  if (!chapter.buguneTasi) return null;

  return (
    <PageFrame className="items-center justify-center gap-5 text-center sm:gap-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        aria-hidden="true"
      >
        <img
          src="/ne-ogrendik-icon.png"
          alt=""
          className="h-16 w-16 drop-shadow-[0_6px_10px_rgba(120,72,20,0.25)] sm:h-20 sm:w-20"
        />
      </motion.div>

      <h2 className="text-3xl font-black text-emerald-900 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] md:text-4xl">
        Bugüne Taşı
      </h2>

      <p className="max-w-2xl font-story text-lg font-semibold leading-8 text-stone-800 md:text-xl md:leading-9">
        <GlossaryText
          text={chapter.buguneTasi}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      </p>

      <p className="font-story text-sm font-semibold italic text-emerald-800/80">
        Bu görev, hikayeden gerçek hayata uzanan küçük bir köprü. 🌱
      </p>
    </PageFrame>
  );
}

function FinishPage({
  chapter,
  badgeEarned,
  completionError,
}: {
  chapter: ChapterData;
  badgeEarned: boolean;
  completionError: string | null;
}) {
  return (
    <PageFrame className="items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {badgeEarned ? (
          <motion.div
            key="badge"
            initial={{ opacity: 0, scale: 0.86, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex max-w-sm flex-col items-center gap-4"
          >
            <img
              src="/rozet.png"
              alt=""
              aria-hidden="true"
              className="h-28 w-auto drop-shadow-[0_10px_16px_rgba(120,72,20,0.3)] sm:h-32"
            />
            <span className="max-w-xs rounded-full border border-amber-700/25 bg-amber-100/90 px-5 py-1.5 text-sm font-black leading-5 text-amber-900 sm:text-base">
              {chapter.badgeName}
            </span>
            <h2 className="text-3xl font-black text-emerald-900">
              Rozetin Hazır!
            </h2>
            <p className="font-story text-base font-semibold leading-7 text-stone-800 md:text-lg md:leading-8">
              Bu bölümdeki yolculuğu tamamladın. Rozetin haritana işlenmeye
              hazır.
            </p>
            {chapter.mapNote ? (
              <p className="font-story text-sm font-semibold italic leading-6 text-emerald-900 md:text-base">
                {chapter.mapNote}
              </p>
            ) : null}
          </motion.div>
        ) : (
          <motion.div
            key="finish"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto flex max-w-xl flex-col items-center gap-4"
          >
            <span aria-hidden="true" className="text-5xl drop-shadow-sm sm:text-6xl">
              🗝️
            </span>
            <h2 className="text-3xl font-black text-emerald-900 drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] md:text-4xl">
              Rozet Kapısı
            </h2>
            <p className="font-story text-lg font-semibold leading-relaxed text-stone-800 md:text-xl md:leading-8">
              <span className="font-black text-amber-900">
                {chapter.badgeName}
              </span>{" "}
              haritana eklenmeye hazır. Aşağıdaki büyük düğmeye basarak bölümü
              tamamla!
            </p>
            {completionError ? (
              <p className="rounded-2xl border-2 border-rose-300/70 bg-gradient-to-b from-rose-50 to-rose-100 px-5 py-3.5 text-sm font-semibold leading-6 text-rose-800">
                {completionError}
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </PageFrame>
  );
}

function buildReaderPages(
  chapter: ChapterData,
  shouldShowCompletion: boolean,
): ReaderBookPage[] {
  const pages: ReaderBookPage[] = [{ key: "cover", type: "cover" }];

  if (chapter.contentBlocks) {
    chapter.contentBlocks.forEach((block, index) => {
      pages.push({
        key: `content-${index}-${block.type}`,
        type: "content",
        block,
        index,
      });
    });
  } else {
    chapter.beforeDecision.forEach((section, sectionIndex) => {
      section.paragraphs.forEach((paragraph, paragraphIndex) => {
        pages.push({
          key: `before-${sectionIndex}-${paragraphIndex}`,
          type: "section",
          title: section.title,
          paragraph,
          pageLabel: `${paragraphIndex + 1}/${section.paragraphs.length}`,
        });
      });
    });
  }

  if (chapter.decision) {
    pages.push({ key: "decision", type: "decision" });
  }

  if (shouldShowCompletion) {
    chapter.afterDecision.forEach((section, sectionIndex) => {
      section.paragraphs.forEach((paragraph, paragraphIndex) => {
        pages.push({
          key: `after-${sectionIndex}-${paragraphIndex}`,
          type: "section",
          title: section.title,
          paragraph,
          pageLabel: `${paragraphIndex + 1}/${section.paragraphs.length}`,
        });
      });
    });

    pages.push({ key: "learned", type: "learned" });

    if (chapter.buguneTasi) {
      pages.push({ key: "today", type: "today" });
    }

    pages.push({ key: "finish", type: "finish" });
  }

  return pages;
}

export default function ReaderPage() {
  const router = useRouter();
  const params = useParams<{ chapterId: string }>();
  const chapter = useMemo(
    () =>
      adaptDataChapter(params.chapterId) ??
      chapters[params.chapterId as ChapterData["id"]] ??
      chapters["4"],
    [params.chapterId],
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pendingResultAdvance = useRef(false);
  const [activeGlossary, setActiveGlossary] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<DecisionOption["id"] | null>(
    null,
  );
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [isReturningToMap, setIsReturningToMap] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const hasDecision = Boolean(chapter.decision);
  const shouldShowCompletion = !hasDecision || isResultOpen;
  const hasCorrectAnswer = Boolean(chapter.decision?.correctOption);
  const isCorrectSelection =
    !chapter.decision?.correctOption ||
    selectedOption === chapter.decision.correctOption;
  const selectedWrongOption =
    hasCorrectAnswer && selectedOption !== null && !isCorrectSelection;
  const readerPages = useMemo(
    () => buildReaderPages(chapter, shouldShowCompletion),
    [chapter, shouldShowCompletion],
  );

  const goToPage = useCallback(
    (pageIndex: number) => {
      const maxIndex = Math.max(0, readerPages.length - 1);
      const nextIndex = Math.min(Math.max(pageIndex, 0), maxIndex);
      const slider = sliderRef.current;

      if (slider) {
        slider.scrollTo({
          left: slider.clientWidth * nextIndex,
          behavior: "smooth",
        });
      }

      setActivePage(nextIndex);
      setActiveGlossary(null);
    },
    [readerPages.length],
  );

  useEffect(() => {
    function closeGlossaryOnOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;
      if (target.closest("[data-glossary-root]")) return;

      setActiveGlossary(null);
    }

    document.addEventListener("pointerdown", closeGlossaryOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeGlossaryOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    setActiveGlossary(null);
    setSelectedOption(null);
    setIsResultOpen(false);
    setBadgeEarned(false);
    setIsReturningToMap(false);
    setCompletionError(null);
    setActivePage(0);
    sliderRef.current?.scrollTo({ left: 0 });
  }, [chapter.id]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let frameId: number | null = null;
    const updateActivePage = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const pageWidth = slider.clientWidth || 1;
        const nextIndex = Math.round(slider.scrollLeft / pageWidth);

        setActivePage(
          Math.min(Math.max(nextIndex, 0), Math.max(readerPages.length - 1, 0)),
        );
      });
    };

    slider.addEventListener("scroll", updateActivePage, { passive: true });
    updateActivePage();

    return () => {
      slider.removeEventListener("scroll", updateActivePage);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [readerPages.length]);

  useEffect(() => {
    if (activePage <= readerPages.length - 1) return;
    goToPage(readerPages.length - 1);
  }, [activePage, goToPage, readerPages.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToPage(activePage + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPage(activePage - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePage, goToPage]);

  useEffect(() => {
    if (!pendingResultAdvance.current || !shouldShowCompletion) return;

    pendingResultAdvance.current = false;
    window.setTimeout(() => {
      goToPage(activePage + 1);
    }, 40);
  }, [activePage, goToPage, shouldShowCompletion]);

  async function finishChapterAndReturnToMap() {
    setCompletionError(null);
    setBadgeEarned(true);
    setIsReturningToMap(true);
    const syncResult = await syncChapterProgress(chapter);

    if (!syncResult.ok) {
      setBadgeEarned(false);
      setIsReturningToMap(false);
      setCompletionError(
        syncResult.message ??
          "Rozet Supabase'e kaydedilemedi. Lütfen tekrar dene.",
      );
      return;
    }

    window.setTimeout(() => {
      const bookKey = chapter.bookKey ?? "ebubekir";
      const query = new URLSearchParams({
        completedBook: bookKey,
        chapter: chapter.id,
        badge: chapter.badgeName,
      });

      router.push(`/map?${query.toString()}`);
    }, 1700);
  }

  function openResultPages() {
    pendingResultAdvance.current = true;
    setIsResultOpen(true);
  }

  function renderPage(page: ReaderBookPage) {
    if (page.type === "cover") {
      return <CoverPage chapter={chapter} />;
    }

    if (page.type === "content") {
      return (
        <ContentPage
          block={page.block}
          index={page.index}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      );
    }

    if (page.type === "section") {
      return (
        <StoryPage
          title={page.title}
          paragraph={page.paragraph}
          pageLabel={page.pageLabel}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      );
    }

    if (page.type === "decision") {
      return (
        <DecisionPage
          chapter={chapter}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          hasCorrectAnswer={hasCorrectAnswer}
          isCorrectSelection={isCorrectSelection}
          selectedWrongOption={selectedWrongOption}
        />
      );
    }

    if (page.type === "learned") {
      return (
        <LearnedPage
          chapter={chapter}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      );
    }

    if (page.type === "today") {
      return (
        <TodayPage
          chapter={chapter}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
        />
      );
    }

    return (
      <FinishPage
        chapter={chapter}
        badgeEarned={badgeEarned}
        completionError={completionError}
      />
    );
  }

  const currentPageData = readerPages[Math.min(activePage, readerPages.length - 1)];
  const isLastPage = activePage >= readerPages.length - 1;

  // Kitap formunun altındaki güvertede gösterilecek bağlama duyarlı ana aksiyon.
  let primaryAction: {
    label: string;
    onClick: () => void;
    disabled: boolean;
    tone: "amber" | "emerald";
  };

  if (currentPageData?.type === "cover") {
    primaryAction = {
      label: "Macerayı Başlat",
      onClick: () => goToPage(activePage + 1),
      disabled: false,
      tone: "amber",
    };
  } else if (currentPageData?.type === "decision" && !isResultOpen) {
    const canTurnPage = selectedOption !== null && isCorrectSelection;
    primaryAction = {
      label: canTurnPage ? "Sayfayı Çevir" : "Önce Kararını Ver",
      onClick: openResultPages,
      disabled: !canTurnPage,
      tone: "emerald",
    };
  } else if (currentPageData?.type === "finish") {
    primaryAction = {
      label: isReturningToMap
        ? "Rozet Kaydediliyor..."
        : "Bölümü Bitir ve Rozetini Kazan",
      onClick: finishChapterAndReturnToMap,
      disabled: isReturningToMap,
      tone: "emerald",
    };
  } else {
    primaryAction = {
      label: "Sayfayı Çevir",
      onClick: () => goToPage(activePage + 1),
      disabled: isLastPage,
      tone: "amber",
    };
  }

  const primaryToneClass =
    primaryAction.tone === "emerald"
      ? "from-emerald-500 via-emerald-600 to-emerald-700 text-emerald-50 shadow-[0_5px_0_#065f46,0_18px_30px_-12px_rgba(6,95,70,0.55)] active:shadow-[0_2px_0_#065f46]"
      : "from-[#f6c14e] via-[#eda32b] to-[#d9891b] text-white shadow-[0_5px_0_#a96b12,0_18px_30px_-12px_rgba(169,107,18,0.55)] active:shadow-[0_2px_0_#a96b12]";

  return (
    <main
      className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#f6ead2] text-stone-900"
    >
      <BackdropScene />

      <AudioPlayer
        audioTitle={chapter.audioTitle}
        currentPage={activePage}
        totalPages={readerPages.length}
      />

      <div className="relative min-h-0 flex-1">
        <div
          ref={sliderRef}
          className="scrollbar-none flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
        >
          {readerPages.map((page) => (
            <ReaderSlide key={page.key}>{renderPage(page)}</ReaderSlide>
          ))}
        </div>
      </div>

      {/* Kontrol güvertesi: kitabın hemen altında, sayfa çevirme ve ana aksiyon */}
      <div className="relative z-40 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2 sm:pt-3">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 sm:gap-6">
          <button
            type="button"
            title="Önceki sayfa"
            aria-label="Önceki sayfa"
            disabled={activePage === 0}
            onClick={() => goToPage(activePage - 1)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#e9c887] bg-[#fdf6e1] text-amber-700 shadow-[0_4px_0_#d9b06a,0_10px_18px_-10px_rgba(169,107,18,0.45)] transition hover:bg-[#fffaf0] active:translate-y-[2px] active:shadow-[0_1px_0_#d9b06a] focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:pointer-events-none disabled:opacity-30 sm:h-14 sm:w-14"
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            disabled={primaryAction.disabled}
            onClick={primaryAction.onClick}
            className={[
              "min-w-0 rounded-full bg-gradient-to-b px-6 py-3.5 text-base font-black leading-6 transition hover:brightness-110 active:translate-y-[3px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#f2e3c0] sm:px-9 sm:py-4 sm:text-lg",
              primaryAction.disabled
                ? "cursor-not-allowed from-stone-300 via-stone-300 to-stone-400 text-stone-500 shadow-[0_5px_0_#a8a29e]"
                : primaryToneClass,
            ].join(" ")}
          >
            {primaryAction.label}
          </button>

          <button
            type="button"
            title="Sonraki sayfa"
            aria-label="Sonraki sayfa"
            disabled={isLastPage}
            onClick={() => goToPage(activePage + 1)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#e9c887] bg-[#fdf6e1] text-amber-700 shadow-[0_4px_0_#d9b06a,0_10px_18px_-10px_rgba(169,107,18,0.45)] transition hover:bg-[#fffaf0] active:translate-y-[2px] active:shadow-[0_1px_0_#d9b06a] focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:pointer-events-none disabled:opacity-30 sm:h-14 sm:w-14"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isReturningToMap ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-amber-950/30 px-5 backdrop-blur-sm"
            aria-live="polite"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="w-full max-w-sm rounded-3xl border-2 border-amber-700/25 bg-gradient-to-b from-[#fdf6e0] to-[#f5e6c2] p-7 text-center shadow-[0_28px_56px_-16px_rgba(56,32,8,0.55),inset_0_1px_0_rgba(255,255,255,0.85)]"
            >
              <motion.img
                src="/rozet.png"
                alt=""
                aria-hidden="true"
                initial={{ rotate: -8, scale: 0.75 }}
                animate={{ rotate: 0, scale: [0.75, 1.08, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mx-auto mb-3 h-28 w-auto drop-shadow-[0_10px_16px_rgba(120,72,20,0.3)]"
              />
              <p className="mx-auto mb-2 w-fit max-w-full rounded-full border border-amber-700/25 bg-amber-100/90 px-5 py-1.5 text-sm font-black leading-5 text-amber-900">
                {chapter.badgeName}
              </p>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-2xl font-black text-emerald-900"
              >
                🗺️ Haritana İşleniyor
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="mt-2 font-story text-base font-semibold leading-7 text-stone-800"
              >
                {chapter.returnMessage}
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
