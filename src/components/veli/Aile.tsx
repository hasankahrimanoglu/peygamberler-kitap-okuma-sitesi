"use client";

import type { ReactNode } from "react";
import { Buton, Ikon } from "../ui";
import { useVeliPaneli } from "./baglam";
import { Anahtar, CocukYuzu, IkonKutusu, Satir, SayfaBasligi, Yuzey } from "./parcalar";
import styles from "./veliPaneli.module.css";

/**
 * Aile ve Güvenlik — ÖNİZLEME sürümü (örnek aile, işlem yok). Canlı sayfa
 * `app/dashboard/ayarlar/page.tsx`'tir: aynı gruplar (`Grup`, `Durum`,
 * `NasilCalisir`) gerçek PIN, şifre ve eşleme akışlarıyla. Gruplar velinin
 * zihnindeki sırayla: çocuklar → cihazlar → güvenlik → hesap. Her satır kendi
 * durumunu söyler ("Belirlendi", "Kapalı"). Kurallar PROJE-MODELI 3.11.
 */
export function Aile() {
  const { aile, perdeAc, ayarlar, setAyarlar, bildir } = useVeliPaneli();
  const bagliSayisi = aile.cocuklar.filter((c) => c.bagliCihaz).length;
  const kalanHak = aile.profilHakki - aile.cocuklar.length;

  return (
    <div>
      <SayfaBasligi baslik="Aile ve Güvenlik" aciklama="Çocuk profilleri, cihazlar ve güvenlik ayarları." />

      <Yuzey className="mb-8 grid grid-cols-1 divide-y divide-cizgi sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Durum
          ikon="kalkan"
          etiket="Veli PIN'i"
          deger={aile.veliPinVar ? "Belirlendi" : "Belirlenmedi"}
          iyi={Boolean(aile.veliPinVar)}
        />
        <Durum
          ikon="kilit"
          etiket="Profil şifresi"
          deger={ayarlar.profilSifresiAcik ? "Açık" : "Kapalı"}
          iyi={ayarlar.profilSifresiAcik}
        />
        <Durum ikon="tablet" etiket="Bağlı cihaz" deger={bagliSayisi > 0 ? `${bagliSayisi} cihaz` : "Yok"} iyi={bagliSayisi > 0} />
      </Yuzey>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
        <div className="space-y-8">
          <Grup baslik="Çocuklar">
            {aile.cocuklar.map((c) => (
              <Satir
                key={c.id}
                sol={<CocukYuzu cocuk={c} boyut={48} halka="yok" />}
                baslik={c.isim}
                alt={[c.sifresiVar ? "Profil şifresi var" : "Profil şifresi yok", c.bagliCihaz ? `${c.bagliCihaz} bağlı` : null]
                  .filter(Boolean)
                  .join(" · ")}
                onClick={() => perdeAc({ tur: "profil", cocukId: c.id })}
              />
            ))}
            {kalanHak > 0 ? (
              <Satir
                sol={<IkonKutusu ikon="arti" ton="eylem" boyut={48} />}
                baslik="Çocuk profili ekle"
                alt={`${kalanHak} profil hakkınız kaldı`}
                onClick={() => perdeAc({ tur: "profil-ekle" })}
              />
            ) : null}
          </Grup>

          <Grup baslik="Bu cihaz">
            <div className="flex items-start gap-4 px-4 py-4 sm:px-5">
              <IkonKutusu ikon="tablet" ton="gece" boyut={48} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-6 text-murekkep">
                  {ayarlar.buCihazCocukta ? "Bu cihaz çocuğa verildi" : "Bu cihaz sizde"}
                </p>
                <p className="mt-0.5 text-[0.9375rem] leading-6 text-murekkep-soluk">
                  {ayarlar.buCihazCocukta
                    ? "Veli paneli burada PIN ister. Cihazı yalnız siz kullanıyorsanız çocuk modunu kapatabilirsiniz."
                    : "Veli paneli PIN istemez. Evdeki tablet gibi çocuğunuzun da kullanacağı bir cihazsa çocuğa verin."}
                </p>
                <div className="mt-4">
                  {ayarlar.buCihazCocukta ? (
                    <Buton
                      varyant="cerceve"
                      boyut="kucuk"
                      onClick={() => {
                        setAyarlar({ ...ayarlar, buCihazCocukta: false });
                        bildir("Bu cihazda çocuk modu kapatıldı (önizleme).");
                      }}
                    >
                      Çocuk Modunu Kapat
                    </Buton>
                  ) : (
                    <Buton varyant="eylem" boyut="kucuk" onClick={() => perdeAc({ tur: "cihaz" })}>
                      <Ikon ad="tablet" boyut={17} />
                      Bu Cihazı Çocuğa Ver
                    </Buton>
                  )}
                </div>
              </div>
            </div>
          </Grup>

          <Grup
            baslik="Çocuğun kendi cihazı"
            aciklama="Çocuğunuzun kendi tableti ya da telefonu varsa eşleme koduyla bağlanır; kod o cihazda girilir."
          >
            {aile.cocuklar.map((c) => (
              <Satir
                key={c.id}
                sol={<CocukYuzu cocuk={c} boyut={48} halka="yok" />}
                baslik={c.isim}
                alt={c.bagliCihaz ? `${c.bagliCihaz} · bağlı` : "Bağlı cihaz yok"}
                sag={
                  <Buton
                    varyant={c.bagliCihaz ? "cerceve" : "ikincil"}
                    boyut="kucuk"
                    onClick={() => perdeAc({ tur: "eslesme", cocukId: c.id })}
                  >
                    {c.bagliCihaz ? "Yeni Kod" : "Kod Oluştur"}
                  </Buton>
                }
              />
            ))}
          </Grup>

          <Grup
            baslik="Ortak tablette profil şifresi"
            aciklama="Açıkken her çocuk kendi profiline 4 rakamlı şifresiyle girer; kardeşinin profilinde okuyamaz."
          >
            <Satir
              sol={<IkonKutusu ikon="kilit" boyut={48} />}
              baslik="Profil şifresi"
              alt={ayarlar.profilSifresiAcik ? "Açık" : "Kapalı"}
              sag={
                <Anahtar
                  etiket="Profil şifresi"
                  acik={ayarlar.profilSifresiAcik}
                  onDegis={(acik) => {
                    const eksik = aile.cocuklar.filter((c) => !c.sifresiVar);
                    if (acik && eksik.length > 0) {
                      bildir(`Ayarı açmadan önce ${eksik.map((c) => c.isim).join(", ")} için şifre belirleyin.`);
                      return;
                    }
                    setAyarlar({ ...ayarlar, profilSifresiAcik: acik });
                  }}
                />
              }
            />
            {aile.cocuklar.map((c) => (
              <Satir
                key={c.id}
                sol={<span className="w-12" />}
                baslik={c.isim}
                alt={c.sifresiVar ? "Şifre belirlendi" : "Şifre yok"}
                sag={
                  <Buton varyant="cerceve" boyut="kucuk" onClick={() => perdeAc({ tur: "cocuk-sifresi", cocukId: c.id })}>
                    {c.sifresiVar ? "Değiştir" : "Belirle"}
                  </Buton>
                }
              />
            ))}
          </Grup>

          <Grup baslik="Veli PIN'i">
            <Satir
              sol={<IkonKutusu ikon="kalkan" boyut={48} />}
              baslik={aile.veliPinVar ? "Belirlendi" : "Belirlenmedi"}
              alt={
                aile.veliPinVar
                  ? "Çocuğa verilen cihazda veli paneli bu PIN'le açılır."
                  : "Bir cihazı ilk kez çocuğa verirken istenir."
              }
              sag={
                <Buton varyant="cerceve" boyut="kucuk" onClick={() => perdeAc({ tur: "pin" })}>
                  {aile.veliPinVar ? "Değiştir" : "Belirle"}
                </Buton>
              }
            />
          </Grup>

          <Grup baslik="Hesap">
            <Satir sol={<IkonKutusu ikon="hesap" boyut={48} />} baslik="E-posta" alt={aile.eposta} />
            <Satir sol={<IkonKutusu ikon="kilit" boyut={48} />} baslik="Şifre Değiştir" onClick={() => perdeAc({ tur: "sifre" })} />
            <Satir
              sol={
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-tehlike/10 text-tehlike">
                  <Ikon ad="cikis" boyut={20} />
                </span>
              }
              baslik="Çıkış Yap"
              tehlike
              onClick={() => bildir("Önizleme: burada oturum kapanır ve giriş sayfası açılır.")}
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

export function Durum({
  ikon,
  etiket,
  deger,
  iyi,
}: {
  ikon: "kalkan" | "kilit" | "tablet";
  etiket: string;
  deger: string;
  iyi: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 p-4 sm:p-5">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
          iyi ? "bg-eylem-yumusak text-eylem-koyu" : "bg-yuzey-2 text-veli-govde"
        }`}
      >
        <Ikon ad={ikon} boyut={20} />
      </span>
      <span>
        <span className="block text-[0.875rem] text-murekkep-soluk">{etiket}</span>
        <span className="block font-semibold text-murekkep">{deger}</span>
      </span>
    </div>
  );
}

export function Grup({ baslik, aciklama, children }: { baslik: string; aciklama?: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="px-1 font-veli-baslik text-[1.25rem] font-medium text-murekkep">{baslik}</h2>
      {aciklama ? <p className="mt-1 px-1 text-[0.9375rem] leading-6 text-murekkep-soluk">{aciklama}</p> : null}
      <Yuzey className="mt-3 divide-y divide-cizgi overflow-hidden">{children}</Yuzey>
    </section>
  );
}

/** Aile cihaz modeli üç cümlede (PROJE-MODELI 3.11). */
export function NasilCalisir() {
  const adimlar = [
    {
      ikon: "hesap" as const,
      baslik: "Sizin telefonunuz",
      metin: "Veli paneli doğrudan açılır, PIN istemez.",
    },
    {
      ikon: "tablet" as const,
      baslik: "Evdeki ortak tablet",
      metin:
        "Cihazı çocuğa verdiğinizde veli paneli PIN'le kilitlenir. Çocuklar “Kim okuyor?” ekranında kendi adına dokunur.",
    },
    {
      ikon: "kalkan" as const,
      baslik: "Çocuğun kendi cihazı",
      metin: "Eşleme kodunu o cihazda girin; cihaz yalnız o çocuğun profiline bağlanır.",
    },
  ];
  return (
    <section aria-labelledby="nasil" className={`${styles.gokyuzu} rounded-[1.5rem] p-6 sm:p-7`}>
      <h2 id="nasil" className="font-veli-baslik text-[1.375rem] font-medium leading-tight">
        Aile cihazları nasıl çalışır?
      </h2>
      <ol className="mt-5 space-y-5">
        {adimlar.map((a) => (
          <li key={a.baslik} className="flex gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-veli-altin-acik">
              <Ikon ad={a.ikon} boyut={19} />
            </span>
            <span>
              <span className="block font-semibold text-veli-gece-metin">{a.baslik}</span>
              <span className="mt-0.5 block text-[0.9375rem] leading-6 text-veli-gece-soluk">{a.metin}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
