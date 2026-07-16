"use client";

import { useState } from "react";
import { Ikon, YedekliGorsel } from "../ui";
import styles from "../../../app/tasarim/kitap-yeni/kitap-yeni.module.css";

type BolumDurumu = "tamamlandi" | "aktif" | "kilitli";
type Secim = number | "final";

export type AtlasBolum = {
  id: string;
  title: string;
  ozet?: string;
  badgeName: string;
  okumaYolu: string;
  gorev?: {
    ad: string;
    kategori: string;
    sure: string;
  };
};

type KitapBolumRotasiProps = {
  kitapKey: string;
  kitapSira: number;
  kitapAdi: string;
  altBaslik: string;
  profilAdi: string;
  bolumler: AtlasBolum[];
  tamamlananBolum: number;
  ilerlemeYuzdesi: number;
  kitapBitti: boolean;
  yukleniyor: boolean;
  quizYolu: string | null;
  onHaritayaDon: () => void;
  onBolumAc: (yol: string) => void;
  onFinalAc: (yol: string) => void;
};

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

export function KitapBolumRotasi({
  kitapKey,
  kitapSira,
  kitapAdi,
  altBaslik,
  profilAdi,
  bolumler,
  tamamlananBolum,
  ilerlemeYuzdesi,
  kitapBitti,
  yukleniyor,
  quizYolu,
  onHaritayaDon,
  onBolumAc,
  onFinalAc,
}: KitapBolumRotasiProps) {
  const toplamBolum = bolumler.length;
  const aktifIndex = kitapBitti
    ? Math.max(0, toplamBolum - 1)
    : Math.min(tamamlananBolum, Math.max(0, toplamBolum - 1));
  const [secim, setSecim] = useState<Secim>(aktifIndex);

  const finalAcik = Boolean(quizYolu) && tamamlananBolum >= toplamBolum;
  const finalSecili = secim === "final";
  const seciliBolum = finalSecili ? null : bolumler[secim];

  function bolumDurumu(index: number): BolumDurumu {
    if (index < tamamlananBolum || kitapBitti) return "tamamlandi";
    if (index === tamamlananBolum && bolumler[index]?.okumaYolu) return "aktif";
    return "kilitli";
  }

  const seciliDurum: BolumDurumu = finalSecili
    ? kitapBitti
      ? "tamamlandi"
      : finalAcik
        ? "aktif"
        : "kilitli"
    : bolumDurumu(secim);
  const seciliSira = finalSecili ? toplamBolum + 1 : secim + 1;

  function bolumAcilmaKosulu(index: number) {
    const oncekiBolum = bolumler[index - 1];
    if (!oncekiBolum) return "Bu bölüm henüz açılmadı.";
    return `${index + 1}. Bölüm, ${index}. Bölüm “${temizBaslik(oncekiBolum.title)}” tamamlandığında açılacak.`;
  }

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <div className={styles.atlasShell}>
        <header className={styles.explorerBar}>
          <div className={styles.previewGroup}>
            <button className={styles.backLink} type="button" onClick={onHaritayaDon}>
              <Ikon ad="geri" boyut={18} /> Keşif Atlasına Dön
            </button>
          </div>

          <div className={styles.bookIdentity}>
            <div className={styles.lanternMark} aria-hidden="true"><Ikon ad="fener" boyut={22} /></div>
            <div>
              <span>{profilAdi} · Bölüm Yolculuğu</span>
              <strong>{kitapAdi} · {kitapSira}. Kitap</strong>
            </div>
          </div>

          <dl className={styles.headerStats} aria-label="Kitap ilerlemesi">
            <div><dt>Bölüm</dt><dd>{yukleniyor ? "—" : `${tamamlananBolum} / ${toplamBolum}`}</dd></div>
            <div><dt>Rozet</dt><dd><Ikon ad="rozet" boyut={16} /> {yukleniyor ? "—" : tamamlananBolum}</dd></div>
          </dl>
        </header>

        <div className={styles.workspace}>
          <section className={styles.mapStage} aria-labelledby="route-title">
            <div className={styles.skyGlow} aria-hidden="true" />
            <div className={styles.stars} aria-hidden="true"><i className={styles.starOne} /><i className={styles.starTwo} /><i className={styles.starThree} /><i className={styles.starFour} /><i className={styles.starFive} /></div>
            <div className={styles.mountainBack} aria-hidden="true" />
            <div className={styles.mountainFront} aria-hidden="true" />
            <div className={styles.forestFloor} aria-hidden="true" />

            <div className={styles.mapHeading}>
              <div>
                <p>{kitapSira}. kitap · {toplamBolum} bölüm</p>
                <h1 id="route-title">{kitapAdi} Bölüm Rotası</h1>
                <span>Bir durağa dokun, bölümün izini ve rozetini gör.</span>
              </div>
              <div className={styles.routeLegend} aria-label="Rota durumları">
                <span><i className={styles.legendDone} /> Tamamlandı</span>
                <span><i className={styles.legendActive} /> Aktif</span>
                <span><i className={styles.legendLocked} /> Kilitli</span>
              </div>
            </div>
            <div className={styles.compass} aria-hidden="true"><span>K</span><i /></div>

            <div className={styles.routeCanvas}>
              <svg className={styles.trail} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className={styles.trailShadow} d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97" />
                <path className={styles.trailBase} pathLength="100" d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97" />
                <path className={styles.trailProgress} pathLength="100" style={{ strokeDasharray: `${ilerlemeYuzdesi} 100` }} d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97" />
              </svg>

              <ol className={styles.chapterStops} aria-label={`${kitapAdi} bölümleri`}>
                {bolumler.map((bolum, index) => {
                  const durum = bolumDurumu(index);
                  const secili = secim === index;
                  return (
                    <li key={bolum.id}>
                      <button
                        type="button"
                        className={`${styles.chapterStop} ${styles[durum]} ${secili ? styles.selected : ""}`}
                        aria-pressed={secili}
                        aria-label={`${index + 1}. bölüm, ${temizBaslik(bolum.title)}, ${DURUM_METINLERI[durum]}`}
                        onClick={() => setSecim(index)}
                      >
                        <span className={styles.stopMarker}><span>{index + 1}</span><Ikon ad={DURUM_IKONLARI[durum]} boyut={17} /></span>
                        <span className={styles.stopCopy}><strong>{temizBaslik(bolum.title)}</strong><small>{DURUM_METINLERI[durum]}</small></span>
                        {bolum.gorev ? <span className={styles.taskPin} title="Bu bölümde Bugüne Taşı görevi var"><Ikon ad="dusunce" boyut={14} /> Görev</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <button type="button" className={`${styles.finalGate} ${finalSecili ? styles.finalSelected : ""}`} aria-pressed={finalSecili} aria-label={`Büyük Final Testi, ${DURUM_METINLERI[seciliDurum]}`} onClick={() => setSecim("final")}>
                <span className={styles.finalIcon}><Ikon ad={kitapBitti ? "onay" : finalAcik ? "fener" : "kilit"} boyut={18} /></span>
                <span><small>Final kapısı</small><strong>Büyük Final Testi</strong></span>
              </button>
            </div>
          </section>

          <aside className={styles.detailPanel} aria-label="Seçili bölüm bilgisi">
            <div className={styles.bookSummary}>
              <div className={styles.coverFrame}>
                <YedekliGorsel src={`/kapaklar/kapak-${kitapKey}.png`} yedekSrc="/kapaklar/placeholder.svg" alt={`${kitapAdi} kitap kapağı`} width={112} height={168} className={styles.cover} />
              </div>
              <div className={styles.bookCopy}><p>{kitapAdi} — Çocuklar İçin</p><h2>{altBaslik}</h2><span>{tamamlananBolum} / {toplamBolum} bölüm</span></div>
            </div>
            <div className={styles.bookProgress} role="progressbar" aria-label="Bölüm ilerlemesi" aria-valuemin={0} aria-valuemax={toplamBolum} aria-valuenow={tamamlananBolum}><span style={{ width: `${ilerlemeYuzdesi}%` }} /></div>

            <div className={styles.selectedContent} data-selection={finalSecili ? "final" : seciliSira} data-state={seciliDurum} key={finalSecili ? "final" : seciliBolum?.id}>
              <div className={styles.selectionMeta}>
                <span>{finalSecili ? "Yolculuğun sonu" : `Seçili Bölüm · ${seciliSira} / ${toplamBolum}`}</span>
                <span className={`${styles.statusChip} ${styles[seciliDurum]}`}><Ikon ad={DURUM_IKONLARI[seciliDurum]} boyut={15} /> {DURUM_METINLERI[seciliDurum]}</span>
              </div>

              {finalSecili ? (
                <>
                  <div className={styles.rewardHero}>
                    <YedekliGorsel src={`/madalyalar/madalya-${kitapKey}.png`} yedekSrc="/madalyalar/placeholder.svg" alt={`${kitapAdi} Yolculuk Madalyası`} width={82} height={82} className={`${styles.rewardImage} ${kitapBitti ? "" : styles.rewardPending}`} />
                    <div><p>Yolculuk sonu</p><h3>Büyük Final Testi</h3></div>
                  </div>
                  <p className={styles.summaryText}>Bölümlerde keşfettiğin değerleri hatırla ve {kitapAdi} yolculuğunu tamamla.</p>
                  <div className={styles.rewardRow}><Ikon ad="madalya" boyut={22} /><span><small>{kitapBitti ? "Kazanılan madalya" : "Kazanılacak madalya"}</small><strong>{kitapAdi} Yolculuk Madalyası</strong></span></div>
                  {!finalAcik && !kitapBitti ? <div className={styles.lockNotice}><Ikon ad="kilit" boyut={19} /><p>{toplamBolum}. Bölüm “{temizBaslik(bolumler[toplamBolum - 1]?.title ?? "Son Bölüm")}” tamamlandığında Büyük Final Testi açılacak.</p></div> : null}
                  {finalAcik && !kitapBitti && quizYolu ? <button type="button" className={styles.primaryAction} onClick={() => onFinalAc(quizYolu)}>Final Testine Geç <Ikon ad="ok-sag" boyut={19} /></button> : null}
                </>
              ) : seciliBolum ? (
                <>
                  <p className={styles.chapterKicker}>{seciliSira}. Bölüm</p>
                  <h3>{temizBaslik(seciliBolum.title)}</h3>
                  <p className={styles.summaryText}>{seciliBolum.ozet}</p>
                  <div className={styles.readingTrail} aria-label="Bölüm okuma akışı"><span>Hikâye</span><i /><span>Sen Olsaydın</span><i /><span>Ne Öğrendik</span></div>
                  <div className={styles.rewardRow}>
                    <YedekliGorsel src={`/rozetler/rozet-${kitapKey}-bolum-${seciliSira}.png`} yedekSrc="/rozetler/placeholder.svg" alt={`${seciliBolum.badgeName} görseli`} width={58} height={58} className={`${styles.rewardImage} ${seciliDurum === "tamamlandi" ? "" : styles.rewardPending}`} />
                    <span><small>{seciliDurum === "tamamlandi" ? "Kazanılan rozet" : "Kazanılacak rozet"}</small><strong>{seciliBolum.badgeName}</strong></span>
                  </div>
                  {seciliBolum.gorev ? <div className={styles.taskNote}><span className={styles.taskIcon}><Ikon ad="dusunce" boyut={19} /></span><div><small>Bu bölümde Bugüne Taşı var</small><strong>{seciliBolum.gorev.ad}</strong><p>{seciliBolum.gorev.kategori} · {seciliBolum.gorev.sure}</p></div></div> : null}
                  {seciliDurum === "kilitli" ? <div className={styles.lockNotice}><Ikon ad="kilit" boyut={19} /><p>{bolumAcilmaKosulu(secim)}</p></div> : (
                    <button type="button" className={`${styles.primaryAction} ${seciliDurum === "tamamlandi" ? styles.reReadAction : ""}`} onClick={() => onBolumAc(seciliBolum.okumaYolu)}>
                      {seciliDurum === "tamamlandi" ? "Tekrar Oku" : tamamlananBolum === 0 ? "Yolculuğa Başla" : "Okumaya Devam Et"}<Ikon ad="ok-sag" boyut={19} />
                    </button>
                  )}
                </>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
