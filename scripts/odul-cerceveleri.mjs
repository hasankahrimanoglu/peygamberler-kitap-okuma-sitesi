// Ödül çerçeveleri — rozet (kalkan), madalya (defneli halka), unvan (kitap temalı)
// ve rota durağı (halka; mine bandı şeffaf) kodla çizilir.
// İç görsel çerçevesiz kaynaktan gelir, çerçeve üstüne konur; çıktı 512×512 şeffaf PNG.
// Karar: PROJE-MODELI 6.1 "Ortak ödül çerçevesi" (20 Eki 2026).
//
//   npm run odul-cerceve -- kitap ibrahim        → rozetler/hz-ibrahim/bolum-*.png + madalyalar/hz-ibrahim.png
//   npm run odul-cerceve -- durak ibrahim        → kitaplar/hz-ibrahim/harita-durak.png (bandı şeffaf)
//   npm run odul-cerceve -- unvan                → bütün unvanlar
//   npm run odul-cerceve -- unvan bilge-yolcu    → tek unvan
//
// Kaynaklar (git'e girmez): gorsel-kaynaklari/rozetler/hz-{k}/bolum-{n}.png,
// gorsel-kaynaklari/madalyalar/hz-{k}.png, gorsel-kaynaklari/unvanlar/{anahtar}.png,
// gorsel-kaynaklari/duraklar/hz-{k}.jpg
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PROJE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

// ---------------- palet ----------------
const A = { cizgi: "#7c4105", koyu: "#c8800c", orta: "#f3b11f", acik: "#ffd956", parlak: "#fff5bf" };
// mine renkleri: ust/orta/koyu degrade, acik parlama, cizgi koyu kontur, tas = [sol-ust, sag-ust, sag-alt, sol-alt, tabla], nokta
const RENKLER = {
  mavi: { ust: "#2f88f0", orta: "#1867d6", koyu: "#0c3f9e", acik: "#3f97f3", cizgi: "#082a6e", tas: ["#c4f1ff", "#5fc2ff", "#0a47b5", "#1e78e8", "#8ad8ff"], nokta: "#9ff3dc" },
  yesil: { ust: "#43b07c", orta: "#2a8a5c", koyu: "#175c3c", acik: "#5fcb93", cizgi: "#0c3a25", tas: ["#d4fbe6", "#72e0a8", "#0f6a40", "#23a064", "#a8f0c9"], nokta: "#fff1a0" },
  kirmizi: { ust: "#e9554c", orta: "#c63131", koyu: "#8c1a20", acik: "#f27a70", cizgi: "#560c12", tas: ["#ffdcd8", "#ff8d84", "#9a1521", "#d83838", "#ffb6af"], nokta: "#ffe08a" },
  mor: { ust: "#9c66ea", orta: "#7442ca", koyu: "#4d2692", acik: "#b388f3", cizgi: "#2d1260", tas: ["#ecdfff", "#bb90ff", "#491f95", "#7b47d8", "#d4bbff"], nokta: "#9ff3dc" },
  krem: { ust: "#fffaf0", orta: "#f6e5bd", koyu: "#dcbd82", acik: "#fffdf6", cizgi: "#9a6a22", tas: ["#fff5bf", "#ffd956", "#c8800c", "#f3b11f", "#ffe9a0"], nokta: "#e8b84b" },
};
let M = RENKLER.mavi;

