"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { geciciCihazIstemcisi, supabase } from "../../lib/supabase";
import { beklemeMetni, cihazAdiTahmini, cihaziBagla } from "../../src/lib/aileGuvenligi";
import { profiliAc } from "../../src/lib/child/cocukOturumu";
import { Logo } from "../../src/components/marka/Logo";
import { Buton } from "../../src/components/ui";
import { anaEkranUygulamasindaMi, appleCihazi } from "../../src/components/dashboard/AnaEkranNotu";

/**
 * Çocuğun kendi cihazını bağlama (Faz 7 — PROJE-MODELI 3.11). Veli panelden
 * 6 rakamlı, 10 dakika geçerli bir kod üretir; çocuk kodu burada girer.
 * Cihaz Supabase'in anonim oturumuyla açılır ve yalnız o çocuğun verisine
 * erişir. Bu cihazda velinin oturumu açıksa önce uyarılır: bağlamak veli
 * oturumunu bu cihazda kapatır — ama yalnız kod tuttuktan sonra.
 * Aynı tarayıcının sekmeleri aynı cihazdır; bağlanınca öteki sekmedeki veli
 * oturumu da kapanır.
 */
export default function CihazBaglaSayfasi() {
  const router = useRouter();
  const [kod, setKod] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [bilgi, setBilgi] = useState<string | null>(null);
  const [bekliyor, setBekliyor] = useState(false);
  const [veliUyarisi, setVeliUyarisi] = useState(false);
  const [veliOnayladi, setVeliOnayladi] = useState(false);
  // Geçici istemcideki anonim oturum denemeler arasında korunur; yanlış kod
  // sayacı aynı oturuma işler.
  const geciciIstemci = useRef<SupabaseClient | null>(null);

  const [anaEkranIpucu, setAnaEkranIpucu] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      if (new URLSearchParams(window.location.search).get("durum") === "kaldirildi") {
        setBilgi("Bu cihazın bağlantısı kaldırılmış. Annenden ya da babandan yeni bir kod iste.");
      }
      // iPad/iPhone'da ana ekran simgesinin hafızası tarayıcıdan ayrıdır:
      // kod simgeden açılan ekranda girilmeli (3.11).
      setAnaEkranIpucu(appleCihazi() && !anaEkranUygulamasindaMi());
    });
  }, []);

  // Ana ekrana bu sayfadan eklenmiş, zaten bağlı cihaz: doğrudan haritaya.
  useEffect(() => {
    let iptal = false;
    void supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user.is_anonymous) return;
      const { data } = await supabase.from("cihaz_baglantilari").select("profile_id").maybeSingle();
      if (!iptal && data?.profile_id) router.replace("/map");
    });
    return () => {
      iptal = true;
    };
  }, [router]);

  function baglanamadi(metin = "Bağlanamadı. İnternetini kontrol edip tekrar dene.") {
    setBekliyor(false);
    setHata(metin);
  }

  async function bagla(veliOturumunuKapat: boolean) {
    setHata(null);
    setBekliyor(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const veliOturumu = Boolean(session && !session.user.is_anonymous);

    if (veliOturumu && !veliOturumunuKapat) {
      setBekliyor(false);
      setVeliUyarisi(true);
      return;
    }

    // Bağlantısı kaldırılmış cihaz kendi anonim oturumuyla yeniden dener.
    // Diğer durumlarda anonim oturum geçici istemcide açılır: kod tutmadıkça
    // ya da anonim giriş kapalıysa bu cihazdaki veli oturumu kapanmaz.
    let istemci: SupabaseClient = supabase;
    if (!session?.user.is_anonymous) {
      if (!geciciIstemci.current) {
        const gecici = geciciCihazIstemcisi();
        const { error } = await gecici.auth.signInAnonymously();
        if (error) {
          baglanamadi(
            error.message.toLocaleLowerCase("tr-TR").includes("anonymous")
              ? "Cihaz bağlama şu an kapalı. Annene ya da babana söyle."
              : undefined,
          );
          return;
        }
        geciciIstemci.current = gecici;
      }
      istemci = geciciIstemci.current;
    }

    const sonuc = await cihaziBagla(kod, cihazAdiTahmini(), istemci);

    if (sonuc?.durum === "tamam" && sonuc.profilId) {
      if (istemci !== supabase) {
        const {
          data: { session: cihazOturumu },
        } = await istemci.auth.getSession();
        if (!cihazOturumu) {
          baglanamadi();
          return;
        }
        if (veliOturumu) await supabase.auth.signOut({ scope: "local" });
        const { error } = await supabase.auth.setSession({
          access_token: cihazOturumu.access_token,
          refresh_token: cihazOturumu.refresh_token,
        });
        if (error) {
          baglanamadi();
          return;
        }
        geciciIstemci.current = null;
      }
      profiliAc({ id: sonuc.profilId, isim: sonuc.isim ?? null });
      router.replace("/map");
      return;
    }

    setBekliyor(false);
    setKod("");
    if (sonuc?.durum === "kilitli") {
      setHata(`Çok deneme oldu. ${beklemeMetni(sonuc.kalanSaniye)} sonra tekrar dene.`);
    } else if (sonuc?.durum === "yanlis") {
      setHata("Kod tutmadı. Kodu kontrol et; kodlar 10 dakika geçerli.");
    } else {
      setHata("Bağlanamadı. İnternetini kontrol edip tekrar dene.");
    }
  }

  function gonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (kod.length !== 6) {
      setHata("Kod 6 rakamdan oluşur.");
      return;
    }
    void bagla(veliOnayladi);
  }

  function veliOnayiVer() {
    setVeliUyarisi(false);
    setVeliOnayladi(true);
    void bagla(true);
  }

  return (
    <main className="tema-cocuk zemin-yildizli flex min-h-screen flex-col items-center px-4 pb-10 pt-6 text-murekkep sm:px-8">
      <div className="w-full max-w-5xl">
        <Logo ton="acik" boyut={40} />
      </div>

      <div className="flex w-full flex-1 items-center justify-center py-10">
        <section className="w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 sm:p-8">
          <h1 className="text-center font-baslik text-3xl font-bold">Cihazını bağla</h1>
          <p className="mt-3 text-center text-lg font-medium leading-7 text-murekkep-soluk">
            Annenden ya da babandan aldığın 6 rakamlı kodu yaz.
          </p>

          {bilgi ? (
            <p className="mt-5 rounded-buton border border-cizgi bg-yuzey-2 px-4 py-3 text-base font-semibold leading-6">
              {bilgi}
            </p>
          ) : null}

          {veliUyarisi ? (
            <div className="mt-6 space-y-4 text-center">
              <p className="text-base font-semibold leading-7">
                Bu cihazda bir veli hesabı açık. Cihazı çocuğa bağlarsanız veli oturumu bu cihazda
                kapanır.
              </p>
              <Buton varyant="eylem" tamGenislik disabled={bekliyor} onClick={veliOnayiVer}>
                Devam Et ve Bağla
              </Buton>
              <Buton varyant="cerceve" tamGenislik onClick={() => router.push("/kim-okuyor")}>
                Vazgeç
              </Buton>
            </div>
          ) : (
            <form onSubmit={gonder} className="mt-6 space-y-5">
              <label className="block">
                <span className="sr-only">6 rakamlı kod</span>
                <input
                  value={kod}
                  onChange={(event) => {
                    setHata(null);
                    setKod(event.target.value.replace(/\D/g, "").slice(0, 6));
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  className="h-16 w-full rounded-buton border-2 border-cizgi bg-zemin text-center font-baslik text-4xl font-bold tracking-[0.3em] text-murekkep outline-none transition placeholder:text-murekkep-soluk/40 focus:border-vurgu"
                />
              </label>
              <p role="alert" className="min-h-6 text-center text-base font-semibold text-vurgu">
                {hata ?? ""}
              </p>
              <Buton type="submit" varyant="eylem" boyut="buyuk" tamGenislik disabled={bekliyor}>
                {bekliyor ? "Bağlanıyor…" : "Bağla"}
              </Buton>
            </form>
          )}
        </section>
      </div>

      {anaEkranIpucu ? (
        <p className="mb-4 max-w-md text-center text-base font-medium leading-7 text-murekkep-soluk">
          Veliye not: Bu cihazı ana ekrana ekleyecekseniz önce ekleyin, kodu simgeden açılan
          ekranda girin; simgenin hafızası tarayıcıdan ayrıdır.
        </p>
      ) : null}
      <Link
        href="/login"
        className="min-h-11 px-3 py-2 text-base font-semibold text-murekkep-soluk underline-offset-4 hover:underline"
      >
        Veli misiniz? Giriş yapın
      </Link>
    </main>
  );
}
