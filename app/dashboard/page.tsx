"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import {
  isMissingColumn,
  useParentData,
  type ChildProfile,
} from "../../src/lib/parent/ParentDataProvider";
import { cocukOzeti, gorevTanimiBul } from "../../src/lib/derive";
import { aileGuvenlikDurumu } from "../../src/lib/aileGuvenligi";
import {
  cocukEkraninaGec,
  seciliProfilAdiniGuncelle,
  seciliProfilId,
  seciliProfiliTemizle,
} from "../../src/lib/child/cocukOturumu";
import {
  FOTOGRAF_KABUL_EDILEN,
  profilFotografiSil,
  profilFotografiYukle,
} from "../../src/lib/profilFotografi";
import { CocukKarti } from "../../src/components/dashboard/CocukKarti";
import { Buton, CocukAvatari, Ikon, Kart } from "../../src/components/ui";

const HATIRLATMA_ANAHTARI = "profil_sifresi_hatirlatmasi_kapandi";

export default function VeliAnaSayfa() {
  const router = useRouter();
  const {
    parentId,
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
  const [editName, setEditName] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);

  // İkinci çocuk eklenince profil şifresi bir kez hatırlatılır (PROJE-MODELI 3.11).
  const [sifreHatirlatmasi, setSifreHatirlatmasi] = useState(false);
  const cocukSayisi = profiles.length;
  useEffect(() => {
    if (cocukSayisi < 2) return;
    let kapatildi = false;
    try {
      kapatildi = window.localStorage.getItem(HATIRLATMA_ANAHTARI) === "1";
    } catch {
      kapatildi = false;
    }
    if (kapatildi) return;
    let iptal = false;
    void aileGuvenlikDurumu().then((durum) => {
      if (!iptal && durum && !durum.profilSifresiAcik) setSifreHatirlatmasi(true);
    });
    return () => {
      iptal = true;
    };
  }, [cocukSayisi]);

  function hatirlatmayiKapat() {
    setSifreHatirlatmasi(false);
    try {
      window.localStorage.setItem(HATIRLATMA_ANAHTARI, "1");
    } catch {
      // Depolama kapalıysa hatırlatma bir sonraki açılışta yine görünür.
    }
  }

  // Fotoğraf seçimi kaydedilene kadar yalnızca önizlemedir; yükleme "Kaydet"
  // ile birlikte yapılır, böylece vazgeçen veli hiçbir şey değiştirmemiş olur.
  const [secilenFotograf, setSecilenFotograf] = useState<File | null>(null);
  const [fotografOnizleme, setFotografOnizleme] = useState<string | null>(null);
  const [fotografKaldirildi, setFotografKaldirildi] = useState(false);
  const fotografGirdisiRef = useRef<HTMLInputElement>(null);

  // Önizleme object URL'leri seçim/temizleme anında bırakılır; effect'e
  // bağlanırsa her açılışta gereksiz bir render turu doğuyor.
  function onizlemeyiBirak() {
    setFotografOnizleme((onceki) => {
      if (onceki) URL.revokeObjectURL(onceki);
      return null;
    });
  }

  const gosterilecekFotograf = fotografOnizleme
    ? fotografOnizleme
    : fotografKaldirildi
      ? null
      : (editingProfile?.avatar_url ?? null);

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

  // Velinin eylemi: profil şifresi sorulmaz, ama veli PIN'i yoksa önce
  // belirletilir (cihaz çocuk moduna girince panel PIN'le korunur — 3.11).
  function selectProfile(profile: ChildProfile) {
    void cocukEkraninaGec(router, { id: profile.id, isim: profile.isim }, "/map");
  }

  function closeEditProfile() {
    setEditingProfile(null);
    setSecilenFotograf(null);
    onizlemeyiBirak();
    setFotografKaldirildi(false);
    setIsDeleteConfirmOpen(false);
  }

  function openEditProfile(profile: ChildProfile) {
    setEditingProfile(profile);
    setEditName(profile.isim);
    setSecilenFotograf(null);
    onizlemeyiBirak();
    setFotografKaldirildi(false);
    setIsDeleteConfirmOpen(false);
  }

  function handleFotografSecimi(event: ChangeEvent<HTMLInputElement>) {
    const dosya = event.target.files?.[0] ?? null;
    // Aynı dosya ikinci kez seçilebilsin diye girdiyi sıfırlıyoruz.
    event.target.value = "";
    if (!dosya) return;
    setError(null);
    onizlemeyiBirak();
    setSecilenFotograf(dosya);
    setFotografOnizleme(URL.createObjectURL(dosya));
    setFotografKaldirildi(false);
  }

  function handleFotografKaldir() {
    setSecilenFotograf(null);
    onizlemeyiBirak();
    setFotografKaldirildi(true);
  }

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!editingProfile) return;

    const trimmedName = editName.trim();

    if (!trimmedName) {
      setError("Çocuğun ismi boş bırakılamaz.");
      return;
    }

    setIsUpdatingProfile(true);

    // Fotoğraf işi önce biter: yükleme başarısızsa satırı hiç ellemiyoruz,
    // aksi hâlde veritabanı olmayan bir dosyayı işaret ederdi.
    let avatarUrl = editingProfile.avatar_url ?? null;
    if (secilenFotograf) {
      if (!parentId) {
        setIsUpdatingProfile(false);
        setError("Oturum bilgisi okunamadı. Sayfayı yenileyip tekrar dene.");
        return;
      }
      const sonuc = await profilFotografiYukle(
        parentId,
        editingProfile.id,
        secilenFotograf,
      );
      if (!sonuc.tamam) {
        setIsUpdatingProfile(false);
        setError(sonuc.hata);
        return;
      }
      avatarUrl = sonuc.url;
    } else if (fotografKaldirildi) {
      if (parentId) await profilFotografiSil(parentId, editingProfile.id);
      avatarUrl = null;
    }

    let { error: updateError } = await supabase
      .from("profiles")
      .update({ isim: trimmedName, avatar_url: avatarUrl })
      .eq("id", editingProfile.id);

    // avatar_url sütunu henüz yoksa isim yine de kaydedilsin.
    let fotografKaydedilemedi = false;
    if (updateError && isMissingColumn(updateError.message)) {
      const tekrar = await supabase
        .from("profiles")
        .update({ isim: trimmedName })
        .eq("id", editingProfile.id);
      updateError = tekrar.error;
      if (!tekrar.error) {
        fotografKaydedilemedi = secilenFotograf !== null || fotografKaldirildi;
        avatarUrl = editingProfile.avatar_url ?? null;
      }
    }

    setIsUpdatingProfile(false);

    if (updateError) {
      setError("Profil güncellenemedi. Lütfen tekrar dene.");
      return;
    }

    setProfiles((current) =>
      current.map((profile) =>
        profile.id === editingProfile.id
          ? { ...profile, isim: trimmedName, avatar_url: avatarUrl }
          : profile,
      ),
    );

    // Çocuk tarafı ekranları ismi tarayıcıda tutuyor; seçili profil bu
    // profilse orayı da güncellemezsek harita eski ismi göstermeye devam eder.
    seciliProfilAdiniGuncelle(editingProfile.id, trimmedName);

    setNotice(
      fotografKaydedilemedi
        ? `${trimmedName} profili güncellendi. Fotoğraf için Supabase'e avatar_url sütununu eklemelisin.`
        : `${trimmedName} profili güncellendi.`,
    );
    closeEditProfile();
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

    if (deleteError) {
      setIsDeletingProfile(false);
      setError("Profil silinemedi. Lütfen tekrar dene.");
      return;
    }

    // Profil gidince fotoğrafı depoda bırakmıyoruz (satır silinince kimse
    // ulaşamaz ama veli verisi olduğu gibi durmamalı).
    if (parentId) await profilFotografiSil(parentId, editingProfile.id);
    setIsDeletingProfile(false);

    setProfiles((current) =>
      current.filter((profile) => profile.id !== editingProfile.id),
    );

    if (seciliProfilId() === editingProfile.id) seciliProfiliTemizle();

    setNotice(`${editingProfile.isim} profili silindi.`);
    closeEditProfile();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
            Çocuk Profilleri
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium text-murekkep-soluk">
            Çocuklarının okuma yolculuğunda nerede kaldığını ve son kazanımlarını
            buradan takip edebilirsin.
          </p>
        </div>
        <p className="flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-eylem/20 bg-eylem-yumusak px-4 text-sm font-bold text-eylem-koyu sm:self-auto">
          <Ikon ad="hesap" boyut={18} />
          {profiles.length} / {profileLimit} profil kullanılıyor
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
        <div className="space-y-5">
          {sifreHatirlatmasi ? (
            <Kart className="flex flex-col gap-4 border-vurgu/40 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-vurgu-yumusak text-vurgu">
                  <Ikon ad="kilit" boyut={20} />
                </span>
                <div>
                  <p className="font-baslik text-lg font-bold text-murekkep">
                    Çocuklarınız aynı tableti mi kullanıyor?
                  </p>
                  <p className="mt-1 text-base font-medium leading-7 text-murekkep-soluk">
                    Profil şifresini açarsanız her çocuk kendi profiline 4 rakamlı
                    şifresiyle girer; kardeşinin profilinde okuyamaz.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Buton varyant="cerceve" boyut="kucuk" onClick={hatirlatmayiKapat}>
                  Şimdi Değil
                </Buton>
                <Buton
                  varyant="eylem"
                  boyut="kucuk"
                  onClick={() => {
                    hatirlatmayiKapat();
                    router.push("/dashboard/ayarlar");
                  }}
                >
                  Ayarı Aç
                </Buton>
              </div>
            </Kart>
          ) : null}

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
              className="group flex min-h-[88px] flex-col items-start justify-center gap-3 rounded-kart border-2 border-dashed border-cizgi bg-yuzey/50 px-5 py-4 transition-colors hover:border-eylem hover:bg-eylem-yumusak sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-vurgu-yumusak font-baslik text-2xl font-bold text-vurgu transition-colors group-hover:bg-eylem group-hover:text-eylem-metin">
                  +
                </span>
                <span>
                  <span className="block font-baslik text-lg font-bold text-murekkep">
                    Yeni Çocuk Profili Ekle
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-murekkep-soluk">
                    Yeni bir okuma yolculuğu başlat
                  </span>
                </span>
              </span>
              <span className="text-sm font-semibold text-murekkep-soluk">
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
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-gece-950/45 px-5 py-6 backdrop-blur-sm"
            onClick={closeEditProfile}
          >
            <motion.form
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={handleProfileUpdate}
              className="my-auto w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 shadow-kart"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-vurgu">
                    Profili Düzenle
                  </p>
                  <h2 className="mt-1 font-baslik text-2xl font-bold text-murekkep">
                    {editingProfile.isim}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeEditProfile}
                  aria-label="Pencereyi kapat"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cizgi text-murekkep-soluk transition-colors hover:bg-yuzey-2"
                >
                  <Ikon ad="kapat" boyut={18} />
                </button>
              </div>

              {/* Profil fotoğrafı — yükleme "Kaydet"e basılınca yapılır. */}
              <div className="flex flex-col items-start gap-4 rounded-kart border border-cizgi bg-yuzey-2 p-4 sm:flex-row sm:items-center">
                <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border border-cizgi bg-yuzey">
                  <CocukAvatari
                    avatarTipi={editingProfile.avatar_tipi}
                    fotografUrl={gosterilecekFotograf}
                    boyut={78}
                    alt={editingProfile.isim}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-murekkep">
                    Profil Fotoğrafı
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-murekkep-soluk">
                    {gosterilecekFotograf
                      ? "Fotoğraf kare kırpılıp küçültülerek kaydedilir."
                      : "Fotoğraf yüklemezsen seçili avatar görünmeye devam eder."}
                  </p>

                  <input
                    ref={fotografGirdisiRef}
                    type="file"
                    accept={FOTOGRAF_KABUL_EDILEN}
                    onChange={handleFotografSecimi}
                    className="hidden"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Buton
                      type="button"
                      varyant="cerceve"
                      boyut="kucuk"
                      className="min-h-[44px]"
                      onClick={() => fotografGirdisiRef.current?.click()}
                    >
                      <Ikon ad="fotograf" boyut={17} />
                      {gosterilecekFotograf ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
                    </Buton>
                    {gosterilecekFotograf ? (
                      <Buton
                        type="button"
                        varyant="cerceve"
                        boyut="kucuk"
                        className="min-h-[44px] !border-tehlike/40 !text-tehlike"
                        onClick={handleFotografKaldir}
                      >
                        Kaldır
                      </Buton>
                    ) : null}
                  </div>
                </div>
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-murekkep">
                  Çocuğun İsmi
                </span>
                <input
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  autoComplete="off"
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="Örn. Ahmet"
                  required
                />
              </label>

              <p className="mt-4 text-sm font-medium leading-6 text-murekkep-soluk">
                Profil şifresi ve çocuğun kendi cihazı{" "}
                <Link href="/dashboard/ayarlar" className="font-semibold text-eylem hover:underline">
                  Aile ve Güvenlik
                </Link>{" "}
                sayfasından yönetilir.
              </p>

              <div className="mt-6 flex gap-3">
                <Buton
                  type="button"
                  varyant="cerceve"
                  tamGenislik
                  onClick={closeEditProfile}
                >
                  Vazgeç
                </Buton>
                <Buton type="submit" varyant="eylem" tamGenislik disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? "Kaydediliyor..." : "Kaydet"}
                </Buton>
              </div>

              <div className="mt-6 rounded-kart border border-tehlike/30 bg-tehlike/5 p-4">
                {isDeleteConfirmOpen ? (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold leading-6 text-tehlike">
                      {editingProfile.isim} profiliyle birlikte bütün ilerlemesi,
                      rozetleri, madalyaları, görevleri ve bağlı cihazları kalıcı
                      olarak silinir; geri alınamaz. Emin misiniz?
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
