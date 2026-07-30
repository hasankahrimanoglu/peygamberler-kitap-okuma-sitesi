"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  isMissingChildLoginColumn,
  useParentData,
  type ChildProfile,
} from "../../../src/lib/parent/ParentDataProvider";
import { Buton, Ikon, Kart, OdulIkonu } from "../../../src/components/ui";
import { VeliSayfaBasligi } from "../../../src/components/dashboard/VeliSayfaBasligi";

const profileSelectWithChildLogin =
  "id, isim, avatar_tipi, unvan, child_username, child_password, profile_limit, created_at";
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
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [avatarType, setAvatarType] = useState(avatarOptions[0].value);
  const [avatarBaslangic, setAvatarBaslangic] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const canAddProfile = profiles.length < profileLimit;

  async function handleAddProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError(null);
    setError(null);
    setNotice(null);

    if (!parentId) return;
    if (!canAddProfile) {
      setLocalError("Profil limitin dolu. Yeni profil ekleyemezsin.");
      return;
    }

    const trimmedName = childName.trim();
    const trimmedUsername = childUsername.trim();

    if (!trimmedName) {
      setLocalError("Çocuğun ismini yazmalısın.");
      return;
    }
    if (!trimmedUsername || !childPassword.trim()) {
      setLocalError("Çocuğun kullanıcı adı ve şifresi zorunlu.");
      return;
    }

    setIsAdding(true);

    let insertNoticeMessage = `${trimmedName} profili eklendi.`;
    const insertResult = await supabase
      .from("profiles")
      .insert({
        veli_id: parentId,
        isim: trimmedName,
        avatar_tipi: avatarType,
        child_username: trimmedUsername,
        child_password: childPassword,
        profile_limit: profileLimit,
      })
      .select(profileSelectWithChildLogin)
      .single();
    let createdProfile = insertResult.data as ChildProfile | null;
    let insertError = insertResult.error;

    if (insertError && isMissingChildLoginColumn(insertError.message)) {
      const fallback = await supabase
        .from("profiles")
        .insert({
          veli_id: parentId,
          isim: trimmedName,
          avatar_tipi: avatarType,
          profile_limit: profileLimit,
        })
        .select(profileSelectBase)
        .single();

      createdProfile = fallback.data as ChildProfile | null;
      insertError = fallback.error;

      if (!fallback.error) {
        insertNoticeMessage = `${trimmedName} profili eklendi. Çocuk girişi için veritabanına child_username ve child_password sütunlarını eklemelisin.`;
      }
    }

    setIsAdding(false);

    if (insertError || !createdProfile) {
      setLocalError("Profil eklenemedi. Lütfen tekrar dene.");
      return;
    }

    setProfiles((current) => [...current, createdProfile as ChildProfile]);
    setNotice(insertNoticeMessage);
    router.push("/dashboard");
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
                className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                placeholder="Örn. Ahmet"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-base font-semibold text-murekkep">
                  Çocuğun Kullanıcı Adı
                </span>
                <input
                  value={childUsername}
                  onChange={(event) => setChildUsername(event.target.value)}
                  autoComplete="username"
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="Örn. hasan01"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-base font-semibold text-murekkep">
                  Çocuğun Şifresi
                </span>
                <input
                  type="password"
                  value={childPassword}
                  onChange={(event) => setChildPassword(event.target.value)}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="Çocuk şifresi"
                />
              </label>
            </div>

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
                {isAdding ? "Ekleniyor..." : "Profili Ekle"}
              </Buton>
            </div>
          </form>
        </Kart>
      )}
    </div>
  );
}
