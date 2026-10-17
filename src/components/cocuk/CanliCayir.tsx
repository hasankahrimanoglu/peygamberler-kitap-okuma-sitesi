"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CAYIR_GORSEL_OLCUSU, CAYIR_IRMAKLARI } from "./canliCayirIrmaklari";
import styles from "./canli-cayir.module.css";

/**
 * Canlı çayır (KARAR — 17 Eki 2026, Hasan; PROJE-MODELI 3.10.1).
 *
 * Boyalı rota görseli (`ROTA_ARKAPLANI`) olduğu gibi zemindir; bu katman onun
 * üstüne kodla çizilen hareketi ekler: ırmakta akan su, çimenin üstünden geçen
 * rüzgâr, rüzgârda sallanan çiçek ve saz öbekleri, kenarlarda uçan kelebekler,
 * ara sıra çıkan bir tavşan ve arada bir çayırın üstünden geçen kuş sürüsü. Görsel `repeat-y` ile alt alta tekrar ettiği için katman da görselin
 * bir kopyası boyunca bir "karo" çizer ve karoları aynı aralıkla dizer.
 *
 * Koordinatlar görselin pikselleridir (1122×2804); karo içinde yüzdeye, canlı
 * ölçüleri `cqw` ile karo genişliğine bağlanır — görsel nasıl ölçekleniyorsa
 * katman da öyle ölçeklenir.
 *
 * Dikkat dağıtmama kuralları: çiçek, saz ve kelebekler kenar şeritlerindedir
 * (orta sütun durakların, sakin kalır); hareketler yavaş ve küçüktür. Karo
 * başına tek tavşan vardır, çoğu zaman görünmez ve hiçbir durağın ya da kartın
 * altına düşmez. Kuş sürüsü 45 saniyede bir, birkaç saniyede geçip gider. Ekran
 * dışındaki karoların hareketi durur; "hareketi azalt" tercihinde katman hiç
 * çizilmez.
 */

const { genislik: GW, yukseklik: GH } = CAYIR_GORSEL_OLCUSU;

const yuzde = (deger: number, toplam: number) => `${(deger / toplam) * 100}%`;
const konum = (x: number, y: number) => ({ left: yuzde(x, GW), top: yuzde(y, GH) });

type TavsanCebi = { x: number; y: number; yon: 1 | -1 };

/**
 * Tavşanın çıkabileceği çimen cepleri (görsel pikseli, ayakların ortası; yön
 * ilk sıçrayışın yönüdür). Kenar şeritleri çoğunlukla çalı ve ırmak olduğu için
 * orta çayırdaki boşluklar da adaydır. Her karoda bir tavşan olur: bir durağın,
 * levhanın veya kartın altında kalmayan ceplerden biri seçilir; boş cep yoksa o
 * karoda tavşan çıkmaz.
 */
const TAVSAN_CEPLERI: TavsanCebi[] = [
  { x: 214, y: 548, yon: 1 },
  { x: 430, y: 330, yon: 1 },
  { x: 650, y: 640, yon: -1 },
  { x: 470, y: 880, yon: 1 },
  { x: 720, y: 1010, yon: -1 },
  { x: 262, y: 1352, yon: 1 },
  { x: 560, y: 1430, yon: 1 },
  { x: 902, y: 1548, yon: -1 },
  { x: 440, y: 1700, yon: 1 },
  { x: 660, y: 1880, yon: -1 },
  { x: 470, y: 2140, yon: 1 },
  { x: 700, y: 2440, yon: -1 },
  { x: 872, y: 2470, yon: -1 },
  { x: 440, y: 2650, yon: 1 },
];

/** Tavşanın bir gidiş-dönüşte kapladığı alan (görsel pikseli; ölçüler CSS ile aynı). */
const TAVSAN_YOLU = { gidis: 9.2, genislik: 8, yukseklik: 6.4, sicrama: 1.5 }; // cqw

type Kutu = { sol: number; ust: number; sag: number; alt: number };

function tavsanKutusu(cep: TavsanCebi, olcek: number): Kutu {
  const cqw = (GW / 100) * olcek;
  const yari = (TAVSAN_YOLU.genislik / 2) * cqw;
  const uc = cep.x * olcek + cep.yon * TAVSAN_YOLU.gidis * cqw;
  const x = cep.x * olcek;
  return {
    sol: Math.min(x, uc) - yari,
    sag: Math.max(x, uc) + yari,
    ust: cep.y * olcek - (TAVSAN_YOLU.yukseklik + TAVSAN_YOLU.sicrama) * cqw,
    alt: cep.y * olcek + 4,
  };
}

