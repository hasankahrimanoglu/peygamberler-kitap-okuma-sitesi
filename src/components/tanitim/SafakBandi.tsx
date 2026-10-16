"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Isil } from "../cocuk/Isil";
import hareket from "./hareket/hareket.module.css";
import { useHareketiAzalt } from "./hareket/medya";
import styles from "./tanitim.module.css";

/**
 * Gece bölümlerinden velinin krem dünyasına geçiş. Kaydırdıkça güneş yükselir,
 * son yıldızlar söner ve Işıl — bir ateşböceği olarak — sabah olurken güneşe
 * doğru süzülüp dinlenmeye gider. Kapanışta akşamla birlikte geri döner.
 */
export function SafakBandi() {
  const ref = useRef<HTMLDivElement>(null);
  const azalt = useHareketiAzalt();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const gunesY = useTransform(scrollYProgress, [0.1, 0.75], ["38%", "0%"]);
  const gunesOlcek = useTransform(scrollYProgress, [0.1, 0.75], [0.75, 1.08]);
  const yildizSaydamlik = useTransform(scrollYProgress, [0.15, 0.55], [1, 0]);
  const isilSol = useTransform(scrollYProgress, [0.12, 0.72], ["10%", "49%"]);
  const isilUst = useTransform(scrollYProgress, [0.12, 0.72], ["8%", "74%"]);
  const isilOlcek = useTransform(scrollYProgress, [0.12, 0.72], [1, 0.35]);
  const isilSaydamlik = useTransform(scrollYProgress, [0.1, 0.2, 0.6, 0.74], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`${styles.safak} relative h-48 overflow-hidden sm:h-64 lg:h-80`} aria-hidden="true">
      <m.div className={hareket.gunes} style={azalt ? undefined : { y: gunesY, scale: gunesOlcek }} />
      <m.div className={hareket.sonYildizlar} style={azalt ? undefined : { opacity: yildizSaydamlik }} />
      {!azalt ? (
        <m.div
          className="tema-cocuk absolute -ml-5 -mt-5"
          style={{ left: isilSol, top: isilUst, scale: isilOlcek, opacity: isilSaydamlik }}
        >
          <Isil poz="durus" boyut={40} />
        </m.div>
      ) : null}
    </div>
  );
}
