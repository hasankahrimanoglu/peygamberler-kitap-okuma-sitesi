"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Buton, CocukAvatari, Ikon, YedekliGorsel, type IkonAdi } from "../ui";
import { kitapKapagi, YEDEK } from "../../lib/varlikYollari";
import { useVeliPaneli } from "./baglam";
import type { VeliCocuk } from "./tipler";
import styles from "./veliPaneli.module.css";

/** Sayfa başlığı: küçük üst satır + serif başlık + tek cümle açıklama. */
export function SayfaBasligi({
  ust,
  baslik,
  aciklama,
  sag,
}: {
  ust?: string;
  baslik: string;
  aciklama?: string;
  sag?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        {ust ? <p className="text-sm font-semibold text-veli-altin-metin">{ust}</p> : null}
        <h1 className="mt-1 font-veli-baslik text-[2rem] font-medium leading-[1.1] tracking-[-0.015em] text-murekkep sm:text-[2.5rem]">
          {baslik}
        </h1>
        {aciklama ? (
          <p className="mt-2 max-w-2xl text-base leading-7 text-veli-govde">{aciklama}</p>
        ) : null}
      </div>
      {sag ? <div className="shrink-0">{sag}</div> : null}
    </header>
  );
}

/** Bölüm başlığı (sayfa içi) ve sağda isteğe bağlı bağlantı. */
export function BolumBasligi({
  baslik,
  aciklama,
  sag,
  id,
}: {
  baslik: string;
  aciklama?: string;
  sag?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 id={id} className="font-veli-baslik text-[1.375rem] font-medium leading-tight tracking-[-0.01em] text-murekkep">
          {baslik}
        </h2>
        {aciklama ? <p className="mt-1 text-[0.9375rem] leading-6 text-murekkep-soluk">{aciklama}</p> : null}
      </div>
      {sag}
    </div>
  );
}

/** "Tümünü gör →" türü sakin bağlantı düğmesi. */
export function DevamBaglantisi({
  children,
  onClick,
  ton = "murekkep",
}: {
  children: ReactNode;
  onClick: () => void;
  ton?: "murekkep" | "sohbet" | "gece";
}) {
  const renk =
    ton === "sohbet"
      ? "text-veli-sohbet hover:bg-veli-sohbet/10"
      : ton === "gece"
        ? "text-veli-gece-metin hover:bg-white/10"
        : "text-murekkep hover:bg-murekkep/5";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mx-3 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-[0.9375rem] font-semibold transition-colors ${renk}`}
    >
      {children}
      <Ikon ad="ok-sag" boyut={16} />
    </button>
  );
}

/** Kart yüzeyi: kenar çizgisi yerine iki katlı yumuşak gölge, kart içinde kart yok. */
export function Yuzey({
  children,
  className = "",
  etkilesimli = false,
  as: Etiket = "div",
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  etkilesimli?: boolean;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Etiket
      className={`${styles.kart} ${etkilesimli ? styles.kartEtkilesimli : ""} ${className}`}
      {...props}
    >
      {children}
    </Etiket>
  );
}

export function CocukYuzu({
  cocuk,
  boyut = 40,
  halka = "beyaz",
}: {
  cocuk: VeliCocuk;
  boyut?: number;
  halka?: "beyaz" | "altin" | "yok";
}) {
  const halkaSinifi =
    halka === "beyaz"
      ? "ring-2 ring-white"
      : halka === "altin"
        ? "ring-2 ring-veli-altin-acik ring-offset-2 ring-offset-veli-gece"
        : "";
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-yuzey-2 ${halkaSinifi}`}
      style={{ width: boyut, height: boyut }}
    >
      <CocukAvatari
        avatarTipi={cocuk.avatar_tipi}
        fotografUrl={cocuk.avatar_url}
        boyut={boyut}
        alt=""
        className="h-full w-full rounded-full object-cover"
      />
    </span>
  );
}

/**
 * Çocuk seçici — avatar + adla segmentli düğme. Tek çocukta görünmez
 * (araştırma: tek çocukta seçici gürültüdür). Seçim ekranlar arasında korunur.
 */
