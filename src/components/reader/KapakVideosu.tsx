"use client";

import { useEffect, useRef, useState } from "react";

type KapakVideosuProps = {
  src: string;
  className?: string;
  /** Video oynamaya başlayınca eklenir; görünürlük geçişi CSS'tedir. */
  oynuyorClassName?: string;
};

/**
 * Bölüm kapağının videosu (DENEME — 23 Eki 2026, PROJE-MODELI 6.6).
 *
 * Kapak görselinin üstüne serilir ve oynamaya başlayana kadar görünmez; bu
 * yüzden video inmezse ya da oynamazsa çocuk yalnız görseli görür. Bir kez
 * oynar ve son karede durur (döngü yok). Kapak ekrandan çıkınca durur, geri
 * gelince kaldığı yerden sürer. "Hareketi azalt" ya da veri tasarrufu açıksa
 * hiç inmez: `preload="none"` ve `play()` çağrılmadığı için istek yapılmaz.
 */
export function KapakVideosu({ src, className = "", oynuyorClassName = "" }: KapakVideosuProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [oynuyor, setOynuyor] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const veriTasarrufu = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (azHareket || veriTasarrufu) return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (video.ended) {
          gozlemci.disconnect();
        } else if (giris.isIntersecting) {
          // iOS Düşük Güç modu kendiliğinden oynatmayı reddeder; görsel kalır.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    gozlemci.observe(video);
    return () => gozlemci.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setOynuyor(true)}
      className={`${className} ${oynuyor ? oynuyorClassName : ""}`}
    />
  );
}
