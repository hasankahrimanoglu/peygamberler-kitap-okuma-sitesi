"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Ikon, OdulIkonu, YedekliGorsel } from "../ui";
import { books } from "../../data/books";
import { rozetIconKey } from "../../lib/derive";
import styles from "../../../app/tasarim/harita-yeni/harita-yeni.module.css";

export type AtlasDurakDurumu = "completed" | "active" | "locked" | "preparing";

export type AtlasDurak = {
  id: number;
  kitapKey: string;
  ad: string;
  altBaslik: string;
  durum: AtlasDurakDurumu;
  tamamlananBolum: number;
  toplamBolum: number;
  ilerleme: number;
  madalyaKazanildi: boolean;
};

export type AtlasBolge = {
  id: string;
  sira: number;
  ad: string;
  altBaslik?: string;
  aciklama: string;
  duygu: string;
  duraklar: AtlasDurak[];
};

type AtlasHaritaProps = {
  profil: { ad: string; avatarAnahtari: string; unvan: string };
  toplamRozet: number;
  tamamlananKitap: number;
  bolgeler: AtlasBolge[];
  yukleniyor?: boolean;
  bildirim?: string | null;
  onProfilSecimineDon: () => void;
};

const durumIkonu = {
  completed: "onay",
  active: "fener",
  locked: "kilit",
  preparing: "saat",
} as const;

const atlasRotaYolu =
  "M24 34 C40 34 60 34 76 34 C82 34 82 46 76 57 C60 57 40 57 24 57 C18 57 18 69 24 80 C40 80 60 80 76 80";

function oncelikliDurakId(bolge?: AtlasBolge) {
  return (
    bolge?.duraklar.find((durak) => durak.durum === "active") ??
    bolge?.duraklar.find((durak) => durak.durum === "completed") ??
    bolge?.duraklar[0]
  )?.id ?? 1;
}

function durumMetni(durak: AtlasDurak) {
  if (durak.durum === "completed") return "Tamamlandı";
  if (durak.durum === "preparing") return "Hazırlanıyor";
  if (durak.durum === "locked") return "Kilitli";
  return durak.tamamlananBolum > 0 ? "Devam Ediyor" : "Yeni Açıldı";
}

