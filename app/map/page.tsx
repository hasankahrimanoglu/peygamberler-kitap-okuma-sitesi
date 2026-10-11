"use client";

import { useMemo } from "react";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import { unvanBilgisi, yolculukKitaplari } from "../../src/lib/child/yolculuk";
import { AnaEkran } from "../../src/components/cocuk/AnaEkran";
import { CocukKabugu } from "../../src/components/cocuk/CocukKabugu";

/**
 * Çocuk ana ekranı — tek dikey rota (KARAR 11–12 Eki 2026, PROJE-MODELI 3.10).
 *
 * Rotadaki kitaplar elle yazılmaz: `atlasCatalog.ts`'te yayında olan ve
 * `books.ts`'te içeriği bulunan her kitap katalog sırasıyla gelir. Unvan
 * `profiles.unvan`'dan OKUNMAZ; her zaman biten kitap sayısından türetilir
 * (Bölüm 2). Eski kayıttaki unvan, 2 madalyalı çocuğa 3 kitaplık unvanı
 * gösteriyordu.
 */
export default function MapPage() {
  const { isLoading, child, books, progress } = useSelectedChild();

  const kitaplar = useMemo(() => yolculukKitaplari(books, progress), [books, progress]);
  const bitenKitap = kitaplar.filter((kitap) => kitap.bitti).length;
  const unvan = unvanBilgisi(bitenKitap);
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);

  return (
    <CocukKabugu
      ekranaSabit
      profil={{
        ad: child?.name ?? "Gezgin",
        avatarAnahtari: child?.avatarType ?? "avatar-1",
        avatarFotografi: child?.avatarUrl,
      }}
      ozet={{
        unvan: unvan.unvan,
        sonrakiUnvan: unvan.sonraki,
        rozet,
        madalya: bitenKitap,
      }}
    >
      <AnaEkran profilId={child?.id ?? ""} kitaplar={kitaplar} yukleniyor={isLoading} uyari={null} />
    </CocukKabugu>
  );
}
