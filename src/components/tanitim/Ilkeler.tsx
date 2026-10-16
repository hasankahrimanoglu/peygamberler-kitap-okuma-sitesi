import { MARKA } from "../../data/marka";
import { Ikon, type IkonAdi } from "../ui/Ikon";
import { CizgiCizer, SiraliBelir, SiraliOge } from "./hareket/Belir";
import { BolumBasligi, Kap } from "./ortak";

/**
 * Güven bölümü. Her madde projede uygulanan bir kurala karşılık gelir
 * (kaynak sınıfları ve denetim, tasvir kuralı 6.4, baskısız tasarım, yaş dili);
 * burada olmayan bir şey vaat edilmez.
 */
const ILKELER: { ikon: IkonAdi; baslik: string; metin: string }[] = [
  {
    ikon: "kitap",
    baslik: "Kaynağa sadık anlatım",
    metin:
      "Kıssalar Kur'an-ı Kerim ve güvenilir kaynaklar esas alınarak yazıldı; her kitap yayından önce kaynak denetiminden geçer. Kesin olmayan bilgi kesinmiş gibi anlatılmaz, rivayetler ayrıca belirtilir.",
  },
  {
    ikon: "fener",
    baslik: "Saygılı görsel dil",
    metin:
      "Hiçbir görselde yüz gösterilmez. Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir biçimde resmedilmez.",
  },
  {
    ikon: "kalp",
    baslik: "Baskı yok",
    metin:
      "Puan, günlük seri, sıralama ve bildirim yoktur. Çocuğu ekrana bağlamak için tasarlanmış bir düzenek bulunmaz; okuma süresine aile karar verir.",
  },
  {
    ikon: "onay",
    baslik: "Reklamsız",
    metin: "Hiçbir ekranda reklam, dış bağlantı ya da satın alma teklifi yer almaz.",
  },
  {
    ikon: "dusunce",
    baslik: `${MARKA.hedefYas} yaşın dili`,
    metin:
      "Metinler bu yaş için yazıldı: kısa cümleler, açık anlatım. Hassas konular korkutmadan, doğru bilgiyle ve sakin bir dille ele alınır.",
  },
  {
    ikon: "hesap",
    baslik: "Güvenli alan",
    metin:
      "Çocuk hesabını veli açar. Mesajlaşma, yorum ya da başka kullanıcılarla etkileşim yoktur; çocuk yalnızca kendi yolculuğunu görür.",
  },
];

export function Ilkeler() {
  return (
    <section aria-labelledby="ilke-baslik" className="tema-veli border-y border-cizgi bg-yuzey-2 py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="ilke-baslik"
          ust="İlkelerimiz"
          baslik="Gönül rahatlığıyla okunsun diye"
          aciklama="Bir çocuğa peygamberlerin hayatını anlatmak özen ister. Her kitapta aynı kurallara bağlı kalıyoruz."
        />

        <SiraliBelir etiket="ul" className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aralik={0.1} oran={0.15}>
          {ILKELER.map((ilke) => (
            <SiraliOge key={ilke.baslik} etiket="li">
              <CizgiCizer className="h-0.5 bg-murekkep" />
              <span className="mt-6 block text-vurgu">
                <Ikon ad={ilke.ikon} boyut={26} />
              </span>
              <h3 className="mt-4 font-edebi text-[1.55rem] font-semibold leading-snug text-murekkep">{ilke.baslik}</h3>
              <p className="mt-2 font-govde text-[1.02rem] leading-relaxed text-murekkep-soluk">{ilke.metin}</p>
            </SiraliOge>
          ))}
        </SiraliBelir>
      </Kap>
    </section>
  );
}
