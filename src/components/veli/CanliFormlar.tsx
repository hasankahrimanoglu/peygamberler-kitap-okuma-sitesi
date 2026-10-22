"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { supabase } from "../../../lib/supabase";
import { isMissingColumn, useParentData } from "../../lib/parent/ParentDataProvider";
import {
  seciliProfilAdiniGuncelle,
  seciliProfilId,
  seciliProfiliTemizle,
} from "../../lib/child/cocukOturumu";
import { FOTOGRAF_KABUL_EDILEN, profilFotografiSil, profilFotografiYukle } from "../../lib/profilFotografi";
import { Buton, CocukAvatari, Ikon, OdulIkonu } from "../ui";
import { useVeliPaneli } from "./baglam";

/**
 * Canlı panelin perde formları (Supabase'e yazar). Önizleme bunların yerine
 * `Perdeler.tsx`'teki örnek formları gösterir. Mantık eski Ana Sayfa profil
 * penceresinden ve hesap menüsünden birebir taşındı (PROJE-MODELI 5.2).
 */

const AVATARLAR = Array.from({ length: 10 }, (_, i) => `avatar-${i + 1}`);

const girdiSinifi =
  "h-12 w-full rounded-buton bg-yuzey px-4 text-base text-murekkep shadow-[0_0_0_1px_rgb(39_30_23/0.12)] outline-none transition focus:shadow-[0_0_0_2px_var(--eylem)] disabled:opacity-60";

/** Perdenin altına yapışan düğme şeridi (kaydırılan içerik altında kalmasın). */
function AltSerit({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 -mx-5 mt-6 border-t border-cizgi bg-zemin px-5 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-4 sm:-mx-6 sm:px-6">
      {children}
    </div>
  );
}

function HataSatiri({ metin }: { metin: string | null }) {
  if (!metin) return null;
  return (
    <p role="alert" className="rounded-2xl bg-tehlike/[0.08] px-4 py-3 text-[0.9375rem] font-semibold leading-6 text-tehlike">
      {metin}
    </p>
  );
}

// --- Profili düzenle: ad, avatar, fotoğraf, silme ---

