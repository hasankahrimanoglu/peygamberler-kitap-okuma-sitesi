"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { books } from "../../../src/data/books";
import {
  Buton,
  DurumCipi,
  IlerlemeCubugu,
  Kart,
  OdulIkonu,
  YedekliGorsel,
} from "../../../src/components/ui";

type KitapKey = "adem" | "nuh" | "ebubekir" | "omer";

type BolumBilgi = {
  id: string;
  title: string;
  ozet?: string;
  badgeName: string;
  okumaYolu: string;
};

type KitapBilgi = {
  sira: number;
  title: string;
  subtitle: string;
  description: string;
  dbKeywords: string[];
  bolumler: BolumBilgi[];
  quizYolu: string | null;
};

type IlerlemeBilgi = {
  tamamlananBolum: number;
  toplamBolum: number;
  yuzde: number;
  bittiMi: boolean;
};

function booksTsBolumleri(bookId: string, routePrefix: string): BolumBilgi[] {
  const kitap = books.find((item) => item.id === bookId);
  if (!kitap) return [];

  return kitap.chapters.map((bolum) => ({
    id: bolum.id,
    title: bolum.title,
    ozet: bolum.ozet,
    badgeName: bolum.badgeName,
    okumaYolu: `/reader/${routePrefix}-${bolum.id}`,
  }));
}

// Hz. Ebû Bekir ve Hz. Ömer içerikleri henüz books.ts'e taşınmadı;
// bölüm listeleri harita sayfasındaki katalogla aynı tutulur.
const ebubekirBolumleri: BolumBilgi[] = [
  { id: "4", title: "Özgürlüğe Kavuşanlar", ozet: "Bilâl'in özgürlüğe kavuşma hikâyesi", badgeName: "Mekke Çarşısı Rozeti" },
  { id: "5", title: "Sabır Yılları", ozet: "Zor günlerde direnen kalpler", badgeName: "Habeşistan Yolu Çıkartması" },
  { id: "6", title: "O Söylüyorsa Doğrudur", ozet: "Sarsılmaz güvenin ve doğruluğun sesi", badgeName: "Doğruluk Rozeti" },
  { id: "7", title: "Mağara Arkadaşı", ozet: "Hicret yolunda vefalı bir dostluk", badgeName: "Tevekkül Rozeti" },
  { id: "8", title: "Medine'de Yeni Sabah", ozet: "Yeni yurtta kardeşliğin kuruluşu", badgeName: "Kardeşlik Rozeti" },
  { id: "9", title: "Birlikte Güçlüyüz", ozet: "Dayanışmayla aşılan zorluklar", badgeName: "Dayanışma Rozeti" },
  { id: "10", title: "Zor Günde Sakinlik", ozet: "Üzüntülü günde teselli veren duruş", badgeName: "Teselli Rozeti" },
  { id: "11", title: "Emaneti Taşıyan", ozet: "Büyük sorumluluğun omuzlanışı", badgeName: "Sorumluluk Rozeti" },
  { id: "12", title: "Kararlılık Zamanı", ozet: "Doğru bildiğinde sebat etmek", badgeName: "Kararlılık Rozeti" },
  { id: "13", title: "En Kutsal Görev", ozet: "Vefayla taşınan kutsal emanet", badgeName: "Vefa Rozeti" },
].map((bolum) => ({ ...bolum, okumaYolu: `/test-reader?chapter=${bolum.id}` }));

