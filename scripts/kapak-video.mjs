#!/usr/bin/env node
/**
 * BÖLÜM KAPAK VİDEOSU (DENEME — 23 Eki 2026, Hasan; PROJE-MODELI 6.6)
 *
 * Hasan'ın ürettiği kapak videolarının sitedeki kopyasını yazar:
 *   gorsel-kaynaklari/kitaplar/hz-{bookKey}/bölüm kapak videoları/…bolum{n}-kapak.mp4
 *   → public/kitaplar/hz-{bookKey}/bolum-{n}/kapak.mp4
 * ve `src/data/kapakVideolari.json` listesini `public/`'teki dosyalara göre
 * yeniden üretir. Okuma ekranı videoyu yalnız bu listedeki bölümlerde çizer.
 *
 * Kullanım:
 *   npm run kapak-video -- yusuf             (yalnız Hz. Yusuf)
 *   npm run kapak-video                      (kaynak klasörü olan bütün kitaplar)
 *   npm run kapak-video -- yusuf --yeniden   (güncel olanları da yeniden yazar)
 *   npm run kapak-video -- --liste           (yalnız listeyi yeniler)
 *
 * Kurallar:
 *   - Kaynak adı `bolum{n}-kapak.mp4` ya da `bolum-{n}-kapak.mp4` ile bitmeli
 *     (önünde `yusuf-` gibi ek olabilir). Başka adlı dosyalar (ör. hikâye içi
 *     sahne videosu) atlanır. Aynı bölüme iki dosya düşerse ikisi de atlanır.
 *   - Çıktı 1280 px genişlik, 30 kare/sn, H.264, sessiz. Üretim videoları 24
 *     kare/sn'dir; 60 Hz ekranda hızlı kamera hareketinde takılır, ffmpeg ara
 *     kare üretir. 720p ölçümde orijinalden gözle ayrılmıyor (VMAF 92–97).
 *   - Kaynaktan yeni olan çıktı yeniden yazılmaz (`--yeniden` hariç). Kaynak
 *     dosyaya dokunulmaz.
 *   - ffmpeg gerekir: `brew install ffmpeg`.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const KITAPLAR = join(KOK, "public/kitaplar");
const KAYNAKLAR = join(KOK, "gorsel-kaynaklari/kitaplar");
const KAYNAK_KLASORU = "bölüm kapak videoları";
const LISTE = join(KOK, "src/data/kapakVideolari.json");
const KAYNAK_ADI = /bolum-?(\d+)-kapak\.mp4$/i;
const FFMPEG_FILTRESI =
  "scale=1280:-2:flags=lanczos,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1";

const [, , ...argumanlar] = process.argv;
const yeniden = argumanlar.includes("--yeniden");
const yalnizListe = argumanlar.includes("--liste");
const bookKey = argumanlar.find((a) => !a.startsWith("--"));

const mb = (bayt) => `${(bayt / 1048576).toFixed(1)} MB`;

function kaynakKlasoru(key) {
  return join(KAYNAKLAR, `hz-${key}`, KAYNAK_KLASORU);
}

function videoyuYaz(kaynak, hedef) {
  const gecici = hedef.replace(/\.mp4$/, ".yaziliyor.mp4");
  const sonuc = spawnSync(
    "ffmpeg",
    [
      "-v", "error", "-y", "-i", kaynak,
      "-an", "-map_metadata", "-1",
      "-vf", FFMPEG_FILTRESI,
      "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      gecici,
    ],
    { stdio: ["ignore", "ignore", "pipe"], encoding: "utf8" },
  );
  if (sonuc.status !== 0) {
    rmSync(gecici, { force: true });
    throw new Error(sonuc.stderr?.trim() || `ffmpeg çıkış kodu ${sonuc.status}`);
  }
  renameSync(gecici, hedef);
}

function kitabiIsle(key) {
  const klasor = kaynakKlasoru(key);
  if (!existsSync(klasor)) {
    console.error(`Kaynak klasör yok: ${relative(KOK, klasor)}`);
    process.exitCode = 1;
    return;
  }

  const bolumler = new Map();
  const atlananlar = [];
  for (const ad of readdirSync(klasor).sort()) {
    if (ad.startsWith(".")) continue;
    const eslesme = ad.match(KAYNAK_ADI);
    if (!eslesme) {
      atlananlar.push(ad);
      continue;
    }
    const no = Number(eslesme[1]);
    bolumler.set(no, [...(bolumler.get(no) ?? []), ad]);
  }

  console.log(`hz-${key}`);
  for (const [no, adlar] of [...bolumler].sort((a, b) => a[0] - b[0])) {
    if (adlar.length > 1) {
      console.log(`  ${no}. bölüm: ATLANDI — birden çok kaynak (${adlar.join(", ")})`);
      process.exitCode = 1;
      continue;
    }
    const bolumKlasoru = join(KITAPLAR, `hz-${key}`, `bolum-${no}`);
    if (!existsSync(bolumKlasoru)) {
      console.log(`  ${no}. bölüm: ATLANDI — ${relative(KOK, bolumKlasoru)} yok`);
      process.exitCode = 1;
      continue;
    }
    const kaynak = join(klasor, adlar[0]);
    const hedef = join(bolumKlasoru, "kapak.mp4");
    if (!yeniden && existsSync(hedef) && statSync(hedef).mtimeMs >= statSync(kaynak).mtimeMs) {
      console.log(`  ${no}. bölüm: güncel (${mb(statSync(hedef).size)})`);
      continue;
    }
    try {
      videoyuYaz(kaynak, hedef);
      console.log(`  ${no}. bölüm: ${mb(statSync(kaynak).size)} → ${mb(statSync(hedef).size)}`);
    } catch (hata) {
      console.log(`  ${no}. bölüm: HATA — ${hata.message}`);
      process.exitCode = 1;
    }
  }
  if (atlananlar.length) console.log(`  Kapak adı taşımadığı için atlanan: ${atlananlar.join(", ")}`);
}

/** Listeyi `public/`'te gerçekten duran videolardan üretir; elle yazılmaz. */
function listeyiYaz() {
  const liste = {};
  for (const kitap of readdirSync(KITAPLAR).filter((ad) => ad.startsWith("hz-")).sort()) {
    const klasor = join(KITAPLAR, kitap);
    if (!statSync(klasor).isDirectory()) continue;
    const nolar = readdirSync(klasor)
      .map((ad) => ad.match(/^bolum-(\d+)$/))
      .filter((m) => m && existsSync(join(klasor, m[0], "kapak.mp4")))
      .map((m) => Number(m[1]))
      .sort((a, b) => a - b);
    if (nolar.length) liste[kitap.slice(3)] = nolar;
  }
  const yeni = `${JSON.stringify(liste, null, 2)}\n`;
  const eski = existsSync(LISTE) ? readFileSync(LISTE, "utf8") : "";
  if (yeni !== eski) writeFileSync(LISTE, yeni);
  const ozet = Object.entries(liste).map(([key, nolar]) => `${key} (${nolar.length})`).join(", ");
  console.log(`${relative(KOK, LISTE)}: ${ozet || "boş"}${yeni === eski ? " — değişmedi" : " — güncellendi"}`);
}

if (!yalnizListe) {
  if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status !== 0) {
    console.error("ffmpeg bulunamadı. Kurmak için: brew install ffmpeg");
    process.exit(1);
  }
  const kitaplar = bookKey
    ? [bookKey]
    : existsSync(KAYNAKLAR)
      ? readdirSync(KAYNAKLAR)
          .filter((ad) => ad.startsWith("hz-") && existsSync(join(KAYNAKLAR, ad, KAYNAK_KLASORU)))
          .map((ad) => ad.slice(3))
      : [];
  for (const key of kitaplar) kitabiIsle(key);
}
listeyiYaz();