export function CanliProfilFormu({ cocukId }: { cocukId: string }) {
  const { parentId, profiles, setProfiles, setNotice } = useParentData();
  const { perdeKapat } = useVeliPaneli();
  const profil = profiles.find((p) => p.id === cocukId) ?? null;

  const [ad, setAd] = useState(profil?.isim ?? "");
  const [avatar, setAvatar] = useState(profil?.avatar_tipi ?? AVATARLAR[0]);
  const [hata, setHata] = useState<string | null>(null);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [silOnay, setSilOnay] = useState(false);
  const [siliniyor, setSiliniyor] = useState(false);

  // Fotoğraf seçimi kaydedilene kadar yalnızca önizlemedir; yükleme "Kaydet"
  // ile birlikte yapılır, böylece vazgeçen veli hiçbir şey değiştirmemiş olur.
  const [secilenFotograf, setSecilenFotograf] = useState<File | null>(null);
  const [onizleme, setOnizleme] = useState<string | null>(null);
  const [fotografKaldirildi, setFotografKaldirildi] = useState(false);
  const girdi = useRef<HTMLInputElement>(null);

  if (!profil) return <p className="text-base text-veli-govde">Bu profil artık mevcut değil.</p>;
  const mevcut = profil;

  const gosterilecekFotograf = onizleme ?? (fotografKaldirildi ? null : (mevcut.avatar_url ?? null));

  function onizlemeyiBirak() {
    setOnizleme((onceki) => {
      if (onceki) URL.revokeObjectURL(onceki);
      return null;
    });
  }

  function fotografSec(olay: ChangeEvent<HTMLInputElement>) {
    const dosya = olay.target.files?.[0] ?? null;
    // Aynı dosya ikinci kez seçilebilsin diye girdiyi sıfırlıyoruz.
    olay.target.value = "";
    if (!dosya) return;
    setHata(null);
    onizlemeyiBirak();
    setSecilenFotograf(dosya);
    setOnizleme(URL.createObjectURL(dosya));
    setFotografKaldirildi(false);
  }

  function fotografiKaldir() {
    setSecilenFotograf(null);
    onizlemeyiBirak();
    setFotografKaldirildi(true);
  }

  function kapat() {
    onizlemeyiBirak();
    perdeKapat();
  }

  async function kaydet(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault();
    setHata(null);
    const yeniAd = ad.trim();
    if (!yeniAd) {
      setHata("Çocuğun adı boş bırakılamaz.");
      return;
    }
    setKaydediliyor(true);

    // Fotoğraf işi önce biter: yükleme başarısızsa satırı hiç ellemiyoruz,
    // aksi hâlde veritabanı olmayan bir dosyayı işaret ederdi.
    let avatarUrl = mevcut.avatar_url ?? null;
    if (secilenFotograf) {
      if (!parentId) {
        setKaydediliyor(false);
        setHata("Oturum bilgisi okunamadı. Sayfayı yenileyip tekrar deneyin.");
        return;
      }
      const sonuc = await profilFotografiYukle(parentId, mevcut.id, secilenFotograf);
      if (!sonuc.tamam) {
        setKaydediliyor(false);
        setHata(sonuc.hata);
        return;
      }
      avatarUrl = sonuc.url;
    } else if (fotografKaldirildi) {
      if (parentId) await profilFotografiSil(parentId, mevcut.id);
      avatarUrl = null;
    }

    let { error: guncellemeHatasi } = await supabase
      .from("profiles")
      .update({ isim: yeniAd, avatar_tipi: avatar, avatar_url: avatarUrl })
      .eq("id", mevcut.id);

    // avatar_url sütunu henüz yoksa ad ve avatar yine de kaydedilsin.
    let fotografKaydedilemedi = false;
    if (guncellemeHatasi && isMissingColumn(guncellemeHatasi.message)) {
      const tekrar = await supabase.from("profiles").update({ isim: yeniAd, avatar_tipi: avatar }).eq("id", mevcut.id);
      guncellemeHatasi = tekrar.error;
      if (!tekrar.error) {
        fotografKaydedilemedi = secilenFotograf !== null || fotografKaldirildi;
        avatarUrl = mevcut.avatar_url ?? null;
      }
    }

    setKaydediliyor(false);
    if (guncellemeHatasi) {
      setHata("Profil güncellenemedi. Lütfen tekrar deneyin.");
      return;
    }

    setProfiles((liste) =>
      liste.map((p) => (p.id === mevcut.id ? { ...p, isim: yeniAd, avatar_tipi: avatar, avatar_url: avatarUrl } : p)),
    );
    // Çocuk tarafı ekranları adı tarayıcıda tutuyor; seçili profil bu profilse
    // orayı da güncellemezsek harita eski adı göstermeye devam eder.
    seciliProfilAdiniGuncelle(mevcut.id, yeniAd);
    setNotice(
      fotografKaydedilemedi
        ? `${yeniAd} profili güncellendi. Fotoğraf için Supabase'e avatar_url sütunu eklenmeli.`
        : `${yeniAd} profili güncellendi.`,
    );
    kapat();
  }

  async function sil() {
    setHata(null);
    setSiliniyor(true);
    const { error } = await supabase.from("profiles").delete().eq("id", mevcut.id);
    if (error) {
      setSiliniyor(false);
      setHata("Profil silinemedi. Lütfen tekrar deneyin.");
      return;
    }
    // Profil gidince fotoğrafı depoda bırakmıyoruz.
    if (parentId) await profilFotografiSil(parentId, mevcut.id);
    setSiliniyor(false);
    setProfiles((liste) => liste.filter((p) => p.id !== mevcut.id));
    if (seciliProfilId() === mevcut.id) seciliProfiliTemizle();
    setNotice(`${mevcut.isim} profili silindi.`);
    kapat();
  }

  return (
    <form onSubmit={kaydet} className="space-y-6 pt-1">
      <HataSatiri metin={hata} />

      <div className="flex items-center gap-4">
        <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-yuzey-2">
          <CocukAvatari
            avatarTipi={avatar}
            fotografUrl={gosterilecekFotograf}
            boyut={80}
            alt={mevcut.isim}
            className="h-full w-full rounded-full object-cover"
          />
        </span>
        <div className="min-w-0">
          <p className="text-[0.9375rem] leading-6 text-veli-govde">
            {gosterilecekFotograf
              ? "Fotoğraf kare kırpılıp küçültülerek kaydedilir; avatar yerine görünür."
              : "Fotoğraf yüklemezseniz seçtiğiniz avatar görünür."}
          </p>
          <input ref={girdi} type="file" accept={FOTOGRAF_KABUL_EDILEN} onChange={fotografSec} className="hidden" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Buton type="button" varyant="ikincil" boyut="kucuk" onClick={() => girdi.current?.click()}>
              <Ikon ad="fotograf" boyut={17} />
              {gosterilecekFotograf ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
            </Buton>
            {gosterilecekFotograf ? (
              <Buton type="button" varyant="cerceve" boyut="kucuk" className="!text-tehlike" onClick={fotografiKaldir}>
                Kaldır
              </Buton>
            ) : null}
          </div>
        </div>
      </div>

      <label className="block">
        <span className="mb-2 block text-[0.9375rem] font-semibold text-murekkep">Çocuğun adı</span>
        <input value={ad} onChange={(e) => setAd(e.target.value)} autoComplete="off" required className={girdiSinifi} />
      </label>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-murekkep">Avatar</legend>
        <div className="grid grid-cols-5 gap-3">
          {AVATARLAR.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={avatar === a}
              aria-label={`Avatar ${a.split("-")[1]}`}
              onClick={() => setAvatar(a)}
              className={`overflow-hidden rounded-full transition ${
                avatar === a ? "ring-[3px] ring-eylem ring-offset-2 ring-offset-zemin" : "opacity-80 hover:opacity-100"
              }`}
            >
              <OdulIkonu tip="avatar" anahtar={a} boyut={72} alt="" className="h-auto w-full rounded-full" />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="rounded-[1.25rem] bg-tehlike/[0.06] p-4">
        {silOnay ? (
          <div className="space-y-3">
            <p className="text-[0.9375rem] font-semibold leading-6 text-tehlike">
              {mevcut.isim} profiliyle birlikte bütün ilerlemesi, rozetleri, madalyaları, görevleri ve bağlı cihazları
              kalıcı olarak silinir; geri alınamaz. Emin misiniz?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Buton type="button" varyant="cerceve" boyut="kucuk" onClick={() => setSilOnay(false)}>
                Vazgeç
              </Buton>
              <Buton type="button" varyant="tehlike" boyut="kucuk" disabled={siliniyor} onClick={() => void sil()}>
                {siliniyor ? "Siliniyor…" : "Evet, Sil"}
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

      <AltSerit>
        <div className="flex gap-3">
          <Buton type="button" varyant="cerceve" tamGenislik onClick={kapat}>
            Vazgeç
          </Buton>
          <Buton type="submit" varyant="eylem" tamGenislik disabled={kaydediliyor}>
            {kaydediliyor ? "Kaydediliyor…" : "Kaydet"}
          </Buton>
        </div>
      </AltSerit>
    </form>
  );
}

// --- Hesap şifresini değiştir ---

export function CanliSifreFormu() {
  const { setNotice } = useParentData();
  const { perdeKapat } = useVeliPaneli();
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [kaydediliyor, setKaydediliyor] = useState(false);

  async function kaydet(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault();
    setHata(null);
    if (sifre.length < 8) {
      setHata("Yeni şifre en az 8 karakter olmalı.");
      return;
    }
    setKaydediliyor(true);
    const { error } = await supabase.auth.updateUser({ password: sifre });
    setKaydediliyor(false);
    if (error) {
      setHata("Şifre güncellenemedi. Lütfen tekrar deneyin.");
      return;
    }
    setNotice("Şifreniz güncellendi.");
    perdeKapat();
  }

  return (
    <form onSubmit={kaydet} className="space-y-4 pt-1">
      <HataSatiri metin={hata} />
      <label className="block">
        <span className="mb-2 block text-[0.9375rem] font-semibold text-murekkep">Yeni şifre</span>
        <input
          type="password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          autoComplete="new-password"
          placeholder="En az 8 karakter"
          required
          className={girdiSinifi}
        />
      </label>
      <AltSerit>
        <div className="flex gap-3">
          <Buton type="button" varyant="cerceve" tamGenislik onClick={perdeKapat}>
            Vazgeç
          </Buton>
          <Buton type="submit" varyant="eylem" tamGenislik disabled={kaydediliyor}>
            {kaydediliyor ? "Kaydediliyor…" : "Kaydet"}
          </Buton>
        </div>
      </AltSerit>
    </form>
  );
}
