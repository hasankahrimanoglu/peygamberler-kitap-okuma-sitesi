"use client";

import type { ReactNode } from "react";
import { useCocukOturumu } from "../../lib/child/cocukOturumu";

/**
 * Okuma ve final testi gibi `useSelectedChild` kullanmayan çocuk ekranlarını
 * sarar (Faz 7 — PROJE-MODELI 3.11). Oturum doğrulanana kadar içerik
 * çizilmez; yönlendirme gerekiyorsa koruma kendisi yapar.
 */
export function CocukKorumasi({ children }: { children: ReactNode }) {
  const oturum = useCocukOturumu();
  if (oturum.durum !== "hazir") return <div aria-busy="true" className="min-h-screen" />;
  return <>{children}</>;
}
