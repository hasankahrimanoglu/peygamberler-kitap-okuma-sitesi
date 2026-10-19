/**
 * Aile güvenliği — veritabanı fonksiyonlarının istemci tarafı (Faz 7,
 * PROJE-MODELI 3.11). Şifre özetleri ve eşleme kodları istemciye hiç gelmez;
 * doğrulamayı `supabase/migration-faz7-guvenlik.sql` içindeki SECURITY DEFINER
 * fonksiyonlar yapar. Burada yalnız çağrı ve sonuç biçimi var.
 *
 * Ağ ya da yetki hatasında fonksiyonlar `null` döner; ekran "tekrar dene" der.
 */

import { supabase } from "../../lib/supabase";

export type AileGuvenlikDurumu = {
  profilSifresiAcik: boolean;
  veliPinVar: boolean;
  sifresiOlanProfiller: string[];
};

export type DogrulamaSonucu = {
  durum: "dogru" | "yanlis" | "kilitli" | "yok";
  kalanSaniye?: number;
};

export type VeliPinSonucu = "tamam" | "gecersiz" | "cocuk_sifresiyle_ayni";
export type CocukSifresiSonucu =
  | "tamam"
  | "gecersiz"
  | "veli_pin_ile_ayni"
  | "kardes_sifresiyle_ayni";

export type CihazBaglamaSonucu = {
  durum: "tamam" | "yanlis" | "kilitli" | "veli_oturumu";
  profilId?: string;
  isim?: string;
  kalanSaniye?: number;
};

type HamDogrulama = { durum: DogrulamaSonucu["durum"]; kalan_saniye?: number };

function dogrulamaSonucu(veri: unknown): DogrulamaSonucu | null {
  if (!veri || typeof veri !== "object") return null;
  const ham = veri as HamDogrulama;
  return { durum: ham.durum, kalanSaniye: ham.kalan_saniye };
}

export async function aileGuvenlikDurumu(): Promise<AileGuvenlikDurumu | null> {
  const { data, error } = await supabase.rpc("aile_guvenlik_durumu");
  if (error || !data) return null;
  const ham = data as {
    profil_sifresi_acik: boolean;
    veli_pin_var: boolean;
    sifresi_olan_profiller: string[];
  };
  return {
    profilSifresiAcik: Boolean(ham.profil_sifresi_acik),
    veliPinVar: Boolean(ham.veli_pin_var),
    sifresiOlanProfiller: ham.sifresi_olan_profiller ?? [],
  };
}

export async function veliPinBelirle(pin: string): Promise<VeliPinSonucu | null> {
  const { data, error } = await supabase.rpc("veli_pin_belirle", { p_pin: pin });
  return error ? null : (data as VeliPinSonucu);
}

export async function veliPinDogrula(pin: string): Promise<DogrulamaSonucu | null> {
  const { data, error } = await supabase.rpc("veli_pin_dogrula", { p_pin: pin });
  return error ? null : dogrulamaSonucu(data);
}

export async function cocukSifresiBelirle(
  profilId: string,
  sifre: string,
): Promise<CocukSifresiSonucu | null> {
  const { data, error } = await supabase.rpc("cocuk_sifresi_belirle", {
    p_profil: profilId,
    p_sifre: sifre,
  });
  return error ? null : (data as CocukSifresiSonucu);
}

export async function cocukSifresiDogrula(
  profilId: string,
  sifre: string,
): Promise<DogrulamaSonucu | null> {
  const { data, error } = await supabase.rpc("cocuk_sifresi_dogrula", {
    p_profil: profilId,
    p_sifre: sifre,
  });
  return error ? null : dogrulamaSonucu(data);
}

export async function profilSifresiAyariniDegistir(
  acik: boolean,
): Promise<"tamam" | "eksik_sifre" | null> {
  const { data, error } = await supabase.rpc("profil_sifresi_ayarini_degistir", { p_acik: acik });
  return error ? null : (data as "tamam" | "eksik_sifre");
}

export async function eslesmeKoduOlustur(
  profilId: string,
): Promise<{ kod: string; bitis: string } | null> {
  const { data, error } = await supabase.rpc("eslesme_kodu_olustur", { p_profil: profilId });
  if (error || !data) return null;
  return data as { kod: string; bitis: string };
}

export async function cihaziBagla(kod: string, cihazAdi: string): Promise<CihazBaglamaSonucu | null> {
  const { data, error } = await supabase.rpc("cihazi_bagla", {
    p_kod: kod,
    p_cihaz_adi: cihazAdi,
  });
  if (error || !data) return null;
  const ham = data as { durum: CihazBaglamaSonucu["durum"]; profile_id?: string; isim?: string; kalan_saniye?: number };
  return { durum: ham.durum, profilId: ham.profile_id, isim: ham.isim, kalanSaniye: ham.kalan_saniye };
}

/**
 * Velinin hesap şifresini yeniden sorar (PIN belirleme/sıfırlama). Oturum
 * aynı kullanıcıyla yenilenir; başka hesaba geçilmez.
 */
export async function hesapSifresiyleDogrula(sifre: string): Promise<boolean> {
  const { data } = await supabase.auth.getUser();
  const eposta = data.user?.email;
  if (!eposta || data.user?.is_anonymous) return false;
  const { error } = await supabase.auth.signInWithPassword({ email: eposta, password: sifre });
  return !error;
}

/** Bağlı cihazlar listesinde gösterilecek kısa cihaz adı ("iPad", "Android tablet"). */
export function cihazAdiTahmini(): string {
  if (typeof navigator === "undefined") return "Cihaz";
  const ua = navigator.userAgent;
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "iPad";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/Android/i.test(ua)) return /Mobile/i.test(ua) ? "Android telefon" : "Android tablet";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Windows bilgisayar";
  return "Cihaz";
}

/** "5 dakika", "1 dakika" — kilit bekleme süresi metni. */
export function beklemeMetni(kalanSaniye?: number) {
  const dakika = Math.max(1, Math.ceil((kalanSaniye ?? 300) / 60));
  return `${dakika} dakika`;
}
