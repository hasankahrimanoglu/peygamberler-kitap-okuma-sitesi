import {
  Buton,
  DurumCipi,
  IlerlemeCubugu,
  Kart,
  OdulIkonu,
} from "../../src/components/ui";

// Faz 1 vitrin sayfası: tasarım sisteminin iki temada nasıl durduğunu gösterir.
// Üretim ekranlarına bağlı değildir; onay ve referans içindir.
export default function TasarimSayfasi() {
  return (
    <main className="min-h-screen">
      <CocukBolumu />
      <VeliBolumu />
    </main>
  );
}

function CocukBolumu() {
  return (
    <section className="tema-cocuk zemin-yildizli px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-baslik text-sm font-semibold uppercase tracking-[0.2em] text-vurgu">
          Çocuk Teması — Gece Gökyüzü
        </p>
        <h1 className="mt-2 font-baslik text-4xl font-bold text-murekkep">
          Peygamberler Keşif Dünyası
        </h1>
        <p className="mt-2 max-w-xl font-govde text-murekkep-soluk">
          Okuduğun kitaplarla yolculuğunu sürdür; yeni rozetler ve madalyalar
          kazan. Bu bölüm çocuk tarafının görsel dilini gösterir.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Aktif kitap kartı */}
          <Kart parlak dolgu="genis">
            <div className="flex items-start gap-4">
              <img
                src="/kapaklar/placeholder.svg"
                alt="Hz. Âdem kitap kapağı (placeholder)"
                className="w-24 rounded-lg shadow-kart-gece"
              />
              <div className="min-w-0 flex-1">
                <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-vurgu">
                  1. Kitap
                </p>
                <h2 className="font-baslik text-2xl font-bold">Hz. Âdem</h2>
                <p className="font-govde text-sm text-murekkep-soluk">
                  İlk insan, ilk yolculuk
                </p>
                <div className="mt-3">
                  <DurumCipi durum="devam" />
                </div>
              </div>
            </div>
            <IlerlemeCubugu
              className="mt-5"
              yuzde={60}
              etiket="3 / 5 bölüm tamamlandı"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Buton varyant="eylem">Devam Et →</Buton>
              <Buton varyant="cerceve">Kitap Detayı</Buton>
            </div>
          </Kart>

          {/* Kilitli kitap kartı */}
          <Kart kilitli dolgu="genis">
            <div className="flex items-start gap-4">
              <img
                src="/kapaklar/placeholder.svg"
                alt=""
                className="w-24 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-murekkep-soluk">
                  2. Kitap
                </p>
                <h2 className="font-baslik text-2xl font-bold">Hz. Nuh</h2>
                <p className="font-govde text-sm text-murekkep-soluk">
                  Sabır ve güven gemisi
                </p>
                <div className="mt-3">
                  <DurumCipi durum="kilitli" />
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-buton bg-yuzey-2 p-3 font-govde text-sm text-murekkep-soluk">
              Hz. Nuh yolculuğu, Hz. Âdem kitabının Büyük Final Testi
              tamamlandığında açılacak.
            </p>
          </Kart>
        </div>

        {/* Rozet dizisi */}
        <Kart className="mt-5" dolgu="genis">
          <h3 className="font-baslik text-lg font-bold">
            Bölüm Rozetleri{" "}
            <span className="font-govde text-sm font-normal text-murekkep-soluk">
              (kazanılan renkli, kazanılmayan gri — tek görselden)
            </span>
          </h3>
          <div className="mt-4 flex flex-wrap items-end gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <OdulIkonu tip="rozet" anahtar={`adem-bolum-${n}`} boyut={72} />
                <p className="mt-1 font-govde text-xs text-murekkep-soluk">
                  {n}. Bölüm
                </p>
              </div>
            ))}
            {[4, 5].map((n) => (
              <div key={n} className="text-center">
                <OdulIkonu
                  tip="rozet"
                  anahtar={`adem-bolum-${n}`}
                  boyut={72}
                  kazanildi={false}
                />
                <p className="mt-1 font-govde text-xs text-murekkep-soluk">
                  {n}. Bölüm
                </p>
              </div>
            ))}
            <div className="text-center">
              <OdulIkonu tip="madalya" anahtar="adem" boyut={80} />
              <p className="mt-1 font-govde text-xs text-vurgu">
                Kitap Madalyası
              </p>
            </div>
            <div className="text-center">
              <OdulIkonu tip="unvan" anahtar="yol-kasifi" boyut={80} />
              <p className="mt-1 font-govde text-xs text-murekkep-soluk">
                Unvan: Yol Kaşifi
              </p>
            </div>
          </div>
        </Kart>

        {/* Okuma yüzeyi örneği */}
        <div className="mt-5 rounded-kart bg-okuma-yuzey p-6 text-[#3d2b1f] shadow-kart sm:p-8">
          <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-[#c9a227]">
            1. Bölüm
          </p>
          <h3 className="mt-1 font-baslik text-2xl font-bold">
            İlk İnsan, İlk Öğrenme
          </h3>
          <p className="mt-3 max-w-2xl font-story text-lg leading-relaxed">
            Çok ama çok uzun zaman önce, henüz yeryüzünde hiçbir insan yokken;
            gökyüzü, yıldızlar, dağlar ve denizler çoktan yaratılmıştı. Uzun
            hikâye metinleri her zaman bu açık okuma yüzeyinde, Lora yazı
            tipiyle gösterilir.
          </p>
        </div>
      </div>
    </section>
  );
}

