// Veli paneli (Faz 5) ve harita için ortak türetme katmanı.
// PROJE-MODELI.md Bölüm 7.2: kavramlar tablo GEREKTİRMEZ — hepsi
// profiles + user_progress + books + books.ts birleşiminden türetilir.
// Buradaki fonksiyonlar SAF'tır (Supabase'e bağlı değil); veri sayfa/provider
// tarafından çekilip bu fonksiyonlara verilir.

import { books as bookDefs } from "../data/books";

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

export const UNVAN_ESIKLERI: { kitap: number; unvan: string }[] = [
  { kitap: 0, unvan: "Yeni Gezgin" },
  { kitap: 1, unvan: "Yol Kaşifi" },
  { kitap: 3, unvan: "Değer Toplayıcısı" },
  { kitap: 6, unvan: "Yol Arkadaşı" },
  { kitap: 10, unvan: "Bilge Yolcu" },
  { kitap: 15, unvan: "Hikâye Ustası" },
];

export function unvanFromBookCount(completedBookCount: number) {
  if (completedBookCount >= 15) return "Hikâye Ustası";
  if (completedBookCount >= 10) return "Bilge Yolcu";
  if (completedBookCount >= 6) return "Yol Arkadaşı";
  if (completedBookCount >= 3) return "Değer Toplayıcısı";
  if (completedBookCount >= 1) return "Yol Kaşifi";
  return "Yeni Gezgin";
}

export function unvanAnahtari(unvan: string) {
  return normalizeBookName(unvan).replaceAll(" ", "-");
}

// --- Kitap anahtarları (DB kitabı ↔ görsel/route anahtarı ↔ books.ts içeriği) ---

type KitapAnahtari = {
  /** Görsel + route anahtarı: kapak-{bookKey}.png, /kitap/{bookKey} */
  bookKey: string;
  /** books.ts içindeki gerçek içerik id'si (varsa) */
  booksTsId?: string;
  /** DB kitap adını eşleştirmek için anahtar kelimeler (normalize edilmiş) */
  keywords: string[];
  /** books.ts içeriği olmayan kitaplar için rozet adı listesi (sıralı) */
  statikRozetler?: string[];
};

// Merkezî Rozet Matrisi'nin kod tarafı (PROJE-MODELI.md 6.1). İçeriği olan
// kitaplarda rozet adları books.ts'ten okunur; olmayanlarda statik listeden.
export const KITAP_ANAHTARLARI: KitapAnahtari[] = [
  { bookKey: "adem", booksTsId: "hz-adem", keywords: ["adem"] },
  { bookKey: "nuh", booksTsId: "hz-nuh", keywords: ["nuh"] },
  {
    bookKey: "ebubekir",
    keywords: ["ebu bekir", "ebubekir"],
    statikRozetler: [
      "Işık Rozeti",
      "Gönül Dostu Rozeti",
      "İlk Güven Rozeti",
      "Mekke Çarşısı Rozeti",
      "Habeşistan Yolu Çıkartması",
      "Doğruluk Rozeti",
      "Tevekkül Rozeti",
      "Kardeşlik Rozeti",
      "Dayanışma Rozeti",
      "Teselli Rozeti",
    ],
  },
  {
    bookKey: "omer",
    keywords: ["omer"],
    statikRozetler: ["Adalet Rozeti", "Kararlılık Rozeti", "Merhamet Rozeti"],
  },
  { bookKey: "osman", keywords: ["osman"], statikRozetler: ["Hayâ Rozeti"] },
];

export function kitapAnahtariBul(isim: string): KitapAnahtari | undefined {
  const normalized = normalizeBookName(isim);
  return KITAP_ANAHTARLARI.find((anahtar) =>
    anahtar.keywords.some((keyword) => normalized.includes(keyword)),
  );
}

/** Bir kitabın sıralı rozet adları (books.ts önce, yoksa statik liste). */
export function rozetAdlari(anahtar: KitapAnahtari): string[] {
  if (anahtar.booksTsId) {
    const def = bookDefs.find((book) => book.id === anahtar.booksTsId);
    if (def) return def.chapters.map((chapter) => chapter.badgeName);
  }
  return anahtar.statikRozetler ?? [];
}

