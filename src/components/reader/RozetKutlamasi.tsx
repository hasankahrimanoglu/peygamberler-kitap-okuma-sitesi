"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import type { SonrakiBolum } from "../../data/demoChapters";
import { madalyaGorseli, rozetGorseli, YEDEK } from "../../lib/varlikYollari";
import { Isil } from "../cocuk/Isil";
import { Ikon, YedekliGorsel } from "../ui";
import styles from "./okuma-akisi.module.css";

export type RozetDurumu = "bekliyor" | "kaydediliyor" | "alindi" | "hata" | "onceden";

/*
 * Sahnenin hareket katmanları. Konumlar sabit tohumla üretilir: her açılışta
 * aynı yerleşim, sunucu ve tarayıcı çizimi birebir aynı. Yalnız transform ve
 * opacity canlandırılır; "hareketi azalt" tercihinde hepsi durur.
 */
const RENKLER = ["var(--altin)", "var(--murekkep)", "var(--altin-acik)", "var(--eylem)"];

/** Kayıt anında rozetten dışa saçılan ışık kıvılcımları (konfeti yerine). */
const KIVILCIMLAR = Array.from({ length: 30 }, (_, sira) => ({
  "--aci": `${sira * 12 + ((sira * 7) % 9) - 4}deg`,
  "--mesafe": `${120 + ((sira * 37) % 90)}px`,
  "--boy": `${5 + ((sira * 5) % 7)}px`,
  "--gecikme": `${(sira % 5) * 30}ms`,
  "--renk": RENKLER[sira % RENKLER.length],
  yildiz: sira % 3 === 0,
}));

/** Patlamanın ardından sahneye yavaşça dökülen altın ışıltılar. */
const ISIK_YAGMURU = Array.from({ length: 18 }, (_, sira) => ({
  left: `${4 + ((sira * 53) % 92)}%`,
  "--gecikme": `${300 + ((sira * 137) % 1100)}ms`,
  "--sure": `${2200 + ((sira * 211) % 1400)}ms`,
  "--kayma": `${((sira * 29) % 50) - 25}px`,
  "--boy": `${6 + ((sira * 3) % 6)}px`,
}));

/** Sahnenin kenarlarında sürekli yanıp sönen dört köşeli yıldızlar. */
const PARILTILAR = [
  [8, 14], [22, 6], [88, 10], [94, 30], [6, 44], [91, 58],
  [12, 78], [86, 84], [30, 92], [70, 94], [50, 4], [4, 92],
].map(([x, y], sira) => ({
  left: `${x}%`,
  top: `${y}%`,
  "--sure": `${2.4 + ((sira * 7) % 5) * 0.5}s`,
  "--gecikme": `-${(sira * 0.9) % 4}s`,
  "--boy": `${10 + ((sira * 5) % 3) * 4}px`,
}));

/** Alttan süzülüp yükselen ateşböcekleri (Işıl'ın akrabaları). */
const ATESBOCEKLERI = Array.from({ length: 10 }, (_, sira) => ({
  left: `${6 + ((sira * 41) % 88)}%`,
  "--sure": `${6 + ((sira * 13) % 5)}s`,
  "--gecikme": `-${(sira * 1.3) % 7}s`,
  "--kayma": `${((sira * 23) % 40) - 20}px`,
}));

/**
 * Rozet anı (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.3). Okuma ekranında gece
 * mavisinin göründüğü TEK yer.
 *
 * Akış: altın "Rozetimi Al" (kayıt) → "{Rozet} senin!" + yeşil "Sıradaki
 * Bölüme Geç" + "Bölümlere dön". Son bölümde yeşil düğmenin yerini altın
 * "Büyük Final Testine Geç" alır.
 *
 * Sahne okuma sütununun içinde, tek ekrana sığan bir karttır (Hasan, 12 Eki
 * 2026: tablet yatayda sol sütun sabit kalırken rozet de hikâye gibi sağda
 * çıksın, süreç kaydırmadan tek ekranda çözülsün). Önceki tam genişlik kubbe
 * kaldırıldı.
 *
 * Hareket: sahneye gelince ışık huzmeleri açılır ve rozet yükselir; rozetin
 * arkasında huzmeler yavaşça döner. "Rozetimi Al" ile ışık halkası ve
 * kıvılcım patlaması, ardından ışık yağmuru; kazanılan rozet nabız gibi büyüyüp
 * küçülür, üstünden parıltı geçer, Işıl yanında uçar (konuşmaz — 3.10.5).
 * Patlama ve ışık yağmuru yalnız kazanma anındadır; tekrar okumada yoktur.
 */
