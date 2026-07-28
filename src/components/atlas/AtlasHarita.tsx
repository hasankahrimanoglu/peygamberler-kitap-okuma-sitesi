"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { Ikon, OdulIkonu, YedekliGorsel } from "../ui";
import { KesifMenusu } from "./KesifMenusu";
import { books } from "../../data/books";
import { madalyaIconKey, rozetIconKey } from "../../lib/derive";
import styles from "../../../app/tasarim/harita-yeni/harita-yeni.module.css";
import { kitapKapagi, YEDEK } from "../../lib/varlikYollari";

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

/**
 * Durak koordinatları (PROJE-MODELI 3.7 — REVİZE 25 Tem 2026).
 * Her SIRA kendi içinde tam genişliğe yayılır; sırada tek kitap kalsa da denge
 * bozulmaz. Sıralar yılan düzeninde bağlanır. Konumlar hesaplanır — eskiden
 * 24 ayrı CSS kuralında elle yazılıydı ve kitap sayısına göre istisna isterdi.
 */
function durakKonumlari(adet: number, dar: boolean): Nokta[] {
  // Dar ekranda en fazla 2 sütun: 3 sütunda ad etiketleri yan yana sığmıyor.
  const enCokSutun = dar ? 2 : 3;
  const sutun = Math.min(enCokSutun, adet <= 3 ? adet : Math.ceil(adet / 2));
  const sira = Math.ceil(adet / sutun);

  // Duraklar sahne başlığının ALTINDAN başlar. Dar ekranda başlık ve bölge
  // açıklaması daha çok satıra yayıldığı için başlangıç aşağı çekilir; alt
  // sınır da yukarı alınır, çünkü Keşif İskelesi `sticky` olarak altta durur.
  const xBas = dar ? 27 : 16;
  const xSon = dar ? 73 : 84;
  // Dar ekranda sıra aralığı GENİŞ tutulur: işaretçi (60px) + iki satırlık ad
  // etiketi (~38px) bir sonraki işaretçinin üstüne biniyordu (27 Tem 2026).
  // Geniş ekranda başlangıç aşağı çekildi: Rahmet Yolculuğu ve Emaneti Taşıyan
  // Dört Dost bölgelerinde başlıkta fazladan bir alt başlık satırı var ve ilk
  // sıra madalyonları o metnin üstüne biniyordu (28 Tem 2026).
  // Alt sınır 29 Tem 2026'da 86'dan 80'e indi: durak noktası artık madalyon +
  // etiket bloğunun değil MADALYONUN merkezidir, yani etiketin tamamı noktanın
  // altına sarkar. Eski değerde 1024×768 tablet yatayda (sahne 510px) alt sıranın
  // ad etiketi sahnenin dekoratif iç çerçevesine giriyordu. Dar ekranda sahne
  // uzun olduğu için 84 hâlâ rahat.
  // Üst sınır da 43'ten 40'a alındı: madalyonlar noktaya göre ~30px aşağı
  // kaydığı için başlıkla ilk sıra arasındaki boşluk gereğinden çok açılmıştı.
  // 28 Tem'de eklenen "başlık metnine binmesin" payı bu kaymayla zaten fazlasıyla
  // karşılanıyor (tablet yatayda ölçülen pay 65px → 50px).
  const yBas = sira === 1 ? 60 : dar ? 36 : 40;
  const ySon = dar ? 84 : 80;

  const noktalar: Nokta[] = [];
  for (let s = 0; s < sira; s += 1) {
    const satirAdedi = Math.min(sutun, adet - s * sutun);
    const y = sira === 1 ? yBas : yBas + ((ySon - yBas) * s) / (sira - 1);

    const xler: number[] = [];
    for (let i = 0; i < satirAdedi; i += 1) {
      xler.push(
        satirAdedi === 1 ? (xBas + xSon) / 2 : xBas + ((xSon - xBas) * i) / (satirAdedi - 1),
      );
    }
    // Tek numaralı sıralar ters akar — yol kesintisiz devam eder.
    if (s % 2 === 1) xler.reverse();
    xler.forEach((x) => noktalar.push({ x, y }));
  }
  return noktalar.slice(0, adet);
}

