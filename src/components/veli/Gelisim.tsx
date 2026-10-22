"use client";

import { madalyaVitrini, rozetVitrini, unvanVitrini } from "../../lib/derive";
import { formatReportDate } from "../../lib/parent/report";
import { Ikon, OdulIkonu } from "../ui";
import { useSeciliCocuk, useVeliPaneli, type GelisimSekmesi } from "./baglam";
import {
  BolumBasligi,
  BolumYolu,
  BosAile,
  Cip,
  CocukSecici,
  CocukYuzu,
  IkonKutusu,
  Kapak,
  SayfaBasligi,
  Sekmeler,
  Yukleniyor,
  Yuzey,
} from "./parcalar";
import { okumaZamani, type CocukGorunumu, type Yolculuk } from "./veriler";

/**
 * Gelişim (PROJE-MODELI 3.9) — eski Gelişim Raporu ile Ödüller sayfasını
 * çocuk başına tek yerde toplar: Kitaplar · Ödüller · Görevler. Sohbet
 * önerileri kendi sayfasına taşındı. Rapor dili gözlem bildirir.
 */
export function Gelisim() {
  const { gelisimSekmesi, setGelisimSekmesi, aile, yukleniyor } = useVeliPaneli();
  const secim = useSeciliCocuk();
  if (yukleniyor) return <Yukleniyor />;
  if (!secim) {
    return (
      <div>
        <SayfaBasligi baslik="Gelişim" aciklama="Kitap yolculuğu, ödüller ve görevler." />
        <BosAile
          baslik="Önce bir çocuk profili"
          metin="Profil eklendikten sonra çocuğunuzun okuduğu kitaplar, rozetleri ve görevleri burada görünür."
        />
      </div>
    );
  }
  const { cocuk, gorunum } = secim;
  const ilerleme = aile.ilerleme[cocuk.id] ?? [];
  const rozetSayisi = rozetVitrini(aile.kitaplar, ilerleme).filter((r) => r.kazanildi).length;
  const madalyaSayisi = madalyaVitrini(aile.kitaplar, ilerleme).filter((m) => m.kazanildi).length;

  return (
    <div>
      <SayfaBasligi baslik="Gelişim" aciklama="Kitap yolculuğu, ödüller ve görevler." sag={<CocukSecici />} />

      <ProfilSeridi g={gorunum} />

      <div className="mb-6 mt-8">
        <Sekmeler<GelisimSekmesi>
          etiket="Gelişim bölümleri"
          deger={gelisimSekmesi}
          onDegis={setGelisimSekmesi}
          secenekler={[
            { deger: "kitaplar", etiket: "Kitaplar", sayi: gorunum.yolculuklar.length },
            { deger: "oduller", etiket: "Ödüller", sayi: rozetSayisi + madalyaSayisi },
            { deger: "gorevler", etiket: "Görevler", sayi: gorunum.gorevler.length },
          ]}
        />
      </div>

      <div role="tabpanel">
        {gelisimSekmesi === "kitaplar" ? <KitaplarSekmesi g={gorunum} /> : null}
        {gelisimSekmesi === "oduller" ? <OdullerSekmesi g={gorunum} /> : null}
        {gelisimSekmesi === "gorevler" ? <GorevlerSekmesi g={gorunum} /> : null}
      </div>
    </div>
  );
}

