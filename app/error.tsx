"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HataEkrani, hataDunyasiBul } from "../src/components/ui";

// Beklenmedik hatalar için Türkçe ekran (Next'in İngilizce varsayılanı yerine).
// Tek dosya bütün rotaları karşılar; çocuk ya da veli dünyası adresten seçilir.
export default function HataSayfasi({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const adres = usePathname() ?? "/";
  const { dunya, donus } = hataDunyasiBul(adres);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return <HataEkrani dunya={dunya} donus={donus} tekrarDene={unstable_retry} hataKodu={error.digest} />;
}
