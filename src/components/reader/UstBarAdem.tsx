"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { ChapterData } from "../../data/demoChapters";
import { Buton, Ikon, OdulIkonu } from "../ui";

type CocukProfili = {
  isim: string;
  avatarAnahtari: string;
  unvan: string;
};

const varsayilanProfil: CocukProfili = {
  isim: "Küçük Kâşif",
  avatarAnahtari: "lantern",
  unvan: "Yeni Gezgin",
};

function sureBicimle(saniye: number, dolgulu = false) {
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  const dk = dolgulu ? dakika.toString().padStart(2, "0") : `${dakika}`;
  return `${dk}:${kalan.toString().padStart(2, "0")}`;
}

/**
 * Sesli anlatım oynatıcısı (mockup sağ blok). Bölümün gerçek ses dosyasını
 * (books.ts `audioUrl`) çalar; ses dosyası olmayan bölümlerde hiç render edilmez.
 * Ayrı sustur düğmesi yok: duraklatmak susturmakla aynı işi görür (karar 15 Tem 2026).
 */
function SesOynatici({ baslik, audioUrl }: { baslik: string; audioUrl: string }) {
  const sesRef = useRef<HTMLAudioElement | null>(null);
  const [caliyor, setCaliyor] = useState(false);
  const [gecenSure, setGecenSure] = useState(0);
  const [toplamSure, setToplamSure] = useState(0);
  const ilerleme = toplamSure > 0 ? (gecenSure / toplamSure) * 100 : 0;

  // Okuma ekranından ayrılınca anlatım açık kalmasın.
  useEffect(() => {
    const ses = sesRef.current;
    return () => {
      ses?.pause();
    };
  }, []);

  function oynatDurdur() {
    const ses = sesRef.current;
    if (!ses) return;
    if (caliyor) {
      ses.pause();
    } else {
      void ses.play().catch(() => setCaliyor(false));
    }
  }

  return (
    <div className="flex w-full min-w-0 items-center gap-2 lg:w-auto">
      <audio
        ref={sesRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={(olay) => setToplamSure(olay.currentTarget.duration)}
        onTimeUpdate={(olay) => setGecenSure(olay.currentTarget.currentTime)}
        onPlay={() => setCaliyor(true)}
        onPause={() => setCaliyor(false)}
        onEnded={() => {
          setGecenSure(0);
          if (sesRef.current) sesRef.current.currentTime = 0;
        }}
      />
      <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-cizgi bg-yuzey py-1.5 pl-1.5 pr-4 lg:w-[340px] lg:flex-none">
        <button
          type="button"
          aria-label={caliyor ? "Sesli anlatımı duraklat" : "Sesli anlatımı oynat"}
          aria-pressed={caliyor}
          onClick={oynatDurdur}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-eylem text-eylem-metin shadow-[0_0_16px_rgba(52,160,107,0.45)] transition hover:bg-eylem-koyu focus:outline-none focus-visible:ring-2 focus-visible:ring-eylem focus-visible:ring-offset-2 focus-visible:ring-offset-yuzey"
        >
          <Ikon ad={caliyor ? "duraklat" : "oynat"} boyut={16} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-baslik text-xs font-semibold sm:text-sm">
              {baslik}
            </p>
            <span className="shrink-0 font-govde text-[11px] font-semibold tabular-nums text-murekkep-soluk">
              {sureBicimle(gecenSure, true)} / {sureBicimle(toplamSure)}
            </span>
          </div>
          <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-yuzey-2">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-eylem"
              animate={{ width: `${ilerleme}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type UstBarAdemProps = {
  chapter: ChapterData;
  onGeri: () => void;
};

/**
 * Yeni okuma deneyimi üst barı (ChatGPT mockup, 12 Tem 2026):
 * solda geri + kitap kimliği, ortada çocuk profil kartı, sağda ses oynatıcı.
 */
export function UstBarAdem({ chapter, onGeri }: UstBarAdemProps) {
  const router = useRouter();
  const [profil, setProfil] = useState<CocukProfili>(varsayilanProfil);

  // Harita sayfasındaki çıkışla birebir aynı davranış.
  function cikisYap() {
    window.localStorage.removeItem("selected_child_profile_id");
    window.localStorage.removeItem("selected_child_profile_name");
    router.push("/dashboard");
  }

  useEffect(() => {
    let iptal = false;

    async function profiliYukle() {
      const profileId = window.localStorage.getItem(
        "selected_child_profile_id",
      );

      if (!profileId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("isim, avatar_tipi, unvan")
        .eq("id", profileId)
        .maybeSingle();

      if (iptal || error || !data) return;

      setProfil({
        isim: data.isim ?? varsayilanProfil.isim,
        avatarAnahtari: data.avatar_tipi ?? varsayilanProfil.avatarAnahtari,
        unvan: data.unvan ?? varsayilanProfil.unvan,
      });
    }

    void profiliYukle();

    return () => {
      iptal = true;
    };
  }, []);

  return (
    <header className="relative z-30 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Sol: geri + kitap kimliği */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            aria-label="Kitap sayfasına dön"
            onClick={onGeri}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cizgi bg-yuzey text-murekkep transition hover:bg-yuzey-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu"
          >
            <Ikon ad="geri" boyut={20} />
          </button>

          <Ikon ad="kitap" boyut={26} className="hidden text-vurgu sm:block" />

          <div className="min-w-0">
            <p className="truncate font-baslik text-lg font-bold leading-tight sm:text-xl">
              {chapter.bookName ?? "Kitap Yolculuğu"}
            </p>
            <p className="truncate font-govde text-xs text-murekkep-soluk sm:text-sm">
              {chapter.bolumAdi}
            </p>
          </div>
        </div>

        {/* Orta: çocuk profil kartı */}
        <div className="flex items-center gap-2.5 justify-self-end rounded-full border border-cizgi bg-yuzey py-1.5 pl-1.5 pr-4 lg:justify-self-center">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-yuzey-2 ring-2 ring-vurgu/50">
            <OdulIkonu
              tip="avatar"
              anahtar={profil.avatarAnahtari}
              boyut={40}
              alt={`${profil.isim} avatarı`}
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate font-baslik text-sm font-bold leading-tight">
              {profil.isim}
            </p>
            <p className="flex items-center gap-1 font-govde text-xs font-semibold text-vurgu">
              <Ikon ad="rozet" boyut={12} />
              <span className="truncate">{profil.unvan}</span>
            </p>
          </div>
        </div>

        {/* Sağ: ses oynatıcı (dosyası varsa) + çıkış */}
        <div className="col-span-2 flex min-w-0 items-center justify-end gap-2 lg:col-span-1 lg:justify-self-end">
          {chapter.audioUrl ? (
            <SesOynatici baslik={chapter.audioTitle} audioUrl={chapter.audioUrl} />
          ) : null}
          <Buton
            varyant="cerceve"
            boyut="kucuk"
            onClick={cikisYap}
            className="shrink-0"
            aria-label="Çıkış Yap"
          >
            <Ikon ad="cikis" boyut={15} />
            <span className="hidden sm:inline">Çıkış Yap</span>
          </Buton>
        </div>
      </div>
    </header>
  );
}
