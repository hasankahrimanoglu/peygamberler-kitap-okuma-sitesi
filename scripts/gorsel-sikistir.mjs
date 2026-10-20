#!/usr/bin/env node
/**
 * OKUMA GÖRSELLERİNİ SIKIŞTIRMA (KARAR 20 Eki 2026 — PROJE-MODELI 6.1)
 *
 * `public/kitaplar` altındaki `.jpg`'lerin sitedeki kopyasını en fazla 1600 px
 * genişliğe ve mozjpeg kalite 82'ye indirir; dosya AYNI ADLA yerinde kalır.
 * Okuma sütunu en fazla 720 px olduğu için retina tablette ~1440 px yeter;
 * 1920×1080 üretim dosyası 600–800 KB'tan ~180 KB'a iner (Hasan karşılaştırmayla
 * onayladı). Görsel üretim oturumu yeni görselleri yazdıktan sonra çalıştırır.
 *
 * Kullanım:
 *   npm run gorsel-sikistir                  (bütün kitaplar)
 *   npm run gorsel-sikistir -- musa          (yalnız public/kitaplar/hz-musa)
 *   npm run gorsel-sikistir -- musa --kuru   (yalnız rapor, dosya yazmaz)
 *
 * Kurallar:
 *   - Yer tutucu kopyalarına (placeholder-sahne / placeholder-durak ile aynı
 *     içerik) ve yedek dosyaların kendisine DOKUNMAZ: `kitap-denetle` yer
 *     tutucuyu içerik özetiyle tanır, sıkıştırılırsa sayım bozulur.
 *   - Yalnız 1600 px'ten geniş ya da 300 KB'tan ağır dosyayı dener; sonuç en az
 *     %15 küçük değilse dosyayı yazmaz. Böylece sıkıştırılmış görsel tekrar tekrar
 *     sıkıştırılıp kalite kaybetmez.
 *   - Oran ve ad değişmez; yazma geçici dosya + yeniden adlandırma ile yapılır.
 *   - ORİJİNAL SAKLANIR (Hasan, 20 Eki 2026): sıkıştırmadan önce dosyanın
 *     kendisi `gorsel-kaynaklari/kitaplar/` altına aynı göreli yolla kopyalanır
 *     (klasör git'e girmez). Yalnız sıkıştırılmamış dosya işlendiği için yedek
 *     her zaman sitedeki görselin tam boyutlu hâlidir; görsel yeniden
 *     üretilirse yedek de yenisiyle değişir.
 */

import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const KITAPLAR = join(KOK, "public/kitaplar");
const ORIJINALLER = join(KOK, "gorsel-kaynaklari/kitaplar");
const EN_GENIS = 1600;
const KALITE = 82;
const AGIR_SINIR = 300 * 1024;
const EN_AZ_KAZANC = 0.15;

const [, , ...argumanlar] = process.argv;
const kuruCalisma = argumanlar.includes("--kuru");
const bookKey = argumanlar.find((a) => !a.startsWith("--"));

const ozet = (veri) => createHash("sha1").update(veri).digest("hex");
const YEDEKLER = ["placeholder-sahne.jpg", "placeholder-durak.jpg"].map((ad) => join(KITAPLAR, ad));
const yedekOzetleri = new Set(YEDEKLER.map((yol) => ozet(readFileSync(yol))));

function jpgler(klasor) {
  return readdirSync(klasor, { withFileTypes: true }).flatMap((g) => {
    const yol = join(klasor, g.name);
    if (g.isDirectory()) return jpgler(yol);
    return g.isFile() && g.name.toLowerCase().endsWith(".jpg") ? [yol] : [];
  });
}

const kapsam = bookKey ? join(KITAPLAR, `hz-${bookKey}`) : KITAPLAR;
try {
  statSync(kapsam);
} catch {
  console.error(`Klasör yok: ${relative(KOK, kapsam)}`);
  process.exit(1);
}

const kb = (bayt) => `${Math.round(bayt / 1024)} KB`;
const sayac = { islenen: 0, kucuk: 0, yerTutucu: 0, kazancsiz: 0 };
let onceToplam = 0;
let sonraToplam = 0;

for (const yol of jpgler(kapsam)) {
  if (YEDEKLER.includes(yol)) continue;
  const veri = readFileSync(yol);
  onceToplam += veri.length;
  if (yedekOzetleri.has(ozet(veri))) {
    sayac.yerTutucu++;
    sonraToplam += veri.length;
    continue;
  }

  const { width = 0 } = await sharp(veri).metadata();
  if (width <= EN_GENIS && veri.length <= AGIR_SINIR) {
    sayac.kucuk++;
    sonraToplam += veri.length;
    continue;
  }

  const yeni = await sharp(veri)
    .resize({ width: EN_GENIS, withoutEnlargement: true })
    .jpeg({ quality: KALITE, mozjpeg: true, progressive: true })
    .toBuffer();
  if (yeni.length > veri.length * (1 - EN_AZ_KAZANC)) {
    sayac.kazancsiz++;
    sonraToplam += veri.length;
    continue;
  }

  if (!kuruCalisma) {
    const yedek = join(ORIJINALLER, relative(KITAPLAR, yol));
    mkdirSync(dirname(yedek), { recursive: true });
    copyFileSync(yol, yedek);
    const gecici = `${yol}.sikistiriliyor`;
    writeFileSync(gecici, yeni);
    renameSync(gecici, yol);
  }
  sayac.islenen++;
  sonraToplam += yeni.length;
}

const mb = (bayt) => `${(bayt / 1048576).toFixed(1)} MB`;
console.log(`${kuruCalisma ? "[kuru çalışma — dosya yazılmadı] " : ""}${relative(KOK, kapsam)}`);
console.log(`  Sıkıştırılan: ${sayac.islenen}${sayac.islenen && !kuruCalisma ? ` (orijinaller: ${relative(KOK, ORIJINALLER)}/)` : ""}`);
console.log(`  Zaten küçük: ${sayac.kucuk} · yer tutucu (dokunulmadı): ${sayac.yerTutucu} · kazancı az: ${sayac.kazancsiz}`);
console.log(`  Toplam: ${mb(onceToplam)} → ${mb(sonraToplam)}${sayac.islenen ? ` (ortalama ${kb((onceToplam - sonraToplam) / sayac.islenen)} kazanç/dosya)` : ""}`);
