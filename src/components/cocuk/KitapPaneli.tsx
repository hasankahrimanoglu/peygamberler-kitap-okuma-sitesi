"use client";

import { useState } from "react";
import {
  bolumDurumu,
  finalDurumu,
  type YolculukBolumu,
  type YolculukKitabi,
} from "../../lib/child/yolculuk";
import { belirtmeEki } from "../../lib/child/sayiEki";
import { kitapKapagi, madalyaGorseli, rozetGorseli, YEDEK } from "../../lib/varlikYollari";
import { Ikon, YedekliGorsel } from "../ui";
import styles from "./yolculuk.module.css";

type KitapPaneliProps = {
  kitap: YolculukKitabi;
  /** Geniş ekranda panelin üstündeki etiket satırı. Alttan sayfada gösterilmez. */
  etiket?: { metin: string; siradakiyeDon?: () => void };
  onKapat?: () => void;
  onGit: (yol: string) => void;
};

/** Kitabın ana eylemi — durum dili PROJE-MODELI 3.4, buton anlamı 3.3. */
function anaEylem(kitap: YolculukKitabi) {
  const toplam = kitap.bolumler.length;
  if (kitap.bitti) {
    return { metin: "Tekrar Oku", yol: kitap.bolumler[0].okumaYolu, tur: "ikincil" as const };
  }
  if (kitap.tamamlanan < toplam) {
    const bolum = kitap.bolumler[kitap.tamamlanan];
    return kitap.basladi
      ? { metin: "Okumaya Devam Et", yol: bolum.okumaYolu, tur: "yesil" as const }
      : { metin: "Yolculuğa Başla", yol: bolum.okumaYolu, tur: "altin" as const };
  }
  return kitap.finalYolu
    ? { metin: "Büyük Final Testine Başla", yol: kitap.finalYolu, tur: "altin" as const }
    : null;
}

function BolumSatiri({
  kitap,
  bolum,
  onGit,
}: {
  kitap: YolculukKitabi;
  bolum: YolculukBolumu;
  onGit: (yol: string) => void;
}) {
  const durum = bolumDurumu(kitap, bolum.no);
  const gorevEtiketi = bolum.gorevVar ? (
    <span className={styles.gorevEtiketi}>
      <Ikon ad="gorev" boyut={13} />
      Görev var
    </span>
  ) : null;

  return (
    <li className={`${styles.bolum} ${styles[`bolum_${durum}`]}`}>
      <span className={styles.bolumRozeti}>
        <YedekliGorsel
          src={rozetGorseli(kitap.key, bolum.no)}
          yedekSrc={YEDEK.rozet}
          alt=""
          width={52}
          height={52}
        />
        {durum === "tamamlandi" ? (
          <span className={styles.tik}>
            <Ikon ad="onay" boyut={11} />
          </span>
        ) : null}
      </span>
      <span className={styles.bolumMetni}>
        <small>
          {bolum.no}. bölüm{durum === "sirada" ? " · Sıradaki" : ""}
        </small>
        <strong>{bolum.ad}</strong>
        <span>
          {durum === "tamamlandi" ? `${bolum.rozetAdi} senin` : null}
          {durum === "sirada" ? (gorevEtiketi ?? `Kazanacağın rozet: ${bolum.rozetAdi}`) : null}
          {durum === "kilitli" ? (
            <>
              {bolum.no - 1}. bölümü bitirince açılır
              {gorevEtiketi}
            </>
          ) : null}
        </span>
      </span>
      {durum === "tamamlandi" ? (
        <button type="button" className={styles.tekrarDugmesi} onClick={() => onGit(bolum.okumaYolu)}>
          Tekrar oku
        </button>
      ) : null}
      {durum === "sirada" ? (
        <button
          type="button"
          className={styles.okuDugmesi}
          aria-label={`${bolum.no}. bölümü oku: ${bolum.ad}`}
          onClick={() => onGit(bolum.okumaYolu)}
        >
          <Ikon ad="oynat" boyut={20} />
        </button>
      ) : null}
      {durum === "kilitli" ? (
        <span className={styles.kilitSimgesi}>
          <Ikon ad="kilit" boyut={20} />
        </span>
      ) : null}
    </li>
  );
}

/**
 * Kitap ve bölümleri (KARAR 12 Eki 2026 — PROJE-MODELI 3.10.7).
 * Mobilde alttan açılan sayfanın, geniş ekranda sağ panelin içeriğidir; ayrı
 * bölüm rotası sayfasının ve iki ayrı panelin yerini alır.
 */
