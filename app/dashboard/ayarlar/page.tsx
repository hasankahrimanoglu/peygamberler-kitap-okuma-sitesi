"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useParentData, type ChildProfile } from "../../../src/lib/parent/ParentDataProvider";
import {
  aileGuvenlikDurumu,
  cocukSifresiBelirle,
  eslesmeKoduOlustur,
  profilSifresiAyariniDegistir,
  type AileGuvenlikDurumu,
} from "../../../src/lib/aileGuvenligi";
import {
  cihaziCocugaVer,
  cocukModuAcikMi,
  cocukModunuAc,
  cocukModunuKapat,
  profiliAc,
} from "../../../src/lib/child/cocukOturumu";
import { formatReportDate } from "../../../src/lib/parent/report";
import { cocukSifresiHataMetni } from "../../../src/components/dashboard/cocukSifresiMetni";
import { PinGirdisi, VeliPinBelirlemeAkisi } from "../../../src/components/dashboard/VeliPinFormu";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";
import { Buton, CocukAvatari, Ikon, Kart } from "../../../src/components/ui";

type BagliCihaz = {
  id: string;
  profile_id: string;
  cihaz_adi: string | null;
  baglandi: string;
};

type EslesmeKodu = { profilId: string; kod: string; bitis: number; olusturuldu: number };

type PinYonlendirmesi = { profil: string | null; hedef: string | null };

/** Olay işleyicilerinde şimdiki zaman (çizim sırasında çağrılmaz). */
const simdikiZaman = () => Date.now();

/**
 * Aile ve Güvenlik (Faz 7 — PROJE-MODELI 3.11): veli PIN'i, profil şifresi
 * ayarı ve çocuk şifreleri, çocuğun kendi cihazını bağlama ve bağlı cihazlar,
 * bu cihazdaki çocuk modu. `?pin=gerekli&profil=…&hedef=…` ile gelinirse
 * (çocuk ekranı PIN'siz açılmak istendi) önce PIN belirletilir, sonra çocuk
 * ekranına geçilir.
 */
