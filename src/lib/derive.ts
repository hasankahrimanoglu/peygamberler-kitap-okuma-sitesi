// Veli paneli ve çocuk ekranları için ortak türetme katmanı.
// PROJE-MODELI.md Bölüm 7.2: kavramlar tablo GEREKTİRMEZ — hepsi katalog
// (atlasCatalog.ts) + içerik (books.ts) + user_progress birleşiminden türetilir.
// Hangi kitapların var olduğunu katalog ve içerik söyler; Supabase `books`
// satırı yalnız ilerleme kaydının anahtarıdır (adı aksansız olabilir, yayında
// olmayan eski demo satırları da durur).
// Buradaki fonksiyonlar SAF'tır (Supabase'e bağlı değil); veri sayfa/provider
// tarafından çekilip bu fonksiyonlara verilir.

import { atlasRegions, type AtlasCatalogBook } from "../data/atlasCatalog";
import { books as bookDefs, type BookDefinition } from "../data/books";

// --- Supabase satır tipleri (türetme girdisi) ---
export type DeriveProgressRow = {
  book_id: string;
  tamamlanan_bolum_sayisi: number | null;
  yuzde: number | null;
  bitti_mi: boolean | null;
  final_title?: string | null;
  final_badge?: string | null;
  final_score?: number | null;
  updated_at?: string | null;
};

export type DeriveBookRow = {
  id: string;
  isim: string;
  toplam_bolum: number | null;
  sira?: number | null;
};

// --- Metin yardımcıları ---

/** Türkçe adları eşleştirme için normalize eder (küçük harf + aksan sadeleştirme). */
export function normalizeBookName(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
}

