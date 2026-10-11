/**
 * Çocuk ana ekranının yolculuk modeli (KARAR 11–12 Eki 2026 — PROJE-MODELI 3.10).
 *
 * Saf fonksiyonlardır: Supabase satırlarını ve statik içeriği alır, ekranın
 * ihtiyaç duyduğu modeli döner. Harita artık kitapları elle tanımıyor —
 * `atlasCatalog.ts`'te `availability: "published"` olan ve `books.ts`'te içeriği
 * bulunan her kitap, katalog sırasıyla rotaya girer. Kitaplar arasında kilit
 * yoktur (3.10.2); kilit yalnız kitap içindeki bölümlerde ve finaldedir.
 */
import { atlasRegions, type AtlasCatalogBook } from "../../data/atlasCatalog";
import { books as kitapIcerikleri } from "../../data/books";
import { quizConfig } from "../../data/quizzes";
import {
  normalizeBookName,
  UNVAN_ESIKLERI,
  unvanFromBookCount,
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
};

export type SiradakiAdim =
  | { tur: "bolum"; kitap: YolculukKitabi; bolum: YolculukBolumu }
  | { tur: "final"; kitap: YolculukKitabi; yol: string };

function kelimeler(metin: string) {
  return normalizeBookName(metin)
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((kelime) => kelime && kelime !== "hz");
}

/**
 * Katalogdaki kitabın Supabase `books` satırı. Kelime kümesiyle eşleşir:
 * "ali" anahtarı "Hz. Sâlih" içinde geçtiği için alt dize eşleşmesi ileride
 * yanlış kitabı bulurdu.
 */
export function dbKitabiBul<T extends { isim: string | null }>(
  satirlar: T[],
  baslik: string,
  anahtar?: string,
): T | undefined {
  const hedef = kelimeler(baslik);
  const tam = satirlar.find((satir) => {
    const ad = new Set(kelimeler(satir.isim ?? ""));
    return hedef.length > 0 && hedef.every((kelime) => ad.has(kelime));
  });
  if (tam || !anahtar) return tam;
  return satirlar.find((satir) => kelimeler(satir.isim ?? "").includes(anahtar));
}

function katalogKitaplari(): AtlasCatalogBook[] {
  return atlasRegions
    .flatMap((bolge) => bolge.books)
    .sort((a, b) => a.order - b.order);
}

/**
 * Supabase `books` satırlarından yalnız yayındaki (ve içeriği hazır) kitaplara
 * ait olanlar. Veritabanında Temmuz 2026 demolarından kalan ilerleme kayıtları
 * var (Hz. Nûh, halife demoları); bunlar sayılınca Ödüllerim sayfası ana
 * ekrandan farklı madalya ve unvan gösteriyordu. Çocuk tarafı yalnız bu
 * listeyle çalışır.
 */
export function yayindakiDbKitaplari<T extends { isim: string | null }>(satirlar: T[]): T[] {
  const yayindakiler = katalogKitaplari().filter(
    (kitap) =>
      kitap.availability === "published" &&
      kitapIcerikleri.some((icerik) => icerik.routePrefix === kitap.key),
  );
  return satirlar.filter((satir) =>
    yayindakiler.some((kitap) => dbKitabiBul([satir], kitap.title, kitap.key)),
  );
}

/** Yayındaki ve içeriği hazır kitaplar, katalog sırasıyla. */
export function yolculukKitaplari(
  dbKitaplar: DeriveBookRow[],
  ilerlemeler: DeriveProgressRow[],
  simdi = Date.now(),
): YolculukKitabi[] {
  const sonuc: YolculukKitabi[] = [];

  for (const katalog of katalogKitaplari()) {
    if (katalog.availability !== "published") continue;
    const icerik = kitapIcerikleri.find((kitap) => kitap.routePrefix === katalog.key);
    if (!icerik) continue;

    const db = dbKitabiBul(dbKitaplar, katalog.title, katalog.key);
    const satir = db ? ilerlemeler.find((ilerleme) => ilerleme.book_id === db.id) : undefined;
    const toplam = icerik.chapters.length;
    const tamamlanan = Math.min(toplam, Math.max(0, satir?.tamamlanan_bolum_sayisi ?? 0));
    const bitti = Boolean(satir?.bitti_mi);
    const basladi = tamamlanan > 0 || bitti;
    const yayin = katalog.yayinTarihi ? Date.parse(katalog.yayinTarihi) : Number.NaN;

    sonuc.push({
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
      sonOkuma: satir?.updated_at ? Date.parse(satir.updated_at) : 0,
      finalYolu: quizConfig[katalog.key] ? `/quiz/${katalog.key}` : null,
      madalyaAdi: `${katalog.title} Yolculuk Madalyası`,
    });
  }

  return sonuc;
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
