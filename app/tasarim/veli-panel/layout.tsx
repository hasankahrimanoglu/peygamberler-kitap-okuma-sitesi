import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Literata } from "next/font/google";

// Veli paneli taslağının yazı ailesi (TASLAK, 22 Eki 2026). Başlıklar
// Literata'nın optik boyutlu kesimi: tanıtım sayfasının başlıklarıyla ve okuma
// ekranının hikâye yazısıyla aynı aile, büyük puntoda daha ince ve zarif.
// Arayüz metni Figtree: yuvarlak olmayan, 16px'te çok okunaklı, eşit genişlikli
// rakamları var. İki aile de Türkçe dil kurallarını taşır (fi bitişmesi ı/i'yi
// bozmaz — Fraunces ve Newsreader bu yüzden elendi).
const baslik = Literata({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-vt-baslik",
});

const govde = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-vt-govde",
});

export const metadata: Metadata = {
  title: "Veli Paneli · Taslak",
  robots: { index: false, follow: false },
};

export default function VeliPaneliTaslakDuzeni({ children }: { children: ReactNode }) {
  return (
    <div className={`${baslik.variable} ${govde.variable}`}>{children}</div>
  );
}
