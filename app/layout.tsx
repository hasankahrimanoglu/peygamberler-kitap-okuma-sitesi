import type { Metadata } from "next";
import { Baloo_2, Caveat, Lora, Nunito } from "next/font/google";
import { HareketAyari } from "../src/components/ui/HareketAyari";
import "./globals.css";

const balooFont = Baloo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-baloo",
});

const nunitoFont = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
});

const loraFont = Lora({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

// El yazısı fontu — yalnızca Tanık Sayfası (günlük) görünümünde kullanılır.
const caveatFont = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-elyazi",
});

export const metadata: Metadata = {
  title: "Peygamberler Keşif Dünyası",
  description:
    "Çocuklar için interaktif, rozetli ve güvenli kitap okuma deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${balooFont.variable} ${nunitoFont.variable} ${loraFont.variable} ${caveatFont.variable}`}
    >
      <body>
        <HareketAyari>{children}</HareketAyari>
      </body>
    </html>
  );
}
