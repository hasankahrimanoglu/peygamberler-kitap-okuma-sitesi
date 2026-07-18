"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Konfeti } from "../../../src/components/reader/Konfeti";
import { Buton, Ikon, OdulIkonu } from "../../../src/components/ui";
import styles from "./quiz-atlas.module.css";

type QuizOption = {
  id: "a" | "b" | "c";
  text: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  correctOption: QuizOption["id"];
};

type CompletionResult = {
  madalya: string;
  headline: string;
  message: string;
  className: string;
};

type QuizConfig = {
  label: string;
  questions: QuizQuestion[];
  storagePrefix: string;
  keywords: string[];
};

type SavedCompletionState = "loading" | "completed" | "incomplete" | "unknown";
type FinalSaveState =
  | "idle"
  | "saving"
  | "saved"
  | "already-completed"
  | "retryable-error"
  | "missing-profile"
  | "incomplete-journey";
type FinalSaveResult =
  | "saved"
  | "already-completed"
  | "incomplete-journey"
  | "error";

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Ebû Bekir, Bilâl'i neden satın alıp özgür bırakmıştı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Onu kendi yanında çalıştırmak için" },
      { id: "b", text: "Allah rızası için ve onu haksızlıktan kurtarmak için" },
      { id: "c", text: "Çarşıdaki insanlara zenginliğini göstermek için" },
    ],
  },
  {
    id: 2,
    question: "Bilâl zor anlarında hangi sözü tekrar ediyordu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Ahad!.. Ahad!.." },
      { id: "b", text: "Sabır!.. Sabır!.." },
      { id: "c", text: "Hicret!.. Hicret!.." },
    ],
  },
  {
    id: 3,
    question: "Ebû Bekir, Bilâl'in sahibi fiyatı yükselttiğinde ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Eve dönüp düşünmek istedi" },
      { id: "b", text: "Uzun uzun pazarlık yaptı" },
      { id: "c", text: "İstenen parayı verip Bilâl'i özgür bıraktı" },
    ],
  },
  {
    id: 4,
    question: "Ebû Bekir'in babasına verdiği cevap onun hangi niyetini gösteriyordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Güçlü insanları yanında toplamak istediğini" },
      { id: "b", text: "İyiliği yalnızca Allah için yaptığını" },
      { id: "c", text: "Servetini saklamaya çalıştığını" },
    ],
  },
  {
    id: 5,
    question: "Açık davet başladığında Müslüman olmak nasıl bir şey istiyordu?",
    correctOption: "a",
    options: [
      { id: "a", text: "Cesaret" },
      { id: "b", text: "Sadece hızlı koşmak" },
      { id: "c", text: "Çok yüksek sesle konuşmak" },
    ],
  },
  {
    id: 6,
    question: "Ebû Bekir, Kâbe'nin önünde insanları açıkça neye çağırdı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Ticarette daha çok kazanmaya" },
      { id: "b", text: "Mekke'den hemen ayrılmaya" },
      { id: "c", text: "Putları bırakıp bir olan Allah'a inanmaya" },
    ],
  },
  {
    id: 7,
    question: "Ebû Bekir ağır yaralıyken ilk olarak neyi sordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Bana ne oldu?" },
      { id: "b", text: "Peygamberim nasıl?" },
      { id: "c", text: "Param nerede?" },
    ],
  },
  {
    id: 8,
    question: "Peygamberimiz eziyet gören Müslümanlara hangi ülkeye gitmelerini söyledi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Habeşistan'a" },
      { id: "b", text: "Şam'a" },
      { id: "c", text: "Yemen'e" },
    ],
  },
  {
    id: 9,
    question: "Habeşistan'daki kral nasıl biri olarak anlatıldı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Çok sert ve haksız" },
      { id: "b", text: "Yalnızca zenginleri seven" },
      { id: "c", text: "Adil ve kimseye haksızlık etmeyen" },
    ],
  },
  {
    id: 10,
    question: "Esmâ'nın günlüğünde Ebû Bekir nasıl iyilik yapıyordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Herkese anlatarak" },
      { id: "b", text: "Sessizce, kimseye belli etmeden" },
      { id: "c", text: "Sadece karşılığını alınca" },
    ],
  },
  {
    id: 11,
    question: "Sabır yıllarında Müslümanlar birbirlerine nasıl oldular?",
    correctOption: "a",
    options: [
      { id: "a", text: "Bir vücut gibi kenetlendiler" },
      { id: "b", text: "Birbirlerinden uzaklaştılar" },
      { id: "c", text: "Yalnızca kendi işlerini düşündüler" },
    ],
  },
  {
    id: 12,
    question: "Bölümlerin ana değerlerinden biri aşağıdakilerden hangisidir?",
    correctOption: "c",
    options: [
      { id: "a", text: "Kibir" },
      { id: "b", text: "Bencillik" },
      { id: "c", text: "Cömertlik" },
    ],
  },
  {
    id: 13,
    question: "Final yolculuğunun en güzel sonucu nedir?",
    correctOption: "b",
    options: [
      { id: "a", text: "Sadece puan almak" },
      { id: "b", text: "Okuduklarımızdaki değerleri hayata taşımak" },
      { id: "c", text: "Bölümleri hiç düşünmeden geçmek" },
    ],
  },
];

const ademQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Âdem'in yeryüzündeki sorumluluğu neyi gerektiriyordu?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yeryüzündeki her şeyi istediği gibi kullanmayı" },
      { id: "b", text: "Kendisine verilen imkânları iyilikle ve özenle kullanmayı" },
      { id: "c", text: "Hiçbir varlıktan yardım almamayı" },
    ],
  },
  {
    id: 2,
    question: "İsimlerin öğretilmesi insana verilen hangi armağanı gösterdi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Hiç yorulmama özelliğini" },
      { id: "b", text: "Başkalarından üstün olma hakkını" },
      { id: "c", text: "Öğrenme, düşünme ve bilgisini paylaşma yeteneğini" },
    ],
  },
  {
    id: 3,
    question: "Kur'an'a göre yasak ağacın türü neydi?",
    correctOption: "a",
    options: [
      { id: "a", text: "Türü açıklanmamıştır." },
      { id: "b", text: "Elma ağacıydı." },
      { id: "c", text: "Buğday ağacıydı." },
    ],
  },
  {
    id: 4,
    question: "Şeytan yasak ağaç konusunda kimi aldattı?",
    correctOption: "b",
    options: [
      { id: "a", text: "Yalnızca Hz. Havva'yı" },
      { id: "b", text: "Hz. Âdem ile Hz. Havva'yı birlikte" },
      { id: "c", text: "Yalnızca melekleri" },
    ],
  },
  {
    id: 5,
    question: "Hz. Âdem ile Hz. Havva hatalarını anlayınca ne yaptı?",
    correctOption: "c",
    options: [
      { id: "a", text: "Birbirlerini suçladı." },
      { id: "b", text: "Hatalarını sakladı." },
      { id: "c", text: "Sorumluluklarını kabul edip Allah'tan bağışlanma istedi." },
    ],
  },
  {
    id: 6,
    question: "Hz. Âdem ile Hz. Havva'nın yeryüzünde nereye indirildiği hakkında ne biliyoruz?",
    correctOption: "a",
    options: [
      { id: "a", text: "Kur'an kesin bir yer bildirmez." },
      { id: "b", text: "İkisinin de aynı şehre indiği kesin olarak bilinir." },
      { id: "c", text: "Yolculuklarının bütün durakları Kur'an'da yazılıdır." },
    ],
  },
  {
    id: 7,
    question: "Öfkenin büyüdüğünü fark eden birinin yapabileceği en doğru şey nedir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Durmak, uzaklaşmak ve güvendiği bir yetişkinden yardım istemek" },
      { id: "b", text: "Öfkesini karşısındaki kişiden çıkarmak" },
      { id: "c", text: "Öfkesini kimseye söylemeden içinde büyütmek" },
    ],
  },
  {
    id: 8,
    question: "Hz. Âdem'in bıraktığı en değerli miras neydi?",
    correctOption: "c",
    options: [
      { id: "a", text: "Kesin yeri bilinen büyük bir yapı" },
      { id: "b", text: "Yeryüzündeki bütün eşyalar" },
      { id: "c", text: "Doğru bilgi, tövbe örneği ve güzel değerler" },
    ],
  },
];

const nuhQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Hz. Nuh demo kitabının ilk durağında hangi değer öne çıkar?",
    correctOption: "a",
    options: [
      { id: "a", text: "Sabır" },
      { id: "b", text: "Kibir" },
      { id: "c", text: "Vazgeçmek" },
    ],
  },
  {
    id: 2,
    question: "Geminin Hazırlığı bölümü bize neyi hatırlatır?",
    correctOption: "b",
    options: [
      { id: "a", text: "Hiç emek vermeden beklemeyi" },
      { id: "b", text: "Doğru iş için emek vermeyi" },
      { id: "c", text: "Arkadaşları yalnız bırakmayı" },
    ],
  },
  {
    id: 3,
    question: "Zor bir günde kalbi sakinleştiren en güzel davranış hangisidir?",
    correctOption: "c",
    options: [
      { id: "a", text: "Panik yapmak" },
      { id: "b", text: "Hiçbir şey yapmamak" },
      { id: "c", text: "Tedbir almak, dua etmek ve Allah'a güvenmek" },
    ],
  },
  {
    id: 4,
    question: "Tevekkül ne demektir?",
    correctOption: "a",
    options: [
      { id: "a", text: "Elinden geleni yapıp Allah'a güvenmek" },
      { id: "b", text: "Hiç çalışmadan sonuç beklemek" },
      { id: "c", text: "Her şeyden korkmak" },
    ],
  },
  {
    id: 5,
    question: "Yeni bir başlangıç yaparken en güzel ilk adım nedir?",
    correctOption: "b",
    options: [
      { id: "a", text: "Umutsuzluğa kapılmak" },
      { id: "b", text: "Şükredip iyi bir planla başlamak" },
      { id: "c", text: "Sadece geçmişi düşünmek" },
    ],
  },
];

const quizConfig: Record<string, QuizConfig> = {
  adem: {
    label: "Hz. Âdem",
    questions: ademQuizQuestions,
    storagePrefix: "adem",
    keywords: ["adem"],
  },
  nuh: {
    label: "Hz. Nuh",
    questions: nuhQuizQuestions,
    storagePrefix: "nuh",
    keywords: ["nuh"],
  },
  ebubekir: {
    label: "Hz. Ebû Bekir",
    questions: quizQuestions,
    storagePrefix: "ebubekir",
    keywords: ["ebu bekir", "ebubekir"],
  },
};

