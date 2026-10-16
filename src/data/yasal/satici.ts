import { MARKA } from "../marka";

/**
 * Satıcı / veri sorumlusu bilgileri — yasal metinlerin TEK KAYNAĞI.
 *
 * Köşeli parantezli değerler yer tutucudur. Şirket veya şahıs bilgileri
 * kesinleşince yalnız bu dosya doldurulur; yedi yasal sayfa ve iletişim
 * sayfası kendiliğinden güncellenir.
 */
export const SATICI = {
  unvan: "[Şirket unvanı / şahıs adı soyadı]",
  adres: "[Açık adres]",
  telefon: "[Telefon]",
  eposta: MARKA.iletisimEposta,
  kep: "[KEP adresi]",
  mersis: "[MERSİS numarası]",
  vergiDairesi: "[Vergi dairesi]",
  vergiNo: "[Vergi numarası / T.C. kimlik numarası]",
  /** Barındırma ve veritabanı sağlayıcısı (KVKK aktarım bölümü). */
  barindirma: "[Barındırma ve veritabanı hizmet sağlayıcısı ile sunucu konumu]",
  /** İade başvurularının sonuçlanma süresi. */
  iadeSuresi: "14 gün",
} as const;

/** Yasal metinlerde `{anahtar}` biçiminde kullanılabilen değerler. */
export const YER_TUTUCULAR: Record<string, string> = {
  marka: MARKA.ad,
  alanAdi: MARKA.alanAdi,
  unvan: SATICI.unvan,
  adres: SATICI.adres,
  telefon: SATICI.telefon,
  eposta: SATICI.eposta,
  kep: SATICI.kep,
  mersis: SATICI.mersis,
  vergiDairesi: SATICI.vergiDairesi,
  vergiNo: SATICI.vergiNo,
  barindirma: SATICI.barindirma,
  iadeSuresi: SATICI.iadeSuresi,
};
