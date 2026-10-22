import {
  cocukOzeti,
  gorevDurumDetaylari,
  katalogKitaplari,
  rozetIconKey,
  yayindakiKitaplar,
  type CocukOzeti,
  type GorevDurumDetay,
} from "../../lib/derive";
import { buildChildReport, type ChildReport } from "../../lib/parent/report";
import { parentReportBooks, type ParentFaqItem } from "../../data/books";
import { bolumKapagi } from "../../lib/varlikYollari";
import type { TaslakAile, TaslakCocuk } from "./ornekAile";

/**
 * Taslak ekranlarının görünüm modeli. Hepsi canlı panelin kullandığı saf
 * türetmelerin üstüne kurulur; yeni bir veri kaynağı yoktur. Çocuğun seçtiği
 * şık, oran veya puan hiçbir yerde taşınmaz (PROJE-MODELI 3.8, S5).
 */

export type BolumOzeti = {
  no: number;
  baslik: string;
  ozet: string | null;
  soru: string | null;
  rozetAdi: string;
  rozetAnahtari: string;
};

export type Yolculuk = {
  bookKey: string;
  baslik: string;
  altBaslik: string;
  tamamlanan: number;
  toplam: number;
  bitti: boolean;
  finalBekliyor: boolean;
  sonOkuma: string | null;
  /** Son bitirdiği bölüm (tamamlanan bölüm sayısından; "kaldığın yer" değildir) */
  sonBolum: BolumOzeti | null;
  siradaki: { no: number; baslik: string } | null;
  /** Kartın sahnesi: son bitirilen bölümün açılış görseli, yoksa ilk bölümünki */
  sahne: string;
  bolumler: BolumOzeti[];
};

export type CocukGorunumu = {
  cocuk: TaslakCocuk;
  ozet: CocukOzeti;
  rapor: ChildReport;
  aktif: Yolculuk | null;
  yolculuklar: Yolculuk[];
  gorevler: GorevDurumDetay[];
  guncelGorev: GorevDurumDetay | null;
};

function temizBaslik(metin: string) {
  return metin.replace(/\s+/g, " ").trim();
}

export function cocukGorunumu(aile: TaslakAile, cocuk: TaslakCocuk): CocukGorunumu {
  const ilerleme = aile.ilerleme[cocuk.id] ?? [];
  const ozet = cocukOzeti(ilerleme, aile.kitaplar);
  const rapor = buildChildReport(cocuk, ilerleme, aile.kitaplar, aile.secimler[cocuk.id] ?? []);

  const yolculuklar: Yolculuk[] = yayindakiKitaplar(aile.kitaplar, ilerleme)
    .filter((kitap) => kitap.tamamlanan > 0 || kitap.bitti)
    .sort((a, b) => b.sonOkuma - a.sonOkuma)
    .map((kitap) => {
      const bolumler = kitap.icerik.chapters.map((bolum, sira) => ({
        no: sira + 1,
        baslik: temizBaslik(bolum.title),
        ozet: bolum.ozet ?? null,
        soru: bolum.question?.prompt ?? null,
        rozetAdi: bolum.badgeName,
        rozetAnahtari: rozetIconKey(kitap.katalog.key, sira + 1),
      }));
      const sonBolum = kitap.tamamlanan > 0 ? bolumler[kitap.tamamlanan - 1] : null;
      const siradakiBolum = kitap.tamamlanan < kitap.toplam ? bolumler[kitap.tamamlanan] : null;
      return {
        bookKey: kitap.katalog.key,
        baslik: kitap.katalog.title,
        altBaslik: kitap.katalog.subtitle,
        tamamlanan: kitap.tamamlanan,
        toplam: kitap.toplam,
        bitti: kitap.bitti,
        finalBekliyor: !kitap.bitti && kitap.tamamlanan >= kitap.toplam,
        sonOkuma: kitap.ilerleme?.updated_at ?? null,
        sonBolum,
        siradaki: siradakiBolum ? { no: siradakiBolum.no, baslik: siradakiBolum.baslik } : null,
        sahne: bolumKapagi(kitap.katalog.key, Math.max(1, kitap.tamamlanan)),
        bolumler,
      };
    });

  const aktif = yolculuklar.find((y) => !y.bitti) ?? yolculuklar[0] ?? null;

  const gorevler = gorevDurumDetaylari(aile.gorevler[cocuk.id] ?? []);
  const guncelGorev = gorevler.find((g) => g.status === "eklendi") ?? gorevler[0] ?? null;

  return { cocuk, ozet, rapor, aktif, yolculuklar, gorevler, guncelGorev };
}

