"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Ikon } from "./Ikon";

export type SifreDenemesi = { tamam: true } | { tamam: false; hata: string };

type SifrePaneliProps = {
  baslik: string;
  aciklama?: string;
  /** 4 rakam girilince çağrılır; yanlışsa hata metni döner, rakamlar silinir. */
  onGir: (sifre: string) => Promise<SifreDenemesi>;
  /** Tuş takımının altında küçük bağlantılar (Şifremi unuttum, Vazgeç …). */
  alt?: React.ReactNode;
  uzunluk?: number;
};

const TUSLAR = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "sil"] as const;

/**
 * Sayısal şifre paneli: dört nokta + büyük tuş takımı (Faz 7 — 3.11). Profil
 * şifresi (çocuk) ve veli PIN'i aynı paneli kullanır; renkler çevreleyen
 * temadan (`.tema-cocuk` / `.tema-veli`) gelir. Fiziksel klavyeden rakam ve
 * silme tuşu da çalışır. Yanlış girişte panel hafifçe sallanır ("hareketi
 * azalt"ta sallanmaz — MotionConfig).
 */
export function SifrePaneli({ baslik, aciklama, onGir, alt, uzunluk = 4 }: SifrePaneliProps) {
  const [rakamlar, setRakamlar] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [bekliyor, setBekliyor] = useState(false);
  const sallanma = useAnimationControls();

  const gonder = useCallback(
    async (sifre: string) => {
      setBekliyor(true);
      const sonuc = await onGir(sifre);
      setBekliyor(false);
      if (!sonuc.tamam) {
        setHata(sonuc.hata);
        setRakamlar("");
        void sallanma.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.36 } });
      }
    },
    [onGir, sallanma],
  );

  const bas = useCallback(
    (tus: string) => {
      if (bekliyor) return;
      if (tus === "sil") {
        setRakamlar((onceki) => onceki.slice(0, -1));
        return;
      }
      if (rakamlar.length >= uzunluk) return;
      setHata(null);
      const yeni = rakamlar + tus;
      setRakamlar(yeni);
      if (yeni.length === uzunluk) void gonder(yeni);
    },
    [bekliyor, gonder, rakamlar, uzunluk],
  );

  useEffect(() => {
    function klavye(event: KeyboardEvent) {
      if (/^[0-9]$/.test(event.key)) bas(event.key);
      else if (event.key === "Backspace") bas("sil");
    }
    window.addEventListener("keydown", klavye);
    return () => window.removeEventListener("keydown", klavye);
  }, [bas]);

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center text-center">
      <h2 className="font-baslik text-2xl font-bold text-murekkep">{baslik}</h2>
      {aciklama ? (
        <p className="mt-2 text-base font-medium leading-6 text-murekkep-soluk">{aciklama}</p>
      ) : null}

      <motion.div animate={sallanma} className="mt-6 flex gap-4" aria-hidden="true">
        {Array.from({ length: uzunluk }, (_, sira) => (
          <span
            key={sira}
            className={`h-5 w-5 rounded-full border-2 transition-colors ${
              sira < rakamlar.length ? "border-vurgu bg-vurgu" : "border-cizgi bg-transparent"
            }`}
          />
        ))}
      </motion.div>
      <p className="sr-only" aria-live="polite">
        {rakamlar.length} rakam girildi
      </p>

      <p role="alert" className="mt-4 min-h-12 text-base font-semibold leading-6 text-vurgu">
        {hata ?? (bekliyor ? "Bakılıyor…" : "")}
      </p>

      <div className="mt-2 grid w-full grid-cols-3 gap-3">
        {TUSLAR.map((tus, sira) =>
          tus === "" ? (
            <span key={sira} />
          ) : (
            <button
              key={sira}
              type="button"
              onClick={() => bas(tus)}
              disabled={bekliyor}
              aria-label={tus === "sil" ? "Son rakamı sil" : tus}
              className="grid h-16 place-items-center rounded-buton border border-cizgi bg-yuzey font-baslik text-2xl font-bold text-murekkep shadow-sm transition active:scale-95 disabled:opacity-60"
            >
              {tus === "sil" ? <Ikon ad="ok-sol" boyut={24} /> : tus}
            </button>
          ),
        )}
      </div>

      {alt ? <div className="mt-5 flex flex-col items-center gap-2">{alt}</div> : null}
    </div>
  );
}
