import Link from "next/link";
import { MESAFELI_SATIS, ON_BILGILENDIRME } from "../../data/yasal";
import { PAKET_ORTAK_OZELLIKLER, PAKETLER, tlBicimi, type Paket } from "../../data/paketler";
import { Ikon } from "../ui/Ikon";
import { SiraliBelir, SiraliOge } from "./hareket/Belir";
import { BolumBasligi, DugmeBaglanti, Kap } from "./ortak";

const BASLANGIC_ADIMLARI = [
  { baslik: "Paketinizi seçin", metin: "Çocuk sayınıza uygun paketi seçin." },
  { baslik: "Güvenle ödeyin", metin: "Ödeme Shopier altyapısıyla tek seferde alınır." },
  { baslik: "Yolculuğu başlatın", metin: "Giriş bilgileriniz e-postanıza gelir; çocuk profillerini oluşturun." },
];

export function Paketler() {
  return (
    <section id="paketler" aria-labelledby="paket-baslik" className="tema-veli scroll-mt-16 border-t border-cizgi bg-yuzey-2 py-20 lg:py-28">
      <Kap>
        <BolumBasligi
          id="paket-baslik"
          ortali
          ust="Paketler"
          baslik="Bir kez alın, kendi hızınızda okuyun"
          aciklama="Tüm paketlerde içerik ve özellikler aynıdır; yalnızca çocuk profili sayısı değişir. Abonelik ve otomatik yenileme yoktur."
        />

        {/* KARAR 16 Eki 2026 (Hasan): kartların yapısı ve metni aynen kalır; yalnız giriş hareketi. */}
        <SiraliBelir etiket="ul" className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3 lg:items-stretch" aralik={0.14} oran={0.15}>
          {PAKETLER.map((paket) => (
            <PaketKarti key={paket.kimlik} paket={paket} />
          ))}
        </SiraliBelir>

        <ol className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
          {BASLANGIC_ADIMLARI.map((adim, i) => (
            <li key={adim.baslik} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-vurgu font-baslik font-extrabold text-murekkep">
                {i + 1}
              </span>
              <div>
                <p className="font-baslik text-lg font-bold text-murekkep">{adim.baslik}</p>
                <p className="font-govde leading-relaxed text-murekkep-soluk">{adim.metin}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-3xl text-center font-govde text-sm leading-relaxed text-murekkep-soluk">
          Fiyatlara KDV dahildir. Satın almadan önce{" "}
          <Link href={ON_BILGILENDIRME.yol} className="font-semibold text-murekkep underline underline-offset-2">
            Ön Bilgilendirme Formu
          </Link>{" "}
          ve{" "}
          <Link href={MESAFELI_SATIS.yol} className="font-semibold text-murekkep underline underline-offset-2">
            Mesafeli Satış Sözleşmesi
          </Link>
          &apos;ni inceleyebilirsiniz.
        </p>
      </Kap>
    </section>
  );
}

function PaketKarti({ paket }: { paket: Paket }) {
  const oneCikan = Boolean(paket.etiket);
  const cocukBasina = Math.round(paket.fiyat / paket.profilSayisi);

  return (
    <SiraliOge
      etiket="li"
      className={`relative flex flex-col rounded-kart p-7 sm:p-8 ${
        oneCikan
          ? "tema-cocuk zemin-yildizli border-2 border-vurgu shadow-kart-gece lg:-my-4 lg:py-11"
          : "border border-cizgi bg-yuzey shadow-kart"
      }`}
    >
      {paket.etiket ? (
        <span className="absolute -top-3.5 left-7 rounded-full bg-altin-400 px-3.5 py-1 font-baslik text-sm font-bold text-gece-950">
          {paket.etiket}
        </span>
      ) : null}

      <h3 className="font-edebi text-[1.7rem] font-semibold text-murekkep">{paket.ad}</h3>
      <p className="mt-1 font-baslik text-[1.05rem] font-bold text-vurgu">
        {paket.profilSayisi === 1 ? "1 çocuk profili" : `${paket.profilSayisi} çocuk profiline kadar`}
      </p>
      <p className="mt-3 font-govde leading-relaxed text-murekkep-soluk">{paket.aciklama}</p>

      <div className="mt-6 border-t border-cizgi pt-6">
        <p className="font-baslik text-[2.9rem] font-extrabold leading-none tracking-tight text-murekkep">
          {tlBicimi(paket.fiyat)}
        </p>
        <p className="mt-2 font-govde text-sm font-semibold text-murekkep-soluk">
          Tek ödeme
          {paket.profilSayisi > 1 ? ` · çocuk başına ${tlBicimi(cocukBasina)}` : " · süre sınırı yok"}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {PAKET_ORTAK_OZELLIKLER.map((ozellik) => (
          <li key={ozellik} className="flex gap-2.5 font-govde text-[0.98rem] text-murekkep">
            <span className="mt-0.5 shrink-0 text-eylem">
              <Ikon ad="onay" boyut={18} />
            </span>
            {ozellik}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <DugmeBaglanti href={paket.shopierBaglantisi || "#paketler"} varyant="eylem" tamGenislik>
          Satın Al
        </DugmeBaglanti>
      </div>
    </SiraliOge>
  );
}
