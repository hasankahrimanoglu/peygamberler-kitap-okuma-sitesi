"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ikon } from "../ui";

type SesCubuguProps = {
  baslik: string;
  className?: string;
};

function sureBicimle(saniye: number) {
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  return `${dakika}:${kalan.toString().padStart(2, "0")}`;
}

/**
 * Kompakt sesli anlatım çubuğu (PROJE-MODELI.md 5.1: üstte sabit, sayfa
 * göstergesinden ayrı). Gerçek ses dosyaları eklenene kadar (S2 fazı)
 * ilerleme simülasyonuyla çalışır; hız/atlama kontrolleri S2'de gelecek.
 */
export function SesCubugu({ baslik, className = "" }: SesCubuguProps) {
  const [caliyor, setCaliyor] = useState(false);
  const [ilerleme, setIlerleme] = useState(0);
  const toplamSure = 380;
  const gecenSure = Math.round((toplamSure * ilerleme) / 100);

  useEffect(() => {
    if (!caliyor) return;

    const zamanlayici = window.setInterval(() => {
      setIlerleme((mevcut) => {
        if (mevcut >= 100) {
          return 0;
        }
        return Math.min(100, mevcut + 0.45);
      });
    }, 650);

    return () => window.clearInterval(zamanlayici);
  }, [caliyor]);

  return (
    <div
      className={`flex items-center gap-2.5 rounded-full border border-cizgi bg-yuzey py-1.5 pl-1.5 pr-4 sm:gap-3 ${className}`}
    >
      <button
        type="button"
        aria-label={caliyor ? "Sesli anlatımı duraklat" : "Sesli anlatımı oynat"}
        aria-pressed={caliyor}
        onClick={() => setCaliyor((deger) => !deger)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-eylem text-eylem-metin transition hover:bg-eylem-koyu focus:outline-none focus-visible:ring-2 focus-visible:ring-eylem focus-visible:ring-offset-2 focus-visible:ring-offset-yuzey sm:h-10 sm:w-10"
      >
        <Ikon ad={caliyor ? "duraklat" : "oynat"} boyut={16} />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-baslik text-xs font-semibold text-murekkep sm:text-sm">
          {baslik}
        </p>
        <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-yuzey-2">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-vurgu"
            animate={{ width: `${ilerleme}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      <span className="shrink-0 font-govde text-[11px] font-semibold tabular-nums text-murekkep-soluk sm:text-xs">
        {sureBicimle(gecenSure)} / {sureBicimle(toplamSure)}
      </span>
    </div>
  );
}
