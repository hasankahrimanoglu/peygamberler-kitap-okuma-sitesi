"use client";

import { m, useSpring, useTransform, type MotionValue } from "framer-motion";
import styles from "./hareket.module.css";

/**
 * Işıl'ın arkasında bıraktığı ışık tozu. Her parçacık Işıl'ın konumunu
 * giderek gevşeyen bir yayla izler; böylece hızlı harekette kuyruk uzar,
 * durunca parçacıklar Işıl'ın içine toplanır. Görünürlük dışarıdan (hıza
 * bağlı) verilir; Işıl dururken kuyruk görünmez.
 *
 * Parçacıklar verilen koordinat sisteminin (0, 0) noktasına göre konumlanır;
 * kap, Işıl'ın merkeziyle aynı başlangıç noktasını paylaşmalıdır.
 */
export function IsikKuyrugu({
  x,
  y,
  gorunurluk,
  adet = 6,
  boyut = 12,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  gorunurluk: MotionValue<number>;
  adet?: number;
  boyut?: number;
}) {
  return (
    <>
      {Array.from({ length: adet }, (_, sira) => (
        <Parcacik key={sira} sira={sira} adet={adet} x={x} y={y} gorunurluk={gorunurluk} boyut={boyut} />
      ))}
    </>
  );
}

function Parcacik({
  sira,
  adet,
  x,
  y,
  gorunurluk,
  boyut,
}: {
  sira: number;
  adet: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  gorunurluk: MotionValue<number>;
  boyut: number;
}) {
  // Uzaktaki parçacık daha gevşek yayla izler → kuyruk.
  const yay = { stiffness: 320 - sira * 42, damping: 30, mass: 0.5 };
  const px = useSpring(x, yay);
  const py = useSpring(y, yay);
  const agirlik = 1 - sira / adet;
  const opacity = useTransform(gorunurluk, (g) => g * (0.25 + agirlik * 0.75));
  const cap = Math.round(boyut * (0.35 + agirlik * 0.65));

  return (
    <m.span
      aria-hidden="true"
      className={styles.kuyrukParcasi}
      style={{ x: px, y: py, opacity, width: cap, height: cap, marginLeft: -cap / 2, marginTop: -cap / 2 }}
    />
  );
}
