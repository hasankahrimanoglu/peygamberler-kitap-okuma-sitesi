"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { YolculukKitabi } from "../../lib/child/yolculuk";
import { iyelikEki } from "../../lib/child/sayiEki";
import {
  haritaDuragiGorseli,
  madalyaGorseli,
  ROTA_ARKAPLANI,
  YEDEK,
} from "../../lib/varlikYollari";
import { YedekliGorsel } from "../ui";
import { Isil } from "./Isil";
import { RotaCanliligi } from "./RotaCanliligi";
import styles from "./yolculuk.module.css";

type YolculukRotasiProps = {
  kitaplar: YolculukKitabi[];
  /** "Sıradaki bölümün" kartının kitabı — Işıl burada "Buradasın" der. */
  siradakiKey: string | null;
  /** Geniş ekranda sağ panelde açık olan kitap. */
  seciliKey: string | null;
  /** "Göster" ile bulunan yeni kitap kısa süre parlar. */
  vurguluKey: string | null;
  onSec: (key: string) => void;
  /** Duraklar ölçülen genişliğe göre her yerleştiğinde çağrılır (ana ekran ortalaması). */
  onYerlesti?: () => void;
  /**
   * Son duraktan rotanın sonuna en az bu kadar yol kalır. Geniş ekranda ana
   * ekran görünür yüksekliğin yarısını verir ki son kitap da ortalanabilsin.
   */
  enAzKuyruk?: number;
  /** Rotanın altında, aynı çayırın üstünde duran içerik ("Yolun devamı"). */
  children?: ReactNode;
};

/** Rota ölçüleri. Geniş rota tablet yatay ve masaüstündeki sol sütundur. */
function olculer(genislik: number) {
  return genislik >= 640
    ? {
        jeton: 86,
        simdi: 112,
        adim: 152,
        ust: 150,
        alt: 120,
        sol: 0.29,
        sag: 0.71,
        bulanik: 8,
      }
    : {
        jeton: 72,
        simdi: 96,
        adim: 134,
        ust: 96,
        alt: 104,
        sol: 0.3,
        sag: 0.7,
        bulanik: 6,
      };
}

export function durakDurumMetni(kitap: YolculukKitabi) {
  const toplam = kitap.bolumler.length;
  if (kitap.bitti) return "Tamamlandı";
  if (kitap.tamamlanan >= toplam) return "Final testi kaldı";
  if (kitap.tamamlanan > 0) {
    return `${toplam} bölümün ${kitap.tamamlanan}'${iyelikEki(kitap.tamamlanan)}`;
  }
  return `${toplam} bölüm`;
}

/**
 * Tek dikey rota (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.1).
 *
 * - Durağın halkası kitabın ilerleme çubuğudur; okudukça altınla dolar.
 * - Okunan yol altın ışıkla parlar: biten kitaptan bir sonrakine giden parça
 *   aydınlanır. Kitaplar arasında kilit olmadığı için ışık "sıra"yı değil
 *   gerçekten bitirilen kitapları izler.
 * - Koordinatlar ölçülen genişlikten piksel olarak hesaplanır. SVG'yi yüzde
 *   ile esnetmek (`preserveAspectRatio="none"`) çizgi kalınlığını ve ışık
 *   bulanıklığını yöne göre bozuyordu.
 */
