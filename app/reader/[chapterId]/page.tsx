"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  adaptDataChapter,
  demoChapters,
  sonrakiBolumAdiniBul,
} from "../../../src/data/demoChapters";
import type {
  ChapterData,
  DecisionOption,
} from "../../../src/data/demoChapters";
import {
  AltBarAdem,
  GorevSayfasi,
  HikayeSayfasi,
  HikayeSayfasiAdem,
  KapakSayfasi,
  KapakSayfasiAdem,
  KararSayfasi,
  OgrendikSayfasi,
  RozetSayfasi,
  SesCubugu,
  UstBarAdem,
  okumaSayfalariniOlustur,
} from "../../../src/components/reader";
import type { OkumaSayfaModeli } from "../../../src/components/reader";
import { Buton, Ikon, OdulIkonu } from "../../../src/components/ui";

type ProgressSyncResult = {
  ok: boolean;
  message?: string;
};

function normalizeBookName(value: string) {
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

function getBookKeywords(bookKey: ChapterData["bookKey"]) {
  if (bookKey === "adem") return ["adem"];
  if (bookKey === "nuh") return ["nuh"];
  return ["ebu bekir", "ebubekir"];
}

async function syncChapterProgress(
  chapter: ChapterData,
): Promise<ProgressSyncResult> {
  const profileId = window.localStorage.getItem("selected_child_profile_id");
  const bookKey = chapter.bookKey ?? "ebubekir";
  const chapterNumber =
    chapter.chapterNumber ?? Math.max(1, Number(chapter.id) - 3 || 1);
  const totalChapters = chapter.totalChapters ?? 10;

  if (!profileId) {
    return {
      ok: false,
      message: "Aktif çocuk profili bulunamadı. Lütfen tekrar giriş yap.",
    };
  }

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (booksError) {
    return {
      ok: false,
      message: "Kitap bilgisi Supabase'den okunamadı. Lütfen tekrar dene.",
    };
  }

  const matchedBook = books?.find((book) => {
    const normalizedName = normalizeBookName(book.isim ?? "");
    return getBookKeywords(bookKey).some((keyword) =>
      normalizedName.includes(keyword),
    );
  });

  if (!matchedBook) {
    return {
      ok: false,
      message:
        "Bu kitabın Supabase books tablosunda kaydı yok. Lütfen schema.sql içindeki kitap seed satırlarını SQL Editor'da çalıştır.",
    };
  }

  const { data: currentProgress, error: currentProgressError } = await supabase
    .from("user_progress")
    .select("tamamlanan_bolum_sayisi")
    .eq("profile_id", profileId)
    .eq("book_id", matchedBook.id)
    .maybeSingle();

  if (currentProgressError) {
    return {
      ok: false,
      message:
        "Mevcut ilerleme Supabase'den okunamadı. RLS izinlerini ve user_progress tablosunu kontrol et.",
    };
  }

  const completedCount = Math.min(
    totalChapters,
    Math.max(0, currentProgress?.tamamlanan_bolum_sayisi ?? 0, chapterNumber),
  );
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  const progressPayload = {
    profile_id: profileId,
    book_id: matchedBook.id,
    chapter_id: String(chapterNumber),
    tamamlanan_bolum_sayisi: completedCount,
    yuzde: progressPercent,
    bitti_mi: false,
    updated_at: new Date().toISOString(),
  };
  const { error: progressError } = await supabase.from("user_progress").upsert(
    progressPayload,
    { onConflict: "profile_id,book_id" },
  );

  if (!progressError) return { ok: true };
  if (!progressError.message.toLocaleLowerCase("tr-TR").includes("chapter_id")) {
    return {
      ok: false,
      message: `İlerleme Supabase'e yazılamadı: ${progressError.message}`,
    };
  }

  const { error: fallbackError } = await supabase.from("user_progress").upsert(
    {
      profile_id: profileId,
      book_id: matchedBook.id,
      tamamlanan_bolum_sayisi: completedCount,
      yuzde: progressPercent,
      bitti_mi: false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "profile_id,book_id" },
  );

  if (fallbackError) {
    return {
      ok: false,
      message: `İlerleme Supabase'e yazılamadı: ${fallbackError.message}`,
    };
  }

  return { ok: true };
}

export default function ReaderPage() {
  const router = useRouter();
  const params = useParams<{ chapterId: string }>();
  const chapter = useMemo(
    () =>
      adaptDataChapter(params.chapterId) ??
      demoChapters[params.chapterId] ??
      demoChapters["4"],
    [params.chapterId],
  );

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [aktifKelime, setAktifKelime] = useState<string | null>(null);
  const [aktifSayfa, setAktifSayfa] = useState(0);
  const [secilen, setSecilen] = useState<DecisionOption["id"] | null>(null);
  const [yanlisDenendi, setYanlisDenendi] = useState(false);
  const [kararSonucuAcik, setKararSonucuAcik] = useState(false);
  const [rozetKaydediliyor, setRozetKaydediliyor] = useState(false);
  const [kayitHatasi, setKayitHatasi] = useState<string | null>(null);

  const kararVar = Boolean(chapter.decision);
  const sonucAcik = !kararVar || kararSonucuAcik;
  const sayfalar = useMemo(
    () => okumaSayfalariniOlustur(chapter, sonucAcik),
    [chapter, sonucAcik],
  );

  const rozetAnahtari = `${chapter.bookKey ?? "ebubekir"}-bolum-${
    chapter.chapterNumber ?? 1
  }`;
  const geriYolu = `/kitap/${chapter.bookKey ?? "ebubekir"}`;
  const sonrakiBolumAdi = useMemo(
    () => sonrakiBolumAdiniBul(chapter),
    [chapter],
  );

  // Yeni split okuma deneyimi önce Hz. Âdem'de finallenir (Hasan kararı,
  // 12 Tem 2026); onaydan sonra aynı yapı tüm kitaplara açılacak.
  const ademDuzeni = chapter.bookKey === "adem";

  // Sayfa illüstrasyonu: gerçek görsel `/public/icerik/` klasörüne bu adla
  // atıldığında kod değişmeden yayına girer; yoksa placeholder görünür.
  const sayfaGorseli = (sayfaNo: number) =>
    `/icerik/${chapter.bookKey ?? "ebubekir"}-bolum-${
      chapter.chapterNumber ?? 1
    }-sayfa-${sayfaNo}.png`;

  const sayfayaGit = useCallback(
    (sayfaIndex: number) => {
      const sonIndex = Math.max(0, sayfalar.length - 1);
      const hedef = Math.min(Math.max(sayfaIndex, 0), sonIndex);
      const slider = sliderRef.current;

      if (slider) {
        slider.scrollTo({
          left: slider.clientWidth * hedef,
          behavior: "smooth",
        });
      }

      setAktifSayfa(hedef);
      setAktifKelime(null);
    },
    [sayfalar.length],
  );

  // Kelime penceresi: kelimenin dışına dokununca kapanır.
  useEffect(() => {
    function disariTiklandi(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;
      if (target.closest("[data-glossary-root]")) return;

      setAktifKelime(null);
    }

    document.addEventListener("pointerdown", disariTiklandi);

    return () => {
      document.removeEventListener("pointerdown", disariTiklandi);
    };
  }, []);

  // Bölüm değişince tüm okuma durumu sıfırlanır.
  useEffect(() => {
    setAktifKelime(null);
    setSecilen(null);
    setYanlisDenendi(false);
    setKararSonucuAcik(false);
    setRozetKaydediliyor(false);
    setKayitHatasi(null);
    setAktifSayfa(0);
    sliderRef.current?.scrollTo({ left: 0 });
  }, [chapter.id]);

  // Elle kaydırmada aktif sayfayı takip et.
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let frameId: number | null = null;
    const aktifSayfayiGuncelle = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const sayfaGenisligi = slider.clientWidth || 1;
        const yeniIndex = Math.round(slider.scrollLeft / sayfaGenisligi);

        setAktifSayfa(
          Math.min(Math.max(yeniIndex, 0), Math.max(sayfalar.length - 1, 0)),
        );
      });
    };

    slider.addEventListener("scroll", aktifSayfayiGuncelle, { passive: true });
    aktifSayfayiGuncelle();

    return () => {
      slider.removeEventListener("scroll", aktifSayfayiGuncelle);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [sayfalar.length]);

  useEffect(() => {
    if (aktifSayfa <= sayfalar.length - 1) return;
    sayfayaGit(sayfalar.length - 1);
  }, [aktifSayfa, sayfayaGit, sayfalar.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        sayfayaGit(aktifSayfa + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        sayfayaGit(aktifSayfa - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [aktifSayfa, sayfayaGit]);

  const secimYap = useCallback(
    (id: DecisionOption["id"]) => {
      if (kararSonucuAcik) return;
      setSecilen(id);
      setYanlisDenendi(false);
    },
    [kararSonucuAcik],
  );

  const kararOnayla = useCallback(() => {
    if (!chapter.decision || !secilen) return;

    const dogru =
      !chapter.decision.correctOption ||
      secilen === chapter.decision.correctOption;

    if (!dogru) {
      setYanlisDenendi(true);
      return;
    }

    setYanlisDenendi(false);
    setKararSonucuAcik(true);
  }, [chapter.decision, secilen]);

  async function bolumuBitirVeKitabaDon() {
    setKayitHatasi(null);
    setRozetKaydediliyor(true);
    const sonuc = await syncChapterProgress(chapter);

    if (!sonuc.ok) {
      setRozetKaydediliyor(false);
      setKayitHatasi(
        sonuc.message ?? "Rozet Supabase'e kaydedilemedi. Lütfen tekrar dene.",
      );
      return;
    }

    // Bölüm bitince çocuk, kitabın bölüm listesine döner (Hasan kararı,
    // 13 Tem 2026) — bir sonraki bölüm orada açılmış olarak görünür.
    window.setTimeout(() => {
      router.push(geriYolu);
    }, 1700);
  }

  function sayfayiCiz(sayfa: OkumaSayfaModeli, sayfaIndex: number) {
    const sayfaNo = sayfaIndex + 1;

    if (sayfa.type === "kapak") {
      if (ademDuzeni) {
        return (
          <KapakSayfasiAdem
            chapter={chapter}
            rozetAnahtari={rozetAnahtari}
            gorselSrc={sayfaGorseli(sayfaNo)}
            onBasla={() => sayfayaGit(1)}
          />
        );
      }

      return <KapakSayfasi chapter={chapter} rozetAnahtari={rozetAnahtari} />;
    }

    if (sayfa.type === "okuma") {
      if (ademDuzeni) {
        return (
          <HikayeSayfasiAdem
            chapter={chapter}
            sayfa={sayfa}
            sayfaNo={sayfaNo}
            gorselSrc={sayfaGorseli(sayfaNo)}
            aktifKelime={aktifKelime}
            setAktifKelime={setAktifKelime}
          />
        );
      }

      return (
        <HikayeSayfasi
          chapter={chapter}
          sayfa={sayfa}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
      );
    }

    if (sayfa.type === "karar") {
      return (
        <KararSayfasi
          chapter={chapter}
          secilen={secilen}
          setSecilen={secimYap}
          sonucAcik={kararSonucuAcik}
          yanlisDenendi={yanlisDenendi}
          onKararOnayla={ademDuzeni ? kararOnayla : undefined}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
      );
    }

    if (sayfa.type === "ogrendik") {
      return (
        <OgrendikSayfasi
          chapter={chapter}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
      );
    }

    if (sayfa.type === "gorev") {
      return (
        <GorevSayfasi
          chapter={chapter}
          onGoreviAnladim={() => sayfayaGit(aktifSayfa + 1)}
          aktifKelime={aktifKelime}
          setAktifKelime={setAktifKelime}
        />
      );
    }

    return (
      <RozetSayfasi
        chapter={chapter}
        rozetAnahtari={rozetAnahtari}
        sonrakiBolumAdi={sonrakiBolumAdi}
        kayitHatasi={kayitHatasi}
        onHaritayaDon={() => router.push("/map")}
        onBolumuBitir={ademDuzeni ? bolumuBitirVeKitabaDon : undefined}
        kaydediyor={rozetKaydediliyor}
      />
    );
  }

  const aktifSayfaVerisi =
    sayfalar[Math.min(aktifSayfa, sayfalar.length - 1)];
  const sonSayfadaMi = aktifSayfa >= sayfalar.length - 1;

  // Alt güvertenin ortası: özel anlarda büyük buton, diğer sayfalarda
  // "Sayfa X / Y" göstergesi (PROJE-MODELI.md 5.1).
  let ozelAksiyon: {
    etiket: string;
    onClick: () => void;
    disabled: boolean;
    varyant: "altin" | "eylem";
  } | null = null;

  if (aktifSayfaVerisi?.type === "kapak") {
    ozelAksiyon = {
      etiket: "Maceraya Başla",
      onClick: () => sayfayaGit(aktifSayfa + 1),
      disabled: false,
      varyant: "altin",
    };
  } else if (aktifSayfaVerisi?.type === "karar" && !kararSonucuAcik) {
    ozelAksiyon = {
      etiket: "Kararını Onayla",
      onClick: kararOnayla,
      disabled: !secilen,
      varyant: "eylem",
    };
  } else if (aktifSayfaVerisi?.type === "rozet") {
    ozelAksiyon = {
      etiket: rozetKaydediliyor
        ? "Rozet Kaydediliyor..."
        : "Bölümü Bitir ve Rozetini Kazan",
      onClick: bolumuBitirVeKitabaDon,
      disabled: rozetKaydediliyor,
      varyant: "eylem",
    };
  }

  return (
    <main className="tema-cocuk zemin-yildizli relative flex h-[100dvh] flex-col overflow-hidden text-murekkep">
      {/* Üst bar: adem düzeninde profil kartlı yeni bar, diğerlerinde mevcut */}
      {ademDuzeni ? (
        <UstBarAdem chapter={chapter} onGeri={() => router.push(geriYolu)} />
      ) : (
        <header className="relative z-30 px-3 pt-3 sm:px-5 sm:pt-4">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-2">
            <button
              type="button"
              aria-label="Kitap sayfasına dön"
              onClick={() => router.push(geriYolu)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cizgi bg-yuzey text-murekkep transition hover:bg-yuzey-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu"
            >
              <Ikon ad="geri" boyut={20} />
            </button>

            <div className="min-w-0 flex-1 sm:flex-none">
              <p className="truncate font-baslik text-base font-bold leading-tight sm:text-lg">
                {chapter.bookName ?? "Kitap Yolculuğu"}
              </p>
              <p className="font-govde text-xs text-murekkep-soluk">
                Bölüm {chapter.chapterNumber ?? 1} /{" "}
                {chapter.totalChapters ?? 1}
              </p>
            </div>

            <SesCubugu
              baslik={chapter.audioTitle}
              className="w-full sm:ms-auto sm:w-auto sm:min-w-[280px] lg:min-w-[340px]"
            />
          </div>
        </header>
      )}

      {/* Sayfa kaydırıcısı */}
      <div className="relative min-h-0 flex-1">
        <div
          ref={sliderRef}
          className="scrollbar-none flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
        >
          {sayfalar.map((sayfa, sayfaIndex) => (
            <section
              key={sayfa.key}
              className="flex h-full w-full shrink-0 snap-start snap-always items-center justify-center px-3 py-2.5 sm:px-5 sm:py-3.5"
            >
              {sayfayiCiz(sayfa, sayfaIndex)}
            </section>
          ))}
        </div>
      </div>

      {/* Alt güverte: adem düzeninde etiketli pil barı, diğerlerinde mevcut */}
      {ademDuzeni ? (
        <AltBarAdem
          aktifSayfa={aktifSayfa}
          toplamSayfa={sayfalar.length}
          onOnceki={() => sayfayaGit(aktifSayfa - 1)}
          onSonraki={() => sayfayaGit(aktifSayfa + 1)}
          sonrakiKilitli={sonSayfadaMi}
        />
      ) : (
      <div className="relative z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-5 sm:pt-3">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Önceki sayfa"
            disabled={aktifSayfa === 0}
            onClick={() => sayfayaGit(aktifSayfa - 1)}
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-cizgi bg-yuzey text-murekkep transition hover:bg-yuzey-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu disabled:pointer-events-none disabled:opacity-30 sm:h-[52px] sm:w-[52px]"
          >
            <Ikon ad="ok-sol" boyut={22} />
          </button>

          <div className="flex min-w-0 justify-center">
            {ozelAksiyon ? (
              <Buton
                varyant={ozelAksiyon.varyant}
                disabled={ozelAksiyon.disabled}
                onClick={ozelAksiyon.onClick}
                className="max-w-full"
              >
                {ozelAksiyon.etiket}
              </Buton>
            ) : (
              <span className="rounded-full border border-cizgi bg-yuzey px-4 py-2 font-baslik text-sm font-semibold tabular-nums text-murekkep-soluk sm:text-base">
                Sayfa {aktifSayfa + 1} / {sayfalar.length}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label="Sonraki sayfa"
            disabled={sonSayfadaMi}
            onClick={() => sayfayaGit(aktifSayfa + 1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-eylem text-eylem-metin transition hover:bg-eylem-koyu focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu disabled:pointer-events-none disabled:opacity-30 sm:h-[52px] sm:w-[52px]"
          >
            <Ikon ad="ok-sag" boyut={22} />
          </button>
        </div>
      </div>
      )}

      {/* Rozet kaydedilirken kutlama örtüsü */}
      <AnimatePresence>
        {rozetKaydediliyor ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-gece-950/70 px-5 backdrop-blur-sm"
            aria-live="polite"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="tema-veli w-full max-w-sm rounded-kart border border-altin-400/60 bg-zemin p-7 text-center text-murekkep shadow-kart"
            >
              <motion.div
                initial={{ rotate: -8, scale: 0.75 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-3 flex justify-center"
              >
                <OdulIkonu
                  tip="rozet"
                  anahtar={rozetAnahtari}
                  boyut={110}
                  alt={`${chapter.badgeName} görseli`}
                />
              </motion.div>
              <p className="mx-auto mb-2 w-fit max-w-full rounded-full bg-vurgu-yumusak px-5 py-1.5 font-baslik text-sm font-bold leading-5 text-murekkep">
                {chapter.badgeName}
              </p>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="flex items-center justify-center gap-2 font-baslik text-2xl font-bold text-eylem"
              >
                <Ikon ad="harita" boyut={22} />
                Haritana İşleniyor
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="mt-2 font-story text-base font-medium leading-7"
              >
                {chapter.returnMessage}
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
