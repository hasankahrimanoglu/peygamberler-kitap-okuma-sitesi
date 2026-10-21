"use client";

import { useEffect } from "react";
import { HataEkrani } from "../src/components/ui";
import "./globals.css";

// Kök düzenin kendisi çöktüğünde devreye girer ve onun yerine geçer; bu yüzden
// <html>/<body> ve stil burada yeniden kurulur. Adres bilgisine güvenilmez,
// güvenli taraf veli dünyası ve ana sayfaya dönüş.
export default function KokHataSayfasi({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <title>Bir sorun oluştu</title>
        <HataEkrani
          dunya="veli"
          donus={{ adres: "/", etiket: "Ana Sayfaya Dön" }}
          tekrarDene={unstable_retry}
          hataKodu={error.digest}
        />
      </body>
    </html>
  );
}
