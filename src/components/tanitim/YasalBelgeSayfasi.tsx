import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { MARKA } from "../../data/marka";
import { YASAL_BELGELER, YER_TUTUCULAR, type YasalBelge, type YasalIcerik } from "../../data/yasal";
import { Kap } from "./ortak";

/** `{anahtar}` kalıplarını satıcı ve marka bilgileriyle doldurur. */
export function yasalMetniDoldur(metin: string) {
  return metin.replace(/\{(\w+)\}/g, (kalip, anahtar: string) => YER_TUTUCULAR[anahtar] ?? kalip);
}

export function yasalMetaVerisi(belge: YasalBelge): Metadata {
  return {
    title: `${belge.baslik} | ${MARKA.ad}`,
    description: yasalMetniDoldur(belge.ozet),
  };
}

/**
 * Doldurulmamış yer tutucular ("[Açık adres]") sarı vurguyla görünür; değer
 * `satici.ts`'te doldurulunca vurgu kendiliğinden kalkar.
 */
function Metin({ metin }: { metin: string }) {
  const parcalar = yasalMetniDoldur(metin).split(/(\[[^\]]+\])/g);
  return (
    <>
      {parcalar.map((parca, i) =>
        parca.startsWith("[") && parca.endsWith("]") ? (
          <mark key={i} className="rounded bg-altin-300/60 px-1 text-murekkep">
            {parca}
          </mark>
        ) : (
          <Fragment key={i}>{parca}</Fragment>
        ),
      )}
    </>
  );
}

function Icerik({ icerik }: { icerik: YasalIcerik }) {
  if (typeof icerik === "string") {
    return (
      <p className="font-govde text-[1.05rem] leading-relaxed text-murekkep">
        <Metin metin={icerik} />
      </p>
    );
  }

  if ("liste" in icerik) {
    return (
      <ul className="space-y-2 pl-1">
        {icerik.liste.map((madde) => (
          <li key={madde} className="flex gap-3 font-govde text-[1.05rem] leading-relaxed text-murekkep">
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-vurgu" aria-hidden="true" />
            <span>
              <Metin metin={madde} />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-cizgi">
      <table className="w-full min-w-[520px] border-collapse text-left font-govde text-[0.98rem]">
        <thead className="bg-yuzey-2">
          <tr>
            {icerik.tablo.basliklar.map((baslik) => (
              <th key={baslik} scope="col" className="px-4 py-3 font-baslik font-bold text-murekkep">
                {baslik}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {icerik.tablo.satirlar.map((satir) => (
            <tr key={satir.join("|")} className="border-t border-cizgi">
              {satir.map((hucre, i) => (
                <td key={i} className="px-4 py-3 align-top leading-relaxed text-murekkep">
                  <Metin metin={hucre} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function bolumKimligi(i: number) {
  return `bolum-${i + 1}`;
}

export function YasalBelgeSayfasi({ belge }: { belge: YasalBelge }) {
  const digerleri = YASAL_BELGELER.filter((diger) => diger.yol !== belge.yol);

  return (
    <main className="bg-zemin">
      <div className="border-b border-cizgi bg-yuzey-2">
        <Kap className="py-14 lg:py-20">
          <p className="font-baslik text-sm font-bold uppercase tracking-[0.2em] text-vurgu">Yasal bilgiler</p>
          <h1 className="mt-3 max-w-3xl text-balance font-edebi text-[2.2rem] font-semibold leading-tight tracking-tight text-murekkep sm:text-[3rem]">
            {belge.baslik}
          </h1>
          <p className="mt-4 max-w-2xl font-govde text-lg leading-relaxed text-murekkep-soluk">
            <Metin metin={belge.ozet} />
          </p>
          <p className="mt-6 font-govde text-sm font-semibold text-murekkep-soluk">Son güncelleme: {belge.guncelleme}</p>
        </Kap>
      </div>

      <Kap className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Bu sayfada" className="lg:sticky lg:top-28">
            <p className="font-baslik text-sm font-bold uppercase tracking-[0.14em] text-murekkep-soluk">Bu sayfada</p>
            <ol className="mt-3 space-y-1 border-l-2 border-cizgi">
              {belge.bolumler.map((bolum, i) => (
                <li key={bolum.baslik}>
                  <a
                    href={`#${bolumKimligi(i)}`}
                    className="-ml-0.5 flex min-h-[40px] items-center border-l-2 border-transparent pl-4 font-govde text-[0.95rem] text-murekkep-soluk transition-colors hover:border-vurgu hover:text-murekkep"
                  >
                    {bolum.baslik}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="space-y-12 lg:col-span-8 lg:col-start-5">
          {belge.bolumler.map((bolum, i) => (
            <section key={bolum.baslik} id={bolumKimligi(i)} className="scroll-mt-28">
              <h2 className="font-edebi text-[1.6rem] font-semibold leading-snug text-murekkep">{bolum.baslik}</h2>
              <div className="mt-4 space-y-4">
                {bolum.icerik.map((icerik, j) => (
                  <Icerik key={j} icerik={icerik} />
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-kart border border-cizgi bg-yuzey p-6 sm:p-8">
            <p className="font-baslik text-lg font-bold text-murekkep">Diğer yasal metinler</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {digerleri.map((diger) => (
                <li key={diger.yol}>
                  <Link
                    href={diger.yol}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-cizgi px-4 font-govde text-[0.95rem] font-semibold text-murekkep transition-colors hover:bg-yuzey-2"
                  >
                    {diger.kisaBaslik}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Kap>
    </main>
  );
}
