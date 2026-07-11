type Durum = "tamamlandi" | "devam" | "yeni" | "kilitli";

type DurumCipiProps = {
  durum: Durum;
  /** Varsayılan metni değiştirmek için */
  metin?: string;
  className?: string;
};

// PROJE-MODELI.md 3.4 — kart durum dili
const durumlar: Record<Durum, { metin: string; sinif: string; isaret: string }> = {
  tamamlandi: {
    metin: "Tamamlandı",
    sinif: "bg-eylem-yumusak text-eylem",
    isaret: "✓",
  },
  devam: {
    metin: "Devam Ediyor",
    sinif: "bg-vurgu-yumusak text-vurgu",
    isaret: "●",
  },
  yeni: {
    metin: "Yeni Açıldı",
    sinif: "bg-vurgu-yumusak text-vurgu",
    isaret: "✦",
  },
  kilitli: {
    metin: "Kilitli",
    sinif: "bg-yuzey-2 text-murekkep-soluk",
    isaret: "🔒",
  },
};

export function DurumCipi({ durum, metin, className = "" }: DurumCipiProps) {
  const bilgi = durumlar[durum];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${bilgi.sinif} ${className}`}
    >
      <span aria-hidden>{bilgi.isaret}</span>
      {metin ?? bilgi.metin}
    </span>
  );
}
