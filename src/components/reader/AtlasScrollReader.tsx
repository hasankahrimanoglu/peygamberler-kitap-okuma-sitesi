"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { BookContentBlock } from "../../data/books";
import { sonrakiBolumuBul, type ChapterData, type DecisionOption } from "../../data/demoChapters";
import { quizConfig } from "../../data/quizzes";
import { Ikon, YedekliGorsel } from "../ui";
import { Isil } from "../cocuk/Isil";
import { dbKitabiBul } from "../../lib/child/yolculuk";
import { adimIdsi, okumaAdimlari, okumaAkisiniOlustur, type AdimId, type OkumaAkisBolumu } from "./akis";
import { AdimCubugu } from "./AdimCubugu";
import { RozetKutlamasi, type RozetDurumu } from "./RozetKutlamasi";
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
  /**
   * Yalnız tasarım önizlemesi için (`/tasarim/okuma`): verilirse rozetin daha
   * önce kazanılıp kazanılmadığı Supabase'den sorulmaz.
   */
  tekrarOkumaOnizleme?: boolean;
};

const YAZI_SINIFLARI = [styles.yaziKucuk, styles.yaziNormal, styles.yaziBuyuk] as const;
const YAZI_ADLARI = ["Küçük", "Normal", "Büyük"] as const;
const YAZI_ORNEKLERI = [styles.yaziOrnekKucuk, styles.yaziOrnekNormal, styles.yaziOrnekBuyuk] as const;

/** Çocuğun seçtiği yazı boyutu bölümden bölüme taşınır (yalnız bu cihazda). */
const YAZI_ANAHTARI = "okuma-yazi-boyutu";
/** Işıl'ın sözlük ipucu, çocuk bir kelimeye dokunana kadar görünür (3.10.5). */
const SOZLUK_IPUCU_ANAHTARI = "isil-sozluk-ipucu-goruldu";

