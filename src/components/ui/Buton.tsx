import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButonVaryant = "eylem" | "altin" | "ikincil" | "cerceve" | "tehlike";
type ButonBoyut = "normal" | "buyuk" | "kucuk";

type ButonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  varyant?: ButonVaryant;
  boyut?: ButonBoyut;
  tamGenislik?: boolean;
  children: ReactNode;
};

// PROJE-MODELI.md 3.3 — buton anlamları sabittir:
// yeşil: devam/onay, altın: başla/ödül/final, ikincil: yüzey işlemleri,
// çerçeve: geri/iptal, kırmızı: silme.
const varyantSiniflari: Record<ButonVaryant, string> = {
  eylem:
    "bg-eylem text-eylem-metin hover:bg-eylem-koyu shadow-sm",
  altin:
    "bg-altin-400 text-gece-950 hover:bg-altin-500 shadow-sm",
  ikincil:
    "bg-yuzey-2 text-murekkep hover:brightness-95 border border-cizgi",
  cerceve:
    "bg-transparent text-murekkep border border-cizgi hover:bg-yuzey-2",
  tehlike:
    "bg-tehlike text-white hover:brightness-90 shadow-sm",
};

const boyutSiniflari: Record<ButonBoyut, string> = {
  kucuk: "h-10 px-4 text-sm",
  normal: "h-12 px-6 text-base",
  buyuk: "h-14 px-8 text-lg",
};

export function Buton({
  varyant = "eylem",
  boyut = "normal",
  tamGenislik = false,
  className = "",
  children,
  ...props
}: ButonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-buton font-baslik font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vurgu disabled:cursor-not-allowed disabled:opacity-50 ${varyantSiniflari[varyant]} ${boyutSiniflari[boyut]} ${tamGenislik ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