export default function AileVeGuvenlikSayfasi() {
  const router = useRouter();
  const { profiles, isLoading } = useParentData();
  const [durum, setDurum] = useState<AileGuvenlikDurumu | null>(null);
  const [cihazlar, setCihazlar] = useState<BagliCihaz[]>([]);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const [pinAkisiAcik, setPinAkisiAcik] = useState(false);
  const [pinYonlendirmesi, setPinYonlendirmesi] = useState<PinYonlendirmesi | null>(null);
  const [cocukModu, setCocukModu] = useState(false);
  const [cihazVeriliyor, setCihazVeriliyor] = useState(false);

  const yenile = useCallback(async () => {
    const [guvenlik, baglantilar] = await Promise.all([
      aileGuvenlikDurumu(),
      supabase
        .from("cihaz_baglantilari")
        .select("id, profile_id, cihaz_adi, baglandi")
        .order("baglandi", { ascending: false }),
    ]);
    setDurum(guvenlik);
    setCihazlar((baglantilar.data as BagliCihaz[] | null) ?? []);
    return { guvenlik, cihazlar: (baglantilar.data as BagliCihaz[] | null) ?? [] };
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void yenile();
      setCocukModu(cocukModuAcikMi());
      const parametreler = new URLSearchParams(window.location.search);
      if (parametreler.get("pin") === "gerekli") {
        setPinYonlendirmesi({ profil: parametreler.get("profil"), hedef: parametreler.get("hedef") });
        setPinAkisiAcik(true);
      }
    });
  }, [yenile]);

  function pinKaydedildi() {
    setPinAkisiAcik(false);
    setMesaj("Veli PIN'i kaydedildi.");
    void yenile();

    // PIN, cihaz çocuğa verilirken istendi: şimdi çocuk moduna geçilir.
    if (!pinYonlendirmesi) return;
    const hedef = pinYonlendirmesi.hedef?.startsWith("/") ? pinYonlendirmesi.hedef : "/map";
    const profil = profiles.find((p) => p.id === pinYonlendirmesi.profil);
    if (profil) {
      profiliAc({ id: profil.id, isim: profil.isim });
      router.push(hedef);
    } else if (pinYonlendirmesi.hedef) {
      cocukModunuAc();
      router.push(hedef);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <VeliSayfaBasligi
        baslik="Aile ve Güvenlik"
        aciklama="Veli PIN'i, profil şifreleri ve çocuklarınızın kendi cihazları."
      />

      {mesaj ? (
        <p
          role="status"
          className="mb-5 rounded-kart border border-eylem/30 bg-eylem-yumusak px-4 py-3 text-base font-semibold text-eylem-koyu"
        >
          {mesaj}
        </p>
      ) : null}

      <div className="space-y-5">
        {/* Veli PIN'i */}
        <Kart className={pinYonlendirmesi ? "border-vurgu/50" : ""}>
          <BolumBasligi ikon="kilit" baslik="Veli PIN'i" />
          {pinYonlendirmesi ? (
            <p className="mt-3 text-base font-semibold leading-7 text-murekkep">
              Cihazı çocuğa vermeden önce 4 haneli bir veli PIN&apos;i belirleyin. Çocuğa verilen
              cihazda veli paneli bu PIN&apos;le açılır.
            </p>
          ) : (
            <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
              {durum?.veliPinVar
                ? "Belirlendi. Çocuğa verilen cihazda veli paneli bu PIN'le açılır."
                : "Henüz belirlenmedi. Bir cihazı ilk kez çocuğa verirken istenir."}
            </p>
          )}

          {pinAkisiAcik ? (
            <div className="mt-4 rounded-kart border border-cizgi bg-yuzey-2 p-4">
              <VeliPinBelirlemeAkisi
                baslik={durum?.veliPinVar ? "PIN'i değiştir" : "PIN belirle"}
                aciklama="Önce hesap şifrenizi girin. PIN çocuklarınızın şifresinden farklı olmalı."
                onBitti={pinKaydedildi}
                onVazgec={pinYonlendirmesi ? undefined : () => setPinAkisiAcik(false)}
              />
            </div>
          ) : (
            <Buton varyant="cerceve" boyut="kucuk" className="mt-4" onClick={() => setPinAkisiAcik(true)}>
              {durum?.veliPinVar ? "PIN'i Değiştir" : "PIN Belirle"}
            </Buton>
          )}
        </Kart>

        {/* Profil şifresi */}
        <ProfilSifresiBolumu
          profiller={profiles}
          durum={durum}
          yukleniyor={isLoading}
          onDegisti={(metin) => {
            setMesaj(metin);
            void yenile();
          }}
        />

        {/* Çocuğun kendi cihazı */}
        <CihazBolumu
          profiller={profiles}
          cihazlar={cihazlar}
          yenile={yenile}
          onMesaj={setMesaj}
        />

        {/* Bu cihaz */}
        <Kart>
          <BolumBasligi ikon="hesap" baslik="Bu cihaz" />
          {cocukModu ? (
            <>
              <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
                Bu cihaz çocuğunuza verildi: veli paneli burada PIN ister. Bu cihazı yalnız siz
                kullanıyorsanız çocuk modunu kapatabilirsiniz.
              </p>
              <Buton
                varyant="cerceve"
                boyut="kucuk"
                className="mt-4"
                onClick={() => {
                  cocukModunuKapat();
                  setCocukModu(false);
                  setMesaj("Bu cihazda çocuk modu kapatıldı.");
                }}
              >
                Çocuk Modunu Kapat
              </Buton>
            </>
          ) : (
            <>
              <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
                Bu cihaz sizde: veli paneli PIN istemez. Evdeki tablet gibi çocuğunuzun da
                kullanacağı bir cihazsa çocuğa verin; panel PIN&apos;le kilitlenir, çocuklar
                &quot;Kim okuyor?&quot; ekranından kendi profillerine girer.
              </p>
              <Buton
                varyant="eylem"
                boyut="kucuk"
                className="mt-4"
                disabled={cihazVeriliyor}
                onClick={() => {
                  setCihazVeriliyor(true);
                  void cihaziCocugaVer(router);
                }}
              >
                {cihazVeriliyor ? "Hazırlanıyor…" : "Bu Cihazı Çocuğa Ver"}
              </Buton>
            </>
          )}
        </Kart>
      </div>
    </div>
  );
}

