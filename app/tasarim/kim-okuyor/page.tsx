"use client";

import { useEffect, useState } from "react";
import { KimOkuyorEkrani, type KimOkuyorCocugu } from "../../../src/components/cocuk/KimOkuyorEkrani";
import type { DogrulamaSonucu } from "../../../src/lib/aileGuvenligi";

/**
 * "Kim okuyor?" önizlemesi — giriş gerektirmez, Supabase'e bağlanmaz. Gerçek
 * ekran `/kim-okuyor`'dur.
 *   ?sifre=1 → aile ayarı açık; Elif'in şifresi 1234, Can'ınki 4321.
 *   ?durum=pin → veli PIN'i henüz belirlenmemiş.
 */
const ORNEK_COCUKLAR: KimOkuyorCocugu[] = [
  { id: "ornek-elif", isim: "Elif", avatarTipi: "avatar-2", fotografUrl: null, sifreVar: true },
  { id: "ornek-can", isim: "Can", avatarTipi: "avatar-6", fotografUrl: null, sifreVar: true },
];
const ORNEK_SIFRELER: Record<string, string> = { "ornek-elif": "1234", "ornek-can": "4321" };

export default function KimOkuyorOnizleme() {
  const [sifreAcik, setSifreAcik] = useState(false);
  const [veliPinGerekli, setVeliPinGerekli] = useState(false);
  const [denemeler, setDenemeler] = useState<Record<string, number>>({});
  const [acilan, setAcilan] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      setSifreAcik(parametreler.get("sifre") === "1");
      setVeliPinGerekli(parametreler.get("durum") === "pin");
    });
  }, []);

  async function dogrula(cocuk: KimOkuyorCocugu, sifre: string): Promise<DogrulamaSonucu> {
    await new Promise((coz) => setTimeout(coz, 250));
    if (sifre === ORNEK_SIFRELER[cocuk.id]) return { durum: "dogru" };
    const sayi = (denemeler[cocuk.id] ?? 0) + 1;
    setDenemeler((onceki) => ({ ...onceki, [cocuk.id]: sayi }));
    return sayi >= 5 ? { durum: "kilitli", kalanSaniye: 300 } : { durum: "yanlis" };
  }

  return (
    <>
      <KimOkuyorEkrani
        cocuklar={ORNEK_COCUKLAR}
        sifreAcik={sifreAcik}
        yukleniyor={false}
        veliPinGerekli={veliPinGerekli}
        onSifreDogrula={dogrula}
        onAc={(cocuk) => setAcilan(cocuk.isim)}
        onVeliPaneli={() => setAcilan("Veli Paneli")}
        onVeliPiniBelirle={() => setVeliPinGerekli(false)}
      />
      {acilan ? (
        <p
          role="status"
          className="fixed inset-x-4 bottom-4 mx-auto max-w-sm rounded-kart bg-eylem px-4 py-3 text-center font-semibold text-eylem-metin shadow-kart"
        >
          Önizleme: {acilan} açılırdı.
        </p>
      ) : null}
    </>
  );
}
