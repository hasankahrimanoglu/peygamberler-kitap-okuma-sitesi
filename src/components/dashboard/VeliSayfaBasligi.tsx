import type { ReactNode } from "react";

type VeliSayfaBasligiProps = {
  baslik: string;
  aciklama: string;
  ek?: ReactNode;
};

/** Veli alt sayfalarında ortak başlık ve açıklama düzeni (PROJE-MODELI 3.8). */
export function VeliSayfaBasligi({
  baslik,
  aciklama,
  ek,
}: VeliSayfaBasligiProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          {baslik}
        </h1>
        <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-murekkep-soluk">
          {aciklama}
        </p>
      </div>
      {ek ? <div className="shrink-0 self-start sm:self-auto">{ek}</div> : null}
    </div>
  );
}
