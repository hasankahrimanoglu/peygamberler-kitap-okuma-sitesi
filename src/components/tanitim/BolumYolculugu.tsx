import { bolumOrnegi, sozlukOrnegi } from "../../lib/tanitim/ornekIcerik";
import { rozetGorseli } from "../../lib/varlikYollari";
import { Ikon } from "../ui/Ikon";
import { AltinYol, type YolAdimi } from "./AltinYol";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import { BolumBasligi, Kap, Tablet } from "./ortak";
import { RozetAni } from "./RozetAni";
import { SozlukOrnegi } from "./SozlukOrnegi";

/**
 * "Bir bölüm nasıl ilerler?" — sayfanın hatırlanacak öğesi: okuma ekranındaki
 * adım çubuğunun büyütülmüş hâli; ray ve Işıl'ın hareketi `AltinYol`da. Bölüm
 * akışı PROJE-MODELI 15 Tem 2026 kararını izler; örnekler gerçek Hz. Âdem
 * verisidir.
 */
export function BolumYolculugu() {
  const sozluk = sozlukOrnegi("adem", 1, "emanet");
  const ornekBolum = bolumOrnegi("adem", 2);

  const adimlar: YolAdimi[] = [
    {
      baslik: "Dinle ya da kendin oku",
      metin:
        "Her bölüm sıcak bir sesle seslendirildi. Çocuk dilerse dinleyerek takip eder, dilerse kendisi okur; yazı boyutunu kendine göre ayarlar. Metin her zaman göz yormayan açık bir zeminde durur.",
      gorsel: (
        <Tablet gorsel="okuma-tablet" alt="Okuma ekranı: bölüm görseli, adım çubuğu, Dinle düğmesi ve bölümün rozeti" />
      ),
    },
    {
      baslik: "Zor kelimede yalnız kalmaz",
      metin:
        "Yeşil kelimeye dokunduğunda rehberi Işıl, anlam kartını getirir. Öğrendiği her kelime “Kelimelerim” defterinde birikir.",
      gorsel: sozluk ? <SozlukOrnegi {...sozluk} /> : null,
    },
    {
      baslik: "Sen olsaydın?",
      metin:
        "Hikâyenin dönüm noktasında karar çocuğa bırakılır. Seçim yapılmadan hikâye devam etmez; doğru cevap da o anda söylenmez. Bölüm sonunda çocuk kendi seçimini kıssayla karşılaştırır.",
      gorsel: (
        <Tablet
          gorsel="sen-olsaydin"
          alt="“Sen olsaydın?” sorusu: üç seçenek ve “Seçimim bu” düğmesi"
        />
      ),
    },
    {
      baslik: "Ne öğrendik, bugüne taşı",
      metin:
        "Bölüm üç kısa çıkarımla toplanır. Bazı bölümlerde, değeri günlük hayata taşıyan gönüllü bir görev önerilir; çocuk isterse listesine ekler. Görevin puanı ya da ödülü yoktur.",
      gorsel: ornekBolum ? <OgrendikKarti {...ornekBolum} /> : null,
    },
    {
      baslik: "Rozetini al",
      metin:
        "Her bölümün kendine özel bir rozeti var. Rozet kazanılınca sıradaki bölüm açılır; kitap bitince Büyük Final Testi ve kitabın madalyası gelir.",
      gorsel: ornekBolum ? <RozetAni rozetAdi={ornekBolum.rozetAdi} gorsel={rozetGorseli("adem", 2)} /> : null,
    },
  ];

  return (
    <section aria-labelledby="yolculuk-baslik" className="py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="yolculuk-baslik"
          ust="Bir bölüm nasıl ilerler?"
          baslik="Her bölüm, adım adım açılan bir yol"
          aciklama="Bölümler tek sayfada, sakin bir akışla ilerler. Çocuk nerede olduğunu okuma ekranındaki adım çubuğundan her an görür."
        />

        <AltinYol adimlar={adimlar} />
      </Kap>
    </section>
  );
}

/** Bölüm sonu: "Ne öğrendik?" + koşullu görev kartı (okuma ekranının sade hâli). */
function OgrendikKarti({
  ogrendiklerimiz,
  gorev,
}: NonNullable<ReturnType<typeof bolumOrnegi>>) {
  return (
    <div className="tema-veli rounded-kart bg-okuma-yuzey p-6 shadow-kart-gece sm:p-8">
      <p className="font-baslik text-xl font-extrabold text-murekkep">Ne öğrendik?</p>
      <SiraliBelir etiket="ul" className="mt-4 space-y-3" baslangic={0.35} aralik={0.16} oran={0.4}>
        {ogrendiklerimiz.map((madde) => (
          <SiraliOge
            key={madde}
            etiket="li"
            yon="sol"
            className="flex gap-3 font-govde text-[1.02rem] leading-relaxed text-murekkep"
          >
            <span className="mt-1 shrink-0 text-vurgu">
              <Ikon ad="yildiz" boyut={18} />
            </span>
            {madde}
          </SiraliOge>
        ))}
      </SiraliBelir>

      {gorev ? (
        <div className="mt-6 rounded-2xl border border-[color-mix(in_srgb,var(--eylem)_25%,transparent)] bg-eylem-yumusak p-5">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-baslik text-sm font-bold text-eylem">
            <Ikon ad="gorev" boyut={16} />
            Bugüne Taşı · {gorev.sure}
          </p>
          <p className="mt-2 font-baslik text-xl font-extrabold text-murekkep">{gorev.ad}</p>
          <p className="mt-1 font-govde leading-relaxed text-murekkep">{gorev.aciklama}</p>
          {/* Görsel örnek: gerçek düğmeler değil. */}
          <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
            <span className="inline-flex h-11 items-center rounded-buton bg-eylem px-4 font-baslik text-[0.95rem] font-bold text-eylem-metin">
              Görevi Listeme Ekle
            </span>
            <span className="inline-flex h-11 items-center rounded-buton border border-cizgi px-4 font-baslik text-[0.95rem] font-semibold text-murekkep">
              Şimdilik Değil
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
