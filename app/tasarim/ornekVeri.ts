import { tumGorevTanimlari, type DeriveBookRow, type DeriveProgressRow, type GorevDurumSatiri } from "../../src/lib/derive";

/**
 * Ödüllerim · Kelimelerim · Görevlerim önizlemelerinin ortak örnek verisi.
 * Gerçek Supabase satırlarının biçimindedir; ekranlar aynı türetme
 * fonksiyonlarından geçer. Durumlar bilerek karışıktır: Hz. Âdem bitti
 * (madalya), Hz. Nûh'un bölümleri bitti ama final testi bekliyor, Hz. İbrahim
 * yarıda.
 */
export const ORNEK_KITAPLAR: DeriveBookRow[] = [
  { id: "ornek-adem", isim: "Hz. Âdem", toplam_bolum: 8, sira: 1 },
  { id: "ornek-nuh", isim: "Hz. Nûh", toplam_bolum: 8, sira: 4 },
  { id: "ornek-ibrahim", isim: "Hz. İbrahim", toplam_bolum: 9, sira: 7 },
];

export const ORNEK_ILERLEME: DeriveProgressRow[] = [
  { book_id: "ornek-adem", tamamlanan_bolum_sayisi: 8, yuzde: 100, bitti_mi: true, updated_at: "2026-08-20T10:00:00Z" },
  { book_id: "ornek-nuh", tamamlanan_bolum_sayisi: 8, yuzde: 100, bitti_mi: false, updated_at: "2026-09-20T10:00:00Z" },
  { book_id: "ornek-ibrahim", tamamlanan_bolum_sayisi: 1, yuzde: 11, bitti_mi: false, updated_at: "2026-10-10T10:00:00Z" },
];

export const ORNEK_PROFIL = { ad: "Elif", avatarAnahtari: "avatar-3", avatarFotografi: null };

/** İlk iki görev listede bekliyor, sonraki ikisi tamamlanmış. */
export function ornekGorevSatirlari(): GorevDurumSatiri[] {
  return tumGorevTanimlari()
    .slice(0, 4)
    .map((tanim, sira) => ({
      task_id: tanim.gorev.id,
      status: sira < 2 ? "eklendi" : "tamamlandi",
      added_at: `2026-10-0${sira + 1}T10:00:00Z`,
      completed_at: sira < 2 ? null : `2026-10-0${sira + 5}T16:00:00Z`,
    }));
}

/** `?durum=bos` ile boş ekranlar. */
export function bosMu() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("durum") === "bos";
}
