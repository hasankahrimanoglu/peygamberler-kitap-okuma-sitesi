"use client";

import { useSyncExternalStore } from "react";

/**
 * Medya sorgusunu izler. Sunucuda ve ilk çizimde `false` döner; ağır
 * efektler (eğim, paralaks, imleç tepkileri) bu yüzden yalnız tarayıcıda,
 * uygun cihazda açılır.
 */
export function useMedya(sorgu: string) {
  return useSyncExternalStore(
    (bildir) => {
      const mq = window.matchMedia(sorgu);
      mq.addEventListener("change", bildir);
      return () => mq.removeEventListener("change", bildir);
    },
    () => window.matchMedia(sorgu).matches,
    () => false,
  );
}

/** Fareli, geniş ekran: imleç efektleri ve 3B eğim yalnız burada çalışır. */
export const HASSAS_IMLEC = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

/** Dokunmatik ve dar ekranlarda parçacık sayısı azaltılır. */
export const GENIS_EKRAN = "(min-width: 768px)";

/**
 * İşletim sistemindeki "hareketi azalt" tercihi. Motion'ın `useReducedMotion`
 * yerine bu kullanılır: ilk çizimde sunucuyla aynı (`false`) döner, böylece
 * tercihe göre değişen işaretleme hidrasyon uyuşmazlığı doğurmaz.
 */
export function useHareketiAzalt() {
  return useMedya("(prefers-reduced-motion: reduce)");
}
