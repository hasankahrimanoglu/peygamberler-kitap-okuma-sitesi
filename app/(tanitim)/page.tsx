import type { Metadata } from "next";
import { BolumYolculugu } from "../../src/components/tanitim/BolumYolculugu";
import { Dongu } from "../../src/components/tanitim/Dongu";
import { Hero } from "../../src/components/tanitim/Hero";
import { Ilkeler } from "../../src/components/tanitim/Ilkeler";
import { Kutuphane } from "../../src/components/tanitim/Kutuphane";
import { Oduller } from "../../src/components/tanitim/Oduller";
import { Paketler } from "../../src/components/tanitim/Paketler";
import { SesliAnlatim } from "../../src/components/tanitim/SesliAnlatim";
import { SonCagri } from "../../src/components/tanitim/SonCagri";
import { Sss } from "../../src/components/tanitim/Sss";
import { VeliPaneli } from "../../src/components/tanitim/VeliPaneli";
import { KATALOG_SAYILARI } from "../../src/data/katalogSayilari";
import { MARKA } from "../../src/data/marka";

const aciklama = `Çocuklar için sesli ve etkileşimli peygamber kıssaları: ${MARKA.hedefYas} yaş için ${KATALOG_SAYILARI.kitap} kitap, ${KATALOG_SAYILARI.bolum} sesli bölüm. Reklamsız, puan baskısı olmadan, veli paneliyle.`;

export const metadata: Metadata = {
  title: `${MARKA.ad} | Çocuklar için sesli ve etkileşimli peygamber kıssaları`,
  description: aciklama,
  openGraph: {
    title: MARKA.ad,
    description: aciklama,
    locale: "tr_TR",
    type: "website",
  },
};

/**
 * Tanıtım sayfası. Yalnız yayındaki kitapları anlatır (REVİZE 21 Eki 2026 —
 * Hasan: lansman 12 kitapla; sayılar ve görseller `katalogSayilari.ts`'ten).
 *
 * Akış: gece (çocuğun dünyası) → şafak → krem (velinin paneli) → akşam.
 * Bölüm sırası satış akışını izler: vaat → nasıl çalışır → öne çıkanlar →
 * veli → güven → içerik → fiyat → sorular → kapanış.
 */
export default function TanitimSayfasi() {
  return (
    <main>
      <div className="tema-cocuk zemin-yildizli">
        <Hero />
        <Dongu />
        <BolumYolculugu />
        <SesliAnlatim />
        <Oduller />
      </div>
      <VeliPaneli />
      <Ilkeler />
      <Kutuphane />
      <Paketler />
      <Sss />
      <SonCagri />
    </main>
  );
}
