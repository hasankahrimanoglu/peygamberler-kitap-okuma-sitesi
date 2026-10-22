"use client";

import {
  formatReportDate,
  type CompletedAdventureReport,
  type ReadingAdventureReport,
} from "../../lib/parent/report";
import { kitapKapagi, YEDEK } from "../../lib/varlikYollari";
import { goreliZaman } from "../../lib/zaman";
import { DurumCipi, IlerlemeCubugu, Kart, YedekliGorsel } from "../ui";

/**
 * Gelişim Raporu → Kitaplar (PROJE-MODELI 4.1/19). Önce okunan kitaplar
 * (ilerleme, kitapta gelinen bölüm, son okuma), ardından biten kitapların
 * final testi, madalya ve veli özeti kartları.
 */
export function RaporKitaplarSekmesi({
  okunanlar,
  bitenler,
}: {
  okunanlar: ReadingAdventureReport[];
  bitenler: CompletedAdventureReport[];
}) {
  if (okunanlar.length === 0 && bitenler.length === 0) {
    return (
      <Kart dolgu="genis" className="text-center">
        <p className="font-baslik font-bold text-murekkep">
          Henüz başlanmış bir kitap yok.
        </p>
        <p className="mt-2 text-base font-medium text-murekkep-soluk">
          Çocuk profilinden haritaya girerek ilk kitabı başlatabilirsiniz.
        </p>
      </Kart>
    );
  }

  return (
    <div className="space-y-8">
      {okunanlar.length > 0 ? (
        <section aria-labelledby="kitaplar-okunanlar" className="space-y-4">
          <h2 id="kitaplar-okunanlar" className="font-baslik text-xl font-bold text-murekkep">
            Okuduğu kitaplar
          </h2>
          {okunanlar.map((kitap) => {
            const sonOkuma = goreliZaman(kitap.updatedAt);
            return (
              <Kart key={kitap.bookKey}>
                <div className="flex gap-4">
                  <YedekliGorsel
                    src={kitapKapagi(kitap.bookKey)}
                    yedekSrc={YEDEK.kitapKapagi}
                    width={72}
                    height={108}
                    className="hidden h-[108px] w-[72px] shrink-0 rounded-buton border border-cizgi object-cover shadow-sm sm:block"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-baslik text-lg font-bold text-murekkep">
                        {kitap.bookTitle}
                      </h3>
                      <DurumCipi
                        durum="devam"
                        metin={kitap.finalPending ? "Final Testi Kaldı" : undefined}
                      />
                    </div>
                    <IlerlemeCubugu
                      className="mt-3"
                      yuzde={(kitap.completedCount / kitap.totalChapters) * 100}
                      etiket={`${kitap.completedCount} / ${kitap.totalChapters} bölüm`}
                      yuzdeGoster={false}
                    />
                    <p className="mt-3 text-base font-medium leading-7 text-murekkep">
                      Kitapta geldiği bölüm:{" "}
                      <span className="font-bold">
                        {kitap.lastChapter.number}. bölüm · {kitap.lastChapter.title}
                      </span>
                    </p>
                    {sonOkuma ? (
                      <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                        Son okuma: {sonOkuma}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Kart>
            );
          })}
        </section>
      ) : null}

      {bitenler.length > 0 ? (
        <section aria-labelledby="kitaplar-bitenler" className="space-y-4">
          <h2 id="kitaplar-bitenler" className="font-baslik text-xl font-bold text-murekkep">
            Bitirdiği kitaplar
          </h2>
          {bitenler.map((adventure) => {
            const wrongCount =
              adventure.finalScore === null
                ? null
                : Math.max(0, adventure.totalQuestions - adventure.finalScore);
            return (
              <Kart key={`${adventure.bookTitle}-${adventure.updatedAt}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-vurgu">
                      Kitap Yolculuğu
                    </p>
                    <h3 className="mt-1 font-baslik text-lg font-bold text-murekkep">
                      {adventure.bookTitle}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                      Yolculuk Günlüğü: {formatReportDate(adventure.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                      Bölüm
                    </p>
                    <p className="mt-1 font-baslik text-lg font-bold text-murekkep">
                      {adventure.completedCount}/{adventure.totalChapters}
                    </p>
                  </div>
                  <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                      Final Testi
                    </p>
                    <p className="mt-1 font-baslik text-base font-bold text-murekkep">
                      {adventure.finalScore === null || wrongCount === null
                        ? "Kayıt yok"
                        : `${adventure.finalScore} doğru · ${wrongCount} yanlış`}
                    </p>
                  </div>
                  <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                      Madalya
                    </p>
                    <p className="mt-1 text-base font-bold text-murekkep">
                      {adventure.medalName}
                    </p>
                  </div>
                </div>

                {/* Seçim verisi yetersizse özet yok (S5): veriye dayanmayan gözlem yazılmaz. */}
                {adventure.parentMessage ? (
                  <div className="mt-4 rounded-kart border border-eylem/25 bg-eylem-yumusak p-4">
                    <p className="text-base font-medium leading-7 text-murekkep">
                      {adventure.parentMessage}
                    </p>
                  </div>
                ) : null}
              </Kart>
            );
          })}
        </section>
      ) : null}

      {/* Veli bilgi notu (PROJE-MODELI 4.1/20): "kurgu" kelimesi bilerek kullanılmaz. */}
      <p className="text-sm font-medium leading-6 text-murekkep-soluk">
        Hikâyeler, çocukların daha iyi anlaması için canlı bir anlatımla yazılmıştır; Kur&apos;an ve
        hadislerde bildirilen bilgiler değiştirilmeden aktarılır.
      </p>
    </div>
  );
}
