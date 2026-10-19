"use client";

import { FormEvent, useState } from "react";
import { hesapSifresiyleDogrula, veliPinBelirle } from "../../lib/aileGuvenligi";
import { Buton } from "../ui";

const girdiSinifi =
  "h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30";

/**
 * Veli PIN'ini belirleme/değiştirme akışı (Faz 7 — 3.11): önce hesap şifresi,
 * sonra iki kez 4 haneli PIN. Veli kapısı, Aile ve Güvenlik sayfası ve
 * "çocuk ekranından önce PIN" yönlendirmesi bu akışı ortak kullanır.
 */
export function VeliPinBelirlemeAkisi({
  baslik,
  aciklama,
  hesapSifresiDogrulandi = false,
  onBitti,
  onVazgec,
}: {
  baslik: string;
  aciklama?: string;
  /** Veli kapısında şifre az önce sorulduysa ikinci kez sorulmaz. */
  hesapSifresiDogrulandi?: boolean;
  onBitti: () => void;
  onVazgec?: () => void;
}) {
  const [adim, setAdim] = useState<"sifre" | "pin">(hesapSifresiDogrulandi ? "pin" : "sifre");

  return (
    <div>
      <h2 className="font-baslik text-xl font-bold text-murekkep">{baslik}</h2>
      {aciklama ? (
        <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">{aciklama}</p>
      ) : null}
      <div className="mt-4">
        {adim === "sifre" ? (
          <HesapSifresiFormu onDogrulandi={() => setAdim("pin")} onVazgec={onVazgec} />
        ) : (
          <YeniPinFormu onKaydedildi={onBitti} onVazgec={onVazgec} />
        )}
      </div>
    </div>
  );
}

export function HesapSifresiFormu({
  onDogrulandi,
  onVazgec,
  dugmeMetni = "Devam Et",
}: {
  onDogrulandi: () => void;
  onVazgec?: () => void;
  dugmeMetni?: string;
}) {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [bekliyor, setBekliyor] = useState(false);

  async function gonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHata(null);
    setBekliyor(true);
    const dogru = await hesapSifresiyleDogrula(sifre);
    setBekliyor(false);
    if (!dogru) {
      setHata("Hesap şifresi doğrulanamadı. Tekrar deneyin.");
      return;
    }
    setSifre("");
    onDogrulandi();
  }

  return (
    <form onSubmit={gonder} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-murekkep">Hesap şifreniz</span>
        <input
          type="password"
          value={sifre}
          onChange={(event) => setSifre(event.target.value)}
          autoComplete="current-password"
          required
          className={girdiSinifi}
        />
      </label>
      {hata ? <p role="alert" className="text-sm font-semibold text-tehlike">{hata}</p> : null}
      <div className="flex gap-3">
        {onVazgec ? (
          <Buton type="button" varyant="cerceve" tamGenislik onClick={onVazgec}>
            Vazgeç
          </Buton>
        ) : null}
        <Buton type="submit" varyant="eylem" tamGenislik disabled={bekliyor}>
          {bekliyor ? "Doğrulanıyor…" : dugmeMetni}
        </Buton>
      </div>
    </form>
  );
}

function YeniPinFormu({ onKaydedildi, onVazgec }: { onKaydedildi: () => void; onVazgec?: () => void }) {
  const [pin, setPin] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [bekliyor, setBekliyor] = useState(false);

  async function gonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHata(null);
    if (!/^[0-9]{4}$/.test(pin)) {
      setHata("PIN 4 rakam olmalı.");
      return;
    }
    if (pin !== tekrar) {
      setHata("İki PIN aynı değil.");
      return;
    }
    setBekliyor(true);
    const sonuc = await veliPinBelirle(pin);
    setBekliyor(false);
    if (sonuc === "tamam") {
      onKaydedildi();
      return;
    }
    setHata(
      sonuc === "cocuk_sifresiyle_ayni"
        ? "Bu PIN çocuklarınızdan birinin şifresiyle aynı. Başka bir PIN seçin."
        : sonuc === "gecersiz"
          ? "PIN 4 rakam olmalı."
          : "PIN kaydedilemedi. Tekrar deneyin.",
    );
  }

  return (
    <form onSubmit={gonder} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <PinGirdisi etiket="Yeni veli PIN'i" deger={pin} onDegis={setPin} />
        <PinGirdisi etiket="PIN'i tekrar yazın" deger={tekrar} onDegis={setTekrar} />
      </div>
      {hata ? <p role="alert" className="text-sm font-semibold text-tehlike">{hata}</p> : null}
      <div className="flex gap-3">
        {onVazgec ? (
          <Buton type="button" varyant="cerceve" tamGenislik onClick={onVazgec}>
            Vazgeç
          </Buton>
        ) : null}
        <Buton type="submit" varyant="eylem" tamGenislik disabled={bekliyor}>
          {bekliyor ? "Kaydediliyor…" : "PIN'i Kaydet"}
        </Buton>
      </div>
    </form>
  );
}

/** 4 haneli şifre/PIN girdisi (veli tarafı). Yalnız rakam kabul eder. */
export function PinGirdisi({
  etiket,
  deger,
  onDegis,
}: {
  etiket: string;
  deger: string;
  onDegis: (deger: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-murekkep">{etiket}</span>
      <input
        type="password"
        inputMode="numeric"
        autoComplete="new-password"
        maxLength={4}
        value={deger}
        onChange={(event) => onDegis(event.target.value.replace(/\D/g, "").slice(0, 4))}
        className={`${girdiSinifi} text-center font-baslik text-2xl tracking-[0.4em]`}
      />
    </label>
  );
}
