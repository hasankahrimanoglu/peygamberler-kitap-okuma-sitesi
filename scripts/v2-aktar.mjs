// Onaylanmış KITAP-HZ-{X}-ICERIK-v2.md'yi koda aktarır (karma tarz yeniden yazımı, PROJE-MODELI 10).
// Kullanım: node scripts/v2-aktar.mjs {bookKey}          → yalnız rapor (hiçbir dosya değişmez)
//           node scripts/v2-aktar.mjs {bookKey} --yaz    → books.ts + quizzes.ts'e yazar, sonra doğrular
// Yazdıkları: bölümlerin `paragraphs` / `continuationParagraphs` dizileri (v2-onizleme-uret.mjs dönüşümü),
// v2'deki `Özet:` ve NE ÖĞRENDİK, final.md F5 → `parent_faq`, final.md E → `{key}QuizQuestions`.
// Yazmadıkları (rapor eder, elle yapılır): görsel alt metni, Sen Olsaydın/karşılaştırma/görev değişiklikleri.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";

const [, , anahtar, kip] = process.argv;
if (!anahtar) throw new Error("Kullanım: node scripts/v2-aktar.mjs {bookKey} [--yaz]");
const yaz = kip === "--yaz";
const BOOKS = "src/data/books.ts";
const QUIZ = "src/data/quizzes.ts";
const BUYUK = anahtar.toUpperCase();
const V2 = `kitap-icerikleri/KITAP-HZ-${BUYUK}-ICERIK-v2.md`;
const FINAL = `kitap-icerikleri/KITAP-HZ-${BUYUK}-ICERIK-final.md`;