const kesisir = (a: Kutu, b: Kutu, pay = 8) =>
  a.sol < b.sag + pay && a.sag > b.sol - pay && a.ust < b.alt + pay && a.alt > b.ust - pay;

/** Canlıların altında kalmaması gereken öğeler: duraklar ve `data-cayir-engel`. */
const ENGEL_SECICISI = "[data-kitap], [data-cayir-engel]";

type Kelebek = { x: number; y: number; ucus: "a" | "b" | "c"; renk: "altin" | "krem" | "mercan" };

/** Kelebekler kenardaki çiçek öbeklerinin çevresinde dolanır. */
const KELEBEKLER: Kelebek[] = [
  { x: 214, y: 236, ucus: "a", renk: "altin" },
  { x: 952, y: 742, ucus: "b", renk: "krem" },
  { x: 150, y: 1205, ucus: "c", renk: "mercan" },
  { x: 968, y: 2392, ucus: "a", renk: "altin" },
];

/** Rüzgâr dalgalarının geçtiği satırlar (görsel pikseli). */
const RUZGARLAR = [620, 1900];

const UCUS_SINIFI = { a: styles.ucusA, b: styles.ucusB, c: styles.ucusC };
const RENK_SINIFI = {
  altin: styles.kelebekAltin,
  krem: styles.kelebekKrem,
  mercan: styles.kelebekMercan,
};

type CicekRengi = "sari" | "beyaz" | "pembe" | "kirmizi" | "mor";
type CicekTuru = "a" | "b" | "c";

/**
 * Sallanan çiçek öbekleri (görsel pikseli, öbeğin dibi). Boyalı görseldeki
 * öbeklerle karışmasın diye boş çimene, kenar şeritlerine konur.
 */
const CICEK_OBEKLERI: { x: number; y: number; tur: CicekTuru }[] = [
  { x: 262, y: 335, tur: "a" },
  { x: 255, y: 820, tur: "b" },
  { x: 250, y: 1040, tur: "c" },
  { x: 300, y: 1610, tur: "a" },
  { x: 885, y: 1900, tur: "b" },
  { x: 875, y: 2290, tur: "c" },
  { x: 900, y: 2640, tur: "a" },
];

/** Her öbek türünde üç çiçek: sapın dipteki yeri, başın yeri, boyu ve rengi. */
const CICEK_TURLERI: Record<CicekTuru, { x: number; tx: number; ty: number; r: number; renk: CicekRengi }[]> = {
  a: [
    { x: 30, tx: 24, ty: 30, r: 6.5, renk: "sari" },
    { x: 40, tx: 43, ty: 20, r: 7, renk: "beyaz" },
    { x: 50, tx: 58, ty: 34, r: 6, renk: "pembe" },
  ],
  b: [
    { x: 32, tx: 27, ty: 26, r: 6.5, renk: "mor" },
    { x: 42, tx: 42, ty: 36, r: 5.5, renk: "sari" },
    { x: 48, tx: 55, ty: 22, r: 7, renk: "beyaz" },
  ],
  c: [
    { x: 30, tx: 22, ty: 34, r: 6, renk: "kirmizi" },
    { x: 40, tx: 38, ty: 22, r: 7, renk: "sari" },
    { x: 50, tx: 56, ty: 30, r: 6.5, renk: "kirmizi" },
  ],
};

/** Saz (kamış) öbekleri ırmak kıyılarında; görseldeki sazların arasındaki boşluklarda. */
const SAZ_OBEKLERI = [
  { x: 885, y: 935 },
  { x: 1082, y: 1062 },
  { x: 330, y: 2190 },
  { x: 415, y: 2470 },
];

/** Kuş sürüsünün geçtiği satırlar; karolar sırayla birini kullanır. */
const KUS_SERITLERI = [760, 1560, 2300];

/**
 * `yer`: dar ekranda (< 1024 px) görsel kabuğun zeminidir, katman da oraya
 * konur; geniş ekranda görsel rota kartındadır. Yanlış yerdeki kopya çizilmez.
 */
