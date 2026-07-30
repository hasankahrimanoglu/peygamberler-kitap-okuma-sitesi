"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { Ikon, OdulIkonu, YedekliGorsel } from "../ui";
import { KesifMenusu } from "./KesifMenusu";
import { books } from "../../data/books";
import { madalyaIconKey, rozetIconKey } from "../../lib/derive";
import styles from "../../../app/tasarim/harita-yeni/harita-yeni.module.css";
import { bolgeArkaplani, kitapKapagi, YEDEK } from "../../lib/varlikYollari";

export type AtlasDurakDurumu = "completed" | "active" | "locked" | "preparing";

export type AtlasDurak = {
  id: number;
  kitapKey: string;
  ad: string;
  altBaslik: string;
  /** Keşif açıklaması — yalnız içeriği yayımlanmış kitaplarda dolu olur. */
  aciklama?: string;
  durum: AtlasDurakDurumu;
  tamamlananBolum: number;
  toplamBolum: number;
  ilerleme: number;
  madalyaKazanildi: boolean;
};

export type AtlasBolge = {
  id: string;
  sira: number;
  ad: string;
  altBaslik?: string;
  aciklama: string;
  duraklar: AtlasDurak[];
};

type AtlasHaritaProps = {
  profil: { ad: string; avatarAnahtari: string; unvan: string };
  toplamRozet: number;
  tamamlananKitap: number;
  bolgeler: AtlasBolge[];
  yukleniyor?: boolean;
  bildirim?: string | null;
};

const durumIkonu = {
  completed: "onay",
  active: "fener",
  locked: "kilit",
  preparing: "saat",
} as const;

type Nokta = { x: number; y: number };

/** Durakların yerleşeceği dikey bant — sahne yüksekliğinin yüzdesi. */
type DurakSinir = { bas: number; son: number };

/**
 * Dar ekranda durağın MADALYON MERKEZİNE göre üst ve alt payı — piksel.
 * CSS'teki mobil bloğuyla (harita-yeni.module.css @620px) AYNI olmak zorunda:
 *   üst  = madalyonun yarısı (52 / 2)
 *   alt  = madalyonun yarısı + kart boşluğu (5) + iki satıra saran ad kartı (44)
 * İki dosya ayrı olduğu için değişiklik ikisine birlikte yazılır — MOBIL_SORGU
 * ile aynı disiplin.
 */
const DAR_UST_PAY = 26;
/** Madalyonun altı ile ad kartının arası — CSS'te `.stopLabel { top }`. */
const DAR_KART_BOSLUK = 5;
/** Ad kartı ölçülemediği ilk karede kullanılan yedek alt pay (iki satırlık kart). */
const DAR_ALT_PAY = 75;
/** Başlıkla ilk madalyon ve son ad kartıyla sahne kenarı arasındaki nefes payı. */
const DAR_NEFES = 10;
/** Aynı taraftaki iki durağın birbirine değmemesi için bırakılan ayrım payı. */
const DAR_AYRIK = 3;
/** Bandın altına düşemeyeceği yüzde: altında yerleşim hesabı anlamını yitirir. */
const EN_DAR_BANT = 12;

/**
 * Durak koordinatları (PROJE-MODELI 3.7 — REVİZE 29 Temmuz 2026, Hasan).
 *
 * IZGARA KALDIRILDI. Önceki düzende bir sıradaki 2–3 kitap TAM AYNI
 * yükseklikteydi; bu haritaya tablo görüntüsü veriyor, sıra sonlarında keskin
 * dönüş üretiyor ve aynı bölge geniş ekranda 3 sütun, dar ekranda 2 sütun
 * olduğu için cihazdan cihaza başka bir şekle bürünüyordu.
 *
 * Yeni kural: kitaplar **sola-sağa dönüşümlü**, her biri bir öncekinden biraz
 * daha aşağıda. Hiçbir iki durak aynı hizada değildir, yol kesintisiz akar ve
 * bölge her cihazda aynı şekli korur — yalnız oranları değişir.
 *
 * SIĞMA HESABI (kaydırma neden gerekmiyor): dikey çakışma riski KOMŞU duraklar
 * arasında değil, AYNI TARAFTAKİ duraklar arasındadır — komşular yatayda zaten
 * ayrılmıştır. Bu yüzden dikey adım bir kartın tam boyu kadar değil YARISI
 * kadar olmak zorundadır. 6 kitap her kırılımda kaydırmasız sığar; 35 durağı
 * yedi bölgeye bölme kararı (25 Tem 2026) böylece korunur.
 *
 * BİTİŞ: eşleştirme SONDAN kurulur, yani son kitap 4, 5 ve 6 kitaplık
 * bölgelerin hepsinde SAĞDA biter. Tek yan etki, 5 kitaplık bölgenin soldan
 * değil sağdan başlamasıdır.
 */