const confettiPieces = [
  { left: "7%", delay: 0, color: "bg-yellow-300", rotate: -18 },
  { left: "16%", delay: 0.08, color: "bg-emerald-300", rotate: 26 },
  { left: "28%", delay: 0.04, color: "bg-sky-300", rotate: -42 },
  { left: "41%", delay: 0.12, color: "bg-orange-300", rotate: 34 },
  { left: "57%", delay: 0.02, color: "bg-rose-300", rotate: -22 },
  { left: "69%", delay: 0.1, color: "bg-teal-300", rotate: 48 },
  { left: "82%", delay: 0.06, color: "bg-amber-300", rotate: -36 },
  { left: "93%", delay: 0.14, color: "bg-lime-300", rotate: 16 },
];

// PROJE-MODELI #13: Testi tamamlamak madalyayı kazandırır; doğru sayısı önemli
// değil. Sonuç ekranı derecelendirme/unvan (Altın Yol Arkadaşı vb.) göstermez —
// kazanılan kitap MADALYASINI ve pozitif bir tebrik gösterir.
function getCompletionResult(
  score: number,
  totalQuestions: number,
  label: string,
  practiceMode: boolean,
): CompletionResult {
  const madalya = `${label} Yolculuk Madalyası`;
  const hepsiDogru = totalQuestions > 0 && score === totalQuestions;

  if (practiceMode) {
    return {
      madalya,
      headline: "Finali Yeniden Tamamladın!",
      message: `Bilgilerini tazeledin. ${madalya} zaten senin; bu alıştırma yolculuk kaydını değiştirmedi.`,
      className: "border-emerald-300/60 bg-emerald-300/15 text-emerald-100",
    };
  }

  return {
    madalya,
    headline: "Madalyanı Kazandın!",
    message: hepsiDogru
      ? `Bu yolculuğu tamamladın ve her soruyu tek tek hatırladın. ${madalya} artık senin!`
      : `Bu yolculuğu tamamladın ve ${madalya}'nı kazandın. Haritada yeni bir kitabın kilidi açıldı.`,
    className: "border-amber-300/60 bg-amber-300/15 text-amber-100",
  };
}

