"use client";

import { useState } from "react";
import { kutuphaneListesi } from "../../lib/derive";
import { Buton, Ikon, OdulIkonu } from "../ui";
import { yolculukKitaplari } from "../../lib/child/yolculuk";
import { useVeliPaneli, type Perde, type PerdeIcerigi } from "./baglam";
import { BolumYolu, Cip, CocukYuzu, Kapak, PerdeKabugu } from "./parcalar";
import { ilgiEki, katalogBilgisi, yonelmeEki } from "./veriler";

type Baglam = ReturnType<typeof useVeliPaneli>;
type Icerik = PerdeIcerigi;

/**
 * Açık perdenin içeriği. Canlıda profil düzenleme ve şifre gerçek formla
 * gelir (`ozelPerde`, VeliPaneliCanli); önizlemede hiçbir işlem Supabase'e gitmez.
 */
export function Perdeler({ perde }: { perde: Perde | null }) {
  const ctx = useVeliPaneli();
  const { perdeKapat } = ctx;
  const acik = perde !== null;

  // İçerik kurucuları bileşen değil, düz fonksiyondur; bağlam bir kez okunup
  // verilir (hook sırası perdeden perdeye değişmesin).
  let icerik: Icerik | null = perde ? ctx.ozelPerde?.(perde) ?? null : null;
  if (icerik || !perde) {
    // canlı form ya da kapalı perde
  } else if (perde.tur === "cihaz") icerik = CihazPerdesi(ctx, perde);
  else if (perde.tur === "kitap") icerik = KitapPerdesi(ctx, perde);
  else if (perde.tur === "odul") icerik = OdulPerdesi(perde);
  else if (perde.tur === "profil") icerik = ProfilPerdesi(ctx, perde);
  else if (perde.tur === "profil-ekle") icerik = ProfilPerdesi(ctx, null);
  else if (perde.tur === "eslesme") icerik = EslesmePerdesi(ctx, perde);
  else if (perde.tur === "sifre") icerik = SifrePerdesi(ctx, "sifre");
  else if (perde.tur === "pin") icerik = SifrePerdesi(ctx, "pin");
  else if (perde.tur === "cocuk-sifresi") icerik = SifrePerdesi(ctx, "cocuk", perde.cocukId);

  return (
    <PerdeKabugu acik={acik && icerik !== null} onKapat={perdeKapat} baslik={icerik?.baslik ?? ""} ust={icerik?.ust} alt={icerik?.alt}>
      {icerik?.govde}
    </PerdeKabugu>
  );
}

// --- Cihazı çocuğa verme (PROJE-MODELI 3.11 "Bu cihazı çocuğunuz kullanacak mı?") ---

function CihazPerdesi(ctx: Baglam, perde: Extract<Perde, { tur: "cihaz" }>) {
  const { aile, bildir, perdeKapat } = ctx;
  const cocuk = aile.cocuklar.find((c) => c.id === perde.cocukId) ?? null;

  function sec(metin: string) {
    perdeKapat();
    bildir(metin);
  }

  return {
    ust: cocuk ? `${cocuk.isim} · ${perde.etiket ?? "Okuma rotası"}` : "Çocuk ekranı",
    baslik: "Bu cihazı çocuğunuz kullanacak mı?",
    govde: (
      <div className="space-y-3 pt-1">
        <p className="text-base leading-7 text-veli-govde">Seçiminize göre veli paneli bu cihazda kilitlenir ya da açık kalır.</p>
        <button
          type="button"
          onClick={() =>
            sec(
              cocuk
                ? `Önizleme: panel PIN'le kilitlenir, ${cocuk.isim} kaldığı kitaptan sıradaki bölüme geçer.`
                : "Önizleme: panel PIN'le kilitlenir ve “Kim okuyor?” ekranı açılır.",
            )
          }
          className="block w-full rounded-[1.25rem] bg-eylem px-5 py-4 text-left text-white shadow-sm transition-colors hover:bg-eylem-koyu"
        >
          <span className="flex items-center gap-3">
            {cocuk ? <CocukYuzu cocuk={cocuk} boyut={40} /> : <Ikon ad="tablet" boyut={24} />}
            <span className="font-semibold">
              {cocuk ? `Evet, ${yonelmeEki(cocuk.isim)} veriyorum` : "Evet, çocuğuma veriyorum"}
            </span>
          </span>
          <span className="mt-2 block text-[0.9375rem] leading-6 text-white/90">
            Veli paneli bu cihazda PIN&apos;le kilitlenir. Çocuğunuz &quot;Kim okuyor?&quot; ekranından kendi profiline
            girer.
          </span>
        </button>
        <button
          type="button"
          onClick={() => sec("Önizleme: çocuğun ekranı açılır, panel kilitlenmez.")}
          className="block w-full rounded-[1.25rem] bg-yuzey px-5 py-4 text-left shadow-[0_0_0_1px_rgb(39_30_23/0.08)] transition-colors hover:bg-yuzey-2"
        >
          <span className="font-semibold text-murekkep">Hayır, yalnız göz atacağım</span>
          <span className="mt-1 block text-[0.9375rem] leading-6 text-murekkep-soluk">
            Çocuğun ekranı açılır, panel kilitlenmez. Bu seçimle cihazı çocuğa bırakmayın.
          </span>
        </button>
      </div>
    ),
  };
}

