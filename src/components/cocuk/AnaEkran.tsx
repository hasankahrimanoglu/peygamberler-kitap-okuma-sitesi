"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  siradakiAdim,
  yolunDevami,
  type YolculukKitabi,
} from "../../lib/child/yolculuk";
import { belirtmeEki } from "../../lib/child/sayiEki";
import { kitapKapagi, madalyaGorseli, YEDEK } from "../../lib/varlikYollari";
import { Ikon, YedekliGorsel } from "../ui";
import { IsilGorseli } from "./IsilGorseli";
import { KitapPaneli } from "./KitapPaneli";
import { YolculukRotasi } from "./YolculukRotasi";
import styles from "./yolculuk.module.css";

type AnaEkranProps = {
  profilId: string;
  kitaplar: YolculukKitabi[];
  yukleniyor: boolean;
  uyari: string | null;
};

const GENIS_EKRAN = "(min-width: 1024px)";

function duyuruAnahtari(profilId: string, kitapKey: string) {
  return `yeni-kitap-duyurusu:${profilId}:${kitapKey}`;
}

function okunduMu(anahtar: string) {
  try {
    return window.localStorage.getItem(anahtar) === "1";
  } catch {
    return false;
  }
}

/**
 * Çocuk ana ekranı (KARAR 11–12 Eki 2026 — PROJE-MODELI 3.10.1, 3.10.7).
 *
 * Dar ekranda: "Sıradaki bölümün" kartı → (varsa) yeni kitap duyurusu → rota →
 * "Yolun devamı" kartı; kitaba dokununca alttan sayfa açılır.
 * Geniş ekranda: solda kendi içinde kayan rota, sağda açılışta sıradaki kitabı
 * gösteren panel. Seçili kitap adres çubuğunda `?kitap=` olarak durur; okuma
 * ekranındaki "Bölümler" düğmesi buraya o kitap açık hâlde döner.
 */
