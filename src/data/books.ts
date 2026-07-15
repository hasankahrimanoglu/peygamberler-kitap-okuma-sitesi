export type BookContentBlock =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "interactive_word";
      before?: string;
      word: string;
      meaning: string;
      after?: string;
    }
  | {
      // Tanık Sayfası: olayları hikâyedeki bir çocuğun günlüğünden anlatan
      // özel sayfa (KITAP-ICERIK-SABLONU.md 2.3). Kurgusal tanıkta sistem
      // sayfanın altına "Bu sayfadaki çocuk hayalîdir..." notunu gösterir.
      type: "witness";
      witnessName: string;
      witnessLabel: string;
      body: string;
      isFictional: boolean;
    };

export type BookQuestionOption = {
  id: "a" | "b" | "c";
  text: string;
  /** Bu şık seçildiğinde gösterilen geri bildirim (ESKİ akış — anlık). */
  feedback?: string;
  /**
   * "Seçimini Karşılaştır" metni (YENİ akış — KARAR 15 Tem 2026, Faz 6.1).
   * Hikâye devamı bittikten sonra yalnızca seçilen şıkkınki gösterilir.
   */
  comparison?: string;
};

export type BookQuestion = {
  title: string;
  prompt: string;
  options: BookQuestionOption[];
  correctOption?: BookQuestionOption["id"];
  /** Doğru şık seçildiğindeki kutlama metni (ESKİ akış). */
  feedback?: string;
  /**
   * YENİ akışta seçim onaylanınca gösterilen nötr yönlendirme
   * ("Cevabını aklında tut..."). Doğru/yanlış AÇIKLANMAZ.
   */
  afterChoiceNote?: string;
};

/**
 * "Bugüne Taşı" görev tanımı (KOŞULLU — yalnızca uygun bölümlerde;
 * PROJE-MODELI.md 4.1/17). Durum takibi Supabase `profile_tasks`'tadır;
 * tanım burada statik kalır.
 */
export type GorevTanimi = {
  /** {kitapKey}-{bölümNo}-{kısa-ad} — profile_tasks.task_id ile eşleşir */
  id: string;
  ad: string;
  kategori: string;
  aciklama: string;
  sure: string;
  olcut: string;
  guvenlikNotu?: string;
};

export type BookChapter = {
  id: string;
  title: string;
  /** Bölüm listelerinde başlığın altında görünen kısa açıklama */
  ozet?: string;
  audioUrl: string;
  badgeName: string;
  /** YENİ akışta "Hikâye — 1. Kısım"; eski akışta bölümün tüm metni */
  paragraphs: BookContentBlock[];
  /**
   * "Hikâye Devam Ediyor" (YENİ akış — KARAR 15 Tem 2026). Dolu olması
   * bölümün yeni akışla (karar noktası + Seçimini Karşılaştır) okunacağını
   * belirtir; seçim ne olursa olsun metin aynıdır (dallanma yok).
   */
  continuationParagraphs?: BookContentBlock[];
  has_question: boolean;
  question?: BookQuestion;
  learned: string[];
  /** ESKİ tek cümlelik görev — yeni içerikte yerini `gorev` alır */
  buguneTasi?: string;
  /** YENİ koşullu görev (her bölümde bulunmaz) */
  gorev?: GorevTanimi;
};

export type BookDefinition = {
  id: string;
  routePrefix: string;
  title: string;
  eyebrow: string;
  chapters: BookChapter[];
};

export type ParentReportVariant = "high" | "mixed" | "low";

export type ParentFaqItem = {
  /** Çocuğun sorabileceği zor soru */
  question: string;
  /** Veliye sakin yaklaşım önerisi */
  approach: string;
};

export type ParentReportBook = {
  key: string;
  title: string;
  keywords: string[];
  totalQuizQuestions: number;
  /**
   * Panelde gösterilen özet. S5 (Sen Olsaydın cevap kaydı) gelene kadar sistem
   * varsayılan olarak `mixed` varyantını gösterir; bu alan o metne sabitlenir.
   */
  parent_summary: string;
  /**
   * Üç veli özeti varyantı. S5 geldiğinde sistem çocuğun doğru şık oranına göre
   * (≥%70 high, %40-70 mixed, <%40 low) birini seçecek; şimdilik veride bekler.
   */
  parent_summary_variants?: Record<ParentReportVariant, string>;
  chat_questions: string[];
  /** "Çocuğunuz sorarsa" — zor soru + veliye yaklaşım önerisi (4.3). */
  parent_faq?: ParentFaqItem[];
};

export const parentReportBooks: ParentReportBook[] = [
  {
    key: "adem",
    title: "Hz. Âdem",
    keywords: ["adem"],
    totalQuizQuestions: 8,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz Hz. Âdem yolculuğunda öğrenme, sorumluluk, tövbe, umut ve öfke anında yardım isteme değerleriyle tanıştı. Bazı kararlarında bölümün değerini yakaladı, bazılarında farklı yolları değerlendirdi. Seçimlerini birlikte konuşmanız keşfini derinleştirebilir.",
    parent_summary_variants: {
      high: "Çocuğunuz Hz. Âdem yolculuğunda öğrenme, alçak gönüllülük, sorumluluk, özdenetim ve hata sonrası onarım değerlerini kararlarına güçlü biçimde yansıttı. Hikâyedeki güvenilir bilgi ile yaygın anlatılar arasındaki farkı da dikkatle takip etti.",
      mixed: "Çocuğunuz Hz. Âdem yolculuğunda öğrenme, sorumluluk, tövbe, umut ve öfke anında yardım isteme değerleriyle tanıştı. Bazı kararlarında bölümün değerini yakaladı, bazılarında farklı yolları değerlendirdi. Seçimlerini birlikte konuşmanız keşfini derinleştirebilir.",
      low: "Çocuğunuz bu yolculuktaki öğrenme, güven, sorumluluk, tövbe ve özdenetim değerleriyle tanıştı. Karar anlarını birlikte yeniden okumak ve seçeneklerin sonuçları üzerine konuşmak, kıssanın mesajını pekiştirmesine yardımcı olabilir.",
    },
    chat_questions: [
      "Hz. Âdem'in hikâyesinde hata yapmaktan daha önemli olan hangi davranışı fark ettin?",
      "Bilmediğimiz bir ayrıntıyı gerçekmiş gibi söylememek neden önemlidir?",
      "Öfkelendiğinde durmana ve sakinleşmene hangi davranışlar yardımcı olabilir?",
    ],
    parent_faq: [
      {
        question: "Yasak meyve elma mıydı?",
        approach: "Kur'an ağacın veya meyvenin türünü açıklamaz. “Bazı resimlerde elma gösterilir, bazı anlatılarda başka bitkiler söylenir; fakat biz kesin olarak bilmiyoruz. Önemli olan meyvenin adı değil, Allah'ın uyarısına güvenmekti,” diyebilirsiniz.",
      },
      {
        question: "Allah onları bağışladıysa neden yeryüzüne geldiler?",
        approach: "Yeryüzünün daha en başta insanın sorumluluk taşıyacağı yer olarak bildirildiğini anlatın. Hz. Âdem ile Hz. Havva hata ettikten sonra tövbe etti, Allah da tövbelerini kabul edip onlara doğru yolu gösterdi. Yeryüzü hayatını yalnızca ceza sözüyle açıklamayın.",
      },
      {
        question: "Peygamber olan Hz. Âdem nasıl hata yaptı?",
        approach: "Peygamberlerin insan olduğunu, Hz. Âdem'in kandırıldığını fark edince yanlışında ısrar etmediğini söyleyin. Kıssanın merkezinin hata değil; hatayı kabul etmek, Allah'a yönelmek ve doğruya dönmek olduğunu vurgulayın.",
      },
      {
        question: "Hz. Âdem ile Hz. Havva yeryüzünde nereye indiler?",
        approach: "Kur'an'ın kesin bir yer söylemediğini açıklayın. Serendib, Cidde ve Arafat gibi yerlerin sonraki rivayetlerde anlatıldığını; güvenilir bilgiyle rivayeti ayırmanın değerli olduğunu belirtin.",
      },
      {
        question: "Hz. Âdem ölünce nereye gitti? Ben de ölecek miyim?",
        approach: "Sakin ve güven veren bir dille her insanın dünya hayatının bir gün sona erdiğini söyleyin. Ölümü ürkütücü ayrıntılarla değil, dünya görevinin tamamlanması ve Allah'a dönüş çerçevesinde anlatın. Çocuğun asıl kaygısının güvende olmak olabileceğini unutmayın; yanında olduğunuzu hissettirin.",
      },
      {
        question: "Ben de bazen kardeşimi veya arkadaşımı kıskanıyorum. Bu, benim kötü biri olduğum anlamına mı gelir?",
        approach: "Kıskançlık ve öfke gibi duyguların zaman zaman herkesin kalbine gelebileceğini açıklayın. Bir duyguyu hissetmenin, o duyguyla zarar verici bir davranışta bulunmakla aynı olmadığını vurgulayın. Çocuğun duygusunu anlatmasını teşvik edin; sakinleşme ve yardım isteme adımlarını birlikte hatırlayın.",
      },
      {
        question: "Hâbil karşılık vermediyse biri beni tehdit ettiğinde ben de hiçbir şey yapmadan beklemeli miyim?",
        approach: "Hayır. Hâbil'in sözlerinin kötülüğe aynı kötülükle cevap vermemeyi anlattığını, tehlikeli bir yerde kalmayı öğütlemediğini açıklayın. Çocuğa tehdit karşısında hemen uzaklaşmasını, güvenli bir yere geçmesini ve güvendiği bir yetişkine haber vermesini söyleyin. Acil tehlikede çevredeki yetişkinlerden ve gerekli yardım birimlerinden destek istenmelidir.",
      },
    ],
  },
  {
    key: "nuh",
    title: "Hz. Nuh",
    keywords: ["nuh"],
    totalQuizQuestions: 5,
    parent_summary:
      "Çocuğunuz Hz. Nuh yolculuğunda sabır, emek, güven ve umut değerlerini güzelce kavramış. Özellikle uzun bir bekleyişin içinde iyiliği sürdürme fikrini yakalaması, evde sıcak bir değer sohbeti için çok kıymetli bir başlangıç.",
    chat_questions: [
      "Nuh'un gemisinde olsaydın yanına hangi güzel davranışı almak isterdin?",
      "Zor bir günde sabırlı kalmak için sence ne yardımcı olur?",
    ],
  },
  {
    key: "ebubekir",
    title: "Hz. Ebû Bekir",
    keywords: ["ebu bekir", "ebubekir"],
    totalQuizQuestions: 13,
    parent_summary:
      "Çocuğunuz Hz. Ebû Bekir kitabında sadakat, cömertlik, cesaret ve dostluk değerlerini dikkatle takip etmiş. Bu yolculukta sadece sorulara cevap vermedi; iyiliğin sessiz, güçlü ve kalpten yapılabileceğini de tanımaya başladı.",
    chat_questions: [
      "Ebû Bekir'in yaptığı iyiliklerden hangisi sana en dokunaklı geldi?",
      "Bir arkadaşın zor durumda kalsa ona nasıl destek olmak isterdin?",
    ],
  },
  {
    key: "omer",
    title: "Hz. Ömer",
    keywords: ["omer"],
    totalQuizQuestions: 5,
    parent_summary:
      "Çocuğunuz Hz. Ömer yolculuğunda adalet, cesaret ve doğruyu arama değerlerine güzel bir dikkat göstermiş. Bu kitap, onunla evde hakkaniyet ve sorumluluk üzerine yumuşak bir sohbet başlatmak için çok iyi bir fırsat sunuyor.",
    chat_questions: [
      "Sence adil davranmak evde ve okulda nasıl görünür?",
      "Bir haksızlık gördüğünde en güzel tepki ne olabilir?",
    ],
  },
];

