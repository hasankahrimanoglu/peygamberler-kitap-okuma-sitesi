"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Ikon, OdulIkonu } from "../ui";
import { KesifIskelesi } from "./KesifIskelesi";
import { KesifMenusu } from "./KesifMenusu";
import styles from "./kesif-sayfa-kabugu.module.css";

type KesifSayfaKabuguProps = {
  /** Sayfanın kendi içeriği — kabuk yalnız zemin, genişlik ve barı verir. */
  children: ReactNode;
  profil: { ad: string; avatarAnahtari: string; unvan: string };
  toplamRozet: number;
  tamamlananKitap: number;
  yukleniyor?: boolean;
};

/**
 * Menü sayfalarının kabuğu (KARAR 6 Ağu 2026 — Hasan).
 *
 * Kazanımlarım · Kelime Defterim · Görevlerim bu kabukla açılır; böylece üçü de
 * atlas ve kitap rotasıyla AYNI genişlikte (1440px) ve AYNI üst barla görünür.
 * Önce her biri kendi `max-w-*` sarmalayıcısını ve iki butonluk mini barını
 * taşıyordu — ekranlar iskeletin dışında kalıyordu.
 *
 * Profil verisi PROPS ile gelir, kabuk kendi `useSelectedChild`'ını çağırmaz:
 * sayfalar o veriyi zaten çekiyor, kabuk da çekseydi her açılışta ikinci bir
 * Supabase isteği çıkardı.
 */
export function KesifSayfaKabugu({
  children,
  profil,
  toplamRozet,
  tamamlananKitap,
  yukleniyor = false,
}: KesifSayfaKabuguProps) {
  const router = useRouter();
  const [menuAcik, setMenuAcik] = useState(false);

  return (
    <main className={`tema-cocuk zemin-yildizli relative ${styles.sayfa}`}>
      <div className={styles.kabuk}>
        <header className={styles.bar}>
          <button type="button" className={styles.geri} onClick={() => router.push("/map")}>
            <Ikon ad="geri" boyut={18} /> Haritaya Dön
          </button>

          <KesifIskelesi />

          <div className={styles.profil}>
            <span className={styles.avatar}>
              <OdulIkonu tip="avatar" anahtar={profil.avatarAnahtari} boyut={38} alt="" />
            </span>
            <span className={styles.profilAd}>{profil.ad}</span>
          </div>

          <button
            type="button"
            className={styles.menuButonu}
            aria-label="Keşif menüsünü aç"
            aria-expanded={menuAcik}
            onClick={() => setMenuAcik(true)}
          >
            <Ikon ad="menu" boyut={21} />
          </button>
        </header>

        {children}
      </div>

      <KesifMenusu
        profil={profil}
        toplamRozet={toplamRozet}
        tamamlananKitap={tamamlananKitap}
        yukleniyor={yukleniyor}
        acik={menuAcik}
        onKapat={() => setMenuAcik(false)}
      />
    </main>
  );
}
