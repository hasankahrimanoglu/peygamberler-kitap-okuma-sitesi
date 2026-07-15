import type { Config } from "tailwindcss";

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
        zemin: "var(--zemin)",
        yuzey: {
          DEFAULT: "var(--yuzey)",
          2: "var(--yuzey-2)",
        },
        cizgi: "var(--cizgi)",
        murekkep: {
          DEFAULT: "var(--murekkep)",
          soluk: "var(--murekkep-soluk)",
        },
        vurgu: {
          DEFAULT: "var(--vurgu)",
          yumusak: "var(--vurgu-yumusak)",
        },
        eylem: {
          DEFAULT: "var(--eylem)",
          koyu: "var(--eylem-koyu)",
          metin: "var(--eylem-metin)",
          yumusak: "var(--eylem-yumusak)",
        },
        "okuma-yuzey": "var(--okuma-yuzey)",
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
        elyazi: ["var(--font-elyazi)", "cursive"],
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
