/**
 * Rota arka planındaki ırmakların suyunu görselden ölçer ve canlı çayır
 * katmanının akış çizgilerini üretir.
 *
 *   node scripts/canli-cayir-irmaklari.mjs
 *
 * Çıktı: src/components/cocuk/canliCayirIrmaklari.ts (elle düzenlenmez).
 * `public/harita/rota-harita-arkaplan.jpg` değişirse bu komut yeniden
 * çalıştırılır; ırmak sayısı veya yeri değiştiyse aşağıdaki IRMAKLAR listesi
 * (her ırmağın ölçüleceği satır ve sütun aralığı) yeni görsele göre güncellenir.
 *
 * Yöntem: her 14 piksel satırda mavi su pikselleri bulunur; bir önceki satırın
 * kıyılarına yakın koşular birleştirilerek ırmak takip edilir (çiçek ve taşlar
 * araya girse de iz kopmaz). Kıyılar üç satırlık ortalamayla yumuşatılır.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const GORSEL = path.resolve("public/harita/rota-harita-arkaplan.jpg");
const CIKTI = path.resolve("src/components/cocuk/canliCayirIrmaklari.ts");
const ADIM = 14;

/**
 * Her ırmak: ölçülecek satır aralığı, ilk satırdaki yaklaşık kıyıları ve
 * balıkların yüzmeye başladığı satırlar (sudaki taşlardan uzak seçilir).
 */
const IRMAKLAR = [
  {
    ad: "sag",
    ust: 300,
    alt: 1206,
    ilkKiyi: [1076, 1121],
    baliklar: [340, 400, 570, 650, 740, 860, 960, 1100],
  },
  {
    ad: "sol",
    ust: 1656,
    alt: 2626,
    ilkKiyi: [0, 30],
    baliklar: [1720, 1830, 1950, 2060, 2160, 2380, 2470, 2570],
  },
];

/** Akış çizgileri ırmak genişliğinin bu oranlarından geçer (0 = sol kıyı). */
const AKIS_ORANLARI = [0.3, 0.52, 0.72];

const { data, info } = await sharp(GORSEL).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

function maviMi(x, y) {
  const i = (y * W + x) * C;
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  return b > 150 && b - r > 70 && b - g > 10;
}

function maviKosular(y) {
  const kosular = [];
  let bas = -1;
  for (let x = 0; x < W; x++) {
    const mavi = maviMi(x, y);
    if (mavi && bas < 0) bas = x;
    if ((!mavi || x === W - 1) && bas >= 0) {
      const son = mavi ? x : x - 1;
      if (son - bas >= 6) kosular.push([bas, son]);
      bas = -1;
    }
  }
  return kosular;
}

function izle({ ust, alt, ilkKiyi }) {
  let [sol, sag] = ilkKiyi;
  const satirlar = [];
  for (let y = ust; y <= alt; y += ADIM) {
    const yakin = maviKosular(y).filter(([b, s]) => s >= sol - 60 && b <= sag + 60);
    if (!yakin.length) continue;
    sol = Math.min(...yakin.map((k) => k[0]));
    sag = Math.max(...yakin.map((k) => k[1]));
    satirlar.push([y, sol, sag]);
  }
  return satirlar.map((satir, i) => {
    const komsu = satirlar.slice(Math.max(0, i - 1), i + 2);
    const ort = (k) => komsu.reduce((t, s) => t + s[k], 0) / komsu.length;
    return [satir[0], ort(1), ort(2)];
  });
}

/** Catmull-Rom eğrisini kübik Bézier yoluna çevirir. */
function yumusakYol(noktalar) {
  const p = noktalar.map(([x, y]) => [Math.round(x), Math.round(y)]);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [a, b, c, e] = [p[i - 1] ?? p[i], p[i], p[i + 1], p[i + 2] ?? p[i + 1]];
    const k1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const k2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += `C${Math.round(k1[0])} ${Math.round(k1[1])} ${Math.round(k2[0])} ${Math.round(k2[1])} ${c[0]} ${c[1]}`;
  }
  return d;
}

