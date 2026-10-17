// Gelişim Raporu türetmesi (saf). Faz 5 Etap 1'de Ana Sayfa rapor modalı,
// Etap 4'te tam sayfa rapor bu modülü ortak kullanır. Veri ParentDataProvider
// tarafından zaten çekildiği için burada ek Supabase sorgusu YOKTUR.

import {
  parentReportBooks,
  type ParentFaqItem,
  type ParentReportBook,
} from "../../data/books";
import {
  yayindakiKitaplar,
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

/**
 * Zaten çekilmiş ilerleme + kitap verisinden gelişim raporunu üretir.
 * Kitaplar katalogdan gelir (yalnız yayındakiler, `derive.ts:yayindakiKitaplar`);
 * veli metinleri kitaba katalog anahtarıyla bağlanır (`parentReportBooks[].key`).
 */
export function buildChildReport(
  profile: ReportProfile,
  progressRows: DeriveProgressRow[],
  books: DeriveBookRow[],
): ChildReport {
  const kaynaklar = yayindakiKitaplar(books, progressRows).map((kitap) => ({
    kitap,
    reportBook: parentReportBooks.find((rapor) => rapor.key === kitap.katalog.key),
  }));

  const totalBadges = kaynaklar.reduce((sum, { kitap }) => sum + kitap.tamamlanan, 0);

  const completedAdventures = kaynaklar
    .filter(({ kitap }) => kitap.bitti)
    .map(({ kitap, reportBook }) => {
      const finalScore = Math.max(0, kitap.ilerleme?.final_score ?? NaN);

      return {
        bookTitle: kitap.katalog.title,
        completedCount: kitap.tamamlanan,
        totalChapters: kitap.toplam,
        finalScore: Number.isFinite(finalScore) ? finalScore : null,
        // Final testinde her bölümden tam bir soru vardır (içerik brifi §9).
        totalQuestions: reportBook?.totalQuizQuestions || kitap.toplam,
        medalName: `${kitap.katalog.title} Yolculuk Madalyası`,
        updatedAt: kitap.ilerleme?.updated_at ?? null,
        parentMessage: getParentMessage({
          childName: profile.isim,
          reportBook,
        }),
        chatQuestions: reportBook?.chat_questions?.length
          ? reportBook.chat_questions
          : getDefaultChatQuestions(profile.isim),
        parentFaq: reportBook?.parent_faq ?? [],
      } satisfies CompletedAdventureReport;
    })
    .sort((first, second) => {
      const firstDate = first.updatedAt ? new Date(first.updatedAt).getTime() : 0;
      const secondDate = second.updatedAt ? new Date(second.updatedAt).getTime() : 0;
      return secondDate - firstDate;
    });

  const guncel = kaynaklar
    .filter(({ kitap }) => !kitap.bitti && kitap.tamamlanan > 0)
    .sort((first, second) => second.kitap.sonOkuma - first.kitap.sonOkuma)[0];

  return {
    totalBadges,
    completedAdventures,
    currentAdventure: guncel
      ? {
          bookTitle: guncel.kitap.katalog.title,
          completedCount: guncel.kitap.tamamlanan,
          totalChapters: guncel.kitap.toplam,
        }
      : null,
  };
}
