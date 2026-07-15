"use client";

import { motion } from "framer-motion";
import type { OkumaSayfaModeli } from "./sayfalar";
import { Ikon } from "../ui";
import { OkumaKarti } from "./OkumaKarti";

type TanikSayfasiProps = {
  sayfa: Extract<OkumaSayfaModeli, { type: "tanik" }>;
};

/**
 * Tanık Sayfası: olayları hikâyedeki bir çocuğun günlüğünden anlatan özel
 * sayfa (PROJE-MODELI.md 5.1). El yazısı fontu + defter görünümü kullanılır.
 * Kurgusal tanıkta sayfanın altında "Bu sayfadaki çocuk hayalîdir..." notu
 * gösterilir.
 */
export function TanikSayfasi({ sayfa }: TanikSayfasiProps) {
  return (
    <OkumaKarti>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto">
        <p className="flex items-center gap-2 font-baslik text-[11px] font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-xs">
          <Ikon ad="kitap" boyut={12} />
          Tanık Sayfası
          <Ikon ad="kitap" boyut={12} />
        </p>

        <motion.article
          initial={{ opacity: 0, y: 16, rotate: -0.6 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-2xl overflow-hidden rounded-kart border border-altin-400/50 shadow-kart"
          style={{
            // Defter kâğıdı: sıcak krem zemin + soluk yatay çizgiler.
            backgroundColor: "#fbf6e9",
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0px, transparent 39px, rgba(122, 96, 60, 0.16) 39px, rgba(122, 96, 60, 0.16) 40px)",
            backgroundPosition: "0 8px",
          }}
        >
          {/* Sol kenar boşluğu çizgisi (defter marjı) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-9 w-px bg-tehlike/30 sm:left-11"
          />

          <div className="relative py-6 pe-5 ps-14 sm:py-7 sm:pe-8 sm:ps-16">
            <p className="mb-3 font-baslik text-base font-bold text-eylem sm:text-lg">
              {sayfa.witnessLabel}
            </p>

            <p className="whitespace-pre-line font-elyazi text-2xl leading-10 text-murekkep sm:text-3xl sm:leading-[2.75rem]">
              {sayfa.body}
            </p>

            <p className="mt-4 text-right font-elyazi text-2xl text-murekkep-soluk sm:text-3xl">
              — {sayfa.witnessName}
            </p>
          </div>
        </motion.article>

        {sayfa.isFictional ? (
          <p className="flex max-w-2xl items-start gap-2 rounded-kart bg-vurgu-yumusak px-4 py-2.5 text-center font-govde text-xs font-medium leading-5 text-murekkep-soluk sm:text-sm">
            <Ikon ad="dusunce" boyut={16} className="mt-0.5 shrink-0 text-vurgu" />
            Bu sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir.
          </p>
        ) : null}
      </div>
    </OkumaKarti>
  );
}