const sonuc = IRMAKLAR.map((irmak) => {
  const satirlar = izle(irmak);
  // Görselin kenarına değen su, kenarın dışına doğru uzatılır.
  const kenar = (x) => (x <= 2 ? -20 : x >= W - 3 ? W + 20 : x);
  const icKiyi = 5;
  const sol = satirlar.map(([y, a]) => [kenar(a) + (a <= 2 ? 0 : icKiyi), y]);
  const sag = satirlar.map(([y, , b]) => [kenar(b) - (b >= W - 3 ? 0 : icKiyi), y]).reverse();
  const xler = [...sol, ...sag].map((n) => n[0]);
  const kutu = {
    x: Math.max(0, Math.floor(Math.min(...xler))),
    y: satirlar[0][0] - ADIM,
    g: 0,
    h: 0,
  };
  kutu.g = Math.min(W, Math.ceil(Math.max(...xler))) - kutu.x;
  kutu.h = satirlar[satirlar.length - 1][0] + ADIM - kutu.y;

  // Balık: orta çizgide durur, burnu akış yönüne (aşağı) bakar; açı derecedir.
  const orta = (y) => {
    const en = satirlar.reduce((a, b) => (Math.abs(b[0] - y) < Math.abs(a[0] - y) ? b : a));
    return [(en[1] + en[2]) / 2, en[0]];
  };
  const baliklar = irmak.baliklar.map((y) => {
    const [x, oy] = orta(y);
    const [x1, y1] = orta(y - 28);
    const [x2, y2] = orta(y + 28);
    return [Math.round(x), oy, Math.round((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI)];
  });

  const seyrek = satirlar.filter((_, i) => i % 2 === 0 || i === satirlar.length - 1);
  return {
    ad: irmak.ad,
    kutu,
    su: `${sol.concat(sag).map(([x, y], i) => `${i ? "L" : "M"}${Math.round(x)} ${y}`).join("")}Z`,
    akislar: AKIS_ORANLARI.map((oran) =>
      yumusakYol(seyrek.map(([y, a, b]) => [a + (b - a) * oran, y])),
    ),
    // Köpük parıltıları: ırmak boyunca eşit aralıklı, ortaya yakın noktalar.
    parilti: [0.12, 0.34, 0.56, 0.8].map((t, i) => {
      const [y, a, b] = satirlar[Math.round(t * (satirlar.length - 1))];
      return [Math.round(a + (b - a) * (i % 2 ? 0.38 : 0.62)), y];
    }),
    baliklar,
  };
});

const metin = `/**
 * Canlı çayır — ırmak suyu verisi. ÜRETİLMİŞ DOSYA, elle düzenleme:
 * \`node scripts/canli-cayir-irmaklari.mjs\` arka plan görselinden ölçer.
 * Koordinatlar \`rota-harita-arkaplan.jpg\` pikselleridir (${W}×${H}).
 */
export const CAYIR_GORSEL_OLCUSU = { genislik: ${W}, yukseklik: ${H} } as const;

export type CayirIrmagi = {
  ad: string;
  /** Irmağı saran kutu; SVG bu kutunun üstüne oturur. */
  kutu: { x: number; y: number; g: number; h: number };
  /** Suyun kıyıdan biraz içeride kalan dış çizgisi (kırpma yolu). */
  su: string;
  /** Akış yönünde (yukarıdan aşağı) çizilmiş akış çizgileri. */
  akislar: string[];
  /** Köpük parıltılarının yerleri. */
  parilti: [number, number][];
  /** Balıkların çıktığı yer ve akış yönündeki açı (derece): [x, y, açı]. */
  baliklar: [number, number, number][];
};

export const CAYIR_IRMAKLARI: CayirIrmagi[] = ${JSON.stringify(sonuc, null, 2).replace(/"(\w+)":/g, "$1:")};
`;

await writeFile(CIKTI, metin);
console.log(`${sonuc.length} ırmak yazıldı → ${path.relative(process.cwd(), CIKTI)}`);
