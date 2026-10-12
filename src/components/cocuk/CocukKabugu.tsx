"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROTA_ARKAPLANI } from "../../lib/varlikYollari";
import { CocukAvatari, Ikon, type IkonAdi } from "../ui";
import { ProfilKarti } from "./ProfilKarti";
import styles from "./cocuk-kabugu.module.css";

export type CocukProfili = {
  ad: string;
  avatarAnahtari: string;
  avatarFotografi?: string | null;
};

export type CocukOzetSayilari = {
  unvan: string;
  sonrakiUnvan: { unvan: string; kalan: number } | null;
  rozet: number;
  madalya: number;
};

/**
 * Çocuk tarafının sayfaları — TEK KAYNAK (PROJE-MODELI 3.10.6).
 * Mobil ve tablet dikeyde alttaki sekmeler, tablet yatay ve masaüstünde üst
 * bardaki sekmeler aynı listeden çizilir. Yollar değişmedi; yalnız adlar
 * sadeleşti ("Kazanımlarım → Ödüllerim", 3.10.4).
 */
const SEKMELER: { yol: string; ad: string; ikon: IkonAdi }[] = [
  { yol: "/map", ad: "Harita", ikon: "harita" },
  { yol: "/kazanimlarim", ad: "Ödüllerim", ikon: "madalya" },
  { yol: "/kelime-defterim", ad: "Kelimelerim", ikon: "kitap" },
  { yol: "/gorevlerim", ad: "Görevlerim", ikon: "gorev" },
];

type CocukKabuguProps = {
  profil: CocukProfili;
  ozet: CocukOzetSayilari;
  children: ReactNode;
  /**
   * Geniş ekranda kabuk ekran yüksekliğine sabitlenir ve içerik kendi içinde
   * kayar (harita). Liste sayfalarında sayfanın kendisi kayar.
   */
  ekranaSabit?: boolean;
  /**
   * Dar ekranda (telefon, tablet dikey) rota manzarası sayfanın en üstüne kadar
   * uzanır; profil satırı ve "Sıradaki bölümün" kartı onun üstünde durur.
   * Lacivert bir üst bant kalmaz (Hasan, 12 Eki 2026). Geniş ekranda çerçeve
   * yine gece mavisidir.
   */
  rotaArkaplani?: boolean;
};

/**
 * Çocuk tarafının ortak kabuğu (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.6).
 * Hamburger menü yoktur: çocuk kendi adına dokununca profil kartı açılır.
 */
export function CocukKabugu({
  profil,
  ozet,
  children,
  ekranaSabit = false,
  rotaArkaplani = false,
}: CocukKabuguProps) {
  const yol = usePathname();
  const [profilAcik, setProfilAcik] = useState(false);

  return (
    <div
      className={`tema-cocuk zemin-yildizli ${styles.kabuk} ${ekranaSabit ? styles.ekranaSabit : ""} ${
        rotaArkaplani ? styles.kabukRota : ""
      }`}
      style={
        rotaArkaplani ? ({ "--rota-arkaplan": `url("${ROTA_ARKAPLANI}")` } as CSSProperties) : undefined
      }
    >
      <header className={styles.ustBar}>
        <Link href="/map" className={styles.logo}>
          <Ikon ad="harita" boyut={26} />
          Keşif Dünyası
        </Link>

        <nav className={styles.sekmeler} aria-label="Sayfalar">
          {SEKMELER.map((sekme) => (
            <Link
              key={sekme.yol}
              href={sekme.yol}
              className={styles.sekme}
              aria-current={yol === sekme.yol ? "page" : undefined}
            >
              <Ikon ad={sekme.ikon} boyut={21} />
              {sekme.ad}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.profilButonu}
          aria-haspopup="dialog"
          aria-expanded={profilAcik}
          onClick={() => setProfilAcik(true)}
        >
          <span className={styles.avatar}>
            <CocukAvatari
              avatarTipi={profil.avatarAnahtari}
              fotografUrl={profil.avatarFotografi}
              boyut={40}
              alt=""
            />
          </span>
          <span className={styles.selam}>
            <b>
              <span className={styles.yalnizDar}>Merhaba, </span>
              {profil.ad}
            </b>
            <small>{ozet.unvan}</small>
          </span>
          <Ikon ad="asagi" boyut={18} className={styles.profilOku} />
        </button>
      </header>

      <div className={styles.icerik}>{children}</div>

      <nav className={styles.altMenu} aria-label="Sayfalar">
        {SEKMELER.map((sekme) => (
          <Link
            key={sekme.yol}
            href={sekme.yol}
            className={styles.altSekme}
            aria-current={yol === sekme.yol ? "page" : undefined}
          >
            <Ikon ad={sekme.ikon} boyut={23} />
            {sekme.ad}
          </Link>
        ))}
      </nav>

      {profilAcik ? (
        <ProfilKarti profil={profil} ozet={ozet} onKapat={() => setProfilAcik(false)} />
      ) : null}
    </div>
  );
}
