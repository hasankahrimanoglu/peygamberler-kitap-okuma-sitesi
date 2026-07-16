"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { BookContentBlock } from "../../data/books";
import {
  sonrakiBolumAdiniBul,
  type ChapterData,
  type DecisionOption,
} from "../../data/demoChapters";
import { Ikon, YedekliGorsel, type IkonAdi } from "../ui";
import {
  okumaSayfalariniOlustur,
  type OkumaSayfaModeli,
} from "./sayfalar";
import styles from "../../../app/tasarim/okuma-yeni/okuma-yeni.module.css";

type YaziDuzeyi = 0 | 1 | 2;

type ProgressSyncResult = {
  ok: boolean;
  message?: string;
};

type AtlasReaderProps = {
  chapter: ChapterData;
  onProgressSync: () => Promise<ProgressSyncResult>;
};

type AkisId =
  | "kapak"
  | "hikaye"
  | "tanik"
  | "karar"
  | "devam"
  | "karsilastirma"
  | "ogrendik"
  | "gorev"
  | "rozet";

type AkisAdimi = {
  id: AkisId;
  etiket: string;
  ikon: IkonAdi;
  sayfaIndex: number;
};

const YAZI_SINIFLARI = [styles.yaziKucuk, styles.yaziNormal, styles.yaziBuyuk] as const;

