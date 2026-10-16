"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Isil, type IsilPozu } from "../../cocuk/Isil";
import { EASE_YUMUSAK } from "./Belir";
import { IsikKuyrugu } from "./IsikKuyrugu";
import { GENIS_EKRAN, useHareketiAzalt, useMedya } from "./medya";
import styles from "./hareket.module.css";

/**
 * Işıl'ın rehberliği (KARAR 16 Eki 2026 — Hasan: Işıl sayfa boyunca bölüm
 * bölüm, tek karakter gibi ilerler).
 *
 * `RehberAlani` bir bölümü sarar. İçindeki `RehberIsil` uçarak sahneye girer;
 * `RehberHedefi` ile sarılan düğmenin üzerine fareyle gelinince Işıl o yöne
 * eğilir, kanatları hızlanır ve düğmeye doğru parıltı saçar. Dokunmatik
 * ekranda parıltı yoktur (dokunuş zaten sayfayı değiştirir).
 *
 * Işıl dinî içeriğin yanında kullanılmaz (PROJE-MODELI 3.10.5: hikâyede ve
 * dinî yorumda asla).
 */

type Rehber = {
  /** Alandaki Işıl kendini kaydeder: öğesi ve o anki görünürlüğünü okuyan işlev. */
  isilKaydet: (oge: HTMLElement | null, opaklik: () => number) => void;
  /** -1 sola, 1 sağa doğru heyecan; 0 sakin. */
  heyecan: MotionValue<number>;
  hedefeSac: (hedef: HTMLElement) => void;
};

const RehberBaglami = createContext<Rehber | null>(null);

type Nokta = { x: number; y: number };
type Iz = { kimlik: number; bas: Nokta; son: Nokta };

export function RehberAlani({ children, className = "" }: { children: ReactNode; className?: string }) {
  const alanRef = useRef<HTMLDivElement>(null);
  const isilRef = useRef<HTMLElement | null>(null);
  const isilOpakligi = useRef<() => number>(() => 1);
  const heyecan = useMotionValue(0);
  const azalt = useHareketiAzalt();
  const [izler, setIzler] = useState<Iz[]>([]);
  const sonSacma = useRef(0);
  const sayac = useRef(0);

  const hedefeSac = useCallback(
    (hedef: HTMLElement) => {
      const alan = alanRef.current;
      const isil = isilRef.current;
      if (!alan || !isil || azalt || isilOpakligi.current() < 0.4) return;
      const simdi = performance.now();
      if (simdi - sonSacma.current < 900) return;
      sonSacma.current = simdi;

      const a = alan.getBoundingClientRect();
      const k = isil.getBoundingClientRect();
      const h = hedef.getBoundingClientRect();
      const bas = { x: k.left + k.width / 2 - a.left, y: k.top + k.height * 0.62 - a.top };
      const son = { x: h.left + h.width * 0.82 - a.left, y: h.top + h.height * 0.3 - a.top };
      const kimlik = ++sayac.current;

      setIzler((onceki) => [...onceki, { kimlik, bas, son }]);
      heyecan.set(son.x >= bas.x ? 1 : -1);
      window.setTimeout(() => heyecan.set(0), 1100);
      window.setTimeout(() => setIzler((onceki) => onceki.filter((iz) => iz.kimlik !== kimlik)), 1800);
    },
    [azalt, heyecan],
  );

  const isilKaydet = useCallback((oge: HTMLElement | null, opaklik: () => number) => {
    isilRef.current = oge;
    isilOpakligi.current = opaklik;
  }, []);

  const deger = useMemo(() => ({ isilKaydet, heyecan, hedefeSac }), [isilKaydet, heyecan, hedefeSac]);

  return (
    <div ref={alanRef} className={`relative ${className}`}>
      <RehberBaglami.Provider value={deger}>{children}</RehberBaglami.Provider>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
        {izler.map((iz) => (
          <ParlamaIzi key={iz.kimlik} bas={iz.bas} son={iz.son} />
        ))}
      </div>
    </div>
  );
}

/** Fareyle üzerine gelinince Işıl'ın dikkatini bu öğeye çeker. */
export function RehberHedefi({ children, className = "inline-flex" }: { children: ReactNode; className?: string }) {
  const baglam = useContext(RehberBaglami);
  return (
    <span
      className={className}
      onPointerEnter={(olay) => {
        if (olay.pointerType === "mouse") baglam?.hedefeSac(olay.currentTarget);
      }}
    >
      {children}
    </span>
  );
}

