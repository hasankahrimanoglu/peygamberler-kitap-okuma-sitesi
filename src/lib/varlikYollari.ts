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
 *   public/sesli-anlatim/hz-{bookKey}/hz-{bookKey}-bolum-{n}.mp3  ← bölüm anlatımı
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

/** Kitap kapağı — kütüphanede, bölüm rotasında, kitap panelinde ve veli kartında. */
export function kitapKapagi(bookKey: string) {
  return `${kitapKlasoru(bookKey)}/kapak.png`;
}

/**
 * Haritadaki yuvarlak durak görseli (KARAR 8 Ağu 2026 — Hasan).
 *
 * Daha önce burada da `kapak.png` kullanılıyordu; dikey kapak 70px'lik daireye
 * `object-fit: cover` ile sığdırılınca kompozisyonun üstü ve altı kesiliyor,
 * kitap adı okunmuyordu. Durak madalyonu artık AYRI bir görseldir: kare
 * kadrajlı, dairede tam görünecek biçimde hazırlanır.
 *
 * Biçim JPG'dir — daire maskesini CSS çiziyor, şeffaflık gerekmiyor.
 * Dosya yoksa ekran `YEDEK.kitapKapagi`na düşer, kod bozulmaz.
 */
export function haritaDuragiGorseli(bookKey: string) {
  return `${kitapKlasoru(bookKey)}/harita-kapak.jpg`;
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

/**
 * Veli panelinden yüklenen çocuk fotoğrafının DEPOLAMA kovası (KARAR 8 Ağu 2026).
 *
 * Bu dosyalar `public/` altında DEĞİLDİR — veliye ait kullanıcı verisidir ve
 * Supabase Storage'da durur. Yol üretimi yine tek kaynaktan yapılsın diye kova
 * adı ve anahtar kalıbı burada tutulur; yükleme/silme mantığı
 * `src/lib/profilFotografi.ts` içindedir.
 */
export const PROFIL_FOTOGRAFI_KOVASI = "profil-fotograflari";

/**
 * Fotoğrafın kova içindeki anahtarı: `{veliId}/{profilId}.jpg`.
 * İlk klasör velinin auth id'sidir — depolama politikaları yazma yetkisini
 * bu klasöre göre verir (migration-profil-fotografi.sql).
 */
export function profilFotografiAnahtari(veliId: string, profilId: string) {
  return `${veliId}/${profilId}.jpg`;
}

/**
 * Bölümün sesli anlatımı (KARAR 12 Eki 2026 — PROJE-MODELI 6.5).
 *
 * Her bölümün bir kaydı vardır; `books.ts`'te ses alanı yoktur, yol rozet gibi
 * kitap anahtarı ve bölüm numarasından türetilir. Gerçek kayıt gelene kadar
 * dosya `YEDEK.ses` kopyasıdır; Hasan aynı adla üzerine yazınca kod değişmeden
 * yayına girer. Kitap adı dosya adında da geçer: dosya klasöründen çıkarılsa
 * da hangi bölüme ait olduğu okunur. Dosya bulunamazsa okuyucu ses kontrolünü
 * hiç çizmez.
 */
export function sesliAnlatim(bookKey: string, bolumNo: number) {
  return `/sesli-anlatim/hz-${bookKey}/hz-${bookKey}-bolum-${bolumNo}.mp3`;
}

/**
 * Ana ekran rotasının arka planı (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.1).
 *
 * Tek, kesintisiz dikey tekrarlanan boyalı çayır görseli; yol uzadıkça dikey
 * tekrar eder. Hasan üretir (önerilen 1600×2400 JPG, gökyüzü yok, üst ve alt
 * kenar dikişsiz). Dosya gelene kadar CSS, ilk bölge görseline ve çayır
 * renginde bir degradeye düşer — ekran bozulmaz.
 */
export const ROTA_ARKAPLANI = "/harita/rota-arkaplan.jpg";

/** Rota arka planı hazır değilken kullanılan vekil sahne (dar / geniş kadraj). */
export function rotaVekilSahnesi(yon: "dikey" | "yatay") {
  return `/bolgeler/bolge-ilk-izler-${yon}.jpg`;
}

/**
 * Rehber karakter Işıl'ın pozları (PROJE-MODELI 3.10.5). Çizim Hasan'dadır:
 * `public/isil/isil-{poz}.png`, 512×512 şeffaf. Dosya yokken `YEDEK.isil`
 * (konsept eskiz) görünür.
 */
export type IsilPozu = "durus" | "konusma" | "kutlama";

export function isilGorseli(poz: IsilPozu) {
  return `/isil/isil-${poz}.png`;
}

/** Büyük Final Testi durağının ikonu. Hasan aynı adla değiştirebilir. */
export const FINAL_KAPISI_IKONU = "/ikonlar/final-kapisi.svg";

/** Gerçek dosya yokken gösterilen yedekler. */
export const YEDEK = {
  /** Bölüm içi sahne ve bölüm kapağı (16:9). */
  sahne: "/kitaplar/placeholder-sahne.jpg",
  /** Kitap kapağı (dikey) — harita durağı görseli de buna düşer. */
  kitapKapagi: "/kitaplar/placeholder-kapak.svg",
  rozet: "/rozetler/placeholder.svg",
  madalya: "/madalyalar/placeholder.svg",
  unvan: "/unvanlar/placeholder.svg",
  avatar: "/avatarlar/placeholder.svg",
  /** Harita durağının yuvarlak görseli henüz yokken. */
  durak: "/kitaplar/placeholder-durak.svg",
  /** Işıl'ın çizimi gelene kadar konsept eskiz. */
  isil: "/isil/placeholder.svg",
  /**
   * Sesli anlatım yer tutucusu — Hz. Âdem 1. bölüm kaydının kopyası (Hasan'ın
   * isteği, 12 Eki 2026). Kodda çalınmaz; `gorsel-yertutucu` betiği her bölüme
   * bunu kopyalar. Başka bölümün anlatımı olduğu için yayından önce bütün
   * kopyalar gerçek kayıtla değiştirilmelidir.
   */
  ses: "/sesli-anlatim/placeholder-ses.mp3",
} as const;
