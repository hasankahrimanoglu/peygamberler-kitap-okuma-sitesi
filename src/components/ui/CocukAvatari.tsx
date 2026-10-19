"use client";

import { useEffect, useState } from "react";
import { OdulIkonu } from "./OdulIkonu";
import { YedekliGorsel } from "./YedekliGorsel";
import { YEDEK } from "../../lib/varlikYollari";
import { dogrudanFotografAdresi, fotografAdresiniCoz } from "../../lib/profilFotografi";

type CocukAvatariProps = {
  /** Hazır avatar anahtarı — `profiles.avatar_tipi` (avatar-1 … avatar-10) */
  avatarTipi: string;
  /**
   * Veli yüklediyse fotoğraf — `profiles.avatar_url` (kapalı kovadaki yol).
   * Seçim önizlemesindeki `blob:` adresi de olduğu gibi gösterilir.
   */
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
 *
 * Faz 7 (3.11): fotoğraf kovası kapalıdır; adres süreli imzayla üretilir.
 * İmza gelene kadar hazır avatar görünür.
 */
export function CocukAvatari({
  avatarTipi,
  fotografUrl,
  boyut = 64,
  alt = "",
  className = "",
}: CocukAvatariProps) {
  const [imzali, setImzali] = useState<{ kaynak: string; adres: string | null } | null>(null);
  const dogrudan = dogrudanFotografAdresi(fotografUrl);

  useEffect(() => {
    if (!fotografUrl || dogrudan) return undefined;
    let iptal = false;
    void fotografAdresiniCoz(fotografUrl).then((adres) => {
      if (!iptal) setImzali({ kaynak: fotografUrl, adres });
    });
    return () => {
      iptal = true;
    };
  }, [fotografUrl, dogrudan]);

  const adres = dogrudan ?? (imzali && imzali.kaynak === fotografUrl ? imzali.adres : null);

  if (!adres) {
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
      src={adres}
      yedekSrc={YEDEK.avatar}
      alt={alt}
      width={boyut}
      height={boyut}
      className={`select-none rounded-full object-cover ${className}`}
    />
  );
}
