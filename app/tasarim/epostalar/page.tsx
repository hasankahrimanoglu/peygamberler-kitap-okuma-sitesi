"use client";

import { useEffect, useRef } from "react";
import {
  hosGeldinEpostasi,
  paketGuncellendiEpostasi,
  sifreBaglantisiEpostasi,
  whatsappMesaji,
} from "../../../src/lib/odeme/epostaSablonlari";

/**
 * Veliye giden e-postaların önizlemesi — gerçek şablonlar örnek değerlerle
 * çizilir, hiçbir şey gönderilmez (Faz 7, 3. adım).
 */
const EPOSTA = "ayse.yilmaz@ornek.com";
const BAGLANTI = "https://peygamberler-kitap-okuma-sitesi.vercel.app/sifre-belirle?anahtar=ornek-anahtar";
const GIRIS = "https://peygamberler-kitap-okuma-sitesi.vercel.app/login";

const ORNEKLER = [
  { ad: "① Hoş geldin (yeni hesap)", icerik: hosGeldinEpostasi({ eposta: EPOSTA, profilHakki: 3, baglanti: BAGLANTI }) },
  {
    ad: "② Paket güncellendi (hak arttı)",
    icerik: paketGuncellendiEpostasi({ eposta: EPOSTA, profilHakki: 5, hakArtmadi: false, girisAdresi: GIRIS }),
  },
  {
    ad: "② Paket güncellendi (hak değişmedi)",
    icerik: paketGuncellendiEpostasi({ eposta: EPOSTA, profilHakki: 5, hakArtmadi: true, girisAdresi: GIRIS }),
  },
  { ad: "③ Şifre belirleme bağlantısı", icerik: sifreBaglantisiEpostasi({ eposta: EPOSTA, baglanti: BAGLANTI }) },
];

/** Çerçeve e-postanın boyuna uyar; e-posta kesik görünmesin. */
function EpostaCercevesi({ baslik, html }: { baslik: string; html: string }) {
  const cerceve = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const oge = cerceve.current;
    if (!oge) return undefined;
    const olc = () => {
      const belge = oge.contentDocument;
      if (belge?.documentElement) oge.style.height = `${belge.documentElement.scrollHeight + 8}px`;
    };
    if (oge.contentDocument?.readyState === "complete") olc();
    oge.addEventListener("load", olc);
    return () => oge.removeEventListener("load", olc);
  }, []);

  return (
    <iframe
      ref={cerceve}
      title={baslik}
      srcDoc={html}
      className="mt-3 h-[640px] w-full rounded-kart border border-cizgi bg-white"
    />
  );
}

export default function EpostalarOnizleme() {
  return (
    <main className="tema-veli min-h-screen bg-zemin px-4 pb-12 pt-6 text-murekkep sm:px-8">
      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <p className="text-sm font-semibold text-vurgu">Önizleme</p>
          <h1 className="mt-1 font-baslik text-3xl font-bold">Veliye giden e-postalar</h1>
        </div>
        {ORNEKLER.map((ornek) => (
          <section key={ornek.ad}>
            <h2 className="font-baslik text-xl font-bold">{ornek.ad}</h2>
            <p className="mt-1 text-base font-medium text-murekkep-soluk">Konu: {ornek.icerik.konu}</p>
            <EpostaCercevesi baslik={ornek.ad} html={ornek.icerik.html} />
          </section>
        ))}
        <section>
          <h2 className="font-baslik text-xl font-bold">④ WhatsApp mesajı (elden satış)</h2>
          <pre className="mt-3 whitespace-pre-wrap rounded-kart border border-cizgi bg-yuzey p-4 font-govde text-base leading-7">
            {whatsappMesaji({ eposta: EPOSTA, baglanti: BAGLANTI })}
          </pre>
        </section>
      </div>
    </main>
  );
}