function BolumBasligi({ ikon, baslik }: { ikon: "kilit" | "hesap" | "harita"; baslik: string }) {
  return (
    <h2 className="flex items-center gap-2 font-baslik text-xl font-bold text-murekkep">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-vurgu-yumusak text-vurgu">
        <Ikon ad={ikon} boyut={18} />
      </span>
      {baslik}
    </h2>
  );
}

function ProfilSifresiBolumu({
  profiller,
  durum,
  yukleniyor,
  onDegisti,
}: {
  profiller: ChildProfile[];
  durum: AileGuvenlikDurumu | null;
  yukleniyor: boolean;
  onDegisti: (mesaj: string) => void;
}) {
  const [duzenlenen, setDuzenlenen] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [degisiyor, setDegisiyor] = useState(false);
  const acik = Boolean(durum?.profilSifresiAcik);
  const sifreli = new Set(durum?.sifresiOlanProfiller ?? []);

  async function ayariDegistir() {
    setHata(null);
    setDegisiyor(true);
    const sonuc = await profilSifresiAyariniDegistir(!acik);
    setDegisiyor(false);
    if (sonuc === "eksik_sifre") {
      setHata("Ayarı açmadan önce her çocuk için bir şifre belirleyin.");
      return;
    }
    if (sonuc !== "tamam") {
      setHata("Ayar kaydedilemedi. Tekrar deneyin.");
      return;
    }
    onDegisti(acik ? "Profil şifresi kapatıldı." : "Profil şifresi açıldı.");
  }

  return (
    <Kart>
      <BolumBasligi ikon="kilit" baslik="Ortak tablette profil şifresi" />
      <div className="mt-4 flex items-start justify-between gap-4">
        <p className="text-base font-medium leading-7 text-murekkep-soluk">
          Açıkken her çocuk &quot;Kim okuyor?&quot; ekranında kendi profiline 4 rakamlı şifresiyle
          girer; kardeşinin profilinde okuyamaz. Açık profil 30 dakika kullanılmazsa kapanır.
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={acik}
          aria-label="Profillere girerken şifre sorulsun"
          disabled={degisiyor || durum === null}
          onClick={() => void ayariDegistir()}
          className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition-colors disabled:opacity-50 ${
            acik ? "border-eylem bg-eylem" : "border-cizgi bg-yuzey-2"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 rounded-full bg-yuzey shadow transition-transform ${
              acik ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      {hata ? <p role="alert" className="mt-3 text-sm font-semibold text-tehlike">{hata}</p> : null}

      <ul className="mt-4 divide-y divide-cizgi rounded-kart border border-cizgi">
        {yukleniyor ? (
          <li className="p-4 text-base font-medium text-murekkep-soluk">Profiller yükleniyor…</li>
        ) : profiller.length === 0 ? (
          <li className="p-4 text-base font-medium text-murekkep-soluk">Henüz çocuk profili yok.</li>
        ) : (
          profiller.map((profil) => (
            <li key={profil.id} className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-cizgi bg-yuzey-2">
                  <CocukAvatari avatarTipi={profil.avatar_tipi} fotografUrl={profil.avatar_url} boyut={42} alt="" />
                </span>
                <span className="min-w-0 flex-1 font-baslik text-lg font-bold text-murekkep">{profil.isim}</span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    sifreli.has(profil.id) ? "bg-eylem-yumusak text-eylem" : "bg-yuzey-2 text-murekkep-soluk"
                  }`}
                >
                  {sifreli.has(profil.id) ? "Şifre belirlendi" : "Şifre yok"}
                </span>
                {duzenlenen !== profil.id ? (
                  <Buton varyant="cerceve" boyut="kucuk" onClick={() => setDuzenlenen(profil.id)}>
                    {sifreli.has(profil.id) ? "Değiştir" : "Şifre Belirle"}
                  </Buton>
                ) : null}
              </div>
              {duzenlenen === profil.id ? (
                <CocukSifresiFormu
                  profil={profil}
                  onVazgec={() => setDuzenlenen(null)}
                  onKaydedildi={() => {
                    setDuzenlenen(null);
                    onDegisti(`${profil.isim} için profil şifresi kaydedildi.`);
                  }}
                />
              ) : null}
            </li>
          ))
        )}
      </ul>
    </Kart>
  );
}

function CocukSifresiFormu({
  profil,
  onVazgec,
  onKaydedildi,
}: {
  profil: ChildProfile;
  onVazgec: () => void;
  onKaydedildi: () => void;
}) {
  const [sifre, setSifre] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [bekliyor, setBekliyor] = useState(false);

  async function gonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHata(null);
    if (!/^[0-9]{4}$/.test(sifre)) {
      setHata("Şifre 4 rakam olmalı.");
      return;
    }
    if (sifre !== tekrar) {
      setHata("İki şifre aynı değil.");
      return;
    }
    setBekliyor(true);
    const sonuc = await cocukSifresiBelirle(profil.id, sifre);
    setBekliyor(false);
    if (sonuc === "tamam") {
      onKaydedildi();
      return;
    }
    setHata(cocukSifresiHataMetni(sonuc));
  }

  return (
    <form onSubmit={gonder} className="mt-4 space-y-4 rounded-kart border border-cizgi bg-yuzey-2 p-4">
      <p className="text-sm font-medium leading-6 text-murekkep-soluk">
        Şifreyi {profil.isim} ile birlikte seçin. Eski şifre gösterilmez; yenisi hemen geçerli olur.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <PinGirdisi etiket="Yeni şifre" deger={sifre} onDegis={setSifre} />
        <PinGirdisi etiket="Şifreyi tekrar yazın" deger={tekrar} onDegis={setTekrar} />
      </div>
      {hata ? <p role="alert" className="text-sm font-semibold text-tehlike">{hata}</p> : null}
      <div className="flex gap-3">
        <Buton type="button" varyant="cerceve" tamGenislik onClick={onVazgec}>
          Vazgeç
        </Buton>
        <Buton type="submit" varyant="eylem" tamGenislik disabled={bekliyor}>
          {bekliyor ? "Kaydediliyor…" : "Şifreyi Kaydet"}
        </Buton>
      </div>
    </form>
  );
}

function CihazBolumu({
  profiller,
  cihazlar,
  yenile,
  onMesaj,
}: {
  profiller: ChildProfile[];
  cihazlar: BagliCihaz[];
  yenile: () => Promise<{ cihazlar: BagliCihaz[] }>;
  onMesaj: (mesaj: string) => void;
}) {
  const [kod, setKod] = useState<EslesmeKodu | null>(null);
  const [simdi, setSimdi] = useState(() => Date.now());
  const [hata, setHata] = useState<string | null>(null);
  const [kaldirilacak, setKaldirilacak] = useState<string | null>(null);
  const isim = (profilId: string) => profiller.find((p) => p.id === profilId)?.isim ?? "Çocuk";

  // Kod ekrandayken geri sayım ve bağlanan cihazı yakalama.
  useEffect(() => {
    if (!kod) return undefined;
    const saniye = window.setInterval(() => setSimdi(Date.now()), 1000);
    const yoklama = window.setInterval(() => {
      void yenile().then(({ cihazlar: guncel }) => {
        const yeni = guncel.find(
          (c) => c.profile_id === kod.profilId && Date.parse(c.baglandi) >= kod.olusturuldu - 5000,
        );
        if (yeni) {
          const ad = profiller.find((p) => p.id === kod.profilId)?.isim ?? "Çocuk";
          setKod(null);
          onMesaj(`${ad} için cihaz bağlandı${yeni.cihaz_adi ? `: ${yeni.cihaz_adi}` : ""}.`);
        }
      });
    }, 4000);
    return () => {
      window.clearInterval(saniye);
      window.clearInterval(yoklama);
    };
  }, [kod, yenile, onMesaj, profiller]);

  async function kodUret(profilId: string) {
    setHata(null);
    const sonuc = await eslesmeKoduOlustur(profilId);
    if (!sonuc) {
      setHata("Kod üretilemedi. Tekrar deneyin.");
      return;
    }
    const zaman = simdikiZaman();
    setSimdi(zaman);
    setKod({ profilId, kod: sonuc.kod, bitis: Date.parse(sonuc.bitis), olusturuldu: zaman });
  }

  async function kaldir(id: string, profilId: string) {
    const { error } = await supabase.from("cihaz_baglantilari").delete().eq("id", id);
    setKaldirilacak(null);
    if (error) {
      setHata("Cihaz kaldırılamadı. Tekrar deneyin.");
      return;
    }
    onMesaj(`Cihaz kaldırıldı; artık ${isim(profilId)} profiline erişemez.`);
    void yenile();
  }

  const kalan = kod ? Math.max(0, Math.floor((kod.bitis - simdi) / 1000)) : 0;
  const adres = typeof window === "undefined" ? "/cihaz-bagla" : `${window.location.host}/cihaz-bagla`;

  return (
    <Kart>
      <BolumBasligi ikon="harita" baslik="Çocuğun kendi cihazı" />
      <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
        Çocuğunuzun kendi tableti ya da telefonu varsa bir kodla bağlayın. O cihazda yalnız o
        çocuğun profili açılır; veli paneli açılmaz. Hesap şifreniz o cihaza girilmez.
      </p>
      {hata ? <p role="alert" className="mt-3 text-sm font-semibold text-tehlike">{hata}</p> : null}

      {kod ? (
        <div className="mt-4 rounded-kart border border-vurgu/50 bg-vurgu-yumusak p-5 text-center">
          <p className="text-base font-semibold text-murekkep">{isim(kod.profilId)} için bağlama kodu</p>
          <p className="mt-2 font-baslik text-5xl font-bold tracking-[0.2em] text-murekkep">
            {kalan > 0 ? `${kod.kod.slice(0, 3)} ${kod.kod.slice(3)}` : "— — —"}
          </p>
          <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
            {kalan > 0
              ? `Çocuğunuzun cihazında ${adres} adresini açıp bu kodu girin. Kod ${Math.floor(kalan / 60)}:${String(kalan % 60).padStart(2, "0")} içinde ve yalnız bir kez geçerli.`
              : "Kodun süresi doldu. Yeni bir kod üretin."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Buton varyant="cerceve" boyut="kucuk" onClick={() => setKod(null)}>
              Kapat
            </Buton>
            <Buton varyant="eylem" boyut="kucuk" onClick={() => void kodUret(kod.profilId)}>
              Yeni Kod
            </Buton>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {profiller.map((profil) => (
            <Buton key={profil.id} varyant="cerceve" boyut="kucuk" onClick={() => void kodUret(profil.id)}>
              {profil.isim} için cihaz bağla
            </Buton>
          ))}
        </div>
      )}

      <h3 className="mt-6 text-base font-bold text-murekkep">Bağlı cihazlar</h3>
      {cihazlar.length === 0 ? (
        <p className="mt-2 text-base font-medium text-murekkep-soluk">Henüz bağlı cihaz yok.</p>
      ) : (
        <ul className="mt-2 divide-y divide-cizgi rounded-kart border border-cizgi">
          {cihazlar.map((cihaz) => (
            <li key={cihaz.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-murekkep">
                  {isim(cihaz.profile_id)} · {cihaz.cihaz_adi ?? "Cihaz"}
                </p>
                <p className="text-sm font-medium text-murekkep-soluk">
                  Bağlandı: {formatReportDate(cihaz.baglandi)}
                </p>
              </div>
              {kaldirilacak === cihaz.id ? (
                <div className="flex gap-2">
                  <Buton varyant="cerceve" boyut="kucuk" onClick={() => setKaldirilacak(null)}>
                    Vazgeç
                  </Buton>
                  <Buton varyant="tehlike" boyut="kucuk" onClick={() => void kaldir(cihaz.id, cihaz.profile_id)}>
                    Evet, Kaldır
                  </Buton>
                </div>
              ) : (
                <Buton
                  varyant="cerceve"
                  boyut="kucuk"
                  className="!border-tehlike/40 !text-tehlike"
                  onClick={() => setKaldirilacak(cihaz.id)}
                >
                  Kaldır
                </Buton>
              )}
            </li>
          ))}
        </ul>
      )}
    </Kart>
  );
}
