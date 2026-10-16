/**
 * Marka bilgileri — tanıtım (landing) ve yasal sayfaların TEK KAYNAĞI.
 *
 * Ad ve logo geçicidir (Hasan, 15 Eki 2026: yeni isim ve logo hazırlanacak).
 * İsim değişince önce bu dosya güncellenir; tanıtım sayfası, yasal metinler ve
 * logo kendiliğinden yeni adı kullanır.
 *
 * Henüz buraya bağlı OLMAYAN eski yazımlar (isim değişince elle taşınacak):
 * çocuk üst menüsündeki "Keşif Dünyası", `app/layout.tsx` başlığı ve
 * `app/api/shopier/webhook/route.ts` içindeki hoş geldin e-postası.
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
} as const;