// ---------------- geometri ----------------
const f2 = (n) => +n.toFixed(2);
const yol = (p) => "M" + p.map((q) => f2(q[0]) + " " + f2(q[1])).join(" L") + " Z";
const acikYol = (p) => "M" + p.map((q) => f2(q[0]) + " " + f2(q[1])).join(" L");
const polar = (cx, cy, r, derece) => {
  const a = (derece * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};
const daire = (cx, cy, r, n = 360) => Array.from({ length: n }, (_, i) => polar(cx, cy, r, (i / n) * 360));
const yay = (cx, cy, r, d1, d2, n = 40) => Array.from({ length: n + 1 }, (_, i) => polar(cx, cy, r, d1 + ((d2 - d1) * i) / n));
const bez2 = (a, c, b, t) => [(1 - t) ** 2 * a[0] + 2 * t * (1 - t) * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * t * (1 - t) * c[1] + t * t * b[1]];
const bez3 = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u ** 3 * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t ** 3 * p3[k]);
};
const chaikin = (pts, n) => {
  for (let k = 0; k < n; k++) {
    const q = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      q.push([0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]], [0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]);
    }
    pts = q;
  }
  return pts;
};
const icKaydir = (pts, d) => {
  const n = pts.length;
  const c = pts.reduce((s, p) => [s[0] + p[0] / n, s[1] + p[1] / n], [0, 0]);
  let poli = pts.slice();
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (L < 1e-6) continue;
    let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
    if ((c[0] - a[0]) * nx + (c[1] - a[1]) * ny < 0) { nx = -nx; ny = -ny; }
    const ox = a[0] + nx * d, oy = a[1] + ny * d;
    const ic = (p) => (p[0] - ox) * nx + (p[1] - oy) * ny;
    const yeni = [];
    for (let j = 0; j < poli.length; j++) {
      const p = poli[j], q = poli[(j + 1) % poli.length];
      const fp = ic(p), fq = ic(q);
      if (fp >= 0) yeni.push(p);
      if ((fp >= 0) !== (fq >= 0)) { const t = fp / (fp - fq); yeni.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
    }
    poli = yeni;
  }
  return poli;
};
// kapalı çokgeni eşit aralıklı yeniden örnekle
const yenidenOrnekle = (pts, N) => {
  const seg = pts.map((p, i) => Math.hypot(pts[(i + 1) % pts.length][0] - p[0], pts[(i + 1) % pts.length][1] - p[1]));
  const top = seg.reduce((a, b) => a + b, 0);
  const out = [];
  let i = 0, acc = 0;
  for (let k = 0; k < N; k++) {
    const hedef = (k / N) * top;
    while (acc + seg[i] < hedef) { acc += seg[i]; i++; }
    const t = seg[i] ? (hedef - acc) / seg[i] : 0, p = pts[i], q = pts[(i + 1) % pts.length];
    out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
  }
  return out;
};
const yumusat = (pts) => yenidenOrnekle(chaikin(yenidenOrnekle(pts, 44), 4), 600);
// merkezden verilen açıdaki çevre noktası
const acidaNokta = (pts, cx, cy, derece) => {
  const a = (derece * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a);
  let en = null, enD = Infinity;
  for (const p of pts) {
    const vx = p[0] - cx, vy = p[1] - cy;
    const sap = Math.abs(vx * dy - vy * dx);
    if (vx * dx + vy * dy > 0 && sap < enD) { enD = sap; en = p; }
  }
  return en;
};
// kalkan: dışbükey, üst kenar hafif kemerli, alt uç sivri
function kalkan(x0, x1, kose, kemer, alt) {
  const cx = (x0 + x1) / 2, p = [], N = 60, w = x1 - x0, H = alt - kose;
  for (let i = 0; i <= N; i++) p.push(bez2([x0, kose], [cx, kemer], [x1, kose], i / N));
  for (let i = 1; i <= N; i++) p.push([x1, kose + H * 0.34 * (i / N)]);
  for (let i = 1; i <= N; i++) p.push(bez3([x1, kose + H * 0.34], [x1, kose + H * 0.7], [cx + w * 0.24, alt - H * 0.1], [cx, alt], i / N));
  for (let i = 1; i <= N; i++) p.push(bez3([cx, alt], [cx - w * 0.24, alt - H * 0.1], [x0, kose + H * 0.7], [x0, kose + H * 0.34], i / N));
  for (let i = 1; i < N; i++) p.push([x0, kose + H * 0.34 * (1 - i / N)]);
  return yenidenOrnekle(p, 600);
}

// ---------------- malzeme parçaları ----------------
let uid = 0;
const yeniId = (p) => `${p}${++uid}`;
let maskeler = [];

