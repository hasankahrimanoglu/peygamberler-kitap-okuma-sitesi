"use client";

import { m, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Isil } from "../cocuk/Isil";
import { Ikon } from "../ui/Ikon";
import { ParlamaPatlamasi } from "./hareket/ParlamaPatlamasi";
import { useHareketiAzalt } from "./hareket/medya";
import styles from "./tanitim.module.css";

/**
 * Rozet anı: kart görünür olunca rozet yaylanarak yerine oturur, çevresinde
 * parıltılar patlar ve Işıl kutlama yapar (okuma ekranındaki rozet anının
 * küçük bir yansıması). Bir kez oynar.
 */
export function RozetAni({ rozetAdi, gorsel }: { rozetAdi: string; gorsel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const gorundu = useInView(ref, { once: true, amount: 0.55 });
  const azalt = useHareketiAzalt();
  const oyna = gorundu && !azalt;

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center rounded-kart border border-white/10 bg-white/[0.04] px-6 pb-8 pt-10 text-center"
    >
      <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
        {gorundu ? <Isil poz="kutlama" boyut={56} /> : null}
      </div>
      <m.div
        className={`${styles.altinHale} relative w-44 sm:w-52`}
        initial={{ scale: 0.6, rotate: -14, opacity: 0 }}
        animate={gorundu || azalt ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 170, damping: 13, mass: 0.9, delay: 0.1 }}
      >
        <Image src={gorsel} alt={rozetAdi} width={512} height={512} sizes="208px" />
        {oyna ? <ParlamaPatlamasi /> : null}
      </m.div>
      <p className="mt-4 font-govde text-sm font-semibold text-murekkep-soluk">Bu bölümün rozeti senin</p>
      <p className="mt-1 font-baslik text-2xl font-extrabold text-vurgu">{rozetAdi}</p>
      <m.span
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--eylem)_16%,transparent)] px-4 py-2 font-baslik text-sm font-bold text-eylem"
        initial={{ opacity: 0, y: 10 }}
        animate={gorundu || azalt ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Ikon ad="onay" boyut={16} />
        Sıradaki bölüm açıldı
      </m.span>
    </div>
  );
}
