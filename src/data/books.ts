export type BookContentBlock =
  | {
      type: "text";
      text: string;
      /** Metnin içeriğini değiştirmeden editoryal olarak vurgulanacak kısa ifadeler. */
      emphasis?: string[];
      /** Paragrafı sakin altın çizgili anahtar cümle kutusuna dönüştürür. */
      keySentence?: boolean;
      /** Yalnız hikâyenin gerçek açılış paragrafındaki başlangıç harfi. */
      dropCap?: boolean;
    }
  | {
      type: "image";
      src: string;
      /** Tablet dikey ve mobil için aynı sahnenin 3:4 uyarlaması. */
      portraitSrc?: string;
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
      // özel sayfa (YENI-KITAP-ICERIK-URETIM-BRIFI.md 7.5). Kurgusal tanıkta sistem
      // sayfanın altına "Bu sayfadaki çocuk hayalîdir..." notunu gösterir.
      type: "witness";
      witnessName: string;
      witnessLabel: string;
      body: string;
      isFictional: boolean;
    };

export type BookIllustration = {
  src: string;
  /** Tablet dikey ve mobil için aynı sahnenin 3:4 uyarlaması. */
  portraitSrc?: string;
  alt: string;
  caption?: string;
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
  /** Bölüm açılışındaki tek güçlü kapak sahnesi; her bölümde zorunlu değildir. */
  coverIllustration?: BookIllustration;
  /** `sparse`: yalnız içerikte açıkça tanımlanan güçlü sahneler gösterilir. */
  illustrationMode?: "sparse";
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
    key: "sit",
    title: "Hz. Şît",
    keywords: ["sit"],
    totalQuizQuestions: 4,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz bazı kararlarda bölümün değerini yakalayan seçeneği, bazılarında ise daha farklı seçenekleri değerlendirmiş olabilir. Bu yaşta kararların değişkenlik göstermesi beklenen bir durumdur. Hangi bölümde hangi seçeneği düşündüğünü konuşmak, sonucun kendisinden daha öğretici olabilir.",
    parent_summary_variants: {
      high: "Çocuğunuz bu kitaptaki karar noktalarının çoğunda bölümün değerini yakalayan seçenekleri işaretlemiş olabilir. Bu kararlar; üzgün birinin yanında sabırla durmayı, dinlenmese bile doğruyu söylemeyi ve bozulan bir işi baştan denemeyi öne çıkarıyor. Bu bir başarı ölçümü değildir; yalnızca hangi davranışlara yakın durduğunu gösterir.",
      mixed: "Çocuğunuz bazı kararlarda bölümün değerini yakalayan seçeneği, bazılarında ise daha farklı seçenekleri değerlendirmiş olabilir. Bu yaşta kararların değişkenlik göstermesi beklenen bir durumdur. Hangi bölümde hangi seçeneği düşündüğünü konuşmak, sonucun kendisinden daha öğretici olabilir.",
      low: "Çocuğunuz kararların çoğunda, bölümün değerinden uzak duran seçeneklere yönelmiş olabilir. Bu, bir eksiklik göstergesi değildir; çoğu zaman soruyu farklı okumaktan ya da o an aklına gelen ilk çözümü seçmekten kaynaklanır. Bir bölümü birlikte yeniden okuyup “sen olsan ne yapardın” diye konuşmak yararlı olabilir.",
    },
    chat_questions: [
      "Sen bir şeyi doğru bildiğin hâlde kimse sana inanmasa ne hissederdin? Böyle bir şey hiç oldu mu?",
      "Uzun zaman uğraştığın bir şeyin bozulduğu oldu mu? O gün ne yaptın, sonra ne oldu?",
      "Sana emanet edilen bir şey oldu mu hiç? Onu geri verirken nasıl bir duygu içindeydin?",
    ],
    parent_faq: [
      {
        question: "Hz. Âdem ve Hz. Havva ölünce Şît çok mu üzüldü? Peygamberler de ölür mü?",
        approach: "Evet, üzüldü. Ölüm herkes için geçerlidir ve peygamberler de bundan ayrı değildir. Çocuğunuza bunu inkâr etmeden, sakin bir dille söyleyebilirsiniz. Hikâyede Şît'in üzüntüsü anlatılıyor, ama aynı zamanda babasının bıraktığı işi sürdürdüğü de gösteriliyor. Çocuğunuz asıl olarak “benim sevdiklerim de gidecek mi” diye soruyor olabilir; önce bu duyguyu duyduğunuzu belli edin.",
      },
      {
        question: "Hz. Şît gerçekten yaşadı mı? Kur'an'da adı var mı?",
        approach: "Hz. Şît'in adı Kur'an'da geçmez. Onun hakkında bildiklerimiz tefsir ve tarih kaynaklarındaki anlatımlara dayanır. Bu kitap da o anlatımları “anlatılanlara göre” diyerek aktarır. Çocuğunuza “bazı şeyleri kesin biliyoruz, bazılarını ise bilmiyoruz” demek, dürüst ve güven veren bir cevaptır. Bilmediğimizi söylemek, uydurmaktan her zaman daha iyidir.",
      },
      {
        question: "Kâbe'yi gerçekten Hz. Âdem mi yaptı, Hz. Şît mi onardı?",
        approach: "Bu konuda farklı anlatımlar vardır ve kesin bir bilgi yoktur. Kitap bu yüzden “anlatılanlara göre” ifadesini kullanır. Çocuğunuz kesin bir cevap beklerse, tarihin çok eski dönemleri için elimizde her zaman kesin belge olmadığını söyleyebilirsiniz. Bu, kıssanın verdiği dersi zayıflatmaz.",
      },
      {
        question: "Herkes Şît'e tembel dedi. İnsanlar niye böyle konuşuyor?",
        approach: "Çünkü bir şeyin tamamını görmeden konuşmak kolaydır. Hikâyede Hazura, duyduklarına inanmak yerine gidip kendi gözüyle bakmayı seçiyor ve gerçeği böyle öğreniyor. Çocuğunuz okulda ya da arkadaş grubunda benzer bir durum yaşıyor olabilir. Ona, birisi hakkında konuşulanları duyduğunda ne yapabileceğini sormak iyi bir başlangıç olur.",
      },
      {
        question: "Kimsenin uğramadığı o komşu neden yalnız bırakılmıştı?",
        approach: "Hikâye bunun sebebini söylemez; sadece herkesin ondan uzak durduğunu ve Şît'in ona yardım ettiğini anlatır. Bu bilinçli bir tercihtir, çünkü bir insanı dışlamanın “haklı” bir sebebi olmaz. Çocuğunuza sınıfında yalnız kalan biri olup olmadığını sorabilir, ona nasıl yaklaşabileceğini birlikte düşünebilirsiniz.",
      },
      {
        question: "Fırtınada insanlara bir şey oldu mu?",
        approach: "Hikâye zarar gören çadırlardan ve dolan kuyulardan söz eder, ama kimsenin başına gelenleri ayrıntılı anlatmaz. Çocuğunuz merak ederse, tehlikeli havalarda ne yapılacağını konuşmak faydalı olur: içeride kalmak, pencerelerden uzak durmak ve güvendiği bir yetişkinin yanında olmak. Böylece korku yerine hazırlık duygusu kalır.",
      },
    ],
  },
  {
    key: "idris",
    title: "Hz. İdrîs",
    keywords: ["idris"],
    totalQuizQuestions: 4,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu, kitabın soruları için beklenen bir dağılımdır; sorular tek doğru cevabı bulmaktan çok düşünmeyi amaçlar. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
    parent_summary_variants: {
      high: "Çocuğunuz bu kitaptaki kararların çoğunda bölümün değerini yakalamış olabilir. Özellikle acele etmek yerine sonucu düşünmeyi ve az ilerlediği günlerde sürdürmeyi seçtiği görülüyor. Bu seçimler, kitabın anlattığı sabır ve emek fikrine yakın duruyor.",
      mixed: "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu, kitabın soruları için beklenen bir dağılımdır; sorular tek doğru cevabı bulmaktan çok düşünmeyi amaçlar. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
      low: "Çocuğunuz kararların çoğunda daha hızlı ya da daha kolay görünen seçeneklere yönelmiş olabilir. Bu, kitabın anlaşılmadığı anlamına gelmez; bu yaşta hız ve sabır arasındaki tercih zaten zorlayıcıdır. Hikâyedeki sonuçları birlikte hatırlamak, seçimlerin nereye vardığını görmesine yardımcı olabilir.",
    },
    chat_questions: [
      "Sen bir şey öğrendiğinde hemen herkese anlatmak ister misin, yoksa önce kendin denemeyi mi seversin?",
      "Uzun uğraştığın ama çok az ilerlediğin bir iş oldu mu? O gün ne hissettin?",
      "Sözüne en çok güvendiğin kişi kim? Ona güvenmeni sağlayan şey ne?",
    ],
    parent_faq: [
      {
        question: "Mişke'ye ne oldu?",
        approach: "Kitapta Mişke'nin bir yolculuk molasında vefat ettiği kısaca geçer; ayrıntı verilmez. Çocuğunuz sorarsa dürüst olun: yolculukta hastalanıp vefat etti diyebilirsiniz. Kaynakta sebep olarak bir yılan sokması anlatılır, ancak bu ayrıntı korkutucu olabileceği için çocuk metnine alınmadı. Çocuğunuzun asıl merak ettiği çoğu zaman “arkadaşını kaybetmek nasıl bir şey” olur; oraya odaklanmak daha çok işe yarar. İdrîs'in dua ederek arkadaşını uğurlaması, bu duyguyu konuşmak için iyi bir kapıdır.",
      },
      {
        question: "Hz. İdrîs öldü mü? Nereye gitti?",
        approach: "Kur'an'da Hz. İdrîs için “pek yüce bir mertebeye yükseltildi” buyrulur. Bunun tam olarak nasıl gerçekleştiğini kesin biçimde bilmiyoruz ve bilmediğimizi söylemek doğru olandır. Çocuğunuza şunu söyleyebilirsiniz: kaybolmadı, unutulmadı; Allah onu yüceltti. Bu bölüm bir ayrılık anlatır ama sonu korkutucu değil, müjdelidir.",
      },
      {
        question: "Bütün bunları gerçekten Hz. İdrîs mi buldu?",
        approach: "Bu güzel bir soru ve dürüst cevabı şudur: yazı, hesap, dokuma gibi buluşların ona ait olduğu İslam inancında ve tarihî rivayetlerde anlatılır; ama bunların hepsi Kur'an'da tek tek bildirilmiş değildir. Kitap bu yüzden “rivayetlere göre” diyerek anlatır. Çocuğunuza, bir şeyin kesin bilindiği ile anlatıldığı arasındaki farkı öğretmek için iyi bir fırsattır.",
      },
      {
        question: "Hz. İdrîs mucize gösterdi mi?",
        approach: "Kitapta İdrîs'in kendisi bunu açıkça reddeder: “Bende mucize aramayın.” Mucize, Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır ve bunu veren Allah'tır. İdrîs'in yaptıkları ise akıl, sabır ve emekle elde edilmiştir. Bu ayrım, çocuğun çalışmayı küçümsememesi açısından değerlidir.",
      },
      {
        question: "Ben de bir şey icat edebilir miyim?",
        approach: "Elbette, ama kitabın gösterdiği yol biraz farklıdır: önce dikkatle bakmak, sonra denemek, sonra da bulduğunun kime ne yapacağını düşünmek. İdrîs altı ayda yalnızca bir karış bez dokuyabildi. Çocuğunuz bir işte yavaş ilerlediğinde bu örneği hatırlatabilirsiniz; başarısızlık değil, yolun başı olabilir.",
      },
    ],
  },
];

