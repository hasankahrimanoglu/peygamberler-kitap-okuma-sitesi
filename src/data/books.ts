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
    };

export type BookQuestionOption = {
  id: "a" | "b" | "c";
  text: string;
};

export type BookQuestion = {
  title: string;
  prompt: string;
  options: BookQuestionOption[];
  correctOption?: BookQuestionOption["id"];
  feedback?: string;
};

export type BookChapter = {
  id: string;
  title: string;
  audioUrl: string;
  badgeName: string;
  paragraphs: BookContentBlock[];
  has_question: boolean;
  question?: BookQuestion;
  learned: string[];
  buguneTasi?: string;
};

export type BookDefinition = {
  id: string;
  routePrefix: string;
  title: string;
  eyebrow: string;
  chapters: BookChapter[];
};

export type ParentReportBook = {
  key: string;
  title: string;
  keywords: string[];
  totalQuizQuestions: number;
  parent_summary: string;
  chat_questions: string[];
};

export const parentReportBooks: ParentReportBook[] = [
  {
    key: "adem",
    title: "Hz. Adem",
    keywords: ["adem"],
    totalQuizQuestions: 5,
    parent_summary:
      "Çocuğunuz Hz. Adem yolculuğunda öğrenme, hata sonrası yeniden deneme ve sorumluluk alma değerlerini güçlü biçimde yakalamış görünüyor. Bu başarıyı küçük bir sohbetle fark ettirmeniz, okuma emeğini daha da anlamlı hale getirebilir.",
    chat_questions: [
      "Hz. Adem'in öğrendiği isimler sana neyi hatırlattı?",
      "Bir hata yaptığında yeniden denemek için sana ne cesaret verir?",
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
    id: "hz-nuh",
    routePrefix: "nuh",
    title: "Hz. Nuh",
    eyebrow: "Hz. Nuh - Demo Kitap",
    chapters: [
      {
        id: "1",
        title: "Sabırlı Bir Davet",
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
