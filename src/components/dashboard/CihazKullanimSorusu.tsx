"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cihaziCocugaVer, cocukEkraninaGec, cocukModuAcikMi } from "../../lib/child/cocukOturumu";

type CihazKullanimSorusuProps = {
  acik: boolean;
  /** "Evet" seçildi, veli PIN'i denetleniyor. */
  bekliyor?: boolean;
  onCocugaVer: () => void;
  onGozAt: () => void;
  onVazgec: () => void;
};

/**
 * "Bu cihazı çocuğunuz kullanacak mı?" (PROJE-MODELI 3.11, REVİZE 19 Eki 2026).
 * Çocuk modu görünmeden açılmasın diye veli panelden çocuk ekranına geçerken
 * sorulur. Telefonda alttan açılır, geniş ekranda ortada durur.
 */
export function CihazKullanimSorusu({
  acik,
  bekliyor = false,
  onCocugaVer,
  onGozAt,
  onVazgec,
}: CihazKullanimSorusuProps) {
  const baslikId = useId();
  const ilkSecenek = useRef<HTMLButtonElement>(null);
  const vazgec = useRef(onVazgec);

  useEffect(() => {
    vazgec.current = onVazgec;
  });

  // Odak yalnız açılışta ilk seçeneğe gider; Esc kapatır.
  useEffect(() => {
    if (!acik) return undefined;
    ilkSecenek.current?.focus();
    const tus = (olay: KeyboardEvent) => {
      if (olay.key === "Escape") vazgec.current();
    };
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [acik]);

  return (
    <AnimatePresence>
      {acik ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-gece-950/50 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
          onClick={(olay) => {
            if (olay.target === olay.currentTarget) onVazgec();
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={baslikId}
            className="w-full max-w-lg rounded-t-kart border border-cizgi bg-zemin px-5 pb-6 pt-6 shadow-kart sm:rounded-kart sm:p-7"
          >
            <h2 id={baslikId} className="text-balance font-baslik text-2xl font-bold leading-tight text-murekkep">
              Bu cihazı çocuğunuz kullanacak mı?
            </h2>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
              Seçiminize göre veli paneli bu cihazda kilitlenir ya da açık kalır.
            </p>

            <div className="mt-5 space-y-3">
              <Secenek
                dugmeRef={ilkSecenek}
                ana
                disabled={bekliyor}
                baslik={bekliyor ? "Hazırlanıyor…" : "Evet, çocuğuma veriyorum"}
                onClick={onCocugaVer}
              >
                Veli paneli bu cihazda PIN&apos;le kilitlenir. Çocuğunuz &quot;Kim okuyor?&quot;
                ekranından kendi profiline girer.
              </Secenek>
              <Secenek disabled={bekliyor} baslik="Hayır, yalnız göz atacağım" onClick={onGozAt}>
                Çocuğun ekranı açılır, panel kilitlenmez. Bu seçimle cihazı çocuğa bırakmayın.
              </Secenek>
            </div>

            <button
              type="button"
              onClick={onVazgec}
              className="mt-4 min-h-11 w-full rounded-buton px-4 text-base font-semibold text-murekkep-soluk transition-colors hover:bg-yuzey-2"
            >
              Vazgeç
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Secenek({
  baslik,
  children,
  ana = false,
  disabled,
  onClick,
  dugmeRef,
}: {
  baslik: string;
  children: ReactNode;
  ana?: boolean;
  disabled?: boolean;
  onClick: () => void;
  dugmeRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={dugmeRef}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`block w-full rounded-kart border px-5 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vurgu disabled:cursor-not-allowed disabled:opacity-60 ${
        ana
          ? "border-eylem bg-eylem text-eylem-metin hover:bg-eylem-koyu"
          : "border-cizgi bg-yuzey text-murekkep hover:bg-yuzey-2"
      }`}
    >
      <span className="block font-baslik text-lg font-bold">{baslik}</span>
      <span className={`mt-1 block text-base font-medium leading-6 ${ana ? "opacity-90" : "text-murekkep-soluk"}`}>
        {children}
      </span>
    </button>
  );
}

/**
 * Veli panelinden çocuk ekranına geçiş ("Okumaya Devam Et", Kütüphane).
 * Cihaz çocuk modundaysa doğrudan geçer; değilse her seferinde önce soruyu
 * açar — veli az önce göz atmış olsa bile: cihazı şimdi çocuğa veriyor
 * olabilir, kilitsiz kalmasın. `pencere` sayfaya bir kez yerleştirilir.
 */
export function useCocukEkraniGecisi() {
  const router = useRouter();
  const [soru, setSoru] = useState<{ profil: { id: string; isim: string | null }; hedef: string } | null>(
    null,
  );
  const [bekliyor, setBekliyor] = useState(false);

  function ac(profil: { id: string; isim: string | null }, hedef = "/map") {
    if (cocukModuAcikMi()) {
      void cocukEkraninaGec(router, profil, hedef);
      return;
    }
    setBekliyor(false);
    setSoru({ profil, hedef });
  }

  const pencere = (
    <CihazKullanimSorusu
      acik={soru !== null}
      bekliyor={bekliyor}
      onCocugaVer={() => {
        setBekliyor(true);
        void cihaziCocugaVer(router);
      }}
      onGozAt={() => {
        if (!soru) return;
        void cocukEkraninaGec(router, soru.profil, soru.hedef, { gozAt: true });
      }}
      onVazgec={() => setSoru(null)}
    />
  );

  return { ac, pencere };
}
