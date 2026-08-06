/**
 * Görsel varlık yollarının TEK KAYNAĞI (PROJE-MODELI.md 6.1).
 *
 * Yol üretimi daha önce sekiz ayrı dosyaya dağılmıştı; klasör yapısı değişince
 * hepsini tek tek bulmak gerekiyordu. Artık her ekran bu modülü kullanır ve
 * yapı değişikliği tek dosyada yapılır.
 *
 * Klasör düzeni (KARAR 27 Temmuz 2026 — Hasan):
 *
 *   public/bolgeler/bolge-{bolgeId}-{dikey|yatay}.jpg  ← keşif bölgesi sahnesi
 *   public/kitaplar/hz-{bookKey}/kapak.png             ← kitap kapağı
 *   public/kitaplar/hz-{bookKey}/bolum-{n}/kapak.jpg   ← bölüm açılış sahnesi (16:9)
 *   public/kitaplar/hz-{bookKey}/bolum-{n}/{ad}.jpg    ← bölüm içi sahneler (16:9)
 *   public/rozetler/hz-{bookKey}/bolum-{n}.png
 *   public/madalyalar/hz-{bookKey}.png
 *   public/unvanlar/{unvan-anahtari}.png
 *   public/avatarlar/avatar-{1..10}.jpg
 *   public/ikonlar/final-kapisi.svg
 *
 * Kural: dosya yoksa kod BOZULMAZ — `YedekliGorsel` yedeğe düşer. Hasan gerçek
 * dosyayı aynı adla klasöre atınca kod değişmeden yayına girer.
 *
 * ÖDÜL GÖRSELLERİ PNG'DİR (KARAR 7 Ağu 2026 — Hasan). Rozet, madalya ve unvan
 * SVG'den PNG'ye alındı. Gerekçe: bu görseller ekranda en fazla 72px çiziliyor
 * (`OdulIkonu` çağrıları 13–72px), yani vektörün ölçeklenme avantajı fiilen
 * karşılıksız. Buna karşılık briflerdeki gradyan/doku/ışık tarifleri vektörle
 * zor, raster üretimle doğal; 216 rozetin vektörleştirilmesi hem üretim yükü
 * hem kalite kaybı demekti. Yedek (placeholder) dosyalar SVG kalır — onlar
 * ayrı dosyalardır ve her zaman çözülür.
 */

/**
 * Keşif bölgesinin sahne görseli — CSS `background-image` değeri olarak döner.
 *
 * Sahne oranı cihazdan cihaza 0,61 ile 1,6 arasında değişiyor; tek görsel bu
 * aralığın iki ucunda ya çok kırpılıyor ya da boş kalıyordu. Bu yüzden iki
 * kadraj vardır: dar/uzun ekranlar için `-dikey`, geniş ekranlar için `-yatay`.
 *
 * Biçim JPG'dir (KARAR 30 Tem 2026 — Hasan). Manzara illüstrasyonlarında
 * şeffaflık gerekmiyor; PNG'de 14 dosya 32 MB tutuyordu, JPG'de 6 MB.
 */
export function bolgeArkaplani(bolgeId: string, yon: "dikey" | "yatay") {
  return `url("/bolgeler/bolge-${bolgeId}-${yon}.jpg")`;
}

/** Kitap klasörü adı. `sesli-anlatim/hz-adem` ile aynı kalıbı izler. */
export function kitapKlasoru(bookKey: string) {
  return `/kitaplar/hz-${bookKey}`;
}

/** Kitap kapağı — haritada, kütüphanede, bölüm rotasında ve veli kartında. */
export function kitapKapagi(bookKey: string) {
  return `${kitapKlasoru(bookKey)}/kapak.png`;
}

export function bolumKlasoru(bookKey: string, bolumNo: number) {
  return `${kitapKlasoru(bookKey)}/bolum-${bolumNo}`;
}

/** Bölümün açılış sahnesi (Bölüm Kapısı'ndaki büyük görsel). */
export function bolumKapagi(bookKey: string, bolumNo: number) {
  return `${bolumKlasoru(bookKey, bolumNo)}/kapak.jpg`;
}

/** Bölüm içindeki bir sahne: `bolumGorseli("adem", 1, "toprak-isik")`. */
export function bolumGorseli(bookKey: string, bolumNo: number, ad: string) {
  return `${bolumKlasoru(bookKey, bolumNo)}/${ad}.jpg`;
}

/** Rozet — bölüm başına bir dosya (PROJE-MODELI 6.1, Seçenek B). */
export function rozetGorseli(bookKey: string, bolumNo: number) {
  return `/rozetler/hz-${bookKey}/bolum-${bolumNo}.png`;
}

/**
 * Rozet yolu, hazır `bookKey/bolum-n` anahtarından.
 *
 * `derive.ts:rozetIconKey()` bu biçimde bir anahtar üretiyor ve `OdulIkonu`
 * onu alıyor; ikisi arasında yolu yeniden kurmak yerine tek kapı bu.
 */
export function rozetGorseliAnahtardan(anahtar: string) {
  return `/rozetler/${anahtar}.png`;
}

/** Madalya — kitap başına bir dosya; her kitabın madalyası farklıdır. */
export function madalyaGorseli(bookKey: string) {
  return `/madalyalar/hz-${bookKey}.png`;
}

/** Madalya yolu, hazır `hz-{bookKey}` anahtarından (`derive.ts:madalyaIconKey`). */
export function madalyaGorseliAnahtardan(anahtar: string) {
  return `/madalyalar/${anahtar}.png`;
}

/** Unvan — `unvanAnahtari()` çıktısıyla eşleşir (ör. "bilge-yolcu"). */
export function unvanGorseli(anahtar: string) {
  return `/unvanlar/${anahtar}.png`;
}

/** Avatar — `avatar-1` … `avatar-10`. */
export function avatarGorseli(anahtar: string) {
  return `/avatarlar/${anahtar}.jpg`;
}

/** Büyük Final Testi durağının ikonu. Hasan aynı adla değiştirebilir. */
export const FINAL_KAPISI_IKONU = "/ikonlar/final-kapisi.svg";

/** Gerçek dosya yokken gösterilen yedekler. */
export const YEDEK = {
  /** Bölüm içi sahne ve bölüm kapağı (16:9). */
  sahne: "/kitaplar/placeholder-sahne.jpg",
  /** Kitap kapağı (dikey). */
  kitapKapagi: "/kitaplar/placeholder-kapak.svg",
  rozet: "/rozetler/placeholder.svg",
  madalya: "/madalyalar/placeholder.svg",
  unvan: "/unvanlar/placeholder.svg",
  avatar: "/avatarlar/placeholder.svg",
} as const;
