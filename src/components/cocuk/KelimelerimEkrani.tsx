"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { normalizeBookName, type KelimeOgesi } from "../../lib/derive";
import type { YolculukKitabi } from "../../lib/child/yolculuk";
import { kitapKapagi, YEDEK } from "../../lib/varlikYollari";
import { Ikon, YedekliGorsel } from "../ui";
import { BosEkran } from "./BosEkran";
import { Cip, SayfaBasligi } from "./SayfaBasligi";
import ortak from "./cocuk-sayfalari.module.css";
import styles from "./kelimelerim.module.css";

type Kelime = KelimeOgesi & {
  kitapAdi: string;
  bolumAdi: string | null;
  okumaYolu: string | null;
};

/**
 * Kelimelerim (PROJE-MODELI 3.10.8). Okunan bölümlerdeki sözlük kelimeleri,
 * krem kartlarda: kelime okuma ekranındaki gibi yeşil vurgulu, anlamı hikâye
 * yazısıyla, altında geçtiği bölüm ve oraya dönüş. Kitap çipleriyle süzülür,
 * aramayla bulunur; arama yokken kitap kitap gruplanır.
 *
 * Kitap ve bölüm adları katalogdan gelir (`yolculukKitaplari`); veritabanındaki
 * aksansız ad ("Hz. Adem") gösterilmez.
 */
