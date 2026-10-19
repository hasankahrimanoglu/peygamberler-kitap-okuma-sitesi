"use client";

/**
 * Çocuk oturumu ve cihaz durumu (Faz 7 — PROJE-MODELI 3.11).
 *
 * Çocuğun ayrı hesabı yoktur. Çocuk ekranı iki yoldan açılır:
 *  - Ortak cihaz: velinin Supabase oturumu açıktır; çocuk "Kim okuyor?"dan
 *    profilini seçer. Aile ayarı açıksa 4 rakamlı şifresini girer; açık profil
 *    tarayıcı oturumu kapanınca ya da 30 dakika etkileşim olmayınca kapanır.
 *  - Bağlı cihaz: eşleme koduyla bağlanmış anonim oturum; profil
 *    `cihaz_baglantilari`'ndan gelir, seçim ve şifre yoktur.
 *
 * Veritabanı kuralları veriyi ayrıca korur; buradaki kontrol kardeşler arası
 * geçişi ve veli kapısını yönetir (dürüst sınır: meraklı çocuğu durdurur).
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { aileGuvenlikDurumu } from "../aileGuvenligi";

// Mevcut ekranların okuduğu anahtarlar (geri uyumluluk için adları korundu).
const SECILI_PROFIL = "selected_child_profile_id";
const SECILI_PROFIL_ADI = "selected_child_profile_name";
const SECILI_COCUK_ADI = "selected_child_name";

/** Bu cihaz çocuğa verildi mi (veli kapısı buna bakar). */
const COCUK_MODU = "cocuk_modu";
/** Son çocuk etkinliği (ms) — 30 dakikalık zaman aşımı için. */
const SON_ETKINLIK = "son_cocuk_etkinligi";
/** Tarayıcı oturumunda açılmış profil (sessionStorage). */
const ACIK_PROFIL = "profil_acik";
/** Veli kapısının açıldığı / son panel etkinliği zamanı (sessionStorage). */
const VELI_KAPISI = "veli_kapisi_acik";
/** Veli "yalnız göz atacağım" dedi: bu tarayıcı oturumunda çocuk modu açılmaz (sessionStorage). */
const GOZ_ATMA = "veli_goz_atiyor";

export const PROFIL_ZAMAN_ASIMI_DK = 30;
export const VELI_KAPISI_ZAMAN_ASIMI_DK = 15;

function oku(depo: Storage, anahtar: string) {
  try {
    return depo.getItem(anahtar);
  } catch {
    return null;
  }
}

function yaz(depo: Storage, anahtar: string, deger: string | null) {
  try {
    if (deger === null) depo.removeItem(anahtar);
    else depo.setItem(anahtar, deger);
  } catch {
    // Gizli sekme ya da depolama kapalı: oturum yine çalışır, yalnız hatırlanmaz.
  }
}

// --- Seçili profil -----------------------------------------------------------

export function seciliProfilId() {
  return oku(localStorage, SECILI_PROFIL);
}

function seciliProfiliYaz(profil: { id: string; isim: string | null }) {
  yaz(localStorage, SECILI_PROFIL, profil.id);
  if (profil.isim) {
    yaz(localStorage, SECILI_PROFIL_ADI, profil.isim);
    yaz(localStorage, SECILI_COCUK_ADI, profil.isim);
  }
}

export function seciliProfiliTemizle() {
  yaz(localStorage, SECILI_PROFIL, null);
  yaz(localStorage, SECILI_PROFIL_ADI, null);
  yaz(localStorage, SECILI_COCUK_ADI, null);
}

/** Profil adı değişince çocuk ekranlarının hemen yeni adı göstermesi için. */
export function seciliProfilAdiniGuncelle(profilId: string, isim: string) {
  if (seciliProfilId() !== profilId) return;
  yaz(localStorage, SECILI_PROFIL_ADI, isim);
  yaz(localStorage, SECILI_COCUK_ADI, isim);
}

// --- Çocuk modu ve açık profil ---------------------------------------------

export function cocukModuAcikMi() {
  return oku(localStorage, COCUK_MODU) === "1";
}

/** Veli panelinden: bu cihaz yalnız veli için, panel PIN istemesin. */
export function cocukModunuKapat() {
  yaz(localStorage, COCUK_MODU, null);
  yaz(sessionStorage, ACIK_PROFIL, null);
}

/** "Bu cihazı çocuğunuz kullanacak mı?" → Evet: cihaz çocuğa verilir, panel kilitlenir. */
export function cocukModunuAc() {
  yaz(localStorage, COCUK_MODU, "1");
  yaz(sessionStorage, GOZ_ATMA, null);
  veliKapisiniKapat();
}

