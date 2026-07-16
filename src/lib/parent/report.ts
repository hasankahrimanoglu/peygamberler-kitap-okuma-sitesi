// Gelişim Raporu türetmesi (saf). Faz 5 Etap 1'de Ana Sayfa rapor modalı,
// Etap 4'te tam sayfa rapor bu modülü ortak kullanır. Veri ParentDataProvider
// tarafından zaten çekildiği için burada ek Supabase sorgusu YOKTUR.

import {
  parentReportBooks,
  type ParentFaqItem,
  type ParentReportBook,
} from "../../data/books";
import {
  normalizeBookName,
  type DeriveBookRow,
  type DeriveProgressRow,
} from "../derive";

export type ReportProfile = {
  isim: string;
};

export type CompletedAdventureReport = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
  finalScore: number | null;
  totalQuestions: number;
  /** Katalogdan türetilir; Supabase final_title/final_badge asla kullanılmaz (eski adlar sızmasın). */
  medalName: string;
  updatedAt: string | null;
  parentMessage: string;
  chatQuestions: string[];
  parentFaq: ParentFaqItem[];
};

export type CurrentAdventureHint = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
} | null;

export type ChildReport = {
  totalBadges: number;
  completedAdventures: CompletedAdventureReport[];
  currentAdventure: CurrentAdventureHint;
};

function findBookRowForReportBook(
  reportBook: ParentReportBook,
  books: DeriveBookRow[],
) {
  return books.find((book) => {
    const normalizedName = normalizeBookName(book.isim);
    return reportBook.keywords.some((keyword) => normalizedName.includes(keyword));
  });
}

export function formatReportDate(value: string | null) {
  if (!value) return "Tarih kaydı yok";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function getParentMessage({
  childName,
  reportBook,
}: {
  childName: string;
  reportBook?: ParentReportBook;
}) {
  // S5 (Sen Olsaydın cevap kaydı) gelene kadar mixed varyantı gösterilir.
  // Rapor dili gözlem bildirir; çocuğun davranışı hakkında tahmin yürütülmez.
  return (
    reportBook?.parent_summary_variants?.mixed ??
    reportBook?.parent_summary ??
    `${childName} bu kitabı tamamladı. Akşam ona yolculukta en çok hangi bölümü sevdiğini sorabilirsiniz.`
  );
}

export function getDefaultChatQuestions(childName: string) {
  return [
    `${childName} bu kitapta en çok hangi sahneyi sevmiş olabilir?`,
    "Bu hikayeden evde birlikte uygulayabileceğiniz küçük bir iyilik ne olabilir?",
  ];
}

/** Zaten çekilmiş ilerleme + kitap verisinden gelişim raporunu üretir. */
export function buildChildReport(
  profile: ReportProfile,
  progressRows: DeriveProgressRow[],
  books: DeriveBookRow[],
): ChildReport {
  const progressByBookId = new Map(
    progressRows.map((progress) => [progress.book_id, progress]),
  );

  const reportSources = parentReportBooks.map((reportBook) => {
    const matchedBook = findBookRowForReportBook(reportBook, books);
    return {
      reportBook,
      book: matchedBook,
      progress: matchedBook ? progressByBookId.get(matchedBook.id) : undefined,
    };
  });

  const totalBadges = reportSources.reduce((sum, source) => {
    const totalChapters =
      source.book?.toplam_bolum || source.reportBook.totalQuizQuestions || 1;
    const completedCount = Math.min(
      totalChapters,
      Math.max(0, source.progress?.tamamlanan_bolum_sayisi ?? 0),
    );
    return sum + completedCount;
  }, 0);

  const completedAdventures = reportSources
    .map(({ reportBook, book, progress }) => {
      const totalChapters = book?.toplam_bolum || reportBook.totalQuizQuestions || 1;
      const completedCount = Math.min(
        totalChapters,
        Math.max(0, progress?.tamamlanan_bolum_sayisi ?? 0),
      );
      const isFinished = Boolean(progress?.bitti_mi);

      if (!isFinished) return null;

      const totalQuestions =
        reportBook.totalQuizQuestions ||
        book?.toplam_bolum ||
        progress?.final_score ||
        1;
      const finalScore = Math.max(0, progress?.final_score ?? NaN);
      const normalizedFinalScore = Number.isFinite(finalScore) ? finalScore : null;

      return {
        bookTitle: reportBook.title,
        completedCount,
        totalChapters,
        finalScore: normalizedFinalScore,
        totalQuestions,
        medalName: `${reportBook.title} Yolculuk Madalyası`,
        updatedAt: progress?.updated_at ?? null,
        parentMessage: getParentMessage({
          childName: profile.isim,
          reportBook,
        }),
        chatQuestions: reportBook.chat_questions?.length
          ? reportBook.chat_questions
          : getDefaultChatQuestions(profile.isim),
        parentFaq: reportBook.parent_faq ?? [],
      } satisfies CompletedAdventureReport;
    })
    .filter((report): report is CompletedAdventureReport => report !== null)
    .sort((first, second) => {
      const firstDate = first.updatedAt ? new Date(first.updatedAt).getTime() : 0;
      const secondDate = second.updatedAt ? new Date(second.updatedAt).getTime() : 0;
      return secondDate - firstDate;
    });

  const currentProgress = reportSources
    .map(({ reportBook, book, progress }) => {
      const totalChapters = book?.toplam_bolum || reportBook.totalQuizQuestions || 1;
      const completedCount = Math.min(
        totalChapters,
        Math.max(0, progress?.tamamlanan_bolum_sayisi ?? 0),
      );
      const isFinished = Boolean(progress?.bitti_mi);

      if (isFinished || completedCount <= 0) return null;

      return {
        bookTitle: reportBook.title,
        completedCount,
        totalChapters,
        updatedAt: progress?.updated_at ?? null,
      };
    })
    .filter(
      (item): item is CurrentAdventureHint & { updatedAt: string | null } =>
        item !== null,
    )
    .sort((first, second) => {
      const firstDate = first.updatedAt ? new Date(first.updatedAt).getTime() : 0;
      const secondDate = second.updatedAt ? new Date(second.updatedAt).getTime() : 0;
      return secondDate - firstDate;
    })[0];

  return {
    totalBadges,
    completedAdventures,
    currentAdventure: currentProgress
      ? {
          bookTitle: currentProgress.bookTitle,
          completedCount: currentProgress.completedCount,
          totalChapters: currentProgress.totalChapters,
        }
      : null,
  };
}