/** Işıl'dan hedefe kavis çizerek uçan parıltılar. */
function ParlamaIzi({ bas, son }: { bas: Nokta; son: Nokta }) {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => {
        const sapma = (i - 3) * 10;
        const tepe = { x: (bas.x + son.x) / 2 + sapma, y: Math.min(bas.y, son.y) - 46 - Math.abs(sapma) * 0.6 };
        return (
          <m.span
            key={i}
            className={`${styles.parilti} ${i % 2 === 0 ? styles.yildizParilti : ""}`}
            initial={{ x: bas.x, y: bas.y, opacity: 0, scale: 0.3 }}
            animate={{
              x: [bas.x, tepe.x, son.x + sapma * 0.5],
              y: [bas.y, tepe.y, son.y + (i % 3) * 5],
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1, 0.9, 0.15],
            }}
            transition={{ duration: 1.1, delay: i * 0.055, ease: EASE_YUMUSAK }}
          />
        );
      })}
    </>
  );
}

type GirisYolu = "soldan" | "yukaridan" | "sagdan";

/** Uçuş yolları: son nokta (0, 0) Işıl'ın sayfadaki yeridir. */
const YOLLAR: Record<GirisYolu, { x: number[]; y: number[]; rotate: number[]; scale: number[]; sure: number }> = {
  soldan: { x: [-440, -210, -70, 0], y: [-170, 34, -38, 0], rotate: [16, -8, 10, 0], scale: [0.5, 0.9, 1, 1], sure: 2.6 },
  yukaridan: { x: [150, 60, 0], y: [-260, -80, 0], rotate: [-24, 10, 0], scale: [0.55, 1, 1], sure: 1.9 },
  sagdan: { x: [380, 170, 40, 0], y: [-150, 40, -26, 0], rotate: [-16, 8, -6, 0], scale: [0.5, 0.95, 1, 1], sure: 2.3 },
};

const HIZLI_KANAT = { "--isil-kanat-suresi": "0.11s", "--isil-kanat-suresi-kutlama": "0.1s" } as CSSProperties;

/**
 * Sahneye uçarak giren Işıl.
 *  - Yeri görünür alana girince uçar. Sayfa açılışında zaten görünürse
 *    `gecikme` kadar bekler (hero'da başlık animasyonuyla sıralı); sonradan
 *    görünür olursa hemen kalkar. Böylece hero görseli ilk ekranın altında
 *    kalan telefonda da uçuş, kullanıcı oraya indiğinde izlenir.
 *  - `cikisKaydirinca`: kullanıcı aşağı indikçe aşağıya doğru uçup gözden
 *    kaybolur (hero → altın yol devri: aynı karakter bir sonraki bölümde
 *    yukarıdan süzülüp gelir).
 * Hızlı uçarken kanatlar hızlanır ve arkasında ışık tozu belirir.
 */