function VeliBolumu() {
  return (
    <section className="tema-veli bg-zemin px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-baslik text-sm font-semibold uppercase tracking-[0.2em] text-eylem">
          Veli Teması — Sıcak Kütüphane
        </p>
        <h1 className="mt-2 font-baslik text-4xl font-bold text-murekkep">
          Veli Paneli
        </h1>
        <p className="mt-2 max-w-xl font-govde text-murekkep-soluk">
          Çocuklarınızın okuma yolculuğunu buradan takip edin. Bu bölüm veli
          tarafının görsel dilini gösterir.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Çocuk profil kartı */}
          <Kart dolgu="genis">
            <div className="flex items-center gap-4">
              <OdulIkonu tip="avatar" anahtar="erkek-1" boyut={64} />
              <div className="min-w-0 flex-1">
                <h2 className="font-baslik text-xl font-bold">Ahmet</h2>
                <p className="font-govde text-sm text-murekkep-soluk">
                  Unvan: Yol Kaşifi · 12 rozet · 1 madalya
                </p>
              </div>
              <DurumCipi durum="tamamlandi" metin="Aktif" />
            </div>
            <IlerlemeCubugu
              className="mt-5"
              yuzde={60}
              etiket="Hz. Âdem — 3 / 5 bölüm"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Buton varyant="eylem" boyut="kucuk">
                Okumaya Devam Et
              </Buton>
              <Buton varyant="ikincil" boyut="kucuk">
                Gelişim Raporu
              </Buton>
              <Buton varyant="cerceve" boyut="kucuk">
                Profili Düzenle
              </Buton>
            </div>
          </Kart>

          {/* Buton ve durum dili örnekleri */}
          <Kart dolgu="genis">
            <h3 className="font-baslik text-lg font-bold">Buton Anlamları</h3>
            <p className="font-govde text-sm text-murekkep-soluk">
              PROJE-MODELI.md 3.3 — her renk tek anlam taşır.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Buton varyant="eylem" boyut="kucuk">
                Devam Et
              </Buton>
              <Buton varyant="altin" boyut="kucuk">
                Final Testine Geç
              </Buton>
              <Buton varyant="ikincil" boyut="kucuk">
                İlerlemeyi Gör
              </Buton>
              <Buton varyant="cerceve" boyut="kucuk">
                ← Geri
              </Buton>
              <Buton varyant="tehlike" boyut="kucuk">
                Profili Sil
              </Buton>
            </div>
            <h3 className="mt-6 font-baslik text-lg font-bold">Durum Dili</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <DurumCipi durum="tamamlandi" />
              <DurumCipi durum="devam" />
              <DurumCipi durum="yeni" />
              <DurumCipi durum="kilitli" />
            </div>
          </Kart>
        </div>
      </div>
    </section>
  );
}
