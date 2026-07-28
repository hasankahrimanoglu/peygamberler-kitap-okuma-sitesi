"use client";

import { useMemo, useState } from "react";
import { AtlasScrollReader } from "../../../src/components/reader/AtlasScrollReader";
import { books } from "../../../src/data/books";
import { adaptDataChapter } from "../../../src/data/demoChapters";
import styles from "./onizleme.module.css";

/**
 * Kaydırmalı okuma akışının önizleme rotası (Faz 6.2).
 *
 * Üretim rotası `/reader/[chapterId]` bu ekran Hasan tarafından onaylanana kadar
 * sayfalı `AtlasReader`'ı kullanmaya devam eder. Burada ilerleme Supabase'e
 * YAZILMAZ — "Bölümü Tamamla" yalnızca akışın sonunu göstermek içindir.
 */
const BOLUMLER = books
  .filter((book) => book.routePrefix === "adem" || book.routePrefix === "sit")
  .flatMap((book) =>
    book.chapters.map((chapter) => ({
      routeId: `${book.routePrefix}-${chapter.id}`,
      etiket: `${book.title} · ${chapter.id}. Bölüm — ${chapter.title}`,
    })),
  );

export default function OkumaKaydirmaliOnizleme() {
  const [routeId, setRouteId] = useState(BOLUMLER[0]?.routeId ?? "adem-1");
  const chapter = useMemo(() => adaptDataChapter(routeId), [routeId]);

  return (
    <div className={`tema-cocuk ${styles.kabuk}`}>
      <div className={styles.secici}>
        <label htmlFor="onizleme-bolum">
          <strong>Kaydırmalı okuma önizlemesi</strong>
          <span>İlerleme kaydedilmez; bu ekran yalnız tasarım incelemesi içindir.</span>
        </label>
        <select
          id="onizleme-bolum"
          value={routeId}
          onChange={(event) => setRouteId(event.target.value)}
        >
          {BOLUMLER.map((bolum) => (
            <option key={bolum.routeId} value={bolum.routeId}>
              {bolum.etiket}
            </option>
          ))}
        </select>
      </div>

      {chapter ? (
        <AtlasScrollReader
          key={chapter.id}
          chapter={chapter}
          onProgressSync={async () => ({ ok: true })}
        />
      ) : (
        <p className={styles.bosDurum}>Bu bölümün verisi bulunamadı.</p>
      )}
    </div>
  );
}
