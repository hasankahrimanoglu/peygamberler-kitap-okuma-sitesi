"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const MOBIL_PANEL_SORGUSU = "(max-width: 620px)";
const YIGIN_PANEL_SORGUSU = "(max-width: 959px)";
const MOBIL_PANEL_GECMIS_ANAHTARI = "atlasChapterPanel";
const ODAKLANABILIR_OGELER =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  kitapBitti,
  yukleniyor,
  quizYolu,
  onHaritayaDon,
  onBolumAc,
  onFinalAc,
}: KitapBolumRotasiProps) {
  const toplamBolum = bolumler.length;
  const etkinTamamlananBolum = kitapBitti
    ? toplamBolum
    : Math.min(Math.max(0, tamamlananBolum), toplamBolum);
  const etkinIlerlemeYuzdesi = toplamBolum === 0
    ? 0
    : Math.round((etkinTamamlananBolum / toplamBolum) * 100);
  const aktifIndex = kitapBitti
    ? Math.max(0, toplamBolum - 1)
    : Math.min(etkinTamamlananBolum, Math.max(0, toplamBolum - 1));
  const [secim, setSecim] = useState<Secim>(aktifIndex);
  const [mobilDetayAcik, setMobilDetayAcik] = useState(false);
  const panelKapatRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sonDurakRef = useRef<HTMLButtonElement>(null);
  const oncekiPanelDurumuRef = useRef(false);

  const finalAcik = Boolean(quizYolu) && etkinTamamlananBolum >= toplamBolum;
  const finalSecili = secim === "final";
  const seciliBolum = finalSecili ? null : bolumler[secim];

  function bolumDurumu(index: number): BolumDurumu {
    if (index < etkinTamamlananBolum || kitapBitti) return "tamamlandi";
    if (index === etkinTamamlananBolum && bolumler[index]?.okumaYolu) return "aktif";
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
  const panelBaslikId = `bolum-panel-baslik-${finalSecili ? "final" : seciliSira}`;
  const panelAciklamaId = `bolum-panel-aciklama-${finalSecili ? "final" : seciliSira}`;

  const mobilDetayiKapat = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI] !== undefined
    ) {
      window.history.back();
      return;
    }

    setMobilDetayAcik(false);
  }, []);

  const secimYap = useCallback(
    (yeniSecim: Secim, tetikleyici: HTMLButtonElement) => {
      setSecim(yeniSecim);
      sonDurakRef.current = tetikleyici;

      if (
        typeof window === "undefined"
      ) {
        return;
      }

      if (!window.matchMedia(MOBIL_PANEL_SORGUSU).matches) {
        if (window.matchMedia(YIGIN_PANEL_SORGUSU).matches) {
          const azaltIlmisHareket = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          window.requestAnimationFrame(() => {
            panelRef.current?.scrollIntoView({
              behavior: azaltIlmisHareket ? "auto" : "smooth",
              block: "start",
            });
          });
        }

        return;
      }

      if (!mobilDetayAcik) {
        window.history.pushState(
          {
            ...window.history.state,
            [MOBIL_PANEL_GECMIS_ANAHTARI]: yeniSecim,
          },
          "",
          window.location.href,
        );
      } else {
        window.history.replaceState(
          {
            ...window.history.state,
            [MOBIL_PANEL_GECMIS_ANAHTARI]: yeniSecim,
          },
          "",
          window.location.href,
        );
      }

      setMobilDetayAcik(true);
    },
    [mobilDetayAcik],
  );

  const panelGecmisiniTemizle = useCallback(() => {
    if (
      typeof window === "undefined" ||
      window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI] === undefined
    ) {
      return;
    }

    const yeniGecmisDurumu = { ...window.history.state };
    delete yeniGecmisDurumu[MOBIL_PANEL_GECMIS_ANAHTARI];
    window.history.replaceState(yeniGecmisDurumu, "", window.location.href);
  }, []);

  const bolumAksiyonunuCalistir = useCallback(
    (yol: string) => {
      panelGecmisiniTemizle();
      setMobilDetayAcik(false);
      onBolumAc(yol);
    },
    [onBolumAc, panelGecmisiniTemizle],
  );

  const finalAksiyonunuCalistir = useCallback(
    (yol: string) => {
      panelGecmisiniTemizle();
      setMobilDetayAcik(false);
      onFinalAc(yol);
    },
    [onFinalAc, panelGecmisiniTemizle],
  );

  useEffect(() => {
    const mobilSorgu = window.matchMedia(MOBIL_PANEL_SORGUSU);

    const gecmistenPanelDurumunuOku = () => {
      const gecmistekiSecim =
        window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI];
      const gecerliBolumSecimi =
        typeof gecmistekiSecim === "number" &&
        Number.isInteger(gecmistekiSecim) &&
        gecmistekiSecim >= 0 &&
        gecmistekiSecim < toplamBolum;
      const gecerliSecim = gecmistekiSecim === "final" || gecerliBolumSecimi;

      if (mobilSorgu.matches && gecerliSecim) {
        setSecim(gecmistekiSecim as Secim);
        setMobilDetayAcik(true);
        return;
      }

      setMobilDetayAcik(false);

      if (
        !mobilSorgu.matches &&
        window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI] !== undefined
      ) {
        panelGecmisiniTemizle();
      }
    };

    const klavyeyiDinle = (olay: KeyboardEvent) => {
      if (!mobilDetayAcik) return;

      if (olay.key === "Escape") {
        mobilDetayiKapat();
        return;
      }

      if (olay.key !== "Tab" || !panelRef.current) return;

      const odaklanabilirOgeler = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(ODAKLANABILIR_OGELER),
      ).filter((oge) => oge.offsetParent !== null);

      if (odaklanabilirOgeler.length === 0) {
        olay.preventDefault();
        return;
      }

      const ilkOge = odaklanabilirOgeler[0];
      const sonOge = odaklanabilirOgeler[odaklanabilirOgeler.length - 1];
      const aktifOge = document.activeElement;

      if (
        olay.shiftKey &&
        (aktifOge === ilkOge || !panelRef.current.contains(aktifOge))
      ) {
        olay.preventDefault();
        sonOge.focus();
      } else if (
        !olay.shiftKey &&
        (aktifOge === sonOge || !panelRef.current.contains(aktifOge))
      ) {
        olay.preventDefault();
        ilkOge.focus();
      }
    };

    window.addEventListener("popstate", gecmistenPanelDurumunuOku);
    window.addEventListener("keydown", klavyeyiDinle);
    mobilSorgu.addEventListener("change", gecmistenPanelDurumunuOku);
    gecmistenPanelDurumunuOku();

    return () => {
      window.removeEventListener("popstate", gecmistenPanelDurumunuOku);
      window.removeEventListener("keydown", klavyeyiDinle);
      mobilSorgu.removeEventListener("change", gecmistenPanelDurumunuOku);
    };
  }, [mobilDetayAcik, mobilDetayiKapat, panelGecmisiniTemizle, toplamBolum]);

  useEffect(() => {
    if (mobilDetayAcik) {
      const oncekiTasima = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => panelKapatRef.current?.focus());

      return () => {
        document.body.style.overflow = oncekiTasima;
      };
    }

    if (oncekiPanelDurumuRef.current) {
      window.requestAnimationFrame(() => sonDurakRef.current?.focus());
    }

    oncekiPanelDurumuRef.current = mobilDetayAcik;
    return undefined;
  }, [mobilDetayAcik]);

  useEffect(() => {
    oncekiPanelDurumuRef.current = mobilDetayAcik;
  }, [mobilDetayAcik]);

  function bolumAcilmaKosulu(index: number) {
    const oncekiBolum = bolumler[index - 1];
    if (!oncekiBolum) return "Bu bölüm henüz açılmadı.";
    return `${index + 1}. Bölüm, ${index}. Bölüm “${temizBaslik(oncekiBolum.title)}” tamamlandığında açılacak.`;
  }

  const panelAksiyonu = finalSecili
    ? finalAcik && !kitapBitti && quizYolu
      ? {
          etiket: "Final Testine Geç",
          tekrar: false,
          calistir: () => finalAksiyonunuCalistir(quizYolu),
        }
      : null
    : seciliBolum && seciliDurum !== "kilitli"
      ? {
          etiket: seciliDurum === "tamamlandi"
            ? "Tekrar Oku"
            : etkinTamamlananBolum === 0
              ? "Yolculuğa Başla"
              : "Okumaya Devam Et",
          tekrar: seciliDurum === "tamamlandi",
          calistir: () => bolumAksiyonunuCalistir(seciliBolum.okumaYolu),
        }
      : null;

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
            <div><dt>Bölüm</dt><dd>{yukleniyor ? "—" : `${etkinTamamlananBolum} / ${toplamBolum}`}</dd></div>
            <div><dt>Rozet</dt><dd><Ikon ad="rozet" boyut={16} /> {yukleniyor ? "—" : etkinTamamlananBolum}</dd></div>
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
                <path className={styles.trailProgress} pathLength="100" style={{ strokeDasharray: `${etkinIlerlemeYuzdesi} 100` }} d="M25 9 C43 3 58 3 75 9 C88 15 88 26 75 32 C58 40 42 25 25 32 C12 38 12 50 25 56 C42 64 58 49 75 56 C88 62 88 74 75 80 C58 88 42 73 25 80 C18 84 28 91 50 97" />
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
                        aria-label={`${index + 1}. bölüm, ${temizBaslik(bolum.title)}, ${DURUM_METINLERI[durum]}${bolum.gorev ? ", Bugüne Taşı görevi var" : ""}`}
                        onClick={(olay) => secimYap(index, olay.currentTarget)}
                      >
                        <span className={styles.stopMarker}><span>{index + 1}</span><Ikon ad={DURUM_IKONLARI[durum]} boyut={17} /></span>
                        <span className={styles.stopCopy}><strong>{temizBaslik(bolum.title)}</strong><small>{DURUM_METINLERI[durum]}</small></span>
                        {bolum.gorev ? <span className={styles.taskPin} title="Bu bölümde Bugüne Taşı görevi var"><Ikon ad="dusunce" boyut={14} /> Görev</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <button type="button" className={`${styles.finalGate} ${finalSecili ? styles.finalSelected : ""}`} aria-pressed={finalSecili} aria-label={`Büyük Final Testi, ${DURUM_METINLERI[kitapBitti ? "tamamlandi" : finalAcik ? "aktif" : "kilitli"]}`} onClick={(olay) => secimYap("final", olay.currentTarget)}>
                <span className={styles.finalIcon}><Ikon ad={kitapBitti ? "onay" : finalAcik ? "fener" : "kilit"} boyut={18} /></span>
                <span><small>Final kapısı</small><strong>Büyük Final Testi</strong></span>
              </button>
            </div>
          </section>

          <button
            type="button"
            className={`${styles.mobilePanelBackdrop} ${mobilDetayAcik ? styles.mobilePanelBackdropOpen : ""}`}
            aria-label="Bölüm ayrıntılarını kapat"
            aria-hidden="true"
            tabIndex={-1}
            onClick={mobilDetayiKapat}
          />

          <aside
            ref={panelRef}
            className={`${styles.detailPanel} ${styles.chapterDrawerPanel} ${mobilDetayAcik ? styles.chapterDrawerPanelOpen : ""}`}
            aria-labelledby={panelBaslikId}
            aria-describedby={panelAciklamaId}
            aria-modal={mobilDetayAcik ? true : undefined}
            role={mobilDetayAcik ? "dialog" : undefined}
          >
            <div className={styles.drawerScrollBody}>
              <div className={styles.mobileChapterPanelHeader}>
                <button
                  ref={panelKapatRef}
                  type="button"
                  className={styles.mobilePanelClose}
                  onClick={mobilDetayiKapat}
                >
                  <Ikon ad="geri" boyut={17} /> Bölüm Rotasına Dön
                </button>
                <span>{finalSecili ? "Final" : `${seciliSira} / ${toplamBolum}`}</span>
              </div>
              <div className={styles.bookSummary}>
                <div className={styles.coverFrame}>
                  <YedekliGorsel src={`/kapaklar/kapak-${kitapKey}.png`} yedekSrc="/kapaklar/placeholder.svg" alt={`${kitapAdi} kitap kapağı`} width={112} height={168} className={styles.cover} />
                </div>
                <div className={styles.bookCopy}><p>{kitapAdi}</p><h2>{altBaslik}</h2></div>
              </div>
              <div className={styles.bookProgressBlock}>
                <div className={styles.bookProgressLabel}>
                  <span>Bölüm ilerlemesi</span>
                  <strong>{yukleniyor ? "—" : `${etkinTamamlananBolum} / ${toplamBolum}`}</strong>
                </div>
                <div
                  className={styles.bookProgress}
                  role="progressbar"
                  aria-label={`${kitapAdi} bölüm ilerlemesi`}
                  aria-valuemin={0}
                  aria-valuemax={toplamBolum}
                  aria-valuenow={yukleniyor ? undefined : etkinTamamlananBolum}
                  aria-valuetext={yukleniyor ? "Bölüm ilerlemesi yükleniyor" : `${etkinTamamlananBolum} / ${toplamBolum} bölüm tamamlandı`}
                  aria-busy={yukleniyor}
                >
                  <span style={{ width: `${etkinIlerlemeYuzdesi}%` }} />
                </div>
              </div>

              <div className={styles.selectedContent} data-selection={finalSecili ? "final" : seciliSira} data-state={seciliDurum} key={finalSecili ? "final" : seciliBolum?.id}>
                {finalSecili ? (
                  <>
                    <div className={styles.selectionMeta}>
                      <span>Yolculuğun sonu</span>
                      <span className={`${styles.statusChip} ${styles[seciliDurum]}`}><Ikon ad={DURUM_IKONLARI[seciliDurum]} boyut={15} /> {DURUM_METINLERI[seciliDurum]}</span>
                    </div>
                    <div className={styles.rewardHero}>
                      <YedekliGorsel src={`/madalyalar/madalya-${kitapKey}.png`} yedekSrc="/madalyalar/placeholder.svg" alt={`${kitapAdi} Yolculuk Madalyası`} width={82} height={82} className={`${styles.rewardImage} ${kitapBitti ? "" : styles.rewardPending}`} />
                      <div><p>Yolculuk sonu</p><h3 id={panelBaslikId}>Büyük Final Testi</h3></div>
                    </div>
                    <p id={panelAciklamaId} className={styles.summaryText}>Bölümlerde keşfettiğin değerleri hatırla ve {kitapAdi} yolculuğunu tamamla.</p>
                    <div className={styles.rewardRow}><Ikon ad="madalya" boyut={22} /><span><small>{kitapBitti ? "Kazanılan madalya" : "Kazanılacak madalya"}</small><strong>{kitapAdi} Yolculuk Madalyası</strong></span></div>
                    {!finalAcik && !kitapBitti ? <div className={styles.lockNotice}><Ikon ad="kilit" boyut={19} /><p>{toplamBolum}. Bölüm “{temizBaslik(bolumler[toplamBolum - 1]?.title ?? "Son Bölüm")}” tamamlandığında Büyük Final Testi açılacak.</p></div> : null}
                  </>
                ) : seciliBolum ? (
                  <>
                    <div className={styles.chapterTitleBlock}>
                      <div className={styles.chapterTitleMeta}>
                        <span className={`${styles.statusChip} ${styles[seciliDurum]}`}><Ikon ad={DURUM_IKONLARI[seciliDurum]} boyut={15} /> {DURUM_METINLERI[seciliDurum]}</span>
                        <span className={styles.chapterKicker}>{seciliSira}. Bölüm</span>
                      </div>
                      <h3 id={panelBaslikId}>{temizBaslik(seciliBolum.title)}</h3>
                    </div>
                    <p id={panelAciklamaId} className={styles.summaryText}>{seciliBolum.ozet}</p>
                    <div className={styles.rewardRow}>
                      <YedekliGorsel src={`/rozetler/rozet-${kitapKey}-bolum-${seciliSira}.png`} yedekSrc="/rozetler/placeholder.svg" alt={`${seciliBolum.badgeName} görseli`} width={58} height={58} className={`${styles.rewardImage} ${seciliDurum === "tamamlandi" ? "" : styles.rewardPending}`} />
                      <span><small>{seciliDurum === "tamamlandi" ? "Kazanılan rozet" : "Kazanılacak rozet"}</small><strong>{seciliBolum.badgeName}</strong></span>
                    </div>
                    {seciliBolum.gorev ? <div className={styles.taskNote}><span className={styles.taskIcon}><Ikon ad="dusunce" boyut={19} /></span><div><small>Bu bölümde Bugüne Taşı var</small><strong>{seciliBolum.gorev.ad}</strong><p>{seciliBolum.gorev.kategori} · {seciliBolum.gorev.sure}</p></div></div> : null}
                    {seciliDurum === "kilitli" ? <div className={styles.lockNotice}><Ikon ad="kilit" boyut={19} /><p>{bolumAcilmaKosulu(secim)}</p></div> : null}
                  </>
                ) : null}
              </div>
            </div>
            {panelAksiyonu ? (
              <div className={styles.drawerFooter}>
                <button
                  type="button"
                  className={`${styles.primaryAction} ${panelAksiyonu.tekrar ? styles.reReadAction : ""}`}
                  onClick={panelAksiyonu.calistir}
                >
                  {panelAksiyonu.etiket}<Ikon ad="ok-sag" boyut={19} />
                </button>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
