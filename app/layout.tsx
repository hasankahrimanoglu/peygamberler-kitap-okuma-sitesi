import type { Metadata } from "next";
import { Baloo_2, Lora } from "next/font/google";
import "./globals.css";

const balooFont = Baloo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-baloo",
});

const loraFont = Lora({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Hz. Ebû Bekir Okuma Sayfası",
  description: "Çocuklar için interaktif kitap okuma deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${balooFont.variable} ${loraFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
