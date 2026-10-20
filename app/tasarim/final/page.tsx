"use client";

import { useEffect, useState } from "react";
import { FinalTesti, type FinalSaveState } from "../../../src/components/final/FinalTesti";
import { quizConfig, type QuizOption } from "../../../src/data/quizzes";
import { tekrarBakilacakBolumler } from "../../../src/lib/derive";

/**
 * Büyük Final Testi önizlemesi — giriş gerektirmez, kayıt Supabase'e gitmez.
 * Gerçek ekran `/quiz/[bookId]`'dir (PROJE-MODELI 3.6: önizleme rotaları ürün
 * rotalarından ayrı kalır).
 *
 *   /tasarim/final?kitap=idris               → ilk tamamlama, madalya kazanılır
 *   /tasarim/final?kitap=idris&durum=alistirma → madalya önceden kazanılmış
 *   /tasarim/final?kitap=idris&durum=hata      → kayıt hatası, "Tekrar Dene"
 */
export default function FinalOnizleme() {
  const [ayar, setAyar] = useState<{ kitap: string; durum: string } | null>(null);
  const [soru, setSoru] = useState(0);
  const [secilen, setSecilen] = useState<QuizOption["id"] | null>(null);
  const [kontrol, setKontrol] = useState(false);
  const [sonuclar, setSonuclar] = useState<boolean[]>([]);
  const [bitti, setBitti] = useState(false);
  const [kayit, setKayit] = useState<FinalSaveState>("idle");

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      const kitap = parametreler.get("kitap") ?? "idris";
      setAyar({ kitap: quizConfig[kitap] ? kitap : "idris", durum: parametreler.get("durum") ?? "" });
    });
  }, []);

  if (!ayar) return null;

  const quiz = quizConfig[ayar.kitap];
  const sorular = quiz.questions;
  const aktif = sorular[soru];
  const alistirma = ayar.durum === "alistirma";

  function kaydet() {
    setKayit("saving");
    window.setTimeout(() => setKayit(ayar?.durum === "hata" ? "retryable-error" : "saved"), 900);
  }

  return (
    <FinalTesti
      activeQuestion={aktif}
      bookKey={ayar.kitap}
      bookLabel={quiz.label}
      madalya={`${quiz.label} Yolculuk Madalyası`}
      isChecked={kontrol}
      isFinished={bitti}
      isSaving={kayit === "saving"}
      onBack={() => window.history.back()}
      onCheck={() => {
        if (!secilen) return;
        setSonuclar((onceki) => [...onceki, secilen === aktif.correctOption]);
        setKontrol(true);
      }}
      onNext={() => {
        if (soru === sorular.length - 1) {
          setBitti(true);
          if (!alistirma) kaydet();
          return;
        }
        setSoru((onceki) => onceki + 1);
        setSecilen(null);
        setKontrol(false);
      }}
      onReturn={() => (kayit === "retryable-error" ? kaydet() : window.location.assign("/tasarim/ana-ekran"))}
      onReturnToBook={() => window.location.assign("/tasarim/ana-ekran")}
      onSelect={setSecilen}
      practiceMode={alistirma}
      questionIndex={soru}
      questions={sorular}
      results={sonuclar}
      saveError={kayit === "retryable-error" ? "Final sonucun şu anda kaydedilemedi." : null}
      saveState={kayit}
      score={sonuclar.filter(Boolean).length}
      selectedIsCorrect={secilen === aktif.correctOption}
      selectedOption={secilen}
      tekrarBolumleri={tekrarBakilacakBolumler(
        ayar.kitap,
        sonuclar,
        (bolumRotasi) => `/tasarim/okuma?bolum=${bolumRotasi}&tekrar=1`,
      )}
    />
  );
}
