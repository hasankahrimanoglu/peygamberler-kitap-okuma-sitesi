"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { books } from "../../../src/data/books";
import { KitapBolumRotasi, type AtlasBolum } from "../../../src/components/atlas/KitapBolumRotasi";
import { Buton, Kart } from "../../../src/components/ui";

type KitapKey = "adem" | "sit";

const kitapKimlikleri: Record<KitapKey, {
  bookId: string;
  order: number;
  subtitle: string;
  keywords: string[];
  quizPath: string;
}> = {
  adem: { bookId: "hz-adem", order: 1, subtitle: "İlk insan, ilk yolculuk", keywords: ["adem"], quizPath: "/quiz/adem" },
  sit: { bookId: "hz-sit", order: 2, subtitle: "Emaneti taşıyan yeni kuşak", keywords: ["sit", "şit"], quizPath: "/quiz/sit" },
};

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").replaceAll("â", "a").replaceAll("î", "i").replaceAll("û", "u").replaceAll("ü", "u").replaceAll("ö", "o").replaceAll("ı", "i").replaceAll("ş", "s").replaceAll("ğ", "g").replaceAll("ç", "c");
}

export default function KitapPage() {
  const router = useRouter();
  const params = useParams<{ kitapKey: string }>();
  const kitapKey = params.kitapKey as KitapKey;
  const identity = kitapKimlikleri[kitapKey];
  const book = books.find((item) => item.id === identity?.bookId);
  const [profileName, setProfileName] = useState("Gezgin");
  const [completed, setCompleted] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const chapters = useMemo<AtlasBolum[]>(() => book?.chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    ozet: chapter.ozet,
    badgeName: chapter.badgeName,
    okumaYolu: `/reader/${book.routePrefix}-${chapter.id}`,
    gorev: chapter.gorev ? { ad: chapter.gorev.ad, kategori: chapter.gorev.kategori, sure: chapter.gorev.sure } : undefined,
  })) ?? [], [book]);

  useEffect(() => {
    if (!identity || !book) return;
    let cancelled = false;

    async function load() {
      const profileId = window.localStorage.getItem("selected_child_profile_id");
      setProfileName(window.localStorage.getItem("selected_child_profile_name") || "Gezgin");
      if (!profileId) {
        router.replace("/dashboard");
        return;
      }

      if (kitapKey === "sit") {
        const { data: dbBooks } = await supabase.from("books").select("id, isim");
        const ademBook = dbBooks?.find((item) => normalize(item.isim ?? "").includes("adem"));
        const { data: ademProgress } = ademBook
          ? await supabase.from("user_progress").select("bitti_mi").eq("profile_id", profileId).eq("book_id", ademBook.id).maybeSingle()
          : { data: null };
        if (cancelled) return;
        if (!ademProgress?.bitti_mi) {
          router.replace("/map");
          return;
        }
        setCompleted(Math.min(4, Math.max(0, Number(window.localStorage.getItem(`pkd-demo-sit-progress-${profileId}`) ?? 0))));
        setFinished(window.localStorage.getItem(`pkd-demo-sit-finished-${profileId}`) === "true");
        setLoading(false);
        return;
      }

      const [dbBooksResult, progressResult] = await Promise.all([
        supabase.from("books").select("id, isim, toplam_bolum"),
        supabase.from("user_progress").select("book_id, tamamlanan_bolum_sayisi, bitti_mi").eq("profile_id", profileId),
      ]);
      if (cancelled) return;
      const dbBook = (dbBooksResult.data ?? []).find((item) => identity.keywords.some((keyword) => normalize(item.isim ?? "").includes(keyword)));
      const row = dbBook ? (progressResult.data ?? []).find((item) => item.book_id === dbBook.id) : undefined;
      setCompleted(Math.min(chapters.length, Math.max(0, row?.tamamlanan_bolum_sayisi ?? 0)));
      setFinished(Boolean(row?.bitti_mi));
      setLoading(false);
    }

    void load();
    return () => { cancelled = true; };
  }, [book, chapters.length, identity, kitapKey, router]);

  if (!identity || !book) {
    return (
      <main className="tema-cocuk zemin-yildizli grid min-h-screen place-items-center p-6">
        <Kart dolgu="genis" className="max-w-md text-center">
          <h1 className="font-baslik text-2xl font-bold">Bu yolculuk hazırlanıyor</h1>
          <p className="mt-2 font-govde text-murekkep-soluk">Kitabı Keşif Bölgesi&apos;nde görebilir, içeriği tamamlandığında yolculuğa başlayabilirsin.</p>
          <Buton className="mt-5" varyant="cerceve" onClick={() => router.push("/map")}>Haritaya Dön</Buton>
        </Kart>
      </main>
    );
  }

  return (
    <KitapBolumRotasi
      key={`${kitapKey}-${loading ? "loading" : completed}-${finished}`}
      kitapKey={kitapKey}
      kitapSira={identity.order}
      kitapAdi={book.title}
      altBaslik={identity.subtitle}
      profilAdi={profileName}
      bolumler={chapters}
      tamamlananBolum={completed}
      kitapBitti={finished}
      yukleniyor={loading}
      quizYolu={identity.quizPath}
      onHaritayaDon={() => router.push("/map")}
      onBolumAc={(path) => router.push(path)}
      onFinalAc={(path) => router.push(path)}
    />
  );
}
