// Sakin "son aktivite" özeti için göreli zaman (PROJE-MODELI 7.2 / S1).
// Oyunlaştırma değil; tek satır, yumuşak bilgi.

const DAKIKA = 60 * 1000;
const SAAT = 60 * DAKIKA;
const GUN = 24 * SAAT;

/** ISO tarihi Türkçe göreli metne çevirir: "az önce", "3 saat önce", "dün", "5 Temmuz". */
export function goreliZaman(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;

  const fark = Date.now() - then;
  if (fark < 0) return "az önce";
  if (fark < DAKIKA) return "az önce";
  if (fark < SAAT) {
    const dk = Math.floor(fark / DAKIKA);
    return `${dk} dakika önce`;
  }
  if (fark < GUN) {
    const saat = Math.floor(fark / SAAT);
    return `${saat} saat önce`;
  }
  if (fark < 2 * GUN) return "dün";
  if (fark < 7 * GUN) {
    const gun = Math.floor(fark / GUN);
    return `${gun} gün önce`;
  }

  const tarih = new Date(then);
  const buYil = new Date().getFullYear();
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    ...(tarih.getFullYear() !== buYil ? { year: "numeric" } : {}),
  }).format(tarih);
}