export function KelimelerimEkrani({
  kelimeler,
  kitaplar,
  yukleniyor,
}: {
  kelimeler: KelimeOgesi[];
  kitaplar: YolculukKitabi[];
  yukleniyor: boolean;
}) {
  const [arama, setArama] = useState("");
  const [kitapSecimi, setKitapSecimi] = useState<string | null>(null);

  const tumKelimeler = useMemo<Kelime[]>(() => {
    // Aynı kelime birden çok bölümde geçebilir — kelime+anlam çiftinde tekilleştir.
    const gorulen = new Set<string>();
    const sonuc: Kelime[] = [];
    for (const kelime of kelimeler) {
      const anahtar = `${normalizeBookName(kelime.word)}|${kelime.meaning}`;
      if (gorulen.has(anahtar)) continue;
      gorulen.add(anahtar);
      const kitap = kitaplar.find((item) => item.key === kelime.bookKey);
      const bolum = kitap?.bolumler[kelime.bolumNo - 1];
      sonuc.push({
        ...kelime,
        kitapAdi: kitap?.ad ?? kelime.bookIsim,
        bolumAdi: bolum?.ad ?? null,
        okumaYolu: bolum?.okumaYolu ?? null,
      });
    }
    return sonuc;
  }, [kelimeler, kitaplar]);

  // Yalnız kelimesi olan kitaplar, katalog sırasıyla.
  const kitapGruplari = useMemo(
    () =>
      kitaplar
        .map((kitap) => ({
          kitap,
          kelimeler: tumKelimeler
            .filter((kelime) => kelime.bookKey === kitap.key)
            .sort((a, b) => a.bolumNo - b.bolumNo || a.word.localeCompare(b.word, "tr-TR")),
        }))
        .filter((grup) => grup.kelimeler.length > 0),
    [kitaplar, tumKelimeler],
  );

  const aramaNorm = normalizeBookName(arama.trim());
  const sonuclar = aramaNorm
    ? tumKelimeler
        .filter(
          (kelime) =>
            (!kitapSecimi || kelime.bookKey === kitapSecimi) &&
            (normalizeBookName(kelime.word).includes(aramaNorm) ||
              normalizeBookName(kelime.meaning).includes(aramaNorm)),
        )
        .sort((a, b) => a.word.localeCompare(b.word, "tr-TR"))
    : null;
  const gorunenGruplar = kitapSecimi
    ? kitapGruplari.filter((grup) => grup.kitap.key === kitapSecimi)
    : kitapGruplari;

  return (
    <div className={ortak.sayfa}>
      <SayfaBasligi baslik="Kelimelerim" aciklama="Okuduğun bölümlerde öğrendiğin kelimeler burada birikiyor.">
        {tumKelimeler.length > 0 ? <Cip sayi={tumKelimeler.length} etiket="kelime" /> : null}
      </SayfaBasligi>

      {yukleniyor ? (
        <p className={styles.yukleniyor}>Kelimelerin toplanıyor…</p>
      ) : tumKelimeler.length === 0 ? (
        <BosEkran
          baslik="Defterin henüz boş"
          metin="Bölüm okudukça yeşil kelimeler anlamlarıyla buraya gelir."
          dugme={{ etiket: "Okumaya Başla", yol: "/map" }}
        />
      ) : (
        <>
          <div className={styles.araclar}>
            <label className={styles.arama}>
              <Ikon ad="arama" boyut={20} />
              <span className={ortak.srOnly}>Kelime ara</span>
              <input
                value={arama}
                onChange={(event) => setArama(event.target.value)}
                placeholder="Kelime veya anlam ara"
                type="search"
              />
            </label>
            {kitapGruplari.length > 1 ? (
              <div className={styles.filtreler} role="group" aria-label="Kitaba göre">
                <button type="button" aria-pressed={!kitapSecimi} onClick={() => setKitapSecimi(null)}>
                  Tümü <b>{tumKelimeler.length}</b>
                </button>
                {kitapGruplari.map(({ kitap, kelimeler: grup }) => (
                  <button
                    key={kitap.key}
                    type="button"
                    aria-pressed={kitapSecimi === kitap.key}
                    onClick={() => setKitapSecimi(kitapSecimi === kitap.key ? null : kitap.key)}
                  >
                    {kitap.ad} <b>{grup.length}</b>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {sonuclar ? (
            sonuclar.length === 0 ? (
              <div className={`${ortak.kart} ${styles.sonucYok}`} role="status">
                <p>“{arama.trim()}” için kelime bulunamadı.</p>
                <button type="button" className={`${ortak.dugme} ${ortak.dugmeHayalet}`} onClick={() => setArama("")}>
                  Aramayı temizle
                </button>
              </div>
            ) : (
              <section aria-label="Arama sonuçları">
                <p className={styles.sonucSayisi} role="status">
                  {sonuclar.length} kelime bulundu
                </p>
                <ul className={styles.kartlar}>
                  {sonuclar.map((kelime) => (
                    <KelimeKarti key={`${kelime.bookKey}-${kelime.bolumNo}-${kelime.word}`} kelime={kelime} kitapGoster />
                  ))}
                </ul>
              </section>
            )
          ) : (
            gorunenGruplar.map(({ kitap, kelimeler: grup }) => (
              <section key={kitap.key} aria-labelledby={`kelime-grubu-${kitap.key}`}>
                <div className={styles.grupBasi}>
                  <YedekliGorsel
                    src={kitapKapagi(kitap.key)}
                    yedekSrc={YEDEK.kitapKapagi}
                    alt=""
                    width={40}
                    height={56}
                    className={styles.grupKapagi}
                  />
                  <h2 id={`kelime-grubu-${kitap.key}`}>{kitap.ad}</h2>
                  <span>{grup.length} kelime</span>
                </div>
                <ul className={styles.kartlar}>
                  {grup.map((kelime) => (
                    <KelimeKarti key={`${kelime.bolumNo}-${kelime.word}`} kelime={kelime} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </>
      )}
    </div>
  );
}

function KelimeKarti({ kelime, kitapGoster = false }: { kelime: Kelime; kitapGoster?: boolean }) {
  return (
    <li className={`${ortak.kart} ${styles.kelimeKarti}`}>
      <h3>
        <span className={styles.kelime}>{kelime.word}</span>
      </h3>
      <p className={styles.anlam}>{kelime.meaning}</p>
      <footer className={styles.kartAlti}>
        <span>
          {kitapGoster ? `${kelime.kitapAdi} · ` : ""}
          {kelime.bolumNo}. bölüm{kelime.bolumAdi ? ` · ${kelime.bolumAdi}` : ""}
        </span>
        {kelime.okumaYolu ? (
          <Link href={kelime.okumaYolu} className={styles.bolumeGit}>
            Bölümü oku
            <Ikon ad="ok-sag" boyut={16} />
          </Link>
        ) : null}
      </footer>
    </li>
  );
}
