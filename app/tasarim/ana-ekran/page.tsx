"use client";

import { useEffect, useMemo, useState } from "react";
import { unvanBilgisi, yolculukKitaplari } from "../../../src/lib/child/yolculuk";
import type { DeriveBookRow, DeriveProgressRow } from "../../../src/lib/derive";
import { AnaEkran } from "../../../src/components/cocuk/AnaEkran";
import { CocukKabugu } from "../../../src/components/cocuk/CocukKabugu";

/**
 * Ana ekran önizlemesi — giriş gerektirmez, örnek veriyle çalışır.
 * Gerçek ekran `/map`'tir; burası tasarım kontrolü içindir (PROJE-MODELI 3.6:
 * önizleme rotaları ürün rotalarından ayrı kalır).
 *
 *   /tasarim/ana-ekran              → Âdem ve Şît bitti, İdrîs 1/4
 *   /tasarim/ana-ekran?durum=yeni   → yeni başlayan çocuk, yeni kitap duyurusu
 */
const KITAPLAR: DeriveBookRow[] = [
  { id: "ornek-adem", isim: "Hz. Âdem", toplam_bolum: 8, sira: 1 },
  { id: "ornek-sit", isim: "Hz. Şît", toplam_bolum: 4, sira: 2 },
  { id: "ornek-idris", isim: "Hz. İdrîs", toplam_bolum: 4, sira: 3 },
];

const ILERLEME: DeriveProgressRow[] = [
  { book_id: "ornek-adem", tamamlanan_bolum_sayisi: 8, yuzde: 100, bitti_mi: true, updated_at: "2026-08-20T10:00:00Z" },
  { book_id: "ornek-sit", tamamlanan_bolum_sayisi: 4, yuzde: 100, bitti_mi: true, updated_at: "2026-09-20T10:00:00Z" },
  { book_id: "ornek-idris", tamamlanan_bolum_sayisi: 1, yuzde: 25, bitti_mi: false, updated_at: "2026-10-10T10:00:00Z" },
];

export default function AnaEkranOnizleme() {
  const [yeniCocuk, setYeniCocuk] = useState(false);

  useEffect(() => {
    queueMicrotask(() =>
      setYeniCocuk(new URLSearchParams(window.location.search).get("durum") === "yeni"),
    );
  }, []);

  const kitaplar = useMemo(
    () =>
      yeniCocuk
        ? yolculukKitaplari(KITAPLAR, [], Date.parse("2026-09-12T10:00:00Z"))
        : yolculukKitaplari(KITAPLAR, ILERLEME),
    [yeniCocuk],
  );
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const unvan = unvanBilgisi(biten);

  return (
    <CocukKabugu
      ekranaSabit
      rotaArkaplani
      profil={{ ad: "Elif", avatarAnahtari: "avatar-3" }}
      ozet={{
        unvan: unvan.unvan,
        sonrakiUnvan: unvan.sonraki,
        rozet: kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0),
        madalya: biten,
      }}
    >
      <AnaEkran
        key={yeniCocuk ? "yeni" : "ornek"}
        profilId={yeniCocuk ? "onizleme-yeni" : "onizleme"}
        kitaplar={kitaplar}
        yukleniyor={false}
        uyari={null}
      />
    </CocukKabugu>
  );
}
