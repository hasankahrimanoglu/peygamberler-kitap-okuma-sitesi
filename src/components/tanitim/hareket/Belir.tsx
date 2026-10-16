"use client";

import { m, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/**
 * Kaydırınca belirme — tanıtım sayfasının ortak giriş hareketi.
 *
 * Ritim: yavaş başlayıp yumuşakça oturan eğri (EASE_YUMUSAK), 0,85 sn, kısa
 * mesafe. Bir kez oynar; geri kaydırınca tekrar etmez (göz yormaz).
 * "Hareketi azalt" açıkken Motion yalnız saydamlığı değiştirir.
 */
export const EASE_YUMUSAK = [0.22, 1, 0.36, 1] as const;

export type BelirYonu = "yukari" | "sol" | "sag" | "olcek";

const BASLANGIC: Record<BelirYonu, { x?: number; y?: number; scale?: number }> = {
  yukari: { y: 28 },
  sol: { x: -36 },
  sag: { x: 36 },
  olcek: { scale: 0.92, y: 14 },
};

function degiskenler(yon: BelirYonu, sure: number): Variants {
  return {
    gizli: { opacity: 0, ...BASLANGIC[yon] },
    // Gecikme yalnız verildiğinde yazılır: geçişte `delay` bulunursa üst kabın
    // sıralı (stagger) gecikmesini ezer ve öğeler aynı anda belirir.
    gorunur: (gecikme?: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: gecikme
        ? { duration: sure, ease: EASE_YUMUSAK, delay: gecikme }
        : { duration: sure, ease: EASE_YUMUSAK },
    }),
  };
}

const ETIKETLER = { div: m.div, li: m.li, ul: m.ul, ol: m.ol, span: m.span, dl: m.dl } as const;
type Etiket = keyof typeof ETIKETLER;

type Ortak = {
  children: ReactNode;
  etiket?: Etiket;
  className?: string;
  style?: CSSProperties;
};

/** Tek öğe: görünür alana girince belirir. */
export function Belir({
  children,
  yon = "yukari",
  gecikme,
  sure = 0.85,
  oran = 0.2,
  etiket = "div",
  className,
  style,
}: Ortak & { yon?: BelirYonu; gecikme?: number; sure?: number; oran?: number }) {
  const Bilesen = ETIKETLER[etiket] as typeof m.div;
  return (
    <Bilesen
      className={className}
      style={style}
      initial="gizli"
      whileInView="gorunur"
      viewport={{ once: true, amount: oran }}
      variants={degiskenler(yon, sure)}
      custom={gecikme}
    >
      {children}
    </Bilesen>
  );
}

/** Sıralı kap: içindeki `SiraliOge`'ler arka arkaya belirir. */
export function SiraliBelir({
  children,
  aralik = 0.12,
  baslangic = 0,
  oran = 0.15,
  etiket = "div",
  className,
  style,
}: Ortak & { aralik?: number; baslangic?: number; oran?: number }) {
  const Bilesen = ETIKETLER[etiket] as typeof m.div;
  return (
    <Bilesen
      className={className}
      style={style}
      initial="gizli"
      whileInView="gorunur"
      viewport={{ once: true, amount: oran }}
      variants={{ gizli: {}, gorunur: { transition: { staggerChildren: aralik, delayChildren: baslangic } } }}
    >
      {children}
    </Bilesen>
  );
}

export function SiraliOge({
  children,
  yon = "yukari",
  sure = 0.85,
  etiket = "div",
  className,
  style,
}: Ortak & { yon?: BelirYonu; sure?: number }) {
  const Bilesen = ETIKETLER[etiket] as typeof m.div;
  return (
    <Bilesen className={className} style={style} variants={degiskenler(yon, sure)}>
      {children}
    </Bilesen>
  );
}

/**
 * Soldan sağa çizilen çizgi. Bir `SiraliOge` / `Belir` içinde kullanılır;
 * üst öğe görünür olunca kendiliğinden çizilir.
 */
export function CizgiCizer({ className, sure = 1.1 }: { className: string; sure?: number }) {
  // Gecikme yazılmaz: çizgi, üst öğenin sıralı gecikmesini devralır.
  return (
    <m.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
      variants={{
        gizli: { scaleX: 0 },
        gorunur: { scaleX: 1, transition: { duration: sure, ease: EASE_YUMUSAK } },
      }}
    />
  );
}

/** İlerleme çubuğunun dolgusu: görünür olunca 0'dan hedef orana dolar. */
export function DolanCubuk({ oran, className }: { oran: number; className: string }) {
  return (
    <m.div
      className={`h-full origin-left ${className}`}
      style={{ width: `${oran}%` }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.6, ease: EASE_YUMUSAK, delay: 0.5 }}
    />
  );
}
