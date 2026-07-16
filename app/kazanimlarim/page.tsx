"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import {
  cocukOzeti,
  madalyaVitrini,
  rozetVitrini,
  unvanVitrini,
  unvanAnahtari,
  type RozetOgesi,
} from "../../src/lib/derive";
import { Buton, Ikon, Kart, OdulIkonu } from "../../src/components/ui";

type Sekme = "rozetler" | "madalyalar" | "unvanlar";

const sekmeler: { deger: Sekme; etiket: string }[] = [
  { deger: "rozetler", etiket: "Rozetler" },
  { deger: "madalyalar", etiket: "Madalyalar" },
  { deger: "unvanlar", etiket: "Unvanlar" },
];

export default function KazanimlarimSayfasi() {
  const router = useRouter();
  const { isLoading, child, books, progress } = useSelectedChild();
  const [sekme, setSekme] = useState<Sekme>("rozetler");
  const [secilenRozet, setSecilenRozet] = useState<RozetOgesi | null>(null);

  const veriler = useMemo(() => {
    const ozet = cocukOzeti(progress, books);
    const rozetler = rozetVitrini(books, progress);
    const madalyalar = madalyaVitrini(books, progress);
    const unvanlar = unvanVitrini(ozet.tamamlananKitap);
    return {
      ozet,
      rozetler,
      madalyalar,
      unvanlar,
      kazanilanRozet: rozetler.filter((r) => r.kazanildi).length,
      kazanilanMadalya: madalyalar.filter((m) => m.kazanildi).length,
    };
  }, [progress, books]);

  return (
    <main className="tema-cocuk zemin-yildizli relative min-h-screen text-murekkep">
      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-8">
        {/* Üst bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Buton varyant="cerceve" boyut="kucuk" onClick={() => router.push("/map")}>
            <Ikon ad="geri" boyut={16} />
            Haritaya Dön
          </Buton>
          <Buton
            varyant="cerceve"
            boyut="kucuk"
            onClick={() => router.push("/kelime-defterim")}
          >
            <Ikon ad="kitap" boyut={16} />
            Kelime Defterim
          </Buton>
        </div>

        {/* Hero */}
        <header className="mb-8">
          <Kart parlak className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-altin-400/60 bg-yuzey-2">
              <OdulIkonu
                tip="avatar"
                anahtar={child?.avatarType ?? "lantern"}
                boyut={70}
                alt={child?.name ?? ""}
              />
            </div>
            <div className="flex-1">
              <p className="font-govde text-sm text-murekkep-soluk">Kazanımlarım</p>
              <h1 className="font-baslik text-3xl font-bold">
                {child?.name ?? "Gezgin"}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 font-baslik text-sm font-bold text-vurgu sm:justify-start">
                <Ikon ad="yildiz" boyut={15} />
                {veriler.ozet.unvan}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="rounded-buton bg-yuzey-2 px-4 py-2 text-center">
                <p className="font-baslik text-xl font-bold text-vurgu">
                  {veriler.kazanilanRozet}
                </p>
                <p className="font-govde text-[11px] text-murekkep-soluk">Rozet</p>
              </div>
              <div className="rounded-buton bg-yuzey-2 px-4 py-2 text-center">
                <p className="font-baslik text-xl font-bold text-vurgu">
                  {veriler.kazanilanMadalya}
                </p>
                <p className="font-govde text-[11px] text-murekkep-soluk">Madalya</p>
              </div>
            </div>
          </Kart>
        </header>

        {isLoading ? (
          <Kart className="text-center font-govde text-murekkep-soluk">
            Kazanımların hazırlanıyor...
          </Kart>
        ) : (
          <>
            {/* Sekmeler */}
            <div
              role="tablist"
              aria-label="Kazanım türleri"
              className="mb-6 inline-flex rounded-buton border border-cizgi bg-yuzey-2 p-1"
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
                    className={`min-h-[44px] rounded-[0.7rem] px-4 py-1.5 font-baslik text-sm font-semibold transition-colors ${
                      secili
                        ? "bg-vurgu text-gece-950 shadow-parlama"
                        : "text-murekkep-soluk hover:text-murekkep"
                    }`}
                  >
                    {s.etiket}
                  </button>
                );
              })}
            </div>

            {sekme === "rozetler" ? (
              veriler.rozetler.length === 0 ? (
                <Kart className="text-center font-govde text-murekkep-soluk">
                  İlk rozetini ilk bölümü bitirince kazanacaksın!
                </Kart>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {veriler.rozetler.map((rozet) => (
                    <button
                      key={`${rozet.bookKey}-${rozet.bolumNo}`}
                      type="button"
                      onClick={() => setSecilenRozet(rozet)}
                      className="flex flex-col items-center gap-1.5 rounded-kart border border-cizgi bg-yuzey p-3 text-center transition-colors hover:border-altin-400/70"
                    >
                      {/* Görünür başlık hemen altta; görsel dekoratif (alt=""). */}
                      <OdulIkonu
                        tip="rozet"
                        anahtar={rozet.iconKey}
                        kazanildi={rozet.kazanildi}
                        boyut={56}
                      />
                      <span
                        className={`font-govde text-[11px] font-semibold leading-tight ${
                          rozet.kazanildi ? "text-murekkep" : "text-murekkep-soluk"
                        }`}
                      >
                        {rozet.ad}
                      </span>
                    </button>
                  ))}
                </div>
              )
            ) : null}

            {sekme === "madalyalar" ? (
              veriler.madalyalar.length === 0 ? (
                <Kart className="text-center font-govde text-murekkep-soluk">
                  Bir kitabı sonuna kadar bitirince ilk madalyan gelecek!
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
                      />
                      <div className="min-w-0">
                        <p className="truncate font-baslik text-sm font-bold">
                          {madalya.ad}
                        </p>
                        <p className="mt-0.5 font-govde text-xs text-murekkep-soluk">
                          {madalya.kazanildi ? "Kazanıldı" : "Kitabı bitirince açılır"}
                        </p>
                      </div>
                    </Kart>
                  ))}
                </div>
              )
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
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-baslik text-sm font-bold">
                          {unvan.unvan}
                        </p>
                        {unvan.guncelMi ? (
                          <span className="rounded-full bg-vurgu px-2 py-0.5 text-[10px] font-bold text-gece-950">
                            Şu an
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 font-govde text-xs text-murekkep-soluk">
                        {unvan.kitapEsik === 0
                          ? "Başlangıç unvanı"
                          : `${unvan.kitapEsik} kitap tamamlayınca`}
                      </p>
                    </div>
                  </Kart>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Rozet detay */}
      <AnimatePresence>
        {secilenRozet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-gece-950/70 px-5 backdrop-blur-sm"
            onClick={() => setSecilenRozet(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-kart border border-altin-400/50 bg-yuzey p-6 text-center shadow-parlama"
            >
              <div className="mb-2 flex justify-end">
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
                  boyut={120}
                />
              </div>
              <h3 className="mt-4 font-baslik text-xl font-bold">{secilenRozet.ad}</h3>
              <p className="mt-1 font-govde text-sm text-murekkep-soluk">
                {secilenRozet.bookIsim} • {secilenRozet.bolumNo}. Bölüm
              </p>
              <p
                className={`mt-4 inline-block rounded-full px-4 py-1.5 font-baslik text-sm font-bold ${
                  secilenRozet.kazanildi
                    ? "bg-vurgu text-gece-950"
                    : "bg-yuzey-2 text-murekkep-soluk"
                }`}
              >
                {secilenRozet.kazanildi ? "Kazandın!" : "Bu bölümü bitirince senin olacak"}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
