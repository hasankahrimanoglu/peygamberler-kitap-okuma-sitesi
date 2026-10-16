import Image, { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { KATALOG_SAYILARI } from "../../data/katalogSayilari";
import { UNVAN_ESIKLERI, unvanAnahtari } from "../../lib/derive";
import { madalyaGorseli, rozetGorseli, unvanGorseli } from "../../lib/varlikYollari";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import styles from "./tanitim.module.css";

/**
 * Ödül görseli + üzerine gelince yalnız görselin kendi şeklinde gezinen ışık.
 * Maske olarak görselin küçültülmüş (optimize) kopyası kullanılır; asıl PNG
 * ikinci kez indirilmez.
 */
function ParlayanGorsel({ src, boyut, className = "" }: { src: string; boyut: string; className?: string }) {
  const maske = getImageProps({ src, alt: "", width: 192, height: 192 }).props.src;
  return (
    <div className={`${hareket.odulGorseli} ${className}`}>
      <Image src={src} alt="" width={512} height={512} sizes={boyut} />
      <span className={hareket.parlama} style={{ "--maske": `url("${maske}")` } as CSSProperties} aria-hidden="true" />
    </div>
  );
}

/** Terminoloji sabit: yalnız ROZET · MADALYA · UNVAN (PROJE-MODELI Bölüm 2). */
export function Oduller() {
  const ilkUnvan = UNVAN_ESIKLERI[0].unvan;
  const sonUnvan = UNVAN_ESIKLERI[UNVAN_ESIKLERI.length - 1].unvan;

  const kartlar: { ad: string; sayi: string; metin: string; gorsel: ReactNode }[] = [
    {
      ad: "Rozet",
      sayi: `${KATALOG_SAYILARI.rozet} rozet`,
      metin: "Her bölümün kendine özel rozeti var. Adı da görseli de o bölümün değerini anlatır.",
      gorsel: (
        <div className="relative flex h-full items-center justify-center">
          {[2, 1, 3].map((no, i) => (
            <div
              key={no}
              className={`${i === 1 ? "z-10 w-[46%]" : "w-[34%] opacity-90"} ${i === 0 ? "-mr-6 -rotate-12" : ""} ${
                i === 2 ? "-ml-6 rotate-12" : ""
              }`}
            >
              <ParlayanGorsel src={rozetGorseli("musa", no)} boyut="160px" />
            </div>
          ))}
        </div>
      ),
    },
    {
      ad: "Madalya",
      sayi: `${KATALOG_SAYILARI.madalya} madalya`,
      metin:
        "Kitap ve Büyük Final Testi bitince kazanılır; her kitabın madalyası farklıdır. Testteki doğru sayısı madalyanın şartı değildir.",
      gorsel: (
        <div className="relative flex h-full items-center justify-center gap-2">
          {["sit", "adem", "nuh"].map((kitap, i) => (
            <div
              key={kitap}
              className={`${hareket.sallan} ${i === 1 ? "w-[42%]" : "w-[30%] opacity-90"}`}
              style={{ "--gecikme": `${-i * 1.7}s` } as CSSProperties}
            >
              <ParlayanGorsel src={madalyaGorseli(kitap)} boyut="150px" />
            </div>
          ))}
        </div>
      ),
    },
    {
      ad: "Unvan",
      sayi: `${UNVAN_ESIKLERI.length} unvan`,
      metin: `Puanla değil, okunan kitap sayısıyla yükselir. “${ilkUnvan}” ile başlar, “${sonUnvan}” ile tamamlanır.`,
      gorsel: (
        <div className="relative flex h-full items-end justify-center gap-1">
          {[1, 4, 8].map((sira, i) => (
            <div
              key={sira}
              className={`${hareket.unvanBasamagi} ${i === 2 ? "w-[40%]" : i === 1 ? "w-[33%]" : "w-[26%]"}`}
              style={{ "--yukselis": `${-6 - i * 5}px`, "--gecikme": `${i * 70}ms` } as CSSProperties}
            >
              <ParlayanGorsel src={unvanGorseli(unvanAnahtari(UNVAN_ESIKLERI[sira].unvan))} boyut="150px" />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section aria-labelledby="odul-baslik" className="py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="odul-baslik"
          ust="Rozet · Madalya · Unvan"
          baslik="Emek görünür olsun, yarış olmasın"
          aciklama="Ödüller çocuğun emeğini görünür kılar; onu kimseyle yarıştırmaz. Puan, sıralama ve günlük seri yoktur."
        />

        <SiraliBelir etiket="ul" className="mt-14 grid gap-6 md:grid-cols-3" aralik={0.15} oran={0.2}>
          {kartlar.map((kart) => (
            <SiraliOge key={kart.ad} etiket="li" yon="olcek" sure={1} className="flex">
              {/* Üzerine gelme tepkisi iç kartta: dış öğenin dönüşümünü giriş hareketi yönetir. */}
              <div
                className={`${hareket.odulKarti} flex w-full flex-col overflow-hidden rounded-kart border border-white/10 bg-white/[0.04]`}
              >
                <div className={`${styles.altinHale} h-48 px-6 pt-8 sm:h-56`} aria-hidden="true">
                  {kart.gorsel}
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4 sm:p-8 sm:pt-5">
                  <p className="font-baslik text-sm font-bold uppercase tracking-[0.16em] text-vurgu">{kart.sayi}</p>
                  <h3 className="mt-1 font-edebi text-[1.9rem] font-semibold text-murekkep">{kart.ad}</h3>
                  <p className="mt-2 font-govde text-[1.02rem] leading-relaxed text-murekkep-soluk">{kart.metin}</p>
                </div>
              </div>
            </SiraliOge>
          ))}
        </SiraliBelir>
      </Kap>
    </section>
  );
}
