import { UNVAN_ESIKLERI, unvanAnahtari, unvanFromBookCount } from "../../lib/derive";
import { unvanGorseli, YEDEK } from "../../lib/varlikYollari";
import { Ikon, YedekliGorsel } from "../ui";
import ortak from "./cocuk-sayfalari.module.css";
import styles from "./odullerim.module.css";

type UnvanDurumu = "kazanildi" | "simdi" | "sirada" | "ileride";

/**
 * Unvan yolu (PROJE-MODELI 3.10.8): on unvan, eşikleri tek kaynaktan
 * (`UNVAN_ESIKLERI`). REVİZE 12 Eki 2026 (Hasan): dikey liste tablette sola
 * sıkışıyor, yatay on'lu satırda yazılar birbirine giriyordu. Artık eşit
 * boylu kart ızgarası: telefonda 2 sütun, 640px'ten itibaren 5×2.
 *
 * Kazanılan kart altın, şu anki unvan büyük ve "Şu an" etiketli, sıradaki
 * kesik çizgili ("3 kitap daha"), ilerdekiler soluk. Unvan puana değil biten
 * kitap sayısına bağlıdır (Bölüm 2).
 */
export function UnvanYolu({ biten }: { biten: number }) {
  const guncel = unvanFromBookCount(biten);
  const sonraki = UNVAN_ESIKLERI.find((esik) => esik.kitap > biten);

  return (
    <section aria-labelledby="unvan-yolu-basligi">
      <div className={ortak.bolumBasligi}>
        <h2 id="unvan-yolu-basligi">Unvan yolu</h2>
        <span>{biten} kitap bitirdin</span>
      </div>
      <ol className={styles.unvanIzgarasi}>
        {UNVAN_ESIKLERI.map((esik) => {
          const durum: UnvanDurumu =
            esik.unvan === guncel
              ? "simdi"
              : biten >= esik.kitap
                ? "kazanildi"
                : esik === sonraki
                  ? "sirada"
                  : "ileride";
          return (
            <li
              key={esik.unvan}
              className={`${styles.unvanBasamak} ${styles[`unvan_${durum}`]}`}
              aria-current={durum === "simdi" ? "step" : undefined}
            >
              <span className={styles.unvanRozeti}>
                <YedekliGorsel
                  src={unvanGorseli(unvanAnahtari(esik.unvan))}
                  yedekSrc={YEDEK.unvan}
                  alt=""
                  width={76}
                  height={76}
                />
                {durum === "kazanildi" ? (
                  <span className={styles.unvanOnay} aria-hidden="true">
                    <Ikon ad="onay" boyut={14} />
                  </span>
                ) : null}
              </span>
              <strong>{esik.unvan}</strong>
              <small>
                {durum === "simdi"
                  ? "Şu an"
                  : durum === "sirada"
                    ? `${esik.kitap - biten} kitap daha`
                    : esik.kitap === 0
                      ? "Başlangıç"
                      : `${esik.kitap} kitap`}
              </small>
              {durum === "kazanildi" ? <span className={ortak.srOnly}>, kazandın</span> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
