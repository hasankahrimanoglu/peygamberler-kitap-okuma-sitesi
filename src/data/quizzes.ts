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

// Hz. İdrîs — KITAP-HZ-IDRIS-ICERIK-FAZ2-taslak.md §E. Dört bölümün her birinden
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
};
