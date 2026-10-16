/**
 * Yasal sayfaların veri biçimi. Metinler `src/data/yasal/*.ts` dosyalarında,
 * görünüm `src/components/tanitim/YasalBelgeSayfasi.tsx` içindedir.
 *
 * Metin içindeki `{anahtar}` kalıpları sayfa çizilirken `SATICI` ve `MARKA`
 * değerleriyle doldurulur (bkz. `satici.ts:YER_TUTUCULAR`). Köşeli parantezli
 * değerler ("[Açık adres]") doldurulmamış alanlardır; sayfada sarı vurguyla
 * görünür, doldurulunca vurgu kendiliğinden kalkar.
 */
export type YasalIcerik =
  | string
  | { liste: string[] }
  | { tablo: { basliklar: string[]; satirlar: string[][] } };

export type YasalBolum = {
  baslik: string;
  icerik: YasalIcerik[];
};

export type YasalBelge = {
  /** Sayfa adresi, ör. "/kvkk-aydinlatma-metni". */
  yol: string;
  baslik: string;
  /** Altbilgideki bağlantı adı. */
  kisaBaslik: string;
  /** Sayfa açıklaması: başlığın altında ve arama motoru açıklamasında. */
  ozet: string;
  /** Son güncelleme günü, okunur biçimde ("15 Ekim 2026"). */
  guncelleme: string;
  bolumler: YasalBolum[];
};
