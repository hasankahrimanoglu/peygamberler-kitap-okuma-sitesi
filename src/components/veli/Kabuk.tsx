"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Ikon } from "../ui";
import { EKRANLAR, useVeliPaneli, type Ekran } from "./baglam";
import { CocukYuzu } from "./parcalar";
import { okumaZamani } from "./veriler";
import styles from "./veliPaneli.module.css";

/**
 * Veli paneli kabuğu (PROJE-MODELI 5.2). Gezinme beş hedeftir; hamburger yok.
 *   < 1024px  : üstte sade bar, altta sabit sekme çubuğu (başparmak bölgesi)
 *   1024–1279 : solda ikon + etiketli dar ray (tablet yatay)
 *   ≥ 1280    : solda gece mavisi geniş menü + çocuklar listesi
 */
export function Kabuk({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh lg:flex">
      <YanMenu />
      <div className="min-w-0 flex-1">
        <UstBar />
        <main className="mx-auto w-full max-w-[1200px] px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pb-16 lg:pt-10">
          {children}
        </main>
      </div>
      <AltMenu />
    </div>
  );
}

function Marka({ kucuk = false }: { kucuk?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center rounded-[0.9rem] bg-gradient-to-br from-[#2a3a7a] to-veli-gece text-veli-altin-acik shadow-[inset_0_0_0_1px_rgb(235_194_106/0.35)] ${
          kucuk ? "h-10 w-10" : "h-11 w-11"
        }`}
      >
        <Ikon ad="fener" boyut={kucuk ? 22 : 24} />
      </span>
    </span>
  );
}

/** Canlıda gerçek bağlantı (yeni sekmede açılabilir), önizlemede durum değiştiren düğme. */
function Hedef({
  ekran,
  aktif,
  className,
  children,
}: {
  ekran: Ekran;
  aktif: boolean;
  className: string;
  children: ReactNode;
}) {
  const { mod, git } = useVeliPaneli();
  const rota = EKRANLAR.find((o) => o.ekran === ekran)?.rota ?? "/dashboard";
  if (mod === "canli") {
    return (
      <Link href={rota} aria-current={aktif ? "page" : undefined} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => git(ekran)} aria-current={aktif ? "page" : undefined} className={className}>
      {children}
    </button>
  );
}

function YanMenu() {
  const { ekran, git, aile, gorunumler } = useVeliPaneli();

  return (
    <aside
      aria-label="Veli paneli menüsü"
      className={`${styles.yanMenu} sticky top-0 hidden h-svh shrink-0 flex-col px-3 py-6 lg:flex lg:w-[96px] xl:w-[272px] xl:px-5`}
    >
      <div className="flex items-center justify-center gap-3 px-1 xl:justify-start">
        <Marka />
        <span className="hidden min-w-0 leading-tight xl:block">
          <span className="block font-veli-baslik text-[1.1875rem] font-medium text-veli-gece-metin">Keşif Dünyası</span>
          <span className="block text-[0.8125rem] font-medium text-veli-gece-soluk">Veli Paneli</span>
        </span>
      </div>

      <nav className="mt-9 flex flex-col gap-1.5">
        {EKRANLAR.map((oge) => {
          const aktif = oge.ekran === ekran;
          return (
            <Hedef
              key={oge.ekran}
              ekran={oge.ekran}
              aktif={aktif}
              className={`group relative flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[0.75rem] font-semibold transition-colors xl:min-h-12 xl:flex-row xl:justify-start xl:gap-3.5 xl:px-3.5 xl:text-[0.9375rem] ${
                aktif
                  ? "bg-white/[0.09] text-veli-gece-metin"
                  : "text-veli-gece-soluk hover:bg-white/[0.05] hover:text-veli-gece-metin"
              }`}
            >
              {aktif ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-x-3 -translate-y-1/2 rounded-full bg-veli-altin-acik xl:-translate-x-5"
                />
              ) : null}
              <Ikon ad={oge.ikon} boyut={22} className={aktif ? "text-veli-altin-acik" : ""} />
              {oge.etiket}
            </Hedef>
          );
        })}
      </nav>

      {aile.cocuklar.length > 0 ? (
        <div className="mt-8 hidden border-t border-white/10 pt-6 xl:block">
          <p className="px-3.5 text-[0.8125rem] font-semibold text-veli-gece-soluk">Çocuklar</p>
          <ul className="mt-2 space-y-1">
            {gorunumler.map((g) => {
              const zaman = okumaZamani(g.ozet.sonAktiviteZamani);
              return (
                <li key={g.cocuk.id}>
                  <button
                    type="button"
                    onClick={() => git("gelisim", { cocukId: g.cocuk.id })}
                    className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]"
                  >
                    <CocukYuzu cocuk={g.cocuk} boyut={36} halka="yok" />
                    <span className="min-w-0">
                      <span className="block truncate text-[0.9375rem] font-semibold text-veli-gece-metin">{g.cocuk.isim}</span>
                      <span className="block truncate text-[0.8125rem] text-veli-gece-soluk">
                        {zaman ? `Son okuma ${zaman}` : "Henüz başlamadı"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-3">
        <CocukEkraniDugmesi />
        <HesapDugmesi yerlesim="yan" />
      </div>
    </aside>
  );
}

/** Çocuk ekranına geçiş: canlı panelde `useCocukEkraniGecisi` sorusunu açar. */
function CocukEkraniDugmesi() {
  const { gorunumler, perdeAc } = useVeliPaneli();
  if (gorunumler.length === 0) return null;
  return (
    <button
      type="button"
      onClick={() => perdeAc({ tur: "cihaz" })}
      title="Çocuk ekranına geç"
      className="flex min-h-12 items-center justify-center gap-2.5 rounded-2xl border border-veli-altin-acik/40 px-3 text-[0.9375rem] font-semibold text-veli-altin-acik transition-colors hover:bg-veli-altin-acik/10"
    >
      <Ikon ad="tablet" boyut={20} />
      <span className="hidden xl:inline">Çocuk Ekranına Geç</span>
    </button>
  );
}

function UstBar() {
  return (
    <header
      className={`${styles.ustBar} sticky top-0 z-40 flex min-h-[60px] items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:px-6 lg:hidden`}
    >
      <span className="flex items-center gap-3">
        <Marka kucuk />
        <span className="leading-tight">
          <span className="block font-veli-baslik text-[1.0625rem] font-medium text-murekkep">Keşif Dünyası</span>
          <span className="block text-[0.75rem] font-medium text-murekkep-soluk">Veli Paneli</span>
        </span>
      </span>
      <HesapDugmesi yerlesim="ust" />
    </header>
  );
}

function AltMenu() {
  const { ekran } = useVeliPaneli();
  return (
    <nav
      aria-label="Veli paneli menüsü"
      className={`${styles.altMenu} fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)] pt-1.5 lg:hidden`}
    >
      {EKRANLAR.map((oge) => {
        const aktif = oge.ekran === ekran;
        return (
          <Hedef
            key={oge.ekran}
            ekran={oge.ekran}
            aktif={aktif}
            className={`flex min-h-[60px] flex-col items-center justify-center gap-1 pb-1.5 text-[0.75rem] font-semibold transition-colors ${
              aktif ? "text-murekkep" : "text-murekkep-soluk"
            }`}
          >
            <span
              className={`grid h-8 w-14 place-items-center rounded-full transition-colors ${
                aktif ? "bg-vurgu-yumusak text-veli-altin-metin" : ""
              }`}
            >
              <Ikon ad={oge.ikon} boyut={22} />
            </span>
            {oge.etiket}
          </Hedef>
        );
      })}
    </nav>
  );
}

/** Hesap: e-posta, Aile ve Güvenlik, Şifre Değiştir, Çıkış (PROJE-MODELI 5.2). */
function HesapDugmesi({ yerlesim }: { yerlesim: "yan" | "ust" }) {
  const { aile, git, perdeAc, cikisYap } = useVeliPaneli();
  const [acik, setAcik] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bas = (aile.eposta.charAt(0) || "V").toLocaleUpperCase("tr-TR");

  useEffect(() => {
    if (!acik) return undefined;
    function disari(olay: MouseEvent) {
      if (ref.current && !ref.current.contains(olay.target as Node)) setAcik(false);
    }
    document.addEventListener("mousedown", disari);
    return () => document.removeEventListener("mousedown", disari);
  }, [acik]);

  function sec(is: () => void) {
    setAcik(false);
    is();
  }

  const menu = (
    <motion.div
      initial={{ opacity: 0, y: yerlesim === "yan" ? 8 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      role="menu"
      className={`absolute z-50 w-64 overflow-hidden rounded-2xl bg-yuzey text-murekkep shadow-[0_0_0_1px_rgb(39_30_23/0.06),0_24px_48px_-20px_rgb(18_27_64/0.45)] ${
        yerlesim === "yan" ? "bottom-full left-0 mb-2 xl:right-0" : "right-0 top-full mt-2"
      }`}
    >
      <div className="border-b border-cizgi px-4 py-3">
        <p className="text-[0.8125rem] text-murekkep-soluk">Hesap</p>
        <p className="truncate text-[0.9375rem] font-semibold">{aile.eposta || "—"}</p>
      </div>
      {[
        { etiket: "Aile ve Güvenlik", ikon: "kalkan" as const, is: () => git("aile") },
        { etiket: "Şifre Değiştir", ikon: "kilit" as const, is: () => perdeAc({ tur: "sifre" }) },
      ].map((oge) => (
        <button
          key={oge.etiket}
          type="button"
          role="menuitem"
          onClick={() => sec(oge.is)}
          className="flex min-h-12 w-full items-center gap-3 px-4 text-left text-[0.9375rem] font-semibold transition-colors hover:bg-yuzey-2"
        >
          <Ikon ad={oge.ikon} boyut={18} className="text-murekkep-soluk" />
          {oge.etiket}
        </button>
      ))}
      <button
        type="button"
        role="menuitem"
        onClick={() => sec(cikisYap)}
        className="flex min-h-12 w-full items-center gap-3 border-t border-cizgi px-4 text-left text-[0.9375rem] font-semibold text-tehlike transition-colors hover:bg-yuzey-2"
      >
        <Ikon ad="cikis" boyut={18} />
        Çıkış Yap
      </button>
    </motion.div>
  );

  return (
    <div ref={ref} className="relative">
      {yerlesim === "yan" ? (
        <button
          type="button"
          onClick={() => setAcik((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={acik}
          aria-label="Hesap menüsü"
          className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-2 text-left transition-colors hover:bg-white/[0.05] xl:justify-start xl:px-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-veli-gece-metin font-veli-baslik text-[0.9375rem] font-semibold text-veli-gece">
            {bas}
          </span>
          <span className="hidden min-w-0 flex-1 xl:block">
            <span className="block truncate text-[0.875rem] font-semibold text-veli-gece-metin">{aile.eposta}</span>
            <span className="block text-[0.8125rem] text-veli-gece-soluk">Hesap</span>
          </span>
          <Ikon ad="asagi" boyut={16} className="hidden rotate-180 text-veli-gece-soluk xl:block" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setAcik((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={acik}
          aria-label="Hesap menüsü"
          className="grid h-11 w-11 place-items-center rounded-full bg-veli-gece font-veli-baslik text-base font-semibold text-veli-gece-metin"
        >
          {bas}
        </button>
      )}
      <AnimatePresence>{acik ? menu : null}</AnimatePresence>
    </div>
  );
}

