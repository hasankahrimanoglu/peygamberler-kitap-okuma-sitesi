"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { rozetIconKey } from "../../lib/derive";
import { Ikon, OdulIkonu, YedekliGorsel } from "../ui";
import styles from "../../../app/tasarim/harita-yeni/harita-yeni.module.css";

export type AtlasDurakDurumu = "completed" | "active" | "locked";

export type AtlasDurak = {
  id: number;
  kitapKey: "adem" | "nuh" | "ebubekir" | "omer";
  ad: string;
  altBaslik: string;
  aciklama: string;
  durum: AtlasDurakDurumu;
  tamamlananBolum: number;
  toplamBolum: number;
  ilerleme: number;
  sonRozet?: string;
  madalyaKazanildi: boolean;
};

type AtlasHaritaProps = {
  profil: {
    ad: string;
    avatarAnahtari: string;
    unvan: string;
  };
  toplamRozet: number;
  tamamlananKitap: number;
  duraklar: AtlasDurak[];
  yukleniyor?: boolean;
  bildirim?: string | null;
  onProfilSecimineDon: () => void;
};

const DURUM_IKONLARI = {
  tamamlandi: "onay",
  aktif: "fener",
  kilitli: "kilit",
} as const;

const MOBIL_PANEL_SORGUSU = "(max-width: 620px)";
const MOBIL_PANEL_GECMIS_ANAHTARI = "atlasBookPanel";
const ODAKLANABILIR_OGELER =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function atlasDurumu(durum: AtlasDurakDurumu) {
  if (durum === "completed") return "tamamlandi" as const;
  if (durum === "locked") return "kilitli" as const;
  return "aktif" as const;
}

function durumMetni(durak: AtlasDurak) {
  if (durak.durum === "completed") return "Tamamlandı";
  if (durak.durum === "locked") return "Kilitli";
  return durak.tamamlananBolum > 0 ? "Devam Ediyor" : "Yeni Açıldı";
}

function acilmaKosulu(durak: AtlasDurak, duraklar: AtlasDurak[]) {
  const onceki = duraklar.find((aday) => aday.id === durak.id - 1);
  if (!onceki) return "Bu yolculuk henüz açılmadı.";
  return `${durak.ad} yolculuğu, ${onceki.ad} kitabının finalini tamamladığında açılacak.`;
}

