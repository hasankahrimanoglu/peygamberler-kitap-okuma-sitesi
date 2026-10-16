/**
 * BÜYÜK FİNAL TESTİ VERİSİ
 *
 * Kitapların final testi soruları burada tutulur (PROJE-MODELI.md 7.1).
 * Bölüm metinleri, "Sen Olsaydın" ve rozet adları `books.ts` içindedir;
 * final testi soruları BURADADIR — ikisi karıştırılmaz.
 *
 * Kural (YENI-KITAP-ICERIK-URETIM-BRIFI.md §9): soru sayısı bölüm sayısına
 * eşittir ve her bölümden tam olarak 1 soru gelir. Doğru şıklar A/B/C
 * arasında dengeli dağılır. Yeni kitap eklerken bu dosya da güncellenir.
 */

export type QuizOption = {
  id: "a" | "b" | "c";
  text: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  correctOption: QuizOption["id"];
};

export type QuizConfig = {
  label: string;
  questions: QuizQuestion[];
  storagePrefix: string;
  keywords: string[];
};

const ademQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Âdem'in yeryüzündeki sorumluluğu neyi gerektiriyordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yeryüzündeki her şeyi istediği gibi kullanmayı" },
      { id: "b", text: "Kendisine verilen imkânları iyilikle ve özenle kullanmayı" },
      { id: "c", text: "Hiçbir varlıktan yardım almamayı" },
    ],
  },
  {
    id: 2,
    question: "İsimlerin öğretilmesi insana verilen hangi armağanı gösterdi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Hiç yorulmama özelliğini" },
      { id: "b", text: "Başkalarından üstün olma hakkını" },
      { id: "c", text: "Öğrenme, düşünme ve bilgisini paylaşma yeteneğini" },
    ],
  },
  {
    id: 3,
    question: "Kur'an'a göre yasak ağacın türü neydi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Türü açıklanmamıştır." },
      { id: "b", text: "Elma ağacıydı." },
      { id: "c", text: "Buğday ağacıydı." },
    ],
  },
  {
    id: 4,
    question: "Şeytan yasak ağaç konusunda kimi aldattı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yalnızca Hz. Havva'yı" },
      { id: "b", text: "Hz. Âdem ile Hz. Havva'yı birlikte" },
      { id: "c", text: "Yalnızca melekleri" },
    ],
  },
  {
    id: 5,
    question: "Hz. Âdem ile Hz. Havva hatalarını anlayınca ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Birbirlerini suçladı." },
      { id: "b", text: "Hatalarını sakladı." },
      { id: "c", text: "Sorumluluklarını kabul edip Allah'tan bağışlanma istedi." },
    ],
  },
  {
    id: 6,
    question: "Hz. Âdem ile Hz. Havva'nın yeryüzünde nereye indirildiği hakkında ne biliyoruz?",
    correctOption: "a",
    options: [
      { id: "a", text: "Kur'an kesin bir yer bildirmez." },
      { id: "b", text: "İkisinin de aynı şehre indiği kesin olarak bilinir." },
      { id: "c", text: "Yolculuklarının bütün durakları Kur'an'da yazılıdır." },
    ],
  },
  {
    id: 7,
    question: "Öfkenin büyüdüğünü fark eden birinin yapabileceği en doğru şey nedir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Durmak, uzaklaşmak ve güvendiği bir yetişkinden yardım istemek" },
      { id: "b", text: "Öfkesini karşısındaki kişiden çıkarmak" },
      { id: "c", text: "Öfkesini kimseye söylemeden içinde büyütmek" },
    ],
  },
  {
    id: 8,
    question: "Hz. Âdem'in bıraktığı en değerli miras neydi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Kesin yeri bilinen büyük bir yapı" },
      { id: "b", text: "Yeryüzündeki bütün eşyalar" },
      { id: "c", text: "Doğru bilgi, tövbe örneği ve güzel değerler" },
    ],
  },
];

