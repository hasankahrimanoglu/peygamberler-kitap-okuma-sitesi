"use client";

import { motion } from "framer-motion";
import type { ChapterData } from "../../data/demoChapters";
import { Buton, Ikon, OdulIkonu } from "../ui";
import { Konfeti } from "./Konfeti";
import { OkumaKarti } from "./OkumaKarti";

type RozetSayfasiProps = {
  chapter: ChapterData;
  rozetAnahtari: string;
  /** Bir sonraki bölümün yalın adı; son bölümde null */
  sonrakiBolumAdi: string | null;
  /** Bölüm daha önce tamamlanmış — kutlama yerine hatırlatma yapılır */
  tekrarOkuma?: boolean;
  kayitHatasi: string | null;
  onHaritayaDon: () => void;
  /** Verilirse ana bitirme butonu kartın içinde gösterilir (yeni split düzen) */
  onBolumuBitir?: () => void;
  kaydediyor?: boolean;
};

/**
 * Rozet Kapısı: bölüm sonu kutlaması. Ana aksiyon ("Bölümü Bitir ve Rozetini
 * Kazan") alt güvertededir; buradaki ikincil buton kaydetmeden haritaya döner.
 */
export function RozetSayfasi({
  chapter,
  rozetAnahtari,
  sonrakiBolumAdi,
  tekrarOkuma = false,
  kayitHatasi,
  onHaritayaDon,
  onBolumuBitir,
  kaydediyor = false,
}: RozetSayfasiProps) {
  return (
    <OkumaKarti>
      <Konfeti />

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-y-auto text-center sm:gap-4">
        <p className="font-baslik text-xs font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-sm">
          Bölüm Tamamlandı
        </p>

        <h2 className="font-baslik text-3xl font-bold sm:text-4xl">
          Rozet Kapısı
        </h2>

        <p className="max-w-md font-govde text-sm leading-6 text-murekkep-soluk sm:text-base">
          {tekrarOkuma ? (
            <>
              Bu rozeti daha önce kazanmıştın! Tekrar okumak, öğrendiklerini
              kalbinde büyütür.
            </>
          ) : (
            <>
              Tebrikler! Bu bölümün rozetini kazandın.{" "}
              {sonrakiBolumAdi
                ? `Şimdi "${sonrakiBolumAdi}" bölümüne geçebilirsin.`
                : "Kitabın tüm bölümlerini bitirdin — artık Büyük Final Testi'ne hazırsın!"}
            </>
          )}
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          <OdulIkonu
            tip="rozet"
            anahtar={rozetAnahtari}
            boyut={128}
            alt={`${chapter.badgeName} görseli`}
          />
          <p className="rounded-full bg-eylem px-5 py-1.5 font-baslik text-base font-bold text-eylem-metin sm:text-lg">
            {chapter.badgeName}
          </p>
        </motion.div>

        {tekrarOkuma ? null : (
          <div className="flex w-full max-w-md items-start gap-2.5 rounded-kart border border-cizgi bg-yuzey px-4 py-3 text-left">
            <Ikon ad="harita" boyut={18} className="mt-0.5 shrink-0 text-eylem" />
            <p className="font-govde text-sm font-medium leading-6 text-murekkep">
              Bu rozeti haritana ekleyerek yolculuğuna devam edebilirsin. Her
              adım seni yeni keşiflere yaklaştırır.
            </p>
          </div>
        )}

        {chapter.mapNote ? (
          <p className="max-w-md font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
            {chapter.mapNote}
          </p>
        ) : null}

        {kayitHatasi ? (
          <p
            className="max-w-md rounded-kart border border-tehlike/40 bg-yuzey px-4 py-3 font-govde text-sm font-semibold leading-6 text-tehlike"
            aria-live="polite"
          >
            {kayitHatasi}
          </p>
        ) : null}

        {onBolumuBitir ? (
          <Buton
            varyant="eylem"
            boyut="buyuk"
            disabled={kaydediyor}
            onClick={onBolumuBitir}
            className="w-full max-w-md shadow-[0_6px_18px_-6px_rgba(46,125,91,0.55)]"
          >
            {tekrarOkuma
              ? "Bölüm Listesine Dön"
              : kaydediyor
                ? "Rozet Kaydediliyor..."
                : "Bölümü Bitir ve Rozetini Kazan"}
          </Buton>
        ) : null}

        <Buton varyant="cerceve" boyut="kucuk" onClick={onHaritayaDon}>
          <Ikon ad="geri" boyut={15} />
          Haritaya Dön
        </Buton>
      </div>
    </OkumaKarti>
  );
}
