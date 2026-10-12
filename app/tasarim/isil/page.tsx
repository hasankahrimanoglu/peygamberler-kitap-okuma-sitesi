"use client";

import { useState, type CSSProperties } from "react";
import { Isil, type IsilPozu } from "../../../src/components/cocuk/Isil";
import { ROTA_ARKAPLANI } from "../../../src/lib/varlikYollari";

/**
 * Işıl karakter sayfası — giriş gerektirmez (PROJE-MODELI 3.10.5, Faz D).
 * Üç poz, üç zemin (okuma kremi, gece mavisi, çayır) ve okunurluk için boyut
 * merdiveni (24 px'te bile tanınmalı). "Yeniden oynat" kutlama ve konuşma
 * hareketlerini baştan başlatır.
 */
const POZLAR: { poz: IsilPozu; ad: string; nerede: string }[] = [
  { poz: "durus", ad: "Duruş", nerede: "Buradasın · boş ekranlar" },
  { poz: "konusma", ad: "Konuşma", nerede: "Balon cümleleri · duyurular" },
  { poz: "kutlama", ad: "Kutlama", nerede: "Rozet · madalya · yolun ucu" },
];

const ZEMINLER: { ad: string; sinif: string; stil?: CSSProperties }[] = [
  { ad: "Okuma ekranı", sinif: "bg-okuma-yuzey text-zemin" },
  { ad: "Gece (rozet anı)", sinif: "zemin-yildizli text-murekkep" },
  {
    ad: "Çayır (ana ekran)",
    sinif: "text-murekkep",
    stil: { backgroundImage: `url(${ROTA_ARKAPLANI})`, backgroundSize: "100% auto" },
  },
];

export default function IsilSayfasi() {
  const [tur, setTur] = useState(0);

  return (
    <main className="tema-cocuk zemin-yildizli min-h-screen px-4 py-10 font-govde text-murekkep sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-baslik text-4xl font-extrabold">Işıl</h1>
            <p className="mt-1 text-murekkep-soluk">
              Rehber ateşböceği · kodla çizilir ve canlandırılır · üç poz
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTur((deger) => deger + 1)}
            className="min-h-12 rounded-full bg-vurgu px-6 font-baslik text-lg font-extrabold text-zemin"
          >
            Yeniden oynat
          </button>
        </header>

        {ZEMINLER.map((zemin) => (
          <section
            key={zemin.ad}
            className={`grid gap-4 rounded-3xl p-6 sm:grid-cols-3 ${zemin.sinif}`}
            style={zemin.stil}
          >
            <h2 className="font-baslik text-lg font-extrabold sm:col-span-3">{zemin.ad}</h2>
            {POZLAR.map(({ poz, ad, nerede }) => (
              <figure key={poz} className="grid justify-items-center gap-2 text-center">
                <Isil key={`${poz}-${tur}`} poz={poz} boyut={180} />
                <figcaption>
                  <b className="font-baslik text-lg">{ad}</b>
                  <span className="block text-sm opacity-80">{nerede}</span>
                </figcaption>
              </figure>
            ))}
          </section>
        ))}

        <section className="grid gap-4 rounded-3xl bg-okuma-yuzey p-6 text-zemin">
          <h2 className="font-baslik text-lg font-extrabold">Boyut merdiveni</h2>
          <div className="flex flex-wrap items-end gap-6">
            {[24, 32, 48, 64, 96, 128].map((boyut) => (
              <figure key={boyut} className="grid justify-items-center gap-1 text-sm">
                <Isil key={`${boyut}-${tur}`} boyut={boyut} />
                <figcaption>{boyut} px</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
