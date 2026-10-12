import type { ReactNode } from "react";
import styles from "./cocuk-sayfalari.module.css";

/**
 * Ödüllerim · Kelimelerim · Görevlerim başlığı: ad, tek satır açıklama ve
 * sağda özet çipleri (PROJE-MODELI 3.10.8). Gece zemininin üstünde durur.
 */
export function SayfaBasligi({
  baslik,
  aciklama,
  children,
}: {
  baslik: string;
  aciklama?: string;
  /** Özet çipleri (`Cip`). */
  children?: ReactNode;
}) {
  return (
    <header className={styles.baslik}>
      <div className={styles.baslikMetni}>
        <h1>{baslik}</h1>
        {aciklama ? <p>{aciklama}</p> : null}
      </div>
      {children ? <div className={styles.cipler}>{children}</div> : null}
    </header>
  );
}

/** Başlığın yanındaki tek özet: "9 kelime", "3 tamamladın". */
export function Cip({ sayi, etiket }: { sayi: number | string; etiket: string }) {
  return (
    <span className={styles.cip}>
      <b>{sayi}</b>
      {etiket}
    </span>
  );
}
