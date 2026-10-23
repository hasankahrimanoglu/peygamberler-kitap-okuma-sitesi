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
      { id: "a", text: "Tahtalar ve çivilerle" },
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

// Hz. Sâlih — KITAP-HZ-SALIH-ICERIK-final.md §E. Beş bölümün her birinden
// bir soru; doğru harf dağılımı A=2 · B=1 · C=2.
const salihQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Semûd halkı evlerini nasıl yapardı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Dağların sert kayalarını oyarak" },
      { id: "b", text: "Ağaç dallarını birbirine örerek" },
      { id: "c", text: "Nehir kıyısında kerpiç yaparak" },
    ],
  },
  {
    id: 2,
    question: "Hz. Sâlih ve inananlar “uğursuz” diye suçlandığında Hz. Sâlih'in verdiği cevap bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Suçlanınca hemen o yerden uzaklaşmak gerektiğini" },
      { id: "b", text: "Haksız bir suçlamaya sakin ve kararlı bir cevap verilebileceğini" },
      { id: "c", text: "Sert bir söze daha sert bir sözle karşılık vermek gerektiğini" },
    ],
  },
  {
    id: 3,
    question: "Allah'ın devesi geldikten sonra kuyunun suyu nasıl paylaşıldı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Herkes istediği gün istediği kadar su aldı." },
      { id: "b", text: "Su yalnızca kavmin ileri gelenlerine verildi." },
      { id: "c", text: "Suyun bir günü devenin, belli bir günü halkın oldu." },
    ],
  },
  {
    id: 4,
    question: "Deveyi öldürdükten sonra halkın pişman olması bize ne düşündürür?",
    correctOption: "a",
    options: [
      { id: "a", text: "Pişman olacağımız bir işe kalkışmadan önce durup sonunu düşünmenin önemini" },
      { id: "b", text: "Kalabalığın verdiği kararın her zaman doğru olduğunu" },
      { id: "c", text: "Bir işin sonunu düşünmeden hemen yapmanın daha iyi olduğunu" },
    ],
  },
  {
    id: 5,
    question: "Uyarılarını dinlemeyen kavminin ıssız evlerine bakan Hz. Sâlih ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Haklı çıktığı için sevinip kutlama yaptı." },
      { id: "b", text: "Hemen o evlerden birine yerleşti." },
      { id: "c", text: "Onlardan uzaklaştı ve onlara öğüt verdiğini söyledi." },
    ],
  },
];

