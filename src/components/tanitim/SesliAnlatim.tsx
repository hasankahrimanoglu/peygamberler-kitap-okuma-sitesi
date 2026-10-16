import { KATALOG_SAYILARI } from "../../data/katalogSayilari";
import { bolumOrnegi } from "../../lib/tanitim/ornekIcerik";
import { sesliAnlatim } from "../../lib/varlikYollari";
import { Ikon } from "../ui/Ikon";
import { AtesBocekleri } from "./AtesBocekleri";
import { Belir, SiraliBelir, SiraliOge } from "./hareket/Belir";
import { BolumBasligi, Kap } from "./ortak";
import { SesOrnegi } from "./SesOrnegi";
import styles from "./tanitim.module.css";

const OZELLIKLER = [
  "Her bölümün başında, tek dokunuşla",
  "İstediği an durdurur, kaldığı yerden sürdürür",
  "Okuma ekranından ayrılmadan, metinle birlikte",
];

/** Sesli anlatım — öne çıkan özellik (KARAR 15 Eki 2026, Hasan). */
export function SesliAnlatim() {
  const ornek = bolumOrnegi("adem", 1);

  return (
    <section aria-labelledby="ses-baslik" className="relative overflow-hidden py-20 lg:py-28">
      <div className={styles.sesHalkalari} aria-hidden="true" />
      <AtesBocekleri adet={6} />
      <Kap className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <BolumBasligi
            id="ses-baslik"
            ust="Sesli anlatım"
            baslik={`${KATALOG_SAYILARI.bolum} bölümün her biri sesli`}
            aciklama="Okumayı yeni söken de, okumayı seven de aynı keyifle ilerler. Çocuk dinlerken metni gözüyle takip eder; ses ve yazı birbirini destekler."
          />
          <SiraliBelir etiket="ul" className="mt-8 space-y-3" baslangic={0.3} oran={0.5}>
            {OZELLIKLER.map((ozellik) => (
              <SiraliOge
                key={ozellik}
                etiket="li"
                yon="sol"
                className="flex items-center gap-3 font-govde text-[1.05rem] font-semibold text-murekkep"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vurgu-yumusak text-vurgu">
                  <Ikon ad="ses" boyut={16} />
                </span>
                {ozellik}
              </SiraliOge>
            ))}
          </SiraliBelir>
        </div>

        <Belir yon="sag" sure={1} className="lg:col-span-6 lg:col-start-7">
          <SesOrnegi
            kaynak={sesliAnlatim("adem", 1)}
            ustSatir="Örnek bölüm · Hz. Âdem · 1. bölüm"
            baslik={ornek?.baslik ?? "Beklenen Misafir"}
          />
        </Belir>
      </Kap>
    </section>
  );
}
