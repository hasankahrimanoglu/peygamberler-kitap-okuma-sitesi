import Link from "next/link";
import type { ReactNode } from "react";
import { IPTAL_IADE } from "../../data/yasal";
import { KATALOG_SAYILARI } from "../../data/katalogSayilari";
import { MARKA } from "../../data/marka";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import hareket from "./hareket/hareket.module.css";
import { BolumBasligi, Kap } from "./ortak";
import styles from "./tanitim.module.css";

const SORULAR: { soru: string; cevap: ReactNode }[] = [
  {
    soru: "Hangi yaş grubu için uygun?",
    cevap: `Metinler ${MARKA.hedefYas} yaş için yazıldı. Okumayı yeni söken çocuklar sesli anlatımla birlikte rahatça takip eder; daha büyükler kendi başına okur.`,
  },
  {
    soru: "Kaç çocuk kullanabilir?",
    cevap:
      "Satın aldığınız paketteki profil sayısı kadar. Her çocuğun kendi profili, kendi ilerlemesi ve kendi ödülleri olur; kardeşlerin yolculuğu birbirine karışmaz.",
  },
  {
    soru: "Hangi cihazlarda çalışır? Uygulama indirmem gerekir mi?",
    cevap:
      "Tablet, telefon ve bilgisayarda internet tarayıcısından açılır; uygulama indirmeniz gerekmez. Tasarım önce tablet için yapıldı, telefonda da tek sütun hâlinde rahatça okunur. İnternet bağlantısı gerekir.",
  },
  {
    soru: "İçerik hangi kaynaklara dayanıyor?",
    cevap:
      "Kıssalar Kur'an-ı Kerim ve güvenilir kaynaklar esas alınarak yazıldı ve her kitap yayından önce kaynak denetiminden geçti. Kaynaklarda kesin olmayan ayrıntılar kesinmiş gibi anlatılmaz; rivayetler ayrıca belirtilir.",
  },
  {
    soru: "Peygamberler görsellerde gösteriliyor mu?",
    cevap:
      "Hiçbir görselde yüz gösterilmez. Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir biçimde resmedilmez. Görseller mekânı, doğayı ve olayın atmosferini anlatır.",
  },
  {
    soru: "Bir bölüm ne kadar sürer?",
    cevap: `Bölümler kısa tutuldu; çoğu tek oturumda, yaklaşık 10–15 dakikada okunur. ${KATALOG_SAYILARI.kitap} kitabın tamamında ${KATALOG_SAYILARI.bolum} bölüm var. Günlük hedef ya da seri olmadığı için çocuk kendi hızında ilerler.`,
  },
  {
    soru: "Abonelik mi, tek ödeme mi?",
    cevap:
      "Tek ödeme. Abonelik ve otomatik yenileme yoktur; paketiniz için süre sınırı da yoktur. Ödeme Shopier altyapısıyla alınır, kart bilgileriniz bize ulaşmaz.",
  },
  {
    soru: "Satın aldıktan sonra nasıl başlarım?",
    cevap:
      "Ödeme onaylanınca giriş bilgileriniz e-posta adresinize gelir. Veli paneline girip çocuk profillerini oluşturursunuz; çocuğunuz kendi kullanıcı adıyla girip ilk bölüme başlar.",
  },
  {
    soru: "İade edebilir miyim?",
    cevap: (
      <>
        Dijital içerik ödemeyle birlikte hemen kullanıma açıldığı için cayma hakkı bulunmaz. Erişim sorunu çözülemezse
        veya mükerrer ödeme olursa iade yapılır. Ayrıntılar{" "}
        <Link href={IPTAL_IADE.yol} className="font-semibold text-murekkep underline underline-offset-2">
          İptal ve İade Koşulları
        </Link>{" "}
        sayfasında.
      </>
    ),
  },
];

export function Sss() {
  return (
    <section id="sss" aria-labelledby="sss-baslik" className="tema-veli scroll-mt-16 bg-zemin py-20 lg:py-28">
      <Kap className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <BolumBasligi
              id="sss-baslik"
              ust="Sık sorulanlar"
              baslik="Aklınızdaki sorular"
              aciklama={
                <>
                  Burada cevabını bulamadığınız bir soru için{" "}
                  <span className="font-semibold text-murekkep">{MARKA.iletisimEposta}</span> adresine yazabilirsiniz.
                </>
              }
            />
          </div>
        </div>

        <SiraliBelir className="lg:col-span-8" aralik={0.06} oran={0.1}>
          {SORULAR.map((madde) => (
            <SiraliOge key={madde.soru}>
              <details className={`${styles.soru} ${hareket.soru} group border-b border-cizgi`}>
                <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-6 py-4 font-baslik text-lg font-bold text-murekkep sm:text-xl">
                  <span className={hareket.soruBasligi}>{madde.soru}</span>
                  <span
                    className={`${styles.soruIsareti} flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cizgi font-govde text-2xl font-light leading-none text-vurgu`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className={`${hareket.soruCevabi} pb-6 pr-12 font-govde text-[1.05rem] leading-relaxed text-murekkep-soluk`}>
                  {madde.cevap}
                </div>
              </details>
            </SiraliOge>
          ))}
        </SiraliBelir>
      </Kap>
    </section>
  );
}
