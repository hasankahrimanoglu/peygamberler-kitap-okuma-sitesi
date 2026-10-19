"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Buton } from "../ui";

/** iPad, iPhone ya da dokunmatik Mac görünümlü iPad. */
export function appleCihazi() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * Ana ekran simgesinden açılmış uygulamanın içinde mi (tarayıcı sekmesi
 * değil)? iOS 26'da bu uygulamanın hafızası tarayıcıdan ayrıdır (3.11).
 */
export function anaEkranUygulamasindaMi() {
  if (typeof window === "undefined") return false;
  const iosUygulamasi = (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return iosUygulamasi || window.matchMedia("(display-mode: standalone)").matches;
}

/**
 * "Ana ekrana ekle" adımları (PROJE-MODELI 3.11). Kullanılan cihazın adımı
 * önce yazılır. Web manifest yoktur: simge siteyi tarayıcıda açar, oturum
 * korunur.
 */
export function AnaEkranTalimati({ className = "" }: { className?: string }) {
  const [cihaz, setCihaz] = useState<"safari" | "chrome-ios" | "android">("safari");

  useEffect(() => {
    queueMicrotask(() => {
      if (!appleCihazi()) setCihaz("android");
      else if (/CriOS/i.test(navigator.userAgent)) setCihaz("chrome-ios");
    });
  }, []);

  const tum = {
    safari: {
      cihaz: "iPad ya da iPhone · Safari",
      metin: "Paylaş simgesine dokunun (görünmüyorsa ••• menüsündedir), listeyi kaydırıp “Ana Ekrana Ekle”yi seçin.",
    },
    "chrome-ios": {
      cihaz: "iPad ya da iPhone · Chrome",
      metin: "Adres çubuğunun en sağındaki Paylaş simgesine dokunun, “Ana Ekrana Ekle”yi seçin.",
    },
    android: {
      cihaz: "Android · Chrome",
      metin: "Sağ üstteki ⋮ menüsüne dokunun, “Ana ekrana ekle”yi seçin.",
    },
  };
  // Kullanılan tarayıcının adımı önce.
  const sira =
    cihaz === "android"
      ? (["android", "safari", "chrome-ios"] as const)
      : cihaz === "chrome-ios"
        ? (["chrome-ios", "safari", "android"] as const)
        : (["safari", "chrome-ios", "android"] as const);
  const adimlar = sira.map((anahtar) => ({ anahtar, ...tum[anahtar] }));

  return (
    <ul className={`space-y-2 ${className}`}>
      {adimlar.map((adim) => (
        <li key={adim.anahtar} className="rounded-buton border border-cizgi bg-yuzey px-4 py-3">
          <span className="block text-base font-bold text-murekkep">{adim.cihaz}</span>
          <span className="mt-0.5 block text-base font-medium leading-6 text-murekkep-soluk">
            {adim.metin}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Aile ve Güvenlik → "Çocuğun kendi cihazı": üretilen eşleme kodu ve sırası.
 * iPad/iPhone'da ana ekran simgesinin hafızası tarayıcıdan ayrı olduğu için
 * önce ana ekrana ekleme, sonra kodu simgeden açılan ekranda girme (3.11).
 */
export function EslesmeKoduKarti({
  isim,
  kod,
  kalanSaniye,
  adres,
  onKapat,
  onYeniKod,
}: {
  isim: string;
  kod: string;
  kalanSaniye: number;
  adres: string;
  onKapat: () => void;
  onYeniKod: () => void;
}) {
  const gecerli = kalanSaniye > 0;
  return (
    <div className="mt-4 rounded-kart border border-vurgu/50 bg-vurgu-yumusak p-5 text-center">
      <p className="text-base font-semibold text-murekkep">{isim} için bağlama kodu</p>
      <p className="mt-2 font-baslik text-5xl font-bold tracking-[0.2em] text-murekkep">
        {gecerli ? `${kod.slice(0, 3)} ${kod.slice(3)}` : "— — —"}
      </p>
      {gecerli ? (
        <div className="mt-4 space-y-3 text-left">
          <p className="text-base font-medium leading-7 text-murekkep">
            <strong>1.</strong> Çocuğunuzun cihazında <strong className="break-all">{adres}</strong> adresini açın ve kodu
            girmeden <strong>önce ana ekrana ekleyin</strong>:
          </p>
          <AnaEkranTalimati />
          <p className="text-base font-medium leading-7 text-murekkep">
            <strong>2.</strong> Ana ekrandaki simgeyle açıp bu kodu girin. Kod{" "}
            {Math.floor(kalanSaniye / 60)}:{String(kalanSaniye % 60).padStart(2, "0")} içinde ve
            yalnız bir kez geçerli.
          </p>
          <p className="text-base font-medium leading-7 text-murekkep-soluk">
            Ana ekrana eklemek istemezseniz kodu doğrudan tarayıcıda da girebilirsiniz.
          </p>
        </div>
      ) : (
        <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
          Kodun süresi doldu. Yeni bir kod üretin.
        </p>
      )}
      <div className="mt-4 flex justify-center gap-3">
        <Buton varyant="cerceve" boyut="kucuk" onClick={onKapat}>
          Kapat
        </Buton>
        <Buton varyant="eylem" boyut="kucuk" onClick={onYeniKod}>
          Yeni Kod
        </Buton>
      </div>
    </div>
  );
}

/**
 * Aile ve Güvenlik → "Çocuğun kendi cihazı": kodla cihaz bağlanınca kod kartının
 * yerine gelir. Ana ekrana ekleme kod girilmeden önce yapılır (kod kartı
 * anlatır); burada yalnız sonucu ve sıra karışmışsa ne olacağını söyler.
 */
export function CihazBaglandiKarti({
  isim,
  cihazAdi,
  onTamam,
}: {
  isim: string;
  cihazAdi: string | null;
  onTamam: () => void;
}) {
  return (
    <div role="status" className="mt-4 rounded-kart border border-eylem/30 bg-eylem-yumusak p-5">
      <p className="font-baslik text-lg font-bold text-eylem-koyu">
        {isim} için cihaz bağlandı{cihazAdi ? `: ${cihazAdi}` : ""}.
      </p>
      <p className="mt-2 text-base font-medium leading-7 text-murekkep">
        Çocuğunuz bundan sonra o cihazdaki simgeye dokunarak doğrudan haritasına gelir.
      </p>
      <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
        Kodu ana ekran simgesi yerine tarayıcıda girdiyseniz: simgenin hafızası ayrıdır, simgeden
        ilk açılışta yeni bir kod gerekir.
      </p>
      <Buton varyant="cerceve" boyut="kucuk" className="mt-4" onClick={onTamam}>
        Tamam
      </Buton>
    </div>
  );
}

/**
 * Cihaz çocuğa verildikten sonra "Kim okuyor?" üstünde veliye tek seferlik
 * not: ekranı ana ekrana ekleyin. Çocuk dünyasının içinde açılır ama velinin
 * krem kartıyla; çocuğa değil veliye konuştuğu belli olsun.
 */
export function AnaEkranNotu({ acik, onTamam }: { acik: boolean; onTamam: () => void }) {
  const baslikId = useId();

  return (
    <AnimatePresence>
      {acik ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-gece-950/70 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={baslikId}
            className="tema-veli w-full max-w-lg rounded-t-kart border border-cizgi bg-zemin px-5 pb-6 pt-6 text-murekkep shadow-kart sm:rounded-kart sm:p-7"
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-vurgu">Veli için</p>
            <h2 id={baslikId} className="mt-1 text-balance font-baslik text-2xl font-bold leading-tight">
              Son adım: bu ekranı ana ekrana ekleyin
            </h2>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
              Çocuğunuz siteyi bir uygulama gibi açsın. Simgeyi ilk açtığınızda bir kez daha veli
              girişi istenir; simgenin hafızası tarayıcıdan ayrıdır. Sonra çocuğunuz simgeye
              dokununca doğrudan buraya gelir.
            </p>
            <AnaEkranTalimati className="mt-4" />
            <Buton autoFocus varyant="eylem" tamGenislik className="mt-5" onClick={onTamam}>
              Tamam
            </Buton>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
