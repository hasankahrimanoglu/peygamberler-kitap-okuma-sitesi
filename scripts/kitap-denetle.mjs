#!/usr/bin/env node
/**
 * KİTAP DENETİMİ — aktarım sonrası sabit kurallı kontrol
 *
 * Bir kitap `books.ts`'e aktarıldıktan sonra, CLAUDE.md'deki "YENİ KİTAP
 * EKLERKEN HIZLI KONTROL" listesinin makineyle denetlenebilen maddelerini
 * çalıştırır. Editoryal kaliteyi (dil, tasvir, kaynak sadakati) DENETLEMEZ;
 * o iş `icerik-denetcisi` ajanınındır.
 *
 * Kullanım:
 *   npm run kitap-denetle -- <bookKey>
 *   npm run kitap-denetle -- idris
 *   npm run kitap-denetle -- adem sit idris
 *   npm run kitap-denetle -- yayindakiler      (katalogda "published" olan hepsi)
 *
 * Kontroller:
 *   - Bölüm sayısı: atlasCatalog.ts chapterCount = books.ts bölüm sayısı
 *     = quizzes.ts soru sayısı (= veli raporu totalQuizQuestions)
 *   - quizConfig'te kitap anahtarı var
 *   - Rozet adları ROZET-MATRISI.md §2 dizininde bu kitaba kayıtlı; başka
 *     kitapla ve kitap içinde çakışmıyor
 *   - interactive_word terimleri SOZLUKCE-SICILI.md'de bu kitaba kayıtlı;
 *     başka kitaba ait değil, kitap içinde tekrar kutulanmıyor, tanımı sicille aynı
 *   - Madalya adı "{Kitap adı} Yolculuk Madalyası" (kitap adının bütün
 *     kaynakları aynı; içerik dosyasındaki ad bununla eşleşiyor)
 *   - Yasak terimler (nişan, ödül rozeti, kitap rozeti, puan, skor) metinde yok
 *   - Her "Sen Olsaydın" şıkkının "Seçimini Karşılaştır" metni var
 *   - Görsel ve ses yer tutucu dosyaları diskte var
 *   - Yayındaki kitapta yer tutucu ses kalmışsa uyarı
 *
 * Çıktı: hata / uyarı / bilgi ayrımlı Türkçe liste. Hata varsa çıkış kodu 1.
 *
 * Not: `.ts` veri dosyaları Node'un yerleşik tip ayıklamasıyla doğrudan içe
 * aktarılır (Node 22.18+ / 24). Veri dosyaları başka modül içe aktarmadığı
 * için derleme gerekmez.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(KOK, "public");

const SAHNE_YEDEGI = join(PUBLIC, "kitaplar/placeholder-sahne.jpg");
const KAPAK_YEDEGI = join(PUBLIC, "kitaplar/placeholder-kapak.png");
const DURAK_YEDEGI = join(PUBLIC, "kitaplar/placeholder-durak.jpg");
const SES_YEDEGI = join(PUBLIC, "sesli-anlatim/placeholder-ses.mp3");
// Yer tutucu ses, Hz. Âdem 1. bölümün GERÇEK kaydının kopyasıdır
// (PROJE-MODELI 6.5). O dosya yedekle aynı olsa da yer tutucu sayılmaz.
const SES_YEDEGININ_KAYNAGI = "/sesli-anlatim/hz-adem/hz-adem-bolum-1.mp3";

/** CLAUDE.md "TERMİNOLOJİ" — yalnız ROZET · MADALYA · UNVAN kullanılır. */
const YASAK_KOKLER = ["nişan", "puan", "skor"];
const YASAK_IFADELER = ["ödül rozeti", "kitap rozeti"];
/** Yasak kökle başlayan ama yasak olmayan sözcükler (nişane = işaret, nişanlı = müstakbel eş). */
const YASAK_ISTISNALARI = ["nişane", "nişanl"];

// --- argümanlar ---------------------------------------------------------------
const argumanlar = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (argumanlar.length === 0) {
  console.error("Kullanım: npm run kitap-denetle -- <bookKey> [<bookKey> …] | yayindakiler");
  process.exit(1);
}