export function KitapPaneli({ kitap, etiket, onKapat, onGit }: KitapPaneliProps) {
  const [aciklamaAcik, setAciklamaAcik] = useState(false);
  const toplam = kitap.bolumler.length;
  const doluluk = kitap.bitti ? 100 : Math.round((kitap.tamamlanan / Math.max(1, toplam)) * 100);
  const final = finalDurumu(kitap);
  const eylem = anaEylem(kitap);

  return (
    <div className={styles.kitapPaneli}>
      <div className={styles.panelKaydir}>
        {etiket ? (
          <div className={styles.panelEtiketi}>
            <span>{etiket.metin}</span>
            {etiket.siradakiyeDon ? (
              <button type="button" onClick={etiket.siradakiyeDon}>
                Sıradaki bölümüme dön
              </button>
            ) : null}
          </div>
        ) : null}

        <div className={styles.kitapBasi}>
          <YedekliGorsel
            src={kitapKapagi(kitap.key)}
            yedekSrc={YEDEK.kitapKapagi}
            alt={`${kitap.ad} kitap kapağı`}
            width={168}
            height={236}
            className={styles.kitapKapagi}
          />
          <div>
            <h2>{kitap.ad}</h2>
            <p>{kitap.altBaslik}</p>
            <div className={styles.ilerleme}>
              <span style={{ width: `${doluluk}%` }} />
            </div>
            <small className={styles.ilerlemeMetni}>
              {kitap.bitti
                ? "Bütün bölümleri ve finali bitirdin"
                : kitap.tamamlanan > 0
                  ? `${toplam} bölümün ${kitap.tamamlanan}'${belirtmeEki(kitap.tamamlanan)} okudun`
                  : `${toplam} bölüm seni bekliyor`}
            </small>
          </div>
          {onKapat ? (
            <button type="button" className={styles.kapatDugmesi} aria-label="Kapat" onClick={onKapat}>
              <Ikon ad="kapat" boyut={20} />
            </button>
          ) : null}
        </div>

        {kitap.aciklama ? (
          <div className={styles.aciklamaKutusu}>
            <p className={`${styles.aciklama} ${aciklamaAcik ? styles.aciklamaAcik : ""}`}>
              {kitap.aciklama}
            </p>
            {!aciklamaAcik ? (
              <button type="button" onClick={() => setAciklamaAcik(true)}>
                Devamını oku
              </button>
            ) : null}
          </div>
        ) : null}

        <div className={styles.bolumlerBasligi}>
          <h3>Bölümler</h3>
          <small>
            {toplam} bölüm · 1 final
          </small>
        </div>

        <ol className={styles.bolumler}>
          {kitap.bolumler.map((bolum) => (
            <BolumSatiri key={bolum.no} kitap={kitap} bolum={bolum} onGit={onGit} />
          ))}
          <li className={`${styles.bolum} ${styles[`bolum_${final === "acik" ? "sirada" : final === "tamamlandi" ? "tamamlandi" : "kilitli"}`]}`}>
            <span className={styles.bolumRozeti}>
              <YedekliGorsel
                src={madalyaGorseli(kitap.key)}
                yedekSrc={YEDEK.madalya}
                alt=""
                width={52}
                height={52}
              />
              {final === "tamamlandi" ? (
                <span className={styles.tik}>
                  <Ikon ad="onay" boyut={11} />
                </span>
              ) : null}
            </span>
            <span className={styles.bolumMetni}>
              <small>Final</small>
              <strong>Büyük Final Testi</strong>
              <span>
                {final === "tamamlandi" ? `${kitap.madalyaAdi} senin` : null}
                {final === "acik" ? `${kitap.madalyaAdi} seni bekliyor` : null}
                {final === "kilitli" ? `${toplam} bölüm bitince açılır` : null}
                {final === "hazirlaniyor" ? "Final testi hazırlanıyor" : null}
              </span>
            </span>
            {final === "tamamlandi" && kitap.finalYolu ? (
              <button
                type="button"
                className={styles.tekrarDugmesi}
                onClick={() => onGit(`${kitap.finalYolu}?mode=practice`)}
              >
                Alıştırma
              </button>
            ) : null}
            {final === "acik" && kitap.finalYolu ? (
              <button
                type="button"
                className={`${styles.okuDugmesi} ${styles.okuDugmesiAltin}`}
                aria-label="Büyük Final Testine başla"
                onClick={() => onGit(kitap.finalYolu!)}
              >
                <Ikon ad="oynat" boyut={20} />
              </button>
            ) : null}
            {final === "kilitli" || final === "hazirlaniyor" ? (
              <span className={styles.kilitSimgesi}>
                <Ikon ad={final === "kilitli" ? "kilit" : "saat"} boyut={20} />
              </span>
            ) : null}
          </li>
        </ol>
      </div>

      {eylem ? (
        <div className={styles.panelEylemi}>
          <button
            type="button"
            className={`${styles.buyukDugme} ${styles[`buyukDugme_${eylem.tur}`]}`}
            onClick={() => onGit(eylem.yol)}
          >
            {eylem.metin}
            <Ikon ad="ok-sag" boyut={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