function temizMetin(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sureBicimle(saniye: number) {
  if (!Number.isFinite(saniye) || saniye < 0) return "00:00";
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  return `${dakika.toString().padStart(2, "0")}:${kalan.toString().padStart(2, "0")}`;
}

function akisBilgisi(sayfa: OkumaSayfaModeli): Omit<AkisAdimi, "sayfaIndex"> {
  if (sayfa.type === "okuma") {
    return sayfa.key.startsWith("devam")
      ? { id: "devam", etiket: "Hikâye Devam Ediyor", ikon: "ok-sag" }
      : { id: "hikaye", etiket: "Hikâye · 1. Kısım", ikon: "fener" };
  }
  if (sayfa.type === "tanik") return { id: "tanik", etiket: "Tanık Sayfası", ikon: "kitap" };
  if (sayfa.type === "karar") return { id: "karar", etiket: "Sen Olsaydın?", ikon: "dusunce" };
  if (sayfa.type === "karsilastirma") return { id: "karsilastirma", etiket: "Seçimini Karşılaştır", ikon: "kalp" };
  if (sayfa.type === "ogrendik") return { id: "ogrendik", etiket: "Ne Öğrendik?", ikon: "fidan" };
  if (sayfa.type === "gorev") return { id: "gorev", etiket: "Bugüne Taşı", ikon: "fidan" };
  if (sayfa.type === "rozet") return { id: "rozet", etiket: "Rozet Kapısı", ikon: "rozet" };
  return { id: "kapak", etiket: "Bölüm Kapısı", ikon: "kitap" };
}

function DogaSahnesi({ chapter, devamEdiyor }: { chapter: ChapterData; devamEdiyor: boolean }) {
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
      <svg className={styles.sceneRiver} viewBox="0 0 120 320" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`okuma-nehir-${chapter.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop className={styles.sceneRiverStart} offset="0" />
            <stop className={styles.sceneRiverEnd} offset="1" />
          </linearGradient>
        </defs>
        <path d="M54 0 C45 38 71 58 60 94 C48 132 83 155 74 193 C64 233 98 270 112 320 L18 320 C30 276 52 244 43 201 C35 159 59 137 46 99 C34 64 58 41 43 0 Z" />
      </svg>
      <span className={`${styles.scenePlant} ${styles.scenePlantOne}`}><Ikon ad="fidan" boyut={31} /></span>
      <span className={`${styles.scenePlant} ${styles.scenePlantTwo}`}><Ikon ad="fidan" boyut={24} /></span>
      <span className={styles.sceneCompass}><Ikon ad="harita" boyut={23} /></span>
      <div className={styles.sceneCaption}>
        <small>{devamEdiyor ? "Hikâye devam ediyor" : "Doğa · dağlar · nehir"}</small>
        <strong>{temizMetin(chapter.bolumAdi)}</strong>
        <p>{chapter.ozet}</p>
      </div>
    </div>
  );
}

function IcerikBlogu({
  block,
  kelimeId,
  acikKelime,
  onKelime,
}: {
  block: BookContentBlock;
  kelimeId: string;
  acikKelime: string | null;
  onKelime: (id: string | null) => void;
}) {
  if (block.type === "image" || block.type === "witness") return null;

  if (block.type === "interactive_word") {
    const acik = acikKelime === kelimeId;
    return (
      <div className={styles.wordBlock} data-glossary-root>
        <p className={styles.storyParagraph}>
          {block.before}
          <button type="button" className={styles.glossaryWord} aria-expanded={acik} aria-controls={`${kelimeId}-aciklama`} onClick={() => onKelime(acik ? null : kelimeId)}>
            {block.word}<Ikon ad="kitap" boyut={15} />
          </button>
          {block.after}
        </p>
        {acik ? (
          <div className={styles.wordMeaning} id={`${kelimeId}-aciklama`} role="status">
            <span><Ikon ad="kitap" boyut={18} /></span>
            <p><strong>{block.word}</strong>{block.meaning}</p>
          </div>
        ) : null}
      </div>
    );
  }

  return <p className={`${styles.storyParagraph} ${block.text.trimStart().startsWith("—") ? styles.dialogue : ""}`}>{block.text}</p>;
}

export function AtlasReader({ chapter, onProgressSync }: AtlasReaderProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pageTransitionRef = useRef<HTMLDivElement | null>(null);
  const [aktifSayfa, setAktifSayfa] = useState(0);
  const [secilen, setSecilen] = useState<DecisionOption["id"] | null>(null);
  const [kararOnayli, setKararOnayli] = useState(false);
  const [acikKelime, setAcikKelime] = useState<string | null>(null);
  const [yaziDuzeyi, setYaziDuzeyi] = useState<YaziDuzeyi>(1);
  const [araclarAcik, setAraclarAcik] = useState(false);
  const [sesCaliyor, setSesCaliyor] = useState(false);
  const [gecenSure, setGecenSure] = useState(0);
  const [toplamSure, setToplamSure] = useState(0);
  const [tekrarOkuma, setTekrarOkuma] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [kayitHatasi, setKayitHatasi] = useState<string | null>(null);
  const [gorevEkleniyor, setGorevEkleniyor] = useState(false);
  const [duyuru, setDuyuru] = useState("");

  const secimAnahtari = `sen-olsaydin-${chapter.bookKey ?? "ebubekir"}-${chapter.id}`;
  const sayfalar = useMemo(
    () => okumaSayfalariniOlustur(chapter, !chapter.decision || kararOnayli),
    [chapter, kararOnayli],
  );
  const sayfa = sayfalar[Math.min(aktifSayfa, sayfalar.length - 1)];
  const geriYolu = `/kitap/${chapter.bookKey ?? "ebubekir"}`;
  const rozetAnahtari = `${chapter.bookKey ?? "ebubekir"}-bolum-${chapter.chapterNumber ?? 1}`;
  const sonrakiBolumAdi = useMemo(() => sonrakiBolumAdiniBul(chapter), [chapter]);
  const akisId = akisBilgisi(sayfa).id;
  const sonSayfada = aktifSayfa >= sayfalar.length - 1;
  const kararSayfasinda = sayfa.type === "karar";
  const kapakSayfasinda = sayfa.type === "kapak";
  const rozetSayfasinda = sayfa.type === "rozet";
  const sesHazir = Boolean(chapter.audioUrl);
  const sonrakiKilitli = sonSayfada || kapakSayfasinda || (kararSayfasinda && !kararOnayli);

  const akisAdimlari = useMemo(() => {
    const gorulen = new Set<AkisId>();
    return sayfalar.reduce<AkisAdimi[]>((adimlar, item, index) => {
      const bilgi = akisBilgisi(item);
      if (gorulen.has(bilgi.id)) return adimlar;
      gorulen.add(bilgi.id);
      adimlar.push({ ...bilgi, sayfaIndex: index });
      return adimlar;
    }, []);
  }, [sayfalar]);

  const sayfayaGit = useCallback((index: number) => {
    const hedef = Math.min(Math.max(index, 0), sayfalar.length - 1);
    setAktifSayfa(hedef);
    setAcikKelime(null);
    setAraclarAcik(false);
    setDuyuru(`Sayfa ${hedef + 1} açıldı.`);
  }, [sayfalar.length]);

  useEffect(() => {
    const kayitli = window.sessionStorage.getItem(secimAnahtari);
    if (kayitli !== "a" && kayitli !== "b" && kayitli !== "c") return;
    const timer = window.setTimeout(() => {
      setSecilen(kayitli);
      setKararOnayli(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [secimAnahtari]);

  useEffect(() => {
    let iptal = false;
    async function kontrolEt() {
      const profileId = window.localStorage.getItem("selected_child_profile_id");
      if (!profileId) return;
      const keyword = chapter.bookKey === "adem" ? "adem" : chapter.bookKey ?? "ebubekir";
      const { data: kitaplar } = await supabase.from("books").select("id, isim");
      const kitap = kitaplar?.find((item) =>
        (item.isim ?? "").toLocaleLowerCase("tr-TR").replaceAll("â", "a").includes(keyword),
      );
      if (!kitap || iptal) return;
      const { data: progress } = await supabase
        .from("user_progress")
        .select("tamamlanan_bolum_sayisi")
        .eq("profile_id", profileId)
        .eq("book_id", kitap.id)
        .maybeSingle();
      if (!iptal && (progress?.tamamlanan_bolum_sayisi ?? 0) >= (chapter.chapterNumber ?? 1)) setTekrarOkuma(true);
    }
    void kontrolEt();
    return () => { iptal = true; };
  }, [chapter]);

  useEffect(() => {
    function disariTiklandi(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element) || target.closest("[data-glossary-root]")) return;
      setAcikKelime(null);
    }
    document.addEventListener("pointerdown", disariTiklandi);
    return () => document.removeEventListener("pointerdown", disariTiklandi);
  }, []);

  useEffect(() => {
    function tuslaGezin(event: KeyboardEvent) {
      if (event.key === "ArrowRight" && !sonrakiKilitli) sayfayaGit(aktifSayfa + 1);
      if (event.key === "ArrowLeft" && aktifSayfa > 0) sayfayaGit(aktifSayfa - 1);
      if (event.key === "Escape") setAraclarAcik(false);
    }
    window.addEventListener("keydown", tuslaGezin);
    return () => window.removeEventListener("keydown", tuslaGezin);
  }, [aktifSayfa, sayfayaGit, sonrakiKilitli]);

  useEffect(() => () => audioRef.current?.pause(), []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      pageTransitionRef.current
        ?.querySelectorAll<HTMLElement>("[data-reader-scroll]")
        .forEach((element) => element.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [sayfa.key]);

  function karariOnayla() {
    if (!secilen) return;
    window.sessionStorage.setItem(secimAnahtari, secilen);
    setKararOnayli(true);
    setDuyuru("Kararın kaydedildi. Doğru veya yanlış açıklanmadı; hikâye devam ediyor.");
  }

  function sesOynatDurdur() {
    if (!sesHazir) return;
    const ses = audioRef.current;
    if (!ses) return;
    if (sesCaliyor) ses.pause();
    else void ses.play().catch(() => setDuyuru("Sesli anlatım bu tarayıcıda başlatılamadı."));
  }

  function sesiSar(value: number) {
    if (!sesHazir || !audioRef.current || !Number.isFinite(value)) return;
    audioRef.current.currentTime = value;
    setGecenSure(value);
  }

  async function goreviListeyeEkle() {
    const gorev = chapter.gorev;
    const profileId = window.localStorage.getItem("selected_child_profile_id");
    if (gorev && profileId) {
      setGorevEkleniyor(true);
      await supabase.from("profile_tasks").upsert(
        { profile_id: profileId, task_id: gorev.id, status: "eklendi" },
        { onConflict: "profile_id,task_id", ignoreDuplicates: true },
      );
      setGorevEkleniyor(false);
    }
    sayfayaGit(aktifSayfa + 1);
  }

  async function bolumuBitir() {
    if (tekrarOkuma) {
      router.push(geriYolu);
      return;
    }
    setKayitHatasi(null);
    setKaydediliyor(true);
    const sonuc = await onProgressSync();
    if (!sonuc.ok) {
      setKaydediliyor(false);
      setKayitHatasi(sonuc.message ?? "Rozet kaydedilemedi. Lütfen tekrar dene.");
      return;
    }
    setDuyuru(`${chapter.badgeName} haritana işlendi.`);
    window.setTimeout(() => router.push(geriYolu), 1200);
  }

  function sayfayiCiz() {
    if (sayfa.type === "kapak") {
      return (
        <div className={styles.coverLayout} data-reader-scroll>
          <div className={styles.coverVisual}>
            <span className={styles.coverGlow} aria-hidden="true" />
            <YedekliGorsel src={`/kapaklar/kapak-${chapter.bookKey ?? "ebubekir"}.png`} yedekSrc="/kapaklar/placeholder.svg" alt={`${chapter.bookName ?? "Kitap"} kapağı`} width={238} height={356} className={styles.coverImage} />
          </div>
          <section className={styles.coverCopy}>
            <p className={styles.pageEyebrow}>{chapter.chapterNumber ?? 1}. Bölüm · Yolculuk Başlıyor</p>
            <h1>{temizMetin(chapter.bolumAdi)}</h1>
            <p className={styles.coverSummary}>{chapter.ozet}</p>
            <div className={styles.badgePreview}>
              <YedekliGorsel src={`/rozetler/rozet-${rozetAnahtari}.png`} yedekSrc="/rozetler/placeholder.svg" alt={`${chapter.badgeName} önizlemesi`} width={62} height={62} className={styles.badgeImage} />
              <span><small>Bu bölümün rozeti</small><strong>{chapter.badgeName}</strong></span>
            </div>
          </section>
        </div>
      );
    }

    if (sayfa.type === "okuma") {
      const devamEdiyor = sayfa.key.startsWith("devam");
      return (
        <div className={styles.storyLayout}>
          <DogaSahnesi chapter={chapter} devamEdiyor={devamEdiyor} />
          <section className={styles.textPage} data-reader-scroll>
            <div className={styles.textHeading}>
              <p className={styles.pageEyebrow}>{devamEdiyor ? "Hikâye Devam Ediyor" : "Hikâye · 1. Kısım"}</p>
              <h1>{temizMetin(chapter.bolumAdi)}</h1>
              <span>{chapter.chapterNumber ?? 1}. Bölüm · {chapter.bookName ?? "Kitap Yolculuğu"}</span>
            </div>
            <div className={styles.prose}>
              {sayfa.bloklar.map((block, index) => (
                <IcerikBlogu key={`${sayfa.key}-${index}`} block={block} kelimeId={`${sayfa.key}-kelime-${index}`} acikKelime={acikKelime} onKelime={setAcikKelime} />
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (sayfa.type === "karar" && chapter.decision) {
      return (
        <section className={styles.decisionView} data-reader-scroll>
          <div className={styles.focusIntro}>
            <span className={styles.focusIcon}><Ikon ad="dusunce" boyut={29} /></span>
            <p className={styles.pageEyebrow}>Sen Olsaydın?</p>
            <h1>{chapter.decision.question}</h1>
            <p>Kalbine en yakın seçeneği düşün. Doğru cevap şimdi açıklanmayacak.</p>
          </div>
          <div className={styles.options} role="radiogroup" aria-label="Karar seçenekleri">
            {chapter.decision.options.map((option, index) => {
              const secili = secilen === option.id;
              return (
                <button key={option.id} type="button" className={`${styles.optionButton} ${secili ? styles.optionSelected : ""}`} role="radio" aria-checked={secili} disabled={kararOnayli} onClick={() => setSecilen(option.id)}>
                  <span>{secili && kararOnayli ? <Ikon ad="onay" boyut={19} /> : index + 1}</span>
                  <strong>{option.text}</strong>
                </button>
              );
            })}
          </div>
          {kararOnayli ? <div className={styles.neutralNote} aria-live="polite"><Ikon ad="fener" boyut={21} /><p>{chapter.decision.afterChoiceNote}</p></div> : null}
        </section>
      );
    }

    if (sayfa.type === "karsilastirma") {
      const secenek = chapter.decision?.options.find((option) => option.id === secilen);
      return (
        <section className={styles.compareView} data-reader-scroll>
          <span className={styles.focusIcon}><Ikon ad="kalp" boyut={29} /></span>
          <p className={styles.pageEyebrow}>Düşünme Durağı</p>
          <h1>Seçimini Karşılaştır</h1>
          <p className={styles.focusDescription}>Hikâyenin devamını okudun. Şimdi yalnızca kendi seçimine bakalım.</p>
          {secenek && secilen ? (
            <>
              <div className={styles.chosenAnswer}><small>Senin seçimin</small><p><span>{secilen.toLocaleUpperCase("tr-TR")}</span><strong>{secenek.text}</strong></p></div>
              <div className={styles.comparisonText}><Ikon ad="fidan" boyut={24} /><p>{secenek.comparison}</p></div>
              <p className={styles.compareFootnote}>Önemli olan, hikâyenin sana düşündürdükleri.</p>
            </>
          ) : null}
        </section>
      );
    }

    if (sayfa.type === "ogrendik") {
      return (
        <section className={styles.learnedView} data-reader-scroll>
          <div className={styles.focusIntro}><span className={styles.focusIcon}><Ikon ad="fidan" boyut={30} /></span><p className={styles.pageEyebrow}>Yolculuk Defteri</p><h1>Ne Öğrendik?</h1><p>Bu bölümden yanında götüreceğin üç düşünce.</p></div>
          <ol className={styles.learnedList}>{chapter.learned.map((madde, index) => <li key={madde}><span>{index + 1}</span><p>{madde}</p></li>)}</ol>
          <div className={styles.nextHint}><Ikon ad="rozet" boyut={20} /><p>Öğrendiklerini hatırladın. Yolculuğun sıradaki durağı seni bekliyor.</p></div>
        </section>
      );
    }

    if (sayfa.type === "gorev") {
      const gorev = chapter.gorev;
      return (
        <section className={styles.taskView} data-reader-scroll>
          <span className={styles.focusIcon}><Ikon ad="fidan" boyut={30} /></span>
          <p className={styles.pageEyebrow}>Hayata Açılan Kapı</p>
          <h1>Bugüne Taşı</h1>
          <p className={styles.focusDescription}>Bu görev tamamen gönüllü; eklemesen de rozetin ve yolculuğun aynen devam eder.</p>
          <div className={styles.taskCard}>
            <div><h2>{gorev?.ad ?? "Bugünün küçük adımı"}</h2>{gorev ? <span>{gorev.kategori}</span> : null}</div>
            <p>{gorev?.aciklama ?? chapter.buguneTasi}</p>
            {gorev ? <dl><div><dt>Tahmini süre</dt><dd>{gorev.sure}</dd></div><div><dt>Tamamlanma ölçütü</dt><dd>{gorev.olcut}</dd></div></dl> : null}
            {gorev?.guvenlikNotu ? <aside><Ikon ad="kalp" boyut={17} />{gorev.guvenlikNotu}</aside> : null}
          </div>
          <div className={styles.taskActions}>
            {gorev ? <button type="button" className={`${styles.specialAction} ${styles.greenAction}`} disabled={gorevEkleniyor} onClick={goreviListeyeEkle}><Ikon ad="liste-ekle" boyut={20} />{gorevEkleniyor ? "Ekleniyor..." : "Görevi Listeme Ekle"}</button> : null}
            <button type="button" className={`${styles.inlineAction} ${styles.taskSecondaryAction}`} disabled={gorevEkleniyor} onClick={() => sayfayaGit(aktifSayfa + 1)}><Ikon ad={gorev ? "ok-sag" : "onay"} boyut={19} />{gorev ? "Şimdilik Değil" : "Görevi Anladım"}</button>
          </div>
        </section>
      );
    }

    if (sayfa.type === "tanik") {
      return (
        <section className={styles.witnessView} data-reader-scroll>
          <p className={styles.pageEyebrow}>Tanık Sayfası</p>
          <article className={styles.witnessPaper}>
            <h1>{sayfa.witnessLabel}</h1>
            <p>{sayfa.body}</p>
            <strong>— {sayfa.witnessName}</strong>
          </article>
          {sayfa.isFictional ? <div className={styles.neutralNote}><Ikon ad="dusunce" boyut={17} /><p>Bu sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir.</p></div> : null}
        </section>
      );
    }

    return (
      <section className={styles.rewardView} data-reader-scroll>
        <div className={styles.rewardGlow} aria-hidden="true" />
        <p className={styles.pageEyebrow}>Bölüm Tamamlandı</p>
        <h1>Rozet Kapısı</h1>
        <p className={styles.rewardIntro}>{tekrarOkuma ? "Bu rozeti daha önce kazanmıştın. Tekrar okumak, öğrendiklerini kalbinde büyütür." : sonrakiBolumAdi ? `Şimdi “${sonrakiBolumAdi}” bölümüne geçebilirsin.` : "Kitabın tüm bölümlerini tamamladın; Büyük Final Testi seni bekliyor."}</p>
        <div className={styles.rewardBadge}>
          <YedekliGorsel src={`/rozetler/rozet-${rozetAnahtari}.png`} yedekSrc="/rozetler/placeholder.svg" alt={chapter.badgeName} width={134} height={134} className={styles.rewardImage} />
          <strong>{chapter.badgeName}</strong>
        </div>
        <div className={styles.rewardMessage}><Ikon ad="harita" boyut={22} /><p>{tekrarOkuma ? "Rozetin haritanda duruyor; bölüm listesine güvenle dönebilirsin." : chapter.returnMessage}</p></div>
        {kayitHatasi ? <p className={styles.errorMessage} aria-live="polite">{kayitHatasi}</p> : null}
      </section>
    );
  }

  const ozelAksiyon = kapakSayfasinda
    ? { etiket: "Maceraya Başla", ikon: "yildiz" as const, sinif: styles.goldAction, disabled: false, onClick: () => sayfayaGit(1) }
    : kararSayfasinda && !kararOnayli
      ? { etiket: "Kararını Onayla", ikon: "onay" as const, sinif: styles.greenAction, disabled: !secilen, onClick: karariOnayla }
      : rozetSayfasinda
        ? { etiket: tekrarOkuma ? "Bölüm Listesine Dön" : kaydediliyor ? "Rozet Kaydediliyor..." : "Bölümü Tamamla", ikon: "rozet" as const, sinif: styles.greenAction, disabled: kaydediliyor, onClick: bolumuBitir }
        : null;

  return (
    <main className={`tema-cocuk ${styles.page} ${styles.integratedPage} ${YAZI_SINIFLARI[yaziDuzeyi]}`}>
      <div className={styles.atlasBackdrop} aria-hidden="true" />
      <div className={styles.readerShell}>
        <header className={`${styles.readerHeader} ${styles.integratedHeader}`}>
          <div className={styles.previewGroup}>
            <button className={styles.backLink} type="button" onClick={() => router.push(geriYolu)}><Ikon ad="geri" boyut={18} /> Bölüm Rotasına Dön</button>
          </div>
          <div className={styles.chapterIdentity}>
            <span className={styles.bookMark}><Ikon ad="kitap" boyut={21} /></span>
            <div><strong>{chapter.bookName ?? "Kitap"} · {chapter.chapterNumber ?? 1}. Bölüm</strong><span>{temizMetin(chapter.bolumAdi)}</span></div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.audioPlayer}>
              {chapter.audioUrl ? <audio ref={audioRef} src={chapter.audioUrl} preload="metadata" onLoadedMetadata={(event) => setToplamSure(event.currentTarget.duration)} onTimeUpdate={(event) => setGecenSure(event.currentTarget.currentTime)} onPlay={() => setSesCaliyor(true)} onPause={() => setSesCaliyor(false)} onEnded={() => { setSesCaliyor(false); setGecenSure(0); if (audioRef.current) audioRef.current.currentTime = 0; }} /> : null}
              <button type="button" className={styles.audioButton} aria-label={sesHazir ? (sesCaliyor ? "Sesli anlatımı duraklat" : "Sesli anlatımı oynat") : "Sesli anlatım kaydı daha sonra eklenecek"} aria-pressed={sesHazir ? sesCaliyor : undefined} disabled={!sesHazir} onClick={sesOynatDurdur}><Ikon ad={sesCaliyor ? "duraklat" : "oynat"} boyut={16} /></button>
              <div className={styles.audioCopy}><div><strong>Sesli anlatım</strong><span>{sureBicimle(gecenSure)} / {sureBicimle(toplamSure)}</span></div><input className={styles.audioRange} type="range" min={0} max={Math.max(1, toplamSure)} step={0.1} value={Math.min(gecenSure, Math.max(1, toplamSure))} aria-label={sesHazir ? "Sesli anlatım konumu" : "Sesli anlatım kaydı daha sonra eklenecek"} disabled={!sesHazir} onChange={(event) => sesiSar(Number(event.target.value))} /></div>
            </div>
            <button type="button" className={styles.toolsButton} aria-expanded={araclarAcik} aria-controls="okuma-araclari" onClick={() => setAraclarAcik((acik) => !acik)}><Ikon ad="menu" boyut={19} /><span>Okuma Araçları</span></button>
          </div>
        </header>

        {araclarAcik ? (
          <aside className={styles.toolsPanel} id="okuma-araclari" aria-label="Okuma araçları">
            <div className={styles.toolsHeading}><div><p>Okuma Deneyimi</p><h2>Okuma Araçları</h2></div><button type="button" aria-label="Okuma araçlarını kapat" onClick={() => setAraclarAcik(false)}><Ikon ad="kapat" boyut={20} /></button></div>
            <section className={styles.fontTools} aria-label="Yazı büyüklüğü"><div><strong>Yazı büyüklüğü</strong><span>{["Küçük", "Normal", "Büyük"][yaziDuzeyi]}</span></div><div><button type="button" aria-label="Yazıyı küçült" disabled={yaziDuzeyi === 0} onClick={() => setYaziDuzeyi((deger) => Math.max(0, deger - 1) as YaziDuzeyi)}>A−</button><button type="button" aria-label="Yazıyı büyüt" disabled={yaziDuzeyi === 2} onClick={() => setYaziDuzeyi((deger) => Math.min(2, deger + 1) as YaziDuzeyi)}>A+</button></div></section>
            <nav className={styles.flowNav} aria-label="Bölüm içi akış"><p>Bölüm içi akış</p><ol>{akisAdimlari.map((adim, index) => <li key={adim.id}><button type="button" className={akisId === adim.id ? styles.flowActive : ""} aria-current={akisId === adim.id ? "step" : undefined} onClick={() => sayfayaGit(adim.sayfaIndex)}><span>{index + 1}</span><Ikon ad={adim.ikon} boyut={18} /><strong>{adim.etiket}</strong></button></li>)}</ol></nav>
            <button type="button" className={styles.resetButton} onClick={() => { window.sessionStorage.removeItem(secimAnahtari); setSecilen(null); setKararOnayli(false); setAktifSayfa(0); setAraclarAcik(false); }}>Bölümü Baştan Aç</button>
            <p className={styles.toolsPolicy}>Yazı büyüklüğü yalnızca bu okuma ekranının görünümünü değiştirir.</p>
          </aside>
        ) : null}

        <div className={styles.readingViewport}>
          <article className={styles.bookSurface} data-page-type={sayfa.type}>
            <div ref={pageTransitionRef} className={styles.pageTransition} key={sayfa.key}>{sayfayiCiz()}</div>
          </article>
        </div>

        <nav className={styles.readerDock} aria-label="Okuma sayfası gezinmesi">
          <button type="button" className={styles.navButton} aria-label="Önceki sayfa" disabled={aktifSayfa === 0} onClick={() => sayfayaGit(aktifSayfa - 1)}><span><Ikon ad="ok-sol" boyut={18} /></span><strong>Önceki Sayfa</strong></button>
          <div className={styles.dockCenter}>
            {ozelAksiyon ? <button type="button" className={`${styles.specialAction} ${ozelAksiyon.sinif}`} disabled={ozelAksiyon.disabled} onClick={ozelAksiyon.onClick}><Ikon ad={ozelAksiyon.ikon} boyut={18} />{ozelAksiyon.etiket}</button> : (
              <div className={styles.pageProgress}><p>Sayfa {aktifSayfa + 1} / {sayfalar.length}</p><div role="progressbar" aria-label="Bölüm sayfa ilerlemesi" aria-valuemin={1} aria-valuemax={sayfalar.length} aria-valuenow={aktifSayfa + 1}>{sayfalar.map((_, index) => <span key={index} className={index <= aktifSayfa ? styles.progressDone : ""} />)}</div></div>
            )}
          </div>
          <button type="button" className={styles.navButton} aria-label="Sonraki sayfa" disabled={sonrakiKilitli} onClick={() => sayfayaGit(aktifSayfa + 1)}><strong>Sonraki Sayfa</strong><span><Ikon ad="ok-sag" boyut={18} /></span></button>
        </nav>
        <p className={styles.srOnly} aria-live="polite">{duyuru}</p>
      </div>
    </main>
  );
}
