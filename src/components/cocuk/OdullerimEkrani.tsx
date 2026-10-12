"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { unvanAnahtari } from "../../lib/derive";
import { bolumDurumu, finalDurumu, unvanBilgisi, type YolculukKitabi } from "../../lib/child/yolculuk";
import { iyelikEki } from "../../lib/child/sayiEki";
import { kitapKapagi, madalyaGorseli, rozetGorseli, unvanGorseli, YEDEK } from "../../lib/varlikYollari";
import { KutlamaSahnesi } from "../reader/KutlamaSahnesi";
import okuma from "../reader/okuma-akisi.module.css";
import { CocukAvatari, Ikon, YedekliGorsel } from "../ui";
import { BosEkran } from "./BosEkran";
import { SayfaBasligi } from "./SayfaBasligi";
import { UnvanYolu } from "./UnvanYolu";
import ortak from "./cocuk-sayfalari.module.css";
import styles from "./odullerim.module.css";

export type OdulProfili = {
  ad: string;
  avatarAnahtari: string;
  avatarFotografi?: string | null;
};

type SecilenRozet = { kitap: YolculukKitabi; no: number };

/** "8 bölümün 5'i", "4 rozetin 3'ü" — tamlayan ekli adla gelir ("bölümün"). */
function kacinda(toplam: number, sayi: number, tamlayan: string) {
  return `${toplam} ${tamlayan} ${sayi}'${iyelikEki(sayi)}`;
}

/**
 * Ödüllerim — tek sayfa vitrin (KARAR 12 Eki 2026, Hasan; PROJE-MODELI 3.10.8).
 * Sekmeler kalktı; çocuk bütün ödüllerini tek bakışta görür:
 *  1. Unvan kartı: unvan görseli, bir sonraki unvana kalan kitap, sayaçlar.
 *  2. Madalya rafı: yayındaki her kitabın madalyası ve somut durumu.
 *  3. Rozet albümü: kitap kitap; rozete dokununca ayrıntı penceresi.
 *  4. Unvan yolu: on unvan, ışık izi şu anki unvana kadar dolar.
 *
 * Zemin gece mavisi, kartlar krem (3.1). Unvan biten kitap sayısından
 * türetilir; veritabanındaki eski `unvan` alanı okunmaz (Bölüm 2).
 */
export function OdullerimEkrani({
  profil,
  kitaplar,
  yukleniyor,
}: {
  profil: OdulProfili;
  kitaplar: YolculukKitabi[];
  yukleniyor: boolean;
}) {
  const [secilen, setSecilen] = useState<SecilenRozet | null>(null);
  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozetSayisi = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);
  const unvan = unvanBilgisi(biten);

  return (
    <div className={ortak.sayfa}>
      <SayfaBasligi baslik="Ödüllerim" aciklama="Okudukça kazandığın rozetler, madalyalar ve unvanlar." />

      {yukleniyor ? (
        <p className={styles.yukleniyor}>Ödüllerin hazırlanıyor…</p>
      ) : kitaplar.length === 0 ? (
        <BosEkran
          baslik="Ödül rafın seni bekliyor"
          metin="İlk bölümü bitirince ilk rozetin buraya gelecek."
          dugme={{ etiket: "Okumaya Başla", yol: "/map" }}
        />
      ) : (
        <>
          <UnvanKarti profil={profil} biten={biten} rozetSayisi={rozetSayisi} unvan={unvan} />

          <section aria-labelledby="madalyalar-basligi">
            <div className={ortak.bolumBasligi}>
              <h2 id="madalyalar-basligi">Madalyalar</h2>
              <span>
                {biten} / {kitaplar.length}
              </span>
            </div>
            <div className={styles.madalyaRafi}>
              {kitaplar.map((kitap) => (
                <MadalyaKarti key={kitap.key} kitap={kitap} />
              ))}
            </div>
          </section>

          <section aria-labelledby="rozetler-basligi">
            <div className={ortak.bolumBasligi}>
              <h2 id="rozetler-basligi">Rozet albümü</h2>
              <span>{rozetSayisi} rozet</span>
            </div>
            <div className={styles.albumler}>
              {kitaplar.map((kitap) => (
                <RozetAlbumu key={kitap.key} kitap={kitap} onSec={(no) => setSecilen({ kitap, no })} />
              ))}
            </div>
          </section>

          <UnvanYolu biten={biten} />
        </>
      )}

      {secilen ? <RozetAyrintisi secilen={secilen} onKapat={() => setSecilen(null)} /> : null}
    </div>
  );
}

