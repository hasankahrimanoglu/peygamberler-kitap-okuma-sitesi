"use client";

import { useEffect, useState } from "react";
import { adaptDataChapter, type ChapterData } from "../../../src/data/demoChapters";
import { AtlasScrollReader } from "../../../src/components/reader/AtlasScrollReader";

/**
 * Okuma ekranı önizlemesi — giriş gerektirmez; rozet kaydı Supabase'e gitmez.
 * Gerçek ekran `/reader/[chapterId]`'dir; burası tasarım kontrolü içindir
 * (PROJE-MODELI 3.6: önizleme rotaları ürün rotalarından ayrı kalır).
 *
 *   /tasarim/okuma?bolum=adem-2          → ilk okuma, "Rozetimi Al" kaydı başarılı
 *   /tasarim/okuma?bolum=adem-2&tekrar=1 → rozeti daha önce kazanılmış bölüm
 *   /tasarim/okuma?bolum=yunus-5         → son bölüm: "Büyük Final Testine Geç"
 *   /tasarim/okuma?bolum=adem-2&hata=1   → kayıt hatası ve "Tekrar Dene"
 */
export default function OkumaOnizleme() {
  const [ayar, setAyar] = useState<{ chapter: ChapterData; tekrar: boolean; hata: boolean } | null>(
    null,
  );

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      const chapter = adaptDataChapter(parametreler.get("bolum") ?? "adem-2");
      if (!chapter) return;
      setAyar({
        chapter,
        tekrar: parametreler.get("tekrar") === "1",
        hata: parametreler.get("hata") === "1",
      });
    });
  }, []);

  if (!ayar) return null;

  return (
    <AtlasScrollReader
      key={ayar.chapter.id}
      chapter={ayar.chapter}
      tekrarOkumaOnizleme={ayar.tekrar}
      onProgressSync={() =>
        new Promise((coz) =>
          window.setTimeout(
            () =>
              coz(
                ayar.hata
                  ? { ok: false, message: "Rozet şu an kaydedilemedi. Biraz sonra tekrar dene." }
                  : { ok: true },
              ),
            700,
          ),
        )
      }
    />
  );
}
