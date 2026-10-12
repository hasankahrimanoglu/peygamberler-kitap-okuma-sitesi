import type { BookContentBlock } from "../../data/books";
import type { ChapterData } from "../../data/demoChapters";

/**
 * Kaydırmalı okuma akışının segment modeli (KARAR 26 Tem 2026 — Faz 6.2).
 *
 * Karakter bütçesi YOKTUR. Bölüm sayfalara bölünmez; segmentler tek bir
 * kaydırma akışında alt alta durur. Sayfa bütçesini hesaplayan eski
 * `sayfalar.ts` ve onu kullanan sayfalı okuyucu 30 Tem 2026'da silindi; sayfa
 * metaforu geri getirilmeyecek.
 *
 * Faz B (12 Eki 2026, PROJE-MODELI 3.10.3): tam ekran bölüm kapağı yerine kısa
 * bir açılış bloğu gelir; segmentler çocuğa "durak" adıyla gösterilmez, adım
 * çubuğundaki altı adımdan birine bağlanır (`okumaAdimlari`).
 */
type Kisim = "birinci" | "devam";

export type OkumaAkisBolumu =
  | { key: "acilis"; type: "acilis" }
  | {
      key: string;
      type: "hikaye";
      /** Karar noktasının öncesi mi sonrası mı — adım çubuğu için. */
      kisim: Kisim;
      bloklar: BookContentBlock[];
    }
  | {
      key: string;
      type: "tanik";
      kisim: Kisim;
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

/**
 * Blok dizisini hikâye segmentlerine çevirir. Metin ve görsel blokları
 * BÖLÜNMEDEN tek segmentte akar; yalnızca Tanık Sayfası akışı keser, çünkü
 * kendi defter yüzeyinde tam genişlikte durur.
 */
function hikayeSegmentleri(blocks: BookContentBlock[], kisim: Kisim): OkumaAkisBolumu[] {
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
        kisim,
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
 * Akış: açılış → Hikâye 1. Kısım → Sen Olsaydın → [seçim yapılınca] Hikâyenin
 * devamı → Senin seçimin → Ne öğrendik? → (görev varsa) Bugüne Taşı → Rozet.
 * `sonucAcik` "seçim yapıldı" demektir — doğru şart DEĞİL.
 */
export function okumaAkisiniOlustur(chapter: ChapterData, sonucAcik: boolean): OkumaAkisBolumu[] {
  const akis: OkumaAkisBolumu[] = [{ key: "acilis", type: "acilis" }];

  if (chapter.contentBlocks?.length) {
    akis.push(...hikayeSegmentleri(chapter.contentBlocks, "birinci"));
  }

  if (chapter.decision) {
    akis.push({ key: "karar", type: "karar" });
  }

  if (!sonucAcik) return akis;

  if (chapter.continuationBlocks?.length) {
    akis.push(...hikayeSegmentleri(chapter.continuationBlocks, "devam"));
    if (chapter.decision) akis.push({ key: "karsilastirma", type: "karsilastirma" });
  }

  akis.push({ key: "ogrendik", type: "ogrendik" });

  if (chapter.gorev || chapter.buguneTasi) {
    akis.push({ key: "gorev", type: "gorev" });
  }

  akis.push({ key: "rozet", type: "rozet" });

  return akis;
}

/* ------------------------------------------------------------ ADIM ÇUBUĞU */

export type AdimId = "oku" | "sec" | "devam" | "ogren" | "gorev" | "rozet";

export type OkumaAdimi = {
  id: AdimId;
  /** Telefon ve tablet dikeydeki yatay çubuk: "Oku · Seç · Oku · Öğren · Görev · Rozet". */
  kisa: string;
  /** Tablet yatay ve masaüstündeki adım sütunu. */
  uzun: string;
  /** "Sen Olsaydın" kapısının arkasında mı (seçim onaylanmadan açılmaz). */
  kapiArkasinda: boolean;
};

/**
 * Bölümün adımları (PROJE-MODELI 3.10.3). Akıştan değil bölümün yapısından
 * türetilir: kapının arkasındaki adımlar seçim yapılmadan da çubukta görünür
 * (kilitli), ama içerikleri DOM'a girmez.
 */
export function okumaAdimlari(chapter: ChapterData): OkumaAdimi[] {
  const kararVar = Boolean(chapter.decision);
  const adimlar: OkumaAdimi[] = [{ id: "oku", kisa: "Oku", uzun: "Hikâye", kapiArkasinda: false }];

  if (kararVar) {
    adimlar.push({ id: "sec", kisa: "Seç", uzun: "Sen olsaydın?", kapiArkasinda: false });
    if (chapter.continuationBlocks?.length) {
      adimlar.push({ id: "devam", kisa: "Oku", uzun: "Hikâyenin devamı", kapiArkasinda: true });
    }
  }

  adimlar.push({ id: "ogren", kisa: "Öğren", uzun: "Ne öğrendik?", kapiArkasinda: kararVar });

  if (chapter.gorev || chapter.buguneTasi) {
    adimlar.push({ id: "gorev", kisa: "Görev", uzun: "Bugüne Taşı", kapiArkasinda: kararVar });
  }

  adimlar.push({ id: "rozet", kisa: "Rozet", uzun: "Rozet", kapiArkasinda: kararVar });
  return adimlar;
}

/**
 * Segmentin bağlı olduğu adım. "Senin seçimin" Öğren adımındadır: kaydırma
 * sırasında etkin adım geri sıçramasın diye (Seç → Oku → Seç olmasın).
 * Karar yoksa devam metni ilk okuma adımının parçasıdır.
 */
export function adimIdsi(bolum: OkumaAkisBolumu, kararVar: boolean): AdimId {
  switch (bolum.type) {
    case "acilis":
      return "oku";
    case "hikaye":
    case "tanik":
      return bolum.kisim === "devam" && kararVar ? "devam" : "oku";
    case "karar":
      return "sec";
    case "karsilastirma":
    case "ogrendik":
      return "ogren";
    case "gorev":
      return "gorev";
    case "rozet":
      return "rozet";
  }
}
