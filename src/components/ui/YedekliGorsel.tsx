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
  /**
   * "lazy": görsel ekrana yaklaşınca iner (okuma akışındaki sahneler —
   * PROJE-MODELI 6.1, 20 Eki 2026). Varsayılan tarayıcının kendi davranışıdır.
   */
  loading?: "lazy" | "eager";
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
  loading,
}: YedekliGorselProps) {
  const [kaynak, setKaynak] = useState(src);
  const [oncekiSrc, setOncekiSrc] = useState(src);
  const ref = useRef<HTMLImageElement>(null);

  // src prop'u değiştiğinde (ör. haritada başka kitap seçilince) state'i render
  // sırasında sıfırla. useState yalnız ilk render'da çalıştığı için bu olmadan
  // bileşen önceki kitabın görselini göstermeye devam ediyordu. Effect yerine
  // render sırasında yapılıyor ki bir kare boyunca eski görsel görünmesin.
  if (src !== oncekiSrc) {
    setOncekiSrc(src);
    setKaynak(src);
  }

  useEffect(() => {
    // Tembel görsel henüz inmemişken de `naturalWidth` 0'dır; bazı tarayıcılarda
    // `complete` da true döner ve görsel yanlışlıkla yedeğe düşerdi. Tembel
    // görsel hydration'dan sonra iner, onError o zaman bağlıdır.
    if (loading === "lazy") return;
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && kaynak !== yedekSrc) {
      setKaynak(yedekSrc);
    }
  }, [kaynak, yedekSrc, loading]);

  const gorsel = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={kaynak}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={loading === "lazy" ? "async" : undefined}
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