export function CanliCayir({ yer }: { yer: "dar" | "genis" }) {
  const kokRef = useRef<HTMLDivElement>(null);
  const [olcu, setOlcu] = useState({ genislik: 0, yukseklik: 0 });

  useEffect(() => {
    const kok = kokRef.current;
    if (!kok) return;
    const gozlemci = new ResizeObserver(([kayit]) => {
      const { width, height } = kayit.contentRect;
      setOlcu((onceki) =>
        Math.round(onceki.genislik) === Math.round(width) &&
        Math.round(onceki.yukseklik) === Math.round(height)
          ? onceki
          : { genislik: width, yukseklik: height },
      );
    });
    gozlemci.observe(kok);
    return () => gozlemci.disconnect();
  }, []);

  // Durak ve kartların yeri okunur. Rota duraklarını genişliği ölçtükten sonra
  // yerleştirdiği ve kartlar kapanıp açıldığı için kap izlenir; değişiklikler
  // kısa bir beklemeyle tek ölçümde toplanır.
  const [engeller, setEngeller] = useState<Kutu[]>([]);
  useEffect(() => {
    const kok = kokRef.current;
    const kap = kok?.parentElement;
    if (!kok || !kap || olcu.genislik === 0) return;
    let zamanlayici = 0;
    const olc = () => {
      const taban = kok.getBoundingClientRect();
      const yeni = Array.from(kap.querySelectorAll<HTMLElement>(ENGEL_SECICISI), (oge) => {
        const r = oge.getBoundingClientRect();
        return {
          sol: Math.round(r.left - taban.left),
          sag: Math.round(r.right - taban.left),
          ust: Math.round(r.top - taban.top),
          alt: Math.round(r.bottom - taban.top),
        };
      });
      setEngeller((onceki) => (JSON.stringify(onceki) === JSON.stringify(yeni) ? onceki : yeni));
    };
    const planla = () => {
      window.clearTimeout(zamanlayici);
      zamanlayici = window.setTimeout(olc, 150);
    };
    planla();
    const gozlemci = new MutationObserver(planla);
    gozlemci.observe(kap, { subtree: true, childList: true, attributeFilter: ["style"] });
    return () => {
      window.clearTimeout(zamanlayici);
      gozlemci.disconnect();
    };
  }, [olcu]);

  const olcek = olcu.genislik / GW;
  const karoYuksekligi = GH * olcek;
  const karoSayisi = karoYuksekligi > 0 ? Math.ceil(olcu.yukseklik / karoYuksekligi) : 0;

  return (
    <div
      ref={kokRef}
      className={`${styles.canliCayir} ${yer === "dar" ? styles.yalnizDar : styles.yalnizGenis}`}
      aria-hidden="true"
    >
      {Array.from({ length: karoSayisi }, (_, sira) => {
        const ust = sira * karoYuksekligi;
        const bosCepler = TAVSAN_CEPLERI.filter((cep) => {
          const kutu = tavsanKutusu(cep, olcek);
          const yerinde = { ...kutu, ust: kutu.ust + ust, alt: kutu.alt + ust };
          return yerinde.alt <= olcu.yukseklik && !engeller.some((e) => kesisir(yerinde, e));
        });
        const cep = bosCepler.length ? bosCepler[(sira * 5) % bosCepler.length] : null;
        return (
          <CayirKarosu
            key={sira}
            sira={sira}
            ust={ust}
            yukseklik={karoYuksekligi}
            tavsanCebi={cep}
          />
        );
      })}
    </div>
  );
}

