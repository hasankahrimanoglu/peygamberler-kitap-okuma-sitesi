"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { VeliAile, VeliCocuk } from "./tipler";
import type { CocukGorunumu } from "./veriler";

export type Ekran = "ana" | "sohbet" | "gelisim" | "kutuphane" | "aile";

/** Beş hedef (PROJE-MODELI 5.2). Rota canlı paneldir; önizleme durumla gezer. */
export const EKRANLAR: {
  ekran: Ekran;
  etiket: string;
  ikon: "ev" | "sohbet" | "gelisim" | "kitap" | "aile";
  rota: string;
}[] = [
  { ekran: "ana", etiket: "Ana Sayfa", ikon: "ev", rota: "/dashboard" },
  { ekran: "sohbet", etiket: "Sohbet", ikon: "sohbet", rota: "/dashboard/sohbet" },
  { ekran: "gelisim", etiket: "Gelişim", ikon: "gelisim", rota: "/dashboard/gelisim" },
  { ekran: "kutuphane", etiket: "Kütüphane", ikon: "kitap", rota: "/dashboard/kutuphane" },
  { ekran: "aile", etiket: "Aile", ikon: "aile", rota: "/dashboard/ayarlar" },
];

/** Canlı adresten ekranı bulur; profil ekleme Aile'nin parçasıdır. */
export function ekranBul(adres: string): Ekran {
  if (adres.startsWith("/dashboard/sohbet")) return "sohbet";
  if (adres.startsWith("/dashboard/gelisim")) return "gelisim";
  if (adres.startsWith("/dashboard/kutuphane")) return "kutuphane";
  if (adres.startsWith("/dashboard/ayarlar") || adres.startsWith("/dashboard/profil-ekle")) return "aile";
  return "ana";
}

/** Alttan açılan sayfa (mobil) / sağ panel (geniş ekran) içerikleri. */
export type Perde =
  /**
   * Çocuk ekranına geçiş. Canlıda `useCocukEkraniGecisi` sorusunu açar (3.11);
   * `adres` çocuk tarafındaki hedef ("/map", "/kitap/adem", "/quiz/nuh").
   */
  | { tur: "cihaz"; cocukId?: string; adres?: string; etiket?: string }
  | { tur: "kitap"; bookKey: string }
  | { tur: "odul"; odul: "rozet" | "madalya" | "unvan"; anahtar: string; ad: string; alt: string; kazanildi: boolean }
  | { tur: "profil"; cocukId: string }
  | { tur: "profil-ekle" }
  | { tur: "eslesme"; cocukId: string }
  | { tur: "sifre" }
  | { tur: "pin" }
  | { tur: "cocuk-sifresi"; cocukId: string };

export type PerdeIcerigi = { baslik: string; ust?: string; govde: ReactNode; alt?: ReactNode };

export type GelisimSekmesi = "kitaplar" | "oduller" | "gorevler";

type VeliPaneliBaglami = {
  /** "canli": gerçek veri ve işlemler; "onizleme": örnek aile, işlem yerine not */
  mod: "canli" | "onizleme";
  aile: VeliAile;
  gorunumler: CocukGorunumu[];
  yukleniyor: boolean;
  ekran: Ekran;
  git: (ekran: Ekran, secenek?: { cocukId?: string; sekme?: GelisimSekmesi }) => void;
  seciliCocukId: string | null;
  cocukSec: (id: string) => void;
  gelisimSekmesi: GelisimSekmesi;
  setGelisimSekmesi: (sekme: GelisimSekmesi) => void;
  perdeAc: (perde: Perde) => void;
  perdeKapat: () => void;
  bildir: (metin: string, ton?: "bilgi" | "hata") => void;
  cikisYap: () => void;
  /** Canlıda gerçek formla açılan perdeler (profil düzenleme, şifre). */
  ozelPerde?: (perde: Perde) => PerdeIcerigi | null;
  /** Önizlemenin Aile ekranındaki ayarlar (canlı Aile sayfası kendi durumunu okur) */
  ayarlar: { profilSifresiAcik: boolean; buCihazCocukta: boolean };
  setAyarlar: (ayarlar: { profilSifresiAcik: boolean; buCihazCocukta: boolean }) => void;
};

export const Baglam = createContext<VeliPaneliBaglami | null>(null);

export function useVeliPaneli() {
  const deger = useContext(Baglam);
  if (!deger) throw new Error("useVeliPaneli yalnız VeliPaneliCanli ya da VeliPaneliOnizleme içinde kullanılır.");
  return deger;
}

export function useSeciliCocuk(): { cocuk: VeliCocuk; gorunum: CocukGorunumu } | null {
  const { gorunumler, seciliCocukId } = useVeliPaneli();
  const gorunum = gorunumler.find((g) => g.cocuk.id === seciliCocukId) ?? gorunumler[0];
  return gorunum ? { cocuk: gorunum.cocuk, gorunum } : null;
}