export function CocukSecici({ ton = "acik" }: { ton?: "acik" | "gece" }) {
  const { aile, seciliCocukId, cocukSec } = useVeliPaneli();
  if (aile.cocuklar.length < 2) return null;
  const secili = seciliCocukId ?? aile.cocuklar[0]?.id;

  return (
    <div
      role="radiogroup"
      aria-label="Çocuk seçin"
      className={`inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 scrollbar-none ${
        ton === "gece" ? "bg-white/10" : "bg-yuzey-2"
      }`}
    >
      {aile.cocuklar.map((cocuk) => {
        const aktif = cocuk.id === secili;
        return (
          <button
            key={cocuk.id}
            type="button"
            role="radio"
            aria-checked={aktif}
            onClick={() => cocukSec(cocuk.id)}
            className={`flex min-h-12 shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[0.9375rem] font-semibold transition-all ${
              aktif
                ? ton === "gece"
                  ? "bg-veli-gece-metin text-veli-gece shadow-sm"
                  : "bg-yuzey text-murekkep shadow-[0_1px_3px_rgb(39_30_23/0.12)]"
                : ton === "gece"
                  ? "text-veli-gece-soluk hover:text-veli-gece-metin"
                  : "text-murekkep-soluk hover:text-murekkep"
            }`}
          >
            <CocukYuzu cocuk={cocuk} boyut={36} halka="yok" />
            {cocuk.isim}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Bölüm yolu: her bölüm bir parça. Biten parçalar altın, sıradaki kesikli.
 * Yüzde göstermez; konum ve uzunluk en hızlı okunan göstergedir (NN/g).
 */
export function BolumYolu({
  toplam,
  tamamlanan,
  gece = false,
  className = "",
}: {
  toplam: number;
  tamamlanan: number;
  gece?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${toplam} bölümden ${tamamlanan} bölüm tamamlandı`}
      className={`${gece ? styles.gece : ""} flex gap-1 ${className}`}
    >
      {Array.from({ length: toplam }, (_, i) => {
        const durum = i < tamamlanan ? "dolu" : i === tamamlanan ? "siradaki" : "bos";
        return (
          <span
            key={i}
            className={`${styles.bolumParcasi} flex-1 ${
              durum === "dolu" ? styles.bolumParcasiDolu : durum === "siradaki" ? styles.bolumParcasiSiradaki : ""
            }`}
          />
        );
      })}
    </div>
  );
}

export function Kapak({
  bookKey,
  alt = "",
  className = "",
}: {
  bookKey: string;
  alt?: string;
  className?: string;
}) {
  return (
    <YedekliGorsel
      src={kitapKapagi(bookKey)}
      yedekSrc={YEDEK.kitapKapagi}
      alt={alt}
      width={400}
      height={600}
      className={`aspect-[2/3] w-full rounded-[0.875rem] object-cover shadow-[0_1px_2px_rgb(39_30_23/0.1),0_14px_28px_-14px_rgb(23_35_80/0.55)] ${className}`}
    />
  );
}

export function Sahne({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <YedekliGorsel
      src={src}
      yedekSrc={YEDEK.sahne}
      alt={alt}
      width={1600}
      height={900}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

type CipTonu = "notr" | "eylem" | "altin" | "sohbet" | "cam" | "gece";

const cipTonlari: Record<CipTonu, string> = {
  notr: "bg-yuzey-2 text-veli-govde",
  eylem: "bg-eylem-yumusak text-eylem-koyu",
  altin: "bg-vurgu-yumusak text-veli-altin-metin",
  sohbet: "bg-veli-sohbet-yumusak text-veli-sohbet",
  cam: `${styles.cam} text-white`,
  gece: "bg-white/10 text-veli-gece-metin",
};

export function Cip({
  children,
  ton = "notr",
  ikon,
  className = "",
}: {
  children: ReactNode;
  ton?: CipTonu;
  ikon?: IkonAdi;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold leading-none ${cipTonlari[ton]} ${className}`}
    >
      {ikon ? <Ikon ad={ikon} boyut={14} /> : null}
      {children}
    </span>
  );
}

/** Yuvarlak ikon kutusu — listelerde tür işareti (renk tek başına anlam taşımaz). */
export function IkonKutusu({
  ikon,
  ton = "notr",
  boyut = 44,
}: {
  ikon: IkonAdi;
  ton?: "notr" | "eylem" | "altin" | "sohbet" | "gece";
  boyut?: number;
}) {
  const renk = {
    notr: "bg-yuzey-2 text-veli-govde",
    eylem: "bg-eylem-yumusak text-eylem-koyu",
    altin: "bg-vurgu-yumusak text-veli-altin-metin",
    sohbet: "bg-veli-sohbet-yumusak text-veli-sohbet",
    gece: "bg-veli-gece text-veli-altin-acik",
  }[ton];
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${renk}`} style={{ width: boyut, height: boyut }}>
      <Ikon ad={ikon} boyut={Math.round(boyut * 0.45)} />
    </span>
  );
}

/** Ayar ve liste satırı: sol ikon/görsel, başlık + durum, sağda eylem ya da ok. */
export function Satir({
  sol,
  baslik,
  alt,
  sag,
  onClick,
  tehlike = false,
}: {
  sol?: ReactNode;
  baslik: ReactNode;
  alt?: ReactNode;
  sag?: ReactNode;
  onClick?: () => void;
  tehlike?: boolean;
}) {
  const icerik = (
    <>
      {sol}
      <span className="min-w-0 flex-1">
        <span className={`block text-base font-semibold leading-6 ${tehlike ? "text-tehlike" : "text-murekkep"}`}>
          {baslik}
        </span>
        {alt ? <span className="mt-0.5 block text-[0.9375rem] leading-6 text-murekkep-soluk">{alt}</span> : null}
      </span>
      {sag ?? (onClick ? <Ikon ad="ok-sag" boyut={18} className="text-murekkep-soluk" /> : null)}
    </>
  );
  const sinif = "flex w-full min-h-[64px] items-center gap-4 px-4 py-3 text-left sm:px-5";
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${sinif} transition-colors hover:bg-murekkep/[0.03]`}>
        {icerik}
      </button>
    );
  }
  return <div className={sinif}>{icerik}</div>;
}

export function Anahtar({
  acik,
  onDegis,
  etiket,
  disabled = false,
}: {
  acik: boolean;
  onDegis: (acik: boolean) => void;
  etiket: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={acik}
      aria-label={etiket}
      disabled={disabled}
      onClick={() => onDegis(!acik)}
      className={`${styles.anahtar} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vurgu disabled:cursor-not-allowed disabled:opacity-50`}
    />
  );
}

/** Segmentli sekme: rapor alt bölümleri. Mobilde tam genişlik eşit parçalar. */
export function Sekmeler<T extends string>({
  secenekler,
  deger,
  onDegis,
  etiket,
}: {
  secenekler: { deger: T; etiket: string; sayi?: number }[];
  deger: T;
  onDegis: (deger: T) => void;
  etiket: string;
}) {
  return (
    <div role="tablist" aria-label={etiket} className="flex gap-1 rounded-[1rem] bg-yuzey-2 p-1 sm:inline-flex">
      {secenekler.map((s) => {
        const secili = s.deger === deger;
        return (
          <button
            key={s.deger}
            type="button"
            role="tab"
            aria-selected={secili}
            onClick={() => onDegis(s.deger)}
            className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[0.75rem] px-4 text-[0.9375rem] font-semibold transition-all sm:flex-none ${
              secili
                ? "bg-yuzey text-murekkep shadow-[0_1px_3px_rgb(39_30_23/0.12)]"
                : "text-murekkep-soluk hover:text-murekkep"
            }`}
          >
            {s.etiket}
            {s.sayi !== undefined ? (
              <span
                className={`rounded-full px-1.5 text-[0.8125rem] tabular-nums ${secili ? "bg-yuzey-2 text-veli-govde" : "text-murekkep-soluk"}`}
              >
                {s.sayi}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Perde: mobilde alttan açılan sayfa, geniş ekranda sağdan açılan panel.
 * Ayrı sayfa yerine bağlamı koruyan ayrıntı katmanı (PROJE-MODELI 3.10.6 ile
 * aynı kalıp — çocuk tarafında bölüm listesi de böyle açılır).
 */
export function PerdeKabugu({
  acik,
  onKapat,
  baslik,
  ust,
  children,
  alt,
}: {
  acik: boolean;
  onKapat: () => void;
  baslik: string;
  ust?: string;
  children: ReactNode;
  alt?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!acik) return undefined;
    const onceki = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    function tus(olay: KeyboardEvent) {
      if (olay.key === "Escape") onKapat();
    }
    document.addEventListener("keydown", tus);
    const eskiTasma = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tus);
      document.body.style.overflow = eskiTasma;
      onceki?.focus?.();
    };
  }, [acik, onKapat]);

  return (
    <AnimatePresence>
      {acik ? (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className={`absolute inset-0 ${styles.perde}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onKapat}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={baslik}
            tabIndex={-1}
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="absolute inset-x-0 bottom-0 flex max-h-[90svh] flex-col overflow-hidden rounded-t-[1.75rem] bg-zemin shadow-[0_-20px_60px_-20px_rgb(18_27_64/0.5)] outline-none lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[480px] lg:rounded-none lg:rounded-l-[1.75rem]"
          >
            <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-murekkep/15 lg:hidden" aria-hidden="true" />
            <div className="flex shrink-0 items-start justify-between gap-4 px-5 pb-3 pt-3 sm:px-6 lg:pt-7">
              <div className="min-w-0">
                {ust ? <p className="text-sm font-semibold text-veli-altin-metin">{ust}</p> : null}
                <h2 className="font-veli-baslik text-[1.625rem] font-medium leading-tight tracking-[-0.01em] text-murekkep">
                  {baslik}
                </h2>
              </div>
              <button
                type="button"
                onClick={onKapat}
                aria-label="Kapat"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-yuzey-2 text-veli-govde transition-colors hover:bg-cizgi"
              >
                <Ikon ad="kapat" boyut={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 sm:px-6">{children}</div>
            {alt ? (
              <div className="shrink-0 border-t border-cizgi bg-zemin px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:px-6">
                {alt}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Bildirim: işlem sonucu ("Elif profili güncellendi.") ya da önizlemede
 * gerçek işlem yerine ne olacağı. Hata tonu kırmızı ikonla ayrılır.
 */
export function Bildirim({ metin, ton = "bilgi" }: { metin: string | null; ton?: "bilgi" | "hata" }) {
  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(88px+env(safe-area-inset-bottom))] z-[70] flex justify-center px-4 lg:bottom-8"
    >
      <AnimatePresence>
        {metin ? (
          <motion.p
            key={metin}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex max-w-md items-start gap-2.5 rounded-2xl bg-veli-gece px-4 py-3 text-[0.9375rem] font-medium leading-6 text-veli-gece-metin shadow-[0_18px_40px_-16px_rgb(18_27_64/0.7)]"
          >
            <Ikon
              ad={ton === "hata" ? "bilgi" : "onay"}
              boyut={18}
              className={`mt-0.5 ${ton === "hata" ? "text-[#ff9b8f]" : "text-veli-altin-acik"}`}
            />
            {metin}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Veri gelirken: sayfanın iskeleti, yanıp sönmeden sakin bir dolgu. */
export function Yukleniyor({ metin = "Yükleniyor…" }: { metin?: string }) {
  return (
    <div aria-busy="true" className="space-y-5">
      <span className="sr-only">{metin}</span>
      <div className={`${styles.gokyuzu} h-48 rounded-[1.75rem] opacity-90 sm:h-56`} />
      <div className={`${styles.kart} h-72 animate-pulse motion-reduce:animate-none`} />
      <div className={`${styles.kart} h-40 animate-pulse motion-reduce:animate-none`} />
    </div>
  );
}

/** Hiç çocuk profili yokken Sohbet, Gelişim ve Kütüphane'nin boş durumu. */
export function BosAile({ baslik, metin }: { baslik: string; metin: string }) {
  const { perdeAc } = useVeliPaneli();
  return (
    <Yuzey className="p-8 text-center sm:p-12">
      <span className="mx-auto block w-fit">
        <IkonKutusu ikon="aile" ton="gece" boyut={56} />
      </span>
      <h2 className="mt-5 font-veli-baslik text-[1.5rem] font-medium text-murekkep">{baslik}</h2>
      <p className="mx-auto mt-2 max-w-md text-base leading-7 text-veli-govde">{metin}</p>
      <div className="mt-6 flex justify-center">
        <Buton varyant="altin" onClick={() => perdeAc({ tur: "profil-ekle" })}>
          <Ikon ad="arti" boyut={19} />
          Çocuk Profili Ekle
        </Buton>
      </div>
    </Yuzey>
  );
}
