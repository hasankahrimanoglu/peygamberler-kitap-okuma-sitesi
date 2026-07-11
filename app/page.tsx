import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    title: "Çocuklara Özel Harita",
    text: "Her kitap bir macera durağına dönüşür; çocuklar rozet kazanarak ilerler.",
  },
  {
    title: "Ebeveyn Paneli",
    text: "Veliler çocuk profillerini, şifrelerini ve gelişim raporlarını tek yerden yönetir.",
  },
  {
    title: "Etkileşimli Okuma",
    text: "Bölümler sözlük kutuları, karar soruları ve başarı animasyonlarıyla canlanır.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-amber-50 text-[#3b1a0a]">
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/reader-arkaplan1.png"
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-50/92 to-emerald-50/88" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-amber-50 to-transparent" />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-[0.35em] text-amber-800"
          >
            Peygamberler Keşif
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-amber-300 bg-white/80 px-6 py-3 text-sm font-black text-amber-950 shadow-lg shadow-amber-900/10 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Giriş Yap
          </Link>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.4em] text-emerald-700">
              Çocuklar İçin Kitap Okuma Yolculuğu
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-[#4a210d] sm:text-7xl lg:text-8xl">
              Peygamberler Keşif Dünyası
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 text-stone-700 sm:text-2xl sm:leading-10">
              Çocukların kitapları sadece okumadığı; karar verdiği, rozet
              kazandığı ve güzel değerleri keşfettiği güvenli bir okuma alanı.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#7c350f] px-8 py-4 text-lg font-black text-white shadow-2xl shadow-amber-900/25 transition hover:-translate-y-1 hover:bg-[#5f2609]"
              >
                Giriş Yap
              </Link>
              <a
                href="#kesfet"
                className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white/70 px-8 py-4 text-lg font-black text-[#5a260c] transition hover:-translate-y-1 hover:bg-white"
              >
                Nasıl Çalışır?
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-6 rounded-[2rem] bg-emerald-200/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-white/75 p-4 shadow-2xl shadow-amber-950/15 backdrop-blur">
              <Image
                src="/reader-arkaplan.png"
                alt="Çocuk okuma yolculuğu arayüzü"
                width={900}
                height={720}
                priority
                className="aspect-[5/4] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="kesfet" className="relative z-10 bg-amber-50 px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-amber-200 bg-white/75 p-7 shadow-xl shadow-amber-900/8"
            >
              <h2 className="text-2xl font-black text-[#4a210d]">
                {item.title}
              </h2>
              <p className="mt-3 text-lg font-semibold leading-7 text-stone-700">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
