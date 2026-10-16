"use client";

import { m } from "framer-motion";
import styles from "./hareket.module.css";

/**
 * Merkezden dışa saçılan parıltılar — rozet kazanma anı. Bir kez oynar.
 * Açılar ve mesafeler sabittir (her açılışta aynı, rastgele değil).
 */
export function ParlamaPatlamasi({ adet = 14, mesafe = 130, gecikme = 0.2 }: { adet?: number; mesafe?: number; gecikme?: number }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: adet }, (_, i) => {
        const aci = (i / adet) * Math.PI * 2 + (i % 2 ? 0.18 : 0);
        const uzaklik = mesafe * (i % 3 === 0 ? 1 : i % 3 === 1 ? 0.78 : 0.9);
        return (
          <m.span
            key={i}
            className={`${styles.parilti} ${i % 2 === 0 ? styles.yildizParilti : ""} ${i % 4 === 1 ? styles.yesilParilti : ""}`}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
            animate={{
              x: Math.cos(aci) * uzaklik,
              y: Math.sin(aci) * uzaklik,
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.1, 0.9, 0.2],
              rotate: i % 2 ? 0 : 90,
            }}
            transition={{ duration: 1.3, delay: gecikme + (i % 3) * 0.04, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </span>
  );
}
