import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { tanitimGorseli, type TanitimGorseli } from "../../lib/varlikYollari";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import styles from "./tanitim.module.css";

/**
 * Bölüm başlığı: küçük üst etiket + edebi başlık + kısa açıklama. Renkler
 * içinde bulunduğu temadan (.tema-cocuk / .tema-veli) gelir. Görünür alana
 * girince üç satır sırayla yükselir.
 */
export function BolumBasligi({
  ust,
  baslik,
  aciklama,
  ortali = false,
  id,
}: {
  ust: string;
  baslik: ReactNode;
  aciklama?: ReactNode;
  ortali?: boolean;
  id?: string;
}) {
  return (
    <SiraliBelir className={ortali ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} aralik={0.1} oran={0.4}>
      <SiraliOge>
        <p className="font-baslik text-sm font-bold uppercase tracking-[0.2em] text-vurgu">{ust}</p>
      </SiraliOge>
      <SiraliOge>
        <h2
          id={id}
          className="mt-3 text-balance font-edebi text-[2rem] font-semibold leading-[1.12] tracking-tight text-murekkep sm:text-[2.6rem] lg:text-[3rem]"
        >
          {baslik}
        </h2>
      </SiraliOge>
      {aciklama ? (
        <SiraliOge>
          <p className="mt-5 text-pretty font-govde text-lg leading-relaxed text-murekkep-soluk sm:text-xl">
            {aciklama}
          </p>
        </SiraliOge>
      ) : null}
    </SiraliBelir>
  );
}

type BaglantiVaryanti = "altin" | "eylem" | "hayalet";

// PROJE-MODELI 3.3 buton anlamları: altın = başla, yeşil = onayla (satın al),
// hayalet = ikincil yol. Yükseklik ≥ 48px (3.5). Üzerine gelince hafifçe
// kalkar (fareli cihazda); altın düğmenin üzerinden ışık geçer.
const varyantSiniflari: Record<BaglantiVaryanti, string> = {
  altin: `${hareket.dugmeAltin} bg-altin-400 text-gece-950 shadow-parlama hover:bg-altin-300`,
  eylem: `${hareket.dugmeYesil} bg-eylem text-eylem-metin shadow-sm hover:bg-eylem-koyu`,
  hayalet: "border border-cizgi text-murekkep hover:bg-[color-mix(in_srgb,var(--murekkep)_8%,transparent)]",
};

export function DugmeBaglanti({
  href,
  varyant = "altin",
  buyuk = false,
  tamGenislik = false,
  parilti = false,
  children,
}: {
  href: string;
  varyant?: BaglantiVaryanti;
  buyuk?: boolean;
  tamGenislik?: boolean;
  /** Köşede ara sıra parlayan küçük yıldız — ana düğmeler için ipucu. */
  parilti?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${hareket.dugme} inline-flex items-center justify-center gap-2 rounded-buton font-baslik font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vurgu ${
        buyuk ? "h-14 px-7 text-lg" : "h-12 px-6 text-base"
      } ${tamGenislik ? "w-full" : ""} ${varyantSiniflari[varyant]}`}
    >
      {children}
      {parilti ? <span className={hareket.dugmeYildizi} aria-hidden="true" /> : null}
    </Link>
  );
}

export function Tablet({
  gorsel,
  alt,
  oncelikli = false,
  acikZemin = false,
  className = "",
}: {
  gorsel: TanitimGorseli;
  alt: string;
  oncelikli?: boolean;
  acikZemin?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.tablet} ${acikZemin ? styles.acikZemin : ""} ${className}`}>
      <div className={styles.tabletEkrani}>
        <Image
          src={tanitimGorseli(gorsel)}
          alt={alt}
          fill
          priority={oncelikli}
          sizes="(min-width: 1024px) 720px, 94vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function Telefon({
  gorsel,
  alt,
  oncelikli = false,
  acikZemin = false,
  className = "",
}: {
  gorsel: TanitimGorseli;
  alt: string;
  oncelikli?: boolean;
  acikZemin?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.telefon} ${acikZemin ? styles.acikZemin : ""} ${className}`}>
      <div className={styles.telefonEkrani}>
        <Image
          src={tanitimGorseli(gorsel)}
          alt={alt}
          fill
          priority={oncelikli}
          sizes="(min-width: 1024px) 260px, 40vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/** Sayfa içi bölümlerin ortak yatay ölçüsü. */
export function Kap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
