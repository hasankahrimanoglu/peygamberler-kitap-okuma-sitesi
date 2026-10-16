import Image from "next/image";
import { atlasRegions } from "../../data/atlasCatalog";
import { KATALOG_SAYILARI } from "../../data/katalogSayilari";
import { kitapKapagi } from "../../lib/varlikYollari";
import { Belir, SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import styles from "./tanitim.module.css";

/**
 * Kitap listesi elle yazılmaz; `atlasCatalog.ts`'ten okunur. Arayüzde
 * bölgeler gösterilmediği için (PROJE-MODELI 3.10.1) burada da bölge adı yok;
 * velinin anlayacağı üç grup kullanılır.
 *
 * Raftaki kapaklar: kapak görseli hazır olan kitaplar. Yeni kapak geldikçe
 * `RAF` listesine eklenir.
 */
const RAF = ["adem", "sit", "idris", "nuh", "hud", "salih", "musa"];

const GRUPLAR = [
  { ad: "Peygamberler", bolgeler: ["ilk-izler", "bereketli-aile", "sabir-cesaret", "hikmet-saraylari", "umut-isiklari"] },
  { ad: "Sevgili Peygamberimiz Hz. Muhammed (s.a.v.)", bolgeler: ["rahmet-yolculugu"] },
  { ad: "Dört Büyük Halife", bolgeler: ["dort-dost"] },
];

export function Kutuphane() {
  const tumKitaplar = atlasRegions.flatMap((bolge) => bolge.books);
  const raf = RAF.map((anahtar) => tumKitaplar.find((kitap) => kitap.key === anahtar)).filter(
    (kitap) => kitap !== undefined,
  );
  const gruplar = GRUPLAR.map((grup) => ({
    ad: grup.ad,
    kitaplar: atlasRegions
      .filter((bolge) => grup.bolgeler.includes(bolge.id))
      .flatMap((bolge) => bolge.books)
      .sort((a, b) => a.order - b.order),
  }));

  return (
    <section id="kutuphane" aria-labelledby="kutuphane-baslik" className="tema-veli scroll-mt-16 bg-zemin py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="kutuphane-baslik"
          ust="Kütüphane"
          baslik={`${KATALOG_SAYILARI.kitap} kitap, ${KATALOG_SAYILARI.bolum} bölüm, tek bir yolculuk`}
          aciklama="Hz. Âdem'den başlayan yol, Sevgili Peygamberimiz'in hayatı ve Dört Büyük Halife ile tamamlanır. Kitaplar tarih sırasıyla tek bir rotada dizilir; çocuk dilediği kitaptan başlayabilir."
        />
      </Kap>

      <div className="mt-12 lg:mt-14">
        {/* Kapaklar raftan sırayla yükselir; fareyle üzerine gelince kitap raftan çekilir gibi öne eğilir. */}
        <SiraliBelir
          etiket="ul"
          className={`${styles.raf} mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 pb-8 pt-4 sm:px-6 lg:justify-between lg:overflow-visible lg:px-8`}
          aralik={0.08}
          oran={0.25}
        >
          {raf.map((kitap) => (
            <SiraliOge
              key={kitap.key}
              etiket="li"
              sure={0.9}
              className={`${hareket.kitap} w-[138px] shrink-0 sm:w-[150px] lg:w-[12.5%]`}
            >
              <div className={`${hareket.kitapKapagi} relative aspect-[2/3] overflow-hidden rounded-lg shadow-kart`}>
                <Image
                  src={kitapKapagi(kitap.key)}
                  alt={`${kitap.title} kitabının kapağı`}
                  fill
                  sizes="(min-width: 1024px) 160px, 150px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-baslik text-[1.05rem] font-bold text-murekkep">{kitap.title}</p>
              <p className="font-govde text-sm text-murekkep-soluk">{kitap.chapterCount} bölüm</p>
            </SiraliOge>
          ))}
        </SiraliBelir>
      </div>

      <Kap className="mt-10">
        <Belir sure={1} oran={0.1}>
          <SiraliBelir
            className="grid gap-10 rounded-kart border border-cizgi bg-yuzey p-6 shadow-kart sm:p-10 lg:grid-cols-12 lg:gap-12"
            baslangic={0.25}
            aralik={0.15}
            oran={0.1}
          >
            {gruplar.map((grup, i) => (
              <SiraliOge key={grup.ad} className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="border-b border-cizgi pb-3 font-baslik text-[1.05rem] font-bold text-murekkep">
                  {grup.ad}
                  <span className="ml-2 font-semibold text-vurgu">{grup.kitaplar.length} kitap</span>
                </h3>
                <ol className={`mt-4 gap-x-8 ${i === 0 ? "sm:columns-2" : ""}`}>
                  {grup.kitaplar.map((kitap) => (
                    <li
                      key={kitap.key}
                      className="flex break-inside-avoid items-baseline justify-between gap-3 border-b border-dashed border-cizgi py-2.5"
                    >
                      <span className="font-edebi text-[1.08rem] font-medium text-murekkep">
                        {kitap.title.replace(/^Hz\. Muhammed — /, "")}
                      </span>
                      <span className="shrink-0 font-govde text-sm tabular-nums text-murekkep-soluk">
                        {kitap.chapterCount} bölüm
                      </span>
                    </li>
                  ))}
                </ol>
              </SiraliOge>
            ))}
          </SiraliBelir>
        </Belir>
      </Kap>
    </section>
  );
}