const ortakDefs = () => `
  <linearGradient id="altin" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff2a6"/><stop offset="0.3" stop-color="${A.acik}"/>
    <stop offset="0.62" stop-color="${A.orta}"/><stop offset="1" stop-color="${A.koyu}"/>
  </linearGradient>
  <linearGradient id="mine" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${M.ust}"/><stop offset="0.55" stop-color="${M.orta}"/><stop offset="1" stop-color="${M.koyu}"/>
  </linearGradient>
  <linearGradient id="sayfa" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fffbea"/><stop offset="1" stop-color="#f2d68c"/>
  </linearGradient>
  <linearGradient id="krem" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fffaf0"/><stop offset="0.6" stop-color="#fbf0d6"/><stop offset="1" stop-color="#ead5a4"/>
  </linearGradient>
  <radialGradient id="boncuk" cx="0.36" cy="0.32" r="0.7">
    <stop offset="0" stop-color="#fffbe4"/><stop offset="0.3" stop-color="${A.acik}"/>
    <stop offset="0.75" stop-color="${A.orta}"/><stop offset="1" stop-color="${A.koyu}"/>
  </radialGradient>
  <filter id="bulanik4"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="bulanik10"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="parilti" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="golge" x="-15%" y="-15%" width="130%" height="135%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dy="12" result="o"/>
    <feFlood flood-color="#2a1600" flood-opacity="0.33"/><feComposite in2="o" operator="in"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;

// altın boru: dış çizgi + gövde + alt gölge + üst parlama (hepsi boru içine maskeli)
function boru(d, w, kapali = true) {
  const m = yeniId("m");
  const cap = kapali ? "" : ` stroke-linecap="round"`;
  maskeler.push(`<mask id="${m}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1224" height="1224"><path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linejoin="round"${cap}/></mask>`);
  return `
  <path d="${d}" fill="none" stroke="${A.cizgi}" stroke-width="${w + 7}" stroke-linejoin="round"${cap}/>
  <g mask="url(#${m})">
    <path d="${d}" fill="none" stroke="url(#altin)" stroke-width="${w}"/>
    <path d="${d}" fill="none" stroke="${A.koyu}" stroke-width="${f2(w * 0.5)}" transform="translate(${f2(w * 0.16)} ${f2(w * 0.3)})" opacity="0.9"/>
    <path d="${d}" fill="none" stroke="${A.parlak}" stroke-width="${f2(w * 0.3)}" transform="translate(${f2(-w * 0.1)} ${f2(-w * 0.22)})"/>
  </g>`;
}
// mavi mine bant (kenarları borular örter)
function mineBant(d, w) {
  const m = yeniId("m");
  maskeler.push(`<mask id="${m}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1224" height="1224"><path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linejoin="round"/></mask>`);
  return `
  <path d="${d}" fill="none" stroke="url(#mine)" stroke-width="${w}" stroke-linejoin="round"/>
  <g mask="url(#${m})"><path d="${d}" fill="none" stroke="${M.acik}" stroke-width="${f2(w * 0.42)}" opacity="0.55" filter="url(#bulanik4)" transform="translate(-3 -5)"/></g>`;
}
const parlakIz = (pts) => `<path d="${acikYol(pts)}" fill="none" stroke="#e6f4ff" stroke-width="5" stroke-linecap="round" opacity="0.6"/>`;

// yüzeyli mavi taş, altın yuvada
function tas(cx, cy, a, b, rot = 0) {
  const k = 0.6;
  const T = [0, -b], R = [a, 0], B = [0, b], L = [-a, 0];
  const t = [0, -b * k], r = [a * k, 0], bb = [0, b * k], l = [-a * k, 0], O = [0, 0];
  const p = (...q) => yol(q);
  const g = Math.min(a, b);
  return `<g transform="translate(${f2(cx)} ${f2(cy)}) rotate(${rot})">
    <path d="${p(T, R, B, L)}" fill="${A.orta}" stroke="${A.cizgi}" stroke-width="7" stroke-linejoin="round"/>
    <path d="${p(T, t, l, L)}" fill="${A.parlak}"/><path d="${p(T, R, r, t)}" fill="${A.acik}"/>
    <path d="${p(R, B, bb, r)}" fill="${A.koyu}"/><path d="${p(B, L, l, bb)}" fill="${A.orta}"/>
    <path d="${p(t, l, O)}" fill="${M.tas[0]}"/><path d="${p(t, r, O)}" fill="${M.tas[1]}"/>
    <path d="${p(r, bb, O)}" fill="${M.tas[2]}"/><path d="${p(bb, l, O)}" fill="${M.tas[3]}"/>
    <path d="${p([0, -b * 0.28], [a * 0.28, 0], [0, b * 0.28], [-a * 0.28, 0])}" fill="${M.tas[4]}" opacity="0.75"/>
    <path d="${p(t, r, bb, l)}" fill="none" stroke="${M.cizgi}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${p(T, R, B, L)}" fill="none" stroke="${A.cizgi}" stroke-width="4" stroke-linejoin="round"/>
    ${pirilti(-a * k * 0.3, -b * k * 0.42, g * 0.2, "#ffffff")}
  </g>`;
}
// 4 köşeli yıldız
function yildizYol(r) {
  const k = 0.16 * r;
  return `M0 ${-r} Q${k} ${-k} ${r} 0 Q${k} ${k} 0 ${r} Q${-k} ${k} ${-r} 0 Q${-k} ${-k} 0 ${-r} Z`;
}
const yildiz = (x, y, r) =>
  `<g transform="translate(${f2(x)} ${f2(y)})"><path d="${yildizYol(r)}" fill="url(#altin)" stroke="${A.cizgi}" stroke-width="${f2(Math.max(2, r * 0.12))}" stroke-linejoin="round"/><path d="${yildizYol(r * 0.42)}" transform="translate(${f2(-r * 0.12)} ${f2(-r * 0.2)})" fill="${A.parlak}" opacity="0.8"/></g>`;
const pirilti = (x, y, r, renk = "#ffffff") =>
  `<g transform="translate(${f2(x)} ${f2(y)})"><circle r="${f2(r * 0.9)}" fill="${renk}" opacity="0.55" filter="url(#parilti)"/><path d="${yildizYol(r)}" fill="${renk}"/></g>`;
const nokta = (x, y, r) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="${M.nokta}" opacity="0.9"/>`;
const boncuk = (x, y, r) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${r}" fill="url(#boncuk)" stroke="${A.cizgi}" stroke-width="4"/>`;

// defne yaprağı: tabanı (x,y), yönü aci (derece, SVG saat yönü)
function yaprak(x, y, L, W, aci) {
  const ust = Math.cos((aci * Math.PI) / 180) >= 0 ? -1 : 1; // ışığa bakan yarı
  const d = `M0 0 C${f2(L * 0.25)} ${f2(-W)} ${f2(L * 0.72)} ${f2(-W * 0.85)} ${f2(L)} 0 C${f2(L * 0.72)} ${f2(W * 0.85)} ${f2(L * 0.25)} ${f2(W)} 0 0 Z`;
  const yari = `M0 0 C${f2(L * 0.25)} ${f2(ust * W)} ${f2(L * 0.72)} ${f2(ust * W * 0.85)} ${f2(L)} 0 Q${f2(L * 0.5)} ${f2(ust * W * 0.08)} 0 0 Z`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(aci)})">
    <path d="${d}" fill="url(#altin)" stroke="${A.cizgi}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="${yari}" fill="${A.parlak}" opacity="0.6"/>
    <path d="M${f2(L * 0.06)} 0 Q${f2(L * 0.5)} ${f2(-ust * W * 0.1)} ${f2(L * 0.88)} 0" fill="none" stroke="${A.koyu}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}
