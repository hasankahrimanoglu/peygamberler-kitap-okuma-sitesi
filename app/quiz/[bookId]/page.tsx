"use client";

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { FinalTesti, type FinalSaveState } from "../../../src/components/final/FinalTesti";
import okuma from "../../../src/components/reader/okuma-akisi.module.css";
import styles from "../../../src/components/final/final-testi.module.css";
import { Ikon } from "../../../src/components/ui";
import { dbKitabiBul } from "../../../src/lib/derive";
import { quizConfig, type QuizConfig, type QuizOption } from "../../../src/data/quizzes";

type SavedCompletionState = "loading" | "completed" | "incomplete" | "unknown";
type FinalSaveResult =
  | "saved"
  | "already-completed"
  | "incomplete-journey"
  | "error";

/**
 * Kitabın Supabase satırı. Kelime kümesiyle eşleşir (`dbKitabiBul`): eski
 * "anahtar kelime içeriyor mu" araması "ali"yi "Hz. Sâlih" içinde de bulurdu.
 */
function eslesenKitap<T extends { isim: string | null }>(books: T[] | null, activeQuiz: QuizConfig) {
  return dbKitabiBul(books ?? [], activeQuiz.label, activeQuiz.storagePrefix);
}

function isMissingFinalProgressColumn(message?: string) {
  const normalized = (message ?? "").toLocaleLowerCase("tr-TR");

  return (
    normalized.includes("final_title") ||
    normalized.includes("final_score") ||
    normalized.includes("final_badge")
  );
}

async function getSavedCompletionState(
  profileId: string,
  activeQuiz: QuizConfig,
): Promise<Exclude<SavedCompletionState, "loading">> {
  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, isim");

  if (booksError) {
    console.error("Final durumu için kitap bilgisi okunamadı:", booksError.message);
    return "unknown";
  }

  const matchedBook = eslesenKitap(books, activeQuiz);

  if (!matchedBook) return "unknown";

  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("bitti_mi")
    .eq("profile_id", profileId)
    .eq("book_id", matchedBook.id)
    .maybeSingle();

  if (progressError) {
    console.error("Kayıtlı final durumu okunamadı:", progressError.message);
    return "unknown";
  }

  return progress?.bitti_mi ? "completed" : "incomplete";
}

