"use client";

import { YedekliGorsel } from "./YedekliGorsel";
import {
  avatarGorseli,
  madalyaGorseliAnahtardan,
  rozetGorseliAnahtardan,
  unvanGorseli,
  YEDEK,
} from "../../lib/varlikYollari";

type OdulTipi = "rozet" | "madalya" | "unvan" | "avatar";

type OdulIkonuProps = {
  tip: OdulTipi;
  /** Dosya anahtarı — rozet: "hz-adem/bolum-1", madalya: "hz-adem", unvan: "bilge-yolcu", avatar: "avatar-3" */
  anahtar: string;
  /** Kazanılmamış ödüller gri tonda gösterilir (ayrı görsel gerekmez) */
  kazanildi?: boolean;
  boyut?: number;
  alt?: string;
  className?: string;
};

// Yollar tek kaynaktan gelir: src/lib/varlikYollari.ts (PROJE-MODELI.md 6.1).
// Gerçek görsel yoksa otomatik olarak tipin yedeğine düşer; Hasan görseli aynı
// adla klasöre atınca kod değişmeden gerçek görsel görünür.
const yolUreticileri: Record<OdulTipi, (anahtar: string) => string> = {
  rozet: rozetGorseliAnahtardan,
  madalya: madalyaGorseliAnahtardan,
  unvan: unvanGorseli,
  avatar: avatarGorseli,
};

const placeholderlar: Record<OdulTipi, string> = {
  rozet: YEDEK.rozet,
  madalya: YEDEK.madalya,
  unvan: YEDEK.unvan,
  avatar: YEDEK.avatar,
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
      src={yolUreticileri[tip](anahtar)}
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
