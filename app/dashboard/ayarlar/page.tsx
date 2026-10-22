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
import { CihazBaglandiKarti, EslesmeKoduKarti } from "../../../src/components/dashboard/AnaEkranNotu";
import { useVeliPaneli } from "../../../src/components/veli/baglam";
import { Durum, Grup, NasilCalisir } from "../../../src/components/veli/Aile";
import { Anahtar, CocukYuzu, IkonKutusu, Satir, SayfaBasligi, Yuzey } from "../../../src/components/veli/parcalar";
import { Buton, Ikon } from "../../../src/components/ui";

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

/** Satırlardaki küçük çocuk yüzü (fotoğraf varsa fotoğraf). */
function yuz(profil: ChildProfile) {
  return (
    <CocukYuzu
      cocuk={{ id: profil.id, isim: profil.isim, avatar_tipi: profil.avatar_tipi, avatar_url: profil.avatar_url ?? null }}
      boyut={48}
      halka="yok"
    />
  );
}

/**
 * Aile ve Güvenlik (Faz 7 — PROJE-MODELI 3.11; görünüm REVİZE 22 Eki 2026, 3.9):
 * çocuk profilleri, bu cihaz, çocuğun kendi cihazı, profil şifresi, veli PIN'i,
 * hesap. Akışların mantığı Faz 7'deki gibidir; yalnız görünüm yeni panel
 * dilindedir (`src/components/veli/`). `?pin=gerekli&profil=…&hedef=…` ile
 * gelinirse (çocuk ekranı PIN'siz açılmak istendi) önce PIN belirletilir, sonra
 * çocuk ekranına geçilir.
 */
