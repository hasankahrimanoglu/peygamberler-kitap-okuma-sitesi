import Image from "next/image";
import Link from "next/link";

const parentPromises = [
  {
    title: "Okumayı oyunlaştırır",
    text: "Çocuk kitapları bir görev gibi değil, haritada açılan macera durakları gibi görür. Her bölüm küçük bir başarı hissiyle tamamlanır.",
  },
  {
    title: "Değerleri hikayenin içinde verir",
    text: "Sabır, cömertlik, sadakat ve merhamet gibi kavramlar kuru anlatımla değil; karakterlerin kararları ve çocuk dostu sorularla işlenir.",
  },
  {
    title: "Veliyi sürecin dışında bırakmaz",
    text: "Ebeveyn paneliyle çocuk profilleri, şifreler, okuma ilerlemesi, rozetler ve gelişim raporları tek yerden takip edilir.",
  },
];

const journeySteps = [
  "Veli hesabına giriş yapar ve çocuk profillerini oluşturur.",
  "Çocuk kendi kullanıcı adıyla güvenli keşif haritasına girer.",
  "Kitap bölümlerini okur, kelime kutularıyla anlamları keşfeder.",
  "Bölüm sonunda rozet kazanır; kitap bitince final testiyle unvan alır.",
];

const readerFeatures = [
  "Canlı sözlük kutuları",
  "Sesli anlatım barı",
  "Sen olsaydın soruları",
  "Rozet ve unvan sistemi",
  "Kilit açılan kitap haritası",
  "Ebeveyn gelişim raporu",
];

