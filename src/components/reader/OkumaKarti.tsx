import type { ReactNode } from "react";
import { Ikon } from "../ui";

type OkumaKartiProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Krem okuma yüzeyi (PROJE-MODELI.md 3.1: uzun metin daima açık zeminde).
 * Gece temasının ortasında `tema-veli` sınıfıyla kendi açık paletine döner;
 * böylece kart içindeki tüm tokenlar (murekkep, eylem, vurgu) krem dünyaya uyar.
 */
export function OkumaKarti({ children, className = "" }: OkumaKartiProps) {
  return (
    <div className="tema-veli relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-kart border border-altin-400/50 bg-zemin text-murekkep shadow-kart-gece">
      <div
        className={`flex min-h-0 flex-1 flex-col p-5 sm:p-7 lg:p-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

type BolumBasligiProps = {
  /** Ör. "1. BÖLÜM" */
  eyebrow: string;
  /** Yalın bölüm adı */
  ad: string;
};

/**
 * Okuma sayfalarının üst ortasındaki bölüm kimliği.
 * Bölüm adı geniş ekranda tek satırda kalır (Hasan kararı, 12 Tem 2026);
 * mobil ve tablette genişliğe göre alt satıra inebilir.
 */
export function BolumBasligi({ eyebrow, ad }: BolumBasligiProps) {
  return (
    <div className="flex w-full flex-col items-center gap-0.5 text-center">
      <p className="flex items-center gap-2 font-baslik text-[11px] font-semibold uppercase tracking-[0.24em] text-vurgu sm:text-xs">
        <Ikon ad="yildiz" boyut={11} />
        {eyebrow}
        <Ikon ad="yildiz" boyut={11} />
      </p>
      <h1 className="max-w-full font-baslik text-xl font-bold leading-tight sm:text-2xl lg:truncate lg:whitespace-nowrap">
        {ad}
      </h1>
    </div>
  );
}
