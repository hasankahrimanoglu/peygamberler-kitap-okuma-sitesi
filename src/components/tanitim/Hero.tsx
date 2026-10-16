import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { KATALOG_SAYILARI } from "../../data/katalogSayilari";
import { MARKA } from "../../data/marka";
import { rozetGorseli, SITE_ARKAPLANI } from "../../lib/varlikYollari";
import { Ikon } from "../ui/Ikon";
import { AtesBocekleri } from "./AtesBocekleri";
import { CihazSahnesi } from "./hareket/CihazSahnesi";
import hareket from "./hareket/hareket.module.css";
import { RehberAlani, RehberHedefi, RehberIsil } from "./hareket/Rehber";
import { Sayac } from "./hareket/Sayac";
import { DugmeBaglanti, Kap, Tablet, Telefon } from "./ortak";
import styles from "./tanitim.module.css";

const sira = (n: number) => ({ "--sira": n }) as CSSProperties;

/** Başlık kelime kelime yükselir (yalnız CSS; JavaScript beklemez). */
const BASLIK = "Peygamber kıssaları, çocuğunuzun kendi yolculuğuna dönüşsün.";
const BASLIK_KELIMELERI: { kelime: string; vurgu?: boolean }[] = [
  { kelime: "Peygamber" },
  { kelime: "kıssaları," },
  { kelime: "çocuğunuzun" },
  { kelime: "kendi", vurgu: true },
  { kelime: "yolculuğuna", vurgu: true },
  { kelime: "dönüşsün." },
];

const GUVENCELER = ["Tek ödeme, abonelik yok", "Uygulama indirmeden, tarayıcıda", "Tablet, telefon ve bilgisayarda"];

