import { katalogKitaplari, type DeriveBookRow, type DeriveProgressRow, type GorevDurumSatiri } from "../../lib/derive";
import type { SecimKaydi } from "../../lib/parent/report";

/**
 * Veli paneli taslağının (`/tasarim/veli-panel`) örnek ailesi. Gerçek Supabase
 * satırlarının biçimindedir; ekranlar canlı panelle aynı türetme
 * fonksiyonlarından (`cocukOzeti`, `buildChildReport`, `kutuphaneListesi` …)
 * geçer. Supabase'e hiçbir şey yazılmaz.
 *
 *   (varsayılan)  → iki çocuk: Elif (üç kitap, biri bitti) ve Ömer (yeni başladı)
 *   ?durum=tek    → yalnız Elif
 *   ?durum=yeni   → profil eklendi, henüz okuma yok
 *   ?durum=bos    → hiç profil yok (ilk giriş)
 */
export type AileDurumu = "iki" | "tek" | "yeni" | "bos";

export type TaslakCocuk = {
  id: string;
  isim: string;
  avatar_tipi: string;
  /** Aile ve Güvenlik ekranı için örnek durum */
  sifresiVar: boolean;
  bagliCihaz: string | null;
};

export type TaslakAile = {
  eposta: string;
  profilHakki: number;
  cocuklar: TaslakCocuk[];
  kitaplar: DeriveBookRow[];
  ilerleme: Record<string, DeriveProgressRow[]>;
  gorevler: Record<string, GorevDurumSatiri[]>;
  secimler: Record<string, SecimKaydi[]>;
  veliPinVar: boolean;
  profilSifresiAcik: boolean;
};

/**
 * Örnek tarihler takvime göre kurulur ("dün akşam 20.15") ki ekranda doğal
 * okunsun. Bugün için gelecekte kalan saat, şimdinin biraz öncesine çekilir.
 */
function gunOnce(gun: number, saat: number, dakika = 0) {
  const tarih = new Date();
  tarih.setDate(tarih.getDate() - gun);
  tarih.setHours(saat, dakika, 0, 0);
  const sinir = Date.now() - 50 * 60 * 1000;
  return new Date(Math.min(tarih.getTime(), sinir)).toISOString();
}

/** Yayındaki 12 kitabın `books` satırları; ad katalogdan gelir (dbKitabiBul eşleşmesi). */
function kitapSatirlari(): DeriveBookRow[] {
  return katalogKitaplari()
    .filter((kitap) => kitap.availability === "published")
    .map((kitap) => ({
      id: `ornek-${kitap.key}`,
      isim: kitap.title,
      toplam_bolum: kitap.chapterCount,
      sira: kitap.order,
    }));
}

function satir(
  key: string,
  tamamlanan: number,
  zaman: string,
  bitti = false,
  finalSkoru: number | null = null,
): DeriveProgressRow {
  return {
    book_id: `ornek-${key}`,
    tamamlanan_bolum_sayisi: tamamlanan,
    yuzde: null,
    bitti_mi: bitti,
    final_score: finalSkoru,
    updated_at: zaman,
  };
}

const ELIF: TaslakCocuk = {
  id: "ornek-elif",
  isim: "Elif",
  avatar_tipi: "avatar-2",
  sifresiVar: true,
  bagliCihaz: "Elif'in tableti",
};

const OMER: TaslakCocuk = {
  id: "ornek-omer",
  isim: "Ömer",
  avatar_tipi: "avatar-1",
  sifresiVar: false,
  bagliCihaz: null,
};

export function ornekAile(durum: AileDurumu): TaslakAile {
  const temel = {
    eposta: "aile@ornek.com",
    profilHakki: 3,
    kitaplar: kitapSatirlari(),
    veliPinVar: durum !== "bos",
    profilSifresiAcik: false,
  };

  if (durum === "bos") {
    return { ...temel, cocuklar: [], ilerleme: {}, gorevler: {}, secimler: {} };
  }

  if (durum === "yeni") {
    return {
      ...temel,
      cocuklar: [{ ...ELIF, sifresiVar: false, bagliCihaz: null }],
      ilerleme: { [ELIF.id]: [] },
      gorevler: { [ELIF.id]: [] },
      secimler: { [ELIF.id]: [] },
    };
  }

  const elifIlerleme = [
    satir("adem", 8, gunOnce(12, 18, 10), true, 7),
    satir("nuh", 8, gunOnce(5, 19, 40)),
    satir("ibrahim", 3, gunOnce(1, 20, 15)),
  ];
  const elifGorevler: GorevDurumSatiri[] = [
    { task_id: "ibrahim-2-saygili-konusma", status: "eklendi", added_at: gunOnce(2, 19, 5), completed_at: null },
    { task_id: "nuh-4-her-gun-bir-kez", status: "tamamlandi", added_at: gunOnce(7, 18, 30), completed_at: gunOnce(4, 17, 20) },
    { task_id: "adem-5-hatami-onariyorum", status: "eklendi", added_at: gunOnce(13, 19, 0), completed_at: null },
    { task_id: "adem-3-sozumu-koruyorum", status: "tamamlandi", added_at: gunOnce(15, 18, 45), completed_at: gunOnce(14, 16, 30) },
  ];
  // Hz. Âdem'in 8 bölümünde ilk seçimler: 7'si değeri yaşatan şık (özet "high").
  const elifSecimler: SecimKaydi[] = Array.from({ length: 8 }, (_, i) => ({
    kitap_anahtari: "adem",
    dogru: i !== 3,
  }));

  if (durum === "tek") {
    return {
      ...temel,
      cocuklar: [ELIF],
      ilerleme: { [ELIF.id]: elifIlerleme },
      gorevler: { [ELIF.id]: elifGorevler },
      secimler: { [ELIF.id]: elifSecimler },
    };
  }

  return {
    ...temel,
    cocuklar: [ELIF, OMER],
    ilerleme: {
      [ELIF.id]: elifIlerleme,
      [OMER.id]: [satir("yunus", 2, gunOnce(0, 16, 40))],
    },
    gorevler: {
      [ELIF.id]: elifGorevler,
      [OMER.id]: [
        { task_id: "yunus-1-gorevimi-unutmuyorum", status: "eklendi", added_at: gunOnce(1, 18, 20), completed_at: null },
      ],
    },
    secimler: { [ELIF.id]: elifSecimler, [OMER.id]: [] },
  };
}