export const books: BookDefinition[] = [
  {
    id: "hz-adem",
    routePrefix: "adem",
    title: "Hz. Âdem",
    eyebrow: "Hz. Âdem — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Beklenen   Misafir",
        ozet: "Yeryüzü, Allah'ın kendisine sorumluluk vereceği ilk insanla tanışmaya hazırlanır.",
        audioUrl: "/sesli-anlatim/hz-adem/hz-adem-sesli-anlatim.mp3",
        badgeName: "İlk Adım Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-1/kapak.jpg",
          alt: "Dağlar, nehir ve yıldızlı gökyüzüyle insanı bekleyen yeryüzü",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Çok eski zamanlarda yeryüzünde henüz hiçbir insan yaşamıyordu. Dağlar göğe uzanıyor, nehirler vadilerden geçiyor, rüzgâr toprağın üzerinde dolaşıyordu. Geceleri yıldızlar parlıyor, sabahları ışık yeniden yayılıyordu. Yeryüzü, sanki önemli bir misafiri bekliyordu.", emphasis: ["önemli bir misafiri bekliyordu"], dropCap: true },
          { type: "text", text: "Henüz bir çocuğun neşeli sesi vadilerde yankılanmamıştı. Hiçbir el toprağa bir tohum bırakmamış, hiçbir göz gökyüzüne merakla bakmamıştı. Yağmur yine yağıyor, bulutların gölgeleri ovalarda ilerliyordu. Fakat bütün bu güzellikleri görüp anlamlandıracak insan henüz yaratılmamıştı.", emphasis: ["görüp anlamlandıracak insan"] },
          { type: "text", text: "Bir kayanın yanında duran su damlası ile uzaktaki bir yıldız birbirinden çok farklıydı. İnsan, ikisini de fark edebilecek ve onlar hakkında düşünebilecekti. Gördüklerine isim verecek, öğrendiklerini hatırlayacak ve yeni bilgiler arayacaktı. Yeryüzü böyle bir misafiri ilk kez ağırlayacaktı.", emphasis: ["isim verecek", "yeni bilgiler arayacaktı"] },
          { type: "text", text: "Bir gün Yüce Allah, meleklere yeryüzünde sorumluluk taşıyacak bir insan yaratacağını bildirdi. Bu insan, kendisine verilen aklı ve imkânları güzel işler için kullanacaktı. Yeryüzünü koruyacak, doğruyla yanlışı seçebilecek ve yaptığı seçimlerden sorumlu olacaktı.", emphasis: ["sorumluluk taşıyacak", "seçimlerinden sorumlu"] },
          { type: "text", text: "Melekler, insanın kötülük yapabilen ve kan dökebilen bir varlık olacağını anladılar. Bunun hikmetini öğrenmek istediler:" },
          { type: "text", text: "— Yeryüzünde bozgunculuk çıkarabilecek birini mi yaratacaksın?" },
          { type: "text", text: "Yüce Allah onlara şöyle karşılık verdi:" },
          { type: "text", text: "— Ben sizin bilmediklerinizi bilirim." },
          { type: "text", text: "Bu cevap, insanın yalnızca yapabileceği kötülüklerle değerlendirilemeyeceğini gösteriyordu. İnsan öğrenebilecek, iyilik yapabilecek, hatasını anlayabilecek ve yeniden doğruya yönelebilecekti.", emphasis: ["öğrenebilecek", "yeniden doğruya yönelebilecekti"] },
          { type: "text", text: "İnsan güçlü olabilirdi; fakat gücünü korumak için kullanması gerekecekti. Konuşabilirdi; fakat sözlerini doğru ve güzel seçmeliydi. Toprağın ürünlerinden yararlanabilir, suyla hayatını sürdürebilirdi. Fakat bunları yalnız kendisinin malı sanmamalıydı." },
          { type: "text", text: "Sorumluluk işte bu seçimlerin içinde saklıydı. Aynı el bir fidan dikebilir veya bir dalı gereksiz yere kırabilirdi. Aynı dil bir kalbi sevindirebilir veya incitebilirdi. İnsana yalnızca imkân değil, doğru olanı seçme görevi de verilecekti.", emphasis: ["doğru olanı seçme görevi"] },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-1/secim-sorumluluk.jpg",
            alt: "İki doğal yola ayrılan vadide, su ve taşların arasında büyüyen genç bir fidan",
          },
          {
            type: "interactive_word",
            before: "Yeryüzü insana verilmiş büyük bir ",
            word: "emanet",
            meaning: "Korumamız ve özen göstermemiz için bize güvenilerek verilen şeydir.",
            after: "ti; insan onu dilediği gibi değil, sorumlulukla kullanacaktı.",
          },
          { type: "text", text: "Toprak sıradan görünebilirdi. Üzerine basılır, avuçta dağılır, yağmurla çamura dönüşürdü. Fakat Allah, ilk insan Hz. Âdem'i (a.s.) topraktan yarattı. Toprağa şekil verdi ve ona ruh verdi. Böylece yeryüzünün beklediği ilk insan yaratılmış oldu.", emphasis: ["topraktan yarattı"] },
          { type: "text", text: "Kur'an, Hz. Âdem'in yaratılışını anlatırken toprağın farklı hâllerinden söz eder. Toprak suyla birleşir, çamura dönüşür ve Allah'ın dilemesiyle yepyeni bir yaratılışa hazırlanır. Bu aşamaların ne kadar sürdüğünü bilmiyoruz. Bildiğimiz, insanın Allah'ın kudretiyle ve özel bir yaratılışla var olduğudur." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-1/toprak-isik.jpg",
            alt: "Yağmurla ıslanmış toprak, doğal çamur katmanları, küçük bir filiz ve sabah ışığı",
          },
          { type: "text", text: "Hz. Âdem'e hayat verildiğinde önünde öğrenilecek büyük bir âlem vardı. Toprak ayaklarının altında, gökyüzü üzerinde uzanıyordu. İnsan artık görecek, işitecek, düşünecek ve seçim yapacaktı. Bu yeteneklerin her biri aynı zamanda bir sorumluluk taşıyordu.", emphasis: ["görecek, işitecek, düşünecek ve seçim yapacaktı"] },
          { type: "text", text: "Hz. Âdem'in yaratılması, toprağın değersiz olmadığını da hatırlatıyordu. Bir tohum toprağa düşünce nasıl filizlenirse, insan da kendisine verilen yetenekleri kullanınca güzellikler ortaya çıkarabilirdi.", keySentence: true },
          { type: "text", text: "Fakat önemli bir görev verilmek, her şeyi önceden bilmek demek değildi. Hz. Âdem'in öğreneceği çok şey vardı. Melekler de Allah'ın insan için hazırladığı armağanın ne olduğunu henüz bilmiyordu.", emphasis: ["öğreneceği çok şey vardı"] },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-1/ogrenme-alemi.jpg",
            alt: "Yıldızların yansıdığı sığ suyun yanında farklı taşlar, yaprak, tohum ve küçük bir filiz",
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "Yüce Allah, Hz. Âdem'i bilgisiz ve yardımsız bırakmadı. Ona öğrenme yeteneği verdi. İnsanın yolculuğu, her şeyi bildiğini düşünerek değil, kendisine öğretilenleri dikkatle öğrenerek başlayacaktı.", emphasis: ["öğrenme yeteneği verdi"] },
          { type: "text", text: "Bu nedenle ilk insanın en büyük armağanlarından biri güç değil, bilgiydi. Hz. Âdem çevresindeki varlıkları tanıyacak, onların isimlerini öğrenecek ve öğrendiklerini kullanabilecekti.", keySentence: true },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-1/isimlerin-izi.jpg",
            alt: "Sığ suyun kenarına dizilmiş farklı taşlar, yapraklar ve tohumlar; her birinin yanında ince bir ışık izi",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-2/kapak.jpg",
          alt: "Şafak ışığında farklı bitki, taş ve su damlalarının bir arada göründüğü geniş vadi",
        },
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) gözlerini yepyeni bir dünyaya açmıştı. Çevresinde farklı şekiller, renkler ve varlıklar bulunuyordu. Allah ona bütün bunları tanıyabilme, aralarındaki farkları anlayabilme ve isimlerini öğrenebilme yeteneği verdi." },
          { type: "text", text: "Bir şeyi tanımak, yalnızca ona bakmak değildi. Su ile taşı, aydınlık ile gölgeyi, yakın ile uzağı ayırmak gerekiyordu. Bir varlığın adını bilmek ise onu düşünmeyi ve başkasına anlatmayı kolaylaştırıyordu." },
          { type: "text", text: "İsimler sayesinde bilgi tek bir anda kaybolup gitmeyecekti. İnsan gördüğünü hatırlayacak, anlatacak ve sonraki öğrendikleriyle birleştirecekti. Bir çocuk “su” dediğinde başkası neyi kastettiğini anlayacaktı. Böylece ortak bilgi ve iletişim başlayacaktı." },
          { type: "text", text: "Yüce Allah, Hz. Âdem'e isimleri öğretti. Bu öğretme yalnızca birkaç kelimeyi ezberlemek değildi. İnsan, öğrendiği isimler sayesinde düşünecek, anlatacak, soru soracak ve bilgisini başkalarıyla paylaşacaktı." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-2/isimlerin-ogretilmesi.jpg",
            alt: "Yan yana dizilmiş yaprak, tüy, kabuk ve taşların üzerine düşen sabah ışığı",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-2/egilen-dallar.jpg",
            alt: "Rüzgârda aynı yöne eğilmiş uzun otlar ve dalların oluşturduğu sakin sahne",
          },
          { type: "text", text: "Fakat orada bulunan İblis aynı yolu seçmedi. Kendini Hz. Âdem'den üstün gördü. Ateşten yaratılmış olmasını övünme sebebi yaptı, toprağı ise küçümsedi." },
          { type: "text", text: "İblis yalnızca iki yaratılış maddesini karşılaştırıyordu. Ateşin topraktan üstün olduğuna kendi başına karar vermişti. Oysa değeri belirleyen, bir maddenin parlak veya güçlü görünmesi değildi. Asıl değer, Allah'ın emrine uymakta ve verilen görevi doğru taşımaktaydı." },
          { type: "text", text: "Kibir, insanın gözünün önündeki gerçeği saklayan koyu bir perdeye benzer. Kişi yalnızca kendi özelliğine bakar ve başkasındaki güzelliği göremez. İblis'in başına gelen de buydu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Melekler, Hz. Âdem'e verilen bilgi karşısında kıskançlık göstermedi. Bilmediklerini kabul ettiler ve Allah'ın emrine uydular. İblis ise kendi özelliğini üstünlük sebebi saydı. Başkasına verilen değeri kabul etmek istemedi." },
          { type: "text", text: "Yüce Allah ona neden secde etmediğini sorduğunda İblis, kendisinin ateşten, Hz. Âdem'in topraktan yaratıldığını söyledi. Böylece asıl problemi ortaya çıktı: İblis'in yanlışı yalnızca secde etmemek değildi. Kendi düşüncesini Allah'ın emrinden üstün tutmuştu." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-2/atesin-golgesi.jpg",
            alt: "Sönmeye yüz tutmuş bir ateşin közleri ve hemen yanındaki nemli koyu toprak",
          },
          { type: "text", text: "Kibir, onun gerçeği görmesini engelledi. Özür dilemek yerine yanlışında ısrar etti. Allah'ın rahmetinden uzaklaştırıldı. Ardından insanları doğru yoldan ayırmaya çalışacağını söyledi." },
          { type: "text", text: "Hz. Âdem'in yolculuğunda iki ayrı davranış yan yana görünmüştü. Melekler bilmediklerini kabul etmiş, öğrenmeye ve emre açık durmuştu. İblis ise kendini büyük görmüş, hatasında direnmişti." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-2/iki-yol.jpg",
            alt: "Bir tepenin üzerinde ikiye ayrılan; biri aydınlığa, diğeri gölgeye giden patika",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-3/kapak.jpg",
          alt: "Gölgeli ağaçlar, berrak dereler ve olgun meyvelerle dolu geniş bir bahçe",
        },
        paragraphs: [
          { type: "text", text: "Yüce Allah, Hz. Âdem'i (a.s.) cennete yerleştirdi ve ona bir eş yarattı. Kur'an, eşinin adını söylemez. İslâm geleneğinde ona Hz. Havva denir. İkisi aynı insanlık ailesinin ilk anne ve babasıydı." },
          { type: "text", text: "İnsan yalnızca öğrenen değil, sevgi ve yakınlık kuran bir varlıktı. Bir sevinci paylaşmak onu çoğaltır, bir güçlüğü paylaşmak yükü hafifletirdi. Hz. Âdem ile eşi, cennet nimetlerini birlikte tanıyacak ve kendilerine verilen uyarıyı birlikte taşıyacaktı." },
          { type: "text", text: "Bu birliktelik üstünlük yarışı değildi. İkisi de Allah'ın kuluydu ve ikisi de kendi seçiminden sorumluydu. Sonraki olayları anlatırken birini yalnızca güçlü, diğerini yalnızca zayıf göstermek doğru olmazdı." },
          { type: "text", text: "Cennet huzur ve nimetlerle doluydu. Orada açlık, susuzluk, çıplaklık ve yakıcı sıcaklık yoktu. Bahçeler, gölgeler ve türlü güzellikler Allah'ın ikramını hatırlatıyordu." },
          { type: "text", text: "Sular berrakça akıyor, yeşillikler gözün uzanabildiği yere kadar yayılıyordu. Her köşe insana Allah'ın cömertliğini hatırlatan başka bir güzellik taşıyordu. Korkuyla saklanmaları veya bir nimete yetişmek için yarışmaları gerekmiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-3/cennet-bahcesi.jpg",
            alt: "Berrak suyun aktığı, yeşilliklerin gözün alabildiğine uzandığı bahçe",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-3/sinir-cizgisi.jpg",
            alt: "Geniş bir bahçenin içinde tek bir ağaca uzanan, taşlarla belirginleşmiş ince patika",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-3/sayisiz-nimet.jpg",
            alt: "Dalları meyveyle dolu ağaçların arasından süzülen ışık",
          },
          { type: "text", text: "Güven bazen tam da böyle zamanlarda sınanır. İnsan her sebebi bilmeyebilir. Fakat kendisine iyilik eden ve doğru yolu gösteren Allah'ın uyarısına güvenebilir." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-3/guvenin-sinavi.jpg",
            alt: "Akşam alacasında tek bir ağacın gölgesinin uzadığı sessiz bahçe köşesi",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-4/kapak.jpg",
          alt: "Alacakaranlıkta yaprakların arasından süzülen ince bir sis",
        },
        paragraphs: [
          { type: "text", text: "İblis, Hz. Âdem (a.s.) ile eşinin açık düşmanıydı. Fakat yanlarına bir düşman gibi yaklaşmadı. Onlara iyilik isteyen bir öğütçü gibi görünmeye çalıştı." },
          { type: "text", text: "Kötü bir teklif her zaman sert ve ürkütücü görünmeyebilir. Bazen çok yumuşak sözlerle gelir. İnsanın sevdiği bir şeyi vaat eder ve taşıdığı tehlikeyi saklar. Bu nedenle yalnızca sözün güzel olmasına değil, doğru olup olmadığına bakmak gerekir." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-4/tatli-fisilti.jpg",
            alt: "Rüzgârla kıpırdayan yaprakların arasında dağılan ince bir sis",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-4/tekrarin-izi.jpg",
            alt: "Durgun suya düşen tek bir damlanın giderek genişleyen halkaları",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-4/yapraklarin-golgesi.jpg",
            alt: "Üst üste savrulmuş geniş bahçe yaprakları ve aralarından sızan solgun ışık",
          },
          { type: "text", text: "Yanlışlarını fark etmeleri kalplerinin bütünüyle kararmadığını gösteriyordu. Rahatsızlık duymaları, doğruyla yanlış arasındaki farkı hâlâ bildiklerinin işaretiydi. Şimdi bu farkındalığı dürüst bir davranışa dönüştürmeleri gerekiyordu." },
          { type: "text", text: "Hata iki türlü büyüyebilirdi: Önce yanlış seçimle, sonra onu saklamak için söylenen bahanelerle. Hz. Âdem ile eşinin önündeki yeni sınav, bu ikinci kapıyı açıp açmayacaklarıydı." },
          { type: "text", text: "İblis onlara sonsuzluk sözü vermişti. Fakat geriye güveni zedeleyen bir seçim kalmıştı. Yanlışın güzel görünmesi, sonucunu güzel yapmamıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-4/solan-vaat.jpg",
            alt: "Bir dalın ucunda kurumaya başlamış tek bir yaprak",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-5/kapak.jpg",
          alt: "Şafak sökerken bulutların aralanmasıyla yeryüzüne inen ışık huzmesi",
        },
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) ile Hz. Havva yaptıklarının yanlış olduğunu anlamıştı. İblis onları kandırmıştı; fakat bu durum kendi seçimlerini yok etmiyordu. Şimdi verecekleri cevap, hatalarının kendisinden daha önemli olacaktı." },
          { type: "text", text: "Cennetin güzellikleri hâlâ çevrelerindeydi; fakat onların dikkati artık kendi davranışlarındaydı. Uyarıyı hatırlıyor ve neden daha dikkatli olmadıklarını anlıyorlardı. Pişmanlık, geçmişteki anı tekrar tekrar düşündüren ağır bir yük gibi hissedilebilirdi." },
          { type: "text", text: "Bu yükten kurtulmanın yolu hatayı yok saymak değildi. Gerçeğe dönüp bakmak, sorumluluğu kabul etmek ve bağışlanma istemek gerekiyordu. İşte tövbenin kapısı böyle açılırdı." },
          { type: "text", text: "İblis de bir yanlış yapmıştı. O, kibrine sarılmış ve kendisini haklı göstermeye çalışmıştı. Hz. Âdem ile eşinin önünde ise başka bir yol vardı: Gerçeği kabul etmek ve Allah'tan bağışlanma istemek." },
          { type: "text", text: "İki yol arasındaki fark çok büyüktü. İblis “Ben üstünüm,” diyerek yanlışında direnmişti. Hz. Âdem ile eşi ise kendilerini kusursuz göstermeye çalışmadı. Hatalarını görmek değerlerini yok etmiyordu; aksine doğruya dönmelerini mümkün kılıyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-5/iki-yol-ayrimi.jpg",
            alt: "Biri sarp kayalığa, diğeri yumuşak toprağa uzanan iki ayrı patika",
          },
          { type: "text", text: "İnsan bazen özür dilerse küçüleceğini sanabilir. Oysa içten bir özür, kibrin duvarını yıkar. Kişi gerçeği kabul edince hem başkasının hakkını görebilir hem de düzeltmek için harekete geçebilir." },
          { type: "text", text: "İnsan hata yaptığında çoğu zaman kendini korumak ister. Bir bahane bulmak kolay görünebilir. “Benim yüzümden olmadı,” demek insanı kısa süre rahatlatabilir. Fakat hata yerinde durmaya devam eder." },
          { type: "text", text: "Hz. Âdem ile Hz. Havva birbirlerini suçlamadı. “Bizi İblis kandırdı, bizim hiçbir sorumluluğumuz yok,” da demediler. Önce kendi yaptıklarına baktılar." },
          { type: "text", text: "Yüce Allah, Hz. Âdem'e bağışlanma dileyeceği sözleri öğretti. Bu da Allah'ın onları yalnız bırakmadığını gösteriyordu. Hata yapmışlardı; fakat dönüş yolu kapanmamıştı." },
          { type: "text", text: "Allah'ın sözleri onlara yalnızca ne söyleyeceklerini öğretmiyordu. Nasıl bir kalple dönmeleri gerektiğini de gösteriyordu. Dua, hatayı küçültmüyor; insanın acizliğini ve Allah'ın merhametine olan ihtiyacını kabul ediyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-5/donus-sozleri.jpg",
            alt: "Sabah çiyiyle ıslanmış toprakta yeni açılmış küçük bir su yolu",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-5/acilan-kapi.jpg",
            alt: "Kayaların arasından aydınlığa açılan geniş bir geçit",
          },
          { type: "text", text: "Bağışlanmak, yaşanan olaydan hiçbir ders çıkarmamak demek değildi. Hz. Âdem ile Hz. Havva artık İblis'in güzel sözler ardına sakladığı tehlikeyi tanıyordu. Aynı tuzağın nasıl kurulduğunu öğrenmişlerdi." },
          { type: "text", text: "Allah'ın merhameti, umutsuzluğun önündeki kapıyı kapatıyordu. Hatasını anlayan insan “Artık benim için iyilik kalmadı,” demez. Yanlışını bırakır, Allah'a yönelir ve yeniden güzel işler yapmaya başlar." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-5/umudun-isigi.jpg",
            alt: "Yağmur sonrası bulutların aralanmasıyla ıslak toprağa vuran ilk ışık",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-6/kapak.jpg",
          alt: "Uçsuz bucaksız bir ova; uzakta dağ sırası, önde yeni sürülmüş toprak",
        },
        paragraphs: [
          { type: "text", text: "Hz. Âdem (a.s.) ile Hz. Havva için yeryüzünde yeni bir dönem başladı. Kur'an onların yeryüzünün hangi bölgesine indirildiğini açıklamaz. Bu yüzden Serendib, Cidde veya başka bir yeri kesin olarak söyleyemeyiz." },
          { type: "text", text: "Yeryüzü cennetten farklıydı. Gün ışığı çekilince gece geliyor, hava bazen ısınıyor, bazen serinliyordu. İnsan yoruluyor, acıkıyor ve dinlenmeye ihtiyaç duyuyordu. Bu değişikliklerin her biri yeni hayatın bir parçasıydı." },
          { type: "text", text: "Fakat yeryüzü yalnızca güçlüklerden oluşmuyordu. Yağmur kuru toprağı canlandırıyor, tohumlar yeşeriyor ve su canlılara hayat veriyordu. İnsan çalışacak, sonuç için sabredecek ve elde ettiği nimetlere şükredecekti." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-6/yagmurdan-sonra.jpg",
            alt: "Yağmurdan sonra canlanan toprakta filizlenen taze tohumlar",
          },
          { type: "text", text: "Bildiklerimiz bundan daha anlamlıydı: İnsan yeryüzünde yaşayacak, orada sorumluluk taşıyacak ve Allah'ın rehberliğiyle yolunu bulacaktı." },
          { type: "text", text: "Hz. Âdem'in yaratılışından önce verilen haber şimdi daha iyi anlaşılıyordu. İnsan yeryüzünde sorumluluk taşıyacaktı. Cennette yaşanan hata bu görevi ortadan kaldırmamıştı. Tövbe, yolculuğun yeniden doğrulmasına yardım etmişti." },
          { type: "text", text: "Önlerinde hazır bir şehir veya kurulmuş bir düzen yoktu. Fakat insan öğrenme armağanına sahipti. Gördüklerini anlayabilir, tecrübelerinden yararlanabilir ve bildiklerini ailesiyle paylaşabilirdi." },
          { type: "text", text: "Cennette açlık, susuzluk ve yakıcı sıcaklık yoktu. Yeryüzündeki hayat ise emek istiyordu. İnsan yiyeceğini hazırlayacak, suyu bulacak, sıcaktan ve soğuktan korunacaktı. Her yeni gün, öğrenilecek başka bir şey getirecekti." },
          { type: "text", text: "Sabah ışığı yeryüzünü aydınlatırken aynı toprak artık farklı görünüyordu. Hz. Âdem o topraktan yaratılmıştı. Şimdi insanlık bu toprağın üzerinde yaşayacak ve onu bir emanet olarak koruyacaktı." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-6/ilk-sabah.jpg",
            alt: "Gün doğarken sisin çekildiği geniş ova ve ufuktaki dağ sırası",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-6/mevsimlerin-donusu.jpg",
            alt: "Aynı ağacın farklı mevsimlerdeki hâllerini andıran, ayrı renklerde dalların bir arada göründüğü sahne",
          },
          { type: "text", text: "Sabır, hiçbir şey yapmadan beklemek değildi. Doğru olanı yapmaya devam etmek ve sonucu Allah'a bırakmaktı. Yeryüzündeki yeni başlangıcın içinde bu sabra sık sık ihtiyaç duyulacaktı." },
          { type: "text", text: "Yeryüzü artık yalnız ve sessiz değildi. İlk aileyle birlikte sevgi, paylaşma ve öğretme de başlamıştı. Küçük bir filiz gibi başlayan insanlık ailesi zamanla büyüyecekti." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-6/ilk-ocak.jpg",
            alt: "Taşlarla çevrilmiş küçük bir ocak, yanında toprak kaplar ve kurumuş otlar",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-7/kapak.jpg",
          alt: "Bir tepede ikiye ayrılan patika; biri ekili tarlaya, diğeri taşlık yamaca gider",
        },
        paragraphs: [
          { type: "text", text: "Bir insanı asıl tanıtan şey, her şey istediği gibi giderken yaptıkları mıdır? Yoksa istediği sonuçla karşılaşamadığında seçtiği yol mu?" },
          { type: "text", text: "İblîs, yaptığı yanlış kendisine gösterildiğinde kibirlenmiş ve suçunu kabul etmemişti. Hz. Âdem (a.s.) ise yanıldığında hatasını kabul etmiş, Rabbine yönelerek tövbe etmişti." },
          { type: "text", text: "Şimdi Hz. Âdem'in ailesinde yaşanan başka bir olay, zor bir sonuç karşısında verilen kararların ne kadar önemli olduğunu gösterecekti." },
          { type: "text", text: "Yıllar geçmiş, Hz. Âdem ile Hz. Havva'nın ailesi büyümüştü. Hz. Âdem, Allah'tan öğrendiklerini ailesine öğretiyordu. Fakat doğru yolu bilmekle o yolu seçmek aynı şey değildi. Her insan kendi davranışından sorumluydu." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-7/buyuyen-yurt.jpg",
            alt: "Ekili tarlalar, otlaklar ve bir akarsuyla çevrili geniş yerleşim vadisi",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-7/duran-yol.jpg",
            alt: "Bir kavşakta duran patika; bir kolu aydınlık ovaya, diğeri gölgeli kayalığa uzanır",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-7/karganin-ogrettigi.jpg",
            alt: "Toprağı eşeleyen bir karga ve yanında yeni açılmış küçük bir çukur",
          },
          { type: "text", text: "Hz. Âdem topraktan yaratılmıştı. Şimdi toprağı eşeleyen küçücük bir karga, onun oğluna ne yapması gerektiğini gösteriyordu. Fakat asıl önemli ders, bundan önce verilmişti: İnsan, öfkesi büyümeden durmalıydı." },
          { type: "text", text: "Kur'an, Hz. Âdem ile Hz. Havva'nın bu olay karşısında neler söylediğini anlatmaz. Bu yüzden onlara ait konuşmalar uyduramayız. Fakat bir evlatlarını kaybetmenin, diğer evlatlarının da böyle büyük bir yanlış yapmasının onlar için çok ağır bir üzüntü olduğunu düşünebiliriz." },
          { type: "text", text: "Hz. Âdem ailesine doğru yolu öğretmişti. Fakat bir peygamberin evladı olmak, insanı kendi seçimlerinin sorumluluğundan kurtarmıyordu. Her insan doğru ile yanlış arasında kendi kararını vermeliydi." },
          { type: "text", text: "İblîs yanlış yaptığında kibirlenmişti. Hz. Âdem yanıldığında tövbe etmişti. Kābil ise karşılaştığı sonucu kabullenmeyerek öfkesini kardeşine yöneltmişti." },
          { type: "text", text: "Üçü de bir seçim yapmıştı. Hz. Âdem hatasını kabul edip Allah'a yönelerek doğruya dönmeyi seçmişti. Kābil ise pişmanlık duysa da yaptığı büyük yanlışın sonucunu geri alamadı." },
          { type: "text", text: "Kıskançlık ve öfke kalbimize gelebilir. Bu duyguları hissetmemiz bizi kötü bir insan yapmaz. Ancak hiçbir duygu bize başkasına zarar verme hakkı vermez." },
          { type: "text", text: "Öfke yükseldiğinde yapılabilecek en doğru şey durmak, oradan uzaklaşmak ve güvendiğimiz bir yetişkinden yardım istemektir." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-7/ofkenin-dindigi-yer.jpg",
            alt: "Fırtınadan sonra durulmuş bir gölün yüzeyi ve kıyıdaki sakin otlar",
          },
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
        coverIllustration: {
          src: "/kitaplar/hz-adem/bolum-8/kapak.jpg",
          alt: "Ufka doğru uzanan uzun bir yol ve iki yanında olgunlaşmış başaklar",
        },
        paragraphs: [
          { type: "text", text: "Hz. Âdem'in (a.s.) yeryüzündeki hayatı uzun bir yolculuktu. Topraktan yaratılmış, bilgiyle değer kazanmış, cennette yaşamış, aldanmış, tövbe etmiş ve Allah'ın rehberliğiyle yeni bir başlangıç yapmıştı." },
          { type: "text", text: "Yolculuğun her durağında başka bir değer öne çıkmıştı. Yaratılış sorumluluğu, isimler bilgiyi, secde alçak gönüllülüğü hatırlatmıştı. Yasak ağaç güveni, tövbe ise umudu öğretmişti." },
          { type: "text", text: "Başlangıçta yeryüzü bir misafiri bekliyordu. Şimdi o misafirin ailesi büyümüş ve dünya insan sesleriyle tanışmıştı. Fakat ilk görev değişmemişti: Emaneti korumak ve Allah'ın rehberliğine uymak." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-8/uzun-yol.jpg",
            alt: "Tepelerin arasından kıvrılarak ufka uzanan uzun bir patika",
          },
          { type: "text", text: "Bu yolculuğun kaç yıl sürdüğünü kesin olarak bilmiyoruz. Kaynaklarda farklı sayılar anlatılır. Kur'an ise Hz. Âdem'in yaşından veya kabrinin yerinden söz etmez. Bu nedenle bilmediğimiz ayrıntıları gerçekmiş gibi anlatmayız." },
          { type: "text", text: "Bildiklerimiz, bir ömrü anlamak için yeterliydi. Hz. Âdem insanlara Allah'ı tanıttı. Öğrenmenin, sorumluluğun ve hatadan dönüşün değerini kendi hayatıyla gösterdi." },
          { type: "text", text: "Bazı insanlar geride çok eşya bırakabilir. Fakat eşyalar zamanla kaybolur veya başkasının olur. Doğru bilgi ve güzel davranış ise öğrenen insanların hayatında yeniden görünür." },
          { type: "text", text: "Hz. Âdem'in tövbesi de böyle bir mirastı. Onun kıssasını duyan biri, hatasının ardından umutsuzluğa kapılmaması gerektiğini öğrenebilirdi. Yanlışta ısrar etmek yerine dönüş yolunu arayabilirdi." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-8/birakilan-miras.jpg",
            alt: "Toprağa bırakılmış bir avuç tohum ve yanında filizlenmeye başlamış olanlar",
          },
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
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-8/emanetin-aktarimi.jpg",
            alt: "Birbirine bağlanarak uzayan ince su yollarının oluşturduğu ağ",
          },
          { type: "text", text: "Hz. Âdem'in hayatını anlatırken de aynı emaneti taşıyoruz. Kur'an'ın bildirdiğini güvenle anlatıyor, kesin olmayan rivayetleri gerçek gibi sunmuyoruz. Çünkü peygamberleri sevmek, onlar hakkında doğru bilgiye özen göstermeyi de gerektirir." },
          { type: "text", text: "İslâmî kaynaklarda Hz. Âdem'in ardından oğlu Hz. Şît'in insanlara rehberlik ettiği anlatılır. Hz. Şît'in adı Kur'an'da geçmez; onunla ilgili bilgiler İslâm tarih ve kıssa kaynaklarında yer alır. Bu nedenle onun yolculuğu, kendi kitabında kaynak dereceleri belirtilerek anlatılacaktır." },
          { type: "text", text: "Hz. Âdem'in hikâyesi insanın yalnızca nasıl yaratıldığını anlatmaz. Nasıl öğrenmesi, nasıl seçim yapması ve yanıldığında nasıl dönmesi gerektiğini de gösterir." },
          { type: "text", text: "Toprakta başlayan yolculuk yeniden toprağa ulaştı. Fakat ekilen değerler sessizce filizlenmeye devam etti: Bilgi, alçak gönüllülük, tövbe, umut ve sorumluluk." },
          {
            type: "image",
            src: "/kitaplar/hz-adem/bolum-8/filizlenen-emanet.jpg",
            alt: "Karanlık toprağın içinden yükselen tek bir taze filiz ve üzerine düşen ışık",
          },
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
  // Hz. Şît — kaynaklı içerik (KITAP-HZ-SIT-FINAL.md, 2. aşama teslimi).
  // Kaynak: Ahmet Cemil Akıncı, Hz. Âdem – Hz. Şit, Bahar Yayınları (s. 187–303).
  // Kaynak sınıfı K3: adı Kur'an'da geçmez, rivayetler "anlatılanlara göre"
  // çerçevesiyle verilir. Ömür/sahife rakamı ve defin yeri metne GİRMEZ.
  {
    id: "hz-sit",
    routePrefix: "sit",
    title: "Hz. Şît",
    eyebrow: "Hz. Şît — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Beklenen Armağan",
        ozet: "Bir kaybın acısını taşıyan ailenin gönlü, bahar sabahında doğan bir çocukla ısınır.",
        audioUrl: "",
        badgeName: "Gelen Umut Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-sit/bolum-1/kapak.jpg",
          alt: "Şafak vaktinde, uzak dağlara bakan geniş bir yamaç ve otların üstündeki çiy taneleri",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hicaz topraklarına ilkbahar inmiş, sabah ışığı dağların ardından usulca yükselmişti. Otların üstündeki çiy taneleri, güneş dokundukça tek tek eriyip toprağa süzülüyordu. Bir tepenin yamacında, uzun boylu bir adam sessizce ayakta duruyordu. Asasını ve dağarcık sopasını biraz ilerideki taşın dibine bırakmıştı.", dropCap: true },
          { type: "text", text: "Bu adam Hz. Âdem (a.s.) idi; yeryüzünün ilk insanı ve ilk peygamberiydi. Yıllardır eline fırsat geçtikçe aynı yamaca çıkıyor, aynı yerde uzun uzun duruyordu. Toprakta ince bir kabartı vardı ve orada, uzun zaman önce kaybettiği oğlu Hâbil yatıyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-1/bekleyen-yamac.jpg",
            alt: "Sabah ışığında, otların arasında yükselen ince bir toprak kabartısı ve yanında sarı kanatlı bir kuş",
          },
          { type: "text", text: "Gözyaşları ardı ardına düşüyor, ayaklarının dibindeki toprağı yavaş yavaş ıslatıyordu. Kuşlar fidandan fidana uçuyor, ılık bir esinti otları aynı yöne doğru eğiyordu. Ama Hz. Âdem o sabah bunların hiçbirini görmüyordu; içindeki acı, ele batan bir dikenin acısına hiç benzemiyordu." },
          { type: "text", text: "Diken batar ve bir süre sonra geçerdi; bu acı ise yıllardır hiç geçmemişti. Ne zaman derdini açsa kendisine hep aynı şey söylenmişti: sabret. O da elinden geldiğince sabrediyor, sabah olunca sürüsünü önüne katıp ovaya iniyordu." },
          { type: "text", text: "O gün bir tarla sınırında oğlu Eşüt'e rastladı; Eşüt hem tarlasına bakıyor, hem sürüsünü otlatıyordu. Babasını uzaktan görünce işini bırakıp koşarak karşıladı." },
          { type: "text", text: "— Sabahın hayırlı olsun ey peygamber babam, dedi." },
          { type: "text", text: "— Senin de hayırlı olsun ey Eşüt." },
          { type: "text", text: "— Yine o yamaçtan mı geliyorsun?" },
          { type: "text", text: "— Öyle yaptım." },
          { type: "text", text: "— Yetmez mi artık babacığım? Bunca oğlun, kızın ve torunun var." },
          { type: "text", text: "Hz. Âdem cevap vermek için ağzını açtı, sonra vazgeçip sustu. Oğlunun omzuna dokundu, ona hayır duası etti ve yoluna devam etti; Eşüt uzaklaşan babasının ardından uzun uzun baktı." },
          { type: "text", text: "O sabah çadırların önünde toplananlar da onu uzaktan izliyor, aralarında fısıldaşıyorlardı. Hepsinin aklında aynı soru vardı: bu üzüntü nasıl dinerdi? Kimi susmayı doğru buluyor, kimi yanına gidip konuşmak istiyordu. Kimi de onu güldürmeyi denemişti, ama şimdiye kadar hiçbiri işe yaramamıştı." },
        ],
        continuationParagraphs: [
          {
            type: "interactive_word",
            before: "Hz. Âdem o gün çadırlara doğru yürürken yolunu birden değiştirdi. Mekke'nin ortasında, taşlardan yapılmış bir yapı vardı; onun adı ",
            word: "Kâbe",
            meaning: "Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır.",
            after: "'ydi. Anlatılanlara göre bu yapıyı yıllar önce kendi elleriyle o kurmuştu. Yaklaştığında, yine duvarın dibine birkaç taşın düştüğünü gördü.",
          },
          { type: "text", text: "Düşen taşları tek tek yerine koydu, ama içi bir türlü rahat etmedi. Çünkü taşlar yalnızca üst üste diziliydi ve aralarında onları tutan hiçbir şey yoktu. Rüzgâr sertleştiğinde ya da yer hafifçe sarsıldığında duvar yeniden dağılıyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-1/dagilan-duvar.jpg",
            alt: "Harçsız dizildiği için dibine birkaç taş düşmüş, üst üste konmuş taşlardan bir duvar parçası",
          },
          { type: "text", text: "Bunun mutlaka bir çaresi olmalıydı, fakat Hz. Âdem o çareyi bir türlü bulamıyordu. Akşama kadar orada kaldı; yapının çevresinde dolaştı, taşları elledi ve uzun uzun dua etti. Ayrılırken içi, uzun zamandır ilk defa hafiflemişti." },
          { type: "text", text: "Çadırlara yaklaşırken oğullarından İyad ona doğru koşarak geldi ve müjdeyi verdi." },
          { type: "text", text: "— Ey babam, annem bir oğul doğurdu, dedi." },
          { type: "text", text: "— Peki sağlığı nasıl?" },
          { type: "text", text: "— Çok iyi, hem de öyle güzel ki." },
          { type: "text", text: "Hz. Âdem bu haberi duyunca adımlarını iyice hızlandırdı." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-1/aksam-mujdesi.jpg",
            alt: "Akşam kızıllığında, aralarından ışık sızan deri çadırlar ve önlerinde yanan küçük bir ateş",
          },
          { type: "text", text: "Çadırın içi kalabalıktı; kızlarından üçü annelerinin başında bekliyordu. Hz. Âdem önce Hz. Havva'nın hatırını sordu ve aldığı cevap onu şaşırttı. Havva, yeryüzüne indiklerinden beri ilk defa acısız bir doğum yapmıştı." },
          { type: "text", text: "Hz. Âdem eğilip oğlunu kucağına aldı ve daha iyi görebilmek için dışarı çıkardı. Çocuk sakindi; yüzünde, bakanı yatıştıran ince bir aydınlık vardı. Yıllardır sızlayan yer, o an bir anda susuverdi." },
          { type: "text", text: "Adını hemen buldu ve eğilip kulağına fısıldadı: Şît. Bu ad armağan demekti; kaybettiği evladının yerine gelen bir armağan. O bahar sabahı Hz. Âdem'i ağlatmış, aynı günün akşamı ise ona bir teselli getirmişti.", keySentence: true },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-1/gelen-armagan.jpg",
            alt: "Gece açan bir dalın ucundaki tek tomurcuk ve üzerine düşen ilk yıldız ışığı",
          },
        ],
        has_question: true,
        question: {
          title: "Beklenen Armağan",
          prompt: "Evinde birinin uzun zamandır üzgün olduğunu görüyorsun ve kimse onu neşelendiremiyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Rahatsız etmemek için uzaktan bakar, hiçbir şey söylemezdim.",
              comparison: "Sessiz kalmak bazen saygıdır. Yine de hikâyede babasının yanına giden Eşüt, onu yalnız bırakmamış oldu.",
            },
            {
              id: "b",
              text: "Yanına oturur, bir şey anlatmak isterse sabırla dinlerdim.",
              comparison: "Hikâyede Hz. Âdem'e iyi gelen şey, yanında duran ve acele etmeyen ailesi oldu. Sen de yanında durmayı seçtin.",
            },
            {
              id: "c",
              text: "Onu güldürmek için hemen şaka yapar, konuyu değiştirirdim.",
              comparison: "Güldürmek iyi niyetlidir. Ama hikâyede bunu deneyenler sonuç alamadı; bazı üzüntüler önce sadece duyulmak ister.",
            },
          ],
        },
        learned: [
          "Bir ailenin en zor günlerinde bile yan yana durması, acıyı hafifleten en güçlü şeydir.",
          "Hz. Âdem'in kurduğu duvar, taşları birbirine tutturan bir şey olmadığı için dağılıyordu.",
          "Doğan çocuğa verilen ad armağan demekti ve bu ad, kaybın ardından gelen bir teselli oldu.",
        ],
      },
      {
        id: "2",
        title: "Duyulmayan Uyarı",
        ozet: "Ufuktaki fırtınayı ilk fark eden Şît uyarır; kimse dinlemez, sonra hakkında konuşulur.",
        audioUrl: "",
        badgeName: "Doğruyu Arama Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-sit/bolum-2/kapak.jpg",
          alt: "Sonbahar ikindisinde, gökyüzüyle toprağın birleştiği yerin toz bulutuyla bulanıklaştığı geniş ova",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Aradan uzun yıllar geçti ve Hz. Şît (a.s.) büyüyüp delikanlı oldu; yanında hemen her zaman birlikte büyüdüğü Hazura vardı. Hz. Havva onlara bir şeyi sık sık hatırlatırdı: bir haberi araştırmak ve doğrulamak güzel bir huydu.", dropCap: true },
          { type: "text", text: "Bir sonbahar ikindisinde yine çadırlarının önünde oturuyor, ertesi günün işlerini konuşuyorlardı; Hazura birden elini kaldırıp ufku gösterdi." },
          { type: "text", text: "— Ey Şît, şuraya bir bak, dedi. Gökyüzünün toprakla birleştiği yer karıştı." },
          { type: "text", text: "Şît dönüp baktı ve hiç beklemeden ayağa kalktı." },
          { type: "text", text: "Çok küçükken benzerini bir kez görmüştü ve o günü hiç unutmamıştı; bu, uzaklardan yaklaşan büyük bir fırtınaydı." },
          { type: "text", text: "— Çadırları hemen toplayalım, dedi. Arkası kapalı olan şu vadiye sığınmalıyız." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-2/ufuktaki-isaret.jpg",
            alt: "Ufuk çizgisinde yükselen ince toz perdesi ve önündeki tek bir hurma ağacının eğilmiş dalları",
          },
          { type: "text", text: "Hazura sürüyü önüne katıp vadiye doğru yola çıktı. Şît bir yandan çadırların kazıklarını söküyor, bir yandan çevreye sesleniyordu. Komşularının kapılarına kadar gidip haber verdi ve onları tek tek uyardı." },
          { type: "text", text: "Fakat kimse onu ciddiye almadı; kimi omuz silkip yürüdü, kimi işinin başına döndü. İçlerinden biri ise dönüp onu tersledi ve umursamaz bir sesle konuştu." },
          { type: "text", text: "— Olacaksa nasılsa olur, dedi. Boşuna niçin telaşlanalım ki?" },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-2/duyulmayan-ses.jpg",
            alt: "Sökülmüş tek bir çadırın yanında hâlâ olduğu gibi duran diğer çadırlar ve dağınık günlük eşyalar",
          },
          { type: "text", text: "Şît'in yüzü düştü ve başını önüne indirdi; Hazura sürüyü bırakıp geri döndü ve yanına geldi." },
          { type: "text", text: "— Sen üzerine düşeni yaptın, dedi. Bu kadarı artık yeter." },
          { type: "text", text: "— Yetmez ey Hazura. Bir uyarı, duyulmazsa hiç yapılmamış gibidir." },
          { type: "text", text: "Şît buna hemen cevap veremedi, çünkü rüzgâr çoktan ıslık çalmaya başlamıştı. Kumlar ürpermiş gibi çıtırdıyordu ve elinde yalnızca birkaç dakika kalmıştı. Bir kez daha durup anlatmayı mı denemeliydi, yoksa kendi hazırlığını mı tamamlamalıydı?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Şît son bir kez yüksek sesle seslendi; bu sefer duyup ardından gelen birkaç kişi oldu. Sonra koşarak vadiye indi ve orada Hazura'yı buldu. Vadinin arkası, fırtınanın geleceği yöne tamamen kapalıydı." },
          { type: "text", text: "Çok geçmeden gökyüzü karardı ve elli adım ötesi bile görünmez oldu; Hazura büyük bir kayanın dibine uzandı." },
          { type: "text", text: "— Korkuyorum ey Şît, dedi." },
          { type: "text", text: "— Bu fırtına kolay kolay geri dönmez. Önce hızını alır, sonra yavaş yavaş diner." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-2/vadideki-siginak.jpg",
            alt: "Arkası kapalı bir vadi yatağı, iri kayaların altına sıkıştırılmış çadır bezleri ve dışarıda uçuşan kum",
          },
          { type: "text", text: "— Peki sen bunu nereden biliyorsun?" },
          {
            type: "interactive_word",
            before: "— Ben olup bitenlere hep dikkat ederim. Aynı işaretler göründüğünde aynı şeyin olduğunu fark ettim. Böyle bir şeyi önceden görüp hazırlanmaya ",
            word: "tedbir",
            meaning: "Bir tehlike gelmeden önce alınan önlem ve yapılan hazırlıktır.",
            after: " denir. Bu sabah tedbir aldığımız için şimdi güvendeyiz.",
          },
          { type: "text", text: "Saatler birbirini kovaladı; fırtına önce azaldı, sonra tamamen durdu ve gökyüzü açıldı. Dışarı çıktıklarında çevrenin değiştiğini gördüler: kum tepeleri yer değiştirmiş, kuyuların ağzı dolmuştu." },
          { type: "text", text: "Şît o günden sonra bir türlü rahat edemedi. Deriden yapılan çadırlar insanı böyle bir günde koruyamıyordu ve kalıcı bir çözüm gerekiyordu. Artık sabah erkenden çıkıyor, ancak karanlık bastırınca dönüyordu; bazen elinde küçük taş parçalarıyla geliyordu." },
          { type: "text", text: "Aylar geçince çevrede onun hakkında konuşmalar başladı. Kimileri onun işi tembelliğe vurduğunu sanıyordu. Sonunda birkaç kişi dayanamayıp doğruca Hazura'ya gitti ve ona haber verdi." },
          { type: "text", text: "— Nişanlın artık hiç çalışmıyor, dediler." },
          { type: "text", text: "Hazura duyduklarına inanmadı, ama içi de rahat etmedi ve doğrusunu kendi gözüyle görmek istedi. Ertesi sabah, Şît'in her gün gittiğini söylediği taşlı dereye çıktı. Bir kayanın arkasına sığınıp aşağı baktı." },
          { type: "text", text: "Aşağıda Şît, iri bir taşın önünde çalışıyor, ona vura vura üzerinden parçalar düşürüyordu. Az ötede kimsenin uğramadığı bir komşuları vardı; herkes ondan uzak durur, arkasından konuşurdu. Şît işini bıraktığı aralarda gidip ona da yardım ediyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-2/kendi-gozuyle.jpg",
            alt: "Taşlı dere yatağında yontulmaya başlanmış iri bir taş, yanında taş yongaları ve basit aletler",
          },
          { type: "text", text: "Hazura o gün önemli bir şey öğrendi: insanlar hakkında anlatılanlar çoğu zaman eksik, bazen de yanlış oluyordu. Doğruyu öğrenmenin en sağlam yolu, gidip kendi gözüyle bakmaktı.", keySentence: true },
        ],
        has_question: true,
        question: {
          title: "Duyulmayan Uyarı",
          prompt: "Bir şeyin tehlikeli olduğunu fark ettin, ama kimse seni dinlemiyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Kimse dinlemiyorsa ben de vazgeçerdim.",
              comparison: "Vazgeçmek kolaydır. Hikâyede Şît son bir kez daha seslendi ve o sesi duyup peşinden gelen birkaç kişi oldu.",
            },
            {
              id: "b",
              text: "Kızar, onlara darılır ve bir daha hiçbir şey söylemezdim.",
              comparison: "Darılmak insanı yalnızlaştırır. Şît dinlenmediği hâlde kimseye kırılmadı ve hazırlığını tamamladı.",
            },
            {
              id: "c",
              text: "Bir kez daha sakince anlatır, sonra kendi hazırlığımı yapardım.",
              comparison: "Hikâyede Şît tam olarak bunu yaptı: bir kez daha seslendi, sonra vadiye sığındı. Hem sesini duyurdu, hem güvende kaldı.",
            },
          ],
        },
        learned: [
          "Doğru bir söz, kimse dinlemediğinde bile söylenmeye ve tekrarlanmaya değerdir.",
          "Şît aynı işaretleri daha önce gördüğü için fırtınayı tanıdı ve önceden tedbir aldı.",
          "Hazura, duyduğu dedikoduya değil, gidip kendi gözüyle gördüğüne inanmayı seçti.",
        ],
        gorev: {
          id: "sit-2-yarina-hazirlik",
          ad: "Yarına Hazırlık",
          kategori: "sorumluluk",
          aciklama: "Yarın gerekecek şeyleri bu akşamdan hazırla. Çantanı topla, giyeceğini ayır, su şişeni doldur ve kapının yanına koy.",
          sure: "10 dakika",
          olcut: "Sabah evden çıkarken hiçbir şeyi aramak zorunda kalmadıysan görevi tamamladın.",
        },
      },
      {
        id: "3",
        title: "Taşları Birleştiren Sır",
        ozet: "Yıllarca deneyip yıkılan Şît, sonunda taşları tutan harcı bulur ve köy birlikte kurulur.",
        audioUrl: "",
        badgeName: "Yılmayan Emek Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-sit/bolum-3/kapak.jpg",
          alt: "Sabah ışığında, taşlı derenin yamacında düzgün sıralar hâlinde dizilmiş yontulmuş taşlar",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar akıp gitti; Hz. Şît (a.s.) ile Hazura evlendiler ve çocukları oldu. Şît aklına koyduğu işten, bunca zaman geçmesine rağmen hiç vazgeçmemişti. Taşlı derenin yamacında, kimseye yük olmadan, sabırla çalışmayı sürdürüyordu.", dropCap: true },
          { type: "text", text: "Sonunda düzlükte taştan küçük bir oda yükseldi. Ancak birkaç kişinin sığabileceği kadar küçüktü ve üzeri henüz örtülmemişti. Yine de bu, yıllar süren emeğin ortaya çıkardığı ilk sonuçtu." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-3/ilk-tas-oda.jpg",
            alt: "Üzeri henüz örtülmemiş, dört duvarı yeni yükselmiş küçük bir taş oda",
          },
          { type: "text", text: "Tam o sırada babası Hz. Âdem (a.s.) çıkageldi ve odayı uzun uzun inceledi." },
          { type: "text", text: "— İşin en zor kısmını aşmışsın, dedi. Bundan sonrası daha hızlı ilerler." },
          { type: "text", text: "Şît bu sözleri duyunca rahatladı ve yıllar sonra ilk defa içi ısındı." },
          { type: "text", text: "Uzaktan bakıp bekleşenler de vardı ve bazıları bu işi baştan beri gereksiz buluyordu." },
          { type: "text", text: "— Çadır bize yetmiyor mu, diye sordular. Bunca yılı dört duvar için harcamak doğru mudur?" },
          { type: "text", text: "Şît onlara hiç kızmadı; bunu nasıl öğrendiğini tek tek anlattı. Kuşların dallara astığı yuvaları, arıların düzgün peteklerini ve karıncaların toprak altındaki yollarını hatırlattı. Her canlı kendine göre bir sığınak yapıyor, kendini ve yavrusunu böylece koruyordu." },
          { type: "text", text: "Bir süre sonra küçük bir sarsıntı oldu ve yer birkaç saniye titredi. Şît elindekini bırakıp koşarak yamaca çıktığında odanın duvarları yere serilmişti. Yıllarca yontup dizdiği taşlar dağılmış, toprağa saçılmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-3/dagilan-tas-yigini.jpg",
            alt: "Yere serilmiş duvar taşları, toprakta kalan duvar izi ve havada asılı ince toz",
          },
          { type: "text", text: "Arkasından gelenler sustu ve kimse ne diyeceğini bilemedi. Şît dağılan taşların yanına çöküp uzun süre onlara baktı; bunca yılın emeği bir anda dağılmıştı. Şimdi ne yapacaktı?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Şît o gün yılmadı, ağlamadı ve kimseyi suçlamadı. Taşları tek tek eline alıp inceledi; hepsi düzgündü ve hepsi üst üste rahatça oturuyordu. Demek ki eksik olan taşlar değil, tamamen başka bir şeydi." },
          { type: "text", text: "Bu eksiği bulmak için uzun bir inceleme yolculuğuna çıktı. Kayalara baktı ve bazılarının kuruyan toprakla birbirine kaynadığını fark etti. Kırlangıçların yuvalarına baktı; onların da yuvalarını çamurla sıvayıp pekiştirdiğini gördü." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-3/kirlangic-yuvasi.jpg",
            alt: "Kaya çıkıntısının altına çamurla sıvanmış bir kırlangıç yuvası ve yanında kuruyan toprakla kaynamış iki çakıl",
          },
          {
            type: "interactive_word",
            before: "Şît döndüğünde çeşit çeşit çamur karıştırdı ve iki taşın arasına sürüp kurumasını bekledi. İlk denemeleri kuruyunca döküldü, ama o denemekten hiç vazgeçmedi. Sonunda kuruduğunda taş gibi sertleşen karışımı buldu. Taşları birbirine tutturan bu karışıma ",
            word: "harç",
            meaning: "Yapı taşlarını birbirine tutturmak için hazırlanan, kuruyunca sertleşen karışımdır.",
            after: " denir. Hazura birleşen iki taşı yere çaldı; taşlar yine de ayrılmadı.",
          },
          { type: "text", text: "Bir eksik daha vardı: duvar yalnız kendi kendine değil, toprağa da tutunmalıydı. Şît derin bir hendek kazdı, içine iri taşlar oturttu ve onları harçla bağladı. Toprağın altında kalan bu sağlam yatağa temel adını verdi." },
          { type: "text", text: "Bulduğunu kendine saklamadı ve aynı akşam bütün soyunu bir araya topladı." },
          { type: "text", text: "— Yarın gün ağarırken düzlükte olun, dedi. Hep birlikte hayırlı bir işe girişeceğiz." },
          { type: "text", text: "Dinleyenler sevindi, el çırptılar ve o geceyi merakla geçirdiler." },
          { type: "text", text: "Ertesi sabah herkes oradaydı ve Şît işi bölüştürdü. Kimi taş taşıdı, kimi harç kardı, kimi hendek kazdı, kimi su getirdi. Yollar çizildi, bahçeler ayrıldı ve iki kuyu açıldı. Kimse yalnız kendi evi için çalışmadı, herkes bütün evler için ter döktü.", keySentence: true },
          { type: "text", text: "Evler yan yana yükseldi ve bu kez üzerleri de örtüldü. Kurulan yere hep beraber güzel bir ad verdiler. Önce bir mahalle, sonra da anlatılanlara göre yeryüzünün bilinen ilk köyü olmuşlardı." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-3/birlikte-kurulan-koy.jpg",
            alt: "Yan yana dizilmiş üzeri örtülü taş evler, aralarındaki taş döşeli yollar, bahçeler ve iki kuyu",
          },
          { type: "text", text: "Sonraki yıllarda kasırgalar geldi, seller aktı ve yer birkaç kez sarsıldı; evlere hiçbir şey olmadı. Şît bu bilgiyi de kendine saklamadı; başka topluluklara ev yapmayı öğretmeleri için adamlar gönderdi." },
        ],
        has_question: true,
        question: {
          title: "Taşları Birleştiren Sır",
          prompt: "Uzun süredir uğraştığın bir şey son anda bozuldu. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Nerede yanlış yaptığımı bulur, baştan denerdim.",
              comparison: "Şît de tam bunu yaptı. Dağılan taşlara tek tek bakıp eksiğin ne olduğunu aradı ve harcı böyle buldu.",
            },
            {
              id: "b",
              text: "Artık uğraşmaz, başka bir işe geçerdim.",
              comparison: "Başka bir işe geçmek bazen doğrudur. Ama hikâyedeki çözüm, tam da vazgeçilmediği için ortaya çıktı.",
            },
            {
              id: "c",
              text: "Kimse görmesin diye bozulduğunu saklardım.",
              comparison: "Saklamak kimseye yardımcı olmaz. Şît yıkılan duvarı herkesin gözü önünde inceledi ve çaresini sonra buldu.",
            },
          ],
        },
        learned: [
          "Vazgeçmeden yeniden denemek, uzun süren işleri bitiren en sade ve en güçlü yoldur.",
          "Şît çözümü kitaptan değil, kuş yuvalarına ve kuruyan toprağa dikkatle bakarak buldu.",
          "Köy tek kişinin değil, iş bölümü yapan bütün bir topluluğun eliyle kuruldu.",
        ],
        gorev: {
          id: "sit-3-birlikte-bir-is",
          ad: "Birlikte Bir İş",
          kategori: "paylaşma",
          aciklama: "Evdeki bir işi tek başına değil, ailenden biriyle yap. Başlamadan önce kimin neyi üstleneceğini birlikte konuşun.",
          sure: "20 dakika",
          olcut: "İş bittiğinde ikinizin de kendi payına düşen bir görevi olduysa görevi tamamladın.",
          guvenlikNotu: "Ateş, sıcak su ve kesici alet gerektiren işleri seçme; yanınızda bir yetişkin olsun.",
        },
      },
      {
        id: "4",
        title: "Devralınan Emanet",
        ozet: "Babasından devraldığı sorumluluğu taşıyan Şît, öğrendiklerini emanete ve oğluna bırakır.",
        audioUrl: "",
        badgeName: "Devralınan Emanet Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-sit/bolum-4/kapak.jpg",
          alt: "Alacakaranlıkta, toprağın altına inen temel hattı ve üzerine oturmuş ilk taş sırası",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Aradan yine uzun yıllar geçti ve Hz. Âdem (a.s.) iyice yaşlandı; artık eskisi gibi uzak yerlere gidip gelemiyordu. Topluluğun günlük işlerini bu yüzden oğlu Hz. Şît (a.s.) üstlendi.", dropCap: true },
          { type: "text", text: "Baba oğul o son yıllarda çok konuştular; Hz. Âdem ona en çok bilgiden ve tedbirden söz etti." },
          { type: "text", text: "— Bilginin peşinde koşan kişi kolay kolay yıkılmaz, dedi. Şunu da unutma ki herkes kendi yaptığından sorumludur." },
          { type: "text", text: "Sonra bir gün Hz. Âdem hastalandı; birkaç gün yattı ve vefat etti. Bir yıl kadar sonra Hz. Havva da onun yanına gitti. Şît çok üzüldü, ama omzuna bırakılan işi bir gün bile aksatmadı." },
          { type: "text", text: "Yaşı hayli ilerlemişti; yine de her sabah avadanlığını sırtlanıp duvar örmeye gidiyordu. Oğlu Enuş bir gün buna dayanamadı ve babasına içini döktü." },
          { type: "text", text: "— Artık biraz dinlensen ey babam, dedi." },
          { type: "text", text: "— Son nefese kadar çalışacağım, diye cevap verdi Şît." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-4/birakilan-avadanlik.jpg",
            alt: "Bir taşın üstüne bırakılmış eski deri avadanlık, içinden görünen taş aletler ve yanında harç teknesi",
          },
          {
            type: "interactive_word",
            before: "Bir öğleden sonra Şît elindeki taşı birden yere düşürdü ve gözleri gökyüzüne çevrildi. Dudakları hafifçe titriyordu ve o gün kendisine büyük bir görev verildiğini öğrendi. Ona ulaşan mesajın adı ",
            word: "vahiy",
            meaning: "Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır.",
            after: "di. Şît artık babası gibi bir peygamberdi ve bu görevi son gününe kadar taşıyacaktı.",
          },
          { type: "text", text: "Bir cuma günü topluluğunu Kâbe'nin yanında topladı ve görevini onlara anlattı. Kimse ondan elle tutulur bir delil istemedi; hepsi ona baştan beri güvendiklerini söylediler." },
          { type: "text", text: "Şît o gün yıllardır içinde taşıdığı isteği de dile getirdi. Kâbe'nin duvarları hâlâ harçsızdı ve her sarsıntıda dağılıyordu; onu sağlam bir temele oturtmak ve üzerini örtmek istiyordu." },
          { type: "text", text: "— Ölçüsü hiç değişmeyecek, dedi. Taşları da yine aynı taşlar olacak." },
          { type: "text", text: "Kısa bir sessizlik oldu, sonra kalabalıktan itiraz sesleri yükseldi." },
          { type: "text", text: "— Taşlarını yerinden indirmeye gönlümüz razı olmuyor, dediler." },
          { type: "text", text: "Şît yardım edecek birkaç kişi istedi, ama tek bir kişi bile öne çıkmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-4/dokunulmayan-tas.jpg",
            alt: "Harçsız dizili taş duvarın önünde, yere bırakılmış aletler ve kimsenin bulunmadığı boş bir alan",
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "Şît kimseyi zorlamadı, kimseye kırılmadı ve ellerini açıp uzun uzun dua etti. O gece ufuklar karıştı; önce çölden kasırga geldi, sonra sabaha kadar yağmur yağdı." },
          { type: "text", text: "Gün ışırken herkes dışarı koştu ve doğruca Kâbe'ye gitti. Duvarlar yıkılmış, taşlarını seller alıp sürüklemişti; sular taşları öylesine yıkamıştı ki hepsi pırıl pırıl duruyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-4/yikanmis-taslar.jpg",
            alt: "Yağmurdan sonra ıslak zeminde dağınık duran, yıkanıp parlamış iri taşlar ve aralarında biriken sular",
          },
          { type: "text", text: "Halk hemen Şît'in etrafını sardı ve hep bir ağızdan konuşmaya başladı." },
          { type: "text", text: "— Bize rehber ol, dediler. Onu bildiğin gibi, dilediğin gibi yeniden yap." },
          { type: "text", text: "Şît esasen çoktan hazırlıklıydı; iş bölümünü hemen orada yaptı." },
          { type: "text", text: "Gece gündüz nöbetleşe çalıştılar ve bir hafta dolmadan iş bitti. Kâbe eski ölçüsüyle sağlam bir temele oturmuştu. Taşlar harçla birbirine kenetlenmiş, üzeri de örtülmüştü." },
          { type: "text", text: "Şît'in kalan ömrü yollarda geçti; köy köy dolaştı, anlattı ve insanlara öğretti. Söyledikleri her yerde sadeydi ve soranlara hep aynı birkaç cümleyi tekrarlardı." },
          { type: "text", text: "Çalışın, yalan söylemeyin, birbirinizi aldatmayın ve kimsenin malına göz dikmeyin. Bunlar görünmez elbiselerdir, ama en sert rüzgârda bile sizi ayakta tutarlar.", keySentence: true },
          {
            type: "interactive_word",
            before: "Uzak yerlerden üzücü haberler de geliyor, Şît bunları dinlerken iç geçiriyordu. Bazı topluluklar doğru yoldan ayrılmış, kendi elleriyle yaptıkları şeylerin önünde eğilmeye başlamışlardı. Böyle heykellere ",
            word: "put",
            meaning: "İnsanların kendi elleriyle yapıp taptıkları heykellerdir.",
            after: " denir. Şît bunları duydukça insanları uyarmayı hiç bırakmadı.",
          },
          { type: "text", text: "Yıllar sonra Şît iyice yoruldu ve artık evinden dışarı çıkamaz oldu. Yatağını pencerenin önüne koydurdu; oradan bakınca Kâbe'yi görebiliyordu. Gelenlerle yine oradan konuşuyordu." },
          { type: "text", text: "Son sabahında oğlu Enuş yanına geldi, elini öptü ve babasının son sözlerini dinledi." },
          { type: "text", text: "— Ben gideceğim, dedi. Ama insanlar yalnız kalmayacak; yeni bir yol gösterici mutlaka gelecek." },
          { type: "text", text: "Enuş başını eğdi ve için için dua etti." },
          {
            type: "image",
            src: "/kitaplar/hz-sit/bolum-4/pencereden-gorunen.jpg",
            alt: "Taş bir evin penceresinden görünen sabah manzarası, pencere kenarında bir su tası ve dışarıda uzanan yol",
          },
          { type: "text", text: "Hz. Şît o gün sessizce vefat etti. Geriye taştan evler, sağlam bir temel ve taşınacak bir emanet bıraktı. Enuş bu emaneti aldı ve babasının işini sürdürdü. Yeryüzü, yeni bir yol göstericiyi umutla beklemeye başladı." },
        ],
        has_question: true,
        question: {
          title: "Devralınan Emanet",
          prompt: "Sana emanet edilen bir şeyi daha sağlam yapmak istiyorsun, ama başkaları dokunmana karşı çıkıyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Onlar yokken kendi bildiğim gibi yapardım.",
              comparison: "Habersiz yapmak güveni zedeler. Şît, kimse yardıma gelmediğinde bile gizlice işe girişmedi.",
            },
            {
              id: "b",
              text: "Niçin yapmak istediğimi anlatır, onların da razı olmasını beklerdim.",
              comparison: "Hikâyede Şît tam olarak bunu yaptı. Ölçünün değişmeyeceğini anlattı, zorlamadan bekledi ve insanlar sonunda kendileri istedi.",
            },
            {
              id: "c",
              text: "Hemen vazgeçer, bir daha hiç konuşmazdım.",
              comparison: "Vazgeçmek kolaydı. Ama Şît isteğini kalbinde tuttu ve sırası gelince yaptı.",
            },
          ],
        },
        learned: [
          "Emanet yalnızca korunan değil, öğrenilenle birlikte sağlamlaştırılıp aktarılan şeydir.",
          "Şît yaşı ilerlemesine rağmen çalışmayı bırakmadı ve bildiği her şeyi başkalarına öğretti.",
          "Kimseyi zorlamadan beklemek, insanların sonunda kendi istekleriyle yardıma gelmesini sağladı.",
        ],
      },
    ],
  },
  {
    id: "hz-idris",
    routePrefix: "idris",
    title: "Hz. İdrîs",
    eyebrow: "Hz. İdrîs — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Bir Yaprak Gölgesi",
        ozet: "İdrîs güneşten korunmanın yolunu bulur; ama buluşunu yaymadan önce onun ne sonuç doğuracağını düşünür.",
        audioUrl: "",
        badgeName: "Ölçülü Buluş Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-idris/bolum-1/kapak.jpg",
          alt: "Sabah ışığında geniş bir otlak, uzakta tepeler ve yamaçta tek bir zeytin ağacı.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yerd, o sabah tepedeki zeytin ağacının altına oturdu ve yüzünü uzaklara çevirdi. O yıllarda babaların içinde büyük bir korku vardı, çünkü çocukları büyüyünce doğru yoldan ayrılıyordu. Gidenlerin çoğu bir daha geri dönmüyordu ve Yerd de aynı korkuyu taşıyordu.", dropCap: true },
          { type: "text", text: "Öğleye doğru kız kardeşi koşarak geldi ve sesindeki sevinç uzaktan bile belliydi." },
          { type: "text", text: "— Ey ağam, müjdemi isterim, senin bir oğlun oldu, dedi." },
          { type: "text", text: "Yerd hemen sevinemedi ve yol boyunca hiç konuşmadı; ama odaya girip bebeğe baktığında içindeki ağırlık yavaşça dağıldı." },
          { type: "text", text: "Eşi Berekna yorgun gözlerle onu izliyordu ama yüzünde hafif bir gülümseme vardı." },
          { type: "text", text: "— Sevineyim mi ey Yerd, yoksa yine mi üzüleceğiz? diye sordu." },
          { type: "text", text: "— Sevin ey Berekna, hem de çok sevin, dedi Yerd. Ona baktıkça bütün derdimi unutuyorum." },
          { type: "text", text: "Berekna bebeğin adını sordu ve Yerd bir an düşündükten sonra oğlunun adını koydu." },
          { type: "text", text: "— Ona İdrîs de, dedi." },
          { type: "text", text: "Bu ad, öğrenen ve öğreten demekti; ileriyi gören ve sabırlı insan demekti. Berekna adı çok sevdi ve o günden sonra oğluna hep böyle seslendi." },
          { type: "text", text: "Yıllar geçti ve İdrîs büyüyüp sürüsünü otlatan genç bir çoban oldu. Yanında iki köpeği, biraz ötesinde de yaşıtı ve akrabası Mişke yürüyordu; ikisi de her şeyi merak ederdi." },
          { type: "text", text: "O yaz sabahı güneş erken yükseldi ve başları kızgın bir taş gibi ısındı. Gölgeye girdiklerinde serinliyorlar, açıklığa çıktıklarında yeniden bunalıyorlardı. İdrîs bir süre durdu ve elindeki değneğe dayanıp uzun uzun düşündü." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-1/kizgin-oglen.jpg",
            alt: "Öğle güneşinin altında titreşen sıcak hava, kuru otlar ve kısa gölgeler.",
          },
          { type: "text", text: "Sonra yakındaki ağaca gitti ve en iri yaprakları tek tek kopardı. Onları birbirine geçirerek tas gibi ördü ve dönüp Mişke'nin başına geçirdi. Kendisi için de aynı biçimde bir tane hazırladı." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-1/yaprak-golgelik.jpg",
            alt: "Bir taşın üstüne bırakılmış, iri yapraklardan örülerek yapılmış iki gölgelik.",
          },
          { type: "text", text: "Düzlüğü geçene kadar ikisi de hiç konuşmadı; Mişke başındaki gölgeliğe eliyle dokundu." },
          { type: "text", text: "— Eskiden burada başımız kazan gibi kaynardı, şimdiyse rahatız, dedi." },
          { type: "text", text: "— Ben de öyle, dedi İdrîs. Güneş hâlâ tepemizde ama artık canımızı yakmıyor." },
          { type: "text", text: "Mişke birden heyecanlandı, ayağa kalktı ve köyün yönünü işaret etti." },
          { type: "text", text: "— Haydi koşalım ve bunu herkese anlatalım, dedi. Yarına kalmadan bütün köy serinler." },
          { type: "text", text: "İdrîs onunla birlikte kalkmadı; elindeki yaprağı çevirdi ve uzun uzun baktı." },
        ],
        continuationParagraphs: [
          { type: "text", text: "İdrîs elindeki yaprağa bir kez daha baktı ve kenarlarının kıvrılmaya başladığını gördü. Bu yaprak akşama kalmadan kuruyacak, sonra ufalanıp dökülecekti. Demek ki yarın sabah yeniden yaprak koparmak gerekecekti." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-1/kuruyan-yaprak.jpg",
            alt: "Kenarları kıvrılıp kurumaya başlamış tek bir yaprak ve yanında dökülmüş parçaları.",
          },
          { type: "text", text: "Sonra bütün köyü gözünün önüne getirdi ve herkesin her sabah ağaçlara koştuğunu düşündü. Yapraklar kısa sürede biter, ağaçlar çıplak kalır ve sonunda kururdu. Serinlemek isterken gölgenin kendisini yok etmiş olurlardı." },
          { type: "text", text: "— Bunu şimdilik anlatmayalım ey Mişke, dedi." },
          { type: "text", text: "Mişke şaşırdı ve sebebini sorunca, İdrîs elindeki yaprağı ona uzattı." },
          { type: "text", text: "— Bak, bu akşam kuruyacak ve yarın yenisini isteyeceğiz, dedi. Sonra bütün ağaçlar yolunur." },
          { type: "text", text: "Mişke yaprağa uzun uzun baktı, sonra anlamış gibi başını salladı." },
          {
            type: "interactive_word",
            before: "Bu, buluşundan vazgeçmek değildi; İdrîs yalnızca sonucu önceden görmüştü. Babası buna ",
            word: "basiret",
            meaning: "Bir işin sonunu önceden görebilmek ve ona göre davranmaktır.",
            after: " derdi, yani bir işin nereye varacağını düşünüp ileriyi görmekti.",
          },
          { type: "text", text: "O günden sonra soru aklından hiç çıkmadı ve yıllarca peşini bırakmadı. İnsanı sıcaktan ve soğuktan koruyacak örtü hafif olmalı, çalışmayı zorlaştırmamalıydı. Üstelik kurumamalı, her sabah yeniden aranmamalıydı." },
          { type: "text", text: "İdrîs aradı: yaprakları denedi ama olmadı, kalın derileri denedi ama ağır geldiler. Yıllarca aklının bir köşesinde hep aynı soru durdu, o ise aramaktan hiç vazgeçmedi." },
          { type: "text", text: "O yıllarda başka şeyler de buldu: bulanık suyu süzmeyi, tarlaya su geçirmeyi ve kayalara yol işaretleri koymayı. Ama bulduğunu yaymadan önce kendine hep aynı soruyu sordu: bu, kime ne yapar?" },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-1/yol-isaretleri.jpg",
            alt: "Patika kenarında üst üste dizilmiş işaret taşları ve toprakta açılmış ince bir su arkı.",
          },
        ],
        has_question: true,
        question: {
          title: "Bir Yaprak Gölgesi",
          prompt: "Diyelim ki bir işi kolaylaştıran yeni bir yol buldun. Hemen herkese anlatmak istiyorsun. Ama bu yol yayılırsa başka bir şeye zarar verebilir. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Hemen herkese anlatırdım, zararını sonra düşünürdüm.",
              comparison: "Hızlı davranmak çoğu zaman iyidir. Ama İdrîs bir gün beklediği için ağaçların tükenmesini önledi.",
            },
            {
              id: "b",
              text: "Önce kime ne zarar verir diye düşünür, sonra anlatırdım.",
              comparison: "Sen de İdrîs gibi davrandın. O da önce sonucu düşündü, sonra kararını verdi.",
            },
            {
              id: "c",
              text: "Kimseye söylemez, bulduğum yolu kendime saklardım.",
              comparison: "Bir bilgiyi saklamak da bir çözümdür. İdrîs ise saklamadı; daha iyisini bulana kadar aramayı sürdürdü.",
            },
          ],
        },
        learned: [
          "Bir bilgiyi kullanmadan önce kime ne yapacağını düşünmek de o bilginin bir parçasıdır.",
          "İdrîs yapraklardan gölgelik yaptı; ama yapraklar kuruyunca ağaçların tükeneceğini fark etti.",
          "Buluşunu saklamadı, sadece erteledi; daha kalıcı bir çare bulana kadar aramayı sürdürdü.",
        ],
      },
      {
        id: "2",
        title: "Öğretmeyi Öğrenmek",
        ozet: "Bildiklerini gençlere anlatmaya başlar; kimi çabuk kavrar, kimi gecikir, o ise tekrar tekrar anlatır.",
        audioUrl: "",
        badgeName: "Öğreten Sabır Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-idris/bolum-2/kapak.jpg",
          alt: "Sabah ışığında, kayaların arasına kurulmuş tenha bir düzlük ve yere serilmiş hasırlar.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Aradan yıllar geçti ve İdrîs artık pek çok şey biliyordu. Bir gün kendi kendine sordu: bütün bunlar benimle birlikte kaybolursa ne olacaktı? O gün aklına köyün gençleri geldi ve içinden bir karar verdi.", dropCap: true },
          { type: "text", text: "Gençleri birer ikişer çağırdı; kimi çoban, kimi avcı, kimi de çiftçiydi. Bir gün önceden sözleşiyor, ertesi sabah tenha bir yerde buluşuyorlardı. Dersler sessizce yapılıyordu, çünkü köyde bu işten hoşlanmayanlar vardı." },
          { type: "text", text: "İdrîs onlara suyu, taşları, mevsimleri ve gökyüzünü anlattı; sayı saymayı ve hesap tutmayı gösterdi. İslam inancına ve tarihî rivayetlere göre, kalemi ve ilk yazıyı bulan da odur." },
          { type: "text", text: "Öğrenciler önce azdı, sonra her ay yenileri katıldı. Öğrendiklerini eve götürüyor, kardeşlerine ve komşularına anlatıyorlardı. Yürüyüşleri değişmiş, başları dikleşmişti ve bunu köyde herkes fark etti." },
          { type: "text", text: "Bir sabah derse giderken babası Yerd yolunu kesti ve oğlunun yorgun yüzüne baktı." },
          { type: "text", text: "— Bu iş hiç kolay değil galiba, dedi." },
          { type: "text", text: "— Kolay değil ey babam, dedi İdrîs. Ama bir kişi bile anlarsa, o gün bize kazançtır." },
          { type: "text", text: "İdrîs derslerinde çok konuşmaz, daha çok sorar ve sonra dikkatle dinlerdi. Öğrencilerine kendi ağızlarından anlattırır, yanlışı birlikte düzeltirlerdi; böylece hiç kimse susmaya alışmazdı." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-2/topraktaki-ders.jpg",
            alt: "Düzeltilmiş toprak zemine çizilmiş sade şekiller, yanında bir çubuk ve dizilmiş çakıl taşları.",
          },
          { type: "text", text: "Fakat herkes aynı hızda ilerlemiyordu; kimi bir kere duyunca hemen kavrıyordu. Kimi ise üçüncü kez dinlediği hâlde başını kaldırıp öylece bakıyordu ve o sabah da böyle oldu." },
          { type: "text", text: "İdrîs o gün suyun yolunu değiştirmeyi anlatmıştı." },
          { type: "text", text: "— Anlamadım, baştan bir daha söyler misin? dedi öğrencilerinden biri." },
          { type: "text", text: "Öndekiler birbirine baktı ve içlerinden biri sabırsızlandı." },
          { type: "text", text: "— Biz anladık, onu bırak da yeni konuya geçelim, dedi." },
          { type: "text", text: "İdrîs elindeki çubuğu toprağa bıraktı ve bir an sustu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "İdrîs çubuğu yeniden eline aldı ama bu kez aynı sözleri kullanmadı. Toprağa küçük bir ark çizdi ve suyu gerçekten içinden akıttı. Anlamayan öğrenci suyun yolunu kendi parmağıyla değiştirdi ve yüzü birden aydınlandı." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-2/suyun-yolu.jpg",
            alt: "Toprakta açılmış küçük bir arkta akan berrak su ve yolu ikiye ayıran ince bir set.",
          },
          { type: "text", text: "— Şimdi anladım ey İdrîs, suyun yolunu ben de değiştirebilirim, dedi." },
          { type: "text", text: "İdrîs gülümsedi ve öndeki sabırsız öğrencilere döndü." },
          { type: "text", text: "— Bekleyen sizler de bugün bir şey öğrendiniz, dedi. Bilmek başkadır, anlatmak başkadır." },
          { type: "text", text: "O gün ders herkes için uzadı ama kimse buna sonradan üzülmedi." },
          { type: "text", text: "Akşam olunca babasına anlattı ve Yerd merak edip sordu:" },
          { type: "text", text: "— Her seferinde böyle mi yapıyorsun ey oğlum?" },
          { type: "text", text: "— Yapmak zorundayım ey babam, çünkü herkesin aklı aynı hızda çalışmaz, dedi İdrîs." },
          { type: "text", text: "— Biri çabuk kavrar, biri gecikir ve sabır tam bu açığı kapatır." },
          { type: "text", text: "Sonra bir cümle daha ekledi ve Yerd bu sözü yıllarca hatırlayıp başkalarına anlattı:" },
          { type: "text", text: "— Öğrenmede sabır gerekir ey babam, öğretmede ise ondan daha çoğu gerekir.", keySentence: true },
          { type: "text", text: "O yıllarda Mekke'den bir haber geldi: Hz. Şît (a.s.) orada ilk köyü kurmuştu. İdrîs bu köyü gidip görmek ve yapılışını öğrenmek istedi. Yola gece çıktı, çünkü gündüzün sıcağı yolcuya çok ağır geliyordu." },
          {
            type: "interactive_word",
            before: "Yol arkadaşı yine Mişke'ydi ve gündüz sıcağını beklemeden yola koyuldular. Karanlıkta yönlerini kuzeydeki parlak yıldızdan buldular; o gece gökyüzü onlara ",
            word: "kılavuz",
            meaning: "Yolu bilmeyenlere doğru yönü gösteren kişi ya da işarettir.",
            after: " oldu.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-2/kuzeydeki-yildiz.jpg",
            alt: "Gece gökyüzünde kuzeyde duran tek bir parlak yıldız ve altında uzanan boş çöl yolu.",
          },
          { type: "text", text: "Fakat İdrîs o yolculuktan yalnız döndü, çünkü Mişke bir mola yerinde vefat etmişti. İdrîs onu bir ağacın altına defnetti ve arkasından uzun uzun dua etti. Kaybının acısı yolun geri kalanında hep yanında oldu." },
          { type: "text", text: "Sonra yoluna devam etti ve Mekke'de gördüğü evler onu şaşırttı. Taşlar düzgün dizilmiş, aralarından tertemiz sokaklar açılmıştı. İdrîs orada bir süre kalıp gençlere de ders verdi." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-2/ilk-koy.jpg",
            alt: "Yan yana dizilmiş üzeri örtülü taş evler ve aralarından geçen taş döşeli sokak.",
          },
          { type: "text", text: "Bir gün yurdundan haber geldi: öğrencileri dağılmış, bazıları başka yerlere göçmüştü. İdrîs hiç beklemedi, yanına yirmi kadar öğrenci aldı ve hemen geri döndü." },
          { type: "text", text: "Döndüğünde kimseyi azarlamadı; dağılanları tek tek buldu ve yeniden derse çağırdı. Dersler kaldığı yerden başladı ve İdrîs o gün bir şey daha öğrenmiş oldu. Bir işi kurmak zordu ama onu sürdürmek çok daha zordu." },
        ],
        has_question: true,
        question: {
          title: "Öğretmeyi Öğrenmek",
          prompt: "Bir arkadaşın senin anlattığın şeyi anlamadı. Diğerleri sıkıldı ve “geç artık” diyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Ona başka bir yoldan bir kez daha anlatırdım.",
              comparison: "Sen de İdrîs gibi davrandın. O da vazgeçmedi; aynı konuyu başka bir yoldan anlattı ve arkadaşı anladı.",
            },
            {
              id: "b",
              text: "Diğerleri sıkılmasın diye konuyu hemen geçerdim.",
              comparison: "Bir grubu bekletmemek de düşünülmesi gereken bir şeydir. Ama o gün ders uzadı ve kimse buna üzülmedi.",
            },
            {
              id: "c",
              text: "Anlamasını beklemeden onu kendi başına bırakırdım.",
              comparison: "Herkes bazen kendi başına öğrenir. İdrîs ise beklemeyi seçti ve öğrencisi o gün anladı.",
            },
          ],
        },
        learned: [
          "Sabır öğrenirken de gerekir; bir başkasına öğretirken ondan çok daha fazlası gerekir.",
          "İdrîs anlamayan öğrencisine kızmadı; aynı şeyi başka bir yoldan yeniden anlattı.",
          "Dağılan öğrencilerini tek tek bulup çağırdı; kurduğu şeyi sürdürmekten vazgeçmedi.",
        ],
        gorev: {
          id: "idris-2-sabirla-anlat",
          ad: "Bir Kez Daha Anlat",
          kategori: "öğrenme / paylaşma",
          aciklama: "İyi bildiğin bir şeyi bir kişiye anlat. Anlamazsa kızma; aynı şeyi bu kez başka bir yoldan, örnek vererek anlat.",
          sure: "10–15 dakika",
          olcut: "Anlattığın kişi “şimdi anladım” diyene kadar en az iki farklı yolla anlattıysan tamamladın.",
        },
      },
      {
        id: "3",
        title: "Bir Karış Bez",
        ozet: "Bir örümcek ağından yola çıkar; aylarca uğraşır ve sonunda elinde yalnızca bir karış bez kalır.",
        audioUrl: "",
        badgeName: "Vazgeçmeyen El Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-idris/bolum-3/kapak.jpg",
          alt: "Alacakaranlıkta tenha bir kır köşesi, bir taşın üstünde duran yün yumağı ve öreke.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Aradan uzun yıllar geçti ve İdrîs artık yurdunu yöneten, ders veren biri olmuştu. Fakat gençliğinde aklına takılan o soru hâlâ olduğu yerde duruyordu. İnsanı koruyacak hafif bir örtü nasıl yapılabilirdi?", dropCap: true },
          { type: "text", text: "Kışın soğuk, yazın sıcak insanları yoruyor ve işlerini ağırlaştırıyordu. Deriler ağır geliyor, yapraklar ise bir günde kuruyordu; İdrîs bunca yıl doğru çareyi bulamamıştı." },
          { type: "text", text: "Bir akşam eşi Hedame yanına geldi, çünkü yüzündeki durgunluğu çoktan fark etmişti." },
          { type: "text", text: "— Bu işte sana bir yardımım olur mu ey İdrîs? diye sordu." },
          { type: "text", text: "— Bunu çok isterdim ama aklımı bir türlü tek işe toplayamıyorum, dedi İdrîs." },
          { type: "text", text: "Hedame bir süre düşündü, sonra sakin ve kararlı bir sesle konuştu." },
          { type: "text", text: "— Öyleyse bir süre çekil, işlerini birine bırak ve yalnız bunu düşün, dedi." },
          { type: "text", text: "— Bu iş yıllar sürebilir ey Hedame, dedi İdrîs." },
          { type: "text", text: "— Böyle hayırlı bir iş için yıllarca beklerim, dedi Hedame." },
          { type: "text", text: "İdrîs ertesi gün yerine bir vekil bıraktı ve derslerini yardımcılarına verdi. Sonra kırlara, tenha yerlere açıldı; yanına yalnızca gözlerini ve sabrını aldı." },
          { type: "text", text: "Önce yaprakların dokusuna baktı, sonra hayvan derilerini aylarca yanında taşıdı. Onları kazıdı, tuzladı ve yumuşatmaya çalıştı ama hiçbiri istediği gibi olmadı. Hepsi ya çok ağırdı ya da hiç hava geçirmiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-3/denenip-birakilanlar.jpg",
            alt: "Bir kayanın üstüne yan yana serilmiş kurumuş yapraklar, sert deri parçaları ve kabuk şeritleri.",
          },
          { type: "text", text: "Bir sabah ağılların yanından geçerken durdu ve dikkatle bakmaya başladı. Çobanlar ağılı sırıklarla çevirmiş, aralarını dallarla hasır gibi örmüşlerdi. Sırıklardan birinin köşesinde ise bir örümcek ağını örüyordu." },
          { type: "text", text: "İdrîs saatlerce o örümceği izledi ve yaptığı her hareketi aklına yazdı. Örümcek ipini bir yere yapıştırıyor, geriyor ve araları tek tek dolduruyordu. İdrîs'in aklında bir kapı açıldı: iplikler de böyle örülemez miydi?" },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-3/orumcek-agi.jpg",
            alt: "İki sırığın arasına örülmüş, üzerinde çiy taneleri parlayan bir örümcek ağı.",
          },
          { type: "text", text: "Çobanlardan bir avuç yün istedi; yünü temizledi, yıkadı ve kuruttu. Bir öreke yapıp eğirdi, sonra körpe bir dalı daire gibi büküp kertikler açtı. Kertiklere karşılıklı ip doladı ve aralarını sabırla örmeye başladı." },
          { type: "text", text: "Aylar geçti: bir ay, üç ay, derken altı ay doldu. Sonunda elindekine baktı ve dokuduğu bezin ancak bir karış olduğunu gördü. Bu kadarcık bez bir insanı örtmeye asla yetmezdi. İdrîs avucundaki küçük parçayı uzun uzun çevirdi." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-3/bir-karis-bez.jpg",
            alt: "Ahşap bir el gergefinin üstünde duran, avuç kadar küçük ham beyaz bez parçası.",
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "İdrîs o küçük bezi yine de bırakmadı ve sebebini kendi kendine açıkladı. Elindeki parça, olmayacak bir şeyin değil, olacak bir şeyin ilk parçasıydı. Altı ay boyunca yanlış yolda yürümemiş, sadece yolu yeni açmıştı." },
          { type: "text", text: "Kestirme yollardan köyüne döndü ve Hedame onu kapıda şaşkınlıkla karşıladı." },
          { type: "text", text: "— Çok çabuk döndün ey İdrîs, dedi." },
          { type: "text", text: "— Çünkü aradığımı buldum ve geriye yalnız onu çoğaltmak kaldı, dedi İdrîs." },
          {
            type: "interactive_word",
            before: "Ertesi sabah el ele verdiler, bol yün hazırlayıp eğirdiler ve İdrîs büyük bir tezgâh kurdu. İpliği alta ve üste geçire geçire ilerlediler ve bu işin adı ",
            word: "dokuma",
            meaning: "İplikleri alt alta ve üst üste geçirerek kumaş yapmaktır.",
            after: " oldu. Aylar sonra bir insanı örtecek kadar bez hazırdı.",
          },
          { type: "text", text: "İdrîs bezi ışığa tuttu, buruşturdu ve yırtmayı denedi ama bez dayanıklı çıktı. Sonra kesip birleştirdi ve giyilecek bir hâle getirdi; ilk denemede hareket etmek zordu. Vazgeçmeyip birkaç gün daha uğraştı." },
          { type: "text", text: "Sonunda meydandaki söz taşına çıktı ve bu kez sakladığı hiçbir şey yoktu. Yıllar önce yaprakları koparmaktan çekinmişti, çünkü ağaçlar tükenecekti. Şimdi bulduğu çare ise kimseden hiçbir şey eksiltmiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-3/meydandaki-soz-tasi.jpg",
            alt: "Köy meydanındaki düz söz taşı ve üstüne serilmiş, rüzgârda hafifçe kalkan beyaz bez.",
          },
          { type: "text", text: "— Ey insanlar, elimde hafif bir örtü var ve bunu iplikten dokudum, dedi." },
          { type: "text", text: "Kalabalık sustu ve dikkatle dinlemeye başladı." },
          { type: "text", text: "— Bu örtü sizi kışın soğuğundan, yazın ateşinden koruyacak, dedi. Üstelik yapımında fazla yün de gitmiyor." },
          { type: "text", text: "Aylar sonra bir şeyi daha fark edip halka anlattı: açık renkli bezler bedeni serin tutuyordu. Koyu renkliler ise ısıtıyordu ve bir karışlık bez koca bir köyün hayatını değiştirmişti." },
        ],
        has_question: true,
        question: {
          title: "Bir Karış Bez",
          prompt: "Uzun zamandır uğraştığın bir işte çok az yol aldın. Elindeki sonuç çok küçük görünüyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Bu yolu bırakıp bambaşka bir şey denerdim.",
              comparison: "Yeni bir yol denemek bazen doğrudur. Ama İdrîs o yolu bırakmadı ve altı aylık emeği boşa gitmedi.",
            },
            {
              id: "b",
              text: "Bir süre ara verir, sonra bakmaya karar verirdim.",
              comparison: "Ara vermek dinlendirir. İdrîs ise ara vermeden sürdürdü ve o küçük parça büyük bir çareye dönüştü.",
            },
            {
              id: "c",
              text: "Küçük de olsa elimdekine bakıp aynı yoldan devam ederdim.",
              comparison: "Sen de İdrîs gibi davrandın. O da bir karışlık beze bakıp aynı yoldan devam etti.",
            },
          ],
        },
        learned: [
          "Emek, sonucu küçük göründüğü gün bile sürer; asıl zor olan tam o gün vazgeçmemektir.",
          "İdrîs altı ayda yalnız bir karış bez dokudu; ama o karış, yolun doğru olduğunu gösterdi.",
          "İşi Hedame ile paylaşınca iş hızlandı; birlikte çalışmak yükü ikiye böldü.",
        ],
        gorev: {
          id: "idris-3-birakmadan-bitir",
          ad: "Yarım Kalanı Bitir",
          kategori: "sorumluluk / emek",
          aciklama: "Yarım bıraktığın küçük bir işi seç. Üç gün boyunca her gün biraz ilerlet. Az ilerlediğin gün de bırakma, yine biraz yap.",
          sure: "Günde 10 dakika, üç gün",
          olcut: "Üç günün sonunda işin bittiyse ya da başladığın günden belirgin biçimde ilerlediyse tamamladın.",
          guvenlikNotu: "Seçtiğin iş ateş, bıçak ya da yüksek bir yer gerektiriyorsa mutlaka yanında bir yetişkin olsun.",
        },
      },
      {
        id: "4",
        title: "Yüce Bir Mertebeye",
        ozet: "Uzaktan gelen tanınmayan bir sürü halkı şüphelendirir; sözüne güvenilen İdrîs sabır ister ve haklı çıkar.",
        audioUrl: "",
        badgeName: "Güvenilen Söz Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-idris/bolum-4/kapak.jpg",
          alt: "Şafak öncesi bir tepe, altındaki sessiz vadi ve tepede yalnız duran bir ağaç.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar akıp gitti ve önce Hz. Âdem (a.s.), sonra Hz. Havva vefat etti. Bir gün de Hz. Şît (a.s.) aralarından ayrıldı ve yeryüzüne büyük bir sessizlik çöktü. İnsanlar artık kime danışacaklarını bilemiyorlardı.", dropCap: true },
          { type: "text", text: "İdrîs o günlerde tenhaya çekilip insanların hâlini düşünüyordu. Bir ikindi vakti ona müjde geldi: Allah onu peygamber olarak görevlendirmişti. İdrîs bu görevi taşımaya ve insanlara sabırla anlatmaya başladı." },
          { type: "text", text: "Yıllar sonra bir sabah, doğu ufkunda geniş bir toz bulutu belirdi. İdrîs önce bunu bir fırtına sandı ama toz yaklaştıkça şekiller belirginleşti. Gelenler, o güne kadar hiç görülmemiş bir hayvan sürüsüydü." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-4/ufuktaki-toz.jpg",
            alt: "Doğu ufkunda yükselen geniş bir toz perdesi ve önündeki boş düzlük.",
          },
          { type: "text", text: "Sürü dört yüzden fazlaydı ve yavruları da yanlarında yürüyordu. İdrîs eline ot alıp göstere göstere birine yaklaştı, hayvan kaçmadı ve otu avucundan yedi. Sonra atası Hz. Âdem'den dinlediklerini hatırladı: uzak doğu topraklarında böyle hayvanlar varmış." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-4/tanimadigimiz-hayvanlar.jpg",
            alt: "Yamaçta otlayan bir at sürüsü ve aralarında dolaşan taylar.",
          },
          { type: "text", text: "İlk günlerde herkes sevindi ve kadın erkek, çoluk çocuk atların karşısına geçti. Onlara sorular sordular, sevip okşadılar ve gözlerinde hem dostluk hem hüzün gördüler." },
          { type: "text", text: "Fakat bir hafta sonra sevinç yerini şüpheye bıraktı, çünkü atlar çok ot yiyordu. Susuz kalmaya dayanamıyor, sürekli gölge arıyor ve üstelik çabuk hastalanıyorlardı." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-4/bos-yemlik.jpg",
            alt: "Ağılda dibi görünen boş bir yemlik, yanında devrilmiş su kabı ve dağılmış saman.",
          },
          { type: "text", text: "Köyde sesler yükseldi ve bir grup doğruca İdrîs'e geldi." },
          { type: "text", text: "— Bunlar nimet mi, yoksa musibet mi? Yiyeceğimizi bölüşüp bizi yoksul düşürecekler, dediler." },
          { type: "text", text: "İdrîs kalabalığa baktı ve herkes onun cevabını bekledi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "İdrîs hemen cevap vermedi; önce hayvanlara, sonra insanların yüzlerine dikkatle baktı." },
          { type: "text", text: "— Biraz sabredin, çünkü ilerde onlardan çok faydalanacağız; Allah onları yarattıysa rızkını da vermiştir, dedi." },
          { type: "text", text: "Kalabalıktaki sesler yavaş yavaş kesildi ve herkes yerine döndü." },
          { type: "text", text: "Halkın böylesine çabuk durulmasının çok basit bir sebebi vardı. İdrîs asla yalan söylemez, yıllardır bir kez bile sözünden dönmezdi. İnsanlar onun ağzından çıkan sözü tartmadan kabul ederlerdi.", keySentence: true },
          { type: "text", text: "Yine de herkes ikna olmamıştı ama İdrîs kimseyi zorlamadı. Atlara gerçekten sevgi duyanları seçti ve her birine birer at teslim etti. Sabahları onlarla birlikte yamaçlara çıkıyordu." },
          { type: "text", text: "— Etini yemeyeceğiz, sütünü içmeyeceğiz; öyleyse bunları ne işte kullanacağız? diye sordular." },
          { type: "text", text: "İdrîs uzaklara baktı ve sesini yükseltmeden cevap verdi." },
          { type: "text", text: "— Onlar bizim ayaklarımız olacak ve günlerce süren yolumuz saatlere inecek, dedi." },
          { type: "text", text: "Kimse tam olarak inanmadı ama ay dolmadan atlar yurdu benimsedi. İdrîs de kendi atının huyunu her gün biraz daha öğrendi." },
          { type: "text", text: "Bir sabah halkı topladı, atına sıçradı ve ufka doğru dörtnala koşturdu. Bir günde ancak yürünecek yol o gün çok kısa sürede aşıldı ve halk sevinçten bağrıştı." },
          {
            type: "interactive_word",
            before: "İdrîs attan indi ve terini kuruladı, sonra halka dönüp onları uyardı. Yaptığı şey bir ",
            word: "mucize",
            meaning: "Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır.",
            after: " değil, uzun bir sabrın ve dikkatli bir aklın sonucuydu.",
          },
          { type: "text", text: "— Bende olağanüstü bir güç aramayın, çünkü bu iş akılla ve emekle olur, dedi. Allah'ın bize verdiği en büyük nimet zaten aklımızdır." },
          { type: "text", text: "Yıllar yine akıp gitti ve bir bahar günü İdrîs'e derin bir durgunluk geldi. Derslerini yardımcılarına bıraktı ve her gün çok sevdiği tepeye çıkıp akşamı etti. Bir akşam Rabbine yalvarıp sonunda Ona kavuşmayı diledi." },
          { type: "text", text: "Ertesi sabah Hedame uyandığında İdrîs henüz dönmemişti ve ondan hiç haber çıkmadı. Köylüler tepeye koştu, ayak izlerini aradılar ama hiçbir iz bulamadılar. Günler geçti ve İdrîs bir daha hiç görünmedi." },
          { type: "text", text: "İnsanlar bu kayboluş için çok şey söylediler ama doğrusunu kimse bilemedi. Yıllar geçtikçe söylenenler çoğaldı ve sonunda Allah, Kur'an'da onun sırrını kullarına bildirdi." },
          { type: "text", text: "Kur'an'da İdrîs'in çok sadık bir peygamber olduğu ve pek yüce bir mertebeye yükseltildiği bildirilir. Bu yüzden İdrîs kaybolmuş sayılmaz; o, öğrendiklerini ve sabrını Rabbinin katına götürdü. Geride bıraktığı iz ise hâlâ duruyor: öğrenmek, öğretmek ve vazgeçmemek." },
          {
            type: "image",
            src: "/kitaplar/hz-idris/bolum-4/ufka-uzanan-yol.jpg",
            alt: "Toprakta ufka doğru uzanan bir iz ve üzerine düşen ilk sabah ışığı.",
          },
        ],
        has_question: true,
        question: {
          title: "Yüce Bir Mertebeye",
          prompt: "Herkesin şüphelendiği bir konuda kararsız kaldın. Yanında, hiç yalan söylemediğini bildiğin biri var. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Ona sorar, söylediğine güvenip biraz daha beklerdim.",
              comparison: "Sen de halkın yaptığını yaptın. Onlar da hiç yalan söylemeyen birine güvendiler ve beklediler.",
            },
            {
              id: "b",
              text: "Çoğunluk ne diyorsa ben de onu yapardım.",
              comparison: "Çoğunluğa uymak bazen kolaydır. O gün çoğunluk vazgeçmek istiyordu; sonuç ise tam tersi çıktı.",
            },
            {
              id: "c",
              text: "Kimseye sormadan hemen kendi kararımı verirdim.",
              comparison: "Kendi kararını vermek değerlidir. Ama o gün bilmedikleri bir konu vardı; sormak onlara zaman kazandırdı.",
            },
          ],
        },
        learned: [
          "Doğru sözlü olmak, güç anlarda insanların sana güvenmesini sağlayan en sağlam bağdır.",
          "Halk şüphelenince İdrîs kimseyi zorlamadı; sabır istedi ve söylediği sonunda çıktı.",
          "Başarısını mucize saymadı; aklın ve sabrın Allah'ın birer nimeti olduğunu söyledi.",
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
