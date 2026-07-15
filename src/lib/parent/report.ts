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
  unvan: string | null;
};

export type CompletedAdventureReport = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
  finalScore: number | null;
  totalQuestions: number;
  successRate: number | null;
  finalTitle: string | null;
  finalBadge: string | null;
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
  successRate,
  reportBook,
}: {
  childName: string;
  successRate: number | null;
  reportBook?: ParentReportBook;
}) {
  if (successRate === null) {
    return `${childName} bu macerayı tamamladı. Final testi puanı henüz kaydedilmemiş olsa da, kitabı bitirme emeği başlı başına çok kıymetli. Akşam ona yolculukta en çok hangi bölümü sevdiğini sorabilirsiniz.`;
  }

  if (successRate >= 80) {
    return (
      reportBook?.parent_summary ??
      `${childName} bu kitabı çok güçlü bir dikkatle tamamladı. Okuma emeğini fark ettirmek ve sevdiği bölümü konuşmak, bu güzel kazanımı daha da kalıcı hale getirebilir.`
    );
  }

  if (successRate >= 55) {
    return `${childName} bu uzun ve güzel kitabı büyük bir emekle tamamladı! Kıssanın genel duygusunu çok güzel yakaladı, final testindeki bazı detay sorularında ise o anki odaklanmasına bağlı küçük tatlı dalgınlıklar olmuş olabilir, bu çok normal. Akşam onunla kitapta en çok hangi bölümü sevdiğini konuşup bu güzel yolculuğu birlikte taçlandırmaya ne dersiniz?`;
  }

  return `${childName} bu uzun macerayı başarıyla bitirdi ve harika bir okuma gayreti gösterdi! Bir sonraki heyecanlı kitaba bir an önce geçmek için final testindeki soruları biraz hızlıca geçmiş veya o an sıkılıp sallamış olabilir, bu çok doğal. Önemli olan bu güzel kitabı keyifle bitirmiş olması.`;
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
      const successRate =
        normalizedFinalScore === null
          ? null
          : Math.round((normalizedFinalScore / totalQuestions) * 100);

      return {
        bookTitle: reportBook.title,
        completedCount,
        totalChapters,
        finalScore: normalizedFinalScore,
        totalQuestions,
        successRate,
        finalTitle: progress?.final_title ?? profile.unvan ?? null,
        finalBadge: progress?.final_badge ?? null,
        updatedAt: progress?.updated_at ?? null,
        parentMessage: getParentMessage({
          childName: profile.isim,
          successRate,
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
