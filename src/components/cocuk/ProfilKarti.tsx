"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { profiliKapat } from "../../lib/child/cocukOturumu";
import { unvanAnahtari } from "../../lib/derive";
import { unvanGorseli, YEDEK } from "../../lib/varlikYollari";
import { CocukAvatari, Ikon, YedekliGorsel } from "../ui";
import type { CocukOzetSayilari, CocukProfili } from "./CocukKabugu";
import styles from "./cocuk-kabugu.module.css";

type ProfilKartiProps = {
  profil: CocukProfili;
  ozet: CocukOzetSayilari;
  onKapat: () => void;
};

/**
 * Profil kartı — hamburger menünün yerine (KARAR 12 Eki 2026 — 3.10.6).
 * Mobilde alttan açılır, geniş ekranda profilin altında durur. Sayfa
 * bağlantılarını tekrar etmez: onlar sekmelerde. Burada çocuğun kimliği ve
 * yetişkin işleri kalır. Faz 7 (3.11): Veli Paneli veli PIN'iyle açılır;
 * "Çıkış Yap" velinin oturumunu kapattığı için "Profil değiştir" oldu. Bağlı
 * çocuk cihazında ikisi de yoktur.
 */
export function ProfilKarti({ profil, ozet, onKapat }: ProfilKartiProps) {
  const router = useRouter();
  const kapatRef = useRef<HTMLButtonElement>(null);
  const [bagliCihaz, setBagliCihaz] = useState(false);

  useEffect(() => {
    kapatRef.current?.focus();
    function tus(event: KeyboardEvent) {
      if (event.key === "Escape") onKapat();
    }
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [onKapat]);

  useEffect(() => {
    let iptal = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!iptal) setBagliCihaz(Boolean(data.session?.user.is_anonymous));
    });
    return () => {
      iptal = true;
    };
  }, []);

  function profilDegistir() {
    profiliKapat();
    router.push("/kim-okuyor");
  }

  return (
    <div className={styles.profilKatmani}>
      <button type="button" className={styles.ortu} aria-label="Profili kapat" onClick={onKapat} />
      <section className={styles.profilKarti} role="dialog" aria-modal="true" aria-label="Profilin">
        <span className={styles.tutamac} aria-hidden="true" />
        <div className={styles.profilBas}>
          <span className={styles.buyukAvatar}>
            <CocukAvatari
              avatarTipi={profil.avatarAnahtari}
              fotografUrl={profil.avatarFotografi}
              boyut={64}
              alt=""
            />
          </span>
          <h2>{profil.ad}</h2>
          <button ref={kapatRef} type="button" className={styles.kapat} aria-label="Kapat" onClick={onKapat}>
            <Ikon ad="kapat" boyut={20} />
          </button>
        </div>

        <div className={styles.unvanKutusu}>
          <YedekliGorsel
            src={unvanGorseli(unvanAnahtari(ozet.unvan))}
            yedekSrc={YEDEK.unvan}
            alt=""
            width={56}
            height={56}
            className={styles.unvanGorseli}
          />
          <div>
            <small>Unvanın</small>
            <strong>{ozet.unvan}</strong>
            {ozet.sonrakiUnvan ? (
              <small>
                {ozet.sonrakiUnvan.kalan} kitap daha okuyunca: {ozet.sonrakiUnvan.unvan}
              </small>
            ) : (
              <small>Bütün unvanları topladın.</small>
            )}
          </div>
        </div>

        <div className={styles.sayaclar}>
          <div>
            <Ikon ad="rozet" boyut={28} />
            <span>
              <strong>{ozet.rozet}</strong>
              <small>rozet</small>
            </span>
          </div>
          <div>
            <Ikon ad="madalya" boyut={28} />
            <span>
              <strong>{ozet.madalya}</strong>
              <small>madalya</small>
            </span>
          </div>
        </div>

        {bagliCihaz ? (
          <p className={styles.bagliCihazNotu}>Bu cihaz {profil.ad} için bağlı.</p>
        ) : (
          <div className={styles.satirlar}>
            <button type="button" className={styles.satir} onClick={profilDegistir}>
              <Ikon ad="hesap" boyut={22} />
              <span>
                <strong>Profil değiştir</strong>
                <small>Kim okuyor?</small>
              </span>
              <Ikon ad="ok-sag" boyut={18} className={styles.satirOku} />
            </button>
            <button type="button" className={styles.satir} onClick={() => router.push("/dashboard")}>
              <Ikon ad="kilit" boyut={22} />
              <span>
                <strong>Veli Paneli</strong>
                <small>Annen ya da baban için</small>
              </span>
              <Ikon ad="ok-sag" boyut={18} className={styles.satirOku} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
