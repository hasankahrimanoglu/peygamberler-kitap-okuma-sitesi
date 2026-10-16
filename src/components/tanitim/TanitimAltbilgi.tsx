import Link from "next/link";
import { MARKA } from "../../data/marka";
import { YASAL_BELGELER } from "../../data/yasal";
import { Logo } from "../marka/Logo";
import { Kap } from "./ortak";

const URUN_BAGLANTILARI = [
  { href: "/#nasil-calisir", ad: "Nasıl Çalışır" },
  { href: "/#veliler", ad: "Veliler İçin" },
  { href: "/#kutuphane", ad: "Kütüphane" },
  { href: "/#paketler", ad: "Paketler" },
  { href: "/#sss", ad: "Sık Sorulanlar" },
  { href: "/login", ad: "Giriş Yap" },
];

export function TanitimAltbilgi() {
  const yil = new Date().getFullYear();

  return (
    <footer className="tema-cocuk border-t border-white/10 bg-gece-950 pb-10 pt-16">
      <Kap>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo ton="acik" boyut={46} />
            <p className="mt-5 max-w-sm font-govde leading-relaxed text-murekkep-soluk">{MARKA.kisaTanim}</p>
            <p className="mt-5 font-govde text-murekkep-soluk">
              İletişim:{" "}
              <Link href="/iletisim" className="font-semibold text-murekkep underline-offset-2 hover:underline">
                {MARKA.iletisimEposta}
              </Link>
            </p>
          </div>

          <nav aria-label="Ürün" className="lg:col-span-3 lg:col-start-6">
            <p className="font-baslik text-sm font-bold uppercase tracking-[0.16em] text-vurgu">Ürün</p>
            <ul className="mt-4 space-y-1">
              {URUN_BAGLANTILARI.map((baglanti) => (
                <li key={baglanti.href}>
                  <Link
                    href={baglanti.href}
                    className="inline-flex min-h-[40px] items-center font-govde text-murekkep-soluk transition-colors hover:text-murekkep"
                  >
                    {baglanti.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Yasal" className="lg:col-span-4">
            <p className="font-baslik text-sm font-bold uppercase tracking-[0.16em] text-vurgu">Yasal</p>
            <ul className="mt-4 space-y-1">
              {YASAL_BELGELER.map((belge) => (
                <li key={belge.yol}>
                  <Link
                    href={belge.yol}
                    className="inline-flex min-h-[40px] items-center font-govde text-murekkep-soluk transition-colors hover:text-murekkep"
                  >
                    {belge.kisaBaslik}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/iletisim"
                  className="inline-flex min-h-[40px] items-center font-govde text-murekkep-soluk transition-colors hover:text-murekkep"
                >
                  İletişim ve Satıcı Bilgileri
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 font-govde text-sm text-murekkep-soluk sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {yil} {MARKA.ad}. Tüm hakları saklıdır.
          </p>
          <p>Ödemeler Shopier güvencesiyle alınır.</p>
        </div>
      </Kap>
    </footer>
  );
}
