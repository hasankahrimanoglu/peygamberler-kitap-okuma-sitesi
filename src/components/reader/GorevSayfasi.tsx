"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import { Buton, Ikon } from "../ui";
import { OkumaKarti } from "./OkumaKarti";
import { KelimeliMetin } from "./Paragraf";

type GorevSayfasiProps = {
  chapter: ChapterData;
  /** ESKİ tek cümlelik görev akışı: "Görevi Anladım" */
  onGoreviAnladim: () => void;
  /** YENİ akış: görevi profile ekler (profile_tasks), sonra ilerler */
  onGoreviListeyeEkle?: () => void;
  /** YENİ akış: eklemeden ilerler — görev gönüllüdür */
  onSimdilikDegil?: () => void;
  ekleniyor?: boolean;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

/**
 * Bugüne Taşı sayfası. YENİ modelde (KARAR 15 Tem 2026) görev koşullu ve
 * gönüllüdür: çocuk "Görevi Listeme Ekle" ile profiline alır veya "Şimdilik
 * Değil" der; iki durumda da bölüm ilerlemesi ETKİLENMEZ (4.1/17).
 */
export function GorevSayfasi({
  chapter,
  onGoreviAnladim,
  onGoreviListeyeEkle,
  onSimdilikDegil,
  ekleniyor = false,
  aktifKelime,
  setAktifKelime,
}: GorevSayfasiProps) {
  const gorev = chapter.gorev;
  if (!gorev && !chapter.buguneTasi) return null;

  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto text-center sm:gap-5">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-vurgu-yumusak text-vurgu sm:h-20 sm:w-20"
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

        {gorev ? (
          <>
            <div className="w-full max-w-xl rounded-kart border border-cizgi bg-yuzey p-4 text-left sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-baslik text-lg font-bold sm:text-xl">
                  {gorev.ad}
                </h3>
                <span className="rounded-full bg-vurgu-yumusak px-2.5 py-1 font-govde text-[11px] font-bold text-vurgu">
                  {gorev.kategori}
                </span>
              </div>

              <p className="whitespace-pre-line font-story text-base font-semibold leading-7 sm:text-lg sm:leading-8">
                {gorev.aciklama}
              </p>

              <div className="mt-3 grid gap-1.5 border-t border-cizgi pt-3 font-govde text-sm text-murekkep-soluk">
                <p className="flex items-start gap-1.5">
                  <Ikon ad="saat" boyut={15} className="mt-0.5 shrink-0" />
                  <span>Tahmini süre: {gorev.sure}</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Ikon ad="onay" boyut={15} className="mt-0.5 shrink-0" />
                  <span>Tamamlandı diyebilmek için: {gorev.olcut}</span>
                </p>
              </div>

              {gorev.guvenlikNotu ? (
                <p className="mt-3 flex items-start gap-2 rounded-buton bg-vurgu-yumusak px-3 py-2.5 font-govde text-sm font-semibold leading-6 text-murekkep">
                  <Ikon ad="kalp" boyut={16} className="mt-0.5 shrink-0 text-vurgu" />
                  {gorev.guvenlikNotu}
                </p>
              ) : null}
            </div>

            <p className="max-w-md font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
              Bu görev tamamen gönüllü — eklemesen de rozetin ve yolculuğun
              aynen devam eder.
            </p>

            <div className="grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
              <Buton
                varyant="eylem"
                onClick={onGoreviListeyeEkle}
                disabled={ekleniyor}
              >
                <Ikon ad="fidan" boyut={18} />
                {ekleniyor ? "Ekleniyor..." : "Görevi Listeme Ekle"}
              </Buton>
              <Buton varyant="cerceve" onClick={onSimdilikDegil} disabled={ekleniyor}>
                Şimdilik Değil
              </Buton>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full max-w-xl items-start gap-3 rounded-kart border border-cizgi bg-yuzey p-4 text-left sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-eylem-yumusak text-eylem">
                <Ikon ad="fidan" boyut={20} />
              </span>
              <p className="font-story text-base font-semibold leading-7 sm:text-lg sm:leading-8">
                <KelimeliMetin
                  text={chapter.buguneTasi ?? ""}
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
          </>
        )}
      </div>
    </OkumaKarti>
  );
}
