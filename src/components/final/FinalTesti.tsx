"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { QuizOption, QuizQuestion } from "../../data/quizzes";
import type { TekrarBolumu } from "../../lib/derive";
import { madalyaGorseli, rozetGorseli, YEDEK } from "../../lib/varlikYollari";
import { AdimCubugu } from "../reader/AdimCubugu";
import { KutlamaSahnesi } from "../reader/KutlamaSahnesi";
import okuma from "../reader/okuma-akisi.module.css";
import { Ikon, YedekliGorsel } from "../ui";
import styles from "./final-testi.module.css";

export type FinalSaveState =
  | "idle"
  | "saving"
  | "saved"
  | "already-completed"
  | "retryable-error"
  | "missing-profile"
  | "incomplete-journey";

/** Üst barın yüksekliği: ödül sahnesi ekrana sığsın diye CSS'e taşınır. */
function useUstYukseklik() {
  const sayfaRef = useRef<HTMLElement | null>(null);
  const ustBarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const bar = ustBarRef.current;
    const sayfa = sayfaRef.current;
    if (!bar || !sayfa) return;
    const gozlemci = new ResizeObserver(() => {
      sayfa.style.setProperty("--ust-yukseklik", `${bar.offsetHeight}px`);
    });
    gozlemci.observe(bar);
    return () => gozlemci.disconnect();
  }, []);

  return { sayfaRef, ustBarRef };
}

export type FinalTestiProps = {
  activeQuestion: QuizQuestion;
  bookKey: string;
  bookLabel: string;
  madalya: string;
  isChecked: boolean;
  isFinished: boolean;
  isSaving: boolean;
  onBack: () => void;
  onCheck: () => void;
  onNext: () => void;
  onReturn: () => void;
  onReturnToBook: () => void;
  onSelect: (option: QuizOption["id"]) => void;
  practiceMode: boolean;
  questionIndex: number;
  questions: QuizQuestion[];
  results: boolean[];
  saveError: string | null;
  saveState: FinalSaveState;
  score: number;
  selectedIsCorrect: boolean;
  selectedOption: QuizOption["id"] | null;
  /** Cevabı farklı seçilen soruların bölümleri, soru sırasıyla (4.1/13 EK). */
  tekrarBolumleri: TekrarBolumu[];
};

/**
 * "Tekrar bakmak istersen" (PROJE-MODELI 4.1/13 EK — 20 Eki 2026): kutlama
 * kartını boğmasın ve yanlışlar listesi gibi okunmasın diye kapalı gelir.
 * Açılınca liste görünür alana kaydırılır; her satır bölümü tekrar okumaya açar.
 */
