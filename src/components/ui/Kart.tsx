import type { HTMLAttributes, ReactNode } from "react";

type KartProps = HTMLAttributes<HTMLDivElement> & {
  /** Altın konturlu vurgu (aktif/ödül kartları) */
  parlak?: boolean;
  /** Kilitli görünüm: düşük kontrast */
  kilitli?: boolean;
  dolgu?: "normal" | "genis" | "yok";
  children: ReactNode;
};

const dolguSiniflari = {
  yok: "",
  normal: "p-4 sm:p-5",
  genis: "p-5 sm:p-8",
};

export function Kart({
  parlak = false,
  kilitli = false,
  dolgu = "normal",
  className = "",
  children,
  ...props
}: KartProps) {
  return (
    <div
      className={`rounded-kart border bg-yuzey text-murekkep ${
        parlak
          ? "border-altin-400/70 shadow-parlama"
          : "border-cizgi shadow-kart"
      } ${kilitli ? "opacity-60 saturate-50" : ""} ${dolguSiniflari[dolgu]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
