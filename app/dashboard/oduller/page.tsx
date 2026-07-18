"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useParentData } from "../../../src/lib/parent/ParentDataProvider";
import {
  cocukOzeti,
  madalyaVitrini,
  rozetVitrini,
  unvanVitrini,
  type RozetOgesi,
} from "../../../src/lib/derive";
import { Buton, Ikon, Kart, OdulIkonu } from "../../../src/components/ui";
import { VeliCocukSecici } from "../../../src/components/dashboard/VeliCocukSecici";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";

type Sekme = "rozetler" | "madalyalar" | "unvanlar";

const sekmeler: { deger: Sekme; etiket: string }[] = [
  { deger: "rozetler", etiket: "Rozetler" },
  { deger: "madalyalar", etiket: "Madalyalar" },
  { deger: "unvanlar", etiket: "Unvanlar" },
];

export default function OdullerSayfasi() {
  const router = useRouter();
  const { profiles, books, progressByProfile, isLoading } = useParentData();

  const [secilenCocukId, setSecilenCocukId] = useState<string | null>(null);
  const [sekme, setSekme] = useState<Sekme>("rozetler");
  const [secilenRozet, setSecilenRozet] = useState<RozetOgesi | null>(null);

  const aktifCocukId =
    secilenCocukId && profiles.some((p) => p.id === secilenCocukId)
      ? secilenCocukId
      : profiles[0]?.id ?? null;

  const veriler = useMemo(() => {
    const progress = aktifCocukId ? progressByProfile[aktifCocukId] ?? [] : [];
    const ozet = cocukOzeti(progress, books);
    const rozetler = rozetVitrini(books, progress);
    const madalyalar = madalyaVitrini(books, progress);
    const unvanlar = unvanVitrini(ozet.tamamlananKitap);
    return {
      rozetler,
      madalyalar,
      unvanlar,
      kazanilanRozet: rozetler.filter((r) => r.kazanildi).length,
      kazanilanMadalya: madalyalar.filter((m) => m.kazanildi).length,
      guncelUnvan: unvanlar.find((u) => u.guncelMi)?.unvan ?? ozet.unvan,
    };
  }, [aktifCocukId, progressByProfile, books]);

  return (
    <div className="mx-auto max-w-6xl">
      <VeliSayfaBasligi
        baslik="Ödüller"
        aciklama="Çocuğunun bölüm rozetlerini, tamamlanan kitaplardan kazandığı madalyaları ve ulaştığı unvanları burada görebilirsin."
      />

      {isLoading ? (
        <Kart className="text-center font-semibold text-murekkep-soluk">
          Ödüller yükleniyor...
        </Kart>
      ) : profiles.length === 0 ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Henüz çocuk profili yok
          </p>
          <p className="mt-2 text-sm font-medium text-murekkep-soluk">
            Ödülleri görmek için önce bir çocuk profili ekle.
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

            <div
              role="tablist"
              aria-label="Ödül türleri"
              className="grid grid-cols-3 gap-1 border-t border-cizgi pt-4"
            >
              {sekmeler.map((s) => {
                const secili = sekme === s.deger;
                return (
                  <button
                    key={s.deger}
                    type="button"
                    role="tab"
                    aria-selected={secili}
                    onClick={() => setSekme(s.deger)}
                    className={`min-h-12 rounded-buton px-3 py-2 text-sm font-bold transition-colors ${
                      secili
                        ? "bg-eylem-yumusak text-eylem-koyu shadow-sm"
                        : "bg-yuzey-2 text-murekkep-soluk hover:text-murekkep"
                    }`}
                  >
                    {s.etiket}
                  </button>
                );
              })}
            </div>
          </Kart>

          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="rozet" boyut={22} />
                {veriler.kazanilanRozet}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                Kazanılan Rozet
              </p>
            </Kart>
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="madalya" boyut={22} />
                {veriler.kazanilanMadalya}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                Kazanılan Madalya
              </p>
            </Kart>
            <Kart className="col-span-2 text-center sm:col-span-1">
              <p className="font-baslik text-lg font-bold text-eylem">
                {veriler.guncelUnvan}
              </p>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                Güncel Unvan
              </p>
            </Kart>
          </div>

          {sekme === "rozetler" ? (
            <div>
              <p className="mb-4 text-base font-semibold text-murekkep-soluk">
                {veriler.kazanilanRozet} / {veriler.rozetler.length} rozet kazanıldı
              </p>
              {veriler.rozetler.length === 0 ? (
                <Kart className="text-center font-semibold text-murekkep-soluk">
                  Bu çocuk için rozet bilgisi bulunamadı.
                </Kart>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {veriler.rozetler.map((rozet) => (
                    <button
                      key={`${rozet.bookKey}-${rozet.bolumNo}`}
                      type="button"
                      onClick={() => setSecilenRozet(rozet)}
                      className="flex min-h-[148px] flex-col items-center justify-center gap-3 rounded-kart border border-cizgi bg-yuzey p-4 text-center transition-colors hover:border-vurgu"
                    >
                      {/* Görünür başlık hemen altta; görsel dekoratif (alt=""). */}
                      <OdulIkonu
                        tip="rozet"
                        anahtar={rozet.iconKey}
                        kazanildi={rozet.kazanildi}
                        boyut={68}
                      />
                      <span
                        className={`text-sm font-semibold leading-snug ${
                          rozet.kazanildi ? "text-murekkep" : "text-murekkep-soluk"
                        }`}
                      >
                        {rozet.ad}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {sekme === "madalyalar" ? (
            <div>
              <p className="mb-4 text-base font-semibold text-murekkep-soluk">
                {veriler.kazanilanMadalya} / {veriler.madalyalar.length} madalya kazanıldı
              </p>
              {veriler.madalyalar.length === 0 ? (
                <Kart className="text-center font-semibold text-murekkep-soluk">
                  Bu çocuk için madalya bilgisi bulunamadı.
                </Kart>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {veriler.madalyalar.map((madalya) => (
                    <Kart
                      key={madalya.bookKey}
                      parlak={madalya.kazanildi}
                      kilitli={!madalya.kazanildi}
                      className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
                    >
                      <OdulIkonu
                        tip="madalya"
                        anahtar={madalya.iconKey}
                        kazanildi={madalya.kazanildi}
                        boyut={56}
                      />
                      <div className="min-w-0">
                        <p className="font-baslik text-base font-bold text-murekkep">
                          {madalya.ad}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                          {madalya.kazanildi ? "Kazanıldı" : "Kitabı bitirince açılacak"}
                        </p>
                      </div>
                    </Kart>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {sekme === "unvanlar" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {veriler.unvanlar.map((unvan) => (
                <Kart
                  key={unvan.unvan}
                  parlak={unvan.guncelMi}
                  kilitli={!unvan.kazanildi}
                  className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
                >
                  <OdulIkonu
                    tip="unvan"
                    anahtar={unvan.iconKey}
                    kazanildi={unvan.kazanildi}
                    boyut={56}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-baslik text-base font-bold text-murekkep">
                        {unvan.unvan}
                      </p>
                      {unvan.guncelMi ? (
                        <span className="rounded-full bg-eylem-yumusak px-2.5 py-1 text-xs font-bold text-eylem">
                          Şu an
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                      {unvan.kitapEsik === 0
                        ? "Başlangıç unvanı"
                        : `${unvan.kitapEsik} kitap tamamlanınca`}
                    </p>
                  </div>
                </Kart>
              ))}
            </div>
          ) : null}
        </>
      )}

      {/* Rozet detay */}
      <AnimatePresence>
        {secilenRozet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-gece-950/45 px-5 backdrop-blur-sm"
            onClick={() => setSecilenRozet(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-kart border border-cizgi bg-yuzey p-6 text-center shadow-kart"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSecilenRozet(null)}
                  aria-label="Kapat"
                  className="grid h-11 w-11 place-items-center rounded-full border border-cizgi text-murekkep-soluk transition-colors hover:bg-yuzey-2"
                >
                  <Ikon ad="kapat" boyut={16} />
                </button>
              </div>
              <div className="flex justify-center">
                <OdulIkonu
                  tip="rozet"
                  anahtar={secilenRozet.iconKey}
                  kazanildi={secilenRozet.kazanildi}
                  boyut={112}
                />
              </div>
              <h3 className="mt-4 font-baslik text-xl font-bold text-murekkep">
                {secilenRozet.ad}
              </h3>
              <p className="mt-1 text-sm font-semibold text-murekkep-soluk">
                {secilenRozet.bookIsim} • {secilenRozet.bolumNo}. Bölüm
              </p>
              <p
                className={`mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-bold ${
                  secilenRozet.kazanildi
                    ? "bg-eylem-yumusak text-eylem"
                    : "bg-yuzey-2 text-murekkep-soluk"
                }`}
              >
                {secilenRozet.kazanildi ? "Kazanıldı" : "Henüz kazanılmadı"}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