function veliGozAtiyorMu() {
  return oku(sessionStorage, GOZ_ATMA) === "1";
}

export function etkinligiKaydet() {
  yaz(localStorage, SON_ETKINLIK, String(Date.now()));
}

/**
 * Profili açar (şifre doğrulandıktan sonra ya da şifre istenmiyorsa). Cihazı
 * çocuk moduna alır ve veli kapısını kilitler — veli bu tarayıcı oturumunda
 * "yalnız göz atacağım" demediyse (`gozAt`, 3.11).
 */
export function profiliAc(
  profil: { id: string; isim: string | null },
  { gozAt = false }: { gozAt?: boolean } = {},
) {
  seciliProfiliYaz(profil);
  yaz(sessionStorage, ACIK_PROFIL, profil.id);
  etkinligiKaydet();
  if (gozAt) {
    yaz(sessionStorage, GOZ_ATMA, "1");
    return;
  }
  if (!veliGozAtiyorMu()) cocukModunuAc();
}

/** "Profil değiştir" ve zaman aşımı: açık profil kapanır, seçim durur. */
export function profiliKapat() {
  yaz(sessionStorage, ACIK_PROFIL, null);
}

function profilAcikMi(profilId: string) {
  if (oku(sessionStorage, ACIK_PROFIL) !== profilId) return false;
  const son = Number(oku(localStorage, SON_ETKINLIK) ?? 0);
  return Date.now() - son < PROFIL_ZAMAN_ASIMI_DK * 60_000;
}

// --- Veli kapısı -------------------------------------------------------------

export function veliKapisiAcikMi() {
  const zaman = Number(oku(sessionStorage, VELI_KAPISI) ?? 0);
  return zaman > 0 && Date.now() - zaman < VELI_KAPISI_ZAMAN_ASIMI_DK * 60_000;
}

/** PIN ya da hesap şifresi doğrulanınca; panelde etkileşim oldukça yenilenir. */
export function veliKapisiniAc() {
  yaz(sessionStorage, VELI_KAPISI, String(Date.now()));
}

export function veliKapisiniKapat() {
  yaz(sessionStorage, VELI_KAPISI, null);
}

// --- Etkinlik izleme ---------------------------------------------------------

/**
 * Dokunma, tuş ve kaydırma olduğunda `kaydet` çağrılır (15 sn'de bir); her
 * 30 sn'de ve sekme öne geldiğinde `denetle` çalışır. Temizleyici döner.
 */
export function etkinlikIzle(kaydet: () => void, denetle: () => void) {
  let son = 0;
  const olay = () => {
    const simdi = Date.now();
    if (simdi - son < 15_000) return;
    son = simdi;
    kaydet();
  };
  const gorunurluk = () => {
    if (document.visibilityState === "visible") denetle();
  };
  const olaylar = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  olaylar.forEach((ad) => window.addEventListener(ad, olay, { passive: true }));
  document.addEventListener("visibilitychange", gorunurluk);
  const zamanlayici = window.setInterval(denetle, 30_000);
  return () => {
    olaylar.forEach((ad) => window.removeEventListener(ad, olay));
    document.removeEventListener("visibilitychange", gorunurluk);
    window.clearInterval(zamanlayici);
  };
}

// --- Çocuk ekranı koruması ----------------------------------------------------

type Denetim =
  | { tur: "yonlendir"; adres: string }
  | { tur: "hazir"; profilId: string; bagliCihaz: boolean; zamanAsimi: boolean };

async function cocukOturumunuDenetle(): Promise<Denetim> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { tur: "yonlendir", adres: COCUK_GIRISI };

  // Bağlı cihaz: profil bağlantıdan gelir.
  if (session.user.is_anonymous) {
    const { data } = await supabase.from("cihaz_baglantilari").select("profile_id").maybeSingle();
    if (!data?.profile_id) return { tur: "yonlendir", adres: "/cihaz-bagla?durum=kaldirildi" };
    yaz(localStorage, SECILI_PROFIL, data.profile_id);
    return { tur: "hazir", profilId: data.profile_id, bagliCihaz: true, zamanAsimi: false };
  }

  // Ortak cihaz: velinin oturumu, seçili profil.
  const secili = seciliProfilId();
  if (!secili) return { tur: "yonlendir", adres: "/kim-okuyor" };

  const [profil, durum] = await Promise.all([
    supabase.from("profiles").select("id").eq("id", secili).maybeSingle(),
    aileGuvenlikDurumu(),
  ]);
  if (!profil.data) {
    seciliProfiliTemizle();
    return { tur: "yonlendir", adres: "/kim-okuyor" };
  }

  // Ayar okunamazsa (ağ hatası) çocuğu ekrandan atmıyoruz; veri yine
  // veritabanı kurallarıyla korunuyor.
  const sifreAcik = Boolean(durum?.profilSifresiAcik);
  if (sifreAcik && !profilAcikMi(secili)) {
    profiliKapat();
    return { tur: "yonlendir", adres: "/kim-okuyor" };
  }

  // Sorudan geçmeden açılan çocuk ekranı (yer imi, eski sekme) cihazı kilitler;
  // yalnız velinin göz attığı oturumda kilitlemez.
  if (!veliGozAtiyorMu()) yaz(localStorage, COCUK_MODU, "1");
  return { tur: "hazir", profilId: secili, bagliCihaz: false, zamanAsimi: sifreAcik };
}