// defne dalı: f(t) gövde eğrisi, yapraklar sırayla iki yana
function dal(f, n, boy) {
  const pts = Array.from({ length: 41 }, (_, i) => f(i / 40));
  const s = boru(acikYol(pts), 9, false);
  const yap = [];
  for (let i = 0; i < n; i++) {
    const t = 0.04 + (0.9 * i) / (n - 1);
    const p = f(t), q = f(Math.min(1, t + 0.01));
    const yon = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
    const L = boy * (1 - 0.38 * t);
    yap.push(yaprak(p[0], p[1], L, L * 0.37, yon + 42), yaprak(p[0], p[1], L, L * 0.37, yon - 42));
  }
  const p = f(1), q = f(0.985);
  yap.push(yaprak(p[0], p[1], boy * 0.62, boy * 0.23, (Math.atan2(p[1] - q[1], p[0] - q[0]) * 180) / Math.PI));
  return s + yap.join("");
}
// sarmal kıvrım (volüt)
function kivrim(cx, cy, r0, bas, yon, w = 16) {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const r = r0 * (1 - 0.72 * t);
    pts.push(polar(cx, cy, r, bas + yon * t * 470));
  }
  return boru(acikYol(pts), w, false);
}
// açık kitap
function kitap(x, y, s, rot) {
  const sayfa = (k) =>
    `M0 8 C${-20 * k} -8 ${-42 * k} -8 ${-56 * k} 0 L${-56 * k} 40 C${-42 * k} 32 ${-20 * k} 32 0 46 Z`;
  const cizgi = (k, dy) => `M${-10 * k} ${12 + dy} C${-22 * k} ${3 + dy} ${-36 * k} ${3 + dy} ${-46 * k} ${7 + dy}`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${rot}) scale(${s})">
    <path d="M-62 4 L-62 48 C-40 40 -18 44 0 56 C18 44 40 40 62 48 L62 4 C40 0 18 6 0 14 C-18 6 -40 0 -62 4 Z" fill="url(#altin)" stroke="${A.cizgi}" stroke-width="5" stroke-linejoin="round"/>
    <path d="${sayfa(1)}" fill="url(#sayfa)" stroke="${A.cizgi}" stroke-width="4" stroke-linejoin="round"/>
    <path d="${sayfa(-1)}" fill="url(#sayfa)" stroke="${A.cizgi}" stroke-width="4" stroke-linejoin="round"/>
    ${[0, 10, 20].map((dy) => `<path d="${cizgi(1, dy)}" fill="none" stroke="#d9a640" stroke-width="2.5"/><path d="${cizgi(-1, dy)}" fill="none" stroke="#d9a640" stroke-width="2.5"/>`).join("")}
  </g>`;
}

// ---------------- halka (rota + madalya ortak) ----------------
const RIM_D = 30, BANT = 54, RIM_I = 20;
function halka(cx, cy, R) {
  const bantR = R - RIM_D / 2 - BANT / 2;
  const icR = bantR - BANT / 2 - RIM_I / 2 + 2;
  return {
    bantR, icR, pencereR: icR - RIM_I / 2 + 1,
    svg: mineBant(yol(daire(cx, cy, bantR)), BANT + 6) +
      boru(yol(daire(cx, cy, R)), RIM_D) +
      boru(yol(daire(cx, cy, icR)), RIM_I),
  };
}

// ---------------- 1) ROTA DURAĞI ----------------
// Halka çerçeve; mine bandın yeri ŞEFFAF kalır. Bandın rengi (kitabın durakRengi) ve
// okunan kısmın altını ekranda CSS'ten gelir (PROJE-MODELI 3.10.1, 6.1). Görselde
// bandın üstünde yalnız yarı saydam gölge, parlama, yıldız ve taşlar vardır.
function durak() {
  const C = 512, R = 446;
  const bantR = R - RIM_D / 2 - BANT / 2;
  const icR = bantR - BANT / 2 - RIM_I / 2 + 2;
  const pencereR = icR - RIM_I / 2 + 1;
  const m = yeniId("m");
  maskeler.push(`<mask id="${m}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><path d="${yol(daire(C, C, bantR))}" fill="none" stroke="#fff" stroke-width="${BANT + 6}"/></mask>`);
  const s = [`<g mask="url(#${m})">
    <path d="${yol(daire(C, C, bantR + 24))}" fill="none" stroke="#000" stroke-width="18" opacity="0.28" filter="url(#bulanik4)"/>
    <path d="${yol(daire(C, C, bantR - 24))}" fill="none" stroke="#000" stroke-width="18" opacity="0.3" filter="url(#bulanik4)"/>
    <path d="${yol(daire(C, C, bantR - 4))}" fill="none" stroke="#fff" stroke-width="12" opacity="0.22" filter="url(#bulanik4)" transform="translate(-3 -5)"/>
  </g>`, boru(yol(daire(C, C, R)), RIM_D), boru(yol(daire(C, C, icR)), RIM_I)];
  const b = bantR;
  [[-62, -34], [34, 62], [118, 150], [210, 242]].forEach(([a1, a2]) => s.push(parlakIz(yay(C, C, b + 9, a1, a2))));
  for (const d of [24, 70, 110, 156, 204, 250, 290, 336]) s.push(yildiz(...polar(C, C, b, d), 15));
  s.push(kitap(...polar(C, C, b + 2, -45), 0.95, -45), kitap(...polar(C, C, b + 2, 45), 0.95, 45));
  s.push(tas(...polar(C, C, b + 6, 0), 56, 92), tas(...polar(C, C, b + 16, 180), 56, 104));
  s.push(tas(...polar(C, C, b, 90), 74, 50), tas(...polar(C, C, b, 270), 74, 50));
  s.push(pirilti(...polar(C, C, R, -40), 22), pirilti(...polar(C, C, R, 128), 16), pirilti(...polar(C, C, icR, -20), 12));
  return { svg: s.join(""), pencere: yol(daire(C, C, pencereR + 8)), kutu: [C - pencereR, C - pencereR, 2 * pencereR, 2 * pencereR] };
}

