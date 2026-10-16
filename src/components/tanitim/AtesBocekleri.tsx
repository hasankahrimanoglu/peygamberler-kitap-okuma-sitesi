import type { CSSProperties } from "react";
import styles from "./hareket/hareket.module.css";

/**
 * Gece bölümlerinde yavaşça süzülen ateşböceği ışıkları — yalnız CSS, sıfır
 * JavaScript. Konum, boyut ve süreler sabittir (her açılışta aynı). Dar
 * ekranda yarısı gösterilmez; "hareketi azalt"ta ışıklar durur.
 */
const ISIKLAR = [
  { x: 6, y: 18, boyut: 5, sure: 13, gecikme: 0, dx: 26, dy: 18 },
  { x: 18, y: 62, boyut: 4, sure: 17, gecikme: 3, dx: -20, dy: 24 },
  { x: 31, y: 34, boyut: 6, sure: 15, gecikme: 6, dx: 30, dy: -16 },
  { x: 44, y: 78, boyut: 4, sure: 19, gecikme: 2, dx: -24, dy: -20 },
  { x: 57, y: 12, boyut: 5, sure: 16, gecikme: 8, dx: 22, dy: 26 },
  { x: 69, y: 48, boyut: 4, sure: 14, gecikme: 4, dx: -28, dy: 14 },
  { x: 82, y: 26, boyut: 6, sure: 18, gecikme: 1, dx: 18, dy: -22 },
  { x: 93, y: 70, boyut: 5, sure: 15, gecikme: 7, dx: -22, dy: -18 },
  { x: 12, y: 88, boyut: 4, sure: 20, gecikme: 5, dx: 24, dy: -26 },
  { x: 38, y: 6, boyut: 5, sure: 17, gecikme: 9, dx: -18, dy: 20 },
  { x: 63, y: 90, boyut: 4, sure: 16, gecikme: 3, dx: 26, dy: -14 },
  { x: 76, y: 8, boyut: 5, sure: 21, gecikme: 6, dx: -26, dy: 22 },
  { x: 88, y: 44, boyut: 4, sure: 14, gecikme: 10, dx: 20, dy: 18 },
  { x: 50, y: 56, boyut: 5, sure: 18, gecikme: 11, dx: -16, dy: -24 },
];

export function AtesBocekleri({ adet = 10, className = "" }: { adet?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {ISIKLAR.slice(0, adet).map((isik, i) => (
        <span
          key={i}
          className={`${styles.atesBocegi} ${i % 2 === 1 ? "hidden md:block" : ""}`}
          style={
            {
              left: `${isik.x}%`,
              top: `${isik.y}%`,
              "--boyut": `${isik.boyut}px`,
              "--sure": `${isik.sure}s`,
              "--gecikme": `-${isik.gecikme}s`,
              "--yol-x": `${isik.dx}px`,
              "--yol-y": `${isik.dy}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
