"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParentData } from "../../src/lib/parent/ParentDataProvider";
import { aileGuvenlikDurumu } from "../../src/lib/aileGuvenligi";
import { AnaSayfa } from "../../src/components/veli/AnaSayfa";
import { IkonKutusu, Yuzey } from "../../src/components/veli/parcalar";
import { Buton } from "../../src/components/ui";

const HATIRLATMA_ANAHTARI = "profil_sifresi_hatirlatmasi_kapandi";

/**
 * Veli Ana Sayfası (PROJE-MODELI 3.8). Görünüm `src/components/veli/AnaSayfa.tsx`;
 * veri ve eylemler panel kökünden (`VeliPaneliCanli`) gelir. Bu sayfa yalnız
 * profil şifresi hatırlatmasını ekler: ikinci çocuk eklenince ve ayar kapalıysa
 * bir kez gösterilir (3.11).
 */
export default function VeliAnaSayfasi() {
  const router = useRouter();
  const { profiles } = useParentData();
  const [hatirlatma, setHatirlatma] = useState(false);
  const cocukSayisi = profiles.length;

  useEffect(() => {
    if (cocukSayisi < 2) return;
    let kapatildi = false;
    try {
      kapatildi = window.localStorage.getItem(HATIRLATMA_ANAHTARI) === "1";
    } catch {
      kapatildi = false;
    }
    if (kapatildi) return;
    let iptal = false;
    void aileGuvenlikDurumu().then((durum) => {
      if (!iptal && durum && !durum.profilSifresiAcik) setHatirlatma(true);
    });
    return () => {
      iptal = true;
    };
  }, [cocukSayisi]);

  function kapat() {
    setHatirlatma(false);
    try {
      window.localStorage.setItem(HATIRLATMA_ANAHTARI, "1");
    } catch {
      // Depolama kapalıysa hatırlatma bir sonraki açılışta yine görünür.
    }
  }

  const ek = hatirlatma ? (
    <Yuzey className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <IkonKutusu ikon="kilit" ton="altin" boyut={48} />
        <div>
          <p className="font-veli-baslik text-[1.25rem] font-medium leading-snug text-murekkep">
            Çocuklarınız aynı tableti mi kullanıyor?
          </p>
          <p className="mt-1 text-base leading-7 text-veli-govde">
            Profil şifresini açarsanız her çocuk kendi profiline 4 rakamlı şifresiyle girer; kardeşinin profilinde
            okuyamaz.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <Buton varyant="cerceve" boyut="kucuk" onClick={kapat}>
          Şimdi Değil
        </Buton>
        <Buton
          varyant="eylem"
          boyut="kucuk"
          onClick={() => {
            kapat();
            router.push("/dashboard/ayarlar");
          }}
        >
          Ayarı Aç
        </Buton>
      </div>
    </Yuzey>
  ) : null;

  return <AnaSayfa ek={ek} />;
}