export function AtlasHarita({
  profil,
  toplamRozet,
  tamamlananKitap,
  bolgeler,
  yukleniyor = false,
  bildirim,
  onProfilSecimineDon,
}: AtlasHaritaProps) {
  const router = useRouter();
  const [bolgeId, setBolgeId] = useState(bolgeler[0]?.id ?? "");
  const bolge = bolgeler.find((item) => item.id === bolgeId) ?? bolgeler[0];
  const [durakId, setDurakId] = useState(oncelikliDurakId(bolge));
  const [detayAcik, setDetayAcik] = useState(false);

  function bolgeSec(yeniBolgeId: string) {
    const yeniBolge = bolgeler.find((item) => item.id === yeniBolgeId);
    setBolgeId(yeniBolgeId);
    setDurakId(oncelikliDurakId(yeniBolge));
    setDetayAcik(false);
  }

  const seciliDurak =
    bolge?.duraklar.find((durak) => durak.id === durakId) ?? bolge?.duraklar[0];

  const rotaYuzdesi = useMemo(() => {
    if (!bolge || bolge.duraklar.length < 2) return 0;
    const tamamlanan = bolge.duraklar.filter((durak) => durak.durum === "completed").length;
    const aktifPayi = bolge.duraklar.some((durak) => durak.durum === "active") ? 0.45 : 0;
    return Math.min(100, ((tamamlanan + aktifPayi) / (bolge.duraklar.length - 1)) * 100);
  }, [bolge]);

  if (!bolge || !seciliDurak) return null;

  const bolgeIndex = bolgeler.findIndex((item) => item.id === bolge.id);
  const hazirDegil = seciliDurak.durum === "preparing";
  const kilitli = seciliDurak.durum === "locked";
  const aksiyon = seciliDurak.durum === "completed"
    ? "Tekrar Oku"
    : seciliDurak.tamamlananBolum > 0
      ? "Okumaya Devam Et"
      : "Yolculuğa Başla";
  const kitapIcerigi = books.find((kitap) => kitap.routePrefix === seciliDurak.kitapKey);
  const bolumRozetleri = Array.from({ length: seciliDurak.toplamBolum }, (_, index) => ({
    sira: index + 1,
    ad: kitapIcerigi?.chapters[index]?.badgeName ?? `${index + 1}. Bölüm Rozeti`,
    iconKey: rozetIconKey(seciliDurak.kitapKey, index + 1),
    kazanildi: index < seciliDurak.tamamlananBolum,
  }));

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <div className={styles.atlasShell}>
        <header className={styles.explorerBar}>
          <div className={styles.previewGroup}>
            <span className={styles.previewBadge}><Ikon ad="harita" boyut={17} /> Keşif Dünyası</span>
            <button className={styles.backLink} type="button" onClick={onProfilSecimineDon}>
              <Ikon ad="geri" boyut={18} /> Profil Seçimine Dön
            </button>
          </div>
          <div className={styles.profileGroup}>
            <span className={styles.avatar}><OdulIkonu tip="avatar" anahtar={profil.avatarAnahtari} boyut={42} alt="" /></span>
            <span className={styles.profileCopy}><strong>{profil.ad}</strong><small><Ikon ad="yildiz" boyut={12} /> {profil.unvan}</small></span>
          </div>
          <dl className={styles.profileStats} aria-label="Keşif özeti">
            <div><dt>Toplam Rozet</dt><dd><Ikon ad="rozet" boyut={19} /> {yukleniyor ? "—" : toplamRozet}</dd></div>
            <div><dt>Kitap Tamamlandı</dt><dd><Ikon ad="kitap" boyut={19} /> {yukleniyor ? "—" : tamamlananKitap}</dd></div>
          </dl>
        </header>

        <section className={styles.regionRail} aria-labelledby="regions-title">
          <div className={styles.regionIntro}>
            <span><Ikon ad="harita" boyut={20} /></span>
            <div><p id="regions-title">Keşif Bölgeleri</p><small>Yeni bir dünya seç</small></div>
          </div>
          <div className={styles.regionTabs} role="tablist" aria-label="Keşif bölgeleri">
            {bolgeler.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={item.id === bolge.id}
                className={item.id === bolge.id ? styles.regionTabActive : ""}
                key={item.id}
                onClick={() => bolgeSec(item.id)}
              >
                <span>{item.sira}</span><strong>{item.ad}</strong><small>{item.duraklar.length} kitap</small>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.workspace}>
          <section className={styles.mapStage} data-region={bolge.sira} aria-labelledby="atlas-title">
            <div className={styles.mapShade} aria-hidden="true" />
            <div className={styles.mapHeading}>
              <p>{bolge.sira}. Keşif Bölgesi · {bolge.duraklar.length} kitap</p>
              <h1 id="atlas-title">{bolge.ad}</h1>
              {bolge.altBaslik ? <strong>{bolge.altBaslik}</strong> : null}
              <span>{bolge.aciklama}</span>
            </div>
            <div className={styles.mapMeta}><Ikon ad="yildiz" boyut={14} /> {bolge.duygu}</div>

            <svg className={styles.trail} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.trailShadow} d={atlasRotaYolu} />
              <path className={styles.trailBase} pathLength="100" d={atlasRotaYolu} />
              <path className={styles.trailCompleted} pathLength="100" style={{ strokeDasharray: `${rotaYuzdesi} ${100 - rotaYuzdesi}` }} d={atlasRotaYolu} />
            </svg>

            <ol className={styles.stops} aria-label={`${bolge.ad} kitapları`}>
              {bolge.duraklar.map((durak, index) => (
                <li className={styles.stopItem} data-stop={index + 1} key={durak.kitapKey}>
                  <button
                    type="button"
                    className={`${styles.stopButton} ${styles[`stop_${durak.durum}`]} ${durak.id === seciliDurak.id ? styles.stopSelected : ""}`}
                    aria-pressed={durak.id === seciliDurak.id}
                    onClick={() => {
                      setDurakId(durak.id);
                      setDetayAcik(true);
                    }}
                  >
                    <span className={styles.marker}><span className={styles.markerRing} /><Ikon ad={durumIkonu[durak.durum]} boyut={22} /></span>
                    <span className={styles.stopLabel}><small>{index + 1}. durak</small><strong>{durak.ad}</strong><em>{durumMetni(durak)}</em></span>
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.regionPager}>
              <button type="button" disabled={bolgeIndex === 0} aria-label="Önceki keşif bölgesi" onClick={() => bolgeSec(bolgeler[bolgeIndex - 1].id)}><Ikon ad="ok-sol" boyut={17} /></button>
              <span>{bolge.sira} / {bolgeler.length}</span>
              <button type="button" disabled={bolgeIndex === bolgeler.length - 1} aria-label="Sonraki keşif bölgesi" onClick={() => bolgeSec(bolgeler[bolgeIndex + 1].id)}><Ikon ad="ok-sag" boyut={17} /></button>
            </div>
          </section>

          <button
            type="button"
            className={`${styles.drawerBackdrop} ${detayAcik ? styles.drawerBackdropOpen : ""}`}
            aria-label="Kitap detayını kapat"
            onClick={() => setDetayAcik(false)}
          />

          <aside className={`${styles.bookPanel} ${detayAcik ? styles.bookPanelOpen : ""}`} aria-labelledby="selected-book-title">
            <div className={styles.drawerHeader}>
              <button type="button" onClick={() => setDetayAcik(false)}>
                <Ikon ad="geri" boyut={22} /> Haritaya Dön
              </button>
              <strong>{seciliDurak.id} / 35</strong>
            </div>
            <div className={styles.panelTopline}><span>Seçili keşif durağı</span><strong>{seciliDurak.id} / 35</strong></div>
            <div className={styles.bookHero}>
              <div className={styles.coverFrame}>
                <YedekliGorsel src={`/kapaklar/kapak-${seciliDurak.kitapKey}.png`} yedekSrc="/kapaklar/placeholder.svg" alt={`${seciliDurak.ad} kitap kapağı`} width={597} height={891} className={styles.cover} />
                {kilitli ? <span className={styles.coverLock}><Ikon ad="kilit" boyut={22} /></span> : null}
              </div>
              <div className={styles.bookIdentity}>
                <span className={`${styles.statusChip} ${styles[`chip_${seciliDurak.durum}`]}`}><Ikon ad={durumIkonu[seciliDurak.durum]} boyut={15} /> {durumMetni(seciliDurak)}</span>
                <h2 id="selected-book-title">{seciliDurak.ad}</h2>
                <p>{seciliDurak.altBaslik}</p>
              </div>
            </div>

            {hazirDegil ? (
              <div className={styles.preparingCard}>
                <span><Ikon ad="saat" boyut={24} /></span>
                <div><strong>Bu yolculuk hazırlanıyor</strong><p>{seciliDurak.toplamBolum} bölümlük içerik tamamlandığında bu durak açılacak. Şimdilik atlas üzerinde yerini görebilirsin.</p></div>
              </div>
            ) : (
              <>
                <div className={styles.progressBlock}>
                  <div><span>Bölüm ilerlemesi</span><strong>{seciliDurak.tamamlananBolum} / {seciliDurak.toplamBolum}</strong></div>
                  <div className={styles.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={seciliDurak.ilerleme}><span style={{ width: `${seciliDurak.ilerleme}%` }} /></div>
                </div>
                <section className={styles.chapterRewards} aria-labelledby="chapter-rewards-title">
                  <div className={styles.rewardHeading}>
                    <h3 id="chapter-rewards-title">Bölüm Rozetleri</h3>
                    <strong>{seciliDurak.tamamlananBolum} / {seciliDurak.toplamBolum}</strong>
                  </div>
                  <ol>
                    {bolumRozetleri.map((rozet) => (
                      <li key={rozet.iconKey} title={rozet.ad}>
                        <span>
                          <OdulIkonu tip="rozet" anahtar={rozet.iconKey} kazanildi={rozet.kazanildi} boyut={48} alt="" />
                          {rozet.kazanildi ? <i><Ikon ad="onay" boyut={13} /></i> : null}
                        </span>
                        <small>{rozet.sira}. bölüm</small>
                      </li>
                    ))}
                  </ol>
                </section>
                <section className={styles.medalCard} aria-label="Kitap madalyası">
                  <span><OdulIkonu tip="madalya" anahtar={seciliDurak.kitapKey} kazanildi={seciliDurak.madalyaKazanildi} boyut={52} alt="" /></span>
                  <div>
                    <small>{seciliDurak.madalyaKazanildi ? "Kazanılan Madalya" : "Kazanılacak Madalya"}</small>
                    <strong>{seciliDurak.ad} Yolculuk Madalyası</strong>
                  </div>
                </section>
                {kilitli ? <div className={styles.lockNote}><Ikon ad="kilit" boyut={20} /><p>Hz. Şît yolculuğu, Hz. Âdem kitabının finalini tamamladığında açılacak.</p></div> : null}
              </>
            )}

            <div className={styles.panelSpacer} />
            {!hazirDegil && !kilitli ? (
              <button type="button" className={styles.primaryAction} onClick={() => router.push(`/kitap/${seciliDurak.kitapKey}`)}>
                <Ikon ad={seciliDurak.durum === "completed" ? "kitap" : "ok-sag"} boyut={19} /> {aksiyon}
              </button>
            ) : null}
          </aside>
        </div>

        <nav className={styles.exploreDock} aria-label="Keşif menüsü">
          <span>Keşif İskelesi</span>
          <button type="button" onClick={() => router.push("/kazanimlarim")}><Ikon ad="rozet" boyut={21} /> Kazanımlarım</button>
          <button type="button" onClick={() => router.push("/kelime-defterim")}><Ikon ad="kitap" boyut={21} /> Kelime Defterim</button>
          <button type="button" onClick={() => router.push("/gorevlerim")}><Ikon ad="fener" boyut={21} /> Görevlerim</button>
        </nav>
        {bildirim ? <p className={styles.notice} role="status">{bildirim}</p> : null}
      </div>
    </main>
  );
}
