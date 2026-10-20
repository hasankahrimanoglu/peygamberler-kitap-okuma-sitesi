// Gelişim Raporu türetmesi (saf). Faz 5 Etap 1'de Ana Sayfa rapor modalı,
// Etap 4'te tam sayfa rapor bu modülü ortak kullanır. Veri ParentDataProvider
// tarafından zaten çekildiği için burada ek Supabase sorgusu YOKTUR.

import {
  parentReportBooks,
  type ParentFaqItem,
  type ParentReportBook,
  type ParentReportVariant,
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
  /**
   * Kitap sonu veli özeti — "Sen Olsaydın" seçim oranından seçilen varyant (S5).
   * Seçim verisi yetersizse null: paragraf gösterilmez.
   */
  parentMessage: string | null;
  chatQuestions: string[];
  parentFaq: ParentFaqItem[];
};

/**
 * Okunan (başlanmış, finali bitmemiş) kitap — bölüm bölüm veli sohbeti
 * (PROJE-MODELI 4.1/19).
 */
export type ReadingAdventureReport = {
  bookKey: string;
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
  /** Bütün bölümler bitti, Büyük Final Testi kaldı. */
  finalPending: boolean;
  updatedAt: string | null;
  /**
   * Kitapta ulaşılan son bölüm: tamamlanan bölüm sayısından türer, kaydırma
   * konumuna bakmaz ("Kaldığın yer" değildir). Çocuğun seçtiği şık bilinçli
   * olarak taşınmaz.
   */
  lastChapter: {
    number: number;
    title: string;
    summary: string | null;
    question: string | null;
  };
  parentFaq: ParentFaqItem[];
};

export type CurrentAdventureHint = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
} | null;

export type ChildReport = {
  totalBadges: number;
  /** Okunan kitaplar, en son okunan önce. */
  readingAdventures: ReadingAdventureReport[];
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

/** Çocuğun bir bölümdeki ilk "Sen Olsaydın" seçimi (S5; `sen_olsaydin_secimleri`). */
export type SecimKaydi = { kitap_anahtari: string; dogru: boolean };

/**
 * Kitap sonu özet varyantı (PROJE-MODELI S5 notu): kayıtlı ilk seçimlerde
 * değeri yaşatan şıkkın oranı ≥%70 `high`, %40–70 `mixed`, <%40 `low`.
 * Kitabın bölümlerinin yarısından azında kayıt varsa null — veriye dayanmayan
 * gözlem yazılmaz. Oran ekranda hiçbir yerde gösterilmez.
 */
export function ozetVaryanti(
  secimler: SecimKaydi[],
  kitapAnahtari: string,
  bolumSayisi: number,
): ParentReportVariant | null {
  const kitabinkiler = secimler.filter((secim) => secim.kitap_anahtari === kitapAnahtari);
  if (kitabinkiler.length === 0 || kitabinkiler.length < Math.ceil(bolumSayisi / 2)) return null;
  const oran = kitabinkiler.filter((secim) => secim.dogru).length / kitabinkiler.length;
  if (oran >= 0.7) return "high";
  if (oran >= 0.4) return "mixed";
  return "low";
}

/** Rapor dili gözlem bildirir; metin içerik verisinden gelir, kod yalnız seçer. */
function kitapSonuOzeti(reportBook: ParentReportBook | undefined, varyant: ParentReportVariant | null) {
  if (!varyant) return null;
  return reportBook?.parent_summary_variants?.[varyant] ?? null;
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
  /** Çocuğun kayıtlı "Sen Olsaydın" seçimleri (S5); yoksa kitap sonu özeti çıkmaz. */
  secimler: SecimKaydi[] = [],
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
        parentMessage: kitapSonuOzeti(
          reportBook,
          ozetVaryanti(secimler, kitap.katalog.key, kitap.toplam),
        ),
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

  const readingAdventures = kaynaklar
    .filter(({ kitap }) => !kitap.bitti && kitap.tamamlanan > 0)
    .sort((first, second) => second.kitap.sonOkuma - first.kitap.sonOkuma)
    .map(({ kitap, reportBook }) => {
      const chapter = kitap.icerik.chapters[kitap.tamamlanan - 1];

      return {
        bookKey: kitap.katalog.key,
        bookTitle: kitap.katalog.title,
        completedCount: kitap.tamamlanan,
        totalChapters: kitap.toplam,
        finalPending: kitap.tamamlanan >= kitap.toplam,
        updatedAt: kitap.ilerleme?.updated_at ?? null,
        lastChapter: {
          number: kitap.tamamlanan,
          title: chapter.title.replace(/\s+/g, " ").trim(),
          summary: chapter.ozet ?? null,
          question: chapter.question?.prompt ?? null,
        },
        parentFaq: reportBook?.parent_faq ?? [],
      } satisfies ReadingAdventureReport;
    });

  const guncel = readingAdventures[0];

  return {
    totalBadges,
    readingAdventures,
    completedAdventures,
    currentAdventure: guncel
      ? {
          bookTitle: guncel.bookTitle,
          completedCount: guncel.completedCount,
          totalChapters: guncel.totalChapters,
        }
      : null,
  };
}
