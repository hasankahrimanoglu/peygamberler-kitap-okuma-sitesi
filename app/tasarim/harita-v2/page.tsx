"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { atlasRegions } from "../../../src/data/atlasCatalog";
import { rozetIconKey } from "../../../src/lib/derive";
import { Ikon, OdulIkonu, YedekliGorsel } from "../../../src/components/ui";
// Panel/drawer BİREBİR mevcut `/map` yapısıdır: aynı sınıflar, aynı CSS modülü.
// Burada yalnız sahne (bölge + durak yerleşimi) yeniden ele alınıyor.
import panel from "../harita-yeni/harita-yeni.module.css";
import styles from "./harita-v2.module.css";

/**
 * KEŞİF BÖLGESİ — TASARIM ÖNİZLEMESİ (v2)
 *
 * Amaç: `/map` içindeki durak YERLEŞİMİNİN üç yapısal sorununu çözmek.
 *  1. Sabit yol: mevcut rota her bölgede 6 duraklık çiziliyor; 4 kitaplık
 *     bölgede altta boş sarkan çizgi kalıyor. Burada yol duraklardan TÜRETİLİR.
 *  2. Çift işaret: daire + ayrı etiket kartı yerine tek madalyon.
 *  3. Kesilen ad: 144px sabit + nowrap yerine iki satıra saran ad.
 *
 * Panel, drawer davranışı ve ödül bölümleri DEĞİŞMEZ — mevcut yapı aynen
 * kullanılır. `/map` bu rotadan etkilenmez.
 */

type Durum = "completed" | "active" | "locked" | "preparing";

type Nokta = { x: number; y: number };

const durumIkonu = {
  completed: "onay",
  active: "fener",
  locked: "kilit",
  preparing: "saat",
} as const;

function durumMetni(durum: Durum, tamamlananBolum: number) {
  if (durum === "completed") return "Tamamlandı";
  if (durum === "preparing") return "Hazırlanıyor";
  if (durum === "locked") return "Kilitli";
  return tamamlananBolum > 0 ? "Devam Ediyor" : "Yeni Açıldı";
}

/**
 * Durak koordinatları. Her SIRA kendi içinde tam genişliğe yayılır; tek sayıda
 * kitap kalan sırada da denge bozulmaz. Sıralar yılan düzeninde bağlanır.
 */
function durakKonumlari(adet: number, dar: boolean): Nokta[] {
  // Dar ekranda en fazla 2 sütun: 3 sütunda ad etiketleri yan yana sığmıyor
  // ve üst üste biniyor. 6 kitap dar ekranda 3 sıra × 2 sütun olur.
  const enCokSutun = dar ? 2 : 3;
  const sutun = Math.min(enCokSutun, adet <= 3 ? adet : Math.ceil(adet / 2));
  const sira = Math.ceil(adet / sutun);

  // Alt sınır 72: madalyonun altındaki iki satırlık ad etiketi sahne kenarına
  // dayanmasın. Dar ekranda yan boşluk artar; yoksa kenar etiketi taşıyor.
  const xBas = dar ? 27 : 16;
  const xSon = dar ? 73 : 84;
  const yBas = sira === 1 ? 46 : 28;
  const ySon = 72;

  const noktalar: Nokta[] = [];
  for (let s = 0; s < sira; s += 1) {
    const satirAdedi = Math.min(sutun, adet - s * sutun);
    const y = sira === 1 ? yBas : yBas + ((ySon - yBas) * s) / (sira - 1);

    const xler: number[] = [];
    for (let i = 0; i < satirAdedi; i += 1) {
      xler.push(
        satirAdedi === 1 ? (xBas + xSon) / 2 : xBas + ((xSon - xBas) * i) / (satirAdedi - 1),
      );
    }
    // Tek numaralı sıralar ters akar — yol kesintisiz devam eder.
    if (s % 2 === 1) xler.reverse();
    xler.forEach((x) => noktalar.push({ x, y }));
  }
  return noktalar.slice(0, adet);
}

