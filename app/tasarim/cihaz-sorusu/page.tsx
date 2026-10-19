"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CihazKullanimSorusu } from "../../../src/components/dashboard/CihazKullanimSorusu";
import { CihazBaglandiKarti } from "../../../src/components/dashboard/AnaEkranNotu";
import { Buton, CocukAvatari, Ikon, Kart } from "../../../src/components/ui";

/**
 * "Bu cihazı çocuğunuz kullanacak mı?" önizlemesi — giriş gerektirmez,
 * Supabase'e bağlanmaz, cihaz durumunu değiştirmez. Gerçek soru veli
 * panelinde çocuk kartındaki "Keşif Haritasını Aç" ile ve Kütüphane'den açılır
 * (PROJE-MODELI 3.11). "Evet" → `/tasarim/kim-okuyor?kurulum=1` (ana ekran notu).
 *   ?acik=0        → soru kapalı başlar
 *   ?durum=baglandi → Aile ve Güvenlik'te kodla cihaz bağlandıktan sonraki kart
 */
export default function CihazSorusuOnizleme() {
  const router = useRouter();
  const [acik, setAcik] = useState(true);
  const [baglandi, setBaglandi] = useState(false);
  const [sonuc, setSonuc] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      const baglandiDurumu = parametreler.get("durum") === "baglandi";
      setBaglandi(baglandiDurumu);
      if (parametreler.get("acik") === "0" || baglandiDurumu) setAcik(false);
    });
  }, []);

  return (
    <div className="tema-veli min-h-screen bg-zemin text-murekkep">
      <main className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-vurgu">Veli paneli · önizleme</p>
          <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
            {baglandi ? "Aile ve Güvenlik" : "Çocuk Profilleri"}
          </h1>

          {baglandi ? (
            <Kart className="mt-6">
              <h2 className="font-baslik text-xl font-bold">Çocuğun kendi cihazı</h2>
              <CihazBaglandiKarti isim="Elif" cihazAdi="iPad" onTamam={() => setBaglandi(false)} />
            </Kart>
          ) : (
            <Kart className="mt-6">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-cizgi bg-yuzey">
                  <CocukAvatari avatarTipi="avatar-2" boyut={64} alt="" />
                </span>
                <div>
                  <p className="font-baslik text-xl font-bold">Elif</p>
                  <p className="text-base font-medium text-murekkep-soluk">Hz. Nûh · 3. bölümde</p>
                </div>
              </div>
              <Buton
                varyant="eylem"
                tamGenislik
                className="mt-5"
                onClick={() => {
                  setSonuc(null);
                  setAcik(true);
                }}
              >
                <Ikon ad="kitap" boyut={19} />
                Okumaya Devam Et
              </Buton>
            </Kart>
          )}

          {sonuc ? (
            <p
              role="status"
              className="mt-5 rounded-kart border border-eylem/30 bg-eylem-yumusak px-4 py-3 text-base font-semibold text-eylem-koyu"
            >
              Önizleme: {sonuc}
            </p>
          ) : null}
        </div>
      </main>

      <CihazKullanimSorusu
        acik={acik}
        onCocugaVer={() => router.push("/tasarim/kim-okuyor?kurulum=1")}
        onGozAt={() => {
          setAcik(false);
          setSonuc("Elif'in haritası açılırdı; cihaz kilitlenmez, panele PIN'siz dönülürdü.");
        }}
        onVazgec={() => setAcik(false)}
      />
    </div>
  );
}
