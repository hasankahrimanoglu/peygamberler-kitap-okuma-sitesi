"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_YUMUSAK } from "./Belir";
import { useHareketiAzalt } from "./medya";

/**
 * Görünür olunca sıfırdan hedefe sayan rakam. Sunucu çıktısında son değer
 * yazılıdır (arama motoru ve JavaScript'siz açılış için); sayım, öğe
 * görünür olduğunda başlar.
 */
export function Sayac({ deger }: { deger: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const gorundu = useInView(ref, { once: true, amount: 0.6 });
  const azalt = useHareketiAzalt();
  const sayi = useMotionValue(deger);
  const [yazi, setYazi] = useState(String(deger));
  useMotionValueEvent(sayi, "change", (v) => setYazi(String(Math.round(v))));

  useEffect(() => {
    if (!gorundu || azalt) return;
    sayi.jump(0);
    const kontrol = animate(sayi, deger, { duration: 1.8, ease: EASE_YUMUSAK, delay: 0.15 });
    return () => kontrol.stop();
  }, [gorundu, azalt, deger, sayi]);

  return (
    <span ref={ref} className="tabular-nums">
      {yazi}
    </span>
  );
}
