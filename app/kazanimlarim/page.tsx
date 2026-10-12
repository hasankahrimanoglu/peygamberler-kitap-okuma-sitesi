"use client";

import { useMemo } from "react";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import { yolculukKitaplari } from "../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../src/components/atlas/KesifSayfaKabugu";
import { OdullerimEkrani } from "../../src/components/cocuk/OdullerimEkrani";

/**
 * Ödüllerim (eski adıyla Kazanımlarım — PROJE-MODELI 3.10.4). Veri burada
 * çekilir, görünüm `OdullerimEkrani`'ndadır (girişsiz önizleme:
 * `/tasarim/oduller`). Rozet, madalya ve unvan yalnız yayındaki kitaplardan ve
 * biten kitap sayısından türetilir (Bölüm 2).
 */
export default function OdullerimSayfasi() {
  const { isLoading, child, books, progress } = useSelectedChild();
  const kitaplar = useMemo(() => yolculukKitaplari(books, progress), [books, progress]);
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);
  const profil = {
    ad: child?.name ?? "Gezgin",
    avatarAnahtari: child?.avatarType ?? "avatar-1",
    avatarFotografi: child?.avatarUrl,
  };

  return (
    <KesifSayfaKabugu profil={profil} toplamRozet={rozet} tamamlananKitap={biten} yukleniyor={isLoading}>
      <OdullerimEkrani profil={profil} kitaplar={kitaplar} yukleniyor={isLoading} />
    </KesifSayfaKabugu>
  );
}