// Hz. Musa — KITAP-HZ-MUSA-ICERIK-final.md §E. On bölümün her birinden
// bir soru; doğru harf dağılımı A=4 · B=3 · C=3.
const ibrahimQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Parlak yıldız batınca Hz. İbrahim ne dedi?",
    correctOption: "b",
    options: [
      { id: "a", text: "“Bunların hepsi benim tanrımdır.”" },
      { id: "b", text: "“Ben batanları sevmem.”" },
      { id: "c", text: "“Gökyüzüne bir daha bakmayacağım.”" },
    ],
  },
  {
    id: 2,
    question: "Hz. İbrahim'in babasıyla konuşurken her sözüne “Babacığım” diye başlaması bize ne anlatır?",
    correctOption: "c",
    options: [
      { id: "a", text: "Babasına çok kızgın olduğunu" },
      { id: "b", text: "Babasından bir şey istediğini" },
      { id: "c", text: "Doğruyu söylerken bile babasına sevgi ve saygı gösterdiğini" },
    ],
  },
  {
    id: 3,
    question: "Hz. İbrahim'in kavmi, putların onları duyup duymadığı sorulunca nasıl cevap verdi?",
    correctOption: "a",
    options: [
      { id: "a", text: "“Biz atalarımızı böyle yaparken bulduk.”" },
      { id: "b", text: "“Putlar bizi duyuyor ve bizimle konuşuyor.”" },
      { id: "c", text: "“Kral bize böyle yapmamızı emretti.”" },
    ],
  },
  {
    id: 4,
    question: "Hz. İbrahim “Konuşabiliyorlarsa onlara sorun!” diyerek ne yapmak istedi?",
    correctOption: "a",
    options: [
      { id: "a", text: "İnsanların putların konuşamadığını kendilerinin fark etmesini" },
      { id: "b", text: "Halkı bayram yerine geri göndermeyi" },
      { id: "c", text: "Halkla alay edip onları kızdırmayı" },
    ],
  },
  {
    id: 5,
    question: "Kral “Hayat veren ve öldüren benim!” diye övününce Hz. İbrahim ona ne dedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "“Sen de gökteki yıldızları sayabilir misin?”" },
      { id: "b", text: "“Sen de bu büyük nehri durdur.”" },
      { id: "c", text: "“Allah güneşi doğudan getiriyor, sen de onu batıdan getir.”" },
    ],
  },
  {
    id: 6,
    question: "Hz. İbrahim ateşe atıldığında Allah ateşe ne buyurdu?",
    correctOption: "b",
    options: [
      { id: "a", text: "“Daha da büyü ve yüksel!”" },
      { id: "b", text: "“Ey ateş, İbrahim'e serin ve esenlik ol!”" },
      { id: "c", text: "“Hemen sön ve küle dön!”" },
    ],
  },
  {
    id: 7,
    question: "Hz. İbrahim'in babasından ayrılırken “Esen kal, Rabbimden senin için bağışlanma dileyeceğim!” demesi bize ne öğretir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Ayrılırken bile kırgın sözler yerine güzel sözler söyleyebileceğimizi" },
      { id: "b", text: "Ayrıldığımız birini bir daha hiç anmamamız gerektiğini" },
      { id: "c", text: "Ayrılırken herkesin hatasını yüzüne söylememiz gerektiğini" },
    ],
  },
  {
    id: 8,
    question: "Hz. İbrahim'in vadiden ayrılırken Hâcer ve Hz. İsmail için dua etmesi bize ne anlatır?",
    correctOption: "c",
    options: [
      { id: "a", text: "Onları hemen unutup yoluna devam ettiğini" },
      { id: "b", text: "Onlara kızgın olduğu için uzaklaştığını" },
      { id: "c", text: "Sevdiklerini dualarıyla Allah'a emanet ettiğini" },
    ],
  },
  {
    id: 9,
    question: "Tanımadığı yolcular kapısına geldiğinde Hz. İbrahim ne yaptı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Onları kapıdan geri çevirdi" },
      { id: "b", text: "Onları içeri buyur edip hemen kızartılmış bir buzağı ikram etti" },
      { id: "c", text: "Onlara yalnızca su verip yollarına gönderdi" },
    ],
  },
];

const ismailQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vadide su bitince Hâcer ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Akasyanın gölgesinde oturup birinin gelmesini bekledi." },
      { id: "b", text: "Oğlunu alıp vadiden uzaklara gitti." },
      { id: "c", text: "Safa ile Merve tepeleri arasında koşarak yardım aradı." },
    ],
  },
  {
    id: 2,
    question: "Hâcer'in yolculara “Kalabilirsiniz, ama suyun hakkı bende kalsın” demesi neyi gösterir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Suyu paylaşırken herkesin bildiği açık ve adil bir kural koyduğunu" },
      { id: "b", text: "Yolculara hiç güvenmediğini" },
      { id: "c", text: "Suyu kimseyle paylaşmak istemediğini" },
    ],
  },
  {
    id: 3,
    question: "Büyük imtihanın sonunda Allah, Hz. İsmail'in yerine ne gönderdi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Gökyüzünde dönen bir kuş sürüsü" },
      { id: "b", text: "İri bir kurbanlık" },
      { id: "c", text: "Uzaktan gelen bir yolcu" },
    ],
  },
  {
    id: 4,
    question: "Hz. İbrahim oğlunun evine yeniden geldiğinde onu en çok sevindiren ne oldu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Hz. İsmail'in eşinin onu güler yüzle karşılayıp Allah'a hamd ederek konuşması" },
      { id: "b", text: "Evin çok büyük ve süslü olması" },
      { id: "c", text: "Hz. İsmail'in evde onu beklemesi" },
    ],
  },
  {
    id: 5,
    question: "Hz. İbrahim “Bana yardım eder misin?” diye sorunca Hz. İsmail ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Önce avdan dönmeyi bekledi." },
      { id: "b", text: "Bu işe yardım edemeyeceğini söyledi." },
      { id: "c", text: "“Yardım ederim” dedi ve taş taşıyarak babasına yardım etti." },
    ],
  },
  {
    id: 6,
    question: "Hz. İsmail'in, babası uzaktayken de evi temiz tutmayı sürdürmesi bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Görevini yalnızca biri onu kontrol edince yaptığını" },
      { id: "b", text: "Üstlendiği görevi ve verdiği sözü kimse kontrol etmese de sürdürdüğünü" },
      { id: "c", text: "Temizliği her zaman başkalarına bıraktığını" },
    ],
  },
];

const yusufQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Yakup, oğlu Hz. Yusuf'a rüyası hakkında ne öğüt verdi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Rüyasını herkese anlatmasını" },
      { id: "b", text: "Rüyasını hemen unutmasını" },
      { id: "c", text: "Rüyasını kardeşlerine anlatmamasını" },
    ],
  },
  {
    id: 2,
    question: "Kuyunun dibindeki Hz. Yusuf'un umudunu korumasına ne yardım etti?",
    correctOption: "a",
    options: [
      { id: "a", text: "Allah'ın onu gördüğünü ve koruduğunu bilmesi" },
      { id: "b", text: "Kardeşlerinin hemen geri döneceğini düşünmesi" },
      { id: "c", text: "Kuyudan kendi başına çıkabileceğini düşünmesi" },
    ],
  },
  {
    id: 3,
    question: "Hz. Yusuf kuyudan nasıl çıktı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Kardeşleri geri dönüp onu çıkardı." },
      { id: "b", text: "Su almaya gelen bir kervancının sarkıttığı ipe tutundu." },
      { id: "c", text: "Babası onu aramaya gelip buldu." },
    ],
  },
  {
    id: 4,
    question: "Hz. Yusuf, evin hanımının yanlış isteğine neden hayır dedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Aziz'in kapıda onu görmesinden korktuğu için" },
      { id: "b", text: "O evden ayrılıp ailesine dönmek istediği için" },
      { id: "c", text: "Allah'a sığındığı ve efendisinin güvenine ihanet etmek istemediği için" },
    ],
  },
  {
    id: 5,
    question: "Hz. Yusuf, zindan arkadaşlarının rüyalarını yorumlamadan önce ne yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Onlara bir olan Allah'ı anlattı." },
      { id: "b", text: "Onlardan bir karşılık istedi." },
      { id: "c", text: "Onlara kızıp hiç konuşmadı." },
    ],
  },
  {
    id: 6,
    question: "Kral onu çağırdığında Hz. Yusuf neden hemen zindandan çıkmadı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Zindandaki arkadaşlarını yalnız bırakmak istemediği için" },
      { id: "b", text: "Kralın kendisine bir ödül vermesini beklediği için" },
      { id: "c", text: "Önce suçsuz olduğunun herkesçe bilinmesini istediği için" },
    ],
  },
  {
    id: 7,
    question: "Kardeşleri erzak almaya geldiğinde Hz. Yusuf onlara nasıl davrandı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Onları hiç erzak vermeden geri gönderdi." },
      { id: "b", text: "Onlara da herkes gibi paylarını eksiksiz verdi." },
      { id: "c", text: "Onlara kim olduğunu hemen söyledi." },
    ],
  },
  {
    id: 8,
    question: "Kardeşlerin, Bünyamin'in yerine kendilerinden birini bırakmayı teklif etmesi neyi gösterir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Bu kez kardeşlerine sahip çıktıklarını" },
      { id: "b", text: "Mısır'da kalmak istediklerini" },
      { id: "c", text: "Su kabını gerçekten onların aldığını" },
    ],
  },
  {
    id: 9,
    question: "Hz. Yusuf kim olduğunu söyledikten sonra kardeşlerine ne dedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "“Yaptıklarınızı hiç unutmayacağım.”" },
      { id: "b", text: "“Hemen buradan gidin.”" },
      { id: "c", text: "“Bugün size hiçbir kınama yok; Allah sizi bağışlasın.”" },
    ],
  },
  {
    id: 10,
    question: "Hz. Yusuf, ailesine kavuştuğunda geçmişi nasıl andı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Kardeşlerinin yaptıklarını herkese anlattı." },
      { id: "b", text: "Kimseyi suçlamadan Allah'ın iyiliğini anıp şükretti." },
      { id: "c", text: "Yalnızca kendi başardıklarından söz etti." },
    ],
  },
];

const eyyubQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hikâyede Hz. Eyyûb, kapısına gelen konuklara ve açlara nasıl davranırdı?",
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
    question: "Hikâyede, herkes uzaklaşınca Hz. Eyyûb'un eşi ne yaptı?",
    correctOption: "a",
    options: [
      { id: "a", text: "Yanından ayrılmadı; ona bakmayı sürdürdü" },
      { id: "b", text: "Köye dönüp onu bir daha görmeye gelmedi" },
      { id: "c", text: "Hekim bulmak için uzak bir şehre gitti" },
    ],
  },
  {
    id: 4,
    question: "Hz. Eyyûb derdini kime açtı ve nasıl dua etti?",
    correctOption: "c",
    options: [
      { id: "a", text: "Dostlarına kızdı ve onlarla uzun uzun tartıştı" },
      { id: "b", text: "Derdini kimseye açmadı, hepsini sessizce içinde tuttu" },
      { id: "c", text: "Allah'a açtı: “Rabbim, bana bu dert dokundu; sen merhametlilerin en merhametlisisin” dedi" },
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
      { id: "c", text: "Allah'ın vaadine güvenip onu korumak istediği için" },
    ],
  },
  {
    id: 2,
    question: "Hz. Musa'nın ablasının sarayda yaptığından ne öğreniriz?",
    correctOption: "a",
    options: [
      { id: "a", text: "Doğru sözü doğru zamanda söylemenin işe yaradığını" },
      { id: "b", text: "Zor bir durumda hiç konuşmadan beklemek gerektiğini" },
      { id: "c", text: "Yardım etmek için her şeyi bir anda anlatmanın iyi olduğunu" },
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
      { id: "c", text: "Yorgunken kimseye yardım etmemenin daha doğru olduğunu" },
    ],
  },
  {
    id: 5,
    question: "Hz. Musa vadideki duasında Allah'tan ne istedi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Çok zengin olmayı ve sarayda bir hükümdar gibi yaşamayı" },
      { id: "b", text: "Mısır'a hiç dönmeden Medyen'de çoban olarak kalmayı" },
      { id: "c", text: "Dilindeki düğümün çözülmesini ve Hz. Hârûn'un yardımını" },
    ],
  },
  {
    id: 6,
    question: "Hz. Musa ile Hz. Hârûn korktukları hâlde Firavun'un sarayına neden gittiler?",
    correctOption: "b",
    options: [
      { id: "a", text: "Firavun'dan büyük bir ödül ve makam almak istedikleri için" },
      { id: "b", text: "Allah'ın “Korkmayın, ben sizinle beraberim” sözüne güvendikleri için" },
      { id: "c", text: "Hz. Musa'nın büyüdüğü sarayı yeniden görmek istedikleri için" },
    ],
  },
  {
    id: 7,
    question: "Ziynet Günü'nde Hz. Musa asasını atınca ne oldu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Asa, sihirbazların uydurduklarını yakalayıp yuttu" },
      { id: "b", text: "Asa havaya yükselip bir anda gözden kayboldu" },
      { id: "c", text: "Sihirbazların ipleri ve değnekleri daha da çoğaldı" },
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
    question: "Firavun'un ordusu yetişince Hz. Musa korkan insanlara ne söyledi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hemen geri dönüp Firavun'a teslim olmaları gerektiğini" },
      { id: "b", text: "Rabbinin kendisiyle beraber olduğunu ve yol göstereceğini" },
      { id: "c", text: "Herkesin kendi başının çaresine bakması gerektiğini" },
    ],
  },
  {
    id: 10,
    question: "Hz. Musa'nın Hızır'la yolculuğu bize ne anlatır?",
    correctOption: "a",
    options: [
      { id: "a", text: "Sabredip öğrenmeye her zaman açık olmanın önemini" },
      { id: "b", text: "Çok şey bilen birinin artık öğrenmesine gerek olmadığını" },
      { id: "c", text: "Sebebini bilmediğimiz her şeye hemen kızmamız gerektiğini" },
    ],
  },
];

