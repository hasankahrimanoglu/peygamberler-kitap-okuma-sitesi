/**
 * Landing (tanıtım) sayfasındaki ürün ekran görüntülerini üretir.
 *
 *   npm run tanitim-gorselleri                 → hepsini yeniden çeker
 *   npm run tanitim-gorselleri -- okuma-tablet → yalnız adı verilenleri
 *
 * Gerekenler: çalışan dev sunucusu (varsayılan http://localhost:3100, değiştirmek
 * için TANITIM_URL) ve bilgisayarda Google Chrome. Görüntüler girişsiz
 * `/tasarim/*` önizlemelerinden alınır; Supabase'e hiçbir şey yazılmaz.
 *
 * Çıktı: public/tanitim/{ad}.webp (2× piksel yoğunluğu). Arayüz değişince bu
 * komut yeniden çalıştırılır; landing kodu değişmez (yollar
 * `src/lib/varlikYollari.ts:tanitimGorseli()` üzerinden gelir).
 *
 * Chrome'u DevTools protokolüyle sürer: ekstra paket gerekmez (Node 22+ yerleşik
 * WebSocket'i ve Next ile gelen sharp yeterli).
 */
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const TABAN = process.env.TANITIM_URL ?? "http://localhost:3100";
const CHROME =
  process.env.CHROME_YOLU ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const CIKTI = path.resolve("public/tanitim");

const TABLET = { genislik: 1180, yukseklik: 820 };
const TELEFON = { genislik: 390, yukseklik: 844, mobil: true };

/**
 * Her çekim: adres, ekran ölçüsü ve sayfa yüklendikten sonra çalışacak
 * hazırlık betiği (kaydırma, tıklama). Hazırlık betiği sayfanın içinde çalışır.
 */
const CEKIMLER = [
  { ad: "ana-ekran", adres: "/tasarim/ana-ekran", ...TABLET },
  { ad: "okuma-tablet", adres: "/tasarim/okuma?bolum=musa-1", ...TABLET },
  { ad: "okuma-telefon", adres: "/tasarim/okuma?bolum=musa-1", ...TELEFON },
  {
    ad: "sen-olsaydin",
    adres: "/tasarim/okuma?bolum=adem-2",
    ...TABLET,
    hazirlik: `
      const baslik = document.getElementById("karar-basligi");
      const bolum = baslik?.closest("section");
      if (bolum) window.scrollTo(0, bolum.getBoundingClientRect().top + window.scrollY - 92);
      bolum?.querySelectorAll('[role="radio"]')[2]?.click();
    `,
  },
  {
    ad: "sozluk",
    adres: "/tasarim/okuma?bolum=adem-1",
    ...TELEFON,
    hazirlik: `
      const kelime = [...document.querySelectorAll("button[aria-expanded]")]
        .find((d) => d.textContent?.trim() === "emanet");
      const paragraf = kelime?.closest("p") ?? kelime;
      if (paragraf) window.scrollTo(0, paragraf.getBoundingClientRect().top + window.scrollY - 215);
      kelime?.click();
    `,
  },
  { ad: "oduller", adres: "/tasarim/oduller", ...TABLET },
  { ad: "final", adres: "/tasarim/final?kitap=idris", ...TABLET },
];

/** Next'in geliştirme rozetini ve imleç parıltılarını görüntüden çıkarır. */
const TEMIZLIK = `
  document.querySelectorAll("nextjs-portal").forEach((e) => e.remove());
  // globals.css yumuşak kaydırma açık; hazırlık betiklerindeki ardışık
  // kaydırmalar birbirini yarıda kesmesin.
  document.documentElement.style.scrollBehavior = "auto";
  const stil = document.createElement("style");
  stil.textContent = "*,*::before,*::after{caret-color:transparent!important}";
  document.head.append(stil);
`;

const bekle = (ms) => new Promise((coz) => setTimeout(coz, ms));

