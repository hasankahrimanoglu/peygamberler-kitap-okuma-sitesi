"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Isil } from "../cocuk/Isil";
import { Ikon } from "../ui/Ikon";
import hareket from "./hareket/hareket.module.css";
import styles from "./tanitim.module.css";

const CUBUK_SAYISI = 56;

// Sabit "ses dalgası" çizimi: her yüklemede aynı görünür (rastgele değil).
const CUBUKLAR = Array.from({ length: CUBUK_SAYISI }, (_, i) => {
  const dalga = Math.abs(Math.sin(i * 0.61) * 0.6 + Math.sin(i * 0.23 + 1.3) * 0.4);
  return 0.22 + dalga * 0.78;
});

function sureYazisi(saniye: number) {
  if (!Number.isFinite(saniye) || saniye < 0) return "0:00";
  const dakika = Math.floor(saniye / 60);
  return `${dakika}:${String(Math.floor(saniye % 60)).padStart(2, "0")}`;
}

type SesCozumleyici = { baglam: AudioContext; cozumleyici: AnalyserNode; veri: Uint8Array<ArrayBuffer> };

/**
 * Tanıtımdaki dinlenebilir örnek bölüm. Gerçek anlatım dosyasını çalar;
 * dosya yalnız oynat düğmesine basılınca indirilir (`preload="none"`).
 *
 * Hareket: dururken dalga çubukları yavaşça nefes alır ve oynat düğmesinin
 * çevresinde halkalar genişler. Çalarken çubuklar gerçek sesin şiddetine
 * göre hareket eder, Işıl'ın feneri sesle birlikte parlar. Ses çözümlemesi
 * kurulamazsa (eski tarayıcı) ses yine çalar, çubuklar durağan kalır.
 */
