"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
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
  title: string;
};

type AdemProgress = {
  completed: number;
  total: number;
  finished: boolean;
};

const emptyProfile: ProfileState = {
  id: "",
  name: "Gezgin",
  avatar: "lantern",
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
  const [adem, setAdem] = useState<AdemProgress>({ completed: 0, total: 8, finished: false });
  const [sitProgress, setSitProgress] = useState(0);
  const [sitFinished, setSitFinished] = useState(false);
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

    const readLocalDemo = () => {
      setSitProgress(Math.min(4, Math.max(0, Number(window.localStorage.getItem(`pkd-demo-sit-progress-${activeProfileId}`) ?? 0))));
      setSitFinished(window.localStorage.getItem(`pkd-demo-sit-finished-${activeProfileId}`) === "true");
    };

    window.addEventListener("pkd-demo-progress", readLocalDemo);
    queueMicrotask(() => {
      if (cancelled) return;
      setFinalBook(new URLSearchParams(window.location.search).get("final"));
      readLocalDemo();
    });

    async function load() {
      const [profileResult, booksResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("isim, avatar_tipi, unvan").eq("id", activeProfileId).maybeSingle(),
        supabase.from("books").select("id, isim, toplam_bolum"),
        supabase.from("user_progress").select("book_id, tamamlanan_bolum_sayisi, bitti_mi").eq("profile_id", activeProfileId),
      ]);

      if (cancelled) return;
      if (profileResult.error || booksResult.error || progressResult.error) {
        setWarning("İlerleme bilgileri tam olarak yüklenemedi; atlas geçici değerlerle gösteriliyor.");
      }

      const ademBook = (booksResult.data ?? []).find((book) => normalize(book.isim ?? "").includes("adem"));
      const ademRow = ademBook
        ? (progressResult.data ?? []).find((row) => row.book_id === ademBook.id)
        : undefined;
      const total = Math.max(8, ademBook?.toplam_bolum ?? 8);
      const completed = Math.min(total, Math.max(0, ademRow?.tamamlanan_bolum_sayisi ?? 0));

      setProfile({
        id: activeProfileId,
        name: profileResult.data?.isim ?? profileName ?? "Gezgin",
        avatar: profileResult.data?.avatar_tipi ?? "lantern",
        title: profileResult.data?.unvan ?? unvanFromBookCount(ademRow?.bitti_mi ? 1 : 0),
      });
      setAdem({ completed, total, finished: Boolean(ademRow?.bitti_mi) });
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
      window.removeEventListener("pkd-demo-progress", readLocalDemo);
    };
  }, [router]);

  const bolgeler = useMemo<AtlasBolge[]>(() => {
    return atlasRegions.map((region) => ({
      id: region.id,
      sira: region.order,
      ad: region.name,
      altBaslik: region.subtitle,
      aciklama: region.description,
      duygu: region.mood,
      duraklar: region.books.map<AtlasDurak>((book) => {
        if (book.key === "adem") {
          return {
            id: book.order,
            kitapKey: book.key,
            ad: book.title,
            altBaslik: book.subtitle,
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
            durum: sitFinished ? "completed" : unlocked ? "active" : "locked",
            tamamlananBolum: sitProgress,
            toplamBolum: book.chapterCount,
            ilerleme: Math.round((sitProgress / book.chapterCount) * 100),
            madalyaKazanildi: sitFinished,
          };
        }
        return {
          id: book.order,
          kitapKey: book.key,
          ad: book.title,
          altBaslik: book.subtitle,
          durum: "preparing",
          tamamlananBolum: 0,
          toplamBolum: book.chapterCount,
          ilerleme: 0,
          madalyaKazanildi: false,
        };
      }),
    }));
  }, [adem, sitFinished, sitProgress]);

  const notification = finalBook === "adem"
    ? "Hz. Âdem Yolculuk Madalyası kazanıldı. Hz. Şît yolculuğu açıldı!"
    : finalBook === "sit"
      ? "Geçici Hz. Şît sunum yolculuğunu tamamladın."
      : warning;

  return (
    <AtlasHarita
      profil={{ ad: profile.name, avatarAnahtari: profile.avatar, unvan: profile.title }}
      toplamRozet={adem.completed + sitProgress}
      tamamlananKitap={(adem.finished ? 1 : 0) + (sitFinished ? 1 : 0)}
      bolgeler={bolgeler}
      yukleniyor={loading}
      bildirim={notification}
      onProfilSecimineDon={() => router.push("/dashboard")}
    />
  );
}
