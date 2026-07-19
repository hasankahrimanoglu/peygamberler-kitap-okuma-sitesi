"use client";

import { useEffect, useRef, useState } from "react";

type YedekliGorselProps = {
  src: string;
  /** Dar/dikey cihazlarda art-directed olarak kullanılacak isteğe bağlı kaynak. */
  portraitSrc?: string;
  /** src yüklenemezse gösterilecek görsel */
  yedekSrc: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * onError, hydration'dan önce oluşan 404'leri kaçırır (olay dinleyici
 * bağlanmadan hata gerçekleşir). Bu bileşen mount olduğunda görselin
 * gerçekten yüklenip yüklenmediğini de kontrol eder — iki durumda da
 * yedeğe düşer.
 */
export function YedekliGorsel({
  src,
  portraitSrc,
  yedekSrc,
  alt = "",
  width,
  height,
  className = "",
}: YedekliGorselProps) {
  const [kaynak, setKaynak] = useState(src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && kaynak !== yedekSrc) {
      setKaynak(yedekSrc);
    }
  }, [kaynak, yedekSrc]);

  const gorsel = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={kaynak}
      alt={alt}
      width={width}
      height={height}
      onError={() => {
        if (kaynak !== yedekSrc) setKaynak(yedekSrc);
      }}
      className={className}
      draggable={false}
    />
  );

  if (!portraitSrc || kaynak === yedekSrc) return gorsel;

  return (
    <picture>
      <source media="(max-width: 879px)" srcSet={portraitSrc} />
      {gorsel}
    </picture>
  );
}