// ---------------- 2) MADALYA ----------------
function madalya() {
  const C = 524, R = 382;
  const h = halka(C, C, R);
  const b = h.bantR;
  const s = [];
  // defne kanatları halkanın arkasında
  const arc = (d1, d2, r) => (t) => polar(C, C, r, d1 + (d2 - d1) * t);
  s.push(dal(arc(204, 322, R + 46), 10, 104), dal(arc(156, 38, R + 46), 10, 104));
  s.push(h.svg);
  [[-58, -30], [30, 58], [118, 146], [214, 242]].forEach(([a1, a2]) => s.push(parlakIz(yay(C, C, b + 9, a1, a2))));
  for (const d of [36, 86, 132, 228, 274, 324]) s.push(yildiz(...polar(C, C, b, d), 15));
  for (const d of [60, 300, 160, 200]) s.push(nokta(...polar(C, C, b - 3, d), 5));
  // taç: ortada taş, iki yanda kanat yaprakları
  const tepe = polar(C, C, R + 4, 0);
  s.push(yaprak(tepe[0] - 30, tepe[1] + 26, 150, 48, 196), yaprak(tepe[0] + 30, tepe[1] + 26, 150, 48, -16));
  s.push(yaprak(tepe[0] - 22, tepe[1] + 30, 108, 34, 222), yaprak(tepe[0] + 22, tepe[1] + 30, 108, 34, -42));
  s.push(tas(tepe[0], tepe[1] - 8, 60, 96));
  // alt: kıvrımlar ve taş
  const dip = polar(C, C, R + 2, 180);
  s.push(kivrim(dip[0] - 86, dip[1] - 6, 30, 90, -1, 14), kivrim(dip[0] + 86, dip[1] - 6, 30, 270, 1, 14));
  s.push(tas(dip[0], dip[1] + 6, 52, 84));
  for (const d of [62, 118, 242, 298]) s.push(boncuk(...polar(C, C, R + 2, d), 15));
  s.push(pirilti(...polar(C, C, R, -36), 22), pirilti(...polar(C, C, R, 140), 15), pirilti(...polar(C, C, h.icR, 22), 11));
  return { svg: s.join(""), pencere: yol(daire(C, C, h.pencereR + 8)), kutu: [C - h.pencereR, C - h.pencereR, 2 * h.pencereR, 2 * h.pencereR] };
}

// ---------------- 3) ROZET (kalkan) ----------------
const aciOf = (p, cx, cy) => (Math.atan2(p[0] - cx, -(p[1] - cy)) * 180) / Math.PI;
const yayNoktalari = (pts, cx, cy, d1, d2) =>
  pts.filter((p) => { const d = aciOf(p, cx, cy); return d >= d1 && d <= d2; }).sort((p, q) => aciOf(p, cx, cy) - aciOf(q, cx, cy));
function kalkanCerceve(dis) {
  const bant = yumusat(icKaydir(dis, RIM_D / 2 + BANT / 2 - 2));
  const ic = yumusat(icKaydir(dis, RIM_D / 2 + BANT + RIM_I / 2 - 4));
  const pencere = yumusat(icKaydir(dis, RIM_D / 2 + BANT + RIM_I - 6));
  return { bant, ic, pencere, svg: mineBant(yol(bant), BANT + 6) + boru(yol(dis), RIM_D) + boru(yol(ic), RIM_I) };
}
function rozet() {
  const dis = kalkan(178, 846, 236, 150, 930);
  const k = kalkanCerceve(dis);
  const CX = 512, CY = 540;
  const at = (d) => acidaNokta(k.bant, CX, CY, d);
  const s = [];
  s.push(kivrim(160, 234, 42, 60, -1, 22), kivrim(864, 234, 42, 300, 1, 22));
  s.push(k.svg);
  s.push(boncuk(160, 234, 11), boncuk(864, 234, 11));
  for (const [d1, d2, dx, dy] of [[-62, -34, 0, -9], [34, 62, 0, -9], [100, 128, 9, 0], [-128, -100, -9, 0]])
    s.push(parlakIz(yayNoktalari(k.bant, CX, CY, d1, d2).map(([x, y]) => [x + dx, y + dy])));
  for (const d of [-34, 34, -118, 118, -150, 150]) s.push(yildiz(...at(d), 15));
  for (const d of [-60, 60, -165, 165]) s.push(nokta(...at(d), 5));
  s.push(tas(...at(-90), 64, 46), tas(...at(90), 64, 46));
  const tepe = at(0);
  s.push(tas(tepe[0], tepe[1] - 20, 58, 96));
  const dip = at(180);
  s.push(yaprak(dip[0] - 24, dip[1] - 14, 74, 25, 196), yaprak(dip[0] + 24, dip[1] - 14, 74, 25, -16));
  s.push(tas(dip[0], dip[1] + 10, 50, 86));
  s.push(pirilti(236, 300, 20), pirilti(842, 520, 14), pirilti(352, 846, 12));
  const xs = k.pencere.map((p) => p[0]), ys = k.pencere.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  return { svg: s.join(""), pencere: yol(yumusat(icKaydir(k.pencere, -8))), kutu: [x0, y0, Math.max(...xs) - x0, Math.max(...ys) - y0] };
}


