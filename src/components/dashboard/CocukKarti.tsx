"use client";

import {
  Buton,
  Ikon,
  IlerlemeCubugu,
  Kart,
  OdulIkonu,
  YedekliGorsel,
} from "../ui";
import type { CocukOzeti } from "../../lib/derive";
import { goreliZaman } from "../../lib/zaman";
import type { ChildProfile } from "../../lib/parent/ParentDataProvider";

type GuncelGorev = {
  ad: string;
  durum: "eklendi" | "tamamlandi";
} | null;

type CocukKartiProps = {
  profile: ChildProfile;
  ozet: CocukOzeti;
  /** Çocuğun listesindeki en güncel tek görev (tam liste raporun Görevler sekmesinde) */
  guncelGorev?: GuncelGorev;
  onDevam: () => void;
  onRapor: () => void;
  onDuzenle: () => void;
};

// PROJE-MODELI.md 4.1/4 — çocuk kartı: avatar, unvan, ilerleme, son rozet ve
// güncel "Bugüne Taşı" görevi (tek satır, durum çipiyle). Aksiyonlar 5.3'e uyar.
export function CocukKarti({
  profile,
  ozet,
  guncelGorev,
  onDevam,
  onRapor,
  onDuzenle,
}: CocukKartiProps) {
  const sonOkuma = goreliZaman(ozet.sonAktiviteZamani);

  return (
    <Kart dolgu="yok" className="overflow-hidden">
      <div className="flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 lg:p-6">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-buton border border-cizgi bg-yuzey-2">
            <OdulIkonu
              tip="avatar"
              anahtar={profile.avatar_tipi}
              boyut={58}
              alt={profile.isim}
            />
          </span>
          <div className="min-w-0">
            <h3 className="font-baslik text-2xl font-bold text-murekkep">
              {profile.isim}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-base font-semibold text-eylem">
              <Ikon ad="yildiz" boyut={16} />
              {ozet.unvan}
            </p>
          </div>
        </div>

        {sonOkuma ? (
          <p className="flex min-h-11 items-center gap-2 rounded-full bg-yuzey-2 px-4 text-sm font-semibold text-murekkep-soluk">
            <Ikon ad="saat" boyut={17} />
            Son okuma: {sonOkuma}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 border-t border-cizgi p-4 sm:p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.85fr)] lg:p-6">
        <section className="rounded-kart border border-cizgi bg-yuzey-2 p-4 sm:p-5">
          <p className="text-sm font-semibold text-murekkep-soluk">
            Şu Anda Okuduğu Kitap
          </p>

          {ozet.aktifKitapAdi ? (
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
              {ozet.aktifKitapKey ? (
                <YedekliGorsel
                  src={`/kapaklar/kapak-${ozet.aktifKitapKey}.png`}
                  yedekSrc="/kapaklar/placeholder.svg"
                  alt={`${ozet.aktifKitapAdi} kapağı`}
                  width={72}
                  height={108}
                  className="hidden h-[108px] w-[72px] shrink-0 rounded-buton border border-cizgi object-cover shadow-sm sm:block"
                />
              ) : null}

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h4 className="font-baslik text-xl font-bold text-murekkep">
                    {ozet.aktifKitapAdi}
                  </h4>
                  <span className="shrink-0 text-sm font-bold text-eylem">
                    {ozet.aktifTamamlanan} / {ozet.aktifToplam} rozet
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-murekkep-soluk">
                  Okuma yolculuğu devam ediyor
                </p>
                <IlerlemeCubugu
                  yuzde={ozet.aktifYuzde}
                  etiket={`${ozet.aktifTamamlanan} / ${ozet.aktifToplam} bölüm tamamlandı`}
                  className="mt-4"
                />
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-3 rounded-buton bg-yuzey p-4 text-murekkep-soluk sm:flex-row sm:items-center">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-vurgu-yumusak text-vurgu">
                <Ikon ad="harita" boyut={22} />
              </span>
              <p className="text-base font-semibold">
                İlk kitap yolculuğu keşif haritasından başlayacak.
              </p>
            </div>
          )}
        </section>

        <div className="grid content-start gap-4">
          <section className="rounded-kart border border-cizgi bg-yuzey-2 p-4">
            {ozet.sonRozetIconKey ? (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <OdulIkonu
                  tip="rozet"
                  anahtar={ozet.sonRozetIconKey}
                  boyut={52}
                  alt={ozet.sonRozetAdi ?? "Rozet"}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                    Son Rozet
                  </p>
                  <p className="mt-1 text-base font-bold leading-snug text-murekkep">
                    {ozet.sonRozetAdi ?? `${ozet.kazanilanRozet} rozet kazanıldı`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-yuzey text-murekkep-soluk">
                  <Ikon ad="rozet" boyut={24} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                    Son Rozet
                  </p>
                  <p className="mt-1 text-base font-semibold text-murekkep-soluk">
                    İlk rozet, ilk bölüm tamamlanınca görünecek.
                  </p>
                </div>
              </div>
            )}
          </section>

          {guncelGorev ? (
            <section className="rounded-kart border border-eylem/25 bg-eylem-yumusak p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-yuzey text-eylem">
                  <Ikon ad="fidan" boyut={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-eylem-koyu">
                      Güncel Görev
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        guncelGorev.durum === "tamamlandi"
                          ? "bg-eylem text-eylem-metin"
                          : "bg-yuzey text-eylem-koyu"
                      }`}
                    >
                      {guncelGorev.durum === "tamamlandi" ? "Tamamladı" : "Listesinde"}
                    </span>
                  </div>
                  <p className="mt-2 text-base font-semibold leading-snug text-murekkep">
                    {guncelGorev.ad}
                  </p>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-cizgi p-4 sm:grid-cols-[1.25fr_1fr_1fr] sm:p-5 lg:p-6">
        <Buton
          varyant="eylem"
          tamGenislik
          onClick={onDevam}
          className="col-span-2 sm:col-span-1"
        >
          <Ikon ad="kitap" boyut={19} />
          {ozet.aktifKitapAdi ? "Okumaya Devam Et" : "Keşif Haritasını Aç"}
        </Buton>
        <Buton varyant="ikincil" boyut="kucuk" tamGenislik onClick={onRapor}>
          <Ikon ad="dusunce" boyut={18} />
          Gelişim Raporu
        </Buton>
        <Buton varyant="cerceve" boyut="kucuk" tamGenislik onClick={onDuzenle}>
          <Ikon ad="hesap" boyut={18} />
          Profili Düzenle
        </Buton>
      </div>
    </Kart>
  );
}
