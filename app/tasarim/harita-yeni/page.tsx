"use client";

import Link from "next/link";
import { useState } from "react";
import { Ikon, YedekliGorsel } from "../../../src/components/ui";
import styles from "./harita-yeni.module.css";

type KitapDurumu = "tamamlandi" | "aktif" | "kilitli";

type AtlasKitabi = {
  id: "adem" | "nuh" | "ebubekir" | "omer";
  sira: number;
  ad: string;
  altBaslik: string;
  aciklama: string;
  kapak: string;
  durum: KitapDurumu;
  durumMetni: string;
  tamamlananBolum: number;
  toplamBolum: number;
  rozetOzeti: string;
  madalyaOzeti: string;
  madalyaAdi?: string;
  aksiyon?: "Tekrar Oku" | "Okumaya Devam Et";
  acilmaKosulu?: string;
};

const ATLAS_KITAPLARI: AtlasKitabi[] = [
  {
    id: "adem",
    sira: 1,
    ad: "Hz. Âdem",
    altBaslik: "İlk İnsan, İlk Yolculuk",
    aciklama:
      "Öğrenme, sorumluluk, tövbe ve umutla başlayan ilk yolculuğun izini sür.",
    kapak: "/kapaklar/kapak-adem.png",
    durum: "tamamlandi",
    durumMetni: "Tamamlandı",
    tamamlananBolum: 8,
    toplamBolum: 8,
    rozetOzeti: "8 rozet kazanıldı",
    madalyaOzeti: "Kazanıldı",
    madalyaAdi: "Hz. Âdem Yolculuk Madalyası",
    aksiyon: "Tekrar Oku",
  },
  {
    id: "nuh",
    sira: 2,
    ad: "Hz. Nuh",
    altBaslik: "Sabır ve Güven Gemisi",
    aciklama:
      "Sabırla sürdürülen bir yolculukta güvenin ve emeğin bıraktığı izleri keşfet.",
    kapak: "/kapaklar/kapak-nuh.png",
    durum: "aktif",
    durumMetni: "Devam Ediyor",
    tamamlananBolum: 2,
    toplamBolum: 5,
    rozetOzeti: "2 / 5 rozet kazanıldı",
    madalyaOzeti: "Finalden sonra",
    aksiyon: "Okumaya Devam Et",
  },
  {
    id: "ebubekir",
    sira: 3,
    ad: "Hz. Ebû Bekir",
    altBaslik: "Sadakat ve Cömertlik Durağı",
    aciklama:
      "Bu keşif durağının ayrıntıları, önceki yolculuk tamamlandığında görünür olacak.",
    kapak: "/kapaklar/placeholder.svg",
    durum: "kilitli",
    durumMetni: "Kilitli",
    tamamlananBolum: 0,
    toplamBolum: 8,
    rozetOzeti: "Henüz kazanılmadı",
    madalyaOzeti: "Kilitli",
    acilmaKosulu:
      "Hz. Ebû Bekir yolculuğu, Hz. Nuh kitabının finalini tamamladığında açılacak.",
  },
  {
    id: "omer",
    sira: 4,
    ad: "Hz. Ömer",
    altBaslik: "Adalet Kapısı",
    aciklama:
      "Bu keşif durağının ayrıntıları, önceki yolculuk tamamlandığında görünür olacak.",
    kapak: "/kapaklar/placeholder.svg",
    durum: "kilitli",
    durumMetni: "Kilitli",
    tamamlananBolum: 0,
    toplamBolum: 8,
    rozetOzeti: "Henüz kazanılmadı",
    madalyaOzeti: "Kilitli",
    acilmaKosulu:
      "Hz. Ömer yolculuğu, Hz. Ebû Bekir kitabının finalini tamamladığında açılacak.",
  },
];

const DURUM_IKONLARI = {
  tamamlandi: "onay",
  aktif: "fener",
  kilitli: "kilit",
} as const;

