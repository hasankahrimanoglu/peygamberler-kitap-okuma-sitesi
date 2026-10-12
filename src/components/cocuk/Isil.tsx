import { useId } from "react";
import styles from "./isil.module.css";

export type IsilPozu = "durus" | "konusma" | "kutlama";

/**
 * Rehber karakter Işıl (KARAR 11–12 Eki 2026 — PROJE-MODELI 3.10.5).
 *
 * Bir ateşböceği: büyük başlı, kanatlı, karnındaki fener kendi ışığıdır. Faz D
 * (12 Eki 2026) ile görsel dosya yerine KODLA ÇİZİLİR ve canlandırılır: kanat
 * çırpar, fener nefes alır gibi parlar, göz kırpar, antenler sallanır.
 *
 *  - `durus`: havada süzülür (Buradasın, boş ekranlar).
 *  - `konusma`: el sallar, ağzı birkaç kez açılıp kapanır, başını eğer
 *    (balon cümlelerinin yanında).
 *  - `kutlama`: zıplayıp döner, kollar havada, gözler gülümser, çevresinde
 *    parıltılar (rozet, madalya, yolun ucu). Konuşmaz.
 *
 * Dekoratiftir: söylediği cümle her zaman yanındaki metindedir, bu yüzden
 * ekran okuyucudan gizlenir. Renkler çocuk temasının token'larından türer
 * (yalnız `.tema-cocuk` içinde kullanılır). "Hareketi azalt" tercihinde durur.
 */