const kitaplar: Record<KitapKey, KitapBilgi> = {
  adem: {
    sira: 1,
    title: "Hz. Âdem",
    subtitle: "İlk insan, ilk yolculuk",
    description:
      "Hz. Âdem'in yaratılışı, öğrenme yolculuğu, tövbesi ve yeryüzündeki ilk adımları.",
    dbKeywords: ["adem"],
    bolumler: booksTsBolumleri("hz-adem", "adem"),
    quizYolu: "/quiz/adem",
  },
  nuh: {
    sira: 2,
    title: "Hz. Nuh",
    subtitle: "Sabır ve güven gemisi",
    description:
      "Sabırlı bir davet, emekle kurulan gemi ve güvenle taşınan yepyeni bir başlangıç.",
    dbKeywords: ["nuh"],
    bolumler: booksTsBolumleri("hz-nuh", "nuh"),
    quizYolu: "/quiz/nuh",
  },
  ebubekir: {
    sira: 3,
    title: "Hz. Ebû Bekir",
    subtitle: "Sadakat ve cömertlik durağı",
    description:
      "Dostluğun, cömertliğin ve sarsılmaz sadakatin iz bıraktığı bir hayat yolculuğu.",
    dbKeywords: ["ebu bekir", "ebubekir"],
    bolumler: ebubekirBolumleri,
    quizYolu: "/quiz/ebubekir",
  },
  omer: {
    sira: 4,
    title: "Hz. Ömer",
    subtitle: "Adalet kapısı",
    description:
      "Adaletin, cesaretin ve doğruyu aramanın kapısı. Bölümler yakında bağlanacak.",
    dbKeywords: ["omer"],
    bolumler: [
      { id: "1", title: "Adalet Kapısı Açılıyor", ozet: "Adaletle tanışmanın ilk adımı", badgeName: "Adalet Başlangıç Rozeti", okumaYolu: "" },
      { id: "2", title: "Güçlü Bir Karar", ozet: "Cesaretle verilen büyük bir karar", badgeName: "Cesaret Rozeti", okumaYolu: "" },
      { id: "3", title: "Halkın Yanında", ozet: "Halkını gözeten bir yönetici", badgeName: "Sorumluluk Rozeti", okumaYolu: "" },
    ],
    quizYolu: null,
  },
};

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
}

function KitapIkonu() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function KapakGorseli({ kitapKey, title }: { kitapKey: string; title: string }) {
  return (
    <YedekliGorsel
      src={`/kapaklar/kapak-${kitapKey}.png`}
      yedekSrc="/kapaklar/placeholder.svg"
      alt={`${title} kitap kapağı`}
      className="w-28 rounded-lg shadow-kart-gece sm:w-36"
    />
  );
}

