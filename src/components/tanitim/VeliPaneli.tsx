import Image from "next/image";
import { unvanAnahtari, unvanFromBookCount } from "../../lib/derive";
import { bolumOrnegi, veliRaporuOrnegi } from "../../lib/tanitim/ornekIcerik";
import { avatarGorseli, kitapKapagi, rozetGorseli, unvanGorseli } from "../../lib/varlikYollari";
import { Ikon, type IkonAdi } from "../ui/Ikon";
import { Belir, DolanCubuk, SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import { SafakBandi } from "./SafakBandi";

const MADDELER: { ikon: IkonAdi; baslik: string; metin: string }[] = [
  {
    ikon: "hesap",
    baslik: "Her çocuğa ayrı profil",
    metin: "Kardeşlerin ilerlemesi birbirine karışmaz; her çocuk kendi yolunda, kendi hızında ilerler.",
  },
  {
    ikon: "kitap",
    baslik: "Gelişim raporu",
    metin: "Okunan kitaplar, kazanılan ödüller ve kıssalarda öne çıkan değerler tek sayfada.",
  },
  {
    ikon: "dusunce",
    baslik: "Sohbet önerileri",
    metin: "Her kitap için evde sorabileceğiniz sorular ve “Çocuğunuz sorarsa” notları.",
  },
  {
    ikon: "gorev",
    baslik: "Görev takibi",
    metin: "Çocuğun listesine eklediği görevleri ve durumlarını görürsünüz; tamamlamak onun kararıdır.",
  },
];

// Örnek panel: Hz. Musa'nın 6. bölümünü bitirmiş, üç kitabı tamamlamış bir çocuk.
const ORNEK = { ad: "Elif", avatar: "avatar-3", bitenKitap: 3, kitap: "musa", kitapAdi: "Hz. Musa", okunan: 6, toplam: 10 };

/**
 * Veli tarafı: krem dünya. Üstteki şafak bandı gece bölümlerinden geçişi yapar
 * (güneş doğar, Işıl dinlenmeye gider). Panel örneği parça parça kurulur:
 * çocuk kartı, dolan ilerleme çubuğu, son rozet, ardından üstüne binen rapor.
 */
export function VeliPaneli() {
  return (
    <section id="veliler" aria-labelledby="veli-baslik" className="tema-veli scroll-mt-16">
      <SafakBandi />
      <div className="bg-zemin pb-20 pt-6 lg:pb-28">
        <Kap className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <BolumBasligi
              id="veli-baslik"
              ust="Veliler için"
              baslik="Yolculuğu sakin bir panelden izleyin"
              aciklama="Veli paneli çocuğu derecelendirmez. Neyi okuduğunu, hangi değerlerle tanıştığını ve evde neler konuşabileceğinizi gösterir."
            />
            <SiraliBelir etiket="ul" className="mt-10 space-y-6" aralik={0.12} oran={0.3}>
              {MADDELER.map((madde) => (
                <SiraliOge key={madde.baslik} etiket="li" className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-buton bg-eylem-yumusak text-eylem">
                    <Ikon ad={madde.ikon} boyut={22} />
                  </span>
                  <div>
                    <p className="font-baslik text-lg font-bold text-murekkep">{madde.baslik}</p>
                    <p className="mt-0.5 font-govde leading-relaxed text-murekkep-soluk">{madde.metin}</p>
                  </div>
                </SiraliOge>
              ))}
            </SiraliBelir>
          </div>

          <div className="relative lg:col-span-7">
            <PanelOrnegi />
          </div>
        </Kap>
      </div>
    </section>
  );
}

function PanelOrnegi() {
  const unvan = unvanFromBookCount(ORNEK.bitenKitap);
  const sonBolum = bolumOrnegi(ORNEK.kitap, ORNEK.okunan);
  const gorev = bolumOrnegi(ORNEK.kitap, 5)?.gorev ?? null;
  const rapor = veliRaporuOrnegi("adem");
  const yuzde = Math.round((ORNEK.okunan / ORNEK.toplam) * 100);

  return (
    <div className="relative" aria-label="Örnek veli paneli görünümü" role="img">
      {/* Çocuk kartı — alttaki boşluk, üstüne binen rapor kartının yeridir. */}
      <Belir yon="sag" sure={1} oran={0.25} className="lg:mr-14">
        <div className={`${hareket.yukselenKart} rounded-kart border border-cizgi bg-yuzey p-5 pb-20 shadow-kart sm:p-7 sm:pb-24`}>
          <div className="flex items-center gap-4">
            <Image
              src={avatarGorseli(ORNEK.avatar)}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border-2 border-vurgu object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-baslik text-2xl font-extrabold text-murekkep">{ORNEK.ad}</p>
              <p className="flex items-center gap-1.5 font-baslik text-sm font-bold text-vurgu">
                <Image src={unvanGorseli(unvanAnahtari(unvan))} alt="" width={22} height={22} />
                {unvan}
              </p>
            </div>
            <span className="hidden rounded-full bg-yuzey-2 px-3 py-1 font-baslik text-sm font-semibold text-murekkep-soluk sm:inline-flex">
              Son okuma: dün
            </span>
          </div>

          <div className="mt-6 flex gap-4 rounded-2xl bg-zemin p-4">
            <Image
              src={kitapKapagi(ORNEK.kitap)}
              alt=""
              width={60}
              height={90}
              className="h-[90px] w-[60px] shrink-0 rounded-md object-cover shadow-kart"
            />
            <div className="min-w-0 flex-1">
              <p className="font-govde text-sm font-semibold text-murekkep-soluk">Okuduğu kitap</p>
              <p className="font-baslik text-xl font-extrabold text-murekkep">{ORNEK.kitapAdi}</p>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cizgi">
                <DolanCubuk oran={yuzde} className="rounded-full bg-eylem" />
              </div>
              <p className="mt-1.5 font-govde text-sm font-semibold text-murekkep-soluk">
                {ORNEK.toplam} bölümün {ORNEK.okunan}&apos;sı okundu
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sonBolum ? (
              <div className="flex items-center gap-3 rounded-2xl border border-cizgi p-3">
                <Belir yon="olcek" gecikme={0.9} className="shrink-0">
                  <Image src={rozetGorseli(ORNEK.kitap, ORNEK.okunan)} alt="" width={48} height={48} />
              </Belir>
              <div className="min-w-0">
                <p className="font-govde text-xs font-semibold text-murekkep-soluk">Son rozet</p>
                <p className="font-baslik text-[0.95rem] font-bold leading-tight text-murekkep">{sonBolum.rozetAdi}</p>
              </div>
            </div>
          ) : null}
          {gorev ? (
            <div className="flex items-center gap-3 rounded-2xl border border-cizgi p-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-eylem-yumusak text-eylem">
                <Ikon ad="gorev" boyut={22} />
              </span>
              <div className="min-w-0">
                <p className="font-govde text-xs font-semibold text-murekkep-soluk">Güncel görev · Listesinde</p>
                <p className="font-baslik text-[0.95rem] font-bold leading-tight text-murekkep">{gorev.ad}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      </Belir>

      {/* Gelişim raporu kartı — çocuk kartının alt boşluğuna biner, içeriği örtmez */}
      {rapor ? (
        <Belir gecikme={0.45} sure={1} oran={0.4} className="relative -mt-14 ml-4 sm:-mt-16 sm:ml-16 lg:-mr-2 lg:ml-24">
          <div className={`${hareket.yukselenKart} rounded-kart border border-cizgi bg-yuzey p-5 shadow-kart sm:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-baslik text-lg font-extrabold text-murekkep">Gelişim Raporu · {rapor.kitap}</p>
              <span className="rounded-full bg-vurgu-yumusak px-3 py-1 font-baslik text-xs font-bold text-murekkep">
                Genel Bakış
              </span>
            </div>
            <p className="mt-2 line-clamp-3 font-govde text-[0.98rem] leading-relaxed text-murekkep-soluk">{rapor.ozet}</p>
            {rapor.sohbetSorusu ? (
              <p className="mt-3 flex gap-2 border-t border-cizgi pt-3 font-govde text-[0.95rem] font-semibold leading-snug text-murekkep">
                <span className="mt-0.5 shrink-0 text-eylem">
                  <Ikon ad="dusunce" boyut={18} />
                </span>
                <span className="line-clamp-2">Sohbet önerisi: “{rapor.sohbetSorusu}”</span>
              </p>
            ) : null}
          </div>
        </Belir>
      ) : null}
    </div>
  );
}
