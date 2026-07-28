"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Ikon, OdulIkonu } from "../ui";
import styles from "./kesif-menusu.module.css";

type KesifMenusuProps = {
  profil: { ad: string; avatarAnahtari: string; unvan: string };
  toplamRozet: number;
  tamamlananKitap: number;
  yukleniyor?: boolean;
  acik: boolean;
  onKapat: () => void;
};

/**
 * Çocuk tarafının sağdan açılan menüsü (KARAR 28 Tem 2026 — Hasan).
 *
 * Üst bardaki rozet/kitap sayaçları ve unvan buraya taşındı: bar tek satıra
 * indi, orta alan kitaplara kaldı. Kitap detay çekmecesiyle aynı davranış —
 * arka plana dokununca ve Escape ile kapanır.
 *
 * Hem `/map` hem `/kitap/[kitapKey]` ekranı bu bileşeni kullanır; bu yüzden
 * kendi CSS modülü vardır, ekranların modüllerine bağlı değildir.
 */
export function KesifMenusu({
  profil,
  toplamRozet,
  tamamlananKitap,
  yukleniyor = false,
  acik,
  onKapat,
}: KesifMenusuProps) {
  const router = useRouter();

  useEffect(() => {
    if (!acik) return;
    function tusla(olay: KeyboardEvent) {
      if (olay.key === "Escape") onKapat();
    }
    window.addEventListener("keydown", tusla);
    return () => window.removeEventListener("keydown", tusla);
  }, [acik, onKapat]);

  async function cikisYap() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const deger = (sayi: number) => (yukleniyor ? "—" : sayi);

  return (
    <>
      <button
        type="button"
        className={`${styles.perde} ${acik ? styles.perdeAcik : ""}`}
        aria-label="Menüyü kapat"
        aria-hidden={!acik}
        tabIndex={-1}
        onClick={onKapat}
      />
      <aside
        className={`${styles.panel} ${acik ? styles.panelAcik : ""}`}
        role="dialog"
        aria-modal={acik || undefined}
        aria-label="Keşif menüsü"
        aria-hidden={!acik}
      >
        <header className={styles.baslik}>
          <span className={styles.avatar}>
            <OdulIkonu tip="avatar" anahtar={profil.avatarAnahtari} boyut={44} alt="" />
          </span>
          <div>
            <strong>{profil.ad}</strong>
            <small>Keşif menüsü</small>
          </div>
          <button type="button" aria-label="Menüyü kapat" onClick={onKapat}>
            <Ikon ad="kapat" boyut={20} />
          </button>
        </header>

        <div className={styles.unvanKarti}>
          <span className={styles.unvanIkonu}>
            <Ikon ad="odul" boyut={26} />
          </span>
          <div>
            <small>Şu anki unvanın</small>
            <strong>{profil.unvan}</strong>
          </div>
        </div>

        <dl className={styles.sayaclar}>
          <div>
            <span className={styles.sayacIkonu}>
              <Ikon ad="rozet" boyut={22} />
            </span>
            <div>
              <dt>Kazanılan Rozet</dt>
              <dd>{deger(toplamRozet)}</dd>
            </div>
          </div>
          <div>
            <span className={styles.sayacIkonu}>
              <Ikon ad="madalya" boyut={22} />
            </span>
            <div>
              <dt>Kazanılan Madalya</dt>
              <dd>{deger(tamamlananKitap)}</dd>
            </div>
          </div>
        </dl>

        {/*
          Faz 7 notu: çocuk/veli oturum ayrımı henüz yok — bu bağlantı şimdilik
          korumasızdır, güvenlik fazında PIN arkasına alınacak (PROJE-MODELI 8).
        */}
        <nav className={styles.baglantilar} aria-label="Sayfalar">
          <button type="button" onClick={() => router.push("/dashboard")}>
            <Ikon ad="hesap" boyut={20} />
            <span>Veli Paneli</span>
            <Ikon ad="ok-sag" boyut={17} />
          </button>
          <button type="button" onClick={cikisYap}>
            <Ikon ad="cikis" boyut={20} />
            <span>Çıkış</span>
            <Ikon ad="ok-sag" boyut={17} />
          </button>
        </nav>
      </aside>
    </>
  );
}