export default function KitapDetaySayfasi() {
  const router = useRouter();
  const params = useParams<{ kitapKey: string }>();
  const kitapKey = params.kitapKey as KitapKey;
  const kitap = kitaplar[kitapKey];

  const [ilerleme, setIlerleme] = useState<IlerlemeBilgi>({
    tamamlananBolum: 0,
    toplamBolum: kitap?.bolumler.length ?? 1,
    yuzde: 0,
    bittiMi: false,
  });
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    if (!kitap) return;

    async function ilerlemeYukle() {
      const profilId = window.localStorage.getItem("selected_child_profile_id");

      if (!profilId) {
        router.push("/dashboard");
        return;
      }

      const [kitapSonuc, ilerlemeSonuc] = await Promise.all([
        supabase.from("books").select("id, isim, toplam_bolum"),
        supabase
          .from("user_progress")
          .select("book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi")
          .eq("profile_id", profilId),
      ]);

      const dbKitap = (kitapSonuc.data ?? []).find((satir) => {
        const ad = normalizeText(satir.isim);
        return kitap.dbKeywords.some((anahtar) => ad.includes(anahtar));
      });
      const satir = dbKitap
        ? (ilerlemeSonuc.data ?? []).find((item) => item.book_id === dbKitap.id)
        : undefined;

      const toplam =
        dbKitap?.toplam_bolum && dbKitap.toplam_bolum > 0
          ? Math.max(dbKitap.toplam_bolum, kitap.bolumler.length)
          : kitap.bolumler.length;
      const tamamlanan = Math.min(
        toplam,
        Math.max(0, satir?.tamamlanan_bolum_sayisi ?? 0),
      );

      setIlerleme({
        tamamlananBolum: tamamlanan,
        toplamBolum: toplam,
        yuzde: Math.max(
          Math.min(100, Math.round(satir?.yuzde ?? 0)),
          Math.round((tamamlanan / toplam) * 100),
        ),
        bittiMi: Boolean(satir?.bitti_mi),
      });
      setYukleniyor(false);
    }

    void ilerlemeYukle();
  }, [kitap, router]);

  if (!kitap) {
    return (
      <main className="tema-cocuk zemin-yildizli flex min-h-screen items-center justify-center p-6">
        <Kart dolgu="genis" className="max-w-md text-center">
          <h1 className="font-baslik text-2xl font-bold">Kitap bulunamadı</h1>
          <p className="mt-2 font-govde text-murekkep-soluk">
            Aradığın kitap haritada olmayabilir.
          </p>
          <Buton
            className="mt-5"
            varyant="cerceve"
            onClick={() => router.push("/map")}
          >
            ← Haritaya Dön
          </Buton>
        </Kart>
      </main>
    );
  }

  const bolumlerBagli = kitap.bolumler.some((bolum) => bolum.okumaYolu);
  const finalAcik =
    bolumlerBagli && ilerleme.tamamlananBolum >= kitap.bolumler.length;
  const kazanilanRozet = Math.min(
    ilerleme.tamamlananBolum,
    kitap.bolumler.length,
  );

  return (
    <main className="tema-cocuk zemin-yildizli min-h-screen px-4 py-6 text-murekkep sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Üst çubuk */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <Buton varyant="cerceve" boyut="kucuk" onClick={() => router.push("/map")}>
            ← Haritaya Dön
          </Buton>
          <p className="font-baslik text-sm font-semibold uppercase tracking-[0.18em] text-vurgu">
            Kitap Yolculuğu
          </p>
        </div>

        {/* Kitap başlık kartı */}
        <Kart parlak dolgu="genis">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex justify-center sm:block">
              <KapakGorseli kitapKey={kitapKey} title={kitap.title} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-vurgu">
                {kitap.sira}. Kitap
              </p>
              <h1 className="mt-1 font-baslik text-3xl font-bold sm:text-4xl">
                {kitap.title}
              </h1>
              <p className="font-govde text-murekkep-soluk">{kitap.subtitle}</p>
              <p className="mt-2 font-govde text-sm leading-relaxed text-murekkep-soluk">
                {kitap.description}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                <IlerlemeCubugu
                  yuzde={ilerleme.yuzde}
                  etiket={
                    yukleniyor
                      ? "İlerleme yükleniyor..."
                      : `${ilerleme.tamamlananBolum} / ${kitap.bolumler.length} bölüm tamamlandı`
                  }
                />
                <div className="flex items-center gap-2 rounded-buton bg-yuzey-2 px-4 py-2">
                  <OdulIkonu
                    tip="madalya"
                    anahtar={kitapKey}
                    boyut={34}
                    kazanildi={ilerleme.bittiMi}
                  />
                  <div>
                    <p className="font-baslik text-xs font-semibold uppercase tracking-wider text-murekkep-soluk">
                      Kitap Madalyası
                    </p>
                    <p className="font-govde text-sm">
                      {ilerleme.bittiMi
                        ? "Kazanıldı!"
                        : "Final testini geç, madalyanı kazan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Kart>

        {/* Bölüm yolculuğu */}
        <h2 className="mb-4 mt-8 font-baslik text-lg font-bold uppercase tracking-[0.14em] text-vurgu">
          Bölüm Yolculuğu
        </h2>
        <ol className="relative space-y-4">
          {/* Zaman çizgisi rayı */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[21px] top-2 w-0.5 bg-cizgi sm:left-[25px]"
          />
          {kitap.bolumler.map((bolum, index) => {
            const tamamlandi =
              index < ilerleme.tamamlananBolum || ilerleme.bittiMi;
            const aktif =
              !tamamlandi && index === ilerleme.tamamlananBolum && bolumlerBagli;
            const kilitli = !tamamlandi && !aktif;
            const hicBaslamadi = ilerleme.tamamlananBolum === 0;

            return (
              <li key={bolum.id} className="relative flex gap-4 sm:gap-6">
                {/* Düğüm */}
                <div
                  className={`relative z-10 mt-4 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-baslik text-sm font-bold sm:h-[52px] sm:w-[52px] ${
                    tamamlandi
                      ? "border-eylem bg-eylem-yumusak text-eylem"
                      : aktif
                        ? "border-altin-400 bg-vurgu-yumusak text-vurgu shadow-parlama"
                        : "border-cizgi bg-yuzey text-murekkep-soluk"
                  }`}
                >
                  {tamamlandi ? "✓" : kilitli ? "🔒" : index + 1}
                </div>

                <Kart
                  parlak={aktif}
                  kilitli={kilitli}
                  className="min-w-0 flex-1"
                >
                  {/* Geniş ekranda tek satır: başlık | rozet (soldan hizalı sütun) | durum + buton */}
                  {/* Üç kademe: mobil dikey; tablet dikeyde (md) durum+buton alt alta
                      dar sütunda; geniş ekranda (lg) sabit 18.5rem yan yana sütun.
                      Sabit/dar son sütun sayesinde rozetler her satırda aynı hizada */}
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] md:items-center md:gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_18.5rem]">
                    <div className="min-w-0">
                      <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-murekkep-soluk">
                        {index + 1}. Bölüm
                      </p>
                      <h3 className="font-baslik text-lg font-bold">
                        {bolum.title}
                      </h3>
                      {bolum.ozet ? (
                        <p className="font-govde text-sm text-murekkep-soluk">
                          {bolum.ozet}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <OdulIkonu
                        tip="rozet"
                        anahtar={`${kitapKey}-bolum-${index + 1}`}
                        boyut={42}
                        kazanildi={tamamlandi}
                        alt={bolum.badgeName}
                      />
                      <div>
                        <p className="font-baslik text-[11px] font-semibold uppercase tracking-wider text-murekkep-soluk">
                          {tamamlandi ? "Kazanılan Rozet" : "Kazanılacak Rozet"}
                        </p>
                        <p className="font-govde text-sm">{bolum.badgeName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:flex-col md:items-end md:justify-center md:gap-2 lg:flex-row lg:items-center lg:justify-end lg:gap-3">
                      <DurumCipi
                        durum={
                          tamamlandi ? "tamamlandi" : aktif ? "devam" : "kilitli"
                        }
                        metin={
                          aktif && hicBaslamadi ? "Seni Bekliyor" : undefined
                        }
                      />
                      {!kilitli && (
                        <Buton
                          varyant={
                            tamamlandi
                              ? "cerceve"
                              : hicBaslamadi
                                ? "altin"
                                : "eylem"
                          }
                          boyut="kucuk"
                          className="hidden md:inline-flex"
                          onClick={() => router.push(bolum.okumaYolu)}
                        >
                          {tamamlandi ? (
                            <>
                              <KitapIkonu /> Tekrar Oku
                            </>
                          ) : hicBaslamadi ? (
                            "Yolculuğa Başla ✦"
                          ) : (
                            "Devam Et →"
                          )}
                        </Buton>
                      )}
                    </div>
                  </div>

                  {kilitli ? null : (
                    /* Mobilde buton kartın altında tam genişlik (dokunma kuralı) */
                    <div className="mt-4 md:hidden">
                      <Buton
                        varyant={
                          tamamlandi ? "cerceve" : hicBaslamadi ? "altin" : "eylem"
                        }
                        boyut="kucuk"
                        tamGenislik
                        onClick={() => router.push(bolum.okumaYolu)}
                      >
                        {tamamlandi ? (
                          <>
                            <KitapIkonu /> Tekrar Oku
                          </>
                        ) : hicBaslamadi ? (
                          "Yolculuğa Başla ✦"
                        ) : (
                          "Devam Et →"
                        )}
                      </Buton>
                    </div>
                  )}
                </Kart>
              </li>
            );
          })}
        </ol>

        {/* Büyük Final Testi */}
        <Kart
          parlak={finalAcik && !ilerleme.bittiMi}
          kilitli={!finalAcik && !ilerleme.bittiMi}
          dolgu="genis"
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <OdulIkonu
              tip="madalya"
              anahtar={kitapKey}
              boyut={64}
              kazanildi={ilerleme.bittiMi}
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-baslik text-xl font-bold">
                Büyük Final Testi
              </h3>
              <p className="font-govde text-sm text-murekkep-soluk">
                {ilerleme.bittiMi
                  ? "Testi başarıyla tamamladın ve kitap madalyanı kazandın!"
                  : finalAcik
                    ? "Tüm bölümleri tamamladın! Testi geç, kitap madalyanı kazan."
                    : `Tüm bölümleri tamamladığında bu kapı açılacak (${ilerleme.tamamlananBolum} / ${kitap.bolumler.length}).`}
              </p>
            </div>
            {kitap.quizYolu ? (
              ilerleme.bittiMi ? (
                <DurumCipi durum="tamamlandi" />
              ) : finalAcik ? (
                <Buton
                  varyant="altin"
                  onClick={() => router.push(kitap.quizYolu as string)}
                >
                  Final Testine Geç
                </Buton>
              ) : (
                <DurumCipi durum="kilitli" />
              )
            ) : (
              <DurumCipi durum="kilitli" metin="Yakında" />
            )}
          </div>
        </Kart>

        <p className="mt-6 pb-8 text-center font-govde text-sm text-murekkep-soluk">
          İpucu: Her bölümü dikkatle oku, soruları düşünerek cevapla ve tüm
          rozetleri topla!
        </p>
      </div>
    </main>
  );
}