export default function HaritaYeniOnizleme() {
  const [seciliKitapId, setSeciliKitapId] =
    useState<AtlasKitabi["id"]>("adem");
  const [onizlemeNotu, setOnizlemeNotu] = useState("");

  const seciliKitap =
    ATLAS_KITAPLARI.find((kitap) => kitap.id === seciliKitapId) ??
    ATLAS_KITAPLARI[0];
  const ilerleme = Math.round(
    (seciliKitap.tamamlananBolum / seciliKitap.toplamBolum) * 100,
  );
  const durakKonumlari = [
    styles.stopOne,
    styles.stopTwo,
    styles.stopThree,
    styles.stopFour,
  ];

  function kitapSec(kitap: AtlasKitabi) {
    setSeciliKitapId(kitap.id);
    setOnizlemeNotu(`${kitap.ad} bilgi panelinde açıldı.`);
  }

  function yerelAksiyon(etiket: string) {
    setOnizlemeNotu(
      `“${etiket}” bu tasarım önizlemesinde yalnızca yerel olarak gösterildi; hiçbir ilerleme kaydedilmedi.`,
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
            <Link className={styles.backLink} href="/map">
              <Ikon ad="geri" boyut={18} />
              Mevcut Harita
            </Link>
          </div>

          <div className={styles.profileGroup}>
            <div
              className={styles.avatar}
              role="img"
              aria-label="Deneme 1 için fener avatarı"
            >
              <Ikon ad="fener" boyut={25} />
            </div>
            <div className={styles.profileCopy}>
              <strong>Deneme 1</strong>
              <span>
                <Ikon ad="yildiz" boyut={13} /> Meraklı Kâşif
              </span>
            </div>
          </div>

          <dl className={styles.profileStats} aria-label="Örnek keşif özeti">
            <div>
              <dt>Toplam Rozet</dt>
              <dd>
                <Ikon ad="rozet" boyut={20} /> 10
              </dd>
            </div>
            <div>
              <dt>Kitap Tamamlandı</dt>
              <dd>
                <Ikon ad="kitap" boyut={20} /> 1
              </dd>
            </div>
          </dl>
        </header>

        <div className={styles.workspace}>
          <section
            className={styles.mapStage}
            aria-labelledby="atlas-title"
            data-qa="atlas-map"
          >
            <div className={styles.mapHeading}>
              <p>İlk yol · 4 keşif durağı</p>
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
              <i className={styles.starOne} />
              <i className={styles.starTwo} />
              <i className={styles.starThree} />
              <i className={styles.starFour} />
              <i className={styles.starFive} />
              <i className={styles.starSix} />
              <i className={styles.starSeven} />
            </div>

            <div className={styles.mountainBack} aria-hidden="true" />
            <div className={styles.mountainFront} aria-hidden="true" />
            <div className={styles.meadowMist} aria-hidden="true" />

            <svg
              className={styles.river}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 6 C24 18 6 31 20 44 S18 72 3 96" />
            </svg>

            <svg
              className={styles.trail}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className={styles.trailShadow}
                d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82"
              />
              <path
                className={styles.trailBase}
                pathLength="100"
                d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82"
              />
              <path
                className={styles.trailCompleted}
                pathLength="100"
                d="M24 28 C20 36 68 36 72 46 S31 55 28 64 S72 73 68 82"
              />
            </svg>

            <div className={styles.routeLight} aria-hidden="true" />

            <ol className={styles.stops} aria-label="Kitap keşif rotası">
              {ATLAS_KITAPLARI.map((kitap, index) => {
                const secili = kitap.id === seciliKitap.id;

                return (
                  <li
                    className={`${styles.stopItem} ${durakKonumlari[index]}`}
                    key={kitap.id}
                  >
                    <button
                      type="button"
                      className={`${styles.stopButton} ${
                        styles[`stop_${kitap.durum}`]
                      } ${secili ? styles.stopSelected : ""}`}
                      aria-pressed={secili}
                      aria-label={`${kitap.sira}. durak, ${kitap.ad}, ${kitap.durumMetni}`}
                      onClick={() => kitapSec(kitap)}
                      data-qa="route-stop"
                      data-status={kitap.durum}
                    >
                      <span className={styles.marker}>
                        <span className={styles.markerRing} />
                        <Ikon
                          ad={DURUM_IKONLARI[kitap.durum]}
                          boyut={kitap.durum === "aktif" ? 25 : 23}
                        />
                      </span>
                      <span className={styles.stopLabel}>
                        <small>{kitap.sira}. durak</small>
                        <strong>{kitap.ad}</strong>
                        <em>{kitap.durumMetni}</em>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className={styles.botanicalMark} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </section>

          <aside
            className={`${styles.bookPanel} ${
              styles[`panel_${seciliKitap.durum}`]
            }`}
            aria-label="Seçili kitap bilgisi"
            data-qa="book-panel"
            data-selected-book={seciliKitap.id}
          >
            <div className={styles.panelContent} key={seciliKitap.id}>
              <div className={styles.panelTopline}>
                <span>Seçili keşif durağı</span>
                <span className={styles.panelOrder}>{seciliKitap.sira} / 4</span>
              </div>

              <div className={styles.bookHero}>
                <div className={styles.coverFrame}>
                  <YedekliGorsel
                    src={seciliKitap.kapak}
                    yedekSrc="/kapaklar/placeholder.svg"
                    alt={`${seciliKitap.ad} kitap kapağı`}
                    width={597}
                    height={891}
                    className={styles.cover}
                  />
                  {seciliKitap.durum === "kilitli" ? (
                    <span className={styles.coverLock} aria-hidden="true">
                      <Ikon ad="kilit" boyut={24} />
                    </span>
                  ) : null}
                </div>

                <div className={styles.bookIdentity}>
                  <span className={styles.statusChip}>
                    <Ikon
                      ad={DURUM_IKONLARI[seciliKitap.durum]}
                      boyut={15}
                    />
                    {seciliKitap.durumMetni}
                  </span>
                  <h2>{seciliKitap.ad}</h2>
                  <p>{seciliKitap.altBaslik}</p>
                </div>
              </div>

              <p className={styles.description}>{seciliKitap.aciklama}</p>

              <div className={styles.progressBlock}>
                <div className={styles.progressLabel}>
                  <span>Bölüm ilerlemesi</span>
                  <strong>
                    {seciliKitap.tamamlananBolum} / {seciliKitap.toplamBolum}
                  </strong>
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-label={`${seciliKitap.ad} bölüm ilerlemesi`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ilerleme}
                >
                  <span style={{ width: `${ilerleme}%` }} />
                </div>
              </div>

              <dl className={styles.rewardSummary}>
                <div>
                  <dt>
                    <Ikon ad="rozet" boyut={19} /> Rozet
                  </dt>
                  <dd>{seciliKitap.rozetOzeti}</dd>
                </div>
                <div>
                  <dt>
                    <Ikon ad="madalya" boyut={19} /> Madalya
                  </dt>
                  <dd>{seciliKitap.madalyaOzeti}</dd>
                </div>
              </dl>

              {seciliKitap.durum === "tamamlandi" ? (
                <div className={styles.medalNote}>
                  <span>
                    <Ikon ad="madalya" boyut={25} />
                  </span>
                  <div>
                    <small>Kazanılan madalya</small>
                    <strong>{seciliKitap.madalyaAdi}</strong>
                  </div>
                </div>
              ) : null}

              {seciliKitap.durum === "aktif" ? (
                <div className={styles.currentNote}>
                  <Ikon ad="fener" boyut={20} />
                  <span>Sıradaki durak: 3. bölüm</span>
                </div>
              ) : null}

              {seciliKitap.durum === "kilitli" ? (
                <div className={styles.lockNote}>
                  <Ikon ad="kilit" boyut={21} />
                  <div>
                    <strong>Açılma koşulu</strong>
                    <p>{seciliKitap.acilmaKosulu}</p>
                  </div>
                </div>
              ) : null}

              {seciliKitap.aksiyon ? (
                <button
                  type="button"
                  className={`${styles.primaryAction} ${styles.actionGreen}`}
                  onClick={() => yerelAksiyon(seciliKitap.aksiyon!)}
                  data-qa="primary-action"
                >
                  <Ikon
                    ad={seciliKitap.durum === "tamamlandi" ? "kitap" : "ok-sag"}
                    boyut={19}
                  />
                  {seciliKitap.aksiyon}
                </button>
              ) : null}
            </div>
          </aside>
        </div>

        <nav
          className={styles.exploreDock}
          aria-label="Keşif menüsü önizlemesi"
          data-qa="explore-dock"
        >
          <span className={styles.dockLabel}>Keşif iskelesi</span>
          <div className={styles.dockActions}>
            <button type="button" onClick={() => yerelAksiyon("Kazanımlarım")}>
              <Ikon ad="rozet" boyut={20} />
              Kazanımlarım
            </button>
            <button
              type="button"
              onClick={() => yerelAksiyon("Kelime Defterim")}
            >
              <Ikon ad="kitap" boyut={20} />
              Kelime Defterim
            </button>
            <button type="button" onClick={() => yerelAksiyon("Görevlerim")}>
              <Ikon ad="fener" boyut={20} />
              Görevlerim
            </button>
          </div>
        </nav>

        <p className={styles.liveNote} aria-live="polite">
          {onizlemeNotu}
        </p>
      </div>
    </main>
  );
}
