#!/usr/bin/env node
/**
 * GÖRSEL VE SES YER TUTUCU ÜRETİCİ
 *
 * Yeni bir kitap `books.ts`'e aktarıldığında, o kitabın bütün görsel ve
 * sesli anlatım dosyalarını doğru adlarla ve doğru biçimde klasöre açar.
 * Hasan gerçek dosyayı **aynı adla** üzerine yazar; kod hiç değişmez
 * (PROJE-MODELI.md 6.1 ve 6.5 üretim akışı).
 *
 * Kullanım:
 *   node scripts/gorsel-yertutucu.mjs <bookKey>
 *   node scripts/gorsel-yertutucu.mjs sit
 *   node scripts/gorsel-yertutucu.mjs sit --kuru      (yalnız rapor, dosya yazmaz)
 *   node scripts/gorsel-yertutucu.mjs unvanlar        (kitaptan bağımsız; 10 unvan)
 *
 * Ne üretir:
 *   - Bölüm sahneleri  → `books.ts`'teki her `type: "image"` ve
 *     `coverIllustration` yolu için **.jpg** (placeholder-sahne.jpg kopyası)
 *   - Kitap kapağı     → `public/kitaplar/hz-{key}/kapak.png` · 600×900
 *     (placeholder-kapak.png kopyası — placeholder-kapak.svg yedeğinin rasteri)
 *   - Harita durağı    → `public/kitaplar/hz-{key}/harita-kapak.jpg` · 512×512
 *     (placeholder-durak.jpg kopyası — placeholder-durak.svg yedeğinin rasteri)
 *   - Rozetler         → `public/rozetler/hz-{key}/bolum-{n}.png` · 512×512 şeffaf
 *   - Madalya          → `public/madalyalar/hz-{key}.png` · 512×512 şeffaf
 *   - Sesli anlatım    → `public/sesli-anlatim/hz-{key}/hz-{key}-bolum-{n}.mp3`
 *     (placeholder-ses.mp3 kopyası — KARAR 12 Eki 2026). Yer tutucu başka bir
 *     bölümün anlatımıdır; yayından önce gerçek kayıtla değiştirilmelidir.
 *   - Unvanlar         → `public/unvanlar/{anahtar}.png` · 512×512 şeffaf
 *     (`unvanlar` modu; anahtarlar `derive.ts:UNVAN_ESIKLERI`'nden türetilir)
 *
 * Kurallar (ICERIK-GORSEL-SICILI.md §1):
 *   - Sahne görselleri 16:9 ve **.jpg**; her sahne AYRI dosyadır.
 *   - Ödül görselleri **512×512 şeffaf .png** (KARAR 7 Ağu 2026).
 *   - Var olan dosyanın ÜZERİNE YAZMAZ. Gerçek görsel klasördeyse korunur.
 *
 * Not: rozet/madalya PNG'leri `sips` ile üretilir (macOS). Başka bir işletim
 * sisteminde bu adım atlanır ve uyarı basar; sahne .jpg kopyaları her yerde
 * çalışır. Ödül dosyası yoksa kod zaten `YEDEK` görseline düşer, ekran bozulmaz.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const SAHNE_YEDEGI = join(KOK, "public/kitaplar/placeholder-sahne.jpg");
const KAPAK_YEDEGI = join(KOK, "public/kitaplar/placeholder-kapak.png");
const DURAK_YEDEGI = join(KOK, "public/kitaplar/placeholder-durak.jpg");
const SES_YEDEGI = join(KOK, "public/sesli-anlatim/placeholder-ses.mp3");

const [, , bookKey, ...bayraklar] = process.argv;
const kuruCalisma = bayraklar.includes("--kuru");

if (!bookKey) {
  console.error("Kullanım: node scripts/gorsel-yertutucu.mjs <bookKey|unvanlar> [--kuru]");
  process.exit(1);
}

const UNVAN_MODU = bookKey === "unvanlar";

// --- yardımcılar -------------------------------------------------------------
let yazilan = 0;
let korunan = 0;

function yaz(hedefGoreli, uretici) {
  const hedef = join(KOK, "public", hedefGoreli);
  if (existsSync(hedef)) {
    console.log(`  korundu (zaten var)  ${hedefGoreli}`);
    korunan++;
    return;
  }
  if (kuruCalisma) {
    console.log(`  ÜRETİLECEK           ${hedefGoreli}`);
    yazilan++;
    return;
  }
  mkdirSync(dirname(hedef), { recursive: true });
  uretici(hedef);
  console.log(`  üretildi             ${hedefGoreli}`);
  yazilan++;
}

/**
 * Yer tutucu ödül SVG'si. `tur`:
 *   "rozet"   → altıgen çerçeve, ortada yıldız, altında bölüm numarası
 *   "madalya" → kurdeleli disk, ortada yıldız (numarasız)
 *   "unvan"   → kalkan, ortada eşik sayısı (kaç kitapta açıldığı)
 * Numara yer tutucuların birbirinden ayırt edilmesi içindir; gerçek görsel
 * geldiğinde zaten üzerine yazılır.
 */
