"use client";

import {
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Isil } from "../cocuk/Isil";
import { Belir } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { IsikKuyrugu } from "./hareket/IsikKuyrugu";
import { GENIS_EKRAN, useHareketiAzalt, useMedya } from "./hareket/medya";
import styles from "./tanitim.module.css";

export type YolAdimi = { baslik: string; metin: string; gorsel: ReactNode };

const ISIL_BOYUTU = 52;

/** Kaydırma hızına göre kanat süresi: dururken uygulamadaki gibi, hızlandıkça çırpış sıklaşır. */
const KANAT_SURESI = ["0.26s", "0.16s", "0.1s"] as const;

/**
 * "Bir bölüm nasıl ilerler?" bölümünün altın yolu — okuma ekranındaki adım
 * çubuğunun büyütülmüş hâli.
 *
 *  - Ray, kaydırdıkça altınla dolar; Işıl dolgunun ucunda, ekranın ortasına
 *    yakın bir çizgide yaylı (gecikmeli, yumuşak) biçimde ilerler.
 *  - Kullanıcı durunca Işıl havada süzülür (Işıl'ın kendi duruş hareketi);
 *    hızlı kaydırınca kanatları sıklaşır, hareket yönüne eğilir ve arkasında
 *    ışık tozu kuyruğu belirir.
 *  - Bölüm görünür olunca Işıl yukarıdan süzülüp rayın başına konar (hero'da
 *    gözden kaybolan Işıl'ın devamı).
 *  - Işıl bir adım numarasına ulaşınca o daire altınla yanar.
 *
 * Tüm tarayıcılarda çalışır. "Hareketi azalt"ta ray dolu, Işıl rayın başında,
 * adımların hepsi yanık ve durağandır.
 */
