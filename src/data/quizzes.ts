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
  localOnly?: boolean;
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

export const quizConfig: Record<string, QuizConfig> = {
  adem: {
    label: "Hz. Âdem",
    questions: ademQuizQuestions,
    storagePrefix: "adem",
    keywords: ["adem"],
  },
  sit: {
    label: "Hz. Şît",
    storagePrefix: "sit",
    keywords: ["sit", "şit"],
    localOnly: true,
    questions: [
      { id: 1, question: "Emanet neyi anlatır?", correctOption: "b", options: [{ id: "a", text: "Yalnızca bize ait bir eşyayı" }, { id: "b", text: "Güvenilerek verilen ve korunması gereken şeyi" }, { id: "c", text: "Unutulması gereken bir sözü" }] },
      { id: 2, question: "Doğruluğundan emin olmadığımız bir haberi ne yapmalıyız?", correctOption: "c", options: [{ id: "a", text: "Hemen yaymalıyız" }, { id: "b", text: "Daha ilginç hâle getirmeliyiz" }, { id: "c", text: "Güvenilir kaynaktan doğrulamalıyız" }] },
      { id: 3, question: "Dayanışma nasıl büyür?", correctOption: "a", options: [{ id: "a", text: "Herkes yapabildiği katkıyı sunduğunda" }, { id: "b", text: "Bütün işi tek kişi yaptığında" }, { id: "c", text: "Kimse birbirini dinlemediğinde" }] },
      { id: 4, question: "Güzel bir davranış ne zaman değerlidir?", correctOption: "b", options: [{ id: "a", text: "Yalnız herkes bizi izlediğinde" }, { id: "b", text: "Kimse görmese de doğru olduğu için yapıldığında" }, { id: "c", text: "Sadece bir ödül kazandırdığında" }] },
    ],
  },
};