// ---------------- 4c) UNVAN — referansa birebir (Hasan'ın "Kitap temalı" örneği) ----------------
// Ölçüler referans görselden (315 px) alındı; P() ile 1024'lük tuvale taşınır.
const SK = 3.4;
const P = (x, y) => [512 + (x - 154.5) * SK, 512 + (y - 151.5) * SK];
const egri3 = (a, b, c, d, n = 30) => Array.from({ length: n + 1 }, (_, i) => P(...bez3(a, b, c, d, i / n)));
const egri2 = (a, c, b, n = 30) => Array.from({ length: n + 1 }, (_, i) => P(...bez2(a, c, b, i / n)));
const aynala = (pts) => pts.map(([x, y]) => [1024 - x, y]);
function kemerPencere(r, cx = 153, cy = 142) {
  // yumurta kemer: üstte yarım daire, yanlar aşağı doğru hafif daralır, alt kitabın arkasında
  const p = [];
  for (let i = 0; i <= 40; i++) p.push(P(...polar(cx, cy, r, -90 + (180 * i) / 40)));
  p.push(...egri3([cx + r, cy], [cx + r, cy + 38], [cx + r - 5, cy + 70], [cx + r - 16, cy + 92], 16).slice(1));
  p.push(...egri3([cx - r + 16, cy + 92], [cx - r + 5, cy + 70], [cx - r, cy + 38], [cx - r, cy], 16).slice(0, -1));
  return p;
}
function kitapBirebir() {
  const s = [];
  const ustRef = (t) => bez3([153, 229], [128, 205], [70, 205], [38, 222], t);
  const sol = {
    ust: Array.from({ length: 31 }, (_, i) => P(...ustRef(i / 30))),
    dis: egri3([38, 222], [33, 236], [33, 250], [36, 262], 12).slice(1),
    alt: egri3([36, 262], [80, 257], [130, 262], [153, 272], 30).slice(1),
  };
  const sayfa = (y = 0) => [...sol.ust, ...sol.dis, ...sol.alt].map(([x, yy]) => [x, yy + y]);
  for (const ayna of [false, true]) {
    const A2 = (p) => (ayna ? aynala(p) : p);
    // kapak şeridi (mavi) + üst altın kenar
    const kapak = [P(153, 285), ...egri2([153, 285], [90, 276], [30, 278], 20).slice(1), P(28, 268), ...egri2([30, 266], [90, 264], [153, 274], 20)];
    s.push(`<path d="${yol(A2(kapak))}" fill="url(#mine)" stroke="${A.cizgi}" stroke-width="7" stroke-linejoin="round"/>`);
    s.push(boru(acikYol(A2(egri2([30, 267], [90, 265], [153, 275], 20))), 12, false));
    // dış kanat (kurdele ucu gibi açılan sayfa kenarı)
    const kanat = [P(42, 225), P(21, 229), P(30, 246), P(23, 263), P(44, 264)];
    s.push(`<path d="${yol(A2(chaikin(kanat, 1)))}" fill="#efd39a" stroke="${A.cizgi}" stroke-width="6" stroke-linejoin="round"/>`);
    // sayfa destesi + üst sayfa
    for (const k of [2, 1]) s.push(`<path d="${yol(A2(sayfa(k * 9)))}" fill="${k === 2 ? "#e6c98a" : "#f3e1b4"}" stroke="${A.cizgi}" stroke-width="4" stroke-linejoin="round"/>`);
    s.push(`<path d="${yol(A2(sayfa()))}" fill="url(#sayfa)" stroke="${A.cizgi}" stroke-width="6" stroke-linejoin="round"/>`);
    for (const dy of [9, 17, 25, 33]) {
      const cizgi = Array.from({ length: 21 }, (_, i) => {
        const t = 0.1 + (0.78 * i) / 20;
        const [x, y] = ustRef(t);
        return P(x, y + dy + Math.sin(t * 9) * 0.8);
      });
      s.push(`<path d="${acikYol(A2(cizgi))}" fill="none" stroke="#dcb978" stroke-width="3.5" stroke-linecap="round"/>`);
    }
  }
  s.push(`<path d="${acikYol([P(153, 229), P(153, 273)])}" stroke="${A.cizgi}" stroke-width="5"/>`);
  s.push(`<path d="${acikYol([P(150, 234), P(150, 270)])}" stroke="#b98a3c" stroke-width="12" opacity="0.3" filter="url(#bulanik4)"/>`);
  s.push(`<path d="${acikYol([P(157, 234), P(157, 270)])}" stroke="#b98a3c" stroke-width="12" opacity="0.3" filter="url(#bulanik4)"/>`);
  const [tx, ty] = P(146, 272), [tx2, ty2] = P(161, 281);
  s.push(`<rect x="${f2(tx)}" y="${f2(ty)}" width="${f2(tx2 - tx)}" height="${f2(ty2 - ty)}" rx="10" fill="url(#altin)" stroke="${A.cizgi}" stroke-width="5"/>`);
  return s.join("");
}
function unvanBirebir() {
  const s = [];
  // defne dalları (arkada)
  for (const ayna of [false, true]) {
    const A2 = (p) => (ayna ? aynala(p) : p);
    const f = (t) => P(...bez2([64, 218], [38, 170], [50, 100], t));
    s.push(boru(acikYol(A2(Array.from({ length: 31 }, (_, i) => f(i / 30)))), 9, false));
    const yap = [];
    for (const [t, sapma, boy] of [[0.2, 34, 25], [0.42, 34, 24], [0.64, 32, 22], [0.06, -34, 31], [0.28, -36, 31], [0.5, -34, 29], [0.72, -30, 26]]) {
      const p = f(t), q = f(t + 0.01);
      let yon = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI + sapma;
      let [x, y] = p;
      if (ayna) { x = 1024 - x; yon = 180 - yon; }
      yap.push(yaprak(x, y, boy * SK, boy * SK * 0.5, yon));
    }
    const p = f(1), q = f(0.98);
    let yon = (Math.atan2(p[1] - q[1], p[0] - q[0]) * 180) / Math.PI;
    let x = p[0];
    if (ayna) { x = 1024 - x; yon = 180 - yon; }
    yap.push(yaprak(x, p[1], 27 * SK, 27 * SK * 0.46, yon));
    s.push(yap.join(""));
  }
  // mine alan (pencere delikli)
  const alan = [...egri2([70, 64], [154, 40], [238, 64], 40), P(237, 244), P(71, 244)];
  const pencereRim = kemerPencere(62);
  s.push(`<linearGradient id="kraliyet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b62c8"/><stop offset="0.55" stop-color="#1d4aa8"/><stop offset="1" stop-color="#13347c"/></linearGradient>`);
  s.push(`<path fill-rule="evenodd" d="${yol(alan)} ${yol(pencereRim)}" fill="url(#kraliyet)"/>`);
  s.push(`<path d="${yol([...egri2([78, 72], [154, 50], [230, 72], 40), P(229, 208), P(79, 208)])}" fill="none" stroke="${M.acik}" stroke-width="12" opacity="0.5" filter="url(#bulanik4)"/>`);
  s.push(yildiz(...P(88, 87), 28), yildiz(...P(217, 87), 28));
  for (const [x, y] of [[78, 155], [79, 198], [229, 155], [226, 198]]) s.push(nokta(...P(x, y), 6));
  s.push(`<circle cx="${f2(P(228, 77)[0])}" cy="${f2(P(228, 77)[1])}" r="6" fill="#7fd0ff"/>`);
  // kolonlar ve kemerli üst kenar
  s.push(boru(acikYol([P(66, 72), P(66, 240)]), 40, false), boru(acikYol([P(242, 72), P(242, 240)]), 40, false));
  s.push(boru(acikYol(egri2([64, 58], [154, 30], [244, 58], 40)), 30, false));
  // pencere çerçevesi
  s.push(boru(yol(pencereRim), 34));
  // köşe kıvrımları: üstte küçük (kenarın ucu), altta büyük (kolon başlığı)
  s.push(kivrim(...P(63, 61), 9 * SK, 90, -1, 20), kivrim(...P(245, 61), 9 * SK, 270, 1, 20));
  s.push(kivrim(...P(54, 79), 11 * SK, 90, -1, 22), kivrim(...P(254, 79), 11 * SK, 270, 1, 22));
  for (const [x, y, r] of [[63, 61, 8], [245, 61, 8], [54, 79, 9], [254, 79, 9]]) s.push(boncuk(...P(x, y), r));
  // tepe taşı
  s.push(tas(...P(153, 52), 72, 96));
  s.push(kitapBirebir());
  s.push(pirilti(...P(80, 66), 18), pirilti(...P(222, 140), 12), pirilti(...P(200, 214), 11));
  const [kx, ky] = P(97, 84), [kx2] = P(209, 0);
  return { svg: s.join(""), pencere: yol(kemerPencere(56)), kutu: [kx, ky, kx2 - kx, 150 * SK] };
}