export function AltinYol({ adimlar }: { adimlar: YolAdimi[] }) {
  const kapRef = useRef<HTMLDivElement>(null);
  const isaretRefleri = useRef<(HTMLSpanElement | null)[]>([]);
  const merkezler = useRef<number[]>([]);
  const azalt = useHareketiAzalt();
  const genis = useMedya(GENIS_EKRAN);

  // Ölçüler: rayın yüksekliği ve adım dairelerinin raydaki yeri.
  const yukseklik = useMotionValue(0);
  useEffect(() => {
    const kap = kapRef.current;
    if (!kap) return;
    const gozlemci = new ResizeObserver(() => {
      const kutu = kap.getBoundingClientRect();
      yukseklik.set(kutu.height);
      merkezler.current = isaretRefleri.current.map((isaret) => {
        if (!isaret) return Number.POSITIVE_INFINITY;
        const k = isaret.getBoundingClientRect();
        return k.top + k.height / 2 - kutu.top;
      });
    });
    gozlemci.observe(kap);
    return () => gozlemci.disconnect();
  }, [yukseklik]);

  // İlerleme: kabın başı ekranın %45'ine gelince 0, sonu gelince 1.
  const { scrollYProgress } = useScroll({ target: kapRef, offset: ["start 0.45", "end 0.45"] });
  const ilerleme = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.6 });
  const isilY = useTransform([ilerleme, yukseklik], ([p, h]) => (p as number) * (h as number));
  const sifir = useMotionValue(0);

  // Yanan adımlar
  const [yanan, setYanan] = useState(0);
  useMotionValueEvent(isilY, "change", (y) => {
    setYanan(merkezler.current.filter((merkez) => merkez <= y + 6).length);
  });

  // Hız: kanat, eğim ve ışık tozu
  const { scrollY } = useScroll();
  const hiz = useVelocity(scrollY);
  const hizMutlak = useTransform(hiz, (v) => Math.abs(v));
  const kuyrukGorunur = useSpring(useTransform(hizMutlak, [220, 1700], [0, 1], { clamp: true }), {
    stiffness: 140,
    damping: 22,
  });
  const egim = useSpring(useTransform(hiz, [-2600, 0, 2600], [-18, 0, 18], { clamp: true }), {
    stiffness: 150,
    damping: 16,
  });
  const [kanat, setKanat] = useState<0 | 1 | 2>(0);
  useMotionValueEvent(hizMutlak, "change", (v) => setKanat(v > 1500 ? 2 : v > 420 ? 1 : 0));

  // Giriş: bölüm görünür olunca yukarıdan süzülüp rayın başına konar.
  const geldi = useInView(kapRef, { once: true, margin: "0px 0px -30% 0px" });

  const tumuYanik = azalt;

  return (
    <div ref={kapRef} className={`${styles.yol} mt-16 lg:mt-24`}>
      <div className={styles.yolRayi} aria-hidden="true">
        <m.div className={styles.yolDolgusu} style={{ scaleY: tumuYanik ? 1 : ilerleme }} />
      </div>

      {/* Işıl katmanı: adım dairelerinin üstünde */}
      <div className={`${styles.yolIsilKatmani} z-20`} aria-hidden="true">
        {!tumuYanik ? (
          <IsikKuyrugu x={sifir} y={isilY} gorunurluk={kuyrukGorunur} adet={genis ? 7 : 4} boyut={15} />
        ) : null}
        <m.div
          className="absolute"
          style={{
            y: tumuYanik ? 0 : isilY,
            left: -ISIL_BOYUTU / 2,
            top: -ISIL_BOYUTU / 2,
            width: ISIL_BOYUTU,
            height: ISIL_BOYUTU,
          }}
        >
          <m.div
            initial={{ opacity: 0, x: 150, y: -260, rotate: -24, scale: 0.55 }}
            animate={
              tumuYanik
                ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                : geldi
                  ? { opacity: 1, x: [150, 60, 0], y: [-260, -80, 0], rotate: [-24, 10, 0], scale: [0.55, 1, 1] }
                  : undefined
            }
            transition={
              tumuYanik ? { duration: 0 } : { duration: 1.9, ease: "easeInOut", opacity: { duration: 0.5 } }
            }
          >
            <m.div
              style={{
                rotate: tumuYanik ? 0 : egim,
                ...({ "--isil-kanat-suresi": KANAT_SURESI[kanat] } as CSSProperties),
              }}
            >
              <Isil poz="durus" boyut={ISIL_BOYUTU} />
            </m.div>
          </m.div>
        </m.div>
      </div>

      <ol className="relative space-y-20 lg:space-y-32">
        {adimlar.map((adim, i) => {
          const solda = i % 2 === 0;
          const yandi = tumuYanik || i < yanan;
          return (
            <li
              key={adim.baslik}
              className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] lg:items-center lg:gap-x-0"
            >
              <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
                <span
                  ref={(el) => {
                    isaretRefleri.current[i] = el;
                  }}
                  className={`${styles.adimIsareti} ${hareket.adimIsareti} ${yandi ? hareket.adimYandi : ""} flex h-14 w-14 items-center justify-center rounded-full border-2 border-vurgu font-baslik text-xl font-extrabold`}
                >
                  {i + 1}
                </span>
              </div>

              <Belir
                className={`col-start-2 row-start-1 self-center lg:row-start-1 ${
                  solda ? "lg:col-start-1 lg:justify-self-end lg:pr-14" : "lg:col-start-3 lg:pl-14"
                }`}
              >
                <div className="max-w-md">
                  <h3 className="font-edebi text-[1.7rem] font-semibold leading-tight text-murekkep sm:text-[2rem]">
                    {adim.baslik}
                  </h3>
                  <p className="mt-3 font-govde text-[1.05rem] leading-relaxed text-murekkep-soluk sm:text-lg">
                    {adim.metin}
                  </p>
                </div>
              </Belir>

              {adim.gorsel ? (
                <Belir
                  yon={solda ? "sag" : "sol"}
                  gecikme={0.12}
                  sure={1}
                  className={`col-start-2 row-start-2 mt-8 lg:row-start-1 lg:mt-0 ${
                    solda ? "lg:col-start-3 lg:pl-14" : "lg:col-start-1 lg:pr-14"
                  }`}
                >
                  {adim.gorsel}
                </Belir>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
