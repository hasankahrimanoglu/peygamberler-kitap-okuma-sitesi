import { Figtree, Literata } from "next/font/google";

// Veli panelinin yazı ailesi (PROJE-MODELI 3.2, REVİZE 22 Eki 2026). Başlıklar
// Literata'nın optik boyutlu kesimi: tanıtım sayfasının başlıklarıyla ve okuma
// ekranının hikâye yazısıyla aynı aile, büyük puntoda daha ince ve zarif.
// Arayüz metni Figtree: yuvarlak olmayan, 16px'te çok okunaklı, eşit genişlikli
// rakamları var. İki aile de Türkçe dil kurallarını taşır (fi bitişmesi ı/i'yi
// bozmaz — Fraunces ve Newsreader bu yüzden elendi). Canlı panelin düzeni
// (`app/dashboard/layout.tsx`) ve önizleme (`/tasarim/veli-panel`) aynı
// tanımı kullanır.
const baslik = Literata({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-veli-baslik",
});

const govde = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-veli-govde",
});

/** Yazı değişkenlerini taşıyan sınıflar; panelin en dış öğesine verilir. */
export const veliYaziSiniflari = `${baslik.variable} ${govde.variable}`;
