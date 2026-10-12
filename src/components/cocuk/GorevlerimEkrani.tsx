"use client";

import Link from "next/link";
import { useState } from "react";
import type { GorevDurumDetay } from "../../lib/derive";
import type { YolculukKitabi } from "../../lib/child/yolculuk";
import { Ikon } from "../ui";
import { BosEkran } from "./BosEkran";
import { Isil } from "./Isil";
import { Cip, SayfaBasligi } from "./SayfaBasligi";
import ortak from "./cocuk-sayfalari.module.css";
import styles from "./gorevlerim.module.css";

/**
 * Görevlerim (PROJE-MODELI 3.10.8, 4.3). Çocuğun listesine eklediği "Bugüne
 * Taşı" görevleri. Hepsi gönüllüdür: son tarih, seri, puan, ödül YOKTUR;
 * tamamlamak yalnız hafif bir onay anıdır.
 *
 *  - Bekleyenler açık krem kartlarda (okuma ekranındaki görev kartının dili).
 *  - Bekleyen yoksa yerinde sakin bir kart durur (boş sütun kalmaz).
 *  - Tamamlananlar kompakt satırlar; dokununca ayrıntı açılır.
 */
export function GorevlerimEkrani({
  gorevler,
  kitaplar,
  yukleniyor,
  isaretlenen,
  sonTamamlanan,
  onTamamla,
}: {
  gorevler: GorevDurumDetay[];
  kitaplar: YolculukKitabi[];
  yukleniyor: boolean;
  /** Kaydı süren görevin kimliği. */
  isaretlenen: string | null;
  /** Bu açılışta az önce tamamlanan görev (onay anı). */
  sonTamamlanan: string | null;
  onTamamla: (gorev: GorevDurumDetay) => void;
}) {
  const [acik, setAcik] = useState<string | null>(null);
  const bekleyenler = gorevler.filter((gorev) => gorev.status === "eklendi");
  const tamamlananlar = gorevler
    .filter((gorev) => gorev.status === "tamamlandi")
    .sort((a, b) => Date.parse(b.completedAt ?? b.addedAt) - Date.parse(a.completedAt ?? a.addedAt));
  const kaynak = (gorev: GorevDurumDetay) => {
    const kitap = kitaplar.find((item) => item.key === gorev.bookKey);
    return `${kitap?.ad ?? gorev.bookTitle} · ${gorev.bolumNo}. bölüm`;
  };
  const sonGorev = gorevler.find((gorev) => gorev.gorev.id === sonTamamlanan);

  return (
    <div className={ortak.sayfa}>
      <SayfaBasligi baslik="Görevlerim" aciklama="Bugüne Taşı görevlerin. Hepsi gönüllü; kendi hızında yaparsın.">
        {gorevler.length > 0 ? (
          <>
            <Cip sayi={bekleyenler.length} etiket="seni bekliyor" />
            <Cip sayi={tamamlananlar.length} etiket="tamamladın" />
          </>
        ) : null}
      </SayfaBasligi>

      {sonGorev ? (
        <p className={styles.onayBandi} role="status">
          <Ikon ad="onay" boyut={20} />“{sonGorev.gorev.ad}” tamamlandı.
        </p>
      ) : null}

      {yukleniyor ? (
        <p className={styles.yukleniyor}>Görevlerin hazırlanıyor…</p>
      ) : gorevler.length === 0 ? (
        <BosEkran
          baslik="Listen henüz boş"
          metin="Okurken bir Bugüne Taşı görevini listene eklersen burada seni bekler."
          dugme={{ etiket: "Okumaya Devam Et", yol: "/map" }}
        />
      ) : (
        <div className={styles.duzen}>
          <section aria-labelledby="bekleyen-basligi">
            <div className={ortak.bolumBasligi}>
              <h2 id="bekleyen-basligi">Seni bekleyenler</h2>
              <span>{bekleyenler.length}</span>
            </div>
            {bekleyenler.length === 0 ? (
              <div className={`${ortak.kart} ${styles.sakinKart}`}>
                <Isil boyut={72} />
                <div>
                  <h3>Şu an bekleyen görevin yok</h3>
                  <p>Okurken yeni görevler bulacaksın.</p>
                </div>
                <Link href="/map" className={`${ortak.dugme} ${ortak.dugmeAltin}`}>
                  Okumaya Devam Et
                </Link>
              </div>
            ) : (
              <div className={styles.bekleyenler}>
                {bekleyenler.map((gorev) => (
                  <article key={gorev.gorev.id} className={`${ortak.kart} ${styles.gorevKarti}`}>
                    <div className={styles.gorevBasi}>
                      <span className={styles.kategori}>{buyukHarfle(gorev.gorev.kategori)}</span>
                      <span className={styles.kaynak}>{kaynak(gorev)}</span>
                    </div>
                    <h3>{gorev.gorev.ad}</h3>
                    <GorevAyrintisi gorev={gorev} />
                    <button
                      type="button"
                      className={`${ortak.dugme} ${ortak.dugmeYesil} ${styles.tamamlaDugmesi}`}
                      disabled={isaretlenen === gorev.gorev.id}
                      onClick={() => onTamamla(gorev)}
                    >
                      <Ikon ad="onay" boyut={20} />
                      {isaretlenen === gorev.gorev.id ? "İşaretleniyor..." : "Görevi Tamamladım"}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="tamamlanan-basligi">
            <div className={ortak.bolumBasligi}>
              <h2 id="tamamlanan-basligi">Tamamladıkların</h2>
              <span>{tamamlananlar.length}</span>
            </div>
            {tamamlananlar.length === 0 ? (
              <p className={styles.bosNot}>Tamamladığın görevler burada birikir.</p>
            ) : (
              <ul className={styles.tamamlananlar}>
                {tamamlananlar.map((gorev) => {
                  const ayrinti = acik === gorev.gorev.id;
                  return (
                    <li
                      key={gorev.gorev.id}
                      className={`${ortak.kart} ${styles.tamamSatiri} ${
                        sonTamamlanan === gorev.gorev.id ? styles.yeniTamam : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.tamamBasi}
                        aria-expanded={ayrinti}
                        onClick={() => setAcik(ayrinti ? null : gorev.gorev.id)}
                      >
                        <span className={styles.onayIsareti}>
                          <Ikon ad="onay" boyut={20} />
                        </span>
                        <span className={styles.tamamMetni}>
                          <strong>{gorev.gorev.ad}</strong>
                          <small>
                            {kaynak(gorev)}
                            {gorev.completedAt ? ` · ${tarih(gorev.completedAt)}` : ""}
                          </small>
                        </span>
                        <Ikon ad="asagi" boyut={20} className={ayrinti ? styles.okAcik : styles.ok} />
                      </button>
                      {ayrinti ? (
                        <div className={styles.tamamAyrinti}>
                          <GorevAyrintisi gorev={gorev} />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

/** İçerikte kategori küçük harfle yazılı ("öğrenme"); çipte baş harf büyük. */
function buyukHarfle(metin: string) {
  return metin.charAt(0).toLocaleUpperCase("tr-TR") + metin.slice(1);
}

/** "12 Ekim" */
function tarih(iso: string) {
  const zaman = Date.parse(iso);
  if (!Number.isFinite(zaman)) return "";
  return new Date(zaman).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

function GorevAyrintisi({ gorev }: { gorev: GorevDurumDetay }) {
  return (
    <>
      <p className={styles.aciklama}>{gorev.gorev.aciklama}</p>
      <dl className={styles.bilgi}>
        <div>
          <dt>
            <Ikon ad="saat" boyut={17} />
            Süre
          </dt>
          <dd>{gorev.gorev.sure}</dd>
        </div>
        <div>
          <dt>
            <Ikon ad="onay" boyut={17} />
            Ne zaman bitti sayılır?
          </dt>
          <dd>{gorev.gorev.olcut}</dd>
        </div>
      </dl>
      {gorev.gorev.guvenlikNotu ? (
        <p className={styles.guvenlikNotu}>
          <Ikon ad="kalp" boyut={17} />
          {gorev.gorev.guvenlikNotu}
        </p>
      ) : null}
    </>
  );
}
