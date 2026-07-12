"use client";

import type { ChapterData } from "../../data/demoChapters";
import type { OkumaSayfaModeli } from "./sayfalar";
import { Ikon } from "../ui";
import { GorselAlani } from "./GorselAlani";
import { OkumaKarti } from "./OkumaKarti";
import { Paragraf } from "./Paragraf";

type HikayeSayfasiAdemProps = {
  chapter: ChapterData;
  sayfa: Extract<OkumaSayfaModeli, { type: "okuma" }>;
  /** 1 tabanlı sayfa numarası — görselin yönünü belirler */
  sayfaNo: number;
  gorselSrc: string;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

/**
 * Split hikâye sayfası: yarısı illüstrasyon, yarısı ferah büyük puntolu metin.
 * Monotonluğu kırmak için tek sayfa numaralarında görsel sağda, çiftlerde
 * solda durur (Hasan kararı, 12 Tem 2026). Mobilde görsel daima üsttedir.
 */
export function HikayeSayfasiAdem({
  chapter,
  sayfa,
  sayfaNo,
  gorselSrc,
  aktifKelime,
  setAktifKelime,
}: HikayeSayfasiAdemProps) {
  const gorselSagda = sayfaNo % 2 === 1;

  return (
    <OkumaKarti>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto sm:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:overflow-visible">
        <div
          className={`order-1 lg:min-h-0 ${
            gorselSagda ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <GorselAlani
            src={sayfa.gorsel?.src ?? gorselSrc}
            alt={sayfa.gorsel?.alt ?? `${chapter.bolumAdi} illüstrasyonu`}
            caption={sayfa.gorsel?.caption}
          />
        </div>

        <div
          className={`order-2 flex min-h-0 flex-col ${
            gorselSagda ? "lg:order-1" : "lg:order-2"
          } lg:overflow-y-auto`}
        >
          <div className="mx-auto my-auto flex w-full max-w-prose flex-col gap-4 py-1 sm:gap-5">
            <p className="flex items-center justify-center gap-2 font-baslik text-[11px] font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-xs">
              <Ikon ad="yildiz" boyut={11} />
              <span className="truncate">
                {chapter.chapterNumber ?? 1}. Bölüm · {chapter.bolumAdi}
              </span>
              <Ikon ad="yildiz" boyut={11} />
            </p>

            {sayfa.altBaslik ? (
              <p className="text-center font-baslik text-lg font-bold text-vurgu sm:text-xl">
                {sayfa.altBaslik}
              </p>
            ) : null}

            {sayfa.bloklar.map((block, index) => (
              <Paragraf
                key={`${sayfa.key}-blok-${index}`}
                block={block}
                blokIndex={index}
                boyut="buyuk"
                aktifKelime={aktifKelime}
                setAktifKelime={setAktifKelime}
              />
            ))}
          </div>
        </div>
      </div>
    </OkumaKarti>
  );
}
