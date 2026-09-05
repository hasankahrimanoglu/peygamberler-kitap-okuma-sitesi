"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { profilAvatarliOku } from "../../src/lib/profilFotografi";
import { atlasRegions } from "../../src/data/atlasCatalog";
import { unvanFromBookCount } from "../../src/lib/derive";
import {
  AtlasHarita,
  type AtlasBolge,
  type AtlasDurak,
} from "../../src/components/atlas/AtlasHarita";

type ProfileState = {
  id: string;
  name: string;
  avatar: string;
  /** Veli fotoğraf yüklediyse public URL; boşsa hazır avatar geçerli */
  avatarUrl: string | null;
  title: string;
};

type KitapIlerlemesi = {
  completed: number;
  total: number;
  finished: boolean;
};

const emptyProfile: ProfileState = {
  id: "",
  name: "Gezgin",
  avatar: "lantern",
  avatarUrl: null,
  title: "Yeni Gezgin",
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
}

export default function MapPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(emptyProfile);
  const [adem, setAdem] = useState<KitapIlerlemesi>({ completed: 0, total: 8, finished: false });
  const [sit, setSit] = useState<KitapIlerlemesi>({ completed: 0, total: 4, finished: false });
  const [idris, setIdris] = useState<KitapIlerlemesi>({ completed: 0, total: 4, finished: false });
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const [finalBook, setFinalBook] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const profileId = window.localStorage.getItem("selected_child_profile_id");
    const profileName = window.localStorage.getItem("selected_child_profile_name");

    if (!profileId) {
      router.replace("/dashboard");
      return;
    }
    const activeProfileId = profileId;

    queueMicrotask(() => {
      if (cancelled) return;
      setFinalBook(new URLSearchParams(window.location.search).get("final"));
    });

    async function load() {
      const [profileResult, booksResult, progressResult] = await Promise.all([
        profilAvatarliOku<{ isim: string | null; avatar_tipi: string | null; unvan: string | null }>(
          activeProfileId,
          "isim, avatar_tipi, unvan",
        ),
        supabase.from("books").select("id, isim, toplam_bolum"),
        supabase.from("user_progress").select("book_id, tamamlanan_bolum_sayisi, bitti_mi").eq("profile_id", activeProfileId),
      ]);

      if (cancelled) return;
      if (profileResult.error || booksResult.error || progressResult.error) {
        setWarning("İlerleme bilgileri tam olarak yüklenemedi; atlas geçici değerlerle gösteriliyor.");
      }

      const dbKitaplar = booksResult.data ?? [];
      const ilerlemeler = progressResult.data ?? [];

      /** Kitabın Supabase satırını ve ilerlemesini `books.ts` anahtarından okur. */
      const kitapIlerlemesi = (anahtar: string, varsayilanBolum: number): KitapIlerlemesi => {
        const dbBook = dbKitaplar.find((book) => normalize(book.isim ?? "").includes(anahtar));
        const row = dbBook ? ilerlemeler.find((item) => item.book_id === dbBook.id) : undefined;
        const total = Math.max(varsayilanBolum, dbBook?.toplam_bolum ?? varsayilanBolum);
        return {
          completed: Math.min(total, Math.max(0, row?.tamamlanan_bolum_sayisi ?? 0)),
          total,
          finished: Boolean(row?.bitti_mi),
        };
      };

      const ademDurumu = kitapIlerlemesi("adem", 8);
      const sitDurumu = kitapIlerlemesi("sit", 4);
      const idrisDurumu = kitapIlerlemesi("idris", 4);
      const bitenKitapSayisi =
        (ademDurumu.finished ? 1 : 0) + (sitDurumu.finished ? 1 : 0) + (idrisDurumu.finished ? 1 : 0);

      setProfile({
        id: activeProfileId,
        name: profileResult.data?.isim ?? profileName ?? "Gezgin",
        avatar: profileResult.data?.avatar_tipi ?? "lantern",
        avatarUrl: profileResult.data?.avatar_url ?? null,
        title: profileResult.data?.unvan ?? unvanFromBookCount(bitenKitapSayisi),
      });
      setAdem(ademDurumu);
      setSit(sitDurumu);
      setIdris(idrisDurumu);
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const bolgeler = useMemo<AtlasBolge[]>(() => {
    return atlasRegions.map((region) => ({
      id: region.id,
      sira: region.order,
      ad: region.name,
      altBaslik: region.subtitle,
      aciklama: region.description,
      duraklar: region.books.map<AtlasDurak>((book) => {
        if (book.key === "adem") {
          return {
            id: book.order,
            kitapKey: book.key,
            ad: book.title,
            altBaslik: book.subtitle,
            aciklama: book.description,
            durum: adem.finished ? "completed" : "active",
            tamamlananBolum: adem.completed,
            toplamBolum: book.chapterCount,
            ilerleme: Math.round((adem.completed / book.chapterCount) * 100),
            madalyaKazanildi: adem.finished,
          };
        }
        if (book.key === "sit") {
          const unlocked = adem.finished;
          return {
            id: book.order,
            kitapKey: book.key,
            ad: book.title,
            altBaslik: book.subtitle,
            aciklama: book.description,
            durum: sit.finished ? "completed" : unlocked ? "active" : "locked",
            acilmaSarti: "Hz. Şît yolculuğu, Hz. Âdem kitabının finalini tamamladığında açılacak.",
            tamamlananBolum: sit.completed,
            toplamBolum: book.chapterCount,
            ilerleme: Math.round((sit.completed / book.chapterCount) * 100),
            madalyaKazanildi: sit.finished,
          };
        }
        if (book.key === "idris") {
          const unlocked = sit.finished;
          return {
            id: book.order,
            kitapKey: book.key,
            ad: book.title,
            altBaslik: book.subtitle,
            aciklama: book.description,
            durum: idris.finished ? "completed" : unlocked ? "active" : "locked",
            acilmaSarti: "Hz. İdrîs yolculuğu, Hz. Şît kitabının finalini tamamladığında açılacak.",
            tamamlananBolum: idris.completed,
            toplamBolum: book.chapterCount,
            ilerleme: Math.round((idris.completed / book.chapterCount) * 100),
            madalyaKazanildi: idris.finished,
          };
        }
        return {
          id: book.order,
          kitapKey: book.key,
          ad: book.title,
          altBaslik: book.subtitle,
          aciklama: book.description,
          durum: "preparing",
          tamamlananBolum: 0,
          toplamBolum: book.chapterCount,
          ilerleme: 0,
          madalyaKazanildi: false,
        };
      }),
    }));
  }, [adem, sit, idris]);

  const notification = finalBook === "adem"
    ? "Hz. Âdem Yolculuk Madalyası kazanıldı. Hz. Şît yolculuğu açıldı!"
    : finalBook === "sit"
      ? "Hz. Şît Yolculuk Madalyası kazanıldı. Hz. İdrîs yolculuğu açıldı!"
      : finalBook === "idris"
        ? "Hz. İdrîs Yolculuk Madalyası kazanıldı. Öğrenmenin izini sürdün!"
        : warning;

  return (
    <AtlasHarita
      profil={{
        ad: profile.name,
        avatarAnahtari: profile.avatar,
        avatarFotografi: profile.avatarUrl,
        unvan: profile.title,
      }}
      toplamRozet={adem.completed + sit.completed + idris.completed}
      tamamlananKitap={(adem.finished ? 1 : 0) + (sit.finished ? 1 : 0) + (idris.finished ? 1 : 0)}
      bolgeler={bolgeler}
      yukleniyor={loading}
      bildirim={notification}
    />
  );
}
