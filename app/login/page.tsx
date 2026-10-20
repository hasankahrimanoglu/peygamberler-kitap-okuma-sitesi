"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { cihaziCocugaVer, cocukModuAcikMi, veliKapisiniAc } from "../../src/lib/child/cocukOturumu";
import { GIRDI_SINIFI, HesapSayfasi } from "../../src/components/giris/HesapSayfasi";
import { Buton, butonSiniflari } from "../../src/components/ui";

/**
 * Veli girişi. Çocuk hesabı yoktur (Faz 7 — PROJE-MODELI 3.11): veli giriş yapar,
 * çocuk ortak cihazda "Kim okuyor?"dan girer; çocuğun kendi cihazı velinin
 * ürettiği kodla `/cihaz-bagla`'dan bağlanır.
 *
 * Açık oturum varsa form gösterilmez, cihaz doğru yere gider (REVİZE 19 Eki
 * 2026): siteye tanıtım sayfasından dönen çocuk "Giriş Yap"ta takılmasın.
 *
 * Görünüm (REVİZE 20 Eki 2026 — PROJE-MODELI 5.2): hesap sayfalarıyla aynı
 * çerçeve, tek kart; çocuğun kendi cihazı kartın altında ikincil satırdır.
 */
export default function LoginPage() {
  const router = useRouter();
  const [oturumDenetleniyor, setOturumDenetleniyor] = useState(true);
  // Çocuk ekranından gelindi (ana ekran uygulamasının ilk açılışı ya da düşmüş
  // oturum): giriş cihazı çocuğa verir, "Kim okuyor?" açılır (3.11).
  const [cocukEkranindan, setCocukEkranindan] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentError, setParentError] = useState<string | null>(null);
  const [isParentSubmitting, setIsParentSubmitting] = useState(false);

  useEffect(() => {
    let iptal = false;
    // getUser sunucuya sorar: süresi dolmuş ya da kaldırılmış oturumla
    // yönlendirip girişe geri düşen bir döngü olmasın.
    void supabase.auth.getUser().then(({ data }) => {
      if (iptal) return;
      const kullanici = data.user;
      if (!kullanici) {
        setCocukEkranindan(new URLSearchParams(window.location.search).get("cocuk") === "1");
        setOturumDenetleniyor(false);
        return;
      }
      if (kullanici.is_anonymous) router.replace("/map");
      else router.replace(cocukModuAcikMi() ? "/kim-okuyor" : "/dashboard");
    });
    return () => {
      iptal = true;
    };
  }, [router]);

  async function handleParentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setParentError(null);
    setIsParentSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsParentSubmitting(false);

    if (signInError) {
      setParentError("E-posta ya da şifre hatalı. Tekrar deneyin.");
      return;
    }

    if (cocukEkranindan) {
      await cihaziCocugaVer(router);
      return;
    }

    // Şifre az önce girildi: bu cihaz çocuk modundaysa da veli kapısı açık başlar.
    veliKapisiniAc();
    router.push("/dashboard");
  }

  return (
    <HesapSayfasi
      donus={{ href: "/", metin: "Ana sayfaya dön" }}
      kartAlti={oturumDenetleniyor ? null : <CocugunCihazi />}
    >
      {oturumDenetleniyor ? (
        <p role="status" className="text-center text-base font-semibold text-murekkep-soluk">
          Yükleniyor…
        </p>
      ) : (
        <>
          <h1 className="font-baslik text-2xl font-bold">Veli girişi</h1>
          <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
            E-posta adresiniz ve şifrenizle veli panelinize girin.
          </p>

          {cocukEkranindan ? (
            <p
              role="status"
              className="mt-5 rounded-buton bg-vurgu-yumusak px-4 py-3 text-base font-semibold leading-7 text-murekkep"
            >
              Çocuk ekranı için bu cihazda bir kez veli girişi gerekiyor. Ana ekrandaki simgeden
              açtıysanız bu normaldir: simgenin hafızası tarayıcıdan ayrıdır. Giriş yapınca
              &quot;Kim okuyor?&quot; ekranı açılır ve veli paneli bu cihazda PIN&apos;le kilitlenir.
            </p>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleParentSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold">E-posta</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="ornek@mail.com"
                className={GIRDI_SINIFI}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Şifre</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className={GIRDI_SINIFI}
              />
            </label>

            {parentError ? (
              <p role="alert" className="rounded-buton bg-yuzey-2 px-4 py-3 text-base font-semibold text-tehlike">
                {parentError}
              </p>
            ) : null}

            <Buton type="submit" varyant="eylem" tamGenislik disabled={isParentSubmitting}>
              {isParentSubmitting ? "Giriş yapılıyor…" : "Giriş Yap"}
            </Buton>
          </form>

          <Link
            href="/sifremi-unuttum"
            className="mt-3 flex min-h-11 items-center justify-center text-base font-semibold text-eylem-koyu underline-offset-4 hover:underline"
          >
            Şifremi unuttum
          </Link>
        </>
      )}
    </HesapSayfasi>
  );
}

/** Çocuğun kendi cihazı (3.11): kod veli panelinde üretilir, bu cihazda girilir. */
function CocugunCihazi() {
  return (
    <section className="w-full max-w-md text-center" aria-labelledby="cocugun-cihazi">
      <h2 id="cocugun-cihazi" className="font-baslik text-lg font-bold">
        Çocuğunuzun kendi cihazı mı?
      </h2>
      <p className="mt-1 text-base font-medium leading-7 text-murekkep-soluk">
        Kodu veli panelinde, Aile ve Güvenlik sayfasından alırsınız.
      </p>
      <Link href="/cihaz-bagla" className={`mt-4 ${butonSiniflari("cerceve")}`}>
        Cihaz Kodunu Gir
      </Link>
    </section>
  );
}
