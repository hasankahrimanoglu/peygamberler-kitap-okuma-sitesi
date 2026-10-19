"use client";

import type { ParentFaqItem } from "../../data/books";
import type {
  CompletedAdventureReport,
  ReadingAdventureReport,
} from "../../lib/parent/report";
import { goreliZaman } from "../../lib/zaman";
import { Ikon, Kart } from "../ui";

/** Bütün bölümlerde aynı sabit öneri (PROJE-MODELI 4.1/19). */
const SOHBET_ONERISI =
  "Bu soruyu ona siz de sorun ve cevabını dinleyin. Sonra hikâyede ne olduğunu birlikte hatırlayabilirsiniz.";

/**
 * Gelişim Raporu → Sohbet Önerileri (PROJE-MODELI 4.1/19). Önce okunan
 * kitaplar: kitapta ulaşılan son bölüm ve o bölümün "Sen Olsaydın" sorusu
 * sohbet başlatıcı olur. Ardından biten kitapların kitap sonu soruları.
 * Çocuğun seçtiği şık gösterilmez.
 */
export function RaporSohbetSekmesi({
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
          Sohbet önerileri, çocuğunuz ilk bölümü bitirince burada görünür.
        </p>
        <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
          Her bölümden sonra o bölümün sorusu akşam sohbeti için bir başlangıca dönüşür.
        </p>
      </Kart>
    );
  }

  return (
    <div className="space-y-8">
      {okunanlar.length > 0 ? (
        <section aria-labelledby="sohbet-okunanlar" className="space-y-4">
          <h2 id="sohbet-okunanlar" className="font-baslik text-xl font-bold text-murekkep">
            Okuduğu kitaplar
          </h2>
          {okunanlar.map((kitap) => (
            <OkunanKitapKarti key={kitap.bookKey} kitap={kitap} />
          ))}
        </section>
      ) : null}

      {bitenler.length > 0 ? (
        <section aria-labelledby="sohbet-bitenler" className="space-y-4">
          <h2 id="sohbet-bitenler" className="font-baslik text-xl font-bold text-murekkep">
            Bitirdiği kitaplar
          </h2>
          {bitenler.map((adventure) => (
            <Kart key={`sohbet-${adventure.bookTitle}-${adventure.updatedAt}`}>
              <h3 className="font-baslik text-lg font-bold text-murekkep">
                {adventure.bookTitle}
              </h3>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-vurgu">
                <Ikon ad="dusunce" boyut={16} />
                Akşam İçin Sohbet Başlatıcıları
              </p>
              <div className="mt-2 grid gap-2">
                {adventure.chatQuestions.slice(0, 3).map((question) => (
                  <p
                    key={question}
                    className="rounded-buton bg-yuzey-2 px-4 py-3 text-base font-medium leading-7 text-murekkep"
                  >
                    {question}
                  </p>
                ))}
              </div>

              <CocugunuzSorarsa sorular={adventure.parentFaq} />
            </Kart>
          ))}
        </section>
      ) : null}
    </div>
  );
}

function OkunanKitapKarti({ kitap }: { kitap: ReadingAdventureReport }) {
  const sonOkuma = goreliZaman(kitap.updatedAt);
  const { lastChapter } = kitap;

  return (
    <Kart>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-baslik text-lg font-bold text-murekkep">{kitap.bookTitle}</h3>
        <p className="text-sm font-semibold text-murekkep-soluk">
          {kitap.completedCount} / {kitap.totalChapters} bölüm
          {sonOkuma ? ` · Son okuma: ${sonOkuma}` : ""}
        </p>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-vurgu">
          <Ikon ad="kitap" boyut={16} />
          Kitapta geldiği bölüm
        </p>
        <p className="mt-1 font-baslik text-base font-bold text-murekkep">
          {lastChapter.number}. bölüm · {lastChapter.title}
        </p>
        {lastChapter.summary ? (
          <p className="mt-1 text-base font-medium leading-7 text-murekkep-soluk">
            {lastChapter.summary}
          </p>
        ) : null}
      </div>

      {lastChapter.question ? (
        <div className="mt-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-vurgu">
            <Ikon ad="dusunce" boyut={16} />
            Bu bölümde düşündüğü soru
          </p>
          <blockquote className="mt-2 rounded-buton border-l-4 border-vurgu bg-vurgu-yumusak px-4 py-3 text-base font-semibold leading-7 text-murekkep">
            {lastChapter.question}
          </blockquote>
          <p className="mt-3 text-base font-medium leading-7 text-murekkep">
            <span className="font-bold">Akşam sohbeti için:</span> {SOHBET_ONERISI}
          </p>
        </div>
      ) : null}

      <CocugunuzSorarsa sorular={kitap.parentFaq} />
    </Kart>
  );
}

/** Kitabın "Çocuğunuz Sorarsa" yönlendirmeleri — kapalı açılır liste. */
function CocugunuzSorarsa({ sorular }: { sorular: ParentFaqItem[] }) {
  if (sorular.length === 0) return null;

  return (
    <details className="group mt-4 rounded-kart border border-cizgi bg-yuzey-2">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-kart px-4 py-2 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-base font-semibold text-murekkep">
          <Ikon ad="kalp" boyut={16} className="text-vurgu" />
          Çocuğunuz Sorarsa
          <span className="rounded-full bg-yuzey px-2 py-0.5 text-sm font-bold text-murekkep-soluk">
            {sorular.length}
          </span>
        </span>
        <Ikon
          ad="asagi"
          boyut={18}
          className="text-murekkep-soluk transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="space-y-2 border-t border-cizgi p-3">
        <p className="px-1 text-sm font-medium leading-6 text-murekkep-soluk">
          Bu kitapta çocuğunuzun sorabileceği zor sorular ve sakin yaklaşım önerileri.
        </p>
        {sorular.map((faq) => (
          <div key={faq.question} className="rounded-buton bg-yuzey p-3">
            <p className="text-base font-bold text-murekkep">{faq.question}</p>
            <p className="mt-1 text-base font-medium leading-7 text-murekkep-soluk">
              {faq.approach}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}
