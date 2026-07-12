"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import type { IkonAdi } from "../ui";
import { Ikon } from "../ui";
import { OkumaKarti } from "./OkumaKarti";
import { KelimeliMetin } from "./Paragraf";

type OgrendikSayfasiProps = {
  chapter: ChapterData;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

// Kartlar kategorisizdir (Hasan kararı, 12 Tem 2026); ikonlar sırayla döner.
const kartIkonlari: IkonAdi[] = ["fidan", "kitap", "fener", "kalp"];

function cumleBasiBuyut(value: string) {
  const kirpilmis = value.trimStart();
  if (!kirpilmis) return value;
  return kirpilmis.charAt(0).toLocaleUpperCase("tr-TR") + kirpilmis.slice(1);
}

/** Ne Öğrendik sayfası: bölümün değer çıkarımları kart dizisi olarak. */
export function OgrendikSayfasi({
  chapter,
  aktifKelime,
  setAktifKelime,
}: OgrendikSayfasiProps) {
  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto sm:gap-5">
        <div className="text-center">
          <h2 className="font-baslik text-2xl font-bold sm:text-3xl">
            Ne Öğrendik?
          </h2>
          <p className="mt-1 font-govde text-sm text-murekkep-soluk sm:text-base">
            Bugün öğrendiklerini hatırla, yolculuğuna devam et!
          </p>
        </div>

        <ul className="grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapter.learned.map((madde, index) => (
            <motion.li
              key={madde}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-2.5 rounded-kart border border-cizgi bg-yuzey p-4 text-center"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-eylem-yumusak text-eylem">
                <Ikon
                  ad={kartIkonlari[index % kartIkonlari.length]}
                  boyut={22}
                />
              </span>
              <p className="font-story text-sm font-medium leading-6 sm:text-base">
                <KelimeliMetin
                  text={cumleBasiBuyut(madde)}
                  aktifKelime={aktifKelime}
                  setAktifKelime={setAktifKelime}
                />
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="flex w-full max-w-4xl items-center justify-center gap-2.5 rounded-kart bg-eylem-yumusak px-4 py-3 text-eylem">
          <Ikon ad="fidan" boyut={18} />
          <p className="font-govde text-sm font-bold sm:text-base">
            {chapter.buguneTasi
              ? "Harika iş çıkardın! Bir sonraki sayfada seni küçük bir görev bekliyor."
              : "Harika iş çıkardın! Rozetin seni bekliyor."}
          </p>
        </div>
      </div>
    </OkumaKarti>
  );
}
