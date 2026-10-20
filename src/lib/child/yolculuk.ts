/**
 * Çocuk ana ekranının yolculuk modeli (KARAR 11–12 Eki 2026 — PROJE-MODELI 3.10).
 *
 * Saf fonksiyonlardır: Supabase satırlarını ve statik içeriği alır, ekranın
 * ihtiyaç duyduğu modeli döner. Harita artık kitapları elle tanımıyor —
 * `atlasCatalog.ts`'te `availability: "published"` olan ve `books.ts`'te içeriği
 * bulunan her kitap, katalog sırasıyla rotaya girer. Liste veli paneliyle
 * ortaktır (`derive.ts:yayindakiKitaplar`). Kitaplar arasında kilit yoktur
 * (3.10.2); kilit yalnız kitap içindeki bölümlerde ve finaldedir.
 */
import type { DurakRengi } from "../../data/atlasCatalog";
import { quizConfig } from "../../data/quizzes";
import {
  katalogKitaplari,
  UNVAN_ESIKLERI,
  unvanFromBookCount,
  yayindakiKitaplar,
  type DeriveBookRow,
  type DeriveProgressRow,
} from "../derive";

/** "Yeni" etiketi yayından sonra en fazla bu kadar gün görünür. */
export const YENI_GUN_SINIRI = 30;
const GUN_MS = 24 * 60 * 60 * 1000;

export type YolculukBolumu = {
  no: number;
  ad: string;
  rozetAdi: string;
  gorevVar: boolean;
  okumaYolu: string;
};

export type YolculukKitabi = {
  key: string;
  ad: string;
  altBaslik: string;
  aciklama?: string;
  bolumler: YolculukBolumu[];
  tamamlanan: number;
  bitti: boolean;
  basladi: boolean;
  yeni: boolean;
  /** Son okuma zamanı (ms) — yarım kalan kitaplardan en yenisini seçmek için. */
  sonOkuma: number;
  /** Final testi yoksa null (soruları henüz `quizzes.ts`'te değil). */
  finalYolu: string | null;
  madalyaAdi: string;
  /** Rota durağının bant rengi (katalogdaki `durakRengi`; boşsa mavi). */
  durakRengi: DurakRengi;
};

export type SiradakiAdim =
  | { tur: "bolum"; kitap: YolculukKitabi; bolum: YolculukBolumu }
  | { tur: "final"; kitap: YolculukKitabi; yol: string };

/** Yayındaki ve içeriği hazır kitaplar, katalog sırasıyla. */
export function yolculukKitaplari(
  dbKitaplar: DeriveBookRow[],
  ilerlemeler: DeriveProgressRow[],
  simdi = Date.now(),
): YolculukKitabi[] {
  return yayindakiKitaplar(dbKitaplar, ilerlemeler).map(
    ({ katalog, icerik, tamamlanan, bitti, sonOkuma }) => {
      const basladi = tamamlanan > 0 || bitti;
      const yayin = katalog.yayinTarihi ? Date.parse(katalog.yayinTarihi) : Number.NaN;

      return {
        key: katalog.key,
        ad: katalog.title,
        altBaslik: katalog.subtitle,
        aciklama: katalog.description,
        bolumler: icerik.chapters.map((bolum, sira) => ({
          no: sira + 1,
          ad: bolum.title.replace(/\s+/g, " ").trim(),
          rozetAdi: bolum.badgeName,
          gorevVar: Boolean(bolum.gorev),
          okumaYolu: `/reader/${icerik.routePrefix}-${bolum.id}`,
        })),
        tamamlanan,
        bitti,
        basladi,
        yeni: !basladi && Number.isFinite(yayin) && simdi - yayin < YENI_GUN_SINIRI * GUN_MS,
        sonOkuma,
        finalYolu: quizConfig[katalog.key] ? `/quiz/${katalog.key}` : null,
        madalyaAdi: `${katalog.title} Yolculuk Madalyası`,
        durakRengi: katalog.durakRengi ?? "mavi",
      };
    },
  );
}

function adimBul(kitap: YolculukKitabi): SiradakiAdim | null {
  if (kitap.bitti) return null;
  if (kitap.tamamlanan < kitap.bolumler.length) {
    return { tur: "bolum", kitap, bolum: kitap.bolumler[kitap.tamamlanan] };
  }
  return kitap.finalYolu ? { tur: "final", kitap, yol: kitap.finalYolu } : null;
}

/**
 * "Sıradaki bölümün" (3.10.1). Yarım bırakılan kitap varsa en son okunanın ilk
 * bitmemiş adımı; yoksa önerilen sıradaki ilk bitmemiş kitap. Kaydırma
 * konumuna bakmaz — kaldırılan "Kaldığın yer" değildir; bölüm daima baştan açılır.
 * Bütün kitaplar bittiyse null (yolun ucu).
 */
export function siradakiAdim(kitaplar: YolculukKitabi[]): SiradakiAdim | null {
  const yarimKalanlar = kitaplar
    .filter((kitap) => kitap.basladi && !kitap.bitti)
    .sort((a, b) => b.sonOkuma - a.sonOkuma);
  for (const kitap of [...yarimKalanlar, ...kitaplar]) {
    const adim = adimBul(kitap);
    if (adim) return adim;
  }
  return null;
}

export type BolumDurumu = "tamamlandi" | "sirada" | "kilitli";

export function bolumDurumu(kitap: YolculukKitabi, no: number): BolumDurumu {
  if (no <= kitap.tamamlanan) return "tamamlandi";
  return no === kitap.tamamlanan + 1 ? "sirada" : "kilitli";
}

export type FinalDurumu = "tamamlandi" | "acik" | "kilitli" | "hazirlaniyor";

export function finalDurumu(kitap: YolculukKitabi): FinalDurumu {
  if (kitap.bitti) return "tamamlandi";
  if (!kitap.finalYolu) return "hazirlaniyor";
  return kitap.tamamlanan >= kitap.bolumler.length ? "acik" : "kilitli";
}

/** Unvan ve bir sonraki eşik — profil kartı için (PROJE-MODELI Bölüm 2). */
export function unvanBilgisi(bitenKitap: number) {
  const sonraki = UNVAN_ESIKLERI.find((esik) => esik.kitap > bitenKitap);
  return {
    unvan: unvanFromBookCount(bitenKitap),
    sonraki: sonraki ? { unvan: sonraki.unvan, kalan: sonraki.kitap - bitenKitap } : null,
  };
}

/** "Yolun devamı hazırlanıyor" kartı: bekleyen kitap sayısı ve vitrin adları. */
export function yolunDevami(kitaplar: YolculukKitabi[]) {
  const yayinda = new Set(kitaplar.map((kitap) => kitap.key));
  const bekleyen = katalogKitaplari().filter((kitap) => !yayinda.has(kitap.key));
  const vitrin = bekleyen.filter((kitap) => kitap.vitrin).map((kitap) => kitap.title);
  return { sayi: bekleyen.length, vitrin, digerSayi: bekleyen.length - vitrin.length };
}
