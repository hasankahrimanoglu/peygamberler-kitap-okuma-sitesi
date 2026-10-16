"use client";

import { m } from "framer-motion";
import { useId, useState } from "react";
import type { SozlukOrnegiVerisi } from "../../lib/tanitim/ornekIcerik";
import { Isil } from "../cocuk/Isil";
import { Ikon } from "../ui/Ikon";
import { EASE_YUMUSAK } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import styles from "./tanitim.module.css";

/**
 * Okuma ekranındaki sözlük kelimesinin çalışan küçük bir örneği. Kelime ve
 * anlam gerçek kitap verisinden gelir. Işıl anlam kartını getirir ama tanımı
 * kendisi söylemez — tanım içerik verisidir (PROJE-MODELI 3.10.5).
 *
 * İpucu: kelime açılana dek üstünde küçük bir parıltı uçuşur. Dokununca Işıl
 * kelimenin yanından kalkıp anlam kartının köşesine konar.
 *
 * Krem kart `.tema-veli` ile açık palete döner; Işıl çocuk temasının
 * renklerini kullandığı için kendi `.tema-cocuk` sarmalayıcısındadır.
 */
export function SozlukOrnegi({ once, kelime, anlam, sonra }: SozlukOrnegiVerisi) {
  const [acik, setAcik] = useState(false);
  const [denendi, setDenendi] = useState(false);
  const kartKimligi = useId();

  return (
    <div className="tema-veli rounded-kart bg-okuma-yuzey p-6 shadow-kart-gece sm:p-8">
      <p className="font-baslik text-sm font-bold uppercase tracking-[0.14em] text-eylem">Deneyin</p>
      <p className="mt-3 font-edebi text-[1.3rem] leading-[1.75] text-murekkep sm:text-[1.4rem]">
        {once}
        <span className="relative">
          <button
            type="button"
            aria-expanded={acik}
            aria-controls={kartKimligi}
            onClick={() => {
              setAcik((onceki) => !onceki);
              setDenendi(true);
            }}
            className={`${styles.ornekKelime} ${denendi ? "" : styles.dokunIpucu} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eylem`}
          >
            {kelime}
          </button>
          {denendi ? null : <span className={hareket.kelimeParilti} aria-hidden="true" />}
        </span>
        {sonra}
      </p>

      <div id={kartKimligi} aria-live="polite" className="mt-6 min-h-[120px]">
        {acik ? (
          <m.div
            key="kart"
            className="flex items-start gap-3 rounded-2xl border border-cizgi bg-yuzey p-4 shadow-kart sm:p-5"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: EASE_YUMUSAK, delay: 0.12 }}
          >
            <m.span
              className="tema-cocuk -ml-1 -mt-3 shrink-0"
              initial={{ x: 40, y: -110, rotate: -28, scale: 0.6 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 13, mass: 0.8 }}
            >
              <Isil poz="konusma" boyut={56} />
            </m.span>
            <div>
              <p className="flex items-center gap-1.5 font-baslik text-sm font-bold text-murekkep-soluk">
                <Ikon ad="kitap" boyut={16} />
                Kelimenin anlamı
              </p>
              <p className="mt-1 font-baslik text-2xl font-extrabold text-eylem">{kelime}</p>
              <p className="mt-1 font-govde text-[1.05rem] leading-relaxed text-murekkep">{anlam}</p>
            </div>
          </m.div>
        ) : (
          <div className="flex items-center gap-3">
            <span className={`tema-cocuk shrink-0 ${hareket.ipucuIsil}`}>
              <Isil poz="konusma" boyut={52} />
            </span>
            <p className="rounded-2xl border border-cizgi bg-yuzey px-4 py-3 font-baslik text-[0.98rem] font-semibold text-murekkep shadow-kart">
              Yeşil kelimelere dokun, anlamını öğren.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
