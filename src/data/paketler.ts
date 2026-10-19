import { KATALOG_SAYILARI } from "./katalogSayilari";

/**
 * Satış paketleri — tanıtım sayfasındaki "Paketler" bölümünün TEK KAYNAĞI.
 *
 * Model (öneri, 15 Eki 2026 — Hasan onayı bekliyor):
 *  - Tek seferlik ödeme, süre sınırı yok, otomatik yenileme yok. Ürünün "baskı
 *    yok, kendi hızında oku" ilkesiyle uyumlu: süre dolacak diye çocuğu
 *    acele ettirmez; küçük kardeş sonradan aynı hesaptan başlayabilir.
 *    Mevcut sistem de böyle çalışır: `parent_subscriptions` kaydının bitiş
 *    tarihi yoktur.
 *  - Paketler yalnız çocuk profili sayısıyla ayrışır; içerik ve özellikler
 *    hepsinde aynıdır (özellik kısıtlamak aile ürününde güven kaybettirir).
 *
 * Fiyatlar öneridir; Hasan kesinleştirince yalnız bu dosya değişir.
 *
 * Shopier bağlantısı: Shopier'de her paket için ayrı ürün açılınca ürün
 * sayfasının adresi `shopierBaglantisi`na yazılır. Ödeme bildirimi
 * (`app/api/shopier/webhook/route.ts`) profil hakkını ürün kimliğinden okur:
 * ürün kimlikleri Vercel ortam değişkenlerinde SHOPIER_PACKAGE_1_PRODUCT_ID,
 * SHOPIER_PACKAGE_3_PRODUCT_ID ve SHOPIER_PACKAGE_5_PRODUCT_ID olarak
 * tanımlanmalıdır (yoksa paket ürün adından tahmin edilir). Elden satışta
 * yönetim sayfası paketleri buradan listeler.
 */
export type Paket = {
  kimlik: "tek" | "kardes" | "aile";
  ad: string;
  profilSayisi: number;
  /** TL, KDV dahil. */
  fiyat: number;
  aciklama: string;
  /** Öne çıkan paketin kartında görünen kısa etiket. */
  etiket?: string;
  /** Boşsa düğme paketler bölümünde kalır (bağlantı henüz yok). */
  shopierBaglantisi: string;
};

export const PAKETLER: Paket[] = [
  {
    kimlik: "tek",
    ad: "Tek Çocuk",
    profilSayisi: 1,
    fiyat: 1490,
    aciklama: "Bir çocuğun kendi profiliyle tüm yolculuğu.",
    shopierBaglantisi: "",
  },
  {
    kimlik: "kardes",
    ad: "Kardeş",
    profilSayisi: 3,
    fiyat: 1990,
    aciklama: "Her kardeş kendi profilinde, kendi hızında ilerler.",
    etiket: "Kardeşler için",
    shopierBaglantisi: "",
  },
  {
    kimlik: "aile",
    ad: "Geniş Aile",
    profilSayisi: 5,
    fiyat: 2490,
    aciklama: "Kalabalık aileler ve kuzenlerle paylaşmak için.",
    shopierBaglantisi: "",
  },
];

/** Bütün paketlerde ortak olanlar — kartlarda aynı liste gösterilir. */
export const PAKET_ORTAK_OZELLIKLER = [
  `${KATALOG_SAYILARI.kitap} kitabın tamamı, ${KATALOG_SAYILARI.bolum} bölüm`,
  "Her bölümde sesli anlatım",
  "Rozet, madalya ve unvanlar",
  "Veli paneli ve gelişim raporu",
  "Süre sınırı ve abonelik yok",
];

export function tlBicimi(tutar: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(tutar);
}
