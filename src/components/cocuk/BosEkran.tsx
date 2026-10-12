import Link from "next/link";
import { Isil } from "./Isil";
import styles from "./cocuk-sayfalari.module.css";

/**
 * Boş ekran: krem kartta Işıl + başlık + kısa metin + tek düğme. Işıl'ın
 * görünebildiği anlardan biri boş ekranlardır (PROJE-MODELI 3.10.5).
 */
export function BosEkran({
  baslik,
  metin,
  dugme,
  className = "",
}: {
  baslik: string;
  metin: string;
  dugme?: { etiket: string; yol: string };
  className?: string;
}) {
  return (
    <section className={`${styles.kart} ${styles.bosEkran} ${className}`}>
      <Isil boyut={96} />
      <h2>{baslik}</h2>
      <p>{metin}</p>
      {dugme ? (
        <Link href={dugme.yol} className={`${styles.dugme} ${styles.dugmeAltin}`}>
          {dugme.etiket}
        </Link>
      ) : null}
    </section>
  );
}
