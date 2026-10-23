// KITAP-HZ-{X}-ICERIK-v2.md hikâye parçalarını önizleme için BookContentBlock dizisine çevirir.
// Kullanım: node scripts/v2-onizleme-uret.mjs src/data/books.ts kitap-icerikleri/KITAP-HZ-NUH-ICERIK-v2.md nuh src/data/nuhV2Onizleme.ts
// Çıkan dosya yalnız `/tasarim/okuma?bolum={bookKey}-N&ornek=v2` önizlemesi içindir; aktarımda silinir.
import { pathToFileURL } from "node:url";
import { copyFileSync, unlinkSync, readFileSync, writeFileSync } from "node:fs";
const [, , booksYolu, mdYolu, anahtar, cikti] = process.argv;
const tmp = booksYolu.replace(/\.ts$/, "") + "_o" + Date.now() + ".ts";
copyFileSync(booksYolu, tmp);
const { books } = await import(pathToFileURL(tmp).href);
unlinkSync(tmp);
const kitap = books.find((b) => b.routePrefix === anahtar);
const altlar = {};
// Tanık Sayfası v2'de değişmez; `[TANIK]` bloğu canlı bölümdeki tanık bloğuyla, sırasıyla doldurulur.
const taniklar = {};
kitap.chapters.forEach((ch, i) => {
  const bloklar = [...ch.paragraphs, ...(ch.continuationParagraphs || [])];
  taniklar[i + 1] = bloklar.filter((b) => b.type === "witness");
  for (const b of bloklar)
    if (b.type === "image") altlar[b.src] = { alt: b.alt, portraitSrc: b.portraitSrc };
});

const md = readFileSync(mdYolu, "utf8");
const POZ = { "konuşma": "konusma", "duruş": "durus", "kutlama": "kutlama" };
const temizle = (s) => s.replace(/\[\[|\]\]/g, "").trim();
const sonuc = {};
for (const parca of md.split(/\n## BÖLÜM /).slice(1)) {
  const no = parca.match(/^(\d+):/)[1];
  const kes = (bas, son) => parca.slice(parca.indexOf(bas) + bas.length, parca.indexOf(son));
  const coz = (metin, ilk) => {
    const bloklar = [];
    const satirlar = metin.split("\n");
    for (let i = 0; i < satirlar.length; i++) {
      const s = satirlar[i];
      if (s.startsWith("```")) {
        const govde = [];
        for (i++; !satirlar[i].startsWith("```"); i++) govde.push(satirlar[i]);
        const g = govde.join("\n");
        const al = (ad) => (g.match(new RegExp(`${ad}: "?(.*?)"?$`, "m")) || [])[1];
        if (g.includes("[KELİME]"))
          bloklar.push({ type: "interactive_word", before: al("Öncesi"), word: al("Kelime"), meaning: al("Anlamı"), after: al("Sonrası") });
        else if (g.includes("[IŞIL]")) {
          const poz = al("Poz");
          bloklar.push({ type: "isil", text: al("Metin"), ...(poz ? { poz: POZ[poz] } : {}) });
        } else if (g.includes("[SORU BAŞLIĞI]"))
          bloklar.push({ type: "soru_basligi", text: g.replace("[SORU BAŞLIĞI]", "").trim() });
        else if (g.includes("[BİLİYOR MUYDUN]")) bloklar.push({ type: "bilgi_kutusu", text: al("Metin") });
        else if (g.includes("[TANIK]")) {
          const tanik = taniklar[no].shift();
          if (!tanik) throw new Error(`${no}. bölümde books.ts'te tanık bloğu yok`);
          bloklar.push(tanik);
        }
        continue;
      }
      const gorsel = s.match(/^\*\*\[GÖRSEL — [a-z]+-(\d+)-([a-z0-9-]+)\]\*\*$/);
      if (gorsel) {
        const src = `/kitaplar/hz-${anahtar}/bolum-${gorsel[1]}/${gorsel[2]}.jpg`;
        if (!altlar[src]) throw new Error("Görsel books.ts'te yok: " + src);
        bloklar.push({ type: "image", src, ...altlar[src] });
        continue;
      }
      if (!s.trim() || s.startsWith("*(")) continue;
      const blok = { type: "text", text: temizle(s) };
      // Bölüm sözlük kelimesiyle açılıyorsa büyük harf verilmez (canlı veri de öyle).
      if (ilk && !bloklar.some((b) => b.type === "text" || b.type === "interactive_word")) blok.dropCap = true;
      bloklar.push(blok);
    }
    return bloklar;
  };
  sonuc[`${anahtar}-${no}`] = {
    contentBlocks: coz(kes("### HİKÂYE — 1. KISIM", "### SEN OLSAYDIN"), true),
    continuationBlocks: coz(kes("### HİKÂYE DEVAM EDİYOR", "### SEÇİMİNİ KARŞILAŞTIR"), false),
  };
}
const ad = `${anahtar.toUpperCase()}_V2_ONIZLEME`;
writeFileSync(
  cikti,
  `import type { BookContentBlock } from "./books";

/**
 * GEÇİCİ — ${kitap.title} v2 hikâye metninin okuma önizlemesi. YALNIZ
 * \`/tasarim/okuma?bolum=${anahtar}-N&ornek=v2\` içindir; gerçek bölümler \`books.ts\` ile açılır.
 * Kaynak: \`kitap-icerikleri/KITAP-HZ-${anahtar.toUpperCase()}-ICERIK-v2.md\` (kurgu işaretleri kaldırıldı).
 * Elle düzenlenmez; v2 değişirse \`node scripts/v2-onizleme-uret.mjs\` ile yeniden üretilir. Aktarımda silinir
 * (Hz. Âdem v2'deki \`ademV2Onizleme.ts\` gibi).
 */
export const ${ad}: Record<
  string,
  { contentBlocks: BookContentBlock[]; continuationBlocks: BookContentBlock[] }
> = ${JSON.stringify(sonuc, null, 2)};
`,
);
for (const [k, v] of Object.entries(sonuc)) console.log(k, v.contentBlocks.length, v.continuationBlocks.length);
