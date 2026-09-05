import type { NextConfig } from "next";

/**
 * Derleme klasörü normalde `.next`tir. `NEXT_DIST_DIR` tanımlıysa onun yerine
 * o klasör kullanılır.
 *
 * Gerekçe: Next 16, çalışan dev sunucusunu derleme klasöründeki `dev/lock`
 * dosyasından tanır ve aynı klasörde ikinci bir `next dev` başlatılmasına izin
 * vermez. Aynı proje üzerinde paralel bir dev sunucusu (ör. ikinci bir düzenleme
 * oturumu) gerektiğinde o sunucu kendi klasörünü kullanır ve kilit çakışmaz.
 *
 * Değişken tanımlı değilken bu ayarın hiçbir etkisi yoktur; normal
 * `npm run dev` / `npm run build` davranışı değişmez.
 */
const nextConfig: NextConfig = {
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
