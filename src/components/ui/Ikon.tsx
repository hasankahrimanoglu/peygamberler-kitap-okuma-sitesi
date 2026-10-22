import type { ReactNode } from "react";

export type IkonAdi =
  | "onay"
  | "kilit"
  | "yildiz"
  | "nokta"
  | "kitap"
  | "rozet"
  | "madalya"
  | "fidan"
  | "fener"
  | "dusunce"
  | "harita"
  | "kalp"
  | "geri"
  | "ok-sol"
  | "ok-sag"
  | "oynat"
  | "duraklat"
  | "ses"
  | "ses-kapali"
  | "cikis"
  | "arama"
  | "filtre"
  | "kapat"
  | "menu"
  | "hesap"
  | "odul"
  | "liste-ekle"
  | "fotograf"
  | "gorev"
  | "asagi"
  | "saat"
  | "ev"
  | "sohbet"
  | "gelisim"
  | "aile"
  | "kalkan"
  | "tablet"
  | "arti"
  | "kalem"
  | "bilgi";

type IkonProps = {
  ad: IkonAdi;
  /** Piksel cinsinden kenar uzunluğu */
  boyut?: number;
  className?: string;
};

// Tek ikon ailesi (PROJE-MODELI.md 3.2): 24 viewBox, 2px yuvarlak uçlu kontur.
// Dolgu gereken küçük parçalar (nokta, alev, kıvılcım) currentColor ile dolar.
const cizgi = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ikonlar: Record<IkonAdi, ReactNode> = {
  onay: <path {...cizgi} d="M5 12.5 10 17.5 19 7" />,
  kilit: (
    <>
      <rect {...cizgi} x="5" y="11" width="14" height="9" rx="2.5" />
      <path {...cizgi} d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
    </>
  ),
  yildiz: (
    <path
      fill="currentColor"
      d="M12 3c.5 3.8 1.9 5.9 7 7-5.1 1.1-6.5 3.2-7 7-.5-3.8-1.9-5.9-7-7 5.1-1.1 6.5-3.2 7-7Z"
    />
  ),
  nokta: <circle cx="12" cy="12" r="5" fill="currentColor" />,
  kitap: (
    <>
      <path
        {...cizgi}
        d="M12 6.4C10 4.8 7.3 4.5 4 4.7v13.6c3.3-.2 6 .1 8 1.7 2-1.6 4.7-1.9 8-1.7V4.7c-3.3-.2-6 .1-8 1.7Z"
      />
      <path {...cizgi} d="M12 6.4V20" />
    </>
  ),
  rozet: (
    <>
      <path {...cizgi} d="m12 2.8 6.6 3.8v7.6L12 18l-6.6-3.8V6.6L12 2.8Z" />
      <path
        fill="currentColor"
        d="M12 7.2c.3 2.2 1.1 3.4 4 4-2.9.6-3.7 1.8-4 4-.3-2.2-1.1-3.4-4-4 2.9-.6 3.7-1.8 4-4Z"
      />
      <path {...cizgi} d="M9.5 17.5 8 21m6.5-3.5L16 21" />
    </>
  ),
  madalya: (
    <>
      <path {...cizgi} d="M8.5 9.5 6 4h4.2l1.8 4 1.8-4H18l-2.5 5.5" />
      <circle {...cizgi} cx="12" cy="14.5" r="5.2" />
      <path
        fill="currentColor"
        d="M12 11.6c.25 1.8.9 2.7 3.2 3.2-2.3.5-2.95 1.4-3.2 3.2-.25-1.8-.9-2.7-3.2-3.2 2.3-.5 2.95-1.4 3.2-3.2Z"
      />
    </>
  ),
  fidan: (
    <>
      <path {...cizgi} d="M12 20.5v-7.5" />
      <path
        {...cizgi}
        d="M12 13C12 9.2 9.6 7.4 5.4 7.4c0 3.8 2.4 5.6 6.6 5.6Z"
      />
      <path
        {...cizgi}
        d="M12 13c0-3 1.9-4.4 5.3-4.4 0 3-1.9 4.4-5.3 4.4Z"
      />
    </>
  ),
  fener: (
    <>
      <path {...cizgi} d="M9.6 6.2a2.4 2.4 0 0 1 4.8 0" />
      <path {...cizgi} d="M8.2 6.8h7.6" />
      <path
        {...cizgi}
        d="M9 6.8h6l1.2 3.2v5.4L15 18.6H9l-1.2-3.2V10L9 6.8Z"
      />
      <path
        fill="currentColor"
        d="M12 10.4c.9.9 1.4 1.7 1.4 2.5a1.4 1.4 0 1 1-2.8 0c0-.8.5-1.6 1.4-2.5Z"
      />
    </>
  ),
  dusunce: (
    <>
      <path
        {...cizgi}
        d="M12 4.6c-4.4 0-8 2.8-8 6.3 0 1.9 1.1 3.6 2.8 4.8l-.7 3.5 3.6-1.7c.7.2 1.5.3 2.3.3 4.4 0 8-2.8 8-6.4s-3.6-6.8-8-6.8Z"
      />
      <circle cx="8.8" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="15.2" cy="11" r="1" fill="currentColor" />
    </>
  ),
  harita: (
    <>
      <path {...cizgi} d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path {...cizgi} d="M9 4v14M15 6v14" />
    </>
  ),
  kalp: (
    <path
      {...cizgi}
      d="M12 20c-5.5-3.4-8.5-6.6-8.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 3c0 3.4-3 6.6-8.5 10Z"
    />
  ),
  geri: <path {...cizgi} d="M19 12H5m6-7-7 7 7 7" />,
  "ok-sol": <path {...cizgi} d="M15 5l-7 7 7 7" />,
  "ok-sag": <path {...cizgi} d="M9 5l7 7-7 7" />,
  oynat: (
    <path
      fill="currentColor"
      d="M8 5.4v13.2c0 .9 1 1.4 1.7.9l9.2-6.6c.6-.4.6-1.4 0-1.8L9.7 4.5C9 4 8 4.5 8 5.4Z"
    />
  ),
  duraklat: (
    <path
      fill="currentColor"
      d="M7.5 5h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3H7.5c-.8 0-1.3-.5-1.3-1.3V6.3C6.2 5.5 6.7 5 7.5 5Zm6.8 0h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3h-2.2c-.8 0-1.3-.5-1.3-1.3V6.3c0-.8.5-1.3 1.3-1.3Z"
    />
  ),
  ses: (
    <>
      <path
        fill="currentColor"
        d="M4 9.3v5.4c0 .6.4 1 1 1h2.2l4.2 3.5c.65.55 1.6.1 1.6-.75V5.55c0-.85-.95-1.3-1.6-.75L7.2 8.3H5c-.6 0-1 .4-1 1Z"
      />
      <path {...cizgi} d="M15.5 9.6a3.4 3.4 0 0 1 0 4.8" />
      <path {...cizgi} d="M17.8 7.3a6.6 6.6 0 0 1 0 9.4" />
    </>
  ),
  "ses-kapali": (
    <>
      <path
        fill="currentColor"
        d="M4 9.3v5.4c0 .6.4 1 1 1h2.2l4.2 3.5c.65.55 1.6.1 1.6-.75V5.55c0-.85-.95-1.3-1.6-.75L7.2 8.3H5c-.6 0-1 .4-1 1Z"
      />
      <path {...cizgi} d="m15.5 9.8 4.4 4.4m0-4.4-4.4 4.4" />
    </>
  ),
  cikis: (
    <>
      <path {...cizgi} d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path {...cizgi} d="M16 17l5-5-5-5" />
      <path {...cizgi} d="M21 12H9" />
    </>
  ),
  arama: (
    <>
      <circle {...cizgi} cx="11" cy="11" r="6" />
      <path {...cizgi} d="m20 20-3.5-3.5" />
    </>
  ),
  filtre: <path {...cizgi} d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,
  kapat: <path {...cizgi} d="M6 6l12 12M18 6 6 18" />,
  menu: <path {...cizgi} d="M4 7h16M4 12h16M4 17h16" />,
  hesap: (
    <>
      <circle {...cizgi} cx="12" cy="8.5" r="3.5" />
      <path {...cizgi} d="M5 20c.8-3.6 3.4-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  odul: (
    <>
      <circle {...cizgi} cx="12" cy="9" r="5" />
      <path {...cizgi} d="M9 13.5 7.5 21l4.5-2.6L16.5 21 15 13.5" />
    </>
  ),
  "liste-ekle": (
    <>
      <rect {...cizgi} x="4" y="3.5" width="12" height="17" rx="2.5" />
      <path {...cizgi} d="M7.5 8h5M7.5 12h4" />
      <path {...cizgi} d="M16.5 14.5v6M13.5 17.5h6" />
    </>
  ),
  fotograf: (
    <>
      <path
        {...cizgi}
        d="M3.5 8.5h3.2l1.4-2.3h6.8l1.4 2.3h3.2a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z"
      />
      <circle {...cizgi} cx="12" cy="13.5" r="3.4" />
    </>
  ),
  // Görev listesi: iki tamamlanmış, bir bekleyen satır. Görevlerim için fener
  // kullanılıyordu; küçük boyda kilitle karışıyordu (11 Eki 2026 analizi, H5).
  gorev: (
    <>
      <path {...cizgi} d="M10.5 6.5H20M10.5 12H20M10.5 17.5H20" />
      <path {...cizgi} d="m3.8 6.6 1.4 1.4 2.4-2.6M3.8 12.1l1.4 1.4 2.4-2.6" />
      <circle {...cizgi} cx="5.6" cy="17.5" r="1.6" />
    </>
  ),
  asagi: <path {...cizgi} d="m6 9.5 6 6 6-6" />,
  saat: (
    <>
      <circle {...cizgi} cx="12" cy="12" r="8" />
      <path {...cizgi} d="M12 8v4.3l2.8 1.7" />
    </>
  ),
  // Veli paneli taslağının gezinme ikonları (22 Eki 2026) — aynı aile:
  // 24 viewBox, 2px yuvarlak uçlu kontur.
  ev: (
    <>
      <path {...cizgi} d="M4 10.6 12 4l8 6.6V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-8.4Z" />
    </>
  ),
  sohbet: (
    <>
      <path
        {...cizgi}
        d="M14.5 4.5h-9a2 2 0 0 0-2 2v5.6a2 2 0 0 0 2 2h1v3l3.4-3h4.6a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2Z"
      />
      <path {...cizgi} d="M16.5 9h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5l-2.9-2.5h-3.1" />
    </>
  ),
  gelisim: (
    <>
      <path {...cizgi} d="M4 19.5h16" />
      <path {...cizgi} d="M6.5 15.5 10 12l3 2.5 4.5-5.5" />
      <path
        fill="currentColor"
        d="M18.5 3.5c.3 1.9 1 2.9 3 3.3-2 .4-2.7 1.4-3 3.3-.3-1.9-1-2.9-3-3.3 2-.4 2.7-1.4 3-3.3Z"
      />
    </>
  ),
  aile: (
    <>
      <circle {...cizgi} cx="9" cy="8" r="3.2" />
      <path {...cizgi} d="M3.2 19.5c.7-3.4 2.9-5.2 5.8-5.2s5.1 1.8 5.8 5.2" />
      <circle {...cizgi} cx="17" cy="10" r="2.4" />
      <path {...cizgi} d="M16.6 14.4c2.3.1 3.7 1.6 4.2 4" />
    </>
  ),
  kalkan: (
    <>
      <path {...cizgi} d="M12 3.5 19 6v5.6c0 4.3-2.9 7.6-7 8.9-4.1-1.3-7-4.6-7-8.9V6l7-2.5Z" />
      <path {...cizgi} d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
  tablet: (
    <>
      <rect {...cizgi} x="5" y="3" width="14" height="18" rx="2.5" />
      <path {...cizgi} d="M10.5 17.5h3" />
    </>
  ),
  arti: <path {...cizgi} d="M12 5v14M5 12h14" />,
  kalem: (
    <>
      <path {...cizgi} d="M15.5 4.8a2 2 0 0 1 2.8 0l.9.9a2 2 0 0 1 0 2.8L9 18.7l-4 1 1-4L15.5 4.8Z" />
      <path {...cizgi} d="m13.8 6.5 3.7 3.7" />
    </>
  ),
  bilgi: (
    <>
      <circle {...cizgi} cx="12" cy="12" r="8.5" />
      <path {...cizgi} d="M12 11v5.2" />
      <circle cx="12" cy="7.8" r="1.2" fill="currentColor" />
    </>
  ),
};

/** Emoji yerine kullanılan ortak SVG ikon ailesi. Rengi metinden (currentColor) alır. */
export function Ikon({ ad, boyut = 16, className = "" }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={boyut}
      height={boyut}
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 align-[-0.15em] ${className}`}
    >
      {ikonlar[ad]}
    </svg>
  );
}
