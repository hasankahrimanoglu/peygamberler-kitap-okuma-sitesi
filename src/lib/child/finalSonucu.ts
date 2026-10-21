"use client";

/**
 * Final sonucuna dönüş (PROJE-MODELI 4.1/13 EK — 21 Eki 2026).
 *
 * "Tekrar bakmak istersen" listesinden bölüme giden çocuk, bölümü okuyunca
 * aynı sonuç ekranına döner. Cevaplar yalnız final sayfasının hafızasındaydı
 * ve sayfadan çıkınca kayboluyordu; sonuç kesinleşince (kayıt tamam, kayıtlı
 * final ya da alıştırma) sekmenin oturum deposuna yazılır.
 *
 * Kayıt değil, ekran hafızasıdır: Supabase'e gitmez, madalyayı ya da ilk
 * final sonucunu etkilemez. Yalnız aynı profil ve `?sonuc=1` adresiyle
 * geri yüklenir; test yeniden başlayınca silinir.
 */

/** Okuma ekranına "finalden geldin" bilgisini taşıyan adres parametresi. */
export const FINAL_DONUS_PARAMETRESI = "donus=final";

/** Sonuç ekranını geri yükleten adres parametresi. */
export const FINAL_SONUC_PARAMETRESI = "sonuc=1";

/** Bundan eski sonuç geri yüklenmez (açık profil de 30 dk'da kapanır). */
const GECERLILIK_DK = 60;

export type FinalSonucKaydi = {
  profilId: string | null;
  /** Soru sırasıyla her cevabın doğru olup olmadığı. */
  sonuclar: boolean[];
  /** Sonuç ekranındaki kayıt durumu; yalnız kesinleşmiş durumlar saklanır. */
  kayit: "saved" | "already-completed" | "idle";
  alistirma: boolean;
  zaman: number;
};

function anahtar(bookKey: string) {
  return `final-sonucu-${bookKey}`;
}

export function finalSonucunuSakla(bookKey: string, kayit: Omit<FinalSonucKaydi, "zaman">) {
  try {
    window.sessionStorage.setItem(anahtar(bookKey), JSON.stringify({ ...kayit, zaman: Date.now() }));
  } catch {
    // Gizli sekme ya da depolama kapalı: dönüşte test baştan başlar.
  }
}

export function finalSonucunuSil(bookKey: string) {
  try {
    window.sessionStorage.removeItem(anahtar(bookKey));
  } catch {
    // Depolama kapalı: silinecek bir şey de yoktur.
  }
}

/** Aynı profilin, aynı soru sayısıyla, süresi geçmemiş sonucu; yoksa null. */
export function finalSonucunuOku(
  bookKey: string,
  profilId: string | null,
  soruSayisi: number,
): FinalSonucKaydi | null {
  try {
    const kayit = JSON.parse(window.sessionStorage.getItem(anahtar(bookKey)) ?? "null") as
      | FinalSonucKaydi
      | null;
    if (!kayit || kayit.profilId !== profilId) return null;
    if (!Array.isArray(kayit.sonuclar) || kayit.sonuclar.length !== soruSayisi) return null;
    if (Date.now() - kayit.zaman > GECERLILIK_DK * 60 * 1000) return null;
    return kayit;
  } catch {
    return null;
  }
}

/** Adres çubuğunda verilen parametre var mı (`donus=final`, `sonuc=1`). */
export function adresteVar(parametre: string) {
  const [ad, deger] = parametre.split("=");
  return new URLSearchParams(window.location.search).get(ad) === deger;
}
