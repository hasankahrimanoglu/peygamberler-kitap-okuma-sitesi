"use client";

import Link from "next/link";
import { useState } from "react";
import { books } from "../../../src/data/books";
import {
  Ikon,
  YedekliGorsel,
} from "../../../src/components/ui";
import styles from "./kitap-yeni.module.css";

type BolumDurumu = "tamamlandi" | "aktif" | "kilitli";
type Secim = number | "final";

const ADEM_KITABI = (() => {
  const kitap = books.find((kayit) => kayit.id === "hz-adem");
  if (!kitap) throw new Error("Hz. Âdem kitap verisi bulunamadı.");
  return kitap;
})();

const TAMAMLANAN_BOLUM = 3;
const TOPLAM_BOLUM = ADEM_KITABI.chapters.length;

const DURUM_METINLERI: Record<BolumDurumu, string> = {
  tamamlandi: "Tamamlandı",
  aktif: "Devam Ediyor",
  kilitli: "Kilitli",
};

const DURUM_IKONLARI = {
  tamamlandi: "onay",
  aktif: "fener",
  kilitli: "kilit",
} as const;

function temizBaslik(baslik: string) {
  return baslik.replace(/\s+/g, " ").trim();
}

function bolumDurumu(index: number): BolumDurumu {
  if (index < TAMAMLANAN_BOLUM) return "tamamlandi";
  if (index === TAMAMLANAN_BOLUM) return "aktif";
  return "kilitli";
}

function bolumAcilmaKosulu(index: number) {
  const oncekiBolum = ADEM_KITABI.chapters[index - 1];

  return `${index + 1}. Bölüm, ${index}. Bölüm “${temizBaslik(
    oncekiBolum.title,
  )}” tamamlandığında açılacak.`;
}

