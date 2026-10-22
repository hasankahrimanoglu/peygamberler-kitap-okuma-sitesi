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
import { Buton, Ikon, OdulIkonu } from "../../../src/components/ui";
import { Cip, SayfaBasligi, Yuzey } from "../../../src/components/veli/parcalar";

const profileSelectBase =
  "id, isim, avatar_tipi, unvan, profile_limit, created_at";

// 10 avatar; görseller public/avatarlar/avatar-{n}.jpg. Hasan dosyaları aynı
// adla değiştirdiğinde kod değişmeden yayına girer (PROJE-MODELI 6.1).
const avatarOptions = Array.from({ length: 10 }, (_, i) => ({
  value: `avatar-${i + 1}`,
  label: `${i + 1}. Avatar`,
}));

export default function ProfilEkleSayfasi() {
  const router = useRouter();
  const { parentId, profiles, profileLimit, setProfiles, setNotice, setError } =
    useParentData();

  const [childName, setChildName] = useState("");
  const [avatarType, setAvatarType] = useState(avatarOptions[0].value);
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
      setLocalError("Profil hakkınız doldu. Yeni profil eklenemiyor.");
      return;
    }

    const trimmedName = childName.trim();
    if (!trimmedName) {
      setLocalError("Çocuğun adını yazın.");
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
      setLocalError("Profil eklenemedi. Lütfen tekrar deneyin.");
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
      <Link
        href="/dashboard/ayarlar"
        className="-ml-2 mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[0.9375rem] font-semibold text-murekkep-soluk transition-colors hover:text-murekkep"
      >
        <Ikon ad="geri" boyut={18} />
        Aile ve Güvenlik
      </Link>

      <SayfaBasligi
        ust="Yeni profil"
        baslik="Çocuk profili ekle"
        aciklama="Her çocuğun kendi okuma yolculuğu, rozetleri ve görevleri olur."
        sag={
          <Cip ton="eylem" ikon="aile">
            {profiles.length} / {profileLimit} profil kullanılıyor
          </Cip>
        }
      />

      {!canAddProfile ? (
        <Yuzey className="p-8 text-center sm:p-10">
          <p className="font-veli-baslik text-[1.375rem] font-medium text-murekkep">Profil hakkınız doldu</p>
          <p className="mx-auto mt-2 max-w-md text-base leading-7 text-veli-govde">
            Yeni profil eklemek için mevcut bir profili silebilir ya da paketinizi yükseltebilirsiniz.
          </p>
          <div className="mt-6 flex justify-center">
            <Buton varyant="cerceve" onClick={() => router.push("/dashboard/ayarlar")}>
              Aile ve Güvenlik&apos;e Dön
            </Buton>
          </div>
        </Yuzey>
      ) : (
        <Yuzey className="p-5 sm:p-8">
          <form className="space-y-6" onSubmit={handleAddProfile}>
            {localError ? (
              <p role="alert" className="rounded-2xl bg-tehlike/[0.08] px-4 py-3 text-[0.9375rem] font-semibold leading-6 text-tehlike">
                {localError}
              </p>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-[0.9375rem] font-semibold text-murekkep">Çocuğun adı</span>
              <input
                value={childName}
                onChange={(event) => setChildName(event.target.value)}
                disabled={eklenenProfil !== null}
                autoComplete="off"
                className="h-12 w-full rounded-buton bg-yuzey px-4 text-base text-murekkep shadow-[0_0_0_1px_rgb(39_30_23/0.12)] outline-none transition focus:shadow-[0_0_0_2px_var(--eylem)] disabled:opacity-60"
                placeholder="Örn. Zeynep"
              />
            </label>

            {sifreAcik ? (
              <div>
                <p className="text-[0.9375rem] font-semibold text-murekkep">Profil şifresi</p>
                <p className="mt-1 text-[0.9375rem] leading-6 text-veli-govde">
                  Ailede profil şifresi açık: çocuk ortak tablette kendi profiline bu 4 rakamlı şifreyle girer.
                  Şifreyi çocukla birlikte seçin; kardeşlerinin şifresinden ve veli PIN&apos;inizden farklı olmalı.
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <PinGirdisi etiket="Şifre" deger={sifre} onDegis={setSifre} />
                  <PinGirdisi etiket="Şifreyi tekrar yazın" deger={sifreTekrar} onDegis={setSifreTekrar} />
                </div>
              </div>
            ) : null}

            <fieldset disabled={eklenenProfil !== null}>
              <legend className="mb-3 text-[0.9375rem] font-semibold text-murekkep">Avatar</legend>
              <div className="grid grid-cols-5 gap-3">
                {avatarOptions.map((avatar) => {
                  const secili = avatarType === avatar.value;
                  return (
                    <button
                      key={avatar.value}
                      type="button"
                      onClick={() => setAvatarType(avatar.value)}
                      aria-pressed={secili}
                      aria-label={avatar.label}
                      className={`overflow-hidden rounded-full transition ${
                        secili ? "ring-[3px] ring-eylem ring-offset-2 ring-offset-yuzey" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <OdulIkonu tip="avatar" anahtar={avatar.value} boyut={80} alt="" className="h-auto w-full rounded-full" />
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[0.875rem] leading-6 text-murekkep-soluk">
                Profili ekledikten sonra Aile ve Güvenlik&apos;ten fotoğraf da yükleyebilirsiniz.
              </p>
            </fieldset>

            <div className="flex gap-3 border-t border-cizgi pt-6">
              <Buton type="button" varyant="cerceve" tamGenislik onClick={() => router.push("/dashboard/ayarlar")}>
                Vazgeç
              </Buton>
              <Buton type="submit" varyant="altin" tamGenislik disabled={isAdding}>
                {isAdding ? "Kaydediliyor…" : eklenenProfil ? "Şifreyi Kaydet" : "Profili Oluştur"}
              </Buton>
            </div>
          </form>
        </Yuzey>
      )}
    </div>
  );
}
