import type { BookContentBlock } from "../../data/books";
import type { ChapterData } from "../../data/demoChapters";

/**
 * Kaydırmalı okuma akışının segment modeli (KARAR 26 Tem 2026 — Faz 6.2).
 *
 * Karakter bütçesi YOKTUR. Bölüm sayfalara bölünmez; her segment ekranda kendi
 * yüzeyiyle görünen bir "durak"tır ve hepsi tek bir kaydırma akışında alt alta
 * durur. Sayfa bütçesini hesaplayan eski `sayfalar.ts` ve onu kullanan sayfalı
 * okuyucu 30 Tem 2026'da silindi; sayfa metaforu geri getirilmeyecek.
 */
export type OkumaAkisBolumu =
  | { key: "kapak"; type: "kapak" }
  | {
      key: string;
      type: "hikaye";
      /** Karar noktasının öncesi mi sonrası mı — üst etiket ve scroll-spy için. */
      kisim: "birinci" | "devam";
      bloklar: BookContentBlock[];
    }
  | {
      key: string;
      type: "tanik";
      witnessName: string;
      witnessLabel: string;
      body: string;
      isFictional: boolean;
    }
  | { key: "karar"; type: "karar" }
  | { key: "karsilastirma"; type: "karsilastirma" }
  | { key: "ogrendik"; type: "ogrendik" }
  | { key: "gorev"; type: "gorev" }
  | { key: "rozet"; type: "rozet" };

export type AkisDurakId =
  | "kapak"
  | "hikaye"
  | "tanik"
  | "karar"
  | "devam"
  | "karsilastirma"
  | "ogrendik"
  | "gorev"
  | "rozet";

/**
 * Blok dizisini hikâye segmentlerine çevirir. Metin ve görsel blokları
 * BÖLÜNMEDEN tek segmentte akar; yalnızca Tanık Sayfası akışı keser, çünkü
 * kendi defter yüzeyinde tam genişlikte durur.
 */
function hikayeSegmentleri(
  blocks: BookContentBlock[],
  kisim: "birinci" | "devam",
): OkumaAkisBolumu[] {
  const segmentler: OkumaAkisBolumu[] = [];
  let bekleyen: BookContentBlock[] = [];

  const segmentiKapat = () => {
    if (bekleyen.length === 0) return;
    segmentler.push({
      key: `${kisim}-${segmentler.length}`,
      type: "hikaye",
      kisim,
      bloklar: bekleyen,
    });
    bekleyen = [];
  };

  for (const block of blocks) {
    if (block.type === "witness") {
      segmentiKapat();
      segmentler.push({
        key: `${kisim}-tanik-${segmentler.length}`,
        type: "tanik",
        witnessName: block.witnessName,
        witnessLabel: block.witnessLabel,
        body: block.body,
        isFictional: block.isFictional,
      });
      continue;
    }
    // Görsel bloğu akıştan ÇIKARILMAZ; books.ts'teki sırasıyla metnin arasında
    // kalır (sayfalı düzende ayrı bir `gorsel` slotuna taşınıyordu).
    bekleyen.push(block);
  }

  segmentiKapat();
  return segmentler;
}

/**
 * Bölümün tüm okuma akışını sıralı segment listesine çevirir.
 *
 * `sonucAcik` false iken karar sonrası segmentler listeye EKLENMEZ — böylece
 * devam metni, karşılaştırma ve rozet DOM'da hiç bulunmaz. Bulanıklaştırma veya
 * kilit görseliyle gizleme yapılmaz; içerik gerçekten yoktur (spoiler sızmaz).
 *
 * Akış: kapak → Hikâye 1. Kısım → Sen Olsaydın → [seçim yapılınca] Hikâye Devam
 * Ediyor → Seçimini Karşılaştır → Ne Öğrendik → (görev varsa) Bugüne Taşı →
 * Rozet Kapısı. `sonucAcik` "seçim yapıldı" demektir — doğru şart DEĞİL.
 */
export function okumaAkisiniOlustur(
  chapter: ChapterData,
  sonucAcik: boolean,
): OkumaAkisBolumu[] {
  const akis: OkumaAkisBolumu[] = [{ key: "kapak", type: "kapak" }];

  if (chapter.contentBlocks?.length) {
    akis.push(...hikayeSegmentleri(chapter.contentBlocks, "birinci"));
  }

  if (chapter.decision) {
    akis.push({ key: "karar", type: "karar" });
  }

  if (!sonucAcik) return akis;

  if (chapter.continuationBlocks?.length) {
    akis.push(...hikayeSegmentleri(chapter.continuationBlocks, "devam"));
    akis.push({ key: "karsilastirma", type: "karsilastirma" });
  }

  akis.push({ key: "ogrendik", type: "ogrendik" });

  if (chapter.gorev || chapter.buguneTasi) {
    akis.push({ key: "gorev", type: "gorev" });
  }

  akis.push({ key: "rozet", type: "rozet" });

  return akis;
}

/** Segmenti scroll-spy / durak göstergesindeki kimliğine çevirir. */
export function durakId(bolum: OkumaAkisBolumu): AkisDurakId {
  if (bolum.type === "hikaye") return bolum.kisim === "devam" ? "devam" : "hikaye";
  return bolum.type;
}
