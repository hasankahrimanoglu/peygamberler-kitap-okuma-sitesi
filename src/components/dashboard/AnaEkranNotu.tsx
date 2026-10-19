"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Buton } from "../ui";

/** iPad, iPhone ya da dokunmatik Mac görünümlü iPad. */
function appleCihazi() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * "Ana ekrana ekle" adımları (PROJE-MODELI 3.11). Kullanılan cihazın adımı
 * önce yazılır. Web manifest yoktur: simge siteyi tarayıcıda açar, oturum
 * korunur.
 */
export function AnaEkranTalimati({ className = "" }: { className?: string }) {
  const [apple, setApple] = useState(true);

  useEffect(() => {
    queueMicrotask(() => setApple(appleCihazi()));
  }, []);

  const adimlar = [
    {
      anahtar: "apple",
      cihaz: "iPad ya da iPhone (Safari)",
      metin: "Paylaş düğmesine (yukarı oklu kare) dokunun, “Ana Ekrana Ekle”yi seçin.",
    },
    {
      anahtar: "android",
      cihaz: "Android (Chrome)",
      metin: "Sağ üstteki ⋮ menüsüne dokunun, “Ana ekrana ekle”yi seçin.",
    },
  ];
  if (!apple) adimlar.reverse();

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
 * Aile ve Güvenlik → "Çocuğun kendi cihazı": kodla cihaz bağlanınca kod kartının
 * yerine gelir; veliye son adımı (ana ekrana ekleme) söyler.
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
        Son adım: çocuğunuzun cihazında açılan haritayı ana ekrana ekleyin. Çocuğunuz simgeye
        dokununca doğrudan haritasına gelir.
      </p>
      <AnaEkranTalimati className="mt-3" />
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
              Çocuğunuz siteyi adres yazmadan, bir uygulama gibi açar: ana ekrandaki simgeye
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
