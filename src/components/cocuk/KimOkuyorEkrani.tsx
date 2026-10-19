"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../marka/Logo";
import { Buton, CocukAvatari, SifrePaneli, type SifreDenemesi } from "../ui";
import { beklemeMetni, type DogrulamaSonucu } from "../../lib/aileGuvenligi";

export type KimOkuyorCocugu = {
  id: string;
  isim: string;
  avatarTipi: string;
  fotografUrl: string | null;
  sifreVar: boolean;
};

type KimOkuyorEkraniProps = {
  cocuklar: KimOkuyorCocugu[];
  /** Aile ayarı: profillere girerken şifre sorulsun (PROJE-MODELI 3.11). */
  sifreAcik: boolean;
  yukleniyor: boolean;
  /** Veli PIN'i belirlenmemişse çocuk ekranı açılmadan önce belirlenir. */
  veliPinGerekli: boolean;
  onSifreDogrula: (cocuk: KimOkuyorCocugu, sifre: string) => Promise<DogrulamaSonucu | null>;
  onAc: (cocuk: KimOkuyorCocugu) => void;
  onVeliPaneli: () => void;
  onVeliPiniBelirle: () => void;
};

/**
 * "Kim okuyor?" — ortak cihazda çocuk ekranlarının girişi (Faz 7, 3.11).
 * Çocuk kendi avatarına dokunur; aile ayarı açıksa 4 rakamlı şifresini girer.
 * Ekranda kelime "şifre"dir, "PIN" çocuğa gösterilmez.
 */
export function KimOkuyorEkrani({
  cocuklar,
  sifreAcik,
  yukleniyor,
  veliPinGerekli,
  onSifreDogrula,
  onAc,
  onVeliPaneli,
  onVeliPiniBelirle,
}: KimOkuyorEkraniProps) {
  const [secilen, setSecilen] = useState<KimOkuyorCocugu | null>(null);
  const [unuttum, setUnuttum] = useState(false);
  const [uyari, setUyari] = useState<string | null>(null);

  function sec(cocuk: KimOkuyorCocugu) {
    setUyari(null);
    if (!sifreAcik) {
      onAc(cocuk);
      return;
    }
    if (!cocuk.sifreVar) {
      setUyari(`${cocuk.isim} için şifre belirlenmemiş. Annene ya da babana söyle.`);
      return;
    }
    setUnuttum(false);
    setSecilen(cocuk);
  }

  async function gir(sifre: string): Promise<SifreDenemesi> {
    if (!secilen) return { tamam: false, hata: "Bir sorun oldu. Bir daha dene." };
    const sonuc = await onSifreDogrula(secilen, sifre);
    if (sonuc?.durum === "dogru") {
      const acilan = secilen;
      setSecilen(null);
      onAc(acilan);
      return { tamam: true };
    }
    if (sonuc?.durum === "kilitli") {
      return { tamam: false, hata: `Çok deneme oldu. ${beklemeMetni(sonuc.kalanSaniye)} sonra tekrar dene.` };
    }
    if (sonuc?.durum === "yanlis") return { tamam: false, hata: "Şifre yanlış. Bir daha dene." };
    if (sonuc?.durum === "yok") {
      return { tamam: false, hata: "Şifren belirlenmemiş. Annene ya da babana söyle." };
    }
    return { tamam: false, hata: "Bir sorun oldu. Bir daha dene." };
  }

  return (
    <main className="tema-cocuk zemin-yildizli flex min-h-screen flex-col items-center px-4 pb-10 pt-6 text-murekkep sm:px-8">
      <div className="w-full max-w-5xl">
        <Logo ton="acik" boyut={40} />
      </div>

      <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-10">
        <h1 className="text-center font-baslik text-4xl font-bold sm:text-5xl">Kim okuyor?</h1>
        {!yukleniyor && !veliPinGerekli && cocuklar.length > 0 ? (
          <p className="mt-3 text-center text-lg font-medium text-murekkep-soluk">
            Kendi resmine dokun.
          </p>
        ) : null}

        {yukleniyor ? (
          <p className="mt-12 text-lg font-semibold text-murekkep-soluk">Yükleniyor…</p>
        ) : veliPinGerekli ? (
          <div className="mt-10 w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 text-center">
            <p className="font-baslik text-xl font-bold">Önce veli PIN&apos;i belirleyin</p>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
              Bu cihaz çocuğa verilince veli paneli 4 haneli bir PIN&apos;le korunur.
            </p>
            <Buton varyant="altin" className="mt-5" onClick={onVeliPiniBelirle}>
              PIN Belirle
            </Buton>
          </div>
        ) : cocuklar.length === 0 ? (
          <div className="mt-10 w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 text-center">
            <p className="font-baslik text-xl font-bold">Henüz çocuk profili yok</p>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
              Veli panelinden bir profil ekleyin.
            </p>
          </div>
        ) : (
          <ul className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            {cocuklar.map((cocuk) => (
              <li key={cocuk.id}>
                <button
                  type="button"
                  onClick={() => sec(cocuk)}
                  className="group flex w-36 flex-col items-center gap-3 rounded-kart p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vurgu sm:w-40"
                >
                  <span className="grid h-32 w-32 place-items-center overflow-hidden rounded-full border-4 border-cizgi bg-yuzey transition group-hover:border-vurgu group-active:scale-95 sm:h-36 sm:w-36">
                    <CocukAvatari
                      avatarTipi={cocuk.avatarTipi}
                      fotografUrl={cocuk.fotografUrl}
                      boyut={136}
                      alt=""
                    />
                  </span>
                  <span className="font-baslik text-xl font-bold">{cocuk.isim}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {uyari ? (
          <p role="alert" className="mt-8 max-w-md text-center text-lg font-semibold text-vurgu">
            {uyari}
          </p>
        ) : null}
      </div>

      <Buton varyant="cerceve" boyut="kucuk" onClick={onVeliPaneli}>
        Veli Paneli
      </Buton>

      <AnimatePresence>
        {secilen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-gece-950/70 px-4 py-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${secilen.isim} için şifre`}
              className="w-full max-w-sm rounded-kart border border-cizgi bg-zemin p-6 shadow-kart"
            >
              <SifrePaneli
                baslik={`${secilen.isim}, şifreni gir`}
                aciklama="4 rakamlı şifreni yaz."
                onGir={gir}
                alt={
                  <>
                    {unuttum ? (
                      <p className="text-base font-medium leading-6 text-murekkep-soluk">
                        Annene ya da babana söyle; veli panelinden yeni şifre belirleyebilirler.
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUnuttum(true)}
                        className="min-h-11 px-3 text-base font-semibold text-murekkep-soluk underline-offset-4 hover:underline"
                      >
                        Şifremi unuttum
                      </button>
                    )}
                    <Buton varyant="cerceve" boyut="kucuk" onClick={() => setSecilen(null)}>
                      Vazgeç
                    </Buton>
                  </>
                }
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
