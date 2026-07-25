"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { atlasRegions } from "../../../src/data/atlasCatalog";
import { rozetIconKey } from "../../../src/lib/derive";
import { Ikon, OdulIkonu, YedekliGorsel } from "../../../src/components/ui";
// Kabuğun tamamı BİREBİR mevcut `/map` yapısıdır: üst bar, bölge rayı, sahne,
// panel/drawer, Keşif İskelesi. Aynı sınıflar, aynı CSS modülü.
import atlas from "../harita-yeni/harita-yeni.module.css";
import styles from "./harita-v2.module.css";

/**
 * KEŞİF BÖLGESİ — TASARIM ÖNİZLEMESİ (v2)
 *
 * Bu önizlemede YENİDEN ELE ALINAN TEK ŞEY: sahnedeki yol çizimi ve durak
 * işaretleri. Üst bar, bölge rayı, sahne kabuğu, panel/drawer ve Keşif
 * İskelesi `/map` ile birebir aynıdır.
 *
 * Çözülen sorunlar:
 *  1. Sabit yol: mevcut rota her bölgede 6 duraklık çiziliyor; 4 kitaplık
 *     bölgede altta boş sarkan çizgi kalıyor. Burada yol duraklardan TÜRETİLİR.
 *  2. Çift işaret: daire + ayrı etiket kartı yerine tek madalyon.
 *  3. Kesilen ad: 144px sabit + nowrap yerine iki satıra saran ad.
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
  // Dar ekranda en fazla 2 sütun: 3 sütunda ad etiketleri yan yana sığmıyor.
  const enCokSutun = dar ? 2 : 3;
  const sutun = Math.min(enCokSutun, adet <= 3 ? adet : Math.ceil(adet / 2));
  const sira = Math.ceil(adet / sutun);

  // Duraklar sahne başlığının ALTINDAN başlar. Dar ekranda başlık + bölge
  // açıklaması çok daha fazla satıra yayıldığı için başlangıç aşağı çekilir;
  // yoksa ilk sıra madalyonları açıklama metninin üstüne biniyor.
  const xBas = dar ? 27 : 16;
  const xSon = dar ? 73 : 84;
  // Dar ekranda alt sınır 78: Keşif İskelesi `sticky` olduğu için sayfanın
  // altında durur ve daha aşağıdaki durakları örter (ölçüldü).
  const yBas = sira === 1 ? (dar ? 60 : 60) : dar ? 40 : 38;
  const ySon = dar ? 72 : 84;

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
 * Kontrol noktaları parça sınırlarına kelepçelenir; yılan düzeninde yön ters
 * döndüğünde yol kendi üstüne kıvrılmıyor.
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

// Önizleme için örnek profil — `/map`'te bu veri Supabase'ten gelir.
const ornekProfil = { ad: "Deneme 1", unvan: "Değer Toplayıcısı", avatarAnahtari: "erkek-1" };

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
  // Tamamlanan kısım ayrı yol olarak çizilir; `pathLength` + dasharray burada
  // yanıltıcı olurdu (viewBox yatayda esniyor).
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

  const toplamRozet = duraklar.reduce((t, d) => t + d.tamamlananBolum, 0);
  const tamamlananKitap = tamamlanan;

  return (
    <main className={`tema-cocuk ${atlas.page}`}>
      {/* Önizleme çubuğu — yalnız bu tasarım rotasına aittir, üründe yoktur. */}
      <div className={styles.previewBar}>
        <span className={styles.previewChip}>
          <Ikon ad="harita" boyut={16} /> Tasarım Önizlemesi · v2
        </span>
        <Link className={styles.previewLink} href="/tasarim">
          Tasarım listesine dön
        </Link>
        <label className={styles.previewToggle}>
          <input
            type="checkbox"
            checked={doluOrnek}
            onChange={(e) => setDoluOrnek(e.target.checked)}
          />
          <span>Örnek dolu ilerleme</span>
        </label>
      </div>

      <div className={atlas.atlasShell}>
        {/* --- üst bar: /map ile birebir --- */}
        <header className={atlas.explorerBar}>
          <div className={atlas.previewGroup}>
            <span className={atlas.previewBadge}>
              <Ikon ad="harita" boyut={17} /> Keşif Dünyası
            </span>
            <button className={atlas.backLink} type="button">
              <Ikon ad="geri" boyut={18} /> Profil Seçimine Dön
            </button>
          </div>
          <div className={atlas.profileGroup}>
            <span className={atlas.avatar}>
              <OdulIkonu tip="avatar" anahtar={ornekProfil.avatarAnahtari} boyut={42} alt="" />
            </span>
            <span className={atlas.profileCopy}>
              <strong>{ornekProfil.ad}</strong>
              <small>
                <Ikon ad="yildiz" boyut={12} /> {ornekProfil.unvan}
              </small>
            </span>
          </div>
          <dl className={atlas.profileStats} aria-label="Keşif özeti">
            <div>
              <dt>Toplam Rozet</dt>
              <dd>
                <Ikon ad="rozet" boyut={19} /> {toplamRozet}
              </dd>
            </div>
            <div>
              <dt>Kitap Tamamlandı</dt>
              <dd>
                <Ikon ad="kitap" boyut={19} /> {tamamlananKitap}
              </dd>
            </div>
          </dl>
        </header>

        {/* --- bölge rayı: /map ile birebir --- */}
        <section className={atlas.regionRail} aria-labelledby="regions-title">
          <div className={atlas.regionIntro}>
            <span>
              <Ikon ad="harita" boyut={20} />
            </span>
            <div>
              <p id="regions-title">Keşif Bölgeleri</p>
              <small>Yeni bir dünya seç</small>
            </div>
          </div>
          <div className={atlas.regionTabs} role="tablist" aria-label="Keşif bölgeleri">
            {atlasRegions.map((item, i) => (
              <button
                type="button"
                role="tab"
                aria-selected={i === bolgeIndex}
                className={i === bolgeIndex ? atlas.regionTabActive : ""}
                key={item.id}
                onClick={() => {
                  setBolgeIndex(i);
                  setSeciliSira(1);
                  setDetayAcik(false);
                }}
              >
                <span>{item.order}</span>
                <strong>{item.name}</strong>
                <small>{item.books.length} kitap</small>
              </button>
            ))}
          </div>
        </section>

        <div className={atlas.workspace}>
          {/* --- sahne kabuğu birebir; İÇİNDEKİ yol ve duraklar YENİ --- */}
          <section
            className={atlas.mapStage}
            data-region={bolge.order}
            aria-labelledby="atlas-title"
          >
            <div className={atlas.mapShade} aria-hidden="true" />
            <div className={`${atlas.mapHeading} ${styles.headingRoom}`}>
              <p>
                {bolge.order}. Keşif Bölgesi · {bolge.books.length} kitap
              </p>
              <h1 id="atlas-title">{bolge.name}</h1>
              {bolge.subtitle ? <strong>{bolge.subtitle}</strong> : null}
              <span>{bolge.description}</span>
            </div>
            {/* Bölge ruh hâli metni ("Başlangıç ve merak" vb.) kaldırıldı;
                o köşe bölge sayacına ayrıldı. Sayaç eskiden sağ alttaydı ve
                son sıradaki kitap etiketinin üstüne biniyordu. */}

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

            <div className={`${atlas.regionPager} ${styles.pagerTop}`}>
              <button
                type="button"
                disabled={bolgeIndex === 0}
                aria-label="Önceki keşif bölgesi"
                onClick={() => {
                  setBolgeIndex(bolgeIndex - 1);
                  setSeciliSira(1);
                }}
              >
                <Ikon ad="ok-sol" boyut={17} />
              </button>
              <span>
                {bolge.order} / {atlasRegions.length}
              </span>
              <button
                type="button"
                disabled={bolgeIndex === atlasRegions.length - 1}
                aria-label="Sonraki keşif bölgesi"
                onClick={() => {
                  setBolgeIndex(bolgeIndex + 1);
                  setSeciliSira(1);
                }}
              >
                <Ikon ad="ok-sag" boyut={17} />
              </button>
            </div>
          </section>

          {/* --- panel / drawer: /map ile birebir --- */}
          <button
            type="button"
            className={`${atlas.drawerBackdrop} ${detayAcik ? atlas.drawerBackdropOpen : ""}`}
            aria-label="Kitap detayını kapat"
            onClick={() => setDetayAcik(false)}
          />

          <aside
            className={`${atlas.bookPanel} ${detayAcik ? atlas.bookPanelOpen : ""}`}
            aria-labelledby="selected-book-title"
          >
            <div className={atlas.drawerHeader}>
              <button type="button" onClick={() => setDetayAcik(false)}>
                <Ikon ad="geri" boyut={22} /> Haritaya Dön
              </button>
              <strong>{secili.order} / 35</strong>
            </div>
            <div className={atlas.panelTopline}>
              <span>Seçili keşif durağı</span>
              <strong>{secili.order} / 35</strong>
            </div>
            <div className={atlas.bookHero}>
              <div className={atlas.coverFrame}>
                <YedekliGorsel
                  src={`/kapaklar/kapak-${secili.key}.png`}
                  yedekSrc="/kapaklar/placeholder.svg"
                  alt={`${secili.title} kitap kapağı`}
                  width={597}
                  height={891}
                  className={atlas.cover}
                />
                {kilitli ? (
                  <span className={atlas.coverLock}>
                    <Ikon ad="kilit" boyut={22} />
                  </span>
                ) : null}
              </div>
              <div className={atlas.bookIdentity}>
                <span className={`${atlas.statusChip} ${atlas[`chip_${secili.durum}`]}`}>
                  <Ikon ad={durumIkonu[secili.durum]} boyut={15} />{" "}
                  {durumMetni(secili.durum, secili.tamamlananBolum)}
                </span>
                <h2 id="selected-book-title">{secili.title}</h2>
                <p>{secili.subtitle}</p>
              </div>
            </div>
            {secili.description ? (
              <p className={atlas.bookDescription}>{secili.description}</p>
            ) : null}

            {hazirDegil ? (
              <div className={atlas.preparingCard}>
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
                <div className={atlas.progressBlock}>
                  <div>
                    <span>Bölüm ilerlemesi</span>
                    <strong>
                      {secili.tamamlananBolum} / {secili.chapterCount}
                    </strong>
                  </div>
                  <div
                    className={atlas.progressTrack}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={secili.ilerleme}
                  >
                    <span style={{ width: `${secili.ilerleme}%` }} />
                  </div>
                </div>
                <section className={atlas.chapterRewards} aria-labelledby="chapter-rewards-title">
                  <div className={atlas.rewardHeading}>
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
                <section className={atlas.medalCard} aria-label="Kitap madalyası">
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

            <div className={atlas.panelSpacer} />
            {!hazirDegil && !kilitli ? (
              <button type="button" className={atlas.primaryAction}>
                <Ikon ad={secili.durum === "completed" ? "kitap" : "ok-sag"} boyut={19} />{" "}
                {aksiyon}
              </button>
            ) : null}
          </aside>
        </div>

        {/* --- Keşif İskelesi: /map ile birebir --- */}
        <nav className={atlas.exploreDock} aria-label="Keşif menüsü">
          <span>Keşif İskelesi</span>
          <button type="button">
            <Ikon ad="rozet" boyut={21} /> Kazanımlarım
          </button>
          <button type="button">
            <Ikon ad="kitap" boyut={21} /> Kelime Defterim
          </button>
          <button type="button">
            <Ikon ad="fener" boyut={21} /> Görevlerim
          </button>
        </nav>
      </div>
    </main>
  );
}
