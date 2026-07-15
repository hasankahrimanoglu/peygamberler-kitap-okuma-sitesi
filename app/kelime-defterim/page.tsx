"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import { kelimeDefteri, normalizeBookName } from "../../src/lib/derive";
import { Buton, Ikon, Kart } from "../../src/components/ui";

export default function KelimeDefterimSayfasi() {
  const router = useRouter();
  const { isLoading, child, books, progress } = useSelectedChild();
  const [arama, setArama] = useState("");

  const kelimeler = useMemo(() => {
    const hepsi = kelimeDefteri(books, progress);
    // Aynı kelime birden çok bölümde geçebilir — kelime+anlam çiftinde tekilleştir.
    const gorulen = new Set<string>();
    const tekil = hepsi.filter((k) => {
      const anahtar = `${normalizeBookName(k.word)}|${k.meaning}`;
      if (gorulen.has(anahtar)) return false;
      gorulen.add(anahtar);
      return true;
    });
    return tekil.sort((a, b) => a.word.localeCompare(b.word, "tr-TR"));
  }, [books, progress]);

  const gorunen = useMemo(() => {
    const aramaNorm = normalizeBookName(arama.trim());
    if (!aramaNorm) return kelimeler;
    return kelimeler.filter(
      (k) =>
        normalizeBookName(k.word).includes(aramaNorm) ||
        normalizeBookName(k.meaning).includes(aramaNorm),
    );
  }, [kelimeler, arama]);

  return (
    <main className="tema-cocuk zemin-yildizli relative min-h-screen text-murekkep">
      <div className="relative mx-auto max-w-4xl px-4 py-6 sm:px-8">
        {/* Üst bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Buton varyant="cerceve" boyut="kucuk" onClick={() => router.push("/map")}>
            <Ikon ad="geri" boyut={16} />
            Haritaya Dön
          </Buton>
          <Buton
            varyant="cerceve"
            boyut="kucuk"
            onClick={() => router.push("/kazanimlarim")}
          >
            <Ikon ad="rozet" boyut={16} />
            Kazanımlarım
          </Buton>
        </div>

        <header className="mb-6">
          <p className="font-govde text-sm text-murekkep-soluk">
            {child?.name ? `${child.name} için` : "Senin için"}
          </p>
          <h1 className="font-baslik text-3xl font-bold sm:text-4xl">Kelime Defterim</h1>
          <p className="mt-1 font-govde text-sm text-murekkep-soluk">
            Okuduğun bölümlerde öğrendiğin kelimeler burada birikiyor.
          </p>
        </header>

        {isLoading ? (
          <Kart className="text-center font-govde text-murekkep-soluk">
            Kelimelerin toplanıyor...
          </Kart>
        ) : kelimeler.length === 0 ? (
          <Kart dolgu="genis" className="text-center">
            <p className="font-baslik text-lg font-bold">Defterin henüz boş</p>
            <p className="mt-2 font-govde text-sm text-murekkep-soluk">
              Bir bölüm okudukça oradaki yeni kelimeler burada anlamlarıyla birikecek.
            </p>
            <div className="mt-5 flex justify-center">
              <Buton varyant="altin" onClick={() => router.push("/map")}>
                Okumaya Başla
              </Buton>
            </div>
          </Kart>
        ) : (
          <>
            <label className="relative mb-4 block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-murekkep-soluk">
                <Ikon ad="arama" boyut={20} />
              </span>
              <input
                value={arama}
                onChange={(event) => setArama(event.target.value)}
                placeholder="Kelime veya anlam ara..."
                className="h-12 w-full rounded-buton border border-cizgi bg-yuzey pl-11 pr-4 font-govde text-base text-murekkep outline-none transition focus:border-vurgu focus:ring-2 focus:ring-vurgu/30"
              />
            </label>

            <p className="mb-4 font-govde text-sm text-murekkep-soluk">
              {gorunen.length} kelime
              {arama.trim() ? ` (“${arama.trim()}” için)` : " öğrendin"}
            </p>

            {gorunen.length === 0 ? (
              <Kart className="text-center font-govde text-murekkep-soluk">
                Bu aramaya uygun kelime bulunamadı.
              </Kart>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {gorunen.map((kelime) => (
                  <li key={`${kelime.bookKey}-${kelime.bolumNo}-${kelime.word}`}>
                    <Kart className="h-full">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-baslik text-lg font-bold text-vurgu">
                          {kelime.word}
                        </h2>
                        <span className="shrink-0 rounded-full bg-yuzey-2 px-2.5 py-1 font-govde text-[11px] font-semibold text-murekkep-soluk">
                          {kelime.bolumNo}. Bölüm
                        </span>
                      </div>
                      <p className="mt-1.5 font-govde text-sm leading-6 text-murekkep">
                        {kelime.meaning}
                      </p>
                      <p className="mt-2 font-govde text-xs text-murekkep-soluk">
                        {kelime.bookIsim}
                      </p>
                    </Kart>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
