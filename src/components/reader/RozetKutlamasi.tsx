"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SonrakiBolum } from "../../data/demoChapters";
import { madalyaGorseli, rozetGorseli, YEDEK } from "../../lib/varlikYollari";
import { Ikon, YedekliGorsel } from "../ui";
import { KutlamaSahnesi } from "./KutlamaSahnesi";
import styles from "./okuma-akisi.module.css";

export type RozetDurumu = "bekliyor" | "kaydediliyor" | "alindi" | "hata" | "onceden";

/**
 * Rozet anı (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.3). Sahne ve hareketi
 * `KutlamaSahnesi`'ndedir (Büyük Final Testi'nin madalya anıyla ortak); burada
 * yalnız rozetin akışı ve metinleri var.
 *
 * Akış: altın "Rozetimi Al" (kayıt) → "{Rozet} senin!" + yeşil "Sıradaki
 * Bölüme Geç" + "Bölümlere dön". Son bölümde yeşil düğmenin yerini altın
 * "Büyük Final Testine Geç" alır. Patlama yalnız kazanma anındadır; tekrar
 * okumada yoktur.
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
  /** Sahne ekrana girdiğinde tek seferlik açılış hareketi. */
  yaklasti: boolean;
  sonraki: SonrakiBolum | null;
  finalYolu: string | null;
  madalyaAdi: string;
  geriYolu: string;
  onRozetiAl: () => void;
}) {
  const sahneRef = useRef<HTMLElement | null>(null);
  const anaEylemRef = useRef<HTMLAnchorElement | null>(null);
  const kazanildi = durum === "alindi" || durum === "onceden";

  // Kayıt bitince sahnenin tamamı görünür olsun ve odak sıradaki adıma geçsin.
  useEffect(() => {
    if (durum !== "alindi") return;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sahneRef.current?.scrollIntoView({ block: "nearest", behavior: azHareket ? "auto" : "smooth" });
    anaEylemRef.current?.focus({ preventScroll: true });
  }, [durum]);

  return (
    <KutlamaSahnesi
      ref={sahneRef}
      gorsel={rozetGorseli(bookKey, bolumNo)}
      yedekGorsel={YEDEK.rozet}
      gorselAdi={rozetAdi}
      yaklasti={yaklasti}
      kazanildi={kazanildi}
      patlama={durum === "alindi"}
      baslikId="rozet-basligi"
    >
      {kazanildi ? (
        <>
          <h2 id="rozet-basligi">{rozetAdi} senin!</h2>
          <p className={styles.kutlamaNotu}>
            {durum === "alindi" ? "Bu rozet Ödüllerim'e eklendi." : "Bu rozeti daha önce kazanmıştın."}
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
          <div className={`${styles.kutlamaEylemleri} ${styles.tekEylem}`}>
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
    </KutlamaSahnesi>
  );
}