function UnvanKarti({
  profil,
  biten,
  rozetSayisi,
  unvan,
}: {
  profil: OdulProfili;
  biten: number;
  rozetSayisi: number;
  unvan: ReturnType<typeof unvanBilgisi>;
}) {
  const sonraki = unvan.sonraki;
  return (
    <section className={`${ortak.kart} ${styles.unvanKarti}`} aria-labelledby="unvan-basligi">
      <div className={styles.unvanGorseli} aria-hidden="true">
        <span className={styles.unvanIsini} />
        <YedekliGorsel
          src={unvanGorseli(unvanAnahtari(unvan.unvan))}
          yedekSrc={YEDEK.unvan}
          alt=""
          width={132}
          height={132}
        />
      </div>

      <div className={styles.unvanMetni}>
        <p className={styles.sahip}>
          <span className={styles.sahipAvatari}>
            <CocukAvatari
              avatarTipi={profil.avatarAnahtari}
              fotografUrl={profil.avatarFotografi}
              boyut={36}
              alt=""
            />
          </span>
          {profil.ad}
        </p>
        <small>Unvanın</small>
        <h2 id="unvan-basligi">{unvan.unvan}</h2>
        {sonraki ? (
          <div className={styles.sonrakiUnvan}>
            <div className={ortak.cubuk}>
              <span style={{ "--dolu": unvanIlerlemesi(biten) } as CSSProperties} />
            </div>
            <p>
              <b>{sonraki.unvan}</b> için {sonraki.kalan} kitap daha
            </p>
          </div>
        ) : (
          <p className={styles.sonrakiUnvan}>Bütün unvanlar senin.</p>
        )}
      </div>

      <dl className={styles.sayaclar}>
        <div>
          <dt>Rozet</dt>
          <dd>
            <Ikon ad="rozet" boyut={20} />
            {rozetSayisi}
          </dd>
        </div>
        <div>
          <dt>Madalya</dt>
          <dd>
            <Ikon ad="madalya" boyut={20} />
            {biten}
          </dd>
        </div>
        <div>
          <dt>Biten kitap</dt>
          <dd>
            <Ikon ad="kitap" boyut={20} />
            {biten}
          </dd>
        </div>
      </dl>
    </section>
  );
}

/**
 * Bir sonraki unvana alınan yol (0–1): biten kitap / o unvanın eşiği. Eşikler
 * arası oran ilk kitaplarda çubuğu boş gösteriyordu (1 kitap → 0).
 */
function unvanIlerlemesi(biten: number) {
  const bilgi = unvanBilgisi(biten);
  if (!bilgi.sonraki) return 1;
  return biten / (biten + bilgi.sonraki.kalan);
}

function MadalyaKarti({ kitap }: { kitap: YolculukKitabi }) {
  const durum = finalDurumu(kitap);
  const toplam = kitap.bolumler.length;
  const yol = madalyaGorseli(kitap.key);

  return (
    <article className={`${ortak.kart} ${styles.madalyaKarti} ${kitap.bitti ? styles.kazanildi : ""}`}>
      <div className={styles.madalyaGorseli} style={{ "--maske": `url("${yol}")` } as CSSProperties}>
        <YedekliGorsel src={yol} yedekSrc={YEDEK.madalya} alt="" width={96} height={96} />
        {kitap.bitti ? <span className={styles.parlama} aria-hidden="true" /> : null}
      </div>
      <h3>{kitap.ad}</h3>
      {kitap.bitti ? (
        <p className={styles.madalyaDurumu}>
          <Ikon ad="onay" boyut={16} />
          Madalya senin
        </p>
      ) : durum === "acik" && kitap.finalYolu ? (
        <Link href={kitap.finalYolu} className={`${ortak.dugme} ${ortak.dugmeAltin} ${styles.finalDugmesi}`}>
          Final Testine Başla
        </Link>
      ) : (
        <div className={styles.madalyaIlerleme}>
          <div className={ortak.cubuk}>
            <span style={{ "--dolu": kitap.tamamlanan / Math.max(1, toplam) } as CSSProperties} />
          </div>
          <p>
            {kitap.tamamlanan > 0 ? kacinda(toplam, kitap.tamamlanan, "bölümün") : `${toplam} bölüm`} · sonra
            final testi
          </p>
        </div>
      )}
    </article>
  );
}

