"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { aileGuvenlikDurumu, beklemeMetni, veliPinDogrula } from "../../lib/aileGuvenligi";
import {
  cocukModuAcikMi,
  etkinlikIzle,
  veliKapisiAcikMi,
  veliKapisiniAc,
  veliKapisiniKapat,
} from "../../lib/child/cocukOturumu";
import { Buton, SifrePaneli, type SifreDenemesi } from "../ui";
import { HesapSifresiFormu, VeliPinBelirlemeAkisi } from "./VeliPinFormu";

type Asama = "denetleniyor" | "acik" | "pin" | "hesap-sifresi" | "yeni-pin";

/**
 * Veli kapısı (Faz 7 — PROJE-MODELI 3.11). Bu cihaz çocuğa verildiyse
 * veli paneli 4 haneli veli PIN'i ister; panel 15 dakika etkileşimsiz kalınca
 * yeniden kilitlenir. Çocuk ekranı hiç açılmamış cihazda (velinin kendi
 * telefonu) kapı yoktur. PIN unutulursa hesap şifresiyle yenisi belirlenir.
 *
 * Sınır: kapı meraklı çocuğu durdurur; veri koruması veritabanı kurallarındadır.
 */
export function VeliKapisi({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [asama, setAsama] = useState<Asama>("denetleniyor");
  const [pinYok, setPinYok] = useState(false);

  const denetle = useCallback(async () => {
    if (!cocukModuAcikMi() || veliKapisiAcikMi()) {
      setAsama("acik");
      return;
    }
    const durum = await aileGuvenlikDurumu();
    // Durum okunamazsa kapı açılmaz; hesap şifresi her koşulda çalışır.
    setPinYok(!durum?.veliPinVar);
    setAsama(durum?.veliPinVar ? "pin" : "hesap-sifresi");
  }, []);

  useEffect(() => {
    queueMicrotask(() => void denetle());
  }, [denetle]);

  // Açıkken: etkinlik kapıyı canlı tutar, 15 dakika sessizlikte kilitlenir.
  useEffect(() => {
    if (asama !== "acik" || !cocukModuAcikMi()) return undefined;
    return etkinlikIzle(veliKapisiniAc, () => {
      if (!veliKapisiAcikMi()) {
        veliKapisiniKapat();
        void denetle();
      }
    });
  }, [asama, denetle]);

  const ac = useCallback(() => {
    veliKapisiniAc();
    setAsama("acik");
  }, []);

  async function pinGir(pin: string): Promise<SifreDenemesi> {
    const sonuc = await veliPinDogrula(pin);
    if (sonuc?.durum === "dogru") {
      ac();
      return { tamam: true };
    }
    if (sonuc?.durum === "kilitli") {
      return { tamam: false, hata: `Çok fazla deneme. ${beklemeMetni(sonuc.kalanSaniye)} sonra tekrar deneyin.` };
    }
    if (sonuc?.durum === "yok") {
      setAsama("hesap-sifresi");
      return { tamam: false, hata: "" };
    }
    if (sonuc?.durum === "yanlis") return { tamam: false, hata: "PIN yanlış. Tekrar deneyin." };
    return { tamam: false, hata: "PIN doğrulanamadı. Tekrar deneyin." };
  }

  if (asama === "acik") return <>{children}</>;

  const cocugaDon = (
    <button
      type="button"
      onClick={() => router.push("/kim-okuyor")}
      className="min-h-11 px-3 text-base font-semibold text-murekkep-soluk underline-offset-4 hover:underline"
    >
      Çocuk ekranına dön
    </button>
  );

  return (
    <div className="tema-veli grid min-h-screen place-items-center bg-zemin px-4 py-10 text-murekkep">
      {asama === "denetleniyor" ? null : (
        <section className="w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 shadow-kart sm:p-8">
          {asama === "pin" ? (
            <SifrePaneli
              baslik="Veli Paneli"
              aciklama="Devam etmek için 4 haneli veli PIN'inizi girin."
              onGir={pinGir}
              alt={
                <>
                  <Buton varyant="cerceve" boyut="kucuk" onClick={() => setAsama("hesap-sifresi")}>
                    PIN&apos;imi unuttum
                  </Buton>
                  {cocugaDon}
                </>
              }
            />
          ) : asama === "hesap-sifresi" ? (
            <div>
              <h2 className="font-baslik text-xl font-bold text-murekkep">
                {pinYok ? "Veli paneline giriş" : "PIN'i yenileyin"}
              </h2>
              <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
                {pinYok
                  ? "Bu cihaz çocuğunuza verildi. Devam etmek için hesap şifrenizi girin; ardından 4 haneli bir veli PIN'i belirleyeceksiniz."
                  : "Hesap şifrenizi girin; ardından yeni bir veli PIN'i belirleyeceksiniz."}
              </p>
              <div className="mt-4">
                <HesapSifresiFormu onDogrulandi={() => setAsama("yeni-pin")} />
              </div>
              <div className="mt-4 flex justify-center">{cocugaDon}</div>
            </div>
          ) : (
            <VeliPinBelirlemeAkisi
              baslik="Veli PIN'i belirleyin"
              aciklama="Çocuğa verilen cihazda veli paneli bu PIN'le açılır. Çocuklarınızın şifresinden farklı olmalı."
              hesapSifresiDogrulandi
              onBitti={ac}
            />
          )}
        </section>
      )}
    </div>
  );
}
