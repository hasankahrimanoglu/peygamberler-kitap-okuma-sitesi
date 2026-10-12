"use client";

import { useEffect, useState } from "react";
import { yolculukKitaplari } from "../../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../../src/components/atlas/KesifSayfaKabugu";
import { OdullerimEkrani } from "../../../src/components/cocuk/OdullerimEkrani";
import { bosMu, ORNEK_ILERLEME, ORNEK_KITAPLAR, ORNEK_PROFIL } from "../ornekVeri";

/**
 * Ödüllerim önizlemesi — giriş gerektirmez, örnek veriyle çalışır. Gerçek ekran
 * `/kazanimlarim`'dır. `?durum=bos`: hiç ilerlemesi olmayan çocuk.
 */
export default function OdullerOnizleme() {
  const [bos, setBos] = useState(false);
  useEffect(() => queueMicrotask(() => setBos(bosMu())), []);

  const kitaplar = yolculukKitaplari(ORNEK_KITAPLAR, bos ? [] : ORNEK_ILERLEME);
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);

  return (
    <KesifSayfaKabugu profil={ORNEK_PROFIL} toplamRozet={rozet} tamamlananKitap={biten}>
      <OdullerimEkrani profil={ORNEK_PROFIL} kitaplar={kitaplar} yukleniyor={false} />
    </KesifSayfaKabugu>
  );
}
