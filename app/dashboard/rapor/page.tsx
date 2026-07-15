"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParentData } from "../../../src/lib/parent/ParentDataProvider";
import { cocukOzeti } from "../../../src/lib/derive";
import { Buton, Ikon, Kart, OdulIkonu } from "../../../src/components/ui";

export default function RaporlarSayfasi() {
  const router = useRouter();
  const { profiles, books, progressByProfile, isLoading } = useParentData();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Veli Paneli
        </p>
        <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          Gelişim Raporları
        </h1>
        <p className="mt-1 text-sm font-medium text-murekkep-soluk">
          Raporunu görüntülemek istediğin çocuğu seç.
        </p>
      </div>

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
        <div className="grid gap-3">
          {profiles.map((profile) => {
            const ozet = cocukOzeti(progressByProfile[profile.id] ?? [], books);
            return (
              <Link key={profile.id} href={`/dashboard/rapor/${profile.id}`}>
                <Kart className="flex items-center gap-4 transition-colors hover:border-vurgu">
                  <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-buton border border-cizgi bg-yuzey-2">
                    <OdulIkonu tip="avatar" anahtar={profile.avatar_tipi} boyut={48} alt={profile.isim} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-baslik text-lg font-bold text-murekkep">
                      {profile.isim}
                    </h2>
                    <p className="text-sm font-semibold text-eylem">{ozet.unvan}</p>
                  </div>
                  <Ikon ad="ok-sag" boyut={20} className="shrink-0 text-murekkep-soluk" />
                </Kart>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
