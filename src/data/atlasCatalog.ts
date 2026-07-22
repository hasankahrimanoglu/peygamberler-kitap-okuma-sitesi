export type AtlasAvailability = "published" | "demo" | "preparing";

export type AtlasCatalogBook = {
  order: number;
  key: string;
  title: string;
  subtitle: string;
  chapterCount: number;
  availability: AtlasAvailability;
};

export type AtlasRegion = {
  id: string;
  order: number;
  name: string;
  subtitle?: string;
  description: string;
  mood: string;
  books: AtlasCatalogBook[];
};

export const atlasRegions: AtlasRegion[] = [
  {
    id: "ilk-izler",
    order: 1,
    name: "İlk İzler Vadisi",
    description: "Yeryüzünün ilk zamanlarında öğrenmenin, sorumluluğun ve umudun izini sür.",
    mood: "Başlangıç ve merak",
    books: [
      { order: 1, key: "adem", title: "Hz. Âdem", subtitle: "İlk insan, ilk yolculuk", chapterCount: 8, availability: "published" },
      { order: 2, key: "sit", title: "Hz. Şît", subtitle: "Emaneti taşıyan yeni kuşak", chapterCount: 4, availability: "demo" },
      { order: 3, key: "idris", title: "Hz. İdrîs", subtitle: "Bilgi ve doğruluk yolu", chapterCount: 4, availability: "preparing" },
      { order: 4, key: "nuh", title: "Hz. Nûh", subtitle: "Sabır ve güven yolculuğu", chapterCount: 8, availability: "preparing" },
      { order: 5, key: "hud", title: "Hz. Hûd", subtitle: "Gücün karşısında doğru söz", chapterCount: 5, availability: "preparing" },
      { order: 6, key: "salih", title: "Hz. Sâlih", subtitle: "Emaneti koruyanlar", chapterCount: 5, availability: "preparing" },
    ],
  },
  {
    id: "bereketli-aile",
    order: 2,
    name: "Bereketli Aile Yolu",
    description: "Bir ailenin farklı zamanlara uzanan yolunda güveni, sabrı ve bağışlamayı keşfet.",
    mood: "Aile ve güven",
    books: [
      { order: 7, key: "ibrahim", title: "Hz. İbrahim", subtitle: "Hakikati arayan kalp", chapterCount: 9, availability: "preparing" },
      { order: 8, key: "lut", title: "Hz. Lût", subtitle: "Zor zamanda doğruyu korumak", chapterCount: 5, availability: "preparing" },
      { order: 9, key: "ismail", title: "Hz. İsmail", subtitle: "Sözünde duran yol arkadaşı", chapterCount: 6, availability: "preparing" },
      { order: 10, key: "ishak", title: "Hz. İshak", subtitle: "Bereketli bir emanet", chapterCount: 4, availability: "preparing" },
      { order: 11, key: "yakup", title: "Hz. Yakup", subtitle: "Umudu koruyan baba", chapterCount: 5, availability: "preparing" },
      { order: 12, key: "yusuf", title: "Hz. Yusuf", subtitle: "Sabırdan bağışlamaya", chapterCount: 10, availability: "preparing" },
    ],
  },
  {
    id: "sabir-cesaret",
    order: 3,
    name: "Sabır ve Cesaret Geçidi",
    description: "Zorlu günlerde umudunu koruyan ve haksızlığa karşı doğruyu söyleyenlerle ilerle.",
    mood: "Sabır ve cesaret",
    books: [
      { order: 13, key: "eyyub", title: "Hz. Eyyûb", subtitle: "Zorlukta umudu korumak", chapterCount: 5, availability: "preparing" },
      { order: 14, key: "suayb", title: "Hz. Şuayb", subtitle: "Ölçüde ve sözde doğruluk", chapterCount: 5, availability: "preparing" },
      { order: 15, key: "zulkifl", title: "Hz. Zülkifl", subtitle: "Sözünü koruyan yolcu", chapterCount: 4, availability: "preparing" },
      { order: 16, key: "musa", title: "Hz. Musa", subtitle: "Özgürlüğe uzanan yol", chapterCount: 10, availability: "preparing" },
      { order: 17, key: "harun", title: "Hz. Hârûn", subtitle: "Kardeşine destek olan elçi", chapterCount: 5, availability: "preparing" },
      { order: 18, key: "yusa", title: "Hz. Yûşa", subtitle: "Devralınan büyük emanet", chapterCount: 4, availability: "preparing" },
    ],
  },
  {
    id: "hikmet-saraylari",
    order: 4,
    name: "Hikmet Sarayları",
    description: "Güç sahibi olmanın adalet, şükür ve sorumlulukla nasıl güzelleştiğini gör.",
    mood: "Hikmet ve adalet",
    books: [
      { order: 19, key: "davud", title: "Hz. Dâvûd", subtitle: "Cesaret ve adalet", chapterCount: 6, availability: "preparing" },
      { order: 20, key: "suleyman", title: "Hz. Süleyman", subtitle: "Şükürle büyüyen hikmet", chapterCount: 7, availability: "preparing" },
      { order: 21, key: "ilyas", title: "Hz. İlyas", subtitle: "Doğru sözü korumak", chapterCount: 5, availability: "preparing" },
      { order: 22, key: "elyesa", title: "Hz. Elyesa", subtitle: "İyilik yolunu sürdürmek", chapterCount: 4, availability: "preparing" },
    ],
  },
  {
    id: "umut-isiklari",
    order: 5,
    name: "Umut Işıkları Diyarı",
    description: "Zor anlarda edilen duaların ve yeniden başlamanın ışığını takip et.",
    mood: "Umut ve merhamet",
    books: [
      { order: 23, key: "yunus", title: "Hz. Yunus", subtitle: "Duayla yeniden başlamak", chapterCount: 5, availability: "preparing" },
      { order: 24, key: "saya", title: "Hz. Şa‘yâ", subtitle: "Zor zamanda umut taşımak", chapterCount: 4, availability: "preparing" },
      { order: 25, key: "zekeriyya", title: "Hz. Zekeriyyâ", subtitle: "Sabırla edilen dua", chapterCount: 5, availability: "preparing" },
      { order: 26, key: "yahya", title: "Hz. Yahyâ", subtitle: "Temiz kalp ve hikmet", chapterCount: 4, availability: "preparing" },
      { order: 27, key: "isa", title: "Hz. Îsâ", subtitle: "Merhamet ve umut", chapterCount: 8, availability: "preparing" },
    ],
  },
  {
    id: "rahmet-yolculugu",
    order: 6,
    name: "Rahmet Yolculuğu",
    subtitle: "Sevgili Peygamberimiz Hz. Muhammed'in Hayatı",
    description: "Güvenilirliği, merhameti ve kardeşliği dört büyük yolculukta keşfet.",
    mood: "Güven ve kardeşlik",
    books: [
      { order: 28, key: "muhammed-ilk-yillar", title: "Hz. Muhammed — İlk Yıllar", subtitle: "Güvenilir bir gençlik", chapterCount: 8, availability: "preparing" },
      { order: 29, key: "muhammed-mekke", title: "Hz. Muhammed — Mekke Yılları", subtitle: "Sabırla sürdürülen çağrı", chapterCount: 10, availability: "preparing" },
      { order: 30, key: "muhammed-medine", title: "Hz. Muhammed — Medine Yılları", subtitle: "Kardeşlikle kurulan yeni hayat", chapterCount: 10, availability: "preparing" },
      { order: 31, key: "muhammed-veda", title: "Hz. Muhammed — Veda ve Emanet", subtitle: "Bırakılan güzel emanet", chapterCount: 8, availability: "preparing" },
    ],
  },
  {
    id: "dort-dost",
    order: 7,
    name: "Emaneti Taşıyan Dört Dost",
    subtitle: "Dört Büyük Halife",
    description: "Peygamberimizin ardından emaneti taşıyan dört yakın dostun güzel değerlerini keşfet.",
    mood: "Sadakat ve emanet",
    books: [
      { order: 32, key: "ebubekir", title: "Hz. Ebû Bekir", subtitle: "Sadakat ve güven", chapterCount: 6, availability: "preparing" },
      { order: 33, key: "omer", title: "Hz. Ömer", subtitle: "Adalet ve sorumluluk", chapterCount: 7, availability: "preparing" },
      { order: 34, key: "osman", title: "Hz. Osman", subtitle: "Cömertlik ve hizmet", chapterCount: 6, availability: "preparing" },
      { order: 35, key: "ali", title: "Hz. Ali", subtitle: "İlim ve cesaret", chapterCount: 7, availability: "preparing" },
    ],
  },
];

export const atlasBookByKey = new Map(
  atlasRegions.flatMap((region) => region.books.map((book) => [book.key, book] as const)),
);
