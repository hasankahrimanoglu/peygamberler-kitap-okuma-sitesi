import type { IkonAdi } from "./Ikon";
import { Ikon } from "./Ikon";

type Durum = "tamamlandi" | "devam" | "yeni" | "kilitli";

type DurumCipiProps = {
  durum: Durum;
  /** Varsayılan metni değiştirmek için */
  metin?: string;
  className?: string;
};

// PROJE-MODELI.md 3.4 — kart durum dili
const durumlar: Record<
  Durum,
  { metin: string; sinif: string; ikon: IkonAdi; ikonBoyut: number }
> = {
  tamamlandi: {
    metin: "Tamamlandı",
    sinif: "bg-eylem-yumusak text-eylem",
    ikon: "onay",
    ikonBoyut: 14,
  },
  devam: {
    metin: "Devam Ediyor",
    sinif: "bg-vurgu-yumusak text-vurgu",
    ikon: "nokta",
    ikonBoyut: 10,
  },
  yeni: {
    metin: "Yeni Açıldı",
    sinif: "bg-vurgu-yumusak text-vurgu",
    ikon: "yildiz",
    ikonBoyut: 14,
  },
  kilitli: {
    metin: "Kilitli",
    sinif: "bg-yuzey-2 text-murekkep-soluk",
    ikon: "kilit",
    ikonBoyut: 14,
  },
};

export function DurumCipi({ durum, metin, className = "" }: DurumCipiProps) {
  const bilgi = durumlar[durum];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${bilgi.sinif} ${className}`}
    >
      <Ikon ad={bilgi.ikon} boyut={bilgi.ikonBoyut} />
      {metin ?? bilgi.metin}
    </span>
  );
}
