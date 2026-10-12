"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { Isil } from "../cocuk/Isil";
import { YedekliGorsel } from "../ui";
import styles from "./okuma-akisi.module.css";

/*
 * Sahnenin hareket katmanları. Konumlar sabit tohumla üretilir: her açılışta
 * aynı yerleşim, sunucu ve tarayıcı çizimi birebir aynı. Yalnız transform ve
 * opacity canlandırılır; "hareketi azalt" tercihinde hepsi durur.
 */
const RENKLER = ["var(--altin)", "var(--murekkep)", "var(--altin-acik)", "var(--eylem)"];

/** Kazanma anında ödülden dışa saçılan ışık kıvılcımları (konfeti yerine). */
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
 * Ödül sahnesi: rozet anı (okuma ekranı) ve madalya anı (Büyük Final Testi)
 * aynı gece mavisi kartı kullanır (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.3).
 * Okuma sütununun içinde, tek ekrana sığan bir karttır.
 *
 * Hareket: sahneye gelince ışık huzmeleri açılır ve ödül yükselir; arkada
 * huzmeler yavaşça döner, kenarlarda yıldızlar yanıp söner, alttan ateşböcekleri
 * yükselir. `patlama` (ödülün İLK kazanıldığı an): ışık halkaları, kıvılcım
 * patlaması, ışık yağmuru ve yanında uçan Işıl. Kazanılmış ödül nabız gibi
 * büyüyüp küçülür, üstünden parıltı geçer. Tekrarda patlama yoktur.
 *
 * Metinler ve düğmeler `children` olarak gelir; sahne yalnız görseli taşır.
 */
export function KutlamaSahnesi({
  ref,
  gorsel,
  yedekGorsel,
  gorselAdi,
  yaklasti,
  kazanildi,
  patlama,
  baslikId,
  children,
}: {
  ref?: Ref<HTMLElement>;
  gorsel: string;
  yedekGorsel: string;
  gorselAdi: string;
  /** Sahne ekrana girdiğinde tek seferlik açılış hareketi. */
  yaklasti: boolean;
  /** Ödül çocuğun: tam renk, nabız ve parıltı. */
  kazanildi: boolean;
  /** Ödül tam şu an kazanıldı: patlama, ışık yağmuru, Işıl. */
  patlama: boolean;
  baslikId: string;
  children: ReactNode;
}) {
  return (
    <section
      ref={ref}
      className={[
        "zemin-yildizli",
        styles.kutlama,
        yaklasti ? styles.kutlamaYaklasti : "",
        kazanildi ? styles.kutlamaKazanildi : "",
        patlama ? styles.kutlamaAlindi : "",
      ].join(" ")}
      style={{ "--rozet-maske": `url("${gorsel}")` } as CSSProperties}
      aria-labelledby={baslikId}
    >
      <div className={styles.kutlamaKatmani} aria-hidden="true">
        {PARILTILAR.map((stil, sira) => (
          <span key={`p${sira}`} className={styles.parilti} style={stil as CSSProperties} />
        ))}
        {ATESBOCEKLERI.map((stil, sira) => (
          <span key={`a${sira}`} className={styles.kutlamaAtesi} style={stil as CSSProperties} />
        ))}
        {patlama
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
          {patlama ? (
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
              src={gorsel}
              yedekSrc={yedekGorsel}
              alt={gorselAdi}
              width={168}
              height={168}
              className={styles.kutlamaRozetResmi}
            />
            {kazanildi ? <span className={styles.rozetParlamasi} aria-hidden="true" /> : null}
          </span>
          {/* Işıl ödülün yanında uçar; konuşmaz (3.10.5). */}
          {patlama ? <Isil poz="kutlama" boyut={72} className={styles.kutlamaIsil} /> : null}
        </div>

        {children}
      </div>
    </section>
  );
}
