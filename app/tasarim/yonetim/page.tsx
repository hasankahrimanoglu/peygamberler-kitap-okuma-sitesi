"use client";

import { useState } from "react";
import { YonetimEkrani } from "../../../src/components/yonetim/YonetimEkrani";
import { Logo } from "../../../src/components/marka/Logo";
import type { SatisGirdisi, YonetimSiparisi } from "../../../src/lib/odeme/yonetimTurleri";

/**
 * Yönetim ekranı önizlemesi — giriş gerektirmez, Supabase'e bağlanmaz, e-posta
 * göndermez. Gerçek sayfa `/yonetim` (yalnız yönetici).
 */
const ORNEK_BAGLANTI = "https://peygamberler-kitap-okuma-sitesi.vercel.app/sifre-belirle?anahtar=ornek-anahtar";

const ORNEK_SIPARISLER: YonetimSiparisi[] = [
  {
    id: "1",
    kaynak: "shopier",
    siparis_no: "123456789",
    eposta: "ayse.yilmaz@ornek.com",
    profil_hakki: 3,
    durum: "islendi",
    eposta_gonderildi: true,
    not_metni: null,
    hata: null,
    olusturuldu: "2026-10-20T09:42:00Z",
  },
  {
    id: "2",
    kaynak: "elden",
    siparis_no: "E-20261019-A1B2C3",
    eposta: "mehmet.kaya@ornek.com",
    profil_hakki: 1,
    durum: "islendi",
    eposta_gonderildi: false,
    not_metni: "WhatsApp, EFT 19 Eki",
    hata: null,
    olusturuldu: "2026-10-19T18:15:00Z",
  },
  {
    id: "3",
    kaynak: "shopier",
    siparis_no: "123456700",
    eposta: "deneme@ornek.com",
    profil_hakki: 1,
    durum: "test",
    eposta_gonderildi: false,
    not_metni: null,
    hata: null,
    olusturuldu: "2026-10-18T12:00:00Z",
  },
];

export default function YonetimOnizleme() {
  const [siparisler, setSiparisler] = useState(ORNEK_SIPARISLER);

  async function satis(girdi: SatisGirdisi) {
    await new Promise((coz) => setTimeout(coz, 400));
    setSiparisler((onceki) => [
      {
        id: String(Date.now()),
        kaynak: "elden",
        siparis_no: "E-ORNEK",
        eposta: girdi.eposta.toLowerCase(),
        profil_hakki: girdi.profilHakki,
        durum: "islendi",
        eposta_gonderildi: true,
        not_metni: girdi.not || null,
        hata: null,
        olusturuldu: new Date().toISOString(),
      },
      ...onceki,
    ]);
    return {
      durum: "islendi" as const,
      yeniHesap: true,
      profilHakki: girdi.profilHakki,
      hakArtti: true,
      epostaGonderildi: true,
      baglanti: ORNEK_BAGLANTI,
    };
  }

  async function baglanti() {
    await new Promise((coz) => setTimeout(coz, 400));
    return { baglanti: ORNEK_BAGLANTI, epostaGonderildi: false };
  }

  return (
    <main className="tema-veli min-h-screen bg-zemin px-4 pb-12 pt-6 text-murekkep sm:px-8">
      <div className="mx-auto mb-8 max-w-4xl">
        <Logo ton="koyu" boyut={36} />
      </div>
      <YonetimEkrani
        siparisler={siparisler}
        yukleniyor={false}
        onSatis={satis}
        onBaglanti={baglanti}
        onYenile={() => undefined}
      />
    </main>
  );
}