/** Hiç başlanmamış çocuk için ilk kitap (katalog sırasıyla ilk yayındaki). */
export function ilkKitap() {
  const kitap = katalogKitaplari().find((k) => k.availability === "published");
  return kitap ? { bookKey: kitap.key, baslik: kitap.title, altBaslik: kitap.subtitle } : null;
}

// --- Türkçe ek ---

/** Özel adın ilgi eki: Elif'in, Ömer'in, Ayşe'nin, Yusuf'un, Ümmü'nün. */
export function ilgiEki(isim: string) {
  const kucuk = isim.toLocaleLowerCase("tr-TR");
  const unluler = [...kucuk].filter((harf) => "aıoueiöü".includes(harf));
  const son = unluler[unluler.length - 1] ?? "e";
  const ek = "aı".includes(son) ? "ın" : "ei".includes(son) ? "in" : "ou".includes(son) ? "un" : "ün";
  const unluyleBiter = "aıoueiöü".includes(kucuk.charAt(kucuk.length - 1));
  return `${isim}'${unluyleBiter ? "n" : ""}${ek}`;
}

/** Özel adın yönelme eki: Elif'e, Ömer'e, Ayşe'ye, Yusuf'a. */
export function yonelmeEki(isim: string) {
  const kucuk = isim.toLocaleLowerCase("tr-TR");
  const unluler = [...kucuk].filter((harf) => "aıoueiöü".includes(harf));
  const son = unluler[unluler.length - 1] ?? "e";
  const ek = "aıou".includes(son) ? "a" : "e";
  const unluyleBiter = "aıoueiöü".includes(kucuk.charAt(kucuk.length - 1));
  return `${isim}'${unluyleBiter ? "y" : ""}${ek}`;
}

// --- Karşılama ---

export function selamlama(saat = new Date().getHours()) {
  if (saat >= 5 && saat < 11) return "Günaydın";
  if (saat >= 11 && saat < 17) return "İyi günler";
  if (saat >= 17 && saat < 22) return "İyi akşamlar";
  return "İyi geceler";
}

