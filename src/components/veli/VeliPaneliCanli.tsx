"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { supabase } from "../../../lib/supabase";
import { useParentData } from "../../lib/parent/ParentDataProvider";
import { useCocukEkraniGecisi } from "../dashboard/CihazKullanimSorusu";
import { Baglam, EKRANLAR, ekranBul, type Ekran, type GelisimSekmesi, type Perde, type PerdeIcerigi } from "./baglam";
import { CanliProfilFormu, CanliSifreFormu } from "./CanliFormlar";
import { Kabuk } from "./Kabuk";
import { Bildirim } from "./parcalar";
import { Perdeler } from "./Perdeler";
import type { VeliAile } from "./tipler";
import { cocukGorunumu } from "./veriler";
import styles from "./veliPaneli.module.css";

const SECILI_COCUK_ANAHTARI = "veli_paneli_secili_cocuk";
const SEKMELER: GelisimSekmesi[] = ["kitaplar", "oduller", "gorevler"];

/**
 * Canlı veli panelinin kökü (`app/dashboard/layout.tsx`). Veri
 * `ParentDataProvider`'dan gelir; ekranlar (`AnaSayfa`, `Sohbet`, `Gelisim`,
 * `Kutuphane`) önizlemeyle aynıdır. Gezinme gerçek adreslerle yapılır; çocuk
 * ekranına her geçiş `useCocukEkraniGecisi` sorusundan geçer (PROJE-MODELI 3.11).
 * Seçili çocuk ve Gelişim sekmesi düzen boyunca korunur.
 */