/** Rozet görsel anahtarı: adem-bolum-1 → /rozetler/rozet-adem-bolum-1.png */
export function rozetIconKey(bookKey: string, chapterNo: number) {
  return `${bookKey}-bolum-${chapterNo}`;
}

/** Belirli bir bölümün "Bugüne Taşı" görevi (yalnız books.ts içeriği olanlarda). */
export function buguneTasiForChapter(
  anahtar: KitapAnahtari,
  chapterIndex: number,
): string | null {
  if (!anahtar.booksTsId || chapterIndex < 0) return null;
  const def = bookDefs.find((book) => book.id === anahtar.booksTsId);
  return def?.chapters[chapterIndex]?.buguneTasi ?? null;
}

// --- Çocuk kartı / özet türetmesi ---

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

function siraliKitaplar(bookRows: DeriveBookRow[]) {
  return [...bookRows].sort((a, b) => {
    const sa = a.sira ?? Number.MAX_SAFE_INTEGER;
    const sb = b.sira ?? Number.MAX_SAFE_INTEGER;
    return sa - sb;
  });
}

/** Tüm kitapların bölüm rozetleri; kazanılmış olanlar işaretli (PROJE-MODELI 7.2). */
export function rozetVitrini(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): RozetOgesi[] {
  const progressByBookId = new Map(progressRows.map((row) => [row.book_id, row]));
  const ogeler: RozetOgesi[] = [];

  for (const book of siraliKitaplar(bookRows)) {
    const anahtar = kitapAnahtariBul(book.isim);
    if (!anahtar) continue;
    const adlar = rozetAdlari(anahtar);
    const durum = kitapDurumu(book, progressByBookId.get(book.id));

    adlar.forEach((ad, index) => {
      const bolumNo = index + 1;
      ogeler.push({
        bookKey: anahtar.bookKey,
        bookIsim: book.isim,
        bolumNo,
        ad,
        iconKey: rozetIconKey(anahtar.bookKey, bolumNo),
        kazanildi: durum.tamamlanan >= bolumNo,
      });
    });
  }

  return ogeler;
}

/** Kitap madalyaları; madalya kitabın finali bitince kazanılır (bitti_mi). */
export function madalyaVitrini(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): MadalyaOgesi[] {
  const progressByBookId = new Map(progressRows.map((row) => [row.book_id, row]));
  const ogeler: MadalyaOgesi[] = [];

  for (const book of siraliKitaplar(bookRows)) {
    const anahtar = kitapAnahtariBul(book.isim);
    if (!anahtar) continue;
    const progress = progressByBookId.get(book.id);
    ogeler.push({
      bookKey: anahtar.bookKey,
      bookIsim: book.isim,
      // Ad her zaman katalogdan türetilir; Supabase final_title/final_badge
      // eski sürümden kalan adları ("Altın Yol Arkadaşı" gibi) taşıyabilir.
      ad: `${book.isim} Yolculuk Madalyası`,
      iconKey: anahtar.bookKey,
      kazanildi: Boolean(progress?.bitti_mi),
    });
  }

  return ogeler;
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
  bookKey: string | null;
  bolumNo: number;
  bolumAdi: string;
};