export function Isil({
  poz = "durus",
  boyut = 56,
  className = "",
}: {
  poz?: IsilPozu;
  boyut?: number;
  className?: string;
}) {
  // Aynı sayfada birden fazla Işıl olabilir; degrade kimlikleri çakışmasın.
  const k = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const url = (ad: string) => `url(#${ad}-${k})`;
  const kutlama = poz === "kutlama";

  return (
    <svg
      viewBox="0 0 120 120"
      width={boyut}
      height={boyut}
      className={`${styles.isil} ${styles[poz]} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`hale-${k}`}>
          <stop offset="0" className={styles.renkCekirdek} stopOpacity="0.95" />
          <stop offset="0.38" className={styles.renkIsik} stopOpacity="0.5" />
          <stop offset="1" className={styles.renkIsik} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`fener-${k}`} cx="0.44" cy="0.38" r="0.68">
          <stop offset="0" className={styles.renkCekirdek} />
          <stop offset="0.5" className={styles.renkIsik} />
          <stop offset="1" className={styles.renkKehribar} />
        </radialGradient>
        <radialGradient id={`bas-${k}`} cx="0.36" cy="0.28" r="0.8">
          <stop offset="0" className={styles.renkBasAcik} />
          <stop offset="0.5" className={styles.renkBas} />
          <stop offset="1" className={styles.renkBasKoyu} />
        </radialGradient>
        <linearGradient id={`kanat-${k}`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" className={styles.renkKanatDip} stopOpacity="0.95" />
          <stop offset="1" className={styles.renkKanatUc} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`cene-${k}`} cx="0.5" cy="1" r="0.75">
          <stop offset="0" className={styles.renkIsik} stopOpacity="0.55" />
          <stop offset="1" className={styles.renkIsik} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`atki-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.renkAtkiAcik} />
          <stop offset="1" className={styles.renkAtki} />
        </linearGradient>
        <clipPath id={`kafa-${k}`}>
          <circle cx="60" cy="42" r="21" />
        </clipPath>
      </defs>

      {/* Fenerin ışığı: karakterin arkasında nefes alan hale. */}
      <circle className={styles.hale} cx="60" cy="84" r="40" fill={url("hale")} />

      {kutlama ? (
        <g className={styles.parlaklar}>
          {[
            [16, 22, 0],
            [104, 28, 1],
            [12, 80, 2],
            [108, 84, 3],
          ].map(([x, y, sira]) => (
            <path
              key={sira}
              className={styles.parlak}
              style={{ animationDelay: `${sira * 0.35}s` }}
              d={`M${x} ${y - 7} L${x + 1.8} ${y - 1.8} L${x + 7} ${y} L${x + 1.8} ${y + 1.8} L${x} ${y + 7} L${x - 1.8} ${y + 1.8} L${x - 7} ${y} L${x - 1.8} ${y - 1.8} Z`}
            />
          ))}
        </g>
      ) : null}

      <g className={styles.govde}>
        {/* Kanatlar: sol çizilir, sağ aynası alınır. Dış grup aynalar, iç
            grup çırpar (CSS transform, transform özniteliğini ezmesin). */}
        {[false, true].map((sag) => (
          <g key={sag ? "sag" : "sol"} className={styles.ayna} transform={sag ? "translate(120 0) scale(-1 1)" : undefined}>
            <g className={`${styles.kanat} ${styles.kanatAlt}`}>
              <path
                d="M52 66 C44 69 30 72 22 66 C16 61 21 53 30 54 C39 55 47 60 52 66 Z"
                fill={url("kanat")}
                className={styles.kanatCizgi}
              />
            </g>
            <g className={styles.kanat}>
              <path
                d="M51 58 C40 58 20 52 15 39 C11 28 22 23 32 29 C43 36 51 47 51 58 Z"
                fill={url("kanat")}
                className={styles.kanatCizgi}
              />
              <path d="M49 55 C42 49 32 41 22 33" className={styles.damar} />
              <path d="M44 56 C36 54 27 50 20 44" className={styles.damar} />
            </g>
          </g>
        ))}

        {/* Kollar: duruşta yanlarda, konuşmada sağ el sallanır, kutlamada ikisi havada. */}
        <g className={`${styles.kol} ${styles.kolSol}`}>
          <path d={kutlama ? "M49 66 Q38 60 33 49" : "M49 67 Q43 71 41 77"} className={styles.kolCizgi} />
          <circle cx={kutlama ? 32.5 : 41} cy={kutlama ? 47.5 : 78} r="3.4" className={styles.el} />
        </g>
        <g className={`${styles.kol} ${styles.kolSag}`}>
          <path
            d={poz === "durus" ? "M71 67 Q77 71 79 77" : kutlama ? "M71 66 Q82 60 87 49" : "M71 66 Q80 61 83 52"}
            className={styles.kolCizgi}
          />
          <circle
            cx={poz === "durus" ? 79 : kutlama ? 87.5 : 83.5}
            cy={poz === "durus" ? 78 : kutlama ? 47.5 : 50.5}
            r="3.4"
            className={styles.el}
          />
        </g>

        {/* Fener (karın): ateşböceğinin kendi ışığı. */}
        <g>
          <ellipse cx="60" cy="86" rx="16" ry="18" fill={url("fener")} />
          <path d="M45.5 82 Q60 88.5 74.5 82" className={styles.halka} />
          <path d="M47.5 93 Q60 99 72.5 93" className={styles.halka} />
          <ellipse cx="54" cy="78" rx="3.6" ry="6" className={styles.fenerParlak} />
          <ellipse className={styles.fenerNabiz} cx="60" cy="86" rx="16" ry="18" />
        </g>

        {/* Göğüs */}
        <ellipse cx="60" cy="66" rx="12.5" ry="8.5" fill={url("bas")} />

        <g className={styles.bas}>
          {/* Antenler: uçlarında küçük ışıklar. */}
          {[false, true].map((sag) => (
            <g key={sag ? "sag" : "sol"} className={styles.ayna} transform={sag ? "translate(120 0) scale(-1 1)" : undefined}>
              <g className={styles.anten}>
                <path d="M54 25 C51 17 46 12 40 9.5" className={styles.antenCizgi} />
                <circle cx="39" cy="9" r="6" className={styles.antenHale} />
                <circle cx="39" cy="9" r="3.4" className={styles.antenUcu} />
              </g>
            </g>
          ))}

          {/* Kafa ve fenerin çeneye vuran ışığı */}
          <circle cx="60" cy="42" r="21" fill={url("bas")} />
          <circle cx="60" cy="42" r="20.4" className={styles.basKenar} />
          <ellipse cx="60" cy="62" rx="19" ry="11" clipPath={url("kafa")} fill={url("cene")} />
          <ellipse cx="51" cy="29" rx="6" ry="3.4" transform="rotate(-24 51 29)" className={styles.basParlak} />

          {/* Yanaklar */}
          <ellipse cx="44.5" cy="50.5" rx="4.2" ry="2.5" className={styles.yanak} />
          <ellipse cx="75.5" cy="50.5" rx="4.2" ry="2.5" className={styles.yanak} />

          {kutlama ? (
            <>
              {/* Gülen gözler ve açık gülümseme */}
              <path d="M46.5 44.5 Q52 37.5 57.5 44.5" className={styles.gulenGoz} />
              <path d="M62.5 44.5 Q68 37.5 73.5 44.5" className={styles.gulenGoz} />
              <path d="M53.5 49.5 Q60 60 66.5 49.5 Z" className={styles.agizIc} />
              <path d="M56.6 55.2 Q60 58.4 63.4 55.2 Q60 53.8 56.6 55.2 Z" className={styles.dil} />
            </>
          ) : (
            <>
              <g className={styles.gozler}>
                {[52, 68].map((x) => (
                  <g key={x}>
                    <ellipse cx={x} cy="43" rx="6.3" ry="7.3" className={styles.gozBeyaz} />
                    <ellipse cx={x + (x < 60 ? 1 : -1)} cy="44.6" rx="4.1" ry="4.7" className={styles.gozBebek} />
                    <circle cx={x + (x < 60 ? 2.6 : 0.6)} cy="42.2" r="1.7" className={styles.gozIsik} />
                    <circle cx={x + (x < 60 ? -0.6 : -2.4)} cy="46.6" r="0.8" className={styles.gozIsik} />
                  </g>
                ))}
              </g>
              {poz === "konusma" ? (
                <ellipse cx="60" cy="52.6" rx="2.9" ry="2.6" className={`${styles.agizIc} ${styles.konusanAgiz}`} />
              ) : (
                <path d="M56.4 51.2 Q60 54.6 63.6 51.2" className={styles.gulumseme} />
              )}
            </>
          )}
        </g>

        {/* Yol arkadaşının atkısı: kimliğin parçası, uçları rüzgârda dalgalanır. */}
        <g>
          <path
            d="M43.5 58.5 Q60 66 76.5 58.5 Q77.6 62.6 75.6 65 Q60 72.6 44.4 65 Q42.4 62.6 43.5 58.5 Z"
            fill={url("atki")}
          />
          <path d="M46 62.6 Q60 68.8 74 62.6" className={styles.atkiCizgi} />
          <g className={styles.atkiUclari}>
            <path d="M66.5 67 Q70.5 73 68.6 79.5 L73.4 78 Q74.6 71.4 69.8 66 Z" fill={url("atki")} />
            <path d="M69 66.4 Q75.4 69.6 78.4 75.4 L81.2 71.6 Q76.6 66.8 70.6 65.4 Z" fill={url("atki")} />
          </g>
          <circle cx="68.6" cy="66.2" r="3.3" className={styles.atkiDugum} />
        </g>
      </g>
    </svg>
  );
}
