import type { BookContentBlock } from "../../data/books";
import type { ChapterData, ReadingSection } from "../../data/demoChapters";

export type OkumaGorseli = {
  src: string;
  alt: string;
  caption?: string;
};

export type OkumaSayfaModeli =
  | { key: string; type: "kapak" }
  | {
      key: string;
      type: "okuma";
      /** Bölüm içi ara başlık (yalnızca eski format demo bölümlerde) */
      altBaslik?: string;
      bloklar: BookContentBlock[];
      gorsel?: OkumaGorseli;
    }
  | { key: string; type: "karar" }
  | { key: string; type: "ogrendik" }
  | { key: string; type: "gorev" }
  | { key: string; type: "rozet" };

/**
 * Bir okuma sayfasına sığdırılacak yaklaşık karakter bütçesi.
 * Mockuptaki "başlık + 2-4 kısa paragraf" yoğunluğunu hedefler;
 * taşma durumunda metin sütunu kendi içinde kaydırılabilir kalır.
 */
const SAYFA_BUTCESI = 620;

function blokUzunlugu(block: BookContentBlock): number {
  if (block.type === "text") return block.text.length;
  if (block.type === "interactive_word") {
    return (
      (block.before?.length ?? 0) +
      block.word.length +
      (block.after?.length ?? 0)
    );
  }
  return 0;
}

/** books.ts içerik bloklarını karakter bütçesiyle sayfalara böler. */
function bloklariGrupla(
  blocks: BookContentBlock[],
  keyOneki: string,
): OkumaSayfaModeli[] {
  const sayfalar: OkumaSayfaModeli[] = [];
  let bekleyen: BookContentBlock[] = [];
  let gorsel: OkumaGorseli | undefined;
  let uzunluk = 0;

  const sayfayiKapat = () => {
    if (bekleyen.length === 0 && !gorsel) return;
    sayfalar.push({
      key: `${keyOneki}-${sayfalar.length}`,
      type: "okuma",
      bloklar: bekleyen,
      gorsel,
    });
    bekleyen = [];
    gorsel = undefined;
    uzunluk = 0;
  };

  for (const block of blocks) {
    if (block.type === "image") {
      // Görsel, kendisinden önce gelen metnin sayfasına eşlik eder;
      // sayfada zaten görsel varsa yeni sayfa açılır.
      if (gorsel) sayfayiKapat();
      gorsel = { src: block.src, alt: block.alt, caption: block.caption };
      continue;
    }

    const eklenecek = blokUzunlugu(block);
    if (bekleyen.length > 0 && uzunluk + eklenecek > SAYFA_BUTCESI) {
      sayfayiKapat();
    }
    bekleyen.push(block);
    uzunluk += eklenecek;
  }

  sayfayiKapat();
  return sayfalar;
}

/** Eski format (başlıklı bölümcükler) demo içeriğini sayfalara böler. */
function bolumcukleriGrupla(
  sections: ReadingSection[],
  keyOneki: string,
): OkumaSayfaModeli[] {
  const sayfalar: OkumaSayfaModeli[] = [];

  sections.forEach((section, sectionIndex) => {
    let bekleyen: BookContentBlock[] = [];
    let uzunluk = 0;
    let ilkSayfa = true;

    const sayfayiKapat = () => {
      if (bekleyen.length === 0) return;
      sayfalar.push({
        key: `${keyOneki}-${sectionIndex}-${sayfalar.length}`,
        type: "okuma",
        altBaslik: ilkSayfa ? section.title : undefined,
        bloklar: bekleyen,
      });
      ilkSayfa = false;
      bekleyen = [];
      uzunluk = 0;
    };

    for (const paragraph of section.paragraphs) {
      if (bekleyen.length > 0 && uzunluk + paragraph.length > SAYFA_BUTCESI) {
        sayfayiKapat();
      }
      bekleyen.push({ type: "text", text: paragraph });
      uzunluk += paragraph.length;
    }

    sayfayiKapat();
  });

  return sayfalar;
}

/**
 * Bölümün tüm okuma akışını sıralı sayfa listesine çevirir.
 * `sonucAcik` false iken karar sonrası sayfalar (sonuç, Ne Öğrendik,
 * Bugüne Taşı, Rozet Kapısı) listeye eklenmez — Sen Olsaydın kapısı kapalıdır.
 */
export function okumaSayfalariniOlustur(
  chapter: ChapterData,
  sonucAcik: boolean,
): OkumaSayfaModeli[] {
  const sayfalar: OkumaSayfaModeli[] = [{ key: "kapak", type: "kapak" }];

  if (chapter.contentBlocks) {
    sayfalar.push(...bloklariGrupla(chapter.contentBlocks, "icerik"));
  } else {
    sayfalar.push(...bolumcukleriGrupla(chapter.beforeDecision, "once"));
  }

  if (chapter.decision) {
    sayfalar.push({ key: "karar", type: "karar" });
  }

  if (sonucAcik) {
    sayfalar.push(...bolumcukleriGrupla(chapter.afterDecision, "sonra"));
    sayfalar.push({ key: "ogrendik", type: "ogrendik" });

    if (chapter.buguneTasi) {
      sayfalar.push({ key: "gorev", type: "gorev" });
    }

    sayfalar.push({ key: "rozet", type: "rozet" });
  }

  return sayfalar;
}
