"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { DeriveBookRow, DeriveProgressRow } from "../derive";

export type SelectedChild = {
  id: string;
  name: string;
  avatarType: string;
  title: string | null;
};

type SelectedChildData = {
  isLoading: boolean;
  child: SelectedChild | null;
  books: DeriveBookRow[];
  progress: DeriveProgressRow[];
};

// Çocuk tarafı ekranları (Kazanımlarım, Kelime Defterim) için ortak veri yükleyici.
// localStorage'daki seçili profili + kitapları + o çocuğun ilerlemesini çeker;
// profil yoksa /dashboard'a yönlendirir (map ile aynı kalıp).
export function useSelectedChild(): SelectedChildData {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [books, setBooks] = useState<DeriveBookRow[]>([]);
  const [progress, setProgress] = useState<DeriveProgressRow[]>([]);

  useEffect(() => {
    async function load() {
      const selectedProfileId = window.localStorage.getItem(
        "selected_child_profile_id",
      );
      const selectedProfileName = window.localStorage.getItem(
        "selected_child_profile_name",
      );

      if (!selectedProfileId) {
        router.push("/dashboard");
        return;
      }

      setIsLoading(true);
      setChild({
        id: selectedProfileId,
        name: selectedProfileName || "Gezgin",
        avatarType: "lantern",
        title: null,
      });

      const [profileResult, booksResult, progressResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("isim, avatar_tipi, unvan")
          .eq("id", selectedProfileId)
          .maybeSingle(),
        supabase.from("books").select("id, isim, toplam_bolum, sira"),
        supabase
          .from("user_progress")
          .select(
            "book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi, final_title, final_score, final_badge, updated_at",
          )
          .eq("profile_id", selectedProfileId),
      ]);

      if (profileResult.data) {
        setChild({
          id: selectedProfileId,
          name: profileResult.data.isim ?? selectedProfileName ?? "Gezgin",
          avatarType: profileResult.data.avatar_tipi ?? "lantern",
          title: profileResult.data.unvan ?? null,
        });
      }

      setBooks((booksResult.data as DeriveBookRow[] | null) ?? []);
      setProgress((progressResult.data as DeriveProgressRow[] | null) ?? []);
      setIsLoading(false);
    }

    load();
  }, [router]);

  return { isLoading, child, books, progress };
}
