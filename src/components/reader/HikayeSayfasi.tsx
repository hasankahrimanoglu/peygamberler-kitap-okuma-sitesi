"use client";

import type { ChapterData } from "../../data/demoChapters";
import type { OkumaSayfaModeli } from "./sayfalar";
import { YedekliGorsel } from "../ui";
import { BolumBasligi, OkumaKarti } from "./OkumaKarti";
import { Paragraf } from "./Paragraf";

type HikayeSayfasiProps = {
  chapter: ChapterData;
  sayfa: Extract<OkumaSayfaModeli, { type: "okuma" }>;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

/**
 * Hikâye sayfası. Görselli sayfada geniş ekranda solda metin, sağda
 * illüstrasyon (PROJE-MODELI.md 5.1); tablet dikey ve mobilde görsel üstte,
 * metin altta. Görselsiz sayfa tek sütun ortalanmış metin akışıdır.
 */
export function HikayeSayfasi({
  chapter,
  sayfa,
  aktifKelime,
  setAktifKelime,
}: HikayeSayfasiProps) {
  const paragraflar = (
    <>
      {sayfa.altBaslik ? (
        <p className="font-baslik text-base font-bold text-vurgu sm:text-lg">
          {sayfa.altBaslik}
        </p>
      ) : null}
      {sayfa.bloklar.map((block, index) => (
        <Paragraf
          key={`${sayfa.key}-blok-${index}`}
          block={block}
          blokIndex={index}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
      ))}
    </>
  );

  return (
    <OkumaKarti>
      <BolumBasligi
        eyebrow={`${chapter.chapterNumber ?? 1}. Bölüm`}
        ad={chapter.bolumAdi}
      />

      {sayfa.gorsel ? (
        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto sm:mt-5 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:overflow-visible">
          <figure className="order-1 flex min-h-0 flex-col items-center justify-center gap-2 lg:order-2 lg:h-full">
            <YedekliGorsel
              src={sayfa.gorsel.src}
              yedekSrc="/kapaklar/placeholder.svg"
              alt={sayfa.gorsel.alt}
              className="max-h-[32vh] w-auto max-w-full rounded-kart border border-cizgi object-contain shadow-kart lg:max-h-[52vh]"
            />
            {sayfa.gorsel.caption ? (
              <figcaption className="max-w-md text-center font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
                {sayfa.gorsel.caption}
              </figcaption>
            ) : null}
          </figure>

          <div className="order-2 flex min-h-0 flex-col lg:order-1 lg:h-full lg:overflow-y-auto">
            <div className="mx-auto my-auto flex w-full max-w-prose flex-col gap-3 sm:gap-4">
              {paragraflar}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex min-h-0 flex-1 overflow-y-auto sm:mt-5">
          <div className="mx-auto my-auto flex w-full max-w-2xl flex-col gap-3 sm:gap-4">
            {paragraflar}
          </div>
        </div>
      )}
    </OkumaKarti>
  );
}
