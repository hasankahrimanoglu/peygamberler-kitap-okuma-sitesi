"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import { Buton, Ikon, OdulIkonu } from "../ui";
import { GorselAlani } from "./GorselAlani";
import { OkumaKarti } from "./OkumaKarti";

type KapakSayfasiAdemProps = {
  chapter: ChapterData;
  rozetAnahtari: string;
  gorselSrc: string;
  onBasla: () => void;
};

/**
 * Split kapak sayfası (ChatGPT mockup): solda bölüm kimliği + rozet kutusu +
 * Maceraya Başla, sağda büyük illüstrasyon. Mobilde görsel üstte, içerik altta.
 */
export function KapakSayfasiAdem({
  chapter,
  rozetAnahtari,
  gorselSrc,
  onBasla,
}: KapakSayfasiAdemProps) {
  const tanitim =
    chapter.ozet ??
    `Yeni bir yolculuğa hoş geldin! Bu bölümde ${
      chapter.bookName ?? "kitabımızın"
    } hikâyesinin yeni bir adımını keşfedeceksin.`;

  return (
    <OkumaKarti>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto sm:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:overflow-visible">
        <div className="order-1 lg:order-2 lg:min-h-0">
          <GorselAlani
            src={gorselSrc}
            alt={`${chapter.bolumAdi} bölüm illüstrasyonu`}
          />
        </div>

        <div className="order-2 flex min-h-0 flex-col lg:order-1 lg:overflow-y-auto">
          <div className="mx-auto my-auto flex w-full max-w-md flex-col items-center gap-4 py-1 text-center lg:mx-0 lg:items-start lg:text-left">
            <p className="flex items-center gap-2 font-baslik text-xs font-semibold uppercase tracking-[0.28em] text-vurgu sm:text-sm">
              <Ikon ad="yildiz" boyut={12} />
              {chapter.chapterNumber ?? 1}. Bölüm
              <Ikon ad="yildiz" boyut={12} />
            </p>

            <h1 className="font-baslik text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">
              {chapter.bolumAdi}
            </h1>

            <div
              aria-hidden="true"
              className="flex w-full max-w-xs items-center gap-2 text-vurgu"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-vurgu/70" />
              <Ikon ad="yildiz" boyut={13} />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-vurgu/70" />
            </div>

            <p className="font-govde text-base leading-7 text-murekkep/85 sm:text-lg sm:leading-8">
              {tanitim}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.3 }}
              className="flex w-full items-center gap-3.5 rounded-2xl border border-cizgi bg-yuzey p-4 text-left shadow-kart"
            >
              <OdulIkonu
                tip="rozet"
                anahtar={rozetAnahtari}
                boyut={56}
                alt={`${chapter.badgeName} görseli`}
              />
              <div className="min-w-0">
                <p className="font-baslik text-base font-bold sm:text-lg">
                  {chapter.badgeName}
                </p>
                <p className="font-govde text-sm leading-5 text-murekkep-soluk">
                  Bu bölümü tamamladığında bu rozet senin olacak!
                </p>
              </div>
            </motion.div>

            <Buton
              varyant="eylem"
              boyut="buyuk"
              tamGenislik
              onClick={onBasla}
              className="shadow-[0_6px_18px_-6px_rgba(46,125,91,0.55)]"
            >
              <Ikon ad="yildiz" boyut={18} />
              Maceraya Başla
            </Buton>
          </div>
        </div>
      </div>
    </OkumaKarti>
  );
}
