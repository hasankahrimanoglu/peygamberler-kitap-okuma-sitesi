"use client";

import { useEffect, useState } from "react";
import { HataEkrani, type HataDunyasi } from "../../../src/components/ui";

/**
 * Hata ekranı önizlemesi — giriş gerektirmez. Gerçek ekran `app/error.tsx`'tir;
 * dünya orada hatanın çıktığı adresten seçilir.
 *   /tasarim/hata             → çocuk dünyası (gece zemini, "Haritaya Dön")
 *   /tasarim/hata?dunya=veli  → veli dünyası (krem zemin, iletişim bağlantısı, hata kodu)
 *   /tasarim/hata?gercek=1    → sayfa bilerek hata verir; `app/error.tsx` devreye girer
 */
export default function HataOnizleme() {
  const [ayar, setAyar] = useState<{ dunya: HataDunyasi; gercek: boolean } | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      setAyar({
        dunya: parametreler.get("dunya") === "veli" ? "veli" : "cocuk",
        gercek: parametreler.get("gercek") === "1",
      });
    });
  }, []);

  if (!ayar) return null;
  if (ayar.gercek) throw new Error("Önizleme: /tasarim/hata?gercek=1 bilerek hata veriyor.");

  const donus =
    ayar.dunya === "cocuk"
      ? { adres: "/tasarim/ana-ekran", etiket: "Haritaya Dön" }
      : { adres: "/tasarim/veli-panel", etiket: "Veli Paneline Dön" };

  return (
    <HataEkrani
      dunya={ayar.dunya}
      donus={donus}
      tekrarDene={() => window.location.reload()}
      hataKodu={ayar.dunya === "veli" ? "1234567890" : undefined}
    />
  );
}