function ProfilSeridi({ g }: { g: CocukGorunumu }) {
  const { perdeAc } = useVeliPaneli();
  const sonOkuma = okumaZamani(g.ozet.sonAktiviteZamani);
  const unvanlar = unvanVitrini(g.ozet.tamamlananKitap);
  const guncel = unvanlar.find((u) => u.guncelMi);
  const siradaki = unvanlar.find((u) => !u.kazanildi);
  const yolAldigi = g.yolculuklar.length;

  return (
    <Yuzey className="overflow-hidden">
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:p-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <CocukYuzu cocuk={g.cocuk} boyut={76} halka="yok" />
          <div className="min-w-0">
            <h2 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-veli-baslik text-[1.875rem] font-medium leading-none tracking-[-0.01em] text-murekkep">
              {g.cocuk.isim}
              <button
                type="button"
                onClick={() => perdeAc({ tur: "profil", cocukId: g.cocuk.id })}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-veli-govde text-[0.875rem] font-semibold tracking-normal text-murekkep-soluk transition-colors hover:bg-murekkep/5 hover:text-murekkep"
              >
                <Ikon ad="kalem" boyut={15} />
                Profili düzenle
              </button>
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-6 text-veli-govde">
              {yolAldigi > 0
                ? `${yolAldigi} kitapta yol aldı${g.ozet.tamamlananKitap > 0 ? `, ${g.ozet.tamamlananKitap} kitabı bitirdi` : ""}.`
                : "Henüz bir kitaba başlamadı."}
              {sonOkuma ? ` Son okuma ${sonOkuma}.` : ""}
            </p>
          </div>
        </div>

        {guncel ? (
          <button
            type="button"
            onClick={() =>
              perdeAc({
                tur: "odul",
                odul: "unvan",
                anahtar: guncel.iconKey,
                ad: guncel.unvan,
                alt: guncel.kitapEsik === 0 ? "İlk unvan" : `${guncel.kitapEsik} kitap bitirince kazanılır`,
                kazanildi: true,
              })
            }
            className="flex items-center gap-4 rounded-[1.25rem] bg-vurgu-yumusak/70 p-3 pr-5 text-left transition-colors hover:bg-vurgu-yumusak"
          >
            <OdulIkonu tip="unvan" anahtar={guncel.iconKey} boyut={64} alt="" />
            <span>
              <span className="block text-[0.8125rem] font-semibold text-veli-altin-metin">Güncel unvanı</span>
              <span className="block font-veli-baslik text-[1.25rem] font-medium leading-tight text-murekkep">
                {guncel.unvan}
              </span>
              {siradaki ? (
                <span className="mt-0.5 block text-[0.8125rem] text-murekkep-soluk">
                  Sıradaki: {siradaki.unvan} ({siradaki.kitapEsik} kitap)
                </span>
              ) : null}
            </span>
          </button>
        ) : null}
      </div>
    </Yuzey>
  );
}

// --- Kitaplar ---

