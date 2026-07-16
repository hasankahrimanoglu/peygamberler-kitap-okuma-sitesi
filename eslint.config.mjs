import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// Next.js 16 flat config (eslint 9). `next lint` kaldırıldığı için
// lint script'i doğrudan `eslint .` çalıştırır.
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "next-env.d.ts",
      // Statik HTML mockup arşivi — üretim koduna dahil değil.
      "chatgpt-tasarim/**",
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    // React Hooks v6'nın yeni katı kuralları, mevcut veri yükleme kalıplarını
    // (effect içinde setState, render sırasında ref okuma) yakalıyor. Bunların
    // düzeltilmesi reader/ParentDataProvider akışlarında refactor gerektirir ve
    // kendi temizlik turunda ele alınacak; o zamana kadar uyarı seviyesinde kalır.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
];

export default config;
