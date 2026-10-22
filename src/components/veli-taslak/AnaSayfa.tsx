"use client";

import { useMemo, useState } from "react";
import { Buton, Ikon, OdulIkonu } from "../ui";
import { bolumKapagi } from "../../lib/varlikYollari";
import { katalogKitaplari } from "../../lib/derive";
import { useTaslak } from "./baglam";
import {
  BolumBasligi,
  BolumYolu,
  Cip,
  CocukYuzu,
  DevamBaglantisi,
  IkonKutusu,
  Kapak,
  Sahne,
  Yuzey,
} from "./parcalar";
import {
  aileCumleleri,
  bugununTarihi,
  ilgiEki,
  ilkKitap,
  okumaZamani,
  selamlama,
  sonGelismeler,
  type CocukGorunumu,
} from "./veriler";
import styles from "./veliTaslak.module.css";

/** Bütün bölümlerde aynı sabit öneri (PROJE-MODELI 4.1/19) — canlı panelle aynı metin. */
export const SOHBET_ONERISI =
  "Bu soruyu ona siz de sorun ve cevabını dinleyin. Sonra hikâyede ne olduğunu birlikte hatırlayabilirsiniz.";

/**
 * Ana Sayfa (TASLAK). Sıra velinin dört sorusunu izler (PROJE-MODELI 3.8):
 * ne oldu (karşılama) → nerede kaldı, sıradaki ne (çocuk kartı) → bu akşam
 * ne konuşalım (sohbet) → son kazanımı ne (gelişmeler). Puan, oran ve kardeş
 * kıyası yok.
 */
