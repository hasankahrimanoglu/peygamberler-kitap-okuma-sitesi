"use client";

import { useEffect, useMemo, useState } from "react";
import type { DeriveBookRow, DeriveProgressRow } from "../../../src/lib/derive";
import { buildChildReport, type SecimKaydi } from "../../../src/lib/parent/report";
import { RaporKitaplarSekmesi } from "../../../src/components/dashboard/RaporKitaplarSekmesi";
import { RaporSohbetSekmesi } from "../../../src/components/dashboard/RaporSohbetSekmesi";

/**
 * Gelişim Raporu önizlemesi — giriş gerektirmez, Supabase'e bağlanmaz. Kitaplar
 * ve Sohbet Önerileri sekmeleri gerçek türetmeden (`buildChildReport`) örnek
 * veriyle çizilir. Gerçek ekran `/dashboard/rapor/[profileId]`'dir.
 *   ?durum=bos     → hiç bölüm bitirmemiş çocuk
 *   ?durum=tek     → tek kitap, ilk bölüm bitti
 *   (varsayılan)   → biri yarıda, birinin finali kalmış, biri bitmiş
 *   ?sekme=kitaplar → Kitaplar sekmesiyle açılır
 *   ?ozet=high|mixed|low|az|yok → biten kitabın (Hz. Âdem, 8 bölüm) "Sen
 *     Olsaydın" seçimleri (S5): 7/8, 4/8, 2/8 doğru; "az" 3 kayıt (yarıdan az,
 *     özet çıkmaz); "yok" kayıt yok. Varsayılan high.
 */

type Durum = "karisik" | "tek" | "bos";
type Ozet = "high" | "mixed" | "low" | "az" | "yok";

/** Hz. Âdem'in 8 bölümü için örnek ilk seçimler: kaçı değeri yaşatan şık. */
function ornekSecimler(ozet: Ozet): SecimKaydi[] {
  const kayitSayisi = ozet === "yok" ? 0 : ozet === "az" ? 3 : 8;
  const dogruSayisi = { high: 7, mixed: 4, low: 2, az: 3, yok: 0 }[ozet];
  return Array.from({ length: kayitSayisi }, (_, i) => ({ kitap_anahtari: "adem", dogru: i < dogruSayisi }));
}
type Sekme = "kitaplar" | "sohbet";

const ORNEK_KITAPLAR: DeriveBookRow[] = [
  { id: "ornek-adem", isim: "Hz. Âdem", toplam_bolum: 8, sira: 1 },
  { id: "ornek-sit", isim: "Hz. Şît", toplam_bolum: 4, sira: 2 },
  { id: "ornek-ibrahim", isim: "Hz. İbrahim", toplam_bolum: 9, sira: 7 },
];

function ornekIlerleme(durum: Durum): DeriveProgressRow[] {
  const once = (saat: number) => new Date(Date.now() - saat * 60 * 60 * 1000).toISOString();
  const satir = (book_id: string, tamamlanan: number, saat: number, bitti = false, final_score?: number) => ({
    book_id,
    tamamlanan_bolum_sayisi: tamamlanan,
    yuzde: null,
    bitti_mi: bitti,
    final_score: final_score ?? null,
    updated_at: once(saat),
  });

  if (durum === "bos") return [];
  if (durum === "tek") return [satir("ornek-ibrahim", 1, 2)];
  return [
    satir("ornek-adem", 8, 24 * 12, true, 7),
    satir("ornek-sit", 4, 24 * 3),
    satir("ornek-ibrahim", 2, 26),
  ];
}

const sekmeler: { deger: Sekme; etiket: string }[] = [
  { deger: "kitaplar", etiket: "Kitaplar" },
  { deger: "sohbet", etiket: "Sohbet Önerileri" },
];

export default function VeliRaporOnizleme() {
  // Örnek tarihler "dün", "3 gün önce" diye okunur; sunucu çiziminden farklı
  // çıkmasın diye veri yalnız tarayıcıda kurulur.
  const [durum, setDurum] = useState<Durum | null>(null);
  const [sekme, setSekme] = useState<Sekme>("sohbet");
  const [ozet, setOzet] = useState<Ozet>("high");

  useEffect(() => {
    queueMicrotask(() => {
      const parametreler = new URLSearchParams(window.location.search);
      const istenen = parametreler.get("durum");
      setDurum(istenen === "bos" || istenen === "tek" ? istenen : "karisik");
      if (parametreler.get("sekme") === "kitaplar") setSekme("kitaplar");
      const istenenOzet = parametreler.get("ozet");
      if (istenenOzet === "mixed" || istenenOzet === "low" || istenenOzet === "az" || istenenOzet === "yok") {
        setOzet(istenenOzet);
      }
    });
  }, []);

  const rapor = useMemo(
    () =>
      durum
        ? buildChildReport({ isim: "Elif" }, ornekIlerleme(durum), ORNEK_KITAPLAR, ornekSecimler(ozet))
        : null,
    [durum, ozet],
  );

  return (
    <div className="tema-veli min-h-screen bg-zemin text-murekkep">
      <main className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-vurgu">Gelişim Raporu · önizleme</p>
          <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">Elif</h1>

          <div
            role="tablist"
            aria-label="Rapor bölümleri"
            className="mb-6 mt-5 grid grid-cols-2 gap-1 rounded-buton border border-cizgi bg-yuzey-2 p-1 sm:max-w-md"
          >
            {sekmeler.map((s) => {
              const secili = sekme === s.deger;
              return (
                <button
                  key={s.deger}
                  type="button"
                  role="tab"
                  aria-selected={secili}
                  onClick={() => setSekme(s.deger)}
                  className={`min-h-11 rounded-[0.7rem] px-3 py-1.5 text-sm font-semibold transition-colors ${
                    secili ? "bg-yuzey text-murekkep shadow-kart" : "text-murekkep-soluk hover:text-murekkep"
                  }`}
                >
                  {s.etiket}
                </button>
              );
            })}
          </div>

          {rapor ? (
            sekme === "kitaplar" ? (
              <RaporKitaplarSekmesi okunanlar={rapor.readingAdventures} bitenler={rapor.completedAdventures} />
            ) : (
              <RaporSohbetSekmesi okunanlar={rapor.readingAdventures} bitenler={rapor.completedAdventures} />
            )
          ) : null}
        </div>
      </main>
    </div>
  );
}