// Hz. Dâvûd — KITAP-HZ-DAVUD-ICERIK-final.md §E. Altı bölümün her birinden
// bir soru; doğru harf dağılımı A=2 · B=2 · C=2.
const davudQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Tâlût, askerlerine nehirle ilgili ne söyledi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Herkesin nehirden doyasıya içebileceğini" },
      { id: "b", text: "Eliyle bir avuç alan dışında kimsenin içmemesini" },
      { id: "c", text: "Önce hayvanların, sonra askerlerin içmesini" },
    ],
  },
  {
    id: 2,
    question: "Hikâyeye göre az sayıdaki inananlar, Câlût'un kalabalık ordusunu nasıl yendi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Yanlarına başka ordular da katıldığı için" },
      { id: "b", text: "Câlût'un askerleri çok yorgun olduğu için" },
      { id: "c", text: "Allah'ın izniyle; dua edip sabrettikleri için" },
    ],
  },
  {
    id: 3,
    question: "Kur'an'a göre sabah akşam Hz. Dâvûd ile birlikte kimler tesbih ederdi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Dağlar ve kuşlar" },
      { id: "b", text: "Sarayda çalışan bütün insanlar" },
      { id: "c", text: "Denizdeki balıklar ve dalgalar" },
    ],
  },
  {
    id: 4,
    question: "Hikâyede Hz. Dâvûd'un hükümdarken bile demir ocağında çalışmayı sürdürmesi bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hükümdarların her işi tek başına yapması gerektiğini" },
      { id: "b", text: "Elinin emeğiyle geçinmenin değerli bir şey olduğunu" },
      { id: "c", text: "Demircilik işinin herkes için en kolay iş olduğunu" },
    ],
  },
  {
    id: 5,
    question: "İki davacı, Hz. Dâvûd'un yanına nasıl girdi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Mabedin kapısından izin isteyerek" },
      { id: "b", text: "Bir kervanın arasına karışarak" },
      { id: "c", text: "Mabedin duvarına tırmanarak" },
    ],
  },
  {
    id: 6,
    question: "Hz. Dâvûd'un genç oğlu Hz. Süleyman'a güvenip ona yol açması bize ne anlatır?",
    correctOption: "a",
    options: [
      { id: "a", text: "Küçük olmanın değersiz olmak demek olmadığını" },
      { id: "b", text: "Gençlerin her işi kimseye sormadan yapması gerektiğini" },
      { id: "c", text: "Yaşça büyük olanın her zaman haklı olduğunu" },
    ],
  },
];

const suleymanQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hikâyede Hz. Süleyman'ın bağ davasındaki önerisi neydi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Sürü bir süre bağ sahibinde kalsın, bağ onarılınca geri verilsin" },
      { id: "b", text: "Sürü sahibi bütün sürüsünü hemen ve tamamen bağ sahibine versin" },
      { id: "c", text: "Bağ sahibi zararını unutsun, iki taraf da evine dönüp barışsın" },
    ],
  },
  {
    id: 2,
    question: "Hz. Süleyman, kendisine verilen kuş dili ve rüzgâr gibi nimetler için ne düşünürdü?",
    correctOption: "c",
    options: [
      { id: "a", text: "Bunları kendi zekâsı ve çalışmasıyla kazandığını" },
      { id: "b", text: "Bunların gizli bir sihirle elde edildiğini" },
      { id: "c", text: "Hepsinin Allah'ın bir lütfu olduğunu" },
    ],
  },
  {
    id: 3,
    question: "Karınca vadisinde bir karınca arkadaşlarına ne söyledi?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hep birlikte ordunun önüne çıkıp yolu kapatmalarını" },
      { id: "b", text: "Ordu onları ezmesin diye yuvalarına girmelerini" },
      { id: "c", text: "Yiyecekleri hemen vadinin dışına taşımalarını" },
    ],
  },
  {
    id: 4,
    question: "Kaybolan hüdhüd geri dönünce Hz. Süleyman'ın davranışından ne öğreniriz?",
    correctOption: "a",
    options: [
      { id: "a", text: "Önce dinlemek ve haberin doğruluğunu araştırmak gerektiğini" },
      { id: "b", text: "Geç kalan birini dinlemeden cezalandırmak gerektiğini" },
      { id: "c", text: "Duyduğumuz her habere hemen inanmak gerektiğini" },
    ],
  },
  {
    id: 5,
    question: "Sebe melikesi, Hz. Süleyman'ın mektubunu okuyunca ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Mektubu kimseye göstermeden sakladı" },
      { id: "b", text: "Hiç düşünmeden savaş kararı verdi" },
      { id: "c", text: "İleri gelenlerini toplayıp onlara danıştı" },
    ],
  },
  {
    id: 6,
    question: "Taht göz açıp kapayıncaya kadar gelince Hz. Süleyman ne dedi?",
    correctOption: "b",
    options: [
      { id: "a", text: "“Bu başarı, benim gücüm ve bilgim sayesinde oldu.”" },
      { id: "b", text: "“Bu, beni sınayan Rabbimin bir lütfudur.”" },
      { id: "c", text: "“Artık hiç kimse bana karşı gelemez, gücüm yeter.”" },
    ],
  },
  {
    id: 7,
    question: "Hz. Süleyman'ın vefat ettiğini herkese ne gösterdi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Asasını kemiren küçük bir ağaç kurdu" },
      { id: "b", text: "Uzaktan haber getiren bir hüdhüd" },
      { id: "c", text: "Cinlerin herkese verdiği bir haber" },
    ],
  },
];

const yunusQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Yunus, Ninova'da insanları Allah'a çağırırken nerelerde konuşurdu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Meydanlarda, pazarlarda ve yol kenarlarında" },
      { id: "b", text: "Yalnızca kendi evinin bahçesinde" },
      { id: "c", text: "Yalnızca gemilerde, nehrin üstünde" },
    ],
  },
  {
    id: 2,
    question: "Gemide kura çekilirken Hz. Yunus'un güverteye çıkıp ne yaptığını söylemesi bize ne anlatır?",
    correctOption: "c",
    options: [
      { id: "a", text: "Kalabalıkta susmanın her zaman daha doğru olduğunu" },
      { id: "b", text: "Kurada kendi adının çıkmasını istediğini" },
      { id: "c", text: "Yaptığımızı saklamayıp dürüstçe söylemenin değerini" },
    ],
  },
  {
    id: 3,
    question: "Hz. Yunus balığın karnında, karanlıklar içinde ne yaptı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hiç konuşmadan uzun bir uykuya daldı" },
      { id: "b", text: "Allah'a dua edip hatasını açıkça kabul etti" },
      { id: "c", text: "Kendisini kurtarması için gemidekilere seslendi" },
    ],
  },
  {
    id: 4,
    question: "Issız kıyıda Hz. Yunus'un üstüne gölge yapan neydi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Kabak türünden geniş yapraklı bir bitki" },
      { id: "b", text: "Kıyıdan geçen yolcuların kurduğu bir çadır" },
      { id: "c", text: "Denizin kenarında yükselen büyük bir kayalık" },
    ],
  },
  {
    id: 5,
    question: "Hz. Yunus'un, onu yıllarca dinlemeyen Ninova halkını sevgiyle karşılaması bize ne anlatır?",
    correctOption: "c",
    options: [
      { id: "a", text: "Kırgın olduğumuz kişilerle bir daha hiç konuşmamak gerektiğini" },
      { id: "b", text: "Eski kırgınlıkları her fırsatta hatırlatmak gerektiğini" },
      { id: "c", text: "Kırgınlığı bırakıp insanlarla yeniden birlikte sevinmek gerektiğini" },
    ],
  },
];

const isaQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Meryem, aldığı müjde karşısında aklına gelen soruyu kime sordu?",
    correctOption: "c",
    options: [
      { id: "a", text: "Mabette ibadet eden insanlara" },
      { id: "b", text: "Hz. Zekeriyyâ'ya" },
      { id: "c", text: "Doğrudan Rabbine" },
    ],
  },
  {
    id: 2,
    question: "Hz. Meryem'in çok yorgunken hurma ağacını silkelemesi bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yorgunken hiçbir şey yapmamak gerektiğini" },
      { id: "b", text: "Zor bir anda bile elimizden gelen küçük adımı atmanın değerini" },
      { id: "c", text: "Ağaçların her zaman meyve verdiğini" },
    ],
  },
  {
    id: 3,
    question: "Hz. Meryem kucağındaki bebeği işaret edince ne oldu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Bebek konuştu ve “Ben Allah'ın kuluyum” dedi" },
      { id: "b", text: "Kalabalık hemen dağılıp gitti" },
      { id: "c", text: "Hz. Meryem söz orucunu bozup konuştu" },
    ],
  },
  {
    id: 4,
    question: "Hz. Îsâ'nın “Allah benim de Rabbim, sizin de Rabbiniz” sözü insanlara ne anlatıyordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Kendisinin herkesten üstün olduğunu" },
      { id: "b", text: "Hepsinin tek bir Rabbin kulları olduğunu" },
      { id: "c", text: "Herkesin ayrı bir yol seçmesi gerektiğini" },
    ],
  },
  {
    id: 5,
    question: "Hz. Îsâ'nın her mucizede “Allah'ın izniyle” demesi bize ne anlatır?",
    correctOption: "c",
    options: [
      { id: "a", text: "Mucizeleri kendi gücüyle yaptığını" },
      { id: "b", text: "Mucizelerin bir oyun olduğunu" },
      { id: "c", text: "Başardığı güzel işi kendine mal etmeyip Allah'a bağladığını" },
    ],
  },
  {
    id: 6,
    question: "Hz. Îsâ “Allah'a giden yolda bana yardımcı olacaklar kimlerdir?” diye sorunca kim cevap verdi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Havariler" },
      { id: "b", text: "Kasabanın ileri gelenleri" },
      { id: "c", text: "Yoldan geçen bir yolcu" },
    ],
  },
  {
    id: 7,
    question: "Hz. Îsâ'nın duasına ilk gelenden son gelene kadar herkesi katması bize ne anlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Duanın yalnızca kendimiz için edilmesi gerektiğini" },
      { id: "b", text: "Bir nimeti herkes için istemenin güzelliğini" },
      { id: "c", text: "Duanın çok uzun olması gerektiğini" },
    ],
  },
  {
    id: 8,
    question: "Kur'an'a göre Hz. Îsâ'ya kurulan tuzak ne oldu?",
    correctOption: "c",
    options: [
      { id: "a", text: "Tuzak hiç kurulmadı" },
      { id: "b", text: "Hz. Îsâ tuzağı kendi gücüyle bozdu" },
      { id: "c", text: "Allah tuzağı bozdu ve Hz. Îsâ'yı kendi katına kaldırdı" },
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
  salih: {
    label: "Hz. Sâlih",
    questions: salihQuizQuestions,
    storagePrefix: "salih",
    keywords: ["salih"],
  },
  ibrahim: {
    label: "Hz. İbrahim",
    questions: ibrahimQuizQuestions,
    storagePrefix: "ibrahim",
    keywords: ["ibrahim"],
  },
  ismail: {
    label: "Hz. İsmail",
    questions: ismailQuizQuestions,
    storagePrefix: "ismail",
    keywords: ["ismail"],
  },
  yusuf: {
    label: "Hz. Yusuf",
    questions: yusufQuizQuestions,
    storagePrefix: "yusuf",
    keywords: ["yusuf"],
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
  davud: {
    label: "Hz. Dâvûd",
    questions: davudQuizQuestions,
    storagePrefix: "davud",
    keywords: ["davud"],
  },
  suleyman: {
    label: "Hz. Süleyman",
    questions: suleymanQuizQuestions,
    storagePrefix: "suleyman",
    keywords: ["suleyman"],
  },
  yunus: {
    label: "Hz. Yunus",
    questions: yunusQuizQuestions,
    storagePrefix: "yunus",
    keywords: ["yunus"],
  },
  isa: {
    label: "Hz. Îsâ",
    questions: isaQuizQuestions,
    storagePrefix: "isa",
    keywords: ["isa"],
  },
};