export function AnaEkran({ profilId, kitaplar, yukleniyor, uyari }: AnaEkranProps) {
  const router = useRouter();
  const rotaKaydirRef = useRef<HTMLDivElement>(null);
  const [seciliKey, setSeciliKey] = useState<string | null>(null);
  const [vurguluKey, setVurguluKey] = useState<string | null>(null);
  const [finalKey, setFinalKey] = useState<string | null>(null);
  const [kapatilanDuyurular, setKapatilanDuyurular] = useState<string[]>([]);

  const siradaki = useMemo(() => siradakiAdim(kitaplar), [kitaplar]);
  const devami = useMemo(() => yolunDevami(kitaplar), [kitaplar]);
  const kitapBul = useCallback((key: string | null) => kitaplar.find((kitap) => kitap.key === key) ?? null, [kitaplar]);

  // Adres çubuğundan açılış durumu: ?kitap=idris · ?final=adem (quiz dönüşü).
  useEffect(() => {
    const parametreler = new URLSearchParams(window.location.search);
    queueMicrotask(() => {
      setSeciliKey(parametreler.get("kitap"));
      setFinalKey(parametreler.get("final"));
    });
  }, []);

  const adresiGuncelle = useCallback((key: string | null) => {
    const yol = window.location.pathname;
    window.history.replaceState(null, "", key ? `${yol}?kitap=${encodeURIComponent(key)}` : yol);
  }, []);

  const kitapSec = useCallback(
    (key: string | null) => {
      setSeciliKey(key);
      adresiGuncelle(key);
    },
    [adresiGuncelle],
  );

  const seciliKitap = kitapBul(seciliKey);
  const panelKitabi = seciliKitap ?? siradaki?.kitap ?? kitaplar.at(-1) ?? null;
  const finalKitabi = kitapBul(finalKey);
  const duyuruKitabi = useMemo(() => {
    if (!profilId) return null;
    return (
      kitaplar.find(
        (kitap) =>
          kitap.yeni &&
          !kapatilanDuyurular.includes(kitap.key) &&
          !okunduMu(duyuruAnahtari(profilId, kitap.key)),
      ) ?? null
    );
  }, [kapatilanDuyurular, kitaplar, profilId]);

  // Dar ekranda alttan sayfa açıkken arkadaki sayfa kaymasın.
  useEffect(() => {
    if (!seciliKitap || window.matchMedia(GENIS_EKRAN).matches) return;
    const onceki = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function tus(event: KeyboardEvent) {
      if (event.key === "Escape") kitapSec(null);
    }
    window.addEventListener("keydown", tus);
    return () => {
      document.body.style.overflow = onceki;
      window.removeEventListener("keydown", tus);
    };
  }, [kitapSec, seciliKitap]);

  // Geniş ekranda rota, açılışta okunan kitabı ortalar (rota kendi içinde kayar).
  useEffect(() => {
    if (yukleniyor || !siradaki || !window.matchMedia(GENIS_EKRAN).matches) return;
    const kap = rotaKaydirRef.current;
    const durak = kap?.querySelector<HTMLElement>(`[data-kitap="${siradaki.kitap.key}"]`);
    if (!kap || !durak) return;
    const hedef = durak.offsetTop - kap.clientHeight / 2;
    kap.scrollTo({ top: Math.max(0, hedef), behavior: "auto" });
  }, [siradaki, yukleniyor]);

  function duyuruyuKapat(key: string) {
    try {
      window.localStorage.setItem(duyuruAnahtari(profilId, key), "1");
    } catch {
      // Depolama kapalıysa duyuru bu oturumda kapanır; ekran bozulmaz.
    }
    setKapatilanDuyurular((onceki) => [...onceki, key]);
  }

  function yeniKitabiGoster(key: string) {
    duyuruyuKapat(key);
    setVurguluKey(key);
    const durak = document.querySelector<HTMLElement>(`[data-kitap="${key}"]`);
    durak?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setVurguluKey(null), 2600);
  }

  function finaliKapat() {
    setFinalKey(null);
    adresiGuncelle(seciliKey);
  }

  const git = (yol: string) => router.push(yol);
  const siradakiYolu = siradaki ? (siradaki.tur === "bolum" ? siradaki.bolum.okumaYolu : siradaki.yol) : null;

  return (
    <div className={styles.anaEkran}>
      {uyari ? <p className={styles.uyari}>{uyari}</p> : null}

      {finalKitabi?.bitti ? (
        <div className={`${styles.duyuru} ${styles.duyuruKutlama}`} role="status">
          <YedekliGorsel
            src={madalyaGorseli(finalKitabi.key)}
            yedekSrc={YEDEK.madalya}
            alt=""
            width={48}
            height={48}
            className={styles.duyuruMadalyasi}
          />
          <p>
            <b>{finalKitabi.madalyaAdi}</b> senin!
          </p>
          <button type="button" className={styles.duyuruKapat} aria-label="Kapat" onClick={finaliKapat}>
            <Ikon ad="kapat" boyut={18} />
          </button>
        </div>
      ) : null}

      <section className={styles.siradakiKart} aria-label="Sıradaki bölümün">
        {siradaki ? (
          <>
            <span className={styles.siradakiEtiketi}>
              {siradaki.tur === "final" ? "Sıradaki adımın" : "Sıradaki bölümün"}
            </span>
            <div className={styles.siradakiGovde}>
              <YedekliGorsel
                src={kitapKapagi(siradaki.kitap.key)}
                yedekSrc={YEDEK.kitapKapagi}
                alt={`${siradaki.kitap.ad} kitap kapağı`}
                width={120}
                height={168}
                className={styles.siradakiKapak}
              />
              <div>
                <span className={styles.siradakiKitap}>
                  {siradaki.kitap.ad}
                  {siradaki.tur === "bolum" ? ` · ${siradaki.bolum.no}. bölüm` : ""}
                </span>
                <strong className={styles.siradakiBolum}>
                  {siradaki.tur === "bolum" ? siradaki.bolum.ad : "Büyük Final Testi"}
                </strong>
                <div className={styles.ilerleme}>
                  <span
                    style={{
                      width: `${Math.round((siradaki.kitap.tamamlanan / Math.max(1, siradaki.kitap.bolumler.length)) * 100)}%`,
                    }}
                  />
                </div>
                <small className={styles.ilerlemeMetni}>
                  {siradaki.kitap.tamamlanan > 0
                    ? `${siradaki.kitap.bolumler.length} bölümün ${siradaki.kitap.tamamlanan}'${belirtmeEki(siradaki.kitap.tamamlanan)} okudun`
                    : `${siradaki.kitap.bolumler.length} bölüm seni bekliyor`}
                </small>
              </div>
            </div>
            <button
              type="button"
              className={`${styles.buyukDugme} ${
                siradaki.tur === "final" || !siradaki.kitap.basladi ? styles.buyukDugme_altin : styles.buyukDugme_yesil
              }`}
              onClick={() => siradakiYolu && git(siradakiYolu)}
            >
              {siradaki.tur === "final"
                ? "Büyük Final Testine Başla"
                : siradaki.kitap.basladi
                  ? "Okumaya Devam Et"
                  : "Yolculuğa Başla"}
              <Ikon ad="ok-sag" boyut={20} />
            </button>
          </>
        ) : !yukleniyor ? (
          <div className={styles.yolunUcu}>
            <IsilGorseli poz="kutlama" boyut={56} />
            <p>
              <b>Yayındaki bütün kitapları bitirdin.</b> Yol yakında uzayacak; o zamana kadar
              sevdiğin bölümleri tekrar okuyabilirsin.
            </p>
          </div>
        ) : (
          <p className={styles.yukleniyor}>Yolun hazırlanıyor…</p>
        )}
      </section>

      <div className={styles.izgara}>
        <div className={styles.rotaCercevesi}>
          {duyuruKitabi ? (
            <div className={styles.duyuru} role="status">
              <IsilGorseli poz="konusma" boyut={46} className={styles.duyuruIsil} />
              <p>
                Yeni bir kitap geldi: <b>{duyuruKitabi.ad}!</b>
              </p>
              <button type="button" className={styles.duyuruGoster} onClick={() => yeniKitabiGoster(duyuruKitabi.key)}>
                Göster
              </button>
              <button
                type="button"
                className={styles.duyuruKapat}
                aria-label="Duyuruyu kapat"
                onClick={() => duyuruyuKapat(duyuruKitabi.key)}
              >
                <Ikon ad="kapat" boyut={18} />
              </button>
            </div>
          ) : null}

          <div ref={rotaKaydirRef} className={styles.rotaKaydir}>
            {yukleniyor ? (
              <p className={styles.yukleniyor}>Yolun hazırlanıyor…</p>
            ) : (
              <YolculukRotasi
                kitaplar={kitaplar}
                siradakiKey={siradaki?.kitap.key ?? null}
                seciliKey={panelKitabi?.key ?? null}
                vurguluKey={vurguluKey}
                onSec={kitapSec}
              />
            )}

            {devami.sayi > 0 ? (
              <section className={styles.yolunDevami} aria-label="Yolun devamı">
                <div className={styles.yolunDevamiBasi}>
                  <Ikon ad="kitap" boyut={30} />
                  <div>
                    <strong>Yolun devamı hazırlanıyor</strong>
                    <span>{devami.sayi} kitap daha yolda.</span>
                  </div>
                </div>
                {devami.vitrin.length > 0 ? (
                  <ul>
                    {devami.vitrin.map((ad) => (
                      <li key={ad}>{ad}</li>
                    ))}
                    {devami.digerSayi > 0 ? <li>+{devami.digerSayi}</li> : null}
                  </ul>
                ) : null}
              </section>
            ) : null}
          </div>
        </div>

        {panelKitabi ? (
          <aside className={styles.panel} aria-label={`${panelKitabi.ad} ve bölümleri`}>
            <KitapPaneli
              key={panelKitabi.key}
              kitap={panelKitabi}
              etiket={
                panelKitabi.key === siradaki?.kitap.key
                  ? { metin: "Sıradaki bölümün" }
                  : {
                      metin: "Seçtiğin kitap",
                      siradakiyeDon: siradaki ? () => kitapSec(null) : undefined,
                    }
              }
              onGit={git}
            />
          </aside>
        ) : null}
      </div>

      {seciliKitap ? (
        <div className={styles.altSayfaKatmani}>
          <button type="button" className={styles.altSayfaOrtusu} aria-label="Kapat" onClick={() => kitapSec(null)} />
          <div className={styles.altSayfa} role="dialog" aria-modal="true" aria-label={`${seciliKitap.ad} ve bölümleri`}>
            <span className={styles.tutamac} aria-hidden="true" />
            <KitapPaneli key={seciliKitap.key} kitap={seciliKitap} onKapat={() => kitapSec(null)} onGit={git} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
