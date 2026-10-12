"use client";

import { useEffect, useState } from "react";
import { kelimeDefteri } from "../../../src/lib/derive";
import { yolculukKitaplari } from "../../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../../src/components/atlas/KesifSayfaKabugu";
import { KelimelerimEkrani } from "../../../src/components/cocuk/KelimelerimEkrani";
import { bosMu, ORNEK_ILERLEME, ORNEK_KITAPLAR, ORNEK_PROFIL } from "../ornekVeri";

/**
 * Kelimelerim önizlemesi — giriş gerektirmez, örnek veriyle çalışır. Gerçek
 * ekran `/kelime-defterim`'dir. `?durum=bos`: hiç bölüm okumamış çocuk.
 */
export default function KelimelerOnizleme() {
  const [bos, setBos] = useState(false);
  useEffect(() => queueMicrotask(() => setBos(bosMu())), []);

  const ilerleme = bos ? [] : ORNEK_ILERLEME;
  const kitaplar = yolculukKitaplari(ORNEK_KITAPLAR, ilerleme);
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);

  return (
    <KesifSayfaKabugu profil={ORNEK_PROFIL} toplamRozet={rozet} tamamlananKitap={biten}>
      <KelimelerimEkrani
        kelimeler={kelimeDefteri(ORNEK_KITAPLAR, ilerleme)}
        kitaplar={kitaplar}
        yukleniyor={false}
      />
    </KesifSayfaKabugu>
  );
}