function temizMetin(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sureBicimle(saniye: number) {
  if (!Number.isFinite(saniye) || saniye < 0) return "0:00";
  const dakika = Math.floor(saniye / 60);
  const kalan = Math.floor(saniye % 60);
  return `${dakika}:${kalan.toString().padStart(2, "0")}`;
}

/**
 * `html { scroll-behavior: smooth }` global olarak açık; programatik
 * kaydırmalarda hareket tercihine burada uyulur (globals.css'e dokunmadan).
 */
function kaydirmaDavranisi(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function depodanOku(anahtar: string) {
  try {
    return window.localStorage.getItem(anahtar);
  } catch {
    return null;
  }
}

function depoyaYaz(anahtar: string, deger: string) {
  try {
    window.localStorage.setItem(anahtar, deger);
  } catch {
    // Gizli pencere vb.: tercih yalnız bu açılışta geçerli kalır.
  }
}

/**
 * Tek bir içerik bloğunu çizer. `image` bloğu gizlenmez, metnin arasında
 * geldiği yerde çizilir (Faz 6.2).
 */
function AkisBlogu({
  block,
  blokAnahtari,
  acikKelime,
  onKelime,
  ipucu,
  gorselSirasi = 0,
}: {
  block: BookContentBlock;
  blokAnahtari: string;
  acikKelime: string | null;
  onKelime: (id: string | null) => void;
  /** Bölümün ilk sözlük kelimesinde Işıl'ın tek seferlik ipucu. */
  ipucu: boolean;
  /** Bölüm içindeki sahne görseli sırası; süslemenin yönünü seçer. */
  gorselSirasi?: number;
}) {
  if (block.type === "witness") return null;

  if (block.type === "image") {
    /*
     * Albüm fotoğrafı (KARAR 12 Eki 2026, Hasan — PROJE-MODELI 3.10.3): iki
     * köşesinden bantla yapıştırılmış düz fotoğraf. Bölüm içindeki sıraya göre
     * süsleme yatayda aynalanır (bant renkleri ve açıları yer değiştirir);
     * görselin kendisi çevrilmez. Görsel yine 16:9 .jpg üretilir.
     */
    const yon = gorselSirasi % 2 === 0 ? "sol" : "sag";
    return (
      <figure className={styles.sahne} data-yon={yon}>
        <span className={`${styles.bant} ${styles.bantSol}`} aria-hidden="true" />
        <span className={`${styles.bant} ${styles.bantSag}`} aria-hidden="true" />
        <div className={styles.fotoKagidi}>
          {/*
            `portraitSrc` BİLEREK kullanılmaz. 3:4 dikey kırpımlar, görselin metnin
            yanındaki dar panele sığdırıldığı sayfalı düzen için üretilmişti. Tek
            sütun kaydırmada görsel akışın tam genişliğinde yatay bir bant olarak
            durur.
          */}
          <YedekliGorsel
            src={block.src}
            yedekSrc={YEDEK.sahne}
            alt={block.alt}
            width={800}
            height={450}
            className={styles.sahneResmi}
          />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </div>
      </figure>
    );
  }

  if (block.type === "interactive_word") {
    const acik = acikKelime === blokAnahtari;
    return (
      <div className={styles.kelimeBlogu} data-glossary-root>
        {ipucu ? (
          <aside className={styles.isilBalonu}>
            <Isil poz="konusma" boyut={52} className={styles.isilResmi} />
            <p>Yeşil kelimelere dokun, anlamını öğren.</p>
          </aside>
        ) : null}
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
          /*
           * Anlamı Işıl getirir (REVİZE 12 Eki 2026, Hasan — PROJE-MODELI
           * 3.10.5): kelimeye dokununca uçarak kartın köşesine konar. Tanım
           * içerik verisinden gelir; Işıl kendi cümlesini eklemez.
           */
          <div className={styles.kelimeAnlami} id={`${blokAnahtari}-aciklama`} role="status">
            <span className={styles.kelimeIsil}>
              <Isil poz="konusma" boyut={92} className={styles.kelimeIsilSvg} />
            </span>
            <p className={styles.kelimeEtiketi}>
              <Ikon ad="kitap" boyut={16} />
              Kelimenin anlamı
            </p>
            <p className={styles.kelimeTanimi}>
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

/**
 * Okuma ekranı (Faz B — KARAR 12 Eki 2026, PROJE-MODELI 3.10.3).
 *
 * Zemin baştan sona krem; koyu çerçeve ve "kart içinde kart" yoktur. Gece
 * mavisi yalnız rozet anında görünür. Tam ekran bölüm kapağı yerine kısa bir
 * açılış bloğu gelir, hikâye ilk ekranda başlar. İlerleme adım çubuğundadır
 * (telefon / tablet dikey: üstte yatay; tablet yatay / masaüstü: solda sütun).
 */
export function AtlasScrollReader({
  chapter,
  onProgressSync,
  tekrarOkumaOnizleme,
}: AtlasScrollReaderProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sayfaRef = useRef<HTMLElement | null>(null);
  const ustBarRef = useRef<HTMLElement | null>(null);
  const aaDugmesiRef = useRef<HTMLButtonElement | null>(null);
  const aaPaneliRef = useRef<HTMLDivElement | null>(null);
  const cerceveRef = useRef<number | null>(null);
  const kararKaydirmaRef = useRef(false);

  const [secilen, setSecilen] = useState<DecisionOption["id"] | null>(null);
  const [kararOnayli, setKararOnayli] = useState(false);
  const [acikKelime, setAcikKelime] = useState<string | null>(null);
  const [sozlukIpucu, setSozlukIpucu] = useState(false);
  const [yaziDuzeyi, setYaziDuzeyi] = useState<YaziDuzeyi>(1);
  const [aaAcik, setAaAcik] = useState(false);
  const [sesCaliyor, setSesCaliyor] = useState(false);
  // Şerit, çocuk "Dinle"ye bir kez basınca açılır; kapatılana kadar kalır.
  const [sesSeridiAcik, setSesSeridiAcik] = useState(false);
  // Ses dosyası bulunamazsa hiçbir ses kontrolü çizilmez (PROJE-MODELI 6.5).
  const [sesBulunamadi, setSesBulunamadi] = useState(false);
  const [gecenSure, setGecenSure] = useState(0);
  const [toplamSure, setToplamSure] = useState(0);
  const [tekrarOkuma, setTekrarOkuma] = useState(Boolean(tekrarOkumaOnizleme));
  const [rozetDurumu, setRozetDurumu] = useState<RozetDurumu>("bekliyor");
  const [kayitHatasi, setKayitHatasi] = useState<string | null>(null);
  const [gorevEkleniyor, setGorevEkleniyor] = useState(false);
  const [gorevDurumu, setGorevDurumu] = useState<"acik" | "eklendi" | "ertelendi">("acik");
  const [duyuru, setDuyuru] = useState("");
  const [aktifAdim, setAktifAdim] = useState(0);
  const [adimDolulugu, setAdimDolulugu] = useState(0);
  const [enIleriAdim, setEnIleriAdim] = useState(0);
  const [rozetYaklasti, setRozetYaklasti] = useState(false);

  const bookKey = chapter.bookKey ?? "ebubekir";
  const bolumNo = chapter.chapterNumber ?? 1;
  const kararVar = Boolean(chapter.decision);
  const secimAnahtari = `sen-olsaydin-${bookKey}-${chapter.id}`;
  const sonucAcik = !kararVar || kararOnayli;
  const akis = useMemo(() => okumaAkisiniOlustur(chapter, sonucAcik), [chapter, sonucAcik]);
  const adimlar = useMemo(() => okumaAdimlari(chapter), [chapter]);
  // Ayrı bölüm rotası sayfası kalktı (3.10.7): geri dönüş haritaya, kitap açık hâlde.
  const geriYolu = `/map?kitap=${bookKey}`;
  const rozetYolu = rozetGorseli(bookKey, bolumNo);
  const sonraki = useMemo(() => sonrakiBolumuBul(chapter), [chapter]);
  const finalYolu = quizConfig[bookKey] ? `/quiz/${bookKey}` : null;
  const sesHazir = Boolean(chapter.audioUrl) && !sesBulunamadi;
  const bolumAdi = temizMetin(chapter.bolumAdi);
  const kunye = `${chapter.bookName ?? "Kitap"} · ${bolumNo}. bölüm`;
  const kutlamaDurumu: RozetDurumu = tekrarOkuma && rozetDurumu === "bekliyor" ? "onceden" : rozetDurumu;
  // Rozet alınınca son adım da onaylanır: çubukta bütün adımlar tamam görünür.
  const adimlarBitti = rozetDurumu === "alindi";

  // Işıl'ın sözlük ipucu bölümün İLK etkileşimli kelimesinde durur.
  const ilkKelimeAnahtari = useMemo(() => {
    for (const bolum of akis) {
      if (bolum.type !== "hikaye") continue;
      const sira = bolum.bloklar.findIndex((block) => block.type === "interactive_word");
      if (sira >= 0) return `${bolum.key}-${sira}`;
    }
    return null;
  }, [akis]);

  // Sahne görsellerinin bölüm içindeki sırası (süsleme sırayla aynalansın diye).
  const gorselSiralari = useMemo(() => {
    const sira = new Map<string, number>();
    for (const bolum of akis) {
      if (bolum.type !== "hikaye") continue;
      bolum.bloklar.forEach((block, index) => {
        if (block.type === "image") sira.set(`${bolum.key}-${index}`, sira.size);
      });
    }
    return sira;
  }, [akis]);

  const adimaGit = useCallback(
    (id: AdimId) => {
      const ilk = akis.find((bolum) => adimIdsi(bolum, kararVar) === id);
      const hedef = ilk
        ? sayfaRef.current?.querySelector<HTMLElement>(`[data-bolum-key="${ilk.key}"]`)
        : null;
      hedef?.scrollIntoView({ behavior: kaydirmaDavranisi(), block: "start" });
    },
    [akis, kararVar],
  );

  // --- Kalıcı tercihler: yazı boyutu, sözlük ipucu -------------------------
  useEffect(() => {
    const zamanlayici = window.setTimeout(() => {
      const kayitli = depodanOku(YAZI_ANAHTARI);
      if (kayitli === "0" || kayitli === "1" || kayitli === "2") {
        setYaziDuzeyi(Number(kayitli) as YaziDuzeyi);
      }
      setSozlukIpucu(depodanOku(SOZLUK_IPUCU_ANAHTARI) !== "1");
    }, 0);
    return () => window.clearTimeout(zamanlayici);
  }, []);

  function yaziDuzeyiSec(duzey: YaziDuzeyi) {
    setYaziDuzeyi(duzey);
    depoyaYaz(YAZI_ANAHTARI, String(duzey));
  }

  function kelimeAc(anahtar: string | null) {
    setAcikKelime(anahtar);
    if (anahtar && sozlukIpucu) {
      setSozlukIpucu(false);
      depoyaYaz(SOZLUK_IPUCU_ANAHTARI, "1");
    }
  }

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
    if (tekrarOkumaOnizleme !== undefined) return;
    let iptal = false;
    async function kontrolEt() {
      const profileId = window.localStorage.getItem("selected_child_profile_id");
      if (!profileId) return;
      // Kitap satırı `books.ts` anahtarıyla kelime kümesi üzerinden eşleşir
      // (`dbKitabiBul`): alt dize araması "ali"yi "Hz. Sâlih" içinde de bulurdu.
      const { data: kitaplar } = await supabase.from("books").select("id, isim");
      const kitap = dbKitabiBul(kitaplar ?? [], chapter.bookName ?? "", chapter.bookKey);
      if (!kitap || iptal) return;
      const { data: progress } = await supabase
        .from("user_progress")
        .select("tamamlanan_bolum_sayisi")
        .eq("profile_id", profileId)
        .eq("book_id", kitap.id)
        .maybeSingle();
      if (!iptal && (progress?.tamamlanan_bolum_sayisi ?? 0) >= bolumNo) {
        setTekrarOkuma(true);
      }
    }
    void kontrolEt();
    return () => {
      iptal = true;
    };
  }, [chapter, bolumNo, tekrarOkumaOnizleme]);

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

  // --- "Aa" paneli: Escape kapatır, odak düğmeye döner -----------------------
  const aaKapat = useCallback(() => {
    setAaAcik(false);
    aaDugmesiRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!aaAcik) return;
    aaPaneliRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
    function tuslaKapat(event: KeyboardEvent) {
      if (event.key === "Escape") aaKapat();
    }
    window.addEventListener("keydown", tuslaKapat);
    return () => window.removeEventListener("keydown", tuslaKapat);
  }, [aaAcik, aaKapat]);

  useEffect(() => () => audioRef.current?.pause(), []);

  // --- Üst barın yüksekliği: kaydırma payı ve yan sütunun yapışma çizgisi ---
  useEffect(() => {
    const bar = ustBarRef.current;
    const sayfa = sayfaRef.current;
    if (!bar || !sayfa) return;
    const gozlemci = new ResizeObserver(() => {
      sayfa.style.setProperty("--ust-yukseklik", `${bar.offsetHeight}px`);
    });
    gozlemci.observe(bar);
    return () => gozlemci.disconnect();
  }, []);

  /**
   * Tek bir rAF geçişinde etkin adım, adımın okunan payı ve rozet yaklaşımı
   * hesaplanır. Okuma çizgisi üst barın hemen altıdır: bir adımın başı bu
   * çizgiyi geçince adım etkinleşir, sonu geçince dolar.
   */
  useEffect(() => {
    function olc() {
      cerceveRef.current = null;
      const kok = sayfaRef.current;
      if (!kok) return;
      const cizgi = (ustBarRef.current?.offsetHeight ?? 0) + 24;

      const sinirlar = new Map<string, { ust: number; alt: number }>();
      kok.querySelectorAll<HTMLElement>("[data-adim]").forEach((eleman) => {
        const kutu = eleman.getBoundingClientRect();
        const id = eleman.dataset.adim ?? "";
        const sinir = sinirlar.get(id);
        if (sinir) sinir.alt = kutu.bottom;
        else sinirlar.set(id, { ust: kutu.top, alt: kutu.bottom });
      });

      let aktif = 0;
      let sonVarolan = 0;
      adimlar.forEach((adim, sira) => {
        const sinir = sinirlar.get(adim.id);
        if (!sinir) return;
        sonVarolan = sira;
        if (sinir.ust <= cizgi) aktif = sira;
      });

      let dolu = 0;
      const belge = document.documentElement;
      const sonaGeldi = window.scrollY + window.innerHeight >= belge.scrollHeight - 4;
      if (sonaGeldi && window.scrollY > 0) {
        aktif = sonVarolan;
        dolu = 1;
      } else {
        const sinir = sinirlar.get(adimlar[aktif]?.id ?? "");
        if (sinir && sinir.alt > sinir.ust) {
          dolu = Math.min(1, Math.max(0, (cizgi - sinir.ust) / (sinir.alt - sinir.ust)));
        }
      }

      setAktifAdim(aktif);
      setAdimDolulugu(Math.round(dolu * 100) / 100);
      setEnIleriAdim((onceki) => Math.max(onceki, aktif));

      // Rozetin beliriş hareketi TEK SEFERLİKTİR: eşiğin etrafında kaydırırken
      // yeniden oynamasın diye bir kez açıldıktan sonra kapanmaz.
      const rozet = sinirlar.get("rozet");
      if (rozet && rozet.ust < window.innerHeight * 0.9) setRozetYaklasti(true);
    }

    function olcumIste() {
      if (cerceveRef.current !== null) return;
      cerceveRef.current = window.requestAnimationFrame(olc);
    }

    olc();
    window.addEventListener("scroll", olcumIste, { passive: true });
    window.addEventListener("resize", olcumIste);

    // Görseller geç yüklendiğinde akışın yüksekliği değişir; yalnız scroll'u
    // dinlemek adım çubuğunu bayat bırakıyordu.
    const gozlemci = new ResizeObserver(olcumIste);
    if (sayfaRef.current) gozlemci.observe(sayfaRef.current);

    return () => {
      window.removeEventListener("scroll", olcumIste);
      window.removeEventListener("resize", olcumIste);
      gozlemci.disconnect();
      if (cerceveRef.current !== null) window.cancelAnimationFrame(cerceveRef.current);
    };
  }, [chapter.id, akis, adimlar]);

  // Karar onaylanınca açılan içeriğin başına yumuşakça in.
  useEffect(() => {
    if (!kararKaydirmaRef.current) return;
    kararKaydirmaRef.current = false;
    const hedef =
      akis.find((bolum) => adimIdsi(bolum, kararVar) === "devam") ??
      akis.find((bolum) => bolum.type === "ogrendik");
    if (!hedef) return;
    const zamanlayici = window.setTimeout(() => {
      sayfaRef.current
        ?.querySelector<HTMLElement>(`[data-bolum-key="${hedef.key}"]`)
        ?.scrollIntoView({ behavior: kaydirmaDavranisi(), block: "start" });
    }, 60);
    return () => window.clearTimeout(zamanlayici);
  }, [akis, kararVar]);

  function karariOnayla() {
    if (!secilen) return;
    window.sessionStorage.setItem(secimAnahtari, secilen);
    kararKaydirmaRef.current = true;
    setKararOnayli(true);
    setDuyuru("Seçimin kaydedildi; hikâye devam ediyor.");
  }

  function sesOynatDurdur() {
    const ses = audioRef.current;
    if (!sesHazir || !ses) return;
    if (sesCaliyor) {
      ses.pause();
      return;
    }
    setSesSeridiAcik(true);
    void ses.play().catch(() => setDuyuru("Sesli anlatım bu tarayıcıda başlatılamadı."));
  }

  function sesSeridiniKapat() {
    audioRef.current?.pause();
    setSesSeridiAcik(false);
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

  async function rozetiAl() {
    setKayitHatasi(null);
    setRozetDurumu("kaydediliyor");
    const sonuc = await onProgressSync();
    if (!sonuc.ok) {
      setRozetDurumu("hata");
      setKayitHatasi(sonuc.message ?? "Rozet kaydedilemedi. Lütfen tekrar dene.");
      return;
    }
    setRozetDurumu("alindi");
    setDuyuru(`${chapter.badgeName} senin! Bu rozet Ödüllerim'e eklendi.`);
  }

  function bolumuBastanAc() {
    window.sessionStorage.removeItem(secimAnahtari);
    setSecilen(null);
    setKararOnayli(false);
    setGorevDurumu("acik");
    setEnIleriAdim(0);
    // Bu açılışta alınan rozet artık kazanılmış sayılır.
    if (rozetDurumu === "alindi") setTekrarOkuma(true);
    setRozetDurumu("bekliyor");
    setAaAcik(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function bolumuCiz(bolum: OkumaAkisBolumu) {
    if (bolum.type === "acilis") {
      const kapak = chapter.coverIllustration;
      return (
        <header className={styles.kapakAcilis}>
          <div className={styles.kapakCerceve}>
            <YedekliGorsel
              src={kapak?.src ?? kitapKapagi(bookKey)}
              yedekSrc={kapak ? YEDEK.sahne : YEDEK.kitapKapagi}
              alt={kapak?.alt ?? `${chapter.bookName ?? "Kitap"} kapağı`}
              width={1200}
              height={675}
              className={styles.acilisResmi}
            />
            <div className={styles.kapakYazisi}>
              <p className={styles.kapakKunye}>{kunye}</p>
              <h1>{bolumAdi}</h1>
              {/* Tablet yatay ve masaüstünde rozet yan sütunda durur. */}
              <div className={`${styles.kapakRozeti} ${tekrarOkuma ? styles.rozetKazanilmis : ""}`}>
                <YedekliGorsel src={rozetYolu} yedekSrc={YEDEK.rozet} alt="" width={88} height={88} />
                <small>{tekrarOkuma ? "Bu rozeti kazandın" : "Bu bölümün rozeti"}</small>
                <strong>{chapter.badgeName}</strong>
              </div>
            </div>
          </div>
        </header>
      );
    }

    if (bolum.type === "hikaye") {
      return (
        <div className={styles.hikaye}>
          {bolum.bloklar.map((block, index) => {
            const anahtar = `${bolum.key}-${index}`;
            return (
              <AkisBlogu
                key={anahtar}
                block={block}
                blokAnahtari={anahtar}
                acikKelime={acikKelime}
                onKelime={kelimeAc}
                ipucu={sozlukIpucu && anahtar === ilkKelimeAnahtari}
                gorselSirasi={gorselSiralari.get(anahtar)}
              />
            );
          })}
        </div>
      );
    }

    if (bolum.type === "tanik") {
      return (
        <section className={styles.tanik} aria-label="Tanık Sayfası">
          <p className={styles.tanikEtiketi}>Tanık Sayfası</p>
          <article className={styles.tanikKagidi}>
            <h2>{bolum.witnessLabel}</h2>
            <p>{bolum.body}</p>
            <strong>— {bolum.witnessName}</strong>
          </article>
          {bolum.isFictional ? (
            <p className={styles.tanikNotu}>Bu sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir.</p>
          ) : null}
        </section>
      );
    }

    if (bolum.type === "karar" && chapter.decision) {
      return (
        <>
          <section className={styles.karar} aria-labelledby="karar-basligi">
            <aside className={styles.isilBalonu}>
              <Isil poz="konusma" boyut={56} className={styles.isilResmi} />
              <p>Seçimine hikâyenin sonunda birlikte bakacağız.</p>
            </aside>
            <h2 id="karar-basligi" className={styles.bolumBasligi}>
              Sen olsaydın?
            </h2>
            <p className={styles.kararSorusu}>{chapter.decision.question}</p>
            <div className={styles.secenekler} role="radiogroup" aria-labelledby="karar-basligi">
              {chapter.decision.options.map((option) => {
                const secili = secilen === option.id;
                // Şıklar her yerde A-B-C: "Senin seçimin" bölümü de aynı harfi
                // gösterir (PROJE-MODELI 3.10.4).
                const harf = option.id.toLocaleUpperCase("tr-TR");
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.secenek} ${secili ? styles.secenekSecili : ""} ${
                      kararOnayli && !secili ? styles.secenekGeri : ""
                    }`}
                    role="radio"
                    aria-checked={secili}
                    disabled={kararOnayli}
                    onClick={() => setSecilen(option.id)}
                  >
                    <span className={styles.secenekHarfi}>
                      {secili && kararOnayli ? <Ikon ad="onay" boyut={20} /> : harf}
                    </span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>
            {kararOnayli ? (
              chapter.decision.afterChoiceNote ? (
                <p className={styles.kararNotu} aria-live="polite">
                  <Ikon ad="fener" boyut={20} />
                  {chapter.decision.afterChoiceNote}
                </p>
              ) : null
            ) : (
              <button
                type="button"
                className={`${styles.buyukDugme} ${secilen ? styles.yesilDugme : styles.bekleyenDugme}`}
                disabled={!secilen}
                onClick={karariOnayla}
              >
                {secilen ? <Ikon ad="onay" boyut={20} /> : null}
                {secilen ? "Seçimim bu" : "Bir seçenek seç"}
              </button>
            )}
          </section>
          {kararOnayli ? null : (
            <p className={styles.kapiSeridi}>
              <Ikon ad="kilit" boyut={17} />
              Seçimini yapınca hikâye devam edecek.
            </p>
          )}
        </>
      );
    }

    if (bolum.type === "karsilastirma") {
      const secenek = chapter.decision?.options.find((option) => option.id === secilen);
      return (
        <section className={styles.odak} aria-labelledby="karsilastirma-basligi">
          <h2 id="karsilastirma-basligi" className={styles.bolumBasligi}>
            Senin seçimin
          </h2>
          {secenek && secilen ? (
            <>
              <p className={styles.secimOzeti}>
                <span className={styles.secenekHarfi}>{secilen.toLocaleUpperCase("tr-TR")}</span>
                <span>{secenek.text}</span>
              </p>
              <p className={styles.karsilastirmaMetni}>{secenek.comparison}</p>
              <p className={styles.dipNot}>Önemli olan, hikâyenin sana düşündürdükleri.</p>
            </>
          ) : null}
        </section>
      );
    }

    if (bolum.type === "ogrendik") {
      return (
        <section className={styles.odak} aria-labelledby="ogrendik-basligi">
          <h2 id="ogrendik-basligi" className={styles.bolumBasligi}>
            Ne öğrendik?
          </h2>
          <ol className={styles.ogrendikListesi}>
            {chapter.learned.map((madde, index) => (
              <li key={madde}>
                <span aria-hidden="true">{index + 1}</span>
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
        <section className={styles.odak} aria-labelledby="gorev-basligi">
          <h2 id="gorev-basligi" className={styles.bolumBasligi}>
            Bugüne Taşı
          </h2>
          {gorevDurumu === "acik" ? (
            <>
              <p className={styles.odakNotu}>Bu görev gönüllü; eklemesen de rozetini alırsın.</p>
              <div className={styles.gorevKarti}>
                <div className={styles.gorevBasi}>
                  <h3>{gorev?.ad ?? "Bugünün küçük adımı"}</h3>
                  {gorev ? <span>{gorev.kategori}</span> : null}
                </div>
                <p className={styles.gorevAciklamasi}>{gorev?.aciklama ?? chapter.buguneTasi}</p>
                {gorev ? (
                  <dl className={styles.gorevBilgisi}>
                    <div>
                      <dt>
                        <Ikon ad="saat" boyut={17} />
                        Süre
                      </dt>
                      <dd>{gorev.sure}</dd>
                    </div>
                    <div>
                      <dt>
                        <Ikon ad="onay" boyut={17} />
                        Ne zaman bitti sayılır?
                      </dt>
                      <dd>{gorev.olcut}</dd>
                    </div>
                  </dl>
                ) : null}
                {gorev?.guvenlikNotu ? (
                  <p className={styles.guvenlikNotu}>
                    <Ikon ad="kalp" boyut={17} />
                    {gorev.guvenlikNotu}
                  </p>
                ) : null}
              </div>
              <div className={styles.gorevEylemleri}>
                {gorev ? (
                  <button
                    type="button"
                    className={`${styles.buyukDugme} ${styles.yesilDugme}`}
                    disabled={gorevEkleniyor}
                    onClick={goreviListeyeEkle}
                  >
                    <Ikon ad="liste-ekle" boyut={20} />
                    {gorevEkleniyor ? "Ekleniyor..." : "Görevi Listeme Ekle"}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={`${styles.buyukDugme} ${styles.hayaletDugme}`}
                  disabled={gorevEkleniyor}
                  onClick={() => setGorevDurumu(gorev ? "ertelendi" : "eklendi")}
                >
                  {gorev ? "Şimdilik Değil" : "Görevi Anladım"}
                </button>
              </div>
            </>
          ) : (
            <p className={styles.gorevOzeti}>
              <Ikon ad={gorevDurumu === "eklendi" ? "onay" : "saat"} boyut={20} />
              {gorevDurumu === "eklendi"
                ? `“${gorev?.ad ?? "Görev"}” listene eklendi. Görevlerim'de seni bekliyor.`
                : `“${gorev?.ad ?? "Görev"}” şimdilik eklenmedi. Rozetin seni bekliyor.`}
            </p>
          )}
        </section>
      );
    }

    if (bolum.type === "rozet") {
      return (
        <RozetKutlamasi
          bookKey={bookKey}
          bolumNo={bolumNo}
          rozetAdi={chapter.badgeName}
          durum={kutlamaDurumu}
          hata={kayitHatasi}
          yaklasti={rozetYaklasti}
          sonraki={sonraki}
          finalYolu={finalYolu}
          madalyaAdi={`${chapter.bookName ?? "Kitap"} Yolculuk Madalyası`}
          geriYolu={geriYolu}
          onRozetiAl={rozetiAl}
        />
      );
    }

    return null;
  }

  return (
    <main
      ref={sayfaRef}
      className={`tema-cocuk ${styles.sayfa} ${YAZI_SINIFLARI[yaziDuzeyi]}`}
    >
      <header className={styles.ustBar} ref={ustBarRef}>
        <div className={styles.ustSatir}>
          <button type="button" className={styles.geriDugmesi} onClick={() => router.push(geriYolu)}>
            <Ikon ad="geri" boyut={20} />
            <span className={styles.geriMetni}>Bölümler</span>
          </button>
          <div className={styles.kimlik}>
            <strong>{bolumAdi}</strong>
            <span>{kunye}</span>
          </div>
          <div className={styles.ustEylemler}>
            {sesHazir ? (
              <button
                type="button"
                className={styles.dinleDugmesi}
                aria-pressed={sesCaliyor}
                onClick={sesOynatDurdur}
              >
                <Ikon ad={sesCaliyor ? "duraklat" : "oynat"} boyut={17} />
                <span>{sesCaliyor ? "Duraklat" : "Dinle"}</span>
              </button>
            ) : null}
            <button
              ref={aaDugmesiRef}
              type="button"
              className={styles.aaDugmesi}
              aria-expanded={aaAcik}
              aria-controls="yazi-boyutu"
              onClick={() => (aaAcik ? aaKapat() : setAaAcik(true))}
            >
              <span aria-hidden="true">Aa</span>
              <span className={styles.srOnly}>Yazı boyutu</span>
            </button>
          </div>
        </div>

        {sesHazir && sesSeridiAcik ? (
          <div className={styles.sesSeridi}>
            <button
              type="button"
              className={styles.sesSeridiDugmesi}
              aria-label={sesCaliyor ? "Sesli anlatımı duraklat" : "Sesli anlatımı sürdür"}
              onClick={sesOynatDurdur}
            >
              <Ikon ad={sesCaliyor ? "duraklat" : "oynat"} boyut={16} />
            </button>
            <span className={styles.sesSuresi}>{sureBicimle(gecenSure)}</span>
            <input
              className={styles.sesCubugu}
              type="range"
              min={0}
              max={Math.max(1, toplamSure)}
              step={0.1}
              value={Math.min(gecenSure, Math.max(1, toplamSure))}
              aria-label="Sesli anlatım konumu"
              onChange={(event) => sesiSar(Number(event.target.value))}
            />
            <span className={styles.sesSuresi}>{sureBicimle(toplamSure)}</span>
            <button
              type="button"
              className={styles.sesSeridiKapat}
              aria-label="Sesli anlatımı kapat"
              onClick={sesSeridiniKapat}
            >
              <Ikon ad="kapat" boyut={17} />
            </button>
          </div>
        ) : null}

        <AdimCubugu
          adimlar={adimlar}
          aktif={adimlarBitti ? adimlar.length : aktifAdim}
          dolu={adimDolulugu}
          enIleri={enIleriAdim}
          kapiAcik={sonucAcik}
          yon="yatay"
          onSec={adimaGit}
        />
      </header>

      {sesHazir ? (
        <audio
          ref={audioRef}
          src={chapter.audioUrl}
          preload="metadata"
          onError={() => {
            setSesCaliyor(false);
            setSesBulunamadi(true);
          }}
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

      {aaAcik ? (
        <>
          <button
            type="button"
            className={styles.aaOrtusu}
            tabIndex={-1}
            aria-label="Yazı boyutunu kapat"
            onClick={aaKapat}
          />
          <div
            ref={aaPaneliRef}
            className={styles.aaPaneli}
            id="yazi-boyutu"
            role="dialog"
            aria-label="Yazı boyutu"
          >
            <p className={styles.aaBasligi}>Yazı boyutu</p>
            <div className={styles.yaziSecici} role="group" aria-label="Yazı boyutu">
              {([0, 1, 2] as const).map((duzey) => (
                <button
                  key={duzey}
                  type="button"
                  aria-pressed={yaziDuzeyi === duzey}
                  onClick={() => yaziDuzeyiSec(duzey)}
                >
                  <span className={YAZI_ORNEKLERI[duzey]} aria-hidden="true">
                    A
                  </span>
                  <small>{YAZI_ADLARI[duzey]}</small>
                </button>
              ))}
            </div>
            <button type="button" className={styles.bastanDugmesi} onClick={bolumuBastanAc}>
              Bölümü baştan başlat
            </button>
          </div>
        </>
      ) : null}

      <div className={styles.govde}>
        <aside className={styles.yanSutun}>
          <AdimCubugu
            adimlar={adimlar}
            aktif={adimlarBitti ? adimlar.length : aktifAdim}
            dolu={adimDolulugu}
            enIleri={enIleriAdim}
            kapiAcik={sonucAcik}
            yon="dikey"
            onSec={adimaGit}
          />
          <div className={`${styles.yanRozet} ${tekrarOkuma || rozetDurumu === "alindi" ? styles.rozetKazanilmis : ""}`}>
            <YedekliGorsel src={rozetYolu} yedekSrc={YEDEK.rozet} alt="" width={104} height={104} />
            <small>{tekrarOkuma || rozetDurumu === "alindi" ? "Bu rozeti kazandın" : "Bu bölümün rozeti"}</small>
            <strong>{chapter.badgeName}</strong>
          </div>
        </aside>

        <div className={styles.akis}>
          {akis.map((bolum) => (
            <div
              key={bolum.key}
              className={styles.bolum}
              data-bolum-key={bolum.key}
              data-adim={adimIdsi(bolum, kararVar)}
              data-tur={bolum.type}
            >
              {bolumuCiz(bolum)}
            </div>
          ))}
        </div>
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {duyuru}
      </p>
    </main>
  );
}
