"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  isMissingColumn,
  profileSelectTam,
  useParentData,
  type ChildProfile,
} from "../../../src/lib/parent/ParentDataProvider";
import { aileGuvenlikDurumu, cocukSifresiBelirle } from "../../../src/lib/aileGuvenligi";
import { cocukSifresiHataMetni } from "../../../src/components/dashboard/cocukSifresiMetni";
import { PinGirdisi } from "../../../src/components/dashboard/VeliPinFormu";
import { Buton, Ikon, Kart, OdulIkonu } from "../../../src/components/ui";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";

const profileSelectBase =
  "id, isim, avatar_tipi, unvan, profile_limit, created_at";

// 10 avatar; görseller public/avatarlar/avatar-{n}.jpg. Hasan dosyaları aynı
// adla değiştirdiğinde kod değişmeden yayına girer (PROJE-MODELI 6.1).
const avatarOptions = Array.from({ length: 10 }, (_, i) => ({
  value: `avatar-${i + 1}`,
  label: `${i + 1}. Avatar`,
}));

/** Aynı anda görünen avatar sayısı; kalanlara oklarla kaydırılır. */
const GORUNEN_AVATAR = 3;

export default function ProfilEkleSayfasi() {
  const router = useRouter();
  const { parentId, profiles, profileLimit, setProfiles, setNotice, setError } =
    useParentData();

  const [childName, setChildName] = useState("");
  const [avatarType, setAvatarType] = useState(avatarOptions[0].value);
  const [avatarBaslangic, setAvatarBaslangic] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Aile ayarı açıksa yeni profil şifresiyle açılır (PROJE-MODELI 3.11).
  const [sifreAcik, setSifreAcik] = useState(false);
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  // Profil eklendi ama şifre kaydedilemediyse yalnız şifre yeniden istenir.
  const [eklenenProfil, setEklenenProfil] = useState<ChildProfile | null>(null);

  useEffect(() => {
    let iptal = false;
    void aileGuvenlikDurumu().then((durum) => {
      if (!iptal) setSifreAcik(Boolean(durum?.profilSifresiAcik));
    });
    return () => {
      iptal = true;
    };
  }, []);

  const canAddProfile = profiles.length < profileLimit || eklenenProfil !== null;

  async function sifreyiKaydet(profil: ChildProfile) {
    const sonuc = await cocukSifresiBelirle(profil.id, sifre);
    if (sonuc === "tamam") return true;
    setLocalError(`${profil.isim} profili eklendi, ama şifre kaydedilemedi: ${cocukSifresiHataMetni(sonuc)}`);
    setSifre("");
    setSifreTekrar("");
    return false;
  }

  function bitir(profil: ChildProfile) {
    setNotice(`${profil.isim} profili eklendi.`);
    router.push("/dashboard");
  }

  async function handleAddProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError(null);
    setError(null);
    setNotice(null);

    if (!parentId) return;

    if (sifreAcik) {
      if (!/^[0-9]{4}$/.test(sifre)) {
        setLocalError("Profil şifresi 4 rakam olmalı.");
        return;
      }
      if (sifre !== sifreTekrar) {
        setLocalError("İki şifre aynı değil.");
        return;
      }
    }

    // Önceki denemede profil eklendi, şifre kaydedilemediyse yalnız şifre.
    if (eklenenProfil) {
      setIsAdding(true);
      const tamam = await sifreyiKaydet(eklenenProfil);
      setIsAdding(false);
      if (tamam) bitir(eklenenProfil);
      return;
    }

    if (!canAddProfile) {
      setLocalError("Profil limitin dolu. Yeni profil ekleyemezsin.");
      return;
    }

    const trimmedName = childName.trim();
    if (!trimmedName) {
      setLocalError("Çocuğun ismini yazmalısın.");
      return;
    }

    setIsAdding(true);

    const yeniProfil = {
      veli_id: parentId,
      isim: trimmedName,
      avatar_tipi: avatarType,
      profile_limit: profileLimit,
    };
    const insertResult = await supabase
      .from("profiles")
      .insert(yeniProfil)
      .select(profileSelectTam)
      .single();
    let createdProfile = insertResult.data as ChildProfile | null;
    let insertError = insertResult.error;

    if (insertError && isMissingColumn(insertError.message)) {
      const fallback = await supabase
        .from("profiles")
        .insert(yeniProfil)
        .select(profileSelectBase)
        .single();
      createdProfile = fallback.data as ChildProfile | null;
      insertError = fallback.error;
    }

    if (insertError || !createdProfile) {
      setIsAdding(false);
      setLocalError("Profil eklenemedi. Lütfen tekrar dene.");
      return;
    }

    const profil = createdProfile;
    setProfiles((current) => [...current, profil]);

    if (sifreAcik) {
      const tamam = await sifreyiKaydet(profil);
      setIsAdding(false);
      if (!tamam) {
        setEklenenProfil(profil);
        return;
      }
    } else {
      setIsAdding(false);
    }

    bitir(profil);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <Link
          href="/dashboard"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-murekkep-soluk transition-colors hover:text-murekkep"
        >
          <Ikon ad="geri" boyut={18} />
          Ana Sayfa
        </Link>
      </div>

      <VeliSayfaBasligi
        baslik="Yeni Çocuk Profili Ekle"
        aciklama="Yeni bir okuma yolculuğu başlatmak için çocuk profilinin temel bilgilerini gir."
        ek={
          <span className="flex min-h-11 items-center rounded-full border border-eylem/20 bg-eylem-yumusak px-4 text-sm font-bold text-eylem-koyu">
            {profiles.length} / {profileLimit} profil kullanılıyor
          </span>
        }
      />

      {!canAddProfile ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Profil limitin dolu
          </p>
          <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
            Yeni profil eklemek için mevcut bir profili silebilir veya paketini
            yükseltebilirsin.
          </p>
          <div className="mt-5 flex justify-center">
            <Buton varyant="cerceve" onClick={() => router.push("/dashboard")}>
              Ana Sayfaya Dön
            </Buton>
          </div>
        </Kart>
      ) : (
        <Kart dolgu="genis">
          <form className="grid gap-5" onSubmit={handleAddProfile}>
            {localError ? (
              <p className="rounded-buton border border-tehlike/40 bg-tehlike/10 px-4 py-3 text-sm font-semibold text-tehlike">
                {localError}
              </p>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-base font-semibold text-murekkep">
                Çocuğun İsmi
              </span>
              <input
                value={childName}
                onChange={(event) => setChildName(event.target.value)}
                disabled={eklenenProfil !== null}
                className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30 disabled:opacity-60"
                placeholder="Örn. Ahmet"
              />
            </label>

            {sifreAcik ? (
              <div>
                <p className="text-base font-semibold text-murekkep">Profil şifresi</p>
                <p className="mt-1 text-sm font-medium leading-6 text-murekkep-soluk">
                  Ailede profil şifresi açık: çocuk ortak tablette kendi profiline bu 4 rakamlı
                  şifreyle girer. Şifreyi çocukla birlikte seçin; kardeşlerinin şifresinden ve
                  veli PIN&apos;inizden farklı olmalı.
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <PinGirdisi etiket="Şifre" deger={sifre} onDegis={setSifre} />
                  <PinGirdisi etiket="Şifreyi tekrar yazın" deger={sifreTekrar} onDegis={setSifreTekrar} />
                </div>
              </div>
            ) : null}

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-murekkep">Avatar Seç</span>
                <span className="text-sm font-medium text-murekkep-soluk">
                  {avatarBaslangic + 1}–{Math.min(avatarBaslangic + GORUNEN_AVATAR, avatarOptions.length)} / {avatarOptions.length}
                </span>
              </div>
              {/* 10 avatar alt alta uzamasın diye üçlü pencere + oklarla kaydırma. */}
              <div className="flex items-stretch gap-2">
                <button
                  type="button"
                  aria-label="Önceki avatarlar"
                  disabled={avatarBaslangic === 0}
                  onClick={() => setAvatarBaslangic((b) => Math.max(0, b - GORUNEN_AVATAR))}
                  className="flex h-auto min-h-[44px] w-11 shrink-0 items-center justify-center rounded-buton border border-cizgi bg-yuzey-2 text-murekkep transition hover:border-vurgu disabled:opacity-40"
                >
                  <Ikon ad="ok-sol" boyut={20} />
                </button>

                <ul className="grid flex-1 grid-cols-3 gap-3">
                  {avatarOptions
                    .slice(avatarBaslangic, avatarBaslangic + GORUNEN_AVATAR)
                    .map((avatar) => {
                      const secili = avatarType === avatar.value;
                      return (
                        <li key={avatar.value}>
                          <button
                            type="button"
                            onClick={() => setAvatarType(avatar.value)}
                            aria-pressed={secili}
                            className={`flex min-h-[112px] w-full flex-col items-center justify-center gap-2 rounded-kart border-2 p-3 transition-colors ${
                              secili
                                ? "border-eylem bg-eylem-yumusak"
                                : "border-cizgi bg-yuzey-2 hover:border-vurgu"
                            }`}
                          >
                            <OdulIkonu
                              tip="avatar"
                              anahtar={avatar.value}
                              boyut={48}
                              alt={avatar.label}
                              className="rounded-full"
                            />
                            <span className="text-sm font-semibold text-murekkep">
                              {avatar.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                </ul>

                <button
                  type="button"
                  aria-label="Sonraki avatarlar"
                  disabled={avatarBaslangic + GORUNEN_AVATAR >= avatarOptions.length}
                  onClick={() =>
                    setAvatarBaslangic((b) =>
                      Math.min(avatarOptions.length - GORUNEN_AVATAR, b + GORUNEN_AVATAR),
                    )
                  }
                  className="flex h-auto min-h-[44px] w-11 shrink-0 items-center justify-center rounded-buton border border-cizgi bg-yuzey-2 text-murekkep transition hover:border-vurgu disabled:opacity-40"
                >
                  <Ikon ad="ok-sag" boyut={20} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Buton
                type="button"
                varyant="cerceve"
                tamGenislik
                className="flex-1"
                onClick={() => router.push("/dashboard")}
              >
                Vazgeç
              </Buton>
              <Buton type="submit" varyant="altin" tamGenislik disabled={isAdding} className="flex-1">
                {isAdding ? "Kaydediliyor..." : eklenenProfil ? "Şifreyi Kaydet" : "Profili Ekle"}
              </Buton>
            </div>
          </form>
        </Kart>
      )}
    </div>
  );
}
