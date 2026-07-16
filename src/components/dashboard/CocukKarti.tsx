"use client";

import { Buton, Ikon, IlerlemeCubugu, Kart, OdulIkonu } from "../ui";
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
  return (
    <Kart className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-buton border border-cizgi bg-yuzey-2">
          <OdulIkonu tip="avatar" anahtar={profile.avatar_tipi} boyut={56} alt={profile.isim} />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-baslik text-xl font-bold text-murekkep">
            {profile.isim}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-eylem">
            <Ikon ad="yildiz" boyut={15} />
            {ozet.unvan}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-murekkep-soluk">
          <span className="truncate">
            {ozet.aktifKitapAdi ?? "Henüz yolculuğa başlanmadı"}
          </span>
          {ozet.aktifKitapAdi ? (
            <span className="shrink-0">
              {ozet.aktifTamamlanan}/{ozet.aktifToplam} rozet
            </span>
          ) : null}
        </div>
        <IlerlemeCubugu yuzde={ozet.aktifYuzde} yuzdeGoster={false} />
      </div>

      <div className="flex items-center gap-3 rounded-kart border border-cizgi bg-yuzey-2 px-3 py-2.5">
        {ozet.sonRozetIconKey ? (
          <>
            <OdulIkonu tip="rozet" anahtar={ozet.sonRozetIconKey} boyut={40} alt={ozet.sonRozetAdi ?? "Rozet"} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-murekkep-soluk">
                Son Rozet
              </p>
              <p className="truncate text-sm font-bold text-murekkep">
                {ozet.sonRozetAdi ?? `${ozet.kazanilanRozet} rozet kazanıldı`}
              </p>
            </div>
          </>
        ) : (
          <>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-yuzey text-murekkep-soluk">
              <Ikon ad="rozet" boyut={22} />
            </span>
            <p className="text-sm font-semibold text-murekkep-soluk">
              İlk rozet ilk bölümle kazanılacak.
            </p>
          </>
        )}
      </div>

      {guncelGorev ? (
        <div className="flex items-start gap-2 rounded-kart border border-eylem/25 bg-eylem-yumusak px-3 py-2.5">
          <Ikon ad="fidan" boyut={18} className="mt-0.5 shrink-0 text-eylem" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-eylem-koyu">
                Güncel Görev
              </p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  guncelGorev.durum === "tamamlandi"
                    ? "bg-eylem text-eylem-metin"
                    : "bg-yuzey text-eylem-koyu"
                }`}
              >
                {guncelGorev.durum === "tamamlandi" ? "Tamamladı" : "Listesinde"}
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm font-medium leading-snug text-murekkep">
              {guncelGorev.ad}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-auto grid gap-2.5">
        {goreliZaman(ozet.sonAktiviteZamani) ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-murekkep-soluk">
            <Ikon ad="saat" boyut={14} />
            Son okuma: {goreliZaman(ozet.sonAktiviteZamani)}
          </p>
        ) : null}
        <Buton varyant="eylem" tamGenislik onClick={onDevam}>
          Okumaya Devam Et
        </Buton>
        <div className="grid grid-cols-2 gap-2.5">
          <Buton varyant="ikincil" boyut="kucuk" onClick={onRapor}>
            Gelişim Raporu
          </Buton>
          <Buton varyant="cerceve" boyut="kucuk" onClick={onDuzenle}>
            Profili Düzenle
          </Buton>
        </div>
      </div>
    </Kart>
  );
}
