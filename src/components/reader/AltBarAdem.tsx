"use client";

import { Ikon } from "../ui";

type AltBarAdemProps = {
  aktifSayfa: number;
  toplamSayfa: number;
  onOnceki: () => void;
  onSonraki: () => void;
  /** Son sayfa veya karar kapısı gibi ileri gidilemeyen durumlar */
  sonrakiKilitli: boolean;
};

/**
 * Yeni okuma deneyimi alt barı: etiketli yeşil ok pilleri + ortada
 * "Sayfa X / Y" rozeti ve sayfa başına bir çentikli kesikli ilerleme çubuğu
 * (Hasan kararı, 12 Tem 2026 — mockuptaki alt yazı yerine ilerleme).
 */
export function AltBarAdem({
  aktifSayfa,
  toplamSayfa,
  onOnceki,
  onSonraki,
  sonrakiKilitli,
}: AltBarAdemProps) {
  const okSinifi =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-eylem text-eylem-metin shadow-[0_0_18px_rgba(52,160,107,0.5)] transition group-hover:bg-eylem-koyu";

  return (
    <div className="relative z-30 px-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2 sm:px-5 sm:pt-3">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Önceki sayfa"
          disabled={aktifSayfa === 0}
          onClick={onOnceki}
          className="group flex items-center gap-2.5 rounded-full border border-cizgi bg-yuzey p-1.5 transition hover:border-eylem/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu disabled:pointer-events-none disabled:opacity-30 sm:pr-5"
        >
          <span className={okSinifi}>
            <Ikon ad="ok-sol" boyut={20} />
          </span>
          <span className="hidden font-baslik text-sm font-semibold sm:block">
            Önceki Sayfa
          </span>
        </button>

        <div className="flex min-w-0 justify-center">
          <div className="flex max-w-full flex-col items-center gap-1.5">
            <p className="font-baslik text-sm font-bold tabular-nums sm:text-base">
              {aktifSayfa + 1} / {toplamSayfa}
            </p>
            <div
              className="flex items-center gap-1"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={toplamSayfa}
              aria-valuenow={aktifSayfa + 1}
              aria-label="Bölüm sayfa ilerlemesi"
            >
              {Array.from({ length: toplamSayfa }, (_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-colors ${
                    toplamSayfa > 12 ? "w-2" : "w-2.5 sm:w-3.5"
                  } ${i <= aktifSayfa ? "bg-vurgu" : "bg-cizgi"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Sonraki sayfa"
          disabled={sonrakiKilitli}
          onClick={onSonraki}
          className="group flex items-center gap-2.5 rounded-full border border-cizgi bg-yuzey p-1.5 transition hover:border-eylem/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-vurgu disabled:pointer-events-none disabled:opacity-30 sm:pl-5"
        >
          <span className="hidden font-baslik text-sm font-semibold sm:block">
            Sonraki Sayfa
          </span>
          <span className={okSinifi}>
            <Ikon ad="ok-sag" boyut={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
