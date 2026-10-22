"use client";

import { useMemo, useState } from "react";
import { kutuphaneListesi, type KutuphaneDurum } from "../../lib/derive";
import { Ikon } from "../ui";
import { useSeciliCocuk, useVeliPaneli } from "./baglam";
import { Cip, CocukSecici, Kapak, SayfaBasligi, Yukleniyor, Yuzey } from "./parcalar";
import { yolculukKitaplari } from "../../lib/child/yolculuk";
import { katalogBilgisi } from "./veriler";
import styles from "./veliPaneli.module.css";

type Filtre = "hepsi" | KutuphaneDurum;

const FILTRELER: { deger: Filtre; etiket: string }[] = [
  { deger: "hepsi", etiket: "Tümü" },
  { deger: "devam", etiket: "Devam Eden" },
  { deger: "tamamlandi", etiket: "Tamamlanan" },
  { deger: "yeni", etiket: "Başlanmamış" },
];

/**
 * Kütüphane (PROJE-MODELI 3.9) — kapak rafı. Kapaklar ürünün en güçlü görselidir;
 * eski tek sütunlu liste yerine raf düzeni (mobil 2, tablet 3–4,
 * masaüstü 5 sütun). Bir kitaba dokununca ayrıntı ve eylem sağ panelde açılır.
 * Kitaplar arasında kilit yok (PROJE-MODELI 3.10.2).
 */
export function Kutuphane() {
  const { aile, perdeAc, yukleniyor } = useVeliPaneli();
  const secim = useSeciliCocuk();
  const [filtre, setFiltre] = useState<Filtre>("hepsi");
  const ilerleme = useMemo(() => (secim ? aile.ilerleme[secim.cocuk.id] ?? [] : []), [aile, secim]);
  const kitaplar = useMemo(() => kutuphaneListesi(aile.kitaplar, ilerleme), [aile, ilerleme]);
  // "Yeni" etiketi çocuk tarafıyla aynı kuraldan gelir (başlanmamış + yayından 30 gün içinde).
  const yeniler = useMemo(
    () => new Set(yolculukKitaplari(aile.kitaplar, ilerleme).filter((k) => k.yeni).map((k) => k.key)),
    [aile, ilerleme],
  );
  const sayilar = {
    hepsi: kitaplar.length,
    devam: kitaplar.filter((k) => k.durum === "devam").length,
    tamamlandi: kitaplar.filter((k) => k.durum === "tamamlandi").length,
    yeni: kitaplar.filter((k) => k.durum === "yeni").length,
  };
  const gorunen = kitaplar.filter((k) => filtre === "hepsi" || k.durum === filtre);

  if (yukleniyor) return <Yukleniyor />;

  return (
    <div>
      <SayfaBasligi
        baslik="Kütüphane"
        aciklama={`Yayındaki ${kitaplar.length} kitap. Yeni kitaplar yayımlandıkça burada ve çocuğunuzun okuma rotasında kendiliğinden görünür.`}
        sag={<CocukSecici />}
      />

      <div className="-mx-4 mb-6 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
        <div role="radiogroup" aria-label="Kitap durumu" className="flex w-max gap-2">
          {FILTRELER.map((f) => {
            const secili = f.deger === filtre;
            return (
              <button
                key={f.deger}
                type="button"
                role="radio"
                aria-checked={secili}
                onClick={() => setFiltre(f.deger)}
                className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors ${
                  secili
                    ? "bg-veli-gece text-veli-gece-metin"
                    : "bg-yuzey text-veli-govde shadow-[0_0_0_1px_rgb(39_30_23/0.08)] hover:bg-yuzey-2"
                }`}
              >
                {f.etiket}
                <span className={`tabular-nums ${secili ? "text-veli-gece-soluk" : "text-murekkep-soluk"}`}>
                  {sayilar[f.deger]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {gorunen.length === 0 ? (
        <Yuzey className="p-8 text-center text-base text-veli-govde">Bu durumda kitap yok.</Yuzey>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {gorunen.map((kitap) => {
            const katalog = katalogBilgisi(kitap.bookKey);
            return (
              <li key={kitap.bookKey}>
                <button
                  type="button"
                  onClick={() => perdeAc({ tur: "kitap", bookKey: kitap.bookKey })}
                  className="group block w-full text-left"
                  aria-label={`${kitap.ad} kitabının ayrıntısını aç`}
                >
                  <span className="relative block transition-transform duration-300 group-hover:-translate-y-1">
                    <Kapak bookKey={kitap.bookKey} />
                    {yeniler.has(kitap.bookKey) ? (
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-veli-altin-acik px-2.5 py-1 text-[0.75rem] font-bold text-veli-gece shadow">
                        Yeni
                      </span>
                    ) : null}
                    {kitap.durum === "tamamlandi" ? (
                      <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-eylem text-white shadow">
                        <Ikon ad="onay" boyut={17} />
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-3 block font-veli-baslik text-[1.125rem] font-medium leading-tight text-murekkep">
                    {kitap.ad}
                  </span>
                  <span className="mt-0.5 block text-[0.875rem] leading-5 text-murekkep-soluk">{katalog?.subtitle}</span>
                  <span className="mt-2.5 block">
                    {kitap.durum === "devam" && kitap.tamamlanan >= kitap.toplam ? (
                      <Cip ton="altin" ikon="madalya">
                        Final Testi kaldı
                      </Cip>
                    ) : kitap.durum === "devam" ? (
                      <span className="flex items-center gap-2.5">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-murekkep/10">
                          <span
                            className={`block h-full rounded-full ${styles.bolumParcasiDolu}`}
                            style={{ width: `${(kitap.tamamlanan / kitap.toplam) * 100}%` }}
                          />
                        </span>
                        <span className="text-[0.8125rem] font-semibold tabular-nums text-veli-govde">
                          {kitap.tamamlanan}/{kitap.toplam}
                        </span>
                      </span>
                    ) : kitap.durum === "tamamlandi" ? (
                      <Cip ton="eylem" ikon="madalya">
                        Tamamlandı
                      </Cip>
                    ) : (
                      <span className="text-[0.8125rem] text-murekkep-soluk">{kitap.toplam} bölüm</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Yuzey className="mt-10 flex items-center gap-4 p-5 sm:p-6">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-veli-gece text-veli-altin-acik">
          <Ikon ad="yildiz" boyut={20} />
        </span>
        <p className="text-[0.9375rem] leading-6 text-veli-govde">
          <span className="font-semibold text-murekkep">Yeni kitaplar hazırlanıyor. </span>
          Yayımlanan her kitap çocuğunuzun rotasına kendi yerinde ve &quot;Yeni&quot; etiketiyle girer.
        </p>
      </Yuzey>
    </div>
  );
}
