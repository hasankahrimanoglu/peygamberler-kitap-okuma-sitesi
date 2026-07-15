"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import {
  isMissingChildLoginColumn,
  useParentData,
  type ChildProfile,
} from "../../src/lib/parent/ParentDataProvider";
import { cocukOzeti, gorevTanimiBul } from "../../src/lib/derive";
import { CocukKarti } from "../../src/components/dashboard/CocukKarti";
import { Buton, Ikon, Kart } from "../../src/components/ui";

export default function VeliAnaSayfa() {
  const router = useRouter();
  const {
    profiles,
    setProfiles,
    profileLimit,
    books,
    progressByProfile,
    tasksByProfile,
    isLoading,
    setNotice,
    setError,
  } = useParentData();

  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [editChildUsername, setEditChildUsername] = useState("");
  const [editChildPassword, setEditChildPassword] = useState("");
  const [isUpdatingChildLogin, setIsUpdatingChildLogin] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);

  const canAddProfile = profiles.length < profileLimit;

  const ozetler = useMemo(() => {
    const map: Record<string, ReturnType<typeof cocukOzeti>> = {};
    for (const profile of profiles) {
      map[profile.id] = cocukOzeti(progressByProfile[profile.id] ?? [], books);
    }
    return map;
  }, [profiles, progressByProfile, books]);

  // Kartta gösterilecek güncel "Bugüne Taşı" görevi (PROJE-MODELI 4.1/4,18):
  // çocuğun listesindeki en güncel tek görev — bekleyen öncelikli. Tam liste
  // Gelişim Raporu > Görevler sekmesindedir.
  const guncelGorevler = useMemo(() => {
    const map: Record<string, { ad: string; durum: "eklendi" | "tamamlandi" } | null> = {};
    for (const profile of profiles) {
      const gorevler = [...(tasksByProfile[profile.id] ?? [])].sort(
        (a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime(),
      );
      const guncel =
        gorevler.find((g) => g.status === "eklendi") ?? gorevler[0] ?? null;
      const tanim = guncel ? gorevTanimiBul(guncel.task_id) : null;
      map[profile.id] =
        tanim && guncel ? { ad: tanim.gorev.ad, durum: guncel.status } : null;
    }
    return map;
  }, [profiles, tasksByProfile]);

  function selectProfile(profile: ChildProfile) {
    window.localStorage.setItem("selected_child_profile_id", profile.id);
    window.localStorage.setItem("selected_child_profile_name", profile.isim);
    window.localStorage.setItem("selected_child_name", profile.isim);
    router.push("/map");
  }

  function openEditProfile(profile: ChildProfile) {
    setEditingProfile(profile);
    setEditChildUsername(profile.child_username ?? "");
    setEditChildPassword(profile.child_password ?? "");
    setIsDeleteConfirmOpen(false);
  }

  async function handleChildLoginUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!editingProfile) return;

    const trimmedUsername = editChildUsername.trim();
    const trimmedPassword = editChildPassword.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Çocuk kullanıcı adı ve şifresi boş bırakılamaz.");
      return;
    }

    setIsUpdatingChildLogin(true);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ child_username: trimmedUsername, child_password: trimmedPassword })
      .eq("id", editingProfile.id);
    setIsUpdatingChildLogin(false);

    if (updateError) {
      setError(
        isMissingChildLoginColumn(updateError.message)
          ? "Çocuk giriş bilgilerini kaydetmek için Supabase profiles tablosuna child_username ve child_password sütunlarını eklemelisin."
          : "Çocuk giriş bilgileri güncellenemedi. Lütfen tekrar dene.",
      );
      return;
    }

    setProfiles((current) =>
      current.map((profile) =>
        profile.id === editingProfile.id
          ? { ...profile, child_username: trimmedUsername, child_password: trimmedPassword }
          : profile,
      ),
    );
    setNotice(`${editingProfile.isim} için çocuk girişi güncellendi.`);
    setEditingProfile(null);
  }

  async function handleDeleteProfile() {
    setError(null);
    setNotice(null);

    if (!editingProfile) return;

    setIsDeletingProfile(true);
    const { error: deleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", editingProfile.id);
    setIsDeletingProfile(false);

    if (deleteError) {
      setError("Profil silinemedi. Lütfen tekrar dene.");
      return;
    }

    setProfiles((current) =>
      current.filter((profile) => profile.id !== editingProfile.id),
    );

    if (
      window.localStorage.getItem("selected_child_profile_id") === editingProfile.id
    ) {
      window.localStorage.removeItem("selected_child_profile_id");
      window.localStorage.removeItem("selected_child_profile_name");
      window.localStorage.removeItem("selected_child_name");
    }

    setNotice(`${editingProfile.isim} profili silindi.`);
    setEditingProfile(null);
    setIsDeleteConfirmOpen(false);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Veli Paneli
        </p>
        <h1 className="font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          Çocuk Profilleri
        </h1>
        <p className="text-sm font-medium text-murekkep-soluk">
          {profiles.length} / {profileLimit} profil kullanılıyor.
        </p>
      </div>

      {isLoading ? (
        <Kart className="text-center font-semibold text-murekkep-soluk">
          Profiller yükleniyor...
        </Kart>
      ) : profiles.length === 0 ? (
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Henüz çocuk profili yok
          </p>
          <p className="mt-2 text-sm font-medium text-murekkep-soluk">
            İlk profili ekleyince okuma yolculuğu başlayacak.
          </p>
          <div className="mt-5 flex justify-center">
            <Buton varyant="altin" onClick={() => router.push("/dashboard/profil-ekle")}>
              Yeni Çocuk Profili Ekle
            </Buton>
          </div>
        </Kart>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <CocukKarti
              key={profile.id}
              profile={profile}
              ozet={ozetler[profile.id]}
              guncelGorev={guncelGorevler[profile.id]}
              onDevam={() => selectProfile(profile)}
              onRapor={() => router.push(`/dashboard/rapor/${profile.id}`)}
              onDuzenle={() => openEditProfile(profile)}
            />
          ))}

          {canAddProfile ? (
            <Link
              href="/dashboard/profil-ekle"
              className="group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-kart border-2 border-dashed border-cizgi bg-yuzey/50 p-6 text-center transition-colors hover:border-eylem hover:bg-eylem-yumusak"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-vurgu-yumusak text-vurgu transition-colors group-hover:bg-eylem group-hover:text-eylem-metin">
                <Ikon ad="onay" boyut={26} />
              </span>
              <span className="font-baslik text-base font-bold text-murekkep">
                Yeni Çocuk Profili Ekle
              </span>
              <span className="text-xs font-medium text-murekkep-soluk">
                {profileLimit - profiles.length} profil hakkın kaldı
              </span>
            </Link>
          ) : null}
        </div>
      )}

      {/* Profil düzenleme + silme */}
      <AnimatePresence>
        {editingProfile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-gece-950/45 px-5 py-6 backdrop-blur-sm"
            onClick={() => setEditingProfile(null)}
          >
            <motion.form
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={handleChildLoginUpdate}
              className="w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 shadow-kart"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-vurgu">
                    Çocuk Girişi
                  </p>
                  <h2 className="mt-1 font-baslik text-2xl font-bold text-murekkep">
                    {editingProfile.isim}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  aria-label="Pencereyi kapat"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cizgi text-murekkep-soluk transition-colors hover:bg-yuzey-2"
                >
                  <Ikon ad="kapat" boyut={18} />
                </button>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-murekkep">
                  Kullanıcı Adı
                </span>
                <input
                  value={editChildUsername}
                  onChange={(event) => setEditChildUsername(event.target.value)}
                  autoComplete="username"
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="Örn. hasan01"
                  required
                />
              </label>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-murekkep">
                  Çocuk Şifresi
                </span>
                <input
                  type="password"
                  value={editChildPassword}
                  onChange={(event) => setEditChildPassword(event.target.value)}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="Yeni çocuk şifresi"
                  required
                />
              </label>

              <div className="mt-6 flex gap-3">
                <Buton
                  type="button"
                  varyant="cerceve"
                  tamGenislik
                  onClick={() => setEditingProfile(null)}
                >
                  Vazgeç
                </Buton>
                <Buton type="submit" varyant="eylem" tamGenislik disabled={isUpdatingChildLogin}>
                  {isUpdatingChildLogin ? "Kaydediliyor..." : "Kaydet"}
                </Buton>
              </div>

              <div className="mt-6 rounded-kart border border-tehlike/30 bg-tehlike/5 p-4">
                {isDeleteConfirmOpen ? (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold leading-6 text-tehlike">
                      Bu profile ait tüm ilerleme ve rozetler kalıcı olarak
                      silinecektir. Emin misiniz?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Buton
                        type="button"
                        varyant="cerceve"
                        boyut="kucuk"
                        className="min-h-[44px]"
                        onClick={() => setIsDeleteConfirmOpen(false)}
                      >
                        Vazgeç
                      </Buton>
                      <Buton
                        type="button"
                        varyant="tehlike"
                        boyut="kucuk"
                        className="min-h-[44px]"
                        onClick={handleDeleteProfile}
                        disabled={isDeletingProfile}
                      >
                        {isDeletingProfile ? "Siliniyor..." : "Evet, Sil"}
                      </Buton>
                    </div>
                  </div>
                ) : (
                  <Buton
                    type="button"
                    varyant="cerceve"
                    tamGenislik
                    onClick={() => setIsDeleteConfirmOpen(true)}
                    className="!text-tehlike !border-tehlike/40"
                  >
                    Profili Sil
                  </Buton>
                )}
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