// Hz. Şît — KITAP-HZ-SIT-FINAL.md §E. Dört bölümün her birinden bir soru;
// doğru harf dağılımı A=2 · B=1 · C=1.
const sitQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Âdem'in kurduğu duvarın her sarsıntıda dağılmasının sebebi neydi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Duvar çok yüksek yapılmıştı." },
      { id: "b", text: "Taşları birbirine tutturan hiçbir şey yoktu." },
      { id: "c", text: "Kullanılan taşlar çok küçüktü." },
    ],
  },
  {
    id: 2,
    question: "Hazura, Şît hakkında anlatılanların doğru olup olmadığını nasıl öğrendi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Gidip kendi gözüyle baktı." },
      { id: "b", text: "Anlatanlara olduğu gibi inandı." },
      { id: "c", text: "Daha çok kişiye sorup oyladı." },
    ],
  },
  {
    id: 3,
    question: "Şît, taşları birbirine tutturan çözümü nereden ilham alarak buldu?",
    correctOption: "c",
    options: [
      { id: "a", text: "Uzaktan gelen bir yolcunun anlattıklarından." },
      { id: "b", text: "Çocukken duyduğu bir masaldan." },
      { id: "c", text: "Kuruyan toprakla kaynayan kayalardan ve kırlangıç yuvalarından." },
    ],
  },
  {
    id: 4,
    question: "İnsanlar Kâbe'nin taşlarına dokunmak istemeyince Hz. Şît ne yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Kimseyi zorlamadı; isteğini anlattı ve bekledi." },
      { id: "b", text: "Herkese kızdı ve köyden ayrıldı." },
      { id: "c", text: "Kimseye söylemeden, geceleri tek başına yaptı." },
    ],
  },
];

// Hz. İdrîs — KITAP-HZ-IDRIS-ICERIK-final.md §E. Dört bölümün her birinden
// bir soru; doğru harf dağılımı A=2 · B=1 · C=1.
const idrisQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "İdrîs, yapraktan yaptığı gölgeliği neden hemen herkese anlatmak istemedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Mişke anlatmasını istemediği için" },
      { id: "b", text: "Yapraklar çok ağır olduğu için" },
      { id: "c", text: "Herkes koparınca ağaçların tükeneceğini düşündüğü için" },
    ],
  },
  {
    id: 2,
    question: "Öğrencilerinden biri konuyu anlamayınca İdrîs ne yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Aynı şeyi başka bir yoldan yeniden anlattı" },
      { id: "b", text: "Diğerleri sıkılmasın diye konuyu geçti" },
      { id: "c", text: "Öğrenciyi dersten çıkardı" },
    ],
  },
  {
    id: 3,
    question: "Altı ayın sonunda İdrîs'in elinde ne vardı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hiçbir şey yoktu" },
      { id: "b", text: "Bir karış büyüklüğünde bir bez" },
      { id: "c", text: "Bir sandık dolusu bez" },
    ],
  },
  {
    id: 4,
    question: "Halk, İdrîs “sabredin” deyince neden ona çabucak güvendi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Çünkü İdrîs asla yalan söylemezdi" },
      { id: "b", text: "Çünkü kalabalık onu zorlamıştı" },
      { id: "c", text: "Çünkü başka çareleri kalmamıştı" },
    ],
  },
];

// Hz. Nûh — KITAP-HZ-NUH-ICERIK-final.md §E. Sekiz bölümün her birinden
// bir soru; doğru harf dağılımı A=3 · B=2 · C=3.
const nuhQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Komşuları Nûh'tan bir put yapmasını isteyince Nûh ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Hemen en güzel putu yapıp onlara verdi" },
      { id: "b", text: "Komşularına kızıp onları evinden çıkardı" },
      { id: "c", text: "Ellerini tapılacak bir şey yapmak için kullanmayacağını söyledi" },
    ],
  },
  {
    id: 2,
    question: "Hz. Nûh yolcuya neden “Sen kömürün içinde kalmış bir elmas gibisin” dedi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yolcunun çok zengin olduğunu düşündüğü için" },
      { id: "b", text: "Ona, Allah'ın yarattığı değerli bir insan olduğunu hatırlatmak için" },
      { id: "c", text: "Yolcudan değerli bir taş satın almak istediği için" },
    ],
  },
  {
    id: 3,
    question: "Şehrin ileri gelenleri Hz. Nûh'tan ne istedi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Ona inanan yoksulları yanından kovmasını" },
      { id: "b", text: "Evlerine yeni kapılar yapmasını" },
      { id: "c", text: "Şehirden uzaklara gitmesini" },
    ],
  },
  {
    id: 4,
    question: "Çoğu insan onu dinlemediği hâlde Hz. Nûh ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Çağırmayı bıraktı ve evine çekildi" },
      { id: "b", text: "Yalnızca zenginlerle konuşmaya başladı" },
      { id: "c", text: "Yıllarca gece gündüz çağırmayı sürdürdü" },
    ],
  },
  {
    id: 5,
    question: "Hz. Nûh gemiyi neyle yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Yıllardır büyüyen ağaçtan biçilen tahtalar ve çivilerle" },
      { id: "b", text: "Taşlarla ve kerpiçle" },
      { id: "c", text: "Hayvan derileri ve iplerle" },
    ],
  },
  {
    id: 6,
    question: "Hz. Nûh herkesi gemiye çağırırken ne dedi?",
    correctOption: "b",
    options: [
      { id: "a", text: "“En hızlı koşan önce binsin.”" },
      { id: "b", text: "“Bu geminin akışı da duruşu da Allah'ın adıyladır.”" },
      { id: "c", text: "“Bu gemiyi ben yaptım, bana güvenin.”" },
    ],
  },
  {
    id: 7,
    question: "Hz. Nûh oğluna “Bizimle bin” diye seslendiğinde oğlu ne cevap verdi?",
    correctOption: "c",
    options: [
      { id: "a", text: "“Hemen geliyorum babacığım.”" },
      { id: "b", text: "“Beni bekleyin, eşyalarımı alayım.”" },
      { id: "c", text: "“Yüksek bir dağa çıkarım, o beni sudan korur.”" },
    ],
  },
  {
    id: 8,
    question: "Gemi dağa oturunca Hz. Nûh'un ilk işi ne oldu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Kendilerini kurtaran Allah'a hamd edip şükretti" },
      { id: "b", text: "Gemiyi söküp tahtalarından ev yaptı" },
      { id: "c", text: "Hemen yeni bir yolculuğa çıktı" },
    ],
  },
];