export default function KitapYeniOnizleme() {
  const [secim, setSecim] = useState<Secim>(TAMAMLANAN_BOLUM);
  const [onizlemeNotu, setOnizlemeNotu] = useState(
    "Bu ekran statik örnek ilerleme kullanır; hiçbir veri kaydedilmez.",
  );

  const finalSecili = secim === "final";
  const seciliBolum = finalSecili ? null : ADEM_KITABI.chapters[secim];
  const seciliDurum = finalSecili ? "kilitli" : bolumDurumu(secim);
  const seciliSira = finalSecili ? TOPLAM_BOLUM + 1 : secim + 1;

  function bolumSec(index: number) {
    const bolum = ADEM_KITABI.chapters[index];
    setSecim(index);
    setOnizlemeNotu(
      `${index + 1}. bölüm “${temizBaslik(
        bolum.title,
      )}” bilgi panelinde açıldı.`,
    );
  }

  function finaliSec() {
    setSecim("final");
    setOnizlemeNotu("Büyük Final Testi bilgi panelinde açıldı.");
  }

  function yerelAksiyon(etiket: string) {
    setOnizlemeNotu(
      `“${etiket}” bu tasarım önizlemesinde yalnızca gösterildi; hiçbir ilerleme kaydedilmedi.`,
    );
  }

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <div className={styles.atlasShell}>
        <header className={styles.explorerBar}>
          <div className={styles.previewGroup}>
            <span className={styles.previewBadge} data-qa="preview-label">
              <Ikon ad="dusunce" boyut={17} />
              Tasarım Önizlemesi
            </span>
            <Link className={styles.backLink} href="/tasarim/harita-yeni">
              <Ikon ad="geri" boyut={18} />
              Keşif Atlasına Dön
            </Link>
          </div>

          <div className={styles.bookIdentity}>
            <div className={styles.lanternMark} aria-hidden="true">
              <Ikon ad="fener" boyut={22} />
            </div>
            <div>
              <span>Deneme 1 · Meraklı Kâşif</span>
              <strong>Hz. Âdem · 1. Kitap</strong>
            </div>
          </div>

          <dl className={styles.headerStats} aria-label="Örnek kitap ilerlemesi">
            <div>
              <dt>Bölüm</dt>
              <dd>{TAMAMLANAN_BOLUM} / {TOPLAM_BOLUM}</dd>
            </div>
            <div>
              <dt>Rozet</dt>
              <dd>
                <Ikon ad="rozet" boyut={16} /> {TAMAMLANAN_BOLUM}
              </dd>
            </div>
          </dl>
        </header>

        <div className={styles.workspace}>
          <section
            className={styles.mapStage}
            aria-labelledby="route-title"
            data-qa="chapter-map"
          >
            <div className={styles.skyGlow} aria-hidden="true" />
            <div className={styles.stars} aria-hidden="true">
              <i className={styles.starOne} />
              <i className={styles.starTwo} />
              <i className={styles.starThree} />
              <i className={styles.starFour} />
              <i className={styles.starFive} />
            </div>
            <div className={styles.mountainBack} aria-hidden="true" />
            <div className={styles.mountainFront} aria-hidden="true" />
            <div className={styles.forestFloor} aria-hidden="true" />

            <div className={styles.mapHeading}>
              <div>
                <p>1. kitap · 8 bölüm</p>
                <h1 id="route-title">Hz. Âdem Bölüm Rotası</h1>
                <span>Bir durağa dokun, bölümün izini ve rozetini gör.</span>
              </div>
              <div className={styles.routeLegend} aria-label="Rota durumları">
                <span><i className={styles.legendDone} /> Tamamlandı</span>
                <span><i className={styles.legendActive} /> Aktif</span>
                <span><i className={styles.legendLocked} /> Kilitli</span>
              </div>
            </div>

            <div className={styles.compass} aria-hidden="true">
              <span>K</span>
              <i />
            </div>

            <div className={styles.routeCanvas}>
              <svg
                className={styles.trail}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className={styles.trailShadow}
                  d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97"
                />
                <path
                  className={styles.trailBase}
                  pathLength="100"
                  d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97"
                />
                <path
                  className={styles.trailProgress}
                  pathLength="100"
                  d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97"
                />
              </svg>

              <ol className={styles.chapterStops} aria-label="Hz. Âdem bölümleri">
                {ADEM_KITABI.chapters.map((bolum, index) => {
                  const durum = bolumDurumu(index);
                  const secili = secim === index;
                  const baslik = temizBaslik(bolum.title);

                  return (
                    <li key={bolum.id}>
                      <button
                        type="button"
                        className={`${styles.chapterStop} ${
                          styles[durum]
                        } ${secili ? styles.selected : ""}`}
                        aria-pressed={secili}
                        aria-label={`${index + 1}. bölüm, ${baslik}, ${
                          DURUM_METINLERI[durum]
                        }`}
                        data-qa="chapter-stop"
                        data-chapter={index + 1}
                        data-state={durum}
                        onClick={() => bolumSec(index)}
                      >
                        <span className={styles.stopMarker}>
                          <span>{index + 1}</span>
                          <Ikon ad={DURUM_IKONLARI[durum]} boyut={17} />
                        </span>
                        <span className={styles.stopCopy}>
                          <strong>{baslik}</strong>
                          <small>{DURUM_METINLERI[durum]}</small>
                        </span>
                        {bolum.gorev ? (
                          <span className={styles.taskPin} title="Bu bölümde Bugüne Taşı görevi var">
                            <Ikon ad="dusunce" boyut={14} />
                            Görev
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <button
                type="button"
                className={`${styles.finalGate} ${
                  finalSecili ? styles.finalSelected : ""
                }`}
                aria-pressed={finalSecili}
                aria-label="Büyük Final Testi, kilitli"
                data-qa="final-stop"
                data-state="kilitli"
                onClick={finaliSec}
              >
                <span className={styles.finalIcon}>
                  <Ikon ad="kilit" boyut={18} />
                </span>
                <span>
                  <small>Final kapısı</small>
                  <strong>Büyük Final Testi</strong>
                </span>
              </button>
            </div>
          </section>

          <aside
            className={styles.detailPanel}
            aria-label="Seçili bölüm bilgisi"
            data-qa="detail-panel"
          >
            <div className={styles.bookSummary}>
              <div className={styles.coverFrame}>
                <YedekliGorsel
                  src="/kapaklar/kapak-adem.png"
                  yedekSrc="/kapaklar/placeholder.svg"
                  alt="Hz. Âdem kitap kapağı"
                  width={112}
                  height={168}
                  className={styles.cover}
                />
              </div>
              <div className={styles.bookCopy}>
                <p>Hz. Âdem — Çocuklar İçin</p>
                <h2>İlk İnsan, İlk Yolculuk</h2>
                <span>Örnek ilerleme · {TAMAMLANAN_BOLUM} / {TOPLAM_BOLUM} bölüm</span>
              </div>
            </div>

            <div
              className={styles.bookProgress}
              role="progressbar"
              aria-label="Örnek bölüm ilerlemesi"
              aria-valuemin={0}
              aria-valuemax={TOPLAM_BOLUM}
              aria-valuenow={TAMAMLANAN_BOLUM}
            >
              <span style={{ width: `${(TAMAMLANAN_BOLUM / TOPLAM_BOLUM) * 100}%` }} />
            </div>

            <div
              className={styles.selectedContent}
              data-selection={finalSecili ? "final" : seciliSira}
              data-state={seciliDurum}
              key={finalSecili ? "final" : seciliBolum?.id}
            >
              <div className={styles.selectionMeta}>
                <span>
                  {finalSecili
                    ? "Yolculuğun sonu"
                    : `Seçili Bölüm · ${seciliSira} / ${TOPLAM_BOLUM}`}
                </span>
                <span className={`${styles.statusChip} ${styles[seciliDurum]}`} data-qa="selected-status">
                  <Ikon ad={DURUM_IKONLARI[seciliDurum]} boyut={15} />
                  {DURUM_METINLERI[seciliDurum]}
                </span>
              </div>

              {finalSecili ? (
                <>
                  <div className={styles.rewardHero}>
                    <YedekliGorsel
                      src="/madalyalar/placeholder.svg"
                      yedekSrc="/madalyalar/placeholder.svg"
                      alt="Kilitli Hz. Âdem Yolculuk Madalyası"
                      width={82}
                      height={82}
                      className={`${styles.rewardImage} ${styles.rewardPending}`}
                    />
                    <div>
                      <p>8 soruluk yolculuk sonu</p>
                      <h3>Büyük Final Testi</h3>
                    </div>
                  </div>
                  <p className={styles.summaryText}>
                    Sekiz bölümde keşfettiğin değerleri hatırla ve Hz. Âdem
                    yolculuğunu tamamla.
                  </p>
                  <div className={styles.rewardRow}>
                    <Ikon ad="madalya" boyut={22} />
                    <span>
                      <small>Kazanılacak madalya</small>
                      <strong>Hz. Âdem Yolculuk Madalyası</strong>
                    </span>
                  </div>
                  <div className={styles.lockNotice} data-qa="unlock-condition">
                    <Ikon ad="kilit" boyut={19} />
                    <p>
                      8. Bölüm “Sılaya Uzanan Yol” tamamlandığında Büyük Final
                      Testi açılacak.
                    </p>
                  </div>
                </>
              ) : seciliBolum ? (
                <>
                  <p className={styles.chapterKicker}>{seciliSira}. Bölüm</p>
                  <h3>{temizBaslik(seciliBolum.title)}</h3>
                  <p className={styles.summaryText}>{seciliBolum.ozet}</p>

                  <div className={styles.readingTrail} aria-label="Bölüm okuma akışı">
                    <span>Hikâye</span>
                    <i />
                    <span>Sen Olsaydın</span>
                    <i />
                    <span>Ne Öğrendik</span>
                  </div>

                  <div className={styles.rewardRow}>
                    <YedekliGorsel
                      src="/rozetler/placeholder.svg"
                      yedekSrc="/rozetler/placeholder.svg"
                      alt={`${seciliBolum.badgeName} görseli`}
                      width={58}
                      height={58}
                      className={`${styles.rewardImage} ${
                        seciliDurum === "tamamlandi"
                          ? ""
                          : styles.rewardPending
                      }`}
                    />
                    <span>
                      <small>
                        {seciliDurum === "tamamlandi"
                          ? "Kazanılan rozet"
                          : "Kazanılacak rozet"}
                      </small>
                      <strong>{seciliBolum.badgeName}</strong>
                    </span>
                  </div>

                  {seciliBolum.gorev ? (
                    <div className={styles.taskNote}>
                      <span className={styles.taskIcon}>
                        <Ikon ad="dusunce" boyut={19} />
                      </span>
                      <div>
                        <small>Bu bölümde Bugüne Taşı var</small>
                        <strong>{seciliBolum.gorev.ad}</strong>
                        <p>{seciliBolum.gorev.kategori} · {seciliBolum.gorev.sure}</p>
                      </div>
                    </div>
                  ) : null}

                  {seciliDurum === "kilitli" ? (
                    <div className={styles.lockNotice} data-qa="unlock-condition">
                      <Ikon ad="kilit" boyut={19} />
                      <p>{bolumAcilmaKosulu(secim)}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`${styles.primaryAction} ${
                        seciliDurum === "tamamlandi"
                          ? styles.reReadAction
                          : ""
                      }`}
                      data-qa="chapter-action"
                      onClick={() =>
                        yerelAksiyon(
                          seciliDurum === "tamamlandi"
                            ? "Tekrar Oku"
                            : "Okumaya Devam Et",
                        )
                      }
                    >
                      {seciliDurum === "tamamlandi"
                        ? "Tekrar Oku"
                        : "Okumaya Devam Et"}
                      <Ikon ad="ok-sag" boyut={19} />
                    </button>
                  )}
                </>
              ) : null}
            </div>

            <p className={styles.liveNote} aria-live="polite" data-qa="preview-note">
              {onizlemeNotu}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
