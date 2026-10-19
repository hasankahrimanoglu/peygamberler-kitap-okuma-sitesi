"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { YonetimEkrani } from "../../src/components/yonetim/YonetimEkrani";
import { Logo } from "../../src/components/marka/Logo";
import type {
  BaglantiSonucu,
  SatisGirdisi,
  SatisSonucu,
  YonetimHatasi,
  YonetimSiparisi,
} from "../../src/lib/odeme/yonetimTurleri";

/**
 * Yönetim (Faz 7, 3. adım — PROJE-MODELI Bölüm 8): elden satış ve siparişler.
 * Sitede hiçbir yerden bağlantı almaz. Yetki sunucuda denetlenir
 * (`yoneticiler` tablosu); bu sayfa yalnız oturumun erişim anahtarını gönderir.
 */
export default function YonetimSayfasi() {
  const router = useRouter();
  const [durum, setDurum] = useState<"bekliyor" | "yetkisiz" | "hazir">("bekliyor");
  const [siparisler, setSiparisler] = useState<YonetimSiparisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const istek = useCallback(
    async (yol: string, govde?: unknown) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return null;
      }
      return fetch(yol, {
        method: govde === undefined ? "GET" : "POST",
        headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
        body: govde === undefined ? undefined : JSON.stringify(govde),
      });
    },
    [router],
  );

  const yukle = useCallback(async () => {
    setYukleniyor(true);
    const yanit = await istek("/api/yonetim/siparisler");
    if (!yanit) return;
    if (yanit.status === 403) {
      setDurum("yetkisiz");
      return;
    }
    const veri = (await yanit.json().catch(() => ({}))) as { siparisler?: YonetimSiparisi[] };
    setSiparisler(veri.siparisler ?? []);
    setDurum("hazir");
    setYukleniyor(false);
  }, [istek]);

  useEffect(() => {
    queueMicrotask(() => void yukle());
  }, [yukle]);

  async function satis(girdi: SatisGirdisi): Promise<SatisSonucu | YonetimHatasi> {
    const yanit = await istek("/api/yonetim/satis", girdi);
    if (!yanit) return { hata: "yetkisiz" };
    return ((await yanit.json().catch(() => null)) as SatisSonucu | YonetimHatasi | null) ?? { hata: "sunucu" };
  }

  async function baglanti(eposta: string): Promise<BaglantiSonucu | YonetimHatasi> {
    const yanit = await istek("/api/yonetim/baglanti", { eposta });
    if (!yanit) return { hata: "yetkisiz" };
    return ((await yanit.json().catch(() => null)) as BaglantiSonucu | YonetimHatasi | null) ?? { hata: "sunucu" };
  }

  return (
    <main className="tema-veli min-h-screen bg-zemin px-4 pb-12 pt-6 text-murekkep sm:px-8">
      <div className="mx-auto mb-8 max-w-4xl">
        <Logo ton="koyu" boyut={36} />
      </div>
      {durum === "bekliyor" ? (
        <p role="status" className="text-center text-base font-semibold text-murekkep-soluk">
          Yükleniyor…
        </p>
      ) : durum === "yetkisiz" ? (
        <p role="alert" className="mx-auto max-w-md text-center text-base font-semibold text-murekkep-soluk">
          Bu sayfaya erişiminiz yok.
        </p>
      ) : (
        <YonetimEkrani
          siparisler={siparisler}
          yukleniyor={yukleniyor}
          onSatis={satis}
          onBaglanti={baglanti}
          onYenile={() => void yukle()}
        />
      )}
    </main>
  );
}
