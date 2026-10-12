import type { CSSProperties } from "react";
import styles from "./yolculuk.module.css";

/**
 * Rotanın hareket katmanı (12 Eki 2026). Arka plan görseli durağandır ve bir
 * kez çizilir; canlılık bu ince katmandan gelir:
 *  - ateşböcekleri: Işıl'ın akrabaları, rota boyunca yavaşça süzülüp parlar;
 *  - bulut gölgeleri: çayırın üstünden ağır ağır geçer.
 * Yalnız `transform` ve `opacity` canlandırılır (tablette tam ekran yeniden
 * boyama olmasın — PROJE-MODELI 3.1'deki yıldız parıltısı kararının gerekçesi).
 * "Hareketi azalt" tercihinde hepsi durur.
 */
export function RotaCanliligi({ kitapSayisi }: { kitapSayisi: number }) {
  const sayi = Math.min(28, 8 + kitapSayisi * 2);
  // Sabit tohumlu sözde rastgele dağılım: her açılışta aynı yerleşim, sunucu
  // ve tarayıcı çizimi birebir aynı.
  const ateslar = Array.from({ length: sayi }, (_, sira) => {
    const x = (sira * 37 + 11) % 100;
    const y = ((sira + 0.5) / sayi) * 100 + (((sira * 53) % 9) - 4);
    return {
      left: `${x}%`,
      top: `${Math.min(98, Math.max(1, y))}%`,
      "--boy": `${6 + ((sira * 7) % 4)}px`,
      "--sure": `${6 + ((sira * 13) % 5)}s`,
      "--gecikme": `-${(sira * 1.7) % 9}s`,
      "--dx": `${((sira * 29) % 30) - 15}px`,
    } as CSSProperties;
  });

  return (
    <div className={styles.canlilik} aria-hidden="true">
      <span className={`${styles.bulutGolgesi} ${styles.bulutBir}`} />
      <span className={`${styles.bulutGolgesi} ${styles.bulutIki}`} />
      {ateslar.map((stil, sira) => (
        <span key={sira} className={styles.atesbocegi} style={stil} />
      ))}
    </div>
  );
}
