"use client";

import { useEffect, useState } from "react";
import type { Ekran, GelisimSekmesi } from "../../../src/components/veli-taslak/baglam";
import type { AileDurumu } from "../../../src/components/veli-taslak/ornekAile";
import { VeliPanelTaslagi } from "../../../src/components/veli-taslak/VeliPanelTaslagi";

/**
 * Veli paneli yeniden tasarım TASLAĞI (22 Eki 2026) — giriş gerektirmez,
 * Supabase'e bağlanmaz, canlı paneli değiştirmez. Gerçek panel `/dashboard`.
 *   ?ekran=ana|sohbet|gelisim|kutuphane|aile
 *   ?durum=tek|yeni|bos     (varsayılan: iki çocuk)
 *   ?cocuk=elif|omer        ?sekme=kitaplar|oduller|gorevler
 */
const EKRANLAR: Ekran[] = ["ana", "sohbet", "gelisim", "kutuphane", "aile"];
const DURUMLAR: AileDurumu[] = ["iki", "tek", "yeni", "bos"];
const SEKMELER: GelisimSekmesi[] = ["kitaplar", "oduller", "gorevler"];

export default function VeliPaneliTaslagiSayfasi() {
  // Örnek tarihler ("dün", "3 saat önce") ve selamlama saate bağlı; sunucu
  // çiziminden farklı çıkmasın diye taslak yalnız tarayıcıda kurulur.
  const [baslangic, setBaslangic] = useState<Parameters<typeof VeliPanelTaslagi>[0]["baslangic"] | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const p = new URLSearchParams(window.location.search);
      const secilen = <T extends string>(deger: string | null, liste: T[], varsayilan: T) =>
        liste.includes(deger as T) ? (deger as T) : varsayilan;
      setBaslangic({
        durum: secilen(p.get("durum"), DURUMLAR, "iki"),
        ekran: secilen(p.get("ekran"), EKRANLAR, "ana"),
        cocukId: p.get("cocuk") ? `ornek-${p.get("cocuk")}` : null,
        sekme: secilen(p.get("sekme"), SEKMELER, "kitaplar"),
      });
    });
  }, []);

  if (!baslangic) return <div className="min-h-svh bg-[#f7f2e9]" />;
  return <VeliPanelTaslagi baslangic={baslangic} />;
}