const nuhShipImage =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 540'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230f766e'/%3E%3Cstop offset='1' stop-color='%23fbbf24'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='960' height='540' rx='42' fill='%23ecfeff'/%3E%3Ccircle cx='760' cy='120' r='70' fill='%23fde68a'/%3E%3Cpath d='M126 370c88-54 176-54 264 0s176 54 264 0 132-54 220 0' fill='none' stroke='%230e7490' stroke-width='28' stroke-linecap='round' opacity='.35'/%3E%3Cpath d='M250 295h460c-36 88-112 132-230 132s-194-44-230-132Z' fill='url(%23g)'/%3E%3Cpath d='M480 118v176M480 132l150 162H480V132Z' fill='%23fef3c7' opacity='.92'/%3E%3Cpath d='M480 132 330 294h150V132Z' fill='%23ccfbf1' opacity='.94'/%3E%3Cpath d='M218 440c80-38 160-38 240 0s160 38 240 0' fill='none' stroke='%230f766e' stroke-width='18' stroke-linecap='round' opacity='.45'/%3E%3C/svg%3E";

export const books: BookDefinition[] = [
  {
    id: "hz-adem",
    routePrefix: "adem",
    title: "Hz. Âdem",
    eyebrow: "Hz. Âdem — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Beklenen Misafir",
        ozet: "Yeryüzü, Allah'ın kendisine sorumluluk vereceği ilk insanla tanışmaya hazırlanır.",
        audioUrl: "",
        badgeName: "İlk Adım Rozeti",
        paragraphs: [
          { type: "text", text: "Çok eski zamanlarda yeryüzünde henüz hiçbir insan yaşamıyordu. Dağlar göğe uzanıyor, nehirler vadilerden geçiyor, rüzgâr toprağın üzerinde dolaşıyordu. Geceleri yıldızlar parlıyor, sabahları ışık yeniden yayılıyordu. Yeryüzü, sanki önemli bir misafiri bekliyordu." },
          { type: "text", text: "Henüz bir çocuğun neşeli sesi vadilerde yankılanmamıştı. Hiçbir el toprağa bir tohum bırakmamış, hiçbir göz gökyüzüne merakla bakmamıştı. Yağmur yine yağıyor, bulutların gölgeleri ovalarda ilerliyordu. Fakat bütün bu güzellikleri görüp anlamlandıracak insan henüz yaratılmamıştı." },
          { type: "text", text: "Bir kayanın yanında duran su damlası ile uzaktaki bir yıldız birbirinden çok farklıydı. İnsan, ikisini de fark edebilecek ve onlar hakkında düşünebilecekti. Gördüklerine isim verecek, öğrendiklerini hatırlayacak ve yeni bilgiler arayacaktı. Yeryüzü böyle bir misafiri ilk kez ağırlayacaktı." },
          { type: "text", text: "Bir gün Yüce Allah, meleklere yeryüzünde sorumluluk taşıyacak bir insan yaratacağını bildirdi. Bu insan, kendisine verilen aklı ve imkânları güzel işler için kullanacaktı. Yeryüzünü koruyacak, doğruyla yanlışı seçebilecek ve yaptığı seçimlerden sorumlu olacaktı." },
          { type: "text", text: "Melekler, insanın kötülük yapabilen ve kan dökebilen bir varlık olacağını anladılar. Bunun hikmetini öğrenmek istediler:" },
          { type: "text", text: "— Yeryüzünde bozgunculuk çıkarabilecek birini mi yaratacaksın?" },
          { type: "text", text: "Yüce Allah onlara şöyle karşılık verdi:" },
          { type: "text", text: "— Ben sizin bilmediklerinizi bilirim." },
          { type: "text", text: "Bu cevap, insanın yalnızca yapabileceği kötülüklerle değerlendirilemeyeceğini gösteriyordu. İnsan öğrenebilecek, iyilik yapabilecek, hatasını anlayabilecek ve yeniden doğruya yönelebilecekti." },
          { type: "text", text: "İnsan güçlü olabilirdi; fakat gücünü korumak için kullanması gerekecekti. Konuşabilirdi; fakat sözlerini doğru ve güzel seçmeliydi. Toprağın ürünlerinden yararlanabilir, suyla hayatını sürdürebilirdi. Fakat bunları yalnız kendisinin malı sanmamalıydı." },
          { type: "text", text: "Sorumluluk işte bu seçimlerin içinde saklıydı. Aynı el bir fidan dikebilir veya bir dalı gereksiz yere kırabilirdi. Aynı dil bir kalbi sevindirebilir veya incitebilirdi. İnsana yalnızca imkân değil, doğru olanı seçme görevi de verilecekti." },
          {
            type: "interactive_word",
            before: "Yeryüzü insana verilmiş büyük bir ",
            word: "emanet",
            meaning: "Korumamız ve özen göstermemiz için bize güvenilerek verilen şeydir.",
            after: "ti; insan onu dilediği gibi değil, sorumlulukla kullanacaktı.",
          },
          { type: "text", text: "Toprak sıradan görünebilirdi. Üzerine basılır, avuçta dağılır, yağmurla çamura dönüşürdü. Fakat Allah, ilk insan Hz. Âdem'i (a.s.) topraktan yarattı. Toprağa şekil verdi ve ona ruh verdi. Böylece yeryüzünün beklediği ilk insan yaratılmış oldu." },
          { type: "text", text: "Kur'an, Hz. Âdem'in yaratılışını anlatırken toprağın farklı hâllerinden söz eder. Toprak suyla birleşir, çamura dönüşür ve Allah'ın dilemesiyle yepyeni bir yaratılışa hazırlanır. Bu aşamaların ne kadar sürdüğünü bilmiyoruz. Bildiğimiz, insanın Allah'ın kudretiyle ve özel bir yaratılışla var olduğudur." },
          { type: "text", text: "Hz. Âdem'e hayat verildiğinde önünde öğrenilecek büyük bir âlem vardı. Toprak ayaklarının altında, gökyüzü üzerinde uzanıyordu. İnsan artık görecek, işitecek, düşünecek ve seçim yapacaktı. Bu yeteneklerin her biri aynı zamanda bir sorumluluk taşıyordu." },
          { type: "text", text: "Hz. Âdem'in yaratılması, toprağın değersiz olmadığını da hatırlatıyordu. Bir tohum toprağa düşünce nasıl filizlenirse, insan da kendisine verilen yetenekleri kullanınca güzellikler ortaya çıkarabilirdi." },
          { type: "text", text: "Fakat önemli bir görev verilmek, her şeyi önceden bilmek demek değildi. Hz. Âdem'in öğreneceği çok şey vardı. Melekler de Allah'ın insan için hazırladığı armağanın ne olduğunu henüz bilmiyordu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Yüce Allah, Hz. Âdem'i bilgisiz ve yardımsız bırakmadı. Ona öğrenme yeteneği verdi. İnsanın yolculuğu, her şeyi bildiğini düşünerek değil, kendisine öğretilenleri dikkatle öğrenerek başlayacaktı." },
          { type: "text", text: "Bu nedenle ilk insanın en büyük armağanlarından biri güç değil, bilgiydi. Hz. Âdem çevresindeki varlıkları tanıyacak, onların isimlerini öğrenecek ve öğrendiklerini kullanabilecekti." },
          { type: "text", text: "Yeryüzünün beklediği misafir artık gelmişti. Fakat bu misafirin neden bu kadar değerli olduğu, bir sonraki olayda daha açık görülecekti." },
        ],
        has_question: true,
        question: {
          title: "Beklenen Misafir",
          prompt: "Öğretmenin sana önemli bir görev verdi ama nasıl yapacağını henüz bilmiyorsun. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Hz. Âdem'in büyük sorumluluğa nasıl hazırlandığını okuyarak seçimini karşılaştır.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Zor göründüğü için görevi hemen bırakırdım.",
              comparison: "Görevden uzaklaşmak kısa süreli bir rahatlık verebilirdi; hikâye ise sorumluluğun öğrenerek taşındığını gösterdi.",
            },
            {
              id: "b",
              text: "Görevi kabul eder, öğrenmek için yardım isterdim.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Hz. Âdem de büyük görevine Allah'ın öğrettikleriyle hazırlandı.",
            },
            {
              id: "c",
              text: "Biliyormuş gibi davranır, kimseye soru sormazdım.",
              comparison: "Her şeyi biliyormuş gibi davranmak öğrenmeyi zorlaştırırdı; hikâyede yardım ve bilginin değeri öne çıktı.",
            },
          ],
        },
        learned: [
          "Sorumluluk, her şeyi baştan bilmek değil; öğrenmeye ve doğruyu yapmaya hazır olmaktır.",
          "Hz. Âdem topraktan yaratıldı ve yeryüzünde önemli bir görev üstlendi.",
          "İnsan, kötülüğü seçebildiği gibi iyiliği ve düzeltmeyi de seçebilir.",
        ],
      },
      {
        id: "2",
        title: "Bilginin Armağanı",
        ozet: "Allah'ın öğrettiği isimler, insanın öğrenme ve bilgiyi kullanma değerini gösterir.",
        audioUrl: "",
        badgeName: "Meraklı Zihin Rozeti",
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) gözlerini yepyeni bir dünyaya açmıştı. Çevresinde farklı şekiller, renkler ve varlıklar bulunuyordu. Allah ona bütün bunları tanıyabilme, aralarındaki farkları anlayabilme ve isimlerini öğrenebilme yeteneği verdi." },
          { type: "text", text: "Bir şeyi tanımak, yalnızca ona bakmak değildi. Su ile taşı, aydınlık ile gölgeyi, yakın ile uzağı ayırmak gerekiyordu. Bir varlığın adını bilmek ise onu düşünmeyi ve başkasına anlatmayı kolaylaştırıyordu." },
          { type: "text", text: "İsimler sayesinde bilgi tek bir anda kaybolup gitmeyecekti. İnsan gördüğünü hatırlayacak, anlatacak ve sonraki öğrendikleriyle birleştirecekti. Bir çocuk “su” dediğinde başkası neyi kastettiğini anlayacaktı. Böylece ortak bilgi ve iletişim başlayacaktı." },
          { type: "text", text: "Yüce Allah, Hz. Âdem'e isimleri öğretti. Bu öğretme yalnızca birkaç kelimeyi ezberlemek değildi. İnsan, öğrendiği isimler sayesinde düşünecek, anlatacak, soru soracak ve bilgisini başkalarıyla paylaşacaktı." },
          { type: "text", text: "Öğrenme armağanı insana büyük imkânlar açıyordu. Fakat her armağan gibi bunun da doğru kullanılması gerekiyordu. Bilgiyle övünmek yerine şükretmek, bilmediğinde dürüst olmak ve öğrendiğini yararlı işler için kullanmak önemliydi." },
          { type: "text", text: "Hz. Âdem'in bilgisi kendiliğinden ortaya çıkmamıştı. Onu öğreten Allah'tı. Bu nedenle insan ne kadar çok öğrenirse öğrensin, bilgisinin kaynağını ve sınırlarını unutmamalıydı. Bilmediği şeyler her zaman bildiklerinden daha fazla olabilirdi." },
          { type: "text", text: "Sonra Allah, bazı varlıkları meleklere gösterdi ve isimlerini söylemelerini istedi. Melekler bilmedikleri konuda tahminde bulunmadılar. Dürüstçe cevap verdiler:" },
          { type: "text", text: "— Seni eksikliklerden uzak tutarız. Senin bize öğrettiğinden başka bilgimiz yoktur. Her şeyi bilen ve her işi yerli yerince yapan sensin." },
          { type: "text", text: "Ardından Hz. Âdem isimleri söyledi. Böylece Allah'ın insana verdiği öğrenme kabiliyeti ortaya çıktı. Melekler, insanın yalnızca toprağa ait bir beden olmadığını gördüler. O, bilgi alabilen ve bu bilgiyle sorumluluk taşıyabilen bir varlıktı." },
          {
            type: "interactive_word",
            before: "Melekler, Allah'ın emriyle Hz. Âdem'e özel bir saygı göstergesi olarak ",
            word: "secde",
            meaning: "Allah'ın emriyle yapılan, derin saygıyı gösteren özel bir davranıştır.",
            after: " ettiler; bu, Hz. Âdem'e ibadet etmek değildi.",
          },
          { type: "text", text: "Allah meleklere Hz. Âdem'e secde etmelerini emretti. Meleklerin hepsi bu emre uydu. Onların davranışı, Allah'ın emrine teslim olduklarını ve insana verilen değeri kabul ettiklerini gösteriyordu." },
          { type: "text", text: "Secde emrinin anlamı Hz. Âdem'e ibadet etmek değildi. İbadet yalnızca Allah'a yapılır. Melekler, Allah'ın buyruğuna uyarak Hz. Âdem'e verilen değeri kabul ediyordu. Bilginin yanında taşıdığı sorumluluk da böylece görünür hâle gelmişti." },
          { type: "text", text: "Melekler kendi değerlerinin azaldığını düşünmedi. Başka bir varlığa armağan verilmesi onları kıskançlığa sürüklemedi. Allah'ın bildiğine güvendiler ve emrini yerine getirdiler." },
          { type: "text", text: "Fakat orada bulunan İblis aynı yolu seçmedi. Kendini Hz. Âdem'den üstün gördü. Ateşten yaratılmış olmasını övünme sebebi yaptı, toprağı ise küçümsedi." },
          { type: "text", text: "İblis yalnızca iki yaratılış maddesini karşılaştırıyordu. Ateşin topraktan üstün olduğuna kendi başına karar vermişti. Oysa değeri belirleyen, bir maddenin parlak veya güçlü görünmesi değildi. Asıl değer, Allah'ın emrine uymakta ve verilen görevi doğru taşımaktaydı." },
          { type: "text", text: "Kibir, insanın gözünün önündeki gerçeği saklayan koyu bir perdeye benzer. Kişi yalnızca kendi özelliğine bakar ve başkasındaki güzelliği göremez. İblis'in başına gelen de buydu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Melekler, Hz. Âdem'e verilen bilgi karşısında kıskançlık göstermedi. Bilmediklerini kabul ettiler ve Allah'ın emrine uydular. İblis ise kendi özelliğini üstünlük sebebi saydı. Başkasına verilen değeri kabul etmek istemedi." },
          { type: "text", text: "Yüce Allah ona neden secde etmediğini sorduğunda İblis, kendisinin ateşten, Hz. Âdem'in topraktan yaratıldığını söyledi. Böylece asıl problemi ortaya çıktı: İblis'in yanlışı yalnızca secde etmemek değildi. Kendi düşüncesini Allah'ın emrinden üstün tutmuştu." },
          { type: "text", text: "Kibir, onun gerçeği görmesini engelledi. Özür dilemek yerine yanlışında ısrar etti. Allah'ın rahmetinden uzaklaştırıldı. Ardından insanları doğru yoldan ayırmaya çalışacağını söyledi." },
          { type: "text", text: "Hz. Âdem'in yolculuğunda iki ayrı davranış yan yana görünmüştü. Melekler bilmediklerini kabul etmiş, öğrenmeye ve emre açık durmuştu. İblis ise kendini büyük görmüş, hatasında direnmişti." },
          { type: "text", text: "İnsan için önemli soru artık şuydu: Bir hata yapınca hangi yolu seçecekti? Kibrin yolunu mu, yoksa öğrenip düzelmenin yolunu mu?" },
        ],
        has_question: true,
        question: {
          title: "Bilginin Armağanı",
          prompt: "Bir arkadaşın yeni bir konuyu senden önce öğrendi. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Meleklerin ve İblis'in farklı seçimlerini okuyarak kararını karşılaştır.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Onun başarısını küçümser, aslında önemli olmadığını söylerdim.",
              comparison: "Başkasının başarısını küçümsemek İblis'in kibrine benzeyen bir kapı açabilirdi.",
            },
            {
              id: "b",
              text: "Bir daha onunla aynı ortamda bulunmak istemezdim.",
              comparison: "Uzaklaşmak kendi öğrenme fırsatını da azaltırdı; melekler gerçeğe açık kaldılar.",
            },
            {
              id: "c",
              text: "Onu tebrik eder, ben de öğrenmek için çalışırdım.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Başkasının başarısı, senin değerini azaltmaz.",
            },
          ],
        },
        learned: [
          "Bilgi insanı değerli kılar; fakat bilgiyle birlikte alçak gönüllülük de gerekir.",
          "Melekler bilmediklerini dürüstçe söyledi ve Allah'ın emrine uydu.",
          "İblis, kendini üstün gördüğü ve yanlışında ısrar ettiği için doğru yoldan uzaklaştı.",
        ],
        gorev: {
          id: "adem-2-yeni-kelime",
          ad: "Yeni Kelime Avcısı",
          kategori: "öğrenme",
          aciklama: "Bugün bilmediğin bir kelime seç. Anlamını güvenilir bir sözlükten veya bir büyüğünden öğren ve kendi cümlende kullan.",
          sure: "5 dakika",
          olcut: "Bir kelimenin anlamını öğrenip o kelimeyle anlamlı bir cümle kurmak.",
        },
      },
      {
        id: "3",
        title: "Cennetteki Uyarı",
        ozet: "Cennetin nimetleri içindeki tek sınır, güven ve sorumluluğun değerini öğretir.",
        audioUrl: "",
        badgeName: "Sözü Koruma Rozeti",
        paragraphs: [
          { type: "text", text: "Yüce Allah, Hz. Âdem'i (a.s.) cennete yerleştirdi ve ona bir eş yarattı. Kur'an, eşinin adını söylemez. İslâm geleneğinde ona Hz. Havva denir. İkisi aynı insanlık ailesinin ilk anne ve babasıydı." },
          { type: "text", text: "İnsan yalnızca öğrenen değil, sevgi ve yakınlık kuran bir varlıktı. Bir sevinci paylaşmak onu çoğaltır, bir güçlüğü paylaşmak yükü hafifletirdi. Hz. Âdem ile eşi, cennet nimetlerini birlikte tanıyacak ve kendilerine verilen uyarıyı birlikte taşıyacaktı." },
          { type: "text", text: "Bu birliktelik üstünlük yarışı değildi. İkisi de Allah'ın kuluydu ve ikisi de kendi seçiminden sorumluydu. Sonraki olayları anlatırken birini yalnızca güçlü, diğerini yalnızca zayıf göstermek doğru olmazdı." },
          { type: "text", text: "Cennet huzur ve nimetlerle doluydu. Orada açlık, susuzluk, çıplaklık ve yakıcı sıcaklık yoktu. Bahçeler, gölgeler ve türlü güzellikler Allah'ın ikramını hatırlatıyordu." },
          { type: "text", text: "Sular berrakça akıyor, yeşillikler gözün uzanabildiği yere kadar yayılıyordu. Her köşe insana Allah'ın cömertliğini hatırlatan başka bir güzellik taşıyordu. Korkuyla saklanmaları veya bir nimete yetişmek için yarışmaları gerekmiyordu." },
          { type: "text", text: "Bu bolluğun içinde şükretmek kolay görünüyordu. Fakat gerçek güven, yalnızca nimetlerden yararlanırken değil, bir sınırla karşılaşınca da ortaya çıkardı. Allah'ın verdiği yüzlerce serbestliğin yanında tek bir uyarı bulunuyordu." },
          { type: "text", text: "Hz. Âdem ile eşi için cennet yalnızca güzel bir bahçe değildi. Allah'ın ikramını ve korumasını hissettikleri güvenli bir yurttu. Oradaki huzurun kaynağı, diledikleri her şeyi yapmak değil, Allah'ın kendileri için çizdiği doğru yolun içinde yaşamaktı." },
          { type: "text", text: "İnsan bazen sahip olduğu yüz nimeti çabuk unutur. Ulaşamadığı tek şeye bakınca kendisini eksik hissedebilir. Şükür ise dikkati yeniden verilen güzelliklere çevirir. Böylece küçük bir eksiklik gibi görünen sınır, bütün mutluluğun önüne geçmez." },
          {
            type: "interactive_word",
            before: "Cennetteki her güzellik Allah'ın verdiği bir ",
            word: "nimet",
            meaning: "Allah'ın insanlara verdiği yiyecek, sağlık, sevgi ve benzeri güzelliklerin her biridir.",
            after: "ti; bu kadar çok nimetin yanında yalnızca bir sınır vardı.",
          },
          { type: "text", text: "Yüce Allah, Hz. Âdem ile eşine cennette diledikleri yerden yiyebileceklerini bildirdi. Yalnızca belirli bir ağaca yaklaşmamalarını istedi. Bu uyarı açık ve anlaşılırdı." },
          { type: "text", text: "Uyarı “meyvesinden biraz yemeyin” şeklinde bile değildi. Ağaca yaklaşmamaları istenmişti. Çünkü bazen yanlıştan korunmanın en güvenli yolu, ona ne kadar yaklaşabileceğimizi denememektir." },
          { type: "text", text: "Bir sınır, bütün özgürlüğü ortadan kaldırmaz. Geniş bir bahçedeki tek kapalı yol, diğer bütün yolların değerini azaltmaz. Fakat insan yalnızca kapalı yola bakarsa önündeki güzellikleri unutabilir." },
          { type: "text", text: "Kur'an, bu ağacın türünü açıklamaz. Bu nedenle onun elma, buğday veya başka bir bitki olduğunu söyleyemeyiz. Önemli olan meyvenin adı değil, Allah'ın koyduğu sınıra güvenmekti." },
          { type: "text", text: "Hz. Âdem ile eşi cennette huzur içinde yaşamaya devam etti. Fakat artık İblis onların açık bir düşmanıydı. Kibirle başladığı yanlışını büyütmek ve insanları da doğru yoldan uzaklaştırmak istiyordu." },
          { type: "text", text: "İblis, hemen sonuç alamayacağını biliyordu. Bu yüzden doğru olmayan bir düşünceyi tekrar tekrar fısıldayacaktı. Yasak ağacı, bütün cennet nimetlerinden daha önemliymiş gibi gösterecekti." },
          { type: "text", text: "Önce merak uyandırmak yeterli olabilirdi. Ardından ağacın neden yasaklandığı hakkında şüphe oluşturacaktı. Sonra da kendisini güvenilir bir öğütçü gibi gösterecekti. Böylece tek bir yanlış düşünce, adım adım büyütülmüş olacaktı." },
          { type: "text", text: "Fakat İblis'in insan üzerinde zorlayıcı bir gücü yoktu. O yalnızca çağırabilir, süsleyebilir ve fısıldayabilirdi. Son kararı yine insan verecekti. Bu yüzden uyarıyı hatırlamak ve düşünceyi doğru ölçüyle tartmak önemliydi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "İblis, Hz. Âdem ile eşine doğrudan “Bu emre karşı gelin” demedi. Yanlışı güzel bir düşünce gibi göstermeye çalıştı. Yasak ağacın onları sonsuza kadar cennette tutacağını söyledi." },
          { type: "text", text: "Oysa cennette önlerinde sayısız nimet vardı. İblis, onların dikkatini bütün güzelliklerden uzaklaştırıp tek bir ağaca çevirmek istiyordu. Böylece sınır, birdenbire kaybedilmiş bir fırsat gibi görünecekti." },
          { type: "text", text: "Güven bazen tam da böyle zamanlarda sınanır. İnsan her sebebi bilmeyebilir. Fakat kendisine iyilik eden ve doğru yolu gösteren Allah'ın uyarısına güvenebilir." },
          { type: "text", text: "İblis'in fısıltısı giderek yaklaşırken önemli bir karar anı doğuyordu. Hz. Âdem ile eşi bu söze karşı nasıl davranacaktı?" },
        ],
        has_question: true,
        question: {
          title: "Cennetteki Uyarı",
          prompt: "Ailen evdeki birçok şeyi kullanabileceğini, yalnızca bir kutuyu açmaman gerektiğini söyledi. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. İblis'in tek bir sınırı nasıl çekici göstermeye çalıştığını okuyarak kararını karşılaştır.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Nedenini anlamasam da verilen sınıra uyardım.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Güven, her merakı hemen gidermekten daha değerlidir.",
            },
            {
              id: "b",
              text: "Kimse görmeden kutuyu biraz aralardım.",
              comparison: "Küçük bir aralık bile verilen sınırı aşmak olurdu; hikâye yaklaşmama uyarısını öne çıkardı.",
            },
            {
              id: "c",
              text: "Bir arkadaşım açarsa içindekine ben de bakardım.",
              comparison: "Kararı başkasına bırakmak sorumluluğu ortadan kaldırmazdı; herkes kendi seçimini taşır.",
            },
          ],
        },
        learned: [
          "Güven, bize verilen açık ve doğru sınırlara dikkat etmeyi gerektirir.",
          "Kur'an yasak ağacın türünü bildirmez; önemli olan meyve değil, uyarıdır.",
          "Yanlış düşünceler bazen güzel bir fırsat gibi gösterilerek insana yaklaşabilir.",
        ],
        gorev: {
          id: "adem-3-sozumu-koruyorum",
          ad: "Sözümü Koruyorum",
          kategori: "sorumluluk",
          aciklama: "Bugün yapabileceğin küçük bir söz ver ve gün bitmeden yerine getir. Örneğin kitabını yerine koymayı veya sofraya yardım etmeyi seçebilirsin.",
          sure: "Gün içinde 5–10 dakika",
          olcut: "Verilen küçük sözü hatırlayıp aynı gün yerine getirmek.",
        },
      },
      {
        id: "4",
        title: "Tatlı Fısıltı",
        ozet: "Şeytanın güzel gösterdiği yanlış, verilen sözü ve dikkatli seçimi sınar.",
        audioUrl: "",
        badgeName: "Dikkatli Kalp Rozeti",
        paragraphs: [
          { type: "text", text: "İblis, Hz. Âdem (a.s.) ile eşinin açık düşmanıydı. Fakat yanlarına bir düşman gibi yaklaşmadı. Onlara iyilik isteyen bir öğütçü gibi görünmeye çalıştı." },
          { type: "text", text: "Kötü bir teklif her zaman sert ve ürkütücü görünmeyebilir. Bazen çok yumuşak sözlerle gelir. İnsanın sevdiği bir şeyi vaat eder ve taşıdığı tehlikeyi saklar. Bu nedenle yalnızca sözün güzel olmasına değil, doğru olup olmadığına bakmak gerekir." },
          { type: "text", text: "Hz. Âdem ile eşi, İblis'in kendilerine düşman olduğu konusunda daha önce uyarılmıştı. Buna rağmen tekrar edilen sözler dikkatlerini dağıtabilirdi. Vesvese kapıyı zorla açmaz; fakat insanı kapının önünde uzun süre tutmaya çalışır." },
          { type: "text", text: "— Rabbiniz bu ağacı, melek olursunuz veya sonsuza kadar kalırsınız diye yasakladı, dedi." },
          { type: "text", text: "Sonra doğru söylediğine dair yemin etti. Böylece yalanını daha güvenilir göstermeye çalıştı. Sözleri güzel bir vaat taşıyordu: Hiç bitmeyen bir hayat ve sona ermeyen bir güç." },
          { type: "text", text: "İblis, Allah'ın uyarısını açıkça inkâr etmek yerine ona başka bir anlam vermeye çalıştı. Ağacın tehlikeli olmadığını, tam tersine değerli bir fırsat olduğunu söyledi. Böylece yanlışı iyilik kılığına soktu." },
          { type: "text", text: "Sonsuza kadar kalma düşüncesi kulağa çekici geliyordu. Fakat doğru bir amaç, yanlış bir yolla aranamazdı. Güzel bir sonuca ulaşmak isteyen kişi, yolun da doğru olup olmadığını düşünmeliydi." },
          {
            type: "interactive_word",
            before: "İblis'in insanın içine bıraktığı, yanlışı güzel gösteren düşünceye ",
            word: "vesvese",
            meaning: "İnsanın içine doğan ve onu yanlış bir davranışa çağıran rahatsız edici düşüncedir.",
            after: " denir; vesvese doğruyu zorla değiştiremez, yalnızca insanı seçime çağırır.",
          },
          { type: "text", text: "İblis aynı düşünceyi tekrar ettikçe yasak ağaç daha dikkat çekici görünmeye başladı. Hz. Âdem ile eşi, Allah'ın verdiği sayısız nimetin ortasındaydı. Buna rağmen fısıltı, sanki mutlulukları o tek ağaca bağlıymış gibi hissettirmeye çalışıyordu." },
          { type: "text", text: "İnsan aynı düşünceyi çok kez duyduğunda onu doğru sanabilir. Tekrar, bir sözün doğruluğunu kanıtlamaz; yalnızca kulağa daha tanıdık gelmesini sağlar. Bu nedenle duyduğumuz bir sözü, onu kimin söylediği ve doğru ölçüye uyup uymadığıyla değerlendirmeliyiz." },
          { type: "text", text: "Hz. Âdem ile eşinin önündeki doğru ölçü açıktı. Allah ağaca yaklaşmamalarını söylemiş, İblis'in düşmanları olduğunu bildirmişti. İblis'in yemini bu açık uyarıdan daha güvenilir değildi." },
          { type: "text", text: "Burada önemli bir ayrıntı vardı: Şeytan yalnızca Hz. Havva'yı kandırmadı. Kur'an, ikisinin birlikte aldatıldığını anlatır. Sorumlulukları da pişmanlıkları da ortaktı." },
          { type: "text", text: "Sonraki bazı anlatılar bütün suçu Hz. Havva'ya yüklemiştir. Kur'an'ın dili böyle değildir. Ayetler ikisine birlikte seslenir, ikisinin birlikte aldandığını ve birlikte tövbe ettiğini bildirir." },
          { type: "text", text: "Bu ayrıntı yalnızca geçmişi doğru anlatmak için önemli değildi. Bir hata olduğunda kolayca suçlayacak birini aramamak gerektiğini de öğretiyordu. Adalet, herkesin kendi payına dürüstçe bakmasıyla başlardı." },
          { type: "text", text: "Karar anı gelmişti. Güzel görünen bir söz, açık bir uyarının karşısında duruyordu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Âdem ile eşi, İblis'in kendilerine gerçekten iyilik istediğini sandılar. Yasak ağaca yaklaştılar ve meyvesinden tattılar. Böylece Allah'ın açık uyarısını unuttular." },
          { type: "text", text: "Kur'an bu anı uzun ve korkutucu ayrıntılarla anlatmaz. Ağacın türünü, meyvenin rengini veya kaç tane yediklerini söylemez. Çünkü ders bu ayrıntılarda değildir. Asıl konu, güvenilir uyarı yerine aldatıcı söze yönelmeleridir." },
          { type: "text", text: "İnsan yanlış bir seçimden hemen önce sonucunu göremeyebilir. Merak, o an bütün dikkatini kaplayabilir. Fakat seçim yapıldıktan sonra daha önce duyduğu uyarılar yeniden hatırına gelir. Hz. Âdem ile eşinin yaşadığı pişmanlık da böyle başladı." },
          { type: "text", text: "O anda yaptıklarının yanlışlığını fark ettiler. Üzerlerini cennet yapraklarıyla örtmeye başladılar. Biraz önce güzel görünen vaat kaybolmuş, yerini derin bir pişmanlığa bırakmıştı." },
          { type: "text", text: "Yanlışlarını fark etmeleri kalplerinin bütünüyle kararmadığını gösteriyordu. Rahatsızlık duymaları, doğruyla yanlış arasındaki farkı hâlâ bildiklerinin işaretiydi. Şimdi bu farkındalığı dürüst bir davranışa dönüştürmeleri gerekiyordu." },
          { type: "text", text: "Hata iki türlü büyüyebilirdi: Önce yanlış seçimle, sonra onu saklamak için söylenen bahanelerle. Hz. Âdem ile eşinin önündeki yeni sınav, bu ikinci kapıyı açıp açmayacaklarıydı." },
          { type: "text", text: "İblis onlara sonsuzluk sözü vermişti. Fakat geriye güveni zedeleyen bir seçim kalmıştı. Yanlışın güzel görünmesi, sonucunu güzel yapmamıştı." },
          { type: "text", text: "Yüce Allah onlara yasak ağacı ve şeytanın açık düşmanları olduğunu hatırlattı. Artık önlerinde başka bir karar vardı: Yanlışlarını saklayacaklar mıydı, birbirlerini mi suçlayacaklardı, yoksa gerçeği kabul mü edeceklerdi?" },
          { type: "text", text: "Hikâyenin asıl dönüm noktası ağacın yanında değil, işte bu sorunun karşısında başlayacaktı." },
        ],
        has_question: true,
        question: {
          title: "Tatlı Fısıltı",
          prompt: "Bir arkadaşın sana, “Kimse görmez, yasak olanı bir kere denesen ne olur?” dedi. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Hz. Âdem ile eşinin seçiminin neye yol açtığını okuyarak kararını karşılaştır.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Merakımı gidermek için bir kere denerdim.",
              comparison: "Bir kez denemek de verilen sınırı aşardı; hikâyede küçük görünen seçimin üzüntü getirdiği görüldü.",
            },
            {
              id: "b",
              text: "Verilen sınırı hatırlar ve teklifi kabul etmezdim.",
              comparison: "Seçimin hikâyedeki uyarıyla uyumlu. Güzel görünen her teklif doğru olmayabilir.",
            },
            {
              id: "c",
              text: "Önce arkadaşımın denemesini bekler, sonra karar verirdim.",
              comparison: "Başkasının davranışını beklemek kendi sorumluluğunu kaldırmazdı; hikâyede ikisi de kendi seçimini taşıdı.",
            },
          ],
        },
        learned: [
          "Yanlış bir davranış, güzel sözlerle anlatılsa bile doğruya dönüşmez.",
          "Hz. Âdem ile Hz. Havva birlikte aldandı; hiçbiri tek başına suçlanamaz.",
          "Hatanın farkına varmak, onu düzeltmeye giden ilk adımdır.",
        ],
      },
      {
        id: "5",
        title: "Tövbenin Kapısı",
        ozet: "Hz. Âdem ile Hz. Havva, hatalarını kabul ederek Allah'ın rahmetine yönelir.",
        audioUrl: "",
        badgeName: "Tövbe Rozeti",
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) ile Hz. Havva yaptıklarının yanlış olduğunu anlamıştı. İblis onları kandırmıştı; fakat bu durum kendi seçimlerini yok etmiyordu. Şimdi verecekleri cevap, hatalarının kendisinden daha önemli olacaktı." },
          { type: "text", text: "Cennetin güzellikleri hâlâ çevrelerindeydi; fakat onların dikkati artık kendi davranışlarındaydı. Uyarıyı hatırlıyor ve neden daha dikkatli olmadıklarını anlıyorlardı. Pişmanlık, geçmişteki anı tekrar tekrar düşündüren ağır bir yük gibi hissedilebilirdi." },
          { type: "text", text: "Bu yükten kurtulmanın yolu hatayı yok saymak değildi. Gerçeğe dönüp bakmak, sorumluluğu kabul etmek ve bağışlanma istemek gerekiyordu. İşte tövbenin kapısı böyle açılırdı." },
          { type: "text", text: "İblis de bir yanlış yapmıştı. O, kibrine sarılmış ve kendisini haklı göstermeye çalışmıştı. Hz. Âdem ile eşinin önünde ise başka bir yol vardı: Gerçeği kabul etmek ve Allah'tan bağışlanma istemek." },
          { type: "text", text: "İki yol arasındaki fark çok büyüktü. İblis “Ben üstünüm,” diyerek yanlışında direnmişti. Hz. Âdem ile eşi ise kendilerini kusursuz göstermeye çalışmadı. Hatalarını görmek değerlerini yok etmiyordu; aksine doğruya dönmelerini mümkün kılıyordu." },
          { type: "text", text: "İnsan bazen özür dilerse küçüleceğini sanabilir. Oysa içten bir özür, kibrin duvarını yıkar. Kişi gerçeği kabul edince hem başkasının hakkını görebilir hem de düzeltmek için harekete geçebilir." },
          { type: "text", text: "İnsan hata yaptığında çoğu zaman kendini korumak ister. Bir bahane bulmak kolay görünebilir. “Benim yüzümden olmadı,” demek insanı kısa süre rahatlatabilir. Fakat hata yerinde durmaya devam eder." },
          { type: "text", text: "Hz. Âdem ile Hz. Havva birbirlerini suçlamadı. “Bizi İblis kandırdı, bizim hiçbir sorumluluğumuz yok,” da demediler. Önce kendi yaptıklarına baktılar." },
          { type: "text", text: "Yüce Allah, Hz. Âdem'e bağışlanma dileyeceği sözleri öğretti. Bu da Allah'ın onları yalnız bırakmadığını gösteriyordu. Hata yapmışlardı; fakat dönüş yolu kapanmamıştı." },
          { type: "text", text: "Allah'ın sözleri onlara yalnızca ne söyleyeceklerini öğretmiyordu. Nasıl bir kalple dönmeleri gerektiğini de gösteriyordu. Dua, hatayı küçültmüyor; insanın acizliğini ve Allah'ın merhametine olan ihtiyacını kabul ediyordu." },
          { type: "text", text: "Tövbe yalnızca dilde kalan birkaç söz değildir. İnsan yaptığına pişman olur, yanlışı bırakır ve mümkünse verdiği zararı düzeltir. Böylece kalbin dönüşü davranışta da görünür hâle gelir." },
          {
            type: "interactive_word",
            before: "Yapılan yanlıştan pişman olup Allah'tan bağışlanma istemeye ve o yanlışı bırakmaya ",
            word: "tövbe",
            meaning: "Yaptığımız bir yanlıştan pişman olup Allah'tan bağışlanma istemek ve o yanlışı bırakmaktır.",
            after: " denir; tövbe insanın yeniden doğruya yönelmesidir.",
          },
          { type: "text", text: "Sıra, yanlışa nasıl karşılık vereceklerini seçmeye gelmişti." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Âdem ile Hz. Havva içtenlikle Allah'a yöneldi:" },
          { type: "text", text: "— Rabbimiz! Biz kendimize haksızlık ettik. Bizi bağışlamaz ve bize merhamet etmezsen kaybedenlerden oluruz." },
          { type: "text", text: "Bu duada bahane yoktu. Başkasını suçlamak yoktu. Pişmanlık, sorumluluk ve Allah'ın merhametine duyulan umut vardı." },
          { type: "text", text: "Yüce Allah tövbelerini kabul etti. Onları hatalarıyla baş başa bırakmadı. Hz. Âdem'i seçti, bağışladı ve ona doğru yolu gösterdi." },
          { type: "text", text: "Bağışlanmak, yaşanan olaydan hiçbir ders çıkarmamak demek değildi. Hz. Âdem ile Hz. Havva artık İblis'in güzel sözler ardına sakladığı tehlikeyi tanıyordu. Aynı tuzağın nasıl kurulduğunu öğrenmişlerdi." },
          { type: "text", text: "Allah'ın merhameti, umutsuzluğun önündeki kapıyı kapatıyordu. Hatasını anlayan insan “Artık benim için iyilik kalmadı,” demez. Yanlışını bırakır, Allah'a yönelir ve yeniden güzel işler yapmaya başlar." },
          { type: "text", text: "İslâm'da Hz. Âdem'in hatası çocuklarına geçen bir günah sayılmaz. Her insan kendi seçiminden sorumludur. Bu nedenle hiçbir çocuk dünyaya başkasının günahını taşıyarak gelmez." },
          { type: "text", text: "Hz. Âdem ile Hz. Havva'nın yeryüzündeki hayatı başlayacaktı. Bu, Allah'ın onları bağışlamadığı anlamına gelmiyordu. Yeryüzü zaten insanın sorumluluk taşıyacağı yer olarak bildirilmişti." },
          { type: "text", text: "Tövbe geçmişi değiştirmedi; fakat geleceğe açılan yeni bir kapı oldu. O kapının ardında emek, öğrenme, aile ve rehberlik vardı." },
        ],
        has_question: true,
        question: {
          title: "Tövbenin Kapısı",
          prompt: "Evde yanlışlıkla bir eşyaya zarar verdin ve bunu kimse görmedi. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Hz. Âdem ile Hz. Havva'nın hatalarına nasıl karşılık verdiğini okuyarak seçimini karşılaştır.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Fark edilmemesi için eşyayı saklardım.",
              comparison: "Saklamak sorunu görünmez yapabilirdi; hikâyede iyileşme gerçeği kabul etmekle başladı.",
            },
            {
              id: "b",
              text: "Başka birinin yaptığını söylemeyi düşünürdüm.",
              comparison: "Sorumluluğu başkasına bırakmak hatayı büyütürdü; Hz. Âdem ile eşi birbirini suçlamadı.",
            },
            {
              id: "c",
              text: "Yaptığımı anlatır, özür diler ve düzeltmeye çalışırdım.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Özür ve düzeltme, pişmanlığı güzel bir başlangıca dönüştürür.",
            },
          ],
        },
        learned: [
          "Tövbe, hatasını kabul eden insan için yeni bir başlangıç kapısıdır.",
          "Hz. Âdem ile Hz. Havva birlikte pişman oldu ve Allah'tan bağışlanma istedi.",
          "Allah tövbelerini kabul etti; hiç kimse başkasının günahını taşımaz.",
        ],
        gorev: {
          id: "adem-5-hatami-onariyorum",
          ad: "Hatamı Onarıyorum",
          kategori: "sorumluluk",
          aciklama: "Düzeltebileceğin küçük bir hatanı seç. Birini kırdıysan özür dile, dağıttıysan toparla veya zarar verdiysen onarmak için yardım iste.",
          sure: "5–15 dakika",
          olcut: "Küçük bir hatanın sonucunu düzeltmek için güvenli ve gerçek bir adım atmak.",
        },
      },
      {
        id: "6",
        title: "Yeni Bir Yurt",
        ozet: "Yeryüzündeki hayat, emek ve ilahî rehberlikle yeni bir başlangıca dönüşür.",
        audioUrl: "",
        badgeName: "Yeni Başlangıç Rozeti",
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) ile Hz. Havva için yeryüzünde yeni bir dönem başladı. Kur'an onların yeryüzünün hangi bölgesine indirildiğini açıklamaz. Bu yüzden Serendib, Cidde veya başka bir yeri kesin olarak söyleyemeyiz." },
          { type: "text", text: "Yeryüzü cennetten farklıydı. Gün ışığı çekilince gece geliyor, hava bazen ısınıyor, bazen serinliyordu. İnsan yoruluyor, acıkıyor ve dinlenmeye ihtiyaç duyuyordu. Bu değişikliklerin her biri yeni hayatın bir parçasıydı." },
          { type: "text", text: "Fakat yeryüzü yalnızca güçlüklerden oluşmuyordu. Yağmur kuru toprağı canlandırıyor, tohumlar yeşeriyor ve su canlılara hayat veriyordu. İnsan çalışacak, sonuç için sabredecek ve elde ettiği nimetlere şükredecekti." },
          { type: "text", text: "Bildiklerimiz bundan daha anlamlıydı: İnsan yeryüzünde yaşayacak, orada sorumluluk taşıyacak ve Allah'ın rehberliğiyle yolunu bulacaktı." },
          { type: "text", text: "Hz. Âdem'in yaratılışından önce verilen haber şimdi daha iyi anlaşılıyordu. İnsan yeryüzünde sorumluluk taşıyacaktı. Cennette yaşanan hata bu görevi ortadan kaldırmamıştı. Tövbe, yolculuğun yeniden doğrulmasına yardım etmişti." },
          { type: "text", text: "Önlerinde hazır bir şehir veya kurulmuş bir düzen yoktu. Fakat insan öğrenme armağanına sahipti. Gördüklerini anlayabilir, tecrübelerinden yararlanabilir ve bildiklerini ailesiyle paylaşabilirdi." },
          { type: "text", text: "Cennette açlık, susuzluk ve yakıcı sıcaklık yoktu. Yeryüzündeki hayat ise emek istiyordu. İnsan yiyeceğini hazırlayacak, suyu bulacak, sıcaktan ve soğuktan korunacaktı. Her yeni gün, öğrenilecek başka bir şey getirecekti." },
          { type: "text", text: "Sabah ışığı yeryüzünü aydınlatırken aynı toprak artık farklı görünüyordu. Hz. Âdem o topraktan yaratılmıştı. Şimdi insanlık bu toprağın üzerinde yaşayacak ve onu bir emanet olarak koruyacaktı." },
          { type: "text", text: "Kur'an, Hz. Âdem'in ilk tarlayı nerede açtığını, ilk ateşi nasıl yaktığını veya hangi aletleri kullandığını anlatmaz. Bunları bilmiyoruz. Fakat yeryüzündeki hayatın çalışma, sabır ve öğrenme gerektirdiğini biliyoruz." },
          { type: "text", text: "Allah, insanları yeryüzüne gönderirken onları rehbersiz bırakmayacağını bildirdi. Kendilerine yol gösteren mesajlar gelecekti. Bu rehberliğe uyanlar, doğru yönü bulabilecekti." },
          { type: "text", text: "Bir yolcu karanlıkta yönünü kaybedebilir. Fakat güvenilir bir işaret gördüğünde adımlarını yeniden düzenler. Allah'ın rehberliği de insana nereden gelip nereye yönelmesi gerektiğini hatırlatırdı." },
          { type: "text", text: "Bu rehberlik hayatın bütün güçlüklerini bir anda kaldırmayacaktı. İnsan yine çalışacak ve seçim yapacaktı. Fakat hangi davranışın Allah'ın hoşnutluğuna uygun olduğunu öğrenebilecekti." },
          {
            type: "interactive_word",
            before: "Allah'ın insana doğru yolu göstermesine ",
            word: "rehberlik",
            meaning: "Doğru yolu bulabilmesi için birine yol göstermek ve yardımcı olmaktır.",
            after: " denir; insanın görevi, gösterilen yolu dikkatle izlemektir.",
          },
          { type: "text", text: "Yeni yurt genişti. Yeni hayat ise ilk bakışta zor görünebilirdi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Allah, Hz. Âdem'i bağışlamakla kalmadı; ona doğru yolu da gösterdi. Hz. Âdem artık yalnızca ilk insan değildi. Allah'tan aldığı rehberliği ailesine ulaştıran ilk peygamberdi." },
          { type: "text", text: "Hz. Âdem, yeryüzündeki hayatın yalnızca yiyecek bulmak ve barınmak olmadığını öğretti. İnsan Allah'ı tanıyacak, iyiliği seçecek, haksızlıktan kaçınacak ve kendisine verilen emaneti koruyacaktı." },
          { type: "text", text: "Zorluklar bir anda ortadan kalkmadı. Fakat her zorluğun yanında öğrenme imkânı vardı. İnsan yorulduğunda dinlenebilir, bilmediğinde öğrenebilir ve yanıldığında doğruya dönebilirdi." },
          { type: "text", text: "Bir günün ardından başka bir gün geliyor, mevsimler birbirini izliyordu. İnsan attığı adımın sonucunu hemen görmeyebilirdi. Toprağa bırakılan bir tohum gibi bazı emeklerin karşılığı da zamanla ortaya çıkardı." },
          { type: "text", text: "Sabır, hiçbir şey yapmadan beklemek değildi. Doğru olanı yapmaya devam etmek ve sonucu Allah'a bırakmaktı. Yeryüzündeki yeni başlangıcın içinde bu sabra sık sık ihtiyaç duyulacaktı." },
          { type: "text", text: "Yeryüzü artık yalnız ve sessiz değildi. İlk aileyle birlikte sevgi, paylaşma ve öğretme de başlamıştı. Küçük bir filiz gibi başlayan insanlık ailesi zamanla büyüyecekti." },
          { type: "text", text: "Kur'an, bütün insanların aynı insanlık ailesinden geldiğini bildirir. İnsanların dilleri, renkleri ve yaşadıkları yerler zamanla farklılaşsa da hiçbiri yaratılışı sebebiyle diğerinden daha değerli değildi. Ortak köklerini hatırlamak, birbirlerinin hakkını koruma sorumluluğunu da hatırlatacaktı." },
          { type: "text", text: "Fakat aile büyüdükçe başka bir sorumluluk doğacaktı: Allah'tan gelen rehberliği yeni nesillere ulaştırmak." },
        ],
        has_question: true,
        question: {
          title: "Yeni Bir Yurt",
          prompt: "Daha önce hiç yapmadığın önemli bir işle karşılaştın. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Yeryüzündeki yeni hayatın hangi destekle başladığını okuyarak kararını karşılaştır.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "İşi küçük adımlara böler, öğrenerek ilerlerdim.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Yeni başlangıçlar, rehberlik ve küçük adımlarla kolaylaşır.",
            },
            {
              id: "b",
              text: "Birinin benim yerime yapmasını beklerdim.",
              comparison: "Yardım istemek güzeldir; fakat kendi sorumluluğumuzu tamamen başkasına bırakamayız.",
            },
            {
              id: "c",
              text: "İlk denemede zorlanınca yapamayacağıma karar verirdim.",
              comparison: "İlk zorluk sonucu belirlemez; yeryüzündeki hayatın kendisi öğrenerek ilerlemeyi gerektirdi.",
            },
          ],
        },
        learned: [
          "Yeni başlangıçlar zor görünebilir; rehberlik ve emek yolumuzu kolaylaştırır.",
          "Hz. Âdem'in nereye indiği ve hangi araçları ilk kullandığı kesin olarak bilinmez.",
          "Hz. Âdem, Allah'ın gösterdiği doğru yolu ailesine öğreten ilk peygamberdi.",
        ],
      },
      {
        id: "7",
        title: "İki Kardeşin Sınavı",
        ozet: "Âdem'in iki oğlu üzerinden kıskançlık, öfke, seçim ve geri dönüşü olmayan davranışların sonuçları anlatılır.",
        audioUrl: "",
        badgeName: "Sakin Güç Rozeti",
        paragraphs: [
          { type: "text", text: "Bir insanı asıl tanıtan şey, her şey istediği gibi giderken yaptıkları mıdır? Yoksa istediği sonuçla karşılaşamadığında seçtiği yol mu?" },
          { type: "text", text: "İblîs, yaptığı yanlış kendisine gösterildiğinde kibirlenmiş ve suçunu kabul etmemişti. Hz. Âdem (a.s.) ise yanıldığında hatasını kabul etmiş, Rabbine yönelerek tövbe etmişti." },
          { type: "text", text: "Şimdi Hz. Âdem'in ailesinde yaşanan başka bir olay, zor bir sonuç karşısında verilen kararların ne kadar önemli olduğunu gösterecekti." },
          { type: "text", text: "Yıllar geçmiş, Hz. Âdem ile Hz. Havva'nın ailesi büyümüştü. Hz. Âdem, Allah'tan öğrendiklerini ailesine öğretiyordu. Fakat doğru yolu bilmekle o yolu seçmek aynı şey değildi. Her insan kendi davranışından sorumluydu." },
          { type: "text", text: "Kur'an-ı Kerim, Hz. Âdem'in iki oğlu arasında yaşanan üzücü ve düşündürücü bir olaydan söz eder. Kur'an'da bu iki kardeşin isimleri açıklanmaz. İslâmî kaynaklarda ve anlatılarda onlar **Hâbil** ve **Kābil** isimleriyle tanınmıştır. Biz de anlatımı kolaylaştırmak için bu isimleri kullanacağız." },
          { type: "text", text: "Bir gün iki kardeş Allah'a birer kurban sundu." },
          {
            type: "interactive_word",
            before: "Allah'a yakınlaşmak ve O'nun rızasını kazanmak amacıyla sunulan şeye ",
            word: "kurban",
            meaning: "Allah'a yakınlaşmak amacıyla sunulan şey veya yapılan ibadettir.",
            after: " denir.",
          },
          { type: "text", text: "Kardeşlerden birinin kurbanı kabul edildi, diğerininki ise kabul edilmedi. Kur'an, onların ne sunduklarını veya kabul edildiğinin nasıl anlaşıldığını anlatmaz. Bu nedenle kurbanların ne olduğu hakkında kesin bir şey söyleyemeyiz." },
          { type: "text", text: "İslâmî anlatılarda kurbanı kabul edilen kardeş Hâbil, kabul edilmeyen kardeş ise Kābil olarak tanınır." },
          { type: "text", text: "Kābil, karşılaştığı sonuçtan dolayı üzülmüş olabilirdi. Üzülmek veya hayal kırıklığına uğramak insanın yaşayabileceği doğal duygulardı. Ancak Kābil, bu duygularını doğru biçimde yönetemedi. Kendisini kardeşiyle karşılaştırdı ve öfkesini Hâbil'e yöneltti." },
          { type: "text", text: "Oysa Hâbil, kardeşinin kurbanının kabul edilmemesine sebep olmamıştı." },
          { type: "text", text: "Kābil'in önünde hâlâ iki yol vardı. Durabilir, sakinleşebilir ve kendi davranışını gözden geçirebilirdi. Ya da kardeşini suçlayarak içindeki öfkenin büyümesine izin verebilirdi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Ne yazık ki Kābil durup sakinleşmeyi seçmedi. Yaşadığı sonucun sorumlusu kardeşiymiş gibi davranarak Hâbil'e:" },
          { type: "text", text: "\"Seni öldüreceğim!\" dedi." },
          { type: "text", text: "Hâbil, kardeşinin tehdidine başka bir tehditle karşılık vermedi. Ona şöyle dedi:" },
          { type: "text", text: "\"Allah ancak kendisine karşı gelmekten sakınanlardan kabul eder.\"" },
          { type: "text", text: "Ardından kötülüğe kötülükle cevap vermeyeceğini açıkça belirtti:" },
          { type: "text", text: "\"Sen beni öldürmek için elini uzatsan da ben seni öldürmek için sana elimi uzatmayacağım. Çünkü ben âlemlerin Rabbi olan Allah'tan korkarım.\"" },
          { type: "text", text: "Hâbil'in sözleri, gerçek gücün öfkeyle saldırmak olmadığını gösteriyordu. İnsan öfkeli olsa bile yanlış bir davranıştan uzak durmayı seçebilirdi." },
          { type: "text", text: "Fakat Kābil bu uyarıyı dinlemedi. İçinde büyüttüğü öfkenin kendisini yönetmesine izin verdi." },
          { type: "text", text: "Sonunda hiçbir zaman yapmaması gereken çok büyük bir yanlış yaptı ve kardeşi Hâbil'i öldürdü." },
          { type: "text", text: "Öfkesi onu geri dönüşü olmayan bir sonuca sürüklemişti. Artık Hâbil geri gelmeyecekti. Kābil ise yaptığı davranışın ağır sorumluluğuyla baş başa kalmıştı." },
          { type: "text", text: "Kardeşinin bedenine ne yapacağını bilmiyordu. Bunun üzerine Allah, toprağı eşeleyen bir karga gönderdi. Kābil, kargayı dikkatle izledi ve kardeşinin bedenini toprağa nasıl örtebileceğini anladı." },
          { type: "text", text: "\"Yazıklar olsun bana!\" dedi. \"Şu karga kadar olup da kardeşimin bedenini örtmekten bile aciz miyim?\"" },
          { type: "text", text: "Kābil yaptığı şeyden dolayı pişmanlık duydu. Fakat pişmanlığı, Hâbil'i geri getirmedi. Bazı yanlışların sonucu, \"Keşke yapmasaydım,\" demekle ortadan kalkmazdı." },
          { type: "text", text: "Hz. Âdem topraktan yaratılmıştı. Şimdi toprağı eşeleyen küçücük bir karga, onun oğluna ne yapması gerektiğini gösteriyordu. Fakat asıl önemli ders, bundan önce verilmişti: İnsan, öfkesi büyümeden durmalıydı." },
          { type: "text", text: "Kur'an, Hz. Âdem ile Hz. Havva'nın bu olay karşısında neler söylediğini anlatmaz. Bu yüzden onlara ait konuşmalar uyduramayız. Fakat bir evlatlarını kaybetmenin, diğer evlatlarının da böyle büyük bir yanlış yapmasının onlar için çok ağır bir üzüntü olduğunu düşünebiliriz." },
          { type: "text", text: "Hz. Âdem ailesine doğru yolu öğretmişti. Fakat bir peygamberin evladı olmak, insanı kendi seçimlerinin sorumluluğundan kurtarmıyordu. Her insan doğru ile yanlış arasında kendi kararını vermeliydi." },
          { type: "text", text: "İblîs yanlış yaptığında kibirlenmişti. Hz. Âdem yanıldığında tövbe etmişti. Kābil ise karşılaştığı sonucu kabullenmeyerek öfkesini kardeşine yöneltmişti." },
          { type: "text", text: "Üçü de bir seçim yapmıştı. Hz. Âdem hatasını kabul edip Allah'a yönelerek doğruya dönmeyi seçmişti. Kābil ise pişmanlık duysa da yaptığı büyük yanlışın sonucunu geri alamadı." },
          { type: "text", text: "Kıskançlık ve öfke kalbimize gelebilir. Bu duyguları hissetmemiz bizi kötü bir insan yapmaz. Ancak hiçbir duygu bize başkasına zarar verme hakkı vermez." },
          { type: "text", text: "Öfke yükseldiğinde yapılabilecek en doğru şey durmak, oradan uzaklaşmak ve güvendiğimiz bir yetişkinden yardım istemektir." },
          { type: "text", text: "Birisi bizi tehdit ederse de tehlikeli yerde kalmamalıyız. Kötülüğe kötülükle karşılık vermeden oradan uzaklaşmalı ve hemen güvendiğimiz bir yetişkine haber vermeliyiz." },
          { type: "text", text: "Gerçek güç, başkasına zarar vermek değil; öfkelendiğimiz anda kendimizi yanlış bir davranıştan koruyabilmektir." },
        ],
        has_question: true,
        question: {
          title: "İki Kardeşin Sınavı",
          prompt: "Yaptığın bir çalışma seçilmedi, kardeşinin veya arkadaşının çalışması seçildi. İçinde kıskançlık ve öfke hissettin. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Şimdi Kābil'in hangi yolu seçtiğini ve bu seçimin nelere yol açtığını oku.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Onu suçlar ve öfkemi ondan çıkarırdım.",
              comparison: "Kābil de öfkesini kardeşine yöneltti. Hikâye, başkasını suçlamanın ve öfkeyle davranmanın çok ağır sonuçlar doğurabileceğini gösterdi.",
            },
            {
              id: "b",
              text: "Biraz uzaklaşır, sakinleşir, neden üzüldüğümü düşünür ve güvendiğim bir büyüğe anlatırdım.",
              comparison: "Seçimin hikâyedeki doğru değerle uyumlu. Sakinleşmek, biraz uzaklaşmak ve güvendiğin birinden yardım istemek seni yanlış davranışlardan koruyabilir.",
            },
            {
              id: "c",
              text: "Hiçbir şey söylemez fakat içimdeki öfkeyi büyütmeye devam ederdim.",
              comparison: "Öfkeyi sessizce büyütmek onu ortadan kaldırmaz. Kābil'in öfkesi de zamanla daha tehlikeli hâle geldi. Duyguları güvenilir biriyle paylaşmak daha doğru olurdu.",
            },
          ],
        },
        learned: [
          "Kıskançlık ve öfke hissetmekle bu duyguların yönlendirdiği yanlış davranışı yapmak aynı değildir.",
          "Öfkeyle verilen kararlar geri dönüşü olmayan sonuçlara yol açabilir.",
          "İnsan hatası karşısında başkasını suçlamak yerine, Hz. Âdem gibi hatasını kabul ederek doğruya dönmelidir.",
        ],
        gorev: {
          id: "adem-7-ofkede-duruyorum",
          ad: "Öfke Anında Dört Adımım",
          kategori: "duygu yönetimi",
          aciklama: "Sakin olduğun bir zamanda bir büyüğünle birlikte öfke planını hazırla:\n1. Dur.\n2. Bulunduğun yerden uzaklaş.\n3. Yavaşça nefes al.\n4. Güvendiğin bir yetişkine anlat.",
          sure: "5–10 dakika",
          olcut: "Dört adımı sırasıyla söylemek ve yardım istenebilecek en az iki güvenilir yetişkin belirlemek.",
          guvenlikNotu: "Birisi seni tehdit ederse sorunu tek başına çözmeye çalışma. Güvenli bir yere geçerek hemen bir yetişkinden yardım iste.",
        },
      },
      {
        id: "8",
        title: "Sılaya Uzanan Yol",
        ozet: "Hz. Âdem'in dünya yolculuğu sona ererken bıraktığı değerler yaşamaya devam eder.",
        audioUrl: "",
        badgeName: "Huzurlu Miras Rozeti",
        paragraphs: [
          { type: "text", text: "Hz. Âdem'in (a.s.) yeryüzündeki hayatı uzun bir yolculuktu. Topraktan yaratılmış, bilgiyle değer kazanmış, cennette yaşamış, aldanmış, tövbe etmiş ve Allah'ın rehberliğiyle yeni bir başlangıç yapmıştı." },
          { type: "text", text: "Yolculuğun her durağında başka bir değer öne çıkmıştı. Yaratılış sorumluluğu, isimler bilgiyi, secde alçak gönüllülüğü hatırlatmıştı. Yasak ağaç güveni, tövbe ise umudu öğretmişti." },
          { type: "text", text: "Başlangıçta yeryüzü bir misafiri bekliyordu. Şimdi o misafirin ailesi büyümüş ve dünya insan sesleriyle tanışmıştı. Fakat ilk görev değişmemişti: Emaneti korumak ve Allah'ın rehberliğine uymak." },
          { type: "text", text: "Bu yolculuğun kaç yıl sürdüğünü kesin olarak bilmiyoruz. Kaynaklarda farklı sayılar anlatılır. Kur'an ise Hz. Âdem'in yaşından veya kabrinin yerinden söz etmez. Bu nedenle bilmediğimiz ayrıntıları gerçekmiş gibi anlatmayız." },
          { type: "text", text: "Bildiklerimiz, bir ömrü anlamak için yeterliydi. Hz. Âdem insanlara Allah'ı tanıttı. Öğrenmenin, sorumluluğun ve hatadan dönüşün değerini kendi hayatıyla gösterdi." },
          { type: "text", text: "Bazı insanlar geride çok eşya bırakabilir. Fakat eşyalar zamanla kaybolur veya başkasının olur. Doğru bilgi ve güzel davranış ise öğrenen insanların hayatında yeniden görünür." },
          { type: "text", text: "Hz. Âdem'in tövbesi de böyle bir mirastı. Onun kıssasını duyan biri, hatasının ardından umutsuzluğa kapılmaması gerektiğini öğrenebilirdi. Yanlışta ısrar etmek yerine dönüş yolunu arayabilirdi." },
          {
            type: "interactive_word",
            before: "İnsanın özlediği yere veya sevdiğine kavuşmasına ",
            word: "sıla",
            meaning: "İnsanın özlediği yere veya sevdiklerine kavuşmasıdır.",
            after: " denir; dünya hayatının sonunda bütün insanlar Allah'a döner.",
          },
          { type: "text", text: "Her insanın dünya hayatı bir gün sona erer. Hz. Âdem de bir peygamber olmakla birlikte insandı. Dünya görevini tamamladığında vefat etti ve Rabbine döndü." },
          { type: "text", text: "Ölüm, insanın yaptığı güzel işlerin değersizleşmesi değildir. Bir öğretmenin öğrettiği bilgi, kendisi sınıftan ayrıldıktan sonra öğrencilerinde yaşamaya devam eder. Bir büyüğün güzel sözü de onu hatırlayan kalplerde yer bulabilir." },
          { type: "text", text: "Hz. Âdem'in ailesi onun öğrettiklerini hatırlayabilir ve sonraki nesillere aktarabilirdi. Böylece bir ömür sona erse de iyilik yolu devam ederdi." },
          { type: "text", text: "Onun ardından kalan en değerli miras bir eşya veya büyük bir yapı değildi. Allah'tan öğrendiği doğru yol, ailesine öğrettiği güzel değerler ve insanlığa bıraktığı tövbe örneğiydi." },
          { type: "text", text: "Değerli bir bilgi bize ulaştığında iki seçimimiz vardır. Onu yalnızca kendimiz için saklayabilir veya güvenilir biçimde başkalarına aktarabiliriz." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Âdem'in öğrettikleri onun vefatıyla kaybolmadı. Ailesi, Allah'a kulluk etmenin ve yeryüzünde sorumlulukla yaşamanın önemini sonraki nesillere aktardı." },
          { type: "text", text: "Bu aktarımın doğru yapılması önemliydi. Bir söz eklenip çıkarıldığında zamanla ilk anlamından uzaklaşabilirdi. Bu nedenle güvenilir bilgiyi korumak, bilmediğimiz ayrıntılarda dürüst olmak ve gerçeği süslemek için uydurmamak gerekirdi." },
          { type: "text", text: "Hz. Âdem'in hayatını anlatırken de aynı emaneti taşıyoruz. Kur'an'ın bildirdiğini güvenle anlatıyor, kesin olmayan rivayetleri gerçek gibi sunmuyoruz. Çünkü peygamberleri sevmek, onlar hakkında doğru bilgiye özen göstermeyi de gerektirir." },
          { type: "text", text: "İslâmî kaynaklarda Hz. Âdem'in ardından oğlu Hz. Şît'in insanlara rehberlik ettiği anlatılır. Hz. Şît'in adı Kur'an'da geçmez; onunla ilgili bilgiler İslâm tarih ve kıssa kaynaklarında yer alır. Bu nedenle onun yolculuğu, kendi kitabında kaynak dereceleri belirtilerek anlatılacaktır." },
          { type: "text", text: "Hz. Âdem'in hikâyesi insanın yalnızca nasıl yaratıldığını anlatmaz. Nasıl öğrenmesi, nasıl seçim yapması ve yanıldığında nasıl dönmesi gerektiğini de gösterir." },
          { type: "text", text: "Toprakta başlayan yolculuk yeniden toprağa ulaştı. Fakat ekilen değerler sessizce filizlenmeye devam etti: Bilgi, alçak gönüllülük, tövbe, umut ve sorumluluk." },
          { type: "text", text: "Şimdi bu yolculuğun emaneti, onu okuyan her çocuğun düşüncesinde küçük bir filiz gibi büyüyebilirdi." },
        ],
        has_question: true,
        question: {
          title: "Sılaya Uzanan Yol",
          prompt: "Ailenden öğrendiğin güzel ve yararlı bir bilgiyi küçük bir çocuğa öğretmen istendi. Ne yapardın?",
          afterChoiceNote: "Cevabını aklında tut. Hz. Âdem'in bıraktığı mirasın nasıl devam ettiğini okuyarak kararını karşılaştır.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Unuturum diye bu sorumluluğu kabul etmezdim.",
              comparison: "Sorumluluktan kaçmak bilgiyi durdurabilirdi; hikâyede güzel miras aktarılınca yaşamaya devam etti.",
            },
            {
              id: "b",
              text: "Yalnızca beni dinlerse anlatacağımı söylerdim.",
              comparison: "Öğretmek yalnızca karşımızdaki kusursuz dinlediğinde yapılmaz; sabır rehberliğin bir parçasıdır.",
            },
            {
              id: "c",
              text: "Doğru öğrendiğimden emin olur, sabırla anlatırdım.",
              comparison: "Seçimin hikâyedeki değerle uyumlu. Doğru bilgi, özenle öğrenilip sabırla aktarılır.",
            },
          ],
        },
        learned: [
          "Güzel bir miras, doğru bilginin ve iyi değerlerin sonraki insanlara aktarılmasıdır.",
          "Hz. Âdem'in kesin ömrü ve kabrinin yeri Kur'an'da bildirilmez.",
          "Hz. Âdem'in yolculuğu öğrenme, sorumluluk, tövbe ve umutla tamamlandı.",
        ],
      },
    ],
  },
  {
    id: "hz-nuh",
    routePrefix: "nuh",
    title: "Hz. Nuh",
    eyebrow: "Hz. Nuh - Demo Kitap",
    chapters: [
      {
        id: "1",
        title: "Sabırlı Bir Davet",
        ozet: "Usanmadan süren güzel bir çağrı",
        audioUrl: "",
        badgeName: "Sabır Başlangıç Rozeti",
        has_question: true,
        paragraphs: [
          {
            type: "text",
            text: "Çok ama çok eski zamanlarda, yeryüzünün kalabalık şehirlerinden birinde Hz. Nuh yaşardı. O, insanlara iyiliği ve doğru yolu anlatmakla görevlendirilmişti. Sabahları güneş doğarken yola çıkar; çarşıda, sokakta, kapı önlerinde karşılaştığı herkese güzel sözlerle seslenirdi. Kimseyi küçümsemez, kimseye kızmaz, her cümlesini tatlı bir dille söylerdi.",
          },
          {
            type: "interactive_word",
            before:
              "Bu bölümde en çok ",
            word: "sabır",
            meaning:
              "Sabır, zorlandığında hemen vazgeçmemek ve doğru şeyi güzelce sürdürmektir.",
            after:
              " değerini keşfediyoruz. Çünkü Hz. Nuh, upuzun yıllar boyunca usanmadan, yorulmadan anlatmaya devam etti. Kapılar yüzüne kapandı, sözleri duymazlıktan gelindi; ama o ertesi sabah yine aynı umutla yola çıktı.",
          },
          {
            type: "text",
            text: "Ne yazık ki insanların çoğu onu hemen dinlemedi. Kimi alay etti, kimi başını çevirip yoluna devam etti. Bazı günler tek bir kişi bile durup ona kulak vermedi. Ama Hz. Nuh kızmadı, kırmadı, küsmedi. Derin bir nefes aldı ve kendi kendine şöyle dedi: 'Bugün dinlemedilerse, belki yarın dinlerler.'",
          },
          {
            type: "text",
            text: "Yıllar yılları kovaladı. Hz. Nuh'un saçlarına aklar düştü ama kalbindeki umut hiç eskimedi. Az sayıda da olsa onu dinleyen, kalbi iyilikle dolan insanlar oldu. Onlar karanlık bir gecede yanan kandiller gibiydiler; sayıları azdı ama ışıkları sıcacıktı. Birbirlerine destek oldular, birlikte güçlendiler.",
          },
          {
            type: "text",
            text: "Dur ve düşün: Sen bir şeyi bir kez anlatıp dinlenilmediğinde hemen vazgeçiyor musun? Hz. Nuh'un hikayesi bize fısıldıyor: Güzel bir söz, sabırlı bir kalpte filizlenen tohum gibidir. Bugün olmasa bile, bir gün mutlaka yeşerir.",
          },
        ],
        question: {
          title: "Sabırlı Bir Davet",
          prompt:
            "Doğru bildiğin bir şeyi güzelce anlattın ama arkadaşın seni hemen dinlemedi. Ne yaparsın?",
          correctOption: "b",
          feedback:
            "Çok iyi! Sabır, doğruyu kırmadan ve incitmeden anlatmaya devam etmektir.",
          options: [
            { id: "a", text: "Kızar ve bağırırdım." },
            { id: "b", text: "Sakin kalır, uygun zamanda tekrar güzelce anlatırdım." },
            { id: "c", text: "Bir daha kimseye iyi bir şey söylemezdim." },
          ],
        },
        learned: [
          "Sabır, doğru yolda kalbi güçlü tutar.",
          "Güzel söz bazen hemen değil, zamanla etkisini gösterir.",
        ],
        buguneTasi:
          "Bugün birine iyi bir şeyi sakin ve güzel bir dille anlatmayı dene.",
      },
      {
        id: "2",
        title: "Geminin Hazırlığı",
        ozet: "Emekle yükselen büyük gemi",
        audioUrl: "",
        badgeName: "Emek Rozeti",
        has_question: false,
        paragraphs: [
          {
            type: "text",
            text: "Bir gün Hz. Nuh'a çok özel bir görev verildi: Kocaman bir gemi yapacaktı. Hem de denizden çok uzakta, kupkuru toprakların ortasında! Hz. Nuh hiç tereddüt etmedi. Kollarını sıvadı, keresteleri topladı ve çekicini eline aldı. Tak, tak, tak... Artık her sabah şehrin kenarından bu çalışkan ses yankılanıyordu.",
          },
          {
            type: "image",
            src: nuhShipImage,
            alt: "Dalgalar üzerinde ilerleyen sade bir gemi çizimi",
            caption: "Emek verilen işler, sağlam bir yolculuğun başlangıcıdır.",
          },
          {
            type: "text",
            text: "Gemiyi görenler gülüp geçiyordu: 'Deniz yok, dere yok; bu koca gemi burada ne yapacak?' Ama Hz. Nuh onlara aldırmadı. Çünkü o, işini kimin için yaptığını biliyordu. Her çakılan çivide bir dua, her kesilen tahtada bir umut vardı. Alay eden sesler yükseldikçe, onun çekicinin sesi daha da kararlı vuruyordu.",
          },
          {
            type: "interactive_word",
            before: "Burada öğrendiğimiz değer ",
            word: "emek",
            meaning:
              "Emek, güzel bir sonuç için zaman ayırmak, çalışmak ve özen göstermektir.",
            after:
              " vermektir. Gemi gün geçtikçe büyüdü, yükseldi ve güçlendi. Tıpkı senin harf harf okumayı öğrenmen, adım adım bisiklete binmen gibi... Büyük işler, hep küçük ve özenli adımlarla tamamlanır.",
          },
        ],
        learned: [
          "Doğru işler emek ister.",
          "Hazırlık yapmak, güvenli bir yolculuğun ilk adımıdır.",
        ],
        buguneTasi:
          "Bugün küçük bir işini özenle tamamla ve emeğinin sonucunu fark et.",
      },
      {
        id: "3",
        title: "Yağmur Başlayınca",
        ozet: "Fırtınada sakin kalan kalpler",
        audioUrl: "",
        badgeName: "Güven Rozeti",
        has_question: true,
        paragraphs: [
          {
            type: "text",
            text: "Derken bir sabah gökyüzü kurşun rengi bulutlarla kaplandı. Önce tık... tık... diye küçük damlalar düştü; sonra yağmur bir perde gibi gökten yere indi. Herkes telaşla sağa sola koşuşturuyordu. Sular yükseliyor, dereler taşıyor, yollar birer göle dönüyordu.",
          },
          {
            type: "text",
            text: "Hz. Nuh ise sakindi. Çünkü o, üzerine düşen her şeyi yapmıştı: Gemiyi sapasağlam inşa etmiş, yanına alması gerekenleri özenle almış ve kalbini Allah'a emanet etmişti. Gemi, dev dalgaların üzerinde bir beşik gibi sallanırken içindekiler güvendeydi.",
          },
          {
            type: "interactive_word",
            before: "Allah'a ",
            word: "güvenmek",
            meaning:
              "Güvenmek, elinden geleni yaptıktan sonra kalbini Allah'a dayamaktır.",
            after:
              " kalbe sakinlik verir. Fırtına ne kadar güçlü olursa olsun, sağlam bir hazırlık ve güvenle dolu bir kalp ondan daha güçlüdür. Dışarıda sular yükselirken geminin içinde huzur vardı.",
          },
        ],
        question: {
          title: "Zor Bir Gün",
          prompt:
            "Zor bir gün başladı ve biraz kaygılandın. Kalbini sakinleştirmek için ne yaparsın?",
          correctOption: "a",
          feedback:
            "Harika! Çalışıp tedbir almak ve Allah'a güvenmek kalbe huzur verir.",
          options: [
            { id: "a", text: "Tedbir alır, dua eder ve sakin kalmaya çalışırdım." },
            { id: "b", text: "Panik yapar, kimseyi dinlemezdim." },
            { id: "c", text: "Hiçbir şey yapmadan beklerdim." },
          ],
        },
        learned: [
          "Zor anlarda sakin kalmak önemlidir.",
          "Tedbir ve dua birlikte kalbi güçlendirir.",
        ],
      },
      {
        id: "4",
        title: "Güvenle Yolculuk",
        ozet: "Dalgalar üzerinde tevekkül günleri",
        audioUrl: "",
        badgeName: "Tevekkül Rozeti",
        has_question: false,
        paragraphs: [
          {
            type: "text",
            text: "Günler günleri kovaladı. Gemi, uçsuz bucaksız suların üzerinde usul usul ilerliyordu. Geceleri gökyüzünde yıldızlar parlıyor, gündüzleri dalgalar gemiyle oyun oynuyordu. İçeride ise herkes birbirine yardım ediyor, yiyecekler adaletle paylaşılıyor, hayvanlara özenle bakılıyordu.",
          },
          {
            type: "interactive_word",
            before: "Bu güvenin adı ",
            word: "tevekkül",
            meaning:
              "Tevekkül, elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır.",
            after:
              " olarak anlatılır. Bu uzun yolculukta kimse korkuya kapılmadı; çünkü yapılması gereken her şey yapılmış, gerisi sonsuz bir güvenle Allah'a bırakılmıştı.",
          },
          {
            type: "text",
            text: "Ve bir gün sular sakinleşti. Gemi yavaşça bir dağın tepesine oturdu; uzun yolculuk sona ermişti. Sabır, emek ve güven el ele vermiş, o küçük topluluğu güvenle yarına taşımıştı. Hz. Nuh, geminin kapısında durdu ve şükretti.",
          },
        ],
        learned: [
          "Tevekkül çalışmayı bırakmak değil, çalıştıktan sonra güvenmektir.",
          "Kalp, doğru güvenle sakinleşir.",
        ],
        buguneTasi:
          "Bugün bir iş için önce çalış, sonra sonucunu güzel bir dua ile Allah'a bırak.",
      },
      {
        id: "5",
        title: "Yeni Bir Başlangıç",
        ozet: "Yeryüzünde umutla açılan yeni sayfa",
        audioUrl: "",
        badgeName: "Yeni Başlangıç Rozeti",
        has_question: true,
        paragraphs: [
          {
            type: "text",
            text: "Geminin kapısı açıldığında içeri taptaze bir rüzgar doldu. Gökyüzü masmaviydi; toprak yağmurla yıkanmış, yeryüzü yepyeni bir sayfa gibi tertemiz olmuştu. Hz. Nuh ve yanındakiler, şükrederek yeni yurtlarına ilk adımlarını attılar.",
          },
          {
            type: "text",
            text: "Önce küçük fidanlar dikildi, sonra evler kuruldu. Çocuklar yeni derelerin kıyısında oyunlar oynadı; büyükler tarlaları ekti. Zor günler artık geride kalmıştı ama onlardan öğrenilen dersler hiç unutulmadı: sabretmek, emek vermek ve güvenmek.",
          },
          {
            type: "interactive_word",
            before: "Yeni başlangıçlar ",
            word: "umut",
            meaning:
              "Umut, güzel şeylerin yeniden başlayabileceğine inanmak ve iyi adım atmaktır.",
            after:
              " ister. Hz. Nuh'un hikayesi bize şunu öğretir: Her fırtınanın bir sonu, her sonun ise yepyeni bir başlangıcı vardır. Bugün bir şeyler ters gitse bile üzülme; yarın, umutla açılmayı bekleyen bembeyaz bir sayfadır.",
          },
        ],
        question: {
          title: "Yeni Bir Sayfa",
          prompt:
            "Zor bir dönem bitti ve önünde yepyeni bir başlangıç var. İlk adımın ne olur?",
          correctOption: "c",
          feedback:
            "Çok güzel! Yeni başlangıçlar şükür, umut ve iyi niyetle daha da güzelleşir.",
          options: [
            { id: "a", text: "Eski zorlukları düşünüp hiçbir şey yapmazdım." },
            { id: "b", text: "Sadece kendimi düşünürdüm." },
            { id: "c", text: "Şükreder, iyi bir plan yapar ve umutla başlardım." },
          ],
        },
        learned: [
          "Her bitiş yeni bir başlangıca kapı açabilir.",
          "Umut, iyi davranışlarla güçlenir.",
        ],
      },
    ],
  },
];

export function getBookChapterByRouteId(routeId: string) {
  for (const book of books) {
    const chapter = book.chapters.find(
      (item) =>
        `${book.routePrefix}-${item.id}` === routeId ||
        `${book.id}-${item.id}` === routeId,
    );

    if (chapter) return { book, chapter };
  }

  return null;
}
