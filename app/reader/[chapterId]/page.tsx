"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { AtlasReader } from "../../../src/components/reader/AtlasReader";
import {
  adaptDataChapter,
  type ChapterData,
} from "../../../src/data/demoChapters";

type ProgressSyncResult = {
  ok: boolean;
  message?: string;
};

type EslesenKitap = {
  id: string;
  isim: string | null;
  toplam_bolum: number | null;
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

async function eslesenAdemKitabiniBul(): Promise<{
  hata: boolean;
  kitap: EslesenKitap | null;
}> {
  const { data: kitaplar, error } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (error) return { hata: true, kitap: null };

  const kitap =
    kitaplar?.find((item) =>
      normalizeBookName(item.isim ?? "").includes("adem"),
    ) ?? null;

  return { hata: false, kitap };
}

async function syncChapterProgress(
  chapter: ChapterData,
): Promise<ProgressSyncResult> {
  const profileId = window.localStorage.getItem("selected_child_profile_id");
  const chapterNumber = chapter.chapterNumber ?? 1;
  const totalChapters = chapter.totalChapters ?? 1;

  if (!profileId) {
    return {
      ok: false,
      message: "Aktif çocuk profili bulunamadı. Lütfen tekrar giriş yap.",
    };
  }

  // Hz. Şît yalnız kitap geçişi sunumu içindir. Güvenlik şeması veya Supabase
  // verisi değiştirilmeden seçili profile özel tarayıcı durumunda tutulur.
  if (chapter.bookKey === "sit") {
    const anahtar = `pkd-demo-sit-progress-${profileId}`;
    const mevcut = Number(window.localStorage.getItem(anahtar) ?? 0);
    window.localStorage.setItem(
      anahtar,
      String(Math.min(totalChapters, Math.max(mevcut, chapterNumber))),
    );
    window.dispatchEvent(new Event("pkd-demo-progress"));
    return { ok: true };
  }

  const { hata: kitapHatasi, kitap } = await eslesenAdemKitabiniBul();

  if (kitapHatasi) {
    return {
      ok: false,
      message: "Kitap bilgisi Supabase'den okunamadı. Lütfen tekrar dene.",
    };
  }

  if (!kitap) {
    return {
      ok: false,
      message: "Hz. Âdem kitap kaydı bulunamadı. Lütfen yöneticiye bildir.",
    };
  }

  const { data: mevcutIlerleme, error: okumaHatasi } = await supabase
    .from("user_progress")
    .select("tamamlanan_bolum_sayisi, bitti_mi")
    .eq("profile_id", profileId)
    .eq("book_id", kitap.id)
    .maybeSingle();

  if (okumaHatasi) {
    return {
      ok: false,
      message: "Mevcut ilerleme okunamadı. Lütfen tekrar dene.",
    };
  }

  const tamamlananBolum = Math.min(
    totalChapters,
    Math.max(
      0,
      mevcutIlerleme?.tamamlanan_bolum_sayisi ?? 0,
      chapterNumber,
    ),
  );
  const yuzde = Math.round((tamamlananBolum / totalChapters) * 100);
  const payload = {
    profile_id: profileId,
    book_id: kitap.id,
    chapter_id: String(chapterNumber),
    tamamlanan_bolum_sayisi: tamamlananBolum,
    yuzde,
    bitti_mi: Boolean(mevcutIlerleme?.bitti_mi),
    updated_at: new Date().toISOString(),
  };

  const { error: yazmaHatasi } = await supabase
    .from("user_progress")
    .upsert(payload, { onConflict: "profile_id,book_id" });

  if (!yazmaHatasi) return { ok: true };

  // Eski kurulumlarda chapter_id kolonu yoksa ilerlemeyi aynı güvenli alanlarla
  // yeniden yazar. Bu yol şema veya RLS değiştirmez.
  if (yazmaHatasi.message.toLocaleLowerCase("tr-TR").includes("chapter_id")) {
    const { chapter_id: _chapterId, ...uyumluPayload } = payload;
    void _chapterId;
    const { error: uyumHatasi } = await supabase
      .from("user_progress")
      .upsert(uyumluPayload, { onConflict: "profile_id,book_id" });

    if (!uyumHatasi) return { ok: true };
    return { ok: false, message: `İlerleme kaydedilemedi: ${uyumHatasi.message}` };
  }

  return { ok: false, message: `İlerleme kaydedilemedi: ${yazmaHatasi.message}` };
}

export default function ReaderPage() {
  const params = useParams<{ chapterId: string }>();
  const chapter = useMemo(
    () => adaptDataChapter(params.chapterId),
    [params.chapterId],
  );

  if (!chapter) notFound();
  if (chapter.bookKey !== "adem" && chapter.bookKey !== "sit") notFound();

  return (
    <AtlasReader
      key={chapter.id}
      chapter={chapter}
      onProgressSync={() => syncChapterProgress(chapter)}
    />
  );
}
