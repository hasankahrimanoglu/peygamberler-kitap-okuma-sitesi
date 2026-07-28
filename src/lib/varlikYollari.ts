/**
 * Görsel varlık yollarının TEK KAYNAĞI (PROJE-MODELI.md 6.1).
 *
 * Yol üretimi daha önce sekiz ayrı dosyaya dağılmıştı; klasör yapısı değişince
 * hepsini tek tek bulmak gerekiyordu. Artık her ekran bu modülü kullanır ve
 * yapı değişikliği tek dosyada yapılır.
 *
 * Klasör düzeni (KARAR 27 Temmuz 2026 — Hasan):
 *
 *   public/kitaplar/hz-{bookKey}/kapak.png             ← kitap kapağı
 *   public/kitaplar/hz-{bookKey}/bolum-{n}/kapak.jpg   ← bölüm açılış sahnesi (16:9)
 *   public/kitaplar/hz-{bookKey}/bolum-{n}/{ad}.jpg    ← bölüm içi sahneler (16:9)
 *   public/rozetler/hz-{bookKey}/bolum-{n}.svg
 *   public/madalyalar/hz-{bookKey}.svg
 *   public/unvanlar/{unvan-anahtari}.svg
 *   public/avatarlar/avatar-{1..10}.jpg
 *   public/ikonlar/final-kapisi.svg
 *
 * Kural: dosya yoksa kod BOZULMAZ — `YedekliGorsel` yedeğe düşer. Hasan gerçek
 * dosyayı aynı adla klasöre atınca kod değişmeden yayına girer.
 */

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
  return `/rozetler/hz-${bookKey}/bolum-${bolumNo}.svg`;
}

/** Madalya — kitap başına bir dosya; her kitabın madalyası farklıdır. */
export function madalyaGorseli(bookKey: string) {
  return `/madalyalar/hz-${bookKey}.svg`;
}

/** Unvan — `unvanAnahtari()` çıktısıyla eşleşir (ör. "bilge-yolcu"). */
export function unvanGorseli(anahtar: string) {
  return `/unvanlar/${anahtar}.svg`;
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
