"use client";

import { createContext, useContext } from "react";
import type { TaslakAile, TaslakCocuk } from "./ornekAile";
import type { CocukGorunumu } from "./veriler";

export type Ekran = "ana" | "sohbet" | "gelisim" | "kutuphane" | "aile";

export const EKRANLAR: { ekran: Ekran; etiket: string; ikon: "ev" | "sohbet" | "gelisim" | "kitap" | "aile" }[] = [
  { ekran: "ana", etiket: "Ana Sayfa", ikon: "ev" },
  { ekran: "sohbet", etiket: "Sohbet", ikon: "sohbet" },
  { ekran: "gelisim", etiket: "Gelişim", ikon: "gelisim" },
  { ekran: "kutuphane", etiket: "Kütüphane", ikon: "kitap" },
  { ekran: "aile", etiket: "Aile", ikon: "aile" },
];

/** Alttan açılan sayfa (mobil) / sağ panel (geniş ekran) içerikleri. */
export type Perde =
  /** Çocuk ekranına geçiş; çocuk kartından gelirse o çocuk ve kitap bilinir. */
  | { tur: "cihaz"; cocukId?: string; hedef?: string }
  | { tur: "kitap"; bookKey: string }
  | { tur: "odul"; odul: "rozet" | "madalya" | "unvan"; anahtar: string; ad: string; alt: string; kazanildi: boolean }
  | { tur: "profil"; cocukId: string }
  | { tur: "profil-ekle" }
  | { tur: "eslesme"; cocukId: string }
  | { tur: "sifre" }
  | { tur: "pin" }
  | { tur: "cocuk-sifresi"; cocukId: string };

export type GelisimSekmesi = "kitaplar" | "oduller" | "gorevler";

type TaslakBaglami = {
  aile: TaslakAile;
  gorunumler: CocukGorunumu[];
  ekran: Ekran;
  git: (ekran: Ekran, secenek?: { cocukId?: string; sekme?: GelisimSekmesi }) => void;
  seciliCocukId: string | null;
  cocukSec: (id: string) => void;
  gelisimSekmesi: GelisimSekmesi;
  setGelisimSekmesi: (sekme: GelisimSekmesi) => void;
  perdeAc: (perde: Perde) => void;
  perdeKapat: () => void;
  /** Önizlemede gerçek işlem yapılmaz; ne olacağı kısa bir notla söylenir. */
  bildir: (metin: string) => void;
  /** Aile ekranındaki ayarların önizleme durumu */
  ayarlar: { profilSifresiAcik: boolean; buCihazCocukta: boolean };
  setAyarlar: (ayarlar: { profilSifresiAcik: boolean; buCihazCocukta: boolean }) => void;
};

export const Baglam = createContext<TaslakBaglami | null>(null);

export function useTaslak() {
  const deger = useContext(Baglam);
  if (!deger) throw new Error("useTaslak yalnız VeliPanelTaslagi içinde kullanılır.");
  return deger;
}

export function useSeciliCocuk(): { cocuk: TaslakCocuk; gorunum: CocukGorunumu } | null {
  const { gorunumler, seciliCocukId } = useTaslak();
  const gorunum = gorunumler.find((g) => g.cocuk.id === seciliCocukId) ?? gorunumler[0];
  return gorunum ? { cocuk: gorunum.cocuk, gorunum } : null;
}