export type CocukOturumu =
  | { durum: "bekliyor" }
  | { durum: "hazir"; profilId: string; bagliCihaz: boolean };

/**
 * Bütün çocuk ekranları bu korumadan geçer. Oturum yoksa girişe, profil
 * açık değilse "Kim okuyor?"a, bağlantısı kaldırılmış cihazı bağlama ekranına
 * yönlendirir. Profil şifresi açıksa 30 dakikalık zaman aşımını izler.
 */
export function useCocukOturumu(): CocukOturumu {
  const router = useRouter();
  const [oturum, setOturum] = useState<CocukOturumu>({ durum: "bekliyor" });

  useEffect(() => {
    let iptal = false;
    let izlemeyiBitir: (() => void) | undefined;

    cocukOturumunuDenetle().then((sonuc) => {
      if (iptal) return;
      if (sonuc.tur === "yonlendir") {
        router.replace(sonuc.adres);
        return;
      }
      setOturum({ durum: "hazir", profilId: sonuc.profilId, bagliCihaz: sonuc.bagliCihaz });
      etkinligiKaydet();

      if (sonuc.zamanAsimi) {
        izlemeyiBitir = etkinlikIzle(etkinligiKaydet, () => {
          if (!profilAcikMi(sonuc.profilId)) {
            profiliKapat();
            router.replace("/kim-okuyor");
          }
        });
      }
    });

    return () => {
      iptal = true;
      izlemeyiBitir?.();
    };
  }, [router]);

  return oturum;
}

type Yonlendirici = { push: (adres: string) => void };

/** Cihaz çocuğa verildikten sonra: "Kim okuyor?" veliye ana ekran notunu gösterir. */
export const KURULUM_ADRESI = "/kim-okuyor?kurulum=1";

/**
 * Oturumsuz çocuk ekranının gittiği giriş (ana ekran uygulamasının ilk
 * açılışı ya da düşmüş oturum): veli giriş yapınca cihaz çocuğa verilir ve
 * "Kim okuyor?" açılır (PROJE-MODELI 3.11).
 */
export const COCUK_GIRISI = "/login?cocuk=1";

/**
 * Veli panelinden çocuk ekranına geçiş ("Okumaya Devam Et", Kütüphane).
 * Çocuk modunda olmayan cihazda önce "Bu cihazı çocuğunuz kullanacak mı?"
 * sorulur (`useCocukEkraniGecisi`); bu fonksiyon cevaptan sonra çalışır.
 * Göz atmada cihaz kilitlenmez. Kilitlenecekse ve veli PIN'i yoksa önce
 * belirletir: PIN'siz cihaz çocuk moduna girerse veli paneli korumasız kalır.
 */
export async function cocukEkraninaGec(
  router: Yonlendirici,
  profil: { id: string; isim: string | null },
  hedef = "/map",
  { gozAt = false }: { gozAt?: boolean } = {},
) {
  if (!gozAt) {
    const durum = await aileGuvenlikDurumu();
    if (durum && !durum.veliPinVar) {
      const sorgu = new URLSearchParams({ pin: "gerekli", profil: profil.id, hedef });
      router.push(`/dashboard/ayarlar?${sorgu.toString()}`);
      return;
    }
  }
  profiliAc(profil, { gozAt });
  router.push(hedef);
}

/**
 * "Evet, çocuğuma veriyorum" ve Aile ve Güvenlik → "Bu Cihazı Çocuğa Ver".
 * Veli PIN'i yoksa önce belirletir (Aile ve Güvenlik, sonra buraya döner);
 * varsa cihazı çocuk moduna alıp "Kim okuyor?"u açar.
 */
export async function cihaziCocugaVer(router: Yonlendirici) {
  const durum = await aileGuvenlikDurumu();
  if (durum && !durum.veliPinVar) {
    const sorgu = new URLSearchParams({ pin: "gerekli", hedef: KURULUM_ADRESI });
    router.push(`/dashboard/ayarlar?${sorgu.toString()}`);
    return;
  }
  cocukModunuAc();
  router.push(KURULUM_ADRESI);
}