/**
 * İki durağın ortasındaki kavis payı (KARAR 29 Tem 2026 — Hasan). viewBox
 * 100×100 `preserveAspectRatio="none"` ile esnetildiği için yatay ve dikey pay
 * AYRI verilir; tek değer kullanılsaydı geniş ekranda yatay yay dikeyin iki
 * katı görünürdü.
 *
 * DURAK KONUMLARI DEĞİŞMEZ — yalnız iki durak arasındaki yol kavis yapar.
 */
const KAVIS_Y = 3;
const KAVIS_X = 5;

/**
 * İki durağın ortasına yerleşen kavis noktası. Kavis KONTROL NOKTASINA değil
 * GEOMETRİYE eklenir — bu ayrım kritik (DÜZELTME 29 Tem 2026): kontrol noktası
 * yöntemiyle her parça bağımsız kamburlaşıyor, iki parçanın birleştiği yerde
 * (yani tam durağın üstünde) teğet kırılıyor ve aşağı bakan bir V çentiği
 * oluşuyordu. Kavis noktası listeye girince eğri her yerde sürekli olur.
 */
function kavisNoktasi(p1: Nokta, p2: Nokta): Nokta {
  const orta = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  // Sıra içi parça: yukarı doğru yumuşak bir tepe. Aşağı olamaz — ad etiketleri
  // madalyonun altında durur.
  if (Math.abs(p2.y - p1.y) < Math.abs(p2.x - p1.x)) {
    return { x: orta.x, y: orta.y - KAVIS_Y };
  }
  // Sıra değişimi: dik iniş yerine dışa doğru geniş bir viraj.
  return { x: orta.x + (orta.x >= 50 ? KAVIS_X : -KAVIS_X), y: orta.y };
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
  // Dar ekranda durak yerleşimi iki sütuna iner (PROJE-MODELI 3.7).
  const [dar, setDar] = useState(false);

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

  const konumlar = useMemo(
    () => durakKonumlari(bolge?.duraklar.length ?? 0, dar),
    [bolge, dar],
  );
  const parcalar = useMemo(() => yolParcalari(konumlar), [konumlar]);
  const yol = useMemo(() => parcalar.join(" "), [parcalar]);
  // Tamamlanan kısım AYRI bir yol olarak çizilir. `pathLength` + dasharray
  // burada yanıltıcı olurdu: viewBox `preserveAspectRatio="none"` ile yatayda
  // esnediği için yol uzunluğu oranı görsel orana denk gelmiyor.
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
    bas: konumlar[index],
    son: konumlar[index + 1],
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
            /* Bölgenin kendi sahne görseli; dosya yoksa CSS ortak görsele düşer. */
            style={{ "--bolge-arkaplan": `url("/bolgeler/bolge-${bolge.id}.png")` } as CSSProperties}
          >
            <div className={styles.mapShade} aria-hidden="true" />
            <div className={styles.mapHeading}>
              <p>{bolge.sira}. Keşif Bölgesi · {bolge.duraklar.length} kitap</p>
              <h1 id="atlas-title">{bolge.ad}</h1>
              {bolge.altBaslik ? <strong>{bolge.altBaslik}</strong> : null}
              <span>{bolge.aciklama}</span>
            </div>
            {/*
              Yol dört katmandır: yumuşak zemin şeridi → kalan yol (parça parça,
              her biri kendi solma gradyanıyla) → tamamlanan yeşil yol → fener.
              Gradyan `userSpaceOnUse` ile parçanın KENDİ iki ucuna bağlanır;
              tek bir yatay gradyan kullanılsaydı yılan düzeninde sağdan sola
              akan sırada renk ters dönerdi.
            */}
            <svg className={styles.trail} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
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
              <path className={styles.trailShadow} d={yol} />
              {kalanParcalar.map((parca) => (
                <path
                  key={parca.gradyanId}
                  className={styles.trailBase}
                  d={parca.d}
                  stroke={`url(#${parca.gradyanId})`}
                />
              ))}
              {tamamYol ? <path className={styles.trailCompleted} d={tamamYol} /> : null}
              {fenerYolu ? <path className={styles.trailBeacon} d={fenerYolu} pathLength={100} /> : null}
            </svg>

            <ol className={styles.stops} aria-label={`${bolge.ad} kitapları`}>
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
                    <span className={styles.stopLabel}>
                      <strong>{durak.ad}</strong>
                      <em>{durumMetni(durak)}</em>
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
