"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useParentData, type ChildProfile } from "../../../src/lib/parent/ParentDataProvider";
import {
  kutuphaneListesi,
  normalizeBookName,
  type KutuphaneDurum,
} from "../../../src/lib/derive";
import {
  Buton,
  DurumCipi,
  Ikon,
  IlerlemeCubugu,
  Kart,
  YedekliGorsel,
} from "../../../src/components/ui";
import { VeliCocukSecici } from "../../../src/components/dashboard/VeliCocukSecici";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";

type DurumFiltre = "hepsi" | KutuphaneDurum;

const durumFiltreleri: { deger: DurumFiltre; etiket: string }[] = [
  { deger: "hepsi", etiket: "Tümü" },
  { deger: "devam", etiket: "Devam Eden" },
  { deger: "tamamlandi", etiket: "Tamamlanan" },
  { deger: "yeni", etiket: "Yeni Açılan" },
  { deger: "kilitli", etiket: "Kilitli" },
];

const aksiyonMetni: Record<Exclude<KutuphaneDurum, "kilitli">, string> = {
  tamamlandi: "Tekrar Oku",
  devam: "Devam Et",
  yeni: "Yolculuğa Başla",
};

export default function KutuphaneSayfasi() {
  const router = useRouter();
  const { profiles, books, progressByProfile, isLoading } = useParentData();

  const [secilenCocukId, setSecilenCocukId] = useState<string | null>(null);
  const [durumFiltre, setDurumFiltre] = useState<DurumFiltre>("hepsi");
  const [arama, setArama] = useState("");

  const aktifCocukId =
    secilenCocukId && profiles.some((p) => p.id === secilenCocukId)
      ? secilenCocukId
      : profiles[0]?.id ?? null;
  const aktifCocuk = profiles.find((p) => p.id === aktifCocukId) ?? null;

  const kitaplar = useMemo(() => {
    if (!aktifCocukId) return [];
    return kutuphaneListesi(books, progressByProfile[aktifCocukId] ?? []);
  }, [books, progressByProfile, aktifCocukId]);

  const gorunenKitaplar = useMemo(() => {
    const aramaNorm = normalizeBookName(arama.trim());
    return kitaplar.filter((kitap) => {
      const durumUyar = durumFiltre === "hepsi" || kitap.durum === durumFiltre;
      const aramaUyar =
        aramaNorm.length === 0 || normalizeBookName(kitap.book.isim).includes(aramaNorm);
      return durumUyar && aramaUyar;
    });
  }, [kitaplar, durumFiltre, arama]);

  const durumSayilari = useMemo(
    () => ({
      devam: kitaplar.filter((kitap) => kitap.durum === "devam").length,
      tamamlandi: kitaplar.filter((kitap) => kitap.durum === "tamamlandi").length,
      acik: kitaplar.filter((kitap) => kitap.durum !== "kilitli").length,
    }),
    [kitaplar],
  );

  function cocuklaOku(child: ChildProfile, bookKey: string | null) {
    window.localStorage.setItem("selected_child_profile_id", child.id);
    window.localStorage.setItem("selected_child_profile_name", child.isim);
    window.localStorage.setItem("selected_child_name", child.isim);
    router.push(bookKey ? `/kitap/${bookKey}` : "/map");
  }

  return (
    <div className="mx-auto max-w-6xl">
      <VeliSayfaBasligi
        baslik="Kütüphane"
        aciklama="Çocuğunun kitap yolculuğunu, ilerleyen okumalarını ve sıradaki açık durağı buradan takip edebilirsin."
      />

      {isLoading ? (
        <Kart className="text-center font-semibold text-murekkep-soluk">
          Kütüphane yükleniyor...
        </Kart>
      ) : profiles.length === 0 ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Henüz çocuk profili yok
          </p>
          <p className="mt-2 text-sm font-medium text-murekkep-soluk">
            Kütüphaneyi görmek için önce bir çocuk profili ekle.
          </p>
          <div className="mt-5 flex justify-center">
            <Buton varyant="altin" onClick={() => router.push("/dashboard/profil-ekle")}>
              Yeni Çocuk Profili Ekle
            </Buton>
          </div>
        </Kart>
      ) : (
        <>
          <Kart className="mb-5 space-y-4">
            <VeliCocukSecici
              profiles={profiles}
              aktifCocukId={aktifCocukId}
              onSec={setSecilenCocukId}
            />

            <div className="border-t border-cizgi pt-4">
              <div className="grid gap-3 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)] lg:items-center">
                <label className="relative block">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-murekkep-soluk">
                    <Ikon ad="arama" boyut={20} />
                  </span>
                  <input
                    value={arama}
                    onChange={(event) => setArama(event.target.value)}
                    placeholder="Kitap ara..."
                    className="h-12 w-full rounded-buton border border-cizgi bg-yuzey pl-11 pr-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:ring-2 focus:ring-eylem/30"
                  />
                </label>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {durumFiltreleri.map((filtre) => {
                    const secili = durumFiltre === filtre.deger;
                    return (
                      <button
                        key={filtre.deger}
                        type="button"
                        onClick={() => setDurumFiltre(filtre.deger)}
                        aria-pressed={secili}
                        className={`min-h-11 rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
                          secili
                            ? "border-vurgu bg-vurgu-yumusak text-murekkep"
                            : "border-cizgi bg-yuzey text-murekkep-soluk hover:bg-yuzey-2"
                        }`}
                      >
                        {filtre.etiket}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Kart>

          <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-eylem">
                <Ikon ad="kitap" boyut={22} />
                {durumSayilari.acik}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">Açık Kitap</p>
            </Kart>
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="harita" boyut={22} />
                {durumSayilari.devam}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">Devam Eden</p>
            </Kart>
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-eylem">
                <Ikon ad="onay" boyut={22} />
                {durumSayilari.tamamlandi}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">Tamamlanan</p>
            </Kart>
          </div>

          {/* Kitap listesi */}
          {gorunenKitaplar.length === 0 ? (
            <Kart className="text-center font-semibold text-murekkep-soluk">
              Bu filtreye uygun kitap bulunamadı.
            </Kart>
          ) : (
            <ol className="grid gap-4 xl:grid-cols-2">
              {gorunenKitaplar.map((kitap) => (
                <li key={kitap.book.id}>
                  <Kart
                    parlak={kitap.durum === "devam"}
                    kilitli={kitap.durum === "kilitli"}
                    className="h-full"
                  >
                    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
                      <YedekliGorsel
                        src={
                          kitap.bookKey
                            ? `/kapaklar/kapak-${kitap.bookKey}.png`
                            : "/kapaklar/placeholder.svg"
                        }
                        yedekSrc="/kapaklar/placeholder.svg"
                        alt={`${kitap.book.isim} kitap kapağı`}
                        className="mx-auto h-44 w-auto rounded-kart object-contain shadow-kart sm:mx-0"
                      />

                      <div className="flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-baslik text-xl font-bold text-murekkep">
                            {kitap.book.isim}
                          </h2>
                          <DurumCipi durum={kitap.durum} />
                        </div>

                        <div className="mt-3">
                          <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-murekkep-soluk">
                            <span>Rozet ilerlemesi</span>
                            <span>
                              {kitap.tamamlanan}/{kitap.toplam}
                            </span>
                          </div>
                          <IlerlemeCubugu yuzde={kitap.yuzde} yuzdeGoster={false} />
                        </div>

                        <div className="mt-4">
                          {kitap.durum === "kilitli" ? (
                            <p className="flex items-start gap-2 rounded-kart border border-cizgi bg-yuzey-2 px-3 py-3 text-base font-medium leading-6 text-murekkep-soluk">
                              <Ikon ad="kilit" boyut={18} className="mt-0.5 shrink-0" />
                              {kitap.oncekiKitapAdi
                                ? `${kitap.book.isim}, ${kitap.oncekiKitapAdi} kitabının finalini tamamlayınca açılacak.`
                                : "Bir önceki kitabın finali tamamlanınca açılacak."}
                            </p>
                          ) : aktifCocuk ? (
                            <Buton
                              varyant={kitap.durum === "yeni" ? "altin" : "eylem"}
                              tamGenislik
                              onClick={() => cocuklaOku(aktifCocuk, kitap.bookKey)}
                            >
                              {aksiyonMetni[kitap.durum]}
                            </Buton>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Kart>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
}
