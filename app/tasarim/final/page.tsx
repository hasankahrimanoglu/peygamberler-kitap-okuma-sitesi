"use client";

import { useEffect, useState } from "react";
import { FinalTesti, type FinalSaveState } from "../../../src/components/final/FinalTesti";
import { quizConfig, type QuizOption } from "../../../src/data/quizzes";
import { tekrarBakilacakBolumler } from "../../../src/lib/derive";
import {
  adresteVar,
  FINAL_DONUS_PARAMETRESI,
  FINAL_SONUC_PARAMETRESI,
  finalSonucunuOku,
  finalSonucunuSakla,
  finalSonucunuSil,
} from "../../../src/lib/child/finalSonucu";

/**
 * Büyük Final Testi önizlemesi — giriş gerektirmez, kayıt Supabase'e gitmez.
 * Gerçek ekran `/quiz/[bookId]`'dir (PROJE-MODELI 3.6: önizleme rotaları ürün
 * rotalarından ayrı kalır).
 *
 *   /tasarim/final?kitap=yunus               → ilk tamamlama, madalya kazanılır
 *   /tasarim/final?kitap=yunus&durum=alistirma → madalya önceden kazanılmış
 *   /tasarim/final?kitap=yunus&durum=hata      → kayıt hatası, "Tekrar Dene"
 *   /tasarim/final?kitap=yunus&sonuc=1         → "Tekrar oku"dan dönüş: aynı sonuç
 *     (sonuç bu sekmede kesinleştiyse; yoksa test baştan başlar)
 */
export default function FinalOnizleme() {
  const [ayar, setAyar] = useState<{ kitap: string; durum: string; donuldu: boolean } | null>(null);
  const [soru, setSoru] = useState(0);
  const [secilen, setSecilen] = useState<QuizOption["id"] | null>(null);
  const [kontrol, setKontrol] = useState(false);
  const [sonuclar, setSonuclar] = useState<boolean[]>([]);
  const [bitti, setBitti] = useState(false);
  const [kayit, setKayit] = useState<FinalSaveState>("idle");

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      const istenen = parametreler.get("kitap") ?? "yunus";
      const kitap = quizConfig[istenen] ? istenen : "yunus";
      const donulen = adresteVar(FINAL_SONUC_PARAMETRESI)
        ? finalSonucunuOku(kitap, null, quizConfig[kitap].questions.length)
        : null;
      if (donulen) {
        setSonuclar(donulen.sonuclar);
        setKayit(donulen.kayit);
        setBitti(true);
      } else {
        finalSonucunuSil(kitap);
      }
      setAyar({
        kitap,
        durum: donulen ? (donulen.alistirma ? "alistirma" : "") : (parametreler.get("durum") ?? ""),
        donuldu: Boolean(donulen),
      });
    });
  }, []);

  const sonucKesin = bitti && (ayar?.durum === "alistirma" || kayit === "saved");

  // Gerçek ekranla aynı: kesinleşen sonuç saklanır, adres `?sonuc=1` olur.
  useEffect(() => {
    if (!sonucKesin || !ayar) return;
    finalSonucunuSakla(ayar.kitap, {
      profilId: null,
      sonuclar,
      kayit: kayit === "saved" ? "saved" : "idle",
      alistirma: ayar.durum === "alistirma",
    });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?kitap=${ayar.kitap}&${FINAL_SONUC_PARAMETRESI}`,
    );
  }, [sonucKesin, ayar, sonuclar, kayit]);

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
      sonucaDonuldu={ayar.donuldu}
      selectedIsCorrect={secilen === aktif.correctOption}
      selectedOption={secilen}
      tekrarBolumleri={tekrarBakilacakBolumler(
        ayar.kitap,
        sonuclar,
        (bolumRotasi) => `/tasarim/okuma?bolum=${bolumRotasi}&tekrar=1&${FINAL_DONUS_PARAMETRESI}`,
      )}
    />
  );
}
