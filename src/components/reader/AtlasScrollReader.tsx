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
  durakId,
  okumaAkisiniOlustur,
  type AkisDurakId,
  type OkumaAkisBolumu,
} from "./akis";
import styles from "./okuma-akisi.module.css";
import { kitapKapagi, rozetGorseli, YEDEK } from "../../lib/varlikYollari";

type YaziDuzeyi = 0 | 1 | 2;

type ProgressSyncResult = {
  ok: boolean;
  message?: string;
};

type AtlasScrollReaderProps = {
  chapter: ChapterData;
  onProgressSync: () => Promise<ProgressSyncResult>;
};

const YAZI_SINIFLARI = [styles.yaziKucuk, styles.yaziNormal, styles.yaziBuyuk] as const;
const YAZI_ADLARI = ["Küçük", "Normal", "Büyük"] as const;

const DURAK_BILGISI: Record<AkisDurakId, { etiket: string; ikon: IkonAdi }> = {
  kapak: { etiket: "Bölüm Kapısı", ikon: "kitap" },
  hikaye: { etiket: "Hikâye · 1. Kısım", ikon: "fener" },
  tanik: { etiket: "Tanık Sayfası", ikon: "kitap" },
  karar: { etiket: "Sen Olsaydın?", ikon: "dusunce" },
  devam: { etiket: "Hikâye Devam Ediyor", ikon: "ok-sag" },
  karsilastirma: { etiket: "Seçimini Karşılaştır", ikon: "kalp" },
  ogrendik: { etiket: "Ne Öğrendik?", ikon: "fidan" },
  gorev: { etiket: "Bugüne Taşı", ikon: "fidan" },
  rozet: { etiket: "Rozet Kapısı", ikon: "rozet" },
};

