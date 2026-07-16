"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { BookContentBlock } from "../../../src/data/books";
import {
  adaptDataChapter,
  type DecisionOption,
} from "../../../src/data/demoChapters";
import {
  okumaSayfalariniOlustur,
  type OkumaSayfaModeli,
} from "../../../src/components/reader/sayfalar";
import {
  Ikon,
  YedekliGorsel,
  type IkonAdi,
} from "../../../src/components/ui";
import styles from "./okuma-yeni.module.css";

type YaziDuzeyi = 0 | 1 | 2;

type AkisAdimi = {
  id:
    | "kapak"
    | "hikaye"
    | "karar"
    | "devam"
    | "karsilastirma"
    | "ogrendik"
    | "rozet";
  etiket: string;
  kisaEtiket: string;
  ikon: IkonAdi;
  sayfaIndex: number;
};

const ADEM_BOLUMU = (() => {
  const bolum = adaptDataChapter("adem-1");
  if (!bolum) throw new Error("Hz. Âdem 1. bölüm verisi bulunamadı.");
  return bolum;
})();

const ONIZLEME_SAYFALARI = okumaSayfalariniOlustur(ADEM_BOLUMU, true);
const DEVAM_INDEX = ONIZLEME_SAYFALARI.findIndex(
  (sayfa) => sayfa.type === "okuma" && sayfa.key.startsWith("devam"),
);

const AKIS_ADIMLARI = ([
  {
    id: "kapak",
    etiket: "Bölüm Kapısı",
    kisaEtiket: "Kapak",
    ikon: "kitap",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "kapak",
    ),
  },
  {
    id: "hikaye",
    etiket: "Hikâye · 1. Kısım",
    kisaEtiket: "Hikâye",
    ikon: "fener",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "okuma" && !sayfa.key.startsWith("devam"),
    ),
  },
  {
    id: "karar",
    etiket: "Sen Olsaydın?",
    kisaEtiket: "Karar",
    ikon: "dusunce",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "karar",
    ),
  },
  {
    id: "devam",
    etiket: "Hikâye Devam Ediyor",
    kisaEtiket: "Devam",
    ikon: "ok-sag",
    sayfaIndex: DEVAM_INDEX,
  },
  {
    id: "karsilastirma",
    etiket: "Seçimini Karşılaştır",
    kisaEtiket: "Karşılaştır",
    ikon: "kalp",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "karsilastirma",
    ),
  },
  {
    id: "ogrendik",
    etiket: "Ne Öğrendik?",
    kisaEtiket: "Öğrendik",
    ikon: "fidan",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "ogrendik",
    ),
  },
  {
    id: "rozet",
    etiket: "Rozet Kapısı",
    kisaEtiket: "Rozet",
    ikon: "rozet",
    sayfaIndex: ONIZLEME_SAYFALARI.findIndex(
      (sayfa) => sayfa.type === "rozet",
    ),
  },
] satisfies AkisAdimi[]).filter((adim) => adim.sayfaIndex >= 0);

const YAZI_SINIFLARI = [
  styles.yaziKucuk,
  styles.yaziNormal,
  styles.yaziBuyuk,
] as const;

