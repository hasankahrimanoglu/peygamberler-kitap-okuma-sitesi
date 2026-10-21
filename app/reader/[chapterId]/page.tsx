"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
// Kaydırmalı okuyucu (Faz 6.2) 28 Tem 2026'da Hasan onayıyla üretime alındı;
// sayfalı okuyucu 30 Tem 2026'da tamamen kaldırıldı. Tek okuyucu budur.
import { AtlasScrollReader } from "../../../src/components/reader/AtlasScrollReader";
import { CocukKorumasi } from "../../../src/components/cocuk/CocukKorumasi";
import { dbKitabiBul } from "../../../src/lib/derive";
import {
  adresteVar,
  FINAL_DONUS_PARAMETRESI,
  FINAL_SONUC_PARAMETRESI,
} from "../../../src/lib/child/finalSonucu";
import { atlasBookByKey } from "../../../src/data/atlasCatalog";
import {
  adaptDataChapter,
  type ChapterData,
  type DecisionOption,
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

/**
 * Kitabın Supabase satırını bulur. Kelime kümesiyle eşleşir (`dbKitabiBul`):
 * anahtarla alt dize araması "ali"yi "Hz. Sâlih" içinde de bulurdu.
 */
async function eslesenKitabiBul(chapter: ChapterData): Promise<{
  hata: boolean;
  kitap: EslesenKitap | null;
}> {
  const { data: kitaplar, error } = await supabase
    .from("books")
    .select("id, isim, toplam_bolum");

  if (error) return { hata: true, kitap: null };

  const kitap = dbKitabiBul(kitaplar ?? [], chapter.bookName ?? "", chapter.bookKey) ?? null;
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

  const { hata: kitapHatasi, kitap } = await eslesenKitabiBul(chapter);

  if (kitapHatasi) {
    return {
      ok: false,
      message: "Kitap bilgisi Supabase'den okunamadı. Lütfen tekrar dene.",
    };
  }

  if (!kitap) {
    return {
      ok: false,
      message: `${chapter.bookName ?? "Kitap"} kaydı bulunamadı. Lütfen yöneticiye bildir.`,
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

/**
 * "Sen Olsaydın" ilk seçiminin kalıcı kaydı (S5 — PROJE-MODELI 4.2 notu). Aynı
 * bölüm tekrar okununca ilk seçim kalır (`ignoreDuplicates`). Hata okuma
 * akışını durdurmaz; yalnız kitap sonu veli özeti eksik kalır.
 */
async function seciminiKaydet(chapter: ChapterData, secenek: DecisionOption["id"]) {
  const profileId = window.localStorage.getItem("selected_child_profile_id");
  const dogruSecenek = chapter.decision?.correctOption;
  if (!profileId || !chapter.bookKey || !dogruSecenek) return;

  const { error } = await supabase.from("sen_olsaydin_secimleri").upsert(
    {
      profile_id: profileId,
      kitap_anahtari: chapter.bookKey,
      bolum_no: chapter.chapterNumber ?? 1,
      secenek,
      dogru: secenek === dogruSecenek,
    },
    { onConflict: "profile_id,kitap_anahtari,bolum_no", ignoreDuplicates: true },
  );
  if (error) console.warn("Sen Olsaydın seçimi kaydedilemedi.", error.message);
}

export default function ReaderPage() {
  const params = useParams<{ chapterId: string }>();
  const chapter = useMemo(
    () => adaptDataChapter(params.chapterId),
    [params.chapterId],
  );
  // Final sonucundaki "Tekrar bakmak istersen"den gelindiyse dönüş oraya (4.1/13 EK).
  const [finalSonucuYolu, setFinalSonucuYolu] = useState<string | null>(null);

  useEffect(() => {
    const yol =
      chapter?.bookKey && adresteVar(FINAL_DONUS_PARAMETRESI)
        ? `/quiz/${chapter.bookKey}?${FINAL_SONUC_PARAMETRESI}`
        : null;
    queueMicrotask(() => setFinalSonucuYolu(yol));
  }, [chapter]);

  if (!chapter) notFound();
  // Yayın durumu tek kaynaktan: katalogda `published` olmayan kitabın bölümü açılmaz.
  if (atlasBookByKey.get(chapter.bookKey ?? "")?.availability !== "published") notFound();

  // Çocuk oturumu (Faz 7): veli oturumu + açık profil ya da bağlı cihaz.
  return (
    <CocukKorumasi>
      <AtlasScrollReader
        key={chapter.id}
        chapter={chapter}
        onProgressSync={() => syncChapterProgress(chapter)}
        onSecim={(secenek) => void seciminiKaydet(chapter, secenek)}
        finalSonucuYolu={finalSonucuYolu}
      />
    </CocukKorumasi>
  );
}
