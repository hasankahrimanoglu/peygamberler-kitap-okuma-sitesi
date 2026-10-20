"use client";

import { FormEvent, useState, type ReactNode } from "react";
import Link from "next/link";
import { Logo } from "../marka/Logo";
import { Buton, Kart } from "../ui";

/** Hesap formlarının metin kutusu: krem zemin, odakta yeşil kenar ve halka. */
export const GIRDI_SINIFI =
  "h-14 w-full rounded-buton border border-cizgi bg-zemin px-4 text-base font-semibold text-murekkep outline-none transition placeholder:text-murekkep-soluk/60 focus:border-eylem focus:ring-2 focus:ring-eylem/30";

/**
 * Giriş, şifre belirleme ve "Şifremi unuttum" sayfalarının ortak çerçevesi:
 * veli dünyası (krem), ortada tek kart. `kartAlti` kartın altındaki ikincil
 * alandır; en altta dönüş bağlantısı (varsayılan: giriş sayfası).
 */
export function HesapSayfasi({
  children,
  kartAlti,
  donus = { href: "/login", metin: "Giriş sayfasına dön" },
}: {
  children: ReactNode;
  kartAlti?: ReactNode;
  donus?: { href: string; metin: string };
}) {
  return (
    <main className="tema-veli flex min-h-screen flex-col items-center bg-zemin px-4 pb-10 pt-6 text-murekkep sm:px-8">
      <div className="w-full max-w-5xl">
        <Logo ton="koyu" boyut={40} />
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-8 py-10">
        <Kart dolgu="genis" className="w-full max-w-md">
          {children}
        </Kart>
        {kartAlti}
      </div>
      <Link
        href={donus.href}
        className="min-h-11 px-3 py-2 text-base font-semibold text-murekkep-soluk underline-offset-4 hover:underline"
      >
        {donus.metin}
      </Link>
    </main>
  );
}

const SONUC_METNI = {
  tamam:
    "Bu adres kayıtlıysa birkaç dakika içinde şifre belirleme bağlantısı gelecek. Gelen kutunuzu ve istenmeyen (spam) klasörünü kontrol edin.",
  cok_istek: "Çok fazla istek yapıldı. Birkaç dakika sonra tekrar deneyin.",
  gecersiz: "Geçerli bir e-posta adresi yazın.",
  hata: "Bir sorun oldu. Biraz sonra tekrar deneyin.",
} as const;

type Sonuc = keyof typeof SONUC_METNI;

/**
 * E-posta yazılır, `/api/sifre-baglantisi`'ye gider. Cevap, adresin kayıtlı
 * olup olmadığını söylemez (PROJE-MODELI Bölüm 8).
 */
export function YeniBaglantiFormu({ dugmeMetni = "Bağlantı Gönder" }: { dugmeMetni?: string }) {
  const [eposta, setEposta] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);

  async function gonder(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault();
    setGonderiliyor(true);
    setSonuc(null);
    try {
      const yanit = await fetch("/api/sifre-baglantisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eposta }),
      });
      if (yanit.ok) setSonuc("tamam");
      else if (yanit.status === 429) setSonuc("cok_istek");
      else if (yanit.status === 400) setSonuc("gecersiz");
      else setSonuc("hata");
    } catch {
      setSonuc("hata");
    } finally {
      setGonderiliyor(false);
    }
  }

  return (
    <form onSubmit={gonder} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-murekkep">E-posta</span>
        <input
          type="email"
          value={eposta}
          onChange={(olay) => setEposta(olay.target.value)}
          required
          autoComplete="email"
          placeholder="ornek@mail.com"
          className={GIRDI_SINIFI}
        />
      </label>
      {sonuc ? (
        <p
          role={sonuc === "tamam" ? "status" : "alert"}
          className={`rounded-buton px-4 py-3 text-base font-semibold leading-6 ${
            sonuc === "tamam" ? "bg-eylem-yumusak text-eylem-koyu" : "bg-yuzey-2 text-tehlike"
          }`}
        >
          {SONUC_METNI[sonuc]}
        </p>
      ) : null}
      <Buton type="submit" varyant="eylem" tamGenislik disabled={gonderiliyor}>
        {gonderiliyor ? "Gönderiliyor…" : dugmeMetni}
      </Buton>
    </form>
  );
}