// --- veri ---------------------------------------------------------------------
async function veriYukle(goreli) {
  try {
    return await import(pathToFileURL(join(KOK, goreli)).href);
  } catch (hata) {
    console.error(`${goreli} okunamadı: ${hata.message}`);
    console.error("Bu betik .ts dosyalarını doğrudan okur; Node 22.18 veya üstü gerekir.");
    process.exit(2);
  }
}

const { books, parentReportBooks } = await veriYukle("src/data/books.ts");
const { quizConfig } = await veriYukle("src/data/quizzes.ts");
const { atlasRegions } = await veriYukle("src/data/atlasCatalog.ts");

const katalogKitaplari = atlasRegions.flatMap((r) => r.books);
const katalogByKey = new Map(katalogKitaplari.map((k) => [k.key, k]));

const oku = (goreli) => readFileSync(join(KOK, goreli), "utf8");
const rozetMatrisi = oku("ROZET-MATRISI.md");
const sozlukceSicili = oku("SOZLUKCE-SICILI.md");

// --- yardımcılar --------------------------------------------------------------
const kucult = (s) => s.toLocaleLowerCase("tr-TR").trim();

/** Kitap adı karşılaştırması: "Hz. Âdem" = "hz. adem" = "Hz. Adem". */
const adNormal = (s) =>
  kucult(s)
    .replaceAll("â", "a").replaceAll("î", "i").replaceAll("û", "u")
    .replace(/[‘’'`]/g, "")
    .replace(/\s+/g, " ");

const kitapAdindanKey = new Map(katalogKitaplari.map((k) => [adNormal(k.title), k.key]));

/** Markdown belgesinden iki başlık arasındaki bölümü keser. */
function bolumKes(metin, baslangic, bitis) {
  const satirlar = metin.split("\n");
  const i = satirlar.findIndex((s) => baslangic.test(s));
  if (i < 0) return [];
  const j = satirlar.findIndex((s, n) => n > i && bitis.test(s));
  return satirlar.slice(i + 1, j < 0 ? undefined : j);
}

/** Markdown tablo satırlarını hücre dizisine çevirir (başlık ve ayraç hariç). */
function tabloSatirlari(satirlar) {
  return satirlar
    .filter((s) => s.trim().startsWith("|"))
    .map((s) => s.trim().replace(/^\||\|$/g, "").split("|").map((h) => h.trim().replace(/\*\*/g, "")))
    .filter((h) => !h.every((x) => /^:?-+:?$/.test(x)))
    .slice(1);
}

const ozet = (dosya) => createHash("sha1").update(readFileSync(dosya)).digest("hex");
const yedekOzetleri = new Map();
function yedekleAyniMi(dosya, yedek) {
  if (statSync(dosya).size !== statSync(yedek).size) return false;
  if (!yedekOzetleri.has(yedek)) yedekOzetleri.set(yedek, ozet(yedek));
  return ozet(dosya) === yedekOzetleri.get(yedek);
}

/** Bir nesnenin bütün metin alanlarını konumlarıyla dolaşır. */
function* metinleriDolas(deger, yol) {
  if (typeof deger === "string") yield [yol, deger];
  else if (Array.isArray(deger)) for (const [i, d] of deger.entries()) yield* metinleriDolas(d, `${yol}[${i}]`);
  else if (deger && typeof deger === "object")
    for (const [k, d] of Object.entries(deger)) yield* metinleriDolas(d, yol ? `${yol}.${k}` : k);
}

// --- sicilleri ayrıştır -------------------------------------------------------
// ROZET-MATRISI §2: | # | Rozet adı | Kitap | Bölüm | Durum |
const rozetDizini = tabloSatirlari(bolumKes(rozetMatrisi, /^## 2\./, /^### 2\.1|^## 3\./)).map((h) => ({
  ad: h[1],
  kitap: h[2],
  key: kitapAdindanKey.get(adNormal(h[2])),
  bolum: Number(h[3]),
}));

// SOZLUKCE §2 (sabit): | Terim | Sabit tanım | Kutulandı mı? |
const sabitSozlukce = new Map(
  tabloSatirlari(bolumKes(sozlukceSicili, /^## 2\./, /^## 3\./)).map((h) => [kucult(h[0]), h[1]]),
);
// SOZLUKCE §3: | # | Terim | Tanım | İlk geçtiği yer | Durum |
const sicilTerimleri = new Map(
  tabloSatirlari(bolumKes(sozlukceSicili, /^## 3\./, /^### 3\.1|^## 4\./)).map((h) => {
    const [kitap, bolum] = h[3].split("·").map((x) => x.trim());
    return [kucult(h[1]), { terim: h[1], tanim: h[2], kitap, key: kitapAdindanKey.get(adNormal(kitap)), bolum: Number(bolum) }];
  }),
);

if (rozetDizini.length === 0) console.warn("⚠ ROZET-MATRISI.md §2 tablosu okunamadı — rozet kontrolü boş kalacak.");
if (sicilTerimleri.size === 0) console.warn("⚠ SOZLUKCE-SICILI.md §3 tablosu okunamadı — sözlükçe kontrolü boş kalacak.");

/** Kitabın içerik dosyası (onaylı final varsa o, yoksa Faz 2 taslağı). */
function icerikDosyasi(key) {
  const ad = `KITAP-HZ-${key.toLocaleUpperCase("en-US")}`;
  for (const aday of [`${ad}-ICERIK-final.md`, `${ad}-FINAL.md`, `${ad}-ICERIK-FAZ2-taslak.md`]) {
    if (existsSync(join(KOK, "kitap-icerikleri", aday))) return `kitap-icerikleri/${aday}`;
  }
  return null;
}

// --- denetim ------------------------------------------------------------------
function denetle(key) {
  const hatalar = [];
  const uyarilar = [];
  const bilgiler = [];
  const gecenler = [];

  const katalog = katalogByKey.get(key);
  const kitap = books.find((b) => b.routePrefix === key);
  const rapor = parentReportBooks.find((r) => r.key === key);
  const quiz = quizConfig[key];

  const baslik = katalog ? `${katalog.title} (${key})` : key;
  console.log(`\n━━━ Kitap denetimi · ${baslik} · ${katalog?.availability ?? "katalogda yok"} ━━━`);

  if (!katalog) hatalar.push(`atlasCatalog.ts'te "${key}" anahtarlı kitap yok. bookKey doğru mu?`);
  if (!kitap) hatalar.push(`books.ts'te routePrefix "${key}" olan kitap yok — aktarım yapılmamış.`);
  if (!katalog || !kitap) return yazdir({ hatalar, uyarilar, bilgiler, gecenler });

  const yayinda = katalog.availability === "published";
  const bolumler = kitap.chapters;
  const bolumAdi = (i) => `Bölüm ${i + 1}`;

  // 1. Bölüm sayısı ------------------------------------------------------------
  if (!quiz) {
    hatalar.push(`quizzes.ts → quizConfig'te "${key}" anahtarı yok (final testi eklenmemiş).`);
  }
  const sayilar = {
    "katalog chapterCount": katalog.chapterCount,
    "books.ts bölüm": bolumler.length,
    "final testi soru": quiz?.questions.length ?? 0,
    ...(rapor ? { "veli raporu totalQuizQuestions": rapor.totalQuizQuestions } : {}),
  };
  const sayiMetni = Object.entries(sayilar).map(([k, v]) => `${k} ${v}`).join(" · ");
  if (new Set(Object.values(sayilar)).size === 1) gecenler.push(`Bölüm sayısı tutarlı: ${sayiMetni}`);
  else hatalar.push(`Bölüm sayıları eşit değil: ${sayiMetni}`);

  if (!rapor) hatalar.push(`books.ts → parentReportBooks'ta "${key}" kaydı yok (veli raporu eklenmemiş).`);
  if (bolumler.some((b, i) => b.id !== String(i + 1)))
    hatalar.push(`Bölüm kimlikleri 1'den başlayıp sırayla gitmiyor: ${bolumler.map((b) => b.id).join(", ")}`);

  quiz?.questions.forEach((s, i) => {
    if (s.options.length !== 3 || !s.options.some((o) => o.id === s.correctOption))
      hatalar.push(`Final testi ${i + 1}. soru: 3 şık yok ya da doğru şık (${s.correctOption}) şıklar arasında değil.`);
  });

  // 2. Rozet adları --------------------------------------------------------------
  const rozetHatasi = hatalar.length;
  const gorulenRozetler = new Map();
  bolumler.forEach((b, i) => {
    const ad = b.badgeName?.trim();
    if (!ad) return hatalar.push(`${bolumAdi(i)}: rozet adı (badgeName) boş.`);
    if (gorulenRozetler.has(ad))
      hatalar.push(`Rozet adı kitap içinde tekrar ediyor: "${ad}" (${gorulenRozetler.get(ad)} ve ${bolumAdi(i)}).`);
    gorulenRozetler.set(ad, bolumAdi(i));

    const kelime = ad.split(/\s+/).length;
    if (!ad.endsWith(" Rozeti") || kelime < 2 || kelime > 4)
      uyarilar.push(`${bolumAdi(i)}: "${ad}" biçimi "{değer} Rozeti" (2–4 kelime) kuralına uymuyor (ROZET-MATRISI §1.1).`);

    const kayitlar = rozetDizini.filter((r) => kucult(r.ad) === kucult(ad));
    const baskasi = kayitlar.filter((r) => r.key !== key);
    const kendisi = kayitlar.find((r) => r.key === key);
    for (const r of baskasi)
      hatalar.push(`ROZET ÇAKIŞMASI — ${bolumAdi(i)}: "${ad}" ROZET-MATRISI §2'de ${r.kitap} ${r.bolum}. bölüme kayıtlı.`);
    if (!kendisi && baskasi.length === 0)
      hatalar.push(`${bolumAdi(i)}: "${ad}" ROZET-MATRISI §2 dizinine kaydedilmemiş (matris güncellenmedi).`);
    else if (kendisi && kendisi.bolum !== i + 1)
      uyarilar.push(`${bolumAdi(i)}: "${ad}" matriste ${kendisi.bolum}. bölüm olarak kayıtlı.`);
  });
  for (const r of rozetDizini.filter((r) => r.key === key && !gorulenRozetler.has(r.ad)))
    uyarilar.push(`ROZET-MATRISI §2'de bu kitaba kayıtlı "${r.ad}" books.ts'te kullanılmıyor.`);
  if (hatalar.length === rozetHatasi) gecenler.push(`Rozet adları (${gorulenRozetler.size}) matriste kayıtlı, çakışma yok.`);

  // 3. Etkileşimli kelimeler -----------------------------------------------------
  const sozlukHatasi = hatalar.length;
  const gorulenTerimler = new Map();
  bolumler.forEach((b, i) => {
    const bloklar = [...b.paragraphs, ...(b.continuationParagraphs ?? [])];
    for (const blok of bloklar.filter((x) => x.type === "interactive_word")) {
      const terim = kucult(blok.word);
      if (gorulenTerimler.has(terim)) {
        hatalar.push(
          `"${blok.word}" kitap içinde ikinci kez kutulanmış (${gorulenTerimler.get(terim)} ve ${bolumAdi(i)}) — ikincisi düz text olmalı.`,
        );
        continue;
      }
      gorulenTerimler.set(terim, bolumAdi(i));

      const sabit = sabitSozlukce.get(terim);
      if (sabit && blok.meaning.trim() !== sabit)
        hatalar.push(`${bolumAdi(i)}: "${blok.word}" sabit sözlükçe terimi; tanım SOZLUKCE-SICILI §2 ile harfiyen aynı değil.`);

      const kayit = sicilTerimleri.get(terim);
      if (!kayit) {
        hatalar.push(`${bolumAdi(i)}: "${blok.word}" SOZLUKCE-SICILI §3'e kaydedilmemiş (sicil güncellenmedi).`);
      } else if (kayit.key !== key) {
        hatalar.push(
          `SÖZLÜKÇE ÇAKIŞMASI — ${bolumAdi(i)}: "${blok.word}" sicilde ${kayit.kitap} · ${kayit.bolum}'e ait; bu kitapta düz text olmalı.`,
        );
      } else {
        if (kayit.tanim !== blok.meaning.trim())
          hatalar.push(`${bolumAdi(i)}: "${blok.word}" tanımı sicildeki tanımdan farklı (bir terim = bir tanım).`);
        if (kayit.bolum !== i + 1)
          uyarilar.push(`"${blok.word}" books.ts'te ${bolumAdi(i)}'de kutulu, sicilde "${kayit.kitap} · ${kayit.bolum}" yazıyor.`);
      }
    }
  });
  for (const k of [...sicilTerimleri.values()].filter((k) => k.key === key && !gorulenTerimler.has(kucult(k.terim))))
    uyarilar.push(`SOZLUKCE-SICILI §3'te bu kitaba kayıtlı "${k.terim}" books.ts'te kutulu değil.`);
  if (hatalar.length === sozlukHatasi)
    gecenler.push(`Etkileşimli kelimeler (${gorulenTerimler.size}) sicilde bu kitaba kayıtlı, tekrar ve çakışma yok.`);

  // 4. Madalya adı ---------------------------------------------------------------
  const madalya = `${katalog.title} Yolculuk Madalyası`;
  const adKaynaklari = {
    "atlasCatalog.ts title": katalog.title,
    "books.ts title": kitap.title,
    ...(rapor ? { "parentReportBooks title": rapor.title } : {}),
    ...(quiz ? { "quizConfig label": quiz.label } : {}),
  };
  const farkliAdlar = Object.entries(adKaynaklari).filter(([, v]) => v !== katalog.title);
  if (farkliAdlar.length)
    hatalar.push(
      `Kitap adı kaynaklar arasında farklı, madalya adı ekranlarda farklı çıkar: ${Object.entries(adKaynaklari)
        .map(([k, v]) => `${k} "${v}"`)
        .join(" · ")}`,
    );
  const icerik = icerikDosyasi(key);
  if (icerik) {
    const yanlis = [...oku(icerik).matchAll(/([^\n|*`:]*?)\s*Yolculuk\s+Madalyası/g)]
      .map((m) => `${m[1].trim()} Yolculuk Madalyası`)
      .filter((ad) => /^Hz\./.test(ad) && adNormal(ad) !== adNormal(madalya));
    if (yanlis.length) hatalar.push(`${icerik} farklı madalya adı yazıyor: ${[...new Set(yanlis)].join(", ")} — beklenen "${madalya}".`);
  } else {
    uyarilar.push(`kitap-icerikleri/ altında bu kitabın içerik dosyası bulunamadı; madalya adı içerikle karşılaştırılamadı.`);
  }
  if (!farkliAdlar.length) gecenler.push(`Madalya adı: "${madalya}"${icerik ? ` (${icerik} ile eşleşiyor)` : ""}.`);

  // 5. Yasak terimler ------------------------------------------------------------
  const yasakHatasi = hatalar.length;
  const taranacak = [
    ["books.ts", kitap],
    ["books.ts veli raporu", rapor],
    ["quizzes.ts", quiz],
    ["atlasCatalog.ts", katalog],
  ];
  for (const [dosya, veri] of taranacak) {
    if (!veri) continue;
    for (const [yol, metin] of metinleriDolas(veri, "")) {
      const kucuk = kucult(metin);
      const bulunan = [
        ...YASAK_IFADELER.filter((ifade) => kucuk.includes(ifade)),
        ...[...kucuk.matchAll(new RegExp(`(?<!\\p{L})(${YASAK_KOKLER.join("|")})\\p{L}*`, "gu"))]
          .map((m) => m[0])
          .filter((s) => !YASAK_ISTISNALARI.some((ist) => s.startsWith(ist))),
      ];
      if (bulunan.length) {
        const konum = yol.replace(/^chapters\[(\d+)\]\.?/, (_, n) => `Bölüm ${Number(n) + 1} › `);
        hatalar.push(`Yasak terim "${[...new Set(bulunan)].join(", ")}" — ${dosya} · ${konum}`);
      }
    }
  }
  if (hatalar.length === yasakHatasi) gecenler.push("Yasak terim yok (nişan · ödül rozeti · kitap rozeti · puan · skor).");

  // 6. Sen Olsaydın şıkları ------------------------------------------------------
  const secimHatasi = hatalar.length;
  bolumler.forEach((b, i) => {
    if (!b.has_question || !b.question) return hatalar.push(`${bolumAdi(i)}: "Sen Olsaydın" sorusu yok.`);
    const secenekler = b.question.options ?? [];
    if (secenekler.length !== 3) hatalar.push(`${bolumAdi(i)}: "Sen Olsaydın" ${secenekler.length} şıklı (3 olmalı).`);
    const eksik = secenekler.filter((o) => !o.comparison?.trim()).map((o) => o.id.toLocaleUpperCase("tr-TR"));
    if (eksik.length) hatalar.push(`${bolumAdi(i)}: ${eksik.join(", ")} şıkkının "Seçimini Karşılaştır" metni yok.`);
    if (!b.continuationParagraphs?.length) hatalar.push(`${bolumAdi(i)}: "Hikâye Devam Ediyor" (continuationParagraphs) boş.`);
    if (b.learned?.length !== 3) uyarilar.push(`${bolumAdi(i)}: "Ne Öğrendik" ${b.learned?.length ?? 0} madde (3 olmalı).`);
  });
  if (hatalar.length === secimHatasi)
    gecenler.push(`Her bölümde "Sen Olsaydın" 3 şıklı ve her şıkkın karşılaştırma metni var.`);

  // 7. Yer tutucu dosyalar -------------------------------------------------------
  const dosyaHatasi = hatalar.length;
  const sahneler = [
    ...new Set(
      bolumler.flatMap((b) => [
        ...(b.coverIllustration ? [b.coverIllustration.src] : []),
        ...[...b.paragraphs, ...(b.continuationParagraphs ?? [])].filter((x) => x.type === "image").map((x) => x.src),
      ]),
    ),
  ];
  const eksikDosyalar = [];
  let yedekSahne = 0;
  for (const yol of sahneler) {
    const tam = join(PUBLIC, yol);
    if (!existsSync(tam)) eksikDosyalar.push(yol);
    else if (yedekleAyniMi(tam, SAHNE_YEDEGI)) yedekSahne++;
  }
  const odulYollari = [
    ...bolumler.map((_, i) => `/rozetler/hz-${key}/bolum-${i + 1}.png`),
    `/madalyalar/hz-${key}.png`,
  ];
  eksikDosyalar.push(...odulYollari.filter((y) => !existsSync(join(PUBLIC, y))));

  const sesYollari = bolumler.map((_, i) => `/sesli-anlatim/hz-${key}/hz-${key}-bolum-${i + 1}.mp3`);
  const yedekSesler = [];
  for (const yol of sesYollari) {
    const tam = join(PUBLIC, yol);
    if (!existsSync(tam)) eksikDosyalar.push(yol);
    else if (yol !== SES_YEDEGININ_KAYNAGI && yedekleAyniMi(tam, SES_YEDEGI)) yedekSesler.push(yol);
  }

  if (eksikDosyalar.length)
    hatalar.push(
      `${eksikDosyalar.length} dosya diskte yok → \`npm run gorsel-yertutucu -- ${key}\` çalıştır:\n` +
        eksikDosyalar.map((y) => `      ${y}`).join("\n"),
    );
  const yedekKapaklar = [];
  for (const [y, yedek] of [
    [`/kitaplar/hz-${key}/kapak.png`, KAPAK_YEDEGI],
    [`/kitaplar/hz-${key}/harita-kapak.jpg`, DURAK_YEDEGI],
  ]) {
    const tam = join(PUBLIC, y);
    if (!existsSync(tam)) uyarilar.push(`${y} yok → \`npm run gorsel-yertutucu -- ${key}\` yer tutucusunu açar (ekran şimdilik yedeğe düşüyor).`);
    else if (yedekleAyniMi(tam, yedek)) yedekKapaklar.push(y);
  }
  if (yedekKapaklar.length) {
    const metin = `Kitap kapağı / harita durağı hâlâ yer tutucu: ${yedekKapaklar.join(", ")}`;
    if (yayinda) uyarilar.push(`YAYINDA YER TUTUCU KAPAK — ${metin}.`);
    else bilgiler.push(`${metin} — yayından önce gerçek görselle değiştirilmeli.`);
  }
  if (hatalar.length === dosyaHatasi)
    gecenler.push(
      `Görsel ve ses dosyaları diskte: ${sahneler.length} sahne · ${bolumler.length} rozet · 1 madalya · ${sesYollari.length} ses.`,
    );

  if (yedekSesler.length) {
    const metin = `${yedekSesler.length}/${sesYollari.length} bölümün sesi hâlâ yer tutucu (başka bölümün anlatımı): ${yedekSesler
      .map((y) => y.match(/bolum-(\d+)/)[1])
      .join(", ")}. bölüm`;
    if (yayinda) uyarilar.push(`YAYINDA YER TUTUCU SES — ${metin}. Çocuk yanlış anlatımı dinler (PROJE-MODELI 6.5).`);
    else bilgiler.push(`${metin} — yayından önce gerçek kayıtla değiştirilmeli.`);
  }
  if (yedekSahne) bilgiler.push(`${yedekSahne}/${sahneler.length} sahne görseli hâlâ yer tutucu (placeholder-sahne.jpg kopyası).`);

  // 8. Katalog yayın alanları ----------------------------------------------------
  if (yayinda) {
    if (!katalog.description?.trim()) hatalar.push("Katalogda yayındaki kitabın keşif açıklaması (description) boş.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(katalog.yayinTarihi ?? ""))
      hatalar.push(`Katalogda yayınTarihi YYYY-AA-GG biçiminde değil: "${katalog.yayinTarihi ?? ""}".`);
  } else {
    bilgiler.push(`Katalog durumu "${katalog.availability}" — kitap henüz ana ekranda görünmüyor.`);
  }

  return yazdir({ hatalar, uyarilar, bilgiler, gecenler });
}

function yazdir({ hatalar, uyarilar, bilgiler, gecenler }) {
  if (gecenler.length) {
    console.log("\nGeçen kontroller:");
    for (const g of gecenler) console.log(`  ✔ ${g}`);
  }
  if (hatalar.length) {
    console.log(`\nHATALAR (${hatalar.length}) — düzeltilmeden aktarım bitmiş sayılmaz:`);
    for (const h of hatalar) console.log(`  ✖ ${h}`);
  }
  if (uyarilar.length) {
    console.log(`\nUYARILAR (${uyarilar.length}):`);
    for (const u of uyarilar) console.log(`  ⚠ ${u}`);
  }
  if (bilgiler.length) {
    console.log("\nBilgi:");
    for (const b of bilgiler) console.log(`  · ${b}`);
  }
  console.log(`\nSonuç: ${hatalar.length} hata · ${uyarilar.length} uyarı`);
  return hatalar.length;
}

// --- çalıştır -----------------------------------------------------------------
const anahtarlar = argumanlar.flatMap((a) =>
  a === "yayindakiler" ? katalogKitaplari.filter((k) => k.availability === "published").map((k) => k.key) : [a],
);

let toplamHata = 0;
for (const key of anahtarlar) toplamHata += denetle(key);

if (anahtarlar.length > 1) console.log(`\n━━━ Toplam: ${anahtarlar.length} kitap · ${toplamHata} hata ━━━`);
console.log("");
process.exit(toplamHata > 0 ? 1 : 0);
