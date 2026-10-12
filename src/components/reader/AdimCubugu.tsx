import type { CSSProperties } from "react";
import { Ikon } from "../ui";
import styles from "./okuma-akisi.module.css";

type AdimDurumu = "gecildi" | "simdi" | "sirada" | "kilitli";

/** Okuma ekranının adımları (`OkumaAdimi`) ve final testinin soruları bu biçimde gelir. */
export type CubukAdimi<T extends string> = {
  id: T;
  kisa: string;
  uzun: string;
  /** "Sen Olsaydın" kapısının arkasında mı (seçim onaylanmadan açılmaz). */
  kapiArkasinda: boolean;
};

const DURUM_METNI: Record<AdimDurumu, string> = {
  gecildi: "tamamlandı",
  simdi: "şu an buradasın",
  sirada: "sırada",
  kilitli: "seçimini yapınca açılır",
};

/**
 * Bölümün adım çubuğu (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.3). Eski ince
 * ilerleme çizgisinin ve "Okuma Araçları"ndaki durak listesinin yerini alır:
 * çocuk "ne kadar kaldı?" sorusunun cevabını sayfa numarasına bakmadan görür.
 *
 *  - `yatay`: telefon ve tablet dikey, üst barın altında. Her adımın çizgisi
 *    okundukça altınla dolar (ana ekrandaki ışık iziyle aynı dil).
 *  - `dikey`: tablet yatay ve masaüstü, sol sütunda; adımlar arasındaki yol
 *    altınla dolar.
 *
 * Yalnız geçilmiş adımlara (ve bulunulan adıma) dokunulabilir; "Sen Olsaydın"
 * kapısının arkasındaki adımlar seçim yapılmadan kilitlidir, içerikleri DOM'da
 * yoktur. Büyük Final Testi aynı çubuğu soru sırası için kullanır; orada geri
 * dönülmez (`dokunulur={false}`).
 */
export function AdimCubugu<T extends string>({
  adimlar,
  aktif,
  dolu,
  enIleri,
  kapiAcik,
  yon,
  onSec,
  dokunulur = true,
  etiket = "Bölümün adımları",
}: {
  adimlar: CubukAdimi<T>[];
  /** Etkin adımın sırası. */
  aktif: number;
  /** Etkin adımın ne kadarının okunduğu (0–1). */
  dolu: number;
  /** Çocuğun bu açılışta ulaştığı en ileri adım. */
  enIleri: number;
  kapiAcik: boolean;
  yon: "yatay" | "dikey";
  onSec?: (id: T) => void;
  /** false: adımlar yalnız gösterilir, dokunulmaz. */
  dokunulur?: boolean;
  etiket?: string;
}) {
  const yatay = yon === "yatay";

  return (
    <nav
      className={yatay ? styles.yatayAdimlar : styles.dikeyAdimlar}
      aria-label={etiket}
    >
      <ol>
        {adimlar.map((adim, sira) => {
          const kilitli = adim.kapiArkasinda && !kapiAcik;
          const durum: AdimDurumu = kilitli
            ? "kilitli"
            : sira < aktif
              ? "gecildi"
              : sira === aktif
                ? "simdi"
                : "sirada";
          const tiklanir = dokunulur && !kilitli && sira <= Math.max(enIleri, aktif);
          // Yatayda her adımın kendi çizgisi; dikeyde iz, adımdan bir
          // sonrakine uzanan yoldur.
          const doluluk = sira < aktif ? 1 : sira === aktif ? dolu : 0;

          return (
            <li key={adim.id} className={styles[`adim_${durum}`]}>
              <button
                type="button"
                className={yatay ? styles.yatayAdim : styles.dikeyAdim}
                disabled={!tiklanir}
                aria-current={durum === "simdi" ? "step" : undefined}
                onClick={() => onSec?.(adim.id)}
              >
                {yatay ? (
                  <span className={styles.adimIzi} aria-hidden="true">
                    <span style={{ "--dolu": doluluk } as CSSProperties} />
                  </span>
                ) : (
                  <span className={styles.adimNoktasi} aria-hidden="true">
                    {durum === "gecildi" ? (
                      <Ikon ad="onay" boyut={20} />
                    ) : durum === "kilitli" ? (
                      <Ikon ad="kilit" boyut={17} />
                    ) : (
                      sira + 1
                    )}
                  </span>
                )}
                <span className={styles.adimEtiketi}>
                  {yatay && durum === "kilitli" ? <Ikon ad="kilit" boyut={11} /> : null}
                  {yatay ? adim.kisa : adim.uzun}
                  <span className={styles.srOnly}>
                    {yatay ? `, ${adim.uzun.toLocaleLowerCase("tr-TR")}` : ""}, {DURUM_METNI[durum]}
                  </span>
                </span>
              </button>
              {!yatay && sira < adimlar.length - 1 ? (
                <span className={styles.dikeyIz} aria-hidden="true">
                  <span style={{ "--dolu": doluluk } as CSSProperties} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
