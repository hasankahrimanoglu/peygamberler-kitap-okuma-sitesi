import { atlasRegions, type AtlasCatalogBook } from "./atlasCatalog";

/**
 * Tanıtım sayfasının katalog verisi: sayılar (kitap, bölüm, rozet, madalya),
 * raf/ödül görsellerinin seçimi ve "yolun devamı" notu. Hiçbiri elle yazılmaz.
 *
 * Tanıtım yalnız YAYINDAKİ kitapları anlatır (REVİZE 21 Eki 2026 — Hasan:
 * lansman 12 kitapla; 15 Eki'deki "sitenin tam hâli anlatılır" kararı kalktı).
 * Bir kitap `atlasCatalog.ts`'te `published` olunca tanıtım kendiliğinden
 * güncellenir; `hidden` ve `preparing` kitaplar sayılmaz, görseli seçilmez.
 *
 * `derive.ts:yayindakiKitaplar()` burada kullanılmaz: o, bütün bölüm
 * metinleriyle `books.ts`'i içeri alır; bu dosya ise `paketler.ts` üzerinden
 * yönetim ekranının tarayıcı paketine de giriyor. Katalogdaki bölüm sayısı
 * içerikle aynı tutulur (CLAUDE.md "Yeni kitap eklerken" listesi).
 */
export const YAYINDAKI_KITAPLAR: AtlasCatalogBook[] = atlasRegions
  .flatMap((bolge) => bolge.books)
  .filter((kitap) => kitap.availability === "published")
  .sort((a, b) => a.order - b.order);

const bolumSayisi = YAYINDAKI_KITAPLAR.reduce((toplam, kitap) => toplam + kitap.chapterCount, 0);

export const KATALOG_SAYILARI = {
  kitap: YAYINDAKI_KITAPLAR.length,
  bolum: bolumSayisi,
  /** Her bölümün kendi rozeti vardır. */
  rozet: bolumSayisi,
  /** Her kitabın kendi madalyası vardır. */
  madalya: YAYINDAKI_KITAPLAR.length,
};

/**
 * Tercih listesindeki kitaplardan yalnız yayında olanları, tercih sırasıyla
 * verir; eksik kalırsa yayındaki diğer kitaplarla `adet`e tamamlar. Gizlenen
 * ya da henüz yayında olmayan bir kitabın görseli böylece tanıtıma giremez.
 */
export function yayindakilerdenSec(tercih: string[], adet: number): AtlasCatalogBook[] {
  const secilen = tercih.flatMap((anahtar) => YAYINDAKI_KITAPLAR.filter((kitap) => kitap.key === anahtar));
  const diger = YAYINDAKI_KITAPLAR.filter((kitap) => !secilen.includes(kitap));
  return [...secilen, ...diger].slice(0, adet);
}

/**
 * Velinin anlayacağı üç grup. Arayüzde bölgeler gösterilmediği için
 * (PROJE-MODELI 3.10.1) tanıtımda da bölge adı yok. `devami`: grupta yayında
 * olmayan kitap varken "yolun devamı" notunda kullanılan ad.
 */
const GRUPLAR = [
  {
    ad: "Peygamberler",
    devami: "diğer peygamberlerin kıssaları",
    bolgeler: ["ilk-izler", "bereketli-aile", "sabir-cesaret", "hikmet-saraylari", "umut-isiklari"],
  },
  {
    ad: "Sevgili Peygamberimiz Hz. Muhammed (s.a.v.)",
    devami: "Sevgili Peygamberimiz Hz. Muhammed'in (s.a.v.) hayatı",
    bolgeler: ["rahmet-yolculugu"],
  },
  { ad: "Dört Büyük Halife", devami: "Dört Büyük Halife kitapları", bolgeler: ["dort-dost"] },
];

const gruplar = GRUPLAR.map((grup) => {
  const kitaplar = atlasRegions
    .filter((bolge) => grup.bolgeler.includes(bolge.id))
    .flatMap((bolge) => bolge.books)
    .sort((a, b) => a.order - b.order);
  return {
    ad: grup.ad,
    devami: grup.devami,
    yayindakiler: kitaplar.filter((kitap) => kitap.availability === "published"),
    bekleyenVar: kitaplar.some((kitap) => kitap.availability !== "published"),
  };
});

/** Kütüphane listesi: yalnız yayında kitabı olan gruplar, katalog sırasıyla. */
export const YAYINDAKI_GRUPLAR = gruplar
  .filter((grup) => grup.yayindakiler.length > 0)
  .map((grup) => ({ ad: grup.ad, kitaplar: grup.yayindakiler }));

function listele(parcalar: string[]) {
  if (parcalar.length < 2) return parcalar.join("");
  return `${parcalar.slice(0, -1).join(", ")} ve ${parcalar[parcalar.length - 1]}`;
}

/**
 * "Yolun devamı" cümlesi — Kütüphane notu ve SSS aynı metni kullanır. Tarih
 * ve sayı vermez (çocuk ana ekranındaki "Yolun devamı hazırlanıyor" kartıyla
 * aynı dil). Bütün kitaplar yayına girince `null` olur ve not kalkar.
 */
const hazirlananlar = gruplar.filter((grup) => grup.bekleyenVar).map((grup) => grup.devami);
const devamListesi = listele(hazirlananlar);
export const YOLUN_DEVAMI =
  hazirlananlar.length > 0
    ? `${devamListesi.charAt(0).toLocaleUpperCase("tr-TR")}${devamListesi.slice(1)} üzerinde çalışıyoruz. Her kitap kaynak denetiminden geçtikten sonra yayına girer.`
    : null;
