import { Ikon } from "../ui/Ikon";
import { AtesBocekleri } from "./AtesBocekleri";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import { RehberAlani, RehberHedefi, RehberIsil } from "./hareket/Rehber";
import { DugmeBaglanti, Kap } from "./ortak";
import styles from "./tanitim.module.css";

/**
 * Kapanış: sayfa geceyle açılmıştı, akşamla kapanır. Krem zemin yıldızlı
 * gecenin üstünden çekilir (`.aksam`), ateşböcekleri belirir ve şafakta
 * dinlenmeye giden Işıl sağdan uçarak geri döner. "Paketleri İncele"nin
 * üzerine gelinince düğmeye doğru parıltı saçar.
 */
export function SonCagri() {
  return (
    <section aria-labelledby="son-baslik" className="tema-cocuk zemin-yildizli relative overflow-hidden">
      <div className={styles.aksam} aria-hidden="true" />
      <AtesBocekleri adet={14} className="top-40" />
      <RehberAlani className="pb-24 pt-56 sm:pt-72 lg:pb-32">
        <Kap className="flex flex-col items-center text-center">
          <RehberIsil poz="kutlama" boyut={96} giris="sagdan" />
          <SiraliBelir className="flex w-full flex-col items-center" baslangic={0.6} aralik={0.14} oran={0.3}>
            <SiraliOge>
              <h2
                id="son-baslik"
                className="mt-6 max-w-3xl text-balance font-edebi text-[2.2rem] font-semibold leading-[1.1] tracking-tight text-murekkep sm:text-[3rem] lg:text-[3.5rem]"
              >
                Bu akşam ilk bölümü <em className="font-medium text-vurgu">birlikte</em> okuyun.
              </h2>
            </SiraliOge>
            <SiraliOge>
              <p className="mt-5 max-w-xl text-pretty font-govde text-lg leading-relaxed text-murekkep-soluk sm:text-xl">
                İlk bölüm yaklaşık on dakika sürer. Gerisini çocuğunuzun merakı getirir.
              </p>
            </SiraliOge>
            <SiraliOge className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <RehberHedefi className="flex sm:inline-flex">
                <DugmeBaglanti href="#paketler" buyuk tamGenislik parilti>
                  Paketleri İncele
                  <Ikon ad="ok-sag" boyut={20} />
                </DugmeBaglanti>
              </RehberHedefi>
              <DugmeBaglanti href="/login" varyant="hayalet" buyuk>
                Giriş Yap
              </DugmeBaglanti>
            </SiraliOge>
          </SiraliBelir>
        </Kap>
      </RehberAlani>
    </section>
  );
}