async function saveQuizCompletionToSupabase({
  profileId,
  activeQuiz,
  madalya,
  score,
  totalQuestions,
}: {
  profileId: string;
  activeQuiz: QuizConfig;
  madalya: string;
  score: number;
  totalQuestions: number;
}): Promise<FinalSaveResult> {
  // PROJE-MODELI #13: Testi tamamlamak madalyayı kazandırır; doğru sayısı şart
  // DEĞİLDİR. Bu yüzden eski %90 skor eşiği kaldırıldı — bütün bölümlerin
  // tamamlandığı doğrulanınca testin bitmesi "bitti" durumunu ve madalyayı yazar.

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (booksError) {
    console.error("Kitap bilgisi okunamadı:", booksError.message);
    return "error";
  }

  const matchedBook = eslesenKitap(books, activeQuiz);

  if (!matchedBook) {
    console.error(`${activeQuiz.label} için books tablosunda eşleşen kayıt yok.`);
    return "error";
  }

  const matchedBookId = matchedBook.id;
  const totalChapters = matchedBook.toplam_bolum || totalQuestions;
  const baseUpdatePayload = {
    tamamlanan_bolum_sayisi: totalChapters,
    yuzde: 100,
    bitti_mi: true,
    updated_at: new Date().toISOString(),
  };
  const richUpdatePayload = {
    ...baseUpdatePayload,
    final_title: madalya,
    final_score: score,
    final_badge: `${activeQuiz.label} Yolculuk Madalyası`,
  };

  async function readCurrentProgress() {
    return supabase
      .from("user_progress")
      .select("id, bitti_mi, tamamlanan_bolum_sayisi")
      .eq("profile_id", profileId)
      .eq("book_id", matchedBookId)
      .maybeSingle();
  }

  async function updateIncompleteProgress(): Promise<"saved" | "not-updated" | "error"> {
    let updateResult = await supabase
      .from("user_progress")
      .update(richUpdatePayload)
      .eq("profile_id", profileId)
      .eq("book_id", matchedBookId)
      .eq("bitti_mi", false)
      .gte("tamamlanan_bolum_sayisi", totalChapters)
      .select("id")
      .maybeSingle();

    if (updateResult.error && isMissingFinalProgressColumn(updateResult.error.message)) {
      updateResult = await supabase
        .from("user_progress")
        .update(baseUpdatePayload)
        .eq("profile_id", profileId)
        .eq("book_id", matchedBookId)
        .eq("bitti_mi", false)
        .gte("tamamlanan_bolum_sayisi", totalChapters)
        .select("id")
        .maybeSingle();
    }

    if (updateResult.error) {
      console.error("Final testi kalıcı ilerleme kaydı yazılamadı:", updateResult.error.message);
      return "error";
    }

    return updateResult.data ? "saved" : "not-updated";
  }

  const { data: currentProgress, error: currentProgressError } = await readCurrentProgress();

  if (currentProgressError) {
    console.error("Mevcut final durumu doğrulanamadı:", currentProgressError.message);
    return "error";
  }

  if (currentProgress?.bitti_mi) {
    return "already-completed";
  }

  if (!currentProgress || (currentProgress.tamamlanan_bolum_sayisi ?? 0) < totalChapters) {
    return "incomplete-journey";
  }

  const updateResult = await updateIncompleteProgress();
  if (updateResult === "saved" || updateResult === "error") return updateResult;

  const { data: latestProgress, error: latestProgressError } = await readCurrentProgress();
  if (latestProgressError) {
    console.error("Final kaydı yeniden doğrulanamadı:", latestProgressError.message);
    return "error";
  }
  if (latestProgress?.bitti_mi) return "already-completed";
  if (
    !latestProgress ||
    (latestProgress.tamamlanan_bolum_sayisi ?? 0) < totalChapters
  ) {
    return "incomplete-journey";
  }

  // Unvan burada YAZILMAZ: unvan skora değil, tamamlanan kitap sayısına bağlıdır
  // (PROJE-MODELI Bölüm 2; puan/derecelendirme yasağı).
  return "error";
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId as keyof typeof quizConfig;
  if (!quizConfig[bookId]) notFound();
  const activeQuiz = quizConfig[bookId];
  const questions = activeQuiz.questions;
  const madalya = `${activeQuiz.label} Yolculuk Madalyası`;
  const [savedCompletionState, setSavedCompletionState] =
    useState<SavedCompletionState>("loading");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption["id"] | null>(
    null,
  );
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  // Her sorunun sonucu, sonuç ekranındaki yıldız satırı için (sıra korunur).
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [saveState, setSaveState] = useState<FinalSaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const profileIdRef = useRef<string | null>(null);
  const saveInFlightRef = useRef(false);
  const navigationInFlightRef = useRef(false);
  const checkClickLockedRef = useRef(false);
  const nextClickLockedRef = useRef(false);
  const practiceMode = savedCompletionState === "completed";
  const isSaving = saveState === "saving";

  const activeQuestion = questions[questionIndex];
  const selectedIsCorrect = selectedOption === activeQuestion.correctOption;

  useEffect(() => {
    let cancelled = false;

    async function loadSavedCompletionState() {
      setSavedCompletionState("loading");
      const profileId = window.localStorage.getItem("selected_child_profile_id");
      profileIdRef.current = profileId;

      if (!profileId) {
        if (!cancelled) setSavedCompletionState("unknown");
        return;
      }

      try {
        const state = await getSavedCompletionState(profileId, activeQuiz);
        if (!cancelled) setSavedCompletionState(state);
      } catch (error) {
        console.error("Kayıtlı final durumu beklenmedik biçimde okunamadı:", error);
        if (!cancelled) setSavedCompletionState("unknown");
      }
    }

    void loadSavedCompletionState();

    return () => {
      cancelled = true;
    };
  }, [activeQuiz]);

  useEffect(() => {
    checkClickLockedRef.current = false;
    nextClickLockedRef.current = false;
  }, [questionIndex]);

  useEffect(() => {
    if (!isSaving) return;

    function warnBeforeLeaving(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [isSaving]);

  function checkAnswer() {
    if (!selectedOption || isChecked || checkClickLockedRef.current) return;
    checkClickLockedRef.current = true;

    if (selectedIsCorrect) {
      setScore((current) => current + 1);
    }
    setResults((current) => [...current, selectedIsCorrect]);

    setIsChecked(true);
  }

  function goNext() {
    if (nextClickLockedRef.current) return;
    nextClickLockedRef.current = true;

    if (questionIndex === questions.length - 1) {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: "auto" });
      if (!practiceMode) void persistFirstCompletion();
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedOption(null);
    setIsChecked(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  async function persistFirstCompletion() {
    if (practiceMode || saveInFlightRef.current) return;
    setSaveError(null);
    const profileId = profileIdRef.current;

    if (!profileId) {
      setSaveState("missing-profile");
      setSaveError(
        "İlerlemeni kaydedebilmek için çocuk profili bulunamadı. Bölümlere dönüp yeniden deneyebilirsin.",
      );
      return;
    }

    saveInFlightRef.current = true;
    setSaveState("saving");

    try {
      const saveResult = await saveQuizCompletionToSupabase({
        profileId,
        activeQuiz,
        madalya,
        score,
        totalQuestions: questions.length,
      });

      if (saveResult === "already-completed") {
        setSaveState("already-completed");
        return;
      }

      if (saveResult === "incomplete-journey") {
        setSaveState("incomplete-journey");
        setSaveError(
          "Büyük Final Testi, kitabın bütün bölümleri tamamlandıktan sonra kaydedilebilir.",
        );
        return;
      }

      if (saveResult === "error") {
        setSaveState("retryable-error");
        setSaveError(
          "Final sonucun şu anda kaydedilemedi. İnternet bağlantını kontrol edip tekrar deneyebilirsin.",
        );
        return;
      }

      setSaveState("saved");
    } catch (error) {
      console.error("Final sonucu kaydedilirken beklenmedik bir hata oluştu:", error);
      setSaveState("retryable-error");
      setSaveError(
        "Final sonucun şu anda kaydedilemedi. İnternet bağlantını kontrol edip tekrar deneyebilirsin.",
      );
    } finally {
      saveInFlightRef.current = false;
    }
  }

  function returnFromResult() {
    if (
      practiceMode ||
      saveState === "already-completed" ||
      saveState === "missing-profile" ||
      saveState === "incomplete-journey"
    ) {
      returnToBookRoute();
      return;
    }

    if (saveState === "retryable-error") {
      void persistFirstCompletion();
      return;
    }

    if (saveState === "saved") {
      if (navigationInFlightRef.current) return;
      navigationInFlightRef.current = true;
      router.push(`/map?final=${activeQuiz.storagePrefix}`);
    }
  }

  // Ayrı bölüm rotası sayfası kalktı (3.10.7): dönüş haritaya, kitap açık hâlde.
  function returnToBookRoute() {
    if (saveInFlightRef.current || navigationInFlightRef.current) return;
    navigationInFlightRef.current = true;
    router.replace(`/map?kitap=${activeQuiz.storagePrefix}`);
  }

  if (savedCompletionState === "loading") {
    return (
      <main className={`tema-cocuk ${okuma.sayfa} ${styles.yukleniyor}`}>
        <p role="status">
          <Ikon ad="fener" boyut={24} />
          Final testi hazırlanıyor…
        </p>
      </main>
    );
  }

  return (
    <FinalTesti
      activeQuestion={activeQuestion}
      bookKey={bookId}
      bookLabel={activeQuiz.label}
      madalya={madalya}
      isChecked={isChecked}
      isFinished={isFinished}
      isSaving={isSaving}
      onBack={returnToBookRoute}
      onCheck={checkAnswer}
      onReturnToBook={returnToBookRoute}
      onNext={goNext}
      onReturn={returnFromResult}
      onSelect={setSelectedOption}
      practiceMode={practiceMode}
      questionIndex={questionIndex}
      questions={questions}
      results={results}
      saveError={saveError}
      saveState={saveState}
      score={score}
      selectedIsCorrect={selectedIsCorrect}
      selectedOption={selectedOption}
    />
  );
}