async function chromeAc() {
  const profil = await mkdtemp(path.join(tmpdir(), "tanitim-chrome-"));
  const surec = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profil}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  for (let deneme = 0; deneme < 50; deneme += 1) {
    try {
      const yanit = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const hedefler = await yanit.json();
      const sayfa = hedefler.find((h) => h.type === "page");
      if (sayfa) return { surec, profil, wsAdresi: sayfa.webSocketDebuggerUrl };
    } catch {
      // Chrome henüz ayağa kalkmadı.
    }
    await bekle(200);
  }
  surec.kill();
  throw new Error("Chrome başlatılamadı. CHROME_YOLU ile tarayıcı yolunu verin.");
}

function baglan(wsAdresi) {
  const soket = new WebSocket(wsAdresi);
  let sayac = 0;
  const bekleyenler = new Map();
  const olayDinleyicileri = new Map();

  soket.addEventListener("message", (olay) => {
    const mesaj = JSON.parse(olay.data);
    if (mesaj.id && bekleyenler.has(mesaj.id)) {
      const { coz, reddet } = bekleyenler.get(mesaj.id);
      bekleyenler.delete(mesaj.id);
      if (mesaj.error) reddet(new Error(mesaj.error.message));
      else coz(mesaj.result);
    } else if (mesaj.method && olayDinleyicileri.has(mesaj.method)) {
      olayDinleyicileri.get(mesaj.method)();
      olayDinleyicileri.delete(mesaj.method);
    }
  });

  const gonder = (method, params = {}) =>
    new Promise((coz, reddet) => {
      sayac += 1;
      bekleyenler.set(sayac, { coz, reddet });
      soket.send(JSON.stringify({ id: sayac, method, params }));
    });

  const olayiBekle = (method, sinir = 20000) =>
    new Promise((coz) => {
      olayDinleyicileri.set(method, coz);
      setTimeout(coz, sinir);
    });

  return new Promise((coz) => {
    soket.addEventListener("open", () => coz({ soket, gonder, olayiBekle }));
  });
}

async function cek(baglanti, cekim) {
  const { gonder, olayiBekle } = baglanti;
  await gonder("Emulation.setDeviceMetricsOverride", {
    width: cekim.genislik,
    height: cekim.yukseklik,
    deviceScaleFactor: 2,
    mobile: Boolean(cekim.mobil),
  });
  await gonder("Emulation.setTouchEmulationEnabled", { enabled: Boolean(cekim.mobil) });

  const yuklendi = olayiBekle("Page.loadEventFired");
  await gonder("Page.navigate", { url: `${TABAN}${cekim.adres}` });
  await yuklendi;
  // İstemci verisi, yazı tipleri ve giriş animasyonları otursun.
  await bekle(2500);

  await gonder("Runtime.evaluate", { expression: TEMIZLIK });
  if (cekim.hazirlik) {
    await gonder("Runtime.evaluate", { expression: `(() => { ${cekim.hazirlik} })()` });
    await bekle(1600);
  }

  const { data } = await gonder("Page.captureScreenshot", { format: "png" });
  const hedef = path.join(CIKTI, `${cekim.ad}.webp`);
  await sharp(Buffer.from(data, "base64")).webp({ quality: 84 }).toFile(hedef);
  console.log(`✓ ${path.relative(process.cwd(), hedef)}`);
}

async function ana() {
  const istenen = process.argv.slice(2);
  const liste = istenen.length ? CEKIMLER.filter((c) => istenen.includes(c.ad)) : CEKIMLER;
  if (!liste.length) {
    console.error(`Bilinmeyen çekim adı. Geçerli adlar: ${CEKIMLER.map((c) => c.ad).join(", ")}`);
    process.exit(1);
  }

  try {
    await fetch(TABAN);
  } catch {
    console.error(`${TABAN} yanıt vermiyor. Önce dev sunucusunu başlatın.`);
    process.exit(1);
  }

  await mkdir(CIKTI, { recursive: true });
  const { surec, profil, wsAdresi } = await chromeAc();
  const baglanti = await baglan(wsAdresi);
  await baglanti.gonder("Page.enable");

  try {
    for (const cekim of liste) await cek(baglanti, cekim);
  } finally {
    baglanti.soket.close();
    // Chrome kapanırken profil klasörüne yazmaya devam eder; çıkışını bekle.
    const kapandi = new Promise((coz) => surec.once("exit", coz));
    surec.kill();
    await kapandi;
    await rm(profil, { recursive: true, force: true, maxRetries: 3 });
  }
}

ana().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