export function RozetKutlamasi({
  bookKey,
  bolumNo,
  rozetAdi,
  durum,
  hata,
  yaklasti,
  sonraki,
  finalYolu,
  madalyaAdi,
  geriYolu,
  onRozetiAl,
}: {
  bookKey: string;
  bolumNo: number;
  rozetAdi: string;
  durum: RozetDurumu;
  hata: string | null;
  /** Sahne ekrana girdiğinde tek seferlik açılış hareketi. */
  yaklasti: boolean;
  sonraki: SonrakiBolum | null;
  finalYolu: string | null;
  madalyaAdi: string;
  geriYolu: string;
  onRozetiAl: () => void;
}) {
  const sahneRef = useRef<HTMLElement | null>(null);
  const anaEylemRef = useRef<HTMLAnchorElement | null>(null);
  const kazanildi = durum === "alindi" || durum === "onceden";
  const rozetYolu = rozetGorseli(bookKey, bolumNo);

  // Kayıt bitince sahnenin tamamı görünür olsun ve odak sıradaki adıma geçsin.
  useEffect(() => {
    if (durum !== "alindi") return;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sahneRef.current?.scrollIntoView({ block: "nearest", behavior: azHareket ? "auto" : "smooth" });
    anaEylemRef.current?.focus({ preventScroll: true });
  }, [durum]);

  return (
    <section
      ref={sahneRef}
      className={[
        "zemin-yildizli",
        styles.kutlama,
        yaklasti ? styles.kutlamaYaklasti : "",
        kazanildi ? styles.kutlamaKazanildi : "",
        durum === "alindi" ? styles.kutlamaAlindi : "",
      ].join(" ")}
      style={{ "--rozet-maske": `url("${rozetYolu}")` } as CSSProperties}
      aria-labelledby="rozet-basligi"
    >
      <div className={styles.kutlamaKatmani} aria-hidden="true">
        {PARILTILAR.map((stil, sira) => (
          <span key={`p${sira}`} className={styles.parilti} style={stil as CSSProperties} />
        ))}
        {ATESBOCEKLERI.map((stil, sira) => (
          <span key={`a${sira}`} className={styles.kutlamaAtesi} style={stil as CSSProperties} />
        ))}
        {durum === "alindi"
          ? ISIK_YAGMURU.map((stil, sira) => (
              <span key={`y${sira}`} className={styles.isikYagmuru} style={stil as CSSProperties} />
            ))
          : null}
      </div>

      <div className={styles.kutlamaIc}>
        <div className={styles.kutlamaRozeti}>
          <span className={styles.isinKutusu} aria-hidden="true">
            <span className={styles.isinlar} />
          </span>
          <span className={styles.rozetHalesi} aria-hidden="true" />
          {durum === "alindi" ? (
            <span className={styles.patlama} aria-hidden="true">
              <span className={styles.isikHalkasi} />
              <span className={`${styles.isikHalkasi} ${styles.isikHalkasiIki}`} />
              {KIVILCIMLAR.map(({ yildiz, ...stil }, sira) => (
                <span
                  key={sira}
                  className={`${styles.kivilcim} ${yildiz ? styles.kivilcimYildiz : ""}`}
                  style={stil as CSSProperties}
                />
              ))}
            </span>
          ) : null}
          <span className={styles.rozetGovdesi}>
            <YedekliGorsel
              src={rozetYolu}
              yedekSrc={YEDEK.rozet}
              alt={rozetAdi}
              width={168}
              height={168}
              className={styles.kutlamaRozetResmi}
            />
            {kazanildi ? <span className={styles.rozetParlamasi} aria-hidden="true" /> : null}
          </span>
          {durum === "alindi" ? (
            <Isil poz="kutlama" boyut={72} className={styles.kutlamaIsil} />
          ) : null}
        </div>

        {kazanildi ? (
          <>
            <h2 id="rozet-basligi">{rozetAdi} senin!</h2>
            <p className={styles.kutlamaNotu}>
              {durum === "alindi"
                ? "Bu rozet Ödüllerim'e eklendi."
                : "Bu rozeti daha önce kazanmıştın."}
            </p>

            {sonraki ? (
              <div className={styles.siradakiKart}>
                <YedekliGorsel
                  src={sonraki.kapak ?? YEDEK.sahne}
                  yedekSrc={YEDEK.sahne}
                  alt=""
                  width={112}
                  height={63}
                  className={styles.siradakiKapak}
                />
                <span>
                  <small>Sıradaki bölüm</small>
                  <strong>
                    {sonraki.no}. {sonraki.ad}
                  </strong>
                </span>
              </div>
            ) : finalYolu ? (
              <div className={styles.siradakiKart}>
                <YedekliGorsel
                  src={madalyaGorseli(bookKey)}
                  yedekSrc={YEDEK.madalya}
                  alt=""
                  width={60}
                  height={60}
                  className={styles.siradakiMadalya}
                />
                <span>
                  <small>Bütün bölümler bitti. Sırada:</small>
                  <strong>Büyük Final Testi</strong>
                  <em>{madalyaAdi}</em>
                </span>
              </div>
            ) : null}

            <div className={styles.kutlamaEylemleri}>
              {sonraki ? (
                <Link
                  ref={anaEylemRef}
                  href={sonraki.okumaYolu}
                  className={`${styles.buyukDugme} ${styles.yesilDugme}`}
                >
                  Sıradaki Bölüme Geç
                  <Ikon ad="ok-sag" boyut={20} />
                </Link>
              ) : finalYolu ? (
                <Link
                  ref={anaEylemRef}
                  href={finalYolu}
                  className={`${styles.buyukDugme} ${styles.altinDugme}`}
                >
                  <Ikon ad="madalya" boyut={20} />
                  Büyük Final Testine Geç
                </Link>
              ) : null}
              <Link href={geriYolu} className={`${styles.buyukDugme} ${styles.geceHayaletDugme}`}>
                <Ikon ad="geri" boyut={18} />
                Bölümlere dön
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 id="rozet-basligi">Bölümün sonuna geldin!</h2>
            <p className={styles.kutlamaNotu}>{rozetAdi} seni bekliyor.</p>
            {hata ? (
              <p className={styles.kutlamaHata} role="alert">
                {hata}
              </p>
            ) : null}
            <div className={`${styles.kutlamaEylemleri} ${styles.tekEylem}`}>
              <button
                type="button"
                className={`${styles.buyukDugme} ${styles.altinDugme}`}
                disabled={durum === "kaydediliyor"}
                onClick={onRozetiAl}
              >
                <Ikon ad="rozet" boyut={20} />
                {durum === "kaydediliyor"
                  ? "Kaydediliyor..."
                  : durum === "hata"
                    ? "Tekrar Dene"
                    : "Rozetimi Al"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
