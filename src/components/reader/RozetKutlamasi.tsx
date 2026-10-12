"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SonrakiBolum } from "../../data/demoChapters";
import { madalyaGorseli, rozetGorseli, YEDEK } from "../../lib/varlikYollari";
import { IsilGorseli } from "../cocuk/IsilGorseli";
import { Ikon, YedekliGorsel } from "../ui";
import { Konfeti } from "./Konfeti";
import styles from "./okuma-akisi.module.css";

export type RozetDurumu = "bekliyor" | "kaydediliyor" | "alindi" | "hata" | "onceden";

/**
 * Rozet anı (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.3). Okuma ekranında gece
 * mavisinin göründüğü TEK yer: bölümün duygusal zirvesi diğer bölümlerden
 * ayrışsın diye tam genişlik koyu sahne.
 *
 * Akış: altın "Rozetimi Al" (kayıt) → "{Rozet} senin!" + yeşil "Sıradaki
 * Bölüme Geç" + ghost "Bölümlere dön". Son bölümde yeşil düğmenin yerini altın
 * "Büyük Final Testine Geç" alır. Eskiden kayıttan sonra çocuk bölüm listesine
 * atılıyordu; sıradaki bölüme geçmek dört dokunuş daha istiyordu.
 *
 * Işıl yalnız kazanılınca rozetin yanında uçar; konuşmaz (3.10.5). Konfeti de
 * yalnız o anda: tekrar okumada kutlama yapılmaz.
 */
export function RozetKutlamasi({
  bookKey,
  bolumNo,
  rozetAdi,
  durum,
  hata,
  yaklasti,
  sonraki,
  finalYolu,
  madalyaAdi,
  geriYolu,
  onRozetiAl,
}: {
  bookKey: string;
  bolumNo: number;
  rozetAdi: string;
  durum: RozetDurumu;
  hata: string | null;
  /** Bölüm ekrana girdiğinde rozetin tek seferlik beliriş hareketi. */
  yaklasti: boolean;
  sonraki: SonrakiBolum | null;
  finalYolu: string | null;
  madalyaAdi: string;
  geriYolu: string;
  onRozetiAl: () => void;
}) {
  const anaEylemRef = useRef<HTMLAnchorElement | null>(null);
  const kazanildi = durum === "alindi" || durum === "onceden";

  // Kayıt bitince odak sıradaki adıma geçer (klavye ve ekran okuyucu için).
  useEffect(() => {
    if (durum === "alindi") anaEylemRef.current?.focus({ preventScroll: true });
  }, [durum]);

  return (
    <section
      className={`zemin-yildizli ${styles.kutlama} ${yaklasti ? styles.kutlamaYaklasti : ""} ${
        kazanildi ? styles.kutlamaKazanildi : ""
      }`}
      aria-labelledby="rozet-basligi"
    >
      {durum === "alindi" ? <Konfeti /> : null}

      <div className={styles.kutlamaIc}>
        <div className={styles.kutlamaRozeti}>
          <YedekliGorsel
            src={rozetGorseli(bookKey, bolumNo)}
            yedekSrc={YEDEK.rozet}
            alt={rozetAdi}
            width={168}
            height={168}
            className={styles.kutlamaRozetResmi}
          />
          {durum === "alindi" ? (
            <IsilGorseli poz="kutlama" boyut={60} className={styles.kutlamaIsil} />
          ) : null}
        </div>

        {kazanildi ? (
          <>
            <h2 id="rozet-basligi">{rozetAdi} senin!</h2>
            <p className={styles.kutlamaNotu}>
              {durum === "alindi"
                ? "Bu rozet Ödüllerim'e eklendi."
                : "Bu rozeti daha önce kazanmıştın."}
            </p>

            {sonraki ? (
              <div className={styles.siradakiKart}>
                <YedekliGorsel
                  src={sonraki.kapak ?? YEDEK.sahne}
                  yedekSrc={YEDEK.sahne}
                  alt=""
                  width={112}
                  height={63}
                  className={styles.siradakiKapak}
                />
                <span>
                  <small>Sıradaki bölüm</small>
                  <strong>
                    {sonraki.no}. {sonraki.ad}
                  </strong>
                </span>
              </div>
            ) : finalYolu ? (
              <div className={styles.siradakiKart}>
                <YedekliGorsel
                  src={madalyaGorseli(bookKey)}
                  yedekSrc={YEDEK.madalya}
                  alt=""
                  width={60}
                  height={60}
                  className={styles.siradakiMadalya}
                />
                <span>
                  <small>Bütün bölümler bitti. Sırada:</small>
                  <strong>Büyük Final Testi</strong>
                  <em>{madalyaAdi}</em>
                </span>
              </div>
            ) : null}

            <div className={styles.kutlamaEylemleri}>
              {sonraki ? (
                <Link
                  ref={anaEylemRef}
                  href={sonraki.okumaYolu}
                  className={`${styles.buyukDugme} ${styles.yesilDugme}`}
                >
                  Sıradaki Bölüme Geç
                  <Ikon ad="ok-sag" boyut={20} />
                </Link>
              ) : finalYolu ? (
                <Link
                  ref={anaEylemRef}
                  href={finalYolu}
                  className={`${styles.buyukDugme} ${styles.altinDugme}`}
                >
                  <Ikon ad="madalya" boyut={20} />
                  Büyük Final Testine Geç
                </Link>
              ) : null}
              <Link href={geriYolu} className={`${styles.buyukDugme} ${styles.geceHayaletDugme}`}>
                <Ikon ad="geri" boyut={18} />
                Bölümlere dön
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 id="rozet-basligi">Bölümün sonuna geldin!</h2>
            <p className={styles.kutlamaNotu}>{rozetAdi} seni bekliyor.</p>
            {hata ? (
              <p className={styles.kutlamaHata} role="alert">
                {hata}
              </p>
            ) : null}
            <div className={styles.kutlamaEylemleri}>
              <button
                type="button"
                className={`${styles.buyukDugme} ${styles.altinDugme}`}
                disabled={durum === "kaydediliyor"}
                onClick={onRozetiAl}
              >
                <Ikon ad="rozet" boyut={20} />
                {durum === "kaydediliyor"
                  ? "Kaydediliyor..."
                  : durum === "hata"
                    ? "Tekrar Dene"
                    : "Rozetimi Al"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