// Hz. Musa — KITAP-HZ-MUSA-ICERIK-final.md §E. On bölümün her birinden
// bir soru; doğru harf dağılımı A=4 · B=3 · C=3.
const eyyubQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Eyyûb, kapısına gelen konuklara ve açlara nasıl davranırdı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Onları başka bir köye gönderirdi" },
      { id: "b", text: "Yalnızca tanıdıklarını sofrasına alırdı" },
      { id: "c", text: "Kimseyi geri çevirmez, sofrasını onlarla paylaşırdı" },
    ],
  },
  {
    id: 2,
    question: "İlk kötü haber geldiğinde Hz. Eyyûb'un “Mülk Allah'ındır” demesi bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Sürülerini kaybettiğine hiç üzülmediğini" },
      { id: "b", text: "Zor bir haber karşısında ilk anda bile Allah'a güvendiğini" },
      { id: "c", text: "Kaybettiklerini hemen geri almak istediğini" },
    ],
  },
  {
    id: 3,
    question: "Hz. Eyyûb hastalanıp “Sen de git, kendini yorma” dediğinde eşi ne yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Yanından ayrılmadı; her gün su taşıyıp yemeğini hazırladı" },
      { id: "b", text: "Köye dönüp onu bir daha görmeye gelmedi" },
      { id: "c", text: "Hekim bulmak için uzak bir şehre gitti" },
    ],
  },
  {
    id: 4,
    question: "Genç dostun, Hz. Eyyûb'u suçlayan arkadaşlarına verdiği cevaptan ne öğreniriz?",
    correctOption: "c",
    options: [
      { id: "a", text: "Hasta birini hiç ziyaret etmemek gerektiğini" },
      { id: "b", text: "Kırıcı bir sözü herkesin önünde tekrar etmek gerektiğini" },
      { id: "c", text: "Zor durumdaki birini suçlamak yerine onun yanında durmak gerektiğini" },
    ],
  },
  {
    id: 5,
    question: "Hz. Eyyûb ayağını yere vurunca ne oldu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Gökyüzünden yağmur yağmaya başladı" },
      { id: "b", text: "Serin bir pınar kaynadı; o da yıkanıp içti ve iyileşti" },
      { id: "c", text: "Köydeki herkes onu görmek için koşup geldi" },
    ],
  },
];

const musaQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Musa'nın annesi bebeğini neden bir sandıkla nehre bıraktı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Bebeğin nehirde yüzmeyi öğrenmesini istediği için" },
      { id: "b", text: "Sandığı uzaktaki bir şehre göndermek istediği için" },
      { id: "c", text: "Bebeğini korumak istediği ve Allah'ın vaadine güvendiği için" },
    ],
  },
  {
    id: 2,
    question: "Hz. Musa'nın ablasının sarayda yaptığından ne öğreniriz?",
    correctOption: "a",
    options: [
      { id: "a", text: "Doğru sözü sakin bir dille ve doğru zamanda söylemenin işe yaradığını" },
      { id: "b", text: "Zor bir durumda hiç konuşmadan beklemek gerektiğini" },
      { id: "c", text: "Yardım etmek için her şeyi bir anda anlatmak gerektiğini" },
    ],
  },
  {
    id: 3,
    question: "Hz. Musa, kavgada istemeden bir adamın ölümüne yol açtıktan sonra ne yaptı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Olanları hiç düşünmeden unutup gitti" },
      { id: "b", text: "Pişman olup Allah'tan bağışlanma diledi" },
      { id: "c", text: "Kavgayı sürdürmek için başkalarını çağırdı" },
    ],
  },
  {
    id: 4,
    question: "Hz. Musa'nın Medyen'deki kuyunun başında yaptığı iyilik bize ne anlatır?",
    correctOption: "a",
    options: [
      { id: "a", text: "Yorgun olsak bile karşılık beklemeden yardım etmenin değerini" },
      { id: "b", text: "Yardım ettikten sonra mutlaka karşılık istemek gerektiğini" },
      { id: "c", text: "Yorgunken kimseye yardım etmemek gerektiğini" },
    ],
  },
  {
    id: 5,
    question: "Hz. Musa vadideki duasında Allah'tan ne istedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Çok zengin ve güçlü bir hükümdar olmayı" },
      { id: "b", text: "Mısır'a bir daha hiç dönmemeyi" },
      { id: "c", text: "Dilindeki düğümün çözülmesini ve kardeşi Hz. Hârûn'un yardımcı olmasını" },
    ],
  },
  {
    id: 6,
    question: "Hz. Musa ile Hz. Hârûn korktukları hâlde Firavun'un sarayına neden gittiler?",
    correctOption: "b",
    options: [
      { id: "a", text: "Firavun'dan bir ödül almak istedikleri için" },
      { id: "b", text: "Allah'ın “Korkmayın, ben sizinle beraberim” sözüne güvendikleri için" },
      { id: "c", text: "Sarayda büyüdükleri odaları yeniden görmek istedikleri için" },
    ],
  },
  {
    id: 7,
    question: "Ziynet Günü'nde Hz. Musa asasını atınca ne oldu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Asa, sihirbazların uydurduklarını yakalayıp yuttu" },
      { id: "b", text: "Asa havaya yükselip gözden kayboldu" },
      { id: "c", text: "Sihirbazların ipleri daha da çoğaldı" },
    ],
  },
  {
    id: 8,
    question: "Firavun'un tutulmayan sözleri bize söz vermek hakkında ne düşündürür?",
    correctOption: "c",
    options: [
      { id: "a", text: "Sıkıntı geçince sözü unutmanın bir zararı olmadığını" },
      { id: "b", text: "Hiçbir zaman kimseye söz vermemek gerektiğini" },
      { id: "c", text: "Verilen sözü sıkıntı geçtikten sonra da tutmak gerektiğini" },
    ],
  },
  {
    id: 9,
    question: "Firavun'un ordusu yetişince Hz. Musa korkan insanlara ne dedi?",
    correctOption: "b",
    options: [
      { id: "a", text: "“Hemen geri dönüp teslim olalım.”" },
      { id: "b", text: "“Asla, Rabbim benimle beraberdir; O bana bir çıkış yolu gösterecektir.”" },
      { id: "c", text: "“Herkes kendi başının çaresine baksın.”" },
    ],
  },
  {
    id: 10,
    question: "Hz. Musa'nın Hızır'la yolculuğu bize ne anlatır?",
    correctOption: "a",
    options: [
      { id: "a", text: "Bilmediğimiz şeyler karşısında sabredip öğrenmeye açık olmanın önemini" },
      { id: "b", text: "Çok şey bilen birinin artık öğrenmesine gerek olmadığını" },
      { id: "c", text: "Sebebini bilmediğimiz her şeye hemen kızmamız gerektiğini" },
    ],
  },
];

export const quizConfig: Record<string, QuizConfig> = {
  adem: {
    label: "Hz. Âdem",
    questions: ademQuizQuestions,
    storagePrefix: "adem",
    keywords: ["adem"],
  },
  sit: {
    label: "Hz. Şît",
    questions: sitQuizQuestions,
    storagePrefix: "sit",
    keywords: ["sit"],
  },
  idris: {
    label: "Hz. İdrîs",
    questions: idrisQuizQuestions,
    storagePrefix: "idris",
    keywords: ["idris"],
  },
  nuh: {
    label: "Hz. Nûh",
    questions: nuhQuizQuestions,
    storagePrefix: "nuh",
    keywords: ["nuh"],
  },
  eyyub: {
    label: "Hz. Eyyûb",
    questions: eyyubQuizQuestions,
    storagePrefix: "eyyub",
    keywords: ["eyyub"],
  },
  musa: {
    label: "Hz. Musa",
    questions: musaQuizQuestions,
    storagePrefix: "musa",
    keywords: ["musa"],
  },
};
