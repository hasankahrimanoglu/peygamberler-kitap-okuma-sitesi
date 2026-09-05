"use client";

import { OdulIkonu } from "./OdulIkonu";
import { YedekliGorsel } from "./YedekliGorsel";
import { YEDEK } from "../../lib/varlikYollari";

type CocukAvatariProps = {
  /** Hazır avatar anahtarı — `profiles.avatar_tipi` (avatar-1 … avatar-10) */
  avatarTipi: string;
  /** Veli yüklediyse fotoğrafın public URL'i — `profiles.avatar_url` */
  fotografUrl?: string | null;
  boyut?: number;
  alt?: string;
  className?: string;
};

/**
 * Çocuğun ekrandaki yüzü: fotoğraf varsa fotoğraf, yoksa hazır avatar
 * (KARAR 8 Ağu 2026, Hasan — veli panelinden fotoğraf yükleme).
 *
 * İki kaynak birbirini silmez: veli fotoğrafı kaldırdığında `avatar_url`
 * boşalır ve eskiden seçtiği avatar geri gelir. Fotoğraf kare kırpılmış
 * yüklendiği için burada `object-cover` ile daireye oturtulur; hazır avatarlar
 * `OdulIkonu`nun kendi çizim kuralında kalır (tek yerden yönetilsin diye
 * kopyalanmadı).
 */
export function CocukAvatari({
  avatarTipi,
  fotografUrl,
  boyut = 64,
  alt = "",
  className = "",
}: CocukAvatariProps) {
  if (!fotografUrl) {
    return (
      <OdulIkonu
        tip="avatar"
        anahtar={avatarTipi}
        boyut={boyut}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <YedekliGorsel
      src={fotografUrl}
      yedekSrc={YEDEK.avatar}
      alt={alt}
      width={boyut}
      height={boyut}
      className={`select-none rounded-full object-cover ${className}`}
    />
  );
}
