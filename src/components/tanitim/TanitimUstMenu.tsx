"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../marka/Logo";
import { Ikon } from "../ui/Ikon";
import { EASE_YUMUSAK } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";

/**
 * Tanıtım ve yasal sayfaların üst menüsü. Gece mavisi bant: çocuk tarafının
 * menü bantlarıyla aynı aile (PROJE-MODELI 3.10.8). Bağlantılar "/#..."
 * biçimindedir; yasal sayfadan da tanıtım sayfasının ilgili bölümüne götürür.
 *
 * Hareket: kaydırınca menü gölge kazanır; alt kenarda sayfanın ne kadarının
 * okunduğunu gösteren ince altın çizgi dolar (okuma ekranındaki ilerleme
 * çubuğunun yankısı); bulunulan bölümün bağlantısının altında altın çizgi
 * belirir. Bölüm kimlikleri bulunmayan sayfalarda (yasal sayfalar) hiçbir
 * bağlantı işaretlenmez.
 */
const BAGLANTILAR = [
  { href: "/#nasil-calisir", ad: "Nasıl Çalışır" },
  { href: "/#veliler", ad: "Veliler İçin" },
  { href: "/#kutuphane", ad: "Kütüphane" },
  { href: "/#sss", ad: "Sorular" },
];

/** Sayfadaki sırasıyla izlenen bölümler ("paketler" menüde altın düğmedir). */
const IZLENEN_BOLUMLER = ["nasil-calisir", "veliler", "kutuphane", "paketler", "sss"];

export function TanitimUstMenu() {
  const [acik, setAcik] = useState(false);
  const [kaydirildi, setKaydirildi] = useState(false);
  const [aktif, setAktif] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const okunan = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (y) => {
    setKaydirildi(y > 24);
    const cizgi = window.innerHeight * 0.45;
    let bulunan: string | null = null;
    for (const kimlik of IZLENEN_BOLUMLER) {
      const bolum = document.getElementById(kimlik);
      if (bolum && bolum.getBoundingClientRect().top <= cizgi) bulunan = kimlik;
    }
    setAktif(bulunan);
  });

  // Menü açıkken Esc ile kapanır.
  useEffect(() => {
    if (!acik) return;
    const kapat = (olay: KeyboardEvent) => {
      if (olay.key === "Escape") setAcik(false);
    };
    window.addEventListener("keydown", kapat);
    return () => window.removeEventListener("keydown", kapat);
  }, [acik]);

  return (
    <header
      className={`${hareket.ustMenu} ${kaydirildi ? hareket.ustMenuKaydi : ""} tema-cocuk sticky top-0 z-50 border-b border-white/10 bg-[color-mix(in_srgb,var(--zemin)_96%,transparent)] backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-buton transition-transform duration-500 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vurgu"
          onClick={() => setAcik(false)}
        >
          <Logo ton="acik" boyut={42} />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {BAGLANTILAR.map((baglanti) => {
              const buBolum = aktif === baglanti.href.slice(2);
              return (
                <li key={baglanti.href}>
                  <Link
                    href={baglanti.href}
                    aria-current={buBolum ? "location" : undefined}
                    className={`${hareket.menuBaglantisi} ${buBolum ? hareket.menuAktif : ""} inline-flex h-11 items-center rounded-buton px-4 font-baslik text-[0.98rem] font-semibold text-murekkep-soluk transition-colors hover:bg-white/5 hover:text-murekkep`}
                  >
                    {baglanti.ad}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden h-11 items-center rounded-buton border border-white/15 px-4 font-baslik font-semibold text-murekkep transition-colors hover:bg-white/5 sm:inline-flex"
          >
            Giriş Yap
          </Link>
          <Link
            href="/#paketler"
            className={`${hareket.dugme} ${hareket.dugmeAltin} hidden h-11 items-center rounded-buton bg-altin-400 px-5 font-baslik font-bold text-gece-950 shadow-parlama hover:bg-altin-300 sm:inline-flex ${
              aktif === "paketler" ? "ring-2 ring-white/40 ring-offset-2 ring-offset-gece-900" : ""
            }`}
          >
            Paketler
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-buton border border-white/15 text-murekkep lg:hidden"
            aria-expanded={acik}
            aria-controls="tanitim-mobil-menu"
            aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setAcik((onceki) => !onceki)}
          >
            <Ikon ad={acik ? "kapat" : "menu"} boyut={22} />
          </button>
        </div>
      </div>

      {/* Sayfanın okunan kısmı */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-vurgu shadow-parlama"
        style={{ scaleX: okunan }}
      />

      <AnimatePresence>
        {acik ? (
          <m.nav
            key="mobil-menu"
            id="tanitim-mobil-menu"
            aria-label="Mobil menü"
            className="absolute inset-x-0 top-full border-t border-white/10 bg-gece-900 px-4 pb-6 pt-2 shadow-kart-gece sm:px-6 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE_YUMUSAK }}
          >
            <ul className="flex flex-col">
              {BAGLANTILAR.map((baglanti, i) => (
                <m.li
                  key={baglanti.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE_YUMUSAK, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={baglanti.href}
                    onClick={() => setAcik(false)}
                    className="flex h-14 items-center border-b border-white/10 font-baslik text-lg font-semibold text-murekkep"
                  >
                    {baglanti.ad}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setAcik(false)}
                className="inline-flex h-12 items-center justify-center rounded-buton border border-white/15 font-baslik font-semibold text-murekkep"
              >
                Giriş Yap
              </Link>
              <Link
                href="/#paketler"
                onClick={() => setAcik(false)}
                className="inline-flex h-12 items-center justify-center rounded-buton bg-altin-400 font-baslik font-bold text-gece-950"
              >
                Paketler
              </Link>
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
