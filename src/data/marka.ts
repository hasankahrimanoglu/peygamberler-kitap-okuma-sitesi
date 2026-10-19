/**
 * Marka bilgileri — tanıtım (landing) ve yasal sayfaların TEK KAYNAĞI.
 *
 * Ad ve logo geçicidir (Hasan, 15 Eki 2026: yeni isim ve logo hazırlanacak).
 * İsim değişince önce bu dosya güncellenir; tanıtım sayfası, yasal metinler ve
 * logo kendiliğinden yeni adı kullanır.
 *
 * Henüz buraya bağlı OLMAYAN eski yazımlar (isim değişince elle taşınacak):
 * çocuk üst menüsündeki "Keşif Dünyası" ve `app/layout.tsx` başlığı. Veliye
 * giden e-postalar (`src/lib/odeme/epostaSablonlari.ts`) buradan beslenir.
 */
export const MARKA = {
  /** Tam ad — sayfa başlıkları, yasal metinler, altbilgi. */
  ad: "Peygamberler Keşif Dünyası",
  /** Logodaki iki satır: üstte küçük, altta büyük. */
  logoUstSatir: "Peygamberler",
  logoAltSatir: "Keşif Dünyası",
  /** Altbilgi ve paylaşım kartı açıklaması. */
  kisaTanim:
    "8–11 yaş çocuklar için peygamber kıssalarını sesli ve etkileşimli bir okuma yolculuğuna dönüştüren dijital kütüphane.",
  hedefYas: "8–11",
  /** Köşeli parantezli değerler doldurulmamış yer tutuculardır. */
  alanAdi: "[alanadi.com]",
  iletisimEposta: "[iletisim@alanadi.com]",
  /**
   * Veliye giden e-postalara verilen yanıtların gideceği adres (reply-to).
   * Alan adı gelene kadar Hasan'ın adresi (20 Eki 2026); sonra iletisimEposta.
   */
  yanitEposta: "hasankahrimanoglu@gmail.com",
} as const;
