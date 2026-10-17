"use client";

import { useState, type CSSProperties } from "react";
import { CanliCayir } from "../../../src/components/cocuk/CanliCayir";
import { CAYIR_GORSEL_OLCUSU } from "../../../src/components/cocuk/canliCayirIrmaklari";
import { ROTA_ARKAPLANI } from "../../../src/lib/varlikYollari";

/**
 * Canlı çayır test ekranı — giriş gerektirmez. Rota arka planının tek karosu
 * gerçek boyutunda (en çok 1122 px), duraklar ve kartlar olmadan çizilir;
 * su, balık, çiçek, saz, kelebek, tavşan ve kuşlar yakından incelenir.
 * Gerçek ekran `/map`'tir (PROJE-MODELI 3.10.1).
 *
 * "Hızlı" düğmesi bütün döngüleri 4 kat hızlandırır (balık ve tavşan gibi
 * seyrek görünen canlıları beklemeden görmek için); yalnız bu sayfadadır.
 */
const { genislik, yukseklik } = CAYIR_GORSEL_OLCUSU;

export default function CanliCayirOnizleme() {
  const [hizli, setHizli] = useState(false);

  function hiziDegistir() {
    const yeni = !hizli;
    for (const animasyon of document.getAnimations()) animasyon.playbackRate = yeni ? 4 : 1;
    setHizli(yeni);
  }

  return (
    <main className="tema-cocuk zemin-yildizli min-h-screen px-4 py-6">
      <div className="mx-auto max-w-[1122px]">
        <h1 className="font-baslik text-2xl font-bold text-murekkep">Canlı çayır — test ekranı</h1>
        <p className="mt-1 font-govde text-murekkep-soluk">
          Rota arka planının bir karosu, gerçek boyutunda. Balıklar her ırmakta sırayla, 15–21
          saniyede bir suyun altından belirip dalar.
        </p>
        <nav className="sticky top-0 z-10 mt-3 flex flex-wrap gap-2 py-2" aria-label="Test ekranı">
          <a href="#irmak-sag" className="rounded-full bg-vurgu px-4 py-2 font-baslik font-bold text-zemin">
            Sağ ırmak
          </a>
          <a href="#irmak-sol" className="rounded-full bg-vurgu px-4 py-2 font-baslik font-bold text-zemin">
            Sol ırmak
          </a>
          <button
            type="button"
            onClick={hiziDegistir}
            aria-pressed={hizli}
            className="rounded-full border border-vurgu px-4 py-2 font-baslik font-bold text-vurgu"
          >
            {hizli ? "Normal hız" : "Hızlı (4×)"}
          </button>
        </nav>

        <div
          className="relative mt-2 overflow-hidden rounded-2xl"
          style={
            {
              aspectRatio: `${genislik} / ${yukseklik}`,
              backgroundImage: `url("${ROTA_ARKAPLANI}")`,
              backgroundSize: "100% auto",
            } as CSSProperties
          }
        >
          <span id="irmak-sag" className="absolute scroll-mt-16" style={{ top: "9%" }} />
          <span id="irmak-sol" className="absolute scroll-mt-16" style={{ top: "61%" }} />
          <CanliCayir yer="her" />
        </div>
      </div>
    </main>
  );
}
