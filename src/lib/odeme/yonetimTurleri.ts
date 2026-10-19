/**
 * Yönetim sayfası (`/yonetim`, elden satış) ile sunucu yolları arasındaki
 * veri biçimleri. Tarayıcı ve sunucu ortak kullanır; gizli bilgi içermez.
 */

export type YonetimSiparisi = {
  id: string;
  kaynak: "shopier" | "iyzico" | "paytr" | "elden";
  siparis_no: string;
  eposta: string;
  profil_hakki: number;
  durum: "alindi" | "isleniyor" | "islendi" | "hata" | "test";
  eposta_gonderildi: boolean;
  not_metni: string | null;
  hata: string | null;
  olusturuldu: string;
};

export type SatisGirdisi = { eposta: string; profilHakki: number; not: string };

export type SatisSonucu =
  | {
      durum: "islendi";
      yeniHesap: boolean;
      profilHakki: number;
      hakArtti: boolean;
      epostaGonderildi: boolean;
      baglanti: string | null;
    }
  | { durum: "zaten" | "test" };

export type BaglantiSonucu = { baglanti: string; epostaGonderildi: boolean };

/** Sunucu yollarının hata cevabı: { hata } + Türkçe açıklama. */
export type YonetimHatasi = { hata: string };

export const YONETIM_HATA_METNI: Record<string, string> = {
  yetkisiz: "Bu işlem için yönetici girişi gerekiyor.",
  gecersiz_eposta: "Geçerli bir e-posta adresi yazın.",
  gecersiz_paket: "Bir paket seçin.",
  veli_yok: "Bu e-postayla açılmış bir hesap yok.",
  sunucu: "Bir sorun oldu. Tekrar deneyin.",
};