const kelepce = (deger: number, a: number, b: number) =>
  Math.max(Math.min(a, b), Math.min(Math.max(a, b), deger));

/**
 * Noktalardan geçen akıcı eğri (Catmull-Rom → kübik Bézier). Yol duraklardan
 * türetildiği için son duraktan sonra devam etmez; sarkan uç oluşmaz.
 *
 * Kontrol noktaları her parçanın sınırlayıcı kutusuna kelepçelenir. Yılan
 * düzeninde yön ters döndüğü için (sıra sonu → alt sıra başı) ham Catmull-Rom
 * dışa taşıyor ve yol kendi üstüne kıvrılıyordu.
 */
function akiciYol(noktalar: Nokta[]): string {
  if (noktalar.length < 2) return "";
  const p = noktalar;
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = {
      x: kelepce(p1.x + (p2.x - p0.x) / 6, p1.x, p2.x),
      y: kelepce(p1.y + (p2.y - p0.y) / 6, p1.y, p2.y),
    };
    const c2 = {
      x: kelepce(p2.x - (p3.x - p1.x) / 6, p1.x, p2.x),
      y: kelepce(p2.y - (p3.y - p1.y) / 6, p1.y, p2.y),
    };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function HaritaV2Page() {
  const [bolgeIndex, setBolgeIndex] = useState(0);
  const [doluOrnek, setDoluOrnek] = useState(false);
  const [seciliSira, setSeciliSira] = useState(1);
  const [dar, setDar] = useState(false);
  // Tablet dikey ve mobilde panel sağdan açılan drawer'dır (PROJE-MODELI 3.7).
  const [detayAcik, setDetayAcik] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const uygula = () => setDar(mq.matches);
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

  const bolge = atlasRegions[bolgeIndex];

  const duraklar = useMemo(() => {
    const konum = durakKonumlari(bolge.books.length, dar);
    return bolge.books.map((kitap, i) => {
      let durum: Durum;
      if (doluOrnek) {
        // Tasarımın dolu hâlini görmek için örnek ilerleme.
        durum = i < 2 ? "completed" : i === 2 ? "active" : "locked";
      } else if (kitap.availability === "published") durum = "completed";
      else if (kitap.availability === "demo") durum = "active";
      else durum = "preparing";

      const tamamlananBolum = durum === "completed" ? kitap.chapterCount : 0;
      return {
        ...kitap,
        sira: i + 1,
        durum,
        tamamlananBolum,
        ilerleme: Math.round((tamamlananBolum / kitap.chapterCount) * 100),
        madalyaKazanildi: durum === "completed",
        nokta: konum[i],
      };
    });
  }, [bolge, doluOrnek, dar]);

  const yol = useMemo(() => akiciYol(duraklar.map((d) => d.nokta)), [duraklar]);

  const tamamlanan = duraklar.filter((d) => d.durum === "completed").length;
  // Tamamlanan kısım ayrı bir yol olarak çizilir. `pathLength` + dasharray
  // burada yanıltıcı olurdu: viewBox `preserveAspectRatio="none"` ile yatayda
  // esnediği için yol uzunluğu oranı görsel orana denk gelmiyor.
  const tamamYol = useMemo(
    () => (tamamlanan > 1 ? akiciYol(duraklar.slice(0, tamamlanan).map((d) => d.nokta)) : ""),
    [duraklar, tamamlanan],
  );

  const secili = duraklar.find((d) => d.sira === seciliSira) ?? duraklar[0];
  const hazirDegil = secili.durum === "preparing";
  const kilitli = secili.durum === "locked";
  const aksiyon =
    secili.durum === "completed"
      ? "Tekrar Oku"
      : secili.tamamlananBolum > 0
        ? "Okumaya Devam Et"
        : "Yolculuğa Başla";

  const bolumRozetleri = Array.from({ length: secili.chapterCount }, (_, index) => ({
    sira: index + 1,
    ad: `${index + 1}. Bölüm Rozeti`,
    iconKey: rozetIconKey(secili.key, index + 1),
    kazanildi: index < secili.tamamlananBolum,
  }));

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <header className={styles.topBar}>
        <span className={styles.previewChip}>
          <Ikon ad="harita" boyut={16} /> <span>Tasarım Önizlemesi · v2</span>
        </span>
        <Link className={styles.backLink} href="/tasarim">
          <Ikon ad="geri" boyut={18} /> <span>Tasarım listesine dön</span>
        </Link>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={doluOrnek}
            onChange={(e) => setDoluOrnek(e.target.checked)}
          />
          <span>Örnek dolu ilerleme</span>
        </label>
      </header>

      <nav className={styles.regionTabs} aria-label="Keşif bölgeleri">
        {atlasRegions.map((r, i) => (
          <button
            key={r.id}
            type="button"
            className={i === bolgeIndex ? styles.regionTabActive : styles.regionTab}
            aria-pressed={i === bolgeIndex}
            onClick={() => {
              setBolgeIndex(i);
              setSeciliSira(1);
              setDetayAcik(false);
            }}
          >
            <b>{r.order}</b>
            <span>
              <strong>{r.name}</strong>
              <small>{r.books.length} kitap</small>
            </span>
          </button>
        ))}
      </nav>

      {/* Yerleşim kabuğu da mevcut yapıdan: masaüstünde iki sütun, 1023px
          altında tek sütun + sağdan açılan drawer. */}
      <div className={panel.workspace}>
        <section className={styles.scene} aria-label={`${bolge.name} keşif rotası`}>
          <div className={styles.sceneHeader}>
            <small>
              {bolge.order}. Keşif Bölgesi · {bolge.books.length} kitap
            </small>
            <h1>{bolge.name}</h1>
            {bolge.subtitle ? <em>{bolge.subtitle}</em> : null}
            <p>{bolge.description}</p>
          </div>

          <div className={styles.trailArea}>
            <svg
              className={styles.trailSvg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.trailRoad} d={yol} />
              <path className={styles.trailDash} d={yol} />
              {tamamYol ? <path className={styles.trailDone} d={tamamYol} /> : null}
            </svg>

            <ol className={styles.stops}>
              {duraklar.map((d) => (
                <li
                  key={d.key}
                  className={styles.stopItem}
                  style={{ left: `${d.nokta.x}%`, top: `${d.nokta.y}%` }}
                >
                  <button
                    type="button"
                    className={`${styles.stop} ${styles[`stop_${d.durum}`]} ${
                      d.sira === seciliSira ? styles.stopSelected : ""
                    }`}
                    aria-pressed={d.sira === seciliSira}
                    aria-label={`${d.sira}. durak: ${d.title} — ${durumMetni(d.durum, d.tamamlananBolum)}`}
                    onClick={() => {
                      setSeciliSira(d.sira);
                      setDetayAcik(true);
                    }}
                  >
                    <span className={styles.medallion}>
                      <YedekliGorsel
                        src={`/kapaklar/kapak-${d.key}.png`}
                        yedekSrc="/kapaklar/placeholder.svg"
                        alt=""
                        width={200}
                        height={300}
                        className={styles.medallionArt}
                      />
                      <i className={styles.statusDot} aria-hidden="true">
                        <Ikon ad={durumIkonu[d.durum]} boyut={13} />
                      </i>
                      <b className={styles.stopNo} aria-hidden="true">
                        {d.sira}
                      </b>
                    </span>
                    <span className={styles.stopLabel}>
                      <strong>{d.title}</strong>
                      <em>{durumMetni(d.durum, d.tamamlananBolum)}</em>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --- Aşağısı `/map` panelinin birebir aynısıdır (AtlasHarita.tsx). --- */}
        <button
          type="button"
          className={`${panel.drawerBackdrop} ${detayAcik ? panel.drawerBackdropOpen : ""}`}
          aria-label="Kitap detayını kapat"
          onClick={() => setDetayAcik(false)}
        />

        <aside
          className={`${panel.bookPanel} ${detayAcik ? panel.bookPanelOpen : ""}`}
          aria-labelledby="selected-book-title"
        >
          <div className={panel.drawerHeader}>
            <button type="button" onClick={() => setDetayAcik(false)}>
              <Ikon ad="geri" boyut={22} /> Haritaya Dön
            </button>
            <strong>{secili.order} / 35</strong>
          </div>
          <div className={panel.panelTopline}>
            <span>Seçili keşif durağı</span>
            <strong>{secili.order} / 35</strong>
          </div>
          <div className={panel.bookHero}>
            <div className={panel.coverFrame}>
              <YedekliGorsel
                src={`/kapaklar/kapak-${secili.key}.png`}
                yedekSrc="/kapaklar/placeholder.svg"
                alt={`${secili.title} kitap kapağı`}
                width={597}
                height={891}
                className={panel.cover}
              />
              {kilitli ? (
                <span className={panel.coverLock}>
                  <Ikon ad="kilit" boyut={22} />
                </span>
              ) : null}
            </div>
            <div className={panel.bookIdentity}>
              <span className={`${panel.statusChip} ${panel[`chip_${secili.durum}`]}`}>
                <Ikon ad={durumIkonu[secili.durum]} boyut={15} />{" "}
                {durumMetni(secili.durum, secili.tamamlananBolum)}
              </span>
              <h2 id="selected-book-title">{secili.title}</h2>
              <p>{secili.subtitle}</p>
            </div>
          </div>
          {secili.description ? (
            <p className={panel.bookDescription}>{secili.description}</p>
          ) : null}

          {hazirDegil ? (
            <div className={panel.preparingCard}>
              <span>
                <Ikon ad="saat" boyut={24} />
              </span>
              <div>
                <strong>Bu yolculuk hazırlanıyor</strong>
                <p>
                  {secili.chapterCount} bölümlük içerik tamamlandığında bu durak açılacak.
                  Şimdilik atlas üzerinde yerini görebilirsin.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className={panel.progressBlock}>
                <div>
                  <span>Bölüm ilerlemesi</span>
                  <strong>
                    {secili.tamamlananBolum} / {secili.chapterCount}
                  </strong>
                </div>
                <div
                  className={panel.progressTrack}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={secili.ilerleme}
                >
                  <span style={{ width: `${secili.ilerleme}%` }} />
                </div>
              </div>
              <section className={panel.chapterRewards} aria-labelledby="chapter-rewards-title">
                <div className={panel.rewardHeading}>
                  <h3 id="chapter-rewards-title">Bölüm Rozetleri</h3>
                  <strong>
                    {secili.tamamlananBolum} / {secili.chapterCount}
                  </strong>
                </div>
                <ol>
                  {bolumRozetleri.map((rozet) => (
                    <li key={rozet.iconKey} title={rozet.ad}>
                      <span>
                        <OdulIkonu
                          tip="rozet"
                          anahtar={rozet.iconKey}
                          kazanildi={rozet.kazanildi}
                          boyut={48}
                          alt=""
                        />
                        {rozet.kazanildi ? (
                          <i>
                            <Ikon ad="onay" boyut={13} />
                          </i>
                        ) : null}
                      </span>
                      <small>{rozet.sira}. bölüm</small>
                    </li>
                  ))}
                </ol>
              </section>
              <section className={panel.medalCard} aria-label="Kitap madalyası">
                <span>
                  <OdulIkonu
                    tip="madalya"
                    anahtar={secili.key}
                    kazanildi={secili.madalyaKazanildi}
                    boyut={52}
                    alt=""
                  />
                </span>
                <div>
                  <small>
                    {secili.madalyaKazanildi ? "Kazanılan Madalya" : "Kazanılacak Madalya"}
                  </small>
                  <strong>{secili.title} Yolculuk Madalyası</strong>
                </div>
              </section>
            </>
          )}

          <div className={panel.panelSpacer} />
          {!hazirDegil && !kilitli ? (
            <button type="button" className={panel.primaryAction}>
              <Ikon ad={secili.durum === "completed" ? "kitap" : "ok-sag"} boyut={19} /> {aksiyon}
            </button>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