function temizMetin(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sureBicimle(saniye: number) {
  if (!Number.isFinite(saniye) || saniye < 0) return "00:00";
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  return `${dakika.toString().padStart(2, "0")}:${kalan.toString().padStart(2, "0")}`;
}

/**
 * `html { scroll-behavior: smooth }` global olarak açık; programatik
 * kaydırmalarda hareket tercihine burada uyulur (globals.css'e dokunmadan).
 */
function kaydirmaDavranisi(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/**
 * Tek bir içerik bloğunu çizer. Sayfalı okuyucudan farkı: `image` bloğu
 * gizlenmez, metnin arasında geldiği yerde çizilir (Faz 6.2).
 */
function AkisBlogu({
  block,
  blokAnahtari,
  acikKelime,
  onKelime,
}: {
  block: BookContentBlock;
  blokAnahtari: string;
  acikKelime: string | null;
  onKelime: (id: string | null) => void;
}) {
  if (block.type === "witness") return null;

  if (block.type === "image") {
    return (
      <figure className={styles.sahne}>
        {/*
          `portraitSrc` BİLEREK kullanılmaz. 3:4 dikey kırpımlar, görselin metnin
          yanındaki dar panele sığdırıldığı sayfalı düzen için üretilmişti. Tek
          sütun kaydırmada görsel akışın tam genişliğinde yatay bir bant olarak
          durur; dikey kırpımı 4:3 kutuya sokmak sahneyi gereksiz yere kesiyordu.
        */}
        <YedekliGorsel
          src={block.src}
          yedekSrc={YEDEK.sahne}
          alt={block.alt}
          width={800}
          height={600}
          className={styles.sahneResmi}
        />
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    );
  }

  if (block.type === "interactive_word") {
    const acik = acikKelime === blokAnahtari;
    return (
      <div className={styles.kelimeBlogu} data-glossary-root>
        <p className={styles.storyParagraph}>
          {block.before}
          <button
            type="button"
            className={styles.sozlukKelimesi}
            aria-expanded={acik}
            aria-controls={`${blokAnahtari}-aciklama`}
            onClick={() => onKelime(acik ? null : blokAnahtari)}
          >
            {block.word}
          </button>
          {block.after}
        </p>
        {acik ? (
          <div className={styles.kelimeAnlami} id={`${blokAnahtari}-aciklama`} role="status">
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
      } ${block.keySentence ? styles.keySentence : ""} ${block.dropCap ? styles.dropCap : ""}`}
    >
      {block.text}
    </p>
  );
}

export function AtlasScrollReader({ chapter, onProgressSync }: AtlasScrollReaderProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const akisRef = useRef<HTMLDivElement | null>(null);
  const cerceveRef = useRef<number | null>(null);
  const kararKaydirmaRef = useRef(false);

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
  const [gorevDurumu, setGorevDurumu] = useState<"acik" | "eklendi" | "ertelendi">("acik");
  const [duyuru, setDuyuru] = useState("");
  const [ilerleme, setIlerleme] = useState(0);
  const [aktifDurak, setAktifDurak] = useState<AkisDurakId>("kapak");
  const [rozetYaklasti, setRozetYaklasti] = useState(false);

  const secimAnahtari = `sen-olsaydin-${chapter.bookKey ?? "ebubekir"}-${chapter.id}`;
  const sonucAcik = !chapter.decision || kararOnayli;
  const akis = useMemo(() => okumaAkisiniOlustur(chapter, sonucAcik), [chapter, sonucAcik]);
  const geriYolu = `/kitap/${chapter.bookKey ?? "ebubekir"}`;
  const rozetYolu = rozetGorseli(chapter.bookKey ?? "ebubekir", chapter.chapterNumber ?? 1);
  const sonrakiBolumAdi = useMemo(() => sonrakiBolumAdiniBul(chapter), [chapter]);
  const sesHazir = Boolean(chapter.audioUrl);

  const duraklar = useMemo(() => {
    const gorulen = new Set<AkisDurakId>();
    return akis.reduce<{ id: AkisDurakId; etiket: string; ikon: IkonAdi; key: string }[]>(
      (liste, bolum) => {
        const id = durakId(bolum);
        if (gorulen.has(id)) return liste;
        gorulen.add(id);
        liste.push({ id, key: bolum.key, ...DURAK_BILGISI[id] });
        return liste;
      },
      [],
    );
  }, [akis]);

  const bolumeKaydir = useCallback((key: string) => {
    const hedef = akisRef.current?.querySelector<HTMLElement>(`[data-bolum-key="${key}"]`);
    if (!hedef) return false;
    hedef.scrollIntoView({ behavior: kaydirmaDavranisi(), block: "start" });
    return true;
  }, []);

  // --- Sen Olsaydın seçimi: sayfa yenilenince korunur (sessionStorage) -------
  useEffect(() => {
    const kayitli = window.sessionStorage.getItem(secimAnahtari);
    if (kayitli !== "a" && kayitli !== "b" && kayitli !== "c") return;
    const timer = window.setTimeout(() => {
      setSecilen(kayitli);
      setKararOnayli(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [secimAnahtari]);

  // --- Bu bölüm daha önce tamamlandı mı? ------------------------------------
  useEffect(() => {
    let iptal = false;
    async function kontrolEt() {
      const profileId = window.localStorage.getItem("selected_child_profile_id");
      if (!profileId) return;
      if (chapter.bookKey === "sit") {
        const tamamlanan = Number(
          window.localStorage.getItem(`pkd-demo-sit-progress-${profileId}`) ?? 0,
        );
        if (!iptal && tamamlanan >= (chapter.chapterNumber ?? 1)) setTekrarOkuma(true);
        return;
      }
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
      if (!iptal && (progress?.tamamlanan_bolum_sayisi ?? 0) >= (chapter.chapterNumber ?? 1)) {
        setTekrarOkuma(true);
      }
    }
    void kontrolEt();
    return () => {
      iptal = true;
    };
  }, [chapter]);

  // --- Sözlükçe dışına dokununca kapan --------------------------------------
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
      if (event.key === "Escape") setAraclarAcik(false);
    }
    window.addEventListener("keydown", tuslaGezin);
    return () => window.removeEventListener("keydown", tuslaGezin);
  }, []);

  useEffect(() => () => audioRef.current?.pause(), []);

  /**
   * Tek bir rAF geçişinde üç şey hesaplanır: ilerleme yüzdesi, aktif durak ve
   * okunan blok çıpası. Ayrı IntersectionObserver'lar yerine tek geçiş
   * kullanılır; akış dizisi karar kapısı açılınca değiştiği için observer
   * yeniden kurmak gereksiz iş çıkarıyordu.
   */
  useEffect(() => {
    const esik = 160;

    function olc() {
      cerceveRef.current = null;
      const belge = document.documentElement;
      const kaydirilabilir = belge.scrollHeight - window.innerHeight;
      const yuzde = kaydirilabilir > 0 ? (window.scrollY / kaydirilabilir) * 100 : 0;
      setIlerleme(Math.min(100, Math.max(0, yuzde)));

      const kok = akisRef.current;
      if (!kok) return;

      const bolumler = kok.querySelectorAll<HTMLElement>("[data-durak-id]");
      let sonDurak: AkisDurakId | null = null;
      bolumler.forEach((bolum) => {
        if (bolum.getBoundingClientRect().top <= esik) {
          sonDurak = bolum.dataset.durakId as AkisDurakId;
        }
      });
      if (sonDurak) setAktifDurak(sonDurak);

      // Kazanım hareketi TEK SEFERLİKTİR: eşiğin etrafında kaydırırken sürekli
      // yeniden oynamasın diye bir kez açıldıktan sonra kapanmaz.
      const rozet = kok.querySelector<HTMLElement>('[data-durak-id="rozet"]');
      if (rozet && rozet.getBoundingClientRect().top < window.innerHeight * 1.1) {
        setRozetYaklasti(true);
      }
    }

    function olcumIste() {
      if (cerceveRef.current !== null) return;
      cerceveRef.current = window.requestAnimationFrame(olc);
    }

    olc();
    window.addEventListener("scroll", olcumIste, { passive: true });
    window.addEventListener("resize", olcumIste);

    // Görseller geç yüklendiğinde akışın yüksekliği değişir; yalnız scroll'u
    // dinlemek ilerleme çubuğunu ve durak göstergesini bayat bırakıyordu.
    const gozlemci = new ResizeObserver(olcumIste);
    if (akisRef.current) gozlemci.observe(akisRef.current);

    return () => {
      window.removeEventListener("scroll", olcumIste);
      window.removeEventListener("resize", olcumIste);
      gozlemci.disconnect();
      if (cerceveRef.current !== null) window.cancelAnimationFrame(cerceveRef.current);
    };
  }, [chapter.id, akis]);

  // Karar onaylanınca açılan içeriğin başına yumuşakça in.
  useEffect(() => {
    if (!kararKaydirmaRef.current) return;
    kararKaydirmaRef.current = false;
    const hedef = akis.find((bolum) => durakId(bolum) === "devam") ?? akis.find((b) => b.type === "ogrendik");
    if (!hedef) return;
    const zamanlayici = window.setTimeout(() => bolumeKaydir(hedef.key), 60);
    return () => window.clearTimeout(zamanlayici);
  }, [akis, bolumeKaydir]);

  function karariOnayla() {
    if (!secilen) return;
    window.sessionStorage.setItem(secimAnahtari, secilen);
    kararKaydirmaRef.current = true;
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
    setGorevDurumu("eklendi");
    setDuyuru("Görev listene eklendi.");
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

  function bolumuBastanAc() {
    window.sessionStorage.removeItem(secimAnahtari);
    setSecilen(null);
    setKararOnayli(false);
    setGorevDurumu("acik");
    setAraclarAcik(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function bolumuCiz(bolum: OkumaAkisBolumu) {
    if (bolum.type === "kapak") {
      const kapakGorseli = chapter.coverIllustration;
      const ilkHikaye = akis.find((item) => item.type === "hikaye");
      return (
        <section className={styles.kapak}>
          {/*
            Bölüm kapısı TEK bir alandır: bölüm kimliği, rozet sözü ve çağrı
            sahnenin İÇİNDE durur (üstte kimlik + rozet, altta buton). Sahnenin
            üstünde etkileşim YOKTUR — Dokun ve Keşfet prototipi 27 Tem 2026'da
            kapatıldı (PROJE-MODELI 6.4).
          */}
          <div className={styles.kapakSahne}>
            <YedekliGorsel
              src={kapakGorseli?.src ?? kitapKapagi(chapter.bookKey ?? "ebubekir")}
              yedekSrc={kapakGorseli ? YEDEK.sahne : YEDEK.kitapKapagi}
              alt={kapakGorseli?.alt ?? `${chapter.bookName ?? "Kitap"} kapağı`}
              width={1200}
              height={900}
              className={styles.kapakResmi}
            />
            <span className={styles.kapakPerdesi} aria-hidden="true" />

            <div className={styles.kapakUst}>
              <p className={styles.bolumNisani}>
                <span aria-hidden="true" />
                {chapter.chapterNumber ?? 1}. Bölüm
                <span aria-hidden="true" />
              </p>
              <h1>{temizMetin(chapter.bolumAdi)}</h1>
              {chapter.ozet ? <p className={styles.kapakOzeti}>{chapter.ozet}</p> : null}
            </div>

            {/* Rozet sahnenin ortasında durur: kimlik üstte, çağrı altta. */}
            <div className={styles.kapakOrta}>
              <div className={styles.rozetOnizleme}>
                <span className={styles.rozetOnizlemeCercevesi}>
                  <YedekliGorsel
                    src={rozetYolu}
                    yedekSrc={YEDEK.rozet}
                    alt=""
                    width={96}
                    height={96}
                    className={styles.rozetOnizlemeGorseli}
                  />
                </span>
                <small>Kazanılacak rozet</small>
                <strong>{chapter.badgeName}</strong>
              </div>
            </div>

            <div className={styles.kapakAlt}>
              <button
                type="button"
                className={styles.kaydirmaIpucu}
                onClick={() => (ilkHikaye ? bolumeKaydir(ilkHikaye.key) : undefined)}
              >
                Maceraya Başla
                <span className={styles.asagiOk} aria-hidden="true">
                  <Ikon ad="ok-sag" boyut={19} />
                </span>
              </button>
              <p className={styles.kaydirmaNotu}>Okumak için aşağı kaydır.</p>
            </div>
          </div>
        </section>
      );
    }

    if (bolum.type === "hikaye") {
      return (
        <article className={styles.kagit}>
          <p className={styles.hikayeEtiketi}>
            {bolum.kisim === "devam" ? "Hikâye Devam Ediyor" : temizMetin(chapter.bolumAdi)}
          </p>
          <div className={styles.metinSutunu}>
            {bolum.bloklar.map((block, index) => (
              <AkisBlogu
                key={`${bolum.key}-${index}`}
                block={block}
                blokAnahtari={`${bolum.key}-${index}`}
                acikKelime={acikKelime}
                onKelime={setAcikKelime}
              />
            ))}
          </div>
        </article>
      );
    }

    if (bolum.type === "tanik") {
      return (
        <section className={styles.odakKagidi}>
          <p className={styles.ustEtiket}>Tanık Sayfası</p>
          <article className={styles.tanikKagidi}>
            <h1>{bolum.witnessLabel}</h1>
            <p>{bolum.body}</p>
            <strong>— {bolum.witnessName}</strong>
          </article>
          {bolum.isFictional ? (
            <div className={styles.notKutusu}>
              <Ikon ad="dusunce" boyut={17} />
              <p>Bu sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir.</p>
            </div>
          ) : null}
        </section>
      );
    }

    if (bolum.type === "karar" && chapter.decision) {
      return (
        <>
          <section className={styles.odakKagidi}>
            <span className={styles.odakIkonu}>
              <Ikon ad="dusunce" boyut={29} />
            </span>
            <p className={styles.ustEtiket}>Sen Olsaydın?</p>
            <h1>{chapter.decision.question}</h1>
            <p className={styles.odakAciklamasi}>
              Kalbine en yakın seçeneği düşün. Doğru cevap şimdi açıklanmayacak.
            </p>
            <div className={styles.secenekler} role="radiogroup" aria-label="Karar seçenekleri">
              {chapter.decision.options.map((option, index) => {
                const secili = secilen === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.secenekButonu} ${secili ? styles.secenekSecili : ""}`}
                    role="radio"
                    aria-checked={secili}
                    disabled={kararOnayli}
                    onClick={() => setSecilen(option.id)}
                  >
                    <span>{secili && kararOnayli ? <Ikon ad="onay" boyut={19} /> : index + 1}</span>
                    <strong>{option.text}</strong>
                  </button>
                );
              })}
            </div>
            {kararOnayli ? (
              <div className={styles.notKutusu} aria-live="polite">
                <Ikon ad="fener" boyut={21} />
                <p>{chapter.decision.afterChoiceNote}</p>
              </div>
            ) : (
              <button
                type="button"
                className={`${styles.anaEylem} ${styles.yesilEylem}`}
                disabled={!secilen}
                onClick={karariOnayla}
              >
                <Ikon ad="onay" boyut={18} />
                Kararını Onayla
              </button>
            )}
          </section>
          {kararOnayli ? null : (
            <p className={styles.kapiSeridi}>
              <Ikon ad="kilit" boyut={18} />
              Kararını onayladığında hikâyenin devamı açılacak.
            </p>
          )}
        </>
      );
    }

    if (bolum.type === "karsilastirma") {
      const secenek = chapter.decision?.options.find((option) => option.id === secilen);
      return (
        <section className={styles.odakKagidi}>
          <span className={styles.odakIkonu}>
            <Ikon ad="kalp" boyut={29} />
          </span>
          <p className={styles.ustEtiket}>Düşünme Durağı</p>
          <h1>Seçimini Karşılaştır</h1>
          <p className={styles.odakAciklamasi}>
            Hikâyenin devamını okudun. Şimdi yalnızca kendi seçimine bakalım.
          </p>
          {secenek && secilen ? (
            <>
              <div className={styles.secilenCevap}>
                <small>Senin seçimin</small>
                <p>
                  <span>{secilen.toLocaleUpperCase("tr-TR")}</span>
                  <strong>{secenek.text}</strong>
                </p>
              </div>
              <div className={styles.karsilastirmaMetni}>
                <Ikon ad="fidan" boyut={24} />
                <p>{secenek.comparison}</p>
              </div>
              <p className={styles.dipNot}>Önemli olan, hikâyenin sana düşündürdükleri.</p>
            </>
          ) : null}
        </section>
      );
    }

    if (bolum.type === "ogrendik") {
      return (
        <section className={styles.odakKagidi}>
          <span className={styles.odakIkonu}>
            <Ikon ad="fidan" boyut={30} />
          </span>
          <p className={styles.ustEtiket}>Yolculuk Defteri</p>
          <h1>Ne Öğrendik?</h1>
          <p className={styles.odakAciklamasi}>Bu bölümden yanında götüreceğin üç düşünce.</p>
          <ol className={styles.ogrendikListesi}>
            {chapter.learned.map((madde, index) => (
              <li key={madde}>
                <span>{index + 1}</span>
                <p>{madde}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    }

    if (bolum.type === "gorev") {
      const gorev = chapter.gorev;
      return (
        <section className={styles.odakKagidi}>
          <span className={styles.odakIkonu}>
            <Ikon ad="fidan" boyut={30} />
          </span>
          <p className={styles.ustEtiket}>Hayata Açılan Kapı</p>
          <h1>Bugüne Taşı</h1>
          {gorevDurumu === "acik" ? (
            <>
              <p className={styles.odakAciklamasi}>
                Bu görev tamamen gönüllü; eklemesen de rozetin ve yolculuğun aynen devam eder.
              </p>
              <div className={styles.gorevKarti}>
                <div>
                  <h2>{gorev?.ad ?? "Bugünün küçük adımı"}</h2>
                  {gorev ? <span>{gorev.kategori}</span> : null}
                </div>
                <p>{gorev?.aciklama ?? chapter.buguneTasi}</p>
                {gorev ? (
                  <dl>
                    <div>
                      <dt>Tahmini süre</dt>
                      <dd>{gorev.sure}</dd>
                    </div>
                    <div>
                      <dt>Tamamlanma ölçütü</dt>
                      <dd>{gorev.olcut}</dd>
                    </div>
                  </dl>
                ) : null}
                {gorev?.guvenlikNotu ? (
                  <aside>
                    <Ikon ad="kalp" boyut={17} />
                    {gorev.guvenlikNotu}
                  </aside>
                ) : null}
              </div>
              <div className={styles.gorevEylemleri}>
                {gorev ? (
                  <button
                    type="button"
                    className={`${styles.anaEylem} ${styles.yesilEylem}`}
                    disabled={gorevEkleniyor}
                    onClick={goreviListeyeEkle}
                  >
                    <Ikon ad="liste-ekle" boyut={20} />
                    {gorevEkleniyor ? "Ekleniyor..." : "Görevi Listeme Ekle"}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={`${styles.anaEylem} ${styles.hayaletEylem}`}
                  disabled={gorevEkleniyor}
                  onClick={() => setGorevDurumu(gorev ? "ertelendi" : "eklendi")}
                >
                  <Ikon ad={gorev ? "ok-sag" : "onay"} boyut={19} />
                  {gorev ? "Şimdilik Değil" : "Görevi Anladım"}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.gorevOzeti}>
              <Ikon ad={gorevDurumu === "eklendi" ? "onay" : "saat"} boyut={20} />
              <span>
                {gorevDurumu === "eklendi"
                  ? `“${gorev?.ad ?? "Görev"}” listene eklendi. Görevlerim ekranından takip edebilirsin.`
                  : `“${gorev?.ad ?? "Görev"}” şimdilik eklenmedi. Yolculuğun aynen devam ediyor.`}
              </span>
            </div>
          )}
        </section>
      );
    }

    return (
      <section
        className={`${styles.odakKagidi} ${styles.rozetKapisi} ${
          rozetYaklasti ? styles.rozetYaklasti : ""
        }`}
      >
        <span className={styles.rozetIsigi} aria-hidden="true" />
        <p className={styles.ustEtiket}>Bölüm Tamamlandı</p>
        <h1>Rozet Kapısı</h1>
        <p className={styles.odakAciklamasi}>
          {tekrarOkuma
            ? "Bu rozeti daha önce kazanmıştın. Tekrar okumak, öğrendiklerini kalbinde büyütür."
            : sonrakiBolumAdi
              ? `Şimdi “${sonrakiBolumAdi}” bölümüne geçebilirsin.`
              : "Kitabın tüm bölümlerini tamamladın; Büyük Final Testi seni bekliyor."}
        </p>
        <div className={styles.rozetGovdesi}>
          <span className={styles.rozetHalesi}>
            <YedekliGorsel
              src={rozetYolu}
              yedekSrc={YEDEK.rozet}
              alt={chapter.badgeName}
              width={120}
              height={120}
              className={styles.rozetResmi}
            />
          </span>
          <strong>{chapter.badgeName}</strong>
        </div>
        <div className={styles.rozetMesaji}>
          <Ikon ad="harita" boyut={22} />
          <p>
            {tekrarOkuma
              ? "Rozetin haritanda duruyor; bölüm listesine güvenle dönebilirsin."
              : chapter.returnMessage}
          </p>
        </div>
        {kayitHatasi ? (
          <p className={styles.hataMesaji} aria-live="polite">
            {kayitHatasi}
          </p>
        ) : null}
        <button
          type="button"
          className={`${styles.anaEylem} ${styles.yesilEylem}`}
          disabled={kaydediliyor}
          onClick={bolumuBitir}
        >
          <Ikon ad="rozet" boyut={18} />
          {tekrarOkuma
            ? "Bölüm Listesine Dön"
            : kaydediliyor
              ? "Rozet Kaydediliyor..."
              : "Bölümü Tamamla"}
        </button>
      </section>
    );
  }

  return (
    <main className={`tema-cocuk ${styles.sayfa} ${YAZI_SINIFLARI[yaziDuzeyi]}`}>
      <header className={styles.ustBar}>
        <div className={styles.ustBarIc}>
          <button
            type="button"
            className={styles.geriBaglantisi}
            onClick={() => router.push(geriYolu)}
          >
            <Ikon ad="geri" boyut={18} />
            <span>Bölüm Rotasına Dön</span>
          </button>
          <div className={styles.bolumKimligi}>
            <strong>{temizMetin(chapter.bolumAdi)}</strong>
            <span className={styles.aktifDurak}>
              <Ikon ad={DURAK_BILGISI[aktifDurak].ikon} boyut={14} />
              {DURAK_BILGISI[aktifDurak].etiket}
            </span>
          </div>
          <div className={styles.ustBarEylemler}>
            <div className={styles.sesKutusu}>
              {chapter.audioUrl ? (
                <audio
                  ref={audioRef}
                  src={chapter.audioUrl}
                  preload="metadata"
                  onLoadedMetadata={(event) => setToplamSure(event.currentTarget.duration)}
                  onTimeUpdate={(event) => setGecenSure(event.currentTarget.currentTime)}
                  onPlay={() => setSesCaliyor(true)}
                  onPause={() => setSesCaliyor(false)}
                  onEnded={() => {
                    setSesCaliyor(false);
                    setGecenSure(0);
                    if (audioRef.current) audioRef.current.currentTime = 0;
                  }}
                />
              ) : null}
              <button
                type="button"
                className={styles.sesButonu}
                aria-label={
                  sesHazir
                    ? sesCaliyor
                      ? "Sesli anlatımı duraklat"
                      : "Sesli anlatımı oynat"
                    : "Sesli anlatım kaydı daha sonra eklenecek"
                }
                aria-pressed={sesHazir ? sesCaliyor : undefined}
                disabled={!sesHazir}
                onClick={sesOynatDurdur}
              >
                <Ikon ad={sesCaliyor ? "duraklat" : "oynat"} boyut={16} />
              </button>
              <div className={styles.sesMetni}>
                <div>
                  <strong>Sesli anlatım</strong>
                  <span>
                    {sureBicimle(gecenSure)} / {sureBicimle(toplamSure)}
                  </span>
                </div>
                <input
                  className={styles.sesCubugu}
                  type="range"
                  min={0}
                  max={Math.max(1, toplamSure)}
                  step={0.1}
                  value={Math.min(gecenSure, Math.max(1, toplamSure))}
                  aria-label={
                    sesHazir ? "Sesli anlatım konumu" : "Sesli anlatım kaydı daha sonra eklenecek"
                  }
                  disabled={!sesHazir}
                  onChange={(event) => sesiSar(Number(event.target.value))}
                />
              </div>
            </div>
            <button
              type="button"
              className={styles.araclarButonu}
              aria-expanded={araclarAcik}
              aria-controls="okuma-araclari"
              onClick={() => setAraclarAcik((acik) => !acik)}
            >
              <Ikon ad="menu" boyut={19} />
              <span>Okuma Araçları</span>
            </button>
          </div>
        </div>
        <div className={styles.ilerlemeYolu}>
          <div
            className={styles.ilerlemeDolgusu}
            style={{ width: `${ilerleme}%` }}
            role="progressbar"
            aria-label="Bölüm okuma ilerlemesi"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(ilerleme)}
          />
        </div>
      </header>

      {araclarAcik ? (
        <aside className={styles.araclarPaneli} id="okuma-araclari" aria-label="Okuma araçları">
          <div className={styles.araclarBasligi}>
            <div>
              <p>Okuma Deneyimi</p>
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
          <section className={styles.yaziAraclari} aria-label="Yazı büyüklüğü">
            <div>
              <strong>Yazı büyüklüğü</strong>
              <span>{YAZI_ADLARI[yaziDuzeyi]}</span>
            </div>
            <div>
              <button
                type="button"
                aria-label="Yazıyı küçült"
                disabled={yaziDuzeyi === 0}
                onClick={() => setYaziDuzeyi((deger) => Math.max(0, deger - 1) as YaziDuzeyi)}
              >
                A−
              </button>
              <button
                type="button"
                aria-label="Yazıyı büyüt"
                disabled={yaziDuzeyi === 2}
                onClick={() => setYaziDuzeyi((deger) => Math.min(2, deger + 1) as YaziDuzeyi)}
              >
                A+
              </button>
            </div>
          </section>
          <nav className={styles.durakNav} aria-label="Bölüm içi akış">
            <p>Bölüm içi akış</p>
            <ol>
              {duraklar.map((durak, index) => (
                <li key={durak.id}>
                  <button
                    type="button"
                    className={aktifDurak === durak.id ? styles.durakAktif : ""}
                    aria-current={aktifDurak === durak.id ? "step" : undefined}
                    onClick={() => {
                      bolumeKaydir(durak.key);
                      setAraclarAcik(false);
                    }}
                  >
                    <span>{index + 1}</span>
                    <Ikon ad={durak.ikon} boyut={18} />
                    <strong>{durak.etiket}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <button type="button" className={styles.sifirlaButonu} onClick={bolumuBastanAc}>
            Bölümü Baştan Aç
          </button>
          <p className={styles.araclarNotu}>
            Yazı büyüklüğü yalnızca bu okuma ekranının görünümünü değiştirir.
          </p>
        </aside>
      ) : null}

      <div className={styles.akis} ref={akisRef}>
        {akis.map((bolum) => (
          <div
            key={bolum.key}
            className={styles.bolum}
            data-bolum-key={bolum.key}
            data-durak-id={durakId(bolum)}
          >
            {bolumuCiz(bolum)}
          </div>
        ))}
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {duyuru}
      </p>
    </main>
  );
}
