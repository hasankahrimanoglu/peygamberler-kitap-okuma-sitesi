/**
 * Satın alma ve ilk girişin sunucu tarafı (Faz 7, 3. adım — PROJE-MODELI
 * Bölüm 8). YALNIZ sunucu yollarından (`app/api/**`) çağrılır: Supabase
 * service_role anahtarını ve Resend anahtarını kullanır.
 *
 * Ödeme sisteminden bağımsız çekirdek `siparisiIsle`'dir. Shopier (ileride
 * iyzico/PayTR) ve elden satış yalnız bildirimi doğrulayıp bu fonksiyonu
 * çağırır. Şifre hiçbir yerde üretilmez, gönderilmez, kayda yazılmaz: veli
 * şifresini tek kullanımlık bağlantıyla kendisi belirler.
 */

import crypto from "crypto";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import { MARKA } from "../../data/marka";
import {
  hosGeldinEpostasi,
  paketGuncellendiEpostasi,
  type EpostaIcerigi,
} from "./epostaSablonlari";

export type SiparisKaynagi = "shopier" | "iyzico" | "paytr" | "elden";

export type SiparisGirdisi = {
  kaynak: SiparisKaynagi;
  siparisNo: string;
  eposta: string;
  profilHakki: number;
  /** Ödeme sisteminin deneme bildirimi: kayda düşer, hesap açmaz. */
  test?: boolean;
  not?: string | null;
};

export type SiparisSonucu =
  | { durum: "test" | "zaten" }
  | {
      durum: "islendi";
      yeniHesap: boolean;
      profilHakki: number;
      hakArtti: boolean;
      epostaGonderildi: boolean;
      /** Veli şifresini henüz belirlemediyse şifre belirleme bağlantısı. */
      baglanti: string | null;
    };

// --- Küçük yardımcılar ---------------------------------------------------------

/**
 * E-posta karşılaştırması için. `toLocaleLowerCase("tr-TR")` KULLANILMAZ:
 * "INFO@" → "ınfo@" olurdu; veritabanındaki `lower()` ile uyuşmaz.
 */
export function epostaNormal(eposta: string) {
  return eposta.trim().toLowerCase();
}

export function epostaGecerliMi(eposta: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta) && eposta.length <= 254;
}

/** Kayıtlarda (log) e-posta: h***@gmail.com */
export function maskele(eposta: string) {
  const [ad, alan] = eposta.split("@");
  if (!alan) return "***";
  return `${ad.slice(0, 1)}***@${alan}`;
}

/** sha256 özeti (şifre isteği sınırı; ham e-posta ve IP saklanmaz). */
export function ozet(deger: string) {
  return crypto.createHash("sha256").update(deger).digest("hex");
}

export function siteAdresi() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

function hataMetni(hata: unknown) {
  const metin = hata instanceof Error ? hata.message : String(hata);
  return metin.slice(0, 300);
}

// --- E-posta -------------------------------------------------------------------

/**
 * Resend ile gönderir; yanıtlar `MARKA.yanitEposta`'ya gider. Ayar yoksa ya da
 * gönderim başarısızsa false döner — içerik (bağlantı dahil) kayda YAZILMAZ.
 */
export async function epostaGonder(alici: string, icerik: EpostaIcerigi): Promise<boolean> {
  const anahtar = process.env.RESEND_API_KEY;
  const gonderen = process.env.MAIL_FROM;

  if (!anahtar || !gonderen) {
    console.warn("E-posta ayarı yok, gönderilmedi.", { alici: maskele(alici), konu: icerik.konu });
    return false;
  }

  try {
    const yanit = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${anahtar}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: gonderen,
        to: alici,
        reply_to: MARKA.yanitEposta,
        subject: icerik.konu,
        html: icerik.html,
        text: icerik.metin,
      }),
    });
    if (!yanit.ok) {
      console.error("E-posta gönderilemedi.", {
        alici: maskele(alici),
        konu: icerik.konu,
        durum: yanit.status,
        ayrinti: (await yanit.text()).slice(0, 300),
      });
      return false;
    }
    return true;
  } catch (hata) {
    console.error("E-posta gönderilemedi.", { alici: maskele(alici), konu: icerik.konu, hata: hataMetni(hata) });
    return false;
  }
}

// --- Veli ve şifre bağlantısı ----------------------------------------------------

export async function veliBul(eposta: string): Promise<{ veliId: string | null; sifreVar: boolean }> {
  const { data, error } = await getSupabaseAdmin().rpc("veli_bul", { p_eposta: epostaNormal(eposta) });
  if (error) throw error;
  const sonuc = data as { veli_id: string | null; sifre_var: boolean };
  return { veliId: sonuc.veli_id, sifreVar: Boolean(sonuc.sifre_var) };
}

/**
 * Tek kullanımlık "şifreni belirle" bağlantısı (Supabase kurtarma anahtarı).
 * Bağlantı Supabase'e değil `/sifre-belirle`'ye gider; anahtar sayfa açılınca
 * değil "Şifremi Kaydet"e basılınca harcanır (e-posta taramaları yakmasın).
 */
