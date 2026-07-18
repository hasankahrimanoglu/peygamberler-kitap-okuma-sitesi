"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParentData } from "../../../src/lib/parent/ParentDataProvider";
import { cocukOzeti } from "../../../src/lib/derive";
import { goreliZaman } from "../../../src/lib/zaman";
import {
  Buton,
  Ikon,
  IlerlemeCubugu,
  Kart,
  OdulIkonu,
} from "../../../src/components/ui";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";

export default function RaporlarSayfasi() {
  const router = useRouter();
  const { profiles, books, progressByProfile, isLoading } = useParentData();

  return (
    <div className="mx-auto max-w-6xl">
      <VeliSayfaBasligi
        baslik="Gelişim Raporları"
        aciklama="Bir çocuğun kitap yolculuğunu, kazanımlarını, görevlerini ve aile sohbeti önerilerini incelemek için profilini seç."
      />

      {isLoading ? (
        <Kart className="text-center font-semibold text-murekkep-soluk">
          Yükleniyor...
        </Kart>
      ) : profiles.length === 0 ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Henüz çocuk profili yok
          </p>
          <div className="mt-5 flex justify-center">
            <Buton varyant="altin" onClick={() => router.push("/dashboard/profil-ekle")}>
              Yeni Çocuk Profili Ekle
            </Buton>
          </div>
        </Kart>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {profiles.map((profile) => {
            const ozet = cocukOzeti(progressByProfile[profile.id] ?? [], books);
            const sonOkuma = goreliZaman(ozet.sonAktiviteZamani);
            return (
              <Link
                key={profile.id}
                href={`/dashboard/rapor/${profile.id}`}
                className="group"
              >
                <Kart dolgu="yok" className="h-full overflow-hidden transition-colors group-hover:border-vurgu">
                  <div className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-buton border border-cizgi bg-yuzey-2">
                        <OdulIkonu
                          tip="avatar"
                          anahtar={profile.avatar_tipi}
                          boyut={56}
                          alt={profile.isim}
                        />
                      </span>
                      <div>
                        <h2 className="font-baslik text-xl font-bold text-murekkep">
                          {profile.isim}
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 text-base font-semibold text-eylem">
                          <Ikon ad="yildiz" boyut={16} />
                          {ozet.unvan}
                        </p>
                      </div>
                    </div>
                    {sonOkuma ? (
                      <p className="flex min-h-11 items-center gap-2 rounded-full bg-yuzey-2 px-3 text-sm font-semibold text-murekkep-soluk">
                        <Ikon ad="saat" boyut={16} />
                        {sonOkuma}
                      </p>
                    ) : null}
                  </div>

                  <div className="border-t border-cizgi p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-murekkep-soluk">
                          Güncel Kitap
                        </p>
                        <p className="mt-1 font-baslik text-lg font-bold text-murekkep">
                          {ozet.aktifKitapAdi ?? "Henüz yolculuğa başlanmadı"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-baslik text-xl font-bold text-vurgu">
                          {ozet.kazanilanRozet}
                        </p>
                        <p className="text-sm font-semibold text-murekkep-soluk">Rozet</p>
                      </div>
                    </div>

                    {ozet.aktifKitapAdi ? (
                      <IlerlemeCubugu
                        yuzde={ozet.aktifYuzde}
                        etiket={`${ozet.aktifTamamlanan} / ${ozet.aktifToplam} bölüm tamamlandı`}
                        className="mt-4"
                      />
                    ) : null}

                    <span className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-buton border border-cizgi bg-yuzey-2 font-baslik text-base font-semibold text-murekkep transition-colors group-hover:bg-eylem-yumusak group-hover:text-eylem-koyu">
                      Raporu Aç
                      <Ikon ad="ok-sag" boyut={18} />
                    </span>
                  </div>
                </Kart>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
