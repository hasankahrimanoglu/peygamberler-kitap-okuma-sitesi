"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ChapterData, DecisionOption } from "../../data/demoChapters";
import { Buton, Ikon } from "../ui";
import { Konfeti } from "./Konfeti";
import { OkumaKarti } from "./OkumaKarti";
import { KelimeliMetin } from "./Paragraf";

type KararSayfasiProps = {
  chapter: ChapterData;
  secilen: DecisionOption["id"] | null;
  setSecilen: (value: DecisionOption["id"]) => void;
  /** Kararını Onayla'ya basıldı ve doğru seçim yapıldı */
  sonucAcik: boolean;
  /** Son onay denemesi yanlış seçenekle yapıldı */
  yanlisDenendi: boolean;
  /** Verilirse onay butonu kartın içinde gösterilir (yeni split düzen) */
  onKararOnayla?: () => void;
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

const secenekSirasi: Record<DecisionOption["id"], number> = {
  a: 1,
  b: 2,
  c: 3,
};

/**
 * Sen Olsaydın sayfası. Seçenekler salt metindir (PROJE-MODELI.md 6.3);
 * çocuk seçer, alttaki "Kararını Onayla" ile onaylar.
 *
 * ESKİ akış: yanlış seçimde nazik yeniden deneme, doğruda kutlama + konfeti.
 * YENİ akış (KARAR 15 Tem 2026 — `continuationBlocks` dolu bölümler): doğru
 * cevap seçim anında AÇIKLANMAZ; onay yalnızca hikâyenin devamını açar, nötr
 * bir yönlendirme notu gösterilir. Karşılaştırma bölüm sonundadır.
 */
export function KararSayfasi({
  chapter,
  secilen,
  setSecilen,
  sonucAcik,
  yanlisDenendi,
  onKararOnayla,
  aktifKelime,
  setAktifKelime,
}: KararSayfasiProps) {
  if (!chapter.decision) return null;

  const { decision } = chapter;
  const yeniAkis = Boolean(chapter.continuationBlocks?.length);

  return (
    <OkumaKarti>
      {sonucAcik && !yeniAkis ? <Konfeti /> : null}

      <div className="relative flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto text-center sm:gap-4">
        <p className="flex items-center gap-2 pt-1 font-baslik text-xs font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-sm">
          <Ikon ad="yildiz" boyut={12} />
          Sen Olsaydın?
          <Ikon ad="yildiz" boyut={12} />
        </p>

        <h2 className="max-w-3xl font-baslik text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
          <KelimeliMetin
            text={decision.question}
            aktifKelime={aktifKelime}
            setAktifKelime={setAktifKelime}
          />
        </h2>

        <p className="flex items-center gap-1.5 font-govde text-sm text-murekkep-soluk">
          <Ikon ad="kalp" boyut={14} />
          Kalbine en çok yakışanı seç, sonra kararını onayla.
        </p>

        <div className="grid w-full max-w-2xl gap-2.5 sm:gap-3">
          {decision.options.map((option) => {
            const seciliMi = secilen === option.id;
            const dogruSecenek = decision.correctOption === option.id;
            // Yeni akışta doğru şık vurgulanmaz — yalnız çocuğun seçimi işaretli kalır.
            const kutlanan = yeniAkis
              ? sonucAcik && seciliMi
              : sonucAcik && (dogruSecenek || (!decision.correctOption && seciliMi));
            const sonumlu = sonucAcik && !kutlanan;

            return (
              <motion.button
                key={option.id}
                type="button"
                disabled={sonucAcik}
                onClick={() => setSecilen(option.id)}
                whileHover={sonucAcik ? undefined : { scale: 1.015 }}
                whileTap={sonucAcik ? undefined : { scale: 0.985 }}
                className={[
                  "grid grid-cols-[2.75rem_1fr] items-center gap-3 rounded-kart border-2 bg-yuzey px-4 py-3 text-left font-govde text-base font-bold leading-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eylem focus-visible:ring-offset-2 focus-visible:ring-offset-zemin disabled:cursor-default sm:px-5 sm:py-3.5 sm:text-lg sm:leading-7",
                  kutlanan || (seciliMi && !sonucAcik)
                    ? "border-eylem bg-eylem-yumusak"
                    : "border-cizgi hover:border-eylem/50",
                  sonumlu ? "opacity-45" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-10 w-10 place-items-center rounded-full font-baslik text-lg font-bold sm:h-11 sm:w-11",
                    kutlanan || (seciliMi && !sonucAcik)
                      ? "bg-eylem text-eylem-metin"
                      : "bg-yuzey-2 text-murekkep-soluk",
                  ].join(" ")}
                >
                  {kutlanan ? (
                    <Ikon ad="onay" boyut={18} />
                  ) : (
                    secenekSirasi[option.id]
                  )}
                </span>
                <span>{option.text}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {yanlisDenendi ? (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="flex w-full max-w-2xl items-start gap-2.5 rounded-kart bg-vurgu-yumusak px-4 py-3 text-left sm:px-5"
              aria-live="polite"
            >
              <Ikon ad="dusunce" boyut={20} className="mt-0.5 shrink-0 text-vurgu" />
              <p className="font-govde text-sm font-semibold leading-6 text-murekkep sm:text-base">
                {decision.options.find((option) => option.id === secilen)
                  ?.feedback ??
                  "Güzel düşündün. Bir kez daha dene: kahramanımızın kalbine en çok hangisi yakışırdı?"}
              </p>
            </motion.div>
          ) : null}

          {sonucAcik ? (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className={`flex w-full max-w-2xl items-start gap-2.5 rounded-kart px-4 py-3 text-left sm:px-5 ${
                yeniAkis ? "bg-vurgu-yumusak" : "bg-eylem-yumusak"
              }`}
              aria-live="polite"
            >
              <Ikon
                ad={yeniAkis ? "dusunce" : "yildiz"}
                boyut={20}
                className={`mt-0.5 shrink-0 ${yeniAkis ? "text-vurgu" : "text-eylem"}`}
              />
              <p className="font-govde text-sm font-semibold leading-6 text-murekkep sm:text-base">
                {yeniAkis
                  ? decision.afterChoiceNote ??
                    "Cevabını aklında tut. Hikâyenin devamını okuyunca seçimini karşılaştıracaksın."
                  : decision.correctFeedback ??
                    "Harika bir karar! Sağdaki okla sayfayı çevir ve yolculuğuna devam et."}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {onKararOnayla && !sonucAcik ? (
          <Buton
            varyant="eylem"
            disabled={!secilen}
            onClick={onKararOnayla}
            className="w-full max-w-2xl"
          >
            <Ikon ad="onay" boyut={18} />
            Kararını Onayla
          </Buton>
        ) : null}
      </div>
    </OkumaKarti>
  );
}