export function bugununTarihi() {
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

const GUN = 24 * 60 * 60 * 1000;

function gunBolumu(saat: number) {
  if (saat >= 5 && saat < 11) return "sabah";
  if (saat >= 11 && saat < 14) return "öğlen";
  if (saat >= 14 && saat < 18) return "öğleden sonra";
  if (saat >= 18 && saat < 22) return "akşam";
  return "gece";
}

/**
 * Okuma zamanını insan diliyle söyler: "bu sabah", "dün akşam",
 * "4 gün önce", "3 Ekim". Kısa biçim listelerin sağ kenarı içindir ("dün").
 * Taslağın her yerinde aynı söz kullanılsın diye tek fonksiyon.
 */
export function okumaZamani(iso: string | null | undefined, kisa = false) {
  if (!iso) return null;
  const an = new Date(iso);
  const bugunBasi = new Date();
  bugunBasi.setHours(0, 0, 0, 0);
  const gunFarki = Math.floor((bugunBasi.getTime() - new Date(an).setHours(0, 0, 0, 0)) / GUN);
  if (gunFarki <= 0) {
    if (kisa) return "bugün";
    const bolum = gunBolumu(an.getHours());
    // "bu sabah", "bu akşam", "bu gece" ama "bugün öğlen", "bugün öğleden sonra"
    return bolum.startsWith("öğle") ? `bugün ${bolum}` : `bu ${bolum}`;
  }
  if (gunFarki === 1) return kisa ? "dün" : `dün ${gunBolumu(an.getHours())}`;
  if (gunFarki < 7) return `${gunFarki} gün önce`;
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" }).format(an);
}

/**
 * Karşılamadaki tek cümle: her çocuk için en son ne oldu. Gözlem bildirir,
 * değerlendirmez ("çok iyi gidiyor" yok).
 */
export function aileCumleleri(gorunumler: CocukGorunumu[]): string[] {
  return gorunumler.map(({ cocuk, aktif }) => {
    if (!aktif || !aktif.sonBolum) return `${cocuk.isim} ilk yolculuğuna hazır.`;
    const zaman = okumaZamani(aktif.sonOkuma);
    const ne = aktif.finalBekliyor
      ? `${aktif.baslik} kitabının bütün bölümlerini bitirdi; Büyük Final Testi sırada`
      : `${aktif.baslik} kitabının ${aktif.sonBolum.no}. bölümünü bitirdi`;
    return zaman ? `${cocuk.isim} ${zaman} ${ne}.` : `${cocuk.isim} en son ${ne}.`;
  });
}

// --- Son gelişmeler (rozet · madalya · görev), yalnız zamanı bilinenler ---

export type Gelisme = {
  anahtar: string;
  cocuk: TaslakCocuk;
  tip: "rozet" | "madalya" | "gorev";
  baslik: string;
  alt: string;
  zaman: string;
  gorselAnahtari: string | null;
};

export function sonGelismeler(gorunumler: CocukGorunumu[], adet = 5): Gelisme[] {
  const liste: Gelisme[] = [];
  for (const g of gorunumler) {
    for (const y of g.yolculuklar) {
      if (y.bitti && y.sonOkuma) {
        liste.push({
          anahtar: `${g.cocuk.id}-madalya-${y.bookKey}`,
          cocuk: g.cocuk,
          tip: "madalya",
          baslik: `${y.baslik} Yolculuk Madalyası`,
          alt: "Kitabı ve Büyük Final Testi'ni bitirdi",
          zaman: y.sonOkuma,
          gorselAnahtari: `hz-${y.bookKey}`,
        });
      } else if (y.sonBolum && y.sonOkuma) {
        liste.push({
          anahtar: `${g.cocuk.id}-rozet-${y.bookKey}`,
          cocuk: g.cocuk,
          tip: "rozet",
          baslik: y.sonBolum.rozetAdi,
          alt: `${y.baslik} · ${y.sonBolum.no}. bölüm`,
          zaman: y.sonOkuma,
          gorselAnahtari: y.sonBolum.rozetAnahtari,
        });
      }
    }
    for (const gorev of g.gorevler) {
      const tamam = gorev.status === "tamamlandi";
      liste.push({
        anahtar: `${g.cocuk.id}-gorev-${gorev.gorev.id}`,
        cocuk: g.cocuk,
        tip: "gorev",
        baslik: gorev.gorev.ad,
        alt: tamam ? "Görevi tamamladığını işaretledi" : "Görevi listesine ekledi",
        zaman: (tamam ? gorev.completedAt : gorev.addedAt) ?? gorev.addedAt,
        gorselAnahtari: null,
      });
    }
  }
  return liste.sort((a, b) => Date.parse(b.zaman) - Date.parse(a.zaman)).slice(0, adet);
}

// --- Aile sohbeti ---

export type SohbetKitabi = {
  bookKey: string;
  baslik: string;
  bitti: boolean;
  sonOkuma: string | null;
  /** Bitirilmiş bölümler, en yeni önce */
  bolumler: BolumOzeti[];
  kitapSonuSorulari: string[];
  gozlem: string | null;
  sss: ParentFaqItem[];
};

export function sohbetKitaplari(g: CocukGorunumu): SohbetKitabi[] {
  return g.yolculuklar.map((y) => {
    const rapor = parentReportBooks.find((r) => r.key === y.bookKey);
    const biten = g.rapor.completedAdventures.find((a) => a.bookTitle === y.baslik);
    return {
      bookKey: y.bookKey,
      baslik: y.baslik,
      bitti: y.bitti,
      sonOkuma: y.sonOkuma,
      bolumler: y.bolumler.slice(0, y.tamamlanan).reverse(),
      kitapSonuSorulari: biten?.chatQuestions ?? [],
      gozlem: biten?.parentMessage ?? null,
      sss: rapor?.parent_faq ?? [],
    };
  });
}

// --- Kütüphane ---

export function katalogBilgisi(bookKey: string) {
  return katalogKitaplari().find((k) => k.key === bookKey) ?? null;
}
