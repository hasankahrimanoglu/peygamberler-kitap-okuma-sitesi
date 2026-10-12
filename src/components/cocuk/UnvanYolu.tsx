import { UNVAN_ESIKLERI, unvanAnahtari, unvanFromBookCount } from "../../lib/derive";
import { unvanGorseli, YEDEK } from "../../lib/varlikYollari";
import { YedekliGorsel } from "../ui";
import ortak from "./cocuk-sayfalari.module.css";
import styles from "./odullerim.module.css";

/**
 * Unvan yolu (PROJE-MODELI 3.10.8): on unvan, eşikleri tek kaynaktan
 * (`UNVAN_ESIKLERI`). Ana ekrandaki gibi altın ışık izi şu anki unvana kadar
 * dolar. Telefonda dikey, geniş ekranda yatay. Unvan puana değil biten kitap
 * sayısına bağlıdır (Bölüm 2).
 */
export function UnvanYolu({ biten }: { biten: number }) {
  const guncel = unvanFromBookCount(biten);

  return (
    <section aria-labelledby="unvan-yolu-basligi">
      <div className={ortak.bolumBasligi}>
        <h2 id="unvan-yolu-basligi">Unvan yolu</h2>
        <span>{biten} kitap bitirdin</span>
      </div>
      <div className={`${ortak.kart} ${styles.unvanYolu}`}>
        <ol>
          {UNVAN_ESIKLERI.map((esik, sira) => {
            const kazanildi = biten >= esik.kitap;
            const simdi = esik.unvan === guncel;
            const sonrakiKazanildi = biten >= (UNVAN_ESIKLERI[sira + 1]?.kitap ?? Infinity);
            return (
              <li
                key={esik.unvan}
                className={[
                  simdi ? styles.unvanSimdi : kazanildi ? styles.unvanKazanildi : styles.unvanIleride,
                  sonrakiKazanildi ? styles.izDolu : "",
                ].join(" ")}
                aria-current={simdi ? "step" : undefined}
              >
                <span className={styles.unvanNoktasi}>
                  <YedekliGorsel
                    src={unvanGorseli(unvanAnahtari(esik.unvan))}
                    yedekSrc={YEDEK.unvan}
                    alt=""
                    width={64}
                    height={64}
                  />
                </span>
                <span className={styles.unvanYazisi}>
                  <strong>{esik.unvan}</strong>
                  <small>
                    {simdi
                      ? "Şu an"
                      : esik.kitap === 0
                        ? "Başlangıç"
                        : `${esik.kitap} kitap`}
                  </small>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