function KitaplarSekmesi({ g }: { g: CocukGorunumu }) {
  const okunanlar = g.yolculuklar.filter((y) => !y.bitti);
  const bitenler = g.yolculuklar.filter((y) => y.bitti);

  if (g.yolculuklar.length === 0) {
    return (
      <Yuzey className="p-8 text-center sm:p-12">
        <span className="mx-auto block w-fit">
          <IkonKutusu ikon="kitap" ton="gece" boyut={56} />
        </span>
        <h3 className="mt-5 font-veli-baslik text-[1.5rem] font-medium text-murekkep">Yolculuk henüz başlamadı</h3>
        <p className="mx-auto mt-2 max-w-md text-base leading-7 text-veli-govde">
          {g.cocuk.isim} ilk bölümü bitirdiğinde okuduğu kitap, geldiği bölüm ve rozetleri burada görünür.
        </p>
      </Yuzey>
    );
  }

  return (
    <div className="space-y-10">
      {okunanlar.length > 0 ? (
        <section aria-labelledby="okudugu">
          <BolumBasligi id="okudugu" baslik="Okuduğu kitaplar" />
          <div className="grid gap-5 xl:grid-cols-2">
            {okunanlar.map((y) => (
              <OkunanKitap key={y.bookKey} y={y} />
            ))}
          </div>
        </section>
      ) : null}

      {bitenler.length > 0 ? (
        <section aria-labelledby="bitirdigi">
          <BolumBasligi id="bitirdigi" baslik="Bitirdiği kitaplar" />
          <div className="space-y-5">
            {bitenler.map((y) => (
              <BitenKitap key={y.bookKey} y={y} g={g} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="flex gap-2.5 text-[0.875rem] leading-6 text-murekkep-soluk">
        <Ikon ad="bilgi" boyut={17} className="mt-0.5" />
        Hikâyeler, çocukların daha iyi anlaması için canlı bir anlatımla yazılmıştır; Kur&apos;an ve hadislerde
        bildirilen bilgiler değiştirilmeden aktarılır.
      </p>
    </div>
  );
}

function OkunanKitap({ y }: { y: Yolculuk }) {
  const sonOkuma = okumaZamani(y.sonOkuma);
  return (
    <Yuzey as="article" className="p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[96px_minmax(0,1fr)]">
        <div className="hidden sm:block">
          <Kapak bookKey={y.bookKey} alt={`${y.baslik} kapağı`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-veli-baslik text-[1.375rem] font-medium leading-tight text-murekkep">{y.baslik}</h3>
              <p className="text-[0.9375rem] text-murekkep-soluk">{y.altBaslik}</p>
            </div>
            <span className="shrink-0 pt-1 text-[0.9375rem] font-semibold tabular-nums text-veli-govde">
              {y.tamamlanan} / {y.toplam}
            </span>
          </div>
          <BolumYolu toplam={y.toplam} tamamlanan={y.tamamlanan} className="mt-4" />
          <dl className="mt-4 space-y-1.5 text-[0.9375rem] leading-6">
            {y.sonBolum ? (
              <div className="flex gap-1.5">
                <dt className="shrink-0 text-murekkep-soluk">Son bitirdiği:</dt>
                <dd className="font-semibold text-murekkep">
                  {y.sonBolum.no}. {y.sonBolum.baslik}
                </dd>
              </div>
            ) : null}
            {y.siradaki ? (
              <div className="flex gap-1.5">
                <dt className="shrink-0 text-murekkep-soluk">Sıradaki:</dt>
                <dd className="text-veli-govde">
                  {y.siradaki.no}. {y.siradaki.baslik}
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {y.finalBekliyor ? (
              <Cip ton="altin" ikon="madalya">
                Büyük Final Testi sırada
              </Cip>
            ) : null}
            {sonOkuma ? (
              <Cip ton="notr" ikon="saat">
                Son okuma {sonOkuma}
              </Cip>
            ) : null}
          </div>
        </div>
      </div>

      <details className="group mt-5 border-t border-cizgi pt-1">
        <summary className="-mx-2 flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-2 font-semibold text-murekkep [&::-webkit-details-marker]:hidden">
          Bölümler ve rozetler
          <Ikon ad="asagi" boyut={18} className="text-murekkep-soluk transition-transform group-open:rotate-180" />
        </summary>
        <ol className="mt-1 space-y-1">
          {y.bolumler.map((b) => {
            const bitti = b.no <= y.tamamlanan;
            const siradaki = b.no === y.tamamlanan + 1;
            return (
              <li key={b.no} className="flex min-h-12 items-center gap-3">
                <span className={bitti ? "" : "opacity-40 saturate-50"}>
                  <OdulIkonu tip="rozet" anahtar={b.rozetAnahtari} boyut={36} alt="" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[0.9375rem] leading-snug ${bitti ? "font-semibold text-murekkep" : "text-veli-govde"}`}>
                    {b.no}. {b.baslik}
                  </span>
                  {bitti ? <span className="block text-[0.8125rem] text-murekkep-soluk">{b.rozetAdi}</span> : null}
                </span>
                {bitti ? (
                  <Ikon ad="onay" boyut={18} className="text-eylem-koyu" />
                ) : siradaki ? (
                  <Cip ton="altin">Sıradaki</Cip>
                ) : null}
              </li>
            );
          })}
        </ol>
      </details>
    </Yuzey>
  );
}

function BitenKitap({ y, g }: { y: Yolculuk; g: CocukGorunumu }) {
  const rapor = g.rapor.completedAdventures.find((a) => a.bookTitle === y.baslik);
  return (
    <Yuzey as="article" className="overflow-hidden">
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center lg:p-8">
        <div className="flex items-center gap-4 md:flex-col md:items-center md:px-2">
          <OdulIkonu tip="madalya" anahtar={`hz-${y.bookKey}`} boyut={96} alt={`${y.baslik} Yolculuk Madalyası`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-veli-altin-metin">{y.baslik} Yolculuk Madalyası</p>
          <h3 className="mt-0.5 font-veli-baslik text-[1.5rem] font-medium leading-tight text-murekkep">{y.baslik}</h3>
          <p className="mt-1 text-[0.9375rem] text-murekkep-soluk">
            {y.toplam} bölüm · {formatReportDate(y.sonOkuma)}
            {rapor?.finalScore !== null && rapor?.finalScore !== undefined
              ? ` · Büyük Final Testi: ${rapor.finalScore} / ${rapor.totalQuestions} doğru`
              : ""}
          </p>
          {rapor?.parentMessage ? (
            <blockquote className="mt-4 rounded-[1.25rem] bg-eylem-yumusak p-4 sm:p-5">
              <p className="text-sm font-semibold text-eylem-koyu">Kitap boyunca</p>
              <p className="mt-1 text-base leading-7 text-murekkep">{rapor.parentMessage}</p>
            </blockquote>
          ) : null}
        </div>
      </div>
    </Yuzey>
  );
}

// --- Ödüller ---

function OdullerSekmesi({ g }: { g: CocukGorunumu }) {
  const { aile, perdeAc } = useVeliPaneli();
  const ilerleme = aile.ilerleme[g.cocuk.id] ?? [];
  const rozetler = rozetVitrini(aile.kitaplar, ilerleme);
  const madalyalar = madalyaVitrini(aile.kitaplar, ilerleme);
  const unvanlar = unvanVitrini(g.ozet.tamamlananKitap);
  // Yalnız başlanan kitapların rozetleri; 216 kilitli rozetlik duvar yok.
  const baslananlar = g.yolculuklar.map((y) => y.bookKey);
  const gorunenMadalyalar = madalyalar.filter((m) => baslananlar.includes(m.bookKey));

  return (
    <div className="space-y-10">
      <section aria-labelledby="unvan-yolu">
        <BolumBasligi id="unvan-yolu" baslik="Unvan yolu" aciklama="Unvan, bitirilen kitap sayısıyla gelir." />
        <Yuzey className="overflow-x-auto scrollbar-none">
          <ol className="flex min-w-max gap-2 p-4 sm:p-5">
            {unvanlar.map((u) => (
              <li key={u.unvan}>
                <button
                  type="button"
                  onClick={() =>
                    perdeAc({
                      tur: "odul",
                      odul: "unvan",
                      anahtar: u.iconKey,
                      ad: u.unvan,
                      alt: u.kitapEsik === 0 ? "İlk unvan" : `${u.kitapEsik} kitap bitirince kazanılır`,
                      kazanildi: u.kazanildi,
                    })
                  }
                  className={`flex w-[104px] flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition-colors hover:bg-yuzey-2 ${
                    u.guncelMi ? "bg-vurgu-yumusak/70" : ""
                  }`}
                >
                  <span className={u.kazanildi ? "" : "opacity-40 saturate-50"}>
                    <OdulIkonu tip="unvan" anahtar={u.iconKey} boyut={64} alt="" />
                  </span>
                  <span className={`text-[0.8125rem] font-semibold leading-tight ${u.kazanildi ? "text-murekkep" : "text-murekkep-soluk"}`}>
                    {u.unvan}
                  </span>
                  <span className="text-[0.75rem] tabular-nums text-murekkep-soluk">
                    {u.guncelMi ? "Şimdiki" : u.kitapEsik === 0 ? "Başlangıç" : `${u.kitapEsik} kitap`}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Yuzey>
      </section>

      {gorunenMadalyalar.length > 0 ? (
        <section aria-labelledby="madalyalar">
          <BolumBasligi id="madalyalar" baslik="Madalyalar" aciklama="Kitap ve Büyük Final Testi bitince kazanılır." />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {gorunenMadalyalar.map((m) => (
              <li key={m.bookKey}>
                <button
                  type="button"
                  onClick={() =>
                    perdeAc({
                      tur: "odul",
                      odul: "madalya",
                      anahtar: m.iconKey,
                      ad: m.ad,
                      alt: m.kazanildi ? "Kitabı ve Büyük Final Testi'ni bitirdi" : "Kitap bitince kazanılır",
                      kazanildi: m.kazanildi,
                    })
                  }
                  className="w-full"
                >
                  <Yuzey etkilesimli className="flex flex-col items-center p-5 text-center">
                    <span className={m.kazanildi ? "" : "opacity-40 saturate-50"}>
                      <OdulIkonu tip="madalya" anahtar={m.iconKey} boyut={88} alt="" />
                    </span>
                    <span className="mt-3 font-semibold leading-snug text-murekkep">{m.bookIsim}</span>
                    <span className="mt-0.5 text-[0.8125rem] text-murekkep-soluk">
                      {m.kazanildi ? "Kazandı" : "Kitap bitince"}
                    </span>
                  </Yuzey>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="rozetler">
        <BolumBasligi id="rozetler" baslik="Rozetler" aciklama="Her bölüm bitince bir rozet." />
        {baslananlar.length === 0 ? (
          <Yuzey className="p-6 text-base leading-7 text-veli-govde">İlk rozet, ilk bölüm bitince burada görünür.</Yuzey>
        ) : (
          <div className="space-y-5">
            {g.yolculuklar.map((y) => {
              const kitapRozetleri = rozetler.filter((r) => r.bookKey === y.bookKey);
              return (
                <Yuzey key={y.bookKey} className="p-5 sm:p-6">
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-veli-baslik text-[1.25rem] font-medium text-murekkep">{y.baslik}</h3>
                    <span className="text-[0.9375rem] font-semibold tabular-nums text-veli-govde">
                      {y.tamamlanan} / {y.toplam} rozet
                    </span>
                  </div>
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
                    {kitapRozetleri.map((r) => (
                      <li key={r.iconKey}>
                        <button
                          type="button"
                          onClick={() =>
                            perdeAc({
                              tur: "odul",
                              odul: "rozet",
                              anahtar: r.iconKey,
                              ad: r.ad,
                              alt: `${r.bookIsim} · ${r.bolumNo}. bölüm`,
                              kazanildi: r.kazanildi,
                            })
                          }
                          className="flex w-full flex-col items-center gap-1.5 rounded-2xl p-2 text-center transition-colors hover:bg-yuzey-2"
                        >
                          <span className={r.kazanildi ? "" : "opacity-35 saturate-50"}>
                            <OdulIkonu tip="rozet" anahtar={r.iconKey} boyut={68} alt="" />
                          </span>
                          <span
                            className={`line-clamp-2 text-[0.75rem] font-semibold leading-tight ${
                              r.kazanildi ? "text-murekkep" : "text-murekkep-soluk"
                            }`}
                          >
                            {r.kazanildi ? r.ad : `${r.bolumNo}. bölüm`}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Yuzey>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

// --- Görevler ---

function GorevlerSekmesi({ g }: { g: CocukGorunumu }) {
  const listede = g.gorevler.filter((x) => x.status === "eklendi");
  const tamam = g.gorevler.filter((x) => x.status === "tamamlandi");

  if (g.gorevler.length === 0) {
    return (
      <Yuzey className="p-8 text-center sm:p-12">
        <span className="mx-auto block w-fit">
          <IkonKutusu ikon="fidan" ton="eylem" boyut={56} />
        </span>
        <h3 className="mt-5 font-veli-baslik text-[1.5rem] font-medium text-murekkep">Listede görev yok</h3>
        <p className="mx-auto mt-2 max-w-md text-base leading-7 text-veli-govde">
          &quot;Bugüne Taşı&quot; görevleri gönüllüdür. {g.cocuk.isim} okurken bir görevi listesine eklerse burada
          durumuyla birlikte görünür.
        </p>
      </Yuzey>
    );
  }

  const grup = (baslik: string, liste: typeof g.gorevler, id: string) =>
    liste.length === 0 ? null : (
      <section aria-labelledby={id}>
        <BolumBasligi id={id} baslik={`${baslik} · ${liste.length}`} />
        <div className="grid gap-4 xl:grid-cols-2">
          {liste.map((gorev) => {
            const bitti = gorev.status === "tamamlandi";
            return (
              <Yuzey as="article" key={gorev.gorev.id} className="flex gap-4 p-5 sm:p-6">
                <IkonKutusu ikon={bitti ? "onay" : "fidan"} ton="eylem" boyut={48} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-veli-baslik text-[1.1875rem] font-medium leading-snug text-murekkep">{gorev.gorev.ad}</h3>
                  <p className="mt-0.5 text-[0.875rem] text-murekkep-soluk">
                    {gorev.bookTitle} · {gorev.bolumNo}. bölüm · {gorev.gorev.kategori}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-6 text-veli-govde">{gorev.gorev.aciklama.split("\n")[0]}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Cip ton={bitti ? "eylem" : "notr"} ikon={bitti ? "onay" : "saat"}>
                      {bitti && gorev.completedAt
                        ? `Tamamladı · ${formatReportDate(gorev.completedAt)}`
                        : `Listesine ekledi · ${formatReportDate(gorev.addedAt)}`}
                    </Cip>
                    {gorev.gorev.sure ? <Cip ton="notr">{gorev.gorev.sure}</Cip> : null}
                  </div>
                </div>
              </Yuzey>
            );
          })}
        </div>
      </section>
    );

  return (
    <div className="space-y-10">
      {grup("Listesinde", listede, "gorev-listede")}
      {grup("Tamamladı", tamam, "gorev-tamam")}
      <p className="flex gap-2.5 text-[0.875rem] leading-6 text-murekkep-soluk">
        <Ikon ad="bilgi" boyut={17} className="mt-0.5" />
        Görevler gönüllüdür ve çocuğun kendi bildirimidir; tamamlanmamış bir görev bir eksiklik değildir.
      </p>
    </div>
  );
}
