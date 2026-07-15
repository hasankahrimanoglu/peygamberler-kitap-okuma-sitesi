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

const profileSelectWithChildLogin =
  "id, isim, avatar_tipi, unvan, child_username, child_password, profile_limit, created_at";
const profileSelectBase =
  "id, isim, avatar_tipi, unvan, profile_limit, created_at";

const avatarOptions = [
  { value: "lantern", label: "Kandil" },
  { value: "book", label: "Kitap" },
  { value: "star", label: "Yıldız" },
];

export default function ProfilEkleSayfasi() {
  const router = useRouter();
  const { parentId, profiles, profileLimit, setProfiles, setNotice, setError } =
    useParentData();

  const [childName, setChildName] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [avatarType, setAvatarType] = useState("lantern");
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
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-murekkep-soluk transition-colors hover:text-murekkep"
        >
          <Ikon ad="geri" boyut={18} />
          Ana Sayfa
        </Link>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Yeni Profil
        </p>
        <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep">
          Yeni Çocuk Profili Ekle
        </h1>
        <p className="mt-1 text-sm font-medium text-murekkep-soluk">
          {profiles.length} / {profileLimit} profil kullanılıyor.
        </p>
      </div>

      {!canAddProfile ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Profil limitin dolu
          </p>
          <p className="mt-2 text-sm font-medium text-murekkep-soluk">
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
              <span className="mb-2 block text-sm font-semibold text-murekkep">
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
                <span className="mb-2 block text-sm font-semibold text-murekkep">
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
                <span className="mb-2 block text-sm font-semibold text-murekkep">
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
              <span className="mb-2 block text-sm font-semibold text-murekkep">
                Avatar Seç
              </span>
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions.map((avatar) => {
                  const secili = avatarType === avatar.value;
                  return (
                    <button
                      key={avatar.value}
                      type="button"
                      onClick={() => setAvatarType(avatar.value)}
                      aria-pressed={secili}
                      className={`flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-kart border-2 p-3 transition-colors ${
                        secili
                          ? "border-eylem bg-eylem-yumusak"
                          : "border-cizgi bg-yuzey-2 hover:border-vurgu"
                      }`}
                    >
                      <OdulIkonu tip="avatar" anahtar={avatar.value} boyut={48} alt={avatar.label} />
                      <span className="text-sm font-semibold text-murekkep">
                        {avatar.label}
                      </span>
                    </button>
                  );
                })}
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