function durakKonumlari(adet: number, dar: boolean, sinir?: DurakSinir): Nokta[] {
  if (adet < 1) return [];

  /*
    Yatay salınım GENİŞ ekranda dört duraklıktır: sağ → orta → sol → orta.
    Sadece sol-sağ dalga denendi ve bırakıldı: her ayak sahnenin tamamını kat
    ettiği için ayaklar birbirine paralel geçiyor, yol yerine üst üste binmiş
    şeritler gibi görünüyordu. Dört duraklık dalgada bir ayağın yatay yolu
    yarıya iner, eğim dengelenir.

    DAR ekranda tam tersi gerekir. Orada dikey adım ~67px'e iniyor, yani komşu
    durakların ad kartları dikeyde kaçınılmaz olarak üst üste geliyor; onları
    ayıran tek şey YATAY mesafe. Dört duraklık dalgada komşu iki durak yalnız
    bir genlik kadar ayrılıyor ve kartlar çakışıyordu. İki duraklık dalgada
    ayrım iki katına çıkar (2 × genlik) ve çakışma biter.
  */
  const salinim = dar ? [1, -1] : [1, 0, -1, 0];
  // Genlik dar ekranda daha içeride: ad kartı (116px) sahnenin dışına taşmamalı.
  const genlik = dar ? 24 : 33;
  /*
    Dikey aralık. Üst sınır sahne başlığının ALTINDAN başlar (madalyonun yarısı
    da hesaba katılır), alt sınır ad kartının tamamına yer bırakır — durak
    noktası madalyonun merkezidir, kart tamamen noktanın altına sarkar.

    Aralık, "aynı x'teki iki durak en az bir kart boyu kadar ayrı olmalı"
    kuralının izin verdiği kadar GENİŞ tutulur: dikey adım büyüdükçe ayakların
    eğimi artar ve yol daha az yatık görünür. En sıkışık kırılım tablet
    yataydır (sahne ~510px); madalyon ölçüleri oraya göre kısılmıştır.
  */
  // Geniş ekran sınırları en dar iki duruma göre kalibre edilmiştir:
  // üst sınır ALT BAŞLIĞI olan bölgelere (Rahmet Yolculuğu, Emaneti Taşıyan
  // Dört Dost — başlık bir satır uzun), alt sınır ADI İKİ SATIRA SARAN
  // kitaplara (aynı bölgeler — ad kartı bir satır uzun).
  //
  // Dar ekranda sınır SABİT DEĞİL, ölçülerek gelir (bkz. `darSinir`). Sabit
  // yüzde orada çalışmıyordu: başlık bloğu piksel cinsinden sabit yükseklikte,
  // duraklar ise sahne yüksekliğinin yüzdesi. Ekran kısaldıkça (Safari'de adres
  // çubuğu açıkken sahne 616px'ten 464px'e iniyor) duraklar yukarı kayıp
  // başlığın altına giriyordu — 700px'lik ekranda çakışma 31px ölçüldü.
  const yBas = sinir?.bas ?? (dar ? 27 : 32);
  const ySon = sinir?.son ?? (dar ? 82 : 83);

  return Array.from({ length: adet }, (_, index) => ({
    // Dalga SONDAN sayılır — son durak daima sağda biter.
    x: 50 + genlik * salinim[(adet - 1 - index) % salinim.length],
    y: adet === 1 ? (yBas + ySon) / 2 : yBas + ((ySon - yBas) * index) / (adet - 1),
  }));
}

/**
 * İki durağın ortasındaki kavis payı — PİKSEL (KARAR 29 Tem 2026 — Hasan).
 * Yol SVG'si sahnenin birebir piksel ölçüsünde çizildiği için tek değer
 * yeter; eskiden viewBox `preserveAspectRatio="none"` ile esnetildiğinden
 * yatay ve dikey pay ayrı ayrı verilmek zorundaydı.
 *
 * DURAK KONUMLARI DEĞİŞMEZ — yalnız iki durak arasındaki yol kavis yapar.
 */
const KAVIS = 26;

/**
 * İki durağın ortasına yerleşen kavis noktası. Kavis KONTROL NOKTASINA değil
 * GEOMETRİYE eklenir — bu ayrım kritik (DÜZELTME 29 Tem 2026): kontrol noktası
 * yöntemiyle her parça bağımsız kamburlaşıyor, iki parçanın birleştiği yerde
 * (yani tam durağın üstünde) teğet kırılıyor ve aşağı bakan bir V çentiği
 * oluşuyordu. Kavis noktası listeye girince eğri her yerde sürekli olur.
 *
 * Pay ayağın DİKİNE eklenir; yönü daima yukarıdır, çünkü ad kartları
 * madalyonun altında durur ve aşağı kavis onların üstünden geçerdi.
 */
function kavisNoktasi(p1: Nokta, p2: Nokta): Nokta {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const uzunluk = Math.hypot(dx, dy) || 1;
  let dikX = -dy / uzunluk;
  let dikY = dx / uzunluk;
  if (dikY > 0) {
    dikX = -dikX;
    dikY = -dikY;
  }
  return {
    x: (p1.x + p2.x) / 2 + dikX * KAVIS,
    y: (p1.y + p2.y) / 2 + dikY * KAVIS,
  };
}

/**
 * İki durak arasındaki her parçayı AYRI bir `d` olarak üretir. Parçaların ayrı
 * olması kalan yolun durak durak solmasını ve fenerin tek parçada koşmasını
 * mümkün kılar. Ek parça çizilmez — yol yine son durakta biter.
 *
 * Teğetler GENİŞLETİLMİŞ listeden (duraklar + aralarındaki kavis noktaları)
 * hesaplanır; Catmull-Rom bu listede C1-süreklidir, yani duraklarda ve
 * virajlarda kırılma olmaz. Kontrol noktası kelepçesi KALDIRILDI: kelepçe
 * eğriyi parçanın kutusuna hapsedip sıra değişimini keskin köşeye çeviriyordu.
 * Kendi üstüne kıvrılma riskini kelepçe değil, kavis noktalarının kendisi
 * önler — yön ters döndüğünde ara nokta virajı dışarı taşır.
 */