export function YolculukRotasi({
  kitaplar,
  siradakiKey,
  seciliKey,
  vurguluKey,
  onSec,
  onYerlesti,
  enAzKuyruk = 0,
  children,
}: YolculukRotasiProps) {
  const kokRef = useRef<HTMLDivElement>(null);
  const [genislik, setGenislik] = useState(0);
  // useId çıktısı ":" ya da "«»" içerebilir; SVG url(#…) başvurusu için sadeleştirilir.
  const filtreId = `isik-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useLayoutEffect(() => {
    const kok = kokRef.current;
    if (!kok) return;
    const olc = () => setGenislik(kok.clientWidth);
    olc();
    const gozlemci = new ResizeObserver(olc);
    gozlemci.observe(kok);
    return () => gozlemci.disconnect();
  }, []);

  const o = olculer(genislik || 360);
  const noktalar = kitaplar.map((_, sira) => ({
    x: Math.round((sira % 2 === 0 ? o.sol : o.sag) * (genislik || 360)),
    y: o.ust + sira * o.adim,
  }));
  const yukseklik =
    o.ust +
    Math.max(0, kitaplar.length - 1) * o.adim +
    Math.max(o.alt, enAzKuyruk);

  // Duraklar ancak genişlik ölçüldükten sonra çizilir; haber bu commit'ten sonra gider.
  useEffect(() => {
    if (genislik > 0) onYerlesti?.();
  }, [genislik, yukseklik, onYerlesti]);

  const egri = (
    bas: { x: number; y: number },
    son: { x: number; y: number },
  ) => {
    const kol = o.adim * 0.5;
    return `C ${bas.x} ${bas.y + kol} ${son.x} ${son.y - kol} ${son.x} ${son.y}`;
  };

  let tumYol = "";
  let isikYolu = "";
  if (noktalar.length > 0) {
    tumYol = `M ${noktalar[0].x} ${noktalar[0].y}`;
    noktalar.forEach((nokta, sira) => {
      const sonraki = noktalar[sira + 1];
      if (sonraki) {
        tumYol += ` ${egri(nokta, sonraki)}`;
        if (kitaplar[sira].bitti)
          isikYolu += ` M ${nokta.x} ${nokta.y} ${egri(nokta, sonraki)}`;
      }
    });
    const son = noktalar[noktalar.length - 1];
    tumYol += ` ${egri(son, { x: Math.round((genislik || 360) / 2), y: yukseklik })}`;
  }

  const siradakiSira = kitaplar.findIndex((kitap) => kitap.key === siradakiKey);

  return (
    <div
      className={styles.rotaZemini}
      style={{ "--rota-arkaplan": `url("${ROTA_ARKAPLANI}")` } as CSSProperties}
    >
      <RotaCanliligi kitapSayisi={kitaplar.length} />
      <div ref={kokRef} className={styles.rota} style={{ height: yukseklik }}>
        {genislik > 0 ? (
          <>
            <svg
              className={styles.yol}
              width={genislik}
              height={yukseklik}
              viewBox={`0 0 ${genislik} ${yukseklik}`}
              aria-hidden="true"
            >
              <defs>
                <filter
                  id={filtreId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation={o.bulanik} />
                </filter>
              </defs>
              <path d={tumYol} className={styles.yolGolgesi} />
              <path d={tumYol} className={styles.yolZemini} />
              <path d={tumYol} className={styles.yolCizgisi} />
              {isikYolu ? (
                <>
                  <path
                    d={isikYolu}
                    className={styles.isikHalesi}
                    filter={`url(#${filtreId})`}
                  />
                  <path d={isikYolu} className={styles.isikCekirdegi} />
                  <path d={isikYolu} className={styles.isikKivilcimi} />
                </>
              ) : null}
            </svg>

            {kitaplar.map((kitap, sira) => {
              const nokta = noktalar[sira];
              const simdi = kitap.key === siradakiKey;
              const doluluk = kitap.bitti
                ? 100
                : Math.round(
                    (kitap.tamamlanan / Math.max(1, kitap.bolumler.length)) *
                      100,
                  );
              const durum = durakDurumMetni(kitap);
              const siniflar = [
                styles.durak,
                simdi ? styles.durakSimdi : "",
                kitap.bitti ? styles.durakBitti : "",
                seciliKey === kitap.key ? styles.durakSecili : "",
                vurguluKey === kitap.key ? styles.durakVurgulu : "",
              ].join(" ");
              return (
                <button
                  key={kitap.key}
                  type="button"
                  data-kitap={kitap.key}
                  className={siniflar}
                  style={
                    {
                      left: nokta.x,
                      top: nokta.y,
                      "--jeton": `${simdi ? o.simdi : o.jeton}px`,
                      "--doluluk": `${doluluk}%`,
                    } as CSSProperties
                  }
                  aria-label={`${kitap.ad}: ${durum}${kitap.yeni ? ", yeni kitap" : ""}`}
                  aria-pressed={seciliKey === kitap.key}
                  onClick={() => onSec(kitap.key)}
                >
                  <span className={styles.halka}>
                    <YedekliGorsel
                      src={haritaDuragiGorseli(kitap.key)}
                      yedekSrc={YEDEK.durak}
                      alt=""
                      width={120}
                      height={120}
                      className={styles.durakGorseli}
                    />
                    {kitap.bitti ? (
                      <span className={styles.madalyaRozeti}>
                        <YedekliGorsel
                          src={madalyaGorseli(kitap.key)}
                          yedekSrc={YEDEK.madalya}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </span>
                    ) : null}
                    {kitap.yeni ? (
                      <span className={styles.yeniEtiketi}>Yeni</span>
                    ) : null}
                  </span>
                  <span className={styles.levha}>
                    <strong>{kitap.ad}</strong>
                    <small>{durum}</small>
                  </span>
                </button>
              );
            })}

            {siradakiSira >= 0 ? (
              <div
                className={`${styles.isilIsareti} ${siradakiSira % 2 === 1 ? styles.isilSolda : ""}`}
                style={
                  {
                    left: noktalar[siradakiSira].x,
                    top: noktalar[siradakiSira].y,
                    "--yaricap": `${o.simdi / 2}px`,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <Isil boyut={58} className={styles.isilGorseli} />
                <span>Buradasın</span>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
}