function CayirKarosu({
  sira,
  ust,
  yukseklik,
  tavsanCebi: cep,
}: {
  sira: number;
  ust: number;
  yukseklik: number;
  tavsanCebi: TavsanCebi | null;
}) {
  const karoRef = useRef<HTMLDivElement>(null);
  const [gorunur, setGorunur] = useState(false);

  // Ekran dışındaki karonun hareketi durur (tablette boşuna boyama olmasın).
  useEffect(() => {
    const karo = karoRef.current;
    if (!karo) return;
    const gozlemci = new IntersectionObserver(([kayit]) => setGorunur(kayit.isIntersecting), {
      rootMargin: "120px 0px",
    });
    gozlemci.observe(karo);
    return () => gozlemci.disconnect();
  }, []);

  // Karolar aynı anda kıpırdamasın: her karonun saati biraz kaydırılır.
  const kayma = (sira * 13) % 40;

  return (
    <div
      ref={karoRef}
      className={styles.karo}
      data-gorunur={gorunur ? "1" : "0"}
      style={{ top: ust, height: yukseklik, "--kayma": `-${kayma}s` } as CSSProperties}
    >
      {CAYIR_IRMAKLARI.map((irmak) => (
        <IrmakSuyu key={irmak.ad} irmak={irmak} kimlik={`cayir-su-${sira}-${irmak.ad}`} />
      ))}

      {RUZGARLAR.map((y, i) => (
        <span
          key={y}
          className={styles.ruzgar}
          style={{ top: yuzde(y, GH), animationDelay: `calc(var(--kayma) - ${i * 11}s)` }}
        />
      ))}

      {CICEK_OBEKLERI.map((obek, i) => (
        <span key={`cicek-${i}`} className={styles.cicekObegi} style={konum(obek.x, obek.y)}>
          <CicekObegi tur={obek.tur} sira={i} />
        </span>
      ))}

      {SAZ_OBEKLERI.map((saz, i) => (
        <span key={`saz-${i}`} className={styles.sazObegi} style={konum(saz.x, saz.y)}>
          <SazObegi sira={i} />
        </span>
      ))}

      {KELEBEKLER.map((kelebek, i) => (
        <span
          key={i}
          className={`${styles.kelebekYeri} ${UCUS_SINIFI[kelebek.ucus]}`}
          style={{ ...konum(kelebek.x, kelebek.y), animationDelay: `calc(var(--kayma) - ${i * 7}s)` }}
        >
          <KelebekCizimi renk={RENK_SINIFI[kelebek.renk]} />
        </span>
      ))}

      {cep ? (
        <span
          key={`${cep.x}-${cep.y}`}
          className={`${styles.tavsanYeri} ${cep.yon === -1 ? styles.tavsanSola : ""}`}
          style={konum(cep.x, cep.y)}
        >
          <span className={styles.tavsan}>
            <TavsanCizimi />
          </span>
        </span>
      ) : null}

      <span
        className={styles.kusSurusu}
        style={{ top: yuzde(KUS_SERITLERI[sira % KUS_SERITLERI.length], GH) }}
      >
        {KUS_DIZILISI.map(([x, y], i) => (
          <span key={i} className={styles.kusYeri} style={{ left: `${x}cqw`, top: `${y}cqw` }}>
            <span className={styles.kusGolgesi} />
            <KusCizimi gecikme={i * 0.13} />
          </span>
        ))}
      </span>
    </div>
  );
}

