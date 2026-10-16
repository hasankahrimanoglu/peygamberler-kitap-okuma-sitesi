import { atlasRegions } from "./atlasCatalog";

/**
 * Tanıtım sayfasındaki sayılar (kitap, bölüm, rozet, madalya) elle yazılmaz;
 * katalogdan türetilir. Katalog belgesi değişirse (Hasan onayıyla) tanıtım
 * metinleri kendiliğinden güncellenir.
 *
 * Tanıtım sayfası sitenin TAM hâlini anlatır (KARAR 15 Eki 2026 — Hasan: site
 * bütün kitaplar bitmeden yayına açılmayacak); bu yüzden yayın durumuna
 * (`availability`) bakılmaz.
 */
const tumKitaplar = atlasRegions.flatMap((bolge) => bolge.books);

export const KATALOG_SAYILARI = {
  kitap: tumKitaplar.length,
  bolum: tumKitaplar.reduce((toplam, kitap) => toplam + kitap.chapterCount, 0),
  /** Her bölümün kendi rozeti vardır. */
  rozet: tumKitaplar.reduce((toplam, kitap) => toplam + kitap.chapterCount, 0),
  /** Her kitabın kendi madalyası vardır. */
  madalya: tumKitaplar.length,
};