export function clampProgress(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

// --- Unvan (PROJE-MODELI.md Bölüm 2 — kitap sayısına bağlı, puan YOK) ---

// Eşikler 35 kitaplık ilk katalog omurgasına göre ayarlandı
// (KITAP-KATALOGU-VE-URETIM-PLANI.md). Yayına girecek kitap sayısı
// netleştiğinde tablo yeniden gözden geçirilir. Artan sırada tutulmalıdır.
export const UNVAN_ESIKLERI: { kitap: number; unvan: string }[] = [
  { kitap: 0, unvan: "Yeni Gezgin" },
  { kitap: 1, unvan: "Yol Kaşifi" },
  { kitap: 3, unvan: "Değer Toplayıcısı" },
  { kitap: 6, unvan: "Yol Arkadaşı" },
  { kitap: 10, unvan: "Bilge Yolcu" },
  { kitap: 15, unvan: "Hikâye Ustası" },
  { kitap: 20, unvan: "Emanet Koruyucusu" },
  { kitap: 25, unvan: "Işık Taşıyıcısı" },
  { kitap: 30, unvan: "Kıssa Rehberi" },
  { kitap: 35, unvan: "Büyük Yolculuk Kaşifi" },
];

/** Unvan yalnız UNVAN_ESIKLERI'nden türetilir; eşikler tek kaynaktan yönetilir. */
export function unvanFromBookCount(completedBookCount: number) {
  let sonuc = UNVAN_ESIKLERI[0].unvan;
  for (const esik of UNVAN_ESIKLERI) {
    if (completedBookCount >= esik.kitap) sonuc = esik.unvan;
  }
  return sonuc;
}

export function unvanAnahtari(unvan: string) {
  return normalizeBookName(unvan).replaceAll(" ", "-");
}

// --- Kitap kataloğu: hangi kitaplar var (tek kaynak) ---

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

/** Katalogdaki bütün kitaplar (yayında olmayanlar dahil), katalog sırasıyla. */
export function katalogKitaplari(): AtlasCatalogBook[] {
  return atlasRegions
    .flatMap((bolge) => bolge.books)
    .sort((a, b) => a.order - b.order);
}

type YayindakiKatalogKitabi = { katalog: AtlasCatalogBook; icerik: BookDefinition };

/** Katalogda `published` olan ve `books.ts`'te içeriği bulunan kitaplar. */
function yayindakiKatalog(): YayindakiKatalogKitabi[] {
  return katalogKitaplari().flatMap((katalog) => {
    if (katalog.availability !== "published") return [];
    const icerik = bookDefs.find((kitap) => kitap.routePrefix === katalog.key);
    return icerik ? [{ katalog, icerik }] : [];
  });
}

/**
 * Supabase `books` satırlarından yalnız yayındaki (ve içeriği hazır) kitaplara
 * ait olanlar. Veritabanında Temmuz 2026 demolarından kalan satırlar var
 * (Hz. Ebû Bekir, Hz. Ömer, Hz. Osman); bunlar sayılınca ekranlar birbirinden
 * farklı kitap, madalya ve unvan gösteriyordu. Çocuk tarafı ve veli paneli
 * yalnız bu listeyle çalışır.
 */
export function yayindakiDbKitaplari<T extends { isim: string | null }>(satirlar: T[]): T[] {
  const yayindakiler = yayindakiKatalog();
  return satirlar.filter((satir) =>
    yayindakiler.some(({ katalog }) => dbKitabiBul([satir], katalog.title, katalog.key)),
  );
}

export type YayindakiKitap = YayindakiKatalogKitabi & {
  /** Supabase `books` satırı; yoksa ilerleme kaydedilemez ama kitap yine listelenir. */
  db: DeriveBookRow | undefined;
  ilerleme: DeriveProgressRow | undefined;
  /** Bölüm sayısı içerikten gelir (veritabanındaki `toplam_bolum` onun kopyasıdır). */
  toplam: number;
  tamamlanan: number;
  bitti: boolean;
  /** Son okuma zamanı (ms); kayıt yoksa 0. */
  sonOkuma: number;
};

/**
 * Yayındaki ve içeriği hazır kitaplar, ilerlemeleriyle ve katalog sırasıyla.
 * Çocuk ana ekranı (`yolculukKitaplari`) ve veli paneli bu listeden türer;
 * katalogda yayına alınan kitap iki tarafa da kendiliğinden girer, elle
 * tutulan ikinci bir kitap listesi yoktur.
 */
export function yayindakiKitaplar(
  dbKitaplar: DeriveBookRow[],
  ilerlemeler: DeriveProgressRow[],
): YayindakiKitap[] {
  return yayindakiKatalog().map(({ katalog, icerik }) => {
    const db = dbKitabiBul(dbKitaplar, katalog.title, katalog.key);
    const ilerleme = db ? ilerlemeler.find((satir) => satir.book_id === db.id) : undefined;
    const toplam = icerik.chapters.length;
    return {
      katalog,
      icerik,
      db,
      ilerleme,
      toplam,
      tamamlanan: Math.min(toplam, Math.max(0, ilerleme?.tamamlanan_bolum_sayisi ?? 0)),
      bitti: Boolean(ilerleme?.bitti_mi),
      sonOkuma: ilerleme?.updated_at ? Date.parse(ilerleme.updated_at) : 0,
    };
  });
}

/** Kitaba başlandı mı — çocuk ana ekranıyla aynı tanım. */
function basladiMi(kitap: YayindakiKitap) {
  return kitap.tamamlanan > 0 || kitap.bitti;
}

/** İlerleme yüzdesi tamamlanan bölümden hesaplanır (okuma ekranı da öyle yazar). */
function ilerlemeYuzdesi(kitap: YayindakiKitap) {
  return clampProgress((kitap.tamamlanan / kitap.toplam) * 100);
}

// --- Görsel anahtarları ---

/**
 * Rozet dosya anahtarı: ("adem", 1) → "hz-adem/bolum-1"
 * → /rozetler/hz-adem/bolum-1.png (PROJE-MODELI 6.1, 27 Tem 2026 klasör düzeni;
 * uzantı 7 Ağu 2026'da PNG'ye alındı).
 */
export function rozetIconKey(bookKey: string, chapterNo: number) {
  return `hz-${bookKey}/bolum-${chapterNo}`;
}

/** Madalya dosya anahtarı: "adem" → "hz-adem" → /madalyalar/hz-adem.png */
export function madalyaIconKey(bookKey: string) {
  return `hz-${bookKey}`;
}

// --- Ödüller vitrini (rozet / madalya / unvan) ---

export type RozetOgesi = {
  bookKey: string;
  bookIsim: string;
  bolumNo: number;
  ad: string;
  iconKey: string;
  kazanildi: boolean;
};

export type MadalyaOgesi = {
  bookKey: string;
  bookIsim: string;
  ad: string;
  iconKey: string;
  kazanildi: boolean;
};

export type UnvanOgesi = {
  unvan: string;
  iconKey: string;
  kitapEsik: number;
  kazanildi: boolean;
  guncelMi: boolean;
};

/** Yayındaki kitapların bölüm rozetleri; kazanılmış olanlar işaretli (PROJE-MODELI 7.2). */
export function rozetVitrini(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): RozetOgesi[] {
  return yayindakiKitaplar(bookRows, progressRows).flatMap((kitap) =>
    kitap.icerik.chapters.map((bolum, index) => ({
      bookKey: kitap.katalog.key,
      bookIsim: kitap.katalog.title,
      bolumNo: index + 1,
      ad: bolum.badgeName,
      iconKey: rozetIconKey(kitap.katalog.key, index + 1),
      kazanildi: kitap.tamamlanan >= index + 1,
    })),
  );
}

/** Kitap madalyaları; madalya kitabın finali bitince kazanılır (bitti_mi). */
export function madalyaVitrini(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): MadalyaOgesi[] {
  return yayindakiKitaplar(bookRows, progressRows).map((kitap) => ({
    bookKey: kitap.katalog.key,
    bookIsim: kitap.katalog.title,
    // Ad her zaman katalogdan türetilir; Supabase final_title/final_badge
    // eski sürümden kalan adları ("Altın Yol Arkadaşı" gibi) taşıyabilir.
    ad: `${kitap.katalog.title} Yolculuk Madalyası`,
    iconKey: madalyaIconKey(kitap.katalog.key),
    kazanildi: kitap.bitti,
  }));
}

/** Unvan eşik tablosu; tamamlanan kitap sayısına göre kazanım (PROJE-MODELI 2). */
export function unvanVitrini(completedBookCount: number): UnvanOgesi[] {
  const guncel = unvanFromBookCount(completedBookCount);
  return UNVAN_ESIKLERI.map((esik) => ({
    unvan: esik.unvan,
    iconKey: unvanAnahtari(esik.unvan),
    kitapEsik: esik.kitap,
    kazanildi: completedBookCount >= esik.kitap,
    guncelMi: esik.unvan === guncel,
  }));
}

// --- "Bugüne Taşı" görev tanımları (Faz 6.1 — profile_tasks.task_id eşleşmesi) ---

export type GorevTanimiDetay = {
  gorev: NonNullable<
    (typeof bookDefs)[number]["chapters"][number]["gorev"]
  >;
  bookTitle: string;
  bookKey: string;
  bolumNo: number;
  bolumAdi: string;
};

/** books.ts'teki tüm görev tanımlarını (kitap+bölüm bağlamıyla) listeler. */
export function tumGorevTanimlari(): GorevTanimiDetay[] {
  const sonuc: GorevTanimiDetay[] = [];
  for (const book of bookDefs) {
    book.chapters.forEach((chapter, index) => {
      if (chapter.gorev) {
        sonuc.push({
          gorev: chapter.gorev,
          bookTitle: book.title,
          bookKey: book.routePrefix,
          bolumNo: index + 1,
          bolumAdi: chapter.title,
        });
      }
    });
  }
  return sonuc;
}

export function gorevTanimiBul(taskId: string): GorevTanimiDetay | null {
  return tumGorevTanimlari().find((t) => t.gorev.id === taskId) ?? null;
}

// Çocuğun profile_tasks satırlarını görev tanımlarıyla birleştirir (saf).
// Hem /gorevlerim hem veli Gelişim Raporu > Görevler sekmesi ortak kullanır.
export type GorevDurumSatiri = {
  task_id: string;
  status: "eklendi" | "tamamlandi";
  added_at: string;
  completed_at: string | null;
};

export type GorevDurumDetay = GorevTanimiDetay & {
  status: "eklendi" | "tamamlandi";
  addedAt: string;
  completedAt: string | null;
};

export function gorevDurumDetaylari(
  rows: GorevDurumSatiri[],
): GorevDurumDetay[] {
  return rows
    .map((row) => {
      const tanim = gorevTanimiBul(row.task_id);
      if (!tanim) return null; // içerikten kalkmış görev gösterilmez
      return {
        ...tanim,
        status: row.status,
        addedAt: row.added_at,
        completedAt: row.completed_at,
      };
    })
    .filter((g): g is GorevDurumDetay => g !== null)
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
}

// --- Kelimelerim (çocuğun okuduğu bölümlerdeki sözlük kelimeleri) ---

export type KelimeOgesi = {
  word: string;
  meaning: string;
  bookIsim: string;
  bookKey: string;
  bolumNo: number;
};

/**
 * Çocuğun tamamladığı bölümlerdeki `interactive_word` (sözlük) bloklarını,
 * hikâyenin iki parçasından ("1. Kısım" ve "Hikâye Devam Ediyor") okuma
 * sırasıyla toplar. Yalnız yayındaki kitaplar sayılır. PROJE-MODELI 5.1.
 */
export function kelimeDefteri(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): KelimeOgesi[] {
  const ogeler: KelimeOgesi[] = [];

  for (const kitap of yayindakiKitaplar(bookRows, progressRows)) {
    kitap.icerik.chapters.slice(0, kitap.tamamlanan).forEach((chapter, index) => {
      for (const block of [...chapter.paragraphs, ...(chapter.continuationParagraphs ?? [])]) {
        if (block.type === "interactive_word") {
          ogeler.push({
            word: block.word,
            meaning: block.meaning,
            bookIsim: kitap.katalog.title,
            bookKey: kitap.katalog.key,
            bolumNo: index + 1,
          });
        }
      }
    });
  }

  return ogeler;
}

// --- Kütüphane ve çocuk kartı ---

export type KutuphaneDurum = "tamamlandi" | "devam" | "yeni";

export type KutuphaneKitap = {
  /** Kapak ve yönlendirme anahtarı (katalog anahtarı, ör. "adem") */
  bookKey: string;
  /** Katalogdaki ad ("Hz. Âdem"); veritabanının aksansız adı gösterilmez. */
  ad: string;
  durum: KutuphaneDurum;
  tamamlanan: number;
  toplam: number;
  yuzde: number;
};

/**
 * Kütüphane için yayındaki kitaplar, katalog sırasıyla.
 * REVİZE 12 Eki 2026 (PROJE-MODELI 3.10.2): kitaplar arasında kilit YOKTUR;
 * yayındaki her kitap açıktır, kilit yalnız kitap içindeki bölümlerde ve finalde.
 */
export function kutuphaneListesi(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): KutuphaneKitap[] {
  return yayindakiKitaplar(bookRows, progressRows).map((kitap) => ({
    bookKey: kitap.katalog.key,
    ad: kitap.katalog.title,
    durum: kitap.bitti ? "tamamlandi" : basladiMi(kitap) ? "devam" : "yeni",
    tamamlanan: kitap.tamamlanan,
    toplam: kitap.toplam,
    yuzde: ilerlemeYuzdesi(kitap),
  }));
}

export type CocukOzeti = {
  unvan: string;
  kazanilanRozet: number;
  tamamlananKitap: number;
  aktifKitapAdi: string | null;
  aktifKitapKey: string | null;
  aktifYuzde: number;
  aktifTamamlanan: number;
  aktifToplam: number;
  sonRozetAdi: string | null;
  sonRozetIconKey: string | null;
  /** En son güncellenen ilerlemenin zamanı (ISO) — "son okuma" özeti (Faz 6 / S1) */
  sonAktiviteZamani: string | null;
};

/** Ana Sayfa çocuk kartı ve rapor için tek çağrıda özet üretir. */
export function cocukOzeti(
  progressRows: DeriveProgressRow[],
  bookRows: DeriveBookRow[],
): CocukOzeti {
  const kitaplar = yayindakiKitaplar(bookRows, progressRows);

  const kazanilanRozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);
  const tamamlananKitap = kitaplar.filter((kitap) => kitap.bitti).length;

  // Son aktivite: yayındaki kitapların ilerlemeleri içinde en yeni updated_at (Faz 6 / S1)
  const sonAktiviteZamani =
    kitaplar
      .map((kitap) => kitap.ilerleme?.updated_at)
      .filter((value): value is string => Boolean(value))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  // Aktif kitap: en son okunan, başlanmış ve bitmemiş kitap; yoksa en son
  // okunan (biten dahil) kitap.
  const baslananlar = kitaplar
    .filter(basladiMi)
    .sort((a, b) => b.sonOkuma - a.sonOkuma);
  const aktif = baslananlar.find((kitap) => !kitap.bitti) ?? baslananlar[0] ?? null;

  let sonRozetAdi: string | null = null;
  let sonRozetIconKey: string | null = null;

  if (aktif && aktif.tamamlanan > 0) {
    sonRozetAdi = aktif.icerik.chapters[aktif.tamamlanan - 1]?.badgeName ?? null;
    sonRozetIconKey = rozetIconKey(aktif.katalog.key, aktif.tamamlanan);
  }

  return {
    unvan: unvanFromBookCount(tamamlananKitap),
    kazanilanRozet,
    tamamlananKitap,
    aktifKitapAdi: aktif?.katalog.title ?? null,
    aktifKitapKey: aktif?.katalog.key ?? null,
    aktifYuzde: aktif ? ilerlemeYuzdesi(aktif) : 0,
    aktifTamamlanan: aktif?.tamamlanan ?? 0,
    aktifToplam: aktif?.toplam ?? 0,
    sonRozetAdi,
    sonRozetIconKey,
    sonAktiviteZamani,
  };
}