export default function AileVeGuvenlikSayfasi() {
  const router = useRouter();
  const { profiles, profileLimit, isLoading } = useParentData();
  const { aile, bildir, perdeAc, cikisYap } = useVeliPaneli();
  const [durum, setDurum] = useState<AileGuvenlikDurumu | null>(null);
  const [cihazlar, setCihazlar] = useState<BagliCihaz[]>([]);
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
    bildir("Veli PIN'i kaydedildi.");
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

  const sifreli = new Set(durum?.sifresiOlanProfiller ?? []);
  const kalanHak = profileLimit - profiles.length;
  const bagliSayisi = (profilId: string) => cihazlar.filter((c) => c.profile_id === profilId).length;

  const pinGrubu = (
    <Grup
      baslik="Veli PIN'i"
      aciklama={
        pinYonlendirmesi
          ? "Cihazı çocuğa vermeden önce 4 haneli bir veli PIN'i belirleyin. Çocuğa verilen cihazda veli paneli bu PIN'le açılır."
          : undefined
      }
    >
      <Satir
        sol={<IkonKutusu ikon="kalkan" ton={durum?.veliPinVar ? "eylem" : "notr"} boyut={48} />}
        baslik={durum === null ? "Durum okunuyor…" : durum.veliPinVar ? "Belirlendi" : "Henüz belirlenmedi"}
        alt={
          durum?.veliPinVar
            ? "Çocuğa verilen cihazda veli paneli bu PIN'le açılır."
            : "Bir cihazı ilk kez çocuğa verirken istenir."
        }
        sag={
          pinAkisiAcik ? undefined : (
            <Buton varyant="cerceve" boyut="kucuk" onClick={() => setPinAkisiAcik(true)}>
              {durum?.veliPinVar ? "Değiştir" : "Belirle"}
            </Buton>
          )
        }
      />
      {pinAkisiAcik ? (
        <div className="bg-yuzey-2/60 p-4 sm:p-5">
          <VeliPinBelirlemeAkisi
            baslik={durum?.veliPinVar ? "PIN'i değiştir" : "PIN belirle"}
            aciklama="Önce hesap şifrenizi girin. PIN çocuklarınızın şifresinden farklı olmalı."
            onBitti={pinKaydedildi}
            onVazgec={pinYonlendirmesi ? undefined : () => setPinAkisiAcik(false)}
          />
        </div>
      ) : null}
    </Grup>
  );

  return (
    <div>
      <SayfaBasligi baslik="Aile ve Güvenlik" aciklama="Çocuk profilleri, cihazlar ve güvenlik ayarları." />

      <Yuzey className="mb-8 grid grid-cols-1 divide-y divide-cizgi sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Durum
          ikon="kalkan"
          etiket="Veli PIN'i"
          deger={durum === null ? "…" : durum.veliPinVar ? "Belirlendi" : "Belirlenmedi"}
          iyi={Boolean(durum?.veliPinVar)}
        />
        <Durum
          ikon="kilit"
          etiket="Profil şifresi"
          deger={durum === null ? "…" : durum.profilSifresiAcik ? "Açık" : "Kapalı"}
          iyi={Boolean(durum?.profilSifresiAcik)}
        />
        <Durum
          ikon="tablet"
          etiket="Bağlı cihaz"
          deger={cihazlar.length > 0 ? `${cihazlar.length} cihaz` : "Yok"}
          iyi={cihazlar.length > 0}
        />
      </Yuzey>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
        <div className="space-y-8">
          {pinYonlendirmesi ? pinGrubu : null}

          <Grup baslik="Çocuklar">
            {isLoading ? (
              <Satir baslik="Profiller yükleniyor…" />
            ) : (
              profiles.map((profil) => {
                const bagli = bagliSayisi(profil.id);
                return (
                  <Satir
                    key={profil.id}
                    sol={yuz(profil)}
                    baslik={profil.isim}
                    alt={[
                      sifreli.has(profil.id) ? "Profil şifresi var" : "Profil şifresi yok",
                      bagli > 0 ? `${bagli} bağlı cihaz` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                    onClick={() => perdeAc({ tur: "profil", cocukId: profil.id })}
                  />
                );
              })
            )}
            {!isLoading && kalanHak > 0 ? (
              <Satir
                sol={<IkonKutusu ikon="arti" ton="eylem" boyut={48} />}
                baslik="Çocuk profili ekle"
                alt={`${kalanHak} profil hakkınız kaldı`}
                onClick={() => router.push("/dashboard/profil-ekle")}
              />
            ) : null}
          </Grup>

          <Grup baslik="Bu cihaz">
            <div className="flex items-start gap-4 px-4 py-4 sm:px-5">
              <IkonKutusu ikon="tablet" ton="gece" boyut={48} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-6 text-murekkep">
                  {cocukModu ? "Bu cihaz çocuğunuza verildi" : "Bu cihaz sizde"}
                </p>
                <p className="mt-0.5 text-[0.9375rem] leading-6 text-murekkep-soluk">
                  {cocukModu
                    ? "Veli paneli burada PIN ister. Bu cihazı yalnız siz kullanıyorsanız çocuk modunu kapatabilirsiniz."
                    : "Veli paneli PIN istemez. Evdeki tablet gibi çocuğunuzun da kullanacağı bir cihazsa çocuğa verin; panel PIN'le kilitlenir, çocuklar “Kim okuyor?” ekranından kendi profillerine girer."}
                </p>
                <div className="mt-4">
                  {cocukModu ? (
                    <Buton
                      varyant="cerceve"
                      boyut="kucuk"
                      onClick={() => {
                        cocukModunuKapat();
                        setCocukModu(false);
                        bildir("Bu cihazda çocuk modu kapatıldı.");
                      }}
                    >
                      Çocuk Modunu Kapat
                    </Buton>
                  ) : (
                    <Buton
                      varyant="eylem"
                      boyut="kucuk"
                      disabled={cihazVeriliyor}
                      onClick={() => {
                        setCihazVeriliyor(true);
                        void cihaziCocugaVer(router);
                      }}
                    >
                      <Ikon ad="tablet" boyut={17} />
                      {cihazVeriliyor ? "Hazırlanıyor…" : "Bu Cihazı Çocuğa Ver"}
                    </Buton>
                  )}
                </div>
              </div>
            </div>
          </Grup>

          <CihazBolumu profiller={profiles} cihazlar={cihazlar} yenile={yenile} onMesaj={bildir} />

          <ProfilSifresiBolumu
            profiller={profiles}
            durum={durum}
            yukleniyor={isLoading}
            onDegisti={(metin) => {
              bildir(metin);
              void yenile();
            }}
          />

          {pinYonlendirmesi ? null : pinGrubu}

          <Grup baslik="Hesap">
            <Satir sol={<IkonKutusu ikon="hesap" boyut={48} />} baslik="E-posta" alt={aile.eposta || "—"} />
            <Satir
              sol={<IkonKutusu ikon="kilit" boyut={48} />}
              baslik="Şifre Değiştir"
              onClick={() => perdeAc({ tur: "sifre" })}
            />
            <Satir
              sol={
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-tehlike/10 text-tehlike">
                  <Ikon ad="cikis" boyut={20} />
                </span>
              }
              baslik="Çıkış Yap"
              tehlike
              onClick={cikisYap}
            />
          </Grup>
        </div>

        <aside className="xl:sticky xl:top-10">
          <NasilCalisir />
        </aside>
      </div>
    </div>
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
    <Grup
      baslik="Ortak tablette profil şifresi"
      aciklama="Açıkken her çocuk “Kim okuyor?” ekranında kendi profiline 4 rakamlı şifresiyle girer; kardeşinin profilinde okuyamaz. Açık profil 30 dakika kullanılmazsa kapanır."
    >
      <Satir
        sol={<IkonKutusu ikon="kilit" ton={acik ? "eylem" : "notr"} boyut={48} />}
        baslik="Profil şifresi"
        alt={durum === null ? "Durum okunuyor…" : acik ? "Açık" : "Kapalı"}
        sag={
          <Anahtar
            etiket="Profillere girerken şifre sorulsun"
            acik={acik}
            disabled={degisiyor || durum === null}
            onDegis={() => void ayariDegistir()}
          />
        }
      />
      {hata ? (
        <p role="alert" className="px-4 py-3 text-[0.9375rem] font-semibold text-tehlike sm:px-5">
          {hata}
        </p>
      ) : null}
      {yukleniyor ? (
        <Satir baslik="Profiller yükleniyor…" />
      ) : profiller.length === 0 ? (
        <Satir baslik="Henüz çocuk profili yok." />
      ) : (
        profiller.map((profil) => (
          <div key={profil.id}>
            <Satir
              sol={yuz(profil)}
              baslik={profil.isim}
              alt={sifreli.has(profil.id) ? "Şifre belirlendi" : "Şifre yok"}
              sag={
                duzenlenen !== profil.id ? (
                  <Buton varyant="cerceve" boyut="kucuk" onClick={() => setDuzenlenen(profil.id)}>
                    {sifreli.has(profil.id) ? "Değiştir" : "Belirle"}
                  </Buton>
                ) : undefined
              }
            />
            {duzenlenen === profil.id ? (
              <div className="px-4 pb-4 sm:px-5">
                <CocukSifresiFormu
                  profil={profil}
                  onVazgec={() => setDuzenlenen(null)}
                  onKaydedildi={() => {
                    setDuzenlenen(null);
                    onDegisti(`${profil.isim} için profil şifresi kaydedildi.`);
                  }}
                />
              </div>
            ) : null}
          </div>
        ))
      )}
    </Grup>
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
    <form onSubmit={gonder} className="space-y-4 rounded-[1.25rem] bg-yuzey-2/70 p-4">
      <p className="text-[0.9375rem] leading-6 text-veli-govde">
        Şifreyi {profil.isim} ile birlikte seçin. Eski şifre gösterilmez; yenisi hemen geçerli olur.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <PinGirdisi etiket="Yeni şifre" deger={sifre} onDegis={setSifre} />
        <PinGirdisi etiket="Şifreyi tekrar yazın" deger={tekrar} onDegis={setTekrar} />
      </div>
      {hata ? (
        <p role="alert" className="text-[0.9375rem] font-semibold text-tehlike">
          {hata}
        </p>
      ) : null}
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
  const [baglanan, setBaglanan] = useState<{ profilId: string; cihazAdi: string | null } | null>(null);
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
          setKod(null);
          setBaglanan({ profilId: kod.profilId, cihazAdi: yeni.cihaz_adi });
        }
      });
    }, 4000);
    return () => {
      window.clearInterval(saniye);
      window.clearInterval(yoklama);
    };
  }, [kod, yenile]);

  async function kodUret(profilId: string) {
    setHata(null);
    setBaglanan(null);
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
    <Grup
      baslik="Çocuğun kendi cihazı"
      aciklama="Çocuğunuzun kendi tableti ya da telefonu varsa bir kodla bağlayın. O cihazda yalnız o çocuğun profili açılır; veli paneli açılmaz. Hesap şifreniz o cihaza girilmez."
    >
      {hata ? (
        <p role="alert" className="px-4 py-3 text-[0.9375rem] font-semibold text-tehlike sm:px-5">
          {hata}
        </p>
      ) : null}

      {kod ? (
        <div className="px-4 pb-4 sm:px-5">
          <EslesmeKoduKarti
            isim={isim(kod.profilId)}
            kod={kod.kod}
            kalanSaniye={kalan}
            adres={adres}
            onKapat={() => setKod(null)}
            onYeniKod={() => void kodUret(kod.profilId)}
          />
        </div>
      ) : baglanan ? (
        <div className="px-4 pb-4 sm:px-5">
          <CihazBaglandiKarti
            isim={isim(baglanan.profilId)}
            cihazAdi={baglanan.cihazAdi}
            onTamam={() => setBaglanan(null)}
          />
        </div>
      ) : null}

      {profiller.map((profil) => {
        const bagli = cihazlar.filter((c) => c.profile_id === profil.id).length;
        return (
          <Satir
            key={profil.id}
            sol={yuz(profil)}
            baslik={profil.isim}
            alt={bagli > 0 ? `${bagli} bağlı cihaz` : "Bağlı cihaz yok"}
            sag={
              <Buton varyant="ikincil" boyut="kucuk" onClick={() => void kodUret(profil.id)}>
                Cihaz Bağla
              </Buton>
            }
          />
        );
      })}

      {cihazlar.map((cihaz) => (
        <div key={cihaz.id} className="flex flex-wrap items-center gap-4 px-4 py-3 sm:px-5">
          <IkonKutusu ikon="tablet" boyut={48} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-6 text-murekkep">
              {isim(cihaz.profile_id)} · {cihaz.cihaz_adi ?? "Cihaz"}
            </p>
            <p className="text-[0.9375rem] leading-6 text-murekkep-soluk">Bağlandı: {formatReportDate(cihaz.baglandi)}</p>
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
        </div>
      ))}
    </Grup>
  );
}