// --- Kitap ayrıntısı ---

function KitapPerdesi(ctx: Baglam, perde: Extract<Perde, { tur: "kitap" }>) {
  const { aile, seciliCocukId, perdeAc } = ctx;
  const katalog = katalogBilgisi(perde.bookKey);
  const cocuk = aile.cocuklar.find((c) => c.id === seciliCocukId) ?? aile.cocuklar[0] ?? null;
  const kitap = kutuphaneListesi(aile.kitaplar, cocuk ? aile.ilerleme[cocuk.id] ?? [] : []).find(
    (k) => k.bookKey === perde.bookKey,
  );
  // Bölüm listesi ve final adresi çocuk tarafının kitap modelinden (başlanmamış kitaplar dahil).
  const yolculuk = yolculukKitaplari(aile.kitaplar, cocuk ? aile.ilerleme[cocuk.id] ?? [] : []).find(
    (k) => k.key === perde.bookKey,
  );
  const bolumler = yolculuk?.bolumler.map((b) => ({ no: b.no, baslik: b.ad })) ?? [];
  const finalYolu = yolculuk?.finalYolu ?? null;
  if (!katalog || !kitap) return null;

  // Bütün bölümler bitti, final kaldı: altın = final (PROJE-MODELI 3.3).
  const finalSirada = kitap.durum === "devam" && kitap.tamamlanan >= kitap.toplam;
  const eylem = finalSirada
    ? "Final Testine Başla"
    : { tamamlandi: "Tekrar Oku", devam: "Devam Et", yeni: "Yolculuğa Başla" }[kitap.durum];

  return {
    ust: `${kitap.toplam} bölüm`,
    baslik: katalog.title,
    govde: (
      <div className="pt-1">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="mx-auto w-36 shrink-0 sm:mx-0 sm:w-32">
            <Kapak bookKey={perde.bookKey} alt={`${katalog.title} kapağı`} />
          </div>
          <div className="min-w-0">
            <p className="font-veli-baslik text-[1.125rem] italic leading-snug text-veli-govde">{katalog.subtitle}</p>
            {cocuk ? (
              <div className="mt-4">
                <p className="flex items-center gap-2 text-[0.875rem] font-semibold text-murekkep-soluk">
                  <CocukYuzu cocuk={cocuk} boyut={24} halka="yok" />
                  {ilgiEki(cocuk.isim)} durumu
                </p>
                <div className="mt-2">
                  {kitap.durum === "tamamlandi" ? (
                    <Cip ton="eylem" ikon="madalya">
                      Tamamlandı
                    </Cip>
                  ) : finalSirada ? (
                    <Cip ton="altin" ikon="madalya" className="whitespace-normal !leading-snug">
                      Bütün bölümler bitti · Büyük Final Testi sırada
                    </Cip>
                  ) : kitap.durum === "devam" ? (
                    <>
                      <BolumYolu toplam={kitap.toplam} tamamlanan={kitap.tamamlanan} />
                      <p className="mt-1.5 text-[0.875rem] tabular-nums text-veli-govde">
                        {kitap.tamamlanan} / {kitap.toplam} bölüm
                      </p>
                    </>
                  ) : (
                    <Cip ton="notr">Henüz başlamadı</Cip>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {katalog.description ? <p className="mt-6 text-base leading-7 text-veli-govde">{katalog.description}</p> : null}

        {bolumler.length > 0 ? (
          <>
            <h3 className="mt-7 font-veli-baslik text-[1.125rem] font-medium text-murekkep">Bölümler</h3>
            <ol className="mt-2 divide-y divide-cizgi">
              {bolumler.map((b) => {
                const bitti = b.no <= kitap.tamamlanan;
                return (
                  <li key={b.no} className="flex min-h-12 items-center gap-3 py-2">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold tabular-nums ${
                        bitti ? "bg-eylem-yumusak text-eylem-koyu" : "bg-yuzey-2 text-murekkep-soluk"
                      }`}
                    >
                      {bitti ? <Ikon ad="onay" boyut={15} /> : b.no}
                    </span>
                    <span className={`text-[0.9375rem] leading-snug ${bitti ? "font-semibold text-murekkep" : "text-veli-govde"}`}>
                      {b.baslik}
                    </span>
                  </li>
                );
              })}
            </ol>
          </>
        ) : null}
      </div>
    ),
    alt: cocuk ? (
      <Buton
        varyant={kitap.durum === "yeni" || finalSirada ? "altin" : kitap.durum === "devam" ? "eylem" : "ikincil"}
        tamGenislik
        onClick={() =>
          perdeAc({
            tur: "cihaz",
            cocukId: cocuk.id,
            adres: finalSirada && finalYolu ? finalYolu : `/kitap/${perde.bookKey}`,
            etiket: finalSirada ? `${katalog.title} · Büyük Final Testi` : `${katalog.title} kitabı`,
          })
        }
      >
        {eylem}
        <span className="font-normal opacity-80">· {cocuk.isim}</span>
      </Buton>
    ) : null,
  };
}

// --- Ödül ayrıntısı ---

function OdulPerdesi(perde: Extract<Perde, { tur: "odul" }>) {
  const tur = { rozet: "Rozet", madalya: "Madalya", unvan: "Unvan" }[perde.odul];
  const nasil = {
    rozet: "Bölüm bitince kazanılır.",
    madalya: "Kitabın bütün bölümleri ve Büyük Final Testi bitince kazanılır.",
    unvan: "Bitirilen kitap sayısı eşiğe ulaşınca gelir.",
  }[perde.odul];
  return {
    ust: tur,
    baslik: perde.ad,
    govde: (
      <div className="flex flex-col items-center pb-4 pt-2 text-center">
        <span className="relative grid place-items-center">
          {perde.kazanildi ? (
            <span className="absolute h-40 w-40 rounded-full bg-veli-altin-acik/35 blur-3xl" aria-hidden="true" />
          ) : null}
          <span className={`relative ${perde.kazanildi ? "" : "opacity-40 saturate-50"}`}>
            <OdulIkonu tip={perde.odul} anahtar={perde.anahtar} boyut={180} alt="" />
          </span>
        </span>
        <p className="mt-5 text-base text-veli-govde">{perde.alt}</p>
        <div className="mt-4">
          {perde.kazanildi ? (
            <Cip ton="eylem" ikon="onay">
              Kazandı
            </Cip>
          ) : (
            <Cip ton="notr">Henüz kazanılmadı</Cip>
          )}
        </div>
        <p className="mt-5 max-w-xs text-[0.9375rem] leading-6 text-murekkep-soluk">{nasil}</p>
      </div>
    ),
  };
}

// --- Profil düzenle / ekle ---

function ProfilPerdesi(ctx: Baglam, perde: Extract<Perde, { tur: "profil" }> | null) {
  const { aile, perdeKapat, bildir } = ctx;
  const cocuk = perde ? aile.cocuklar.find((c) => c.id === perde.cocukId) ?? null : null;
  return {
    ust: cocuk ? "Profili düzenle" : "Yeni profil",
    baslik: cocuk ? cocuk.isim : "Çocuk profili ekle",
    govde: <ProfilFormu key={cocuk?.id ?? "yeni"} isim={cocuk?.isim ?? ""} avatar={cocuk?.avatar_tipi ?? "avatar-7"} duzenleme={Boolean(cocuk)} />,
    alt: (
      <div className="flex gap-3">
        <Buton varyant="cerceve" tamGenislik onClick={perdeKapat}>
          Vazgeç
        </Buton>
        <Buton
          varyant={cocuk ? "eylem" : "altin"}
          tamGenislik
          onClick={() => {
            perdeKapat();
            bildir(cocuk ? "Önizleme: profil kaydedilmedi." : "Önizleme: yeni profil oluşturulmadı.");
          }}
        >
          {cocuk ? "Kaydet" : "Profili Oluştur"}
        </Buton>
      </div>
    ),
  };
}

function ProfilFormu({ isim, avatar, duzenleme }: { isim: string; avatar: string; duzenleme: boolean }) {
  const { bildir } = useVeliPaneli();
  const [ad, setAd] = useState(isim);
  const [secili, setSecili] = useState(avatar);
  const [silOnay, setSilOnay] = useState(false);
  const avatarlar = Array.from({ length: 10 }, (_, i) => `avatar-${i + 1}`);

  return (
    <div className="space-y-6 pt-1">
      <label className="block">
        <span className="mb-2 block text-[0.9375rem] font-semibold text-murekkep">Çocuğun adı</span>
        <input
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          placeholder="Örn. Zeynep"
          autoComplete="off"
          className="h-12 w-full rounded-buton bg-yuzey px-4 text-base text-murekkep shadow-[0_0_0_1px_rgb(39_30_23/0.12)] outline-none transition focus:shadow-[0_0_0_2px_var(--eylem)]"
        />
      </label>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-murekkep">Avatar</legend>
        <div className="grid grid-cols-5 gap-3">
          {avatarlar.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={secili === a}
              aria-label={`Avatar ${a.split("-")[1]}`}
              onClick={() => setSecili(a)}
              className={`overflow-hidden rounded-full transition ${
                secili === a ? "ring-[3px] ring-eylem ring-offset-2 ring-offset-zemin" : "opacity-80 hover:opacity-100"
              }`}
            >
              <OdulIkonu tip="avatar" anahtar={a} boyut={72} alt="" className="h-auto w-full rounded-full" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => bildir("Önizleme: fotoğraf seçme penceresi açılır; fotoğraf kare kırpılıp küçültülerek kaydedilir.")}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-[0.9375rem] font-semibold text-eylem-koyu"
        >
          <Ikon ad="fotograf" boyut={18} />
          Avatar yerine fotoğraf yükle
        </button>
      </fieldset>

      {duzenleme ? (
        <div className="rounded-[1.25rem] bg-tehlike/[0.06] p-4">
          {silOnay ? (
            <div className="space-y-3">
              <p className="text-[0.9375rem] font-semibold leading-6 text-tehlike">
                {isim} profiliyle birlikte bütün ilerlemesi, rozetleri, madalyaları, görevleri ve bağlı cihazları kalıcı
                olarak silinir; geri alınamaz. Emin misiniz?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Buton varyant="cerceve" boyut="kucuk" onClick={() => setSilOnay(false)}>
                  Vazgeç
                </Buton>
                <Buton varyant="tehlike" boyut="kucuk" onClick={() => bildir("Önizleme: profil silinmedi.")}>
                  Evet, Sil
                </Buton>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSilOnay(true)}
              className="flex min-h-11 w-full items-center justify-between text-[0.9375rem] font-semibold text-tehlike"
            >
              Profili sil
              <Ikon ad="ok-sag" boyut={16} />
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

// --- Eşleme kodu ---

function EslesmePerdesi(ctx: Baglam, perde: Extract<Perde, { tur: "eslesme" }>) {
  const { aile, perdeKapat } = ctx;
  const cocuk = aile.cocuklar.find((c) => c.id === perde.cocukId);
  if (!cocuk) return null;
  return {
    ust: "Çocuğun kendi cihazı",
    baslik: `${ilgiEki(cocuk.isim)} cihazını bağlayın`,
    govde: (
      <div className="pt-1">
        <div className="rounded-[1.5rem] bg-veli-gece px-5 py-7 text-center text-veli-gece-metin">
          <p className="text-[0.9375rem] text-veli-gece-soluk">Bağlama kodu</p>
          <p className="mt-2 font-veli-baslik text-[3.25rem] font-medium tabular-nums tracking-[0.18em]">482 913</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[0.875rem] text-veli-altin-acik">
            <Ikon ad="saat" boyut={15} />
            10 dakika ve yalnız bir kez geçerli
          </p>
        </div>
        <ol className="mt-6 space-y-4">
          {[
            "Çocuğunuzun cihazında siteyi açın ve kodu girmeden önce ana ekrana ekleyin.",
            "Ana ekrandaki simgeyle açıp “Cihaz Kodunu Gir”e dokunun.",
            "Bu kodu yazın; cihaz yalnız bu profile bağlanır.",
          ].map((adim, i) => (
            <li key={adim} className="flex gap-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yuzey-2 text-[0.875rem] font-semibold tabular-nums text-veli-govde">
                {i + 1}
              </span>
              <span className="pt-1 text-base leading-7 text-veli-govde">{adim}</span>
            </li>
          ))}
        </ol>
      </div>
    ),
    alt: (
      <Buton varyant="cerceve" tamGenislik onClick={perdeKapat}>
        Kapat
      </Buton>
    ),
  };
}

// --- Şifre / PIN ---

function SifrePerdesi(ctx: Baglam, tur: "sifre" | "pin" | "cocuk", cocukId?: string) {
  const { aile, perdeKapat, bildir } = ctx;
  const cocuk = cocukId ? aile.cocuklar.find((c) => c.id === cocukId) : null;
  const metin = {
    sifre: { ust: "Hesap", baslik: "Şifre Değiştir", alan: "Yeni şifre", ipucu: "En az 8 karakter" },
    pin: { ust: "Güvenlik", baslik: "Veli PIN'i", alan: "Önce hesap şifreniz", ipucu: "PIN çocuklarınızın şifresinden farklı olmalı." },
    cocuk: {
      ust: "Profil şifresi",
      baslik: cocuk ? `${ilgiEki(cocuk.isim)} şifresi` : "Profil şifresi",
      alan: "4 rakamlı şifre",
      ipucu: "Çocuğunuzun kolay hatırlayacağı, kardeşlerinden farklı bir şifre.",
    },
  }[tur];
  return {
    ust: metin.ust,
    baslik: metin.baslik,
    govde: (
      <label className="block pt-1">
        <span className="mb-2 block text-[0.9375rem] font-semibold text-murekkep">{metin.alan}</span>
        <input
          type="password"
          inputMode={tur === "sifre" || tur === "pin" ? undefined : "numeric"}
          className="h-12 w-full rounded-buton bg-yuzey px-4 text-base text-murekkep shadow-[0_0_0_1px_rgb(39_30_23/0.12)] outline-none focus:shadow-[0_0_0_2px_var(--eylem)]"
        />
        <span className="mt-2 block text-[0.875rem] leading-6 text-murekkep-soluk">{metin.ipucu}</span>
      </label>
    ),
    alt: (
      <div className="flex gap-3">
        <Buton varyant="cerceve" tamGenislik onClick={perdeKapat}>
          Vazgeç
        </Buton>
        <Buton
          varyant="eylem"
          tamGenislik
          onClick={() => {
            perdeKapat();
            bildir("Önizleme: hiçbir şifre kaydedilmedi.");
          }}
        >
          {tur === "pin" ? "Devam" : "Kaydet"}
        </Buton>
      </div>
    ),
  };
}