export function Hero() {
  const sayilar = [
    { deger: KATALOG_SAYILARI.kitap, ad: "kitap" },
    { deger: KATALOG_SAYILARI.bolum, ad: "sesli bölüm" },
    { deger: MARKA.hedefYas, ad: "yaş için yazıldı" },
    { deger: 0, ad: "reklam, puan ve bildirim" },
  ];

  return (
    <section aria-labelledby="hero-baslik" className="relative overflow-hidden">
      <div className={styles.heroUfku} aria-hidden="true" />
      <AtesBocekleri adet={12} />
      <Image
        src={SITE_ARKAPLANI}
        alt=""
        width={1672}
        height={941}
        priority
        className={`${styles.heroManzarasi} w-full object-cover object-bottom`}
      />

      <RehberAlani>
        <Kap className="relative grid gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-6 xl:col-span-5">
            <p
              className={`${styles.giris} inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-baslik text-sm font-semibold text-murekkep`}
              style={sira(0)}
            >
              <span className="h-2 w-2 rounded-full bg-vurgu shadow-parlama" aria-hidden="true" />
              {MARKA.hedefYas} yaş için sesli ve etkileşimli kıssalar
            </p>

            <h1
              id="hero-baslik"
              aria-label={BASLIK}
              className="mt-6 text-balance font-edebi text-[2.4rem] font-semibold leading-[1.07] tracking-tight text-murekkep sm:text-[3.1rem] lg:text-[3.2rem] xl:text-[3.7rem]"
            >
              <span aria-hidden="true">
                {BASLIK_KELIMELERI.map((parca, i) => (
                  <Fragment key={parca.kelime}>
                    <span className={hareket.kelime} style={sira(i)}>
                      {parca.vurgu ? <em className="font-medium text-vurgu">{parca.kelime}</em> : parca.kelime}
                    </span>
                    {i < BASLIK_KELIMELERI.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            </h1>

            <p
              className={`${styles.giris} mt-6 max-w-xl text-pretty font-govde text-lg leading-relaxed text-murekkep-soluk sm:text-xl`}
              style={sira(4)}
            >
              Peygamberlerin ve Dört Büyük Halife&apos;nin hayatı; {KATALOG_SAYILARI.kitap} kitapta, her biri sesli
              anlatımlı {KATALOG_SAYILARI.bolum} bölümde. Çocuğunuz dinler, okur ve karar verir; siz yolculuğunu veli
              panelinden izlersiniz.
            </p>

            <div className={`${styles.giris} mt-9 flex flex-col gap-3 sm:flex-row`} style={sira(5)}>
              <RehberHedefi className="flex sm:inline-flex">
                <DugmeBaglanti href="#paketler" buyuk tamGenislik parilti>
                  Paketleri İncele
                  <Ikon ad="ok-sag" boyut={20} />
                </DugmeBaglanti>
              </RehberHedefi>
              <DugmeBaglanti href="#nasil-calisir" varyant="hayalet" buyuk>
                Nasıl Çalışır?
              </DugmeBaglanti>
            </div>

            <ul className={`${styles.giris} mt-8 flex flex-wrap gap-x-6 gap-y-2`} style={sira(6)}>
              {GUVENCELER.map((guvence) => (
                <li key={guvence} className="flex items-center gap-2 font-govde text-[0.95rem] font-semibold text-murekkep-soluk">
                  <span className="text-eylem">
                    <Ikon ad="onay" boyut={18} />
                  </span>
                  {guvence}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.giris} relative lg:col-span-6 xl:col-span-7`} style={sira(3)}>
            <CihazSahnesi className="relative mx-auto max-w-[720px] pb-10 pl-6 sm:pl-10 lg:pb-12">
              <Tablet
                gorsel="ana-ekran"
                alt="Çocuğun ana ekranı: kitapların sıralandığı yol, Işıl ve sıradaki bölüm kartı"
                oncelikli
              />
              <Telefon
                gorsel="okuma-telefon"
                alt="Telefonda okuma ekranı: Hz. Musa, Nehre Bırakılan Sandık bölümü"
                oncelikli
                className="absolute bottom-0 left-0 w-[29%] max-w-[210px]"
              />
              <div
                className={`${styles.yuzer} ${styles.altinHale} absolute -right-3 -top-12 w-[19%] max-w-[132px] sm:-right-6`}
                style={{ "--egim": "8deg" } as CSSProperties}
              >
                <div className="transition-transform duration-500 ease-out hover:-rotate-6 hover:scale-110">
                  <Image
                    src={rozetGorseli("musa", 1)}
                    alt="Örnek bölüm rozeti: Vaade Güven Rozeti"
                    width={512}
                    height={512}
                    sizes="132px"
                  />
                </div>
              </div>
            </CihazSahnesi>
            {/* Işıl ekranın dışından uçarak gelir; aşağı inildikçe uzaklaşır ve
                altın yol bölümünde yeniden belirir. */}
            <div className="pointer-events-none absolute -top-8 left-[12%] z-20 sm:-top-7 sm:left-[14%]">
              <RehberIsil giris="soldan" gecikme={0.9} cikisKaydirinca boyut={60} />
            </div>
          </div>
        </Kap>
      </RehberAlani>

      <Kap className="relative pb-16 lg:pb-20">
        <dl className={`${styles.giris} grid grid-cols-2 overflow-hidden rounded-kart border border-white/10 bg-gece-950/40 backdrop-blur-sm lg:grid-cols-4`} style={sira(7)}>
          {sayilar.map((sayi, i) => (
            <div
              key={sayi.ad}
              className={`flex flex-col-reverse gap-1 px-5 py-6 sm:px-8 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${
                i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="font-govde text-[0.95rem] font-semibold text-murekkep-soluk">{sayi.ad}</dt>
              <dd className="font-edebi text-4xl font-semibold text-vurgu sm:text-5xl">
                {typeof sayi.deger === "number" && sayi.deger > 0 ? <Sayac deger={sayi.deger} /> : sayi.deger}
              </dd>
            </div>
          ))}
        </dl>
      </Kap>
    </section>
  );
}
