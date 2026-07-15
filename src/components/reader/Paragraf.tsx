"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BookContentBlock } from "../../data/books";
import { glossary, resolveTerm } from "../../data/demoChapters";
import { Ikon } from "../ui";

type KelimeDurumu = {
  aktifKelime: string | null;
  setAktifKelime: (value: string | null) => void;
};

type KelimePenceresiProps = {
  baslik: string;
  aciklama: string;
};

/** Tıklanan kelimenin altında açılan anlam penceresi. */
function KelimePenceresi({ baslik, aciklama }: KelimePenceresiProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 4 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="absolute left-1/2 top-full z-30 mt-2.5 block w-72 max-w-[calc(100vw-3rem)] origin-top -translate-x-1/2 rounded-kart border border-cizgi bg-yuzey px-4 py-3.5 text-left shadow-kart"
      role="tooltip"
    >
      <span className="mb-1 flex items-center gap-2 font-baslik text-base font-bold leading-6 text-eylem">
        <Ikon ad="kitap" boyut={16} />
        {baslik}
      </span>
      <span className="block font-govde text-sm font-medium leading-6 text-murekkep">
        {aciklama}
      </span>
    </motion.span>
  );
}

type SozlukKelimesiProps = KelimeDurumu & {
  kelimeId: string;
  gorunen: string;
  baslik: string;
  aciklama: string;
};

/** Metin içinde vurgulu, tıklanınca anlamı açılan kelime. */
function SozlukKelimesi({
  kelimeId,
  gorunen,
  baslik,
  aciklama,
  aktifKelime,
  setAktifKelime,
}: SozlukKelimesiProps) {
  const acik = aktifKelime === kelimeId;

  return (
    <span className="relative inline-block" data-glossary-root>
      <button
        type="button"
        className="rounded px-0.5 font-bold text-eylem underline decoration-eylem/50 decoration-2 underline-offset-4 transition hover:bg-eylem-yumusak focus:outline-none focus-visible:ring-2 focus-visible:ring-eylem"
        onClick={() => setAktifKelime(acik ? null : kelimeId)}
      >
        {gorunen}
      </button>
      <AnimatePresence>
        {acik ? <KelimePenceresi baslik={baslik} aciklama={aciklama} /> : null}
      </AnimatePresence>
    </span>
  );
}

type KelimeliMetinProps = KelimeDurumu & {
  text: string;
};

/** Sözlükteki terimleri (Ebû Bekir kitabı demo sözlüğü) vurgulayarak yazar. */
export function KelimeliMetin({
  text,
  aktifKelime,
  setAktifKelime,
}: KelimeliMetinProps) {
  const parcalar = useMemo(() => {
    const termRegex =
      /(Ebû Bekir(?:['’][\p{L}]+)?|Bilâl(?:['’][\p{L}]+)?|Bilal(?:['’][\p{L}]+)?|Ahad(?:['’][\p{L}]+)?|köle[\p{L}'’]*|servet[\p{L}'’]*)/giu;

    return text.split(termRegex).filter(Boolean);
  }, [text]);

  return (
    <>
      {parcalar.map((parca, index) => {
        const terim = resolveTerm(parca);

        if (!terim) return <span key={`${parca}-${index}`}>{parca}</span>;

        return (
          <SozlukKelimesi
            key={`${terim}-${index}-${parca}`}
            kelimeId={`${terim}-${index}-${parca}`}
            gorunen={parca}
            baslik={glossary[terim].label}
            aciklama={glossary[terim].meaning}
            aktifKelime={aktifKelime}
            setAktifKelime={setAktifKelime}
          />
        );
      })}
    </>
  );
}

type ParagrafProps = KelimeDurumu & {
  block: BookContentBlock;
  blokIndex: number;
  /** "buyuk": yeni split düzendeki ferah okuma puntosu */
  boyut?: "normal" | "buyuk";
};

/**
 * Tek içerik bloğunu (düz metin veya etkileşimli kelimeli metin) yazar.
 * Görsel blokları HikayeSayfasi düzenler; buraya gelmez.
 */
export function Paragraf({
  block,
  blokIndex,
  boyut = "normal",
  aktifKelime,
  setAktifKelime,
}: ParagrafProps) {
  // Görsel ve Tanık blokları burada çizilmez: görseli HikayeSayfasi düzenler,
  // Tanık bloğu ayrı bir "tanik" sayfası olarak (TanikSayfasi) gösterilir.
  if (block.type === "image" || block.type === "witness") return null;

  const temelSinif =
    boyut === "buyuk"
      ? "font-story text-xl font-medium leading-9 md:text-2xl md:leading-10"
      : "font-story text-base font-medium leading-7 sm:text-lg sm:leading-8";

  if (block.type === "interactive_word") {
    return (
      <p className={temelSinif}>
        {block.before ? <span>{block.before}</span> : null}
        <SozlukKelimesi
          kelimeId={`kelime-${blokIndex}-${block.word}`}
          gorunen={block.word}
          baslik={block.word}
          aciklama={block.meaning}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
        {block.after ? <span>{block.after}</span> : null}
      </p>
    );
  }

  const diyalogMu = block.text.trimStart().startsWith("—");

  return (
    <p className={`${temelSinif} ${diyalogMu ? "italic" : ""}`}>
      <KelimeliMetin
        text={block.text}
        aktifKelime={aktifKelime}
        setAktifKelime={setAktifKelime}
      />
    </p>
  );
}
