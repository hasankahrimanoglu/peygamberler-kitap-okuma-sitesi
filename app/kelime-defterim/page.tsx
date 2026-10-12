"use client";

import { useMemo } from "react";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import { kelimeDefteri } from "../../src/lib/derive";
import { yolculukKitaplari } from "../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../src/components/atlas/KesifSayfaKabugu";
import { KelimelerimEkrani } from "../../src/components/cocuk/KelimelerimEkrani";

/**
 * Kelimelerim (eski adıyla Kelime Defterim — PROJE-MODELI 3.10.4). Veri burada
 * çekilir, görünüm `KelimelerimEkrani`'ndadır (girişsiz önizleme:
 * `/tasarim/kelimeler`).
 */
export default function KelimelerimSayfasi() {
  const { isLoading, child, books, progress } = useSelectedChild();
  const kitaplar = useMemo(() => yolculukKitaplari(books, progress), [books, progress]);
  const kelimeler = useMemo(() => kelimeDefteri(books, progress), [books, progress]);
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);

  return (
    <KesifSayfaKabugu
      profil={{
        ad: child?.name ?? "Gezgin",
        avatarAnahtari: child?.avatarType ?? "avatar-1",
        avatarFotografi: child?.avatarUrl,
      }}
      toplamRozet={rozet}
      tamamlananKitap={biten}
      yukleniyor={isLoading}
    >
      <KelimelerimEkrani kelimeler={kelimeler} kitaplar={kitaplar} yukleniyor={isLoading} />
    </KesifSayfaKabugu>
  );
}
