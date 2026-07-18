"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ikon, type IkonAdi } from "../ui";

type NavItem = {
  key: string;
  etiket: string;
  href: string;
  ikon: IkonAdi;
  /** Hazır olmayan bir sayfa ileride eklenirse pasif navigasyon için kullanılır. */
  hazir: boolean;
};

// PROJE-MODELI.md 5.2 — veli navigasyonu. 1024px tablet yatayda dar ikon
// menüsü, daha büyük masaüstünde geniş metinli menü kullanılır (3.7).
const navItems: NavItem[] = [
  { key: "anasayfa", etiket: "Ana Sayfa", href: "/dashboard", ikon: "fener", hazir: true },
  { key: "kutuphane", etiket: "Kütüphane", href: "/dashboard/kutuphane", ikon: "kitap", hazir: true },
  { key: "oduller", etiket: "Ödüller", href: "/dashboard/oduller", ikon: "odul", hazir: true },
  { key: "raporlar", etiket: "Raporlar", href: "/dashboard/rapor", ikon: "dusunce", hazir: true },
];

function aktifMi(pathname: string, item: NavItem) {
  if (item.href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(item.href);
}

/** Masaüstü / tablet yatay: sol dikey menü. */
export function VeliYanMenu() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Veli paneli menüsü"
      className="hidden lg:flex lg:w-24 lg:flex-col lg:gap-2 lg:border-r lg:border-cizgi lg:bg-yuzey lg:px-3 lg:py-6 xl:w-60 xl:px-4"
    >
      <div className="mb-6 flex items-center justify-center gap-3 px-2 xl:justify-start">
        <span className="grid h-11 w-11 place-items-center rounded-buton bg-vurgu-yumusak text-vurgu">
          <Ikon ad="fener" boyut={24} />
        </span>
        <div className="sr-only leading-tight xl:not-sr-only">
          <p className="font-baslik text-sm font-bold text-murekkep">Veli Paneli</p>
          <p className="text-xs text-murekkep-soluk">Keşif Dünyası</p>
        </div>
      </div>

      {navItems.map((item) => {
        const aktif = aktifMi(pathname, item);
        const ortakSinif =
          "flex min-h-12 items-center justify-center gap-3 rounded-buton px-3 py-3 text-base font-baslik font-semibold transition-colors xl:justify-between";

        if (!item.hazir) {
          return (
            <span
              key={item.key}
              aria-disabled="true"
              title={item.etiket}
              className={`${ortakSinif} cursor-not-allowed text-murekkep-soluk/70`}
            >
              <span className="flex items-center justify-center gap-3 xl:justify-start">
                <Ikon ad={item.ikon} boyut={22} />
                <span className="sr-only xl:not-sr-only">{item.etiket}</span>
              </span>
              <span className="sr-only rounded-full bg-yuzey-2 px-2 py-0.5 text-xs font-bold text-murekkep-soluk xl:not-sr-only">
                Yakında
              </span>
            </span>
          );
        }

        return (
          <Link
            key={item.key}
            href={item.href}
            title={item.etiket}
            aria-current={aktif ? "page" : undefined}
            className={`${ortakSinif} ${
              aktif
                ? "bg-eylem-yumusak text-eylem"
                : "text-murekkep hover:bg-yuzey-2"
            }`}
          >
            <span className="flex items-center justify-center gap-3 xl:justify-start">
              <Ikon ad={item.ikon} boyut={22} />
              <span className="sr-only xl:not-sr-only">{item.etiket}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobil / tablet dikey: alt sabit navigasyon. */
export function VeliAltNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Veli paneli menüsü"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-cizgi bg-yuzey/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_14px_rgba(61,43,31,0.07)] backdrop-blur lg:hidden"
    >
      {navItems.map((item) => {
        const aktif = aktifMi(pathname, item);
        const icerik = (
          <>
            <Ikon ad={item.ikon} boyut={24} />
            <span className="text-xs font-semibold">{item.etiket}</span>
          </>
        );
        const ortakSinif =
          "relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 py-2";

        if (!item.hazir) {
          return (
            <span
              key={item.key}
              aria-disabled="true"
              className={`${ortakSinif} cursor-not-allowed text-murekkep-soluk/60`}
            >
              {icerik}
            </span>
          );
        }

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={aktif ? "page" : undefined}
            className={`${ortakSinif} ${aktif ? "text-eylem" : "text-murekkep-soluk"}`}
          >
            {aktif ? (
              <span className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-eylem" />
            ) : null}
            {icerik}
          </Link>
        );
      })}
    </nav>
  );
}