const parentReportItems = [
  {
    label: "Çocuğun emeğini görün",
    text: "Tamamlanan kitaplar, kazanılan rozetler ve okuma yolculuğu veli panelinde sade bir rapora dönüşür.",
  },
  {
    label: "Sınav dili değil, rehberlik dili",
    text: "Final testleri çocuğu etiketlemek için değil; evde güzel bir sohbet başlatmak için tasarlanır.",
  },
  {
    label: "Her çocuk için ayrı profil",
    text: "Kardeşlerin ilerlemesi birbirine karışmaz. Her çocuk kendi haritasında ilerler.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fff7df] text-[#321506]">
      <section className="relative overflow-hidden border-b border-amber-200">
        <div className="absolute inset-0">
          <Image
            src="/reader-arkaplan1.png"
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,247,223,0.98)_0%,rgba(255,247,223,0.92)_44%,rgba(226,247,232,0.86)_100%)]" />
        </div>

        <header className="relative z-20 border-b border-[#ead39c] bg-[#fffaf0]/92 shadow-xl shadow-amber-950/8 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7c350f] text-xl font-black text-amber-100 shadow-lg shadow-amber-950/20">
                PK
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black uppercase tracking-[0.24em] text-[#8a3d12] sm:text-base">
                  Peygamberler Keşif
                </span>
                <span className="hidden text-sm font-bold text-stone-600 sm:block">
                  Aileler için güvenli okuma yolculuğu
                </span>
              </span>
            </Link>

            <nav className="hidden items-center rounded-lg border border-amber-200 bg-white/70 px-2 py-2 text-sm font-black text-stone-700 shadow-inner md:flex">
              <a
                href="#nasil-calisir"
                className="rounded-md px-4 py-2 transition hover:bg-amber-100 hover:text-[#7c350f]"
              >
                Nasıl Çalışır?
              </a>
              <a
                href="#veli-paneli"
                className="rounded-md px-4 py-2 transition hover:bg-amber-100 hover:text-[#7c350f]"
              >
                Veli Paneli
              </a>
              <a
                href="#okuma"
                className="rounded-md px-4 py-2 transition hover:bg-amber-100 hover:text-[#7c350f]"
              >
                Okuma Deneyimi
              </a>
            </nav>

            <Link
              href="/login"
              className="shrink-0 rounded-lg bg-[#123225] px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#0b241a] sm:px-6"
            >
              Giriş Yap
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.38em] text-emerald-800">
              Çocuklar İçin Değer Odaklı Okuma Platformu
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] text-[#431c09] sm:text-6xl lg:text-7xl">
              Kitap okumayı çocuklar için keşif yolculuğuna dönüştürün.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-stone-700">
              Peygamberler Keşif Dünyası; çocukların peygamberlerin ve güzel
              insanların hayatlarını okuyarak, karar vererek, rozet kazanarak
              ve aileleriyle konuşarak öğrenmesini sağlar.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-[#7c350f] px-7 py-4 text-lg font-black text-white shadow-xl shadow-amber-950/20 transition hover:-translate-y-1 hover:bg-[#5f2609]"
              >
                Giriş Yap
              </Link>
              <a
                href="#nasil-calisir"
                className="inline-flex items-center justify-center rounded-lg border border-amber-300 bg-white/80 px-7 py-4 text-lg font-black text-[#5a260c] transition hover:-translate-y-1 hover:bg-white"
              >
                Platformu İncele
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["Etkileşimli", "Okuma"],
                ["Dinamik", "Rozetler"],
                ["Veli", "Raporları"],
              ].map(([top, bottom]) => (
                <div
                  key={top}
                  className="rounded-lg border border-amber-200 bg-white/70 px-4 py-4 shadow-sm"
                >
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                    {top}
                  </p>
                  <p className="mt-1 text-lg font-black text-[#431c09]">
                    {bottom}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-amber-200 bg-white p-3 shadow-2xl shadow-amber-950/18">
              <Image
                src="/reader-arkaplan.png"
                alt="Peygamberler Keşif Dünyası okuma ekranı"
                width={960}
                height={760}
                priority
                className="aspect-[5/4] w-full rounded-lg object-cover"
              />
            </div>
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-lg shadow-emerald-900/8">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-800">
                Çocuk ekranı
              </p>
              <p className="mt-2 text-lg font-bold leading-7 text-stone-700">
                Harita, bölüm, rozet ve final testi tek bir akışta birleşir.
                Çocuk nerede kaldığını hisseder; veli süreci panelden görür.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="nasil-calisir" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-emerald-800">
              Aileler İçin Tasarlandı
            </p>
            <h2 className="mt-4 text-4xl font-black text-[#431c09] sm:text-5xl">
              Sadece bir okuma ekranı değil, çocuğun kitapla bağ kurduğu bir
              yolculuk.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {parentPromises.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-amber-200 bg-white p-7 shadow-xl shadow-amber-900/8"
              >
                <h3 className="text-2xl font-black text-[#431c09]">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg font-semibold leading-8 text-stone-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-[#f7edd2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#8a3d12]">
              Okuma Döngüsü
            </p>
            <h2 className="mt-4 text-4xl font-black text-[#431c09] sm:text-5xl">
              Çocuk başlar, ilerler, rozet kazanır ve yeni durağın kilidini
              açar.
            </h2>
            <p className="mt-5 text-xl font-semibold leading-9 text-stone-700">
              Akış basit tutulur: çocuk önce haritayı görür, sonra açık kitabı
              seçer, bölümü okur, karar kutusuyla düşünür ve bölüm sonunda
              emeğinin karşılığını görür.
            </p>
          </div>

          <div className="grid gap-4">
            {journeySteps.map((step, index) => (
              <div
                key={step}
                className="grid grid-cols-[3.5rem_1fr] items-start gap-4 rounded-lg border border-amber-200 bg-white p-5 shadow-lg shadow-amber-900/8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#7c350f] text-xl font-black text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-xl font-black leading-8 text-[#431c09]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="okuma" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-amber-200 bg-white p-3 shadow-2xl shadow-amber-950/12">
            <Image
              src="/reader-arkaplan1.png"
              alt="Çocuklar için okuma atmosferi"
              width={960}
              height={720}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </div>

          <div className="self-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-emerald-800">
              Okuma Ekranı
            </p>
            <h2 className="mt-4 text-4xl font-black text-[#431c09] sm:text-5xl">
              Zor kelimeler açıklanır, karar anları çocuğu hikayenin içine
              çağırır.
            </h2>
            <p className="mt-5 text-xl font-semibold leading-9 text-stone-700">
              Her bölüm çocukların dikkatini dağıtmadan, sade bir okuma
              atmosferiyle sunulur. Bilmediği kelimeye dokunduğunda açıklama
              açılır; bölüm sonunda düşünmesini sağlayan kısa karar alanları
              belirir.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {readerFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-base font-black text-emerald-900"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="veli-paneli" className="bg-[#112032] px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-200">
              Veli Paneli
            </p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Çocuğun okuma gayreti görünür olur; veliye evde konuşacak güzel
              başlıklar verir.
            </h2>
            <p className="mt-5 text-xl font-semibold leading-9 text-slate-200">
              Raporlar çocukları yarışa sokmak için değil, emeklerini fark
              etmek ve aile içi tatlı sohbetlere kapı açmak için hazırlanır.
            </p>
          </div>

          <div className="grid gap-4">
            {parentReportItems.map((item) => (
              <article
                key={item.label}
                className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-xl shadow-black/10"
              >
                <h3 className="text-2xl font-black text-amber-100">
                  {item.label}
                </h3>
                <p className="mt-3 text-lg font-semibold leading-8 text-slate-200">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-lg border border-amber-200 bg-white p-8 text-center shadow-2xl shadow-amber-950/12 sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#8a3d12]">
            Hazır Hesabınız Var mı?
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#431c09] sm:text-5xl">
            Veli veya çocuk girişi için tek ekrandan devam edin.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-semibold leading-9 text-stone-700">
            Shopier satın alımından sonra gelen geçici şifreyle veli paneline
            giriş yapılır. Veli, çocuk profillerini oluşturur ve çocuklar kendi
            kullanıcı adıyla keşif haritasına başlar.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#7c350f] px-8 py-4 text-lg font-black text-white shadow-xl shadow-amber-950/20 transition hover:-translate-y-1 hover:bg-[#5f2609]"
          >
            Giriş Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
