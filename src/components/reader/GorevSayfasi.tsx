"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import { Buton, Ikon } from "../ui";
import { OkumaKarti } from "./OkumaKarti";
import { KelimeliMetin } from "./Paragraf";

type GorevSayfasiProps = {
  chapter: ChapterData;
  onGoreviAnladim: () => void;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

/** Bugüne Taşı sayfası: hikâyeden gerçek hayata uzanan küçük görev. */
export function GorevSayfasi({
  chapter,
  onGoreviAnladim,
  aktifKelime,
  setAktifKelime,
}: GorevSayfasiProps) {
  if (!chapter.buguneTasi) return null;

  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto text-center sm:gap-5">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="grid h-16 w-16 place-items-center rounded-full bg-vurgu-yumusak text-vurgu sm:h-20 sm:w-20"
        >
          <Ikon ad="fener" boyut={34} />
        </motion.span>

        <div>
          <h2 className="font-baslik text-2xl font-bold sm:text-3xl">
            Bugüne Taşı
          </h2>
          <p className="mt-1 font-govde text-sm text-murekkep-soluk sm:text-base">
            Okudukların kalbinde kaldığında, hayatına yön verir.
          </p>
        </div>

        <div className="flex w-full max-w-xl items-start gap-3 rounded-kart border border-cizgi bg-yuzey p-4 text-left sm:p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-eylem-yumusak text-eylem">
            <Ikon ad="fidan" boyut={20} />
          </span>
          <p className="font-story text-base font-semibold leading-7 sm:text-lg sm:leading-8">
            <KelimeliMetin
              text={chapter.buguneTasi}
              aktifKelime={aktifKelime}
              setAktifKelime={setAktifKelime}
            />
          </p>
        </div>

        <p className="max-w-md font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
          Küçük bir adım, okudukların ile gerçek hayat arasında bir köprü
          kurar.
        </p>

        <Buton varyant="eylem" onClick={onGoreviAnladim}>
          <Ikon ad="onay" boyut={18} />
          Görevi Anladım
        </Buton>
      </div>
    </OkumaKarti>
  );
}