export function AtlasHarita({
  profil,
  toplamRozet,
  tamamlananKitap,
  duraklar,
  yukleniyor = false,
  bildirim,
  onProfilSecimineDon,
}: AtlasHaritaProps) {
  const router = useRouter();
  const [seciliDurakId, setSeciliDurakId] = useState(duraklar[0]?.id ?? 1);
  const [mobilDetayAcik, setMobilDetayAcik] = useState(false);
  const panelKapatRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sonDurakRef = useRef<HTMLButtonElement>(null);
  const oncekiPanelDurumuRef = useRef(false);
  const seciliDurak =
    duraklar.find((durak) => durak.id === seciliDurakId) ?? duraklar[0];
  const durakKonumlari = [
    styles.stopOne,
    styles.stopTwo,
    styles.stopThree,
    styles.stopFour,
  ];
  const tamamlananRota = useMemo(() => {
    if (duraklar.length <= 1) return 0;
    const tamamlanan = duraklar.filter((durak) => durak.durum === "completed").length;
    const aktifPayi = duraklar.some((durak) => durak.durum === "active") ? 0.45 : 0;
    return Math.min(100, ((tamamlanan + aktifPayi) / (duraklar.length - 1)) * 100);
  }, [duraklar]);

  const mobilDetayiKapat = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI]
    ) {
      window.history.back();
      return;
    }

    setMobilDetayAcik(false);
  }, []);

  const durakSec = useCallback(
    (durakId: number, tetikleyici: HTMLButtonElement) => {
      setSeciliDurakId(durakId);
      sonDurakRef.current = tetikleyici;

      if (typeof window === "undefined" || !window.matchMedia(MOBIL_PANEL_SORGUSU).matches) {
        return;
      }

      if (!mobilDetayAcik) {
        window.history.pushState(
          {
            ...window.history.state,
            [MOBIL_PANEL_GECMIS_ANAHTARI]: durakId,
          },
          "",
          window.location.href,
        );
      }

      setMobilDetayAcik(true);
    },
    [mobilDetayAcik],
  );

  useEffect(() => {
    const mobilSorgu = window.matchMedia(MOBIL_PANEL_SORGUSU);

    const gecmistenPanelDurumunuOku = () => {
      const gecmistekiDurakId =
        window.history.state?.[MOBIL_PANEL_GECMIS_ANAHTARI];

      if (mobilSorgu.matches && typeof gecmistekiDurakId === "number") {
        setSeciliDurakId(gecmistekiDurakId);
        setMobilDetayAcik(true);
        return;
      }

      setMobilDetayAcik(false);

      if (!mobilSorgu.matches && gecmistekiDurakId) {
        const yeniGecmisDurumu = { ...window.history.state };
        delete yeniGecmisDurumu[MOBIL_PANEL_GECMIS_ANAHTARI];
        window.history.replaceState(yeniGecmisDurumu, "", window.location.href);
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

      if (olay.shiftKey && (aktifOge === ilkOge || !panelRef.current.contains(aktifOge))) {
        olay.preventDefault();
        sonOge.focus();
      } else if (!olay.shiftKey && (aktifOge === sonOge || !panelRef.current.contains(aktifOge))) {
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
  }, [mobilDetayAcik, mobilDetayiKapat]);

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

  if (!seciliDurak) return null;

  const seciliDurum = atlasDurumu(seciliDurak.durum);
  const seciliDurumMetni = durumMetni(seciliDurak);
  const toplamBolum = Math.max(1, seciliDurak.toplamBolum);
  const tamamlananBolum =
    seciliDurak.durum === "completed"
      ? toplamBolum
      : Math.min(Math.max(0, seciliDurak.tamamlananBolum), toplamBolum);
  const ilerleme =
    seciliDurak.durum === "completed"
      ? 100
      : Math.min(100, Math.max(0, seciliDurak.ilerleme));
  const rozetSutunSayisi =
    toplamBolum >= 9 ? 5 : toplamBolum >= 6 ? 4 : toplamBolum;
  const bolumRozetleri = Array.from({ length: toplamBolum }, (_, index) => {
    const bolumNo = index + 1;
    const durum =
      seciliDurak.durum === "completed" || index < tamamlananBolum
        ? "earned"
        : seciliDurak.durum === "active" && index === tamamlananBolum
          ? "available"
          : "locked";

    return {
      bolumNo,
      iconKey: rozetIconKey(seciliDurak.kitapKey, bolumNo),
      durum,
    } as const;
  });
  const aksiyon =
    seciliDurak.durum === "completed"
      ? "Tekrar Oku"
      : seciliDurak.tamamlananBolum > 0
        ? "Okumaya Devam Et"
        : "Yolculuğa Başla";

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <div className={styles.atlasShell}>
        <header className={styles.explorerBar}>
          <div className={styles.previewGroup}>
            <span className={styles.previewBadge}>
              <Ikon ad="harita" boyut={17} />
              Keşif Dünyası
            </span>
            <button className={styles.backLink} type="button" onClick={onProfilSecimineDon}>
              <Ikon ad="geri" boyut={18} />
              Profil Seçimine Dön
            </button>
          </div>

          <div className={styles.profileGroup}>
            <div className={styles.avatar} role="img" aria-label={`${profil.ad} avatarı`}>
              <OdulIkonu
                tip="avatar"
                anahtar={profil.avatarAnahtari}
                boyut={42}
                alt=""
              />
            </div>
            <div className={styles.profileCopy}>
              <strong>{profil.ad}</strong>
              <span>
                <Ikon ad="yildiz" boyut={13} /> {profil.unvan}
              </span>
            </div>
          </div>

          <dl className={styles.profileStats} aria-label="Keşif özeti">
            <div>
              <dt>Toplam Rozet</dt>
              <dd><Ikon ad="rozet" boyut={20} /> {yukleniyor ? "—" : toplamRozet}</dd>
            </div>
            <div>
              <dt>Kitap Tamamlandı</dt>
              <dd><Ikon ad="kitap" boyut={20} /> {yukleniyor ? "—" : tamamlananKitap}</dd>
            </div>
          </dl>
        </header>

        <div className={styles.workspace}>
          <section className={styles.mapStage} aria-labelledby="atlas-title">
            <div className={styles.mapHeading}>
              <p>İlk yol · {duraklar.length} keşif durağı</p>
              <h1 id="atlas-title">Masalsı Keşif Atlası</h1>
              <span>Bir durağa dokun, hikâyesini yakından gör.</span>
            </div>

            <div className={styles.compass} aria-hidden="true">
              <span className={styles.compassNorth}>K</span>
              <span className={styles.compassEast}>D</span>
              <span className={styles.compassSouth}>G</span>
              <span className={styles.compassWest}>B</span>
              <i />
            </div>

            <div className={styles.stars} aria-hidden="true">
              <i className={styles.starOne} /><i className={styles.starTwo} />
              <i className={styles.starThree} /><i className={styles.starFour} />
              <i className={styles.starFive} /><i className={styles.starSix} />
              <i className={styles.starSeven} />
            </div>
            <div className={styles.mountainBack} aria-hidden="true" />
            <div className={styles.mountainFront} aria-hidden="true" />
            <div className={styles.meadowMist} aria-hidden="true" />

            <svg className={styles.river} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M5 6 C24 18 6 31 20 44 S18 72 3 96" />
            </svg>
            <svg className={styles.trail} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.trailShadow} d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82" />
              <path className={styles.trailBase} pathLength="100" d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82" />
              <path
                className={styles.trailCompleted}
                pathLength="100"
                style={{ strokeDasharray: `${tamamlananRota} ${100 - tamamlananRota}` }}
                d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82"
              />
            </svg>
            <div className={styles.routeLight} aria-hidden="true" />

            <ol className={styles.stops} aria-label="Kitap keşif rotası">
              {duraklar.map((durak, index) => {
                const durum = atlasDurumu(durak.durum);
                const secili = durak.id === seciliDurak.id;
                return (
                  <li className={`${styles.stopItem} ${durakKonumlari[index] ?? ""}`} key={durak.id}>
                    <button
                      type="button"
                      className={`${styles.stopButton} ${styles[`stop_${durum}`]} ${secili ? styles.stopSelected : ""}`}
                      aria-pressed={secili}
                      aria-label={`${durak.id}. durak, ${durak.ad}, ${durumMetni(durak)}`}
                      onClick={(olay) => durakSec(durak.id, olay.currentTarget)}
                    >
                      <span className={styles.marker}>
                        <span className={styles.markerRing} />
                        <Ikon ad={DURUM_IKONLARI[durum]} boyut={durum === "aktif" ? 25 : 23} />
                      </span>
                      <span className={styles.stopLabel}>
                        <small>{durak.id}. durak</small>
                        <strong>{durak.ad}</strong>
                        <em>{durumMetni(durak)}</em>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className={styles.botanicalMark} aria-hidden="true"><i /><i /><i /></div>
          </section>

          <button
            type="button"
            className={`${styles.mobilePanelBackdrop} ${mobilDetayAcik ? styles.mobilePanelBackdropOpen : ""}`}
            aria-label="Kitap ayrıntılarını kapat"
            aria-hidden="true"
            tabIndex={-1}
            onClick={mobilDetayiKapat}
          />

          <aside
            ref={panelRef}
            className={`${styles.bookPanel} ${styles.drawerPanel} ${styles[`panel_${seciliDurum}`]} ${mobilDetayAcik ? styles.bookPanelOpen : ""}`}
            aria-labelledby={`atlas-panel-title-${seciliDurak.id}`}
            aria-describedby={`atlas-panel-description-${seciliDurak.id}`}
            aria-modal={mobilDetayAcik ? true : undefined}
            role={mobilDetayAcik ? "dialog" : undefined}
          >
            <div className={styles.panelContent} key={seciliDurak.id}>
              <div className={styles.panelScrollBody}>
                <div className={styles.mobilePanelHeader}>
                  <button
                    ref={panelKapatRef}
                    type="button"
                    className={styles.mobilePanelClose}
                    onClick={mobilDetayiKapat}
                  >
                    <Ikon ad="geri" boyut={18} /> Haritaya Dön
                  </button>
                  <div className={styles.panelTopline}>
                    <span>Seçili keşif durağı</span>
                    <span className={styles.panelOrder}>{seciliDurak.id} / {duraklar.length}</span>
                  </div>
                </div>
                <div className={styles.bookHero}>
                  <div className={styles.coverFrame}>
                    <YedekliGorsel
                      src={`/kapaklar/kapak-${seciliDurak.kitapKey}.png`}
                      yedekSrc="/kapaklar/placeholder.svg"
                      alt={`${seciliDurak.ad} kitap kapağı`}
                      width={597}
                      height={891}
                      className={styles.cover}
                    />
                    {seciliDurak.durum === "locked" ? (
                      <span className={styles.coverLock} aria-hidden="true"><Ikon ad="kilit" boyut={24} /></span>
                    ) : null}
                  </div>
                  <div className={styles.bookIdentity}>
                    <span className={styles.statusChip}>
                      <Ikon ad={DURUM_IKONLARI[seciliDurum]} boyut={15} /> {seciliDurumMetni}
                    </span>
                    <h2 id={`atlas-panel-title-${seciliDurak.id}`}>{seciliDurak.ad}</h2>
                    <p>{seciliDurak.altBaslik}</p>
                  </div>
                </div>
                <p id={`atlas-panel-description-${seciliDurak.id}`} className={styles.description}>{seciliDurak.aciklama}</p>
                <div className={styles.progressBlock}>
                  <div className={styles.progressLabel}>
                    <span className={styles.progressTitle}>
                      {seciliDurak.durum === "completed" ? <><Ikon ad="onay" boyut={16} /> Yolculuk tamamlandı</> : "Bölüm ilerlemesi"}
                    </span>
                    <strong>{tamamlananBolum} / {toplamBolum}</strong>
                  </div>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-label={`${seciliDurak.ad} bölüm ilerlemesi`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={ilerleme}
                    aria-valuetext={`${tamamlananBolum} / ${toplamBolum} bölüm tamamlandı`}
                  >
                    <span style={{ width: `${ilerleme}%` }} />
                  </div>
                </div>
                <dl className={styles.rewardSummary}>
                  <div><dt><Ikon ad="rozet" boyut={19} /> Rozet</dt><dd>{tamamlananBolum} / {toplamBolum} kazanıldı</dd></div>
                  <div><dt><Ikon ad="madalya" boyut={19} /> Madalya</dt><dd>{seciliDurak.madalyaKazanildi ? "Kazanıldı" : seciliDurak.durum === "locked" ? "Kilitli" : "Finalden sonra"}</dd></div>
                </dl>

                <section className={styles.mobileBadgeSection} aria-labelledby={`atlas-badges-title-${seciliDurak.id}`}>
                  <div className={styles.mobileBadgeHeading}>
                    <h3 id={`atlas-badges-title-${seciliDurak.id}`}>Bölüm Rozetleri</h3>
                    <strong>{tamamlananBolum} / {toplamBolum}</strong>
                  </div>
                  <ul
                    className={styles.badgeGrid}
                    style={{ gridTemplateColumns: `repeat(${rozetSutunSayisi}, minmax(0, 1fr))` }}
                  >
                    {bolumRozetleri.map((rozet) => {
                      const durumEtiketi =
                        rozet.durum === "earned"
                          ? "kazanıldı"
                          : rozet.durum === "available"
                            ? "sıradaki rozet"
                            : "kilitli";
                      const durumIkonu =
                        rozet.durum === "earned"
                          ? "onay"
                          : rozet.durum === "available"
                            ? "fener"
                            : "kilit";

                      return (
                        <li
                          key={rozet.iconKey}
                          className={`${styles.badgeCell} ${styles[`badge_${rozet.durum}`]}`}
                          aria-label={`${rozet.bolumNo}. bölüm rozeti, ${durumEtiketi}`}
                        >
                          <span className={styles.badgeIconWrap} aria-hidden="true">
                            <OdulIkonu
                              key={rozet.iconKey}
                              tip="rozet"
                              anahtar={rozet.iconKey}
                              kazanildi={rozet.durum === "earned"}
                              boyut={46}
                              alt=""
                              className={styles.badgeImage}
                            />
                            <span className={styles.badgeState}><Ikon ad={durumIkonu} boyut={11} /></span>
                          </span>
                          <small>{rozet.bolumNo}. bölüm</small>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                {!seciliDurak.madalyaKazanildi ? (
                  <div className={styles.mobileMedalStatus}>
                    <span><Ikon ad="madalya" boyut={17} /> Madalya</span>
                    <strong>{seciliDurak.durum === "locked" ? "Kilitli" : "Finalden sonra"}</strong>
                  </div>
                ) : null}

                {seciliDurak.madalyaKazanildi ? (
                  <div className={styles.medalNote}><span><Ikon ad="madalya" boyut={25} /></span><div><small>Kitap Madalyası</small><strong>{seciliDurak.ad} Yolculuk Madalyası</strong></div></div>
                ) : seciliDurak.durum === "locked" ? (
                  <div className={styles.lockNote}><Ikon ad="kilit" boyut={21} /><div><strong>Açılma koşulu</strong><p>{acilmaKosulu(seciliDurak, duraklar)}</p></div></div>
                ) : (
                  <div className={styles.currentNote}><Ikon ad="fener" boyut={20} /><span>Sıradaki durak: {Math.min(tamamlananBolum + 1, toplamBolum)}. bölüm</span></div>
                )}
              </div>

              {seciliDurak.durum !== "locked" ? (
                <div className={styles.panelFooter}>
                  <button type="button" className={`${styles.primaryAction} ${styles.actionGreen}`} onClick={() => router.push(`/kitap/${seciliDurak.kitapKey}`)}>
                    <Ikon ad={seciliDurak.durum === "completed" ? "kitap" : "ok-sag"} boyut={19} /> {aksiyon}
                  </button>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <nav className={styles.exploreDock} aria-label="Keşif menüsü">
          <span className={styles.dockLabel}>Keşif iskelesi</span>
          <div className={styles.dockActions}>
            <button type="button" onClick={() => router.push("/kazanimlarim")}><Ikon ad="rozet" boyut={20} /> Kazanımlarım</button>
            <button type="button" onClick={() => router.push("/kelime-defterim")}><Ikon ad="kitap" boyut={20} /> Kelime Defterim</button>
            <button type="button" onClick={() => router.push("/gorevlerim")}><Ikon ad="fener" boyut={20} /> Görevlerim</button>
          </div>
        </nav>
        <p className={styles.liveNote} aria-live="polite">{bildirim}</p>
      </div>
    </main>
  );
}