export async function sifreBaglantisiUret(eposta: string): Promise<string> {
  const { data, error } = await getSupabaseAdmin().auth.admin.generateLink({
    type: "recovery",
    email: epostaNormal(eposta),
  });
  if (error) throw error;
  const anahtar = data.properties?.hashed_token;
  if (!anahtar) throw new Error("Şifre bağlantısı üretilemedi.");
  return `${siteAdresi()}/sifre-belirle?anahtar=${encodeURIComponent(anahtar)}`;
}

// --- Çekirdek: sipariş ------------------------------------------------------------

/**
 * Siparişi işler: kaydeder (aynı sipariş ikinci kez işlenmez), veli hesabını
 * açar ya da bulur, aboneliği günceller (profil hakkı küçülmez), e-postayı
 * gönderir. Hata olursa sipariş "hata" kalır ve hata yeniden fırlatılır;
 * ödeme sistemi bildirimi tekrarlayınca yeniden denenir.
 */
export async function siparisiIsle(girdi: SiparisGirdisi): Promise<SiparisSonucu> {
  const admin = getSupabaseAdmin();

  const { data: kayitVerisi, error: kayitHatasi } = await admin.rpc("siparis_kaydet", {
    p_kaynak: girdi.kaynak,
    p_siparis_no: girdi.siparisNo,
    p_eposta: epostaNormal(girdi.eposta),
    p_profil: girdi.profilHakki,
    p_test: Boolean(girdi.test),
    p_not: girdi.not ?? null,
  });
  if (kayitHatasi) throw kayitHatasi;

  const kayit = kayitVerisi as
    | { id: string; islenecek: true; eposta: string; profil_hakki: number }
    | { id: string; islenecek: false; durum: string };
  if (!kayit.islenecek) return { durum: kayit.durum === "test" ? "test" : "zaten" };

  // Tekrar gelen bildirimde ilk kaydın e-postası ve profil hakkı geçerlidir.
  const eposta = kayit.eposta;
  try {
    let veli = await veliBul(eposta);
    let yeniHesap = false;
    if (!veli.veliId) {
      const { data, error } = await admin.auth.admin.createUser({ email: eposta, email_confirm: true });
      if (error) {
        // Aynı anda gelen ikinci bildirim hesabı açmış olabilir.
        veli = await veliBul(eposta);
        if (!veli.veliId) throw error;
      } else {
        veli = { veliId: data.user.id, sifreVar: false };
        yeniHesap = true;
      }
    }

    const { data: abonelikVerisi, error: abonelikHatasi } = await admin.rpc("abonelik_guncelle", {
      p_veli: veli.veliId,
      p_eposta: eposta,
      p_profil: kayit.profil_hakki,
    });
    if (abonelikHatasi) throw abonelikHatasi;
    const abonelik = abonelikVerisi as { onceki: number | null; profil_hakki: number };
    const hakArtti = abonelik.onceki === null || abonelik.profil_hakki > abonelik.onceki;

    let baglanti: string | null = null;
    let icerik: EpostaIcerigi;
    if (!veli.sifreVar) {
      baglanti = await sifreBaglantisiUret(eposta);
      icerik = hosGeldinEpostasi({ eposta, profilHakki: abonelik.profil_hakki, baglanti });
    } else {
      icerik = paketGuncellendiEpostasi({
        eposta,
        profilHakki: abonelik.profil_hakki,
        hakArtmadi: !hakArtti,
        girisAdresi: `${siteAdresi()}/login`,
      });
    }
    const epostaGonderildi = await epostaGonder(eposta, icerik);

    await admin
      .from("siparisler")
      .update({
        durum: "islendi",
        veli_id: veli.veliId,
        eposta_gonderildi: epostaGonderildi,
        hata: null,
        guncellendi: new Date().toISOString(),
      })
      .eq("id", kayit.id);

    return {
      durum: "islendi",
      yeniHesap,
      profilHakki: abonelik.profil_hakki,
      hakArtti,
      epostaGonderildi,
      baglanti,
    };
  } catch (hata) {
    await admin
      .from("siparisler")
      .update({ durum: "hata", hata: hataMetni(hata), guncellendi: new Date().toISOString() })
      .eq("id", kayit.id);
    throw hata;
  }
}

// --- Yönetici ---------------------------------------------------------------------

/**
 * Yönetim sayfası isteklerini doğrular: `Authorization: Bearer <erişim anahtarı>`
 * ile gelen oturumun e-postası `yoneticiler` tablosunda olmalı.
 */
export async function yoneticiDogrula(istek: Request): Promise<{ eposta: string } | null> {
  const baslik = istek.headers.get("authorization") ?? "";
  const anahtar = baslik.startsWith("Bearer ") ? baslik.slice(7) : "";
  if (!anahtar) return null;

  // Her hatada kapalı: doğrulanamayan istek yönetici sayılmaz (403).
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.auth.getUser(anahtar);
    const eposta = data.user?.email ? epostaNormal(data.user.email) : null;
    if (error || !eposta || data.user?.is_anonymous) return null;

    const { data: yonetici } = await admin.from("yoneticiler").select("eposta").eq("eposta", eposta).maybeSingle();
    return yonetici ? { eposta } : null;
  } catch (hata) {
    console.error("Yönetici doğrulanamadı.", { hata: hata instanceof Error ? hata.message : String(hata) });
    return null;
  }
}