export function SesOrnegi({ kaynak, ustSatir, baslik }: { kaynak: string; ustSatir: string; baslik: string }) {
  const sesRef = useRef<HTMLAudioElement>(null);
  const cozumRef = useRef<SesCozumleyici | null>(null);
  const cubukRefleri = useRef<(HTMLSpanElement | null)[]>([]);
  const fenerRef = useRef<HTMLSpanElement>(null);
  const kareRef = useRef(0);
  const [caliyor, setCaliyor] = useState(false);
  const [gecen, setGecen] = useState(0);
  const [toplam, setToplam] = useState(0);

  useEffect(() => {
    const ses = sesRef.current;
    if (!ses) return;
    const zaman = () => setGecen(ses.currentTime);
    const sure = () => setToplam(ses.duration);
    const bitti = () => {
      setCaliyor(false);
      setGecen(0);
    };
    ses.addEventListener("timeupdate", zaman);
    ses.addEventListener("loadedmetadata", sure);
    ses.addEventListener("ended", bitti);
    return () => {
      ses.removeEventListener("timeupdate", zaman);
      ses.removeEventListener("loadedmetadata", sure);
      ses.removeEventListener("ended", bitti);
    };
  }, []);

  // Çalarken her karede çubukları sesin şiddetine göre ölçekle (React
  // çizimi olmadan, doğrudan stil); durunca çubuklar CSS nefesine döner.
  useEffect(() => {
    const cubuklar = cubukRefleri.current;
    if (!caliyor) {
      cubuklar.forEach((cubuk) => cubuk?.style.removeProperty("transform"));
      fenerRef.current?.style.removeProperty("transform");
      return;
    }
    const cozum = cozumRef.current;
    if (!cozum) return;

    const kare = () => {
      cozum.cozumleyici.getByteFrequencyData(cozum.veri);
      const kutu = cozum.veri.length;
      const orta = (CUBUK_SAYISI - 1) / 2;
      let toplamSiddet = 0;
      for (let i = 0; i < CUBUK_SAYISI; i += 1) {
        // Ortadan kenarlara: konuşma enerjisi düşük frekanslarda toplanır.
        const uzaklik = Math.abs(i - orta) / orta;
        const siddet = cozum.veri[Math.min(kutu - 1, Math.floor(uzaklik * kutu * 0.6))] / 255;
        toplamSiddet += siddet;
        const olcek = 0.16 + siddet * 0.9 + CUBUKLAR[i] * 0.08;
        cubuklar[i]?.style.setProperty("transform", `scaleY(${olcek.toFixed(3)})`);
      }
      const ortalama = toplamSiddet / CUBUK_SAYISI;
      fenerRef.current?.style.setProperty("transform", `scale(${(0.85 + ortalama * 1.6).toFixed(3)})`);
      kareRef.current = requestAnimationFrame(kare);
    };
    kareRef.current = requestAnimationFrame(kare);
    return () => cancelAnimationFrame(kareRef.current);
  }, [caliyor]);

  const cozumleyiciKur = () => {
    if (cozumRef.current || !sesRef.current) return;
    const Baglam =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Baglam) return;
    try {
      const baglam = new Baglam();
      const kaynakDugumu = baglam.createMediaElementSource(sesRef.current);
      const cozumleyici = baglam.createAnalyser();
      cozumleyici.fftSize = 128;
      cozumleyici.smoothingTimeConstant = 0.8;
      kaynakDugumu.connect(cozumleyici);
      cozumleyici.connect(baglam.destination);
      cozumRef.current = { baglam, cozumleyici, veri: new Uint8Array(cozumleyici.frequencyBinCount) };
    } catch {
      cozumRef.current = null;
    }
  };

  const degistir = async () => {
    const ses = sesRef.current;
    if (!ses) return;
    if (ses.paused) {
      cozumleyiciKur();
      try {
        await cozumRef.current?.baglam.resume();
        await ses.play();
        setCaliyor(true);
      } catch {
        setCaliyor(false);
      }
    } else {
      ses.pause();
      setCaliyor(false);
    }
  };

  const ilerleme = toplam > 0 ? gecen / toplam : 0;
  const calinanCubuk = Math.round(ilerleme * CUBUK_SAYISI);

  return (
    <div className="relative rounded-kart border border-white/10 bg-gece-950/50 p-6 shadow-kart-gece backdrop-blur-sm sm:p-8">
      <audio ref={sesRef} src={kaynak} preload="none" />

      {/* Işıl dinliyor: feneri sesle birlikte parlar */}
      <span className={`${hareket.dinleyenIsil} pointer-events-none absolute -right-3 -top-9 sm:-right-5`} aria-hidden="true">
        <span ref={fenerRef} className={hareket.dinleyenFener} />
        <Isil poz="durus" boyut={52} />
      </span>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={degistir}
          aria-label={caliyor ? "Örnek anlatımı duraklat" : "Örnek anlatımı dinle"}
          className={`${hareket.oynatDugmesi} ${caliyor ? "" : hareket.oynatBekliyor} relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-altin-400 text-gece-950 shadow-parlama focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vurgu`}
        >
          <Ikon ad={caliyor ? "duraklat" : "oynat"} boyut={30} />
        </button>
        <div className="min-w-0">
          <p className="font-baslik text-sm font-semibold text-murekkep-soluk">{ustSatir}</p>
          <p className="truncate font-edebi text-2xl font-semibold text-murekkep">{baslik}</p>
        </div>
      </div>

      <div className={`mt-7 flex h-16 items-center gap-[3px] ${caliyor ? hareket.dalgaCaliyor : ""}`} aria-hidden="true">
        {CUBUKLAR.map((yukseklik, i) => (
          <span key={i} className="flex h-full flex-1 items-center">
            <span
              ref={(el) => {
                cubukRefleri.current[i] = el;
              }}
              className={`${styles.dalgaCubugu} ${hareket.dalgaCubugu} ${i < calinanCubuk ? styles.dalgaCubuguCalindi : ""}`}
              style={{ "--olcek": yukseklik.toFixed(3), "--sira": i } as CSSProperties}
            />
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-between font-baslik text-sm font-semibold tabular-nums text-murekkep-soluk">
        <span>{sureYazisi(gecen)}</span>
        <span>{toplam ? sureYazisi(toplam) : "Örnek bölüm"}</span>
      </div>
    </div>
  );
}