function TekrarBak({ bookKey, bolumler }: { bookKey: string; bolumler: TekrarBolumu[] }) {
  const [acik, setAcik] = useState(false);
  const listeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!acik) return;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    listeRef.current?.scrollIntoView({ block: "nearest", behavior: azHareket ? "auto" : "smooth" });
  }, [acik]);

  return (
    <div className={styles.tekrarAlani}>
      <button
        type="button"
        className={`${styles.tekrarAcici} ${acik ? styles.tekrarAcik : ""}`}
        aria-expanded={acik}
        aria-controls="final-tekrar-listesi"
        onClick={() => setAcik((onceki) => !onceki)}
      >
        Tekrar bakmak istersen
        <Ikon ad="asagi" boyut={20} />
      </button>
      <div id="final-tekrar-listesi" ref={listeRef} className={styles.tekrarListeKabi}>
        <AnimatePresence initial={false}>
          {acik ? (
            <motion.div
              key="liste"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p className={styles.tekrarNotu}>Cevabını farklı seçtiğin soruların bölümleri:</p>
              <ul className={styles.tekrarListesi}>
                {bolumler.map((bolum) => (
                  <li key={bolum.no}>
                    <Link
                      href={bolum.yol}
                      className={styles.tekrarSatiri}
                      aria-label={`${bolum.no}. bölümü tekrar oku: ${bolum.ad}`}
                    >
                      <YedekliGorsel
                        src={rozetGorseli(bookKey, bolum.no)}
                        yedekSrc={YEDEK.rozet}
                        alt=""
                        width={44}
                        height={44}
                      />
                      <span className={styles.tekrarMetni}>
                        <small>{bolum.no}. bölüm</small>
                        <strong>{bolum.ad}</strong>
                      </span>
                      <span className={styles.tekrarOku}>
                        Tekrar oku
                        <Ikon ad="ok-sag" boyut={16} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Büyük Final Testi (yeni düzen — 12 Eki 2026, Hasan; PROJE-MODELI 3.10.3 ve
 * 4.1/13). Okuma ekranıyla aynı dil: krem zemin, aynı üst bar, soru sırasını
 * gösteren adım çubuğu (tablet yatay ve masaüstünde solda soru sütunu +
 * kazanılacak madalya). Şıklar "Sen olsaydın?" ile aynı basılabilir A-B-C
 * düğmeleri. Sonuç, rozet anıyla ortak gece mavisi ödül sahnesidir.
 *
 * Testi bitirmek madalyayı kazandırır; doğru sayısı şart değildir (4.1/13).
 * Doğru sayısı sonuçta sakin bir satırla gösterilir (Hasan, 12 Eki 2026:
 * çocuk her soruda zaten doğru/yanlışı görüyor); yanlışlar kırmızıyla
 * vurgulanmaz, hiç doğru yoksa satır gösterilmez.
 */
export function FinalTesti({
  activeQuestion,
  bookKey,
  bookLabel,
  madalya,
  isChecked,
  isFinished,
  isSaving,
  onBack,
  onCheck,
  onNext,
  onReturn,
  onReturnToBook,
  onSelect,
  practiceMode,
  questionIndex,
  questions,
  results,
  saveError,
  saveState,
  score,
  selectedIsCorrect,
  selectedOption,
  tekrarBolumleri,
}: FinalTestiProps) {
  const { sayfaRef, ustBarRef } = useUstYukseklik();
  const isAlreadyCompleted = saveState === "already-completed";
  const isFirstCompletionSaved = !practiceMode && saveState === "saved";
  const isWaiting = !practiceMode && (saveState === "idle" || saveState === "saving");
  const isRetryableError = saveState === "retryable-error";
  const isMissingProfile = saveState === "missing-profile";
  const isIncompleteJourney = saveState === "incomplete-journey";
  const madalyaSenin = practiceMode || isFirstCompletionSaved || isAlreadyCompleted;
  const sonSoru = questionIndex === questions.length - 1;
  const madalyaYolu = madalyaGorseli(bookKey);

  const adimlar = useMemo(
    () =>
      questions.map((question, sira) => ({
        id: String(question.id),
        // Telefonda 5'ten fazla soru "1. soru" etiketleriyle sığmaz; numara kalır.
        kisa: questions.length > 5 ? `${sira + 1}` : `${sira + 1}. soru`,
        uzun: `${sira + 1}. soru`,
        kapiArkasinda: false,
      })),
    [questions],
  );
  const aktifAdim = isFinished ? questions.length : questionIndex;
  // Bulunulan sorunun çizgisi cevap kontrol edilince dolar.
  const adimDolulugu = isChecked ? 1 : 0.12;

  const liveStatus = !isFinished
    ? `Soru ${questionIndex + 1} / ${questions.length}: ${activeQuestion.question}`
    : isFirstCompletionSaved
      ? `${madalya} senin!`
      : practiceMode
        ? "Finali yeniden tamamladın."
        : isAlreadyCompleted
          ? "Bu yolculuk zaten kayıtlı. İlk final sonucun değişmedi."
          : isMissingProfile
            ? "Çocuk profili bulunamadı. Bölümlere dönebilirsin."
            : isIncompleteJourney
              ? "Final kaydı için önce bütün bölümleri tamamlamalısın."
              : isRetryableError
                ? "Final sonucun kaydedilemedi. Yeniden deneyebilirsin."
                : "Final sonucun kaydediliyor.";

  const cubuk = (yon: "yatay" | "dikey") => (
    <AdimCubugu
      adimlar={adimlar}
      aktif={aktifAdim}
      dolu={adimDolulugu}
      enIleri={aktifAdim}
      kapiAcik
      yon={yon}
      dokunulur={false}
      etiket="Final testinin soruları"
    />
  );

  return (
    <main
      ref={sayfaRef}
      className={`tema-cocuk ${okuma.sayfa} ${okuma.yaziNormal}`}
      data-book={bookKey}
      data-quiz-mode={practiceMode ? "practice" : "first-completion"}
    >
      <header className={okuma.ustBar} ref={ustBarRef}>
        <div className={okuma.ustSatir}>
          <button
            type="button"
            className={okuma.geriDugmesi}
            disabled={isSaving || isRetryableError}
            onClick={onBack}
          >
            <Ikon ad="geri" boyut={20} />
            <span className={okuma.geriMetni}>Bölümler</span>
          </button>
          <div className={okuma.kimlik}>
            <strong>Büyük Final Testi</strong>
            <span>
              {bookLabel} · {questions.length} soru
            </span>
          </div>
          <div className={okuma.ustEylemler}>
            {practiceMode ? (
              <span className={styles.alistirmaCipi}>
                <Ikon ad="onay" boyut={15} />
                Alıştırma
              </span>
            ) : null}
          </div>
        </div>
        {cubuk("yatay")}
      </header>

      <div className={okuma.govde}>
        <aside className={okuma.yanSutun}>
          {cubuk("dikey")}
          <div className={`${okuma.yanRozet} ${madalyaSenin ? okuma.rozetKazanilmis : ""}`}>
            <YedekliGorsel src={madalyaYolu} yedekSrc={YEDEK.madalya} alt="" width={104} height={104} />
            <small>{madalyaSenin ? "Bu madalya senin" : "Testi bitirince senin"}</small>
            <strong>{madalya}</strong>
          </div>
          {isFinished ? null : (
            <p className={styles.yanNot}>
              {practiceMode
                ? "Alıştırma: ilk sonucun ve madalyan değişmez."
                : "Doğru sayısı madalyanın şartı değil."}
            </p>
          )}
        </aside>

        <div className={okuma.akis}>
          <AnimatePresence mode="wait" initial={false}>
            {isFinished ? (
              <motion.div
                key="sonuc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                aria-busy={isWaiting}
              >
                <KutlamaSahnesi
                  gorsel={madalyaYolu}
                  yedekGorsel={YEDEK.madalya}
                  gorselAdi={madalya}
                  yaklasti
                  kazanildi={madalyaSenin}
                  patlama={isFirstCompletionSaved}
                  baslikId="final-sonuc-basligi"
                >
                  {isWaiting ? (
                    <>
                      <h2 id="final-sonuc-basligi">Madalyan hazırlanıyor…</h2>
                      <p className={okuma.kutlamaNotu}>Cevapların kaydediliyor.</p>
                      <div className={`${okuma.kutlamaEylemleri} ${okuma.tekEylem}`}>
                        <button type="button" className={`${okuma.buyukDugme} ${okuma.altinDugme}`} disabled>
                          <Ikon ad="madalya" boyut={20} />
                          Kaydediliyor...
                        </button>
                      </div>
                    </>
                  ) : isRetryableError || isMissingProfile || isIncompleteJourney ? (
                    <>
                      <h2 id="final-sonuc-basligi">
                        {isMissingProfile
                          ? "Profilini yeniden seçelim"
                          : isIncompleteJourney
                            ? "Önce bölümleri bitirelim"
                            : "Bir kez daha deneyelim"}
                      </h2>
                      <p className={okuma.kutlamaNotu}>
                        {isMissingProfile
                          ? "Kaydetmek için bölümlere dönüp profilini yeniden seç."
                          : isIncompleteJourney
                            ? "Madalya, bütün bölümler ve final testi bitince kazanılır."
                            : "Cevapların burada duruyor. Bağlantını kontrol edip yeniden dene."}
                      </p>
                      {saveError ? (
                        <p id="final-save-error" className={okuma.kutlamaHata} role="alert">
                          {saveError}
                        </p>
                      ) : null}
                      <div className={`${okuma.kutlamaEylemleri} ${isRetryableError ? "" : okuma.tekEylem}`}>
                        <button
                          type="button"
                          className={`${okuma.buyukDugme} ${isRetryableError ? okuma.altinDugme : okuma.yesilDugme}`}
                          aria-describedby={saveError ? "final-save-error" : undefined}
                          onClick={onReturn}
                        >
                          {isRetryableError ? "Tekrar Dene" : "Bölümlere Dön"}
                        </button>
                        {isRetryableError ? (
                          <button
                            type="button"
                            className={`${okuma.buyukDugme} ${okuma.geceHayaletDugme}`}
                            onClick={onReturnToBook}
                          >
                            <Ikon ad="geri" boyut={18} />
                            Bölümlere dön
                          </button>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 id="final-sonuc-basligi">
                        {isFirstCompletionSaved
                          ? `${madalya} senin!`
                          : practiceMode
                            ? "Finali yeniden tamamladın!"
                            : `${madalya} zaten senin`}
                      </h2>
                      <p className={okuma.kutlamaNotu}>
                        {isFirstCompletionSaved
                          ? `${bookLabel} yolculuğunu tamamladın.`
                          : practiceMode
                            ? "Bilgilerini tazeledin; ilk sonucun ve madalyan aynı kaldı."
                            : "Bu tur ilk final sonucunu değiştirmedi."}
                      </p>

                      {score > 0 ? (
                        <div className={styles.sonucSatiri}>
                          <span className={styles.sonucNoktalari} aria-hidden="true">
                            {results.map((dogru, sira) => (
                              <span key={sira} className={dogru ? styles.noktaDogru : styles.noktaBos}>
                                {dogru ? <Ikon ad="yildiz" boyut={18} /> : null}
                              </span>
                            ))}
                          </span>
                          <span>
                            {questions.length} sorunun {score} tanesini doğru hatırladın.
                          </span>
                        </div>
                      ) : null}

                      {isFirstCompletionSaved ? (
                        <p className={styles.haritaNotu}>
                          <Ikon ad="harita" boyut={18} />
                          Bu madalya haritada {bookLabel} kitabının yanında parlayacak.
                        </p>
                      ) : null}

                      <div className={`${okuma.kutlamaEylemleri} ${okuma.tekEylem}`}>
                        <button
                          type="button"
                          className={`${okuma.buyukDugme} ${okuma.yesilDugme}`}
                          onClick={onReturn}
                        >
                          {isFirstCompletionSaved ? "Haritaya Dön" : "Bölümlere Dön"}
                          <Ikon ad="ok-sag" boyut={20} />
                        </button>
                      </div>

                      {tekrarBolumleri.length > 0 ? (
                        <TekrarBak bookKey={bookKey} bolumler={tekrarBolumleri} />
                      ) : null}
                    </>
                  )}
                </KutlamaSahnesi>
              </motion.div>
            ) : (
              <motion.section
                key={`soru-${activeQuestion.id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className={styles.soruBolumu}
                aria-labelledby={`soru-basligi-${activeQuestion.id}`}
              >
                {questionIndex === 0 && !isChecked ? (
                  <p className={styles.giris}>
                    <YedekliGorsel src={madalyaYolu} yedekSrc={YEDEK.madalya} alt="" width={48} height={48} />
                    <span>
                      {practiceMode ? (
                        <>
                          <b>Alıştırma turu.</b> İlk sonucun ve madalyan değişmez.
                        </>
                      ) : (
                        <>
                          <b>Testi bitirince {madalya} senin.</b> Doğru sayısı şart değil.
                        </>
                      )}
                    </span>
                  </p>
                ) : null}

                <p className={okuma.kunye}>
                  Soru {questionIndex + 1} / {questions.length}
                </p>
                <h1 id={`soru-basligi-${activeQuestion.id}`} className={styles.soru}>
                  {activeQuestion.question}
                </h1>

                <div className={okuma.secenekler} role="radiogroup" aria-labelledby={`soru-basligi-${activeQuestion.id}`}>
                  {activeQuestion.options.map((option) => {
                    const secili = selectedOption === option.id;
                    const dogru = activeQuestion.correctOption === option.id;
                    const dogruGoster = isChecked && dogru;
                    const seninGoster = isChecked && secili && !dogru;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={secili}
                        disabled={isChecked}
                        className={[
                          okuma.secenek,
                          secili && !isChecked ? okuma.secenekSecili : "",
                          dogruGoster ? styles.secenekDogru : "",
                          seninGoster ? styles.secenekSenin : "",
                          isChecked && !dogru && !secili ? okuma.secenekGeri : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => onSelect(option.id)}
                      >
                        <span className={okuma.secenekHarfi}>
                          {dogruGoster ? <Ikon ad="onay" boyut={20} /> : option.id.toLocaleUpperCase("tr-TR")}
                        </span>
                        <span className={styles.secenekMetni}>
                          {option.text}
                          {dogruGoster ? <small>Doğru cevap</small> : null}
                          {seninGoster ? <small>Senin seçimin</small> : null}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {isChecked ? (
                  <p
                    className={`${styles.geriBildirim} ${selectedIsCorrect ? styles.geriBildirimDogru : ""}`}
                    role="status"
                  >
                    <Ikon ad={selectedIsCorrect ? "onay" : "fener"} boyut={20} />
                    {selectedIsCorrect ? "Doğru hatırladın!" : "Doğru cevap yeşil olan. Şimdi sen de biliyorsun."}
                  </p>
                ) : null}

                {!isChecked ? (
                  <button
                    type="button"
                    className={`${okuma.buyukDugme} ${selectedOption ? okuma.yesilDugme : okuma.bekleyenDugme}`}
                    disabled={!selectedOption}
                    onClick={onCheck}
                  >
                    {selectedOption ? <Ikon ad="onay" boyut={20} /> : null}
                    {selectedOption ? "Cevabı Kontrol Et" : "Bir seçenek seç"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${okuma.buyukDugme} ${sonSoru ? okuma.altinDugme : okuma.yesilDugme}`}
                    onClick={onNext}
                  >
                    {sonSoru ? <Ikon ad="madalya" boyut={20} /> : null}
                    {sonSoru ? "Sonucu Gör" : "Sonraki Soru"}
                    {sonSoru ? null : <Ikon ad="ok-sag" boyut={20} />}
                  </button>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className={okuma.srOnly} aria-live="polite">
        {liveStatus}
      </p>
    </main>
  );
}