export function AnaSayfa() {
  const { aile, gorunumler } = useTaslak();

  if (aile.cocuklar.length === 0) return <IlkKurulum />;

  return (
    <div className="space-y-8 lg:space-y-10">
      <Karsilama />

      <section aria-labelledby="cocuklar-baslik">
        <BolumBasligi id="cocuklar-baslik" baslik={gorunumler.length > 1 ? "Çocuklarınız" : "Okuma yolculuğu"} />
        <div className="space-y-5">
          {gorunumler.map((g) => (
            <CocukKarti key={g.cocuk.id} g={g} />
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <BuAksamSohbeti />
        </div>
        <div className="xl:col-span-5">
          <SonGelismeler />
        </div>
      </div>

      <SonEklenenler />
      <ProfilEkleSatiri />
    </div>
  );
}

// --- Karşılama ---

function Karsilama() {
  const { gorunumler, perdeAc } = useTaslak();
  const cumleler = aileCumleleri(gorunumler);

  // Sağdaki raf: çocukların en son okuduğu kitaplar (tekrarsız, en fazla üç).
  const raf = useMemo(() => {
    const gorulen = new Set<string>();
    return gorunumler
      .flatMap((g) => g.yolculuklar)
      .sort((a, b) => Date.parse(b.sonOkuma ?? "0") - Date.parse(a.sonOkuma ?? "0"))
      .filter((y) => (gorulen.has(y.bookKey) ? false : (gorulen.add(y.bookKey), true)))
      .slice(0, 3);
  }, [gorunumler]);

  const sohbetVar = gorunumler.some((g) => g.aktif?.sonBolum?.soru);

  return (
    <section
      aria-label="Karşılama"
      className={`${styles.gokyuzu} rounded-[1.75rem] px-5 pb-7 pt-7 shadow-[0_30px_60px_-30px_rgb(18_27_64/0.6)] sm:px-8 sm:pb-9 sm:pt-9 lg:px-12 lg:py-12`}
    >
      <span className={`${styles.hilal} ${raf.length > 0 ? "md:hidden" : ""}`} style={{ top: 26, right: 26 }} aria-hidden="true" />
      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-medium text-vt-gece-soluk first-letter:uppercase">{bugununTarihi()}</p>
          <h1 className="mt-2 font-vt-baslik text-[2.625rem] font-normal leading-[1.02] tracking-[-0.025em] sm:text-[3.25rem] lg:text-[3.75rem]">
            {selamlama()}
            <span className="text-vt-altin-acik">.</span>
          </h1>
          <ul className="mt-5 max-w-xl space-y-3">
            {gorunumler.map((g, i) => (
              <li key={g.cocuk.id} className="flex items-start gap-3 text-[1.0625rem] leading-7 text-vt-gece-metin/95">
                <span className="mt-0.5">
                  <CocukYuzu cocuk={g.cocuk} boyut={28} halka="yok" />
                </span>
                {cumleler[i]}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            {sohbetVar ? (
              <Buton
                varyant="altin"
                onClick={() => document.getElementById("bu-aksam")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                <Ikon ad="sohbet" boyut={19} />
                Bu Akşamın Sohbeti
              </Buton>
            ) : null}
            <button
              type="button"
              onClick={() => perdeAc({ tur: "cihaz" })}
              className="inline-flex h-12 items-center gap-2 rounded-buton px-5 text-base font-semibold text-vt-gece-metin shadow-[inset_0_0_0_1px_rgb(245_239_226/0.28)] transition-colors hover:bg-white/10 lg:hidden"
            >
              <Ikon ad="tablet" boyut={19} />
              Çocuk Ekranına Geç
            </button>
          </div>
        </div>

        {raf.length > 0 ? (
          <div aria-hidden="true" className="relative mx-auto hidden h-[230px] w-[260px] md:block lg:h-[260px] lg:w-[300px]">
            <span className="absolute inset-x-6 bottom-2 h-16 rounded-full bg-vt-altin-acik/30 blur-2xl" />
            {raf.map((y, i) => {
              const konum = [
                "left-1/2 top-0 z-30 -translate-x-1/2 rotate-0",
                "left-0 top-6 z-20 -rotate-[9deg]",
                "right-0 top-6 z-10 rotate-[9deg]",
              ][i];
              return (
                <div key={y.bookKey} className={`absolute w-[120px] lg:w-[138px] ${konum}`}>
                  <Kapak bookKey={y.bookKey} className="ring-1 ring-white/10" />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

// --- Çocuk kartı ---

function CocukKarti({ g }: { g: CocukGorunumu }) {
  const { perdeAc, git } = useTaslak();
  const { cocuk, ozet, aktif, guncelGorev } = g;
  const sonOkuma = okumaZamani(ozet.sonAktiviteZamani);
  const ilk = ilkKitap();
  const sahne = aktif ? aktif.sahne : ilk ? bolumKapagi(ilk.bookKey, 1) : "";

  return (
    <Yuzey as="article" className="overflow-hidden lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="relative aspect-[16/10] sm:aspect-[16/7] lg:aspect-auto lg:min-h-[360px]">
        <Sahne src={sahne} alt="" className="absolute inset-0" />
        <div className={`absolute inset-0 ${styles.sahneKarartma}`} />
        {sonOkuma ? (
          <Cip ton="cam" ikon="saat" className="absolute left-4 top-4 sm:left-5 sm:top-5">
            Son okuma {sonOkuma}
          </Cip>
        ) : null}
        <div className="absolute inset-x-4 bottom-4 flex items-end gap-3.5 sm:inset-x-5 sm:bottom-5 lg:inset-x-6 lg:bottom-6">
          <CocukYuzu cocuk={cocuk} boyut={60} />
          <div className="min-w-0 pb-0.5 text-white">
            <h3 className="font-vt-baslik text-[1.875rem] font-medium leading-none tracking-[-0.01em]">{cocuk.isim}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-[0.9375rem] font-semibold text-vt-altin-acik">
              <Ikon ad="yildiz" boyut={14} />
              {ozet.unvan}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 sm:p-6 lg:p-8">
        {aktif ? (
          <>
            <p className="text-sm font-semibold text-murekkep-soluk">
              {aktif.bitti ? "En son bitirdiği kitap" : "Şu an okuduğu kitap"}
            </p>
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <h4 className="font-vt-baslik text-[1.625rem] font-medium leading-tight text-murekkep">{aktif.baslik}</h4>
              <span className="shrink-0 text-[0.9375rem] font-semibold tabular-nums text-vt-govde">
                {aktif.tamamlanan} / {aktif.toplam} bölüm
              </span>
            </div>
            <p className="text-[0.9375rem] text-murekkep-soluk">{aktif.altBaslik}</p>
            <BolumYolu toplam={aktif.toplam} tamamlanan={aktif.tamamlanan} className="mt-4" />
            <div className="mt-3 text-[0.9375rem] leading-6 text-vt-govde">
              {aktif.finalBekliyor ? (
                <Cip ton="altin" ikon="madalya" className="whitespace-normal !leading-snug">
                  Bütün bölümler bitti · Büyük Final Testi sırada
                </Cip>
              ) : aktif.siradaki ? (
                <p>
                  <span className="text-murekkep-soluk">Sıradaki bölüm: </span>
                  <span className="font-semibold text-murekkep">
                    {aktif.siradaki.no}. {aktif.siradaki.baslik}
                  </span>
                </p>
              ) : null}
            </div>

            <ul className="mt-5 grid gap-x-5 gap-y-4 border-t border-cizgi pt-5 sm:grid-cols-2">
              {aktif.sonBolum ? (
                <li className="flex items-center gap-3">
                  <OdulIkonu tip="rozet" anahtar={aktif.sonBolum.rozetAnahtari} boyut={48} alt="" />
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] text-murekkep-soluk">Son rozeti</span>
                    <span className="block font-semibold leading-snug text-murekkep">{aktif.sonBolum.rozetAdi}</span>
                  </span>
                </li>
              ) : null}
              {guncelGorev ? (
                <li className="flex items-center gap-3">
                  <IkonKutusu ikon={guncelGorev.status === "tamamlandi" ? "onay" : "fidan"} ton="eylem" boyut={48} />
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] text-murekkep-soluk">
                      {guncelGorev.status === "tamamlandi" ? "Tamamladığı görev" : "Listesindeki görev"}
                    </span>
                    <span className="block font-semibold leading-snug text-murekkep">{guncelGorev.gorev.ad}</span>
                  </span>
                </li>
              ) : null}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-6">
              <Buton
                varyant="eylem"
                className="whitespace-nowrap sm:flex-1"
                onClick={() => perdeAc({ tur: "cihaz", cocukId: cocuk.id, hedef: `${aktif.baslik} kitabı` })}
              >
                <Ikon ad="kitap" boyut={19} />
                Okumaya Devam Et
              </Buton>
              <Buton varyant="ikincil" className="whitespace-nowrap" onClick={() => git("gelisim", { cocukId: cocuk.id })}>
                Gelişimini Gör
                <Ikon ad="ok-sag" boyut={17} />
              </Buton>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-murekkep-soluk">İlk yolculuk</p>
            <h4 className="mt-1 font-vt-baslik text-[1.625rem] font-medium leading-tight text-murekkep">
              {ilk ? `${ilk.baslik} ile başlayabilir` : "Kütüphane hazır"}
            </h4>
            <p className="mt-2 text-base leading-7 text-vt-govde">
              {cocuk.isim} ilk bölümü bitirdiğinde burada nerede kaldığı, rozeti ve bu akşam için bir sohbet sorusu
              görünür. Kitapları dilediği sırayla okuyabilir.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-6">
              <Buton
                varyant="altin"
                className="sm:flex-1"
                onClick={() => perdeAc({ tur: "cihaz", cocukId: cocuk.id, hedef: "Okuma rotası" })}
              >
                Yolculuğa Başla
              </Buton>
              <Buton varyant="ikincil" onClick={() => git("kutuphane")}>
                Kitaplara Bak
              </Buton>
            </div>
          </>
        )}
      </div>
    </Yuzey>
  );
}

// --- Bu akşamın sohbeti ---

function BuAksamSohbeti() {
  const { gorunumler, git, cocukSec } = useTaslak();
  const adaylar = gorunumler.filter((g) => g.aktif?.sonBolum?.soru);
  const [seciliId, setSeciliId] = useState<string | null>(null);
  const secili = adaylar.find((g) => g.cocuk.id === seciliId) ?? adaylar[0];

  if (!secili || !secili.aktif?.sonBolum) {
    return (
      <Yuzey className={`${styles.sohbetZemin} h-full p-6 sm:p-8`}>
        <div className="flex items-center gap-3">
          <IkonKutusu ikon="sohbet" ton="sohbet" />
          <h2 className="font-vt-baslik text-[1.375rem] font-medium text-murekkep">Bu akşamın sohbeti</h2>
        </div>
        <p className="mt-5 text-base leading-7 text-vt-govde">
          İlk bölüm bitince o bölümün sorusu burada akşam sohbeti için bir başlangıca dönüşür.
        </p>
      </Yuzey>
    );
  }

  const { aktif, cocuk } = secili;
  const bolum = aktif.sonBolum!;
  const zaman = okumaZamani(aktif.sonOkuma);

  return (
    <Yuzey as="section" id="bu-aksam" aria-labelledby="bu-aksam-baslik" className={`${styles.sohbetZemin} flex h-full scroll-mt-24 flex-col p-6 sm:p-8`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IkonKutusu ikon="sohbet" ton="sohbet" />
          <h2 id="bu-aksam-baslik" className="font-vt-baslik text-[1.375rem] font-medium text-murekkep">
            Bu akşamın sohbeti
          </h2>
        </div>
        {adaylar.length > 1 ? (
          <div className="flex gap-1 rounded-full bg-white/60 p-1" role="radiogroup" aria-label="Çocuk">
            {adaylar.map((a) => (
              <button
                key={a.cocuk.id}
                type="button"
                role="radio"
                aria-checked={a.cocuk.id === cocuk.id}
                onClick={() => setSeciliId(a.cocuk.id)}
                className={`flex min-h-11 items-center gap-2 rounded-full py-1 pl-1 pr-3.5 text-[0.9375rem] font-semibold transition-colors ${
                  a.cocuk.id === cocuk.id ? "bg-yuzey text-murekkep shadow-sm" : "text-vt-govde"
                }`}
              >
                <CocukYuzu cocuk={a.cocuk} boyut={30} halka="yok" />
                {a.cocuk.isim}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-6 text-[0.9375rem] font-semibold text-vt-sohbet">
        {ilgiEki(cocuk.isim)} {zaman ? `${zaman} okuduğu` : "son okuduğu"} bölümden · {aktif.baslik}, {bolum.no}. bölüm
      </p>
      <blockquote className="relative mt-3">
        <span className={`${styles.tirnak} absolute -left-1 -top-1 select-none`} aria-hidden="true">
          “
        </span>
        <p className="relative pl-1 pt-5 font-vt-baslik text-[1.5rem] font-normal leading-[1.35] tracking-[-0.01em] text-murekkep sm:text-[1.75rem]">
          {bolum.soru}
        </p>
      </blockquote>
      {bolum.ozet ? (
        <p className="mt-4 text-base leading-7 text-vt-govde">
          <span className="font-semibold text-murekkep">Bölümde: </span>
          {bolum.ozet}
        </p>
      ) : null}
      <p className="mt-5 flex gap-3 rounded-2xl bg-white/65 p-4 text-[0.9375rem] leading-6 text-vt-govde">
        <Ikon ad="kalp" boyut={18} className="mt-0.5 text-vt-sohbet" />
        {SOHBET_ONERISI}
      </p>
      <div className="mt-auto pt-5">
        <DevamBaglantisi
          ton="sohbet"
          onClick={() => {
            cocukSec(cocuk.id);
            git("sohbet", { cocukId: cocuk.id });
          }}
        >
          Bütün sohbet önerileri
        </DevamBaglantisi>
      </div>
    </Yuzey>
  );
}

// --- Son gelişmeler ---

function SonGelismeler() {
  const { gorunumler, git } = useTaslak();
  const liste = sonGelismeler(gorunumler, 5);
  const coklu = gorunumler.length > 1;

  return (
    <Yuzey as="section" aria-labelledby="gelismeler-baslik" className="flex h-full flex-col p-6 sm:p-8">
      <BolumBasligi id="gelismeler-baslik" baslik="Son gelişmeler" aciklama="Rozet, madalya ve görevler" />
      {liste.length === 0 ? (
        <p className="text-base leading-7 text-vt-govde">İlk rozet, ilk bölüm bitince burada görünür.</p>
      ) : (
        <ul className="-my-1 divide-y divide-cizgi">
          {liste.map((g) => (
            <li key={g.anahtar} className="flex items-center gap-3.5 py-3.5">
              {g.tip === "gorev" ? (
                <IkonKutusu ikon={g.alt.startsWith("Görevi tamam") ? "onay" : "fidan"} ton="eylem" boyut={44} />
              ) : (
                <OdulIkonu tip={g.tip} anahtar={g.gorselAnahtari ?? ""} boyut={44} alt="" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug text-murekkep">{g.baslik}</span>
                <span className="mt-0.5 block text-[0.875rem] leading-5 text-murekkep-soluk">
                  {coklu ? `${g.cocuk.isim} · ` : ""}
                  {g.alt}
                </span>
              </span>
              <span className="shrink-0 self-start pt-0.5 text-[0.8125rem] text-murekkep-soluk">
                {okumaZamani(g.zaman, true)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-4">
        <DevamBaglantisi onClick={() => git("gelisim", { sekme: "oduller" })}>Ödüllerin tamamı</DevamBaglantisi>
      </div>
    </Yuzey>
  );
}

// --- Son eklenen kitaplar ---

function SonEklenenler() {
  const { git } = useTaslak();
  const kitaplar = katalogKitaplari()
    .filter((k) => k.availability === "published" && k.yayinTarihi)
    .sort((a, b) => Date.parse(b.yayinTarihi!) - Date.parse(a.yayinTarihi!))
    .slice(0, 3);
  if (kitaplar.length === 0) return null;
  const adlar = kitaplar.slice(0, 2).map((k) => k.title);

  return (
    <Yuzey as="section" aria-labelledby="yeni-baslik" className="overflow-hidden">
      <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="text-sm font-semibold text-vt-altin-metin">Kütüphane</p>
          <h2 id="yeni-baslik" className="mt-1 font-vt-baslik text-[1.375rem] font-medium leading-tight text-murekkep">
            Son eklenen kitaplar
          </h2>
          <p className="mt-2 max-w-lg text-base leading-7 text-vt-govde">
            {adlar.join(" ve ")} yayında. Yeni kitaplar çocuğunuzun okuma rotasına kendiliğinden eklenir.
          </p>
          <div className="mt-3 hidden md:block">
            <DevamBaglantisi onClick={() => git("kutuphane")}>Kütüphaneye git</DevamBaglantisi>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4">
          {kitaplar.map((k) => (
            <button
              key={k.key}
              type="button"
              onClick={() => git("kutuphane")}
              className="w-[88px] transition-transform hover:-translate-y-1 sm:w-[104px]"
              aria-label={`${k.title} kitabını kütüphanede aç`}
            >
              <Kapak bookKey={k.key} />
            </button>
          ))}
        </div>
        <div className="-mt-2 md:hidden">
          <DevamBaglantisi onClick={() => git("kutuphane")}>Kütüphaneye git</DevamBaglantisi>
        </div>
      </div>
    </Yuzey>
  );
}

function ProfilEkleSatiri() {
  const { aile, perdeAc } = useTaslak();
  const kalan = aile.profilHakki - aile.cocuklar.length;
  if (kalan <= 0) return null;
  return (
    <button
      type="button"
      onClick={() => perdeAc({ tur: "profil-ekle" })}
      className="flex min-h-[72px] w-full items-center justify-between gap-4 rounded-[1.5rem] border-2 border-dashed border-cizgi px-5 text-left transition-colors hover:border-eylem/50 hover:bg-eylem-yumusak/50"
    >
      <span className="flex items-center gap-3.5">
        <IkonKutusu ikon="arti" ton="eylem" boyut={44} />
        <span>
          <span className="block font-semibold text-murekkep">Çocuk profili ekle</span>
          <span className="block text-[0.875rem] text-murekkep-soluk">
            {kalan} profil hakkınız kaldı
          </span>
        </span>
      </span>
      <Ikon ad="ok-sag" boyut={18} className="text-murekkep-soluk" />
    </button>
  );
}

// --- İlk kurulum (hiç profil yok) ---

function IlkKurulum() {
  const { perdeAc } = useTaslak();
  const adimlar = [
    {
      ikon: "aile" as const,
      baslik: "Çocuğunuz için profil oluşturun",
      metin: "Adını yazın, bir avatar seçin. Her çocuğun kendi yolculuğu ve ödülleri olur.",
    },
    {
      ikon: "tablet" as const,
      baslik: "Cihazı ona verin",
      metin: "Ortak tablette çocuk kendi adına dokunarak girer; kendi tableti varsa eşleme koduyla bağlanır.",
    },
    {
      ikon: "sohbet" as const,
      baslik: "Bölümden sonra konuşun",
      metin: "Her bölüm bitince burada o bölümün sorusu ve sohbet önerisi belirir.",
    },
  ];
  return (
    <div className="space-y-8">
      <section className={`${styles.gokyuzu} rounded-[1.75rem] px-5 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16`}>
        <span className={styles.hilal} style={{ top: 32, right: 36 }} aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="text-[0.9375rem] font-medium text-vt-gece-soluk">Keşif Dünyası&apos;na hoş geldiniz</p>
          <h1 className="mt-2 font-vt-baslik text-[2.5rem] font-normal leading-[1.05] tracking-[-0.025em] sm:text-[3.25rem]">
            Yolculuk bir profille başlar<span className="text-vt-altin-acik">.</span>
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-7 text-vt-gece-metin/90">
            Çocuğunuz okudukça burada nerede kaldığını, kazandığı rozetleri ve akşam sohbeti için soruları
            göreceksiniz.
          </p>
          <div className="mt-7">
            <Buton varyant="altin" boyut="buyuk" onClick={() => perdeAc({ tur: "profil-ekle" })}>
              <Ikon ad="arti" boyut={20} />
              İlk Profili Oluştur
            </Buton>
          </div>
        </div>
      </section>
      <ol className="grid gap-4 md:grid-cols-3">
        {adimlar.map((a, i) => (
          <li key={a.baslik}>
            <Yuzey className="h-full p-6">
              <div className="flex items-center gap-3">
                <IkonKutusu ikon={a.ikon} ton="gece" />
                <span className="font-vt-baslik text-[1.75rem] font-normal tabular-nums text-cizgi">{i + 1}</span>
              </div>
              <h2 className="mt-4 font-vt-baslik text-[1.25rem] font-medium leading-snug text-murekkep">{a.baslik}</h2>
              <p className="mt-2 text-base leading-7 text-vt-govde">{a.metin}</p>
            </Yuzey>
          </li>
        ))}
      </ol>
    </div>
  );
}
