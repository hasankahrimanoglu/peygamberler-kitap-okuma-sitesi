import Link from "next/link";
import { Buton, Ikon } from "../src/components/ui";

// Geçersiz rotalar (ör. bilinmeyen bölüm kimliği) için Türkçe 404 sayfası.
export default function NotFound() {
  return (
    <main className="tema-cocuk zemin-yildizli flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center text-murekkep">
      <p className="font-baslik text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
        Sayfa Bulunamadı
      </p>
      <h1 className="font-baslik text-3xl font-bold sm:text-4xl">
        Bu durak haritada yok
      </h1>
      <p className="max-w-md font-govde text-base leading-7 text-murekkep-soluk">
        Aradığın sayfa taşınmış ya da hiç açılmamış olabilir. Haritaya dönüp
        yolculuğuna kaldığın yerden devam edebilirsin.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Link href="/map">
          <Buton varyant="eylem">
            <Ikon ad="geri" boyut={18} />
            Haritaya Dön
          </Buton>
        </Link>
        <Link href="/dashboard">
          <Buton varyant="cerceve">Veli Paneli</Buton>
        </Link>
      </div>
    </main>
  );
}
