import type { Config } from "tailwindcss";

/**
 * Tema token'ı: değeri .tema-veli / .tema-cocuk belirler (globals.css).
 *
 * Tailwind 3, düz `var(--x)` rengine opaklık eki (`border-eylem/30`) uygulayamaz
 * ve o sınıfı sessizce hiç üretmez (20 Eki 2026'da 24 sınıf bu yüzden boştu:
 * mavi odak halkası, saydam üst şerit, gri kenarlar). Renk bu yüzden fonksiyon:
 * ek yoksa yine düz `var(--x)`; ek varsa `color-mix` yüzdesi (calc yok — okuma
 * ekranının CSS modülleriyle aynı biçim, iPad Safari'de de çalışır).
 */
function token(ad: string): string {
  const renk = ({ opacityValue }: { opacityValue?: string }) => {
    const oran = Number(opacityValue);
    return Number.isFinite(oran) && oran < 1
      ? `color-mix(in srgb, var(--${ad}) ${Math.round(oran * 100)}%, transparent)`
      : `var(--${ad})`;
  };
  // Tailwind renk fonksiyonunu çalışırken destekler, tip tanımı yalnız metin bekler.
  return renk as unknown as string;
}

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Semantik renkler — değerleri .tema-veli / .tema-cocuk belirler (globals.css)
      colors: {
        zemin: token("zemin"),
        yuzey: {
          DEFAULT: token("yuzey"),
          2: token("yuzey-2"),
        },
        cizgi: token("cizgi"),
        murekkep: {
          DEFAULT: token("murekkep"),
          soluk: token("murekkep-soluk"),
        },
        vurgu: {
          DEFAULT: token("vurgu"),
          yumusak: token("vurgu-yumusak"),
        },
        eylem: {
          DEFAULT: token("eylem"),
          koyu: token("eylem-koyu"),
          metin: token("eylem-metin"),
          yumusak: token("eylem-yumusak"),
        },
        "okuma-yuzey": token("okuma-yuzey"),
        // Veli paneli taslağı (/tasarim/veli-panel) — değerleri veliTaslak.module.css .tema verir
        vt: {
          govde: token("vt-govde"),
          "altin-metin": token("vt-altin-metin"),
          gece: token("vt-gece"),
          "gece-2": token("vt-gece-2"),
          "gece-cizgi": token("vt-gece-cizgi"),
          "gece-metin": token("vt-gece-metin"),
          "gece-soluk": token("vt-gece-soluk"),
          "altin-acik": token("vt-altin-acik"),
          sohbet: token("vt-sohbet"),
          "sohbet-yumusak": token("vt-sohbet-yumusak"),
        },
        // Sabit paletler (tema dışı özel kullanımlar için)
        gece: {
          700: "#1e2f52",
          800: "#16243f",
          900: "#0e1a34",
          950: "#0a1428",
        },
        altin: {
          300: "#f2ce7b",
          400: "#e8b84b",
          500: "#d9a63c",
          600: "#c08f2f",
        },
        tehlike: "#c0392b",
      },
      fontFamily: {
        baslik: ["var(--font-baloo)", "Arial", "sans-serif"],
        govde: ["var(--font-nunito)", "Arial", "sans-serif"],
        story: ["var(--font-lora)", "Georgia", "serif"],
        // Okuma ekranının hikâye yazısı; tanıtım sayfasında başlık yazısı olarak da kullanılır.
        edebi: ["var(--font-literata)", "Georgia", "serif"],
        elyazi: ["var(--font-elyazi)", "cursive"],
        // Veli paneli taslağı: başlık serif + arayüz sans (app/tasarim/veli-panel/layout.tsx)
        "vt-baslik": ["var(--font-vt-baslik)", "Georgia", "serif"],
        "vt-govde": ["var(--font-vt-govde)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        kart: "1.25rem",
        buton: "0.875rem",
      },
      boxShadow: {
        kart: "0 10px 30px -12px rgb(61 43 31 / 0.18)",
        "kart-gece": "0 12px 32px -12px rgb(0 0 0 / 0.55)",
        parlama: "0 0 24px rgb(232 184 75 / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
