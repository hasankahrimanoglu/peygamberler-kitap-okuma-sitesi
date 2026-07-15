"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { supabase } from "../../../lib/supabase";

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
): CompletionResult {
  const madalya = `${label} Yolculuk Madalyası`;
  const hepsiDogru = totalQuestions > 0 && score === totalQuestions;

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
    normalized.includes("final_badge") ||
    normalized.includes("column")
  );
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
}) {
  // PROJE-MODELI #13: Testi tamamlamak madalyayı kazandırır; doğru sayısı şart
  // DEĞİLDİR. Bu yüzden eski %90 skor eşiği kaldırıldı — çocuk testi bitirince
  // "bitti" durumu ve madalya her hâlükârda yazılır, sonraki kitap açılır.

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (booksError) {
    console.error("Kitap bilgisi okunamadı:", booksError.message);
    return;
  }

  const matchedBook = books?.find((book) => {
    const normalizedName = normalizeBookName(book.isim ?? "");
    return activeQuiz.keywords.some((keyword) => normalizedName.includes(keyword));
  });

  if (!matchedBook) {
    console.error(`${activeQuiz.label} için books tablosunda eşleşen kayıt yok.`);
    return;
  }

  const totalChapters = matchedBook.toplam_bolum || totalQuestions;
  const basePayload = {
    profile_id: profileId,
    book_id: matchedBook.id,
    tamamlanan_bolum_sayisi: totalChapters,
    yuzde: 100,
    bitti_mi: true,
    updated_at: new Date().toISOString(),
  };
  const richPayload = {
    ...basePayload,
    final_title: madalya,
    final_score: score,
    final_badge: `${activeQuiz.label} Yolculuk Madalyası`,
  };

  const { error: richProgressError } = await supabase
    .from("user_progress")
    .upsert(richPayload, { onConflict: "profile_id,book_id" });

  if (richProgressError && isMissingFinalProgressColumn(richProgressError.message)) {
    const { error: fallbackProgressError } = await supabase
      .from("user_progress")
      .upsert(basePayload, { onConflict: "profile_id,book_id" });

    if (fallbackProgressError) {
      console.error("Final testi kalıcı ilerleme kaydı yazılamadı:", fallbackProgressError.message);
      return;
    }
  } else if (richProgressError) {
    console.error("Final testi kalıcı ilerleme kaydı yazılamadı:", richProgressError.message);
    return;
  }

  // Unvan burada YAZILMAZ: unvan skora değil, tamamlanan kitap sayısına bağlıdır
  // (PROJE-MODELI Bölüm 2; puan/derecelendirme yasağı). Unvan hesabı tamamlanan
  // kitap eşiğinden yapılır — bu iş Faz 6'ya bırakılmıştır.
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

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId as keyof typeof quizConfig;
  const activeQuiz = quizConfig[bookId] ?? quizConfig.ebubekir;
  const questions = activeQuiz.questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption["id"] | null>(
    null,
  );
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const activeQuestion = questions[questionIndex];
  const selectedIsCorrect = selectedOption === activeQuestion.correctOption;
  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);
  const completion = useMemo(
    () => getCompletionResult(score, questions.length, activeQuiz.label),
    [score, questions.length, activeQuiz.label],
  );

  function checkAnswer() {
    if (!selectedOption || isChecked) return;

    if (selectedIsCorrect) {
      setScore((current) => current + 1);
    }

    setIsChecked(true);
  }

  function goNext() {
    if (questionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedOption(null);
    setIsChecked(false);
  }

  async function returnToMap() {
    const profileId = window.localStorage.getItem("selected_child_profile_id");

    if (profileId) {
      await saveQuizCompletionToSupabase({
        profileId,
        activeQuiz,
        madalya: completion.madalya,
        score,
        totalQuestions: questions.length,
      });
    }

    router.push(`/map?final=${activeQuiz.storagePrefix}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.13),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.78))]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.72)_1px,transparent_1px),radial-gradient(rgba(251,191,36,0.38)_1px,transparent_1px)] [background-position:0_0,36px_54px] [background-size:78px_78px,112px_112px]" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              {activeQuiz.label}
            </p>
            <h1 className="text-3xl font-black tracking-normal text-white sm:text-5xl">
              Büyük Final Testi
            </h1>
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
                Bu madalya haritada {activeQuiz.label} kartının üzerinde parlayacak.
              </p>

              <button
                type="button"
                onClick={returnToMap}
                className="relative mt-8 rounded-full bg-yellow-300 px-7 py-4 text-lg font-black text-slate-950 shadow-lg shadow-yellow-950/25 transition hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Haritaya Dön
              </button>
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
    </main>
  );
}