// ---------------- birleştir ve çiz ----------------
function svgYap(cerceve, sahneUri) {
  const sahne = sahneUri
    ? `<g clip-path="url(#pencereKes)">
        <image href="${sahneUri}" x="${f2(cerceve.kutu[0])}" y="${f2(cerceve.kutu[1])}" width="${f2(cerceve.kutu[2])}" height="${f2(cerceve.kutu[3])}" preserveAspectRatio="xMidYMid slice"/>
        <path d="${cerceve.pencere}" fill="none" stroke="#000" stroke-width="44" opacity="0.4" filter="url(#bulanik10)"/>
      </g>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>${ortakDefs()}${maskeler.join("")}<clipPath id="pencereKes"><path d="${cerceve.pencere}"/></clipPath></defs>
  ${sahne}
  <g filter="url(#golge)">${cerceve.svg}</g>
</svg>`;
}
async function veriUri(dosya, kirp) {
  let img = sharp(dosya);
  if (kirp) img = img.extract(kirp);
  const buf = await img.resize(900, 900, { fit: "cover" }).jpeg({ quality: 90 }).toBuffer();
  return "data:image/jpeg;base64," + buf.toString("base64");
}

// ---------------- unvan içleri: gece göğü zemin + altın hale + ikon ----------------
// sabit tohumlu rastgele: her unvanda aynı yıldız düzeni
let tohum = 7;
const rnd = () => ((tohum = (tohum * 16807) % 2147483647) / 2147483647);
function geceZemini(c) {
  tohum = 7;
  const [x, y, w, h] = c.kutu;
  const [ox, oy] = P(153, 150);
  const yildizlar = Array.from({ length: 34 }, () => {
    const px = x + rnd() * w, py = y + rnd() * h * 0.82, r = 1.4 + rnd() * 2.6;
    return `<circle cx="${f2(px)}" cy="${f2(py)}" r="${f2(r)}" fill="${rnd() > 0.6 ? "#ffe9a8" : "#ffffff"}" opacity="${f2(0.35 + rnd() * 0.55)}"/>`;
  }).join("");
  return `
    <defs>
      <radialGradient id="gece" cx="${f2(ox)}" cy="${f2(oy)}" r="${f2(w * 0.85)}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#2e4f96"/><stop offset="0.55" stop-color="#18295a"/><stop offset="1" stop-color="#0E1A34"/>
      </radialGradient>
      <radialGradient id="hale" cx="${f2(ox)}" cy="${f2(oy)}" r="${f2(w * 0.5)}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffe08a" stop-opacity="0.55"/><stop offset="0.5" stop-color="#ffd166" stop-opacity="0.18"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="${f2(x - 20)}" y="${f2(y - 20)}" width="${f2(w + 40)}" height="${f2(h + 60)}" fill="url(#gece)"/>
    ${yildizlar}
    ${pirilti(x + w * 0.18, y + h * 0.16, 9, "#fff4c8")}${pirilti(x + w * 0.84, y + h * 0.24, 7, "#ffffff")}${pirilti(x + w * 0.12, y + h * 0.58, 6, "#ffffff")}
    <circle cx="${f2(ox)}" cy="${f2(oy)}" r="${f2(w * 0.5)}" fill="url(#hale)"/>`;
}
async function unvanSvg(ikonDosya) {
  maskeler = [];
  const c = unvanBirebir();
  const kirpik = await sharp(ikonDosya).trim({ threshold: 2 }).resize(720, 720, { fit: "inside" }).png().toBuffer();
  const uri = "data:image/png;base64," + kirpik.toString("base64");
  const KUTU = 390;
  const [ox, oy] = P(153, 149);
  const ikon = `<image href="${uri}" x="${f2(ox - KUTU / 2)}" y="${f2(oy - KUTU / 2)}" width="${KUTU}" height="${KUTU}" preserveAspectRatio="xMidYMid meet" filter="url(#ikonGolge)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>${ortakDefs()}${maskeler.join("")}<clipPath id="pencereKes"><path d="${c.pencere}"/></clipPath>
    <filter id="ikonGolge" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#050b1c" flood-opacity="0.55"/></filter></defs>
  <g clip-path="url(#pencereKes)">${geceZemini(c)}${ikon}
    <path d="${c.pencere}" fill="none" stroke="#000" stroke-width="44" opacity="0.4" filter="url(#bulanik10)"/></g>
  <g filter="url(#golge)">${c.svg}</g>
</svg>`;
}
M = RENKLER.mavi;
// ---------------- komut satırı ----------------
async function yaz(svg, hedef) {
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  await sharp(Buffer.from(svg)).resize(512, 512).png({ compressionLevel: 9 }).toFile(hedef);
  console.log("  " + path.relative(PROJE, hedef));
}
async function kitapUret(k) {
  const K = path.join(PROJE, "gorsel-kaynaklari");
  const rd = path.join(K, "rozetler", `hz-${k}`);
  if (!fs.existsSync(rd)) throw new Error(`Çerçevesiz rozet kaynağı yok: ${path.relative(PROJE, rd)}`);
  const nolar = fs.readdirSync(rd).map((f) => /^bolum-(\d+)\.png$/.exec(f)?.[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
  for (const n of nolar) {
    maskeler = [];
    await yaz(svgYap(rozet(), await veriUri(path.join(rd, `bolum-${n}.png`))), path.join(PROJE, "public/rozetler", `hz-${k}`, `bolum-${n}.png`));
  }
  const md = path.join(K, "madalyalar", `hz-${k}.png`);
  if (fs.existsSync(md)) {
    maskeler = [];
    await yaz(svgYap(madalya(), await veriUri(md)), path.join(PROJE, "public/madalyalar", `hz-${k}.png`));
  } else console.warn(`  uyarı: madalya kaynağı yok (${path.relative(PROJE, md)})`);
}
async function durakUret(k) {
  const kaynak = path.join(PROJE, "gorsel-kaynaklari", "duraklar", `hz-${k}.jpg`);
  if (!fs.existsSync(kaynak)) throw new Error(`Durak sahnesi yok: ${path.relative(PROJE, kaynak)}`);
  maskeler = [];
  await yaz(svgYap(durak(), await veriUri(kaynak)), path.join(PROJE, "public/kitaplar", `hz-${k}`, "harita-durak.png"));
}
async function unvanUret(anahtarlar) {
  const U = path.join(PROJE, "gorsel-kaynaklari", "unvanlar");
  const liste = anahtarlar.length ? anahtarlar : fs.readdirSync(U).filter((f) => f.endsWith(".png")).map((f) => f.slice(0, -4));
  for (const a of liste) await yaz(await unvanSvg(path.join(U, `${a}.png`)), path.join(PROJE, "public/unvanlar", `${a}.png`));
}
const [tur, ...adlar] = process.argv.slice(2);
M = RENKLER.mavi;
if (tur === "kitap" && adlar.length) for (const k of adlar) { console.log(`Hz. ${k}`); await kitapUret(k); }
else if (tur === "unvan") await unvanUret(adlar);
else if (tur === "durak" && adlar.length) for (const k of adlar) await durakUret(k);
else {
  console.error("Kullanım: npm run odul-cerceve -- kitap <bookKey>...  |  durak <bookKey>...  |  unvan [anahtar...]");
  process.exit(1);
}
