"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Tanıtım sayfalarının hareket katmanı. Motion'ın yalnız gerekli özellikleri
 * (giriş, görünür olunca canlanma, dokunma/üzerine gelme) yüklenir; sayfa
 * bileşenleri `motion.*` yerine hafif `m.*` kullanır.
 *
 * "Hareketi azalt" tercihi kök layout'taki `HareketAyari` ile zaten geçerlidir.
 */
export function TanitimHareketi({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
