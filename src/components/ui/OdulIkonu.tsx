"use client";

import { YedekliGorsel } from "./YedekliGorsel";

type OdulTipi = "rozet" | "madalya" | "unvan" | "avatar";

type OdulIkonuProps = {
  tip: OdulTipi;
  /** Dosya anahtarı — ör. rozet için "adem-bolum-1" → /rozetler/rozet-adem-bolum-1.png */
  anahtar: string;
  /** Kazanılmamış ödüller gri tonda gösterilir (ayrı görsel gerekmez) */
  kazanildi?: boolean;
  boyut?: number;
  alt?: string;
  className?: string;
};

// PROJE-MODELI.md 6.1 — klasör ve isimlendirme kuralları.
// Gerçek görsel yoksa otomatik olarak tipin placeholder'ına düşer;
// Hasan görseli aynı adla klasöre atınca kod değişmeden gerçek görsel görünür.
const klasorler: Record<OdulTipi, string> = {
  rozet: "/rozetler/rozet-",
  madalya: "/madalyalar/madalya-",
  unvan: "/unvanlar/unvan-",
  avatar: "/avatarlar/avatar-",
};

const placeholderlar: Record<OdulTipi, string> = {
  rozet: "/rozetler/placeholder.svg",
  madalya: "/madalyalar/placeholder.svg",
  unvan: "/unvanlar/placeholder.svg",
  avatar: "/avatarlar/placeholder.svg",
};

export function OdulIkonu({
  tip,
  anahtar,
  kazanildi = true,
  boyut = 64,
  alt,
  className = "",
}: OdulIkonuProps) {
  return (
    <YedekliGorsel
      src={`${klasorler[tip]}${anahtar}.png`}
      yedekSrc={placeholderlar[tip]}
      alt={alt}
      width={boyut}
      height={boyut}
      className={`select-none object-contain ${
        kazanildi ? "" : "opacity-45 grayscale"
      } ${className}`}
    />
  );
}
