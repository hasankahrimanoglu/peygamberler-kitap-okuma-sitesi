"use client";

import type { ParentFaqItem } from "../../data/books";
import { bolumKapagi } from "../../lib/varlikYollari";
import { Ikon, OdulIkonu } from "../ui";
import { SOHBET_ONERISI } from "./AnaSayfa";
import { useSeciliCocuk, useVeliPaneli } from "./baglam";
import { BolumBasligi, BosAile, Cip, CocukSecici, IkonKutusu, Kapak, Sahne, SayfaBasligi, Yukleniyor, Yuzey } from "./parcalar";
import { ilgiEki, okumaZamani, sohbetKitaplari, type SohbetKitabi } from "./veriler";
import styles from "./veliPaneli.module.css";

/**
 * Aile Sohbeti (PROJE-MODELI 3.9). Ürünün döngüsü okuma → düşünme → uygulama → aile içi
 * konuşmadır; bu içerik eskiden raporun beşinci sekmesindeydi, 22 Eki 2026'da
 * ana gezinmede kendi yerini aldı. Çocuğun seçtiği şık gösterilmez (4.1/19).
 */
export function Sohbet() {
  const { yukleniyor } = useVeliPaneli();
  const secim = useSeciliCocuk();
  if (yukleniyor) return <Yukleniyor />;
  if (!secim) {
    return (
      <div>
        <SayfaBasligi ust="Her bölümden bir soru" baslik="Aile Sohbeti" />
        <BosAile
          baslik="Önce bir çocuk profili"
          metin="Çocuğunuz bir bölümü bitirdiğinde o bölümün sorusu burada akşam sohbeti için bir başlangıca dönüşür."
        />
      </div>
    );
  }
  const { cocuk, gorunum } = secim;
  const kitaplar = sohbetKitaplari(gorunum);
  const okunanlar = kitaplar.filter((k) => !k.bitti && k.bolumler.length > 0);
  const bitenler = kitaplar.filter((k) => k.bitti);
  const oneCikan = okunanlar[0] ?? null;
  const sonBolum = oneCikan?.bolumler[0] ?? null;

  return (
    <div>
      <SayfaBasligi
        ust="Her bölümden bir soru"
        baslik="Aile Sohbeti"
        aciklama={`${ilgiEki(cocuk.isim)} bitirdiği bölümlerden akşam sohbeti için sorular ve kısa yönlendirmeler.`}
        sag={<CocukSecici />}
      />

      {kitaplar.length === 0 ? (
        <Yuzey className={`${styles.sohbetZemin} p-8 text-center sm:p-12`}>
          <span className="mx-auto block w-fit">
            <IkonKutusu ikon="sohbet" ton="sohbet" boyut={56} />
          </span>
          <h2 className="mt-5 font-veli-baslik text-[1.5rem] font-medium text-murekkep">İlk soru, ilk bölümden sonra</h2>
          <p className="mx-auto mt-2 max-w-md text-base leading-7 text-veli-govde">
            {cocuk.isim} bir bölümü bitirdiğinde o bölümün sorusu burada akşam sohbeti için bir başlangıca dönüşür.
          </p>
        </Yuzey>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
          <div className="space-y-8">
            {oneCikan && sonBolum ? (
              <Yuzey as="section" aria-labelledby="bu-aksam-icin" className={`${styles.sohbetZemin} overflow-hidden`}>
                <div className="relative aspect-[16/8] sm:aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/7]">
                  <Sahne src={bolumKapagi(oneCikan.bookKey, sonBolum.no)} className="absolute inset-0" />
                  <div className={`absolute inset-0 ${styles.sahneKarartma}`} />
                  <div className="absolute inset-x-5 bottom-4 flex flex-wrap items-center gap-2 sm:inset-x-8 sm:bottom-6">
                    <Cip ton="cam" ikon="sohbet">
                      Bu akşam için
                    </Cip>
                    {oneCikan.sonOkuma ? (
                      <Cip ton="cam" ikon="saat">
                        {okumaZamani(oneCikan.sonOkuma)} okudu
                      </Cip>
                    ) : null}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[0.9375rem] font-semibold text-veli-sohbet">
                    {oneCikan.baslik} · {sonBolum.no}. bölüm
                  </p>
                  <h2 id="bu-aksam-icin" className="mt-1 font-veli-baslik text-[1.5rem] font-medium leading-tight text-murekkep">
                    {sonBolum.baslik}
                  </h2>
                  {sonBolum.ozet ? (
                    <p className="mt-2 text-base leading-7 text-veli-govde">{sonBolum.ozet}</p>
                  ) : null}

                  {sonBolum.soru ? (
                    <div className="mt-6 rounded-[1.25rem] bg-white/70 p-5 sm:p-6">
                      <p className="text-sm font-semibold text-murekkep-soluk">Bölümde düşündüğü soru</p>
                      <p className="mt-2 font-veli-baslik text-[1.375rem] font-normal leading-[1.4] text-murekkep sm:text-[1.625rem]">
                        “{sonBolum.soru}”
                      </p>
                      <p className="mt-4 flex gap-3 border-t border-veli-sohbet/15 pt-4 text-[0.9375rem] leading-6 text-veli-govde">
                        <Ikon ad="kalp" boyut={18} className="mt-0.5 text-veli-sohbet" />
                        <span>
                          <span className="font-semibold text-murekkep">Akşam sohbeti için: </span>
                          {SOHBET_ONERISI}
                        </span>
                      </p>
                    </div>
                  ) : null}

                  <CocugunuzSorarsa sorular={oneCikan.sss} />
                </div>
              </Yuzey>
            ) : null}

            {okunanlar.length > 1 ? (
              <section aria-labelledby="diger-kitaplar">
                <BolumBasligi
                  id="diger-kitaplar"
                  baslik="Okuduğu diğer kitaplar"
                  aciklama="Her kitapta en son bitirdiği bölümün sorusu."
                />
                <div className="space-y-4">
                  {okunanlar.slice(1).map((kitap) => (
                    <SonBolumKarti key={kitap.bookKey} kitap={kitap} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5">
            {bitenler.length > 0 ? (
              <>
                <h2 className="font-veli-baslik text-[1.375rem] font-medium leading-tight text-murekkep">Kitap sonu sohbeti</h2>
                {bitenler.map((kitap) => (
                  <KitapSonuKarti key={kitap.bookKey} kitap={kitap} />
                ))}
              </>
            ) : (
              <Yuzey className="p-6">
                <h2 className="font-veli-baslik text-[1.25rem] font-medium text-murekkep">Kitap sonu sohbeti</h2>
                <p className="mt-2 text-base leading-7 text-veli-govde">
                  Bir kitabı bitirdiğinde bütün kitaba dair sorular ve kısa bir gözlem notu burada görünür.
                </p>
              </Yuzey>
            )}
            <p className="px-1 text-[0.875rem] leading-6 text-murekkep-soluk">
              Hikâyeler, çocukların daha iyi anlaması için canlı bir anlatımla yazılmıştır; Kur&apos;an ve hadislerde
              bildirilen bilgiler değiştirilmeden aktarılır.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

/**
 * Okunan bir kitabın yalnız son bitirilen bölümü (KARAR 19 Eki 2026, 4.1/19:
 * "yalnız son bölüm gösterilir"; tekrar okunan eski bölüm gösterilmez).
 */
function SonBolumKarti({ kitap }: { kitap: SohbetKitabi }) {
  const bolum = kitap.bolumler[0];
  if (!bolum) return null;
  const zaman = okumaZamani(kitap.sonOkuma);
  return (
    <Yuzey as="article" className="p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="w-11 shrink-0">
          <Kapak bookKey={kitap.bookKey} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-veli-baslik text-[1.25rem] font-medium leading-tight text-murekkep">{kitap.baslik}</h3>
          <p className="text-[0.875rem] text-murekkep-soluk">
            {bolum.no}. bölüm · {bolum.baslik}
            {zaman ? ` · ${zaman}` : ""}
          </p>
        </div>
      </div>
      {bolum.ozet ? <p className="mt-4 text-base leading-7 text-veli-govde">{bolum.ozet}</p> : null}
      {bolum.soru ? (
        <p className="mt-3 rounded-2xl bg-veli-sohbet-yumusak px-4 py-3 font-veli-baslik text-[1.125rem] leading-[1.5] text-murekkep">
          “{bolum.soru}”
        </p>
      ) : null}
      <CocugunuzSorarsa sorular={kitap.sss} />
    </Yuzey>
  );
}

function KitapSonuKarti({ kitap }: { kitap: SohbetKitabi }) {
  return (
    <Yuzey className="p-6">
      <div className="flex items-center gap-4">
        <OdulIkonu tip="madalya" anahtar={`hz-${kitap.bookKey}`} boyut={64} alt="" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-veli-altin-metin">Kitabı bitirdi</p>
          <h3 className="font-veli-baslik text-[1.25rem] font-medium leading-tight text-murekkep">{kitap.baslik}</h3>
        </div>
      </div>
      {kitap.gozlem ? (
        <div className="mt-5 rounded-2xl bg-eylem-yumusak p-4">
          <p className="text-sm font-semibold text-eylem-koyu">Kitap boyunca</p>
          <p className="mt-1 text-[0.9375rem] leading-6 text-murekkep">{kitap.gozlem}</p>
        </div>
      ) : null}
      {kitap.kitapSonuSorulari.length > 0 ? (
        <>
          <p className="mt-5 text-sm font-semibold text-murekkep-soluk">Akşam için sohbet başlatıcıları</p>
          <ol className="mt-2 space-y-2">
            {kitap.kitapSonuSorulari.slice(0, 3).map((soru, i) => (
              <li key={soru} className="flex gap-3 text-[0.9375rem] leading-6 text-murekkep">
                <span className="font-veli-baslik text-[1.0625rem] tabular-nums text-veli-sohbet">{i + 1}.</span>
                {soru}
              </li>
            ))}
          </ol>
        </>
      ) : null}
      <CocugunuzSorarsa sorular={kitap.sss} />
    </Yuzey>
  );
}

/** Kitabın "Çocuğunuz Sorarsa" yönlendirmeleri — kapalı açılır liste (canlı panelle aynı içerik). */
function CocugunuzSorarsa({ sorular }: { sorular: ParentFaqItem[] }) {
  if (sorular.length === 0) return null;
  return (
    <details className="group mt-5 rounded-[1.25rem] bg-yuzey-2/80">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 font-semibold text-murekkep">
          <Ikon ad="bilgi" boyut={17} className="text-veli-altin-metin" />
          Çocuğunuz sorarsa
          <span className="rounded-full bg-yuzey px-2 py-0.5 text-[0.8125rem] tabular-nums text-murekkep-soluk">
            {sorular.length}
          </span>
        </span>
        <Ikon
          ad="asagi"
          boyut={18}
          className="text-murekkep-soluk transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="space-y-2 px-3 pb-3">
        <p className="px-1 text-[0.875rem] leading-6 text-murekkep-soluk">
          Bu kitapta çocuğunuzun sorabileceği zor sorular ve sakin yaklaşım önerileri.
        </p>
        {sorular.map((faq) => (
          <div key={faq.question} className="rounded-2xl bg-yuzey p-4">
            <p className="font-semibold leading-snug text-murekkep">{faq.question}</p>
            <p className="mt-1.5 text-[0.9375rem] leading-6 text-veli-govde">{faq.approach}</p>
          </div>
        ))}
      </div>
    </details>
  );
}

export { CocugunuzSorarsa };
