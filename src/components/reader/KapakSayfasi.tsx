"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import { Ikon, OdulIkonu } from "../ui";
import { OkumaKarti } from "./OkumaKarti";

type KapakSayfasiProps = {
  chapter: ChapterData;
  rozetAnahtari: string;
};

/** Bölüm kapağı: kitap kimliği, bölüm adı ve kazanılacak rozetin önizlemesi. */
export function KapakSayfasi({ chapter, rozetAnahtari }: KapakSayfasiProps) {
  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto text-center sm:gap-5">
        <p className="rounded-full border border-cizgi bg-yuzey-2 px-4 py-1.5 font-baslik text-[11px] font-semibold uppercase tracking-[0.18em] text-murekkep-soluk sm:text-xs">
          {chapter.eyebrow}
        </p>

        <div>
          <p className="mb-1 flex items-center justify-center gap-2 font-baslik text-xs font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-sm">
            <Ikon ad="yildiz" boyut={12} />
            {chapter.chapterNumber ?? 1}. Bölüm
            <Ikon ad="yildiz" boyut={12} />
          </p>
          <h1 className="max-w-2xl font-baslik text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {chapter.bolumAdi}
          </h1>
        </div>

        <div
          aria-hidden="true"
          className="flex items-center gap-3 text-vurgu"
        >
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-vurgu/60 sm:w-24" />
          <Ikon ad="yildiz" boyut={14} />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-vurgu/60 sm:w-24" />
        </div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
          className="flex flex-col items-center gap-3"
        >
          <OdulIkonu
            tip="rozet"
            anahtar={rozetAnahtari}
            boyut={116}
            alt={`${chapter.badgeName} görseli`}
          />
          <p className="max-w-xs rounded-full bg-vurgu-yumusak px-5 py-1.5 font-baslik text-base font-bold leading-6 text-murekkep sm:text-lg">
            {chapter.badgeName}
          </p>
        </motion.div>

        <p className="max-w-md font-story text-sm font-medium italic leading-6 text-murekkep-soluk sm:text-base">
          Bu bölümü bitirdiğinde bu rozet senin olacak. Aşağıdaki düğmeye bas
          ve maceraya başla!
        </p>
      </div>
    </OkumaKarti>
  );
}
