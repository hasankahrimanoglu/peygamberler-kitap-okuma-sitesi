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
    };
  }, [aktifCocukId, progressByProfile, books]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Veli Paneli
        </p>
        <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          Ödüller
        </h1>
        <p className="mt-1 text-sm font-medium text-murekkep-soluk">
          Çocuğunun topladığı rozetler, kazandığı madalyalar ve unvan yolculuğu.
        </p>
      </div>

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

          {/* Sekme kontrolü */}
          <div
            role="tablist"
            aria-label="Ödül türleri"
            className="mb-5 inline-flex rounded-buton border border-cizgi bg-yuzey-2 p-1"
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
                  className={`min-h-[44px] rounded-[0.7rem] px-4 py-1.5 text-sm font-semibold transition-colors ${
                    secili
                      ? "bg-yuzey text-murekkep shadow-kart"
                      : "text-murekkep-soluk hover:text-murekkep"
                  }`}
                >
                  {s.etiket}
                </button>
              );
            })}
          </div>

          {sekme === "rozetler" ? (
            <div>
              <p className="mb-4 text-sm font-semibold text-murekkep-soluk">
                {veriler.kazanilanRozet} / {veriler.rozetler.length} rozet kazanıldı
              </p>
              {veriler.rozetler.length === 0 ? (
                <Kart className="text-center font-semibold text-murekkep-soluk">
                  Bu çocuk için rozet bilgisi bulunamadı.
                </Kart>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {veriler.rozetler.map((rozet) => (
                    <button
                      key={`${rozet.bookKey}-${rozet.bolumNo}`}
                      type="button"
                      onClick={() => setSecilenRozet(rozet)}
                      className="flex flex-col items-center gap-1.5 rounded-kart border border-cizgi bg-yuzey p-3 text-center transition-colors hover:border-vurgu"
                    >
                      <OdulIkonu
                        tip="rozet"
                        anahtar={rozet.iconKey}
                        kazanildi={rozet.kazanildi}
                        boyut={56}
                        alt={rozet.ad}
                      />
                      <span
                        className={`text-[11px] font-semibold leading-tight ${
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
              <p className="mb-4 text-sm font-semibold text-murekkep-soluk">
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
                      className="flex items-center gap-3"
                    >
                      <OdulIkonu
                        tip="madalya"
                        anahtar={madalya.iconKey}
                        kazanildi={madalya.kazanildi}
                        boyut={56}
                        alt={madalya.ad}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-baslik text-sm font-bold text-murekkep">
                          {madalya.ad}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-murekkep-soluk">
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
                  className="flex items-center gap-3"
                >
                  <OdulIkonu
                    tip="unvan"
                    anahtar={unvan.iconKey}
                    kazanildi={unvan.kazanildi}
                    boyut={56}
                    alt={unvan.unvan}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-baslik text-sm font-bold text-murekkep">
                        {unvan.unvan}
                      </p>
                      {unvan.guncelMi ? (
                        <span className="rounded-full bg-eylem-yumusak px-2 py-0.5 text-[10px] font-bold text-eylem">
                          Şu an
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-murekkep-soluk">
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-cizgi text-murekkep-soluk transition-colors hover:bg-yuzey-2"
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
                  alt={secilenRozet.ad}
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
