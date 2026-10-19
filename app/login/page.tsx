"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { cihaziCocugaVer, cocukModuAcikMi, veliKapisiniAc } from "../../src/lib/child/cocukOturumu";

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M5.5 4.2h7.1c1.9 0 3.4 1.5 3.4 3.4v12.2c0 .4-.4.7-.8.5a4.9 4.9 0 0 0-2.6-.8H5.5a1.9 1.9 0 0 1-1.9-1.9V6.1c0-1.1.8-1.9 1.9-1.9Zm2.2 3.2a.9.9 0 0 0 0 1.8h4.9a.9.9 0 0 0 0-1.8H7.7Zm0 3.7a.9.9 0 0 0 0 1.8h3.8a.9.9 0 0 0 0-1.8H7.7Z"
        fill="currentColor"
      />
      <path
        d="M17.4 5.2c1.7.3 3 1.8 3 3.5v8.7c0 1.1-.8 1.9-1.9 1.9h-.9V7.6c0-.8-.1-1.6-.2-2.4Z"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4Zm3.9 5.3-2.4 5.4a2 2 0 0 1-1 1l-5.4 2.4 2.4-5.4a2 2 0 0 1 1-1l5.4-2.4Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="1.4" fill="#fff7ed" opacity=".8" />
    </svg>
  );
}

/**
 * Giriş. Çocuk hesabı yoktur (Faz 7 — PROJE-MODELI 3.11): veli giriş yapar,
 * çocuk ortak cihazda "Kim okuyor?"dan girer; çocuğun kendi cihazı velinin
 * ürettiği kodla `/cihaz-bagla`'dan bağlanır.
 *
 * Açık oturum varsa form gösterilmez, cihaz doğru yere gider (REVİZE 19 Eki
 * 2026): siteye tanıtım sayfasından dönen çocuk "Giriş Yap"ta takılmasın.
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
      setParentError("E-posta veya şifre hatalı. Lütfen tekrar dene.");
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
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-amber-50 px-5 py-10 text-stone-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(251,191,36,0.28),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.2),transparent_26%),linear-gradient(180deg,rgba(255,251,235,0),rgba(254,243,199,0.62))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-emerald-100/70 to-transparent" />

      {oturumDenetleniyor ? (
        <p role="status" className="relative text-lg font-semibold text-stone-600">
          Yükleniyor…
        </p>
      ) : (
        <div className="relative w-full max-w-6xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Peygamberler Kitap Okuma
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-amber-950 sm:text-5xl">
              Hoş Geldin
            </h1>
            {cocukEkranindan ? (
              <p
                role="status"
                className="mx-auto mt-5 max-w-2xl rounded-2xl border border-amber-300 bg-white/85 px-5 py-4 text-base font-semibold leading-7 text-stone-700"
              >
                Çocuk ekranı için bu cihazda bir kez veli girişi gerekiyor. Ana ekrandaki simgeden
                açtıysanız bu normaldir: simgenin hafızası tarayıcıdan ayrıdır. Giriş yapınca
                &quot;Kim okuyor?&quot; ekranı açılır ve veli paneli bu cihazda PIN&apos;le kilitlenir.
              </p>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-amber-200 bg-white/85 p-6 shadow-2xl shadow-amber-900/10 backdrop-blur sm:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />
              <div className="relative mb-8 text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-amber-300 bg-amber-100 text-amber-900 shadow-inner">
                  <BookIcon />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Veli Girişi
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-amber-950">
                  Yönetim Paneli
                </h2>
              </div>

              <form className="relative space-y-5" onSubmit={handleParentSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-stone-700">
                    E-posta
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                    placeholder="ornek@mail.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-stone-700">
                    Şifre
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                    placeholder="Şifren"
                  />
                </label>

                {parentError ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-rose-700"
                    role="alert"
                  >
                    {parentError}
                  </motion.p>
                ) : null}

                <button
                  type="submit"
                  disabled={isParentSubmitting}
                  className="mt-2 h-14 w-full rounded-2xl bg-amber-900 px-5 py-3 text-base font-black text-amber-50 shadow-lg shadow-amber-900/15 transition hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-none"
                >
                  {isParentSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
                <Link
                  href="/sifremi-unuttum"
                  className="flex min-h-11 items-center justify-center text-base font-bold text-amber-800 underline-offset-4 hover:underline"
                >
                  Şifremi unuttum
                </Link>
              </form>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, delay: 0.06, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-white/85 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur sm:p-8"
            >
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-emerald-200/55 blur-3xl" />
              <div className="relative text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-300 bg-emerald-100 text-emerald-800 shadow-inner">
                  <CompassIcon />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Çocuklar İçin
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-emerald-950">
                  Keşif Haritası
                </h2>
                <p className="mt-5 text-base font-semibold leading-7 text-stone-700">
                  Evdeki tableti çocuğa vermek için o tablette veli olarak giriş yapın ve panelden
                  çocuğun haritasını açın. Sonra çocuğunuz &quot;Kim okuyor?&quot; ekranından kendi
                  profiline girer; ayrı kullanıcı adı ya da şifre gerekmez.
                </p>
                <p className="mt-4 text-base font-semibold leading-7 text-stone-700">
                  Çocuğunuzun kendi cihazı varsa veli panelindeki Aile ve Güvenlik sayfasından bir
                  kod alın ve o cihazda kodu girin.
                </p>
                <Link
                  href="/cihaz-bagla"
                  className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-800 px-5 py-3 text-base font-black text-emerald-50 shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  Bu Cihazı Çocuğa Bağla
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      )}
    </main>
  );
}