function odulSvg(etiket, tur, numara) {
  let govde;
  if (tur === "madalya") {
    govde = `<path d="M40 6h16l-8 34-16-4Z" fill="url(#g1)"/><path d="M80 6H64l8 34 16-4Z" fill="url(#g1)"/>
   <circle cx="60" cy="76" r="36" fill="url(#g2)"/><circle cx="60" cy="76" r="27" fill="#1e4033"/>
   <path d="M60 58 67 74h17l-13 10 5 17-16-11-16 11 5-17-13-10h17Z" fill="#f2ce7b"/>`;
  } else if (tur === "unvan") {
    govde = `<path d="M60 8 104 24v40c0 26-19 41-44 48-25-7-44-22-44-48V24Z" fill="url(#g2)"/>
   <path d="M60 18 95 31v33c0 21-15 33-35 39-20-6-35-18-35-39V31Z" fill="#13223e"/>
   <text x="60" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="#f2ce7b">${numara}</text>`;
  } else {
    govde = `<path d="M60 6 108 33v54L60 114 12 87V33Z" fill="url(#g2)"/>
   <path d="M60 16 99 38v44L60 104 21 82V38Z" fill="#1e4033"/>
   <path d="M60 40 66 56h17l-13 10 5 17-15-10-15 10 5-17-13-10h17Z" fill="#f2ce7b"/>
   <text x="60" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="#f2ce7b">${numara}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${etiket}">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e7d5b"/><stop offset="1" stop-color="#1e4033"/></linearGradient>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dfae"/><stop offset="1" stop-color="#c08f2f"/></linearGradient>
  </defs>
  ${govde}
</svg>`;
}

let sipsCalisiyor = true;
function odulPngYaz(hedef, etiket, tur, numara) {
  if (!sipsCalisiyor) return;
  const gecici = join(tmpdir(), `yertutucu-${process.pid}-${Math.random().toString(36).slice(2)}.svg`);
  writeFileSync(gecici, odulSvg(etiket, tur, numara));
  try {
    execFileSync("sips", ["-s", "format", "png", "-z", "512", "512", gecici, "--out", hedef], {
      stdio: "ignore",
    });
  } catch {
    sipsCalisiyor = false;
    console.warn("  ⚠ sips bulunamadı — ödül PNG'leri atlandı (macOS dışı ortam).");
  } finally {
    rmSync(gecici, { force: true });
  }
}

// --- üretim ------------------------------------------------------------------
if (UNVAN_MODU) {
  // Unvanlar kitaba bağlı değildir; anahtarlar `derive.ts:UNVAN_ESIKLERI`'nden
  // türer ve `unvanAnahtari()` ile aynı normalizasyondan geçer.
  const deriveTs = readFileSync(join(KOK, "src/lib/derive.ts"), "utf8");
  const blok = deriveTs.match(/UNVAN_ESIKLERI[^=]*=\s*\[([\s\S]*?)\];/);
  if (!blok) {
    console.error("derive.ts içinde UNVAN_ESIKLERI bulunamadı.");
    process.exit(1);
  }
  const unvanlar = [...blok[1].matchAll(/kitap:\s*(\d+),\s*unvan:\s*"([^"]+)"/g)].map((m) => ({
    kitap: Number(m[1]),
    unvan: m[2],
  }));

  // derive.ts:normalizeBookName + unvanAnahtari ile birebir aynı kural
  const anahtarla = (s) =>
    s
      .toLocaleLowerCase("tr-TR")
      .replaceAll("â", "a").replaceAll("î", "i").replaceAll("û", "u")
      .replaceAll("ü", "u").replaceAll("ö", "o").replaceAll("ı", "i")
      .replaceAll("ş", "s").replaceAll("ğ", "g").replaceAll("ç", "c")
      .replaceAll(" ", "-");

  console.log(`\nUnvanlar · ${unvanlar.length} adet (kaynak: derive.ts UNVAN_ESIKLERI)`);
  console.log(kuruCalisma ? "(--kuru: hiçbir dosya yazılmayacak)\n" : "");
  for (const { kitap, unvan } of unvanlar) {
    yaz(`/unvanlar/${anahtarla(unvan)}.png`, (hedef) =>
      odulPngYaz(hedef, `${unvan} unvanı`, "unvan", kitap),
    );
  }
} else {
  // --- books.ts'ten bu kitabın görsel yollarını ve bölüm sayısını çıkar -------
  // Veri statik olduğu için dosyayı metin olarak okumak yeterli; TS derlemesine
  // gerek yok. Yollar `/kitaplar/hz-{key}/...` kalıbıyla eşleşir.
  const booksTs = readFileSync(join(KOK, "src/data/books.ts"), "utf8");

  const sahneYollari = [
    ...new Set(
      [...booksTs.matchAll(new RegExp(`"(/kitaplar/hz-${bookKey}/[^"]+)"`, "g"))].map((m) => m[1]),
    ),
  ].sort();

  if (sahneYollari.length === 0) {
    console.error(`books.ts içinde "/kitaplar/hz-${bookKey}/..." ile başlayan görsel yolu yok.`);
    console.error("bookKey doğru mu? (ör. adem, sit) · unvanlar için: unvanlar");
    process.exit(1);
  }

  const bolumSayisi = Math.max(
    ...sahneYollari
      .map((y) => y.match(/\/bolum-(\d+)\//))
      .filter(Boolean)
      .map((m) => Number(m[1])),
  );

  console.log(`\nKitap: hz-${bookKey} · ${bolumSayisi} bölüm · ${sahneYollari.length} sahne görseli`);
  console.log(kuruCalisma ? "(--kuru: hiçbir dosya yazılmayacak)\n" : "");

  // Yollar `varlikYollari.ts:kitapKapagi()` ve `haritaDuragiGorseli()` ile
  // birebir aynı kalıptır. Hz. Musa'dan (13 Eki 2026) önce bu iki dosya betikle
  // açılmıyordu; kitap kapağı Hasan üretene kadar hiç yoktu.
  console.log("Kitap kapağı ve harita durağı:");
  yaz(`/kitaplar/hz-${bookKey}/kapak.png`, (hedef) => copyFileSync(KAPAK_YEDEGI, hedef));
  yaz(`/kitaplar/hz-${bookKey}/harita-kapak.jpg`, (hedef) => copyFileSync(DURAK_YEDEGI, hedef));

  console.log("\nBölüm sahneleri (.jpg, 16:9):");
  for (const yol of sahneYollari) {
    yaz(yol, (hedef) => copyFileSync(SAHNE_YEDEGI, hedef));
  }

  console.log("\nRozetler (.png, 512×512 şeffaf):");
  for (let n = 1; n <= bolumSayisi; n++) {
    yaz(`/rozetler/hz-${bookKey}/bolum-${n}.png`, (hedef) =>
      odulPngYaz(hedef, `hz-${bookKey} ${n}. bölüm rozeti`, "rozet", n),
    );
  }

  console.log("\nMadalya (.png, 512×512 şeffaf):");
  yaz(`/madalyalar/hz-${bookKey}.png`, (hedef) =>
    odulPngYaz(hedef, `hz-${bookKey} yolculuk madalyası`, "madalya", null),
  );

  // Yol `varlikYollari.ts:sesliAnlatim()` ile birebir aynı kalıptır.
  console.log("\nSesli anlatım (.mp3, bölüm başına bir kayıt):");
  for (let n = 1; n <= bolumSayisi; n++) {
    yaz(`/sesli-anlatim/hz-${bookKey}/hz-${bookKey}-bolum-${n}.mp3`, (hedef) =>
      copyFileSync(SES_YEDEGI, hedef),
    );
  }
}

console.log(`\n${kuruCalisma ? "Üretilecek" : "Üretilen"}: ${yazilan} · Korunan: ${korunan}`);
console.log("Gerçek görseli/sesi AYNI ADLA üzerine yaz — kod değişmez.\n");