export function VeliPaneliCanli({ children }: { children: ReactNode }) {
  const router = useRouter();
  const adres = usePathname() ?? "/dashboard";
  const veri = useParentData();
  const cocukEkrani = useCocukEkraniGecisi();
  const { profiles, profileLimit, books, progressByProfile, tasksByProfile, secimlerByProfile, isLoading } = veri;

  const [eposta, setEposta] = useState("");
  const [seciliCocukId, setSeciliCocukId] = useState<string | null>(null);
  const [gelisimSekmesi, setGelisimSekmesi] = useState<GelisimSekmesi>("kitaplar");
  const [perde, setPerde] = useState<Perde | null>(null);
  const [bildirim, setBildirim] = useState<{ metin: string; ton: "bilgi" | "hata" } | null>(null);
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEposta(data.user?.email ?? ""));
  }, []);

  // İlk açılışta bu sekmede en son seçilen çocuk.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const kayitli = window.sessionStorage.getItem(SECILI_COCUK_ANAHTARI);
        if (kayitli) setSeciliCocukId((onceki) => onceki ?? kayitli);
      } catch {
        // Depolama kapalıysa ilk çocuk seçili gelir.
      }
    });
  }, []);

  // Her sayfa değişiminde `?cocuk=` / `?sekme=`: eski rapor ve ödül adresleri
  // Gelişim'e sayfa içinden yönlenir, düzen yeniden kurulmaz.
  useEffect(() => {
    queueMicrotask(() => {
      const p = new URLSearchParams(window.location.search);
      const cocuk = p.get("cocuk");
      if (cocuk) setSeciliCocukId(cocuk);
      const sekme = p.get("sekme");
      if (sekme && SEKMELER.includes(sekme as GelisimSekmesi)) setGelisimSekmesi(sekme as GelisimSekmesi);
    });
  }, [adres]);

  const cocukSec = useCallback((id: string) => {
    setSeciliCocukId(id);
    try {
      window.sessionStorage.setItem(SECILI_COCUK_ANAHTARI, id);
    } catch {
      // Depolama kapalıysa seçim yalnız bu açılışta korunur.
    }
  }, []);

  const aile = useMemo<VeliAile>(
    () => ({
      eposta,
      profilHakki: profileLimit,
      cocuklar: profiles.map((p) => ({
        id: p.id,
        isim: p.isim,
        avatar_tipi: p.avatar_tipi,
        avatar_url: p.avatar_url ?? null,
      })),
      kitaplar: books,
      ilerleme: progressByProfile,
      gorevler: tasksByProfile,
      secimler: secimlerByProfile,
    }),
    [eposta, profileLimit, profiles, books, progressByProfile, tasksByProfile, secimlerByProfile],
  );
  const gorunumler = useMemo(() => aile.cocuklar.map((c) => cocukGorunumu(aile, c)), [aile]);

  // Silinen ya da hiç olmayan çocuk seçiliyse ilk çocuğa düşer.
  const gecerliSecili = profiles.some((p) => p.id === seciliCocukId) ? seciliCocukId : profiles[0]?.id ?? null;

  const bildir = useCallback((metin: string, ton: "bilgi" | "hata" = "bilgi") => {
    setBildirim({ metin, ton });
    if (zamanlayici.current) clearTimeout(zamanlayici.current);
    zamanlayici.current = setTimeout(() => setBildirim(null), ton === "hata" ? 6000 : 4000);
  }, []);

  // Veri katmanının ve formların sonuç mesajları bildirime dönüşür.
  const { notice, error, setNotice, setError } = veri;
  useEffect(() => {
    if (!notice) return;
    queueMicrotask(() => {
      bildir(notice);
      setNotice(null);
    });
  }, [notice, bildir, setNotice]);
  useEffect(() => {
    if (!error) return;
    queueMicrotask(() => {
      bildir(error, "hata");
      setError(null);
    });
  }, [error, bildir, setError]);

  const git = useCallback(
    (hedef: Ekran, secenek?: { cocukId?: string; sekme?: GelisimSekmesi }) => {
      if (secenek?.cocukId) cocukSec(secenek.cocukId);
      if (secenek?.sekme) setGelisimSekmesi(secenek.sekme);
      else if (hedef === "gelisim") setGelisimSekmesi("kitaplar");
      setPerde(null);
      router.push(EKRANLAR.find((o) => o.ekran === hedef)?.rota ?? "/dashboard");
    },
    [router, cocukSec],
  );

  // `ac` her çizimde yeniden kurulur; bağlam her çizimde değişmesin diye ref.
  const cocukEkraniniAcRef = useRef(cocukEkrani.ac);
  useEffect(() => {
    cocukEkraniniAcRef.current = cocukEkrani.ac;
  });
  const perdeAc = useCallback(
    (yeni: Perde) => {
      if (yeni.tur === "profil-ekle") {
        setPerde(null);
        router.push("/dashboard/profil-ekle");
        return;
      }
      if (yeni.tur === "cihaz") {
        const cocuk =
          profiles.find((p) => p.id === yeni.cocukId) ??
          profiles.find((p) => p.id === gecerliSecili) ??
          profiles[0];
        setPerde(null);
        if (!cocuk) {
          router.push("/dashboard/profil-ekle");
          return;
        }
        cocukEkraniniAcRef.current({ id: cocuk.id, isim: cocuk.isim }, yeni.adres ?? "/map");
        return;
      }
      setPerde(yeni);
    },
    [router, profiles, gecerliSecili],
  );

  const cikisYap = useCallback(() => {
    void supabase.auth.signOut().then(() => router.push("/login"));
  }, [router]);

  const ozelPerde = useCallback(
    (p: Perde): PerdeIcerigi | null => {
      if (p.tur === "profil") {
        return {
          ust: "Profili düzenle",
          baslik: profiles.find((c) => c.id === p.cocukId)?.isim ?? "Çocuk profili",
          govde: <CanliProfilFormu key={p.cocukId} cocukId={p.cocukId} />,
        };
      }
      if (p.tur === "sifre") return { ust: "Hesap", baslik: "Şifre Değiştir", govde: <CanliSifreFormu /> };
      return null;
    },
    [profiles],
  );

  const ekran = ekranBul(adres);
  const deger = useMemo(
    () => ({
      mod: "canli" as const,
      aile,
      gorunumler,
      yukleniyor: isLoading,
      ekran,
      git,
      seciliCocukId: gecerliSecili,
      cocukSec,
      gelisimSekmesi,
      setGelisimSekmesi,
      perdeAc,
      perdeKapat: () => setPerde(null),
      bildir,
      cikisYap,
      ozelPerde,
      ayarlar: { profilSifresiAcik: false, buCihazCocukta: false },
      setAyarlar: () => undefined,
    }),
    [aile, gorunumler, isLoading, ekran, git, gecerliSecili, cocukSec, gelisimSekmesi, perdeAc, bildir, cikisYap, ozelPerde],
  );

  return (
    <Baglam.Provider value={deger}>
      <div
        className={styles.tema}
        // Ortak bileşenler (Buton, PIN girdisi …) başlık fontunu --font-baloo'dan alır; panelde arayüz fontuna bağlanır.
        style={{ "--font-baloo": "var(--font-veli-govde)" } as CSSProperties}
      >
        <Kabuk>
          <motion.div
            key={ekran}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </Kabuk>
        <Perdeler perde={perde} />
        <Bildirim metin={bildirim?.metin ?? null} ton={bildirim?.ton} />
        {cocukEkrani.pencere}
      </div>
    </Baglam.Provider>
  );
}
