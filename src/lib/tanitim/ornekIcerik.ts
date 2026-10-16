import { books, parentReportBooks, type GorevTanimi } from "../../data/books";

/**
 * Tanıtım sayfasındaki örnekler UYDURULMAZ: gerçek kitap verisinden okunur
 * (sözlük kelimesi, görev, rozet adı, veli raporu cümlesi). İçerik değişirse
 * tanıtım da kendiliğinden güncellenir. Yalnız sunucu bileşenlerinde
 * kullanılır; `books.ts` istemci paketine girmez.
 *
 * Aranan öğe bulunamazsa `null`/boş döner ve ilgili parça hiç çizilmez.
 */

function bolum(kitapAnahtari: string, bolumNo: number) {
  return books
    .find((kitap) => kitap.routePrefix === kitapAnahtari)
    ?.chapters.find((chapter) => chapter.id === String(bolumNo));
}

export type SozlukOrnegiVerisi = { once: string; kelime: string; anlam: string; sonra: string };

export function sozlukOrnegi(kitapAnahtari: string, bolumNo: number, kelime: string): SozlukOrnegiVerisi | null {
  for (const blok of bolum(kitapAnahtari, bolumNo)?.paragraphs ?? []) {
    if (blok.type === "interactive_word" && blok.word === kelime) {
      return { once: blok.before ?? "", kelime: blok.word, anlam: blok.meaning, sonra: blok.after ?? "" };
    }
  }
  return null;
}

export function bolumOrnegi(kitapAnahtari: string, bolumNo: number) {
  const veri = bolum(kitapAnahtari, bolumNo);
  if (!veri) return null;
  return {
    baslik: veri.title.replace(/\s+/g, " ").trim(),
    rozetAdi: veri.badgeName,
    ogrendiklerimiz: veri.learned.slice(0, 3),
    gorev: (veri.gorev ?? null) as GorevTanimi | null,
  };
}

export function veliRaporuOrnegi(kitapAnahtari: string) {
  const rapor = parentReportBooks.find((kayit) => kayit.key === kitapAnahtari);
  if (!rapor) return null;
  const ozet = rapor.parent_summary_variants?.mixed ?? rapor.parent_summary;
  return {
    kitap: rapor.title,
    // Kartta yalnız ilk cümle: raporun tonunu göstermeye yeter. "Hz." gibi
    // kısaltmalarda bölünmez.
    ozet: ozet.split(/(?<!\bHz\.)(?<=[.!?])\s+/)[0],
    sohbetSorusu: rapor.chat_questions[0] ?? null,
  };
}
