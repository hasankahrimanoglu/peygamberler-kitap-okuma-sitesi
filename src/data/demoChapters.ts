import type { BookContentBlock, GorevTanimi } from "./books";
import { books, getBookChapterByRouteId } from "./books";

// Faz 3'te reader sayfasından taşındı: gerçek içerik books.ts'e geçene kadar
// yaşayacak demo bölümler + sözlük. Reader yalnızca bu modülden okur.

export type GlossaryKey = "köle" | "servet" | "Ahad" | "Bilal" | "Ebû Bekir";

export type ReadingSection = {
  title: string;
  paragraphs: string[];
};

export type DecisionOption = {
  id: "a" | "b" | "c";
  text: string;
  /** Bu şık seçildiğinde gösterilen geri bildirim (ESKİ akış — anlık). */
  feedback?: string;
  /** "Seçimini Karşılaştır" metni (YENİ akış — yalnız seçilen şık gösterilir). */
  comparison?: string;
};

export type ChapterData = {
  id: string;
  bookKey?: "adem" | "nuh" | "ebubekir";
  bookName?: string;
  chapterNumber?: number;
  totalChapters?: number;
  eyebrow: string;
  title: string;
  /** Numarasız yalın bölüm adı — üst ortadaki başlıkta kullanılır */
  bolumAdi: string;
  /** Kapak sayfasındaki kısa tanıtım cümlesi (books.ts `ozet` alanından) */
  ozet?: string;
  audioTitle: string;
  decisionTitle: string;
  badgeName: string;
  returnMessage: string;
  contentBlocks?: BookContentBlock[];
  /**
   * "Hikâye Devam Ediyor" blokları (YENİ akış — KARAR 15 Tem 2026).
   * Dolu olması bölümün yeni akışla okunacağını belirtir: seçim sonrası
   * doğru/yanlış açıklanmaz; devam + Seçimini Karşılaştır sayfaları açılır.
   */
  continuationBlocks?: BookContentBlock[];
  beforeDecision: ReadingSection[];
  decision?: {
    question: string;
    options: DecisionOption[];
    correctOption?: DecisionOption["id"];
    correctFeedback?: string;
    /** YENİ akışta seçim onaylanınca gösterilen nötr yönlendirme notu. */
    afterChoiceNote?: string;
  };
  afterDecision: ReadingSection[];
  learned: string[];
  buguneTasi?: string;
  /** YENİ koşullu görev (Faz 6.1) — varsa Bugüne Taşı sayfası bundan beslenir */
  gorev?: GorevTanimi;
  mapNote?: string;
};

export const glossary: Record<GlossaryKey, { label: string; meaning: string }> = {
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
    bolumAdi: title,
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
    bolumAdi: title,
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

export const demoChapters: Record<string, ChapterData> = {
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
  bolumAdi: "Özgürlüğe Kavuşanlar",
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
    bolumAdi: "Sabır Yılları",
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
    bolumAdi: "O Söylüyorsa Doğrudur",
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

export function resolveTerm(value: string): GlossaryKey | null {
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

export function adaptDataChapter(routeId: string): ChapterData | null {
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
    bolumAdi: chapter.title,
    ozet: chapter.ozet,
    audioTitle: chapter.audioUrl
      ? `${book.title} sesli anlatım`
      : `${book.title} Bölüm ${chapter.id} Sesli Anlatım`,
    decisionTitle: chapter.question?.title ?? chapter.title,
    badgeName: chapter.badgeName,
    returnMessage: `${chapter.badgeName} haritana işleniyor...`,
    contentBlocks: chapter.paragraphs,
    continuationBlocks: chapter.continuationParagraphs,
    beforeDecision: [],
    decision:
      chapter.has_question && chapter.question
        ? {
            question: chapter.question.prompt,
            options: chapter.question.options,
            correctOption: chapter.question.correctOption,
            correctFeedback: chapter.question.feedback,
            afterChoiceNote: chapter.question.afterChoiceNote,
          }
        : undefined,
    afterDecision: [],
    learned: chapter.learned,
    buguneTasi: chapter.buguneTasi,
    gorev: chapter.gorev,
  };
}

/**
 * Rozet Kapısı'ndaki yönlendirme cümlesi için bir sonraki bölümün yalın adını
 * bulur. Son bölümdeyse null döner (o zaman final testine yönlendirilir).
 */
export function sonrakiBolumAdiniBul(chapter: ChapterData): string | null {
  const chapterNumber = chapter.chapterNumber ?? 1;
  const totalChapters = chapter.totalChapters ?? 1;

  if (chapterNumber >= totalChapters) return null;

  // Gerçek içerikli kitaplar books.ts'ten okunur
  const book = books.find((item) => item.routePrefix === chapter.bookKey);
  if (book) return book.chapters[chapterNumber]?.title ?? null;

  // Demo bölümler (Hz. Ebû Bekir) ardışık sayısal rota kimliği kullanır
  const sonraki = demoChapters[String(Number(chapter.id) + 1)];
  return sonraki?.bolumAdi ?? null;
}
