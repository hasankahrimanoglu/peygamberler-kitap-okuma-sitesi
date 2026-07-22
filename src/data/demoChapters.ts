import type {
  BookContentBlock,
  BookIllustration,
  GorevTanimi,
} from "./books";
import { books, getBookChapterByRouteId } from "./books";

export type ReadingSection = {
  title: string;
  paragraphs: string[];
};

export type DecisionOption = {
  id: "a" | "b" | "c";
  text: string;
  feedback?: string;
  comparison?: string;
};

export type ChapterData = {
  id: string;
  bookKey?: "adem" | "sit";
  bookName?: string;
  chapterNumber?: number;
  totalChapters?: number;
  eyebrow: string;
  title: string;
  bolumAdi: string;
  ozet?: string;
  audioTitle: string;
  audioUrl?: string;
  decisionTitle: string;
  badgeName: string;
  coverIllustration?: BookIllustration;
  illustrationMode?: "sparse";
  returnMessage: string;
  contentBlocks?: BookContentBlock[];
  continuationBlocks?: BookContentBlock[];
  beforeDecision: ReadingSection[];
  decision?: {
    question: string;
    options: DecisionOption[];
    correctOption?: DecisionOption["id"];
    correctFeedback?: string;
    afterChoiceNote?: string;
  };
  afterDecision: ReadingSection[];
  learned: string[];
  buguneTasi?: string;
  gorev?: GorevTanimi;
  mapNote?: string;
};

type GlossaryEntry = { label: string; meaning: string };

// Eski demo kitapların bölüm verileri kaldırıldı. Bu küçük sözlük yalnız halen
// paylaşılan eski sayfa bileşenlerinin tip ve tasarım önizleme uyumu içindir.
export const glossary: Record<string, GlossaryEntry> = {
  emanet: {
    label: "Emanet",
    meaning: "Bize güvenilerek verilen ve özenle korumamız gereken şeydir.",
  },
};

export function resolveTerm(value: string): string | null {
  const normalized = value
    .toLocaleLowerCase("tr-TR")
    .replace(/[.,!?;:()“”\"']/g, "")
    .trim();

  return Object.keys(glossary).find((term) => term.toLocaleLowerCase("tr-TR") === normalized) ?? null;
}

export function adaptDataChapter(routeId: string): ChapterData | null {
  const result = getBookChapterByRouteId(routeId);
  if (!result) return null;

  const { book, chapter } = result;
  if (book.routePrefix !== "adem" && book.routePrefix !== "sit") return null;

  return {
    id: routeId,
    bookKey: book.routePrefix,
    bookName: book.title,
    chapterNumber: Number(chapter.id),
    totalChapters: book.chapters.length,
    eyebrow: book.eyebrow,
    title: `${chapter.id}. Bölüm - ${chapter.title}`,
    bolumAdi: chapter.title,
    ozet: chapter.ozet,
    audioTitle: chapter.audioUrl
      ? `${book.title} sesli anlatım`
      : `${book.title} Bölüm ${chapter.id} Sesli Anlatım`,
    audioUrl: chapter.audioUrl || undefined,
    decisionTitle: chapter.question?.title ?? chapter.title,
    badgeName: chapter.badgeName,
    coverIllustration: chapter.coverIllustration,
    illustrationMode: chapter.illustrationMode,
    returnMessage: `${chapter.badgeName} haritana işleniyor...`,
    contentBlocks: chapter.paragraphs,
    continuationBlocks: chapter.continuationParagraphs,
    beforeDecision: [],
    decision:
      chapter.has_question && chapter.question
        ? {
            question: chapter.question.prompt,
            options: chapter.question.options,
            correctOption: chapter.question.correctOption,
            correctFeedback: chapter.question.feedback,
            afterChoiceNote: chapter.question.afterChoiceNote,
          }
        : undefined,
    afterDecision: [],
    learned: chapter.learned,
    buguneTasi: chapter.buguneTasi,
    gorev: chapter.gorev,
  };
}

export function sonrakiBolumAdiniBul(chapter: ChapterData): string | null {
  const chapterNumber = chapter.chapterNumber ?? 1;
  const totalChapters = chapter.totalChapters ?? 1;
  if (chapterNumber >= totalChapters) return null;

  const book = books.find((item) => item.routePrefix === chapter.bookKey);
  return book?.chapters[chapterNumber]?.title ?? null;
}
