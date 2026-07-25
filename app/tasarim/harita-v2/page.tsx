"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { atlasRegions } from "../../../src/data/atlasCatalog";
import { Ikon, YedekliGorsel } from "../../../src/components/ui";
import styles from "./harita-v2.module.css";

/**
 * KEŞİF BÖLGESİ — TASARIM ÖNİZLEMESİ (v2)
 *
 * Amaç: `/map` içindeki mevcut durak yerleşiminin üç yapısal sorununu çözmek.
 *  1. Sabit yol: mevcut rota her bölgede 6 duraklık çiziliyor; 4 kitaplık
 *     bölgede altta boş sarkan çizgi kalıyor. Burada yol duraklardan TÜRETİLİR.
 *  2. Çift işaret: daire + ayrı etiket kartı yerine tek madalyon.
 *  3. Kesilen ad: 144px sabit + nowrap yerine iki satıra saran ad.
 *
 * Bu rota üretim akışına bağlı değildir; `/map` olduğu gibi durur.
 */

type Durum = "tamamlandi" | "aktif" | "kilitli" | "hazirlaniyor";

type Nokta = { x: number; y: number };

const durumMetni: Record<Durum, string> = {
  tamamlandi: "Tamamlandı",
  aktif: "Yolculuğa Başla",
  kilitli: "Kilitli",
  hazirlaniyor: "Hazırlanıyor",
};

const durumIkonu = {
  tamamlandi: "onay",
  aktif: "ok-sag",
  kilitli: "kilit",
  hazirlaniyor: "saat",
} as const;

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
  // dayanmasın. Tek sıralı bölgelerde duraklar dikeyde ortalanır.
  // Dar ekranda yan boşluk artar; yoksa kenar duraklarının etiketi taşıyor.
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
        durum = i < 2 ? "tamamlandi" : i === 2 ? "aktif" : "kilitli";
      } else if (kitap.availability === "published") durum = "tamamlandi";
      else if (kitap.availability === "demo") durum = "aktif";
      else durum = "hazirlaniyor";
      return { ...kitap, sira: i + 1, durum, nokta: konum[i] };
    });
  }, [bolge, doluOrnek, dar]);

  const yol = useMemo(() => akiciYol(duraklar.map((d) => d.nokta)), [duraklar]);

  const tamamlanan = duraklar.filter((d) => d.durum === "tamamlandi").length;
  // Tamamlanan kısım ayrı bir yol olarak çizilir. `pathLength` + dasharray
  // burada yanıltıcı olurdu: viewBox `preserveAspectRatio="none"` ile yatayda
  // esnediği için yol uzunluğu oranı görsel orana denk gelmiyor.
  const tamamYol = useMemo(
    () => (tamamlanan > 1 ? akiciYol(duraklar.slice(0, tamamlanan).map((d) => d.nokta)) : ""),
    [duraklar, tamamlanan],
  );

  const secili = duraklar.find((d) => d.sira === seciliSira) ?? duraklar[0];

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <header className={styles.topBar}>
        <span className={styles.previewChip}>
          <Ikon ad="harita" boyut={16} /> Tasarım Önizlemesi · v2
        </span>
        <Link className={styles.backLink} href="/tasarim">
          <Ikon ad="geri" boyut={18} /> Tasarım listesine dön
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

      <div className={styles.layout}>
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
                    aria-label={`${d.sira}. durak: ${d.title} — ${durumMetni[d.durum]}`}
                    onClick={() => setSeciliSira(d.sira)}
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
                      <em>{durumMetni[d.durum]}</em>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className={styles.panel} aria-live="polite">
          <div className={styles.panelTop}>
            <span>Seçili keşif durağı</span>
            <strong>
              {secili.order} / 35
            </strong>
          </div>
          <div className={styles.panelHero}>
            <YedekliGorsel
              src={`/kapaklar/kapak-${secili.key}.png`}
              yedekSrc="/kapaklar/placeholder.svg"
              alt={`${secili.title} kitap kapağı`}
              width={200}
              height={300}
              className={styles.panelCover}
            />
            <div>
              <span className={`${styles.chip} ${styles[`chip_${secili.durum}`]}`}>
                <Ikon ad={durumIkonu[secili.durum]} boyut={14} /> {durumMetni[secili.durum]}
              </span>
              <h2>{secili.title}</h2>
              <p>{secili.subtitle}</p>
            </div>
          </div>
          {secili.description ? (
            <p className={styles.panelDesc}>{secili.description}</p>
          ) : null}
          <div className={styles.panelMeta}>
            <span>Bölüm sayısı</span>
            <strong>{secili.chapterCount}</strong>
          </div>
          <div className={styles.panelSpacer} />
          {secili.durum === "hazirlaniyor" ? (
            <p className={styles.panelNote}>
              {secili.chapterCount} bölümlük içerik tamamlandığında bu durak açılacak.
            </p>
          ) : (
            <button type="button" className={styles.panelAction}>
              <Ikon ad={secili.durum === "tamamlandi" ? "kitap" : "ok-sag"} boyut={18} />
              {secili.durum === "tamamlandi" ? "Tekrar Oku" : "Yolculuğa Başla"}
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}
