"use client";

import type { ReactNode } from "react";
import { unvanBilgisi } from "../../lib/child/yolculuk";
import { CocukKabugu } from "../cocuk/CocukKabugu";
import styles from "./kesif-sayfa-kabugu.module.css";
import type { KesifProfili } from "./kesifProfili";

type KesifSayfaKabuguProps = {
  /** Sayfanın kendi içeriği — kabuk yalnız zemin, genişlik ve gezinmeyi verir. */
  children: ReactNode;
  profil: KesifProfili;
  toplamRozet: number;
  tamamlananKitap: number;
  yukleniyor?: boolean;
};

/**
 * Ödüllerim · Kelimelerim · Görevlerim sayfalarının kabuğu.
 *
 * 12 Eki 2026'dan beri ana ekranla AYNI kabuğu (`CocukKabugu`) kullanır:
 * üstte çocuğun adı ve profil kartı, mobilde alt sekmeler, geniş ekranda üst
 * bardaki sekmeler (PROJE-MODELI 3.10.6). Hamburger menü ve "Haritaya Dön"
 * düğmesi kalktı; harita sekmelerden birisi.
 *
 * Unvan `profil.unvan`'dan değil biten kitap sayısından türetilir: veritabanında
 * kalmış eski unvan, sayıyla çelişen unvan gösteriyordu (Bölüm 2).
 */
export function KesifSayfaKabugu({ children, profil, toplamRozet, tamamlananKitap }: KesifSayfaKabuguProps) {
  const unvan = unvanBilgisi(tamamlananKitap);

  return (
    <CocukKabugu
      profil={{
        ad: profil.ad,
        avatarAnahtari: profil.avatarAnahtari,
        avatarFotografi: profil.avatarFotografi,
      }}
      ozet={{
        unvan: unvan.unvan,
        sonrakiUnvan: unvan.sonraki,
        rozet: toplamRozet,
        madalya: tamamlananKitap,
      }}
    >
      <div className={styles.icerik}>{children}</div>
    </CocukKabugu>
  );
}
