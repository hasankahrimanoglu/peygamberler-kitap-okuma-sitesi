"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * framer-motion animasyonlarını işletim sistemi "hareketi azalt" tercihine
 * bağlar. Kök layout'ta tüm uygulamayı sarar (UX denetim bulgusu, Faz 3).
 */
export function HareketAyari({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
