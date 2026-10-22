"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactElement } from "react";
import { Aile } from "./Aile";
import { AnaSayfa } from "./AnaSayfa";
import { Baglam, type Ekran, type GelisimSekmesi, type Perde } from "./baglam";
import { Gelisim } from "./Gelisim";
import { Kabuk } from "./Kabuk";
import { Kutuphane } from "./Kutuphane";
import { ornekAile, type AileDurumu } from "./ornekAile";
import { Bildirim } from "./parcalar";
import { Perdeler } from "./Perdeler";
import { Sohbet } from "./Sohbet";
import { cocukGorunumu } from "./veriler";
import styles from "./veliPaneli.module.css";

type Baslangic = {
  durum: AileDurumu;
  ekran: Ekran;
  cocukId: string | null;
  sekme: GelisimSekmesi;
};

/**
 * Veli paneli ÖNİZLEMESİNİN kökü (`/tasarim/veli-panel`): canlı panelle aynı
 * ekranlar, örnek aileyle. Hiçbir işlem Supabase'e gitmez; işlem yerine ne
 * olacağı kısa bir notla söylenir. Ekranlar arası geçiş adres çubuğuna yazılır
 * (`?ekran=sohbet`), böylece her ekranın bağlantısı paylaşılabilir. Canlı kök:
 * `VeliPaneliCanli.tsx`.
 */
export function VeliPaneliOnizleme({ baslangic }: { baslangic: Baslangic }) {
  const aile = useMemo(() => ornekAile(baslangic.durum), [baslangic.durum]);
  const gorunumler = useMemo(() => aile.cocuklar.map((c) => cocukGorunumu(aile, c)), [aile]);

  const [ekran, setEkran] = useState<Ekran>(baslangic.ekran);
  const [seciliCocukId, setSeciliCocukId] = useState<string | null>(
    baslangic.cocukId && aile.cocuklar.some((c) => c.id === baslangic.cocukId) ? baslangic.cocukId : aile.cocuklar[0]?.id ?? null,
  );
  const [gelisimSekmesi, setGelisimSekmesi] = useState<GelisimSekmesi>(baslangic.sekme);
  const [perde, setPerde] = useState<Perde | null>(null);
  const [bildirim, setBildirim] = useState<{ metin: string; ton: "bilgi" | "hata" } | null>(null);
  const [ayarlar, setAyarlar] = useState({ profilSifresiAcik: Boolean(aile.profilSifresiAcik), buCihazCocukta: false });
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bildir = useCallback((metin: string, ton: "bilgi" | "hata" = "bilgi") => {
    setBildirim({ metin, ton });
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
    zamanlayici.current = setTimeout(() => setBildirim(null), 3800);
  }, []);

  const git = useCallback(
    (hedef: Ekran, secenek?: { cocukId?: string; sekme?: GelisimSekmesi }) => {
      setEkran(hedef);
      if (secenek?.cocukId) setSeciliCocukId(secenek.cocukId);
      if (secenek?.sekme) setGelisimSekmesi(secenek.sekme);
      else if (hedef === "gelisim") setGelisimSekmesi("kitaplar");
      setPerde(null);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    [],
  );

  // Adres çubuğu: ekran ve seçili çocuk (durum parametresi korunur).
  useEffect(() => {
    const adres = new URL(window.location.href);
    if (ekran === "ana") adres.searchParams.delete("ekran");
    else adres.searchParams.set("ekran", ekran);
    if (seciliCocukId && aile.cocuklar.length > 1) adres.searchParams.set("cocuk", seciliCocukId.replace("ornek-", ""));
    else adres.searchParams.delete("cocuk");
    window.history.replaceState(null, "", adres);
  }, [ekran, seciliCocukId, aile.cocuklar.length]);

  const deger = useMemo(
    () => ({
      mod: "onizleme" as const,
      aile,
      gorunumler,
      yukleniyor: false,
      ekran,
      git,
      seciliCocukId,
      cocukSec: setSeciliCocukId,
      gelisimSekmesi,
      setGelisimSekmesi,
      perdeAc: setPerde,
      perdeKapat: () => setPerde(null),
      bildir,
      cikisYap: () => bildir("Önizleme: burada oturum kapanır ve giriş sayfası açılır."),
      ayarlar,
      setAyarlar,
    }),
    [aile, gorunumler, ekran, git, seciliCocukId, gelisimSekmesi, bildir, ayarlar],
  );

  const ekranlar: Record<Ekran, ReactElement> = {
    ana: <AnaSayfa />,
    sohbet: <Sohbet />,
    gelisim: <Gelisim />,
    kutuphane: <Kutuphane />,
    aile: <Aile />,
  };

  return (
    <Baglam.Provider value={deger}>
      <div
        className={styles.tema}
        // Ortak bileşenler (Buton …) başlık fontunu --font-baloo'dan alır; panelde arayüz fontuna bağlanır.
        style={{ "--font-baloo": "var(--font-veli-govde)" } as CSSProperties}
      >
        <Kabuk>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ekran}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {ekranlar[ekran]}
            </motion.div>
          </AnimatePresence>
        </Kabuk>
        <Perdeler perde={perde} />
        <Bildirim metin={bildirim?.metin ?? null} ton={bildirim?.ton} />
      </div>
    </Baglam.Provider>
  );
}
