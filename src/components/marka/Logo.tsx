import { useId } from "react";
import { MARKA } from "../../data/marka";

/**
 * GEÇİCİ LOGO (15 Eki 2026) — yeni marka adı ve logo hazırlanınca bu bileşen
 * değişir; kullanan sayfalar dokunulmadan yeni logoyu alır.
 *
 * Amblem: gece mavisi zeminde açık bir kitap, kitabın sırtından yükselen
 * noktalı altın iz ve izin ucunda ışık (rehber Işıl'ın feneri). Ürünün iki
 * fikrini taşır: okuma ve "okunan yolun altın ışık izi".
 *
 * `ton="acik"` koyu zemin üzerinde (açık yazı), `ton="koyu"` açık zemin
 * üzerinde (koyu yazı) kullanılır. Tarayıcı sekmesi simgesi aynı amblemin
 * sabit renkli kopyasıdır: `app/icon.svg`.
 */
export function LogoAmblemi({ boyut = 44, className = "" }: { boyut?: number; className?: string }) {
  const k = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <svg
      viewBox="0 0 64 64"
      width={boyut}
      height={boyut}
      className={`tema-veli ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`zemin-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:theme(colors.gece.700)]" />
          <stop offset="1" className="[stop-color:theme(colors.gece.950)]" />
        </linearGradient>
        <radialGradient id={`isik-${k}`}>
          <stop offset="0" className="[stop-color:theme(colors.altin.300)]" stopOpacity="0.95" />
          <stop offset="0.45" className="[stop-color:theme(colors.altin.400)]" stopOpacity="0.35" />
          <stop offset="1" className="[stop-color:theme(colors.altin.400)]" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="64" height="64" rx="18" fill={`url(#zemin-${k})`} />
      <circle cx="13" cy="14" r="1" className="fill-okuma-yuzey" opacity="0.7" />
      <circle cx="51" cy="12" r="0.8" className="fill-okuma-yuzey" opacity="0.55" />
      <circle cx="49" cy="29" r="0.7" className="fill-altin-300" opacity="0.8" />

      {/* Kitaptan yükselen ışık izi */}
      <path
        d="M32 40 C 25 34, 39 30, 33 22"
        fill="none"
        className="stroke-altin-400"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="0.1 3.4"
      />
      <circle cx="33" cy="19" r="11" fill={`url(#isik-${k})`} />
      <circle cx="33" cy="19" r="3.4" className="fill-altin-300" />

      {/* Açık kitap */}
      <path d="M32 41 C 26 37.5, 18 37.5, 11 39.5 V 51.5 C 18 49.5, 26 49.5, 32 53 Z" className="fill-okuma-yuzey" />
      <path d="M32 41 C 38 37.5, 46 37.5, 53 39.5 V 51.5 C 46 49.5, 38 49.5, 32 53 Z" className="fill-yuzey-2" />
      <path d="M32 41 V 53" className="stroke-altin-500" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M15 43.4 C 19.5 42.4, 24 42.6, 28 43.8 M15 46.6 C 19.5 45.6, 24 45.8, 28 47 M36 43.8 C 40 42.6, 44.5 42.4, 49 43.4 M36 47 C 40 45.8, 44.5 45.6, 49 46.6"
        fill="none"
        className="stroke-cizgi"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  ton = "acik",
  boyut = 44,
  className = "",
}: {
  ton?: "acik" | "koyu";
  boyut?: number;
  className?: string;
}) {
  const acik = ton === "acik";

  return (
    <span className={`tema-veli inline-flex items-center gap-3 ${className}`}>
      <LogoAmblemi boyut={boyut} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-baslik text-[0.68rem] font-bold uppercase tracking-[0.3em] ${
            acik ? "text-altin-400" : "text-altin-600"
          }`}
        >
          {MARKA.logoUstSatir}
        </span>
        <span
          className={`mt-1 font-baslik text-[1.3rem] font-extrabold tracking-tight ${
            acik ? "text-okuma-yuzey" : "text-gece-900"
          }`}
        >
          {MARKA.logoAltSatir}
        </span>
      </span>
      <span className="sr-only">{MARKA.ad}</span>
    </span>
  );
}