function yolParcalari(duraklar: Nokta[]): string[] {
  if (duraklar.length < 2) return [];

  const hepsi: Nokta[] = [];
  duraklar.forEach((durak, index) => {
    hepsi.push(durak);
    if (index < duraklar.length - 1) hepsi.push(kavisNoktasi(durak, duraklar[index + 1]));
  });

  const kubik = (i: number) => {
    const p0 = hepsi[i - 1] ?? hepsi[i];
    const p1 = hepsi[i];
    const p2 = hepsi[i + 1];
    const p3 = hepsi[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    return `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  };

  // Her durak parçası iki kübik parçadan oluşur: durak → kavis → durak.
  return duraklar.slice(0, -1).map((_, parca) => {
    const bas = parca * 2;
    return `M ${hepsi[bas].x} ${hepsi[bas].y} ${kubik(bas)} ${kubik(bas + 1)}`;
  });
}

/**
 * Kalan yolun solma eğrisi: sıradaki durağa giden parça en parlak, her parçada
 * bir kademe soluklaşır (KARAR 29 Tem 2026 — Hasan). Uzak duraklar kendiliğinden
 * geri plana çekilir; 6 kitaplık bölgede yol tek bir düz altın şerit olmaktan
 * çıkar.
 *
 * Alt sınır 0.40'tır ve pazarlık konusu değildir: daha aşağısında yol, sahnenin
 * aydınlık (gün batımı, yeşil vadi) bölgelerinde büsbütün kayboluyor ve harita
 * "yol" olmaktan çıkıp dağınık madalyonlara dönüşüyor — 0.26 ile denendi, alt
 * sıra tamamen okunmaz oldu. Yakın parça eski tekdüze değerden (%52) belirgin
 * biçimde parlak, uzak parça ondan bir tık soluktur; sıralama buradan doğar.
 */
const solma = (uzaklik: number) => Math.max(0.4, 0.94 * 0.78 ** uzaklik);

/** Sıradaki durağı olmayan bölgede yolun tekdüze opaklığı (bkz. `hedefVar`). */
const DURGUN_YOL = 0.5;

function oncelikliDurakId(bolge?: AtlasBolge) {
  return (
    bolge?.duraklar.find((durak) => durak.durum === "active") ??
    bolge?.duraklar.find((durak) => durak.durum === "completed") ??
    bolge?.duraklar[0]
  )?.id ?? 1;
}

function durumMetni(durak: AtlasDurak) {
  if (durak.durum === "completed") return "Tamamlandı";
  if (durak.durum === "preparing") return "Hazırlanıyor";
  if (durak.durum === "locked") return "Kilitli";
  return durak.tamamlananBolum > 0 ? "Devam Ediyor" : "Yeni Açıldı";
}

/** CSS'teki mobil bloğuyla AYNI eşik olmalı (harita-yeni.module.css @620px).
 *  Eskiden 639px'ti; 621–639px bandında JS dar yerleşim uygularken CSS
 *  masaüstü ölçülerini kullanıyor ve duraklar üst üste biniyordu. */
const MOBIL_SORGU = "(max-width: 620px)";

export function AtlasHarita({
  profil,
  toplamRozet,
  tamamlananKitap,
  bolgeler,
  yukleniyor = false,
  bildirim,
}: AtlasHaritaProps) {
  const router = useRouter();
  const [bolgeId, setBolgeId] = useState(bolgeler[0]?.id ?? "");
  const bolge = bolgeler.find((item) => item.id === bolgeId) ?? bolgeler[0];
  const [durakId, setDurakId] = useState(oncelikliDurakId(bolge));
  const [detayAcik, setDetayAcik] = useState(false);
  const [menuAcik, setMenuAcik] = useState(false);
  const sekmeSeridiRef = useRef<HTMLDivElement | null>(null);
  const [aciklamaAcik, setAciklamaAcik] = useState(false);
  // Dar ekranda salınım genliği daralır (PROJE-MODELI 3.7).
  const [dar, setDar] = useState(false);
  /*
    Yol SVG'si sahnenin BİREBİR piksel ölçüsünde çizilir (KARAR 29 Tem 2026).
    Eskiden viewBox 100×100 idi ve `preserveAspectRatio="none"` ile esniyordu;
    bunun iki bedeli vardı: kavis payı yatay ve dikeyde farklı görünüyor,
    `pathLength` + `non-scaling-stroke` birlikte çalışmadığı için fener ışığı
    tek bir ışık yerine yol boyunca tekrarlayan lekelere bölünüyordu. Birebir
    ölçüde kullanıcı birimi = ekran pikseli, ikisi de kendiliğinden düzelir.
  */
  const gozlemciRef = useRef<ResizeObserver | null>(null);
  const [sahneOlcu, setSahneOlcu] = useState({ g: 0, y: 0 });
  /*
    Callback ref, `useRef` + `useEffect([])` DEĞİL: bölge verisi eşzamansız
    geliyor, ilk render'da sahne henüz DOM'da yok. Boş bağımlılıklı bir effect
    o anda null ref görüp bir daha çalışmıyor ve yol hiç çizilmiyordu.
  */
  const sahneRef = useCallback((el: HTMLElement | null) => {
    gozlemciRef.current?.disconnect();
    gozlemciRef.current = null;
    if (!el) return;
    const gozlemci = new ResizeObserver(([kayit]) => {
      const { width, height } = kayit.contentRect;
      setSahneOlcu((onceki) =>
        Math.abs(onceki.g - width) < 1 && Math.abs(onceki.y - height) < 1
          ? onceki
          : { g: width, y: height },
      );
    });
    gozlemci.observe(el);
    gozlemciRef.current = gozlemci;
  }, []);

  /*
    Başlık bloğunun sahne içindeki ALT KENARI. Duraklar dar ekranda buradan
    aşağıda başlar. Yükseklik bölgeden bölgeye değişiyor (keşif açıklaması 2–4
    satır sürüyor), bu yüzden sabit sayı yazılamaz — ölçülür.
  */
  const baslikGozlemciRef = useRef<ResizeObserver | null>(null);
  const [baslikAlt, setBaslikAlt] = useState(0);
  const baslikRef = useCallback((el: HTMLElement | null) => {
    baslikGozlemciRef.current?.disconnect();
    baslikGozlemciRef.current = null;
    if (!el) return;
    const gozlemci = new ResizeObserver(([kayit]) => {
      const hedef = kayit.target as HTMLElement;
      // `offsetTop` CSS'teki `top` payını da katar; blok sahneye göre mutlak.
      const alt = hedef.offsetTop + hedef.offsetHeight;
      setBaslikAlt((onceki) => (Math.abs(onceki - alt) < 1 ? onceki : alt));
    });
    gozlemci.observe(el);
    baslikGozlemciRef.current = gozlemci;
  }, []);

  /*
    Ad kartı yükseklikleri. Kart metne göre bir ya da iki satır sürüyor;
    yerleşimin alt payı buna bağlı. Render sonrası okunur — kartın yüksekliği
    konumdan değil yalnız metinden ve kart genişliğinden geliyor, o yüzden
    ölçüm ile yerleşim arasında geri besleme oluşmaz.
  */
  const stopsRef = useRef<HTMLOListElement | null>(null);
  const [kartOlcu, setKartOlcu] = useState<number[]>([]);
  useEffect(() => {
    const liste = stopsRef.current;
    if (!liste) return;
    const kartlar = Array.from(
      liste.querySelectorAll<HTMLElement>(`.${styles.stopLabel}`),
    ).map((kart) => kart.offsetHeight);
    setKartOlcu((onceki) =>
      onceki.length === kartlar.length && onceki.every((v, i) => Math.abs(v - kartlar[i]) < 1)
        ? onceki
        : kartlar,
    );
  }, [bolgeId, dar, sahneOlcu.g]);

  useEffect(() => {
    const mq = window.matchMedia(MOBIL_SORGU);
    const uygula = () => setDar(mq.matches);
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

  useEffect(() => {
    const aktif = sekmeSeridiRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    aktif?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [bolgeId]);

  function bolgeSec(yeniBolgeId: string) {
    const yeniBolge = bolgeler.find((item) => item.id === yeniBolgeId);
    setBolgeId(yeniBolgeId);
    setDurakId(oncelikliDurakId(yeniBolge));
    setDetayAcik(false);
    setAciklamaAcik(false);
  }

  const seciliDurak =
    bolge?.duraklar.find((durak) => durak.id === durakId) ?? bolge?.duraklar[0];

  // Konumlar yüzde olarak hesaplanır (durak işaretçileri de yüzdeyle
  // konumlanır), yol çizimi için sahnenin pikseline çevrilir.
  /*
    Bölgenin EN UZUN ad kartı. Alt pay bununla hesaplanır; sabit sayı yazmak
    her bölgeye iki satırlık kart payı ayırıyordu ve adları tek satıra sığan
    bölgelerde (çoğu) sahne boşuna uzuyordu. Kart yüksekliği yalnız metne ve
    kart genişliğine bağlı, konuma değil — bu yüzden ölçüm yerleşimi
    beslerken döngü kurmaz.
  */
  const enBuyukKart = useMemo(() => {
    if (kartOlcu.length === 0) return 0;
    return Math.max(...kartOlcu);
  }, [kartOlcu]);
  const darAltPay = enBuyukKart > 0
    ? DAR_UST_PAY + DAR_KART_BOSLUK + enBuyukKart
    : DAR_ALT_PAY;
  /*
    Aynı taraftaki iki durak (i ve i+2) arasında gereken en küçük dikey adım.
    Dalga dar ekranda iki duraklık olduğu için çakışma riski komşuda değil bir
    atlamalı duraktadır; aradaki mesafe adımın İKİ katıdır, dolayısıyla tek
    adıma düşen alt sınır payların yarısı kadardır.

    Payların TAM yarısı yetmiyor: o değerde kart ile bir alttaki madalyon
    matematiksel olarak birbirine değiyor ve yuvarlama 1px'lik temas
    üretiyordu. `DAR_AYRIK` iki durağı görünür biçimde ayrı tutar.
  */
  const darEnKucukAdim = (DAR_UST_PAY + darAltPay) / 2 + DAR_AYRIK;

  /*
    Dar ekranın durak bandı ÖLÇÜLEREK kurulur (KARAR 31 Tem 2026 — Hasan).
    Üst sınır başlığın gerçek altından, alt sınır sahnenin gerçek dibinden
    gelir; ikisi de piksel, sonuç yüzdeye çevrilir. Böylece bant ekran
    yüksekliğiyle birlikte daralıp genişler ve çakışma her kırılımda kapanır.

    Ölçüler henüz gelmediyse (ilk render) `undefined` döner ve sabit değerler
    kullanılır — yerleşim bir kare sonra yerine oturur.
  */
  const darSinir = useMemo<DurakSinir | undefined>(() => {
    if (!dar || sahneOlcu.y <= 0 || baslikAlt <= 0) return undefined;
    const bas = ((baslikAlt + DAR_NEFES + DAR_UST_PAY) / sahneOlcu.y) * 100;
    const son = ((sahneOlcu.y - darAltPay - DAR_NEFES) / sahneOlcu.y) * 100;
    // Aşırı kısa ekranda hesap ters dönebilir; o zaman sabit banda geri dönülür.
    return son - bas < EN_DAR_BANT ? undefined : { bas, son };
  }, [dar, sahneOlcu.y, baslikAlt, darAltPay]);

  /*
    Sahnenin dar ekrandaki taban boyu: başlık + iki nefes payı + üst/alt pay +
    duraklar arasındaki en küçük adımların toplamı. Sahne yüksekliğine DEĞİL,
    yalnız başlık yüksekliğine ve kitap sayısına bağlıdır — bu yüzden `--durak-
    taban` sahneyi büyütünce hesap yeniden tetiklenmez, döngü kurulmaz.
  */
  const darTaban = useMemo(() => {
    if (!dar || baslikAlt <= 0) return 0;
    const adet = bolge?.duraklar.length ?? 0;
    if (adet < 2) return 0;
    return Math.round(
      baslikAlt + 2 * DAR_NEFES + DAR_UST_PAY + darAltPay
        + (adet - 1) * darEnKucukAdim,
    );
  }, [dar, baslikAlt, bolge, darAltPay, darEnKucukAdim]);

  const konumlar = useMemo(
    () => durakKonumlari(bolge?.duraklar.length ?? 0, dar, darSinir),
    [bolge, dar, darSinir],
  );
  const konumlarPx = useMemo(
    () => konumlar.map((n) => ({ x: (n.x / 100) * sahneOlcu.g, y: (n.y / 100) * sahneOlcu.y })),
    [konumlar, sahneOlcu],
  );
  const parcalar = useMemo(
    () => (sahneOlcu.g > 0 ? yolParcalari(konumlarPx) : []),
    [konumlarPx, sahneOlcu],
  );
  const yol = useMemo(() => parcalar.join(" "), [parcalar]);
  const tamamYol = useMemo(() => {
    const tamamlanan = bolge?.duraklar.filter((d) => d.durum === "completed").length ?? 0;
    return parcalar.slice(0, Math.max(0, tamamlanan - 1)).join(" ");
  }, [bolge, parcalar]);

  if (!bolge || !seciliDurak) return null;

  const bolgeIndex = bolgeler.findIndex((item) => item.id === bolge.id);
  const hazirDegil = seciliDurak.durum === "preparing";
  const kilitli = seciliDurak.durum === "locked";
  const aksiyon = seciliDurak.durum === "completed"
    ? "Tekrar Oku"
    : seciliDurak.tamamlananBolum > 0
      ? "Okumaya Devam Et"
      : "Yolculuğa Başla";
  /*
    Solma ve fener ışığı SIRADAKİ DURAĞA göre konumlanır. Aktif durak yoksa
    (bölgenin tamamı hazırlanıyor ya da tamamı bitmiş) ne fener çizilir ne de
    solma sıralaması kurulur: yol baştan sona TEK ve soluk bir değerde kalır.
    Yoksa hiçbir kitabın açılmadığı bir bölgede ilk parça en parlak görünür ve
    ortada olmayan bir hedefi işaret ederdi.
  */
  const aktifIndex = bolge.duraklar.findIndex((durak) => durak.durum === "active");
  const hedefVar = aktifIndex >= 0;
  const cipa = Math.max(0, aktifIndex - 1);
  const parcaOpakligi = (index: number) => (hedefVar ? solma(Math.max(0, index - cipa)) : DURGUN_YOL);
  const kalanParcalar = parcalar.map((d, index) => ({
    d,
    bas: konumlarPx[index],
    son: konumlarPx[index + 1],
    basOpaklik: parcaOpakligi(index),
    sonOpaklik: parcaOpakligi(index + 1),
    gradyanId: `yol-solma-${bolge.id}-${index}`,
  }));
  // Fener YALNIZCA aktif durağa giden parçada koşar; yolun geri kalanı durgundur.
  const fenerYolu = aktifIndex > 0 ? parcalar[aktifIndex - 1] ?? null : null;

  const kitapIcerigi = books.find((kitap) => kitap.routePrefix === seciliDurak.kitapKey);
  const bolumRozetleri = Array.from({ length: seciliDurak.toplamBolum }, (_, index) => ({
    sira: index + 1,
    ad: kitapIcerigi?.chapters[index]?.badgeName ?? `${index + 1}. Bölüm Rozeti`,
    iconKey: rozetIconKey(seciliDurak.kitapKey, index + 1),
    kazanildi: index < seciliDurak.tamamlananBolum,
  }));

  return (
    <main className={`tema-cocuk ${styles.page}`}>
      <div className={styles.atlasShell}>
        {/*
          Tek satır (KARAR 28 Tem 2026): logo HER ekranda solda. Geri butonu
          kaldırıldı — veli paneline gidiyordu, çocuk okuma ekranında yanlıştı;
          o bağlantı artık keşif menüsünün içinde. Rozet/madalya sayaçları ve
          unvan da menüye taşındı, böylece orta alan kitaplara kaldı.
        */}
        <header className={styles.explorerBar}>
          <span className={styles.previewBadge}><Ikon ad="harita" boyut={18} /> Keşif Dünyası</span>
          <div className={styles.profileGroup}>
            <span className={styles.avatar}><OdulIkonu tip="avatar" anahtar={profil.avatarAnahtari} boyut={38} alt="" /></span>
            <span className={styles.profileCopy}><strong>{profil.ad}</strong></span>
          </div>
          <button
            type="button"
            className={styles.menuButonu}
            aria-label="Keşif menüsünü aç"
            aria-expanded={menuAcik}
            onClick={() => setMenuAcik(true)}
          >
            <Ikon ad="menu" boyut={21} />
          </button>
        </header>

        <section className={styles.regionRail} aria-labelledby="regions-title">
          <div className={styles.regionIntro}>
            <span><Ikon ad="harita" boyut={20} /></span>
            <div><p id="regions-title">Keşif Bölgeleri</p><small>Yeni bir dünya seç</small></div>
          </div>
          {/*
            Mobil bölge gezinmesi (27 Tem 2026). Dar ekranda sekmeler bölge
            adlarını kesiyordu ("Bereketli Ai…"), ayrıca sayaç sahnenin altında
            durduğu için kitaplara yer kalmıyordu. Oklar buraya alındı: adlar
            tam görünür, sahnenin altı kitaplara kalır.
          */}
          <div className={styles.regionStepper}>
            <button
              type="button"
              aria-label="Önceki keşif bölgesi"
              disabled={bolgeIndex === 0}
              onClick={() => bolgeSec(bolgeler[bolgeIndex - 1].id)}
            >
              <Ikon ad="ok-sol" boyut={17} />
            </button>
            <span className={styles.regionStepperCopy} aria-live="polite">
              <small>{bolge.sira}. Bölge · {bolge.duraklar.length} Kitap</small>
              <strong>{bolge.ad}</strong>
            </span>
            <button
              type="button"
              aria-label="Sonraki keşif bölgesi"
              disabled={bolgeIndex === bolgeler.length - 1}
              onClick={() => bolgeSec(bolgeler[bolgeIndex + 1].id)}
            >
              <Ikon ad="ok-sag" boyut={17} />
            </button>
          </div>

          {/*
            Tablet ve üstü: oklar + sekme şeridi. Şerit `scroll-snap` ile
            ortalanır; komşu bölgeler kenarlardan kesik görünür, böylece devam
            ettiği anlaşılır. Sahnenin sağ üstündeki sayaç KALDIRILDI — başlık
            metni oraya doğru genişliyor ve satır sayısı düşüyor (28 Tem 2026).
          */}
          <div className={styles.regionTabsNav}>
            <button
              type="button"
              className={styles.regionNavOk}
              aria-label="Önceki keşif bölgesi"
              disabled={bolgeIndex === 0}
              onClick={() => bolgeSec(bolgeler[bolgeIndex - 1].id)}
            >
              <Ikon ad="ok-sol" boyut={18} />
            </button>
            <div className={styles.regionTabs} role="tablist" aria-label="Keşif bölgeleri" ref={sekmeSeridiRef}>
            {bolgeler.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={item.id === bolge.id}
                className={item.id === bolge.id ? styles.regionTabActive : ""}
                key={item.id}
                onClick={() => bolgeSec(item.id)}
              >
                <span>{item.sira}</span><strong>{item.ad}</strong><small>{item.duraklar.length} kitap</small>
              </button>
            ))}
            </div>
            <button
              type="button"
              className={styles.regionNavOk}
              aria-label="Sonraki keşif bölgesi"
              disabled={bolgeIndex === bolgeler.length - 1}
              onClick={() => bolgeSec(bolgeler[bolgeIndex + 1].id)}
            >
              <Ikon ad="ok-sag" boyut={18} />
            </button>
          </div>
        </section>

        <div className={styles.workspace}>
          <section
            className={styles.mapStage}
            data-region={bolge.sira}
            aria-labelledby="atlas-title"
            ref={sahneRef}
            /*
              Sahne görseli iki katmandır, CSS'te üstten alta denenir: ekran
              yönüne özel dosya → ortak yedek. Yüklenemeyen katman sessizce boş
              kalır ve alttaki görünür; eksik dosya ekranı bozmaz, JS kontrolü
              gerekmez (PROJE-MODELI 6.1). Aradaki "bölgenin yönsüz dosyası"
              katmanı 30 Tem 2026'da kaldırıldı: on dört kadraj da üretildikten
              sonra bölge başına boşa giden bir istek üretmekten başka iş
              yapmıyordu.
            */
            style={{
              "--bolge-arkaplan-dikey": bolgeArkaplani(bolge.id, "dikey"),
              "--bolge-arkaplan-yatay": bolgeArkaplani(bolge.id, "yatay"),
              /*
                Dar ekranda sahne, duraklarına gereken boyu KENDİ zorlar.
                Ekran çok kısaldığında (iPhone SE, adres çubuğu açık Safari)
                bant altı kitaplık bölgeyi taşıyamıyor ve aynı taraftaki ad
                kartı bir alttaki madalyona biniyordu. Sahne o noktada
                kısalmayı bırakır; sayfa birkaç piksel kayar — çakışmaya
                tercih edilir.
              */
              "--durak-taban": darTaban ? `${darTaban}px` : undefined,
            } as CSSProperties}
          >
            <div className={styles.mapShade} aria-hidden="true" />
            <div className={styles.mapHeading} ref={baslikRef}>
              <p>{bolge.sira}. Keşif Bölgesi · {bolge.duraklar.length} kitap</p>
              <h1 id="atlas-title">{bolge.ad}</h1>
              {bolge.altBaslik ? <strong>{bolge.altBaslik}</strong> : null}
              <span>{bolge.aciklama}</span>
            </div>
            {/*
              Yol beş katmandır, sırası önemli:
                1. kenar   — patikanın koyu dış hattı
                2. gövde   — kum rengi yol yüzeyi (TEK parça: bkz. CSS notu)
                3. tamamlanan — gövdenin yeşile boyanmış kısmı
                4. orta çizgi — parça parça, her biri kendi solma gradyanıyla
                5. fener   — yalnız sıradaki durağa giden parçada
              Orta çizgi tamamlanan katmanın ÜSTÜNDE kalır; altında kalsaydı
              yeşil boyanan kısımda akış görünmez olurdu.

              Gradyan `userSpaceOnUse` ile parçanın KENDİ iki ucuna bağlanır;
              tek bir yatay gradyan kullanılsaydı yılan düzeninde sağdan sola
              akan ayaklarda renk ters dönerdi.
            */}
            <svg
              className={styles.trail}
              viewBox={`0 0 ${sahneOlcu.g || 1} ${sahneOlcu.y || 1}`}
              aria-hidden="true"
            >
              <defs>
                {kalanParcalar.map((parca) => (
                  <linearGradient
                    key={parca.gradyanId}
                    id={parca.gradyanId}
                    className={styles.trailFade}
                    gradientUnits="userSpaceOnUse"
                    x1={parca.bas?.x ?? 0}
                    y1={parca.bas?.y ?? 0}
                    x2={parca.son?.x ?? 0}
                    y2={parca.son?.y ?? 0}
                  >
                    <stop offset="0" stopOpacity={parca.basOpaklik} />
                    <stop offset="1" stopOpacity={parca.sonOpaklik} />
                  </linearGradient>
                ))}
              </defs>
              <path className={styles.trailEdge} d={yol} />
              <path className={styles.trailRoad} d={yol} />
              {tamamYol ? <path className={styles.trailCompleted} d={tamamYol} /> : null}
              {kalanParcalar.map((parca) => (
                <path
                  key={parca.gradyanId}
                  className={styles.trailBase}
                  d={parca.d}
                  stroke={`url(#${parca.gradyanId})`}
                />
              ))}
              {fenerYolu ? <path className={styles.trailBeacon} d={fenerYolu} pathLength={100} /> : null}
            </svg>

            <ol className={styles.stops} aria-label={`${bolge.ad} kitapları`} ref={stopsRef}>
              {bolge.duraklar.map((durak, index) => (
                <li
                  className={styles.stopItem}
                  key={durak.kitapKey}
                  style={{ left: `${konumlar[index]?.x ?? 50}%`, top: `${konumlar[index]?.y ?? 50}%` }}
                >
                  <button
                    type="button"
                    className={`${styles.stopButton} ${styles[`stop_${durak.durum}`]} ${durak.id === seciliDurak.id ? styles.stopSelected : ""}`}
                    aria-pressed={durak.id === seciliDurak.id}
                    aria-label={`${index + 1}. durak: ${durak.ad} — ${durumMetni(durak)}`}
                    onClick={() => {
                      setDurakId(durak.id);
                      setDetayAcik(true);
                      // Başka kitaba geçince açıklama kapanır — panel hep aynı
                      // yükseklikte açılsın.
                      setAciklamaAcik(false);
                    }}
                  >
                    <span className={styles.marker}>
                      <YedekliGorsel
                        src={kitapKapagi(durak.kitapKey)}
                        yedekSrc={YEDEK.kitapKapagi}
                        alt=""
                        width={200}
                        height={300}
                        className={styles.markerArt}
                      />
                      <i className={styles.markerStatus} aria-hidden="true">
                        <Ikon ad={durumIkonu[durak.durum]} boyut={13} />
                      </i>
                    </span>
                    {/*
                      Kartta YALNIZ ad var (KARAR 29 Tem 2026 — Hasan). Durum
                      metni ("Tamamlandı" / "Yeni Açıldı" / "Hazırlanıyor")
                      kaldırıldı: aynı bilgiyi madalyonun üstündeki durum
                      rozeti zaten gösteriyor, kitap paneli de tekrar ediyordu.
                      Harita ferahladı, kartın dikey payı ~13px azaldı.
                      Durum bilgisi ekran okuyucuda `aria-label` içinde durur.
                    */}
                    <span className={styles.stopLabel}>
                      <strong>{durak.ad}</strong>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

              </section>

          <button
            type="button"
            className={`${styles.drawerBackdrop} ${detayAcik ? styles.drawerBackdropOpen : ""}`}
            aria-label="Kitap detayını kapat"
            onClick={() => setDetayAcik(false)}
          />

          <aside className={`${styles.bookPanel} ${detayAcik ? styles.bookPanelOpen : ""}`} aria-labelledby="selected-book-title">
            <div className={styles.drawerHeader}>
              <button type="button" onClick={() => setDetayAcik(false)}>
                <Ikon ad="geri" boyut={22} /> Haritaya Dön
              </button>
              <strong>{seciliDurak.id} / 35</strong>
            </div>
            <div className={styles.panelTopline}><span>Seçili keşif durağı</span><strong>{seciliDurak.id} / 35</strong></div>
            <div className={styles.bookHero}>
              <div className={styles.coverFrame}>
                <YedekliGorsel src={kitapKapagi(seciliDurak.kitapKey)} yedekSrc={YEDEK.kitapKapagi} alt={`${seciliDurak.ad} kitap kapağı`} width={597} height={891} className={styles.cover} />
                {kilitli ? <span className={styles.coverLock}><Ikon ad="kilit" boyut={22} /></span> : null}
              </div>
              <div className={styles.bookIdentity}>
                <span className={`${styles.statusChip} ${styles[`chip_${seciliDurak.durum}`]}`}><Ikon ad={durumIkonu[seciliDurak.durum]} boyut={15} /> {durumMetni(seciliDurak)}</span>
                <h2 id="selected-book-title">{seciliDurak.ad}</h2>
                <p>{seciliDurak.altBaslik}</p>
              </div>
            </div>
            {/*
              Açıklama YALNIZCA tablet yatayda aç/kapa bölümdür (KARAR 29 Tem
              2026 — Hasan): orada dikey alan dar, açıklama kapalıyken
              "Kazanılacak Madalya" ve ana eylem kaydırmasız görünür. Mobil,
              tablet dikey ve masaüstünde panel yeterince uzun olduğu için metin
              doğrudan yazılır.

              Buton ve metin HER ZAMAN DOM'a girer; hangisinin görüneceğine CSS
              karar verir. Metni koşullu render etseydik düz modda kapalı
              durumda hiç görünmezdi.
            */}
            {seciliDurak.aciklama ? (
              <div className={styles.aciklamaBolumu}>
                <button
                  type="button"
                  className={styles.aciklamaButonu}
                  aria-expanded={aciklamaAcik}
                  aria-controls="kitap-aciklamasi"
                  onClick={() => setAciklamaAcik((acik) => !acik)}
                >
                  <Ikon ad="kitap" boyut={17} />
                  <span>Kitap Açıklaması</span>
                  <Ikon ad={aciklamaAcik ? "ok-sol" : "ok-sag"} boyut={16} />
                </button>
                <p
                  className={`${styles.bookDescription} ${aciklamaAcik ? styles.bookDescriptionAcik : ""}`}
                  id="kitap-aciklamasi"
                >
                  {seciliDurak.aciklama}
                </p>
              </div>
            ) : null}

            {hazirDegil ? (
              <div className={styles.preparingCard}>
                <span><Ikon ad="saat" boyut={24} /></span>
                <div><strong>Bu yolculuk hazırlanıyor</strong><p>{seciliDurak.toplamBolum} bölümlük içerik tamamlandığında bu durak açılacak. Şimdilik atlas üzerinde yerini görebilirsin.</p></div>
              </div>
            ) : (
              <>
                <div className={styles.progressBlock}>
                  <div><span>Bölüm ilerlemesi</span><strong>{seciliDurak.tamamlananBolum} / {seciliDurak.toplamBolum}</strong></div>
                  <div className={styles.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={seciliDurak.ilerleme}><span style={{ width: `${seciliDurak.ilerleme}%` }} /></div>
                </div>
                <section className={styles.chapterRewards} aria-labelledby="chapter-rewards-title">
                  <div className={styles.rewardHeading}>
                    <h3 id="chapter-rewards-title">Bölüm Rozetleri</h3>
                    <strong>{seciliDurak.tamamlananBolum} / {seciliDurak.toplamBolum}</strong>
                  </div>
                  {/*
                    Varsayılan: 4 sütunlu ızgara, rozetin altında bölüm adı.
                    YALNIZCA tablet yatayda (kısa ekran) tek satıra iner ve alt
                    yazılar gizlenir — orada dikey alan dar (KARAR 29 Tem 2026).
                    Tek satırda kare boyutu `--rozet-adet` ile hesaplanır; rozet
                    sayısı kitaptan kitaba değişiyor (Âdem 8, Şît 4…).
                  */}
                  <ol style={{ "--rozet-adet": bolumRozetleri.length } as CSSProperties}>
                    {bolumRozetleri.map((rozet) => (
                      <li key={rozet.iconKey} title={`${rozet.sira}. bölüm — ${rozet.ad}`}>
                        <span>
                          <OdulIkonu tip="rozet" anahtar={rozet.iconKey} kazanildi={rozet.kazanildi} boyut={48} alt={`${rozet.sira}. bölüm rozeti`} />
                          {rozet.kazanildi ? <i><Ikon ad="onay" boyut={13} /></i> : null}
                        </span>
                        <small>{rozet.sira}. bölüm</small>
                      </li>
                    ))}
                  </ol>
                </section>
                <section className={styles.medalCard} aria-label="Kitap madalyası">
                  <span><OdulIkonu tip="madalya" anahtar={madalyaIconKey(seciliDurak.kitapKey)} kazanildi={seciliDurak.madalyaKazanildi} boyut={52} alt="" /></span>
                  <div>
                    <small>{seciliDurak.madalyaKazanildi ? "Kazanılan Madalya" : "Kazanılacak Madalya"}</small>
                    <strong>{seciliDurak.ad} Yolculuk Madalyası</strong>
                  </div>
                </section>
                {kilitli ? <div className={styles.lockNote}><Ikon ad="kilit" boyut={20} /><p>Hz. Şît yolculuğu, Hz. Âdem kitabının finalini tamamladığında açılacak.</p></div> : null}
              </>
            )}

            <div className={styles.panelSpacer} />
            {!hazirDegil && !kilitli ? (
              <button type="button" className={styles.primaryAction} onClick={() => router.push(`/kitap/${seciliDurak.kitapKey}`)}>
                <Ikon ad={seciliDurak.durum === "completed" ? "kitap" : "ok-sag"} boyut={19} /> {aksiyon}
              </button>
            ) : null}
          </aside>
        </div>

        <nav className={styles.exploreDock} aria-label="Keşif menüsü">
          <span>Keşif İskelesi</span>
          <button type="button" onClick={() => router.push("/kazanimlarim")}><Ikon ad="rozet" boyut={21} /> Kazanımlarım</button>
          <button type="button" onClick={() => router.push("/kelime-defterim")}><Ikon ad="kitap" boyut={21} /> Kelime Defterim</button>
          <button type="button" onClick={() => router.push("/gorevlerim")}><Ikon ad="fener" boyut={21} /> Görevlerim</button>
        </nav>
        {bildirim ? <p className={styles.notice} role="status">{bildirim}</p> : null}
      </div>

      <KesifMenusu
        profil={profil}
        toplamRozet={toplamRozet}
        tamamlananKitap={tamamlananKitap}
        yukleniyor={yukleniyor}
        acik={menuAcik}
        onKapat={() => setMenuAcik(false)}
      />
    </main>
  );
}
