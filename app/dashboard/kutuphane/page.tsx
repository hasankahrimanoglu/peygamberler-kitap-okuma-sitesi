"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
  OdulIkonu,
  YedekliGorsel,
} from "../../../src/components/ui";

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

  function cocuklaOku(child: ChildProfile, bookKey: string | null) {
    window.localStorage.setItem("selected_child_profile_id", child.id);
    window.localStorage.setItem("selected_child_profile_name", child.isim);
    window.localStorage.setItem("selected_child_name", child.isim);
    router.push(bookKey ? `/kitap/${bookKey}` : "/map");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Veli Paneli
        </p>
        <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          Kütüphane
        </h1>
        <p className="mt-1 text-sm font-medium text-murekkep-soluk">
          Çocuğunun kitap yolculuğunu ve hangi durakların açık olduğunu buradan izle.
        </p>
      </div>

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
          {/* Çocuk seçici */}
          {profiles.length > 1 ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {profiles.map((child) => {
                const secili = child.id === aktifCocukId;
                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => setSecilenCocukId(child.id)}
                    aria-pressed={secili}
                    className={`min-h-[44px] rounded-buton border px-4 py-2 text-sm font-semibold transition-colors ${
                      secili
                        ? "border-eylem bg-eylem-yumusak text-eylem"
                        : "border-cizgi bg-yuzey text-murekkep hover:bg-yuzey-2"
                    }`}
                  >
                    {child.isim}
                  </button>
                );
              })}
            </div>
          ) : null}

          {/* Arama + durum filtreleri */}
          <div className="mb-5 flex flex-col gap-3">
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

            <div className="flex flex-wrap gap-2">
              {durumFiltreleri.map((filtre) => {
                const secili = durumFiltre === filtre.deger;
                return (
                  <button
                    key={filtre.deger}
                    type="button"
                    onClick={() => setDurumFiltre(filtre.deger)}
                    aria-pressed={secili}
                    className={`min-h-[44px] rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
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

          {/* Kitap listesi */}
          {gorunenKitaplar.length === 0 ? (
            <Kart className="text-center font-semibold text-murekkep-soluk">
              Bu filtreye uygun kitap bulunamadı.
            </Kart>
          ) : (
            <ol className="space-y-4">
              {gorunenKitaplar.map((kitap) => (
                <li key={kitap.book.id}>
                  <Kart
                    parlak={kitap.durum === "devam"}
                    kilitli={kitap.durum === "kilitli"}
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
                        className="mx-auto h-40 w-auto rounded-kart object-contain shadow-kart sm:mx-0"
                      />

                      <div className="flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-baslik text-xl font-bold text-murekkep">
                            {kitap.book.isim}
                          </h2>
                          <DurumCipi durum={kitap.durum} />
                        </div>

                        <div className="mt-3">
                          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-murekkep-soluk">
                            <span>Rozet ilerlemesi</span>
                            <span>
                              {kitap.tamamlanan}/{kitap.toplam}
                            </span>
                          </div>
                          <IlerlemeCubugu yuzde={kitap.yuzde} yuzdeGoster={false} />
                        </div>

                        <div className="mt-4">
                          {kitap.durum === "kilitli" ? (
                            <p className="flex items-start gap-2 rounded-kart border border-cizgi bg-yuzey-2 px-3 py-2.5 text-sm font-medium text-murekkep-soluk">
                              <Ikon ad="kilit" boyut={16} className="mt-0.5 shrink-0" />
                              {kitap.oncekiKitapAdi
                                ? `${kitap.book.isim}, ${kitap.oncekiKitapAdi} kitabının finalini tamamlayınca açılacak.`
                                : "Bir önceki kitabın finali tamamlanınca açılacak."}
                            </p>
                          ) : aktifCocuk ? (
                            <Buton
                              varyant={kitap.durum === "yeni" ? "altin" : "eylem"}
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

          <div className="mt-6 flex items-center gap-2 text-sm text-murekkep-soluk">
            <OdulIkonu tip="avatar" anahtar={aktifCocuk?.avatar_tipi ?? "lantern"} boyut={28} />
            <span>
              <span className="font-semibold text-murekkep">{aktifCocuk?.isim}</span> için
              kütüphane gösteriliyor.
            </span>
            <Link
              href="/dashboard"
              className="ml-auto font-semibold text-eylem hover:underline"
            >
              Ana Sayfa
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