function IrmakSuyu({
  irmak,
  kimlik,
}: {
  irmak: (typeof CAYIR_IRMAKLARI)[number];
  kimlik: string;
}) {
  const { kutu } = irmak;
  return (
    <svg
      className={styles.su}
      style={{
        left: yuzde(kutu.x, GW),
        top: yuzde(kutu.y, GH),
        width: yuzde(kutu.g, GW),
        height: yuzde(kutu.h, GH),
      }}
      viewBox={`${kutu.x} ${kutu.y} ${kutu.g} ${kutu.h}`}
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id={kimlik}>
          <path d={irmak.su} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${kimlik})`}>
        {irmak.akislar.map((d, i) => (
          <path key={i} d={d} className={`${styles.akis} ${styles[`akis${i + 1}`]}`} />
        ))}
        {irmak.parilti.map(([x, y], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={9}
            ry={3.5}
            className={styles.kopuk}
            style={{ animationDelay: `calc(var(--kayma) - ${i * 1.3}s)` }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Yukarıdan görülen kelebek: iki kanat çifti gövdenin iki yanında çırpar. */
function KelebekCizimi({ renk }: { renk: string }) {
  return (
    <span className={`${styles.kelebek} ${renk}`}>
      <svg viewBox="-20 -16 40 32" width="100%" height="100%">
        <g className={styles.kanatSol}>
          <path d="M-1 -2 C-8 -15 -19 -12 -17 -3 C-16 2 -8 2 -1 0 Z" className={styles.kanatUst} />
          <path d="M-1 1 C-7 2 -14 7 -11 12 C-8 15 -3 9 -1 3 Z" className={styles.kanatAlt} />
          <circle cx={-10} cy={-6} r={2.2} className={styles.kanatBenek} />
        </g>
        <g className={styles.kanatSag}>
          <path d="M1 -2 C8 -15 19 -12 17 -3 C16 2 8 2 1 0 Z" className={styles.kanatUst} />
          <path d="M1 1 C7 2 14 7 11 12 C8 15 3 9 1 3 Z" className={styles.kanatAlt} />
          <circle cx={10} cy={-6} r={2.2} className={styles.kanatBenek} />
        </g>
        <ellipse cx={0} cy={1} rx={1.4} ry={7} className={styles.kelebekGovde} />
        <path d="M-0.5 -5 Q-3 -10 -5 -11 M0.5 -5 Q3 -10 5 -11" className={styles.kelebekAnten} />
      </svg>
    </span>
  );
}

/** Rüzgârda her çiçek kendi dibinden, kendi hızıyla salınır. */
function CicekObegi({ tur, sira }: { tur: CicekTuru; sira: number }) {
  return (
    <svg viewBox="0 0 80 70" width="100%" height="100%">
      <g
        className={styles.salinim}
        style={{ transformOrigin: "40px 68px", "--aci": "2deg", "--sure": "5.2s", animationDelay: `-${sira * 0.9}s` } as CSSProperties}
      >
        <path d="M33 68C29 58 23 51 15 48C23 49 31 56 37 68Z" className={styles.yaprakKoyu} />
        <path d="M47 68C51 57 57 51 66 49C58 51 51 58 44 68Z" className={styles.yaprakKoyu} />
        <path d="M38 68C35 60 34 54 36 47C39 54 41 61 42 68Z" className={styles.yaprak} />
      </g>
      {CICEK_TURLERI[tur].map((cicek, i) => (
        <g
          key={i}
          className={styles.salinim}
          style={
            {
              transformOrigin: `${cicek.x}px 68px`,
              "--aci": `${4 + i}deg`,
              "--sure": `${3.2 + ((sira + i) % 3) * 0.6}s`,
              animationDelay: `-${(sira * 1.3 + i * 0.8) % 4}s`,
            } as CSSProperties
          }
        >
          <path
            d={`M${cicek.x} 68Q${(cicek.x + cicek.tx) / 2 + 2} ${(68 + cicek.ty) / 2} ${cicek.tx} ${cicek.ty}`}
            className={styles.sap}
          />
          <path
            d={`M${(cicek.x + cicek.tx) / 2 + 1} ${(68 + cicek.ty) / 2 + 6}q-7 -1 -9 -7q7 0 9 5z`}
            className={styles.yaprak}
          />
          <CicekBasi x={cicek.tx} y={cicek.ty} r={cicek.r} renk={cicek.renk} />
        </g>
      ))}
    </svg>
  );
}

const TACYAPRAK_SINIFI: Record<CicekRengi, string> = {
  sari: styles.tacSari,
  beyaz: styles.tacBeyaz,
  pembe: styles.tacPembe,
  kirmizi: styles.tacKirmizi,
  mor: styles.tacMor,
};

function CicekBasi({ x, y, r, renk }: { x: number; y: number; r: number; renk: CicekRengi }) {
  return (
    <g className={TACYAPRAK_SINIFI[renk]}>
      {[0, 1, 2, 3, 4].map((k) => {
        const aci = (k * 72 - 90) * (Math.PI / 180);
        return (
          <circle
            key={k}
            cx={+(x + Math.cos(aci) * r * 0.72).toFixed(2)}
            cy={+(y + Math.sin(aci) * r * 0.72).toFixed(2)}
            r={+(r * 0.56).toFixed(2)}
            className={styles.tacyaprak}
          />
        );
      })}
      <circle cx={x} cy={y} r={+(r * 0.36).toFixed(2)} className={styles.cicekGobegi} />
    </g>
  );
}

/** Kıyıdaki saz öbeği: uzun yapraklar ve kahverengi püsküllü saplar. */
function SazObegi({ sira }: { sira: number }) {
  const saplar = [
    { x: 22, tx: 15, ty: 16, h: 20 },
    { x: 27, tx: 29, ty: 6, h: 22 },
    { x: 31, tx: 39, ty: 26, h: 18 },
  ];
  return (
    <svg viewBox="0 0 50 100" width="100%" height="100%">
      <g
        className={styles.salinim}
        style={{ transformOrigin: "25px 98px", "--aci": "2.5deg", "--sure": "4.8s", animationDelay: `-${sira * 1.1}s` } as CSSProperties}
      >
        <path d="M22 98C17 80 10 62 3 50C13 62 21 78 27 98Z" className={styles.yaprakKoyu} />
        <path d="M29 98C33 78 40 62 48 54C41 66 35 80 33 98Z" className={styles.yaprakKoyu} />
      </g>
      {saplar.map((sap, i) => (
        <g
          key={i}
          className={styles.salinim}
          style={
            {
              transformOrigin: `${sap.x}px 98px`,
              "--aci": `${3 + i * 0.8}deg`,
              "--sure": `${3.8 + ((sira + i) % 3) * 0.5}s`,
              animationDelay: `-${(sira * 1.7 + i * 1.1) % 4}s`,
            } as CSSProperties
          }
        >
          <path d={`M${sap.x} 98Q${(sap.x + sap.tx) / 2} ${(98 + sap.ty) / 2} ${sap.tx} ${sap.ty}`} className={styles.sazSapi} />
          <rect x={sap.tx - 4} y={sap.ty + 2} width={8} height={sap.h} rx={4} className={styles.sazBasi} />
          <rect x={sap.tx - 2.2} y={sap.ty + 5} width={2} height={sap.h - 7} rx={1} className={styles.sazIsigi} />
        </g>
      ))}
      <path d="M25 98C24 80 22 60 18 40C25 58 28 78 30 98Z" className={styles.yaprak} />
    </svg>
  );
}

/** Sürüdeki kuşların birbirine göre yeri (cqw): gevşek bir V. */
const KUS_DIZILISI: [number, number][] = [
  [0, 0],
  [-3.6, -2.8],
  [-3.2, 3.2],
  [-7, 5.4],
];

/** Yukarıdan görülen, sağa uçan küçük beyaz kuş. */
function KusCizimi({ gecikme }: { gecikme: number }) {
  return (
    <svg viewBox="-16 -16 32 32" width="100%" height="100%" className={styles.kus}>
      <g className={styles.kanatUstKus} style={{ animationDelay: `-${gecikme}s` }}>
        <path d="M-1 -1C-4 -7 -6 -12 -11 -15C-4 -14 2 -8 4 -1Z" className={styles.kusKanat} />
      </g>
      <g className={styles.kanatAltKus} style={{ animationDelay: `-${gecikme}s` }}>
        <path d="M-1 1C-4 7 -6 12 -11 15C-4 14 2 8 4 1Z" className={styles.kusKanat} />
      </g>
      <path d="M-9 0L-14 -3.5L-13 0L-14 3.5Z" className={styles.kusGovde} />
      <ellipse cx={-1} cy={0} rx={8} ry={2.8} className={styles.kusGovde} />
      <circle cx={7} cy={0} r={2.4} className={styles.kusGovde} />
      <path d="M9 -0.8L11.6 0L9 0.8Z" className={styles.kusGaga} />
    </svg>
  );
}

/** Yandan görülen, sağa bakan tavşan. Baş ayrı grup: otlarken eğilir. */
function TavsanCizimi() {
  return (
    <svg viewBox="0 0 60 48" width="100%" height="100%">
      <ellipse cx={29} cy={45.5} rx={19} ry={2.6} className={styles.tavsanGolge} />
      <circle cx={11.5} cy={30} r={5} className={styles.tavsanKuyruk} />
      <ellipse cx={26} cy={33} rx={15} ry={11} className={styles.tavsanGovde} />
      <ellipse cx={20} cy={37} rx={9} ry={7.5} className={styles.tavsanBacak} />
      <ellipse cx={18} cy={44} rx={6} ry={2} className={styles.tavsanAyak} />
      <ellipse cx={37.5} cy={43.5} rx={3.6} ry={2} className={styles.tavsanAyak} />
      <g className={styles.tavsanBas}>
        <g className={styles.tavsanKulaklar}>
          <ellipse cx={36} cy={9} rx={3.6} ry={10} transform="rotate(-18 36 9)" className={styles.tavsanGovde} />
          <ellipse cx={36} cy={9.5} rx={1.7} ry={7} transform="rotate(-18 36 9.5)" className={styles.tavsanKulakIci} />
          <ellipse cx={42} cy={8} rx={3.6} ry={10} transform="rotate(8 42 8)" className={styles.tavsanGovde} />
          <ellipse cx={42} cy={8.5} rx={1.7} ry={7} transform="rotate(8 42 8.5)" className={styles.tavsanKulakIci} />
        </g>
        <circle cx={42} cy={23} r={9.5} className={styles.tavsanGovde} />
        <ellipse cx={47} cy={26.5} rx={4.5} ry={3.5} className={styles.tavsanYanak} />
        <circle cx={45.5} cy={20.5} r={1.8} className={styles.tavsanGoz} />
        <circle cx={46.1} cy={19.9} r={0.6} className={styles.tavsanGozIsigi} />
        <circle cx={51.2} cy={24.5} r={1.2} className={styles.tavsanBurun} />
      </g>
    </svg>
  );
}