/** books.ts'teki tüm görev tanımlarını (kitap+bölüm bağlamıyla) listeler. */
export function tumGorevTanimlari(): GorevTanimiDetay[] {
  const sonuc: GorevTanimiDetay[] = [];
  for (const book of bookDefs) {
    const anahtar = KITAP_ANAHTARLARI.find((k) => k.booksTsId === book.id);
    book.chapters.forEach((chapter, index) => {
      if (chapter.gorev) {
        sonuc.push({
          gorev: chapter.gorev,
          bookTitle: book.title,
          bookKey: anahtar?.bookKey ?? null,
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

// --- Kelime Defterim (çocuğun okuduğu bölümlerdeki Kelime Kutusu kelimeleri) ---

export type KelimeOgesi = {
  word: string;
  meaning: string;
  bookIsim: string;
  bookKey: string;
  bolumNo: number;
};

/**
 * Çocuğun tamamladığı bölümlerdeki `interactive_word` (Kelime Kutusu) bloklarını
 * toplar. Yalnız books.ts içeriği olan kitaplarda kelime vardır. PROJE-MODELI 5.1.
 */
export function kelimeDefteri(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): KelimeOgesi[] {
  const progressByBookId = new Map(progressRows.map((row) => [row.book_id, row]));
  const ogeler: KelimeOgesi[] = [];

  for (const book of siraliKitaplar(bookRows)) {
    const anahtar = kitapAnahtariBul(book.isim);
    if (!anahtar?.booksTsId) continue;
    const def = bookDefs.find((b) => b.id === anahtar.booksTsId);
    if (!def) continue;

    const tamamlanan = Math.max(
      0,
      progressByBookId.get(book.id)?.tamamlanan_bolum_sayisi ?? 0,
    );

    def.chapters.slice(0, tamamlanan).forEach((chapter, index) => {
      for (const block of chapter.paragraphs) {
        if (block.type === "interactive_word") {
          ogeler.push({
            word: block.word,
            meaning: block.meaning,
            bookIsim: book.isim,
            bookKey: anahtar.bookKey,
            bolumNo: index + 1,
          });
        }
      }
    });
  }

  return ogeler;
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
  buguneTasi: string | null;
  /** En son güncellenen ilerlemenin zamanı (ISO) — "son okuma" özeti (Faz 6 / S1) */
  sonAktiviteZamani: string | null;
};

type KitapDurumu = {
  isim: string;
  anahtar?: KitapAnahtari;
  toplam: number;
  tamamlanan: number;
  yuzde: number;
  bitti: boolean;
  updatedAt: number;
};

/** Bir kitabın ilerleme durumunu tek satıra indirger (Kütüphane + kart ortak). */
export function kitapDurumu(
  book: DeriveBookRow,
  progress: DeriveProgressRow | undefined,
): KitapDurumu {
  const anahtar = kitapAnahtariBul(book.isim);
  const toplam =
    book.toplam_bolum && book.toplam_bolum > 0
      ? book.toplam_bolum
      : anahtar
        ? Math.max(1, rozetAdlari(anahtar).length)
        : 1;
  const tamamlanan = Math.min(
    toplam,
    Math.max(0, progress?.tamamlanan_bolum_sayisi ?? 0),
  );
  const yuzde =
    progress?.yuzde !== null && progress?.yuzde !== undefined
      ? Math.max(clampProgress(progress.yuzde), clampProgress((tamamlanan / toplam) * 100))
      : clampProgress((tamamlanan / toplam) * 100);
  return {
    isim: book.isim,
    anahtar,
    toplam,
    tamamlanan,
    yuzde,
    bitti: Boolean(progress?.bitti_mi),
    updatedAt: progress?.updated_at ? new Date(progress.updated_at).getTime() : 0,
  };
}

export type KutuphaneDurum = "tamamlandi" | "devam" | "yeni" | "kilitli";

export type KutuphaneKitap = {
  book: DeriveBookRow;
  bookKey: string | null;
  durum: KutuphaneDurum;
  tamamlanan: number;
  toplam: number;
  yuzde: number;
  /** Kilitliyse açılma şartı metni için bir önceki kitabın adı (PROJE-MODELI 3.4) */
  oncekiKitapAdi: string | null;
};

/**
 * Kütüphane için sıralı kitap listesi + durum + kilit mantığı.
 * Kilit: ilk kitap hep açık; sonrakiler bir önceki kitabın finali bitmedikçe
 * (ve kendisi başlanmadıkça) kilitlidir. PROJE-MODELI 3.4.
 */
export function kutuphaneListesi(
  bookRows: DeriveBookRow[],
  progressRows: DeriveProgressRow[],
): KutuphaneKitap[] {
  const progressByBookId = new Map(progressRows.map((row) => [row.book_id, row]));
  const sirali = [...bookRows].sort((a, b) => {
    const sa = a.sira ?? Number.MAX_SAFE_INTEGER;
    const sb = b.sira ?? Number.MAX_SAFE_INTEGER;
    return sa - sb;
  });

  const sonuc: KutuphaneKitap[] = [];
  let oncekiBitti = true; // ilk kitabın "öncesi" tamamlanmış sayılır → açık
  let oncekiKitapAdi: string | null = null;

  for (const book of sirali) {
    const durum = kitapDurumu(book, progressByBookId.get(book.id));
    const baslandi = durum.tamamlanan > 0 || durum.yuzde > 0;
    const acik = sonuc.length === 0 || oncekiBitti || baslandi;

    let durumEtiketi: KutuphaneDurum;
    if (durum.bitti) durumEtiketi = "tamamlandi";
    else if (!acik) durumEtiketi = "kilitli";
    else if (baslandi) durumEtiketi = "devam";
    else durumEtiketi = "yeni";

    sonuc.push({
      book,
      bookKey: durum.anahtar?.bookKey ?? null,
      durum: durumEtiketi,
      tamamlanan: durum.tamamlanan,
      toplam: durum.toplam,
      yuzde: durum.yuzde,
      oncekiKitapAdi: durumEtiketi === "kilitli" ? oncekiKitapAdi : null,
    });

    oncekiBitti = durum.bitti;
    oncekiKitapAdi = book.isim;
  }

  return sonuc;
}

/**
 * Ana Sayfa çocuk kartı için tek çağrıda özet üretir.
 * PROJE-MODELI 4.1/4: "Bugüne Taşı" = en son alınan TEK görev (geçmiş liste değil).
 */
export function cocukOzeti(
  progressRows: DeriveProgressRow[],
  bookRows: DeriveBookRow[],
): CocukOzeti {
  const progressByBookId = new Map(progressRows.map((row) => [row.book_id, row]));
  const durumlar = bookRows.map((book) =>
    kitapDurumu(book, progressByBookId.get(book.id)),
  );

  const kazanilanRozet = durumlar.reduce((sum, d) => sum + d.tamamlanan, 0);
  const tamamlananKitap = durumlar.filter((d) => d.bitti).length;

  // Son aktivite: tüm ilerleme satırları içinde en yeni updated_at (Faz 6 / S1)
  const sonAktiviteZamani =
    progressRows
      .map((row) => row.updated_at)
      .filter((value): value is string => Boolean(value))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  // Aktif kitap: en son güncellenen, bitmemiş ve başlanmış kitap; yoksa en son
  // güncellenen (biten dahil) kitap.
  const baslananlar = durumlar.filter((d) => d.tamamlanan > 0 || d.yuzde > 0);
  const devamEdenler = baslananlar
    .filter((d) => !d.bitti)
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const enSon = [...baslananlar].sort((a, b) => b.updatedAt - a.updatedAt)[0];
  const aktif = devamEdenler[0] ?? enSon ?? null;

  let sonRozetAdi: string | null = null;
  let sonRozetIconKey: string | null = null;
  let buguneTasi: string | null = null;

  if (aktif?.anahtar && aktif.tamamlanan > 0) {
    const adlar = rozetAdlari(aktif.anahtar);
    sonRozetAdi = adlar[Math.min(aktif.tamamlanan, adlar.length) - 1] ?? null;
    sonRozetIconKey = rozetIconKey(aktif.anahtar.bookKey, aktif.tamamlanan);
    buguneTasi = buguneTasiForChapter(aktif.anahtar, aktif.tamamlanan - 1);
  }

  return {
    unvan: unvanFromBookCount(tamamlananKitap),
    kazanilanRozet,
    tamamlananKitap,
    aktifKitapAdi: aktif?.isim ?? null,
    aktifKitapKey: aktif?.anahtar?.bookKey ?? null,
    aktifYuzde: aktif?.yuzde ?? 0,
    aktifTamamlanan: aktif?.tamamlanan ?? 0,
    aktifToplam: aktif?.toplam ?? 0,
    sonRozetAdi,
    sonRozetIconKey,
    buguneTasi,
    sonAktiviteZamani,
  };
}