// TS dosyasını gizli geçici kopyadan içe aktarır (açık dev sunucusunda Tailwind takılmasın diye).
const iceAl = async (yol) => {
  const tmp = join(dirname(yol), "." + basename(yol, ".ts") + "_a" + Date.now() + ".ts");
  copyFileSync(yol, tmp);
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    unlinkSync(tmp);
  }
};
// Düz çift tırnakları books.ts'teki gibi “…” yapar; *eser adı* yıldızlarını kaldırır.
const tirnak = (s) => {
  if ((s.match(/"/g) || []).length % 2) throw new Error("tek sayıda tırnak: " + s.slice(0, 60));
  let ac = true;
  return s.replace(/"/g, () => ((ac = !ac) ? "”" : "“")).replace(/\*([^*]+)\*/g, "$1");
};

// 1. v2 → blok dizileri (önizleme betiğiyle aynı dönüşüm; Hasan'ın okuduğu veri).
const gecici = join(mkdtempSync(join(tmpdir(), "v2-aktar-")), "onizleme.ts");
execFileSync("node", ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/v2-onizleme-uret.mjs", BOOKS, V2, anahtar, gecici], { stdio: "ignore" });
const v2Bloklar = Object.values(await import(pathToFileURL(gecici).href))[0];

const onceki = await iceAl(BOOKS);
const kitap = onceki.books.find((b) => b.routePrefix === anahtar);
const md = readFileSync(V2, "utf8");
const fmd = readFileSync(FINAL, "utf8");

// 2. Sabit alanlar: v2'deki Özet ve NE ÖĞRENDİK ↔ books.ts.
const sabit = [];
md.split(/\n## BÖLÜM /).slice(1).forEach((parca) => {
  const no = Number(parca.match(/^(\d+):/)[1]);
  const ch = kitap.chapters[no - 1];
  const ozet = parca.match(/^Özet: (.+)$/m)?.[1];
  if (ozet && tirnak(ozet) !== ch.ozet) sabit.push({ no, alan: "ozet", eski: ch.ozet, yeni: tirnak(ozet) });
  const ne = parca.split("### NE ÖĞRENDİK")[1]?.split(/\n###? /)[0] ?? "";
  [...ne.matchAll(/^\d\. (.+)$/gm)].forEach((m, i) => {
    if (tirnak(m[1]) !== ch.learned[i]) sabit.push({ no, alan: `learned[${i}]`, eski: ch.learned[i], yeni: tirnak(m[1]) });
  });
});

// 3. final.md F5 → parent_faq.
const f5 = fmd.slice(fmd.indexOf("### F5."), fmd.indexOf("\n## ", fmd.indexOf("### F5.")));
const faq = f5.split(/\n(?=\*\*")/).slice(1).map((p) => {
  const [ilk, ...geri] = p.split("\n");
  const govde = [];
  for (const s of geri) { if (!s.trim()) break; govde.push(s.trim()); }
  return { question: ilk.match(/^\*\*"(.*)"\*\*$/)[1], approach: tirnak(govde.join(" ")) };
});
const eskiFaq = onceki.parentReportBooks.find((b) => b.key === anahtar).parent_faq;

// 4. final.md E → final testi.
const E = fmd.slice(fmd.indexOf("## E."), fmd.indexOf("\n## ", fmd.indexOf("## E.") + 5));
const quiz = [...E.matchAll(/Soru (\d+): (.*)\nA\) (.*)\nB\) (.*)\nC\) (.*)\nDoğru seçenek: ([ABC])/g)].map((m) => ({
  id: Number(m[1]), question: tirnak(m[2]), correctOption: m[6].toLowerCase(),
  options: [m[3], m[4], m[5]].map((t, i) => ({ id: "abc"[i], text: tirnak(t) })),
}));
const qSrc = readFileSync(QUIZ, "utf8");
const qBas = qSrc.indexOf(`const ${anahtar}QuizQuestions`);
const qSon = qSrc.indexOf("\n];\n", qBas) + 4;
const eskiQuiz = eval(qSrc.slice(qBas, qSon).replace(/^const \w+: QuizQuestion\[\] = /, "(").replace(/;\s*$/, ")"));

// Rapor.
const fark = (a, b) => a.filter((x, i) => !isDeepStrictEqual(x, b[i])).length;
console.log(`${anahtar}: ${Object.keys(v2Bloklar).length} bölüm`);
sabit.forEach((s) => console.log(`  SABİT B${s.no} ${s.alan}\n    eski: ${s.eski}\n    yeni: ${s.yeni}`));
console.log(`  veli raporu: ${eskiFaq.length} → ${faq.length} madde, ${fark(faq, eskiFaq) + Math.max(0, eskiFaq.length - faq.length)} değişen`);
console.log(`  final testi: ${quiz.length} soru (eski ${eskiQuiz.length}), ${fark(quiz, eskiQuiz)} değişen`);
if (quiz.length !== kitap.chapters.length) throw new Error("final testi soru sayısı bölüm sayısına eşit değil");
if (!yaz) process.exit(0);

// Yazım. Blokları books.ts biçiminde dizer.
const q = JSON.stringify;
const I = "          ";
const blok = (b) =>
  ["text", "isil", "soru_basligi", "bilgi_kutusu"].includes(b.type)
    ? `${I}{ ${Object.entries(b).map(([k, v]) => `${k}: ${q(v)}`).join(", ")} },`
    : [`${I}{`, ...Object.entries(b).map(([k, v]) => `${I}  ${k}: ${q(v)},`), `${I}},`].join("\n");

let src = readFileSync(BOOKS, "utf8");
const bas = src.indexOf(`    id: "hz-${anahtar}",`);
let son = src.indexOf('\n    id: "hz-', bas + 10);
if (son < 0) son = src.indexOf("\n];", bas);
let k = src.slice(bas, son);
let imlec = 0;
for (const no of Object.keys(v2Bloklar).map((x) => Number(x.split("-").pop()))) {
  const id = k.indexOf(`        id: "${no}",\n`, imlec);
  const p = k.indexOf("        paragraphs: [\n", id);
  const c = k.indexOf("        ],\n        continuationParagraphs: [\n", p);
  const kapa = k.indexOf("\n        ],\n", c + 10);
  if (id < 0 || p < 0 || c < 0 || kapa < 0) throw new Error(`${no}. bölümün dizileri bulunamadı`);
  const v = v2Bloklar[`${anahtar}-${no}`];
  const yeni = "        paragraphs: [\n" + v.contentBlocks.map(blok).join("\n") +
    "\n        ],\n        continuationParagraphs: [\n" + v.continuationBlocks.map(blok).join("\n");
  k = k.slice(0, p) + yeni + k.slice(kapa);
  imlec = p + yeni.length;
}
for (const s of sabit) {
  const n = k.split(q(s.eski)).length - 1;
  if (n !== 1) throw new Error(`B${s.no} ${s.alan}: eski metin ${n} kez bulundu, elle aktar`);
  k = k.replace(q(s.eski), q(s.yeni));
}
src = src.slice(0, bas) + k + src.slice(son);
const fBas = src.indexOf("    parent_faq: [\n", src.indexOf(`    key: "${anahtar}",`));
const fSon = src.indexOf("\n    ],\n", fBas);
src = src.slice(0, fBas) + "    parent_faq: [\n" +
  faq.map((m) => `      {\n        question: ${q(m.question)},\n        approach: ${q(m.approach)},\n      },`).join("\n") +
  src.slice(fSon);
writeFileSync(BOOKS, src);

const qYeni = qSrc.slice(qBas, qSrc.indexOf("= [", qBas) + 3) + "\n" + quiz.map((s) =>
  `  {\n    id: ${s.id},\n    question: ${q(s.question)},\n    correctOption: ${q(s.correctOption)},\n    options: [\n` +
  s.options.map((o) => `      { id: "${o.id}", text: ${q(o.text)} },`).join("\n") + "\n    ],\n  },").join("\n") + "\n];\n";
writeFileSync(QUIZ, qSrc.slice(0, qBas) + qYeni + qSrc.slice(qSon));

// Doğrulama: hedef kitap v2 ile birebir, öteki her şey aynı.
const sonra = await iceAl(BOOKS);
const hedef = sonra.books.find((b) => b.routePrefix === anahtar);
hedef.chapters.forEach((ch, i) => {
  const v = v2Bloklar[`${anahtar}-${i + 1}`];
  if (!isDeepStrictEqual(ch.paragraphs, v.contentBlocks) || !isDeepStrictEqual(ch.continuationParagraphs, v.continuationBlocks))
    throw new Error(`${i + 1}. bölüm v2 ile birebir değil`);
});
const temiz = (b) => ({ ...b, chapters: b.chapters.map(({ paragraphs, continuationParagraphs, ozet, learned, ...r }) => r) });
sonra.books.forEach((b, i) => {
  const ayni = b.routePrefix === anahtar ? isDeepStrictEqual(temiz(b), temiz(onceki.books[i])) : isDeepStrictEqual(b, onceki.books[i]);
  if (!ayni) throw new Error(`${b.routePrefix}: beklenmeyen değişiklik`);
});
if (!isDeepStrictEqual(sonra.parentReportBooks.find((b) => b.key === anahtar).parent_faq, faq)) throw new Error("parent_faq yazılamadı");
console.log("yazıldı ve doğrulandı");