function temizMetin(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sureBicimle(saniye: number) {
  if (!Number.isFinite(saniye) || saniye < 0) return "00:00";
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  return `${dakika.toString().padStart(2, "0")}:${kalan
    .toString()
    .padStart(2, "0")}`;
}

function sayfaninAkisIdsi(sayfa: OkumaSayfaModeli): AkisAdimi["id"] {
  if (sayfa.type === "okuma") {
    return sayfa.key.startsWith("devam") ? "devam" : "hikaye";
  }
  if (sayfa.type === "karsilastirma") return "karsilastirma";
  if (sayfa.type === "ogrendik") return "ogrendik";
  if (sayfa.type === "rozet") return "rozet";
  if (sayfa.type === "karar") return "karar";
  return "kapak";
}

function DogaSahnesi({ devamEdiyor = false }: { devamEdiyor?: boolean }) {
  return (
    <div
      className={styles.natureScene}
      data-scene={devamEdiyor ? "devam" : "hikaye"}
      role="img"
      aria-label="İnsan figürü içermeyen dağlar, nehir, yıldızlar ve bitkilerden oluşan doğa illüstrasyonu"
    >
      <span className={`${styles.sceneStar} ${styles.sceneStarOne}`} />
      <span className={`${styles.sceneStar} ${styles.sceneStarTwo}`} />
      <span className={`${styles.sceneStar} ${styles.sceneStarThree}`} />
      <span className={styles.sceneMoon} />
      <span className={styles.sceneMountainBack} />
      <span className={styles.sceneMountainFront} />
      <svg
        className={styles.sceneRiver}
        viewBox="0 0 120 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="okuma-nehir-dolgusu" x1="0" y1="0" x2="0" y2="1">
            <stop className={styles.sceneRiverStart} offset="0" />
            <stop className={styles.sceneRiverEnd} offset="1" />
          </linearGradient>
        </defs>
        <path d="M54 0 C45 38 71 58 60 94 C48 132 83 155 74 193 C64 233 98 270 112 320 L18 320 C30 276 52 244 43 201 C35 159 59 137 46 99 C34 64 58 41 43 0 Z" />
      </svg>
      <span className={`${styles.scenePlant} ${styles.scenePlantOne}`}>
        <Ikon ad="fidan" boyut={31} />
      </span>
      <span className={`${styles.scenePlant} ${styles.scenePlantTwo}`}>
        <Ikon ad="fidan" boyut={24} />
      </span>
      <span className={styles.sceneCompass}>
        <Ikon ad="harita" boyut={23} />
      </span>
      <div className={styles.sceneCaption}>
        <small>{devamEdiyor ? "Hikâye devam ediyor" : "Doğa · dağlar · nehir"}</small>
        <strong>{temizMetin(ADEM_BOLUMU.bolumAdi)}</strong>
        <p>{ADEM_BOLUMU.ozet}</p>
      </div>
    </div>
  );
}

type IcerikBloguProps = {
  block: BookContentBlock;
  kelimeId: string;
  acikKelime: string | null;
  onKelime: (id: string | null) => void;
};

function IcerikBlogu({
  block,
  kelimeId,
  acikKelime,
  onKelime,
}: IcerikBloguProps) {
  if (block.type === "image" || block.type === "witness") return null;

  if (block.type === "interactive_word") {
    const acik = acikKelime === kelimeId;

    return (
      <div className={styles.wordBlock} data-qa="interactive-word-root">
        <p className={styles.storyParagraph}>
          {block.before}
          <button
            type="button"
            className={styles.glossaryWord}
            aria-expanded={acik}
            aria-controls={`${kelimeId}-aciklama`}
            onClick={() => onKelime(acik ? null : kelimeId)}
            data-qa="interactive-word"
          >
            {block.word}
            <Ikon ad="kitap" boyut={15} />
          </button>
          {block.after}
        </p>
        {acik ? (
          <div
            className={styles.wordMeaning}
            id={`${kelimeId}-aciklama`}
            role="status"
            data-qa="word-meaning"
          >
            <span>
              <Ikon ad="kitap" boyut={18} />
            </span>
            <p>
              <strong>{block.word}</strong>
              {block.meaning}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <p
      className={`${styles.storyParagraph} ${
        block.text.trimStart().startsWith("—") ? styles.dialogue : ""
      }`}
    >
      {block.text}
    </p>
  );
}

export default function OkumaYeniOnizleme() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [aktifSayfa, setAktifSayfa] = useState(1);
  const [secilen, setSecilen] =
    useState<DecisionOption["id"] | null>(null);
  const [kararOnayli, setKararOnayli] = useState(false);
  const [acikKelime, setAcikKelime] = useState<string | null>(null);
  const [yaziDuzeyi, setYaziDuzeyi] = useState<YaziDuzeyi>(1);
  const [araclarAcik, setAraclarAcik] = useState(false);
  const [sesCaliyor, setSesCaliyor] = useState(false);
  const [gecenSure, setGecenSure] = useState(0);
  const [toplamSure, setToplamSure] = useState(0);
  const [yerelNot, setYerelNot] = useState(
    "Bu tasarım önizlemesi hiçbir okuma ilerlemesini kaydetmez.",
  );

  const sayfa = ONIZLEME_SAYFALARI[aktifSayfa];
  const akisId = sayfaninAkisIdsi(sayfa);
  const sonSayfada = aktifSayfa === ONIZLEME_SAYFALARI.length - 1;
  const kararSayfasinda = sayfa.type === "karar";
  const kapakSayfasinda = sayfa.type === "kapak";
  const rozetSayfasinda = sayfa.type === "rozet";
  const sonrakiKilitli =
    sonSayfada || kapakSayfasinda || (kararSayfasinda && !kararOnayli);

  useEffect(() => {
    const ses = audioRef.current;
    return () => ses?.pause();
  }, []);

  useEffect(() => {
    if (!araclarAcik) return;

    function escapeIleKapat(event: KeyboardEvent) {
      if (event.key === "Escape") setAraclarAcik(false);
    }

    window.addEventListener("keydown", escapeIleKapat);
    return () => window.removeEventListener("keydown", escapeIleKapat);
  }, [araclarAcik]);

  function sayfayaGit(index: number) {
    const hedef = Math.min(
      Math.max(index, 0),
      ONIZLEME_SAYFALARI.length - 1,
    );
    setAktifSayfa(hedef);
    setAcikKelime(null);
    setAraclarAcik(false);
    setYerelNot(
      `Sayfa ${hedef + 1}, yalnızca yerel önizleme durumunda açıldı.`,
    );
  }

  function akisAdiminaGit(adim: AkisAdimi) {
    if (
      (adim.id === "devam" || adim.id === "karsilastirma") &&
      !secilen
    ) {
      setSecilen("b");
      setKararOnayli(true);
      setYerelNot(
        "Akış görünümünü göstermek için B seçeneği yalnızca yerel örnek olarak işaretlendi.",
      );
    }

    if (adim.id === "karar") {
      setSecilen(null);
      setKararOnayli(false);
    }

    sayfayaGit(adim.sayfaIndex);
  }

  function karariOnayla() {
    if (!secilen) return;
    setKararOnayli(true);
    setYerelNot(
      "Kararın yalnızca bu önizleme oturumunda tutuluyor; doğru veya yanlış açıklanmadı.",
    );
  }

  function akisiSifirla() {
    setSecilen(null);
    setKararOnayli(false);
    setAcikKelime(null);
    setYaziDuzeyi(1);
    setAktifSayfa(1);
    setAraclarAcik(false);
    setYerelNot("Önizleme akışı yerel olarak sıfırlandı.");
  }

  function sesOynatDurdur() {
    const ses = audioRef.current;
    if (!ses) return;

    if (sesCaliyor) {
      ses.pause();
      return;
    }

    void ses.play().catch(() => {
      setSesCaliyor(false);
      setYerelNot("Sesli anlatım bu tarayıcıda başlatılamadı.");
    });
  }

  function sesiSar(value: number) {
    const ses = audioRef.current;
    if (!ses || !Number.isFinite(value)) return;
    ses.currentTime = value;
    setGecenSure(value);
  }

  function sayfayiCiz() {
    if (sayfa.type === "kapak") {
      return (
        <div className={styles.coverLayout} data-qa="cover-view">
          <div className={styles.coverVisual}>
            <span className={styles.coverGlow} aria-hidden="true" />
            <YedekliGorsel
              src="/kapaklar/kapak-adem.png"
              yedekSrc="/kapaklar/placeholder.svg"
              alt="Hz. Âdem kitap kapağı"
              width={238}
              height={356}
              className={styles.coverImage}
            />
          </div>
          <section className={styles.coverCopy}>
            <p className={styles.pageEyebrow}>1. Bölüm · Yolculuk Başlıyor</p>
            <h1>{temizMetin(ADEM_BOLUMU.bolumAdi)}</h1>
            <p className={styles.coverSummary}>{ADEM_BOLUMU.ozet}</p>
            <div className={styles.badgePreview}>
              <YedekliGorsel
                src="/rozetler/placeholder.svg"
                yedekSrc="/rozetler/placeholder.svg"
                alt="İlk Adım Rozeti önizlemesi"
                width={62}
                height={62}
                className={styles.badgeImage}
              />
              <span>
                <small>Bu bölümün rozeti</small>
                <strong>{ADEM_BOLUMU.badgeName}</strong>
              </span>
            </div>
          </section>
        </div>
      );
    }

    if (sayfa.type === "okuma") {
      const devamEdiyor = sayfa.key.startsWith("devam");

      return (
        <div className={styles.storyLayout} data-qa="story-view">
          <DogaSahnesi devamEdiyor={devamEdiyor} />
          <section className={styles.textPage}>
            <div className={styles.textHeading}>
              <p className={styles.pageEyebrow}>
                {devamEdiyor ? "Hikâye Devam Ediyor" : "Hikâye · 1. Kısım"}
              </p>
              <h1>{temizMetin(ADEM_BOLUMU.bolumAdi)}</h1>
              <span>
                {ADEM_BOLUMU.chapterNumber}. Bölüm · Hz. Âdem
              </span>
            </div>
            <div className={styles.prose} data-qa="story-prose">
              {sayfa.bloklar.map((block, index) => (
                <IcerikBlogu
                  key={`${sayfa.key}-${index}`}
                  block={block}
                  kelimeId={`${sayfa.key}-kelime-${index}`}
                  acikKelime={acikKelime}
                  onKelime={setAcikKelime}
                />
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (sayfa.type === "karar" && ADEM_BOLUMU.decision) {
      return (
        <section className={styles.decisionView} data-qa="decision-view">
          <div className={styles.focusIntro}>
            <span className={styles.focusIcon}>
              <Ikon ad="dusunce" boyut={29} />
            </span>
            <p className={styles.pageEyebrow}>Sen Olsaydın?</p>
            <h1>{ADEM_BOLUMU.decision.question}</h1>
            <p>
              Kalbine en yakın seçeneği düşün. Doğru cevap şimdi
              açıklanmayacak.
            </p>
          </div>

          <div className={styles.options} role="radiogroup" aria-label="Karar seçenekleri">
            {ADEM_BOLUMU.decision.options.map((option, index) => {
              const secili = secilen === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.optionButton} ${
                    secili ? styles.optionSelected : ""
                  }`}
                  role="radio"
                  aria-checked={secili}
                  disabled={kararOnayli}
                  onClick={() => {
                    setSecilen(option.id);
                    setKararOnayli(false);
                    setYerelNot(`${index + 1}. seçenek yerel olarak seçildi.`);
                  }}
                  data-qa="decision-option"
                >
                  <span>{secili && kararOnayli ? <Ikon ad="onay" boyut={19} /> : index + 1}</span>
                  <strong>{option.text}</strong>
                </button>
              );
            })}
          </div>

          {kararOnayli ? (
            <div className={styles.neutralNote} aria-live="polite" data-qa="neutral-note">
              <Ikon ad="fener" boyut={21} />
              <p>{ADEM_BOLUMU.decision.afterChoiceNote}</p>
            </div>
          ) : null}
        </section>
      );
    }

    if (sayfa.type === "karsilastirma") {
      const secenek = ADEM_BOLUMU.decision?.options.find(
        (option) => option.id === secilen,
      );

      return (
        <section className={styles.compareView} data-qa="compare-view">
          <span className={styles.focusIcon}>
            <Ikon ad="kalp" boyut={29} />
          </span>
          <p className={styles.pageEyebrow}>Düşünme Durağı</p>
          <h1>Seçimini Karşılaştır</h1>
          <p className={styles.focusDescription}>
            Hikâyenin devamını okudun. Şimdi yalnızca kendi seçimine bakalım.
          </p>

          {secenek && secilen ? (
            <>
              <div className={styles.chosenAnswer}>
                <small>Senin seçimin</small>
                <p>
                  <span>{secilen.toLocaleUpperCase("tr-TR")}</span>
                  <strong>{secenek.text}</strong>
                </p>
              </div>
              <div className={styles.comparisonText} data-qa="comparison-text">
                <Ikon ad="fidan" boyut={24} />
                <p>{secenek.comparison}</p>
              </div>
              <p className={styles.compareFootnote}>
                Önemli olan, hikâyenin sana düşündürdükleri.
              </p>
            </>
          ) : (
            <button
              type="button"
              className={styles.inlineAction}
              onClick={() => {
                const kararIndex = AKIS_ADIMLARI.find(
                  (adim) => adim.id === "karar",
                )?.sayfaIndex;
                if (kararIndex !== undefined) sayfayaGit(kararIndex);
              }}
            >
              Önce “Sen Olsaydın?” sayfasında bir seçim yap
            </button>
          )}
        </section>
      );
    }

    if (sayfa.type === "ogrendik") {
      return (
        <section className={styles.learnedView} data-qa="learned-view">
          <div className={styles.focusIntro}>
            <span className={styles.focusIcon}>
              <Ikon ad="fidan" boyut={30} />
            </span>
            <p className={styles.pageEyebrow}>Yolculuk Defteri</p>
            <h1>Ne Öğrendik?</h1>
            <p>Bu bölümden yanında götüreceğin üç düşünce.</p>
          </div>
          <ol className={styles.learnedList}>
            {ADEM_BOLUMU.learned.map((madde, index) => (
              <li key={madde}>
                <span>{index + 1}</span>
                <p>{madde}</p>
              </li>
            ))}
          </ol>
          <div className={styles.nextHint}>
            <Ikon ad="rozet" boyut={20} />
            <p>Öğrendiklerini hatırladın. Şimdi Rozet Kapısı seni bekliyor.</p>
          </div>
        </section>
      );
    }

    return (
      <section className={styles.rewardView} data-qa="reward-view">
        <div className={styles.rewardGlow} aria-hidden="true" />
        <p className={styles.pageEyebrow}>Bölüm Tamamlandı</p>
        <h1>Rozet Kapısı</h1>
        <p className={styles.rewardIntro}>
          Bu yolculukta sorumluluğun öğrenerek taşındığını keşfettin.
        </p>
        <div className={styles.rewardBadge}>
          <YedekliGorsel
            src="/rozetler/placeholder.svg"
            yedekSrc="/rozetler/placeholder.svg"
            alt="İlk Adım Rozeti"
            width={134}
            height={134}
            className={styles.rewardImage}
          />
          <strong>{ADEM_BOLUMU.badgeName}</strong>
        </div>
        <div className={styles.rewardMessage}>
          <Ikon ad="harita" boyut={22} />
          <p>
            Önizlemede rozet ve ilerleme kaydedilmez. Bu ekran yalnızca tasarım
            kararını görmen içindir.
          </p>
        </div>
      </section>
    );
  }

  const ozelAksiyon = kapakSayfasinda
    ? {
        etiket: "Maceraya Başla",
        ikon: "yildiz" as const,
        varyant: styles.goldAction,
        disabled: false,
        onClick: () => sayfayaGit(1),
      }
    : kararSayfasinda && !kararOnayli
      ? {
          etiket: "Kararını Onayla",
          ikon: "onay" as const,
          varyant: styles.greenAction,
          disabled: !secilen,
          onClick: karariOnayla,
        }
      : rozetSayfasinda
        ? {
            etiket: "Bölümü Tamamla",
            ikon: "rozet" as const,
            varyant: styles.greenAction,
            disabled: false,
            onClick: () =>
              setYerelNot(
                "“Bölümü Tamamla” yalnızca önizlendi; hiçbir ilerleme veya rozet kaydedilmedi.",
              ),
          }
        : null;

  return (
    <main
      className={`tema-cocuk ${styles.page} ${YAZI_SINIFLARI[yaziDuzeyi]}`}
      data-qa="reader-preview"
    >
      <div className={styles.atlasBackdrop} aria-hidden="true" />
      <div className={styles.readerShell}>
        <header className={styles.readerHeader}>
          <div className={styles.previewGroup}>
            <span className={styles.previewBadge} data-qa="preview-label">
              <Ikon ad="dusunce" boyut={16} />
              Tasarım Önizlemesi
            </span>
            <Link className={styles.backLink} href="/tasarim/kitap-yeni">
              <Ikon ad="geri" boyut={18} />
              Bölüm Rotasına Dön
            </Link>
          </div>

          <div className={styles.chapterIdentity}>
            <span className={styles.bookMark}>
              <Ikon ad="kitap" boyut={21} />
            </span>
            <div>
              <strong>Hz. Âdem · 1. Bölüm</strong>
              <span>{temizMetin(ADEM_BOLUMU.bolumAdi)}</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.audioPlayer} data-qa="audio-player">
              <audio
                ref={audioRef}
                src={ADEM_BOLUMU.audioUrl}
                preload="metadata"
                onLoadedMetadata={(event) =>
                  setToplamSure(event.currentTarget.duration)
                }
                onTimeUpdate={(event) =>
                  setGecenSure(event.currentTarget.currentTime)
                }
                onPlay={() => setSesCaliyor(true)}
                onPause={() => setSesCaliyor(false)}
                onEnded={() => {
                  setSesCaliyor(false);
                  setGecenSure(0);
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }}
              />
              <button
                type="button"
                className={styles.audioButton}
                aria-label={
                  sesCaliyor
                    ? "Sesli anlatımı duraklat"
                    : "Sesli anlatımı oynat"
                }
                aria-pressed={sesCaliyor}
                onClick={sesOynatDurdur}
              >
                <Ikon ad={sesCaliyor ? "duraklat" : "oynat"} boyut={16} />
              </button>
              <div className={styles.audioCopy}>
                <div>
                  <strong>Sesli anlatım</strong>
                  <span>{sureBicimle(gecenSure)} / {sureBicimle(toplamSure)}</span>
                </div>
                <input
                  className={styles.audioRange}
                  type="range"
                  min={0}
                  max={Math.max(1, toplamSure)}
                  step={0.1}
                  value={Math.min(gecenSure, Math.max(1, toplamSure))}
                  aria-label="Sesli anlatım konumu"
                  onChange={(event) => sesiSar(Number(event.target.value))}
                />
              </div>
            </div>

            <button
              type="button"
              className={styles.toolsButton}
              aria-expanded={araclarAcik}
              aria-controls="okuma-araclari"
              onClick={() => setAraclarAcik((acik) => !acik)}
              data-qa="tools-button"
            >
              <Ikon ad="menu" boyut={19} />
              <span>Okuma Araçları</span>
            </button>
          </div>
        </header>

        {araclarAcik ? (
          <aside
            className={styles.toolsPanel}
            id="okuma-araclari"
            aria-label="Okuma araçları"
            data-qa="tools-panel"
          >
            <div className={styles.toolsHeading}>
              <div>
                <p>Yerel Önizleme</p>
                <h2>Okuma Araçları</h2>
              </div>
              <button
                type="button"
                aria-label="Okuma araçlarını kapat"
                onClick={() => setAraclarAcik(false)}
              >
                <Ikon ad="kapat" boyut={20} />
              </button>
            </div>

            <section className={styles.fontTools} aria-label="Yazı büyüklüğü">
              <div>
                <strong>Yazı büyüklüğü</strong>
                <span>{["Küçük", "Normal", "Büyük"][yaziDuzeyi]}</span>
              </div>
              <div>
                <button
                  type="button"
                  aria-label="Yazıyı küçült"
                  disabled={yaziDuzeyi === 0}
                  onClick={() =>
                    setYaziDuzeyi((deger) =>
                      Math.max(0, deger - 1) as YaziDuzeyi,
                    )
                  }
                  data-qa="font-decrease"
                >
                  A−
                </button>
                <button
                  type="button"
                  aria-label="Yazıyı büyüt"
                  disabled={yaziDuzeyi === 2}
                  onClick={() =>
                    setYaziDuzeyi((deger) =>
                      Math.min(2, deger + 1) as YaziDuzeyi,
                    )
                  }
                  data-qa="font-increase"
                >
                  A+
                </button>
              </div>
            </section>

            <nav className={styles.flowNav} aria-label="Bölüm içi akış">
              <p>Bölüm içi akış</p>
              <ol>
                {AKIS_ADIMLARI.map((adim, index) => (
                  <li key={adim.id}>
                    <button
                      type="button"
                      className={akisId === adim.id ? styles.flowActive : ""}
                      aria-current={akisId === adim.id ? "step" : undefined}
                      onClick={() => akisAdiminaGit(adim)}
                      data-flow-step={adim.id}
                    >
                      <span>{index + 1}</span>
                      <Ikon ad={adim.ikon} boyut={18} />
                      <strong>{adim.etiket}</strong>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <button
              type="button"
              className={styles.resetButton}
              onClick={akisiSifirla}
            >
              Önizlemeyi Sıfırla
            </button>
            <p className={styles.toolsPolicy}>
              Seçimler, ses konumu ve sayfa durumu bu prototipte hiçbir yere
              kaydedilmez.
            </p>
          </aside>
        ) : null}

        <div className={styles.readingViewport}>
          <article
            className={styles.bookSurface}
            data-page-type={sayfa.type}
            data-qa="reading-surface"
          >
            <div className={styles.pageTransition} key={sayfa.key}>
              {sayfayiCiz()}
            </div>
          </article>
        </div>

        <nav className={styles.readerDock} aria-label="Okuma sayfası gezinmesi">
          <button
            type="button"
            className={styles.navButton}
            aria-label="Önceki sayfa"
            disabled={aktifSayfa === 0}
            onClick={() => sayfayaGit(aktifSayfa - 1)}
            data-qa="previous-page"
          >
            <span><Ikon ad="ok-sol" boyut={20} /></span>
            <strong>Önceki</strong>
          </button>

          <div className={styles.dockCenter}>
            {ozelAksiyon ? (
              <button
                type="button"
                className={`${styles.specialAction} ${ozelAksiyon.varyant}`}
                disabled={ozelAksiyon.disabled}
                onClick={ozelAksiyon.onClick}
                data-qa="special-action"
              >
                <Ikon ad={ozelAksiyon.ikon} boyut={18} />
                {ozelAksiyon.etiket}
              </button>
            ) : (
              <div className={styles.pageProgress}>
                <p>Sayfa {aktifSayfa + 1} / {ONIZLEME_SAYFALARI.length}</p>
                <div
                  role="progressbar"
                  aria-label="Bölüm sayfa ilerlemesi"
                  aria-valuemin={1}
                  aria-valuemax={ONIZLEME_SAYFALARI.length}
                  aria-valuenow={aktifSayfa + 1}
                >
                  {ONIZLEME_SAYFALARI.map((_, index) => (
                    <span
                      key={index}
                      className={index <= aktifSayfa ? styles.progressDone : ""}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={styles.navButton}
            aria-label="Sonraki sayfa"
            disabled={sonrakiKilitli}
            onClick={() => sayfayaGit(aktifSayfa + 1)}
            data-qa="next-page"
          >
            <strong>Sonraki</strong>
            <span><Ikon ad="ok-sag" boyut={20} /></span>
          </button>
        </nav>

        <p className={styles.srOnly} aria-live="polite" data-qa="preview-note">
          {yerelNot}
        </p>
      </div>
    </main>
  );
}
