"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { Ikon, OdulIkonu, YedekliGorsel } from "../ui";
import { books } from "../../data/books";
import { madalyaIconKey, rozetIconKey } from "../../lib/derive";
import styles from "../../../app/tasarim/harita-yeni/harita-yeni.module.css";
import { kitapKapagi, YEDEK } from "../../lib/varlikYollari";

export type AtlasDurakDurumu = "completed" | "active" | "locked" | "preparing";

export type AtlasDurak = {
  id: number;
  kitapKey: string;
  ad: string;
  altBaslik: string;
  /** Keşif açıklaması — yalnız içeriği yayımlanmış kitaplarda dolu olur. */
  aciklama?: string;
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

type Nokta = { x: number; y: number };

/**
 * Durak koordinatları (PROJE-MODELI 3.7 — REVİZE 25 Tem 2026).
 * Her SIRA kendi içinde tam genişliğe yayılır; sırada tek kitap kalsa da denge
 * bozulmaz. Sıralar yılan düzeninde bağlanır. Konumlar hesaplanır — eskiden
 * 24 ayrı CSS kuralında elle yazılıydı ve kitap sayısına göre istisna isterdi.
 */
function durakKonumlari(adet: number, dar: boolean): Nokta[] {
  // Dar ekranda en fazla 2 sütun: 3 sütunda ad etiketleri yan yana sığmıyor.
  const enCokSutun = dar ? 2 : 3;
  const sutun = Math.min(enCokSutun, adet <= 3 ? adet : Math.ceil(adet / 2));
  const sira = Math.ceil(adet / sutun);

  // Duraklar sahne başlığının ALTINDAN başlar. Dar ekranda başlık ve bölge
  // açıklaması daha çok satıra yayıldığı için başlangıç aşağı çekilir; alt
  // sınır da yukarı alınır, çünkü Keşif İskelesi `sticky` olarak altta durur.
  const xBas = dar ? 27 : 16;
  const xSon = dar ? 73 : 84;
  // Dar ekranda sıra aralığı GENİŞ tutulur: işaretçi (60px) + iki satırlık ad
  // etiketi (~38px) bir sonraki işaretçinin üstüne biniyordu (27 Tem 2026).
  const yBas = sira === 1 ? 60 : dar ? 36 : 38;
  const ySon = dar ? 84 : 84;

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
 * türetildiği için son duraktan sonra devam etmez; 4 kitaplık bölgede altta
 * sarkan çizgi kalmaz. Kontrol noktaları parça sınırlarına kelepçelenir; yılan
 * düzeninde yön ters döndüğünde yol kendi üstüne kıvrılmıyor.
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

/** CSS'teki mobil bloğuyla AYNI eşik olmalı (harita-yeni.module.css @620px).
 *  Eskiden 639px'ti; 621–639px bandında JS dar yerleşim uygularken CSS
 *  masaüstü ölçülerini kullanıyor ve duraklar üst üste biniyordu. */
const MOBIL_SORGU = "(max-width: 620px)";

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
  // Dar ekranda durak yerleşimi iki sütuna iner (PROJE-MODELI 3.7).
  const [dar, setDar] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBIL_SORGU);
    const uygula = () => setDar(mq.matches);
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

  function bolgeSec(yeniBolgeId: string) {
    const yeniBolge = bolgeler.find((item) => item.id === yeniBolgeId);
    setBolgeId(yeniBolgeId);
    setDurakId(oncelikliDurakId(yeniBolge));
    setDetayAcik(false);
  }

  const seciliDurak =
    bolge?.duraklar.find((durak) => durak.id === durakId) ?? bolge?.duraklar[0];

  const konumlar = useMemo(
    () => durakKonumlari(bolge?.duraklar.length ?? 0, dar),
    [bolge, dar],
  );
  const yol = useMemo(() => akiciYol(konumlar), [konumlar]);
  // Tamamlanan kısım AYRI bir yol olarak çizilir. `pathLength` + dasharray
  // burada yanıltıcı olurdu: viewBox `preserveAspectRatio="none"` ile yatayda
  // esnediği için yol uzunluğu oranı görsel orana denk gelmiyor.
  const tamamYol = useMemo(() => {
    const tamamlanan = bolge?.duraklar.filter((d) => d.durum === "completed").length ?? 0;
    return tamamlanan > 1 ? akiciYol(konumlar.slice(0, tamamlanan)) : "";
  }, [bolge, konumlar]);

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
            <button className={styles.backLink} type="button" onClick={onProfilSecimineDon}>
              <Ikon ad="geri" boyut={18} /> Profil Seçimine Dön
            </button>
            <span className={styles.previewBadge}><Ikon ad="harita" boyut={17} /> Keşif Dünyası</span>
          </div>
          <div className={styles.profileGroup}>
            <span className={styles.avatar}><OdulIkonu tip="avatar" anahtar={profil.avatarAnahtari} boyut={42} alt="" /></span>
            <span className={styles.profileCopy}><strong>{profil.ad}</strong><small><Ikon ad="yildiz" boyut={12} /> {profil.unvan}</small></span>
          </div>
          <dl className={styles.profileStats} aria-label="Keşif özeti">
            {/* Dar ekranda etiketler kısalır: "Toplam Rozet" → "Rozet". */}
            <div>
              <dt><span className={styles.statUzun}>Toplam </span>Rozet</dt>
              <dd><Ikon ad="rozet" boyut={19} /> {yukleniyor ? "—" : toplamRozet}</dd>
            </div>
            <div>
              <dt>Kitap<span className={styles.statUzun}> Tamamlandı</span></dt>
              <dd><Ikon ad="kitap" boyut={19} /> {yukleniyor ? "—" : tamamlananKitap}</dd>
            </div>
          </dl>
        </header>

        <section className={styles.regionRail} aria-labelledby="regions-title">
          <div className={styles.regionIntro}>
            <span><Ikon ad="harita" boyut={20} /></span>
            <div><p id="regions-title">Keşif Bölgeleri</p><small>Yeni bir dünya seç</small></div>
          </div>
          {/*
            Mobil bölge gezinmesi (27 Tem 2026). Dar ekranda sekmeler bölge
            adlarını kesiyordu ("Bereketli Ai…"), ayrıca sayaç sahnenin altında
            durduğu için kitaplara yer kalmıyordu. Oklar buraya alındı: adlar
            tam görünür, sahnenin altı kitaplara kalır.
          */}
          <div className={styles.regionStepper}>
            <button
              type="button"
              aria-label="Önceki keşif bölgesi"
              disabled={bolgeIndex === 0}
              onClick={() => bolgeSec(bolgeler[bolgeIndex - 1].id)}
            >
              <Ikon ad="ok-sol" boyut={17} />
            </button>
            <span className={styles.regionStepperCopy} aria-live="polite">
              <small>{bolge.sira}. Bölge · {bolge.duraklar.length} Kitap</small>
              <strong>{bolge.ad}</strong>
            </span>
            <button
              type="button"
              aria-label="Sonraki keşif bölgesi"
              disabled={bolgeIndex === bolgeler.length - 1}
              onClick={() => bolgeSec(bolgeler[bolgeIndex + 1].id)}
            >
              <Ikon ad="ok-sag" boyut={17} />
            </button>
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
          <section
            className={styles.mapStage}
            data-region={bolge.sira}
            aria-labelledby="atlas-title"
            /* Bölgenin kendi sahne görseli; dosya yoksa CSS ortak görsele düşer. */
            style={{ "--bolge-arkaplan": `url("/bolgeler/bolge-${bolge.id}.png")` } as CSSProperties}
          >
            <div className={styles.mapShade} aria-hidden="true" />
            <div className={styles.mapHeading}>
              <p>{bolge.sira}. Keşif Bölgesi · {bolge.duraklar.length} kitap</p>
              <h1 id="atlas-title">{bolge.ad}</h1>
              {bolge.altBaslik ? <strong>{bolge.altBaslik}</strong> : null}
              <span>{bolge.aciklama}</span>
            </div>
            <svg className={styles.trail} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.trailShadow} d={yol} />
              <path className={styles.trailBase} d={yol} />
              {tamamYol ? <path className={styles.trailCompleted} d={tamamYol} /> : null}
            </svg>

            <ol className={styles.stops} aria-label={`${bolge.ad} kitapları`}>
              {bolge.duraklar.map((durak, index) => (
                <li
                  className={styles.stopItem}
                  key={durak.kitapKey}
                  style={{ left: `${konumlar[index]?.x ?? 50}%`, top: `${konumlar[index]?.y ?? 50}%` }}
                >
                  <button
                    type="button"
                    className={`${styles.stopButton} ${styles[`stop_${durak.durum}`]} ${durak.id === seciliDurak.id ? styles.stopSelected : ""}`}
                    aria-pressed={durak.id === seciliDurak.id}
                    aria-label={`${index + 1}. durak: ${durak.ad} — ${durumMetni(durak)}`}
                    onClick={() => {
                      setDurakId(durak.id);
                      setDetayAcik(true);
                    }}
                  >
                    <span className={styles.marker}>
                      <YedekliGorsel
                        src={kitapKapagi(durak.kitapKey)}
                        yedekSrc={YEDEK.kitapKapagi}
                        alt=""
                        width={200}
                        height={300}
                        className={styles.markerArt}
                      />
                      <i className={styles.markerStatus} aria-hidden="true">
                        <Ikon ad={durumIkonu[durak.durum]} boyut={13} />
                      </i>
                      <b className={styles.markerNo} aria-hidden="true">{index + 1}</b>
                    </span>
                    <span className={styles.stopLabel}>
                      <strong>{durak.ad}</strong>
                      <em>{durumMetni(durak)}</em>
                    </span>
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
                <YedekliGorsel src={kitapKapagi(seciliDurak.kitapKey)} yedekSrc={YEDEK.kitapKapagi} alt={`${seciliDurak.ad} kitap kapağı`} width={597} height={891} className={styles.cover} />
                {kilitli ? <span className={styles.coverLock}><Ikon ad="kilit" boyut={22} /></span> : null}
              </div>
              <div className={styles.bookIdentity}>
                <span className={`${styles.statusChip} ${styles[`chip_${seciliDurak.durum}`]}`}><Ikon ad={durumIkonu[seciliDurak.durum]} boyut={15} /> {durumMetni(seciliDurak)}</span>
                <h2 id="selected-book-title">{seciliDurak.ad}</h2>
                <p>{seciliDurak.altBaslik}</p>
              </div>
            </div>
            {/* Keşif açıklaması hero'nun ALTINDA, tam genişlikte durur: mobilde
                metin ve görsel yan yana konmaz (PROJE-MODELI.md 3.5). */}
            {seciliDurak.aciklama ? (
              <p className={styles.bookDescription}>{seciliDurak.aciklama}</p>
            ) : null}

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
                  <span><OdulIkonu tip="madalya" anahtar={madalyaIconKey(seciliDurak.kitapKey)} kazanildi={seciliDurak.madalyaKazanildi} boyut={52} alt="" /></span>
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
