import Image from "next/image";
import { KATALOG_SAYILARI, YAYINDAKI_GRUPLAR, YOLUN_DEVAMI, yayindakilerdenSec } from "../../data/katalogSayilari";
import { kitapKapagi } from "../../lib/varlikYollari";
import { Ikon } from "../ui/Ikon";
import { Belir, SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import styles from "./tanitim.module.css";

/**
 * Kitap listesi elle yazılmaz; yalnız yayındaki kitaplar `katalogSayilari.ts`
 * üzerinden okunur (REVİZE 21 Eki 2026 — lansman 12 kitap).
 *
 * Raf: kapak tasarımına değil kitaba göre seçilir (KARAR 21 Eki 2026 — Hasan;
 * kapaklar sonra aynı adla yenilenir). İlk insan Hz. Âdem, ulü'l-azm
 * peygamberlerden Hz. Nûh, Hz. İbrahim, Hz. Musa, Hz. Îsâ ve çocukların en
 * çok tanıdığı kıssalardan Hz. Yusuf, Hz. Süleyman. Listeden yayında
 * olmayan çıkar, yerine yayındaki başka kitap girer; raf katalog sırasıyla dizilir.
 */
const RAF = ["adem", "nuh", "ibrahim", "yusuf", "musa", "suleyman", "isa"];

export function Kutuphane() {
  const raf = yayindakilerdenSec(RAF, RAF.length).sort((a, b) => a.order - b.order);
  const tekGrup = YAYINDAKI_GRUPLAR.length === 1;

  return (
    <section id="kutuphane" aria-labelledby="kutuphane-baslik" className="tema-veli scroll-mt-16 bg-zemin py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="kutuphane-baslik"
          ust="Kütüphane"
          baslik={`${KATALOG_SAYILARI.kitap} kitap, ${KATALOG_SAYILARI.bolum} bölüm, tek bir yolculuk`}
          aciklama="Yolculuk Hz. Âdem'le başlar; kitaplar tarih sırasıyla tek bir rotada dizilir. Çocuk dilediği kitaptan başlayabilir."
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
            {YAYINDAKI_GRUPLAR.map((grup, i) => (
              <SiraliOge key={grup.ad} className={tekGrup ? "lg:col-span-12" : i === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="border-b border-cizgi pb-3 font-baslik text-[1.05rem] font-bold text-murekkep">
                  {grup.ad}
                  <span className="ml-2 font-semibold text-vurgu">{grup.kitaplar.length} kitap</span>
                </h3>
                <ol className={`mt-4 gap-x-8 ${tekGrup ? "sm:columns-2 lg:columns-3" : i === 0 ? "sm:columns-2" : ""}`}>
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
            {/* Yolun devamı: tarih ve sayı vermez; bütün kitaplar yayına girince kendiliğinden kalkar. */}
            {YOLUN_DEVAMI ? (
              <SiraliOge className="flex gap-4 rounded-2xl bg-zemin p-5 sm:p-6 lg:col-span-12">
                {/* Telefonda ikon gizlenir: metin dar bir sütuna sıkışmasın. */}
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vurgu-yumusak text-vurgu sm:flex">
                  <Ikon ad="kitap" boyut={22} />
                </span>
                <div>
                  <p className="font-baslik text-[1.05rem] font-bold text-murekkep">Yolun devamı hazırlanıyor</p>
                  <p className="mt-1 font-govde leading-relaxed text-murekkep-soluk">{YOLUN_DEVAMI}</p>
                </div>
              </SiraliOge>
            ) : null}
          </SiraliBelir>
        </Belir>
      </Kap>
    </section>
  );
}
