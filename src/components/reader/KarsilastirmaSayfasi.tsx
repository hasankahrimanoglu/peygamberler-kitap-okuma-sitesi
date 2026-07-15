"use client";

import { motion } from "framer-motion";
import type { ChapterData, DecisionOption } from "../../data/demoChapters";
import { Ikon } from "../ui";
import { OkumaKarti } from "./OkumaKarti";

type KarsilastirmaSayfasiProps = {
  chapter: ChapterData;
  secilen: DecisionOption["id"] | null;
};

const secenekEtiketi: Record<DecisionOption["id"], string> = {
  a: "A",
  b: "B",
  c: "C",
};

/**
 * "Seçimini Karşılaştır" sayfası (KARAR 15 Tem 2026 — Faz 6.1).
 * Hikâye devamı bittikten sonra YALNIZCA çocuğun seçtiği şıkka ait
 * karşılaştırma metni gösterilir; doğru/yanlış vurgusu ve derecelendirme YOK.
 */
export function KarsilastirmaSayfasi({
  chapter,
  secilen,
}: KarsilastirmaSayfasiProps) {
  if (!chapter.decision || !secilen) return null;

  const secenek = chapter.decision.options.find(
    (option) => option.id === secilen,
  );
  if (!secenek) return null;

  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto text-center sm:gap-5">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="grid h-16 w-16 place-items-center rounded-full bg-vurgu-yumusak text-vurgu sm:h-20 sm:w-20"
        >
          <Ikon ad="dusunce" boyut={34} />
        </motion.span>

        <div>
          <h2 className="font-baslik text-2xl font-bold sm:text-3xl">
            Seçimini Karşılaştır
          </h2>
          <p className="mt-1 font-govde text-sm text-murekkep-soluk sm:text-base">
            Hikâyenin devamını okudun. Şimdi kararına birlikte bakalım.
          </p>
        </div>

        {/* Çocuğun seçtiği şık */}
        <div className="w-full max-w-2xl rounded-kart border-2 border-cizgi bg-yuzey px-4 py-3 text-left sm:px-5 sm:py-4">
          <p className="mb-1.5 font-baslik text-[11px] font-semibold uppercase tracking-[0.18em] text-murekkep-soluk">
            Senin Seçimin
          </p>
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-yuzey-2 font-baslik text-base font-bold text-murekkep-soluk">
              {secenekEtiketi[secilen]}
            </span>
            <p className="font-govde text-base font-bold leading-6 sm:text-lg sm:leading-7">
              {secenek.text}
            </p>
          </div>
        </div>

        {/* Karşılaştırma metni — yalnızca seçilen şıkkınki */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="flex w-full max-w-2xl items-start gap-2.5 rounded-kart bg-eylem-yumusak px-4 py-3.5 text-left sm:px-5"
          aria-live="polite"
        >
          <Ikon ad="kalp" boyut={20} className="mt-0.5 shrink-0 text-eylem" />
          <p className="font-govde text-sm font-semibold leading-6 text-murekkep sm:text-base sm:leading-7">
            {secenek.comparison ??
              "Kararını hikâyedeki değerle karşılaştır: kahramanımızın kalbine en çok hangisi yakışırdı?"}
          </p>
        </motion.div>

        <p className="max-w-md font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
          Önemli olan hangi şıkkı seçtiğin değil, hikâyenin sana düşündürdükleri.
        </p>
      </div>
    </OkumaKarti>
  );
}