function RozetAlbumu({ kitap, onSec }: { kitap: YolculukKitabi; onSec: (no: number) => void }) {
  const toplam = kitap.bolumler.length;
  const k = kitap.tamamlanan;

  return (
    <article className={`${ortak.kart} ${styles.album} ${k === 0 ? styles.albumBos : ""}`}>
      <header className={styles.albumBasi}>
        <YedekliGorsel
          src={kitapKapagi(kitap.key)}
          yedekSrc={YEDEK.kitapKapagi}
          alt=""
          width={48}
          height={66}
          className={styles.albumKapagi}
        />
        <div>
          <h3>{kitap.ad}</h3>
          <p>
            {k === toplam
              ? "Bütün rozetler senin"
              : k === 0
                ? `${toplam} rozet seni bekliyor`
                : kacinda(toplam, k, "rozetin")}
          </p>
        </div>
        <div className={`${ortak.cubuk} ${styles.albumCubugu}`}>
          <span style={{ "--dolu": k / Math.max(1, toplam) } as CSSProperties} />
        </div>
      </header>

      <ul className={styles.rozetler}>
        {kitap.bolumler.map((bolum) => {
          const durum = bolumDurumu(kitap, bolum.no);
          return (
            <li key={bolum.no}>
              <button
                type="button"
                className={`${styles.rozet} ${styles[`rozet_${durum}`]}`}
                onClick={() => onSec(bolum.no)}
              >
                <span className={styles.rozetGorseli}>
                  <YedekliGorsel
                    src={rozetGorseli(kitap.key, bolum.no)}
                    yedekSrc={YEDEK.rozet}
                    alt=""
                    width={76}
                    height={76}
                  />
                </span>
                <span className={styles.rozetAdi}>{bolum.rozetAdi}</span>
                <span className={ortak.srOnly}>
                  {durum === "tamamlandi"
                    ? ", kazandın"
                    : durum === "sirada"
                      ? ", sıradaki bölümde"
                      : `, ${bolum.no - 1}. bölümü bitirince açılır`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

/**
 * Rozet ayrıntısı: ödül sahnesinin kompakt hâli (mobilde alttan, genişte
 * ortada). Kazanılmamış rozette şart somut yazılır (3.4).
 */
function RozetAyrintisi({ secilen, onKapat }: { secilen: SecilenRozet; onKapat: () => void }) {
  const { kitap, no } = secilen;
  const bolum = kitap.bolumler[no - 1];
  const durum = bolumDurumu(kitap, no);
  const kapatRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    kapatRef.current?.focus({ preventScroll: true });
    const onceki = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function tus(event: KeyboardEvent) {
      if (event.key === "Escape") onKapat();
    }
    window.addEventListener("keydown", tus);
    return () => {
      document.body.style.overflow = onceki;
      window.removeEventListener("keydown", tus);
    };
  }, [onKapat]);

  if (!bolum) return null;

  return (
    <div className={styles.ayrintiKatmani}>
      <button type="button" className={styles.ayrintiOrtusu} aria-label="Kapat" tabIndex={-1} onClick={onKapat} />
      <div className={styles.ayrintiKutusu} role="dialog" aria-modal="true" aria-labelledby="rozet-ayrinti-basligi">
        <button ref={kapatRef} type="button" className={styles.ayrintiKapat} aria-label="Kapat" onClick={onKapat}>
          <Ikon ad="kapat" boyut={20} />
        </button>
        <KutlamaSahnesi
          kompakt
          gorsel={rozetGorseli(kitap.key, no)}
          yedekGorsel={YEDEK.rozet}
          gorselAdi={bolum.rozetAdi}
          yaklasti
          kazanildi={durum === "tamamlandi"}
          patlama={false}
          baslikId="rozet-ayrinti-basligi"
        >
          <h2 id="rozet-ayrinti-basligi">{bolum.rozetAdi}</h2>
          <p className={okuma.kutlamaNotu}>
            {kitap.ad} · {no}. bölüm · {bolum.ad}
          </p>
          <p className={styles.ayrintiDurumu}>
            {durum === "tamamlandi"
              ? "Bu rozet senin."
              : durum === "sirada"
                ? "Bu bölümü bitirince senin."
                : `${no - 1}. bölümü bitirince açılır.`}
          </p>
          {durum !== "kilitli" ? (
            <div className={`${okuma.kutlamaEylemleri} ${okuma.tekEylem}`}>
              <Link
                href={bolum.okumaYolu}
                className={`${okuma.buyukDugme} ${durum === "tamamlandi" ? okuma.geceHayaletDugme : okuma.yesilDugme}`}
              >
                {durum === "tamamlandi" ? "Tekrar Oku" : "Bölümü Oku"}
                <Ikon ad="ok-sag" boyut={20} />
              </Link>
            </div>
          ) : null}
        </KutlamaSahnesi>
      </div>
    </div>
  );
}