export function RehberIsil({
  poz = "durus",
  boyut = 64,
  giris,
  gecikme = 0,
  cikisKaydirinca = false,
}: {
  poz?: IsilPozu;
  boyut?: number;
  giris?: GirisYolu;
  gecikme?: number;
  cikisKaydirinca?: boolean;
}) {
  const baglam = useContext(RehberBaglami);
  const azalt = useHareketiAzalt();
  const genis = useMedya(GENIS_EKRAN);
  const capaRef = useRef<HTMLDivElement>(null);
  const yol = giris ? YOLLAR[giris] : null;

  // Uçuş değerleri
  const x = useMotionValue(yol ? yol.x[0] : 0);
  const y = useMotionValue(yol ? yol.y[0] : 0);
  const donus = useMotionValue(yol ? yol.rotate[0] : 0);
  const olcek = useMotionValue(yol ? yol.scale[0] : 1);
  const saydamlik = useMotionValue(yol ? 0 : 1);

  const gorundu = useInView(capaRef, { once: true, amount: 0.5 });
  const acilis = useRef(0);
  useEffect(() => {
    acilis.current = performance.now();
  }, []);

  useEffect(() => {
    if (!yol || !gorundu) return;
    if (azalt) {
      x.set(0);
      y.set(0);
      donus.set(0);
      olcek.set(1);
      saydamlik.set(1);
      return;
    }
    // Açılışta görünürdü → sıralı gecikme; sonradan göründü → hemen.
    const bekleme = performance.now() - acilis.current < 1200 ? gecikme : 0.15;
    const secenek = { duration: yol.sure, delay: bekleme, ease: "easeInOut" as const };
    const kontroller = [
      animate(x, yol.x, secenek),
      animate(y, yol.y, secenek),
      animate(donus, yol.rotate, secenek),
      animate(olcek, yol.scale, secenek),
      animate(saydamlik, [0, 1], { duration: 0.6, delay: bekleme }),
    ];
    return () => kontroller.forEach((kontrol) => kontrol.stop());
  }, [gorundu, azalt, yol, gecikme, x, y, donus, olcek, saydamlik]);

  // Kaydırınca uzaklaşma (yalnız hero)
  const { scrollYProgress } = useScroll({ target: capaRef, offset: ["start 0.42", "start -0.25"] });
  const cikis = cikisKaydirinca && !azalt;
  const cikisY = useTransform(scrollYProgress, [0, 1], [0, cikis ? 280 : 0]);
  const cikisX = useTransform(scrollYProgress, [0, 1], [0, cikis ? 110 : 0]);
  const cikisDonus = useTransform(scrollYProgress, [0, 1], [0, cikis ? 30 : 0]);
  const cikisSaydamlik = useTransform(scrollYProgress, [0.3, 0.9], [1, cikis ? 0 : 1]);

  // Heyecan: hedefe doğru eğilme
  const sakin = useMotionValue(0);
  const heyecan = baglam?.heyecan ?? sakin;
  const egim = useSpring(
    useTransform(heyecan, (v) => v * 16),
    { stiffness: 220, damping: 12 },
  );

  const toplamX = useTransform([x, cikisX], ([a, b]) => (a as number) + (b as number));
  const toplamY = useTransform([y, cikisY], ([a, b]) => (a as number) + (b as number));
  const toplamDonus = useTransform([donus, cikisDonus, egim], ([a, b, c]) => (a as number) + (b as number) + (c as number));
  const toplamSaydamlik = useTransform([saydamlik, cikisSaydamlik], ([a, b]) => (a as number) * (b as number));

  // Hız: kanat çırpma ve ışık tozu buna bağlı
  const hizX = useVelocity(toplamX);
  const hizY = useVelocity(toplamY);
  const hiz = useTransform([hizX, hizY], ([a, b]) => Math.hypot(a as number, b as number));
  const kuyrukGorunur = useTransform(hiz, [60, 650], [0, 1], { clamp: true });
  const [kanatHizli, setKanatHizli] = useState(false);
  useMotionValueEvent(hiz, "change", (v) => setKanatHizli(v > 140));
  const [heyecanli, setHeyecanli] = useState(false);
  useMotionValueEvent(heyecan, "change", (v) => setHeyecanli(v !== 0));

  const isilRef = useRef<HTMLSpanElement>(null);
  const isilKaydet = baglam?.isilKaydet;
  useEffect(() => {
    if (!isilKaydet) return;
    isilKaydet(isilRef.current, () => toplamSaydamlik.get());
    return () => isilKaydet(null, () => 0);
  }, [isilKaydet, toplamSaydamlik]);

  const yarim = boyut / 2;

  return (
    <div ref={capaRef} className="relative" style={{ width: boyut, height: boyut }}>
      {!azalt ? (
        <div className="pointer-events-none absolute" style={{ left: yarim, top: yarim }} aria-hidden="true">
          <IsikKuyrugu x={toplamX} y={toplamY} gorunurluk={kuyrukGorunur} adet={genis ? 6 : 3} boyut={boyut * 0.24} />
        </div>
      ) : null}
      <m.span
        ref={isilRef}
        className="absolute inset-0 block"
        style={{
          x: toplamX,
          y: toplamY,
          rotate: toplamDonus,
          scale: olcek,
          opacity: toplamSaydamlik,
          ...(kanatHizli || heyecanli ? HIZLI_KANAT : null),
        }}
      >
        <Isil poz={poz} boyut={boyut} />
      </m.span>
    </div>
  );
}
