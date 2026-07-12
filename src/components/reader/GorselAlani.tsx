"use client";

import { YedekliGorsel } from "../ui";

type GorselAlaniProps = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Split düzenin illüstrasyon yarısı. Gerçek görsel yoksa `/icerik/`
 * placeholder'ına düşer; Hasan görseli aynı adla klasöre atınca kod
 * değişmeden yayına girer (PROJE-MODELI.md 6.1 üretim akışı).
 */
export function GorselAlani({ src, alt, caption }: GorselAlaniProps) {
  return (
    <figure className="flex min-h-0 flex-col items-center justify-center gap-2 lg:h-full">
      <div className="h-44 w-full overflow-hidden rounded-2xl border-4 border-yuzey shadow-kart sm:h-56 lg:h-full lg:min-h-0 lg:flex-1">
        <YedekliGorsel
          src={src}
          yedekSrc="/icerik/placeholder.svg"
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="max-w-md text-center font-story text-xs font-medium italic leading-5 text-murekkep-soluk sm:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
