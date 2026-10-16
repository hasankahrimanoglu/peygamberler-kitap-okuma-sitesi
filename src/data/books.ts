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
      /** İsimsiz tanıkta boş bırakılır; imza satırı çizilmez (etiket yeterli). */
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
  // Sesli anlatım alanı YOK (KARAR 12 Eki 2026 — PROJE-MODELI 6.5): dosya yolu
  // `varlikYollari.ts:sesliAnlatim(bookKey, bolumNo)` ile türetilir.
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
  {
    key: "nuh",
    title: "Hz. Nûh",
    keywords: ["nuh"],
    totalQuizQuestions: 8,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu kitaptaki sorular çoğunlukla arkadaş baskısıyla insanın kendi doğrusu arasında bir seçim istiyor ve bu, bu yaşta gerçekten zorlayıcıdır. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
    parent_summary_variants: {
      high: "Çocuğunuz bu kitaptaki kararların çoğunda bölümün değerini yakalamış olabilir. Özellikle kalabalığa rağmen doğru bildiğinde kalmayı, dışlanan birine sahip çıkmayı ve zor bir anda sakin davranmayı seçtiği görülüyor. Bu seçimler, kitabın anlattığı sabır ve güven fikrine yakın duruyor.",
      mixed: "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu kitaptaki sorular çoğunlukla arkadaş baskısıyla insanın kendi doğrusu arasında bir seçim istiyor ve bu, bu yaşta gerçekten zorlayıcıdır. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
      low: "Çocuğunuz kararların çoğunda daha kolay ya da arkadaşlarına daha yakın görünen seçeneklere yönelmiş olabilir. Bu, kitabın anlaşılmadığı anlamına gelmez; bu yaşta gruba uyma isteği doğal ve güçlüdür. Hikâyede Hz. Nûh'un yıllarca sakin ve nazik kalmasını birlikte hatırlamak, seçimlerin nereye vardığını görmesine yardımcı olabilir.",
    },
    chat_questions: [
      "Herkes bir şey yaparken senin “Ben yapmayayım” dediğin bir zaman oldu mu? O an ne hissettin?",
      "Uzun süre bekleyip sonunda kavuştuğun ya da bitirdiğin bir şey var mı?",
      "Nûh'un gemisinde olsaydın en çok neyi özlerdin? Gemiden indiğin gün ilk ne yapmak isterdin?",
    ],
    parent_faq: [
      {
        question: "Gemiye binmeyenler neden boğuldu? Allah onları sevmiyor muydu?",
        approach: "Kitap bunu tek cümleyle, ayrıntı vermeden anlatır. Kur'an'a göre Hz. Nûh kavmini yüzyıllar boyunca uyardı, onlara “Rabbinizden bağışlanma dileyin” dedi ve kapı bu süre boyunca hep açık kaldı. Çocuğunuzun asıl kaygısı çoğu zaman “Bize de böyle bir şey olur mu?” sorusudur. Allah'ın çok bağışlayıcı olduğunu, kitapta Hz. Nûh'un bunu defalarca söylediğini hatırlatmak güven verir. Ölümün gerçek olduğunu inkâr etmeden, sakin bir dille konuşmak yeterlidir.",
      },
      {
        question: "Hz. Nûh'un oğlu neden kurtulmadı? Babası peygamberdi.",
        approach: "Kur'an'a göre oğlu babasının çağrısını son ana kadar reddetti ve bir dağa sığınacağını söyledi. Kitabın verdiği mesaj şudur: her insan kendi seçiminden sorumludur; bir peygamber bile sevdiğini zorla kurtaramaz. Hz. Nûh'un ona son ana kadar “Yavrucuğum” diye sevgiyle seslendiğini, sonra da Allah'a sığındığını konuşabilirsiniz. Gelenekte bu oğlun adı Ken'an (bazı kaynaklarda Yâm) olarak anılır; kitapta adı verilmedi. Yakın zamanda bir aile kaybı yaşamış bir çocukla bu bölümü konuşurken özellikle yumuşak olun.",
      },
      {
        question: "Bir gün yine tufan olur mu? Bizim evimizi de su basar mı?",
        approach: "Kitaptaki tufan, uzun yıllar uyarılan bir kavimle ilgili, Kur'an'da anlatılan özel bir olaydır. Bugün de sel gibi doğal olaylar yaşanabilir, ama büyükler önlem alır ve uyarıları takip eder. Çocuğunuza açık bir güvenlik kuralı verin: sel uyarısı olduğunda yüksek ve güvenli bir yere geçilir, suya girilmez ve yetişkinlerin söylediği yapılır. Hz. Nûh'un tehlike gelmeden hazırlanması (Bölüm 5), bu konuda da güzel bir örnektir.",
      },
      {
        question: "Hz. Nûh gerçekten 950 yıl mı yaşadı?",
        approach: "Kur'an'da Hz. Nûh'un kavminin arasında dokuz yüz elli yıl kaldığı bildirilir (Ankebût 14). O dönemin insanlarının ömrü hakkında kesin bilgimiz azdır ve bunun nasıl olduğunu tam bilmediğimizi söylemek dürüst bir cevaptır. Sohbeti sayıdan çok, bu kadar uzun bir sabrın ne demek olduğuna yönlendirmek daha verimli olur.",
      },
      {
        question: "Hz. Nûh'un eşi gemide miydi?",
        approach: "Kur'an, Hz. Nûh'un eşinin ona inanmadığını bildirir (Tahrîm 10). Gemiye binip binmediği konusunda ise farklı anlatımlar vardır. Kitap bu yüzden yalnızca “ailesi ve ona inananlar gemiye bindi” der. Çocuğunuza, kesin bilinmeyen konularda farklı görüşler olabileceğini anlatmak için iyi bir fırsattır.",
      },
      {
        question: "Güvercin ve zeytin dalı neden yok? Aşure Hz. Nûh'tan mı kaldı?",
        approach: "Güvercinin gemiye zeytin dalı getirmesi çok bilinen bir anlatıdır, ama Kur'an'da geçmez; kitap bu yüzden ona yer vermedi. Aşurenin, sular çekilince gemide kalan yiyeceklerle pişirildiği de bir rivayete dayanır. İkisini de “Kur'an'da geçmeyen ama anlatılagelen güzel gelenekler” olarak konuşabilirsiniz. Belki birlikte bir aşure pişirip hikâyeyi yeniden hatırlarsınız.",
      },
    ],
  },
  {
    key: "eyyub",
    title: "Hz. Eyyûb",
    keywords: ["eyyub"],
    totalQuizQuestions: 5,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş olabilir. Bu kitaptaki sorular çoğunlukla üzüntü, kırgınlık ya da kaygı anında ne yapılacağını soruyor; böyle anlarda bir seçim yapmak her yaşta zorlayıcı olabilir. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
    parent_summary_variants: {
      high: "Çocuğunuz bu kitaptaki kararların çoğunda bölümün değerini yakalamış olabilir. Paylaşmak, kötü bir haber karşısında sakin kalmak ya da zor günde sevdiklerinin yanında olmak gibi seçeneklere yönelmiş olabilir. Bu seçimler, kitabın anlattığı sabır, vefa ve şükür fikrine yakın duruyor.",
      mixed: "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş olabilir. Bu kitaptaki sorular çoğunlukla üzüntü, kırgınlık ya da kaygı anında ne yapılacağını soruyor; böyle anlarda bir seçim yapmak her yaşta zorlayıcı olabilir. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
      low: "Çocuğunuz kararların çoğunda o an daha kolay görünen ya da duygusunu hemen dışa vuran seçeneklere yönelmiş olabilir. Bu, kitabın anlaşılmadığı anlamına gelmez; üzülmek, kırılmak ve korkmak bu yaşta doğal ve güçlü duygulardır. Hikâyede Hz. Eyyûb'un da çok üzüldüğünü ama derdini Allah'a açarak yoluna devam ettiğini birlikte hatırlamak, farklı seçenekleri birlikte düşünmesine yardımcı olabilir.",
    },
    chat_questions: [
      "Sahip olduğun bir şeyi başkasıyla paylaştığında neler hissettin? Hangi paylaşım seni en çok sevindirdi?",
      "Çok üzüldüğün bir anda yanında kim vardı? Sen zor durumdaki birinin yanında nasıl olabilirsin?",
      "Hz. Eyyûb iyileşince Rabbine şükretti. Bugün şükretmek istediğin üç şey nedir?",
    ],
    parent_faq: [
      {
        question: "Hz. Eyyûb'un çocukları neden öldü? Bizim evimiz de yıkılır mı?",
        approach: "Kur'an ölümün nasıl olduğunu anlatmaz; Hz. Eyyûb'a “ailesinin ve onlarla birlikte bir o kadarının” verildiğini kısaca bildirir (Enbiyâ 84, Sâd 43). Kitap, kaynağımızdaki anlatıma dayanarak ölümü tek ve sakin bir cümleyle verir, sahne anlatmaz. Neden böyle olduğunu en iyi Allah bilir; kitabın açıkça söylediği gibi bu bir ceza değildi ve Hz. Eyyûb çocuklarını hep sevgiyle andı. Çocuğunuz kendi evi için kaygılanırsa evinizde güvenlik için neler yapıldığını ve bir afet anında ailece ne yapacağınızı (güvenli yer, buluşma noktası, büyüklerin yanında kalmak) sakin bir dille konuşun; onu koruyan yetişkinlerin hep yanında olduğunu hatırlatın.",
      },
      {
        question: "Hz. Eyyûb kötü bir şey mi yaptı da hastalandı? Hastalık bir ceza mı?",
        approach: "Kitap bunu açıkça söyler: Hz. Eyyûb'un başına gelenler bir ceza değildi. Kur'an onun için “Biz onu sabırlı bulduk; o ne güzel bir kuldu” der (Sâd 44). Hikâyede onu suçlayan iki dosta genç bir arkadaşın “Bu dert ona bir ceza olarak değil, bir hayır olarak verildi” diye karşılık verdiğini birlikte hatırlayabilirsiniz. Çevrenizde hasta biri varsa, hastalığın kimsenin suçu olmadığını ve hastaya en çok sevginin, yakınlığın iyi geldiğini konuşmak güzel olur.",
      },
      {
        question: "Biz de dua edip sabredersek hastalar iyileşir mi, kaybettiklerimiz geri gelir mi?",
        approach: "Kitap, Hz. Eyyûb'un iyileşmesini ve ona verilenleri bir kural olarak değil, Allah'ın ona özel bir rahmeti olarak anlatır; pınar bir mucizedir. Dua etmek, derdimizi Allah'a açmak ve yalnız olmadığımızı hissetmektir; karşılığı her zaman istediğimiz biçimde ve zamanda gelmeyebilir, hastalıkta doktora gitmek ve tedavi olmak da gerekir. Kur'an'ın ailesiyle ilgili ifadesi kısadır (Sâd 43); kaynağımızdaki anlatıma göre Hz. Eyyûb'un yeniden çocukları oldu. Altın çekirgeler de bir rivayettir; kaynağımızdaki bir konuşmada bunun maddî bir ödül olarak değil, kalbe gelen huzur olarak anlaşılması gerektiği söylenir.",
      },
      {
        question: "Şeytan Hz. Eyyûb'a ne yaptı?",
        approach: "Kur'an'da Hz. Eyyûb'un “Şeytan bana bir yorgunluk ve azap dokundurdu” diye Rabbine seslendiği bildirilir (Sâd 41); kitap “azap” yerine “sıkıntı” kelimesini kullandı. Bazı rivayetlerde şeytanın, Hz. Eyyûb'un yalnızca iyi günlerde Allah'a bağlı olduğunu iddia ettiği anlatılır; kitap bu anlatımı almadı. Çocuğunuza, şeytanın insanın içine umutsuzluk ve yorgunluk sokmaya çalışabileceğini, Hz. Eyyûb'un ise bunu da Rabbine anlatarak O'na sığındığını söyleyebilirsiniz.",
      },
      {
        question: "Hz. Eyyûb bir yemin mi etmişti?",
        approach: "Kur'an'da Allah'ın Hz. Eyyûb'a “Eline bir demet sap al, onunla vur ve yeminini bozma” dediği bildirilir (Sâd 44). Yeminin sebebini Kur'an bildirmez; anlatılanlar farklıdır ve kitap bu konuyu çocuk metnine almadı. Âyet, Allah'ın Hz. Eyyûb'a kimseyi incitmeden sözünü tutmanın yolunu gösterdiği biçiminde anlaşılır. Bu konu, sözümüzü düşünerek vermeyi ve verdiğimiz sözü tutmayı konuşmak için bir fırsat olabilir.",
      },
      {
        question: "İnsanlar Hz. Eyyûb'dan neden uzaklaştı? Hasta birinin yanına gitmemek kötü mü?",
        approach: "Kitap, köy halkının hastalığın kendilerine geçmesinden korktuğunu anlatır ve onları “kötü” diye göstermez; Hz. Eyyûb da “Bu onların hakkı” der. Bulaşıcı bir hastalıkta uzak durmak bazen doğru ve gerekli bir önlemdir; bunu doktorların ve büyüklerin söylediklerine göre yaparız. Vefa, kuralları çiğnemek değil, uzaktan da olsa sevdiğimizi yalnız bırakmamaktır: telefonla aramak, bir kart göndermek, dua etmek gibi. Üçüncü bölümdeki Bugüne Taşı görevi de bu fikre dayanır.",
      },
    ],
  },
  {
    key: "musa",
    title: "Hz. Musa",
    keywords: ["musa"],
    totalQuizQuestions: 10,
    // Panel S5'e kadar mixed varyantını gösterir (PROJE-MODELI.md S5 kararı).
    parent_summary:
      "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu kitaptaki sorular çoğunlukla korku ya da kolay olan ile doğru olan arasında bir seçim istiyor ve bu tür seçimler bu yaşta zorlayıcı olabilir. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
    parent_summary_variants: {
      high: "Çocuğunuz bu kitaptaki kararların çoğunda bölümün değerini yakalamış olabilir. Özellikle korkusuna rağmen doğru olanı seçmeyi, karşılık beklemeden yardım etmeyi ve zorlandığı yerde yardım istemeyi tercih ettiği görülüyor. Bu seçimler, kitabın anlattığı güven ve cesaret fikrine yakın duruyor.",
      mixed: "Çocuğunuz bazı kararlarda bölümün değerini yakalamış, bazılarında ise başka seçenekleri değerlendirmiş görünüyor. Bu kitaptaki sorular çoğunlukla korku ya da kolay olan ile doğru olan arasında bir seçim istiyor ve bu tür seçimler bu yaşta zorlayıcı olabilir. Hangi bölümde neyi neden seçtiğini sormak, sohbet için iyi bir başlangıç olabilir.",
      low: "Çocuğunuz kararların çoğunda daha kolay ya da o an daha güvenli görünen seçeneklere yönelmiş olabilir. Bu, kitabın anlaşılmadığı anlamına gelmez; korkmak ve çekinmek bu yaşta doğal ve güçlü duygulardır. Hikâyede Hz. Musa'nın da defalarca korktuğunu ama yardım isteyerek yoluna devam ettiğini birlikte hatırlamak, seçimlerin nereye vardığını görmesine yardımcı olabilir.",
    },
    chat_questions: [
      "Çok korktuğun ama yine de yaptığın bir şey oldu mu? O an sana ne güç verdi?",
      "Birine karşılık beklemeden yardım ettiğin bir zamanı hatırlıyor musun? Sonra neler hissettin?",
      "Hz. Musa gibi bir şey öğrenmek için uzun bir yolculuğa çıksaydın, neyi öğrenmek isterdin?",
    ],
    parent_faq: [
      {
        question: "Firavun bebeklere neden böyle bir emir verdi? Hz. Musa'nın annesi bebeğini neden nehre bıraktı?",
        approach: "Kur'an'a göre Firavun ülkesinde büyüklük taslıyor ve İsrailoğullarını güçsüz bırakmak istiyordu (Kasas 4); emir bu kibirden doğdu. Kitap bunu tek cümleyle verir ve hemen ardından Allah'ın ezilenlere iyilik etmek istediğini hatırlatır (Kasas 5). Annenin davranışı ise bebeğini korumak için yaptığı çok zor bir seçimdir; Allah ona bebeği geri döndüreceğini bildirmiş ve sözünü tutmuştur (Kasas 7, 13). Çocuğunuz kaygılanırsa bunun çok eski zamanda bir zalimin haksız emri olduğunu, bugün çocukları koruyan aileler ve kurallar bulunduğunu, sizin de hep onun yanında olduğunuzu söyleyin.",
      },
      {
        question: "Hz. Musa birini mi öldürdü? Peygamberler de kötü şey yapar mı?",
        approach: "Kur'an'a göre Hz. Musa, henüz peygamber olmadan önce birini korumak için kavgaya karışmış ve vurduğu bir yumruk adamın ölümüne yol açmıştır (Kasas 15). Kendisi bunu “o zaman bilmeden yaptım” diye anlatır (Şuarâ 20); hemen pişman olmuş, bağışlanma dilemiş ve bağışlanmıştır (Kasas 16). Kitabın mesajı, hatayı kabul edip aynı yanlışa dönmemektir. Bu sohbet, vurmanın istemediğimiz sonuçlar doğurabileceğini ve kavgaya karışmak yerine bir yetişkinden yardım istemek gerektiğini konuşmak için de iyi bir fırsattır.",
      },
      {
        question: "Firavun ve askerleri denizde boğuldu mu? Neden?",
        approach: "Kitap bunu tek cümleyle, ayrıntı vermeden anlatır. Kur'an'a göre Firavun yıllarca uyarıldı, pek çok işaret gördü, her seferinde sözünü bozdu ve sonunda inananları yok etmek için peşlerine düştü (Şuarâ 52–66). Kur'an ayrıca Firavun'un boğulmak üzereyken “inandım” dediğini, ona “Şimdi mi?” denildiğini ve bedeninin sonrakilere ibret olarak bırakıldığını bildirir (Yûnus 90–92); kitap bu kısmı çocuk metnine almadı. Çocuğunuz sorarsa, Allah'ın kapıyı uzun süre açık tuttuğunu ve kurtuluşun en zor anda bile O'na güvenenlere geldiğini anlatmak yeterlidir.",
      },
      {
        question: "Hızır gemiyi neden deldi? Kitapta 'ikinci olay' denen şey neydi?",
        approach: "Kur'an'a göre Hızır diye bilinen kul gemiyi, zorba bir kral ele geçirmesin diye kusurlu yaptı (Kehf 79); ikinci olayda ise karşılaştıkları bir genci öldürdü ve sebebini, gencin ileride anne babasını inkâra sürükleyeceğinden korkulmasıyla açıkladı (Kehf 74, 80–81). Kitap bu olayı ayrıntı vermeden andı. Hızır “Ben bunları kendiliğimden yapmadım” der (Kehf 82); yaptıkları Allah'ın ona özel olarak verdiği bilgiye dayanır ve kimse “ileride kötü olacak” diye başkasına zarar veremez. Çocuğunuza açık bir güvenlik kuralı verin: bir büyük ona zarar veren ya da gizli tutmasını istediği bir şey yapıp “Sebebini sonra anlarsın” derse, bunu hemen güvendiği bir yetişkine anlatmalıdır.",
      },
      {
        question: "Kitapta bazı şeyler neden 'anlatılanlara göre' diye geçiyor?",
        approach: "Bazı bilgiler Kur'an'da değil, sonradan aktarılan anlatımlarda (rivayetlerde) geçer; kitap bunları ayırmak için bu kalıbı kullanır. Hz. Musa'nın adının anlamı, kuyunun ağır taşı, Medyen'deki yaşlı babanın Hz. Şuayb olması, Hızır adı ve serçenin damlası rivayettir. Kekemeliğin bir bebeklik olayından kaldığına dair çok bilinen anlatı ile Âsiye'nin nasıl vefat ettiğine dair anlatımlar da rivayettir ve kitapta yer almadı; Kur'an yalnızca Hz. Musa'nın “dilimdeki düğümü çöz” diye dua ettiğini bildirir (Tâhâ 27). Kesin bilinen ile anlatılagelen arasındaki farkı görmek, çocuğunuz için güzel bir düşünme alışkanlığıdır.",
      },
      {
        question: "Hz. Musa'nın asası sihirli miydi? Ben de denizi ikiye ayırabilir miyim?",
        approach: "Kitap asayı sıradan bir çoban değneği olarak tanıtır; asa ancak Allah'ın izniyle bir işarete dönüşür. Sihirbazların yaptıkları göz aldatmasıydı; Hz. Musa'nın gösterdikleri ise Allah'ın izniyle gerçekleşen mucizelerdir. Mucizeler insanın kendi gücüyle yapabileceği şeyler değildir. Gündelik hayatta bize düşenin çalışmak, dua etmek ve zor anlarda büyüklerimizden yardım istemek olduğunu birlikte konuşabilirsiniz.",
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
  {
    id: "hz-nuh",
    routePrefix: "nuh",
    title: "Hz. Nûh",
    eyebrow: "Hz. Nûh — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Putlara Eğilmeyen Eller",
        ozet: "Herkes ona put yapmasını söyler; eli işe yatkın genç Nûh, tahtayı yalnız güzel işler için yontar.",
        badgeName: "Dimdik Duruş Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-1/kapak.jpg",
          alt: "Sabah ışığında yeşil bir vadi, küçük bir kerpiç ev, bahçesi ve uzakta parlayan iki nehir.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "İki büyük nehrin yakınındaki yeşil bir vadide, bir sabah küçük bir evden bebek sesi yükseldi. Babası Lâmek bebeği kucağına aldı ve onun minik ellerine uzun uzun baktı. Bu bebek, ileride peygamber olacak olan Hz. Nûh (a.s.) idi.", dropCap: true },
          { type: "text", text: "İslam inancına ve tarihî rivayetlere göre Nûh adı “rahat” anlamına gelirdi. Babası bu adı, ailesinin yorgun günlerine bir huzur gelsin diye koymuştu. Hz. İdrîs'in soyundan gelen bu ailede annesi Semha da oğlunun kulağına adını sevgiyle fısıldadı." },
          { type: "text", text: "Nûh büyüdükçe ellerinin hiç boş durmadığını herkes fark etti. Bulduğu tahta parçalarını sabırla yontuyor, onlara birbirinden güzel biçimler veriyordu. Bir gün küçük bir tekne yaptı ve onu tarlanın kenarından geçen arkta yüzdürdü." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-1/kucuk-tekne.jpg",
            alt: "Tarla kenarındaki dar bir arkta yüzen, tahtadan yontulmuş küçük bir oyuncak tekne.",
          },
          { type: "text", text: "Bir akşam annesinin yanına oturdu ve aklını kurcalayan soruyu sordu." },
          { type: "text", text: "— Anneciğim, buğdayı toprak büyütüyor, beni de sen doğurdun, dedi. Peki bütün bunları kim yarattı?" },
          { type: "text", text: "— Her şeyi yaratan, bir olan ve eşi benzeri olmayan Allah'tır, dedi annesi." },
          { type: "text", text: "Nûh bu cevabı kalbinin bir köşesine yerleştirdi ve hiç unutmadı." },
          { type: "text", text: "Ama vadinin dışında bambaşka bir hayat vardı ve insanlar Allah'ı çoktan unutmuştu. Taştan ve tahtadan putlar yapıyor, sonra kendi yaptıklarının önünde eğiliyorlardı. Komşuları bile bir derdi olduğunda bu putlara gidip onlardan yardım istiyordu." },
          {
            type: "interactive_word",
            before: "Bir olan Allah'ı bırakıp putlara yönelen kimseye ",
            word: "müşrik",
            meaning: "Bir olan Allah'a inanmayıp putlara tapan kimse demektir.",
            after: " denirdi. Nûh komşularını sevmeyi hiç bırakmadı ve onlara her zaman güler yüz gösterdi. Ama onların taşa ve tahtaya eğilmesini bir gün bile doğru bulmadı.",
          },
          { type: "text", text: "Yıllar geçti ve küçük Nûh, işinde çok usta bir genç oldu. Usta bir marangoz olduğu da aynı rivayetlerde anlatılır. Tarladaki sapana demir uç taktı, öküzlerin boynunu incitmeyen yumuşak boyunduruklar yonttu." },
          { type: "text", text: "Yaptığı kapılara ve sedirlere öyle güzel oymalar işledi ki görenler durup uzun uzun bakardı. Kıvrılan asma dalları ve açan çiçekler, sanki tahtanın içinden kendiliğinden çıkıyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-1/oymali-kapi.jpg",
            alt: "Asma dalları ve çiçek oymalarıyla süslenmiş ahşap bir kapı ve önünde dağınık talaşlar.",
          },
          { type: "text", text: "Bir gün komşulardan birkaçı onun tezgâhının başına toplandı. İçlerinden biri elindeki oymaya hayranlıkla baktı ve parmağıyla kıvrımlarını okşadı." },
          { type: "text", text: "— Senin ellerin bu vadideki herkesten usta, dedi. Bize bir de put yap, böylesini kimse görmemiştir." },
          { type: "text", text: "Ötekiler de başlarını sallayıp onu destekledi ve hepsi Nûh'un cevabını beklemeye başladı." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Nûh elindeki keskiyi yavaşça tezgâhın üstüne bıraktı ve sakin bir sesle konuştu." },
          { type: "text", text: "— Güzel sözleriniz için teşekkür ederim, dedi. Ama bu elleri bana Allah verdi, onlarla tapılacak bir şey yapamam." },
          { type: "text", text: "— Ama bu sadece bir tahta parçası, dedi komşusu." },
          { type: "text", text: "— Öyleyse ona neden eğiliyorsunuz? diye sordu Nûh." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-1/birakilan-keski.jpg",
            alt: "Ahşap tezgâhın üstüne bırakılmış bir keski ve yanında işlenmemiş düz bir tahta parçası.",
          },
          { type: "text", text: "Komşular bu soruya bir cevap bulamadı ve bir süre sessizce birbirlerine baktılar. Biri omuz silkip uzaklaştı, öteki söylene söylene evinin yolunu tuttu. Yine de Nûh'un tezgâhına iş getiren hiç eksik olmadı, çünkü yaptığı her şey hem sağlam hem güzeldi." },
          { type: "text", text: "Zamanla şehirden de ona iş getirmeye başladılar ve adı uzaklara kadar duyuldu. Gündüzleri şehirde çalıştı, akşamları ise vadideki evine döndü. Şehrin gece eğlencelerine onu çok çağırdılar, ama o hiçbirine katılmadı." },
          { type: "text", text: "— İşimi özenle yapmak istiyorum, derdi. Kendimi eğlenceye kaptırırsam ustalığımı da kaybederim." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-1/uzak-sehir.jpg",
            alt: "Akşam karanlığında uzakta ışıkları yanan bir şehir ve önde sessiz bir vadi patikası.",
          },
          { type: "text", text: "Bir akşam bahçedeki çardakta babasının yanına oturdu ve içini döktü." },
          { type: "text", text: "— Babacığım, insanlar Allah'ı unuttu, dedi. Onlara bunu hatırlatacak biri gelmeyecek mi?" },
          { type: "text", text: "— Allah kullarını hiçbir zaman başıboş bırakmaz, dedi Lâmek. Bunun zamanını da en iyi O bilir." },
          { type: "text", text: "Nûh başını kaldırıp uzun süre yıldızlara baktı. Çocukken sorduğu sorunun cevabı hâlâ kalbinin bir köşesinde parlıyordu. Herkes başka bir yöne eğilirken o, rüzgârda dimdik duran bir fidan gibi Rabbine bağlı kaldı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-1/dik-fidan.jpg",
            alt: "Yıldızlı bir gecede rüzgâra rağmen dimdik duran genç bir fidan.",
          },
        ],
        has_question: true,
        question: {
          title: "Putlara Eğilmeyen Eller",
          prompt: "Arkadaşların hep birlikte bir şey yapıyor ve sana da “Sen bunu çok güzel yaparsın” diyor. Ama sen yaptıkları şeyi doğru bulmuyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Beni övdükleri için kırmaz, ben de yapardım.",
              comparison: "Arkadaşlarını kırmak istememen çok anlaşılır. Nûh ise övgüye rağmen doğru bulmadığı işi yapmadı ve ustalığını güzel işlere sakladı.",
            },
            {
              id: "b",
              text: "Teşekkür eder ama doğru bulmadığım bir işe katılmazdım.",
              comparison: "Sen de Nûh gibi davrandın. O da hem nazik kaldı hem de doğru bulmadığı işe katılmadı.",
            },
            {
              id: "c",
              text: "Onlara kızar, bir daha hiç konuşmazdım.",
              comparison: "Kızgınlık insanın içinde kolayca büyür. Nûh ise kızmadan, sakin bir soruyla düşüncesini anlattı.",
            },
          ],
        },
        learned: [
          "Herkes aynı şeyi yapıyor diye doğru bulmadığımız bir işe katılmak zorunda değiliz.",
          "Nûh usta ellerini put yapmak için değil, faydalı ve güzel işler için kullandı.",
          "Çocukken “Bunları kim yarattı?” diye sordu ve hep bir olan Allah'a bağlı kaldı.",
        ],
      },
      {
        id: "2",
        title: "Kömürün İçindeki Elmas",
        ozet: "Nûh insanları tek olan Allah'a çağırır; gülüşlere rağmen sözünü nazikçe söylemeyi sürdürür.",
        badgeName: "Yumuşak Cesaret Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-2/kapak.jpg",
          alt: "Akşam ışığında vadiye inen bir yol ve yolun kenarındaki küçük bir evin aydınlık penceresi.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar geçti ve Hz. Nûh (a.s.) olgun, sözü dinlenen bir usta oldu. Bir akşam vadideki evine döndüğünde yüzünde bambaşka bir aydınlık vardı. Babasının yanına oturdu ve ona çok önemli bir haber verdi.", dropCap: true },
          { type: "text", text: "— Babacığım, Allah beni peygamber olarak görevlendirdi ve insanları yeniden O'na çağırmamı istedi, dedi. Ama seni burada yalnız bırakmaktan çekiniyorum." },
          { type: "text", text: "Lâmek'in gözleri yaşlarla doldu, ama oğluna cevap verirken sesi hiç titremedi." },
          { type: "text", text: "— Herkes yolunu kaybetmişken beni düşünme oğlum, dedi. Sen onlara doğru yolu göstermek için seçildin ve bu görev beklemez." },
          { type: "text", text: "Hz. Nûh o gece işe nasıl başlayacağını uzun uzun düşündü. Önce insanlarla tek tek ve sessizce, onları utandırmadan konuşacaktı. Sonra sesini yükseltecek ve çağrısını herkesin duyacağı biçimde yapacaktı." },
          { type: "text", text: "Ertesi sabah şehre giden yolun kenarına kamıştan bir çardak kurdu ve altına tezgâhını yerleştirdi. Gelip geçenler burada durur, gölgede soluklanır, testiden bir yudum su içerdi. Hz. Nûh da her birine yaptığı işle birlikte güzel bir söz vermeye karar verdi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-2/yol-kenari-tezgah.jpg",
            alt: "Yol kenarında kamış örtülü basit bir çardak, altında marangoz tezgâhı ve el aletleri.",
          },
          { type: "text", text: "Akşama doğru şehirden çıkan bir yolcu, tezgâhın önünde soluk soluğa durdu. Denizin dibinde inci, kayaların arasında değerli taş aradığını anlattı. Bunları bulursa zengin olacağını ve herkesin onu seveceğini sanıyordu." },
          { type: "text", text: "Hz. Nûh onun yorgun yüzüne baktı ve yumuşak bir sesle karşılık verdi." },
          { type: "text", text: "— Sen denizlerde ve kayaların arasında değerli taş arıyorsun, dedi. Oysa sen kendin, kömürün içinde kalmış bir elmas gibisin." },
          { type: "text", text: "Yolcu şaşırdı ve bu sözle ne demek istediğini sordu." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-2/komurde-elmas.jpg",
            alt: "Kara kömür parçalarının arasında, içinden ışık saçan tek bir elmas.",
          },
          { type: "text", text: "— Seni yaratan, bir olan Allah'tır, dedi Hz. Nûh. Putlara eğilerek kendini küçültme, çünkü sen çok değerlisin. Ben O'nun elçisiyim ve seni de, herkesi de yalnızca O'na çağırıyorum." },
          { type: "text", text: "Yolcu bir an ne diyeceğini bilemeden sustu, sonra birden yüksek sesle kahkahayı bastı." },
          { type: "text", text: "Sesini duyan birkaç kişi daha yoldan ayrılıp tezgâhın önünde toplandı. Önce merakla dinlediler, sonra birbirlerine bakıp gülmeye başladılar. Hepsi gülüyor ve parmaklarıyla Hz. Nûh'u birbirine gösteriyordu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "— Bir marangoz peygamber mi olurmuş? dedi içlerinden biri. Sen aklını kaçırmışsın!" },
          { type: "text", text: "Ötekiler de aynı sözü tekrarladı ve ona “mecnun”, yani deli dediler. Kahkahaları öyle yüksekti ki yolun öbür ucundan bile rahatça duyuluyordu." },
          {
            type: "interactive_word",
            before: "Hz. Nûh onların bu sözlerine kızmadı, çünkü bu insanları yabancı görmüyordu; hepsi aynı ",
            word: "kavim",
            meaning: "Aynı soydan gelen ve bir arada yaşayan insan topluluğudur.",
            after: " içinde doğup büyümüştü. Aynı derelerden su içmiş, aynı topraktan çıkan ekmeği yemişlerdi. Bu yüzden sesini hiç yükseltmeden onlara yine “Ey kavmim” diye seslendi.",
          },
          { type: "text", text: "— Ey kavmim, bende hiçbir sapkınlık yok, dedi. Ben âlemlerin Rabbinin elçisiyim. Size O'nun bildirdiklerini anlatıyor ve yalnızca iyiliğinizi istiyorum." },
          { type: "text", text: "Ama kalabalık dinlemek istemedi ve gülüşmeler yerini öfkeye bıraktı. Biri onu itti, öteki omzuna vurdu ve Hz. Nûh dengesini kaybedip yere düştü. Tezgâhındaki aletler ve tahta parçaları tozlu yolun dört bir yanına saçıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-2/sacilan-aletler.jpg",
            alt: "Toprak yola saçılmış marangoz aletleri ve yan devrilmiş bir su testisi.",
          },
          { type: "text", text: "Hz. Nûh yavaşça doğruldu, üstündeki tozu silkeledi ve aletlerini tek tek topladı. Ne bağırdı ne de onlara aynı biçimde karşılık verdi. Kalabalık dağılırken arkalarından baktı ve onların doğru yolu bulması için dua etti." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-2/bos-yol.jpg",
            alt: "Alacakaranlıkta bomboş kalan yol, çardak ve yeniden düzenlenmiş tezgâh.",
          },
          { type: "text", text: "O gece olanları babasına anlattı ve Lâmek oğlunun elini sıkıca tuttu." },
          { type: "text", text: "— Bu yol kolay olmayacak oğlum, dedi. Ama ne olursa olsun, doğru olanı yumuşak bir dille söylemekten asla vazgeçme." },
          { type: "text", text: "Ertesi sabah Hz. Nûh tezgâhını yeniden kurdu ve ilk gelen yolcuya yine gülümseyerek selam verdi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-2/yeni-sabah.jpg",
            alt: "Sabah güneşinde yol kenarındaki tezgâhın başında, arkası dönük ve yüzü görünmeyen bir figür.",
          },
        ],
        has_question: true,
        question: {
          title: "Kömürün İçindeki Elmas",
          prompt: "Sınıfta doğru olduğunu bildiğin bir şeyi söylüyorsun ve birkaç arkadaşın gülmeye başlıyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Sakin kalır, düşüncemi nazik bir dille yeniden anlatırdım.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da gülüşlere rağmen kızmadı, sözünü yumuşak bir dille yeniden söyledi.",
            },
            {
              id: "b",
              text: "Utanır, bir daha sınıfta hiç konuşmazdım.",
              comparison: "Gülüşler insanı gerçekten utandırabilir. Hz. Nûh ise susmadı; ertesi sabah tezgâhını yeniden kurdu.",
            },
            {
              id: "c",
              text: "Ben de onlarla dalga geçerek karşılık verirdim.",
              comparison: "Gülüşlere karşılık vermek istemek çok doğal. Hz. Nûh ise kimseyle dalga geçmedi, gidenler için dua etti.",
            },
          ],
        },
        learned: [
          "Doğruyu söylemek için bağırmak gerekmez; yumuşak bir söz de cesaret ister.",
          "Hz. Nûh bir yolcuya, onun kömürün içindeki bir elmas kadar değerli olduğunu hatırlattı.",
          "İnsanlar ona gülüp onu itti; o ise ertesi gün yine selam vererek işine başladı.",
        ],
      },
      {
        id: "3",
        title: "Kapısı Herkese Açık",
        ozet: "İleri gelenler “yoksulları kov” der; Nûh ücret istemez ve inananların hiçbirini geri çevirmez.",
        badgeName: "Açık Kapı Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-3/kapak.jpg",
          alt: "Öğle ışığında geniş, tozlu bir şehir meydanı, ortasında gölgeli büyük bir ağaç ve çevresinde kerpiç evler.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hz. Nûh (a.s.) yalnız yolculara değil, şehrin ileri gelenlerine de gitti. Onlar büyük evlerde oturan, sözü dinlenen ve çok zengin insanlardı. Evlerine yaptığı oymalı kapılar yüzünden hepsi onu tanır ve ustalığını çok beğenirdi.", dropCap: true },
          { type: "text", text: "Hz. Nûh onların işlerini özenle bitirdi, ama asıl söylemek istediğini de söylemeden çıkmadı." },
          { type: "text", text: "— Allah'a kulluk edin, O'ndan başka ilahınız yok, dedi. Ben size gönderilmiş, güvenilir bir elçiyim." },
          { type: "text", text: "Ev sahipleri kibarca gülümsedi, ama hiçbiri onun sözünü ciddiye almadı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-3/zengin-avlu.jpg",
            alt: "Yüksek duvarlı bir avlu, süslü yastıklar, bakır kaplar ve oymalı büyük bir kapı.",
          },
          { type: "text", text: "Ertesi gün Hz. Nûh, şehrin ortasındaki en büyük ve en kalabalık meydana gitti. Orada evi olmayan, ekmeğini zor kazanan ve kimsenin dönüp bakmadığı insanlar vardı. Hz. Nûh onların arasına, yere serili eski bir hasıra oturdu ve aynı sözleri onlara da söyledi." },
          { type: "text", text: "— Bunun için sizden hiçbir karşılık istemiyorum, dedi. Benim karşılığımı yalnız âlemlerin Rabbi verir." },
          { type: "text", text: "Yoksullardan birkaçı önce çekindi, sonra yavaş yavaş ona doğru yaklaştı. Bu söz onlara çok iyi gelmişti, çünkü ilk kez biri onlardan hiçbir şey istemiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-3/meydan-golgesi.jpg",
            alt: "Meydandaki büyük ağacın gölgesinde halka hâlinde dizilmiş taşlar, yere serilmiş eski bir hasır ve bir ekmek sepeti.",
          },
          { type: "text", text: "O günden sonra yoksullardan bazıları her gün Hz. Nûh'u dinlemeye geldi. Bir olan Allah'a inandılar ve onun çevresinde küçük ama sıcak bir topluluk oldular. Bunu uzaktan gören ileri gelenler ise hiç hoşnut olmadı." },
          {
            type: "interactive_word",
            before: "İleri gelenler kendilerini herkesten üstün sanıyor, yoksulları adam yerine koymuyordu. İçlerindeki ",
            word: "kibir",
            meaning: "Kendini başkalarından üstün görüp onları küçümsemektir.",
            after: ", onlarla aynı gölgede oturmalarına bile izin vermiyordu. Bir gün hep birlikte meydana gelip Hz. Nûh'un karşısına dikildiler.",
          },
          { type: "text", text: "— Sen de bizim gibi bir insansın, dediler. Sana uyanlara bir bak, hepsi en düşkünlerimiz." },
          { type: "text", text: "İçlerinden biri bir adım öne çıktı ve yoksulları eliyle gösterdi." },
          { type: "text", text: "— Onları yanından kov, dedi. Belki o zaman biz de seni dinlemeye razı oluruz." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Nûh onların yüzüne sakin sakin baktı ve sesini hiç yükseltmeden konuştu." },
          { type: "text", text: "— Ey kavmim, ben inananları kovamam, dedi. Onlar da bir gün Rablerine kavuşacak olan insanlar. Onları kovarsam, Allah'a karşı beni kim savunur?" },
          { type: "text", text: "— Size “Allah'ın hazineleri bende” demiyorum, diye devam etti. Gizli olanı bilmem, melek olduğumu da söylemiyorum. Sizin hor gördüğünüz bu insanların kalbinde ne olduğunu en iyi Allah bilir." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-3/uzaklasan-izler.jpg",
            alt: "Tozlu meydanda büyük evlere doğru uzaklaşan ayak izleri ve ağacın altında yerinde duran taşlar.",
          },
          { type: "text", text: "İleri gelenler öfkeyle döndü ve meydandan hızlı adımlarla uzaklaştı. Giderken yoksullara yine tepeden baktılar ve arkalarından söylenmeye devam ettiler. Ama Hz. Nûh'un yanındakiler bu kez başlarını öne eğmedi, çünkü artık ne kadar değerli olduklarını biliyorlardı." },
          { type: "text", text: "Artık Hz. Nûh'un kapısı herkese ve her saatte açık kaldı. Zengin de yoksul da, yorgun da yalnız da onun yanına çekinmeden gelebilirdi. Onun yanında hiç kimse kapının önünde bekletilmedi, hiç kimseye “Sen git” denmedi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-3/acik-kapi.jpg",
            alt: "Akşam karanlığında ardına kadar açık duran sade ahşap bir kapı ve içeriden yola taşan sıcak ışık.",
          },
          { type: "text", text: "İleri gelenler ise o günden sonra da baskı yapmayı hiç bırakmadı. Onu dinleyenleri korkuttular, onlarla dalga geçtiler ve onları zor durumda bıraktılar. Hz. Nûh ise her gelene aynı sıcaklıkla yer açtı ve kimseyi geri çevirmedi." },
          { type: "text", text: "Onun gözünde bir insanın değeri, kesesindeki altınla ya da giydiği elbiseyle ölçülmezdi. Kalbinde Allah'a inanan herkes, onun yanında baş köşeye otururdu. Meydandaki o eski hasır, şehrin en süslü sofrasından daha kıymetli olmuştu." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-3/bas-kose.jpg",
            alt: "Kandil ışığında yere serilmiş uzun bir sofra, çevresinde aynı tür sade minderler ve paylaşılmış ekmek.",
          },
        ],
        has_question: true,
        question: {
          title: "Kapısı Herkese Açık",
          prompt: "Grubundaki arkadaşların, sınıfa yeni gelen sessiz bir çocuğu oyuna almak istemiyor. “Onu alırsan biz oynamayız” diyorlar. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Grubumu kaybetmemek için yeni çocuğu oyuna almazdım.",
              comparison: "Arkadaş grubunu kaybetmekten korkmak çok anlaşılır. Hz. Nûh ise ileri gelenler gitse bile inananları yanından kovmadı.",
            },
            {
              id: "b",
              text: "Yeni çocukla gizlice oynar, arkadaşlarıma hiç söylemezdim.",
              comparison: "Yeni çocukla oynaman ona iyi gelir. Hz. Nûh ise inananlara gizlice değil, herkesin önünde açıkça sahip çıktı.",
            },
            {
              id: "c",
              text: "Yeni çocuğun da bizim kadar değerli olduğunu söyler, onu oyuna çağırırdım.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da ileri gelenlerin isteğine uymadı ve inananların hiçbirini geri çevirmedi.",
            },
          ],
        },
        learned: [
          "Bir insanın değeri zenginliğiyle ya da başkalarının onu nasıl gördüğüyle ölçülmez.",
          "Hz. Nûh insanları Allah'a çağırdı ve bunun için hiç kimseden karşılık istemedi.",
          "İleri gelenler “yoksulları kov” dedi; Hz. Nûh inananların hiçbirini yanından uzaklaştırmadı.",
        ],
        gorev: {
          id: "nuh-3-yalniza-yer-ac",
          ad: "Yalnız Kalana Yer Aç",
          kategori: "iyilik",
          aciklama: "Bu hafta okulda ya da parkta yalnız kalan birini fark et. Onu oyununa ya da sohbetine davet et.",
          sure: "Hafta içinde bir kez, yaklaşık 15 dakika",
          olcut: "Yalnız kalan birini en az bir kez oyununa ya da sohbetine çağırdıysan görevi tamamladın.",
          guvenlikNotu: "Bu görevi okul arkadaşlarınla ya da tanıdığın çocuklarla yap; tanımadığın yetişkinlere yaklaşma.",
        },
      },
      {
        id: "4",
        title: "Gece Gündüz, Yıllarca",
        ozet: "Yıllar, nesiller geçer; Nûh gizli ve açık, gece ve gündüz çağırmaktan vazgeçmez.",
        badgeName: "Asırlık Sabır Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-4/kapak.jpg",
          alt: "Bir yanı yıldızlı gece, öbür yanı şafak olan gökyüzünün altında yalnız bir tepe ve tepeye çıkan patika.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar geçti, sonra yüzyıllar birbirini kovaladı ve vadideki ağaçlar defalarca yaprak döküp yeniden yeşerdi. Hz. Nûh (a.s.) yaşlandıkça çağrısı da uzadı, ama hiçbir zaman sona ermedi. Kur'an'da bildirildiğine göre o, kavminin arasında tam dokuz yüz elli yıl kaldı.", dropCap: true },
          { type: "text", text: "Bazen şehrin meydanlarında konuştu, bazen dağlara ve çöllere yürüyüp oradaki obalara gitti. Evinin yakınındaki bir tepeye çıkıp aşağıdaki yoldan geçen herkese seslendi. Kimseyi atlamadı ve çağırmadan geçen tek bir günü bile olmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-4/tepedeki-yol.jpg",
            alt: "Uzak planda, tepenin üstünde arkası dönük duran ve aşağıdaki yola bakan küçük bir figür; yüzü görünmüyor.",
          },
          {
            type: "interactive_word",
            before: "Babalar onu dinlemedi, sonra onların çocukları da dinlemedi. Her yeni ",
            word: "nesil",
            meaning: "Aşağı yukarı aynı yıllarda doğup büyüyen insanların hepsidir.",
            after: ", büyüklerinden ne gördüyse onu yaptı ve aynı sözleri tekrarladı. Onu duymamak için parmaklarıyla kulaklarını tıkadılar, görmemek için elbiselerine büründüler.",
          },
          { type: "text", text: "Arada birkaç kişi ona inandı, ama ileri gelenler onları hemen korkuttu. Kimi bu baskıya dayanamadı ve sessizce eski yoluna geri döndü. Hz. Nûh her gidenin ardından uzun uzun baktı ve içinde derin bir hüzün duydu." },
          { type: "text", text: "Bu uzun yıllar boyunca Hz. Nûh evlendi ve Allah ona oğullar verdi. Oğulları büyüdükçe çoğu babasının yolunu sevdi ve onun yanında durdu. Yalnız biri, babasının çağrısına bir türlü kulak vermedi ve başka yollara saptı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-4/ocak-basi.jpg",
            alt: "Akşam ışığında bir evin ocak başı; yanan ateş, yere dizilmiş farklı boylarda sandaletler ve tahta oyuncaklar.",
          },
          { type: "text", text: "Bir gece herkes uyurken Hz. Nûh Rabbine yöneldi ve içini döktü." },
          { type: "text", text: "— Rabbim, ben kavmimi gece gündüz çağırdım, dedi. Gizli de söyledim, açıkça da söyledim. Ama ben çağırdıkça benden daha çok kaçtılar." },
          { type: "text", text: "Sabah olunca evinin yakınındaki tepe yine her zamanki gibi onu bekliyordu. Aşağıdaki yol yine kalabalıktı, ama duran ve dinleyen yine yok gibiydi. Hz. Nûh kapının önünde durdu, yola baktı ve bir an düşündü." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Nûh o sabah da her zamanki gibi tepeye çıktı. Çok yorgundu, ama sesi o ilk günkü yumuşaklığından hiçbir şey kaybetmemişti. Yoldan geçenlere bu kez onları sevindirecek bir müjdeyle seslendi." },
          { type: "text", text: "— Rabbinizden bağışlanma dileyin, çünkü O çok bağışlayıcıdır, dedi. Size gökten bol yağmur indirir, mallarınızı ve çocuklarınızı çoğaltır. Size meyve dolu bahçeler verir ve önünüzde ırmaklar akıtır." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-4/yagmurlu-bahce.jpg",
            alt: "Hafif bir yağmurun altında meyve dolu bir bahçe ve aralarından akan berrak bir ırmak.",
          },
          { type: "text", text: "— Bir de başınızı kaldırıp göğe bakın, dedi. Allah ayı bir nur, güneşi de bir kandil yaptı. Yeryüzünü ise üzerinde rahatça yürüyesiniz diye bir döşek gibi serdi." },
          { type: "text", text: "Bazıları durup bir an göğe baktı, ama çoğu omuz silkip yoluna devam etti. Ona yine “mecnun” dediler ve onu susturmak için ellerinden geleni yaptılar. Hz. Nûh ise sözünü hiç sertleştirmedi ve ertesi gün yine aynı yere çıktı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-4/ay-ve-gunes.jpg",
            alt: "Alacakaranlıkta bir yanda batan güneş, öbür yanda yükselen ay ve aradaki geniş, yumuşak ova.",
          },
          { type: "text", text: "Bir gün ellerini göğe açtı ve kimseden değil, yalnız Allah'tan yardım istedi." },
          { type: "text", text: "— Rabbim, ben yenik düştüm, dedi. Bana sen yardım et." },
          { type: "text", text: "O, bunca yıl insanlardan hiçbir karşılık beklememiş, bütün umudunu yalnızca Rabbine bağlamıştı." },
          { type: "text", text: "İslam inancına ve tarihî rivayetlere göre Allah, o günlerde ona bir fidan dikmesini bildirdi. Hz. Nûh fidanı evinin yakınındaki geniş düzlüğe dikti ve her gün suladı. Fidan her yıl biraz daha kalınlaştı, Hz. Nûh da hiç acele etmeden onun büyümesini bekledi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-4/buyuyen-fidan.jpg",
            alt: "Bir düzlükte toprağı yeni sulanmış genç bir ağaç ve yanında duran toprak bir su testisi.",
          },
        ],
        has_question: true,
        question: {
          title: "Gece Gündüz, Yıllarca",
          prompt: "Uzun süredir her gün küçük bir iyilik yapıyorsun; örneğin sınıftaki çiçekleri suluyorsun. Ama kimse fark etmiyor, teşekkür eden de yok. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Kimse görmese de sürdürürdüm, çünkü yaptığım iş zaten değerli.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da yüzlerce yıl, çoğu insan dinlemese bile çağırmayı sürdürdü.",
            },
            {
              id: "b",
              text: "Fark edilmediği için bırakır, başka bir şeye geçerdim.",
              comparison: "Fark edilmemek insanın hevesini kırabilir. Hz. Nûh ise sonuç görmese de her sabah tepeye yeniden çıktı.",
            },
            {
              id: "c",
              text: "Herkese ne kadar uzun süredir yaptığımı anlatıp teşekkür beklerdim.",
              comparison: "Teşekkür duymak güzeldir. Hz. Nûh ise karşılığı insanlardan değil, yalnız Allah'tan bekledi.",
            },
          ],
        },
        learned: [
          "Bazı güzel işlerin sonucu hemen görünmez; sabır, sonucu beklerken iyiliği sürdürmektir.",
          "Hz. Nûh kavmini gece gündüz, gizli ve açık, yüzlerce yıl boyunca Allah'a çağırdı.",
          "İnsanlara göğe, aya ve güneşe bakıp onları yaratanı düşünmelerini söyledi.",
        ],
        gorev: {
          id: "nuh-4-her-gun-bir-kez",
          ad: "Her Gün Bir Kez",
          kategori: "sorumluluk",
          aciklama: "Evde küçük bir görev seç: sofrayı kurmak, bir bitkiyi sulamak ya da ayakkabıları dizmek gibi. Bir hafta boyunca bu görevi kimse hatırlatmadan her gün yap.",
          sure: "7 gün, günde 5–10 dakika",
          olcut: "Seçtiğin görevi 7 gün boyunca, kimse hatırlatmadan yaptıysan görevi tamamladın.",
          guvenlikNotu: "Ocak, bıçak ya da elektrikli alet gerektiren bir görev seçme.",
        },
      },
      {
        id: "5",
        title: "Karada Yapılan Gemi",
        ozet: "Kuru bir tepede gemi yapılır; gelip geçenler güler, Nûh ve ailesi çalışmayı sürdürür.",
        badgeName: "Vaktinde Hazırlık Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-5/kapak.jpg",
          alt: "Uçsuz bucaksız kuru bir düzlüğün ortasında tek başına yükselen, gövdesi kalın büyük bir ağaç.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar önce dikilen fidan, düzlüğün ortasında gövdesi kalın, kocaman bir ağaç olmuştu. Bir gün Allah, Hz. Nûh'a (a.s.) çok önemli bir haber bildirdi. Kavminden şimdiye kadar inanmış olanlardan başka, artık hiç kimse inanmayacaktı.", dropCap: true },
          { type: "text", text: "Allah ona, onların yaptıklarına üzülmemesini de bildirdi. Sonra kendi gözetimi altında ve bildirdiği biçimde büyük bir gemi yapmasını istedi. Hz. Nûh bu haberi duyunca derin bir hüzne kapıldı, çünkü bunca yıl sonra bile insanlara üzülüyordu." },
          { type: "text", text: "Ama hükmün yalnız Allah'a ait olduğunu biliyordu, gözyaşlarını silip oğullarını yanına çağırdı. İslam inancına ve tarihî rivayetlere göre bu oğulların adları Sâm, Hâm ve Yâfes'ti. Üçü de babalarının sesini duyar duymaz hemen koşup geldi." },
          { type: "text", text: "Birlikte baltalarını aldılar ve yıllardır büyüyen ağacın yanına gittiler. Ağaç büyük bir gürültüyle yere indiğinde gövdesinden kalın ve sağlam tahtalar biçtiler. Hz. Nûh tahtalara bakarken, çocukken arkta yüzdürdüğü küçük tekneyi hatırladı ve gülümsedi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-5/tahta-yigini.jpg",
            alt: "Kesilmiş büyük bir ağaç kütüğü ve yanında düzgünce istiflenmiş kalın tahtalar.",
          },
          { type: "text", text: "Gemi, Kur'an'da bildirildiği gibi tahtalardan ve çivilerden yapılıyordu. Hz. Nûh her tahtayı Allah'ın bildirdiği gibi ölçtü ve büyük bir özenle yerine oturttu. Ailesi de onun yanında gece gündüz demeden çalıştı ve hiç yakınmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-5/gemi-iskeleti.jpg",
            alt: "Kuru bir düzlükte, kaburgaları görünen ve tahtaları yarı yarıya çakılmış büyük bir gemi gövdesi.",
          },
          {
            type: "interactive_word",
            before: "Gemi denizden çok uzakta, kupkuru bir düzlüğün ortasında her gün biraz daha yükseliyordu. Yoldan geçenler durup ona şaşkınlıkla baktı, sonra kahkahalarla gülmeye başladılar. O günden sonra gelip geçenler her gün onunla ",
            word: "alay",
            meaning: "Birini küçük düşürmek için onunla eğlenmektir.",
            after: " etmeye başladı.",
          },
          { type: "text", text: "— Eskiden marangozdun, şimdi de gemici mi oldun? dedi biri." },
          { type: "text", text: "— Karada yüzen bir gemi hiç görülmüş müdür? dedi bir başkası." },
          { type: "text", text: "Kahkahalar her gün biraz daha çoğaldı ve düzlüğün her yanından duyulur oldu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Nûh elindeki çekici yere bıraktı ve onlara döndü; sesinde ne öfke vardı ne de korku." },
          { type: "text", text: "— Bugün siz bize gülüyorsunuz, dedi. Ama yakında kime neyin geleceğini hep birlikte öğreneceksiniz." },
          { type: "text", text: "Sonra hiçbir şey olmamış gibi yeniden işinin başına döndü. Gülenler bir süre bekledi, ama o bir daha başını kaldırıp onlara bakmadı. Çekicin düzenli sesi akşama kadar bütün düzlükte yankılandı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-5/cekic-ve-civiler.jpg",
            alt: "Bir tahta üzerine bırakılmış ahşap tokmak ve yanında dizili demir çiviler.",
          },
          { type: "text", text: "Hz. Nûh neyin, ne zaman geleceğini tam olarak bilmiyordu. Ama hazırlığın, tehlike gelmeden yapılması gerektiğini çok iyi biliyordu. Bu yüzden ne telaşla acele etti ne de bir günü boşa geçirdi; buna tedbir denirdi." },
          { type: "text", text: "Aileden herkes elinden gelen işi üstlendi ve kimse boş durmadı. Biri tahta taşıdı, biri çivi çaktı, biri de çalışanlara su ve yiyecek getirdi. Akşamları yorgun düştüklerinde hep birlikte oturup Rablerine dua ettiler." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-5/ailecek-is.jpg",
            alt: "Geminin gölgesinde bir su testisi, ekmek sepeti, çivi kutusu ve yan yana bırakılmış aletler.",
          },
          { type: "text", text: "Sonunda bir gün gemi tamamlandı ve son çivi de yerine çakıldı. Kocaman gövdesiyle kuru düzlüğün ortasında, yaşlı bir dağ gibi duruyordu. Gülenler hâlâ gülüyordu, ama Hz. Nûh'un içi rahattı; Allah'ın istediğini yapmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-5/tamamlanan-gemi.jpg",
            alt: "Akşam ışığında, denizden çok uzak kuru bir düzlüğün ortasında duran büyük, tamamlanmış ahşap gemi.",
          },
          { type: "text", text: "O akşam Hz. Nûh gemiye son kez dışarıdan baktı. Gökyüzü açıktı ve hava hâlâ kupkuruydu, ortada hiçbir yağmur işareti görünmüyordu. Yine de o biliyordu: hazırlık bitmişti, gerisi yalnızca Allah'ın takdirindeydi." },
        ],
        has_question: true,
        question: {
          title: "Karada Yapılan Gemi",
          prompt: "Okulda yapılacak bir gösteri için haftalar öncesinden hazırlanmaya başladın. Arkadaşların “Daha çok var, boşuna uğraşıyorsun” diye seninle dalga geçiyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Gülmesinler diye hazırlığı bırakır, son güne kadar beklerdim.",
              comparison: "Gülüşlerden kaçmak istemek çok anlaşılır. Hz. Nûh ise gülenlere rağmen hazırlığı bırakmadı ve gemiyi vaktinde bitirdi.",
            },
            {
              id: "b",
              text: "Gülseler de hazırlığımı sakin sakin sürdürürdüm.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da alaylara aldırmadan, sakin sakin çalışmayı sürdürdü.",
            },
            {
              id: "c",
              text: "Ben de onların hazırlıksız olmasıyla dalga geçerdim.",
              comparison: "Alay edene alayla karşılık vermek kolay gelebilir. Hz. Nûh ise kimseyle dalga geçmedi, yalnızca işine döndü.",
            },
          ],
        },
        learned: [
          "Tehlike gelmeden hazırlanmak, sonradan telaşa düşmemenin en güzel yoludur.",
          "Hz. Nûh, Allah'ın bildirdiği gibi, yıllardır büyüyen ağaçtan tahtalar ve çivilerle bir gemi yaptı.",
          "Gelip geçenler karada yapılan gemiye güldü; Hz. Nûh ve ailesi çalışmayı sürdürdü.",
        ],
        gorev: {
          id: "nuh-5-aksamdan-hazirlik",
          ad: "Akşamdan Hazırlık",
          kategori: "sorumluluk",
          aciklama: "Üç akşam boyunca yatmadan önce ertesi günün çantasını ve kıyafetini hazırla. Sabah telaş etmeden evden çıkmayı dene.",
          sure: "3 akşam, her akşam yaklaşık 10 dakika",
          olcut: "Üç akşam üst üste ertesi günün hazırlığını yatmadan önce yaptıysan görevi tamamladın.",
        },
      },
      {
        id: "6",
        title: "Allah'ın Adıyla Binin",
        ozet: "Beklenen işaret görünür; Nûh, inananları ve hayvanları Allah'ın adını anarak gemiye bindirir.",
        badgeName: "Dalgada Güven Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-6/kapak.jpg",
          alt: "Kuru düzlükte duran ahşap gemi ve ufukta toplanan koyu yağmur bulutları.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Bir gün gökyüzü birdenbire değişti ve uzun zamandır görülmeyen kara bulutlar ufukta toplanmaya başladı. Hz. Nûh (a.s.) gemisinin yanında durdu, başını kaldırıp uzun uzun göğe baktı. Allah'ın bildirdiği o günün sonunda geldiğini o anda anladı.", dropCap: true },
          { type: "text", text: "Gece boyunca gök gürledi, şimşekler karanlığı yer yer aydınlattı. Sabah olunca yağmur başladı ve iri damlalar kupkuru toprağa düşmeye başladı. Kavmi önce buna hiç aldırmadı ve sıradan bir yağmur yağdığını sandı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-6/kara-bulutlar.jpg",
            alt: "Çatlak toprağa düşen ilk iri yağmur damlaları ve üstte koyu bulutlar.",
          },
          { type: "text", text: "Sonra Allah'ın bildirdiği işaret göründü ve yerden sular kaynamaya başladı. Gökten bardaktan boşanırcasına yağmur indi, yerin altından da sular fışkırdı. İki su birbirine karıştı ve ovalar yavaş yavaş dolmaya başladı." },
          { type: "text", text: "O sırada Hz. Nûh'a, gemiye kimleri alacağı tek tek bildirildi. Her canlı türünden birer çift, yani bir erkek ve bir dişi alınacaktı. Ailesi ve ona inananlar da gemiye binecekti, ama ona inananların sayısı çok azdı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-6/hayvan-izleri.jpg",
            alt: "Islak çamurda gemiye doğru ilerleyen, yan yana ikişer ikişer basılmış farklı hayvan izleri.",
          },
          { type: "text", text: "Hayvanlar ikişer ikişer gemiye doğru geldi: kuşlar, ceylanlar, koyunlar ve daha niceleri. Ailesi de evden aldıkları birkaç eşyayı sırtlayıp sessizce geminin kapısına yöneldi. Bu arada sular her saat biraz daha yükseliyor, ovalar göle dönüyordu." },
          { type: "text", text: "Gemi kocaman, içi ise karanlık görünüyordu ve dışarıda sular durmadan yükseliyordu. Hiçbiri daha önce bir gemiye binmemişti, çoğunun kalbi hızlı hızlı çarpıyordu. Hepsi kapının önünde durdu ve Hz. Nûh'un ne diyeceğini beklemeye başladı." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Nûh geminin kapısında durdu ve herkesi sakin bir sesle içeri çağırdı." },
          { type: "text", text: "— Binin, dedi. Bu geminin akışı da duruşu da Allah'ın adıyladır. Şüphesiz Rabbim çok bağışlayıcı, çok merhametlidir." },
          {
            type: "interactive_word",
            before: "Onlar ellerinden gelen her şeyi yapmış, gemiyi kurmuş ve hazırlıklarını bitirmişlerdi. Şimdi sonucu Allah'a bırakma zamanıydı ve buna ",
            word: "tevekkül",
            meaning: "Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır.",
            after: " denirdi. Gemidekilerin hepsi o gün bunun ne demek olduğunu yüreklerinde hissetti.",
          },
          { type: "text", text: "Birer birer, dillerinde Allah'ın adıyla rampadan yukarı çıkıp gemiye girdiler. Hayvanlar da hiç telaş etmeden, sessizce kendi yerlerine yerleşti. Kapı kapandığında dışarıdaki uğultu bile biraz uzaklaşmış gibi geldi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-6/gemi-ici.jpg",
            alt: "Geminin içinde kalın ahşap kirişler, saman serili bölmeler ve kirişlere tünemiş kuşlar.",
          },
          {
            type: "interactive_word",
            before: "Yağmur günlerce durmadı, yerden kaynayan sular da hiç kesilmedi ve su durmadan yükseldi. Her yeri sular altında bırakan bu büyük su baskınına ",
            word: "tufan",
            meaning: "Her yeri sular altında bırakan çok büyük su baskınıdır.",
            after: " denir. Sonunda su gemiyi yerinden kaldırdı ve gemi ağır ağır yüzmeye başladı.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-6/yuzen-gemi.jpg",
            alt: "Yağmur altında geniş bir suyun üstünde ağır ağır yüzen ahşap gemi.",
          },
          { type: "text", text: "Pencereden bakınca, gözün gördüğü her yerin suyla kaplanmaya başladığı görülüyordu. Gemiye binmeyenler için artık sığınacak güvenli bir yer kalmamıştı. Gemidekiler ise Allah'ın koruması altında, birbirine sokulmuş bekliyordu." },
          { type: "text", text: "İçeride küçük bir kandil yanıyor, tahta duvarlara sıcak bir ışık vuruyordu. Dışarıda dalgalar büyürken gemidekiler el ele tutuşup dua etti. Hâlâ biraz korkuyorlardı, ama hiçbiri kendini yalnız hissetmiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-6/kandil-ve-yagmur.jpg",
            alt: "Yağmur damlaları süzülen küçük bir ahşap pencerenin önünde yanan toprak kandil.",
          },
        ],
        has_question: true,
        question: {
          title: "Allah'ın Adıyla Binin",
          prompt: "Daha önce hiç yapmadığın ve biraz korktuğun bir şeye başlamak üzeresin; örneğin ilk yüzme dersine giriyorsun. Hazırlığını yaptın, öğretmenin de yanında. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Korkum tamamen geçene kadar hiç başlamazdım.",
              comparison: "Korku çok doğal bir duygudur. Gemidekiler de korktu, ama beklemek yerine Allah'ın adını anıp gemiye bindiler.",
            },
            {
              id: "b",
              text: "Öğretmenimi beklemeden, kendi bildiğim gibi suya atlardım.",
              comparison: "Heyecanla hemen atlamak isteyebilirsin. Hz. Nûh ise gemiyi Allah'ın bildirdiği gibi yaptı ve herkesi düzenle gemiye aldı.",
            },
            {
              id: "c",
              text: "Allah'ın adını anar, yaptığım hazırlığa güvenip adımımı atardım.",
              comparison: "Sen de gemidekiler gibi davrandın. Onlar da hazırlıklarını yapıp Allah'ın adıyla gemiye bindiler.",
            },
          ],
        },
        learned: [
          "Elimizden geleni yaptıktan sonra sonucu Allah'a bırakmak, içimizdeki korkuyu hafifletir.",
          "Hz. Nûh gemiye her canlı türünden birer çifti, ailesini ve ona inananları aldı.",
          "“Bu geminin akışı da duruşu da Allah'ın adıyladır” diyerek herkesi gemiye çağırdı.",
        ],
      },
      {
        id: "7",
        title: "Dağlar Gibi Dalgalar",
        ozet: "Dalgalar yükselirken Nûh oğluna son kez sevgiyle seslenir; sonra hükmü Allah'a bırakır.",
        badgeName: "Şefkatli Çağrı Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-7/kapak.jpg",
          alt: "Gri gökyüzünün altında yüksek dalgalar ve dalgaların arasında sağlamca yol alan ahşap gemi.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Gemi, dağlar gibi yükselen dalgaların arasında ağır ağır ama sağlamca yol alıyordu. Hz. Nûh (a.s.) geminin kenarına gelip uzaklara, sisli sulara baktı. Suların içinden yükselen bir tepenin üstünde çok tanıdık birini gördü.", dropCap: true },
          { type: "text", text: "Bu, babasının çağrısına yıllardır kulak vermeyen oğluydu. Hz. Nûh onu yıllar boyunca her fırsatta çağırmış, her seferinde ona sevgiyle seslenmişti. Herkesten ayrı bir yerde, tek başına ve kararlı bir hâlde duruyordu. Oğlunu suların ortasında, o ıssız tepede tek başına görünce Hz. Nûh'un yüreği derinden sızladı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-7/dalgalar.jpg",
            alt: "Geminin kenarından görülen, dağlar gibi yükselen dalgalar ve uzakta sisin içinde bir tepe.",
          },
          {
            type: "interactive_word",
            before: "Bütün sesini topladı ve dalgaların uğultusunu aşacak kadar yüksek sesle ona seslendi. Sesinde ne kızgınlık vardı ne de sitem; yalnızca bir babanın ",
            word: "şefkat",
            meaning: "Birini çok sevip ona iyilik ve koruma göstermektir.",
            after: "i vardı.",
          },
          { type: "text", text: "— Yavrucuğum, gel, sen de bizimle bin! dedi. İnkâr edenlerle birlikte kalma." },
          { type: "text", text: "Oğlu sesi duyunca başını gemiye doğru çevirdi ve bir an babasına baktı. Ama yerinden bir adım bile kımıldamadı ve kararını değiştirmedi." },
          { type: "text", text: "— Ben yüksek bir dağa çıkarım, dedi. O dağ beni sudan korur." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-7/uzak-tepe.jpg",
            alt: "Suların ortasında yalnız kalmış, çevresini sis saran ıssız bir tepe.",
          },
          { type: "text", text: "Hz. Nûh ona son bir kez daha, bütün umuduyla seslendi." },
          { type: "text", text: "— Bugün Allah'ın emrine karşı hiçbir şey kimseyi koruyamaz, dedi. Yalnız O'nun merhamet ettiği kurtulur." },
          { type: "text", text: "Oğlu yine cevap vermedi, dalgalar ise her an biraz daha yükseliyordu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Tam o sırada büyük bir dalga ikisinin arasına girdi ve oğlu gözden kayboldu. Gemiye binmeyen herkes gibi o da sularda boğulanlardan oldu. Artık gözün gördüğü her yer, uçsuz bucaksız bir sudan ibaretti." },
          { type: "text", text: "Hz. Nûh uzun süre hiç konuşmadan suya baktı, sonra ellerini açıp Rabbine yalvardı." },
          { type: "text", text: "— Rabbim, oğlum da benim ailemdendi, dedi. Senin sözün elbette haktır ve sen hüküm verenlerin en iyisisin." },
          { type: "text", text: "Allah, Hz. Nûh'a oğlunun yaptıklarının iyi olmadığını ve bilmediği bir şeyi kendisinden istememesini bildirdi. Hz. Nûh da hemen Rabbine sığındı ve O'ndan kendisini bağışlamasını diledi." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-7/kandil-penceresi.jpg",
            alt: "Geminin loş iç mekânında, pencere önündeki rafta tek başına yanan bir kandil ve dışarıda yağmurun dinişi.",
          },
          { type: "text", text: "Gemidekiler sessizce onun yanına geldi ve hiçbir şey söylemeden yanına oturdu. Kimi onun elini tuttu, kimi de sessizce onunla birlikte dua etti. Hüzünleri büyüktü, ama içlerinde sarsılmayan bir güven de vardı. Allah onları bu büyük suyun ortasında bile yalnız bırakmamıştı." },
          { type: "text", text: "Günler, sonra haftalar geçti ve gemi suların üstünde yol almayı sürdürdü. Pencereden bakınca yalnızca gri bir gök ve uçsuz bucaksız bir su görünüyordu. Herkes toprağı, yeşil yaprakları ve çiçek kokusunu çok özlemişti." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-7/sonsuz-su.jpg",
            alt: "Geminin açık kepenginden görülen, ufka kadar uzanan durgun su ve rafa bırakılmış kurumuş bir yeşil yaprak.",
          },
          { type: "text", text: "Hz. Nûh onlara sabretmeyi ve dua etmeyi her gün yeniden hatırlattı. Gemide herkes birbirine yardım etti, hayvanlara baktı ve yiyeceği idareli kullandı. Zor günlerde birbirlerine güzel sözler söyleyerek güç verdiler ve kimse kimseyi yalnız bırakmadı." },
          { type: "text", text: "Bir sabah uyandıklarında her yerin derin bir sessizliğe gömüldüğünü fark ettiler. Yağmur durmuş, bulutlar dağılmış ve gökyüzü yavaş yavaş açılmıştı. O gece, uzun zamandır ilk kez gökte yıldızlar göründü." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-7/ilk-yildizlar.jpg",
            alt: "Durgun suyun üstünde sakin duran gemi ve açılmış gökyüzünde parlayan yıldızlar.",
          },
        ],
        has_question: true,
        question: {
          title: "Dağlar Gibi Dalgalar",
          prompt: "Çok sevdiğin bir arkadaşın tehlikeli bir oyun oynuyor; örneğin arabaların geçtiği yolun kenarında top oynuyor. Onu birkaç kez çağırdın ama seni dinlemiyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Onu sevgiyle bir kez daha çağırır, sonra hemen bir yetişkine haber verirdim.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da oğlunu son ana kadar sevgiyle çağırdı, sonra Rabbine yöneldi.",
            },
            {
              id: "b",
              text: "Beni dinlemediği için ona küser, kendi hâline bırakırdım.",
              comparison: "Dinlenmemek insanı kırar. Hz. Nûh ise oğluna küsmedi; son ana kadar ona şefkatle seslendi.",
            },
            {
              id: "c",
              text: "Onu zorla çekip götürmeye çalışır, gerekirse onunla kavga ederdim.",
              comparison: "Sevdiğin birini korumak istemen çok güzel. Hz. Nûh ise kimseyi zorlamadı; çağırdı ve kararı ona bıraktı.",
            },
          ],
        },
        learned: [
          "Sevdiklerimizi sevgiyle çağırabiliriz, ama kimseyi zorla doğru yola sokamayız.",
          "Hz. Nûh oğluna “Yavrucuğum, sen de bizimle bin” diye seslendi; oğlu dağa sığınacağını söyledi.",
          "Gemidekiler uzun süre sabretti; bir sabah yağmur durdu ve gökyüzü yeniden açıldı.",
        ],
      },
      {
        id: "8",
        title: "Selamla ve Bereketle",
        ozet: "Sular çekilir, gemi Cûdî'ye oturur; Nûh şükrederek yeni bir hayatı toprağa ekmeye başlar.",
        badgeName: "Bereketli İniş Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-nuh/bolum-8/kapak.jpg",
          alt: "Gün doğumunda berrak bir gökyüzü altında, yeşilin yeniden belirdiği dağ sırtları ve çekilen sular.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Allah yere ve göğe bir emir verdi: “Ey yer, suyunu yut! Ey gök, sen de tut!” Yağmur tamamen kesildi ve sular yavaş yavaş çekilmeye başladı. Hz. Nûh (a.s.) bunu görünce sevinçle Rabbine hamd etti.", dropCap: true },
          { type: "text", text: "Gemi bir gün hafifçe sarsıldı ve Cûdî Dağı'nın üzerine yumuşakça oturdu. Dalgaların uzun süren sallantısı bitti, yerini derin bir sessizlik aldı. Gemidekiler önce ne olduğunu anlayamadı, sonra sevinçle birbirlerine sarıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-8/cudide-gemi.jpg",
            alt: "Bir dağın yeşermeye başlayan yamacına oturmuş ahşap gemi ve aşağıda çekilen sular.",
          },
          { type: "text", text: "Allah, Hz. Nûh'a güzel bir müjde verdi: gemiden selamla ve bereketle inecekti. Bu selam ve bereket hem ona hem de onunla birlikte gemide olanlara aitti. Onların soyundan gelecek inananlar da bu bereketten pay alacaktı." },
          { type: "text", text: "Hz. Nûh gemiden çıkmadan önce ellerini açtı ve Rabbine yöneldi." },
          { type: "text", text: "— Bizi zalimlerden kurtaran Allah'a hamd olsun, dedi. Rabbim, bizi bereketli bir yere indir, sen konuk edenlerin en hayırlısısın." },
          {
            type: "interactive_word",
            before: "Gemiden indiklerinde, ayaklarını toprağa basar basmaz ilk işleri ",
            word: "şükür",
            meaning: "Allah'ın verdiği nimetler için teşekkür etmek ve bunu davranışla göstermektir.",
            after: " oldu. Hep birlikte dua ettiler ve kendilerini kurtaran Rablerine içtenlikle teşekkür ettiler. Kur'an da Hz. Nûh'u çok şükreden bir kul olarak anar.",
          },
          { type: "text", text: "Sonra Hz. Nûh, uzun süredir gemide bekleyen hayvanları tek tek dışarı çıkardı. Her birini sevdi, kulaklarına güzel sözler fısıldadı ve onları serbest bıraktı. Kuşlar göğe havalandı, ceylanlar sevinçle sıçrayarak yamaçlara dağıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-8/dagilan-hayvanlar.jpg",
            alt: "Uzak planda, gemi rampasının yanında arkası dönük duran bir figür ve yamaçlara dağılan ceylanlar, koyunlar ve göğe uçan kuşlar.",
          },
          { type: "text", text: "Akşam olunca herkes, gemiden indikleri ıssız dağın eteğine endişeyle baktı. Ne ev vardı ne tarla, tanıdık hiçbir şey kalmamıştı." },
          { type: "text", text: "— Burada çok yabancıyız, dedi içlerinden biri. Şimdi ne yapacağız?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Nûh onların korkusunu anladı ve yumuşak bir sesle konuştu." },
          { type: "text", text: "— Hz. Âdem ile Hz. Havva'yı düşünün, dedi. Yeryüzüne ilk indiklerinde yanlarında kimse yoktu. Biz ise birlikteyiz ve Rabbimiz bizi hiç yalnız bırakmadı." },
          { type: "text", text: "— Yeryüzü, Allah'ın bize verdiği nimetlerle dolu, diye devam etti. Haydi, yarın sabah hep birlikte işe başlayalım." },
          { type: "text", text: "Bu sözler herkesin içine bir umut serpti ve o gece hepsi huzurla uyudu." },
          { type: "text", text: "Ertesi sabah herkes güneşle birlikte erkenden kalktı ve hiç vakit kaybetmeden işe koyuldu. Kimi ev duvarı ördü, kimi toprağı kazdı, kimi de yamaçlara fidan dikti. Hz. Nûh her ailenin başını sokacak bir evi olması için gece gündüz çalıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-8/yeni-koy.jpg",
            alt: "Dağ eteğinde yeni örülmekte olan taş duvarlı küçük evler, kazılmış toprak ve sıra sıra dikilmiş fidanlar.",
          },
          { type: "text", text: "Hz. Nûh da yamacın en güzel yerine kendi eliyle bir fidan dikti. Yıllar önce diktiği fidan büyümüş, Allah'ın izniyle onları taşıyan bir gemi olmuştu. Şimdi bu yeni fidan, yeryüzündeki yeni bir hayatın başlangıcıydı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-8/yeni-fidan.jpg",
            alt: "Dağ yamacında yeni dikilmiş tek bir fidan, toprağı nemli; arkada açılan gökyüzü ve uzakta duran gemi.",
          },
          { type: "text", text: "Gemi ise uzun yıllar boyunca dağın üzerinde öylece kaldı. Allah onu ve yaşananları, sonra gelecek bütün insanlar için bir ibret olarak bıraktı. Bu hikâyeyi dinleyenler; sabrı, güveni ve teşekkür etmeyi hep hatırlayacaktı." },
          {
            type: "image",
            src: "/kitaplar/hz-nuh/bolum-8/dagdaki-gemi.jpg",
            alt: "Akşam ışığında dağın üstünde sessizce duran ahşap gemi ve aşağıda yeni kurulan köyün ilk ocak dumanları.",
          },
          { type: "text", text: "Bir akşam Hz. Nûh, ailesini yeni evinin önünde topladı ve onlara şöyle öğüt verdi:" },
          { type: "text", text: "— Yeryüzünde yaptığınız her iyi iş Allah'a kulluktur, dedi. Çalışmak, yardımlaşmak, doğru söylemek ve büyüklere saygı göstermek de buna dahildir." },
          { type: "text", text: "Yeni köyün evlerinin, bahçelerinin ve fidanlarının üzerinde akşam güneşi tatlı tatlı batıyordu." },
        ],
        has_question: true,
        question: {
          title: "Selamla ve Bereketle",
          prompt: "Uzun ve zor bir dönemden sonra yeniden başlıyorsun; örneğin yeni bir şehre taşındınız ve her şey çok yabancı. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Eski günleri düşünüp üzülür, hiçbir şeye başlamak istemezdim.",
              comparison: "Eski günleri özlemek çok doğal. Gemidekiler de yabancılık çekti, ama üzülüp beklemek yerine işe koyuldular.",
            },
            {
              id: "b",
              text: "Elimdekiler için şükreder, küçük bir işten başlayarak yeniden kurardım.",
              comparison: "Sen de Hz. Nûh gibi davrandın. O da önce şükretti, sonra bir fidan dikip yeniden başladı.",
            },
            {
              id: "c",
              text: "Her şey kendiliğinden eskisi gibi olana kadar beklerdim.",
              comparison: "Beklemek bazen gerekir. Hz. Nûh ise yeni hayatın kendiliğinden kurulmasını beklemedi; ertesi sabah işe başladı.",
            },
          ],
        },
        learned: [
          "Zor bir dönemden sonra şükrederek ve küçük adımlarla yeniden başlamak mümkündür.",
          "Sular çekilince gemi Cûdî Dağı'na oturdu; Hz. Nûh gemiden selamla ve bereketle indi.",
          "Hayvanları tek tek serbest bıraktı, sonra ailesiyle birlikte evler kurdu ve fidanlar dikti.",
        ],
        gorev: {
          id: "nuh-8-sukur-sofrasi",
          ad: "Şükür Sofrası",
          kategori: "duygu / aile",
          aciklama: "Bir akşam yemeğinde ailene küçük bir öneride bulun: Herkes o gün şükrettiği bir şeyi söylesin. Sen de kendi şükrünü paylaş.",
          sure: "Bir akşam, yaklaşık 10 dakika",
          olcut: "Bir akşam aile sofrasında herkesin şükrünü dinleyip kendi şükrünü de söylediysen görevi tamamladın.",
        },
      },
    ],
  },
  {
    id: "hz-eyyub",
    routePrefix: "eyyub",
    title: "Hz. Eyyûb",
    eyebrow: "Hz. Eyyûb — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Bereketli Günler",
        ozet: "Hz. Eyyûb'un kapısı herkese açıktır; her nimeti şükürle paylaşır ve insanları Allah'a çağırır.",
        badgeName: "Paylaşılan Nimet Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-eyyub/bolum-1/kapak.jpg",
          alt: "Sabah ışığında yamaçlarında bağlar ve buğday tarlaları uzanan yeşil bir vadi ve ortasında taş evlerden küçük bir köy.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Çok eski zamanlarda, yeşil tepelerin ve verimli ovaların arasında Hz. Eyyûb (a.s.) adında bir adam yaşardı. İslam inancına ve tarihî rivayetlere göre onun yurdu Şam taraflarındaydı. Bu topraklarda sular bol akar, bağlar ve tarlalar yaz kış yemyeşil kalırdı.", dropCap: true },
          { type: "text", text: "Hz. Eyyûb'un koyun ve deve sürüleri ovalarda otlar, tarlalarında buğday başakları rüzgârla dalgalanırdı. Bağlarında iri üzüm salkımları sarkar, ceviz ağaçlarının dalları meyveden yere eğilirdi. Evi de her zaman kalabalıktı; eşi, oğulları ve kızlarıyla birlikte geniş ve neşeli bir aileydiler." },
          { type: "text", text: "Hz. Eyyûb bütün bu bolluğa bakıp hiçbir zaman “Bunlar benim” demezdi. Ona göre her biri, Allah'ın kendisine verdiği bir nimetti. Sabah tarlaya çıkarken de akşam eve dönerken de bu nimetler için Rabbine şükrederdi. Zengin olduğu hâlde sade yaşar, kendi tarlasında da herkesle birlikte çalışırdı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-1/bugday-tarlasi.jpg",
            alt: "Öğleden sonra ışığında uçsuz bucaksız bir buğday tarlası ve tarlanın içinde, uzakta, arkası dönük yürüyen küçük bir figür.",
          },
          { type: "text", text: "Bir gün Allah, Hz. Eyyûb'u peygamber olarak seçti. Hz. Eyyûb bu görevi alır almaz insanları putları bırakıp yalnız Allah'a inanmaya çağırdı. Çok umutluydu; o kadar iyilik ettiği insanların hemen Allah'a yöneleceğini düşünüyordu. Oysa o günlerde insanların çoğu, kendi elleriyle yaptıkları putlara tapıyordu." },
          { type: "text", text: "Hz. Eyyûb köyün meydanında insanları toplar, onlara tatlı bir dille Allah'ı anlatırdı. Yolda karşılaştığı yolcularla da durup uzun uzun konuşurdu. Ne var ki yıllar geçtiği hâlde ona çok az kişi inandı. Bazıları onu dinlememek için başını çevirip yoluna devam ediyordu." },
          { type: "text", text: "Hz. Eyyûb buna çok üzülüyordu, ama yine de hiç yılmadı. Kimseye kırılıp küsmedi, onlara Allah'ı anlatmaktan da hiç vazgeçmedi. Belki bir gün onların kalbi de yumuşardı." },
          { type: "text", text: "Her hasattan sonra Hz. Eyyûb'un ambarları ağzına kadar dolardı. Buğday çuvalları tavana kadar üst üste yığılır, kilerlerin kapıları güçlükle kapanırdı. Peki insan böyle büyük bir bolluk karşısında ne yapmalıydı? Kapıları sıkıca kilitleyip hepsini kendine mi saklamalıydı, yoksa başkalarıyla mı paylaşmalıydı?" },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-1/dolu-ambar.jpg",
            alt: "Aralık ahşap kapısından içeri ışık giren taş bir ambar; tavana kadar yığılmış buğday çuvalları ve yere dökülmüş taneler.",
          },
        ],
        continuationParagraphs: [
          {
            type: "interactive_word",
            before: "Hz. Eyyûb için bu sorunun cevabı her zaman aynıydı. O, ambarlarını kilitlemez, tersine kapısını daha da ardına kadar açardı. Yanında bir konuk olmadan geceyi geçirmez, açları doyurmadan kendisi tek lokma yemezdi. Bu yüzden herkes onu ",
            word: "cömert",
            meaning: "Sahip olduklarını başkalarıyla seve seve paylaşan kimsedir.",
            after: " biri olarak tanırdı.",
          },
          { type: "text", text: "Yetimlere, yaşlılara ve kimsesi olmayanlara kendisi bakar, ihtiyaçlarını tek tek sorardı. Kışın üşüyenleri, giyecek bulamayanları giydirmeden kendisi yeni bir şey giymezdi. Anlatılanlara göre onun yurdunda tek bir yoksul bile kalmamıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-1/acik-sofra.jpg",
            alt: "Bağ çardağının altında, avluya serilmiş uzun bir sofra; ekmekler, üzüm salkımları, toprak kaseler ve yola açılan avlu kapısı.",
          },
          { type: "text", text: "Hz. Eyyûb için nimeti paylaşmak, Allah'a şükretmenin en güzel yollarından biriydi. Verdiği her lokmanın aslında Allah'ın bir ikramı olduğunu bilir, bu yüzden kimseye büyüklük taslamazdı. Yanında çalışanlar da ondan çok memnundu ve onun yurdunda herkesin yüzü gülerdi." },
          { type: "text", text: "Hz. Eyyûb bu güzel günlerde de insanları Allah'a çağırmayı sürdürdü. Ona inanan az sayıdaki kişi, zamanla onun en yakın ve en sadık dostları oldu. Hz. Eyyûb bu dostlarla birlikte Allah'ı anar, sevincini onlarla paylaşırdı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-1/meydan-agaci.jpg",
            alt: "Akşam ışığında taş evlerle çevrili küçük bir köy meydanı; ortasında yaşlı bir çınar ve altında taş sekiler.",
          },
          { type: "text", text: "Hz. Eyyûb'un evi bereketle, kalbi şükürle doluydu. Akşamları bağının çardağı altında oturur, o gün kendisine verilen nimetleri tek tek düşünürdü. Ama bu bereketli ve huzurlu günler, hep böyle gitmeyecekti." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-1/ufuktaki-bulut.jpg",
            alt: "Gün batımında ön planda bir bağ çardağı ve bereketli vadi; çok uzakta ufukta toplanan gri bulutlar.",
          },
        ],
        has_question: true,
        question: {
          title: "Bereketli Günler",
          prompt: "Doğum gününde sana kocaman bir kutu kurabiye hediye edildi. Ertesi gün kutuyu okula götürdün ve teneffüste arkadaşların da kutuya bakıyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Kutuyu çantama koyar, eve götürüp kurabiyelerin hepsini kendim yerdim.",
              comparison: "Güzel bir hediyeyi saklamak istemek çok doğal. Hz. Eyyûb ise ambarları dolduğunda kapısını kilitlemedi, nimeti herkesle paylaştı.",
            },
            {
              id: "b",
              text: "Arkadaşlarıma birer kurabiye ikram eder, bu güzel hediye için içimden şükrederdim.",
              comparison: "Sen de Hz. Eyyûb gibi davrandın. O da kendisine verilen nimeti şükürle paylaştı ve sofrasını herkese açtı.",
            },
            {
              id: "c",
              text: "Yalnızca en yakın arkadaşıma verir, diğerleri görmesin diye kutuyu saklardım.",
              comparison: "Yakın arkadaşınla paylaşmak güzel bir başlangıç. Hz. Eyyûb ise kapısını herkese açtı; konuğu da yetimi de doyurdu.",
            },
          ],
        },
        learned: [
          "Sahip olduğumuz her güzel şey bir nimettir; onu paylaşmak, şükretmenin bir yoludur.",
          "Hz. Eyyûb'un kapısı herkese açıktı; açları doyurmadan kendisi yemek yemezdi.",
          "Hz. Eyyûb insanları Allah'a çağırdı; çok az kişi inansa da anlatmayı bırakmadı.",
        ],
        gorev: {
          id: "eyyub-1-ilk-ikram",
          ad: "İlk İkram Senden",
          kategori: "paylaşma",
          aciklama: "Bu hafta bir akşam sofrayı kurmaya yardım et. Sevdiğin bir yiyeceği önce ailenden birine ikram et, sonra kendin al.",
          sure: "Hafta içinde bir akşam, yaklaşık 15 dakika",
          olcut: "Sofrayı kurmaya yardım edip sevdiğin bir yiyeceği önce başkasına ikram ettiysen görevi tamamladın.",
          guvenlikNotu: "Sıcak tencere ve tabakları taşımayı bir büyüğüne bırak.",
        },
      },
      {
        id: "2",
        title: "Art Arda Gelen Haberler",
        ozet: "Sürüler ve tarlalar elden çıkar, en ağır haber de gelir; Hz. Eyyûb acısını Allah'a sığınarak taşır.",
        badgeName: "İlk Andaki Sabır Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-eyyub/bolum-2/kapak.jpg",
          alt: "Alçak gri bulutların altında sessiz bir sabah; taş evler, bağlar ve ovaya uzanan tarlalar.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "O sabah Hz. Eyyûb (a.s.) her zamanki gibi gün ağarırken kalkmıştı. Çobanlar sürüleri ovalara çıkarmış, tarlalarda iş çoktan başlamıştı. Kimse, bu sıradan sabahın her şeyi değiştireceğini bilmiyordu.", dropCap: true },
          { type: "text", text: "Evin avlusuna fırından yeni çıkmış ekmeklerin sıcak kokusu yayılıyordu. Hz. Eyyûb, her sabah olduğu gibi günün işlerine başlamadan önce Rabbine şükretti. Sonra bağdaki çardağın altına oturup o gün yapılacak işleri düşünmeye başladı." },
          {
            type: "interactive_word",
            before: "Kur'an, Hz. Eyyûb'a bir dert dokunduğunu ve onun bu derdi Rabbine açtığını bildirir. Anlatılanlara göre bu dertler birbiri ardına geldi ve onu çok zorladı. Hz. Eyyûb'un başına art arda gelecek ",
            word: "musibet",
            meaning: "İnsanın başına gelen büyük sıkıntı ve acıdır.",
            after: "lerin ilki, işte o sabah kapıyı çaldı.",
          },
          { type: "text", text: "Köyün yolunda soluk soluğa koşan bir haberci belirdi ve durmadan Hz. Eyyûb'un evini sordu. Avluya girdiğinde nefes nefeseydi ve bir süre konuşamadı. Getirdiği haber çok kötüydü: Hz. Eyyûb'un sürüleri elden çıkmış, ovadaki ağıllar bomboş kalmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-2/tozlu-yol.jpg",
            alt: "Ovadan köye uzanan toprak bir yol ve yolun uzağında havada asılı kalmış ince bir toz izi.",
          },
          { type: "text", text: "Avluya derin bir sessizlik çöktü; yanındakiler önce habere, sonra merakla Hz. Eyyûb'a baktı. Yıllardır bakıp büyüttüğü sürüler, tek bir sabah içinde elinden çıkmıştı." },
          { type: "text", text: "Hz. Eyyûb bu sürüleri hiçbir zaman kendi malı gibi görmemiş, Allah'ın bir nimeti saymıştı. Şimdi bu düşüncenin gerçekten sınanacağı zor bir an gelmişti. İnsan böyle bir haberi ilk duyduğu anda ne yapardı? Hz. Eyyûb bu haber karşısında şimdi ne diyecekti?" },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-2/bos-agil.jpg",
            alt: "Taş duvarlı boş bir ağıl; ahşap kapısı açık kalmış, yerde birkaç tutam saman.",
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Eyyûb bir süre sustu, sonra derin bir nefes aldı; sesi hüzünlüydü ama sakindi." },
          { type: "text", text: "— Mülk Allah'ındır. Dilediği zaman verir, dilediği zaman alır, dedi." },
          {
            type: "interactive_word",
            before: "Bu sözle, sahip olduğu her şeyin gerçek sahibinin Allah olduğunu söylüyordu. Hz. Eyyûb'un gösterdiği ",
            word: "sabır",
            meaning: "Zor bir durumda umudunu kaybetmeden dayanabilmektir.",
            after: ", hiç üzülmemek demek değildi. O da çok üzülmüştü, ama ilk anda bile umudunu kaybetmedi.",
          },
          { type: "text", text: "Ardından birbiri peşi sıra başka haberler de geldi. Tarlalar ve çiftlikler de birer birer elden çıktı, dolu ambarlar boşaldı. Hz. Eyyûb her haberde aynı sözü tekrarladı ve Rabbine sığındı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-2/bos-ambar.jpg",
            alt: "Aralık kapısından ışık giren bomboş bir taş ambar; köşede devrilmiş boş bir sepet.",
          },
          { type: "text", text: "Köyde herkes bu kayıplar yüzünden kederliydi ve ne yapacağını bilemiyordu. Hz. Eyyûb ise kendi üzüntüsünü taşırken çevresindekilere de güç vermeye çalıştı." },
          { type: "text", text: "— Sanırım Rabbim beni deniyor. Mülk O'nundur, dedi." },
          { type: "text", text: "Bir gün Hz. Eyyûb eşiyle bağdaki çardağın altında otururken en ağır haber geldi. Çocuklarının bir arada bulunduğu ev yıkılmış, çocukları hayatını kaybetmişti. Hz. Eyyûb'un kalbi derin bir acıyla doldu ve uzun süre hiçbir şey söyleyemedi." },
          { type: "text", text: "Sonra başını göğe kaldırdı ve hüzünlü ama sakin bir sesle Rabbine sığındı. Bu acının sebebini sormadı, yalnızca Allah'tan yardım diledi. Yanında sessizce ağlayan eşini de unutmadı ve onun için de dua etti." },
          { type: "text", text: "— Rabbim, bana verdiğin sabırdan eşime de ver, dedi." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-2/tek-kandil.jpg",
            alt: "Akşam karanlığında taş bir avlu; ocakta küllenmiş közler ve duvar oyuğunda sakin sakin yanan tek bir kil kandil.",
          },
          { type: "text", text: "Kendisinin de teselliye ihtiyacı vardı, ama Hz. Eyyûb köydeki insanları bir araya topladı ve onları teselli etti. Onlara zor günlerde de Allah'a güvenmeyi ve umudu kaybetmemeyi anlattı. Herkes, bu kadar acının içinde onun nasıl böyle sakin kalabildiğine şaşırıyordu." },
          { type: "text", text: "Başına gelenler Hz. Eyyûb için bir ceza değildi. Allah, sevdiği kullarını bazen iyi günlerle, bazen de zor günlerle dener; bunun sebebini en iyi O bilir. Hz. Eyyûb da bunu biliyor ve Rabbine güvenmeyi sürdürüyordu." },
          { type: "text", text: "O zor günlerde Hz. Eyyûb'a inanan birkaç dostu, haberi duyar duymaz koşup geldi. Onu yalnız bırakmadılar, yanında oturup acısını paylaştılar ve onu teselli etmeye çalıştılar. Hz. Eyyûb, bu büyük acının ortasında yalnız olmadığını gördü." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-2/kapidaki-sandaletler.jpg",
            alt: "Akşam, bir evin eşiğinde yan yana bırakılmış birkaç çift eski deri sandalet ve aralık kapıdan dışarı sızan sıcak ışık.",
          },
        ],
        has_question: true,
        question: {
          title: "Art Arda Gelen Haberler",
          prompt: "Günlerce uğraşıp yaptığın maketi bir arkadaşın yanlışlıkla düşürdü ve maket dağıldı. O ilk anda ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Çok üzülsem de bağırmadan durur, sakinleşip ne yapabileceğimi düşünürdüm.",
              comparison: "Sen de Hz. Eyyûb'a yakın davrandın. O da çok üzüldü ama ilk anda öfkelenmedi; “Mülk Allah'ındır” deyip Rabbine sığındı.",
            },
            {
              id: "b",
              text: "Hemen bağırır, maketi düşüren arkadaşıma çok kızardım.",
              comparison: "Böyle bir anda öfkelenmek çok anlaşılır bir şey. Hz. Eyyûb ise ilk haberi duyduğunda sakin kaldı ve Allah'a sığındı.",
            },
            {
              id: "c",
              text: "“Zaten hiçbir şey yolunda gitmiyor” der, maketi tamamen bırakırdım.",
              comparison: "Her şeyi bırakmak istemek, ne kadar üzüldüğümüzü gösterir. Hz. Eyyûb ise art arda gelen haberlere rağmen umudunu kaybetmedi.",
            },
          ],
        },
        learned: [
          "Sabır, hiç üzülmemek değildir; üzüntünün içinde de umudu kaybetmeden Allah'a sığınmaktır.",
          "İlk kötü haber geldiğinde Hz. Eyyûb, “Mülk Allah'ındır; dilediği zaman verir, dilediği zaman alır” dedi.",
          "En zor günlerinde Hz. Eyyûb'a inanan dostları koşup geldi ve onu yalnız bırakmadı.",
        ],
      },
      {
        id: "3",
        title: "Herkes Gidince",
        ozet: "Hz. Eyyûb ağır bir hastalığa yakalanınca insanlar ondan uzaklaşır; eşi ise yanından bir an bile ayrılmaz.",
        badgeName: "Zor Günde Vefa Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-eyyub/bolum-3/kapak.jpg",
          alt: "Alacakaranlıkta uzaktan görünen, kapıları kapalı taş evler ve köyden tepedeki tek bir zeytin ağacına uzanan ince bir patika.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Zor günlerin ardından Hz. Eyyûb (a.s.) yeniden tarlasına dönmüş, elinden geldiğince çalışmaya başlamıştı. Eşi de yanından hiç ayrılmıyor, tarlada ona yardım ediyordu. İslam inancına ve tarihî rivayetlere göre bu iyi kalpli kadının adı Rahime'ydi.", dropCap: true },
          { type: "text", text: "Bir gün tarlada çalışırken Hz. Eyyûb birden halsiz düştü ve ağır bir hastalığa yakalandı. Eşi onu güçlükle eve götürdü, yakınları da köyün bütün hekimlerine başvurdu. Ama hekimlerin hiçbiri bu derde bir çare bulamadı." },
          { type: "text", text: "Hastalık bir türlü geçmedi; günler haftaları, haftalar ayları kovaladı. Hz. Eyyûb'un gücü her geçen gün biraz daha azaldı ve sonunda yerinden kalkamaz oldu. Bedeni çok yorgundu, ama aklı ve kalbi her zamanki gibi Allah'ı anıyordu. Ne isyan etti ne de bir kez olsun hâlinden şikâyet etti." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-3/bos-tarla.jpg",
            alt: "Bakımsız kalmış bir buğday tarlası, başakların arasında yabani otlar ve taş duvara yaslanmış ahşap bir saban.",
          },
          { type: "text", text: "Köydeki insanlar ise hastalığın kendilerine de geçmesinden korkmaya başladı. Bir zamanlar sofrasına oturanlar bile artık Hz. Eyyûb'un kapısına yaklaşmıyordu. Anlatılanlara göre sonunda bir araya gelip Hz. Eyyûb'un köyün dışına taşınmasını istediler." },
          { type: "text", text: "Eşi bu isteği ona söylemeye çekiniyordu, çünkü onu çok üzeceğini düşünüyordu. Ama Hz. Eyyûb bu isteği duyunca hiç kızmadı." },
          { type: "text", text: "— Bu onların hakkı. Hiç değilse rahat uyusunlar, dedi." },
          { type: "text", text: "Hz. Eyyûb köydekilerin bir gün Allah'a inanacağını hâlâ umuyordu. Onların huzurla yaşamasını istiyor, kendisi yüzünden korkmalarını istemiyordu. Böylece köyün dışında, küçük ve sakin bir yere taşındı; orada yaşlı bir zeytin ağacının gölgesi vardı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-3/koy-disi.jpg",
            alt: "Köyün dışında, alçak bir tepede tek başına duran yaşlı bir zeytin ağacı ve gölgesine serilmiş sade bir hasır; arkada uzakta köy.",
          },
          { type: "text", text: "Bir gün Hz. Eyyûb, eşinin ne kadar yorulduğunu gördü ve buna çok üzüldü." },
          { type: "text", text: "— Herkes gitti, sen de git ve kendini daha fazla yorma. Beni Rabbim korur, dedi." },
          { type: "text", text: "Şimdi eşi bu zor günlerde ne yapacaktı? O da herkes gibi onu bırakıp gidecek miydi?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Eşi bu sözü duyunca hiç düşünmeden cevap verdi." },
          { type: "text", text: "— Hayır, yanından asla ayrılmayacağım; sana ben bakacağım, dedi." },
          {
            type: "interactive_word",
            before: "Herkes uzaklaşırken o, büyük bir ",
            word: "vefa",
            meaning: "Zor günde de sevdiklerini bırakmayıp onlara bağlı kalmaktır.",
            after: "yla Hz. Eyyûb'un yanında kaldı.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-3/gidip-gelen-izler.jpg",
            alt: "Köyün kenarından zeytin ağacına uzanan toprak patika ve üzerinde defalarca gidilip gelinmiş aynı küçük ayak izleri.",
          },
          { type: "text", text: "Eşi her gün testisiyle köyün çeşmesinden su taşıdı, onun yemeğini hazırladı. Hz. Eyyûb'a inanan birkaç dostu da sık sık gelip hâlini sordu. Köyün geri kalanı uzak dursa da onu sevenler, Hz. Eyyûb'u bir gün bile yalnız bırakmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-3/dolu-testi.jpg",
            alt: "Zeytin ağacının gölgesinde, hasırın yanında ağzına kadar su dolu bir toprak testi ve üzeri örtülü küçük bir ekmek sepeti.",
          },
          { type: "text", text: "Köyde uzaktan bakanlar bu bağlılığı büyük bir hayretle izliyordu. Herkesin uzaklaştığı bir zamanda eşinin ve dostlarının onun yanında kalması onları çok şaşırtıyordu. Bazıları da kendi kalplerinde böyle bir bağlılık bulunmadığını fark edip utandı." },
          { type: "text", text: "Günler, aylar geçti; Hz. Eyyûb bir kez bile kimseye kırgın sözler söylemedi. Anlatılanlara göre o günlerde Rabbine şöyle şükretti:" },
          { type: "text", text: "— Rabbim, bana mal ve evlat verdin; kalbimde hep yer tutuyorlardı. Sonra hepsini geri aldın ve şimdi seninle baş başayım." },
          { type: "text", text: "Hz. Eyyûb çocuklarını hâlâ çok özlüyor, onları her gün sevgiyle anıyordu. Bu özlemi de Rabbine açıyor, gecesini de gündüzünü de O'nu anarak geçiriyordu. Kalbi hüzünlüydü, ama Rabbine güvenmenin verdiği bir huzur da taşıyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-3/huzurlu-safak.jpg",
            alt: "Şafakta zeytin ağacının ardından doğan güneş; dalların arasından süzülen ilk ışık hasıra düşüyor.",
          },
          { type: "text", text: "Hz. Eyyûb'un hastalığı, bazılarının sandığı gibi bir ceza değildi. O, hasta olduğu günlerde de Allah'ın sevdiği bir kuldu. Ama bir gün, onu görmeye gelen dostlarının bir sözü onu hastalığından bile çok üzecekti." },
        ],
        has_question: true,
        question: {
          title: "Herkes Gidince",
          prompt: "Sınıfından bir arkadaşın uzun süredir hasta ve okula gelemiyor. Sınıfta herkes onu yavaş yavaş unutmaya başladı. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Ben de onu zamanla unuturdum; nasılsa okula döndüğünde yine görüşürdük.",
              comparison: "İnsan uzak kalınca bazen arkadaşını aklından çıkarabilir. Hz. Eyyûb'un eşi ise herkes uzaklaşırken onun yanında kaldı.",
            },
            {
              id: "b",
              text: "Ona çok üzülürdüm ama ne yapacağımı bilemediğim için bir şey yapmazdım.",
              comparison: "Ne yapacağını bilememek çok doğal. Hz. Eyyûb'un eşi ise su taşımak gibi küçük işlerle yanında olduğunu gösterdi.",
            },
            {
              id: "c",
              text: "Ailemden yardım isteyip onu arar ya da ona küçük bir kart gönderirdim.",
              comparison: "Sen de Hz. Eyyûb'un eşi gibi davrandın. O da zor günlerde vefasıyla yanında kaldı ve onu yalnız bırakmadı.",
            },
          ],
        },
        learned: [
          "Vefa, zor günlerde de sevdiklerimizi unutmamak ve onların yanında kalabilmektir.",
          "Hz. Eyyûb ağır bir hastalığa yakalandı ve köyün dışında küçük, sakin bir yere taşındı.",
          "Eşi “Yanından ayrılmayacağım” dedi; her gün su taşıdı ve yemeğini hazırladı.",
        ],
        gorev: {
          id: "eyyub-3-hatir-sor",
          ad: "Bir Hatır Sor",
          kategori: "iyilik",
          aciklama: "Hasta, yaşlı ya da uzun süredir görmediğin bir yakının için küçük bir kart hazırla. İstersen bir büyüğünle birlikte onu arayıp hatırını sor.",
          sure: "Yaklaşık 20 dakika",
          olcut: "Bir yakının için kart hazırladıysan ya da bir büyüğünle onu arayıp hatırını sorduysan görevi tamamladın.",
          guvenlikNotu: "Hasta ziyareti gerekmez. Aramayı ve kartı ulaştırmayı bir büyüğünle birlikte yap; yalnızca ailenin tanıdığı kişilere ulaş.",
        },
      },
      {
        id: "4",
        title: "Kalpten Gelen Dua",
        ozet: "Dostlarının kırıcı sözü Hz. Eyyûb'u hastalığından çok üzer; o da derdini en merhametli olan Allah'a açar.",
        badgeName: "Merhamete Sığınma Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-eyyub/bolum-4/kapak.jpg",
          alt: "Öğle güneşinde kuru otlu tepeler, taş duvarlar ve tepede tek başına duran küçük bir zeytin ağacı.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hz. Eyyûb (a.s.) köyün dışındaki o sakin yerde uzun zamandır hastaydı. Eşi her gün yanındaydı ve ona inanan birkaç dost da onu görmeye gelmeyi hiç bırakmamıştı. Ama Hz. Eyyûb'un köyün dışına taşınması, bu dostların kalbini de derinden sarsmıştı. Onu her gördüklerinde, bu derdin neden bu kadar uzun sürdüğünü düşünmeden edemiyorlardı.", dropCap: true },
          { type: "text", text: "Bir gün iki dostu ve onlardan daha genç bir arkadaşları yine çıkageldi. Bir süre sessizce oturup Hz. Eyyûb'un hâline baktılar. Gördükleri karşısında iki dostun içine derin bir korku ve şaşkınlık düştü. Akıllarına, insanı yanlış bir sonuca götüren düşünceler gelmeye başladı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-4/ziyaret-patikasi.jpg",
            alt: "Kuru otların arasından zeytin ağacına doğru kıvrılan dar bir patika ve tozda farklı boylarda taze ayak izleri.",
          },
          { type: "text", text: "İçlerinden biri, yanındakine dönüp alçak sesle konuştu." },
          { type: "text", text: "— Eyyûb herhalde kimsenin işlemediği bir günah işlemiş olmalı; yoksa Allah bu derdi çoktan kaldırırdı, dedi." },
          { type: "text", text: "Yanındaki arkadaşı da bir şey söylemeden başını sallayarak ona hak verdi." },
          { type: "text", text: "Hz. Eyyûb, dostlarının alçak sesle söylediği bu sözleri duydu. Hastalığın acısına uzun zamandır sabırla dayanmıştı, ama bu söz bambaşkaydı. En yakın dostlarından gelen bu suçlama, kalbini hastalığından da çok yaraladı. Bir yanda yıllardır sevdiği dostları vardı, öbür yanda kalbini kıran bu ağır söz. Şimdi bu kırgınlığın içinde ne diyecekti?" },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-4/kirik-dal.jpg",
            alt: "Bulutlu gökyüzü önünde, zeytin ağacının kırılıp sarkmış ama yaprakları hâlâ yeşil bir dalı.",
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "O sırada dostların en genci araya girdi ve iki arkadaşına döndü." },
          { type: "text", text: "— Siz kimin hakkında konuştuğunuzu biliyor musunuz? dedi. Onun yıllardır doğruluktan başka bir şey yaptığını hiç gördünüz mü? Bu dert sizin başınıza gelseydi, siz ne hâlde olurdunuz?" },
          { type: "text", text: "Genç arkadaş, sesini yükseltmeden ama kararlı bir şekilde sözlerine devam etti." },
          { type: "text", text: "— Allah, peygamberlerini ve iyi kullarını da zor günlerle dener. Bu dert ona bir ceza olarak değil, bir hayır olarak verildi, dedi." },
          {
            type: "interactive_word",
            before: "Genç dost, Hz. Eyyûb'un yaşadıklarının bir ",
            word: "imtihan",
            meaning: "Allah'ın insanı iyi ve zor günlerle denemesidir.",
            after: " olduğunu anlatıyordu.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-4/genc-fidan.jpg",
            alt: "Kalın gövdeli yaşlı zeytin ağacının hemen yanında dimdik yükselen ince, genç bir fidan.",
          },
          { type: "text", text: "Hz. Eyyûb önce, kendisini cesurca savunan genç dostuna döndü." },
          { type: "text", text: "— Allah, doğruyu anlama gücünü gencin de yaşlının da kalbine eker. Genç yaşta bu güç verilen kişinin değeri hiç azalmaz, dedi." },
          { type: "text", text: "Sonra öbür iki dostuna döndü ve sakin bir sesle konuştu." },
          { type: "text", text: "— Bu sözünüz bana hastalığımdan daha ağır geldi, dedi." },
          { type: "text", text: "Onlarla tartışmaya girmedi, onları kırmak için tek bir söz bile söylemedi." },
          { type: "text", text: "Bu olaydan sonra Hz. Eyyûb, Rabbine her zamankinden daha da yaklaştı. Hastalığı yüzünden ibadetlerini eskisi gibi yapamıyordu, ama kalbi ve aklı her an Allah'ı anıyordu. Derdini artık insanlara değil, yalnızca Rabbine açmak istiyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-4/tas-sekiler.jpg",
            alt: "Zeytin ağacının gölgesinde, ziyaretçilerin oturduğu ve şimdi boş kalan, yarım daire biçiminde üç düz taş.",
          },
          { type: "text", text: "Hz. Eyyûb, ibadetlerini neden yapamadığını, hâlini ve derdini Rabbine anlattı. Şeytanın ona verdiği yorgunluğu ve sıkıntıyı da O'na açtı. Kur'an'da bildirildiğine göre sonunda şöyle dua etti:" },
          { type: "text", text: "— Rabbim, bana bu dert dokundu; sen merhametlilerin en merhametlisisin." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-4/gece-gogu.jpg",
            alt: "Gece, tepedeki zeytin ağacının üzerinde uçsuz bucaksız yıldızlı bir gökyüzü ve ağacın dibinde yanan küçük bir kandil.",
          },
          { type: "text", text: "Bu dua bir şikâyet değildi; saygı ve umut dolu bir yalvarıştı. Hz. Eyyûb derdini en merhametli olan Allah'a açıyor, umudunu yalnızca O'na bağlıyordu. Allah'tan başka kimsenin bu derdi kaldıramayacağını biliyordu. Ve Allah, Hz. Eyyûb'un duasını işitti." },
        ],
        has_question: true,
        question: {
          title: "Kalpten Gelen Dua",
          prompt: "Zor bir gün geçiriyorsun. Bir arkadaşın sana “Kesin kendi suçundur” dedi ve bu söz seni çok kırdı. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Ben de ona aynı kırıcılıkta bir sözle karşılık verirdim.",
              comparison: "Kırılınca karşılık vermek istemek çok doğal. Hz. Eyyûb ise kırıcı söze kırıcı sözle karşılık vermedi; derdini Allah'a açtı.",
            },
            {
              id: "b",
              text: "Kırıldığımı sakince söyler, tartışmayı uzatmaz, derdimi bir büyüğüme ve Allah'a açardım.",
              comparison: "Sen de Hz. Eyyûb gibi davrandın. O da kırıldığını sakince söyledi, tartışmaya girmedi ve derdini Allah'a açtı.",
            },
            {
              id: "c",
              text: "Hiçbir şey söylemez, kırgınlığımı kimseye anlatmadan uzun süre içimde tutardım.",
              comparison: "Kırgınlığı içinde tutmak insanı daha da yorabilir. Hz. Eyyûb ise kırıldığını açıkça söyledi ve derdini Rabbine anlattı.",
            },
          ],
        },
        learned: [
          "Kırıldığımızda derdimizi en merhametli olan Allah'a açabilir, umudumuzu O'na bağlayabiliriz.",
          "Genç bir dost, zorluğun bir ceza değil bir imtihan olduğunu söyleyerek Hz. Eyyûb'u savundu.",
          "Hz. Eyyûb, “Rabbim, bana bu dert dokundu; sen merhametlilerin en merhametlisisin” diye dua etti.",
        ],
      },
      {
        id: "5",
        title: "Ayağının Altındaki Pınar",
        ozet: "Allah duayı kabul eder: Hz. Eyyûb ayağını yere vurur, serin bir pınar kaynar ve hastalığından kurtulur.",
        badgeName: "Sabrın Pınarı Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-eyyub/bolum-5/kapak.jpg",
          alt: "Şafak vakti, taşlı bir tepede yaşlı zeytin ağacı; gökyüzü pembe ve altın, toprağa ilk ışık düşüyor.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hz. Eyyûb (a.s.) Rabbine dua etmiş, derdini en merhametli olana açmıştı. Kur'an'a göre Allah onun duasını kabul etti ve ona şöyle seslendi:", dropCap: true },
          { type: "text", text: "— Ayağını yere vur. İşte yıkanacak ve içilecek serin bir su!" },
          { type: "text", text: "Hz. Eyyûb bu sözle birlikte kalbinde büyük bir umut hissetti. Rabbi onu hiç unutmamış, duasını cevapsız bırakmamıştı." },
          { type: "text", text: "Hz. Eyyûb'un bedeni çok güçsüzdü, ama Rabbinin sözüne hemen uydu. Kalan bütün gücünü toplayıp ayağını büyük bir kararlılıkla toprağa vurdu. O anda taşların arasından serin ve berrak bir su kaynamaya başladı. Su, ışıkta pırıl pırıl parlayarak taşların üzerinden kuru toprağa yayıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-5/kaynayan-pinar.jpg",
            alt: "Yakın planda, taşların arasından kaynayan serin ve berrak su; küçük halkalar ve ışıkta parlayan damlalar.",
          },
          {
            type: "interactive_word",
            before: "Hz. Eyyûb, Allah'ın bildirdiği gibi bu sudan yıkandı ve içti. Allah onun derdini giderdi ve ona tam bir ",
            word: "şifa",
            meaning: "Bir hastalıktan kurtulup iyileşmektir.",
            after: " verdi. Uzun zamandır yerinden kalkamayan Hz. Eyyûb, yavaşça doğrulup ayağa kalktı. Hastalığından geriye artık hiçbir iz kalmamıştı.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-5/pinar-basinda.jpg",
            alt: "Taşlar arasından akan pınarın başında, sabah ışığına bürünmüş, arkası dönük ayakta duran bir figür.",
          },
          { type: "text", text: "Hz. Eyyûb, ayaklarının altındaki ıslak toprağı nihayet yeniden hissetti. Etrafına baktı; pınarın çevresindeki toprak ıslanmış, otlar yeşermeye başlamıştı. Zor günler, sonunda gerçekten geride kalmıştı. Peki Hz. Eyyûb, iyileştiği bu ilk anda ne yapacaktı?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Ayağa kalkan Hz. Eyyûb, kendisine verilen şifa için Rabbine şükretti. Zor günlerde nasıl O'na sığındıysa, sevinçli gününde de O'na yöneldi. Derdini O'na açmıştı; şimdi sevincini de O'na anlattı." },
          { type: "text", text: "Sonra, zor günlerde yanından hiç ayrılmayan eşinin yanına gitti. Eşi onu ayakta görünce öyle sevindi ki ne diyeceğini bilemedi. Hastalığı boyunca yerinden kalkamayan Hz. Eyyûb, şimdi karşısında dimdik duruyordu." },
          { type: "text", text: "Anlatılanlara göre Hz. Eyyûb, eşini de o serin suyla yıkadı ve ona da içirdi. İkisi de yeniden güçlü ve dinç oldular; zor günlerin yorgunluğu sanki o suyla birlikte akıp gitmişti." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-5/iki-testi.jpg",
            alt: "Pınarın kenarında yan yana duran, sudan yeni dolmuş iki toprak testi; çevrede yeşeren otlar ve küçük çiçekler.",
          },
          { type: "text", text: "Kur'an'a göre Allah, Hz. Eyyûb'a ailesini ve onlarla birlikte bir o kadarını daha bağışladı. Kur'an bunu Allah'tan gelen bir rahmet olarak anlatır; Hz. Eyyûb bu büyük rahmete de şükürle karşılık verdi." },
          { type: "text", text: "İslam inancına ve tarihî rivayetlere göre Hz. Eyyûb yıkanırken üzerine altın çekirgeler dökülmüştü. Hz. Eyyûb bunu bir rahmet işareti olarak gördü ve yine şükretti." },
          { type: "text", text: "— Rabbim, senin bereketine kim ihtiyaç duymaz? dedi." },
          { type: "text", text: "Anlatılanlara göre o yurtta pek çok insan, sonunda Hz. Eyyûb'un Rabbine inandı. Tarlalar yeniden yeşerdi, bağlar yeniden meyve verdi ve bereketli günler geri döndü." },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-5/yeseren-bag.jpg",
            alt: "Sabah ışığında yeniden yeşermiş bağlar, taze yapraklı asmalar ve uzakta yeşil tarlalarla çevrili taş evler.",
          },
          { type: "text", text: "Bir zamanlar ilk kötü haberi duyduğunda “Mülk Allah'ındır” diyen Hz. Eyyûb, şimdi de aynı Rabbine şükrediyordu. Zor günde de iyi günde de kalbi hep O'na dönüktü. Zorluklar onu Rabbinden uzaklaştırmamış, O'na daha da yaklaştırmıştı." },
          { type: "text", text: "Kur'an, Hz. Eyyûb'un hikâyesini akıl sahipleri için bir öğüt olarak anlatır. Bu hikâye, zor günde umudu kaybetmemeyi, iyi günde de şükretmeyi hatırlatır. Kur'an, Hz. Eyyûb için şöyle der: “Biz onu sabırlı bulduk. O ne güzel bir kuldu! O, her zaman Allah'a yönelirdi.”" },
          {
            type: "image",
            src: "/kitaplar/hz-eyyub/bolum-5/yeseren-agac.jpg",
            alt: "İkindi altın ışığında, kurumuş eski dalların arasından yükselen taze yeşil yapraklı genç bir ağaç ve dibinde ince bir su şeridi.",
          },
        ],
        has_question: true,
        question: {
          title: "Ayağının Altındaki Pınar",
          prompt: "Uzun süren hastalığın sonunda geçti. Bugün yeniden dışarı çıkıp oynayabileceksin. İlk ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Bana bakan aileme teşekkür eder, iyileştiğim için Allah'a şükrederdim.",
              comparison: "Sen de Hz. Eyyûb gibi davrandın. O da iyileşince Rabbine şükretti ve sevincini eşiyle paylaştı.",
            },
            {
              id: "b",
              text: "Zor günleri hemen unutur, kimseye bir şey demeden doğruca oyuna koşardım.",
              comparison: "Oyuna koşmak istemek çok doğal. Hz. Eyyûb ise iyileşince zor günleri unutmadı; Rabbine yöneldi ve şükretti.",
            },
            {
              id: "c",
              text: "“Ya yine hastalanırsam?” diye korkar, bir süre dışarı çıkmazdım.",
              comparison: "Korkunun bir süre sürmesi anlaşılır bir şey. Hz. Eyyûb ise zor günler bitince umutla ayağa kalktı ve şükretti.",
            },
          ],
        },
        learned: [
          "Şükür, zor günler geçtiğinde de Allah'ı hatırlayıp O'na yönelebilmektir.",
          "Hz. Eyyûb ayağını yere vurdu; kaynayan pınarda yıkanıp içti ve hastalığından kurtuldu.",
          "Allah, bir rahmet olarak Hz. Eyyûb'a ailesini ve onlarla birlikte bir o kadarını daha bağışladı.",
        ],
      },
    ],
  },
  {
    id: "hz-musa",
    routePrefix: "musa",
    title: "Hz. Musa",
    eyebrow: "Hz. Musa — Çocuklar İçin",
    chapters: [
      {
        id: "1",
        title: "Nehre Bırakılan Sandık",
        ozet: "Firavun'un ağır emri karşısında annesi, Allah'ın vaadine güvenip bebeğini bir sandıkla nehre bırakır.",
        badgeName: "Vaade Güven Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-1/kapak.jpg",
          alt: "Alacakaranlıkta geniş bir nehir, kıyıda sazlıklar, hurma ağaçları ve uzakta düz damlı kerpiç evler.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Çok eski zamanlarda Mısır'da, Nil adındaki büyük bir nehrin kıyısında güçlü bir hükümdar yaşardı. İnsanlar ona Firavun derdi ve onun önünde korkuyla eğilirdi. Firavun kendini herkesten büyük görür, ülkedeki her şeyin sahibi olduğunu sanırdı.", dropCap: true },
          {
            type: "interactive_word",
            before: "Firavun halkını gruplara ayırmış, bu gruplardan biri olan İsrailoğullarını hor görmeye başlamıştı. Onları en ağır işlerde çalıştırıyor, her gün onlara yeni bir acı yaşatıyordu. Birine haksızlık edip ona acı ve zarar vermeye ",
            word: "zulüm",
            meaning: "Birine haksızlık edip ona acı ve zarar vermektir.",
            after: " denir.",
          },
          { type: "text", text: "Sonunda Firavun, İsrailoğullarını daha da güçsüz bırakmak için yeni bir emir verdi. Firavun, İsrailoğullarının yeni doğan erkek bebeklerinin öldürülmesini emretti. Ama Allah, ezilen bu insanlara iyilik etmek ve onlara yol açmak istiyordu." },
          { type: "text", text: "İsrailoğullarından bir ailenin evinde bir abla ile küçük bir ağabey yaşıyordu. Ağabeyleri Hz. Hârûn (a.s.) da ileride bir peygamber olacaktı. Bir gece bu evde yeni bir bebek dünyaya geldi. Bu bebek, ileride peygamber olacak olan Hz. Musa (a.s.) idi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-1/gece-penceresi.jpg",
            alt: "Gece sessiz bir sokakta, kepenkleri kapalı kerpiç bir evin aralığından sızan sıcak kandil ışığı.",
          },
          { type: "text", text: "Annesi bebeği bir süre kimseye göstermeden, gizlice emzirdi. Kapının önünden her ayak sesi geçtiğinde yüreği hızla çarpmaya başlıyordu. Bebeğin ağlaması bir gün duyulursa ne olacaktı? İşte o günlerde Allah, annesinin kalbine şöyle bir ilham verdi." },
          { type: "text", text: "— Onu emzir, başına bir şey gelmesinden korkarsan onu nehre bırak. Korkma ve üzülme; biz onu sana geri döndüreceğiz ve onu peygamberlerden biri yapacağız." },
          { type: "text", text: "Annesi bu sözlere tutundu ve küçük, sağlam bir sandık hazırladı. Sandığın içini yumuşak bir örtüyle özenle döşedi. Bir sabah, gün ağarmadan bebeğini sandığa yerleştirip kapağını kapattı. Sonra sandığı kucaklayıp kimseye görünmeden nehrin kıyısına indi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-1/hazir-sandik.jpg",
            alt: "Şafak öncesi nehir kıyısında, sazlıkların dibinde duran kapağı kapalı küçük ahşap bir sandık.",
          },
          { type: "text", text: "Nehir o saatte sakin sakin akıyordu ve kıyıda sazlıklardan başka hiçbir şey yoktu. Annesi sandığı suyun kenarına koydu, ama ellerini bir türlü üstünden çekemedi. Kalbinin bir yanı, bebeğini hiçbir zaman bırakmak istemiyordu. Öbür yanında ise Allah'ın sözü parlıyordu: “Korkma, onu sana geri döndüreceğiz.”" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Annesi derin bir nefes aldı ve titreyen elleriyle sandığı yavaşça suya bıraktı. Sandık önce biraz sallandı, sonra akıntıya kapılıp kıyıdan uzaklaşmaya başladı. Annesi, sandık sazlıkların arkasında gözden kaybolana kadar onun arkasından baktı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-1/nehirdeki-sandik.jpg",
            alt: "Sabah sisi içinde, geniş nehrin ortasında süzülen kapalı küçük bir sandık.",
          },
          { type: "text", text: "Sonra yanındaki kızına döndü ve kimse duymasın diye fısıltıyla konuştu." },
          { type: "text", text: "— Kardeşinin izini takip et, nereye gittiğini gör, dedi." },
          { type: "text", text: "Ablası sazlıkların arasından kimseye görünmeden kıyı boyunca yürüdü ve gözünü sudaki sandıktan bir an bile ayırmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-1/sazlik-yolu.jpg",
            alt: "Nehir kıyısındaki sazlıkların arasından geçen dar bir patika ve ıslak toprakta küçük ayak izleri.",
          },
          { type: "text", text: "Annesi eve döndüğünde yüreği bomboş kalmıştı ve aklı yalnızca bebeğindeydi. Öyle ki neredeyse her şeyi herkese anlatacak, sırrını açığa vuracaktı. Ama Allah onun kalbini sakinleştirdi ve verdiği söze güvenmesini sağladı." },
          { type: "text", text: "Bu sırada küçük sandık, büyük nehrin üstünde ağır ağır ilerliyordu. Çevresinde su kuşları uçuyor, kıyıdaki sazlıklar rüzgârda hafifçe hışırdıyordu. Sandığın nerede duracağını ve onu kimin bulacağını Allah'tan başka kimse bilmiyordu." },
          { type: "text", text: "Bu, bir annenin yaşayabileceği en zor sabahlardan biriydi. Ama o, çok sevdiği bebeğini korkusuna rağmen Allah'ın vaadine emanet etmişti. Şimdi evinde bütün kalbiyle bekliyor, Rabbine durmadan dua ediyordu. Peki sandık nerede duracaktı?" },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-1/gun-dogarken.jpg",
            alt: "Güneş doğarken altın renge bürünen sakin bir nehir ve çok uzakta süzülen küçük bir sandık.",
          },
        ],
        has_question: true,
        question: {
          title: "Nehre Bırakılan Sandık",
          prompt: "Ailenle birkaç günlüğüne yolculuğa çıkacaksın. Çok sevdiğin kedini, ona iyi bakacağını bildiğin teyzene bırakman gerekiyor. İçinden “Bırakmasam” diye geçiriyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Kimseye güvenmez, ne olursa olsun onu yanımdan ayırmazdım.",
              comparison: "Sevdiğini yanında tutmak istemen çok anlaşılır. Hz. Musa'nın annesi ise korkusuna rağmen Allah'ın sözüne güvendi ve sandığı suya bıraktı.",
            },
            {
              id: "b",
              text: "İçim titrese de ona güvenir, kedimi bırakıp dönüşümü beklerdim.",
              comparison: "Sen de Hz. Musa'nın annesi gibi davrandın. O da içi titrese de güvendi ve sandığı suya bırakıp beklemeye başladı.",
            },
            {
              id: "c",
              text: "Bırakırdım ama “Ya bir şey olursa?” diye gün boyu üzülürdüm.",
              comparison: "Endişelenmek çok doğal. Hz. Musa'nın annesinin de yüreği bomboş kalmıştı; Allah onun kalbini sakinleştirdi.",
            },
          ],
        },
        learned: [
          "Güvenmek bazen, sevdiğimiz bir şeyi korkumuza rağmen Allah'ın vaadine bırakabilmektir.",
          "Firavun ağır bir emir verdi; Hz. Musa'nın annesi bebeğini bir süre gizlice emzirdi.",
          "Annesi sandığı nehre bıraktı, ablası da sandığı kıyı boyunca uzaktan izledi.",
        ],
      },
      {
        id: "2",
        title: "Annesine Dönen Bebek",
        ozet: "Sandık saraya ulaşır; bebek hiçbir sütanneyi kabul etmez ve ablasının yardımıyla annesine kavuşur.",
        badgeName: "Göz Aydınlığı Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-2/kapak.jpg",
          alt: "Sabah ışığında nehrin karşı kıyısında yükselen büyük bir sarayın sütunları ve suya inen bahçesi.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Küçük sandık nehirde uzun süre süzüldü ve sonunda Firavun'un sarayının bahçesine yakın bir kıyıya ulaştı. Orada suya sarkan dalların arasına takılıp durdu. Hz. Musa (a.s.) o küçük sandığın içinde, kendisini neyin beklediğini bilmeden bekliyordu.", dropCap: true },
          { type: "text", text: "Firavun'un ailesinden biri sandığı fark etti ve onu kıyıya çektirdi. Kapak açılınca içinden küçücük bir bebeğin çıkması herkesi çok şaşırttı. Bu haber kısa sürede sarayın bütün odalarına yayıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-2/dallardaki-sandik.jpg",
            alt: "Suya sarkan söğüt dallarının ve nilüferlerin arasında duran kapalı küçük bir sandık.",
          },
          { type: "text", text: "Firavun'un eşi Âsiye bebeği kucağına aldı ve onu ilk görüşte çok sevdi. Allah, bu bebeğe bakan herkesin kalbine onun sevgisini yerleştirmişti. Firavun ise bu işten hiç hoşlanmadı, ama Âsiye ona yalvardı." },
          { type: "text", text: "— Bu çocuk benim de senin de gözümüzün aydınlığı olsun, dedi. Onu öldürmeyin; belki bize faydası olur ya da onu evlat ediniriz." },
          { type: "text", text: "Firavun sonunda razı oldu ve bebek sarayda kaldı. İslam inancına ve tarihî rivayetlere göre ona Musa adını verdiler. Bu adın, sandığın sudaki ağaçların arasında bulunmasından geldiği anlatılır." },
          {
            type: "interactive_word",
            before: "Ama bebek acıkmıştı ve saatlerdir durmadan ağlıyordu. Onu emzirmesi için saraya hemen bir ",
            word: "sütanne",
            meaning: "Bir bebeği kendi annesinin yerine emziren kadındır.",
            after: " çağrıldı, ama bebek onun sütünü emmedi. Bir başkası geldi, sonra bir başkası daha geldi; bebek hiçbirini istemedi.",
          },
          { type: "text", text: "Allah, bebeğin başka kadınların sütünü emmesini daha önceden engellemişti. Şehirden pek çok kadın saraya geldi ve hepsi aynı çaresizlikle geri döndü. Âsiye ne yapacağını bilemiyor, bebeğin ağlaması onu çok üzüyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-2/saray-salonu.jpg",
            alt: "Sütunlu, aydınlık bir saray salonunun ortasında ince örtülerle hazırlanmış boş bir beşik.",
          },
          { type: "text", text: "Bu sırada sarayın kapısında küçük bir kız sessizce bekliyordu. Bu kız, kardeşinin izini süren Hz. Musa'nın ablasıydı. Kardeşine yardım etmenin yolunu bulabilirdi, ama yanlış bir söz ikisinin de sırrını ortaya çıkarabilirdi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Ablası cesaretini topladı ve saraydakilere yaklaştı. Kim olduğunu belli etmeden, sakin bir sesle konuştu." },
          { type: "text", text: "— Size ona iyi bakacak, onun üstüne titreyecek bir aile göstereyim mi? dedi." },
          { type: "text", text: "Saraydakiler bu teklife hemen razı oldu, çünkü ellerinde başka hiçbir çare kalmamıştı." },
          { type: "text", text: "Ablası koşa koşa eve gitti ve annesine olanları bir bir anlattı. Annesi kızıyla birlikte hemen saraya geldi ve bebeği kucağına aldı. Bebek o anda sustu ve hiç yabancılık çekmeden onun sütünü emmeye başladı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-2/saraya-giden-yol.jpg",
            alt: "Gün ışığında nehir kıyısı boyunca saraya uzanan toprak bir yol ve tozda koşar adımlarla bırakılmış küçük ayak izleri.",
          },
          { type: "text", text: "Saraydakiler bu duruma hem çok şaşırdı hem de çok sevindi. Bebeğin bakımını hemen bu kadına verdiler; artık onu kendi annesi emzirecekti. Kur'an'da anlatıldığına göre Allah, gözü aydın olsun ve üzülmesin diye onu annesine geri vermişti." },
          { type: "text", text: "Annesinin gözleri sevinçle aydınlanmıştı, çünkü Allah'ın vaadinin gerçek olduğunu kendi gözüyle görmüştü. Bir zamanlar titreyen elleriyle nehre bıraktığı bebeği, şimdi yeniden onun yanındaydı. Ablasının yüreği de büyük bir sevinçle dolmuştu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-2/yumusak-ortu.jpg",
            alt: "Gün ışığında, sade bir yüzeyin üstünde özenle katlanmış yumuşak dokuma bir örtü ve yanında tek bir nilüfer çiçeği.",
          },
          { type: "text", text: "Ablası o gün hem cesur hem de çok dikkatliydi. Ne gereğinden fazla konuşmuş ne de korkup susmuştu. Doğru sözü doğru zamanda söylemiş ve kardeşini annesine kavuşturmuştu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-2/nilufer.jpg",
            alt: "Şafak ışığında nehir kıyısında yeni açmış tek bir nilüfer çiçeği.",
          },
        ],
        has_question: true,
        question: {
          title: "Annesine Dönen Bebek",
          prompt: "Küçük kardeşin okulda zor bir durumda kalmış. Ona yardım etmek için öğretmeninle konuşman gerekiyor, ama doğru sözü seçmek önemli. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Ne diyeceğimi bilemez, işi başkalarına bırakırdım.",
              comparison: "Ne diyeceğini bilememek çok olağan. Hz. Musa'nın ablası ise korkusunu yendi ve yardım edecek tek bir cümle söyledi.",
            },
            {
              id: "b",
              text: "Heyecanla her şeyi bir anda anlatır, durumu karıştırırdım.",
              comparison: "Heyecanlanmak çok doğal. Hz. Musa'nın ablası ise kimliğini belli etmeden, sakin bir teklifle kardeşine yardım etti.",
            },
            {
              id: "c",
              text: "Sakin olur, düşünüp yardımcı olacak sözü doğru zamanda söylerdim.",
              comparison: "Sen de Hz. Musa'nın ablası gibi davrandın. O da düşünerek konuştu ve kardeşinin annesine dönmesini sağladı.",
            },
          ],
        },
        learned: [
          "Doğru sözü sakin bir dille ve doğru zamanda söylemek, zor bir sorunu çözebilir.",
          "Âsiye bebeği çok sevdi ve “Onu öldürmeyin, gözümüzün aydınlığı olsun” dedi.",
          "Bebek hiçbir sütannenin sütünü emmedi; ablasının yardımıyla annesine kavuştu.",
        ],
      },
      {
        id: "3",
        title: "Bir Anlık Kavga",
        ozet: "Hz. Musa bir kavgaya karışır, istemeden bir adamın ölümüne yol açar; pişman olur ve Allah'a sığınır.",
        badgeName: "Doğru Taraf Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-3/kapak.jpg",
          alt: "Tepeden bakışla, bir yanda sarayın yeşil bahçeleri, öbür yanda sıkışık kerpiç mahalleler ve aralarından akan nehir.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar geçti ve Hz. Musa (a.s.) sarayda büyüyüp güçlü bir genç oldu. Sarayda yaşasa da kendi halkını hiç unutmamıştı ve İsrailoğullarının ağır işlerde ezildiğini gördükçe yüreği sızlıyordu.", dropCap: true },
          {
            type: "interactive_word",
            before: "Hz. Musa olgunluk çağına erişince Allah ona bilgi ve ",
            word: "hikmet",
            meaning: "Bilgiyi doğru yerde ve doğru biçimde kullanabilmektir.",
            after: " verdi. Kur'an'da bildirildiğine göre Allah, iyi davrananları işte böyle ödüllendirirdi. Hz. Musa artık olaylara daha dikkatle bakıyor, gördüklerini derin derin düşünüyordu.",
          },
          { type: "text", text: "Bir gün Hz. Musa, insanların pek dikkat etmediği sakin bir saatte şehre girdi. Dar bir sokakta birbiriyle kavga eden iki adam gördü. Adamlardan biri kendi halkındandı, öteki ise onlara eziyet eden taraftandı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-3/dar-sokak.jpg",
            alt: "Öğle sıcağında bomboş, dar bir şehir sokağı; yerde devrilmiş bir sepet ve dağılmış birkaç hurma.",
          },
          { type: "text", text: "Kendi halkından olan adam Hz. Musa'yı görünce bağırarak ondan yardım istedi. Hz. Musa onu korumak için öteki adama bir yumruk vurdu ve istemeden adamın ölümüne sebep oldu. Hz. Musa böyle bir sonucu hiç ama hiç istememişti." },
          { type: "text", text: "Hz. Musa olduğu yerde donup kaldı ve olanların ne kadar ağır olduğunu hemen anladı." },
          { type: "text", text: "— Bu, şeytanın işidir; o gerçekten insanı yoldan çıkaran apaçık bir düşmandır, dedi." },
          { type: "text", text: "Sonra hiç vakit kaybetmeden ellerini açıp Rabbine yöneldi." },
          { type: "text", text: "— Rabbim, ben kendime yazık ettim, beni bağışla, dedi. Allah da onun bu duasını kabul etti ve onu bağışladı." },
          { type: "text", text: "Hz. Musa o gün Rabbine yürekten bir söz verdi." },
          { type: "text", text: "— Rabbim, bana verdiğin nimetler hakkı için bundan sonra suçluların yanında asla durmayacağım, dedi." },
          { type: "text", text: "O gece gözüne hiç uyku girmedi ve şehirde korku içinde, etrafı gözetleyerek sabahladı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-3/sabaha-kadar-kandil.jpg",
            alt: "Karanlık bir odada pencere kenarında yanan küçük bir kandil ve dışarıda sabaha dönen mavi gökyüzü.",
          },
          { type: "text", text: "Sabah olunca sokaktan gelen tanıdık bir ses onu yerinden kaldırdı. Dün yardım isteyen adam bugün yine başka biriyle kavga ediyordu! Hz. Musa'yı görür görmez ona doğru seslendi ve bağıra bağıra yine yardım istedi." },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Musa bu sefer koşup kavgaya atılmadı, çünkü dün yaşananları ve Rabbine verdiği sözü hatırladı." },
          { type: "text", text: "— Belli ki sen yolunu şaşırmış, kavgadan hiç vazgeçmeyen birisin, dedi adama." },
          { type: "text", text: "Sonra Hz. Musa, kavgayı durdurmak için öteki adamı tutmaya yöneldi. Ama adam, kendisine vurulacağını sanıp korkuya kapıldı ve bağırmaya başladı." },
          { type: "text", text: "— Ey Musa, dün birinin ölümüne yol açtığın gibi bugün de beni mi öldürmek istiyorsun? dedi. Sen arayı düzeltmek değil, zorbalık etmek istiyorsun!" },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-3/sabah-sokagi.jpg",
            alt: "Sabah ışığında bir sokak kavşağı, havada asılı kalmış toz ve yere düşmüş bir su testisi.",
          },
          { type: "text", text: "Böylece dünkü olay herkesin önünde duyulmuş oldu ve haber kısa sürede şehrin ileri gelenlerine ulaştı. Çok geçmeden şehrin öbür ucundan bir adam koşarak geldi." },
          { type: "text", text: "— Ey Musa, ileri gelenler seni öldürmek için toplanıp konuşuyor, dedi. Hemen buradan git; inan bana, ben senin iyiliğini istiyorum." },
          { type: "text", text: "Hz. Musa korku içinde, etrafı gözetleyerek şehirden çıktı; arkasında büyüdüğü sarayı, annesini ve kardeşlerini bırakıyordu. Yürürken ellerini açtı ve Rabbine dua etti." },
          { type: "text", text: "— Rabbim, beni zalimler topluluğundan kurtar, dedi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-3/sehir-kapisi.jpg",
            alt: "Şafakta kalın taş duvarlı bir şehir kapısının aralığından görünen, çöle uzanan boş yol.",
          },
          { type: "text", text: "Hz. Musa bir hata yapmıştı, ama o hatadan kaçmamıştı. Pişman olmuş, Allah'tan bağışlanma dilemiş ve bir daha haksızın yanında durmayacağına söz vermişti. Ertesi sabah da sözünü hatırlamış ve kavgaya atılmak yerine kavgayı sürdüreni uyarmıştı." },
          { type: "text", text: "Şimdi önünde bilmediği, uzun ve yalnız bir çöl yolu vardı. Nereye gideceğini ve orada kimi bulacağını bilmiyordu. Ama kalbinde taşıdığı Rabbine güven, bu yolda onun en sadık yol arkadaşıydı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-3/col-yolu.jpg",
            alt: "Sabah güneşinde kum tepelerinin arasından ufka uzanan, ayak izli tek bir yol.",
          },
        ],
        has_question: true,
        question: {
          title: "Bir Anlık Kavga",
          prompt: "Teneffüste bir arkadaşın biriyle kavga ediyor ve seni de yanına çağırıyor. Ama kavganın nasıl başladığını bilmiyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Kavgaya karışmaz, arkadaşıma durmasını söyler ve bir öğretmenden yardım isterdim.",
              comparison: "Sen de Hz. Musa gibi davrandın. O da ikinci kez kavgaya atılmadı; dünkü olayı ve verdiği sözü hatırlayıp önce durdu.",
            },
            {
              id: "b",
              text: "Arkadaşım olduğu için hiç düşünmeden onun tarafını tutardım.",
              comparison: "Arkadaşını korumak istemen çok anlaşılır. Hz. Musa ise kimin haklı olduğunu düşünmeden atılmanın sonucunu bir gün önce görmüştü.",
            },
            {
              id: "c",
              text: "Görmemiş gibi yapıp hemen oradan uzaklaşırdım.",
              comparison: "Uzaklaşmak seni güvende tutar. Hz. Musa ise oradan ayrılmadı; durup sözünü hatırladı ve kavgayı sürdüren adamı uyardı.",
            },
          ],
        },
        learned: [
          "Hatayı kabul edip bağışlanma dilemek, aynı hataya dönmemenin ilk adımıdır.",
          "Hz. Musa istemeden bir adamın ölümüne yol açtı; hemen pişman olup Allah'a yöneldi.",
          "Ertesi gün kavgaya çağrıldığında “suçluların yanında durmayacağım” sözünü hatırladı.",
        ],
      },
      {
        id: "4",
        title: "Medyen'deki Kuyu",
        ozet: "Yorgun Hz. Musa, bekleyen iki kızın hayvanlarını karşılıksız sular; bu iyilik ona yeni bir yuva açar.",
        badgeName: "Karşılıksız İyilik Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-4/kapak.jpg",
          alt: "Sıcak bir çöl öğleden sonrasında, kum tepelerinin ardında ufukta beliren yeşil bir vaha ve hurma ağaçları.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hz. Musa (a.s.) günlerce çölün ortasında, yanında ne azık ne de yol gösteren biri olmadan yürüdü. Gündüzleri güneş tepesinde yakıyor, geceleri soğuk iliklerine işliyordu. Medyen şehrine doğru yöneldiğinde umutla Rabbine dua etti.", dropCap: true },
          { type: "text", text: "— Umarım Rabbim bana doğru yolu gösterir, dedi." },
          { type: "text", text: "Sonunda yorgun, aç ve tozlu bir hâlde Medyen'e vardı ve şehrin yakınındaki suyun başına geldi. Orada çobanlar birbirini iterek, bağırıp çağırarak kendi hayvanlarını suluyordu. Kimse kimseye yol vermiyor, herkes önce kendi sürüsünü düşünüyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-4/medyen-suyu.jpg",
            alt: "Taş kenarlı bir kuyunun çevresinde birbirine karışmış koyun ve keçi sürüleri, havada toz.",
          },
          { type: "text", text: "Kalabalığın biraz gerisinde iki kız, kendi hayvanlarını sudan uzakta tutmaya çalışıyordu. Sabırla bekliyor, çobanların arasına girip öne çıkmaya çalışmıyorlardı. Hz. Musa onlara yaklaştı ve ne olduğunu nazikçe sordu." },
          { type: "text", text: "— Neden burada bekliyorsunuz, derdiniz nedir?" },
          { type: "text", text: "— Çobanlar sulayıp çekilmeden biz hayvanlarımızı sulayamayız, dediler. Babamız çok yaşlı olduğu için bu iş bize kalıyor." },
          { type: "text", text: "Hz. Musa çobanlara baktı; hiçbiri acele etmiyor, kızlara da sıra vermeye niyetli görünmüyordu. Böyle giderse kızların sırası belki de akşama kadar gelmeyecekti." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-4/bekleyen-suru.jpg",
            alt: "Bir ağacın gölgesinde, kalabalıktan uzakta sabırla bekleyen küçük bir koyun sürüsü.",
          },
          { type: "text", text: "Hz. Musa'nın ise ayakta duracak hâli kalmamıştı, çünkü günlerdir doğru dürüst bir şey yememişti. Üstelik burası yabancı bir yerdi; kimseyi tanımıyor, kimseden bir şey bekleyemiyordu. Bir gölgeye çekilip dinlenebilir, yalnızca kendi derdine bakabilirdi. Ama o zaman bu iki kızın hâli ne olacaktı?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Musa yorgunluğunu bir kenara bıraktı ve kızların hayvanlarını alıp suya götürdü. Anlatılanlara göre kuyunun ağzındaki ağır taşı tek başına kaldırdı. Hayvanları kana kana suladı ve hiçbir şey söylemeden kızlara geri teslim etti." },
          { type: "text", text: "Sonra hiçbir karşılık beklemeden yakındaki bir ağacın gölgesine çekildi. Yorgundu, açtı ve bu yabancı ülkede başını sokacak bir yeri yoktu. Orada ellerini açıp içtenlikle Rabbine yalvardı." },
          { type: "text", text: "— Rabbim, bana göndereceğin her türlü hayra muhtacım, dedi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-4/agac-golgesi.jpg",
            alt: "Uzak planda, bir ağacın gölgesinde arkası dönük oturan ve yüzü görünmeyen bir yolcu; önünde sulanmış sürü.",
          },
          { type: "text", text: "Çok geçmeden kızlardan biri utana utana yürüyerek yanına geldi." },
          { type: "text", text: "— Babam, hayvanlarımızı suladığın için karşılığını vermek üzere seni çağırıyor, dedi." },
          { type: "text", text: "Hz. Musa da onunla birlikte, sözü edilen yaşlı babanın evine gitti. İslam inancına ve tarihî rivayetlere göre bu yaşlı baba Hz. Şuayb (a.s.) idi." },
          { type: "text", text: "Hz. Musa başından geçenleri yaşlı adama bir bir anlattı." },
          { type: "text", text: "— Korkma, artık o zalim topluluktan kurtuldun, dedi yaşlı adam." },
          { type: "text", text: "O sırada kızlardan biri de babasına dönüp söze karıştı." },
          { type: "text", text: "— Babacığım, onu yanında çalıştır; çalıştıracağın en iyi kişi güçlü ve güvenilir olandır, dedi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-4/yasli-babanin-avlusu.jpg",
            alt: "Akşam ışığında sade bir evin avlusu; ağaç altına serilmiş hasır, üstünde ekmek ve su testisi.",
          },
          {
            type: "interactive_word",
            before: "Yaşlı baba Hz. Musa'ya bir teklif yaptı; sekiz yıl yanında çalışırsa kızlarından birini onunla evlendirecekti. On yıla tamamlarsa bu da Hz. Musa'nın kendi iyiliği olacaktı. Hz. Musa kabul etti ve bunun ikisi arasında bir ",
            word: "sözleşme",
            meaning: "İki kişinin bir iş için anlaşıp uymaya söz verdiği karardır.",
            after: " olduğunu söyledi.",
          },
          { type: "text", text: "— Hangi süreyi tamamlarsam tamamlayayım bana haksızlık yok; söylediklerimize Allah şahittir, dedi." },
          { type: "text", text: "Böylece Hz. Musa kızlardan biriyle evlendi ve yıllarca Medyen'de çobanlık yaptı. Elinde uzun bir değnekle sürüyü otlaklara götürdü, akşam olunca geri getirdi. Kuyunun başında karşılık beklemeden yapılan küçük bir iyilik, ona yepyeni bir yuva açmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-4/otlaktaki-suru.jpg",
            alt: "Gün batımında yeşil bir yamaçta otlayan koyunlar ve bir kayaya dayalı duran uzun ahşap bir değnek.",
          },
        ],
        has_question: true,
        question: {
          title: "Medyen'deki Kuyu",
          prompt: "Uzun bir günün sonunda çok yorgunsun. Okul bahçesinde, ağır çantasını taşımakta zorlanan küçük bir çocuk görüyorsun. Kimse ona yardım etmiyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Ben de çok yorgun olduğum için görmezden gelirdim.",
              comparison: "Yorgunken dinlenmek istemek çok doğal. Hz. Musa ise yorgunluğuna rağmen iki kızın hayvanlarını suladı.",
            },
            {
              id: "b",
              text: "Yardım ederdim ama karşılığında ondan bir şey isterdim.",
              comparison: "Emeğinin karşılığını istemek anlaşılır bir şey. Hz. Musa ise sulamadan sonra hiçbir şey istemeden gölgeye çekildi.",
            },
            {
              id: "c",
              text: "Yorgunluğuma rağmen yardım eder, karşılık beklemezdim.",
              comparison: "Sen de Hz. Musa gibi davrandın. O da yorgunluğuna rağmen yardım etti ve karşılık beklemeden Allah'a dua etti.",
            },
          ],
        },
        learned: [
          "Karşılık beklemeden yapılan küçük bir iyilik, bazen hiç beklemediğimiz kapıları açar.",
          "Hz. Musa çok yorgun olduğu hâlde bekleyen iki kızın hayvanlarını sulayıp gölgeye çekildi.",
          "Yaşlı baba Hz. Musa'yı evine çağırdı; Hz. Musa onunla sözleşip yıllarca Medyen'de çobanlık yaptı.",
        ],
        gorev: {
          id: "musa-4-sessiz-iyilik",
          ad: "Sessiz Bir İyilik",
          kategori: "iyilik",
          aciklama: "Bu hafta evde ya da okulda, karşılığında hiçbir şey beklemeden birine yardım et. Bu iyiliği övünmek için anlatma; istersen akşam ailenle paylaşabilirsin.",
          sure: "Hafta içinde bir kez, yaklaşık 10–15 dakika",
          olcut: "Karşılığında bir şey istemeden birine en az bir kez yardım ettiysen görevi tamamladın.",
          guvenlikNotu: "Yardımını ailene, akrabalarına ya da tanıdığın arkadaşlarına yap. Tanımadığın yetişkinlere yaklaşma; emin olamadığın bir durumda bir büyüğüne danış.",
        },
      },
      {
        id: "5",
        title: "Vadideki Ateş",
        ozet: "Yolunu kaybeden Hz. Musa uzakta bir ateş görür; Tuvâ vadisinde Allah onu peygamber olarak seçer.",
        badgeName: "Çözülen Düğüm Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-5/kapak.jpg",
          alt: "Ay ışığında kayalık dağların arasından geçen ıssız bir yol ve uzakta kurulmuş küçük bir çadır.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Yıllar geçti ve Hz. Musa (a.s.) Medyen'de verdiği sözü eksiksiz tamamladı. Sonra ailesini yanına alıp Mısır'a doğru uzun bir yolculuğa çıktı. Bir gece ıssız bir vadide yolunu kaybetti; hava çok soğuktu ve çevrede ısınacak bir ateş yoktu.", dropCap: true },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-5/karanlik-vadi.jpg",
            alt: "Karanlık bir vadinin derinliğinde, çok uzakta küçük ve sıcak bir ateş ışığı.",
          },
          { type: "text", text: "Birden uzaklarda, karanlığın içinde parlayan bir ateş gördü ve ailesine döndü." },
          { type: "text", text: "— Siz burada bekleyin, ben bir ateş gördüm, dedi. Belki oradan ısınmanız için yanan bir ateş parçası getiririm ya da ateşin başında yol gösteren birini bulurum." },
          { type: "text", text: "Ateşe yaklaştığında vadinin sağ yanındaki ağacın tarafından ona seslenildi." },
          { type: "text", text: "— Ey Musa, ben, yalnızca ben senin Rabbinim, diye buyurdu Allah. Pabuçlarını çıkar, çünkü sen şimdi kutsal Tuvâ vadisindesin." },
          { type: "text", text: "Hz. Musa hemen pabuçlarını çıkardı ve büyük bir saygıyla dinlemeye başladı." },
          { type: "text", text: "— Ben seni seçtim; şimdi sana bildirilecek olana kulak ver, diye buyurdu Allah." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-5/cikarilan-pabuclar.jpg",
            alt: "Taşlı bir vadi zemininde yan yana çıkarılmış eski deri sandaletler; üzerlerine uzaktan sıcak bir ışık vuruyor.",
          },
          {
            type: "interactive_word",
            before: "Hz. Musa'nın elinde, yıllardır yanından ayırmadığı uzun bir değnek vardı. Yürürken dayanmak için kullanılan böyle değneklere ",
            word: "asa",
            meaning: "Yürürken dayanmak için kullanılan uzun değnektir.",
            after: " denirdi. Allah, o anda ona sağ elindekinin ne olduğunu sordu.",
          },
          { type: "text", text: "— O benim asamdır; ona dayanırım ve onunla koyunlarıma yaprak silkelerim, dedi Hz. Musa. Onunla başka birçok işimi de görürüm." },
          { type: "text", text: "— Onu yere at, ey Musa, diye buyurdu Allah." },
          { type: "text", text: "Hz. Musa asasını yere attı ve bir de ne görsün, asa kıvrılıp hızla kayan bir yılan oluvermişti! Hz. Musa bunu görünce korkuyla arkasına bakmadan geri döndü." },
          { type: "text", text: "— Tut onu ve korkma, biz onu hemen eski hâline döndüreceğiz, diye buyurdu Allah." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-5/yerdeki-asa.jpg",
            alt: "Ay ışığında taşlı zeminde uzanan sade ahşap bir asa ve çevresindeki kumda kıvrımlı izler.",
          },
          { type: "text", text: "Sonra Allah, elini koynuna sokmasını buyurdu ve Hz. Musa'nın eli hiçbir hastalık olmadan bembeyaz çıktı. Bunlar, Allah'ın izniyle Firavun'a gösterilecek apaçık işaretlerdi. Ardından Allah ona, kendisini bekleyen asıl görevi bildirdi." },
          { type: "text", text: "— Firavun'a git, çünkü o sınırı çok aştı, diye buyurdu." },
          { type: "text", text: "Bu sözleri duyunca Hz. Musa'nın içi bir anda kaygıyla doldu. Firavun'un şehrinden kaçalı yıllar olmuştu ve orada onu arayanlar vardı. Üstelik konuşurken dili düğümlenir gibi olur, sözlerini anlatmakta zorlanırdı. Bu kadar büyük bir görevi nasıl yerine getirecekti?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Musa görevden kaçmadı; zorlandığı şeyi Rabbine açıkça söyledi ve O'ndan yardım istedi." },
          { type: "text", text: "— Rabbim, gönlüme ferahlık ver ve işimi bana kolaylaştır, dedi. Dilimdeki düğümü çöz ki söylediklerimi iyi anlasınlar." },
          { type: "text", text: "— Ailemden birini bana yardımcı ver; kardeşim Hârûn benden daha açık ve düzgün konuşur, dedi Hz. Musa. Onunla gücümü artır, onu da bu görevime ortak et." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-5/yildizli-gece.jpg",
            alt: "Dağların üstünde açılan geniş, yıldızlı bir gökyüzü ve vadinin üzerinde yumuşak bir aydınlık.",
          },
          { type: "text", text: "Allah, Hz. Musa'nın içten gelen bu duasını kabul etti." },
          { type: "text", text: "— Ey Musa, dileğin sana verildi; seni kardeşinle destekleyeceğiz ve onlar size zarar veremeyecek, diye buyurdu." },
          { type: "text", text: "Allah ona, daha önce yaptığı iyilikleri de tek tek hatırlattı." },
          { type: "text", text: "Bir zamanlar annesine onu sandığa koyup nehre bırakmasını bildiren de Allah'tı. Onu annesinin kucağına geri döndüren, sonra da sıkıntıdan kurtarıp Medyen'e ulaştıran da O'ydu. Hz. Musa o gece hayatının hiçbir anında yalnız bırakılmadığını anladı." },
          { type: "text", text: "Hz. Musa sabaha karşı, kendisini bekleyen ailesinin yanına döndü. Elinde yine aynı asa vardı, ama artık her şey değişmişti. O gece vadiye ateş almak için gelmiş, peygamber olarak geri dönmüştü." },
          { type: "text", text: "Kalbindeki kaygı elbette bir anda tamamen geçmemişti. Ama o, korkusunu saklamamış ve zorlandığı yeri Rabbine açıkça söylemişti. Zayıf yanını bilip yardım istemek, onu bu yolda daha güçlü yapmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-5/kamp-atesi.jpg",
            alt: "Şafak sökerken küçük bir çadırın önünde yanan kamp ateşi ve çadıra dayalı sade bir asa.",
          },
        ],
        has_question: true,
        question: {
          title: "Vadideki Ateş",
          prompt: "Öğretmenin sana sınıfın önünde bir sunum yapma görevi verdi. Ama kalabalığın önünde konuşurken heyecanlanıyor, sözlerin karışıyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Bunu yapamayacağımı söyler, görevden vazgeçerdim.",
              comparison: "Zor bir görev insanı korkutabilir. Hz. Musa ise vazgeçmedi; zorlandığı yeri Rabbine söyleyip yardım istedi.",
            },
            {
              id: "b",
              text: "Zorlandığım yeri açıkça söyler, bir büyüğümden yardım ister ve hazırlanırdım.",
              comparison: "Sen de Hz. Musa gibi davrandın. O da dilindeki düğümü saklamadı, yardım istedi ve kardeşiyle desteklendi.",
            },
            {
              id: "c",
              text: "Kimseye bir şey söylemeden, hazırlanmadan çıkar ve idare etmeye çalışırdım.",
              comparison: "İdare etmeye çalışmak cesaret gibi görünebilir. Hz. Musa ise göreve başlamadan önce yardım istemeyi seçti.",
            },
          ],
        },
        learned: [
          "Zorlandığımız yeri söyleyip yardım istemek, bizi zayıf değil daha güçlü yapar.",
          "Hz. Musa vadide bir ateş gördü; orada Allah onu seçti, asası ve eli birer işaret oldu.",
          "Hz. Musa “Dilimdeki düğümü çöz, kardeşim Hârûn'u bana yardımcı ver” diye dua etti.",
        ],
        gorev: {
          id: "musa-5-yardim-iste",
          ad: "Yardım İstemeyi Dene",
          kategori: "öğrenme / duygu yönetimi",
          aciklama: "Zorlandığın bir işi seç: bir ödev, yeni bir beceri ya da öğrenmekte zorlandığın bir oyun olabilir. Bir büyüğüne tam olarak nerede zorlandığını anlat ve o işi birlikte çalışın.",
          sure: "Yaklaşık 20–30 dakika",
          olcut: "Zorlandığın bir konuda bir büyüğünden yardım isteyip onunla en az bir kez birlikte çalıştıysan görevi tamamladın.",
        },
      },
      {
        id: "6",
        title: "Saraydaki Soru",
        ozet: "Hz. Musa ile Hz. Hârûn, Firavun'a Rabbin her şeyi yaratan olduğunu anlatır; Firavun işaretlere sihir der.",
        badgeName: "Korkuyu Aşan Adım Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-6/kapak.jpg",
          alt: "Sabah sisi içinde nehir kıyısında uzanan büyük bir şehir, yüksek duvarlar ve uzakta dikilitaşlar.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Hz. Musa (a.s.) Mısır'a döndüğünde yalnız değildi. Allah, kardeşi Hz. Hârûn'u (a.s.) da peygamber olarak görevlendirmiş ve onu Hz. Musa'ya yardımcı yapmıştı. Şimdi önlerinde, birlikte yerine getirecekleri çok büyük bir görev vardı.", dropCap: true },
          { type: "text", text: "Allah onlara, Firavun'a birlikte gitmelerini ve onunla konuşmalarını buyurdu." },
          { type: "text", text: "— Firavun'a gidin, çünkü o sınırı çok aştı, diye buyurdu. Ona yumuşak bir dille konuşun; belki aklını başına toplar ya da içine bir korku düşer." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-6/uzak-saray.jpg",
            alt: "Taş döşeli geniş bir yolun sonunda, yüksek basamaklarla yükselen görkemli bir saray.",
          },
          { type: "text", text: "İki kardeş, yeryüzünün en güçlü hükümdarlarından birinin karşısına çıkacaklarını biliyordu." },
          { type: "text", text: "— Rabbimiz, onun bize kötülük etmesinden ya da daha da azmasından korkuyoruz, dediler." },
          { type: "text", text: "— Korkmayın, ben sizinle beraberim; her şeyi işitirim ve her şeyi görürüm, diye buyurdu Allah." },
          { type: "text", text: "Allah, onlara Firavun'un karşısında ne söyleyeceklerini de tek tek bildirmişti. İsrailoğullarını serbest bırakmasını ve onlara eziyet etmemesini isteyeceklerdi. Ona Rablerinden açık bir işaret getirdiklerini de söyleyeceklerdi. Allah onlara, kendisini anmakta gevşeklik göstermemelerini de öğütlemişti. İki kardeş de yol boyunca Rablerini hiç dillerinden düşürmedi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-6/buyuk-kapi.jpg",
            alt: "Devasa, kapalı ahşap ve bronz bir saray kapısı ve önündeki geniş taş basamağa düşen ince bir ışık şeridi.",
          },
          { type: "text", text: "Sonunda bir sabah iki kardeş sarayın büyük kapısının önünde durdu. Kapının ardında, bütün Mısır'ın önünde titrediği Firavun vardı. Hz. Musa yıllar önce bu şehirden korku içinde kaçmıştı. Şimdi o kapıdan girecek ve Firavun'a doğruyu kendi sarayında söyleyecekti." },
        ],
        continuationParagraphs: [
          { type: "text", text: "İki kardeş içeri girdi ve Firavun'un karşısında durdu. Hz. Musa sakin ve açık bir sesle konuştu." },
          { type: "text", text: "— Biz âlemlerin, yani var olan her şeyin Rabbinin elçileriyiz; İsrailoğullarını bizimle gönder ve onlara artık eziyet etme, dedi." },
          { type: "text", text: "Firavun, karşısındakinin kendi sarayında büyüyen o çocuk olduğunu hemen tanıdı." },
          { type: "text", text: "— Biz seni çocukken yanımızda büyütmedik mi, ömrünün nice yılını aramızda geçirmedin mi? dedi. Sonunda da o işi yaptın!" },
          { type: "text", text: "Hz. Musa ise geçmişini saklamadı ve dürüstçe cevap verdi." },
          { type: "text", text: "— O işi o zaman bilmeden yaptım, dedi. Sizden korkunca kaçtım; sonra Rabbim beni peygamber yaptı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-6/sutunlu-salon.jpg",
            alt: "Yüksek sütunlu, loş bir taht salonu; uzakta boş bir taht ve tavandaki pencereden süzülen tek ışık hüzmesi.",
          },
          { type: "text", text: "— Peki sizin Rabbiniz de kimmiş? diye sordu Firavun alaycı bir sesle." },
          { type: "text", text: "— Rabbimiz, her şeye yaratılışını veren, sonra ona yolunu gösterendir, dedi Hz. Musa. O, göklerin, yerin ve aradaki her şeyin Rabbidir." },
          { type: "text", text: "Firavun çevresindekilere dönüp alay etti ve onun aklını yitirdiğini söyledi." },
          { type: "text", text: "Bunun üzerine Firavun, doğru söylüyorsa ondan açık bir işaret göstermesini istedi. Hz. Musa asasını yere attı ve asa bir yılan oluverdi. Ardından elini çıkardı; eli bakanların gözü önünde bembeyaz parlıyordu." },
          {
            type: "interactive_word",
            before: "Ama Firavun gördüğüne inanmak istemedi ve bu işaretlere ",
            word: "sihir",
            meaning: "Gözleri aldatarak bir şeyi olduğundan farklı gösterme işidir.",
            after: " dedi. Oysa sihir yalnızca gözleri aldatırdı; Hz. Musa'nın gösterdikleri ise Allah'ın izniyle olan gerçek işaretlerdi.",
          },
          { type: "text", text: "— Bu çok bilgili bir sihirbaz ve sihriyle sizi yurdunuzdan çıkarmak istiyor, dedi Firavun." },
          { type: "text", text: "Firavun'un çevresindeki ileri gelenler, ülkenin bütün bilgili sihirbazlarını toplamasını önerdi. Firavun da Hz. Musa'dan bir buluşma günü belirlemesini istedi." },
          { type: "text", text: "— Buluşmamız Ziynet Günü olsun, insanlar kuşluk vakti toplansın, dedi Hz. Musa." },
          { type: "text", text: "Ziynet Günü, halkın süslenip meydanda toplandığı bir şenlik günüydü; kuşluk vakti ise güneşin iyice yükseldiği sabah saatleriydi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-6/dagilan-ulaklar.jpg",
            alt: "Akşamüstü, şehrin dışından farklı yönlere uzanan yollar ve her yolun üstünde uzaklaşan ince toz bulutları.",
          },
          { type: "text", text: "Saraydan çıkarken iki kardeşin kalbi hâlâ hızlı çarpıyordu. Ama korkularına rağmen o büyük kapıdan girmiş ve doğruyu yumuşak bir dille söylemişlerdi. Allah, söz verdiği gibi onlarla beraberdi; onları işitiyor ve görüyordu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-6/aksam-nehri.jpg",
            alt: "Akşam ışığında sakin akan nehir, kıyıdaki kumda yan yana uzanan iki sıra ayak izi ve arkada uzak sarayın silueti.",
          },
        ],
        has_question: true,
        question: {
          title: "Saraydaki Soru",
          prompt: "Okulda büyük bir öğrencinin, küçüklerin oyun alanını sürekli ellerinden aldığını görüyorsun. Ona bunun haksızlık olduğunu söylemek istiyorsun ama çekiniyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Bir öğretmene haber verir, onun yanında sakin ama açık bir dille konuşurdum.",
              comparison: "Sen de Hz. Musa ile Hz. Hârûn gibi davrandın. Onlar da Allah'a güvenip korkularına rağmen gittiler ve doğruyu sakince söylediler.",
            },
            {
              id: "b",
              text: "Korktuğum için hiçbir şey söylemez, olanları izlemekle yetinirdim.",
              comparison: "Böyle bir anda çekinmek çok anlaşılır. Hz. Musa ile Hz. Hârûn da korkmuştu, ama “Ben sizinle beraberim” sözüne güvenip gittiler.",
            },
            {
              id: "c",
              text: "Ona bağırır, herkesin önünde onu küçük düşürmeye çalışırdım.",
              comparison: "Haksızlığa kızmak çok doğal. Hz. Musa ise Firavun'a bile bağırmadı; Allah'ın buyurduğu gibi yumuşak bir dille konuştu.",
            },
          ],
        },
        learned: [
          "Korkmak doğaldır; korkuya rağmen doğruyu söylemeye gitmek gerçek bir cesarettir.",
          "Firavun “Seni biz büyütmedik mi?” deyince Hz. Musa geçmişini saklamadan dürüstçe cevap verdi.",
          "Firavun işaretlere sihir dedi ve sihirbazları Ziynet Günü'nde toplamaya karar verdi.",
        ],
      },
      {
        id: "7",
        title: "Ziynet Günü",
        ozet: "Büyük kalabalığın önünde sihirbazlar iplerini atar; Hz. Musa'nın asası gerçeği herkesin önüne çıkarır.",
        badgeName: "Gerçeği Kabul Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-7/kapak.jpg",
          alt: "Sabah güneşinde büyük bir meydana açılan geniş ve tertemiz bir şehir caddesi.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Sonunda Ziynet Günü geldi ve halk sabahın erken saatlerinden itibaren büyük meydana akın etti. Kuşluk vaktine kadar meydanın her köşesi süslenmiş insanlarla doldu. Ülkenin dört bir yanından toplanan sihirbazlar da oradaydı ve herkes ne olacağını merakla bekliyordu.", dropCap: true },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-7/ziynet-meydani.jpg",
            alt: "Kuşluk güneşinde, kenarları gölgelikler ve sütunlarla çevrili, ortası boş geniş kumlu bir meydan.",
          },
          { type: "text", text: "Sihirbazlar gösteriden önce Firavun'un yanına gidip bir ödül sözü istemişti." },
          { type: "text", text: "— Üstün gelen biz olursak bize mutlaka bir ödül vardır, değil mi? diye sormuşlardı." },
          { type: "text", text: "— Evet, üstelik o zaman en yakın adamlarımdan olacaksınız, demişti Firavun." },
          { type: "text", text: "Hz. Musa (a.s.) ile kardeşi Hz. Hârûn (a.s.) meydanın ortasında yan yana duruyordu. Hz. Musa sihirbazlara döndü ve onları içtenlikle uyardı." },
          { type: "text", text: "— Yazık size, Allah'a karşı yalan uydurmayın; yalan uyduran sonunda mutlaka kaybeder, dedi." },
          { type: "text", text: "Sihirbazlar bir süre kendi aralarında fısıldaşıp tartıştılar, sonra Hz. Musa'ya döndüler." },
          { type: "text", text: "— Ey Musa, önce sen mi atarsın, yoksa ilk atan biz mi olalım? dediler." },
          { type: "text", text: "— Hayır, önce siz atın, dedi Hz. Musa." },
          { type: "text", text: "Sihirbazlar ellerindeki ipleri ve değnekleri yere attılar ve o anda insanların gözleri büyülendi. İpler ve değnekler, kumun üstünde kıvrılıp kımıldıyormuş gibi görünmeye başladı. Kalabalık korkuyla geri çekildi ve Hz. Musa da içinde bir korku hissetti." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-7/kivrilan-ipler.jpg",
            alt: "Kumun üstüne saçılmış ipler ve ince değnekler; uzun gölgeleri kıvrılıyormuş gibi görünüyor.",
          },
          { type: "text", text: "— Korkma, üstün gelecek olan sensin; sağ elindekini at, diye buyurdu Allah." },
          { type: "text", text: "Hz. Musa asasını attı ve asa, sihirbazların uydurduğu her şeyi bir bir yakalayıp yuttu. Meydanda kıvrılıyormuş gibi görünen tek bir ip bile kalmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-7/sessiz-kum.jpg",
            alt: "Bomboş kalmış düz kum zemin; ortasında uzun bir gölge ve çevresinde dağılmış birkaç ip parçası.",
          },
          { type: "text", text: "Bütün meydanı derin bir sessizlik kapladı. Sihirbazlar donup kaldı, çünkü sihrin yalnızca bir göz aldatması olduğunu herkesten iyi biliyorlardı. Gördükleri ise sihir değildi. Ama Firavun tam karşılarında oturuyordu ve verdiği ödül sözü hâlâ kulaklarında çınlıyordu." },
          {
            type: "witness",
            witnessName: "",
            witnessLabel: "Kafiledeki bir çocuk",
            body: "Bugün Ziynet Günü'ydü ve ben de babamla meydandaydım. Her yer insan doluydu ve kuşluk güneşi şimdiden ısıtmaya başlamıştı. Sihirbazlar iplerini yere atınca kum sanki canlandı. İplerin bize doğru kıvrıldığını sandım ve babamın elini sıkıca tuttum. Ardından Hz. Musa asasını yere attı ve biraz sonra meydanda tek bir ip bile kalmadı. Sonra öyle bir sessizlik oldu ki kendi kalbimin sesini duydum. Herkes sihirbazlara bakıyordu. Onlar ne yapacak acaba? Bu gece uyuyabileceğimi hiç sanmıyorum.",
            isFictional: true,
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "Sihirbazlar hiç beklemeden, bütün kalabalığın gözü önünde secdeye kapandılar ve herkesin duyacağı bir sesle konuştular." },
          { type: "text", text: "— Âlemlerin Rabbine, Musa ile Hârûn'un Rabbine inandık, dediler." },
          {
            type: "interactive_word",
            before: "Gördükleri gerçek, kalplerindeki her şeyi bir anda değiştirmişti. Allah'a ve O'nun bildirdiklerine yürekten inanmaya ",
            word: "iman",
            meaning: "Allah'a ve O'nun bildirdiklerine yürekten inanmaktır.",
            after: " denir. Sihirbazlar artık bunu bütün kalpleriyle yaşıyor ve Firavun'un ödülünü hiç düşünmüyorlardı.",
          },
          { type: "text", text: "Firavun ise öfkeden yerinde duramadı." },
          { type: "text", text: "— Ben size izin vermeden mi ona inandınız? diye çıkıştı." },
          { type: "text", text: "Sonra onları çok ağır tehditlerle korkutmak istedi, ama sihirbazlar geri adım atmadı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-7/bos-meydan.jpg",
            alt: "İkindi ışığında boşalmaya başlamış meydan, bir basamağın üstünde devrilmiş altın bir kâse ve rüzgârda savrulan toz.",
          },
          { type: "text", text: "— Bize gelen bu apaçık işaretlere ve bizi yaratana seni asla tercih etmeyiz, dediler. Zararı yok, nasıl olsa hepimiz Rabbimize döneceğiz." },
          { type: "text", text: "Sonra ellerini açıp hep birlikte dua ettiler." },
          { type: "text", text: "— Rabbimiz, üzerimize sabır yağdır! dediler." },
          { type: "text", text: "O gün meydandakilerin çoğu Firavun'dan korktuğu için sustu. Ama Hz. Musa'nın kavminden az sayıda kişi de korkularına rağmen ona inandı. Gerçeği görmek bir şeydi, onu herkesin önünde kabul etmek ise bambaşka bir cesaretti." },
          { type: "text", text: "Sihirbazlar o sabah meydana Firavun'dan bir ödül almak için gelmişti. Akşam olduğunda ise bütün ödüllerden daha değerli bir şey bulmuşlardı. Gerçeği görmüş ve onu kalabalığın önünde, hiç çekinmeden kabul etmişlerdi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-7/ilk-yildiz.jpg",
            alt: "Alacakaranlıkta şehrin düz damlarının üstünde parlayan tek ve parlak bir akşam yıldızı.",
          },
        ],
        has_question: true,
        question: {
          title: "Ziynet Günü",
          prompt: "Sınıfta bir tartışma yapılıyor. Herkes senin tarafını tutuyor, ama konuştukça arkadaşının haklı olduğunu anlıyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "c",
          options: [
            {
              id: "a",
              text: "Haklı olduğu belli olsa da tarafımı tutanları bırakmaz, susardım.",
              comparison: "Arkadaşlarını kırmak istememen çok anlaşılır. Sihirbazlar ise Firavun'un ödülünü bile bırakıp gördükleri gerçeği söylediler.",
            },
            {
              id: "b",
              text: "Konuyu değiştirir, tartışmayı yarım bırakıp geçerdim.",
              comparison: "Tartışmayı bırakmak bazen kolay gelir. Sihirbazlar ise susmadı; gerçeği herkesin önünde açıkça kabul ettiler.",
            },
            {
              id: "c",
              text: "Herkesin önünde onun haklı olduğunu açıkça söylerdim.",
              comparison: "Sen de sihirbazlar gibi davrandın. Onlar da gerçeği görünce kalabalığın önünde onu açıkça kabul ettiler.",
            },
          ],
        },
        learned: [
          "Gerçeği görünce, herkesin önünde de olsa onu kabul etmek büyük bir cesarettir.",
          "Sihirbazların ipleri kıvrılıyormuş gibi göründü; Hz. Musa'nın asası onların uydurduklarını yuttu.",
          "Sihirbazlar ödülü bırakıp “Musa ile Hârûn'un Rabbine inandık” dediler.",
        ],
      },
      {
        id: "8",
        title: "Tutulmayan Sözler",
        ozet: "Mısır'a art arda işaretler gelir; Firavun her defasında söz verir, sıkıntı geçince sözünden döner.",
        badgeName: "İbret Alan Göz Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-8/kapak.jpg",
          alt: "Bulutlu bir sabahta nehir kıyısındaki tarlalar, uzakta şehir ve gökyüzünde ağır, gri bulutlar.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Ziynet Günü'nden sonra Firavun, Hz. Musa'ya (a.s.) inananlara daha da sert davranmaya başladı. İnananlar korkuyor ve geleceklerinden endişe ediyordu. Hz. Musa onları bir araya topladı ve sakin bir sesle konuştu.", dropCap: true },
          { type: "text", text: "— Allah'tan yardım isteyin ve sabredin; yeryüzü Allah'ındır, dedi." },
          { type: "text", text: "— Sen gelmeden önce de geldikten sonra da hep eziyet gördük, dediler." },
          { type: "text", text: "Hz. Musa onlara umut verdi ve Rablerinin onları bu zor günlerden kurtarabileceğini hatırlattı. Kardeşi Hz. Hârûn (a.s.) da her zaman onun yanındaydı." },
          {
            type: "interactive_word",
            before: "Bir süre sonra Mısır'da yağmurlar kesildi; tarlalar kurudu ve ürünler her yıl biraz daha azaldı. Allah bu zor günleri, Firavun ve adamları düşünüp ",
            word: "ibret",
            meaning: "Yaşanan bir olaydan ders çıkarmaktır.",
            after: " alsınlar diye göndermişti. Ama onlar iyi günlerde “Bu bizim hakkımızdır” diyor, kötü günlerde suçu Hz. Musa'ya yüklüyordu.",
          },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-8/kuru-tarla.jpg",
            alt: "Çatlamış toprakta kurumuş buğday sapları, boş bir sulama kanalı ve kenarda duran boş bir toprak küp.",
          },
          { type: "text", text: "Sıkıntı büyüyünce Firavun'un adamları Hz. Musa'nın yanına geldi." },
          { type: "text", text: "— Ey Musa, bizim için Rabbine dua et; bu sıkıntı kalkarsa sana inanacağız ve İsrailoğullarını seninle göndereceğiz, dediler." },
          { type: "text", text: "Hz. Musa dua etti ve sıkıntı kalktı. Ama sıkıntı geçer geçmez verilen söz de unutuldu." },
          { type: "text", text: "Sonra durmadan yağan yağmurlar ve büyük seller geldi; ardından çekirgeler tarlalara indi. Arkasından her yeri küçük böcekler sardı, sonra kurbağalar çoğaldı ve en sonunda sular kana döndü. Bunların her biri ayrı ayrı gelen birer işaretti." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-8/cekirge-bulutu.jpg",
            alt: "Yeşil tarlaların üstünde ufuktan yaklaşan, uzak ve koyu bir çekirge bulutu.",
          },
          { type: "text", text: "Her seferinde aynı şey oldu: Firavun'un adamları yalvarıyor, söz veriyor, sıkıntı geçince sözlerinden dönüyordu. Şimdi yine Hz. Musa'nın kapısına gelmiş, yine aynı sözleri tekrarlıyorlardı. Bu sefer verdikleri sözü tutacaklar mıydı?" },
        ],
        continuationParagraphs: [
          { type: "text", text: "Ama Firavun bu kez de sözünü tutmadı; üstelik halkını toplayıp böbürlenerek konuştu." },
          { type: "text", text: "— Mısır'ın mülkü benim değil mi, bu ırmaklar ayaklarımın altından akmıyor mu? dedi. Ben, söylediğini bile doğru dürüst anlatamayan bu adamdan daha iyi değil miyim?" },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-8/irmak-ve-saray.jpg",
            alt: "Akşam ışığında, kanallarla bölünmüş nehrin kıyısında yükselen görkemli bir sarayın terası.",
          },
          { type: "text", text: "Firavun, Hz. Musa'nın dilindeki düğümle alay ediyordu. Oysa Hz. Musa o düğümü yıllar önce Rabbine açıkça söylemiş ve O'ndan yardım istemişti. Asıl güç, kendini büyük gören Firavun'da değil, Allah'ın elindeydi." },
          { type: "text", text: "Kur'an'da bildirildiğine göre Allah, Hz. Musa'ya apaçık dokuz işaret vermişti. Firavun bunların her birini kendi gözüyle görmüştü. Her işaret ona yeni bir fırsat, yeni bir uyarıydı; ama o hiçbirinden ders almadı." },
          { type: "text", text: "Bu zor günlerde inananlar evlerinde bir araya geliyor, Rablerine dua edip birbirlerine güç veriyordu. Allah, Hz. Musa ile kardeşine evleri ibadet yeri yapmalarını bildirmişti." },
          { type: "text", text: "— Biz yalnız Allah'a güvenip dayandık, diyordu inananlar." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-8/kandilli-evler.jpg",
            alt: "Gece, bir mahallede yan yana kerpiç evlerin pencerelerinden süzülen sıcak kandil ışıkları.",
          },
          { type: "text", text: "Firavun pek çok kez söz verdi, ama hiçbirini tutmadı. Her sıkıntı ona bir uyarıydı, o ise sıkıntı geçince hepsini unutup gitti. Oysa sözünü tutmak, sıkıntı geçtikten sonra da aynı kararlılıkla devam edebilmekti." },
          { type: "text", text: "Mısır'da günler böyle geçerken inananların bekleyişi de sonuna yaklaşıyordu. Sabırla bekleyen bu insanlar, çok yakında hiç unutamayacakları büyük bir yolculuğa çıkacaklardı. O yolculukta sabırlarının karşılığını da göreceklerdi." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-8/safak-yolu.jpg",
            alt: "Şafak vakti şehrin dışından çöle doğru uzanan geniş ve boş bir yol.",
          },
        ],
        has_question: true,
        question: {
          title: "Tutulmayan Sözler",
          prompt: "Bir hatandan sonra annene “Bir daha yapmayacağım” diye söz verdin. Birkaç gün geçti, kimse bunu hatırlamıyor ve aynı şeyi yapmak yine aklına geldi. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Kimse hatırlamadığı için sözümü boş verirdim.",
              comparison: "Kimse hatırlamayınca sözü unutmak gerçekten kolaydır. Hikâye, verilen bir sözün asıl değerinin sıkıntı geçtikten sonra tutulduğunda ortaya çıktığını gösteriyor.",
            },
            {
              id: "b",
              text: "Sözümü hatırlar, kimse görmese de onu tutardım.",
              comparison: "Sen de verdiğin söze sahip çıktın. Hikâyede sıkıntı geçince verilen söz tutulmadı; sen ise sözünü kimse görmese de korudun.",
            },
            {
              id: "c",
              text: "Bir kez daha yapar, sonra yine söz verirdim.",
              comparison: "Yeniden söz vermek kolay gelebilir. Hikâye ise tutulmayan sözlerin her seferinde aynı sıkıntıyı geri getirdiğini, söz tutulmadıkça hiçbir şeyin değişmediğini gösteriyor.",
            },
          ],
        },
        learned: [
          "Verilen sözü tutmak, sıkıntı geçtikten sonra da aynı kararlılıkla devam edebilmektir.",
          "Firavun'un adamları her sıkıntıda “Rabbine dua et, inanacağız” dedi, sonra sözlerinden döndüler.",
          "Hz. Musa kavmine “Allah'tan yardım isteyin ve sabredin” diyerek onlara umut verdi.",
        ],
        gorev: {
          id: "musa-8-uc-gunluk-soz",
          ad: "Üç Günlük Söz",
          kategori: "sorumluluk",
          aciklama: "Ailenle birlikte küçük bir söz seç; örneğin oyuncaklarını toplamak ya da yatağını düzeltmek. Bu sözü üç gün boyunca her gün tut ve her akşam ailenle birlikte kontrol edin.",
          sure: "Üç gün, günde yaklaşık 5–10 dakika",
          olcut: "Seçtiğin sözü üç gün üst üste tuttuysan görevi tamamladın.",
        },
      },
      {
        id: "9",
        title: "Denizde Açılan Yol",
        ozet: "Önleri deniz, arkaları ordu iken Hz. Musa “Rabbim benimle beraberdir” der; deniz yarılır, yol açılır.",
        badgeName: "Açılan Yol Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-9/kapak.jpg",
          alt: "Yıldızlı bir gecede şehrin dışında açık kalmış bir kapı ve çöle doğru uzanan yol.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Mısır'da uzun ve zor günler geçmişti ki bir gece Allah, Hz. Musa'ya (a.s.) yeni bir emir bildirdi. Hz. Musa, inananları geceleyin sessizce yola çıkaracak ve onları Mısır'dan götürecekti. Allah ona, Firavun'un peşlerine düşeceğini ama onun kendilerine yetişmesinden korkmaması gerektiğini de bildirmişti.", dropCap: true },
          { type: "text", text: "İnananlar hemen hazırlandı, yanlarına taşıyabildiklerini alıp karanlıkta sessizce yola koyuldular. Kardeşi Hz. Hârûn (a.s.) da her zamanki gibi Hz. Musa'nın yanındaydı. Uzun bir kafile, gece boyunca yıldızların altında denize doğru yürüdü." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-9/ay-isiginda-izler.jpg",
            alt: "Ay ışığında kumda uzayıp giden sayısız ayak izi ve uzakta denizin parıltısı.",
          },
          {
            type: "interactive_word",
            before: "Kafiledekiler yıllardır başkalarının emriyle yaşamış ve hep en ağır işlerde çalışmıştı. Şimdi ilk kez kendi yollarını seçebilecekleri bir hayata doğru yürüyorlardı. İnsanın baskı altında kalmadan kendi seçimini yapabilmesine ",
            word: "özgürlük",
            meaning: "İnsanın baskı altında kalmadan kendi seçimini yapabilmesidir.",
            after: " denir ve onlar bunu hiç bu kadar yakın hissetmemişti.",
          },
          { type: "text", text: "Firavun ise onların gittiğini duyunca çok öfkelendi ve şehirlere adamlar gönderip askerlerini topladı." },
          { type: "text", text: "— Bunlar az sayıda bir topluluk, ama bize karşı öfkeyle dolular; biz ise tedbirli ve güçlüyüz, dedi." },
          { type: "text", text: "Sonra büyük bir orduyla onların peşine düştü." },
          { type: "text", text: "Güneş doğarken kafilenin arkasında, ufukta büyük bir toz bulutu belirdi. Firavun'un ordusu onlara yetişmişti! Önlerinde uçsuz bucaksız deniz, arkalarında yaklaşan ordu vardı." },
          { type: "text", text: "— İşte yakalandık! diye bağırdı Hz. Musa'nın yanındakiler." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-9/toz-bulutu.jpg",
            alt: "Gün doğarken, sahil kumlarının ardında ufukta yükselen büyük ve uzak bir toz bulutu.",
          },
          { type: "text", text: "Kafilede küçük çocuklar annelerine sarıldı, yaşlılar olduğu yere çöktü. Herkes çaresizlik içinde Hz. Musa'ya baktı. Kaçacak hiçbir yer görünmüyordu; şimdi ne olacaktı?" },
          {
            type: "witness",
            witnessName: "",
            witnessLabel: "Kafiledeki bir çocuk",
            body: "Dün gece hiç uyumadık. Annem elimi bırakmadı ve karanlıkta saatlerce yürüdük. Yıldızlar o kadar parlaktı ki sanki bize yolu gösteriyorlardı. Sabaha doğru deniz kokusunu duyunca çok sevindim. Ama güneş doğarken arkamızda kocaman bir toz bulutu yükseldi. Biri “Ordu geliyor!” diye bağırdı. Önümüzde deniz, arkamızda toz vardı. Bacaklarım titredi, ağlamamak için kendimi zor tuttum. Annem beni kendine çekti ve “Hz. Musa'ya bak” dedi. Herkes ona bakıyordu. Ben de baktım ve bekledim.",
            isFictional: true,
          },
        ],
        continuationParagraphs: [
          { type: "text", text: "Hz. Musa hiç tereddüt etmeden, herkesin duyacağı sakin bir sesle cevap verdi." },
          { type: "text", text: "— Asla, Rabbim benimle beraberdir; O bana bir çıkış yolu gösterecektir! dedi." },
          { type: "text", text: "O anda Allah, ona asasıyla denize vurmasını bildirdi. Hz. Musa asasını kaldırıp denize vurdu ve deniz hemen ikiye yarıldı. İki yanda sular koca birer dağ gibi yükseldi ve ortada kupkuru bir yol açıldı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-9/acilan-yol.jpg",
            alt: "İkiye yarılmış denizin ortasında uzanan kuru bir yol; yolun başında, arkası dönük, asasını kaldırmış küçük bir figür.",
          },
          { type: "text", text: "Kafile, iki su duvarının arasından açılan yolda yürümeye başladı. Su duvarları dimdik duruyor, sabah ışığı kenarlarında parlıyordu. Ayaklarının altındaki toprak kupkuruydu ve kimse geride kalmadı. Çocuklar, anneler, babalar ve yaşlılar, hep birlikte karşı kıyıya doğru ilerledi." },
          { type: "text", text: "Firavun ve ordusu da onların peşinden aynı yola girdi. İnananların hepsi karşı kıyıya geçtiğinde sular kapandı; Firavun ve ordusu boğuldu. Allah, Hz. Musa'yı ve yanındakilerin hepsini kurtardı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-9/sakin-deniz.jpg",
            alt: "Sabah ışığında yeniden durulmuş, geniş ve sakin bir deniz; kıyıya yumuşak dalgalar vuruyor.",
          },
          { type: "text", text: "Karşı kıyıda sabah güneşi her yeri aydınlatıyordu ve deniz yeniden sakinleşmişti. İnananlar, kendilerini kurtaran Rablerine yürekten şükrettiler; yıllardır bekledikleri kurtuluş sonunda gelmişti. Kur'an, Allah'ın onları büyük bir sıkıntıdan kurtardığını bildirir ve “Musa'ya ve Hârûn'a selam olsun” der." },
          { type: "text", text: "Önlerinde deniz, arkalarında ordu varken kaçacak hiçbir yer görünmüyordu. Ama Hz. Musa umudunu bir an bile yitirmemişti. Allah, kendisine güvenenlere denizin tam ortasında bir yol açmıştı. Nehre bırakılan küçük bir sandıkla başlayan yolculuk, şimdi denizde açılan bir yolla yeni bir sabaha ulaşmıştı." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-9/karsi-kiyi.jpg",
            alt: "Gün doğarken denizden çıkıp kıyıdaki tepeye doğru yükselen sayısız ayak izi.",
          },
        ],
        has_question: true,
        question: {
          title: "Denizde Açılan Yol",
          prompt: "Ailenle bir yolculuktasın ve kötü hava yüzünden yolda kaldınız. Çok korkuyorsun. Annen ve baban “Sakin olalım, bir çıkış yolu bulacağız” diyor. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "a",
          options: [
            {
              id: "a",
              text: "Derin bir nefes alır, onlara güvenir ve söylediklerini yapardım.",
              comparison: "Sen de kafiledekiler gibi güvenmeyi seçtin. Onlar da korkularına rağmen Hz. Musa'nın sözüne güvenip açılan yolda yürüdüler.",
            },
            {
              id: "b",
              text: "Korkuyla ağlar, kimseyi dinlemezdim.",
              comparison: "Korkunca ağlamak çok doğal. Kafiledekiler de çok korkmuştu; Hz. Musa'nın “Rabbim benimle beraberdir” sözü onlara güç verdi.",
            },
            {
              id: "c",
              text: "“Artık her şey bitti” diye düşünüp umudumu kaybederdim.",
              comparison: "Böyle bir anda umut kaybolmuş gibi görünebilir. Hz. Musa ise “Asla, Rabbim benimle beraberdir” dedi ve çıkış yolunun geleceğine güvendi.",
            },
          ],
        },
        learned: [
          "Hiçbir çıkış görünmediğinde bile Allah'a güvenmek, insana umut ve güç verir.",
          "Önleri deniz, arkaları ordu iken Hz. Musa “Asla, Rabbim benimle beraberdir” dedi.",
          "Hz. Musa asasıyla denize vurdu, deniz yarıldı ve inananlar kuru bir yoldan karşıya geçti.",
        ],
      },
      {
        id: "10",
        title: "İki Denizin Buluştuğu Yer",
        ozet: "Hz. Musa öğrenmek için yola çıkar; Hızır'la yolculuk ona her şeyin sebebini bilemeyeceğimizi gösterir.",
        badgeName: "Öğrenen Yolcu Rozeti",
        coverIllustration: {
          src: "/kitaplar/hz-musa/bolum-10/kapak.jpg",
          alt: "Sabah ışığında kayalık bir sahil boyunca uzanan, deniz kenarında kıvrılan ıssız bir patika.",
        },
        illustrationMode: "sparse",
        paragraphs: [
          { type: "text", text: "Bir zaman Hz. Musa (a.s.), genç bir yol arkadaşıyla birlikte yeni bir yolculuğa çıktı. Bu kez bir şey öğrenmek için yola düşmüştü.", dropCap: true },
          { type: "text", text: "— İki denizin buluştuğu yere varmadıkça durmayacağım; gerekirse yıllarca yürürüm, dedi." },
          {
            type: "interactive_word",
            before: "Hz. Musa çok şey bilen bir peygamberdi, ama öğrenmeyi hiçbir zaman bırakmamıştı. Sorarak, araştırarak ve yolculuk ederek ",
            word: "ilim",
            meaning: "Araştırıp öğrenerek edinilen bilgidir.",
            after: " öğrenmeye hep hevesliydi. Bu yolculuğun sonunda, Allah'ın kendisine özel bir rahmet ve bilgi verdiği bir kulla karşılaşacaktı.",
          },
          { type: "text", text: "Yolculuk için yanlarına azık olarak bir balık almışlardı. İki denizin buluştuğu yere vardıklarında bir kayanın yanında biraz dinlendiler. Balık o sırada şaşılacak bir biçimde denize atlayıp yolunu tuttu. Genç bunu gördü, ama Hz. Musa'ya söylemeyi unuttu." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-10/kaya-ve-deniz.jpg",
            alt: "Büyük bir kayanın dibinde, iki farklı renkteki suyun buluştuğu yer ve suda kıvrılarak uzaklaşan ince bir iz.",
          },
          { type: "text", text: "Bir süre daha yürüdüler ve iyice yoruldular." },
          { type: "text", text: "— Yemeğimizi getir, bu yolculuk bizi çok yordu, dedi Hz. Musa." },
          { type: "text", text: "— Kayanın yanında dinlenirken balığı unuttum; balık denize atlayıp gitti, dedi genç." },
          { type: "text", text: "— İşte aradığımız yer orasıydı! dedi Hz. Musa." },
          { type: "text", text: "İkisi hemen kendi izlerini takip ederek kayaya geri döndüler." },
          { type: "text", text: "Kayanın yanında, Allah'ın rahmet ve bilgi verdiği o kulu buldular. İslam inancına ve tarihî rivayetlere göre bu kulun adı Hızır'dı. Hz. Musa ona yaklaştı ve nazikçe sordu." },
          { type: "text", text: "— Sana öğretilen doğru bilgiden bana da öğretmen için seninle geleyim mi?" },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-10/kiyidaki-izler.jpg",
            alt: "Islak kumda gidip geri dönen iki sıra ayak izi ve kayanın yanında başlayan üçüncü bir iz.",
          },
          { type: "text", text: "— Sen benimle sabredemezsin; iç yüzünü bilmediğin bir şeye nasıl sabredersin? dedi Hızır." },
          { type: "text", text: "— İnşallah beni sabırlı bulacaksın ve hiçbir işte sana karşı gelmeyeceğim, dedi Hz. Musa." },
          { type: "text", text: "— Öyleyse ben anlatmadan bana hiçbir şey sorma, dedi Hızır." },
          { type: "text", text: "Birlikte yola çıktılar ve bir gemiye bindiler. Anlatılanlara göre gemideyken bir serçe gelip gagasıyla denizden bir damla su aldı. Hızır'ın da, insanların bilgisinin Allah'ın ilmi yanında bu damla kadar bile olmadığını söylediği anlatılır." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-10/serce-ve-damla.jpg",
            alt: "Geniş denizin üstünde alçaktan uçan bir serçe ve gagasından düşen tek bir parlak su damlası.",
          },
          { type: "text", text: "Bir süre sonra Hızır, geminin bir tahtasını söküp gemiyi deldi. Hz. Musa yerinden fırladı, çünkü bu gemideki insanlar zarar görebilirdi. İçinde, verdiği söz ile kocaman bir soru çarpışıyordu." },
        ],
        continuationParagraphs: [
          { type: "text", text: "— İçindekileri boğmak için mi onu deldin? Gerçekten kötü bir iş yaptın! dedi Hz. Musa." },
          { type: "text", text: "— Ben sana, benimle sabredemezsin demedim mi? dedi Hızır." },
          { type: "text", text: "Hz. Musa sözünü hatırladı ve özür diledi." },
          { type: "text", text: "— Unuttuğum şey yüzünden beni kınama ve işimi zorlaştırma, dedi." },
          { type: "text", text: "Yolculuk sürdü ve bir süre sonra ikinci bir olay Hz. Musa'yı daha da çok üzdü. Hızır'ın yaptığı şey ona çok yanlış göründü ve hemen itiraz etti. Hızır ona, verdiği sözü bir kez daha hatırlattı." },
          { type: "text", text: "— Bundan sonra sana bir şey daha sorarsam artık benimle arkadaşlık etme, dedi Hz. Musa." },
          { type: "text", text: "Sonunda bir şehre vardılar ve oradakilerden yemek istediler, ama kimse onları misafir etmedi. Şehirde yıkılmak üzere olan bir duvar gördüler ve Hızır o duvarı hemen düzeltti." },
          { type: "text", text: "— İsteseydin bunun için bir ücret alabilirdin, dedi Hz. Musa." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-10/duzelen-duvar.jpg",
            alt: "Akşam ışığında yeni düzeltilmiş, dimdik duran eski bir taş duvar ve dibinde taze harç izleri.",
          },
          { type: "text", text: "— İşte burada yollarımız ayrılıyor; şimdi sana sabredemediğin şeylerin iç yüzünü anlatacağım, dedi Hızır." },
          { type: "text", text: "Gemi, denizde çalışarak geçimini sağlayan yoksul insanlarındı. Gidecekleri yerde sağlam gemileri zorla ele geçiren bir kral vardı. Hızır gemiyi kusurlu yapmıştı ki onların elinden alınmasın." },
          { type: "text", text: "Hızır ikinci olayın sebebini de anlattı; onun da Allah'ın bildiği bir sebebi vardı. Duvar ise iki yetim çocuğundu ve altında onlara ait bir hazine saklıydı. Babaları iyi bir insandı; Allah, çocuklar büyüyüp hazinelerini kendileri çıkarsın istemişti." },
          { type: "text", text: "— Bunları kendiliğimden yapmadım; hepsi Rabbinden bir rahmetti, dedi Hızır." },
          {
            type: "image",
            src: "/kitaplar/hz-musa/bolum-10/ayrilan-yollar.jpg",
            alt: "Gün batımında deniz kıyısında ikiye ayrılan bir yol; biri kıyı boyunca, öbürü tepelere doğru uzanıyor.",
          },
          { type: "text", text: "Hz. Musa o yolculukta çok önemli bir şey öğrenmişti. İnsanın bilgisi ne kadar çok olursa olsun, her şeyin sebebini bilemezdi; tıpkı anlatılan o serçenin aldığı damla gibi. Bilmediği bir şey karşısında sabretmek ve öğrenmeye açık kalmak gerekiyordu." },
          { type: "text", text: "Nehre bırakılan küçük bir sandıkla başlayan bu hayat, Hz. Musa'ya öğrenmenin de uzun bir yolculuk olduğunu göstermişti. Bilgisi ne kadar çoğalırsa çoğalsın, o yolculuk hiçbir zaman bitmeyecekti." },
        ],
        has_question: true,
        question: {
          title: "İki Denizin Buluştuğu Yer",
          prompt: "Öğretmenin sınıfta bir etkinlik yaptırıyor ve sebebini sonra anlatacağını söylüyor. Sen ne işe yarayacağını anlamıyorsun. Ne yaparsın?",
          afterChoiceNote: "Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.",
          correctOption: "b",
          options: [
            {
              id: "a",
              text: "Hemen itiraz eder, anlamadığım için yapmayı reddederdim.",
              comparison: "Sebebini bilmeden bir şeye itiraz etmek çok anlaşılır. Hz. Musa da itiraz etti, ama sonunda iç yüzünü öğrenince sabrın değerini gördü.",
            },
            {
              id: "b",
              text: "Sabırla katılır, uygun bir zamanda sebebini nazikçe sorardım.",
              comparison: "Sen de sabırla katılıp sonra sormayı seçtin. Hikâyede Hızır da sebepleri en sonunda tek tek anlattı.",
            },
            {
              id: "c",
              text: "Hiç düşünmeden yapar, ne öğrendiğimle ilgilenmezdim.",
              comparison: "Bir şeyi düşünmeden yapmak kolaydır. Hz. Musa ise öğrenmek için hem dinledi hem de anlamak için sormaktan vazgeçmedi.",
            },
          ],
        },
        learned: [
          "Ne kadar çok şey bilirsek bilelim, öğrenmeye ve sabretmeye her zaman ihtiyacımız vardır.",
          "Hz. Musa öğrenmek için yola çıktı ve iki denizin buluştuğu yerde Hızır diye bilinen kulu buldu.",
          "Hızır, ayrılırken gemi ve duvar gibi olayların sebebini Hz. Musa'ya tek tek anlattı.",
        ],
        gorev: {
          id: "musa-10-bir-soru-sor",
          ad: "Bir Soru, Bir Cevap",
          kategori: "öğrenme",
          aciklama: "Merak ettiğin ama cevabını bilmediğin bir şey seç. Bunu evdeki bir büyüğüne ya da öğretmenine sor ve cevabı sabırla dinle. Akşam öğrendiğini ailene anlat.",
          sure: "Yaklaşık 15–20 dakika",
          olcut: "Bir büyüğüne bir soru sorup öğrendiğini akşam ailene anlattıysan görevi tamamladın.",
          guvenlikNotu: "Sorunu ailene, akrabalarına ya da öğretmenine sor; internette tanımadığın kişilere soru sorma.",
        },
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
