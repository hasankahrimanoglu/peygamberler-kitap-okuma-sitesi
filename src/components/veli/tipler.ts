import type { DeriveBookRow, DeriveProgressRow, GorevDurumSatiri } from "../../lib/derive";
import type { SecimKaydi } from "../../lib/parent/report";

/**
 * Veli paneli ekranlarının okuduğu aile verisi. Canlıda `ParentDataProvider`
 * satırlarından (`VeliPaneliCanli`), önizlemede örnek aileden
 * (`ornekAile.ts`) kurulur; ekranlar kaynağı bilmez.
 */
export type VeliCocuk = {
  id: string;
  isim: string;
  avatar_tipi: string;
  /** Veli yüklediyse fotoğrafın kapalı kovadaki yolu */
  avatar_url?: string | null;
  /** Yalnız önizlemenin Aile ekranı; canlıda Aile sayfası kendisi okur */
  sifresiVar?: boolean;
  bagliCihaz?: string | null;
};

export type VeliAile = {
  eposta: string;
  profilHakki: number;
  cocuklar: VeliCocuk[];
  kitaplar: DeriveBookRow[];
  ilerleme: Record<string, DeriveProgressRow[]>;
  gorevler: Record<string, GorevDurumSatiri[]>;
  secimler: Record<string, SecimKaydi[]>;
  /** Yalnız önizlemenin Aile ekranı */
  veliPinVar?: boolean;
  profilSifresiAcik?: boolean;
};