function normalizeBookName(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
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

  const matchedBook = books?.find((book) => {
    const normalizedName = normalizeBookName(book.isim ?? "");
    return activeQuiz.keywords.some((keyword) => normalizedName.includes(keyword));
  });

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

  const matchedBook = books?.find((book) => {
    const normalizedName = normalizeBookName(book.isim ?? "");
    return activeQuiz.keywords.some((keyword) => normalizedName.includes(keyword));
  });

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
  // (PROJE-MODELI Bölüm 2; puan/derecelendirme yasağı). Unvan hesabı tamamlanan
  // kitap eşiğinden yapılır — bu iş Faz 6'ya bırakılmıştır.
  return "error";
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M9.7 16.8a1.1 1.1 0 0 1-.8-.3l-3.3-3.3a1.1 1.1 0 1 1 1.6-1.6l2.5 2.5 7.1-7.1a1.1 1.1 0 0 1 1.6 1.6l-7.9 7.9c-.2.2-.5.3-.8.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M7.2 5.8 12 10.6l4.8-4.8a1 1 0 0 1 1.4 1.4L13.4 12l4.8 4.8a1 1 0 0 1-1.4 1.4L12 13.4l-4.8 4.8a1 1 0 0 1-1.4-1.4l4.8-4.8-4.8-4.8a1 1 0 0 1 1.4-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

type AtlasAdemQuizProps = {
  activeQuestion: QuizQuestion;
  completion: CompletionResult;
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
  progress: number;
  questionIndex: number;
  questions: QuizQuestion[];
  saveError: string | null;
  saveState: FinalSaveState;
  score: number;
  selectedIsCorrect: boolean;
  selectedOption: QuizOption["id"] | null;
};

function AtlasAdemQuiz({
  activeQuestion,
  completion,
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
  progress,
  questionIndex,
  questions,
  saveError,
  saveState,
  score,
  selectedIsCorrect,
  selectedOption,
}: AtlasAdemQuizProps) {
  const currentStep = isFinished ? questions.length : questionIndex + 1;
  const isAlreadyCompleted = saveState === "already-completed";
  const isConfirmedCompletion = practiceMode || saveState === "saved" || isAlreadyCompleted;
  const isFirstCompletionSaved = !practiceMode && saveState === "saved";
  const isRetryableError = saveState === "retryable-error";
  const isMissingProfile = saveState === "missing-profile";
  const isIncompleteJourney = saveState === "incomplete-journey";
  const liveStatus = !isFinished
    ? `Soru ${questionIndex + 1} / ${questions.length}: ${activeQuestion.question}`
    : practiceMode || saveState === "saved"
      ? completion.headline
      : saveState === "already-completed"
        ? "Bu yolculuk zaten kayıtlı. İlk final sonucun değişmedi."
        : isMissingProfile
          ? "Çocuk profili bulunamadı. Bölüm rotasına dönebilirsin."
          : isIncompleteJourney
            ? "Final kaydı için önce bütün bölümleri tamamlamalısın."
          : isRetryableError
            ? "Final sonucun kaydedilemedi. Yeniden deneyebilirsin."
            : "Final sonucun kaydediliyor.";

  return (
    <main
      className={`tema-cocuk ${styles.page}`}
      data-book="adem"
      data-quiz-mode={practiceMode ? "practice" : "first-completion"}
    >
      <div className={styles.atlasBackdrop} aria-hidden="true">
        <div className={styles.stars} />
      </div>

      <div className={styles.quizShell}>
        <header className={styles.explorerBar}>
          <button
            type="button"
            className={styles.backLink}
            aria-label="Hz. Âdem bölüm rotasına dön"
            disabled={isSaving || isRetryableError}
            onClick={onBack}
          >
            <Ikon ad="geri" boyut={18} />
            <span className={styles.backLabel}>Bölüm Rotasına Dön</span>
          </button>

          <div className={styles.bookIdentity}>
            <span className={styles.bookMark} aria-hidden="true">
              <Ikon ad="madalya" boyut={21} />
            </span>
            <div>
              <span>Hz. Âdem · Yolculuğun sonu</span>
              <strong>Büyük Final Testi</strong>
            </div>
          </div>

          <div className={styles.headerStatus}>
            {practiceMode ? (
              <span className={styles.modeChip}>
                <Ikon ad="onay" boyut={15} /> Alıştırma
              </span>
            ) : null}
            <div className={styles.progressPill} aria-label={`Soru ${currentStep} / ${questions.length}`}>
              <span>Soru</span>
              <strong>{currentStep}/{questions.length}</strong>
            </div>
          </div>
        </header>

        <section className={styles.quizStage} aria-labelledby="adem-final-title">
          <div className={styles.stageContent}>
            <div className={styles.stageHeading}>
              <div>
                <p className={styles.stageKicker}>Final kapısı</p>
                <h1 id="adem-final-title">Büyük Final Testi</h1>
                <p className={styles.stageDescription}>
                  Bölümlerde keşfettiğin değerleri hatırla ve yolculuğunu tamamla.
                </p>
                {practiceMode ? (
                  <span className={styles.mobileModeChip}>
                    <Ikon ad="onay" boyut={14} /> Alıştırma · Yolculuk kaydın değişmez
                  </span>
                ) : null}
              </div>
              <div className={styles.compass} aria-hidden="true"><span>K</span></div>
            </div>

            <div className={styles.workspace}>
              <aside className={styles.journeyCard} aria-label="Final yolculuğu özeti">
                <div className={styles.medalPreview}>
                  <span className={styles.medalFrame}>
                    <OdulIkonu
                      tip="madalya"
                      anahtar="adem"
                      kazanildi={isConfirmedCompletion}
                      boyut={58}
                      alt="Hz. Âdem Yolculuk Madalyası"
                      className={styles.medalImage}
                    />
                  </span>
                  <small>{isConfirmedCompletion ? "Kazanılan madalya" : "Final ödülü"}</small>
                  <strong>Hz. Âdem Yolculuk Madalyası</strong>
                </div>
                <p className={styles.journeyMessage}>
                  {practiceMode || isAlreadyCompleted
                    ? (
                        <>
                          {isAlreadyCompleted
                            ? "Bu yolculuk zaten kayıtlı; ilk final sonucun ve "
                            : "Bilgilerini tazele; ilk final sonucun ve "}
                          <br className={styles.portraitMessageBreak} />
                          madalyan aynı kalır.
                        </>
                      )
                    : saveState === "saved"
                      ? "Final sonucun kaydedildi; madalyan artık keşif haritanda."
                    : "Her soruda bir değeri hatırla. Doğru sayısı madalyanın şartı değildir."}
                </p>
                <p className={styles.routeHeading}>Final rotası</p>
                <ol className={styles.routeSteps} aria-hidden="true">
                  {questions.map((question, index) => {
                    const routeState = isFinished || index < questionIndex
                      ? styles.routeDone
                      : index === questionIndex
                        ? styles.routeActive
                        : "";

                    return (
                      <li key={question.id} className={routeState}>
                        <i>{isFinished || index < questionIndex ? <Ikon ad="onay" boyut={14} /> : index + 1}</i>
                        <span>{index + 1}. soru</span>
                      </li>
                    );
                  })}
                </ol>
              </aside>

              <AnimatePresence mode="wait">
                {isFinished ? (
                  <motion.section
                    key="atlas-result"
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.34, ease: "easeOut" }}
                    className={`${styles.paperCard} ${styles.resultCard} ${practiceMode || isAlreadyCompleted ? styles.resultPractice : ""}`}
                    aria-labelledby="final-result-title"
                    aria-busy={!practiceMode && (saveState === "idle" || saveState === "saving")}
                  >
                    {isFirstCompletionSaved ? <Konfeti /> : null}
                    {!practiceMode && (saveState === "idle" || saveState === "saving") ? (
                      <div className={styles.resultInner}>
                        <span className={styles.resultStatusIcon}>
                          <Ikon ad="fener" boyut={32} />
                        </span>
                        <p className={styles.resultKicker}>Yolculuğun kaydediliyor</p>
                        <h2 id="final-result-title" className={styles.resultTitle}>
                          Madalyan hazırlanıyor…
                        </h2>
                        <p className={styles.resultMessage}>
                          Cevaplarını güvenle kaydediyoruz. Birazdan madalyanı birlikte açacağız.
                        </p>
                        <Buton
                          type="button"
                          varyant="eylem"
                          boyut="buyuk"
                          disabled
                          className={styles.resultAction}
                        >
                          Kaydediliyor…
                        </Buton>
                      </div>
                    ) : isRetryableError || isMissingProfile || isIncompleteJourney ? (
                      <div className={styles.resultInner}>
                        <span className={`${styles.resultStatusIcon} ${styles.resultStatusWarning}`}>
                          <Ikon ad="dusunce" boyut={32} />
                        </span>
                        <p className={styles.resultKicker}>
                          {isMissingProfile
                            ? "Çocuk profili gerekli"
                            : isIncompleteJourney
                              ? "Bölüm rotası tamamlanmalı"
                              : "Kayıt tamamlanamadı"}
                        </p>
                        <h2 id="final-result-title" className={styles.resultTitle}>
                          {isMissingProfile
                            ? "Profilini yeniden seçelim"
                            : isIncompleteJourney
                              ? "Önce bölümleri tamamlayalım"
                              : "Bir kez daha deneyelim"}
                        </h2>
                        <p className={styles.resultMessage}>
                          {isMissingProfile
                            ? "Cevapların bu ekranda duruyor; ilerlemeyi kaydetmek için bölüm rotasına dönüp çocuk profilini yeniden seçebilirsin."
                            : isIncompleteJourney
                              ? "Madalya, kitabın bütün bölümleri ve Büyük Final Testi tamamlandığında kazanılır. Bölüm rotasına dönüp kalan durakları tamamlayabilirsin."
                            : "Cevapların ve sonucun burada duruyor. İnternet bağlantını kontrol edip yeniden deneyebilirsin."}
                        </p>
                        {saveError ? (
                          <p id="final-save-error" className={styles.errorMessage}>
                            {saveError}
                          </p>
                        ) : null}
                        <div className={styles.resultActions}>
                          <Buton
                            type="button"
                            varyant="eylem"
                            boyut="buyuk"
                            aria-describedby={saveError ? "final-save-error" : undefined}
                            className={styles.resultAction}
                            onClick={onReturn}
                          >
                            {isMissingProfile || isIncompleteJourney
                              ? "Bölüm Rotasına Dön"
                              : "Tekrar Dene"}
                            <Ikon ad="ok-sag" boyut={18} />
                          </Buton>
                          {isRetryableError ? (
                            <Buton
                              type="button"
                              varyant="cerceve"
                              boyut="normal"
                              onClick={onReturnToBook}
                            >
                              Bölüm Rotasına Dön
                            </Buton>
                          ) : null}
                        </div>
                      </div>
                    ) : isAlreadyCompleted ? (
                      <div className={styles.resultInner}>
                        <div className={`${styles.resultMedal} ${styles.resultMedalPractice}`}>
                          <OdulIkonu
                            tip="madalya"
                            anahtar="adem"
                            boyut={124}
                            alt="Hz. Âdem Yolculuk Madalyası"
                            className={styles.resultImage}
                          />
                        </div>
                        <p className={styles.resultKicker}>Yolculuk zaten kayıtlı</p>
                        <h2 id="final-result-title" className={styles.resultTitle}>
                          {completion.madalya}
                        </h2>
                        <p className={styles.resultMessage}>
                          Bu madalya zaten senin. Bu tur ilk final sonucunu ve yolculuk kaydını değiştirmedi.
                        </p>
                        <p className={styles.scoreLine}>
                          {questions.length} sorunun {score} tanesini doğru cevapladın.
                        </p>
                        <Buton
                          type="button"
                          varyant="eylem"
                          boyut="buyuk"
                          className={styles.resultAction}
                          onClick={onReturn}
                        >
                          Bölüm Rotasına Dön <Ikon ad="ok-sag" boyut={18} />
                        </Buton>
                      </div>
                    ) : (
                      <div className={styles.resultInner}>
                        <motion.div
                          initial={{ rotate: -5, scale: 0.84 }}
                          animate={{ rotate: 0, scale: [0.84, 1.05, 1] }}
                          transition={{ duration: 0.48, ease: "easeOut" }}
                          className={`${styles.resultMedal} ${practiceMode ? styles.resultMedalPractice : ""}`}
                        >
                          <OdulIkonu
                            tip="madalya"
                            anahtar="adem"
                            boyut={124}
                            alt="Hz. Âdem Yolculuk Madalyası"
                            className={styles.resultImage}
                          />
                        </motion.div>
                        <p className={styles.resultKicker}>{completion.headline}</p>
                        <h2 id="final-result-title" className={styles.resultTitle}>
                          {completion.madalya}
                        </h2>
                        <p className={styles.resultMessage}>{completion.message}</p>
                        <p className={styles.scoreLine}>
                          {questions.length} sorunun {score} tanesini doğru cevapladın.
                        </p>
                        <p className={styles.resultNote}>
                          {practiceMode
                            ? "İlk final sonucun ve kazandığın madalya aynı kaldı."
                            : "Bu madalya keşif haritanda Hz. Âdem kitabının üzerinde parlayacak."}
                        </p>
                        <Buton
                          type="button"
                          varyant="eylem"
                          boyut="buyuk"
                          className={styles.resultAction}
                          onClick={onReturn}
                        >
                          {practiceMode ? "Bölüm Rotasına Dön" : "Haritaya Dön"}
                          <Ikon ad="ok-sag" boyut={18} />
                        </Buton>
                      </div>
                    )}
                  </motion.section>
                ) : (
                  <motion.section
                    key={`atlas-question-${activeQuestion.id}`}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -22 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className={styles.paperCard}
                    aria-labelledby={`atlas-question-title-${activeQuestion.id}`}
                  >
                    <div className={styles.questionMeta}>
                      <span className={styles.questionLabel}>
                        <Ikon ad="dusunce" boyut={17} /> Hatırlama durağı
                      </span>
                      <span className={styles.questionCount}>Soru {questionIndex + 1} / {questions.length}</span>
                    </div>
                    <div
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-label="Final testi ilerlemesi"
                      aria-valuemin={1}
                      aria-valuemax={questions.length}
                      aria-valuenow={questionIndex + 1}
                      aria-valuetext={`${questionIndex + 1} / ${questions.length} soru`}
                    >
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>

                    <h2
                      id={`atlas-question-title-${activeQuestion.id}`}
                      className={styles.questionTitle}
                    >
                      {activeQuestion.question}
                    </h2>

                    <div className={styles.optionList} aria-label="Cevap seçenekleri">
                      {activeQuestion.options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        const isCorrect = activeQuestion.correctOption === option.id;
                        const showCorrect = isChecked && isCorrect;
                        const showWrong = isChecked && isSelected && !isCorrect;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={isSelected}
                            aria-disabled={isChecked}
                            className={[
                              styles.optionButton,
                              isSelected ? styles.optionSelected : "",
                              showCorrect ? styles.optionCorrect : "",
                              showWrong ? styles.optionNeedsReview : "",
                            ].filter(Boolean).join(" ")}
                            onClick={() => {
                              if (!isChecked) onSelect(option.id);
                            }}
                          >
                            <span className={styles.optionLetter}>{option.id}</span>
                            <span className={styles.optionText}>{option.text}</span>
                            {showCorrect ? (
                              <span className={styles.answerMark} role="img" aria-label="Doğru cevap">
                                <CheckIcon />
                              </span>
                            ) : null}
                            {showWrong ? <span className={styles.choiceTag}>Senin seçimin</span> : null}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {isChecked ? (
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className={`${styles.feedback} ${selectedIsCorrect ? styles.feedbackCorrect : ""}`}
                          role="status"
                          aria-live="polite"
                        >
                          <span className={styles.feedbackIcon}>
                            <Ikon ad={selectedIsCorrect ? "onay" : "dusunce"} boyut={18} />
                          </span>
                          {selectedIsCorrect
                            ? "Harika! Doğru cevabı hatırladın."
                            : "Güzel deneme. Yeşil parlayan seçenek doğru cevaptı."}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    <div className={styles.actionBar}>
                      {!isChecked ? (
                        <Buton
                          type="button"
                          varyant="eylem"
                          boyut="buyuk"
                          disabled={!selectedOption}
                          className={styles.primaryButton}
                          onClick={onCheck}
                        >
                          Cevabı Kontrol Et <Ikon ad="onay" boyut={18} />
                        </Buton>
                      ) : (
                        <Buton
                          type="button"
                          varyant={questionIndex === questions.length - 1 ? "altin" : "eylem"}
                          boyut="buyuk"
                          className={styles.primaryButton}
                          onClick={onNext}
                        >
                          {questionIndex === questions.length - 1 ? "Sonucu Gör" : "Sonraki Soru"}
                          <Ikon ad="ok-sag" boyut={18} />
                        </Buton>
                      )}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {liveStatus}
      </p>
    </main>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId as keyof typeof quizConfig;
  const isAdemAtlas = bookId === "adem";
  const activeQuiz = quizConfig[bookId] ?? quizConfig.ebubekir;
  const questions = activeQuiz.questions;
  const [savedCompletionState, setSavedCompletionState] =
    useState<SavedCompletionState>("loading");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption["id"] | null>(
    null,
  );
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
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
  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);
  const completion = useMemo(
    () => getCompletionResult(score, questions.length, activeQuiz.label, practiceMode),
    [score, questions.length, activeQuiz.label, practiceMode],
  );

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

    setIsChecked(true);
  }

  function goNext() {
    if (nextClickLockedRef.current) return;
    nextClickLockedRef.current = true;

    if (questionIndex === questions.length - 1) {
      setIsFinished(true);
      if (!practiceMode) void persistFirstCompletion();
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedOption(null);
    setIsChecked(false);
  }

  async function persistFirstCompletion() {
    if (practiceMode || saveInFlightRef.current) return;
    setSaveError(null);
    const profileId = profileIdRef.current;

    if (!profileId) {
      setSaveState("missing-profile");
      setSaveError(
        "İlerlemeni kaydedebilmek için çocuk profili bulunamadı. Bölüm rotasına dönüp yeniden deneyebilirsin.",
      );
      return;
    }

    saveInFlightRef.current = true;
    setSaveState("saving");

    try {
      const saveResult = await saveQuizCompletionToSupabase({
        profileId,
        activeQuiz,
        madalya: completion.madalya,
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

  function returnToBookRoute() {
    if (saveInFlightRef.current || navigationInFlightRef.current) return;
    navigationInFlightRef.current = true;
    router.replace(`/kitap/${activeQuiz.storagePrefix}`);
  }

  if (savedCompletionState === "loading") {
    if (isAdemAtlas) {
      return (
        <main className={`tema-cocuk ${styles.page} ${styles.loadingPage}`}>
          <div className={styles.atlasBackdrop} aria-hidden="true">
            <div className={styles.stars} />
          </div>
          <div className={styles.loadingCard} role="status">
            <span className={styles.loadingIcon}><Ikon ad="fener" boyut={28} /></span>
            <p>Final yolculuğu hazırlanıyor…</p>
          </div>
        </main>
      );
    }

    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
        <p className="text-center text-lg font-bold text-amber-100" role="status">
          Final yolculuğu hazırlanıyor…
        </p>
      </main>
    );
  }

  if (isAdemAtlas) {
    return (
      <AtlasAdemQuiz
        activeQuestion={activeQuestion}
        completion={completion}
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
        progress={progress}
        questionIndex={questionIndex}
        questions={questions}
        saveError={saveError}
        saveState={saveState}
        score={score}
        selectedIsCorrect={selectedIsCorrect}
        selectedOption={selectedOption}
      />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.13),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.78))]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.72)_1px,transparent_1px),radial-gradient(rgba(251,191,36,0.38)_1px,transparent_1px)] [background-position:0_0,36px_54px] [background-size:78px_78px,112px_112px]" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              {activeQuiz.label}{practiceMode ? " · Alıştırma" : ""}
            </p>
            <h1 className="text-3xl font-black tracking-normal text-white sm:text-5xl">
              Büyük Final Testi
            </h1>
            {practiceMode ? (
              <p className="mt-2 text-sm font-semibold text-emerald-200">
                Bu tekrar ilerlemeni ve kazandığın madalyayı değiştirmez.
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-amber-300/30 bg-slate-900/70 px-4 py-3 text-amber-100">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200/80">
              İlerleme
            </p>
            <p className="mt-1 text-2xl font-black">
              {isFinished ? questions.length : questionIndex + 1}/{questions.length}
            </p>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-amber-300/35 bg-slate-900/85 p-6 text-center shadow-2xl shadow-amber-950/40 backdrop-blur sm:p-10"
            >
              {!practiceMode && saveState !== "saved" ? (
                <div
                  className="relative mx-auto grid max-w-xl justify-items-center py-8"
                  aria-busy={saveState === "idle" || saveState === "saving"}
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-amber-300/15 text-amber-200">
                    <Ikon ad={saveState === "idle" || saveState === "saving" ? "fener" : "dusunce"} boyut={32} />
                  </span>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-amber-200">
                    {saveState === "idle" || saveState === "saving"
                      ? "Yolculuğun kaydediliyor"
                      : saveState === "already-completed"
                        ? "Yolculuk zaten kayıtlı"
                        : saveState === "missing-profile"
                          ? "Çocuk profili gerekli"
                          : saveState === "incomplete-journey"
                            ? "Bölüm rotası tamamlanmalı"
                          : "Kayıt tamamlanamadı"}
                  </p>
                  <h2 className="mt-3 text-3xl font-black text-white">
                    {saveState === "idle" || saveState === "saving"
                      ? "Madalyan hazırlanıyor…"
                      : saveState === "already-completed"
                        ? "Bu madalya zaten senin"
                        : saveState === "missing-profile"
                          ? "Profilini yeniden seçelim"
                          : saveState === "incomplete-journey"
                            ? "Önce bölümleri tamamlayalım"
                          : "Bir kez daha deneyelim"}
                  </h2>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-300">
                    {saveState === "idle" || saveState === "saving"
                      ? "Cevaplarını güvenle kaydediyoruz."
                      : saveState === "already-completed"
                        ? "Bu tur ilk final sonucunu ve yolculuk kaydını değiştirmedi."
                        : saveState === "missing-profile"
                          ? "İlerlemeyi kaydetmek için bölüm rotasına dönüp çocuk profilini yeniden seçebilirsin."
                          : saveState === "incomplete-journey"
                            ? "Madalya için bölüm rotasındaki bütün durakları tamamlamalısın."
                          : "Cevapların burada duruyor. İnternet bağlantını kontrol edip yeniden deneyebilirsin."}
                  </p>
                  {saveError ? (
                    <p
                      id="final-save-error"
                      className="mt-4 rounded-2xl border border-red-300/35 bg-red-950/45 px-4 py-3 text-base font-bold leading-6 text-red-100"
                    >
                      {saveError}
                    </p>
                  ) : null}
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={returnFromResult}
                      disabled={saveState === "idle" || saveState === "saving"}
                      aria-describedby={saveError ? "final-save-error" : undefined}
                      className="rounded-full bg-emerald-400 px-7 py-4 text-lg font-black text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-70"
                    >
                      {saveState === "idle" || saveState === "saving"
                        ? "Kaydediliyor…"
                        : saveState === "retryable-error"
                          ? "Tekrar Dene"
                          : "Bölüm Rotasına Dön"}
                    </button>
                    {saveState === "retryable-error" ? (
                      <button
                        type="button"
                        onClick={returnToBookRoute}
                        className="rounded-full border border-slate-600 px-6 py-3 text-base font-black text-slate-200 transition hover:bg-slate-800"
                      >
                        Bölüm Rotasına Dön
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : (
                <>
                  {!practiceMode ? (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {confettiPieces.map((piece) => (
                        <motion.span
                          key={`${piece.left}-${piece.delay}`}
                          initial={{ y: -28, opacity: 0, rotate: 0 }}
                          animate={{ y: 280, opacity: [0, 1, 1, 0], rotate: piece.rotate }}
                          transition={{
                            duration: 1.4,
                            delay: piece.delay,
                            ease: "easeOut",
                            repeat: 1,
                            repeatDelay: 0.25,
                          }}
                          style={{ left: piece.left }}
                          className={`absolute top-0 h-4 w-2 rounded-sm ${piece.color}`}
                        />
                      ))}
                    </div>
                  ) : null}

                  <motion.div
                    initial={{ rotate: -6, scale: 0.82 }}
                    animate={{ rotate: 0, scale: [0.82, 1.06, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={[
                      "relative mx-auto mb-6 max-w-xl rounded-3xl border p-6 shadow-2xl",
                      completion.className,
                    ].join(" ")}
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">
                      🏅 {completion.headline}
                    </p>
                    <h2 className="mt-3 text-2xl font-black tracking-normal sm:text-3xl">
                      {completion.madalya}
                    </h2>
                    <p className="mt-4 text-lg font-semibold leading-8">
                      {completion.message}
                    </p>
                  </motion.div>

                  <p className="relative text-2xl font-black text-white">
                    {questions.length} sorunun {score} tanesini doğru cevapladın.
                  </p>
                  <p className="relative mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300">
                    {practiceMode
                      ? "İlk final sonucun ve kazandığın madalya aynı kaldı."
                      : `Bu madalya haritada ${activeQuiz.label} kartının üzerinde parlayacak.`}
                  </p>

                  <button
                    type="button"
                    onClick={returnFromResult}
                    className="relative mt-8 rounded-full bg-yellow-300 px-7 py-4 text-lg font-black text-slate-950 shadow-lg shadow-yellow-950/25 transition hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    {practiceMode ? "Bölüm Rotasına Dön" : "Haritaya Dön"}
                  </button>
                </>
              )}
            </motion.section>
          ) : (
            <motion.section
              key={activeQuestion.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl border border-amber-300/25 bg-slate-900/85 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-7"
            >
              <div className="mb-7">
                <div className="mb-3 flex items-center justify-between gap-4 text-sm font-bold text-slate-300">
                  <span>Soru {questionIndex + 1}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-200"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-black leading-tight tracking-normal text-white sm:text-4xl">
                {activeQuestion.question}
              </h2>

              <div className="mt-7 grid gap-3">
                {activeQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = activeQuestion.correctOption === option.id;
                  const showCorrect = isChecked && isCorrect;
                  const showWrong = isChecked && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={isChecked}
                      onClick={() => setSelectedOption(option.id)}
                      className={[
                        "flex min-h-16 items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left text-base font-bold leading-7 transition focus:outline-none focus:ring-2 focus:ring-amber-300 sm:text-lg",
                        showWrong
                          ? "border-rose-500 bg-rose-500/20 text-rose-50"
                          : showCorrect
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-50 shadow-lg shadow-emerald-950/25"
                            : isSelected
                              ? "border-amber-300 bg-amber-300/15 text-amber-50"
                              : "border-slate-700 bg-slate-950/55 text-slate-200 hover:border-amber-300/55 hover:bg-amber-300/10",
                      ].join(" ")}
                    >
                      <span>
                        <span className="mr-2 font-black uppercase text-amber-200">
                          {option.id})
                        </span>
                        {option.text}
                      </span>
                      {showCorrect ? (
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-400 text-emerald-950">
                          <CheckIcon />
                        </span>
                      ) : null}
                      {showWrong ? (
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-400 text-rose-950">
                          <XIcon />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isChecked ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={[
                      "mt-6 rounded-2xl border p-4 text-lg font-black",
                      selectedIsCorrect
                        ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-100"
                        : "border-amber-300/50 bg-amber-300/15 text-amber-100",
                    ].join(" ")}
                    aria-live="polite"
                  >
                    {selectedIsCorrect
                      ? "Harika! Doğru cevap."
                      : "Güzel deneme. Yeşil parlayan seçenek doğru cevaptı."}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                {!isChecked ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={checkAnswer}
                    className="rounded-full bg-amber-300 px-6 py-3 text-base font-black text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    Cevabı Kontrol Et
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full bg-emerald-400 px-6 py-3 text-base font-black text-emerald-950 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-300"
                  >
                    {questionIndex === questions.length - 1
                      ? "Sonucu Gör"
                      : "Sonraki Soru"}
                  </button>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <p className="sr-only" aria-live="polite">
        {!isFinished
          ? `Soru ${questionIndex + 1} / ${questions.length}: ${activeQuestion.question}`
          : practiceMode || saveState === "saved"
            ? completion.headline
            : saveState === "already-completed"
              ? "Bu yolculuk zaten kayıtlı. İlk final sonucun değişmedi."
              : saveState === "missing-profile"
                ? "Çocuk profili bulunamadı. Bölüm rotasına dönebilirsin."
                : saveState === "incomplete-journey"
                  ? "Final kaydı için önce bütün bölümleri tamamlamalısın."
                : saveState === "retryable-error"
                  ? "Final sonucun kaydedilemedi. Yeniden deneyebilirsin."
                  : "Final sonucun kaydediliyor."}
      </p>
    </main>
  );
}
