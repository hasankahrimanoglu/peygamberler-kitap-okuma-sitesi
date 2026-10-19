"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { veliKapisiniAc } from "../../src/lib/child/cocukOturumu";
import { HesapSayfasi, YeniBaglantiFormu } from "../../src/components/giris/HesapSayfasi";
import { Buton } from "../../src/components/ui";

type Durum = "bekliyor" | "form" | "tamam" | "gecersiz";

const SIFRE_EN_AZ = 8;

/**
 * Şifre belirleme (Faz 7, 3. adım — PROJE-MODELI Bölüm 8). Satın almadan
 * sonraki hoş geldin e-postası, "Şifremi unuttum" ve yönetim sayfasının
 * bağlantısı buraya gelir: `/sifre-belirle?anahtar=…`.
 *
 * Anahtar sayfa açılınca DEĞİL, "Şifremi Kaydet"e basılınca harcanır: e-posta
 * güvenlik taramaları bağlantıyı önceden açsa da bağlantı yanmaz.
 */
export default function SifreBelirleSayfasi() {
  const router = useRouter();
  const [durum, setDurum] = useState<Durum>("bekliyor");
  const [anahtar, setAnahtar] = useState("");
  const [sifre, setSifre] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  // Anahtar bir kez harcanır; şifre kuralına takılıp yeniden denerken oturum açıktır.
  const [oturumAcildi, setOturumAcildi] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const deger = new URLSearchParams(window.location.search).get("anahtar") ?? "";
      setAnahtar(deger);
      setDurum(deger ? "form" : "gecersiz");
    });
  }, []);

  async function kaydet(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault();
    setHata(null);
    if (sifre.length < SIFRE_EN_AZ) {
      setHata(`Şifre en az ${SIFRE_EN_AZ} karakter olmalı.`);
      return;
    }
    if (sifre !== tekrar) {
      setHata("İki şifre aynı değil.");
      return;
    }

    setKaydediliyor(true);
    if (!oturumAcildi) {
      const { error } = await supabase.auth.verifyOtp({ token_hash: anahtar, type: "recovery" });
      if (error) {
        setKaydediliyor(false);
        setDurum("gecersiz");
        return;
      }
      setOturumAcildi(true);
    }

    const { error } = await supabase.auth.updateUser({ password: sifre });
    setKaydediliyor(false);
    if (error) {
      setHata(
        error.code === "weak_password"
          ? "Bu şifre yeterince güçlü değil. Harf ve rakam içeren, daha uzun bir şifre deneyin."
          : error.code === "same_password"
            ? "Yeni şifre eskisiyle aynı olamaz."
            : "Şifre kaydedilemedi. Tekrar deneyin.",
      );
      return;
    }

    // Şifre az önce belirlendi: bu cihaz çocuğa verilmişse de veli kapısı açık başlar.
    veliKapisiniAc();
    setDurum("tamam");
  }

  return (
    <HesapSayfasi>
      {durum === "bekliyor" ? (
        <p role="status" className="text-center text-base font-semibold text-murekkep-soluk">
          Yükleniyor…
        </p>
      ) : durum === "tamam" ? (
        <div className="text-center">
          <h1 className="font-baslik text-2xl font-bold">Şifreniz kaydedildi</h1>
          <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
            Giriş yaptınız. Veli panelinde çocuğunuzun profilini oluşturabilirsiniz.
          </p>
          <Buton varyant="eylem" tamGenislik className="mt-6" onClick={() => router.replace("/dashboard")}>
            Veli Paneline Git
          </Buton>
        </div>
      ) : durum === "gecersiz" ? (
        <div>
          <h1 className="font-baslik text-2xl font-bold">Bağlantının süresi dolmuş</h1>
          <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
            Bu bağlantı geçersiz ya da daha önce kullanılmış. Bağlantılar 24 saat geçerlidir ve
            bir kez kullanılabilir. E-posta adresinizi yazın, yenisini gönderelim.
          </p>
          <div className="mt-6">
            <YeniBaglantiFormu dugmeMetni="Yeni Bağlantı Gönder" />
          </div>
        </div>
      ) : (
        <form onSubmit={kaydet} className="space-y-4">
          <div>
            <h1 className="font-baslik text-2xl font-bold">Şifrenizi belirleyin</h1>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
              Veli paneline bu şifreyle gireceksiniz. En az {SIFRE_EN_AZ} karakter olsun.
            </p>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Yeni şifre</span>
            <input
              type="password"
              value={sifre}
              onChange={(olay) => setSifre(olay.target.value)}
              required
              minLength={SIFRE_EN_AZ}
              autoComplete="new-password"
              className="h-14 w-full rounded-buton border border-cizgi bg-zemin px-4 text-base font-semibold outline-none transition focus:border-eylem"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Yeni şifre (tekrar)</span>
            <input
              type="password"
              value={tekrar}
              onChange={(olay) => setTekrar(olay.target.value)}
              required
              minLength={SIFRE_EN_AZ}
              autoComplete="new-password"
              className="h-14 w-full rounded-buton border border-cizgi bg-zemin px-4 text-base font-semibold outline-none transition focus:border-eylem"
            />
          </label>
          {hata ? (
            <p role="alert" className="rounded-buton bg-yuzey-2 px-4 py-3 text-base font-semibold text-tehlike">
              {hata}
            </p>
          ) : null}
          <Buton type="submit" varyant="eylem" tamGenislik disabled={kaydediliyor}>
            {kaydediliyor ? "Kaydediliyor…" : "Şifremi Kaydet"}
          </Buton>
        </form>
      )}
    </HesapSayfasi>
  );
}
