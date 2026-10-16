import { Ikon, type IkonAdi } from "../ui/Ikon";
import { CizgiCizer, SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import styles from "./tanitim.module.css";

/** Ürünün değer önerisi: okuma → düşünme → uygulama → aile içi konuşma. */
const DONGU: { ikon: IkonAdi; fiil: string; metin: string }[] = [
  {
    ikon: "kitap",
    fiil: "Okur",
    metin: "Kıssayı kendi hızında okur ya da sesli anlatımla dinler. Zor kelimelerin anlamı tek dokunuşla açılır.",
  },
  {
    ikon: "dusunce",
    fiil: "Düşünür",
    metin: "Hikâyenin dönüm noktasında “Sen olsaydın?” sorusuyla karşılaşır ve kendi kararını verir.",
  },
  {
    ikon: "fidan",
    fiil: "Uygular",
    metin: "Bazı bölümler, kıssadaki değeri günlük hayata taşıyan küçük ve gönüllü bir görevle biter.",
  },
  {
    ikon: "kalp",
    fiil: "Konuşur",
    metin: "Veli panelindeki sohbet önerileri, kıssa üzerine evde konuşmayı kolaylaştırır.",
  },
];

export function Dongu() {
  return (
    <section id="nasil-calisir" aria-labelledby="dongu-baslik" className="scroll-mt-20 py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="dongu-baslik"
          ust="Neden farklı?"
          baslik="Okumakla bitmeyen bir yolculuk"
          aciklama="Her bölüm aynı döngüyle ilerler: kıssa önce çocuğun aklına, sonra gününe, en sonunda da evdeki sohbete taşınır."
        />

        <div className="relative mt-14 lg:mt-16">
          {/* Noktalı izin üzerinde gezinen ışık: döngünün sürdüğünü anlatır. */}
          <div className={`${hareket.donguYolu} hidden lg:block`} aria-hidden="true">
            <span className={hareket.donguIsigi} />
          </div>
          <SiraliBelir etiket="ol" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" aralik={0.18} oran={0.3}>
            {DONGU.map((adim, i) => (
              <SiraliOge key={adim.fiil} etiket="li" className="relative">
                {i < DONGU.length - 1 ? (
                  <CizgiCizer className={`${styles.donguBaglantisi} hidden lg:block`} sure={1.2} />
                ) : null}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--vurgu)_60%,transparent)] bg-white/5 text-vurgu transition-transform duration-500 ease-out hover:-rotate-6 hover:scale-110">
                    <Ikon ad={adim.ikon} boyut={26} />
                  </span>
                  <p className="font-edebi text-[1.9rem] font-semibold leading-none text-murekkep">
                    <span className="mr-2 align-top font-baslik text-sm font-bold text-vurgu">{i + 1}</span>
                    {adim.fiil}
                  </p>
                </div>
                <p className="mt-4 max-w-sm font-govde text-[1.05rem] leading-relaxed text-murekkep-soluk">{adim.metin}</p>
              </SiraliOge>
            ))}
          </SiraliBelir>
        </div>
      </Kap>
    </section>
  );
}
